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
			url: Ext.get('website-base-url').dom.getAttribute('url') + 'platform/database/jpql?query=' + codeMirrorDBTextArea.getValue(),
			method: 'GET',
			success: function(responseObject) {
				if (responseObject.responseText != '') {
					var result = Ext.decode(responseObject.responseText);
					if (result.results != undefined) {
						// TODO: display information to user when json from back-end is ready
						 var fieldDefs = new Array();
						 var columnDefs = new Array({
						 	xtype: 'rownumberer'
						 });
						 for (var key in result.results[0]) {
						 	var fieldDef = {};
						 	var columnDef = {};
						 	columnDef["id"] = key;
						 	columnDef["header"] = key;
						 	columnDef["dataIndex"] = key;
						 	columnDef["flex"] = 1;
						 	columnDefs.push(columnDef);

						 	fieldDef['name'] = key;
						 	fieldDef['mapping'] = key;
						 	fieldDefs.push(fieldDef);
						 }

						 var values = new Array();

						 for (var i = 0; i < result.results.length; i++) {
						 	var val = new Array();
						 	for (var key in result.results[i]) {
						 	   if (result.results[i].hasOwnProperty(key)) {
						 	      val[key] = result.results[i][key];
                               }
						 	}
						 	values.push(val);
						 }

						 var store = Ext.create('Ext.data.ArrayStore', {
						 	storeId: 'myStore',
						 	autoLoad: true,
						 	fields: fieldDefs,
						 	data: values
						 });
						 console.log(values);

						 var window = Ext.create("Ext.Window", {
						 	title: 'Results',
						 	modal: true,
						 	maximizable: true,
						 	width: 800,
						 	height: 200,
						 	layout: 'fit',
						 	items: {
						 		height: this.height,
						 		xtype: 'grid',
						 		title: codeMirrorDBTextArea.getValue(),
						 		columnLines: true,
						 		stripeRows: true,
						 		autoScroll: true,
						 		columns: columnDefs,
						 		store: store,
						 		layout: 'fit'
						 	}
						 });
						 window.show();
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
                Ext.MessageBox.show({
                    title: 'Error',
                    msg: responseObject.responseText,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.ERROR
                });
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
