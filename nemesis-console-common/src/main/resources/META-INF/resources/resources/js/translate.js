/*
 *
 * Small script to implement translation
 *
 */

var globalLang = "en_GB";
var globalLangHash = {};

function setLanguage(lang, translate) {
    if (typeof globalLangHash[lang] != 'object') {
        console.log('Download the language');
        Ext.Ajax.request({
            method: 'GET',
            url: 'resources/app/locale/' + lang + '.json',
            async: false, // TODO: check with some browsers, aka Chrome, that does not support sync
            success: function (res) {
                var langData = Ext.JSON.decode(res.responseText, true);
                if (null == langData) {
                    console.log('cannot parse lang', lang);
                }
                globalLangHash[lang] = langData;
                if (translate) {
                    retranslate(lang, getRootCmp(), true);
                    Ext.each(Ext.ComponentQuery.query('window'), function (n) {
                        translateObj(n);
                        retranslate(globalLang, n);
                    });
                }
            },
            failure: function () {
                globalLangHash[lang] = {};
                console.error('Unknown language', lang);
            }
        });
    } else {
        if (translate) {
            retranslate(lang, getRootCmp(), true);
            Ext.each(Ext.ComponentQuery.query('window'), function (n) {
                translateObj(n);
                retranslate(globalLang, n);
            });
        }
    }

}

setLanguage(globalLang);

// Function _t does the translation
function _t(text) {
    if (!text || !text.replace) return;

    return text.replace(/\$\{(.+?)\}/g, function (m, id) {
        if (!globalLangHash || !globalLangHash[globalLang]) {
            console.log('Problem with', globalLang, globalLangHash);
            return id;
        }
        if (!globalLangHash[globalLang][id]) console.log('translate id', id);
        return globalLangHash[globalLang][id] || id;
    });
}

function translate(textId) {
    if (!textId || !textId.replace) return;
    if (!globalLangHash || !globalLangHash[globalLang]) {
        console.log('Problem with', globalLang, globalLangHash);
        return textId;
    }

    if (globalLangHash[globalLang][textId]) {
        return globalLangHash[globalLang][textId];
    } else if (globalLangHash[globalLang][textId.toLowerCase()]) {
        return globalLangHash[globalLang][textId.toLowerCase()];
    } else {
        console.log('missing localization for textId:', textId);
        return textId;
    }
}

function setTitle(obj, title) {
    title = translate(Ext.isObject(title) ? title.text : title);
    if (obj.xtype == 'entityPopupWindow' && !obj.title) {
        obj.title = title;
    }
    setTimeout(function () {
        obj.setTitle(title)
    }, 1);
}

function translateObj(obj) {
    if (obj.emptyText) {
        if (!obj.orig_emptyText) {
            obj.orig_emptyText = obj.emptyText;
        }
        obj.emptyText = translate(obj.orig_emptyText);

        if (obj.applyEmptyText) {
            obj.applyEmptyText();
        }
    }

    if (obj.initialConfig && obj.initialConfig.text && obj.setText) {
        obj.setText(translate(obj.initialConfig.text));

        if (obj.initialConfig.tooltip && obj.setTooltip) {
            setTimeout(function () {
                obj.setTooltip(translate(obj.initialConfig.tooltip));
            }, 1);
        }
    }
    if (obj.constructTitle) {
        setTitle(obj, obj.constructTitle());
    } else if (obj.title) {
        if (!obj.orig_title) {
            obj.orig_title = obj.title;
        }
        if (obj.setTitle) {
            setTitle(obj, obj.orig_title);
        } else if (obj.xtype == 'tab') {
            obj.setText(translate(obj.orig_title));
        }
    }

    if (obj.initialConfig && obj.xtype == 'tbtext') {
        obj.text = translate(obj.initialConfig.text);
    }
    else if (obj.xtype == 'pagingtoolbar') {
        obj.afterPageText = translate('of {0}');
        obj.displayMsg = translate('Displaying {0} - {1} of {2}');
        obj.emptyMsg = translate('No data to display');
        if (obj.rendered) {
            obj.doRefresh();
        }
    }

    if (obj.getFieldLabel && obj.fieldLabel) {
        if (!obj.orig_fieldLabel) obj.orig_fieldLabel = obj.getFieldLabel();
        obj.setFieldLabel(translate(obj.orig_fieldLabel));
    }

    if (obj.tooltip || obj.orig_tooltip) {
        if (!obj.orig_tooltip) obj.orig_tooltip = obj.tooltip;
        if (obj.setTooltip) obj.setTooltip(translate(obj.orig_tooltip)); else obj.tooltip = translate(obj.orig_tooltip);
    }
}

function getRootCmp() {
    return Ext.ComponentQuery.query('viewport')[0];
}

function retranslate(lang, w, isRootCmp) {
    if (isRootCmp) {
        globalLang = lang;
        w.setLoading(true);
        Ext.each(Ext.StoreManager.getRange(), function (n) {
            if (n.translate) {
                n.translate();
            }
            else if (n.getProxy() && n.getProxy().getReader().type == 'transjson') n.load(); // Reload the store, so retranslation could happen
        });
    }

    Ext.each(w.query('button,displayfield,textfield,tbtext,pagingtoolbar,tabpanel,tab,gridpanel,fieldset,treepanel,gridcolumn,backendconsoleMenu,contentSearchForm,nemesisBooleanField,nemesisTextField,nemesisCollectionField,nemesisDateField,nemesisTextarea,nemesisDecimalField,nemesisEntityField,nemesisMediaField,nemesisEnumField,nemesisHtmlEditor,nemesisIntegerField,nemesisPasswordField'), function (n) {
        translateObj(n);
    });

    Ext.each(w.query('component'), function (c) {
        if (c.initialConfig && c.initialConfig.autoEl && c.initialConfig.autoEl.html) {
            if (!c.rendered) {
                c.autoEl.html = translate(c.initialConfig.autoEl.html);
            } else {
                c.update(translate(c.initialConfig.autoEl.html));
            }
        }
    });

    Ext.each(w.query('actioncolumn'), function (n) {
        Ext.each(n.items, function (n) {
            if (!n.tooltip) return;
            if (!n.orig_tooltip) n.orig_tooltip = n.tooltip;
            n.tooltip = _t(n.orig_tooltip);
        });
    });

    Ext.each(w.query('searchField'), function (n) {
        translateObj(n);
        translateObj(n.fieldSet.down('textfield(true)'));
    });

    var navigationTree = Ext.getCmp('navigation-tree');
    if (navigationTree) navigationTree.getView().refresh();

    setTimeout(function () {
        w.setLoading(false);
    }, 100);
}

Ext.define('Nemesis.reader.JsonReader', {
    extend: 'Ext.data.reader.Json',
    alias: 'reader.transjson',
    getResponseData: function (response) {
        var o;
        try {
            o = Ext.decode(response.responseText);
        } catch (ex) {
            Ext.Logger.warn('TRANSJSON: Unable to parse the JSON returned by the server');
            return this.createReadError(ex.message);
        }

        function doTran(o) {
            var i;
            if (Ext.isArray(o)) {
                for (i = o.length - 1; i >= 0; i--) {
                    if (Ext.isString(o[i])) o[i] = _t(o[i]);
                    if (Ext.isArray(o[i])) doTrans(o[i]);
                    if (Ext.isObject(o[i])) doTrans(o[i]);
                }
                return;
            }
            if (Ext.isObject(o)) {
                for (i in o) {
                    if (Ext.isString(o[i])) o[i] = _t(o[i]);
                    if (Ext.isArray(o[i])) doTrans(o[i]);
                    if (Ext.isObject(o[i])) doTrans(o[i]);
                }
            }
        }

        doTrans(o);
        return o;
    }
});

Ext.onReady(function () {
    // Overwrite some components
    // Translation related overridings
    var refAlert = Ext.MessageBox.alert;
    var refConfirm = Ext.MessageBox.confirm;

    Ext.override(Ext.MessageBox, {
        alert: function (cfg, msg, fn, scope, x, y, z) {
            cfg = translate(cfg);
            msg = translate(msg);
            return refAlert.call(this, cfg, msg, fn, scope, x, y, z);
        },
        confirm: function (cfg, msg, fn, scope, x, y, z) {
            cfg = translate(cfg);
            msg = translate(msg);
            return refConfirm.call(this, cfg, msg, fn, scope, x, y, z);
        }
    });

    Ext.override(Ext.Component, {
        initComponent: function () {
            this.callParent();
            translateObj(this);
        }
    }); // Translate inline all the new components
    Ext.override(Ext.Window, {
        initComponent: function () {
            this.callParent();
            retranslate(globalLang, this);
        }
    });

    Ext.override(Ext.data.ArrayStore, {
        constructor: function (config) {
            this.callParent(arguments);
            if (this.data && this.translate) {
                this.translate();
            }
        },
        translate: function () {
            var items = this.data.items;
            var fields = this.model.fields;
            for (var i = 0; i < items.length; i++) {
                for (var j = 0; j < fields.length; j++) {
                    if (fields[j].translate) {
                        var initialDataField = 'initial_' + fields[j].name;
                        if (!Ext.isDefined(items[i].data[initialDataField])) {
                            items[i].data[initialDataField] = items[i].data[fields[j].name];
                        }
                        var displayValue = translate(items[i].data[initialDataField]);
                        items[i].set(fields[j].name, displayValue);
                        if (items[i].raw) {
                            items[i].raw[j] = displayValue;
                        }
                    }
                }
                items[i].commit();
            }
        }
    });
});
