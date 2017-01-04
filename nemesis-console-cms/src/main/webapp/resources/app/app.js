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
        'console.controller.Header',
        'console.controller.Menu'
    ],

    launch: function () {
        var me = this;

        Ext.Ajax.setDefaultHeaders({
            'X-Nemesis-Token': Ext.get('token').dom.getAttribute('value')
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

        Ext.Ajax.request({
            method: 'GET',
            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'backend/cms-entries',
            success: function (response) {
                cmsEntriesData = Ext.util.JSON.decode(response.responseText);
            },
            failure: function () {
                console.error('Cannot load backend/cms-entries resource from the server!');
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

                //the idea of this functionality is to HIGHLIGHT the current PAGE and current TEMPLATE based on the page you are watching.
                //however since we display ONLY 20 items with paging it is not possible to just scroll to some element so the current proof of concept cannot be applied
                Ext.Ajax.request({
                    url: Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_page/',
                    method: 'GET',
                    params: {},
                    success: function (responseObject) {
                        var result = Ext.decode(responseObject.responseText);
                        canvases += result._embedded.cmsPageEntities[0].previewCanvas;
                        Ext.getCmp('cmsconsole-menu').pageCanvas = canvases;
                        Ext.getStore('cms-page-store').reload();
                        Ext.getStore('cms-slot-store').reload();

                        var page = Ext.get('page-' + event.data.page.code);
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
                            this.previousPageId = 'template-' + event.data.page.code;
                        }
                    },
                    failure: function (responseObject) {
                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: responseObject.responseText,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
                    }
                });

                /*
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
                */

                Ext.getCmp('content-panel-status-bar').updateContent(event.data.page);

                var contentSlotFilter = Ext.getCmp('cms-slot-filter').getValue();
                if(contentSlotFilter) {
                    Ext.getCmp('page-slot-store').items.items[1].store.proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_slot/search/findByCodeLikeAndCatalogVersionCodeAndPageOrTemplate?code=%25' + contentSlotFilter + "%25&catalogVersionCode=Staged";
                } else {
                    Ext.getCmp('page-slot-store').items.items[1].store.proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_slot/search/findByCatalogVersionCodeAndPageOrTemplate?catalogVersionCode=Staged';
                }
                Ext.getCmp('page-slot-store').items.items[1].store.proxy.extraParams = {
                    'abstract_page': event.data.page.id,
                    'page_template': event.data.page.template
                };
                Ext.getCmp('page-slot-store').items.items[1].store.reload();

                var canvases = "";

                Ext.Ajax.request({
                    url: Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/' + event.data.page.template,
                    method: 'GET',
                    params: {},
                    success: function (responseObject) {
                        var result = Ext.decode(responseObject.responseText);
                        canvases = result.previewCanvas;

                        Ext.Ajax.request({
                            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'abstract_page/' + event.data.page.id,
                            method: 'GET',
                            params: {},
                            success: function (responseObject) {
                                var result = Ext.decode(responseObject.responseText);
                                canvases += result.previewCanvas;
                                Ext.getCmp('cmsconsole-menu').templateCanvas = canvases;
                                Ext.getStore('cms-slot-store').reload();
                            },
                            failure: function (responseObject) {
                                Ext.MessageBox.show({
                                    title: 'Error',
                                    msg: responseObject.responseText,
                                    buttons: Ext.MessageBox.OK,
                                    icon: Ext.MessageBox.ERROR
                                });
                            }
                        });
                    },
                    failure: function (responseObject) {
                        Ext.MessageBox.show({
                            title: 'Error',
                            msg: responseObject.responseText,
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.ERROR
                        });
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

                    delete window.widgetContextMenu;
                }

                var contentSlotPk = event.data.selection.contentSlot;
                window.widgetContextMenu = Ext.create('Ext.menu.Menu', {
                    cls: 'widget-context-menu',
                    items: [{
                        itemId: 'addWidgetMenu',
                        text: 'Add Widget',
                        iconCls: 'widget_add',
                        hidden: (event.data.selection.contentSlot ? false : true),
                        handler: function(menu) {
                            console.log(contentSlot);
                            menu.fireEvent('addWidget', contentSlotPk);
                        }
                    }, {
                        itemId: 'edit-widget',
                        text: 'Edit Widget',
                        iconCls: 'widget_edit',
                        hidden: !event.data.selection.contentElement,
                        handler: function () {
                            var entityConfiguration = Ext.create("console.markup." + event.data.selection.contentElementEntityName);
                            var window = Ext.getCmp('viewport').getWindow(event.data.selection.contentElement);
                            if (!window) {
                                window = Ext.getCmp('viewport').createWindow({
                                    operation: 'edit',
                                    id: event.data.selection.contentElement,
                                    title: '[Widget]',
                                    iconCls: event.data.selection.contentElementEntityName,
                                    entity: Ext.create('console.model.Entity', {
                                        entityName: event.data.selection.contentElementEntityName,
                                        entityId: event.data.selection.contentElement,
                                        entityClassName: event.data.selection.contentElementEntityName,
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + event.data.selection.contentElementEntityName + '/' + event.data.selection.contentElement,
                                        synchronizable: entityConfiguration.synchronizable
                                    }),
                                    sections: entityConfiguration.sections
                                });
                            }
                            Ext.getCmp('viewport').restoreWindow(window);
                        }
                    }, {
                        itemId: 'removeWidget',
                        text: 'Remove Widget',
                        iconCls: 'widget_remove',
                        hidden: !event.data.selection.contentElement,
                        handler: function () {
                            var contentSlotPk = event.data.selection.contentSlot;
                            var contentElementPk = event.data.selection.contentElement;
                            //get SLOT
                            var url = document.getElementById('rest-base-url').getAttribute('url') + 'cms_slot/' + contentSlotPk + '/widgets';
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
                                            if (contentElementPk != items[i].id) {
                                                newWidgets.push(items[i].id);
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
                                        url: document.getElementById('rest-base-url').getAttribute('url') + 'cms_slot/' + contentSlotPk,
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
                    }, {
                        itemId: 'pasteWidget    ',
                        text: 'Paste Widget',
                        iconCls: 'widget_add',
                        hidden: (event.data.selection.contentSlot ? false : true),
                        handler: function () {
                            var copyWidget = Ext.getCmp('viewport').clipboard;
                            if (!copyWidget) {
                                Ext.MessageBox.alert('Unable to copy', 'First select a widget for coping');
                                return;
                            }
                            console.app.addWidgetToSlot(copyWidget.data.id, event.data.selection.contentSlot);
                        }
                    },
                    {
                        xtype: 'menuseparator',
                        hidden: (event.data.selection.contentSlot ? false : true)
                    },
                    {
                        itemId: 'editSlot',
                        text: (event.data.selection.contentSlot ? 'Edit Slot': 'Create Slot'),
                        iconCls: 'cms_slot_edit',
                        handler: function () {
                            var entityConfiguration = Ext.create("console.markup.cms_slot");
                            var window = Ext.getCmp('viewport').getWindow(event.data.selection.contentSlot);
                            if (!window) {
                                window = Ext.getCmp('viewport').createWindow({
                                    operation: (event.data.selection.contentSlot ? 'edit' : 'new'),
                                    id: event.data.selection.contentSlot,
                                    title: '[CmsSlot]',
                                    iconCls: 'cms_slot',
                                    entity: Ext.create('console.model.Entity', {
                                        entityName: 'cms_slot',
                                        entityId: event.data.selection.contentSlot,
                                        entityClassName: 'cms_slot',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_slot/' + event.data.selection.contentSlot,
                                        isNew: (event.data.selection.contentSlot ? false : true),
                                        synchronizable: (event.data.selection.contentSlot && entityConfiguration.synchronizable)
                                    }),
                                    sections: entityConfiguration.sections
                                });
                            }
                            Ext.getCmp('viewport').restoreWindow(window);
                            if(!event.data.selection.contentSlot && event.data.selection.contentSlotPosition) {
                                window.getEntityPopupForm().getForm().getFields().each(function (field) {
                                    if (field.name == 'position' && !field.dirty) {
                                        field.setValue(event.data.selection.contentSlotPosition);
                                    } else if (field.name == 'entity-page' && !field.dirty) {
                                        field.setValue({
                                            id : "page",
                                            data: {
                                                id: "page",
                                                url: Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_page/' + event.data.page.id
                                            }
                                        }, true, true);
                                        field.checkDirty();
                                    }
                                });
                            }
                        }
                    }]
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
            } else if (event.data.type === 'DROP') {
                var widgetId = event.data.contentElement;
                var contentSlotId = event.data.contentSlot;
                if(!widgetId) {//not drag and drop between two slots
                    //take the active element then
                    widgetId = Ext.get(Ext.Element.getActiveElement()).id.substring(7);
                }
                console.app.addWidgetToSlot(widgetId, contentSlotId, function() {
                    if(event.data.oldContentSlot) {
                        console.app.removeWidgetFromSlot(widgetId, event.data.oldContentSlot);
                    }
                });
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
    },
    addWidgetToSlot:function(widgetId, contentSlotId, successCallback){
        //get slot
        //add element to widgets
        //patch slot
        //refresh
        //get SLOT
        var url = document.getElementById('rest-base-url').getAttribute('url') + 'cms_slot/' + contentSlotId + '/widgets';
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
                        newWidgets.push(items[i].id);
                    }
                }
                newWidgets.push(widgetId);

                var contentSlotPatchData = {};
                contentSlotPatchData['widgets'] = newWidgets;

                Ext.Ajax.request({
                    url: document.getElementById('rest-base-url').getAttribute('url') + 'cms_slot/' + contentSlotId,
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
                    params: Ext.encode(contentSlotPatchData),
                    success: function (response) {
                        Ext.get('website-iframe').dom.src = Ext.get('website-iframe').dom.src;
                        Ext.MessageBox.alert("Status", "Widget added successfully");
                        if(successCallback) {
                            successCallback(response);
                        }
                    }
                });
            }
        });
    },
    removeWidgetFromSlot:function(widgetId, contentSlotId, successCallback){
        //get slot
        //add element to widgets
        //patch slot
        //refresh
        //get SLOT
        var url = document.getElementById('rest-base-url').getAttribute('url') + 'cms_slot/' + contentSlotId + '/widgets';
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
                        if(items[i].id !== widgetId)
                            newWidgets.push(items[i].id);
                    }
                }

                var contentSlotPatchData = {};
                contentSlotPatchData['widgets'] = newWidgets;

                Ext.Ajax.request({
                    url: document.getElementById('rest-base-url').getAttribute('url') + 'cms_slot/' + contentSlotId,
                    method: 'PATCH',
                    headers: {'Content-Type': 'application/json', Accept: 'application/json'},
                    params: Ext.encode(contentSlotPatchData),
                    success: function (response) {
                        if(successCallback) {
                            successCallback(response);
                        }
                    }
                });
            }
        });
    }
});
