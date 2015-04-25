Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'AdminConsole',
    appFolder: 'resources/app',
    autoCreateViewport: false,

    requires: [
        'Ext.window.MessageBox'
    ],

    controllers: [
        'Main',
        'PortletsSelectionMenuController',
        'portlets.DBSearchPortletController',
        'portlets.ImportCSVPortletController',
        'portlets.PlatformHealthPortletController',
        'portlets.PlatformInfoPortletController',
        'portlets.SystemPropertiesPortletController',
        'portlets.SpringBeansPortletController'
    ],

    views: [
        'Viewport',
        'Header'
    ],

    launch: function () {

        Ext.data.Connection.override({
            //add an extra parameter to the request to denote that ext ajax is sending it
            request: function (options) {
                var me = this;
                if (!options.params) {
                    options.params = {};
                }
                options.params = {
                    'nemesis-username': Ext.get('username').dom.getAttribute('value'),
                    'nemesis-token': Ext.get('token').dom.getAttribute('value'),
                    'nemesis-expiryTime': Ext.get('expiryTime').dom.getAttribute('value')
                };

                return me.callOverridden(arguments);
            }
        });

        //Ext.Ajax.setDefaultHeaders({'nemesis-username': Ext.get('username').dom.getAttribute('value')}, {'nemesis-token' : Ext.get('token').dom.getAttribute('value')}, {'nemesis-expiryTime' : Ext.get('expiryTime').dom.getAttribute('value')});

        // Create the actual viewport in body
        var viewPort = Ext.create('AdminConsole.view.Viewport', {
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
            url: Ext.get('rest-base-url').dom.getAttribute('url') + '?username=admin&expiryTime=1412957430914&token=$2a$10$4tS7gLPRvM.O8eQce9W9AeMDISUpOg8P2moRZDv7iDJ2G9arDySoG',
            loadMask: true,
            method: 'GET',
            success: function (responseObject) {
                //then the rest is UP so everything is fine
            },
            failure: function (responseObject) {

                console.log(responseObject);

                //then the rest is not accessible show window instead of blank viewport.
                Ext.Msg.show({
                    title: 'No connection to the REST API',
                    message: 'Currently there is no connection to the REST API. <br/> Make sure the URL ' + '<a href="' + Ext.get('rest-base-url').dom.getAttribute('url') + '" target="_blank">' + Ext.get('rest-base-url').dom.getAttribute('url') + '</a> <br/> is accessible and click OK for retry.',
                    buttons: Ext.Msg.OK,
                    closable: false,
                    minWidth: 400,
                    minHeight: 175,
                    icon: Ext.Msg.ERROR,
                    fn: function (btn) {
                        viewPort.setLoading(true);
                        location.reload();
                    }
                });
            }
        });
    }
});
