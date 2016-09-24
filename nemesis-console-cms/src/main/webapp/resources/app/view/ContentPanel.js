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
        'console.view.StatusBar',
        'console.view.TaskBar'
    ],

    initComponent: function () {
        var me = this,
            selectedLangCode = console.app.getLanguage();

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
	                            labelWidth: 40,
	                            width: 330,
	                            editable: false,
	                            margin: '0 0 0 10',
                                xtype: 'combo',
                                valueField: 'pk',
                                displayField: 'name',
	                            queryMode: 'local',
                                store: Ext.create('Ext.data.ArrayStore', {
                                    autoSync: false,
                                    fields: ['pk', 'name'],
                                    proxy: {
                                        type: 'rest',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'site/',
                                        useDefaultXhrHeader: false,
                                        cors: true,
                                        reader: {
                                            type: 'json',
                                            rootProperty: '_embedded.siteEntities'
                                        }
                                    },
	                                listeners: {
		                                load: function(myself, records, successful, eOpts) {
											if(successful) {
												var comboSites = Ext.getCmp('site-combo');
												comboSites.setValue(myself.findRecord('code', 'solarapparel').get('pk'))
											}
		                                }
	                                },
	                                autoLoad: true
	                            }),
                                listeners : {
                                    change: function (cmb, newValue, oldValue, eOpts) {
	                                    var catalogsCombo = Ext.getCmp('catalogsCombo');

                                        //fetch data
                                        var siteContentCatalogsStore = Ext.create('Ext.data.ArrayStore', {
                                            autoLoad: true,
                                            autoSync: false,
                                            fields: ['pk', 'code'],
                                            proxy: {
                                                type: 'rest',
                                                url: cmb.getSelection().data._links.contentCatalogs.href,
                                                useDefaultXhrHeader: false,
                                                cors: true,
                                                reader: {
                                                    type: 'json',
                                                    rootProperty: '_embedded.contentCatalogEntities'
                                                }
                                            }
                                        });

                                        siteContentCatalogsStore.load({
                                            callback : function(records, options, success) {
                                                if (success) {
	                                                var selectedCatalogsPks = new Array();
                                                    for (var i = 0; i < records.length; i++) {
                                                        selectedCatalogsPks.push(records[i].get('pk'))
                                                    }

	                                                catalogsCombo.setValue(selectedCatalogsPks);
                                                }
                                            }
                                        });

                                        //append site parameter to the iFrame
                                        var currentUrl = Ext.get('website-iframe').dom.src,
                                            currentQuery = currentUrl.split('?')[1],
                                            params = Ext.urlDecode(currentQuery);

                                        params.site = cmb.getStore().findRecord('pk',newValue).get('code');
                                        params.clear = true;
                                        // Delete the param catalog from url because remains the catalogs from the previous
                                        // site which is wrong.
                                        if(params.catalogs) {
                                            delete params.catalogs;
                                        }
                                        var newQuery = Ext.Object.toQueryString(params);
                                        Ext.get('website-iframe').dom.src = Ext.get('website-base-url').dom.getAttribute('url') + '?' + newQuery;
                                    }
                                }
                            },
                            {
                                id: 'catalogsCombo',
                                fieldLabel: 'Catalog',
	                            labelWidth: 60,
	                            width: 300,
                                xtype: 'combo',
	                            margin: '0 0 0 10',
	                            editable: false,
	                            queryMode: 'local',
                                multiSelect: true, //should be true ones we fix the duplicate homepage issue
	                            autoSelect: true,
                                valueField: 'pk',
                                displayField: 'catalogName',
                                store: Ext.create('Ext.data.ArrayStore', {
                                    autoLoad: true,
                                    autoSync: false,
                                    fields: [
	                                    'pk',
	                                    {name: 'catalogName', mapping: 'name.' + selectedLangCode + '.value'}
                                    ],
                                    proxy: {
                                        type: 'rest',
                                        url: Ext.get('rest-base-url').dom.getAttribute('url') + 'cms_catalog/search/findByCatalogVersionsCode?catalogVersionCode=Staged',
                                        useDefaultXhrHeader: false,
                                        cors: true,
                                        reader: {
                                            type: 'json',
                                            rootProperty: '_embedded.contentCatalogEntities'
                                        }
                                    }
                                }),
                                listeners : {
                                    //catalog versions will not be changable for now.. the combo will be removed
                                    //select: function (view, records) {
                                    //
                                    //    var firstSelectedCatalogPK = records[0].data.pk;
                                    //    var catalogVersionsCombo = Ext.getCmp('catalogVersionsCombo');
                                    //    //clear old selection of catalogVersions
                                    //    Ext.getCmp('catalogVersionsCombo').clearValue();
                                    //    //fetch data
                                    //    catalogVersionsCombo.store.proxy.url = Ext.get('rest-base-url').dom.getAttribute('url')
                                    //                                + 'catalog/' + firstSelectedCatalogPK + '/catalogVersions/';
                                    //
                                    //    catalogVersionsCombo.store.load();
                                    //}
                                    change: function (cmb, newValue, oldValue, eOpts) {
                                        //append catalog and catalogsVersion parameter to the iframe
                                        var currentUrl = Ext.get('website-iframe').dom.src,
                                            currentQuery = currentUrl.split('?')[1],
                                            params = Ext.urlDecode(currentQuery),
	                                        catalogsUIDs = new Array();

										// Gets selected catalogs UIDs
	                                    cmb.valueCollection.items.forEach(function(item){
		                                    catalogsUIDs.push(item.get('code'));
	                                    });
                                        params.catalogs = catalogsUIDs.join();
                                        params.clear = true;
                                        var newQuery = Ext.Object.toQueryString(params);

                                        Ext.get('website-iframe').dom.src = Ext.get('website-base-url').dom.getAttribute('url') + '?' + newQuery;
                                    }
                                }
                            },
                            /*
                            {
                                id: 'catalogVersionsCombo',
                                fieldLabel: 'Catalog Version',
                                xtype: 'combo',
                                valueField: 'code',
                                displayField: 'code',
                                store: Ext.create('Ext.data.ArrayStore', {
                                    autoLoad: false,
                                    autoSync: false,
                                    fields: ['code', 'name'],
                                    proxy: {
                                        type: 'rest',
                                        url: null, //will be set by the catalog combo change event
                                        useDefaultXhrHeader: false,
                                        cors: true,
                                        reader: {
                                            type: 'json',
                                            rootProperty: '_embedded.catalogVersionEntities'
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
                                        params.catalogsVersion = record.get('code');
                                        params.clear = true;
                                        var newQuery = Ext.Object.toQueryString(params);

                                        Ext.get('website-iframe').dom.src = Ext.get('website-base-url').dom.getAttribute('url') + '?' + newQuery;
                                    }
                                }
                            }*/,
                            {
                                xtype: 'button',
                                text: 'Synchronize',
                                iconCls:'synchronize',
                                handler: function () {
                                    var catalogs = Ext.getCmp('catalogsCombo').getValue()
                                    if(catalogs && catalogs.length > 0){
                                        for(var i = 0; i < catalogs.length; i++){
                                            var catalogPK = Ext.getCmp('catalogsCombo').findRecordByValue(catalogs[i]).get('pk');
                                            Ext.Ajax.request({
                                                url: Ext.get('rest-base-url').dom.getAttribute('url') + 'catalog/synchronize/' + catalogPK,
                                                method: 'POST',
                                                headers: {'Content-Type': 'application/json'},
                                                params: {},
                                                success: function (response) {

                                                }
                                            });
                                        }
                                    } else {
                                        //get site catalogs
                                        var contentCatalogsForSiteUrl = null;
                                        if(Ext.getCmp('site-combo').getSelection()) {//we have selected site
                                            contentCatalogsForSiteUrl = Ext.getCmp('site-combo').getSelection().data._links.contentCatalogs.href

                                            Ext.Ajax.request({
                                                url: contentCatalogsForSiteUrl,
                                                method: 'GET',
                                                headers: {'Content-Type': 'application/json'},
                                                params: {},
                                                success: function (response) {
                                                    var site = JSON.parse(response.responseText);
                                                    for(var i = 0; i < site._embedded.contentCatalogEntities.length; i++){
                                                        Ext.Ajax.request({
                                                            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'catalog/synchronize/' + site._embedded.contentCatalogEntities[i].pk,
                                                            method: 'POST',
                                                            headers: {'Content-Type': 'application/json'},
                                                            params: {},
                                                            success: function (response) {

                                                            }
                                                        });
                                                    }
                                                }
                                            });

                                        } else {
                                            var siteUrl = Ext.get('rest-base-url').dom.getAttribute('url') + 'site/search/findByCode?code=solarapparel';

                                            Ext.Ajax.request({
                                                url: siteUrl,
                                                method: 'GET',
                                                headers: {'Content-Type': 'application/json'},
                                                params: {},
                                                success: function (response) {
                                                    var site = JSON.parse(response.responseText);
                                                    contentCatalogsForSiteUrl = site._embedded.siteEntities[0]._links.contentCatalogs.href;

                                                    Ext.Ajax.request({
                                                        url: contentCatalogsForSiteUrl,
                                                        method: 'GET',
                                                        headers: {'Content-Type': 'application/json'},
                                                        params: {},
                                                        success: function (response) {
                                                            var site = JSON.parse(response.responseText);
                                                            for(var i = 0; i < site._embedded.contentCatalogEntities.length; i++){
                                                                //DO POST on site._embedded.contentCatalogEntities[i].pk
                                                                Ext.Ajax.request({
                                                                    url: Ext.get('rest-base-url').dom.getAttribute('url') + 'catalog/synchronize/' + site._embedded.contentCatalogEntities[i].pk,
                                                                    method: 'POST',
                                                                    headers: {'Content-Type': 'application/json'},
                                                                    params: {},
                                                                    success: function (response) {

                                                                    }
                                                                });
                                                            }
                                                        }
                                                    });
                                                }
                                            });
                                        }
                                        //var siteContentCatalogsStore = Ext.create('Ext.data.ArrayStore', {
                                        //    autoLoad: false,
                                        //    autoSync: false,
                                        //    fields: ['code', 'pk'],
                                        //    proxy: {
                                        //        type: 'rest',
                                        //        url: contentCatalogsForSiteUrl,
                                        //        useDefaultXhrHeader: false,
                                        //        cors: true,
                                        //        reader: {
                                        //            type: 'json',
                                        //            rootProperty: '_embedded.contentCatalogEntities'
                                        //        }
                                        //    }
                                        //});
                                        //siteContentCatalogsStore.load({
                                        //    callback : function(records, options, success) {
                                        //        if (success) {
                                        //            debugger;
                                        //            //records[0].data.pk
                                        //        }
                                        //    }
                                        //});
                                    }
                                }
                            },
                            , '->',
                            , '-',
                            {
                                fieldLabel: 'Experience',
                                xtype: 'combo',
                                store: Ext.create('console.store.Experiences'),
                                valueField: 'id',
                                displayField: 'name',
                                value: 'normal',
                                queryMode: 'local',
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
                                            var currentUrl = Ext.get('website-iframe').dom.src,
                                                currentQuery = currentUrl.split('?')[1],
                                                params = Ext.urlDecode(currentQuery);

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
                            src: Ext.get('website-base-url').dom.getAttribute('url') + '?site=solarapparel&live_edit_view=true&site_preference=normal',
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
            },
            {
                region: 'south',
                xtype: 'taskbar'
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
