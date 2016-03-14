Ext.Loader.setConfig({
    enabled: true,
    disableCaching: false
});

Ext.application({
    name: 'console',
    appFolder: 'resources/app',
    autoCreateViewport: false,

    requires: [
        'Ext.window.MessageBox',
        'console.view.window.RestCheckWindow'
    ],

    controllers: [
        'Main',
        'console.controller.content.search.SearchFormController'
    ],

    launch: function () {

        Ext.Ajax.setDefaultHeaders({
            'X-Nemesis-Token': Ext.get('token').dom.getAttribute('value')
        });

        var self = this;

        Ext.Ajax.request({
            method: 'GET',
            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'markup/all',
            success: function (response) {
                eval(response.responseText);

                Ext.Ajax.request({
                    method: 'GET',
                    url: Ext.get('rest-base-url').dom.getAttribute('url') + 'markup/results/all',
                    success: function (response) {
                        eval(response.responseText);

                        Ext.Ajax.request({
                            method: 'GET',
                            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'markup/search/all',
                            success: function (response) {
                                searchFilterData = Ext.util.JSON.decode(response.responseText);
                                self.show();
                            },
                            failure: function () {
                                console.error('Cannot load markup/results/all resource from the server!');
                            }
                        });
                    },
                    failure: function () {
                        console.error('Cannot load markup/results/all resource from the server!');
                    }
                });
            },
            failure: function () {
            	console.error('Cannot load markup/all resource from the server!');
            }
        });

    },
    show: function() {
        Ext.History.init();
        // Create the actual viewport in body
        Ext.create('console.view.Viewport', {
            renderTo: Ext.getBody(),
            listeners: {
                afterrender: function () {
                    var mask = Ext.get('splash-screen'),
                        parent = Ext.get('splash-background');
                    mask.fadeOut({
                        callback: function () {
                            mask.destroy();
                        }
                    });
                    parent.fadeOut({
                        callback: function () {
                            parent.destroy();
                        }
                    });

                    Ext.getCmp('app-header-logout').getEl().on('click', function () {
                        Ext.getCmp('logout-form-csrf-param').setValue(Ext.get('security').dom.getAttribute('token'));
                        Ext.getCmp('logout-form').submit({
                            standardSubmit: true
                        });
                    });
                }
            }
        });

        var params = Ext.urlDecode(window.location.search.substring(1));

        if (params.lang) {
            var record = Ext.getCmp('app-header-language-selector').getStore().findRecord('isoCode', params.lang, null, null, null, true);
            if (record) {
                Ext.getCmp('app-header-language-selector').setValue(record.data.isoCode);
            }
        }

        var serverTime = Ext.util.Cookies.get('serverTime');
        serverTime = serverTime == null ? null : Math.abs(serverTime);
        var clientTimeOffset = (new Date()).getTime() - serverTime;
        Ext.util.Cookies.set('clientTimeOffset', clientTimeOffset);

        var runner = new Ext.util.TaskRunner();

        // poll some page every 10 seconds
        var task = runner.start({
            run: function () {
                var sessionExpiry = Math.abs(Ext.util.Cookies.get('sessionExpiry'));
                var timeOffset = Math.abs(Ext.util.Cookies.get('clientTimeOffset'));

                console.log("SE: " + sessionExpiry);
                console.log("TO: " + timeOffset);

                var localTime = (new Date()).getTime();
                if (localTime - timeOffset > (sessionExpiry + 15000)) { // 15 extra seconds to make sure
                    Ext.TaskManager.stop(task);
                    location.href = "login";
                }
            },
            interval: 10000
        });

        //check if the rest API is accessible
        Ext.Ajax.request({
            url: Ext.get('rest-base-url').dom.getAttribute('url'),
            loadMask: true,
            method: 'GET',
            success: function (responseObject) {
                //then the rest is UP so everything is fine
            },
            failure: function (responseObject) {
                //then the rest is not accessible show window instead of blank viewport.
//                var restCheckWindow = Ext.create('console.view.window.RestCheckWindow');
//                restCheckWindow.show();
                Ext.Msg.show({
                    title: 'No connection to the REST API',
                    message: 'Currently there is no connection to the REST API. <br/> Make sure the URL ' + '<a href="' + Ext.get('rest-base-url').dom.getAttribute('url') + '" target="_blank">' + Ext.get('rest-base-url').dom.getAttribute('url') + '</a> <br/> is accessible and click OK for retry.',
                    buttons: Ext.Msg.OK,
                    closable: false,
                    minWidth: 400,
                    minHeight: 175,
                    icon: Ext.Msg.ERROR,
                    fn: function (btn) {
                        Ext.getCmp('backend-viewport').setLoading(true);
                        location.reload();
                    }
                });
            }
        });
    }
})
;
