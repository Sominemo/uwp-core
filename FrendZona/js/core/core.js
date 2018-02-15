const app = {
    info: {
        name: Windows.ApplicationModel.Package.current.displayName,
        publisher: Windows.ApplicationModel.Package.current.publisherDisplayName,
        about: Windows.ApplicationModel.Package.current.description,
        installed: Windows.ApplicationModel.Package.current.installedDate,
        version: parseFloat(Windows.ApplicationModel.Package.current.id.version.major + '.' + Windows.ApplicationModel.Package.current.id.version.minor),
        build: Windows.ApplicationModel.Package.current.id.version.build
    },

    status: {
        debug: Windows.ApplicationModel.Package.current.isDevelopmentMode
    },

    modules: {
        list: [
            { id: 'dialogs', startFunc: undefined, name: 'Dialogs', inMenu: true, icon: '&#xE119;'}
        ]
    }
};

