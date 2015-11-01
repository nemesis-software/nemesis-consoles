Ext.define('console.view.content.search.SearchResults', {
    extend: 'Ext.grid.Panel',
    xtype: 'contentSearchResults',
    title: 'Results',
    layout: 'fit',
    frame: false,
    stateful: true,
    multiSelect: true,
    margins: '0, 5, 5, 5',
    entity: null,
    requires: [
        'console.view.field.NemesisTextField',
        'console.view.field.NemesisHtmlEditor'
    ],
    viewConfig: {
        //emptyText: 'No data to display'
    },
    constructor: function () {
        me = this;  // Here you store "this" in the closure
        me.callParent(arguments);
    },
    listeners: {
        itemdblclick: function (view, record, item, index, event) {
            this.onEditSelected(view, record, item, index, event);
        },
        itemcontextmenu: function (view, record, item, index, event) {
//			view.select(record);
            event.stopEvent();
            var ctxMenu = this.buildCtxMenu(view, record, item, index, event);

            ctxMenu.showAt(event.getXY());
        }
    },
    requires: [
        'console.model.Entity',
        'Ext.toolbar.Paging'
    ],
    initComponent: function () {
        var fields = searchData[this.entity.data.id + 'SearchResultMarkupStore'];
        for (var i = 0; i < fields.length; i++) {
            if (-1 != fields[i].name.indexOf('.en_GB')) {
                fields[i].mapping = Ext.bind(function (data) {
                    var fieldName = this.name.substring(0, this.name.indexOf('.'));
                    return data[fieldName][globalLang] && data[fieldName][globalLang].value || '';
                }, fields[i]);
            }
        }
        var columns = searchData[this.entity.data.id + 'SearchResultMarkup'];
        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            autoSync: false,
            pageSize: 10,
            remoteSort: true,
            model: Ext.define('name', {
                extend: 'Ext.data.Model',
                fields: fields
            }),
            proxy: {
                type: 'rest',
                url: Ext.get('rest-base-url').dom.getAttribute('url') + this.entity.data.id + '?projection=search',
                limitParam: 'size',
                startParam: '',
                simpleSortMode: true,
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
                },
                buildRequest: function (operation) {
                    var request = Ext.data.proxy.Rest.prototype.buildRequest.apply(this, arguments);
                    if (request._params && request._params.sort && request._params.dir) {
                        request._params.sort = request._params.sort + ',' + request._params.dir;
                        delete request._params.dir;
                    }
                    return request;

                }
            }
        });

        Ext.apply(this, {
            height: this.height,
            store: store,
            stripeRows: true,
            columnLines: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display",
            columns: columns,
            bbar: {
                xtype: 'pagingtoolbar',
                store: store,
                displayInfo: true,
                items: [
                    '-',
                    'Page size: ',
                    new Ext.form.ComboBox({
                        id: me.entity.data.id + '-search-results-paging-size',
                        name: 'pageSize',
                        width: 55,
                        store: new Ext.data.ArrayStore({
                            fields: ['id'],
                            data: [
                                ['10'],
                                ['50'],
                                ['100'],
                                ['1000']
                            ]
                        }),
                        mode: 'local',
                        value: '10',
                        listWidth: 40,
                        triggerAction: 'all',
                        displayField: 'id',
                        valueField: 'id',
                        editable: false,
                        forceSelection: true,
                        listeners: {
                            'select': function (combo, record) {
                                var bbar = combo.up();
                                console.log(record);
                                var newPageSize = parseInt(record['id'], 10);
                                bbar.up().getStore().pageSize = newPageSize;
                                store.load({
                                    params: {
                                        page: 1,
                                        size: newPageSize
                                    }
                                });
                                //I guess this is a bug.. the reload indeed fixes the pager .. however it doesn't fetch or update the data so only load() works
                                //bbar.up().getStore().reload({pageSize: bbar.up().getStore().pageSize});
                            }
                        }
                    })
                ]
            }
        });

        this.callParent(arguments);
    },
    buildCtxMenu: function (view, record, item, index, event) {
        var me = this;
        return Ext.create('Ext.menu.Menu', {
            cls: 'search-result-context-menu',
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
                },
                {
                    itemId: 'delete',
                    handler: function () {
                        Ext.MessageBox.confirm('Delete', 'Are you sure you want to delete it?', function (btn) {
                            if (btn === 'yes') {
                                if (view.getSelectionModel().getSelection().length > 0) {
                                    for (i = 0; i < view.getSelectionModel().getSelection().length; i++) {
                                        me.onDeleteSelected(view, view.getSelectionModel().getSelection()[i], item, index, event);
                                    }
                                }

                                Ext.toast({
                                    html: 'Deleted ' + view.getSelectionModel().getSelection().length + ' item(s) successfully!',
                                    closable: false,
                                    align: 't',
                                    slideInDuration: 400,
                                    minWidth: 400,
                                    autoCloseDelay: 500
                                });
                            } else {
                                //nothing
                            }
                        });
                    },
                    text: 'Delete',
                    iconCls: 'delete'
                },
                '-',
                {
                    itemId: 'excelexport',
                    handler: function () {
                        me.onExcelExport(view, record, item, index, event);
                    },
                    text: 'Export Excel',
                    iconCls: 'excelexport'
                },
                {
                    itemId: 'pdfexport',
                    handler: function () {
                        me.onPdfExport(view, record, item, index, event);
                    },
                    text: 'Export PDF',
                    iconCls: 'pdfexport'
                }
            ]
        });
    },
    doExport: function (view, record, item, index, event, exportType) {
        var entityNames = [];
        var selectedIds = [];
        if (view.getSelectionModel().getSelection().length > 0) {
            for (i = 0; i < view.getSelectionModel().getSelection().length; i++) {
                entityNames.push(view.getSelectionModel().getSelection()[i].data.entityName);
                selectedIds.push(view.getSelectionModel().getSelection()[i].data.pk);
            }
        }

        var form = Ext.create('Ext.form.Panel', {
            standardSubmit: true,
            url: Ext.get('rest-base-url').dom.getAttribute('url') + "backend/export-" + exportType,
            method: 'POST'
        });

        form.submit({
            target: '_blank',
            params: {
                entityNames: entityNames.join(','),
                ids: selectedIds.join(','),
                locale: Ext.getCmp('app-header-language-selector').getValue()
            }
        });

//        //var me = this;
//        Ext.Ajax.request({ url: Ext.get('rest-base-url').dom.getAttribute('url') + "backend/export-" + exportType,
//            method: 'POST',
//            params: {
//                entityNames : entityNames.join(','),
//                ids: selectedIds.join(','),
//                locale: Ext.getCmp('app-header-language-selector').getValue(),
//            },
//            success: function(responseObject) {
////                me.mask();
////                me.getStore().reload();
////                me.unmask();
//            },
//            failure: function(responseObject){
//                var error = Ext.decode(responseObject.responseText);
//                Ext.Msg.alert('Error', 'Error: ' +  error);
//            }
//        });
    },
    onExcelExport: function (view, record, item, index, event) {
        this.doExport(view, record, item, index, event, 'excel');
    },
    onPdfExport: function (view, record, item, index, event) {
        this.doExport(view, record, item, index, event, 'pdf');
    },
    onEditSelected: function (view, record, item, index, event) {
        var parentCmpId = 'backend-viewport';
        var currentToken = Ext.util.History.getToken();
        var href = Ext.isGecko ? record.data._links['self'].href : encodeURIComponent(record.data._links['self'].href);
        var newToken = encodeURIComponent(parentCmpId) + ':' + encodeURIComponent(record.data.uid) + ":" + encodeURIComponent(this.entity.data.name) + ":" + encodeURIComponent(this.entity.data.id) + ":" + encodeURIComponent(this.entity.data.className) + ":" + href;

        //if (currentToken === newToken) { //case when we click on a just closed window
        var window = Ext.getCmp(parentCmpId).getWindow(record.data.uid);
        if (!window) {
            var entityConfiguration = Ext.create("console.markup." + record.data.entityName);
            console.log(record);
            window = Ext.getCmp(parentCmpId).createWindow({
                id: record.data.uid,
                iconCls: record.data.entityName ? record.data.entityName : this.entity.data.id,
                entity: Ext.create('console.model.Entity', {
                    id: this.config.entity.data.id,
                    pk: record.data.pk,
                    name: this.entity.data.name,
                    className: this.entity.data.className,
                    url: record.data._links['self'].href,
                    synchronizable: entityConfiguration.synchronizable
                }),
                sections: entityConfiguration.sections
            });
        }
        Ext.getCmp(parentCmpId).restoreWindow(window);
        //} else {
        //    Ext.util.History.add(newToken);
        //}
    },
    onCopySelected: function (view, record, item, index, event) {
        Ext.getCmp('backend-viewport').clipboard = {
            data: {
                id: record.data.uid,
                pk: record.data.pk,
                name: this.entity.data.name,
                url: record.data._links.self.href,
                className: this.entity.data.className
            }
        };
    },
    onDeleteSelected: function (view, record, item, index, event) {
        var me = this;
        Ext.Ajax.request({
            url: record.data._links.self.href,
            method: 'DELETE',
            params: {},
            success: function (responseObject) {
                me.mask();
                me.getStore().reload();
                me.unmask();
            },
            failure: function (responseObject) {
                var error = Ext.decode(responseObject.responseText);
                Ext.Msg.alert('Error', 'Error: ' + error);
            }
        });
    }
});
