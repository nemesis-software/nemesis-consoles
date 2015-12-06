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
            var search_conditions = false;
            for (var i = 0; i < fields.items.length; i++) {
                var restriction = fields.items[i].fieldSet.items.items[0].value;
                var value = fields.items[i].fieldSet.items.items[1].value;

                if (typeof restriction !== 'undefined' && value) {
                    search_conditions = true;
                    var field = fields.items[i].emptyTxt;
                    //for UID searches use the not unique method which is without Equals suffix
                    if (field === 'uid' && restriction === 'Equals') {
                        restriction = '';
                    }
                    var pagingCombo = contentSearchForm.up('contentPageTab').down('contentSearchResults').getDockedItems('toolbar[dock="bottom"]')[0].down('#pagingCombo');
                    var pageSize = pagingCombo.getValue();
                    var params = {size: pageSize};
                    params[field] = value;
                    params['projection'] = 'search';
                    params['page'] = 1;

                    searchGrid.setLoading(true);
                    searchGrid.getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + entityId + '/search/findBy' + field.charAt(0).toUpperCase() + field.slice(1) + restriction;
                    searchGrid.getStore().proxy.extraParams = params;
                    searchGrid.getStore().reload();
                    searchGrid.setLoading(false);
                    break;
                }
            }

            if (!search_conditions) {
            	searchGrid.setLoading(true);
            	searchGrid.getStore().proxy.url = Ext.get('rest-base-url').dom.getAttribute('url') + contentSearchForm.entity.data.id;
            	if (searchGrid.getStore().proxy.extraParams) {
            		delete searchGrid.getStore().proxy.extraParams.uid;
            	}
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
    }
});
