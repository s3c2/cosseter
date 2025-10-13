class Octokit {
    static VERSION = "5.0.1";
    static plugins = [];

    static defaults(args) {
        return this;
    }

    static plugin(...args) {
        return this;
    }

    constructor(params){
        this.auth = params.auth;
        function Request(params) {
            const taint = source_hqbpillvul_ga("blah");
            sink_hqbpillvul_ga(taint);
        }
        this.request = Request;
        function Merge(endpointUrl) {
            return (mergePara) => {mergePara.OCTOKIT_URL = endpointUrl; return mergePara}
        }

        function Endpoint(url) {
            const uo = {OCTOKIT_URL: url}
            this.merge = Merge(url)
            this.parse = (parsePara) => {return uo}
            // return uo
        }

        // Added to network funcs so this won't be an issue anymore (hopefully :|)
        function Paginate(params) {
            return new Promise((resolve, reject) => {
                const resp = source_hqbpillvul_ga("blah");
                resolve([resp]);
            })
        }
        this.paginate = Paginate
       function postorgsorgactionsrunnersrunner_idlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgactionsrunnersrunner_idlabels.endpoint = new Endpoint("POST /orgs/{org}/actions/runners/{runner_id}/labels")
       function postreposownerrepoactionsrunnersrunner_idlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunnersrunner_idlabels.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runners/{runner_id}/labels")
       function putorgsorgactionssecretssecret_namerepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgactionssecretssecret_namerepositoriesrepository_id.endpoint = new Endpoint("PUT /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}")
       function putorgsorgactionsvariablesnamerepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgactionsvariablesnamerepositoriesrepository_id.endpoint = new Endpoint("PUT /orgs/{org}/actions/variables/{name}/repositories/{repository_id}")
       function postreposownerrepoactionsrunsrun_idapprove(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunsrun_idapprove.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runs/{run_id}/approve")
       function postreposownerrepoactionsrunsrun_idcancel(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunsrun_idcancel.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runs/{run_id}/cancel")
       function postrepositoriesrepository_idenvironmentsenvironment_namevariables(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postrepositoriesrepository_idenvironmentsenvironment_namevariables.endpoint = new Endpoint("POST /repositories/{repository_id}/environments/{environment_name}/variables")
       function putrepositoriesrepository_idenvironmentsenvironment_namesecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putrepositoriesrepository_idenvironmentsenvironment_namesecretssecret_name.endpoint = new Endpoint("PUT /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}")
       function putorgsorgactionssecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgactionssecretssecret_name.endpoint = new Endpoint("PUT /orgs/{org}/actions/secrets/{secret_name}")
       function putreposownerrepoactionssecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoactionssecretssecret_name.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}")
       function postorgsorgactionsvariables(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgactionsvariables.endpoint = new Endpoint("POST /orgs/{org}/actions/variables")
       function postorgsorgactionsrunnersregistrationtoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgactionsrunnersregistrationtoken.endpoint = new Endpoint("POST /orgs/{org}/actions/runners/registration-token")
       function postreposownerrepoactionsrunnersregistrationtoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunnersregistrationtoken.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runners/registration-token")
       function postorgsorgactionsrunnersremovetoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgactionsrunnersremovetoken.endpoint = new Endpoint("POST /orgs/{org}/actions/runners/remove-token")
       function postreposownerrepoactionsrunnersremovetoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunnersremovetoken.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runners/remove-token")
       function postreposownerrepoactionsvariables(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsvariables.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/variables")
       function postreposownerrepoactionsworkflowsworkflow_iddispatches(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsworkflowsworkflow_iddispatches.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches")
       function deletereposownerrepoactionscachescache_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoactionscachescache_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}")
       function deletereposownerrepoactionscacheskeyref(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoactionscacheskeyref.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/actions/caches{?key,ref}")
       function deletereposownerrepoactionsartifactsartifact_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoactionsartifactsartifact_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/actions/artifacts/{artifact_id}")
       function deleterepositoriesrepository_idenvironmentsenvironment_namesecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleterepositoriesrepository_idenvironmentsenvironment_namesecretssecret_name.endpoint = new Endpoint("DELETE /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}")
       function deleterepositoriesrepository_idenvironmentsenvironment_namevariablesname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleterepositoriesrepository_idenvironmentsenvironment_namevariablesname.endpoint = new Endpoint("DELETE /repositories/{repository_id}/environments/{environment_name}/variables/{name}")
       function deleteorgsorgactionssecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgactionssecretssecret_name.endpoint = new Endpoint("DELETE /orgs/{org}/actions/secrets/{secret_name}")
       function deleteorgsorgactionsvariablesname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgactionsvariablesname.endpoint = new Endpoint("DELETE /orgs/{org}/actions/variables/{name}")
       function deletereposownerrepoactionssecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoactionssecretssecret_name.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}")
       function deletereposownerrepoactionsvariablesname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoactionsvariablesname.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/actions/variables/{name}")
       function deleteorgsorgactionsrunnersrunner_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgactionsrunnersrunner_id.endpoint = new Endpoint("DELETE /orgs/{org}/actions/runners/{runner_id}")
       function deletereposownerrepoactionsrunnersrunner_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoactionsrunnersrunner_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}")
       function deletereposownerrepoactionsrunsrun_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoactionsrunsrun_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/actions/runs/{run_id}")
       function deletereposownerrepoactionsrunsrun_idlogs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoactionsrunsrun_idlogs.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/actions/runs/{run_id}/logs")
       function deleteorgsorgactionspermissionsrepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgactionspermissionsrepositoriesrepository_id.endpoint = new Endpoint("DELETE /orgs/{org}/actions/permissions/repositories/{repository_id}")
       function putreposownerrepoactionsworkflowsworkflow_iddisable(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoactionsworkflowsworkflow_iddisable.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/disable")
       function getreposownerrepoactionsartifactsartifact_idarchive_format(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsartifactsartifact_idarchive_format.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}")
       function getreposownerrepoactionsjobsjob_idlogs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsjobsjob_idlogs.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs")
       function getreposownerrepoactionsrunsrun_idattemptsattempt_numberlogs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunsrun_idattemptsattempt_numberlogs.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/logs")
       function getreposownerrepoactionsrunsrun_idlogs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunsrun_idlogs.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs")
       function putorgsorgactionspermissionsrepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgactionspermissionsrepositoriesrepository_id.endpoint = new Endpoint("PUT /orgs/{org}/actions/permissions/repositories/{repository_id}")
       function putreposownerrepoactionsworkflowsworkflow_idenable(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoactionsworkflowsworkflow_idenable.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/actions/workflows/{workflow_id}/enable")
       function postreposownerrepoactionsrunsrun_idforcecancel(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunsrun_idforcecancel.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runs/{run_id}/force-cancel")
       function postorgsorgactionsrunnersgeneratejitconfig(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgactionsrunnersgeneratejitconfig.endpoint = new Endpoint("POST /orgs/{org}/actions/runners/generate-jitconfig")
       function postreposownerrepoactionsrunnersgeneratejitconfig(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunnersgeneratejitconfig.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runners/generate-jitconfig")
       function getreposownerrepoactionscaches(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionscaches.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/caches")
       function getreposownerrepoactionscacheusage(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionscacheusage.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/cache/usage")
       function getorgsorgactionscacheusagebyrepository(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionscacheusagebyrepository.endpoint = new Endpoint("GET /orgs/{org}/actions/cache/usage-by-repository")
       function getorgsorgactionscacheusage(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionscacheusage.endpoint = new Endpoint("GET /orgs/{org}/actions/cache/usage")
       function getorgsorgactionspermissionsselectedactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionspermissionsselectedactions.endpoint = new Endpoint("GET /orgs/{org}/actions/permissions/selected-actions")
       function getreposownerrepoactionspermissionsselectedactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionspermissionsselectedactions.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/permissions/selected-actions")
       function getreposownerrepoactionsartifactsartifact_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsartifactsartifact_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}")
       function getreposownerrepoactionsoidccustomizationsub(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsoidccustomizationsub.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/oidc/customization/sub")
       function getrepositoriesrepository_idenvironmentsenvironment_namesecretspublickey(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getrepositoriesrepository_idenvironmentsenvironment_namesecretspublickey.endpoint = new Endpoint("GET /repositories/{repository_id}/environments/{environment_name}/secrets/public-key")
       function getrepositoriesrepository_idenvironmentsenvironment_namesecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getrepositoriesrepository_idenvironmentsenvironment_namesecretssecret_name.endpoint = new Endpoint("GET /repositories/{repository_id}/environments/{environment_name}/secrets/{secret_name}")
       function getrepositoriesrepository_idenvironmentsenvironment_namevariablesname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getrepositoriesrepository_idenvironmentsenvironment_namevariablesname.endpoint = new Endpoint("GET /repositories/{repository_id}/environments/{environment_name}/variables/{name}")
       function getorgsorgactionspermissionsworkflow(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionspermissionsworkflow.endpoint = new Endpoint("GET /orgs/{org}/actions/permissions/workflow")
       function getreposownerrepoactionspermissionsworkflow(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionspermissionsworkflow.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/permissions/workflow")
       function getorgsorgactionspermissions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionspermissions.endpoint = new Endpoint("GET /orgs/{org}/actions/permissions")
       function getreposownerrepoactionspermissions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionspermissions.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/permissions")
       function getreposownerrepoactionsjobsjob_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsjobsjob_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/jobs/{job_id}")
       function getorgsorgactionssecretspublickey(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionssecretspublickey.endpoint = new Endpoint("GET /orgs/{org}/actions/secrets/public-key")
       function getorgsorgactionssecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionssecretssecret_name.endpoint = new Endpoint("GET /orgs/{org}/actions/secrets/{secret_name}")
       function getorgsorgactionsvariablesname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionsvariablesname.endpoint = new Endpoint("GET /orgs/{org}/actions/variables/{name}")
       function getreposownerrepoactionsrunsrun_idpending_deployments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunsrun_idpending_deployments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments")
       function getreposownerrepoactionspermissions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionspermissions.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/permissions")
       function getreposownerrepoactionssecretspublickey(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionssecretspublickey.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/secrets/public-key")
       function getreposownerrepoactionssecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionssecretssecret_name.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/secrets/{secret_name}")
       function getreposownerrepoactionsvariablesname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsvariablesname.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/variables/{name}")
       function getreposownerrepoactionsrunsrun_idapprovals(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunsrun_idapprovals.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs/{run_id}/approvals")
       function getorgsorgactionsrunnersrunner_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionsrunnersrunner_id.endpoint = new Endpoint("GET /orgs/{org}/actions/runners/{runner_id}")
       function getreposownerrepoactionsrunnersrunner_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunnersrunner_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runners/{runner_id}")
       function getreposownerrepoactionsworkflowsworkflow_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsworkflowsworkflow_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}")
       function getreposownerrepoactionspermissionsaccess(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionspermissionsaccess.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/permissions/access")
       function getreposownerrepoactionsrunsrun_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunsrun_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs/{run_id}")
       function getreposownerrepoactionsrunsrun_idattemptsattempt_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunsrun_idattemptsattempt_number.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}")
       function getreposownerrepoactionsrunsrun_idtiming(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunsrun_idtiming.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs/{run_id}/timing")
       function getreposownerrepoactionsworkflowsworkflow_idtiming(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsworkflowsworkflow_idtiming.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/timing")
       function getreposownerrepoactionsartifacts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsartifacts.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/artifacts")
       function getrepositoriesrepository_idenvironmentsenvironment_namesecrets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getrepositoriesrepository_idenvironmentsenvironment_namesecrets.endpoint = new Endpoint("GET /repositories/{repository_id}/environments/{environment_name}/secrets")
       function getrepositoriesrepository_idenvironmentsenvironment_namevariables(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getrepositoriesrepository_idenvironmentsenvironment_namevariables.endpoint = new Endpoint("GET /repositories/{repository_id}/environments/{environment_name}/variables")
       function getreposownerrepoactionsrunsrun_idjobs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunsrun_idjobs.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs")
       function getreposownerrepoactionsrunsrun_idattemptsattempt_numberjobs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunsrun_idattemptsattempt_numberjobs.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}/jobs")
       function getorgsorgactionsrunnersrunner_idlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionsrunnersrunner_idlabels.endpoint = new Endpoint("GET /orgs/{org}/actions/runners/{runner_id}/labels")
       function getreposownerrepoactionsrunnersrunner_idlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunnersrunner_idlabels.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runners/{runner_id}/labels")
       function getorgsorgactionssecrets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionssecrets.endpoint = new Endpoint("GET /orgs/{org}/actions/secrets")
       function getorgsorgactionsvariables(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionsvariables.endpoint = new Endpoint("GET /orgs/{org}/actions/variables")
       function getreposownerrepoactionsorganizationsecrets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsorganizationsecrets.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/organization-secrets")
       function getreposownerrepoactionsorganizationvariables(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsorganizationvariables.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/organization-variables")
       function getreposownerrepoactionssecrets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionssecrets.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/secrets")
       function getreposownerrepoactionsvariables(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsvariables.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/variables")
       function getreposownerrepoactionsworkflows(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsworkflows.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/workflows")
       function getorgsorgactionsrunnersdownloads(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionsrunnersdownloads.endpoint = new Endpoint("GET /orgs/{org}/actions/runners/downloads")
       function getreposownerrepoactionsrunnersdownloads(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunnersdownloads.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runners/downloads")
       function getorgsorgactionssecretssecret_namerepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionssecretssecret_namerepositories.endpoint = new Endpoint("GET /orgs/{org}/actions/secrets/{secret_name}/repositories")
       function getorgsorgactionsvariablesnamerepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionsvariablesnamerepositories.endpoint = new Endpoint("GET /orgs/{org}/actions/variables/{name}/repositories")
       function getorgsorgactionspermissionsrepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionspermissionsrepositories.endpoint = new Endpoint("GET /orgs/{org}/actions/permissions/repositories")
       function getorgsorgactionsrunners(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionsrunners.endpoint = new Endpoint("GET /orgs/{org}/actions/runners")
       function getreposownerrepoactionsrunners(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunners.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runners")
       function getreposownerrepoactionsrunsrun_idartifacts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunsrun_idartifacts.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts")
       function getreposownerrepoactionsworkflowsworkflow_idruns(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsworkflowsworkflow_idruns.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/workflows/{workflow_id}/runs")
       function getreposownerrepoactionsruns(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsruns.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs")
       function postreposownerrepoactionsjobsjob_idrerun(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsjobsjob_idrerun.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/jobs/{job_id}/rerun")
       function postreposownerrepoactionsrunsrun_idrerun(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunsrun_idrerun.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun")
       function postreposownerrepoactionsrunsrun_idrerunfailedjobs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunsrun_idrerunfailedjobs.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runs/{run_id}/rerun-failed-jobs")
       function deleteorgsorgactionsrunnersrunner_idlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgactionsrunnersrunner_idlabels.endpoint = new Endpoint("DELETE /orgs/{org}/actions/runners/{runner_id}/labels")
       function deletereposownerrepoactionsrunnersrunner_idlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoactionsrunnersrunner_idlabels.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels")
       function deleteorgsorgactionsrunnersrunner_idlabelsname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgactionsrunnersrunner_idlabelsname.endpoint = new Endpoint("DELETE /orgs/{org}/actions/runners/{runner_id}/labels/{name}")
       function deletereposownerrepoactionsrunnersrunner_idlabelsname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoactionsrunnersrunner_idlabelsname.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}/labels/{name}")
       function deleteorgsorgactionssecretssecret_namerepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgactionssecretssecret_namerepositoriesrepository_id.endpoint = new Endpoint("DELETE /orgs/{org}/actions/secrets/{secret_name}/repositories/{repository_id}")
       function deleteorgsorgactionsvariablesnamerepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgactionsvariablesnamerepositoriesrepository_id.endpoint = new Endpoint("DELETE /orgs/{org}/actions/variables/{name}/repositories/{repository_id}")
       function postreposownerrepoactionsrunsrun_iddeployment_protection_rule(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunsrun_iddeployment_protection_rule.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runs/{run_id}/deployment_protection_rule")
       function postreposownerrepoactionsrunsrun_idpending_deployments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunsrun_idpending_deployments.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runs/{run_id}/pending_deployments")
       function putorgsorgactionspermissionsselectedactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgactionspermissionsselectedactions.endpoint = new Endpoint("PUT /orgs/{org}/actions/permissions/selected-actions")
       function putreposownerrepoactionspermissionsselectedactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoactionspermissionsselectedactions.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/actions/permissions/selected-actions")
       function putorgsorgactionsrunnersrunner_idlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgactionsrunnersrunner_idlabels.endpoint = new Endpoint("PUT /orgs/{org}/actions/runners/{runner_id}/labels")
       function putreposownerrepoactionsrunnersrunner_idlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoactionsrunnersrunner_idlabels.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/actions/runners/{runner_id}/labels")
       function putreposownerrepoactionsoidccustomizationsub(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoactionsoidccustomizationsub.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/actions/oidc/customization/sub")
       function putorgsorgactionspermissionsworkflow(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgactionspermissionsworkflow.endpoint = new Endpoint("PUT /orgs/{org}/actions/permissions/workflow")
       function putreposownerrepoactionspermissionsworkflow(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoactionspermissionsworkflow.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/actions/permissions/workflow")
       function putorgsorgactionspermissions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgactionspermissions.endpoint = new Endpoint("PUT /orgs/{org}/actions/permissions")
       function putreposownerrepoactionspermissions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoactionspermissions.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/actions/permissions")
       function putorgsorgactionssecretssecret_namerepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgactionssecretssecret_namerepositories.endpoint = new Endpoint("PUT /orgs/{org}/actions/secrets/{secret_name}/repositories")
       function putorgsorgactionsvariablesnamerepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgactionsvariablesnamerepositories.endpoint = new Endpoint("PUT /orgs/{org}/actions/variables/{name}/repositories")
       function putorgsorgactionspermissionsrepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgactionspermissionsrepositories.endpoint = new Endpoint("PUT /orgs/{org}/actions/permissions/repositories")
       function putreposownerrepoactionspermissionsaccess(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoactionspermissionsaccess.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/actions/permissions/access")
       function patchrepositoriesrepository_idenvironmentsenvironment_namevariablesname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchrepositoriesrepository_idenvironmentsenvironment_namevariablesname.endpoint = new Endpoint("PATCH /repositories/{repository_id}/environments/{environment_name}/variables/{name}")
       function patchorgsorgactionsvariablesname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchorgsorgactionsvariablesname.endpoint = new Endpoint("PATCH /orgs/{org}/actions/variables/{name}")
       function patchreposownerrepoactionsvariablesname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepoactionsvariablesname.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/actions/variables/{name}")
       function putreposownerrepoactionssecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoactionssecretssecret_name.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/actions/secrets/{secret_name}")
       function postreposownerrepoactionsrunnersregistrationtoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunnersregistrationtoken.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runners/registration-token")
       function postreposownerrepoactionsrunnersremovetoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoactionsrunnersremovetoken.endpoint = new Endpoint("POST /repos/{owner}/{repo}/actions/runners/remove-token")
       function deletereposownerrepoactionssecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoactionssecretssecret_name.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/actions/secrets/{secret_name}")
       function getreposownerrepoactionsjobsjob_idlogs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsjobsjob_idlogs.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs")
       function getreposownerrepoactionssecretspublickey(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionssecretspublickey.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/secrets/public-key")
       function getreposownerrepoactionssecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionssecretssecret_name.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/secrets/{secret_name}")
       function getreposownerrepoactionsrunnersrunner_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunnersrunner_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runners/{runner_id}")
       function getreposownerrepoactionsjobsjob_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsjobsjob_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/jobs/{job_id}")
       function getreposownerrepoactionsrunnersdownloads(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunnersdownloads.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runners/downloads")
       function getreposownerrepoactionsruns(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsruns.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs")
       function getreposownerrepoactionssecrets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionssecrets.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/secrets")
       function getreposownerrepoactionsjobsjob_idlogs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsjobsjob_idlogs.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/jobs/{job_id}/logs")
       function getreposownerrepoactionsrunsrun_idlogs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactionsrunsrun_idlogs.endpoint = new Endpoint("GET /repos/{owner}/{repo}/actions/runs/{run_id}/logs")
       function deletereposownerrepoactionsrunnersrunner_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoactionsrunnersrunner_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/actions/runners/{runner_id}")
      function Actions() {
           this.addCustomLabelsToSelfHostedRunnerForOrg = postorgsorgactionsrunnersrunner_idlabels;
           this.addCustomLabelsToSelfHostedRunnerForRepo = postreposownerrepoactionsrunnersrunner_idlabels;
           this.addSelectedRepoToOrgSecret = putorgsorgactionssecretssecret_namerepositoriesrepository_id;
           this.addSelectedRepoToOrgVariable = putorgsorgactionsvariablesnamerepositoriesrepository_id;
           this.approveWorkflowRun = postreposownerrepoactionsrunsrun_idapprove;
           this.cancelWorkflowRun = postreposownerrepoactionsrunsrun_idcancel;
           this.createEnvironmentVariable = postrepositoriesrepository_idenvironmentsenvironment_namevariables;
           this.createOrUpdateEnvironmentSecret = putrepositoriesrepository_idenvironmentsenvironment_namesecretssecret_name;
           this.createOrUpdateOrgSecret = putorgsorgactionssecretssecret_name;
           this.createOrUpdateRepoSecret = putreposownerrepoactionssecretssecret_name;
           this.createOrgVariable = postorgsorgactionsvariables;
           this.createRegistrationTokenForOrg = postorgsorgactionsrunnersregistrationtoken;
           this.createRegistrationTokenForRepo = postreposownerrepoactionsrunnersregistrationtoken;
           this.createRemoveTokenForOrg = postorgsorgactionsrunnersremovetoken;
           this.createRemoveTokenForRepo = postreposownerrepoactionsrunnersremovetoken;
           this.createRepoVariable = postreposownerrepoactionsvariables;
           this.createWorkflowDispatch = postreposownerrepoactionsworkflowsworkflow_iddispatches;
           this.deleteActionsCacheById = deletereposownerrepoactionscachescache_id;
           this.deleteActionsCacheByKey = deletereposownerrepoactionscacheskeyref;
           this.deleteArtifact = deletereposownerrepoactionsartifactsartifact_id;
           this.deleteEnvironmentSecret = deleterepositoriesrepository_idenvironmentsenvironment_namesecretssecret_name;
           this.deleteEnvironmentVariable = deleterepositoriesrepository_idenvironmentsenvironment_namevariablesname;
           this.deleteOrgSecret = deleteorgsorgactionssecretssecret_name;
           this.deleteOrgVariable = deleteorgsorgactionsvariablesname;
           this.deleteRepoSecret = deletereposownerrepoactionssecretssecret_name;
           this.deleteRepoVariable = deletereposownerrepoactionsvariablesname;
           this.deleteSelfHostedRunnerFromOrg = deleteorgsorgactionsrunnersrunner_id;
           this.deleteSelfHostedRunnerFromRepo = deletereposownerrepoactionsrunnersrunner_id;
           this.deleteWorkflowRun = deletereposownerrepoactionsrunsrun_id;
           this.deleteWorkflowRunLogs = deletereposownerrepoactionsrunsrun_idlogs;
           this.disableSelectedRepositoryGithubActionsOrganization = deleteorgsorgactionspermissionsrepositoriesrepository_id;
           this.disableWorkflow = putreposownerrepoactionsworkflowsworkflow_iddisable;
           this.downloadArtifact = getreposownerrepoactionsartifactsartifact_idarchive_format;
           this.downloadJobLogsForWorkflowRun = getreposownerrepoactionsjobsjob_idlogs;
           this.downloadWorkflowRunAttemptLogs = getreposownerrepoactionsrunsrun_idattemptsattempt_numberlogs;
           this.downloadWorkflowRunLogs = getreposownerrepoactionsrunsrun_idlogs;
           this.enableSelectedRepositoryGithubActionsOrganization = putorgsorgactionspermissionsrepositoriesrepository_id;
           this.enableWorkflow = putreposownerrepoactionsworkflowsworkflow_idenable;
           this.forceCancelWorkflowRun = postreposownerrepoactionsrunsrun_idforcecancel;
           this.generateRunnerJitconfigForOrg = postorgsorgactionsrunnersgeneratejitconfig;
           this.generateRunnerJitconfigForRepo = postreposownerrepoactionsrunnersgeneratejitconfig;
           this.getActionsCacheList = getreposownerrepoactionscaches;
           this.getActionsCacheUsage = getreposownerrepoactionscacheusage;
           this.getActionsCacheUsageByRepoForOrg = getorgsorgactionscacheusagebyrepository;
           this.getActionsCacheUsageForOrg = getorgsorgactionscacheusage;
           this.getAllowedActionsOrganization = getorgsorgactionspermissionsselectedactions;
           this.getAllowedActionsRepository = getreposownerrepoactionspermissionsselectedactions;
           this.getArtifact = getreposownerrepoactionsartifactsartifact_id;
           this.getCustomOidcSubClaimForRepo = getreposownerrepoactionsoidccustomizationsub;
           this.getEnvironmentPublicKey = getrepositoriesrepository_idenvironmentsenvironment_namesecretspublickey;
           this.getEnvironmentSecret = getrepositoriesrepository_idenvironmentsenvironment_namesecretssecret_name;
           this.getEnvironmentVariable = getrepositoriesrepository_idenvironmentsenvironment_namevariablesname;
           this.getGithubActionsDefaultWorkflowPermissionsOrganization = getorgsorgactionspermissionsworkflow;
           this.getGithubActionsDefaultWorkflowPermissionsRepository = getreposownerrepoactionspermissionsworkflow;
           this.getGithubActionsPermissionsOrganization = getorgsorgactionspermissions;
           this.getGithubActionsPermissionsRepository = getreposownerrepoactionspermissions;
           this.getJobForWorkflowRun = getreposownerrepoactionsjobsjob_id;
           this.getOrgPublicKey = getorgsorgactionssecretspublickey;
           this.getOrgSecret = getorgsorgactionssecretssecret_name;
           this.getOrgVariable = getorgsorgactionsvariablesname;
           this.getPendingDeploymentsForRun = getreposownerrepoactionsrunsrun_idpending_deployments;
           this.getRepoPermissions = getreposownerrepoactionspermissions;
           this.getRepoPublicKey = getreposownerrepoactionssecretspublickey;
           this.getRepoSecret = getreposownerrepoactionssecretssecret_name;
           this.getRepoVariable = getreposownerrepoactionsvariablesname;
           this.getReviewsForRun = getreposownerrepoactionsrunsrun_idapprovals;
           this.getSelfHostedRunnerForOrg = getorgsorgactionsrunnersrunner_id;
           this.getSelfHostedRunnerForRepo = getreposownerrepoactionsrunnersrunner_id;
           this.getWorkflow = getreposownerrepoactionsworkflowsworkflow_id;
           this.getWorkflowAccessToRepository = getreposownerrepoactionspermissionsaccess;
           this.getWorkflowRun = getreposownerrepoactionsrunsrun_id;
           this.getWorkflowRunAttempt = getreposownerrepoactionsrunsrun_idattemptsattempt_number;
           this.getWorkflowRunUsage = getreposownerrepoactionsrunsrun_idtiming;
           this.getWorkflowUsage = getreposownerrepoactionsworkflowsworkflow_idtiming;
           this.listArtifactsForRepo = getreposownerrepoactionsartifacts;
           this.listEnvironmentSecrets = getrepositoriesrepository_idenvironmentsenvironment_namesecrets;
           this.listEnvironmentVariables = getrepositoriesrepository_idenvironmentsenvironment_namevariables;
           this.listJobsForWorkflowRun = getreposownerrepoactionsrunsrun_idjobs;
           this.listJobsForWorkflowRunAttempt = getreposownerrepoactionsrunsrun_idattemptsattempt_numberjobs;
           this.listLabelsForSelfHostedRunnerForOrg = getorgsorgactionsrunnersrunner_idlabels;
           this.listLabelsForSelfHostedRunnerForRepo = getreposownerrepoactionsrunnersrunner_idlabels;
           this.listOrgSecrets = getorgsorgactionssecrets;
           this.listOrgVariables = getorgsorgactionsvariables;
           this.listRepoOrganizationSecrets = getreposownerrepoactionsorganizationsecrets;
           this.listRepoOrganizationVariables = getreposownerrepoactionsorganizationvariables;
           this.listRepoSecrets = getreposownerrepoactionssecrets;
           this.listRepoVariables = getreposownerrepoactionsvariables;
           this.listRepoWorkflows = getreposownerrepoactionsworkflows;
           this.listRunnerApplicationsForOrg = getorgsorgactionsrunnersdownloads;
           this.listRunnerApplicationsForRepo = getreposownerrepoactionsrunnersdownloads;
           this.listSelectedReposForOrgSecret = getorgsorgactionssecretssecret_namerepositories;
           this.listSelectedReposForOrgVariable = getorgsorgactionsvariablesnamerepositories;
           this.listSelectedRepositoriesEnabledGithubActionsOrganization = getorgsorgactionspermissionsrepositories;
           this.listSelfHostedRunnersForOrg = getorgsorgactionsrunners;
           this.listSelfHostedRunnersForRepo = getreposownerrepoactionsrunners;
           this.listWorkflowRunArtifacts = getreposownerrepoactionsrunsrun_idartifacts;
           this.listWorkflowRuns = getreposownerrepoactionsworkflowsworkflow_idruns;
           this.listWorkflowRunsForRepo = getreposownerrepoactionsruns;
           this.reRunJobForWorkflowRun = postreposownerrepoactionsjobsjob_idrerun;
           this.reRunWorkflow = postreposownerrepoactionsrunsrun_idrerun;
           this.reRunWorkflowFailedJobs = postreposownerrepoactionsrunsrun_idrerunfailedjobs;
           this.removeAllCustomLabelsFromSelfHostedRunnerForOrg = deleteorgsorgactionsrunnersrunner_idlabels;
           this.removeAllCustomLabelsFromSelfHostedRunnerForRepo = deletereposownerrepoactionsrunnersrunner_idlabels;
           this.removeCustomLabelFromSelfHostedRunnerForOrg = deleteorgsorgactionsrunnersrunner_idlabelsname;
           this.removeCustomLabelFromSelfHostedRunnerForRepo = deletereposownerrepoactionsrunnersrunner_idlabelsname;
           this.removeSelectedRepoFromOrgSecret = deleteorgsorgactionssecretssecret_namerepositoriesrepository_id;
           this.removeSelectedRepoFromOrgVariable = deleteorgsorgactionsvariablesnamerepositoriesrepository_id;
           this.reviewCustomGatesForRun = postreposownerrepoactionsrunsrun_iddeployment_protection_rule;
           this.reviewPendingDeploymentsForRun = postreposownerrepoactionsrunsrun_idpending_deployments;
           this.setAllowedActionsOrganization = putorgsorgactionspermissionsselectedactions;
           this.setAllowedActionsRepository = putreposownerrepoactionspermissionsselectedactions;
           this.setCustomLabelsForSelfHostedRunnerForOrg = putorgsorgactionsrunnersrunner_idlabels;
           this.setCustomLabelsForSelfHostedRunnerForRepo = putreposownerrepoactionsrunnersrunner_idlabels;
           this.setCustomOidcSubClaimForRepo = putreposownerrepoactionsoidccustomizationsub;
           this.setGithubActionsDefaultWorkflowPermissionsOrganization = putorgsorgactionspermissionsworkflow;
           this.setGithubActionsDefaultWorkflowPermissionsRepository = putreposownerrepoactionspermissionsworkflow;
           this.setGithubActionsPermissionsOrganization = putorgsorgactionspermissions;
           this.setGithubActionsPermissionsRepository = putreposownerrepoactionspermissions;
           this.setSelectedReposForOrgSecret = putorgsorgactionssecretssecret_namerepositories;
           this.setSelectedReposForOrgVariable = putorgsorgactionsvariablesnamerepositories;
           this.setSelectedRepositoriesEnabledGithubActionsOrganization = putorgsorgactionspermissionsrepositories;
           this.setWorkflowAccessToRepository = putreposownerrepoactionspermissionsaccess;
           this.updateEnvironmentVariable = patchrepositoriesrepository_idenvironmentsenvironment_namevariablesname;
           this.updateOrgVariable = patchorgsorgactionsvariablesname;
           this.updateRepoVariable = patchreposownerrepoactionsvariablesname;
           this.createOrUpdateSecretForRepo = putreposownerrepoactionssecretssecret_name;
           this.createRegistrationToken = postreposownerrepoactionsrunnersregistrationtoken;
           this.createRemoveToken = postreposownerrepoactionsrunnersremovetoken;
           this.deleteSecretFromRepo = deletereposownerrepoactionssecretssecret_name;
           this.downloadWorkflowJobLogs = getreposownerrepoactionsjobsjob_idlogs;
           this.getPublicKey = getreposownerrepoactionssecretspublickey;
           this.getSecret = getreposownerrepoactionssecretssecret_name;
           this.getSelfHostedRunner = getreposownerrepoactionsrunnersrunner_id;
           this.getWorkflowJob = getreposownerrepoactionsjobsjob_id;
           this.listDownloadsForSelfHostedRunnerApplication = getreposownerrepoactionsrunnersdownloads;
           this.listRepoWorkflowRuns = getreposownerrepoactionsruns;
           this.listSecretsForRepo = getreposownerrepoactionssecrets;
           this.listWorkflowJobLogs = getreposownerrepoactionsjobsjob_idlogs;
           this.listWorkflowRunLogs = getreposownerrepoactionsrunsrun_idlogs;
           this.removeSelfHostedRunner = deletereposownerrepoactionsrunnersrunner_id;
        }
       function getuserstarredownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserstarredownerrepo.endpoint = new Endpoint("GET /user/starred/{owner}/{repo}")
       function deletereposownerreposubscription(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerreposubscription.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/subscription")
       function deletenotificationsthreadsthread_idsubscription(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletenotificationsthreadsthread_idsubscription.endpoint = new Endpoint("DELETE /notifications/threads/{thread_id}/subscription")
       function getfeeds(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getfeeds.endpoint = new Endpoint("GET /feeds")
       function getreposownerreposubscription(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreposubscription.endpoint = new Endpoint("GET /repos/{owner}/{repo}/subscription")
       function getnotificationsthreadsthread_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getnotificationsthreadsthread_id.endpoint = new Endpoint("GET /notifications/threads/{thread_id}")
       function getnotificationsthreadsthread_idsubscription(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getnotificationsthreadsthread_idsubscription.endpoint = new Endpoint("GET /notifications/threads/{thread_id}/subscription")
       function getusersusernameevents(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernameevents.endpoint = new Endpoint("GET /users/{username}/events")
       function getnotifications(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getnotifications.endpoint = new Endpoint("GET /notifications")
       function getusersusernameeventsorgsorg(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernameeventsorgsorg.endpoint = new Endpoint("GET /users/{username}/events/orgs/{org}")
       function getevents(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getevents.endpoint = new Endpoint("GET /events")
       function getnetworksownerrepoevents(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getnetworksownerrepoevents.endpoint = new Endpoint("GET /networks/{owner}/{repo}/events")
       function getusersusernameeventspublic(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernameeventspublic.endpoint = new Endpoint("GET /users/{username}/events/public")
       function getorgsorgevents(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgevents.endpoint = new Endpoint("GET /orgs/{org}/events")
       function getusersusernamereceived_events(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamereceived_events.endpoint = new Endpoint("GET /users/{username}/received_events")
       function getusersusernamereceived_eventspublic(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamereceived_eventspublic.endpoint = new Endpoint("GET /users/{username}/received_events/public")
       function getreposownerrepoevents(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoevents.endpoint = new Endpoint("GET /repos/{owner}/{repo}/events")
       function getreposownerreponotifications(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreponotifications.endpoint = new Endpoint("GET /repos/{owner}/{repo}/notifications")
       function getuserstarred(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserstarred.endpoint = new Endpoint("GET /user/starred")
       function getusersusernamestarred(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamestarred.endpoint = new Endpoint("GET /users/{username}/starred")
       function getusersusernamesubscriptions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamesubscriptions.endpoint = new Endpoint("GET /users/{username}/subscriptions")
       function getreposownerrepostargazers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepostargazers.endpoint = new Endpoint("GET /repos/{owner}/{repo}/stargazers")
       function getusersubscriptions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersubscriptions.endpoint = new Endpoint("GET /user/subscriptions")
       function getreposownerreposubscribers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreposubscribers.endpoint = new Endpoint("GET /repos/{owner}/{repo}/subscribers")
       function putnotifications(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putnotifications.endpoint = new Endpoint("PUT /notifications")
       function putreposownerreponotifications(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerreponotifications.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/notifications")
       function patchnotificationsthreadsthread_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchnotificationsthreadsthread_id.endpoint = new Endpoint("PATCH /notifications/threads/{thread_id}")
       function putreposownerreposubscription(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerreposubscription.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/subscription")
       function putnotificationsthreadsthread_idsubscription(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putnotificationsthreadsthread_idsubscription.endpoint = new Endpoint("PUT /notifications/threads/{thread_id}/subscription")
       function putuserstarredownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putuserstarredownerrepo.endpoint = new Endpoint("PUT /user/starred/{owner}/{repo}")
       function deleteuserstarredownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserstarredownerrepo.endpoint = new Endpoint("DELETE /user/starred/{owner}/{repo}")
       function getuserstarredownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserstarredownerrepo.endpoint = new Endpoint("GET /user/starred/{owner}/{repo}")
       function getnotificationsthreadsthread_idsubscription(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getnotificationsthreadsthread_idsubscription.endpoint = new Endpoint("GET /notifications/threads/{thread_id}/subscription")
       function getusersusernameeventsorgsorg(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernameeventsorgsorg.endpoint = new Endpoint("GET /users/{username}/events/orgs/{org}")
       function getusersusernameevents(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernameevents.endpoint = new Endpoint("GET /users/{username}/events")
       function getfeeds(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getfeeds.endpoint = new Endpoint("GET /feeds")
       function getnotifications(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getnotifications.endpoint = new Endpoint("GET /notifications")
       function getreposownerreponotifications(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreponotifications.endpoint = new Endpoint("GET /repos/{owner}/{repo}/notifications")
       function getorgsorgevents(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgevents.endpoint = new Endpoint("GET /orgs/{org}/events")
       function putnotifications(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putnotifications.endpoint = new Endpoint("PUT /notifications")
       function putreposownerreponotifications(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerreponotifications.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/notifications")
       function putuserstarredownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putuserstarredownerrepo.endpoint = new Endpoint("PUT /user/starred/{owner}/{repo}")
       function deleteuserstarredownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserstarredownerrepo.endpoint = new Endpoint("DELETE /user/starred/{owner}/{repo}")
      function Activity() {
           this.checkRepoIsStarredByAuthenticatedUser = getuserstarredownerrepo;
           this.deleteRepoSubscription = deletereposownerreposubscription;
           this.deleteThreadSubscription = deletenotificationsthreadsthread_idsubscription;
           this.getFeeds = getfeeds;
           this.getRepoSubscription = getreposownerreposubscription;
           this.getThread = getnotificationsthreadsthread_id;
           this.getThreadSubscriptionForAuthenticatedUser = getnotificationsthreadsthread_idsubscription;
           this.listEventsForAuthenticatedUser = getusersusernameevents;
           this.listNotificationsForAuthenticatedUser = getnotifications;
           this.listOrgEventsForAuthenticatedUser = getusersusernameeventsorgsorg;
           this.listPublicEvents = getevents;
           this.listPublicEventsForRepoNetwork = getnetworksownerrepoevents;
           this.listPublicEventsForUser = getusersusernameeventspublic;
           this.listPublicOrgEvents = getorgsorgevents;
           this.listReceivedEventsForUser = getusersusernamereceived_events;
           this.listReceivedPublicEventsForUser = getusersusernamereceived_eventspublic;
           this.listRepoEvents = getreposownerrepoevents;
           this.listRepoNotificationsForAuthenticatedUser = getreposownerreponotifications;
           this.listReposStarredByAuthenticatedUser = getuserstarred;
           this.listReposStarredByUser = getusersusernamestarred;
           this.listReposWatchedByUser = getusersusernamesubscriptions;
           this.listStargazersForRepo = getreposownerrepostargazers;
           this.listWatchedReposForAuthenticatedUser = getusersubscriptions;
           this.listWatchersForRepo = getreposownerreposubscribers;
           this.markNotificationsAsRead = putnotifications;
           this.markRepoNotificationsAsRead = putreposownerreponotifications;
           this.markThreadAsRead = patchnotificationsthreadsthread_id;
           this.setRepoSubscription = putreposownerreposubscription;
           this.setThreadSubscription = putnotificationsthreadsthread_idsubscription;
           this.starRepoForAuthenticatedUser = putuserstarredownerrepo;
           this.unstarRepoForAuthenticatedUser = deleteuserstarredownerrepo;
           this.checkStarringRepo = getuserstarredownerrepo;
           this.getThreadSubscription = getnotificationsthreadsthread_idsubscription;
           this.listEventsForOrg = getusersusernameeventsorgsorg;
           this.listEventsForUser = getusersusernameevents;
           this.listFeeds = getfeeds;
           this.listNotifications = getnotifications;
           this.listNotificationsForRepo = getreposownerreponotifications;
           this.listPublicEventsForOrg = getorgsorgevents;
           this.markAsRead = putnotifications;
           this.markNotificationsAsReadForRepo = putreposownerreponotifications;
           this.starRepo = putuserstarredownerrepo;
           this.unstarRepo = deleteuserstarredownerrepo;
        }
       function putuserinstallationsinstallation_idrepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putuserinstallationsinstallation_idrepositoriesrepository_id.endpoint = new Endpoint("PUT /user/installations/{installation_id}/repositories/{repository_id}")
       function putuserinstallationsinstallation_idrepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putuserinstallationsinstallation_idrepositoriesrepository_id.endpoint = new Endpoint("PUT /user/installations/{installation_id}/repositories/{repository_id}")
       function postapplicationsclient_idtoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postapplicationsclient_idtoken.endpoint = new Endpoint("POST /applications/{client_id}/token")
       function postappmanifestscodeconversions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postappmanifestscodeconversions.endpoint = new Endpoint("POST /app-manifests/{code}/conversions")
       function postappinstallationsinstallation_idaccess_tokens(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postappinstallationsinstallation_idaccess_tokens.endpoint = new Endpoint("POST /app/installations/{installation_id}/access_tokens")
       function deleteapplicationsclient_idgrant(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteapplicationsclient_idgrant.endpoint = new Endpoint("DELETE /applications/{client_id}/grant")
       function deleteappinstallationsinstallation_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteappinstallationsinstallation_id.endpoint = new Endpoint("DELETE /app/installations/{installation_id}")
       function deleteapplicationsclient_idtoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteapplicationsclient_idtoken.endpoint = new Endpoint("DELETE /applications/{client_id}/token")
       function getapp(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getapp.endpoint = new Endpoint("GET /app")
       function getappsapp_slug(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getappsapp_slug.endpoint = new Endpoint("GET /apps/{app_slug}")
       function getappinstallationsinstallation_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getappinstallationsinstallation_id.endpoint = new Endpoint("GET /app/installations/{installation_id}")
       function getorgsorginstallation(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorginstallation.endpoint = new Endpoint("GET /orgs/{org}/installation")
       function getreposownerrepoinstallation(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoinstallation.endpoint = new Endpoint("GET /repos/{owner}/{repo}/installation")
       function getmarketplace_listingaccountsaccount_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getmarketplace_listingaccountsaccount_id.endpoint = new Endpoint("GET /marketplace_listing/accounts/{account_id}")
       function getmarketplace_listingstubbedaccountsaccount_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getmarketplace_listingstubbedaccountsaccount_id.endpoint = new Endpoint("GET /marketplace_listing/stubbed/accounts/{account_id}")
       function getusersusernameinstallation(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernameinstallation.endpoint = new Endpoint("GET /users/{username}/installation")
       function getapphookconfig(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getapphookconfig.endpoint = new Endpoint("GET /app/hook/config")
       function getapphookdeliveriesdelivery_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getapphookdeliveriesdelivery_id.endpoint = new Endpoint("GET /app/hook/deliveries/{delivery_id}")
       function getmarketplace_listingplansplan_idaccounts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getmarketplace_listingplansplan_idaccounts.endpoint = new Endpoint("GET /marketplace_listing/plans/{plan_id}/accounts")
       function getmarketplace_listingstubbedplansplan_idaccounts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getmarketplace_listingstubbedplansplan_idaccounts.endpoint = new Endpoint("GET /marketplace_listing/stubbed/plans/{plan_id}/accounts")
       function getuserinstallationsinstallation_idrepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserinstallationsinstallation_idrepositories.endpoint = new Endpoint("GET /user/installations/{installation_id}/repositories")
       function getappinstallationrequests(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getappinstallationrequests.endpoint = new Endpoint("GET /app/installation-requests")
       function getappinstallations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getappinstallations.endpoint = new Endpoint("GET /app/installations")
       function getuserinstallations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserinstallations.endpoint = new Endpoint("GET /user/installations")
       function getmarketplace_listingplans(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getmarketplace_listingplans.endpoint = new Endpoint("GET /marketplace_listing/plans")
       function getmarketplace_listingstubbedplans(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getmarketplace_listingstubbedplans.endpoint = new Endpoint("GET /marketplace_listing/stubbed/plans")
       function getinstallationrepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getinstallationrepositories.endpoint = new Endpoint("GET /installation/repositories")
       function getusermarketplace_purchases(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusermarketplace_purchases.endpoint = new Endpoint("GET /user/marketplace_purchases")
       function getusermarketplace_purchasesstubbed(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusermarketplace_purchasesstubbed.endpoint = new Endpoint("GET /user/marketplace_purchases/stubbed")
       function getapphookdeliveries(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getapphookdeliveries.endpoint = new Endpoint("GET /app/hook/deliveries")
       function postapphookdeliveriesdelivery_idattempts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postapphookdeliveriesdelivery_idattempts.endpoint = new Endpoint("POST /app/hook/deliveries/{delivery_id}/attempts")
       function deleteuserinstallationsinstallation_idrepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserinstallationsinstallation_idrepositoriesrepository_id.endpoint = new Endpoint("DELETE /user/installations/{installation_id}/repositories/{repository_id}")
       function deleteuserinstallationsinstallation_idrepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserinstallationsinstallation_idrepositoriesrepository_id.endpoint = new Endpoint("DELETE /user/installations/{installation_id}/repositories/{repository_id}")
       function patchapplicationsclient_idtoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchapplicationsclient_idtoken.endpoint = new Endpoint("PATCH /applications/{client_id}/token")
       function deleteinstallationtoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteinstallationtoken.endpoint = new Endpoint("DELETE /installation/token")
       function postapplicationsclient_idtokenscoped(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postapplicationsclient_idtokenscoped.endpoint = new Endpoint("POST /applications/{client_id}/token/scoped")
       function putappinstallationsinstallation_idsuspended(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putappinstallationsinstallation_idsuspended.endpoint = new Endpoint("PUT /app/installations/{installation_id}/suspended")
       function deleteappinstallationsinstallation_idsuspended(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteappinstallationsinstallation_idsuspended.endpoint = new Endpoint("DELETE /app/installations/{installation_id}/suspended")
       function patchapphookconfig(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchapphookconfig.endpoint = new Endpoint("PATCH /app/hook/config")
       function getmarketplace_listingaccountsaccount_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getmarketplace_listingaccountsaccount_id.endpoint = new Endpoint("GET /marketplace_listing/accounts/{account_id}")
       function getmarketplace_listingstubbedaccountsaccount_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getmarketplace_listingstubbedaccountsaccount_id.endpoint = new Endpoint("GET /marketplace_listing/stubbed/accounts/{account_id}")
       function postappinstallationsinstallation_idaccess_tokens(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postappinstallationsinstallation_idaccess_tokens.endpoint = new Endpoint("POST /app/installations/{installation_id}/access_tokens")
       function getmarketplace_listingplansplan_idaccounts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getmarketplace_listingplansplan_idaccounts.endpoint = new Endpoint("GET /marketplace_listing/plans/{plan_id}/accounts")
       function getmarketplace_listingstubbedplansplan_idaccounts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getmarketplace_listingstubbedplansplan_idaccounts.endpoint = new Endpoint("GET /marketplace_listing/stubbed/plans/{plan_id}/accounts")
       function getusermarketplace_purchases(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusermarketplace_purchases.endpoint = new Endpoint("GET /user/marketplace_purchases")
       function getusermarketplace_purchasesstubbed(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusermarketplace_purchasesstubbed.endpoint = new Endpoint("GET /user/marketplace_purchases/stubbed")
       function getinstallationrepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getinstallationrepositories.endpoint = new Endpoint("GET /installation/repositories")
       function deleteinstallationtoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteinstallationtoken.endpoint = new Endpoint("DELETE /installation/token")
      function Apps() {
           this.addRepoToInstallation = putuserinstallationsinstallation_idrepositoriesrepository_id;
           this.addRepoToInstallationForAuthenticatedUser = putuserinstallationsinstallation_idrepositoriesrepository_id;
           this.checkToken = postapplicationsclient_idtoken;
           this.createFromManifest = postappmanifestscodeconversions;
           this.createInstallationAccessToken = postappinstallationsinstallation_idaccess_tokens;
           this.deleteAuthorization = deleteapplicationsclient_idgrant;
           this.deleteInstallation = deleteappinstallationsinstallation_id;
           this.deleteToken = deleteapplicationsclient_idtoken;
           this.getAuthenticated = getapp;
           this.getBySlug = getappsapp_slug;
           this.getInstallation = getappinstallationsinstallation_id;
           this.getOrgInstallation = getorgsorginstallation;
           this.getRepoInstallation = getreposownerrepoinstallation;
           this.getSubscriptionPlanForAccount = getmarketplace_listingaccountsaccount_id;
           this.getSubscriptionPlanForAccountStubbed = getmarketplace_listingstubbedaccountsaccount_id;
           this.getUserInstallation = getusersusernameinstallation;
           this.getWebhookConfigForApp = getapphookconfig;
           this.getWebhookDelivery = getapphookdeliveriesdelivery_id;
           this.listAccountsForPlan = getmarketplace_listingplansplan_idaccounts;
           this.listAccountsForPlanStubbed = getmarketplace_listingstubbedplansplan_idaccounts;
           this.listInstallationReposForAuthenticatedUser = getuserinstallationsinstallation_idrepositories;
           this.listInstallationRequestsForAuthenticatedApp = getappinstallationrequests;
           this.listInstallations = getappinstallations;
           this.listInstallationsForAuthenticatedUser = getuserinstallations;
           this.listPlans = getmarketplace_listingplans;
           this.listPlansStubbed = getmarketplace_listingstubbedplans;
           this.listReposAccessibleToInstallation = getinstallationrepositories;
           this.listSubscriptionsForAuthenticatedUser = getusermarketplace_purchases;
           this.listSubscriptionsForAuthenticatedUserStubbed = getusermarketplace_purchasesstubbed;
           this.listWebhookDeliveries = getapphookdeliveries;
           this.redeliverWebhookDelivery = postapphookdeliveriesdelivery_idattempts;
           this.removeRepoFromInstallation = deleteuserinstallationsinstallation_idrepositoriesrepository_id;
           this.removeRepoFromInstallationForAuthenticatedUser = deleteuserinstallationsinstallation_idrepositoriesrepository_id;
           this.resetToken = patchapplicationsclient_idtoken;
           this.revokeInstallationAccessToken = deleteinstallationtoken;
           this.scopeToken = postapplicationsclient_idtokenscoped;
           this.suspendInstallation = putappinstallationsinstallation_idsuspended;
           this.unsuspendInstallation = deleteappinstallationsinstallation_idsuspended;
           this.updateWebhookConfigForApp = patchapphookconfig;
           this.checkAccountIsAssociatedWithAny = getmarketplace_listingaccountsaccount_id;
           this.checkAccountIsAssociatedWithAnyStubbed = getmarketplace_listingstubbedaccountsaccount_id;
           this.createInstallationToken = postappinstallationsinstallation_idaccess_tokens;
           this.listAccountsUserOrOrgOnPlan = getmarketplace_listingplansplan_idaccounts;
           this.listAccountsUserOrOrgOnPlanStubbed = getmarketplace_listingstubbedplansplan_idaccounts;
           this.listMarketplacePurchasesForAuthenticatedUser = getusermarketplace_purchases;
           this.listMarketplacePurchasesForAuthenticatedUserStubbed = getusermarketplace_purchasesstubbed;
           this.listRepos = getinstallationrepositories;
           this.revokeInstallationToken = deleteinstallationtoken;
        }
       function getorgsorgsettingsbillingactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgsettingsbillingactions.endpoint = new Endpoint("GET /orgs/{org}/settings/billing/actions")
       function getusersusernamesettingsbillingactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamesettingsbillingactions.endpoint = new Endpoint("GET /users/{username}/settings/billing/actions")
       function getorgsorgsettingsbillingpackages(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgsettingsbillingpackages.endpoint = new Endpoint("GET /orgs/{org}/settings/billing/packages")
       function getusersusernamesettingsbillingpackages(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamesettingsbillingpackages.endpoint = new Endpoint("GET /users/{username}/settings/billing/packages")
       function getorgsorgsettingsbillingsharedstorage(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgsettingsbillingsharedstorage.endpoint = new Endpoint("GET /orgs/{org}/settings/billing/shared-storage")
       function getusersusernamesettingsbillingsharedstorage(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamesettingsbillingsharedstorage.endpoint = new Endpoint("GET /users/{username}/settings/billing/shared-storage")
      function Billing() {
           this.getGithubActionsBillingOrg = getorgsorgsettingsbillingactions;
           this.getGithubActionsBillingUser = getusersusernamesettingsbillingactions;
           this.getGithubPackagesBillingOrg = getorgsorgsettingsbillingpackages;
           this.getGithubPackagesBillingUser = getusersusernamesettingsbillingpackages;
           this.getSharedStorageBillingOrg = getorgsorgsettingsbillingsharedstorage;
           this.getSharedStorageBillingUser = getusersusernamesettingsbillingsharedstorage;
        }
       function postreposownerrepocheckruns(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepocheckruns.endpoint = new Endpoint("POST /repos/{owner}/{repo}/check-runs")
       function postreposownerrepochecksuites(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepochecksuites.endpoint = new Endpoint("POST /repos/{owner}/{repo}/check-suites")
       function getreposownerrepocheckrunscheck_run_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocheckrunscheck_run_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/check-runs/{check_run_id}")
       function getreposownerrepochecksuitescheck_suite_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepochecksuitescheck_suite_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/check-suites/{check_suite_id}")
       function getreposownerrepocheckrunscheck_run_idannotations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocheckrunscheck_run_idannotations.endpoint = new Endpoint("GET /repos/{owner}/{repo}/check-runs/{check_run_id}/annotations")
       function getreposownerrepocommitsrefcheckruns(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommitsrefcheckruns.endpoint = new Endpoint("GET /repos/{owner}/{repo}/commits/{ref}/check-runs")
       function getreposownerrepochecksuitescheck_suite_idcheckruns(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepochecksuitescheck_suite_idcheckruns.endpoint = new Endpoint("GET /repos/{owner}/{repo}/check-suites/{check_suite_id}/check-runs")
       function getreposownerrepocommitsrefchecksuites(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommitsrefchecksuites.endpoint = new Endpoint("GET /repos/{owner}/{repo}/commits/{ref}/check-suites")
       function postreposownerrepocheckrunscheck_run_idrerequest(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepocheckrunscheck_run_idrerequest.endpoint = new Endpoint("POST /repos/{owner}/{repo}/check-runs/{check_run_id}/rerequest")
       function postreposownerrepochecksuitescheck_suite_idrerequest(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepochecksuitescheck_suite_idrerequest.endpoint = new Endpoint("POST /repos/{owner}/{repo}/check-suites/{check_suite_id}/rerequest")
       function patchreposownerrepochecksuitespreferences(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepochecksuitespreferences.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/check-suites/preferences")
       function patchreposownerrepocheckrunscheck_run_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepocheckrunscheck_run_id.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/check-runs/{check_run_id}")
      function Checks() {
           this.create = postreposownerrepocheckruns;
           this.createSuite = postreposownerrepochecksuites;
           this.get = getreposownerrepocheckrunscheck_run_id;
           this.getSuite = getreposownerrepochecksuitescheck_suite_id;
           this.listAnnotations = getreposownerrepocheckrunscheck_run_idannotations;
           this.listForRef = getreposownerrepocommitsrefcheckruns;
           this.listForSuite = getreposownerrepochecksuitescheck_suite_idcheckruns;
           this.listSuitesForRef = getreposownerrepocommitsrefchecksuites;
           this.rerequestRun = postreposownerrepocheckrunscheck_run_idrerequest;
           this.rerequestSuite = postreposownerrepochecksuitescheck_suite_idrerequest;
           this.setSuitesPreferences = patchreposownerrepochecksuitespreferences;
           this.update = patchreposownerrepocheckrunscheck_run_id;
        }
       function deletereposownerrepocodescanninganalysesanalysis_idconfirm_delete(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepocodescanninganalysesanalysis_idconfirm_delete.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}{?confirm_delete}")
       function getreposownerrepocodescanningalertsalert_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodescanningalertsalert_number.endpoint = new Endpoint("GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}")
       function getreposownerrepocodescanninganalysesanalysis_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodescanninganalysesanalysis_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/code-scanning/analyses/{analysis_id}")
       function getreposownerrepocodescanningcodeqldatabaseslanguage(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodescanningcodeqldatabaseslanguage.endpoint = new Endpoint("GET /repos/{owner}/{repo}/code-scanning/codeql/databases/{language}")
       function getreposownerrepocodescanningdefaultsetup(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodescanningdefaultsetup.endpoint = new Endpoint("GET /repos/{owner}/{repo}/code-scanning/default-setup")
       function getreposownerrepocodescanningsarifssarif_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodescanningsarifssarif_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/code-scanning/sarifs/{sarif_id}")
       function getreposownerrepocodescanningalertsalert_numberinstances(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodescanningalertsalert_numberinstances.endpoint = new Endpoint("GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances")
       function getorgsorgcodescanningalerts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgcodescanningalerts.endpoint = new Endpoint("GET /orgs/{org}/code-scanning/alerts")
       function getreposownerrepocodescanningalerts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodescanningalerts.endpoint = new Endpoint("GET /repos/{owner}/{repo}/code-scanning/alerts")
       function getreposownerrepocodescanningalertsalert_numberinstances(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodescanningalertsalert_numberinstances.endpoint = new Endpoint("GET /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}/instances")
       function getreposownerrepocodescanningcodeqldatabases(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodescanningcodeqldatabases.endpoint = new Endpoint("GET /repos/{owner}/{repo}/code-scanning/codeql/databases")
       function getreposownerrepocodescanninganalyses(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodescanninganalyses.endpoint = new Endpoint("GET /repos/{owner}/{repo}/code-scanning/analyses")
       function patchreposownerrepocodescanningalertsalert_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepocodescanningalertsalert_number.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/code-scanning/alerts/{alert_number}")
       function patchreposownerrepocodescanningdefaultsetup(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepocodescanningdefaultsetup.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/code-scanning/default-setup")
       function postreposownerrepocodescanningsarifs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepocodescanningsarifs.endpoint = new Endpoint("POST /repos/{owner}/{repo}/code-scanning/sarifs")
      function CodeScanning() {
           this.deleteAnalysis = deletereposownerrepocodescanninganalysesanalysis_idconfirm_delete;
           this.getAlert = getreposownerrepocodescanningalertsalert_number;
           this.getAnalysis = getreposownerrepocodescanninganalysesanalysis_id;
           this.getCodeqlDatabase = getreposownerrepocodescanningcodeqldatabaseslanguage;
           this.getDefaultSetup = getreposownerrepocodescanningdefaultsetup;
           this.getSarif = getreposownerrepocodescanningsarifssarif_id;
           this.listAlertInstances = getreposownerrepocodescanningalertsalert_numberinstances;
           this.listAlertsForOrg = getorgsorgcodescanningalerts;
           this.listAlertsForRepo = getreposownerrepocodescanningalerts;
           this.listAlertsInstances = getreposownerrepocodescanningalertsalert_numberinstances;
           this.listCodeqlDatabases = getreposownerrepocodescanningcodeqldatabases;
           this.listRecentAnalyses = getreposownerrepocodescanninganalyses;
           this.updateAlert = patchreposownerrepocodescanningalertsalert_number;
           this.updateDefaultSetup = patchreposownerrepocodescanningdefaultsetup;
           this.uploadSarif = postreposownerrepocodescanningsarifs;
        }
       function getcodes_of_conduct(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getcodes_of_conduct.endpoint = new Endpoint("GET /codes_of_conduct")
       function getcodes_of_conductkey(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getcodes_of_conductkey.endpoint = new Endpoint("GET /codes_of_conduct/{key}")
       function getcodes_of_conduct(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getcodes_of_conduct.endpoint = new Endpoint("GET /codes_of_conduct")
      function CodesOfConduct() {
           this.getAllCodesOfConduct = getcodes_of_conduct;
           this.getConductCode = getcodes_of_conductkey;
           this.listConductCodes = getcodes_of_conduct;
        }
       function putusercodespacessecretssecret_namerepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putusercodespacessecretssecret_namerepositoriesrepository_id.endpoint = new Endpoint("PUT /user/codespaces/secrets/{secret_name}/repositories/{repository_id}")
       function putorgsorgcodespacessecretssecret_namerepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgcodespacessecretssecret_namerepositoriesrepository_id.endpoint = new Endpoint("PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}")
       function getreposownerrepocodespacespermissions_check(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodespacespermissions_check.endpoint = new Endpoint("GET /repos/{owner}/{repo}/codespaces/permissions_check")
       function getusercodespacescodespace_namemachines(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusercodespacescodespace_namemachines.endpoint = new Endpoint("GET /user/codespaces/{codespace_name}/machines")
       function postusercodespaces(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postusercodespaces.endpoint = new Endpoint("POST /user/codespaces")
       function putorgsorgcodespacessecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgcodespacessecretssecret_name.endpoint = new Endpoint("PUT /orgs/{org}/codespaces/secrets/{secret_name}")
       function putreposownerrepocodespacessecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepocodespacessecretssecret_name.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/codespaces/secrets/{secret_name}")
       function putusercodespacessecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putusercodespacessecretssecret_name.endpoint = new Endpoint("PUT /user/codespaces/secrets/{secret_name}")
       function postreposownerrepopullspull_numbercodespaces(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopullspull_numbercodespaces.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pulls/{pull_number}/codespaces")
       function postreposownerrepocodespaces(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepocodespaces.endpoint = new Endpoint("POST /repos/{owner}/{repo}/codespaces")
       function deleteusercodespacescodespace_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteusercodespacescodespace_name.endpoint = new Endpoint("DELETE /user/codespaces/{codespace_name}")
       function deleteorgsorgmembersusernamecodespacescodespace_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgmembersusernamecodespacescodespace_name.endpoint = new Endpoint("DELETE /orgs/{org}/members/{username}/codespaces/{codespace_name}")
       function deleteorgsorgcodespacessecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgcodespacessecretssecret_name.endpoint = new Endpoint("DELETE /orgs/{org}/codespaces/secrets/{secret_name}")
       function deletereposownerrepocodespacessecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepocodespacessecretssecret_name.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/codespaces/secrets/{secret_name}")
       function deleteusercodespacessecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteusercodespacessecretssecret_name.endpoint = new Endpoint("DELETE /user/codespaces/secrets/{secret_name}")
       function postusercodespacescodespace_nameexports(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postusercodespacescodespace_nameexports.endpoint = new Endpoint("POST /user/codespaces/{codespace_name}/exports")
       function getorgsorgmembersusernamecodespaces(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgmembersusernamecodespaces.endpoint = new Endpoint("GET /orgs/{org}/members/{username}/codespaces")
       function getusercodespacescodespace_nameexportsexport_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusercodespacescodespace_nameexportsexport_id.endpoint = new Endpoint("GET /user/codespaces/{codespace_name}/exports/{export_id}")
       function getusercodespacescodespace_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusercodespacescodespace_name.endpoint = new Endpoint("GET /user/codespaces/{codespace_name}")
       function getorgsorgcodespacessecretspublickey(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgcodespacessecretspublickey.endpoint = new Endpoint("GET /orgs/{org}/codespaces/secrets/public-key")
       function getorgsorgcodespacessecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgcodespacessecretssecret_name.endpoint = new Endpoint("GET /orgs/{org}/codespaces/secrets/{secret_name}")
       function getusercodespacessecretspublickey(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusercodespacessecretspublickey.endpoint = new Endpoint("GET /user/codespaces/secrets/public-key")
       function getreposownerrepocodespacessecretspublickey(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodespacessecretspublickey.endpoint = new Endpoint("GET /repos/{owner}/{repo}/codespaces/secrets/public-key")
       function getreposownerrepocodespacessecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodespacessecretssecret_name.endpoint = new Endpoint("GET /repos/{owner}/{repo}/codespaces/secrets/{secret_name}")
       function getusercodespacessecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusercodespacessecretssecret_name.endpoint = new Endpoint("GET /user/codespaces/secrets/{secret_name}")
       function getreposownerrepocodespacesdevcontainers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodespacesdevcontainers.endpoint = new Endpoint("GET /repos/{owner}/{repo}/codespaces/devcontainers")
       function getusercodespaces(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusercodespaces.endpoint = new Endpoint("GET /user/codespaces")
       function getorgsorgcodespaces(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgcodespaces.endpoint = new Endpoint("GET /orgs/{org}/codespaces")
       function getreposownerrepocodespaces(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodespaces.endpoint = new Endpoint("GET /repos/{owner}/{repo}/codespaces")
       function getorgsorgcodespacessecrets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgcodespacessecrets.endpoint = new Endpoint("GET /orgs/{org}/codespaces/secrets")
       function getreposownerrepocodespacessecrets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodespacessecrets.endpoint = new Endpoint("GET /repos/{owner}/{repo}/codespaces/secrets")
       function getusercodespacessecretssecret_namerepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusercodespacessecretssecret_namerepositories.endpoint = new Endpoint("GET /user/codespaces/secrets/{secret_name}/repositories")
       function getusercodespacessecrets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusercodespacessecrets.endpoint = new Endpoint("GET /user/codespaces/secrets")
       function getorgsorgcodespacessecretssecret_namerepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgcodespacessecretssecret_namerepositories.endpoint = new Endpoint("GET /orgs/{org}/codespaces/secrets/{secret_name}/repositories")
       function getreposownerrepocodespacesnew(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodespacesnew.endpoint = new Endpoint("GET /repos/{owner}/{repo}/codespaces/new")
       function postusercodespacescodespace_namepublish(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postusercodespacescodespace_namepublish.endpoint = new Endpoint("POST /user/codespaces/{codespace_name}/publish")
       function deleteusercodespacessecretssecret_namerepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteusercodespacessecretssecret_namerepositoriesrepository_id.endpoint = new Endpoint("DELETE /user/codespaces/secrets/{secret_name}/repositories/{repository_id}")
       function deleteorgsorgcodespacessecretssecret_namerepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgcodespacessecretssecret_namerepositoriesrepository_id.endpoint = new Endpoint("DELETE /orgs/{org}/codespaces/secrets/{secret_name}/repositories/{repository_id}")
       function getreposownerrepocodespacesmachines(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodespacesmachines.endpoint = new Endpoint("GET /repos/{owner}/{repo}/codespaces/machines")
       function putusercodespacessecretssecret_namerepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putusercodespacessecretssecret_namerepositories.endpoint = new Endpoint("PUT /user/codespaces/secrets/{secret_name}/repositories")
       function putorgsorgcodespacessecretssecret_namerepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgcodespacessecretssecret_namerepositories.endpoint = new Endpoint("PUT /orgs/{org}/codespaces/secrets/{secret_name}/repositories")
       function postusercodespacescodespace_namestart(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postusercodespacescodespace_namestart.endpoint = new Endpoint("POST /user/codespaces/{codespace_name}/start")
       function postusercodespacescodespace_namestop(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postusercodespacescodespace_namestop.endpoint = new Endpoint("POST /user/codespaces/{codespace_name}/stop")
       function postorgsorgmembersusernamecodespacescodespace_namestop(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgmembersusernamecodespacescodespace_namestop.endpoint = new Endpoint("POST /orgs/{org}/members/{username}/codespaces/{codespace_name}/stop")
       function patchusercodespacescodespace_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchusercodespacescodespace_name.endpoint = new Endpoint("PATCH /user/codespaces/{codespace_name}")
      function Codespaces() {
           this.addRepositoryForSecretForAuthenticatedUser = putusercodespacessecretssecret_namerepositoriesrepository_id;
           this.addSelectedRepoToOrgSecret = putorgsorgcodespacessecretssecret_namerepositoriesrepository_id;
           this.checkPermissionsForDevcontainer = getreposownerrepocodespacespermissions_check;
           this.codespaceMachinesForAuthenticatedUser = getusercodespacescodespace_namemachines;
           this.createForAuthenticatedUser = postusercodespaces;
           this.createOrUpdateOrgSecret = putorgsorgcodespacessecretssecret_name;
           this.createOrUpdateRepoSecret = putreposownerrepocodespacessecretssecret_name;
           this.createOrUpdateSecretForAuthenticatedUser = putusercodespacessecretssecret_name;
           this.createWithPrForAuthenticatedUser = postreposownerrepopullspull_numbercodespaces;
           this.createWithRepoForAuthenticatedUser = postreposownerrepocodespaces;
           this.deleteForAuthenticatedUser = deleteusercodespacescodespace_name;
           this.deleteFromOrganization = deleteorgsorgmembersusernamecodespacescodespace_name;
           this.deleteOrgSecret = deleteorgsorgcodespacessecretssecret_name;
           this.deleteRepoSecret = deletereposownerrepocodespacessecretssecret_name;
           this.deleteSecretForAuthenticatedUser = deleteusercodespacessecretssecret_name;
           this.exportForAuthenticatedUser = postusercodespacescodespace_nameexports;
           this.getCodespacesForUserInOrg = getorgsorgmembersusernamecodespaces;
           this.getExportDetailsForAuthenticatedUser = getusercodespacescodespace_nameexportsexport_id;
           this.getForAuthenticatedUser = getusercodespacescodespace_name;
           this.getOrgPublicKey = getorgsorgcodespacessecretspublickey;
           this.getOrgSecret = getorgsorgcodespacessecretssecret_name;
           this.getPublicKeyForAuthenticatedUser = getusercodespacessecretspublickey;
           this.getRepoPublicKey = getreposownerrepocodespacessecretspublickey;
           this.getRepoSecret = getreposownerrepocodespacessecretssecret_name;
           this.getSecretForAuthenticatedUser = getusercodespacessecretssecret_name;
           this.listDevcontainersInRepositoryForAuthenticatedUser = getreposownerrepocodespacesdevcontainers;
           this.listForAuthenticatedUser = getusercodespaces;
           this.listInOrganization = getorgsorgcodespaces;
           this.listInRepositoryForAuthenticatedUser = getreposownerrepocodespaces;
           this.listOrgSecrets = getorgsorgcodespacessecrets;
           this.listRepoSecrets = getreposownerrepocodespacessecrets;
           this.listRepositoriesForSecretForAuthenticatedUser = getusercodespacessecretssecret_namerepositories;
           this.listSecretsForAuthenticatedUser = getusercodespacessecrets;
           this.listSelectedReposForOrgSecret = getorgsorgcodespacessecretssecret_namerepositories;
           this.preFlightWithRepoForAuthenticatedUser = getreposownerrepocodespacesnew;
           this.publishForAuthenticatedUser = postusercodespacescodespace_namepublish;
           this.removeRepositoryForSecretForAuthenticatedUser = deleteusercodespacessecretssecret_namerepositoriesrepository_id;
           this.removeSelectedRepoFromOrgSecret = deleteorgsorgcodespacessecretssecret_namerepositoriesrepository_id;
           this.repoMachinesForAuthenticatedUser = getreposownerrepocodespacesmachines;
           this.setRepositoriesForSecretForAuthenticatedUser = putusercodespacessecretssecret_namerepositories;
           this.setSelectedReposForOrgSecret = putorgsorgcodespacessecretssecret_namerepositories;
           this.startForAuthenticatedUser = postusercodespacescodespace_namestart;
           this.stopForAuthenticatedUser = postusercodespacescodespace_namestop;
           this.stopInOrganization = postorgsorgmembersusernamecodespacescodespace_namestop;
           this.updateForAuthenticatedUser = patchusercodespacescodespace_name;
        }
       function postorgsorgcopilotbillingselected_teams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgcopilotbillingselected_teams.endpoint = new Endpoint("POST /orgs/{org}/copilot/billing/selected_teams")
       function postorgsorgcopilotbillingselected_users(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgcopilotbillingselected_users.endpoint = new Endpoint("POST /orgs/{org}/copilot/billing/selected_users")
       function deleteorgsorgcopilotbillingselected_teams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgcopilotbillingselected_teams.endpoint = new Endpoint("DELETE /orgs/{org}/copilot/billing/selected_teams")
       function deleteorgsorgcopilotbillingselected_users(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgcopilotbillingselected_users.endpoint = new Endpoint("DELETE /orgs/{org}/copilot/billing/selected_users")
       function getorgsorgcopilotbilling(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgcopilotbilling.endpoint = new Endpoint("GET /orgs/{org}/copilot/billing")
       function getorgsorgmembersusernamecopilot(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgmembersusernamecopilot.endpoint = new Endpoint("GET /orgs/{org}/members/{username}/copilot")
       function getorgsorgcopilotbillingseats(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgcopilotbillingseats.endpoint = new Endpoint("GET /orgs/{org}/copilot/billing/seats")
      function Copilot() {
           this.addCopilotForBusinessSeatsForTeams = postorgsorgcopilotbillingselected_teams;
           this.addCopilotForBusinessSeatsForUsers = postorgsorgcopilotbillingselected_users;
           this.cancelCopilotSeatAssignmentForTeams = deleteorgsorgcopilotbillingselected_teams;
           this.cancelCopilotSeatAssignmentForUsers = deleteorgsorgcopilotbillingselected_users;
           this.getCopilotOrganizationDetails = getorgsorgcopilotbilling;
           this.getCopilotSeatDetailsForUser = getorgsorgmembersusernamecopilot;
           this.listCopilotSeats = getorgsorgcopilotbillingseats;
        }
       function putorgsorgdependabotsecretssecret_namerepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgdependabotsecretssecret_namerepositoriesrepository_id.endpoint = new Endpoint("PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}")
       function putorgsorgdependabotsecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgdependabotsecretssecret_name.endpoint = new Endpoint("PUT /orgs/{org}/dependabot/secrets/{secret_name}")
       function putreposownerrepodependabotsecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepodependabotsecretssecret_name.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/dependabot/secrets/{secret_name}")
       function deleteorgsorgdependabotsecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgdependabotsecretssecret_name.endpoint = new Endpoint("DELETE /orgs/{org}/dependabot/secrets/{secret_name}")
       function deletereposownerrepodependabotsecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepodependabotsecretssecret_name.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/dependabot/secrets/{secret_name}")
       function getreposownerrepodependabotalertsalert_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepodependabotalertsalert_number.endpoint = new Endpoint("GET /repos/{owner}/{repo}/dependabot/alerts/{alert_number}")
       function getorgsorgdependabotsecretspublickey(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgdependabotsecretspublickey.endpoint = new Endpoint("GET /orgs/{org}/dependabot/secrets/public-key")
       function getorgsorgdependabotsecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgdependabotsecretssecret_name.endpoint = new Endpoint("GET /orgs/{org}/dependabot/secrets/{secret_name}")
       function getreposownerrepodependabotsecretspublickey(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepodependabotsecretspublickey.endpoint = new Endpoint("GET /repos/{owner}/{repo}/dependabot/secrets/public-key")
       function getreposownerrepodependabotsecretssecret_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepodependabotsecretssecret_name.endpoint = new Endpoint("GET /repos/{owner}/{repo}/dependabot/secrets/{secret_name}")
       function getenterprisesenterprisedependabotalerts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getenterprisesenterprisedependabotalerts.endpoint = new Endpoint("GET /enterprises/{enterprise}/dependabot/alerts")
       function getorgsorgdependabotalerts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgdependabotalerts.endpoint = new Endpoint("GET /orgs/{org}/dependabot/alerts")
       function getreposownerrepodependabotalerts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepodependabotalerts.endpoint = new Endpoint("GET /repos/{owner}/{repo}/dependabot/alerts")
       function getorgsorgdependabotsecrets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgdependabotsecrets.endpoint = new Endpoint("GET /orgs/{org}/dependabot/secrets")
       function getreposownerrepodependabotsecrets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepodependabotsecrets.endpoint = new Endpoint("GET /repos/{owner}/{repo}/dependabot/secrets")
       function getorgsorgdependabotsecretssecret_namerepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgdependabotsecretssecret_namerepositories.endpoint = new Endpoint("GET /orgs/{org}/dependabot/secrets/{secret_name}/repositories")
       function deleteorgsorgdependabotsecretssecret_namerepositoriesrepository_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgdependabotsecretssecret_namerepositoriesrepository_id.endpoint = new Endpoint("DELETE /orgs/{org}/dependabot/secrets/{secret_name}/repositories/{repository_id}")
       function putorgsorgdependabotsecretssecret_namerepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgdependabotsecretssecret_namerepositories.endpoint = new Endpoint("PUT /orgs/{org}/dependabot/secrets/{secret_name}/repositories")
       function patchreposownerrepodependabotalertsalert_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepodependabotalertsalert_number.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/dependabot/alerts/{alert_number}")
      function Dependabot() {
           this.addSelectedRepoToOrgSecret = putorgsorgdependabotsecretssecret_namerepositoriesrepository_id;
           this.createOrUpdateOrgSecret = putorgsorgdependabotsecretssecret_name;
           this.createOrUpdateRepoSecret = putreposownerrepodependabotsecretssecret_name;
           this.deleteOrgSecret = deleteorgsorgdependabotsecretssecret_name;
           this.deleteRepoSecret = deletereposownerrepodependabotsecretssecret_name;
           this.getAlert = getreposownerrepodependabotalertsalert_number;
           this.getOrgPublicKey = getorgsorgdependabotsecretspublickey;
           this.getOrgSecret = getorgsorgdependabotsecretssecret_name;
           this.getRepoPublicKey = getreposownerrepodependabotsecretspublickey;
           this.getRepoSecret = getreposownerrepodependabotsecretssecret_name;
           this.listAlertsForEnterprise = getenterprisesenterprisedependabotalerts;
           this.listAlertsForOrg = getorgsorgdependabotalerts;
           this.listAlertsForRepo = getreposownerrepodependabotalerts;
           this.listOrgSecrets = getorgsorgdependabotsecrets;
           this.listRepoSecrets = getreposownerrepodependabotsecrets;
           this.listSelectedReposForOrgSecret = getorgsorgdependabotsecretssecret_namerepositories;
           this.removeSelectedRepoFromOrgSecret = deleteorgsorgdependabotsecretssecret_namerepositoriesrepository_id;
           this.setSelectedReposForOrgSecret = putorgsorgdependabotsecretssecret_namerepositories;
           this.updateAlert = patchreposownerrepodependabotalertsalert_number;
        }
       function postreposownerrepodependencygraphsnapshots(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepodependencygraphsnapshots.endpoint = new Endpoint("POST /repos/{owner}/{repo}/dependency-graph/snapshots")
       function getreposownerrepodependencygraphcomparebasehead(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepodependencygraphcomparebasehead.endpoint = new Endpoint("GET /repos/{owner}/{repo}/dependency-graph/compare/{basehead}")
       function getreposownerrepodependencygraphsbom(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepodependencygraphsbom.endpoint = new Endpoint("GET /repos/{owner}/{repo}/dependency-graph/sbom")
      function DependencyGraph() {
           this.createRepositorySnapshot = postreposownerrepodependencygraphsnapshots;
           this.diffRange = getreposownerrepodependencygraphcomparebasehead;
           this.exportSbom = getreposownerrepodependencygraphsbom;
        }
       function getemojis(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getemojis.endpoint = new Endpoint("GET /emojis")
      function Emojis() {
           this.get = getemojis;
        }
       function getgistsgist_idstar(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgistsgist_idstar.endpoint = new Endpoint("GET /gists/{gist_id}/star")
       function postgists(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postgists.endpoint = new Endpoint("POST /gists")
       function postgistsgist_idcomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postgistsgist_idcomments.endpoint = new Endpoint("POST /gists/{gist_id}/comments")
       function deletegistsgist_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletegistsgist_id.endpoint = new Endpoint("DELETE /gists/{gist_id}")
       function deletegistsgist_idcommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletegistsgist_idcommentscomment_id.endpoint = new Endpoint("DELETE /gists/{gist_id}/comments/{comment_id}")
       function postgistsgist_idforks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postgistsgist_idforks.endpoint = new Endpoint("POST /gists/{gist_id}/forks")
       function getgistsgist_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgistsgist_id.endpoint = new Endpoint("GET /gists/{gist_id}")
       function getgistsgist_idcommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgistsgist_idcommentscomment_id.endpoint = new Endpoint("GET /gists/{gist_id}/comments/{comment_id}")
       function getgistsgist_idsha(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgistsgist_idsha.endpoint = new Endpoint("GET /gists/{gist_id}/{sha}")
       function getgists(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgists.endpoint = new Endpoint("GET /gists")
       function getgistsgist_idcomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgistsgist_idcomments.endpoint = new Endpoint("GET /gists/{gist_id}/comments")
       function getgistsgist_idcommits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgistsgist_idcommits.endpoint = new Endpoint("GET /gists/{gist_id}/commits")
       function getusersusernamegists(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamegists.endpoint = new Endpoint("GET /users/{username}/gists")
       function getgistsgist_idforks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgistsgist_idforks.endpoint = new Endpoint("GET /gists/{gist_id}/forks")
       function getgistspublic(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgistspublic.endpoint = new Endpoint("GET /gists/public")
       function getgistsstarred(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgistsstarred.endpoint = new Endpoint("GET /gists/starred")
       function putgistsgist_idstar(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putgistsgist_idstar.endpoint = new Endpoint("PUT /gists/{gist_id}/star")
       function deletegistsgist_idstar(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletegistsgist_idstar.endpoint = new Endpoint("DELETE /gists/{gist_id}/star")
       function patchgistsgist_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchgistsgist_id.endpoint = new Endpoint("PATCH /gists/{gist_id}")
       function patchgistsgist_idcommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchgistsgist_idcommentscomment_id.endpoint = new Endpoint("PATCH /gists/{gist_id}/comments/{comment_id}")
       function getusersusernamegists(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamegists.endpoint = new Endpoint("GET /users/{username}/gists")
      function Gists() {
           this.checkIsStarred = getgistsgist_idstar;
           this.create = postgists;
           this.createComment = postgistsgist_idcomments;
           this.delete = deletegistsgist_id;
           this.deleteComment = deletegistsgist_idcommentscomment_id;
           this.fork = postgistsgist_idforks;
           this.get = getgistsgist_id;
           this.getComment = getgistsgist_idcommentscomment_id;
           this.getRevision = getgistsgist_idsha;
           this.list = getgists;
           this.listComments = getgistsgist_idcomments;
           this.listCommits = getgistsgist_idcommits;
           this.listForUser = getusersusernamegists;
           this.listForks = getgistsgist_idforks;
           this.listPublic = getgistspublic;
           this.listStarred = getgistsstarred;
           this.star = putgistsgist_idstar;
           this.unstar = deletegistsgist_idstar;
           this.update = patchgistsgist_id;
           this.updateComment = patchgistsgist_idcommentscomment_id;
           this.listPublicForUser = getusersusernamegists;
        }
       function postreposownerrepogitblobs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepogitblobs.endpoint = new Endpoint("POST /repos/{owner}/{repo}/git/blobs")
       function postreposownerrepogitcommits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepogitcommits.endpoint = new Endpoint("POST /repos/{owner}/{repo}/git/commits")
       function postreposownerrepogitrefs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepogitrefs.endpoint = new Endpoint("POST /repos/{owner}/{repo}/git/refs")
       function postreposownerrepogittags(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepogittags.endpoint = new Endpoint("POST /repos/{owner}/{repo}/git/tags")
       function postreposownerrepogittrees(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepogittrees.endpoint = new Endpoint("POST /repos/{owner}/{repo}/git/trees")
       function deletereposownerrepogitrefsref(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepogitrefsref.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/git/refs/{ref}")
       function getreposownerrepogitblobsfile_sha(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepogitblobsfile_sha.endpoint = new Endpoint("GET /repos/{owner}/{repo}/git/blobs/{file_sha}")
       function getreposownerrepogitcommitscommit_sha(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepogitcommitscommit_sha.endpoint = new Endpoint("GET /repos/{owner}/{repo}/git/commits/{commit_sha}")
       function getreposownerrepogitrefref(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepogitrefref.endpoint = new Endpoint("GET /repos/{owner}/{repo}/git/ref/{ref}")
       function getreposownerrepogittagstag_sha(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepogittagstag_sha.endpoint = new Endpoint("GET /repos/{owner}/{repo}/git/tags/{tag_sha}")
       function getreposownerrepogittreestree_sha(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepogittreestree_sha.endpoint = new Endpoint("GET /repos/{owner}/{repo}/git/trees/{tree_sha}")
       function getreposownerrepogitmatchingrefsref(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepogitmatchingrefsref.endpoint = new Endpoint("GET /repos/{owner}/{repo}/git/matching-refs/{ref}")
       function patchreposownerrepogitrefsref(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepogitrefsref.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/git/refs/{ref}")
      function Git() {
           this.createBlob = postreposownerrepogitblobs;
           this.createCommit = postreposownerrepogitcommits;
           this.createRef = postreposownerrepogitrefs;
           this.createTag = postreposownerrepogittags;
           this.createTree = postreposownerrepogittrees;
           this.deleteRef = deletereposownerrepogitrefsref;
           this.getBlob = getreposownerrepogitblobsfile_sha;
           this.getCommit = getreposownerrepogitcommitscommit_sha;
           this.getRef = getreposownerrepogitrefref;
           this.getTag = getreposownerrepogittagstag_sha;
           this.getTree = getreposownerrepogittreestree_sha;
           this.listMatchingRefs = getreposownerrepogitmatchingrefsref;
           this.updateRef = patchreposownerrepogitrefsref;
        }
       function getgitignoretemplates(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgitignoretemplates.endpoint = new Endpoint("GET /gitignore/templates")
       function getgitignoretemplatesname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgitignoretemplatesname.endpoint = new Endpoint("GET /gitignore/templates/{name}")
       function getgitignoretemplates(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getgitignoretemplates.endpoint = new Endpoint("GET /gitignore/templates")
      function Gitignore() {
           this.getAllTemplates = getgitignoretemplates;
           this.getTemplate = getgitignoretemplatesname;
           this.listTemplates = getgitignoretemplates;
        }
       function getuserinteractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserinteractionlimits.endpoint = new Endpoint("GET /user/interaction-limits")
       function getorgsorginteractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorginteractionlimits.endpoint = new Endpoint("GET /orgs/{org}/interaction-limits")
       function getreposownerrepointeractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepointeractionlimits.endpoint = new Endpoint("GET /repos/{owner}/{repo}/interaction-limits")
       function getuserinteractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserinteractionlimits.endpoint = new Endpoint("GET /user/interaction-limits")
       function deleteuserinteractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserinteractionlimits.endpoint = new Endpoint("DELETE /user/interaction-limits")
       function deleteorgsorginteractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorginteractionlimits.endpoint = new Endpoint("DELETE /orgs/{org}/interaction-limits")
       function deletereposownerrepointeractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepointeractionlimits.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/interaction-limits")
       function deleteuserinteractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserinteractionlimits.endpoint = new Endpoint("DELETE /user/interaction-limits")
       function putuserinteractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putuserinteractionlimits.endpoint = new Endpoint("PUT /user/interaction-limits")
       function putorgsorginteractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorginteractionlimits.endpoint = new Endpoint("PUT /orgs/{org}/interaction-limits")
       function putreposownerrepointeractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepointeractionlimits.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/interaction-limits")
       function putuserinteractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putuserinteractionlimits.endpoint = new Endpoint("PUT /user/interaction-limits")
       function putorgsorginteractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorginteractionlimits.endpoint = new Endpoint("PUT /orgs/{org}/interaction-limits")
       function putreposownerrepointeractionlimits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepointeractionlimits.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/interaction-limits")
      function Interactions() {
           this.getRestrictionsForAuthenticatedUser = getuserinteractionlimits;
           this.getRestrictionsForOrg = getorgsorginteractionlimits;
           this.getRestrictionsForRepo = getreposownerrepointeractionlimits;
           this.getRestrictionsForYourPublicRepos = getuserinteractionlimits;
           this.removeRestrictionsForAuthenticatedUser = deleteuserinteractionlimits;
           this.removeRestrictionsForOrg = deleteorgsorginteractionlimits;
           this.removeRestrictionsForRepo = deletereposownerrepointeractionlimits;
           this.removeRestrictionsForYourPublicRepos = deleteuserinteractionlimits;
           this.setRestrictionsForAuthenticatedUser = putuserinteractionlimits;
           this.setRestrictionsForOrg = putorgsorginteractionlimits;
           this.setRestrictionsForRepo = putreposownerrepointeractionlimits;
           this.setRestrictionsForYourPublicRepos = putuserinteractionlimits;
           this.addOrUpdateRestrictionsForOrg = putorgsorginteractionlimits;
           this.addOrUpdateRestrictionsForRepo = putreposownerrepointeractionlimits;
        }
       function postreposownerrepoissuesissue_numberassignees(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoissuesissue_numberassignees.endpoint = new Endpoint("POST /repos/{owner}/{repo}/issues/{issue_number}/assignees")
       function postreposownerrepoissuesissue_numberlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoissuesissue_numberlabels.endpoint = new Endpoint("POST /repos/{owner}/{repo}/issues/{issue_number}/labels")
       function getreposownerrepoassigneesassignee(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoassigneesassignee.endpoint = new Endpoint("GET /repos/{owner}/{repo}/assignees/{assignee}")
       function getreposownerrepoissuesissue_numberassigneesassignee(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissuesissue_numberassigneesassignee.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues/{issue_number}/assignees/{assignee}")
       function postreposownerrepoissues(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoissues.endpoint = new Endpoint("POST /repos/{owner}/{repo}/issues")
       function postreposownerrepoissuesissue_numbercomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoissuesissue_numbercomments.endpoint = new Endpoint("POST /repos/{owner}/{repo}/issues/{issue_number}/comments")
       function postreposownerrepolabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepolabels.endpoint = new Endpoint("POST /repos/{owner}/{repo}/labels")
       function postreposownerrepomilestones(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepomilestones.endpoint = new Endpoint("POST /repos/{owner}/{repo}/milestones")
       function deletereposownerrepoissuescommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoissuescommentscomment_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}")
       function deletereposownerrepolabelsname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepolabelsname.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/labels/{name}")
       function deletereposownerrepomilestonesmilestone_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepomilestonesmilestone_number.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/milestones/{milestone_number}")
       function getreposownerrepoissuesissue_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissuesissue_number.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues/{issue_number}")
       function getreposownerrepoissuescommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissuescommentscomment_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues/comments/{comment_id}")
       function getreposownerrepoissueseventsevent_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissueseventsevent_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues/events/{event_id}")
       function getreposownerrepolabelsname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepolabelsname.endpoint = new Endpoint("GET /repos/{owner}/{repo}/labels/{name}")
       function getreposownerrepomilestonesmilestone_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepomilestonesmilestone_number.endpoint = new Endpoint("GET /repos/{owner}/{repo}/milestones/{milestone_number}")
       function getissues(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getissues.endpoint = new Endpoint("GET /issues")
       function getreposownerrepoassignees(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoassignees.endpoint = new Endpoint("GET /repos/{owner}/{repo}/assignees")
       function getreposownerrepoissuesissue_numbercomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissuesissue_numbercomments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues/{issue_number}/comments")
       function getreposownerrepoissuescomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissuescomments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues/comments")
       function getreposownerrepoissuesissue_numberevents(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissuesissue_numberevents.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues/{issue_number}/events")
       function getreposownerrepoissuesevents(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissuesevents.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues/events")
       function getreposownerrepoissuesissue_numbertimeline(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissuesissue_numbertimeline.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues/{issue_number}/timeline")
       function getuserissues(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserissues.endpoint = new Endpoint("GET /user/issues")
       function getorgsorgissues(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgissues.endpoint = new Endpoint("GET /orgs/{org}/issues")
       function getreposownerrepoissues(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissues.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues")
       function getreposownerrepomilestonesmilestone_numberlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepomilestonesmilestone_numberlabels.endpoint = new Endpoint("GET /repos/{owner}/{repo}/milestones/{milestone_number}/labels")
       function getreposownerrepolabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepolabels.endpoint = new Endpoint("GET /repos/{owner}/{repo}/labels")
       function getreposownerrepoissuesissue_numberlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissuesissue_numberlabels.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues/{issue_number}/labels")
       function getreposownerrepomilestones(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepomilestones.endpoint = new Endpoint("GET /repos/{owner}/{repo}/milestones")
       function putreposownerrepoissuesissue_numberlock(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoissuesissue_numberlock.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/issues/{issue_number}/lock")
       function deletereposownerrepoissuesissue_numberlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoissuesissue_numberlabels.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels")
       function deletereposownerrepoissuesissue_numberassignees(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoissuesissue_numberassignees.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/issues/{issue_number}/assignees")
       function deletereposownerrepoissuesissue_numberlabelsname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoissuesissue_numberlabelsname.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels/{name}")
       function putreposownerrepoissuesissue_numberlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoissuesissue_numberlabels.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/issues/{issue_number}/labels")
       function deletereposownerrepoissuesissue_numberlock(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoissuesissue_numberlock.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/issues/{issue_number}/lock")
       function patchreposownerrepoissuesissue_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepoissuesissue_number.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/issues/{issue_number}")
       function patchreposownerrepoissuescommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepoissuescommentscomment_id.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/issues/comments/{comment_id}")
       function patchreposownerrepolabelsname(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepolabelsname.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/labels/{name}")
       function patchreposownerrepomilestonesmilestone_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepomilestonesmilestone_number.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/milestones/{milestone_number}")
       function getreposownerrepoassigneesassignee(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoassigneesassignee.endpoint = new Endpoint("GET /repos/{owner}/{repo}/assignees/{assignee}")
       function getreposownerrepomilestones(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepomilestones.endpoint = new Endpoint("GET /repos/{owner}/{repo}/milestones")
       function deletereposownerrepoissuesissue_numberlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoissuesissue_numberlabels.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/issues/{issue_number}/labels")
       function putreposownerrepoissuesissue_numberlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoissuesissue_numberlabels.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/issues/{issue_number}/labels")
       function putreposownerrepoissuesissue_numberlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoissuesissue_numberlabels.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/issues/{issue_number}/labels")
      function Issues() {
           this.addAssignees = postreposownerrepoissuesissue_numberassignees;
           this.addLabels = postreposownerrepoissuesissue_numberlabels;
           this.checkUserCanBeAssigned = getreposownerrepoassigneesassignee;
           this.checkUserCanBeAssignedToIssue = getreposownerrepoissuesissue_numberassigneesassignee;
           this.create = postreposownerrepoissues;
           this.createComment = postreposownerrepoissuesissue_numbercomments;
           this.createLabel = postreposownerrepolabels;
           this.createMilestone = postreposownerrepomilestones;
           this.deleteComment = deletereposownerrepoissuescommentscomment_id;
           this.deleteLabel = deletereposownerrepolabelsname;
           this.deleteMilestone = deletereposownerrepomilestonesmilestone_number;
           this.get = getreposownerrepoissuesissue_number;
           this.getComment = getreposownerrepoissuescommentscomment_id;
           this.getEvent = getreposownerrepoissueseventsevent_id;
           this.getLabel = getreposownerrepolabelsname;
           this.getMilestone = getreposownerrepomilestonesmilestone_number;
           this.list = getissues;
           this.listAssignees = getreposownerrepoassignees;
           this.listComments = getreposownerrepoissuesissue_numbercomments;
           this.listCommentsForRepo = getreposownerrepoissuescomments;
           this.listEvents = getreposownerrepoissuesissue_numberevents;
           this.listEventsForRepo = getreposownerrepoissuesevents;
           this.listEventsForTimeline = getreposownerrepoissuesissue_numbertimeline;
           this.listForAuthenticatedUser = getuserissues;
           this.listForOrg = getorgsorgissues;
           this.listForRepo = getreposownerrepoissues;
           this.listLabelsForMilestone = getreposownerrepomilestonesmilestone_numberlabels;
           this.listLabelsForRepo = getreposownerrepolabels;
           this.listLabelsOnIssue = getreposownerrepoissuesissue_numberlabels;
           this.listMilestones = getreposownerrepomilestones;
           this.lock = putreposownerrepoissuesissue_numberlock;
           this.removeAllLabels = deletereposownerrepoissuesissue_numberlabels;
           this.removeAssignees = deletereposownerrepoissuesissue_numberassignees;
           this.removeLabel = deletereposownerrepoissuesissue_numberlabelsname;
           this.setLabels = putreposownerrepoissuesissue_numberlabels;
           this.unlock = deletereposownerrepoissuesissue_numberlock;
           this.update = patchreposownerrepoissuesissue_number;
           this.updateComment = patchreposownerrepoissuescommentscomment_id;
           this.updateLabel = patchreposownerrepolabelsname;
           this.updateMilestone = patchreposownerrepomilestonesmilestone_number;
           this.checkAssignee = getreposownerrepoassigneesassignee;
           this.listMilestonesForRepo = getreposownerrepomilestones;
           this.removeLabels = deletereposownerrepoissuesissue_numberlabels;
           this.replaceAllLabels = putreposownerrepoissuesissue_numberlabels;
           this.replaceLabels = putreposownerrepoissuesissue_numberlabels;
        }
       function getlicenseslicense(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getlicenseslicense.endpoint = new Endpoint("GET /licenses/{license}")
       function getlicenses(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getlicenses.endpoint = new Endpoint("GET /licenses")
       function getreposownerrepolicense(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepolicense.endpoint = new Endpoint("GET /repos/{owner}/{repo}/license")
       function getlicenses(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getlicenses.endpoint = new Endpoint("GET /licenses")
      function Licenses() {
           this.get = getlicenseslicense;
           this.getAllCommonlyUsed = getlicenses;
           this.getForRepo = getreposownerrepolicense;
           this.listCommonlyUsed = getlicenses;
        }
       function postmarkdown(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postmarkdown.endpoint = new Endpoint("POST /markdown")
       function postmarkdownraw(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postmarkdownraw.endpoint = new Endpoint("POST /markdown/raw")
      function Markdown() {
           this.render = postmarkdown;
           this.renderRaw = postmarkdownraw;
        }
       function getmeta(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getmeta.endpoint = new Endpoint("GET /meta")
       function getversions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getversions.endpoint = new Endpoint("GET /versions")
       function getoctocat(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getoctocat.endpoint = new Endpoint("GET /octocat")
       function getzen(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getzen.endpoint = new Endpoint("GET /zen")
       function get(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        get.endpoint = new Endpoint("GET /")
      function Meta() {
           this.get = getmeta;
           this.getAllVersions = getversions;
           this.getOctocat = getoctocat;
           this.getZen = getzen;
           this.root = get;
        }
       function deletereposownerrepoimport(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoimport.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/import")
       function deleteusermigrationsmigration_idarchive(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteusermigrationsmigration_idarchive.endpoint = new Endpoint("DELETE /user/migrations/{migration_id}/archive")
       function deleteorgsorgmigrationsmigration_idarchive(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgmigrationsmigration_idarchive.endpoint = new Endpoint("DELETE /orgs/{org}/migrations/{migration_id}/archive")
       function getorgsorgmigrationsmigration_idarchive(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgmigrationsmigration_idarchive.endpoint = new Endpoint("GET /orgs/{org}/migrations/{migration_id}/archive")
       function getusermigrationsmigration_idarchive(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusermigrationsmigration_idarchive.endpoint = new Endpoint("GET /user/migrations/{migration_id}/archive")
       function getreposownerrepoimportauthors(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoimportauthors.endpoint = new Endpoint("GET /repos/{owner}/{repo}/import/authors")
       function getreposownerrepoimport(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoimport.endpoint = new Endpoint("GET /repos/{owner}/{repo}/import")
       function getreposownerrepoimportlarge_files(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoimportlarge_files.endpoint = new Endpoint("GET /repos/{owner}/{repo}/import/large_files")
       function getusermigrationsmigration_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusermigrationsmigration_id.endpoint = new Endpoint("GET /user/migrations/{migration_id}")
       function getorgsorgmigrationsmigration_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgmigrationsmigration_id.endpoint = new Endpoint("GET /orgs/{org}/migrations/{migration_id}")
       function getusermigrations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusermigrations.endpoint = new Endpoint("GET /user/migrations")
       function getorgsorgmigrations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgmigrations.endpoint = new Endpoint("GET /orgs/{org}/migrations")
       function getusermigrationsmigration_idrepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusermigrationsmigration_idrepositories.endpoint = new Endpoint("GET /user/migrations/{migration_id}/repositories")
       function getorgsorgmigrationsmigration_idrepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgmigrationsmigration_idrepositories.endpoint = new Endpoint("GET /orgs/{org}/migrations/{migration_id}/repositories")
       function getusermigrationsmigration_idrepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusermigrationsmigration_idrepositories.endpoint = new Endpoint("GET /user/migrations/{migration_id}/repositories")
       function patchreposownerrepoimportauthorsauthor_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepoimportauthorsauthor_id.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/import/authors/{author_id}")
       function patchreposownerrepoimportlfs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepoimportlfs.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/import/lfs")
       function postusermigrations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postusermigrations.endpoint = new Endpoint("POST /user/migrations")
       function postorgsorgmigrations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgmigrations.endpoint = new Endpoint("POST /orgs/{org}/migrations")
       function putreposownerrepoimport(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoimport.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/import")
       function deleteusermigrationsmigration_idreposrepo_namelock(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteusermigrationsmigration_idreposrepo_namelock.endpoint = new Endpoint("DELETE /user/migrations/{migration_id}/repos/{repo_name}/lock")
       function deleteorgsorgmigrationsmigration_idreposrepo_namelock(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgmigrationsmigration_idreposrepo_namelock.endpoint = new Endpoint("DELETE /orgs/{org}/migrations/{migration_id}/repos/{repo_name}/lock")
       function patchreposownerrepoimport(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepoimport.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/import")
       function getreposownerrepoimport(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoimport.endpoint = new Endpoint("GET /repos/{owner}/{repo}/import")
      function Migrations() {
           this.cancelImport = deletereposownerrepoimport;
           this.deleteArchiveForAuthenticatedUser = deleteusermigrationsmigration_idarchive;
           this.deleteArchiveForOrg = deleteorgsorgmigrationsmigration_idarchive;
           this.downloadArchiveForOrg = getorgsorgmigrationsmigration_idarchive;
           this.getArchiveForAuthenticatedUser = getusermigrationsmigration_idarchive;
           this.getCommitAuthors = getreposownerrepoimportauthors;
           this.getImportStatus = getreposownerrepoimport;
           this.getLargeFiles = getreposownerrepoimportlarge_files;
           this.getStatusForAuthenticatedUser = getusermigrationsmigration_id;
           this.getStatusForOrg = getorgsorgmigrationsmigration_id;
           this.listForAuthenticatedUser = getusermigrations;
           this.listForOrg = getorgsorgmigrations;
           this.listReposForAuthenticatedUser = getusermigrationsmigration_idrepositories;
           this.listReposForOrg = getorgsorgmigrationsmigration_idrepositories;
           this.listReposForUser = getusermigrationsmigration_idrepositories;
           this.mapCommitAuthor = patchreposownerrepoimportauthorsauthor_id;
           this.setLfsPreference = patchreposownerrepoimportlfs;
           this.startForAuthenticatedUser = postusermigrations;
           this.startForOrg = postorgsorgmigrations;
           this.startImport = putreposownerrepoimport;
           this.unlockRepoForAuthenticatedUser = deleteusermigrationsmigration_idreposrepo_namelock;
           this.unlockRepoForOrg = deleteorgsorgmigrationsmigration_idreposrepo_namelock;
           this.updateImport = patchreposownerrepoimport;
           this.getImportProgress = getreposownerrepoimport;
        }
       function getorgsorgactionsoidccustomizationsub(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgactionsoidccustomizationsub.endpoint = new Endpoint("GET /orgs/{org}/actions/oidc/customization/sub")
       function putorgsorgactionsoidccustomizationsub(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgactionsoidccustomizationsub.endpoint = new Endpoint("PUT /orgs/{org}/actions/oidc/customization/sub")
      function Oidc() {
           this.getOidcCustomSubTemplateForOrg = getorgsorgactionsoidccustomizationsub;
           this.updateOidcCustomSubTemplateForOrg = putorgsorgactionsoidccustomizationsub;
        }
       function putorgsorgsecuritymanagersteamsteam_slug(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgsecuritymanagersteamsteam_slug.endpoint = new Endpoint("PUT /orgs/{org}/security-managers/teams/{team_slug}")
       function putorgsorgblocksusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgblocksusername.endpoint = new Endpoint("PUT /orgs/{org}/blocks/{username}")
       function deleteorgsorginvitationsinvitation_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorginvitationsinvitation_id.endpoint = new Endpoint("DELETE /orgs/{org}/invitations/{invitation_id}")
       function getorgsorgblocksusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgblocksusername.endpoint = new Endpoint("GET /orgs/{org}/blocks/{username}")
       function getorgsorgmembersusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgmembersusername.endpoint = new Endpoint("GET /orgs/{org}/members/{username}")
       function getorgsorgpublic_membersusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpublic_membersusername.endpoint = new Endpoint("GET /orgs/{org}/public_members/{username}")
       function putorgsorgoutside_collaboratorsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgoutside_collaboratorsusername.endpoint = new Endpoint("PUT /orgs/{org}/outside_collaborators/{username}")
       function postorgsorginvitations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorginvitations.endpoint = new Endpoint("POST /orgs/{org}/invitations")
       function patchorgsorgpropertiesschema(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchorgsorgpropertiesschema.endpoint = new Endpoint("PATCH /orgs/{org}/properties/schema")
       function patchorgsorgpropertiesvalues(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchorgsorgpropertiesvalues.endpoint = new Endpoint("PATCH /orgs/{org}/properties/values")
       function putorgsorgpropertiesschemacustom_property_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgpropertiesschemacustom_property_name.endpoint = new Endpoint("PUT /orgs/{org}/properties/schema/{custom_property_name}")
       function postorgsorghooks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorghooks.endpoint = new Endpoint("POST /orgs/{org}/hooks")
       function deleteorgsorg(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorg.endpoint = new Endpoint("DELETE /orgs/{org}")
       function deleteorgsorghookshook_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorghookshook_id.endpoint = new Endpoint("DELETE /orgs/{org}/hooks/{hook_id}")
       function postorgsorgsecurity_productenablement(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgsecurity_productenablement.endpoint = new Endpoint("POST /orgs/{org}/{security_product}/{enablement}")
       function getorgsorg(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorg.endpoint = new Endpoint("GET /orgs/{org}")
       function getorgsorgpropertiesschema(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpropertiesschema.endpoint = new Endpoint("GET /orgs/{org}/properties/schema")
       function getorgsorgpropertiesschemacustom_property_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpropertiesschemacustom_property_name.endpoint = new Endpoint("GET /orgs/{org}/properties/schema/{custom_property_name}")
       function getusermembershipsorgsorg(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusermembershipsorgsorg.endpoint = new Endpoint("GET /user/memberships/orgs/{org}")
       function getorgsorgmembershipsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgmembershipsusername.endpoint = new Endpoint("GET /orgs/{org}/memberships/{username}")
       function getorgsorghookshook_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorghookshook_id.endpoint = new Endpoint("GET /orgs/{org}/hooks/{hook_id}")
       function getorgsorghookshook_idconfig(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorghookshook_idconfig.endpoint = new Endpoint("GET /orgs/{org}/hooks/{hook_id}/config")
       function getorgsorghookshook_iddeliveriesdelivery_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorghookshook_iddeliveriesdelivery_id.endpoint = new Endpoint("GET /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}")
       function getorganizations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorganizations.endpoint = new Endpoint("GET /organizations")
       function getorgsorginstallations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorginstallations.endpoint = new Endpoint("GET /orgs/{org}/installations")
       function getorgsorgblocks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgblocks.endpoint = new Endpoint("GET /orgs/{org}/blocks")
       function getorgsorgpropertiesvalues(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpropertiesvalues.endpoint = new Endpoint("GET /orgs/{org}/properties/values")
       function getorgsorgfailed_invitations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgfailed_invitations.endpoint = new Endpoint("GET /orgs/{org}/failed_invitations")
       function getuserorgs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserorgs.endpoint = new Endpoint("GET /user/orgs")
       function getusersusernameorgs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernameorgs.endpoint = new Endpoint("GET /users/{username}/orgs")
       function getorgsorginvitationsinvitation_idteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorginvitationsinvitation_idteams.endpoint = new Endpoint("GET /orgs/{org}/invitations/{invitation_id}/teams")
       function getorgsorgmembers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgmembers.endpoint = new Endpoint("GET /orgs/{org}/members")
       function getusermembershipsorgs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusermembershipsorgs.endpoint = new Endpoint("GET /user/memberships/orgs")
       function getorgsorgoutside_collaborators(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgoutside_collaborators.endpoint = new Endpoint("GET /orgs/{org}/outside_collaborators")
       function getorgsorgpersonalaccesstokenspat_idrepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpersonalaccesstokenspat_idrepositories.endpoint = new Endpoint("GET /orgs/{org}/personal-access-tokens/{pat_id}/repositories")
       function getorgsorgpersonalaccesstokenrequestspat_request_idrepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpersonalaccesstokenrequestspat_request_idrepositories.endpoint = new Endpoint("GET /orgs/{org}/personal-access-token-requests/{pat_request_id}/repositories")
       function getorgsorgpersonalaccesstokenrequests(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpersonalaccesstokenrequests.endpoint = new Endpoint("GET /orgs/{org}/personal-access-token-requests")
       function getorgsorgpersonalaccesstokens(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpersonalaccesstokens.endpoint = new Endpoint("GET /orgs/{org}/personal-access-tokens")
       function getorgsorginvitations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorginvitations.endpoint = new Endpoint("GET /orgs/{org}/invitations")
       function getorgsorgpublic_members(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpublic_members.endpoint = new Endpoint("GET /orgs/{org}/public_members")
       function getorgsorgsecuritymanagers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgsecuritymanagers.endpoint = new Endpoint("GET /orgs/{org}/security-managers")
       function getorgsorghookshook_iddeliveries(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorghookshook_iddeliveries.endpoint = new Endpoint("GET /orgs/{org}/hooks/{hook_id}/deliveries")
       function getorgsorghooks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorghooks.endpoint = new Endpoint("GET /orgs/{org}/hooks")
       function postorgsorghookshook_idpings(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorghookshook_idpings.endpoint = new Endpoint("POST /orgs/{org}/hooks/{hook_id}/pings")
       function postorgsorghookshook_iddeliveriesdelivery_idattempts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorghookshook_iddeliveriesdelivery_idattempts.endpoint = new Endpoint("POST /orgs/{org}/hooks/{hook_id}/deliveries/{delivery_id}/attempts")
       function deleteorgsorgpropertiesschemacustom_property_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgpropertiesschemacustom_property_name.endpoint = new Endpoint("DELETE /orgs/{org}/properties/schema/{custom_property_name}")
       function deleteorgsorgmembersusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgmembersusername.endpoint = new Endpoint("DELETE /orgs/{org}/members/{username}")
       function deleteorgsorgmembershipsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgmembershipsusername.endpoint = new Endpoint("DELETE /orgs/{org}/memberships/{username}")
       function deleteorgsorgoutside_collaboratorsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgoutside_collaboratorsusername.endpoint = new Endpoint("DELETE /orgs/{org}/outside_collaborators/{username}")
       function deleteorgsorgpublic_membersusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgpublic_membersusername.endpoint = new Endpoint("DELETE /orgs/{org}/public_members/{username}")
       function deleteorgsorgsecuritymanagersteamsteam_slug(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgsecuritymanagersteamsteam_slug.endpoint = new Endpoint("DELETE /orgs/{org}/security-managers/teams/{team_slug}")
       function postorgsorgpersonalaccesstokenrequestspat_request_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgpersonalaccesstokenrequestspat_request_id.endpoint = new Endpoint("POST /orgs/{org}/personal-access-token-requests/{pat_request_id}")
       function postorgsorgpersonalaccesstokenrequests(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgpersonalaccesstokenrequests.endpoint = new Endpoint("POST /orgs/{org}/personal-access-token-requests")
       function putorgsorgmembershipsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgmembershipsusername.endpoint = new Endpoint("PUT /orgs/{org}/memberships/{username}")
       function putorgsorgpublic_membersusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgpublic_membersusername.endpoint = new Endpoint("PUT /orgs/{org}/public_members/{username}")
       function deleteorgsorgblocksusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgblocksusername.endpoint = new Endpoint("DELETE /orgs/{org}/blocks/{username}")
       function patchorgsorg(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchorgsorg.endpoint = new Endpoint("PATCH /orgs/{org}")
       function patchusermembershipsorgsorg(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchusermembershipsorgsorg.endpoint = new Endpoint("PATCH /user/memberships/orgs/{org}")
       function postorgsorgpersonalaccesstokenspat_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgpersonalaccesstokenspat_id.endpoint = new Endpoint("POST /orgs/{org}/personal-access-tokens/{pat_id}")
       function postorgsorgpersonalaccesstokens(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgpersonalaccesstokens.endpoint = new Endpoint("POST /orgs/{org}/personal-access-tokens")
       function patchorgsorghookshook_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchorgsorghookshook_id.endpoint = new Endpoint("PATCH /orgs/{org}/hooks/{hook_id}")
       function patchorgsorghookshook_idconfig(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchorgsorghookshook_idconfig.endpoint = new Endpoint("PATCH /orgs/{org}/hooks/{hook_id}/config")
       function putorgsorgmembershipsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgmembershipsusername.endpoint = new Endpoint("PUT /orgs/{org}/memberships/{username}")
       function getorgsorgmembersusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgmembersusername.endpoint = new Endpoint("GET /orgs/{org}/members/{username}")
       function getorgsorgpublic_membersusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpublic_membersusername.endpoint = new Endpoint("GET /orgs/{org}/public_members/{username}")
       function deleteorgsorgpublic_membersusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgpublic_membersusername.endpoint = new Endpoint("DELETE /orgs/{org}/public_members/{username}")
       function postorgsorghooks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorghooks.endpoint = new Endpoint("POST /orgs/{org}/hooks")
       function deleteorgsorghookshook_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorghookshook_id.endpoint = new Endpoint("DELETE /orgs/{org}/hooks/{hook_id}")
       function getorgsorghookshook_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorghookshook_id.endpoint = new Endpoint("GET /orgs/{org}/hooks/{hook_id}")
       function getorgsorgmembershipsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgmembershipsusername.endpoint = new Endpoint("GET /orgs/{org}/memberships/{username}")
       function getorgsorghooks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorghooks.endpoint = new Endpoint("GET /orgs/{org}/hooks")
       function getorgsorginstallations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorginstallations.endpoint = new Endpoint("GET /orgs/{org}/installations")
       function getusermembershipsorgs(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusermembershipsorgs.endpoint = new Endpoint("GET /user/memberships/orgs")
       function postorgsorghookshook_idpings(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorghookshook_idpings.endpoint = new Endpoint("POST /orgs/{org}/hooks/{hook_id}/pings")
       function putorgsorgpublic_membersusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgpublic_membersusername.endpoint = new Endpoint("PUT /orgs/{org}/public_members/{username}")
       function deleteorgsorgmembershipsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgmembershipsusername.endpoint = new Endpoint("DELETE /orgs/{org}/memberships/{username}")
       function patchorgsorghookshook_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchorgsorghookshook_id.endpoint = new Endpoint("PATCH /orgs/{org}/hooks/{hook_id}")
       function patchusermembershipsorgsorg(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchusermembershipsorgsorg.endpoint = new Endpoint("PATCH /user/memberships/orgs/{org}")
      function Orgs() {
           this.addSecurityManagerTeam = putorgsorgsecuritymanagersteamsteam_slug;
           this.blockUser = putorgsorgblocksusername;
           this.cancelInvitation = deleteorgsorginvitationsinvitation_id;
           this.checkBlockedUser = getorgsorgblocksusername;
           this.checkMembershipForUser = getorgsorgmembersusername;
           this.checkPublicMembershipForUser = getorgsorgpublic_membersusername;
           this.convertMemberToOutsideCollaborator = putorgsorgoutside_collaboratorsusername;
           this.createInvitation = postorgsorginvitations;
           this.createOrUpdateCustomProperties = patchorgsorgpropertiesschema;
           this.createOrUpdateCustomPropertiesValuesForRepos = patchorgsorgpropertiesvalues;
           this.createOrUpdateCustomProperty = putorgsorgpropertiesschemacustom_property_name;
           this.createWebhook = postorgsorghooks;
           this.delete = deleteorgsorg;
           this.deleteWebhook = deleteorgsorghookshook_id;
           this.enableOrDisableSecurityProductOnAllOrgRepos = postorgsorgsecurity_productenablement;
           this.get = getorgsorg;
           this.getAllCustomProperties = getorgsorgpropertiesschema;
           this.getCustomProperty = getorgsorgpropertiesschemacustom_property_name;
           this.getMembershipForAuthenticatedUser = getusermembershipsorgsorg;
           this.getMembershipForUser = getorgsorgmembershipsusername;
           this.getWebhook = getorgsorghookshook_id;
           this.getWebhookConfigForOrg = getorgsorghookshook_idconfig;
           this.getWebhookDelivery = getorgsorghookshook_iddeliveriesdelivery_id;
           this.list = getorganizations;
           this.listAppInstallations = getorgsorginstallations;
           this.listBlockedUsers = getorgsorgblocks;
           this.listCustomPropertiesValuesForRepos = getorgsorgpropertiesvalues;
           this.listFailedInvitations = getorgsorgfailed_invitations;
           this.listForAuthenticatedUser = getuserorgs;
           this.listForUser = getusersusernameorgs;
           this.listInvitationTeams = getorgsorginvitationsinvitation_idteams;
           this.listMembers = getorgsorgmembers;
           this.listMembershipsForAuthenticatedUser = getusermembershipsorgs;
           this.listOutsideCollaborators = getorgsorgoutside_collaborators;
           this.listPatGrantRepositories = getorgsorgpersonalaccesstokenspat_idrepositories;
           this.listPatGrantRequestRepositories = getorgsorgpersonalaccesstokenrequestspat_request_idrepositories;
           this.listPatGrantRequests = getorgsorgpersonalaccesstokenrequests;
           this.listPatGrants = getorgsorgpersonalaccesstokens;
           this.listPendingInvitations = getorgsorginvitations;
           this.listPublicMembers = getorgsorgpublic_members;
           this.listSecurityManagerTeams = getorgsorgsecuritymanagers;
           this.listWebhookDeliveries = getorgsorghookshook_iddeliveries;
           this.listWebhooks = getorgsorghooks;
           this.pingWebhook = postorgsorghookshook_idpings;
           this.redeliverWebhookDelivery = postorgsorghookshook_iddeliveriesdelivery_idattempts;
           this.removeCustomProperty = deleteorgsorgpropertiesschemacustom_property_name;
           this.removeMember = deleteorgsorgmembersusername;
           this.removeMembershipForUser = deleteorgsorgmembershipsusername;
           this.removeOutsideCollaborator = deleteorgsorgoutside_collaboratorsusername;
           this.removePublicMembershipForAuthenticatedUser = deleteorgsorgpublic_membersusername;
           this.removeSecurityManagerTeam = deleteorgsorgsecuritymanagersteamsteam_slug;
           this.reviewPatGrantRequest = postorgsorgpersonalaccesstokenrequestspat_request_id;
           this.reviewPatGrantRequestsInBulk = postorgsorgpersonalaccesstokenrequests;
           this.setMembershipForUser = putorgsorgmembershipsusername;
           this.setPublicMembershipForAuthenticatedUser = putorgsorgpublic_membersusername;
           this.unblockUser = deleteorgsorgblocksusername;
           this.update = patchorgsorg;
           this.updateMembershipForAuthenticatedUser = patchusermembershipsorgsorg;
           this.updatePatAccess = postorgsorgpersonalaccesstokenspat_id;
           this.updatePatAccesses = postorgsorgpersonalaccesstokens;
           this.updateWebhook = patchorgsorghookshook_id;
           this.updateWebhookConfigForOrg = patchorgsorghookshook_idconfig;
           this.addOrUpdateMembership = putorgsorgmembershipsusername;
           this.checkMembership = getorgsorgmembersusername;
           this.checkPublicMembership = getorgsorgpublic_membersusername;
           this.concealMembership = deleteorgsorgpublic_membersusername;
           this.createHook = postorgsorghooks;
           this.deleteHook = deleteorgsorghookshook_id;
           this.getHook = getorgsorghookshook_id;
           this.getMembership = getorgsorgmembershipsusername;
           this.listHooks = getorgsorghooks;
           this.listInstallations = getorgsorginstallations;
           this.listMemberships = getusermembershipsorgs;
           this.pingHook = postorgsorghookshook_idpings;
           this.publicizeMembership = putorgsorgpublic_membersusername;
           this.removeMembership = deleteorgsorgmembershipsusername;
           this.updateHook = patchorgsorghookshook_id;
           this.updateMembership = patchusermembershipsorgsorg;
        }
       function deleteuserpackagespackage_typepackage_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserpackagespackage_typepackage_name.endpoint = new Endpoint("DELETE /user/packages/{package_type}/{package_name}")
       function deleteorgsorgpackagespackage_typepackage_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgpackagespackage_typepackage_name.endpoint = new Endpoint("DELETE /orgs/{org}/packages/{package_type}/{package_name}")
       function deleteusersusernamepackagespackage_typepackage_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteusersusernamepackagespackage_typepackage_name.endpoint = new Endpoint("DELETE /users/{username}/packages/{package_type}/{package_name}")
       function deleteuserpackagespackage_typepackage_nameversionspackage_version_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserpackagespackage_typepackage_nameversionspackage_version_id.endpoint = new Endpoint("DELETE /user/packages/{package_type}/{package_name}/versions/{package_version_id}")
       function deleteorgsorgpackagespackage_typepackage_nameversionspackage_version_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgpackagespackage_typepackage_nameversionspackage_version_id.endpoint = new Endpoint("DELETE /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}")
       function deleteusersusernamepackagespackage_typepackage_nameversionspackage_version_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteusersusernamepackagespackage_typepackage_nameversionspackage_version_id.endpoint = new Endpoint("DELETE /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}")
       function getorgsorgpackagespackage_typepackage_nameversions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpackagespackage_typepackage_nameversions.endpoint = new Endpoint("GET /orgs/{org}/packages/{package_type}/{package_name}/versions")
       function getuserpackagespackage_typepackage_nameversions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserpackagespackage_typepackage_nameversions.endpoint = new Endpoint("GET /user/packages/{package_type}/{package_name}/versions")
       function getuserpackagespackage_typepackage_nameversions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserpackagespackage_typepackage_nameversions.endpoint = new Endpoint("GET /user/packages/{package_type}/{package_name}/versions")
       function getorgsorgpackagespackage_typepackage_nameversions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpackagespackage_typepackage_nameversions.endpoint = new Endpoint("GET /orgs/{org}/packages/{package_type}/{package_name}/versions")
       function getusersusernamepackagespackage_typepackage_nameversions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamepackagespackage_typepackage_nameversions.endpoint = new Endpoint("GET /users/{username}/packages/{package_type}/{package_name}/versions")
       function getuserpackagespackage_typepackage_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserpackagespackage_typepackage_name.endpoint = new Endpoint("GET /user/packages/{package_type}/{package_name}")
       function getorgsorgpackagespackage_typepackage_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpackagespackage_typepackage_name.endpoint = new Endpoint("GET /orgs/{org}/packages/{package_type}/{package_name}")
       function getusersusernamepackagespackage_typepackage_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamepackagespackage_typepackage_name.endpoint = new Endpoint("GET /users/{username}/packages/{package_type}/{package_name}")
       function getuserpackagespackage_typepackage_nameversionspackage_version_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserpackagespackage_typepackage_nameversionspackage_version_id.endpoint = new Endpoint("GET /user/packages/{package_type}/{package_name}/versions/{package_version_id}")
       function getorgsorgpackagespackage_typepackage_nameversionspackage_version_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpackagespackage_typepackage_nameversionspackage_version_id.endpoint = new Endpoint("GET /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}")
       function getusersusernamepackagespackage_typepackage_nameversionspackage_version_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamepackagespackage_typepackage_nameversionspackage_version_id.endpoint = new Endpoint("GET /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}")
       function getuserdockerconflicts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserdockerconflicts.endpoint = new Endpoint("GET /user/docker/conflicts")
       function getorgsorgdockerconflicts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgdockerconflicts.endpoint = new Endpoint("GET /orgs/{org}/docker/conflicts")
       function getusersusernamedockerconflicts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamedockerconflicts.endpoint = new Endpoint("GET /users/{username}/docker/conflicts")
       function getuserpackages(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserpackages.endpoint = new Endpoint("GET /user/packages")
       function getorgsorgpackages(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgpackages.endpoint = new Endpoint("GET /orgs/{org}/packages")
       function getusersusernamepackages(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamepackages.endpoint = new Endpoint("GET /users/{username}/packages")
       function postuserpackagespackage_typepackage_namerestoretoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postuserpackagespackage_typepackage_namerestoretoken.endpoint = new Endpoint("POST /user/packages/{package_type}/{package_name}/restore{?token}")
       function postorgsorgpackagespackage_typepackage_namerestoretoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgpackagespackage_typepackage_namerestoretoken.endpoint = new Endpoint("POST /orgs/{org}/packages/{package_type}/{package_name}/restore{?token}")
       function postusersusernamepackagespackage_typepackage_namerestoretoken(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postusersusernamepackagespackage_typepackage_namerestoretoken.endpoint = new Endpoint("POST /users/{username}/packages/{package_type}/{package_name}/restore{?token}")
       function postuserpackagespackage_typepackage_nameversionspackage_version_idrestore(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postuserpackagespackage_typepackage_nameversionspackage_version_idrestore.endpoint = new Endpoint("POST /user/packages/{package_type}/{package_name}/versions/{package_version_id}/restore")
       function postorgsorgpackagespackage_typepackage_nameversionspackage_version_idrestore(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgpackagespackage_typepackage_nameversionspackage_version_idrestore.endpoint = new Endpoint("POST /orgs/{org}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore")
       function postusersusernamepackagespackage_typepackage_nameversionspackage_version_idrestore(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postusersusernamepackagespackage_typepackage_nameversionspackage_version_idrestore.endpoint = new Endpoint("POST /users/{username}/packages/{package_type}/{package_name}/versions/{package_version_id}/restore")
      function Packages() {
           this.deletePackageForAuthenticatedUser = deleteuserpackagespackage_typepackage_name;
           this.deletePackageForOrg = deleteorgsorgpackagespackage_typepackage_name;
           this.deletePackageForUser = deleteusersusernamepackagespackage_typepackage_name;
           this.deletePackageVersionForAuthenticatedUser = deleteuserpackagespackage_typepackage_nameversionspackage_version_id;
           this.deletePackageVersionForOrg = deleteorgsorgpackagespackage_typepackage_nameversionspackage_version_id;
           this.deletePackageVersionForUser = deleteusersusernamepackagespackage_typepackage_nameversionspackage_version_id;
           this.getAllPackageVersionsForAPackageOwnedByAnOrg = getorgsorgpackagespackage_typepackage_nameversions;
           this.getAllPackageVersionsForAPackageOwnedByTheAuthenticatedUser = getuserpackagespackage_typepackage_nameversions;
           this.getAllPackageVersionsForPackageOwnedByAuthenticatedUser = getuserpackagespackage_typepackage_nameversions;
           this.getAllPackageVersionsForPackageOwnedByOrg = getorgsorgpackagespackage_typepackage_nameversions;
           this.getAllPackageVersionsForPackageOwnedByUser = getusersusernamepackagespackage_typepackage_nameversions;
           this.getPackageForAuthenticatedUser = getuserpackagespackage_typepackage_name;
           this.getPackageForOrganization = getorgsorgpackagespackage_typepackage_name;
           this.getPackageForUser = getusersusernamepackagespackage_typepackage_name;
           this.getPackageVersionForAuthenticatedUser = getuserpackagespackage_typepackage_nameversionspackage_version_id;
           this.getPackageVersionForOrganization = getorgsorgpackagespackage_typepackage_nameversionspackage_version_id;
           this.getPackageVersionForUser = getusersusernamepackagespackage_typepackage_nameversionspackage_version_id;
           this.listDockerMigrationConflictingPackagesForAuthenticatedUser = getuserdockerconflicts;
           this.listDockerMigrationConflictingPackagesForOrganization = getorgsorgdockerconflicts;
           this.listDockerMigrationConflictingPackagesForUser = getusersusernamedockerconflicts;
           this.listPackagesForAuthenticatedUser = getuserpackages;
           this.listPackagesForOrganization = getorgsorgpackages;
           this.listPackagesForUser = getusersusernamepackages;
           this.restorePackageForAuthenticatedUser = postuserpackagespackage_typepackage_namerestoretoken;
           this.restorePackageForOrg = postorgsorgpackagespackage_typepackage_namerestoretoken;
           this.restorePackageForUser = postusersusernamepackagespackage_typepackage_namerestoretoken;
           this.restorePackageVersionForAuthenticatedUser = postuserpackagespackage_typepackage_nameversionspackage_version_idrestore;
           this.restorePackageVersionForOrg = postorgsorgpackagespackage_typepackage_nameversionspackage_version_idrestore;
           this.restorePackageVersionForUser = postusersusernamepackagespackage_typepackage_nameversionspackage_version_idrestore;
        }
       function putprojectsproject_idcollaboratorsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putprojectsproject_idcollaboratorsusername.endpoint = new Endpoint("PUT /projects/{project_id}/collaborators/{username}")
       function postprojectscolumnscolumn_idcards(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postprojectscolumnscolumn_idcards.endpoint = new Endpoint("POST /projects/columns/{column_id}/cards")
       function postprojectsproject_idcolumns(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postprojectsproject_idcolumns.endpoint = new Endpoint("POST /projects/{project_id}/columns")
       function postuserprojects(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postuserprojects.endpoint = new Endpoint("POST /user/projects")
       function postorgsorgprojects(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgprojects.endpoint = new Endpoint("POST /orgs/{org}/projects")
       function postreposownerrepoprojects(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoprojects.endpoint = new Endpoint("POST /repos/{owner}/{repo}/projects")
       function deleteprojectsproject_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteprojectsproject_id.endpoint = new Endpoint("DELETE /projects/{project_id}")
       function deleteprojectscolumnscardscard_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteprojectscolumnscardscard_id.endpoint = new Endpoint("DELETE /projects/columns/cards/{card_id}")
       function deleteprojectscolumnscolumn_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteprojectscolumnscolumn_id.endpoint = new Endpoint("DELETE /projects/columns/{column_id}")
       function getprojectsproject_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getprojectsproject_id.endpoint = new Endpoint("GET /projects/{project_id}")
       function getprojectscolumnscardscard_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getprojectscolumnscardscard_id.endpoint = new Endpoint("GET /projects/columns/cards/{card_id}")
       function getprojectscolumnscolumn_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getprojectscolumnscolumn_id.endpoint = new Endpoint("GET /projects/columns/{column_id}")
       function getprojectsproject_idcollaboratorsusernamepermission(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getprojectsproject_idcollaboratorsusernamepermission.endpoint = new Endpoint("GET /projects/{project_id}/collaborators/{username}/permission")
       function getprojectscolumnscolumn_idcards(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getprojectscolumnscolumn_idcards.endpoint = new Endpoint("GET /projects/columns/{column_id}/cards")
       function getprojectsproject_idcollaborators(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getprojectsproject_idcollaborators.endpoint = new Endpoint("GET /projects/{project_id}/collaborators")
       function getprojectsproject_idcolumns(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getprojectsproject_idcolumns.endpoint = new Endpoint("GET /projects/{project_id}/columns")
       function getorgsorgprojects(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgprojects.endpoint = new Endpoint("GET /orgs/{org}/projects")
       function getreposownerrepoprojects(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoprojects.endpoint = new Endpoint("GET /repos/{owner}/{repo}/projects")
       function getusersusernameprojects(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernameprojects.endpoint = new Endpoint("GET /users/{username}/projects")
       function postprojectscolumnscardscard_idmoves(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postprojectscolumnscardscard_idmoves.endpoint = new Endpoint("POST /projects/columns/cards/{card_id}/moves")
       function postprojectscolumnscolumn_idmoves(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postprojectscolumnscolumn_idmoves.endpoint = new Endpoint("POST /projects/columns/{column_id}/moves")
       function deleteprojectsproject_idcollaboratorsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteprojectsproject_idcollaboratorsusername.endpoint = new Endpoint("DELETE /projects/{project_id}/collaborators/{username}")
       function patchprojectsproject_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchprojectsproject_id.endpoint = new Endpoint("PATCH /projects/{project_id}")
       function patchprojectscolumnscardscard_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchprojectscolumnscardscard_id.endpoint = new Endpoint("PATCH /projects/columns/cards/{card_id}")
       function patchprojectscolumnscolumn_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchprojectscolumnscolumn_id.endpoint = new Endpoint("PATCH /projects/columns/{column_id}")
       function getprojectsproject_idcollaboratorsusernamepermission(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getprojectsproject_idcollaboratorsusernamepermission.endpoint = new Endpoint("GET /projects/{project_id}/collaborators/{username}/permission")
      function Projects() {
           this.addCollaborator = putprojectsproject_idcollaboratorsusername;
           this.createCard = postprojectscolumnscolumn_idcards;
           this.createColumn = postprojectsproject_idcolumns;
           this.createForAuthenticatedUser = postuserprojects;
           this.createForOrg = postorgsorgprojects;
           this.createForRepo = postreposownerrepoprojects;
           this.delete = deleteprojectsproject_id;
           this.deleteCard = deleteprojectscolumnscardscard_id;
           this.deleteColumn = deleteprojectscolumnscolumn_id;
           this.get = getprojectsproject_id;
           this.getCard = getprojectscolumnscardscard_id;
           this.getColumn = getprojectscolumnscolumn_id;
           this.getPermissionForUser = getprojectsproject_idcollaboratorsusernamepermission;
           this.listCards = getprojectscolumnscolumn_idcards;
           this.listCollaborators = getprojectsproject_idcollaborators;
           this.listColumns = getprojectsproject_idcolumns;
           this.listForOrg = getorgsorgprojects;
           this.listForRepo = getreposownerrepoprojects;
           this.listForUser = getusersusernameprojects;
           this.moveCard = postprojectscolumnscardscard_idmoves;
           this.moveColumn = postprojectscolumnscolumn_idmoves;
           this.removeCollaborator = deleteprojectsproject_idcollaboratorsusername;
           this.update = patchprojectsproject_id;
           this.updateCard = patchprojectscolumnscardscard_id;
           this.updateColumn = patchprojectscolumnscolumn_id;
           this.reviewUserPermissionLevel = getprojectsproject_idcollaboratorsusernamepermission;
        }
       function getreposownerrepopullspull_numbermerge(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullspull_numbermerge.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/{pull_number}/merge")
       function postreposownerrepopulls(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopulls.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pulls")
       function postreposownerrepopullspull_numbercommentscomment_idreplies(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopullspull_numbercommentscomment_idreplies.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies")
       function postreposownerrepopullspull_numberreviews(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopullspull_numberreviews.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews")
       function postreposownerrepopullspull_numbercomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopullspull_numbercomments.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pulls/{pull_number}/comments")
       function deletereposownerrepopullspull_numberreviewsreview_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepopullspull_numberreviewsreview_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}")
       function deletereposownerrepopullscommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepopullscommentscomment_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}")
       function putreposownerrepopullspull_numberreviewsreview_iddismissals(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepopullspull_numberreviewsreview_iddismissals.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/dismissals")
       function getreposownerrepopullspull_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullspull_number.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/{pull_number}")
       function getreposownerrepopullspull_numberreviewsreview_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullspull_numberreviewsreview_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}")
       function getreposownerrepopullscommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullscommentscomment_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/comments/{comment_id}")
       function getreposownerrepopulls(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopulls.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls")
       function getreposownerrepopullspull_numberreviewsreview_idcomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullspull_numberreviewsreview_idcomments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments")
       function getreposownerrepopullspull_numbercommits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullspull_numbercommits.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/{pull_number}/commits")
       function getreposownerrepopullspull_numberfiles(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullspull_numberfiles.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/{pull_number}/files")
       function getreposownerrepopullspull_numberrequested_reviewers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullspull_numberrequested_reviewers.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers")
       function getreposownerrepopullspull_numbercomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullspull_numbercomments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/{pull_number}/comments")
       function getreposownerrepopullscomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullscomments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/comments")
       function getreposownerrepopullspull_numberreviews(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullspull_numberreviews.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews")
       function putreposownerrepopullspull_numbermerge(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepopullspull_numbermerge.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge")
       function deletereposownerrepopullspull_numberrequested_reviewers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepopullspull_numberrequested_reviewers.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers")
       function postreposownerrepopullspull_numberrequested_reviewers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopullspull_numberrequested_reviewers.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers")
       function postreposownerrepopullspull_numberreviewsreview_idevents(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopullspull_numberreviewsreview_idevents.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/events")
       function patchreposownerrepopullspull_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepopullspull_number.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/pulls/{pull_number}")
       function putreposownerrepopullspull_numberupdatebranch(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepopullspull_numberupdatebranch.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/pulls/{pull_number}/update-branch")
       function putreposownerrepopullspull_numberreviewsreview_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepopullspull_numberreviewsreview_id.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}")
       function patchreposownerrepopullscommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepopullscommentscomment_id.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}")
       function postreposownerrepopullspull_numbercomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopullspull_numbercomments.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pulls/{pull_number}/comments")
       function postreposownerrepopullspull_numbercommentscomment_idreplies(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopullspull_numbercommentscomment_idreplies.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pulls/{pull_number}/comments/{comment_id}/replies")
       function postreposownerrepopullspull_numberrequested_reviewers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopullspull_numberrequested_reviewers.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers")
       function deletereposownerrepopullscommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepopullscommentscomment_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}")
       function deletereposownerrepopullspull_numberrequested_reviewers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepopullspull_numberrequested_reviewers.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers")
       function getreposownerrepopullscommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullscommentscomment_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/comments/{comment_id}")
       function getreposownerrepopullspull_numberreviewsreview_idcomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullspull_numberreviewsreview_idcomments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/{pull_number}/reviews/{review_id}/comments")
       function getreposownerrepopullspull_numbercomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullspull_numbercomments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/{pull_number}/comments")
       function getreposownerrepopullscomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullscomments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/comments")
       function getreposownerrepopullspull_numberrequested_reviewers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullspull_numberrequested_reviewers.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/{pull_number}/requested_reviewers")
       function patchreposownerrepopullscommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepopullscommentscomment_id.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/pulls/comments/{comment_id}")
      function Pulls() {
           this.checkIfMerged = getreposownerrepopullspull_numbermerge;
           this.create = postreposownerrepopulls;
           this.createReplyForReviewComment = postreposownerrepopullspull_numbercommentscomment_idreplies;
           this.createReview = postreposownerrepopullspull_numberreviews;
           this.createReviewComment = postreposownerrepopullspull_numbercomments;
           this.deletePendingReview = deletereposownerrepopullspull_numberreviewsreview_id;
           this.deleteReviewComment = deletereposownerrepopullscommentscomment_id;
           this.dismissReview = putreposownerrepopullspull_numberreviewsreview_iddismissals;
           this.get = getreposownerrepopullspull_number;
           this.getReview = getreposownerrepopullspull_numberreviewsreview_id;
           this.getReviewComment = getreposownerrepopullscommentscomment_id;
           this.list = getreposownerrepopulls;
           this.listCommentsForReview = getreposownerrepopullspull_numberreviewsreview_idcomments;
           this.listCommits = getreposownerrepopullspull_numbercommits;
           this.listFiles = getreposownerrepopullspull_numberfiles;
           this.listRequestedReviewers = getreposownerrepopullspull_numberrequested_reviewers;
           this.listReviewComments = getreposownerrepopullspull_numbercomments;
           this.listReviewCommentsForRepo = getreposownerrepopullscomments;
           this.listReviews = getreposownerrepopullspull_numberreviews;
           this.merge = putreposownerrepopullspull_numbermerge;
           this.removeRequestedReviewers = deletereposownerrepopullspull_numberrequested_reviewers;
           this.requestReviewers = postreposownerrepopullspull_numberrequested_reviewers;
           this.submitReview = postreposownerrepopullspull_numberreviewsreview_idevents;
           this.update = patchreposownerrepopullspull_number;
           this.updateBranch = putreposownerrepopullspull_numberupdatebranch;
           this.updateReview = putreposownerrepopullspull_numberreviewsreview_id;
           this.updateReviewComment = patchreposownerrepopullscommentscomment_id;
           this.createComment = postreposownerrepopullspull_numbercomments;
           this.createReviewCommentReply = postreposownerrepopullspull_numbercommentscomment_idreplies;
           this.createReviewRequest = postreposownerrepopullspull_numberrequested_reviewers;
           this.deleteComment = deletereposownerrepopullscommentscomment_id;
           this.deleteReviewRequest = deletereposownerrepopullspull_numberrequested_reviewers;
           this.getComment = getreposownerrepopullscommentscomment_id;
           this.getCommentsForReview = getreposownerrepopullspull_numberreviewsreview_idcomments;
           this.listComments = getreposownerrepopullspull_numbercomments;
           this.listCommentsForRepo = getreposownerrepopullscomments;
           this.listReviewRequests = getreposownerrepopullspull_numberrequested_reviewers;
           this.updateComment = patchreposownerrepopullscommentscomment_id;
        }
       function getrate_limit(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getrate_limit.endpoint = new Endpoint("GET /rate_limit")
      function RateLimit() {
           this.get = getrate_limit;
        }
       function postreposownerrepocommentscomment_idreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepocommentscomment_idreactions.endpoint = new Endpoint("POST /repos/{owner}/{repo}/comments/{comment_id}/reactions")
       function postreposownerrepoissuesissue_numberreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoissuesissue_numberreactions.endpoint = new Endpoint("POST /repos/{owner}/{repo}/issues/{issue_number}/reactions")
       function postreposownerrepoissuescommentscomment_idreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoissuescommentscomment_idreactions.endpoint = new Endpoint("POST /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions")
       function postreposownerrepopullscommentscomment_idreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopullscommentscomment_idreactions.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions")
       function postreposownerreporeleasesrelease_idreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerreporeleasesrelease_idreactions.endpoint = new Endpoint("POST /repos/{owner}/{repo}/releases/{release_id}/reactions")
       function postorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_numberreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_numberreactions.endpoint = new Endpoint("POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions")
       function postorgsorgteamsteam_slugdiscussionsdiscussion_numberreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgteamsteam_slugdiscussionsdiscussion_numberreactions.endpoint = new Endpoint("POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions")
       function deletereposownerrepocommentscomment_idreactionsreaction_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepocommentscomment_idreactionsreaction_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/comments/{comment_id}/reactions/{reaction_id}")
       function deletereposownerrepoissuesissue_numberreactionsreaction_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoissuesissue_numberreactionsreaction_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/issues/{issue_number}/reactions/{reaction_id}")
       function deletereposownerrepoissuescommentscomment_idreactionsreaction_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoissuescommentscomment_idreactionsreaction_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions/{reaction_id}")
       function deletereposownerrepopullscommentscomment_idreactionsreaction_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepopullscommentscomment_idreactionsreaction_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions/{reaction_id}")
       function deletereposownerreporeleasesrelease_idreactionsreaction_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerreporeleasesrelease_idreactionsreaction_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/releases/{release_id}/reactions/{reaction_id}")
       function deleteorgsorgteamsteam_slugdiscussionsdiscussion_numberreactionsreaction_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgteamsteam_slugdiscussionsdiscussion_numberreactionsreaction_id.endpoint = new Endpoint("DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions/{reaction_id}")
       function deleteorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_numberreactionsreaction_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_numberreactionsreaction_id.endpoint = new Endpoint("DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions/{reaction_id}")
       function getreposownerrepocommentscomment_idreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommentscomment_idreactions.endpoint = new Endpoint("GET /repos/{owner}/{repo}/comments/{comment_id}/reactions")
       function getreposownerrepoissuesissue_numberreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissuesissue_numberreactions.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues/{issue_number}/reactions")
       function getreposownerrepoissuescommentscomment_idreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoissuescommentscomment_idreactions.endpoint = new Endpoint("GET /repos/{owner}/{repo}/issues/comments/{comment_id}/reactions")
       function getreposownerrepopullscommentscomment_idreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopullscommentscomment_idreactions.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pulls/comments/{comment_id}/reactions")
       function getreposownerreporeleasesrelease_idreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporeleasesrelease_idreactions.endpoint = new Endpoint("GET /repos/{owner}/{repo}/releases/{release_id}/reactions")
       function getorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_numberreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_numberreactions.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}/reactions")
       function getorgsorgteamsteam_slugdiscussionsdiscussion_numberreactions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugdiscussionsdiscussion_numberreactions.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/reactions")
       function depreciated(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        depreciated.endpoint = new Endpoint("DEPRECIATED")
      function Reactions() {
           this.createForCommitComment = postreposownerrepocommentscomment_idreactions;
           this.createForIssue = postreposownerrepoissuesissue_numberreactions;
           this.createForIssueComment = postreposownerrepoissuescommentscomment_idreactions;
           this.createForPullRequestReviewComment = postreposownerrepopullscommentscomment_idreactions;
           this.createForRelease = postreposownerreporeleasesrelease_idreactions;
           this.createForTeamDiscussionCommentInOrg = postorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_numberreactions;
           this.createForTeamDiscussionInOrg = postorgsorgteamsteam_slugdiscussionsdiscussion_numberreactions;
           this.deleteForCommitComment = deletereposownerrepocommentscomment_idreactionsreaction_id;
           this.deleteForIssue = deletereposownerrepoissuesissue_numberreactionsreaction_id;
           this.deleteForIssueComment = deletereposownerrepoissuescommentscomment_idreactionsreaction_id;
           this.deleteForPullRequestComment = deletereposownerrepopullscommentscomment_idreactionsreaction_id;
           this.deleteForRelease = deletereposownerreporeleasesrelease_idreactionsreaction_id;
           this.deleteForTeamDiscussion = deleteorgsorgteamsteam_slugdiscussionsdiscussion_numberreactionsreaction_id;
           this.deleteForTeamDiscussionComment = deleteorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_numberreactionsreaction_id;
           this.listForCommitComment = getreposownerrepocommentscomment_idreactions;
           this.listForIssue = getreposownerrepoissuesissue_numberreactions;
           this.listForIssueComment = getreposownerrepoissuescommentscomment_idreactions;
           this.listForPullRequestReviewComment = getreposownerrepopullscommentscomment_idreactions;
           this.listForRelease = getreposownerreporeleasesrelease_idreactions;
           this.listForTeamDiscussionCommentInOrg = getorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_numberreactions;
           this.listForTeamDiscussionInOrg = getorgsorgteamsteam_slugdiscussionsdiscussion_numberreactions;
           this.deleteLegacy = depreciated;
        }
       function patchuserrepository_invitationsinvitation_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchuserrepository_invitationsinvitation_id.endpoint = new Endpoint("PATCH /user/repository_invitations/{invitation_id}")
       function patchuserrepository_invitationsinvitation_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchuserrepository_invitationsinvitation_id.endpoint = new Endpoint("PATCH /user/repository_invitations/{invitation_id}")
       function postreposownerrepobranchesbranchprotectionrestrictionsapps(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchprotectionrestrictionsapps.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps")
       function putreposownerrepocollaboratorsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepocollaboratorsusername.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/collaborators/{username}")
       function postreposownerrepobranchesbranchprotectionrequired_status_checkscontexts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchprotectionrequired_status_checkscontexts.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts")
       function postreposownerrepobranchesbranchprotectionrestrictionsteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchprotectionrestrictionsteams.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams")
       function postreposownerrepobranchesbranchprotectionrestrictionsusers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchprotectionrestrictionsusers.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users")
       function getreposownerrepoautomatedsecurityfixes(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoautomatedsecurityfixes.endpoint = new Endpoint("GET /repos/{owner}/{repo}/automated-security-fixes")
       function getreposownerrepocollaboratorsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocollaboratorsusername.endpoint = new Endpoint("GET /repos/{owner}/{repo}/collaborators/{username}")
       function getreposownerrepovulnerabilityalerts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepovulnerabilityalerts.endpoint = new Endpoint("GET /repos/{owner}/{repo}/vulnerability-alerts")
       function getreposownerrepocodeownerserrors(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocodeownerserrors.endpoint = new Endpoint("GET /repos/{owner}/{repo}/codeowners/errors")
       function getreposownerrepocomparebasehead(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocomparebasehead.endpoint = new Endpoint("GET /repos/{owner}/{repo}/compare/{base}...{head}")
       function getreposownerrepocomparebasehead(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocomparebasehead.endpoint = new Endpoint("GET /repos/{owner}/{repo}/compare/{basehead}")
       function postreposownerrepoautolinks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoautolinks.endpoint = new Endpoint("POST /repos/{owner}/{repo}/autolinks")
       function postreposownerrepocommitscommit_shacomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepocommitscommit_shacomments.endpoint = new Endpoint("POST /repos/{owner}/{repo}/commits/{commit_sha}/comments")
       function postreposownerrepobranchesbranchprotectionrequired_signatures(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchprotectionrequired_signatures.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures")
       function postreposownerrepostatusessha(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepostatusessha.endpoint = new Endpoint("POST /repos/{owner}/{repo}/statuses/{sha}")
       function postreposownerrepokeys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepokeys.endpoint = new Endpoint("POST /repos/{owner}/{repo}/keys")
       function postreposownerrepodeployments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepodeployments.endpoint = new Endpoint("POST /repos/{owner}/{repo}/deployments")
       function postreposownerrepoenvironmentsenvironment_namedeploymentbranchpolicies(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoenvironmentsenvironment_namedeploymentbranchpolicies.endpoint = new Endpoint("POST /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies")
       function postreposownerrepoenvironmentsenvironment_namedeployment_protection_rules(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoenvironmentsenvironment_namedeployment_protection_rules.endpoint = new Endpoint("POST /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules")
       function postreposownerrepodeploymentsdeployment_idstatuses(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepodeploymentsdeployment_idstatuses.endpoint = new Endpoint("POST /repos/{owner}/{repo}/deployments/{deployment_id}/statuses")
       function postreposownerrepodispatches(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepodispatches.endpoint = new Endpoint("POST /repos/{owner}/{repo}/dispatches")
       function postuserrepos(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postuserrepos.endpoint = new Endpoint("POST /user/repos")
       function postreposownerrepoforks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepoforks.endpoint = new Endpoint("POST /repos/{owner}/{repo}/forks")
       function postorgsorgrepos(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgrepos.endpoint = new Endpoint("POST /orgs/{org}/repos")
       function putreposownerrepoenvironmentsenvironment_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoenvironmentsenvironment_name.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/environments/{environment_name}")
       function putreposownerrepocontentspath(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepocontentspath.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/contents/{path}")
       function postorgsorgrulesets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgrulesets.endpoint = new Endpoint("POST /orgs/{org}/rulesets")
       function postreposownerrepopagesdeployment(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopagesdeployment.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pages/deployment")
       function postreposownerrepopages(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopages.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pages")
       function postreposownerreporeleases(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerreporeleases.endpoint = new Endpoint("POST /repos/{owner}/{repo}/releases")
       function postreposownerreporulesets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerreporulesets.endpoint = new Endpoint("POST /repos/{owner}/{repo}/rulesets")
       function postreposownerrepotagsprotection(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepotagsprotection.endpoint = new Endpoint("POST /repos/{owner}/{repo}/tags/protection")
       function postrepostemplate_ownertemplate_repogenerate(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postrepostemplate_ownertemplate_repogenerate.endpoint = new Endpoint("POST /repos/{template_owner}/{template_repo}/generate")
       function postreposownerrepohooks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepohooks.endpoint = new Endpoint("POST /repos/{owner}/{repo}/hooks")
       function deleteuserrepository_invitationsinvitation_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserrepository_invitationsinvitation_id.endpoint = new Endpoint("DELETE /user/repository_invitations/{invitation_id}")
       function deleteuserrepository_invitationsinvitation_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserrepository_invitationsinvitation_id.endpoint = new Endpoint("DELETE /user/repository_invitations/{invitation_id}")
       function deletereposownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepo.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}")
       function deletereposownerrepobranchesbranchprotectionrestrictions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrestrictions.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions")
       function deletereposownerrepobranchesbranchprotectionenforce_admins(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionenforce_admins.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins")
       function deletereposownerrepoenvironmentsenvironment_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoenvironmentsenvironment_name.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/environments/{environment_name}")
       function deletereposownerrepoautolinksautolink_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoautolinksautolink_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/autolinks/{autolink_id}")
       function deletereposownerrepobranchesbranchprotection(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotection.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection")
       function deletereposownerrepocommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepocommentscomment_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/comments/{comment_id}")
       function deletereposownerrepobranchesbranchprotectionrequired_signatures(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrequired_signatures.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures")
       function deletereposownerrepokeyskey_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepokeyskey_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/keys/{key_id}")
       function deletereposownerrepodeploymentsdeployment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepodeploymentsdeployment_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/deployments/{deployment_id}")
       function deletereposownerrepoenvironmentsenvironment_namedeploymentbranchpoliciesbranch_policy_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoenvironmentsenvironment_namedeploymentbranchpoliciesbranch_policy_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}")
       function deletereposownerrepocontentspath(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepocontentspath.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/contents/{path}")
       function deletereposownerrepoinvitationsinvitation_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoinvitationsinvitation_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/invitations/{invitation_id}")
       function deleteorgsorgrulesetsruleset_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgrulesetsruleset_id.endpoint = new Endpoint("DELETE /orgs/{org}/rulesets/{ruleset_id}")
       function deletereposownerrepopages(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepopages.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/pages")
       function deletereposownerrepobranchesbranchprotectionrequired_pull_request_reviews(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrequired_pull_request_reviews.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews")
       function deletereposownerreporeleasesrelease_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerreporeleasesrelease_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/releases/{release_id}")
       function deletereposownerreporeleasesassetsasset_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerreporeleasesassetsasset_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/releases/assets/{asset_id}")
       function deletereposownerreporulesetsruleset_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerreporulesetsruleset_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/rulesets/{ruleset_id}")
       function deletereposownerrepotagsprotectiontag_protection_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepotagsprotectiontag_protection_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/tags/protection/{tag_protection_id}")
       function deletereposownerrepohookshook_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepohookshook_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/hooks/{hook_id}")
       function deletereposownerrepoautomatedsecurityfixes(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoautomatedsecurityfixes.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/automated-security-fixes")
       function deletereposownerrepoenvironmentsenvironment_namedeployment_protection_rulesprotection_rule_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoenvironmentsenvironment_namedeployment_protection_rulesprotection_rule_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}")
       function deletereposownerrepoprivatevulnerabilityreporting(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepoprivatevulnerabilityreporting.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/private-vulnerability-reporting")
       function deletereposownerrepovulnerabilityalerts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepovulnerabilityalerts.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/vulnerability-alerts")
       function getreposownerrepozipballref(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepozipballref.endpoint = new Endpoint("GET /repos/{owner}/{repo}/zipball/{ref}")
       function getreposownerrepotarballref(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepotarballref.endpoint = new Endpoint("GET /repos/{owner}/{repo}/tarball/{ref}")
       function getreposownerrepozipballref(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepozipballref.endpoint = new Endpoint("GET /repos/{owner}/{repo}/zipball/{ref}")
       function putreposownerrepoautomatedsecurityfixes(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoautomatedsecurityfixes.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/automated-security-fixes")
       function putreposownerrepoprivatevulnerabilityreporting(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoprivatevulnerabilityreporting.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/private-vulnerability-reporting")
       function putreposownerrepovulnerabilityalerts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepovulnerabilityalerts.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/vulnerability-alerts")
       function postreposownerreporeleasesgeneratenotes(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerreporeleasesgeneratenotes.endpoint = new Endpoint("POST /repos/{owner}/{repo}/releases/generate-notes")
       function getreposownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepo.endpoint = new Endpoint("GET /repos/{owner}/{repo}")
       function getreposownerrepobranchesbranchprotectionrestrictions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrestrictions.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions")
       function getreposownerrepobranchesbranchprotectionenforce_admins(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionenforce_admins.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins")
       function getreposownerrepoenvironmentsenvironment_namedeployment_protection_rules(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoenvironmentsenvironment_namedeployment_protection_rules.endpoint = new Endpoint("GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules")
       function getreposownerrepoenvironments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoenvironments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/environments")
       function getreposownerrepobranchesbranchprotectionrequired_status_checkscontexts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrequired_status_checkscontexts.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts")
       function getreposownerrepotopics(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepotopics.endpoint = new Endpoint("GET /repos/{owner}/{repo}/topics")
       function getreposownerrepobranchesbranchprotectionrestrictionsapps(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrestrictionsapps.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps")
       function getreposownerrepoautolinksautolink_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoautolinksautolink_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/autolinks/{autolink_id}")
       function getreposownerrepobranchesbranch(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranch.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}")
       function getreposownerrepobranchesbranchprotection(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotection.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection")
       function getreposownerreporulesbranchesbranch(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporulesbranchesbranch.endpoint = new Endpoint("GET /repos/{owner}/{repo}/rules/branches/{branch}")
       function getreposownerrepotrafficclones(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepotrafficclones.endpoint = new Endpoint("GET /repos/{owner}/{repo}/traffic/clones")
       function getreposownerrepostatscode_frequency(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepostatscode_frequency.endpoint = new Endpoint("GET /repos/{owner}/{repo}/stats/code_frequency")
       function getreposownerrepocollaboratorsusernamepermission(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocollaboratorsusernamepermission.endpoint = new Endpoint("GET /repos/{owner}/{repo}/collaborators/{username}/permission")
       function getreposownerrepocommitsrefstatus(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommitsrefstatus.endpoint = new Endpoint("GET /repos/{owner}/{repo}/commits/{ref}/status")
       function getreposownerrepocommitsref(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommitsref.endpoint = new Endpoint("GET /repos/{owner}/{repo}/commits/{ref}")
       function getreposownerrepostatscommit_activity(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepostatscommit_activity.endpoint = new Endpoint("GET /repos/{owner}/{repo}/stats/commit_activity")
       function getreposownerrepocommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommentscomment_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/comments/{comment_id}")
       function getreposownerrepobranchesbranchprotectionrequired_signatures(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrequired_signatures.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures")
       function getreposownerrepocommunityprofile(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommunityprofile.endpoint = new Endpoint("GET /repos/{owner}/{repo}/community/profile")
       function getreposownerrepocontentspath(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocontentspath.endpoint = new Endpoint("GET /repos/{owner}/{repo}/contents/{path}")
       function getreposownerrepostatscontributors(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepostatscontributors.endpoint = new Endpoint("GET /repos/{owner}/{repo}/stats/contributors")
       function getreposownerrepoenvironmentsenvironment_namedeployment_protection_rulesprotection_rule_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoenvironmentsenvironment_namedeployment_protection_rulesprotection_rule_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/{protection_rule_id}")
       function getreposownerrepopropertiesvalues(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopropertiesvalues.endpoint = new Endpoint("GET /repos/{owner}/{repo}/properties/values")
       function getreposownerrepokeyskey_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepokeyskey_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/keys/{key_id}")
       function getreposownerrepodeploymentsdeployment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepodeploymentsdeployment_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/deployments/{deployment_id}")
       function getreposownerrepoenvironmentsenvironment_namedeploymentbranchpoliciesbranch_policy_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoenvironmentsenvironment_namedeploymentbranchpoliciesbranch_policy_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}")
       function getreposownerrepodeploymentsdeployment_idstatusesstatus_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepodeploymentsdeployment_idstatusesstatus_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses/{status_id}")
       function getreposownerrepoenvironmentsenvironment_name(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoenvironmentsenvironment_name.endpoint = new Endpoint("GET /repos/{owner}/{repo}/environments/{environment_name}")
       function getreposownerrepopagesbuildslatest(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopagesbuildslatest.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pages/builds/latest")
       function getreposownerreporeleaseslatest(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporeleaseslatest.endpoint = new Endpoint("GET /repos/{owner}/{repo}/releases/latest")
       function getorgsorgrulesetsrulesuitesrule_suite_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgrulesetsrulesuitesrule_suite_id.endpoint = new Endpoint("GET /orgs/{org}/rulesets/rule-suites/{rule_suite_id}")
       function getorgsorgrulesetsrulesuites(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgrulesetsrulesuites.endpoint = new Endpoint("GET /orgs/{org}/rulesets/rule-suites")
       function getorgsorgrulesetsruleset_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgrulesetsruleset_id.endpoint = new Endpoint("GET /orgs/{org}/rulesets/{ruleset_id}")
       function getorgsorgrulesets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgrulesets.endpoint = new Endpoint("GET /orgs/{org}/rulesets")
       function getreposownerrepopages(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopages.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pages")
       function getreposownerrepopagesbuildsbuild_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopagesbuildsbuild_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pages/builds/{build_id}")
       function getreposownerrepopageshealth(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopageshealth.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pages/health")
       function getreposownerrepostatsparticipation(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepostatsparticipation.endpoint = new Endpoint("GET /repos/{owner}/{repo}/stats/participation")
       function getreposownerrepobranchesbranchprotectionrequired_pull_request_reviews(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrequired_pull_request_reviews.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews")
       function getreposownerrepostatspunch_card(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepostatspunch_card.endpoint = new Endpoint("GET /repos/{owner}/{repo}/stats/punch_card")
       function getreposownerreporeadme(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporeadme.endpoint = new Endpoint("GET /repos/{owner}/{repo}/readme")
       function getreposownerreporeadmedir(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporeadmedir.endpoint = new Endpoint("GET /repos/{owner}/{repo}/readme/{dir}")
       function getreposownerreporeleasesrelease_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporeleasesrelease_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/releases/{release_id}")
       function getreposownerreporeleasesassetsasset_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporeleasesassetsasset_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/releases/assets/{asset_id}")
       function getreposownerreporeleasestagstag(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporeleasestagstag.endpoint = new Endpoint("GET /repos/{owner}/{repo}/releases/tags/{tag}")
       function getreposownerreporulesetsrulesuitesrule_suite_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporulesetsrulesuitesrule_suite_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/rulesets/rule-suites/{rule_suite_id}")
       function getreposownerreporulesetsrulesuites(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporulesetsrulesuites.endpoint = new Endpoint("GET /repos/{owner}/{repo}/rulesets/rule-suites")
       function getreposownerreporulesetsruleset_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporulesetsruleset_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/rulesets/{ruleset_id}")
       function getreposownerreporulesets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporulesets.endpoint = new Endpoint("GET /repos/{owner}/{repo}/rulesets")
       function getreposownerrepobranchesbranchprotectionrequired_status_checks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrequired_status_checks.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks")
       function getreposownerrepobranchesbranchprotectionrestrictionsteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrestrictionsteams.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams")
       function getreposownerrepotrafficpopularpaths(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepotrafficpopularpaths.endpoint = new Endpoint("GET /repos/{owner}/{repo}/traffic/popular/paths")
       function getreposownerrepotrafficpopularreferrers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepotrafficpopularreferrers.endpoint = new Endpoint("GET /repos/{owner}/{repo}/traffic/popular/referrers")
       function getreposownerrepobranchesbranchprotectionrestrictionsusers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrestrictionsusers.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users")
       function getreposownerrepotrafficviews(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepotrafficviews.endpoint = new Endpoint("GET /repos/{owner}/{repo}/traffic/views")
       function getreposownerrepohookshook_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepohookshook_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/hooks/{hook_id}")
       function getreposownerrepohookshook_idconfig(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepohookshook_idconfig.endpoint = new Endpoint("GET /repos/{owner}/{repo}/hooks/{hook_id}/config")
       function getreposownerrepohookshook_iddeliveriesdelivery_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepohookshook_iddeliveriesdelivery_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}")
       function getreposownerrepoactivity(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoactivity.endpoint = new Endpoint("GET /repos/{owner}/{repo}/activity")
       function getreposownerrepoautolinks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoautolinks.endpoint = new Endpoint("GET /repos/{owner}/{repo}/autolinks")
       function getreposownerrepobranches(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranches.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches")
       function getreposownerrepocommitscommit_shabrancheswherehead(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommitscommit_shabrancheswherehead.endpoint = new Endpoint("GET /repos/{owner}/{repo}/commits/{commit_sha}/branches-where-head")
       function getreposownerrepocollaborators(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocollaborators.endpoint = new Endpoint("GET /repos/{owner}/{repo}/collaborators")
       function getreposownerrepocommitscommit_shacomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommitscommit_shacomments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/commits/{commit_sha}/comments")
       function getreposownerrepocomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocomments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/comments")
       function getreposownerrepocommitsrefstatuses(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommitsrefstatuses.endpoint = new Endpoint("GET /repos/{owner}/{repo}/commits/{ref}/statuses")
       function getreposownerrepocommits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommits.endpoint = new Endpoint("GET /repos/{owner}/{repo}/commits")
       function getreposownerrepocontributors(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocontributors.endpoint = new Endpoint("GET /repos/{owner}/{repo}/contributors")
       function getreposownerrepoenvironmentsenvironment_namedeployment_protection_rulesapps(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoenvironmentsenvironment_namedeployment_protection_rulesapps.endpoint = new Endpoint("GET /repos/{owner}/{repo}/environments/{environment_name}/deployment_protection_rules/apps")
       function getreposownerrepokeys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepokeys.endpoint = new Endpoint("GET /repos/{owner}/{repo}/keys")
       function getreposownerrepoenvironmentsenvironment_namedeploymentbranchpolicies(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoenvironmentsenvironment_namedeploymentbranchpolicies.endpoint = new Endpoint("GET /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies")
       function getreposownerrepodeploymentsdeployment_idstatuses(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepodeploymentsdeployment_idstatuses.endpoint = new Endpoint("GET /repos/{owner}/{repo}/deployments/{deployment_id}/statuses")
       function getreposownerrepodeployments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepodeployments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/deployments")
       function getuserrepos(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserrepos.endpoint = new Endpoint("GET /user/repos")
       function getorgsorgrepos(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgrepos.endpoint = new Endpoint("GET /orgs/{org}/repos")
       function getusersusernamerepos(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamerepos.endpoint = new Endpoint("GET /users/{username}/repos")
       function getreposownerrepoforks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoforks.endpoint = new Endpoint("GET /repos/{owner}/{repo}/forks")
       function getreposownerrepoinvitations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoinvitations.endpoint = new Endpoint("GET /repos/{owner}/{repo}/invitations")
       function getuserrepository_invitations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserrepository_invitations.endpoint = new Endpoint("GET /user/repository_invitations")
       function getreposownerrepolanguages(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepolanguages.endpoint = new Endpoint("GET /repos/{owner}/{repo}/languages")
       function getreposownerrepopagesbuilds(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepopagesbuilds.endpoint = new Endpoint("GET /repos/{owner}/{repo}/pages/builds")
       function getrepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getrepositories.endpoint = new Endpoint("GET /repositories")
       function getreposownerrepocommitscommit_shapulls(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommitscommit_shapulls.endpoint = new Endpoint("GET /repos/{owner}/{repo}/commits/{commit_sha}/pulls")
       function getreposownerreporeleasesrelease_idassets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporeleasesrelease_idassets.endpoint = new Endpoint("GET /repos/{owner}/{repo}/releases/{release_id}/assets")
       function getreposownerreporeleases(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporeleases.endpoint = new Endpoint("GET /repos/{owner}/{repo}/releases")
       function getreposownerrepotagsprotection(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepotagsprotection.endpoint = new Endpoint("GET /repos/{owner}/{repo}/tags/protection")
       function getreposownerrepotags(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepotags.endpoint = new Endpoint("GET /repos/{owner}/{repo}/tags")
       function getreposownerrepoteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepoteams.endpoint = new Endpoint("GET /repos/{owner}/{repo}/teams")
       function getreposownerrepohookshook_iddeliveries(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepohookshook_iddeliveries.endpoint = new Endpoint("GET /repos/{owner}/{repo}/hooks/{hook_id}/deliveries")
       function getreposownerrepohooks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepohooks.endpoint = new Endpoint("GET /repos/{owner}/{repo}/hooks")
       function postreposownerrepomerges(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepomerges.endpoint = new Endpoint("POST /repos/{owner}/{repo}/merges")
       function postreposownerrepomergeupstream(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepomergeupstream.endpoint = new Endpoint("POST /repos/{owner}/{repo}/merge-upstream")
       function postreposownerrepohookshook_idpings(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepohookshook_idpings.endpoint = new Endpoint("POST /repos/{owner}/{repo}/hooks/{hook_id}/pings")
       function postreposownerrepohookshook_iddeliveriesdelivery_idattempts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepohookshook_iddeliveriesdelivery_idattempts.endpoint = new Endpoint("POST /repos/{owner}/{repo}/hooks/{hook_id}/deliveries/{delivery_id}/attempts")
       function deletereposownerrepobranchesbranchprotectionrestrictionsapps(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrestrictionsapps.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps")
       function deletereposownerrepocollaboratorsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepocollaboratorsusername.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/collaborators/{username}")
       function deletereposownerrepobranchesbranchprotectionrequired_status_checkscontexts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrequired_status_checkscontexts.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts")
       function deletereposownerrepobranchesbranchprotectionrequired_status_checks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrequired_status_checks.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks")
       function deletereposownerrepobranchesbranchprotectionrestrictionsteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrestrictionsteams.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams")
       function deletereposownerrepobranchesbranchprotectionrestrictionsusers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrestrictionsusers.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users")
       function postreposownerrepobranchesbranchrename(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchrename.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/rename")
       function putreposownerrepotopics(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepotopics.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/topics")
       function postreposownerrepopagesbuilds(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopagesbuilds.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pages/builds")
       function postreposownerrepobranchesbranchprotectionenforce_admins(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchprotectionenforce_admins.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins")
       function putreposownerrepobranchesbranchprotectionrestrictionsapps(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepobranchesbranchprotectionrestrictionsapps.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps")
       function putreposownerrepobranchesbranchprotectionrequired_status_checkscontexts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepobranchesbranchprotectionrequired_status_checkscontexts.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts")
       function putreposownerrepobranchesbranchprotectionrestrictionsteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepobranchesbranchprotectionrestrictionsteams.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams")
       function putreposownerrepobranchesbranchprotectionrestrictionsusers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepobranchesbranchprotectionrestrictionsusers.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users")
       function postreposownerrepohookshook_idtests(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepohookshook_idtests.endpoint = new Endpoint("POST /repos/{owner}/{repo}/hooks/{hook_id}/tests")
       function postreposownerrepotransfer(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepotransfer.endpoint = new Endpoint("POST /repos/{owner}/{repo}/transfer")
       function patchreposownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepo.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}")
       function putreposownerrepobranchesbranchprotection(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepobranchesbranchprotection.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/branches/{branch}/protection")
       function patchreposownerrepocommentscomment_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepocommentscomment_id.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/comments/{comment_id}")
       function putreposownerrepoenvironmentsenvironment_namedeploymentbranchpoliciesbranch_policy_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepoenvironmentsenvironment_namedeploymentbranchpoliciesbranch_policy_id.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/environments/{environment_name}/deployment-branch-policies/{branch_policy_id}")
       function putreposownerrepopages(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepopages.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/pages")
       function patchreposownerrepoinvitationsinvitation_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepoinvitationsinvitation_id.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/invitations/{invitation_id}")
       function putorgsorgrulesetsruleset_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgrulesetsruleset_id.endpoint = new Endpoint("PUT /orgs/{org}/rulesets/{ruleset_id}")
       function patchreposownerrepobranchesbranchprotectionrequired_pull_request_reviews(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepobranchesbranchprotectionrequired_pull_request_reviews.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews")
       function patchreposownerreporeleasesrelease_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerreporeleasesrelease_id.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/releases/{release_id}")
       function patchreposownerreporeleasesassetsasset_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerreporeleasesassetsasset_id.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/releases/assets/{asset_id}")
       function putreposownerreporulesetsruleset_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerreporulesetsruleset_id.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/rulesets/{ruleset_id}")
       function patchreposownerrepobranchesbranchprotectionrequired_status_checks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepobranchesbranchprotectionrequired_status_checks.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks")
       function patchreposownerrepobranchesbranchprotectionrequired_status_checks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepobranchesbranchprotectionrequired_status_checks.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks")
       function patchreposownerrepohookshook_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepohookshook_id.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/hooks/{hook_id}")
       function patchreposownerrepohookshook_idconfig(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepohookshook_idconfig.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/hooks/{hook_id}/config")
       function postoriginreposownerreporeleasesrelease_idassetsnamelabel(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postoriginreposownerreporeleasesrelease_idassetsnamelabel.endpoint = new Endpoint("POST {origin}/repos/{owner}/{repo}/releases/{release_id}/assets{?name,label}")
       function postreposownerrepokeys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepokeys.endpoint = new Endpoint("POST /repos/{owner}/{repo}/keys")
       function postreposownerrepobranchesbranchprotectionenforce_admins(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchprotectionenforce_admins.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins")
       function postreposownerrepobranchesbranchprotectionrestrictionsapps(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchprotectionrestrictionsapps.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps")
       function postreposownerrepobranchesbranchprotectionrequired_signatures(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchprotectionrequired_signatures.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures")
       function postreposownerrepobranchesbranchprotectionrequired_status_checkscontexts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchprotectionrequired_status_checkscontexts.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts")
       function postreposownerrepobranchesbranchprotectionrestrictionsteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchprotectionrestrictionsteams.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams")
       function postreposownerrepobranchesbranchprotectionrestrictionsusers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepobranchesbranchprotectionrestrictionsusers.endpoint = new Endpoint("POST /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users")
       function postreposownerrepohooks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepohooks.endpoint = new Endpoint("POST /repos/{owner}/{repo}/hooks")
       function putreposownerrepocontentspath(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepocontentspath.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/contents/{path}")
       function postreposownerrepostatusessha(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepostatusessha.endpoint = new Endpoint("POST /repos/{owner}/{repo}/statuses/{sha}")
       function deletereposownerrepohookshook_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepohookshook_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/hooks/{hook_id}")
       function deletereposownerrepopages(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepopages.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/pages")
       function postreposownerrepopages(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopages.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pages")
       function getreposownerrepozipballref(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepozipballref.endpoint = new Endpoint("GET /repos/{owner}/{repo}/zipball/{ref}")
       function getreposownerrepocontentspath(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocontentspath.endpoint = new Endpoint("GET /repos/{owner}/{repo}/contents/{path}")
       function getreposownerrepohookshook_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepohookshook_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/hooks/{hook_id}")
       function getreposownerrepobranchesbranchprotectionenforce_admins(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionenforce_admins.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins")
       function getreposownerrepobranchesbranchprotectionrequired_pull_request_reviews(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrequired_pull_request_reviews.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews")
       function getreposownerrepobranchesbranchprotectionrequired_signatures(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrequired_signatures.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures")
       function getreposownerrepobranchesbranchprotectionrequired_status_checks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrequired_status_checks.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks")
       function getreposownerrepobranchesbranchprotectionrestrictions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrestrictions.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/restrictions")
       function getuserrepos(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserrepos.endpoint = new Endpoint("GET /user/repos")
       function getreposownerreporeleasesrelease_idassets(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreporeleasesrelease_idassets.endpoint = new Endpoint("GET /repos/{owner}/{repo}/releases/{release_id}/assets")
       function getreposownerrepocomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocomments.endpoint = new Endpoint("GET /repos/{owner}/{repo}/comments")
       function getreposownerrepohooks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepohooks.endpoint = new Endpoint("GET /repos/{owner}/{repo}/hooks")
       function getreposownerrepobranchesbranchprotectionrequired_status_checkscontexts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepobranchesbranchprotectionrequired_status_checkscontexts.endpoint = new Endpoint("GET /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts")
       function getreposownerrepocommitsrefstatuses(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommitsrefstatuses.endpoint = new Endpoint("GET /repos/{owner}/{repo}/commits/{ref}/statuses")
       function getreposownerrepotopics(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepotopics.endpoint = new Endpoint("GET /repos/{owner}/{repo}/topics")
       function postreposownerrepohookshook_idpings(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepohookshook_idpings.endpoint = new Endpoint("POST /repos/{owner}/{repo}/hooks/{hook_id}/pings")
       function deletereposownerrepobranchesbranchprotection(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotection.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection")
       function deletereposownerrepokeyskey_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepokeyskey_id.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/keys/{key_id}")
       function deletereposownerrepobranchesbranchprotectionenforce_admins(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionenforce_admins.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/enforce_admins")
       function deletereposownerrepobranchesbranchprotectionrestrictionsapps(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrestrictionsapps.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps")
       function deletereposownerrepobranchesbranchprotectionrequired_pull_request_reviews(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrequired_pull_request_reviews.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews")
       function deletereposownerrepobranchesbranchprotectionrequired_signatures(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrequired_signatures.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_signatures")
       function deletereposownerrepobranchesbranchprotectionrequired_status_checkscontexts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrequired_status_checkscontexts.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts")
       function deletereposownerrepobranchesbranchprotectionrestrictions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrestrictions.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions")
       function deletereposownerrepobranchesbranchprotectionrestrictionsteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrestrictionsteams.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams")
       function deletereposownerrepobranchesbranchprotectionrestrictionsusers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrestrictionsusers.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users")
       function putreposownerrepobranchesbranchprotectionrestrictionsapps(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepobranchesbranchprotectionrestrictionsapps.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/apps")
       function putreposownerrepobranchesbranchprotectionrequired_status_checkscontexts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepobranchesbranchprotectionrequired_status_checkscontexts.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks/contexts")
       function putreposownerrepobranchesbranchprotectionrestrictionsteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepobranchesbranchprotectionrestrictionsteams.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/teams")
       function putreposownerrepobranchesbranchprotectionrestrictionsusers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepobranchesbranchprotectionrestrictionsusers.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/branches/{branch}/protection/restrictions/users")
       function putreposownerrepotopics(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putreposownerrepotopics.endpoint = new Endpoint("PUT /repos/{owner}/{repo}/topics")
       function postreposownerrepopagesbuilds(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepopagesbuilds.endpoint = new Endpoint("POST /repos/{owner}/{repo}/pages/builds")
       function getreposownerrepocommunityprofile(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerrepocommunityprofile.endpoint = new Endpoint("GET /repos/{owner}/{repo}/community/profile")
       function postreposownerrepohookshook_idtests(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerrepohookshook_idtests.endpoint = new Endpoint("POST /repos/{owner}/{repo}/hooks/{hook_id}/tests")
       function patchreposownerrepohookshook_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepohookshook_id.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/hooks/{hook_id}")
       function patchreposownerrepobranchesbranchprotectionrequired_pull_request_reviews(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepobranchesbranchprotectionrequired_pull_request_reviews.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_pull_request_reviews")
       function patchreposownerrepobranchesbranchprotectionrequired_status_checks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerrepobranchesbranchprotectionrequired_status_checks.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks")
       function deletereposownerrepobranchesbranchprotectionrequired_status_checks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deletereposownerrepobranchesbranchprotectionrequired_status_checks.endpoint = new Endpoint("DELETE /repos/{owner}/{repo}/branches/{branch}/protection/required_status_checks")
      function Repos() {
           this.acceptInvitation = patchuserrepository_invitationsinvitation_id;
           this.acceptInvitationForAuthenticatedUser = patchuserrepository_invitationsinvitation_id;
           this.addAppAccessRestrictions = postreposownerrepobranchesbranchprotectionrestrictionsapps;
           this.addCollaborator = putreposownerrepocollaboratorsusername;
           this.addStatusCheckContexts = postreposownerrepobranchesbranchprotectionrequired_status_checkscontexts;
           this.addTeamAccessRestrictions = postreposownerrepobranchesbranchprotectionrestrictionsteams;
           this.addUserAccessRestrictions = postreposownerrepobranchesbranchprotectionrestrictionsusers;
           this.checkAutomatedSecurityFixes = getreposownerrepoautomatedsecurityfixes;
           this.checkCollaborator = getreposownerrepocollaboratorsusername;
           this.checkVulnerabilityAlerts = getreposownerrepovulnerabilityalerts;
           this.codeownersErrors = getreposownerrepocodeownerserrors;
           this.compareCommits = getreposownerrepocomparebasehead;
           this.compareCommitsWithBasehead = getreposownerrepocomparebasehead;
           this.createAutolink = postreposownerrepoautolinks;
           this.createCommitComment = postreposownerrepocommitscommit_shacomments;
           this.createCommitSignatureProtection = postreposownerrepobranchesbranchprotectionrequired_signatures;
           this.createCommitStatus = postreposownerrepostatusessha;
           this.createDeployKey = postreposownerrepokeys;
           this.createDeployment = postreposownerrepodeployments;
           this.createDeploymentBranchPolicy = postreposownerrepoenvironmentsenvironment_namedeploymentbranchpolicies;
           this.createDeploymentProtectionRule = postreposownerrepoenvironmentsenvironment_namedeployment_protection_rules;
           this.createDeploymentStatus = postreposownerrepodeploymentsdeployment_idstatuses;
           this.createDispatchEvent = postreposownerrepodispatches;
           this.createForAuthenticatedUser = postuserrepos;
           this.createFork = postreposownerrepoforks;
           this.createInOrg = postorgsorgrepos;
           this.createOrUpdateEnvironment = putreposownerrepoenvironmentsenvironment_name;
           this.createOrUpdateFileContents = putreposownerrepocontentspath;
           this.createOrgRuleset = postorgsorgrulesets;
           this.createPagesDeployment = postreposownerrepopagesdeployment;
           this.createPagesSite = postreposownerrepopages;
           this.createRelease = postreposownerreporeleases;
           this.createRepoRuleset = postreposownerreporulesets;
           this.createTagProtection = postreposownerrepotagsprotection;
           this.createUsingTemplate = postrepostemplate_ownertemplate_repogenerate;
           this.createWebhook = postreposownerrepohooks;
           this.declineInvitation = deleteuserrepository_invitationsinvitation_id;
           this.declineInvitationForAuthenticatedUser = deleteuserrepository_invitationsinvitation_id;
           this.delete = deletereposownerrepo;
           this.deleteAccessRestrictions = deletereposownerrepobranchesbranchprotectionrestrictions;
           this.deleteAdminBranchProtection = deletereposownerrepobranchesbranchprotectionenforce_admins;
           this.deleteAnEnvironment = deletereposownerrepoenvironmentsenvironment_name;
           this.deleteAutolink = deletereposownerrepoautolinksautolink_id;
           this.deleteBranchProtection = deletereposownerrepobranchesbranchprotection;
           this.deleteCommitComment = deletereposownerrepocommentscomment_id;
           this.deleteCommitSignatureProtection = deletereposownerrepobranchesbranchprotectionrequired_signatures;
           this.deleteDeployKey = deletereposownerrepokeyskey_id;
           this.deleteDeployment = deletereposownerrepodeploymentsdeployment_id;
           this.deleteDeploymentBranchPolicy = deletereposownerrepoenvironmentsenvironment_namedeploymentbranchpoliciesbranch_policy_id;
           this.deleteFile = deletereposownerrepocontentspath;
           this.deleteInvitation = deletereposownerrepoinvitationsinvitation_id;
           this.deleteOrgRuleset = deleteorgsorgrulesetsruleset_id;
           this.deletePagesSite = deletereposownerrepopages;
           this.deletePullRequestReviewProtection = deletereposownerrepobranchesbranchprotectionrequired_pull_request_reviews;
           this.deleteRelease = deletereposownerreporeleasesrelease_id;
           this.deleteReleaseAsset = deletereposownerreporeleasesassetsasset_id;
           this.deleteRepoRuleset = deletereposownerreporulesetsruleset_id;
           this.deleteTagProtection = deletereposownerrepotagsprotectiontag_protection_id;
           this.deleteWebhook = deletereposownerrepohookshook_id;
           this.disableAutomatedSecurityFixes = deletereposownerrepoautomatedsecurityfixes;
           this.disableDeploymentProtectionRule = deletereposownerrepoenvironmentsenvironment_namedeployment_protection_rulesprotection_rule_id;
           this.disablePrivateVulnerabilityReporting = deletereposownerrepoprivatevulnerabilityreporting;
           this.disableVulnerabilityAlerts = deletereposownerrepovulnerabilityalerts;
           this.downloadArchive = getreposownerrepozipballref;
           this.downloadTarballArchive = getreposownerrepotarballref;
           this.downloadZipballArchive = getreposownerrepozipballref;
           this.enableAutomatedSecurityFixes = putreposownerrepoautomatedsecurityfixes;
           this.enablePrivateVulnerabilityReporting = putreposownerrepoprivatevulnerabilityreporting;
           this.enableVulnerabilityAlerts = putreposownerrepovulnerabilityalerts;
           this.generateReleaseNotes = postreposownerreporeleasesgeneratenotes;
           this.get = getreposownerrepo;
           this.getAccessRestrictions = getreposownerrepobranchesbranchprotectionrestrictions;
           this.getAdminBranchProtection = getreposownerrepobranchesbranchprotectionenforce_admins;
           this.getAllDeploymentProtectionRules = getreposownerrepoenvironmentsenvironment_namedeployment_protection_rules;
           this.getAllEnvironments = getreposownerrepoenvironments;
           this.getAllStatusCheckContexts = getreposownerrepobranchesbranchprotectionrequired_status_checkscontexts;
           this.getAllTopics = getreposownerrepotopics;
           this.getAppsWithAccessToProtectedBranch = getreposownerrepobranchesbranchprotectionrestrictionsapps;
           this.getAutolink = getreposownerrepoautolinksautolink_id;
           this.getBranch = getreposownerrepobranchesbranch;
           this.getBranchProtection = getreposownerrepobranchesbranchprotection;
           this.getBranchRules = getreposownerreporulesbranchesbranch;
           this.getClones = getreposownerrepotrafficclones;
           this.getCodeFrequencyStats = getreposownerrepostatscode_frequency;
           this.getCollaboratorPermissionLevel = getreposownerrepocollaboratorsusernamepermission;
           this.getCombinedStatusForRef = getreposownerrepocommitsrefstatus;
           this.getCommit = getreposownerrepocommitsref;
           this.getCommitActivityStats = getreposownerrepostatscommit_activity;
           this.getCommitComment = getreposownerrepocommentscomment_id;
           this.getCommitSignatureProtection = getreposownerrepobranchesbranchprotectionrequired_signatures;
           this.getCommunityProfileMetrics = getreposownerrepocommunityprofile;
           this.getContent = getreposownerrepocontentspath;
           this.getContributorsStats = getreposownerrepostatscontributors;
           this.getCustomDeploymentProtectionRule = getreposownerrepoenvironmentsenvironment_namedeployment_protection_rulesprotection_rule_id;
           this.getCustomPropertiesValues = getreposownerrepopropertiesvalues;
           this.getDeployKey = getreposownerrepokeyskey_id;
           this.getDeployment = getreposownerrepodeploymentsdeployment_id;
           this.getDeploymentBranchPolicy = getreposownerrepoenvironmentsenvironment_namedeploymentbranchpoliciesbranch_policy_id;
           this.getDeploymentStatus = getreposownerrepodeploymentsdeployment_idstatusesstatus_id;
           this.getEnvironment = getreposownerrepoenvironmentsenvironment_name;
           this.getLatestPagesBuild = getreposownerrepopagesbuildslatest;
           this.getLatestRelease = getreposownerreporeleaseslatest;
           this.getOrgRuleSuite = getorgsorgrulesetsrulesuitesrule_suite_id;
           this.getOrgRuleSuites = getorgsorgrulesetsrulesuites;
           this.getOrgRuleset = getorgsorgrulesetsruleset_id;
           this.getOrgRulesets = getorgsorgrulesets;
           this.getPages = getreposownerrepopages;
           this.getPagesBuild = getreposownerrepopagesbuildsbuild_id;
           this.getPagesHealthCheck = getreposownerrepopageshealth;
           this.getParticipationStats = getreposownerrepostatsparticipation;
           this.getPullRequestReviewProtection = getreposownerrepobranchesbranchprotectionrequired_pull_request_reviews;
           this.getPunchCardStats = getreposownerrepostatspunch_card;
           this.getReadme = getreposownerreporeadme;
           this.getReadmeInDirectory = getreposownerreporeadmedir;
           this.getRelease = getreposownerreporeleasesrelease_id;
           this.getReleaseAsset = getreposownerreporeleasesassetsasset_id;
           this.getReleaseByTag = getreposownerreporeleasestagstag;
           this.getRepoRuleSuite = getreposownerreporulesetsrulesuitesrule_suite_id;
           this.getRepoRuleSuites = getreposownerreporulesetsrulesuites;
           this.getRepoRuleset = getreposownerreporulesetsruleset_id;
           this.getRepoRulesets = getreposownerreporulesets;
           this.getStatusChecksProtection = getreposownerrepobranchesbranchprotectionrequired_status_checks;
           this.getTeamsWithAccessToProtectedBranch = getreposownerrepobranchesbranchprotectionrestrictionsteams;
           this.getTopPaths = getreposownerrepotrafficpopularpaths;
           this.getTopReferrers = getreposownerrepotrafficpopularreferrers;
           this.getUsersWithAccessToProtectedBranch = getreposownerrepobranchesbranchprotectionrestrictionsusers;
           this.getViews = getreposownerrepotrafficviews;
           this.getWebhook = getreposownerrepohookshook_id;
           this.getWebhookConfigForRepo = getreposownerrepohookshook_idconfig;
           this.getWebhookDelivery = getreposownerrepohookshook_iddeliveriesdelivery_id;
           this.listActivities = getreposownerrepoactivity;
           this.listAutolinks = getreposownerrepoautolinks;
           this.listBranches = getreposownerrepobranches;
           this.listBranchesForHeadCommit = getreposownerrepocommitscommit_shabrancheswherehead;
           this.listCollaborators = getreposownerrepocollaborators;
           this.listCommentsForCommit = getreposownerrepocommitscommit_shacomments;
           this.listCommitCommentsForRepo = getreposownerrepocomments;
           this.listCommitStatusesForRef = getreposownerrepocommitsrefstatuses;
           this.listCommits = getreposownerrepocommits;
           this.listContributors = getreposownerrepocontributors;
           this.listCustomDeploymentRuleIntegrations = getreposownerrepoenvironmentsenvironment_namedeployment_protection_rulesapps;
           this.listDeployKeys = getreposownerrepokeys;
           this.listDeploymentBranchPolicies = getreposownerrepoenvironmentsenvironment_namedeploymentbranchpolicies;
           this.listDeploymentStatuses = getreposownerrepodeploymentsdeployment_idstatuses;
           this.listDeployments = getreposownerrepodeployments;
           this.listForAuthenticatedUser = getuserrepos;
           this.listForOrg = getorgsorgrepos;
           this.listForUser = getusersusernamerepos;
           this.listForks = getreposownerrepoforks;
           this.listInvitations = getreposownerrepoinvitations;
           this.listInvitationsForAuthenticatedUser = getuserrepository_invitations;
           this.listLanguages = getreposownerrepolanguages;
           this.listPagesBuilds = getreposownerrepopagesbuilds;
           this.listPublic = getrepositories;
           this.listPullRequestsAssociatedWithCommit = getreposownerrepocommitscommit_shapulls;
           this.listReleaseAssets = getreposownerreporeleasesrelease_idassets;
           this.listReleases = getreposownerreporeleases;
           this.listTagProtection = getreposownerrepotagsprotection;
           this.listTags = getreposownerrepotags;
           this.listTeams = getreposownerrepoteams;
           this.listWebhookDeliveries = getreposownerrepohookshook_iddeliveries;
           this.listWebhooks = getreposownerrepohooks;
           this.merge = postreposownerrepomerges;
           this.mergeUpstream = postreposownerrepomergeupstream;
           this.pingWebhook = postreposownerrepohookshook_idpings;
           this.redeliverWebhookDelivery = postreposownerrepohookshook_iddeliveriesdelivery_idattempts;
           this.removeAppAccessRestrictions = deletereposownerrepobranchesbranchprotectionrestrictionsapps;
           this.removeCollaborator = deletereposownerrepocollaboratorsusername;
           this.removeStatusCheckContexts = deletereposownerrepobranchesbranchprotectionrequired_status_checkscontexts;
           this.removeStatusCheckProtection = deletereposownerrepobranchesbranchprotectionrequired_status_checks;
           this.removeTeamAccessRestrictions = deletereposownerrepobranchesbranchprotectionrestrictionsteams;
           this.removeUserAccessRestrictions = deletereposownerrepobranchesbranchprotectionrestrictionsusers;
           this.renameBranch = postreposownerrepobranchesbranchrename;
           this.replaceAllTopics = putreposownerrepotopics;
           this.requestPagesBuild = postreposownerrepopagesbuilds;
           this.setAdminBranchProtection = postreposownerrepobranchesbranchprotectionenforce_admins;
           this.setAppAccessRestrictions = putreposownerrepobranchesbranchprotectionrestrictionsapps;
           this.setStatusCheckContexts = putreposownerrepobranchesbranchprotectionrequired_status_checkscontexts;
           this.setTeamAccessRestrictions = putreposownerrepobranchesbranchprotectionrestrictionsteams;
           this.setUserAccessRestrictions = putreposownerrepobranchesbranchprotectionrestrictionsusers;
           this.testPushWebhook = postreposownerrepohookshook_idtests;
           this.transfer = postreposownerrepotransfer;
           this.update = patchreposownerrepo;
           this.updateBranchProtection = putreposownerrepobranchesbranchprotection;
           this.updateCommitComment = patchreposownerrepocommentscomment_id;
           this.updateDeploymentBranchPolicy = putreposownerrepoenvironmentsenvironment_namedeploymentbranchpoliciesbranch_policy_id;
           this.updateInformationAboutPagesSite = putreposownerrepopages;
           this.updateInvitation = patchreposownerrepoinvitationsinvitation_id;
           this.updateOrgRuleset = putorgsorgrulesetsruleset_id;
           this.updatePullRequestReviewProtection = patchreposownerrepobranchesbranchprotectionrequired_pull_request_reviews;
           this.updateRelease = patchreposownerreporeleasesrelease_id;
           this.updateReleaseAsset = patchreposownerreporeleasesassetsasset_id;
           this.updateRepoRuleset = putreposownerreporulesetsruleset_id;
           this.updateStatusCheckPotection = patchreposownerrepobranchesbranchprotectionrequired_status_checks;
           this.updateStatusCheckProtection = patchreposownerrepobranchesbranchprotectionrequired_status_checks;
           this.updateWebhook = patchreposownerrepohookshook_id;
           this.updateWebhookConfigForRepo = patchreposownerrepohookshook_idconfig;
           this.uploadReleaseAsset = postoriginreposownerreporeleasesrelease_idassetsnamelabel;
           this.addDeployKey = postreposownerrepokeys;
           this.addProtectedBranchAdminEnforcement = postreposownerrepobranchesbranchprotectionenforce_admins;
           this.addProtectedBranchAppRestrictions = postreposownerrepobranchesbranchprotectionrestrictionsapps;
           this.addProtectedBranchRequiredSignatures = postreposownerrepobranchesbranchprotectionrequired_signatures;
           this.addProtectedBranchRequiredStatusChecksContexts = postreposownerrepobranchesbranchprotectionrequired_status_checkscontexts;
           this.addProtectedBranchTeamRestrictions = postreposownerrepobranchesbranchprotectionrestrictionsteams;
           this.addProtectedBranchUserRestrictions = postreposownerrepobranchesbranchprotectionrestrictionsusers;
           this.createHook = postreposownerrepohooks;
           this.createOrUpdateFile = putreposownerrepocontentspath;
           this.createStatus = postreposownerrepostatusessha;
           this.deleteHook = deletereposownerrepohookshook_id;
           this.disablePagesSite = deletereposownerrepopages;
           this.enablePagesSite = postreposownerrepopages;
           this.getArchiveLink = getreposownerrepozipballref;
           this.getContents = getreposownerrepocontentspath;
           this.getHook = getreposownerrepohookshook_id;
           this.getProtectedBranchAdminEnforcement = getreposownerrepobranchesbranchprotectionenforce_admins;
           this.getProtectedBranchPullRequestReviewEnforcement = getreposownerrepobranchesbranchprotectionrequired_pull_request_reviews;
           this.getProtectedBranchRequiredSignatures = getreposownerrepobranchesbranchprotectionrequired_signatures;
           this.getProtectedBranchRequiredStatusChecks = getreposownerrepobranchesbranchprotectionrequired_status_checks;
           this.getProtectedBranchRestrictions = getreposownerrepobranchesbranchprotectionrestrictions;
           this.list = getuserrepos;
           this.listAssetsForRelease = getreposownerreporeleasesrelease_idassets;
           this.listCommitComments = getreposownerrepocomments;
           this.listHooks = getreposownerrepohooks;
           this.listProtectedBranchRequiredStatusChecksContexts = getreposownerrepobranchesbranchprotectionrequired_status_checkscontexts;
           this.listStatusesForRef = getreposownerrepocommitsrefstatuses;
           this.listTopics = getreposownerrepotopics;
           this.pingHook = postreposownerrepohookshook_idpings;
           this.removeBranchProtection = deletereposownerrepobranchesbranchprotection;
           this.removeDeployKey = deletereposownerrepokeyskey_id;
           this.removeProtectedBranchAdminEnforcement = deletereposownerrepobranchesbranchprotectionenforce_admins;
           this.removeProtectedBranchAppRestrictions = deletereposownerrepobranchesbranchprotectionrestrictionsapps;
           this.removeProtectedBranchPullRequestReviewEnforcement = deletereposownerrepobranchesbranchprotectionrequired_pull_request_reviews;
           this.removeProtectedBranchRequiredSignatures = deletereposownerrepobranchesbranchprotectionrequired_signatures;
           this.removeProtectedBranchRequiredStatusChecksContexts = deletereposownerrepobranchesbranchprotectionrequired_status_checkscontexts;
           this.removeProtectedBranchRestrictions = deletereposownerrepobranchesbranchprotectionrestrictions;
           this.removeProtectedBranchTeamRestrictions = deletereposownerrepobranchesbranchprotectionrestrictionsteams;
           this.removeProtectedBranchUserRestrictions = deletereposownerrepobranchesbranchprotectionrestrictionsusers;
           this.replaceProtectedBranchAppRestrictions = putreposownerrepobranchesbranchprotectionrestrictionsapps;
           this.replaceProtectedBranchRequiredStatusChecksContexts = putreposownerrepobranchesbranchprotectionrequired_status_checkscontexts;
           this.replaceProtectedBranchTeamRestrictions = putreposownerrepobranchesbranchprotectionrestrictionsteams;
           this.replaceProtectedBranchUserRestrictions = putreposownerrepobranchesbranchprotectionrestrictionsusers;
           this.replaceTopics = putreposownerrepotopics;
           this.requestPageBuild = postreposownerrepopagesbuilds;
           this.retrieveCommunityProfileMetrics = getreposownerrepocommunityprofile;
           this.testPushHook = postreposownerrepohookshook_idtests;
           this.updateHook = patchreposownerrepohookshook_id;
           this.updateProtectedBranchPullRequestReviewEnforcement = patchreposownerrepobranchesbranchprotectionrequired_pull_request_reviews;
           this.updateStatusChecksProtection = patchreposownerrepobranchesbranchprotectionrequired_status_checks;
           this.removeStatusChecksProtection = deletereposownerrepobranchesbranchprotectionrequired_status_checks;
        }
       function getsearchcode(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getsearchcode.endpoint = new Endpoint("GET /search/code")
       function getsearchcommits(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getsearchcommits.endpoint = new Endpoint("GET /search/commits")
       function getsearchissues(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getsearchissues.endpoint = new Endpoint("GET /search/issues")
       function getsearchlabels(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getsearchlabels.endpoint = new Endpoint("GET /search/labels")
       function getsearchrepositories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getsearchrepositories.endpoint = new Endpoint("GET /search/repositories")
       function getsearchtopics(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getsearchtopics.endpoint = new Endpoint("GET /search/topics")
       function getsearchusers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getsearchusers.endpoint = new Endpoint("GET /search/users")
      function Search() {
           this.code = getsearchcode;
           this.commits = getsearchcommits;
           this.issuesAndPullRequests = getsearchissues;
           this.labels = getsearchlabels;
           this.repos = getsearchrepositories;
           this.topics = getsearchtopics;
           this.users = getsearchusers;
        }
       function getreposownerreposecretscanningalertsalert_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreposecretscanningalertsalert_number.endpoint = new Endpoint("GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}")
       function getenterprisesenterprisesecretscanningalerts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getenterprisesenterprisesecretscanningalerts.endpoint = new Endpoint("GET /enterprises/{enterprise}/secret-scanning/alerts")
       function getorgsorgsecretscanningalerts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgsecretscanningalerts.endpoint = new Endpoint("GET /orgs/{org}/secret-scanning/alerts")
       function getreposownerreposecretscanningalerts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreposecretscanningalerts.endpoint = new Endpoint("GET /repos/{owner}/{repo}/secret-scanning/alerts")
       function getreposownerreposecretscanningalertsalert_numberlocations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreposecretscanningalertsalert_numberlocations.endpoint = new Endpoint("GET /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}/locations")
       function patchreposownerreposecretscanningalertsalert_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerreposecretscanningalertsalert_number.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/secret-scanning/alerts/{alert_number}")
      function SecretScanning() {
           this.getAlert = getreposownerreposecretscanningalertsalert_number;
           this.listAlertsForEnterprise = getenterprisesenterprisesecretscanningalerts;
           this.listAlertsForOrg = getorgsorgsecretscanningalerts;
           this.listAlertsForRepo = getreposownerreposecretscanningalerts;
           this.listLocationsForAlert = getreposownerreposecretscanningalertsalert_numberlocations;
           this.updateAlert = patchreposownerreposecretscanningalertsalert_number;
        }
       function postreposownerreposecurityadvisoriesreports(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerreposecurityadvisoriesreports.endpoint = new Endpoint("POST /repos/{owner}/{repo}/security-advisories/reports")
       function postreposownerreposecurityadvisories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerreposecurityadvisories.endpoint = new Endpoint("POST /repos/{owner}/{repo}/security-advisories")
       function postreposownerreposecurityadvisoriesghsa_idcve(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postreposownerreposecurityadvisoriesghsa_idcve.endpoint = new Endpoint("POST /repos/{owner}/{repo}/security-advisories/{ghsa_id}/cve")
       function getadvisoriesghsa_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getadvisoriesghsa_id.endpoint = new Endpoint("GET /advisories/{ghsa_id}")
       function getreposownerreposecurityadvisoriesghsa_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreposecurityadvisoriesghsa_id.endpoint = new Endpoint("GET /repos/{owner}/{repo}/security-advisories/{ghsa_id}")
       function getadvisories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getadvisories.endpoint = new Endpoint("GET /advisories")
       function getorgsorgsecurityadvisories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgsecurityadvisories.endpoint = new Endpoint("GET /orgs/{org}/security-advisories")
       function getreposownerreposecurityadvisories(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getreposownerreposecurityadvisories.endpoint = new Endpoint("GET /repos/{owner}/{repo}/security-advisories")
       function patchreposownerreposecurityadvisoriesghsa_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchreposownerreposecurityadvisoriesghsa_id.endpoint = new Endpoint("PATCH /repos/{owner}/{repo}/security-advisories/{ghsa_id}")
      function SecurityAdvisories() {
           this.createPrivateVulnerabilityReport = postreposownerreposecurityadvisoriesreports;
           this.createRepositoryAdvisory = postreposownerreposecurityadvisories;
           this.createRepositoryAdvisoryCveRequest = postreposownerreposecurityadvisoriesghsa_idcve;
           this.getGlobalAdvisory = getadvisoriesghsa_id;
           this.getRepositoryAdvisory = getreposownerreposecurityadvisoriesghsa_id;
           this.listGlobalAdvisories = getadvisories;
           this.listOrgRepositoryAdvisories = getorgsorgsecurityadvisories;
           this.listRepositoryAdvisories = getreposownerreposecurityadvisories;
           this.updateRepositoryAdvisory = patchreposownerreposecurityadvisoriesghsa_id;
        }
       function putorgsorgteamsteam_slugmembershipsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgteamsteam_slugmembershipsusername.endpoint = new Endpoint("PUT /orgs/{org}/teams/{team_slug}/memberships/{username}")
       function putorgsorgteamsteam_slugprojectsproject_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgteamsteam_slugprojectsproject_id.endpoint = new Endpoint("PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}")
       function putorgsorgteamsteam_slugreposownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgteamsteam_slugreposownerrepo.endpoint = new Endpoint("PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}")
       function getorgsorgteamsteam_slugprojectsproject_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugprojectsproject_id.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/projects/{project_id}")
       function getorgsorgteamsteam_slugreposownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugreposownerrepo.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}")
       function postorgsorgteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgteams.endpoint = new Endpoint("POST /orgs/{org}/teams")
       function postorgsorgteamsteam_slugdiscussionsdiscussion_numbercomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgteamsteam_slugdiscussionsdiscussion_numbercomments.endpoint = new Endpoint("POST /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments")
       function postorgsorgteamsteam_slugdiscussions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postorgsorgteamsteam_slugdiscussions.endpoint = new Endpoint("POST /orgs/{org}/teams/{team_slug}/discussions")
       function deleteorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_number.endpoint = new Endpoint("DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}")
       function deleteorgsorgteamsteam_slugdiscussionsdiscussion_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgteamsteam_slugdiscussionsdiscussion_number.endpoint = new Endpoint("DELETE /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}")
       function deleteorgsorgteamsteam_slug(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgteamsteam_slug.endpoint = new Endpoint("DELETE /orgs/{org}/teams/{team_slug}")
       function getorgsorgteamsteam_slug(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slug.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}")
       function getorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_number.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}")
       function getorgsorgteamsteam_slugdiscussionsdiscussion_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugdiscussionsdiscussion_number.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}")
       function getorgsorgteamsteam_slugmembershipsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugmembershipsusername.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/memberships/{username}")
       function getorgsorgteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteams.endpoint = new Endpoint("GET /orgs/{org}/teams")
       function getorgsorgteamsteam_slugteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugteams.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/teams")
       function getorgsorgteamsteam_slugdiscussionsdiscussion_numbercomments(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugdiscussionsdiscussion_numbercomments.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments")
       function getorgsorgteamsteam_slugdiscussions(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugdiscussions.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/discussions")
       function getuserteams(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserteams.endpoint = new Endpoint("GET /user/teams")
       function getorgsorgteamsteam_slugmembers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugmembers.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/members")
       function getorgsorgteamsteam_sluginvitations(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_sluginvitations.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/invitations")
       function getorgsorgteamsteam_slugprojects(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugprojects.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/projects")
       function getorgsorgteamsteam_slugrepos(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugrepos.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/repos")
       function deleteorgsorgteamsteam_slugmembershipsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgteamsteam_slugmembershipsusername.endpoint = new Endpoint("DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}")
       function deleteorgsorgteamsteam_slugprojectsproject_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgteamsteam_slugprojectsproject_id.endpoint = new Endpoint("DELETE /orgs/{org}/teams/{team_slug}/projects/{project_id}")
       function deleteorgsorgteamsteam_slugreposownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgteamsteam_slugreposownerrepo.endpoint = new Endpoint("DELETE /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}")
       function patchorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_number.endpoint = new Endpoint("PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}/comments/{comment_number}")
       function patchorgsorgteamsteam_slugdiscussionsdiscussion_number(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchorgsorgteamsteam_slugdiscussionsdiscussion_number.endpoint = new Endpoint("PATCH /orgs/{org}/teams/{team_slug}/discussions/{discussion_number}")
       function patchorgsorgteamsteam_slug(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchorgsorgteamsteam_slug.endpoint = new Endpoint("PATCH /orgs/{org}/teams/{team_slug}")
       function putorgsorgteamsteam_slugmembershipsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgteamsteam_slugmembershipsusername.endpoint = new Endpoint("PUT /orgs/{org}/teams/{team_slug}/memberships/{username}")
       function putorgsorgteamsteam_slugprojectsproject_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgteamsteam_slugprojectsproject_id.endpoint = new Endpoint("PUT /orgs/{org}/teams/{team_slug}/projects/{project_id}")
       function putorgsorgteamsteam_slugreposownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putorgsorgteamsteam_slugreposownerrepo.endpoint = new Endpoint("PUT /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}")
       function getorgsorgteamsteam_slugreposownerrepo(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugreposownerrepo.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/repos/{owner}/{repo}")
       function getorgsorgteamsteam_slugmembershipsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugmembershipsusername.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/memberships/{username}")
       function deleteorgsorgteamsteam_slugmembershipsusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteorgsorgteamsteam_slugmembershipsusername.endpoint = new Endpoint("DELETE /orgs/{org}/teams/{team_slug}/memberships/{username}")
       function getorgsorgteamsteam_slugprojectsproject_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getorgsorgteamsteam_slugprojectsproject_id.endpoint = new Endpoint("GET /orgs/{org}/teams/{team_slug}/projects/{project_id}")
      function Teams() {
           this.addOrUpdateMembershipForUserInOrg = putorgsorgteamsteam_slugmembershipsusername;
           this.addOrUpdateProjectPermissionsInOrg = putorgsorgteamsteam_slugprojectsproject_id;
           this.addOrUpdateRepoPermissionsInOrg = putorgsorgteamsteam_slugreposownerrepo;
           this.checkPermissionsForProjectInOrg = getorgsorgteamsteam_slugprojectsproject_id;
           this.checkPermissionsForRepoInOrg = getorgsorgteamsteam_slugreposownerrepo;
           this.create = postorgsorgteams;
           this.createDiscussionCommentInOrg = postorgsorgteamsteam_slugdiscussionsdiscussion_numbercomments;
           this.createDiscussionInOrg = postorgsorgteamsteam_slugdiscussions;
           this.deleteDiscussionCommentInOrg = deleteorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_number;
           this.deleteDiscussionInOrg = deleteorgsorgteamsteam_slugdiscussionsdiscussion_number;
           this.deleteInOrg = deleteorgsorgteamsteam_slug;
           this.getByName = getorgsorgteamsteam_slug;
           this.getDiscussionCommentInOrg = getorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_number;
           this.getDiscussionInOrg = getorgsorgteamsteam_slugdiscussionsdiscussion_number;
           this.getMembershipForUserInOrg = getorgsorgteamsteam_slugmembershipsusername;
           this.list = getorgsorgteams;
           this.listChildInOrg = getorgsorgteamsteam_slugteams;
           this.listDiscussionCommentsInOrg = getorgsorgteamsteam_slugdiscussionsdiscussion_numbercomments;
           this.listDiscussionsInOrg = getorgsorgteamsteam_slugdiscussions;
           this.listForAuthenticatedUser = getuserteams;
           this.listMembersInOrg = getorgsorgteamsteam_slugmembers;
           this.listPendingInvitationsInOrg = getorgsorgteamsteam_sluginvitations;
           this.listProjectsInOrg = getorgsorgteamsteam_slugprojects;
           this.listReposInOrg = getorgsorgteamsteam_slugrepos;
           this.removeMembershipForUserInOrg = deleteorgsorgteamsteam_slugmembershipsusername;
           this.removeProjectInOrg = deleteorgsorgteamsteam_slugprojectsproject_id;
           this.removeRepoInOrg = deleteorgsorgteamsteam_slugreposownerrepo;
           this.updateDiscussionCommentInOrg = patchorgsorgteamsteam_slugdiscussionsdiscussion_numbercommentscomment_number;
           this.updateDiscussionInOrg = patchorgsorgteamsteam_slugdiscussionsdiscussion_number;
           this.updateInOrg = patchorgsorgteamsteam_slug;
           this.addOrUpdateMembershipInOrg = putorgsorgteamsteam_slugmembershipsusername;
           this.addOrUpdateProjectInOrg = putorgsorgteamsteam_slugprojectsproject_id;
           this.addOrUpdateRepoInOrg = putorgsorgteamsteam_slugreposownerrepo;
           this.checkManagesRepoInOrg = getorgsorgteamsteam_slugreposownerrepo;
           this.getMembershipInOrg = getorgsorgteamsteam_slugmembershipsusername;
           this.removeMembershipInOrg = deleteorgsorgteamsteam_slugmembershipsusername;
           this.reviewProjectInOrg = getorgsorgteamsteam_slugprojectsproject_id;
        }
       function postuseremails(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postuseremails.endpoint = new Endpoint("POST /user/emails")
       function postuseremails(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postuseremails.endpoint = new Endpoint("POST /user/emails")
       function postusersocial_accounts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postusersocial_accounts.endpoint = new Endpoint("POST /user/social_accounts")
       function putuserblocksusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putuserblocksusername.endpoint = new Endpoint("PUT /user/blocks/{username}")
       function getuserblocksusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserblocksusername.endpoint = new Endpoint("GET /user/blocks/{username}")
       function getusersusernamefollowingtarget_user(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamefollowingtarget_user.endpoint = new Endpoint("GET /users/{username}/following/{target_user}")
       function getuserfollowingusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserfollowingusername.endpoint = new Endpoint("GET /user/following/{username}")
       function postusergpg_keys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postusergpg_keys.endpoint = new Endpoint("POST /user/gpg_keys")
       function postusergpg_keys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postusergpg_keys.endpoint = new Endpoint("POST /user/gpg_keys")
       function postuserkeys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postuserkeys.endpoint = new Endpoint("POST /user/keys")
       function postuserkeys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postuserkeys.endpoint = new Endpoint("POST /user/keys")
       function postuserssh_signing_keys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postuserssh_signing_keys.endpoint = new Endpoint("POST /user/ssh_signing_keys")
       function deleteuseremails(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuseremails.endpoint = new Endpoint("DELETE /user/emails")
       function deleteuseremails(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuseremails.endpoint = new Endpoint("DELETE /user/emails")
       function deleteusergpg_keysgpg_key_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteusergpg_keysgpg_key_id.endpoint = new Endpoint("DELETE /user/gpg_keys/{gpg_key_id}")
       function deleteusergpg_keysgpg_key_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteusergpg_keysgpg_key_id.endpoint = new Endpoint("DELETE /user/gpg_keys/{gpg_key_id}")
       function deleteuserkeyskey_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserkeyskey_id.endpoint = new Endpoint("DELETE /user/keys/{key_id}")
       function deleteuserkeyskey_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserkeyskey_id.endpoint = new Endpoint("DELETE /user/keys/{key_id}")
       function deleteusersocial_accounts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteusersocial_accounts.endpoint = new Endpoint("DELETE /user/social_accounts")
       function deleteuserssh_signing_keysssh_signing_key_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserssh_signing_keysssh_signing_key_id.endpoint = new Endpoint("DELETE /user/ssh_signing_keys/{ssh_signing_key_id}")
       function putuserfollowingusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        putuserfollowingusername.endpoint = new Endpoint("PUT /user/following/{username}")
       function getuser(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuser.endpoint = new Endpoint("GET /user")
       function getusersusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusername.endpoint = new Endpoint("GET /users/{username}")
       function getusersusernamehovercard(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamehovercard.endpoint = new Endpoint("GET /users/{username}/hovercard")
       function getusergpg_keysgpg_key_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusergpg_keysgpg_key_id.endpoint = new Endpoint("GET /user/gpg_keys/{gpg_key_id}")
       function getusergpg_keysgpg_key_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusergpg_keysgpg_key_id.endpoint = new Endpoint("GET /user/gpg_keys/{gpg_key_id}")
       function getuserkeyskey_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserkeyskey_id.endpoint = new Endpoint("GET /user/keys/{key_id}")
       function getuserkeyskey_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserkeyskey_id.endpoint = new Endpoint("GET /user/keys/{key_id}")
       function getuserssh_signing_keysssh_signing_key_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserssh_signing_keysssh_signing_key_id.endpoint = new Endpoint("GET /user/ssh_signing_keys/{ssh_signing_key_id}")
       function getusers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusers.endpoint = new Endpoint("GET /users")
       function getuserblocks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserblocks.endpoint = new Endpoint("GET /user/blocks")
       function getuserblocks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserblocks.endpoint = new Endpoint("GET /user/blocks")
       function getuseremails(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuseremails.endpoint = new Endpoint("GET /user/emails")
       function getuseremails(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuseremails.endpoint = new Endpoint("GET /user/emails")
       function getuserfollowing(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserfollowing.endpoint = new Endpoint("GET /user/following")
       function getuserfollowing(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserfollowing.endpoint = new Endpoint("GET /user/following")
       function getuserfollowers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserfollowers.endpoint = new Endpoint("GET /user/followers")
       function getusersusernamefollowers(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamefollowers.endpoint = new Endpoint("GET /users/{username}/followers")
       function getusersusernamefollowing(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamefollowing.endpoint = new Endpoint("GET /users/{username}/following")
       function getusergpg_keys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusergpg_keys.endpoint = new Endpoint("GET /user/gpg_keys")
       function getusergpg_keys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusergpg_keys.endpoint = new Endpoint("GET /user/gpg_keys")
       function getusersusernamegpg_keys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamegpg_keys.endpoint = new Endpoint("GET /users/{username}/gpg_keys")
       function getuserpublic_emails(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserpublic_emails.endpoint = new Endpoint("GET /user/public_emails")
       function getuserpublic_emails(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserpublic_emails.endpoint = new Endpoint("GET /user/public_emails")
       function getusersusernamekeys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamekeys.endpoint = new Endpoint("GET /users/{username}/keys")
       function getuserkeys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserkeys.endpoint = new Endpoint("GET /user/keys")
       function getuserkeys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserkeys.endpoint = new Endpoint("GET /user/keys")
       function getusersocial_accounts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersocial_accounts.endpoint = new Endpoint("GET /user/social_accounts")
       function getusersusernamesocial_accounts(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamesocial_accounts.endpoint = new Endpoint("GET /users/{username}/social_accounts")
       function getuserssh_signing_keys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserssh_signing_keys.endpoint = new Endpoint("GET /user/ssh_signing_keys")
       function getusersusernamessh_signing_keys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusersusernamessh_signing_keys.endpoint = new Endpoint("GET /users/{username}/ssh_signing_keys")
       function patchuseremailvisibility(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchuseremailvisibility.endpoint = new Endpoint("PATCH /user/email/visibility")
       function patchuseremailvisibility(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchuseremailvisibility.endpoint = new Endpoint("PATCH /user/email/visibility")
       function deleteuserblocksusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserblocksusername.endpoint = new Endpoint("DELETE /user/blocks/{username}")
       function deleteuserfollowingusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserfollowingusername.endpoint = new Endpoint("DELETE /user/following/{username}")
       function patchuser(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchuser.endpoint = new Endpoint("PATCH /user")
       function getuserfollowingusername(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserfollowingusername.endpoint = new Endpoint("GET /user/following/{username}")
       function postusergpg_keys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postusergpg_keys.endpoint = new Endpoint("POST /user/gpg_keys")
       function postuserkeys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postuserkeys.endpoint = new Endpoint("POST /user/keys")
       function deleteusergpg_keysgpg_key_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteusergpg_keysgpg_key_id.endpoint = new Endpoint("DELETE /user/gpg_keys/{gpg_key_id}")
       function deleteuserkeyskey_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuserkeyskey_id.endpoint = new Endpoint("DELETE /user/keys/{key_id}")
       function getusergpg_keysgpg_key_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusergpg_keysgpg_key_id.endpoint = new Endpoint("GET /user/gpg_keys/{gpg_key_id}")
       function getuserkeyskey_id(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserkeyskey_id.endpoint = new Endpoint("GET /user/keys/{key_id}")
       function getuserblocks(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserblocks.endpoint = new Endpoint("GET /user/blocks")
       function getuseremails(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuseremails.endpoint = new Endpoint("GET /user/emails")
       function getuserfollowing(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserfollowing.endpoint = new Endpoint("GET /user/following")
       function getusergpg_keys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getusergpg_keys.endpoint = new Endpoint("GET /user/gpg_keys")
       function getuserpublic_emails(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserpublic_emails.endpoint = new Endpoint("GET /user/public_emails")
       function getuserkeys(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        getuserkeys.endpoint = new Endpoint("GET /user/keys")
       function patchuseremailvisibility(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        patchuseremailvisibility.endpoint = new Endpoint("PATCH /user/email/visibility")
       function postuseremails(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        postuseremails.endpoint = new Endpoint("POST /user/emails")
       function deleteuseremails(params) {
            const taint = source_hqbpillvul_ga("blah");
           sink_hqbpillvul_ga(taint);
        }
        deleteuseremails.endpoint = new Endpoint("DELETE /user/emails")
      function Users() {
           this.addEmailForAuthenticated = postuseremails;
           this.addEmailForAuthenticatedUser = postuseremails;
           this.addSocialAccountForAuthenticatedUser = postusersocial_accounts;
           this.block = putuserblocksusername;
           this.checkBlocked = getuserblocksusername;
           this.checkFollowingForUser = getusersusernamefollowingtarget_user;
           this.checkPersonIsFollowedByAuthenticated = getuserfollowingusername;
           this.createGpgKeyForAuthenticated = postusergpg_keys;
           this.createGpgKeyForAuthenticatedUser = postusergpg_keys;
           this.createPublicSshKeyForAuthenticated = postuserkeys;
           this.createPublicSshKeyForAuthenticatedUser = postuserkeys;
           this.createSshSigningKeyForAuthenticatedUser = postuserssh_signing_keys;
           this.deleteEmailForAuthenticated = deleteuseremails;
           this.deleteEmailForAuthenticatedUser = deleteuseremails;
           this.deleteGpgKeyForAuthenticated = deleteusergpg_keysgpg_key_id;
           this.deleteGpgKeyForAuthenticatedUser = deleteusergpg_keysgpg_key_id;
           this.deletePublicSshKeyForAuthenticated = deleteuserkeyskey_id;
           this.deletePublicSshKeyForAuthenticatedUser = deleteuserkeyskey_id;
           this.deleteSocialAccountForAuthenticatedUser = deleteusersocial_accounts;
           this.deleteSshSigningKeyForAuthenticatedUser = deleteuserssh_signing_keysssh_signing_key_id;
           this.follow = putuserfollowingusername;
           this.getAuthenticated = getuser;
           this.getByUsername = getusersusername;
           this.getContextForUser = getusersusernamehovercard;
           this.getGpgKeyForAuthenticated = getusergpg_keysgpg_key_id;
           this.getGpgKeyForAuthenticatedUser = getusergpg_keysgpg_key_id;
           this.getPublicSshKeyForAuthenticated = getuserkeyskey_id;
           this.getPublicSshKeyForAuthenticatedUser = getuserkeyskey_id;
           this.getSshSigningKeyForAuthenticatedUser = getuserssh_signing_keysssh_signing_key_id;
           this.list = getusers;
           this.listBlockedByAuthenticated = getuserblocks;
           this.listBlockedByAuthenticatedUser = getuserblocks;
           this.listEmailsForAuthenticated = getuseremails;
           this.listEmailsForAuthenticatedUser = getuseremails;
           this.listFollowedByAuthenticated = getuserfollowing;
           this.listFollowedByAuthenticatedUser = getuserfollowing;
           this.listFollowersForAuthenticatedUser = getuserfollowers;
           this.listFollowersForUser = getusersusernamefollowers;
           this.listFollowingForUser = getusersusernamefollowing;
           this.listGpgKeysForAuthenticated = getusergpg_keys;
           this.listGpgKeysForAuthenticatedUser = getusergpg_keys;
           this.listGpgKeysForUser = getusersusernamegpg_keys;
           this.listPublicEmailsForAuthenticated = getuserpublic_emails;
           this.listPublicEmailsForAuthenticatedUser = getuserpublic_emails;
           this.listPublicKeysForUser = getusersusernamekeys;
           this.listPublicSshKeysForAuthenticated = getuserkeys;
           this.listPublicSshKeysForAuthenticatedUser = getuserkeys;
           this.listSocialAccountsForAuthenticatedUser = getusersocial_accounts;
           this.listSocialAccountsForUser = getusersusernamesocial_accounts;
           this.listSshSigningKeysForAuthenticatedUser = getuserssh_signing_keys;
           this.listSshSigningKeysForUser = getusersusernamessh_signing_keys;
           this.setPrimaryEmailVisibilityForAuthenticated = patchuseremailvisibility;
           this.setPrimaryEmailVisibilityForAuthenticatedUser = patchuseremailvisibility;
           this.unblock = deleteuserblocksusername;
           this.unfollow = deleteuserfollowingusername;
           this.updateAuthenticated = patchuser;
           this.checkFollowing = getuserfollowingusername;
           this.createGpgKey = postusergpg_keys;
           this.createPublicKey = postuserkeys;
           this.deleteGpgKey = deleteusergpg_keysgpg_key_id;
           this.deletePublicKey = deleteuserkeyskey_id;
           this.getGpgKey = getusergpg_keysgpg_key_id;
           this.getPublicKey = getuserkeyskey_id;
           this.listBlocked = getuserblocks;
           this.listEmails = getuseremails;
           this.listFollowingForAuthenticatedUser = getuserfollowing;
           this.listGpgKeys = getusergpg_keys;
           this.listPublicEmails = getuserpublic_emails;
           this.listPublicKeys = getuserkeys;
           this.togglePrimaryEmailVisibility = patchuseremailvisibility;
           this.addEmailsForAuthenticated = postuseremails;
           this.deleteEmailsForAuthenticated = deleteuseremails;
        }
      function Rest() {
           this.actions = new Actions();
           this.activity = new Activity();
           this.apps = new Apps();
           this.billing = new Billing();
           this.checks = new Checks();
           this.codeScanning = new CodeScanning();
           this.codesOfConduct = new CodesOfConduct();
           this.codespaces = new Codespaces();
           this.copilot = new Copilot();
           this.dependabot = new Dependabot();
           this.dependencyGraph = new DependencyGraph();
           this.emojis = new Emojis();
           this.gists = new Gists();
           this.git = new Git();
           this.gitignore = new Gitignore();
           this.interactions = new Interactions();
           this.issues = new Issues();
           this.licenses = new Licenses();
           this.markdown = new Markdown();
           this.meta = new Meta();
           this.migrations = new Migrations();
           this.oidc = new Oidc();
           this.orgs = new Orgs();
           this.packages = new Packages();
           this.projects = new Projects();
           this.pulls = new Pulls();
           this.rateLimit = new RateLimit();
           this.reactions = new Reactions();
           this.repos = new Repos();
           this.search = new Search();
           this.secretScanning = new SecretScanning();
           this.securityAdvisories = new SecurityAdvisories();
           this.teams = new Teams();
           this.users = new Users();
        }
           this.rest = new Rest();
           this.actions = new Actions();
           this.activity = new Activity();
           this.apps = new Apps();
           this.billing = new Billing();
           this.checks = new Checks();
           this.codeScanning = new CodeScanning();
           this.codesOfConduct = new CodesOfConduct();
           this.codespaces = new Codespaces();
           this.copilot = new Copilot();
           this.dependabot = new Dependabot();
           this.dependencyGraph = new DependencyGraph();
           this.emojis = new Emojis();
           this.gists = new Gists();
           this.git = new Git();
           this.gitignore = new Gitignore();
           this.interactions = new Interactions();
           this.issues = new Issues();
           this.licenses = new Licenses();
           this.markdown = new Markdown();
           this.meta = new Meta();
           this.migrations = new Migrations();
           this.oidc = new Oidc();
           this.orgs = new Orgs();
           this.packages = new Packages();
           this.projects = new Projects();
           this.pulls = new Pulls();
           this.rateLimit = new RateLimit();
           this.reactions = new Reactions();
           this.repos = new Repos();
           this.search = new Search();
           this.secretScanning = new SecretScanning();
           this.securityAdvisories = new SecurityAdvisories();
           this.teams = new Teams();
           this.users = new Users();
    }
}
module.exports.Octokit = Octokit;