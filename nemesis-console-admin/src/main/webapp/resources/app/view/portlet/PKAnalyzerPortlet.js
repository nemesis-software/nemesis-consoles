Ext.define('AdminConsole.view.portlet.PKAnalyzerPortlet', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'pkAnalyzerPortlet',
    iconCls: 'key',
    frame: true,
    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    emptyText: 'Enter PK...',
                    xtype: 'textfield',
                    id: 'pk-input-field',
                    width: '75%'
                }
                ,
                '->',
                {
                    text: 'Decode',
                    iconCls: 'key',
                    id: 'decode-pk-button',
                    handler: this.onDecodeClick
                }
            ]
        });
        this.callParent();
    },

    onDecodeClick: function () {
        Ext.Ajax.request({
            url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/typecode/' + Ext.getCmp('pk-input-field').getValue(),
            method: 'GET',
            params: {},
            success: function (responseObject) {
                var result = Ext.decode(responseObject.responseText);
                Ext.getCmp('pk-input-field').setValue(result);
            },
            failure: function (responseObject) {
                var error = Ext.decode(responseObject.responseText);
                Ext.Msg.alert('Error', 'Error: ' + error);
            }
        });
    }
});
