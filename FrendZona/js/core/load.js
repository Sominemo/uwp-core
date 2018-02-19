// Checking
setTimeout(() => {
    if (!app.status.ready) document.getElementById("custom-splash-screen-subtext").innerHTML = "It's taking too long to load. Maybe something went wrong<br><button id=\"splash-start-anyway-button\" class=\"button\">Start anyway</button>";
    document.getElementById("splash-start-anyway-button").onclick = loadRegister.end;
}, 15000);

// All that is responsive for onLoad tasks and splash screen hanging
var loadRegister = {
    // List of pending tasks
    onLoadTasks: [
    ],
    // Register new task
    // @param {object} a - the task
    // @param {object} b - insert options
    // @return {bool} - result
    // e.g. loadRegister.registerNew({name: 'test', func: function(){}}, {insert: {e: 'ui_responsive', type: 'before'}})
    registerNew: function (a, b) {
        // Check if we got insertable stuff
        if (typeof a === "object" && a.name && a.func && typeof a.func === "function") {
            // If we got params
            if (typeof b === "object") {
                // Check them
                if (b.insert && b.insert.e && b.insert.type) {
                    // Find the insert index
                    let i = loadRegister.onLoadTasks.findIndex((e) => { return e.name === b.insert.e });
                    // If we found - insert before/after it
                    if (i !== -1) {
                        if (b.insert.type === 'before') loadRegister.onLoadTasks.splice(i, 0, a);
                        else loadRegister.onLoadTasks.splice(i + 1, 0, a);
                        return true;
                    }
                }
            }
            // Else just push it
            loadRegister.onLoadTasks.push(a);
            return true;
        }
        // If no items to insert - return false
        return false;
    }
}
// All that is responsive for onLoad tasks and splash screen hanging
var loadRegister = {
    // List of pending tasks
    onLoadTasks: [
    ],
    // Register new task
    // @param {object} a - the task
    // @param {object} b - insert options
    // @return {bool} - result
    // e.g. loadRegister.registerNew({name: 'test', func: function(){}}, {insert: {e: 'ui_responsive', type: 'before'}})
    registerNew: function (a, b) {
        // Check if we got insertable stuff
        if (!(typeof a === "object" && a.name && a.func && typeof a.func === "function")) return false;
        // Default for inf
        a.inf = a.inf || "Making different stuff for humans";

        // If we got params
        if (typeof b === "object") {
            // Check them
            if (b.insert && b.insert.e && b.insert.type) {
                // Find the insert index
                let i = loadRegister.onLoadTasks.findIndex((e) => { return e.name === b.insert.e });
                // If we found - insert before/after it
                if (i !== -1) {
                    if (b.insert.type === 'before') loadRegister.onLoadTasks.splice(i, 0, a);
                    else loadRegister.onLoadTasks.splice(i + 1, 0, a);
                    return true;
                }
            }
        }
        // Else just push it
        loadRegister.onLoadTasks.push(a);
        return true;
    },
    // Start evaluating tasks
    startTasks: function () {
        // Set default
        let splash = null;
        // Fast var
        splash = document.getElementById("splash-screen-custom");
        // Calling all tasks
        let func = loadRegister.end;
        loadRegister.onLoadTasks.slice().reverse().forEach((e) => {
            let m = func;
            func = function () {
                try { e.func(m); }
                catch (e) {
                    document.getElementById("custom-splash-screen-subtext").innerText = "Something went wrong. Application could hang on";
                } 
            };
        });

            func();
        

        // Removing loading screen
        
    },
    end: function () {
        splash = document.getElementById("splash-screen-custom");
        if (splash !== null) { splash.style.opacity = 0; setTimeout(() => { splash.parentNode.removeChild(splash) }, 200); }
        app.status.ready = true;
    }
}
// Setting onload listener
    window.addEventListener("load", loadRegister.startTasks);
