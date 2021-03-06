/*! kibana - v3.0.0milestone4 - 2013-10-17
 * Copyright (c) 2013 Rashid Khan; Licensed Apache License */

define("panels/pie/module", ["angular", "app", "underscore", "jquery", "kbn", "config"], function (a, b, c, d, e) {
    var f = a.module("kibana.panels.pie", []);
    b.useModule(f), f.controller("pie", ["$scope", "$rootScope", "querySrv", "dashboard", "filterSrv", function (b, d, e, f, g) {
        b.panelMeta = {editorTabs: [
            {title: "Queries", src: "app/partials/querySelect.html"}
        ], modals: [
            {description: "Inspect", icon: "icon-info-sign", partial: "app/partials/inspector.html", show: b.panel.spyable}
        ], status: "Deprecated", description: "Uses an Elasticsearch terms facet to create a pie chart. You should really only point this at not_analyzed fields for that reason. This panel is going away soon, it has <strong>been replaced by the terms panel</strong>. Please use that one instead."};
        var h = {query: {field: "_type", goal: 100}, queries: {mode: "all", ids: []}, size: 10, exclude: [], donut: !1, tilt: !1, legend: "above", labels: !0, mode: "terms", default_field: "DEFAULT", spyable: !0};
        c.defaults(b.panel, h), b.init = function () {
            b.$on("refresh", function () {
                b.get_data()
            }), b.get_data()
        }, b.set_mode = function (a) {
            switch (a) {
                case"terms":
                    b.panel.query = {field: "_all"};
                    break;
                case"goal":
                    b.panel.query = {goal: 100}
            }
        }, b.set_refresh = function (a) {
            b.refresh = a
        }, b.close_edit = function () {
            b.refresh && b.get_data(), b.refresh = !1, b.$emit("render")
        }, b.get_data = function () {
            if (0 !== f.indices.length) {
                b.panelMeta.loading = !0;
                var d = b.ejs.Request().indices(f.indices);
                b.panel.queries.ids = e.idsByMode(b.panel.queries);
                var h = b.ejs.BoolQuery();
                c.each(b.panel.queries.ids, function (a) {
                    h = h.should(e.getEjsObj(a))
                });
                var i;
                "terms" === b.panel.mode ? (d = d.facet(b.ejs.TermsFacet("pie").field(b.panel.query.field || b.panel.default_field).size(b.panel.size).exclude(b.panel.exclude).facetFilter(b.ejs.QueryFilter(b.ejs.FilteredQuery(h, g.getBoolFilter(g.ids))))).size(0), b.inspector = a.toJson(JSON.parse(d.toString()), !0), i = d.doSearch(), i.then(function (a) {
                    b.panelMeta.loading = !1, b.hits = a.hits.total, b.data = [];
                    var d = 0;
                    c.each(a.facets.pie.terms, function (a) {
                        var c = {label: a.term, data: a.count};
                        b.data.push(), b.data.push(c), d += 1
                    }), b.$emit("render")
                })) : (d = d.query(h).filter(g.getBoolFilter(g.ids)).size(0), b.inspector = a.toJson(JSON.parse(d.toString()), !0), i = d.doSearch(), i.then(function (a) {
                    b.panelMeta.loading = !1;
                    var c = a.hits.total, d = b.panel.query.goal - c;
                    b.data = [
                        {label: "Complete", data: c, color: "#BF6730"},
                        {data: d, color: "#e2d0c4"}
                    ], b.$emit("render")
                }))
            }
        }
    }]), f.directive("pie", ["querySrv", "filterSrv", function (b, f) {
        return{restrict: "A", link: function (g, h) {
            function i() {
                h.css({height: g.panel.height || g.row.height});
                var a;
                a = "goal" === g.panel.mode ? {show: g.panel.labels, radius: 0, formatter: function (a, b) {
                    var d = parseInt(g.row.height.replace("px", ""), 10) / 8 + String("px");
                    return c.isUndefined(a) ? "" : '<div style="font-size:' + d + ';font-weight:bold;text-align:center;padding:2px;color:#fff;">' + Math.round(b.percent) + "%</div>"
                }} : {show: g.panel.labels, radius: 2 / 3, formatter: function (a, b) {
                    return'<div "style="font-size:8pt;text-align:center;padding:2px;color:white;">' + a + "<br/>" + Math.round(b.percent) + "%</div>"
                }, threshold: .1};
                var e = {series: {pie: {innerRadius: g.panel.donut ? .45 : 0, tilt: g.panel.tilt ? .45 : 1, radius: 1, show: !0, combine: {color: "#999", label: "The Rest"}, label: a, stroke: {width: 0}}}, grid: {backgroundColor: null, hoverable: !0, clickable: !0}, legend: {show: !1}, colors: b.colors};
                h.is(":visible") && require(["jquery.flot.pie"], function () {
                    g.legend = d.plot(h, g.data, e).getData(), g.$$phase || g.$apply()
                })
            }

            h.html('<center><img src="img/load_big.gif"></center>'), g.$on("render", function () {
                i()
            }), a.element(window).bind("resize", function () {
                i()
            }), h.bind("plotclick", function (a, b, c) {
                c && "terms" === g.panel.mode && f.set({type: "terms", field: g.panel.query.field, value: c.series.label})
            });
            var j = d("<div>");
            h.bind("plothover", function (a, b, c) {
                c ? j.html([e.query_color_dot(c.series.color, 15), c.series.label || "", parseFloat(c.series.percent).toFixed(1) + "%"].join(" ")).place_tt(b.pageX, b.pageY, {offset: 10}) : j.remove()
            })
        }}
    }])
});
