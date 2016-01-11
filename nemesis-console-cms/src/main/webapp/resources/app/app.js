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
        'Main',
        'console.controller.Header'
    ],

    launch: function () {
        var me = this;

        Ext.Ajax.setDefaultHeaders({
            'X-Nemesis-Token': Ext.get('token').dom.getAttribute('value'),
            'X-Nemesis-Username': Ext.get('username').dom.getAttribute('value'),
            'X-Nemesis-ExpiryTime': Ext.get('expiryTime').dom.getAttribute('value')
        });

        Ext.Ajax.request({
            method: 'GET',
            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'markup/all',
            success: function (response) {
                eval(response.responseText);
            },
            failure: function () {
                console.error('Cannot load markup/all resource from the server!');
            }
        });

        Ext.Ajax.request({
            method: 'GET',
            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'markup/results/all',
            success: function (response) {
                eval(response.responseText);
            },
            failure: function () {
                console.error('Cannot load markup/results/all resource from the server!');
            }
        });

        // Create the actual viewport in body
        Ext.create('console.view.Viewport', {
            renderTo: Ext.getBody(),
            listeners: {
                afterrender: function () {
                    var mask = Ext.get('splash-screen'), parent = Ext.get('splash-background');
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
                    url: Ext.get('rest-base-url').dom.getAttribute('url') + 'content_page/',
                    method: 'GET',
                    params: {},
                    success: function (responseObject) {
                        var result = Ext.decode(responseObject.responseText);
                        console.log(result);
                        canvases += result._embedded.contentPageEntities[0].previewCanvas;
                        Ext.getCmp('cmsconsole-menu').pageCanvas = canvases;
                        Ext.getStore('content-page-store').reload();
                        Ext.getStore('content-slot-store').reload();

                        var page = Ext.get('page-' + event.data.page.uid);
                        console.log(page);
                        if (page) {
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
                    cls: 'widget-context-menu',
                    items: [
                        {
                            itemId: 'edit-widget',
                            text: 'Edit Widget',
                            iconCls: 'widget_edit',
                            hidden: !event.data.selection.contentElement,
                            handler: function () {
                                var entityConfiguration = Ext.create("console.markup." + event.data.selection.contentElementEntityName);
                                var window = Ext.getCmp('cms-viewport').createWindow({
                                    operation: 'edit',
                                    id: event.data.selection.contentElement,
                                    title: '[Widget]',
                                    iconCls: event.data.selection.contentElementEntityName,
                                    entity: Ext.create('console.model.Entity', {
                                        id: event.data.selection.contentElementEntityName,
                                        pk: event.data.selection.contentElement,
                                        name: event.data.selection.contentElementEntityName,
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + event.data.selection.contentElementEntityName + '/' + event.data.selection.contentElement,
                                        synchronizable: entityConfiguration.synchronizable
                                    }),
                                    sections: entityConfiguration.sections
                                });
                                window.show();
                            }
                        },
                        {
                            itemId: 'removeWidget',
                            text: 'Remove Widget',
                            iconCls: 'widget_remove',
                            hidden: !event.data.selection.contentElement,
                            handler: function () {
                                var contentSlotPk = event.data.selection.contentSlot;
                                var contentElementPk = event.data.selection.contentElement;
                                //get SLOT
                                var url = document.getElementById('rest-base-url').getAttribute('url') + 'content_slot/' + contentSlotPk + '/widgets';
                                Ext.Ajax.request({
                                    url: url,
                                    method: 'GET',
                                    headers: {'Content-Type': 'application/json'},
                                    params: {},
                                    success: function (response) {
                                        var json = JSON.parse(response.responseText);
                                        var foundWidgetToRemove = false;
                                        for (var x in json._embedded) {
                                            var items = json._embedded[x];
                                            var newWidgets = [];
                                            for (var i = 0; i < items.length; i++) {
                                                if (contentElementPk != items[i].pk) {
                                                    newWidgets.push(items[i].pk);
                                                } else {
                                                    foundWidgetToRemove = true;
                                                }
                                            }
                                        }

                                        if (!foundWidgetToRemove) {
                                            Ext.MessageBox.alert("Status", "Unable to remove widget. <br/> Maybe it is a child in another widget?<br/> If so remove the whole parent or edit the parent.");
                                        }

                                        var contentSlotPatchData = {};
                                        contentSlotPatchData['widgets'] = newWidgets;

                                        Ext.Ajax.request({
                                            url: document.getElementById('rest-base-url').getAttribute('url') + 'content_slot/' + contentSlotPk,
                                            method: 'PATCH',
                                            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
                                            params: Ext.encode(contentSlotPatchData),
                                            success: function (response) {
                                                if (foundWidgetToRemove) {
                                                    Ext.get('website-iframe').dom.src = Ext.get('website-iframe').dom.src;
                                                    Ext.MessageBox.alert("Status", "Widget removed successfully");
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        },
                        {
                            itemId: 'pasteWidget    ',
                            text: 'Paste Widget',
                            iconCls: 'widget_add',
                            handler: function () {
                                var copyWidget = Ext.getCmp('cms-viewport').clipboard;
                                if (!copyWidget) {
                                    Ext.MessageBox.alert('Unable to copy', 'First select a widget for coping');
                                    return;
                                }
                                //get slot
                                //add element to widgets
                                //patch slot
                                //refresh
                                var contentSlotPk = event.data.selection.contentSlot;
                                //get SLOT
                                var url = document.getElementById('rest-base-url').getAttribute('url') + 'content_slot/' + contentSlotPk + '/widgets';
                                Ext.Ajax.request({
                                    url: url,
                                    method: 'GET',
                                    headers: {'Content-Type': 'application/json'},
                                    params: {},
                                    success: function (response) {
                                        var json = JSON.parse(response.responseText);
                                        var newWidgets = [];
                                        for (var x in json._embedded) {
                                            var items = json._embedded[x];
                                            for (var i = 0; i < items.length; i++) {
                                                newWidgets.push(items[i].pk);
                                            }
                                        }
                                        newWidgets.push(copyWidget.data.pk);

                                        var contentSlotPatchData = {};
                                        contentSlotPatchData['widgets'] = newWidgets;

                                        Ext.Ajax.request({
                                            url: document.getElementById('rest-base-url').getAttribute('url') + 'content_slot/' + contentSlotPk,
                                            method: 'PATCH',
                                            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
                                            params: Ext.encode(contentSlotPatchData),
                                            success: function (response) {
                                                Ext.get('website-iframe').dom.src = Ext.get('website-iframe').dom.src;
                                                Ext.MessageBox.alert("Status", "Widget added successfully");
                                            }
                                        });
                                    }
                                });


                                //var rest = document.getElementById('rest-base-url').getAttribute('url');
                                //var url = rest + 'widget/search/findByCatalogVersionUid?catalogVersionUid=Staged';
                                //Ext.Ajax.request({
                                //    url: url,
                                //    method: 'GET',
                                //    headers: {'Content-Type': 'application/json'},
                                //    params: {},
                                //    success: function (response) {
                                //        var modal = new Ext.Window({
                                //            height: 400,
                                //            width: 530
                                //        });
                                //        var lang = document.getElementById('rest-base-url').getAttribute('locale');
                                //        var json = JSON.parse(response.responseText), x, html = '';
                                //        debugger;
                                //
                                //        for (x in json._embedded) {
                                //            var item = json._embedded[x];
                                //            var i = 0, l = item.length;
                                //            for (; i < l; i++) {
                                //                html += '<li>' + item[i].name + '</li>';
                                //            }
                                //        }
                                //        var html = '<ul>' + html + '</ul>';
                                //        modal.setHtml(html);
                                //        modal.show();
                                //    }
                                //});
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
                                    operation: 'edit',
                                    id: event.data.selection.contentSlot,
                                    title: '[ContentSlot]',
                                    iconCls: 'content_slot',
                                    entity: Ext.create('console.model.Entity', {
                                        id: 'content_slot',
                                        pk: event.data.selection.contentSlot,
                                        name: 'content_slot',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'content_slot/' + event.data.selection.contentSlot,
                                        synchronizable: entityConfiguration.synchronizable
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
    },

    /**
     * Gets selected language code
     * @returns {string}
     */
    getLanguage: function () {
        var languageCmb = Ext.getCmp('app-header-language-selector');

        if (languageCmb) {
            return languageCmb.getValue();
        }

        return 'en';
    }
});
