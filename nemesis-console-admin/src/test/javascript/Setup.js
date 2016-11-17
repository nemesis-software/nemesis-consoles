
describe("Basic Setup Assumptions", function () {

    it("has ExtJS5 loaded", function () {
        expect(Ext).toBeDefined();
        expect(Ext.getVersion()).toBeTruthy();
        expect(Ext.getVersion().major).toEqual(5);
    });

    it("has Jquery loaded", function () {
        expect($).toBeDefined();
    });

    it("has Stomp loaded", function () {
        expect(Stomp).toBeDefined();
    });

    it("has Codemirror loaded", function () {
        expect(CodeMirror).toBeDefined();
    });

    it("has AdminConsole loaded", function () {
        expect(AdminConsole).toBeDefined();
    });
});
