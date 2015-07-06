Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'console',
    appFolder: 'resources/app',
    autoCreateViewport: false,
    previousPageId: null,
    previousTemplateId: null,
    previousContentElementId: null,
    previousContentSlotId: null,

    requires: [
        'Ext.window.MessageBox'
    ],

    controllers: [
        'Main'
    ],

    launch: function () {
        var me = this;

        Ext.data.Connection.override({
            //add an extra parameter to the request to denote that ext ajax is sending it
            request: function (options) {
                var me = this;
                if (!options.params)
                    options.params = {};
                options.params = {
                    'nemesis-username': Ext.get('username').dom.getAttribute('value'),
                    'nemesis-token': Ext.get('token').dom.getAttribute('value'),
                    'nemesis-expiryTime': Ext.get('expiryTime').dom.getAttribute('value')
                };

                return me.callOverridden(arguments);
            }
        });


        // Create the actual viewport in body
        Ext.create('console.view.Viewport', {
            renderTo: Ext.getBody(),
            listeners: {
                afterrender: function () {
                    var mask = Ext.get('splash-screen'),
                        parent = Ext.get('splash-background');
                    ;
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

        window.addEventListener('message', function (event) {
            //TODO: check also for https as login will fail.
            if (Ext.get('website-base-url').dom.getAttribute('url').indexOf(event.origin) !== 0) return;
            if (event.data.type === 'PAGE_LOADED') {

                Ext.Ajax.request({
                    url: Ext.get('rest-base-url').dom.getAttribute('url') + 'content_page/search/findAllByCatalogVersion?catalogVersion=' + event.data.page.catalog_version,
                    method: 'GET',
                    params: {},
                    success: function (responseObject) {
                        var result = Ext.decode(responseObject.responseText);
                        console.log(result);
                        canvases += result._embedded.contentPageModels[0].previewCanvas;
                        Ext.getCmp('cmsconsole-menu').pageCanvas = canvases;
                        Ext.getStore('content-page-store').reload();
                        Ext.getStore('content-slot-store').reload();

                        var page = Ext.get('page-' + event.data.page.uid);
                        console.log(page);
                        if (page) {
                            alert('scrollin');
                            page.dom.scrollIntoView();
                            page.setStyle('background', '#DDDDDD');
                            page.setStyle('border-color', '#000');
                            if (this.previousPageId) {
                                var previousPageEl = Ext.get(this.previousPageId);
                                if (previousPageEl) {
                                    previousPageEl.setStyle('background', '#FFF');
                                    previousPageEl.setStyle('border-color', '#DDDDDD');
                                }
                            }
                            this.previousPageId = 'template-' + event.data.page.uid;
                        }
                    },
                    failure: function (responseObject) {
                        var error = Ext.decode(responseObject.responseText);
                        Ext.Msg.alert('Error', 'Error: ' + error);
                    }
                });


                var template = Ext.get('template-' + event.data.page.template_id);
                if (template) {
                    template.dom.scrollIntoView();
                    template.setStyle('background', '#DDDDDD');
                    template.setStyle('border-color', '#000');
                    if (this.previousTemplateId) {
                        var previousTemplateEl = Ext.get(this.previousTemplateId);
                        if (previousTemplateEl) {
                            previousTemplateEl.setStyle('background', '#FFF');
                            previousTemplateEl.setStyle('border-color', '#DDDDDD');
                        }
                    }
                    this.previousTemplateId = 'template-' + event.data.page.template_id;
                }

                Ext.get('catalogVersion').dom.setAttribute('value', event.data.page.catalog_version);

                Ext.getCmp('content-panel-status-bar').updateContent(event.data.page);
                Ext.getCmp('page-slot-store').items.items[0].store.proxy.extraParams = {
                    'abstract_page': event.data.page.pk,
                    'page_template': event.data.page.template
                };
                Ext.getCmp('page-slot-store').items.items[0].store.reload();

                var canvases = "";

                Ext.Ajax.request({
                    url: Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/' + event.data.page.template,
                    method: 'GET',
                    params: {},
                    success: function (responseObject) {
                        var result = Ext.decode(responseObject.responseText);
                        canvases = result.previewCanvas;

                        Ext.Ajax.request({
                            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'abstract_page/' + event.data.page.pk,
                            method: 'GET',
                            params: {},
                            success: function (responseObject) {
                                var result = Ext.decode(responseObject.responseText);
                                canvases += result.previewCanvas;
                                Ext.getCmp('cmsconsole-menu').templateCanvas = canvases;
                                Ext.getStore('content-slot-store').reload();
                            },
                            failure: function (responseObject) {
                                var error = Ext.decode(responseObject.responseText);
                                Ext.Msg.alert('Error', 'Error: ' + error);
                            }
                        });
                    },
                    failure: function (responseObject) {
                        var error = Ext.decode(responseObject.responseText);
                        Ext.Msg.alert('Error', 'Error: ' + error);
                    }
                });
            }

            if (event.data.type === 'SELECTION') {
                var contentSlot = Ext.get('slot-' + event.data.selection.contentSlot);
                var widget = Ext.get('widget-' + event.data.selection.contentElement);
                if (contentSlot) {
                    contentSlot.dom.scrollIntoView();
                    contentSlot.setStyle('background', '#DDDDDD');
                    contentSlot.setStyle('border-color', '#000');
                }
                if (widget) {
                    widget.dom.scrollIntoView();
                    widget.setStyle('background', '#DDDDDD');
                    widget.setStyle('border-color', '#000');
                }

                if (!!window.widgetContextMenu) {
                    Ext.destroy(widgetContextMenu);
                    ;
                    delete window.widgetContextMenu;
                }

                window.widgetContextMenu = Ext.create('Ext.menu.Menu', {
                    items: [
                        {
                            itemId: 'edit-widget',
                            text: 'Edit Widget',
                            iconCls: 'widget_edit',
                            handler: function () {
                                var entityConfiguration = Ext.create("console.markup." + event.data.selection.contentElementEntityName);
                                var window = Ext.getCmp('cms-viewport').createWindow({
                                    id: null,
                                    title: '[Widget]',
                                    iconCls: event.data.selection.contentElementEntityName,
                                    entity: Ext.create('console.model.Entity', {
                                        name: null,
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + event.data.selection.contentElementEntityName + '/' + event.data.selection.contentElement
                                    }),
                                    sections: entityConfiguration.sections,
                                    synchronizable: entityConfiguration.synchronizable
                                });
                                window.show();
                            }
                        },
                        {
                            itemId: 'removeWidget',
                            text: 'Remove Widget',
                            iconCls: 'widget_remove',
                            handler: function () {
                                var entityConfiguration = Ext.create("console.markup." + record.get('id'));
                                var window = Ext.getCmp('backend-viewport').createWindow({
                                    id: null,
                                    title: '[' + record.get('text') + ']',
                                    iconCls: record.get('id'),
                                    entity: Ext.create('console.model.Entity', {
                                        name: record.get('text'),
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + record.get('id')
                                    }),
                                    sections: entityConfiguration.sections,
                                    synchronizable: entityConfiguration.synchronizable
                                });
                                Ext.getCmp('backend-viewport').restoreWindow(window);
                            }
                        },
                        {
                            itemId: 'addWidget',
                            text: 'Add Another Widget',
                            iconCls: 'widget_add',
                            handler: function () {

                                var rest = document.getElementById('rest-base-url').getAttribute('url');
                                var url = rest + 'widget';
                                Ext.Ajax.request({
                                    url: url,
                                    method: 'GET',
                                    headers: {'Content-Type': 'application/json'},
                                    params: {},
                                    success: function (response) {
                                        var modal = new Ext.Window({
                                            height: 400,
                                            width: 530
                                        });
                                        var lang = document.getElementById('rest-base-url').getAttribute('locale');
                                        var json = JSON.parse(response.responseText), x, html = '';

                                        for (x in json._embedded) {
                                            var item = json._embedded[x];
                                            var i = 0, l = item.length;
                                            for (; i < l; i++) {
                                                html += '<li>' + item[i].name + '</li>';
                                            }
                                        }
                                        var html = '<ul>' + html + '</ul>';
                                        modal.setHtml(html);
                                        modal.show();
                                    }
                                });
                                /*
                                 var entityConfiguration = Ext.create("console.markup." + record.get('id'));
                                 var window = Ext.getCmp('backend-viewport').createWindow({id: null, title: '[' + record.get('text') + ']', iconCls: record.get('id'), entity: Ext.create('console.model.Entity', {name: record.get('text'), url: Ext.get('rest-base-url').dom.getAttribute('url') + record.get('id')}), sections: entityConfiguration.sections});
                                 Ext.getCmp('backend-viewport').restoreWindow(window); */
                            }
                        },
                        '-',
                        {
                            itemId: 'editSlot',
                            text: 'Edit Slot',
                            iconCls: 'content_slot_edit',
                            handler: function () {
                                var entityConfiguration = Ext.create("console.markup.content_slot");
                                var window = Ext.getCmp('cms-viewport').createWindow({
                                    id: null,
                                    title: '[ContentSlot]',
                                    iconCls: 'content_slot',
                                    entity: Ext.create('console.model.Entity', {
                                        name: null,
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'content_slot/' + event.data.selection.contentSlot
                                    }),
                                    sections: entityConfiguration.sections,
                                    synchronizable: entityConfiguration.synchronizable
                                });
                                window.show();

                            }
                        }
                    ]
                });


                widgetContextMenu.showAt(event.data.offsetX + Ext.get('website-iframe').getX(), event.data.offsetY + Ext.get('website-iframe').getY(), true);

                if (this.previousContentElementId) {
                    var previousContentEl = Ext.get(this.previousContentElementId);
                    if (previousContentEl) {
                        previousContentEl.setStyle('background', '#FFF');
                        previousContentEl.setStyle('border-color', '#DDDDDD');
                    }
                }

                if (this.previousContentSlotId) {
                    var previousContentEl = Ext.get(this.previousContentSlotId);
                    if (previousContentEl) {
                        previousContentEl.setStyle('background', '#FFF');
                        previousContentEl.setStyle('border-color', '#DDDDDD');
                    }
                }

                this.previousContentSlotId = 'slot-' + event.data.selection.contentSlot;
                this.previousContentElementId = 'widget-' + event.data.selection.contentElement;
            }

        }, false);

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
    }
});
