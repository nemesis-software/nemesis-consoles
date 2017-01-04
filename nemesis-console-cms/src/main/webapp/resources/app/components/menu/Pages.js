Ext.define('console.components.menu.Pages', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.components-menu-pages',

    requires: ["console.utils.Utilities"],

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            frame: false,
            border: false,
            title: 'Pages',
            iconCls: 'abstract_page',
            items: [
                {
                    xtype: 'toolbar',
                    border: true,
                    baseCls: 'subMenu',
                    cls: 'effect1',
                    dock: 'top',
                    height: 25,
                    items: [{
                        id: 'cms-page-filter',
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
                                    var input = Ext.getCmp('cms-page-filter').getValue();
                                    if (input) {
                                        Ext.getCmp('cms-page-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_page/search/findByCodeLikeAndCatalogVersionCode?code=%25' + input + "%25&catalogVersionCode=Staged";
                                        Ext.getCmp('cms-page-dataview').getStore().load();
                                    } else {
                                        Ext.getCmp('cms-page-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_page/search/findByCatalogVersionCode?catalogVersionCode=Staged';
                                        Ext.getCmp('cms-page-dataview').getStore().load();
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
                            var input = Ext.getCmp('cms-page-filter').getValue();
                            if (input) {
                                Ext.getCmp('cms-page-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_page/search/findByCodeLikeAndCatalogVersionCode?code=%25' + input + "%25&catalogVersionCode=Staged";
                                Ext.getCmp('cms-page-dataview').getStore().load();
                            } else {
                                Ext.getCmp('cms-page-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_page/search/findByCatalogVersionCode?catalogVersionCode=Staged';
                                Ext.getCmp('cms-page-dataview').getStore().load();
                            }
                        }
                    }]
                },
                {
                    bodyPadding: 0,
                    id: 'cms-page-dataview',
                    xtype: 'dataview',
                    scroll: 'vertical',
                    trackOver: true,
                    itemSelector: 'div.top-carousel-item',
                    overItemCls: 'x-item-over',
                    emptyText: 'No pages available',
                    tpl: new Ext.XTemplate(
                        '<tpl for=".">',
                        '<div id="page-{code}" class="top-carousel-item">',
                        '<div class="carousel-picture">',
                        '<a><img width="100" src="' + Ext.get('website-base-url').dom.getAttribute('url') + 'media/content/{code}/{code}.png" onerror="this.src='+"'resources/img/page.svg'"+ ';this.onerror=null;"></a>',
                        '<rect width="124" height="185" fill = "none" stroke-width = "1" stroke = "#000000" />',
                        '{[this.getPageCanvas()]}',
                        '{previewCanvas}',
                        '</div>',
                        '<div class="carousel-item">',
                        '<div class="widget-description">{name}</div>',
                        '<div class="carousel-item-header">{code}</div>',
                        '</div>',
                        '</div>',
                        '</tpl>',
                        {
                            getPageCanvas: function () {
                                return me.pageCanvas;
                            }
                        }
                    ),
                    listeners: {
                        select: function (view) {
                            //alert('selected ' + view.getSelection()[0].data.id);
                        },
                        afterrender: function (p) {
                            console.log(this.getStore());
                            Ext.getCmp('pages-pager').setStore(this.getStore());
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
                                    handler: function () {
                                        me.onEditSelected(view, record, item, index, event);
                                    },
                                    text: 'Edit',
                                    iconCls: 'edit'
                                }
                            ]
                        });

                        if (cmsEntriesData['abstract_page'].childNodes !== null && cmsEntriesData['abstract_page'].childNodes.length > 0) {
                            var submenu = Ext.create('Ext.menu.Menu');
                            Ext.each(cmsEntriesData['abstract_page'].childNodes,
                                function (item) {
                                    submenu.add({
                                        text: item.text,
                                        iconCls: item.iconCls,
                                        itemId: item.text,
                                        handler: function () {
                                            var entityConfiguration = Ext.create("console.markup." + item.id);
                                            var window = Ext.getCmp('viewport').createWindow({
                                                id: null,
                                                title: '[' + item.text + ']',
                                                iconCls: item.iconCls,
                                                entity: Ext.create('console.model.Entity', {
                                                    entityClassName: item.text,
                                                    url: Ext.get('rest-base-url').dom.getAttribute('url') + item.id
                                                }),
                                                sections: entityConfiguration.sections
                                            });
                                            Ext.getCmp('viewport').restoreWindow(window);
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
                            entityName: record.get('text'),
                            entityClassName: record.get('text'),
                            url: Ext.get('rest-base-url').dom.getAttribute('url') + record.get('entityName'),
                            isNew: true
                        });
                        var window = Ext.getCmp('viewport').createWindow({
                            id: "",
                            title: '[' + record.get('entityName') + ']',
                            iconCls: record.get('entityName'),
                            entity: entity,
                            sections: entityConfiguration.sections
                        });
                        Ext.getCmp('viewport').restoreWindow(window);
                    },
                    onEditSelected: function (view, record, item, index, event) {
                        var parentCmpId = 'viewport';

                        var entityConfiguration = Ext.create("console.markup." + record.data.entityName);
                        console.log(record);
                        var window = Ext.getCmp('viewport').getWindow(record.data.id);
                        if (!window) {
                            window = Ext.getCmp(parentCmpId).createWindow({
                                operation: 'edit',
                                id: record.data.code,
                                iconCls: 'cms_page',
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
                        Ext.getCmp('viewport').restoreWindow(window);
                    },
                    store: Ext.create('Ext.data.Store',{
                        id: 'cms-page-store',
                        autoLoad: false,
                        autoSync: false,
                        autoScroll: true,
                        pageSize: 10,
                        model: Ext.define('name', {
                            extend: 'Ext.data.Model',
                            fields: ["code", "name", "title"]
                        }),
                        proxy: {
                            type: 'rest',
                            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_page/search/findByCatalogVersionCode?catalogVersionCode=Staged',
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
                        },
                        listeners: {
                            load: function(myself, records, successful, operation, eOpts) {
                                if (successful) {
                                    console.utils.Utilities.translateMenuItems(records);
                                }
                            }
                        }
                    })
                }
            ],
            bbar: {
                id: 'pages-pager',
                xtype: 'pagingtoolbar',
                store: null,   // will be set in after renderer of the dataview
                displayInfo: false
            }
        });

        me.callParent();
    }
});
