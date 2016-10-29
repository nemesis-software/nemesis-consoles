Ext.define('AdminConsole.view.portlet.IDAnalyzerPortlet', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'idAnalyzerPortlet',
    iconCls: 'key',
    frame: true,
    initComponent: function () {
        Ext.apply(this, {
            items: [
                {
                    emptyText: 'Enter ID...',
                    xtype: 'textfield',
                    id: 'id-input-field',
                    width: '75%'
                }
                ,
                '->',
                {
                    text: 'Decode',
                    iconCls: 'key',
                    id: 'decode-id-button',
                    handler: this.onDecodeClick
                }
            ]
        });
        this.callParent();
    },

    onDecodeClick: function () {
        Ext.Ajax.request({
            url: Ext.get('website-base-url').dom.getAttribute('url') + 'platform/idDiscriminator/' + Ext.getCmp('id-input-field').getValue(),
            method: 'GET',
            params: {},
            success: function (responseObject) {
                var result = Ext.decode(responseObject.responseText);
                Ext.getCmp('id-input-field').setValue(result);
            },
            failure: function (responseObject) {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: responseObject.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });

            }
        });
    }
});
