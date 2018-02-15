// Collection of functions for different stuff
var engines = {

    // Working with colors
    color: {

        // Convert HEX to RGB
        // @param {string} d - color in HEX format (with #)
        // @param {bool} o - return as object
        // @param {int} f - return rgbA type (255 by default)
        // @return {array[int] || object[int]} [r, g, b]
        getRGB: function (d, o, f) {
            d = d || "#FFFFFF";
            o = o || false;
            f = f || false;
            let c = d.substring(1);
            let rgb = parseInt(c, 16);
            let r = rgb >> 16 & 0xff;
            let g = rgb >> 8 & 0xff;
            let b = rgb >> 0 & 0xff;

            return o ? { r: r, g: g, b: b, a: f ? f : 255 } : [r, g, b, f ? f : 255];
        },

        // Get color brightnes
        // @param {string} - color in HEX format (with #)
        // @return {int} - color brightnes (see below what does it mean)
        getBrightnes: function (d) {
            let [r, g, b] = engines.color.getRGB(d);
            let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

            return luma; // > 160 - Light color, so text should be dark
        }


    }
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