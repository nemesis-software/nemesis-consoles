/*
 *
 * Small script to implement translation
 *
 */

var globalLang="en";
var globalLangHash = {};

function setLanguage(lang, translate) {
	if (typeof globalLangHash[lang] != 'object') {
		console.log('Download the language');
	    Ext.Ajax.request({
	      method: 'GET',
	      url: 'resources/app/locale/'+lang+'.json',
	      async: false, // TODO: check with some browsers, aka Chrome, that does not support sync
	      success: function(res) {
	    	  var langData = Ext.JSON.decode(res.responseText,true);
	    	  if (null == langData) {
	    		  console.log('cannot parse lang', lang);
	    	  }
	    	  globalLangHash[lang] = langData;
	    	  if (translate) {
	    		  retranslate(lang, getRootCmp());
	    	  }
	      },
	      failure: function() {
	        globalLangHash[lang] = {};
	        console.error('Unknown language',lang);
	      }
	    });
	} else {
		if (translate) {
        	retranslate(lang, getRootCmp());
        }
	}
	
}

setLanguage(globalLang);

// Function _t does the translation
function _t(text) {
  if (!text||!text.replace) return;
  
  return text.replace(/\$\{(.+?)\}/g,function(m,id) {
    if (!globalLangHash||!globalLangHash[globalLang]) {
      console.log('Problem with',globalLang,globalLangHash);
      return id;
    }
    if (!globalLangHash[globalLang][id]) console.log('translate id',id);
    return globalLangHash[globalLang][id]||id;
  });
}

function translate(textId) {
	if (!textId||!textId.replace) return;
	if (!globalLangHash||!globalLangHash[globalLang]) {
		console.log('Problem with',globalLang,globalLangHash);
		return textId;
	}

	if (globalLangHash[globalLang][textId]) {
		return globalLangHash[globalLang][textId];
	} else {
		console.log('missing localization for textId:',textId);
		return textId;
	}
}

function setTitle(obj, title) {
	setTimeout(function() {obj.setTitle(translate(title))},1);
}

function translateObj(obj) {
  if (obj.initialConfig && obj.initialConfig.emptyText && obj.setValue) {
    obj.emptyText = translate(obj.initialConfig.emptyText);
    obj.setValue(obj.getValue());
  }
  
  if (obj.initialConfig && obj.initialConfig.text && obj.setText) {
    obj.setText(translate(obj.initialConfig.text));
    
    if (obj.initialConfig.tooltip && obj.setTooltip) {
        setTimeout(function() { obj.setTooltip(translate(obj.initialConfig.tooltip)); },1);
    }
  }
  if (obj.constructTitle) {
	  setTitle(obj, obj.constructTitle());
  } else if (obj.initialConfig && obj.title && obj.setTitle) {
	  if (!obj.initialConfig.title) {
		  obj.initialConfig.title = obj.title;
	  }
	  setTitle(obj, obj.initialConfig.title);
  }

  if (obj.getFieldLabel && obj.fieldLabel) {
    if (!obj.orgFieldLabel) obj.orgFieldLabel = obj.getFieldLabel();
    obj.setFieldLabel(translate(obj.orgFieldLabel));
    //obj.setFieldLabel(_t(obj.orgFieldLabel));
  }

  if (obj.tooltip || obj.orgTooltip || ((obj.initialConfig)&&(obj.initialConfig.tooltip))) {
    if (!obj.orgTooltip) obj.orgTooltip = obj.tooltip;
    if (obj.setTooltip) obj.setTooltip(_t(obj.orgTooltip)); else obj.tooltip = _t(obj.orgTooltip);
  }
  
  /*if (obj.config && obj.config.autoEl && obj.config.autoEl.html && obj.setHtml) {
    setTimeout(function() { obj.setHtml(_t(obj.config.autoEl.html));},1);
  }*/
}

function getRootCmp() {
	return Ext.ComponentQuery.query('viewport')[0];
}

function retranslate(lang, w) {
	globalLang = lang;
	w.setLoading(true);
  
	Ext.each(Ext.StoreManager.getRange(),function(n) {
		if (n instanceof Nemesis.LocalizedArrayStore) {
			n.translate();
		}
		else if (n.getProxy() && n.getProxy().getReader().type == 'transjson') n.load(); // Reload the store, so retranslation could happen
    });
    
    Ext.each(w.query('button,displayfield,textfield,tabpanel,tab,gridpanel,fieldset,treepanel,gridcolumn,window,backendconsoleMenu,contentSearchForm'),function(n) {
    	translateObj(n);
    });
    
    Ext.each(w.query('component'), function(c) {
    	if (c.initialConfig && c.initialConfig.autoEl && c.initialConfig.autoEl.html) {
    		c.update(translate(c.initialConfig.autoEl.html));
    	}
    });

    Ext.each(w.query('actioncolumn'),function(n) {
    	Ext.each(n.items,function(n) {
    		if (!n.tooltip) return;
    		if (!n.orgTooltip) n.orgTooltip = n.tooltip;
    		n.tooltip = _t(n.orgTooltip);
    	});
    });
    
    Ext.each(w.query('searchField'), function(n) {
    	translateObj(n);
    	translateObj(n.fieldSet.down('textfield(true)'));
    });
    
    Ext.getCmp('navigation-tree').getView().refresh();

    setTimeout(function() {
    	w.setLoading(false);
    },100);
}

Ext.define('Nemesis.LocalizedArrayStore', {
    extend: 'Ext.data.ArrayStore',
    constructor: function(config) {
    	this.callParent([config]);
    	if (this.data) {
    		this.translate();
    	}
    },
    translate: function() {
    	var items = this.data.items;
    	var fields = this.model.fields;
    	for(var i=0; i<items.length; i++) {
    		for(var j=0; j<fields.length; j++) {
    			if (fields[j].translate) {
    				var initialDataField = 'initial_' + fields[j].name;
    				if (!Ext.isDefined(items[i].data[initialDataField])) {
    					items[i].data[initialDataField] = items[i].data[fields[j].name];
    				}
    				items[i].set(fields[j].name, translate(items[i].data[initialDataField]));
    			}
    		}
    		items[i].commit();
    	}
    }
});

Ext.define('Nemesis.reader.JsonReader', {
    extend: 'Ext.data.reader.Json',
    alias : 'reader.transjson',
    getResponseData: function(response) {
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
             for (i=o.length-1;i>=0;i--) {
                if (Ext.isString(o[i])) o[i]=_t(o[i]);
                if (Ext.isArray(o[i])) doTrans(o[i]);
                if (Ext.isObject(o[i])) doTrans(o[i]);
             }
             return;
          }
          if (Ext.isObject(o)) {
             for (i in o) {
                if (Ext.isString(o[i])) o[i]=_t(o[i]);
                if (Ext.isArray(o[i])) doTrans(o[i]);
                if (Ext.isObject(o[i])) doTrans(o[i]);
             }
          }
       }
       
       doTrans(o);
       return o;
    }
});

Ext.onReady(function() {
   // Overwrite some components
   // Translation related overridings
   var refAlert = Ext.MessageBox.alert;
   var refConfirm = Ext.MessageBox.confirm;
      
   Ext.override(Ext.MessageBox,{
       alert: function(cfg,msg,fn,scope,x,y,z) {
           if (Ext.isString(cfg)) { cfg = _t(cfg); msg = _t(msg); } else { cfg.msg = _t(cfg.msg); cfg.title = _t(cfg.title); }
           return refAlert.call(this,cfg,msg,fn,scope,x,y,z);
       },
       confirm: function(cfg,msg,fn,scope,x,y,z) {
           if (Ext.isString(cfg)) { cfg = _t(cfg); msg = _t(msg); } else { cfg.msg = _t(cfg.msg); cfg.title = _t(cfg.title); }
           return refConfirm.call(this,cfg,msg,fn,scope,x,y,z);
       }
   });
                                                  
   Ext.override(Ext.Window,{ initComponent: function() { this.callParent(); translateObj(this); retranslate(globalLang,this); } });
   Ext.override(Ext.Component,{ initComponent: function() { this.callParent(); translateObj(this); } }); // Translate inline all the new components
});
