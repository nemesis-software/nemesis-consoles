Ext.define('AdminConsole.controller.portlets.DBSearchPortletController', {
	extend: 'Ext.app.Controller',
	views: ['AdminConsole.view.portlet.DBSearchPortlet'],
	refs: [],

	init: function() {
		this.control({
			'#adminDashboard #sqlSearchPortletId': {
				afterrender: this.applyCodeMirror
			},
			'#adminDashboard #sqlSearchPortletId #runSqlBtn': {
				click: this.onRunClick
			},
			'#adminDashboard #sqlSearchPortletId #validateSqlBtn': {
				click: this.onValidateClick
			}
		});
	},

	codeMirrorDBTextArea: undefined,

	applyCodeMirror: function() {
		var textArea = Ext.ComponentQuery.query('#dbSearchQuery')[0];
		var height = textArea.getHeight();

		codeMirrorDBTextArea = CodeMirror(document.getElementById("dbSearchQuery-bodyEl"), {
			mode: 'text/x-sql',
			lineNumbers: true
		});

		// dirty hack to hide textareafield & display codemirror window with its height; otherwise both windows are shown - no idea why 
		codeMirrorDBTextArea.setSize(null, height);
		document.getElementById("dbSearchQuery-inputWrap").style.display = "none";
	},


	onRunClick: function() {
		Ext.Ajax.request({
			url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/database/hql?query=' + codeMirrorDBTextArea.getValue(),
			method: 'GET',
			success: function(responseObject) {
				if (responseObject.responseText != '') {
					var result = Ext.decode(responseObject.responseText);
					if (result.results != undefined) {
						// TODO: display information to user when json from back-end is ready
						// var fieldDefs = new Array();
						// var columnDefs = new Array({
						// 	xtype: 'rownumberer'
						// });
						// for (cl in result.value[0]) {
						// 	var fieldDef = {};
						// 	var columnDef = {};
						// 	columnDef["id"] = result.value[0][cl];
						// 	columnDef["header"] = result.value[0][cl];
						// 	columnDef["dataIndex"] = result.value[0][cl];
						// 	columnDef["flex"] = 1;
						// 	columnDefs.push(columnDef);

						// 	fieldDef['name'] = result.value[0][cl];
						// 	fieldDef['mapping'] = cl;
						// 	fieldDefs.push(fieldDef);
						// }

						// var values = new Array();

						// for (var i = 1; i < result.value.length; i++) {
						// 	var val = new Array();
						// 	for (var j = 0; j < result.value[i].length; j++) {
						// 		val.push(result.value[i][j]);
						// 	}
						// 	values.push(val);
						// }

						// var store = Ext.create('Ext.data.ArrayStore', {
						// 	storeId: 'myStore',
						// 	autoLoad: true,
						// 	fields: fieldDefs,
						// 	data: values
						// });
						// console.log(values);

						// var window = Ext.create("Ext.Window", {
						// 	title: 'Results',
						// 	modal: true,
						// 	maximizable: true,
						// 	width: 800,
						// 	height: 200,
						// 	layout: 'fit',
						// 	items: {
						// 		height: this.height,
						// 		xtype: 'grid',
						// 		title: 'result',
						// 		columnLines: true,
						// 		stripeRows: true,
						// 		autoScroll: true,
						// 		columns: columnDefs,
						// 		store: store,
						// 		layout: 'fit'
						// 	}
						// });
						// window.show();
					} else if (result.result != undefined) {
						Ext.toast({
							title: 'Error',
							html: result.result,
							closable: false,
							align: 't',
							slideInDuration: 400,
							minWidth: 400
						});
					} else {
						Ext.toast({
							html: 'Error',
							closable: false,
							align: 't',
							slideInDuration: 400,
							minWidth: 400
						});
					}
				} else {
					Ext.toast({
						title: 'Error',
						html: 'Please enter statement!',
						closable: false,
						align: 't',
						slideInDuration: 400,
						minWidth: 400
					});
				}
			},
			failure: function(responseObject) {
				var error = Ext.decode(responseObject.responseText);
				Ext.Msg.alert('Error', 'Error: ' + error);
			}
		});
	},

	onValidateClick: function() {
		Ext.toast({
			html: 'Successfully validated!',
			closable: false,
			align: 't',
			slideInDuration: 400,
			minWidth: 400
		});
	}
});