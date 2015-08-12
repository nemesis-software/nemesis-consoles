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
                                id: 'site-combo',
                                fieldLabel: 'Site',
                                xtype: 'combo',
                                valueField: 'pk',
                                displayField: 'name',
                                store: Ext.create('Ext.data.ArrayStore', {
                                    autoLoad: false,
                                    autoSync: false,
                                    fields: ['pk', 'name', 'uid'],
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
                                    select: function (view, record) {
                                        var catalogsCombo = Ext.getCmp('catalogsCombo');
                                        //clear old selection of catalogs and catalogVersions
                                        catalogsCombo.clearValue();
                                        //Ext.getCmp('catalogVersionsCombo').clearValue();
                                        //fetch data
                                        var siteContentCatalogsStore = Ext.create('Ext.data.ArrayStore', {
                                            autoLoad: false,
                                            autoSync: false,
                                            fields: ['uid', 'pk'],
                                            proxy: {
                                                type: 'rest',
                                                url: view.getSelection().data._links.contentCatalogs.href,
                                                useDefaultXhrHeader: false,
                                                cors: true,
                                                reader: {
                                                    type: 'json',
                                                    rootProperty: '_embedded.contentCatalogModels'
                                                }
                                            }
                                        });

                                        //catalogsCombo.store.proxy.url = view.getSelection().data._links.contentCatalogs.href;
                                        //catalogsCombo.store.load();
                                        siteContentCatalogsStore.load({
                                            callback : function(records, options, success) {
                                                if (success) {
                                                    //this doesn't populate the combo as it should
                                                    for (var i = 0; i < records.length; i++) {
                                                        catalogsCombo.select(records[i]);
                                                    }
                                                    catalogsCombo.fireEvent('select', catalogsCombo, records);
                                                }
                                            }
                                        });
                                        //append site parameter to the iframe
                                        var currentUrl = Ext.get('website-iframe').dom.src;
                                        var currentQuery = currentUrl.split('?')[1];
                                        var params = Ext.urlDecode(currentQuery);
                                        params.site = record.get('uid');
                                        params.clear = true;
                                        var newQuery = Ext.Object.toQueryString(params);

                                        Ext.get('website-iframe').dom.src = Ext.get('website-base-url').dom.getAttribute('url') + '?' + newQuery;
                                    }
                                }
                            },
                            {
                                id: 'catalogsCombo',
                                fieldLabel: 'Catalog',
                                xtype: 'combo',
                                multiSelect: true,
                                valueField: 'uid',
                                displayField: 'uid',
                                store: Ext.create('Ext.data.ArrayStore', {
                                    autoLoad: false,
                                    autoSync: false,
                                    fields: ['uid', 'pk'],
                                    proxy: {
                                        type: 'rest',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'content_catalog/search/findByCatalogVersionsUid?catalogVersionUid=Staged',
                                        useDefaultXhrHeader: false,
                                        cors: true,
                                        reader: {
                                            type: 'json',
                                            rootProperty: '_embedded.contentCatalogModels'
                                        }
                                    }
                                })/*,
                                listeners : {
                                    catalog versions will not be changable for now.. the combo will be removed
                                    select: function (view, records) {

                                        var firstSelectedCatalogPK = records[0].data.pk;
                                        var catalogVersionsCombo = Ext.getCmp('catalogVersionsCombo');
                                        //clear old selection of catalogVersions
                                        Ext.getCmp('catalogVersionsCombo').clearValue();
                                        //fetch data
                                        catalogVersionsCombo.store.proxy.url = Ext.get('rest-base-url').dom.getAttribute('url')
                                                                    + 'catalog/' + firstSelectedCatalogPK + '/catalogVersions/';

                                        catalogVersionsCombo.store.load();
                                    }
                                }*/
                            },
                            /*
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
                                }),
                                listeners : {
                                    select: function (cb, record) {
                                        //append catalog and catalogsVersion parameter to the iframe
                                        var currentUrl = Ext.get('website-iframe').dom.src;
                                        var currentQuery = currentUrl.split('?')[1];
                                        var params = Ext.urlDecode(currentQuery);
                                        params.catalogs = Ext.getCmp('catalogsCombo').getValue().join();
                                        params.catalogsVersion = record.get('uid');
                                        params.clear = true;
                                        var newQuery = Ext.Object.toQueryString(params);

                                        Ext.get('website-iframe').dom.src = Ext.get('website-base-url').dom.getAttribute('url') + '?' + newQuery;
                                    }
                                }
                            },*/
                            , '->',
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
                            }
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
                            src: Ext.get('website-base-url').dom.getAttribute('url') + '?site=solarapparel-uk&live_edit_view=true&site_preference=normal',
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
