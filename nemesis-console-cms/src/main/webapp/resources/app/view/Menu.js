Ext.define('console.view.Menu', {
    extend: 'Ext.panel.Panel',
    xtype: 'cmsconsoleMenu',

    requires: [
        'Ext.view.View',
        'Ext.XTemplate',
        'Ext.layout.container.Accordion'
    ],
    title: 'Configure',
    rootVisible: false,
    cls: 'examples-list',
    layout: 'accordion',
    defaults: {
        bodyStyle: 'overflow-y:auto;'
    },
    lines: false,
    border: false,
    autoScroll: true,
    useArrows: true,
    initComponent: function () {
        var me = this;

        Ext.apply(me, {
            items: [
                Ext.create('console.components.menu.PageTemplates'),
                Ext.create('console.components.menu.Pages'),
                Ext.create('console.components.menu.PageSlots'),
                Ext.create('console.components.menu.Widgets'),
                Ext.create('console.components.menu.Emails')
            ]
        });

        me.callParent();
    },
    somefn: function (uid) {
        alert(uid);
    }
});
