Ext.define('console.view.TooltipMixin', {
    extend: 'Ext.Mixin',

    mixinConfig: {
        id: 'tooltipmixin'
    },
    listeners: {
        render: function(c) {
            Ext.QuickTips.register({
                target: c.getEl().child('label'),
                text: this.description, //this here is the component class that uses the mixing itself.. you can imagine this method is writen on each component
                enabled: true,
                showDelay: 10,
                trackMouse: true,
                autoShow: true
            });
        }
    }
});


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
    mixins: ['console.view.TooltipMixin'],
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
    mixins: ['console.view.TooltipMixin'],
    xtype: 'nemesisTextField',
    emptyText: this.name,
    dirtyCls: 'dirty',
    name: null,
    width: '95%',
    columnWidth: .5,
    initComponent: function () {
        var me = this;
        me.emptyText = me.name;
        me.callParent(arguments);
    }
});

Ext.define('console.view.field.NemesisColorpickerField', {
    extend: 'Ext.ux.colorpick.Field',
    mixins: ['console.view.TooltipMixin'],
    xtype: 'nemesisColorpickerField',
    emptyText: this.name,
    dirtyCls: 'dirty',
    name: null,
    width: '95%',
    columnWidth: .5,
    defaultValue: 'FFFFFF',
    initComponent: function () {
        var me = this;
        me.emptyText = me.name;

        //override the default color, since in ext-ux.js the default value is RED
        Ext.apply(me, {
            value: me.defaultValue,
            color: me.defaultValue
        });

        me.callParent(arguments);
    },
    getSubmitValue: function () {
        //by default the color submits the value as 00FFFF but we expect it to be #00FFFF
        if(this.getValue() && !this.getValue().startsWith("#")) {
            return "#" + this.getValue();
        }
    },
    setValue: function () {
        var me = this;
        if(arguments && arguments[0]) {
            me.callParent(arguments);
        } else { //use default value in case of null
            me.callParent([me.defaultValue]);
        }
    }
});


Ext.define('console.view.field.NemesisCollectionField', {
    extend: 'Ext.view.MultiSelector',
    mixins: ['console.view.TooltipMixin'],
    xtype: 'nemesisCollectionField',
    cls: 'nemesis-collection-field',
    dirtyCls: 'dirty',
    width: '95%',
    colspan: 2,
    entity: null,
    ddReorder: true,
    //isFormField: true,
    fieldName: 'code',
    viewConfig: {
        deferEmptyText: false,
        emptyText: 'No records'
    },
    search: {
        field: 'code'
    },
    listeners: {
        el: {
            contextmenu: function (event, ui, ctxmenu) {
                var me = this;
                event.stopEvent();
                var selected = Ext.getCmp(this.id).getSelection();
                this.ctxMenu = Ext.create('Ext.menu.Menu', {
                    cls: 'collection-field-context-menu',
                    items: [
                        {
                            itemId: 'edit',
                            text: "Edit",
                            iconCls: 'edit',
                            disabled: selected.length == 0,
                            handler: function () {
                                var record = selected[0],
                                    viewport = Ext.ComponentQuery.query('viewport')[0],
                                    win = viewport.getWindow(record.data.id);

                                if (!win) {
                                    var entityConfiguration = Ext.create("console.markup." + record.data.name);
                                    win = viewport.createWindow({
                                        operation: 'edit',
                                        id: record.data.code,
                                        iconCls: this.entityId,
                                        entity: Ext.create('console.model.Entity', {
                                            entityName: this.entityId,
                                            entityId: record.data.id,
                                            entityClassName: record.data.name,
                                            url: record.data.url,
                                            synchronizable: entityConfiguration.synchronizable
                                        }),
                                        sections: entityConfiguration.sections
                                    });
                                }
                                viewport.restoreWindow(win);
                            }.bind(this.component)
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
                            text: 'Paste',
                            iconCls: 'paste',
                            handler: function () {
                                var clipboard = Ext.getCmp('viewport').clipboard;
                                if (clipboard.data) {
                                    var data = Ext.apply({code: clipboard.data.id, id: clipboard.data.id}, clipboard.data)
                                    this.store.insert(this.store.data.items.length, Ext.data.Record.create(data));
                                }
                            }.bind(this.component)
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
        me.iconCls = 'default-icon ' + me.entityId;

        if (me.entityId) {
            me.search.store = Ext.create('Ext.data.Store', {
                autoLoad: false,
                autoSync: true,
                pageSize: 10,
                model: Ext.define('name', {
                    extend: 'Ext.data.Model',
                    fields: ['code'],
                    idProperty: 'code'
                }),
                proxy: {
                    type: 'rest',
                    url: Ext.get('rest-base-url').dom.getAttribute('url') + me.entityId + "/search/findByCodeIsStartingWithIgnoreCase/",
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

            me.search.onSearchChange = function (searchField) {
                var value = searchField.getValue(),
                    trigger = searchField.getTrigger('clear');

                trigger.setHidden(!value);
                this.getSearchStore().load({
                    params: {
                        code: value,
                        projection: 'search'
                    }
                });
                this.search(value);
            }
        }

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
                    fields: ['code', 'id', 'name', 'url'],
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
                                        var record = o._embedded[key][inner];
                                        data = data.concat({
                                            'code': record.code,
                                            'id': record.id,
                                            'name': record.entityName,
                                            'url': record._links.self.href
                                        });
                                    }
                                }
                                return data;
                            }
                        }
                    }
                }));
            } else {
                // list of primitives
                //me.store.data = entity.data;
            }
        }

        me.store.on('load', function () {
            me.isDirty = false;
        });
        me.store.on('datachanged', function () {
            me.isDirty = true;
        });
        me.store.getValues = function () {
            var result = [];
            var items = this.data.items;
            var fields = this.model.fields;
            for (var i = 0; i < items.length; i++) {
                result.push("" + items[i].data.id);
            }
            return result;
        };
        return me;
    }
});

Ext.define('console.view.field.NemesisLocalizedTextField', {
    extend: 'Ext.form.field.Base',
    mixins: ['console.view.TooltipMixin'],
    dirtyCls: 'dirty',
    xtype: 'nemesisLocalizedTextField',
    cls: 'nemesis-localized-field',
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

        me.langValuePairs = {};
        me.fieldSet = Ext.create('Ext.form.FieldSet', {
            layout: {
                type: 'hbox',
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
                    displayField: 'name',
                    labelWidth: 0,
                    typeAhead: false,
                    formItemCls: 'field-restriction',
                    cls: 'localized-iso-dropdown',
                    value: Ext.get('rest-base-url').dom.getAttribute('locale'),
                    flex: 1
                },
                {
                    isFormField: false,
                    submitValue: false,
                    emptyText: this.name,
                    xtype: 'textfield',
                    flex: 3,
                    listeners: {
                        change: function () {
                            if (me.fieldSet) {
                                //save the input value in me.langValuePairs
                                var lang = me.fieldSet.items.items[0].getValue();
                                var value = me.fieldSet.items.items[1].getValue();
                                me.langValuePairs[lang] = {"value": value};
                            }
                        }
                    }
                }
            ],
            border: 0
        });
        this.fieldSet.render(this.inputEl);
    },
    setValue: function (langValuePairs) {
        if (langValuePairs) {
            var me = this;
            me.langValuePairs = langValuePairs;
            var val = langValuePairs[Ext.get('rest-base-url').dom.getAttribute('locale')];
            this.fieldSet.items.items[1].setValue(val && val.value || '');
            var valueAsString = Ext.JSON.encode(langValuePairs);
            me.setRawValue(me.valueToRaw(valueAsString));
            return me.mixins.field.setValue.call(me, valueAsString);
        }
    },
    getValue: function () {
        return Ext.JSON.encode(this.langValuePairs);
    },
    getSubmitValue: function () {
        return this.langValuePairs;
    }
});

Ext.define('console.view.field.NemesisDateField', {
    extend: 'Ext.form.DateField',
    mixins: ['console.view.TooltipMixin'],
    dirtyCls: 'dirty',
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

Ext.define('console.view.field.NemesisTextareaField', {
    extend: 'Ext.form.field.TextArea',
    mixins: ['console.view.TooltipMixin'],
    dirtyCls: 'dirty',
    width: '95%',
    columnWidth: .5,
    xtype: 'nemesisTextarea',
    initComponent: function () {
        var me = this;
        me.emptyText = me.name;
        me.callParent(arguments);
    }
});

Ext.define('console.view.field.NemesisDecimalField', {
    extend: 'Ext.form.NumberField',
    mixins: ['console.view.TooltipMixin'],
    xtype: 'nemesisDecimalField',
    dirtyCls: 'dirty',
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
    cls: 'nemesis-entity-field',
    dirtyCls: 'dirty',
    queryMode: 'remote',
    minChars: 1,
    isFormField: true,
    multiSelect: false,
    hideTrigger: true,
    typeAhead: true,
    columnWidth: .5,
    width: '95%',
    jsonValue: null,
    displayField: 'codeToDisplay',
    valueField: 'codeToDisplay',
    queryParam: 'code',
    entity: null,
    text: null,
    initComponent: function () {
        var me = this;
        me.emptyText = me.entityId;
        me.triggers['edit'].cls = 'x-form-entity-trigger ' + ' default-icon ' + me.entityId;
        me.synchronizable = Ext.create("console.markup." +  me.entityId).synchronizable;

        var restUrl = me.entityId == 'catalog_version' ? Ext.get('rest-base-url').dom.getAttribute('url') + me.entityId + "/search/findByCodeIsStartingWithIgnoreCaseOrCatalogCodeIsStartingWithIgnoreCase/" : Ext.get('rest-base-url').dom.getAttribute('url') + me.entityId + "/search/findByCodeIsStartingWithIgnoreCase/";
        var store = Ext.create('Ext.data.Store', {
            autoLoad: false,
            autoSync: true,
            pageSize: 10,
            model: Ext.define('name', {
                extend: 'Ext.data.Model',
                fields: ['codeToDisplay'],
                idProperty: 'codeToDisplay'
            }),
            proxy: {
                type: 'rest',
                url: restUrl,
                limitParam: 'size',
                useDefaultXhrHeader: false,
                extraParams: {
                    projection:'search'
                },
                cors: true,
                reader: {
                    type: 'json',
                    rootProperty: function (o) {
                        var data = [];
                        for (var key in o._embedded) {
                            data = data.concat(o._embedded[key]);
                        }
                        for(var i=0; i<data.length; i++) {
                        	data[i].codeToDisplay = me.entityId == 'catalog_version' ? data[i].catalogVersion : data[i].code + (me.synchronizable ? ' - ' + data[i].catalogVersion : '');
                        }
                        return data;
                    },
                    totalProperty: 'page.totalElements'
                }
            },
            listeners: {
                load: {
                    single: true,
                    fn: function () {
                        this.loaded = true;
                    }
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
        //also set the value as catalogCode in case we search method that needs both the catalogCode and the code, this will pass extra param
        this.store.proxy.extraParams.catalogCode = inputValue;
    },
    render: function (c) {
        //show trigger 1 ( the edit )
        this.triggerEl.elements[1].show();
        Ext.QuickTips.register({
            target: c.getEl().child('label'),
            text: this.description, //this here is the component class that uses the mixing itself.. you can imagine this method is writen on each component
            enabled: true,
            showDelay: 10,
            trackMouse: true,
            autoShow: true
        });
    },
    triggers: {
        edit: {
            handler: function () {
                this.onEdit();
            }
        }
    },
    onEdit: function () {
        var me = this;
        var entity = me.getEntity();
        if (entity) {
            var entityCode = me.jsonValue;
            if (!entityCode) return;
            
            var catalogVersion = null;
            var sep = ' - ';
            if (me.rawValue && 0 == me.rawValue.indexOf(entityCode + sep)) {
            	catalogVersion = me.rawValue.substring(entityCode.length + sep.length);
            }
            Ext.Ajax.request({
                url: entity.data.url || entity.data._links.self.href,
                method: 'GET',
                params: {
                    projection: 'search'
                },
                success: function (responseObject) {
                    var result = Ext.decode(responseObject.responseText);
                    var content = result;
                    var objectWindow = Ext.ComponentQuery.query('viewport')[0].getWindow(content.id);
                    if (objectWindow) {
                        Ext.getCmp('viewport').restoreWindow(objectWindow);
                    } else {
                        objectWindow = Ext.getCmp('viewport').createWindow({
                                operation: 'edit',
                                data: content,
                                title: '[' + entityCode + ' - ' + entity.data.entityName + ']',
                                iconCls: me.entityId,
                                sections: Ext.create("console.markup." + me.entityId).sections,
                                entity: Ext.create('console.model.Entity', {
                                    entityName: content.entityName,
                                    entityId: content.id,
                                    entityClassName: content.entityName,
                                    url: result._links.self.href,
                                    synchronizable: Ext.create("console.markup." + me.entityId).synchronizable
                                })
                            }
                        );
                        Ext.getCmp('viewport').restoreWindow(objectWindow);
                    }
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
    },
    validateValue: function (value) {
        var errs = this.getErrors(value);

        if ((value || value != "") && this.forceSelection && this.store.loaded) {
            var val = this.getRawValue(),
                rec = this.findRecord(this.displayField, val);

            if (!rec) {
                errs.push("Invalid Selection");
            } else {
                errs = [];
            }
        }

        var error = errs[0];

        if (error == undefined) {
            this.clearInvalid();
            return true;
        } else {
            this.markInvalid(error);
            return false;
        }
    },
    assertValue: function () {
        if (this.rawValue == this.originalValue && !this.store.isLoaded()) {
            return;
        }
        this.callParent(arguments);
    },
    listeners: {
        el: {
            contextmenu: function (event, ui, ctxmenu) {
                var me = this;
                event.stopEvent();
                if (!me.ctxMenu) {
                    me.ctxMenu = Ext.create('Ext.menu.Menu', {
                        cls: 'entity-field-context-menu',
                        items: [
                            {
                                itemId: 'edit',
                                handler: function () {
                                    Ext.getCmp(me.id).onEdit();
                                },
                                text: 'Edit',
                                iconCls: 'edit',
                                disabled: me.entity
                            },
                            '-',
                            {
                                itemId: 'copy',
                                handler: function () {
                                    Ext.getCmp('viewport').clipboard = Ext.getCmp(me.id).entity;
                                },
                                text: 'Copy',
                                iconCls: 'copy',
                                disabled: ui.value == null
                            },
                            {
                                itemId: 'paste',
                                handler: function () {
                                    Ext.getCmp(me.id).setValue(Ext.getCmp('viewport').clipboard, true);
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
    getCodeToDisplay: function(resultData) {
    	var me = this;
    	return (me.entityId == 'catalog_version' ? resultData.catalogVersion : me.jsonValue ? me.jsonValue + (me.synchronizable ? ' - ' + resultData.catalogVersion : '') : me.jsonValue);
    },
    setValue: function (record, loadStore, forceDirty) {
        var me = this;
        var entity;
        //in extjs 5 the setValue can be multiselect and can support multiple values
        if (record instanceof Array) {
            entity = record[0];
        } else { //the set is invoked from the entityForm passing a single entity
            entity = record;
        }
        if (entity && typeof entity.data !== 'undefined') {
            me.entity = entity;
        	if (entity.data.codeToDisplay) {
        		me.setRawValue(me.getCodeToDisplay(record.data));
        		return;
        	}
            var entityUrl = record instanceof Array ? entity.data._links.self.href : entity.data.url;
            //this.setRawValue(entity.data.url);
            Ext.Ajax.request({
                url: entityUrl,
                method: 'GET',
                params: {projection:'search'},
                success: function (res) {
                    var result = Ext.decode(res.responseText);
                    var resultData = Ext.isObject(result.content) ? result.content : result;
                    me.entityHref = result._links.self.href;
                    me.jsonValue = resultData.code;
                    me.setRawValue(me.getCodeToDisplay(resultData));

                    if (!forceDirty && !me.initialized) {
                        me.originalValue = me.rawValue;
                        me.initialized = true;
                    }

                    if (loadStore && !me.store.isLoaded()) {
                    	me.store.load({
                    		params: {
                    			code: me.jsonValue
                    		}
                    	});
                    }

                    if (me.entityId === 'media') {
                        me.tooltip = Ext.create('Ext.tip.ToolTip', {
                            target: me.getEl(),
                            trackMouse: true,
                            listeners: {
                                show: {
                                    single: true,
                                    fn: function (tip) {
                                        var url = resultData.previewUrl;
                                        var relUrl = resultData.url;
                                        me.tooltip.update("<img id='" + relUrl + "' src='" + url + "' style='max-width:400px'/>");
                                        document.getElementById(relUrl).onload = function (e) {
                                            me.tooltip.setHeight(e.srcElement.height);
                                        };
                                    }
                                }
                            }
                        });
                    }
                },
                failure: function (responseObject) {
                    if (responseObject.status != 404) {
                        console.log(responseObject);
                    } else {
                        me.jsonValue = null;
                        me.setRawValue(null);
                        if (me.entityId === 'media') {
                            me.tooltip.update(null);
                        }
                    }
                }
            });
        } else {
            me.entity = null;
            me.callParent(arguments);
        }
        return me;
    },
    getValue: function () {
        return this.rawValue;
    },
    getEntity: function() {
    	return this.entity || this.findRecord(this.displayField, this.getRawValue());
    },
    getSubmitValue: function () {
        if ('' == this.rawValue) return '';

        var record = this.store.getById(this.rawValue);
        // we must return something in the form of {"theme" : "https://localhost:8112/storefront/rest/site_theme/70933224484926368"}
        return record ? record.data._links.self.href : this.entityHref;
    },
    reset: function () {
        this.clearValue();
        // this.applyEmptyText();
        // this.getPicker().getSelectionModel().doMultiSelect([], false);
    }
});

Ext.define('console.view.field.NemesisMediaField', {
    xtype: 'nemesisMediaField',
    mixins: ['console.view.TooltipMixin', 'Ext.form.field.Field'],
    extend: 'Ext.form.FieldContainer',
    dirtyCls: 'dirty',
    tooltip: 'This is media',
    labelWidth: 50,
    minWidth: 150,
    colspan: 2,
    layout: {
        type: 'fit',
        pack: 'center',
        align: 'center'
    },
    fieldLabel: 'upload your file here..',
    //anchor : '100%',
    buttonText: 'Choose ..',
    previewLocation: 'top', // top, left, bottom
    previewSizeSmall: 60,
    //value: "https://dve2ovdl241xy.cloudfront.net/categories/category-mens-picture.png",
    /**
     * Original value of date when form is initiated
     */
    initComponent: function () {
        var me = this;

        var upLoadButton = {
            xtype: 'filefield',
            //name: 'photo',
            isFormField: false,
            labelWidth: 0,
            msgTarget: 'side',
            //anchor: '100%',
            width: 60,
            allowBlank: me.allowBlank,
            buttonText: me.buttonText,
            buttonOnly: true,
            inputId: Ext.id(),
            listeners: {
                change: function (input, value, opts) {
                    // can't get the file path directly from the component due to browser security that does not allow for
                    // javascript to access the local file system directly Browser will return a "fakePath"
                    // reference to the actual local file To work around this, we have to access
                    // the dom file directly from the input element!!!
                    var canvas = Ext.ComponentQuery.query('image[canvas="' + upLoadButton.inputId + '"]')[0];
                    var file = input.getEl().down('input[type=file]').dom.files[0];

                    if (file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/png" || file.type == "image/gif") {
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            canvas.setSrc(e.target.result);
                            me.file = file;
                            me.dirty = true;
                            me.syncContainerWidth();
                        };
                        reader.readAsDataURL(file);
                        canvas.show();
                    } else {
                        // canvas.setSrc(IMAGE_OFFSET +'images/no-photo.jpg');
                        canvas.hide();
                    }
                }
            }
        };

        var previewImage = {
            xtype: 'image',
            // src : IMAGE_OFFSET + 'images/no-photo.jpg',
            frame: true,
            canvas: upLoadButton.inputId,
            // resizable : true,
            maxWidth: 550,
            maxHeight: 230,
            listeners: {
                render: function (c) {
                    this.getEl().on('load', function (e) {
                        me.syncContainerWidth();
                    });
                }
            }
        };
        if (!Ext.isEmpty(me.value)) {
            previewImage.src = me.value;
        }

        // rename original name and id to avoid conflits
        me.items = [{
            xtype: 'form',
            autoEl: 'form',
            layout: {type: 'hbox', pack: 'center', align: 'center'},
            items: [upLoadButton, {
                xtype: 'button',
                icon: 'resources/css/images/crop.png'
            }, {
                xtype: 'button',
                icon: 'resources/css/images/rotateleft.png'
            }, {
                xtype: 'button',
                icon: 'resources/css/images/rotate.png'
            }]
        }];
        if (me.previewLocation == 'top') {
            me.items.splice(0, 0, previewImage);
        } else {
            me.items.push(previewImage);
        }
        if (me.previewLocation == 'left') {
            me.layout = 'hbox';
            upLoadButton.margin = '0 0 0 -24';
            previewImage.margin = '0 0 0 90'; // ALIGN THE IMAGE AFTER THE BUTTON
        }
        me.callParent(arguments);
    },
    getImageField: function () {
        return this.items.findBy(function (item) {
            return item.xtype == 'image'
        });
    },
    syncContainerWidth: function () {
        var me = this;
        var imgFld = me.getImageField();
        var imgEl = imgFld.el.dom;
        var w = imgEl.height > imgFld.maxHeight ? imgEl.width * imgFld.maxHeight / imgEl.height : imgEl.width;
        w = w > imgFld.maxWidth ? imgFld.maxWidth : w;
        me.items.findBy(function (item) {
            return item.xtype == 'form'
        }).setWidth(w);
    },
    setValue: function (value) {
        var previewImage = this.getImageField();
        if (!Ext.isEmpty(value)) {
            // if an existing value
            previewImage.setSrc(value);
            this.syncContainerWidth();
        }
    }
});

Ext.define('console.view.field.NemesisSimpleCollectionField', {
    extend: 'Ext.form.field.Tag',
    mixins: ['console.view.TooltipMixin'],
    dirtyCls: 'dirty',
    xtype: 'nemesisSimpleCollectionField',
    columnWidth: .5,
    width: '95%',
    //queryMode: 'local',
    //filterPickList: true,
    createNewOnEnter: true,
    createNewOnBlur: true,
    initComponent: function () {
        var me = this;
        me.triggers['picker'].cls = 'x-form-simple-collection-trigger';
        var data = [];
        //for (var i = 0; i < me.values.length; i++) {
        //    data.push(me.values[i]);
        //}
        Ext.apply(me, {
            store: data
        });
        me.callParent(arguments);
    }
});

Ext.define('console.view.field.NemesisEnumerationField', {
    extend: 'Ext.form.field.ComboBox',
    mixins: ['console.view.TooltipMixin'],
    dirtyCls: 'dirty',
    xtype: 'nemesisEnumField',
    columnWidth: .5,
    width: '95%',
    initComponent: function () {
        var me = this;
        var data = [];
        for (var i = 0; i < me.values.length; i++) {
            data.push(me.values[i]);
        }
        Ext.apply(me, {
            emptyText: me.name,
            store: data
        });
        me.callParent(arguments);
    }
});

Ext.define('console.view.field.NemesisHtmlEditor', {
    extend: 'Ext.form.field.HtmlEditor',
    mixins: ['console.view.TooltipMixin'],
    xtype: 'nemesisHtmlEditor',
    dirtyCls: 'dirty',
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
    mixins: ['console.view.TooltipMixin'],
    xtype: 'nemesisIntegerField',
    dirtyCls: 'dirty',
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
    mixins: ['console.view.TooltipMixin'],
    cls: 'nemesis-localized-richtext-field',
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

        me.langValuePairs = {};
        this.fieldSet = Ext.create('Ext.form.FieldSet', {
            defaults: {
                anchor: '100% 100%'
            },
            layout: {
                type: 'hbox',
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
                        select: function (cb, record) {
                            var textValue = "";
                            if (me.langValuePairs[record.data.isoCode] !== undefined) {
                                textValue = me.langValuePairs[record.data.isoCode].value;
                            }
                            if (me.fieldSet) {
                                me.fieldSet.items.items[1].setValue(textValue);
                            }
                        }
                    },
                    valueField: 'isoCode',
                    displayField: 'name',
                    labelWidth: 0,
                    typeAhead: false,
                    formItemCls: 'field-restriction',
                    cls: 'richtext-localized-iso-dropdown',
                    width: 60,
                    value: Ext.get('rest-base-url').dom.getAttribute('locale')
                },
                {
                    dirtyCls: 'dirty',
                    isFormField: false,
                    submitValue: false,
                    emptyText: this.name,
                    xtype: 'htmleditor',
                    enableColors: true,
                    enableAlignments: true,
                    enableLists: true,
                    enableSourceEdit: true,
                    flex: 1,
                    height: 180,
                    listeners: {
                        render: function(){
                            //workaround since editing sourceArea is not changing the value
                            var sourceTextArea = Ext.get(this.id + "-inputCmp-textareaEl");
                            sourceTextArea.on('keydown', function() {
                                var lang = me.fieldSet.items.items[0].getValue();
                                var value = sourceTextArea.getValue()
                                me.langValuePairs[lang] = {"value": value};
                            }, this, { buffer: 500 });
                        },
                        change: function () {
                            if (me.fieldSet) {
                                //save the input value in me.langValuePairs
                                var lang = me.fieldSet.items.items[0].getValue();
                                var value = me.fieldSet.items.items[1].getValue();
                                me.langValuePairs[lang] = {"value": value};
                            }
                        }
                    }
                }
            ],
            border: 0
        });
        this.fieldSet.render(this.inputEl);
    },
    setValue: function (langValuePairs) {
        if (langValuePairs) {
            var me = this;
            me.langValuePairs = langValuePairs;
            var val = langValuePairs[Ext.get('rest-base-url').dom.getAttribute('locale')];
            this.fieldSet.items.items[1].setValue(val && val.value || '');
            var valueAsString = Ext.JSON.encode(langValuePairs);
            me.setRawValue(me.valueToRaw(valueAsString));
            return me.mixins.field.setValue.call(me, valueAsString);
        }
    },
    getValue: function () {
        return Ext.JSON.encode(this.langValuePairs);
    },
    getSubmitValue: function () {
        return this.langValuePairs;
    }
});

Ext.define('console.view.field.NemesisPasswordField', {
    extend: 'Ext.form.field.Text',
    mixins: ['console.view.TooltipMixin'],
    xtype: 'nemesisPasswordField',
    dirtyCls: 'dirty',
    emptyText: this.name,
    inputType: 'password',
    width: '95%',
    columnWidth: .5,
    initComponent: function () {
        var me = this;
        me.callParent(arguments);
    }
});


