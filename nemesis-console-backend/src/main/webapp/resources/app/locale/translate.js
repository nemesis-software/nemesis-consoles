/*
 *
 * Small script to implement translation
 *
 */

var globalLang="en";
var globalLangHash = {};

// Function _t does the translation
function _t(text) {
  if ((!text)||(!text.replace)) return;
  if (typeof globalLangHash[globalLang] != 'object') {
    console.log('Download the language');
    Ext.Ajax.request({
      method: 'GET',
      url: 'resources/app/locale/'+globalLang+'.json',
      async: false, // TODO: check with some browsers, aka Chrome, that does not support sync
      success: function(res) {
        globalLangHash[globalLang] = Ext.JSON.decode(res.responseText,true);
      },
      failure: function() {
        globalLangHash[globalLang] = {};
        console.error('Unknown language',globalLang);
      }
    });
  }

  return text.replace(/\$\{(.+?)\}/g,function(m,id) {
    if ((!globalLangHash)||(!globalLangHash[globalLang])) {
      console.log('Problem with',globalLang,globalLangHash);
      return id;
    }
    if (!globalLangHash[globalLang][id]) console.log('translate id',id);
    return globalLangHash[globalLang][id]||id;
  });
}

function translateObj(obj) {
  if (obj.setValue && obj.emptyText) {
    if (!obj.orgEmptyText) obj.orgEmptyText = obj.emptyText;
    obj.emptyText = _t(obj.orgEmptyText);
    setTimeout(function() { obj.setValue(obj.getValue()); },1);
    //obj.setValue(obj.getValue());
  }
  
  if (obj.text && obj.setText) {
    if (!obj.orgText) obj.orgText = obj.getText? obj.getText():obj.text;
    obj.setText(_t(obj.orgText));
    if (obj.setTooltip && (!obj.orgTooltip)) {
      if ((!obj.tooltip)&&((obj.initialConfig)&&(!obj.initialConfig.tooltip))) {
        obj.orgTooltip = obj.orgText;
        setTimeout(function() { obj.setTooltip(_t(obj.orgText)); },1);
	//obj.setTooltip(_t(obj.orgText));
      }
    }
  }

  if (obj.title && obj.setTitle) {
    console.log('obj title',obj.title,obj);
    if (!obj.orgTitle) obj.orgTitle = obj.title;
    var t = obj.orgTitle;
    if (typeof t == 'object' && t.text) t = t.text;
    setTimeout(function() { obj.setTitle(_t(t));},1);
    //obj.setTitle(_t(obj.orgTitle));
  }

  if (obj.getFieldLabel && obj.fieldLabel) {
    if (!obj.orgFieldLabel) obj.orgFieldLabel = obj.getFieldLabel();
    setTimeout(function() { obj.setFieldLabel(_t(obj.orgFieldLabel));},1);
    //obj.setFieldLabel(_t(obj.orgFieldLabel));
  }

  if (obj.tooltip || obj.orgTooltip || ((obj.initialConfig)&&(obj.initialConfig.tooltip))) {
    if (!obj.orgTooltip) obj.orgTooltip = obj.tooltip;
    if (obj.setTooltip) obj.setTooltip(_t(obj.orgTooltip)); else obj.tooltip = _t(obj.orgTooltip);
  }
  
  if (obj.config && obj.config.autoEl && obj.config.autoEl.html && obj.setHtml) {
    //console.log(_t(obj.config.autoEl.html));
    setTimeout(function() { obj.setHtml(_t(obj.config.autoEl.html));},1);
    //obj.setHtml(_t(obj.config.autoEl.html));
  }
}

function retranslate(lang,w) {
  globalLang = lang;

  if (w && (!w.query)) return translateObj(w);
  
  if (w) w.setLoading(true);
     else Ext.each(Ext.ComponentQuery.query('viewport'),function(n) { n.setLoading(true); });
  setTimeout(function() {
    var q = Ext.ComponentQuery;
    if (w) q = w;
    Ext.each(q.query('component,button,displayfield,textfield,tabpanel,tab,gridpanel,fieldset,treepanel,gridcolumn,window'),function(n) {
      translateObj(n);
    });

    Ext.each(q.query('actioncolumn'),function(n) {
      Ext.each(n.items,function(n) {
        if (!n.tooltip) return;
        if (!n.orgTooltip) n.orgTooltip = n.tooltip;
        n.tooltip = _t(n.orgTooltip);
      });
    });

    Ext.each(Ext.StoreManager.getRange(),function(n) {
        var p = n.getProxy();
        if (!p) return;
        if (p.getReader().type == 'transjson') n.load(); // Reload the store, so retranslation could happen
    });

    setTimeout(function() {
      if (w) w.setLoading(false); else Ext.each(Ext.ComponentQuery.query('viewport'),function(n) { n.setLoading(false); });
    },100);
  },50);
}

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
   
});
