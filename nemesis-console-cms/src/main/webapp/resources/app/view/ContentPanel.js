Ext.define('console.view.ContentPanel', {
    extend: 'Ext.container.Container',
    xtype: 'contentPanel',
    id: 'content-panel',
    layout: {
        type: 'border'
    },

    defaults: {
        xtype: 'panel'
    },

    requires: [
        'console.view.StatusBar'
    ],

    initComponent: function () {
        var me = this;
        me.items = [
            {
                region: 'north',
                xtype: 'panel',
                dockedItems: [
                    {
                        dock: 'top',
                        xtype: 'toolbar',
                        items: [
                            {
                                fieldLabel: 'Site',
                                xtype: 'combo',
                                valueField: 'pk',
                                displayField: 'name',
                                store: Ext.create('Ext.data.ArrayStore', {
                                    autoLoad: false,
                                    autoSync: false,
                                    fields: ['pk', 'name'],
                                    proxy: {
                                        type: 'rest',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'site/',
                                        useDefaultXhrHeader: false,
                                        cors: true,
                                        reader: {
                                            type: 'json',
                                            rootProperty: '_embedded.siteModels'
                                        }
                                    }
                                }),
                                listeners : {
                                    select: function (view) {
                                        var catalogsCombo = Ext.getCmp('catalogsCombo');
                                        //clear old selection of catalogs and catalogVersions
                                        catalogsCombo.setValue("");
                                        Ext.getCmp('catalogVersionsCombo').setValue("");
                                        //fetch data
                                        catalogsCombo.store.proxy.url = view.getSelectedRecord().data._links.contentCatalogs.href;
                                        catalogsCombo.store.load();
                                    }
                                }
                            },
                            {
                                fieldLabel: 'Experience',
                                xtype: 'combo',
                                store: Ext.create('console.store.Experiences'),
                                valueField: 'id',
                                displayField: 'name',
                                value: 'normal',
                                listeners: {
                                    select: {
                                        fn: function (cb, record) {

                                            Ext.getCmp('website-iframe-wrapper').removeCls('normal-iframe-wrapper');
                                            Ext.getCmp('website-iframe-wrapper').removeCls('tablet-iframe-wrapper');
                                            Ext.getCmp('website-iframe-wrapper').removeCls('mobile-iframe-wrapper');
                                            Ext.getCmp('website-iframe-wrapper').addCls(record.get('id') + '-iframe-wrapper');

                                            Ext.getCmp('website-iframe').removeCls('mobile-iframe');
                                            Ext.getCmp('website-iframe').removeCls('tablet-iframe');
                                            Ext.getCmp('website-iframe').removeCls('normal-iframe');
                                            Ext.getCmp('website-iframe').addCls(record.get('id') + '-iframe');

                                            //append site_preference parameter to the iframe
                                            var currentUrl = Ext.get('website-iframe').dom.src;
                                            var currentQuery = currentUrl.split('?')[1];
                                            var params = Ext.urlDecode(currentQuery);
                                            params.site_preference = record.get('id');
                                            params.clear = true;
                                            params.live_edit_view = true;
                                            var newQuery = Ext.Object.toQueryString(params);

                                            Ext.get('website-iframe').dom.src = Ext.get('website-base-url').dom.getAttribute('url') + '?' + newQuery;
                                        },
                                        scope: this
                                    }
                                }
                            },
                            {
                                id: 'catalogsCombo',
                                fieldLabel: 'Catalog',
                                xtype: 'combo',
                                multiSelect: true,
                                valueField: 'pk',
                                displayField: 'uid',
                                store: Ext.create('Ext.data.ArrayStore', {
                                    autoLoad: false,
                                    autoSync: false,
                                    fields: ['pk', 'name'],
                                    proxy: {
                                        type: 'rest',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'catalog/',
                                        useDefaultXhrHeader: false,
                                        cors: true,
                                        reader: {
                                            type: 'json',
                                            rootProperty: '_embedded.catalogModels'
                                        }
                                    }
                                }),
                                listeners : {
                                    select: function (view) {
                                        var selectedCatalogPK = view.getValue()[0];
                                        var catalogVersionsCombo = Ext.getCmp('catalogVersionsCombo');
                                        //clear old selection of catalogVersions
                                        Ext.getCmp('catalogVersionsCombo').setValue("");
                                        //fetch data
                                        catalogVersionsCombo.store.proxy.url = Ext.get('rest-base-url').dom.getAttribute('url')
                                                                    + 'catalog/' + selectedCatalogPK + '/catalogVersions/';

                                        catalogVersionsCombo.store.load();
                                    }
                                }
                            },
                            {
                                id: 'catalogVersionsCombo',
                                fieldLabel: 'Catalog Version',
                                xtype: 'combo',
                                valueField: 'uid',
                                displayField: 'uid',
                                store: Ext.create('Ext.data.ArrayStore', {
                                    autoLoad: false,
                                    autoSync: false,
                                    fields: ['uid', 'name'],
                                    proxy: {
                                        type: 'rest',
                                        url: null, //will be set by the catalog combo change event
                                        useDefaultXhrHeader: false,
                                        cors: true,
                                        reader: {
                                            type: 'json',
                                            rootProperty: '_embedded.catalogVersionModels'
                                        }
                                    }
                                })
                            },
                        ]
                    }
                ]
            },
            {
                region: 'center',
                xtype: 'panel',
                id: 'website-iframe-wrapper',
                cls: 'normal-iframe-wrapper',
                items: [
                    {
                        xtype: "component",
                        id: 'website-iframe',
                        cls: 'normal-iframe',
                        autoEl: {
                            tag: "iframe",
                            src: Ext.get('website-base-url').dom.getAttribute('url') + '?site=solar&live_edit_view=true&site_preference=normal',
                            allowtransparency: true
                        },
                        listeners: {
                            el: {
                                load: function (e, t, eOpts) {
                                    Ext.getCmp('content-panel').setLoading(false);
                                }
                            },
                            itemcontextmenu: function (view, rec, node, index, e) {
                                alert(e);
                                e.stopEvent();
                                menuContext.showAt(e.getXY());
                                return false;
                            }
                        }
                    }
                ]
            },
            {
                region: 'south',
                xtype: 'statusBar',
                height: 27
            }
        ];

        this.callParent();
    },
    listeners: {
        'afterrender': function (frame) {
            frame.setLoading('Loading...');
        }
    }
});
