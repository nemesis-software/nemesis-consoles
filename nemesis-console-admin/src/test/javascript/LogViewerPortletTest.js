
describe("LogViewerPortlet test spec", function () {
    var portlet, app;

    beforeEach(function () {
        app = new AdminConsole.App();
        expect(app).toBeDefined();
        portlet = Ext.create('AdminConsole.view.portlet.LogViewerPortlet');
        expect(portlet).toBeDefined();
    });

//    it("Expect onClearClick clears the text-area", function() {
//        expect(Ext.ComponentQuery.query("#outputText")[0].getValue()).toBe('Unable to obtain the log4j log. Make sure the storefront is accessible and the log4j2 is configured to use LogStream appender.');
//
//        portlet.onClearClick();
//
//        expect(Ext.ComponentQuery.query("#outputText")[0].getValue()).toBe('');
//    });
});
