Ext.define('console.components.menu.PageSlots', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.components-menu-pageslots',

    requires: [
        'console.model.Slot'
    ],

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            title: 'Slots For This Page',
            iconCls: 'cms_slot',
            id: 'page-slot-store',
            frame: false,
            border: false,
            items: [
                {
                    xtype: 'toolbar',
                    border: true,
                    baseCls: 'subMenu',
                    cls: 'effect1',
                    dock: 'top',
                    height: 25,
                    items: [
                        {
                            id: 'cms-slot-filter',
                            xtype: 'textfield',
                            name: 'SearchDownload',
                            itemId: 'SearchDownload',
                            enableKeyEvents: true,
                            allowBlank: true,
                            minLength: 3,
                            width: '79%',
                            listeners: {
                                specialkey: function (f, e) {
                                    if (e.getKey() == e.ENTER) {
                                        var input = Ext.getCmp('cms-slot-filter').getValue();
                                        if (input) {
                                            Ext.getCmp('cms-slot-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_slot/search/findByCodeLikeAndCatalogVersionCodeAndPageOrTemplate?code=%25' + input + '%25&catalogVersionCode=Staged';
                                            Ext.getCmp('cms-slot-dataview').getStore().load();
                                        } else {
                                            Ext.getCmp('cms-slot-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_slot/search/findByCatalogVersionCodeAndPageOrTemplate?catalogVersionCode=Staged';
                                            Ext.getCmp('cms-slot-dataview').getStore().load();
                                        }
                                    }
                                }
                            }
                        },
                        '->',
                        {
                            xtype: 'button',
                            cls: 'x-btn-default-small',
                            text: 'Filter',
                            width: '20%',
                            handler: function () {
                                var input = Ext.getCmp('cms-slot-filter').getValue();
                                if (input) {
                                    Ext.getCmp('cms-slot-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_slot/search/findByCodeLikeAndCatalogVersionCodeAndPageOrTemplate?code=%25' + input + '%25&catalogVersionCode=Staged';
                                    Ext.getCmp('cms-slot-dataview').getStore().load();
                                } else {
                                    Ext.getCmp('cms-slot-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_slot/search/findByCatalogVersionCodeAndPageOrTemplate?catalogVersionCode=Staged';
                                    Ext.getCmp('cms-slot-dataview').getStore().load();
                                }
                            }
                        }]
                },
                {
                    bodyPadding: 0,
                    id: 'cms-slot-dataview',
                    xtype: 'dataview',
                    scroll: 'vertical',
                    trackOver: true,
                    overItemCls: 'x-item-over',
                    itemSelector: 'div.top-carousel-item',
                    emptyText: 'No slots available',
                    tpl: new Ext.XTemplate(
                        '<tpl for=".">',
                        '<div class="top-carousel-item" id="slot-{code}">',
                        '<div class="carousel-picture">',
                        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 124px; height: 185px">',
                        '<rect width="124" height="185" fill = "none" stroke-width = "1" stroke = "#000000" />',
                        '{[this.getTemplateCanvas()]}',
                        '{previewCanvas}',
                        '</svg>',
                        '</div>',
                        '<div class="carousel-item">',
                        '<div class="widget-description">{position}</div>',
                        '<div class="carousel-item-header">{code}</div>',
                        '</div>',
                        '</div>',
                        '</tpl>',
                        {
                            getTemplateCanvas: function () {
                                return me.templateCanvas;
                            }
                        }
                    ),
                    listeners: {
                        select: function (view) {
                            debugger;
                            //alert('selected ' + view.getSelection()[0].data.id);
                        },
                        afterrender: function (p) {
                            Ext.getCmp('page-slots-pager').setStore(this.getStore());
                        },
                        itemcontextmenu: function (view, record, item, index, event) {
                            //			view.select(record);
                            event.stopEvent();
                            var ctxMenu = this.buildCtxMenu(view, record, item, index, event);

                            ctxMenu.showAt(event.getXY());
                        }
                    },
                    buildCtxMenu: function (view, record, item, index, event) {
                        var me = this;
                        var menu = Ext.create('Ext.menu.Menu', {
                            items: [
                                {
                                    itemId: 'create',
                                    handler: function () {
                                        me.onCreateSelected(view, record, item, index, event);
                                    },
                                    text: 'Create',
                                    iconCls: 'add'
                                },
                                {
                                    itemId: 'edit',
                                    text: 'Edit/Create slot',
                                    iconCls: 'edit',
                                    handler: function () {
                                        me.onEditSelected(view, record, item, index, event);
                                    }
                                },
                                {
                                    itemId: 'addWidgetMenu',
                                    text: 'Add Widget',
                                    iconCls: 'widget_add',
                                    handler: function (menu) {
                                        menu.fireEvent('addWidget', record.data.id);
                                    }
                                }]
                        });

                        if (cmsEntriesData['cms_slot'].childNodes !== null && cmsEntriesData['cms_slot'].childNodes.length > 0) {
                            var submenu = Ext.create('Ext.menu.Menu');
                            Ext.each(cmsEntriesData['cms_slot'].childNodes,
                                function (item) {
                                    submenu.add({
                                        text: item.text,
                                        iconCls: item.iconCls,
                                        itemId: item.text,
                                        handler: function () {
                                            var entityConfiguration = Ext.create("console.markup." + item.id);
                                            var window = Ext.getCmp('cms-viewport').createWindow({
                                                id: null,
                                                title: '[' + item.text + ']',
                                                iconCls: item.iconCls,
                                                entity: Ext.create('console.model.Entity', {
                                                    entityName: item.text,
                                                    url: Ext.get('rest-base-url').dom.getAttribute('url') + item.id
                                                }),
                                                sections: entityConfiguration.sections
                                            });
                                            Ext.getCmp('cms-viewport').restoreWindow(window);
                                        }
                                    })
                                }
                            );

                            menu.items.items[0].setMenu(submenu);
                        }

                        return menu;
                    },
                    onCreateSelected: function (view, record, item, index, event) {
                        var entityConfiguration = Ext.create("console.markup." + record.get('entityName'));
                        var entity = Ext.create('console.model.Entity', {
                            entityId: record.get('text'),
                            entityClassName: record.get('text'),
                            url: Ext.get('rest-base-url').dom.getAttribute('url') + record.get('entityName'),
                            isNew: true
                        });
                        var window = Ext.getCmp('cms-viewport').createWindow({
                            id: "",
                            title: '[' + record.get('entityName') + ']',
                            iconCls: record.get('entityName'),
                            entity: entity,
                            sections: entityConfiguration.sections
                        });
                        Ext.getCmp('cms-viewport').restoreWindow(window);
                    },
                    onEditSelected: function (view, record, item, index, event) {
                        var parentCmpId = 'cms-viewport';

                        var entityConfiguration = Ext.create("console.markup." + record.data.entityName);
                        console.log(record);
                        var window = Ext.getCmp('cms-viewport').getWindow(record.data.id);
                        if (!window) {
                            window = Ext.getCmp(parentCmpId).createWindow({
                                operation: 'edit',
                                id: record.data.code,
                                iconCls: 'cms_slot',
                                entity: Ext.create('console.model.Entity', {
                                    entityName: record.data.entityName,
                                    entityId: record.data.id,
                                    entityClassName: record.data.entityName,
                                    url: record.data._links['self'].href,
                                    synchronizable: entityConfiguration.synchronizable
                                }),
                                sections: entityConfiguration.sections
                            });
                        }
                        Ext.getCmp('cms-viewport').restoreWindow(window);
                    },
                    store: Ext.create('Ext.data.Store',{
                        id: 'cms-slot-store',
                        autoLoad: false,
                        autoSync: false,
                        autoScroll: true,
                        pageSize: 10,
                        model: 'console.model.Slot',
                        proxy: {
                            type: 'rest',
                            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_slot/search/findByCatalogVersionCodeAndPageOrTemplate?catalogVersionCode=Staged',
                            limitParam: 'size',
                            useDefaultXhrHeader: false,
                            cors: true,
                            reader: {
                                type: 'json',
                                rootProperty: function (o) {
                                    var data = [];
                                    for (var key in o._embedded) {
                                        data = data.concat(o._embedded[key]);
                                    }
                                    return data;
                                },
                                totalProperty: 'page.totalElements'
                            }
                        }
                    })
                }
            ],
            bbar: {
                id: 'page-slots-pager',
                xtype: 'pagingtoolbar',
                store: null,   // will be set in after renderer of the dataview
                displayInfo: false
            }
        });

        me.callParent();
    }
});
