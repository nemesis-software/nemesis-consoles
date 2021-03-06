/*! kibana - v3.0.0milestone4 - 2013-10-17
 * Copyright (c) 2013 Rashid Khan; Licensed Apache License */

!function (a, b) {
    function c(a) {
        var b = ob[a] = {};
        return $.each(a.split(bb), function (a, c) {
            b[c] = !0
        }), b
    }

    function d(a, c, d) {
        if (d === b && 1 === a.nodeType) {
            var e = "data-" + c.replace(qb, "-$1").toLowerCase();
            if (d = a.getAttribute(e), "string" == typeof d) {
                try {
                    d = "true" === d ? !0 : "false" === d ? !1 : "null" === d ? null : +d + "" === d ? +d : pb.test(d) ? $.parseJSON(d) : d
                } catch (f) {
                }
                $.data(a, c, d)
            } else d = b
        }
        return d
    }

    function e(a) {
        var b;
        for (b in a)if (("data" !== b || !$.isEmptyObject(a[b])) && "toJSON" !== b)return!1;
        return!0
    }

    function f() {
        return!1
    }

    function g() {
        return!0
    }

    function h(a) {
        return!a || !a.parentNode || 11 === a.parentNode.nodeType
    }

    function i(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    function j(a, b, c) {
        if (b = b || 0, $.isFunction(b))return $.grep(a, function (a, d) {
            var e = !!b.call(a, d, a);
            return e === c
        });
        if (b.nodeType)return $.grep(a, function (a) {
            return a === b === c
        });
        if ("string" == typeof b) {
            var d = $.grep(a, function (a) {
                return 1 === a.nodeType
            });
            if (Kb.test(b))return $.filter(b, d, !c);
            b = $.filter(b, d)
        }
        return $.grep(a, function (a) {
            return $.inArray(a, b) >= 0 === c
        })
    }

    function k(a) {
        var b = Nb.split("|"), c = a.createDocumentFragment();
        if (c.createElement)for (; b.length;)c.createElement(b.pop());
        return c
    }

    function l(a, b) {
        return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b))
    }

    function m(a, b) {
        if (1 === b.nodeType && $.hasData(a)) {
            var c, d, e, f = $._data(a), g = $._data(b, f), h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)for (d = 0, e = h[c].length; e > d; d++)$.event.add(b, c, h[c][d])
            }
            g.data && (g.data = $.extend({}, g.data))
        }
    }

    function n(a, b) {
        var c;
        1 === b.nodeType && (b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), $.support.html5Clone && a.innerHTML && !$.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Xb.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.selected = a.defaultSelected : "input" === c || "textarea" === c ? b.defaultValue = a.defaultValue : "script" === c && b.text !== a.text && (b.text = a.text), b.removeAttribute($.expando))
    }

    function o(a) {
        return"undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName("*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll("*") : []
    }

    function p(a) {
        Xb.test(a.type) && (a.defaultChecked = a.checked)
    }

    function q(a, b) {
        if (b in a)return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = qc.length; e--;)if (b = qc[e] + c, b in a)return b;
        return d
    }

    function r(a, b) {
        return a = b || a, "none" === $.css(a, "display") || !$.contains(a.ownerDocument, a)
    }

    function s(a, b) {
        for (var c, d, e = [], f = 0, g = a.length; g > f; f++)c = a[f], c.style && (e[f] = $._data(c, "olddisplay"), b ? (!e[f] && "none" === c.style.display && (c.style.display = ""), "" === c.style.display && r(c) && (e[f] = $._data(c, "olddisplay", w(c.nodeName)))) : (d = cc(c, "display"), !e[f] && "none" !== d && $._data(c, "olddisplay", d)));
        for (f = 0; g > f; f++)c = a[f], c.style && (b && "none" !== c.style.display && "" !== c.style.display || (c.style.display = b ? e[f] || "" : "none"));
        return a
    }

    function t(a, b, c) {
        var d = jc.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function u(a, b, c, d) {
        for (var e = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, f = 0; 4 > e; e += 2)"margin" === c && (f += $.css(a, c + pc[e], !0)), d ? ("content" === c && (f -= parseFloat(cc(a, "padding" + pc[e])) || 0), "margin" !== c && (f -= parseFloat(cc(a, "border" + pc[e] + "Width")) || 0)) : (f += parseFloat(cc(a, "padding" + pc[e])) || 0, "padding" !== c && (f += parseFloat(cc(a, "border" + pc[e] + "Width")) || 0));
        return f
    }

    function v(a, b, c) {
        var d = "width" === b ? a.offsetWidth : a.offsetHeight, e = !0, f = $.support.boxSizing && "border-box" === $.css(a, "boxSizing");
        if (0 >= d) {
            if (d = cc(a, b), (0 > d || null == d) && (d = a.style[b]), kc.test(d))return d;
            e = f && ($.support.boxSizingReliable || d === a.style[b]), d = parseFloat(d) || 0
        }
        return d + u(a, b, c || (f ? "border" : "content"), e) + "px"
    }

    function w(a) {
        if (mc[a])return mc[a];
        var b = $("<" + a + ">").appendTo(P.body), c = b.css("display");
        return b.remove(), ("none" === c || "" === c) && (dc = P.body.appendChild(dc || $.extend(P.createElement("iframe"), {frameBorder: 0, width: 0, height: 0})), ec && dc.createElement || (ec = (dc.contentWindow || dc.contentDocument).document, ec.write("<!doctype html><html><body>"), ec.close()), b = ec.body.appendChild(ec.createElement(a)), c = cc(b, "display"), P.body.removeChild(dc)), mc[a] = c, c
    }

    function x(a, b, c, d) {
        var e;
        if ($.isArray(b))$.each(b, function (b, e) {
            c || tc.test(a) ? d(a, e) : x(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        }); else if (c || "object" !== $.type(b))d(a, b); else for (e in b)x(a + "[" + e + "]", b[e], c, d)
    }

    function y(a) {
        return function (b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e, f, g = b.toLowerCase().split(bb), h = 0, i = g.length;
            if ($.isFunction(c))for (; i > h; h++)d = g[h], f = /^\+/.test(d), f && (d = d.substr(1) || "*"), e = a[d] = a[d] || [], e[f ? "unshift" : "push"](c)
        }
    }

    function z(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        for (var h, i = a[f], j = 0, k = i ? i.length : 0, l = a === Jc; k > j && (l || !h); j++)h = i[j](c, d, e), "string" == typeof h && (!l || g[h] ? h = b : (c.dataTypes.unshift(h), h = z(a, c, d, e, h, g)));
        return(l || !h) && !g["*"] && (h = z(a, c, d, e, "*", g)), h
    }

    function A(a, c) {
        var d, e, f = $.ajaxSettings.flatOptions || {};
        for (d in c)c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]);
        e && $.extend(!0, a, e)
    }

    function B(a, c, d) {
        var e, f, g, h, i = a.contents, j = a.dataTypes, k = a.responseFields;
        for (f in k)f in d && (c[k[f]] = d[f]);
        for (; "*" === j[0];)j.shift(), e === b && (e = a.mimeType || c.getResponseHeader("content-type"));
        if (e)for (f in i)if (i[f] && i[f].test(e)) {
            j.unshift(f);
            break
        }
        if (j[0]in d)g = j[0]; else {
            for (f in d) {
                if (!j[0] || a.converters[f + " " + j[0]]) {
                    g = f;
                    break
                }
                h || (h = f)
            }
            g = g || h
        }
        return g ? (g !== j[0] && j.unshift(g), d[g]) : void 0
    }

    function C(a, b) {
        var c, d, e, f, g = a.dataTypes.slice(), h = g[0], i = {}, j = 0;
        if (a.dataFilter && (b = a.dataFilter(b, a.dataType)), g[1])for (c in a.converters)i[c.toLowerCase()] = a.converters[c];
        for (; e = g[++j];)if ("*" !== e) {
            if ("*" !== h && h !== e) {
                if (c = i[h + " " + e] || i["* " + e], !c)for (d in i)if (f = d.split(" "), f[1] === e && (c = i[h + " " + f[0]] || i["* " + f[0]])) {
                    c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0], g.splice(j--, 0, e));
                    break
                }
                if (c !== !0)if (c && a["throws"])b = c(b); else try {
                    b = c(b)
                } catch (k) {
                    return{state: "parsererror", error: c ? k : "No conversion from " + h + " to " + e}
                }
            }
            h = e
        }
        return{state: "success", data: b}
    }

    function D() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {
        }
    }

    function E() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {
        }
    }

    function F() {
        return setTimeout(function () {
            Uc = b
        }, 0), Uc = $.now()
    }

    function G(a, b) {
        $.each(b, function (b, c) {
            for (var d = ($c[b] || []).concat($c["*"]), e = 0, f = d.length; f > e; e++)if (d[e].call(a, b, c))return
        })
    }

    function H(a, b, c) {
        var d, e = 0, f = Zc.length, g = $.Deferred().always(function () {
            delete h.elem
        }), h = function () {
            for (var b = Uc || F(), c = Math.max(0, i.startTime + i.duration - b), d = 1 - (c / i.duration || 0), e = 0, f = i.tweens.length; f > e; e++)i.tweens[e].run(d);
            return g.notifyWith(a, [i, d, c]), 1 > d && f ? c : (g.resolveWith(a, [i]), !1)
        }, i = g.promise({elem: a, props: $.extend({}, b), opts: $.extend(!0, {specialEasing: {}}, c), originalProperties: b, originalOptions: c, startTime: Uc || F(), duration: c.duration, tweens: [], createTween: function (b, c) {
            var d = $.Tween(a, i.opts, b, c, i.opts.specialEasing[b] || i.opts.easing);
            return i.tweens.push(d), d
        }, stop: function (b) {
            for (var c = 0, d = b ? i.tweens.length : 0; d > c; c++)i.tweens[c].run(1);
            return b ? g.resolveWith(a, [i, b]) : g.rejectWith(a, [i, b]), this
        }}), j = i.props;
        for (I(j, i.opts.specialEasing); f > e; e++)if (d = Zc[e].call(i, a, j, i.opts))return d;
        return G(i, j), $.isFunction(i.opts.start) && i.opts.start.call(a, i), $.fx.timer($.extend(h, {anim: i, queue: i.opts.queue, elem: a})), i.progress(i.opts.progress).done(i.opts.done, i.opts.complete).fail(i.opts.fail).always(i.opts.always)
    }

    function I(a, b) {
        var c, d, e, f, g;
        for (c in a)if (d = $.camelCase(c), e = b[d], f = a[c], $.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = $.cssHooks[d], g && "expand"in g) {
            f = g.expand(f), delete a[d];
            for (c in f)c in a || (a[c] = f[c], b[c] = e)
        } else b[d] = e
    }

    function J(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this, m = a.style, n = {}, o = [], p = a.nodeType && r(a);
        c.queue || (j = $._queueHooks(a, "fx"), null == j.unqueued && (j.unqueued = 0, k = j.empty.fire, j.empty.fire = function () {
            j.unqueued || k()
        }), j.unqueued++, l.always(function () {
            l.always(function () {
                j.unqueued--, $.queue(a, "fx").length || j.empty.fire()
            })
        })), 1 === a.nodeType && ("height"in b || "width"in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY], "inline" === $.css(a, "display") && "none" === $.css(a, "float") && ($.support.inlineBlockNeedsLayout && "inline" !== w(a.nodeName) ? m.zoom = 1 : m.display = "inline-block")), c.overflow && (m.overflow = "hidden", $.support.shrinkWrapBlocks || l.done(function () {
            m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2]
        }));
        for (d in b)if (f = b[d], Wc.exec(f)) {
            if (delete b[d], f === (p ? "hide" : "show"))continue;
            o.push(d)
        }
        if (g = o.length)for (h = $._data(a, "fxshow") || $._data(a, "fxshow", {}), p ? $(a).show() : l.done(function () {
            $(a).hide()
        }), l.done(function () {
            var b;
            $.removeData(a, "fxshow", !0);
            for (b in n)$.style(a, b, n[b])
        }), d = 0; g > d; d++)e = o[d], i = l.createTween(e, p ? h[e] : 0), n[e] = h[e] || $.style(a, e), e in h || (h[e] = i.start, p && (i.end = i.start, i.start = "width" === e || "height" === e ? 1 : 0))
    }

    function K(a, b, c, d, e) {
        return new K.prototype.init(a, b, c, d, e)
    }

    function L(a, b) {
        for (var c, d = {height: a}, e = 0; 4 > e; e += 2 - b)c = pc[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }

    function M(a) {
        return $.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }

    var N, O, P = a.document, Q = a.location, R = a.navigator, S = a.jQuery, T = a.$, U = Array.prototype.push, V = Array.prototype.slice, W = Array.prototype.indexOf, X = Object.prototype.toString, Y = Object.prototype.hasOwnProperty, Z = String.prototype.trim, $ = function (a, b) {
        return new $.fn.init(a, b, N)
    }, _ = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, ab = /\S/, bb = /\s+/, cb = ab.test(" ") ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g, db = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, eb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, fb = /^[\],:{}\s]*$/, gb = /(?:^|:|,)(?:\s*\[)+/g, hb = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, ib = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, jb = /^-ms-/, kb = /-([\da-z])/gi, lb = function (a, b) {
        return(b + "").toUpperCase()
    }, mb = function () {
        P.addEventListener ? (P.removeEventListener("DOMContentLoaded", mb, !1), $.ready()) : "complete" === P.readyState && (P.detachEvent("onreadystatechange", mb), $.ready())
    }, nb = {};
    $.fn = $.prototype = {constructor: $, init: function (a, c, d) {
        var e, f, g;
        if (!a)return this;
        if (a.nodeType)return this.context = this[0] = a, this.length = 1, this;
        if ("string" == typeof a) {
            if (e = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : db.exec(a), e && (e[1] || !c)) {
                if (e[1])return c = c instanceof $ ? c[0] : c, g = c && c.nodeType ? c.ownerDocument || c : P, a = $.parseHTML(e[1], g, !0), eb.test(e[1]) && $.isPlainObject(c) && this.attr.call(a, c, !0), $.merge(this, a);
                if (f = P.getElementById(e[2]), f && f.parentNode) {
                    if (f.id !== e[2])return d.find(a);
                    this.length = 1, this[0] = f
                }
                return this.context = P, this.selector = a, this
            }
            return!c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a)
        }
        return $.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), $.makeArray(a, this))
    }, selector: "", jquery: "1.8.0", length: 0, size: function () {
        return this.length
    }, toArray: function () {
        return V.call(this)
    }, get: function (a) {
        return null == a ? this.toArray() : 0 > a ? this[this.length + a] : this[a]
    }, pushStack: function (a, b, c) {
        var d = $.merge(this.constructor(), a);
        return d.prevObject = this, d.context = this.context, "find" === b ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d
    }, each: function (a, b) {
        return $.each(this, a, b)
    }, ready: function (a) {
        return $.ready.promise().done(a), this
    }, eq: function (a) {
        return a = +a, -1 === a ? this.slice(a) : this.slice(a, a + 1)
    }, first: function () {
        return this.eq(0)
    }, last: function () {
        return this.eq(-1)
    }, slice: function () {
        return this.pushStack(V.apply(this, arguments), "slice", V.call(arguments).join(","))
    }, map: function (a) {
        return this.pushStack($.map(this, function (b, c) {
            return a.call(b, c, b)
        }))
    }, end: function () {
        return this.prevObject || this.constructor(null)
    }, push: U, sort: [].sort, splice: [].splice}, $.fn.init.prototype = $.fn, $.extend = $.fn.extend = function () {
        var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k = !1;
        for ("boolean" == typeof h && (k = h, h = arguments[1] || {}, i = 2), "object" != typeof h && !$.isFunction(h) && (h = {}), j === i && (h = this, --i); j > i; i++)if (null != (a = arguments[i]))for (c in a)d = h[c], e = a[c], h !== e && (k && e && ($.isPlainObject(e) || (f = $.isArray(e))) ? (f ? (f = !1, g = d && $.isArray(d) ? d : []) : g = d && $.isPlainObject(d) ? d : {}, h[c] = $.extend(k, g, e)) : e !== b && (h[c] = e));
        return h
    }, $.extend({noConflict: function (b) {
        return a.$ === $ && (a.$ = T), b && a.jQuery === $ && (a.jQuery = S), $
    }, isReady: !1, readyWait: 1, holdReady: function (a) {
        a ? $.readyWait++ : $.ready(!0)
    }, ready: function (a) {
        if (a === !0 ? !--$.readyWait : !$.isReady) {
            if (!P.body)return setTimeout($.ready, 1);
            $.isReady = !0, a !== !0 && --$.readyWait > 0 || (O.resolveWith(P, [$]), $.fn.trigger && $(P).trigger("ready").off("ready"))
        }
    }, isFunction: function (a) {
        return"function" === $.type(a)
    }, isArray: Array.isArray || function (a) {
        return"array" === $.type(a)
    }, isWindow: function (a) {
        return null != a && a == a.window
    }, isNumeric: function (a) {
        return!isNaN(parseFloat(a)) && isFinite(a)
    }, type: function (a) {
        return null == a ? String(a) : nb[X.call(a)] || "object"
    }, isPlainObject: function (a) {
        if (!a || "object" !== $.type(a) || a.nodeType || $.isWindow(a))return!1;
        try {
            if (a.constructor && !Y.call(a, "constructor") && !Y.call(a.constructor.prototype, "isPrototypeOf"))return!1
        } catch (c) {
            return!1
        }
        var d;
        for (d in a);
        return d === b || Y.call(a, d)
    }, isEmptyObject: function (a) {
        var b;
        for (b in a)return!1;
        return!0
    }, error: function (a) {
        throw new Error(a)
    }, parseHTML: function (a, b, c) {
        var d;
        return a && "string" == typeof a ? ("boolean" == typeof b && (c = b, b = 0), b = b || P, (d = eb.exec(a)) ? [b.createElement(d[1])] : (d = $.buildFragment([a], b, c ? null : []), $.merge([], (d.cacheable ? $.clone(d.fragment) : d.fragment).childNodes))) : null
    }, parseJSON: function (b) {
        return b && "string" == typeof b ? (b = $.trim(b), a.JSON && a.JSON.parse ? a.JSON.parse(b) : fb.test(b.replace(hb, "@").replace(ib, "]").replace(gb, "")) ? new Function("return " + b)() : ($.error("Invalid JSON: " + b), void 0)) : null
    }, parseXML: function (c) {
        var d, e;
        if (!c || "string" != typeof c)return null;
        try {
            a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
        } catch (f) {
            d = b
        }
        return(!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && $.error("Invalid XML: " + c), d
    }, noop: function () {
    }, globalEval: function (b) {
        b && ab.test(b) && (a.execScript || function (b) {
            a.eval.call(a, b)
        })(b)
    }, camelCase: function (a) {
        return a.replace(jb, "ms-").replace(kb, lb)
    }, nodeName: function (a, b) {
        return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
    }, each: function (a, c, d) {
        var e, f = 0, g = a.length, h = g === b || $.isFunction(a);
        if (d)if (h) {
            for (e in a)if (c.apply(a[e], d) === !1)break
        } else for (; g > f && c.apply(a[f++], d) !== !1;); else if (h) {
            for (e in a)if (c.call(a[e], e, a[e]) === !1)break
        } else for (; g > f && c.call(a[f], f, a[f++]) !== !1;);
        return a
    }, trim: Z ? function (a) {
        return null == a ? "" : Z.call(a)
    } : function (a) {
        return null == a ? "" : a.toString().replace(cb, "")
    }, makeArray: function (a, b) {
        var c, d = b || [];
        return null != a && (c = $.type(a), null == a.length || "string" === c || "function" === c || "regexp" === c || $.isWindow(a) ? U.call(d, a) : $.merge(d, a)), d
    }, inArray: function (a, b, c) {
        var d;
        if (b) {
            if (W)return W.call(b, a, c);
            for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)if (c in b && b[c] === a)return c
        }
        return-1
    }, merge: function (a, c) {
        var d = c.length, e = a.length, f = 0;
        if ("number" == typeof d)for (; d > f; f++)a[e++] = c[f]; else for (; c[f] !== b;)a[e++] = c[f++];
        return a.length = e, a
    }, grep: function (a, b, c) {
        var d, e = [], f = 0, g = a.length;
        for (c = !!c; g > f; f++)d = !!b(a[f], f), c !== d && e.push(a[f]);
        return e
    }, map: function (a, c, d) {
        var e, f, g = [], h = 0, i = a.length, j = a instanceof $ || i !== b && "number" == typeof i && (i > 0 && a[0] && a[i - 1] || 0 === i || $.isArray(a));
        if (j)for (; i > h; h++)e = c(a[h], h, d), null != e && (g[g.length] = e); else for (f in a)e = c(a[f], f, d), null != e && (g[g.length] = e);
        return g.concat.apply([], g)
    }, guid: 1, proxy: function (a, c) {
        var d, e, f;
        return"string" == typeof c && (d = a[c], c = a, a = d), $.isFunction(a) ? (e = V.call(arguments, 2), f = function () {
            return a.apply(c, e.concat(V.call(arguments)))
        }, f.guid = a.guid = a.guid || f.guid || $.guid++, f) : b
    }, access: function (a, c, d, e, f, g, h) {
        var i, j = null == d, k = 0, l = a.length;
        if (d && "object" == typeof d) {
            for (k in d)$.access(a, c, k, d[k], 1, g, e);
            f = 1
        } else if (e !== b) {
            if (i = h === b && $.isFunction(e), j && (i ? (i = c, c = function (a, b, c) {
                return i.call($(a), c)
            }) : (c.call(a, e), c = null)), c)for (; l > k; k++)c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h);
            f = 1
        }
        return f ? a : j ? c.call(a) : l ? c(a[0], d) : g
    }, now: function () {
        return(new Date).getTime()
    }}), $.ready.promise = function (b) {
        if (!O)if (O = $.Deferred(), "complete" === P.readyState || "loading" !== P.readyState && P.addEventListener)setTimeout($.ready, 1); else if (P.addEventListener)P.addEventListener("DOMContentLoaded", mb, !1), a.addEventListener("load", $.ready, !1); else {
            P.attachEvent("onreadystatechange", mb), a.attachEvent("onload", $.ready);
            var c = !1;
            try {
                c = null == a.frameElement && P.documentElement
            } catch (d) {
            }
            c && c.doScroll && function e() {
                if (!$.isReady) {
                    try {
                        c.doScroll("left")
                    } catch (a) {
                        return setTimeout(e, 50)
                    }
                    $.ready()
                }
            }()
        }
        return O.promise(b)
    }, $.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) {
        nb["[object " + b + "]"] = b.toLowerCase()
    }), N = $(P);
    var ob = {};
    $.Callbacks = function (a) {
        a = "string" == typeof a ? ob[a] || c(a) : $.extend({}, a);
        var d, e, f, g, h, i, j = [], k = !a.once && [], l = function (b) {
            for (d = a.memory && b, e = !0, i = g || 0, g = 0, h = j.length, f = !0; j && h > i; i++)if (j[i].apply(b[0], b[1]) === !1 && a.stopOnFalse) {
                d = !1;
                break
            }
            f = !1, j && (k ? k.length && l(k.shift()) : d ? j = [] : m.disable())
        }, m = {add: function () {
            if (j) {
                var b = j.length;
                !function c(b) {
                    $.each(b, function (b, d) {
                        !$.isFunction(d) || a.unique && m.has(d) ? d && d.length && c(d) : j.push(d)
                    })
                }(arguments), f ? h = j.length : d && (g = b, l(d))
            }
            return this
        }, remove: function () {
            return j && $.each(arguments, function (a, b) {
                for (var c; (c = $.inArray(b, j, c)) > -1;)j.splice(c, 1), f && (h >= c && h--, i >= c && i--)
            }), this
        }, has: function (a) {
            return $.inArray(a, j) > -1
        }, empty: function () {
            return j = [], this
        }, disable: function () {
            return j = k = d = b, this
        }, disabled: function () {
            return!j
        }, lock: function () {
            return k = b, d || m.disable(), this
        }, locked: function () {
            return!k
        }, fireWith: function (a, b) {
            return b = b || [], b = [a, b.slice ? b.slice() : b], j && (!e || k) && (f ? k.push(b) : l(b)), this
        }, fire: function () {
            return m.fireWith(this, arguments), this
        }, fired: function () {
            return!!e
        }};
        return m
    }, $.extend({Deferred: function (a) {
        var b = [
            ["resolve", "done", $.Callbacks("once memory"), "resolved"],
            ["reject", "fail", $.Callbacks("once memory"), "rejected"],
            ["notify", "progress", $.Callbacks("memory")]
        ], c = "pending", d = {state: function () {
            return c
        }, always: function () {
            return e.done(arguments).fail(arguments), this
        }, then: function () {
            var a = arguments;
            return $.Deferred(function (c) {
                $.each(b, function (b, d) {
                    var f = d[0], g = a[b];
                    e[d[1]]($.isFunction(g) ? function () {
                        var a = g.apply(this, arguments);
                        a && $.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c : this, [a])
                    } : c[f])
                }), a = null
            }).promise()
        }, promise: function (a) {
            return"object" == typeof a ? $.extend(a, d) : d
        }}, e = {};
        return d.pipe = d.then, $.each(b, function (a, f) {
            var g = f[2], h = f[3];
            d[f[1]] = g.add, h && g.add(function () {
                c = h
            }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = g.fire, e[f[0] + "With"] = g.fireWith
        }), d.promise(e), a && a.call(e, e), e
    }, when: function (a) {
        var b, c, d, e = 0, f = V.call(arguments), g = f.length, h = 1 !== g || a && $.isFunction(a.promise) ? g : 0, i = 1 === h ? a : $.Deferred(), j = function (a, c, d) {
            return function (e) {
                c[a] = this, d[a] = arguments.length > 1 ? V.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
            }
        };
        if (g > 1)for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++)f[e] && $.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
        return h || i.resolveWith(d, f), i.promise()
    }}), $.support = function () {
        var b, c, d, e, f, g, h, i, j, k, l, m = P.createElement("div");
        if (m.setAttribute("className", "t"), m.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = m.getElementsByTagName("*"), d = m.getElementsByTagName("a")[0], d.style.cssText = "top:1px;float:left;opacity:.5", !c || !c.length || !d)return{};
        e = P.createElement("select"), f = e.appendChild(P.createElement("option")), g = m.getElementsByTagName("input")[0], b = {leadingWhitespace: 3 === m.firstChild.nodeType, tbody: !m.getElementsByTagName("tbody").length, htmlSerialize: !!m.getElementsByTagName("link").length, style: /top/.test(d.getAttribute("style")), hrefNormalized: "/a" === d.getAttribute("href"), opacity: /^0.5/.test(d.style.opacity), cssFloat: !!d.style.cssFloat, checkOn: "on" === g.value, optSelected: f.selected, getSetAttribute: "t" !== m.className, enctype: !!P.createElement("form").enctype, html5Clone: "<:nav></:nav>" !== P.createElement("nav").cloneNode(!0).outerHTML, boxModel: "CSS1Compat" === P.compatMode, submitBubbles: !0, changeBubbles: !0, focusinBubbles: !1, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, boxSizingReliable: !0, pixelPosition: !1}, g.checked = !0, b.noCloneChecked = g.cloneNode(!0).checked, e.disabled = !0, b.optDisabled = !f.disabled;
        try {
            delete m.test
        } catch (n) {
            b.deleteExpando = !1
        }
        if (!m.addEventListener && m.attachEvent && m.fireEvent && (m.attachEvent("onclick", l = function () {
            b.noCloneEvent = !1
        }), m.cloneNode(!0).fireEvent("onclick"), m.detachEvent("onclick", l)), g = P.createElement("input"), g.value = "t", g.setAttribute("type", "radio"), b.radioValue = "t" === g.value, g.setAttribute("checked", "checked"), g.setAttribute("name", "t"), m.appendChild(g), h = P.createDocumentFragment(), h.appendChild(m.lastChild), b.checkClone = h.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = g.checked, h.removeChild(g), h.appendChild(m), m.attachEvent)for (j in{submit: !0, change: !0, focusin: !0})i = "on" + j, k = i in m, k || (m.setAttribute(i, "return;"), k = "function" == typeof m[i]), b[j + "Bubbles"] = k;
        return $(function () {
            var c, d, e, f, g = "padding:0;margin:0;border:0;display:block;overflow:hidden;", h = P.getElementsByTagName("body")[0];
            h && (c = P.createElement("div"), c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", h.insertBefore(c, h.firstChild), d = P.createElement("div"), c.appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", e = d.getElementsByTagName("td"), e[0].style.cssText = "padding:0;margin:0;border:0;display:none", k = 0 === e[0].offsetHeight, e[0].style.display = "", e[1].style.display = "none", b.reliableHiddenOffsets = k && 0 === e[0].offsetHeight, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = 4 === d.offsetWidth, b.doesNotIncludeMarginInBodyOffset = 1 !== h.offsetTop, a.getComputedStyle && (b.pixelPosition = "1%" !== (a.getComputedStyle(d, null) || {}).top, b.boxSizingReliable = "4px" === (a.getComputedStyle(d, null) || {width: "4px"}).width, f = P.createElement("div"), f.style.cssText = d.style.cssText = g, f.style.marginRight = f.style.width = "0", d.style.width = "1px", d.appendChild(f), b.reliableMarginRight = !parseFloat((a.getComputedStyle(f, null) || {}).marginRight)), "undefined" != typeof d.style.zoom && (d.innerHTML = "", d.style.cssText = g + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = 3 === d.offsetWidth, d.style.display = "block", d.style.overflow = "visible", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", b.shrinkWrapBlocks = 3 !== d.offsetWidth, c.style.zoom = 1), h.removeChild(c), c = d = e = f = null)
        }), h.removeChild(m), c = d = e = f = g = h = m = null, b
    }();
    var pb = /^(?:\{.*\}|\[.*\])$/, qb = /([A-Z])/g;
    $.extend({cache: {}, deletedIds: [], uuid: 0, expando: "jQuery" + ($.fn.jquery + Math.random()).replace(/\D/g, ""), noData: {embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0}, hasData: function (a) {
        return a = a.nodeType ? $.cache[a[$.expando]] : a[$.expando], !!a && !e(a)
    }, data: function (a, c, d, e) {
        if ($.acceptData(a)) {
            var f, g, h = $.expando, i = "string" == typeof c, j = a.nodeType, k = j ? $.cache : a, l = j ? a[h] : a[h] && h;
            if (l && k[l] && (e || k[l].data) || !i || d !== b)return l || (j ? a[h] = l = $.deletedIds.pop() || ++$.uuid : l = h), k[l] || (k[l] = {}, j || (k[l].toJSON = $.noop)), ("object" == typeof c || "function" == typeof c) && (e ? k[l] = $.extend(k[l], c) : k[l].data = $.extend(k[l].data, c)), f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[$.camelCase(c)] = d), i ? (g = f[c], null == g && (g = f[$.camelCase(c)])) : g = f, g
        }
    }, removeData: function (a, b, c) {
        if ($.acceptData(a)) {
            var d, f, g, h = a.nodeType, i = h ? $.cache : a, j = h ? a[$.expando] : $.expando;
            if (i[j]) {
                if (b && (d = c ? i[j] : i[j].data)) {
                    $.isArray(b) || (b in d ? b = [b] : (b = $.camelCase(b), b = b in d ? [b] : b.split(" ")));
                    for (f = 0, g = b.length; g > f; f++)delete d[b[f]];
                    if (!(c ? e : $.isEmptyObject)(d))return
                }
                (c || (delete i[j].data, e(i[j]))) && (h ? $.cleanData([a], !0) : $.support.deleteExpando || i != i.window ? delete i[j] : i[j] = null)
            }
        }
    }, _data: function (a, b, c) {
        return $.data(a, b, c, !0)
    }, acceptData: function (a) {
        var b = a.nodeName && $.noData[a.nodeName.toLowerCase()];
        return!b || b !== !0 && a.getAttribute("classid") === b
    }}), $.fn.extend({data: function (a, c) {
        var e, f, g, h, i, j = this[0], k = 0, l = null;
        if (a === b) {
            if (this.length && (l = $.data(j), 1 === j.nodeType && !$._data(j, "parsedAttrs"))) {
                for (g = j.attributes, i = g.length; i > k; k++)h = g[k].name, 0 === h.indexOf("data-") && (h = $.camelCase(h.substring(5)), d(j, h, l[h]));
                $._data(j, "parsedAttrs", !0)
            }
            return l
        }
        return"object" == typeof a ? this.each(function () {
            $.data(this, a)
        }) : (e = a.split(".", 2), e[1] = e[1] ? "." + e[1] : "", f = e[1] + "!", $.access(this, function (c) {
            return c === b ? (l = this.triggerHandler("getData" + f, [e[0]]), l === b && j && (l = $.data(j, a), l = d(j, a, l)), l === b && e[1] ? this.data(e[0]) : l) : (e[1] = c, this.each(function () {
                var b = $(this);
                b.triggerHandler("setData" + f, e), $.data(this, a, c), b.triggerHandler("changeData" + f, e)
            }), void 0)
        }, null, c, arguments.length > 1, null, !1))
    }, removeData: function (a) {
        return this.each(function () {
            $.removeData(this, a)
        })
    }}), $.extend({queue: function (a, b, c) {
        var d;
        return a ? (b = (b || "fx") + "queue", d = $._data(a, b), c && (!d || $.isArray(c) ? d = $._data(a, b, $.makeArray(c)) : d.push(c)), d || []) : void 0
    }, dequeue: function (a, b) {
        b = b || "fx";
        var c = $.queue(a, b), d = c.shift(), e = $._queueHooks(a, b), f = function () {
            $.dequeue(a, b)
        };
        "inprogress" === d && (d = c.shift()), d && ("fx" === b && c.unshift("inprogress"), delete e.stop, d.call(a, f, e)), !c.length && e && e.empty.fire()
    }, _queueHooks: function (a, b) {
        var c = b + "queueHooks";
        return $._data(a, c) || $._data(a, c, {empty: $.Callbacks("once memory").add(function () {
            $.removeData(a, b + "queue", !0), $.removeData(a, c, !0)
        })})
    }}), $.fn.extend({queue: function (a, c) {
        var d = 2;
        return"string" != typeof a && (c = a, a = "fx", d--), arguments.length < d ? $.queue(this[0], a) : c === b ? this : this.each(function () {
            var b = $.queue(this, a, c);
            $._queueHooks(this, a), "fx" === a && "inprogress" !== b[0] && $.dequeue(this, a)
        })
    }, dequeue: function (a) {
        return this.each(function () {
            $.dequeue(this, a)
        })
    }, delay: function (a, b) {
        return a = $.fx ? $.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) {
            var d = setTimeout(b, a);
            c.stop = function () {
                clearTimeout(d)
            }
        })
    }, clearQueue: function (a) {
        return this.queue(a || "fx", [])
    }, promise: function (a, c) {
        var d, e = 1, f = $.Deferred(), g = this, h = this.length, i = function () {
            --e || f.resolveWith(g, [g])
        };
        for ("string" != typeof a && (c = a, a = b), a = a || "fx"; h--;)(d = $._data(g[h], a + "queueHooks")) && d.empty && (e++, d.empty.add(i));
        return i(), f.promise(c)
    }});
    var rb, sb, tb, ub = /[\t\r\n]/g, vb = /\r/g, wb = /^(?:button|input)$/i, xb = /^(?:button|input|object|select|textarea)$/i, yb = /^a(?:rea|)$/i, zb = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, Ab = $.support.getSetAttribute;
    $.fn.extend({attr: function (a, b) {
        return $.access(this, $.attr, a, b, arguments.length > 1)
    }, removeAttr: function (a) {
        return this.each(function () {
            $.removeAttr(this, a)
        })
    }, prop: function (a, b) {
        return $.access(this, $.prop, a, b, arguments.length > 1)
    }, removeProp: function (a) {
        return a = $.propFix[a] || a, this.each(function () {
            try {
                this[a] = b, delete this[a]
            } catch (c) {
            }
        })
    }, addClass: function (a) {
        var b, c, d, e, f, g, h;
        if ($.isFunction(a))return this.each(function (b) {
            $(this).addClass(a.call(this, b, this.className))
        });
        if (a && "string" == typeof a)for (b = a.split(bb), c = 0, d = this.length; d > c; c++)if (e = this[c], 1 === e.nodeType)if (e.className || 1 !== b.length) {
            for (f = " " + e.className + " ", g = 0, h = b.length; h > g; g++)~f.indexOf(" " + b[g] + " ") || (f += b[g] + " ");
            e.className = $.trim(f)
        } else e.className = a;
        return this
    }, removeClass: function (a) {
        var c, d, e, f, g, h, i;
        if ($.isFunction(a))return this.each(function (b) {
            $(this).removeClass(a.call(this, b, this.className))
        });
        if (a && "string" == typeof a || a === b)for (c = (a || "").split(bb), h = 0, i = this.length; i > h; h++)if (e = this[h], 1 === e.nodeType && e.className) {
            for (d = (" " + e.className + " ").replace(ub, " "), f = 0, g = c.length; g > f; f++)for (; d.indexOf(" " + c[f] + " ") > -1;)d = d.replace(" " + c[f] + " ", " ");
            e.className = a ? $.trim(d) : ""
        }
        return this
    }, toggleClass: function (a, b) {
        var c = typeof a, d = "boolean" == typeof b;
        return $.isFunction(a) ? this.each(function (c) {
            $(this).toggleClass(a.call(this, c, this.className, b), b)
        }) : this.each(function () {
            if ("string" === c)for (var e, f = 0, g = $(this), h = b, i = a.split(bb); e = i[f++];)h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e); else("undefined" === c || "boolean" === c) && (this.className && $._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : $._data(this, "__className__") || "")
        })
    }, hasClass: function (a) {
        for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ub, " ").indexOf(b) > -1)return!0;
        return!1
    }, val: function (a) {
        var c, d, e, f = this[0];
        {
            if (arguments.length)return e = $.isFunction(a), this.each(function (d) {
                var f, g = $(this);
                1 === this.nodeType && (f = e ? a.call(this, d, g.val()) : a, null == f ? f = "" : "number" == typeof f ? f += "" : $.isArray(f) && (f = $.map(f, function (a) {
                    return null == a ? "" : a + ""
                })), c = $.valHooks[this.type] || $.valHooks[this.nodeName.toLowerCase()], c && "set"in c && c.set(this, f, "value") !== b || (this.value = f))
            });
            if (f)return c = $.valHooks[f.type] || $.valHooks[f.nodeName.toLowerCase()], c && "get"in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, "string" == typeof d ? d.replace(vb, "") : null == d ? "" : d)
        }
    }}), $.extend({valHooks: {option: {get: function (a) {
        var b = a.attributes.value;
        return!b || b.specified ? a.value : a.text
    }}, select: {get: function (a) {
        var b, c, d, e, f = a.selectedIndex, g = [], h = a.options, i = "select-one" === a.type;
        if (0 > f)return null;
        for (c = i ? f : 0, d = i ? f + 1 : h.length; d > c; c++)if (e = h[c], !(!e.selected || ($.support.optDisabled ? e.disabled : null !== e.getAttribute("disabled")) || e.parentNode.disabled && $.nodeName(e.parentNode, "optgroup"))) {
            if (b = $(e).val(), i)return b;
            g.push(b)
        }
        return i && !g.length && h.length ? $(h[f]).val() : g
    }, set: function (a, b) {
        var c = $.makeArray(b);
        return $(a).find("option").each(function () {
            this.selected = $.inArray($(this).val(), c) >= 0
        }), c.length || (a.selectedIndex = -1), c
    }}}, attrFn: {}, attr: function (a, c, d, e) {
        var f, g, h, i = a.nodeType;
        if (a && 3 !== i && 8 !== i && 2 !== i)return e && $.isFunction($.fn[c]) ? $(a)[c](d) : "undefined" == typeof a.getAttribute ? $.prop(a, c, d) : (h = 1 !== i || !$.isXMLDoc(a), h && (c = c.toLowerCase(), g = $.attrHooks[c] || (zb.test(c) ? sb : rb)), d !== b ? null === d ? ($.removeAttr(a, c), void 0) : g && "set"in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, "" + d), d) : g && "get"in g && h && null !== (f = g.get(a, c)) ? f : (f = a.getAttribute(c), null === f ? b : f))
    }, removeAttr: function (a, b) {
        var c, d, e, f, g = 0;
        if (b && 1 === a.nodeType)for (d = b.split(bb); g < d.length; g++)e = d[g], e && (c = $.propFix[e] || e, f = zb.test(e), f || $.attr(a, e, ""), a.removeAttribute(Ab ? e : c), f && c in a && (a[c] = !1))
    }, attrHooks: {type: {set: function (a, b) {
        if (wb.test(a.nodeName) && a.parentNode)$.error("type property can't be changed"); else if (!$.support.radioValue && "radio" === b && $.nodeName(a, "input")) {
            var c = a.value;
            return a.setAttribute("type", b), c && (a.value = c), b
        }
    }}, value: {get: function (a, b) {
        return rb && $.nodeName(a, "button") ? rb.get(a, b) : b in a ? a.value : null
    }, set: function (a, b, c) {
        return rb && $.nodeName(a, "button") ? rb.set(a, b, c) : (a.value = b, void 0)
    }}}, propFix: {tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable"}, prop: function (a, c, d) {
        var e, f, g, h = a.nodeType;
        if (a && 3 !== h && 8 !== h && 2 !== h)return g = 1 !== h || !$.isXMLDoc(a), g && (c = $.propFix[c] || c, f = $.propHooks[c]), d !== b ? f && "set"in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get"in f && null !== (e = f.get(a, c)) ? e : a[c]
    }, propHooks: {tabIndex: {get: function (a) {
        var c = a.getAttributeNode("tabindex");
        return c && c.specified ? parseInt(c.value, 10) : xb.test(a.nodeName) || yb.test(a.nodeName) && a.href ? 0 : b
    }}}}), sb = {get: function (a, c) {
        var d, e = $.prop(a, c);
        return e === !0 || "boolean" != typeof e && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
    }, set: function (a, b, c) {
        var d;
        return b === !1 ? $.removeAttr(a, c) : (d = $.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
    }}, Ab || (tb = {name: !0, id: !0, coords: !0}, rb = $.valHooks.button = {get: function (a, c) {
        var d;
        return d = a.getAttributeNode(c), d && (tb[c] ? "" !== d.value : d.specified) ? d.value : b
    }, set: function (a, b, c) {
        var d = a.getAttributeNode(c);
        return d || (d = P.createAttribute(c), a.setAttributeNode(d)), d.value = b + ""
    }}, $.each(["width", "height"], function (a, b) {
        $.attrHooks[b] = $.extend($.attrHooks[b], {set: function (a, c) {
            return"" === c ? (a.setAttribute(b, "auto"), c) : void 0
        }})
    }), $.attrHooks.contenteditable = {get: rb.get, set: function (a, b, c) {
        "" === b && (b = "false"), rb.set(a, b, c)
    }}), $.support.hrefNormalized || $.each(["href", "src", "width", "height"], function (a, c) {
        $.attrHooks[c] = $.extend($.attrHooks[c], {get: function (a) {
            var d = a.getAttribute(c, 2);
            return null === d ? b : d
        }})
    }), $.support.style || ($.attrHooks.style = {get: function (a) {
        return a.style.cssText.toLowerCase() || b
    }, set: function (a, b) {
        return a.style.cssText = "" + b
    }}), $.support.optSelected || ($.propHooks.selected = $.extend($.propHooks.selected, {get: function (a) {
        var b = a.parentNode;
        return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
    }})), $.support.enctype || ($.propFix.enctype = "encoding"), $.support.checkOn || $.each(["radio", "checkbox"], function () {
        $.valHooks[this] = {get: function (a) {
            return null === a.getAttribute("value") ? "on" : a.value
        }}
    }), $.each(["radio", "checkbox"], function () {
        $.valHooks[this] = $.extend($.valHooks[this], {set: function (a, b) {
            return $.isArray(b) ? a.checked = $.inArray($(a).val(), b) >= 0 : void 0
        }})
    });
    var Bb = /^(?:textarea|input|select)$/i, Cb = /^([^\.]*|)(?:\.(.+)|)$/, Db = /(?:^|\s)hover(\.\S+|)\b/, Eb = /^key/, Fb = /^(?:mouse|contextmenu)|click/, Gb = /^(?:focusinfocus|focusoutblur)$/, Hb = function (a) {
        return $.event.special.hover ? a : a.replace(Db, "mouseenter$1 mouseleave$1")
    };
    $.event = {add: function (a, c, d, e, f) {
        var g, h, i, j, k, l, m, n, o, p, q;
        if (3 !== a.nodeType && 8 !== a.nodeType && c && d && (g = $._data(a))) {
            for (d.handler && (o = d, d = o.handler, f = o.selector), d.guid || (d.guid = $.guid++), i = g.events, i || (g.events = i = {}), h = g.handle, h || (g.handle = h = function (a) {
                return"undefined" == typeof $ || a && $.event.triggered === a.type ? b : $.event.dispatch.apply(h.elem, arguments)
            }, h.elem = a), c = $.trim(Hb(c)).split(" "), j = 0; j < c.length; j++)k = Cb.exec(c[j]) || [], l = k[1], m = (k[2] || "").split(".").sort(), q = $.event.special[l] || {}, l = (f ? q.delegateType : q.bindType) || l, q = $.event.special[l] || {}, n = $.extend({type: l, origType: k[1], data: e, handler: d, guid: d.guid, selector: f, namespace: m.join(".")}, o), p = i[l], p || (p = i[l] = [], p.delegateCount = 0, q.setup && q.setup.call(a, e, m, h) !== !1 || (a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h))), q.add && (q.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? p.splice(p.delegateCount++, 0, n) : p.push(n), $.event.global[l] = !0;
            a = null
        }
    }, global: {}, remove: function (a, b, c, d, e) {
        var f, g, h, i, j, k, l, m, n, o, p, q = $.hasData(a) && $._data(a);
        if (q && (m = q.events)) {
            for (b = $.trim(Hb(b || "")).split(" "), f = 0; f < b.length; f++)if (g = Cb.exec(b[f]) || [], h = i = g[1], j = g[2], h) {
                for (n = $.event.special[h] || {}, h = (d ? n.delegateType : n.bindType) || h, o = m[h] || [], k = o.length, j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null, l = 0; l < o.length; l++)p = o[l], !(!e && i !== p.origType || c && c.guid !== p.guid || j && !j.test(p.namespace) || d && d !== p.selector && ("**" !== d || !p.selector) || (o.splice(l--, 1), p.selector && o.delegateCount--, !n.remove || !n.remove.call(a, p)));
                0 === o.length && k !== o.length && ((!n.teardown || n.teardown.call(a, j, q.handle) === !1) && $.removeEvent(a, h, q.handle), delete m[h])
            } else for (h in m)$.event.remove(a, h + b[f], c, d, !0);
            $.isEmptyObject(m) && (delete q.handle, $.removeData(a, "events", !0))
        }
    }, customEvent: {getData: !0, setData: !0, changeData: !0}, trigger: function (c, d, e, f) {
        if (!e || 3 !== e.nodeType && 8 !== e.nodeType) {
            var g, h, i, j, k, l, m, n, o, p, q = c.type || c, r = [];
            if (Gb.test(q + $.event.triggered))return;
            if (q.indexOf("!") >= 0 && (q = q.slice(0, -1), h = !0), q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort()), (!e || $.event.customEvent[q]) && !$.event.global[q])return;
            if (c = "object" == typeof c ? c[$.expando] ? c : new $.Event(q, c) : new $.Event(q), c.type = q, c.isTrigger = !0, c.exclusive = h, c.namespace = r.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, l = q.indexOf(":") < 0 ? "on" + q : "", !e) {
                g = $.cache;
                for (i in g)g[i].events && g[i].events[q] && $.event.trigger(c, d, g[i].handle.elem, !0);
                return
            }
            if (c.result = b, c.target || (c.target = e), d = null != d ? $.makeArray(d) : [], d.unshift(c), m = $.event.special[q] || {}, m.trigger && m.trigger.apply(e, d) === !1)return;
            if (o = [
                [e, m.bindType || q]
            ], !f && !m.noBubble && !$.isWindow(e)) {
                for (p = m.delegateType || q, j = Gb.test(p + q) ? e : e.parentNode, k = e; j; j = j.parentNode)o.push([j, p]), k = j;
                k === (e.ownerDocument || P) && o.push([k.defaultView || k.parentWindow || a, p])
            }
            for (i = 0; i < o.length && !c.isPropagationStopped(); i++)j = o[i][0], c.type = o[i][1], n = ($._data(j, "events") || {})[c.type] && $._data(j, "handle"), n && n.apply(j, d), n = l && j[l], n && $.acceptData(j) && n.apply(j, d) === !1 && c.preventDefault();
            return c.type = q, !(f || c.isDefaultPrevented() || m._default && m._default.apply(e.ownerDocument, d) !== !1 || "click" === q && $.nodeName(e, "a") || !$.acceptData(e) || !l || !e[q] || ("focus" === q || "blur" === q) && 0 === c.target.offsetWidth || $.isWindow(e) || (k = e[l], k && (e[l] = null), $.event.triggered = q, e[q](), $.event.triggered = b, !k || !(e[l] = k))), c.result
        }
    }, dispatch: function (c) {
        c = $.event.fix(c || a.event);
        var d, e, f, g, h, i, j, k, l, m, n = ($._data(this, "events") || {})[c.type] || [], o = n.delegateCount, p = [].slice.call(arguments), q = !c.exclusive && !c.namespace, r = $.event.special[c.type] || {}, s = [];
        if (p[0] = c, c.delegateTarget = this, !r.preDispatch || r.preDispatch.call(this, c) !== !1) {
            if (o && (!c.button || "click" !== c.type))for (g = $(this), g.context = this, f = c.target; f != this; f = f.parentNode || this)if (f.disabled !== !0 || "click" !== c.type) {
                for (i = {}, k = [], g[0] = f, d = 0; o > d; d++)l = n[d], m = l.selector, i[m] === b && (i[m] = g.is(m)), i[m] && k.push(l);
                k.length && s.push({elem: f, matches: k})
            }
            for (n.length > o && s.push({elem: this, matches: n.slice(o)}), d = 0; d < s.length && !c.isPropagationStopped(); d++)for (j = s[d], c.currentTarget = j.elem, e = 0; e < j.matches.length && !c.isImmediatePropagationStopped(); e++)l = j.matches[e], (q || !c.namespace && !l.namespace || c.namespace_re && c.namespace_re.test(l.namespace)) && (c.data = l.data, c.handleObj = l, h = (($.event.special[l.origType] || {}).handle || l.handler).apply(j.elem, p), h !== b && (c.result = h, h === !1 && (c.preventDefault(), c.stopPropagation())));
            return r.postDispatch && r.postDispatch.call(this, c), c.result
        }
    }, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: {props: "char charCode key keyCode".split(" "), filter: function (a, b) {
        return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
    }}, mouseHooks: {props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (a, c) {
        var d, e, f, g = c.button, h = c.fromElement;
        return null == a.pageX && null != c.clientX && (d = a.target.ownerDocument || P, e = d.documentElement, f = d.body, a.pageX = c.clientX + (e && e.scrollLeft || f && f.scrollLeft || 0) - (e && e.clientLeft || f && f.clientLeft || 0), a.pageY = c.clientY + (e && e.scrollTop || f && f.scrollTop || 0) - (e && e.clientTop || f && f.clientTop || 0)), !a.relatedTarget && h && (a.relatedTarget = h === a.target ? c.toElement : h), !a.which && g !== b && (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0), a
    }}, fix: function (a) {
        if (a[$.expando])return a;
        var b, c, d = a, e = $.event.fixHooks[a.type] || {}, f = e.props ? this.props.concat(e.props) : this.props;
        for (a = $.Event(d), b = f.length; b;)c = f[--b], a[c] = d[c];
        return a.target || (a.target = d.srcElement || P), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, e.filter ? e.filter(a, d) : a
    }, special: {ready: {setup: $.bindReady}, load: {noBubble: !0}, focus: {delegateType: "focusin"}, blur: {delegateType: "focusout"}, beforeunload: {setup: function (a, b, c) {
        $.isWindow(this) && (this.onbeforeunload = c)
    }, teardown: function (a, b) {
        this.onbeforeunload === b && (this.onbeforeunload = null)
    }}}, simulate: function (a, b, c, d) {
        var e = $.extend(new $.Event, c, {type: a, isSimulated: !0, originalEvent: {}});
        d ? $.event.trigger(e, null, b) : $.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
    }}, $.event.handle = $.event.dispatch, $.removeEvent = P.removeEventListener ? function (a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        var d = "on" + b;
        a.detachEvent && ("undefined" == typeof a[d] && (a[d] = null), a.detachEvent(d, c))
    }, $.Event = function (a, b) {
        return this instanceof $.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? g : f) : this.type = a, b && $.extend(this, b), this.timeStamp = a && a.timeStamp || $.now(), this[$.expando] = !0, void 0) : new $.Event(a, b)
    }, $.Event.prototype = {preventDefault: function () {
        this.isDefaultPrevented = g;
        var a = this.originalEvent;
        a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
    }, stopPropagation: function () {
        this.isPropagationStopped = g;
        var a = this.originalEvent;
        a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
    }, stopImmediatePropagation: function () {
        this.isImmediatePropagationStopped = g, this.stopPropagation()
    }, isDefaultPrevented: f, isPropagationStopped: f, isImmediatePropagationStopped: f}, $.each({mouseenter: "mouseover", mouseleave: "mouseout"}, function (a, b) {
        $.event.special[a] = {delegateType: b, bindType: b, handle: function (a) {
            var c, d = this, e = a.relatedTarget, f = a.handleObj;
            return f.selector, (!e || e !== d && !$.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
        }}
    }), $.support.submitBubbles || ($.event.special.submit = {setup: function () {
        return $.nodeName(this, "form") ? !1 : ($.event.add(this, "click._submit keypress._submit", function (a) {
            var c = a.target, d = $.nodeName(c, "input") || $.nodeName(c, "button") ? c.form : b;
            d && !$._data(d, "_submit_attached") && ($.event.add(d, "submit._submit", function (a) {
                a._submit_bubble = !0
            }), $._data(d, "_submit_attached", !0))
        }), void 0)
    }, postDispatch: function (a) {
        a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && $.event.simulate("submit", this.parentNode, a, !0))
    }, teardown: function () {
        return $.nodeName(this, "form") ? !1 : ($.event.remove(this, "._submit"), void 0)
    }}), $.support.changeBubbles || ($.event.special.change = {setup: function () {
        return Bb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && ($.event.add(this, "propertychange._change", function (a) {
            "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
        }), $.event.add(this, "click._change", function (a) {
            this._just_changed && !a.isTrigger && (this._just_changed = !1), $.event.simulate("change", this, a, !0)
        })), !1) : ($.event.add(this, "beforeactivate._change", function (a) {
            var b = a.target;
            Bb.test(b.nodeName) && !$._data(b, "_change_attached") && ($.event.add(b, "change._change", function (a) {
                this.parentNode && !a.isSimulated && !a.isTrigger && $.event.simulate("change", this.parentNode, a, !0)
            }), $._data(b, "_change_attached", !0))
        }), void 0)
    }, handle: function (a) {
        var b = a.target;
        return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
    }, teardown: function () {
        return $.event.remove(this, "._change"), Bb.test(this.nodeName)
    }}), $.support.focusinBubbles || $.each({focus: "focusin", blur: "focusout"}, function (a, b) {
        var c = 0, d = function (a) {
            $.event.simulate(b, a.target, $.event.fix(a), !0)
        };
        $.event.special[b] = {setup: function () {
            0 === c++ && P.addEventListener(a, d, !0)
        }, teardown: function () {
            0 === --c && P.removeEventListener(a, d, !0)
        }}
    }), $.fn.extend({on: function (a, c, d, e, g) {
        var h, i;
        if ("object" == typeof a) {
            "string" != typeof c && (d = d || c, c = b);
            for (i in a)this.on(i, c, d, a[i], g);
            return this
        }
        if (null == d && null == e ? (e = c, d = c = b) : null == e && ("string" == typeof c ? (e = d, d = b) : (e = d, d = c, c = b)), e === !1)e = f; else if (!e)return this;
        return 1 === g && (h = e, e = function (a) {
            return $().off(a), h.apply(this, arguments)
        }, e.guid = h.guid || (h.guid = $.guid++)), this.each(function () {
            $.event.add(this, a, e, d, c)
        })
    }, one: function (a, b, c, d) {
        return this.on(a, b, c, d, 1)
    }, off: function (a, c, d) {
        var e, g;
        if (a && a.preventDefault && a.handleObj)return e = a.handleObj, $(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
        if ("object" == typeof a) {
            for (g in a)this.off(g, c, a[g]);
            return this
        }
        return(c === !1 || "function" == typeof c) && (d = c, c = b), d === !1 && (d = f), this.each(function () {
            $.event.remove(this, a, d, c)
        })
    }, bind: function (a, b, c) {
        return this.on(a, null, b, c)
    }, unbind: function (a, b) {
        return this.off(a, null, b)
    }, live: function (a, b, c) {
        return $(this.context).on(a, this.selector, b, c), this
    }, die: function (a, b) {
        return $(this.context).off(a, this.selector || "**", b), this
    }, delegate: function (a, b, c, d) {
        return this.on(b, a, c, d)
    }, undelegate: function (a, b, c) {
        return 1 == arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
    }, trigger: function (a, b) {
        return this.each(function () {
            $.event.trigger(a, b, this)
        })
    }, triggerHandler: function (a, b) {
        return this[0] ? $.event.trigger(a, b, this[0], !0) : void 0
    }, toggle: function (a) {
        var b = arguments, c = a.guid || $.guid++, d = 0, e = function (c) {
            var e = ($._data(this, "lastToggle" + a.guid) || 0) % d;
            return $._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
        };
        for (e.guid = c; d < b.length;)b[d++].guid = c;
        return this.click(e)
    }, hover: function (a, b) {
        return this.mouseenter(a).mouseleave(b || a)
    }}), $.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) {
        $.fn[b] = function (a, c) {
            return null == c && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, Eb.test(b) && ($.event.fixHooks[b] = $.event.keyHooks), Fb.test(b) && ($.event.fixHooks[b] = $.event.mouseHooks)
    }), function (a, b) {
        function c(a, b, c, d) {
            for (var e = 0, f = b.length; f > e; e++)fb(a, b[e], c, d)
        }

        function d(a, b, d, e, f, g) {
            var h, i = gb.setFilters[b.toLowerCase()];
            return i || fb.error(b), (a || !(h = f)) && c(a || "*", e, h = [], f), h.length > 0 ? i(h, d, g) : []
        }

        function e(a, e, f, g, h) {
            for (var i, j, k, l, m, n, o, p, q = 0, r = h.length, s = S.POS, t = new RegExp("^" + s.source + "(?!" + y + ")", "i"), u = function () {
                for (var a = 1, c = arguments.length - 2; c > a; a++)arguments[a] === b && (i[a] = b)
            }; r > q; q++) {
                for (s.exec(""), a = h[q], l = [], k = 0, m = g; i = s.exec(a);)p = s.lastIndex = i.index + i[0].length, p > k && (o = a.slice(k, i.index), k = p, n = [e], I.test(o) && (m && (n = m), m = g), (j = O.test(o)) && (o = o.slice(0, -5).replace(I, "$&*")), i.length > 1 && i[0].replace(t, u), m = d(o, i[1], i[2], n, m, j));
                m ? (l = l.concat(m), (o = a.slice(k)) && ")" !== o ? I.test(o) ? c(o, l, f, g) : fb(o, e, f, g ? g.concat(m) : m) : w.apply(f, l)) : fb(a, e, f, g)
            }
            return 1 === r ? f : fb.uniqueSort(f)
        }

        function f(a, b, c) {
            for (var d, e, f, g = [], h = 0, i = K.exec(a), j = !i.pop() && !i.pop(), k = j && a.match(J) || [""], l = gb.preFilter, m = gb.filter, n = !c && b !== p; null != (e = k[h]) && j; h++)for (g.push(d = []), n && (e = " " + e); e;) {
                j = !1, (i = I.exec(e)) && (e = e.slice(i[0].length), j = d.push({part: i.pop().replace(H, " "), captures: i}));
                for (f in m)(i = S[f].exec(e)) && (!l[f] || (i = l[f](i, b, c))) && (e = e.slice(i.shift().length), j = d.push({part: f, captures: i}));
                if (!j)break
            }
            return j || fb.error(a), g
        }

        function g(a, b, c) {
            var d = b.dir, e = u++;
            return a || (a = function (a) {
                return a === c
            }), b.first ? function (b, c) {
                for (; b = b[d];)if (1 === b.nodeType)return a(b, c) && b
            } : function (b, c) {
                for (var f, g = e + "." + l, h = g + "." + k; b = b[d];)if (1 === b.nodeType) {
                    if ((f = b[x]) === h)return b.sizset;
                    if ("string" == typeof f && 0 === f.indexOf(g)) {
                        if (b.sizset)return b
                    } else {
                        if (b[x] = h, a(b, c))return b.sizset = !0, b;
                        b.sizset = !1
                    }
                }
            }
        }

        function h(a, b) {
            return a ? function (c, d) {
                var e = b(c, d);
                return e && a(e === !0 ? c : e, d)
            } : b
        }

        function i(a, b, c) {
            for (var d, e, f = 0; d = a[f]; f++)gb.relative[d.part] ? e = g(e, gb.relative[d.part], b) : (d.captures.push(b, c), e = h(e, gb.filter[d.part].apply(null, d.captures)));
            return e
        }

        function j(a) {
            return function (b, c) {
                for (var d, e = 0; d = a[e]; e++)if (d(b, c))return!0;
                return!1
            }
        }

        var k, l, m, n, o, p = a.document, q = p.documentElement, r = "undefined", s = !1, t = !0, u = 0, v = [].slice, w = [].push, x = ("sizcache" + Math.random()).replace(".", ""), y = "[\\x20\\t\\r\\n\\f]", z = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", A = z.replace("w", "w#"), B = "([*^$|!~]?=)", C = "\\[" + y + "*(" + z + ")" + y + "*(?:" + B + y + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + A + ")|)|)" + y + "*\\]", D = ":(" + z + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)", E = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)", F = y + "*([\\x20\\t\\r\\n\\f>+~])" + y + "*", G = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + C + "|" + D.replace(2, 7) + "|[^\\\\(),])+", H = new RegExp("^" + y + "+|((?:^|[^\\\\])(?:\\\\.)*)" + y + "+$", "g"), I = new RegExp("^" + F), J = new RegExp(G + "?(?=" + y + "*,|$)", "g"), K = new RegExp("^(?:(?!,)(?:(?:^|,)" + y + "*" + G + ")*?|" + y + "*(.*?))(\\)|$)"), L = new RegExp(G.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|" + F, "g"), M = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, N = /[\x20\t\r\n\f]*[+~]/, O = /:not\($/, P = /h\d/i, Q = /input|select|textarea|button/i, R = /\\(?!\\)/g, S = {ID: new RegExp("^#(" + z + ")"), CLASS: new RegExp("^\\.(" + z + ")"), NAME: new RegExp("^\\[name=['\"]?(" + z + ")['\"]?\\]"), TAG: new RegExp("^(" + z.replace("[-", "[-\\*") + ")"), ATTR: new RegExp("^" + C), PSEUDO: new RegExp("^" + D), CHILD: new RegExp("^:(only|nth|last|first)-child(?:\\(" + y + "*(even|odd|(([+-]|)(\\d*)n|)" + y + "*(?:([+-]|)" + y + "*(\\d+)|))" + y + "*\\)|)", "i"), POS: new RegExp(E, "ig"), needsContext: new RegExp("^" + y + "*[>+~]|" + E, "i")}, T = {}, U = [], V = {}, W = [], X = function (a) {
            return a.sizzleFilter = !0, a
        }, Y = function (a) {
            return function (b) {
                return"input" === b.nodeName.toLowerCase() && b.type === a
            }
        }, Z = function (a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return("input" === c || "button" === c) && b.type === a
            }
        }, _ = function (a) {
            var b = !1, c = p.createElement("div");
            try {
                b = a(c)
            } catch (d) {
            }
            return c = null, b
        }, ab = _(function (a) {
            a.innerHTML = "<select></select>";
            var b = typeof a.lastChild.getAttribute("multiple");
            return"boolean" !== b && "string" !== b
        }), bb = _(function (a) {
            a.id = x + 0, a.innerHTML = "<a name='" + x + "'></a><div name='" + x + "'></div>", q.insertBefore(a, q.firstChild);
            var b = p.getElementsByName && p.getElementsByName(x).length === 2 + p.getElementsByName(x + 0).length;
            return o = !p.getElementById(x), q.removeChild(a), b
        }), cb = _(function (a) {
            return a.appendChild(p.createComment("")), 0 === a.getElementsByTagName("*").length
        }), db = _(function (a) {
            return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== r && "#" === a.firstChild.getAttribute("href")
        }), eb = _(function (a) {
            return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", a.getElementsByClassName && 0 !== a.getElementsByClassName("e").length ? (a.lastChild.className = "e", 1 !== a.getElementsByClassName("e").length) : !1
        }), fb = function (a, b, c, d) {
            c = c || [], b = b || p;
            var e, f, g, h, i = b.nodeType;
            if (1 !== i && 9 !== i)return[];
            if (!a || "string" != typeof a)return c;
            if (g = ib(b), !g && !d && (e = M.exec(a)))if (h = e[1]) {
                if (9 === i) {
                    if (f = b.getElementById(h), !f || !f.parentNode)return c;
                    if (f.id === h)return c.push(f), c
                } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(h)) && jb(b, f) && f.id === h)return c.push(f), c
            } else {
                if (e[2])return w.apply(c, v.call(b.getElementsByTagName(a), 0)), c;
                if ((h = e[3]) && eb && b.getElementsByClassName)return w.apply(c, v.call(b.getElementsByClassName(h), 0)), c
            }
            return mb(a, b, c, d, g)
        }, gb = fb.selectors = {cacheLength: 50, match: S, order: ["ID", "TAG"], attrHandle: {}, createPseudo: X, find: {ID: o ? function (a, b, c) {
            if (typeof b.getElementById !== r && !c) {
                var d = b.getElementById(a);
                return d && d.parentNode ? [d] : []
            }
        } : function (a, c, d) {
            if (typeof c.getElementById !== r && !d) {
                var e = c.getElementById(a);
                return e ? e.id === a || typeof e.getAttributeNode !== r && e.getAttributeNode("id").value === a ? [e] : b : []
            }
        }, TAG: cb ? function (a, b) {
            return typeof b.getElementsByTagName !== r ? b.getElementsByTagName(a) : void 0
        } : function (a, b) {
            var c = b.getElementsByTagName(a);
            if ("*" === a) {
                for (var d, e = [], f = 0; d = c[f]; f++)1 === d.nodeType && e.push(d);
                return e
            }
            return c
        }}, relative: {">": {dir: "parentNode", first: !0}, " ": {dir: "parentNode"}, "+": {dir: "previousSibling", first: !0}, "~": {dir: "previousSibling"}}, preFilter: {ATTR: function (a) {
            return a[1] = a[1].replace(R, ""), a[3] = (a[4] || a[5] || "").replace(R, ""), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
        }, CHILD: function (a) {
            return a[1] = a[1].toLowerCase(), "nth" === a[1] ? (a[2] || fb.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * ("even" === a[2] || "odd" === a[2])), a[4] = +(a[6] + a[7] || "odd" === a[2])) : a[2] && fb.error(a[0]), a
        }, PSEUDO: function (a) {
            var b, c = a[4];
            return S.CHILD.test(a[0]) ? null : (c && (b = K.exec(c)) && b.pop() && (a[0] = a[0].slice(0, b[0].length - c.length - 1), c = b[0].slice(0, -1)), a.splice(2, 3, c || a[3]), a)
        }}, filter: {ID: o ? function (a) {
            return a = a.replace(R, ""), function (b) {
                return b.getAttribute("id") === a
            }
        } : function (a) {
            return a = a.replace(R, ""), function (b) {
                var c = typeof b.getAttributeNode !== r && b.getAttributeNode("id");
                return c && c.value === a
            }
        }, TAG: function (a) {
            return"*" === a ? function () {
                return!0
            } : (a = a.replace(R, "").toLowerCase(), function (b) {
                return b.nodeName && b.nodeName.toLowerCase() === a
            })
        }, CLASS: function (a) {
            var b = T[a];
            return b || (b = T[a] = new RegExp("(^|" + y + ")" + a + "(" + y + "|$)"), U.push(a), U.length > gb.cacheLength && delete T[U.shift()]), function (a) {
                return b.test(a.className || typeof a.getAttribute !== r && a.getAttribute("class") || "")
            }
        }, ATTR: function (a, b, c) {
            return b ? function (d) {
                var e = fb.attr(d, a), f = e + "";
                if (null == e)return"!=" === b;
                switch (b) {
                    case"=":
                        return f === c;
                    case"!=":
                        return f !== c;
                    case"^=":
                        return c && 0 === f.indexOf(c);
                    case"*=":
                        return c && f.indexOf(c) > -1;
                    case"$=":
                        return c && f.substr(f.length - c.length) === c;
                    case"~=":
                        return(" " + f + " ").indexOf(c) > -1;
                    case"|=":
                        return f === c || f.substr(0, c.length + 1) === c + "-"
                }
            } : function (b) {
                return null != fb.attr(b, a)
            }
        }, CHILD: function (a, b, c, d) {
            if ("nth" === a) {
                var e = u++;
                return function (a) {
                    var b, f, g = 0, h = a;
                    if (1 === c && 0 === d)return!0;
                    if (b = a.parentNode, b && (b[x] !== e || !a.sizset)) {
                        for (h = b.firstChild; h && (1 !== h.nodeType || (h.sizset = ++g, h !== a)); h = h.nextSibling);
                        b[x] = e
                    }
                    return f = a.sizset - d, 0 === c ? 0 === f : 0 === f % c && f / c >= 0
                }
            }
            return function (b) {
                var c = b;
                switch (a) {
                    case"only":
                    case"first":
                        for (; c = c.previousSibling;)if (1 === c.nodeType)return!1;
                        if ("first" === a)return!0;
                        c = b;
                    case"last":
                        for (; c = c.nextSibling;)if (1 === c.nodeType)return!1;
                        return!0
                }
            }
        }, PSEUDO: function (a, b, c, d) {
            var e = gb.pseudos[a] || gb.pseudos[a.toLowerCase()];
            return e || fb.error("unsupported pseudo: " + a), e.sizzleFilter ? e(b, c, d) : e
        }}, pseudos: {not: X(function (a, b, c) {
            var d = lb(a.replace(H, "$1"), b, c);
            return function (a) {
                return!d(a)
            }
        }), enabled: function (a) {
            return a.disabled === !1
        }, disabled: function (a) {
            return a.disabled === !0
        }, checked: function (a) {
            var b = a.nodeName.toLowerCase();
            return"input" === b && !!a.checked || "option" === b && !!a.selected
        }, selected: function (a) {
            return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
        }, parent: function (a) {
            return!gb.pseudos.empty(a)
        }, empty: function (a) {
            var b;
            for (a = a.firstChild; a;) {
                if (a.nodeName > "@" || 3 === (b = a.nodeType) || 4 === b)return!1;
                a = a.nextSibling
            }
            return!0
        }, contains: X(function (a) {
            return function (b) {
                return(b.textContent || b.innerText || kb(b)).indexOf(a) > -1
            }
        }), has: X(function (a) {
            return function (b) {
                return fb(a, b).length > 0
            }
        }), header: function (a) {
            return P.test(a.nodeName)
        }, text: function (a) {
            var b, c;
            return"input" === a.nodeName.toLowerCase() && "text" === (b = a.type) && (null == (c = a.getAttribute("type")) || c.toLowerCase() === b)
        }, radio: Y("radio"), checkbox: Y("checkbox"), file: Y("file"), password: Y("password"), image: Y("image"), submit: Z("submit"), reset: Z("reset"), button: function (a) {
            var b = a.nodeName.toLowerCase();
            return"input" === b && "button" === a.type || "button" === b
        }, input: function (a) {
            return Q.test(a.nodeName)
        }, focus: function (a) {
            var b = a.ownerDocument;
            return!(a !== b.activeElement || b.hasFocus && !b.hasFocus() || !a.type && !a.href)
        }, active: function (a) {
            return a === a.ownerDocument.activeElement
        }}, setFilters: {first: function (a, b, c) {
            return c ? a.slice(1) : [a[0]]
        }, last: function (a, b, c) {
            var d = a.pop();
            return c ? a : [d]
        }, even: function (a, b, c) {
            for (var d = [], e = c ? 1 : 0, f = a.length; f > e; e += 2)d.push(a[e]);
            return d
        }, odd: function (a, b, c) {
            for (var d = [], e = c ? 0 : 1, f = a.length; f > e; e += 2)d.push(a[e]);
            return d
        }, lt: function (a, b, c) {
            return c ? a.slice(+b) : a.slice(0, +b)
        }, gt: function (a, b, c) {
            return c ? a.slice(0, +b + 1) : a.slice(+b + 1)
        }, eq: function (a, b, c) {
            var d = a.splice(+b, 1);
            return c ? a : d
        }}};
        gb.setFilters.nth = gb.setFilters.eq, gb.filters = gb.pseudos, db || (gb.attrHandle = {href: function (a) {
            return a.getAttribute("href", 2)
        }, type: function (a) {
            return a.getAttribute("type")
        }}), bb && (gb.order.push("NAME"), gb.find.NAME = function (a, b) {
            return typeof b.getElementsByName !== r ? b.getElementsByName(a) : void 0
        }), eb && (gb.order.splice(1, 0, "CLASS"), gb.find.CLASS = function (a, b, c) {
            return typeof b.getElementsByClassName === r || c ? void 0 : b.getElementsByClassName(a)
        });
        try {
            v.call(q.childNodes, 0)[0].nodeType
        } catch (hb) {
            v = function (a) {
                for (var b, c = []; b = this[a]; a++)c.push(b);
                return c
            }
        }
        var ib = fb.isXML = function (a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, jb = fb.contains = q.compareDocumentPosition ? function (a, b) {
            return!!(16 & a.compareDocumentPosition(b))
        } : q.contains ? function (a, b) {
            var c = 9 === a.nodeType ? a.documentElement : a, d = b.parentNode;
            return a === d || !!(d && 1 === d.nodeType && c.contains && c.contains(d))
        } : function (a, b) {
            for (; b = b.parentNode;)if (b === a)return!0;
            return!1
        }, kb = fb.getText = function (a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent)return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling)c += kb(a)
                } else if (3 === e || 4 === e)return a.nodeValue
            } else for (; b = a[d]; d++)c += kb(b);
            return c
        };
        fb.attr = function (a, b) {
            var c, d = ib(a);
            return d || (b = b.toLowerCase()), gb.attrHandle[b] ? gb.attrHandle[b](a) : ab || d ? a.getAttribute(b) : (c = a.getAttributeNode(b), c ? "boolean" == typeof a[b] ? a[b] ? b : null : c.specified ? c.value : null : null)
        }, fb.error = function (a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, [0, 0].sort(function () {
            return t = 0
        }), q.compareDocumentPosition ? m = function (a, b) {
            return a === b ? (s = !0, 0) : (a.compareDocumentPosition && b.compareDocumentPosition ? 4 & a.compareDocumentPosition(b) : a.compareDocumentPosition) ? -1 : 1
        } : (m = function (a, b) {
            if (a === b)return s = !0, 0;
            if (a.sourceIndex && b.sourceIndex)return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, h = b.parentNode, i = g;
            if (g === h)return n(a, b);
            if (!g)return-1;
            if (!h)return 1;
            for (; i;)e.unshift(i), i = i.parentNode;
            for (i = h; i;)f.unshift(i), i = i.parentNode;
            c = e.length, d = f.length;
            for (var j = 0; c > j && d > j; j++)if (e[j] !== f[j])return n(e[j], f[j]);
            return j === c ? n(a, f[j], -1) : n(e[j], b, 1)
        }, n = function (a, b, c) {
            if (a === b)return c;
            for (var d = a.nextSibling; d;) {
                if (d === b)return-1;
                d = d.nextSibling
            }
            return 1
        }), fb.uniqueSort = function (a) {
            var b, c = 1;
            if (m && (s = t, a.sort(m), s))for (; b = a[c]; c++)b === a[c - 1] && a.splice(c--, 1);
            return a
        };
        var lb = fb.compile = function (a, b, c) {
            var d, e, g, h = V[a];
            if (h && h.context === b)return h;
            for (e = f(a, b, c), g = 0; d = e[g]; g++)e[g] = i(d, b, c);
            return h = V[a] = j(e), h.context = b, h.runs = h.dirruns = 0, W.push(a), W.length > gb.cacheLength && delete V[W.shift()], h
        };
        fb.matches = function (a, b) {
            return fb(a, null, null, b)
        }, fb.matchesSelector = function (a, b) {
            return fb(b, null, null, [a]).length > 0
        };
        var mb = function (a, b, c, d, f) {
            a = a.replace(H, "$1");
            var g, h, i, j, m, n, o, p, q, r = a.match(J), s = a.match(L), t = b.nodeType;
            if (S.POS.test(a))return e(a, b, c, d, r);
            if (d)g = v.call(d, 0); else if (r && 1 === r.length) {
                if (s.length > 1 && 9 === t && !f && (r = S.ID.exec(s[0]))) {
                    if (b = gb.find.ID(r[1], b, f)[0], !b)return c;
                    a = a.slice(s.shift().length)
                }
                for (p = (r = N.exec(s[0])) && !r.index && b.parentNode || b, q = s.pop(), n = q.split(":not")[0], i = 0, j = gb.order.length; j > i; i++)if (o = gb.order[i], r = S[o].exec(n)) {
                    if (g = gb.find[o]((r[1] || "").replace(R, ""), p, f), null == g)continue;
                    n === q && (a = a.slice(0, a.length - q.length) + n.replace(S[o], ""), a || w.apply(c, v.call(g, 0)));
                    break
                }
            }
            if (a)for (h = lb(a, b, f), l = h.dirruns++, null == g && (g = gb.find.TAG("*", N.test(a) && b.parentNode || b)), i = 0; m = g[i]; i++)k = h.runs++, h(m, b) && c.push(m);
            return c
        };
        p.querySelectorAll && function () {
            var a, b = mb, c = /'|\\/g, d = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, e = [], f = [":active"], g = q.matchesSelector || q.mozMatchesSelector || q.webkitMatchesSelector || q.oMatchesSelector || q.msMatchesSelector;
            _(function (a) {
                a.innerHTML = "<select><option selected></option></select>", a.querySelectorAll("[selected]").length || e.push("\\[" + y + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), a.querySelectorAll(":checked").length || e.push(":checked")
            }), _(function (a) {
                a.innerHTML = "<p test=''></p>", a.querySelectorAll("[test^='']").length && e.push("[*^$]=" + y + "*(?:\"\"|'')"), a.innerHTML = "<input type='hidden'>", a.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled")
            }), e = e.length && new RegExp(e.join("|")), mb = function (a, d, f, g, h) {
                if (!(g || h || e && e.test(a)))if (9 === d.nodeType)try {
                    return w.apply(f, v.call(d.querySelectorAll(a), 0)), f
                } catch (i) {
                } else if (1 === d.nodeType && "object" !== d.nodeName.toLowerCase()) {
                    var j = d.getAttribute("id"), k = j || x, l = N.test(a) && d.parentNode || d;
                    j ? k = k.replace(c, "\\$&") : d.setAttribute("id", k);
                    try {
                        return w.apply(f, v.call(l.querySelectorAll(a.replace(J, "[id='" + k + "'] $&")), 0)), f
                    } catch (i) {
                    } finally {
                        j || d.removeAttribute("id")
                    }
                }
                return b(a, d, f, g, h)
            }, g && (_(function (b) {
                a = g.call(b, "div");
                try {
                    g.call(b, "[test!='']:sizzle"), f.push(gb.match.PSEUDO)
                } catch (c) {
                }
            }), f = new RegExp(f.join("|")), fb.matchesSelector = function (b, c) {
                if (c = c.replace(d, "='$1']"), !(ib(b) || f.test(c) || e && e.test(c)))try {
                    var h = g.call(b, c);
                    if (h || a || b.document && 11 !== b.document.nodeType)return h
                } catch (i) {
                }
                return fb(c, null, null, [b]).length > 0
            })
        }(), fb.attr = $.attr, $.find = fb, $.expr = fb.selectors, $.expr[":"] = $.expr.pseudos, $.unique = fb.uniqueSort, $.text = fb.getText, $.isXMLDoc = fb.isXML, $.contains = fb.contains
    }(a);
    var Ib = /Until$/, Jb = /^(?:parents|prev(?:Until|All))/, Kb = /^.[^:#\[\.,]*$/, Lb = $.expr.match.needsContext, Mb = {children: !0, contents: !0, next: !0, prev: !0};
    $.fn.extend({find: function (a) {
        var b, c, d, e, f, g, h = this;
        if ("string" != typeof a)return $(a).filter(function () {
            for (b = 0, c = h.length; c > b; b++)if ($.contains(h[b], this))return!0
        });
        for (g = this.pushStack("", "find", a), b = 0, c = this.length; c > b; b++)if (d = g.length, $.find(a, this[b], g), b > 0)for (e = d; e < g.length; e++)for (f = 0; d > f; f++)if (g[f] === g[e]) {
            g.splice(e--, 1);
            break
        }
        return g
    }, has: function (a) {
        var b, c = $(a, this), d = c.length;
        return this.filter(function () {
            for (b = 0; d > b; b++)if ($.contains(this, c[b]))return!0
        })
    }, not: function (a) {
        return this.pushStack(j(this, a, !1), "not", a)
    }, filter: function (a) {
        return this.pushStack(j(this, a, !0), "filter", a)
    }, is: function (a) {
        return!!a && ("string" == typeof a ? Lb.test(a) ? $(a, this.context).index(this[0]) >= 0 : $.filter(a, this).length > 0 : this.filter(a).length > 0)
    }, closest: function (a, b) {
        for (var c, d = 0, e = this.length, f = [], g = Lb.test(a) || "string" != typeof a ? $(a, b || this.context) : 0; e > d; d++)for (c = this[d]; c && c.ownerDocument && c !== b && 11 !== c.nodeType;) {
            if (g ? g.index(c) > -1 : $.find.matchesSelector(c, a)) {
                f.push(c);
                break
            }
            c = c.parentNode
        }
        return f = f.length > 1 ? $.unique(f) : f, this.pushStack(f, "closest", a)
    }, index: function (a) {
        return a ? "string" == typeof a ? $.inArray(this[0], $(a)) : $.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
    }, add: function (a, b) {
        var c = "string" == typeof a ? $(a, b) : $.makeArray(a && a.nodeType ? [a] : a), d = $.merge(this.get(), c);
        return this.pushStack(h(c[0]) || h(d[0]) ? d : $.unique(d))
    }, addBack: function (a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }}), $.fn.andSelf = $.fn.addBack, $.each({parent: function (a) {
        var b = a.parentNode;
        return b && 11 !== b.nodeType ? b : null
    }, parents: function (a) {
        return $.dir(a, "parentNode")
    }, parentsUntil: function (a, b, c) {
        return $.dir(a, "parentNode", c)
    }, next: function (a) {
        return i(a, "nextSibling")
    }, prev: function (a) {
        return i(a, "previousSibling")
    }, nextAll: function (a) {
        return $.dir(a, "nextSibling")
    }, prevAll: function (a) {
        return $.dir(a, "previousSibling")
    }, nextUntil: function (a, b, c) {
        return $.dir(a, "nextSibling", c)
    }, prevUntil: function (a, b, c) {
        return $.dir(a, "previousSibling", c)
    }, siblings: function (a) {
        return $.sibling((a.parentNode || {}).firstChild, a)
    }, children: function (a) {
        return $.sibling(a.firstChild)
    }, contents: function (a) {
        return $.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : $.merge([], a.childNodes)
    }}, function (a, b) {
        $.fn[a] = function (c, d) {
            var e = $.map(this, b, c);
            return Ib.test(a) || (d = c), d && "string" == typeof d && (e = $.filter(d, e)), e = this.length > 1 && !Mb[a] ? $.unique(e) : e, this.length > 1 && Jb.test(a) && (e = e.reverse()), this.pushStack(e, a, V.call(arguments).join(","))
        }
    }), $.extend({filter: function (a, b, c) {
        return c && (a = ":not(" + a + ")"), 1 === b.length ? $.find.matchesSelector(b[0], a) ? [b[0]] : [] : $.find.matches(a, b)
    }, dir: function (a, c, d) {
        for (var e = [], f = a[c]; f && 9 !== f.nodeType && (d === b || 1 !== f.nodeType || !$(f).is(d));)1 === f.nodeType && e.push(f), f = f[c];
        return e
    }, sibling: function (a, b) {
        for (var c = []; a; a = a.nextSibling)1 === a.nodeType && a !== b && c.push(a);
        return c
    }});
    var Nb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", Ob = / jQuery\d+="(?:null|\d+)"/g, Pb = /^\s+/, Qb = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, Rb = /<([\w:]+)/, Sb = /<tbody/i, Tb = /<|&#?\w+;/, Ub = /<(?:script|style|link)/i, Vb = /<(?:script|object|embed|option|style)/i, Wb = new RegExp("<(?:" + Nb + ")[\\s/>]", "i"), Xb = /^(?:checkbox|radio)$/, Yb = /checked\s*(?:[^=]|=\s*.checked.)/i, Zb = /\/(java|ecma)script/i, $b = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, _b = {option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""]}, ac = k(P), bc = ac.appendChild(P.createElement("div"));
    _b.optgroup = _b.option, _b.tbody = _b.tfoot = _b.colgroup = _b.caption = _b.thead, _b.th = _b.td, $.support.htmlSerialize || (_b._default = [1, "X<div>", "</div>"]), $.fn.extend({text: function (a) {
        return $.access(this, function (a) {
            return a === b ? $.text(this) : this.empty().append((this[0] && this[0].ownerDocument || P).createTextNode(a))
        }, null, a, arguments.length)
    }, wrapAll: function (a) {
        if ($.isFunction(a))return this.each(function (b) {
            $(this).wrapAll(a.call(this, b))
        });
        if (this[0]) {
            var b = $(a, this[0].ownerDocument).eq(0).clone(!0);
            this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
                for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;)a = a.firstChild;
                return a
            }).append(this)
        }
        return this
    }, wrapInner: function (a) {
        return $.isFunction(a) ? this.each(function (b) {
            $(this).wrapInner(a.call(this, b))
        }) : this.each(function () {
            var b = $(this), c = b.contents();
            c.length ? c.wrapAll(a) : b.append(a)
        })
    }, wrap: function (a) {
        var b = $.isFunction(a);
        return this.each(function (c) {
            $(this).wrapAll(b ? a.call(this, c) : a)
        })
    }, unwrap: function () {
        return this.parent().each(function () {
            $.nodeName(this, "body") || $(this).replaceWith(this.childNodes)
        }).end()
    }, append: function () {
        return this.domManip(arguments, !0, function (a) {
            (1 === this.nodeType || 11 === this.nodeType) && this.appendChild(a)
        })
    }, prepend: function () {
        return this.domManip(arguments, !0, function (a) {
            (1 === this.nodeType || 11 === this.nodeType) && this.insertBefore(a, this.firstChild)
        })
    }, before: function () {
        if (!h(this[0]))return this.domManip(arguments, !1, function (a) {
            this.parentNode.insertBefore(a, this)
        });
        if (arguments.length) {
            var a = $.clean(arguments);
            return this.pushStack($.merge(a, this), "before", this.selector)
        }
    }, after: function () {
        if (!h(this[0]))return this.domManip(arguments, !1, function (a) {
            this.parentNode.insertBefore(a, this.nextSibling)
        });
        if (arguments.length) {
            var a = $.clean(arguments);
            return this.pushStack($.merge(this, a), "after", this.selector)
        }
    }, remove: function (a, b) {
        for (var c, d = 0; null != (c = this[d]); d++)(!a || $.filter(a, [c]).length) && (!b && 1 === c.nodeType && ($.cleanData(c.getElementsByTagName("*")), $.cleanData([c])), c.parentNode && c.parentNode.removeChild(c));
        return this
    }, empty: function () {
        for (var a, b = 0; null != (a = this[b]); b++)for (1 === a.nodeType && $.cleanData(a.getElementsByTagName("*")); a.firstChild;)a.removeChild(a.firstChild);
        return this
    }, clone: function (a, b) {
        return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function () {
            return $.clone(this, a, b)
        })
    }, html: function (a) {
        return $.access(this, function (a) {
            var c = this[0] || {}, d = 0, e = this.length;
            if (a === b)return 1 === c.nodeType ? c.innerHTML.replace(Ob, "") : b;
            if (!("string" != typeof a || Ub.test(a) || !$.support.htmlSerialize && Wb.test(a) || !$.support.leadingWhitespace && Pb.test(a) || _b[(Rb.exec(a) || ["", ""])[1].toLowerCase()])) {
                a = a.replace(Qb, "<$1></$2>");
                try {
                    for (; e > d; d++)c = this[d] || {}, 1 === c.nodeType && ($.cleanData(c.getElementsByTagName("*")), c.innerHTML = a);
                    c = 0
                } catch (f) {
                }
            }
            c && this.empty().append(a)
        }, null, a, arguments.length)
    }, replaceWith: function (a) {
        return h(this[0]) ? this.length ? this.pushStack($($.isFunction(a) ? a() : a), "replaceWith", a) : this : $.isFunction(a) ? this.each(function (b) {
            var c = $(this), d = c.html();
            c.replaceWith(a.call(this, b, d))
        }) : ("string" != typeof a && (a = $(a).detach()), this.each(function () {
            var b = this.nextSibling, c = this.parentNode;
            $(this).remove(), b ? $(b).before(a) : $(c).append(a)
        }))
    }, detach: function (a) {
        return this.remove(a, !0)
    }, domManip: function (a, c, d) {
        a = [].concat.apply([], a);
        var e, f, g, h, i = 0, j = a[0], k = [], m = this.length;
        if (!$.support.checkClone && m > 1 && "string" == typeof j && Yb.test(j))return this.each(function () {
            $(this).domManip(a, c, d)
        });
        if ($.isFunction(j))return this.each(function (e) {
            var f = $(this);
            a[0] = j.call(this, e, c ? f.html() : b), f.domManip(a, c, d)
        });
        if (this[0]) {
            if (e = $.buildFragment(a, this, k), g = e.fragment, f = g.firstChild, 1 === g.childNodes.length && (g = f), f)for (c = c && $.nodeName(f, "tr"), h = e.cacheable || m - 1; m > i; i++)d.call(c && $.nodeName(this[i], "table") ? l(this[i], "tbody") : this[i], i === h ? g : $.clone(g, !0, !0));
            g = f = null, k.length && $.each(k, function (a, b) {
                b.src ? $.ajax ? $.ajax({url: b.src, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0}) : $.error("no ajax") : $.globalEval((b.text || b.textContent || b.innerHTML || "").replace($b, "")), b.parentNode && b.parentNode.removeChild(b)
            })
        }
        return this
    }}), $.buildFragment = function (a, c, d) {
        var e, f, g, h = a[0];
        return c = c || P, c = (c[0] || c).ownerDocument || c[0] || c, "undefined" == typeof c.createDocumentFragment && (c = P), 1 === a.length && "string" == typeof h && h.length < 512 && c === P && "<" === h.charAt(0) && !Vb.test(h) && ($.support.checkClone || !Yb.test(h)) && ($.support.html5Clone || !Wb.test(h)) && (f = !0, e = $.fragments[h], g = e !== b), e || (e = c.createDocumentFragment(), $.clean(a, c, e, d), f && ($.fragments[h] = g && e)), {fragment: e, cacheable: f}
    }, $.fragments = {}, $.each({appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith"}, function (a, b) {
        $.fn[a] = function (c) {
            var d, e = 0, f = [], g = $(c), h = g.length, i = 1 === this.length && this[0].parentNode;
            if ((null == i || i && 11 === i.nodeType && 1 === i.childNodes.length) && 1 === h)return g[b](this[0]), this;
            for (; h > e; e++)d = (e > 0 ? this.clone(!0) : this).get(), $(g[e])[b](d), f = f.concat(d);
            return this.pushStack(f, a, g.selector)
        }
    }), $.extend({clone: function (a, b, c) {
        var d, e, f, g;
        if ($.support.html5Clone || $.isXMLDoc(a) || !Wb.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (bc.innerHTML = a.outerHTML, bc.removeChild(g = bc.firstChild)), !($.support.noCloneEvent && $.support.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || $.isXMLDoc(a)))for (n(a, g), d = o(a), e = o(g), f = 0; d[f]; ++f)e[f] && n(d[f], e[f]);
        if (b && (m(a, g), c))for (d = o(a), e = o(g), f = 0; d[f]; ++f)m(d[f], e[f]);
        return d = e = null, g
    }, clean: function (a, b, c, d) {
        var e, f, g, h, i, j, l, m, n, o, q, r = 0, s = [];
        for (b && "undefined" != typeof b.createDocumentFragment || (b = P), f = b === P && ac; null != (g = a[r]); r++)if ("number" == typeof g && (g += ""), g) {
            if ("string" == typeof g)if (Tb.test(g)) {
                for (f = f || k(b), l = l || f.appendChild(b.createElement("div")), g = g.replace(Qb, "<$1></$2>"), h = (Rb.exec(g) || ["", ""])[1].toLowerCase(), i = _b[h] || _b._default, j = i[0], l.innerHTML = i[1] + g + i[2]; j--;)l = l.lastChild;
                if (!$.support.tbody)for (m = Sb.test(g), n = "table" !== h || m ? "<table>" !== i[1] || m ? [] : l.childNodes : l.firstChild && l.firstChild.childNodes, e = n.length - 1; e >= 0; --e)$.nodeName(n[e], "tbody") && !n[e].childNodes.length && n[e].parentNode.removeChild(n[e]);
                !$.support.leadingWhitespace && Pb.test(g) && l.insertBefore(b.createTextNode(Pb.exec(g)[0]), l.firstChild), g = l.childNodes, l = f.lastChild
            } else g = b.createTextNode(g);
            g.nodeType ? s.push(g) : s = $.merge(s, g)
        }
        if (l && (f.removeChild(l), g = l = f = null), !$.support.appendChecked)for (r = 0; null != (g = s[r]); r++)$.nodeName(g, "input") ? p(g) : "undefined" != typeof g.getElementsByTagName && $.grep(g.getElementsByTagName("input"), p);
        if (c)for (o = function (a) {
            return!a.type || Zb.test(a.type) ? d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a) : void 0
        }, r = 0; null != (g = s[r]); r++)$.nodeName(g, "script") && o(g) || (c.appendChild(g), "undefined" != typeof g.getElementsByTagName && (q = $.grep($.merge([], g.getElementsByTagName("script")), o), s.splice.apply(s, [r + 1, 0].concat(q)), r += q.length));
        return s
    }, cleanData: function (a, b) {
        for (var c, d, e, f, g = 0, h = $.expando, i = $.cache, j = $.support.deleteExpando, k = $.event.special; null != (e = a[g]); g++)if ((b || $.acceptData(e)) && (d = e[h], c = d && i[d])) {
            if (c.events)for (f in c.events)k[f] ? $.event.remove(e, f) : $.removeEvent(e, f, c.handle);
            i[d] && (delete i[d], j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null, $.deletedIds.push(d))
        }
    }}), function () {
        var a, b;
        $.uaMatch = function (a) {
            a = a.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return{browser: b[1] || "", version: b[2] || "0"}
        }, a = $.uaMatch(R.userAgent), b = {}, a.browser && (b[a.browser] = !0, b.version = a.version), b.webkit && (b.safari = !0), $.browser = b, $.sub = function () {
            function a(b, c) {
                return new a.fn.init(b, c)
            }

            $.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function c(c, d) {
                return d && d instanceof $ && !(d instanceof a) && (d = a(d)), $.fn.init.call(this, c, d, b)
            }, a.fn.init.prototype = a.fn;
            var b = a(P);
            return a
        }
    }();
    var cc, dc, ec, fc = /alpha\([^)]*\)/i, gc = /opacity=([^)]*)/, hc = /^(top|right|bottom|left)$/, ic = /^margin/, jc = new RegExp("^(" + _ + ")(.*)$", "i"), kc = new RegExp("^(" + _ + ")(?!px)[a-z%]+$", "i"), lc = new RegExp("^([-+])=(" + _ + ")", "i"), mc = {}, nc = {position: "absolute", visibility: "hidden", display: "block"}, oc = {letterSpacing: 0, fontWeight: 400, lineHeight: 1}, pc = ["Top", "Right", "Bottom", "Left"], qc = ["Webkit", "O", "Moz", "ms"], rc = $.fn.toggle;
    $.fn.extend({css: function (a, c) {
        return $.access(this, function (a, c, d) {
            return d !== b ? $.style(a, c, d) : $.css(a, c)
        }, a, c, arguments.length > 1)
    }, show: function () {
        return s(this, !0)
    }, hide: function () {
        return s(this)
    }, toggle: function (a, b) {
        var c = "boolean" == typeof a;
        return $.isFunction(a) && $.isFunction(b) ? rc.apply(this, arguments) : this.each(function () {
            (c ? a : r(this)) ? $(this).show() : $(this).hide()
        })
    }}), $.extend({cssHooks: {opacity: {get: function (a, b) {
        if (b) {
            var c = cc(a, "opacity");
            return"" === c ? "1" : c
        }
    }}}, cssNumber: {fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0}, cssProps: {"float": $.support.cssFloat ? "cssFloat" : "styleFloat"}, style: function (a, c, d, e) {
        if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
            var f, g, h, i = $.camelCase(c), j = a.style;
            if (c = $.cssProps[i] || ($.cssProps[i] = q(j, i)), h = $.cssHooks[c] || $.cssHooks[i], d === b)return h && "get"in h && (f = h.get(a, !1, e)) !== b ? f : j[c];
            if (g = typeof d, "string" === g && (f = lc.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat($.css(a, c)), g = "number"), !(null == d || "number" === g && isNaN(d) || ("number" === g && !$.cssNumber[i] && (d += "px"), h && "set"in h && (d = h.set(a, d, e)) === b)))try {
                j[c] = d
            } catch (k) {
            }
        }
    }, css: function (a, c, d, e) {
        var f, g, h, i = $.camelCase(c);
        return c = $.cssProps[i] || ($.cssProps[i] = q(a.style, i)), h = $.cssHooks[c] || $.cssHooks[i], h && "get"in h && (f = h.get(a, !0, e)), f === b && (f = cc(a, c)), "normal" === f && c in oc && (f = oc[c]), d || e !== b ? (g = parseFloat(f), d || $.isNumeric(g) ? g || 0 : f) : f
    }, swap: function (a, b, c) {
        var d, e, f = {};
        for (e in b)f[e] = a.style[e], a.style[e] = b[e];
        d = c.call(a);
        for (e in b)a.style[e] = f[e];
        return d
    }}), a.getComputedStyle ? cc = function (a, b) {
        var c, d, e, f, g = getComputedStyle(a, null), h = a.style;
        return g && (c = g[b], "" === c && !$.contains(a.ownerDocument.documentElement, a) && (c = $.style(a, b)), kc.test(c) && ic.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = c, c = g.width, h.width = d, h.minWidth = e, h.maxWidth = f)), c
    } : P.documentElement.currentStyle && (cc = function (a, b) {
        var c, d, e = a.currentStyle && a.currentStyle[b], f = a.style;
        return null == e && f && f[b] && (e = f[b]), kc.test(e) && !hc.test(b) && (c = f.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), f.left = "fontSize" === b ? "1em" : e, e = f.pixelLeft + "px", f.left = c, d && (a.runtimeStyle.left = d)), "" === e ? "auto" : e
    }), $.each(["height", "width"], function (a, b) {
        $.cssHooks[b] = {get: function (a, c, d) {
            return c ? 0 !== a.offsetWidth || "none" !== cc(a, "display") ? v(a, b, d) : $.swap(a, nc, function () {
                return v(a, b, d)
            }) : void 0
        }, set: function (a, c, d) {
            return t(a, c, d ? u(a, b, d, $.support.boxSizing && "border-box" === $.css(a, "boxSizing")) : 0)
        }}
    }), $.support.opacity || ($.cssHooks.opacity = {get: function (a, b) {
        return gc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
    }, set: function (a, b) {
        var c = a.style, d = a.currentStyle, e = $.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "", f = d && d.filter || c.filter || "";
        c.zoom = 1, b >= 1 && "" === $.trim(f.replace(fc, "")) && c.removeAttribute && (c.removeAttribute("filter"), d && !d.filter) || (c.filter = fc.test(f) ? f.replace(fc, e) : f + " " + e)
    }}), $(function () {
        $.support.reliableMarginRight || ($.cssHooks.marginRight = {get: function (a, b) {
            return $.swap(a, {display: "inline-block"}, function () {
                return b ? cc(a, "marginRight") : void 0
            })
        }}), !$.support.pixelPosition && $.fn.position && $.each(["top", "left"], function (a, b) {
            $.cssHooks[b] = {get: function (a, c) {
                if (c) {
                    var d = cc(a, b);
                    return kc.test(d) ? $(a).position()[b] + "px" : d
                }
            }}
        })
    }), $.expr && $.expr.filters && ($.expr.filters.hidden = function (a) {
        return 0 === a.offsetWidth && 0 === a.offsetHeight || !$.support.reliableHiddenOffsets && "none" === (a.style && a.style.display || cc(a, "display"))
    }, $.expr.filters.visible = function (a) {
        return!$.expr.filters.hidden(a)
    }), $.each({margin: "", padding: "", border: "Width"}, function (a, b) {
        $.cssHooks[a + b] = {expand: function (c) {
            var d, e = "string" == typeof c ? c.split(" ") : [c], f = {};
            for (d = 0; 4 > d; d++)f[a + pc[d] + b] = e[d] || e[d - 2] || e[0];
            return f
        }}, ic.test(a) || ($.cssHooks[a + b].set = t)
    });
    var sc = /%20/g, tc = /\[\]$/, uc = /\r?\n/g, vc = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, wc = /^(?:select|textarea)/i;
    $.fn.extend({serialize: function () {
        return $.param(this.serializeArray())
    }, serializeArray: function () {
        return this.map(function () {
            return this.elements ? $.makeArray(this.elements) : this
        }).filter(function () {
            return this.name && !this.disabled && (this.checked || wc.test(this.nodeName) || vc.test(this.type))
        }).map(function (a, b) {
            var c = $(this).val();
            return null == c ? null : $.isArray(c) ? $.map(c, function (a) {
                return{name: b.name, value: a.replace(uc, "\r\n")}
            }) : {name: b.name, value: c.replace(uc, "\r\n")}
        }).get()
    }}), $.param = function (a, c) {
        var d, e = [], f = function (a, b) {
            b = $.isFunction(b) ? b() : null == b ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        };
        if (c === b && (c = $.ajaxSettings && $.ajaxSettings.traditional), $.isArray(a) || a.jquery && !$.isPlainObject(a))$.each(a, function () {
            f(this.name, this.value)
        }); else for (d in a)x(d, a[d], c, f);
        return e.join("&").replace(sc, "+")
    };
    var xc, yc, zc = /#.*$/, Ac = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Bc = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, Cc = /^(?:GET|HEAD)$/, Dc = /^\/\//, Ec = /\?/, Fc = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, Gc = /([?&])_=[^&]*/, Hc = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, Ic = $.fn.load, Jc = {}, Kc = {}, Lc = ["*/"] + ["*"];
    try {
        xc = Q.href
    } catch (Mc) {
        xc = P.createElement("a"), xc.href = "", xc = xc.href
    }
    yc = Hc.exec(xc.toLowerCase()) || [], $.fn.load = function (a, c, d) {
        if ("string" != typeof a && Ic)return Ic.apply(this, arguments);
        if (!this.length)return this;
        var e, f, g, h = this, i = a.indexOf(" ");
        return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), $.isFunction(c) ? (d = c, c = b) : "object" == typeof c && (f = "POST"), $.ajax({url: a, type: f, dataType: "html", data: c, complete: function (a, b) {
            d && h.each(d, g || [a.responseText, b, a])
        }}).done(function (a) {
            g = arguments, h.html(e ? $("<div>").append(a.replace(Fc, "")).find(e) : a)
        }), this
    }, $.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) {
        $.fn[b] = function (a) {
            return this.on(b, a)
        }
    }), $.each(["get", "post"], function (a, c) {
        $[c] = function (a, d, e, f) {
            return $.isFunction(d) && (f = f || e, e = d, d = b), $.ajax({type: c, url: a, data: d, success: e, dataType: f})
        }
    }), $.extend({getScript: function (a, c) {
        return $.get(a, b, c, "script")
    }, getJSON: function (a, b, c) {
        return $.get(a, b, c, "json")
    }, ajaxSetup: function (a, b) {
        return b ? A(a, $.ajaxSettings) : (b = a, a = $.ajaxSettings), A(a, b), a
    }, ajaxSettings: {url: xc, isLocal: Bc.test(yc[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: !0, async: !0, accepts: {xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": Lc}, contents: {xml: /xml/, html: /html/, json: /json/}, responseFields: {xml: "responseXML", text: "responseText"}, converters: {"* text": a.String, "text html": !0, "text json": $.parseJSON, "text xml": $.parseXML}, flatOptions: {context: !0, url: !0}}, ajaxPrefilter: y(Jc), ajaxTransport: y(Kc), ajax: function (a, c) {
        function d(a, c, d, g) {
            var j, l, s, t, v, x = c;
            2 !== u && (u = 2, i && clearTimeout(i), h = b, f = g || "", w.readyState = a > 0 ? 4 : 0, d && (t = B(m, w, d)), a >= 200 && 300 > a || 304 === a ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && ($.lastModified[e] = v), v = w.getResponseHeader("Etag"), v && ($.etag[e] = v)), 304 === a ? (x = "notmodified", j = !0) : (j = C(m, t), x = j.state, l = j.data, s = j.error, j = !s)) : (s = x, (!x || a) && (x = "error", 0 > a && (a = 0))), w.status = a, w.statusText = "" + (c || x), j ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = b, k && o.trigger("ajax" + (j ? "Success" : "Error"), [w, m, j ? l : s]), q.fireWith(n, [w, x]), k && (o.trigger("ajaxComplete", [w, m]), --$.active || $.event.trigger("ajaxStop")))
        }

        "object" == typeof a && (c = a, a = b), c = c || {};
        var e, f, g, h, i, j, k, l, m = $.ajaxSetup({}, c), n = m.context || m, o = n !== m && (n.nodeType || n instanceof $) ? $(n) : $.event, p = $.Deferred(), q = $.Callbacks("once memory"), r = m.statusCode || {}, s = {}, t = {}, u = 0, v = "canceled", w = {readyState: 0, setRequestHeader: function (a, b) {
            if (!u) {
                var c = a.toLowerCase();
                a = t[c] = t[c] || a, s[a] = b
            }
            return this
        }, getAllResponseHeaders: function () {
            return 2 === u ? f : null
        }, getResponseHeader: function (a) {
            var c;
            if (2 === u) {
                if (!g)for (g = {}; c = Ac.exec(f);)g[c[1].toLowerCase()] = c[2];
                c = g[a.toLowerCase()]
            }
            return c === b ? null : c
        }, overrideMimeType: function (a) {
            return u || (m.mimeType = a), this
        }, abort: function (a) {
            return a = a || v, h && h.abort(a), d(0, a), this
        }};
        if (p.promise(w), w.success = w.done, w.error = w.fail, w.complete = q.add, w.statusCode = function (a) {
            if (a) {
                var b;
                if (2 > u)for (b in a)r[b] = [r[b], a[b]]; else b = a[w.status], w.always(b)
            }
            return this
        }, m.url = ((a || m.url) + "").replace(zc, "").replace(Dc, yc[1] + "//"), m.dataTypes = $.trim(m.dataType || "*").toLowerCase().split(bb), null == m.crossDomain && (j = Hc.exec(m.url.toLowerCase()), m.crossDomain = !(!j || j[1] == yc[1] && j[2] == yc[2] && (j[3] || ("http:" === j[1] ? 80 : 443)) == (yc[3] || ("http:" === yc[1] ? 80 : 443)))), m.data && m.processData && "string" != typeof m.data && (m.data = $.param(m.data, m.traditional)), z(Jc, m, c, w), 2 === u)return w;
        if (k = m.global, m.type = m.type.toUpperCase(), m.hasContent = !Cc.test(m.type), k && 0 === $.active++ && $.event.trigger("ajaxStart"), !m.hasContent && (m.data && (m.url += (Ec.test(m.url) ? "&" : "?") + m.data, delete m.data), e = m.url, m.cache === !1)) {
            var x = $.now(), y = m.url.replace(Gc, "$1_=" + x);
            m.url = y + (y === m.url ? (Ec.test(m.url) ? "&" : "?") + "_=" + x : "")
        }
        (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), m.ifModified && (e = e || m.url, $.lastModified[e] && w.setRequestHeader("If-Modified-Since", $.lastModified[e]), $.etag[e] && w.setRequestHeader("If-None-Match", $.etag[e])), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + Lc + "; q=0.01" : "") : m.accepts["*"]);
        for (l in m.headers)w.setRequestHeader(l, m.headers[l]);
        if (!m.beforeSend || m.beforeSend.call(n, w, m) !== !1 && 2 !== u) {
            v = "abort";
            for (l in{success: 1, error: 1, complete: 1})w[l](m[l]);
            if (h = z(Kc, m, c, w)) {
                w.readyState = 1, k && o.trigger("ajaxSend", [w, m]), m.async && m.timeout > 0 && (i = setTimeout(function () {
                    w.abort("timeout")
                }, m.timeout));
                try {
                    u = 1, h.send(s, d)
                } catch (A) {
                    if (!(2 > u))throw A;
                    d(-1, A)
                }
            } else d(-1, "No Transport");
            return w
        }
        return w.abort()
    }, active: 0, lastModified: {}, etag: {}});
    var Nc = [], Oc = /\?/, Pc = /(=)\?(?=&|$)|\?\?/, Qc = $.now();
    $.ajaxSetup({jsonp: "callback", jsonpCallback: function () {
        var a = Nc.pop() || $.expando + "_" + Qc++;
        return this[a] = !0, a
    }}), $.ajaxPrefilter("json jsonp", function (c, d, e) {
        var f, g, h, i = c.data, j = c.url, k = c.jsonp !== !1, l = k && Pc.test(j), m = k && !l && "string" == typeof i && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && Pc.test(i);
        return"jsonp" === c.dataTypes[0] || l || m ? (f = c.jsonpCallback = $.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, g = a[f], l ? c.url = j.replace(Pc, "$1" + f) : m ? c.data = i.replace(Pc, "$1" + f) : k && (c.url += (Oc.test(j) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function () {
            return h || $.error(f + " was not called"), h[0]
        }, c.dataTypes[0] = "json", a[f] = function () {
            h = arguments
        }, e.always(function () {
            a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, Nc.push(f)), h && $.isFunction(g) && g(h[0]), h = g = b
        }), "script") : void 0
    }), $.ajaxSetup({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"}, contents: {script: /javascript|ecmascript/}, converters: {"text script": function (a) {
        return $.globalEval(a), a
    }}}), $.ajaxPrefilter("script", function (a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), $.ajaxTransport("script", function (a) {
        if (a.crossDomain) {
            var c, d = P.head || P.getElementsByTagName("head")[0] || P.documentElement;
            return{send: function (e, f) {
                c = P.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function (a, e) {
                    (e || !c.readyState || /loaded|complete/.test(c.readyState)) && (c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || f(200, "success"))
                }, d.insertBefore(c, d.firstChild)
            }, abort: function () {
                c && c.onload(0, 1)
            }}
        }
    });
    var Rc, Sc = a.ActiveXObject ? function () {
        for (var a in Rc)Rc[a](0, 1)
    } : !1, Tc = 0;
    $.ajaxSettings.xhr = a.ActiveXObject ? function () {
        return!this.isLocal && D() || E()
    } : D, function (a) {
        $.extend($.support, {ajax: !!a, cors: !!a && "withCredentials"in a})
    }($.ajaxSettings.xhr()), $.support.ajax && $.ajaxTransport(function (c) {
        if (!c.crossDomain || $.support.cors) {
            var d;
            return{send: function (e, f) {
                var g, h, i = c.xhr();
                if (c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async), c.xhrFields)for (h in c.xhrFields)i[h] = c.xhrFields[h];
                c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                try {
                    for (h in e)i.setRequestHeader(h, e[h])
                } catch (j) {
                }
                i.send(c.hasContent && c.data || null), d = function (a, e) {
                    var h, j, k, l, m;
                    try {
                        if (d && (e || 4 === i.readyState))if (d = b, g && (i.onreadystatechange = $.noop, Sc && delete Rc[g]), e)4 !== i.readyState && i.abort(); else {
                            h = i.status, k = i.getAllResponseHeaders(), l = {}, m = i.responseXML, m && m.documentElement && (l.xml = m);
                            try {
                                l.text = i.responseText
                            } catch (a) {
                            }
                            try {
                                j = i.statusText
                            } catch (n) {
                                j = ""
                            }
                            h || !c.isLocal || c.crossDomain ? 1223 === h && (h = 204) : h = l.text ? 200 : 404
                        }
                    } catch (o) {
                        e || f(-1, o)
                    }
                    l && f(h, j, l, k)
                }, c.async ? 4 === i.readyState ? setTimeout(d, 0) : (g = ++Tc, Sc && (Rc || (Rc = {}, $(a).unload(Sc)), Rc[g] = d), i.onreadystatechange = d) : d()
            }, abort: function () {
                d && d(0, 1)
            }}
        }
    });
    var Uc, Vc, Wc = /^(?:toggle|show|hide)$/, Xc = new RegExp("^(?:([-+])=|)(" + _ + ")([a-z%]*)$", "i"), Yc = /queueHooks$/, Zc = [J], $c = {"*": [function (a, b) {
        var c, d, e, f = this.createTween(a, b), g = Xc.exec(b), h = f.cur(), i = +h || 0, j = 1;
        if (g) {
            if (c = +g[2], d = g[3] || ($.cssNumber[a] ? "" : "px"), "px" !== d && i) {
                i = $.css(f.elem, a, !0) || c || 1;
                do e = j = j || ".5", i /= j, $.style(f.elem, a, i + d), j = f.cur() / h; while (1 !== j && j !== e)
            }
            f.unit = d, f.start = i, f.end = g[1] ? i + (g[1] + 1) * c : c
        }
        return f
    }]};
    $.Animation = $.extend(H, {tweener: function (a, b) {
        $.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
        for (var c, d = 0, e = a.length; e > d; d++)c = a[d], $c[c] = $c[c] || [], $c[c].unshift(b)
    }, prefilter: function (a, b) {
        b ? Zc.unshift(a) : Zc.push(a)
    }}), $.Tween = K, K.prototype = {constructor: K, init: function (a, b, c, d, e, f) {
        this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || ($.cssNumber[c] ? "" : "px")
    }, cur: function () {
        var a = K.propHooks[this.prop];
        return a && a.get ? a.get(this) : K.propHooks._default.get(this)
    }, run: function (a) {
        var b, c = K.propHooks[this.prop];
        return this.pos = b = $.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration), this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : K.propHooks._default.set(this), this
    }}, K.prototype.init.prototype = K.prototype, K.propHooks = {_default: {get: function (a) {
        var b;
        return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = $.css(a.elem, a.prop, !1, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
    }, set: function (a) {
        $.fx.step[a.prop] ? $.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[$.cssProps[a.prop]] || $.cssHooks[a.prop]) ? $.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
    }}}, K.propHooks.scrollTop = K.propHooks.scrollLeft = {set: function (a) {
        a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
    }}, $.each(["toggle", "show", "hide"], function (a, b) {
        var c = $.fn[b];
        $.fn[b] = function (d, e, f) {
            return null == d || "boolean" == typeof d || !a && $.isFunction(d) && $.isFunction(e) ? c.apply(this, arguments) : this.animate(L(b, !0), d, e, f)
        }
    }), $.fn.extend({fadeTo: function (a, b, c, d) {
        return this.filter(r).css("opacity", 0).show().end().animate({opacity: b}, a, c, d)
    }, animate: function (a, b, c, d) {
        var e = $.isEmptyObject(a), f = $.speed(b, c, d), g = function () {
            var b = H(this, $.extend({}, a), f);
            e && b.stop(!0)
        };
        return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
    }, stop: function (a, c, d) {
        var e = function (a) {
            var b = a.stop;
            delete a.stop, b(d)
        };
        return"string" != typeof a && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function () {
            var b = !0, c = null != a && a + "queueHooks", f = $.timers, g = $._data(this);
            if (c)g[c] && g[c].stop && e(g[c]); else for (c in g)g[c] && g[c].stop && Yc.test(c) && e(g[c]);
            for (c = f.length; c--;)f[c].elem === this && (null == a || f[c].queue === a) && (f[c].anim.stop(d), b = !1, f.splice(c, 1));
            (b || !d) && $.dequeue(this, a)
        })
    }}), $.each({slideDown: L("show"), slideUp: L("hide"), slideToggle: L("toggle"), fadeIn: {opacity: "show"}, fadeOut: {opacity: "hide"}, fadeToggle: {opacity: "toggle"}}, function (a, b) {
        $.fn[a] = function (a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), $.speed = function (a, b, c) {
        var d = a && "object" == typeof a ? $.extend({}, a) : {complete: c || !c && b || $.isFunction(a) && a, duration: a, easing: c && b || b && !$.isFunction(b) && b};
        return d.duration = $.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in $.fx.speeds ? $.fx.speeds[d.duration] : $.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function () {
            $.isFunction(d.old) && d.old.call(this), d.queue && $.dequeue(this, d.queue)
        }, d
    }, $.easing = {linear: function (a) {
        return a
    }, swing: function (a) {
        return.5 - Math.cos(a * Math.PI) / 2
    }}, $.timers = [], $.fx = K.prototype.init, $.fx.tick = function () {
        for (var a, b = $.timers, c = 0; c < b.length; c++)a = b[c], !a() && b[c] === a && b.splice(c--, 1);
        b.length || $.fx.stop()
    }, $.fx.timer = function (a) {
        a() && $.timers.push(a) && !Vc && (Vc = setInterval($.fx.tick, $.fx.interval))
    }, $.fx.interval = 13, $.fx.stop = function () {
        clearInterval(Vc), Vc = null
    }, $.fx.speeds = {slow: 600, fast: 200, _default: 400}, $.fx.step = {}, $.expr && $.expr.filters && ($.expr.filters.animated = function (a) {
        return $.grep($.timers, function (b) {
            return a === b.elem
        }).length
    });
    var _c = /^(?:body|html)$/i;
    $.fn.offset = function (a) {
        if (arguments.length)return a === b ? this : this.each(function (b) {
            $.offset.setOffset(this, a, b)
        });
        var c, d, e, f, g, h, i, j, k, l, m = this[0], n = m && m.ownerDocument;
        if (n)return(e = n.body) === m ? $.offset.bodyOffset(m) : (d = n.documentElement, $.contains(d, m) ? (c = m.getBoundingClientRect(), f = M(n), g = d.clientTop || e.clientTop || 0, h = d.clientLeft || e.clientLeft || 0, i = f.pageYOffset || d.scrollTop, j = f.pageXOffset || d.scrollLeft, k = c.top + i - g, l = c.left + j - h, {top: k, left: l}) : {top: 0, left: 0})
    }, $.offset = {bodyOffset: function (a) {
        var b = a.offsetTop, c = a.offsetLeft;
        return $.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat($.css(a, "marginTop")) || 0, c += parseFloat($.css(a, "marginLeft")) || 0), {top: b, left: c}
    }, setOffset: function (a, b, c) {
        var d = $.css(a, "position");
        "static" === d && (a.style.position = "relative");
        var e, f, g = $(a), h = g.offset(), i = $.css(a, "top"), j = $.css(a, "left"), k = ("absolute" === d || "fixed" === d) && $.inArray("auto", [i, j]) > -1, l = {}, m = {};
        k ? (m = g.position(), e = m.top, f = m.left) : (e = parseFloat(i) || 0, f = parseFloat(j) || 0), $.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (l.top = b.top - h.top + e), null != b.left && (l.left = b.left - h.left + f), "using"in b ? b.using.call(a, l) : g.css(l)
    }}, $.fn.extend({position: function () {
        if (this[0]) {
            var a = this[0], b = this.offsetParent(), c = this.offset(), d = _c.test(b[0].nodeName) ? {top: 0, left: 0} : b.offset();
            return c.top -= parseFloat($.css(a, "marginTop")) || 0, c.left -= parseFloat($.css(a, "marginLeft")) || 0, d.top += parseFloat($.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat($.css(b[0], "borderLeftWidth")) || 0, {top: c.top - d.top, left: c.left - d.left}
        }
    }, offsetParent: function () {
        return this.map(function () {
            for (var a = this.offsetParent || P.body; a && !_c.test(a.nodeName) && "static" === $.css(a, "position");)a = a.offsetParent;
            return a || P.body
        })
    }}), $.each({scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function (a, c) {
        var d = /Y/.test(c);
        $.fn[a] = function (e) {
            return $.access(this, function (a, e, f) {
                var g = M(a);
                return f === b ? g ? c in g ? g[c] : g.document.documentElement[e] : a[e] : (g ? g.scrollTo(d ? $(g).scrollLeft() : f, d ? f : $(g).scrollTop()) : a[e] = f, void 0)
            }, a, e, arguments.length, null)
        }
    }), $.each({Height: "height", Width: "width"}, function (a, c) {
        $.each({padding: "inner" + a, content: c, "": "outer" + a}, function (d, e) {
            $.fn[e] = function (e, f) {
                var g = arguments.length && (d || "boolean" != typeof e), h = d || (e === !0 || f === !0 ? "margin" : "border");
                return $.access(this, function (c, d, e) {
                    var f;
                    return $.isWindow(c) ? c.document.documentElement["client" + a] : 9 === c.nodeType ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? $.css(c, d, e, h) : $.style(c, d, e, h)
                }, c, g ? e : b, g)
            }
        })
    }), a.jQuery = a.$ = $, "function" == typeof define && define.amd && define.amd.jQuery && define("jquery", [], function () {
        return $
    })
}(window), function (a, b, c) {
    function d() {
        var b = a.angular;
        return a.angular = dd, b
    }

    function e(a) {
        return a && "number" == typeof a.length ? "function" != typeof a.hasOwnProperty && "function" != typeof a.constructor ? !0 : a instanceof gb || Yc && a instanceof Yc || "[object Object]" !== cd.call(a) || "function" == typeof a.callee : !1
    }

    function f(a, b, c) {
        var d;
        if (a)if (y(a))for (d in a)"prototype" != d && "length" != d && "name" != d && a.hasOwnProperty(d) && b.call(c, a[d], d); else if (a.forEach && a.forEach !== f)a.forEach(b, c); else if (e(a))for (d = 0; d < a.length; d++)b.call(c, a[d], d); else for (d in a)a.hasOwnProperty(d) && b.call(c, a[d], d);
        return a
    }

    function g(a) {
        var b = [];
        for (var c in a)a.hasOwnProperty(c) && b.push(c);
        return b.sort()
    }

    function h(a, b, c) {
        for (var d = g(a), e = 0; e < d.length; e++)b.call(c, a[d[e]], d[e]);
        return d
    }

    function i(a) {
        return function (b, c) {
            a(c, b)
        }
    }

    function j() {
        for (var a, b = fd.length; b;) {
            if (b--, a = fd[b].charCodeAt(0), 57 == a)return fd[b] = "A", fd.join("");
            if (90 != a)return fd[b] = String.fromCharCode(a + 1), fd.join("");
            fd[b] = "0"
        }
        return fd.unshift("0"), fd.join("")
    }

    function k(a, b) {
        b ? a.$$hashKey = b : delete a.$$hashKey
    }

    function l(a) {
        var b = a.$$hashKey;
        return f(arguments, function (b) {
            b !== a && f(b, function (b, c) {
                a[c] = b
            })
        }), k(a, b), a
    }

    function m(a) {
        return parseInt(a, 10)
    }

    function n(a, b) {
        return l(new (l(function () {
        }, {prototype: a})), b)
    }

    function o() {
    }

    function p(a) {
        return a
    }

    function q(a) {
        return function () {
            return a
        }
    }

    function r(a) {
        return"undefined" == typeof a
    }

    function s(a) {
        return"undefined" != typeof a
    }

    function t(a) {
        return null != a && "object" == typeof a
    }

    function u(a) {
        return"string" == typeof a
    }

    function v(a) {
        return"number" == typeof a
    }

    function w(a) {
        return"[object Date]" == cd.apply(a)
    }

    function x(a) {
        return"[object Array]" == cd.apply(a)
    }

    function y(a) {
        return"function" == typeof a
    }

    function z(a) {
        return a && a.document && a.location && a.alert && a.setInterval
    }

    function A(a) {
        return a && a.$evalAsync && a.$watch
    }

    function B(a) {
        return"[object File]" === cd.apply(a)
    }

    function C(a) {
        return u(a) ? a.replace(/^\s*/, "").replace(/\s*$/, "") : a
    }

    function D(a) {
        return a && (a.nodeName || a.bind && a.find)
    }

    function E(a, b, c) {
        var d = [];
        return f(a, function (a, e, f) {
            d.push(b.call(c, a, e, f))
        }), d
    }

    function F(a, b) {
        return-1 != G(a, b)
    }

    function G(a, b) {
        if (a.indexOf)return a.indexOf(b);
        for (var c = 0; c < a.length; c++)if (b === a[c])return c;
        return-1
    }

    function H(a, b) {
        var c = G(a, b);
        return c >= 0 && a.splice(c, 1), b
    }

    function I(a, b) {
        if (z(a) || A(a))throw Error("Can't copy Window or Scope");
        if (b) {
            if (a === b)throw Error("Can't copy equivalent objects or arrays");
            if (x(a)) {
                b.length = 0;
                for (var c = 0; c < a.length; c++)b.push(I(a[c]))
            } else {
                var d = b.$$hashKey;
                f(b, function (a, c) {
                    delete b[c]
                });
                for (var e in a)b[e] = I(a[e]);
                k(b, d)
            }
        } else b = a, a && (x(a) ? b = I(a, []) : w(a) ? b = new Date(a.getTime()) : t(a) && (b = I(a, {})));
        return b
    }

    function J(a, b) {
        b = b || {};
        for (var c in a)a.hasOwnProperty(c) && "$$" !== c.substr(0, 2) && (b[c] = a[c]);
        return b
    }

    function K(a, b) {
        if (a === b)return!0;
        if (null === a || null === b)return!1;
        if (a !== a && b !== b)return!0;
        var d, e, f, g = typeof a, h = typeof b;
        if (g == h && "object" == g) {
            if (!x(a)) {
                if (w(a))return w(b) && a.getTime() == b.getTime();
                if (A(a) || A(b) || z(a) || z(b))return!1;
                f = {};
                for (e in a)if ("$" !== e.charAt(0) && !y(a[e])) {
                    if (!K(a[e], b[e]))return!1;
                    f[e] = !0
                }
                for (e in b)if (!f[e] && "$" !== e.charAt(0) && b[e] !== c && !y(b[e]))return!1;
                return!0
            }
            if ((d = a.length) == b.length) {
                for (e = 0; d > e; e++)if (!K(a[e], b[e]))return!1;
                return!0
            }
        }
        return!1
    }

    function L(a, b, c) {
        return a.concat(ad.call(b, c))
    }

    function M(a, b) {
        return ad.call(a, b || 0)
    }

    function N(a, b) {
        var c = arguments.length > 2 ? M(arguments, 2) : [];
        return!y(b) || b instanceof RegExp ? b : c.length ? function () {
            return arguments.length ? b.apply(a, c.concat(ad.call(arguments, 0))) : b.apply(a, c)
        } : function () {
            return arguments.length ? b.apply(a, arguments) : b.call(a)
        }
    }

    function O(a, d) {
        var e = d;
        return/^\$+/.test(a) ? e = c : z(d) ? e = "$WINDOW" : d && b === d ? e = "$DOCUMENT" : A(d) && (e = "$SCOPE"), e
    }

    function P(a, b) {
        return JSON.stringify(a, O, b ? "  " : null)
    }

    function Q(a) {
        return u(a) ? JSON.parse(a) : a
    }

    function R(a) {
        if (a && 0 !== a.length) {
            var b = Tc("" + a);
            a = !("f" == b || "0" == b || "false" == b || "no" == b || "n" == b || "[]" == b)
        } else a = !1;
        return a
    }

    function S(a) {
        a = Xc(a).clone();
        try {
            a.html("")
        } catch (b) {
        }
        var c = 3, d = Xc("<div>").append(a).html();
        try {
            return a[0].nodeType === c ? Tc(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (a, b) {
                return"<" + Tc(b)
            })
        } catch (b) {
            return Tc(d)
        }
    }

    function T(a) {
        var b, c, d = {};
        return f((a || "").split("&"), function (a) {
            a && (b = a.split("="), c = decodeURIComponent(b[0]), d[c] = s(b[1]) ? decodeURIComponent(b[1]) : !0)
        }), d
    }

    function U(a) {
        var b = [];
        return f(a, function (a, c) {
            b.push(W(c, !0) + (a === !0 ? "" : "=" + W(a, !0)))
        }), b.length ? b.join("&") : ""
    }

    function V(a) {
        return W(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }

    function W(a, b) {
        return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, b ? "%20" : "+")
    }

    function X(a, c) {
        function d(a) {
            a && h.push(a)
        }

        var e, g, h = [a], i = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"], j = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        f(i, function (c) {
            i[c] = !0, d(b.getElementById(c)), c = c.replace(":", "\\:"), a.querySelectorAll && (f(a.querySelectorAll("." + c), d), f(a.querySelectorAll("." + c + "\\:"), d), f(a.querySelectorAll("[" + c + "]"), d))
        }), f(h, function (a) {
            if (!e) {
                var b = " " + a.className + " ", c = j.exec(b);
                c ? (e = a, g = (c[2] || "").replace(/\s+/g, ",")) : f(a.attributes, function (b) {
                    !e && i[b.name] && (e = a, g = b.value)
                })
            }
        }), e && c(e, g ? [g] : [])
    }

    function Y(b, c) {
        var d = function () {
            b = Xc(b), c = c || [], c.unshift(["$provide", function (a) {
                a.value("$rootElement", b)
            }]), c.unshift("ng");
            var a = yb(c);
            return a.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animator", function (a, b, c, d, e) {
                a.$apply(function () {
                    b.data("$injector", d), c(b)(a)
                }), e.enabled(!0)
            }]), a
        }, e = /^NG_DEFER_BOOTSTRAP!/;
        return a && !e.test(a.name) ? d() : (a.name = a.name.replace(e, ""), ed.resumeBootstrap = function (a) {
            f(a, function (a) {
                c.push(a)
            }), d()
        }, void 0)
    }

    function Z(a, b) {
        return b = b || "_", a.replace(gd, function (a, c) {
            return(c ? b : "") + a.toLowerCase()
        })
    }

    function $() {
        Yc = a.jQuery, Yc ? (Xc = Yc, l(Yc.fn, {scope: pd.scope, controller: pd.controller, injector: pd.injector, inheritedData: pd.inheritedData}), fb("remove", !0), fb("empty"), fb("html")) : Xc = gb, ed.element = Xc
    }

    function _(a, b, c) {
        if (!a)throw new Error("Argument '" + (b || "?") + "' is " + (c || "required"));
        return a
    }

    function ab(a, b, c) {
        return c && x(a) && (a = a[a.length - 1]), _(y(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)), a
    }

    function bb(a) {
        function b(a, b, c) {
            return a[b] || (a[b] = c())
        }

        return b(b(a, "angular", Object), "module", function () {
            var a = {};
            return function (c, d, e) {
                return d && a.hasOwnProperty(c) && (a[c] = null), b(a, c, function () {
                    function a(a, c, d) {
                        return function () {
                            return b[d || "push"]([a, c, arguments]), h
                        }
                    }

                    if (!d)throw Error("No module: " + c);
                    var b = [], f = [], g = a("$injector", "invoke"), h = {_invokeQueue: b, _runBlocks: f, requires: d, name: c, provider: a("$provide", "provider"), factory: a("$provide", "factory"), service: a("$provide", "service"), value: a("$provide", "value"), constant: a("$provide", "constant", "unshift"), animation: a("$animationProvider", "register"), filter: a("$filterProvider", "register"), controller: a("$controllerProvider", "register"), directive: a("$compileProvider", "directive"), config: g, run: function (a) {
                        return f.push(a), this
                    }};
                    return e && g(e), h
                })
            }
        })
    }

    function cb(b) {
        l(b, {bootstrap: Y, copy: I, extend: l, equals: K, element: Xc, forEach: f, injector: yb, noop: o, bind: N, toJson: P, fromJson: Q, identity: p, isUndefined: r, isDefined: s, isString: u, isFunction: y, isObject: t, isNumber: v, isElement: D, isArray: x, version: hd, isDate: w, lowercase: Tc, uppercase: Uc, callbacks: {counter: 0}, noConflict: d}), Zc = bb(a);
        try {
            Zc("ngLocale")
        } catch (c) {
            Zc("ngLocale", []).provider("$locale", tc)
        }
        Zc("ng", ["ngLocale"], ["$provide", function (a) {
            a.provider("$compile", Fb).directive({a: Nd, input: Xd, textarea: Xd, form: Rd, script: Ge, select: Ie, style: Ke, option: Je, ngBind: he, ngBindHtmlUnsafe: je, ngBindTemplate: ie, ngClass: ke, ngClassEven: me, ngClassOdd: le, ngCsp: pe, ngCloak: ne, ngController: oe, ngForm: Sd, ngHide: ze, ngIf: se, ngInclude: te, ngInit: ue, ngNonBindable: ve, ngPluralize: we, ngRepeat: xe, ngShow: ye, ngSubmit: re, ngStyle: Ae, ngSwitch: Be, ngSwitchWhen: Ce, ngSwitchDefault: De, ngOptions: He, ngView: Fe, ngTransclude: Ee, ngModel: be, ngList: ee, ngChange: ce, required: de, ngRequired: de, ngValue: ge}).directive(Od).directive(qe), a.provider({$anchorScroll: zb, $animation: Ab, $animator: wd, $browser: Cb, $cacheFactory: Db, $controller: Hb, $document: Ib, $exceptionHandler: Jb, $filter: vc, $interpolate: Kb, $http: qc, $httpBackend: rc, $location: Xb, $log: Yb, $parse: dc, $route: gc, $routeParams: hc, $rootScope: ic, $q: ec, $sniffer: jc, $templateCache: Eb, $timeout: uc, $window: kc})
        }])
    }

    function db() {
        return++kd
    }

    function eb(a) {
        return a.replace(nd, function (a, b, c, d) {
            return d ? c.toUpperCase() : c
        }).replace(od, "Moz$1")
    }

    function fb(a, b) {
        function c() {
            for (var a, c, e, f, g, h, i, j = [this], k = b; j.length;)for (a = j.shift(), c = 0, e = a.length; e > c; c++)for (f = Xc(a[c]), k ? f.triggerHandler("$destroy") : k = !k, g = 0, h = (i = f.children()).length; h > g; g++)j.push(Yc(i[g]));
            return d.apply(this, arguments)
        }

        var d = Yc.fn[a];
        d = d.$original || d, c.$original = d, Yc.fn[a] = c
    }

    function gb(a) {
        if (a instanceof gb)return a;
        if (!(this instanceof gb)) {
            if (u(a) && "<" != a.charAt(0))throw Error("selectors not implemented");
            return new gb(a)
        }
        if (u(a)) {
            var c = b.createElement("div");
            c.innerHTML = "<div>&#160;</div>" + a, c.removeChild(c.firstChild), qb(this, c.childNodes), this.remove()
        } else qb(this, a)
    }

    function hb(a) {
        return a.cloneNode(!0)
    }

    function ib(a) {
        kb(a);
        for (var b = 0, c = a.childNodes || []; b < c.length; b++)ib(c[b])
    }

    function jb(a, b, c) {
        var d = lb(a, "events"), e = lb(a, "handle");
        e && (r(b) ? f(d, function (b, c) {
            md(a, c, b), delete d[c]
        }) : r(c) ? (md(a, b, d[b]), delete d[b]) : H(d[b], c))
    }

    function kb(a) {
        var b = a[jd], d = id[b];
        d && (d.handle && (d.events.$destroy && d.handle({}, "$destroy"), jb(a)), delete id[b], a[jd] = c)
    }

    function lb(a, b, c) {
        var d = a[jd], e = id[d || -1];
        return s(c) ? (e || (a[jd] = d = db(), e = id[d] = {}), e[b] = c, void 0) : e && e[b]
    }

    function mb(a, b, c) {
        var d = lb(a, "data"), e = s(c), f = !e && s(b), g = f && !t(b);
        if (d || g || lb(a, "data", d = {}), e)d[b] = c; else {
            if (!f)return d;
            if (g)return d && d[b];
            l(d, b)
        }
    }

    function nb(a, b) {
        return(" " + a.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") > -1
    }

    function ob(a, b) {
        b && f(b.split(" "), function (b) {
            a.className = C((" " + a.className + " ").replace(/[\n\t]/g, " ").replace(" " + C(b) + " ", " "))
        })
    }

    function pb(a, b) {
        b && f(b.split(" "), function (b) {
            nb(a, b) || (a.className = C(a.className + " " + C(b)))
        })
    }

    function qb(a, b) {
        if (b) {
            b = b.nodeName || !s(b.length) || z(b) ? [b] : b;
            for (var c = 0; c < b.length; c++)a.push(b[c])
        }
    }

    function rb(a, b) {
        return sb(a, "$" + (b || "ngController") + "Controller")
    }

    function sb(a, b, c) {
        for (a = Xc(a), 9 == a[0].nodeType && (a = a.find("html")); a.length;) {
            if (c = a.data(b))return c;
            a = a.parent()
        }
    }

    function tb(a, b) {
        var c = qd[b.toLowerCase()];
        return c && rd[a.nodeName] && c
    }

    function ub(a, c) {
        var d = function (d, e) {
            if (d.preventDefault || (d.preventDefault = function () {
                d.returnValue = !1
            }), d.stopPropagation || (d.stopPropagation = function () {
                d.cancelBubble = !0
            }), d.target || (d.target = d.srcElement || b), r(d.defaultPrevented)) {
                var g = d.preventDefault;
                d.preventDefault = function () {
                    d.defaultPrevented = !0, g.call(d)
                }, d.defaultPrevented = !1
            }
            d.isDefaultPrevented = function () {
                return d.defaultPrevented || 0 == d.returnValue
            }, f(c[e || d.type], function (b) {
                b.call(a, d)
            }), 8 >= _c ? (d.preventDefault = null, d.stopPropagation = null, d.isDefaultPrevented = null) : (delete d.preventDefault, delete d.stopPropagation, delete d.isDefaultPrevented)
        };
        return d.elem = a, d
    }

    function vb(a) {
        var b, d = typeof a;
        return"object" == d && null !== a ? "function" == typeof(b = a.$$hashKey) ? b = a.$$hashKey() : b === c && (b = a.$$hashKey = j()) : b = a, d + ":" + b
    }

    function wb(a) {
        f(a, this.put, this)
    }

    function xb(a) {
        var b, c, d, e;
        return"function" == typeof a ? (b = a.$inject) || (b = [], c = a.toString().replace(vd, ""), d = c.match(sd), f(d[1].split(td), function (a) {
            a.replace(ud, function (a, c, d) {
                b.push(d)
            })
        }), a.$inject = b) : x(a) ? (e = a.length - 1, ab(a[e], "fn"), b = a.slice(0, e)) : ab(a, "fn", !0), b
    }

    function yb(a) {
        function b(a) {
            return function (b, c) {
                return t(b) ? (f(b, i(a)), void 0) : a(b, c)
            }
        }

        function c(a, b) {
            if ((y(b) || x(b)) && (b = v.instantiate(b)), !b.$get)throw Error("Provider " + a + " must define $get factory method.");
            return s[a + n] = b
        }

        function d(a, b) {
            return c(a, {$get: b})
        }

        function e(a, b) {
            return d(a, ["$injector", function (a) {
                return a.instantiate(b)
            }])
        }

        function g(a, b) {
            return d(a, q(b))
        }

        function h(a, b) {
            s[a] = b, w[a] = b
        }

        function j(a, b) {
            var c = v.get(a + n), d = c.$get;
            c.$get = function () {
                var a = z.invoke(d, c);
                return z.invoke(b, null, {$delegate: a})
            }
        }

        function k(a) {
            var b = [];
            return f(a, function (a) {
                if (!r.get(a))if (r.put(a, !0), u(a)) {
                    var c = Zc(a);
                    b = b.concat(k(c.requires)).concat(c._runBlocks);
                    try {
                        for (var d = c._invokeQueue, e = 0, f = d.length; f > e; e++) {
                            var g = d[e], h = v.get(g[0]);
                            h[g[1]].apply(h, g[2])
                        }
                    } catch (i) {
                        throw i.message && (i.message += " from " + a), i
                    }
                } else if (y(a))try {
                    b.push(v.invoke(a))
                } catch (i) {
                    throw i.message && (i.message += " from " + a), i
                } else if (x(a))try {
                    b.push(v.invoke(a))
                } catch (i) {
                    throw i.message && (i.message += " from " + String(a[a.length - 1])), i
                } else ab(a, "module")
            }), b
        }

        function l(a, b) {
            function c(c) {
                if ("string" != typeof c)throw Error("Service name expected");
                if (a.hasOwnProperty(c)) {
                    if (a[c] === m)throw Error("Circular dependency: " + p.join(" <- "));
                    return a[c]
                }
                try {
                    return p.unshift(c), a[c] = m, a[c] = b(c)
                } finally {
                    p.shift()
                }
            }

            function d(a, b, d) {
                var e, f, g, h = [], i = xb(a);
                for (f = 0, e = i.length; e > f; f++)g = i[f], h.push(d && d.hasOwnProperty(g) ? d[g] : c(g));
                switch (a.$inject || (a = a[e]), b ? -1 : h.length) {
                    case 0:
                        return a();
                    case 1:
                        return a(h[0]);
                    case 2:
                        return a(h[0], h[1]);
                    case 3:
                        return a(h[0], h[1], h[2]);
                    case 4:
                        return a(h[0], h[1], h[2], h[3]);
                    case 5:
                        return a(h[0], h[1], h[2], h[3], h[4]);
                    case 6:
                        return a(h[0], h[1], h[2], h[3], h[4], h[5]);
                    case 7:
                        return a(h[0], h[1], h[2], h[3], h[4], h[5], h[6]);
                    case 8:
                        return a(h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7]);
                    case 9:
                        return a(h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], h[8]);
                    case 10:
                        return a(h[0], h[1], h[2], h[3], h[4], h[5], h[6], h[7], h[8], h[9]);
                    default:
                        return a.apply(b, h)
                }
            }

            function e(a, b) {
                var c, e, f = function () {
                };
                return f.prototype = (x(a) ? a[a.length - 1] : a).prototype, c = new f, e = d(a, c, b), t(e) ? e : c
            }

            return{invoke: d, instantiate: e, get: c, annotate: xb, has: function (b) {
                return s.hasOwnProperty(b + n) || a.hasOwnProperty(b)
            }}
        }

        var m = {}, n = "Provider", p = [], r = new wb, s = {$provide: {provider: b(c), factory: b(d), service: b(e), value: b(g), constant: b(h), decorator: j}}, v = s.$injector = l(s, function () {
            throw Error("Unknown provider: " + p.join(" <- "))
        }), w = {}, z = w.$injector = l(w, function (a) {
            var b = v.get(a + n);
            return z.invoke(b.$get, b)
        });
        return f(k(a), function (a) {
            z.invoke(a || o)
        }), z
    }

    function zb() {
        var a = !0;
        this.disableAutoScrolling = function () {
            a = !1
        }, this.$get = ["$window", "$location", "$rootScope", function (b, c, d) {
            function e(a) {
                var b = null;
                return f(a, function (a) {
                    b || "a" !== Tc(a.nodeName) || (b = a)
                }), b
            }

            function g() {
                var a, d = c.hash();
                d ? (a = h.getElementById(d)) ? a.scrollIntoView() : (a = e(h.getElementsByName(d))) ? a.scrollIntoView() : "top" === d && b.scrollTo(0, 0) : b.scrollTo(0, 0)
            }

            var h = b.document;
            return a && d.$watch(function () {
                return c.hash()
            }, function () {
                d.$evalAsync(g)
            }), g
        }]
    }

    function Ab(a) {
        var b = "Animation";
        this.register = function (c, d) {
            a.factory(eb(c) + b, d)
        }, this.$get = ["$injector", function (a) {
            return function (c) {
                if (c) {
                    var d = eb(c) + b;
                    if (a.has(d))return a.get(d)
                }
            }
        }]
    }

    function Bb(a, b, d, e) {
        function g(a) {
            try {
                a.apply(null, M(arguments, 1))
            } finally {
                if (s--, 0 === s)for (; t.length;)try {
                    t.pop()()
                } catch (b) {
                    d.error(b)
                }
            }
        }

        function h(a, b) {
            !function c() {
                f(w, function (a) {
                    a()
                }), v = b(c, a)
            }()
        }

        function i() {
            x != j.url() && (x = j.url(), f(z, function (a) {
                a(j.url())
            }))
        }

        var j = this, k = b[0], l = a.location, m = a.history, n = a.setTimeout, p = a.clearTimeout, q = {};
        j.isMock = !1;
        var s = 0, t = [];
        j.$$completeOutstandingRequest = g, j.$$incOutstandingRequestCount = function () {
            s++
        }, j.notifyWhenNoOutstandingRequests = function (a) {
            f(w, function (a) {
                a()
            }), 0 === s ? a() : t.push(a)
        };
        var v, w = [];
        j.addPollFn = function (a) {
            return r(v) && h(100, n), w.push(a), a
        };
        var x = l.href, y = b.find("base");
        j.url = function (a, b) {
            if (a) {
                if (x == a)return;
                return x = a, e.history ? b ? m.replaceState(null, "", a) : (m.pushState(null, "", a), y.attr("href", y.attr("href"))) : b ? l.replace(a) : l.href = a, j
            }
            return l.href.replace(/%27/g, "'")
        };
        var z = [], A = !1;
        j.onUrlChange = function (b) {
            return A || (e.history && Xc(a).bind("popstate", i), e.hashchange ? Xc(a).bind("hashchange", i) : j.addPollFn(i), A = !0), z.push(b), b
        }, j.baseHref = function () {
            var a = y.attr("href");
            return a ? a.replace(/^https?\:\/\/[^\/]*/, "") : ""
        };
        var B = {}, C = "", D = j.baseHref();
        j.cookies = function (a, b) {
            var e, f, g, h, i;
            if (!a) {
                if (k.cookie !== C)for (C = k.cookie, f = C.split("; "), B = {}, h = 0; h < f.length; h++)if (g = f[h], i = g.indexOf("="), i > 0) {
                    var a = unescape(g.substring(0, i));
                    B[a] === c && (B[a] = unescape(g.substring(i + 1)))
                }
                return B
            }
            b === c ? k.cookie = escape(a) + "=;path=" + D + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : u(b) && (e = (k.cookie = escape(a) + "=" + escape(b) + ";path=" + D).length + 1, e > 4096 && d.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + e + " > 4096 bytes)!"))
        }, j.defer = function (a, b) {
            var c;
            return s++, c = n(function () {
                delete q[c], g(a)
            }, b || 0), q[c] = !0, c
        }, j.defer.cancel = function (a) {
            return q[a] ? (delete q[a], p(a), g(o), !0) : !1
        }
    }

    function Cb() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function (a, b, c, d) {
            return new Bb(a, d, b, c)
        }]
    }

    function Db() {
        this.$get = function () {
            function a(a, c) {
                function d(a) {
                    a != k && (m ? m == a && (m = a.n) : m = a, e(a.n, a.p), e(a, k), k = a, k.n = null)
                }

                function e(a, b) {
                    a != b && (a && (a.p = b), b && (b.n = a))
                }

                if (a in b)throw Error("cacheId " + a + " taken");
                var f = 0, g = l({}, c, {id: a}), h = {}, i = c && c.capacity || Number.MAX_VALUE, j = {}, k = null, m = null;
                return b[a] = {put: function (a, b) {
                    var c = j[a] || (j[a] = {key: a});
                    return d(c), r(b) ? void 0 : (a in h || f++, h[a] = b, f > i && this.remove(m.key), b)
                }, get: function (a) {
                    var b = j[a];
                    if (b)return d(b), h[a]
                }, remove: function (a) {
                    var b = j[a];
                    b && (b == k && (k = b.p), b == m && (m = b.n), e(b.n, b.p), delete j[a], delete h[a], f--)
                }, removeAll: function () {
                    h = {}, f = 0, j = {}, k = m = null
                }, destroy: function () {
                    h = null, g = null, j = null, delete b[a]
                }, info: function () {
                    return l({}, g, {size: f})
                }}
            }

            var b = {};
            return a.info = function () {
                var a = {};
                return f(b, function (b, c) {
                    a[c] = b.info()
                }), a
            }, a.get = function (a) {
                return b[a]
            }, a
        }
    }

    function Eb() {
        this.$get = ["$cacheFactory", function (a) {
            return a("templates")
        }]
    }

    function Fb(a) {
        var d = {}, e = "Directive", g = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, h = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, j = "Template must have exactly one root element. was: ", k = /^\s*(https?|ftp|mailto|file):/;
        this.directive = function m(b, c) {
            return u(b) ? (_(c, "directive"), d.hasOwnProperty(b) || (d[b] = [], a.factory(b + e, ["$injector", "$exceptionHandler", function (a, c) {
                var e = [];
                return f(d[b], function (d) {
                    try {
                        var f = a.invoke(d);
                        y(f) ? f = {compile: q(f)} : !f.compile && f.link && (f.compile = q(f.link)), f.priority = f.priority || 0, f.name = f.name || b, f.require = f.require || f.controller && f.name, f.restrict = f.restrict || "A", e.push(f)
                    } catch (g) {
                        c(g)
                    }
                }), e
            }])), d[b].push(c)) : f(b, i(m)), this
        }, this.urlSanitizationWhitelist = function (a) {
            return s(a) ? (k = a, this) : k
        }, this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", function (a, i, m, n, o, r, s, v, w) {
            function z(a, b, c) {
                a instanceof Xc || (a = Xc(a)), f(a, function (b, c) {
                    3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = Xc(b).wrap("<span></span>").parent()[0])
                });
                var d = B(a, b, a, c);
                return function (b, c) {
                    _(b, "scope");
                    for (var e = c ? pd.clone.call(a) : a, f = 0, g = e.length; g > f; f++) {
                        var h = e[f];
                        (1 == h.nodeType || 9 == h.nodeType) && e.eq(f).data("$scope", b)
                    }
                    return A(e, "ng-scope"), c && c(e, b), d && d(b, e, e), e
                }
            }

            function A(a, b) {
                try {
                    a.addClass(b)
                } catch (c) {
                }
            }

            function B(a, b, d, e) {
                function f(a, d, e, f) {
                    var g, h, i, j, k, m, n, o, p = [];
                    for (m = 0, n = d.length; n > m; m++)p.push(d[m]);
                    for (m = 0, o = 0, n = l.length; n > m; o++)i = p[o], g = l[m++], h = l[m++], g ? (g.scope ? (j = a.$new(t(g.scope)), Xc(i).data("$scope", j)) : j = a, k = g.transclude, k || !f && b ? g(h, j, i, e, function (b) {
                        return function (c) {
                            var d = a.$new();
                            return d.$$transcluded = !0, b(d, c).bind("$destroy", N(d, d.$destroy))
                        }
                    }(k || b)) : g(h, j, i, c, f)) : h && h(a, i.childNodes, c, f)
                }

                for (var g, h, i, j, k, l = [], m = 0; m < a.length; m++)j = new P, i = D(a[m], [], j, e), g = i.length ? E(i, a[m], j, b, d) : null, h = g && g.terminal || !a[m].childNodes || !a[m].childNodes.length ? null : B(a[m].childNodes, g ? g.transclude : b), l.push(g), l.push(h), k = k || g || h;
                return k ? f : null
            }

            function D(a, b, c, d) {
                var e, f, i = a.nodeType, j = c.$attr;
                switch (i) {
                    case 1:
                        F(b, Gb($c(a).toLowerCase()), "E", d);
                        for (var k, l, m, n, o, p = a.attributes, q = 0, r = p && p.length; r > q; q++)k = p[q], k.specified && (l = k.name, n = Gb(l), V.test(n) && (l = n.substr(6).toLowerCase()), m = Gb(l.toLowerCase()), j[m] = l, c[m] = o = C(_c && "href" == l ? decodeURIComponent(a.getAttribute(l, 2)) : k.value), tb(a, m) && (c[m] = !0), M(a, b, o, m), F(b, m, "A", d));
                        if (f = a.className, u(f) && "" !== f)for (; e = h.exec(f);)m = Gb(e[2]), F(b, m, "C", d) && (c[m] = C(e[3])), f = f.substr(e.index + e[0].length);
                        break;
                    case 3:
                        L(b, a.nodeValue);
                        break;
                    case 8:
                        try {
                            e = g.exec(a.nodeValue), e && (m = Gb(e[1]), F(b, m, "M", d) && (c[m] = C(e[2])))
                        } catch (s) {
                        }
                }
                return b.sort(I), b
            }

            function E(a, d, e, g, h) {
                function k(a, b) {
                    a && (a.require = o.require, I.push(a)), b && (b.require = o.require, L.push(b))
                }

                function l(a, b) {
                    var c, d = "data", e = !1;
                    if (u(a)) {
                        for (; "^" == (c = a.charAt(0)) || "?" == c;)a = a.substr(1), "^" == c && (d = "inheritedData"), e = e || "?" == c;
                        if (c = b[d]("$" + a + "Controller"), !c && !e)throw Error("No controller: " + a);
                        return c
                    }
                    return x(a) && (c = [], f(a, function (a) {
                        c.push(l(a, b))
                    })), c
                }

                function n(a, b, g, h, j) {
                    var k, n, o, p, q, t;
                    if (k = d === g ? e : J(e, new P(Xc(g), e.$attr)), n = k.$$element, N) {
                        var u = /^\s*([@=&])(\??)\s*(\w*)\s*$/, v = b.$parent || b;
                        f(N.scope, function (a, c) {
                            var d, e, f, g = a.match(u) || [], h = g[3] || c, j = "?" == g[2], l = g[1];
                            switch (b.$$isolateBindings[c] = l + h, l) {
                                case"@":
                                    k.$observe(h, function (a) {
                                        b[c] = a
                                    }), k.$$observers[h].$$scope = v, k[h] && (b[c] = i(k[h])(v));
                                    break;
                                case"=":
                                    if (j && !k[h])return;
                                    e = r(k[h]), f = e.assign || function () {
                                        throw d = b[c] = e(v), Error(xd + k[h] + " (directive: " + N.name + ")")
                                    }, d = b[c] = e(v), b.$watch(function () {
                                        var a = e(v);
                                        return a !== b[c] && (a !== d ? d = b[c] = a : f(v, a = d = b[c])), a
                                    });
                                    break;
                                case"&":
                                    e = r(k[h]), b[c] = function (a) {
                                        return e(v, a)
                                    };
                                    break;
                                default:
                                    throw Error("Invalid isolate scope definition for directive " + N.name + ": " + a)
                            }
                        })
                    }
                    for (w && f(w, function (a) {
                        var c = {$scope: b, $element: n, $attrs: k, $transclude: j};
                        t = a.controller, "@" == t && (t = k[a.name]), n.data("$" + a.name + "Controller", s(t, c))
                    }), o = 0, p = I.length; p > o; o++)try {
                        q = I[o], q(b, n, k, q.require && l(q.require, n))
                    } catch (x) {
                        m(x, S(n))
                    }
                    for (a && a(b, g.childNodes, c, j), o = 0, p = L.length; p > o; o++)try {
                        q = L[o], q(b, n, k, q.require && l(q.require, n))
                    } catch (x) {
                        m(x, S(n))
                    }
                }

                for (var o, p, q, v, w, B, E, F = -Number.MAX_VALUE, I = [], L = [], M = null, N = null, Q = null, R = e.$$element = Xc(d), T = g, V = 0, W = a.length; W > V && (o = a[V], q = c, !(F > o.priority)); V++) {
                    if ((E = o.scope) && (K("isolated scope", N, o, R), t(E) && (A(R, "ng-isolate-scope"), N = o), A(R, "ng-scope"), M = M || o), p = o.name, (E = o.controller) && (w = w || {}, K("'" + p + "' controller", w[p], o, R), w[p] = o), (E = o.transclude) && (K("transclusion", v, o, R), v = o, F = o.priority, "element" == E ? (q = Xc(d), R = e.$$element = Xc(b.createComment(" " + p + ": " + e[p] + " ")), d = R[0], O(h, Xc(q[0]), d), T = z(q, g, F)) : (q = Xc(hb(d)).contents(), R.html(""), T = z(q, g))), o.template)if (K("template", Q, o, R), Q = o, E = y(o.template) ? o.template(R, e) : o.template, E = U(E), o.replace) {
                        if (q = Xc("<div>" + C(E) + "</div>").contents(), d = q[0], 1 != q.length || 1 !== d.nodeType)throw new Error(j + E);
                        O(h, R, d);
                        var X = {$attr: {}};
                        a = a.concat(D(d, a.splice(V + 1, a.length - (V + 1)), X)), G(e, X), W = a.length
                    } else R.html(E);
                    if (o.templateUrl)K("template", Q, o, R), Q = o, n = H(a.splice(V, a.length - V), n, R, e, h, o.replace, T), W = a.length; else if (o.compile)try {
                        B = o.compile(R, e, T), y(B) ? k(null, B) : B && k(B.pre, B.post)
                    } catch (Y) {
                        m(Y, S(R))
                    }
                    o.terminal && (n.terminal = !0, F = Math.max(F, o.priority))
                }
                return n.scope = M && M.scope, n.transclude = v && T, n
            }

            function F(b, f, g, h) {
                var i = !1;
                if (d.hasOwnProperty(f))for (var j, k = a.get(f + e), l = 0, n = k.length; n > l; l++)try {
                    j = k[l], (h === c || h > j.priority) && -1 != j.restrict.indexOf(g) && (b.push(j), i = !0)
                } catch (o) {
                    m(o)
                }
                return i
            }

            function G(a, b) {
                var c = b.$attr, d = a.$attr, e = a.$$element;
                f(a, function (d, e) {
                    "$" != e.charAt(0) && (b[e] && (d += ("style" === e ? ";" : " ") + b[e]), a.$set(e, d, !0, c[e]))
                }), f(b, function (b, f) {
                    "class" == f ? (A(e, b), a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? e.attr("style", e.attr("style") + ";" + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b, d[f] = c[f])
                })
            }

            function H(a, b, c, d, e, f, g) {
                var h, i, k = [], m = c[0], p = a.shift(), q = l({}, p, {controller: null, templateUrl: null, transclude: null, scope: null}), r = y(p.templateUrl) ? p.templateUrl(c, d) : p.templateUrl;
                return c.html(""), n.get(r, {cache: o}).success(function (l) {
                    var n, o, p;
                    if (l = U(l), f) {
                        if (p = Xc("<div>" + C(l) + "</div>").contents(), n = p[0], 1 != p.length || 1 !== n.nodeType)throw new Error(j + l);
                        o = {$attr: {}}, O(e, c, n), D(n, a, o), G(d, o)
                    } else n = m, c.html(l);
                    for (a.unshift(q), h = E(a, n, d, g), i = B(c[0].childNodes, g); k.length;) {
                        var r = k.shift(), s = k.shift(), t = k.shift(), u = k.shift(), v = n;
                        s !== m && (v = hb(n), O(t, Xc(s), v)), h(function () {
                            b(i, r, v, e, u)
                        }, r, v, e, u)
                    }
                    k = null
                }).error(function (a, b, c, d) {
                    throw Error("Failed to load template: " + d.url)
                }), function (a, c, d, e, f) {
                    k ? (k.push(c), k.push(d), k.push(e), k.push(f)) : h(function () {
                        b(i, c, d, e, f)
                    }, c, d, e, f)
                }
            }

            function I(a, b) {
                return b.priority - a.priority
            }

            function K(a, b, c, d) {
                if (b)throw Error("Multiple directives [" + b.name + ", " + c.name + "] asking for " + a + " on: " + S(d))
            }

            function L(a, b) {
                var c = i(b, !0);
                c && a.push({priority: 0, compile: q(function (a, b) {
                    var d = b.parent(), e = d.data("$binding") || [];
                    e.push(c), A(d.data("$binding", e), "ng-binding"), a.$watch(c, function (a) {
                        b[0].nodeValue = a
                    })
                })})
            }

            function M(a, b, c, d) {
                var e = i(c, !0);
                e && b.push({priority: 100, compile: q(function (a, b, c) {
                    var f = c.$$observers || (c.$$observers = {});
                    e = i(c[d], !0), e && (c[d] = e(a), (f[d] || (f[d] = [])).$$inter = !0, (c.$$observers && c.$$observers[d].$$scope || a).$watch(e, function (a) {
                        c.$set(d, a)
                    }))
                })})
            }

            function O(a, b, c) {
                var d, e, f = b[0], g = f.parentNode;
                if (a)for (d = 0, e = a.length; e > d; d++)if (a[d] == f) {
                    a[d] = c;
                    break
                }
                g && g.replaceChild(c, f), c[Xc.expando] = f[Xc.expando], b[0] = c
            }

            var P = function (a, b) {
                this.$$element = a, this.$attr = b || {}
            };
            P.prototype = {$normalize: Gb, $set: function (a, b, d, e) {
                var g, h = tb(this.$$element[0], a), i = this.$$observers;
                h && (this.$$element.prop(a, b), e = h), this[a] = b, e ? this.$attr[a] = e : (e = this.$attr[a], e || (this.$attr[a] = e = Z(a, "-"))), "A" === $c(this.$$element[0]) && "href" === a && (Q.setAttribute("href", b), g = Q.href, g.match(k) || (this[a] = b = "unsafe:" + g)), d !== !1 && (null === b || b === c ? this.$$element.removeAttr(e) : this.$$element.attr(e, b)), i && f(i[a], function (a) {
                    try {
                        a(b)
                    } catch (c) {
                        m(c)
                    }
                })
            }, $observe: function (a, b) {
                var c = this, d = c.$$observers || (c.$$observers = {}), e = d[a] || (d[a] = []);
                return e.push(b), v.$evalAsync(function () {
                    e.$$inter || b(c[a])
                }), b
            }};
            var Q = w[0].createElement("a"), R = i.startSymbol(), T = i.endSymbol(), U = "{{" == R || "}}" == T ? p : function (a) {
                return a.replace(/\{\{/g, R).replace(/}}/g, T)
            }, V = /^ngAttr[A-Z]/;
            return z
        }]
    }

    function Gb(a) {
        return eb(a.replace(yd, ""))
    }

    function Hb() {
        var a = {}, b = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function (b, c) {
            t(b) ? l(a, b) : a[b] = c
        }, this.$get = ["$injector", "$window", function (c, d) {
            return function (e, f) {
                var g, h, i, j;
                if (u(e) && (h = e.match(b), i = h[1], j = h[3], e = a.hasOwnProperty(i) ? a[i] : ac(f.$scope, i, !0) || ac(d, i, !0), ab(e, i, !0)), g = c.instantiate(e, f), j) {
                    if ("object" != typeof f.$scope)throw new Error('Can not export controller as "' + j + '". ' + "No scope object provided!");
                    f.$scope[j] = g
                }
                return g
            }
        }]
    }

    function Ib() {
        this.$get = ["$window", function (a) {
            return Xc(a.document)
        }]
    }

    function Jb() {
        this.$get = ["$log", function (a) {
            return function () {
                a.error.apply(a, arguments)
            }
        }]
    }

    function Kb() {
        var a = "{{", b = "}}";
        this.startSymbol = function (b) {
            return b ? (a = b, this) : a
        }, this.endSymbol = function (a) {
            return a ? (b = a, this) : b
        }, this.$get = ["$parse", "$exceptionHandler", function (d, e) {
            function f(f, i) {
                for (var j, k, l, m, n = 0, o = [], p = f.length, q = !1, r = []; p > n;)-1 != (j = f.indexOf(a, n)) && -1 != (k = f.indexOf(b, j + g)) ? (n != j && o.push(f.substring(n, j)), o.push(l = d(m = f.substring(j + g, k))), l.exp = m, n = k + h, q = !0) : (n != p && o.push(f.substring(n)), n = p);
                return(p = o.length) || (o.push(""), p = 1), !i || q ? (r.length = p, l = function (a) {
                    try {
                        for (var b, d = 0, g = p; g > d; d++)"function" == typeof(b = o[d]) && (b = b(a), null == b || b == c ? b = "" : "string" != typeof b && (b = P(b))), r[d] = b;
                        return r.join("")
                    } catch (h) {
                        var i = new Error("Error while interpolating: " + f + "\n" + h.toString());
                        e(i)
                    }
                }, l.exp = f, l.parts = o, l) : void 0
            }

            var g = a.length, h = b.length;
            return f.startSymbol = function () {
                return a
            }, f.endSymbol = function () {
                return b
            }, f
        }]
    }

    function Lb(a) {
        for (var b = a.split("/"), c = b.length; c--;)b[c] = V(b[c]);
        return b.join("/")
    }

    function Mb(a, b) {
        var c = zd.exec(a);
        b.$$protocol = c[1], b.$$host = c[3], b.$$port = m(c[5]) || Bd[c[1]] || null
    }

    function Nb(a, b) {
        var c = Ad.exec(a);
        b.$$path = decodeURIComponent(c[1]), b.$$search = T(c[3]), b.$$hash = decodeURIComponent(c[5] || ""), b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path)
    }

    function Ob(a, b, c) {
        return 0 == b.indexOf(a) ? b.substr(a.length) : c
    }

    function Pb(a) {
        var b = a.indexOf("#");
        return-1 == b ? a : a.substr(0, b)
    }

    function Qb(a) {
        return a.substr(0, Pb(a).lastIndexOf("/") + 1)
    }

    function Rb(a) {
        return a.substring(0, a.indexOf("/", a.indexOf("//") + 2))
    }

    function Sb(a, b) {
        b = b || "";
        var d = Qb(a);
        this.$$parse = function (a) {
            var b = {};
            Mb(a, b);
            var c = Ob(d, a);
            if (!u(c))throw Error('Invalid url "' + a + '", missing path prefix "' + d + '".');
            Nb(c, b), l(this, b), this.$$path || (this.$$path = "/"), this.$$compose()
        }, this.$$compose = function () {
            var a = U(this.$$search), b = this.$$hash ? "#" + V(this.$$hash) : "";
            this.$$url = Lb(this.$$path) + (a ? "?" + a : "") + b, this.$$absUrl = d + this.$$url.substr(1)
        }, this.$$rewrite = function (e) {
            var f, g;
            return(f = Ob(a, e)) !== c ? (g = f, (f = Ob(b, f)) !== c ? d + (Ob("/", f) || f) : a + g) : (f = Ob(d, e)) !== c ? d + f : d == e + "/" ? d : void 0
        }
    }

    function Tb(a, b) {
        var c = Qb(a);
        this.$$parse = function (d) {
            Mb(d, this);
            var e = Ob(a, d) || Ob(c, d);
            if (!u(e))throw new Error('Invalid url "' + d + '", does not start with "' + a + '".');
            var f = "#" == e.charAt(0) ? Ob(b, e) : e;
            if (!u(f))throw new Error('Invalid url "' + d + '", missing hash prefix "' + b + '".');
            Nb(f, this), this.$$compose()
        }, this.$$compose = function () {
            var c = U(this.$$search), d = this.$$hash ? "#" + V(this.$$hash) : "";
            this.$$url = Lb(this.$$path) + (c ? "?" + c : "") + d, this.$$absUrl = a + (this.$$url ? b + this.$$url : "")
        }, this.$$rewrite = function (b) {
            return Pb(a) == Pb(b) ? b : void 0
        }
    }

    function Ub(a, b) {
        Tb.apply(this, arguments);
        var c = Qb(a);
        this.$$rewrite = function (d) {
            var e;
            return a == Pb(d) ? d : (e = Ob(c, d)) ? a + b + e : c === d + "/" ? c : void 0
        }
    }

    function Vb(a) {
        return function () {
            return this[a]
        }
    }

    function Wb(a, b) {
        return function (c) {
            return r(c) ? this[a] : (this[a] = b(c), this.$$compose(), this)
        }
    }

    function Xb() {
        var b = "", c = !1;
        this.hashPrefix = function (a) {
            return s(a) ? (b = a, this) : b
        }, this.html5Mode = function (a) {
            return s(a) ? (c = a, this) : c
        }, this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function (d, e, f, g) {
            function h(a) {
                d.$broadcast("$locationChangeSuccess", i.absUrl(), a)
            }

            var i, j, k, l = e.baseHref(), m = e.url();
            c ? (k = l ? Rb(m) + l : m, j = f.history ? Sb : Ub) : (k = Pb(m), j = Tb), i = new j(k, "#" + b), i.$$parse(i.$$rewrite(m)), g.bind("click", function (b) {
                if (!b.ctrlKey && !b.metaKey && 2 != b.which) {
                    for (var c = Xc(b.target); "a" !== Tc(c[0].nodeName);)if (c[0] === g[0] || !(c = c.parent())[0])return;
                    var f = c.prop("href"), h = i.$$rewrite(f);
                    f && !c.attr("target") && h && !b.isDefaultPrevented() && (b.preventDefault(), h != e.url() && (i.$$parse(h), d.$apply(), a.angular["ff-684208-preventDefault"] = !0))
                }
            }), i.absUrl() != m && e.url(i.absUrl(), !0), e.onUrlChange(function (a) {
                if (i.absUrl() != a) {
                    if (d.$broadcast("$locationChangeStart", a, i.absUrl()).defaultPrevented)return e.url(i.absUrl()), void 0;
                    d.$evalAsync(function () {
                        var b = i.absUrl();
                        i.$$parse(a), h(b)
                    }), d.$$phase || d.$digest()
                }
            });
            var n = 0;
            return d.$watch(function () {
                var a = e.url(), b = i.$$replace;
                return n && a == i.absUrl() || (n++, d.$evalAsync(function () {
                    d.$broadcast("$locationChangeStart", i.absUrl(), a).defaultPrevented ? i.$$parse(a) : (e.url(i.absUrl(), b), h(a))
                })), i.$$replace = !1, n
            }), i
        }]
    }

    function Yb() {
        var a = !0, b = this;
        this.debugEnabled = function (b) {
            return s(b) ? (a = b, this) : a
        }, this.$get = ["$window", function (c) {
            function d(a) {
                return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)), a
            }

            function e(a) {
                var b = c.console || {}, e = b[a] || b.log || o;
                return e.apply ? function () {
                    var a = [];
                    return f(arguments, function (b) {
                        a.push(d(b))
                    }), e.apply(b, a)
                } : function (a, b) {
                    e(a, b)
                }
            }

            return{log: e("log"), warn: e("warn"), info: e("info"), error: e("error"), debug: function () {
                var c = e("debug");
                return function () {
                    a && c.apply(b, arguments)
                }
            }()}
        }]
    }

    function Zb(a, b) {
        function c(a) {
            return-1 != a.indexOf(p)
        }

        function d(a) {
            return-1 != a.indexOf(u)
        }

        function e(b) {
            var c = b || 1;
            return r + c < a.length ? a.charAt(r + c) : !1
        }

        function f(a) {
            return a >= "0" && "9" >= a
        }

        function g(a) {
            return" " == a || "\r" == a || "	" == a || "\n" == a || "" == a || " " == a
        }

        function h(a) {
            return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" == a || "$" == a
        }

        function i(a) {
            return"-" == a || "+" == a || f(a)
        }

        function j(b, c, d) {
            throw d = d || r, Error("Lexer Error: " + b + " at column" + (s(c) ? "s " + c + "-" + r + " [" + a.substring(c, d) + "]" : " " + d) + " in expression [" + a + "].")
        }

        function k() {
            for (var b = "", c = r; r < a.length;) {
                var d = Tc(a.charAt(r));
                if ("." == d || f(d))b += d; else {
                    var g = e();
                    if ("e" == d && i(g))b += d; else if (i(d) && g && f(g) && "e" == b.charAt(b.length - 1))b += d; else {
                        if (!i(d) || g && f(g) || "e" != b.charAt(b.length - 1))break;
                        j("Invalid exponent")
                    }
                }
                r++
            }
            b = 1 * b, q.push({index: c, text: b, json: !0, fn: function () {
                return b
            }})
        }

        function m() {
            for (var c, d, e, i, j = "", k = r; r < a.length && (i = a.charAt(r), "." == i || h(i) || f(i));)"." == i && (c = r), j += i, r++;
            if (c)for (d = r; d < a.length;) {
                if (i = a.charAt(d), "(" == i) {
                    e = j.substr(c - k + 1), j = j.substr(0, c - k), r = d;
                    break
                }
                if (!g(i))break;
                d++
            }
            var m = {index: k, text: j};
            if (Cd.hasOwnProperty(j))m.fn = m.json = Cd[j]; else {
                var n = cc(j, b);
                m.fn = l(function (a, b) {
                    return n(a, b)
                }, {assign: function (a, b) {
                    return _b(a, j, b)
                }})
            }
            q.push(m), e && (q.push({index: c, text: ".", json: !1}), q.push({index: c + 1, text: e, json: !1}))
        }

        function n(b) {
            var c = r;
            r++;
            for (var d = "", e = b, f = !1; r < a.length;) {
                var g = a.charAt(r);
                if (e += g, f) {
                    if ("u" == g) {
                        var h = a.substring(r + 1, r + 5);
                        h.match(/[\da-f]{4}/i) || j("Invalid unicode escape [\\u" + h + "]"), r += 4, d += String.fromCharCode(parseInt(h, 16))
                    } else {
                        var i = Dd[g];
                        d += i ? i : g
                    }
                    f = !1
                } else if ("\\" == g)f = !0; else {
                    if (g == b)return r++, q.push({index: c, text: e, string: d, json: !0, fn: function () {
                        return d
                    }}), void 0;
                    d += g
                }
                r++
            }
            j("Unterminated quote", c)
        }

        for (var o, p, q = [], r = 0, t = [], u = ":"; r < a.length;) {
            if (p = a.charAt(r), c("\"'"))n(p); else if (f(p) || c(".") && f(e()))k(); else if (h(p))m(), d("{,") && "{" == t[0] && (o = q[q.length - 1]) && (o.json = -1 == o.text.indexOf(".")); else if (c("(){}[].,;:?"))q.push({index: r, text: p, json: d(":[,") && c("{[") || c("}]:,")}), c("{[") && t.unshift(p), c("}]") && t.shift(), r++; else {
                if (g(p)) {
                    r++;
                    continue
                }
                var v = p + e(), w = v + e(2), x = Cd[p], y = Cd[v], z = Cd[w];
                z ? (q.push({index: r, text: w, fn: z}), r += 3) : y ? (q.push({index: r, text: v, fn: y}), r += 2) : x ? (q.push({index: r, text: p, fn: x, json: d("[,:") && c("+-")}), r += 1) : j("Unexpected next character ", r, r + 1)
            }
            u = p
        }
        return q
    }

    function $b(a, b, d, e) {
        function f(b, c) {
            throw Error("Syntax Error: Token '" + c.text + "' " + b + " at column " + (c.index + 1) + " of the expression [" + a + "] starting at [" + a.substring(c.index) + "].")
        }

        function g() {
            if (0 === L.length)throw Error("Unexpected end of expression: " + a);
            return L[0]
        }

        function h(a, b, c, d) {
            if (L.length > 0) {
                var e = L[0], f = e.text;
                if (f == a || f == b || f == c || f == d || !a && !b && !c && !d)return e
            }
            return!1
        }

        function i(a, c, d, e) {
            var g = h(a, c, d, e);
            return g ? (b && !g.json && f("is not valid json", g), L.shift(), g) : !1
        }

        function j(a) {
            i(a) || f("is unexpected, expecting [" + a + "]", h())
        }

        function k(a, b) {
            return l(function (c, d) {
                return a(c, d, b)
            }, {constant: b.constant})
        }

        function m(a, b, c) {
            return l(function (d, e) {
                return a(d, e) ? b(d, e) : c(d, e)
            }, {constant: a.constant && b.constant && c.constant})
        }

        function n(a, b, c) {
            return l(function (d, e) {
                return b(d, e, a, c)
            }, {constant: a.constant && c.constant})
        }

        function p() {
            for (var a = []; ;)if (L.length > 0 && !h("}", ")", ";", "]") && a.push(Q()), !i(";"))return 1 == a.length ? a[0] : function (b, c) {
                for (var d, e = 0; e < a.length; e++) {
                    var f = a[e];
                    f && (d = f(b, c))
                }
                return d
            }
        }

        function r() {
            for (var a, b = t(); ;) {
                if (!(a = i("|")))return b;
                b = n(b, a.fn, s())
            }
        }

        function s() {
            for (var a = i(), b = d(a.text), c = []; ;) {
                if (!(a = i(":"))) {
                    var e = function (a, d, e) {
                        for (var f = [e], g = 0; g < c.length; g++)f.push(c[g](a, d));
                        return b.apply(a, f)
                    };
                    return function () {
                        return e
                    }
                }
                c.push(t())
            }
        }

        function t() {
            return M()
        }

        function u() {
            var b, c, d = v();
            return(c = i("=")) ? (d.assign || f("implies assignment but [" + a.substring(0, c.index) + "] can not be assigned to", c), b = v(), function (a, c) {
                return d.assign(a, b(a, c), c)
            }) : d
        }

        function v() {
            var a, b, c = w();
            return(b = i("?")) ? (a = v(), (b = i(":")) ? m(c, a, v()) : (f("expected :", b), void 0)) : c
        }

        function w() {
            for (var a, b = x(); ;) {
                if (!(a = i("||")))return b;
                b = n(b, a.fn, x())
            }
        }

        function x() {
            var a, b = y();
            return(a = i("&&")) && (b = n(b, a.fn, x())), b
        }

        function y() {
            var a, b = z();
            return(a = i("==", "!=", "===", "!==")) && (b = n(b, a.fn, y())), b
        }

        function z() {
            var a, b = A();
            return(a = i("<", ">", "<=", ">=")) && (b = n(b, a.fn, z())), b
        }

        function A() {
            for (var a, b = B(); a = i("+", "-");)b = n(b, a.fn, B());
            return b
        }

        function B() {
            for (var a, b = C(); a = i("*", "/", "%");)b = n(b, a.fn, C());
            return b
        }

        function C() {
            var a;
            return i("+") ? D() : (a = i("-")) ? n(K, a.fn, C()) : (a = i("!")) ? k(a.fn, C()) : D()
        }

        function D() {
            var a;
            if (i("("))a = Q(), j(")"); else if (i("["))a = H(); else if (i("{"))a = I(); else {
                var b = i();
                a = b.fn, a || f("not a primary expression", b), b.json && (a.constant = a.literal = !0)
            }
            for (var c, d; c = i("(", "[", ".");)"(" === c.text ? (a = N(a, d), d = null) : "[" === c.text ? (d = a, a = P(a)) : "." === c.text ? (d = a, a = O(a)) : f("IMPOSSIBLE");
            return a
        }

        function E(a) {
            var b = i().text, c = cc(b, e);
            return l(function (b, d, e) {
                return c(e || a(b, d), d)
            }, {assign: function (c, d, e) {
                return _b(a(c, e), b, d)
            }})
        }

        function F(a) {
            var b = t();
            return j("]"), l(function (d, e) {
                var f, g, h = a(d, e), i = b(d, e);
                return h ? (f = h[i], f && f.then && (g = f, "$$v"in f || (g.$$v = c, g.then(function (a) {
                    g.$$v = a
                })), f = f.$$v), f) : c
            }, {assign: function (c, d, e) {
                return a(c, e)[b(c, e)] = d
            }})
        }

        function G(a, b) {
            var c = [];
            if (")" != g().text)do c.push(t()); while (i(","));
            return j(")"), function (d, e) {
                for (var f = [], g = b ? b(d, e) : d, h = 0; h < c.length; h++)f.push(c[h](d, e));
                var i = a(d, e, g) || o;
                return i.apply ? i.apply(g, f) : i(f[0], f[1], f[2], f[3], f[4])
            }
        }

        function H() {
            var a = [], b = !0;
            if ("]" != g().text)do {
                var c = t();
                a.push(c), c.constant || (b = !1)
            } while (i(","));
            return j("]"), l(function (b, c) {
                for (var d = [], e = 0; e < a.length; e++)d.push(a[e](b, c));
                return d
            }, {literal: !0, constant: b})
        }

        function I() {
            var a = [], b = !0;
            if ("}" != g().text)do {
                var c = i(), d = c.string || c.text;
                j(":");
                var e = t();
                a.push({key: d, value: e}), e.constant || (b = !1)
            } while (i(","));
            return j("}"), l(function (b, c) {
                for (var d = {}, e = 0; e < a.length; e++) {
                    var f = a[e];
                    d[f.key] = f.value(b, c)
                }
                return d
            }, {literal: !0, constant: b})
        }

        var J, K = q(0), L = Zb(a, e), M = u, N = G, O = E, P = F, Q = r;
        return b ? (M = w, N = O = P = Q = function () {
            f("is not valid json", {text: a, index: 0})
        }, J = D()) : J = p(), 0 !== L.length && f("is an unexpected token", L[0]), J.literal = !!J.literal, J.constant = !!J.constant, J
    }

    function _b(a, b, c) {
        for (var d = b.split("."), e = 0; d.length > 1; e++) {
            var f = d.shift(), g = a[f];
            g || (g = {}, a[f] = g), a = g
        }
        return a[d.shift()] = c, c
    }

    function ac(a, b, c) {
        if (!b)return a;
        for (var d, e = b.split("."), f = a, g = e.length, h = 0; g > h; h++)d = e[h], a && (a = (f = a)[d]);
        return!c && y(a) ? N(f, a) : a
    }

    function bc(a, b, d, e, f) {
        return function (g, h) {
            var i, j = h && h.hasOwnProperty(a) ? h : g;
            return null === j || j === c ? j : (j = j[a], j && j.then && ("$$v"in j || (i = j, i.$$v = c, i.then(function (a) {
                i.$$v = a
            })), j = j.$$v), b && null !== j && j !== c ? (j = j[b], j && j.then && ("$$v"in j || (i = j, i.$$v = c, i.then(function (a) {
                i.$$v = a
            })), j = j.$$v), d && null !== j && j !== c ? (j = j[d], j && j.then && ("$$v"in j || (i = j, i.$$v = c, i.then(function (a) {
                i.$$v = a
            })), j = j.$$v), e && null !== j && j !== c ? (j = j[e], j && j.then && ("$$v"in j || (i = j, i.$$v = c, i.then(function (a) {
                i.$$v = a
            })), j = j.$$v), f && null !== j && j !== c ? (j = j[f], j && j.then && ("$$v"in j || (i = j, i.$$v = c, i.then(function (a) {
                i.$$v = a
            })), j = j.$$v), j) : j) : j) : j) : j)
        }
    }

    function cc(a, b) {
        if (Ed.hasOwnProperty(a))return Ed[a];
        var d, e = a.split("."), g = e.length;
        if (b)d = 6 > g ? bc(e[0], e[1], e[2], e[3], e[4]) : function (a, b) {
            var d, f = 0;
            do d = bc(e[f++], e[f++], e[f++], e[f++], e[f++])(a, b), b = c, a = d; while (g > f);
            return d
        }; else {
            var h = "var l, fn, p;\n";
            f(e, function (a, b) {
                h += "if(s === null || s === undefined) return s;\nl=s;\ns=" + (b ? "s" : '((k&&k.hasOwnProperty("' + a + '"))?k:s)') + '["' + a + '"]' + ";\n" + "if (s && s.then) {\n" + ' if (!("$$v" in s)) {\n' + " p=s;\n" + " p.$$v = undefined;\n" + " p.then(function(v) {p.$$v=v;});\n" + "}\n" + " s=s.$$v\n" + "}\n"
            }), h += "return s;", d = Function("s", "k", h), d.toString = function () {
                return h
            }
        }
        return Ed[a] = d
    }

    function dc() {
        var a = {};
        this.$get = ["$filter", "$sniffer", function (b, c) {
            return function (d) {
                switch (typeof d) {
                    case"string":
                        return a.hasOwnProperty(d) ? a[d] : a[d] = $b(d, !1, b, c.csp);
                    case"function":
                        return d;
                    default:
                        return o
                }
            }
        }]
    }

    function ec() {
        this.$get = ["$rootScope", "$exceptionHandler", function (a, b) {
            return fc(function (b) {
                a.$evalAsync(b)
            }, b)
        }]
    }

    function fc(a, b) {
        function d(a) {
            return a
        }

        function e(a) {
            return j(a)
        }

        function g(a) {
            var b = h(), c = 0, d = x(a) ? [] : {};
            return f(a, function (a, e) {
                c++, i(a).then(function (a) {
                    d.hasOwnProperty(e) || (d[e] = a, --c || b.resolve(d))
                }, function (a) {
                    d.hasOwnProperty(e) || b.reject(a)
                })
            }), 0 === c && b.resolve(d), b.promise
        }

        var h = function () {
            var f, g, k = [];
            return g = {resolve: function (b) {
                if (k) {
                    var d = k;
                    k = c, f = i(b), d.length && a(function () {
                        for (var a, b = 0, c = d.length; c > b; b++)a = d[b], f.then(a[0], a[1])
                    })
                }
            }, reject: function (a) {
                g.resolve(j(a))
            }, promise: {then: function (a, c) {
                var g = h(), i = function (c) {
                    try {
                        g.resolve((a || d)(c))
                    } catch (e) {
                        b(e), g.reject(e)
                    }
                }, j = function (a) {
                    try {
                        g.resolve((c || e)(a))
                    } catch (d) {
                        b(d), g.reject(d)
                    }
                };
                return k ? k.push([i, j]) : f.then(i, j), g.promise
            }, always: function (a) {
                function b(a, b) {
                    var c = h();
                    return b ? c.resolve(a) : c.reject(a), c.promise
                }

                function c(c, e) {
                    var f = null;
                    try {
                        f = (a || d)()
                    } catch (g) {
                        return b(g, !1)
                    }
                    return f && f.then ? f.then(function () {
                        return b(c, e)
                    }, function (a) {
                        return b(a, !1)
                    }) : b(c, e)
                }

                return this.then(function (a) {
                    return c(a, !0)
                }, function (a) {
                    return c(a, !1)
                })
            }}}
        }, i = function (b) {
            return b && b.then ? b : {then: function (c) {
                var d = h();
                return a(function () {
                    d.resolve(c(b))
                }), d.promise
            }}
        }, j = function (b) {
            return{then: function (c, d) {
                var f = h();
                return a(function () {
                    f.resolve((d || e)(b))
                }), f.promise
            }}
        }, k = function (c, f, g) {
            var k, l = h(), m = function (a) {
                try {
                    return(f || d)(a)
                } catch (c) {
                    return b(c), j(c)
                }
            }, n = function (a) {
                try {
                    return(g || e)(a)
                } catch (c) {
                    return b(c), j(c)
                }
            };
            return a(function () {
                i(c).then(function (a) {
                    k || (k = !0, l.resolve(i(a).then(m, n)))
                }, function (a) {
                    k || (k = !0, l.resolve(n(a)))
                })
            }), l.promise
        };
        return{defer: h, reject: j, when: k, all: g}
    }

    function gc() {
        var a = {};
        this.when = function (b, c) {
            if (a[b] = l({reloadOnSearch: !0, caseInsensitiveMatch: !1}, c), b) {
                var d = "/" == b[b.length - 1] ? b.substr(0, b.length - 1) : b + "/";
                a[d] = {redirectTo: b}
            }
            return this
        }, this.otherwise = function (a) {
            return this.when(null, a), this
        }, this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", function (b, c, d, e, g, h, i) {
            function j(a, b, c) {
                b = "^" + b.replace(/[-\/\\^$:*+?.()|[\]{}]/g, "\\$&") + "$";
                for (var d, e = "", g = [], h = {}, i = /\\([:*])(\w+)/g, j = 0; null !== (d = i.exec(b));) {
                    switch (e += b.slice(j, d.index), d[1]) {
                        case":":
                            e += "([^\\/]*)";
                            break;
                        case"*":
                            e += "(.*)"
                    }
                    g.push(d[2]), j = i.lastIndex
                }
                e += b.substr(j);
                var k = a.match(new RegExp(e, c.caseInsensitiveMatch ? "i" : ""));
                return k && f(g, function (a, b) {
                    h[a] = k[b + 1]
                }), k ? h : null
            }

            function k() {
                var a = m(), j = q.current;
                a && j && a.$$route === j.$$route && K(a.pathParams, j.pathParams) && !a.reloadOnSearch && !p ? (j.params = a.params, I(j.params, d), b.$broadcast("$routeUpdate", j)) : (a || j) && (p = !1, b.$broadcast("$routeChangeStart", a, j), q.current = a, a && a.redirectTo && (u(a.redirectTo) ? c.path(o(a.redirectTo, a.params)).search(a.params).replace() : c.url(a.redirectTo(a.pathParams, c.path(), c.search())).replace()), e.when(a).then(function () {
                    if (a) {
                        var b, c = l({}, a.resolve);
                        return f(c, function (a, b) {
                            c[b] = u(a) ? g.get(a) : g.invoke(a)
                        }), s(b = a.template) ? y(b) && (b = b(a.params)) : s(b = a.templateUrl) && (y(b) && (b = b(a.params)), s(b) && (a.loadedTemplateUrl = b, b = h.get(b, {cache: i}).then(function (a) {
                            return a.data
                        }))), s(b) && (c.$template = b), e.all(c)
                    }
                }).then(function (c) {
                    a == q.current && (a && (a.locals = c, I(a.params, d)), b.$broadcast("$routeChangeSuccess", a, j))
                }, function (c) {
                    a == q.current && b.$broadcast("$routeChangeError", a, j, c)
                }))
            }

            function m() {
                var b, d;
                return f(a, function (a, e) {
                    !d && (b = j(c.path(), e, a)) && (d = n(a, {params: l({}, c.search(), b), pathParams: b}), d.$$route = a)
                }), d || a[null] && n(a[null], {params: {}, pathParams: {}})
            }

            function o(a, b) {
                var c = [];
                return f((a || "").split(":"), function (a, d) {
                    if (0 == d)c.push(a); else {
                        var e = a.match(/(\w+)(.*)/), f = e[1];
                        c.push(b[f]), c.push(e[2] || ""), delete b[f]
                    }
                }), c.join("")
            }

            var p = !1, q = {routes: a, reload: function () {
                p = !0, b.$evalAsync(k)
            }};
            return b.$on("$locationChangeSuccess", k), q
        }]
    }

    function hc() {
        this.$get = q({})
    }

    function ic() {
        var a = 10;
        this.digestTtl = function (b) {
            return arguments.length && (a = b), a
        }, this.$get = ["$injector", "$exceptionHandler", "$parse", function (b, c, d) {
            function f() {
                this.$id = j(), this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null, this["this"] = this.$root = this, this.$$destroyed = !1, this.$$asyncQueue = [], this.$$listeners = {}, this.$$isolateBindings = {}
            }

            function g(a) {
                if (l.$$phase)throw Error(l.$$phase + " already in progress");
                l.$$phase = a
            }

            function h() {
                l.$$phase = null
            }

            function i(a, b) {
                var c = d(a);
                return ab(c, b), c
            }

            function k() {
            }

            f.prototype = {$new: function (a) {
                var b, c;
                if (y(a))throw Error("API-CHANGE: Use $controller to instantiate controllers.");
                return a ? (c = new f, c.$root = this.$root) : (b = function () {
                }, b.prototype = this, c = new b, c.$id = j()), c["this"] = c, c.$$listeners = {}, c.$parent = this, c.$$watchers = c.$$nextSibling = c.$$childHead = c.$$childTail = null, c.$$prevSibling = this.$$childTail, this.$$childHead ? (this.$$childTail.$$nextSibling = c, this.$$childTail = c) : this.$$childHead = this.$$childTail = c, c
            }, $watch: function (a, b, c) {
                var d = this, e = i(a, "watch"), f = d.$$watchers, g = {fn: b, last: k, get: e, exp: a, eq: !!c};
                if (!y(b)) {
                    var h = i(b || o, "listener");
                    g.fn = function (a, b, c) {
                        h(c)
                    }
                }
                if ("string" == typeof a && e.constant) {
                    var j = g.fn;
                    g.fn = function (a, b, c) {
                        j.call(this, a, b, c), H(f, g)
                    }
                }
                return f || (f = d.$$watchers = []), f.unshift(g), function () {
                    H(f, g)
                }
            }, $watchCollection: function (a, b) {
                function c() {
                    h = k(i);
                    var a, b;
                    if (t(h))if (e(h)) {
                        g !== l && (g = l, n = g.length = 0, j++), a = h.length, n !== a && (j++, g.length = n = a);
                        for (var c = 0; a > c; c++)g[c] !== h[c] && (j++, g[c] = h[c])
                    } else {
                        g !== m && (g = m = {}, n = 0, j++), a = 0;
                        for (b in h)h.hasOwnProperty(b) && (a++, g.hasOwnProperty(b) ? g[b] !== h[b] && (j++, g[b] = h[b]) : (n++, g[b] = h[b], j++));
                        if (n > a) {
                            j++;
                            for (b in g)g.hasOwnProperty(b) && !h.hasOwnProperty(b) && (n--, delete g[b])
                        }
                    } else g !== h && (g = h, j++);
                    return j
                }

                function f() {
                    b(h, g, i)
                }

                var g, h, i = this, j = 0, k = d(a), l = [], m = {}, n = 0;
                return this.$watch(c, f)
            }, $digest: function () {
                var b, d, e, f, i, j, l, m, n, o, p = this.$$asyncQueue, q = a, r = this, s = [];
                g("$digest");
                do {
                    for (j = !1, m = r; p.length;)try {
                        m.$eval(p.shift())
                    } catch (t) {
                        c(t)
                    }
                    do {
                        if (f = m.$$watchers)for (i = f.length; i--;)try {
                            b = f[i], (d = b.get(m)) === (e = b.last) || (b.eq ? K(d, e) : "number" == typeof d && "number" == typeof e && isNaN(d) && isNaN(e)) || (j = !0, b.last = b.eq ? I(d) : d, b.fn(d, e === k ? d : e, m), 5 > q && (n = 4 - q, s[n] || (s[n] = []), o = y(b.exp) ? "fn: " + (b.exp.name || b.exp.toString()) : b.exp, o += "; newVal: " + P(d) + "; oldVal: " + P(e), s[n].push(o)))
                        } catch (t) {
                            c(t)
                        }
                        if (!(l = m.$$childHead || m !== r && m.$$nextSibling))for (; m !== r && !(l = m.$$nextSibling);)m = m.$parent
                    } while (m = l);
                    if (j && !q--)throw h(), Error(a + " $digest() iterations reached. Aborting!\n" + "Watchers fired in the last 5 iterations: " + P(s))
                } while (j || p.length);
                h()
            }, $destroy: function () {
                if (l != this && !this.$$destroyed) {
                    var a = this.$parent;
                    this.$broadcast("$destroy"), this.$$destroyed = !0, a.$$childHead == this && (a.$$childHead = this.$$nextSibling), a.$$childTail == this && (a.$$childTail = this.$$prevSibling), this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling), this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling), this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null
                }
            }, $eval: function (a, b) {
                return d(a)(this, b)
            }, $evalAsync: function (a) {
                this.$$asyncQueue.push(a)
            }, $apply: function (a) {
                try {
                    return g("$apply"), this.$eval(a)
                } catch (b) {
                    c(b)
                } finally {
                    h();
                    try {
                        l.$digest()
                    } catch (b) {
                        throw c(b), b
                    }
                }
            }, $on: function (a, b) {
                var c = this.$$listeners[a];
                return c || (this.$$listeners[a] = c = []), c.push(b), function () {
                    c[G(c, b)] = null
                }
            }, $emit: function (a) {
                var b, d, e, f = [], g = this, h = !1, i = {name: a, targetScope: g, stopPropagation: function () {
                    h = !0
                }, preventDefault: function () {
                    i.defaultPrevented = !0
                }, defaultPrevented: !1}, j = L([i], arguments, 1);
                do {
                    for (b = g.$$listeners[a] || f, i.currentScope = g, d = 0, e = b.length; e > d; d++)if (b[d])try {
                        if (b[d].apply(null, j), h)return i
                    } catch (k) {
                        c(k)
                    } else b.splice(d, 1), d--, e--;
                    g = g.$parent
                } while (g);
                return i
            }, $broadcast: function (a) {
                var b, d, e, f = this, g = f, h = f, i = {name: a, targetScope: f, preventDefault: function () {
                    i.defaultPrevented = !0
                }, defaultPrevented: !1}, j = L([i], arguments, 1);
                do {
                    for (g = h, i.currentScope = g, b = g.$$listeners[a] || [], d = 0, e = b.length; e > d; d++)if (b[d])try {
                        b[d].apply(null, j)
                    } catch (k) {
                        c(k)
                    } else b.splice(d, 1), d--, e--;
                    if (!(h = g.$$childHead || g !== f && g.$$nextSibling))for (; g !== f && !(h = g.$$nextSibling);)g = g.$parent
                } while (g = h);
                return i
            }};
            var l = new f;
            return l
        }]
    }

    function jc() {
        this.$get = ["$window", "$document", function (a, b) {
            var c, d, e = {}, f = m((/android (\d+)/.exec(Tc((a.navigator || {}).userAgent)) || [])[1]), g = b[0] || {}, h = /^(Moz|webkit|O|ms)(?=[A-Z])/, i = g.body && g.body.style, j = !1, k = !1;
            if (i) {
                for (var l in i)if (d = h.exec(l)) {
                    c = d[0], c = c.substr(0, 1).toUpperCase() + c.substr(1);
                    break
                }
                j = !!("transition"in i || c + "Transition"in i), k = !!("animation"in i || c + "Animation"in i)
            }
            return{history: !(!a.history || !a.history.pushState || 4 > f), hashchange: "onhashchange"in a && (!g.documentMode || g.documentMode > 7), hasEvent: function (a) {
                if ("input" == a && 9 == _c)return!1;
                if (r(e[a])) {
                    var b = g.createElement("div");
                    e[a] = "on" + a in b
                }
                return e[a]
            }, csp: g.securityPolicy ? g.securityPolicy.isActive : !1, vendorPrefix: c, transitions: j, animations: k}
        }]
    }

    function kc() {
        this.$get = q(a)
    }

    function lc(a) {
        var b, c, d, e = {};
        return a ? (f(a.split("\n"), function (a) {
            d = a.indexOf(":"), b = Tc(C(a.substr(0, d))), c = C(a.substr(d + 1)), b && (e[b] ? e[b] += ", " + c : e[b] = c)
        }), e) : e
    }

    function mc(a, b) {
        var d = Fd.exec(a);
        if (null == d)return!0;
        var e = {protocol: d[2], host: d[4], port: m(d[6]) || Bd[d[2]] || null, relativeProtocol: d[2] === c || "" === d[2]};
        d = zd.exec(b);
        var f = {protocol: d[1], host: d[3], port: m(d[5]) || Bd[d[1]] || null};
        return(e.protocol == f.protocol || e.relativeProtocol) && e.host == f.host && (e.port == f.port || e.relativeProtocol && f.port == Bd[f.protocol])
    }

    function nc(a) {
        var b = t(a) ? a : c;
        return function (c) {
            return b || (b = lc(a)), c ? b[Tc(c)] || null : b
        }
    }

    function oc(a, b, c) {
        return y(c) ? c(a, b) : (f(c, function (c) {
            a = c(a, b)
        }), a)
    }

    function pc(a) {
        return a >= 200 && 300 > a
    }

    function qc() {
        var a = /^\s*(\[|\{[^\{])/, b = /[\}\]]\s*$/, d = /^\)\]\}',?\n/, e = {"Content-Type": "application/json;charset=utf-8"}, g = this.defaults = {transformResponse: [function (c) {
            return u(c) && (c = c.replace(d, ""), a.test(c) && b.test(c) && (c = Q(c, !0))), c
        }], transformRequest: [function (a) {
            return t(a) && !B(a) ? P(a) : a
        }], headers: {common: {Accept: "application/json, text/plain, */*"}, post: e, put: e, patch: e}, xsrfCookieName: "XSRF-TOKEN", xsrfHeaderName: "X-XSRF-TOKEN"}, i = this.interceptors = [], j = this.responseInterceptors = [];
        this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function (a, b, d, e, k, m) {
            function n(a) {
                function d(a) {
                    var b = l({}, a, {data: oc(a.data, a.headers, e.transformResponse)});
                    return pc(a.status) ? b : k.reject(b)
                }

                var e = {transformRequest: g.transformRequest, transformResponse: g.transformResponse}, h = {};
                l(e, a), e.headers = h, e.method = Uc(e.method), l(h, g.headers.common, g.headers[Tc(e.method)], a.headers);
                var i = mc(e.url, b.url()) ? b.cookies()[e.xsrfCookieName || g.xsrfCookieName] : c;
                i && (h[e.xsrfHeaderName || g.xsrfHeaderName] = i);
                var j = function (a) {
                    var b = oc(a.data, nc(h), a.transformRequest);
                    return r(a.data) && delete h["Content-Type"], r(a.withCredentials) && !r(g.withCredentials) && (a.withCredentials = g.withCredentials), q(a, b, h).then(d, d)
                }, m = [j, c], n = k.when(e);
                for (f(w, function (a) {
                    (a.request || a.requestError) && m.unshift(a.request, a.requestError), (a.response || a.responseError) && m.push(a.response, a.responseError)
                }); m.length;) {
                    var o = m.shift(), p = m.shift();
                    n = n.then(o, p)
                }
                return n.success = function (a) {
                    return n.then(function (b) {
                        a(b.data, b.status, b.headers, e)
                    }), n
                }, n.error = function (a) {
                    return n.then(null, function (b) {
                        a(b.data, b.status, b.headers, e)
                    }), n
                }, n
            }

            function o() {
                f(arguments, function (a) {
                    n[a] = function (b, c) {
                        return n(l(c || {}, {method: a, url: b}))
                    }
                })
            }

            function p() {
                f(arguments, function (a) {
                    n[a] = function (b, c, d) {
                        return n(l(d || {}, {method: a, url: b, data: c}))
                    }
                })
            }

            function q(b, c, d) {
                function f(a, b, c) {
                    j && (pc(a) ? j.put(p, [a, b, lc(c)]) : j.remove(p)), h(b, a, c), e.$$phase || e.$apply()
                }

                function h(a, c, d) {
                    c = Math.max(c, 0), (pc(c) ? m.resolve : m.reject)({data: a, status: c, headers: nc(d), config: b})
                }

                function i() {
                    var a = G(n.pendingRequests, b);
                    -1 !== a && n.pendingRequests.splice(a, 1)
                }

                var j, l, m = k.defer(), o = m.promise, p = s(b.url, b.params);
                if (n.pendingRequests.push(b), o.then(i, i), (b.cache || g.cache) && b.cache !== !1 && "GET" == b.method && (j = t(b.cache) ? b.cache : t(g.cache) ? g.cache : v), j)if (l = j.get(p)) {
                    if (l.then)return l.then(i, i), l;
                    x(l) ? h(l[1], l[0], I(l[2])) : h(l, 200, {})
                } else j.put(p, o);
                return l || a(b.method, p, c, f, d, b.timeout, b.withCredentials, b.responseType), o
            }

            function s(a, b) {
                if (!b)return a;
                var d = [];
                return h(b, function (a, b) {
                    null != a && a != c && (x(a) || (a = [a]), f(a, function (a) {
                        t(a) && (a = P(a)), d.push(W(b) + "=" + W(a))
                    }))
                }), a + (-1 == a.indexOf("?") ? "?" : "&") + d.join("&")
            }

            var v = d("$http"), w = [];
            return f(i, function (a) {
                w.unshift(u(a) ? m.get(a) : m.invoke(a))
            }), f(j, function (a, b) {
                var c = u(a) ? m.get(a) : m.invoke(a);
                w.splice(b, 0, {response: function (a) {
                    return c(k.when(a))
                }, responseError: function (a) {
                    return c(k.reject(a))
                }})
            }), n.pendingRequests = [], o("get", "delete", "head", "jsonp"), p("post", "put"), n.defaults = g, n
        }]
    }

    function rc() {
        this.$get = ["$browser", "$window", "$document", function (a, b, c) {
            return sc(a, Gd, a.defer, b.angular.callbacks, c[0], b.location.protocol.replace(":", ""))
        }]
    }

    function sc(a, b, c, d, e, g) {
        function h(a, b) {
            var c = e.createElement("script"), d = function () {
                e.body.removeChild(c), b && b()
            };
            return c.type = "text/javascript", c.src = a, _c ? c.onreadystatechange = function () {
                /loaded|complete/.test(c.readyState) && d()
            } : c.onload = c.onerror = d, e.body.appendChild(c), d
        }

        return function (e, i, j, k, l, m, n, p) {
            function q() {
                s = -1, u && u(), v && v.abort()
            }

            function r(b, d, e, f) {
                var h = (i.match(zd) || ["", g])[1];
                w && c.cancel(w), u = v = null, d = "file" == h ? e ? 200 : 404 : d, d = 1223 == d ? 204 : d, b(d, e, f), a.$$completeOutstandingRequest(o)
            }

            var s;
            if (a.$$incOutstandingRequestCount(), i = i || a.url(), "jsonp" == Tc(e)) {
                var t = "_" + (d.counter++).toString(36);
                d[t] = function (a) {
                    d[t].data = a
                };
                var u = h(i.replace("JSON_CALLBACK", "angular.callbacks." + t), function () {
                    d[t].data ? r(k, 200, d[t].data) : r(k, s || -2), delete d[t]
                })
            } else {
                var v = new b;
                v.open(e, i, !0), f(l, function (a, b) {
                    a && v.setRequestHeader(b, a)
                }), v.onreadystatechange = function () {
                    if (4 == v.readyState) {
                        var a = v.getAllResponseHeaders(), b = ["Cache-Control", "Content-Language", "Content-Type", "Expires", "Last-Modified", "Pragma"];
                        a || (a = "", f(b, function (b) {
                            var c = v.getResponseHeader(b);
                            c && (a += b + ": " + c + "\n")
                        })), r(k, s || v.status, v.responseType ? v.response : v.responseText, a)
                    }
                }, n && (v.withCredentials = !0), p && (v.responseType = p), v.send(j || "")
            }
            if (m > 0)var w = c(q, m); else m && m.then && m.then(q)
        }
    }

    function tc() {
        this.$get = function () {
            return{id: "en-us", NUMBER_FORMATS: {DECIMAL_SEP: ".", GROUP_SEP: ",", PATTERNS: [
                {minInt: 1, minFrac: 0, maxFrac: 3, posPre: "", posSuf: "", negPre: "-", negSuf: "", gSize: 3, lgSize: 3},
                {minInt: 1, minFrac: 2, maxFrac: 2, posPre: "¤", posSuf: "", negPre: "(¤", negSuf: ")", gSize: 3, lgSize: 3}
            ], CURRENCY_SYM: "$"}, DATETIME_FORMATS: {MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","), SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","), DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","), SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","), AMPMS: ["AM", "PM"], medium: "MMM d, y h:mm:ss a", "short": "M/d/yy h:mm a", fullDate: "EEEE, MMMM d, y", longDate: "MMMM d, y", mediumDate: "MMM d, y", shortDate: "M/d/yy", mediumTime: "h:mm:ss a", shortTime: "h:mm a"}, pluralCat: function (a) {
                return 1 === a ? "one" : "other"
            }}
        }
    }

    function uc() {
        this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function (a, b, c, d) {
            function e(e, g, h) {
                var i, j, k = c.defer(), l = k.promise, m = s(h) && !h;
                return i = b.defer(function () {
                    try {
                        k.resolve(e())
                    } catch (b) {
                        k.reject(b), d(b)
                    }
                    m || a.$apply()
                }, g), j = function () {
                    delete f[l.$$timeoutId]
                }, l.$$timeoutId = i, f[i] = k, l.then(j, j), l
            }

            var f = {};
            return e.cancel = function (a) {
                return a && a.$$timeoutId in f ? (f[a.$$timeoutId].reject("canceled"), b.defer.cancel(a.$$timeoutId)) : !1
            }, e
        }]
    }

    function vc(a) {
        function b(b, d) {
            return a.factory(b + c, d)
        }

        var c = "Filter";
        this.register = b, this.$get = ["$injector", function (a) {
            return function (b) {
                return a.get(b + c)
            }
        }], b("currency", xc), b("date", Fc), b("filter", wc), b("json", Gc), b("limitTo", Hc), b("lowercase", Ld), b("number", yc), b("orderBy", Ic), b("uppercase", Md)
    }

    function wc() {
        return function (a, b, c) {
            if (!x(a))return a;
            var d = [];
            switch (d.check = function (a) {
                for (var b = 0; b < d.length; b++)if (!d[b](a))return!1;
                return!0
            }, typeof c) {
                case"function":
                    break;
                case"boolean":
                    if (1 == c) {
                        c = function (a, b) {
                            return ed.equals(a, b)
                        };
                        break
                    }
                default:
                    c = function (a, b) {
                        return b = ("" + b).toLowerCase(), ("" + a).toLowerCase().indexOf(b) > -1
                    }
            }
            var e = function (a, b) {
                if ("string" == typeof b && "!" === b.charAt(0))return!e(a, b.substr(1));
                switch (typeof a) {
                    case"boolean":
                    case"number":
                    case"string":
                        return c(a, b);
                    case"object":
                        switch (typeof b) {
                            case"object":
                                return c(a, b);
                            default:
                                for (var d in a)if ("$" !== d.charAt(0) && e(a[d], b))return!0
                        }
                        return!1;
                    case"array":
                        for (var f = 0; f < a.length; f++)if (e(a[f], b))return!0;
                        return!1;
                    default:
                        return!1
                }
            };
            switch (typeof b) {
                case"boolean":
                case"number":
                case"string":
                    b = {$: b};
                case"object":
                    for (var f in b)"$" == f ? !function () {
                        if (b[f]) {
                            var a = f;
                            d.push(function (c) {
                                return e(c, b[a])
                            })
                        }
                    }() : !function () {
                        if (b[f]) {
                            var a = f;
                            d.push(function (c) {
                                return e(ac(c, a), b[a])
                            })
                        }
                    }();
                    break;
                case"function":
                    d.push(b);
                    break;
                default:
                    return a
            }
            for (var g = [], h = 0; h < a.length; h++) {
                var i = a[h];
                d.check(i) && g.push(i)
            }
            return g
        }
    }

    function xc(a) {
        var b = a.NUMBER_FORMATS;
        return function (a, c) {
            return r(c) && (c = b.CURRENCY_SYM), zc(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, 2).replace(/\u00A4/g, c)
        }
    }

    function yc(a) {
        var b = a.NUMBER_FORMATS;
        return function (a, c) {
            return zc(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c)
        }
    }

    function zc(a, b, c, d, e) {
        if (isNaN(a) || !isFinite(a))return"";
        var f = 0 > a;
        a = Math.abs(a);
        var g = a + "", h = "", i = [], j = !1;
        if (-1 !== g.indexOf("e")) {
            var k = g.match(/([\d\.]+)e(-?)(\d+)/);
            k && "-" == k[2] && k[3] > e + 1 ? g = "0" : (h = g, j = !0)
        }
        if (!j) {
            var l = (g.split(Hd)[1] || "").length;
            r(e) && (e = Math.min(Math.max(b.minFrac, l), b.maxFrac));
            var m = Math.pow(10, e);
            a = Math.round(a * m) / m;
            var n = ("" + a).split(Hd), o = n[0];
            n = n[1] || "";
            var p = 0, q = b.lgSize, s = b.gSize;
            if (o.length >= q + s) {
                p = o.length - q;
                for (var t = 0; p > t; t++)0 === (p - t) % s && 0 !== t && (h += c), h += o.charAt(t)
            }
            for (t = p; t < o.length; t++)0 === (o.length - t) % q && 0 !== t && (h += c), h += o.charAt(t);
            for (; n.length < e;)n += "0";
            e && "0" !== e && (h += d + n.substr(0, e))
        }
        return i.push(f ? b.negPre : b.posPre), i.push(h), i.push(f ? b.negSuf : b.posSuf), i.join("")
    }

    function Ac(a, b, c) {
        var d = "";
        for (0 > a && (d = "-", a = -a), a = "" + a; a.length < b;)a = "0" + a;
        return c && (a = a.substr(a.length - b)), d + a
    }

    function Bc(a, b, c, d) {
        return c = c || 0, function (e) {
            var f = e["get" + a]();
            return(c > 0 || f > -c) && (f += c), 0 === f && -12 == c && (f = 12), Ac(f, b, d)
        }
    }

    function Cc(a, b) {
        return function (c, d) {
            var e = c["get" + a](), f = Uc(b ? "SHORT" + a : a);
            return d[f][e]
        }
    }

    function Dc(a) {
        var b = -1 * a.getTimezoneOffset(), c = b >= 0 ? "+" : "";
        return c += Ac(Math[b > 0 ? "floor" : "ceil"](b / 60), 2) + Ac(Math.abs(b % 60), 2)
    }

    function Ec(a, b) {
        return a.getHours() < 12 ? b.AMPMS[0] : b.AMPMS[1]
    }

    function Fc(a) {
        function b(a) {
            var b;
            if (b = a.match(c)) {
                var d = new Date(0), e = 0, f = 0, g = b[8] ? d.setUTCFullYear : d.setFullYear, h = b[8] ? d.setUTCHours : d.setHours;
                b[9] && (e = m(b[9] + b[10]), f = m(b[9] + b[11])), g.call(d, m(b[1]), m(b[2]) - 1, m(b[3]));
                var i = m(b[4] || 0) - e, j = m(b[5] || 0) - f, k = m(b[6] || 0), l = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
                return h.call(d, i, j, k, l), d
            }
            return a
        }

        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function (c, d) {
            var e, g, h = "", i = [];
            if (d = d || "mediumDate", d = a.DATETIME_FORMATS[d] || d, u(c) && (c = Kd.test(c) ? m(c) : b(c)), v(c) && (c = new Date(c)), !w(c))return c;
            for (; d;)g = Jd.exec(d), g ? (i = L(i, g, 1), d = i.pop()) : (i.push(d), d = null);
            return f(i, function (b) {
                e = Id[b], h += e ? e(c, a.DATETIME_FORMATS) : b.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }), h
        }
    }

    function Gc() {
        return function (a) {
            return P(a, !0)
        }
    }

    function Hc() {
        return function (a, b) {
            if (!x(a) && !u(a))return a;
            if (b = m(b), u(a))return b ? b >= 0 ? a.slice(0, b) : a.slice(b, a.length) : "";
            var c, d, e = [];
            for (b > a.length ? b = a.length : b < -a.length && (b = -a.length), b > 0 ? (c = 0, d = b) : (c = a.length + b, d = a.length); d > c; c++)e.push(a[c]);
            return e
        }
    }

    function Ic(a) {
        return function (b, c, d) {
            function e(a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e)return e
                }
                return 0
            }

            function f(a, b) {
                return R(b) ? function (b, c) {
                    return a(c, b)
                } : a
            }

            function g(a, b) {
                var c = typeof a, d = typeof b;
                return c == d ? ("string" == c && (a = a.toLowerCase()), "string" == c && (b = b.toLowerCase()), a === b ? 0 : b > a ? -1 : 1) : d > c ? -1 : 1
            }

            if (!x(b))return b;
            if (!c)return b;
            c = x(c) ? c : [c], c = E(c, function (b) {
                var c = !1, d = b || p;
                return u(b) && (("+" == b.charAt(0) || "-" == b.charAt(0)) && (c = "-" == b.charAt(0), b = b.substring(1)), d = a(b)), f(function (a, b) {
                    return g(d(a), d(b))
                }, c)
            });
            for (var h = [], i = 0; i < b.length; i++)h.push(b[i]);
            return h.sort(f(e, d))
        }
    }

    function Jc(a) {
        return y(a) && (a = {link: a}), a.restrict = a.restrict || "AC", q(a)
    }

    function Kc(a, b) {
        function c(b, c) {
            c = c ? "-" + Z(c, "-") : "", a.removeClass((b ? Zd : Yd) + c).addClass((b ? Yd : Zd) + c)
        }

        var d = this, e = a.parent().controller("form") || Pd, g = 0, h = d.$error = {}, i = [];
        d.$name = b.name, d.$dirty = !1, d.$pristine = !0, d.$valid = !0, d.$invalid = !1, e.$addControl(d), a.addClass($d), c(!0), d.$addControl = function (a) {
            i.push(a), a.$name && !d.hasOwnProperty(a.$name) && (d[a.$name] = a)
        }, d.$removeControl = function (a) {
            a.$name && d[a.$name] === a && delete d[a.$name], f(h, function (b, c) {
                d.$setValidity(c, !0, a)
            }), H(i, a)
        }, d.$setValidity = function (a, b, f) {
            var i = h[a];
            if (b)i && (H(i, f), i.length || (g--, g || (c(b), d.$valid = !0, d.$invalid = !1), h[a] = !1, c(!0, a), e.$setValidity(a, !0, d))); else {
                if (g || c(b), i) {
                    if (F(i, f))return
                } else h[a] = i = [], g++, c(!1, a), e.$setValidity(a, !1, d);
                i.push(f), d.$valid = !1, d.$invalid = !0
            }
        }, d.$setDirty = function () {
            a.removeClass($d).addClass(_d), d.$dirty = !0, d.$pristine = !1, e.$setDirty()
        }, d.$setPristine = function () {
            a.removeClass(_d).addClass($d), d.$dirty = !1, d.$pristine = !0, f(i, function (a) {
                a.$setPristine()
            })
        }
    }

    function Lc(a) {
        return r(a) || "" === a || null === a || a !== a
    }

    function Mc(a, b, d, e, f, g) {
        var h = function () {
            var c = b.val();
            R(d.ngTrim || "T") && (c = C(c)), e.$viewValue !== c && a.$apply(function () {
                e.$setViewValue(c)
            })
        };
        if (f.hasEvent("input"))b.bind("input", h); else {
            var i, j = function () {
                i || (i = g.defer(function () {
                    h(), i = null
                }))
            };
            b.bind("keydown", function (a) {
                var b = a.keyCode;
                91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || j()
            }), b.bind("change", h), f.hasEvent("paste") && b.bind("paste cut", j)
        }
        e.$render = function () {
            b.val(Lc(e.$viewValue) ? "" : e.$viewValue)
        };
        var k, l, n = d.ngPattern, o = function (a, b) {
            return Lc(b) || a.test(b) ? (e.$setValidity("pattern", !0), b) : (e.$setValidity("pattern", !1), c)
        };
        if (n && (l = n.match(/^\/(.*)\/([gim]*)$/), l ? (n = new RegExp(l[1], l[2]), k = function (a) {
            return o(n, a)
        }) : k = function (b) {
            var c = a.$eval(n);
            if (!c || !c.test)throw new Error("Expected " + n + " to be a RegExp but was " + c);
            return o(c, b)
        }, e.$formatters.push(k), e.$parsers.push(k)), d.ngMinlength) {
            var p = m(d.ngMinlength), q = function (a) {
                return!Lc(a) && a.length < p ? (e.$setValidity("minlength", !1), c) : (e.$setValidity("minlength", !0), a)
            };
            e.$parsers.push(q), e.$formatters.push(q)
        }
        if (d.ngMaxlength) {
            var r = m(d.ngMaxlength), s = function (a) {
                return!Lc(a) && a.length > r ? (e.$setValidity("maxlength", !1), c) : (e.$setValidity("maxlength", !0), a)
            };
            e.$parsers.push(s), e.$formatters.push(s)
        }
    }

    function Nc(a, b, d, e, f, g) {
        if (Mc(a, b, d, e, f, g), e.$parsers.push(function (a) {
            var b = Lc(a);
            return b || Vd.test(a) ? (e.$setValidity("number", !0), "" === a ? null : b ? a : parseFloat(a)) : (e.$setValidity("number", !1), c)
        }), e.$formatters.push(function (a) {
            return Lc(a) ? "" : "" + a
        }), d.min) {
            var h = parseFloat(d.min), i = function (a) {
                return!Lc(a) && h > a ? (e.$setValidity("min", !1), c) : (e.$setValidity("min", !0), a)
            };
            e.$parsers.push(i), e.$formatters.push(i)
        }
        if (d.max) {
            var j = parseFloat(d.max), k = function (a) {
                return!Lc(a) && a > j ? (e.$setValidity("max", !1), c) : (e.$setValidity("max", !0), a)
            };
            e.$parsers.push(k), e.$formatters.push(k)
        }
        e.$formatters.push(function (a) {
            return Lc(a) || v(a) ? (e.$setValidity("number", !0), a) : (e.$setValidity("number", !1), c)
        })
    }

    function Oc(a, b, d, e, f, g) {
        Mc(a, b, d, e, f, g);
        var h = function (a) {
            return Lc(a) || Td.test(a) ? (e.$setValidity("url", !0), a) : (e.$setValidity("url", !1), c)
        };
        e.$formatters.push(h), e.$parsers.push(h)
    }

    function Pc(a, b, d, e, f, g) {
        Mc(a, b, d, e, f, g);
        var h = function (a) {
            return Lc(a) || Ud.test(a) ? (e.$setValidity("email", !0), a) : (e.$setValidity("email", !1), c)
        };
        e.$formatters.push(h), e.$parsers.push(h)
    }

    function Qc(a, b, c, d) {
        r(c.name) && b.attr("name", j()), b.bind("click", function () {
            b[0].checked && a.$apply(function () {
                d.$setViewValue(c.value)
            })
        }), d.$render = function () {
            var a = c.value;
            b[0].checked = a == d.$viewValue
        }, c.$observe("value", d.$render)
    }

    function Rc(a, b, c, d) {
        var e = c.ngTrueValue, f = c.ngFalseValue;
        u(e) || (e = !0), u(f) || (f = !1), b.bind("click", function () {
            a.$apply(function () {
                d.$setViewValue(b[0].checked)
            })
        }), d.$render = function () {
            b[0].checked = d.$viewValue
        }, d.$formatters.push(function (a) {
            return a === e
        }), d.$parsers.push(function (a) {
            return a ? e : f
        })
    }

    function Sc(a, b) {
        return a = "ngClass" + a, Jc(function (d, e, f) {
            function g(a) {
                (b === !0 || d.$index % 2 === b) && (j && !K(a, j) && h(j), i(a)), j = I(a)
            }

            function h(a) {
                t(a) && !x(a) && (a = E(a, function (a, b) {
                    return a ? b : void 0
                })), e.removeClass(x(a) ? a.join(" ") : a)
            }

            function i(a) {
                t(a) && !x(a) && (a = E(a, function (a, b) {
                    return a ? b : void 0
                })), a && e.addClass(x(a) ? a.join(" ") : a)
            }

            var j = c;
            d.$watch(f[a], g, !0), f.$observe("class", function () {
                var b = d.$eval(f[a]);
                g(b, b)
            }), "ngClass" !== a && d.$watch("$index", function (c, e) {
                var g = 1 & c;
                1 & g !== e && (g === b ? i(d.$eval(f[a])) : h(d.$eval(f[a])))
            })
        })
    }

    var Tc = function (a) {
        return u(a) ? a.toLowerCase() : a
    }, Uc = function (a) {
        return u(a) ? a.toUpperCase() : a
    }, Vc = function (a) {
        return u(a) ? a.replace(/[A-Z]/g, function (a) {
            return String.fromCharCode(32 | a.charCodeAt(0))
        }) : a
    }, Wc = function (a) {
        return u(a) ? a.replace(/[a-z]/g, function (a) {
            return String.fromCharCode(-33 & a.charCodeAt(0))
        }) : a
    };
    "i" !== "I".toLowerCase() && (Tc = Vc, Uc = Wc);
    var Xc, Yc, Zc, $c, _c = m((/msie (\d+)/.exec(Tc(navigator.userAgent)) || [])[1]), ad = [].slice, bd = [].push, cd = Object.prototype.toString, dd = a.angular, ed = a.angular || (a.angular = {}), fd = ["0", "0", "0"];
    o.$inject = [], p.$inject = [], $c = 9 > _c ? function (a) {
        return a = a.nodeName ? a : a[0], a.scopeName && "HTML" != a.scopeName ? Uc(a.scopeName + ":" + a.nodeName) : a.nodeName
    } : function (a) {
        return a.nodeName ? a.nodeName : a[0].nodeName
    };
    var gd = /[A-Z]/g, hd = {full: "1.1.5", major: 1, minor: 1, dot: 5, codeName: "triangle-squarification"}, id = gb.cache = {}, jd = gb.expando = "ng-" + (new Date).getTime(), kd = 1, ld = a.document.addEventListener ? function (a, b, c) {
        a.addEventListener(b, c, !1)
    } : function (a, b, c) {
        a.attachEvent("on" + b, c)
    }, md = a.document.removeEventListener ? function (a, b, c) {
        a.removeEventListener(b, c, !1)
    } : function (a, b, c) {
        a.detachEvent("on" + b, c)
    }, nd = /([\:\-\_]+(.))/g, od = /^moz([A-Z])/, pd = gb.prototype = {ready: function (c) {
        function d() {
            e || (e = !0, c())
        }

        var e = !1;
        "complete" === b.readyState ? setTimeout(d) : (this.bind("DOMContentLoaded", d), gb(a).bind("load", d))
    }, toString: function () {
        var a = [];
        return f(this, function (b) {
            a.push("" + b)
        }), "[" + a.join(", ") + "]"
    }, eq: function (a) {
        return a >= 0 ? Xc(this[a]) : Xc(this[this.length + a])
    }, length: 0, push: bd, sort: [].sort, splice: [].splice}, qd = {};
    f("multiple,selected,checked,disabled,readOnly,required,open".split(","), function (a) {
        qd[Tc(a)] = a
    });
    var rd = {};
    f("input,select,option,textarea,button,form,details".split(","), function (a) {
        rd[Uc(a)] = !0
    }), f({data: mb, inheritedData: sb, scope: function (a) {
        return sb(a, "$scope")
    }, controller: rb, injector: function (a) {
        return sb(a, "$injector")
    }, removeAttr: function (a, b) {
        a.removeAttribute(b)
    }, hasClass: nb, css: function (a, b, d) {
        if (b = eb(b), !s(d)) {
            var e;
            return 8 >= _c && (e = a.currentStyle && a.currentStyle[b], "" === e && (e = "auto")), e = e || a.style[b], 8 >= _c && (e = "" === e ? c : e), e
        }
        a.style[b] = d
    }, attr: function (a, b, d) {
        var e = Tc(b);
        if (qd[e]) {
            if (!s(d))return a[b] || (a.attributes.getNamedItem(b) || o).specified ? e : c;
            d ? (a[b] = !0, a.setAttribute(b, e)) : (a[b] = !1, a.removeAttribute(e))
        } else if (s(d))a.setAttribute(b, d); else if (a.getAttribute) {
            var f = a.getAttribute(b, 2);
            return null === f ? c : f
        }
    }, prop: function (a, b, c) {
        return s(c) ? (a[b] = c, void 0) : a[b]
    }, text: l(9 > _c ? function (a, b) {
        if (1 == a.nodeType) {
            if (r(b))return a.innerText;
            a.innerText = b
        } else {
            if (r(b))return a.nodeValue;
            a.nodeValue = b
        }
    } : function (a, b) {
        return r(b) ? a.textContent : (a.textContent = b, void 0)
    }, {$dv: ""}), val: function (a, b) {
        return r(b) ? a.value : (a.value = b, void 0)
    }, html: function (a, b) {
        if (r(b))return a.innerHTML;
        for (var c = 0, d = a.childNodes; c < d.length; c++)ib(d[c]);
        a.innerHTML = b
    }}, function (a, b) {
        gb.prototype[b] = function (b, d) {
            var e, f;
            if ((2 == a.length && a !== nb && a !== rb ? b : d) !== c) {
                for (e = 0; e < this.length; e++)a(this[e], b, d);
                return this
            }
            if (t(b)) {
                for (e = 0; e < this.length; e++)if (a === mb)a(this[e], b); else for (f in b)a(this[e], f, b[f]);
                return this
            }
            return this.length ? a(this[0], b, d) : a.$dv
        }
    }), f({removeData: kb, dealoc: ib, bind: function Le(a, c, d) {
        var e = lb(a, "events"), g = lb(a, "handle");
        e || lb(a, "events", e = {}), g || lb(a, "handle", g = ub(a, e)), f(c.split(" "), function (c) {
            var f = e[c];
            if (!f) {
                if ("mouseenter" == c || "mouseleave" == c) {
                    var h = b.body.contains || b.body.compareDocumentPosition ? function (a, b) {
                        var c = 9 === a.nodeType ? a.documentElement : a, d = b && b.parentNode;
                        return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                    } : function (a, b) {
                        if (b)for (; b = b.parentNode;)if (b === a)return!0;
                        return!1
                    };
                    e[c] = [];
                    var i = {mouseleave: "mouseout", mouseenter: "mouseover"};
                    Le(a, i[c], function (a) {
                        var b = this, d = a.relatedTarget;
                        (!d || d !== b && !h(b, d)) && g(a, c)
                    })
                } else ld(a, c, g), e[c] = [];
                f = e[c]
            }
            f.push(d)
        })
    }, unbind: jb, replaceWith: function (a, b) {
        var c, d = a.parentNode;
        ib(a), f(new gb(b), function (b) {
            c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a), c = b
        })
    }, children: function (a) {
        var b = [];
        return f(a.childNodes, function (a) {
            1 === a.nodeType && b.push(a)
        }), b
    }, contents: function (a) {
        return a.childNodes || []
    }, append: function (a, b) {
        f(new gb(b), function (b) {
            (1 === a.nodeType || 11 === a.nodeType) && a.appendChild(b)
        })
    }, prepend: function (a, b) {
        if (1 === a.nodeType) {
            var c = a.firstChild;
            f(new gb(b), function (b) {
                c ? a.insertBefore(b, c) : (a.appendChild(b), c = b)
            })
        }
    }, wrap: function (a, b) {
        b = Xc(b)[0];
        var c = a.parentNode;
        c && c.replaceChild(b, a), b.appendChild(a)
    }, remove: function (a) {
        ib(a);
        var b = a.parentNode;
        b && b.removeChild(a)
    }, after: function (a, b) {
        var c = a, d = a.parentNode;
        f(new gb(b), function (a) {
            d.insertBefore(a, c.nextSibling), c = a
        })
    }, addClass: pb, removeClass: ob, toggleClass: function (a, b, c) {
        r(c) && (c = !nb(a, b)), (c ? pb : ob)(a, b)
    }, parent: function (a) {
        var b = a.parentNode;
        return b && 11 !== b.nodeType ? b : null
    }, next: function (a) {
        if (a.nextElementSibling)return a.nextElementSibling;
        for (var b = a.nextSibling; null != b && 1 !== b.nodeType;)b = b.nextSibling;
        return b
    }, find: function (a, b) {
        return a.getElementsByTagName(b)
    }, clone: hb, triggerHandler: function (a, b) {
        var c = (lb(a, "events") || {})[b];
        f(c, function (b) {
            b.call(a, {preventDefault: o})
        })
    }}, function (a, b) {
        gb.prototype[b] = function (b, d) {
            for (var e, f = 0; f < this.length; f++)e == c ? (e = a(this[f], b, d), e !== c && (e = Xc(e))) : qb(e, a(this[f], b, d));
            return e == c ? this : e
        }
    }), wb.prototype = {put: function (a, b) {
        this[vb(a)] = b
    }, get: function (a) {
        return this[vb(a)]
    }, remove: function (a) {
        var b = this[a = vb(a)];
        return delete this[a], b
    }};
    var sd = /^function\s*[^\(]*\(\s*([^\)]*)\)/m, td = /,/, ud = /^\s*(_?)(\S+?)\1\s*$/, vd = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    Ab.$inject = ["$provide"];
    var wd = function () {
        var a = "$ngAnimateController", b = {running: !0};
        this.$get = ["$animation", "$window", "$sniffer", "$rootElement", "$rootScope", function (c, d, e, g) {
            g.data(a, b);
            var h = function (b, g) {
                function h(h, i, j) {
                    return function (k, l, m) {
                        function n(a) {
                            var b = 0, c = u(a) ? a.split(/\s*,\s*/) : [];
                            return f(c, function (a) {
                                b = Math.max(parseFloat(a) || 0, b)
                            }), b
                        }

                        function p() {
                            if (k.addClass(A), x)x(k, q, C); else if (y(d.getComputedStyle)) {
                                var a = "animation", b = "transition", c = e.vendorPrefix + "Animation", g = e.vendorPrefix + "Transition", h = "Duration", i = "Delay", j = "IterationCount", l = 0, m = 1;
                                f(k, function (e) {
                                    if (e.nodeType == m) {
                                        var f = b, k = g, o = 1, p = d.getComputedStyle(e) || {};
                                        (parseFloat(p[a + h]) > 0 || parseFloat(p[c + h]) > 0) && (f = a, k = c, o = Math.max(parseInt(p[f + j]) || 0, parseInt(p[k + j]) || 0, o));
                                        var q = Math.max(n(p[f + i]), n(p[k + i])), r = Math.max(n(p[f + h]), n(p[k + h]));
                                        l = Math.max(q + o * r, l)
                                    }
                                }), d.setTimeout(q, 1e3 * l)
                            } else q()
                        }

                        function q() {
                            q.run || (q.run = !0, j(k, l, m), k.removeClass(s), k.removeClass(A), k.removeData(a))
                        }

                        var r = b.$eval(g.ngAnimate), s = r ? t(r) ? r[h] : r + "-" + h : "", v = c(s), w = v && v.setup, x = v && v.start, z = v && v.cancel;
                        if (s) {
                            var A = s + "-active";
                            if (l || (l = m ? m.parent() : k.parent()), !e.transitions && !w && !x || (l.inheritedData(a) || o).running)return i(k, l, m), j(k, l, m), void 0;
                            var B = k.data(a) || {};
                            if (B.running && ((z || o)(k), B.done()), k.data(a, {running: !0, done: q}), k.addClass(s), i(k, l, m), 0 == k.length)return q();
                            var C = (w || o)(k);
                            d.setTimeout(p, 1)
                        } else i(k, l, m), j(k, l, m)
                    }
                }

                function i(a) {
                    a.css("display", "")
                }

                function j(a) {
                    a.css("display", "none")
                }

                function k(a, b, c) {
                    c ? c.after(a) : b.append(a)
                }

                function l(a) {
                    a.remove()
                }

                function m(a, b, c) {
                    k(a, b, c)
                }

                var n = {};
                return n.enter = h("enter", k, o), n.leave = h("leave", o, l), n.move = h("move", m, o), n.show = h("show", i, o), n.hide = h("hide", o, j), n.animate = function (a, b) {
                    h(a, o, o)(b)
                }, n
            };
            return h.enabled = function (a) {
                return arguments.length && (b.running = !a), !b.running
            }, h
        }]
    }, xd = "Non-assignable model expression: ";
    Fb.$inject = ["$provide"];
    var yd = /^(x[\:\-_]|data[\:\-_])/i, zd = /^([^:]+):\/\/(\w+:{0,1}\w*@)?(\{?[\w\.-]*\}?)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/, Ad = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, Bd = {http: 80, https: 443, ftp: 21};
    Ub.prototype = Tb.prototype = Sb.prototype = {$$replace: !1, absUrl: Vb("$$absUrl"), url: function (a, b) {
        if (r(a))return this.$$url;
        var c = Ad.exec(a);
        return c[1] && this.path(decodeURIComponent(c[1])), (c[2] || c[1]) && this.search(c[3] || ""), this.hash(c[5] || "", b), this
    }, protocol: Vb("$$protocol"), host: Vb("$$host"), port: Vb("$$port"), path: Wb("$$path", function (a) {
        return"/" == a.charAt(0) ? a : "/" + a
    }), search: function (a, b) {
        return r(a) ? this.$$search : (s(b) ? null === b ? delete this.$$search[a] : this.$$search[a] = b : this.$$search = u(a) ? T(a) : a, this.$$compose(), this)
    }, hash: Wb("$$hash", p), replace: function () {
        return this.$$replace = !0, this
    }};
    var Cd = {"null": function () {
        return null
    }, "true": function () {
        return!0
    }, "false": function () {
        return!1
    }, undefined: o, "+": function (a, b, d, e) {
        return d = d(a, b), e = e(a, b), s(d) ? s(e) ? d + e : d : s(e) ? e : c
    }, "-": function (a, b, c, d) {
        return c = c(a, b), d = d(a, b), (s(c) ? c : 0) - (s(d) ? d : 0)
    }, "*": function (a, b, c, d) {
        return c(a, b) * d(a, b)
    }, "/": function (a, b, c, d) {
        return c(a, b) / d(a, b)
    }, "%": function (a, b, c, d) {
        return c(a, b) % d(a, b)
    }, "^": function (a, b, c, d) {
        return c(a, b) ^ d(a, b)
    }, "=": o, "===": function (a, b, c, d) {
        return c(a, b) === d(a, b)
    }, "!==": function (a, b, c, d) {
        return c(a, b) !== d(a, b)
    }, "==": function (a, b, c, d) {
        return c(a, b) == d(a, b)
    }, "!=": function (a, b, c, d) {
        return c(a, b) != d(a, b)
    }, "<": function (a, b, c, d) {
        return c(a, b) < d(a, b)
    }, ">": function (a, b, c, d) {
        return c(a, b) > d(a, b)
    }, "<=": function (a, b, c, d) {
        return c(a, b) <= d(a, b)
    }, ">=": function (a, b, c, d) {
        return c(a, b) >= d(a, b)
    }, "&&": function (a, b, c, d) {
        return c(a, b) && d(a, b)
    }, "||": function (a, b, c, d) {
        return c(a, b) || d(a, b)
    }, "&": function (a, b, c, d) {
        return c(a, b) & d(a, b)
    }, "|": function (a, b, c, d) {
        return d(a, b)(a, b, c(a, b))
    }, "!": function (a, b, c) {
        return!c(a, b)
    }}, Dd = {n: "\n", f: "\f", r: "\r", t: "	", v: "", "'": "'", '"': '"'}, Ed = {}, Fd = /^(([^:]+):)?\/\/(\w+:{0,1}\w*@)?([\w\.-]*)?(:([0-9]+))?(.*)$/, Gd = a.XMLHttpRequest || function () {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.6.0")
        } catch (a) {
        }
        try {
            return new ActiveXObject("Msxml2.XMLHTTP.3.0")
        } catch (b) {
        }
        try {
            return new ActiveXObject("Msxml2.XMLHTTP")
        } catch (c) {
        }
        throw new Error("This browser does not support XMLHttpRequest.")
    };
    vc.$inject = ["$provide"], xc.$inject = ["$locale"], yc.$inject = ["$locale"];
    var Hd = ".", Id = {yyyy: Bc("FullYear", 4), yy: Bc("FullYear", 2, 0, !0), y: Bc("FullYear", 1), MMMM: Cc("Month"), MMM: Cc("Month", !0), MM: Bc("Month", 2, 1), M: Bc("Month", 1, 1), dd: Bc("Date", 2), d: Bc("Date", 1), HH: Bc("Hours", 2), H: Bc("Hours", 1), hh: Bc("Hours", 2, -12), h: Bc("Hours", 1, -12), mm: Bc("Minutes", 2), m: Bc("Minutes", 1), ss: Bc("Seconds", 2), s: Bc("Seconds", 1), sss: Bc("Milliseconds", 3), EEEE: Cc("Day"), EEE: Cc("Day", !0), a: Ec, Z: Dc}, Jd = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, Kd = /^\d+$/;
    Fc.$inject = ["$locale"];
    var Ld = q(Tc), Md = q(Uc);
    Ic.$inject = ["$parse"];
    var Nd = q({restrict: "E", compile: function (a, c) {
        return 8 >= _c && (c.href || c.name || c.$set("href", ""), a.append(b.createComment("IE fix"))), function (a, b) {
            b.bind("click", function (a) {
                b.attr("href") || a.preventDefault()
            })
        }
    }}), Od = {};
    f(qd, function (a, b) {
        var c = Gb("ng-" + b);
        Od[c] = function () {
            return{priority: 100, compile: function () {
                return function (a, d, e) {
                    a.$watch(e[c], function (a) {
                        e.$set(b, !!a)
                    })
                }
            }}
        }
    }), f(["src", "srcset", "href"], function (a) {
        var b = Gb("ng-" + a);
        Od[b] = function () {
            return{priority: 99, link: function (c, d, e) {
                e.$observe(b, function (b) {
                    b && (e.$set(a, b), _c && d.prop(a, e[a]))
                })
            }}
        }
    });
    var Pd = {$addControl: o, $removeControl: o, $setValidity: o, $setDirty: o, $setPristine: o};
    Kc.$inject = ["$element", "$attrs", "$scope"];
    var Qd = function (a) {
        return["$timeout", function (b) {
            var d = {name: "form", restrict: "E", controller: Kc, compile: function () {
                return{pre: function (a, d, e, f) {
                    if (!e.action) {
                        var g = function (a) {
                            a.preventDefault ? a.preventDefault() : a.returnValue = !1
                        };
                        ld(d[0], "submit", g), d.bind("$destroy", function () {
                            b(function () {
                                md(d[0], "submit", g)
                            }, 0, !1)
                        })
                    }
                    var h = d.parent().controller("form"), i = e.name || e.ngForm;
                    i && (a[i] = f), h && d.bind("$destroy", function () {
                        h.$removeControl(f), i && (a[i] = c), l(f, Pd)
                    })
                }}
            }};
            return a ? l(I(d), {restrict: "EAC"}) : d
        }]
    }, Rd = Qd(), Sd = Qd(!0), Td = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/, Ud = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, Vd = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/, Wd = {text: Mc, number: Nc, url: Oc, email: Pc, radio: Qc, checkbox: Rc, hidden: o, button: o, submit: o, reset: o}, Xd = ["$browser", "$sniffer", function (a, b) {
        return{restrict: "E", require: "?ngModel", link: function (c, d, e, f) {
            f && (Wd[Tc(e.type)] || Wd.text)(c, d, e, f, b, a)
        }}
    }], Yd = "ng-valid", Zd = "ng-invalid", $d = "ng-pristine", _d = "ng-dirty", ae = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", function (a, b, c, d, e) {
        function g(a, b) {
            b = b ? "-" + Z(b, "-") : "", d.removeClass((a ? Zd : Yd) + b).addClass((a ? Yd : Zd) + b)
        }

        this.$viewValue = Number.NaN, this.$modelValue = Number.NaN, this.$parsers = [], this.$formatters = [], this.$viewChangeListeners = [], this.$pristine = !0, this.$dirty = !1, this.$valid = !0, this.$invalid = !1, this.$name = c.name;
        var h = e(c.ngModel), i = h.assign;
        if (!i)throw Error(xd + c.ngModel + " (" + S(d) + ")");
        this.$render = o;
        var j = d.inheritedData("$formController") || Pd, k = 0, l = this.$error = {};
        d.addClass($d), g(!0), this.$setValidity = function (a, b) {
            l[a] !== !b && (b ? (l[a] && k--, k || (g(!0), this.$valid = !0, this.$invalid = !1)) : (g(!1), this.$invalid = !0, this.$valid = !1, k++), l[a] = !b, g(b, a), j.$setValidity(a, b, this))
        }, this.$setPristine = function () {
            this.$dirty = !1, this.$pristine = !0, d.removeClass(_d).addClass($d)
        }, this.$setViewValue = function (c) {
            this.$viewValue = c, this.$pristine && (this.$dirty = !0, this.$pristine = !1, d.removeClass($d).addClass(_d), j.$setDirty()), f(this.$parsers, function (a) {
                c = a(c)
            }), this.$modelValue !== c && (this.$modelValue = c, i(a, c), f(this.$viewChangeListeners, function (a) {
                try {
                    a()
                } catch (c) {
                    b(c)
                }
            }))
        };
        var m = this;
        a.$watch(function () {
            var b = h(a);
            if (m.$modelValue !== b) {
                var c = m.$formatters, d = c.length;
                for (m.$modelValue = b; d--;)b = c[d](b);
                m.$viewValue !== b && (m.$viewValue = b, m.$render())
            }
        })
    }], be = function () {
        return{require: ["ngModel", "^?form"], controller: ae, link: function (a, b, c, d) {
            var e = d[0], f = d[1] || Pd;
            f.$addControl(e), b.bind("$destroy", function () {
                f.$removeControl(e)
            })
        }}
    }, ce = q({require: "ngModel", link: function (a, b, c, d) {
        d.$viewChangeListeners.push(function () {
            a.$eval(c.ngChange)
        })
    }}), de = function () {
        return{require: "?ngModel", link: function (a, b, c, d) {
            if (d) {
                c.required = !0;
                var e = function (a) {
                    return c.required && (Lc(a) || a === !1) ? (d.$setValidity("required", !1), void 0) : (d.$setValidity("required", !0), a)
                };
                d.$formatters.push(e), d.$parsers.unshift(e), c.$observe("required", function () {
                    e(d.$viewValue)
                })
            }
        }}
    }, ee = function () {
        return{require: "ngModel", link: function (a, b, d, e) {
            var g = /\/(.*)\//.exec(d.ngList), h = g && new RegExp(g[1]) || d.ngList || ",", i = function (a) {
                var b = [];
                return a && f(a.split(h), function (a) {
                    a && b.push(C(a))
                }), b
            };
            e.$parsers.push(i), e.$formatters.push(function (a) {
                return x(a) ? a.join(", ") : c
            })
        }}
    }, fe = /^(true|false|\d+)$/, ge = function () {
        return{priority: 100, compile: function (a, b) {
            return fe.test(b.ngValue) ? function (a, b, c) {
                c.$set("value", a.$eval(c.ngValue))
            } : function (a, b, c) {
                a.$watch(c.ngValue, function (a) {
                    c.$set("value", a, !1)
                })
            }
        }}
    }, he = Jc(function (a, b, d) {
        b.addClass("ng-binding").data("$binding", d.ngBind), a.$watch(d.ngBind, function (a) {
            b.text(a == c ? "" : a)
        })
    }), ie = ["$interpolate", function (a) {
        return function (b, c, d) {
            var e = a(c.attr(d.$attr.ngBindTemplate));
            c.addClass("ng-binding").data("$binding", e), d.$observe("ngBindTemplate", function (a) {
                c.text(a)
            })
        }
    }], je = [function () {
        return function (a, b, c) {
            b.addClass("ng-binding").data("$binding", c.ngBindHtmlUnsafe), a.$watch(c.ngBindHtmlUnsafe, function (a) {
                b.html(a || "")
            })
        }
    }], ke = Sc("", !0), le = Sc("Odd", 0), me = Sc("Even", 1), ne = Jc({compile: function (a, b) {
        b.$set("ngCloak", c), a.removeClass("ng-cloak")
    }}), oe = [function () {
        return{scope: !0, controller: "@"}
    }], pe = ["$sniffer", function (a) {
        return{priority: 1e3, compile: function () {
            a.csp = !0
        }}
    }], qe = {};
    f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress".split(" "), function (a) {
        var b = Gb("ng-" + a);
        qe[b] = ["$parse", function (c) {
            return function (d, e, f) {
                var g = c(f[b]);
                e.bind(Tc(a), function (a) {
                    d.$apply(function () {
                        g(d, {$event: a})
                    })
                })
            }
        }]
    });
    var re = Jc(function (a, b, c) {
        b.bind("submit", function () {
            a.$apply(c.ngSubmit)
        })
    }), se = ["$animator", function (a) {
        return{transclude: "element", priority: 1e3, terminal: !0, restrict: "A", compile: function (b, d, e) {
            return function (b, d, f) {
                var g, h, i = a(b, f);
                b.$watch(f.ngIf, function (a) {
                    g && (i.leave(g), g = c), h && (h.$destroy(), h = c), R(a) && (h = b.$new(), e(h, function (a) {
                        g = a, i.enter(a, d.parent(), d)
                    }))
                })
            }
        }}
    }], te = ["$http", "$templateCache", "$anchorScroll", "$compile", "$animator", function (a, b, c, d, e) {
        return{restrict: "ECA", terminal: !0, compile: function (f, g) {
            var h = g.ngInclude || g.src, i = g.onload || "", j = g.autoscroll;
            return function (f, g, k) {
                var l, m = e(f, k), n = 0, o = function () {
                    l && (l.$destroy(), l = null), m.leave(g.contents(), g)
                };
                f.$watch(h, function (e) {
                    var h = ++n;
                    e ? (a.get(e, {cache: b}).success(function (a) {
                        if (h === n) {
                            l && l.$destroy(), l = f.$new(), m.leave(g.contents(), g);
                            var b = Xc("<div/>").html(a).contents();
                            m.enter(b, g), d(b)(l), !s(j) || j && !f.$eval(j) || c(), l.$emit("$includeContentLoaded"), f.$eval(i)
                        }
                    }).error(function () {
                        h === n && o()
                    }), f.$emit("$includeContentRequested")) : o()
                })
            }
        }}
    }], ue = Jc({compile: function () {
        return{pre: function (a, b, c) {
            a.$eval(c.ngInit)
        }}
    }}), ve = Jc({terminal: !0, priority: 1e3}), we = ["$locale", "$interpolate", function (a, b) {
        var c = /{}/g;
        return{restrict: "EA", link: function (d, e, g) {
            var h = g.count, i = e.attr(g.$attr.when), j = g.offset || 0, k = d.$eval(i), l = {}, m = b.startSymbol(), n = b.endSymbol();
            f(k, function (a, d) {
                l[d] = b(a.replace(c, m + h + "-" + j + n))
            }), d.$watch(function () {
                var b = parseFloat(d.$eval(h));
                return isNaN(b) ? "" : (b in k || (b = a.pluralCat(b - j)), l[b](d, e, !0))
            }, function (a) {
                e.text(a)
            })
        }}
    }], xe = ["$parse", "$animator", function (a, b) {
        var c = "$$NG_REMOVED";
        return{transclude: "element", priority: 1e3, terminal: !0, compile: function (d, g, h) {
            return function (d, g, i) {
                var j, k, l, m, n, o, p, q = b(d, i), r = i.ngRepeat, s = r.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/), t = {$id: vb};
                if (!s)throw Error("Expected ngRepeat in form of '_item_ in _collection_[ track by _id_]' but got '" + r + "'.");
                if (m = s[1], n = s[2], j = s[4], j ? (k = a(j), l = function (a, b, c) {
                    return p && (t[p] = a), t[o] = b, t.$index = c, k(d, t)
                }) : l = function (a, b) {
                    return vb(b)
                }, s = m.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/), !s)throw Error("'item' in 'item in collection' should be identifier or (key, value) but got '" + m + "'.");
                o = s[3] || s[1], p = s[2];
                var u = {};
                d.$watchCollection(n, function (a) {
                    var b, i, j, k, m, n, s, t, v, w, x = g, y = {}, z = [];
                    if (e(a))v = a; else {
                        v = [];
                        for (n in a)a.hasOwnProperty(n) && "$" != n.charAt(0) && v.push(n);
                        v.sort()
                    }
                    for (k = v.length, i = z.length = v.length, b = 0; i > b; b++)if (n = a === v ? b : v[b], s = a[n], t = l(n, s, b), u.hasOwnProperty(t))w = u[t], delete u[t], y[t] = w, z[b] = w; else {
                        if (y.hasOwnProperty(t))throw f(z, function (a) {
                            a && a.element && (u[a.id] = a)
                        }), new Error("Duplicates in a repeater are not allowed. Repeater: " + r + " key: " + t);
                        z[b] = {id: t}, y[t] = !1
                    }
                    for (n in u)u.hasOwnProperty(n) && (w = u[n], q.leave(w.element), w.element[0][c] = !0, w.scope.$destroy());
                    for (b = 0, i = v.length; i > b; b++) {
                        if (n = a === v ? b : v[b], s = a[n], w = z[b], w.element) {
                            m = w.scope, j = x[0];
                            do j = j.nextSibling; while (j && j[c]);
                            w.element[0] == j ? x = w.element : (q.move(w.element, null, x), x = w.element)
                        } else m = d.$new();
                        m[o] = s, p && (m[p] = n), m.$index = b, m.$first = 0 === b, m.$last = b === k - 1, m.$middle = !(m.$first || m.$last), w.element || h(m, function (a) {
                            q.enter(a, null, x), x = a, w.scope = m, w.element = a, y[w.id] = w
                        })
                    }
                    u = y
                })
            }
        }}
    }], ye = ["$animator", function (a) {
        return function (b, c, d) {
            var e = a(b, d);
            b.$watch(d.ngShow, function (a) {
                e[R(a) ? "show" : "hide"](c)
            })
        }
    }], ze = ["$animator", function (a) {
        return function (b, c, d) {
            var e = a(b, d);
            b.$watch(d.ngHide, function (a) {
                e[R(a) ? "hide" : "show"](c)
            })
        }
    }], Ae = Jc(function (a, b, c) {
        a.$watch(c.ngStyle, function (a, c) {
            c && a !== c && f(c, function (a, c) {
                b.css(c, "")
            }), a && b.css(a)
        }, !0)
    }), Be = ["$animator", function (a) {
        return{restrict: "EA", require: "ngSwitch", controller: ["$scope", function () {
            this.cases = {}
        }], link: function (b, c, d, e) {
            var g, h, i = a(b, d), j = d.ngSwitch || d.on, k = [];
            b.$watch(j, function (a) {
                for (var c = 0, j = k.length; j > c; c++)k[c].$destroy(), i.leave(h[c]);
                h = [], k = [], (g = e.cases["!" + a] || e.cases["?"]) && (b.$eval(d.change), f(g, function (a) {
                    var c = b.$new();
                    k.push(c), a.transclude(c, function (b) {
                        var c = a.element;
                        h.push(b), i.enter(b, c.parent(), c)
                    })
                }))
            })
        }}
    }], Ce = Jc({transclude: "element", priority: 500, require: "^ngSwitch", compile: function (a, b, c) {
        return function (a, d, e, f) {
            f.cases["!" + b.ngSwitchWhen] = f.cases["!" + b.ngSwitchWhen] || [], f.cases["!" + b.ngSwitchWhen].push({transclude: c, element: d})
        }
    }}), De = Jc({transclude: "element", priority: 500, require: "^ngSwitch", compile: function (a, b, c) {
        return function (a, b, d, e) {
            e.cases["?"] = e.cases["?"] || [], e.cases["?"].push({transclude: c, element: b})
        }
    }}), Ee = Jc({controller: ["$transclude", "$element", function (a, b) {
        a(function (a) {
            b.append(a)
        })
    }]}), Fe = ["$http", "$templateCache", "$route", "$anchorScroll", "$compile", "$controller", "$animator", function (a, b, c, d, e, f, g) {
        return{restrict: "ECA", terminal: !0, link: function (a, b, h) {
            function i() {
                l && (l.$destroy(), l = null)
            }

            function j() {
                n.leave(b.contents(), b), i()
            }

            function k() {
                var g = c.current && c.current.locals, h = g && g.$template;
                if (h) {
                    j();
                    var i = Xc("<div></div>").html(h).contents();
                    n.enter(i, b);
                    var k, o = e(i), p = c.current;
                    l = p.scope = a.$new(), p.controller && (g.$scope = l, k = f(p.controller, g), p.controllerAs && (l[p.controllerAs] = k), b.children().data("$ngControllerController", k)), o(l), l.$emit("$viewContentLoaded"), l.$eval(m), d()
                } else j()
            }

            var l, m = h.onload || "", n = g(a, h);
            a.$on("$routeChangeSuccess", k), k()
        }}
    }], Ge = ["$templateCache", function (a) {
        return{restrict: "E", terminal: !0, compile: function (b, c) {
            if ("text/ng-template" == c.type) {
                var d = c.id, e = b[0].text;
                a.put(d, e)
            }
        }}
    }], He = q({terminal: !0}), Ie = ["$compile", "$parse", function (a, d) {
        var e = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/, h = {$setViewValue: o};
        return{restrict: "E", require: ["select", "?ngModel"], controller: ["$element", "$scope", "$attrs", function (a, b, c) {
            var d, e, f = this, g = {}, i = h;
            f.databound = c.ngModel, f.init = function (a, b, c) {
                i = a, d = b, e = c
            }, f.addOption = function (b) {
                g[b] = !0, i.$viewValue == b && (a.val(b), e.parent() && e.remove())
            }, f.removeOption = function (a) {
                this.hasOption(a) && (delete g[a], i.$viewValue == a && this.renderUnknownOption(a))
            }, f.renderUnknownOption = function (b) {
                var c = "? " + vb(b) + " ?";
                e.val(c), a.prepend(e), a.val(c), e.prop("selected", !0)
            }, f.hasOption = function (a) {
                return g.hasOwnProperty(a)
            }, b.$on("$destroy", function () {
                f.renderUnknownOption = o
            })
        }], link: function (h, i, j, k) {
            function l(a, b, c, d) {
                c.$render = function () {
                    var a = c.$viewValue;
                    d.hasOption(a) ? (z.parent() && z.remove(), b.val(a), "" === a && o.prop("selected", !0)) : r(a) && o ? b.val("") : d.renderUnknownOption(a)
                }, b.bind("change", function () {
                    a.$apply(function () {
                        z.parent() && z.remove(), c.$setViewValue(b.val())
                    })
                })
            }

            function m(a, b, c) {
                var d;
                c.$render = function () {
                    var a = new wb(c.$viewValue);
                    f(b.find("option"), function (b) {
                        b.selected = s(a.get(b.value))
                    })
                }, a.$watch(function () {
                    K(d, c.$viewValue) || (d = I(c.$viewValue), c.$render())
                }), b.bind("change", function () {
                    a.$apply(function () {
                        var a = [];
                        f(b.find("option"), function (b) {
                            b.selected && a.push(b.value)
                        }), c.$setViewValue(a)
                    })
                })
            }

            function n(b, f, h) {
                function i() {
                    var a, d, e, i, j, q, u, z, A, B, C, D, E, F, G = {"": []}, H = [""], I = h.$modelValue, J = p(b) || [], K = m ? g(J) : J, L = {}, M = !1;
                    if (t)if (r && x(I)) {
                        M = new wb([]);
                        for (var N = 0; N < I.length; N++)L[l] = I[N], M.put(r(b, L), I[N])
                    } else M = new wb(I);
                    for (B = 0; z = K.length, z > B; B++) {
                        if (L[l] = J[m ? L[m] = K[B] : B], a = n(b, L) || "", (d = G[a]) || (d = G[a] = [], H.push(a)), t)C = M.remove(r ? r(b, L) : o(b, L)) != c; else {
                            if (r) {
                                var O = {};
                                O[l] = I, C = r(b, O) === r(b, L)
                            } else C = I === o(b, L);
                            M = M || C
                        }
                        F = k(b, L), F = F === c ? "" : F, d.push({id: r ? r(b, L) : m ? K[B] : B, label: F, selected: C})
                    }
                    for (t || (v || null === I ? G[""].unshift({id: "", label: "", selected: !M}) : M || G[""].unshift({id: "?", label: "", selected: !0})), A = 0, u = H.length; u > A; A++) {
                        for (a = H[A], d = G[a], s.length <= A ? (i = {element: y.clone().attr("label", a), label: d.label}, j = [i], s.push(j), f.append(i.element)) : (j = s[A], i = j[0], i.label != a && i.element.attr("label", i.label = a)), D = null, B = 0, z = d.length; z > B; B++)e = d[B], (q = j[B + 1]) ? (D = q.element, q.label !== e.label && D.text(q.label = e.label), q.id !== e.id && D.val(q.id = e.id), D[0].selected !== e.selected && D.prop("selected", q.selected = e.selected)) : ("" === e.id && v ? E = v : (E = w.clone()).val(e.id).attr("selected", e.selected).text(e.label), j.push(q = {element: E, label: e.label, id: e.id, selected: e.selected}), D ? D.after(E) : i.element.append(E), D = E);
                        for (B++; j.length > B;)j.pop().element.remove()
                    }
                    for (; s.length > A;)s.pop()[0].element.remove()
                }

                var j;
                if (!(j = u.match(e)))throw Error("Expected ngOptions in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_ (track by _expr_)?' but got '" + u + "'.");
                var k = d(j[2] || j[1]), l = j[4] || j[6], m = j[5], n = d(j[3] || ""), o = d(j[2] ? j[1] : l), p = d(j[7]), q = j[8], r = q ? d(j[8]) : null, s = [
                    [
                        {element: f, label: ""}
                    ]
                ];
                v && (a(v)(b), v.removeClass("ng-scope"), v.remove()), f.html(""), f.bind("change", function () {
                    b.$apply(function () {
                        var a, d, e, g, i, j, k, n, q = p(b) || [], u = {};
                        if (t) {
                            for (e = [], j = 0, n = s.length; n > j; j++)for (a = s[j], i = 1, k = a.length; k > i; i++)if ((g = a[i].element)[0].selected) {
                                if (d = g.val(), m && (u[m] = d), r)for (var v = 0; v < q.length && (u[l] = q[v], r(b, u) != d); v++); else u[l] = q[d];
                                e.push(o(b, u))
                            }
                        } else if (d = f.val(), "?" == d)e = c; else if ("" == d)e = null; else if (r) {
                            for (var v = 0; v < q.length; v++)if (u[l] = q[v], r(b, u) == d) {
                                e = o(b, u);
                                break
                            }
                        } else u[l] = q[d], m && (u[m] = d), e = o(b, u);
                        h.$setViewValue(e)
                    })
                }), h.$render = i, b.$watch(i)
            }

            if (k[1]) {
                for (var o, p = k[0], q = k[1], t = j.multiple, u = j.ngOptions, v = !1, w = Xc(b.createElement("option")), y = Xc(b.createElement("optgroup")), z = w.clone(), A = 0, B = i.children(), C = B.length; C > A; A++)if ("" == B[A].value) {
                    o = v = B.eq(A);
                    break
                }
                if (p.init(q, v, z), t && (j.required || j.ngRequired)) {
                    var D = function (a) {
                        return q.$setValidity("required", !j.required || a && a.length), a
                    };
                    q.$parsers.push(D), q.$formatters.unshift(D), j.$observe("required", function () {
                        D(q.$viewValue)
                    })
                }
                u ? n(h, i, q) : t ? m(h, i, q) : l(h, i, q, p)
            }
        }}
    }], Je = ["$interpolate", function (a) {
        var b = {addOption: o, removeOption: o};
        return{restrict: "E", priority: 100, compile: function (c, d) {
            if (r(d.value)) {
                var e = a(c.text(), !0);
                e || d.$set("value", c.text())
            }
            return function (a, c, d) {
                var f = "$selectController", g = c.parent(), h = g.data(f) || g.parent().data(f);
                h && h.databound ? c.prop("selected", !1) : h = b, e ? a.$watch(e, function (a, b) {
                    d.$set("value", a), a !== b && h.removeOption(b), h.addOption(a)
                }) : h.addOption(d.value), c.bind("$destroy", function () {
                    h.removeOption(d.value)
                })
            }
        }}
    }], Ke = q({restrict: "E", terminal: !0});
    $(), cb(ed), Xc(b).ready(function () {
        X(b, Y)
    })
}(window, document), angular.element(document).find("head").append('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak{display:none;}ng\\:form{display:block;}</style>'), define("angular", ["jquery"], function (a) {
    return function () {
        var b;
        return b || a.angular
    }
}(this)), function () {
    var a = this, b = a._, c = {}, d = Array.prototype, e = Object.prototype, f = Function.prototype, g = d.push, h = d.slice, i = d.concat, j = e.toString, k = e.hasOwnProperty, l = d.forEach, m = d.map, n = d.reduce, o = d.reduceRight, p = d.filter, q = d.every, r = d.some, s = d.indexOf, t = d.lastIndexOf, u = Array.isArray, v = Object.keys, w = f.bind, x = function (a) {
        return a instanceof x ? a : this instanceof x ? (this._wrapped = a, void 0) : new x(a)
    };
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = x), exports._ = x) : a._ = x, x.VERSION = "1.5.1";
    var y = x.each = x.forEach = function (a, b, d) {
        if (null != a)if (l && a.forEach === l)a.forEach(b, d); else if (a.length === +a.length) {
            for (var e = 0, f = a.length; f > e; e++)if (b.call(d, a[e], e, a) === c)return
        } else for (var g in a)if (x.has(a, g) && b.call(d, a[g], g, a) === c)return
    };
    x.map = x.collect = function (a, b, c) {
        var d = [];
        return null == a ? d : m && a.map === m ? a.map(b, c) : (y(a, function (a, e, f) {
            d.push(b.call(c, a, e, f))
        }), d)
    };
    var z = "Reduce of empty array with no initial value";
    x.reduce = x.foldl = x.inject = function (a, b, c, d) {
        var e = arguments.length > 2;
        if (null == a && (a = []), n && a.reduce === n)return d && (b = x.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
        if (y(a, function (a, f, g) {
            e ? c = b.call(d, c, a, f, g) : (c = a, e = !0)
        }), !e)throw new TypeError(z);
        return c
    }, x.reduceRight = x.foldr = function (a, b, c, d) {
        var e = arguments.length > 2;
        if (null == a && (a = []), o && a.reduceRight === o)return d && (b = x.bind(b, d)), e ? a.reduceRight(b, c) : a.reduceRight(b);
        var f = a.length;
        if (f !== +f) {
            var g = x.keys(a);
            f = g.length
        }
        if (y(a, function (h, i, j) {
            i = g ? g[--f] : --f, e ? c = b.call(d, c, a[i], i, j) : (c = a[i], e = !0)
        }), !e)throw new TypeError(z);
        return c
    }, x.find = x.detect = function (a, b, c) {
        var d;
        return A(a, function (a, e, f) {
            return b.call(c, a, e, f) ? (d = a, !0) : void 0
        }), d
    }, x.filter = x.select = function (a, b, c) {
        var d = [];
        return null == a ? d : p && a.filter === p ? a.filter(b, c) : (y(a, function (a, e, f) {
            b.call(c, a, e, f) && d.push(a)
        }), d)
    }, x.reject = function (a, b, c) {
        return x.filter(a, function (a, d, e) {
            return!b.call(c, a, d, e)
        }, c)
    }, x.every = x.all = function (a, b, d) {
        b || (b = x.identity);
        var e = !0;
        return null == a ? e : q && a.every === q ? a.every(b, d) : (y(a, function (a, f, g) {
            return(e = e && b.call(d, a, f, g)) ? void 0 : c
        }), !!e)
    };
    var A = x.some = x.any = function (a, b, d) {
        b || (b = x.identity);
        var e = !1;
        return null == a ? e : r && a.some === r ? a.some(b, d) : (y(a, function (a, f, g) {
            return e || (e = b.call(d, a, f, g)) ? c : void 0
        }), !!e)
    };
    x.contains = x.include = function (a, b) {
        return null == a ? !1 : s && a.indexOf === s ? -1 != a.indexOf(b) : A(a, function (a) {
            return a === b
        })
    }, x.invoke = function (a, b) {
        var c = h.call(arguments, 2), d = x.isFunction(b);
        return x.map(a, function (a) {
            return(d ? b : a[b]).apply(a, c)
        })
    }, x.pluck = function (a, b) {
        return x.map(a, function (a) {
            return a[b]
        })
    }, x.where = function (a, b, c) {
        return x.isEmpty(b) ? c ? void 0 : [] : x[c ? "find" : "filter"](a, function (a) {
            for (var c in b)if (b[c] !== a[c])return!1;
            return!0
        })
    }, x.findWhere = function (a, b) {
        return x.where(a, b, !0)
    }, x.max = function (a, b, c) {
        if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535)return Math.max.apply(Math, a);
        if (!b && x.isEmpty(a))return-1 / 0;
        var d = {computed: -1 / 0, value: -1 / 0};
        return y(a, function (a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g > d.computed && (d = {value: a, computed: g})
        }), d.value
    }, x.min = function (a, b, c) {
        if (!b && x.isArray(a) && a[0] === +a[0] && a.length < 65535)return Math.min.apply(Math, a);
        if (!b && x.isEmpty(a))return 1 / 0;
        var d = {computed: 1 / 0, value: 1 / 0};
        return y(a, function (a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g < d.computed && (d = {value: a, computed: g})
        }), d.value
    }, x.shuffle = function (a) {
        var b, c = 0, d = [];
        return y(a, function (a) {
            b = x.random(c++), d[c - 1] = d[b], d[b] = a
        }), d
    };
    var B = function (a) {
        return x.isFunction(a) ? a : function (b) {
            return b[a]
        }
    };
    x.sortBy = function (a, b, c) {
        var d = B(b);
        return x.pluck(x.map(a, function (a, b, e) {
            return{value: a, index: b, criteria: d.call(c, a, b, e)}
        }).sort(function (a, b) {
            var c = a.criteria, d = b.criteria;
            if (c !== d) {
                if (c > d || void 0 === c)return 1;
                if (d > c || void 0 === d)return-1
            }
            return a.index < b.index ? -1 : 1
        }), "value")
    };
    var C = function (a, b, c, d) {
        var e = {}, f = B(null == b ? x.identity : b);
        return y(a, function (b, g) {
            var h = f.call(c, b, g, a);
            d(e, h, b)
        }), e
    };
    x.groupBy = function (a, b, c) {
        return C(a, b, c, function (a, b, c) {
            (x.has(a, b) ? a[b] : a[b] = []).push(c)
        })
    }, x.countBy = function (a, b, c) {
        return C(a, b, c, function (a, b) {
            x.has(a, b) || (a[b] = 0), a[b]++
        })
    }, x.sortedIndex = function (a, b, c, d) {
        c = null == c ? x.identity : B(c);
        for (var e = c.call(d, b), f = 0, g = a.length; g > f;) {
            var h = f + g >>> 1;
            c.call(d, a[h]) < e ? f = h + 1 : g = h
        }
        return f
    }, x.toArray = function (a) {
        return a ? x.isArray(a) ? h.call(a) : a.length === +a.length ? x.map(a, x.identity) : x.values(a) : []
    }, x.size = function (a) {
        return null == a ? 0 : a.length === +a.length ? a.length : x.keys(a).length
    }, x.first = x.head = x.take = function (a, b, c) {
        return null == a ? void 0 : null == b || c ? a[0] : h.call(a, 0, b)
    }, x.initial = function (a, b, c) {
        return h.call(a, 0, a.length - (null == b || c ? 1 : b))
    }, x.last = function (a, b, c) {
        return null == a ? void 0 : null == b || c ? a[a.length - 1] : h.call(a, Math.max(a.length - b, 0))
    }, x.rest = x.tail = x.drop = function (a, b, c) {
        return h.call(a, null == b || c ? 1 : b)
    }, x.compact = function (a) {
        return x.filter(a, x.identity)
    };
    var D = function (a, b, c) {
        return b && x.every(a, x.isArray) ? i.apply(c, a) : (y(a, function (a) {
            x.isArray(a) || x.isArguments(a) ? b ? g.apply(c, a) : D(a, b, c) : c.push(a)
        }), c)
    };
    x.flatten = function (a, b) {
        return D(a, b, [])
    }, x.without = function (a) {
        return x.difference(a, h.call(arguments, 1))
    }, x.uniq = x.unique = function (a, b, c, d) {
        x.isFunction(b) && (d = c, c = b, b = !1);
        var e = c ? x.map(a, c, d) : a, f = [], g = [];
        return y(e, function (c, d) {
            (b ? d && g[g.length - 1] === c : x.contains(g, c)) || (g.push(c), f.push(a[d]))
        }), f
    }, x.union = function () {
        return x.uniq(x.flatten(arguments, !0))
    }, x.intersection = function (a) {
        var b = h.call(arguments, 1);
        return x.filter(x.uniq(a), function (a) {
            return x.every(b, function (b) {
                return x.indexOf(b, a) >= 0
            })
        })
    }, x.difference = function (a) {
        var b = i.apply(d, h.call(arguments, 1));
        return x.filter(a, function (a) {
            return!x.contains(b, a)
        })
    }, x.zip = function () {
        for (var a = x.max(x.pluck(arguments, "length").concat(0)), b = new Array(a), c = 0; a > c; c++)b[c] = x.pluck(arguments, "" + c);
        return b
    }, x.object = function (a, b) {
        if (null == a)return{};
        for (var c = {}, d = 0, e = a.length; e > d; d++)b ? c[a[d]] = b[d] : c[a[d][0]] = a[d][1];
        return c
    }, x.indexOf = function (a, b, c) {
        if (null == a)return-1;
        var d = 0, e = a.length;
        if (c) {
            if ("number" != typeof c)return d = x.sortedIndex(a, b), a[d] === b ? d : -1;
            d = 0 > c ? Math.max(0, e + c) : c
        }
        if (s && a.indexOf === s)return a.indexOf(b, c);
        for (; e > d; d++)if (a[d] === b)return d;
        return-1
    }, x.lastIndexOf = function (a, b, c) {
        if (null == a)return-1;
        var d = null != c;
        if (t && a.lastIndexOf === t)return d ? a.lastIndexOf(b, c) : a.lastIndexOf(b);
        for (var e = d ? c : a.length; e--;)if (a[e] === b)return e;
        return-1
    }, x.range = function (a, b, c) {
        arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
        for (var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d); d > e;)f[e++] = a, a += c;
        return f
    };
    var E = function () {
    };
    x.bind = function (a, b) {
        var c, d;
        if (w && a.bind === w)return w.apply(a, h.call(arguments, 1));
        if (!x.isFunction(a))throw new TypeError;
        return c = h.call(arguments, 2), d = function () {
            if (!(this instanceof d))return a.apply(b, c.concat(h.call(arguments)));
            E.prototype = a.prototype;
            var e = new E;
            E.prototype = null;
            var f = a.apply(e, c.concat(h.call(arguments)));
            return Object(f) === f ? f : e
        }
    }, x.partial = function (a) {
        var b = h.call(arguments, 1);
        return function () {
            return a.apply(this, b.concat(h.call(arguments)))
        }
    }, x.bindAll = function (a) {
        var b = h.call(arguments, 1);
        if (0 === b.length)throw new Error("bindAll must be passed function names");
        return y(b, function (b) {
            a[b] = x.bind(a[b], a)
        }), a
    }, x.memoize = function (a, b) {
        var c = {};
        return b || (b = x.identity), function () {
            var d = b.apply(this, arguments);
            return x.has(c, d) ? c[d] : c[d] = a.apply(this, arguments)
        }
    }, x.delay = function (a, b) {
        var c = h.call(arguments, 2);
        return setTimeout(function () {
            return a.apply(null, c)
        }, b)
    }, x.defer = function (a) {
        return x.delay.apply(x, [a, 1].concat(h.call(arguments, 1)))
    }, x.throttle = function (a, b, c) {
        var d, e, f, g = null, h = 0;
        c || (c = {});
        var i = function () {
            h = c.leading === !1 ? 0 : new Date, g = null, f = a.apply(d, e)
        };
        return function () {
            var j = new Date;
            h || c.leading !== !1 || (h = j);
            var k = b - (j - h);
            return d = this, e = arguments, 0 >= k ? (clearTimeout(g), g = null, h = j, f = a.apply(d, e)) : g || c.trailing === !1 || (g = setTimeout(i, k)), f
        }
    }, x.debounce = function (a, b, c) {
        var d, e = null;
        return function () {
            var f = this, g = arguments, h = function () {
                e = null, c || (d = a.apply(f, g))
            }, i = c && !e;
            return clearTimeout(e), e = setTimeout(h, b), i && (d = a.apply(f, g)), d
        }
    }, x.once = function (a) {
        var b, c = !1;
        return function () {
            return c ? b : (c = !0, b = a.apply(this, arguments), a = null, b)
        }
    }, x.wrap = function (a, b) {
        return function () {
            var c = [a];
            return g.apply(c, arguments), b.apply(this, c)
        }
    }, x.compose = function () {
        var a = arguments;
        return function () {
            for (var b = arguments, c = a.length - 1; c >= 0; c--)b = [a[c].apply(this, b)];
            return b[0]
        }
    }, x.after = function (a, b) {
        return function () {
            return--a < 1 ? b.apply(this, arguments) : void 0
        }
    }, x.keys = v || function (a) {
        if (a !== Object(a))throw new TypeError("Invalid object");
        var b = [];
        for (var c in a)x.has(a, c) && b.push(c);
        return b
    }, x.values = function (a) {
        var b = [];
        for (var c in a)x.has(a, c) && b.push(a[c]);
        return b
    }, x.pairs = function (a) {
        var b = [];
        for (var c in a)x.has(a, c) && b.push([c, a[c]]);
        return b
    }, x.invert = function (a) {
        var b = {};
        for (var c in a)x.has(a, c) && (b[a[c]] = c);
        return b
    }, x.functions = x.methods = function (a) {
        var b = [];
        for (var c in a)x.isFunction(a[c]) && b.push(c);
        return b.sort()
    }, x.extend = function (a) {
        return y(h.call(arguments, 1), function (b) {
            if (b)for (var c in b)a[c] = b[c]
        }), a
    }, x.pick = function (a) {
        var b = {}, c = i.apply(d, h.call(arguments, 1));
        return y(c, function (c) {
            c in a && (b[c] = a[c])
        }), b
    }, x.omit = function (a) {
        var b = {}, c = i.apply(d, h.call(arguments, 1));
        for (var e in a)x.contains(c, e) || (b[e] = a[e]);
        return b
    }, x.defaults = function (a) {
        return y(h.call(arguments, 1), function (b) {
            if (b)for (var c in b)void 0 === a[c] && (a[c] = b[c])
        }), a
    }, x.clone = function (a) {
        return x.isObject(a) ? x.isArray(a) ? a.slice() : x.extend({}, a) : a
    }, x.tap = function (a, b) {
        return b(a), a
    };
    var F = function (a, b, c, d) {
        if (a === b)return 0 !== a || 1 / a == 1 / b;
        if (null == a || null == b)return a === b;
        a instanceof x && (a = a._wrapped), b instanceof x && (b = b._wrapped);
        var e = j.call(a);
        if (e != j.call(b))return!1;
        switch (e) {
            case"[object String]":
                return a == String(b);
            case"[object Number]":
                return a != +a ? b != +b : 0 == a ? 1 / a == 1 / b : a == +b;
            case"[object Date]":
            case"[object Boolean]":
                return+a == +b;
            case"[object RegExp]":
                return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase
        }
        if ("object" != typeof a || "object" != typeof b)return!1;
        for (var f = c.length; f--;)if (c[f] == a)return d[f] == b;
        var g = a.constructor, h = b.constructor;
        if (g !== h && !(x.isFunction(g) && g instanceof g && x.isFunction(h) && h instanceof h))return!1;
        c.push(a), d.push(b);
        var i = 0, k = !0;
        if ("[object Array]" == e) {
            if (i = a.length, k = i == b.length)for (; i-- && (k = F(a[i], b[i], c, d)););
        } else {
            for (var l in a)if (x.has(a, l) && (i++, !(k = x.has(b, l) && F(a[l], b[l], c, d))))break;
            if (k) {
                for (l in b)if (x.has(b, l) && !i--)break;
                k = !i
            }
        }
        return c.pop(), d.pop(), k
    };
    x.isEqual = function (a, b) {
        return F(a, b, [], [])
    }, x.isEmpty = function (a) {
        if (null == a)return!0;
        if (x.isArray(a) || x.isString(a))return 0 === a.length;
        for (var b in a)if (x.has(a, b))return!1;
        return!0
    }, x.isElement = function (a) {
        return!(!a || 1 !== a.nodeType)
    }, x.isArray = u || function (a) {
        return"[object Array]" == j.call(a)
    }, x.isObject = function (a) {
        return a === Object(a)
    }, y(["Arguments", "Function", "String", "Number", "Date", "RegExp"], function (a) {
        x["is" + a] = function (b) {
            return j.call(b) == "[object " + a + "]"
        }
    }), x.isArguments(arguments) || (x.isArguments = function (a) {
        return!(!a || !x.has(a, "callee"))
    }), "function" != typeof/./ && (x.isFunction = function (a) {
        return"function" == typeof a
    }), x.isFinite = function (a) {
        return isFinite(a) && !isNaN(parseFloat(a))
    }, x.isNaN = function (a) {
        return x.isNumber(a) && a != +a
    }, x.isBoolean = function (a) {
        return a === !0 || a === !1 || "[object Boolean]" == j.call(a)
    }, x.isNull = function (a) {
        return null === a
    }, x.isUndefined = function (a) {
        return void 0 === a
    }, x.has = function (a, b) {
        return k.call(a, b)
    }, x.noConflict = function () {
        return a._ = b, this
    }, x.identity = function (a) {
        return a
    }, x.times = function (a, b, c) {
        for (var d = Array(Math.max(0, a)), e = 0; a > e; e++)d[e] = b.call(c, e);
        return d
    }, x.random = function (a, b) {
        return null == b && (b = a, a = 0), a + Math.floor(Math.random() * (b - a + 1))
    };
    var G = {escape: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;"}};
    G.unescape = x.invert(G.escape);
    var H = {escape: new RegExp("[" + x.keys(G.escape).join("") + "]", "g"), unescape: new RegExp("(" + x.keys(G.unescape).join("|") + ")", "g")};
    x.each(["escape", "unescape"], function (a) {
        x[a] = function (b) {
            return null == b ? "" : ("" + b).replace(H[a], function (b) {
                return G[a][b]
            })
        }
    }), x.result = function (a, b) {
        if (null == a)return void 0;
        var c = a[b];
        return x.isFunction(c) ? c.call(a) : c
    }, x.mixin = function (a) {
        y(x.functions(a), function (b) {
            var c = x[b] = a[b];
            x.prototype[b] = function () {
                var a = [this._wrapped];
                return g.apply(a, arguments), M.call(this, c.apply(x, a))
            }
        })
    };
    var I = 0;
    x.uniqueId = function (a) {
        var b = ++I + "";
        return a ? a + b : b
    }, x.templateSettings = {evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g};
    var J = /(.)^/, K = {"'": "'", "\\": "\\", "\r": "r", "\n": "n", "	": "t", "\u2028": "u2028", "\u2029": "u2029"}, L = /\\|'|\r|\n|\t|\u2028|\u2029/g;
    x.template = function (a, b, c) {
        var d;
        c = x.defaults({}, c, x.templateSettings);
        var e = new RegExp([(c.escape || J).source, (c.interpolate || J).source, (c.evaluate || J).source].join("|") + "|$", "g"), f = 0, g = "__p+='";
        a.replace(e, function (b, c, d, e, h) {
            return g += a.slice(f, h).replace(L, function (a) {
                return"\\" + K[a]
            }), c && (g += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'"), d && (g += "'+\n((__t=(" + d + "))==null?'':__t)+\n'"), e && (g += "';\n" + e + "\n__p+='"), f = h + b.length, b
        }), g += "';\n", c.variable || (g = "with(obj||{}){\n" + g + "}\n"), g = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + g + "return __p;\n";
        try {
            d = new Function(c.variable || "obj", "_", g)
        } catch (h) {
            throw h.source = g, h
        }
        if (b)return d(b, x);
        var i = function (a) {
            return d.call(this, a, x)
        };
        return i.source = "function(" + (c.variable || "obj") + "){\n" + g + "}", i
    }, x.chain = function (a) {
        return x(a).chain()
    };
    var M = function (a) {
        return this._chain ? x(a).chain() : a
    };
    x.mixin(x), y(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (a) {
        var b = d[a];
        x.prototype[a] = function () {
            var c = this._wrapped;
            return b.apply(c, arguments), "shift" != a && "splice" != a || 0 !== c.length || delete c[0], M.call(this, c)
        }
    }), y(["concat", "join", "slice"], function (a) {
        var b = d[a];
        x.prototype[a] = function () {
            return M.call(this, b.apply(this._wrapped, arguments))
        }
    }), x.extend(x.prototype, {chain: function () {
        return this._chain = !0, this
    }, value: function () {
        return this._wrapped
    }})
}.call(this), define("underscore-src", function () {
}), define("underscore", ["underscore-src"], function () {
    var a = window._;
    return a.mixin({move: function (a, b, c) {
        return a.splice(c, 0, a.splice(b, 1)[0]), a
    }, remove: function (a, b) {
        return a.splice(b, 1), a
    }, toggleInOut: function (b, c) {
        return a.contains(b, c) ? b = a.without(b, c) : b.push(c), b
    }}), a
}), function () {
    var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v = this, w = v && v.ejs, x = Array.prototype, y = Object.prototype, z = x.slice, A = y.toString, B = y.hasOwnProperty, C = x.forEach, D = Array.isArray, E = {};
    u = "undefined" != typeof exports ? exports : v.ejs = {}, a = function (a, b) {
        return B.call(a, b)
    }, b = function (b, c, d) {
        if (null != b)if (C && b.forEach === C)b.forEach(c, d); else if (b.length === +b.length) {
            for (var e = 0, f = b.length; f > e; e++)if (c.call(d, b[e], e, b) === E)return
        } else for (var g in b)if (a(b, g) && c.call(d, b[g], g, b) === E)return
    }, c = function (a) {
        return b(z.call(arguments, 1), function (b) {
            for (var c in b)a[c] = b[c]
        }), a
    }, d = D || function (a) {
        return"[object Array]" === A.call(a)
    }, e = function (a) {
        return a === Object(a)
    }, f = function (a) {
        return"[object String]" === A.call(a)
    }, g = function (a) {
        return"[object Number]" === A.call(a)
    }, h = "function" != typeof/./ ? function (a) {
        return"function" == typeof a
    } : function (a) {
        return"[object Function]" === A.call(a)
    }, i = function (b) {
        return e(b) && a(b, "_type") && a(b, "_self") && a(b, "toString")
    }, j = function (a) {
        return i(a) && "query" === a._type()
    }, k = function (a) {
        return i(a) && "filter" === a._type()
    }, l = function (a) {
        return i(a) && "facet" === a._type()
    }, m = function (a) {
        return i(a) && "script field" === a._type()
    }, n = function (a) {
        return i(a) && "geo point" === a._type()
    }, o = function (a) {
        return i(a) && "indexed shape" === a._type()
    }, p = function (a) {
        return i(a) && "shape" === a._type()
    }, q = function (a) {
        return i(a) && "sort" === a._type()
    }, r = function (a) {
        return i(a) && "highlight" === a._type()
    }, s = function (a) {
        return i(a) && "suggest" === a._type()
    }, t = function (a) {
        return i(a) && "generator" === a._type()
    }, u.DateHistogramFacet = function (a) {
        var b = {};
        return b[a] = {date_histogram: {}}, {field: function (c) {
            return null == c ? b[a].date_histogram.field : (b[a].date_histogram.field = c, this)
        }, keyField: function (c) {
            return null == c ? b[a].date_histogram.key_field : (b[a].date_histogram.key_field = c, this)
        }, valueField: function (c) {
            return null == c ? b[a].date_histogram.value_field : (b[a].date_histogram.value_field = c, this)
        }, interval: function (c) {
            return null == c ? b[a].date_histogram.interval : (b[a].date_histogram.interval = c, this)
        }, timeZone: function (c) {
            return null == c ? b[a].date_histogram.time_zone : (b[a].date_histogram.time_zone = c, this)
        }, preZone: function (c) {
            return null == c ? b[a].date_histogram.pre_zone : (b[a].date_histogram.pre_zone = c, this)
        }, preZoneAdjustLargeInterval: function (c) {
            return null == c ? b[a].date_histogram.pre_zone_adjust_large_interval : (b[a].date_histogram.pre_zone_adjust_large_interval = c, this)
        }, postZone: function (c) {
            return null == c ? b[a].date_histogram.post_zone : (b[a].date_histogram.post_zone = c, this)
        }, preOffset: function (c) {
            return null == c ? b[a].date_histogram.pre_offset : (b[a].date_histogram.pre_offset = c, this)
        }, postOffset: function (c) {
            return null == c ? b[a].date_histogram.post_offset : (b[a].date_histogram.post_offset = c, this)
        }, factor: function (c) {
            return null == c ? b[a].date_histogram.factor : (b[a].date_histogram.factor = c, this)
        }, valueScript: function (c) {
            return null == c ? b[a].date_histogram.value_script : (b[a].date_histogram.value_script = c, this)
        }, order: function (c) {
            return null == c ? b[a].date_histogram.order : (c = c.toLowerCase(), ("time" === c || "count" === c || "total" === c) && (b[a].date_histogram.order = c), this)
        }, lang: function (c) {
            return null == c ? b[a].date_histogram.lang : (b[a].date_histogram.lang = c, this)
        }, params: function (c) {
            return null == c ? b[a].date_histogram.params : (b[a].date_histogram.params = c, this)
        }, facetFilter: function (c) {
            if (null == c)return b[a].facet_filter;
            if (!k(c))throw new TypeError("Argument must be a Filter");
            return b[a].facet_filter = c._self(), this
        }, global: function (c) {
            return null == c ? b[a].global : (b[a].global = c, this)
        }, mode: function (c) {
            return null == c ? b[a].mode : (c = c.toLowerCase(), ("collector" === c || "post" === c) && (b[a].mode = c), this)
        }, scope: function () {
            return this
        }, cacheFilter: function (c) {
            return null == c ? b[a].cache_filter : (b[a].cache_filter = c, this)
        }, nested: function (c) {
            return null == c ? b[a].nested : (b[a].nested = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"facet"
        }, _self: function () {
            return b
        }}
    }, u.FilterFacet = function (a) {
        var b = {};
        return b[a] = {}, {filter: function (c) {
            if (null == c)return b[a].filter;
            if (!k(c))throw new TypeError("Argument must be a Filter");
            return b[a].filter = c._self(), this
        }, facetFilter: function (c) {
            if (null == c)return b[a].facet_filter;
            if (!k(c))throw new TypeError("Argument must be a Filter");
            return b[a].facet_filter = c._self(), this
        }, global: function (c) {
            return null == c ? b[a].global : (b[a].global = c, this)
        }, mode: function (c) {
            return null == c ? b[a].mode : (c = c.toLowerCase(), ("collector" === c || "post" === c) && (b[a].mode = c), this)
        }, scope: function () {
            return this
        }, cacheFilter: function (c) {
            return null == c ? b[a].cache_filter : (b[a].cache_filter = c, this)
        }, nested: function (c) {
            return null == c ? b[a].nested : (b[a].nested = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"facet"
        }, _self: function () {
            return b
        }}
    }, u.GeoDistanceFacet = function (a) {
        var b = {}, c = u.GeoPoint([0, 0]), d = "location";
        return b[a] = {geo_distance: {location: c._self(), ranges: []}}, {field: function (c) {
            var e = b[a].geo_distance[d];
            return null == c ? d : (delete b[a].geo_distance[d], d = c, b[a].geo_distance[c] = e, this)
        }, point: function (e) {
            if (null == e)return c;
            if (!n(e))throw new TypeError("Argument must be a GeoPoint");
            return c = e, b[a].geo_distance[d] = e._self(), this
        }, addRange: function (c, d) {
            return 0 === arguments.length ? b[a].geo_distance.ranges : (b[a].geo_distance.ranges.push({from: c, to: d}), this)
        }, addUnboundedFrom: function (c) {
            return null == c ? b[a].geo_distance.ranges : (b[a].geo_distance.ranges.push({from: c}), this)
        }, addUnboundedTo: function (c) {
            return null == c ? b[a].geo_distance.ranges : (b[a].geo_distance.ranges.push({to: c}), this)
        }, unit: function (c) {
            return null == c ? b[a].geo_distance.unit : (c = c.toLowerCase(), ("mi" === c || "km" === c) && (b[a].geo_distance.unit = c), this)
        }, distanceType: function (c) {
            return null == c ? b[a].geo_distance.distance_type : (c = c.toLowerCase(), ("arc" === c || "plane" === c) && (b[a].geo_distance.distance_type = c), this)
        }, normalize: function (c) {
            return null == c ? b[a].geo_distance.normalize : (b[a].geo_distance.normalize = c, this)
        }, valueField: function (c) {
            return null == c ? b[a].geo_distance.value_field : (b[a].geo_distance.value_field = c, this)
        }, valueScript: function (c) {
            return null == c ? b[a].geo_distance.value_script : (b[a].geo_distance.value_script = c, this)
        }, lang: function (c) {
            return null == c ? b[a].geo_distance.lang : (b[a].geo_distance.lang = c, this)
        }, params: function (c) {
            return null == c ? b[a].geo_distance.params : (b[a].geo_distance.params = c, this)
        }, facetFilter: function (c) {
            if (null == c)return b[a].facet_filter;
            if (!k(c))throw new TypeError("Argument must be a Filter");
            return b[a].facet_filter = c._self(), this
        }, global: function (c) {
            return null == c ? b[a].global : (b[a].global = c, this)
        }, mode: function (c) {
            return null == c ? b[a].mode : (c = c.toLowerCase(), ("collector" === c || "post" === c) && (b[a].mode = c), this)
        }, scope: function () {
            return this
        }, cacheFilter: function (c) {
            return null == c ? b[a].cache_filter : (b[a].cache_filter = c, this)
        }, nested: function (c) {
            return null == c ? b[a].nested : (b[a].nested = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"facet"
        }, _self: function () {
            return b
        }}
    }, u.HistogramFacet = function (a) {
        var b = {};
        return b[a] = {histogram: {}}, {field: function (c) {
            return null == c ? b[a].histogram.field : (b[a].histogram.field = c, this)
        }, interval: function (c) {
            return null == c ? b[a].histogram.interval : (b[a].histogram.interval = c, this)
        }, timeInterval: function (c) {
            return null == c ? b[a].histogram.time_interval : (b[a].histogram.time_interval = c, this)
        }, from: function (c) {
            return null == c ? b[a].histogram.from : (b[a].histogram.from = c, this)
        }, to: function (c) {
            return null == c ? b[a].histogram.to : (b[a].histogram.to = c, this)
        }, valueField: function (c) {
            return null == c ? b[a].histogram.value_field : (b[a].histogram.value_field = c, this)
        }, keyField: function (c) {
            return null == c ? b[a].histogram.key_field : (b[a].histogram.key_field = c, this)
        }, valueScript: function (c) {
            return null == c ? b[a].histogram.value_script : (b[a].histogram.value_script = c, this)
        }, keyScript: function (c) {
            return null == c ? b[a].histogram.key_script : (b[a].histogram.key_script = c, this)
        }, lang: function (c) {
            return null == c ? b[a].histogram.lang : (b[a].histogram.lang = c, this)
        }, params: function (c) {
            return null == c ? b[a].histogram.params : (b[a].histogram.params = c, this)
        }, order: function (c) {
            return null == c ? b[a].histogram.order : (c = c.toLowerCase(), ("key" === c || "count" === c || "total" === c) && (b[a].histogram.order = c), this)
        }, facetFilter: function (c) {
            if (null == c)return b[a].facet_filter;
            if (!k(c))throw new TypeError("Argument must be a Filter");
            return b[a].facet_filter = c._self(), this
        }, global: function (c) {
            return null == c ? b[a].global : (b[a].global = c, this)
        }, mode: function (c) {
            return null == c ? b[a].mode : (c = c.toLowerCase(), ("collector" === c || "post" === c) && (b[a].mode = c), this)
        }, scope: function () {
            return this
        }, cacheFilter: function (c) {
            return null == c ? b[a].cache_filter : (b[a].cache_filter = c, this)
        }, nested: function (c) {
            return null == c ? b[a].nested : (b[a].nested = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"facet"
        }, _self: function () {
            return b
        }}
    }, u.QueryFacet = function (a) {
        var b = {};
        return b[a] = {}, {query: function (c) {
            if (null == c)return b[a].query;
            if (!j(c))throw new TypeError("Argument must be a Query");
            return b[a].query = c._self(), this
        }, facetFilter: function (c) {
            if (null == c)return b[a].facet_filter;
            if (!k(c))throw new TypeError("Argumnet must be a Filter");
            return b[a].facet_filter = c._self(), this
        }, global: function (c) {
            return null == c ? b[a].global : (b[a].global = c, this)
        }, mode: function (c) {
            return null == c ? b[a].mode : (c = c.toLowerCase(), ("collector" === c || "post" === c) && (b[a].mode = c), this)
        }, scope: function () {
            return this
        }, cacheFilter: function (c) {
            return null == c ? b[a].cache_filter : (b[a].cache_filter = c, this)
        }, nested: function (c) {
            return null == c ? b[a].nested : (b[a].nested = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"facet"
        }, _self: function () {
            return b
        }}
    }, u.RangeFacet = function (a) {
        var b = {};
        return b[a] = {range: {ranges: []}}, {field: function (c) {
            return null == c ? b[a].range.field : (b[a].range.field = c, this)
        }, keyField: function (c) {
            return null == c ? b[a].range.key_field : (b[a].range.key_field = c, this)
        }, valueField: function (c) {
            return null == c ? b[a].range.value_field : (b[a].range.value_field = c, this)
        }, valueScript: function (c) {
            return null == c ? b[a].range.value_script : (b[a].range.value_script = c, this)
        }, keyScript: function (c) {
            return null == c ? b[a].range.key_script : (b[a].range.key_script = c, this)
        }, lang: function (c) {
            return null == c ? b[a].range.lang : (b[a].range.lang = c, this)
        }, params: function (c) {
            return null == c ? b[a].range.params : (b[a].range.params = c, this)
        }, addRange: function (c, d) {
            return 0 === arguments.length ? b[a].range.ranges : (b[a].range.ranges.push({from: c, to: d}), this)
        }, addUnboundedFrom: function (c) {
            return null == c ? b[a].range.ranges : (b[a].range.ranges.push({from: c}), this)
        }, addUnboundedTo: function (c) {
            return null == c ? b[a].range.ranges : (b[a].range.ranges.push({to: c}), this)
        }, facetFilter: function (c) {
            if (null == c)return b[a].facet_filter;
            if (!k(c))throw new TypeError("Argument must be a Filter");
            return b[a].facet_filter = c._self(), this
        }, global: function (c) {
            return null == c ? b[a].global : (b[a].global = c, this)
        }, mode: function (c) {
            return null == c ? b[a].mode : (c = c.toLowerCase(), ("collector" === c || "post" === c) && (b[a].mode = c), this)
        }, scope: function () {
            return this
        }, cacheFilter: function (c) {
            return null == c ? b[a].cache_filter : (b[a].cache_filter = c, this)
        }, nested: function (c) {
            return null == c ? b[a].nested : (b[a].nested = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"facet"
        }, _self: function () {
            return b
        }}
    }, u.StatisticalFacet = function (a) {
        var b = {};
        return b[a] = {statistical: {}}, {field: function (c) {
            return null == c ? b[a].statistical.field : (b[a].statistical.field = c, this)
        }, fields: function (c) {
            if (null == c)return b[a].statistical.fields;
            if (!d(c))throw new TypeError("Argument must be an array");
            return b[a].statistical.fields = c, this
        }, script: function (c) {
            return null == c ? b[a].statistical.script : (b[a].statistical.script = c, this)
        }, lang: function (c) {
            return null == c ? b[a].statistical.lang : (b[a].statistical.lang = c, this)
        }, params: function (c) {
            return null == c ? b[a].statistical.params : (b[a].statistical.params = c, this)
        }, facetFilter: function (c) {
            if (null == c)return b[a].facet_filter;
            if (!k(c))throw new TypeError("Argument must be a Filter");
            return b[a].facet_filter = c._self(), this
        }, global: function (c) {
            return null == c ? b[a].global : (b[a].global = c, this)
        }, mode: function (c) {
            return null == c ? b[a].mode : (c = c.toLowerCase(), ("collector" === c || "post" === c) && (b[a].mode = c), this)
        }, scope: function () {
            return this
        }, cacheFilter: function (c) {
            return null == c ? b[a].cache_filter : (b[a].cache_filter = c, this)
        }, nested: function (c) {
            return null == c ? b[a].nested : (b[a].nested = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"facet"
        }, _self: function () {
            return b
        }}
    }, u.TermStatsFacet = function (a) {
        var b = {};
        return b[a] = {terms_stats: {}}, {valueField: function (c) {
            return null == c ? b[a].terms_stats.value_field : (b[a].terms_stats.value_field = c, this)
        }, keyField: function (c) {
            return null == c ? b[a].terms_stats.key_field : (b[a].terms_stats.key_field = c, this)
        }, scriptField: function (c) {
            return null == c ? b[a].terms_stats.script_field : (b[a].terms_stats.script_field = c, this)
        }, valueScript: function (c) {
            return null == c ? b[a].terms_stats.value_script : (b[a].terms_stats.value_script = c, this)
        }, allTerms: function (c) {
            return null == c ? b[a].terms_stats.all_terms : (b[a].terms_stats.all_terms = c, this)
        }, lang: function (c) {
            return null == c ? b[a].terms_stats.lang : (b[a].terms_stats.lang = c, this)
        }, params: function (c) {
            return null == c ? b[a].terms_stats.params : (b[a].terms_stats.params = c, this)
        }, size: function (c) {
            return null == c ? b[a].terms_stats.size : (b[a].terms_stats.size = c, this)
        }, order: function (c) {
            return null == c ? b[a].terms_stats.order : (c = c.toLowerCase(), ("count" === c || "term" === c || "reverse_count" === c || "reverse_term" === c || "total" === c || "reverse_total" === c || "min" === c || "reverse_min" === c || "max" === c || "reverse_max" === c || "mean" === c || "reverse_mean" === c) && (b[a].terms_stats.order = c), this)
        }, facetFilter: function (c) {
            if (null == c)return b[a].facet_filter;
            if (!k(c))throw new TypeError("Argument must be a Filter");
            return b[a].facet_filter = c._self(), this
        }, global: function (c) {
            return null == c ? b[a].global : (b[a].global = c, this)
        }, mode: function (c) {
            return null == c ? b[a].mode : (c = c.toLowerCase(), ("collector" === c || "post" === c) && (b[a].mode = c), this)
        }, scope: function () {
            return this
        }, cacheFilter: function (c) {
            return null == c ? b[a].cache_filter : (b[a].cache_filter = c, this)
        }, nested: function (c) {
            return null == c ? b[a].nested : (b[a].nested = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"facet"
        }, _self: function () {
            return b
        }}
    }, u.TermsFacet = function (a) {
        var b = {};
        return b[a] = {terms: {}}, {field: function (c) {
            return null == c ? b[a].terms.field : (b[a].terms.field = c, this)
        }, fields: function (c) {
            if (null == c)return b[a].terms.fields;
            if (!d(c))throw new TypeError("Argument must be an array");
            return b[a].terms.fields = c, this
        }, scriptField: function (c) {
            return null == c ? b[a].terms.script_field : (b[a].terms.script_field = c, this)
        }, size: function (c) {
            return null == c ? b[a].terms.size : (b[a].terms.size = c, this)
        }, order: function (c) {
            return null == c ? b[a].terms.order : (c = c.toLowerCase(), ("count" === c || "term" === c || "reverse_count" === c || "reverse_term" === c) && (b[a].terms.order = c), this)
        }, allTerms: function (c) {
            return null == c ? b[a].terms.all_terms : (b[a].terms.all_terms = c, this)
        }, exclude: function (c) {
            if (null == b[a].terms.exclude && (b[a].terms.exclude = []), null == c)return b[a].terms.exclude;
            if (f(c))b[a].terms.exclude.push(c); else {
                if (!d(c))throw new TypeError("Argument must be string or array");
                b[a].terms.exclude = c
            }
            return this
        }, regex: function (c) {
            return null == c ? b[a].terms.regex : (b[a].terms.regex = c, this)
        }, regexFlags: function (c) {
            return null == c ? b[a].terms.regex_flags : (b[a].terms.regex_flags = c, this)
        }, script: function (c) {
            return null == c ? b[a].terms.script : (b[a].terms.script = c, this)
        }, lang: function (c) {
            return null == c ? b[a].terms.lang : (b[a].terms.lang = c, this)
        }, params: function (c) {
            return null == c ? b[a].terms.params : (b[a].terms.params = c, this)
        }, executionHint: function (c) {
            return null == c ? b[a].terms.execution_hint : (b[a].terms.execution_hint = c, this)
        }, facetFilter: function (c) {
            if (null == c)return b[a].facet_filter;
            if (!k(c))throw new TypeError("Argument must be a Filter");
            return b[a].facet_filter = c._self(), this
        }, global: function (c) {
            return null == c ? b[a].global : (b[a].global = c, this)
        }, mode: function (c) {
            return null == c ? b[a].mode : (c = c.toLowerCase(), ("collector" === c || "post" === c) && (b[a].mode = c), this)
        }, scope: function () {
            return this
        }, cacheFilter: function (c) {
            return null == c ? b[a].cache_filter : (b[a].cache_filter = c, this)
        }, nested: function (c) {
            return null == c ? b[a].nested : (b[a].nested = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"facet"
        }, _self: function () {
            return b
        }}
    }, u.AndFilter = function (a) {
        var b, c, e = {and: {filters: []}};
        if (k(a))e.and.filters.push(a._self()); else {
            if (!d(a))throw new TypeError("Argument must be a Filter or Array of Filters");
            for (b = 0, c = a.length; c > b; b++) {
                if (!k(a[b]))throw new TypeError("Array must contain only Filter objects");
                e.and.filters.push(a[b]._self())
            }
        }
        return{filters: function (a) {
            var b, c;
            if (null == a)return e.and.filters;
            if (k(a))e.and.filters.push(a._self()); else {
                if (!d(a))throw new TypeError("Argument must be a Filter or an Array of Filters");
                for (e.and.filters = [], b = 0, c = a.length; c > b; b++) {
                    if (!k(a[b]))throw new TypeError("Array must contain only Filter objects");
                    e.and.filters.push(a[b]._self())
                }
            }
            return this
        }, name: function (a) {
            return null == a ? e.and._name : (e.and._name = a, this)
        }, cache: function (a) {
            return null == a ? e.and._cache : (e.and._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? e.and._cache_key : (e.and._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(e)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return e
        }}
    }, u.BoolFilter = function () {
        var a = {bool: {}};
        return{must: function (b) {
            var c, e;
            if (null == a.bool.must && (a.bool.must = []), null == b)return a.bool.must;
            if (k(b))a.bool.must.push(b._self()); else {
                if (!d(b))throw new TypeError("Argument must be a Filter or array of Filters");
                for (a.bool.must = [], c = 0, e = b.length; e > c; c++) {
                    if (!k(b[c]))throw new TypeError("Argument must be an array of Filters");
                    a.bool.must.push(b[c]._self())
                }
            }
            return this
        }, mustNot: function (b) {
            var c, e;
            if (null == a.bool.must_not && (a.bool.must_not = []), null == b)return a.bool.must_not;
            if (k(b))a.bool.must_not.push(b._self()); else {
                if (!d(b))throw new TypeError("Argument must be a Filter or array of Filters");
                for (a.bool.must_not = [], c = 0, e = b.length; e > c; c++) {
                    if (!k(b[c]))throw new TypeError("Argument must be an array of Filters");
                    a.bool.must_not.push(b[c]._self())
                }
            }
            return this
        }, should: function (b) {
            var c, e;
            if (null == a.bool.should && (a.bool.should = []), null == b)return a.bool.should;
            if (k(b))a.bool.should.push(b._self()); else {
                if (!d(b))throw new TypeError("Argument must be a Filter or array of Filters");
                for (a.bool.should = [], c = 0, e = b.length; e > c; c++) {
                    if (!k(b[c]))throw new TypeError("Argument must be an array of Filters");
                    a.bool.should.push(b[c]._self())
                }
            }
            return this
        }, name: function (b) {
            return null == b ? a.bool._name : (a.bool._name = b, this)
        }, cache: function (b) {
            return null == b ? a.bool._cache : (a.bool._cache = b, this)
        }, cacheKey: function (b) {
            return null == b ? a.bool._cache_key : (a.bool._cache_key = b, this)
        }, toString: function () {
            return JSON.stringify(a)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return a
        }}
    }, u.ExistsFilter = function (a) {
        var b = {exists: {field: a}};
        return{field: function (a) {
            return null == a ? b.exists.field : (b.exists.field = a, this)
        }, name: function (a) {
            return null == a ? b.exists._name : (b.exists._name = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.GeoBboxFilter = function (a) {
        var b = {geo_bounding_box: {}};
        return b.geo_bounding_box[a] = {}, {field: function (c) {
            var d = b.geo_bounding_box[a];
            return null == c ? a : (delete b.geo_bounding_box[a], a = c, b.geo_bounding_box[c] = d, this)
        }, topLeft: function (c) {
            if (null == c)return b.geo_bounding_box[a].top_left;
            if (!n(c))throw new TypeError("Argument must be a GeoPoint");
            return b.geo_bounding_box[a].top_left = c._self(), this
        }, bottomRight: function (c) {
            if (null == c)return b.geo_bounding_box[a].bottom_right;
            if (!n(c))throw new TypeError("Argument must be a GeoPoint");
            return b.geo_bounding_box[a].bottom_right = c._self(), this
        }, type: function (a) {
            return null == a ? b.geo_bounding_box.type : (a = a.toLowerCase(), ("memory" === a || "indexed" === a) && (b.geo_bounding_box.type = a), this)
        }, normalize: function (a) {
            return null == a ? b.geo_bounding_box.normalize : (b.geo_bounding_box.normalize = a, this)
        }, name: function (a) {
            return null == a ? b.geo_bounding_box._name : (b.geo_bounding_box._name = a, this)
        }, cache: function (a) {
            return null == a ? b.geo_bounding_box._cache : (b.geo_bounding_box._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? b.geo_bounding_box._cache_key : (b.geo_bounding_box._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.GeoDistanceFilter = function (a) {
        var b = {geo_distance: {}};
        return b.geo_distance[a] = [0, 0], {field: function (c) {
            var d = b.geo_distance[a];
            return null == c ? a : (delete b.geo_distance[a], a = c, b.geo_distance[c] = d, this)
        }, distance: function (a) {
            if (null == a)return b.geo_distance.distance;
            if (!g(a))throw new TypeError("Argument must be a numeric value");
            return b.geo_distance.distance = a, this
        }, unit: function (a) {
            return null == a ? b.geo_distance.unit : (a = a.toLowerCase(), ("mi" === a || "km" === a) && (b.geo_distance.unit = a), this)
        }, point: function (c) {
            if (null == c)return b.geo_distance[a];
            if (!n(c))throw new TypeError("Argument must be a GeoPoint");
            return b.geo_distance[a] = c._self(), this
        }, distanceType: function (a) {
            return null == a ? b.geo_distance.distance_type : (a = a.toLowerCase(), ("arc" === a || "plane" === a) && (b.geo_distance.distance_type = a), this)
        }, normalize: function (a) {
            return null == a ? b.geo_distance.normalize : (b.geo_distance.normalize = a, this)
        }, optimizeBbox: function (a) {
            return null == a ? b.geo_distance.optimize_bbox : (a = a.toLowerCase(), ("memory" === a || "indexed" === a || "none" === a) && (b.geo_distance.optimize_bbox = a), this)
        }, name: function (a) {
            return null == a ? b.geo_distance._name : (b.geo_distance._name = a, this)
        }, cache: function (a) {
            return null == a ? b.geo_distance._cache : (b.geo_distance._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? b.geo_distance._cache_key : (b.geo_distance._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.GeoDistanceRangeFilter = function (a) {
        var b = {geo_distance_range: {}};
        return b.geo_distance_range[a] = [0, 0], {field: function (c) {
            var d = b.geo_distance_range[a];
            return null == c ? a : (delete b.geo_distance_range[a], a = c, b.geo_distance_range[c] = d, this)
        }, from: function (a) {
            if (null == a)return b.geo_distance_range.from;
            if (!g(a))throw new TypeError("Argument must be a numeric value");
            return b.geo_distance_range.from = a, this
        }, to: function (a) {
            if (null == a)return b.geo_distance_range.to;
            if (!g(a))throw new TypeError("Argument must be a numeric value");
            return b.geo_distance_range.to = a, this
        }, includeLower: function (a) {
            return null == a ? b.geo_distance_range.include_lower : (b.geo_distance_range.include_lower = a, this)
        }, includeUpper: function (a) {
            return null == a ? b.geo_distance_range.include_upper : (b.geo_distance_range.include_upper = a, this)
        }, gt: function (a) {
            if (null == a)return b.geo_distance_range.gt;
            if (!g(a))throw new TypeError("Argument must be a numeric value");
            return b.geo_distance_range.gt = a, this
        }, gte: function (a) {
            if (null == a)return b.geo_distance_range.gte;
            if (!g(a))throw new TypeError("Argument must be a numeric value");
            return b.geo_distance_range.gte = a, this
        }, lt: function (a) {
            if (null == a)return b.geo_distance_range.lt;
            if (!g(a))throw new TypeError("Argument must be a numeric value");
            return b.geo_distance_range.lt = a, this
        }, lte: function (a) {
            if (null == a)return b.geo_distance_range.lte;
            if (!g(a))throw new TypeError("Argument must be a numeric value");
            return b.geo_distance_range.lte = a, this
        }, unit: function (a) {
            return null == a ? b.geo_distance_range.unit : (a = a.toLowerCase(), ("mi" === a || "km" === a) && (b.geo_distance_range.unit = a), this)
        }, point: function (c) {
            if (null == c)return b.geo_distance_range[a];
            if (!n(c))throw new TypeError("Argument must be a GeoPoint");
            return b.geo_distance_range[a] = c._self(), this
        }, distanceType: function (a) {
            return null == a ? b.geo_distance_range.distance_type : (a = a.toLowerCase(), ("arc" === a || "plane" === a) && (b.geo_distance_range.distance_type = a), this)
        }, normalize: function (a) {
            return null == a ? b.geo_distance_range.normalize : (b.geo_distance_range.normalize = a, this)
        }, optimizeBbox: function (a) {
            return null == a ? b.geo_distance_range.optimize_bbox : (a = a.toLowerCase(), ("memory" === a || "indexed" === a || "none" === a) && (b.geo_distance_range.optimize_bbox = a), this)
        }, name: function (a) {
            return null == a ? b.geo_distance_range._name : (b.geo_distance_range._name = a, this)
        }, cache: function (a) {
            return null == a ? b.geo_distance_range._cache : (b.geo_distance_range._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? b.geo_distance_range._cache_key : (b.geo_distance_range._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.GeoPolygonFilter = function (a) {
        var b = {geo_polygon: {}};
        return b.geo_polygon[a] = {points: []}, {field: function (c) {
            var d = b.geo_polygon[a];
            return null == c ? a : (delete b.geo_polygon[a], a = c, b.geo_polygon[c] = d, this)
        }, points: function (c) {
            var e, f;
            if (null == c)return b.geo_polygon[a].points;
            if (n(c))b.geo_polygon[a].points.push(c._self()); else {
                if (!d(c))throw new TypeError("Argument must be a GeoPoint or Array of GeoPoints");
                for (b.geo_polygon[a].points = [], e = 0, f = c.length; f > e; e++) {
                    if (!n(c[e]))throw new TypeError("Argument must be Array of GeoPoints");
                    b.geo_polygon[a].points.push(c[e]._self())
                }
            }
            return this
        }, normalize: function (a) {
            return null == a ? b.geo_polygon.normalize : (b.geo_polygon.normalize = a, this)
        }, name: function (a) {
            return null == a ? b.geo_polygon._name : (b.geo_polygon._name = a, this)
        }, cache: function (a) {
            return null == a ? b.geo_polygon._cache : (b.geo_polygon._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? b.geo_polygon._cache_key : (b.geo_polygon._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.GeoShapeFilter = function (a) {
        var b = {geo_shape: {}};
        return b.geo_shape[a] = {}, {field: function (c) {
            var d = b.geo_shape[a];
            return null == c ? a : (delete b.geo_shape[a], a = c, b.geo_shape[c] = d, this)
        }, shape: function (c) {
            return null == c ? b.geo_shape[a].shape : (null != b.geo_shape[a].indexed_shape && delete b.geo_shape[a].indexed_shape, b.geo_shape[a].shape = c._self(), this)
        }, indexedShape: function (c) {
            return null == c ? b.geo_shape[a].indexed_shape : (null != b.geo_shape[a].shape && delete b.geo_shape[a].shape, b.geo_shape[a].indexed_shape = c._self(), this)
        }, relation: function (c) {
            return null == c ? b.geo_shape[a].relation : (c = c.toLowerCase(), ("intersects" === c || "disjoint" === c || "within" === c) && (b.geo_shape[a].relation = c), this)
        }, strategy: function (c) {
            return null == c ? b.geo_shape[a].strategy : (c = c.toLowerCase(), ("recursive" === c || "term" === c) && (b.geo_shape[a].strategy = c), this)
        }, name: function (a) {
            return null == a ? b.geo_shape._name : (b.geo_shape._name = a, this)
        }, cache: function (a) {
            return null == a ? b.geo_shape._cache : (b.geo_shape._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? b.geo_shape._cache_key : (b.geo_shape._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.HasChildFilter = function (a, b) {
        if (!j(a))throw new TypeError("No Query object found");
        var c = {has_child: {query: a._self(), type: b}};
        return{query: function (a) {
            if (null == a)return c.has_child.query;
            if (!j(a))throw new TypeError("Argument must be a Query object");
            return c.has_child.query = a._self(), this
        }, filter: function (a) {
            if (null == a)return c.has_child.filter;
            if (!k(a))throw new TypeError("Argument must be a Filter object");
            return c.has_child.filter = a._self(), this
        }, type: function (a) {
            return null == a ? c.has_child.type : (c.has_child.type = a, this)
        }, scope: function () {
            return this
        }, name: function (a) {
            return null == a ? c.has_child._name : (c.has_child._name = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return c
        }}
    }, u.HasParentFilter = function (a, b) {
        if (!j(a))throw new TypeError("No Query object found");
        var c = {has_parent: {query: a._self(), parent_type: b}};
        return{query: function (a) {
            if (null == a)return c.has_parent.query;
            if (!j(a))throw new TypeError("Argument must be a Query object");
            return c.has_parent.query = a._self(), this
        }, filter: function (a) {
            if (null == a)return c.has_parent.filter;
            if (!k(a))throw new TypeError("Argument must be a Filter object");
            return c.has_parent.filter = a._self(), this
        }, parentType: function (a) {
            return null == a ? c.has_parent.parent_type : (c.has_parent.parent_type = a, this)
        }, scope: function () {
            return this
        }, name: function (a) {
            return null == a ? c.has_parent._name : (c.has_parent._name = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return c
        }}
    }, u.IdsFilter = function (a) {
        var b = {ids: {}};
        if (f(a))b.ids.values = [a]; else {
            if (!d(a))throw new TypeError("Argument must be a string or an array");
            b.ids.values = a
        }
        return{values: function (a) {
            if (null == a)return b.ids.values;
            if (f(a))b.ids.values.push(a); else {
                if (!d(a))throw new TypeError("Argument must be a string or an array");
                b.ids.values = a
            }
            return this
        }, type: function (a) {
            if (null == b.ids.type && (b.ids.type = []), null == a)return b.ids.type;
            if (f(a))b.ids.type.push(a); else {
                if (!d(a))throw new TypeError("Argument must be a string or an array");
                b.ids.type = a
            }
            return this
        }, name: function (a) {
            return null == a ? b.ids._name : (b.ids._name = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.IndicesFilter = function (a, b) {
        if (!k(a))throw new TypeError("Argument must be a Filter");
        var c = {indices: {filter: a._self()}};
        if (f(b))c.indices.indices = [b]; else {
            if (!d(b))throw new TypeError("Argument must be a string or array");
            c.indices.indices = b
        }
        return{indices: function (a) {
            if (null == a)return c.indices.indices;
            if (f(a))c.indices.indices.push(a); else {
                if (!d(a))throw new TypeError("Argument must be a string or array");
                c.indices.indices = a
            }
            return this
        }, filter: function (a) {
            if (null == a)return c.indices.filter;
            if (!k(a))throw new TypeError("Argument must be a Filter");
            return c.indices.filter = a._self(), this
        }, noMatchFilter: function (a) {
            if (null == a)return c.indices.no_match_filter;
            if (f(a))a = a.toLowerCase(), ("none" === a || "all" === a) && (c.indices.no_match_filter = a); else {
                if (!k(a))throw new TypeError("Argument must be string or Filter");
                c.indices.no_match_filter = a._self()
            }
            return this
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return c
        }}
    }, u.LimitFilter = function (a) {
        var b = {limit: {value: a}};
        return{value: function (a) {
            if (null == a)return b.limit.value;
            if (!g(a))throw new TypeError("Argument must be a numeric value");
            return b.limit.value = a, this
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.MatchAllFilter = function () {
        var a = {match_all: {}};
        return{toString: function () {
            return JSON.stringify(a)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return a
        }}
    }, u.MissingFilter = function (a) {
        var b = {missing: {field: a}};
        return{field: function (a) {
            return null == a ? b.missing.field : (b.missing.field = a, this)
        }, existence: function (a) {
            return null == a ? b.missing.existence : (b.missing.existence = a, this)
        }, nullValue: function (a) {
            return null == a ? b.missing.null_value : (b.missing.null_value = a, this)
        }, name: function (a) {
            return null == a ? b.missing._name : (b.missing._name = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.NestedFilter = function (a) {
        var b = {nested: {path: a}};
        return{path: function (a) {
            return null == a ? b.nested.path : (b.nested.path = a, this)
        }, query: function (a) {
            if (null == a)return b.nested.query;
            if (!j(a))throw new TypeError("Argument must be a Query object");
            return b.nested.query = a._self(), this
        }, filter: function (a) {
            if (null == a)return b.nested.filter;
            if (!k(a))throw new TypeError("Argument must be a Filter object");
            return b.nested.filter = a._self(), this
        }, boost: function (a) {
            return null == a ? b.nested.boost : (b.nested.boost = a, this)
        }, join: function (a) {
            return null == a ? b.nested.join : (b.nested.join = a, this)
        }, scope: function () {
            return this
        }, name: function (a) {
            return null == a ? b.nested._name : (b.nested._name = a, this)
        }, cache: function (a) {
            return null == a ? b.nested._cache : (b.nested._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? b.nested._cache_key : (b.nested._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.NotFilter = function (a) {
        if (!k(a))throw new TypeError("Argument must be a Filter");
        var b = {not: a._self()};
        return{filter: function (a) {
            if (null == a)return b.not;
            if (!k(a))throw new TypeError("Argument must be a Filter");
            return b.not = a._self(), this
        }, name: function (a) {
            return null == a ? b.not._name : (b.not._name = a, this)
        }, cache: function (a) {
            return null == a ? b.not._cache : (b.not._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? b.not._cache_key : (b.not._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.NumericRangeFilter = function (a) {
        var b = {numeric_range: {}};
        return b.numeric_range[a] = {}, {field: function (c) {
            var d = b.numeric_range[a];
            return null == c ? a : (delete b.numeric_range[a], a = c, b.numeric_range[a] = d, this)
        }, from: function (c) {
            if (null == c)return b.numeric_range[a].from;
            if (!g(c))throw new TypeError("Argument must be a numeric value");
            return b.numeric_range[a].from = c, this
        }, to: function (c) {
            if (null == c)return b.numeric_range[a].to;
            if (!g(c))throw new TypeError("Argument must be a numeric value");
            return b.numeric_range[a].to = c, this
        }, includeLower: function (c) {
            return null == c ? b.numeric_range[a].include_lower : (b.numeric_range[a].include_lower = c, this)
        }, includeUpper: function (c) {
            return null == c ? b.numeric_range[a].include_upper : (b.numeric_range[a].include_upper = c, this)
        }, gt: function (c) {
            if (null == c)return b.numeric_range[a].gt;
            if (!g(c))throw new TypeError("Argument must be a numeric value");
            return b.numeric_range[a].gt = c, this
        }, gte: function (c) {
            if (null == c)return b.numeric_range[a].gte;
            if (!g(c))throw new TypeError("Argument must be a numeric value");
            return b.numeric_range[a].gte = c, this
        }, lt: function (c) {
            if (null == c)return b.numeric_range[a].lt;
            if (!g(c))throw new TypeError("Argument must be a numeric value");
            return b.numeric_range[a].lt = c, this
        }, lte: function (c) {
            if (null == c)return b.numeric_range[a].lte;
            if (!g(c))throw new TypeError("Argument must be a numeric value");
            return b.numeric_range[a].lte = c, this
        }, name: function (a) {
            return null == a ? b.numeric_range._name : (b.numeric_range._name = a, this)
        }, cache: function (a) {
            return null == a ? b.numeric_range._cache : (b.numeric_range._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? b.numeric_range._cache_key : (b.numeric_range._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.OrFilter = function (a) {
        var b, c, e;
        if (b = {or: {filters: []}}, k(a))b.or.filters.push(a._self()); else {
            if (!d(a))throw new TypeError("Argument must be a Filter or array of Filters");
            for (c = 0, e = a.length; e > c; c++) {
                if (!k(a[c]))throw new TypeError("Argument must be array of Filters");
                b.or.filters.push(a[c]._self())
            }
        }
        return{filters: function (a) {
            var c, e;
            if (null == a)return b.or.filters;
            if (k(a))b.or.filters.push(a._self()); else {
                if (!d(a))throw new TypeError("Argument must be a Filter or array of Filters");
                for (b.or.filters = [], c = 0, e = a.length; e > c; c++) {
                    if (!k(a[c]))throw new TypeError("Argument must be an array of Filters");
                    b.or.filters.push(a[c]._self())
                }
            }
            return this
        }, name: function (a) {
            return null == a ? b.or._name : (b.or._name = a, this)
        }, cache: function (a) {
            return null == a ? b.or._cache : (b.or._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? b.or._cache_key : (b.or._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.PrefixFilter = function (a, b) {
        var c = {prefix: {}};
        return c.prefix[a] = b, {field: function (b) {
            var d = c.prefix[a];
            return null == b ? a : (delete c.prefix[a], a = b, c.prefix[a] = d, this)
        }, prefix: function (b) {
            return null == b ? c.prefix[a] : (c.prefix[a] = b, this)
        }, name: function (a) {
            return null == a ? c.prefix._name : (c.prefix._name = a, this)
        }, cache: function (a) {
            return null == a ? c.prefix._cache : (c.prefix._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? c.prefix._cache_key : (c.prefix._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return c
        }}
    }, u.QueryFilter = function (a) {
        if (!j(a))throw new TypeError("Argument must be a Query");
        var b = {fquery: {query: a._self()}};
        return{query: function (a) {
            if (null == a)return b.fquery.query;
            if (!j(a))throw new TypeError("Argument must be a Query");
            return b.fquery.query = a._self(), this
        }, name: function (a) {
            return null == a ? b.fquery._name : (b.fquery._name = a, this)
        }, cache: function (a) {
            return null == a ? b.fquery._cache : (b.fquery._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? b.fquery._cache_key : (b.fquery._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.RangeFilter = function (a) {
        var b = {range: {}};
        return b.range[a] = {}, {field: function (c) {
            var d = b.range[a];
            return null == c ? a : (delete b.range[a], a = c, b.range[c] = d, this)
        }, from: function (c) {
            return null == c ? b.range[a].from : (b.range[a].from = c, this)
        }, to: function (c) {
            return null == c ? b.range[a].to : (b.range[a].to = c, this)
        }, includeLower: function (c) {
            return null == c ? b.range[a].include_lower : (b.range[a].include_lower = c, this)
        }, includeUpper: function (c) {
            return null == c ? b.range[a].include_upper : (b.range[a].include_upper = c, this)
        }, gt: function (c) {
            return null == c ? b.range[a].gt : (b.range[a].gt = c, this)
        }, gte: function (c) {
            return null == c ? b.range[a].gte : (b.range[a].gte = c, this)
        }, lt: function (c) {
            return null == c ? b.range[a].lt : (b.range[a].lt = c, this)
        }, lte: function (c) {
            return null == c ? b.range[a].lte : (b.range[a].lte = c, this)
        }, name: function (a) {
            return null == a ? b.range._name : (b.range._name = a, this)
        }, cache: function (a) {
            return null == a ? b.range._cache : (b.range._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? b.range._cache_key : (b.range._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.RegexpFilter = function (a, b) {
        var c = {regexp: {}};
        return c.regexp[a] = {value: b}, {field: function (b) {
            var d = c.regexp[a];
            return null == b ? a : (delete c.regexp[a], a = b, c.regexp[b] = d, this)
        }, value: function (b) {
            return null == b ? c.regexp[a].value : (c.regexp[a].value = b, this)
        }, flags: function (b) {
            return null == b ? c.regexp[a].flags : (c.regexp[a].flags = b, this)
        }, flagsValue: function (b) {
            return null == b ? c.regexp[a].flags_value : (c.regexp[a].flags_value = b, this)
        }, name: function (a) {
            return null == a ? c.regexp._name : (c.regexp._name = a, this)
        }, cache: function (a) {
            return null == a ? c.regexp._cache : (c.regexp._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? c.regexp._cache_key : (c.regexp._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return c
        }}
    }, u.ScriptFilter = function (a) {
        var b = {script: {script: a}};
        return{script: function (a) {
            return null == a ? b.script.script : (b.script.script = a, this)
        }, params: function (a) {
            return null == a ? b.script.params : (b.script.params = a, this)
        }, lang: function (a) {
            return null == a ? b.script.lang : (b.script.lang = a, this)
        }, name: function (a) {
            return null == a ? b.script._name : (b.script._name = a, this)
        }, cache: function (a) {
            return null == a ? b.script._cache : (b.script._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? b.script._cache_key : (b.script._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.TermFilter = function (a, b) {
        var c = {term: {}};
        return c.term[a] = b, {field: function (b) {
            var d = c.term[a];
            return null == b ? a : (delete c.term[a], a = b, c.term[a] = d, this)
        }, term: function (b) {
            return null == b ? c.term[a] : (c.term[a] = b, this)
        }, name: function (a) {
            return null == a ? c.term._name : (c.term._name = a, this)
        }, cache: function (a) {
            return null == a ? c.term._cache : (c.term._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? c.term._cache_key : (c.term._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return c
        }}
    }, u.TermsFilter = function (a, b) {
        var c = {terms: {}}, e = function () {
            d(c.terms[a]) || (c.terms[a] = [])
        }, f = function () {
            d(c.terms[a]) && (c.terms[a] = {})
        };
        return c.terms[a] = d(b) ? b : [b], {field: function (b) {
            var d = c.terms[a];
            return null == b ? a : (delete c.terms[a], a = b, c.terms[b] = d, this)
        }, terms: function (b) {
            return e(), null == b ? c.terms[a] : (d(b) ? c.terms[a] = b : c.terms[a].push(b), this)
        }, index: function (b) {
            return f(), null == b ? c.terms[a].index : (c.terms[a].index = b, this)
        }, type: function (b) {
            return f(), null == b ? c.terms[a].type : (c.terms[a].type = b, this)
        }, id: function (b) {
            return f(), null == b ? c.terms[a].id : (c.terms[a].id = b, this)
        }, path: function (b) {
            return f(), null == b ? c.terms[a].path : (c.terms[a].path = b, this)
        }, execution: function (a) {
            return null == a ? c.terms.execution : (a = a.toLowerCase(), ("plain" === a || "bool" === a || "bool_nocache" === a || "and" === a || "and_nocache" === a || "or" === a || "or_nocache" === a) && (c.terms.execution = a), this)
        }, name: function (a) {
            return null == a ? c.terms._name : (c.terms._name = a, this)
        }, cache: function (a) {
            return null == a ? c.terms._cache : (c.terms._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? c.terms._cache_key : (c.terms._cache_key = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return c
        }}
    }, u.TypeFilter = function (a) {
        var b = {type: {value: a}};
        return{type: function (a) {
            return null == a ? b.type.value : (b.type.value = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"filter"
        }, _self: function () {
            return b
        }}
    }, u.Document = function (b, c, g) {
        var h = {}, i = function () {
            var b = j(), c = [];
            for (var d in b)a(b, d) && c.push(d + "=" + encodeURIComponent(b[d]));
            return c.join("&")
        }, j = function () {
            var b = {};
            for (var c in h)if (a(h, c) && "upsert" !== c && "source" !== c && "script" !== c && "lang" !== c && "params" !== c) {
                var e = h[c];
                d(e) && (e = e.join()), b[c] = e
            }
            return b
        };
        return{index: function (a) {
            return null == a ? b : (b = a, this)
        }, type: function (a) {
            return null == a ? c : (c = a, this)
        }, id: function (a) {
            return null == a ? g : (g = a, this)
        }, routing: function (a) {
            return null == a ? h.routing : (h.routing = a, this)
        }, parent: function (a) {
            return null == a ? h.parent : (h.parent = a, this)
        }, timestamp: function (a) {
            return null == a ? h.timestamp : (h.timestamp = a, this)
        }, ttl: function (a) {
            return null == a ? h.ttl : (h.ttl = a, this)
        }, timeout: function (a) {
            return null == a ? h.timeout : (h.timeout = a, this)
        }, refresh: function (a) {
            return null == a ? h.refresh : (h.refresh = a, this)
        }, version: function (a) {
            return null == a ? h.version : (h.version = a, this)
        }, versionType: function (a) {
            return null == a ? h.version_type : (a = a.toLowerCase(), ("internal" === a || "external" === a) && (h.version_type = a), this)
        }, percolate: function (a) {
            return null == a ? h.percolate : (h.percolate = a, this)
        }, opType: function (a) {
            return null == a ? h.op_type : (a = a.toLowerCase(), ("index" === a || "create" === a) && (h.op_type = a), this)
        }, replication: function (a) {
            return null == a ? h.replication : (a = a.toLowerCase(), ("async" === a || "sync" === a || "default" === a) && (h.replication = a), this)
        }, consistency: function (a) {
            return null == a ? h.consistency : (a = a.toLowerCase(), ("default" === a || "one" === a || "quorum" === a || "all" === a) && (h.consistency = a), this)
        }, preference: function (a) {
            return null == a ? h.preference : (h.preference = a, this)
        }, realtime: function (a) {
            return null == a ? h.realtime : (h.realtime = a, this)
        }, fields: function (a) {
            if (null == h.fields && (h.fields = []), null == a)return h.fields;
            if (f(a))h.fields.push(a); else {
                if (!d(a))throw new TypeError("Argument must be string or array");
                h.fields = a
            }
            return this
        }, script: function (a) {
            return null == a ? h.script : (h.script = a, this)
        }, lang: function (a) {
            return null == a ? h.lang : (h.lang = a, this)
        }, params: function (a) {
            if (null == a)return h.params;
            if (!e(a))throw new TypeError("Argument must be an object");
            return h.params = a, this
        }, retryOnConflict: function (a) {
            return null == a ? h.retry_on_conflict : (h.retry_on_conflict = a, this)
        }, upsert: function (a) {
            if (null == a)return h.upsert;
            if (!e(a))throw new TypeError("Argument must be an object");
            return h.upsert = a, this
        }, source: function (a) {
            if (null == a)return h.source;
            if (!e(a))throw new TypeError("Argument must be an object");
            return h.source = a, this
        }, toString: function () {
            return JSON.stringify(h)
        }, _type: function () {
            return"document"
        }, _self: function () {
            return h
        }, doGet: function (a, d) {
            if (null == u.client)throw new Error("No Client Set");
            if (null == b || null == c || null == g)throw new Error("Index, Type, and ID must be set");
            var e = "/" + b + "/" + c + "/" + g;
            return u.client.get(e, j(), a, d)
        }, doIndex: function (a, d) {
            if (null == u.client)throw new Error("No Client Set");
            if (null == b || null == c)throw new Error("Index and Type must be set");
            if (null == h.source)throw new Error("No source document found");
            var e, f = "/" + b + "/" + c, j = JSON.stringify(h.source), k = i();
            return null != g && (f = f + "/" + g), "" !== k && (f = f + "?" + k), e = null == g ? u.client.post(f, j, a, d) : u.client.put(f, j, a, d)
        }, doUpdate: function (a, d) {
            if (null == u.client)throw new Error("No Client Set");
            if (null == b || null == c || null == g)throw new Error("Index, Type, and ID must be set");
            if (null == h.script && null == h.source)throw new Error("Update script or document required");
            var e = "/" + b + "/" + c + "/" + g + "/_update", f = {}, j = i();
            return"" !== j && (e = e + "?" + j), null != h.script && (f.script = h.script), null != h.lang && (f.lang = h.lang), null != h.params && (f.params = h.params), null != h.upsert && (f.upsert = h.upsert), null != h.source && (f.doc = h.source), u.client.post(e, JSON.stringify(f), a, d)
        }, doDelete: function (a, d) {
            if (null == u.client)throw new Error("No Client Set");
            if (null == b || null == c || null == g)throw new Error("Index, Type, and ID must be set");
            var e = "/" + b + "/" + c + "/" + g, f = "", h = i();
            return"" !== h && (e = e + "?" + h), u.client.del(e, f, a, d)
        }}
    }, u.BoolQuery = function () {
        var a = {bool: {}};
        return{must: function (b) {
            var c, e;
            if (null == a.bool.must && (a.bool.must = []), null == b)return a.bool.must;
            if (j(b))a.bool.must.push(b._self()); else {
                if (!d(b))throw new TypeError("Argument must be a Query or array of Queries");
                for (a.bool.must = [], c = 0, e = b.length; e > c; c++) {
                    if (!j(b[c]))throw new TypeError("Argument must be an array of Queries");
                    a.bool.must.push(b[c]._self())
                }
            }
            return this
        }, mustNot: function (b) {
            var c, e;
            if (null == a.bool.must_not && (a.bool.must_not = []), null == b)return a.bool.must_not;
            if (j(b))a.bool.must_not.push(b._self()); else {
                if (!d(b))throw new TypeError("Argument must be a Query or array of Queries");
                for (a.bool.must_not = [], c = 0, e = b.length; e > c; c++) {
                    if (!j(b[c]))throw new TypeError("Argument must be an array of Queries");
                    a.bool.must_not.push(b[c]._self())
                }
            }
            return this
        }, should: function (b) {
            var c, e;
            if (null == a.bool.should && (a.bool.should = []), null == b)return a.bool.should;
            if (j(b))a.bool.should.push(b._self()); else {
                if (!d(b))throw new TypeError("Argument must be a Query or array of Queries");
                for (a.bool.should = [], c = 0, e = b.length; e > c; c++) {
                    if (!j(b[c]))throw new TypeError("Argument must be an array of Queries");
                    a.bool.should.push(b[c]._self())
                }
            }
            return this
        }, boost: function (b) {
            return null == b ? a.bool.boost : (a.bool.boost = b, this)
        }, disableCoord: function (b) {
            return null == b ? a.bool.disable_coord : (a.bool.disable_coord = b, this)
        }, minimumNumberShouldMatch: function (b) {
            return null == b ? a.bool.minimum_number_should_match : (a.bool.minimum_number_should_match = b, this)
        }, toString: function () {
            return JSON.stringify(a)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return a
        }}
    }, u.BoostingQuery = function (a, b, c) {
        if (!j(a) || !j(b))throw new TypeError("Arguments must be Queries");
        var d = {boosting: {positive: a._self(), negative: b._self(), negative_boost: c}};
        return{positive: function (a) {
            if (null == a)return d.boosting.positive;
            if (!j(a))throw new TypeError("Argument must be a Query");
            return d.boosting.positive = a._self(), this
        }, negative: function (a) {
            if (null == a)return d.boosting.negative;
            if (!j(a))throw new TypeError("Argument must be a Query");
            return d.boosting.negative = a._self(), this
        }, negativeBoost: function (a) {
            return null == a ? d.boosting.negative_boost : (d.boosting.negative_boost = a, this)
        }, boost: function (a) {
            return null == a ? d.boosting.boost : (d.boosting.boost = a, this)
        }, toString: function () {
            return JSON.stringify(d)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return d
        }}
    }, u.CommonTermsQuery = function (a, b) {
        var c = {common: {}};
        return null == a && (a = "no_field_set"), c.common[a] = {}, null != b && (c.common[a].query = b), {field: function (b) {
            var d = c.common[a];
            return null == b ? a : (delete c.common[a], a = b, c.common[b] = d, this)
        }, query: function (b) {
            return null == b ? c.common[a].query : (c.common[a].query = b, this)
        }, analyzer: function (b) {
            return null == b ? c.common[a].analyzer : (c.common[a].analyzer = b, this)
        }, disableCoords: function (b) {
            return null == b ? c.common[a].disable_coords : (c.common[a].disable_coords = b, this)
        }, cutoffFrequency: function (b) {
            return null == b ? c.common[a].cutoff_frequency : (c.common[a].cutoff_frequency = b, this)
        }, highFreqOperator: function (b) {
            return null == b ? c.common[a].high_freq_operator : (b = b.toLowerCase(), ("and" === b || "or" === b) && (c.common[a].high_freq_operator = b), this)
        }, lowFreqOperator: function (b) {
            return null == b ? c.common[a].low_freq_operator : (b = b.toLowerCase(), ("and" === b || "or" === b) && (c.common[a].low_freq_operator = b), this)
        }, minimumShouldMatch: function (b) {
            return null == b ? c.common[a].minimum_should_match : (c.common[a].minimum_should_match = b, this)
        }, boost: function (b) {
            return null == b ? c.common[a].boost : (c.common[a].boost = b, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.ConstantScoreQuery = function () {
        var a = {constant_score: {}};
        return{query: function (b) {
            if (null == b)return a.constant_score.query;
            if (!j(b))throw new TypeError("Argument must be a Query");
            return a.constant_score.query = b._self(), this
        }, filter: function (b) {
            if (null == b)return a.constant_score.filter;
            if (!k(b))throw new TypeError("Argument must be a Filter");
            return a.constant_score.filter = b._self(), this
        }, cache: function (b) {
            return null == b ? a.constant_score._cache : (a.constant_score._cache = b, this)
        }, cacheKey: function (b) {
            return null == b ? a.constant_score._cache_key : (a.constant_score._cache_key = b, this)
        }, boost: function (b) {
            return null == b ? a.constant_score.boost : (a.constant_score.boost = b, this)
        }, toString: function () {
            return JSON.stringify(a)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return a
        }}
    }, u.CustomBoostFactorQuery = function (a) {
        if (!j(a))throw new TypeError("Argument must be a Query");
        var b = {custom_boost_factor: {query: a._self()}};
        return{query: function (a) {
            if (null == a)return b.custom_boost_factor.query;
            if (!j(a))throw new TypeError("Argument must be a Query");
            return b.custom_boost_factor.query = a._self(), this
        }, boostFactor: function (a) {
            return null == a ? b.custom_boost_factor.boost_factor : (b.custom_boost_factor.boost_factor = a, this)
        }, boost: function (a) {
            return null == a ? b.custom_boost_factor.boost : (b.custom_boost_factor.boost = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return b
        }}
    }, u.CustomFiltersScoreQuery = function (a, c) {
        if (!j(a))throw new TypeError("Argument must be a Query");
        var e = {custom_filters_score: {query: a._self(), filters: []}}, f = function (a) {
            var b = null;
            return a.filter && k(a.filter) && (b = {filter: a.filter._self()}, a.boost ? b.boost = a.boost : a.script ? b.script = a.script : b = null), b
        };
        return b(d(c) ? c : [c], function (a) {
            var b = f(a);
            null !== b && e.custom_filters_score.filters.push(b)
        }), {query: function (a) {
            if (null == a)return e.custom_filters_score.query;
            if (!j(a))throw new TypeError("Argument must be a Query");
            return e.custom_filters_score.query = a._self(), this
        }, filters: function (a) {
            return null == a ? e.custom_filters_score.filters : (d(a) && (e.custom_filters_score.filters = []), b(d(a) ? a : [a], function (a) {
                var b = f(a);
                null !== b && e.custom_filters_score.filters.push(b)
            }), this)
        }, scoreMode: function (a) {
            return null == a ? e.custom_filters_score.score_mode : (a = a.toLowerCase(), ("first" === a || "min" === a || "max" === a || "total" === a || "avg" === a || "multiply" === a) && (e.custom_filters_score.score_mode = a), this)
        }, params: function (a) {
            return null == a ? e.custom_filters_score.params : (e.custom_filters_score.params = a, this)
        }, lang: function (a) {
            return null == a ? e.custom_filters_score.lang : (e.custom_filters_score.lang = a, this)
        }, maxBoost: function (a) {
            return null == a ? e.custom_filters_score.max_boost : (e.custom_filters_score.max_boost = a, this)
        }, boost: function (a) {
            return null == a ? e.custom_filters_score.boost : (e.custom_filters_score.boost = a, this)
        }, toString: function () {
            return JSON.stringify(e)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return e
        }}
    }, u.CustomScoreQuery = function (a, b) {
        if (!j(a))throw new TypeError("Argument must be a Query");
        var c = {custom_score: {query: a._self(), script: b}};
        return{query: function (a) {
            if (null == a)return c.custom_score.query;
            if (!j(a))throw new TypeError("Argument must be a Query");
            return c.custom_score.query = a._self(), this
        }, script: function (a) {
            return null == a ? c.custom_score.script : (c.custom_score.script = a, this)
        }, params: function (a) {
            return null == a ? c.custom_score.params : (c.custom_score.params = a, this)
        }, lang: function (a) {
            return null == a ? c.custom_score.lang : (c.custom_score.lang = a, this)
        }, boost: function (a) {
            return null == a ? c.custom_score.boost : (c.custom_score.boost = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.DisMaxQuery = function () {
        var a = {dis_max: {}};
        return{queries: function (b) {
            var c, e;
            if (null == b)return a.dis_max.queries;
            if (null == a.dis_max.queries && (a.dis_max.queries = []), j(b))a.dis_max.queries.push(b._self()); else {
                if (!d(b))throw new TypeError("Argument must be a Query or array of Queries");
                for (a.dis_max.queries = [], c = 0, e = b.length; e > c; c++) {
                    if (!j(b[c]))throw new TypeError("Argument must be array of Queries");
                    a.dis_max.queries.push(b[c]._self())
                }
            }
            return this
        }, boost: function (b) {
            return null == b ? a.dis_max.boost : (a.dis_max.boost = b, this)
        }, tieBreaker: function (b) {
            return null == b ? a.dis_max.tie_breaker : (a.dis_max.tie_breaker = b, this)
        }, toString: function () {
            return JSON.stringify(a)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return a
        }}
    }, u.FieldMaskingSpanQuery = function (a, b) {
        if (!j(a))throw new TypeError("Argument must be a SpanQuery");
        var c = {field_masking_span: {query: a._self(), field: b}};
        return{query: function (a) {
            if (null == a)return c.field_masking_span.query;
            if (!j(a))throw new TypeError("Argument must be a SpanQuery");
            return c.field_masking_span.query = a._self(), this
        }, field: function (a) {
            return null == a ? c.field_masking_span.field : (c.field_masking_span.field = a, this)
        }, boost: function (a) {
            return null == a ? c.field_masking_span.boost : (c.field_masking_span.boost = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.FieldQuery = function (a, b) {
        var c = {field: {}};
        return c.field[a] = {query: b}, {field: function (b) {
            var d = c.field[a];
            return null == b ? a : (delete c.field[a], a = b, c.field[b] = d, this)
        }, query: function (b) {
            return null == b ? c.field[a].query : (c.field[a].query = b, this)
        }, defaultOperator: function (b) {
            return null == b ? c.field[a].default_operator : (b = b.toUpperCase(), ("AND" === b || "OR" === b) && (c.field[a].default_operator = b), this)
        }, analyzer: function (b) {
            return null == b ? c.field[a].analyzer : (c.field[a].analyzer = b, this)
        }, quoteAnalyzer: function (b) {
            return null == b ? c.field[a].quote_analyzer : (c.field[a].quote_analyzer = b, this)
        }, autoGeneratePhraseQueries: function (b) {
            return null == b ? c.field[a].auto_generate_phrase_queries : (c.field[a].auto_generate_phrase_queries = b, this)
        }, allowLeadingWildcard: function (b) {
            return null == b ? c.field[a].allow_leading_wildcard : (c.field[a].allow_leading_wildcard = b, this)
        }, lowercaseExpandedTerms: function (b) {
            return null == b ? c.field[a].lowercase_expanded_terms : (c.field[a].lowercase_expanded_terms = b, this)
        }, enablePositionIncrements: function (b) {
            return null == b ? c.field[a].enable_position_increments : (c.field[a].enable_position_increments = b, this)
        }, fuzzyMinSim: function (b) {
            return null == b ? c.field[a].fuzzy_min_sim : (c.field[a].fuzzy_min_sim = b, this)
        }, boost: function (b) {
            return null == b ? c.field[a].boost : (c.field[a].boost = b, this)
        }, fuzzyPrefixLength: function (b) {
            return null == b ? c.field[a].fuzzy_prefix_length : (c.field[a].fuzzy_prefix_length = b, this)
        }, fuzzyMaxExpansions: function (b) {
            return null == b ? c.field[a].fuzzy_max_expansions : (c.field[a].fuzzy_max_expansions = b, this)
        }, fuzzyRewrite: function (b) {
            return null == b ? c.field[a].fuzzy_rewrite : (b = b.toLowerCase(), ("constant_score_auto" === b || "scoring_boolean" === b || "constant_score_boolean" === b || "constant_score_filter" === b || 0 === b.indexOf("top_terms_boost_") || 0 === b.indexOf("top_terms_")) && (c.field[a].fuzzy_rewrite = b), this)
        }, rewrite: function (b) {
            return null == b ? c.field[a].rewrite : (b = b.toLowerCase(), ("constant_score_auto" === b || "scoring_boolean" === b || "constant_score_boolean" === b || "constant_score_filter" === b || 0 === b.indexOf("top_terms_boost_") || 0 === b.indexOf("top_terms_")) && (c.field[a].rewrite = b), this)
        }, quoteFieldSuffix: function (b) {
            return null == b ? c.field[a].quote_field_suffix : (c.field[a].quote_field_suffix = b, this)
        }, phraseSlop: function (b) {
            return null == b ? c.field[a].phrase_slop : (c.field[a].phrase_slop = b, this)
        }, analyzeWildcard: function (b) {
            return null == b ? c.field[a].analyze_wildcard : (c.field[a].analyze_wildcard = b, this)
        }, escape: function (b) {
            return null == b ? c.field[a].escape : (c.field[a].escape = b, this)
        }, minimumShouldMatch: function (b) {
            return null == b ? c.field[a].minimum_should_match : (c.field[a].minimum_should_match = b, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.FilteredQuery = function (a, b) {
        if (!j(a))throw new TypeError("Argument must be a Query");
        if (null != b && !k(b))throw new TypeError("Argument must be a Filter");
        var c = {filtered: {query: a._self()}};
        return null != b && (c.filtered.filter = b._self()), {query: function (a) {
            if (null == a)return c.filtered.query;
            if (!j(a))throw new TypeError("Argument must be a Query");
            return c.filtered.query = a._self(), this
        }, filter: function (a) {
            if (null == a)return c.filtered.filter;
            if (!k(a))throw new TypeError("Argument must be a Filter");
            return c.filtered.filter = a._self(), this
        }, strategy: function (a) {
            return null == a ? c.filtered.strategy : (a = a.toLowerCase(), ("query_first" === a || "random_access_always" === a || "leap_frog" === a || "leap_frog_filter_first" === a || 0 === a.indexOf("random_access_")) && (c.filtered.strategy = a), this)
        }, cache: function (a) {
            return null == a ? c.filtered._cache : (c.filtered._cache = a, this)
        }, cacheKey: function (a) {
            return null == a ? c.filtered._cache_key : (c.filtered._cache_key = a, this)
        }, boost: function (a) {
            return null == a ? c.filtered.boost : (c.filtered.boost = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.FuzzyLikeThisFieldQuery = function (a, b) {
        var c = {flt_field: {}};
        return c.flt_field[a] = {like_text: b}, {field: function (b) {
            var d = c.flt_field[a];
            return null == b ? a : (delete c.flt_field[a], a = b, c.flt_field[b] = d, this)
        }, likeText: function (b) {
            return null == b ? c.flt_field[a].like_text : (c.flt_field[a].like_text = b, this)
        }, ignoreTf: function (b) {
            return null == b ? c.flt_field[a].ignore_tf : (c.flt_field[a].ignore_tf = b, this)
        }, maxQueryTerms: function (b) {
            return null == b ? c.flt_field[a].max_query_terms : (c.flt_field[a].max_query_terms = b, this)
        }, minSimilarity: function (b) {
            return null == b ? c.flt_field[a].min_similarity : (c.flt_field[a].min_similarity = b, this)
        }, prefixLength: function (b) {
            return null == b ? c.flt_field[a].prefix_length : (c.flt_field[a].prefix_length = b, this)
        }, analyzer: function (b) {
            return null == b ? c.flt_field[a].analyzer : (c.flt_field[a].analyzer = b, this)
        }, boost: function (b) {
            return null == b ? c.flt_field[a].boost : (c.flt_field[a].boost = b, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.FuzzyLikeThisQuery = function (a) {
        var b = {flt: {like_text: a}};
        return{fields: function (a) {
            if (null == b.flt.fields && (b.flt.fields = []), null == a)return b.flt.fields;
            if (f(a))b.flt.fields.push(a); else {
                if (!d(a))throw new TypeError("Argument must be a string or array");
                b.flt.fields = a
            }
            return this
        }, likeText: function (a) {
            return null == a ? b.flt.like_text : (b.flt.like_text = a, this)
        }, ignoreTf: function (a) {
            return null == a ? b.flt.ignore_tf : (b.flt.ignore_tf = a, this)
        }, maxQueryTerms: function (a) {
            return null == a ? b.flt.max_query_terms : (b.flt.max_query_terms = a, this)
        }, minSimilarity: function (a) {
            return null == a ? b.flt.min_similarity : (b.flt.min_similarity = a, this)
        }, prefixLength: function (a) {
            return null == a ? b.flt.prefix_length : (b.flt.prefix_length = a, this)
        }, analyzer: function (a) {
            return null == a ? b.flt.analyzer : (b.flt.analyzer = a, this)
        }, boost: function (a) {
            return null == a ? b.flt.boost : (b.flt.boost = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return b
        }}
    }, u.FuzzyQuery = function (a, b) {
        var c = {fuzzy: {}};
        return c.fuzzy[a] = {value: b}, {field: function (b) {
            var d = c.fuzzy[a];
            return null == b ? a : (delete c.fuzzy[a], a = b, c.fuzzy[b] = d, this)
        }, value: function (b) {
            return null == b ? c.fuzzy[a].value : (c.fuzzy[a].value = b, this)
        }, transpositions: function (b) {
            return null == b ? c.fuzzy[a].transpositions : (c.fuzzy[a].transpositions = b, this)
        }, maxExpansions: function (b) {
            return null == b ? c.fuzzy[a].max_expansions : (c.fuzzy[a].max_expansions = b, this)
        }, minSimilarity: function (b) {
            return null == b ? c.fuzzy[a].min_similarity : (c.fuzzy[a].min_similarity = b, this)
        }, prefixLength: function (b) {
            return null == b ? c.fuzzy[a].prefix_length : (c.fuzzy[a].prefix_length = b, this)
        }, rewrite: function (b) {
            return null == b ? c.fuzzy[a].rewrite : (b = b.toLowerCase(), ("constant_score_auto" === b || "scoring_boolean" === b || "constant_score_boolean" === b || "constant_score_filter" === b || 0 === b.indexOf("top_terms_boost_") || 0 === b.indexOf("top_terms_")) && (c.fuzzy[a].rewrite = b), this)
        }, boost: function (b) {
            return null == b ? c.fuzzy[a].boost : (c.fuzzy[a].boost = b, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.GeoShapeQuery = function (a) {
        var b = {geo_shape: {}};
        return b.geo_shape[a] = {}, {field: function (c) {
            var d = b.geo_shape[a];
            return null == c ? a : (delete b.geo_shape[a], a = c, b.geo_shape[c] = d, this)
        }, shape: function (c) {
            return null == c ? b.geo_shape[a].shape : (null != b.geo_shape[a].indexed_shape && delete b.geo_shape[a].indexed_shape, b.geo_shape[a].shape = c._self(), this)
        }, indexedShape: function (c) {
            return null == c ? b.geo_shape[a].indexed_shape : (null != b.geo_shape[a].shape && delete b.geo_shape[a].shape, b.geo_shape[a].indexed_shape = c._self(), this)
        }, relation: function (c) {
            return null == c ? b.geo_shape[a].relation : (c = c.toLowerCase(), ("intersects" === c || "disjoint" === c || "within" === c) && (b.geo_shape[a].relation = c), this)
        }, strategy: function (c) {
            return null == c ? b.geo_shape[a].strategy : (c = c.toLowerCase(), ("recursive" === c || "term" === c) && (b.geo_shape[a].strategy = c), this)
        }, boost: function (c) {
            return null == c ? b.geo_shape[a].boost : (b.geo_shape[a].boost = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return b
        }}
    }, u.HasChildQuery = function (a, b) {
        if (!j(a))throw new TypeError("Argument must be a valid Query");
        var c = {has_child: {query: a._self(), type: b}};
        return{query: function (a) {
            if (null == a)return c.has_child.query;
            if (!j(a))throw new TypeError("Argument must be a valid Query");
            return c.has_child.query = a._self(), this
        }, type: function (a) {
            return null == a ? c.has_child.type : (c.has_child.type = a, this)
        }, scope: function () {
            return this
        }, scoreType: function (a) {
            return null == a ? c.has_child.score_type : (a = a.toLowerCase(), ("none" === a || "max" === a || "sum" === a || "avg" === a) && (c.has_child.score_type = a), this)
        }, boost: function (a) {
            return null == a ? c.has_child.boost : (c.has_child.boost = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.HasParentQuery = function (a, b) {
        if (!j(a))throw new TypeError("Argument must be a Query");
        var c = {has_parent: {query: a._self(), parent_type: b}};
        return{query: function (a) {
            if (null == a)return c.has_parent.query;
            if (!j(a))throw new TypeError("Argument must be a Query");
            return c.has_parent.query = a._self(), this
        }, parentType: function (a) {
            return null == a ? c.has_parent.parent_type : (c.has_parent.parent_type = a, this)
        }, scope: function () {
            return this
        }, scoreType: function (a) {
            return null == a ? c.has_parent.score_type : (a = a.toLowerCase(), ("none" === a || "score" === a) && (c.has_parent.score_type = a), this)
        }, boost: function (a) {
            return null == a ? c.has_parent.boost : (c.has_parent.boost = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.IdsQuery = function (a) {
        var b = {ids: {}};
        if (f(a))b.ids.values = [a]; else {
            if (!d(a))throw new TypeError("Argument must be string or array");
            b.ids.values = a
        }
        return{values: function (a) {
            if (null == a)return b.ids.values;
            if (f(a))b.ids.values.push(a); else {
                if (!d(a))throw new TypeError("Argument must be string or array");
                b.ids.values = a
            }
            return this
        }, type: function (a) {
            if (null == b.ids.type && (b.ids.type = []), null == a)return b.ids.type;
            if (f(a))b.ids.type.push(a); else {
                if (!d(a))throw new TypeError("Argument must be string or array");
                b.ids.type = a
            }
            return this
        }, boost: function (a) {
            return null == a ? b.ids.boost : (b.ids.boost = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return b
        }}
    }, u.IndicesQuery = function (a, b) {
        if (!j(a))throw new TypeError("Argument must be a Query");
        var c = {indices: {query: a._self()}};
        if (f(b))c.indices.indices = [b]; else {
            if (!d(b))throw new TypeError("Argument must be a string or array");
            c.indices.indices = b
        }
        return{indices: function (a) {
            if (null == a)return c.indices.indices;
            if (f(a))c.indices.indices.push(a); else {
                if (!d(a))throw new TypeError("Argument must be a string or array");
                c.indices.indices = a
            }
            return this
        }, query: function (a) {
            if (null == a)return c.indices.query;
            if (!j(a))throw new TypeError("Argument must be a Query");
            return c.indices.query = a._self(), this
        }, noMatchQuery: function (a) {
            if (null == a)return c.indices.no_match_query;
            if (f(a))a = a.toLowerCase(), ("none" === a || "all" === a) && (c.indices.no_match_query = a); else {
                if (!j(a))throw new TypeError("Argument must be string or Query");
                c.indices.no_match_query = a._self()
            }
            return this
        }, boost: function (a) {
            return null == a ? c.indices.boost : (c.indices.boost = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.MatchAllQuery = function () {
        var a = {match_all: {}};
        return{boost: function (b) {
            return null == b ? a.match_all.boost : (a.match_all.boost = b, this)
        }, toString: function () {
            return JSON.stringify(a)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return a
        }}
    }, u.MatchQuery = function (a, b) {
        var c = {match: {}};
        return c.match[a] = {query: b}, {boost: function (b) {
            return null == b ? c.match[a].boost : (c.match[a].boost = b, this)
        }, query: function (b) {
            return null == b ? c.match[a].query : (c.match[a].query = b, this)
        }, type: function (b) {
            return null == b ? c.match[a].type : (b = b.toLowerCase(), ("boolean" === b || "phrase" === b || "phrase_prefix" === b) && (c.match[a].type = b), this)
        }, fuzziness: function (b) {
            return null == b ? c.match[a].fuzziness : (c.match[a].fuzziness = b, this)
        }, cutoffFrequency: function (b) {
            return null == b ? c.match[a].cutoff_frequency : (c.match[a].cutoff_frequency = b, this)
        }, prefixLength: function (b) {
            return null == b ? c.match[a].prefix_length : (c.match[a].prefix_length = b, this)
        }, maxExpansions: function (b) {
            return null == b ? c.match[a].max_expansions : (c.match[a].max_expansions = b, this)
        }, operator: function (b) {
            return null == b ? c.match[a].operator : (b = b.toLowerCase(), ("and" === b || "or" === b) && (c.match[a].operator = b), this)
        }, slop: function (b) {
            return null == b ? c.match[a].slop : (c.match[a].slop = b, this)
        }, analyzer: function (b) {
            return null == b ? c.match[a].analyzer : (c.match[a].analyzer = b, this)
        }, minimumShouldMatch: function (b) {
            return null == b ? c.match[a].minimum_should_match : (c.match[a].minimum_should_match = b, this)
        }, rewrite: function (b) {
            return null == b ? c.match[a].rewrite : (b = b.toLowerCase(), ("constant_score_auto" === b || "scoring_boolean" === b || "constant_score_boolean" === b || "constant_score_filter" === b || 0 === b.indexOf("top_terms_boost_") || 0 === b.indexOf("top_terms_")) && (c.match[a].rewrite = b), this)
        }, fuzzyRewrite: function (b) {
            return null == b ? c.match[a].fuzzy_rewrite : (b = b.toLowerCase(), ("constant_score_auto" === b || "scoring_boolean" === b || "constant_score_boolean" === b || "constant_score_filter" === b || 0 === b.indexOf("top_terms_boost_") || 0 === b.indexOf("top_terms_")) && (c.match[a].fuzzy_rewrite = b), this)
        }, fuzzyTranspositions: function (b) {
            return null == b ? c.match[a].fuzzy_transpositions : (c.match[a].fuzzy_transpositions = b, this)
        }, lenient: function (b) {
            return null == b ? c.match[a].lenient : (c.match[a].lenient = b, this)
        }, zeroTermsQuery: function (b) {
            return null == b ? c.match[a].zero_terms_query : (b = b.toLowerCase(), ("all" === b || "none" === b) && (c.match[a].zero_terms_query = b), this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.MoreLikeThisFieldQuery = function (a, b) {
        var c = {mlt_field: {}};
        return c.mlt_field[a] = {like_text: b}, {field: function (b) {
            var d = c.mlt_field[a];
            return null == b ? a : (delete c.mlt_field[a], a = b, c.mlt_field[b] = d, this)
        }, likeText: function (b) {
            return null == b ? c.mlt_field[a].like_text : (c.mlt_field[a].like_text = b, this)
        }, percentTermsToMatch: function (b) {
            return null == b ? c.mlt_field[a].percent_terms_to_match : (c.mlt_field[a].percent_terms_to_match = b, this)
        }, minTermFreq: function (b) {
            return null == b ? c.mlt_field[a].min_term_freq : (c.mlt_field[a].min_term_freq = b, this)
        }, maxQueryTerms: function (b) {
            return null == b ? c.mlt_field[a].max_query_terms : (c.mlt_field[a].max_query_terms = b, this)
        }, stopWords: function (b) {
            return null == b ? c.mlt_field[a].stop_words : (c.mlt_field[a].stop_words = b, this)
        }, minDocFreq: function (b) {
            return null == b ? c.mlt_field[a].min_doc_freq : (c.mlt_field[a].min_doc_freq = b, this)
        }, maxDocFreq: function (b) {
            return null == b ? c.mlt_field[a].max_doc_freq : (c.mlt_field[a].max_doc_freq = b, this)
        }, minWordLen: function (b) {
            return null == b ? c.mlt_field[a].min_word_len : (c.mlt_field[a].min_word_len = b, this)
        }, maxWordLen: function (b) {
            return null == b ? c.mlt_field[a].max_word_len : (c.mlt_field[a].max_word_len = b, this)
        }, analyzer: function (b) {
            return null == b ? c.mlt_field[a].analyzer : (c.mlt_field[a].analyzer = b, this)
        }, boostTerms: function (b) {
            return null == b ? c.mlt_field[a].boost_terms : (c.mlt_field[a].boost_terms = b, this)
        }, boost: function (b) {
            return null == b ? c.mlt_field[a].boost : (c.mlt_field[a].boost = b, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.MoreLikeThisQuery = function (a, b) {
        var c = {mlt: {like_text: b, fields: []}};
        if (f(a))c.mlt.fields.push(a); else {
            if (!d(a))throw new TypeError("Argument must be string or array");
            c.mlt.fields = a
        }
        return{fields: function (a) {
            if (null == a)return c.mlt.fields;
            if (f(a))c.mlt.fields.push(a); else {
                if (!d(a))throw new TypeError("Argument must be a string or array");
                c.mlt.fields = a
            }
            return this
        }, likeText: function (a) {
            return null == a ? c.mlt.like_text : (c.mlt.like_text = a, this)
        }, percentTermsToMatch: function (a) {
            return null == a ? c.mlt.percent_terms_to_match : (c.mlt.percent_terms_to_match = a, this)
        }, minTermFreq: function (a) {
            return null == a ? c.mlt.min_term_freq : (c.mlt.min_term_freq = a, this)
        }, maxQueryTerms: function (a) {
            return null == a ? c.mlt.max_query_terms : (c.mlt.max_query_terms = a, this)
        }, stopWords: function (a) {
            return null == a ? c.mlt.stop_words : (c.mlt.stop_words = a, this)
        }, minDocFreq: function (a) {
            return null == a ? c.mlt.min_doc_freq : (c.mlt.min_doc_freq = a, this)
        }, maxDocFreq: function (a) {
            return null == a ? c.mlt.max_doc_freq : (c.mlt.max_doc_freq = a, this)
        }, minWordLen: function (a) {
            return null == a ? c.mlt.min_word_len : (c.mlt.min_word_len = a, this)
        }, maxWordLen: function (a) {
            return null == a ? c.mlt.max_word_len : (c.mlt.max_word_len = a, this)
        }, analyzer: function (a) {
            return null == a ? c.mlt.analyzer : (c.mlt.analyzer = a, this)
        }, boostTerms: function (a) {
            return null == a ? c.mlt.boost_terms : (c.mlt.boost_terms = a, this)
        }, boost: function (a) {
            return null == a ? c.mlt.boost : (c.mlt.boost = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.MultiMatchQuery = function (a, b) {
        var c = {multi_match: {query: b, fields: []}};
        if (f(a))c.multi_match.fields.push(a); else {
            if (!d(a))throw new TypeError("Argument must be string or array");
            c.multi_match.fields = a
        }
        return{fields: function (a) {
            if (null == a)return c.multi_match.fields;
            if (f(a))c.multi_match.fields.push(a); else {
                if (!d(a))throw new TypeError("Argument must be string or array");
                c.multi_match.fields = a
            }
            return this
        }, useDisMax: function (a) {
            return null == a ? c.multi_match.use_dis_max : (c.multi_match.use_dis_max = a, this)
        }, tieBreaker: function (a) {
            return null == a ? c.multi_match.tie_breaker : (c.multi_match.tie_breaker = a, this)
        }, cutoffFrequency: function (a) {
            return null == a ? c.multi_match.cutoff_frequency : (c.multi_match.cutoff_frequency = a, this)
        }, minimumShouldMatch: function (a) {
            return null == a ? c.multi_match.minimum_should_match : (c.multi_match.minimum_should_match = a, this)
        }, rewrite: function (a) {
            return null == a ? c.multi_match.rewrite : (a = a.toLowerCase(), ("constant_score_auto" === a || "scoring_boolean" === a || "constant_score_boolean" === a || "constant_score_filter" === a || 0 === a.indexOf("top_terms_boost_") || 0 === a.indexOf("top_terms_")) && (c.multi_match.rewrite = a), this)
        }, fuzzyRewrite: function (a) {
            return null == a ? c.multi_match.fuzzy_rewrite : (a = a.toLowerCase(), ("constant_score_auto" === a || "scoring_boolean" === a || "constant_score_boolean" === a || "constant_score_filter" === a || 0 === a.indexOf("top_terms_boost_") || 0 === a.indexOf("top_terms_")) && (c.multi_match.fuzzy_rewrite = a), this)
        }, lenient: function (a) {
            return null == a ? c.multi_match.lenient : (c.multi_match.lenient = a, this)
        }, boost: function (a) {
            return null == a ? c.multi_match.boost : (c.multi_match.boost = a, this)
        }, query: function (a) {
            return null == a ? c.multi_match.query : (c.multi_match.query = a, this)
        }, type: function (a) {
            return null == a ? c.multi_match.type : (a = a.toLowerCase(), ("boolean" === a || "phrase" === a || "phrase_prefix" === a) && (c.multi_match.type = a), this)
        }, fuzziness: function (a) {
            return null == a ? c.multi_match.fuzziness : (c.multi_match.fuzziness = a, this)
        }, prefixLength: function (a) {
            return null == a ? c.multi_match.prefix_length : (c.multi_match.prefix_length = a, this)
        }, maxExpansions: function (a) {
            return null == a ? c.multi_match.max_expansions : (c.multi_match.max_expansions = a, this)
        }, operator: function (a) {
            return null == a ? c.multi_match.operator : (a = a.toLowerCase(), ("and" === a || "or" === a) && (c.multi_match.operator = a), this)
        }, slop: function (a) {
            return null == a ? c.multi_match.slop : (c.multi_match.slop = a, this)
        }, analyzer: function (a) {
            return null == a ? c.multi_match.analyzer : (c.multi_match.analyzer = a, this)
        }, zeroTermsQuery: function (a) {
            return null == a ? c.multi_match.zero_terms_query : (a = a.toLowerCase(), ("all" === a || "none" === a) && (c.multi_match.zero_terms_query = a), this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.NestedQuery = function (a) {
        var b = {nested: {path: a}};
        return{path: function (a) {
            return null == a ? b.nested.path : (b.nested.path = a, this)
        }, query: function (a) {
            if (null == a)return b.nested.query;
            if (!j(a))throw new TypeError("Argument must be a Query");
            return b.nested.query = a._self(), this
        }, filter: function (a) {
            if (null == a)return b.nested.filter;
            if (!k(a))throw new TypeError("Argument must be a Filter");
            return b.nested.filter = a._self(), this
        }, scoreMode: function (a) {
            return null == a ? b.nested.score_mode : (a = a.toLowerCase(), ("avg" === a || "total" === a || "max" === a || "none" === a) && (b.nested.score_mode = a), this)
        }, scope: function () {
            return this
        }, boost: function (a) {
            return null == a ? b.nested.boost : (b.nested.boost = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return b
        }}
    }, u.PrefixQuery = function (a, b) {
        var c = {prefix: {}};
        return c.prefix[a] = {value: b}, {field: function (b) {
            var d = c.prefix[a];
            return null == b ? a : (delete c.prefix[a], a = b, c.prefix[b] = d, this)
        }, value: function (b) {
            return null == b ? c.prefix[a].value : (c.prefix[a].value = b, this)
        }, rewrite: function (b) {
            return null == b ? c.prefix[a].rewrite : (b = b.toLowerCase(), ("constant_score_auto" === b || "scoring_boolean" === b || "constant_score_boolean" === b || "constant_score_filter" === b || 0 === b.indexOf("top_terms_boost_") || 0 === b.indexOf("top_terms_")) && (c.prefix[a].rewrite = b), this)
        }, boost: function (b) {
            return null == b ? c.prefix[a].boost : (c.prefix[a].boost = b, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.QueryStringQuery = function (a) {
        var b = {query_string: {}};
        return b.query_string.query = a, {query: function (a) {
            return null == a ? b.query_string.query : (b.query_string.query = a, this)
        }, defaultField: function (a) {
            return null == a ? b.query_string.default_field : (b.query_string.default_field = a, this)
        }, fields: function (a) {
            if (null == b.query_string.fields && (b.query_string.fields = []), null == a)return b.query_string.fields;
            if (f(a))b.query_string.fields.push(a); else {
                if (!d(a))throw new TypeError("Argument must be a string or array");
                b.query_string.fields = a
            }
            return this
        }, useDisMax: function (a) {
            return null == a ? b.query_string.use_dis_max : (b.query_string.use_dis_max = a, this)
        }, defaultOperator: function (a) {
            return null == a ? b.query_string.default_operator : (a = a.toUpperCase(), ("AND" === a || "OR" === a) && (b.query_string.default_operator = a), this)
        }, analyzer: function (a) {
            return null == a ? b.query_string.analyzer : (b.query_string.analyzer = a, this)
        }, quoteAnalyzer: function (a) {
            return null == a ? b.query_string.quote_analyzer : (b.query_string.quote_analyzer = a, this)
        }, allowLeadingWildcard: function (a) {
            return null == a ? b.query_string.allow_leading_wildcard : (b.query_string.allow_leading_wildcard = a, this)
        }, lowercaseExpandedTerms: function (a) {
            return null == a ? b.query_string.lowercase_expanded_terms : (b.query_string.lowercase_expanded_terms = a, this)
        }, enablePositionIncrements: function (a) {
            return null == a ? b.query_string.enable_position_increments : (b.query_string.enable_position_increments = a, this)
        }, fuzzyPrefixLength: function (a) {
            return null == a ? b.query_string.fuzzy_prefix_length : (b.query_string.fuzzy_prefix_length = a, this)
        }, fuzzyMinSim: function (a) {
            return null == a ? b.query_string.fuzzy_min_sim : (b.query_string.fuzzy_min_sim = a, this)
        }, phraseSlop: function (a) {
            return null == a ? b.query_string.phrase_slop : (b.query_string.phrase_slop = a, this)
        }, boost: function (a) {
            return null == a ? b.query_string.boost : (b.query_string.boost = a, this)
        }, analyzeWildcard: function (a) {
            return null == a ? b.query_string.analyze_wildcard : (b.query_string.analyze_wildcard = a, this)
        }, autoGeneratePhraseQueries: function (a) {
            return null == a ? b.query_string.auto_generate_phrase_queries : (b.query_string.auto_generate_phrase_queries = a, this)
        }, minimumShouldMatch: function (a) {
            return null == a ? b.query_string.minimum_should_match : (b.query_string.minimum_should_match = a, this)
        }, tieBreaker: function (a) {
            return null == a ? b.query_string.tie_breaker : (b.query_string.tie_breaker = a, this)
        }, escape: function (a) {
            return null == a ? b.query_string.escape : (b.query_string.escape = a, this)
        }, fuzzyMaxExpansions: function (a) {
            return null == a ? b.query_string.fuzzy_max_expansions : (b.query_string.fuzzy_max_expansions = a, this)
        }, fuzzyRewrite: function (a) {
            return null == a ? b.query_string.fuzzy_rewrite : (a = a.toLowerCase(), ("constant_score_auto" === a || "scoring_boolean" === a || "constant_score_boolean" === a || "constant_score_filter" === a || 0 === a.indexOf("top_terms_boost_") || 0 === a.indexOf("top_terms_")) && (b.query_string.fuzzy_rewrite = a), this)
        }, rewrite: function (a) {
            return null == a ? b.query_string.rewrite : (a = a.toLowerCase(), ("constant_score_auto" === a || "scoring_boolean" === a || "constant_score_boolean" === a || "constant_score_filter" === a || 0 === a.indexOf("top_terms_boost_") || 0 === a.indexOf("top_terms_")) && (b.query_string.rewrite = a), this)
        }, quoteFieldSuffix: function (a) {
            return null == a ? b.query_string.quote_field_suffix : (b.query_string.quote_field_suffix = a, this)
        }, lenient: function (a) {
            return null == a ? b.query_string.lenient : (b.query_string.lenient = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return b
        }}
    }, u.RangeQuery = function (a) {
        var b = {range: {}};
        return b.range[a] = {}, {field: function (c) {
            var d = b.range[a];
            return null == c ? a : (delete b.range[a], a = c, b.range[c] = d, this)
        }, from: function (c) {
            return null == c ? b.range[a].from : (b.range[a].from = c, this)
        }, to: function (c) {
            return null == c ? b.range[a].to : (b.range[a].to = c, this)
        }, includeLower: function (c) {
            return null == c ? b.range[a].include_lower : (b.range[a].include_lower = c, this)
        }, includeUpper: function (c) {
            return null == c ? b.range[a].include_upper : (b.range[a].include_upper = c, this)
        }, gt: function (c) {
            return null == c ? b.range[a].gt : (b.range[a].gt = c, this)
        }, gte: function (c) {
            return null == c ? b.range[a].gte : (b.range[a].gte = c, this)
        }, lt: function (c) {
            return null == c ? b.range[a].lt : (b.range[a].lt = c, this)
        }, lte: function (c) {
            return null == c ? b.range[a].lte : (b.range[a].lte = c, this)
        }, boost: function (c) {
            return null == c ? b.range[a].boost : (b.range[a].boost = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return b
        }}
    }, u.RegexpQuery = function (a, b) {
        var c = {regexp: {}};
        return c.regexp[a] = {value: b}, {field: function (b) {
            var d = c.regexp[a];
            return null == b ? a : (delete c.regexp[a], a = b, c.regexp[b] = d, this)
        }, value: function (b) {
            return null == b ? c.regexp[a].value : (c.regexp[a].value = b, this)
        }, flags: function (b) {
            return null == b ? c.regexp[a].flags : (c.regexp[a].flags = b, this)
        }, flagsValue: function (b) {
            return null == b ? c.regexp[a].flags_value : (c.regexp[a].flags_value = b, this)
        }, rewrite: function (b) {
            return null == b ? c.regexp[a].rewrite : (b = b.toLowerCase(), ("constant_score_auto" === b || "scoring_boolean" === b || "constant_score_boolean" === b || "constant_score_filter" === b || 0 === b.indexOf("top_terms_boost_") || 0 === b.indexOf("top_terms_")) && (c.regexp[a].rewrite = b), this)
        }, boost: function (b) {
            return null == b ? c.regexp[a].boost : (c.regexp[a].boost = b, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.SpanFirstQuery = function (a, b) {
        if (!j(a))throw new TypeError("Argument must be a SpanQuery");
        var c = {span_first: {match: a._self(), end: b}};
        return{match: function (a) {
            if (null == a)return c.span_first.match;
            if (!j(a))throw new TypeError("Argument must be a SpanQuery");
            return c.span_first.match = a._self(), this
        }, end: function (a) {
            return null == a ? c.span_first.end : (c.span_first.end = a, this)
        }, boost: function (a) {
            return null == a ? c.span_first.boost : (c.span_first.boost = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.SpanNearQuery = function (a, b) {
        var c, e, f = {span_near: {clauses: [], slop: b}};
        if (j(a))f.span_near.clauses.push(a._self()); else {
            if (!d(a))throw new TypeError("Argument must be SpanQuery or array of SpanQueries");
            for (c = 0, e = a.length; e > c; c++) {
                if (!j(a[c]))throw new TypeError("Argument must be array of SpanQueries");
                f.span_near.clauses.push(a[c]._self())
            }
        }
        return{clauses: function (a) {
            var b, c;
            if (null == a)return f.span_near.clauses;
            if (j(a))f.span_near.clauses.push(a._self()); else {
                if (!d(a))throw new TypeError("Argument must be SpanQuery or array of SpanQueries");
                for (f.span_near.clauses = [], b = 0, c = a.length; c > b; b++) {
                    if (!j(a[b]))throw new TypeError("Argument must be array of SpanQueries");
                    f.span_near.clauses.push(a[b]._self())
                }
            }
            return this
        }, slop: function (a) {
            return null == a ? f.span_near.slop : (f.span_near.slop = a, this)
        }, inOrder: function (a) {
            return null == a ? f.span_near.in_order : (f.span_near.in_order = a, this)
        }, collectPayloads: function (a) {
            return null == a ? f.span_near.collect_payloads : (f.span_near.collect_payloads = a, this)
        }, boost: function (a) {
            return null == a ? f.span_near.boost : (f.span_near.boost = a, this)
        }, toString: function () {
            return JSON.stringify(f)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return f
        }}
    }, u.SpanNotQuery = function (a, b) {
        if (!j(a) || !j(b))throw new TypeError("Argument must be a SpanQuery");
        var c = {span_not: {include: a._self(), exclude: b._self()}};
        return{include: function (a) {
            if (null == a)return c.span_not.include;
            if (!j(a))throw new TypeError("Argument must be a SpanQuery");
            return c.span_not.include = a._self(), this
        }, exclude: function (a) {
            if (null == a)return c.span_not.exclude;
            if (!j(a))throw new TypeError("Argument must be a SpanQuery");
            return c.span_not.exclude = a._self(), this
        }, boost: function (a) {
            return null == a ? c.span_not.boost : (c.span_not.boost = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.SpanOrQuery = function (a) {
        var b, c, e = {span_or: {clauses: []}};
        if (j(a))e.span_or.clauses.push(a._self()); else {
            if (!d(a))throw new TypeError("Argument must be SpanQuery or array of SpanQueries");
            for (b = 0, c = a.length; c > b; b++) {
                if (!j(a[b]))throw new TypeError("Argument must be array of SpanQueries");
                e.span_or.clauses.push(a[b]._self())
            }
        }
        return{clauses: function (a) {
            var b, c;
            if (null == a)return e.span_or.clauses;
            if (j(a))e.span_or.clauses.push(a._self()); else {
                if (!d(a))throw new TypeError("Argument must be SpanQuery or array of SpanQueries");
                for (e.span_or.clauses = [], b = 0, c = a.length; c > b; b++) {
                    if (!j(a[b]))throw new TypeError("Argument must be array of SpanQueries");
                    e.span_or.clauses.push(a[b]._self())
                }
            }
            return this
        }, boost: function (a) {
            return null == a ? e.span_or.boost : (e.span_or.boost = a, this)
        }, toString: function () {
            return JSON.stringify(e)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return e
        }}
    }, u.SpanTermQuery = function (a, b) {
        var c = {span_term: {}};
        return c.span_term[a] = {term: b}, {field: function (b) {
            var d = c.span_term[a];
            return null == b ? a : (delete c.span_term[a], a = b, c.span_term[b] = d, this)
        }, term: function (b) {
            return null == b ? c.span_term[a].term : (c.span_term[a].term = b, this)
        }, boost: function (b) {
            return null == b ? c.span_term[a].boost : (c.span_term[a].boost = b, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.TermQuery = function (a, b) {
        var c = {term: {}};
        return c.term[a] = {term: b}, {field: function (b) {
            var d = c.term[a];
            return null == b ? a : (delete c.term[a], a = b, c.term[b] = d, this)
        }, term: function (b) {
            return null == b ? c.term[a].term : (c.term[a].term = b, this)
        }, boost: function (b) {
            return null == b ? c.term[a].boost : (c.term[a].boost = b, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.TermsQuery = function (a, b) {
        var c = {terms: {}};
        if (f(b))c.terms[a] = [b]; else {
            if (!d(b))throw new TypeError("Argument must be string or array");
            c.terms[a] = b
        }
        return{field: function (b) {
            var d = c.terms[a];
            return null == b ? a : (delete c.terms[a], a = b, c.terms[b] = d, this)
        }, terms: function (b) {
            if (null == b)return c.terms[a];
            if (f(b))c.terms[a].push(b); else {
                if (!d(b))throw new TypeError("Argument must be string or array");
                c.terms[a] = b
            }
            return this
        }, minimumShouldMatch: function (a) {
            return null == a ? c.terms.minimum_should_match : (c.terms.minimum_should_match = a, this)
        }, disableCoord: function (a) {
            return null == a ? c.terms.disable_coord : (c.terms.disable_coord = a, this)
        }, boost: function (a) {
            return null == a ? c.terms.boost : (c.terms.boost = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.TopChildrenQuery = function (a, b) {
        if (!j(a))throw new TypeError("Argument must be a Query");
        var c = {top_children: {query: a._self(), type: b}};
        return{query: function (a) {
            if (null == a)return c.top_children.query;
            if (!j(a))throw new TypeError("Argument must be a Query");
            return c.top_children.query = a._self(), this
        }, type: function (a) {
            return null == a ? c.top_children.type : (c.top_children.type = a, this)
        }, scope: function () {
            return this
        }, score: function (a) {
            return null == a ? c.top_children.score : (a = a.toLowerCase(), ("max" === a || "sum" === a || "avg" === a) && (c.top_children.score = a), this)
        }, factor: function (a) {
            return null == a ? c.top_children.factor : (c.top_children.factor = a, this)
        }, incrementalFactor: function (a) {
            return null == a ? c.top_children.incremental_factor : (c.top_children.incremental_factor = a, this)
        }, boost: function (a) {
            return null == a ? c.top_children.boost : (c.top_children.boost = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.WildcardQuery = function (a, b) {
        var c = {wildcard: {}};
        return c.wildcard[a] = {value: b}, {field: function (b) {
            var d = c.wildcard[a];
            return null == b ? a : (delete c.wildcard[a], a = b, c.wildcard[b] = d, this)
        }, value: function (b) {
            return null == b ? c.wildcard[a].value : (c.wildcard[a].value = b, this)
        }, rewrite: function (b) {
            return null == b ? c.wildcard[a].rewrite : (b = b.toLowerCase(), ("constant_score_auto" === b || "scoring_boolean" === b || "constant_score_boolean" === b || "constant_score_filter" === b || 0 === b.indexOf("top_terms_boost_") || 0 === b.indexOf("top_terms_")) && (c.wildcard[a].rewrite = b), this)
        }, boost: function (b) {
            return null == b ? c.wildcard[a].boost : (c.wildcard[a].boost = b, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"query"
        }, _self: function () {
            return c
        }}
    }, u.GeoPoint = function (b) {
        var c = [0, 0];
        return null != b && d(b) && 2 === b.length && (c = [b[1], b[0]]), {properties: function (b) {
            return null == b ? c : (e(b) && a(b, "lat") && a(b, "lon") && (c = {lat: b.lat, lon: b.lon}), this)
        }, string: function (a) {
            return null == a ? c : (f(a) && -1 !== a.indexOf(",") && (c = a), this)
        }, geohash: function (a, b) {
            return b = null != b && g(b) ? b : 12, null == a ? c : (f(a) && a.length === b && (c = a), this)
        }, array: function (a) {
            return null == a ? c : (d(a) && 2 === a.length && (c = [a[1], a[0]]), this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"geo point"
        }, _self: function () {
            return c
        }}
    }, u.Highlight = function (c) {
        var e = {fields: {}}, g = function (b, c, d) {
            null == b ? e[c] = d : (a(e.fields, b) || (e.fields[b] = {}), e.fields[b][c] = d)
        };
        return null != c && (f(c) ? e.fields[c] = {} : d(c) && b(c, function (a) {
            e.fields[a] = {}
        })), {fields: function (c) {
            return null == c ? e.fields : (f(c) ? a(e.fields, c) || (e.fields[c] = {}) : d(c) && b(c, function (b) {
                a(e.fields, b) || (e.fields[b] = {})
            }), void 0)
        }, preTags: function (a, b) {
            return null === a && null != b ? e.fields[b].pre_tags : null == a ? e.pre_tags : (f(a) ? g(b, "pre_tags", [a]) : d(a) && g(b, "pre_tags", a), this)
        }, postTags: function (a, b) {
            return null === a && null != b ? e.fields[b].post_tags : null == a ? e.post_tags : (f(a) ? g(b, "post_tags", [a]) : d(a) && g(b, "post_tags", a), this)
        }, order: function (a, b) {
            return null === a && null != b ? e.fields[b].order : null == a ? e.order : (a = a.toLowerCase(), "score" === a && g(b, "order", a), this)
        }, tagsSchema: function (a) {
            return null == a ? e.tags_schema : (a = a.toLowerCase(), "styled" === a && (e.tags_schema = a), this)
        }, highlightFilter: function (a, b) {
            return null === a && null != b ? e.fields[b].highlight_filter : null == a ? e.highlight_filter : (g(b, "highlight_filter", a), this)
        }, fragmentSize: function (a, b) {
            return null === a && null != b ? e.fields[b].fragment_size : null == a ? e.fragment_size : (g(b, "fragment_size", a), this)
        }, numberOfFragments: function (a, b) {
            return null === a && null != b ? e.fields[b].number_of_fragments : null == a ? e.number_of_fragments : (g(b, "number_of_fragments", a), this)
        }, encoder: function (a) {
            return null == a ? e.encoder : (a = a.toLowerCase(), ("default" === a || "html" === a) && (e.encoder = a), this)
        }, requireFieldMatch: function (a, b) {
            return null === a && null != b ? e.fields[b].require_field_match : null == a ? e.require_field_match : (g(b, "require_field_match", a), this)
        }, boundaryMaxScan: function (a, b) {
            return null === a && null != b ? e.fields[b].boundary_max_scan : null == a ? e.boundary_max_scan : (g(b, "boundary_max_scan", a), this)
        }, boundaryChars: function (a, b) {
            return null === a && null != b ? e.fields[b].boundary_chars : null == a ? e.boundary_chars : (g(b, "boundary_chars", a), this)
        }, type: function (a, b) {
            return null === a && null != b ? e.fields[b].type : null == a ? e.type : (a = a.toLowerCase(), ("fast-vector-highlighter" === a || "highlighter" === a) && g(b, "type", a), this)
        }, fragmenter: function (a, b) {
            return null === a && null != b ? e.fields[b].fragmenter : null == a ? e.fragmenter : (a = a.toLowerCase(), ("simple" === a || "span" === a) && g(b, "fragmenter", a), this)
        }, toString: function () {
            return JSON.stringify(e)
        }, _type: function () {
            return"highlight"
        }, _self: function () {
            return e
        }}
    }, u.IndexedShape = function (a, b) {
        var c = {type: a, id: b};
        return{type: function (a) {
            return null == a ? c.type : (c.type = a, this)
        }, id: function (a) {
            return null == a ? c.id : (c.id = a, this)
        }, index: function (a) {
            return null == a ? c.index : (c.index = a, this)
        }, shapeFieldName: function (a) {
            return null == a ? c.shape_field_name : (c.shape_field_name = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"indexed shape"
        }, _self: function () {
            return c
        }}
    }, u.Request = function (b) {
        var e, g, h, i = {}, n = function (b) {
            var c = "", d = [];
            g.length > 0 && (c = c + "/" + g.join()), h.length > 0 && (c = c + "/" + h.join()), b.length > 0 && "/" !== b[0] && (c += "/"), c += b;
            for (var e in i)a(i, e) && "" !== i[e] && d.push(e + "=" + encodeURIComponent(i[e]));
            return d.length > 0 && (c = c + "?" + d.join("&")), c
        };
        return e = {}, b = b || {}, g = null == b.indices ? [] : f(b.indices) ? [b.indices] : b.indices, h = null == b.types ? [] : f(b.types) ? [b.types] : b.types, 0 === g.length && h.length > 0 && (g = ["_all"]), null != b.routing && (i.routing = b.routing), {sort: function () {
            var b, c;
            if (a(e, "sort") || (e.sort = []), 0 === arguments.length)return e.sort;
            if (1 === arguments.length) {
                var g = arguments[0];
                if (f(g))e.sort.push(g); else if (q(g))e.sort.push(g._self()); else {
                    if (!d(g))throw new TypeError("Argument must be string, Sort, or array");
                    for (e.sort = [], b = 0, c = g.length; c > b; b++)if (f(g[b]))e.sort.push(g[b]); else {
                        if (!q(g[b]))throw new TypeError("Invalid object in array");
                        e.sort.push(g[b]._self())
                    }
                }
            } else if (2 === arguments.length) {
                var h = arguments[0], i = arguments[1];
                if (f(h) && f(i) && (i = i.toLowerCase(), "asc" === i || "desc" === i)) {
                    var j = {};
                    j[h] = {order: i}, e.sort.push(j)
                }
            }
            return this
        }, trackScores: function (a) {
            return null == a ? e.track_scores : (e.track_scores = a, this)
        }, size: function (a) {
            return null == a ? e.size : (e.size = a, this)
        }, timeout: function (a) {
            return null == a ? i.timeout : (i.timeout = a, this)
        }, routing: function (a) {
            return null == a ? i.routing : (i.routing = a, this)
        }, replication: function (a) {
            return null == a ? i.replication : (a = a.toLowerCase(), ("async" === a || "sync" === a || "default" === a) && (i.replication = a), this)
        }, consistency: function (a) {
            return null == a ? i.consistency : (a = a.toLowerCase(), ("default" === a || "one" === a || "quorum" === a || "all" === a) && (i.consistency = a), this)
        }, searchType: function (a) {
            return null == a ? i.search_type : (a = a.toLowerCase(), ("dfs_query_then_fetch" === a || "dfs_query_and_fetch" === a || "query_then_fetch" === a || "query_and_fetch" === a || "scan" === a || "count" === a) && (i.search_type = a), this)
        }, fields: function (a) {
            if (null == a)return e.fields;
            if (null == e.fields && (e.fields = []), f(a))e.fields.push(a); else {
                if (!d(a))throw new TypeError("Argument must be string or array");
                e.fields = a
            }
            return this
        }, from: function (a) {
            return null == a ? e.from : (e.from = a, this)
        }, query: function (a) {
            if (null == a)return e.query;
            if (!j(a))throw new TypeError("Argument must be a Query");
            return e.query = a._self(), this
        }, indices: function (a) {
            if (null == a)return g;
            if (f(a))g = [a]; else {
                if (!d(a))throw new TypeError("Argument must be a string or array");
                g = a
            }
            return 0 === g.length && h.length > 0 && (g = ["_all"]), this
        }, types: function (a) {
            if (null == a)return h;
            if (f(a))h = [a]; else {
                if (!d(a))throw new TypeError("Argument must be a string or array");
                h = a
            }
            return 0 === g.length && h.length > 0 && (g = ["_all"]), this
        }, facet: function (a) {
            if (null == a)return e.facets;
            if (null == e.facets && (e.facets = {}), !l(a))throw new TypeError("Argument must be a Facet");
            return c(e.facets, a._self()), this
        }, filter: function (a) {
            if (null == a)return e.filter;
            if (!k(a))throw new TypeError("Argument must be a Filter");
            return e.filter = a._self(), this
        }, highlight: function (a) {
            if (null == a)return e.highlight;
            if (!r(a))throw new TypeError("Argument must be a Highlight object");
            return e.highlight = a._self(), this
        }, suggest: function (a) {
            if (null == a)return e.suggest;
            if (null == e.suggest && (e.suggest = {}), f(a))e.suggest.text = a; else {
                if (!s(a))throw new TypeError("Argument must be a string or Suggest object");
                c(e.suggest, a._self())
            }
            return this
        }, scriptField: function (a) {
            if (null == a)return e.script_fields;
            if (null == e.script_fields && (e.script_fields = {}), !m(a))throw new TypeError("Argument must be a ScriptField");
            return c(e.script_fields, a._self()), this
        }, preference: function (a) {
            return null == a ? i.preference : (i.preference = a, this)
        }, ignoreIndices: function (a) {
            return null == a ? i.ignore_indices : (a = a.toLowerCase(), ("none" === a || "missing" === a) && (i.ignore_indices = a), this)
        }, indexBoost: function (a, b) {
            return null == e.indices_boost && (e.indices_boost = {}), 0 === arguments.length ? e.indices_boost : (e.indices_boost[a] = b, this)
        }, explain: function (a) {
            return null == a ? e.explain : (e.explain = a, this)
        }, version: function (a) {
            return null == a ? e.version : (e.version = a, this)
        }, minScore: function (a) {
            return null == a ? e.min_score : (e.min_score = a, this)
        }, toString: function () {
            return JSON.stringify(e)
        }, _type: function () {
            return"request"
        }, _self: function () {
            return e
        }, doDeleteByQuery: function (a, b) {
            var c = JSON.stringify(e.query);
            if (null == u.client)throw new Error("No Client Set");
            return u.client.del(n("_query"), c, a, b)
        }, doCount: function (a, b) {
            var c = JSON.stringify(e.query);
            if (null == u.client)throw new Error("No Client Set");
            return u.client.post(n("_count"), c, a, b)
        }, doSearch: function (a, b) {
            var c = JSON.stringify(e);
            if (null == u.client)throw new Error("No Client Set");
            return u.client.post(n("_search"), c, a, b)
        }}
    }, u.ScriptField = function (a) {
        var b = {};
        return b[a] = {}, {lang: function (c) {
            return null == c ? b[a].lang : (b[a].lang = c, this)
        }, script: function (c) {
            return null == c ? b[a].script : (b[a].script = c, this)
        }, params: function (c) {
            return null == c ? b[a].params : (b[a].params = c, this)
        }, ignoreFailure: function (c) {
            return null == c ? b[a].ignore_failure : (b[a].ignore_failure = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"script field"
        }, _self: function () {
            return b
        }}
    },u.Shape = function (a, b) {
        var c = {}, d = function (a) {
            var b = !1;
            return("point" === a || "linestring" === a || "polygon" === a || "multipoint" === a || "envelope" === a || "multipolygon" === a) && (b = !0), b
        };
        return a = a.toLowerCase(), d(a) && (c.type = a, c.coordinates = b), {type: function (a) {
            return null == a ? c.type : (a = a.toLowerCase(), d(a) && (c.type = a), this)
        }, coordinates: function (a) {
            return null == a ? c.coordinates : (c.coordinates = a, this)
        }, toString: function () {
            return JSON.stringify(c)
        }, _type: function () {
            return"shape"
        }, _self: function () {
            return c
        }}
    },u.Sort = function (a) {
        null == a && (a = "_score");
        var b = {}, c = a, d = "_geo_distance", e = "_script";
        return b[c] = {}, {field: function (d) {
            var e = b[c];
            return null == d ? a : (delete b[c], a = d, c = d, b[c] = e, this)
        }, geoDistance: function (e) {
            var f = b[c];
            if (null == e)return b[c][a];
            if (!n(e))throw new TypeError("Argument must be a GeoPoint");
            return delete b[c], c = d, b[c] = f, b[c][a] = e._self(), this
        }, script: function (a) {
            var d = b[c];
            return null == a ? b[c].script : (delete b[c], c = e, b[c] = d, b[c].script = a, this)
        }, order: function (a) {
            return null == a ? b[c].order : (a = a.toLowerCase(), ("asc" === a || "desc" === a) && (b[c].order = a), this)
        }, asc: function () {
            return b[c].order = "asc", this
        }, desc: function () {
            return b[c].order = "desc", this
        }, reverse: function (a) {
            return null == a ? b[c].reverse : (b[c].reverse = a, this)
        }, missing: function (a) {
            return null == a ? b[c].missing : (b[c].missing = a, this)
        }, ignoreUnmapped: function (a) {
            return null == a ? b[c].ignore_unmapped : (b[c].ignore_unmapped = a, this)
        }, unit: function (a) {
            return null == a ? b[c].unit : (a = a.toLowerCase(), ("mi" === a || "km" === a) && (b[c].unit = a), this)
        }, normalize: function (a) {
            return null == a ? b[c].normalize : (b[c].normalize = a, this)
        }, distanceType: function (a) {
            return null == a ? b[c].distance_type : (a = a.toLowerCase(), ("arc" === a || "plane" === a) && (b[c].distance_type = a), this)
        }, params: function (a) {
            return null == a ? b[c].params : (b[c].params = a, this)
        }, lang: function (a) {
            return null == a ? b[c].lang : (b[c].lang = a, this)
        }, type: function (a) {
            return null == a ? b[c].type : (a = a.toLowerCase(), ("string" === a || "number" === a) && (b[c].type = a), this)
        }, mode: function (a) {
            return null == a ? b[c].mode : (a = a.toLowerCase(), ("min" === a || "max" === a || "sum" === a || "avg" === a) && (b[c].mode = a), this)
        }, nestedPath: function (a) {
            return null == a ? b[c].nested_path : (b[c].nested_path = a, this)
        }, nestedFilter: function (a) {
            if (null == a)return b[c].nested_filter;
            if (!k(a))throw new TypeError("Argument must be a Filter");
            return b[c].nested_filter = a._self(), this
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"sort"
        }, _self: function () {
            return b
        }}
    },u.DirectGenerator = function () {
        var a = u.DirectSettingsMixin(), b = a._self();
        return c(a, {preFilter: function (a) {
            return null == a ? b.pre_filter : (b.pre_filter = a, this)
        }, postFilter: function (a) {
            return null == a ? b.post_filter : (b.post_filter = a, this)
        }, field: function (a) {
            return null == a ? b.field : (b.field = a, this)
        }, size: function (a) {
            return null == a ? b.size : (b.size = a, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"generator"
        }, _self: function () {
            return b
        }})
    },u.DirectSettingsMixin = function () {
        var a = {};
        return{accuracy: function (b) {
            return null == b ? a.accuracy : (a.accuracy = b, this)
        }, suggestMode: function (b) {
            return null == b ? a.suggest_mode : (b = b.toLowerCase(), ("missing" === b || "popular" === b || "always" === b) && (a.suggest_mode = b), this)
        }, sort: function (b) {
            return null == b ? a.sort : (b = b.toLowerCase(), ("score" === b || "frequency" === b) && (a.sort = b), this)
        }, stringDistance: function (b) {
            return null == b ? a.string_distance : (b = b.toLowerCase(), ("internal" === b || "damerau_levenshtein" === b || "levenstein" === b || "jarowinkler" === b || "ngram" === b) && (a.string_distance = b), this)
        }, maxEdits: function (b) {
            return null == b ? a.max_edits : (a.max_edits = b, this)
        }, maxInspections: function (b) {
            return null == b ? a.max_inspections : (a.max_inspections = b, this)
        }, maxTermFreq: function (b) {
            return null == b ? a.max_term_freq : (a.max_term_freq = b, this)
        }, prefixLength: function (b) {
            return null == b ? a.prefix_length : (a.prefix_length = b, this)
        }, minWordLen: function (b) {
            return null == b ? a.min_word_len : (a.min_word_len = b, this)
        }, minDocFreq: function (b) {
            return null == b ? a.min_doc_freq : (a.min_doc_freq = b, this)
        }, _self: function () {
            return a
        }}
    },u.PhraseSuggester = function (a) {
        var b = {};
        return b[a] = {phrase: {}}, {text: function (c) {
            return null == c ? b[a].text : (b[a].text = c, this)
        }, analyzer: function (c) {
            return null == c ? b[a].phrase.analyzer : (b[a].phrase.analyzer = c, this)
        }, field: function (c) {
            return null == c ? b[a].phrase.field : (b[a].phrase.field = c, this)
        }, size: function (c) {
            return null == c ? b[a].phrase.size : (b[a].phrase.size = c, this)
        }, shardSize: function (c) {
            return null == c ? b[a].phrase.shard_size : (b[a].phrase.shard_size = c, this)
        }, realWorldErrorLikelihood: function (c) {
            return null == c ? b[a].phrase.real_world_error_likelihood : (b[a].phrase.real_world_error_likelihood = c, this)
        }, confidence: function (c) {
            return null == c ? b[a].phrase.confidence : (b[a].phrase.confidence = c, this)
        }, separator: function (c) {
            return null == c ? b[a].phrase.separator : (b[a].phrase.separator = c, this)
        }, maxErrors: function (c) {
            return null == c ? b[a].phrase.max_errors : (b[a].phrase.max_errors = c, this)
        }, gramSize: function (c) {
            return null == c ? b[a].phrase.gram_size : (b[a].phrase.gram_size = c, this)
        }, forceUnigrams: function (c) {
            return null == c ? b[a].phrase.force_unigrams : (b[a].phrase.force_unigrams = c, this)
        }, linearSmoothing: function (c, d, e) {
            return 0 === arguments.length ? b[a].phrase.smoothing : (b[a].phrase.smoothing = {linear: {trigram_lambda: c, bigram_lambda: d, unigram_lambda: e}}, this)
        }, laplaceSmoothing: function (c) {
            return null == c ? b[a].phrase.smoothing : (b[a].phrase.smoothing = {laplace: {alpha: c}}, this)
        }, stupidBackoffSmoothing: function (c) {
            return null == c ? b[a].phrase.smoothing : (b[a].phrase.smoothing = {stupid_backoff: {discount: c}}, this)
        }, directGenerator: function (c) {
            var e, f;
            if (null == b[a].phrase.direct_generator && (b[a].phrase.direct_generator = []), null == c)return b[a].phrase.direct_generator;
            if (t(c))b[a].phrase.direct_generator.push(c._self()); else {
                if (!d(c))throw new TypeError("Argument must be a Generator or array of Generators");
                for (b[a].phrase.direct_generator = [], e = 0, f = c.length; f > e; e++) {
                    if (!t(c[e]))throw new TypeError("Argument must be an array of Generators");
                    b[a].phrase.direct_generator.push(c[e]._self())
                }
            }
            return this
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"suggest"
        }, _self: function () {
            return b
        }}
    },u.TermSuggester = function (a) {
        var b = {}, d = u.DirectSettingsMixin();
        return b[a] = {term: d._self()}, c(d, {text: function (c) {
            return null == c ? b[a].text : (b[a].text = c, this)
        }, analyzer: function (c) {
            return null == c ? b[a].term.analyzer : (b[a].term.analyzer = c, this)
        }, field: function (c) {
            return null == c ? b[a].term.field : (b[a].term.field = c, this)
        }, size: function (c) {
            return null == c ? b[a].term.size : (b[a].term.size = c, this)
        }, shardSize: function (c) {
            return null == c ? b[a].term.shard_size : (b[a].term.shard_size = c, this)
        }, toString: function () {
            return JSON.stringify(b)
        }, _type: function () {
            return"suggest"
        }, _self: function () {
            return b
        }})
    },u.noConflict = function () {
        return v.ejs = w, this
    }
}.call(this), define("../vendor/elasticjs/elastic", function () {
}), angular.module("elasticjs.service", []).factory("ejsResource", ["$http", function (a) {
    return function (b) {
        var c = window.ejs || {}, d = function (a, b, c) {
            return a.then(function (a) {
                return(b || angular.noop)(a.data), a.data
            }, function (a) {
                return(c || angular.noop)(a.data), a.data
            })
        };
        return null == b && (b = ""), c.client = {server: function (a) {
            return null == a ? b : (b = a, this)
        }, post: function (c, e, f, g) {
            return c = b + c, d(a.post(c, e), f, g)
        }, get: function (c, e, f, g) {
            return c = b + c, d(a.get(c, e), f, g)
        }, put: function (c, e, f, g) {
            return c = b + c, d(a.put(c, e), f, g)
        }, del: function (c, e, f, g) {
            return c = b + c, d(a.delete(c, e), f, g)
        }, head: function (c, d, e, f) {
            return c = b + c, a.head(c, d).then(function (a) {
                return(e || angular.noop)(a.headers()), a.headers()
            }, function () {
                return(f || angular.noop)(void 0), void 0
            })
        }}, c
    }
}]), define("elasticjs", function () {
}), !function (a) {
    a(function () {
        a.support.transition = function () {
            var a = function () {
                var a, b = document.createElement("bootstrap"), c = {WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend"};
                for (a in c)if (void 0 !== b.style[a])return c[a]
            }();
            return a && {end: a}
        }()
    })
}(window.jQuery), !function (a) {
    var b = '[data-dismiss="alert"]', c = function (c) {
        a(c).on("click", b, this.close)
    };
    c.prototype.close = function (b) {
        function c() {
            d.trigger("closed").remove()
        }

        var d, e = a(this), f = e.attr("data-target");
        f || (f = e.attr("href"), f = f && f.replace(/.*(?=#[^\s]*$)/, "")), d = a(f), b && b.preventDefault(), d.length || (d = e.hasClass("alert") ? e : e.parent()), d.trigger(b = a.Event("close")), b.isDefaultPrevented() || (d.removeClass("in"), a.support.transition && d.hasClass("fade") ? d.on(a.support.transition.end, c) : c())
    };
    var d = a.fn.alert;
    a.fn.alert = function (b) {
        return this.each(function () {
            var d = a(this), e = d.data("alert");
            e || d.data("alert", e = new c(this)), "string" == typeof b && e[b].call(d)
        })
    }, a.fn.alert.Constructor = c, a.fn.alert.noConflict = function () {
        return a.fn.alert = d, this
    }, a(document).on("click.alert.data-api", b, c.prototype.close)
}(window.jQuery), !function (a) {
    var b = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.button.defaults, c)
    };
    b.prototype.setState = function (a) {
        var b = "disabled", c = this.$element, d = c.data(), e = c.is("input") ? "val" : "html";
        a += "Text", d.resetText || c.data("resetText", c[e]()), c[e](d[a] || this.options[a]), setTimeout(function () {
            "loadingText" == a ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b)
        }, 0)
    }, b.prototype.toggle = function () {
        var a = this.$element.closest('[data-toggle="buttons-radio"]');
        a && a.find(".active").removeClass("active"), this.$element.toggleClass("active")
    };
    var c = a.fn.button;
    a.fn.button = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("button"), f = "object" == typeof c && c;
            e || d.data("button", e = new b(this, f)), "toggle" == c ? e.toggle() : c && e.setState(c)
        })
    }, a.fn.button.defaults = {loadingText: "loading..."}, a.fn.button.Constructor = b, a.fn.button.noConflict = function () {
        return a.fn.button = c, this
    }, a(document).on("click.button.data-api", "[data-toggle^=button]", function (b) {
        var c = a(b.target);
        c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle")
    })
}(window.jQuery), !function (a) {
    var b = function (b, c) {
        this.$element = a(b), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, "hover" == this.options.pause && this.$element.on("mouseenter", a.proxy(this.pause, this)).on("mouseleave", a.proxy(this.cycle, this))
    };
    b.prototype = {cycle: function (b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, getActiveIndex: function () {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, to: function (b) {
        var c = this.getActiveIndex(), d = this;
        if (!(b > this.$items.length - 1 || 0 > b))return this.sliding ? this.$element.one("slid", function () {
            d.to(b)
        }) : c == b ? this.pause().cycle() : this.slide(b > c ? "next" : "prev", a(this.$items[b]))
    }, pause: function (b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition.end && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), clearInterval(this.interval), this.interval = null, this
    }, next: function () {
        return this.sliding ? void 0 : this.slide("next")
    }, prev: function () {
        return this.sliding ? void 0 : this.slide("prev")
    }, slide: function (b, c) {
        var d, e = this.$element.find(".item.active"), f = c || e[b](), g = this.interval, h = "next" == b ? "left" : "right", i = "next" == b ? "first" : "last", j = this;
        if (this.sliding = !0, g && this.pause(), f = f.length ? f : this.$element.find(".item")[i](), d = a.Event("slide", {relatedTarget: f[0], direction: h}), !f.hasClass("active")) {
            if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function () {
                var b = a(j.$indicators.children()[j.getActiveIndex()]);
                b && b.addClass("active")
            })), a.support.transition && this.$element.hasClass("slide")) {
                if (this.$element.trigger(d), d.isDefaultPrevented())return;
                f.addClass(b), f[0].offsetWidth, e.addClass(h), f.addClass(h), this.$element.one(a.support.transition.end, function () {
                    f.removeClass([b, h].join(" ")).addClass("active"), e.removeClass(["active", h].join(" ")), j.sliding = !1, setTimeout(function () {
                        j.$element.trigger("slid")
                    }, 0)
                })
            } else {
                if (this.$element.trigger(d), d.isDefaultPrevented())return;
                e.removeClass("active"), f.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return g && this.cycle(), this
        }
    }};
    var c = a.fn.carousel;
    a.fn.carousel = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("carousel"), f = a.extend({}, a.fn.carousel.defaults, "object" == typeof c && c), g = "string" == typeof c ? c : f.slide;
            e || d.data("carousel", e = new b(this, f)), "number" == typeof c ? e.to(c) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }, a.fn.carousel.defaults = {interval: 5e3, pause: "hover"}, a.fn.carousel.Constructor = b, a.fn.carousel.noConflict = function () {
        return a.fn.carousel = c, this
    }, a(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function (b) {
        var c, d, e = a(this), f = a(e.attr("data-target") || (c = e.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, "")), g = a.extend({}, f.data(), e.data());
        f.carousel(g), (d = e.attr("data-slide-to")) && f.data("carousel").pause().to(d).cycle(), b.preventDefault()
    })
}(window.jQuery), !function (a) {
    var b = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.collapse.defaults, c), this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    b.prototype = {constructor: b, dimension: function () {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, show: function () {
        var b, c, d, e;
        if (!this.transitioning && !this.$element.hasClass("in")) {
            if (b = this.dimension(), c = a.camelCase(["scroll", b].join("-")), d = this.$parent && this.$parent.find("> .accordion-group > .in"), d && d.length) {
                if (e = d.data("collapse"), e && e.transitioning)return;
                d.collapse("hide"), e || d.data("collapse", null)
            }
            this.$element[b](0), this.transition("addClass", a.Event("show"), "shown"), a.support.transition && this.$element[b](this.$element[0][c])
        }
    }, hide: function () {
        var b;
        !this.transitioning && this.$element.hasClass("in") && (b = this.dimension(), this.reset(this.$element[b]()), this.transition("removeClass", a.Event("hide"), "hidden"), this.$element[b](0))
    }, reset: function (a) {
        var b = this.dimension();
        return this.$element.removeClass("collapse")[b](a || "auto")[0].offsetWidth, this.$element[null !== a ? "addClass" : "removeClass"]("collapse"), this
    }, transition: function (b, c, d) {
        var e = this, f = function () {
            "show" == c.type && e.reset(), e.transitioning = 0, e.$element.trigger(d)
        };
        this.$element.trigger(c), c.isDefaultPrevented() || (this.transitioning = 1, this.$element[b]("in"), a.support.transition && this.$element.hasClass("collapse") ? this.$element.one(a.support.transition.end, f) : f())
    }, toggle: function () {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }};
    var c = a.fn.collapse;
    a.fn.collapse = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("collapse"), f = a.extend({}, a.fn.collapse.defaults, d.data(), "object" == typeof c && c);
            e || d.data("collapse", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.collapse.defaults = {toggle: !0}, a.fn.collapse.Constructor = b, a.fn.collapse.noConflict = function () {
        return a.fn.collapse = c, this
    }, a(document).on("click.collapse.data-api", "[data-toggle=collapse]", function (b) {
        var c, d = a(this), e = d.attr("data-target") || b.preventDefault() || (c = d.attr("href")) && c.replace(/.*(?=#[^\s]+$)/, ""), f = a(e).data("collapse") ? "toggle" : d.data();
        d[a(e).hasClass("in") ? "addClass" : "removeClass"]("collapsed"), a(e).collapse(f)
    })
}(window.jQuery), !function (a) {
    function b() {
        a(".dropdown-backdrop").remove(), a(d).each(function () {
            c(a(this)).removeClass("open")
        })
    }

    function c(b) {
        var c, d = b.attr("data-target");
        return d || (d = b.attr("href"), d = d && /#/.test(d) && d.replace(/.*(?=#[^\s]*$)/, "")), c = d && a(d), c && c.length || (c = b.parent()), c
    }

    var d = "[data-toggle=dropdown]", e = function (b) {
        var c = a(b).on("click.dropdown.data-api", this.toggle);
        a("html").on("click.dropdown.data-api", function () {
            c.parent().removeClass("open")
        })
    };
    e.prototype = {constructor: e, toggle: function () {
        var d, e, f = a(this);
        if (!f.is(".disabled, :disabled"))return d = c(f), e = d.hasClass("open"), b(), e || ("ontouchstart"in document.documentElement && a('<div class="dropdown-backdrop"/>').insertBefore(a(this)).on("click", b), d.toggleClass("open")), f.focus(), !1
    }, keydown: function (b) {
        var e, f, g, h, i;
        if (/(38|40|27)/.test(b.keyCode) && (e = a(this), b.preventDefault(), b.stopPropagation(), !e.is(".disabled, :disabled"))) {
            if (g = c(e), h = g.hasClass("open"), !h || h && 27 == b.keyCode)return 27 == b.which && g.find(d).focus(), e.click();
            f = a("[role=menu] li:not(.divider):visible a", g), f.length && (i = f.index(f.filter(":focus")), 38 == b.keyCode && i > 0 && i--, 40 == b.keyCode && i < f.length - 1 && i++, ~i || (i = 0), f.eq(i).focus())
        }
    }};
    var f = a.fn.dropdown;
    a.fn.dropdown = function (b) {
        return this.each(function () {
            var c = a(this), d = c.data("dropdown");
            d || c.data("dropdown", d = new e(this)), "string" == typeof b && d[b].call(c)
        })
    }, a.fn.dropdown.Constructor = e, a.fn.dropdown.noConflict = function () {
        return a.fn.dropdown = f, this
    }, a(document).on("click.dropdown.data-api", b).on("click.dropdown.data-api", ".dropdown form", function (a) {
        a.stopPropagation()
    }).on("click.dropdown.data-api", d, e.prototype.toggle).on("keydown.dropdown.data-api", d + ", [role=menu]", e.prototype.keydown)
}(window.jQuery), !function (a) {
    var b = function (b, c) {
        this.options = c, this.$element = a(b).delegate('[data-dismiss="modal"]', "click.dismiss.modal", a.proxy(this.hide, this)), this.options.remote && this.$element.find(".modal-body").load(this.options.remote)
    };
    b.prototype = {constructor: b, toggle: function () {
        return this[this.isShown ? "hide" : "show"]()
    }, show: function () {
        var b = this, c = a.Event("show");
        this.$element.trigger(c), this.isShown || c.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.backdrop(function () {
            var c = a.support.transition && b.$element.hasClass("fade");
            b.$element.parent().length || b.$element.appendTo(document.body), b.$element.show(), c && b.$element[0].offsetWidth, b.$element.addClass("in").attr("aria-hidden", !1), b.enforceFocus(), c ? b.$element.one(a.support.transition.end, function () {
                b.$element.focus().trigger("shown")
            }) : b.$element.focus().trigger("shown")
        }))
    }, hide: function (b) {
        b && b.preventDefault(), b = a.Event("hide"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.escape(), a(document).off("focusin.modal"), this.$element.removeClass("in").attr("aria-hidden", !0), a.support.transition && this.$element.hasClass("fade") ? this.hideWithTransition() : this.hideModal())
    }, enforceFocus: function () {
        var b = this;
        a(document).on("focusin.modal", function (a) {
            b.$element[0] === a.target || b.$element.has(a.target).length || b.$element.focus()
        })
    }, escape: function () {
        var a = this;
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.modal", function (b) {
            27 == b.which && a.hide()
        }) : this.isShown || this.$element.off("keyup.dismiss.modal")
    }, hideWithTransition: function () {
        var b = this, c = setTimeout(function () {
            b.$element.off(a.support.transition.end), b.hideModal()
        }, 500);
        this.$element.one(a.support.transition.end, function () {
            clearTimeout(c), b.hideModal()
        })
    }, hideModal: function () {
        var a = this;
        this.$element.hide(), this.backdrop(function () {
            a.removeBackdrop(), a.$element.trigger("hidden")
        })
    }, removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, backdrop: function (b) {
        var c = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var d = a.support.transition && c;
            if (this.$backdrop = a('<div class="modal-backdrop ' + c + '" />').appendTo(document.body), this.$backdrop.click("static" == this.options.backdrop ? a.proxy(this.$element[0].focus, this.$element[0]) : a.proxy(this.hide, this)), d && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b)return;
            d ? this.$backdrop.one(a.support.transition.end, b) : b()
        } else!this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, b) : b()) : b && b()
    }};
    var c = a.fn.modal;
    a.fn.modal = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("modal"), f = a.extend({}, a.fn.modal.defaults, d.data(), "object" == typeof c && c);
            e || d.data("modal", e = new b(this, f)), "string" == typeof c ? e[c]() : f.show && e.show()
        })
    }, a.fn.modal.defaults = {backdrop: !0, keyboard: !0, show: !0}, a.fn.modal.Constructor = b, a.fn.modal.noConflict = function () {
        return a.fn.modal = c, this
    }, a(document).on("click.modal.data-api", '[data-toggle="modal"]', function (b) {
        var c = a(this), d = c.attr("href"), e = a(c.attr("data-target") || d && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({remote: !/#/.test(d) && d}, e.data(), c.data());
        b.preventDefault(), e.modal(f).one("hide", function () {
            c.focus()
        })
    })
}(window.jQuery), !function (a) {
    var b = function (a, b) {
        this.init("tooltip", a, b)
    };
    b.prototype = {constructor: b, init: function (b, c, d) {
        var e, f, g, h, i;
        for (this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.enabled = !0, g = this.options.trigger.split(" "), i = g.length; i--;)h = g[i], "click" == h ? this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this)) : "manual" != h && (e = "hover" == h ? "mouseenter" : "focus", f = "hover" == h ? "mouseleave" : "blur", this.$element.on(e + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(f + "." + this.type, this.options.selector, a.proxy(this.leave, this)));
        this.options.selector ? this._options = a.extend({}, this.options, {trigger: "manual", selector: ""}) : this.fixTitle()
    }, getOptions: function (b) {
        return b = a.extend({}, a.fn[this.type].defaults, this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {show: b.delay, hide: b.delay}), b
    }, enter: function (b) {
        var c, d = a.fn[this.type].defaults, e = {};
        return this._options && a.each(this._options, function (a, b) {
            d[a] != b && (e[a] = b)
        }, this), c = a(b.currentTarget)[this.type](e).data(this.type), c.options.delay && c.options.delay.show ? (clearTimeout(this.timeout), c.hoverState = "in", this.timeout = setTimeout(function () {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show), void 0) : c.show()
    }, leave: function (b) {
        var c = a(b.currentTarget)[this.type](this._options).data(this.type);
        return this.timeout && clearTimeout(this.timeout), c.options.delay && c.options.delay.hide ? (c.hoverState = "out", this.timeout = setTimeout(function () {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide), void 0) : c.hide()
    }, show: function () {
        var b, c, d, e, f, g, h = a.Event("show");
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(h), h.isDefaultPrevented())return;
            switch (b = this.tip(), this.setContent(), this.options.animation && b.addClass("fade"), f = "function" == typeof this.options.placement ? this.options.placement.call(this, b[0], this.$element[0]) : this.options.placement, b.detach().css({top: 0, left: 0, display: "block"}), this.options.container ? b.appendTo(this.options.container) : b.insertAfter(this.$element), c = this.getPosition(), d = b[0].offsetWidth, e = b[0].offsetHeight, f) {
                case"bottom":
                    g = {top: c.top + c.height, left: c.left + c.width / 2 - d / 2};
                    break;
                case"top":
                    g = {top: c.top - e, left: c.left + c.width / 2 - d / 2};
                    break;
                case"left":
                    g = {top: c.top + c.height / 2 - e / 2, left: c.left - d};
                    break;
                case"right":
                    g = {top: c.top + c.height / 2 - e / 2, left: c.left + c.width};
                    break;
                case"topLeft":
                    g = {top: c.top - e, left: c.left + c.width / 2 - .1 * d};
                    break;
                case"topRight":
                    g = {top: c.top - e, left: c.left + c.width / 2 - .9 * d};
                    break;
                case"rightTop":
                    g = {top: c.top + c.height / 2 - .1 * e, left: c.left + c.width};
                    break;
                case"rightBottom":
                    g = {top: c.top + c.height / 2 - .9 * e, left: c.left + c.width};
                    break;
                case"bottomLeft":
                    g = {top: c.top + c.height, left: c.left + c.width / 2 - .1 * d};
                    break;
                case"bottomRight":
                    g = {top: c.top + c.height, left: c.left + c.width / 2 - .9 * d};
                    break;
                case"leftTop":
                    g = {top: c.top + c.height / 2 - .1 * e, left: c.left - d};
                    break;
                case"leftBottom":
                    g = {top: c.top + c.height / 2 - .9 * e, left: c.left - d}
            }
            this.applyPlacement(g, f), this.$element.trigger("shown")
        }
    }, applyPlacement: function (a, b) {
        var c, d, e, f, g = this.tip(), h = g[0].offsetWidth, i = g[0].offsetHeight;
        g.offset(a).addClass(b).addClass("in"), c = g[0].offsetWidth, d = g[0].offsetHeight, "top" == b && d != i && (a.top = a.top + i - d, f = !0), "bottom" == b || "top" == b ? (e = 0, a.left < 0 && (e = -2 * a.left, a.left = 0, g.offset(a), c = g[0].offsetWidth, d = g[0].offsetHeight), this.replaceArrow(e - h + c, c, "left")) : this.replaceArrow(d - i, d, "top"), f && g.offset(a)
    }, replaceArrow: function (a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, setContent: function () {
        var a = this.tip(), b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, hide: function () {
        function b() {
            var b = setTimeout(function () {
                c.off(a.support.transition.end).detach()
            }, 500);
            c.one(a.support.transition.end, function () {
                clearTimeout(b), c.detach()
            })
        }

        var c = this.tip(), d = a.Event("hide");
        return this.$element.trigger(d), d.isDefaultPrevented() ? void 0 : (c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? b() : c.detach(), this.$element.trigger("hidden"), this)
    }, fixTitle: function () {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, hasContent: function () {
        return this.getTitle()
    }, getPosition: function () {
        var b = this.$element[0];
        return a.extend({}, "function" == typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {width: b.offsetWidth, height: b.offsetHeight}, this.$element.offset())
    }, getTitle: function () {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, tip: function () {
        return this.$tip = this.$tip || a(this.options.template)
    }, arrow: function () {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, validate: function () {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, enable: function () {
        this.enabled = !0
    }, disable: function () {
        this.enabled = !1
    }, toggleEnabled: function () {
        this.enabled = !this.enabled
    }, toggle: function (b) {
        var c = b ? a(b.currentTarget)[this.type](this._options).data(this.type) : this;
        c.tip().hasClass("in") ? c.hide() : c.show()
    }, destroy: function () {
        this.hide().$element.off("." + this.type).removeData(this.type)
    }};
    var c = a.fn.tooltip;
    a.fn.tooltip = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("tooltip"), f = "object" == typeof c && c;
            e || d.data("tooltip", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.defaults = {animation: !0, placement: "top", selector: !1, template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1}, a.fn.tooltip.noConflict = function () {
        return a.fn.tooltip = c, this
    }
}(window.jQuery), !function (a) {
    var b = function (a, b) {
        this.init("popover", a, b)
    };
    b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype, {constructor: b, setContent: function () {
        var a = this.tip(), b = this.getTitle(), c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? "html" : "text"](c), a.removeClass("fade top bottom left right in")
    }, hasContent: function () {
        return this.getTitle() || this.getContent()
    }, getContent: function () {
        var a, b = this.$element, c = this.options;
        return a = ("function" == typeof c.content ? c.content.call(b[0]) : c.content) || b.attr("data-content")
    }, tip: function () {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    }, destroy: function () {
        this.hide().$element.off("." + this.type).removeData(this.type)
    }});
    var c = a.fn.popover;
    a.fn.popover = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("popover"), f = "object" == typeof c && c;
            e || d.data("popover", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.popover.Constructor = b, a.fn.popover.defaults = a.extend({}, a.fn.tooltip.defaults, {placement: "right", trigger: "click", content: "", template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}), a.fn.popover.noConflict = function () {
        return a.fn.popover = c, this
    }
}(window.jQuery), !function (a) {
    function b(b, c) {
        var d, e = a.proxy(this.process, this), f = a(b).is("body") ? a(window) : a(b);
        this.options = a.extend({}, a.fn.scrollspy.defaults, c), this.$scrollElement = f.on("scroll.scroll-spy.data-api", e), this.selector = (this.options.target || (d = a(b).attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = a("body"), this.refresh(), this.process()
    }

    b.prototype = {constructor: b, refresh: function () {
        var b, c = this;
        this.offsets = a([]), this.targets = a([]), b = this.$body.find(this.selector).map(function () {
            var b = a(this), d = b.data("target") || b.attr("href"), e = /^#\w/.test(d) && a(d);
            return e && e.length && [
                [e.position().top + (!a.isWindow(c.$scrollElement.get(0)) && c.$scrollElement.scrollTop()), d]
            ] || null
        }).sort(function (a, b) {
            return a[0] - b[0]
        }).each(function () {
            c.offsets.push(this[0]), c.targets.push(this[1])
        })
    }, process: function () {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, d = c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
        if (b >= d)return g != (a = f.last()[0]) && this.activate(a);
        for (a = e.length; a--;)g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
    }, activate: function (b) {
        var c, d;
        this.activeTarget = b, a(this.selector).parent(".active").removeClass("active"), d = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]', c = a(d).parent("li").addClass("active"), c.parent(".dropdown-menu").length && (c = c.closest("li.dropdown").addClass("active")), c.trigger("activate")
    }};
    var c = a.fn.scrollspy;
    a.fn.scrollspy = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("scrollspy"), f = "object" == typeof c && c;
            e || d.data("scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.defaults = {offset: 10}, a.fn.scrollspy.noConflict = function () {
        return a.fn.scrollspy = c, this
    }, a(window).on("load", function () {
        a('[data-spy="scroll"]').each(function () {
            var b = a(this);
            b.scrollspy(b.data())
        })
    })
}(window.jQuery), !function (a) {
    var b = function (b) {
        this.element = a(b)
    };
    b.prototype = {constructor: b, show: function () {
        var b, c, d, e = this.element, f = e.closest("ul:not(.dropdown-menu)"), g = e.attr("data-target");
        g || (g = e.attr("href"), g = g && g.replace(/.*(?=#[^\s]*$)/, "")), e.parent("li").hasClass("active") || (b = f.find(".active:last a")[0], d = a.Event("show", {relatedTarget: b}), e.trigger(d), d.isDefaultPrevented() || (c = a(g), this.activate(e.parent("li"), f), this.activate(c, c.parent(), function () {
            e.trigger({type: "shown", relatedTarget: b})
        })))
    }, activate: function (b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }

        var f = c.find("> .active"), g = d && a.support.transition && f.hasClass("fade");
        g ? f.one(a.support.transition.end, e) : e(), f.removeClass("in")
    }};
    var c = a.fn.tab;
    a.fn.tab = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("tab");
            e || d.data("tab", e = new b(this)), "string" == typeof c && e[c]()
        })
    }, a.fn.tab.Constructor = b, a.fn.tab.noConflict = function () {
        return a.fn.tab = c, this
    }, a(document).on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function (b) {
        b.preventDefault(), a(this).tab("show")
    })
}(window.jQuery), !function (a) {
    var b = function (b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.typeahead.defaults, c), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.updater = this.options.updater || this.updater, this.source = this.options.source, this.$menu = a(this.options.menu), this.shown = !1, this.listen()
    };
    b.prototype = {constructor: b, select: function () {
        var a = this.$menu.find(".active").attr("data-value") || this.$element.val();
        return this.$element.val(this.updater(a)).change(), this.hide()
    }, updater: function (a) {
        return a
    }, show: function () {
        var b = a.extend({}, this.$element.position(), {height: this.$element[0].offsetHeight});
        return this.$menu.insertAfter(this.$element).css({top: b.top + b.height, left: b.left}).show(), this.shown = !0, this
    }, hide: function () {
        return this.$menu.hide(), this.shown = !1, this
    }, lookup: function () {
        var b;
        return this.query = this.$element.val(), !this.query || this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (b = a.isFunction(this.source) ? this.source(this.query, a.proxy(this.process, this)) : this.source, b ? this.process(b) : this)
    }, process: function (b) {
        var c = this;
        return b = a.grep(b, function (a) {
            return c.matcher(a)
        }), b = this.sorter(b), b.length ? this.render(b.slice(0, this.options.items)).show() : this.shown ? this.hide() : this
    }, matcher: function (a) {
        return~a.toLowerCase().indexOf(this.query.toLowerCase())
    }, sorter: function (a) {
        for (var b, c = [], d = [], e = []; b = a.shift();)b.toLowerCase().indexOf(this.query.toLowerCase()) ? ~b.indexOf(this.query) ? d.push(b) : e.push(b) : c.push(b);
        return c.concat(d, e)
    }, highlighter: function (a) {
        var b = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
        return a.replace(new RegExp("(" + b + ")", "ig"), function (a, b) {
            return"<strong>" + b + "</strong>"
        })
    }, render: function (b) {
        var c = this;
        return b = a(b).map(function (b, d) {
            return b = a(c.options.item).attr("data-value", d), b.find("a").html(c.highlighter(d)), b[0]
        }), this.$menu.html(b), this
    }, next: function () {
        var b = this.$menu.find(".active").removeClass("active"), c = b.next();
        c.length || (c = a(this.$menu.find("li")[0])), c.addClass("active")
    }, prev: function () {
        var a = this.$menu.find(".active").removeClass("active"), b = a.prev();
        b.length || (b = this.$menu.find("li").last()), b.addClass("active")
    }, listen: function () {
        this.$element.on("focus", a.proxy(this.focus, this)).on("blur", a.proxy(this.blur, this)).on("keypress", a.proxy(this.keypress, this)).on("keyup", a.proxy(this.keyup, this)), this.eventSupported("keydown") && this.$element.on("keydown", a.proxy(this.keydown, this)), this.$menu.on("click", a.proxy(this.click, this)).on("mouseenter", "li", a.proxy(this.mouseenter, this)).on("mouseleave", "li", a.proxy(this.mouseleave, this))
    }, eventSupported: function (a) {
        var b = a in this.$element;
        return b || (this.$element.setAttribute(a, "return;"), b = "function" == typeof this.$element[a]), b
    }, move: function (a) {
        if (this.shown) {
            switch (a.keyCode) {
                case 9:
                case 13:
                case 27:
                    a.preventDefault();
                    break;
                case 38:
                    a.preventDefault(), this.prev();
                    break;
                case 40:
                    a.preventDefault(), this.next()
            }
            a.stopPropagation()
        }
    }, keydown: function (b) {
        this.suppressKeyPressRepeat = ~a.inArray(b.keyCode, [40, 38, 9, 13, 27, 57]), this.move(b)
    }, keypress: function (a) {
        this.suppressKeyPressRepeat || this.move(a)
    }, keyup: function (a) {
        switch (a.keyCode) {
            case 40:
            case 38:
            case 16:
            case 17:
            case 18:
                break;
            case 9:
            case 13:
                if (!this.shown)return;
                this.select();
                break;
            case 27:
                if (!this.shown)return;
                this.hide();
                break;
            default:
                this.lookup()
        }
        13 === a.keyCode && "undefined" == typeof this.$menu.find(".active").attr("data-value") ? this.$element.submit() : (a.stopPropagation(), a.preventDefault())
    }, focus: function () {
        this.focused = !0
    }, blur: function () {
        this.focused = !1, !this.mousedover && this.shown && this.hide()
    }, click: function (a) {
        a.stopPropagation(), a.preventDefault(), this.select(), this.$element.focus()
    }, mouseenter: function (b) {
        this.mousedover = !0, this.$menu.find(".active").removeClass("active"), a(b.currentTarget).addClass("active")
    }, mouseleave: function () {
        this.mousedover = !1, !this.focused && this.shown && this.hide()
    }};
    var c = a.fn.typeahead;
    a.fn.typeahead = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("typeahead"), f = "object" == typeof c && c;
            e || d.data("typeahead", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.typeahead.defaults = {source: [], items: 8, menu: '<ul class="typeahead dropdown-menu"></ul>', item: '<li><a href="#"></a></li>', minLength: 1}, a.fn.typeahead.Constructor = b, a.fn.typeahead.noConflict = function () {
        return a.fn.typeahead = c, this
    }, a(document).on("focus.typeahead.data-api", '[data-provide="typeahead"]', function () {
        var b = a(this);
        b.data("typeahead") || b.typeahead(b.data())
    })
}(window.jQuery), !function (a) {
    var b = function (b, c) {
        this.options = a.extend({}, a.fn.affix.defaults, c), this.$window = a(window).on("scroll.affix.data-api", a.proxy(this.checkPosition, this)).on("click.affix.data-api", a.proxy(function () {
            setTimeout(a.proxy(this.checkPosition, this), 1)
        }, this)), this.$element = a(b), this.checkPosition()
    };
    b.prototype.checkPosition = function () {
        if (this.$element.is(":visible")) {
            var b, c = a(document).height(), d = this.$window.scrollTop(), e = this.$element.offset(), f = this.options.offset, g = f.bottom, h = f.top, i = "affix affix-top affix-bottom";
            "object" != typeof f && (g = h = f), "function" == typeof h && (h = f.top()), "function" == typeof g && (g = f.bottom()), b = null != this.unpin && d + this.unpin <= e.top ? !1 : null != g && e.top + this.$element.height() >= c - g ? "bottom" : null != h && h >= d ? "top" : !1, this.affixed !== b && (this.affixed = b, this.unpin = "bottom" == b ? e.top - d : null, this.$element.removeClass(i).addClass("affix" + (b ? "-" + b : "")))
        }
    };
    var c = a.fn.affix;
    a.fn.affix = function (c) {
        return this.each(function () {
            var d = a(this), e = d.data("affix"), f = "object" == typeof c && c;
            e || d.data("affix", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }, a.fn.affix.Constructor = b, a.fn.affix.defaults = {offset: 0}, a.fn.affix.noConflict = function () {
        return a.fn.affix = c, this
    }, a(window).on("load", function () {
        a('[data-spy="affix"]').each(function () {
            var b = a(this), c = b.data();
            c.offset = c.offset || {}, c.offsetBottom && (c.offset.bottom = c.offsetBottom), c.offsetTop && (c.offset.top = c.offsetTop), b.affix(c)
        })
    })
}(window.jQuery), define("bootstrap", ["jquery"], function () {
}), function (a, b) {
    function c(a) {
        var b, c = {}, d = a.split(",");
        for (b = 0; b < d.length; b++)c[d[b]] = !0;
        return c
    }

    function d(a, c) {
        function d(a, d, g, h) {
            if (d = b.lowercase(d), v[d])for (; q.last() && w[q.last()];)f("", q.last());
            u[d] && q.last() == d && f("", d), h = r[d] || !!h, h || q.push(d);
            var i = {};
            g.replace(k, function (a, b, c, d, f) {
                var g = c || d || f || "";
                i[b] = e(g)
            }), c.start && c.start(d, i, h)
        }

        function f(a, d) {
            var e, f = 0;
            if (d = b.lowercase(d))for (f = q.length - 1; f >= 0 && q[f] != d; f--);
            if (f >= 0) {
                for (e = q.length - 1; e >= f; e--)c.end && c.end(q[e]);
                q.length = f
            }
        }

        var g, h, p, q = [], s = a;
        for (q.last = function () {
            return q[q.length - 1]
        }; a;) {
            if (h = !0, q.last() && x[q.last()])a = a.replace(new RegExp("(.*)<\\s*\\/\\s*" + q.last() + "[^>]*>", "i"), function (a, b) {
                return b = b.replace(n, "$1").replace(o, "$1"), c.chars && c.chars(e(b)), ""
            }), f("", q.last()); else if (0 === a.indexOf("<!--") ? (g = a.indexOf("-->"), g >= 0 && (c.comment && c.comment(a.substring(4, g)), a = a.substring(g + 3), h = !1)) : m.test(a) ? (p = a.match(j), p && (a = a.substring(p[0].length), p[0].replace(j, f), h = !1)) : l.test(a) && (p = a.match(i), p && (a = a.substring(p[0].length), p[0].replace(i, d), h = !1)), h) {
                g = a.indexOf("<");
                var t = 0 > g ? a : a.substring(0, g);
                a = 0 > g ? "" : a.substring(g), c.chars && c.chars(e(t))
            }
            if (a == s)throw"Parse Error: " + a;
            s = a
        }
        f()
    }

    function e(a) {
        return B.innerHTML = a.replace(/</g, "&lt;"), B.innerText || B.textContent || ""
    }

    function f(a) {
        return a.replace(/&/g, "&amp;").replace(q, function (a) {
            return"&#" + a.charCodeAt(0) + ";"
        }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }

    function g(a) {
        var c = !1, d = b.bind(a, a.push);
        return{start: function (a, e, g) {
            a = b.lowercase(a), !c && x[a] && (c = a), c || 1 != y[a] || (d("<"), d(a), b.forEach(e, function (a, c) {
                var e = b.lowercase(c);
                1 != A[e] || z[e] === !0 && !a.match(p) || (d(" "), d(c), d('="'), d(f(a)), d('"'))
            }), d(g ? "/>" : ">"))
        }, end: function (a) {
            a = b.lowercase(a), c || 1 != y[a] || (d("</"), d(a), d(">")), a == c && (c = !1)
        }, chars: function (a) {
            c || d(f(a))
        }}
    }

    var h = function (a) {
        var b = [];
        return d(a, g(b)), b.join("")
    }, i = /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/, j = /^<\s*\/\s*([\w:-]+)[^>]*>/, k = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g, l = /^</, m = /^<\s*\//, n = /<!--(.*?)-->/g, o = /<!\[CDATA\[(.*?)]]>/g, p = /^((ftp|https?):\/\/|mailto:|tel:|#)/, q = /([^\#-~| |!])/g, r = c("area,br,col,hr,img,wbr"), s = c("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"), t = c("rp,rt"), u = b.extend({}, t, s), v = b.extend({}, s, c("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")), w = b.extend({}, t, c("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")), x = c("script,style"), y = b.extend({}, r, v, w, u), z = c("background,cite,href,longdesc,src,usemap"), A = b.extend({}, z, c("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,span,start,summary,target,title,type,valign,value,vspace,width")), B = document.createElement("pre");
    b.module("ngSanitize", []).value("$sanitize", h), b.module("ngSanitize").directive("ngBindHtml", ["$sanitize", function (a) {
        return function (b, c, d) {
            c.addClass("ng-binding").data("$binding", d.ngBindHtml), b.$watch(d.ngBindHtml, function (b) {
                b = a(b), c.html(b || "")
            })
        }
    }]), b.module("ngSanitize").filter("linky", function () {
        var a = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s\.\;\,\(\)\{\}\<\>]/, c = /^mailto:/;
        return function (d, e) {
            if (!d)return d;
            var f, h, i, j = d, k = [], l = g(k), m = {};
            for (b.isDefined(e) && (m.target = e); f = j.match(a);)h = f[0], f[2] == f[3] && (h = "mailto:" + h), i = f.index, l.chars(j.substr(0, i)), m.href = h, l.start("a", m), l.chars(f[0].replace(c, "")), l.end("a"), j = j.substring(i + f[0].length);
            return l.chars(j), k.join("")
        }
    })
}(window, window.angular), define("angular-sanitize", function () {
}), function (a, b, c, d) {
    var e = function (b, c) {
        this.widget = "", this.$element = a(b), this.defaultTime = c.defaultTime, this.disableFocus = c.disableFocus, this.isOpen = c.isOpen, this.minuteStep = c.minuteStep, this.modalBackdrop = c.modalBackdrop, this.secondStep = c.secondStep, this.showInputs = c.showInputs, this.showMeridian = c.showMeridian, this.showSeconds = c.showSeconds, this.template = c.template, this.appendWidgetTo = c.appendWidgetTo, this._init()
    };
    e.prototype = {constructor: e, _init: function () {
        var b = this;
        this.$element.parent().hasClass("input-append") || this.$element.parent().hasClass("input-prepend") ? (this.$element.parent(".input-append, .input-prepend").find(".add-on").on({"click.timepicker": a.proxy(this.showWidget, this)}), this.$element.on({"focus.timepicker": a.proxy(this.highlightUnit, this), "click.timepicker": a.proxy(this.highlightUnit, this), "keydown.timepicker": a.proxy(this.elementKeydown, this), "blur.timepicker": a.proxy(this.blurElement, this)})) : this.template ? this.$element.on({"focus.timepicker": a.proxy(this.showWidget, this), "click.timepicker": a.proxy(this.showWidget, this), "blur.timepicker": a.proxy(this.blurElement, this)}) : this.$element.on({"focus.timepicker": a.proxy(this.highlightUnit, this), "click.timepicker": a.proxy(this.highlightUnit, this), "keydown.timepicker": a.proxy(this.elementKeydown, this), "blur.timepicker": a.proxy(this.blurElement, this)}), this.$widget = this.template !== !1 ? a(this.getTemplate()).prependTo(this.$element.parents(this.appendWidgetTo)).on("click", a.proxy(this.widgetClick, this)) : !1, this.showInputs && this.$widget !== !1 && this.$widget.find("input").each(function () {
            a(this).on({"click.timepicker": function () {
                a(this).select()
            }, "keydown.timepicker": a.proxy(b.widgetKeydown, b)})
        }), this.setDefaultTime(this.defaultTime)
    }, blurElement: function () {
        this.highlightedUnit = d, this.updateFromElementVal()
    }, decrementHour: function () {
        if (this.showMeridian)if (1 === this.hour)this.hour = 12; else {
            if (12 === this.hour)return this.hour--, this.toggleMeridian();
            if (0 === this.hour)return this.hour = 11, this.toggleMeridian();
            this.hour--
        } else 0 === this.hour ? this.hour = 23 : this.hour--;
        this.update()
    }, decrementMinute: function (a) {
        var b;
        b = a ? this.minute - a : this.minute - this.minuteStep, 0 > b ? (this.decrementHour(), this.minute = b + 60) : this.minute = b, this.update()
    }, decrementSecond: function () {
        var a = this.second - this.secondStep;
        0 > a ? (this.decrementMinute(!0), this.second = a + 60) : this.second = a, this.update()
    }, elementKeydown: function (a) {
        switch (a.keyCode) {
            case 9:
                switch (this.updateFromElementVal(), this.highlightedUnit) {
                    case"hour":
                        a.preventDefault(), this.highlightNextUnit();
                        break;
                    case"minute":
                        (this.showMeridian || this.showSeconds) && (a.preventDefault(), this.highlightNextUnit());
                        break;
                    case"second":
                        this.showMeridian && (a.preventDefault(), this.highlightNextUnit())
                }
                break;
            case 27:
                this.updateFromElementVal();
                break;
            case 37:
                a.preventDefault(), this.highlightPrevUnit(), this.updateFromElementVal();
                break;
            case 38:
                switch (a.preventDefault(), this.highlightedUnit) {
                    case"hour":
                        this.incrementHour(), this.highlightHour();
                        break;
                    case"minute":
                        this.incrementMinute(), this.highlightMinute();
                        break;
                    case"second":
                        this.incrementSecond(), this.highlightSecond();
                        break;
                    case"meridian":
                        this.toggleMeridian(), this.highlightMeridian()
                }
                break;
            case 39:
                a.preventDefault(), this.updateFromElementVal(), this.highlightNextUnit();
                break;
            case 40:
                switch (a.preventDefault(), this.highlightedUnit) {
                    case"hour":
                        this.decrementHour(), this.highlightHour();
                        break;
                    case"minute":
                        this.decrementMinute(), this.highlightMinute();
                        break;
                    case"second":
                        this.decrementSecond(), this.highlightSecond();
                        break;
                    case"meridian":
                        this.toggleMeridian(), this.highlightMeridian()
                }
        }
    }, formatTime: function (a, b, c, d) {
        return a = 10 > a ? "0" + a : a, b = 10 > b ? "0" + b : b, c = 10 > c ? "0" + c : c, a + ":" + b + (this.showSeconds ? ":" + c : "") + (this.showMeridian ? " " + d : "")
    }, getCursorPosition: function () {
        var a = this.$element.get(0);
        if ("selectionStart"in a)return a.selectionStart;
        if (c.selection) {
            a.focus();
            var b = c.selection.createRange(), d = c.selection.createRange().text.length;
            return b.moveStart("character", -a.value.length), b.text.length - d
        }
    }, getTemplate: function () {
        var a, b, c, d, e, f;
        switch (this.showInputs ? (b = '<input type="text" name="hour" class="bootstrap-timepicker-hour" maxlength="2"/>', c = '<input type="text" name="minute" class="bootstrap-timepicker-minute" maxlength="2"/>', d = '<input type="text" name="second" class="bootstrap-timepicker-second" maxlength="2"/>', e = '<input type="text" name="meridian" class="bootstrap-timepicker-meridian" maxlength="2"/>') : (b = '<span class="bootstrap-timepicker-hour"></span>', c = '<span class="bootstrap-timepicker-minute"></span>', d = '<span class="bootstrap-timepicker-second"></span>', e = '<span class="bootstrap-timepicker-meridian"></span>'), f = '<table><tr><td><a href="#" data-action="incrementHour"><i class="icon-chevron-up"></i></a></td><td class="separator">&nbsp;</td><td><a href="#" data-action="incrementMinute"><i class="icon-chevron-up"></i></a></td>' + (this.showSeconds ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="incrementSecond"><i class="icon-chevron-up"></i></a></td>' : "") + (this.showMeridian ? '<td class="separator">&nbsp;</td><td class="meridian-column"><a href="#" data-action="toggleMeridian"><i class="icon-chevron-up"></i></a></td>' : "") + "</tr>" + "<tr>" + "<td>" + b + "</td> " + '<td class="separator">:</td>' + "<td>" + c + "</td> " + (this.showSeconds ? '<td class="separator">:</td><td>' + d + "</td>" : "") + (this.showMeridian ? '<td class="separator">&nbsp;</td><td>' + e + "</td>" : "") + "</tr>" + "<tr>" + '<td><a href="#" data-action="decrementHour"><i class="icon-chevron-down"></i></a></td>' + '<td class="separator"></td>' + '<td><a href="#" data-action="decrementMinute"><i class="icon-chevron-down"></i></a></td>' + (this.showSeconds ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="decrementSecond"><i class="icon-chevron-down"></i></a></td>' : "") + (this.showMeridian ? '<td class="separator">&nbsp;</td><td><a href="#" data-action="toggleMeridian"><i class="icon-chevron-down"></i></a></td>' : "") + "</tr>" + "</table>", this.template) {
            case"modal":
                a = '<div class="bootstrap-timepicker-widget modal hide fade in" data-backdrop="' + (this.modalBackdrop ? "true" : "false") + '">' + '<div class="modal-header">' + '<a href="#" class="close" data-dismiss="modal">×</a>' + "<h3>Pick a Time</h3>" + "</div>" + '<div class="modal-content">' + f + "</div>" + '<div class="modal-footer">' + '<a href="#" class="btn btn-primary" data-dismiss="modal">OK</a>' + "</div>" + "</div>";
                break;
            case"dropdown":
                a = '<div class="bootstrap-timepicker-widget dropdown-menu">' + f + "</div>"
        }
        return a
    }, getTime: function () {
        return this.formatTime(this.hour, this.minute, this.second, this.meridian)
    }, hideWidget: function () {
        this.isOpen !== !1 && (this.showInputs && this.updateFromWidgetInputs(), this.$element.trigger({type: "hide.timepicker", time: {value: this.getTime(), hours: this.hour, minutes: this.minute, seconds: this.second, meridian: this.meridian}}), "modal" === this.template ? this.$widget.modal("hide") : this.$widget.removeClass("open"), a(c).off("mousedown.timepicker"), this.isOpen = !1)
    }, highlightUnit: function () {
        this.position = this.getCursorPosition(), this.position >= 0 && this.position <= 2 ? this.highlightHour() : this.position >= 3 && this.position <= 5 ? this.highlightMinute() : this.position >= 6 && this.position <= 8 ? this.showSeconds ? this.highlightSecond() : this.highlightMeridian() : this.position >= 9 && this.position <= 11 && this.highlightMeridian()
    }, highlightNextUnit: function () {
        switch (this.highlightedUnit) {
            case"hour":
                this.highlightMinute();
                break;
            case"minute":
                this.showSeconds ? this.highlightSecond() : this.showMeridian ? this.highlightMeridian() : this.highlightHour();
                break;
            case"second":
                this.showMeridian ? this.highlightMeridian() : this.highlightHour();
                break;
            case"meridian":
                this.highlightHour()
        }
    }, highlightPrevUnit: function () {
        switch (this.highlightedUnit) {
            case"hour":
                this.highlightMeridian();
                break;
            case"minute":
                this.highlightHour();
                break;
            case"second":
                this.highlightMinute();
                break;
            case"meridian":
                this.showSeconds ? this.highlightSecond() : this.highlightMinute()
        }
    }, highlightHour: function () {
        var a = this.$element.get(0);
        this.highlightedUnit = "hour", a.setSelectionRange && setTimeout(function () {
            a.setSelectionRange(0, 2)
        }, 0)
    }, highlightMinute: function () {
        var a = this.$element.get(0);
        this.highlightedUnit = "minute", a.setSelectionRange && setTimeout(function () {
            a.setSelectionRange(3, 5)
        }, 0)
    }, highlightSecond: function () {
        var a = this.$element.get(0);
        this.highlightedUnit = "second", a.setSelectionRange && setTimeout(function () {
            a.setSelectionRange(6, 8)
        }, 0)
    }, highlightMeridian: function () {
        var a = this.$element.get(0);
        this.highlightedUnit = "meridian", a.setSelectionRange && (this.showSeconds ? setTimeout(function () {
            a.setSelectionRange(9, 11)
        }, 0) : setTimeout(function () {
            a.setSelectionRange(6, 8)
        }, 0))
    }, incrementHour: function () {
        if (this.showMeridian) {
            if (11 === this.hour)return this.hour++, this.toggleMeridian();
            12 === this.hour && (this.hour = 0)
        }
        return 23 === this.hour ? (this.hour = 0, void 0) : (this.hour++, this.update(), void 0)
    }, incrementMinute: function (a) {
        var b;
        b = a ? this.minute + a : this.minute + this.minuteStep - this.minute % this.minuteStep, b > 59 ? (this.incrementHour(), this.minute = b - 60) : this.minute = b, this.update()
    }, incrementSecond: function () {
        var a = this.second + this.secondStep - this.second % this.secondStep;
        a > 59 ? (this.incrementMinute(!0), this.second = a - 60) : this.second = a, this.update()
    }, remove: function () {
        a("document").off(".timepicker"), this.$widget && this.$widget.remove(), delete this.$element.data().timepicker
    }, setDefaultTime: function (a) {
        if (this.$element.val())this.updateFromElementVal(); else if ("current" === a) {
            var b = new Date, c = b.getHours(), d = Math.floor(b.getMinutes() / this.minuteStep) * this.minuteStep, e = Math.floor(b.getSeconds() / this.secondStep) * this.secondStep, f = "AM";
            this.showMeridian && (0 === c ? c = 12 : c >= 12 ? (c > 12 && (c -= 12), f = "PM") : f = "AM"), this.hour = c, this.minute = d, this.second = e, this.meridian = f, this.update()
        } else a === !1 ? (this.hour = 0, this.minute = 0, this.second = 0, this.meridian = "AM") : this.setTime(a)
    }, setTime: function (a) {
        var b, c;
        this.showMeridian ? (b = a.split(" "), c = b[0].split(":"), this.meridian = b[1]) : c = a.split(":"), this.hour = parseInt(c[0], 10), this.minute = parseInt(c[1], 10), this.second = parseInt(c[2], 10), isNaN(this.hour) && (this.hour = 0), isNaN(this.minute) && (this.minute = 0), this.showMeridian ? (this.hour > 12 ? this.hour = 12 : this.hour < 1 && (this.hour = 12), "am" === this.meridian || "a" === this.meridian ? this.meridian = "AM" : ("pm" === this.meridian || "p" === this.meridian) && (this.meridian = "PM"), "AM" !== this.meridian && "PM" !== this.meridian && (this.meridian = "AM")) : this.hour >= 24 ? this.hour = 23 : this.hour < 0 && (this.hour = 0), this.minute < 0 ? this.minute = 0 : this.minute >= 60 && (this.minute = 59), this.showSeconds && (isNaN(this.second) ? this.second = 0 : this.second < 0 ? this.second = 0 : this.second >= 60 && (this.second = 59)), this.update()
    }, showWidget: function () {
        if (!this.isOpen && !this.$element.is(":disabled")) {
            var b = this;
            a(c).on("mousedown.timepicker", function (c) {
                0 === a(c.target).closest(".bootstrap-timepicker-widget").length && b.hideWidget()
            }), this.$element.trigger({type: "show.timepicker", time: {value: this.getTime(), hours: this.hour, minutes: this.minute, seconds: this.second, meridian: this.meridian}}), this.disableFocus && this.$element.blur(), this.updateFromElementVal(), "modal" === this.template ? this.$widget.modal("show").on("hidden", a.proxy(this.hideWidget, this)) : this.isOpen === !1 && this.$widget.addClass("open"), this.isOpen = !0
        }
    }, toggleMeridian: function () {
        this.meridian = "AM" === this.meridian ? "PM" : "AM", this.update()
    }, update: function () {
        this.$element.trigger({type: "changeTime.timepicker", time: {value: this.getTime(), hours: this.hour, minutes: this.minute, seconds: this.second, meridian: this.meridian}}), this.updateElement(), this.updateWidget()
    }, updateElement: function () {
        this.$element.val(this.getTime()).change()
    }, updateFromElementVal: function () {
        var a = this.$element.val();
        a && this.setTime(a)
    }, updateWidget: function () {
        if (this.$widget !== !1) {
            var a = this.hour < 10 ? "0" + this.hour : this.hour, b = this.minute < 10 ? "0" + this.minute : this.minute, c = this.second < 10 ? "0" + this.second : this.second;
            this.showInputs ? (this.$widget.find("input.bootstrap-timepicker-hour").val(a), this.$widget.find("input.bootstrap-timepicker-minute").val(b), this.showSeconds && this.$widget.find("input.bootstrap-timepicker-second").val(c), this.showMeridian && this.$widget.find("input.bootstrap-timepicker-meridian").val(this.meridian)) : (this.$widget.find("span.bootstrap-timepicker-hour").text(a), this.$widget.find("span.bootstrap-timepicker-minute").text(b), this.showSeconds && this.$widget.find("span.bootstrap-timepicker-second").text(c), this.showMeridian && this.$widget.find("span.bootstrap-timepicker-meridian").text(this.meridian))
        }
    }, updateFromWidgetInputs: function () {
        if (this.$widget !== !1) {
            var b = a("input.bootstrap-timepicker-hour", this.$widget).val() + ":" + a("input.bootstrap-timepicker-minute", this.$widget).val() + (this.showSeconds ? ":" + a("input.bootstrap-timepicker-second", this.$widget).val() : "") + (this.showMeridian ? " " + a("input.bootstrap-timepicker-meridian", this.$widget).val() : "");
            this.setTime(b)
        }
    }, widgetClick: function (b) {
        b.stopPropagation(), b.preventDefault();
        var c = a(b.target).closest("a").data("action");
        c && this[c]()
    }, widgetKeydown: function (b) {
        var c = a(b.target).closest("input"), d = c.attr("name");
        switch (b.keyCode) {
            case 9:
                if (this.showMeridian) {
                    if ("meridian" === d)return this.hideWidget()
                } else if (this.showSeconds) {
                    if ("second" === d)return this.hideWidget()
                } else if ("minute" === d)return this.hideWidget();
                this.updateFromWidgetInputs();
                break;
            case 27:
                this.hideWidget();
                break;
            case 38:
                switch (b.preventDefault(), d) {
                    case"hour":
                        this.incrementHour();
                        break;
                    case"minute":
                        this.incrementMinute();
                        break;
                    case"second":
                        this.incrementSecond();
                        break;
                    case"meridian":
                        this.toggleMeridian()
                }
                break;
            case 40:
                switch (b.preventDefault(), d) {
                    case"hour":
                        this.decrementHour();
                        break;
                    case"minute":
                        this.decrementMinute();
                        break;
                    case"second":
                        this.decrementSecond();
                        break;
                    case"meridian":
                        this.toggleMeridian()
                }
        }
    }}, a.fn.timepicker = function (b) {
        var c = Array.apply(null, arguments);
        return c.shift(), this.each(function () {
            var d = a(this), f = d.data("timepicker"), g = "object" == typeof b && b;
            f || d.data("timepicker", f = new e(this, a.extend({}, a.fn.timepicker.defaults, g, a(this).data()))), "string" == typeof b && f[b].apply(f, c)
        })
    }, a.fn.timepicker.defaults = {defaultTime: "current", disableFocus: !1, isOpen: !1, minuteStep: 15, modalBackdrop: !1, secondStep: 15, showSeconds: !1, showInputs: !0, showMeridian: !0, template: "dropdown", appendWidgetTo: ".bootstrap-timepicker"}, a.fn.timepicker.Constructor = e
}(jQuery, window, document), define("timepicker", function () {
}), !function (a) {
    function b() {
        return new Date(Date.UTC.apply(Date, arguments))
    }

    var c = function (b, c) {
        switch (this.element = a(b), this.language = c.language || this.element.data("date-language") || "en", this.language = this.language in d ? this.language : this.language.split("-")[0], this.language = this.language in d ? this.language : "en", this.isRTL = d[this.language].rtl || !1, this.format = e.parseFormat(c.format || this.element.data("date-format") || d[this.language].format || "mm/dd/yyyy"), this.isInline = !1, this.isInput = this.element.is("input"), this.component = this.element.is(".date") ? this.element.find(".add-on, .btn") : !1, this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.forceParse = !0, "forceParse"in c ? this.forceParse = c.forceParse : "dateForceParse"in this.element.data() && (this.forceParse = this.element.data("date-force-parse")), this.picker = a(e.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.isRTL && (this.picker.addClass("datepicker-rtl"), this.picker.find(".prev i, .next i").toggleClass("icon-arrow-left icon-arrow-right")), this.autoclose = !1, "autoclose"in c ? this.autoclose = c.autoclose : "dateAutoclose"in this.element.data() && (this.autoclose = this.element.data("date-autoclose")), this.keyboardNavigation = !0, "keyboardNavigation"in c ? this.keyboardNavigation = c.keyboardNavigation : "dateKeyboardNavigation"in this.element.data() && (this.keyboardNavigation = this.element.data("date-keyboard-navigation")), this.viewMode = this.startViewMode = 0, c.startView || this.element.data("date-start-view")) {
            case 2:
            case"decade":
                this.viewMode = this.startViewMode = 2;
                break;
            case 1:
            case"year":
                this.viewMode = this.startViewMode = 1
        }
        if (this.minViewMode = c.minViewMode || this.element.data("date-min-view-mode") || 0, "string" == typeof this.minViewMode)switch (this.minViewMode) {
            case"months":
                this.minViewMode = 1;
                break;
            case"years":
                this.minViewMode = 2;
                break;
            default:
                this.minViewMode = 0
        }
        this.viewMode = this.startViewMode = Math.max(this.startViewMode, this.minViewMode), this.todayBtn = c.todayBtn || this.element.data("date-today-btn") || !1, this.todayHighlight = c.todayHighlight || this.element.data("date-today-highlight") || !1, this.calendarWeeks = !1, "calendarWeeks"in c ? this.calendarWeeks = c.calendarWeeks : "dateCalendarWeeks"in this.element.data() && (this.calendarWeeks = this.element.data("date-calendar-weeks")), this.calendarWeeks && this.picker.find("tfoot th.today").attr("colspan", function (a, b) {
            return parseInt(b) + 1
        }), this._allow_update = !1, this.weekStart = (c.weekStart || this.element.data("date-weekstart") || d[this.language].weekStart || 0) % 7, this.weekEnd = (this.weekStart + 6) % 7, this.startDate = -1 / 0, this.endDate = 1 / 0, this.daysOfWeekDisabled = [], this.setStartDate(c.startDate || this.element.data("date-startdate")), this.setEndDate(c.endDate || this.element.data("date-enddate")), this.setDaysOfWeekDisabled(c.daysOfWeekDisabled || this.element.data("date-days-of-week-disabled")), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show()
    };
    c.prototype = {constructor: c, _events: [], _secondaryEvents: [], _applyEvents: function (a) {
        for (var b, c, d = 0; d < a.length; d++)b = a[d][0], c = a[d][1], b.on(c)
    }, _unapplyEvents: function (a) {
        for (var b, c, d = 0; d < a.length; d++)b = a[d][0], c = a[d][1], b.off(c)
    }, _buildEvents: function () {
        this.isInput ? this._events = [
            [this.element, {focus: a.proxy(this.show, this), keyup: a.proxy(this.update, this), keydown: a.proxy(this.keydown, this)}]
        ] : this.component && this.hasInput ? this._events = [
            [this.element.find("input"), {focus: a.proxy(this.show, this), keyup: a.proxy(this.update, this), keydown: a.proxy(this.keydown, this)}],
            [this.component, {click: a.proxy(this.show, this)}]
        ] : this.element.is("div") ? this.isInline = !0 : this._events = [
            [this.element, {click: a.proxy(this.show, this)}]
        ], this._secondaryEvents = [
            [this.picker, {click: a.proxy(this.click, this)}],
            [a(window), {resize: a.proxy(this.place, this)}],
            [a(document), {mousedown: a.proxy(function (b) {
                0 === a(b.target).closest(".datepicker.datepicker-inline, .datepicker.datepicker-dropdown").length && this.hide()
            }, this)}]
        ]
    }, _attachEvents: function () {
        this._detachEvents(), this._applyEvents(this._events)
    }, _detachEvents: function () {
        this._unapplyEvents(this._events)
    }, _attachSecondaryEvents: function () {
        this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents)
    }, _detachSecondaryEvents: function () {
        this._unapplyEvents(this._secondaryEvents)
    }, show: function (a) {
        this.isInline || this.picker.appendTo("body"), this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.place(), this._attachSecondaryEvents(), a && a.preventDefault(), this.element.trigger({type: "show", date: this.date})
    }, hide: function () {
        this.isInline || this.picker.is(":visible") && (this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.startViewMode, this.showMode(), this.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this.element.trigger({type: "hide", date: this.date}))
    }, remove: function () {
        this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date
    }, getDate: function () {
        var a = this.getUTCDate();
        return new Date(a.getTime() + 6e4 * a.getTimezoneOffset())
    }, getUTCDate: function () {
        return this.date
    }, setDate: function (a) {
        this.setUTCDate(new Date(a.getTime() - 6e4 * a.getTimezoneOffset()))
    }, setUTCDate: function (a) {
        this.date = a, this.setValue()
    }, setValue: function () {
        var a = this.getFormattedDate();
        this.isInput ? this.element.val(a) : (this.component && this.element.find("input").val(a), this.element.data("date", a))
    }, getFormattedDate: function (a) {
        return void 0 === a && (a = this.format), e.formatDate(this.date, a, this.language)
    }, setStartDate: function (a) {
        this.startDate = a || -1 / 0, this.startDate !== -1 / 0 && (this.startDate = e.parseDate(this.startDate, this.format, this.language)), this.update(), this.updateNavArrows()
    }, setEndDate: function (a) {
        this.endDate = a || 1 / 0, 1 / 0 !== this.endDate && (this.endDate = e.parseDate(this.endDate, this.format, this.language)), this.update(), this.updateNavArrows()
    }, setDaysOfWeekDisabled: function (b) {
        this.daysOfWeekDisabled = b || [], a.isArray(this.daysOfWeekDisabled) || (this.daysOfWeekDisabled = this.daysOfWeekDisabled.split(/,\s*/)), this.daysOfWeekDisabled = a.map(this.daysOfWeekDisabled, function (a) {
            return parseInt(a, 10)
        }), this.update(), this.updateNavArrows()
    }, place: function () {
        if (!this.isInline) {
            var b = parseInt(this.element.parents().filter(function () {
                return"auto" != a(this).css("z-index")
            }).first().css("z-index")) + 10, c = this.component ? this.component.parent().offset() : this.element.offset(), d = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!0);
            this.picker.css({top: c.top + d, left: c.left, zIndex: b})
        }
    }, _allow_update: !0, update: function () {
        if (this._allow_update) {
            var a, b = !1;
            arguments && arguments.length && ("string" == typeof arguments[0] || arguments[0]instanceof Date) ? (a = arguments[0], b = !0) : a = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val(), this.date = e.parseDate(a, this.format, this.language), b && this.setValue(), this.viewDate = this.date < this.startDate ? new Date(this.startDate) : this.date > this.endDate ? new Date(this.endDate) : new Date(this.date), this.fill()
        }
    }, fillDow: function () {
        var a = this.weekStart, b = "<tr>";
        if (this.calendarWeeks) {
            var c = '<th class="cw">&nbsp;</th>';
            b += c, this.picker.find(".datepicker-days thead tr:first-child").prepend(c)
        }
        for (; a < this.weekStart + 7;)b += '<th class="dow">' + d[this.language].daysMin[a++ % 7] + "</th>";
        b += "</tr>", this.picker.find(".datepicker-days thead").append(b)
    }, fillMonths: function () {
        for (var a = "", b = 0; 12 > b;)a += '<span class="month">' + d[this.language].monthsShort[b++] + "</span>";
        this.picker.find(".datepicker-months td").html(a)
    }, fill: function () {
        var c = new Date(this.viewDate), f = c.getUTCFullYear(), g = c.getUTCMonth(), h = this.startDate !== -1 / 0 ? this.startDate.getUTCFullYear() : -1 / 0, i = this.startDate !== -1 / 0 ? this.startDate.getUTCMonth() : -1 / 0, j = 1 / 0 !== this.endDate ? this.endDate.getUTCFullYear() : 1 / 0, k = 1 / 0 !== this.endDate ? this.endDate.getUTCMonth() : 1 / 0, l = this.date && this.date.valueOf(), m = new Date;
        this.picker.find(".datepicker-days thead th.switch").text(d[this.language].months[g] + " " + f), this.picker.find("tfoot th.today").text(d[this.language].today).toggle(this.todayBtn !== !1), this.updateNavArrows(), this.fillMonths();
        var n = b(f, g - 1, 28, 0, 0, 0, 0), o = e.getDaysInMonth(n.getUTCFullYear(), n.getUTCMonth());
        n.setUTCDate(o), n.setUTCDate(o - (n.getUTCDay() - this.weekStart + 7) % 7);
        var p = new Date(n);
        p.setUTCDate(p.getUTCDate() + 42), p = p.valueOf();
        for (var q, r = []; n.valueOf() < p;) {
            if (n.getUTCDay() == this.weekStart && (r.push("<tr>"), this.calendarWeeks)) {
                var s = new Date(+n + 864e5 * ((this.weekStart - n.getUTCDay() - 7) % 7)), t = new Date(+s + 864e5 * ((11 - s.getUTCDay()) % 7)), u = new Date(+(u = b(t.getUTCFullYear(), 0, 1)) + 864e5 * ((11 - u.getUTCDay()) % 7)), v = (t - u) / 864e5 / 7 + 1;
                r.push('<td class="cw">' + v + "</td>")
            }
            q = "", n.getUTCFullYear() < f || n.getUTCFullYear() == f && n.getUTCMonth() < g ? q += " old" : (n.getUTCFullYear() > f || n.getUTCFullYear() == f && n.getUTCMonth() > g) && (q += " new"), this.todayHighlight && n.getUTCFullYear() == m.getFullYear() && n.getUTCMonth() == m.getMonth() && n.getUTCDate() == m.getDate() && (q += " today"), l && n.valueOf() == l && (q += " active"), (n.valueOf() < this.startDate || n.valueOf() > this.endDate || -1 !== a.inArray(n.getUTCDay(), this.daysOfWeekDisabled)) && (q += " disabled"), r.push('<td class="day' + q + '">' + n.getUTCDate() + "</td>"), n.getUTCDay() == this.weekEnd && r.push("</tr>"), n.setUTCDate(n.getUTCDate() + 1)
        }
        this.picker.find(".datepicker-days tbody").empty().append(r.join(""));
        var w = this.date && this.date.getUTCFullYear(), x = this.picker.find(".datepicker-months").find("th:eq(1)").text(f).end().find("span").removeClass("active");
        w && w == f && x.eq(this.date.getUTCMonth()).addClass("active"), (h > f || f > j) && x.addClass("disabled"), f == h && x.slice(0, i).addClass("disabled"), f == j && x.slice(k + 1).addClass("disabled"), r = "", f = 10 * parseInt(f / 10, 10);
        var y = this.picker.find(".datepicker-years").find("th:eq(1)").text(f + "-" + (f + 9)).end().find("td");
        f -= 1;
        for (var z = -1; 11 > z; z++)r += '<span class="year' + (-1 == z || 10 == z ? " old" : "") + (w == f ? " active" : "") + (h > f || f > j ? " disabled" : "") + '">' + f + "</span>", f += 1;
        y.html(r)
    }, updateNavArrows: function () {
        if (this._allow_update) {
            var a = new Date(this.viewDate), b = a.getUTCFullYear(), c = a.getUTCMonth();
            switch (this.viewMode) {
                case 0:
                    this.startDate !== -1 / 0 && b <= this.startDate.getUTCFullYear() && c <= this.startDate.getUTCMonth() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), 1 / 0 !== this.endDate && b >= this.endDate.getUTCFullYear() && c >= this.endDate.getUTCMonth() ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"});
                    break;
                case 1:
                case 2:
                    this.startDate !== -1 / 0 && b <= this.startDate.getUTCFullYear() ? this.picker.find(".prev").css({visibility: "hidden"}) : this.picker.find(".prev").css({visibility: "visible"}), 1 / 0 !== this.endDate && b >= this.endDate.getUTCFullYear() ? this.picker.find(".next").css({visibility: "hidden"}) : this.picker.find(".next").css({visibility: "visible"})
            }
        }
    }, click: function (c) {
        c.preventDefault();
        var d = a(c.target).closest("span, td, th");
        if (1 == d.length)switch (d[0].nodeName.toLowerCase()) {
            case"th":
                switch (d[0].className) {
                    case"switch":
                        this.showMode(1);
                        break;
                    case"prev":
                    case"next":
                        var f = e.modes[this.viewMode].navStep * ("prev" == d[0].className ? -1 : 1);
                        switch (this.viewMode) {
                            case 0:
                                this.viewDate = this.moveMonth(this.viewDate, f);
                                break;
                            case 1:
                            case 2:
                                this.viewDate = this.moveYear(this.viewDate, f)
                        }
                        this.fill();
                        break;
                    case"today":
                        var g = new Date;
                        g = b(g.getFullYear(), g.getMonth(), g.getDate(), 0, 0, 0), this.showMode(-2);
                        var h = "linked" == this.todayBtn ? null : "view";
                        this._setDate(g, h)
                }
                break;
            case"span":
                if (!d.is(".disabled")) {
                    if (this.viewDate.setUTCDate(1), d.is(".month")) {
                        var i = 1, j = d.parent().find("span").index(d), k = this.viewDate.getUTCFullYear();
                        this.viewDate.setUTCMonth(j), this.element.trigger({type: "changeMonth", date: this.viewDate}), 1 == this.minViewMode && this._setDate(b(k, j, i, 0, 0, 0, 0))
                    } else {
                        var k = parseInt(d.text(), 10) || 0, i = 1, j = 0;
                        this.viewDate.setUTCFullYear(k), this.element.trigger({type: "changeYear", date: this.viewDate}), 2 == this.minViewMode && this._setDate(b(k, j, i, 0, 0, 0, 0))
                    }
                    this.showMode(-1), this.fill()
                }
                break;
            case"td":
                if (d.is(".day") && !d.is(".disabled")) {
                    var i = parseInt(d.text(), 10) || 1, k = this.viewDate.getUTCFullYear(), j = this.viewDate.getUTCMonth();
                    d.is(".old") ? 0 === j ? (j = 11, k -= 1) : j -= 1 : d.is(".new") && (11 == j ? (j = 0, k += 1) : j += 1), this._setDate(b(k, j, i, 0, 0, 0, 0))
                }
        }
    }, _setDate: function (a, b) {
        b && "date" != b || (this.date = a), b && "view" != b || (this.viewDate = a), this.fill(), this.setValue(), this.element.trigger({type: "changeDate", date: this.date});
        var c;
        this.isInput ? c = this.element : this.component && (c = this.element.find("input")), c && (c.change(), !this.autoclose || b && "date" != b || this.hide())
    }, moveMonth: function (a, b) {
        if (!b)return a;
        var c, d, e = new Date(a.valueOf()), f = e.getUTCDate(), g = e.getUTCMonth(), h = Math.abs(b);
        if (b = b > 0 ? 1 : -1, 1 == h)d = -1 == b ? function () {
            return e.getUTCMonth() == g
        } : function () {
            return e.getUTCMonth() != c
        }, c = g + b, e.setUTCMonth(c), (0 > c || c > 11) && (c = (c + 12) % 12); else {
            for (var i = 0; h > i; i++)e = this.moveMonth(e, b);
            c = e.getUTCMonth(), e.setUTCDate(f), d = function () {
                return c != e.getUTCMonth()
            }
        }
        for (; d();)e.setUTCDate(--f), e.setUTCMonth(c);
        return e
    }, moveYear: function (a, b) {
        return this.moveMonth(a, 12 * b)
    }, dateWithinRange: function (a) {
        return a >= this.startDate && a <= this.endDate
    }, keydown: function (a) {
        if (this.picker.is(":not(:visible)"))return 27 == a.keyCode && this.show(), void 0;
        var b, c, d, e = !1;
        switch (a.keyCode) {
            case 27:
                this.hide(), a.preventDefault();
                break;
            case 37:
            case 39:
                if (!this.keyboardNavigation)break;
                b = 37 == a.keyCode ? -1 : 1, a.ctrlKey ? (c = this.moveYear(this.date, b), d = this.moveYear(this.viewDate, b)) : a.shiftKey ? (c = this.moveMonth(this.date, b), d = this.moveMonth(this.viewDate, b)) : (c = new Date(this.date), c.setUTCDate(this.date.getUTCDate() + b), d = new Date(this.viewDate), d.setUTCDate(this.viewDate.getUTCDate() + b)), this.dateWithinRange(c) && (this.date = c, this.viewDate = d, this.setValue(), this.update(), a.preventDefault(), e = !0);
                break;
            case 38:
            case 40:
                if (!this.keyboardNavigation)break;
                b = 38 == a.keyCode ? -1 : 1, a.ctrlKey ? (c = this.moveYear(this.date, b), d = this.moveYear(this.viewDate, b)) : a.shiftKey ? (c = this.moveMonth(this.date, b), d = this.moveMonth(this.viewDate, b)) : (c = new Date(this.date), c.setUTCDate(this.date.getUTCDate() + 7 * b), d = new Date(this.viewDate), d.setUTCDate(this.viewDate.getUTCDate() + 7 * b)), this.dateWithinRange(c) && (this.date = c, this.viewDate = d, this.setValue(), this.update(), a.preventDefault(), e = !0);
                break;
            case 13:
                this.hide(), a.preventDefault();
                break;
            case 9:
                this.hide()
        }
        if (e) {
            this.element.trigger({type: "changeDate", date: this.date});
            var f;
            this.isInput ? f = this.element : this.component && (f = this.element.find("input")), f && f.change()
        }
    }, showMode: function (a) {
        a && (this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + a))), this.picker.find(">div").hide().filter(".datepicker-" + e.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows()
    }}, a.fn.datepicker = function (b) {
        var d = Array.apply(null, arguments);
        return d.shift(), this.each(function () {
            var e = a(this), f = e.data("datepicker"), g = "object" == typeof b && b;
            f || e.data("datepicker", f = new c(this, a.extend({}, a.fn.datepicker.defaults, g))), "string" == typeof b && "function" == typeof f[b] && f[b].apply(f, d)
        })
    }, a.fn.datepicker.defaults = {}, a.fn.datepicker.Constructor = c;
    var d = a.fn.datepicker.dates = {en: {days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], today: "Today"}}, e = {modes: [
        {clsName: "days", navFnc: "Month", navStep: 1},
        {clsName: "months", navFnc: "FullYear", navStep: 1},
        {clsName: "years", navFnc: "FullYear", navStep: 10}
    ], isLeapYear: function (a) {
        return 0 === a % 4 && 0 !== a % 100 || 0 === a % 400
    }, getDaysInMonth: function (a, b) {
        return[31, e.isLeapYear(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]
    }, validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g, nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g, parseFormat: function (a) {
        var b = a.replace(this.validParts, "\x00").split("\x00"), c = a.match(this.validParts);
        if (!b || !b.length || !c || 0 === c.length)throw new Error("Invalid date format.");
        return{separators: b, parts: c}
    }, parseDate: function (e, f, g) {
        if (e instanceof Date)return e;
        if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(e)) {
            var h, i, j = /([\-+]\d+)([dmwy])/, k = e.match(/([\-+]\d+)([dmwy])/g);
            e = new Date;
            for (var l = 0; l < k.length; l++)switch (h = j.exec(k[l]), i = parseInt(h[1]), h[2]) {
                case"d":
                    e.setUTCDate(e.getUTCDate() + i);
                    break;
                case"m":
                    e = c.prototype.moveMonth.call(c.prototype, e, i);
                    break;
                case"w":
                    e.setUTCDate(e.getUTCDate() + 7 * i);
                    break;
                case"y":
                    e = c.prototype.moveYear.call(c.prototype, e, i)
            }
            return b(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate(), 0, 0, 0)
        }
        var m, n, h, k = e && e.match(this.nonpunctuation) || [], e = new Date, o = {}, p = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"], q = {yyyy: function (a, b) {
            return a.setUTCFullYear(b)
        }, yy: function (a, b) {
            return a.setUTCFullYear(2e3 + b)
        }, m: function (a, b) {
            for (b -= 1; 0 > b;)b += 12;
            for (b %= 12, a.setUTCMonth(b); a.getUTCMonth() != b;)a.setUTCDate(a.getUTCDate() - 1);
            return a
        }, d: function (a, b) {
            return a.setUTCDate(b)
        }};
        q.M = q.MM = q.mm = q.m, q.dd = q.d, e = b(e.getFullYear(), e.getMonth(), e.getDate(), 0, 0, 0);
        var r = f.parts.slice();
        if (k.length != r.length && (r = a(r).filter(function (b, c) {
            return-1 !== a.inArray(c, p)
        }).toArray()), k.length == r.length) {
            for (var l = 0, s = r.length; s > l; l++) {
                if (m = parseInt(k[l], 10), h = r[l], isNaN(m))switch (h) {
                    case"MM":
                        n = a(d[g].months).filter(function () {
                            var a = this.slice(0, k[l].length), b = k[l].slice(0, a.length);
                            return a == b
                        }), m = a.inArray(n[0], d[g].months) + 1;
                        break;
                    case"M":
                        n = a(d[g].monthsShort).filter(function () {
                            var a = this.slice(0, k[l].length), b = k[l].slice(0, a.length);
                            return a == b
                        }), m = a.inArray(n[0], d[g].monthsShort) + 1
                }
                o[h] = m
            }
            for (var t, l = 0; l < p.length; l++)t = p[l], t in o && !isNaN(o[t]) && q[t](e, o[t])
        }
        return e
    }, formatDate: function (b, c, e) {
        var f = {d: b.getUTCDate(), D: d[e].daysShort[b.getUTCDay()], DD: d[e].days[b.getUTCDay()], m: b.getUTCMonth() + 1, M: d[e].monthsShort[b.getUTCMonth()], MM: d[e].months[b.getUTCMonth()], yy: b.getUTCFullYear().toString().substring(2), yyyy: b.getUTCFullYear()};
        f.dd = (f.d < 10 ? "0" : "") + f.d, f.mm = (f.m < 10 ? "0" : "") + f.m;
        for (var b = [], g = a.extend([], c.separators), h = 0, i = c.parts.length; i > h; h++)g.length && b.push(g.shift()), b.push(f[c.parts[h]]);
        return b.join("")
    }, headTemplate: '<thead><tr><th class="prev"><i class="icon-arrow-left"/></th><th colspan="5" class="switch"></th><th class="next"><i class="icon-arrow-right"/></th></tr></thead>', contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>', footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr></tfoot>'};
    e.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + e.headTemplate + "<tbody></tbody>" + e.footTemplate + "</table>" + "</div>" + '<div class="datepicker-months">' + '<table class="table-condensed">' + e.headTemplate + e.contTemplate + e.footTemplate + "</table>" + "</div>" + '<div class="datepicker-years">' + '<table class="table-condensed">' + e.headTemplate + e.contTemplate + e.footTemplate + "</table>" + "</div>" + "</div>", a.fn.datepicker.DPGlobal = e
}(window.jQuery), define("datepicker", function () {
}), angular.module("$strap.config", []).value("$strapConfig", {}), angular.module("$strap.filters", ["$strap.config"]), angular.module("$strap.directives", ["$strap.config"]), angular.module("$strap", ["$strap.filters", "$strap.directives", "$strap.config"]), angular.module("$strap.directives").directive("bsAlert", ["$parse", "$timeout", "$compile", function (a, b, c) {
    return{restrict: "A", link: function (d, e, f) {
        var g = a(f.bsAlert), h = (g.assign, g(d)), i = function (a) {
            b(function () {
                e.alert("close")
            }, 1 * a)
        };
        f.bsAlert ? d.$watch(f.bsAlert, function (a, b) {
            h = a, e.html((a.title ? "<strong>" + a.title + "</strong>&nbsp;" : "") + a.content || ""), a.closed && e.hide(), c(e.contents())(d), (a.type || b.type) && (b.type && e.removeClass("alert-" + b.type), a.type && e.addClass("alert-" + a.type)), angular.isDefined(a.closeAfter) ? i(a.closeAfter) : f.closeAfter && i(f.closeAfter), (angular.isUndefined(f.closeButton) || "0" !== f.closeButton && "false" !== f.closeButton) && e.prepend('<button type="button" class="close" data-dismiss="alert">&times;</button>')
        }, !0) : ((angular.isUndefined(f.closeButton) || "0" !== f.closeButton && "false" !== f.closeButton) && e.prepend('<button type="button" class="close" data-dismiss="alert">&times;</button>'), f.closeAfter && i(f.closeAfter)), e.addClass("alert").alert(), e.hasClass("fade") && (e.removeClass("in"), setTimeout(function () {
            e.addClass("in")
        }));
        var j = f.ngRepeat && f.ngRepeat.split(" in ").pop();
        e.on("close", function (a) {
            var b;
            j ? (a.preventDefault(), e.removeClass("in"), b = function () {
                e.trigger("closed"), d.$parent && d.$parent.$apply(function () {
                    for (var a = j.split("."), b = d.$parent, c = 0; c < a.length; ++c)b && (b = b[a[c]]);
                    b && b.splice(d.$index, 1)
                })
            }, $.support.transition && e.hasClass("fade") ? e.on($.support.transition.end, b) : b()) : h && (a.preventDefault(), e.removeClass("in"), b = function () {
                e.trigger("closed"), d.$apply(function () {
                    h.closed = !0
                })
            }, $.support.transition && e.hasClass("fade") ? e.on($.support.transition.end, b) : b())
        })
    }}
}]), angular.module("$strap.directives").directive("bsButton", ["$parse", "$timeout", function (a) {
    return{restrict: "A", require: "?ngModel", link: function (b, c, d, e) {
        if (e) {
            c.parent('[data-toggle="buttons-checkbox"], [data-toggle="buttons-radio"]').length || c.attr("data-toggle", "button");
            var f = !!b.$eval(d.ngModel);
            f && c.addClass("active"), b.$watch(d.ngModel, function (a, b) {
                var d = !!a, e = !!b;
                d !== e ? $.fn.button.Constructor.prototype.toggle.call(g) : d && !f && c.addClass("active")
            })
        }
        c.hasClass("btn") || c.on("click.button.data-api", function () {
            c.button("toggle")
        }), c.button();
        var g = c.data("button");
        g.toggle = function () {
            if (!e)return $.fn.button.Constructor.prototype.toggle.call(this);
            var d = c.parent('[data-toggle="buttons-radio"]');
            d.length ? (c.siblings("[ng-model]").each(function (c, d) {
                a($(d).attr("ng-model")).assign(b, !1)
            }), b.$digest(), e.$modelValue || (e.$setViewValue(!e.$modelValue), b.$digest())) : b.$apply(function () {
                e.$setViewValue(!e.$modelValue)
            })
        }
    }}
}]).directive("bsButtonsCheckbox", ["$parse", function () {
    return{restrict: "A", require: "?ngModel", compile: function (a) {
        a.attr("data-toggle", "buttons-checkbox").find("a, button").each(function (a, b) {
            $(b).attr("bs-button", "")
        })
    }}
}]).directive("bsButtonsRadio", ["$timeout", function (a) {
    return{restrict: "A", require: "?ngModel", compile: function (b, c) {
        return b.attr("data-toggle", "buttons-radio"), c.ngModel || b.find("a, button").each(function (a, b) {
            $(b).attr("bs-button", "")
        }), function (b, c, d, e) {
            e && (a(function () {
                c.find("[value]").button().filter('[value="' + e.$viewValue + '"]').addClass("active")
            }), c.on("click.button.data-api", function (a) {
                b.$apply(function () {
                    e.$setViewValue($(a.target).closest("button").attr("value"))
                })
            }), b.$watch(d.ngModel, function (a, e) {
                if (a !== e) {
                    var f = c.find('[value="' + b.$eval(d.ngModel) + '"]');
                    f.length && f.button("toggle")
                }
            }))
        }
    }}
}]), angular.module("$strap.directives").directive("bsButtonSelect", ["$parse", "$timeout", function (a) {
    return{restrict: "A", require: "?ngModel", link: function (b, c, d, e) {
        var f = a(d.bsButtonSelect);
        f.assign, e && (c.text(b.$eval(d.ngModel)), b.$watch(d.ngModel, function (a) {
            c.text(a)
        }));
        var g, h, i, j;
        c.bind("click", function () {
            g = f(b), h = e ? b.$eval(d.ngModel) : c.text(), i = g.indexOf(h), j = i > g.length - 2 ? g[0] : g[i + 1], b.$apply(function () {
                c.text(j), e && e.$setViewValue(j)
            })
        })
    }}
}]), angular.module("$strap.directives").directive("bsDatepicker", ["$timeout", "$strapConfig", function (a, b) {
    var c = /(iP(a|o)d|iPhone)/g.test(navigator.userAgent), d = function (a) {
        return a = a || "en", {"/": "[\\/]", "-": "[-]", ".": "[.]", " ": "[\\s]", dd: "(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))", d: "(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))", mm: "(?:[0]?[1-9]|[1][012])", m: "(?:[0]?[1-9]|[1][012])", DD: "(?:" + $.fn.datepicker.dates[a].days.join("|") + ")", D: "(?:" + $.fn.datepicker.dates[a].daysShort.join("|") + ")", MM: "(?:" + $.fn.datepicker.dates[a].months.join("|") + ")", M: "(?:" + $.fn.datepicker.dates[a].monthsShort.join("|") + ")", yyyy: "(?:(?:[1]{1}[0-9]{1}[0-9]{1}[0-9]{1})|(?:[2]{1}[0-9]{3}))(?![[0-9]])", yy: "(?:(?:[0-9]{1}[0-9]{1}))(?![[0-9]])"}
    }, e = function (a, b) {
        var c, e = a, f = d(b);
        return c = 0, angular.forEach(f, function (a, b) {
            e = e.split(b).join("${"+c+"}"), c++
        }), c = 0, angular.forEach(f, function (a) {
            e = e.split("${"+c+"}").join(a), c++
        }), new RegExp("^" + e + "$", ["i"])
    };
    return{restrict: "A", require: "?ngModel", link: function (a, d, f, g) {
        var h = angular.extend({autoclose: !0}, b.datepicker || {}), i = f.dateType || h.type || "date";
        angular.forEach(["format", "weekStart", "calendarWeeks", "startDate", "endDate", "daysOfWeekDisabled", "autoclose", "startView", "minViewMode", "todayBtn", "todayHighlight", "keyboardNavigation", "language", "forceParse"], function (a) {
            angular.isDefined(f[a]) && (h[a] = f[a])
        });
        var j = h.language || "en", k = f.dateFormat || h.format || $.fn.datepicker.dates[j] && $.fn.datepicker.dates[j].format || "mm/dd/yyyy", l = c ? "yyyy-mm-dd" : k, m = e(l, j);
        g && (g.$formatters.unshift(function (a) {
            return"date" === i && angular.isString(a) && a ? $.fn.datepicker.DPGlobal.parseDate(a, $.fn.datepicker.DPGlobal.parseFormat(k), j) : a
        }), g.$parsers.unshift(function (a) {
            return a ? "date" === i && angular.isDate(a) ? (g.$setValidity("date", !0), a) : angular.isString(a) && m.test(a) ? (g.$setValidity("date", !0), c ? new Date(a) : "string" === i ? a : $.fn.datepicker.DPGlobal.parseDate(a, $.fn.datepicker.DPGlobal.parseFormat(l), j)) : (g.$setValidity("date", !1), void 0) : (g.$setValidity("date", !0), null)
        }), g.$render = function () {
            if (c) {
                var a = g.$viewValue ? $.fn.datepicker.DPGlobal.formatDate(g.$viewValue, $.fn.datepicker.DPGlobal.parseFormat(l), j) : "";
                return d.val(a), a
            }
            return g.$viewValue || d.val(""), d.datepicker("update", g.$viewValue)
        }), c ? d.prop("type", "date").css("-webkit-appearance", "textfield") : (g && d.on("changeDate", function (b) {
            a.$apply(function () {
                g.$setViewValue("string" === i ? d.val() : b.date)
            })
        }), d.datepicker(angular.extend(h, {format: l, language: j})), a.$on("$destroy", function () {
            var a = d.data("datepicker");
            a && (a.picker.remove(), d.data("datepicker", null))
        }), f.$observe("startDate", function (a) {
            d.datepicker("setStartDate", a)
        }), f.$observe("endDate", function (a) {
            d.datepicker("setEndDate", a)
        }));
        var n = d.siblings('[data-toggle="datepicker"]');
        n.length && n.on("click", function () {
            d.prop("disabled") || d.trigger("focus")
        })
    }}
}]), angular.module("$strap.directives").directive("bsDropdown", ["$parse", "$compile", "$timeout", function (a, b, c) {
    var d = function (a, b) {
        return b || (b = ['<ul class="dropdown-menu" role="menu" aria-labelledby="drop1">', "</ul>"]), angular.forEach(a, function (a, c) {
            if (a.divider)return b.splice(c + 1, 0, '<li class="divider"></li>');
            var e = "<li" + (a.submenu && a.submenu.length ? ' class="dropdown-submenu"' : "") + ">" + '<a tabindex="-1" ng-href="' + (a.href || "") + '"' + (a.click ? '" ng-click="' + a.click + '"' : "") + (a.target ? '" target="' + a.target + '"' : "") + (a.method ? '" data-method="' + a.method + '"' : "") + ">" + (a.text || "") + "</a>";
            a.submenu && a.submenu.length && (e += d(a.submenu).join("\n")), e += "</li>", b.splice(c + 1, 0, e)
        }), b
    };
    return{restrict: "EA", scope: !0, link: function (e, f, g) {
        var h = a(g.bsDropdown), i = h(e);
        c(function () {
            !angular.isArray(i);
            var a = angular.element(d(i).join(""));
            a.insertAfter(f), b(f.next("ul.dropdown-menu"))(e)
        }), f.addClass("dropdown-toggle").attr("data-toggle", "dropdown")
    }}
}]), angular.module("$strap.directives").factory("$modal", ["$rootScope", "$compile", "$http", "$timeout", "$q", "$templateCache", "$strapConfig", function (a, b, c, d, e, f, g) {
    var h = function (h) {
        function i(h) {
            var i = angular.extend({show: !0}, g.modal, h), j = i.scope ? i.scope : a.$new(), k = i.template;
            return e.when(f.get(k) || c.get(k, {cache: !0}).then(function (a) {
                return a.data
            })).then(function (a) {
                var c = k.replace(".html", "").replace(/[\/|\.|:]/g, "-") + "-" + j.$id, e = $('<div class="modal hide" tabindex="-1"></div>').attr("id", c).addClass("fade").html(a);
                return i.modalClass && e.addClass(i.modalClass), $("body").append(e), d(function () {
                    b(e)(j)
                }), j.$modal = function (a) {
                    e.modal(a)
                }, angular.forEach(["show", "hide"], function (a) {
                    j[a] = function () {
                        e.modal(a)
                    }
                }), j.dismiss = j.hide, angular.forEach(["show", "shown", "hide", "hidden"], function (a) {
                    e.on(a, function (b) {
                        j.$emit("modal-" + a, b)
                    })
                }), e.on("shown", function () {
                    $("input[autofocus], textarea[autofocus]", e).first().trigger("focus")
                }), e.on("hidden", function () {
                    i.persist || j.$destroy()
                }), j.$on("$destroy", function () {
                    e.remove()
                }), e.modal(i), e
            })
        }

        return new i(h)
    };
    return h
}]).directive("bsModal", ["$q", "$modal", function (a, b) {
    return{restrict: "A", scope: !0, link: function (c, d, e) {
        var f = {template: c.$eval(e.bsModal), persist: !0, show: !1, scope: c};
        angular.forEach(["modalClass", "backdrop", "keyboard"], function (a) {
            angular.isDefined(e[a]) && (f[a] = e[a])
        }), a.when(b(f)).then(function (a) {
            d.attr("data-target", "#" + a.attr("id")).attr("data-toggle", "modal")
        })
    }}
}]), angular.module("$strap.directives").directive("bsNavbar", ["$location", function (a) {
    return{restrict: "A", link: function (b, c) {
        b.$watch(function () {
            return a.path()
        }, function (a) {
            $("li[data-match-route]", c).each(function (b, c) {
                var d = angular.element(c), e = d.attr("data-match-route"), f = new RegExp("^" + e + "$", ["i"]);
                f.test(a) ? d.addClass("active").find(".collapse.in").collapse("hide") : d.removeClass("active")
            })
        })
    }}
}]), angular.module("$strap.directives").directive("bsPopover", ["$parse", "$compile", "$http", "$timeout", "$q", "$templateCache", function (a, b, c, d, e, f) {
    return $("body").on("keyup", function (a) {
        27 === a.keyCode && $(".popover.in").each(function () {
            $(this).popover("hide")
        })
    }), {restrict: "A", scope: !0, link: function (g, h, i) {
        var j = a(i.bsPopover), k = (j.assign, j(g)), l = {};
        angular.isObject(k) && (l = k), e.when(l.content || f.get(k) || c.get(k, {cache: !0})).then(function (a) {
            angular.isObject(a) && (a = a.data), i.unique && h.on("show", function () {
                $(".popover.in").each(function () {
                    var a = $(this), b = a.data("popover");
                    b && !b.$element.is(h) && a.popover("hide")
                })
            }), i.hide && g.$watch(i.hide, function (a, b) {
                a ? c.hide() : a !== b && c.show()
            }), i.show && g.$watch(i.show, function (a, b) {
                a ? d(function () {
                    c.show()
                }) : a !== b && c.hide()
            }), h.popover(angular.extend({}, l, {content: a, html: !0}));
            var c = h.data("popover");
            c.hasContent = function () {
                return this.getTitle() || a
            }, c.getPosition = function () {
                var a = $.fn.popover.Constructor.prototype.getPosition.apply(this, arguments);
                return b(this.$tip)(g), g.$digest(), this.$tip.data("popover", this), a
            }, g.$popover = function (a) {
                c(a)
            }, angular.forEach(["show", "hide"], function (a) {
                g[a] = function () {
                    c[a]()
                }
            }), g.dismiss = g.hide, angular.forEach(["show", "shown", "hide", "hidden"], function (a) {
                h.on(a, function (b) {
                    g.$emit("popover-" + a, b)
                })
            })
        })
    }}
}]), angular.module("$strap.directives").directive("bsSelect", ["$timeout", function (a) {
    return{restrict: "A", require: "?ngModel", link: function (b, c, d, e) {
        var f = b.$eval(d.bsSelect) || {};
        a(function () {
            c.selectpicker(f), c.next().removeClass("ng-scope")
        }), e && b.$watch(d.ngModel, function (a, b) {
            angular.equals(a, b) || c.selectpicker("refresh")
        })
    }}
}]), angular.module("$strap.directives").directive("bsTabs", ["$parse", "$compile", "$timeout", function (a, b, c) {
    var d = '<div class="tabs"><ul class="nav nav-tabs"><li ng-repeat="pane in panes" ng-class="{active:pane.active}"><a data-target="#{{pane.id}}" data-index="{{$index}}" data-toggle="tab">{{pane.title}}</a></li></ul><div class="tab-content" ng-transclude></div>';
    return{restrict: "A", require: "?ngModel", priority: 0, scope: !0, template: d, replace: !0, transclude: !0, compile: function () {
        return function (b, d, e, f) {
            var g = a(e.bsTabs);
            g.assign, g(b), b.panes = [];
            var h, i, j, k = d.find("ul.nav-tabs"), l = d.find("div.tab-content"), m = 0;
            c(function () {
                l.find("[data-title], [data-tab]").each(function (a) {
                    var c = angular.element(this);
                    h = "tab-" + b.$id + "-" + a, i = c.data("title") || c.data("tab"), j = !j && c.hasClass("active"), c.attr("id", h).addClass("tab-pane"), e.fade && c.addClass("fade"), b.panes.push({id: h, title: i, content: this.innerHTML, active: j})
                }), b.panes.length && !j && (l.find(".tab-pane:first-child").addClass("active" + (e.fade ? " in" : "")), b.panes[0].active = !0)
            }), f && (d.on("show", function (a) {
                var c = $(a.target);
                b.$apply(function () {
                    f.$setViewValue(c.data("index"))
                })
            }), b.$watch(e.ngModel, function (a) {
                angular.isUndefined(a) || (m = a, setTimeout(function () {
                    var b = $(k[0].querySelectorAll("li")[1 * a]);
                    b.hasClass("active") || b.children("a").tab("show")
                }))
            }))
        }
    }}
}]), angular.module("$strap.directives").directive("bsTimepicker", ["$timeout", "$strapConfig", function (a, b) {
    var c = "((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)";
    return{restrict: "A", require: "?ngModel", link: function (d, e, f, g) {
        if (g) {
            e.on("changeTime.timepicker", function () {
                a(function () {
                    g.$setViewValue(e.val())
                })
            });
            var h = new RegExp("^" + c + "$", ["i"]);
            g.$parsers.unshift(function (a) {
                return!a || h.test(a) ? (g.$setValidity("time", !0), a) : (g.$setValidity("time", !1), void 0)
            })
        }
        e.attr("data-toggle", "timepicker"), e.parent().addClass("bootstrap-timepicker"), e.timepicker(b.timepicker || {});
        var i = e.data("timepicker"), j = e.siblings('[data-toggle="timepicker"]');
        j.length && j.on("click", $.proxy(i.showWidget, i))
    }}
}]), angular.module("$strap.directives").directive("bsTooltip", ["$parse", "$compile", function (a) {
    return{restrict: "A", scope: !0, link: function (b, c, d) {
        var e = a(d.bsTooltip), f = (e.assign, e(b));
        b.$watch(d.bsTooltip, function (a, b) {
            a !== b && (f = a)
        }), d.unique && c.on("show", function () {
            $(".tooltip.in").each(function () {
                var a = $(this), b = a.data("tooltip");
                b && !b.$element.is(c) && a.tooltip("hide")
            })
        }), c.tooltip({title: function () {
            return angular.isFunction(f) ? f.apply(null, arguments) : f
        }, html: !0});
        var g = c.data("tooltip");
        g.show = function () {
            var a = $.fn.tooltip.Constructor.prototype.show.apply(this, arguments);
            return this.tip().data("tooltip", this), a
        }, b._tooltip = function (a) {
            c.tooltip(a)
        }, b.hide = function () {
            c.tooltip("hide")
        }, b.show = function () {
            c.tooltip("show")
        }, b.dismiss = b.hide
    }}
}]), angular.module("$strap.directives").directive("bsTypeahead", ["$parse", function (a) {
    return{restrict: "A", require: "?ngModel", link: function (b, c, d, e) {
        var f = a(d.bsTypeahead), g = (f.assign, f(b));
        b.$watch(d.bsTypeahead, function (a, b) {
            a !== b && (g = a)
        }), c.attr("data-provide", "typeahead"), c.typeahead({source: function () {
            return angular.isFunction(g) ? g.apply(null, arguments) : g
        }, minLength: d.minLength || 1, items: d.items, updater: function (a) {
            return e && b.$apply(function () {
                e.$setViewValue(a)
            }), b.$emit("typeahead-updated", a), a
        }});
        var h = c.data("typeahead");
        h.lookup = function () {
            var a;
            return this.query = this.$element.val() || "", this.query.length < this.options.minLength ? this.shown ? this.hide() : this : (a = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source, a ? this.process(a) : this)
        }, d.matchAll && (h.matcher = function () {
            return!0
        }), "0" === d.minLength && setTimeout(function () {
            c.on("focus", function () {
                0 === c.val().length && setTimeout(c.typeahead.bind(c, "lookup"), 200)
            })
        })
    }}
}]), define("angular-strap", function () {
}), function (a, b) {
    function c(b, c) {
        var e, f, g, h = b.nodeName.toLowerCase();
        return"area" === h ? (e = b.parentNode, f = e.name, b.href && f && "map" === e.nodeName.toLowerCase() ? (g = a("img[usemap=#" + f + "]")[0], !!g && d(g)) : !1) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || c : c) && d(b)
    }

    function d(b) {
        return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function () {
            return"hidden" === a.css(this, "visibility")
        }).length
    }

    var e = 0, f = /^ui-id-\d+$/;
    a.ui = a.ui || {}, a.extend(a.ui, {version: "1.10.3", keyCode: {BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, NUMPAD_ADD: 107, NUMPAD_DECIMAL: 110, NUMPAD_DIVIDE: 111, NUMPAD_ENTER: 108, NUMPAD_MULTIPLY: 106, NUMPAD_SUBTRACT: 109, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38}}), a.fn.extend({focus: function (b) {
        return function (c, d) {
            return"number" == typeof c ? this.each(function () {
                var b = this;
                setTimeout(function () {
                    a(b).focus(), d && d.call(b)
                }, c)
            }) : b.apply(this, arguments)
        }
    }(a.fn.focus), scrollParent: function () {
        var b;
        return b = a.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
            return/(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
        }).eq(0) : this.parents().filter(function () {
            return/(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
        }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
    }, zIndex: function (c) {
        if (c !== b)return this.css("zIndex", c);
        if (this.length)for (var d, e, f = a(this[0]); f.length && f[0] !== document;) {
            if (d = f.css("position"), ("absolute" === d || "relative" === d || "fixed" === d) && (e = parseInt(f.css("zIndex"), 10), !isNaN(e) && 0 !== e))return e;
            f = f.parent()
        }
        return 0
    }, uniqueId: function () {
        return this.each(function () {
            this.id || (this.id = "ui-id-" + ++e)
        })
    }, removeUniqueId: function () {
        return this.each(function () {
            f.test(this.id) && a(this).removeAttr("id")
        })
    }}), a.extend(a.expr[":"], {data: a.expr.createPseudo ? a.expr.createPseudo(function (b) {
        return function (c) {
            return!!a.data(c, b)
        }
    }) : function (b, c, d) {
        return!!a.data(b, d[3])
    }, focusable: function (b) {
        return c(b, !isNaN(a.attr(b, "tabindex")))
    }, tabbable: function (b) {
        var d = a.attr(b, "tabindex"), e = isNaN(d);
        return(e || d >= 0) && c(b, !e)
    }}), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (c, d) {
        function e(b, c, d, e) {
            return a.each(f, function () {
                c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), e && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
            }), c
        }

        var f = "Width" === d ? ["Left", "Right"] : ["Top", "Bottom"], g = d.toLowerCase(), h = {innerWidth: a.fn.innerWidth, innerHeight: a.fn.innerHeight, outerWidth: a.fn.outerWidth, outerHeight: a.fn.outerHeight};
        a.fn["inner" + d] = function (c) {
            return c === b ? h["inner" + d].call(this) : this.each(function () {
                a(this).css(g, e(this, c) + "px")
            })
        }, a.fn["outer" + d] = function (b, c) {
            return"number" != typeof b ? h["outer" + d].call(this, b) : this.each(function () {
                a(this).css(g, e(this, b, !0, c) + "px")
            })
        }
    }), a.fn.addBack || (a.fn.addBack = function (a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
    }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function (b) {
        return function (c) {
            return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
        }
    }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.support.selectstart = "onselectstart"in document.createElement("div"), a.fn.extend({disableSelection: function () {
        return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function (a) {
            a.preventDefault()
        })
    }, enableSelection: function () {
        return this.unbind(".ui-disableSelection")
    }}), a.extend(a.ui, {plugin: {add: function (b, c, d) {
        var e, f = a.ui[b].prototype;
        for (e in d)f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
    }, call: function (a, b, c) {
        var d, e = a.plugins[b];
        if (e && a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType)for (d = 0; d < e.length; d++)a.options[e[d][0]] && e[d][1].apply(a.element, c)
    }}, hasScroll: function (b, c) {
        if ("hidden" === a(b).css("overflow"))return!1;
        var d = c && "left" === c ? "scrollLeft" : "scrollTop", e = !1;
        return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
    }})
}(jQuery), function (a, b) {
    var c = 0, d = Array.prototype.slice, e = a.cleanData;
    a.cleanData = function (b) {
        for (var c, d = 0; null != (c = b[d]); d++)try {
            a(c).triggerHandler("remove")
        } catch (f) {
        }
        e(b)
    }, a.widget = function (b, c, d) {
        var e, f, g, h, i = {}, j = b.split(".")[0];
        b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function (b) {
            return!!a.data(b, e)
        }, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function (a, b) {
            return this._createWidget ? (arguments.length && this._createWidget(a, b), void 0) : new g(a, b)
        }, a.extend(g, f, {version: d.version, _proto: a.extend({}, d), _childConstructors: []}), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function (b, d) {
            return a.isFunction(d) ? (i[b] = function () {
                var a = function () {
                    return c.prototype[b].apply(this, arguments)
                }, e = function (a) {
                    return c.prototype[b].apply(this, a)
                };
                return function () {
                    var b, c = this._super, f = this._superApply;
                    return this._super = a, this._superApply = e, b = d.apply(this, arguments), this._super = c, this._superApply = f, b
                }
            }(), void 0) : (i[b] = d, void 0)
        }), g.prototype = a.widget.extend(h, {widgetEventPrefix: f ? h.widgetEventPrefix : b}, i, {constructor: g, namespace: j, widgetName: b, widgetFullName: e}), f ? (a.each(f._childConstructors, function (b, c) {
            var d = c.prototype;
            a.widget(d.namespace + "." + d.widgetName, g, c._proto)
        }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g)
    }, a.widget.extend = function (c) {
        for (var e, f, g = d.call(arguments, 1), h = 0, i = g.length; i > h; h++)for (e in g[h])f = g[h][e], g[h].hasOwnProperty(e) && f !== b && (c[e] = a.isPlainObject(f) ? a.isPlainObject(c[e]) ? a.widget.extend({}, c[e], f) : a.widget.extend({}, f) : f);
        return c
    }, a.widget.bridge = function (c, e) {
        var f = e.prototype.widgetFullName || c;
        a.fn[c] = function (g) {
            var h = "string" == typeof g, i = d.call(arguments, 1), j = this;
            return g = !h && i.length ? a.widget.extend.apply(null, [g].concat(i)) : g, h ? this.each(function () {
                var d, e = a.data(this, f);
                return e ? a.isFunction(e[g]) && "_" !== g.charAt(0) ? (d = e[g].apply(e, i), d !== e && d !== b ? (j = d && d.jquery ? j.pushStack(d.get()) : d, !1) : void 0) : a.error("no such method '" + g + "' for " + c + " widget instance") : a.error("cannot call methods on " + c + " prior to initialization; " + "attempted to call method '" + g + "'")
            }) : this.each(function () {
                var b = a.data(this, f);
                b ? b.option(g || {})._init() : a.data(this, f, new e(g, this))
            }), j
        }
    }, a.Widget = function () {
    }, a.Widget._childConstructors = [], a.Widget.prototype = {widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: {disabled: !1, create: null}, _createWidget: function (b, d) {
        d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = c++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetFullName, this), this._on(!0, this.element, {remove: function (a) {
            a.target === d && this.destroy()
        }}), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
    }, _getCreateOptions: a.noop, _getCreateEventData: a.noop, _create: a.noop, _init: a.noop, destroy: function () {
        this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
    }, _destroy: a.noop, widget: function () {
        return this.element
    }, option: function (c, d) {
        var e, f, g, h = c;
        if (0 === arguments.length)return a.widget.extend({}, this.options);
        if ("string" == typeof c)if (h = {}, e = c.split("."), c = e.shift(), e.length) {
            for (f = h[c] = a.widget.extend({}, this.options[c]), g = 0; g < e.length - 1; g++)f[e[g]] = f[e[g]] || {}, f = f[e[g]];
            if (c = e.pop(), d === b)return f[c] === b ? null : f[c];
            f[c] = d
        } else {
            if (d === b)return this.options[c] === b ? null : this.options[c];
            h[c] = d
        }
        return this._setOptions(h), this
    }, _setOptions: function (a) {
        var b;
        for (b in a)this._setOption(b, a[b]);
        return this
    }, _setOption: function (a, b) {
        return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!b).attr("aria-disabled", b), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
    }, enable: function () {
        return this._setOption("disabled", !1)
    }, disable: function () {
        return this._setOption("disabled", !0)
    }, _on: function (b, c, d) {
        var e, f = this;
        "boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function (d, g) {
            function h() {
                return b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof g ? f[g] : g).apply(f, arguments) : void 0
            }

            "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
            var i = d.match(/^(\w+)\s*(.*)$/), j = i[1] + f.eventNamespace, k = i[2];
            k ? e.delegate(k, j, h) : c.bind(j, h)
        })
    }, _off: function (a, b) {
        b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, a.unbind(b).undelegate(b)
    }, _delay: function (a, b) {
        function c() {
            return("string" == typeof a ? d[a] : a).apply(d, arguments)
        }

        var d = this;
        return setTimeout(c, b || 0)
    }, _hoverable: function (b) {
        this.hoverable = this.hoverable.add(b), this._on(b, {mouseenter: function (b) {
            a(b.currentTarget).addClass("ui-state-hover")
        }, mouseleave: function (b) {
            a(b.currentTarget).removeClass("ui-state-hover")
        }})
    }, _focusable: function (b) {
        this.focusable = this.focusable.add(b), this._on(b, {focusin: function (b) {
            a(b.currentTarget).addClass("ui-state-focus")
        }, focusout: function (b) {
            a(b.currentTarget).removeClass("ui-state-focus")
        }})
    }, _trigger: function (b, c, d) {
        var e, f, g = this.options[b];
        if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)for (e in f)e in c || (c[e] = f[e]);
        return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
    }}, a.each({show: "fadeIn", hide: "fadeOut"}, function (b, c) {
        a.Widget.prototype["_" + b] = function (d, e, f) {
            "string" == typeof e && (e = {effect: e});
            var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
            e = e || {}, "number" == typeof e && (e = {duration: e}), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function (c) {
                a(this)[b](), f && f.call(d[0]), c()
            })
        }
    })
}(jQuery), function (a) {
    var b = !1;
    a(document).mouseup(function () {
        b = !1
    }), a.widget("ui.mouse", {version: "1.10.3", options: {cancel: "input,textarea,button,select,option", distance: 1, delay: 0}, _mouseInit: function () {
        var b = this;
        this.element.bind("mousedown." + this.widgetName, function (a) {
            return b._mouseDown(a)
        }).bind("click." + this.widgetName, function (c) {
            return!0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : void 0
        }), this.started = !1
    }, _mouseDestroy: function () {
        this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
    }, _mouseDown: function (c) {
        if (!b) {
            this._mouseStarted && this._mouseUp(c), this._mouseDownEvent = c;
            var d = this, e = 1 === c.which, f = "string" == typeof this.options.cancel && c.target.nodeName ? a(c.target).closest(this.options.cancel).length : !1;
            return e && !f && this._mouseCapture(c) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () {
                d.mouseDelayMet = !0
            }, this.options.delay)), this._mouseDistanceMet(c) && this._mouseDelayMet(c) && (this._mouseStarted = this._mouseStart(c) !== !1, !this._mouseStarted) ? (c.preventDefault(), !0) : (!0 === a.data(c.target, this.widgetName + ".preventClickEvent") && a.removeData(c.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (a) {
                return d._mouseMove(a)
            }, this._mouseUpDelegate = function (a) {
                return d._mouseUp(a)
            }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), c.preventDefault(), b = !0, !0)) : !0
        }
    }, _mouseMove: function (b) {
        return a.ui.ie && (!document.documentMode || document.documentMode < 9) && !b.button ? this._mouseUp(b) : this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted)
    }, _mouseUp: function (b) {
        return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1
    }, _mouseDistanceMet: function (a) {
        return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
    }, _mouseDelayMet: function () {
        return this.mouseDelayMet
    }, _mouseStart: function () {
    }, _mouseDrag: function () {
    }, _mouseStop: function () {
    }, _mouseCapture: function () {
        return!0
    }})
}(jQuery), function (a, b) {
    function c(a, b, c) {
        return[parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1)]
    }

    function d(b, c) {
        return parseInt(a.css(b, c), 10) || 0
    }

    function e(b) {
        var c = b[0];
        return 9 === c.nodeType ? {width: b.width(), height: b.height(), offset: {top: 0, left: 0}} : a.isWindow(c) ? {width: b.width(), height: b.height(), offset: {top: b.scrollTop(), left: b.scrollLeft()}} : c.preventDefault ? {width: 0, height: 0, offset: {top: c.pageY, left: c.pageX}} : {width: b.outerWidth(), height: b.outerHeight(), offset: b.offset()}
    }

    a.ui = a.ui || {};
    var f, g = Math.max, h = Math.abs, i = Math.round, j = /left|center|right/, k = /top|center|bottom/, l = /[\+\-]\d+(\.[\d]+)?%?/, m = /^\w+/, n = /%$/, o = a.fn.position;
    a.position = {scrollbarWidth: function () {
        if (f !== b)return f;
        var c, d, e = a("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), g = e.children()[0];
        return a("body").append(e), c = g.offsetWidth, e.css("overflow", "scroll"), d = g.offsetWidth, c === d && (d = e[0].clientWidth), e.remove(), f = c - d
    }, getScrollInfo: function (b) {
        var c = b.isWindow ? "" : b.element.css("overflow-x"), d = b.isWindow ? "" : b.element.css("overflow-y"), e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth, f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
        return{width: f ? a.position.scrollbarWidth() : 0, height: e ? a.position.scrollbarWidth() : 0}
    }, getWithinInfo: function (b) {
        var c = a(b || window), d = a.isWindow(c[0]);
        return{element: c, isWindow: d, offset: c.offset() || {left: 0, top: 0}, scrollLeft: c.scrollLeft(), scrollTop: c.scrollTop(), width: d ? c.width() : c.outerWidth(), height: d ? c.height() : c.outerHeight()}
    }}, a.fn.position = function (b) {
        if (!b || !b.of)return o.apply(this, arguments);
        b = a.extend({}, b);
        var f, n, p, q, r, s, t = a(b.of), u = a.position.getWithinInfo(b.within), v = a.position.getScrollInfo(u), w = (b.collision || "flip").split(" "), x = {};
        return s = e(t), t[0].preventDefault && (b.at = "left top"), n = s.width, p = s.height, q = s.offset, r = a.extend({}, q), a.each(["my", "at"], function () {
            var a, c, d = (b[this] || "").split(" ");
            1 === d.length && (d = j.test(d[0]) ? d.concat(["center"]) : k.test(d[0]) ? ["center"].concat(d) : ["center", "center"]), d[0] = j.test(d[0]) ? d[0] : "center", d[1] = k.test(d[1]) ? d[1] : "center", a = l.exec(d[0]), c = l.exec(d[1]), x[this] = [a ? a[0] : 0, c ? c[0] : 0], b[this] = [m.exec(d[0])[0], m.exec(d[1])[0]]
        }), 1 === w.length && (w[1] = w[0]), "right" === b.at[0] ? r.left += n : "center" === b.at[0] && (r.left += n / 2), "bottom" === b.at[1] ? r.top += p : "center" === b.at[1] && (r.top += p / 2), f = c(x.at, n, p), r.left += f[0], r.top += f[1], this.each(function () {
            var e, j, k = a(this), l = k.outerWidth(), m = k.outerHeight(), o = d(this, "marginLeft"), s = d(this, "marginTop"), y = l + o + d(this, "marginRight") + v.width, z = m + s + d(this, "marginBottom") + v.height, A = a.extend({}, r), B = c(x.my, k.outerWidth(), k.outerHeight());
            "right" === b.my[0] ? A.left -= l : "center" === b.my[0] && (A.left -= l / 2), "bottom" === b.my[1] ? A.top -= m : "center" === b.my[1] && (A.top -= m / 2), A.left += B[0], A.top += B[1], a.support.offsetFractions || (A.left = i(A.left), A.top = i(A.top)), e = {marginLeft: o, marginTop: s}, a.each(["left", "top"], function (c, d) {
                a.ui.position[w[c]] && a.ui.position[w[c]][d](A, {targetWidth: n, targetHeight: p, elemWidth: l, elemHeight: m, collisionPosition: e, collisionWidth: y, collisionHeight: z, offset: [f[0] + B[0], f[1] + B[1]], my: b.my, at: b.at, within: u, elem: k})
            }), b.using && (j = function (a) {
                var c = q.left - A.left, d = c + n - l, e = q.top - A.top, f = e + p - m, i = {target: {element: t, left: q.left, top: q.top, width: n, height: p}, element: {element: k, left: A.left, top: A.top, width: l, height: m}, horizontal: 0 > d ? "left" : c > 0 ? "right" : "center", vertical: 0 > f ? "top" : e > 0 ? "bottom" : "middle"};
                l > n && h(c + d) < n && (i.horizontal = "center"), m > p && h(e + f) < p && (i.vertical = "middle"), i.important = g(h(c), h(d)) > g(h(e), h(f)) ? "horizontal" : "vertical", b.using.call(this, a, i)
            }), k.offset(a.extend(A, {using: j}))
        })
    }, a.ui.position = {fit: {left: function (a, b) {
        var c, d = b.within, e = d.isWindow ? d.scrollLeft : d.offset.left, f = d.width, h = a.left - b.collisionPosition.marginLeft, i = e - h, j = h + b.collisionWidth - f - e;
        b.collisionWidth > f ? i > 0 && 0 >= j ? (c = a.left + i + b.collisionWidth - f - e, a.left += i - c) : a.left = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionWidth : e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = g(a.left - h, a.left)
    }, top: function (a, b) {
        var c, d = b.within, e = d.isWindow ? d.scrollTop : d.offset.top, f = b.within.height, h = a.top - b.collisionPosition.marginTop, i = e - h, j = h + b.collisionHeight - f - e;
        b.collisionHeight > f ? i > 0 && 0 >= j ? (c = a.top + i + b.collisionHeight - f - e, a.top += i - c) : a.top = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionHeight : e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = g(a.top - h, a.top)
    }}, flip: {left: function (a, b) {
        var c, d, e = b.within, f = e.offset.left + e.scrollLeft, g = e.width, i = e.isWindow ? e.scrollLeft : e.offset.left, j = a.left - b.collisionPosition.marginLeft, k = j - i, l = j + b.collisionWidth - g - i, m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0, n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0, o = -2 * b.offset[0];
        0 > k ? (c = a.left + m + n + o + b.collisionWidth - g - f, (0 > c || c < h(k)) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || h(d) < l) && (a.left += m + n + o))
    }, top: function (a, b) {
        var c, d, e = b.within, f = e.offset.top + e.scrollTop, g = e.height, i = e.isWindow ? e.scrollTop : e.offset.top, j = a.top - b.collisionPosition.marginTop, k = j - i, l = j + b.collisionHeight - g - i, m = "top" === b.my[1], n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0, o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0, p = -2 * b.offset[1];
        0 > k ? (d = a.top + n + o + p + b.collisionHeight - g - f, a.top + n + o + p > k && (0 > d || d < h(k)) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, a.top + n + o + p > l && (c > 0 || h(c) < l) && (a.top += n + o + p))
    }}, flipfit: {left: function () {
        a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments)
    }, top: function () {
        a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments)
    }}}, function () {
        var b, c, d, e, f, g = document.getElementsByTagName("body")[0], h = document.createElement("div");
        b = document.createElement(g ? "div" : "body"), d = {visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none"}, g && a.extend(d, {position: "absolute", left: "-1000px", top: "-1000px"});
        for (f in d)b.style[f] = d[f];
        b.appendChild(h), c = g || document.documentElement, c.insertBefore(b, c.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", e = a(h).offset().left, a.support.offsetFractions = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b)
    }()
}(jQuery), function (a) {
    a.widget("ui.draggable", a.ui.mouse, {version: "1.10.3", widgetEventPrefix: "drag", options: {addClasses: !0, appendTo: "parent", axis: !1, connectToSortable: !1, containment: !1, cursor: "auto", cursorAt: !1, grid: !1, handle: !1, helper: "original", iframeFix: !1, opacity: !1, refreshPositions: !1, revert: !1, revertDuration: 500, scope: "default", scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, snap: !1, snapMode: "both", snapTolerance: 20, stack: !1, zIndex: !1, drag: null, start: null, stop: null}, _create: function () {
        "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
    }, _destroy: function () {
        this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
    }, _mouseCapture: function (b) {
        var c = this.options;
        return this.helper || c.disabled || a(b.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(b), this.handle ? (a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function () {
            a("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({width: this.offsetWidth + "px", height: this.offsetHeight + "px", position: "absolute", opacity: "0.001", zIndex: 1e3}).css(a(this).offset()).appendTo("body")
        }), !0) : !1)
    }, _mouseStart: function (b) {
        var c = this.options;
        return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left}, this.offset.scroll = !1, a.extend(this.offset, {click: {left: b.pageX - this.offset.left, top: b.pageY - this.offset.top}, parent: this._getParentOffset(), relative: this._getRelativeOffset()}), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
    }, _mouseDrag: function (b, c) {
        if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), !c) {
            var d = this._uiHash();
            if (this._trigger("drag", b, d) === !1)return this._mouseUp({}), !1;
            this.position = d.position
        }
        return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
    }, _mouseStop: function (b) {
        var c = this, d = !1;
        return a.ui.ddmanager && !this.options.dropBehaviour && (d = a.ui.ddmanager.drop(this, b)), this.dropped && (d = this.dropped, this.dropped = !1), "original" !== this.options.helper || a.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !d || "valid" === this.options.revert && d || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function () {
            c._trigger("stop", b) !== !1 && c._clear()
        }) : this._trigger("stop", b) !== !1 && this._clear(), !1) : !1
    }, _mouseUp: function (b) {
        return a("div.ui-draggable-iframeFix").each(function () {
            this.parentNode.removeChild(this)
        }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b)
    }, cancel: function () {
        return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
    }, _getHandle: function (b) {
        return this.options.handle ? !!a(b.target).closest(this.element.find(this.options.handle)).length : !0
    }, _createHelper: function (b) {
        var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element;
        return d.parents("body").length || d.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), d[0] === this.element[0] || /(fixed|absolute)/.test(d.css("position")) || d.css("position", "absolute"), d
    }, _adjustOffsetFromHelper: function (b) {
        "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {left: +b[0], top: +b[1] || 0}), "left"in b && (this.offset.click.left = b.left + this.margins.left), "right"in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top"in b && (this.offset.click.top = b.top + this.margins.top), "bottom"in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
    }, _getParentOffset: function () {
        var b = this.offsetParent.offset();
        return"absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {top: 0, left: 0}), {top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
    }, _getRelativeOffset: function () {
        if ("relative" === this.cssPosition) {
            var a = this.element.position();
            return{top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
        }
        return{top: 0, left: 0}
    }, _cacheMargins: function () {
        this.margins = {left: parseInt(this.element.css("marginLeft"), 10) || 0, top: parseInt(this.element.css("marginTop"), 10) || 0, right: parseInt(this.element.css("marginRight"), 10) || 0, bottom: parseInt(this.element.css("marginBottom"), 10) || 0}
    }, _cacheHelperProportions: function () {
        this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
    }, _setContainment: function () {
        var b, c, d, e = this.options;
        return e.containment ? "window" === e.containment ? (this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === e.containment ? (this.containment = [0, 0, a(document).width() - this.helperProportions.width - this.margins.left, (a(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : e.containment.constructor === Array ? (this.containment = e.containment, void 0) : ("parent" === e.containment && (e.containment = this.helper[0].parentNode), c = a(e.containment), d = c[0], d && (b = "hidden" !== c.css("overflow"), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c), void 0) : (this.containment = null, void 0)
    }, _convertPositionTo: function (b, c) {
        c || (c = this.position);
        var d = "absolute" === b ? 1 : -1, e = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
        return this.offset.scroll || (this.offset.scroll = {top: e.scrollTop(), left: e.scrollLeft()}), {top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * d, left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * d}
    }, _generatePosition: function (b) {
        var c, d, e, f, g = this.options, h = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, i = b.pageX, j = b.pageY;
        return this.offset.scroll || (this.offset.scroll = {top: h.scrollTop(), left: h.scrollLeft()}), this.originalPosition && (this.containment && (this.relative_container ? (d = this.relative_container.offset(), c = [this.containment[0] + d.left, this.containment[1] + d.top, this.containment[2] + d.left, this.containment[3] + d.top]) : c = this.containment, b.pageX - this.offset.click.left < c[0] && (i = c[0] + this.offset.click.left), b.pageY - this.offset.click.top < c[1] && (j = c[1] + this.offset.click.top), b.pageX - this.offset.click.left > c[2] && (i = c[2] + this.offset.click.left), b.pageY - this.offset.click.top > c[3] && (j = c[3] + this.offset.click.top)), g.grid && (e = g.grid[1] ? this.originalPageY + Math.round((j - this.originalPageY) / g.grid[1]) * g.grid[1] : this.originalPageY, j = c ? e - this.offset.click.top >= c[1] || e - this.offset.click.top > c[3] ? e : e - this.offset.click.top >= c[1] ? e - g.grid[1] : e + g.grid[1] : e, f = g.grid[0] ? this.originalPageX + Math.round((i - this.originalPageX) / g.grid[0]) * g.grid[0] : this.originalPageX, i = c ? f - this.offset.click.left >= c[0] || f - this.offset.click.left > c[2] ? f : f - this.offset.click.left >= c[0] ? f - g.grid[0] : f + g.grid[0] : f)), {top: j - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top), left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)}
    }, _clear: function () {
        this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
    }, _trigger: function (b, c, d) {
        return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), "drag" === b && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, b, c, d)
    }, plugins: {}, _uiHash: function () {
        return{helper: this.helper, position: this.position, originalPosition: this.originalPosition, offset: this.positionAbs}
    }}), a.ui.plugin.add("draggable", "connectToSortable", {start: function (b, c) {
        var d = a(this).data("ui-draggable"), e = d.options, f = a.extend({}, c, {item: d.element});
        d.sortables = [], a(e.connectToSortable).each(function () {
            var c = a.data(this, "ui-sortable");
            c && !c.options.disabled && (d.sortables.push({instance: c, shouldRevert: c.options.revert}), c.refreshPositions(), c._trigger("activate", b, f))
        })
    }, stop: function (b, c) {
        var d = a(this).data("ui-draggable"), e = a.extend({}, c, {item: d.element});
        a.each(d.sortables, function () {
            this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, "original" === d.options.helper && this.instance.currentItem.css({top: "auto", left: "auto"})) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
        })
    }, drag: function (b, c) {
        var d = a(this).data("ui-draggable"), e = this;
        a.each(d.sortables, function () {
            var f = !1, g = this;
            this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (f = !0, a.each(d.sortables, function () {
                return this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this !== g && this.instance._intersectsWith(this.instance.containerCache) && a.contains(g.instance.element[0], this.instance.element[0]) && (f = !1), f
            })), f ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function () {
                return c.helper[0]
            }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
        })
    }}), a.ui.plugin.add("draggable", "cursor", {start: function () {
        var b = a("body"), c = a(this).data("ui-draggable").options;
        b.css("cursor") && (c._cursor = b.css("cursor")), b.css("cursor", c.cursor)
    }, stop: function () {
        var b = a(this).data("ui-draggable").options;
        b._cursor && a("body").css("cursor", b._cursor)
    }}), a.ui.plugin.add("draggable", "opacity", {start: function (b, c) {
        var d = a(c.helper), e = a(this).data("ui-draggable").options;
        d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity)
    }, stop: function (b, c) {
        var d = a(this).data("ui-draggable").options;
        d._opacity && a(c.helper).css("opacity", d._opacity)
    }}), a.ui.plugin.add("draggable", "scroll", {start: function () {
        var b = a(this).data("ui-draggable");
        b.scrollParent[0] !== document && "HTML" !== b.scrollParent[0].tagName && (b.overflowOffset = b.scrollParent.offset())
    }, drag: function (b) {
        var c = a(this).data("ui-draggable"), d = c.options, e = !1;
        c.scrollParent[0] !== document && "HTML" !== c.scrollParent[0].tagName ? (d.axis && "x" === d.axis || (c.overflowOffset.top + c.scrollParent[0].offsetHeight - b.pageY < d.scrollSensitivity ? c.scrollParent[0].scrollTop = e = c.scrollParent[0].scrollTop + d.scrollSpeed : b.pageY - c.overflowOffset.top < d.scrollSensitivity && (c.scrollParent[0].scrollTop = e = c.scrollParent[0].scrollTop - d.scrollSpeed)), d.axis && "y" === d.axis || (c.overflowOffset.left + c.scrollParent[0].offsetWidth - b.pageX < d.scrollSensitivity ? c.scrollParent[0].scrollLeft = e = c.scrollParent[0].scrollLeft + d.scrollSpeed : b.pageX - c.overflowOffset.left < d.scrollSensitivity && (c.scrollParent[0].scrollLeft = e = c.scrollParent[0].scrollLeft - d.scrollSpeed))) : (d.axis && "x" === d.axis || (b.pageY - a(document).scrollTop() < d.scrollSensitivity ? e = a(document).scrollTop(a(document).scrollTop() - d.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < d.scrollSensitivity && (e = a(document).scrollTop(a(document).scrollTop() + d.scrollSpeed))), d.axis && "y" === d.axis || (b.pageX - a(document).scrollLeft() < d.scrollSensitivity ? e = a(document).scrollLeft(a(document).scrollLeft() - d.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < d.scrollSensitivity && (e = a(document).scrollLeft(a(document).scrollLeft() + d.scrollSpeed)))), e !== !1 && a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(c, b)
    }}), a.ui.plugin.add("draggable", "snap", {start: function () {
        var b = a(this).data("ui-draggable"), c = b.options;
        b.snapElements = [], a(c.snap.constructor !== String ? c.snap.items || ":data(ui-draggable)" : c.snap).each(function () {
            var c = a(this), d = c.offset();
            this !== b.element[0] && b.snapElements.push({item: this, width: c.outerWidth(), height: c.outerHeight(), top: d.top, left: d.left})
        })
    }, drag: function (b, c) {
        var d, e, f, g, h, i, j, k, l, m, n = a(this).data("ui-draggable"), o = n.options, p = o.snapTolerance, q = c.offset.left, r = q + n.helperProportions.width, s = c.offset.top, t = s + n.helperProportions.height;
        for (l = n.snapElements.length - 1; l >= 0; l--)h = n.snapElements[l].left, i = h + n.snapElements[l].width, j = n.snapElements[l].top, k = j + n.snapElements[l].height, h - p > r || q > i + p || j - p > t || s > k + p || !a.contains(n.snapElements[l].item.ownerDocument, n.snapElements[l].item) ? (n.snapElements[l].snapping && n.options.snap.release && n.options.snap.release.call(n.element, b, a.extend(n._uiHash(), {snapItem: n.snapElements[l].item})), n.snapElements[l].snapping = !1) : ("inner" !== o.snapMode && (d = Math.abs(j - t) <= p, e = Math.abs(k - s) <= p, f = Math.abs(h - r) <= p, g = Math.abs(i - q) <= p, d && (c.position.top = n._convertPositionTo("relative", {top: j - n.helperProportions.height, left: 0}).top - n.margins.top), e && (c.position.top = n._convertPositionTo("relative", {top: k, left: 0}).top - n.margins.top), f && (c.position.left = n._convertPositionTo("relative", {top: 0, left: h - n.helperProportions.width}).left - n.margins.left), g && (c.position.left = n._convertPositionTo("relative", {top: 0, left: i}).left - n.margins.left)), m = d || e || f || g, "outer" !== o.snapMode && (d = Math.abs(j - s) <= p, e = Math.abs(k - t) <= p, f = Math.abs(h - q) <= p, g = Math.abs(i - r) <= p, d && (c.position.top = n._convertPositionTo("relative", {top: j, left: 0}).top - n.margins.top), e && (c.position.top = n._convertPositionTo("relative", {top: k - n.helperProportions.height, left: 0}).top - n.margins.top), f && (c.position.left = n._convertPositionTo("relative", {top: 0, left: h}).left - n.margins.left), g && (c.position.left = n._convertPositionTo("relative", {top: 0, left: i - n.helperProportions.width}).left - n.margins.left)), !n.snapElements[l].snapping && (d || e || f || g || m) && n.options.snap.snap && n.options.snap.snap.call(n.element, b, a.extend(n._uiHash(), {snapItem: n.snapElements[l].item})), n.snapElements[l].snapping = d || e || f || g || m)
    }}), a.ui.plugin.add("draggable", "stack", {start: function () {
        var b, c = this.data("ui-draggable").options, d = a.makeArray(a(c.stack)).sort(function (b, c) {
            return(parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
        });
        d.length && (b = parseInt(a(d[0]).css("zIndex"), 10) || 0, a(d).each(function (c) {
            a(this).css("zIndex", b + c)
        }), this.css("zIndex", b + d.length))
    }}), a.ui.plugin.add("draggable", "zIndex", {start: function (b, c) {
        var d = a(c.helper), e = a(this).data("ui-draggable").options;
        d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex)
    }, stop: function (b, c) {
        var d = a(this).data("ui-draggable").options;
        d._zIndex && a(c.helper).css("zIndex", d._zIndex)
    }})
}(jQuery), function (a) {
    function b(a, b, c) {
        return a > b && b + c > a
    }

    a.widget("ui.droppable", {version: "1.10.3", widgetEventPrefix: "drop", options: {accept: "*", activeClass: !1, addClasses: !0, greedy: !1, hoverClass: !1, scope: "default", tolerance: "intersect", activate: null, deactivate: null, drop: null, out: null, over: null}, _create: function () {
        var b = this.options, c = b.accept;
        this.isover = !1, this.isout = !0, this.accept = a.isFunction(c) ? c : function (a) {
            return a.is(c)
        }, this.proportions = {width: this.element[0].offsetWidth, height: this.element[0].offsetHeight}, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], a.ui.ddmanager.droppables[b.scope].push(this), b.addClasses && this.element.addClass("ui-droppable")
    }, _destroy: function () {
        for (var b = 0, c = a.ui.ddmanager.droppables[this.options.scope]; b < c.length; b++)c[b] === this && c.splice(b, 1);
        this.element.removeClass("ui-droppable ui-droppable-disabled")
    }, _setOption: function (b, c) {
        "accept" === b && (this.accept = a.isFunction(c) ? c : function (a) {
            return a.is(c)
        }), a.Widget.prototype._setOption.apply(this, arguments)
    }, _activate: function (b) {
        var c = a.ui.ddmanager.current;
        this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
    }, _deactivate: function (b) {
        var c = a.ui.ddmanager.current;
        this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
    }, _over: function (b) {
        var c = a.ui.ddmanager.current;
        c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
    }, _out: function (b) {
        var c = a.ui.ddmanager.current;
        c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
    }, _drop: function (b, c) {
        var d = c || a.ui.ddmanager.current, e = !1;
        return d && (d.currentItem || d.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function () {
            var b = a.data(this, "ui-droppable");
            return b.options.greedy && !b.options.disabled && b.options.scope === d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {offset: b.element.offset()}), b.options.tolerance) ? (e = !0, !1) : void 0
        }), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1) : !1
    }, ui: function (a) {
        return{draggable: a.currentItem || a.element, helper: a.helper, position: a.position, offset: a.positionAbs}
    }}), a.ui.intersect = function (a, c, d) {
        if (!c.offset)return!1;
        var e, f, g = (a.positionAbs || a.position.absolute).left, h = g + a.helperProportions.width, i = (a.positionAbs || a.position.absolute).top, j = i + a.helperProportions.height, k = c.offset.left, l = k + c.proportions.width, m = c.offset.top, n = m + c.proportions.height;
        switch (d) {
            case"fit":
                return g >= k && l >= h && i >= m && n >= j;
            case"intersect":
                return k < g + a.helperProportions.width / 2 && h - a.helperProportions.width / 2 < l && m < i + a.helperProportions.height / 2 && j - a.helperProportions.height / 2 < n;
            case"pointer":
                return e = (a.positionAbs || a.position.absolute).left + (a.clickOffset || a.offset.click).left, f = (a.positionAbs || a.position.absolute).top + (a.clickOffset || a.offset.click).top, b(f, m, c.proportions.height) && b(e, k, c.proportions.width);
            case"touch":
                return(i >= m && n >= i || j >= m && n >= j || m > i && j > n) && (g >= k && l >= g || h >= k && l >= h || k > g && h > l);
            default:
                return!1
        }
    }, a.ui.ddmanager = {current: null, droppables: {"default": []}, prepareOffsets: function (b, c) {
        var d, e, f = a.ui.ddmanager.droppables[b.options.scope] || [], g = c ? c.type : null, h = (b.currentItem || b.element).find(":data(ui-droppable)").addBack();
        a:for (d = 0; d < f.length; d++)if (!(f[d].options.disabled || b && !f[d].accept.call(f[d].element[0], b.currentItem || b.element))) {
            for (e = 0; e < h.length; e++)if (h[e] === f[d].element[0]) {
                f[d].proportions.height = 0;
                continue a
            }
            f[d].visible = "none" !== f[d].element.css("display"), f[d].visible && ("mousedown" === g && f[d]._activate.call(f[d], c), f[d].offset = f[d].element.offset(), f[d].proportions = {width: f[d].element[0].offsetWidth, height: f[d].element[0].offsetHeight})
        }
    }, drop: function (b, c) {
        var d = !1;
        return a.each((a.ui.ddmanager.droppables[b.options.scope] || []).slice(), function () {
            this.options && (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, c)))
        }), d
    }, dragStart: function (b, c) {
        b.element.parentsUntil("body").bind("scroll.droppable", function () {
            b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
        })
    }, drag: function (b, c) {
        b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function () {
            if (!this.options.disabled && !this.greedyChild && this.visible) {
                var d, e, f, g = a.ui.intersect(b, this, this.options.tolerance), h = !g && this.isover ? "isout" : g && !this.isover ? "isover" : null;
                h && (this.options.greedy && (e = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function () {
                    return a.data(this, "ui-droppable").options.scope === e
                }), f.length && (d = a.data(f[0], "ui-droppable"), d.greedyChild = "isover" === h)), d && "isover" === h && (d.isover = !1, d.isout = !0, d._out.call(d, c)), this[h] = !0, this["isout" === h ? "isover" : "isout"] = !1, this["isover" === h ? "_over" : "_out"].call(this, c), d && "isout" === h && (d.isout = !1, d.isover = !0, d._over.call(d, c)))
            }
        })
    }, dragStop: function (b, c) {
        b.element.parentsUntil("body").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
    }}
}(jQuery), function (a) {
    function b(a) {
        return parseInt(a, 10) || 0
    }

    function c(a) {
        return!isNaN(parseInt(a, 10))
    }

    a.widget("ui.resizable", a.ui.mouse, {version: "1.10.3", widgetEventPrefix: "resize", options: {alsoResize: !1, animate: !1, animateDuration: "slow", animateEasing: "swing", aspectRatio: !1, autoHide: !1, containment: !1, ghost: !1, grid: !1, handles: "e,s,se", helper: !1, maxHeight: null, maxWidth: null, minHeight: 10, minWidth: 10, zIndex: 90, resize: null, start: null, stop: null}, _create: function () {
        var b, c, d, e, f, g = this, h = this.options;
        if (this.element.addClass("ui-resizable"), a.extend(this, {_aspectRatio: !!h.aspectRatio, aspectRatio: h.aspectRatio, originalElement: this.element, _proportionallyResizeElements: [], _helper: h.helper || h.ghost || h.animate ? h.helper || "ui-resizable-helper" : null}), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({position: this.element.css("position"), width: this.element.outerWidth(), height: this.element.outerHeight(), top: this.element.css("top"), left: this.element.css("left")})), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({marginLeft: this.originalElement.css("marginLeft"), marginTop: this.originalElement.css("marginTop"), marginRight: this.originalElement.css("marginRight"), marginBottom: this.originalElement.css("marginBottom")}), this.originalElement.css({marginLeft: 0, marginTop: 0, marginRight: 0, marginBottom: 0}), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({position: "static", zoom: 1, display: "block"})), this.originalElement.css({margin: this.originalElement.css("margin")}), this._proportionallyResize()), this.handles = h.handles || (a(".ui-resizable-handle", this.element).length ? {n: ".ui-resizable-n", e: ".ui-resizable-e", s: ".ui-resizable-s", w: ".ui-resizable-w", se: ".ui-resizable-se", sw: ".ui-resizable-sw", ne: ".ui-resizable-ne", nw: ".ui-resizable-nw"} : "e,s,se"), this.handles.constructor === String)for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), b = this.handles.split(","), this.handles = {}, c = 0; c < b.length; c++)d = a.trim(b[c]), f = "ui-resizable-" + d, e = a("<div class='ui-resizable-handle " + f + "'></div>"), e.css({zIndex: h.zIndex}), "se" === d && e.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[d] = ".ui-resizable-" + d, this.element.append(e);
        this._renderAxis = function (b) {
            var c, d, e, f;
            b = b || this.element;
            for (c in this.handles)this.handles[c].constructor === String && (this.handles[c] = a(this.handles[c], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (d = a(this.handles[c], this.element), f = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth(), e = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join(""), b.css(e, f), this._proportionallyResize()), a(this.handles[c]).length
        }, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function () {
            g.resizing || (this.className && (e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), g.axis = e && e[1] ? e[1] : "se")
        }), h.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").mouseenter(function () {
            h.disabled || (a(this).removeClass("ui-resizable-autohide"), g._handles.show())
        }).mouseleave(function () {
            h.disabled || g.resizing || (a(this).addClass("ui-resizable-autohide"), g._handles.hide())
        })), this._mouseInit()
    }, _destroy: function () {
        this._mouseDestroy();
        var b, c = function (b) {
            a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
        };
        return this.elementIsWrapper && (c(this.element), b = this.element, this.originalElement.css({position: b.css("position"), width: b.outerWidth(), height: b.outerHeight(), top: b.css("top"), left: b.css("left")}).insertAfter(b), b.remove()), this.originalElement.css("resize", this.originalResizeStyle), c(this.originalElement), this
    }, _mouseCapture: function (b) {
        var c, d, e = !1;
        for (c in this.handles)d = a(this.handles[c])[0], (d === b.target || a.contains(d, b.target)) && (e = !0);
        return!this.options.disabled && e
    }, _mouseStart: function (c) {
        var d, e, f, g = this.options, h = this.element.position(), i = this.element;
        return this.resizing = !0, /absolute/.test(i.css("position")) ? i.css({position: "absolute", top: i.css("top"), left: i.css("left")}) : i.is(".ui-draggable") && i.css({position: "absolute", top: h.top, left: h.left}), this._renderProxy(), d = b(this.helper.css("left")), e = b(this.helper.css("top")), g.containment && (d += a(g.containment).scrollLeft() || 0, e += a(g.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {left: d, top: e}, this.size = this._helper ? {width: i.outerWidth(), height: i.outerHeight()} : {width: i.width(), height: i.height()}, this.originalSize = this._helper ? {width: i.outerWidth(), height: i.outerHeight()} : {width: i.width(), height: i.height()}, this.originalPosition = {left: d, top: e}, this.sizeDiff = {width: i.outerWidth() - i.width(), height: i.outerHeight() - i.height()}, this.originalMousePosition = {left: c.pageX, top: c.pageY}, this.aspectRatio = "number" == typeof g.aspectRatio ? g.aspectRatio : this.originalSize.width / this.originalSize.height || 1, f = a(".ui-resizable-" + this.axis).css("cursor"), a("body").css("cursor", "auto" === f ? this.axis + "-resize" : f), i.addClass("ui-resizable-resizing"), this._propagate("start", c), !0
    }, _mouseDrag: function (b) {
        var c, d = this.helper, e = {}, f = this.originalMousePosition, g = this.axis, h = this.position.top, i = this.position.left, j = this.size.width, k = this.size.height, l = b.pageX - f.left || 0, m = b.pageY - f.top || 0, n = this._change[g];
        return n ? (c = n.apply(this, [b, l, m]), this._updateVirtualBoundaries(b.shiftKey), (this._aspectRatio || b.shiftKey) && (c = this._updateRatio(c, b)), c = this._respectSize(c, b), this._updateCache(c), this._propagate("resize", b), this.position.top !== h && (e.top = this.position.top + "px"), this.position.left !== i && (e.left = this.position.left + "px"), this.size.width !== j && (e.width = this.size.width + "px"), this.size.height !== k && (e.height = this.size.height + "px"), d.css(e), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), a.isEmptyObject(e) || this._trigger("resize", b, this.ui()), !1) : !1
    }, _mouseStop: function (b) {
        this.resizing = !1;
        var c, d, e, f, g, h, i, j = this.options, k = this;
        return this._helper && (c = this._proportionallyResizeElements, d = c.length && /textarea/i.test(c[0].nodeName), e = d && a.ui.hasScroll(c[0], "left") ? 0 : k.sizeDiff.height, f = d ? 0 : k.sizeDiff.width, g = {width: k.helper.width() - f, height: k.helper.height() - e}, h = parseInt(k.element.css("left"), 10) + (k.position.left - k.originalPosition.left) || null, i = parseInt(k.element.css("top"), 10) + (k.position.top - k.originalPosition.top) || null, j.animate || this.element.css(a.extend(g, {top: i, left: h})), k.helper.height(k.size.height), k.helper.width(k.size.width), this._helper && !j.animate && this._proportionallyResize()), a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1
    }, _updateVirtualBoundaries: function (a) {
        var b, d, e, f, g, h = this.options;
        g = {minWidth: c(h.minWidth) ? h.minWidth : 0, maxWidth: c(h.maxWidth) ? h.maxWidth : 1 / 0, minHeight: c(h.minHeight) ? h.minHeight : 0, maxHeight: c(h.maxHeight) ? h.maxHeight : 1 / 0}, (this._aspectRatio || a) && (b = g.minHeight * this.aspectRatio, e = g.minWidth / this.aspectRatio, d = g.maxHeight * this.aspectRatio, f = g.maxWidth / this.aspectRatio, b > g.minWidth && (g.minWidth = b), e > g.minHeight && (g.minHeight = e), d < g.maxWidth && (g.maxWidth = d), f < g.maxHeight && (g.maxHeight = f)), this._vBoundaries = g
    }, _updateCache: function (a) {
        this.offset = this.helper.offset(), c(a.left) && (this.position.left = a.left), c(a.top) && (this.position.top = a.top), c(a.height) && (this.size.height = a.height), c(a.width) && (this.size.width = a.width)
    }, _updateRatio: function (a) {
        var b = this.position, d = this.size, e = this.axis;
        return c(a.height) ? a.width = a.height * this.aspectRatio : c(a.width) && (a.height = a.width / this.aspectRatio), "sw" === e && (a.left = b.left + (d.width - a.width), a.top = null), "nw" === e && (a.top = b.top + (d.height - a.height), a.left = b.left + (d.width - a.width)), a
    }, _respectSize: function (a) {
        var b = this._vBoundaries, d = this.axis, e = c(a.width) && b.maxWidth && b.maxWidth < a.width, f = c(a.height) && b.maxHeight && b.maxHeight < a.height, g = c(a.width) && b.minWidth && b.minWidth > a.width, h = c(a.height) && b.minHeight && b.minHeight > a.height, i = this.originalPosition.left + this.originalSize.width, j = this.position.top + this.size.height, k = /sw|nw|w/.test(d), l = /nw|ne|n/.test(d);
        return g && (a.width = b.minWidth), h && (a.height = b.minHeight), e && (a.width = b.maxWidth), f && (a.height = b.maxHeight), g && k && (a.left = i - b.minWidth), e && k && (a.left = i - b.maxWidth), h && l && (a.top = j - b.minHeight), f && l && (a.top = j - b.maxHeight), a.width || a.height || a.left || !a.top ? a.width || a.height || a.top || !a.left || (a.left = null) : a.top = null, a
    }, _proportionallyResize: function () {
        if (this._proportionallyResizeElements.length) {
            var a, b, c, d, e, f = this.helper || this.element;
            for (a = 0; a < this._proportionallyResizeElements.length; a++) {
                if (e = this._proportionallyResizeElements[a], !this.borderDif)for (this.borderDif = [], c = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")], d = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")], b = 0; b < c.length; b++)this.borderDif[b] = (parseInt(c[b], 10) || 0) + (parseInt(d[b], 10) || 0);
                e.css({height: f.height() - this.borderDif[0] - this.borderDif[2] || 0, width: f.width() - this.borderDif[1] - this.borderDif[3] || 0})
            }
        }
    }, _renderProxy: function () {
        var b = this.element, c = this.options;
        this.elementOffset = b.offset(), this._helper ? (this.helper = this.helper || a("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({width: this.element.outerWidth() - 1, height: this.element.outerHeight() - 1, position: "absolute", left: this.elementOffset.left + "px", top: this.elementOffset.top + "px", zIndex: ++c.zIndex}), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
    }, _change: {e: function (a, b) {
        return{width: this.originalSize.width + b}
    }, w: function (a, b) {
        var c = this.originalSize, d = this.originalPosition;
        return{left: d.left + b, width: c.width - b}
    }, n: function (a, b, c) {
        var d = this.originalSize, e = this.originalPosition;
        return{top: e.top + c, height: d.height - c}
    }, s: function (a, b, c) {
        return{height: this.originalSize.height + c}
    }, se: function (b, c, d) {
        return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
    }, sw: function (b, c, d) {
        return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
    }, ne: function (b, c, d) {
        return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
    }, nw: function (b, c, d) {
        return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
    }}, _propagate: function (b, c) {
        a.ui.plugin.call(this, b, [c, this.ui()]), "resize" !== b && this._trigger(b, c, this.ui())
    }, plugins: {}, ui: function () {
        return{originalElement: this.originalElement, element: this.element, helper: this.helper, position: this.position, size: this.size, originalSize: this.originalSize, originalPosition: this.originalPosition}
    }}), a.ui.plugin.add("resizable", "animate", {stop: function (b) {
        var c = a(this).data("ui-resizable"), d = c.options, e = c._proportionallyResizeElements, f = e.length && /textarea/i.test(e[0].nodeName), g = f && a.ui.hasScroll(e[0], "left") ? 0 : c.sizeDiff.height, h = f ? 0 : c.sizeDiff.width, i = {width: c.size.width - h, height: c.size.height - g}, j = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null, k = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null;
        c.element.animate(a.extend(i, k && j ? {top: k, left: j} : {}), {duration: d.animateDuration, easing: d.animateEasing, step: function () {
            var d = {width: parseInt(c.element.css("width"), 10), height: parseInt(c.element.css("height"), 10), top: parseInt(c.element.css("top"), 10), left: parseInt(c.element.css("left"), 10)};
            e && e.length && a(e[0]).css({width: d.width, height: d.height}), c._updateCache(d), c._propagate("resize", b)
        }})
    }}), a.ui.plugin.add("resizable", "containment", {start: function () {
        var c, d, e, f, g, h, i, j = a(this).data("ui-resizable"), k = j.options, l = j.element, m = k.containment, n = m instanceof a ? m.get(0) : /parent/.test(m) ? l.parent().get(0) : m;
        n && (j.containerElement = a(n), /document/.test(m) || m === document ? (j.containerOffset = {left: 0, top: 0}, j.containerPosition = {left: 0, top: 0}, j.parentData = {element: a(document), left: 0, top: 0, width: a(document).width(), height: a(document).height() || document.body.parentNode.scrollHeight}) : (c = a(n), d = [], a(["Top", "Right", "Left", "Bottom"]).each(function (a, e) {
            d[a] = b(c.css("padding" + e))
        }), j.containerOffset = c.offset(), j.containerPosition = c.position(), j.containerSize = {height: c.innerHeight() - d[3], width: c.innerWidth() - d[1]}, e = j.containerOffset, f = j.containerSize.height, g = j.containerSize.width, h = a.ui.hasScroll(n, "left") ? n.scrollWidth : g, i = a.ui.hasScroll(n) ? n.scrollHeight : f, j.parentData = {element: n, left: e.left, top: e.top, width: h, height: i}))
    }, resize: function (b) {
        var c, d, e, f, g = a(this).data("ui-resizable"), h = g.options, i = g.containerOffset, j = g.position, k = g._aspectRatio || b.shiftKey, l = {top: 0, left: 0}, m = g.containerElement;
        m[0] !== document && /static/.test(m.css("position")) && (l = i), j.left < (g._helper ? i.left : 0) && (g.size.width = g.size.width + (g._helper ? g.position.left - i.left : g.position.left - l.left), k && (g.size.height = g.size.width / g.aspectRatio), g.position.left = h.helper ? i.left : 0), j.top < (g._helper ? i.top : 0) && (g.size.height = g.size.height + (g._helper ? g.position.top - i.top : g.position.top), k && (g.size.width = g.size.height * g.aspectRatio), g.position.top = g._helper ? i.top : 0), g.offset.left = g.parentData.left + g.position.left, g.offset.top = g.parentData.top + g.position.top, c = Math.abs((g._helper ? g.offset.left - l.left : g.offset.left - l.left) + g.sizeDiff.width), d = Math.abs((g._helper ? g.offset.top - l.top : g.offset.top - i.top) + g.sizeDiff.height), e = g.containerElement.get(0) === g.element.parent().get(0), f = /relative|absolute/.test(g.containerElement.css("position")), e && f && (c -= g.parentData.left), c + g.size.width >= g.parentData.width && (g.size.width = g.parentData.width - c, k && (g.size.height = g.size.width / g.aspectRatio)), d + g.size.height >= g.parentData.height && (g.size.height = g.parentData.height - d, k && (g.size.width = g.size.height * g.aspectRatio))
    }, stop: function () {
        var b = a(this).data("ui-resizable"), c = b.options, d = b.containerOffset, e = b.containerPosition, f = b.containerElement, g = a(b.helper), h = g.offset(), i = g.outerWidth() - b.sizeDiff.width, j = g.outerHeight() - b.sizeDiff.height;
        b._helper && !c.animate && /relative/.test(f.css("position")) && a(this).css({left: h.left - e.left - d.left, width: i, height: j}), b._helper && !c.animate && /static/.test(f.css("position")) && a(this).css({left: h.left - e.left - d.left, width: i, height: j})
    }}), a.ui.plugin.add("resizable", "alsoResize", {start: function () {
        var b = a(this).data("ui-resizable"), c = b.options, d = function (b) {
            a(b).each(function () {
                var b = a(this);
                b.data("ui-resizable-alsoresize", {width: parseInt(b.width(), 10), height: parseInt(b.height(), 10), left: parseInt(b.css("left"), 10), top: parseInt(b.css("top"), 10)})
            })
        };
        "object" != typeof c.alsoResize || c.alsoResize.parentNode ? d(c.alsoResize) : c.alsoResize.length ? (c.alsoResize = c.alsoResize[0], d(c.alsoResize)) : a.each(c.alsoResize, function (a) {
            d(a)
        })
    }, resize: function (b, c) {
        var d = a(this).data("ui-resizable"), e = d.options, f = d.originalSize, g = d.originalPosition, h = {height: d.size.height - f.height || 0, width: d.size.width - f.width || 0, top: d.position.top - g.top || 0, left: d.position.left - g.left || 0}, i = function (b, d) {
            a(b).each(function () {
                var b = a(this), e = a(this).data("ui-resizable-alsoresize"), f = {}, g = d && d.length ? d : b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                a.each(g, function (a, b) {
                    var c = (e[b] || 0) + (h[b] || 0);
                    c && c >= 0 && (f[b] = c || null)
                }), b.css(f)
            })
        };
        "object" != typeof e.alsoResize || e.alsoResize.nodeType ? i(e.alsoResize) : a.each(e.alsoResize, function (a, b) {
            i(a, b)
        })
    }, stop: function () {
        a(this).removeData("resizable-alsoresize")
    }}), a.ui.plugin.add("resizable", "ghost", {start: function () {
        var b = a(this).data("ui-resizable"), c = b.options, d = b.size;
        b.ghost = b.originalElement.clone(), b.ghost.css({opacity: .25, display: "block", position: "relative", height: d.height, width: d.width, margin: 0, left: 0, top: 0}).addClass("ui-resizable-ghost").addClass("string" == typeof c.ghost ? c.ghost : ""), b.ghost.appendTo(b.helper)
    }, resize: function () {
        var b = a(this).data("ui-resizable");
        b.ghost && b.ghost.css({position: "relative", height: b.size.height, width: b.size.width})
    }, stop: function () {
        var b = a(this).data("ui-resizable");
        b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0))
    }}), a.ui.plugin.add("resizable", "grid", {resize: function () {
        var b = a(this).data("ui-resizable"), c = b.options, d = b.size, e = b.originalSize, f = b.originalPosition, g = b.axis, h = "number" == typeof c.grid ? [c.grid, c.grid] : c.grid, i = h[0] || 1, j = h[1] || 1, k = Math.round((d.width - e.width) / i) * i, l = Math.round((d.height - e.height) / j) * j, m = e.width + k, n = e.height + l, o = c.maxWidth && c.maxWidth < m, p = c.maxHeight && c.maxHeight < n, q = c.minWidth && c.minWidth > m, r = c.minHeight && c.minHeight > n;
        c.grid = h, q && (m += i), r && (n += j), o && (m -= i), p && (n -= j), /^(se|s|e)$/.test(g) ? (b.size.width = m, b.size.height = n) : /^(ne)$/.test(g) ? (b.size.width = m, b.size.height = n, b.position.top = f.top - l) : /^(sw)$/.test(g) ? (b.size.width = m, b.size.height = n, b.position.left = f.left - k) : (b.size.width = m, b.size.height = n, b.position.top = f.top - l, b.position.left = f.left - k)
    }})
}(jQuery), function (a) {
    a.widget("ui.selectable", a.ui.mouse, {version: "1.10.3", options: {appendTo: "body", autoRefresh: !0, distance: 0, filter: "*", tolerance: "touch", selected: null, selecting: null, start: null, stop: null, unselected: null, unselecting: null}, _create: function () {
        var b, c = this;
        this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function () {
            b = a(c.options.filter, c.element[0]), b.addClass("ui-selectee"), b.each(function () {
                var b = a(this), c = b.offset();
                a.data(this, "selectable-item", {element: this, $element: b, left: c.left, top: c.top, right: c.left + b.outerWidth(), bottom: c.top + b.outerHeight(), startselected: !1, selected: b.hasClass("ui-selected"), selecting: b.hasClass("ui-selecting"), unselecting: b.hasClass("ui-unselecting")})
            })
        }, this.refresh(), this.selectees = b.addClass("ui-selectee"), this._mouseInit(), this.helper = a("<div class='ui-selectable-helper'></div>")
    }, _destroy: function () {
        this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
    }, _mouseStart: function (b) {
        var c = this, d = this.options;
        this.opos = [b.pageX, b.pageY], this.options.disabled || (this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({left: b.pageX, top: b.pageY, width: 0, height: 0}), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function () {
            var d = a.data(this, "selectable-item");
            d.startselected = !0, b.metaKey || b.ctrlKey || (d.$element.removeClass("ui-selected"), d.selected = !1, d.$element.addClass("ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, {unselecting: d.element}))
        }), a(b.target).parents().addBack().each(function () {
            var d, e = a.data(this, "selectable-item");
            return e ? (d = !b.metaKey && !b.ctrlKey || !e.$element.hasClass("ui-selected"), e.$element.removeClass(d ? "ui-unselecting" : "ui-selected").addClass(d ? "ui-selecting" : "ui-unselecting"), e.unselecting = !d, e.selecting = d, e.selected = d, d ? c._trigger("selecting", b, {selecting: e.element}) : c._trigger("unselecting", b, {unselecting: e.element}), !1) : void 0
        }))
    }, _mouseDrag: function (b) {
        if (this.dragged = !0, !this.options.disabled) {
            var c, d = this, e = this.options, f = this.opos[0], g = this.opos[1], h = b.pageX, i = b.pageY;
            return f > h && (c = h, h = f, f = c), g > i && (c = i, i = g, g = c), this.helper.css({left: f, top: g, width: h - f, height: i - g}), this.selectees.each(function () {
                var c = a.data(this, "selectable-item"), j = !1;
                c && c.element !== d.element[0] && ("touch" === e.tolerance ? j = !(c.left > h || c.right < f || c.top > i || c.bottom < g) : "fit" === e.tolerance && (j = c.left > f && c.right < h && c.top > g && c.bottom < i), j ? (c.selected && (c.$element.removeClass("ui-selected"), c.selected = !1), c.unselecting && (c.$element.removeClass("ui-unselecting"), c.unselecting = !1), c.selecting || (c.$element.addClass("ui-selecting"), c.selecting = !0, d._trigger("selecting", b, {selecting: c.element}))) : (c.selecting && ((b.metaKey || b.ctrlKey) && c.startselected ? (c.$element.removeClass("ui-selecting"), c.selecting = !1, c.$element.addClass("ui-selected"), c.selected = !0) : (c.$element.removeClass("ui-selecting"), c.selecting = !1, c.startselected && (c.$element.addClass("ui-unselecting"), c.unselecting = !0), d._trigger("unselecting", b, {unselecting: c.element}))), c.selected && (b.metaKey || b.ctrlKey || c.startselected || (c.$element.removeClass("ui-selected"), c.selected = !1, c.$element.addClass("ui-unselecting"), c.unselecting = !0, d._trigger("unselecting", b, {unselecting: c.element})))))
            }), !1
        }
    }, _mouseStop: function (b) {
        var c = this;
        return this.dragged = !1, a(".ui-unselecting", this.element[0]).each(function () {
            var d = a.data(this, "selectable-item");
            d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected", b, {unselected: d.element})
        }), a(".ui-selecting", this.element[0]).each(function () {
            var d = a.data(this, "selectable-item");
            d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, {selected: d.element})
        }), this._trigger("stop", b), this.helper.remove(), !1
    }})
}(jQuery), function (a) {
    function b(a, b, c) {
        return a > b && b + c > a
    }

    function c(a) {
        return/left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"))
    }

    a.widget("ui.sortable", a.ui.mouse, {version: "1.10.3", widgetEventPrefix: "sort", ready: !1, options: {appendTo: "parent", axis: !1, connectWith: !1, containment: !1, cursor: "auto", cursorAt: !1, dropOnEmpty: !0, forcePlaceholderSize: !1, forceHelperSize: !1, grid: !1, handle: !1, helper: "original", items: "> *", opacity: !1, placeholder: !1, revert: !1, scroll: !0, scrollSensitivity: 20, scrollSpeed: 20, scope: "default", tolerance: "intersect", zIndex: 1e3, activate: null, beforeStop: null, change: null, deactivate: null, out: null, over: null, receive: null, remove: null, sort: null, start: null, stop: null, update: null}, _create: function () {
        var a = this.options;
        this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === a.axis || c(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
    }, _destroy: function () {
        this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
        for (var a = this.items.length - 1; a >= 0; a--)this.items[a].item.removeData(this.widgetName + "-item");
        return this
    }, _setOption: function (b, c) {
        "disabled" === b ? (this.options[b] = c, this.widget().toggleClass("ui-sortable-disabled", !!c)) : a.Widget.prototype._setOption.apply(this, arguments)
    }, _mouseCapture: function (b, c) {
        var d = null, e = !1, f = this;
        return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(b), a(b.target).parents().each(function () {
            return a.data(this, f.widgetName + "-item") === f ? (d = a(this), !1) : void 0
        }), a.data(b.target, f.widgetName + "-item") === f && (d = a(b.target)), d ? !this.options.handle || c || (a(this.options.handle, d).find("*").addBack().each(function () {
            this === b.target && (e = !0)
        }), e) ? (this.currentItem = d, this._removeCurrentsFromItems(), !0) : !1 : !1)
    }, _mouseStart: function (b, c, d) {
        var e, f, g = this.options;
        if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {top: this.offset.top - this.margins.top, left: this.offset.left - this.margins.left}, a.extend(this.offset, {click: {left: b.pageX - this.offset.left, top: b.pageY - this.offset.top}, parent: this._getParentOffset(), relative: this._getRelativeOffset()}), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt), this.domPosition = {prev: this.currentItem.prev()[0], parent: this.currentItem.parent()[0]}, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), g.containment && this._setContainment(), g.cursor && "auto" !== g.cursor && (f = this.document.find("body"), this.storedCursor = f.css("cursor"), f.css("cursor", g.cursor), this.storedStylesheet = a("<style>*{ cursor: " + g.cursor + " !important; }</style>").appendTo(f)), g.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", g.opacity)), g.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", g.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !d)for (e = this.containers.length - 1; e >= 0; e--)this.containers[e]._trigger("activate", b, this._uiHash(this));
        return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), !0
    }, _mouseDrag: function (b) {
        var c, d, e, f, g = this.options, h = !1;
        for (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < g.scrollSensitivity ? this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop + g.scrollSpeed : b.pageY - this.overflowOffset.top < g.scrollSensitivity && (this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop - g.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < g.scrollSensitivity ? this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft + g.scrollSpeed : b.pageX - this.overflowOffset.left < g.scrollSensitivity && (this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft - g.scrollSpeed)) : (b.pageY - a(document).scrollTop() < g.scrollSensitivity ? h = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < g.scrollSensitivity && (h = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)), b.pageX - a(document).scrollLeft() < g.scrollSensitivity ? h = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < g.scrollSensitivity && (h = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed))), h !== !1 && a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), c = this.items.length - 1; c >= 0; c--)if (d = this.items[c], e = d.item[0], f = this._intersectsWithPointer(d), f && d.instance === this.currentContainer && e !== this.currentItem[0] && this.placeholder[1 === f ? "next" : "prev"]()[0] !== e && !a.contains(this.placeholder[0], e) && ("semi-dynamic" === this.options.type ? !a.contains(this.element[0], e) : !0)) {
            if (this.direction = 1 === f ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(d))break;
            this._rearrange(b, d), this._trigger("change", b, this._uiHash());
            break
        }
        return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
    }, _mouseStop: function (b, c) {
        if (b) {
            if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b), this.options.revert) {
                var d = this, e = this.placeholder.offset(), f = this.options.axis, g = {};
                f && "x" !== f || (g.left = e.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), f && "y" !== f || (g.top = e.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, a(this.helper).animate(g, parseInt(this.options.revert, 10) || 500, function () {
                    d._clear(b)
                })
            } else this._clear(b, c);
            return!1
        }
    }, cancel: function () {
        if (this.dragging) {
            this._mouseUp({target: null}), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
            for (var b = this.containers.length - 1; b >= 0; b--)this.containers[b]._trigger("deactivate", null, this._uiHash(this)), this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), this.containers[b].containerCache.over = 0)
        }
        return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {helper: null, dragging: !1, reverting: !1, _noFinalSort: null}), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
    }, serialize: function (b) {
        var c = this._getItemsAsjQuery(b && b.connected), d = [];
        return b = b || {}, a(c).each(function () {
            var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[\-=_](.+)/);
            c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
        }), !d.length && b.key && d.push(b.key + "="), d.join("&")
    }, toArray: function (b) {
        var c = this._getItemsAsjQuery(b && b.connected), d = [];
        return b = b || {}, c.each(function () {
            d.push(a(b.item || this).attr(b.attribute || "id") || "")
        }), d
    }, _intersectsWith: function (a) {
        var b = this.positionAbs.left, c = b + this.helperProportions.width, d = this.positionAbs.top, e = d + this.helperProportions.height, f = a.left, g = f + a.width, h = a.top, i = h + a.height, j = this.offset.click.top, k = this.offset.click.left, l = "x" === this.options.axis || d + j > h && i > d + j, m = "y" === this.options.axis || b + k > f && g > b + k, n = l && m;
        return"pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? n : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
    }, _intersectsWithPointer: function (a) {
        var c = "x" === this.options.axis || b(this.positionAbs.top + this.offset.click.top, a.top, a.height), d = "y" === this.options.axis || b(this.positionAbs.left + this.offset.click.left, a.left, a.width), e = c && d, f = this._getDragVerticalDirection(), g = this._getDragHorizontalDirection();
        return e ? this.floating ? g && "right" === g || "down" === f ? 2 : 1 : f && ("down" === f ? 2 : 1) : !1
    }, _intersectsWithSides: function (a) {
        var c = b(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height), d = b(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width), e = this._getDragVerticalDirection(), f = this._getDragHorizontalDirection();
        return this.floating && f ? "right" === f && d || "left" === f && !d : e && ("down" === e && c || "up" === e && !c)
    }, _getDragVerticalDirection: function () {
        var a = this.positionAbs.top - this.lastPositionAbs.top;
        return 0 !== a && (a > 0 ? "down" : "up")
    }, _getDragHorizontalDirection: function () {
        var a = this.positionAbs.left - this.lastPositionAbs.left;
        return 0 !== a && (a > 0 ? "right" : "left")
    }, refresh: function (a) {
        return this._refreshItems(a), this.refreshPositions(), this
    }, _connectWith: function () {
        var a = this.options;
        return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith
    }, _getItemsAsjQuery: function (b) {
        var c, d, e, f, g = [], h = [], i = this._connectWith();
        if (i && b)for (c = i.length - 1; c >= 0; c--)for (e = a(i[c]), d = e.length - 1; d >= 0; d--)f = a.data(e[d], this.widgetFullName), f && f !== this && !f.options.disabled && h.push([a.isFunction(f.options.items) ? f.options.items.call(f.element) : a(f.options.items, f.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), f]);
        for (h.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {options: this.options, item: this.currentItem}) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), c = h.length - 1; c >= 0; c--)h[c][0].each(function () {
            g.push(this)
        });
        return a(g)
    }, _removeCurrentsFromItems: function () {
        var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
        this.items = a.grep(this.items, function (a) {
            for (var c = 0; c < b.length; c++)if (b[c] === a.item[0])return!1;
            return!0
        })
    }, _refreshItems: function (b) {
        this.items = [], this.containers = [this];
        var c, d, e, f, g, h, i, j, k = this.items, l = [
            [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {item: this.currentItem}) : a(this.options.items, this.element), this]
        ], m = this._connectWith();
        if (m && this.ready)for (c = m.length - 1; c >= 0; c--)for (e = a(m[c]), d = e.length - 1; d >= 0; d--)f = a.data(e[d], this.widgetFullName), f && f !== this && !f.options.disabled && (l.push([a.isFunction(f.options.items) ? f.options.items.call(f.element[0], b, {item: this.currentItem}) : a(f.options.items, f.element), f]), this.containers.push(f));
        for (c = l.length - 1; c >= 0; c--)for (g = l[c][1], h = l[c][0], d = 0, j = h.length; j > d; d++)i = a(h[d]), i.data(this.widgetName + "-item", g), k.push({item: i, instance: g, width: 0, height: 0, left: 0, top: 0})
    }, refreshPositions: function (b) {
        this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
        var c, d, e, f;
        for (c = this.items.length - 1; c >= 0; c--)d = this.items[c], d.instance !== this.currentContainer && this.currentContainer && d.item[0] !== this.currentItem[0] || (e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item, b || (d.width = e.outerWidth(), d.height = e.outerHeight()), f = e.offset(), d.left = f.left, d.top = f.top);
        if (this.options.custom && this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this); else for (c = this.containers.length - 1; c >= 0; c--)f = this.containers[c].element.offset(), this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
        return this
    }, _createPlaceholder: function (b) {
        b = b || this;
        var c, d = b.options;
        d.placeholder && d.placeholder.constructor !== String || (c = d.placeholder, d.placeholder = {element: function () {
            var d = b.currentItem[0].nodeName.toLowerCase(), e = a("<" + d + ">", b.document[0]).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
            return"tr" === d ? b.currentItem.children().each(function () {
                a("<td>&#160;</td>", b.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(e)
            }) : "img" === d && e.attr("src", b.currentItem.attr("src")), c || e.css("visibility", "hidden"), e
        }, update: function (a, e) {
            (!c || d.forcePlaceholderSize) && (e.height() || e.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10)))
        }}), b.placeholder = a(d.placeholder.element.call(b.element, b.currentItem)), b.currentItem.after(b.placeholder), d.placeholder.update(b, b.placeholder)
    }, _contactContainers: function (d) {
        var e, f, g, h, i, j, k, l, m, n, o = null, p = null;
        for (e = this.containers.length - 1; e >= 0; e--)if (!a.contains(this.currentItem[0], this.containers[e].element[0]))if (this._intersectsWith(this.containers[e].containerCache)) {
            if (o && a.contains(this.containers[e].element[0], o.element[0]))continue;
            o = this.containers[e], p = e
        } else this.containers[e].containerCache.over && (this.containers[e]._trigger("out", d, this._uiHash(this)), this.containers[e].containerCache.over = 0);
        if (o)if (1 === this.containers.length)this.containers[p].containerCache.over || (this.containers[p]._trigger("over", d, this._uiHash(this)), this.containers[p].containerCache.over = 1); else {
            for (g = 1e4, h = null, n = o.floating || c(this.currentItem), i = n ? "left" : "top", j = n ? "width" : "height", k = this.positionAbs[i] + this.offset.click[i], f = this.items.length - 1; f >= 0; f--)a.contains(this.containers[p].element[0], this.items[f].item[0]) && this.items[f].item[0] !== this.currentItem[0] && (!n || b(this.positionAbs.top + this.offset.click.top, this.items[f].top, this.items[f].height)) && (l = this.items[f].item.offset()[i], m = !1, Math.abs(l - k) > Math.abs(l + this.items[f][j] - k) && (m = !0, l += this.items[f][j]), Math.abs(l - k) < g && (g = Math.abs(l - k), h = this.items[f], this.direction = m ? "up" : "down"));
            if (!h && !this.options.dropOnEmpty)return;
            if (this.currentContainer === this.containers[p])return;
            h ? this._rearrange(d, h, null, !0) : this._rearrange(d, null, this.containers[p].element, !0), this._trigger("change", d, this._uiHash()), this.containers[p]._trigger("change", d, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", d, this._uiHash(this)), this.containers[p].containerCache.over = 1
        }
    }, _createHelper: function (b) {
        var c = this.options, d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : "clone" === c.helper ? this.currentItem.clone() : this.currentItem;
        return d.parents("body").length || a("parent" !== c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] === this.currentItem[0] && (this._storedCSS = {width: this.currentItem[0].style.width, height: this.currentItem[0].style.height, position: this.currentItem.css("position"), top: this.currentItem.css("top"), left: this.currentItem.css("left")}), (!d[0].style.width || c.forceHelperSize) && d.width(this.currentItem.width()), (!d[0].style.height || c.forceHelperSize) && d.height(this.currentItem.height()), d
    }, _adjustOffsetFromHelper: function (b) {
        "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {left: +b[0], top: +b[1] || 0}), "left"in b && (this.offset.click.left = b.left + this.margins.left), "right"in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top"in b && (this.offset.click.top = b.top + this.margins.top), "bottom"in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
    }, _getParentOffset: function () {
        this.offsetParent = this.helper.offsetParent();
        var b = this.offsetParent.offset();
        return"absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {top: 0, left: 0}), {top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0), left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)}
    }, _getRelativeOffset: function () {
        if ("relative" === this.cssPosition) {
            var a = this.currentItem.position();
            return{top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(), left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()}
        }
        return{top: 0, left: 0}
    }, _cacheMargins: function () {
        this.margins = {left: parseInt(this.currentItem.css("marginLeft"), 10) || 0, top: parseInt(this.currentItem.css("marginTop"), 10) || 0}
    }, _cacheHelperProportions: function () {
        this.helperProportions = {width: this.helper.outerWidth(), height: this.helper.outerHeight()}
    }, _setContainment: function () {
        var b, c, d, e = this.options;
        "parent" === e.containment && (e.containment = this.helper[0].parentNode), ("document" === e.containment || "window" === e.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a("document" === e.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (a("document" === e.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(e.containment) || (b = a(e.containment)[0], c = a(e.containment).offset(), d = "hidden" !== a(b).css("overflow"), this.containment = [c.left + (parseInt(a(b).css("borderLeftWidth"), 10) || 0) + (parseInt(a(b).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(b).css("borderTopWidth"), 10) || 0) + (parseInt(a(b).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (d ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(a(b).css("borderLeftWidth"), 10) || 0) - (parseInt(a(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (d ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(a(b).css("borderTopWidth"), 10) || 0) - (parseInt(a(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
    }, _convertPositionTo: function (b, c) {
        c || (c = this.position);
        var d = "absolute" === b ? 1 : -1, e = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, f = /(html|body)/i.test(e[0].tagName);
        return{top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * d, left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * d}
    }, _generatePosition: function (b) {
        var c, d, e = this.options, f = b.pageX, g = b.pageY, h = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, i = /(html|body)/i.test(h[0].tagName);
        return"relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top)), e.grid && (c = this.originalPageY + Math.round((g - this.originalPageY) / e.grid[1]) * e.grid[1], g = this.containment ? c - this.offset.click.top >= this.containment[1] && c - this.offset.click.top <= this.containment[3] ? c : c - this.offset.click.top >= this.containment[1] ? c - e.grid[1] : c + e.grid[1] : c, d = this.originalPageX + Math.round((f - this.originalPageX) / e.grid[0]) * e.grid[0], f = this.containment ? d - this.offset.click.left >= this.containment[0] && d - this.offset.click.left <= this.containment[2] ? d : d - this.offset.click.left >= this.containment[0] ? d - e.grid[0] : d + e.grid[0] : d)), {top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : i ? 0 : h.scrollTop()), left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : i ? 0 : h.scrollLeft())}
    }, _rearrange: function (a, b, c, d) {
        c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
        var e = this.counter;
        this._delay(function () {
            e === this.counter && this.refreshPositions(!d)
        })
    }, _clear: function (a, b) {
        this.reverting = !1;
        var c, d = [];
        if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
            for (c in this._storedCSS)("auto" === this._storedCSS[c] || "static" === this._storedCSS[c]) && (this._storedCSS[c] = "");
            this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
        } else this.currentItem.show();
        for (this.fromOutside && !b && d.push(function (a) {
            this._trigger("receive", a, this._uiHash(this.fromOutside))
        }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || b || d.push(function (a) {
            this._trigger("update", a, this._uiHash())
        }), this !== this.currentContainer && (b || (d.push(function (a) {
            this._trigger("remove", a, this._uiHash())
        }), d.push(function (a) {
            return function (b) {
                a._trigger("receive", b, this._uiHash(this))
            }
        }.call(this, this.currentContainer)), d.push(function (a) {
            return function (b) {
                a._trigger("update", b, this._uiHash(this))
            }
        }.call(this, this.currentContainer)))), c = this.containers.length - 1; c >= 0; c--)b || d.push(function (a) {
            return function (b) {
                a._trigger("deactivate", b, this._uiHash(this))
            }
        }.call(this, this.containers[c])), this.containers[c].containerCache.over && (d.push(function (a) {
            return function (b) {
                a._trigger("out", b, this._uiHash(this))
            }
        }.call(this, this.containers[c])), this.containers[c].containerCache.over = 0);
        if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
            if (!b) {
                for (this._trigger("beforeStop", a, this._uiHash()), c = 0; c < d.length; c++)d[c].call(this, a);
                this._trigger("stop", a, this._uiHash())
            }
            return this.fromOutside = !1, !1
        }
        if (b || this._trigger("beforeStop", a, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !b) {
            for (c = 0; c < d.length; c++)d[c].call(this, a);
            this._trigger("stop", a, this._uiHash())
        }
        return this.fromOutside = !1, !0
    }, _trigger: function () {
        a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
    }, _uiHash: function (b) {
        var c = b || this;
        return{helper: c.helper, placeholder: c.placeholder || a([]), position: c.position, originalPosition: c.originalPosition, offset: c.positionAbs, item: c.currentItem, sender: b ? b.element : null}
    }})
}(jQuery), define("jquery-ui", function () {
}), function (window, angular, undefined) {
    var jqyoui = angular.module("ngDragDrop", []).service("ngDragDropService", ["$timeout", "$parse", function ($timeout, $parse) {
        this.callEventCallback = function (scope, callbackName, event, ui, data) {
            if (callbackName) {
                var args = [event, ui, data], match = callbackName.match(/^(.+)\((.+)\)$/);
                if (null !== match) {
                    callbackName = match[1];
                    var values = eval("[" + match[0].replace(/^(.+)\(/, "").replace(/\)/, "") + "]");
                    args.push.apply(args, values)
                }
                scope[callbackName] && scope[callbackName].apply(scope, args)
            }
        }, this.invokeDrop = function (a, b, c, d) {
            var e, f, g = "", h = "", i = {}, j = {}, k = null, l = {}, m = {}, n = null, o = b.scope(), p = a.scope(), q = {};
            g = a.ngattr("ng-model"), h = b.ngattr("ng-model"), e = p.$eval(g), f = o.$eval(h), n = b.find("[jqyoui-draggable]:last"), j = o.$eval(b.attr("jqyoui-droppable")) || [], i = p.$eval(a.attr("jqyoui-draggable")) || [], i.index = this.fixIndex(p, i, e), j.index = this.fixIndex(o, j, f), k = angular.isArray(e) ? i.index : null, l = angular.isArray(e) ? e[k] : e, m = angular.isArray(f) && j && j.index !== undefined ? f[j.index] : angular.isArray(f) ? {} : f, q = {dragModel: g, dropModel: h, dragSettings: i, dropSettings: j, jqyoui_pos: k, dragItem: l, dropItem: m, dragModelValue: e, dropModelValue: f, droppableScope: b.scope(), draggableScope: a.scope()}, i.animate === !0 ? (this.move(a, n.length > 0 ? n : b, null, "fast", j, null), this.move(n.length > 0 && !j.multiple ? n : [], a.parent("[jqyoui-droppable]"), jqyoui.startXY, "fast", j, function () {
                $timeout(function () {
                    a.css({position: "relative", left: "", top: ""}), n.css({position: "relative", left: "", top: ""}), i.mutate !== !1 && this.mutateDraggable(p, j, i, g, h, m, a), j.mutate !== !1 && this.mutateDroppable(o, j, i, h, l, k), this.callEventCallback(o, j.onDrop, c, d, q)
                }.bind(this))
            }.bind(this))) : $timeout(function () {
                i.mutate !== !1 && this.mutateDraggable(p, j, i, g, h, m, a), j.mutate !== !1 && this.mutateDroppable(o, j, i, h, l, k), this.callEventCallback(o, j.onDrop, c, d, q)
            }.bind(this))
        }, this.move = function (a, b, c, d, e, f) {
            if (0 === a.length)return f && window.setTimeout(function () {
                f()
            }, 300), !1;
            var g = 9999, h = a.offset(), i = b && b.is(":visible");
            null === c && b.length > 0 && (b.attr("jqyoui-draggable") !== undefined && b.ngattr("ng-model") !== undefined && b.is(":visible") && e && e.multiple ? (c = b.offset(), e.stack === !1 ? c.left += b.outerWidth(!0) : c.top += b.outerHeight(!0)) : (c = b.css({visibility: "hidden", display: "block"}).offset(), b.css({visibility: "", display: i ? "" : "none"}))), a.css({position: "absolute", "z-index": g}).css(h).animate(c, d, function () {
                f && f()
            })
        }, this.mutateDroppable = function (a, b, c, d, e, f) {
            var g = a.$eval(d);
            a.__dragItem = e, angular.isArray(g) ? (b && b.index >= 0 ? g[b.index] = e : g.push(e), c && c.placeholder === !0 && (g[g.length - 1].jqyoui_pos = f)) : ($parse(d + " = __dragItem")(a), c && c.placeholder === !0 && (g.jqyoui_pos = f))
        }, this.mutateDraggable = function (a, b, c, d, e, f, g) {
            var h = angular.equals(angular.copy(f), {}), i = a.$eval(d);
            a.__dropItem = f, c && c.placeholder ? "keep" != c.placeholder && (angular.isArray(i) && c.index !== undefined ? i[c.index] = f : $parse(d + " = __dropItem")(a)) : angular.isArray(i) ? h ? c && c.placeholder !== !0 && "keep" !== c.placeholder && i.splice(c.index, 1) : i[c.index] = f : ($parse(d + " = __dropItem")(a), a.$parent && $parse(d + " = __dropItem")(a.$parent)), g.css({"z-index": "", left: "", top: ""})
        }, this.fixIndex = function (a, b, c) {
            if (b.applyFilter && angular.isArray(c) && c.length > 0) {
                var d = a[b.applyFilter](), e = d[b.index], f = undefined;
                return c.forEach(function (a, b) {
                    angular.equals(a, e) && (f = b)
                }), f
            }
            return b.index
        }
    }]).directive("jqyouiDraggable", ["ngDragDropService", function (a) {
        return{require: "?jqyouiDroppable", restrict: "A", link: function (b, c, d) {
            var e, f, g = function (g) {
                g ? (e = b.$eval(c.attr("jqyoui-draggable")) || [], c.draggable({disabled: !1}).draggable(b.$eval(d.jqyouiOptions) || {}).draggable({start: function (c, d) {
                    f = angular.element(this).css("z-index"), angular.element(this).css("z-index", 99999), jqyoui.startXY = angular.element(this).offset(), a.callEventCallback(b, e.onStart, c, d)
                }, stop: function (c, d) {
                    angular.element(this).css("z-index", f), a.callEventCallback(b, e.onStop, c, d)
                }, drag: function (c, d) {
                    a.callEventCallback(b, e.onDrag, c, d)
                }})) : c.draggable({disabled: !0})
            };
            b.$watch(function () {
                return b.$eval(d.drag)
            }, g), g()
        }}
    }]).directive("jqyouiDroppable", ["ngDragDropService", function (a) {
        return{restrict: "A", priority: 1, link: function (b, c, d) {
            var e = function (e) {
                e ? c.droppable({disabled: !1}).droppable(b.$eval(d.jqyouiOptions) || {}).droppable({over: function (c, d) {
                    var e = b.$eval(angular.element(this).attr("jqyoui-droppable")) || [];
                    a.callEventCallback(b, e.onOver, c, d)
                }, out: function (c, d) {
                    var e = b.$eval(angular.element(this).attr("jqyoui-droppable")) || [];
                    a.callEventCallback(b, e.onOut, c, d)
                }, drop: function (c, e) {
                    angular.element(e.draggable).ngattr("ng-model") && d.ngModel ? a.invokeDrop(angular.element(e.draggable), angular.element(this), c, e) : a.callEventCallback(b, (b.$eval(angular.element(this).attr("jqyoui-droppable")) || []).onDrop, c, e)
                }}) : c.droppable({disabled: !0})
            };
            b.$watch(function () {
                return b.$eval(d.drop)
            }, e), e()
        }}
    }]);
    $.fn.ngattr = function (a) {
        var b = angular.element(this).get(0);
        return b.getAttribute(a) || b.getAttribute("data-" + a)
    }
}(window, window.angular), define("angular-dragdrop", function () {
}), define("extend-jquery", ["jquery"], function (a) {
    var b = a(window);
    return a.fn.place_tt = function () {
        var c = {offset: 5, css: {position: "absolute", top: -1e3, left: 0, color: "#c8c8c8", padding: "10px", "font-size": "11pt", "font-weight": 200, "background-color": "#1f1f1f", "border-radius": "5px", "z-index": 9999}};
        return function (d, e, f) {
            return f = a.extend(!0, {}, c, f), this.each(function () {
                var c, g, h = a(this);
                h.css(f.css), a.contains(document.body, h[0]) || h.appendTo(document.body), c = h.outerWidth(!0), g = h.outerHeight(!0), h.css("left", d + f.offset + c > b.width() ? d - f.offset - c : d + f.offset), h.css("top", e + f.offset + g > b.height() ? e - f.offset - g : e + f.offset)
            })
        }
    }(), a
}), define("settings", ["underscore"], function (a) {
    return function (b) {
        var c = {elasticsearch: "http://" + window.location.hostname + ":9200", panel_names: [], kibana_index: "kibana-int"}, d = {};
        return a.each(c, function (a, e) {
            d[e] = "undefined" != typeof b[e] ? b[e] : c[e]
        }), d
    }
}), define("services/alertSrv", ["angular", "underscore"], function (a, b) {
    var c = a.module("kibana.services");
    c.service("alertSrv", ["$timeout", function (c) {
        var d = this;
        this.list = [], this.set = function (e, f, g, h) {
            var i = {title: e || "", text: f || "", severity: g || "info"}, j = a.toJson(i), k = b.map(d.list, function (b) {
                return a.toJson(b)
            });
            return b.contains(k, j) && b.remove(d.list, b.indexOf(k, j)), d.list.push(i), h > 0 && c(function () {
                d.list = b.without(d.list, i)
            }, h), i
        }, this.clear = function (a) {
            d.list = b.without(d.list, a)
        }, this.clearAll = function () {
            d.list = []
        }
    }])
}), function (a) {
    function b(a, b) {
        return function (c) {
            return i(a.call(this, c), b)
        }
    }

    function c(a, b) {
        return function (c) {
            return this.lang().ordinal(a.call(this, c), b)
        }
    }

    function d() {
    }

    function e(a) {
        g(this, a)
    }

    function f(a) {
        var b = a.years || a.year || a.y || 0, c = a.months || a.month || a.M || 0, d = a.weeks || a.week || a.w || 0, e = a.days || a.day || a.d || 0, f = a.hours || a.hour || a.h || 0, g = a.minutes || a.minute || a.m || 0, h = a.seconds || a.second || a.s || 0, i = a.milliseconds || a.millisecond || a.ms || 0;
        this._input = a, this._milliseconds = i + 1e3 * h + 6e4 * g + 36e5 * f, this._days = e + 7 * d, this._months = c + 12 * b, this._data = {}, this._bubble()
    }

    function g(a, b) {
        for (var c in b)b.hasOwnProperty(c) && (a[c] = b[c]);
        return a
    }

    function h(a) {
        return 0 > a ? Math.ceil(a) : Math.floor(a)
    }

    function i(a, b) {
        for (var c = a + ""; c.length < b;)c = "0" + c;
        return c
    }

    function j(a, b, c, d) {
        var e, f, g = b._milliseconds, h = b._days, i = b._months;
        g && a._d.setTime(+a._d + g * c), (h || i) && (e = a.minute(), f = a.hour()), h && a.date(a.date() + h * c), i && a.month(a.month() + i * c), g && !d && H.updateOffset(a), (h || i) && (a.minute(e), a.hour(f))
    }

    function k(a) {
        return"[object Array]" === Object.prototype.toString.call(a)
    }

    function l(a, b) {
        var c, d = Math.min(a.length, b.length), e = Math.abs(a.length - b.length), f = 0;
        for (c = 0; d > c; c++)~~a[c] !== ~~b[c] && f++;
        return f + e
    }

    function m(a) {
        return a ? eb[a] || a.toLowerCase().replace(/(.)s$/, "$1") : a
    }

    function n(a, b) {
        return b.abbr = a, L[a] || (L[a] = new d), L[a].set(b), L[a]
    }

    function o(a) {
        if (!a)return H.fn._lang;
        if (!L[a] && M)try {
            require("./lang/" + a)
        } catch (b) {
            return H.fn._lang
        }
        return L[a]
    }

    function p(a) {
        return a.match(/\[.*\]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
    }

    function q(a) {
        var b, c, d = a.match(P);
        for (b = 0, c = d.length; c > b; b++)d[b] = ib[d[b]] ? ib[d[b]] : p(d[b]);
        return function (e) {
            var f = "";
            for (b = 0; c > b; b++)f += d[b]instanceof Function ? d[b].call(e, a) : d[b];
            return f
        }
    }

    function r(a, b) {
        function c(b) {
            return a.lang().longDateFormat(b) || b
        }

        for (var d = 5; d-- && Q.test(b);)b = b.replace(Q, c);
        return fb[b] || (fb[b] = q(b)), fb[b](a)
    }

    function s(a, b) {
        switch (a) {
            case"DDDD":
                return T;
            case"YYYY":
                return U;
            case"YYYYY":
                return V;
            case"S":
            case"SS":
            case"SSS":
            case"DDD":
                return S;
            case"MMM":
            case"MMMM":
            case"dd":
            case"ddd":
            case"dddd":
                return W;
            case"a":
            case"A":
                return o(b._l)._meridiemParse;
            case"X":
                return Z;
            case"Z":
            case"ZZ":
                return X;
            case"T":
                return Y;
            case"MM":
            case"DD":
            case"YY":
            case"HH":
            case"hh":
            case"mm":
            case"ss":
            case"M":
            case"D":
            case"d":
            case"H":
            case"h":
            case"m":
            case"s":
                return R;
            default:
                return new RegExp(a.replace("\\", ""))
        }
    }

    function t(a) {
        var b = (X.exec(a) || [])[0], c = (b + "").match(bb) || ["-", 0, 0], d = +(60 * c[1]) + ~~c[2];
        return"+" === c[0] ? -d : d
    }

    function u(a, b, c) {
        var d, e = c._a;
        switch (a) {
            case"M":
            case"MM":
                e[1] = null == b ? 0 : ~~b - 1;
                break;
            case"MMM":
            case"MMMM":
                d = o(c._l).monthsParse(b), null != d ? e[1] = d : c._isValid = !1;
                break;
            case"D":
            case"DD":
            case"DDD":
            case"DDDD":
                null != b && (e[2] = ~~b);
                break;
            case"YY":
                e[0] = ~~b + (~~b > 68 ? 1900 : 2e3);
                break;
            case"YYYY":
            case"YYYYY":
                e[0] = ~~b;
                break;
            case"a":
            case"A":
                c._isPm = o(c._l).isPM(b);
                break;
            case"H":
            case"HH":
            case"h":
            case"hh":
                e[3] = ~~b;
                break;
            case"m":
            case"mm":
                e[4] = ~~b;
                break;
            case"s":
            case"ss":
                e[5] = ~~b;
                break;
            case"S":
            case"SS":
            case"SSS":
                e[6] = ~~(1e3 * ("0." + b));
                break;
            case"X":
                c._d = new Date(1e3 * parseFloat(b));
                break;
            case"Z":
            case"ZZ":
                c._useUTC = !0, c._tzm = t(b)
        }
        null == b && (c._isValid = !1)
    }

    function v(a) {
        var b, c, d = [];
        if (!a._d) {
            for (b = 0; 7 > b; b++)a._a[b] = d[b] = null == a._a[b] ? 2 === b ? 1 : 0 : a._a[b];
            d[3] += ~~((a._tzm || 0) / 60), d[4] += ~~((a._tzm || 0) % 60), c = new Date(0), a._useUTC ? (c.setUTCFullYear(d[0], d[1], d[2]), c.setUTCHours(d[3], d[4], d[5], d[6])) : (c.setFullYear(d[0], d[1], d[2]), c.setHours(d[3], d[4], d[5], d[6])), a._d = c
        }
    }

    function w(a) {
        var b, c, d = a._f.match(P), e = a._i;
        for (a._a = [], b = 0; b < d.length; b++)c = (s(d[b], a).exec(e) || [])[0], c && (e = e.slice(e.indexOf(c) + c.length)), ib[d[b]] && u(d[b], c, a);
        e && (a._il = e), a._isPm && a._a[3] < 12 && (a._a[3] += 12), a._isPm === !1 && 12 === a._a[3] && (a._a[3] = 0), v(a)
    }

    function x(a) {
        var b, c, d, f, h, i = 99;
        for (f = 0; f < a._f.length; f++)b = g({}, a), b._f = a._f[f], w(b), c = new e(b), h = l(b._a, c.toArray()), c._il && (h += c._il.length), i > h && (i = h, d = c);
        g(a, d)
    }

    function y(a) {
        var b, c = a._i, d = $.exec(c);
        if (d) {
            for (a._f = "YYYY-MM-DD" + (d[2] || " "), b = 0; 4 > b; b++)if (ab[b][1].exec(c)) {
                a._f += ab[b][0];
                break
            }
            X.exec(c) && (a._f += " Z"), w(a)
        } else a._d = new Date(c)
    }

    function z(b) {
        var c = b._i, d = N.exec(c);
        c === a ? b._d = new Date : d ? b._d = new Date(+d[1]) : "string" == typeof c ? y(b) : k(c) ? (b._a = c.slice(0), v(b)) : b._d = c instanceof Date ? new Date(+c) : new Date(c)
    }

    function A(a, b, c, d, e) {
        return e.relativeTime(b || 1, !!c, a, d)
    }

    function B(a, b, c) {
        var d = K(Math.abs(a) / 1e3), e = K(d / 60), f = K(e / 60), g = K(f / 24), h = K(g / 365), i = 45 > d && ["s", d] || 1 === e && ["m"] || 45 > e && ["mm", e] || 1 === f && ["h"] || 22 > f && ["hh", f] || 1 === g && ["d"] || 25 >= g && ["dd", g] || 45 >= g && ["M"] || 345 > g && ["MM", K(g / 30)] || 1 === h && ["y"] || ["yy", h];
        return i[2] = b, i[3] = a > 0, i[4] = c, A.apply({}, i)
    }

    function C(a, b, c) {
        var d, e = c - b, f = c - a.day();
        return f > e && (f -= 7), e - 7 > f && (f += 7), d = H(a).add("d", f), {week: Math.ceil(d.dayOfYear() / 7), year: d.year()}
    }

    function D(a) {
        var b = a._i, c = a._f;
        return null === b || "" === b ? null : ("string" == typeof b && (a._i = b = o().preparse(b)), H.isMoment(b) ? (a = g({}, b), a._d = new Date(+b._d)) : c ? k(c) ? x(a) : w(a) : z(a), new e(a))
    }

    function E(a, b) {
        H.fn[a] = H.fn[a + "s"] = function (a) {
            var c = this._isUTC ? "UTC" : "";
            return null != a ? (this._d["set" + c + b](a), H.updateOffset(this), this) : this._d["get" + c + b]()
        }
    }

    function F(a) {
        H.duration.fn[a] = function () {
            return this._data[a]
        }
    }

    function G(a, b) {
        H.duration.fn["as" + a] = function () {
            return+this / b
        }
    }

    for (var H, I, J = "2.1.0", K = Math.round, L = {}, M = "undefined" != typeof module && module.exports, N = /^\/?Date\((\-?\d+)/i, O = /(\-)?(\d*)?\.?(\d+)\:(\d+)\:(\d+)\.?(\d{3})?/, P = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g, Q = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g, R = /\d\d?/, S = /\d{1,3}/, T = /\d{3}/, U = /\d{1,4}/, V = /[+\-]?\d{1,6}/, W = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, X = /Z|[\+\-]\d\d:?\d\d/i, Y = /T/i, Z = /[\+\-]?\d+(\.\d{1,3})?/, $ = /^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/, _ = "YYYY-MM-DDTHH:mm:ssZ", ab = [
        ["HH:mm:ss.S", /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
        ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/],
        ["HH:mm", /(T| )\d\d:\d\d/],
        ["HH", /(T| )\d\d/]
    ], bb = /([\+\-]|\d\d)/gi, cb = "Date|Hours|Minutes|Seconds|Milliseconds".split("|"), db = {Milliseconds: 1, Seconds: 1e3, Minutes: 6e4, Hours: 36e5, Days: 864e5, Months: 2592e6, Years: 31536e6}, eb = {ms: "millisecond", s: "second", m: "minute", h: "hour", d: "day", w: "week", M: "month", y: "year"}, fb = {}, gb = "DDD w W M D d".split(" "), hb = "M D H h m s w W".split(" "), ib = {M: function () {
        return this.month() + 1
    }, MMM: function (a) {
        return this.lang().monthsShort(this, a)
    }, MMMM: function (a) {
        return this.lang().months(this, a)
    }, D: function () {
        return this.date()
    }, DDD: function () {
        return this.dayOfYear()
    }, d: function () {
        return this.day()
    }, dd: function (a) {
        return this.lang().weekdaysMin(this, a)
    }, ddd: function (a) {
        return this.lang().weekdaysShort(this, a)
    }, dddd: function (a) {
        return this.lang().weekdays(this, a)
    }, w: function () {
        return this.week()
    }, W: function () {
        return this.isoWeek()
    }, YY: function () {
        return i(this.year() % 100, 2)
    }, YYYY: function () {
        return i(this.year(), 4)
    }, YYYYY: function () {
        return i(this.year(), 5)
    }, gg: function () {
        return i(this.weekYear() % 100, 2)
    }, gggg: function () {
        return this.weekYear()
    }, ggggg: function () {
        return i(this.weekYear(), 5)
    }, GG: function () {
        return i(this.isoWeekYear() % 100, 2)
    }, GGGG: function () {
        return this.isoWeekYear()
    }, GGGGG: function () {
        return i(this.isoWeekYear(), 5)
    }, e: function () {
        return this.weekday()
    }, E: function () {
        return this.isoWeekday()
    }, a: function () {
        return this.lang().meridiem(this.hours(), this.minutes(), !0)
    }, A: function () {
        return this.lang().meridiem(this.hours(), this.minutes(), !1)
    }, H: function () {
        return this.hours()
    }, h: function () {
        return this.hours() % 12 || 12
    }, m: function () {
        return this.minutes()
    }, s: function () {
        return this.seconds()
    }, S: function () {
        return~~(this.milliseconds() / 100)
    }, SS: function () {
        return i(~~(this.milliseconds() / 10), 2)
    }, SSS: function () {
        return i(this.milliseconds(), 3)
    }, Z: function () {
        var a = -this.zone(), b = "+";
        return 0 > a && (a = -a, b = "-"), b + i(~~(a / 60), 2) + ":" + i(~~a % 60, 2)
    }, ZZ: function () {
        var a = -this.zone(), b = "+";
        return 0 > a && (a = -a, b = "-"), b + i(~~(10 * a / 6), 4)
    }, z: function () {
        return this.zoneAbbr()
    }, zz: function () {
        return this.zoneName()
    }, X: function () {
        return this.unix()
    }}; gb.length;)I = gb.pop(), ib[I + "o"] = c(ib[I], I);
    for (; hb.length;)I = hb.pop(), ib[I + I] = b(ib[I], 2);
    for (ib.DDDD = b(ib.DDD, 3), d.prototype = {set: function (a) {
        var b, c;
        for (c in a)b = a[c], "function" == typeof b ? this[c] = b : this["_" + c] = b
    }, _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), months: function (a) {
        return this._months[a.month()]
    }, _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"), monthsShort: function (a) {
        return this._monthsShort[a.month()]
    }, monthsParse: function (a) {
        var b, c, d;
        for (this._monthsParse || (this._monthsParse = []), b = 0; 12 > b; b++)if (this._monthsParse[b] || (c = H([2e3, b]), d = "^" + this.months(c, "") + "|^" + this.monthsShort(c, ""), this._monthsParse[b] = new RegExp(d.replace(".", ""), "i")), this._monthsParse[b].test(a))return b
    }, _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), weekdays: function (a) {
        return this._weekdays[a.day()]
    }, _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"), weekdaysShort: function (a) {
        return this._weekdaysShort[a.day()]
    }, _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"), weekdaysMin: function (a) {
        return this._weekdaysMin[a.day()]
    }, weekdaysParse: function (a) {
        var b, c, d;
        for (this._weekdaysParse || (this._weekdaysParse = []), b = 0; 7 > b; b++)if (this._weekdaysParse[b] || (c = H([2e3, 1]).day(b), d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""), this._weekdaysParse[b] = new RegExp(d.replace(".", ""), "i")), this._weekdaysParse[b].test(a))return b
    }, _longDateFormat: {LT: "h:mm A", L: "MM/DD/YYYY", LL: "MMMM D YYYY", LLL: "MMMM D YYYY LT", LLLL: "dddd, MMMM D YYYY LT"}, longDateFormat: function (a) {
        var b = this._longDateFormat[a];
        return!b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (a) {
            return a.slice(1)
        }), this._longDateFormat[a] = b), b
    }, isPM: function (a) {
        return"p" === (a + "").toLowerCase()[0]
    }, _meridiemParse: /[ap]\.?m?\.?/i, meridiem: function (a, b, c) {
        return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
    }, _calendar: {sameDay: "[Today at] LT", nextDay: "[Tomorrow at] LT", nextWeek: "dddd [at] LT", lastDay: "[Yesterday at] LT", lastWeek: "[Last] dddd [at] LT", sameElse: "L"}, calendar: function (a, b) {
        var c = this._calendar[a];
        return"function" == typeof c ? c.apply(b) : c
    }, _relativeTime: {future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years"}, relativeTime: function (a, b, c, d) {
        var e = this._relativeTime[c];
        return"function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a)
    }, pastFuture: function (a, b) {
        var c = this._relativeTime[a > 0 ? "future" : "past"];
        return"function" == typeof c ? c(b) : c.replace(/%s/i, b)
    }, ordinal: function (a) {
        return this._ordinal.replace("%d", a)
    }, _ordinal: "%d", preparse: function (a) {
        return a
    }, postformat: function (a) {
        return a
    }, week: function (a) {
        return C(a, this._week.dow, this._week.doy).week
    }, _week: {dow: 0, doy: 6}}, H = function (a, b, c) {
        return D({_i: a, _f: b, _l: c, _isUTC: !1})
    }, H.utc = function (a, b, c) {
        return D({_useUTC: !0, _isUTC: !0, _l: c, _i: a, _f: b})
    }, H.unix = function (a) {
        return H(1e3 * a)
    }, H.duration = function (a, b) {
        var c, d, e = H.isDuration(a), g = "number" == typeof a, h = e ? a._input : g ? {} : a, i = O.exec(a);
        return g ? b ? h[b] = a : h.milliseconds = a : i && (c = "-" === i[1] ? -1 : 1, h = {y: 0, d: ~~i[2] * c, h: ~~i[3] * c, m: ~~i[4] * c, s: ~~i[5] * c, ms: ~~i[6] * c}), d = new f(h), e && a.hasOwnProperty("_lang") && (d._lang = a._lang), d
    }, H.version = J, H.defaultFormat = _, H.updateOffset = function () {
    }, H.lang = function (a, b) {
        return a ? (b ? n(a, b) : L[a] || o(a), H.duration.fn._lang = H.fn._lang = o(a), void 0) : H.fn._lang._abbr
    }, H.langData = function (a) {
        return a && a._lang && a._lang._abbr && (a = a._lang._abbr), o(a)
    }, H.isMoment = function (a) {
        return a instanceof e
    }, H.isDuration = function (a) {
        return a instanceof f
    }, H.fn = e.prototype = {clone: function () {
        return H(this)
    }, valueOf: function () {
        return+this._d + 6e4 * (this._offset || 0)
    }, unix: function () {
        return Math.floor(+this / 1e3)
    }, toString: function () {
        return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }, toDate: function () {
        return this._offset ? new Date(+this) : this._d
    }, toISOString: function () {
        return r(H(this).utc(), "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
    }, toArray: function () {
        var a = this;
        return[a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()]
    }, isValid: function () {
        return null == this._isValid && (this._isValid = this._a ? !l(this._a, (this._isUTC ? H.utc(this._a) : H(this._a)).toArray()) : !isNaN(this._d.getTime())), !!this._isValid
    }, utc: function () {
        return this.zone(0)
    }, local: function () {
        return this.zone(0), this._isUTC = !1, this
    }, format: function (a) {
        var b = r(this, a || H.defaultFormat);
        return this.lang().postformat(b)
    }, add: function (a, b) {
        var c;
        return c = "string" == typeof a ? H.duration(+b, a) : H.duration(a, b), j(this, c, 1), this
    }, subtract: function (a, b) {
        var c;
        return c = "string" == typeof a ? H.duration(+b, a) : H.duration(a, b), j(this, c, -1), this
    }, diff: function (a, b, c) {
        var d, e, f = this._isUTC ? H(a).zone(this._offset || 0) : H(a).local(), g = 6e4 * (this.zone() - f.zone());
        return b = m(b), "year" === b || "month" === b ? (d = 432e5 * (this.daysInMonth() + f.daysInMonth()), e = 12 * (this.year() - f.year()) + (this.month() - f.month()), e += (this - H(this).startOf("month") - (f - H(f).startOf("month"))) / d, e -= 6e4 * (this.zone() - H(this).startOf("month").zone() - (f.zone() - H(f).startOf("month").zone())) / d, "year" === b && (e /= 12)) : (d = this - f, e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - g) / 864e5 : "week" === b ? (d - g) / 6048e5 : d), c ? e : h(e)
    }, from: function (a, b) {
        return H.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)
    }, fromNow: function (a) {
        return this.from(H(), a)
    }, calendar: function () {
        var a = this.diff(H().startOf("day"), "days", !0), b = -6 > a ? "sameElse" : -1 > a ? "lastWeek" : 0 > a ? "lastDay" : 1 > a ? "sameDay" : 2 > a ? "nextDay" : 7 > a ? "nextWeek" : "sameElse";
        return this.format(this.lang().calendar(b, this))
    }, isLeapYear: function () {
        var a = this.year();
        return 0 === a % 4 && 0 !== a % 100 || 0 === a % 400
    }, isDST: function () {
        return this.zone() < this.clone().month(0).zone() || this.zone() < this.clone().month(5).zone()
    }, day: function (a) {
        var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != a ? "string" == typeof a && (a = this.lang().weekdaysParse(a), "number" != typeof a) ? this : this.add({d: a - b}) : b
    }, month: function (a) {
        var b, c = this._isUTC ? "UTC" : "";
        return null != a ? "string" == typeof a && (a = this.lang().monthsParse(a), "number" != typeof a) ? this : (b = this.date(), this.date(1), this._d["set" + c + "Month"](a), this.date(Math.min(b, this.daysInMonth())), H.updateOffset(this), this) : this._d["get" + c + "Month"]()
    }, startOf: function (a) {
        switch (a = m(a)) {
            case"year":
                this.month(0);
            case"month":
                this.date(1);
            case"week":
            case"day":
                this.hours(0);
            case"hour":
                this.minutes(0);
            case"minute":
                this.seconds(0);
            case"second":
                this.milliseconds(0)
        }
        return"week" === a && this.weekday(0), this
    }, endOf: function (a) {
        return this.startOf(a).add(a, 1).subtract("ms", 1)
    }, isAfter: function (a, b) {
        return b = "undefined" != typeof b ? b : "millisecond", +this.clone().startOf(b) > +H(a).startOf(b)
    }, isBefore: function (a, b) {
        return b = "undefined" != typeof b ? b : "millisecond", +this.clone().startOf(b) < +H(a).startOf(b)
    }, isSame: function (a, b) {
        return b = "undefined" != typeof b ? b : "millisecond", +this.clone().startOf(b) === +H(a).startOf(b)
    }, min: function (a) {
        return a = H.apply(null, arguments), this > a ? this : a
    }, max: function (a) {
        return a = H.apply(null, arguments), a > this ? this : a
    }, zone: function (a) {
        var b = this._offset || 0;
        return null == a ? this._isUTC ? b : this._d.getTimezoneOffset() : ("string" == typeof a && (a = t(a)), Math.abs(a) < 16 && (a = 60 * a), this._offset = a, this._isUTC = !0, b !== a && j(this, H.duration(b - a, "m"), 1, !0), this)
    }, zoneAbbr: function () {
        return this._isUTC ? "UTC" : ""
    }, zoneName: function () {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }, daysInMonth: function () {
        return H.utc([this.year(), this.month() + 1, 0]).date()
    }, dayOfYear: function (a) {
        var b = K((H(this).startOf("day") - H(this).startOf("year")) / 864e5) + 1;
        return null == a ? b : this.add("d", a - b)
    }, weekYear: function (a) {
        var b = C(this, this.lang()._week.dow, this.lang()._week.doy).year;
        return null == a ? b : this.add("y", a - b)
    }, isoWeekYear: function (a) {
        var b = C(this, 1, 4).year;
        return null == a ? b : this.add("y", a - b)
    }, week: function (a) {
        var b = this.lang().week(this);
        return null == a ? b : this.add("d", 7 * (a - b))
    }, isoWeek: function (a) {
        var b = C(this, 1, 4).week;
        return null == a ? b : this.add("d", 7 * (a - b))
    }, weekday: function (a) {
        var b = (this._d.getDay() + 7 - this.lang()._week.dow) % 7;
        return null == a ? b : this.add("d", a - b)
    }, isoWeekday: function (a) {
        return null == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7)
    }, lang: function (b) {
        return b === a ? this._lang : (this._lang = o(b), this)
    }}, I = 0; I < cb.length; I++)E(cb[I].toLowerCase().replace(/s$/, ""), cb[I]);
    E("year", "FullYear"), H.fn.days = H.fn.day, H.fn.months = H.fn.month, H.fn.weeks = H.fn.week, H.fn.isoWeeks = H.fn.isoWeek, H.fn.toJSON = H.fn.toISOString, H.duration.fn = f.prototype = {_bubble: function () {
        var a, b, c, d, e = this._milliseconds, f = this._days, g = this._months, i = this._data;
        i.milliseconds = e % 1e3, a = h(e / 1e3), i.seconds = a % 60, b = h(a / 60), i.minutes = b % 60, c = h(b / 60), i.hours = c % 24, f += h(c / 24), i.days = f % 30, g += h(f / 30), i.months = g % 12, d = h(g / 12), i.years = d
    }, weeks: function () {
        return h(this.days() / 7)
    }, valueOf: function () {
        return this._milliseconds + 864e5 * this._days + 2592e6 * (this._months % 12) + 31536e6 * ~~(this._months / 12)
    }, humanize: function (a) {
        var b = +this, c = B(b, !a, this.lang());
        return a && (c = this.lang().pastFuture(b, c)), this.lang().postformat(c)
    }, add: function (a, b) {
        var c = H.duration(a, b);
        return this._milliseconds += c._milliseconds, this._days += c._days, this._months += c._months, this._bubble(), this
    }, subtract: function (a, b) {
        var c = H.duration(a, b);
        return this._milliseconds -= c._milliseconds, this._days -= c._days, this._months -= c._months, this._bubble(), this
    }, get: function (a) {
        return a = m(a), this[a.toLowerCase() + "s"]()
    }, as: function (a) {
        return a = m(a), this["as" + a.charAt(0).toUpperCase() + a.slice(1) + "s"]()
    }, lang: H.fn.lang};
    for (I in db)db.hasOwnProperty(I) && (G(I, db[I]), F(I.toLowerCase()));
    G("Weeks", 6048e5), H.duration.fn.asMonths = function () {
        return(+this - 31536e6 * this.years()) / 2592e6 + 12 * this.years()
    }, H.lang("en", {ordinal: function (a) {
        var b = a % 10, c = 1 === ~~(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
        return a + c
    }}), M && (module.exports = H), "undefined" == typeof ender && (this.moment = H), "function" == typeof define && define.amd && define("moment", [], function () {
        return H
    })
}.call(this), define("kbn", ["jquery", "underscore", "moment"], function (a, b, c) {
    var d = {};
    return d.get_object_fields = function (a) {
        var b = [];
        a = d.flatten_json(a._source);
        for (var c in a)b.push(c);
        return b.sort()
    }, d.get_all_fields = function (a) {
        var c = a, e = [];
        return b.each(c, function (a) {
            e = b.uniq(e.concat(b.keys(d.flatten_json(a._source))))
        }), e = b.without(e, "$$hashKey")
    }, d.has_field = function (a, c) {
        var e = d.get_object_fields(a);
        return b.inArray(e, c) < 0 ? !1 : !0
    }, d.get_related_fields = function (a, c) {
        var d = [];
        b.each(a, function (a) {
            var e = b.keys(a);
            b.contains(e, c) && (d = d.concat(e))
        });
        var e = b.countBy(b.without(d, c), function (a) {
            return a
        });
        return b.map(e, function (a, b) {
            return{name: b, count: a}
        })
    }, d.recurse_field_dots = function (a, b) {
        var c, e = null;
        return"undefined" != typeof a[b] ? e = a[b] : (c = b.match(/(.*?)\.(.*)/)) && "undefined" != typeof a[c[1]] && (e = "undefined" != typeof a[c[1]][c[2]] ? a[c[1]][c[2]] : d.recurse_field_dots(a[c[1]], c[2])), e
    }, d.top_field_values = function (a, c, d, e) {
        var f, g, h = b.pluck(a, c), i = {};
        return b.each(h, function (a) {
            var c;
            b.isArray(a) && (g = !0), c = b.isArray(a) && !e ? a : b.isUndefined(a) ? "" : [a.toString()], b.each(c, function (c) {
                b.has(i, c) ? i[c][1]++ : i[c] = [e ? a : c, 1]
            })
        }), f = b.values(i).sort(function (a, b) {
            return a[1] - b[1]
        }).reverse().slice(0, d), {counts: f, hasArrays: g}
    }, d.calculate_interval = function (a, c, e, f) {
        return b.isObject(a) && (a = a.valueOf()), b.isObject(c) && (c = c.valueOf()), 0 === f ? d.round_interval((c - a) / e) : f
    }, d.round_interval = function (a) {
        switch (!0) {
            case 500 >= a:
                return 100;
            case 5e3 >= a:
                return 1e3;
            case 7500 >= a:
                return 5e3;
            case 15e3 >= a:
                return 1e4;
            case 45e3 >= a:
                return 3e4;
            case 18e4 >= a:
                return 6e4;
            case 45e4 >= a:
                return 3e5;
            case 12e5 >= a:
                return 6e5;
            case 27e5 >= a:
                return 18e5;
            case 72e5 >= a:
                return 36e5;
            case 216e5 >= a:
                return 108e5;
            case 864e5 >= a:
                return 432e5;
            case 1728e5 >= a:
                return 864e5;
            case 6048e5 >= a:
                return 864e5;
            case 18144e5 >= a:
                return 6048e5;
            case 36288e5 > a:
                return 2592e6;
            default:
                return 31536e6
        }
    }, d.secondsToHms = function (a) {
        var b = Math.floor(a / 31536e3);
        if (b)return b + "y";
        var c = Math.floor(a % 31536e3 / 86400);
        if (c)return c + "d";
        var d = Math.floor(a % 31536e3 % 86400 / 3600);
        if (d)return d + "h";
        var e = Math.floor(a % 31536e3 % 86400 % 3600 / 60);
        if (e)return e + "m";
        var f = a % 31536e3 % 86400 % 3600 % 60;
        return f ? f + "s" : "less then a second"
    }, d.to_percent = function (a, b) {
        return Math.floor(1e4 * (a / b)) / 100 + "%"
    }, d.addslashes = function (a) {
        return a = a.replace(/\\/g, "\\\\"), a = a.replace(/\'/g, "\\'"), a = a.replace(/\"/g, '\\"'), a = a.replace(/\0/g, "\\0")
    }, d.interval_regex = /(\d+(?:\.\d+)?)([Mwdhmsy])/, d.intervals_in_seconds = {y: 31536e3, M: 2592e3, w: 604800, d: 86400, h: 3600, m: 60, s: 1}, d.describe_interval = function (a) {
        var c = a.match(d.interval_regex);
        if (c && b.has(d.intervals_in_seconds, c[2]))return{sec: d.intervals_in_seconds[c[2]], type: c[2], count: parseInt(c[1], 10)};
        throw new Error('Invalid interval string, expexcting a number followed by one of "Mwdhmsy"')
    }, d.interval_to_ms = function (a) {
        var b = d.describe_interval(a);
        return 1e3 * b.sec * b.count
    }, d.interval_to_seconds = function (a) {
        var b = d.describe_interval(a);
        return b.sec * b.count
    }, d.time_ago = function (a) {
        return new Date((new Date).getTime() - d.interval_to_ms(a))
    }, d.parseDate = function (a) {
        if (b.isDate(a))return a;
        var c, e, f, g = "";
        return"now" === a.substring(0, 3) ? (c = new Date, g = a.substring("now".length)) : (e = a.indexOf("||"), -1 === e ? (f = a, g = "") : (f = a.substring(0, e), g = a.substring(e + 2)), c = new Date(f)), g.length ? d.parseDateMath(g, c) : c
    }, d.parseDateMath = function (a, b, d) {
        for (var e = c(b), f = 0; f < a.length;) {
            var g, h, i, j = a.charAt(f++);
            if ("/" === j)g = 0; else if ("+" === j)g = 1; else {
                if ("-" !== j)return!1;
                g = 2
            }
            if (isNaN(a.charAt(f)))h = 1; else {
                for (var k = f; !isNaN(a.charAt(f));)f++;
                h = parseInt(a.substring(k, f), 10)
            }
            if (0 === g && 1 !== h)return!1;
            switch (i = a.charAt(f++)) {
                case"M":
                    0 === g ? d ? e.endOf("month") : e.startOf("month") : 1 === g ? e.add("months", h) : 2 === g && e.subtract("months", h);
                    break;
                case"w":
                    0 === g ? d ? e.endOf("week") : e.startOf("week") : 1 === g ? e.add("weeks", h) : 2 === g && e.subtract("weeks", h);
                    break;
                case"d":
                    0 === g ? d ? e.endOf("day") : e.startOf("day") : 1 === g ? e.add("days", h) : 2 === g && e.subtract("days", h);
                    break;
                case"h":
                case"H":
                    0 === g ? d ? e.endOf("hour") : e.startOf("hour") : 1 === g ? e.add("hours", h) : 2 === g && e.subtract("hours", h);
                    break;
                case"m":
                    0 === g ? d ? e.endOf("minute") : e.startOf("minute") : 1 === g ? e.add("minutes", h) : 2 === g && e.subtract("minutes", h);
                    break;
                case"s":
                    0 === g ? d ? e.endOf("second") : e.startOf("second") : 1 === g ? e.add("seconds", h) : 2 === g && e.subtract("seconds", h);
                    break;
                default:
                    return!1
            }
        }
        return e.toDate()
    }, d.flatten_json = function (a, c, e) {
        "undefined" == typeof e && (e = {}), "undefined" == typeof c && (c = "");
        for (var f in a) {
            var g = a[f], h = 0 === c.length ? f : c + "." + f;
            if ("object" == typeof g)if (b.isArray(g))if (g.length > 0 && "object" == typeof g[0]) {
                for (var i = "", j = 0, k = g.length; k > j; j++)j > 0 && (i += ", "), i += JSON.stringify(g[j]);
                e[h] = i
            } else e[h] = 1 === g.length && b.isNumber(g[0]) ? parseFloat(g[0]) : "undefined" == typeof g ? null : g; else d.flatten_json(g, h, e); else e[h] = "undefined" == typeof g ? null : g
        }
        return d.sortObj(e)
    }, d.xmlEnt = function (a) {
        if (b.isString(a)) {
            var c = a.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r\n/g, "<br/>").replace(/\r/g, "<br/>").replace(/\n/g, "<br/>").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(/  /g, "&nbsp;&nbsp;").replace(/&lt;del&gt;/g, "<del>").replace(/&lt;\/del&gt;/g, "</del>");
            return c
        }
        return a
    }, d.sortObj = function (a) {
        var b, c = [], d = {};
        for (b in a)c.push(b);
        c.sort();
        for (b in c)d[c[b]] = a[c[b]];
        return d
    }, d.query_color_dot = function (a, b) {
        return'<div class="icon-circle" style="' + ["display:inline-block", "color:" + a, "font-size:" + b + "px"].join(";") + '"></div>'
    }, d
}), window.Modernizr = function (a, b, c) {
    function d(a) {
        t.cssText = a
    }

    function e(a, b) {
        return d(x.join(a + ";") + (b || ""))
    }

    function f(a, b) {
        return typeof a === b
    }

    function g(a, b) {
        return!!~("" + a).indexOf(b)
    }

    function h(a, b) {
        for (var d in a) {
            var e = a[d];
            if (!g(e, "-") && t[e] !== c)return"pfx" == b ? e : !0
        }
        return!1
    }

    function i(a, b, d) {
        for (var e in a) {
            var g = b[a[e]];
            if (g !== c)return d === !1 ? a[e] : f(g, "function") ? g.bind(d || b) : g
        }
        return!1
    }

    function j(a, b, c) {
        var d = a.charAt(0).toUpperCase() + a.slice(1), e = (a + " " + z.join(d + " ") + d).split(" ");
        return f(b, "string") || f(b, "undefined") ? h(e, b) : (e = (a + " " + A.join(d + " ") + d).split(" "), i(e, b, c))
    }

    function k() {
        o.input = function (c) {
            for (var d = 0, e = c.length; e > d; d++)E[c[d]] = c[d]in u;
            return E.list && (E.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), E
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), o.inputtypes = function (a) {
            for (var d, e, f, g = 0, h = a.length; h > g; g++)u.setAttribute("type", e = a[g]), d = "text" !== u.type, d && (u.value = v, u.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(e) && u.style.WebkitAppearance !== c ? (q.appendChild(u), f = b.defaultView, d = f.getComputedStyle && "textfield" !== f.getComputedStyle(u, null).WebkitAppearance && 0 !== u.offsetHeight, q.removeChild(u)) : /^(search|tel)$/.test(e) || (d = /^(url|email)$/.test(e) ? u.checkValidity && u.checkValidity() === !1 : u.value != v)), D[a[g]] = !!d;
            return D
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }

    var l, m, n = "2.6.1", o = {}, p = !0, q = b.documentElement, r = "modernizr", s = b.createElement(r), t = s.style, u = b.createElement("input"), v = ":)", w = {}.toString, x = " -webkit- -moz- -o- -ms- ".split(" "), y = "Webkit Moz O ms", z = y.split(" "), A = y.toLowerCase().split(" "), B = {svg: "http://www.w3.org/2000/svg"}, C = {}, D = {}, E = {}, F = [], G = F.slice, H = function (a, c, d, e) {
        var f, g, h, i = b.createElement("div"), j = b.body, k = j ? j : b.createElement("body");
        if (parseInt(d, 10))for (; d--;)h = b.createElement("div"), h.id = e ? e[d] : r + (d + 1), i.appendChild(h);
        return f = ["&#173;", '<style id="s', r, '">', a, "</style>"].join(""), i.id = r, (j ? i : k).innerHTML += f, k.appendChild(i), j || (k.style.background = "", q.appendChild(k)), g = c(i, a), j ? i.parentNode.removeChild(i) : k.parentNode.removeChild(k), !!g
    }, I = function (b) {
        var c = a.matchMedia || a.msMatchMedia;
        if (c)return c(b).matches;
        var d;
        return H("@media " + b + " { #" + r + " { position: absolute; } }", function (b) {
            d = "absolute" == (a.getComputedStyle ? getComputedStyle(b, null) : b.currentStyle).position
        }), d
    }, J = function () {
        function a(a, e) {
            e = e || b.createElement(d[a] || "div"), a = "on" + a;
            var g = a in e;
            return g || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(a, ""), g = f(e[a], "function"), f(e[a], "undefined") || (e[a] = c), e.removeAttribute(a))), e = null, g
        }

        var d = {select: "input", change: "input", submit: "form", reset: "form", error: "img", load: "img", abort: "img"};
        return a
    }(), K = {}.hasOwnProperty;
    m = f(K, "undefined") || f(K.call, "undefined") ? function (a, b) {
        return b in a && f(a.constructor.prototype[b], "undefined")
    } : function (a, b) {
        return K.call(a, b)
    }, Function.prototype.bind || (Function.prototype.bind = function (a) {
        var b = this;
        if ("function" != typeof b)throw new TypeError;
        var c = G.call(arguments, 1), d = function () {
            if (this instanceof d) {
                var e = function () {
                };
                e.prototype = b.prototype;
                var f = new e, g = b.apply(f, c.concat(G.call(arguments)));
                return Object(g) === g ? g : f
            }
            return b.apply(a, c.concat(G.call(arguments)))
        };
        return d
    }), C.flexbox = function () {
        return j("flexWrap")
    }, C.canvas = function () {
        var a = b.createElement("canvas");
        return!!a.getContext && !!a.getContext("2d")
    }, C.canvastext = function () {
        return!!o.canvas && !!f(b.createElement("canvas").getContext("2d").fillText, "function")
    }, C.webgl = function () {
        return!!a.WebGLRenderingContext
    }, C.touch = function () {
        var c;
        return"ontouchstart"in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : H(["@media (", x.join("touch-enabled),("), r, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function (a) {
            c = 9 === a.offsetTop
        }), c
    }, C.geolocation = function () {
        return"geolocation"in navigator
    }, C.postmessage = function () {
        return!!a.postMessage
    }, C.websqldatabase = function () {
        return!!a.openDatabase
    }, C.indexedDB = function () {
        return!!j("indexedDB", a)
    }, C.hashchange = function () {
        return J("hashchange", a) && (b.documentMode === c || b.documentMode > 7)
    }, C.history = function () {
        return!!a.history && !!history.pushState
    }, C.draganddrop = function () {
        var a = b.createElement("div");
        return"draggable"in a || "ondragstart"in a && "ondrop"in a
    }, C.websockets = function () {
        return"WebSocket"in a || "MozWebSocket"in a
    }, C.rgba = function () {
        return d("background-color:rgba(150,255,150,.5)"), g(t.backgroundColor, "rgba")
    }, C.hsla = function () {
        return d("background-color:hsla(120,40%,100%,.5)"), g(t.backgroundColor, "rgba") || g(t.backgroundColor, "hsla")
    }, C.multiplebgs = function () {
        return d("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(t.background)
    }, C.backgroundsize = function () {
        return j("backgroundSize")
    }, C.borderimage = function () {
        return j("borderImage")
    }, C.borderradius = function () {
        return j("borderRadius")
    }, C.boxshadow = function () {
        return j("boxShadow")
    }, C.textshadow = function () {
        return"" === b.createElement("div").style.textShadow
    }, C.opacity = function () {
        return e("opacity:.55"), /^0.55$/.test(t.opacity)
    }, C.cssanimations = function () {
        return j("animationName")
    }, C.csscolumns = function () {
        return j("columnCount")
    }, C.cssgradients = function () {
        var a = "background-image:", b = "gradient(linear,left top,right bottom,from(#9f9),to(white));", c = "linear-gradient(left top,#9f9, white);";
        return d((a + "-webkit- ".split(" ").join(b + a) + x.join(c + a)).slice(0, -a.length)), g(t.backgroundImage, "gradient")
    }, C.cssreflections = function () {
        return j("boxReflect")
    }, C.csstransforms = function () {
        return!!j("transform")
    }, C.csstransforms3d = function () {
        var a = !!j("perspective");
        return a && "webkitPerspective"in q.style && H("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function (b) {
            a = 9 === b.offsetLeft && 3 === b.offsetHeight
        }), a
    }, C.csstransitions = function () {
        return j("transition")
    }, C.fontface = function () {
        var a;
        return H('@font-face {font-family:"font";src:url("https://")}', function (c, d) {
            var e = b.getElementById("smodernizr"), f = e.sheet || e.styleSheet, g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
            a = /src/i.test(g) && 0 === g.indexOf(d.split(" ")[0])
        }), a
    }, C.generatedcontent = function () {
        var a;
        return H(['#modernizr:after{content:"', v, '";visibility:hidden}'].join(""), function (b) {
            a = b.offsetHeight >= 1
        }), a
    }, C.video = function () {
        var a = b.createElement("video"), c = !1;
        try {
            (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
        } catch (d) {
        }
        return c
    }, C.audio = function () {
        var a = b.createElement("audio"), c = !1;
        try {
            (c = !!a.canPlayType) && (c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (d) {
        }
        return c
    }, C.localstorage = function () {
        try {
            return localStorage.setItem(r, r), localStorage.removeItem(r), !0
        } catch (a) {
            return!1
        }
    }, C.sessionstorage = function () {
        try {
            return sessionStorage.setItem(r, r), sessionStorage.removeItem(r), !0
        } catch (a) {
            return!1
        }
    }, C.webworkers = function () {
        return!!a.Worker
    }, C.applicationcache = function () {
        return!!a.applicationCache
    }, C.svg = function () {
        return!!b.createElementNS && !!b.createElementNS(B.svg, "svg").createSVGRect
    }, C.inlinesvg = function () {
        var a = b.createElement("div");
        return a.innerHTML = "<svg/>", (a.firstChild && a.firstChild.namespaceURI) == B.svg
    }, C.smil = function () {
        return!!b.createElementNS && /SVGAnimate/.test(w.call(b.createElementNS(B.svg, "animate")))
    }, C.svgclippaths = function () {
        return!!b.createElementNS && /SVGClipPath/.test(w.call(b.createElementNS(B.svg, "clipPath")))
    };
    for (var L in C)m(C, L) && (l = L.toLowerCase(), o[l] = C[L](), F.push((o[l] ? "" : "no-") + l));
    return o.input || k(), o.addTest = function (a, b) {
        if ("object" == typeof a)for (var d in a)m(a, d) && o.addTest(d, a[d]); else {
            if (a = a.toLowerCase(), o[a] !== c)return o;
            b = "function" == typeof b ? b() : b, p && (q.className += " " + (b ? "" : "no-") + a), o[a] = b
        }
        return o
    }, d(""), s = u = null, function (a, b) {
        function c(a, b) {
            var c = a.createElement("p"), d = a.getElementsByTagName("head")[0] || a.documentElement;
            return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
        }

        function d() {
            var a = r.elements;
            return"string" == typeof a ? a.split(" ") : a
        }

        function e(a) {
            var b = q[a[o]];
            return b || (b = {}, p++, a[o] = p, q[p] = b), b
        }

        function f(a, c, d) {
            if (c || (c = b), k)return c.createElement(a);
            d || (d = e(c));
            var f;
            return f = d.cache[a] ? d.cache[a].cloneNode() : n.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), f.canHaveChildren && !m.test(a) ? d.frag.appendChild(f) : f
        }

        function g(a, c) {
            if (a || (a = b), k)return a.createDocumentFragment();
            c = c || e(a);
            for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++)f.createElement(h[g]);
            return f
        }

        function h(a, b) {
            b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function (c) {
                return r.shivMethods ? f(c, a, b) : b.createElem(c)
            }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/\w+/g, function (a) {
                return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
            }) + ");return n}")(r, b.frag)
        }

        function i(a) {
            a || (a = b);
            var d = e(a);
            return r.shivCSS && !j && !d.hasCSS && (d.hasCSS = !!c(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), k || h(a, d), a
        }

        var j, k, l = a.html5 || {}, m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i, n = /^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i, o = "_html5shiv", p = 0, q = {};
        !function () {
            try {
                var a = b.createElement("a");
                a.innerHTML = "<xyz></xyz>", j = "hidden"in a, k = 1 == a.childNodes.length || function () {
                    b.createElement("a");
                    var a = b.createDocumentFragment();
                    return"undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
                }()
            } catch (c) {
                j = !0, k = !0
            }
        }();
        var r = {elements: l.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video", shivCSS: l.shivCSS !== !1, supportsUnknownElements: k, shivMethods: l.shivMethods !== !1, type: "default", shivDocument: i, createElement: f, createDocumentFragment: g};
        a.html5 = r, i(b)
    }(this, b), o._version = n, o._prefixes = x, o._domPrefixes = A, o._cssomPrefixes = z, o.mq = I, o.hasEvent = J, o.testProp = function (a) {
        return h([a])
    }, o.testAllProps = j, o.testStyles = H, o.prefixed = function (a, b, c) {
        return b ? j(a, b, c) : j(a, "pfx")
    }, q.className = q.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (p ? " js " + F.join(" ") : ""), o
}(this, this.document), function (a, b, c) {
    function d(a) {
        return"[object Function]" == q.call(a)
    }

    function e(a) {
        return"string" == typeof a
    }

    function f() {
    }

    function g(a) {
        return!a || "loaded" == a || "complete" == a || "uninitialized" == a
    }

    function h() {
        var a = r.shift();
        s = 1, a ? a.t ? o(function () {
            ("c" == a.t ? m.injectCss : m.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
        }, 0) : (a(), h()) : s = 0
    }

    function i(a, c, d, e, f, i, j) {
        function k(b) {
            if (!n && g(l.readyState) && (t.r = n = 1, !s && h(), l.onload = l.onreadystatechange = null, b)) {
                "img" != a && o(function () {
                    v.removeChild(l)
                }, 50);
                for (var d in A[c])A[c].hasOwnProperty(d) && A[c][d].onload()
            }
        }

        var j = j || m.errorTimeout, l = {}, n = 0, q = 0, t = {t: d, s: c, e: f, a: i, x: j};
        1 === A[c] && (q = 1, A[c] = [], l = b.createElement(a)), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function () {
            k.call(this, q)
        }, r.splice(e, 0, t), "img" != a && (q || 2 === A[c] ? (v.insertBefore(l, u ? null : p), o(k, j)) : A[c].push(l))
    }

    function j(a, b, c, d, f) {
        return s = 0, b = b || "j", e(a) ? i("c" == b ? x : w, a, b, this.i++, c, d, f) : (r.splice(this.i++, 0, a), 1 == r.length && h()), this
    }

    function k() {
        var a = m;
        return a.loader = {load: j, i: 0}, a
    }

    var l, m, n = b.documentElement, o = a.setTimeout, p = b.getElementsByTagName("script")[0], q = {}.toString, r = [], s = 0, t = "MozAppearance"in n.style, u = t && !!b.createRange().compareNode, v = u ? n : p.parentNode, n = a.opera && "[object Opera]" == q.call(a.opera), n = !!b.attachEvent && !n, w = t ? "object" : n ? "script" : "img", x = n ? "script" : w, y = Array.isArray || function (a) {
        return"[object Array]" == q.call(a)
    }, z = [], A = {}, B = {timeout: function (a, b) {
        return b.length && (a.timeout = b[0]), a
    }};
    m = function (a) {
        function b(a) {
            var b, c, d, a = a.split("!"), e = z.length, f = a.pop(), g = a.length, f = {url: f, origUrl: f, prefixes: a};
            for (c = 0; g > c; c++)d = a[c].split("="), (b = B[d.shift()]) && (f = b(f, d));
            for (c = 0; e > c; c++)f = z[c](f);
            return f
        }

        function g(a, e, f, g, i) {
            var j = b(a), l = j.autoCallback;
            j.url.split(".").pop().split("?").shift(), j.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]] || h), j.instead ? j.instead(a, e, f, g, i) : (A[j.url] ? j.noexec = !0 : A[j.url] = 1, f.load(j.url, j.forceCSS || !j.forceJS && "css" == j.url.split(".").pop().split("?").shift() ? "c" : c, j.noexec, j.attrs, j.timeout), (d(e) || d(l)) && f.load(function () {
                k(), e && e(j.origUrl, i, g), l && l(j.origUrl, i, g), A[j.url] = 2
            })))
        }

        function i(a, b) {
            function c(a, c) {
                if (a) {
                    if (e(a))c || (l = function () {
                        var a = [].slice.call(arguments);
                        m.apply(this, a), n()
                    }), g(a, l, b, 0, j); else if (Object(a) === a)for (i in h = function () {
                        var b, c = 0;
                        for (b in a)a.hasOwnProperty(b) && c++;
                        return c
                    }(), a)a.hasOwnProperty(i) && (!c && !--h && (d(l) ? l = function () {
                        var a = [].slice.call(arguments);
                        m.apply(this, a), n()
                    } : l[i] = function (a) {
                        return function () {
                            var b = [].slice.call(arguments);
                            a && a.apply(this, b), n()
                        }
                    }(m[i])), g(a[i], l, b, i, j))
                } else!c && n()
            }

            var h, i, j = !!a.test, k = a.load || a.both, l = a.callback || f, m = l, n = a.complete || f;
            c(j ? a.yep : a.nope, !!k), k && c(k)
        }

        var j, l, n = this.yepnope.loader;
        if (e(a))g(a, 0, n, 0); else if (y(a))for (j = 0; j < a.length; j++)l = a[j], e(l) ? g(l, 0, n, 0) : y(l) ? m(l) : Object(l) === l && i(l, n); else Object(a) === a && i(a, n)
    }, m.addPrefix = function (a, b) {
        B[a] = b
    }, m.addFilter = function (a) {
        z.push(a)
    }, m.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", l = function () {
        b.removeEventListener("DOMContentLoaded", l, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function (a, c, d, e, i, j) {
        var k, l, n = b.createElement("script"), e = e || m.errorTimeout;
        n.src = a;
        for (l in d)n.setAttribute(l, d[l]);
        c = j ? h : c || f, n.onreadystatechange = n.onload = function () {
            !k && g(n.readyState) && (k = 1, c(), n.onload = n.onreadystatechange = null)
        }, o(function () {
            k || (k = 1, c(1))
        }, e), i ? n.onload() : p.parentNode.insertBefore(n, p)
    }, a.yepnope.injectCss = function (a, c, d, e, g, i) {
        var j, e = b.createElement("link"), c = i ? h : c || f;
        e.href = a, e.rel = "stylesheet", e.type = "text/css";
        for (j in d)e.setAttribute(j, d[j]);
        g || (p.parentNode.insertBefore(e, p), o(c, 0))
    }
}(this, document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
}, define("modernizr", function (a) {
    return function () {
        var b;
        return b || a.Modernizr
    }
}(this));
var saveAs = saveAs || navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function (a) {
    var b = a.document, c = function () {
        return a.URL || a.webkitURL || a
    }, d = a.URL || a.webkitURL || a, e = b.createElementNS("http://www.w3.org/1999/xhtml", "a"), f = !a.externalHost && "download"in e, g = function (c) {
        var d = b.createEvent("MouseEvents");
        d.initMouseEvent("click", !0, !1, a, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), c.dispatchEvent(d)
    }, h = a.webkitRequestFileSystem, i = a.requestFileSystem || h || a.mozRequestFileSystem, j = function (b) {
        (a.setImmediate || a.setTimeout)(function () {
            throw b
        }, 0)
    }, k = "application/octet-stream", l = 0, m = [], n = function () {
        for (var a = m.length; a--;) {
            var b = m[a];
            "string" == typeof b ? d.revokeObjectURL(b) : b.remove()
        }
        m.length = 0
    }, o = function (a, b, c) {
        b = [].concat(b);
        for (var d = b.length; d--;) {
            var e = a["on" + b[d]];
            if ("function" == typeof e)try {
                e.call(a, c || a)
            } catch (f) {
                j(f)
            }
        }
    }, p = function (b, d) {
        var j, n, p, q = this, r = b.type, s = !1, t = function () {
            var a = c().createObjectURL(b);
            return m.push(a), a
        }, u = function () {
            o(q, "writestart progress write writeend".split(" "))
        }, v = function () {
            (s || !j) && (j = t(b)), n ? n.location.href = j : window.open(j, "_blank"), q.readyState = q.DONE, u()
        }, w = function (a) {
            return function () {
                return q.readyState !== q.DONE ? a.apply(this, arguments) : void 0
            }
        }, x = {create: !0, exclusive: !1};
        return q.readyState = q.INIT, d || (d = "download"), f ? (j = t(b), e.href = j, e.download = d, g(e), q.readyState = q.DONE, u(), void 0) : (a.chrome && r && r !== k && (p = b.slice || b.webkitSlice, b = p.call(b, 0, b.size, k), s = !0), h && "download" !== d && (d += ".download"), (r === k || h) && (n = a), i ? (l += b.size, i(a.TEMPORARY, l, w(function (a) {
            a.root.getDirectory("saved", x, w(function (a) {
                var c = function () {
                    a.getFile(d, x, w(function (a) {
                        a.createWriter(w(function (c) {
                            c.onwriteend = function (b) {
                                n.location.href = a.toURL(), m.push(a), q.readyState = q.DONE, o(q, "writeend", b)
                            }, c.onerror = function () {
                                var a = c.error;
                                a.code !== a.ABORT_ERR && v()
                            }, "writestart progress write abort".split(" ").forEach(function (a) {
                                c["on" + a] = q["on" + a]
                            }), c.write(b), q.abort = function () {
                                c.abort(), q.readyState = q.DONE
                            }, q.readyState = q.WRITING
                        }), v)
                    }), v)
                };
                a.getFile(d, {create: !1}, w(function (a) {
                    a.remove(), c()
                }), w(function (a) {
                    a.code === a.NOT_FOUND_ERR ? c() : v()
                }))
            }), v)
        }), v), void 0) : (v(), void 0))
    }, q = p.prototype, r = function (a, b) {
        return new p(a, b)
    };
    return q.abort = function () {
        var a = this;
        a.readyState = a.DONE, o(a, "abort")
    }, q.readyState = q.INIT = 0, q.WRITING = 1, q.DONE = 2, q.error = q.onwritestart = q.onprogress = q.onwrite = q.onabort = q.onerror = q.onwriteend = null, a.addEventListener("unload", n, !1), r
}(self);
define("filesaver", function () {
}), define("services/dashboard", ["angular", "jquery", "kbn", "underscore", "config", "moment", "modernizr", "filesaver"], function (a, b, c, d, e, f, g) {
    var h = a.module("kibana.services");
    h.service("dashboard", ["$routeParams", "$http", "$rootScope", "$injector", "$location", "$timeout", "ejsResource", "timer", "kbnIndex", "alertSrv", function (b, h, i, j, k, l, m, n, o, p) {
        var q, r, s = {title: "", style: "dark", editable: !0, failover: !1, panel_hints: !0, rows: [], pulldowns: [
            {type: "query"},
            {type: "filtering"}
        ], nav: [
            {type: "timepicker"}
        ], services: {}, loader: {save_gist: !1, save_elasticsearch: !0, save_local: !0, save_default: !0, save_temp: !0, save_temp_ttl_enable: !0, save_temp_ttl: "30d", load_gist: !1, load_elasticsearch: !0, load_elasticsearch_size: 20, load_local: !1, hide: !1}, index: {interval: "none", pattern: "_all", "default": "INDEX_MISSING"}, refresh: !1}, t = m(e.elasticsearch), u = /(^\d{5,}$)|(^[a-z0-9]{10,}$)|(gist.github.com(\/*.*)\/[a-z0-9]{5,}\/*$)/, v = this;
        this.current = d.clone(s), this.last = {}, this.availablePanels = [], i.$on("$routeChangeSuccess", function () {
            v.current = {}, v.indices = [], w()
        });
        var w = function () {
            if (d.isUndefined(b.kbnType) || d.isUndefined(b.kbnId))if (g.localstorage && !d.isUndefined(window.localStorage.dashboard) && "" !== window.localStorage.dashboard) {
                var a = JSON.parse(window.localStorage.dashboard);
                v.dash_load(a)
            } else v.file_load("default.json"); else {
                var c = b.kbnType, e = b.kbnId;
                switch (c) {
                    case"elasticsearch":
                        v.elasticsearch_load("dashboard", e);
                        break;
                    case"temp":
                        v.elasticsearch_load("temp", e);
                        break;
                    case"file":
                        v.file_load(e);
                        break;
                    case"script":
                        v.script_load(e);
                        break;
                    default:
                        v.file_load("default.json")
                }
            }
        };
        this.refresh = function () {
            if ("none" !== v.current.index.interval)if (q.idsByType("time").length > 0) {
                var a = q.timeRange("last");
                o.indices(a.from, a.to, v.current.index.pattern, v.current.index.interval).then(function (a) {
                    if (a.length > 0)v.indices = a; else {
                        if (!v.current.failover)return p.set("No results", "There were no results because no indices were found that match your selected time span", "info", 5e3), !1;
                        v.indices = [v.current.index.default]
                    }
                    i.$broadcast("refresh")
                })
            } else v.current.failover ? (v.indices = [v.current.index.default], i.$broadcast("refresh")) : p.set("No time filter", "Timestamped indices are configured without a failover. Waiting for time filter.", "info", 5e3); else v.indices = [v.current.index.default], i.$broadcast("refresh")
        };
        var x = function (a) {
            return d.defaults(a, s), d.defaults(a.index, s.index), d.defaults(a.loader, s.loader), a
        };
        this.dash_load = function (a) {
            return n.cancel_all(), a = x(a), "none" === a.index.interval && (v.indices = [a.index.default]), v.current = d.clone(a), r = j.get("querySrv"), q = j.get("filterSrv"), r.init(), q.init(), "none" !== a.index.interval && v.refresh(), a.refresh && v.set_interval(a.refresh), v.availablePanels = d.difference(e.panel_names, d.pluck(d.union(v.current.nav, v.current.pulldowns), "type")), !0
        }, this.gist_id = function (a) {
            return v.is_gist(a) ? a.match(u)[0].replace(/.*\//, "") : void 0
        }, this.is_gist = function (a) {
            return d.isUndefined(a) || "" === a || d.isNull(a.match(u)) ? !1 : a.match(u).length > 0 ? !0 : !1
        }, this.to_file = function () {
            var b = new Blob([a.toJson(v.current, !0)], {type: "application/json;charset=utf-8"});
            return window.saveAs(b, v.current.title + "-" + (new Date).getTime()), !0
        }, this.set_default = function (b) {
            return g.localstorage ? (window.localStorage.dashboard = a.toJson(b || v.current), k.path("/dashboard"), !0) : !1
        }, this.purge_default = function () {
            return g.localstorage ? (window.localStorage.dashboard = "", !0) : !1
        }, this.share_link = function (a, b, c) {
            return{location: window.location.href.replace(window.location.hash, ""), type: b, id: c, link: window.location.href.replace(window.location.hash, "") + "#dashboard/" + b + "/" + c, title: a}
        };
        var y = function (b, c) {
            var e;
            d.templateSettings = {interpolate: /\{\{(.+?)\}\}/g};
            var f = d.template(b), g = f({ARGS: c});
            try {
                e = a.fromJson(g)
            } catch (h) {
                e = !1
            }
            return e
        };
        this.file_load = function (a) {
            return h({url: "app/dashboards/" + a + "?" + (new Date).getTime(), method: "GET", transformResponse: function (a) {
                return y(a, b)
            }}).then(function (a) {
                return a ? (v.dash_load(x(a.data)), !0) : !1
            }, function () {
                return p.set("Error", "Could not load <i>dashboards/" + a + "</i>. Please make sure it exists", "error"), !1
            })
        }, this.elasticsearch_load = function (c, d) {
            return h({url: e.elasticsearch + "/" + e.kibana_index + "/" + c + "/" + d, method: "GET", transformResponse: function (c) {
                return y(a.fromJson(c)._source.dashboard, b)
            }}).error(function (a, b) {
                return 0 === b ? p.set("Error", "Could not contact Elasticsearch at " + e.elasticsearch + ". Please ensure that Elasticsearch is reachable from your system.", "error") : p.set("Error", "Could not find " + d + ". If you" + " are using a proxy, ensure it is configured correctly", "error"), !1
            }).success(function (a) {
                v.dash_load(a)
            })
        }, this.script_load = function (a) {
            return h({url: "app/dashboards/" + a, method: "GET", transformResponse: function (a) {
                var e = new Function("ARGS", "kbn", "_", "moment", "window", "document", "angular", "require", "define", "$", "jQuery", a);
                return e(b, c, d, f)
            }}).then(function (a) {
                return a ? (v.dash_load(x(a.data)), !0) : !1
            }, function () {
                return p.set("Error", "Could not load <i>scripts/" + a + "</i>. Please make sure it exists and returns a valid dashboard", "error"), !1
            })
        }, this.elasticsearch_save = function (b, c, f) {
            var g, h = d.clone(v.current);
            "dashboard" === b && (g = h.title = d.isUndefined(c) ? v.current.title : c);
            var i = t.Document(e.kibana_index, b, g).source({user: "guest", group: "guest", title: h.title, dashboard: a.toJson(h)});
            return i = "temp" === b && f ? i.ttl(f) : i, i.doIndex(function (a) {
                return"dashboard" === b && k.path("/dashboard/elasticsearch/" + c), a
            }, function () {
                return!1
            })
        }, this.elasticsearch_delete = function (a) {
            return t.Document(e.kibana_index, "dashboard", a).doDelete(function (a) {
                return a
            }, function () {
                return!1
            })
        }, this.elasticsearch_list = function (a, b) {
            var c = t.Request().indices(e.kibana_index).types("dashboard");
            return c.query(t.QueryStringQuery(a || "*")).size(b).doSearch(function (a) {
                return a
            }, function () {
                return!1
            })
        }, this.save_gist = function (b, c) {
            var e = d.clone(c || v.current);
            return e.title = b || v.current.title, h({url: "https://api.github.com/gists", method: "POST", data: {description: e.title, "public": !1, files: {"kibana-dashboard.json": {content: a.toJson(e, !0)}}}}).then(function (a) {
                return a.data.html_url
            }, function () {
                return!1
            })
        }, this.gist_list = function (a) {
            return h.jsonp("https://api.github.com/gists/" + a + "?callback=JSON_CALLBACK").then(function (a) {
                var b = [];
                return d.each(a.data.data.files, function (a) {
                    try {
                        var c = JSON.parse(a.content);
                        b.push(c)
                    } catch (d) {
                        return!1
                    }
                }), b
            }, function () {
                return!1
            })
        }, this.set_interval = function (a) {
            if (v.current.refresh = a, a) {
                var b = c.interval_to_ms(a);
                n.cancel(v.refresh_timer), v.refresh_timer = n.register(l(function () {
                    v.set_interval(a), v.refresh()
                }, b)), v.refresh()
            } else n.cancel(v.refresh_timer)
        }
    }])
}), define("services/fields", ["angular", "underscore", "config"], function (a, b, c) {
    var d = a.module("kibana.services");
    d.service("fields", ["dashboard", "$rootScope", "$http", "alertSrv", function (a, d, e, f) {
        var g = this;
        this.list = ["_type"], this.mapping = {}, d.$watch(function () {
            return a.indices
        }, function (a) {
            if (!b.isUndefined(a) && a.length) {
                var c = b.difference(a, b.keys(g.mapping));
                c.length > 0 ? g.map(c).then(function (a) {
                    g.mapping = b.extend(g.mapping, a), g.list = h(g.mapping)
                }) : g.list = h(b.pick(g.mapping, a))
            }
        });
        var h = function (a) {
            var c = [];
            return b.each(a, function (a) {
                b.each(a, function (a) {
                    c = b.without(b.union(c, b.keys(a)), "_all", "_source")
                })
            }), c
        };
        this.map = function (a) {
            var d = e({url: c.elasticsearch + "/" + a.join(",") + "/_mapping", method: "GET"}).error(function (b, d) {
                0 === d ? f.set("Error", "Could not contact Elasticsearch at " + c.elasticsearch + ". Please ensure that Elasticsearch is reachable from your system.", "error") : f.set("Error", "No index found at " + c.elasticsearch + "/" + a.join(",") + "/_mapping. Please create at least one index." + "If you're using a proxy ensure it is configured correctly.", "error")
            });
            return d.then(function (a) {
                var c = {};
                return b.each(a.data, function (a, d) {
                    c[d] = {}, b.each(a, function (a, b) {
                        c[d][b] = i(a)
                    })
                }), c
            })
        };
        var i = function (a, c) {
            var d = c ? c : "", e = c ? "." : "", f = {};
            for (var g in a)"multi_field" !== a[g].type ? "properties" === g ? b.extend(f, i(a[g], d)) : "object" == typeof a[g] ? b.extend(f, i(a[g], d + e + g)) : f[d] = a : f[g] = a[g].fields[g] || a[g];
            return f
        }
    }])
}), define("services/filterSrv", ["angular", "underscore", "config", "kbn"], function (a, b, c, d) {
    var e = a.module("kibana.services");
    e.service("filterSrv", ["dashboard", "ejsResource", "$rootScope", "$timeout", function (a, e, f, g) {
        a.current.services.filter = a.current.services.filter || {};
        var h = {idQueue: [], list: {}, ids: []}, i = e(c.elasticsearch), j = a.current.services.filter, k = this;
        this.init = function () {
            b.defaults(a.current.services.filter, h), k.list = a.current.services.filter.list, k.ids = a.current.services.filter.ids, j = a.current.services.filter
        }, this.set = function (c, d, e) {
            var h;
            if (b.defaults(c, {mandate: "must"}), c.active = !0, b.isUndefined(d))if (b.isUndefined(c.type))h = !1; else {
                var i = l(), j = {alias: "", id: i};
                b.defaults(c, j), k.list[i] = c, k.ids.push(i), h = i
            } else b.isUndefined(k.list[d]) ? h = !1 : (b.extend(k.list[d], c), h = d);
            return f.$$phase || f.$apply(), e !== !0 && g(function () {
                a.refresh()
            }, 0), f.$broadcast("filter"), h
        }, this.remove = function (c, d) {
            var e;
            return b.isUndefined(k.list[c]) ? e = !1 : (delete k.list[c], k.ids = a.current.services.filter.ids = b.without(k.ids, c), j.idQueue.unshift(c), j.idQueue.sort(function (a, b) {
                return a - b
            }), e = !0), f.$$phase || f.$apply(), d !== !0 && g(function () {
                a.refresh()
            }, 0), f.$broadcast("filter"), e
        }, this.removeByType = function (c, d) {
            var e = k.idsByType(c);
            return b.each(e, function (a) {
                k.remove(a, !0)
            }), d !== !0 && g(function () {
                a.refresh()
            }, 0), e
        }, this.getBoolFilter = function (a) {
            var c = i.BoolFilter().must(i.MatchAllFilter()), d = i.BoolFilter().must(i.MatchAllFilter());
            return b.each(a, function (a) {
                if (k.list[a].active)switch (k.list[a].mandate) {
                    case"mustNot":
                        c = c.mustNot(k.getEjsObj(a));
                        break;
                    case"either":
                        d = d.should(k.getEjsObj(a));
                        break;
                    default:
                        c = c.must(k.getEjsObj(a))
                }
            }), c.must(d)
        }, this.getEjsObj = function (a) {
            return k.toEjsObj(k.list[a])
        }, this.toEjsObj = function (a) {
            if (!a.active)return!1;
            switch (a.type) {
                case"time":
                    var c = i.RangeFilter(a.field).from(d.parseDate(a.from).valueOf());
                    return b.isUndefined(a.to) || (c = c.to(a.to.valueOf())), c;
                case"range":
                    return i.RangeFilter(a.field).from(a.from).to(a.to);
                case"querystring":
                    return i.QueryFilter(i.QueryStringQuery(a.query)).cache(!0);
                case"field":
                    return i.QueryFilter(i.FieldQuery(a.field, a.query)).cache(!0);
                case"terms":
                    return i.TermsFilter(a.field, a.value);
                case"exists":
                    return i.ExistsFilter(a.field);
                case"missing":
                    return i.MissingFilter(a.field);
                default:
                    return!1
            }
        }, this.getByType = function (a, c) {
            return b.pick(k.list, k.idsByType(a, c))
        }, this.idsByType = function (a, c) {
            var d = c ? {type: a} : {type: a, active: !0};
            return b.pluck(b.where(k.list, d), "id")
        }, this.timeField = function () {
            return b.pluck(k.getByType("time"), "field")
        }, this.timeRange = function (a) {
            var c = b.last(b.where(k.list, {type: "time", active: !0}));
            if (b.isUndefined(c))return!1;
            if (a === !1)return{from: c.from, to: c.to};
            var e = c.from, f = c.to || new Date;
            return{from: d.parseDate(e), to: d.parseDate(f)}
        };
        var l = function () {
            return j.idQueue.length > 0 ? j.idQueue.shift() : k.ids.length
        };
        k.init()
    }])
}), define("services/kbnIndex", ["angular", "underscore", "config", "moment"], function (a, b, c, d) {
    var e = a.module("kibana.services");
    e.service("kbnIndex", ["$http", "alertSrv", function (a, e) {
        function f() {
            var d = a({url: c.elasticsearch + "/_aliases", method: "GET"}).error(function (a, b) {
                0 === b ? e.set("Error", "Could not contact Elasticsearch at " + c.elasticsearch + ". Please ensure that Elasticsearch is reachable from your system.", "error") : e.set("Error", "Could not reach " + c.elasticsearch + "/_aliases. If you" + " are using a proxy, ensure it is configured correctly", "error")
            });
            return d.then(function (a) {
                var c = [];
                return b.each(a.data, function (a, d) {
                    c.push(d), b.each(a.aliases, function (a, b) {
                        c.push(b)
                    })
                }), c
            })
        }

        function g(a) {
            return a = d(a).clone().toDate(), d(new Date(a.getTime() + 6e4 * a.getTimezoneOffset()))
        }

        function h(a, c, e) {
            if (b.contains(["hour", "day", "week", "month", "year"], e)) {
                var f;
                for (a = d(a).clone(), f = []; a.isBefore(c);)switch (f.push(a.clone()), e) {
                    case"hour":
                        a.add("hours", 1);
                        break;
                    case"day":
                        a.add("days", 1);
                        break;
                    case"week":
                        a.add("weeks", 1);
                        break;
                    case"month":
                        a.add("months", 1);
                        break;
                    case"year":
                        a.add("years", 1)
                }
                return f.push(d(c).clone()), f
            }
            return!1
        }

        this.indices = function (a, c, d, e) {
            var i = [];
            return b.each(h(g(a), g(c), e), function (a) {
                i.push(a.format(d))
            }), f().then(function (a) {
                var c = b.intersection(i, a);
                return c.reverse(), c
            })
        }
    }])
}), define("services/querySrv", ["angular", "underscore", "config"], function (a, b, c) {
    var d = a.module("kibana.services");
    d.service("querySrv", ["dashboard", "ejsResource", function (a, d) {
        a.current.services.query = a.current.services.query || {}, b.defaults(a.current.services.query, {idQueue: [], list: {}, ids: []});
        var e = {query: "*", alias: "", pin: !1, type: "lucene"}, f = d(c.elasticsearch), g = a.current.services.query;
        this.colors = ["#7EB26D", "#EAB839", "#6ED0E0", "#EF843C", "#E24D42", "#1F78C1", "#BA43A9", "#705DA0", "#508642", "#CCA300", "#447EBC", "#C15C17", "#890F02", "#0A437C", "#6D1F62", "#584477", "#B7DBAB", "#F4D598", "#70DBED", "#F9BA8F", "#F29191", "#82B5D8", "#E5A8E2", "#AEA2E0", "#629E51", "#E5AC0E", "#64B0C8", "#E0752D", "#BF1B00", "#0A50A1", "#962D82", "#614D93", "#9AC48A", "#F2C96D", "#65C5DB", "#F9934E", "#EA6460", "#5195CE", "#D683CE", "#806EB7", "#3F6833", "#967302", "#2F575E", "#99440A", "#58140C", "#052B51", "#511749", "#3F2B5B", "#E0F9D7", "#FCEACA", "#CFFAFF", "#F9E2D2", "#FCE2DE", "#BADFF4", "#F9D9F9", "#DEDAF7"], this.queryTypes = [
            {name: "lucene", require: ">=0.17.0"},
            {name: "regex", require: ">=0.90.3"},
            {name: "derive", require: ">=2.0.0"}
        ];
        var h = this;
        this.init = function () {
            g = a.current.services.query, h.list = a.current.services.query.list, h.ids = a.current.services.query.ids, b.each(h.list, function (a, c) {
                b.defaults(a, e), a.color = a.color || j(c)
            }), 0 === h.ids.length && h.set({})
        }, this.set = function (a, c) {
            if (b.isUndefined(c)) {
                var d = a.id || i();
                return a.id = d, a.color = a.color || j(d), b.defaults(a, e), h.list[d] = a, h.ids.push(d), d
            }
            return b.isUndefined(h.list[c]) ? !1 : (b.extend(h.list[c], a), c)
        }, this.remove = function (c) {
            return b.isUndefined(h.list[c]) ? !1 : (delete h.list[c], h.ids = a.current.services.query.ids = b.without(h.ids, c), g.idQueue.unshift(c), g.idQueue.sort(function (a, b) {
                return a - b
            }), !0)
        }, this.getEjsObj = function (a) {
            return h.toEjsObj(h.list[a])
        }, this.toEjsObj = function (a) {
            switch (a.type) {
                case"lucene":
                    return f.QueryStringQuery(a.query || "*");
                case"regex":
                    return f.RegexpQuery("_all", a.query);
                default:
                    return b.isUndefined(a.query) ? !1 : f.QueryStringQuery(a.query || "*")
            }
        }, this.findQuery = function (a) {
            return b.findWhere(h.list, {query: a})
        }, this.idsByMode = function (a) {
            switch (a.mode) {
                case"all":
                    return h.ids;
                case"pinned":
                    return b.pluck(b.where(h.list, {pin: !0}), "id");
                case"unpinned":
                    return b.difference(h.ids, b.pluck(b.where(h.list, {pin: !0}), "id"));
                case"selected":
                    return b.intersection(h.ids, a.ids);
                default:
                    return h.ids
            }
        };
        var i = function () {
            return g.idQueue.length > 0 ? g.idQueue.shift() : h.ids.length
        }, j = function (a) {
            return h.colors[a % h.colors.length]
        };
        h.init()
    }])
}), define("services/timer", ["angular", "underscore"], function (a, b) {
    var c = a.module("kibana.services");
    c.service("timer", ["$timeout", function (a) {
        var c = [];
        this.register = function (a) {
            return c.push(a), a
        }, this.cancel = function (d) {
            c = b.without(c, d), a.cancel(d)
        }, this.cancel_all = function () {
            b.each(c, function (b) {
                a.cancel(b)
            }), c = []
        }
    }])
}), define("services/panelMove", ["angular", "underscore"], function (a, b) {
    var c = a.module("kibana.services");
    c.service("panelMove", ["dashboard", "$rootScope", function (a, c) {
        this.onStart = function () {
            a.panelDragging = !0, c.$apply()
        }, this.onOver = function () {
            c.$apply()
        }, this.onOut = function () {
            c.$apply()
        }, this.onDrop = function (e, f, g) {
            var h = g.draggableScope.$parent.$parent.row.panels, i = g.droppableScope.$parent.$parent.row.panels, j = g.dragSettings.index, k = g.dropSettings.index;
            h.splice(j, 1), b.isUndefined(i) || i.splice(k, 0, g.dragItem), a.panelDragging = !1, d(), c.$apply(), c.$broadcast("render")
        }, this.onStop = function () {
            a.panelDragging = !1, d(), c.$apply()
        };
        var d = function () {
            b.each(a.current.rows, function (a) {
                a.panels = b.without(a.panels, {}), a.panels = b.compact(a.panels)
            })
        }
    }])
}), define("services/esVersion", ["angular", "underscore", "config"], function (a, b, c) {
    var d = a.module("kibana.services");
    d.service("esVersion", ["$http", "alertSrv", function (a, d) {
        this.versions = [];
        var e = this;
        this.init = function () {
            f()
        };
        var f = function () {
            var f = a({url: c.elasticsearch + "/_nodes", method: "GET"}).error(function (a, b) {
                0 === b ? d.set("Error", "Could not contact Elasticsearch at " + c.elasticsearch + ". Please ensure that Elasticsearch is reachable from your system.", "error") : d.set("Error", "Could not reach " + c.elasticsearch + "/_nodes. If you" + " are using a proxy, ensure it is configured correctly", "error")
            });
            return f.then(function (a) {
                b.each(a.data.nodes, function (a) {
                    e.versions.push(a.version.split("-")[0])
                }), e.versions = g(b.uniq(e.versions))
            })
        };
        this.max = function () {
            return b.last(e.versions)
        }, this.min = function () {
            return b.first(e.versions)
        };
        var g = function (a) {
            for (var c = b.clone(a), d = []; d.length < a.length;) {
                var f = "0";
                b.each(c, function (a) {
                    e.compare(f, a) && (f = a)
                }), c = b.without(c, f), d.push(f)
            }
            return d.reverse()
        };
        this.is = function (a) {
            var b, c = a;
            return b = ">" === c.charAt(0) ? "=" === c.charAt(1) ? e.gte(c.slice(2)) : e.gt(c.slice(1)) : "<" === c.charAt(0) ? "=" === c.charAt(1) ? e.lte(c.slice(2)) : e.lt(c.slice(1)) : e.eq(c)
        }, this.eq = function (a) {
            return a === e.min() ? !0 : !1
        }, this.gt = function (a) {
            return a === e.min() ? !1 : e.gte(a)
        }, this.lt = function (a) {
            return a === e.max() ? !1 : e.lte(a)
        }, this.gte = function (a) {
            return e.compare(a, e.min())
        }, this.lte = function (a) {
            return e.compare(e.max(), a)
        }, this.compare = function (a, b) {
            var c, d = b.split("."), e = a.split(".");
            for (c = 0; c < d.length; ++c)d[c] = Number(d[c]);
            for (c = 0; c < e.length; ++c)e[c] = Number(e[c]);
            return 2 === d.length && (d[2] = 0), d[0] > e[0] ? !0 : d[0] < e[0] ? !1 : d[1] > e[1] ? !0 : d[1] < e[1] ? !1 : d[2] > e[2] ? !0 : d[2] < e[2] ? !1 : !0
        }, this.init()
    }])
}), define("services/all", ["./alertSrv", "./dashboard", "./fields", "./filterSrv", "./kbnIndex", "./querySrv", "./timer", "./panelMove", "./esVersion"], function () {
}), define("controllers/dash", ["angular", "config", "underscore", "services/all"], function (a, b, c) {
    var d = a.module("kibana.controllers");
    d.controller("DashCtrl", ["$scope", "$route", "ejsResource", "fields", "dashboard", "alertSrv", "panelMove", "esVersion", function (a, d, e, f, g, h, i, j) {
        a.requiredElasticSearchVersion = ">=0.20.5", a.editor = {index: 0}, a.panelMoveDrop = i.onDrop, a.panelMoveStart = i.onStart, a.panelMoveStop = i.onStop, a.panelMoveOver = i.onOver, a.panelMoveOut = i.onOut, a.init = function () {
            a.config = b, a._ = c, a.dashboard = g, a.dashAlerts = h, a.esVersion = j, h.clearAll(), a.fields = f, a.reset_row(), a.ejs = e(b.elasticsearch)
        }, a.isPanel = function (a) {
            return c.isNull(a) || c.isUndefined(a) || c.isUndefined(a.type) ? !1 : !0
        }, a.add_row = function (a, b) {
            a.rows.push(b)
        }, a.reset_row = function () {
            a.row = {title: "", height: "150px", editable: !0}
        }, a.row_style = function (a) {
            return{"min-height": a.collapse ? "5px" : a.height}
        }, a.edit_path = function (a) {
            return a ? "app/panels/" + a + "/editor.html" : !1
        }, a.setEditorTabs = function (b) {
            return a.editorTabs = ["General", "Panel"], c.isUndefined(b.editorTabs) || (a.editorTabs = c.union(a.editorTabs, c.pluck(b.editorTabs, "title"))), a.editorTabs
        }, a.parse_error = function (a) {
            var b = a.match("nested: (.*?);");
            return c.isNull(b) ? a : b[1]
        }, a.init()
    }])
}), define("controllers/dashLoader", ["angular", "underscore"], function (a, b) {
    var c = a.module("kibana.controllers");
    c.controller("dashLoader", ["$scope", "$http", "timer", "dashboard", "alertSrv", function (a, c, d, e, f) {
        a.loader = e.current.loader, a.init = function () {
            a.advancedLoad = !1, a.advancedSave = !1, a.gist_pattern = /(^\d{5,}$)|(^[a-z0-9]{10,}$)|(gist.github.com(\/*.*)\/[a-z0-9]{5,}\/*$)/, a.gist = a.gist || {}, a.elasticsearch = a.elasticsearch || {}
        }, a.showDropdown = function (a) {
            if (b.isUndefined(e.current.loader))return!0;
            var c = e.current.loader;
            return"load" === a ? c.load_elasticsearch || c.load_gist || c.load_local : "save" === a ? c.save_elasticsearch || c.save_gist || c.save_local || c.save_default : "share" === a ? c.save_temp : !1
        }, a.set_default = function () {
            e.set_default() ? f.set("Local Default Set", e.current.title + " has been set as your local default", "success", 5e3) : f.set("Incompatible Browser", "Sorry, your browser is too old for this feature", "error", 5e3)
        }, a.purge_default = function () {
            e.purge_default() ? f.set("Local Default Clear", "Your local default dashboard has been cleared", "success", 5e3) : f.set("Incompatible Browser", "Sorry, your browser is too old for this feature", "error", 5e3)
        }, a.elasticsearch_save = function (c, d) {
            e.elasticsearch_save(c, a.elasticsearch.title || e.current.title, a.loader.save_temp_ttl_enable ? d : !1).then(function (d) {
                b.isUndefined(d._id) ? f.set("Save failed", "Dashboard could not be saved to Elasticsearch", "error", 5e3) : (f.set("Dashboard Saved", 'This dashboard has been saved to Elasticsearch as "' + d._id + '"', "success", 5e3), "temp" === c && (a.share = e.share_link(e.current.title, "temp", d._id)))
            })
        }, a.elasticsearch_delete = function (c) {
            e.elasticsearch_delete(c).then(function (d) {
                if (b.isUndefined(d))f.set("Dashboard Not Deleted", "An error occurred deleting the dashboard", "error", 5e3); else if (d.found) {
                    f.set("Dashboard Deleted", c + " has been deleted", "success", 5e3);
                    var e = b.where(a.elasticsearch.dashboards, {_id: c})[0];
                    a.elasticsearch.dashboards = b.without(a.elasticsearch.dashboards, e)
                } else f.set("Dashboard Not Found", "Could not find " + c + " in Elasticsearch", "warning", 5e3)
            })
        }, a.elasticsearch_dblist = function (c) {
            e.elasticsearch_list(c, a.loader.load_elasticsearch_size).then(function (c) {
                b.isUndefined(c.hits) || (a.hits = c.hits.total, a.elasticsearch.dashboards = c.hits.hits)
            })
        }, a.save_gist = function () {
            e.save_gist(a.gist.title).then(function (c) {
                b.isUndefined(c) ? f.set("Save failed", "Gist could not be saved", "error", 5e3) : (a.gist.last = c, f.set("Gist saved", 'You will be able to access your exported dashboard file at <a href="' + c + '">' + c + "</a> in a moment", "success"))
            })
        }, a.gist_dblist = function (b) {
            e.gist_list(b).then(function (b) {
                b && b.length > 0 ? a.gist.files = b : f.set("Gist Failed", "Could not retrieve dashboard list from gist", "error", 5e3)
            })
        }
    }])
}), define("controllers/row", ["angular", "app", "underscore"], function (a, b, c) {
    var d = a.module("kibana.controllers");
    d.controller("RowCtrl", ["$scope", "$rootScope", "$timeout", "ejsResource", "querySrv", function (a, b, d, e, f) {
        var g = {title: "Row", height: "150px", collapse: !1, collapsable: !0, editable: !0, panels: [], notice: !1};
        c.defaults(a.row, g), a.init = function () {
            a.querySrv = f, a.reset_panel()
        }, a.toggle_row = function (b) {
            b.collapsable && (b.collapse = b.collapse ? !1 : !0, b.collapse ? b.notice = !1 : d(function () {
                a.$broadcast("render")
            }))
        }, a.rowSpan = function (b) {
            var d = c.filter(b.panels, function (b) {
                return a.isPanel(b)
            });
            return c.reduce(c.pluck(d, "span"), function (a, b) {
                return a + b
            }, 0)
        }, a.close_edit = function () {
            a.$broadcast("render")
        }, a.add_panel = function (b, c) {
            a.row.panels.push(c)
        }, a.reset_panel = function (b) {
            var c = 4, d = 12 - a.rowSpan(a.row);
            a.panel = {error: !1, span: c > d && d > 0 ? d : c, editable: !0, type: b}
        }, a.init()
    }])
}), define("controllers/pulldown", ["angular", "app", "underscore"], function (a, b, c) {
    var d = a.module("kibana.controllers");
    d.controller("PulldownCtrl", ["$scope", "$rootScope", "$timeout", "ejsResource", "querySrv", function (a, b, d, e, f) {
        var g = {collapse: !1, notice: !1, enable: !0};
        c.defaults(a.pulldown, g), a.init = function () {
            a.querySrv = f, a.panel = a.pulldown, a.row = a.pulldown
        }, a.toggle_pulldown = function (b) {
            b.collapse = b.collapse ? !1 : !0, b.collapse ? a.row.notice = !1 : d(function () {
                a.$broadcast("render")
            })
        }, a.init()
    }])
}), define("controllers/all", ["./dash", "./dashLoader", "./row", "./pulldown"], function () {
}), define("directives/addPanel", ["angular", "app", "underscore"], function (a, b, c) {
    a.module("kibana.directives").directive("addPanel", ["$compile", function (b) {
        return{restrict: "A", link: function (d, e) {
            d.$watch("panel.type", function () {
                var f = d.panel.type;
                d.reset_panel(f), c.isUndefined(d.panel.type) || (d.panel.loadingEditor = !0, d.require(["panels/" + d.panel.type + "/module"], function () {
                    var c = '<div ng-controller="' + d.panel.type + '" ng-include="\'app/partials/paneladd.html\'"></div>';
                    e.html(b(a.element(c))(d)), d.panel.loadingEditor = !1
                }))
            })
        }}
    }])
}), define("directives/arrayJoin", ["angular", "app", "underscore"], function (a, b, c) {
    a.module("kibana.directives").directive("arrayJoin", function () {
        return{restrict: "A", require: "ngModel", link: function (a, b, d, e) {
            function f(a) {
                return(a || "").split(",")
            }

            function g(a) {
                return c.isArray(a) ? (a || "").join(",") : a
            }

            e.$parsers.push(f), e.$formatters.push(g)
        }}
    })
}), define("directives/dashUpload", ["angular"], function (a) {
    var b = a.module("kibana.directives");
    b.directive("dashUpload", ["timer", "dashboard", "alertSrv", function (a, b, c) {
        return{restrict: "A", link: function (a) {
            function d(c) {
                for (var d, e = c.target.files, f = function () {
                    return function (c) {
                        b.dash_load(JSON.parse(c.target.result)), a.$apply()
                    }
                }, g = 0; d = e[g]; g++) {
                    var h = new FileReader;
                    h.onload = f(d), h.readAsText(d)
                }
            }

            window.File && window.FileReader && window.FileList && window.Blob ? document.getElementById("dashupload").addEventListener("change", d, !1) : c.set("Oops", "Sorry, the HTML5 File APIs are not fully supported in this browser.", "error")
        }}
    }])
}), define("directives/kibanaPanel", ["angular"], function (a) {
    a.module("kibana.directives").directive("kibanaPanel", ["$compile", function (a) {
        var b = '<div class="panelCont"></div>', c = '<div class="row-fluid panel-extra"><div class="panel-extra-container"><span class="extra row-button" ng-hide="panel.draggable == false"><span class="row-text pointer" bs-tooltip="\'Drag here to move\'"data-drag=true data-jqyoui-options="{revert: \'invalid\',helper:\'clone\'}" jqyoui-draggable="{animate:false,mutate:false,index:{{$index}},onStart:\'panelMoveStart\',onStop:\'panelMoveStop\'}"  ng-model="row.panels">{{panel.type}}</span></span><span class="extra row-button" ng-show="panel.draggable == false"><span class="row-text">{{panel.type}}</span></span><span class="extra row-button" ng-show="panel.editable != false"><span confirm-click="row.panels = _.without(row.panels,panel)" confirmation="Are you sure you want to remove this {{panel.type}} panel?" class="pointer"><i class="icon-remove pointer" bs-tooltip="\'Remove\'"></i></span></span><span class="row-button extra" ng-show="panel.editable != false"><span bs-modal="\'app/partials/paneleditor.html\'" class="pointer"><i class="icon-cog pointer" bs-tooltip="\'Configure\'"></i></span></span><span ng-repeat="task in panelMeta.modals" class="row-button extra" ng-show="task.show"><span bs-modal="task.partial" class="pointer"><i bs-tooltip="task.description" ng-class="task.icon" class="pointer"></i></span></span><span class="row-button extra" ng-show="panelMeta.loading == true"><span><i class="icon-spinner icon-spin icon-large"></i></span></span><span class="row-button row-text panel-title" ng-show="panel.title">{{panel.title}}</span></div></div>';
        return{restrict: "E", link: function (d, e, f) {
            function g(c) {
                c.appendTo(e), e.wrap(b), a(e.contents())(d), e.removeClass("ng-cloak")
            }

            d.$watch(f.type, function (a) {
                e.addClass("ng-cloak"), d.require(["jquery", "text!panels/" + a + "/module.html"], function (b, e) {
                    var f = b(e), h = f.filter("ngcontroller, [ng-controller], .ng-controller");
                    h = h.add(f.find("ngcontroller, [ng-controller], .ng-controller")), h.length ? (h.first().prepend(c), d.require(["panels/" + a + "/module"], function () {
                        g(f)
                    })) : g(f)
                })
            })
        }}
    }])
}), define("directives/kibanaSimplePanel", ["angular", "underscore"], function (a, b) {
    a.module("kibana.directives").directive("kibanaSimplePanel", ["$compile", function (c) {
        var d = '<span ng-show="panelMeta.loading == true"><span style="font-size:72px;font-weight:200"><i class="icon-spinner icon-spin"></i> loading ...</span></span>';
        return{restrict: "E", link: function (e, f, g) {
            function h(a) {
                a.appendTo(f), c(f.contents())(e), f.removeClass("ng-cloak")
            }

            function i(a) {
                f.addClass("ng-cloak"), e.require(["jquery", "text!panels/" + a + "/module.html"], function (b, c) {
                    var f = b(c), g = f.filter("ngcontroller, [ng-controller], .ng-controller");
                    g = g.add(f.find("ngcontroller, [ng-controller], .ng-controller")), g.length ? (g.first().prepend(d), e.require(["panels/" + a + "/module"], function () {
                        h(f)
                    })) : h(f)
                })
            }

            e.$watch(g.type, function (a) {
                i(a)
            }), e.$watch(g.panel, function (c) {
                b.isUndefined(c) || (e = e.$new(), e.panel = a.fromJson(c))
            })
        }}
    }])
}), define("directives/ngBlur", ["angular"], function (a) {
    a.module("kibana.directives").directive("ngBlur", ["$parse", function (a) {
        return function (b, c, d) {
            var e = a(d.ngBlur);
            c.bind("blur", function (a) {
                b.$apply(function () {
                    e(b, {$event: a})
                })
            })
        }
    }])
}), define("directives/ngModelOnBlur", ["angular"], function (a) {
    a.module("kibana.directives").directive("ngModelOnblur", function () {
        return{restrict: "A", require: "ngModel", link: function (a, b, c, d) {
            "radio" !== c.type && "checkbox" !== c.type && (b.unbind("input").unbind("keydown").unbind("change"), b.bind("blur", function () {
                a.$apply(function () {
                    d.$setViewValue(b.val())
                })
            }))
        }}
    })
}), define("directives/tip", ["angular", "kbn"], function (a, b) {
    a.module("kibana.directives").directive("tip", ["$compile", function (c) {
        return{restrict: "E", link: function (d, e, f) {
            var g = '<i class="icon-' + (f.icon || "question-sign") + '" bs-tooltip="\'' + b.addslashes(e.text()) + "'\"></i>";
            e.replaceWith(c(a.element(g))(d))
        }}
    }])
}), define("directives/confirmClick", ["angular", "kbn"], function (a) {
    var b = a.module("kibana.directives");
    b.directive("confirmClick", function () {
        return{restrict: "A", link: function (a, b, c) {
            b.bind("click", function () {
                var b = c.confirmation || "Are you sure you want to do that?";
                if (window.confirm(b)) {
                    var d = c.confirmClick;
                    d && a.$apply(a.$eval(d))
                }
            })
        }}
    })
}), define("directives/esVersion", ["angular", "app"], function (a) {
    a.module("kibana.directives").directive("esVersion", ["esVersion", function (a) {
        return{restrict: "A", link: function (b, c, d) {
            a.is(d.esVersion) || (console.log("hiding"), c.hide())
        }}
    }])
}), define("directives/all", ["./addPanel", "./arrayJoin", "./dashUpload", "./kibanaPanel", "./kibanaSimplePanel", "./ngBlur", "./ngModelOnBlur", "./tip", "./confirmClick", "./esVersion"], function () {
}), define("filters/all", ["angular", "jquery", "underscore", "moment"], function (a, b, c, d) {
    var e = a.module("kibana.filters");
    e.filter("stringSort", function () {
        return function (a) {
            return a.sort()
        }
    }), e.filter("pinnedQuery", ["querySrv", function (a) {
        return function (b, d) {
            var e = c.filter(a.ids, function (b) {
                var e = a.list[b];
                return c.isUndefined(e.pin) || e.pin !== !0 || d !== !0 ? !c.isUndefined(e.pin) && e.pin !== !1 || d !== !1 ? void 0 : !0 : !0
            });
            return e
        }
    }]), e.filter("esVersion", ["esVersion", function (a) {
        return function (b, d) {
            var e = c.filter(b, function (b) {
                return a.is(b[d]) ? !0 : !1
            });
            return e
        }
    }]), e.filter("slice", function () {
        return function (a, b, d) {
            return c.isUndefined(a) ? void 0 : a.slice(b, d)
        }
    }), e.filter("stringify", function () {
        return function (b) {
            return c.isObject(b) && !c.isArray(b) ? a.toJson(b) : c.isNull(b) ? null : b.toString()
        }
    }), e.filter("moment", function () {
        return function (a, b) {
            switch (b) {
                case"ago":
                    return d(a).fromNow()
            }
            return d(a).fromNow()
        }
    }), e.filter("noXml", function () {
        var a = function (a) {
            return c.isString(a) ? a.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;") : a
        };
        return function (b) {
            return c.isArray(b) ? c.map(b, a) : a(b)
        }
    }), e.filter("urlLink", function () {
        var a = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim, b = /(^|[^\/])(www\.[\S]+(\b|$))/gim, d = /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim, e = function (e) {
            var f, g, h;
            return c.isString(e) ? (c.each(e.match(a), function () {
                f = e.replace(a, '<a href="$1" target="_blank">$1</a>')
            }), e = f || e, c.each(e.match(b), function () {
                g = e.replace(b, '$1<a href="http://$2" target="_blank">$2</a>')
            }), e = g || e, c.each(e.match(d), function () {
                h = e.replace(d, '<a href="mailto:$1">$1</a>')
            }), e = h || e) : e
        };
        return function (a) {
            return c.isArray(a) ? c.map(a, e) : e(a)
        }
    }), e.filter("gistid", function () {
        var a = /(\d{5,})|([a-z0-9]{10,})|(gist.github.com(\/*.*)\/[a-z0-9]{5,}\/*$)/;
        return function (b) {
            if (!c.isUndefined(b)) {
                var d = b.match(a);
                if (!c.isNull(d) && !c.isUndefined(d))return d[0].replace(/.*\//, "")
            }
        }
    })
}), define("app", ["angular", "jquery", "underscore", "require", "elasticjs", "bootstrap", "angular-sanitize", "angular-strap", "angular-dragdrop", "extend-jquery"], function (a, b, c, d) {
    var e = a.module("kibana", []), f = [], g = {};
    e.useModule = function (a) {
        return f ? f.push(a) : c.extend(a, g), a
    }, e.safeApply = function (a, b) {
        switch (a.$$phase) {
            case"$apply":
                a.$eval(b);
                break;
            case"$digest":
                setTimeout(function () {
                    e.safeApply(a, b)
                }, 10);
                break;
            default:
                a.$apply(b)
        }
    }, e.config(["$routeProvider", "$controllerProvider", "$compileProvider", "$filterProvider", "$provide", function (a, b, c, d, e) {
        a.when("/dashboard", {templateUrl: "app/partials/dashboard.html"}).when("/dashboard/:kbnType/:kbnId", {templateUrl: "app/partials/dashboard.html"}).when("/dashboard/:kbnType/:kbnId/:params", {templateUrl: "app/partials/dashboard.html"}).otherwise({redirectTo: "dashboard"}), g.controller = b.register, g.directive = c.directive, g.factory = e.factory, g.service = e.service, g.filter = d.register
    }]);
    var h = ["elasticjs.service", "$strap.directives", "ngSanitize", "ngDragDrop", "kibana"];
    return c.each("controllers directives factories services filters".split(" "), function (b) {
        var c = "kibana." + b;
        e.useModule(a.module(c, [])), h.push(c)
    }), e.panel_helpers = {partial: function (a) {
        return"app/partials/" + a + ".html"
    }}, require(["controllers/all", "directives/all", "filters/all"], function () {
        a.element(document).ready(function () {
            b("body").attr("ng-controller", "DashCtrl"), a.bootstrap(document, h).invoke(["$rootScope", function (a) {
                c.each(f, function (a) {
                    c.extend(a, g)
                }), f = !1, a.requireContext = d, a.require = function (a, b) {
                    var d = this;
                    d.requireContext(a, function () {
                        var a = c.toArray(arguments);
                        d.$apply(function () {
                            b.apply(d, a)
                        })
                    })
                }
            }])
        })
    }), e
}), define("css", {load: function (a, b, c) {
    function d(a) {
        var b = document.getElementsByTagName("head")[0], c = document.createElement("link");
        c.href = a, c.rel = "stylesheet", c.type = "text/css", b.appendChild(c)
    }

    d(requirejs.toUrl(a)), c(!0)
}, pluginBuilder: "../vendor/require/css-build"}), define("text", ["module"], function (a) {
    var b, c, d, e, f, g = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"], h = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, i = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, j = "undefined" != typeof location && location.href, k = j && location.protocol && location.protocol.replace(/\:/, ""), l = j && location.hostname, m = j && (location.port || void 0), n = {}, o = a.config && a.config() || {};
    return b = {version: "2.0.10", strip: function (a) {
        if (a) {
            a = a.replace(h, "");
            var b = a.match(i);
            b && (a = b[1])
        } else a = "";
        return a
    }, jsEscape: function (a) {
        return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r").replace(/[\u2028]/g, "\\u2028").replace(/[\u2029]/g, "\\u2029")
    }, createXhr: o.createXhr || function () {
        var a, b, c;
        if ("undefined" != typeof XMLHttpRequest)return new XMLHttpRequest;
        if ("undefined" != typeof ActiveXObject)for (b = 0; 3 > b; b += 1) {
            c = g[b];
            try {
                a = new ActiveXObject(c)
            } catch (d) {
            }
            if (a) {
                g = [c];
                break
            }
        }
        return a
    }, parseName: function (a) {
        var b, c, d, e = !1, f = a.indexOf("."), g = 0 === a.indexOf("./") || 0 === a.indexOf("../");
        return-1 !== f && (!g || f > 1) ? (b = a.substring(0, f), c = a.substring(f + 1, a.length)) : b = a, d = c || b, f = d.indexOf("!"), -1 !== f && (e = "strip" === d.substring(f + 1), d = d.substring(0, f), c ? c = d : b = d), {moduleName: b, ext: c, strip: e}
    }, xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/, useXhr: function (a, c, d, e) {
        var f, g, h, i = b.xdRegExp.exec(a);
        return i ? (f = i[2], g = i[3], g = g.split(":"), h = g[1], g = g[0], !(f && f !== c || g && g.toLowerCase() !== d.toLowerCase() || (h || g) && h !== e)) : !0
    }, finishLoad: function (a, c, d, e) {
        d = c ? b.strip(d) : d, o.isBuild && (n[a] = d), e(d)
    }, load: function (a, c, d, e) {
        if (e.isBuild && !e.inlineText)return d(), void 0;
        o.isBuild = e.isBuild;
        var f = b.parseName(a), g = f.moduleName + (f.ext ? "." + f.ext : ""), h = c.toUrl(g), i = o.useXhr || b.useXhr;
        return 0 === h.indexOf("empty:") ? (d(), void 0) : (!j || i(h, k, l, m) ? b.get(h, function (c) {
            b.finishLoad(a, f.strip, c, d)
        }, function (a) {
            d.error && d.error(a)
        }) : c([g], function (a) {
            b.finishLoad(f.moduleName + "." + f.ext, f.strip, a, d)
        }), void 0)
    }, write: function (a, c, d) {
        if (n.hasOwnProperty(c)) {
            var e = b.jsEscape(n[c]);
            d.asModule(a + "!" + c, "define(function () { return '" + e + "';});\n")
        }
    }, writeFile: function (a, c, d, e, f) {
        var g = b.parseName(c), h = g.ext ? "." + g.ext : "", i = g.moduleName + h, j = d.toUrl(g.moduleName + h) + ".js";
        b.load(i, d, function () {
            var c = function (a) {
                return e(j, a)
            };
            c.asModule = function (a, b) {
                return e.asModule(a, j, b)
            }, b.write(a, i, c, f)
        }, f)
    }}, "node" === o.env || !o.env && "undefined" != typeof process && process.versions && process.versions.node && !process.versions["node-webkit"] ? (c = require.nodeRequire("fs"), b.get = function (a, b, d) {
        try {
            var e = c.readFileSync(a, "utf8");
            0 === e.indexOf("﻿") && (e = e.substring(1)), b(e)
        } catch (f) {
            d(f)
        }
    }) : "xhr" === o.env || !o.env && b.createXhr() ? b.get = function (a, c, d, e) {
        var f, g = b.createXhr();
        if (g.open("GET", a, !0), e)for (f in e)e.hasOwnProperty(f) && g.setRequestHeader(f.toLowerCase(), e[f]);
        o.onXhr && o.onXhr(g, a), g.onreadystatechange = function () {
            var b, e;
            4 === g.readyState && (b = g.status, b > 399 && 600 > b ? (e = new Error(a + " HTTP status: " + b), e.xhr = g, d(e)) : c(g.responseText), o.onXhrComplete && o.onXhrComplete(g, a))
        }, g.send(null)
    } : "rhino" === o.env || !o.env && "undefined" != typeof Packages && "undefined" != typeof java ? b.get = function (a, b) {
        var c, d, e = "utf-8", f = new java.io.File(a), g = java.lang.System.getProperty("line.separator"), h = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(f), e)), i = "";
        try {
            for (c = new java.lang.StringBuffer, d = h.readLine(), d && d.length() && 65279 === d.charAt(0) && (d = d.substring(1)), null !== d && c.append(d); null !== (d = h.readLine());)c.append(g), c.append(d);
            i = String(c.toString())
        } finally {
            h.close()
        }
        b(i)
    } : ("xpconnect" === o.env || !o.env && "undefined" != typeof Components && Components.classes && Components.interfaces) && (d = Components.classes, e = Components.interfaces, Components.utils["import"]("resource://gre/modules/FileUtils.jsm"), f = "@mozilla.org/windows-registry-key;1"in d, b.get = function (a, b) {
        var c, g, h, i = {};
        f && (a = a.replace(/\//g, "\\")), h = new FileUtils.File(a);
        try {
            c = d["@mozilla.org/network/file-input-stream;1"].createInstance(e.nsIFileInputStream), c.init(h, 1, 0, !1), g = d["@mozilla.org/intl/converter-input-stream;1"].createInstance(e.nsIConverterInputStream), g.init(c, "utf-8", c.available(), e.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER), g.readString(c.available(), i), g.close(), c.close(), b(i.value)
        } catch (j) {
            throw new Error((h && h.path || "") + ": " + j)
        }
    }), b
}), function (a) {
    a.color = {}, a.color.make = function (b, c, d, e) {
        var f = {};
        return f.r = b || 0, f.g = c || 0, f.b = d || 0, f.a = null != e ? e : 1, f.add = function (a, b) {
            for (var c = 0; c < a.length; ++c)f[a.charAt(c)] += b;
            return f.normalize()
        }, f.scale = function (a, b) {
            for (var c = 0; c < a.length; ++c)f[a.charAt(c)] *= b;
            return f.normalize()
        }, f.toString = function () {
            return f.a >= 1 ? "rgb(" + [f.r, f.g, f.b].join(",") + ")" : "rgba(" + [f.r, f.g, f.b, f.a].join(",") + ")"
        }, f.normalize = function () {
            function a(a, b, c) {
                return a > b ? a : b > c ? c : b
            }

            return f.r = a(0, parseInt(f.r), 255), f.g = a(0, parseInt(f.g), 255), f.b = a(0, parseInt(f.b), 255), f.a = a(0, f.a, 1), f
        }, f.clone = function () {
            return a.color.make(f.r, f.b, f.g, f.a)
        }, f.normalize()
    }, a.color.extract = function (b, c) {
        var d;
        do {
            if (d = b.css(c).toLowerCase(), "" != d && "transparent" != d)break;
            b = b.parent()
        } while (!a.nodeName(b.get(0), "body"));
        return"rgba(0, 0, 0, 0)" == d && (d = "transparent"), a.color.parse(d)
    }, a.color.parse = function (c) {
        var d, e = a.color.make;
        if (d = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(c))return e(parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10));
        if (d = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(c))return e(parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10), parseFloat(d[4]));
        if (d = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(c))return e(2.55 * parseFloat(d[1]), 2.55 * parseFloat(d[2]), 2.55 * parseFloat(d[3]));
        if (d = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(c))return e(2.55 * parseFloat(d[1]), 2.55 * parseFloat(d[2]), 2.55 * parseFloat(d[3]), parseFloat(d[4]));
        if (d = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(c))return e(parseInt(d[1], 16), parseInt(d[2], 16), parseInt(d[3], 16));
        if (d = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(c))return e(parseInt(d[1] + d[1], 16), parseInt(d[2] + d[2], 16), parseInt(d[3] + d[3], 16));
        var f = a.trim(c).toLowerCase();
        return"transparent" == f ? e(255, 255, 255, 0) : (d = b[f] || [0, 0, 0], e(d[0], d[1], d[2]))
    };
    var b = {aqua: [0, 255, 255], azure: [240, 255, 255], beige: [245, 245, 220], black: [0, 0, 0], blue: [0, 0, 255], brown: [165, 42, 42], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgrey: [169, 169, 169], darkgreen: [0, 100, 0], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkviolet: [148, 0, 211], fuchsia: [255, 0, 255], gold: [255, 215, 0], green: [0, 128, 0], indigo: [75, 0, 130], khaki: [240, 230, 140], lightblue: [173, 216, 230], lightcyan: [224, 255, 255], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightyellow: [255, 255, 224], lime: [0, 255, 0], magenta: [255, 0, 255], maroon: [128, 0, 0], navy: [0, 0, 128], olive: [128, 128, 0], orange: [255, 165, 0], pink: [255, 192, 203], purple: [128, 0, 128], violet: [128, 0, 128], red: [255, 0, 0], silver: [192, 192, 192], white: [255, 255, 255], yellow: [255, 255, 0]}
}(jQuery), function (a) {
    function b(b, c) {
        var d = c.children("." + b)[0];
        if (null == d && (d = document.createElement("canvas"), d.className = b, a(d).css({direction: "ltr", position: "absolute", left: 0, top: 0}).appendTo(c), !d.getContext)) {
            if (!window.G_vmlCanvasManager)throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
            d = window.G_vmlCanvasManager.initElement(d)
        }
        this.element = d;
        var e = this.context = d.getContext("2d"), f = window.devicePixelRatio || 1, g = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
        this.pixelRatio = f / g, this.resize(c.width(), c.height()), this.textContainer = null, this.text = {}, this._textCache = {}
    }

    function c(c, e, f, g) {
        function h(a, b) {
            b = [qb].concat(b);
            for (var c = 0; c < a.length; ++c)a[c].apply(this, b)
        }

        function i() {
            for (var c = {Canvas: b}, d = 0; d < g.length; ++d) {
                var e = g[d];
                e.init(qb, c), e.options && a.extend(!0, eb, e.options)
            }
        }

        function j(b) {
            a.extend(!0, eb, b), b && b.colors && (eb.colors = b.colors), null == eb.xaxis.color && (eb.xaxis.color = a.color.parse(eb.grid.color).scale("a", .22).toString()), null == eb.yaxis.color && (eb.yaxis.color = a.color.parse(eb.grid.color).scale("a", .22).toString()), null == eb.xaxis.tickColor && (eb.xaxis.tickColor = eb.grid.tickColor || eb.xaxis.color), null == eb.yaxis.tickColor && (eb.yaxis.tickColor = eb.grid.tickColor || eb.yaxis.color), null == eb.grid.borderColor && (eb.grid.borderColor = eb.grid.color), null == eb.grid.tickColor && (eb.grid.tickColor = a.color.parse(eb.grid.color).scale("a", .22).toString());
            var d, e, f, g = {style: c.css("font-style"), size: Math.round(.8 * (+c.css("font-size").replace("px", "") || 13)), variant: c.css("font-variant"), weight: c.css("font-weight"), family: c.css("font-family")};
            for (g.lineHeight = 1.15 * g.size, f = eb.xaxes.length || 1, d = 0; f > d; ++d)e = eb.xaxes[d], e && !e.tickColor && (e.tickColor = e.color), e = a.extend(!0, {}, eb.xaxis, e), eb.xaxes[d] = e, e.font && (e.font = a.extend({}, g, e.font), e.font.color || (e.font.color = e.color));
            for (f = eb.yaxes.length || 1, d = 0; f > d; ++d)e = eb.yaxes[d], e && !e.tickColor && (e.tickColor = e.color), e = a.extend(!0, {}, eb.yaxis, e), eb.yaxes[d] = e, e.font && (e.font = a.extend({}, g, e.font), e.font.color || (e.font.color = e.color));
            for (eb.xaxis.noTicks && null == eb.xaxis.ticks && (eb.xaxis.ticks = eb.xaxis.noTicks), eb.yaxis.noTicks && null == eb.yaxis.ticks && (eb.yaxis.ticks = eb.yaxis.noTicks), eb.x2axis && (eb.xaxes[1] = a.extend(!0, {}, eb.xaxis, eb.x2axis), eb.xaxes[1].position = "top"), eb.y2axis && (eb.yaxes[1] = a.extend(!0, {}, eb.yaxis, eb.y2axis), eb.yaxes[1].position = "right"), eb.grid.coloredAreas && (eb.grid.markings = eb.grid.coloredAreas), eb.grid.coloredAreasColor && (eb.grid.markingsColor = eb.grid.coloredAreasColor), eb.lines && a.extend(!0, eb.series.lines, eb.lines), eb.points && a.extend(!0, eb.series.points, eb.points), eb.bars && a.extend(!0, eb.series.bars, eb.bars), null != eb.shadowSize && (eb.series.shadowSize = eb.shadowSize), null != eb.highlightColor && (eb.series.highlightColor = eb.highlightColor), d = 0; d < eb.xaxes.length; ++d)q(kb, d + 1).options = eb.xaxes[d];
            for (d = 0; d < eb.yaxes.length; ++d)q(lb, d + 1).options = eb.yaxes[d];
            for (var i in pb)eb.hooks[i] && eb.hooks[i].length && (pb[i] = pb[i].concat(eb.hooks[i]));
            h(pb.processOptions, [eb])
        }

        function k(a) {
            db = l(a), r(), s()
        }

        function l(b) {
            for (var c = [], d = 0; d < b.length; ++d) {
                var e = a.extend(!0, {}, eb.series);
                null != b[d].data ? (e.data = b[d].data, delete b[d].data, a.extend(!0, e, b[d]), b[d].data = e.data) : e.data = b[d], c.push(e)
            }
            return c
        }

        function m(a, b) {
            var c = a[b + "axis"];
            return"object" == typeof c && (c = c.n), "number" != typeof c && (c = 1), c
        }

        function n() {
            return a.grep(kb.concat(lb), function (a) {
                return a
            })
        }

        function o(a) {
            var b, c, d = {};
            for (b = 0; b < kb.length; ++b)c = kb[b], c && c.used && (d["x" + c.n] = c.c2p(a.left));
            for (b = 0; b < lb.length; ++b)c = lb[b], c && c.used && (d["y" + c.n] = c.c2p(a.top));
            return void 0 !== d.x1 && (d.x = d.x1), void 0 !== d.y1 && (d.y = d.y1), d
        }

        function p(a) {
            var b, c, d, e = {};
            for (b = 0; b < kb.length; ++b)if (c = kb[b], c && c.used && (d = "x" + c.n, null == a[d] && 1 == c.n && (d = "x"), null != a[d])) {
                e.left = c.p2c(a[d]);
                break
            }
            for (b = 0; b < lb.length; ++b)if (c = lb[b], c && c.used && (d = "y" + c.n, null == a[d] && 1 == c.n && (d = "y"), null != a[d])) {
                e.top = c.p2c(a[d]);
                break
            }
            return e
        }

        function q(b, c) {
            return b[c - 1] || (b[c - 1] = {n: c, direction: b == kb ? "x" : "y", options: a.extend(!0, {}, b == kb ? eb.xaxis : eb.yaxis)}), b[c - 1]
        }

        function r() {
            var b, c = db.length, d = -1;
            for (b = 0; b < db.length; ++b) {
                var e = db[b].color;
                null != e && (c--, "number" == typeof e && e > d && (d = e))
            }
            d >= c && (c = d + 1);
            var f, g = [], h = eb.colors, i = h.length, j = 0;
            for (b = 0; c > b; b++)f = a.color.parse(h[b % i] || "#666"), 0 == b % i && b && (j = j >= 0 ? .5 > j ? -j - .2 : 0 : -j), g[b] = f.scale("rgb", 1 + j);
            var k, l = 0;
            for (b = 0; b < db.length; ++b) {
                if (k = db[b], null == k.color ? (k.color = g[l].toString(), ++l) : "number" == typeof k.color && (k.color = g[k.color].toString()), null == k.lines.show) {
                    var n, o = !0;
                    for (n in k)if (k[n] && k[n].show) {
                        o = !1;
                        break
                    }
                    o && (k.lines.show = !0)
                }
                null == k.lines.zero && (k.lines.zero = !!k.lines.fill), k.xaxis = q(kb, m(k, "x")), k.yaxis = q(lb, m(k, "y"))
            }
        }

        function s() {
            function b(a, b, c) {
                b < a.datamin && b != -s && (a.datamin = b), c > a.datamax && c != s && (a.datamax = c)
            }

            var c, d, e, f, g, i, j, k, l, m, o, p, q = Number.POSITIVE_INFINITY, r = Number.NEGATIVE_INFINITY, s = Number.MAX_VALUE;
            for (a.each(n(), function (a, b) {
                b.datamin = q, b.datamax = r, b.used = !1
            }), c = 0; c < db.length; ++c)g = db[c], g.datapoints = {points: []}, h(pb.processRawData, [g, g.data, g.datapoints]);
            for (c = 0; c < db.length; ++c) {
                if (g = db[c], o = g.data, p = g.datapoints.format, !p) {
                    if (p = [], p.push({x: !0, number: !0, required: !0}), p.push({y: !0, number: !0, required: !0}), g.bars.show || g.lines.show && g.lines.fill) {
                        var t = !!(g.bars.show && g.bars.zero || g.lines.show && g.lines.zero);
                        p.push({y: !0, number: !0, required: !1, defaultValue: 0, autoscale: t}), g.bars.horizontal && (delete p[p.length - 1].y, p[p.length - 1].x = !0)
                    }
                    g.datapoints.format = p
                }
                if (null == g.datapoints.pointsize) {
                    g.datapoints.pointsize = p.length, j = g.datapoints.pointsize, i = g.datapoints.points;
                    var u = g.lines.show && g.lines.steps;
                    for (g.xaxis.used = g.yaxis.used = !0, d = e = 0; d < o.length; ++d, e += j) {
                        m = o[d];
                        var v = null == m;
                        if (!v)for (f = 0; j > f; ++f)k = m[f], l = p[f], l && (l.number && null != k && (k = +k, isNaN(k) ? k = null : 1 / 0 == k ? k = s : k == -1 / 0 && (k = -s)), null == k && (l.required && (v = !0), null != l.defaultValue && (k = l.defaultValue))), i[e + f] = k;
                        if (v)for (f = 0; j > f; ++f)k = i[e + f], null != k && (l = p[f], l.autoscale && (l.x && b(g.xaxis, k, k), l.y && b(g.yaxis, k, k))), i[e + f] = null; else if (u && e > 0 && null != i[e - j] && i[e - j] != i[e] && i[e - j + 1] != i[e + 1]) {
                            for (f = 0; j > f; ++f)i[e + j + f] = i[e + f];
                            i[e + 1] = i[e - j + 1], e += j
                        }
                    }
                }
            }
            for (c = 0; c < db.length; ++c)g = db[c], h(pb.processDatapoints, [g, g.datapoints]);
            for (c = 0; c < db.length; ++c) {
                g = db[c], i = g.datapoints.points, j = g.datapoints.pointsize, p = g.datapoints.format;
                var w = q, x = q, y = r, z = r;
                for (d = 0; d < i.length; d += j)if (null != i[d])for (f = 0; j > f; ++f)k = i[d + f], l = p[f], l && l.autoscale !== !1 && k != s && k != -s && (l.x && (w > k && (w = k), k > y && (y = k)), l.y && (x > k && (x = k), k > z && (z = k)));
                if (g.bars.show) {
                    var A;
                    switch (g.bars.align) {
                        case"left":
                            A = 0;
                            break;
                        case"right":
                            A = -g.bars.barWidth;
                            break;
                        case"center":
                            A = -g.bars.barWidth / 2;
                            break;
                        default:
                            throw new Error("Invalid bar alignment: " + g.bars.align)
                    }
                    g.bars.horizontal ? (x += A, z += A + g.bars.barWidth) : (w += A, y += A + g.bars.barWidth)
                }
                b(g.xaxis, w, y), b(g.yaxis, x, z)
            }
            a.each(n(), function (a, b) {
                b.datamin == q && (b.datamin = null), b.datamax == r && (b.datamax = null)
            })
        }

        function t() {
            c.css("padding", 0).children(":not(.flot-base,.flot-overlay)").remove(), "static" == c.css("position") && c.css("position", "relative"), fb = new b("flot-base", c), gb = new b("flot-overlay", c), ib = fb.context, jb = gb.context, hb = a(gb.element).unbind();
            var d = c.data("plot");
            d && (d.shutdown(), gb.clear()), c.data("plot", qb)
        }

        function u() {
            eb.grid.hoverable && (hb.mousemove(T), hb.bind("mouseleave", U)), eb.grid.clickable && hb.click(V), h(pb.bindEvents, [hb])
        }

        function v() {
            sb && clearTimeout(sb), hb.unbind("mousemove", T), hb.unbind("mouseleave", U), hb.unbind("click", V), h(pb.shutdown, [hb])
        }

        function w(a) {
            function b(a) {
                return a
            }

            var c, d, e = a.options.transform || b, f = a.options.inverseTransform;
            "x" == a.direction ? (c = a.scale = nb / Math.abs(e(a.max) - e(a.min)), d = Math.min(e(a.max), e(a.min))) : (c = a.scale = ob / Math.abs(e(a.max) - e(a.min)), c = -c, d = Math.max(e(a.max), e(a.min))), a.p2c = e == b ? function (a) {
                return(a - d) * c
            } : function (a) {
                return(e(a) - d) * c
            }, a.c2p = f ? function (a) {
                return f(d + a / c)
            } : function (a) {
                return d + a / c
            }
        }

        function x(a) {
            var b = a.options, c = a.ticks || [], d = b.labelWidth || 0, e = b.labelHeight || 0, f = d || "x" == a.direction ? Math.floor(fb.width / (c.length || 1)) : null;
            legacyStyles = a.direction + "Axis " + a.direction + a.n + "Axis", layer = "flot-" + a.direction + "-axis flot-" + a.direction + a.n + "-axis " + legacyStyles, font = b.font || "flot-tick-label tickLabel";
            for (var g = 0; g < c.length; ++g) {
                var h = c[g];
                if (h.label) {
                    var i = fb.getTextInfo(layer, h.label, font, null, f);
                    d = Math.max(d, i.width), e = Math.max(e, i.height)
                }
            }
            a.labelWidth = b.labelWidth || d, a.labelHeight = b.labelHeight || e
        }

        function y(b) {
            var c, d = b.labelWidth, e = b.labelHeight, f = b.options.position, g = b.options.tickLength, h = eb.grid.axisMargin, i = eb.grid.labelMargin, j = "x" == b.direction ? kb : lb, k = a.grep(j, function (a) {
                return a && a.options.position == f && a.reserveSpace
            });
            if (a.inArray(b, k) == k.length - 1 && (h = 0), null == g) {
                var l = a.grep(j, function (a) {
                    return a && a.reserveSpace
                });
                c = 0 == a.inArray(b, l), g = c ? "full" : 5
            }
            isNaN(+g) || (i += +g), "x" == b.direction ? (e += i, "bottom" == f ? (mb.bottom += e + h, b.box = {top: fb.height - mb.bottom, height: e}) : (b.box = {top: mb.top + h, height: e}, mb.top += e + h)) : (d += i, "left" == f ? (b.box = {left: mb.left + h, width: d}, mb.left += d + h) : (mb.right += d + h, b.box = {left: fb.width - mb.right, width: d})), b.position = f, b.tickLength = g, b.box.padding = i, b.innermost = c
        }

        function z(a) {
            "x" == a.direction ? (a.box.left = mb.left - a.labelWidth / 2, a.box.width = fb.width - mb.left - mb.right + a.labelWidth) : (a.box.top = mb.top - a.labelHeight / 2, a.box.height = fb.height - mb.bottom - mb.top + a.labelHeight)
        }

        function A() {
            var b, c = eb.grid.minBorderMargin, d = {x: 0, y: 0};
            if (null == c)for (c = 0, b = 0; b < db.length; ++b)c = Math.max(c, 2 * (db[b].points.radius + db[b].points.lineWidth / 2));
            d.x = d.y = Math.ceil(c), a.each(n(), function (a, b) {
                var c = b.direction;
                b.reserveSpace && (d[c] = Math.ceil(Math.max(d[c], ("x" == c ? b.labelWidth : b.labelHeight) / 2)))
            }), mb.left = Math.max(d.x, mb.left), mb.right = Math.max(d.x, mb.right), mb.top = Math.max(d.y, mb.top), mb.bottom = Math.max(d.y, mb.bottom)
        }

        function B() {
            var b, c = n(), d = eb.grid.show;
            for (var e in mb) {
                var f = eb.grid.margin || 0;
                mb[e] = "number" == typeof f ? f : f[e] || 0
            }
            h(pb.processOffset, [mb]);
            for (var e in mb)mb[e] += "object" == typeof eb.grid.borderWidth ? d ? eb.grid.borderWidth[e] : 0 : d ? eb.grid.borderWidth : 0;
            if (a.each(c, function (a, b) {
                b.show = b.options.show, null == b.show && (b.show = b.used), b.reserveSpace = b.show || b.options.reserveSpace, C(b)
            }), d) {
                var g = a.grep(c, function (a) {
                    return a.reserveSpace
                });
                for (a.each(g, function (a, b) {
                    D(b), E(b), F(b, b.ticks), x(b)
                }), b = g.length - 1; b >= 0; --b)y(g[b]);
                A(), a.each(g, function (a, b) {
                    z(b)
                })
            }
            nb = fb.width - mb.left - mb.right, ob = fb.height - mb.bottom - mb.top, a.each(c, function (a, b) {
                w(b)
            }), d && K(), R()
        }

        function C(a) {
            var b = a.options, c = +(null != b.min ? b.min : a.datamin), d = +(null != b.max ? b.max : a.datamax), e = d - c;
            if (0 == e) {
                var f = 0 == d ? 1 : .01;
                null == b.min && (c -= f), (null == b.max || null != b.min) && (d += f)
            } else {
                var g = b.autoscaleMargin;
                null != g && (null == b.min && (c -= e * g, 0 > c && null != a.datamin && a.datamin >= 0 && (c = 0)), null == b.max && (d += e * g, d > 0 && null != a.datamax && a.datamax <= 0 && (d = 0)))
            }
            a.min = c, a.max = d
        }

        function D(b) {
            var c, e = b.options;
            c = "number" == typeof e.ticks && e.ticks > 0 ? e.ticks : .3 * Math.sqrt("x" == b.direction ? fb.width : fb.height);
            var f = (b.max - b.min) / c, g = -Math.floor(Math.log(f) / Math.LN10), h = e.tickDecimals;
            null != h && g > h && (g = h);
            var i, j = Math.pow(10, -g), k = f / j;
            if (1.5 > k ? i = 1 : 3 > k ? (i = 2, k > 2.25 && (null == h || h >= g + 1) && (i = 2.5, ++g)) : i = 7.5 > k ? 5 : 10, i *= j, null != e.minTickSize && i < e.minTickSize && (i = e.minTickSize), b.delta = f, b.tickDecimals = Math.max(0, null != h ? h : g), b.tickSize = e.tickSize || i, "time" == e.mode && !b.tickGenerator)throw new Error("Time mode requires the flot.time plugin.");
            if (b.tickGenerator || (b.tickGenerator = function (a) {
                var b, c = [], e = d(a.min, a.tickSize), f = 0, g = Number.NaN;
                do b = g, g = e + f * a.tickSize, c.push(g), ++f; while (g < a.max && g != b);
                return c
            }, b.tickFormatter = function (a, b) {
                var c = b.tickDecimals ? Math.pow(10, b.tickDecimals) : 1, d = "" + Math.round(a * c) / c;
                if (null != b.tickDecimals) {
                    var e = d.indexOf("."), f = -1 == e ? 0 : d.length - e - 1;
                    if (f < b.tickDecimals)return(f ? d : d + ".") + ("" + c).substr(1, b.tickDecimals - f)
                }
                return d
            }), a.isFunction(e.tickFormatter) && (b.tickFormatter = function (a, b) {
                return"" + e.tickFormatter(a, b)
            }), null != e.alignTicksWithAxis) {
                var l = ("x" == b.direction ? kb : lb)[e.alignTicksWithAxis - 1];
                if (l && l.used && l != b) {
                    var m = b.tickGenerator(b);
                    if (m.length > 0 && (null == e.min && (b.min = Math.min(b.min, m[0])), null == e.max && m.length > 1 && (b.max = Math.max(b.max, m[m.length - 1]))), b.tickGenerator = function (a) {
                        var b, c, d = [];
                        for (c = 0; c < l.ticks.length; ++c)b = (l.ticks[c].v - l.min) / (l.max - l.min), b = a.min + b * (a.max - a.min), d.push(b);
                        return d
                    }, !b.mode && null == e.tickDecimals) {
                        var n = Math.max(0, -Math.floor(Math.log(b.delta) / Math.LN10) + 1), o = b.tickGenerator(b);
                        o.length > 1 && /\..*0$/.test((o[1] - o[0]).toFixed(n)) || (b.tickDecimals = n)
                    }
                }
            }
        }

        function E(b) {
            var c = b.options.ticks, d = [];
            null == c || "number" == typeof c && c > 0 ? d = b.tickGenerator(b) : c && (d = a.isFunction(c) ? c(b) : c);
            var e, f;
            for (b.ticks = [], e = 0; e < d.length; ++e) {
                var g = null, h = d[e];
                "object" == typeof h ? (f = +h[0], h.length > 1 && (g = h[1])) : f = +h, null == g && (g = b.tickFormatter(f, b)), isNaN(f) || b.ticks.push({v: f, label: g})
            }
        }

        function F(a, b) {
            a.options.autoscaleMargin && b.length > 0 && (null == a.options.min && (a.min = Math.min(a.min, b[0].v)), null == a.options.max && b.length > 1 && (a.max = Math.max(a.max, b[b.length - 1].v)))
        }

        function G() {
            fb.clear(), h(pb.drawBackground, [ib]);
            var a = eb.grid;
            a.show && a.backgroundColor && I(), a.show && !a.aboveData && J();
            for (var b = 0; b < db.length; ++b)h(pb.drawSeries, [ib, db[b]]), L(db[b]);
            h(pb.draw, [ib]), a.show && a.aboveData && J(), fb.render(), X()
        }

        function H(a, b) {
            for (var c, d, e, f, g = n(), h = 0; h < g.length; ++h)if (c = g[h], c.direction == b && (f = b + c.n + "axis", a[f] || 1 != c.n || (f = b + "axis"), a[f])) {
                d = a[f].from, e = a[f].to;
                break
            }
            if (a[f] || (c = "x" == b ? kb[0] : lb[0], d = a[b + "1"], e = a[b + "2"]), null != d && null != e && d > e) {
                var i = d;
                d = e, e = i
            }
            return{from: d, to: e, axis: c}
        }

        function I() {
            ib.save(), ib.translate(mb.left, mb.top), ib.fillStyle = cb(eb.grid.backgroundColor, ob, 0, "rgba(255, 255, 255, 0)"), ib.fillRect(0, 0, nb, ob), ib.restore()
        }

        function J() {
            var b, c, d, e;
            ib.save(), ib.translate(mb.left, mb.top);
            var f = eb.grid.markings;
            if (f)for (a.isFunction(f) && (c = qb.getAxes(), c.xmin = c.xaxis.min, c.xmax = c.xaxis.max, c.ymin = c.yaxis.min, c.ymax = c.yaxis.max, f = f(c)), b = 0; b < f.length; ++b) {
                var g = f[b], h = H(g, "x"), i = H(g, "y");
                null == h.from && (h.from = h.axis.min), null == h.to && (h.to = h.axis.max), null == i.from && (i.from = i.axis.min), null == i.to && (i.to = i.axis.max), h.to < h.axis.min || h.from > h.axis.max || i.to < i.axis.min || i.from > i.axis.max || (h.from = Math.max(h.from, h.axis.min), h.to = Math.min(h.to, h.axis.max), i.from = Math.max(i.from, i.axis.min), i.to = Math.min(i.to, i.axis.max), (h.from != h.to || i.from != i.to) && (h.from = h.axis.p2c(h.from), h.to = h.axis.p2c(h.to), i.from = i.axis.p2c(i.from), i.to = i.axis.p2c(i.to), h.from == h.to || i.from == i.to ? (ib.beginPath(), ib.strokeStyle = g.color || eb.grid.markingsColor, ib.lineWidth = g.lineWidth || eb.grid.markingsLineWidth, ib.moveTo(h.from, i.from), ib.lineTo(h.to, i.to), ib.stroke()) : (ib.fillStyle = g.color || eb.grid.markingsColor, ib.fillRect(h.from, i.to, h.to - h.from, i.from - i.to))))
            }
            c = n(), d = eb.grid.borderWidth;
            for (var j = 0; j < c.length; ++j) {
                var k, l, m, o, p = c[j], q = p.box, r = p.tickLength;
                if (p.show && 0 != p.ticks.length) {
                    for (ib.lineWidth = 1, "x" == p.direction ? (k = 0, l = "full" == r ? "top" == p.position ? 0 : ob : q.top - mb.top + ("top" == p.position ? q.height : 0)) : (l = 0, k = "full" == r ? "left" == p.position ? 0 : nb : q.left - mb.left + ("left" == p.position ? q.width : 0)), p.innermost || (ib.strokeStyle = p.options.color, ib.beginPath(), m = o = 0, "x" == p.direction ? m = nb + 1 : o = ob + 1, 1 == ib.lineWidth && ("x" == p.direction ? l = Math.floor(l) + .5 : k = Math.floor(k) + .5), ib.moveTo(k, l), ib.lineTo(k + m, l + o), ib.stroke()), ib.strokeStyle = p.options.tickColor, ib.beginPath(), b = 0; b < p.ticks.length; ++b) {
                        var s = p.ticks[b].v;
                        m = o = 0, isNaN(s) || s < p.min || s > p.max || "full" == r && ("object" == typeof d && d[p.position] > 0 || d > 0) && (s == p.min || s == p.max) || ("x" == p.direction ? (k = p.p2c(s), o = "full" == r ? -ob : r, "top" == p.position && (o = -o)) : (l = p.p2c(s), m = "full" == r ? -nb : r, "left" == p.position && (m = -m)), 1 == ib.lineWidth && ("x" == p.direction ? k = Math.floor(k) + .5 : l = Math.floor(l) + .5), ib.moveTo(k, l), ib.lineTo(k + m, l + o))
                    }
                    ib.stroke()
                }
            }
            d && (e = eb.grid.borderColor, "object" == typeof d || "object" == typeof e ? ("object" != typeof d && (d = {top: d, right: d, bottom: d, left: d}), "object" != typeof e && (e = {top: e, right: e, bottom: e, left: e}), d.top > 0 && (ib.strokeStyle = e.top, ib.lineWidth = d.top, ib.beginPath(), ib.moveTo(0 - d.left, 0 - d.top / 2), ib.lineTo(nb, 0 - d.top / 2), ib.stroke()), d.right > 0 && (ib.strokeStyle = e.right, ib.lineWidth = d.right, ib.beginPath(), ib.moveTo(nb + d.right / 2, 0 - d.top), ib.lineTo(nb + d.right / 2, ob), ib.stroke()), d.bottom > 0 && (ib.strokeStyle = e.bottom, ib.lineWidth = d.bottom, ib.beginPath(), ib.moveTo(nb + d.right, ob + d.bottom / 2), ib.lineTo(0, ob + d.bottom / 2), ib.stroke()), d.left > 0 && (ib.strokeStyle = e.left, ib.lineWidth = d.left, ib.beginPath(), ib.moveTo(0 - d.left / 2, ob + d.bottom), ib.lineTo(0 - d.left / 2, 0), ib.stroke())) : (ib.lineWidth = d, ib.strokeStyle = eb.grid.borderColor, ib.strokeRect(-d / 2, -d / 2, nb + d, ob + d))), ib.restore()
        }

        function K() {
            a.each(n(), function (a, b) {
                if (b.show && 0 != b.ticks.length) {
                    var c, d, e, f, g, h = b.box, i = b.direction + "Axis " + b.direction + b.n + "Axis", j = "flot-" + b.direction + "-axis flot-" + b.direction + b.n + "-axis " + i, k = b.options.font || "flot-tick-label tickLabel";
                    fb.removeText(j);
                    for (var l = 0; l < b.ticks.length; ++l)c = b.ticks[l], !c.label || c.v < b.min || c.v > b.max || ("x" == b.direction ? (f = "center", d = mb.left + b.p2c(c.v), "bottom" == b.position ? e = h.top + h.padding : (e = h.top + h.height - h.padding, g = "bottom")) : (g = "middle", e = mb.top + b.p2c(c.v), "left" == b.position ? (d = h.left + h.width - h.padding, f = "right") : d = h.left + h.padding), fb.addText(j, d, e, c.label, k, null, null, f, g))
                }
            })
        }

        function L(a) {
            a.lines.show && M(a), a.bars.show && P(a), a.points.show && N(a)
        }

        function M(a) {
            function b(a, b, c, d, e) {
                var f = a.points, g = a.pointsize, h = null, i = null;
                ib.beginPath();
                for (var j = g; j < f.length; j += g) {
                    var k = f[j - g], l = f[j - g + 1], m = f[j], n = f[j + 1];
                    if (null != k && null != m) {
                        if (n >= l && l < e.min) {
                            if (n < e.min)continue;
                            k = (e.min - l) / (n - l) * (m - k) + k, l = e.min
                        } else if (l >= n && n < e.min) {
                            if (l < e.min)continue;
                            m = (e.min - l) / (n - l) * (m - k) + k, n = e.min
                        }
                        if (l >= n && l > e.max) {
                            if (n > e.max)continue;
                            k = (e.max - l) / (n - l) * (m - k) + k, l = e.max
                        } else if (n >= l && n > e.max) {
                            if (l > e.max)continue;
                            m = (e.max - l) / (n - l) * (m - k) + k, n = e.max
                        }
                        if (m >= k && k < d.min) {
                            if (m < d.min)continue;
                            l = (d.min - k) / (m - k) * (n - l) + l, k = d.min
                        } else if (k >= m && m < d.min) {
                            if (k < d.min)continue;
                            n = (d.min - k) / (m - k) * (n - l) + l, m = d.min
                        }
                        if (k >= m && k > d.max) {
                            if (m > d.max)continue;
                            l = (d.max - k) / (m - k) * (n - l) + l, k = d.max
                        } else if (m >= k && m > d.max) {
                            if (k > d.max)continue;
                            n = (d.max - k) / (m - k) * (n - l) + l, m = d.max
                        }
                        (k != h || l != i) && ib.moveTo(d.p2c(k) + b, e.p2c(l) + c), h = m, i = n, ib.lineTo(d.p2c(m) + b, e.p2c(n) + c)
                    }
                }
                ib.stroke()
            }

            function c(a, b, c) {
                for (var d = a.points, e = a.pointsize, f = Math.min(Math.max(0, c.min), c.max), g = 0, h = !1, i = 1, j = 0, k = 0; ;) {
                    if (e > 0 && g > d.length + e)break;
                    g += e;
                    var l = d[g - e], m = d[g - e + i], n = d[g], o = d[g + i];
                    if (h) {
                        if (e > 0 && null != l && null == n) {
                            k = g, e = -e, i = 2;
                            continue
                        }
                        if (0 > e && g == j + e) {
                            ib.fill(), h = !1, e = -e, i = 1, g = j = k + e;
                            continue
                        }
                    }
                    if (null != l && null != n) {
                        if (n >= l && l < b.min) {
                            if (n < b.min)continue;
                            m = (b.min - l) / (n - l) * (o - m) + m, l = b.min
                        } else if (l >= n && n < b.min) {
                            if (l < b.min)continue;
                            o = (b.min - l) / (n - l) * (o - m) + m, n = b.min
                        }
                        if (l >= n && l > b.max) {
                            if (n > b.max)continue;
                            m = (b.max - l) / (n - l) * (o - m) + m, l = b.max
                        } else if (n >= l && n > b.max) {
                            if (l > b.max)continue;
                            o = (b.max - l) / (n - l) * (o - m) + m, n = b.max
                        }
                        if (h || (ib.beginPath(), ib.moveTo(b.p2c(l), c.p2c(f)), h = !0), m >= c.max && o >= c.max)ib.lineTo(b.p2c(l), c.p2c(c.max)), ib.lineTo(b.p2c(n), c.p2c(c.max)); else if (m <= c.min && o <= c.min)ib.lineTo(b.p2c(l), c.p2c(c.min)), ib.lineTo(b.p2c(n), c.p2c(c.min)); else {
                            var p = l, q = n;
                            o >= m && m < c.min && o >= c.min ? (l = (c.min - m) / (o - m) * (n - l) + l, m = c.min) : m >= o && o < c.min && m >= c.min && (n = (c.min - m) / (o - m) * (n - l) + l, o = c.min), m >= o && m > c.max && o <= c.max ? (l = (c.max - m) / (o - m) * (n - l) + l, m = c.max) : o >= m && o > c.max && m <= c.max && (n = (c.max - m) / (o - m) * (n - l) + l, o = c.max), l != p && ib.lineTo(b.p2c(p), c.p2c(m)), ib.lineTo(b.p2c(l), c.p2c(m)), ib.lineTo(b.p2c(n), c.p2c(o)), n != q && (ib.lineTo(b.p2c(n), c.p2c(o)), ib.lineTo(b.p2c(q), c.p2c(o)))
                        }
                    }
                }
            }

            ib.save(), ib.translate(mb.left, mb.top), ib.lineJoin = "round";
            var d = a.lines.lineWidth, e = a.shadowSize;
            if (d > 0 && e > 0) {
                ib.lineWidth = e, ib.strokeStyle = "rgba(0,0,0,0.1)";
                var f = Math.PI / 18;
                b(a.datapoints, Math.sin(f) * (d / 2 + e / 2), Math.cos(f) * (d / 2 + e / 2), a.xaxis, a.yaxis), ib.lineWidth = e / 2, b(a.datapoints, Math.sin(f) * (d / 2 + e / 4), Math.cos(f) * (d / 2 + e / 4), a.xaxis, a.yaxis)
            }
            ib.lineWidth = d, ib.strokeStyle = a.color;
            var g = Q(a.lines, a.color, 0, ob);
            g && (ib.fillStyle = g, c(a.datapoints, a.xaxis, a.yaxis)), d > 0 && b(a.datapoints, 0, 0, a.xaxis, a.yaxis), ib.restore()
        }

        function N(a) {
            function b(a, b, c, d, e, f, g, h) {
                for (var i = a.points, j = a.pointsize, k = 0; k < i.length; k += j) {
                    var l = i[k], m = i[k + 1];
                    null == l || l < f.min || l > f.max || m < g.min || m > g.max || (ib.beginPath(), l = f.p2c(l), m = g.p2c(m) + d, "circle" == h ? ib.arc(l, m, b, 0, e ? Math.PI : 2 * Math.PI, !1) : h(ib, l, m, b, e), ib.closePath(), c && (ib.fillStyle = c, ib.fill()), ib.stroke())
                }
            }

            ib.save(), ib.translate(mb.left, mb.top);
            var c = a.points.lineWidth, d = a.shadowSize, e = a.points.radius, f = a.points.symbol;
            if (0 == c && (c = 1e-4), c > 0 && d > 0) {
                var g = d / 2;
                ib.lineWidth = g, ib.strokeStyle = "rgba(0,0,0,0.1)", b(a.datapoints, e, null, g + g / 2, !0, a.xaxis, a.yaxis, f), ib.strokeStyle = "rgba(0,0,0,0.2)", b(a.datapoints, e, null, g / 2, !0, a.xaxis, a.yaxis, f)
            }
            ib.lineWidth = c, ib.strokeStyle = a.color, b(a.datapoints, e, Q(a.points, a.color), 0, !1, a.xaxis, a.yaxis, f), ib.restore()
        }

        function O(a, b, c, d, e, f, g, h, i, j, k, l) {
            var m, n, o, p, q, r, s, t, u;
            k ? (t = r = s = !0, q = !1, m = c, n = a, p = b + d, o = b + e, m > n && (u = n, n = m, m = u, q = !0, r = !1)) : (q = r = s = !0, t = !1, m = a + d, n = a + e, o = c, p = b, o > p && (u = p, p = o, o = u, t = !0, s = !1)), n < h.min || m > h.max || p < i.min || o > i.max || (m < h.min && (m = h.min, q = !1), n > h.max && (n = h.max, r = !1), o < i.min && (o = i.min, t = !1), p > i.max && (p = i.max, s = !1), m = h.p2c(m), o = i.p2c(o), n = h.p2c(n), p = i.p2c(p), g && (j.beginPath(), j.moveTo(m, o), j.lineTo(m, p), j.lineTo(n, p), j.lineTo(n, o), j.fillStyle = g(o, p), j.fill()), l > 0 && (q || r || s || t) && (j.beginPath(), j.moveTo(m, o + f), q ? j.lineTo(m, p + f) : j.moveTo(m, p + f), s ? j.lineTo(n, p + f) : j.moveTo(n, p + f), r ? j.lineTo(n, o + f) : j.moveTo(n, o + f), t ? j.lineTo(m, o + f) : j.moveTo(m, o + f), j.stroke()))
        }

        function P(a) {
            function b(b, c, d, e, f, g, h) {
                for (var i = b.points, j = b.pointsize, k = 0; k < i.length; k += j)null != i[k] && O(i[k], i[k + 1], i[k + 2], c, d, e, f, g, h, ib, a.bars.horizontal, a.bars.lineWidth)
            }

            ib.save(), ib.translate(mb.left, mb.top), ib.lineWidth = a.bars.lineWidth, ib.strokeStyle = a.color;
            var c;
            switch (a.bars.align) {
                case"left":
                    c = 0;
                    break;
                case"right":
                    c = -a.bars.barWidth;
                    break;
                case"center":
                    c = -a.bars.barWidth / 2;
                    break;
                default:
                    throw new Error("Invalid bar alignment: " + a.bars.align)
            }
            var d = a.bars.fill ? function (b, c) {
                return Q(a.bars, a.color, b, c)
            } : null;
            b(a.datapoints, c, c + a.bars.barWidth, 0, d, a.xaxis, a.yaxis), ib.restore()
        }

        function Q(b, c, d, e) {
            var f = b.fill;
            if (!f)return null;
            if (b.fillColor)return cb(b.fillColor, d, e, c);
            var g = a.color.parse(c);
            return g.a = "number" == typeof f ? f : .4, g.normalize(), g.toString()
        }

        function R() {
            if (c.find(".legend").remove(), eb.legend.show) {
                for (var b, d, e = [], f = [], g = !1, h = eb.legend.labelFormatter, i = 0; i < db.length; ++i)b = db[i], b.label && (d = h ? h(b.label, b) : b.label, d && f.push({label: d, color: b.color}));
                if (eb.legend.sorted)if (a.isFunction(eb.legend.sorted))f.sort(eb.legend.sorted); else if ("reverse" == eb.legend.sorted)f.reverse(); else {
                    var j = "descending" != eb.legend.sorted;
                    f.sort(function (a, b) {
                        return a.label == b.label ? 0 : a.label < b.label != j ? 1 : -1
                    })
                }
                for (var i = 0; i < f.length; ++i) {
                    var k = f[i];
                    0 == i % eb.legend.noColumns && (g && e.push("</tr>"), e.push("<tr>"), g = !0), e.push('<td class="legendColorBox"><div style="border:1px solid ' + eb.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + k.color + ';overflow:hidden"></div></div></td>' + '<td class="legendLabel">' + k.label + "</td>")
                }
                if (g && e.push("</tr>"), 0 != e.length) {
                    var l = '<table style="font-size:smaller;color:' + eb.grid.color + '">' + e.join("") + "</table>";
                    if (null != eb.legend.container)a(eb.legend.container).html(l); else {
                        var m = "", n = eb.legend.position, o = eb.legend.margin;
                        null == o[0] && (o = [o, o]), "n" == n.charAt(0) ? m += "top:" + (o[1] + mb.top) + "px;" : "s" == n.charAt(0) && (m += "bottom:" + (o[1] + mb.bottom) + "px;"), "e" == n.charAt(1) ? m += "right:" + (o[0] + mb.right) + "px;" : "w" == n.charAt(1) && (m += "left:" + (o[0] + mb.left) + "px;");
                        var p = a('<div class="legend">' + l.replace('style="', 'style="position:absolute;' + m + ";") + "</div>").appendTo(c);
                        if (0 != eb.legend.backgroundOpacity) {
                            var q = eb.legend.backgroundColor;
                            null == q && (q = eb.grid.backgroundColor, q = q && "string" == typeof q ? a.color.parse(q) : a.color.extract(p, "background-color"), q.a = 1, q = q.toString());
                            var r = p.children();
                            a('<div style="position:absolute;width:' + r.width() + "px;height:" + r.height() + "px;" + m + "background-color:" + q + ';"> </div>').prependTo(p).css("opacity", eb.legend.backgroundOpacity)
                        }
                    }
                }
            }
        }

        function S(a, b, c) {
            var d, e, f, g = eb.grid.mouseActiveRadius, h = g * g + 1, i = null;
            for (d = db.length - 1; d >= 0; --d)if (c(db[d])) {
                var j = db[d], k = j.xaxis, l = j.yaxis, m = j.datapoints.points, n = k.c2p(a), o = l.c2p(b), p = g / k.scale, q = g / l.scale;
                if (f = j.datapoints.pointsize, k.options.inverseTransform && (p = Number.MAX_VALUE), l.options.inverseTransform && (q = Number.MAX_VALUE), j.lines.show || j.points.show)for (e = 0; e < m.length; e += f) {
                    var r = m[e], s = m[e + 1];
                    if (null != r && !(r - n > p || -p > r - n || s - o > q || -q > s - o)) {
                        var t = Math.abs(k.p2c(r) - a), u = Math.abs(l.p2c(s) - b), v = t * t + u * u;
                        h > v && (h = v, i = [d, e / f])
                    }
                }
                if (j.bars.show && !i) {
                    var w = "left" == j.bars.align ? 0 : -j.bars.barWidth / 2, x = w + j.bars.barWidth;
                    for (e = 0; e < m.length; e += f) {
                        var r = m[e], s = m[e + 1], y = m[e + 2];
                        null != r && (db[d].bars.horizontal ? n <= Math.max(y, r) && n >= Math.min(y, r) && o >= s + w && s + x >= o : n >= r + w && r + x >= n && o >= Math.min(y, s) && o <= Math.max(y, s)) && (i = [d, e / f])
                    }
                }
            }
            return i ? (d = i[0], e = i[1], f = db[d].datapoints.pointsize, {datapoint: db[d].datapoints.points.slice(e * f, (e + 1) * f), dataIndex: e, series: db[d], seriesIndex: d}) : null
        }

        function T(a) {
            eb.grid.hoverable && W("plothover", a, function (a) {
                return 0 != a.hoverable
            })
        }

        function U(a) {
            eb.grid.hoverable && W("plothover", a, function () {
                return!1
            })
        }

        function V(a) {
            W("plotclick", a, function (a) {
                return 0 != a.clickable
            })
        }

        function W(a, b, d) {
            var e = hb.offset(), f = b.pageX - e.left - mb.left, g = b.pageY - e.top - mb.top, h = o({left: f, top: g});
            h.pageX = b.pageX, h.pageY = b.pageY;
            var i = S(f, g, d);
            if (i && (i.pageX = parseInt(i.series.xaxis.p2c(i.datapoint[0]) + e.left + mb.left, 10), i.pageY = parseInt(i.series.yaxis.p2c(i.datapoint[1]) + e.top + mb.top, 10)), eb.grid.autoHighlight) {
                for (var j = 0; j < rb.length; ++j) {
                    var k = rb[j];
                    k.auto != a || i && k.series == i.series && k.point[0] == i.datapoint[0] && k.point[1] == i.datapoint[1] || $(k.series, k.point)
                }
                i && Z(i.series, i.datapoint, a)
            }
            c.trigger(a, [h, i])
        }

        function X() {
            var a = eb.interaction.redrawOverlayInterval;
            return-1 == a ? (Y(), void 0) : (sb || (sb = setTimeout(Y, a)), void 0)
        }

        function Y() {
            sb = null, jb.save(), gb.clear(), jb.translate(mb.left, mb.top);
            var a, b;
            for (a = 0; a < rb.length; ++a)b = rb[a], b.series.bars.show ? bb(b.series, b.point) : ab(b.series, b.point);
            jb.restore(), h(pb.drawOverlay, [jb])
        }

        function Z(a, b, c) {
            if ("number" == typeof a && (a = db[a]), "number" == typeof b) {
                var d = a.datapoints.pointsize;
                b = a.datapoints.points.slice(d * b, d * (b + 1))
            }
            var e = _(a, b);
            -1 == e ? (rb.push({series: a, point: b, auto: c}), X()) : c || (rb[e].auto = !1)
        }

        function $(a, b) {
            if (null == a && null == b)return rb = [], X(), void 0;
            if ("number" == typeof a && (a = db[a]), "number" == typeof b) {
                var c = a.datapoints.pointsize;
                b = a.datapoints.points.slice(c * b, c * (b + 1))
            }
            var d = _(a, b);
            -1 != d && (rb.splice(d, 1), X())
        }

        function _(a, b) {
            for (var c = 0; c < rb.length; ++c) {
                var d = rb[c];
                if (d.series == a && d.point[0] == b[0] && d.point[1] == b[1])return c
            }
            return-1
        }

        function ab(b, c) {
            var d = c[0], e = c[1], f = b.xaxis, g = b.yaxis, h = "string" == typeof b.highlightColor ? b.highlightColor : a.color.parse(b.color).scale("a", .5).toString();
            if (!(d < f.min || d > f.max || e < g.min || e > g.max)) {
                var i = b.points.radius + b.points.lineWidth / 2;
                jb.lineWidth = i, jb.strokeStyle = h;
                var j = 1.5 * i;
                d = f.p2c(d), e = g.p2c(e), jb.beginPath(), "circle" == b.points.symbol ? jb.arc(d, e, j, 0, 2 * Math.PI, !1) : b.points.symbol(jb, d, e, j, !1), jb.closePath(), jb.stroke()
            }
        }

        function bb(b, c) {
            var d = "string" == typeof b.highlightColor ? b.highlightColor : a.color.parse(b.color).scale("a", .5).toString(), e = d, f = "left" == b.bars.align ? 0 : -b.bars.barWidth / 2;
            jb.lineWidth = b.bars.lineWidth, jb.strokeStyle = d, O(c[0], c[1], c[2] || 0, f, f + b.bars.barWidth, 0, function () {
                return e
            }, b.xaxis, b.yaxis, jb, b.bars.horizontal, b.bars.lineWidth)
        }

        function cb(b, c, d, e) {
            if ("string" == typeof b)return b;
            for (var f = ib.createLinearGradient(0, d, 0, c), g = 0, h = b.colors.length; h > g; ++g) {
                var i = b.colors[g];
                if ("string" != typeof i) {
                    var j = a.color.parse(e);
                    null != i.brightness && (j = j.scale("rgb", i.brightness)), null != i.opacity && (j.a *= i.opacity), i = j.toString()
                }
                f.addColorStop(g / (h - 1), i)
            }
            return f
        }

        var db = [], eb = {colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"], legend: {show: !0, noColumns: 1, labelFormatter: null, labelBoxBorderColor: "#ccc", container: null, position: "ne", margin: 5, backgroundColor: null, backgroundOpacity: .85, sorted: null}, xaxis: {show: null, position: "bottom", mode: null, font: null, color: null, tickColor: null, transform: null, inverseTransform: null, min: null, max: null, autoscaleMargin: null, ticks: null, tickFormatter: null, labelWidth: null, labelHeight: null, reserveSpace: null, tickLength: null, alignTicksWithAxis: null, tickDecimals: null, tickSize: null, minTickSize: null}, yaxis: {autoscaleMargin: .02, position: "left"}, xaxes: [], yaxes: [], series: {points: {show: !1, radius: 3, lineWidth: 2, fill: !0, fillColor: "#ffffff", symbol: "circle"}, lines: {lineWidth: 2, fill: !1, fillColor: null, steps: !1}, bars: {show: !1, lineWidth: 2, barWidth: 1, fill: !0, fillColor: null, align: "left", horizontal: !1}, shadowSize: 3, highlightColor: null}, grid: {show: !0, aboveData: !1, color: "#545454", backgroundColor: null, borderColor: null, tickColor: null, margin: 0, labelMargin: 5, axisMargin: 8, borderWidth: 2, minBorderMargin: null, markings: null, markingsColor: "#f4f4f4", markingsLineWidth: 2, clickable: !1, hoverable: !1, autoHighlight: !0, mouseActiveRadius: 10}, interaction: {redrawOverlayInterval: 1e3 / 60}, hooks: {}}, fb = null, gb = null, hb = null, ib = null, jb = null, kb = [], lb = [], mb = {left: 0, right: 0, top: 0, bottom: 0}, nb = 0, ob = 0, pb = {processOptions: [], processRawData: [], processDatapoints: [], processOffset: [], drawBackground: [], drawSeries: [], draw: [], bindEvents: [], drawOverlay: [], shutdown: []}, qb = this;
        qb.setData = k, qb.setupGrid = B, qb.draw = G, qb.getPlaceholder = function () {
            return c
        }, qb.getCanvas = function () {
            return fb.element
        }, qb.getPlotOffset = function () {
            return mb
        }, qb.width = function () {
            return nb
        }, qb.height = function () {
            return ob
        }, qb.offset = function () {
            var a = hb.offset();
            return a.left += mb.left, a.top += mb.top, a
        }, qb.getData = function () {
            return db
        }, qb.getAxes = function () {
            var b = {};
            return a.each(kb.concat(lb), function (a, c) {
                c && (b[c.direction + (1 != c.n ? c.n : "") + "axis"] = c)
            }), b
        }, qb.getXAxes = function () {
            return kb
        }, qb.getYAxes = function () {
            return lb
        }, qb.c2p = o, qb.p2c = p, qb.getOptions = function () {
            return eb
        }, qb.highlight = Z, qb.unhighlight = $, qb.triggerRedrawOverlay = X, qb.pointOffset = function (a) {
            return{left: parseInt(kb[m(a, "x") - 1].p2c(+a.x) + mb.left, 10), top: parseInt(lb[m(a, "y") - 1].p2c(+a.y) + mb.top, 10)}
        }, qb.shutdown = v, qb.resize = function () {
            var a = c.width(), b = c.height();
            fb.resize(a, b), gb.resize(a, b)
        }, qb.hooks = pb, i(qb), j(f), t(), k(e), B(), G(), u();
        var rb = [], sb = null
    }

    function d(a, b) {
        return b * Math.floor(a / b)
    }

    var e = Object.prototype.hasOwnProperty;
    b.prototype.resize = function (a, b) {
        if (0 >= a || 0 >= b)throw new Error("Invalid dimensions for plot, width = " + a + ", height = " + b);
        var c = this.element, d = this.context, e = this.pixelRatio;
        this.width != a && (c.width = a * e, c.style.width = a + "px", this.width = a), this.height != b && (c.height = b * e, c.style.height = b + "px", this.height = b), d.restore(), d.save(), d.scale(e, e)
    }, b.prototype.clear = function () {
        this.context.clearRect(0, 0, this.width, this.height)
    }, b.prototype.render = function () {
        var a = this._textCache;
        for (var b in a)if (e.call(a, b)) {
            var c = this.getTextLayer(b), d = a[b];
            c.hide();
            for (var f in d)if (e.call(d, f)) {
                var g = d[f];
                for (var h in g)if (e.call(g, h)) {
                    for (var i, j = g[h].positions, k = 0; i = j[k]; k++)i.active ? i.rendered || (c.append(i.element), i.rendered = !0) : (j.splice(k--, 1), i.rendered && i.element.detach());
                    0 == j.length && delete g[h]
                }
            }
            c.show()
        }
    }, b.prototype.getTextLayer = function (b) {
        var c = this.text[b];
        return null == c && (null == this.textContainer && (this.textContainer = a("<div class='flot-text'></div>").css({position: "absolute", top: 0, left: 0, bottom: 0, right: 0, "font-size": "smaller", color: "#545454"}).insertAfter(this.element)), c = this.text[b] = a("<div></div>").addClass(b).css({position: "absolute", top: 0, left: 0, bottom: 0, right: 0}).appendTo(this.textContainer)), c
    }, b.prototype.getTextInfo = function (b, c, d, e, f) {
        var g, h, i, j;
        if (c = "" + c, g = "object" == typeof d ? d.style + " " + d.variant + " " + d.weight + " " + d.size + "px/" + d.lineHeight + "px " + d.family : d, h = this._textCache[b], null == h && (h = this._textCache[b] = {}), i = h[g], null == i && (i = h[g] = {}), j = i[c], null == j) {
            var k = a("<div></div>").html(c).css({position: "absolute", "max-width": f, top: -9999}).appendTo(this.getTextLayer(b));
            "object" == typeof d ? k.css({font: g, color: d.color}) : "string" == typeof d && k.addClass(d), j = i[c] = {width: k.outerWidth(!0), height: k.outerHeight(!0), element: k, positions: []}, k.detach()
        }
        return j
    }, b.prototype.addText = function (a, b, c, d, e, f, g, h, i) {
        var j = this.getTextInfo(a, d, e, f, g), k = j.positions;
        "center" == h ? b -= j.width / 2 : "right" == h && (b -= j.width), "middle" == i ? c -= j.height / 2 : "bottom" == i && (c -= j.height);
        for (var l, m = 0; l = k[m]; m++)if (l.x == b && l.y == c)return l.active = !0, void 0;
        l = {active: !0, rendered: !1, element: k.length ? j.element.clone() : j.element, x: b, y: c}, k.push(l), l.element.css({top: Math.round(c), left: Math.round(b), "text-align": h})
    }, b.prototype.removeText = function (a, b, c, d, f, g) {
        if (null == d) {
            var h = this._textCache[a];
            if (null != h)for (var i in h)if (e.call(h, i)) {
                var j = h[i];
                for (var k in j)if (e.call(j, k))for (var l, m = j[k].positions, n = 0; l = m[n]; n++)l.active = !1
            }
        } else for (var l, m = this.getTextInfo(a, d, f, g).positions, n = 0; l = m[n]; n++)l.x == b && l.y == c && (l.active = !1)
    }, a.plot = function (b, d, e) {
        var f = new c(a(b), d, e, a.plot.plugins);
        return f
    }, a.plot.version = "0.8.1", a.plot.plugins = [], a.fn.plot = function (b, c) {
        return this.each(function () {
            a.plot(this, b, c)
        })
    }
}(jQuery), define("jquery.flot", function () {
}), function (a) {
    function b(b) {
        function f(b) {
            x || (x = !0, s = b.getCanvas(), t = a(s).parent(), e = b.getOptions(), b.setData(g(b.getData())))
        }

        function g(b) {
            for (var c = 0, d = 0, f = 0, g = e.series.pie.combine.color, h = [], i = 0; i < b.length; ++i) {
                var j = b[i].data;
                a.isArray(j) && 1 == j.length && (j = j[0]), a.isArray(j) ? j[1] = !isNaN(parseFloat(j[1])) && isFinite(j[1]) ? +j[1] : 0 : j = !isNaN(parseFloat(j)) && isFinite(j) ? [1, +j] : [1, 0], b[i].data = [j]
            }
            for (var i = 0; i < b.length; ++i)c += b[i].data[0][1];
            for (var i = 0; i < b.length; ++i) {
                var j = b[i].data[0][1];
                j / c <= e.series.pie.combine.threshold && (d += j, f++, g || (g = b[i].color))
            }
            for (var i = 0; i < b.length; ++i) {
                var j = b[i].data[0][1];
                (2 > f || j / c > e.series.pie.combine.threshold) && h.push({data: [
                    [1, j]
                ], color: b[i].color, label: b[i].label, angle: 2 * j * Math.PI / c, percent: j / (c / 100)})
            }
            return f > 1 && h.push({data: [
                [1, d]
            ], color: g, label: e.series.pie.combine.label, angle: 2 * d * Math.PI / c, percent: d / (c / 100)}), h
        }

        function h(b, f) {
            function g() {
                y.clearRect(0, 0, k, l), t.children().filter(".pieLabel, .pieLabelBackground").remove()
            }

            function h() {
                var a = e.series.pie.shadow.left, b = e.series.pie.shadow.top, c = 10, d = e.series.pie.shadow.alpha, f = e.series.pie.radius > 1 ? e.series.pie.radius : u * e.series.pie.radius;
                if (!(f >= k / 2 - a || f * e.series.pie.tilt >= l / 2 - b || c >= f)) {
                    y.save(), y.translate(a, b), y.globalAlpha = d, y.fillStyle = "#000", y.translate(v, w), y.scale(1, e.series.pie.tilt);
                    for (var g = 1; c >= g; g++)y.beginPath(), y.arc(0, 0, f, 0, 2 * Math.PI, !1), y.fill(), f -= g;
                    y.restore()
                }
            }

            function j() {
                function b(a, b, c) {
                    0 >= a || isNaN(a) || (c ? y.fillStyle = b : (y.strokeStyle = b, y.lineJoin = "round"), y.beginPath(), Math.abs(a - 2 * Math.PI) > 1e-9 && y.moveTo(0, 0), y.arc(0, 0, f, g, g + a / 2, !1), y.arc(0, 0, f, g + a / 2, g + a, !1), y.closePath(), g += a, c ? y.fill() : y.stroke())
                }

                function c() {
                    function b(b, c, d) {
                        if (0 == b.data[0][1])return!0;
                        var g, h = e.legend.labelFormatter, i = e.series.pie.label.formatter;
                        g = h ? h(b.label, b) : b.label, i && (g = i(g, b));
                        var j = (c + b.angle + c) / 2, m = v + Math.round(Math.cos(j) * f), n = w + Math.round(Math.sin(j) * f) * e.series.pie.tilt, o = "<span class='pieLabel' id='pieLabel" + d + "' style='position:absolute;top:" + n + "px;left:" + m + "px;'>" + g + "</span>";
                        t.append(o);
                        var p = t.children("#pieLabel" + d), q = n - p.height() / 2, r = m - p.width() / 2;
                        if (p.css("top", q), p.css("left", r), 0 - q > 0 || 0 - r > 0 || l - (q + p.height()) < 0 || k - (r + p.width()) < 0)return!1;
                        if (0 != e.series.pie.label.background.opacity) {
                            var s = e.series.pie.label.background.color;
                            null == s && (s = b.color);
                            var u = "top:" + q + "px;left:" + r + "px;";
                            a("<div class='pieLabelBackground' style='position:absolute;width:" + p.width() + "px;height:" + p.height() + "px;" + u + "background-color:" + s + ";'></div>").css("opacity", e.series.pie.label.background.opacity).insertBefore(p)
                        }
                        return!0
                    }

                    for (var c = d, f = e.series.pie.label.radius > 1 ? e.series.pie.label.radius : u * e.series.pie.label.radius, g = 0; g < n.length; ++g) {
                        if (n[g].percent >= 100 * e.series.pie.label.threshold && !b(n[g], c, g))return!1;
                        c += n[g].angle
                    }
                    return!0
                }

                var d = Math.PI * e.series.pie.startAngle, f = e.series.pie.radius > 1 ? e.series.pie.radius : u * e.series.pie.radius;
                y.save(), y.translate(v, w), y.scale(1, e.series.pie.tilt), y.save();
                for (var g = d, h = 0; h < n.length; ++h)n[h].startAngle = g, b(n[h].angle, n[h].color, !0);
                if (y.restore(), e.series.pie.stroke.width > 0) {
                    y.save(), y.lineWidth = e.series.pie.stroke.width, g = d;
                    for (var h = 0; h < n.length; ++h)b(n[h].angle, e.series.pie.stroke.color, !1);
                    y.restore()
                }
                return i(y), y.restore(), e.series.pie.label.show ? c() : !0
            }

            if (t) {
                var k = b.getPlaceholder().width(), l = b.getPlaceholder().height(), m = t.children().filter(".legend").children().width() || 0;
                y = f, x = !1, u = Math.min(k, l / e.series.pie.tilt) / 2, w = l / 2 + e.series.pie.offset.top, v = k / 2, "auto" == e.series.pie.offset.left ? e.legend.position.match("w") ? v += m / 2 : v -= m / 2 : v += e.series.pie.offset.left, u > v ? v = u : v > k - u && (v = k - u);
                var n = b.getData(), o = 0;
                do o > 0 && (u *= d), o += 1, g(), e.series.pie.tilt <= .8 && h(); while (!j() && c > o);
                o >= c && (g(), t.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>")), b.setSeries && b.insertLegend && (b.setSeries(n), b.insertLegend())
            }
        }

        function i(a) {
            if (e.series.pie.innerRadius > 0) {
                a.save();
                var b = e.series.pie.innerRadius > 1 ? e.series.pie.innerRadius : u * e.series.pie.innerRadius;
                a.globalCompositeOperation = "destination-out", a.beginPath(), a.fillStyle = e.series.pie.stroke.color, a.arc(0, 0, b, 0, 2 * Math.PI, !1), a.fill(), a.closePath(), a.restore(), a.save(), a.beginPath(), a.strokeStyle = e.series.pie.stroke.color, a.arc(0, 0, b, 0, 2 * Math.PI, !1), a.stroke(), a.closePath(), a.restore()
            }
        }

        function j(a, b) {
            for (var c = !1, d = -1, e = a.length, f = e - 1; ++d < e; f = d)(a[d][1] <= b[1] && b[1] < a[f][1] || a[f][1] <= b[1] && b[1] < a[d][1]) && b[0] < (a[f][0] - a[d][0]) * (b[1] - a[d][1]) / (a[f][1] - a[d][1]) + a[d][0] && (c = !c);
            return c
        }

        function k(a, c) {
            for (var d, e, f = b.getData(), g = b.getOptions(), h = g.series.pie.radius > 1 ? g.series.pie.radius : u * g.series.pie.radius, i = 0; i < f.length; ++i) {
                var k = f[i];
                if (k.pie.show) {
                    if (y.save(), y.beginPath(), y.moveTo(0, 0), y.arc(0, 0, h, k.startAngle, k.startAngle + k.angle / 2, !1), y.arc(0, 0, h, k.startAngle + k.angle / 2, k.startAngle + k.angle, !1), y.closePath(), d = a - v, e = c - w, y.isPointInPath) {
                        if (y.isPointInPath(a - v, c - w))return y.restore(), {datapoint: [k.percent, k.data], dataIndex: 0, series: k, seriesIndex: i}
                    } else {
                        var l = h * Math.cos(k.startAngle), m = h * Math.sin(k.startAngle), n = h * Math.cos(k.startAngle + k.angle / 4), o = h * Math.sin(k.startAngle + k.angle / 4), p = h * Math.cos(k.startAngle + k.angle / 2), q = h * Math.sin(k.startAngle + k.angle / 2), r = h * Math.cos(k.startAngle + k.angle / 1.5), s = h * Math.sin(k.startAngle + k.angle / 1.5), t = h * Math.cos(k.startAngle + k.angle), x = h * Math.sin(k.startAngle + k.angle), z = [
                            [0, 0],
                            [l, m],
                            [n, o],
                            [p, q],
                            [r, s],
                            [t, x]
                        ], A = [d, e];
                        if (j(z, A))return y.restore(), {datapoint: [k.percent, k.data], dataIndex: 0, series: k, seriesIndex: i}
                    }
                    y.restore()
                }
            }
            return null
        }

        function l(a) {
            n("plothover", a)
        }

        function m(a) {
            n("plotclick", a)
        }

        function n(a, c) {
            var d = b.offset(), f = parseInt(c.pageX - d.left), g = parseInt(c.pageY - d.top), h = k(f, g);
            if (e.grid.autoHighlight)for (var i = 0; i < z.length; ++i) {
                var j = z[i];
                j.auto != a || h && j.series == h.series || p(j.series)
            }
            h && o(h.series, a);
            var l = {pageX: c.pageX, pageY: c.pageY};
            t.trigger(a, [l, h])
        }

        function o(a, c) {
            var d = q(a);
            -1 == d ? (z.push({series: a, auto: c}), b.triggerRedrawOverlay()) : c || (z[d].auto = !1)
        }

        function p(a) {
            null == a && (z = [], b.triggerRedrawOverlay());
            var c = q(a);
            -1 != c && (z.splice(c, 1), b.triggerRedrawOverlay())
        }

        function q(a) {
            for (var b = 0; b < z.length; ++b) {
                var c = z[b];
                if (c.series == a)return b
            }
            return-1
        }

        function r(a, b) {
            function c(a) {
                a.angle <= 0 || isNaN(a.angle) || (b.fillStyle = "rgba(255, 255, 255, " + d.series.pie.highlight.opacity + ")", b.beginPath(), Math.abs(a.angle - 2 * Math.PI) > 1e-9 && b.moveTo(0, 0), b.arc(0, 0, e, a.startAngle, a.startAngle + a.angle / 2, !1), b.arc(0, 0, e, a.startAngle + a.angle / 2, a.startAngle + a.angle, !1), b.closePath(), b.fill())
            }

            var d = a.getOptions(), e = d.series.pie.radius > 1 ? d.series.pie.radius : u * d.series.pie.radius;
            b.save(), b.translate(v, w), b.scale(1, d.series.pie.tilt);
            for (var f = 0; f < z.length; ++f)c(z[f].series);
            i(b), b.restore()
        }

        var s = null, t = null, u = null, v = null, w = null, x = !1, y = null, z = [];
        b.hooks.processOptions.push(function (a, b) {
            b.series.pie.show && (b.grid.show = !1, "auto" == b.series.pie.label.show && (b.series.pie.label.show = b.legend.show ? !1 : !0), "auto" == b.series.pie.radius && (b.series.pie.radius = b.series.pie.label.show ? .75 : 1), b.series.pie.tilt > 1 ? b.series.pie.tilt = 1 : b.series.pie.tilt < 0 && (b.series.pie.tilt = 0))
        }), b.hooks.bindEvents.push(function (a, b) {
            var c = a.getOptions();
            c.series.pie.show && (c.grid.hoverable && b.unbind("mousemove").mousemove(l), c.grid.clickable && b.unbind("click").click(m))
        }), b.hooks.processDatapoints.push(function (a, b, c, d) {
            var e = a.getOptions();
            e.series.pie.show && f(a, b, c, d)
        }), b.hooks.drawOverlay.push(function (a, b) {
            var c = a.getOptions();
            c.series.pie.show && r(a, b)
        }), b.hooks.draw.push(function (a, b) {
            var c = a.getOptions();
            c.series.pie.show && h(a, b)
        })
    }

    var c = 10, d = .95, e = {series: {pie: {show: !1, radius: "auto", innerRadius: 0, startAngle: 1.5, tilt: 1, shadow: {left: 5, top: 15, alpha: .02}, offset: {top: 0, left: "auto"}, stroke: {color: "#fff", width: 1}, label: {show: "auto", formatter: function (a, b) {
        return"<div style='font-size:x-small;text-align:center;padding:2px;color:" + b.color + ";'>" + a + "<br/>" + Math.round(b.percent) + "%</div>"
    }, radius: 1, background: {color: null, opacity: 0}, threshold: 0}, combine: {threshold: -1, color: null, label: "Other"}, highlight: {opacity: .5}}}};
    a.plot.plugins.push({init: b, options: e, name: "pie", version: "1.1"})
}(jQuery), define("jquery.flot.pie", function () {
});
