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
        constructor: function () {
            self = this;  // Here you store "this" in the closure
            self.callParent(arguments);
        },
        initComponent: function () {
            Ext.Ajax.request({ url: Ext.get('rest-base-url').dom.getAttribute('url') + self.entity.data.id + '/search/',
                loadMask: true,
                method: 'GET',
                params: {},
                success: function (responseObject) {
                    var searchfields = {};
                    var result = Ext.decode(responseObject.responseText);
                    if (Object.keys(result._links).length > 0) {
                        for (var _link in result._links) {
                            var fieldRel = Ext.util.Format.substr(_link, self.entity.data.id + 1, _link.length);  //voucher.findByUidStartingWith
                            var fieldRestriction = fieldRel.substring(6);
                            var field = null;
                            var restriction = "";
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
                            } else if (fieldRestriction.indexOf("NotLike", fieldRestriction.length - "NotLike".length) !== -1) {
                                restriction = "NotLike";
                            } else if (fieldRestriction.indexOf("Like", fieldRestriction.length - "Like".length) !== -1) {
                                restriction = "Like";
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

                            if (searchfields[field] === undefined) {
                                searchfields[field] = [];
                            }
                            searchfields[field].push(Ext.create("console.model.SearchRestriction", {value: restriction, displayName: self.restrictionNames[restriction]}));
                        }

                        var backendSearchFields = [];
                        for (var key in searchfields) {
                            backendSearchFields.push(Ext.create("console.view.content.search.SearchField", {fieldLabel: key, emptyText: key.charAt(0).toLowerCase() + key.slice(1), searchRestrictions: searchfields[key]}));
                        }

                        Ext.getCmp(self.entity.data.id + '-searchform-fieldset').add(backendSearchFields);
                    }
                },
                failure: function (responseObject) {
                    var error = Ext.decode(responseObject.responseText);
                    Ext.Msg.alert('Error', 'Error: ' + error.message);
                }
            });

            this.items = [
                {
                    xtype: 'fieldset',
                    title: this.title + ' ' + this.entity.data.name,
                    defaultType: 'textfield',
                    margin: '10%',
                    id: this.entity.data.id + '-searchform-fieldset',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [
                    ]
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
                            itemId: this.entity.data.id + '-search-form-btn',
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
    }
});
