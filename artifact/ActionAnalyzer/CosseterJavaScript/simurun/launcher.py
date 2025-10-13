import argparse
import sys
import sty
from .graph import Graph
from .logger import *
from .opgen import register_func, handle_node, \
    add_edges_between_funcs, analyze_files, analyze_string, generate_obj_graph, updateMongo
from .helpers import get_func_name
from .trace_rule import TraceRule
from .vul_checking import *
from datetime import datetime
import time
import pickle
from pymongo import MongoClient
from .config import mongoLink, databaseName, collectionName

def unittest_main(file_path, check_signatures=[], vul_type='os_command',
    args=None, graph=None, original_path=None):
    """
    main function for uniitest 
    """
    if graph is None:
        G = Graph()
    else:
        G = graph
    # if graph is not None:
    #     del graph
    # G = Graph()
    G.exit_when_found = True
    G.vul_type = vul_type
    G.check_proto_pollution = (vul_type == 'proto_pollution')
    G.check_ipt = (vul_type == 'int_prop_tampering')
    if args is not None:
        G.single_branch = args.single_branch
        G.function_time_limit = args.function_timeout
        G.check_proto_pollution = G.check_proto_pollution or args.proto_pollution
        G.check_ipt = G.check_ipt or args.int_prop_tampering
        G.no_file_based = args.nfb
        G.two_pass = args.rcf
        G.rough_call_dist = args.rcd
        G.auto_exploit = args.exploit
        G.coarse_only = args.coarse_only
    G.entry_file_path = original_path
    result = analyze_files(G, file_path, check_signatures=check_signatures)
    # output location of prototype pollution to a seperate file
    proto_pollution_logger = create_logger('proto_pollution',
            output_type='file', file_name="proto_pollution.log")
    if G.proto_pollution:
        proto_pollution_logger.info('Prototype pollution found in package {}'
            .format(G.entry_file_path))
        for ast_node in G.proto_pollution:
            proto_pollution_logger.info('{} {}\n{}'
                .format(ast_node, G.get_node_file_path(ast_node),
                        G.get_node_line_code(ast_node)))
    # IPT output
    ipt_logger = create_logger('ipt',
            output_type='file', file_name="int_prop_tampering.log")
    if G.ipt_use:
        ipt_logger.info('Internal property tampering found in package {}'
            .format(G.entry_file_path))
        if True:
            ipt_logger.info('Write:')
            for ast_node in G.ipt_write:
                ipt_logger.info('{} {}\n{}'
                    .format(ast_node, G.get_node_file_path(ast_node),
                            G.get_node_line_code(ast_node)))
        ipt_logger.info('Use:')
        for ast_node in G.ipt_use:
            ipt_logger.info('{} {}\n{}'
                .format(ast_node, G.get_node_file_path(ast_node),
                        G.get_node_line_code(ast_node)))
    return result, G

def main(replaceArgs=None, savedGraph=None):
    totalTime = time.time()
    # Parse arguments
    parser = argparse.ArgumentParser(
        description='Object graph generator for JavaScript.')
    parser.add_argument('-p', '--print', action='store_true',
                        help='Print logs to console, instead of file.')
    parser.add_argument('-tf', '--timeoutFiles', default='requireTimes.txt', type=str)
    parser.add_argument('-t', '--vul-type', default='os_command',
                        help="Set the vulnerability type to be checked.")
    parser.add_argument('-P', '--prototype-pollution', '--pp',
                        action='store_true',
                        help="Check prototype pollution.")
    parser.add_argument('-I', '--int-prop-tampering', '--ipt',
                        action='store_true',
                        help="Check internal property tampering.")
    parser.add_argument('-m', '--module', action='store_true',
                        help="Module mode. Regard the input file as a module "
                        "required by some other modules. This implies -a.")
    parser.add_argument('-q', '--exit', action='store_true', default=False,
                        help="Exit the program when vulnerability is found.")
    parser.add_argument('-s', '--single-branch', action='store_true',
                        help="Single branch. Do not create multiple "
                        "possibilities when meet a branching point.")
    parser.add_argument('-a', '--run-all', action='store_true', default=False,
                        help="Run all exported functions in module.exports. "
                        "By default, only main functions will be run.")
    parser.add_argument('-f', '--function-timeout', type=float,
                        help="Time limit when running all exported function, "
                        "in seconds. (Defaults to no limit.)")
    parser.add_argument('-c', '--call-limit', default=None, type=int,
                        help="Set the limit of a call statement. "
                        "(Defaults to 3.)")
    parser.add_argument('-e', '--entry-func')
    parser.add_argument('-F', '--nfb', '--no-file-based', action='store_true')
    parser.add_argument('-C', '--rcf', '--rough-control-flow', action='store_true')
    parser.add_argument('-D', '--rcd', '--rough-call-distance', action='store_true')
    parser.add_argument('-d', '--debug', '--debugger', action='store_true')
    parser.add_argument('-X', '--exploit', '--auto-exploit', action='store_true')
    parser.add_argument('-i', '--interactive', action='store_true')
    parser.add_argument('-1', '--coarse-only', action='store_true')
    parser.add_argument('input_file', action='store', nargs='?',
        help="Source code file (or directory) to generate object graph for. "
        "Use '-' to get source code from stdin. Ignore this argument to "
        "analyze ./nodes.csv and ./rels.csv.")
    parser.add_argument('-G', '--github-actions', action='store_true', help="Set true if used to analyze GitHub Action JavaScript code.")
    parser.add_argument('-v', '--github-version', default="MISSING", help="Set true if specifying the version of an action")
    parser.add_argument('-pft', '--profile-timeout', type=float, help="Profiling timeout in seconds")
    args = parser.parse_args(replaceArgs)
    if args.vul_type == 'prototype_pollution' or args.vul_type == 'pp':
        args.vul_type = 'proto_pollution'
    if args.vul_type == 'ipt':
        args.vul_type = 'int_prop_tampering'
    
    logger = create_logger("main_logger", output_type="file")
    start_time = time.time()
    if savedGraph is None:
        G = Graph()
        G.savedNeededInfo = False
    else:
        G = savedGraph
        G.savedNeededInfo = False
        G.getNeededInfo = True

    if args.exploit:
        G.auto_exploit = args.exploit
        args.module = True
    if args.debug:
        args.interactive = True
    if args.print or args.interactive:
        level = logging.DEBUG if args.print else logging.INFO
        logger = create_logger("main_logger", output_type="console",
            level=level)
        create_logger("graph_logger", output_type="console",
            level=level)
        G.print = True
    G.run_all = args.run_all or args.module
    G.no_file_based = args.nfb
    G.two_pass = args.rcf
    G.rough_call_dist = args.rcd
    G.function_time_limit = args.function_timeout
    G.exit_when_found = args.exit
    G.single_branch = args.single_branch
    G.vul_type = args.vul_type
    G.func_entry_point = args.entry_func
    G.check_proto_pollution = (args.prototype_pollution or 
                               args.vul_type == 'proto_pollution')
    G.check_ipt = (args.int_prop_tampering or 
                               args.vul_type == 'int_prop_tampering')
    if args.call_limit is not None:
        G.call_limit = args.call_limit
    G.interactive = args.interactive
    G.coarse_only = args.coarse_only
    G.GithubActions = args.github_actions
    G.profileTimeout = args.profile_timeout

    if G.profileTimeout:
        print("BEGINNING PROFILE WITH TIMEOUT OF: %f" % G.profileTimeout)
        G.overallStartTime = time.time()

    # GREG Remove this!!
    # G.hasNcc = False

    # Set the proper configs is analyzing GitHub Actions
    if G.GithubActions:
        G.vul_type = 'github_actions'
        G.demandDriven = True
        # G.GithubActions = False
        # G.prePass = True
        # G.hasNcc = True
        
        # It will always need to do the rough call search first, then it can do the finer grained stuff
        # G.rough_call_dist = True
        # G.two_pass = True
        
        # GREG TODO Taken out for now to help with testing, but it will need to be set
        # G.function_time_limit = 1200

        # GREG TODO These are configurations that need to be set if debugging specific pieces
        # G.limitDependencies = True
        # This needs to be set in opgen.py
        # G.setSlicer = True

    


    # Analyze and simulate
    logger.info('Analysis starts at ' +
        datetime.fromtimestamp(start_time).strftime('%Y-%m-%d %H:%M:%S'))
    if args.input_file:
        if args.input_file == '-':
            if args.module:
                raise argparse.ArgumentTypeError(
                    'stdin cannot be used with module mode')
            else:
                # analyze from stdin
                source = sys.stdin.read()
                analyze_string(G, source, generate_graph=True)
        else:
            G.entry_file_path = args.input_file
            G.actionFile = args.input_file
            G.actionVersion = args.github_version
            updateMongo(G)
            if args.module:
                # pretend another file is requiring this module
                script = "var main_func=require('{}');".format(args.input_file)
                analyze_string(G, script, generate_graph=True)
            else:
                # analyze from JS source code files
                analyze_files(G, args.input_file)
    else:
        if args.module:
            raise argparse.ArgumentTypeError(
                'CSV cannot be used with module mode')
        else:
            # analyze from CSVs
            G.import_from_CSV("./nodes.csv", "./rels.csv")
            generate_obj_graph(G, '0')
    total_num_stat = G.get_total_num_statements()
    print("Statements:", len(G.covered_stat), total_num_stat)
    print("Functions:", len(G.covered_func), G.get_total_num_functions())
    # G.relabel_nodes()
    G.export_to_CSV("./opg_nodes.tsv", "./opg_rels.tsv")
    logger.log(ATTENTION, 'Analysis finished at ' +
        datetime.today().strftime('%Y-%m-%d %H:%M:%S') +
        ', Time spent: %.3fs' % (time.time() - start_time))

    # Vulnerability checking
    if G.proto_pollution:
        logger.debug(sty.ef.inverse + 'prototype pollution' + sty.rs.all)

        for ast_node in G.proto_pollution:
            pathes = G._dfs_upper_by_edge_type(ast_node)
            logger.debug('{} {}\n{}'
                .format(sty.fg.li_cyan + ast_node + sty.rs.all,
                    G.get_node_file_path(ast_node),
                    G.get_node_line_code(ast_node)))
        print(G.proto_pollution)

    if G.ipt_use:
        logger.debug(sty.ef.inverse + 'internal property tampering' + sty.rs.all)

        if G.ipt_write:
            logger.debug('Write:')
            for ast_node in G.ipt_write:
                pathes = G._dfs_upper_by_edge_type(ast_node)
                logger.debug('{} {}\n{}'
                    .format(sty.fg.li_cyan + ast_node + sty.rs.all,
                        G.get_node_file_path(ast_node),
                        G.get_node_line_code(ast_node)))
            print(G.ipt_write)
            logger.debug('')
        logger.debug('Use:')
        for ast_node in G.ipt_use:
            pathes = G._dfs_upper_by_edge_type(ast_node)
            logger.debug('{} {}\n{}'
                .format(sty.fg.li_cyan + ast_node + sty.rs.all,
                    G.get_node_file_path(ast_node),
                    G.get_node_line_code(ast_node)))
        print(G.ipt_use)

    if G.vul_type not in ['proto_pollution', 'int_prop_tampering']:
        logger.debug(sty.ef.inverse + G.vul_type + sty.rs.all)
        res_path = traceback(G, G.vul_type)

        logger.debug('ResPath0:')
        logger.debug(res_path[0])
        logger.debug('ResPath1:')
        logger.debug(res_path[1])

        res_pathes = vul_checking(G, res_path[0], G.vul_type)
        print(res_pathes)
        for path in res_pathes:
            res_text_path = get_path_text(G, path, path[0])
            print("Attack Path: ")
            print(res_text_path)

        if len(res_pathes) != 0:
            print("Res paths found!")
            with open('vul_func_names.csv', 'a') as fp:
                logger.log(ATTENTION, f'{G.vul_type} successfully found in '
                            f'{G.entry_file_path} at main?')
                fp.write(f'{G.vul_type},"{G.entry_file_path}","main","",{len(res_path)}\n')
            G.success_detect = True

    if G.vul_type in ["github_actions", "github_actions_abstract"] and not G.success_detect:
        print(G.possible_cf_nodes)
        print("---\n\n")

    if G.success_detect:
        print(sty.fg.green + sty.ef.b + 'Detection: successful' + sty.rs.all)
    else:
        print(sty.fg.yellow + sty.ef.b + 'Detection: failed' + sty.rs.all)
    if G.auto_exploit:
        if G.success_exploit:
            print(sty.fg.green + sty.ef.b + 'Exploit: successful' + sty.rs.all)
        else:
            print(sty.fg.yellow + sty.ef.b + 'Exploit: failed' + sty.rs.all)
    else:
        print(sty.fg.da_grey + sty.ef.b + 'Exploit: turned off' + sty.rs.all)
    logger.debug('Time spent: %.3fs' % (time.time() - start_time))
    if G.exit_when_found and G.finished:
        print(sty.ef.b + 'Analysis stopped after vulernability is found. Only the first few CF paths are kept.' + sty.rs.all)
    vul_files = list(map(lambda p: os.path.relpath(p, G.entry_file_path), G.vul_files))
    print(sty.ef.b + f'Vulnerable files: {vul_files}' + sty.rs.all)
    print(sty.fg.li_magenta + sty.ef.b +
        f'Number of CF Paths: {G.num_of_cf_paths}' + sty.rs.all)
    print(sty.fg.li_magenta + sty.ef.b +
        f'Number of Preceding CF Paths: {G.num_of_prec_cf_paths}' + sty.rs.all)
    print(sty.fg.li_magenta + sty.ef.b +
        f'Number of Full CF Paths: {G.num_of_full_cf_paths}' + sty.rs.all)
    cf_edges = G.get_edges_by_types(['FLOWS_TO', 'ENTRY', 'EXIT'])
    real_cf_counter = 0
    for e in cf_edges:
        l0 = G.get_node_attr(e[0]).get('labels:label')
        if l0 is None or l0.startswith('Artificial'):
            continue
        l1 = G.get_node_attr(e[1]).get('labels:label')
        if l1 is None or l1.startswith('Artificial'):
            continue
        real_cf_counter += 1
    call_edges = G.get_edges_by_type('CALLS')
    real_ce_counter = 0
    real_call_edges = []
    for e in call_edges:
        l0 = G.get_node_attr(e[0]).get('labels:label')
        if l0 is None or l0.startswith('Artificial'):
            continue
        l1 = G.get_node_attr(e[1]).get('labels:label')
        if l1 is None or l1.startswith('Artificial'):
            continue
        real_ce_counter += 1
        real_call_edges.append(e)
    print(sty.fg.li_magenta +
            f'Number of CF Edges: ' + sty.rs.all + f'{len(cf_edges)}')
    print(sty.fg.li_magenta +
            f'Number of Real CF Edges: ' + sty.rs.all + f'{real_cf_counter}')
    print(sty.fg.li_magenta +
            f'Number of Call Edges: ' + sty.rs.all + f'{len(call_edges)}')
    print(sty.fg.li_magenta +
            f'Number of Real Call Edges: ' + sty.rs.all + f'{real_ce_counter}')
    # print(real_call_edges)
    covered_stmt = len(G.covered_stat)
    total_stmt = G.get_total_num_statements()
    # print(sty.fg.li_yellow + f'Code coverage: ' + sty.rs.all + 
    #         f'{covered_stmt / total_stmt * 100:.2f}%'
    #         + f' {covered_stmt}/{total_stmt}'
    #         )
    print(sty.fg.li_magenta + f'Number of Dynamically Resolvable Calls: ' +
                            sty.rs.all + f'{len(G.dynamic_calls)}')
    print(sty.fg.li_magenta + f'Number of Statically Resolvable Calls: ' +
                            sty.rs.all + f'{len(G.static_calls)}')
    print(sty.fg.li_magenta + f'Number of Unresolvable Calls: ' +
                            sty.rs.all + f'{len(G.unresolvable_calls)}')
    print(sty.fg.li_magenta + f'Number of Function Calls: ' +
                            sty.rs.all + f'{len(G.total_calls)}')
    print(sty.fg.li_magenta + f'Number of Rerun: ' +
                            sty.rs.all + f'{G.rerun_counter}')
    
    # Removing all of old debug print
    # with open(args.timeoutFiles, "w") as f:
    #     for k,v in G.timeoutConnections.items():
    #         f.write("[%d]:\n" % k)
    #         f.write(str(G.nccRequireTimeoutStack[k]) + "\n")
    #         f.write(str(v) + "\n")
    #         f.write("---\n")
    #     print("Total requires:", G.currentTimeoutInd)

    # print("Keeps:")
    # print(G.nccKeeps)

    # Control Dependency Algorithm
    # NOTE HERE IS THE GOOD CF SEARCH!!

    # print(G.nodeUses)
    # print(G.nodesRan)
    # print(G.overFuncObj)
    # print(G.routesFound)
    # print("---")
    # print(G.requireDepth)
    # print(G.timeoutVals)
    # print("---")

    # print("Files looked into:")
    # print(len(G.filesLookedInto))
    # print("Packs found:")
    # print(len(G.modules))

    # print("Silent Timeout:", G.timeoutEver)

    # print("Writing stack1 to file")
    # print(len(G.stack1))
    # with open("stack1.pkl", "wb") as f:
    #     pickle.dump(G.stack1, f)

    # print("Writing task queue to file")
    # print(len(G.task_queue))
    # # with open("taskQueue.pkl", "wb") as f:
    #     # pickle.dump(G.task_queue, f)

    # print("Writing microtask queue to file")
    # print(len(G.microtask_queue))
    # # with open("microtaskQueue.pkl", "wb") as f:
    #     # pickle.dump(G.microtask_queue, f)

    # print("Current function call:")
    # print(G.cur_func_call)

    # print("Possible CF nodes: ", end="")
    # print(len(G.possible_cf_nodes))

    # print("\n\n\n")

    # print("CG Paths found: ", end="")
    # print(len(G.cg_paths))

    # for file in G.handledDemandedFiles:
    #     print(file)

    if False:
        print(G.cg_paths)
        for path in G.cg_paths:
            print(path)
            for item in path:
                if item == "REACHABLE":
                    print("Goes to somewhere in another path")
                    continue
                print(item)
                print(G.get_node_attr(item))
                print(G.get_name_from_child(item))
                print("-")
            print()
        
        print("\n\n\n")
    
    # print("\n\n\n")
    # print(len(G.octokitAdditions))
    # for item in G.octokitAdditions:
    #     print("%s:" % item)
    #     print(G.get_node_attr(item))
    # print("\n\n\n")
    
    # print("\n\n\n")
    # print(len(G.octokitUsage))
    # for item in G.octokitUsage:
    #     print("%s:" % item)
    #     print(G.get_node_attr(item))
    # print("\n\n\n")

    time3 = time.time()
    methodsToPathType = {}
    # GREG TODO: Problem with the attr getting? Some nodes getting remade but not updated...
    if G.success_detect and True:
        print("Getting the control dependences")

        # print(len(G.cf_paths))
        nodes = set()
        pathCons = {}
        mains = set()
        fullPaths = []
        for path in G.cf_paths:
            mains.add(path[0])
            if not path[0] in pathCons.keys():
                pathCons[path[0]] = {}
            pathCons[path[0]][path[1]] = [path[2]]
            if path[1] in mains:
                mains.remove(path[1])

        # print(pathCons)
        # print(mains)

        def rec(curr, nex, path, currPath=[False]):
            base = currPath.copy()
            base.append(curr)
            # print(curr)
            # print(nex)
            # print(path)
            allTaintCondition = True
            for innerPath in path:
                taintedCondition = False
                for node in innerPath:
                    if node != "REACHABLE":
                        # print(node)
                        # print(G.get_node_attr(node))
                        attrs = G.get_node_attr(node)
                        if attrs.get("taintedCondition", False):
                            taintedCondition = True
                            break
                if not taintedCondition:
                    allTaintCondition = False
                    break
                # print("---\n")
            # print("All tainted path?:", allTaintCondition, "\n")
            if allTaintCondition:
                base[0] = True
            pathCons[curr][nex].append(allTaintCondition)
            nextDone = False
            for n, p in pathCons.get(nex, {}).items():
                rec(nex, n, p[0], base)
                nextDone = True
            if not nextDone:
                if G.get_node_attr(curr).get("PROCESS_CPG", False):
                    base.append("getIDToken")
                fullPaths.append(base)

        for start in mains:
            # print("Starting path node: %s" % start)
            for n, p in pathCons.get(start, {}).items():
                rec(start, n, p[0])

        # print(pathCons)
        # print(mains)
        # print(fullPaths)

        print(os.getcwd())
        with open("funcsToMethods", "rb") as f:
            funcsToMethods = pickle.load(f)

        for path in fullPaths:
            print(path)
            if path[-1] == "getIDToken":
                func = path[-1]
            else:
                func = G.get_node_attr(path[-1]).get("code")
            if func in funcsToMethods:
                method = funcsToMethods[func]
                if not method[0] in methodsToPathType:
                    methodsToPathType[method[0]] = {}
                if method[1] in methodsToPathType[method[0]] and methodsToPathType[method[0]][method[1]]:
                    methodsToPathType[method[0]][method[1]] = path[0]
                else:
                    methodsToPathType[method[0]][method[1]] = path[0]
            elif func == "getIDToken":
                if not "getIDToken" in methodsToPathType:
                    methodsToPathType["getIDToken"] = {"getIDToken": path[0]}

        for k, v in G.nccKeeps.items():
            lst = []
            for item in v:
                lst.append(item)
            G.nccKeeps[k] = lst

        # print(methodsToPathType) 

    # print(G.allowedFuncs)
    # for item in G.allowedFuncs:
        # print(G.get_node_attr(item))
        # print("-")

    # nfc = {}
    # for k,v in G.functionCalls.items():
    #     for k2, v2 in v.items():
    #         # print(k2)
    #         # if k2 in G.allowedFuncs:
    #             # print("%s is a builtin" % k2)
    #         if v2 > 20 and not k2 in G.allowedFuncs:
    #             if not str(k) in nfc:
    #                 nfc[str(k)] = {}
    #             resToAdd = {"names": [], "lineno:int": [], "calls": v2}
    #             for ed in G.get_out_edges(k2, edge_type="OBJ_TO_AST"):
    #                 funcAttrs = G.get_node_attr(ed[1])
    #                 possName = G.get_node_attr(k2).get("name", None)
    #                 resToAdd["names"].append(possName if possName else funcAttrs.get("name", "Unknown"))
    #                 resToAdd["lineno:int"].append(funcAttrs.get("lineno:int", "Unknown"))

    #             nfc[str(k)][str(k2)] = resToAdd

    # fts = {}
    # for k,v in G.cutoffs.items():
    #     for k2, v2 in v.items():
    #         # print(k2)
    #         # if k2 in G.allowedFuncs:
    #             # print("%s is a builtin" % k2)
    #         # should always be true
    #         if not k2 in G.allowedFuncs:
    #             if not str(k) in fts:
    #                 fts[str(k)] = {}
    #             resToAdd = {"names": [], "lineno:int": [], "calls": v2}
    #             for ed in G.get_out_edges(k2, edge_type="OBJ_TO_AST"):
    #                 funcAttrs = G.get_node_attr(ed[1])
    #                 possName = G.get_node_attr(k2).get("name", None)
    #                 resToAdd["names"].append(possName if possName else funcAttrs.get("name", "Unknown"))
    #                 resToAdd["lineno:int"].append(funcAttrs.get("lineno:int", "Unknown"))

    #             fts[str(k)][str(k2)] = resToAdd

    else:
        with open("funcsToMethods", "rb") as f:
            funcsToMethods = pickle.load(f)

        for path in res_pathes:
            func = G.get_node_attr(G.get_node_attr(path[0]).get('funcid:int')).get("code")
            # func = G.get_node_attr(path[-1]).get("code")
            if func in funcsToMethods:
                method = funcsToMethods[func]
                if not method[0] in methodsToPathType:
                    methodsToPathType[method[0]] = []
                if not method[1] in methodsToPathType[method[0]]:
                    methodsToPathType[method[0]].append(method[1])

        if G.id_token and not "getIdToken" in methodsToPathType:
            methodsToPathType["getIDToken"] = ["getIDToken"]

    methodsWithAPath = []
    if len(G.possible_cf_nodes) > 0 and G.savedNeededInfo:
        print("Attempting to extract octo calls for first pass")
        backwardsPathGraph = {}
        for path in G.cg_paths:
            pastNode = None
            for i in range(len(path) - 1, -1, -1):
                node = path[i]
                if node == "REACHABLE":
                    continue
                if pastNode is not None:
                    if not pastNode in backwardsPathGraph:
                        backwardsPathGraph[pastNode] = set()
                    backwardsPathGraph[pastNode].add(node)
                pastNode = node

        if G.placeholderASTDef in backwardsPathGraph:
            placeholderDict = G.get_node_attr(G.placeholderASTDef).get("CALL_SITE_INFORMATION", {})
            for k in backwardsPathGraph[G.placeholderASTDef]:
                for item in placeholderDict.get(k, {}):
                    if not item in methodsWithAPath:
                        methodsWithAPath.append(item)
    
    if G.savedNeededInfo:
        firstSucc = False
        if len(G.possible_cf_nodes) > 0:
            firstSucc = True

        updateMongo(G, {
            "First Pass Only": True,
            "Successful Detect": firstSucc,
            "Octokit Methods with Paths": methodsWithAPath,
            "Finished": True,
            "Lodash Calls": list(G.lodashCalls),
            "Total Time": time.time() - totalTime
        })
    else:
        updateMongo(G, {
            "Successful Detect": G.success_detect, 
            "Finished": True, 
            "Control Dependence": methodsToPathType, 
            "Routes Found": G.routesFound, 
            "GraphQL Inputs": G.graphqlFound, 
            "Lodash Calls": list(G.lodashCalls),
            "Input to Context Calls": G.procInpsToContext,
            "Control Dependence Time": time.time() - time3,
            "Total Time": time.time() - totalTime
        })

    # Old mongo update
    # client = MongoClient(mongoLink)
    # print("Before Adding To Database:")
    # print(mongoLink)
    # print(databaseName)
    # print(collectionName)
    # print("---")
    # addCol = client[databaseName][collectionName]
    # addCol.update_one({"File": G.actionFile}, {"$set": {"Control Dependence": methodsToPathType, "WebpackKeeps": G.nccKeeps, "Routes Found": G.routesFound, "GraphQl Inputs": G.graphqlFound, "Silent Timeout": G.timeoutEver, "Timeout Places": G.timeoutVals, "Bad Requires": list(G.badRequires), "Func Obj Calls": nfc, "ControlDependenceSearch": time.time() - time3, "Function Times": fts}})
    # client.close()

    # print(databaseName)
    # print(collectionName)
    # print({"File": G.actionFile}, {"$set": {"Control Dependence": methodsToPathType, "WebpackKeeps": G.nccKeeps, "Routes Found": G.routesFound, "ControlDependenceSearch": time.time() - time3}})
    # print("Control Dependence updated for %s" % G.actionFile)


    # esError = False
    # if os.path.exists("esprimaError.log"):
        # esError = True

    # client = MongoClient(mongoLink)
    # addCol = client[databaseName][collectionName]
    # addCol.update_one({"File": G.actionFile}, {"$set": {"ESPRIMAError": esError}})
    # client.close()

    return G
