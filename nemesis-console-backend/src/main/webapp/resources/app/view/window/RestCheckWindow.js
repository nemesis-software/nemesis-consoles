
Ext.define('console.view.window.RestCheckWindow', {
    extend: 'Ext.window.Window',
    xtype: 'restCheckPopupWindow',
    draggable: false,
    closable: false,
    modal: true,
    resizable: false,
    width: 300,
    height: 150,
    title: 'No connection to the REST API',
    layout: 'border',
    constructor: function () {
        this.callParent(arguments);
    },
    initComponent: function () {
        this.items = [
            {
                region: 'center',
                xtype: 'tbtext', text: 'Currently there is no connection to the REST API. <br/> Make sure the URL ' +
                '<a href="' + Ext.get('rest-base-url').dom.getAttribute('url') + '" target="_blank">' + Ext.get('rest-base-url').dom.getAttribute('url') + '</a> <br/> is accessible and click retry.'
            },
            {
                region: 'south',
                xtype: 'button',
                text: 'Retry',
                listeners: {
                    click: function () {
                        this.up().close();
                        Ext.getCmp('viewport').setLoading(true);
                        location.reload();
                    }
                }
            }
        ];

        this.callParent();
    }
});
