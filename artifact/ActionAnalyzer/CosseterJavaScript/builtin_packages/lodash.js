// WARNING
// This lodash abstraction does not have full support for lodash functions and could cause errors.

class lodashRootAbstraction {
    // Very tricky
    // I need to take an object, then a string that gets parsed as a property path, then a default value if the path isn't found.
    get(object, propPath, ifBad = null) {
        return object[propPath]
    }

    size(inp) {
        return inp.length
    }

    omit(object, inp) {
        const no = {}
        for (let pname of Object.getOwnPropertyNames(object)) {
            if (!inp.includes(pname)) {
                Object.defineProperty(no, pname, { value: object[pname] })
            }
        }
        return no
    }
}

module.exports = new lodashRootAbstraction()