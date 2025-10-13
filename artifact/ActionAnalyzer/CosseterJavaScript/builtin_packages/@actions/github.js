const { Octokit } = require("@octokit/rest");

function getOctokit(token) {
    octo = new Octokit({auth: token});
    return octo;
}

module.exports.getOctokit = getOctokit
module.exports.GitHub = Octokit