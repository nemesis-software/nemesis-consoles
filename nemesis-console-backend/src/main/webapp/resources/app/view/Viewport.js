Ext.define('console.view.Viewport', {
    extend: 'Ext.container.Viewport',
    id: 'backend-viewport',
    requires: [
        'Ext.layout.container.Border',
        'Ext.layout.container.HBox',
        'console.view.Header',
        'console.view.Menu',
        'console.view.ContentPanel',
        'console.view.field.NemesisTextField',
        'console.view.field.NemesisHtmlEditor',
        'console.view.content.EntityPopupWindow'
    ],
    contentPanel: Ext.create("console.view.ContentPanel", {
        xtype: 'contentPanel',
        margins: '5, 5, 5, 0'}),
    layout: 'border',
    initComponent: function () {
        var me = this;
        me.windows = new Ext.util.MixedCollection();

        this.items = [
            {
                region: 'north',
                xtype: 'appHeader',
                height: 35
            },
            {
                region: 'west',
                xtype: 'backendconsoleMenu',
                width: 250,
                minWidth: 100,
                split: true,
                stateful: true,
                stateId: 'mainnav.west',
                margins: '5, 0, 5, 5',
                collapsible: true,
                contentPanel: this.contentPanel,
                tools: [
                    {
                        type: 'refresh',
                        regionTool: true,
                        handler: this.reloadNavigation
                    }
                ]
            },
            {
                region: 'center',
                margins: '5, 5, 5, 0',
                xtype: 'contentPanel'
            }
        ];
        this.callParent();
    },

    reloadNavigation: function () {
        Ext.getCmp('navigation-tree').mask();
        Ext.getCmp('navigation-tree').getStore().reload();
        Ext.getCmp('navigation-tree').unmask();
    },

    updateActiveWindow: function () {
        var me = this, activeWindow = me.getActiveWindow(), last = me.lastActiveWindow;

        if (last && last.isDestroyed) {
            me.lastActiveWindow = null;
            return;
        }

        if (activeWindow === last) {
            return;
        }

        if (last) {
            if (last.el.dom) {
                last.addCls(me.inactiveWindowCls);
                last.removeCls(me.activeWindowCls);
            }
            last.active = false;
        }

        me.lastActiveWindow = activeWindow;

        if (activeWindow) {
            activeWindow.addCls(me.activeWindowCls);
            activeWindow.removeCls(me.inactiveWindowCls);
            activeWindow.minimized = false;
            activeWindow.active = true;
        }

        Ext.getCmp('taskbar').setActiveButton(activeWindow && activeWindow.taskButton);
    },

    getActiveWindow: function () {
        var win = null,
            zmgr = this.getDesktopZIndexManager();

        if (zmgr) {
            // We cannot rely on activate/deactive because that fires against non-Window
            // components in the stack.

            zmgr.eachTopDown(function (comp) {
                if (comp.isWindow && !comp.hidden) {
                    win = comp;
                    return false;
                }
                return true;
            });
        }

        return win;
    },

    getDesktopZIndexManager: function () {
        var windows = this.windows;
        // TODO - there has to be a better way to get this...
        return (windows.getCount() && windows.getAt(0).zIndexManager) || null;
    },

    createWindow: function (config) {
        var me = this;
        var win = Ext.create('console.view.content.EntityPopupWindow', {id: 'w_id_' + config.id, iconCls: config.iconCls, entity: config.entity, entityFields: config.sections});
        me.windows.add(win);
        win.taskButton = Ext.getCmp('taskbar').addTaskButton(win);
        win.animateTarget = win.taskButton.el;
        win.on({
            activate: me.updateActiveWindow,
            beforeshow: me.updateActiveWindow,
            deactivate: me.updateActiveWindow,
            minimize: me.minimizeWindow,
            destroy: me.onWindowClose,
            scope: me
        });

        win.on({
            boxready: function () {
                win.dd.xTickSize = me.xTickSize;
                win.dd.yTickSize = me.yTickSize;

                if (win.resizer) {
                    win.resizer.widthIncrement = me.xTickSize;
                    win.resizer.heightIncrement = me.yTickSize;
                }
            },
            single: true
        });

        win.doClose = function () {
            win.doClose = Ext.emptyFn; // dblclick can call again...
            win.el.disableShadow();
            win.el.fadeOut({
                listeners: {
                    afteranimate: function () {
                        win.destroy();
                    }
                }
            });
        };
        return win;
    },

    minimizeWindow: function (win) {
        win.minimized = true;
        win.hide();
    },

    onWindowClose: function (win) {
        var me = this;
        me.windows.remove(win);
        Ext.getCmp('taskbar').removeTaskButton(win.taskButton);
        me.updateActiveWindow();
    },

    getWindow: function (id) {
        return this.windows.get('w_id_' + id);
    },

    restoreWindow: function (win) {
        if (win.isVisible()) {
            win.restore();
            win.toFront();
        } else {
            win.show();
        }
        return win;
    }
});
