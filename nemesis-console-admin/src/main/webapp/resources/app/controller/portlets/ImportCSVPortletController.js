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
				click: this.importCsv
			},
			'#adminDashboard #importCSVPortletId #validateCsvBtn': {
				click: this.validateCsv
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
	importCsv:function(){
		this.import(false);
	},
	validateCsv:function(){
		this.import(true);
	},
	import: function(validateOnly) {
		var stringContent = codeMirrorCSVTextArea.getValue();
		var data = {
			"csv": stringContent
		};
		if (stringContent) {
			Ext.Ajax.request({
				url: Ext.get('rest-base-url').dom.getAttribute('url') + (validateOnly ? 'platform/content/validate' : 'platform/content/import'),
				method: 'POST',
				jsonData: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json'
				},
				success: function(responseObject) {
					var result = Ext.decode(responseObject.responseText);
					if (result.message === 'success') {
						Ext.toast({
							html: 'Import successful',
							closable: false,
							align: 't',
							slideInDuration: 400,
							minWidth: 400
						});
					} else {
						Ext.toast({
							html: 'Import failed',
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
			var csvFile = Ext.getCmp('csvFile');
			var formData = new FormData();
			// can't get the file path directly from the component due to browser security that does not allow for
			// javascript to access the local file system directly Browser will return a "fakePath"
			// reference to the actual local file, so getValue() will not work. To work around this, we have to access
			// the dom file directly from the input element!!!
			formData.append('file', csvFile.getEl().down('input[type=file]').dom.files[0]);
			var req = new XMLHttpRequest();
			req.open("POST", Ext.get('rest-base-url').dom.getAttribute('url') + (validateOnly ?  'platform/content/file-validate' : 'platform/content/file-import'), true);
			// set headers and mime-type appropriately
			req.setRequestHeader('X-Nemesis-Token', Ext.get('token').dom.getAttribute('value'));
			req.onload = function() {
				Ext.getCmp('csv-import-form').up().getEl().unmask();
			};
			req.onreadystatechange = function() {
				if (req.readyState == 4 && req.status >= 400) {
					req.hasError = true;
					Ext.MessageBox.show({
						title: 'Error',
						msg: 'There was problem with the file. Import failed.',
						buttons: Ext.MessageBox.OK,
						icon: Ext.MessageBox.ERROR
					});
				} else if(req.readyState == 4 && req.status == 200) {
					Ext.toast({
						html: 'Import successful.',
						closable: false,
						align: 't',
						slideInDuration: 400,
						minWidth: 400
					});
				}
			};
			Ext.getCmp('csv-import-form').up().getEl().mask("Uploading file ...");
			req.send(formData);
			// var form = Ext.getCmp('csv-import-form');
			// if (form.isValid()) {
			// 	form.submit({
			// 		headers: {
			// 			'X-Nemesis-Token': Ext.get('token').dom.getAttribute('value')
			// 		},
			// 		url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/content/file-import',
			// 		waitMsg: 'Importing...',
			// 		success: function(fp, o) {
			// 			msg('Success', 'Processed file "' + o.result.file + '" on the server');
			// 		}
			// 	});
			// }
		}
	}

});
