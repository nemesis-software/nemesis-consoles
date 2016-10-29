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
    entity: null,
    searchRestrictions: [],
    isFormField: true,
    submitValue: true,
    inputType: 'textfield',
    fieldLabel: '',
    values: [],
    entityId: '',
    afterRender: function () {
        this.callParent();
        this.fieldSet = Ext.create('Ext.form.FieldSet', {
            items: [
                {
                    id: this.entity.data.entityName + '-searchform-fieldset-restriction_' + this.emptyTxt,
                    isFormField: false,
                    submitValue: false,
                    xtype: 'combobox',
                    labelWidth: 5, // there's no label
                    store: Ext.create('Ext.data.ArrayStore', {
                        model: 'console.model.SearchRestriction',
                        storeId: 'searchRestrictions_' + this.initialConfig.fieldLabel,
                        data: this.searchRestrictions
                    }),
                    valueField: 'value',
                    displayField: 'displayName',
                    typeAhead: false,
                    formItemCls: 'field-restriction',
                    listeners: {
                        select: function (cb, record) {
                            if(record.data.value.indexOf("Null") != -1) {
                                Ext.getCmp(this.id.replace("restriction_", "query_")).setReadOnly(true);
                                //Ext.getCmp(this.id.replace("restriction_", "query_")).setValue("N/A")
                                Ext.getCmp(this.id.replace("restriction_", "query_")).getEl().setOpacity(0)
                            } else {
                                Ext.getCmp(this.id.replace("restriction_", "query_")).setReadOnly(false);
                                //Ext.getCmp(this.id.replace("restriction_", "query_")).setValue("");
                                Ext.getCmp(this.id.replace("restriction_", "query_")).getEl().setOpacity(100);
                            }

                        }
                    }
                },
                {
                    id: this.entity.data.entityName + '-searchform-fieldset-query_' + this.emptyTxt,
                    name: this.fieldLabel,
                    isFormField: false,
                    submitValue: false,
                    emptyText: this.emptyTxt,
                    xtype: this.inputType,
                    values: this.values, // case when we have enum, it needs possible values in order to be displayed
                    entityId: this.entityId, //case when we have entity relation
                    width: 300,
                    listeners: {
                    	specialkey: function(field, event) {
                    		if (event.getKey() == event.ENTER) {
                    			console.getApplication().getController('console.controller.content.search.SearchFormController').onSearchClicked(this);
                    	    }
                    	}.bind(this)
                    }
                }
            ],
            border: 0
        });
        this.fieldSet.render(this.inputEl);
    },
    listeners: {
    	'destroy': function() {
    		this.fieldSet.destroy();
    	}
    },
    reset: function () {
        this.fieldSet.items.items[0].reset();
        this.fieldSet.items.items[1].reset();
    }
});
