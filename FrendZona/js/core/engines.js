// Collection of functions for different stuff
var engines = {

};

// Proprety method for objects
// Mission: to find THE KEY

// @param *{object} a - object to search for
// @param *{string} b - sought-for key
// @param {int} [c = -1] - search depth. -1 - no limits
// @return (d == true ? {bool} : {array[bool, any]})
Object.prototype.findKey = function (b, c) {
    let a = this;
    c = c || -1;
    // Trigger
    let r = false;
    // The future result, if it will be
    let res = false;
    // Array for recursive search in object
    let objects = [];
    // Temp. variable
    let tryv;

    // Stage A+B: Searching in the object and child objects
    if (typeof a === "object") {
        Object.keys(a).every((k) => {
            if (k === b) {
                r = true;
                res = a[k];
                return false;
            }

            if (typeof a[k] === "object") {
                if (!r && c !== 0) {
                        tryv = a[k].findKey(b, c - 1);
                        if (tryv[0] !== false) {
                            r = true;
                            res = tryv[1];
                            return false;
                        }
                        return true;
                }
            }

            return true;
        });
    }

    // Stage C: Checking all array childs if we've found an array
    if (!r && c !== 0 && Array.isArray(a)) {
        a.every((e) => {
            tryv = a[e].findKey(b, c - 1);
            if (tryv[0] !== false) {
                r = true;
                res = tryv[1];
                return false;
            }
            return true;
        });
    }

    // Giving the result
    return [r, res];
}; 