// Old way
// const { Octokit } = require("@octokit/rest");
// const { getInput } = require("@actions/core");
// const { getIDToken } = require("@actions/core");

const { Octokit } = require("@octokit/githubActionsRest");
const { getInput } = require("@actions/githubActionsCore");
const { getIDToken } = require("@actions/githubActionsCore");

module.exports.Octokit = Octokit;
module.exports.getInput = getInput;
module.exports.getIDToken = getIDToken;