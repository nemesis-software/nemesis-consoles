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
    dirtyCls: 'dirty',
    name: null,
    width: '95%',
    columnWmeddth: .5,
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
                var selected = Ext.getCmp(this.id).getSelection();
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
                                    var entityConfiguration = Ext.create("console.markup." + record.data.name);
                                    console.log(record);
                                    window = Ext.getCmp('backend-viewport').createWindow({
                                        id: record.data.uid,
                                        iconCls: this.entityId,
                                        entity: Ext.create('console.model.Entity', {
                                            id: this.entityId,
                                            name: record.data.name,
                                            className: this.entityId,
                                            url: record.data.url,
                                            synchronizable: entityConfiguration.synchronizable
                                        }),
                                        sections: entityConfiguration.sections
                                    });
                                }
                                Ext.getCmp('backend-viewport').restoreWindow(window);
                            }.bind(this.component),
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
                    fields: ['uid', 'pk', 'name', 'url'],
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
                                            'id': record.id,
                                            'uid': record.uid,
                                            'pk': record.pk,
                                            'name': record.entityName,
                                            'url': record._links.self.href
                                        });
                                    }
                                }
                                return data;
                            }
                        }
                    },
                    listeners: {
                        load: function () {
                            me.isDirty = false;
                        },
                        datachanged: function () {
                            me.isDirty = true;
                        }
                    },
                    getValues: function () {
                        var result = [];
                        var items = this.data.items;
                        var fields = this.model.fields;
                        for (var i = 0; i < items.length; i++) {
                            result.push(items[i].data.pk);
                        }
                        return result;
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
                    displayField: 'isoCode',
                    labelWidth: 0,
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
                    flex: 1,
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
    isFormField: true,
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
                fields: ['uid'],
                idProperty: 'uid'
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
        //this.on('change', function() {alert(this.getValue())})

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
                        Ext.Ajax.request({
                            url: me.entity.data.url,
                            method: 'GET',
                            success: function (responseObject) {
                                var result = Ext.decode(responseObject.responseText);
                                var entity = {id: me.entity.id, data: {id: me.entity.data.id, url: result._links.self.href}};
                                window = Ext.getCmp('backend-viewport').createWindow({
                                    id: me.jsonValue,
                                    title: '[' + me.jsonValue + ' - ' + me.entity.data.name + ']',
                                    iconCls: me.entityId,
                                    entity: entity,
                                    sections: Ext.create("console.markup." + me.entityId).sections,
                                    synchronizable: Ext.create("console.markup." + me.entityId).synchronizable
                                });
                                Ext.getCmp('backend-viewport').restoreWindow(window);
                            },
                            failure: function (responseObject) {
                                Ext.Msg.alert('Error', 'Error: ' + responseObject.responseText);
                            }
                        });

                    } else {
                        Ext.getCmp('backend-viewport').restoreWindow(window);
                    }
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
        if (entity && typeof entity.data !== 'undefined') {
            me.entity = entity;
            var entityUrl = record instanceof Array ? entity.data._links.self.href : entity.data.url;
            //this.setRawValue(entity.data.url);
            Ext.Ajax.request({
                url: entityUrl,
                method: 'GET',
                success: function (res) {
                    var result = Ext.decode(res.responseText);
                    var resultData = Ext.isObject(result.content) ? result.content : result;
                    me.entityHref = result._links.self.href;
                    me.jsonValue = resultData.uid;
                    me.setRawValue(me.jsonValue);
                    if (!me.initialized) {
                        me.originalValue = me.jsonValue;
                        me.initialized = true;
                    }

                    if (me.entityId === 'media') {
                        me.tooltip = Ext.create('Ext.tip.ToolTip', {
                            target: me.getEl(),
                            trackMouse: true,
                            listeners: {
                                show: {
                                    single: true,
                                    fn: function (tip) {
                                        var relUrl = resultData.url;
                                        var url = 'https://dve2ovdl241xy.cloudfront.net' + relUrl;
                                        me.tooltip.update("<img id='" + relUrl + "' src='" + url + "' style='max-width:400px'/>");
                                        document.getElementById(relUrl).onload = function (e) {
                                            me.tooltip.setHeight(e.srcElement.height);
                                        };
                                    }
                                }
                            },
                        });
                    }
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
    getValue: function () {
        return this.rawValue;
    },
    getSubmitValue: function () {
        var record = this.store.getById(this.rawValue);
        // we must return something in the form of {"theme" : "https://localhost:8112/storefront/rest/site_theme/70933224484926368"}
        return record ? record.data._links.self.href : this.entityHref;
    }
});

Ext.define('console.view.field.NemesisMediaField', {
    xtype: 'nemesisMediaField',
    extend: 'Ext.form.FieldContainer',
    mixins: {
        field: 'Ext.form.field.Field'
    },
    tooltip: 'This is media',
    labelWidth: 50,
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
            labelWidth: 0,
            msgTarget: 'side',
            //anchor: '100%',
            width: 60,
            allowBlank: me.allowBlank,
            buttonText: me.buttonText,
            buttonOnly: true,
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
                            me.syncContainerWidth();
                        }
                        reader.readAsDataURL(file);
                        canvas.show();
                    } else {
                        // canvas.setSrc(IMAGE_OFFSET +'images/no-photo.jpg');
                        canvas.hide();
                    }
                }
            }
        }

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
        }
        if (!Ext.isEmpty(me.value)) {
            previewImage.src = me.value;
        }

        // rename original name and id to avoid conflits
        me.items = [{
            xtype: 'container',
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
            return item.xtype == 'container'
        }).setWidth(w);
    },
    setValue: function (value) {
        var previewImage = this.getImageField();
        if (!Ext.isEmpty(value)) {
            // if an existing value
            previewImage.setSrc('https://dve2ovdl241xy.cloudfront.net' + value);
            this.syncContainerWidth();
        }
    }
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
        });
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
                    displayField: 'isoCode',
                    labelWidth: 0,
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


