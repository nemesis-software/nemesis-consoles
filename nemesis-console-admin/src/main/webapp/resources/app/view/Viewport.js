Ext.define('AdminConsole.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.layout.container.Border',
        'Ext.layout.container.HBox',
        'Ext.dashboard.Dashboard',
        'AdminConsole.view.portlet.PKAnalyzerPortlet',
        'AdminConsole.view.portlet.MemoryUsagePortlet',
        'AdminConsole.view.portlet.PlatformActionsPortlet',
        'AdminConsole.view.portlet.PlatformInfoPortlet',
        'AdminConsole.view.portlet.PlatformHealthPortlet',
        'AdminConsole.view.portlet.PlatformTestsPortlet',
        'AdminConsole.view.portlet.SystemLoggersPortlet',
        'AdminConsole.view.portlet.LogViewerPortlet',
        'AdminConsole.view.portlet.JdbcLogPortlet',
        'AdminConsole.view.portlet.SystemPropertiesPortlet',
        'AdminConsole.view.portlet.ImportCSVPortlet',
        'AdminConsole.view.portlet.DBSearchPortlet',
        'AdminConsole.view.portlet.SpringBeansPortlet'
    ],
    layout: 'border',
    getTools: function() {
        return [{
            xtype: 'tool',
            type: 'refresh',
            tooltip: 'Reload portlet',
            callback: function(owner, tool, event) {
                owner.setLoading('Loading...');
                Ext.defer(function() {
                    owner.setLoading(false);
                }, 2000);
            }
        }, {
            xtype: 'tool',
            type: 'unpin',
            tooltip: 'Pin portlet to position'
        }, {
            xtype: 'tool',
            type: 'maximize',
            tooltip: 'Maximize portlet',
            callback: function(event, toolEl, panelHeader) {
                    // refresh logic
                    // console.log('ccccc');
                    // alert('aaa');
                }
                // handler: function(a, b, c) {
                //     alert('bbbb');
                // }
        }];
    },
    contentCookieName: "nemesis-admin-portlets-layout",
    storeInCookie: function(cookieValue) {
        var d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toGMTString();
        document.cookie = this.contentCookieName + "=" + cookieValue + "; " + expires;
    },
    restoreFromCookie: function() {
        var cookiesArray = document.cookie.split(';');
        for (var i = 0; i < cookiesArray.length; i++) {
            var cookie = cookiesArray[i].trim();
            if (cookie.indexOf(this.contentCookieName) == 0) {
                var value = cookie.substring(this.contentCookieName.length + 1);
                if (value) {
                    var result = {};
                    var portletsArray = value.split("^");
                    for (i = 1; i < portletsArray.length; i++) { //skip first since it is ""
                        var id = portletsArray[i].substring(0, portletsArray[i].indexOf("="));
                        var position = portletsArray[i].substring(portletsArray[i].indexOf("=") + 1, portletsArray[i].indexOf("#"));
                        var column = portletsArray[i].substring(portletsArray[i].indexOf("#") + 1, portletsArray[i].indexOf("*"));
                        var isHidden = portletsArray[i].substring(portletsArray[i].indexOf("*") + 1, portletsArray[i].indexOf("$"));
                        isHidden = (isHidden === 'true'); // convert to boolean, otherwise it true/false are strings
                        result[id] = {
                            id: id,
                            position: position,
                            column: column,
                            hidden: isHidden
                        };
                    }
                    return result;
                }
            }
        }
        return [];
    },
    getDefaultContent: function(persistedState) {
        var self = this;
        var defaultContent = new Array(8); //TODO change to the final number of elements

        defaultContent[parseInt("portlet-sys-properties" in persistedState ? persistedState["portlet-sys-properties"].position : 0)] = {
            type: 'systemPropertiesPortlet',
            columnIndex: parseInt("portlet-sys-properties" in persistedState ? persistedState["portlet-sys-properties"].column : 0),
            height: 300,
            hidden: "portlet-sys-properties" in persistedState ? persistedState["portlet-sys-properties"].hidden : false,
            id: "portlet-sys-properties"
        };

        defaultContent[parseInt("portlet-log4j-levels" in persistedState ? persistedState["portlet-log4j-levels"].position : 1)] = {
            type: 'systemLoggersPortlet',
            columnIndex: parseInt("portlet-log4j-levels" in persistedState ? persistedState["portlet-log4j-levels"].column : 0),
            height: 300,
            hidden: "portlet-log4j-levels" in persistedState ? persistedState["portlet-log4j-levels"].hidden : false,
            id: "portlet-log4j-levels"
        };

        defaultContent[parseInt("portlet-platform-tests" in persistedState ? persistedState["portlet-platform-tests"].position : 2)] = {
            type: 'platformTestsPortlet',
            columnIndex: parseInt("portlet-platform-tests" in persistedState ? persistedState["portlet-platform-tests"].column : 0),
            height: 300,
            hidden: "portlet-platform-tests" in persistedState ? persistedState["portlet-platform-tests"].hidden : false,
            id: "portlet-platform-tests"
        };

        defaultContent[parseInt("portlet-platform-actions" in persistedState ? persistedState["portlet-platform-actions"].position : 3)] = {
            type: 'platformActionsPortlet',
            columnIndex: parseInt("portlet-platform-actions" in persistedState ? persistedState["portlet-platform-actions"].column : 1),
            height: 20,
            hidden: "portlet-platform-actions" in persistedState ? persistedState["portlet-platform-actions"].hidden : false,
            id: "portlet-platform-actions"
        };

        defaultContent[parseInt("portlet-pk-analyzer" in persistedState ? persistedState["portlet-pk-analyzer"].position : 4)] = {
            type: 'pkAnalyzerPortlet',
            columnIndex: parseInt("portlet-pk-analyzer" in persistedState ? persistedState["portlet-pk-analyzer"].column : 1),
            height: 20,
            hidden: "portlet-pk-analyzer" in persistedState ? persistedState["portlet-pk-analyzer"].hidden : false,
            id: "portlet-pk-analyzer"
        };

        defaultContent[parseInt("portlet-csv-import" in persistedState ? persistedState["portlet-csv-import"].position : 5)] = {
            type: 'importCSVPortlet',
            columnIndex: parseInt("portlet-csv-import" in persistedState ? persistedState["portlet-csv-import"].column : 1),
            height: 300,
            hidden: "portlet-csv-import" in persistedState ? persistedState["portlet-csv-import"].hidden : false,
            id: "portlet-csv-import"
        };

        defaultContent[parseInt("portlet-platform-info" in persistedState ? persistedState["portlet-platform-info"].position : 6)] = {
            type: 'platformInfoPortlet',
            columnIndex: parseInt("portlet-platform-info" in persistedState ? persistedState["portlet-platform-info"].column : 1),
            height: 340,
            hidden: "portlet-platform-info" in persistedState ? persistedState["portlet-platform-info"].hidden : false,
            id: "portlet-platform-info"
        };

        defaultContent[parseInt("portlet-memory-usage" in persistedState ? persistedState["portlet-memory-usage"].position : 7)] = {
            type: 'momoryUsagePortlet',
            columnIndex: parseInt("portlet-memory-usage" in persistedState ? persistedState["portlet-memory-usage"].column : 2),
            height: 300,
            hidden: "portlet-memory-usage" in persistedState ? persistedState["portlet-memory-usage"].hidden : false,
            id: "portlet-memory-usage"
        };

        defaultContent[parseInt("portlet-platform-health" in persistedState ? persistedState["portlet-platform-health"].position : 8)] = {
            type: 'platformHealthPortlet',
            columnIndex: parseInt("portlet-platform-health" in persistedState ? persistedState["portlet-platform-health"].column : 2),
            height: 120,
            hidden: "portlet-platform-health" in persistedState ? persistedState["portlet-platform-health"].hidden : false,
            id: "portlet-platform-health"
        };

        defaultContent[parseInt("portlet-spring-beans" in persistedState ? persistedState["portlet-spring-beans"].position : 9)] = {
            type: 'springBeansPortlet',
            columnIndex: parseInt("portlet-spring-beans" in persistedState ? persistedState["portlet-spring-beans"].column : 2),
            height: 300,
            hidden: "portlet-spring-beans" in persistedState ? persistedState["portlet-spring-beans"].hidden : false,
            id: "portlet-spring-beans"
        };

        // defaultContent[parseInt("portlet-db-search" in persistedState ? persistedState["portlet-db-search"].position : 10)] = {
        //     type: 'sqlSearchPortlet',
        //     columnIndex: parseInt(persistedState["portlet-db-search"].column || 2),
        //     height: 300,
        //     hidden: false,
        //     id: ''
        // };

        return defaultContent;
    },
    initComponent: function() {
        var persistedState = this.restoreFromCookie();
        var self = this;
        Ext.apply(this, {
            id: 'app-viewport',
            layout: {
                type: 'border',
                padding: '0'
            },
            items: [{
                id: 'app-header',
                xtype: 'appHeader',
                region: 'north'
            }, {
                id: 'app-dashboard',
                xtype: 'dashboard',
                reference: 'dashboard',
                itemId: 'adminDashboard',
                region: 'center',
                listeners: {
                    afterlayout: function(store, operation, eOpts) {
                        var cookieValue = "";
                        var portletsArray = Ext.getCmp("app-dashboard").getState().items;
                        for (i = 0; i < portletsArray.length; i++) {
                            var isHidden = Ext.getCmp(portletsArray[i].id).isHidden();
                            cookieValue = cookieValue + "^" + portletsArray[i].id + "=" + i + "#" + portletsArray[i].columnIndex + "*" + isHidden + "$";
                        }
                        self.storeInCookie(cookieValue);
                    },
                    afterrender: function() {
                        var portlets = self.getDefaultContent(self.restoreFromCookie());
                        for (var i = 0; i < portlets.length; i++) {
                            if (portlets[i].hidden) {
                                Ext.getCmp(portlets[i].id).hide();
                                Ext.getCmp(portlets[i].type + 'Btn').enable();
                            }
                        }
                    }
                },
                columnWidths: [
                    0.40,
                    0.25,
                    0.35
                ],
                parts: {

                    // sqlSearchPortlet: {
                    //     viewTemplate: {
                    //         id: 'portlet-db-search',
                    //         title: 'Database Search',
                    //         iconCls: 'database-sql-image',
                    //         tools: this.getTools(),
                    //         items: Ext.create('AdminConsole.view.portlet.DBSearchPortlet')
                    //     }
                    // },

                    importCSVPortlet: {
                        viewTemplate: {
                            id: 'portlet-csv-import',
                            title: 'CSV Import',
                            iconCls: 'database-csv-image',
                            closeAction: 'hide',
                            tools: this.getTools(),
                            items: [{
                                xtype: 'importCSVPortlet'
                            }],
                            listeners: {
                                close: function(panel, eOpts) {
                                    if (Ext.getCmp('importCSVPortletBtn')) {
                                        var btn = Ext.getCmp('importCSVPortletBtn');
                                        btn.enable();
                                    }
                                }
                            }
                        }
                    },

                    momoryUsagePortlet: {
                        viewTemplate: {
                            id: 'portlet-memory-usage',
                            title: 'Resource Usage',
                            iconCls: 'system-monitor',
                            closeAction: 'hide',
                            items: [{
                                xtype: 'memoryUsagePortlet'
                            }],
                            listeners: {
                                close: function(panel, eOpts) {
                                    if (Ext.getCmp('momoryUsagePortletBtn')) {
                                        var btn = Ext.getCmp('momoryUsagePortletBtn');
                                        btn.enable();
                                    }
                                }
                            }
                        }
                    },

                    pkAnalyzerPortlet: {
                        viewTemplate: {
                            id: 'portlet-pk-analyzer',
                            title: 'PK Analyzer',
                            iconCls: 'key',
                            closeAction: 'hide',
                            tools: this.getTools(),
                            items: [{
                                xtype: 'pkAnalyzerPortlet'
                            }],
                            listeners: {
                                close: function(panel, eOpts) {
                                    if (Ext.getCmp('pkAnalyzerPortletBtn')) {
                                        var btn = Ext.getCmp('pkAnalyzerPortletBtn');
                                        btn.enable();
                                    }
                                }
                            }
                        }
                    },

                    platformActionsPortlet: {
                        viewTemplate: {
                            id: 'portlet-platform-actions',
                            title: 'Platform Actions',
                            iconCls: 'warning',
                            closeAction: 'hide',
                            tools: this.getTools(),
                            items: [{
                                xtype: 'platformActionsPortlet'
                            }],
                            listeners: {
                                close: function(panel, eOpts) {
                                    if (Ext.getCmp('platformActionsPortletBtn')) {
                                        var btn = Ext.getCmp('platformActionsPortletBtn');
                                        btn.enable();
                                    }
                                }
                            }
                        }
                    },

                    platformInfoPortlet: {
                        viewTemplate: {
                            id: 'portlet-platform-info',
                            title: 'Platform Info',
                            iconCls: 'information',
                            closeAction: 'hide',
                            tools: this.getTools(),
                            items: [{
                                xtype: 'platformInfoPortlet'
                            }],
                            listeners: {
                                close: function(panel, eOpts) {
                                    if (Ext.getCmp('platformInfoPortletBtn')) {
                                        var btn = Ext.getCmp('platformInfoPortletBtn');
                                        btn.enable();
                                    }
                                }
                            }
                        }
                    },

                    platformHealthPortlet: {
                        viewTemplate: {
                            id: 'portlet-platform-health',
                            title: 'Platform Health',
                            closeAction: 'hide',
                            tools: this.getTools(),
                            items: [{
                                xtype: 'platformHealthPortlet'
                            }],
                            listeners: {
                                close: function(panel, eOpts) {
                                    if (Ext.getCmp('platformHealthPortletBtn')) {
                                        var btn = Ext.getCmp('platformHealthPortletBtn');
                                        btn.enable();
                                    }
                                }
                            }
                        }
                    },

                    platformTestsPortlet: {
                        viewTemplate: {
                            id: 'portlet-platform-tests',
                            title: 'Platform tests',
                            iconCls: 'junit',
                            closeAction: 'hide',
                            tools: this.getTools(),
                            items: [{
                                xtype: 'platformTestsPortlet'
                            }],
                            listeners: {
                                close: function(panel, eOpts) {
                                    if (Ext.getCmp('platformTestsPortletBtn')) {
                                        var btn = Ext.getCmp('platformTestsPortletBtn');
                                        btn.enable();
                                    }
                                }
                            }
                        }
                    },

                    systemLoggersPortlet: {
                        viewTemplate: {
                            id: 'portlet-log4j-levels',
                            title: 'Log4J',
                            iconCls: 'logs',
                            closeAction: 'hide',
                            tools: this.getTools(),
                            items: [{
                                xtype: 'tabpanel',
                                items: [{
                                    title: 'Log',
                                    itemId: 'log-display',
                                    id: 'log-display',
                                    iconCls: 'logs',
                                    xtype: 'logViewerPortlet'
                                }, {
                                    title: 'Levels',
                                    itemId: 'log-levels',
                                    id: 'log-levels',
                                    iconCls: 'log-levels',
                                    xtype: 'systemLoggersPortlet'
                                }, {
                                    title: 'JDBC Log',
                                    itemId: 'jdbc-log',
                                    id: 'jdbc-log',
                                    iconCls: 'logs',
                                    xtype: 'jdbcLogPortlet'
                                }]
                            }],
                            listeners: {
                                close: function(panel, eOpts) {
                                    if (Ext.getCmp('systemLoggersPortletBtn')) {
                                        var btn = Ext.getCmp('systemLoggersPortletBtn');
                                        btn.enable();
                                    }
                                }
                            }
                        }
                    },

                    systemPropertiesPortlet: {
                        viewTemplate: {
                            id: 'portlet-sys-properties',
                            title: 'System Properties',
                            iconCls: 'property',
                            closeAction: 'hide',
                            tools: this.getTools(),
                            items: [{
                                xtype: 'systemPropertiesPortlet'
                            }],
                            listeners: {
                                close: function(panel, eOpts) {
                                    if (Ext.getCmp('systemPropertiesPortletBtn')) {
                                        var btn = Ext.getCmp('systemPropertiesPortletBtn');
                                        btn.enable();
                                    }
                                }
                            }
                        }
                    },

                    springBeansPortlet: {
                        viewTemplate: {
                            id: 'portlet-spring-beans',
                            title: 'Spring Beans',
                            iconCls: 'beans',
                            closeAction: 'hide',
                            tools: this.getTools(),
                            items: [{
                                xtype: 'springBeansPortlet'
                            }],
                            listeners: {
                                close: function(panel, eOpts) {
                                    if (Ext.getCmp('springBeansPortletBtn')) {
                                        var btn = Ext.getCmp('springBeansPortletBtn');
                                        btn.enable();
                                    }
                                }
                            }
                        }
                    }
                },
                defaultContent: self.getDefaultContent(persistedState)
            }]
        });

        this.callParent(arguments);
    }
});