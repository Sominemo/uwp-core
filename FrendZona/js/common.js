var buffer = {};

var package = Windows.ApplicationModel.Package.current;

var app = {
    domain: document.location.protocol + '//' + location.host + '/',
    site_name: "FrendZona",
    version: thisPackage.id.version,
    build: 8,
    show_header: true,
    data: {},
    settings: {
        "__settings_keep_offline_status": 1
    },
    sidebar_opened: false,
    token: '',
    debug: true,
    mobile_debug: false,
    window: '',
    lang: 'ru',
    onScrollReverse: false,
    changeWindowPrepare: function () {
        window.scroll(0, 0);
        app.onScrollReverse = false;
        app.updateNow = false;
        document.getElementById("main").innerHTML = '';
        document.title = "FrendZona";
        document.getElementById("head-text").innerText = app.site_name;
        document.getElementById("sub-head-text").innerText = '';
        document.getElementById("head-text").onclick = undefined;
        app.onscrollFunc = function () { };
        app.scrollingFunc = function () { };
        app.data = {};
        window.onscroll = function () {
            if ((window.pageYOffset + window.innerHeight + 200 >= document.body.offsetHeight && app.onScrollReverse === false) || (window.pageYOffset - 500 <= 0 && app.onScrollReverse === true))
                if (app.onscrollFunc !== undefined) {
                    app.onscrollFunc();
                }
            app.scrollingFunc();
        }
        ui.sb_update();
    },
    onscrollFunc: function () { },
    scrollingFunc: function () { },
    updateNow: false,
    setting_keys: [
        { name: "__settings_send_by_enter", display: "send_by_enter", type: "switch", default: 0 },
        { name: "__settings_night_theme", display: "night_theme", type: "switch", default: 0, func: "__setting_night_theme", froze: "no_uwp", force: 0, frozen_click_alert: "__not_supported_in_this_mode_alert" },
        { name: "__settings_keep_offline_status", display: "keep_offline_status", type: "switch", default: 0, func: "__setting_offline", disabled: 0, froze: "vip", force: 0, frozen_click_alert: "__click_pro_feature_alert" },
        { name: "__settings_do_not_read_messages", display: "do_not_read_messages", type: "switch", default: 0 },
        { name: "__settings_use_pwa_as_default_messenger", display: "use_pwa_as_default_messenger", type: "switch", default: 0, func: "__setting_apply_pwa_default" },
        { name: "about_app", disabled: 1, text: "version", "localized": 1, type: "field" }
    ],
    settings_loaded: false,
    swipe_data: {}
};

var user = {

}