Ext.define('console.view.NemesisEntitySection', {
    extend: 'Ext.panel.Panel',
    xtype: 'nemesisEntitySection',
    bodyPadding: 10,
    border: false,
    flex: 1,
    defaults: {
        anchor: '100% 100%'
    },
    layout: {
        type: 'table',
        tableAttrs: {
            style: {
                width: '100%',
                height: '100%'
            }
        },
        columns: 2
    }
});

Ext.define('console.view.field.NemesisBooleanField', {
    extend: 'Ext.form.RadioGroup',
    xtype: 'nemesisBooleanField',
    emptyText: this.id,
    columnWidth: .5,
    width: '95%',
    initComponent: function () {
        var me = this;
        this.items = [
            {
                inputValue: true,
                name: me.name,
                boxLabel: 'True'
            },
            {
                inputValue: false,
                name: me.name,
                boxLabel: 'False'
            },
            {
                inputValue: null,
                name: me.name,
                boxLabel: 'N/A'
            }
        ];
        me.callParent(arguments);
    },

    setValue: function (val) {
        if (val) {
            this.items.items[0].setValue(true);
        } else {
            if (val === false) {
                this.items.items[1].setValue(true);
            } else {
                this.items.items[2].setValue(true);
            }
        }
    }
});

Ext.define('console.view.field.NemesisTextField', {
    extend: 'Ext.form.field.Text',
    xtype: 'nemesisTextField',
    emptyText: this.name,
    name: null,
    width: '95%',
    columnWidth: .5,
    initComponent: function () {
        var me = this;
        me.emptyText = me.name;
        me.callParent(arguments);
    }
});

Ext.define('console.view.field.NemesisCollectionField', {
    extend: 'Ext.view.MultiSelector',
    xtype: 'nemesisCollectionField',
    width: '95%',
    colspan: 2,
    entity: null,
    ddReorder: true,
    //isFormField: true,
    fieldName: 'uid',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No records'
    },
    search: {
        field: 'uid'
    },
    listeners: {
        el: {
            contextmenu: function (event, ui, ctxmenu) {
                var me = this;
                event.stopEvent();
                var selected = Ext.getCmp(me.id).getSelection();
                this.ctxMenu = Ext.create('Ext.menu.Menu', {
                    items: [
                        {
                            itemId: 'edit',
                            handler: function () {
                                var record = selected[0];
                                console.log(record);
                                console.log(Ext.getCmp(me.id).entity);
                                var window = Ext.getCmp('backend-viewport').getWindow(record.data.uid);
                                if (!window) {
                                    var entityConfiguration = Ext.create("console.markup." + this.entity.data.id);
                                    console.log(record);
                                    window = Ext.getCmp('backend-viewport').createWindow({
                                        id: record,
                                        title: '[' + record + ' - ' + this.entity.data.name + ']',
                                        iconCls: this.entity.data.id,
                                        entity: Ext.create('console.model.Entity', {
                                            id: this.entity.data.id,
                                            name: this.entity.data.name,
                                            className: null,
                                            url: record.data.url
                                        }),
                                        sections: entityConfiguration.sections
                                    });
                                }
                                Ext.getCmp('backend-viewport').restoreWindow(window);
                            },
                            text: "Edit",
                            iconCls: 'edit',
                            disabled: selected.length == 0
                        },
                        '-',
                        {
                            itemId: 'copy',
                            handler: Ext.emptyFn,
                            text: 'Copy',
                            iconCls: 'copy',
                            disabled: selected.length == 0
                        },
                        {
                            itemId: 'paste',
                            handler: Ext.emptyFn,
                            text: 'Paste',
                            iconCls: 'paste'
                        },
                        {
                            itemId: 'clear',
                            handler: function () {
                                ui.value = null;
                            },
                            text: 'Clear',
                            iconCls: 'broom',
                            disabled: selected.length == 0
                        }
                    ]
                });
                this.ctxMenu.showAt(event.getXY());
            }
        }
    },

    initComponent: function () {
        var me = this;
        me.title = me.fieldLabel;
        me.iconCls = me.entityId;
        /*me.search.store = Ext.create('Ext.data.ArrayStore', {
         autoLoad: true,
         fields: ['uid', 'price'],
         data: [
         ['3m Co',71.72],
         ['Alcoa Inc',29.01],
         ['Boeing Co.',75.43]
         ]
         });*/

        me.callParent(arguments);
    },
    initStore: function (entity) {
        var me = this;
        if (typeof entity !== "undefined") {
            if (entity.data) {
                //list of entities
                me.entity = entity;

                me.setStore(Ext.create('Ext.data.ArrayStore', {
                    autoLoad: true,
                    autoSync: false,
                    fields: ['uid'],
                    proxy: {
                        type: 'rest',
                        url: entity.data.url,
                        useDefaultXhrHeader: false,
                        cors: true,
                        reader: {
                            type: 'json',
                            rootProperty: function (o) {
                                var data = [];
                                for (var key in o._embedded) {
                                    for (inner in o._embedded[key]) {
                                        data = data.concat({'uid': o._embedded[key][inner].uid});
                                    }
                                }
                                return data;
                            }
                        }
                    },
                    listeners: {
                        load: function () {
                            //me.setData();
                        }
                    }
                }));
            } else {
                // list of primitives
                //me.store.data = entity.data;
            }
        }
        return me;
    }
});

Ext.define('console.view.field.NemesisLocalizedTextField', {
    extend: 'Ext.form.field.Base',
    xtype: 'nemesisLocalizedTextField',
    requires: ['Ext.util.Format', 'Ext.XTemplate'],
    fieldCls: 'nemesisLocalizedField',
    fieldSubTpl: [
        '<div id="{id}" class="{fieldCls}"></div>',
        {
            compiled: true,
            disableFormats: true
        }
    ],
    searchRestrictions: [],
    langValuePairs: null,
    width: '95%',
    columnWidth: .5,
    afterRender: function () {
        var me = this;
        me.callParent();

        me.fieldSet = Ext.create('Ext.form.FieldSet', {
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    isFormField: false,
                    submitValue: false,
                    xtype: 'combobox',
                    store: Ext.create('console.store.Languages'),
                    listeners: {
                        beforeselect: function (cb, record, index) {
                            if (me.fieldSet) {
                                //save the input value (in case it was changed)
                                var lang = me.fieldSet.items.items[0].getValue();
                                var value = me.fieldSet.items.items[1].getValue();
                                me.langValuePairs [lang] = {"value": value};
                            }
                        },
                        select: function (cb, record) {
                            var textValue = "";
                            if (me.langValuePairs[record.data.isoCode] !== undefined) {
                                textValue = me.langValuePairs[record.data.isoCode].value;
                            }
                            if (me.fieldSet) {
                                me.fieldSet.items.items[1].setRawValue(textValue);
                            }
                        }
                    },
                    valueField: 'isoCode',
                    displayField: 'isoCode',
                    typeAhead: false,
                    formItemCls: 'field-restriction',
                    cls: 'localized-iso-dropdown',
                    width: 50,
                    value: Ext.get('rest-base-url').dom.getAttribute('locale')
                },
                {
                    isFormField: false,
                    submitValue: false,
                    emptyText: this.name,
                    xtype: 'textfield',
                    flex: 1
                }
            ],
            border: 0
        });
        this.fieldSet.render(this.inputEl);
    },
    setValue: function (langValuePairs) {
        if (langValuePairs) {
            this.langValuePairs = langValuePairs;
            var val = langValuePairs[Ext.get('rest-base-url').dom.getAttribute('locale')];
            if (val) {
                this.fieldSet.items.items[1].setValue(val.value);
            }
            return this;
        }
    },
    getSubmitValue: function () {
        var me = this;
        if (me.langValuePairs == null) {
            return me.langValuePairs;
        } else {
            var lang = this.fieldSet.items.items[0].getValue();
            var value = this.fieldSet.items.items[1].getValue();
            me.langValuePairs [lang] = {"value": value};
            return me.langValuePairs;
        }
    }
});

Ext.define('console.view.field.NemesisDateField', {
    extend: 'Ext.form.DateField',
    xtype: 'nemesisDateField',
    format: 'd-m-Y H:i:s',
    width: '95%',
    columnWidth: .5,
    initComponent: function () {
        var me = this;
        me.emptyText = me.name;
        me.callParent(arguments);
    }
});

Ext.define('console.view.field.NemesisDecimalField', {
    extend: 'Ext.form.NumberField',
    xtype: 'nemesisDecimalField',
    emptyText: this.id,
    columnWidth: .5,
    width: '95%',
    anchor: '100%',
    autoWidth: true,
    allowDecimals: true,
    decimalPrecision: 1,
    step: 0.1,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});

Ext.define('console.view.field.NemesisEntityField', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'nemesisEntityField',
    queryMode: 'remote',
    forceSelection: true,
    displayField: 'uid',
    valueField: 'uid',
    minChars: 1,
    multiSelect: false,
    hideTrigger: true,
    typeAhead: true,
    columnWidth: .5,
    width: '95%',
    jsonValue: null,
    queryParam: 'uid',
    entity: null,
    text: null,
    initComponent: function () {
        var me = this;
        me.emptyText = me.entityId;
        console.log(me.triggers);
        me.triggers['edit'].cls = 'x-form-entity-trigger ' + me.entityId;
        var store = Ext.create('Ext.data.Store', {
            autoLoad: false,
            autoSync: true,
            pageSize: 10,
            model: Ext.define('name', {
                extend: 'Ext.data.Model',
                fields: ['uid']
            }),
            proxy: {
                type: 'rest',
                url: Ext.get('rest-base-url').dom.getAttribute('url') + me.entityId + "/search/findByUidIsStartingWith/",
                limitParam: 'size',
                useDefaultXhrHeader: false,
                cors: true,
                reader: {
                    type: 'json',
                    rootProperty: function (o) {
                        var data = [];
                        for (var key in o._embedded) {
                            data = data.concat(o._embedded[key]);
                        }
                        return data;
                    },
                    totalProperty: 'page.totalElements'
                }
            }
        });
        this.store = store;

        this.on('beforequery', this.beforequery);
        this.on('render', this.render);

        me.callParent(arguments);
    },
    beforequery: function (e) {
        //take the input value... otherwise the query will pass the .getRawValue which doesn't work in this case.
        var inputValue = Ext.get(e.combo.id + "-inputEl").getValue();
        e.query = inputValue;
    },
    render: function (e) {
        //show trigger 1 ( the edit )
        this.triggerEl.elements[1].show();
    },
    triggers: {
        edit: {
            handler: function () {
                var me = this;
                if (me.entity) {
                    console.log(me.entity.data); //you need to initialize the entity from the url
                    var window = Ext.getCmp('backend-viewport').getWindow(this.entity.data.id);
                    if (!window) {
                        var entityConfiguration = Ext.create("console.markup." + me.entityId);
                        window = Ext.getCmp('backend-viewport').createWindow({
                            id: me.jsonValue,
                            title: '[' + me.jsonValue + ' - ' + this.entity.data.name + ']',
                            iconCls: me.entityId,
                            entity: this.entity,
                            sections: entityConfiguration.sections
                        });
                    }
                    Ext.getCmp('backend-viewport').restoreWindow(window);
                }
            }
        }
    },
    listeners: {
        el: {
            contextmenu: function (event, ui, ctxmenu) {
                var me = this;
                event.stopEvent();
                if (!me.ctxMenu) {
                    me.ctxMenu = Ext.create('Ext.menu.Menu', {
                        items: [
                            {
                                itemId: 'edit',
                                handler: function () {
                                    Ext.getCmp(me.id).onTriggerClick();
                                },
                                text: 'Edit',
                                iconCls: 'edit',
                                disabled: me.entity
                            },
                            '-',
                            {
                                itemId: 'copy',
                                handler: function () {
                                    Ext.getCmp('backend-viewport').clipboard = Ext.getCmp(me.id).entity;
                                },
                                text: 'Copy',
                                iconCls: 'copy',
                                disabled: ui.value == null
                            },
                            {
                                itemId: 'paste',
                                handler: function () {
                                    Ext.getCmp(me.id).setValue(Ext.getCmp('backend-viewport').clipboard);
                                },
                                text: 'Paste',
                                iconCls: 'paste'
                            },
                            {
                                itemId: 'clear',
                                handler: function () {
                                    ui.value = null;
                                },
                                text: 'Clear',
                                iconCls: 'broom',
                                disabled: ui.value == null
                            }
                        ]
                    });

                }
                me.ctxMenu.showAt(event.getXY());
            }
        }
    },
    setValue: function (record) {
        var me = this;
        var entity;
        //in extjs 5 the setValue can be multiselect and can support multiple values
        if (record instanceof Array) {
            entity = record[0];
        } else { //the set is invoked from the entityForm passing a single entity
            entity = record;
        }
        if (typeof entity !== "undefined" && entity !== null && typeof entity.data !== 'undefined') {
            var entityUrl;
            if (record instanceof Array) {
                entityUrl = entity.data._links.self.href;
            } else {
                entityUrl = entity.data.url;
            }
            me.entity = entity;
            //this.setRawValue("[" + entity.data.uid + " - " + entity.data.name + "]");
            //this.setRawValue(entity.data.url);
            Ext.Ajax.request({
                url: entityUrl,
                method: 'GET',
                success: function (res) {
                    var result = Ext.decode(res.responseText);
                    me.jsonValue = Ext.isDefined(result.uid) ? result.uid : result.content.uid;
                    me.setRawValue(me.jsonValue);
                },
                failure: function (responseObject) {
                    if (responseObject.status != 404) {
                        console.log(responseObject);
                    }
                }
            });
        } else {
            me.entity = null;
            //me.setRawValue(null);
        }
        return me;
    },

    getRawValue: function () {
        if (this.entity && typeof this.entity.data !== 'undefined') {
            return '{rel: "' + this.entity.id + '", href: "' + this.entity.data.url + '"}';
        } else {
            return "";
        }
    }
});

Ext.define('console.view.field.NemesisMediaField', {
    extend: 'console.view.field.NemesisEntityField',
    xtype: 'nemesisMediaField',
    tooltip: 'This is media'
});

Ext.define('console.view.field.NemesisEnumerationField', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'nemesisEnumField',
    columnWidth: .5,
    width: '95%',
    initComponent: function () {
        var me = this;
        var data = [];
        for (var i = 0; i < me.values.length; i++) {
            data.push([me.values[i]]);
        }
        Ext.apply(me, {
            emptyText: me.name,
            displayField: 'id',
            valueField: 'id',
            store: new Ext.data.ArrayStore({
                fields: ['id'],
                data: data
            })
        })
        me.callParent(arguments);
    }
});

Ext.define('console.view.field.NemesisHtmlEditor', {
    extend: 'Ext.form.field.HtmlEditor',
    xtype: 'nemesisHtmlEditor',
    id: '',
    emptyText: this.id,
    width: 500,
    enableColors: true,
    enableAlignments: true,
    colspan: 2,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});

Ext.define('console.view.field.NemesisIntegerField', {
    extend: 'Ext.form.NumberField',
    xtype: 'nemesisIntegerField',
    emptyText: this.id,
    columnWidth: .5,
    width: '95%',
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});

Ext.define('console.view.field.NemesisLocalizedRichtextField', {
    extend: 'Ext.form.field.Base',
    xtype: 'nemesisLocalizedRichtextField',
    requires: ['Ext.util.Format', 'Ext.XTemplate'],
    fieldCls: 'nemesisLocalizedRichtextField',
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
    langValuePairs: null,
    width: '97.5%',
    colspan: 2,
    afterRender: function () {
        var me = this;
        this.callParent();

        this.fieldSet = Ext.create('Ext.form.FieldSet', {
            defaults: {
                anchor: '100% 100%'
            },
            layout: {
                type: 'vbox',
                pack: 'start',
                align: 'stretch'
            },
            items: [
                {
                    isFormField: false,
                    submitValue: false,
                    xtype: 'combobox',
                    //bodyStyle: 'vertical-align: top',
                    //cls: "align-top",
                    //listConfig: {
                    //    getInnerTpl: function (displayField) {
                    //        return '<img src="resources/images/flag-{uid}.gif" class="icon"/> {' + displayField + '}';
                    //    }
                    //},
                    store: Ext.create('console.store.Languages'),
                    listeners: {
                        beforeselect: function (cb, record, index) {
                            //save the input value (in case it was changed)
                            if (me.fieldSet) {
                                var lang = me.fieldSet.items.items[0].getValue();
                                var value = me.fieldSet.items.items[1].getValue();
                                me.langValuePairs [lang] = {"value": value};
                            }
                        },
                        select: function (cb, record) {
                            //update the text field value
                            var textValue = "";
                            if (me.langValuePairs[record.data.isoCode] !== undefined) {
                                textValue = me.langValuePairs[record.data.isoCode].value;
                            }
                            me.fieldSet.items.items[1].setValue(textValue);
                        }
                    },
                    valueField: 'isoCode',
                    displayField: 'isoCode',
                    typeAhead: false,
                    formItemCls: 'field-restriction',
                    cls: 'localized-iso-dropdown',
                    width: 60,
                    value: Ext.get('rest-base-url').dom.getAttribute('locale')
                },
                {
                    isFormField: false,
                    submitValue: false,
                    emptyText: this.name,
                    xtype: 'htmleditor',
                    enableColors: true,
                    enableAlignments: true,
                    enableLists: true,
                    enableSourceEdit: true,
                    flex: 1,
                    columnWidth: .95
                }
            ],
            border: 0
        });
        this.fieldSet.render(this.inputEl);
    },
    setValue: function (langValuePairs) {
        if (typeof langValuePairs !== "undefined" && langValuePairs !== null) {
            this.langValuePairs = langValuePairs;
            var val = langValuePairs[Ext.get('rest-base-url').dom.getAttribute('locale')];
            if (val) {
                this.fieldSet.items.items[1].setValue(val.value);
            }
            return this;
        }
    },
    getRawValue: function () {
        var me = this;
        if (this.langValuePairs == null) {
            return me.langValuePairs;
        } else {
            var lang = this.fieldSet.items.items[0].getValue();
            var value = this.fieldSet.items.items[1].getValue();
            me.langValuePairs [lang] = {"value": value};
            return me.langValuePairs;
        }
    }
});

Ext.define('console.view.field.NemesisPasswordField', {
    extend: 'Ext.form.field.Text',
    xtype: 'nemesisPasswordField',
    emptyText: this.name,
    inputType: 'password',
    width: '95%',
    columnWidth: .5,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});


