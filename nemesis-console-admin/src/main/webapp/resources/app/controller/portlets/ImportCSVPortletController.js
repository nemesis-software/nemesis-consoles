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

	codeMirrorTextArea: undefined,

	applyCodeMirror: function() {
		var textArea = Ext.ComponentQuery.query('#csvContent')[0];
		var height = textArea.getHeight();

		codeMirrorTextArea = CodeMirror(document.getElementById("csvContent-bodyEl"), {
			lineNumbers: true,
			mode: 'q'
		});

		// dirty hack to hide textareafield & display codemirror window with its height; otherwise both windows are shown - no idea why 
		codeMirrorTextArea.setSize(null, height);
		document.getElementById("csvContent-inputWrap").style.display = "none";
	},

	importContent: function() {
		var stringContent = codeMirrorTextArea.getValue();
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
							html: 'Content is valid!',
							closable: false,
							align: 't',
							slideInDuration: 400,
							minWidth: 400
						});
					} else {
						Ext.toast({
							html: 'Invalid content!',
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
		}
	}

});