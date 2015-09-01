/*
 * nemesis Platform - NExt-generation Multichannel E-commerce SYStem
 *
 * Copyright (c) 2010 - 2014 nemesis
 * All rights reserved.
 *
 * This software is the confidential and proprietary information of nemesis
 * ("Confidential Information"). You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with nemesis.
 */
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
