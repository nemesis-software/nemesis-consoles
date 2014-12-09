Ext.define('AdminConsole.view.portlet.PlatformInfoPortlet', {
    extend: 'Ext.form.Panel',
    xtype: 'platformInfoPortlet',
    frame: false,
    border: false,
    height: '100%',
    flex: 1,
    layout: 'fit',
    defaults: {
        anchor: '100%',
        margins: '0 0 10 0'
    },
    items: [
        {
            xtype: "panel",
            html: new Ext.XTemplate("<table class='defaultContent copyrightTable'><tbody><tr><td valign='bottom'><table><tbody><tr><td colspan='2' class='headline'>Copyright (c) 2000-2012 Nemesis Ltd. - <a target='_nemesis' href='{url}'>nemesis</a></td><td>&nbsp;</td></tr><tr><td class='padding'>Version:</td><td class='padding'>nemesis Multichannel Suite</td></tr><tr><td>&nbsp;</td><td>4.8.0</td></tr><tr><td>&nbsp;</td><td>Last compile: 20130206 1048</td></tr><tr><td>&nbsp;</td><td>Release date: 20121212 1722</td></tr><tr><td class='padding'>Server:</td><td class='padding'>localhost:9090</td></tr><tr><td>Locale:</td><td>English - en</td></tr><tr><td>Timezone:</td><td>Eastern European Time - Europe/Sofia</td></tr><tr><td colspan='2' class='headline'>Licence information :</td></tr><tr><td>ID:</td><td>00001-101</td></tr><tr><td>Name:</td><td>nemesis Demo Licence</td></tr><tr><td>Expiration date:</td><td>unlimited</td></tr><tr><td colspan='2'>This is a demo or develop licence in which the full functionality is enabled. <br/>Please note that the commercial licence will not offer this full range of functions.</td><td>&nbsp;</td></tr></tbody></table><br><table><tbody></tbody></table></td></tr></tbody></table>").apply({
                value: 'http://nemesis.com/'
            })
        }
    ]
});
