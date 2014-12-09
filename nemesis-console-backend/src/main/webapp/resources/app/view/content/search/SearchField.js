Ext.define('console.view.content.search.SearchField', {
    extend: 'Ext.form.field.Base',
    xtype: 'searchField',
    requires: ['Ext.util.Format', 'Ext.XTemplate'],
    fieldSubTpl: [
        '<div id="{id}" class="{fieldCls}"></div>',
        {
            compiled: true,
            disableFormats: true
        }
    ],
    searchRestrictions: [],
    isFormField: true,
    submitValue: true,
    afterRender: function () {
        this.callParent();

        this.fieldSet = Ext.create('Ext.form.FieldSet', {
            items: [
                {
                    isFormField: false,
                    submitValue: false,
                    xtype: 'combobox',
                    store: Ext.create('Ext.data.ArrayStore',
                        {
                            model: 'console.model.SearchRestriction',
                            storeId: 'searchRestrictions',
                            data: this.searchRestrictions
                        }),
                    valueField: 'value',
                    displayField: 'displayName',
                    typeAhead: false,
                    formItemCls: 'field-restriction'
                },
                {
                    isFormField: false,
                    submitValue: false,
                    emptyText: this.emptyText,
                    xtype: 'textfield',
                    width: '30%'
                }
            ],
            border: 0
        });
        this.fieldSet.render(this.inputEl);
    },
    reset: function () {
        this.fieldSet.items.items[0].reset();
        this.fieldSet.items.items[1].reset();
    }
});
