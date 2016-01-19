Ext.define('console.components.menu.Emails', {

    extend: 'Ext.panel.Panel',

    alias: 'widget.console-components-menu-emails',

    initComponent: function() {
        var me = this;

        Ext.apply(me, {
            frame: false,
            border: false,
            title: 'Emails',
            iconCls: 'email_configuration',
            items: [
                {
                    xtype: 'toolbar',
                    border: true,
                    baseCls: 'subMenu',
                    cls: 'effect1',
                    dock: 'top',
                    height: 25,
                    items: [{
                        id: 'emails-filter',
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
                                    var input = Ext.getCmp('emails-filter').getValue();
                                    if (input) {
                                        Ext.getCmp('emails-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'email_page/search/findByUidLikeAndCatalogVersionUid?uid=%25' + input + "%25&catalogVersionUid=Staged";
                                        Ext.getCmp('emails-dataview').getStore().load();
                                    } else {
                                        Ext.getCmp('emails-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'email_page/search/findByCatalogVersionUid?catalogVersionUid=Staged';
                                        Ext.getCmp('emails-dataview').getStore().load();
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
                                var input = Ext.getCmp('emails-filter').getValue();
                                if (input) {
                                    Ext.getCmp('emails-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'email_page/search/findByUidLikeAndCatalogVersionUid?uid=%25' + input + "%25&catalogVersionUid=Staged";
                                    Ext.getCmp('emails-dataview').getStore().load();
                                } else {
                                    Ext.getCmp('emails-dataview').getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + 'email_page/search/findByCatalogVersionUid?catalogVersionUid=Staged';
                                    Ext.getCmp('emails-dataview').getStore().load();
                                }
                            }
                        }]
                },
                {
                    id: "emails-dataview",
                    bodyPadding: 0,
                    xtype: 'dataview',
                    scroll: 'vertical',
                    trackOver: true,
                    overItemCls: 'x-item-over',
                    emptyText: 'No emails available',
                    itemSelector: 'div.top-carousel-item',
                    tpl: [
                        '<tpl for=".">',
                        '<div id="page-{uid}" class="top-carousel-item">',
                        '<div class="carousel-picture">',
                        '<a><img src="' + Ext.get('website-base-url').dom.getAttribute('url') + 'media/content/{uid}/{uid}.png"></a>',
                        '</div>',
                        '<div class="carousel-item">',
                        '<div class="widget-description">{name}</div>',
                        '<div class="carousel-item-header">{uid}</div>',
                        '</div>',
                        '</div>',
                        '</tpl>'],
                    store: Ext.create('Ext.data.Store',{
                        id: 'emails-store',
                        autoLoad: true,
                        autoSync: false,
                        autoScroll: true,
                        pageSize: 30,
                        model: Ext.define('name', {
                            extend: 'Ext.data.Model',
                            fields: ["uid", "name", "title"]
                        }),
                        proxy: {
                            type: 'rest',
                            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'email_page/search/findByCatalogVersionUid?catalogVersionUid=Staged',
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
                    }),
                    listeners: {
                        itemclick: function (view, record, item, index, e, eOpts) {
                            Ext.get('website-iframe').dom.src = Ext.get('website-base-url').dom.getAttribute('url') + "/email/page/" + record.data.uid + "?subject=" + record.data.name + "&live_edit_view=true&site=" + ((Ext.getCmp('site-combo').getSelection() != null) ? Ext.getCmp('site-combo').getSelection().data.uid : 'solar');
                            view.el.setStyle('background', '#DDDDDD');
                            view.el.setStyle('border-color', '#000');
                        },
                        afterrender: function (p) {
                            Ext.getCmp('emails-pager').setStore(this.getStore());
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
                                },
                                '-',
                                {
                                    itemId: 'copy',
                                    handler: function () {
                                        me.onCopySelected(view, record, item, index, event);
                                    },
                                    text: 'Copy',
                                    iconCls: 'copy'
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
                            iconCls: record.data.entityName ? record.data.entityName : 'widget',
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
                    onCopySelected: function (view, record, item, index, event) {
                        Ext.getCmp('cms-viewport').clipboard = {
                            data: {
                                pk: record.data.pk,
                                id: record.data.uid,
                                name: record.data.entityName,
                                url: record.data._links.self.href
                            }
                        };
                    }
                }
            ],
            bbar: {
                id: 'emails-pager',
                xtype: 'pagingtoolbar',
                store: null,   // will be set in after renderer of the dataview
                displayInfo: false
            }
        });

        me.callParent();
    }
});
