Ext.define('console.view.TabPanel', {
    extend: 'Ext.tab.Panel',
    xtype: 'tabPanel',
    id: 'tab-panel',
    entityNames: {},
    border: true,
    margins: '0, 0, 5, 0',
    layout: {
        type: 'table',
        align: 'stretch',
        columns: 1,
        tableAttrs: {
            style: {
                width: '100%',
                height: '100%'
            }
        }
    },
    listeners: {
        tabchange: function (tabPanel, tab) {
            Ext.util.History.add(encodeURIComponent(tabPanel.id) + ':' + encodeURIComponent(tab.itemId) + ":" + encodeURIComponent(tab.iconCls));
        },
        afterrender: function () {
            var self = this;
            //restore the state if the first page we are opening have a token
            self.restoreState(Ext.util.History.getToken());
            //attach listener on each browser back/forward
            Ext.History.on('change', function (token) {
                self.restoreState(token);
            });
        }
    },
    restoreState: function (token) {
        if (token) {
            try {
                var parts = token.split(":");
                var cmpId = decodeURIComponent(parts[0]);
                if (cmpId === 'tab-panel') {
                    var recordId = decodeURIComponent(parts[1]);
                    var iconCls = 'default-icon ' + decodeURIComponent(parts[2]);
                    if (!Ext.getCmp(cmpId).getComponent(recordId)) {
                        var entity = Ext.create("console.model.Entity", {
                            id: recordId,
                            name: recordId,
                            url: Ext.get('rest-base-url').dom.getAttribute('url') + recordId,
                            className: ''
                        });

                        Ext.getCmp(cmpId).add(Ext.create("console.view.content.Page", {
                            itemId: entity.data.id,
                            title: entity.data.name,
                            iconCls: 'default-icon ' + iconCls,
                            closable: true,
                            entity: entity,
                            contentPanel: this.contentPanel
                        })).show();
                    } else {
                        Ext.getCmp(cmpId).setActiveTab(recordId);
                    }
                } else if (cmpId === 'backend-viewport') {
                    var viewport = Ext.getCmp(cmpId);
                    var recordUid = decodeURIComponent(parts[1]);
                    var entityDataName = decodeURIComponent(parts[2]);
                    var entityDataId = decodeURIComponent(parts[3]);
                    var entityClassName = decodeURIComponent(parts[4]);
                    var entityHref = !Ext.isGecko ? decodeURIComponent(parts[5]) : token.substring(token.lastIndexOf(':http') + 1);
                    var window = viewport.getWindow(recordUid);
                    if (!window) {
                        var entityConfiguration = Ext.create("console.markup." + entityDataId);
                        window = viewport.createWindow({
                            id: recordUid,
                            iconCls: 'default-icon ' + entityDataId,
                            entity: Ext.create('console.model.Entity', {
                                id: entityDataId,
                                name: entityDataName,
                                className: entityClassName,
                                url: entityHref,
                                synchronizable: entityConfiguration.synchronizable
                            }),
                            sections: entityConfiguration.sections
                        });
                    }
                    viewport.restoreWindow(window);
                }
            } catch (err) {
                console.warn(err);
            }
        }
    }
});
