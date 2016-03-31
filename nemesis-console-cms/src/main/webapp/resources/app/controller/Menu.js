Ext.define('console.controller.Menu', {
	extend: 'Ext.app.Controller',

	control: {
		'#addWidgetMenu' : {
			addWidget: 'onAddWidget'
		}
	},

	/**
	 * Adds a new widget to the slots menu
	 */
	onAddWidget: function(contentSlot){
		var me = this;
		console.log(me.$className + '.onAddWidget()');
		var addWidgetWindow = Ext.ComponentQuery.query("#addWidgetWin")[0];
		// If already exist opened "add widget window" destroys it before opens a new one
		if (addWidgetWindow) {
			addWidgetWindow.destroy();
		}
		Ext.create('console.components.window.AddWidget', {
			contentSlot: contentSlot
		}).show();
	}
});
