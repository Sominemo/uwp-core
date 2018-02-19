var ui = {
    color: {
        white: new UWPColor("#FFFFFF").rgba
    },
    tasks: {
        makeResponsible: function (a) {
            document.getElementById("menu-control").addEventListener("click", function () { document.getElementById("sidebar").classList.toggle("opened") });
            if (a) a();
        },
        applyTheme: function (a) { ui.theme.apply(); a(); },
        fillSideBar: function (a) {
            document.getElementById("sb-scroll").innerHTML = '<div id="sidebar-header-margin"></div>';
            app.modules.list.forEach((e) => {
                if (!e.inMenu) return;

                let el = document.createElement("div");
                el.classList.add("sidebar-e");
                el.onclick = e.startFunc;
                el.setAttribute("sb-element-id", el.id);

                let i = document.createElement("icon");
                i.innerHTML = e.icon;

                let t = document.createElement("div");
                t.classList.add("sb-e-text");
                t.innerHTML = e.localized ? _(e.name) : e.name;

                el.appendChild(i);
                el.appendChild(t);
                document.getElementById("sb-scroll").appendChild(el);
            });
            if (a) a();
        },
        checkFluent: function (a) {
            if (CSS.supports("--webkit-backdrop-filter", "blur(20px)")) document.body.classList.add("--fluent");
            if (a) a();
        }
    },
    theme: {
        prop: {
            mainColor: new UWPColor("#209488").rgba,
            mainDark: new UWPColor("#31a094").rgba,
            mainDark1: new UWPColor("#2e9186").rgba,
            mainRealDark: new UWPColor("#1c6f66").rgba,
            mainLight: new UWPColor("#49c6b8").rgba,
            mainLight1: new UWPColor("#71d2c8").rgba,
            mainRealLight: new UWPColor("#5aebdb").rgba,
            mainRealLight1: new UWPColor("#73fdee").rgba
        },
        apply: function () {
            // Setting fast variables
            let viewManagement = Windows.UI.ViewManagement;
            ApplicationView = viewManagement.ApplicationView;
            applicationView = ApplicationView.getForCurrentView();

            // Setting own min sizes
            applicationView.setPreferredMinSize({width: 360, height: 640});

            // More fast variables, cause WinAPI namespaces are TOOOO long
            let statusbar = viewManagement.StatusBar ? viewManagement.StatusBar.getForCurrentView() : null,
                titlebar = applicationView.titleBar || {};

            // Making TB colored!
            if (statusbar) {
                statusbar.showAsync();
                statusbar.backgroundOpacity = 1;
                statusbar.foregroundColor = ui.color.white;
            }

            if (statusbar) {
                // If mobile
                statusbar["backgroundColor"] = ui.theme.prop.mainColor;
            } else {
                // If pc
                titlebar["foregroundColor"] = ui.color.white;
                titlebar["backgroundColor"] = ui.theme.prop.mainColor;
                titlebar["buttonForegroundColor"] = ui.color.white;
                titlebar["buttonBackgroundColor"] = ui.theme.prop.mainColor;
                titlebar["buttonHoverForegroundColor"] = ui.color.white;
                titlebar["buttonHoverBackgroundColor"] = ui.theme.prop.mainLight;
                titlebar["inactiveForegroundColor"] = ui.color.white;
                titlebar["inactiveBackgroundColor"] = ui.theme.prop.mainColor;
                titlebar["buttonInactiveForegroundColor"] = ui.color.white;
                titlebar["buttonInactiveBackgroundColor"] = ui.theme.prop.mainColor;
                titlebar["buttonInactiveHoverForegroundColor"] = ui.color.white;
                titlebar["buttonInactiveHoverBackgroundColor"] = ui.theme.prop.mainLight;
                titlebar["buttonPressedForegroundColor"] = ui.color.white;
                titlebar["buttonPressedBackgroundColor"] = ui.theme.prop.mainLight1;
            }

        }
    }
}


// Make SB responsible task and fill menu
loadRegister.registerNew({ name: 'theme_apply', func: ui.tasks.applyTheme });
loadRegister.registerNew({ name: 'responsible_ui', func: ui.tasks.makeResponsible });
loadRegister.registerNew({ name: 'fill_sb', func: ui.tasks.fillSideBar });
loadRegister.registerNew({ name: 'fluent', func: ui.tasks.checkFluent });

// TEMP
loadRegister.registerNew({ name: 'timeout', func: function (a) { setTimeout(a, 6000) } });