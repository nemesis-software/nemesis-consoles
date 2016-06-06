// Models
Ext.define('console.model.Entity', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},                      // discount
        {name: 'name'},                    // DiscountEntity
        {name: 'pk'},                      // 123123213
        {name: 'url'},                     // http://localhost:8080/rest/discount/12312312313
        {name: 'className'},               // com.nemesis.platform.core.entity.price.DiscountEntity
        {name: 'synchronizable'},          // true
        {name: 'isNew'}
    ]
});

Ext.define('console.model.Language', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'isoCode'},
        {name: 'name', translate: true}
    ]
});

Ext.define('console.view.content.ChartPopupWindow', {
    extend: 'Ext.window.Window',
    xtype: 'chartPopupWindow',
    stateful: false,
    isWindow: true,
    constrainHeader: true,
    minimizable: true,
    maximizable: true,
    animCollapse: false,
    border: false,
    layout: 'fit',
    config: null,
    initComponent: function () {

        var me = this;
        me.title = me.config.name;
        console.log(me.config);


        me.myDataStore = new Ext.data.Store({
            fields: ['key', 'value' ],
            proxy: {
                type: 'ajax',
                url: 'http://solar.local:8111/storefront/en/US/api/report/chart/' + me.config.pk ,
                reader: {
                    root: 'data',
                    type: 'json'
                }
            },
            autoLoad: true
        });

        this.items =
        [{
             xtype: 'cartesian',
             width: me.config.height,
             height: me.config.width,
             animate: true,
             store: this.myDataStore,
             innerPadding: 50,
             insetPadding: 40,
             legend: {
                 docked: 'bottom'
             },
             sprites: [{
                 type: 'text',
                 text: me.config.name,
                 font: '22px Helvetica',
                 width: 100,
                 height: 30,
                 x: 40, // the sprite x position
                 y: 20  // the sprite y position
             }, {
                 type: 'text',
                 text: me.config.description,
                 font: '10px Helvetica',
                 x: 12,
                 y: 680
             }],
             axes: [{
                 type: 'numeric',
                 position: 'left',
                 grid: true,
                 fields: ['value'],
                 renderer: function (v) { return v + '%'; },
                 minimum: 0,
                 maximum: 100
             }, {
                 type: 'category',
                 position: 'bottom',
                 grid: true,
                 fields: ['key'],
                 label: {
                     rotate: {
                         degrees: -45
                     }
                 }
             }],
             series: [{
                 type: me.config.chartType.toLowerCase(),
                 axis: 'left',
                 xField: 'key',
                 yField: 'value',
                 style: {
                     opacity: 0.80
                 },
                 highlight: {
                     fillStyle: '#000',
                     lineWidth: 2,
                     strokeStyle: '#fff'
                 },
                 tooltip: {
                     trackMouse: true,
                     style: 'background: #fff',
                     renderer: function(storeItem, item) {
                         this.setHtml(storeItem.get('key') + ': ' + storeItem.get('value') + ' %');
                     }
                 }
             }]
         }];

        this.callParent();
    }
})

// Views
Ext.define('console.view.content.EntityPopupWindow', {
    extend: 'Ext.window.Window',
    xtype: 'entityPopupWindow',
    stateful: false,
    isWindow: true,
    constrainHeader: true,
    constructTitle: function () {
        return '[' + (this.config.data ? this.config.data.uid + ' - ' + translate(this.config.entity.data.id) : this.config.entity.id) + ']';
    },
    minimizable: true,
    maximizable: true,
    width: 800,
    height: 400,
    animCollapse: false,
    border: false,
    layout: 'border',
    config: null,
    entityPopupForm: null,
    initComponent: function () {
		  
        Ext.apply(this, {
            iconCls: 'default-icon ' + this.config.iconCls
        });

        if(this.config.entity.data.pk){ //use the entity pk if possible
            Ext.apply(this, {
                id: 'w_pk_' + this.config.entity.data.pk
            });
        } else { //use the config.entity.id since it is a new entity
            Ext.apply(this, { //else use the entity pk
                id: 'w_pk_' + this.config.entity.id + "_" + Ext.id()
            });
        }

        var method = 'POST';
        if (this.config.operation === 'edit') {
            method = 'PATCH';
        }

        this.entityPopupForm = Ext.create("console.view.content.entity.EntityPopupForm", {
            entity: this.config.entity,
            method: method,
            entityFields: this.config.sections
        });

        var entityPopupToolbar = Ext.create("console.view.content.entity.EntityPopupToolbar", {entity: this.config.entity, entityPopupForm: this.entityPopupForm});

        this.items = [
            {
                region: 'north',
                items: entityPopupToolbar,
                entity: this.config.entity
            },
            {
                region: 'center',
                scrollable: 'y',
                items: this.entityPopupForm
            }
        ];

        this.callParent();
    },
    getEntityPopupForm: function() {
        return this.entityPopupForm;
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
                deferredRender: false,
                items: me.entityFields,
                border: false,
                defaults: {
                    hideMode: 'offsets'
                }
            }
        ];

        if (me.entity != null) {
            this.on('afterrender', function () {
                if (!me.entity.data.isNew) {
                    Ext.Ajax.request({
                        url: me.entity.data.url,
                        method: 'GET',
                        params: {},
                        success: function (responseObject) {
                            var result = Ext.decode(responseObject.responseText);
                            me.populateForm(me.convertResult(result));
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
                } else {
                    this.initCollectionFieldsStores({});
                }
            });
        }

        this.callParent();
    },
    populateForm: function (result) {
        this.getForm().setValues(result);
        this.initCollectionFieldsStores(result);
    },
    initCollectionFieldsStores: function (result) {
        Ext.each(this.query('nemesisCollectionField'), function (field) {
            field.initStore(result[field.name]);
        });
    },
    getValues: function () {
        var values = this.getForm().getValues(false, true, false, false);
        Ext.each(this.query('nemesisCollectionField'), function (field) {
            if (field.isDirty) {
                values[field.name] = field.store.getValues();
            }
        });
        Ext.each(this.query('nemesisEntityField'), function (field) {
            if (field.getValue() == '' && field.getValue() != field.originalValue) {
                values[field.name] = null;
            }
        });

        Ext.each(this.query('nemesisBooleanField'), function (field) {
            var value = field.getValue(), originalValue = field.originalValue;
            if (value != null && originalValue != null && value[field.name] == null && originalValue[field.name] != null) {
                values[field.name] = null;
            }
        });
        return values;
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
                cls: 'save-btn',
                iconCls: 'save',
                handler: function () {
                    me.onsaveClicked(me.entity, me.entityPopupForm);
                }
            },
            {
                text: 'Save & Close',
                cls: 'save-and-close-btn',
                iconCls: 'saveandclose',
                handler: function () {
                    me.onsaveandcloseClicked(me.entity, me.entityPopupForm);
                }
            },
            {
                xtype: 'tbseparator',
                hidden: me.entity.data.isNew
            },
            {
                text: 'Delete',
                cls: 'delete-btn',
                iconCls: 'delete',
                hidden: me.entity.data.isNew,
                disabled: me.entity.data.isNew,
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
            {
                xtype: 'tbseparator',
                hidden: me.entity.data.isNew
            },
            {
                text: 'Refresh',
                cls: 'refresh-btn',
                iconCls: 'refresh',
                hidden: me.entity.data.isNew,
                disabled: me.entity.data.isNew,
                handler: function () {
                    console.log(me.entity.data.url);
                    Ext.Ajax.request({
                        url: me.entity.data.url,
                        method: 'GET',
                        params: {},
                        success: function (responseObject) {
                            var result = Ext.decode(responseObject.responseText);
                            console.log(me.entityPopupForm);
                            me.entityPopupForm.populateForm(me.entityPopupForm.convertResult(result));
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
            {
                xtype: 'tbseparator',
                hidden: me.entity.data.synchronizable != true
            },
            {
                text: 'Synchronize',
                cls: 'synchronize-btn',
                iconCls: 'synchronize',
                hidden: me.entity.data.synchronizable != true,
                disabled: me.entity.data.synchronizable != true,
                handler: function () {
                    console.log(me.entity.data.url);

                    me.up().up().setLoading(true);
                    var pk = me.entity.data.pk;
                    console.log(pk);
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
                                html: 'Synchronizing was successful!',
                                closable: false,
                                align: 't',
                                slideInDuration: 400,
                                minWidth: 400,
                                autoCloseDelay: 500
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
            {
                text: 'Generate',
                cls: 'generate-report-btn',
                iconCls: 'synchronize',
                hidden: true,
                handler: function () {
                    Ext.Ajax.request({
                        url: me.entity.data.url,
                        method: 'GET',
                        params: {},
                        success: function (responseObject) {
                            var result = Ext.decode(responseObject.responseText);

                            console.log(result);

                            var window = Ext.getCmp('backend-viewport').createWindow(result);
                            Ext.getCmp('backend-viewport').restoreWindow(window);
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
            '->',
            {
                xtype: 'component',
                id: 'url-' + this.id,
                hidden: me.entity.data.isNew,
                autoEl: {
                    tag: 'a',
                    href: me.entity != null ? me.entity.data.url : '',
                    html: me.entity != null ? me.entity.data.url : ''
                }
            }
        ];
        this.callParent(arguments);
    },
    onsaveClicked: function (entity, entityPopupForm, closeWindow) {
        if (!entityPopupForm.isValid()) {
            return;
        }
        var me = this;
        var dirtyFileField = null
        entityPopupForm.getForm().getFields().each(function (field) {
            if (field.xtype == 'nemesisMediaField' && field.dirty) {
            	dirtyFileField = field;
            	return false;
            }
        });
        if (dirtyFileField) {
        	var formData = new FormData();
        	formData.append('file', dirtyFileField.file);
        	var req = new XMLHttpRequest();
        	req.open("POST", Ext.get('rest-base-url').dom.getAttribute('url') + '/media/' + dirtyFileField.up('entityPopupForm').entity.data.pk + '/upload', true);
        	// set headers and mime-type appropriately
        	req.setRequestHeader('X-Nemesis-Token', Ext.get('token').dom.getAttribute('value'));
        	req.setRequestHeader('X-Nemesis-Username', Ext.get('username').dom.getAttribute('value'));
        	req.setRequestHeader('X-Nemesis-ExpiryTime', Ext.get('expiryTime').dom.getAttribute('value'));
        	req.onload = function() {
        		dirtyFileField.dirty = false;
        		entityPopupForm.up().getEl().unmask();
        		if (!req.hasError) {
        			me.onsaveClicked(entity, entityPopupForm);
        		}
        	};
        	req.onreadystatechange = function() {
        		 if (req.readyState == 4 && req.status >= 400) {
        			 req.hasError = true;
                     Ext.MessageBox.show({
                         title: 'Error',
                         msg: 'There was problem uploading the file.',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR
                     });
        		 }
        	}
        	entityPopupForm.up().getEl().mask("Uploading file ...");
        	req.send(formData);
        } else {
        	me.submitFormData(entity, entityPopupForm, closeWindow);
        }

        if(Ext.get('website-iframe')){ //we have an website as an iframe, then refresh
            Ext.get('website-iframe').dom.src = Ext.get('website-iframe').dom.src;
        }
    },
    submitFormData: function(entity, entityPopupForm, closeWindow) {
    	var me = this;
        Ext.Ajax.request({
            url: entity.data.url,
            method: entityPopupForm.method,
            headers: {'Content-Type': 'application/json', Accept: 'application/json'},
            params: this.prepareValues(entityPopupForm.getValues()),
            success: function (responseObject) {
            	if (closeWindow) {
            		me.up('window').close();
            	}
                var searchRes = Ext.getCmp(entity.data.id + '-search-result');
                if (searchRes) {
                    searchRes.mask();
                    searchRes.getStore().reload();
                    searchRes.unmask();
                }
                Ext.toast({
                    html: 'Successfully saved!',
                    closable: false,
                    align: 't',
                    slideInDuration: 400,
                    minWidth: 400
                });

                if(entityPopupForm.method === 'POST') {
                    //this was creation of new object
                    entityPopupForm.method = 'PATCH'; //change it to PATCH since it is now saved
                    //refresh the form
                    var result = Ext.decode(responseObject.responseText); //should contain the new entity data
                    entityPopupForm.populateForm(entityPopupForm.convertResult(result));

                    if(!result.url) {//the URL is NOT returned from the server for now, so we need to add it
                        var url = me.entity.data.url + "/" + result.pk;
                        result.url = url;
                    }

                    //refresh the toolbar
                    //In future we should make an REST CALL here to get the new toolbar. Then we should do me.destory() and re-add the new toolbar to the parent window (this)
                    me.entity.data = result;
                    me.entity.data.id = entity.id;
                    me.entity.data.synchronizable = Ext.create("console.markup." + entity.id).synchronizable;
                    me.initComponent();
                }

            },
            failure: function (responseObject) {
                var messageText = '';
                var result = Ext.decode(responseObject.responseText);
                var serverErrors = result.errors;
                if(serverErrors){
                    //convert errors to extjs specific json
                    var errors = {};
                    for (var i = 0; i < serverErrors.length; i++) {
                        errors[serverErrors[i].property] = serverErrors[i].message;
                        //TODO workaround for entity- fields
                        errors['entity-' + serverErrors[i].property] = serverErrors[i].message;
                        messageText = messageText + serverErrors[i].property + ": " + serverErrors[i].message + '<br/>';
                    }
                    entityPopupForm.getForm().markInvalid(errors);
                }
                Ext.MessageBox.show({
                    title: 'Error - ' + responseObject.statusText,
                    msg: messageText || responseObject.statusText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
            }
        });
    },
    onsaveandcloseClicked: function (entity, entityPopupForm) {
        this.onsaveClicked(entity, entityPopupForm, true);
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
                Ext.toast({
                    html: 'Successfully deleted!',
                    closable: false,
                    align: 't',
                    slideInDuration: 400,
                    minWidth: 400
                });
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
        if(Ext.get('website-iframe')){ //we have an website as an iframe, then refresh
            Ext.get('website-iframe').dom.src = Ext.get('website-iframe').dom.src;
        }
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

// Stores
Ext.define('console.store.Languages', {
    extend: 'Ext.data.ArrayStore',

    model: 'console.model.Language',

    storeId: 'languages',

    data: [
        ['en', 'English'],
        ['en_GB', 'English (GB)'],
        ['en_US', 'English (US)'],
        ['bg_BG', 'Bulgarian'],
        ['de_DE', 'German'],
        ['fr_FR', 'French'],
        ['es_ES', 'Spanish']
    ]
});
