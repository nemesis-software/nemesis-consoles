Ext.define('HelplineConsole.controller.MenuController', {
	extend: 'Ext.app.Controller',
	views: ['HelplineConsole.view.Menu'],
	refs: [{
		ref: 'userSearchField',
		selector: '#helplineConsoleMenuId #userSearchField',
	}, {
		ref: 'orderSearchField',
		selector: '#helplineConsoleMenuId #orderSearchField',
	}],

	init: function() {
		this.control({
			'#helplineConsoleMenuId #userSearchBtn': {
				click: this.onUserSearchBtnClick
			},
			'#helplineConsoleMenuId #orderSearchBtn': {
				click: this.onOrderSearchBtnClick
			}
		});
	},

	onUserSearchBtnClick: function() {
		var self = this;
		var id = this.getUserSearchField().getValue();
		Ext.Ajax.request({
			url: Ext.get('rest-base-url').dom.getAttribute('url') + 'user/search/findByUidLike?uid=' + id,
			method: 'GET',
			success: function(responseObject) {
				var json = Ext.decode(responseObject.responseText);
				self.createUserPopup(json);
			},
			failure: function(responseObject) {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: responseObject.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
			}
		});
	},

	onOrderSearchBtnClick: function() {
		var self = this;
		var id = this.getOrderSearchField().getValue();
		Ext.Ajax.request({
			url: Ext.get('rest-base-url').dom.getAttribute('url') + 'abstract_order/search/findByUidEquals?uid=' + id,
			method: 'GET',
			success: function(responseObject) {
				var json = Ext.decode(responseObject.responseText);
				self.createOrderPopup(json);
			},
			failure: function(responseObject) {
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: responseObject.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
			}
		});
	},

	createUserPopup: function(object) {
		// TODO: figure out how to test if objects are found & remove the ajax call in the previous function
		if (object['_embedded']) {
			var users = object['_embedded']['employeeEntities'];
			var pageSize = users.length < 10 ? 0 : 10;
			var displayInfo = pageSize != 0 ? true : false;
			var store = Ext.create('Ext.data.Store', {
				autoLoad: true,
				autoSync: false,
				pageSize: pageSize,
				model: Ext.create('Ext.data.Model', {
					fields: searchAllData['user'].result
				}),
				proxy: {
					type: 'rest',
					url: Ext.get('rest-base-url').dom.getAttribute('url') + 'user/search/findByUidLike?uid=' + this.getUserSearchField().getValue(),
					limitParam: 'size',
					useDefaultXhrHeader: false,
					cors: true,
					reader: {
						type: 'json',
						rootProperty: function(o) {
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
			Ext.create('Ext.window.Window', {
				layout: 'fit',
				title: 'Results',
				width: 600,
				height: 300,
				id: 'customersResultsWindow',
				modal: true,
				items: [{
					xtype: 'grid',
					store: store,
					columns: searchAllData['customer'].result,
					bbar: {
						xtype: 'pagingtoolbar',
						pageSize: 10,
						store: store,
						displayInfo: displayInfo
					}
				}]
			}).show();
		} else {
			Ext.create('Ext.window.Window', {
				layout: {
					type: 'vbox',
					align: 'middle',
					pack: 'center'
				},
				title: 'Results',
				width: 200,
				height: 100,
				id: 'customersResultsWindow',
				modal: true,
				items: [{
					xtype: 'label',
					text: 'No Results found'
				}]
			}).show();
		}
	},

	createOrderPopup: function(object) {
		// TODO: figure out how to test if objects are found & remove the ajax call in the previous function
		if (object['_embedded']) {
			var orders = object['_embedded']['cartEntities'];
			var pageSize = orders == undefined || orders.length < 10 ? 0 : 10;
			var displayInfo = pageSize != 0 ? true : false;
			var store = Ext.create('Ext.data.Store', {
				autoLoad: true,
				autoSync: false,
				pageSize: pageSize,
				model: Ext.create('Ext.data.Model', {
					fields: searchAllData['abstract_order'].result
				}),
				proxy: {
					type: 'rest',
					url: Ext.get('rest-base-url').dom.getAttribute('url') + 'abstract_order/search/findByUidEquals?uid=' + this.getOrderSearchField().getValue(),
					limitParam: 'size',
					useDefaultXhrHeader: false,
					cors: true,
					reader: {
						type: 'json',
						rootProperty: function(o) {
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
			Ext.create('Ext.window.Window', {
				layout: 'fit',
				title: 'Results',
				width: 600,
				height: 300,
				id: 'ordersResultsWindow',
				modal: true,
				items: [{
					xtype: 'grid',
					store: store,
					columns: searchAllData['abstract_order'].result,
					bbar: {
						xtype: 'pagingtoolbar',
						pageSize: 10,
						store: store,
						displayInfo: displayInfo
					}
				}]
			}).show();
		} else {
			Ext.create('Ext.window.Window', {
				layout: {
					type: 'vbox',
					align: 'middle',
					pack: 'center'
				},
				title: 'Results',
				width: 200,
				height: 100,
				id: 'ordersResultsWindow',
				modal: true,
				items: [{
					xtype: 'label',
					id: 'noResultsFoundLabel',
					text: 'No Results found'
				}]
			}).show();
		}
	}
});
