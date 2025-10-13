from .graph import Graph
from .utilities import NodeHandleResult, ExtraInfo, get_random_hex
from .utilities import ConditionTag
from . import opgen
from .helpers import val_to_str, val_to_float
from .helpers import js_cmp, wildcard, undefined
from .logger import *
import sty
from collections import defaultdict

logger = create_logger("main_logger", output_type="file")

def check_condition(G: Graph, ast_node, extra: ExtraInfo, taints=[]):
    '''
    Check if a condition is true or false.
    
    Args:
        G (Graph): Graph.
        ast_node: AST node of the condition expression.
        extra (ExtraInfo): Extra info.

    Returns:
        float, bool: A number (range [0, 1]) indicates how possible the
            condition is true. If both left side and right side are
            single possibility, it returns 0 for false, and 1 for true.
            A boolean value if all results are not deterministic.
    '''
     
    node_type = G.get_node_attr(ast_node).get('type')
    op_type = G.get_node_attr(ast_node).get('flags:string[]')
    flag = True
    deter_flag = True
    extra = ExtraInfo(extra)
    condt = None
    if node_type == 'AST_EXPR_LIST':
        child = G.get_ordered_ast_child_nodes(ast_node)[0]
        return check_condition(G, child, extra, taints)
    elif node_type == 'AST_UNARY_OP' and op_type == 'UNARY_BOOL_NOT':
        child = G.get_ordered_ast_child_nodes(ast_node)[0]
        p, d, t = check_condition(G, child, extra, taints)
        if p is not None:
            return 1 - p, d, ConditionTag(ConditionTag.logical_not, t)
        else:
            return None, d, ConditionTag(ConditionTag.logical_not, t)
    if node_type == 'AST_BINARY_OP':
        left, right = G.get_ordered_ast_child_nodes(ast_node)[:2]
        if op_type == 'BINARY_BOOL_OR':
            lp, ld, lt = check_condition(G, left, extra, taints)
            # print('binary bool or', lp, ld)
            rp, rd, rt = check_condition(G, right, extra, taints)
            # print('binary bool or', lp, ld, rp, rd)
            if lp is not None and rp is not None:
                return lp + rp - lp * rp, ld and rd, \
                    ConditionTag(ConditionTag.logical_or, lt, rt)
            else:
                return None, False, \
                    ConditionTag(ConditionTag.logical_or, lt, rt)
        elif op_type == 'BINARY_BOOL_AND':
            lp, ld, lt = check_condition(G, left, extra, taints)
            # print('binary bool and', lp, ld)
            rp, rd, rt = check_condition(G, right, extra, taints)
            # print('binary bool and', lp, ld, rp, rd)
            if lp is not None and rp is not None:
                return lp * rp, ld and rd, \
                    ConditionTag(ConditionTag.logical_and, lt, rt)
            else:
                return None, False, \
                    ConditionTag(ConditionTag.logical_and, lt, rt)
        else:
            handled_left = opgen.handle_node(G, left, extra)
            handled_right = opgen.handle_node(G, right, extra)
            # GREG HANDLE CONDITION --->
            needsHandled = False
            if G.demandDriven and G.two_pass and not G.first_pass:
                # # Left side
                # oldObjs = handled_left.obj_nodes
                # if oldObjs is not None:
                #     newObjs = set()
                #     for handled in opgen.handleObject(G, oldObjs, "left_condition_access"):
                #         newObjs.add(handled)
                #     handled_left.obj_nodes = list(newObjs)

                # # Right side
                # oldObjs = handled_right.obj_nodes
                # if oldObjs is not None:
                #     newObjs = set()
                #     for handled in opgen.handleObject(G, oldObjs, "right_condition_access"):
                #         newObjs.add(handled)
                #     handled_right.obj_nodes = list(newObjs)
                
                # <------ 
                # Trial
                checkObjs = list(handled_left.obj_nodes)
                checkedSet = set()
                for obj in checkObjs:
                    han, dem = opgen.typChecker(G, obj, "check_condition_simple")
                    if han is not None:
                        needsHandled = True
                        pass
                    if dem is not None:
                        for o in dem:
                            if not o in checkObjs:
                                checkObjs.append(o)
                    else:
                        checkedSet.add(obj)
                handled_left.obj_nodes = list(checkedSet)
                
                checkObjs = list(handled_right.obj_nodes)
                checkedSet = set()
                for obj in checkObjs:
                    han, dem = opgen.typChecker(G, obj, "check_condition_simple")
                    if han is not None:
                        needsHandled = True
                        pass
                    if dem is not None:
                        for o in dem:
                            if not o in checkObjs:
                                checkObjs.append(o)
                    else:
                        checkedSet.add(obj)
                handled_right.obj_nodes = list(checkedSet)
            # <---
            opgen.build_df_by_def_use(G, ast_node, handled_left.obj_nodes)
            opgen.build_df_by_def_use(G, ast_node, handled_right.obj_nodes)
            left_values = to_values(G, handled_left, ast_node, for_prop=True)[0]
            right_values = to_values(G, handled_right, ast_node, for_prop=True)[0]
            # print(f'Comparing {handled_left.name}: {left_values} and '
            #     f'{handled_right.name}: {right_values}')
            if op_type is not None: # tricky
                internal_op_type = getattr(ConditionTag, op_type.lower(), None)
            else:
                internal_op_type = None

            true_num = 0
            total_num = len(left_values) * len(right_values)

            if needsHandled:
                tag = ConditionTag(internal_op_type, handled_left, handled_right)
                return 0.5, False, tag

            if total_num == 0:
                return (None, False,  # Value is unknown, cannot check
                    ConditionTag(internal_op_type, handled_left, handled_right))
            if op_type == 'BINARY_IS_EQUAL':
                for v1 in left_values:
                    for v2 in right_values:
                        if (v1 != undefined) != (v2 != undefined):
                            true_num += 0.5
                            deter_flag = False
                        elif v1 != wildcard and v2 != wildcard:
                            if js_cmp(v1, v2) == 0:
                                true_num += 1
                        else:
                            true_num += 0.5
                            deter_flag = False
            elif op_type == 'BINARY_IS_IDENTICAL':
                for v1 in left_values:
                    for v2 in right_values:
                        if (v1 != undefined) != (v2 != undefined):
                            true_num += 0.5
                            deter_flag = False
                        elif v1 != wildcard and v2 != wildcard:
                            if v1 == v2:
                                true_num += 1
                        else:
                            true_num += 0.5
                            deter_flag = False
            elif op_type == 'BINARY_IS_NOT_EQUAL':
                for v1 in left_values:
                    for v2 in right_values:
                        if (v1 != undefined) != (v2 != undefined):
                            true_num += 0.5
                            deter_flag = False
                        elif v1 != wildcard and v2 != wildcard:
                            if js_cmp(v1, v2) != 0:
                                true_num += 1
                        else:
                            true_num += 0.5
                            deter_flag = False
            elif op_type == 'BINARY_IS_NOT_IDENTICAL':
                for v1 in left_values:
                    for v2 in right_values:
                        if (v1 != undefined) != (v2 != undefined):
                            true_num += 0.5
                            deter_flag = False
                        elif v1 != wildcard and v2 != wildcard:
                            if v1 != v2:
                                true_num += 1
                        else:
                            true_num += 0.5
                            deter_flag = False
            elif op_type == 'BINARY_IS_SMALLER':
                for v1 in left_values:
                    for v2 in right_values:
                        if (v1 != undefined) or (v2 != undefined):
                            true_num += 0.5
                            deter_flag = False
                        elif v1 != wildcard and v2 != wildcard:
                            if js_cmp(v1, v2) < 0:
                                true_num += 1
                        else:
                            true_num += 0.5
                            deter_flag = False
            elif op_type == 'BINARY_IS_GREATER':
                for v1 in left_values:
                    for v2 in right_values:
                        if (v1 != undefined) or (v2 != undefined):
                            true_num += 0.5
                            deter_flag = False
                        elif v1 != wildcard and v2 != wildcard:
                            if js_cmp(v1, v2) > 0:
                                true_num += 1
                        else:
                            true_num += 0.5
                            deter_flag = False
            elif op_type == 'BINARY_IS_SMALLER_OR_EQUAL':
                for v1 in left_values:
                    for v2 in right_values:
                        if (v1 != undefined) or (v2 != undefined):
                            true_num += 0.5
                            deter_flag = False
                        elif v1 != wildcard and v2 != wildcard:
                            if js_cmp(v1, v2) <= 0:
                                true_num += 1
                        else:
                            true_num += 0.5
                            deter_flag = False
            elif op_type == 'BINARY_IS_GREATER_OR_EQUAL':
                for v1 in left_values:
                    for v2 in right_values:
                        if (v1 != undefined) or (v2 != undefined):
                            true_num += 0.5
                            deter_flag = False
                        elif v1 != wildcard and v2 != wildcard:
                            if js_cmp(v1, v2) >= 0:
                                true_num += 1
                        else:
                            true_num += 0.5
                            deter_flag = False
            else:
                flag = False
    else:
        flag = False
    if not flag:
        handled = opgen.handle_node(G, ast_node, extra)
        # GREG HANDLE CONDITION --->
        # OLD WAY ------>
        # if G.demandDriven and G.two_pass and not G.first_pass:
        #     oldObjs = handled.obj_nodes
        #     if oldObjs is not None:
        #         newObjs = set()
        #         for hObjs in opgen.handleObject(G, oldObjs, "single_condition_access"):
        #             newObjs.add(hObjs)
        #         handled.obj_nodes = list(newObjs)
        # <------ 
        # Trial
        needsHandled = False
        checkObjs = list(handled.obj_nodes)
        checkedSet = set()
        for obj in checkObjs:
            han, dem = opgen.typChecker(G, obj, "check_condition_simple")
            if han is not None:
                needsHandled = True
                pass
            if dem is not None:
                for o in dem:
                    if not o in checkObjs:
                        checkObjs.append(o)
            else:
                checkedSet.add(obj)
        handled.obj_nodes = list(checkedSet)
        # <---
        opgen.build_df_by_def_use(G, ast_node, handled.obj_nodes)
        internal_op_type = ConditionTag.exp_value
        true_num = 0
        total_num = len(list(filter(lambda x: x != G.undefined_obj,
                                handled.obj_nodes))) + len(handled.values)
        
        # Dont handle now, leave ambiguous
        if needsHandled:
            tag = ConditionTag(internal_op_type, handled)
            return 0.5, False, tag
        if total_num == 0:
            if G.first_pass or not G.GithubActions:
                return (None, False,  # Value is unknown, cannot check
                    ConditionTag(internal_op_type, handled))
            else:
                # Added this to handle issues with missing objects for conditional checks
                return (0.5, False, ConditionTag(internal_op_type, handled))
        for value in handled.values:
            if value == wildcard:
                true_num += 0.5
                deter_flag = False
            elif value == 0:
                pass
            else:
                true_num += 1
        for obj in handled.obj_nodes:
            if G.get_node_attr(obj).get("tainted", False):
                taints.append(obj)
            if obj in [G.undefined_obj, G.null_obj, G.false_obj]:
                pass
            elif obj in [G.infinity_obj, G.negative_infinity_obj, G.nan_obj,
                G.true_obj]:
                true_num += 1
            else:
                value = G.get_node_attr(obj).get('code')
                typ = G.get_node_attr(obj).get('type')
                if typ == 'number':
                    if value == wildcard:
                        true_num += 0.5
                        deter_flag = False
                    elif val_to_float(value) != 0:
                        true_num += 1
                elif typ == 'string':
                    if value == wildcard:
                        true_num += 0.5
                        deter_flag = False
                    elif value:
                        true_num += 1
                elif typ == 'function':
                    # how should we determine when it's a function?
                    true_num += 0.5
                    deter_flag = False
                else:
                    if value == wildcard:
                        true_num += 0.5
                        deter_flag = False
                    else:
                        true_num += 1
        for value in handled.values:
            if value:
                true_num += 1
    if 0 == total_num:
        logger.debug('Check condition {} result: N/A'.format(sty.ef.i +
            G.get_node_attr(ast_node).get('code') + sty.rs.all))
        return None, False, None
    logger.debug('Check condition {} result: p = {}, deterministic = {}'
        .format(sty.ef.i + G.get_node_attr(ast_node).get('code') + sty.rs.all,
        true_num / total_num, deter_flag))
    if internal_op_type == ConditionTag.exp_value:
        tag = ConditionTag(internal_op_type, handled)
    else:
        tag = ConditionTag(internal_op_type, handled_left, handled_right)
    return true_num / total_num, deter_flag, tag


def check_switch_var(G: Graph, ast_node, extra: ExtraInfo):

    # GREG Switch Var handler --->
    if G.demandDriven and G.two_pass and not G.first_pass:
        oldObjs = extra.switch_var.obj_nodes
        if oldObjs is not None:
            newObjs = set()
            for handled in opgen.handleObject(G, oldObjs, "switch_var_access"):
                newObjs.add(handled)
            extra.switch_var.obj_nodes = list(newObjs)
    # <---
    left_values = to_values(G, extra.switch_var, ast_node, for_prop=True)[0]
    rightObj = opgen.handle_node(G, ast_node, extra)

    # GREG Right side handler --->
    if G.demandDriven and G.two_pass and not G.first_pass:
        oldObjs = rightObj.obj_nodes
        if oldObjs is not None:
            newObjs = set()
            for handled in opgen.handleObject(G, oldObjs, "switch_rightside_access"):
                newObjs.add(handled)
            rightObj.obj_nodes = list(newObjs)
    # <---
    right_values = to_values(G, rightObj, ast_node, for_prop=True)[0]
    logger.debug(f'Switch variable values: {left_values}')
    logger.debug(f'Case values: {right_values}')

    true_num = 0
    total_num = len(left_values) * len(right_values)
    deter_flag = True
    for v1 in left_values:
        for v2 in right_values:
            if (v1 != undefined) != (v2 != undefined):
                true_num += 0.5
                deter_flag = False
            elif v1 != wildcard and v2 != wildcard:
                if js_cmp(v1, v2) == 0:
                    true_num += 1
            else:
                true_num += 0.5
                deter_flag = False
    if total_num == 0:
        return 0, False
    else:
        return true_num / total_num, deter_flag


def add_contributes_to(G: Graph, sources, target, operation: str=None,
    index: int=None, rnd: str=None, chain_tainted=True):
    '''
    Add CONTRIBUTES_TO edges.

    Args:
        G (Graph): Graph.
        sources (list): List of source objects.
        target: Target object.
        operation (str, optional): Operation. Defaults to None.
        index (int, optional): Index of the operand. When set to None,
            indices are generated automatically based on their order in
            the sources list (0, 1, 2, 3..., so multiple
            possibilities are not supported). Defaults to None.
        chain_tainted (bool, optional): Whether to chain tainted values.
            Defaults to True.
    '''    
    if G.first_pass: return
    assert not isinstance(sources, (str, bytes))
    tainted = False
    random = get_random_hex()
    for i, source in enumerate(sources):
        _source = str(source)
        if G.get_node_attr(source).get('tainted'):
            _source += ' tainted'
        source_name = ', '.join(G.reverse_names[source])
        if not source_name:
            source_name = repr(G.get_node_attr(source).get('code'))
        target_name = ', '.join(G.reverse_names[target])
        if not target_name:
            target_name = repr(G.get_node_attr(target).get('code'))
        logger.debug(f'Object {_source}({source_name}) {sty.fg.li_magenta}'
            f'CONTRIBUTES TO{sty.rs.all} {target}({target_name}) '
            f'(Operation: {operation}, Index: {index or i}), tainted: {tainted}')
        attr = {'type:TYPE': 'CONTRIBUTES_TO'}
        if operation is not None:
            # 'opt' means operation tuple
            if index is not None:
                if rnd is not None:
                    attr['opt'] = (operation, rnd, index)
                else:
                    attr['opt'] = (operation, random, index)
            else:
                attr['opt'] = (operation, random, i)
        G.add_edge(source, target, attr)
        tainted = tainted or G.get_node_attr(source).get('tainted', False)
    if chain_tainted and tainted:
        G.set_node_attr(target, ('tainted', True))


def to_obj_nodes(G: Graph, handle_result: NodeHandleResult, ast_node=None,
    incl_existing_obj_nodes=True):
    '''
    Experimental. Converts 'values' field into object nodes.
    Returns converted object nodes as a list.
    '''
    returned_objs = []
    # if ast_node is None:
    #     cpg_node = G.cur_stmt
    # else:
    #     cpg_node = G.find_nearest_upper_CPG_node(ast_node)
    if handle_result.values:
        for i, value in enumerate(handle_result.values):
            if type(value) in [int, float]:
                added_obj = G.add_obj_node(ast_node, 'number', value)
            else:
                added_obj = G.add_obj_node(ast_node, 'string', value)
            if handle_result.value_tags:
                G.set_node_attr(added_obj, 
                    ('for_tags', handle_result.value_tags[i]))
            returned_objs.append(added_obj)
            # add CONTRIBUTES_TO edges from sources to the added object
            if i < len(handle_result.value_sources):
                for obj in handle_result.value_sources[i]:
                    if obj is not None:
                        add_contributes_to(G, [obj], added_obj)
                # opgen.build_df_by_def_use(G, cpg_node, handle_result.value_sources[i])
    if incl_existing_obj_nodes:
        returned_objs.extend(handle_result.obj_nodes)
    return returned_objs


def to_values(G: Graph, handle_result: NodeHandleResult,
    incl_existing_values=True, for_prop=False):
    '''
    Experimental. Get values ('code' fields) in object nodes.
    Returns values, sources and tags in lists.
    '''
    values = []
    sources = []
    tags = []
    if incl_existing_values:
        values = list(handle_result.values)
        if for_prop:
            values = list(map(val_to_str, values))
        if handle_result.value_sources:
            sources = handle_result.value_sources
        else:
            sources = [[]] * len(handle_result.values)
        if handle_result.value_tags:
            tags = handle_result.value_tags
        else:
            tags = [[] for i in range(len(handle_result.values))]
    for obj in handle_result.obj_nodes:
        attrs = G.get_node_attr(obj)
        if for_prop:
            if attrs.get('code') == wildcard:
                value = wildcard
            elif obj == G.undefined_obj:
                value = undefined
            elif attrs.get('code') is not None:
                value = val_to_str(attrs.get('code'))
            else:
                value = 'Obj#' + obj
        else:
            if attrs.get('code') is not None:
                value = attrs.get('code')
            else:
                value = wildcard
        values.append(value)
        sources.append([obj])
        tags.append(G.get_node_attr(obj).get('for_tags', []))
    # print(values, sources)
    if not G.two_pass or G.first_pass:
        values, sources = combine_values(values, sources)
    return values, sources, tags


def combine_values(values, sources, *arg):
    d = defaultdict(lambda: [])
    for i, v in enumerate(values):
        d[v].extend(sources[i])
    return (list(d.keys()), list(d.values()), *arg)


def peek_variables(G: Graph, ast_node, extra: ExtraInfo):
    '''
    Experimental. Peek what variable is used in the statement and get
    their object nodes. Currently, you must ensure the statement you
    want tho peek is in the same scope as your current scope.
    
    Args:
        G (Graph): Graph.
        ast_node: AST node of the statement.
        handling_func (Callable): Function to handle the variable node.
            Normally you should use handle_var.
        extra (ExtraInfo): Extra info.
    '''
    returned_dict = {}
    if G.get_node_attr(ast_node).get('type') == 'AST_VAR' or \
        G.get_node_attr(ast_node).get('type') == 'AST_NAME':
        handle_result = opgen.handle_node(G, ast_node, extra)
        # GREG Peek handler --->
        if G.demandDriven and G.two_pass and not G.first_pass:
            oldObjs = handle_result.obj_nodes
            if oldObjs is not None:
                newObjs = set()
                for handled in opgen.handleObject(G, oldObjs, "peek_variables_access"):
                    newObjs.add(handled)
                handle_result.obj_nodes = list(newObjs)
        # <---
        if handle_result.name:
            returned_dict[handle_result.name] = handle_result.obj_nodes
    else:
        for child in G.get_ordered_ast_child_nodes(ast_node):
            d = peek_variables(G, child, extra)
            for name, nodes in d.items():
                if name in returned_dict:
                    returned_dict[name].extend(d[name])
                else:
                    returned_dict[name] = d[name]
        for name, nodes in returned_dict.items():
            returned_dict[name] = list(set(nodes))
    return returned_dict
