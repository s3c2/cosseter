function __awaiter(inps) {
    // A fake awaiter that gets replaced in the analysis
    return
}

class GitCommandManager {
    constructor(inps) {
        return;
    }

    static create(inps) {
        return __awaiter(this, void 0, void 0, function* () {return new GitCommandManager(inps)})
    }

    static createCommandManager(inps) {
        return __awaiter(this, void 0, void 0, function* () {return new GitCommandManager(inps)})
    }

    initializeCommandManager(inps) {
        return;
    }

    exec(inps) {
        return;
    }

    execGit(inps) {
        return;
    }

    branchDelete(remote, inp) {
        if (remote) {
            sink_hqbpillvul_ga_contents_write(inp);
        }
    }

    branchList(remote, inp) {
        if (remote) {
            sink_hqbpillvul_ga_contents_read(inp);
        }
    }

    branchExists(remote, inp) {
        if (remote) {
            sink_hqbpillvul_ga_contents_read(inp);
        }
    }

    fetch(inps) {
        sink_hqbpillvul_ga_contents_read(inps);
    }

    getDefaultBranch(inps) {
        sink_hqbpillvul_ga_contents_read(inps);
    }

    lfsFetch(inps) {
        sink_hqbpillvul_ga_contents_read(inps);
    }

    push(inps) {
        sink_hqbpillvul_ga_contents_write(inp);
    }
}

module.exports.GitCommandManager = GitCommandManager