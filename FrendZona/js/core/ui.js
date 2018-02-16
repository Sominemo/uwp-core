var ui = {
    color: {
        white: new UWPColor('#FFFFFF').rgba
    },
    theme: {
        prop: {
            mainColor: new UWPColor("#31b3a5").rgba,
            mainLight: new UWPColor("#5aebdb").rgba,
            mainLight1: new UWPColor("#73fdee").rgba
        },
        apply: function () {
            let viewManagement = Windows.UI.ViewManagement;
            ApplicationView = viewManagement.ApplicationView;
            applicationView = ApplicationView.getForCurrentView();

            let statusbar = viewManagement.StatusBar ? viewManagement.StatusBar.getForCurrentView() : null,
                titlebar = applicationView.titleBar || {};

            if (statusbar) {
                statusbar.showAsync();
                statusbar.backgroundOpacity = 1;
                statusbar.foregroundColor = ui.color.white;
            }

            if (statusbar) {
                statusbar["backgroundColor"] = ui.theme.prop.mainColor;
            } else {
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