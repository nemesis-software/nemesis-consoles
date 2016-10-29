Ext.define('AdminConsole.controller.portlets.SpringBeansPortletController', {
    extend: 'Ext.app.Controller',
    views: ['AdminConsole.view.portlet.SpringBeansPortlet'],
    refs: [],

    init: function () {
        this.control({
            '#adminDashboard #springBeansPortletId': {
                beforerender: this.loadData
            }
        });
    },

    loadData: function () {
        var self = this;
        Ext.Ajax.request({
            url: Ext.get('website-base-url').dom.getAttribute('url') + 'platform/beans',
            method: 'GET',
            params: {},
            success: function (responseObject) {
                var json = Ext.decode(responseObject.responseText);
                self.parseData(json[0]);
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
    },

    parseData: function (object) {
        var store = Ext.create('AdminConsole.store.SpringBeansStore');
        var contextValue = null;

        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                console.log(property);
                if (property == 'context') {
                    contextValue = object[property];
                } else if (property == 'parent') {
                    // parent property is not currently used
                } else if (property == 'beans') {
                    var innerObject = object[property];
                    for (var innerProperty in innerObject) {
                        if (innerObject.hasOwnProperty(innerProperty)) {
                            var model = new AdminConsole.model.SpringBean({
                                bean: innerObject[innerProperty].bean,
                                scope: innerObject[innerProperty].scope,
                                type: innerObject[innerProperty].type,
                                resource: innerObject[innerProperty].resource,
                                dependencies: innerObject[innerProperty].dependencies
                            });
                            store.add(model);
                        }
                    }
                }
            }
        }

        var springBeansPortlet = Ext.ComponentQuery.query('#springBeansPortletId')[0];
        springBeansPortlet.setStore(store);

        // set contextValue to label
        springBeansPortlet.down('#context').setText('Context: ' + contextValue);
    }
});
