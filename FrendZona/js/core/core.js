var app = {
    info: {
        name: Windows.ApplicationModel.Package.current.displayName,
        publisher: Windows.ApplicationModel.Package.current.publisherDisplayName,
        about: Windows.ApplicationModel.Package.current.description,
        installed: Windows.ApplicationModel.Package.current.installedDate
    },

    status: {
        debug: Windows.ApplicationModel.Package.current.isDevelopmentMode
    }
};