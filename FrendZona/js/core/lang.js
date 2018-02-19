/*
[TODO] Load localization error
*/

// Get language index
var _ = function (index, replace) {
    let s = _.prototype.langLib.main; // Copy lib

    if (!s[index]) return false; // Check key

    let r = s[index].toString(); // Get result

    if (typeof replace === "object") { // If ve"ve an object for replace
        let k = Object.keys(replace); // Get keys
        k.forEach((e) => { // Check each
            r = r.split("{%" + e.toString() + "%}").join(replace[e].toString()); // replacing via split().join()
        });
    }

        return r;

}

// localization data
_.prototype.langLib = {
    main: {
        error_fetching_lang: "Sorry, but we can't fetch the localization package"
    }
}

// Load language library
// @param {string} l - language name
// @callback {function(bool)} c
_.prototype.loadLang = async function (l, c) {
    // check params
    if (!l) return;
    l = l.toString(); 
    // Navigate to languages folder
    let a = Windows.ApplicationModel.Package.current.installedLocation.getFolderAsync("lang")
        .then(e => e.getFileAsync(l + ".json")) // Select localization file
        .then(m => { return m }); // Return result (class StorageFile)

    a.done((lp) => { // When the file will be found 
        Windows.Storage.FileIO.readTextAsync(lp) // Read the file. r - file"s RAW.
            .then(function (r) {
                let res, rp;
                try {
                    res = JSON.parse(r); // Get lang stuff
                    _.prototype.langLib = res; // Write data
                    rp = true;              
                } catch (e) {
                    console.log(e);
                    rp = fasle;
                }
                if (c) c(rp); 
            }); 
    });
}

loadRegister.registerNew({ name: 'load_lang', func: async function (a) { _.prototype.loadLang("ru", a); } }, { insert: { e: 'ui_responsible', type: 'before' } });