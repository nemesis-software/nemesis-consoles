Ext.define('console.view.ux.SearchField', {
    extend: 'Ext.form.field.Text',
    alias: 'widget.customtrigger',
    initComponent: function () {
        var me = this;

        me.triggerCls = 'x-form-clear-trigger';

        me.callParent(arguments);
    },
    // override onTriggerClick
    onTriggerClick: function () {
        this.setRawValue('');
        this.up('tablepanel').store.clearFilter();
    }
});
