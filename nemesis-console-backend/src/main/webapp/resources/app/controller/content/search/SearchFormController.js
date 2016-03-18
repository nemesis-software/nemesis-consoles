Ext.define('console.controller.content.search.SearchFormController', {
    extend: 'Ext.app.Controller',
    views: [
        'console.view.content.search.SearchForm'
    ],
    init: function (application) {
        this.control({
            "toolbar > button[command=search]": {
                cls: 'search-btn-search-form',
                click: this.onSearchClicked
            },
            "toolbar > button[command=reset]": {
                click: this.onResetClicked
            },
            listeners: {
                afterRender: function () {
                    this.keyNav = Ext.create('Ext.util.KeyNav', this.el, {
                        enter: this.onSearchClicked,
                        scope: this
                    });
                }
            }
        });
    },
    onSearchClicked: function (button) {
        var me = this;
        var contentSearchForm = button.up('contentSearchForm');
        var entityId = contentSearchForm.entity.data.id;
    	var searchGrid = Ext.getCmp(entityId + "-search-result");
    	searchGrid.setLoading(true);
        var fields = Ext.getCmp(entityId + '-searchform-fieldset').items;

        if (fields.items.length > 0) {
            var filter = "";
            var search_conditions = false;
            for (var i = 0; i < fields.items.length; i++) {
                var restriction = fields.items[i].fieldSet.items.items[0].getValue();
                var value = fields.items[i].fieldSet.items.items[1].getValue();

                if (typeof restriction !== 'undefined' && restriction) {
                    search_conditions = true;
                    var field = fields.items[i].emptyTxt;
                    //for UID searches use the not unique method which is without Equals suffix
                    //TODO check why is that after we use $filter
                    //if (field === 'uid' && restriction === 'Equals') {
                    //    restriction = '';
                    //}

                    //change the field name & value for localized fields
                    if (value && fields.items[i].fieldSet.items.items[1].xtype == 'nemesisLocalizedTextField') {
                        var localizedJsonValue = JSON.parse(value);
                        for (var key in localizedJsonValue) {
                            if (localizedJsonValue.hasOwnProperty(key)) {
                                value = "'" + localizedJsonValue[key].value + "'";
                                field = field + "/" + key + "/value";
                                break;
                            }
                        }
                    } else if (value && fields.items[i].fieldSet.items.items[1].xtype == 'nemesisDateField') {
                        var dateValue = value;
                        value = Ext.Date.format(dateValue, 'Y-m-d\\TH:i:s');
                        //var year = dateValue.getFullYear();
                        //var month = dateValue.getMonth() + 1;
                        //var day = dateValue.getDay();
                        //var hours = dateValue.getHours();
                        //var minutes = dateValue.getMinutes();
                        //var seconds = dateValue.getSeconds();
                        //
                        //value = year + "-" +
                        //    (month[1] ? month: "0" + month) + "-" +
                        //    (day[1] ? day : "0" + day) +
                        //    "T" + hours +
                        //    ":" + minutes +
                        //    ":" +  seconds;
                    } else if (value && fields.items[i].fieldSet.items.items[1].xtype == 'nemesisEntityField') {
                        //extract PK from a submitValue which looks like "https://solar.local:8112/storefront/rest/catalog_version/3379574895700592"
                        value = fields.items[i].fieldSet.items.items[1].getSubmitValue().substring(fields.items[i].fieldSet.items.items[1].getSubmitValue().lastIndexOf("/") + 1)  + "L";
                        field = field.replace("entity-", "") + "/pk";
                    } else if (value && fields.items[i].fieldSet.items.items[1].xtype == 'nemesisBooleanField') {
                        for (var key in value) {
                            if (value.hasOwnProperty(key)) {
                                value = value[key];
                                break;
                            }
                        }
                    } else if (value && fields.items[i].fieldSet.items.items[1].xtype == 'nemesisTextField') {
                        value = "'" + value + "'";
                    }

                    debugger;

                    if (restriction === 'StartingWith' && value) {
                        //startswith(field, 'Karl') eq true
                        filter = this.appendFilter(filter, "startswith(" + field  + ", " + value + ") eq true");
                    } else if (restriction === 'EndingWith' && value) {
                        filter = this.appendFilter(filter, "endswith(" + field  + ", " + value + ") eq true");
                    } else if (restriction === 'Contains' && value) {
                        //(indexof(uid, 'lowrider') ge 0)
                        filter = this.appendFilter(filter, "(indexof(" + field + ", " + value + ") ge 0)");
                    } else if (restriction === 'After' && value) {
                        //field gt datetime'2011-12-03T10:15:30'
                        filter = this.appendFilter(filter, field + " gt datetime'" + value + "'");
                    } else if (restriction === 'Before' && value) {
                        //field lt datetime'2011-12-03T10:15:30'
                        filter = this.appendFilter(filter, field + " lt datetime'" + value + "'");
                    } else if (restriction === 'GreaterThan' && value) {
                        //field ge 10
                        filter = this.appendFilter(filter, field + " ge " + value);
                    } else if (restriction === 'LessThan' && value) {
                        //field le 10
                        filter = this.appendFilter(filter, field + " le " + value);
                    } else if (restriction === 'NotNull') {
                        //field ne null
                        filter = this.appendFilter(filter, field + " ne null");
                    } else if (restriction === 'Null') {
                        //field eq null
                        filter = this.appendFilter(filter, field + " eq null");
                    } else if ((restriction === 'Equals' || !restriction)  && value) {
                        //field eq 'Karlovo'
                        filter = this.appendFilter(filter, field + " eq " + value);
                    } else {
                        console.log("invalid restriction !");
                    }
                }
            }

            if(search_conditions){
                var pagingCombo = contentSearchForm.up('contentPageTab').down('contentSearchResults').getDockedItems('toolbar[dock="bottom"]')[0].down('#pagingCombo');
                var pageSize = pagingCombo.getValue();
                var params = {size: pageSize};
                //params[field] = value;
                params['$filter'] = filter;
                params['projection'] = 'search';
                params['page'] = 1;

                searchGrid.setLoading(true);
                //searchGrid.getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + entityId + '/search/findBy' + field.charAt(0).toUpperCase() + field.slice(1) + restriction;
                searchGrid.getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + entityId + '/';
                searchGrid.getStore().proxy.extraParams = params;
                searchGrid.getStore().reload();
                searchGrid.setLoading(false);
            } else {
            	searchGrid.setLoading(true);
            	searchGrid.getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + contentSearchForm.entity.data.id;
            	if (searchGrid.getStore().proxy.extraParams) {
            		delete searchGrid.getStore().proxy.extraParams;
            	}
                var params = {projection: 'search'};
                searchGrid.getStore().proxy.extraParams = params;
            	searchGrid.getStore().reload();
            	searchGrid.setLoading(false);
            }

        }
    },
    onResetClicked: function (button) {
        var contentSearchForm = button.up().up();
        contentSearchForm.reset();
    },
    getDataForResultObjects: function (resultObjects) {
        console.log(resultObjects);
        var data = [];
        for (var key in resultObjects._embedded) {
            data = data.concat(resultObjects._embedded[key]);
        }
        return data;
    },
    appendFilter: function (filter, restriction) {
        if(filter){
            filter += " and ";
        }
        filter += restriction
        return filter;
    }
});
