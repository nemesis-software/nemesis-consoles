Ext.define("console.utils.Utilities", {
    statics: {
        translateMenuItems: function(records) {
            var langCode = console.app.getLanguage(),
                title;

            records.forEach(function(record){
                title = record.get('title');
                if(langCode === 'bg_BG' && title && title.bg_BG) {
                    record.set('name', title.bg_BG.value);
                } else if ((langCode === 'en' || langCode === 'en_GB' || langCode === 'en_US') && title && title.en) {
                    record.set('name', title.en.value);
                }
            });
        }
    }
});