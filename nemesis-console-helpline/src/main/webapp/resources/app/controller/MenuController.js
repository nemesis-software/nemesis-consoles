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
				Ext.Msg.alert('Error', 'Error: ' + responseObject.responseText);
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
				Ext.Msg.alert('Error', 'Error: ' + responseObject.responseText);
			}
		});
	},

	createUserPopup: function(object) {
		if (object['_embedded']) {
			var users = object['_embedded']['employeeModels'];
			var pageSize = users.length < 10 ? 0 : 10;
			var displayInfo = pageSize != 0 ? true : false;
			var store = Ext.create('Ext.data.Store', {
				storeId: 'usersStore',
				model: 'HelplineConsole.model.User',
				pageSize: pageSize
			});
			for (var i = 0; i < users.length; i++) {
				var user = users[i];
				var model = new HelplineConsole.model.User({
					pk: user.pk,
					uid: user.uid,
					createdBy: user.createdBy,
					createdDate: user.createdDate,
					lastModifiedBy: user.lastModifiedBy,
					displayName: user.displayName,
					loginDisabled: user.loginDisabled,
					lastName: user.lastName,
					firstName: user.firstName,
					encodedPassword: user.encodedPassword,
					passwordEncoding: user.passwordEncoding,
					entityName: user.entityName,
					typeCode: user.typeCode,
					new: user.new,
					id: user.id
				});
				store.add(model);
			}
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
					columns: [{
						text: 'pk',
						dataIndex: 'pk'
					}, {
						text: 'uid',
						dataIndex: 'uid'
					}, {
						text: 'createdBy',
						dataIndex: 'createdBy'
					}, {
						text: 'createdDate',
						dataIndex: 'createdDate'
					}, {
						text: 'lastModifiedBy',
						dataIndex: 'lastModifiedBy'
					}, {
						text: 'displayName',
						dataIndex: 'displayName'
					}, {
						text: 'loginDisabled',
						dataIndex: 'loginDisabled'
					}, {
						text: 'lastName',
						dataIndex: 'lastName'
					}, {
						text: 'firstName',
						dataIndex: 'firstName'
					}, {
						text: 'encodedPassword',
						dataIndex: 'encodedPassword'
					}, {
						text: 'passwordEncoding',
						dataIndex: 'passwordEncoding'
					}, {
						text: 'entityName',
						dataIndex: 'entityName'
					}, {
						text: 'typeCode',
						dataIndex: 'typeCode'
					}, {
						text: 'new',
						dataIndex: 'new'
					}, {
						text: 'id',
						dataIndex: 'id'
					}],
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
		if (object['_embedded']) {
			var orders = object['_embedded']['cartModels'];
			var pageSize = orders.length < 10 ? 0 : 10;
			var displayInfo = pageSize != 0 ? true : false;
			var store = Ext.create('Ext.data.Store', {
				storeId: 'ordersStore',
				model: 'HelplineConsole.model.Order',
				pageSize: pageSize
			});
			for (var i = 0; i < orders.length; i++) {
				var order = orders[i];
				var model = new HelplineConsole.model.Order({
					pk: order.pk,
					uid: order.uid,
					createdBy: order.createdBy,
					createdDate: order.createdDate,
					lastModifiedBy: order.lastModifiedBy,
					lastModifiedDate: order.lastModifiedDate,
					totalTaxValues: order.totalTaxValues,
					deliveryStatus: order.deliveryStatus,
					date: order.date,
					discountsIncludeDeliveryCost: order.discountsIncludeDeliveryCost,
					net: order.net,
					totalTax: order.totalTax,
					globalDiscountValues: order.globalDiscountValues,
					status: order.status,
					paymentCost: order.paymentCost,
					deliveryCost: order.deliveryCost,
					calculated: order.calculated,
					discountsIncludePaymentCost: order.discountsIncludePaymentCost,
					subtotal: order.subtotal,
					totalPrice: order.totalPrice,
					appliedVoucherCodes: order.appliedVoucherCodes,
					entityName: order.entityName,
					new: order.new,
					id: order.id,
					typeCode: order.typeCode
				});
				store.add(model);
			}
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
					columns: [{
						text: 'pk',
						dataIndex: 'pk'
					}, {
						text: 'uid',
						dataIndex: 'uid'
					}, {
						text: 'createdBy',
						dataIndex: 'createdBy'
					}, {
						text: 'createdDate',
						dataIndex: 'createdDate'
					}, {
						text: 'lastModifiedBy',
						dataIndex: 'lastModifiedBy'
					}, {
						text: 'lastModifiedDate',
						dataIndex: 'lastModifiedDate'
					}, {
						text: 'totalTaxValues',
						dataIndex: 'totalTaxValues'
					}, {
						text: 'deliveryStatus',
						dataIndex: 'deliveryStatus'
					}, {
						text: 'date',
						dataIndex: 'date'
					}, {
						text: 'discountsIncludeDeliveryCost',
						dataIndex: 'discountsIncludeDeliveryCost'
					}, {
						text: 'net',
						dataIndex: 'net'
					}, {
						text: 'totalTax',
						dataIndex: 'totalTax'
					}, {
						text: 'globalDiscountValues',
						dataIndex: 'globalDiscountValues'
					}, {
						text: 'status',
						dataIndex: 'status'
					}, {
						text: 'paymentCost',
						dataIndex: 'paymentCost'
					}, {
						text: 'deliveryCost',
						dataIndex: 'deliveryCost'
					}, {
						text: 'calculated',
						dataIndex: 'calculated'
					}, {
						text: 'discountsIncludePaymentCost',
						dataIndex: 'discountsIncludePaymentCost'
					}, {
						text: 'subtotal',
						dataIndex: 'subtotal'
					}, {
						text: 'totalPrice',
						dataIndex: 'totalPrice'
					}, {
						text: 'appliedVoucherCodes',
						dataIndex: 'appliedVoucherCodes'
					}, {
						text: 'entityName',
						dataIndex: 'entityName'
					}, {
						text: 'new',
						dataIndex: 'new'
					}, {
						text: 'id',
						dataIndex: 'id'
					}, {
						text: 'typeCode',
						dataIndex: 'typeCode'
					}],
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