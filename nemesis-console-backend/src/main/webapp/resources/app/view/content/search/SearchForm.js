Ext.define('console.view.content.search.SearchForm', function () {
    var self;  // This is a variable to store "this"

    return {
        extend: 'Ext.form.Panel',
        xtype: 'contentSearchForm',
        layout: 'anchor',
        title: 'Search',
        searchButtonName: 'Search',
        margins: '5, 5, 0, 5',
        entity: null,
        buttonAlign: 'left',
        enableKeyEvents: true,
        trackResetOnLoad: true,
        restrictionNames: {},
        requires: [
            'console.view.content.search.SearchField'
        ],
        defaults: {
            anchor: '100%'
        },
        fieldDefaults: {
            labelWidth: 200
        },
        constructor: function () {
            self = this;  // Here you store "this" in the closure
            self.callParent(arguments);
        },
        initComponent: function () {
            var restrictions = {};
            restrictions['nemesisTextField'] = ["StartingWith", "EndingWith", "Contains", "NotNull", "Null", "Equals"];
            restrictions['nemesisIntegerField'] = ["GreaterThan", "LessThan", "NotNull", "Null", "Equals"];
            restrictions['nemesisDecimalField'] = ["GreaterThan", "LessThan", "NotNull", "Null", "Equals"];
            restrictions['nemesisDateField'] = ["After", "Before", "NotNull", "Null"];
            restrictions['nemesisEnumField'] = ["Equals"];
            restrictions['nemesisLocalizedTextField'] = ["StartingWith", "EndingWith", "Contains", "NotNull", "Null", "Equals"];
            restrictions['nemesisEntityField'] = ["NotNull", "Null", "Equals"];
            restrictions['nemesisBooleanField'] = ["Equals"];

            restrictions['nemesisCollectionField'] = ["Not-Supported"];

            var filters = searchAllData[self.entity.data.entityName].filter;
            var searchFields = {};
            var backendSearchFields = [];
            for(var i in filters){
                filter = filters[i];
                var field = filter.name;
                var xtype = filter.xtype;
                if(xtype === 'nemesisHtmlEditor' || xtype === 'nemesisTextarea'){
                    xtype = 'nemesisTextField';
                }

                if (searchFields[field] === undefined) {
                    searchFields[field] = [];
                }

                for (var r = 0; r < restrictions[xtype].length; r++) {
                    var restriction = restrictions[xtype][r];
                    searchFields[field].push(Ext.create("console.model.SearchRestriction", {
                        value: restriction,
                        displayName: restriction
                    }));
                }
                console.log(xtype);
                backendSearchFields.push(Ext.create("console.view.content.search.SearchField", {
                    fieldLabel: filter.fieldLabel,
                    entity: self.entity,
                    emptyTxt: field.charAt(0).toLowerCase() + field.slice(1),
                    searchRestrictions: searchFields[field],
                    inputType: xtype,
                    values: filter.values, // needed for enums
                    entityId: filter.entityId //needed for entity relations
                }));
            }

            //for (var key in searchFields) {
            //    backendSearchFields.push(Ext.create("console.view.content.search.SearchField", {
            //        fieldLabel: key,
            //        entity: self.entity,
            //        emptyTxt: key.charAt(0).toLowerCase() + key.slice(1),
            //        searchRestrictions: searchFields[key],
            //        inputType: 'nemesisTextField'
            //    }));
            //}

            //TODO strange but it looks the component is not yet available ?
            var task = new Ext.util.DelayedTask(function() {
                Ext.getCmp(self.entity.data.entityName + '-searchform-fieldset').add(backendSearchFields);
            });
            task.delay(100);


            /*
            Ext.Ajax.request({
                url: Ext.get('rest-base-url').dom.getAttribute('url') + self.entity.data.entityName + '/search/',
                loadMask: true,
                method: 'GET',
                params: {'projection': 'search'},
                success: function (responseObject) {
                    var searchFields = {};
                    var result = Ext.decode(responseObject.responseText);
                    if (Object.keys(result._links).length > 0) {
                        for (var _link in result._links) {
                            var fieldRel = Ext.util.Format.substr(_link, self.entity.data.entityName + 1, _link.length);  //voucher.findByCodeStartingWith
                            var fieldRestriction = fieldRel.substring(6);
                            var field = null;
                            var restriction = "";
                            //TODO: use create function endsWith
                            if (fieldRestriction.indexOf("IsStartingWith", fieldRestriction.length - "IsStartingWith".length) !== -1) {
                                restriction = "IsStartingWith";
                            } else if (fieldRestriction.indexOf("StartingWith", fieldRestriction.length - "StartingWith".length) !== -1) {
                                restriction = "StartingWith";
                            } else if (fieldRestriction.indexOf("IsEndingWith", fieldRestriction.length - "IsEndingWith".length) !== -1) {
                                restriction = "IsEndingWith";
                            } else if (fieldRestriction.indexOf("EndingWith", fieldRestriction.length - "EndingWith".length) !== -1) {
                                restriction = "EndingWith";
                            } else if (fieldRestriction.indexOf("Contains", fieldRestriction.length - "Contains".length) !== -1) {
                                restriction = "Contains";
                            } else if (fieldRestriction.indexOf("IsContaining", fieldRestriction.length - "IsContaining".length) !== -1) {
                                restriction = "IsContaining";
                            } else if (fieldRestriction.indexOf("Containing", fieldRestriction.length - "Containing".length) !== -1) {
                                restriction = "Containing";
                            } else if (fieldRestriction.indexOf("After", fieldRestriction.length - "After".length) !== -1) {
                                restriction = "After";
                            } else if (fieldRestriction.indexOf("Before", fieldRestriction.length - "Before".length) !== -1) {
                                restriction = "Before";
                            } else if (fieldRestriction.indexOf("GreaterThan", fieldRestriction.length - "GreaterThan".length) !== -1) {
                                restriction = "GreaterThan";
                            } else if (fieldRestriction.indexOf("LessThan", fieldRestriction.length - "LessThan".length) !== -1) {
                                restriction = "LessThan";
                            } else if (fieldRestriction.indexOf("IsNotNull", fieldRestriction.length - "IsNotNull".length) !== -1) {
                                restriction = "IsNotNull";
                            } else if (fieldRestriction.indexOf("NotNull", fieldRestriction.length - "NotNull".length) !== -1) {
                                restriction = "NotNull";
                            } else if (fieldRestriction.indexOf("IsNull", fieldRestriction.length - "IsNull".length) !== -1) {
                                restriction = "IsNull";
                            } else if (fieldRestriction.indexOf("Null", fieldRestriction.length - "Null".length) !== -1) {
                                restriction = "Null";
                            } else if (fieldRestriction.indexOf("Equals", fieldRestriction.length - "Equals".length) !== -1) {
                                restriction = "Equals";
                            } else {
                                continue;
                            }

                            field = Ext.util.Format.substr(fieldRestriction, 0, fieldRestriction.length - restriction.length);

                            if (searchFields[field] === undefined) {
                                searchFields[field] = [];
                            }
                            searchFields[field].push(Ext.create("console.model.SearchRestriction", {value: restriction, displayName: restriction}));
                        }

                        var backendSearchFields = [];
                        for (var key in searchFields) {

                            backendSearchFields.push(Ext.create("console.view.content.search.SearchField", {
                                fieldLabel: key,
                                entity: self.entity,
                                emptyTxt: key.charAt(0).toLowerCase() + key.slice(1),
                                searchRestrictions: searchFields[key],
                                inputType: 'textfield'
                            }));
                        }

                        console.log(backendSearchFields);
                        Ext.getCmp(self.entity.data.entityName + '-searchform-fieldset').add(backendSearchFields);
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
            });*/

            this.items = [
                {
                    xtype: 'fieldset',
                    constructTitle: function () {
                        var searchForm = this.up('contentSearchForm');
                        var searchTitle = searchForm.initialConfig && searchForm.initialConfig.title || searchForm.title;
                        return translate(searchTitle) + ' ' + translate(searchForm.entity.data.entityName);
                    },
                    defaultType: 'textfield',
                    margin: '10%',
                    id: this.entity.data.entityName + '-searchform-fieldset',
                    defaults: {
                        anchor: '100%'
                    },
                    items: []
                }
            ];

            this.dockedItems = [
                {
                    dock: 'bottom',
                    xtype: 'toolbar',
                    ui: 'footer',
                    items: [
                        {
                            xtype: 'button',
                            text: this.searchButtonName,
                            iconCls: 'search-btn',
                            anchor: 'auto',
                            margin: '10%',
                            itemId: this.entity.data.entityName + '-search-form-btn',
                            command: 'search'
                        },
                        {
                            xtype: 'button',
                            text: 'Clear',
                            iconCls: 'reset',
                            handler: function (component) {
                                component.getEl().on('click', function (e) {
                                    self.getForm().getFields().each(function (f) {
                                        f.reset();
                                    });
                                });
                            },
                            command: 'reset'
                        }
                    ]
                }
            ];

            this.callParent();
        }
    };
});
