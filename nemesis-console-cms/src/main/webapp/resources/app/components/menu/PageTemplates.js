Ext.define('console.components.menu.PageTemplates', {
    extend: 'Ext.panel.Panel',

    alias: 'widget.components-menu-pagetemplates',

    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            frame: false,
            border: false,
            title: 'Page Templates',
            iconCls: 'abstract_template',
            items: [
                {
                    id: 'page-template-toolbar',
                    xtype: 'toolbar',
                    border: true,
                    baseCls: 'subMenu',
                    cls: 'effect1',
                    dock: 'top',
                    height: 25,
                    items: [
                        {
                            id: 'page-template-filter',
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
                                        var input = Ext.getCmp('page-template-filter').getValue();
                                        if (input) {
                                            Ext.getCmp('page-template-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/search/findByUidLikeAndCatalogVersionUid?uid=%25' + input + "%25&catalogVersionUid=Staged";
                                            Ext.getCmp('page-template-dataview').getStore().load();
                                        } else {
                                            Ext.getCmp('page-template-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/search/findByCatalogVersionUid?catalogVersionUid=Staged';
                                            Ext.getCmp('page-template-dataview').getStore().load();
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
                                var input = Ext.getCmp('page-template-filter').getValue();
                                if (input) {
                                    Ext.getCmp('page-template-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/search/findByUidLikeAndCatalogVersionUid?uid=%25' + input + "%25&catalogVersionUid=Staged";
                                    Ext.getCmp('page-template-dataview').getStore().load();
                                } else {
                                    Ext.getCmp('page-template-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/search/findByCatalogVersionUid?catalogVersionUid=Staged';
                                    Ext.getCmp('page-template-dataview').getStore().load();
                                }
                            }
                        }
                    ]
                },
                {
                    id: 'page-template-dataview',
                    bodyPadding: 0,
                    xtype: 'dataview',
                    scroll: 'vertical',
                    trackOver: true,
                    itemSelector: 'div.top-carousel-item',
                    overItemCls: 'x-item-over',
                    emptyText: 'No templates available',
                    tpl: [
                        '<tpl for=".">',
                        '<div id="template-{uid}" class="top-carousel-item">',
                        '<div class="carousel-picture">',
                        '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="width: 124px; height: 185px" id="svg-template-{uid}">',
                        '<rect width="124" height="185" fill="none" stroke-width="1" stroke="#000000" />',
                        '{previewCanvas}',
                        '</svg>',
                        '</div>',
                        '<div class="carousel-item">',
                        '<div class="widget-description">{name}</div>',
                        '<div class="carousel-item-header">{uid}</div>',
                        '</div>',
                        '</div>',
                        '</tpl>'
                    ],
                    listeners: {
                        select: function (view) {
                            alert('selected ' + view.getSelection()[0].data.pk);
                        },
                        afterrender: function (p) {
                            Ext.getCmp('templates-pager').setStore(this.getStore());
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
                        return Ext.create('Ext.menu.Menu', {
                            items: [
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
                    },
                    onEditSelected: function (view, record, item, index, event) {
                        var parentCmpId = 'cms-viewport';

                        var entityConfiguration = Ext.create("console.markup." + record.data.entityName);
                        console.log(record);
                        var window = Ext.getCmp(parentCmpId).createWindow({
                            operation: 'edit',
                            id: record.data.uid,
                            iconCls: 'page_template',
                            entity: Ext.create('console.model.Entity', {
                                id: record.data.entityName,
                                pk: record.data.pk,
                                name: record.data.entityName,
                                url: record.data._links['self'].href,
                                synchronizable: entityConfiguration.synchronizable
                            }),
                            sections: entityConfiguration.sections
                        });
                        window.show();
                    },
                    store: Ext.create('Ext.data.Store',{
                        id: 'page-template-store',
                        autoLoad: true,
                        autoSync: false,
                        autoScroll: true,
                        pageSize: 10,
                        model: Ext.define('name', {
                            extend: 'Ext.data.Model',
                            fields: ["uid", "name", "title", "previewCanvas"]
                        }),
                        proxy: {
                            type: 'rest',
                            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'page_template/search/findByCatalogVersionUid?catalogVersionUid=Staged',
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
                id: 'templates-pager',
                xtype: 'pagingtoolbar',
                store: null,   // will be set in after renderer of the dataview
                displayInfo: false
            }
        });

        me.callParent();
    }
});
