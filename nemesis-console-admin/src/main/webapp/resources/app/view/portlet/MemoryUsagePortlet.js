Ext.define('AdminConsole.view.portlet.MemoryUsagePortlet', {
    xtype: 'memoryUsagePortlet',
    extend: 'Ext.panel.Panel',
    layout: 'fit',
    requires: [
        'Ext.data.JsonStore',
        'Ext.chart.theme.Base',
        'Ext.chart.series.Series',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric'
    ],
    initComponent: function () {
        var me = this;
        var chart;
        var generateData = (function () {
            var data = [], date = new Date(2011, 1, 1), i = 0;
            return function () {
                data = data.slice();

                Ext.Ajax.defaultHeaders = {'nemesis-username': Ext.get('username').dom.getAttribute('value'), 'nemesis-token': Ext.get('token').dom.getAttribute('value'), 'nemesis-expiryTime': Ext.get('expiryTime').dom.getAttribute('value')};

                Ext.Ajax.request({ url: Ext.get('rest-base-url').dom.getAttribute('url') + 'platform/resource-usage',
                    method: 'GET',
                    params: {'nemesis-username': Ext.get('username').dom.getAttribute('value'), 'nemesis-token': Ext.get('token').dom.getAttribute('value'), 'nemesis-expiryTime': Ext.get('expiryTime').dom.getAttribute('value')},
                    success: function (responseObject) {
                        var result = Ext.decode(responseObject.responseText);
                        data.push({
                            date: Ext.Date.add(date, Ext.Date.DAY, i++),
                            cpu: result.percentageCPUUsage,
                            memoryHeap: result.percentageMemoryHeapUsage
                        });
                    },
                    failure: function (responseObject) {
                        var error = Ext.decode(responseObject.responseText);
                        Ext.Msg.alert('Error', 'Error: ' + error);
                    },
                    defaultHeaders: {
                        'custom': 'true'
                    }
                    //headers: {'nemesis-username': Ext.get('username').dom.getAttribute('value'), 'nemesis-token' : Ext.get('token').dom.getAttribute('value'), 'nemesis-expiryTime' : Ext.get('expiryTime').dom.getAttribute('value')}
                });

                return data;
            };
        })();

        var group = false,
            groupOp = [
                {
                    dateFormat: 'M d',
                    groupBy: 'year,month,day'
                },
                {
                    dateFormat: 'M',
                    groupBy: 'year,month'
                }
            ];

        function regroup() {
            group = !group;
            var axis = chart.axes[1],
                selectedGroup = groupOp[+group];
            axis.dateFormat = selectedGroup.dateFormat;
            axis.groupBy = selectedGroup.groupBy;

            chart.redraw();
        }


        var store = new Ext.data.JsonStore({
            fields: ['date', 'memoryHeap', 'cpu'],
            data: generateData()
        });

        chart = Ext.supports.Canvas ? {
            xtype: 'chart',
            animation: true,
            shadow: false,
            itemId: 'resource-usage-chart',
            store: store,
            axes: [
                {
                    type: 'numeric',
                    position: 'left',
                    minimum: 0,
                    maximum: 100,
                    fields: ['memoryHeap'],
                    title: 'Memory Usage (%)',
                    grid: {
                        odd: {
                            fill: '#dedede',
                            stroke: '#ddd',
                            'stroke-width': 0.5
                        }
                    },
                    renderer: function (v) {
                        return v >> 0;
                    },
                    label: {
                        font: '11px Arial'
                    }
                },
                {
                    type: 'time',
                    position: 'bottom',
                    hidden: true,
                    fields: 'date',
                    dateFormat: 'M d',
                    constrain: true,
                    groupBy: 'year,month,day',
                    aggregateOp: 'sum',
                    fromDate: new Date(2011, 1, 1),
                    toDate: new Date(2011, 1, 10)
                },
                {
                    type: 'numeric',
                    position: 'right',
                    minimum: 0,
                    maximum: 100,
                    fields: ['cpu'],
                    title: 'CPU Usage (%)',
                    renderer: function (v) {
                        return v >> 0;
                    },
                    label: {
                        font: '11px Arial'
                    }
                }
            ],
            series: [
                {
                    type: 'line',
                    lineWidth: 1,
                    fill: true,
                    showMarkers: false,
                    axis: 'left',
                    xField: 'date',
                    yField: 'memoryHeap',
                    style: {
                        'stroke-width': 1,
                        stroke: 'rgb(148, 174, 10)'
                    }
                },
                {
                    type: 'line',
                    lineWidth: 1,
                    showMarkers: false,
                    axis: 'right',
                    xField: 'date',
                    yField: 'cpu',
                    style: {
                        'stroke-width': 1,
                        stroke: 'rgb(17, 95, 166)'
                    }
                }
            ]
        } :
        {
            xtype: 'component',
            padding: '5',
            html: 'Advanced charting on this browser is not currently supported in this release.'
        };

        var intr = setInterval(function () {
            var gs = generateData();
            var toDate = chart.axes[1].toDate,
                lastDate = gs[gs.length - 1].date,
                markerIndex = chart.markerIndex || 0;

            if (+toDate < +lastDate) {
                markerIndex = 1;
                chart.axes[1].toDate = lastDate;
                chart.axes[1].fromDate = Ext.Date.add(Ext.Date.clone(chart.axes[1].fromDate), Ext.Date.DAY, 1);
                chart.markerIndex = markerIndex;
            }

            store.loadData(gs);
        }, 2000);

        Ext.apply(this, {
            layout: 'fit',
            height: 300,
            items: chart
        });


        this.callParent(arguments);
    }
});
