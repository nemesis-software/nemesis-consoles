describe("SystemLoggersPortlet test spec", function () {
    var portlet;

    beforeEach(function () {
        portlet = Ext.create('AdminConsole.view.portlet.SystemLoggersPortlet');
        expect(portlet).toBeDefined();
    });

    /*
     it("Expect onSaveClick saves the grid store", function() {
     expect(Ext.ComponentQuery.query("#outputText")[0].getValue()).toBe('Unable to obtain the log4j log. Make sure the storefront is accessible and the log4j2 is configured to use LogStream appender.');

     portlet.onClearClick();

     expect(Ext.ComponentQuery.query("#outputText")[0].getValue()).toBe('');
     });
     */
});
