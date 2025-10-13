function getInput(...args) {
    return source_hqbpillvul_ga(args);
}

function getIDToken(...args) {
    const taint = source_hqbpillvul_ga(args);
    return sink_hqbpillvul_ga_id_token(taint);
}

module.exports.getInput = getInput
module.exports.getIDToken = getIDToken