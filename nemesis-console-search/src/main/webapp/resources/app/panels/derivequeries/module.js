/*! kibana - v3.0.0milestone4 - 2013-10-17
 * Copyright (c) 2013 Rashid Khan; Licensed Apache License */

define("panels/derivequeries/module", ["angular", "app", "underscore"], function (a, b, c) {
    var d = a.module("kibana.panels.derivequeries", []);
    b.useModule(d), d.controller("derivequeries", ["$scope", "$rootScope", "querySrv", "fields", "dashboard", "filterSrv", function (b, d, e, f, g, h) {
        b.panelMeta = {modals: [
            {description: "Inspect", icon: "icon-info-sign", partial: "app/partials/inspector.html", show: b.panel.spyable}
        ], status: "Experimental", description: "Creates a new set of queries using the Elasticsearch terms facet. For example, you might want to create 5 queries showing the most frequent HTTP response codes. Be careful not to select a high cardinality field, as Elasticsearch must load all unique values into memory."};
        var i = {loading: !1, label: "Search", query: "*", ids: [], field: "_type", fields: [], spyable: !0, rest: !1, size: 5, mode: "terms only", exclude: [], history: [], remember: 10};
        c.defaults(b.panel, i), b.init = function () {
            b.editing = !1, b.panel.fields = f.list
        }, b.get_data = function () {
            if (j(b.panel.query), 0 !== g.indices.length) {
                b.panelMeta.loading = !0;
                var a = b.ejs.Request().indices(g.indices);
                a = a.facet(b.ejs.TermsFacet("query").field(b.panel.field).size(b.panel.size).exclude(b.panel.exclude).facetFilter(b.ejs.QueryFilter(b.ejs.FilteredQuery(b.ejs.QueryStringQuery(b.panel.query || "*"), h.getBoolFilter(h.ids))))).size(0), b.populate_modal(a);
                var d = a.doSearch();
                d.then(function (a) {
                    b.panelMeta.loading = !1;
                    var d;
                    "" === b.panel.query || "terms only" === b.panel.mode ? d = "" : "AND" === b.panel.mode ? d = " AND (" + b.panel.query + ")" : "OR" === b.panel.mode && (d = " OR (" + b.panel.query + ")");
                    var f = [], h = a.facets.query.terms, i = [];
                    if (c.each(h, function (a) {
                        var c = b.panel.field + ':"' + a.term + '"' + d, g = e.findQuery(c);
                        g ? f.push(g.id) : f.push(e.set({alias: a.term, query: c})), i.push("NOT (" + c + ")")
                    }), b.panel.rest) {
                        var j = i.join(" AND "), k = e.findQuery(j);
                        k ? f.push(k.id) : f.push(e.set({alias: "other", query: j}))
                    }
                    c.each(c.difference(b.panel.ids, f), function (a) {
                        e.remove(a)
                    }), b.panel.ids = f, g.refresh()
                })
            }
        }, b.set_refresh = function (a) {
            b.refresh = a
        }, b.close_edit = function () {
            b.refresh && b.get_data(), b.refresh = !1
        }, b.populate_modal = function (c) {
            b.inspector = a.toJson(JSON.parse(c.toString()), !0)
        };
        var j = function (a) {
            if (a = c.isArray(a) ? a : [a], b.panel.remember > 0) {
                b.panel.history = c.union(a.reverse(), b.panel.history);
                var d = b.panel.history.length;
                d > b.panel.remember && (b.panel.history = b.panel.history.slice(0, b.panel.remember))
            }
        }
    }])
});
