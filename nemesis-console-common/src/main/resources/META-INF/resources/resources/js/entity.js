Ext.define('console.model.Entity', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},                      // discount
        {name: 'name'},                    // DiscountModel
        {name: 'url'},                     // http://localhost:8080/rest/discount/12312312313
        {name: 'className'},               // com.nemesis.platform.core.model.price.DiscountModel
        {name: 'synchronizable'}           // true
    ]
});

Ext.define('console.view.content.EntityPopupWindow', {
    extend: 'Ext.window.Window',
    xtype: 'entityPopupWindow',
    stateful: false,
    isWindow: true,
    constrainHeader: true,
    constructTitle: function () {
        return '[' + this.id.substring(5) + ' - ' + translate(this.entity.data.id) + ']';
    },
    minimizable: true,
    maximizable: true,
    width: 800,
    height: 400,
    animCollapse: false,
    border: false,
    layout: 'border',
    entityFields: null,
    entity: null,
    constructor: function () {
        this.callParent(arguments);
    },
    initComponent: function () {
        var method = 'POST';
        if (this.id !== 'w_id_') {
            method = 'PATCH';
        }

        var entityPopupForm = Ext.create("console.view.content.entity.EntityPopupForm", {
            entity: this.entity,
            method: method,
            entityFields: this.entityFields
        });

        var entityPopupToolbar = Ext.create("console.view.content.entity.EntityPopupToolbar", {entity: this.entity, entityPopupForm: entityPopupForm});

        this.items = [
            {
                region: 'north',
                items: entityPopupToolbar,
                entity: this.entity
            },
            {
                region: 'center',
                items: entityPopupForm
            }
        ];

        this.callParent();
    }
});

Ext.define('console.view.content.entity.EntityPopupForm', {
    extend: 'Ext.form.Panel',
    xtype: 'entityPopupForm',
    layout: {
        type: 'fit',
        align: 'stretch'
    },
    entityFields: null,
    trackResetOnLoad: true,
    entity: null,
    method: 'PUT',
    frame: false,
    border: false,
    headers: {'Content-Type': 'application/json'},
    fieldDefaults: {
        labelAlign: 'left',
        msgTarget: 'side'
    },
    initComponent: function () {
        var me = this;
        this.items = [
            {
                xtype: 'tabpanel',
                activeTab: 0,
                height: '100%',
                deferredRender: false,
                items: me.entityFields,
                border: false
            }
        ];

        if (me.entity != null) {
            this.on('afterrender', function () {
                Ext.Ajax.request({
                    url: me.entity.data.url,
                    method: 'GET',
                    params: {},
                    success: function (responseObject) {
                        var result = Ext.decode(responseObject.responseText);
                        console.log(result);
                        me.populateForm(me.convertResult(result));
                    },
                    failure: function (responseObject) {
                        Ext.Msg.alert('Error', 'Error: ' + responseObject.responseText);
                    }
                });
            });
        }

        this.callParent();
    },
    populateForm: function (result) {
        this.getForm().setValues(result);
        Ext.each(this.query('nemesisCollectionField'), function (field) {
            field.initStore(result[field.name]);
        })
    },
    convertResult: function (p) {
        var result = p;
        for (var key in p) {
            if (p.hasOwnProperty(key)) {
                if (key === '_links') {
                    for (var _link in p[key]) {
                        if (_link != 'self') {
                            var propertyId = _link.substring(_link.lastIndexOf(".") + 1, _link.length);
                            var value = Ext.create('console.model.Entity', {id: propertyId, url: p[key][_link].href});
                            result['entity-' + propertyId] = value;
                        }
                    }
                }
            }
        }
        return result;
    }
});

Ext.define('console.view.content.entity.EntityPopupToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'entityPopupToolbar',
    entity: null,
    entityPopupForm: null,
    initComponent: function () {
        var me = this;
        this.items = [
            {
                text: 'Save',
                iconCls: 'save',
                handler: function () {
                    me.onsaveClicked(me.entity, me.entityPopupForm);
                }
            },
            {
                text: 'Save & Close',
                iconCls: 'saveandclose',
                handler: function () {
                    me.onsaveandcloseClicked(me.entity, me.entityPopupForm);
                }
            },
            '-',
            {
                text: 'Delete',
                iconCls: 'delete',
                disabled: me.entity == null,
                handler: function () {
                    Ext.MessageBox.confirm('Delete', 'Are you sure you want to delete it?', function (btn) {
                        if (btn === 'yes') {
                            me.ondeleteClicked(me.entity);
                        } else {
                            //nothing
                        }
                    });
                }
            },
            '-',
            {
                text: 'Refresh',
                iconCls: 'refresh',
                disabled: me.entity == null,
                handler: function () {
                    console.log(me.entity.data.url);
                    Ext.Ajax.request({
                        url: me.entity.data.url,
                        method: 'GET',
                        params: {},
                        success: function (responseObject) {
                            var result = Ext.decode(responseObject.responseText);
                            console.log(me.entityPopupForm);
                            me.entityPopupForm.populateForm(result);
                        },
                        failure: function (responseObject) {
                            Ext.Msg.alert('Error', 'Error: ' + responseObject.responseText);
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
            '-',
            {
                text: 'Synchronize',
                iconCls: 'synchronize',
                hidden: me.entity.data.synchronizable != true,
                disabled: me.entity.data.synchronizable != true,
                handler: function () {
                    console.log(me.entity.data.url);
                    me.up().up().setLoading(true);
                    var pk = me.entity.data.url.substring(me.entity.data.url.lastIndexOf(me.entity.data.id) + me.entity.data.id.length + 1);
                    Ext.Ajax.request({
                        url: Ext.get('rest-base-url').dom.getAttribute('url') + "backend/synchronize",
                        method: 'GET',
                        params: {
                            entityName: me.entity.data.id,
                            pk: pk
                        },
                        success: function (responseObject) {
//							var result = Ext.decode(responseObject.responseText);
                            me.up().up().setLoading(false);
                            //Ext.MessageBox.alert('Status', 'Synchronizing was successfully.');
                            Ext.toast({
                                html: 'Synchronizing was successfull!',
                                closable: false,
                                align: 't',
                                slideInDuration: 400,
                                minWidth: 400
                            });
                        },
                        failure: function (responseObject) {
                            me.up().up().setLoading(false);
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
            '->',
            {
                xtype: 'component',
                id: 'url-' + this.id,
                autoEl: {
                    tag: 'a',
                    href: me.entity != null ? me.entity.data.url : '',
                    html: me.entity != null ? me.entity.data.url : ''
                }
            }
        ];
        this.callParent(arguments);
    },
    onsaveClicked: function (entity, entityPopupForm) {
        var me = this;
        Ext.Ajax.request({
            url: entity.data.url,
            method: entityPopupForm.method,
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            params: this.prepareValues(entityPopupForm.getForm().getValues(false, true, false, false)),
            success: function (responseObject) {
                var searchRes = Ext.getCmp(entity.data.id + '-search-result');
                if (searchRes) {
                    searchRes.mask();
                    searchRes.getStore().reload();
                    searchRes.unmask();
                }
            },
            failure: function (responseObject) {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: responseObject.statusText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },
    onsaveandcloseClicked: function (entity, entityPopupForm) {
        var me = this;
        Ext.Ajax.request({
            url: entity.data.url,
            method: entityPopupForm.method,
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            params: entityPopupForm.getForm().getValues(),
            success: function (responseObject) {
                me.up('window').close();
                var searchRes = Ext.getCmp(entity.data.id + '-search-result');
                if (searchRes) {
                    searchRes.mask();
                    searchRes.getStore().reload();
                    searchRes.unmask();
                }
            },
            failure: function (responseObject) {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: responseObject.statusText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },

    ondeleteClicked: function (entity) {
        var me = this;
        Ext.Ajax.request({
            url: entity.data.url,
            method: 'DELETE',
            params: {},
            success: function (responseObject) {
                me.up('window').close();
                Ext.getCmp(entity.data.id + '-search-result').mask();
                Ext.getCmp(entity.data.id + '-search-result').getStore().reload();
                Ext.getCmp(entity.data.id + '-search-result').unmask();
            },
            failure: function (responseObject) {
                Ext.Msg.alert('Error', responseObject.statusText);
            }
        });
    },
    prepareValues: function (formValues) {
        //var links = [];
        var result = {};
        for (var key in formValues) {
            if (key.indexOf('entity-') === 0) {
                var strippedKey = key.substring(7);
                result[strippedKey] = formValues[key];
            } else {
                result[key] = formValues[key];
            }
        }

        //result['links'] = links;
        console.log(Ext.encode(result));
        return Ext.encode(result);
    }
});

Ext.define('console.view.content.entity.EntityContextMenu', {
    extend: 'Ext.menu.Menu',
    editDisabled: false,
    copyDisabled: false,
    pasteDisabled: false,
    clearDisabled: false,
    requires: [
        'Ext.menu.Menu'
    ],

    initComponent: function () {
        var me = this;
        this.items = [
            {
                itemId: 'edit',
                handler: Ext.emptyFn,
                text: "Edit",
                iconCls: 'edit',
                disabled: this.editDisabled
            },
            '-',
            {
                itemId: 'copy',
                handler: Ext.emptyFn,
                text: 'Copy',
                iconCls: 'copy',
                disabled: this.copyDisabled
            },
            {
                itemId: 'paste',
                handler: Ext.emptyFn,
                text: 'Paste',
                iconCls: 'paste',
                disabled: this.pasteDisabled
            },
            {
                itemId: 'clear',
                handler: function () {
                    ui.value = null;
                },
                text: 'Clear',
                iconCls: 'broom',
                disabled: this.clearDisabled
            }
        ],
            me.callParent(arguments);
    }
});
