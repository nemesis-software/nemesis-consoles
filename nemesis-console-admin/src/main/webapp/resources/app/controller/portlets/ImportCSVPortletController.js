Ext.define('AdminConsole.controller.portlets.ImportCSVPortletController', {
	extend: 'Ext.app.Controller',
	views: ['AdminConsole.view.portlet.ImportCSVPortlet'],
	refs: [],

	init: function() {
		this.control({
			'#adminDashboard #importCSVPortletId': {
				afterrender: this.applyCodeMirror
			},
			'#adminDashboard #importCSVPortletId #importCsvBtn': {
				click: this.importContent
			}
		});
	},

	codeMirrorCSVTextArea: undefined,

	applyCodeMirror: function() {
		var textArea = Ext.ComponentQuery.query('#csvContent')[0];
		var height = textArea.getHeight();

		codeMirrorCSVTextArea = CodeMirror(document.getElementById("csvContent-bodyEl"), {
			lineNumbers: true,
			mode: 'q'
		});

		// dirty hack to hide textareafield & display codemirror window with its height; otherwise both windows are shown - no idea why 
		codeMirrorCSVTextArea.setSize(null, height);
		document.getElementById("csvContent-inputWrap").style.display = "none";
	},

	importContent: function() {
		var stringContent = codeMirrorCSVTextArea.getValue();
		var data = {
			"csv": stringContent
		};
		if (stringContent) {
			Ext.Ajax.request({
				url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/content/import',
				method: 'POST',
				jsonData: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				},
				success: function(responseObject) {
					var result = Ext.decode(responseObject.responseText);
					if (result.message === 'success') {
						Ext.toast({
							html: 'Import started',
							closable: false,
							align: 't',
							slideInDuration: 400,
							minWidth: 400
						});
					} else {
						Ext.toast({
							html: 'Import failed to start',
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
		} else {
			var form = Ext.getCmp('csv-import-form');
			if (form.isValid()) {
				form.submit({
					headers: {
						'X-Nemesis-Token': Ext.get('token').dom.getAttribute('value')
					},
					url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/content/file-import',
					waitMsg: 'Importing...',
					success: function(fp, o) {
						msg('Success', 'Processed file "' + o.result.file + '" on the server');
					}
				});
			}
		}
	}

});
