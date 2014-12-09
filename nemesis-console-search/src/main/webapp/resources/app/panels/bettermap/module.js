/*! kibana - v3.0.0milestone4 - 2013-10-17
 * Copyright (c) 2013 Rashid Khan; Licensed Apache License */

!function (a, b, c) {
    var d = a.L, e = {};
    e.version = "0.6-dev", "object" == typeof module && "object" == typeof module.exports ? module.exports = e : "function" == typeof define && define.amd && define("panels/bettermap/leaflet/leaflet-src", e), e.noConflict = function () {
        return a.L = d, this
    }, a.L = e, e.Util = {extend: function (a) {
        var b, c, d, e, f = Array.prototype.slice.call(arguments, 1);
        for (c = 0, d = f.length; d > c; c++) {
            e = f[c] || {};
            for (b in e)e.hasOwnProperty(b) && (a[b] = e[b])
        }
        return a
    }, bind: function (a, b) {
        var c = arguments.length > 2 ? Array.prototype.slice.call(arguments, 2) : null;
        return function () {
            return a.apply(b, c || arguments)
        }
    }, stamp: function () {
        var a = 0, b = "_leaflet_id";
        return function (c) {
            return c[b] = c[b] || ++a, c[b]
        }
    }(), invokeEach: function (a, b, c) {
        var d, e;
        if ("object" == typeof a) {
            e = Array.prototype.slice.call(arguments, 3);
            for (d in a)b.apply(c, [d, a[d]].concat(e));
            return!0
        }
        return!1
    }, limitExecByInterval: function (a, b, c) {
        var d, e;
        return function f() {
            var g = arguments;
            return d ? (e = !0, void 0) : (d = !0, setTimeout(function () {
                d = !1, e && (f.apply(c, g), e = !1)
            }, b), a.apply(c, g), void 0)
        }
    }, falseFn: function () {
        return!1
    }, formatNum: function (a, b) {
        var c = Math.pow(10, b || 5);
        return Math.round(a * c) / c
    }, trim: function (a) {
        return a.trim ? a.trim() : a.replace(/^\s+|\s+$/g, "")
    }, splitWords: function (a) {
        return e.Util.trim(a).split(/\s+/)
    }, setOptions: function (a, b) {
        return a.options = e.extend({}, a.options, b), a.options
    }, getParamString: function (a, b, c) {
        var d = [];
        for (var e in a)d.push(encodeURIComponent(c ? e.toUpperCase() : e) + "=" + encodeURIComponent(a[e]));
        return(b && -1 !== b.indexOf("?") ? "&" : "?") + d.join("&")
    }, template: function (a, b) {
        return a.replace(/\{ *([\w_]+) *\}/g, function (a, d) {
            var e = b[d];
            if (e === c)throw new Error("No value provided for variable " + a);
            return"function" == typeof e && (e = e(b)), e
        })
    }, isArray: function (a) {
        return"[object Array]" === Object.prototype.toString.call(a)
    }, emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="}, function () {
        function b(b) {
            var c, d, e = ["webkit", "moz", "o", "ms"];
            for (c = 0; c < e.length && !d; c++)d = a[e[c] + b];
            return d
        }

        function c(b) {
            var c = +new Date, e = Math.max(0, 16 - (c - d));
            return d = c + e, a.setTimeout(b, e)
        }

        var d = 0, f = a.requestAnimationFrame || b("RequestAnimationFrame") || c, g = a.cancelAnimationFrame || b("CancelAnimationFrame") || b("CancelRequestAnimationFrame") || function (b) {
            a.clearTimeout(b)
        };
        e.Util.requestAnimFrame = function (b, d, g, h) {
            return b = e.bind(b, d), g && f === c ? (b(), void 0) : f.call(a, b, h)
        }, e.Util.cancelAnimFrame = function (b) {
            b && g.call(a, b)
        }
    }(), e.extend = e.Util.extend, e.bind = e.Util.bind, e.stamp = e.Util.stamp, e.setOptions = e.Util.setOptions, e.Class = function () {
    }, e.Class.extend = function (a) {
        var b = function () {
            this.initialize && this.initialize.apply(this, arguments), this._initHooks && this.callInitHooks()
        }, c = function () {
        };
        c.prototype = this.prototype;
        var d = new c;
        d.constructor = b, b.prototype = d;
        for (var f in this)this.hasOwnProperty(f) && "prototype" !== f && (b[f] = this[f]);
        a.statics && (e.extend(b, a.statics), delete a.statics), a.includes && (e.Util.extend.apply(null, [d].concat(a.includes)), delete a.includes), a.options && d.options && (a.options = e.extend({}, d.options, a.options)), e.extend(d, a), d._initHooks = [];
        var g = this;
        return b.__super__ = g.prototype, d.callInitHooks = function () {
            if (!this._initHooksCalled) {
                g.prototype.callInitHooks && g.prototype.callInitHooks.call(this), this._initHooksCalled = !0;
                for (var a = 0, b = d._initHooks.length; b > a; a++)d._initHooks[a].call(this)
            }
        }, b
    }, e.Class.include = function (a) {
        e.extend(this.prototype, a)
    }, e.Class.mergeOptions = function (a) {
        e.extend(this.prototype.options, a)
    }, e.Class.addInitHook = function (a) {
        var b = Array.prototype.slice.call(arguments, 1), c = "function" == typeof a ? a : function () {
            this[a].apply(this, b)
        };
        this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(c)
    };
    var f = "_leaflet_events";
    e.Mixin = {}, e.Mixin.Events = {addEventListener: function (a, b, c) {
        if (e.Util.invokeEach(a, this.addEventListener, this, b, c))return this;
        var d, g, h, i, j, k, l, m = this[f] = this[f] || {}, n = c && e.stamp(c);
        for (a = e.Util.splitWords(a), d = 0, g = a.length; g > d; d++)h = {action: b, context: c || this}, i = a[d], c ? (j = i + "_idx", k = j + "_len", l = m[j] = m[j] || {}, l[n] || (l[n] = [], m[k] = (m[k] || 0) + 1), l[n].push(h)) : (m[i] = m[i] || [], m[i].push(h));
        return this
    }, hasEventListeners: function (a) {
        var b = this[f];
        return!!b && (a in b && b[a].length > 0 || a + "_idx"in b && b[a + "_idx_len"] > 0)
    }, removeEventListener: function (a, b, c) {
        if (!this[f])return this;
        if (!a)return this.clearAllEventListeners();
        if (e.Util.invokeEach(a, this.removeEventListener, this, b, c))return this;
        var d, g, h, i, j, k, l, m, n, o = this[f], p = c && e.stamp(c);
        for (a = e.Util.splitWords(a), d = 0, g = a.length; g > d; d++)if (h = a[d], k = h + "_idx", l = k + "_len", m = o[k], b) {
            if (i = c && m ? m[p] : o[h]) {
                for (j = i.length - 1; j >= 0; j--)i[j].action !== b || c && i[j].context !== c || (n = i.splice(j, 1), n[0].action = e.Util.falseFn);
                c && m && 0 === i.length && (delete m[p], o[l]--)
            }
        } else delete o[h], delete o[k];
        return this
    }, clearAllEventListeners: function () {
        return delete this[f], this
    }, fireEvent: function (a, b) {
        if (!this.hasEventListeners(a))return this;
        var c, d, g, h, i, j = e.Util.extend({}, b, {type: a, target: this}), k = this[f];
        if (k[a])for (c = k[a].slice(), d = 0, g = c.length; g > d; d++)c[d].action.call(c[d].context || this, j);
        h = k[a + "_idx"];
        for (i in h)if (c = h[i].slice())for (d = 0, g = c.length; g > d; d++)c[d].action.call(c[d].context || this, j);
        return this
    }, addOneTimeEventListener: function (a, b, c) {
        if (e.Util.invokeEach(a, this.addOneTimeEventListener, this, b, c))return this;
        var d = e.bind(function () {
            this.removeEventListener(a, b, c).removeEventListener(a, d, c)
        }, this);
        return this.addEventListener(a, b, c).addEventListener(a, d, c)
    }}, e.Mixin.Events.on = e.Mixin.Events.addEventListener, e.Mixin.Events.off = e.Mixin.Events.removeEventListener, e.Mixin.Events.once = e.Mixin.Events.addOneTimeEventListener, e.Mixin.Events.fire = e.Mixin.Events.fireEvent, function () {
        var d = !!a.ActiveXObject, f = d && !a.XMLHttpRequest, g = d && !b.querySelector, h = d && !b.addEventListener, i = navigator.userAgent.toLowerCase(), j = -1 !== i.indexOf("webkit"), k = -1 !== i.indexOf("chrome"), l = -1 !== i.indexOf("phantom"), m = -1 !== i.indexOf("android"), n = -1 !== i.search("android [23]"), o = typeof orientation != c + "", p = a.navigator && a.navigator.msPointerEnabled && a.navigator.msMaxTouchPoints, q = "devicePixelRatio"in a && a.devicePixelRatio > 1 || "matchMedia"in a && a.matchMedia("(min-resolution:144dpi)") && a.matchMedia("(min-resolution:144dpi)").matches, r = b.documentElement, s = d && "transition"in r.style, t = "WebKitCSSMatrix"in a && "m11"in new a.WebKitCSSMatrix, u = "MozPerspective"in r.style, v = "OTransition"in r.style, w = !a.L_DISABLE_3D && (s || t || u || v) && !l, x = !a.L_NO_TOUCH && !l && function () {
            var a = "ontouchstart";
            if (p || a in r)return!0;
            var c = b.createElement("div"), d = !1;
            return c.setAttribute ? (c.setAttribute(a, "return;"), "function" == typeof c[a] && (d = !0), c.removeAttribute(a), c = null, d) : !1
        }();
        e.Browser = {ie: d, ie6: f, ie7: g, ielt9: h, webkit: j, android: m, android23: n, chrome: k, ie3d: s, webkit3d: t, gecko3d: u, opera3d: v, any3d: w, mobile: o, mobileWebkit: o && j, mobileWebkit3d: o && t, mobileOpera: o && a.opera, touch: x, msTouch: p, retina: q}
    }(), e.Point = function (a, b, c) {
        this.x = c ? Math.round(a) : a, this.y = c ? Math.round(b) : b
    }, e.Point.prototype = {clone: function () {
        return new e.Point(this.x, this.y)
    }, add: function (a) {
        return this.clone()._add(e.point(a))
    }, _add: function (a) {
        return this.x += a.x, this.y += a.y, this
    }, subtract: function (a) {
        return this.clone()._subtract(e.point(a))
    }, _subtract: function (a) {
        return this.x -= a.x, this.y -= a.y, this
    }, divideBy: function (a) {
        return this.clone()._divideBy(a)
    }, _divideBy: function (a) {
        return this.x /= a, this.y /= a, this
    }, multiplyBy: function (a) {
        return this.clone()._multiplyBy(a)
    }, _multiplyBy: function (a) {
        return this.x *= a, this.y *= a, this
    }, round: function () {
        return this.clone()._round()
    }, _round: function () {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this
    }, floor: function () {
        return this.clone()._floor()
    }, _floor: function () {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
    }, distanceTo: function (a) {
        a = e.point(a);
        var b = a.x - this.x, c = a.y - this.y;
        return Math.sqrt(b * b + c * c)
    }, equals: function (a) {
        return a = e.point(a), a.x === this.x && a.y === this.y
    }, contains: function (a) {
        return a = e.point(a), Math.abs(a.x) <= Math.abs(this.x) && Math.abs(a.y) <= Math.abs(this.y)
    }, toString: function () {
        return"Point(" + e.Util.formatNum(this.x) + ", " + e.Util.formatNum(this.y) + ")"
    }}, e.point = function (a, b, d) {
        return a instanceof e.Point ? a : e.Util.isArray(a) ? new e.Point(a[0], a[1]) : a === c || null === a ? a : new e.Point(a, b, d)
    }, e.Bounds = function (a, b) {
        if (a)for (var c = b ? [a, b] : a, d = 0, e = c.length; e > d; d++)this.extend(c[d])
    }, e.Bounds.prototype = {extend: function (a) {
        return a = e.point(a), this.min || this.max ? (this.min.x = Math.min(a.x, this.min.x), this.max.x = Math.max(a.x, this.max.x), this.min.y = Math.min(a.y, this.min.y), this.max.y = Math.max(a.y, this.max.y)) : (this.min = a.clone(), this.max = a.clone()), this
    }, getCenter: function (a) {
        return new e.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, a)
    }, getBottomLeft: function () {
        return new e.Point(this.min.x, this.max.y)
    }, getTopRight: function () {
        return new e.Point(this.max.x, this.min.y)
    }, getSize: function () {
        return this.max.subtract(this.min)
    }, contains: function (a) {
        var b, c;
        return a = "number" == typeof a[0] || a instanceof e.Point ? e.point(a) : e.bounds(a), a instanceof e.Bounds ? (b = a.min, c = a.max) : b = c = a, b.x >= this.min.x && c.x <= this.max.x && b.y >= this.min.y && c.y <= this.max.y
    }, intersects: function (a) {
        a = e.bounds(a);
        var b = this.min, c = this.max, d = a.min, f = a.max, g = f.x >= b.x && d.x <= c.x, h = f.y >= b.y && d.y <= c.y;
        return g && h
    }, isValid: function () {
        return!(!this.min || !this.max)
    }}, e.bounds = function (a, b) {
        return!a || a instanceof e.Bounds ? a : new e.Bounds(a, b)
    }, e.Transformation = function (a, b, c, d) {
        this._a = a, this._b = b, this._c = c, this._d = d
    }, e.Transformation.prototype = {transform: function (a, b) {
        return this._transform(a.clone(), b)
    }, _transform: function (a, b) {
        return b = b || 1, a.x = b * (this._a * a.x + this._b), a.y = b * (this._c * a.y + this._d), a
    }, untransform: function (a, b) {
        return b = b || 1, new e.Point((a.x / b - this._b) / this._a, (a.y / b - this._d) / this._c)
    }}, e.DomUtil = {get: function (a) {
        return"string" == typeof a ? b.getElementById(a) : a
    }, getStyle: function (a, c) {
        var d = a.style[c];
        if (!d && a.currentStyle && (d = a.currentStyle[c]), (!d || "auto" === d) && b.defaultView) {
            var e = b.defaultView.getComputedStyle(a, null);
            d = e ? e[c] : null
        }
        return"auto" === d ? null : d
    }, getViewportOffset: function (a) {
        var c, d = 0, f = 0, g = a, h = b.body, i = b.documentElement, j = e.Browser.ie7;
        do {
            if (d += g.offsetTop || 0, f += g.offsetLeft || 0, d += parseInt(e.DomUtil.getStyle(g, "borderTopWidth"), 10) || 0, f += parseInt(e.DomUtil.getStyle(g, "borderLeftWidth"), 10) || 0, c = e.DomUtil.getStyle(g, "position"), g.offsetParent === h && "absolute" === c)break;
            if ("fixed" === c) {
                d += h.scrollTop || i.scrollTop || 0, f += h.scrollLeft || i.scrollLeft || 0;
                break
            }
            if ("relative" === c && !g.offsetLeft) {
                var k = e.DomUtil.getStyle(g, "width"), l = e.DomUtil.getStyle(g, "max-width"), m = g.getBoundingClientRect();
                ("none" !== k || "none" !== l) && (f += m.left + g.clientLeft), d += m.top + (h.scrollTop || i.scrollTop || 0);
                break
            }
            g = g.offsetParent
        } while (g);
        g = a;
        do {
            if (g === h)break;
            d -= g.scrollTop || 0, f -= g.scrollLeft || 0, e.DomUtil.documentIsLtr() || !e.Browser.webkit && !j || (f += g.scrollWidth - g.clientWidth, j && "hidden" !== e.DomUtil.getStyle(g, "overflow-y") && "hidden" !== e.DomUtil.getStyle(g, "overflow") && (f += 17)), g = g.parentNode
        } while (g);
        return new e.Point(f, d)
    }, documentIsLtr: function () {
        return e.DomUtil._docIsLtrCached || (e.DomUtil._docIsLtrCached = !0, e.DomUtil._docIsLtr = "ltr" === e.DomUtil.getStyle(b.body, "direction")), e.DomUtil._docIsLtr
    }, create: function (a, c, d) {
        var e = b.createElement(a);
        return e.className = c, d && d.appendChild(e), e
    }, disableTextSelection: function () {
        b.selection && b.selection.empty && b.selection.empty(), this._onselectstart || (this._onselectstart = b.onselectstart || null, b.onselectstart = e.Util.falseFn)
    }, enableTextSelection: function () {
        b.onselectstart === e.Util.falseFn && (b.onselectstart = this._onselectstart, this._onselectstart = null)
    }, hasClass: function (a, b) {
        return a.className.length > 0 && new RegExp("(^|\\s)" + b + "(\\s|$)").test(a.className)
    }, addClass: function (a, b) {
        e.DomUtil.hasClass(a, b) || (a.className += (a.className ? " " : "") + b)
    }, removeClass: function (a, b) {
        a.className = e.Util.trim((" " + a.className + " ").replace(" " + b + " ", " "))
    }, setOpacity: function (a, b) {
        if ("opacity"in a.style)a.style.opacity = b; else if ("filter"in a.style) {
            var c = !1, d = "DXImageTransform.Microsoft.Alpha";
            try {
                c = a.filters.item(d)
            } catch (e) {
                if (1 === b)return
            }
            b = Math.round(100 * b), c ? (c.Enabled = 100 !== b, c.Opacity = b) : a.style.filter += " progid:" + d + "(opacity=" + b + ")"
        }
    }, testProp: function (a) {
        for (var c = b.documentElement.style, d = 0; d < a.length; d++)if (a[d]in c)return a[d];
        return!1
    }, getTranslateString: function (a) {
        var b = e.Browser.webkit3d, c = "translate" + (b ? "3d" : "") + "(", d = (b ? ",0" : "") + ")";
        return c + a.x + "px," + a.y + "px" + d
    }, getScaleString: function (a, b) {
        var c = e.DomUtil.getTranslateString(b.add(b.multiplyBy(-1 * a))), d = " scale(" + a + ") ";
        return c + d
    }, setPosition: function (a, b, c) {
        a._leaflet_pos = b, !c && e.Browser.any3d ? (a.style[e.DomUtil.TRANSFORM] = e.DomUtil.getTranslateString(b), e.Browser.mobileWebkit3d && (a.style.WebkitBackfaceVisibility = "hidden")) : (a.style.left = b.x + "px", a.style.top = b.y + "px")
    }, getPosition: function (a) {
        return a._leaflet_pos
    }}, e.DomUtil.TRANSFORM = e.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]), e.DomUtil.TRANSITION = e.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]), e.DomUtil.TRANSITION_END = "webkitTransition" === e.DomUtil.TRANSITION || "OTransition" === e.DomUtil.TRANSITION ? e.DomUtil.TRANSITION + "End" : "transitionend", e.LatLng = function (a, b) {
        var c = parseFloat(a), d = parseFloat(b);
        if (isNaN(c) || isNaN(d))throw new Error("Invalid LatLng object: (" + a + ", " + b + ")");
        this.lat = c, this.lng = d
    }, e.extend(e.LatLng, {DEG_TO_RAD: Math.PI / 180, RAD_TO_DEG: 180 / Math.PI, MAX_MARGIN: 1e-9}), e.LatLng.prototype = {equals: function (a) {
        if (!a)return!1;
        a = e.latLng(a);
        var b = Math.max(Math.abs(this.lat - a.lat), Math.abs(this.lng - a.lng));
        return b <= e.LatLng.MAX_MARGIN
    }, toString: function (a) {
        return"LatLng(" + e.Util.formatNum(this.lat, a) + ", " + e.Util.formatNum(this.lng, a) + ")"
    }, distanceTo: function (a) {
        a = e.latLng(a);
        var b = 6378137, c = e.LatLng.DEG_TO_RAD, d = (a.lat - this.lat) * c, f = (a.lng - this.lng) * c, g = this.lat * c, h = a.lat * c, i = Math.sin(d / 2), j = Math.sin(f / 2), k = i * i + j * j * Math.cos(g) * Math.cos(h);
        return 2 * b * Math.atan2(Math.sqrt(k), Math.sqrt(1 - k))
    }, wrap: function (a, b) {
        var c = this.lng;
        return a = a || -180, b = b || 180, c = (c + b) % (b - a) + (a > c || c === b ? b : a), new e.LatLng(this.lat, c)
    }}, e.latLng = function (a, b) {
        return a instanceof e.LatLng ? a : e.Util.isArray(a) ? new e.LatLng(a[0], a[1]) : a === c || null === a ? a : "object" == typeof a && "lat"in a ? new e.LatLng(a.lat, "lng"in a ? a.lng : a.lon) : new e.LatLng(a, b)
    }, e.LatLngBounds = function (a, b) {
        if (a)for (var c = b ? [a, b] : a, d = 0, e = c.length; e > d; d++)this.extend(c[d])
    }, e.LatLngBounds.prototype = {extend: function (a) {
        return a ? (a = "number" == typeof a[0] || "string" == typeof a[0] || a instanceof e.LatLng ? e.latLng(a) : e.latLngBounds(a), a instanceof e.LatLng ? this._southWest || this._northEast ? (this._southWest.lat = Math.min(a.lat, this._southWest.lat), this._southWest.lng = Math.min(a.lng, this._southWest.lng), this._northEast.lat = Math.max(a.lat, this._northEast.lat), this._northEast.lng = Math.max(a.lng, this._northEast.lng)) : (this._southWest = new e.LatLng(a.lat, a.lng), this._northEast = new e.LatLng(a.lat, a.lng)) : a instanceof e.LatLngBounds && (this.extend(a._southWest), this.extend(a._northEast)), this) : this
    }, pad: function (a) {
        var b = this._southWest, c = this._northEast, d = Math.abs(b.lat - c.lat) * a, f = Math.abs(b.lng - c.lng) * a;
        return new e.LatLngBounds(new e.LatLng(b.lat - d, b.lng - f), new e.LatLng(c.lat + d, c.lng + f))
    }, getCenter: function () {
        return new e.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
    }, getSouthWest: function () {
        return this._southWest
    }, getNorthEast: function () {
        return this._northEast
    }, getNorthWest: function () {
        return new e.LatLng(this.getNorth(), this.getWest())
    }, getSouthEast: function () {
        return new e.LatLng(this.getSouth(), this.getEast())
    }, getWest: function () {
        return this._southWest.lng
    }, getSouth: function () {
        return this._southWest.lat
    }, getEast: function () {
        return this._northEast.lng
    }, getNorth: function () {
        return this._northEast.lat
    }, contains: function (a) {
        a = "number" == typeof a[0] || a instanceof e.LatLng ? e.latLng(a) : e.latLngBounds(a);
        var b, c, d = this._southWest, f = this._northEast;
        return a instanceof e.LatLngBounds ? (b = a.getSouthWest(), c = a.getNorthEast()) : b = c = a, b.lat >= d.lat && c.lat <= f.lat && b.lng >= d.lng && c.lng <= f.lng
    }, intersects: function (a) {
        a = e.latLngBounds(a);
        var b = this._southWest, c = this._northEast, d = a.getSouthWest(), f = a.getNorthEast(), g = f.lat >= b.lat && d.lat <= c.lat, h = f.lng >= b.lng && d.lng <= c.lng;
        return g && h
    }, toBBoxString: function () {
        return[this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
    }, equals: function (a) {
        return a ? (a = e.latLngBounds(a), this._southWest.equals(a.getSouthWest()) && this._northEast.equals(a.getNorthEast())) : !1
    }, isValid: function () {
        return!(!this._southWest || !this._northEast)
    }}, e.latLngBounds = function (a, b) {
        return!a || a instanceof e.LatLngBounds ? a : new e.LatLngBounds(a, b)
    }, e.Projection = {}, e.Projection.SphericalMercator = {MAX_LATITUDE: 85.0511287798, project: function (a) {
        var b = e.LatLng.DEG_TO_RAD, c = this.MAX_LATITUDE, d = Math.max(Math.min(c, a.lat), -c), f = a.lng * b, g = d * b;
        return g = Math.log(Math.tan(Math.PI / 4 + g / 2)), new e.Point(f, g)
    }, unproject: function (a) {
        var b = e.LatLng.RAD_TO_DEG, c = a.x * b, d = (2 * Math.atan(Math.exp(a.y)) - Math.PI / 2) * b;
        return new e.LatLng(d, c)
    }}, e.Projection.LonLat = {project: function (a) {
        return new e.Point(a.lng, a.lat)
    }, unproject: function (a) {
        return new e.LatLng(a.y, a.x)
    }}, e.CRS = {latLngToPoint: function (a, b) {
        var c = this.projection.project(a), d = this.scale(b);
        return this.transformation._transform(c, d)
    }, pointToLatLng: function (a, b) {
        var c = this.scale(b), d = this.transformation.untransform(a, c);
        return this.projection.unproject(d)
    }, project: function (a) {
        return this.projection.project(a)
    }, scale: function (a) {
        return 256 * Math.pow(2, a)
    }}, e.CRS.Simple = e.extend({}, e.CRS, {projection: e.Projection.LonLat, transformation: new e.Transformation(1, 0, -1, 0), scale: function (a) {
        return Math.pow(2, a)
    }}), e.CRS.EPSG3857 = e.extend({}, e.CRS, {code: "EPSG:3857", projection: e.Projection.SphericalMercator, transformation: new e.Transformation(.5 / Math.PI, .5, -.5 / Math.PI, .5), project: function (a) {
        var b = this.projection.project(a), c = 6378137;
        return b.multiplyBy(c)
    }}), e.CRS.EPSG900913 = e.extend({}, e.CRS.EPSG3857, {code: "EPSG:900913"}), e.CRS.EPSG4326 = e.extend({}, e.CRS, {code: "EPSG:4326", projection: e.Projection.LonLat, transformation: new e.Transformation(1 / 360, .5, -1 / 360, .5)}), e.Map = e.Class.extend({includes: e.Mixin.Events, options: {crs: e.CRS.EPSG3857, fadeAnimation: e.DomUtil.TRANSITION && !e.Browser.android23, trackResize: !0, markerZoomAnimation: e.DomUtil.TRANSITION && e.Browser.any3d}, initialize: function (a, b) {
        b = e.setOptions(this, b), this._initContainer(a), this._initLayout(), this._initEvents(), b.maxBounds && this.setMaxBounds(b.maxBounds), b.center && b.zoom !== c && this.setView(e.latLng(b.center), b.zoom, {reset: !0}), this._initLayers(b.layers), this._handlers = [], this.callInitHooks()
    }, setView: function (a, b) {
        return this._resetView(e.latLng(a), this._limitZoom(b)), this
    }, setZoom: function (a, b) {
        return this.setView(this.getCenter(), a, {zoom: b})
    }, zoomIn: function (a, b) {
        return this.setZoom(this._zoom + (a || 1), b)
    }, zoomOut: function (a, b) {
        return this.setZoom(this._zoom - (a || 1), b)
    }, setZoomAround: function (a, b, c) {
        var d = this.getZoomScale(b), f = this.getSize().divideBy(2), g = a instanceof e.Point ? a : this.latLngToContainerPoint(a), h = g.subtract(f).multiplyBy(1 - 1 / d), i = this.containerPointToLatLng(f.add(h));
        return this.setView(i, b, {zoom: c})
    }, fitBounds: function (a, b) {
        b = b || {}, a = a.getBounds ? a.getBounds() : e.latLngBounds(a);
        var c = e.point(b.paddingTopLeft || b.padding || [0, 0]), d = e.point(b.paddingBottomRight || b.padding || [0, 0]), f = this.getBoundsZoom(a, !1, c.add(d)), g = d.subtract(c).divideBy(2), h = this.project(a.getSouthWest(), f), i = this.project(a.getNorthEast(), f), j = this.unproject(h.add(i).divideBy(2).add(g), f);
        return this.setView(j, f, b)
    }, fitWorld: function (a) {
        return this.fitBounds([
            [-90, -180],
            [90, 180]
        ], a)
    }, panTo: function (a, b) {
        return this.setView(a, this._zoom, {pan: b})
    }, panBy: function (a) {
        return this.fire("movestart"), this._rawPanBy(e.point(a)), this.fire("move"), this.fire("moveend")
    }, setMaxBounds: function (a) {
        if (a = e.latLngBounds(a), this.options.maxBounds = a, !a)return this._boundsMinZoom = null, this.off("moveend", this._panInsideMaxBounds, this), this;
        var b = this.getBoundsZoom(a, !0);
        return this._boundsMinZoom = b, this._loaded && (this._zoom < b ? this.setView(a.getCenter(), b) : this.panInsideBounds(a)), this.on("moveend", this._panInsideMaxBounds, this), this
    }, panInsideBounds: function (a) {
        a = e.latLngBounds(a);
        var b = this.getPixelBounds(), c = b.getBottomLeft(), d = b.getTopRight(), f = this.project(a.getSouthWest()), g = this.project(a.getNorthEast()), h = 0, i = 0;
        return d.y < g.y && (i = Math.ceil(g.y - d.y)), d.x > g.x && (h = Math.floor(g.x - d.x)), c.y > f.y && (i = Math.floor(f.y - c.y)), c.x < f.x && (h = Math.ceil(f.x - c.x)), h || i ? this.panBy([h, i]) : this
    }, addLayer: function (a) {
        var b = e.stamp(a);
        return this._layers[b] ? this : (this._layers[b] = a, !a.options || isNaN(a.options.maxZoom) && isNaN(a.options.minZoom) || (this._zoomBoundLayers[b] = a, this._updateZoomLevels()), this.options.zoomAnimation && e.TileLayer && a instanceof e.TileLayer && (this._tileLayersNum++, this._tileLayersToLoad++, a.on("load", this._onTileLayerLoad, this)), this._loaded && this._layerAdd(a), this)
    }, removeLayer: function (a) {
        var b = e.stamp(a);
        if (this._layers[b])return this._loaded && (a.onRemove(this), this.fire("layerremove", {layer: a})), delete this._layers[b], this._zoomBoundLayers[b] && (delete this._zoomBoundLayers[b], this._updateZoomLevels()), this.options.zoomAnimation && e.TileLayer && a instanceof e.TileLayer && (this._tileLayersNum--, this._tileLayersToLoad--, a.off("load", this._onTileLayerLoad, this)), this
    }, hasLayer: function (a) {
        return a ? e.stamp(a)in this._layers : !1
    }, eachLayer: function (a, b) {
        for (var c in this._layers)a.call(b, this._layers[c]);
        return this
    }, invalidateSize: function (a) {
        var b = this.getSize();
        if (this._sizeChanged = !0, this.options.maxBounds && this.setMaxBounds(this.options.maxBounds), !this._loaded)return this;
        var c = this.getSize(), d = b.subtract(c).divideBy(2).round();
        return(0 !== d.x || 0 !== d.y) && (a === !0 ? this.panBy(d) : (this._rawPanBy(d), this.fire("move"), clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(e.bind(this.fire, this, "moveend"), 200)), this.fire("resize", {oldSize: b, newSize: c})), this
    }, addHandler: function (a, b) {
        if (b) {
            var c = this[a] = new b(this);
            return this._handlers.push(c), this.options[a] && c.enable(), this
        }
    }, remove: function () {
        return this._loaded && this.fire("unload"), this._initEvents("off"), delete this._container._leaflet, this._clearPanes(), this._clearControlPos && this._clearControlPos(), this._clearHandlers(), this
    }, getCenter: function () {
        return this._checkIfLoaded(), this._moved() ? this.layerPointToLatLng(this._getCenterLayerPoint()) : this._initialCenter
    }, getZoom: function () {
        return this._zoom
    }, getBounds: function () {
        var a = this.getPixelBounds(), b = this.unproject(a.getBottomLeft()), c = this.unproject(a.getTopRight());
        return new e.LatLngBounds(b, c)
    }, getMinZoom: function () {
        var a = this.options.minZoom || 0, b = this._layersMinZoom || 0, c = this._boundsMinZoom || 0;
        return Math.max(a, b, c)
    }, getMaxZoom: function () {
        var a = this.options.maxZoom === c ? 1 / 0 : this.options.maxZoom, b = this._layersMaxZoom === c ? 1 / 0 : this._layersMaxZoom;
        return Math.min(a, b)
    }, getBoundsZoom: function (a, b, c) {
        a = e.latLngBounds(a);
        var d, f = this.getMinZoom() - (b ? 1 : 0), g = this.getMaxZoom(), h = this.getSize(), i = a.getNorthWest(), j = a.getSouthEast(), k = !0;
        c = e.point(c || [0, 0]);
        do f++, d = this.project(j, f).subtract(this.project(i, f)).add(c), k = b ? d.x < h.x || d.y < h.y : h.contains(d); while (k && g >= f);
        return k && b ? null : b ? f : f - 1
    }, getSize: function () {
        return(!this._size || this._sizeChanged) && (this._size = new e.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1), this._size.clone()
    }, getPixelBounds: function () {
        var a = this._getTopLeftPoint();
        return new e.Bounds(a, a.add(this.getSize()))
    }, getPixelOrigin: function () {
        return this._checkIfLoaded(), this._initialTopLeftPoint
    }, getPanes: function () {
        return this._panes
    }, getContainer: function () {
        return this._container
    }, getZoomScale: function (a) {
        var b = this.options.crs;
        return b.scale(a) / b.scale(this._zoom)
    }, getScaleZoom: function (a) {
        return this._zoom + Math.log(a) / Math.LN2
    }, project: function (a, b) {
        return b = b === c ? this._zoom : b, this.options.crs.latLngToPoint(e.latLng(a), b)
    }, unproject: function (a, b) {
        return b = b === c ? this._zoom : b, this.options.crs.pointToLatLng(e.point(a), b)
    }, layerPointToLatLng: function (a) {
        var b = e.point(a).add(this.getPixelOrigin());
        return this.unproject(b)
    }, latLngToLayerPoint: function (a) {
        var b = this.project(e.latLng(a))._round();
        return b._subtract(this.getPixelOrigin())
    }, containerPointToLayerPoint: function (a) {
        return e.point(a).subtract(this._getMapPanePos())
    }, layerPointToContainerPoint: function (a) {
        return e.point(a).add(this._getMapPanePos())
    }, containerPointToLatLng: function (a) {
        var b = this.containerPointToLayerPoint(e.point(a));
        return this.layerPointToLatLng(b)
    }, latLngToContainerPoint: function (a) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(e.latLng(a)))
    }, mouseEventToContainerPoint: function (a) {
        return e.DomEvent.getMousePosition(a, this._container)
    }, mouseEventToLayerPoint: function (a) {
        return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(a))
    }, mouseEventToLatLng: function (a) {
        return this.layerPointToLatLng(this.mouseEventToLayerPoint(a))
    }, _initContainer: function (a) {
        var b = this._container = e.DomUtil.get(a);
        if (!b)throw new Error("Map container not found.");
        if (b._leaflet)throw new Error("Map container is already initialized.");
        b._leaflet = !0
    }, _initLayout: function () {
        var a = this._container;
        e.DomUtil.addClass(a, "leaflet-container" + (e.Browser.touch ? " leaflet-touch" : "") + (e.Browser.retina ? " leaflet-retina" : "") + (this.options.fadeAnimation ? " leaflet-fade-anim" : ""));
        var b = e.DomUtil.getStyle(a, "position");
        "absolute" !== b && "relative" !== b && "fixed" !== b && (a.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
    }, _initPanes: function () {
        var a = this._panes = {};
        this._mapPane = a.mapPane = this._createPane("leaflet-map-pane", this._container), this._tilePane = a.tilePane = this._createPane("leaflet-tile-pane", this._mapPane), a.objectsPane = this._createPane("leaflet-objects-pane", this._mapPane), a.shadowPane = this._createPane("leaflet-shadow-pane"), a.overlayPane = this._createPane("leaflet-overlay-pane"), a.markerPane = this._createPane("leaflet-marker-pane"), a.popupPane = this._createPane("leaflet-popup-pane");
        var b = " leaflet-zoom-hide";
        this.options.markerZoomAnimation || (e.DomUtil.addClass(a.markerPane, b), e.DomUtil.addClass(a.shadowPane, b), e.DomUtil.addClass(a.popupPane, b))
    }, _createPane: function (a, b) {
        return e.DomUtil.create("div", a, b || this._panes.objectsPane)
    }, _clearPanes: function () {
        this._container.removeChild(this._mapPane)
    }, _initLayers: function (a) {
        a = a ? e.Util.isArray(a) ? a : [a] : [], this._layers = {}, this._zoomBoundLayers = {}, this._tileLayersNum = 0;
        var b, c;
        for (b = 0, c = a.length; c > b; b++)this.addLayer(a[b])
    }, _resetView: function (a, b, c, d) {
        var f = this._zoom !== b;
        d || (this.fire("movestart"), f && this.fire("zoomstart")), this._zoom = b, this._initialCenter = a, this._initialTopLeftPoint = this._getNewTopLeftPoint(a), c ? this._initialTopLeftPoint._add(this._getMapPanePos()) : e.DomUtil.setPosition(this._mapPane, new e.Point(0, 0)), this._tileLayersToLoad = this._tileLayersNum;
        var g = !this._loaded;
        this._loaded = !0, g && (this.fire("load"), this.eachLayer(this._layerAdd, this)), this.fire("viewreset", {hard: !c}), this.fire("move"), (f || d) && this.fire("zoomend"), this.fire("moveend", {hard: !c})
    }, _rawPanBy: function (a) {
        e.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(a))
    }, _getZoomSpan: function () {
        return this.getMaxZoom() - this.getMinZoom()
    }, _updateZoomLevels: function () {
        var a, b = 1 / 0, d = -1 / 0, e = this._getZoomSpan();
        for (a in this._zoomBoundLayers) {
            var f = this._zoomBoundLayers[a];
            isNaN(f.options.minZoom) || (b = Math.min(b, f.options.minZoom)), isNaN(f.options.maxZoom) || (d = Math.max(d, f.options.maxZoom))
        }
        a === c ? this._layersMaxZoom = this._layersMinZoom = c : (this._layersMaxZoom = d, this._layersMinZoom = b), e !== this._getZoomSpan() && this.fire("zoomlevelschange")
    }, _panInsideMaxBounds: function () {
        this.panInsideBounds(this.options.maxBounds)
    }, _checkIfLoaded: function () {
        if (!this._loaded)throw new Error("Set map center and zoom first.")
    }, _initEvents: function (b) {
        if (e.DomEvent) {
            b = b || "on", e.DomEvent[b](this._container, "click", this._onMouseClick, this);
            var c, d, f = ["dblclick", "mousedown", "mouseup", "mouseenter", "mouseleave", "mousemove", "contextmenu"];
            for (c = 0, d = f.length; d > c; c++)e.DomEvent[b](this._container, f[c], this._fireMouseEvent, this);
            this.options.trackResize && e.DomEvent[b](a, "resize", this._onResize, this)
        }
    }, _onResize: function () {
        e.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = e.Util.requestAnimFrame(this.invalidateSize, this, !1, this._container)
    }, _onMouseClick: function (a) {
        !this._loaded || this.dragging && this.dragging.moved() || (this.fire("preclick"), this._fireMouseEvent(a))
    }, _fireMouseEvent: function (a) {
        if (this._loaded) {
            var b = a.type;
            if (b = "mouseenter" === b ? "mouseover" : "mouseleave" === b ? "mouseout" : b, this.hasEventListeners(b)) {
                "contextmenu" === b && e.DomEvent.preventDefault(a);
                var c = this.mouseEventToContainerPoint(a), d = this.containerPointToLayerPoint(c), f = this.layerPointToLatLng(d);
                this.fire(b, {latlng: f, layerPoint: d, containerPoint: c, originalEvent: a})
            }
        }
    }, _onTileLayerLoad: function () {
        this._tileLayersToLoad--, this._tileLayersNum && !this._tileLayersToLoad && this.fire("tilelayersload")
    }, _clearHandlers: function () {
        for (var a = 0, b = this._handlers.length; b > a; a++)this._handlers[a].disable()
    }, whenReady: function (a, b) {
        return this._loaded ? a.call(b || this, this) : this.on("load", a, b), this
    }, _layerAdd: function (a) {
        a.onAdd(this), this.fire("layeradd", {layer: a})
    }, _getMapPanePos: function () {
        return e.DomUtil.getPosition(this._mapPane)
    }, _moved: function () {
        var a = this._getMapPanePos();
        return a && !a.equals([0, 0])
    }, _getTopLeftPoint: function () {
        return this.getPixelOrigin().subtract(this._getMapPanePos())
    }, _getNewTopLeftPoint: function (a, b) {
        var c = this.getSize()._divideBy(2);
        return this.project(a, b)._subtract(c)._round()
    }, _latLngToNewLayerPoint: function (a, b, c) {
        var d = this._getNewTopLeftPoint(c, b).add(this._getMapPanePos());
        return this.project(a, b)._subtract(d)
    }, _getCenterLayerPoint: function () {
        return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
    }, _getCenterOffset: function (a) {
        return this.latLngToLayerPoint(a).subtract(this._getCenterLayerPoint())
    }, _limitZoom: function (a) {
        var b = this.getMinZoom(), c = this.getMaxZoom();
        return Math.max(b, Math.min(c, a))
    }}), e.map = function (a, b) {
        return new e.Map(a, b)
    }, e.Projection.Mercator = {MAX_LATITUDE: 85.0840591556, R_MINOR: 6356752.3142, R_MAJOR: 6378137, project: function (a) {
        var b = e.LatLng.DEG_TO_RAD, c = this.MAX_LATITUDE, d = Math.max(Math.min(c, a.lat), -c), f = this.R_MAJOR, g = this.R_MINOR, h = a.lng * b * f, i = d * b, j = g / f, k = Math.sqrt(1 - j * j), l = k * Math.sin(i);
        l = Math.pow((1 - l) / (1 + l), .5 * k);
        var m = Math.tan(.5 * (.5 * Math.PI - i)) / l;
        return i = -g * Math.log(m), new e.Point(h, i)
    }, unproject: function (a) {
        for (var b, c = e.LatLng.RAD_TO_DEG, d = this.R_MAJOR, f = this.R_MINOR, g = a.x * c / d, h = f / d, i = Math.sqrt(1 - h * h), j = Math.exp(-a.y / f), k = Math.PI / 2 - 2 * Math.atan(j), l = 15, m = 1e-7, n = l, o = .1; Math.abs(o) > m && --n > 0;)b = i * Math.sin(k), o = Math.PI / 2 - 2 * Math.atan(j * Math.pow((1 - b) / (1 + b), .5 * i)) - k, k += o;
        return new e.LatLng(k * c, g)
    }}, e.CRS.EPSG3395 = e.extend({}, e.CRS, {code: "EPSG:3395", projection: e.Projection.Mercator, transformation: function () {
        var a = e.Projection.Mercator, b = a.R_MAJOR, c = a.R_MINOR;
        return new e.Transformation(.5 / (Math.PI * b), .5, -.5 / (Math.PI * c), .5)
    }()}), e.TileLayer = e.Class.extend({includes: e.Mixin.Events, options: {minZoom: 0, maxZoom: 18, tileSize: 256, subdomains: "abc", errorTileUrl: "", attribution: "", zoomOffset: 0, opacity: 1, unloadInvisibleTiles: e.Browser.mobile, updateWhenIdle: e.Browser.mobile}, initialize: function (a, b) {
        b = e.setOptions(this, b), b.detectRetina && e.Browser.retina && b.maxZoom > 0 && (b.tileSize = Math.floor(b.tileSize / 2), b.zoomOffset++, b.minZoom > 0 && b.minZoom--, this.options.maxZoom--), b.bounds && (b.bounds = e.latLngBounds(b.bounds)), this._url = a;
        var c = this.options.subdomains;
        "string" == typeof c && (this.options.subdomains = c.split(""))
    }, onAdd: function (a) {
        this._map = a, this._animated = a.options.zoomAnimation && e.Browser.any3d, this._initContainer(), this._createTileProto(), a.on({viewreset: this._reset, moveend: this._update}, this), this._animated && a.on({zoomanim: this._animateZoom, zoomend: this._endZoomAnim}, this), this.options.updateWhenIdle || (this._limitedUpdate = e.Util.limitExecByInterval(this._update, 150, this), a.on("move", this._limitedUpdate, this)), this._reset(), this._update()
    }, addTo: function (a) {
        return a.addLayer(this), this
    }, onRemove: function (a) {
        this._container.parentNode.removeChild(this._container), a.off({viewreset: this._reset, moveend: this._update}, this), this._animated && a.off({zoomanim: this._animateZoom, zoomend: this._endZoomAnim}, this), this.options.updateWhenIdle || a.off("move", this._limitedUpdate, this), this._container = null, this._map = null
    }, bringToFront: function () {
        var a = this._map._panes.tilePane;
        return this._container && (a.appendChild(this._container), this._setAutoZIndex(a, Math.max)), this
    }, bringToBack: function () {
        var a = this._map._panes.tilePane;
        return this._container && (a.insertBefore(this._container, a.firstChild), this._setAutoZIndex(a, Math.min)), this
    }, getAttribution: function () {
        return this.options.attribution
    }, getContainer: function () {
        return this._container
    }, setOpacity: function (a) {
        return this.options.opacity = a, this._map && this._updateOpacity(), this
    }, setZIndex: function (a) {
        return this.options.zIndex = a, this._updateZIndex(), this
    }, setUrl: function (a, b) {
        return this._url = a, b || this.redraw(), this
    }, redraw: function () {
        return this._map && (this._reset({hard: !0}), this._update()), this
    }, _updateZIndex: function () {
        this._container && this.options.zIndex !== c && (this._container.style.zIndex = this.options.zIndex)
    }, _setAutoZIndex: function (a, b) {
        var c, d, e, f = a.children, g = -b(1 / 0, -1 / 0);
        for (d = 0, e = f.length; e > d; d++)f[d] !== this._container && (c = parseInt(f[d].style.zIndex, 10), isNaN(c) || (g = b(g, c)));
        this.options.zIndex = this._container.style.zIndex = (isFinite(g) ? g : 0) + b(1, -1)
    }, _updateOpacity: function () {
        var a, b = this._tiles;
        if (e.Browser.ielt9)for (a in b)e.DomUtil.setOpacity(b[a], this.options.opacity); else e.DomUtil.setOpacity(this._container, this.options.opacity);
        if (e.Browser.webkit)for (a in b)b[a].style.webkitTransform += " translate(0,0)"
    }, _initContainer: function () {
        var a = this._map._panes.tilePane;
        if (!this._container) {
            if (this._container = e.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), this._animated) {
                var b = "leaflet-tile-container leaflet-zoom-animated";
                this._bgBuffer = e.DomUtil.create("div", b, this._container), this._bgBuffer.style.zIndex = 1, this._tileContainer = e.DomUtil.create("div", b, this._container), this._tileContainer.style.zIndex = 2
            } else this._tileContainer = this._container;
            a.appendChild(this._container), this.options.opacity < 1 && this._updateOpacity()
        }
    }, _reset: function (a) {
        for (var b in this._tiles)this.fire("tileunload", {tile: this._tiles[b]});
        this._tiles = {}, this._tilesToLoad = 0, this.options.reuseTiles && (this._unusedTiles = []), this._tileContainer.innerHTML = "", this._animated && a && a.hard && this._clearBgBuffer(), this._initContainer()
    }, _update: function () {
        if (this._map) {
            var a = this._map.getPixelBounds(), b = this._map.getZoom(), c = this.options.tileSize;
            if (!(b > this.options.maxZoom || b < this.options.minZoom)) {
                var d = e.bounds(a.min.divideBy(c)._floor(), a.max.divideBy(c)._floor());
                this._addTilesFromCenterOut(d), (this.options.unloadInvisibleTiles || this.options.reuseTiles) && this._removeOtherTiles(d)
            }
        }
    }, _addTilesFromCenterOut: function (a) {
        var c, d, f, g = [], h = a.getCenter();
        for (c = a.min.y; c <= a.max.y; c++)for (d = a.min.x; d <= a.max.x; d++)f = new e.Point(d, c), this._tileShouldBeLoaded(f) && g.push(f);
        var i = g.length;
        if (0 !== i) {
            g.sort(function (a, b) {
                return a.distanceTo(h) - b.distanceTo(h)
            });
            var j = b.createDocumentFragment();
            for (this._tilesToLoad || this.fire("loading"), this._tilesToLoad += i, d = 0; i > d; d++)this._addTile(g[d], j);
            this._tileContainer.appendChild(j)
        }
    }, _tileShouldBeLoaded: function (a) {
        if (a.x + ":" + a.y in this._tiles)return!1;
        var b = this.options;
        if (!b.continuousWorld) {
            var c = this._getWrapTileNum();
            if (b.noWrap && (a.x < 0 || a.x >= c) || a.y < 0 || a.y >= c)return!1
        }
        if (b.bounds) {
            var d = b.tileSize, e = a.multiplyBy(d), f = e.add([d, d]), g = this._map.unproject(e), h = this._map.unproject(f);
            if (b.continuousWorld || b.noWrap || (g = g.wrap(), h = h.wrap()), !b.bounds.intersects([g, h]))return!1
        }
        return!0
    }, _removeOtherTiles: function (a) {
        var b, c, d, e;
        for (e in this._tiles)b = e.split(":"), c = parseInt(b[0], 10), d = parseInt(b[1], 10), (c < a.min.x || c > a.max.x || d < a.min.y || d > a.max.y) && this._removeTile(e)
    }, _removeTile: function (a) {
        var b = this._tiles[a];
        this.fire("tileunload", {tile: b, url: b.src}), this.options.reuseTiles ? (e.DomUtil.removeClass(b, "leaflet-tile-loaded"), this._unusedTiles.push(b)) : b.parentNode === this._tileContainer && this._tileContainer.removeChild(b), e.Browser.android || (b.onload = null, b.src = e.Util.emptyImageUrl), delete this._tiles[a]
    }, _addTile: function (a, b) {
        var c = this._getTilePos(a), d = this._getTile();
        e.DomUtil.setPosition(d, c, e.Browser.chrome || e.Browser.android23), this._tiles[a.x + ":" + a.y] = d, this._loadTile(d, a), d.parentNode !== this._tileContainer && b.appendChild(d)
    }, _getZoomForUrl: function () {
        var a = this.options, b = this._map.getZoom();
        return a.zoomReverse && (b = a.maxZoom - b), b + a.zoomOffset
    }, _getTilePos: function (a) {
        var b = this._map.getPixelOrigin(), c = this.options.tileSize;
        return a.multiplyBy(c).subtract(b)
    }, getTileUrl: function (a) {
        return e.Util.template(this._url, e.extend({s: this._getSubdomain(a), z: a.z, x: a.x, y: a.y}, this.options))
    }, _getWrapTileNum: function () {
        return Math.pow(2, this._getZoomForUrl())
    }, _adjustTilePoint: function (a) {
        var b = this._getWrapTileNum();
        this.options.continuousWorld || this.options.noWrap || (a.x = (a.x % b + b) % b), this.options.tms && (a.y = b - a.y - 1), a.z = this._getZoomForUrl()
    }, _getSubdomain: function (a) {
        var b = Math.abs(a.x + a.y) % this.options.subdomains.length;
        return this.options.subdomains[b]
    }, _createTileProto: function () {
        var a = this._tileImg = e.DomUtil.create("img", "leaflet-tile");
        a.style.width = a.style.height = this.options.tileSize + "px", a.galleryimg = "no"
    }, _getTile: function () {
        if (this.options.reuseTiles && this._unusedTiles.length > 0) {
            var a = this._unusedTiles.pop();
            return this._resetTile(a), a
        }
        return this._createTile()
    }, _resetTile: function () {
    }, _createTile: function () {
        var a = this._tileImg.cloneNode(!1);
        return a.onselectstart = a.onmousemove = e.Util.falseFn, e.Browser.ielt9 && this.options.opacity !== c && e.DomUtil.setOpacity(a, this.options.opacity), a
    }, _loadTile: function (a, b) {
        a._layer = this, a.onload = this._tileOnLoad, a.onerror = this._tileOnError, this._adjustTilePoint(b), a.src = this.getTileUrl(b)
    }, _tileLoaded: function () {
        this._tilesToLoad--, this._tilesToLoad || (this.fire("load"), this._animated && (clearTimeout(this._clearBgBufferTimer), this._clearBgBufferTimer = setTimeout(e.bind(this._clearBgBuffer, this), 500)))
    }, _tileOnLoad: function () {
        var a = this._layer;
        this.src !== e.Util.emptyImageUrl && (e.DomUtil.addClass(this, "leaflet-tile-loaded"), a.fire("tileload", {tile: this, url: this.src})), a._tileLoaded()
    }, _tileOnError: function () {
        var a = this._layer;
        a.fire("tileerror", {tile: this, url: this.src});
        var b = a.options.errorTileUrl;
        b && (this.src = b), a._tileLoaded()
    }}), e.tileLayer = function (a, b) {
        return new e.TileLayer(a, b)
    }, e.TileLayer.WMS = e.TileLayer.extend({defaultWmsParams: {service: "WMS", request: "GetMap", version: "1.1.1", layers: "", styles: "", format: "image/jpeg", transparent: !1}, initialize: function (a, b) {
        this._url = a;
        var c = e.extend({}, this.defaultWmsParams), d = b.tileSize || this.options.tileSize;
        c.width = c.height = b.detectRetina && e.Browser.retina ? 2 * d : d;
        for (var f in b)this.options.hasOwnProperty(f) || (c[f] = b[f]);
        this.wmsParams = c, e.setOptions(this, b)
    }, onAdd: function (a) {
        var b = parseFloat(this.wmsParams.version) >= 1.3 ? "crs" : "srs";
        this.wmsParams[b] = a.options.crs.code, e.TileLayer.prototype.onAdd.call(this, a)
    }, getTileUrl: function (a, b) {
        var c = this._map, d = c.options.crs, f = this.options.tileSize, g = a.multiplyBy(f), h = g.add([f, f]), i = d.project(c.unproject(g, b)), j = d.project(c.unproject(h, b)), k = [i.x, j.y, j.x, i.y].join(","), l = e.Util.template(this._url, {s: this._getSubdomain(a)});
        return l + e.Util.getParamString(this.wmsParams, l, !0) + "&BBOX=" + k
    }, setParams: function (a, b) {
        return e.extend(this.wmsParams, a), b || this.redraw(), this
    }}), e.tileLayer.wms = function (a, b) {
        return new e.TileLayer.WMS(a, b)
    }, e.TileLayer.Canvas = e.TileLayer.extend({options: {async: !1}, initialize: function (a) {
        e.setOptions(this, a)
    }, redraw: function () {
        for (var a in this._tiles)this._redrawTile(this._tiles[a]);
        return this
    }, _redrawTile: function (a) {
        this.drawTile(a, a._tilePoint, this._map._zoom)
    }, _createTileProto: function () {
        var a = this._canvasProto = e.DomUtil.create("canvas", "leaflet-tile");
        a.width = a.height = this.options.tileSize
    }, _createTile: function () {
        var a = this._canvasProto.cloneNode(!1);
        return a.onselectstart = a.onmousemove = e.Util.falseFn, a
    }, _loadTile: function (a, b) {
        a._layer = this, a._tilePoint = b, this._redrawTile(a), this.options.async || this.tileDrawn(a)
    }, drawTile: function () {
    }, tileDrawn: function (a) {
        this._tileOnLoad.call(a)
    }}), e.tileLayer.canvas = function (a) {
        return new e.TileLayer.Canvas(a)
    }, e.ImageOverlay = e.Class.extend({includes: e.Mixin.Events, options: {opacity: 1}, initialize: function (a, b, c) {
        this._url = a, this._bounds = e.latLngBounds(b), e.setOptions(this, c)
    }, onAdd: function (a) {
        this._map = a, this._image || this._initImage(), a._panes.overlayPane.appendChild(this._image), a.on("viewreset", this._reset, this), a.options.zoomAnimation && e.Browser.any3d && a.on("zoomanim", this._animateZoom, this), this._reset()
    }, onRemove: function (a) {
        a.getPanes().overlayPane.removeChild(this._image), a.off("viewreset", this._reset, this), a.options.zoomAnimation && a.off("zoomanim", this._animateZoom, this)
    }, addTo: function (a) {
        return a.addLayer(this), this
    }, setOpacity: function (a) {
        return this.options.opacity = a, this._updateOpacity(), this
    }, bringToFront: function () {
        return this._image && this._map._panes.overlayPane.appendChild(this._image), this
    }, bringToBack: function () {
        var a = this._map._panes.overlayPane;
        return this._image && a.insertBefore(this._image, a.firstChild), this
    }, _initImage: function () {
        this._image = e.DomUtil.create("img", "leaflet-image-layer"), this._map.options.zoomAnimation && e.Browser.any3d ? e.DomUtil.addClass(this._image, "leaflet-zoom-animated") : e.DomUtil.addClass(this._image, "leaflet-zoom-hide"), this._updateOpacity(), e.extend(this._image, {galleryimg: "no", onselectstart: e.Util.falseFn, onmousemove: e.Util.falseFn, onload: e.bind(this._onImageLoad, this), src: this._url})
    }, _animateZoom: function (a) {
        var b = this._map, c = this._image, d = b.getZoomScale(a.zoom), f = this._bounds.getNorthWest(), g = this._bounds.getSouthEast(), h = b._latLngToNewLayerPoint(f, a.zoom, a.center), i = b._latLngToNewLayerPoint(g, a.zoom, a.center)._subtract(h), j = h._add(i._multiplyBy(.5 * (1 - 1 / d)));
        c.style[e.DomUtil.TRANSFORM] = e.DomUtil.getTranslateString(j) + " scale(" + d + ") "
    }, _reset: function () {
        var a = this._image, b = this._map.latLngToLayerPoint(this._bounds.getNorthWest()), c = this._map.latLngToLayerPoint(this._bounds.getSouthEast())._subtract(b);
        e.DomUtil.setPosition(a, b), a.style.width = c.x + "px", a.style.height = c.y + "px"
    }, _onImageLoad: function () {
        this.fire("load")
    }, _updateOpacity: function () {
        e.DomUtil.setOpacity(this._image, this.options.opacity)
    }}), e.imageOverlay = function (a, b, c) {
        return new e.ImageOverlay(a, b, c)
    }, e.Icon = e.Class.extend({options: {className: ""}, initialize: function (a) {
        e.setOptions(this, a)
    }, createIcon: function (a) {
        return this._createIcon("icon", a)
    }, createShadow: function (a) {
        return this._createIcon("shadow", a)
    }, _createIcon: function (a, b) {
        var c = this._getIconUrl(a);
        if (!c) {
            if ("icon" === a)throw new Error("iconUrl not set in Icon options (see the docs).");
            return null
        }
        var d;
        return d = b && "IMG" === b.tagName ? this._createImg(c, b) : this._createImg(c), this._setIconStyles(d, a), d
    }, _setIconStyles: function (a, b) {
        var c, d = this.options, f = e.point(d[b + "Size"]);
        c = "shadow" === b ? e.point(d.shadowAnchor || d.iconAnchor) : e.point(d.iconAnchor), !c && f && (c = f.divideBy(2, !0)), a.className = "leaflet-marker-" + b + " " + d.className, c && (a.style.marginLeft = -c.x + "px", a.style.marginTop = -c.y + "px"), f && (a.style.width = f.x + "px", a.style.height = f.y + "px")
    }, _createImg: function (a, c) {
        return e.Browser.ie6 ? (c || (c = b.createElement("div")), c.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + a + '")') : (c || (c = b.createElement("img")), c.src = a), c
    }, _getIconUrl: function (a) {
        return e.Browser.retina && this.options[a + "RetinaUrl"] ? this.options[a + "RetinaUrl"] : this.options[a + "Url"]
    }}), e.icon = function (a) {
        return new e.Icon(a)
    }, e.Icon.Default = e.Icon.extend({options: {iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]}, _getIconUrl: function (a) {
        var b = a + "Url";
        if (this.options[b])return this.options[b];
        e.Browser.retina && "icon" === a && (a += "-2x");
        var c = e.Icon.Default.imagePath;
        if (!c)throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
        return c + "/marker-" + a + ".png"
    }}), e.Icon.Default.imagePath = function () {
        var a, c, d, e, f, g = b.getElementsByTagName("script"), h = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
        for (a = 0, c = g.length; c > a; a++)if (d = g[a].src, e = d.match(h))return f = d.split(h)[0], (f ? f + "/" : "") + "images"
    }(), e.Marker = e.Class.extend({includes: e.Mixin.Events, options: {icon: new e.Icon.Default, title: "", clickable: !0, draggable: !1, zIndexOffset: 0, opacity: 1, riseOnHover: !1, riseOffset: 250}, initialize: function (a, b) {
        e.setOptions(this, b), this._latlng = e.latLng(a)
    }, onAdd: function (a) {
        this._map = a, a.on("viewreset", this.update, this), this._initIcon(), this.update(), a.options.zoomAnimation && a.options.markerZoomAnimation && a.on("zoomanim", this._animateZoom, this)
    }, addTo: function (a) {
        return a.addLayer(this), this
    }, onRemove: function (a) {
        this.dragging && this.dragging.disable(), this._removeIcon(), this.fire("remove"), a.off({viewreset: this.update, zoomanim: this._animateZoom}, this), this._map = null
    }, getLatLng: function () {
        return this._latlng
    }, setLatLng: function (a) {
        return this._latlng = e.latLng(a), this.update(), this.fire("move", {latlng: this._latlng})
    }, setZIndexOffset: function (a) {
        return this.options.zIndexOffset = a, this.update(), this
    }, setIcon: function (a) {
        return this.options.icon = a, this._map && (this._initIcon(), this.update()), this
    }, update: function () {
        if (this._icon) {
            var a = this._map.latLngToLayerPoint(this._latlng).round();
            this._setPos(a)
        }
        return this
    }, _initIcon: function () {
        var a = this.options, b = this._map, c = b.options.zoomAnimation && b.options.markerZoomAnimation, d = c ? "leaflet-zoom-animated" : "leaflet-zoom-hide", f = !1, g = this._icon;
        if (g) {
            var h = a.icon.createIcon(this._icon);
            h !== this._icon && (this._removeIcon(), this._icon = h, g = !1)
        } else this._icon = a.icon.createIcon();
        a.title && (this._icon.title = a.title), this._initInteraction(), f = a.opacity < 1, e.DomUtil.addClass(this._icon, d), a.riseOnHover && e.DomEvent.on(this._icon, "mouseover", this._bringToFront, this).on(this._icon, "mouseout", this._resetZIndex, this);
        var i = this._shadow;
        i ? this._shadow = a.icon.createShadow(this._shadow) : (this._shadow = a.icon.createShadow(), this._shadow && (e.DomUtil.addClass(this._shadow, d), f = a.opacity < 1)), f && this._updateOpacity();
        var j = this._map._panes;
        g || j.markerPane.appendChild(this._icon), this._shadow && !i && j.shadowPane.appendChild(this._shadow)
    }, _removeIcon: function () {
        var a = this._map._panes;
        this.options.riseOnHover && e.DomEvent.off(this._icon, "mouseover", this._bringToFront).off(this._icon, "mouseout", this._resetZIndex), a.markerPane.removeChild(this._icon), this._shadow && a.shadowPane.removeChild(this._shadow), this._icon = this._shadow = null
    }, _setPos: function (a) {
        e.DomUtil.setPosition(this._icon, a), this._shadow && e.DomUtil.setPosition(this._shadow, a), this._zIndex = a.y + this.options.zIndexOffset, this._resetZIndex()
    }, _updateZIndex: function (a) {
        this._icon.style.zIndex = this._zIndex + a
    }, _animateZoom: function (a) {
        var b = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
        this._setPos(b)
    }, _initInteraction: function () {
        if (this.options.clickable) {
            var a = this._icon, b = ["dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"];
            e.DomUtil.addClass(a, "leaflet-clickable"), e.DomEvent.on(a, "click", this._onMouseClick, this);
            for (var c = 0; c < b.length; c++)e.DomEvent.on(a, b[c], this._fireMouseEvent, this);
            e.Handler.MarkerDrag && (this.dragging = new e.Handler.MarkerDrag(this), this.options.draggable && this.dragging.enable())
        }
    }, _onMouseClick: function (a) {
        var b = this.dragging && this.dragging.moved();
        (this.hasEventListeners(a.type) || b) && e.DomEvent.stopPropagation(a), b || (this.dragging && this.dragging._enabled || !this._map.dragging || !this._map.dragging.moved()) && this.fire(a.type, {originalEvent: a, latlng: this._latlng})
    }, _fireMouseEvent: function (a) {
        this.fire(a.type, {originalEvent: a, latlng: this._latlng}), "contextmenu" === a.type && this.hasEventListeners(a.type) && e.DomEvent.preventDefault(a), "mousedown" !== a.type && e.DomEvent.stopPropagation(a)
    }, setOpacity: function (a) {
        this.options.opacity = a, this._map && this._updateOpacity()
    }, _updateOpacity: function () {
        e.DomUtil.setOpacity(this._icon, this.options.opacity), this._shadow && e.DomUtil.setOpacity(this._shadow, this.options.opacity)
    }, _bringToFront: function () {
        this._updateZIndex(this.options.riseOffset)
    }, _resetZIndex: function () {
        this._updateZIndex(0)
    }}), e.marker = function (a, b) {
        return new e.Marker(a, b)
    }, e.DivIcon = e.Icon.extend({options: {iconSize: [12, 12], className: "leaflet-div-icon", html: !1}, createIcon: function (a) {
        var c = a && "DIV" === a.tagName ? a : b.createElement("div"), d = this.options;
        return c.innerHTML = d.html !== !1 ? d.html : "", d.bgPos && (c.style.backgroundPosition = -d.bgPos.x + "px " + -d.bgPos.y + "px"), this._setIconStyles(c, "icon"), c
    }, createShadow: function () {
        return null
    }}), e.divIcon = function (a) {
        return new e.DivIcon(a)
    }, e.Map.mergeOptions({closePopupOnClick: !0}), e.Popup = e.Class.extend({includes: e.Mixin.Events, options: {minWidth: 50, maxWidth: 300, maxHeight: null, autoPan: !0, closeButton: !0, offset: [0, 7], autoPanPadding: [5, 5], keepInView: !1, className: "", zoomAnimation: !0}, initialize: function (a, b) {
        e.setOptions(this, a), this._source = b, this._animated = e.Browser.any3d && this.options.zoomAnimation
    }, onAdd: function (a) {
        this._map = a, this._container || this._initLayout(), this._updateContent();
        var b = a.options.fadeAnimation;
        b && e.DomUtil.setOpacity(this._container, 0), a._panes.popupPane.appendChild(this._container), a.on(this._getEvents(), this), this._update(), b && e.DomUtil.setOpacity(this._container, 1), this.fire("open"), a.fire("popupopen", {popup: this}), this._source && this._source.fire("popupopen", {popup: this})
    }, addTo: function (a) {
        return a.addLayer(this), this
    }, openOn: function (a) {
        return a.openPopup(this), this
    }, onRemove: function (a) {
        a._panes.popupPane.removeChild(this._container), e.Util.falseFn(this._container.offsetWidth), a.off(this._getEvents(), this), a.options.fadeAnimation && e.DomUtil.setOpacity(this._container, 0), this._map = null, this.fire("close"), a.fire("popupclose", {popup: this}), this._source && this._source.fire("popupclose", {popup: this})
    }, setLatLng: function (a) {
        return this._latlng = e.latLng(a), this._update(), this
    }, setContent: function (a) {
        return this._content = a, this._update(), this
    }, _getEvents: function () {
        var a = {viewreset: this._updatePosition};
        return this._animated && (a.zoomanim = this._zoomAnimation), ("closeOnClick"in this.options ? this.options.closeOnClick : this._map.options.closePopupOnClick) && (a.preclick = this._close), this.options.keepInView && (a.moveend = this._adjustPan), a
    }, _close: function () {
        this._map && this._map.closePopup(this)
    }, _initLayout: function () {
        var a, b = "leaflet-popup", c = b + " " + this.options.className + " leaflet-zoom-" + (this._animated ? "animated" : "hide"), d = this._container = e.DomUtil.create("div", c);
        this.options.closeButton && (a = this._closeButton = e.DomUtil.create("a", b + "-close-button", d), a.href = "#close", a.innerHTML = "&#215;", e.DomEvent.disableClickPropagation(a), e.DomEvent.on(a, "click", this._onCloseButtonClick, this));
        var f = this._wrapper = e.DomUtil.create("div", b + "-content-wrapper", d);
        e.DomEvent.disableClickPropagation(f), this._contentNode = e.DomUtil.create("div", b + "-content", f), e.DomEvent.on(this._contentNode, "mousewheel", e.DomEvent.stopPropagation), e.DomEvent.on(f, "contextmenu", e.DomEvent.stopPropagation), this._tipContainer = e.DomUtil.create("div", b + "-tip-container", d), this._tip = e.DomUtil.create("div", b + "-tip", this._tipContainer)
    }, _update: function () {
        this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
    }, _updateContent: function () {
        if (this._content) {
            if ("string" == typeof this._content)this._contentNode.innerHTML = this._content; else {
                for (; this._contentNode.hasChildNodes();)this._contentNode.removeChild(this._contentNode.firstChild);
                this._contentNode.appendChild(this._content)
            }
            this.fire("contentupdate")
        }
    }, _updateLayout: function () {
        var a = this._contentNode, b = a.style;
        b.width = "", b.whiteSpace = "nowrap";
        var c = a.offsetWidth;
        c = Math.min(c, this.options.maxWidth), c = Math.max(c, this.options.minWidth), b.width = c + 1 + "px", b.whiteSpace = "", b.height = "";
        var d = a.offsetHeight, f = this.options.maxHeight, g = "leaflet-popup-scrolled";
        f && d > f ? (b.height = f + "px", e.DomUtil.addClass(a, g)) : e.DomUtil.removeClass(a, g), this._containerWidth = this._container.offsetWidth
    }, _updatePosition: function () {
        if (this._map) {
            var a = this._map.latLngToLayerPoint(this._latlng), b = this._animated, c = e.point(this.options.offset);
            b && e.DomUtil.setPosition(this._container, a), this._containerBottom = -c.y - (b ? 0 : a.y), this._containerLeft = -Math.round(this._containerWidth / 2) + c.x + (b ? 0 : a.x), this._container.style.bottom = this._containerBottom + "px", this._container.style.left = this._containerLeft + "px"
        }
    }, _zoomAnimation: function (a) {
        var b = this._map._latLngToNewLayerPoint(this._latlng, a.zoom, a.center);
        e.DomUtil.setPosition(this._container, b)
    }, _adjustPan: function () {
        if (this.options.autoPan) {
            var a = this._map, b = this._container.offsetHeight, c = this._containerWidth, d = new e.Point(this._containerLeft, -b - this._containerBottom);
            this._animated && d._add(e.DomUtil.getPosition(this._container));
            var f = a.layerPointToContainerPoint(d), g = e.point(this.options.autoPanPadding), h = a.getSize(), i = 0, j = 0;
            f.x + c > h.x && (i = f.x + c - h.x + g.x), f.x - i < 0 && (i = f.x - g.x), f.y + b > h.y && (j = f.y + b - h.y + g.y), f.y - j < 0 && (j = f.y - g.y), (i || j) && a.fire("autopanstart").panBy([i, j])
        }
    }, _onCloseButtonClick: function (a) {
        this._close(), e.DomEvent.stop(a)
    }}), e.popup = function (a, b) {
        return new e.Popup(a, b)
    }, e.Map.include({openPopup: function (a, b, c) {
        if (this.closePopup(), !(a instanceof e.Popup)) {
            var d = a;
            a = new e.Popup(c).setLatLng(b).setContent(d)
        }
        return this._popup = a, this.addLayer(a)
    }, closePopup: function (a) {
        return a && a !== this._popup || (a = this._popup, this._popup = null), a && this.removeLayer(a), this
    }}), e.Marker.include({openPopup: function () {
        return this._popup && this._map && !this._map.hasLayer(this._popup) && (this._popup.setLatLng(this._latlng), this._map.openPopup(this._popup)), this
    }, closePopup: function () {
        return this._popup && this._popup._close(), this
    }, bindPopup: function (a, b) {
        var c = e.point(this.options.icon.options.popupAnchor || [0, 0]);
        return c = c.add(e.Popup.prototype.options.offset), b && b.offset && (c = c.add(b.offset)), b = e.extend({offset: c}, b), this._popup || this.on("click", this.openPopup, this).on("remove", this.closePopup, this).on("move", this._movePopup, this), a instanceof e.Popup ? (e.setOptions(a, b), this._popup = a) : this._popup = new e.Popup(b, this).setContent(a), this
    }, setPopupContent: function (a) {
        return this._popup && this._popup.setContent(a), this
    }, unbindPopup: function () {
        return this._popup && (this._popup = null, this.off("click", this.openPopup).off("remove", this.closePopup).off("move", this._movePopup)), this
    }, _movePopup: function (a) {
        this._popup.setLatLng(a.latlng)
    }}), e.LayerGroup = e.Class.extend({initialize: function (a) {
        this._layers = {};
        var b, c;
        if (a)for (b = 0, c = a.length; c > b; b++)this.addLayer(a[b])
    }, addLayer: function (a) {
        var b = this.getLayerId(a);
        return this._layers[b] = a, this._map && this._map.addLayer(a), this
    }, removeLayer: function (a) {
        var b = a in this._layers ? a : this.getLayerId(a);
        return this._map && this._layers[b] && this._map.removeLayer(this._layers[b]), delete this._layers[b], this
    }, hasLayer: function (a) {
        return a ? a in this._layers || this.getLayerId(a)in this._layers : !1
    }, clearLayers: function () {
        return this.eachLayer(this.removeLayer, this), this
    }, invoke: function (a) {
        var b, c, d = Array.prototype.slice.call(arguments, 1);
        for (b in this._layers)c = this._layers[b], c[a] && c[a].apply(c, d);
        return this
    }, onAdd: function (a) {
        this._map = a, this.eachLayer(a.addLayer, a)
    }, onRemove: function (a) {
        this.eachLayer(a.removeLayer, a), this._map = null
    }, addTo: function (a) {
        return a.addLayer(this), this
    }, eachLayer: function (a, b) {
        for (var c in this._layers)a.call(b, this._layers[c]);
        return this
    }, getLayer: function (a) {
        return this._layers[a]
    }, getLayers: function () {
        var a = [];
        for (var b in this._layers)a.push(this._layers[b]);
        return a
    }, setZIndex: function (a) {
        return this.invoke("setZIndex", a)
    }, getLayerId: function (a) {
        return e.stamp(a)
    }}), e.layerGroup = function (a) {
        return new e.LayerGroup(a)
    }, e.FeatureGroup = e.LayerGroup.extend({includes: e.Mixin.Events, statics: {EVENTS: "click dblclick mouseover mouseout mousemove contextmenu"}, addLayer: function (a) {
        return this.hasLayer(a) ? this : (a.on(e.FeatureGroup.EVENTS, this._propagateEvent, this), e.LayerGroup.prototype.addLayer.call(this, a), this._popupContent && a.bindPopup && a.bindPopup(this._popupContent, this._popupOptions), this.fire("layeradd", {layer: a}))
    }, removeLayer: function (a) {
        return a in this._layers && (a = this._layers[a]), a.off(e.FeatureGroup.EVENTS, this._propagateEvent, this), e.LayerGroup.prototype.removeLayer.call(this, a), this._popupContent && this.invoke("unbindPopup"), this.fire("layerremove", {layer: a})
    }, bindPopup: function (a, b) {
        return this._popupContent = a, this._popupOptions = b, this.invoke("bindPopup", a, b)
    }, setStyle: function (a) {
        return this.invoke("setStyle", a)
    }, bringToFront: function () {
        return this.invoke("bringToFront")
    }, bringToBack: function () {
        return this.invoke("bringToBack")
    }, getBounds: function () {
        var a = new e.LatLngBounds;
        return this.eachLayer(function (b) {
            a.extend(b instanceof e.Marker ? b.getLatLng() : b.getBounds())
        }), a
    }, _propagateEvent: function (a) {
        a.layer || (a.layer = a.target), a.target = this, this.fire(a.type, a)
    }}), e.featureGroup = function (a) {
        return new e.FeatureGroup(a)
    }, e.Path = e.Class.extend({includes: [e.Mixin.Events], statics: {CLIP_PADDING: e.Browser.mobile ? Math.max(0, Math.min(.5, (1280 / Math.max(a.innerWidth, a.innerHeight) - 1) / 2)) : .5}, options: {stroke: !0, color: "#0033ff", dashArray: null, weight: 5, opacity: .5, fill: !1, fillColor: null, fillOpacity: .2, clickable: !0}, initialize: function (a) {
        e.setOptions(this, a)
    }, onAdd: function (a) {
        this._map = a, this._container || (this._initElements(), this._initEvents()), this.projectLatlngs(), this._updatePath(), this._container && this._map._pathRoot.appendChild(this._container), this.fire("add"), a.on({viewreset: this.projectLatlngs, moveend: this._updatePath}, this)
    }, addTo: function (a) {
        return a.addLayer(this), this
    }, onRemove: function (a) {
        a._pathRoot.removeChild(this._container), this.fire("remove"), this._map = null, e.Browser.vml && (this._container = null, this._stroke = null, this._fill = null), a.off({viewreset: this.projectLatlngs, moveend: this._updatePath}, this)
    }, projectLatlngs: function () {
    }, setStyle: function (a) {
        return e.setOptions(this, a), this._container && this._updateStyle(), this
    }, redraw: function () {
        return this._map && (this.projectLatlngs(), this._updatePath()), this
    }}), e.Map.include({_updatePathViewport: function () {
        var a = e.Path.CLIP_PADDING, b = this.getSize(), c = e.DomUtil.getPosition(this._mapPane), d = c.multiplyBy(-1)._subtract(b.multiplyBy(a)._round()), f = d.add(b.multiplyBy(1 + 2 * a)._round());
        this._pathViewport = new e.Bounds(d, f)
    }}), e.Path.SVG_NS = "http://www.w3.org/2000/svg", e.Browser.svg = !(!b.createElementNS || !b.createElementNS(e.Path.SVG_NS, "svg").createSVGRect), e.Path = e.Path.extend({statics: {SVG: e.Browser.svg}, bringToFront: function () {
        var a = this._map._pathRoot, b = this._container;
        return b && a.lastChild !== b && a.appendChild(b), this
    }, bringToBack: function () {
        var a = this._map._pathRoot, b = this._container, c = a.firstChild;
        return b && c !== b && a.insertBefore(b, c), this
    }, getPathString: function () {
    }, _createElement: function (a) {
        return b.createElementNS(e.Path.SVG_NS, a)
    }, _initElements: function () {
        this._map._initPathRoot(), this._initPath(), this._initStyle()
    }, _initPath: function () {
        this._container = this._createElement("g"), this._path = this._createElement("path"), this._container.appendChild(this._path)
    }, _initStyle: function () {
        this.options.stroke && (this._path.setAttribute("stroke-linejoin", "round"), this._path.setAttribute("stroke-linecap", "round")), this.options.fill && this._path.setAttribute("fill-rule", "evenodd"), this.options.pointerEvents && this._path.setAttribute("pointer-events", this.options.pointerEvents), this.options.clickable || this.options.pointerEvents || this._path.setAttribute("pointer-events", "none"), this._updateStyle()
    }, _updateStyle: function () {
        this.options.stroke ? (this._path.setAttribute("stroke", this.options.color), this._path.setAttribute("stroke-opacity", this.options.opacity), this._path.setAttribute("stroke-width", this.options.weight), this.options.dashArray ? this._path.setAttribute("stroke-dasharray", this.options.dashArray) : this._path.removeAttribute("stroke-dasharray")) : this._path.setAttribute("stroke", "none"), this.options.fill ? (this._path.setAttribute("fill", this.options.fillColor || this.options.color), this._path.setAttribute("fill-opacity", this.options.fillOpacity)) : this._path.setAttribute("fill", "none")
    }, _updatePath: function () {
        var a = this.getPathString();
        a || (a = "M0 0"), this._path.setAttribute("d", a)
    }, _initEvents: function () {
        if (this.options.clickable) {
            (e.Browser.svg || !e.Browser.vml) && this._path.setAttribute("class", "leaflet-clickable"), e.DomEvent.on(this._container, "click", this._onMouseClick, this);
            for (var a = ["dblclick", "mousedown", "mouseover", "mouseout", "mousemove", "contextmenu"], b = 0; b < a.length; b++)e.DomEvent.on(this._container, a[b], this._fireMouseEvent, this)
        }
    }, _onMouseClick: function (a) {
        this._map.dragging && this._map.dragging.moved() || this._fireMouseEvent(a)
    }, _fireMouseEvent: function (a) {
        if (this.hasEventListeners(a.type)) {
            var b = this._map, c = b.mouseEventToContainerPoint(a), d = b.containerPointToLayerPoint(c), f = b.layerPointToLatLng(d);
            this.fire(a.type, {latlng: f, layerPoint: d, containerPoint: c, originalEvent: a}), "contextmenu" === a.type && e.DomEvent.preventDefault(a), "mousemove" !== a.type && e.DomEvent.stopPropagation(a)
        }
    }}), e.Map.include({_initPathRoot: function () {
        this._pathRoot || (this._pathRoot = e.Path.prototype._createElement("svg"), this._panes.overlayPane.appendChild(this._pathRoot), this.options.zoomAnimation && e.Browser.any3d ? (this._pathRoot.setAttribute("class", " leaflet-zoom-animated"), this.on({zoomanim: this._animatePathZoom, zoomend: this._endPathZoom})) : this._pathRoot.setAttribute("class", " leaflet-zoom-hide"), this.on("moveend", this._updateSvgViewport), this._updateSvgViewport())
    }, _animatePathZoom: function (a) {
        var b = this.getZoomScale(a.zoom), c = this._getCenterOffset(a.center)._multiplyBy(-b)._add(this._pathViewport.min);
        this._pathRoot.style[e.DomUtil.TRANSFORM] = e.DomUtil.getTranslateString(c) + " scale(" + b + ") ", this._pathZooming = !0
    }, _endPathZoom: function () {
        this._pathZooming = !1
    }, _updateSvgViewport: function () {
        if (!this._pathZooming) {
            this._updatePathViewport();
            var a = this._pathViewport, b = a.min, c = a.max, d = c.x - b.x, f = c.y - b.y, g = this._pathRoot, h = this._panes.overlayPane;
            e.Browser.mobileWebkit && h.removeChild(g), e.DomUtil.setPosition(g, b), g.setAttribute("width", d), g.setAttribute("height", f), g.setAttribute("viewBox", [b.x, b.y, d, f].join(" ")), e.Browser.mobileWebkit && h.appendChild(g)
        }
    }}), e.Path.include({bindPopup: function (a, b) {
        return a instanceof e.Popup ? this._popup = a : ((!this._popup || b) && (this._popup = new e.Popup(b, this)), this._popup.setContent(a)), this._popupHandlersAdded || (this.on("click", this._openPopup, this).on("remove", this.closePopup, this), this._popupHandlersAdded = !0), this
    }, unbindPopup: function () {
        return this._popup && (this._popup = null, this.off("click", this._openPopup).off("remove", this.closePopup), this._popupHandlersAdded = !1), this
    }, openPopup: function (a) {
        return this._popup && (a = a || this._latlng || this._latlngs[Math.floor(this._latlngs.length / 2)], this._openPopup({latlng: a})), this
    }, closePopup: function () {
        return this._popup && this._popup._close(), this
    }, _openPopup: function (a) {
        this._popup.setLatLng(a.latlng), this._map.openPopup(this._popup)
    }}), e.Browser.vml = !e.Browser.svg && function () {
        try {
            var a = b.createElement("div");
            a.innerHTML = '<v:shape adj="1"/>';
            var c = a.firstChild;
            return c.style.behavior = "url(#default#VML)", c && "object" == typeof c.adj
        } catch (d) {
            return!1
        }
    }(), e.Path = e.Browser.svg || !e.Browser.vml ? e.Path : e.Path.extend({statics: {VML: !0, CLIP_PADDING: .02}, _createElement: function () {
        try {
            return b.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"), function (a) {
                return b.createElement("<lvml:" + a + ' class="lvml">')
            }
        } catch (a) {
            return function (a) {
                return b.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
            }
        }
    }(), _initPath: function () {
        var a = this._container = this._createElement("shape");
        e.DomUtil.addClass(a, "leaflet-vml-shape"), this.options.clickable && e.DomUtil.addClass(a, "leaflet-clickable"), a.coordsize = "1 1", this._path = this._createElement("path"), a.appendChild(this._path), this._map._pathRoot.appendChild(a)
    }, _initStyle: function () {
        this._updateStyle()
    }, _updateStyle: function () {
        var a = this._stroke, b = this._fill, c = this.options, d = this._container;
        d.stroked = c.stroke, d.filled = c.fill, c.stroke ? (a || (a = this._stroke = this._createElement("stroke"), a.endcap = "round", d.appendChild(a)), a.weight = c.weight + "px", a.color = c.color, a.opacity = c.opacity, a.dashStyle = c.dashArray ? c.dashArray instanceof Array ? c.dashArray.join(" ") : c.dashArray.replace(/( *, *)/g, " ") : "") : a && (d.removeChild(a), this._stroke = null), c.fill ? (b || (b = this._fill = this._createElement("fill"), d.appendChild(b)), b.color = c.fillColor || c.color, b.opacity = c.fillOpacity) : b && (d.removeChild(b), this._fill = null)
    }, _updatePath: function () {
        var a = this._container.style;
        a.display = "none", this._path.v = this.getPathString() + " ", a.display = ""
    }}), e.Map.include(e.Browser.svg || !e.Browser.vml ? {} : {_initPathRoot: function () {
        if (!this._pathRoot) {
            var a = this._pathRoot = b.createElement("div");
            a.className = "leaflet-vml-container", this._panes.overlayPane.appendChild(a), this.on("moveend", this._updatePathViewport), this._updatePathViewport()
        }
    }}), e.Browser.canvas = function () {
        return!!b.createElement("canvas").getContext
    }(), e.Path = e.Path.SVG && !a.L_PREFER_CANVAS || !e.Browser.canvas ? e.Path : e.Path.extend({statics: {CANVAS: !0, SVG: !1}, redraw: function () {
        return this._map && (this.projectLatlngs(), this._requestUpdate()), this
    }, setStyle: function (a) {
        return e.setOptions(this, a), this._map && (this._updateStyle(), this._requestUpdate()), this
    }, onRemove: function (a) {
        a.off("viewreset", this.projectLatlngs, this).off("moveend", this._updatePath, this), this.options.clickable && (this._map.off("click", this._onClick, this), this._map.off("mousemove", this._onMouseMove, this)), this._requestUpdate(), this._map = null
    }, _requestUpdate: function () {
        this._map && !e.Path._updateRequest && (e.Path._updateRequest = e.Util.requestAnimFrame(this._fireMapMoveEnd, this._map))
    }, _fireMapMoveEnd: function () {
        e.Path._updateRequest = null, this.fire("moveend")
    }, _initElements: function () {
        this._map._initPathRoot(), this._ctx = this._map._canvasCtx
    }, _updateStyle: function () {
        var a = this.options;
        a.stroke && (this._ctx.lineWidth = a.weight, this._ctx.strokeStyle = a.color), a.fill && (this._ctx.fillStyle = a.fillColor || a.color)
    }, _drawPath: function () {
        var a, b, c, d, f, g;
        for (this._ctx.beginPath(), a = 0, c = this._parts.length; c > a; a++) {
            for (b = 0, d = this._parts[a].length; d > b; b++)f = this._parts[a][b], g = (0 === b ? "move" : "line") + "To", this._ctx[g](f.x, f.y);
            this instanceof e.Polygon && this._ctx.closePath()
        }
    }, _checkIfEmpty: function () {
        return!this._parts.length
    }, _updatePath: function () {
        if (!this._checkIfEmpty()) {
            var a = this._ctx, b = this.options;
            this._drawPath(), a.save(), this._updateStyle(), b.fill && (a.globalAlpha = b.fillOpacity, a.fill()), b.stroke && (a.globalAlpha = b.opacity, a.stroke()), a.restore()
        }
    }, _initEvents: function () {
        this.options.clickable && (this._map.on("mousemove", this._onMouseMove, this), this._map.on("click", this._onClick, this))
    }, _onClick: function (a) {
        this._containsPoint(a.layerPoint) && this.fire("click", a)
    }, _onMouseMove: function (a) {
        this._map && !this._map._animatingZoom && (this._containsPoint(a.layerPoint) ? (this._ctx.canvas.style.cursor = "pointer", this._mouseInside = !0, this.fire("mouseover", a)) : this._mouseInside && (this._ctx.canvas.style.cursor = "", this._mouseInside = !1, this.fire("mouseout", a)))
    }}), e.Map.include(e.Path.SVG && !a.L_PREFER_CANVAS || !e.Browser.canvas ? {} : {_initPathRoot: function () {
        var a, c = this._pathRoot;
        c || (c = this._pathRoot = b.createElement("canvas"), c.style.position = "absolute", a = this._canvasCtx = c.getContext("2d"), a.lineCap = "round", a.lineJoin = "round", this._panes.overlayPane.appendChild(c), this.options.zoomAnimation && (this._pathRoot.className = "leaflet-zoom-animated", this.on("zoomanim", this._animatePathZoom), this.on("zoomend", this._endPathZoom)), this.on("moveend", this._updateCanvasViewport), this._updateCanvasViewport())
    }, _updateCanvasViewport: function () {
        if (!this._pathZooming) {
            this._updatePathViewport();
            var a = this._pathViewport, b = a.min, c = a.max.subtract(b), d = this._pathRoot;
            e.DomUtil.setPosition(d, b), d.width = c.x, d.height = c.y, d.getContext("2d").translate(-b.x, -b.y)
        }
    }}), e.LineUtil = {simplify: function (a, b) {
        if (!b || !a.length)return a.slice();
        var c = b * b;
        return a = this._reducePoints(a, c), a = this._simplifyDP(a, c)
    }, pointToSegmentDistance: function (a, b, c) {
        return Math.sqrt(this._sqClosestPointOnSegment(a, b, c, !0))
    }, closestPointOnSegment: function (a, b, c) {
        return this._sqClosestPointOnSegment(a, b, c)
    }, _simplifyDP: function (a, b) {
        var d = a.length, e = typeof Uint8Array != c + "" ? Uint8Array : Array, f = new e(d);
        f[0] = f[d - 1] = 1, this._simplifyDPStep(a, f, b, 0, d - 1);
        var g, h = [];
        for (g = 0; d > g; g++)f[g] && h.push(a[g]);
        return h
    }, _simplifyDPStep: function (a, b, c, d, e) {
        var f, g, h, i = 0;
        for (g = d + 1; e - 1 >= g; g++)h = this._sqClosestPointOnSegment(a[g], a[d], a[e], !0), h > i && (f = g, i = h);
        i > c && (b[f] = 1, this._simplifyDPStep(a, b, c, d, f), this._simplifyDPStep(a, b, c, f, e))
    }, _reducePoints: function (a, b) {
        for (var c = [a[0]], d = 1, e = 0, f = a.length; f > d; d++)this._sqDist(a[d], a[e]) > b && (c.push(a[d]), e = d);
        return f - 1 > e && c.push(a[f - 1]), c
    }, clipSegment: function (a, b, c, d) {
        var e, f, g, h = d ? this._lastCode : this._getBitCode(a, c), i = this._getBitCode(b, c);
        for (this._lastCode = i; ;) {
            if (!(h | i))return[a, b];
            if (h & i)return!1;
            e = h || i, f = this._getEdgeIntersection(a, b, e, c), g = this._getBitCode(f, c), e === h ? (a = f, h = g) : (b = f, i = g)
        }
    }, _getEdgeIntersection: function (a, b, c, d) {
        var f = b.x - a.x, g = b.y - a.y, h = d.min, i = d.max;
        return 8 & c ? new e.Point(a.x + f * (i.y - a.y) / g, i.y) : 4 & c ? new e.Point(a.x + f * (h.y - a.y) / g, h.y) : 2 & c ? new e.Point(i.x, a.y + g * (i.x - a.x) / f) : 1 & c ? new e.Point(h.x, a.y + g * (h.x - a.x) / f) : void 0
    }, _getBitCode: function (a, b) {
        var c = 0;
        return a.x < b.min.x ? c |= 1 : a.x > b.max.x && (c |= 2), a.y < b.min.y ? c |= 4 : a.y > b.max.y && (c |= 8), c
    }, _sqDist: function (a, b) {
        var c = b.x - a.x, d = b.y - a.y;
        return c * c + d * d
    }, _sqClosestPointOnSegment: function (a, b, c, d) {
        var f, g = b.x, h = b.y, i = c.x - g, j = c.y - h, k = i * i + j * j;
        return k > 0 && (f = ((a.x - g) * i + (a.y - h) * j) / k, f > 1 ? (g = c.x, h = c.y) : f > 0 && (g += i * f, h += j * f)), i = a.x - g, j = a.y - h, d ? i * i + j * j : new e.Point(g, h)
    }}, e.Polyline = e.Path.extend({initialize: function (a, b) {
        e.Path.prototype.initialize.call(this, b), this._latlngs = this._convertLatLngs(a)
    }, options: {smoothFactor: 1, noClip: !1}, projectLatlngs: function () {
        this._originalPoints = [];
        for (var a = 0, b = this._latlngs.length; b > a; a++)this._originalPoints[a] = this._map.latLngToLayerPoint(this._latlngs[a])
    }, getPathString: function () {
        for (var a = 0, b = this._parts.length, c = ""; b > a; a++)c += this._getPathPartStr(this._parts[a]);
        return c
    }, getLatLngs: function () {
        return this._latlngs
    }, setLatLngs: function (a) {
        return this._latlngs = this._convertLatLngs(a), this.redraw()
    }, addLatLng: function (a) {
        return this._latlngs.push(e.latLng(a)), this.redraw()
    }, spliceLatLngs: function () {
        var a = [].splice.apply(this._latlngs, arguments);
        return this._convertLatLngs(this._latlngs, !0), this.redraw(), a
    }, closestLayerPoint: function (a) {
        for (var b, c, d = 1 / 0, f = this._parts, g = null, h = 0, i = f.length; i > h; h++)for (var j = f[h], k = 1, l = j.length; l > k; k++) {
            b = j[k - 1], c = j[k];
            var m = e.LineUtil._sqClosestPointOnSegment(a, b, c, !0);
            d > m && (d = m, g = e.LineUtil._sqClosestPointOnSegment(a, b, c))
        }
        return g && (g.distance = Math.sqrt(d)), g
    }, getBounds: function () {
        return new e.LatLngBounds(this.getLatLngs())
    }, _convertLatLngs: function (a, b) {
        var c, d, f = b ? a : [];
        for (c = 0, d = a.length; d > c; c++) {
            if (e.Util.isArray(a[c]) && "number" != typeof a[c][0])return;
            f[c] = e.latLng(a[c])
        }
        return f
    }, _initEvents: function () {
        e.Path.prototype._initEvents.call(this)
    }, _getPathPartStr: function (a) {
        for (var b, c = e.Path.VML, d = 0, f = a.length, g = ""; f > d; d++)b = a[d], c && b._round(), g += (d ? "L" : "M") + b.x + " " + b.y;
        return g
    }, _clipPoints: function () {
        var a, b, c, d = this._originalPoints, f = d.length;
        if (this.options.noClip)return this._parts = [d], void 0;
        this._parts = [];
        var g = this._parts, h = this._map._pathViewport, i = e.LineUtil;
        for (a = 0, b = 0; f - 1 > a; a++)c = i.clipSegment(d[a], d[a + 1], h, a), c && (g[b] = g[b] || [], g[b].push(c[0]), (c[1] !== d[a + 1] || a === f - 2) && (g[b].push(c[1]), b++))
    }, _simplifyPoints: function () {
        for (var a = this._parts, b = e.LineUtil, c = 0, d = a.length; d > c; c++)a[c] = b.simplify(a[c], this.options.smoothFactor)
    }, _updatePath: function () {
        this._map && (this._clipPoints(), this._simplifyPoints(), e.Path.prototype._updatePath.call(this))
    }}), e.polyline = function (a, b) {
        return new e.Polyline(a, b)
    }, e.PolyUtil = {}, e.PolyUtil.clipPolygon = function (a, b) {
        var c, d, f, g, h, i, j, k, l, m = [1, 4, 2, 8], n = e.LineUtil;
        for (d = 0, j = a.length; j > d; d++)a[d]._code = n._getBitCode(a[d], b);
        for (g = 0; 4 > g; g++) {
            for (k = m[g], c = [], d = 0, j = a.length, f = j - 1; j > d; f = d++)h = a[d], i = a[f], h._code & k ? i._code & k || (l = n._getEdgeIntersection(i, h, k, b), l._code = n._getBitCode(l, b), c.push(l)) : (i._code & k && (l = n._getEdgeIntersection(i, h, k, b), l._code = n._getBitCode(l, b), c.push(l)), c.push(h));
            a = c
        }
        return a
    }, e.Polygon = e.Polyline.extend({options: {fill: !0}, initialize: function (a, b) {
        var c, d, f;
        if (e.Polyline.prototype.initialize.call(this, a, b), a && e.Util.isArray(a[0]) && "number" != typeof a[0][0])for (this._latlngs = this._convertLatLngs(a[0]), this._holes = a.slice(1), c = 0, d = this._holes.length; d > c; c++)f = this._holes[c] = this._convertLatLngs(this._holes[c]), f[0].equals(f[f.length - 1]) && f.pop();
        a = this._latlngs, a.length >= 2 && a[0].equals(a[a.length - 1]) && a.pop()
    }, projectLatlngs: function () {
        if (e.Polyline.prototype.projectLatlngs.call(this), this._holePoints = [], this._holes) {
            var a, b, c, d;
            for (a = 0, c = this._holes.length; c > a; a++)for (this._holePoints[a] = [], b = 0, d = this._holes[a].length; d > b; b++)this._holePoints[a][b] = this._map.latLngToLayerPoint(this._holes[a][b])
        }
    }, _clipPoints: function () {
        var a = this._originalPoints, b = [];
        if (this._parts = [a].concat(this._holePoints), !this.options.noClip) {
            for (var c = 0, d = this._parts.length; d > c; c++) {
                var f = e.PolyUtil.clipPolygon(this._parts[c], this._map._pathViewport);
                f.length && b.push(f)
            }
            this._parts = b
        }
    }, _getPathPartStr: function (a) {
        var b = e.Polyline.prototype._getPathPartStr.call(this, a);
        return b + (e.Browser.svg ? "z" : "x")
    }}), e.polygon = function (a, b) {
        return new e.Polygon(a, b)
    }, function () {
        function a(a) {
            return e.FeatureGroup.extend({initialize: function (a, b) {
                this._layers = {}, this._options = b, this.setLatLngs(a)
            }, setLatLngs: function (b) {
                var c = 0, d = b.length;
                for (this.eachLayer(function (a) {
                    d > c ? a.setLatLngs(b[c++]) : this.removeLayer(a)
                }, this); d > c;)this.addLayer(new a(b[c++], this._options));
                return this
            }})
        }

        e.MultiPolyline = a(e.Polyline), e.MultiPolygon = a(e.Polygon), e.multiPolyline = function (a, b) {
            return new e.MultiPolyline(a, b)
        }, e.multiPolygon = function (a, b) {
            return new e.MultiPolygon(a, b)
        }
    }(), e.Rectangle = e.Polygon.extend({initialize: function (a, b) {
        e.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(a), b)
    }, setBounds: function (a) {
        this.setLatLngs(this._boundsToLatLngs(a))
    }, _boundsToLatLngs: function (a) {
        return a = e.latLngBounds(a), [a.getSouthWest(), a.getNorthWest(), a.getNorthEast(), a.getSouthEast()]
    }}), e.rectangle = function (a, b) {
        return new e.Rectangle(a, b)
    }, e.Circle = e.Path.extend({initialize: function (a, b, c) {
        e.Path.prototype.initialize.call(this, c), this._latlng = e.latLng(a), this._mRadius = b
    }, options: {fill: !0}, setLatLng: function (a) {
        return this._latlng = e.latLng(a), this.redraw()
    }, setRadius: function (a) {
        return this._mRadius = a, this.redraw()
    }, projectLatlngs: function () {
        var a = this._getLngRadius(), b = this._latlng, c = this._map.latLngToLayerPoint([b.lat, b.lng - a]);
        this._point = this._map.latLngToLayerPoint(b), this._radius = Math.max(this._point.x - c.x, 1)
    }, getBounds: function () {
        var a = this._getLngRadius(), b = 360 * (this._mRadius / 40075017), c = this._latlng;
        return new e.LatLngBounds([c.lat - b, c.lng - a], [c.lat + b, c.lng + a])
    }, getLatLng: function () {
        return this._latlng
    }, getPathString: function () {
        var a = this._point, b = this._radius;
        return this._checkIfEmpty() ? "" : e.Browser.svg ? "M" + a.x + "," + (a.y - b) + "A" + b + "," + b + ",0,1,1," + (a.x - .1) + "," + (a.y - b) + " z" : (a._round(), b = Math.round(b), "AL " + a.x + "," + a.y + " " + b + "," + b + " 0," + 23592600)
    }, getRadius: function () {
        return this._mRadius
    }, _getLatRadius: function () {
        return 360 * (this._mRadius / 40075017)
    }, _getLngRadius: function () {
        return this._getLatRadius() / Math.cos(e.LatLng.DEG_TO_RAD * this._latlng.lat)
    }, _checkIfEmpty: function () {
        if (!this._map)return!1;
        var a = this._map._pathViewport, b = this._radius, c = this._point;
        return c.x - b > a.max.x || c.y - b > a.max.y || c.x + b < a.min.x || c.y + b < a.min.y
    }}), e.circle = function (a, b, c) {
        return new e.Circle(a, b, c)
    }, e.CircleMarker = e.Circle.extend({options: {radius: 10, weight: 2}, initialize: function (a, b) {
        e.Circle.prototype.initialize.call(this, a, null, b), this._radius = this.options.radius
    }, projectLatlngs: function () {
        this._point = this._map.latLngToLayerPoint(this._latlng)
    }, _updateStyle: function () {
        e.Circle.prototype._updateStyle.call(this), this.setRadius(this.options.radius)
    }, setRadius: function (a) {
        return this.options.radius = this._radius = a, this.redraw()
    }}), e.circleMarker = function (a, b) {
        return new e.CircleMarker(a, b)
    }, e.Polyline.include(e.Path.CANVAS ? {_containsPoint: function (a, b) {
        var c, d, f, g, h, i, j, k = this.options.weight / 2;
        for (e.Browser.touch && (k += 10), c = 0, g = this._parts.length; g > c; c++)for (j = this._parts[c], d = 0, h = j.length, f = h - 1; h > d; f = d++)if ((b || 0 !== d) && (i = e.LineUtil.pointToSegmentDistance(a, j[f], j[d]), k >= i))return!0;
        return!1
    }} : {}), e.Polygon.include(e.Path.CANVAS ? {_containsPoint: function (a) {
        var b, c, d, f, g, h, i, j, k = !1;
        if (e.Polyline.prototype._containsPoint.call(this, a, !0))return!0;
        for (f = 0, i = this._parts.length; i > f; f++)for (b = this._parts[f], g = 0, j = b.length, h = j - 1; j > g; h = g++)c = b[g], d = b[h], c.y > a.y != d.y > a.y && a.x < (d.x - c.x) * (a.y - c.y) / (d.y - c.y) + c.x && (k = !k);
        return k
    }} : {}), e.Circle.include(e.Path.CANVAS ? {_drawPath: function () {
        var a = this._point;
        this._ctx.beginPath(), this._ctx.arc(a.x, a.y, this._radius, 0, 2 * Math.PI, !1)
    }, _containsPoint: function (a) {
        var b = this._point, c = this.options.stroke ? this.options.weight / 2 : 0;
        return a.distanceTo(b) <= this._radius + c
    }} : {}), e.CircleMarker.include(e.Path.CANVAS ? {_updateStyle: function () {
        e.Path.prototype._updateStyle.call(this)
    }} : {}), e.GeoJSON = e.FeatureGroup.extend({initialize: function (a, b) {
        e.setOptions(this, b), this._layers = {}, a && this.addData(a)
    }, addData: function (a) {
        var b, c, d = e.Util.isArray(a) ? a : a.features;
        if (d) {
            for (b = 0, c = d.length; c > b; b++)(d[b].geometries || d[b].geometry || d[b].features) && this.addData(d[b]);
            return this
        }
        var f = this.options;
        if (!f.filter || f.filter(a)) {
            var g = e.GeoJSON.geometryToLayer(a, f.pointToLayer, f.coordsToLatLng);
            return g.feature = a, g.defaultOptions = g.options, this.resetStyle(g), f.onEachFeature && f.onEachFeature(a, g), this.addLayer(g)
        }
    }, resetStyle: function (a) {
        var b = this.options.style;
        b && (e.Util.extend(a.options, a.defaultOptions), this._setLayerStyle(a, b))
    }, setStyle: function (a) {
        this.eachLayer(function (b) {
            this._setLayerStyle(b, a)
        }, this)
    }, _setLayerStyle: function (a, b) {
        "function" == typeof b && (b = b(a.feature)), a.setStyle && a.setStyle(b)
    }}), e.extend(e.GeoJSON, {geometryToLayer: function (a, b, c) {
        var d, f, g, h, i, j = "Feature" === a.type ? a.geometry : a, k = j.coordinates, l = [];
        switch (c = c || this.coordsToLatLng, j.type) {
            case"Point":
                return d = c(k), b ? b(a, d) : new e.Marker(d);
            case"MultiPoint":
                for (g = 0, h = k.length; h > g; g++)d = c(k[g]), i = b ? b(a, d) : new e.Marker(d), l.push(i);
                return new e.FeatureGroup(l);
            case"LineString":
                return f = this.coordsToLatLngs(k, 0, c), new e.Polyline(f);
            case"Polygon":
                return f = this.coordsToLatLngs(k, 1, c), new e.Polygon(f);
            case"MultiLineString":
                return f = this.coordsToLatLngs(k, 1, c), new e.MultiPolyline(f);
            case"MultiPolygon":
                return f = this.coordsToLatLngs(k, 2, c), new e.MultiPolygon(f);
            case"GeometryCollection":
                for (g = 0, h = j.geometries.length; h > g; g++)i = this.geometryToLayer({geometry: j.geometries[g], type: "Feature", properties: a.properties}, b), l.push(i);
                return new e.FeatureGroup(l);
            default:
                throw new Error("Invalid GeoJSON object.")
        }
    }, coordsToLatLng: function (a) {
        return new e.LatLng(a[1], a[0])
    }, coordsToLatLngs: function (a, b, c) {
        var d, e, f, g = [];
        for (e = 0, f = a.length; f > e; e++)d = b ? this.coordsToLatLngs(a[e], b - 1, c) : (c || this.coordsToLatLng)(a[e]), g.push(d);
        return g
    }, latLngToCoords: function (a) {
        return[a.lng, a.lat]
    }, latLngsToCoords: function (a) {
        for (var b = [], c = 0, d = a.length; d > c; c++)b.push(e.GeoJSON.latLngToCoords(a[c]));
        return b
    }}), e.Marker.include({toGeoJSON: function () {
        return{type: "Point", coordinates: e.GeoJSON.latLngToCoords(this.getLatLng())}
    }}), e.Polyline.include({toGeoJSON: function () {
        return{type: "LineString", coordinates: e.GeoJSON.latLngsToCoords(this.getLatLngs())}
    }}), e.Polygon.include({toGeoJSON: function () {
        var a, b, c, d = [e.GeoJSON.latLngsToCoords(this.getLatLngs())];
        if (d[0].push(d[0][0]), this._holes)for (a = 0, b = this._holes.length; b > a; a++)c = e.GeoJSON.latLngsToCoords(this._holes[a]), c.push(c[0]), d.push(c);
        return{type: "Polygon", coordinates: d}
    }}), function () {
        function a(a, b) {
            a.include({toGeoJSON: function () {
                var a = [];
                return this.eachLayer(function (b) {
                    a.push(b.toGeoJSON().coordinates)
                }), {type: b, coordinates: a}
            }})
        }

        a(e.MultiPolyline, "MultiLineString"), a(e.MultiPolygon, "MultiPolygon")
    }(), e.LayerGroup.include({toGeoJSON: function () {
        var a = [];
        return this.eachLayer(function (b) {
            b.toGeoJSON && a.push(b.toGeoJSON())
        }), {type: "GeometryCollection", geometries: a}
    }}),e.geoJson = function (a, b) {
        return new e.GeoJSON(a, b)
    },e.DomEvent = {addListener: function (a, b, c, d) {
        var f, g, h, i = e.stamp(c), j = "_leaflet_" + b + i;
        return a[j] ? this : (f = function (b) {
            return c.call(d || a, b || e.DomEvent._getEvent())
        }, e.Browser.msTouch && 0 === b.indexOf("touch") ? this.addMsTouchListener(a, b, f, i) : (e.Browser.touch && "dblclick" === b && this.addDoubleTapListener && this.addDoubleTapListener(a, f, i), "addEventListener"in a ? "mousewheel" === b ? (a.addEventListener("DOMMouseScroll", f, !1), a.addEventListener(b, f, !1)) : "mouseenter" === b || "mouseleave" === b ? (g = f, h = "mouseenter" === b ? "mouseover" : "mouseout", f = function (b) {
            return e.DomEvent._checkMouse(a, b) ? g(b) : void 0
        }, a.addEventListener(h, f, !1)) : "click" === b && e.Browser.android ? (g = f, f = function (a) {
            return e.DomEvent._filterClick(a, g)
        }, a.addEventListener(b, f, !1)) : a.addEventListener(b, f, !1) : "attachEvent"in a && a.attachEvent("on" + b, f), a[j] = f, this))
    }, removeListener: function (a, b, c) {
        var d = e.stamp(c), f = "_leaflet_" + b + d, g = a[f];
        return g ? (e.Browser.msTouch && 0 === b.indexOf("touch") ? this.removeMsTouchListener(a, b, d) : e.Browser.touch && "dblclick" === b && this.removeDoubleTapListener ? this.removeDoubleTapListener(a, d) : "removeEventListener"in a ? "mousewheel" === b ? (a.removeEventListener("DOMMouseScroll", g, !1), a.removeEventListener(b, g, !1)) : "mouseenter" === b || "mouseleave" === b ? a.removeEventListener("mouseenter" === b ? "mouseover" : "mouseout", g, !1) : a.removeEventListener(b, g, !1) : "detachEvent"in a && a.detachEvent("on" + b, g), a[f] = null, this) : this
    }, stopPropagation: function (a) {
        return a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0, this
    }, disableClickPropagation: function (a) {
        for (var b = e.DomEvent.stopPropagation, c = e.Draggable.START.length - 1; c >= 0; c--)e.DomEvent.addListener(a, e.Draggable.START[c], b);
        return e.DomEvent.addListener(a, "click", b).addListener(a, "dblclick", b)
    }, preventDefault: function (a) {
        return a.preventDefault ? a.preventDefault() : a.returnValue = !1, this
    }, stop: function (a) {
        return e.DomEvent.preventDefault(a).stopPropagation(a)
    }, getMousePosition: function (a, c) {
        var d = b.body, f = b.documentElement, g = a.pageX ? a.pageX : a.clientX + d.scrollLeft + f.scrollLeft, h = a.pageY ? a.pageY : a.clientY + d.scrollTop + f.scrollTop, i = new e.Point(g, h);
        return c ? i._subtract(e.DomUtil.getViewportOffset(c)) : i
    }, getWheelDelta: function (a) {
        var b = 0;
        return a.wheelDelta && (b = a.wheelDelta / 120), a.detail && (b = -a.detail / 3), b
    }, _checkMouse: function (a, b) {
        var c = b.relatedTarget;
        if (!c)return!0;
        try {
            for (; c && c !== a;)c = c.parentNode
        } catch (d) {
            return!1
        }
        return c !== a
    }, _getEvent: function () {
        var b = a.event;
        if (!b)for (var c = arguments.callee.caller; c && (b = c.arguments[0], !b || a.Event !== b.constructor);)c = c.caller;
        return b
    }, _filterClick: function (a, b) {
        var c = a.timeStamp || a.originalEvent.timeStamp, d = e.DomEvent._lastClick && c - e.DomEvent._lastClick;
        return d && d > 100 && 400 > d ? (e.DomEvent.stop(a), void 0) : (e.DomEvent._lastClick = c, b(a))
    }},e.DomEvent.on = e.DomEvent.addListener,e.DomEvent.off = e.DomEvent.removeListener,e.Draggable = e.Class.extend({includes: e.Mixin.Events, statics: {START: e.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"], END: {mousedown: "mouseup", touchstart: "touchend", MSPointerDown: "touchend"}, MOVE: {mousedown: "mousemove", touchstart: "touchmove", MSPointerDown: "touchmove"}, TAP_TOLERANCE: 15}, initialize: function (a, b, c) {
        this._element = a, this._dragStartTarget = b || a, this._longPress = c && !e.Browser.msTouch
    }, enable: function () {
        if (!this._enabled) {
            for (var a = e.Draggable.START.length - 1; a >= 0; a--)e.DomEvent.on(this._dragStartTarget, e.Draggable.START[a], this._onDown, this);
            this._enabled = !0
        }
    }, disable: function () {
        if (this._enabled) {
            for (var a = e.Draggable.START.length - 1; a >= 0; a--)e.DomEvent.off(this._dragStartTarget, e.Draggable.START[a], this._onDown, this);
            this._enabled = !1, this._moved = !1
        }
    }, _onDown: function (a) {
        if (!a.shiftKey && (1 === a.which || 1 === a.button || a.touches) && (e.DomEvent.preventDefault(a).stopPropagation(a), !e.Draggable._disabled)) {
            this._simulateClick = !0;
            var c = a.touches && a.touches.length || 0;
            if (c > 1)return this._simulateClick = !1, clearTimeout(this._longPressTimeout), void 0;
            var d = 1 === c ? a.touches[0] : a, f = d.target;
            e.Browser.touch && "a" === f.tagName.toLowerCase() && e.DomUtil.addClass(f, "leaflet-active"), this._moved = !1, this._moving || (this._startPoint = new e.Point(d.clientX, d.clientY), this._startPos = this._newPos = e.DomUtil.getPosition(this._element), 1 === c && e.Browser.touch && this._longPress && (this._longPressTimeout = setTimeout(e.bind(function () {
                var a = this._newPos && this._newPos.distanceTo(this._startPos) || 0;
                a < e.Draggable.TAP_TOLERANCE && (this._simulateClick = !1, this._onUp(), this._simulateEvent("contextmenu", d))
            }, this), 1e3)), e.DomEvent.on(b, e.Draggable.MOVE[a.type], this._onMove, this).on(b, e.Draggable.END[a.type], this._onUp, this))
        }
    }, _onMove: function (a) {
        if (!(a.touches && a.touches.length > 1)) {
            var c = a.touches && 1 === a.touches.length ? a.touches[0] : a, d = new e.Point(c.clientX, c.clientY), f = d.subtract(this._startPoint);
            (f.x || f.y) && (e.DomEvent.preventDefault(a), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = e.DomUtil.getPosition(this._element).subtract(f), e.Browser.touch || (e.DomUtil.disableTextSelection(), e.DomUtil.addClass(b.body, "leaflet-dragging"))), this._newPos = this._startPos.add(f), this._moving = !0, e.Util.cancelAnimFrame(this._animRequest), this._animRequest = e.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget))
        }
    }, _updatePosition: function () {
        this.fire("predrag"), e.DomUtil.setPosition(this._element, this._newPos), this.fire("drag")
    }, _onUp: function (a) {
        var c, d, f, g, h;
        clearTimeout(this._longPressTimeout), this._simulateClick && a.changedTouches && (f = this._newPos && this._newPos.distanceTo(this._startPos) || 0, c = a.changedTouches[0], d = c.target, "a" === d.tagName.toLowerCase() && e.DomUtil.removeClass(d, "leaflet-active"), f < e.Draggable.TAP_TOLERANCE && (g = !0)), e.Browser.touch || (e.DomUtil.enableTextSelection(), e.DomUtil.removeClass(b.body, "leaflet-dragging"));
        for (h in e.Draggable.MOVE)e.DomEvent.off(b, e.Draggable.MOVE[h], this._onMove).off(b, e.Draggable.END[h], this._onUp);
        this._moved && (e.Util.cancelAnimFrame(this._animRequest), this.fire("dragend")), this._moving = !1, g && (this._moved = !1, this._simulateEvent("click", c))
    }, _simulateEvent: function (c, d) {
        var e = b.createEvent("MouseEvents");
        e.initMouseEvent(c, !0, !0, a, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), d.target.dispatchEvent(e)
    }}),e.Handler = e.Class.extend({initialize: function (a) {
        this._map = a
    }, enable: function () {
        this._enabled || (this._enabled = !0, this.addHooks())
    }, disable: function () {
        this._enabled && (this._enabled = !1, this.removeHooks())
    }, enabled: function () {
        return!!this._enabled
    }}),e.Map.mergeOptions({dragging: !0, inertia: !e.Browser.android23, inertiaDeceleration: 3400, inertiaMaxSpeed: 1 / 0, inertiaThreshold: e.Browser.touch ? 32 : 18, easeLinearity: .25, longPress: !0, worldCopyJump: !1}),e.Map.Drag = e.Handler.extend({addHooks: function () {
        if (!this._draggable) {
            var a = this._map;
            this._draggable = new e.Draggable(a._mapPane, a._container, a.options.longPress), this._draggable.on({dragstart: this._onDragStart, drag: this._onDrag, dragend: this._onDragEnd}, this), a.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), a.on("viewreset", this._onViewReset, this))
        }
        this._draggable.enable()
    }, removeHooks: function () {
        this._draggable.disable()
    }, moved: function () {
        return this._draggable && this._draggable._moved
    }, _onDragStart: function () {
        var a = this._map;
        a._panAnim && a._panAnim.stop(), a.fire("movestart").fire("dragstart"), a.options.inertia && (this._positions = [], this._times = [])
    }, _onDrag: function () {
        if (this._map.options.inertia) {
            var a = this._lastTime = +new Date, b = this._lastPos = this._draggable._newPos;
            this._positions.push(b), this._times.push(a), a - this._times[0] > 200 && (this._positions.shift(), this._times.shift())
        }
        this._map.fire("move").fire("drag")
    }, _onViewReset: function () {
        var a = this._map.getSize()._divideBy(2), b = this._map.latLngToLayerPoint([0, 0]);
        this._initialWorldOffset = b.subtract(a).x, this._worldWidth = this._map.project([0, 180]).x
    }, _onPreDrag: function () {
        var a = this._worldWidth, b = Math.round(a / 2), c = this._initialWorldOffset, d = this._draggable._newPos.x, e = (d - b + c) % a + b - c, f = (d + b + c) % a - b - c, g = Math.abs(e + c) < Math.abs(f + c) ? e : f;
        this._draggable._newPos.x = g
    }, _onDragEnd: function () {
        var a = this._map, b = a.options, c = +new Date - this._lastTime, d = !b.inertia || c > b.inertiaThreshold || !this._positions[0];
        if (a.fire("dragend"), d)a.fire("moveend"); else {
            var f = this._lastPos.subtract(this._positions[0]), g = (this._lastTime + c - this._times[0]) / 1e3, h = b.easeLinearity, i = f.multiplyBy(h / g), j = i.distanceTo([0, 0]), k = Math.min(b.inertiaMaxSpeed, j), l = i.multiplyBy(k / j), m = k / (b.inertiaDeceleration * h), n = l.multiplyBy(-m / 2).round();
            n.x && n.y ? e.Util.requestAnimFrame(function () {
                a.panBy(n, {duration: m, easeLinearity: h, noMoveStart: !0})
            }) : a.fire("moveend")
        }
    }}),e.Map.addInitHook("addHandler", "dragging", e.Map.Drag),e.Map.mergeOptions({doubleClickZoom: !0}),e.Map.DoubleClickZoom = e.Handler.extend({addHooks: function () {
        this._map.on("dblclick", this._onDoubleClick)
    }, removeHooks: function () {
        this._map.off("dblclick", this._onDoubleClick)
    }, _onDoubleClick: function (a) {
        this.setZoomAround(a.containerPoint, this._zoom + 1)
    }}),e.Map.addInitHook("addHandler", "doubleClickZoom", e.Map.DoubleClickZoom),e.Map.mergeOptions({scrollWheelZoom: !0}),e.Map.ScrollWheelZoom = e.Handler.extend({addHooks: function () {
        e.DomEvent.on(this._map._container, "mousewheel", this._onWheelScroll, this), this._delta = 0
    }, removeHooks: function () {
        e.DomEvent.off(this._map._container, "mousewheel", this._onWheelScroll)
    }, _onWheelScroll: function (a) {
        var b = e.DomEvent.getWheelDelta(a);
        this._delta += b, this._lastMousePos = this._map.mouseEventToContainerPoint(a), this._startTime || (this._startTime = +new Date);
        var c = Math.max(40 - (+new Date - this._startTime), 0);
        clearTimeout(this._timer), this._timer = setTimeout(e.bind(this._performZoom, this), c), e.DomEvent.preventDefault(a), e.DomEvent.stopPropagation(a)
    }, _performZoom: function () {
        var a = this._map, b = this._delta, c = a.getZoom();
        b = b > 0 ? Math.ceil(b) : Math.floor(b), b = Math.max(Math.min(b, 4), -4), b = a._limitZoom(c + b) - c, this._delta = 0, this._startTime = null, b && a.setZoomAround(this._lastMousePos, c + b)
    }}),e.Map.addInitHook("addHandler", "scrollWheelZoom", e.Map.ScrollWheelZoom),e.extend(e.DomEvent, {_touchstart: e.Browser.msTouch ? "MSPointerDown" : "touchstart", _touchend: e.Browser.msTouch ? "MSPointerUp" : "touchend", addDoubleTapListener: function (a, c, d) {
        function f(a) {
            var b;
            if (e.Browser.msTouch ? (o.push(a.pointerId), b = o.length) : b = a.touches.length, !(b > 1)) {
                var c = Date.now(), d = c - (h || c);
                i = a.touches ? a.touches[0] : a, j = d > 0 && k >= d, h = c
            }
        }

        function g(a) {
            if (e.Browser.msTouch) {
                var b = o.indexOf(a.pointerId);
                if (-1 === b)return;
                o.splice(b, 1)
            }
            if (j) {
                if (e.Browser.msTouch) {
                    var d, f = {};
                    for (var g in i)d = i[g], f[g] = "function" == typeof d ? d.bind(i) : d;
                    i = f
                }
                i.type = "dblclick", c(i), h = null
            }
        }

        var h, i, j = !1, k = 250, l = "_leaflet_", m = this._touchstart, n = this._touchend, o = [];
        a[l + m + d] = f, a[l + n + d] = g;
        var p = e.Browser.msTouch ? b.documentElement : a;
        return a.addEventListener(m, f, !1), p.addEventListener(n, g, !1), e.Browser.msTouch && p.addEventListener("MSPointerCancel", g, !1), this
    }, removeDoubleTapListener: function (a, c) {
        var d = "_leaflet_";
        return a.removeEventListener(this._touchstart, a[d + this._touchstart + c], !1), (e.Browser.msTouch ? b.documentElement : a).removeEventListener(this._touchend, a[d + this._touchend + c], !1), e.Browser.msTouch && b.documentElement.removeEventListener("MSPointerCancel", a[d + this._touchend + c], !1), this
    }}),e.extend(e.DomEvent, {_msTouches: [], _msDocumentListener: !1, addMsTouchListener: function (a, b, c, d) {
        switch (b) {
            case"touchstart":
                return this.addMsTouchListenerStart(a, b, c, d);
            case"touchend":
                return this.addMsTouchListenerEnd(a, b, c, d);
            case"touchmove":
                return this.addMsTouchListenerMove(a, b, c, d);
            default:
                throw"Unknown touch event type"
        }
    }, addMsTouchListenerStart: function (a, c, d, e) {
        var f = "_leaflet_", g = this._msTouches, h = function (a) {
            for (var b = !1, c = 0; c < g.length; c++)if (g[c].pointerId === a.pointerId) {
                b = !0;
                break
            }
            b || g.push(a), a.touches = g.slice(), a.changedTouches = [a], d(a)
        };
        if (a[f + "touchstart" + e] = h, a.addEventListener("MSPointerDown", h, !1), !this._msDocumentListener) {
            var i = function (a) {
                for (var b = 0; b < g.length; b++)if (g[b].pointerId === a.pointerId) {
                    g.splice(b, 1);
                    break
                }
            };
            b.documentElement.addEventListener("MSPointerUp", i, !1), b.documentElement.addEventListener("MSPointerCancel", i, !1), this._msDocumentListener = !0
        }
        return this
    }, addMsTouchListenerMove: function (a, b, c, d) {
        function e(a) {
            if (a.pointerType !== a.MSPOINTER_TYPE_MOUSE || 0 !== a.buttons) {
                for (var b = 0; b < g.length; b++)if (g[b].pointerId === a.pointerId) {
                    g[b] = a;
                    break
                }
                a.touches = g.slice(), a.changedTouches = [a], c(a)
            }
        }

        var f = "_leaflet_", g = this._msTouches;
        return a[f + "touchmove" + d] = e, a.addEventListener("MSPointerMove", e, !1), this
    }, addMsTouchListenerEnd: function (a, b, c, d) {
        var e = "_leaflet_", f = this._msTouches, g = function (a) {
            for (var b = 0; b < f.length; b++)if (f[b].pointerId === a.pointerId) {
                f.splice(b, 1);
                break
            }
            a.touches = f.slice(), a.changedTouches = [a], c(a)
        };
        return a[e + "touchend" + d] = g, a.addEventListener("MSPointerUp", g, !1), a.addEventListener("MSPointerCancel", g, !1), this
    }, removeMsTouchListener: function (a, b, c) {
        var d = "_leaflet_", e = a[d + b + c];
        switch (b) {
            case"touchstart":
                a.removeEventListener("MSPointerDown", e, !1);
                break;
            case"touchmove":
                a.removeEventListener("MSPointerMove", e, !1);
                break;
            case"touchend":
                a.removeEventListener("MSPointerUp", e, !1), a.removeEventListener("MSPointerCancel", e, !1)
        }
        return this
    }}),e.Map.mergeOptions({touchZoom: e.Browser.touch && !e.Browser.android23}),e.Map.TouchZoom = e.Handler.extend({addHooks: function () {
        e.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
    }, removeHooks: function () {
        e.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
    }, _onTouchStart: function (a) {
        var c = this._map;
        if (a.touches && 2 === a.touches.length && !c._animatingZoom && !this._zooming) {
            var d = c.mouseEventToLayerPoint(a.touches[0]), f = c.mouseEventToLayerPoint(a.touches[1]), g = c._getCenterLayerPoint();
            this._startCenter = d.add(f)._divideBy(2), this._startDist = d.distanceTo(f), this._moved = !1, this._zooming = !0, this._centerOffset = g.subtract(this._startCenter), c._panAnim && c._panAnim.stop(), e.DomEvent.on(b, "touchmove", this._onTouchMove, this).on(b, "touchend", this._onTouchEnd, this), e.DomEvent.preventDefault(a)
        }
    }, _onTouchMove: function (a) {
        var b = this._map;
        if (a.touches && 2 === a.touches.length && this._zooming) {
            var c = b.mouseEventToLayerPoint(a.touches[0]), d = b.mouseEventToLayerPoint(a.touches[1]);
            this._scale = c.distanceTo(d) / this._startDist, this._delta = c._add(d)._divideBy(2)._subtract(this._startCenter), 1 !== this._scale && (this._moved || (e.DomUtil.addClass(b._mapPane, "leaflet-touching"), b.fire("movestart").fire("zoomstart"), this._moved = !0), e.Util.cancelAnimFrame(this._animRequest), this._animRequest = e.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), e.DomEvent.preventDefault(a))
        }
    }, _updateOnMove: function () {
        var a = this._map, b = this._getScaleOrigin(), c = a.layerPointToLatLng(b), d = a.getScaleZoom(this._scale);
        a._animateZoom(c, d, this._startCenter, this._scale, this._delta)
    }, _onTouchEnd: function () {
        if (!this._moved || !this._zooming)return this._zooming = !1, void 0;
        var a = this._map;
        this._zooming = !1, e.DomUtil.removeClass(a._mapPane, "leaflet-touching"), e.Util.cancelAnimFrame(this._animRequest), e.DomEvent.off(b, "touchmove", this._onTouchMove).off(b, "touchend", this._onTouchEnd);
        var c = this._getScaleOrigin(), d = a.layerPointToLatLng(c), f = a.getZoom(), g = a.getScaleZoom(this._scale) - f, h = g > 0 ? Math.ceil(g) : Math.floor(g), i = a._limitZoom(f + h), j = a.getZoomScale(i) / this._scale;
        a._animateZoom(d, i, c, j)
    }, _getScaleOrigin: function () {
        var a = this._centerOffset.subtract(this._delta).divideBy(this._scale);
        return this._startCenter.add(a)
    }}),e.Map.addInitHook("addHandler", "touchZoom", e.Map.TouchZoom),e.Map.mergeOptions({boxZoom: !0}),e.Map.BoxZoom = e.Handler.extend({initialize: function (a) {
        this._map = a, this._container = a._container, this._pane = a._panes.overlayPane
    }, addHooks: function () {
        e.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
    }, removeHooks: function () {
        e.DomEvent.off(this._container, "mousedown", this._onMouseDown)
    }, _onMouseDown: function (a) {
        return!a.shiftKey || 1 !== a.which && 1 !== a.button ? !1 : (e.DomUtil.disableTextSelection(), this._startLayerPoint = this._map.mouseEventToLayerPoint(a), this._box = e.DomUtil.create("div", "leaflet-zoom-box", this._pane), e.DomUtil.setPosition(this._box, this._startLayerPoint), this._container.style.cursor = "crosshair", e.DomEvent.on(b, "mousemove", this._onMouseMove, this).on(b, "mouseup", this._onMouseUp, this).on(b, "keydown", this._onKeyDown, this).preventDefault(a), this._map.fire("boxzoomstart"), void 0)
    }, _onMouseMove: function (a) {
        var b = this._startLayerPoint, c = this._box, d = this._map.mouseEventToLayerPoint(a), f = d.subtract(b), g = new e.Point(Math.min(d.x, b.x), Math.min(d.y, b.y));
        e.DomUtil.setPosition(c, g), c.style.width = Math.max(0, Math.abs(f.x) - 4) + "px", c.style.height = Math.max(0, Math.abs(f.y) - 4) + "px"
    }, _finish: function () {
        this._pane.removeChild(this._box), this._container.style.cursor = "", e.DomUtil.enableTextSelection(), e.DomEvent.off(b, "mousemove", this._onMouseMove).off(b, "mouseup", this._onMouseUp).off(b, "keydown", this._onKeyDown)
    }, _onMouseUp: function (a) {
        this._finish();
        var b = this._map, c = b.mouseEventToLayerPoint(a);
        if (!this._startLayerPoint.equals(c)) {
            var d = new e.LatLngBounds(b.layerPointToLatLng(this._startLayerPoint), b.layerPointToLatLng(c));
            b.fitBounds(d), b.fire("boxzoomend", {boxZoomBounds: d})
        }
    }, _onKeyDown: function (a) {
        27 === a.keyCode && this._finish()
    }}),e.Map.addInitHook("addHandler", "boxZoom", e.Map.BoxZoom),e.Map.mergeOptions({keyboard: !0, keyboardPanOffset: 80, keyboardZoomOffset: 1}),e.Map.Keyboard = e.Handler.extend({keyCodes: {left: [37], right: [39], down: [40], up: [38], zoomIn: [187, 107, 61], zoomOut: [189, 109, 173]}, initialize: function (a) {
        this._map = a, this._setPanOffset(a.options.keyboardPanOffset), this._setZoomOffset(a.options.keyboardZoomOffset)
    }, addHooks: function () {
        var a = this._map._container;
        -1 === a.tabIndex && (a.tabIndex = "0"), e.DomEvent.on(a, "focus", this._onFocus, this).on(a, "blur", this._onBlur, this).on(a, "mousedown", this._onMouseDown, this), this._map.on("focus", this._addHooks, this).on("blur", this._removeHooks, this)
    }, removeHooks: function () {
        this._removeHooks();
        var a = this._map._container;
        e.DomEvent.off(a, "focus", this._onFocus, this).off(a, "blur", this._onBlur, this).off(a, "mousedown", this._onMouseDown, this), this._map.off("focus", this._addHooks, this).off("blur", this._removeHooks, this)
    }, _onMouseDown: function () {
        if (!this._focused) {
            var c = b.body, d = b.documentElement, e = c.scrollTop || d.scrollTop, f = c.scrollTop || d.scrollLeft;
            this._map._container.focus(), a.scrollTo(f, e)
        }
    }, _onFocus: function () {
        this._focused = !0, this._map.fire("focus")
    }, _onBlur: function () {
        this._focused = !1, this._map.fire("blur")
    }, _setPanOffset: function (a) {
        var b, c, d = this._panKeys = {}, e = this.keyCodes;
        for (b = 0, c = e.left.length; c > b; b++)d[e.left[b]] = [-1 * a, 0];
        for (b = 0, c = e.right.length; c > b; b++)d[e.right[b]] = [a, 0];
        for (b = 0, c = e.down.length; c > b; b++)d[e.down[b]] = [0, a];
        for (b = 0, c = e.up.length; c > b; b++)d[e.up[b]] = [0, -1 * a]
    }, _setZoomOffset: function (a) {
        var b, c, d = this._zoomKeys = {}, e = this.keyCodes;
        for (b = 0, c = e.zoomIn.length; c > b; b++)d[e.zoomIn[b]] = a;
        for (b = 0, c = e.zoomOut.length; c > b; b++)d[e.zoomOut[b]] = -a
    }, _addHooks: function () {
        e.DomEvent.on(b, "keydown", this._onKeyDown, this)
    }, _removeHooks: function () {
        e.DomEvent.off(b, "keydown", this._onKeyDown, this)
    }, _onKeyDown: function (a) {
        var b = a.keyCode, c = this._map;
        if (b in this._panKeys)c.panBy(this._panKeys[b]), c.options.maxBounds && c.panInsideBounds(c.options.maxBounds); else {
            if (!(b in this._zoomKeys))return;
            c.setZoom(c.getZoom() + this._zoomKeys[b])
        }
        e.DomEvent.stop(a)
    }}),e.Map.addInitHook("addHandler", "keyboard", e.Map.Keyboard),e.Handler.MarkerDrag = e.Handler.extend({initialize: function (a) {
        this._marker = a
    }, addHooks: function () {
        var a = this._marker._icon;
        this._draggable || (this._draggable = new e.Draggable(a, a)), this._draggable.on("dragstart", this._onDragStart, this).on("drag", this._onDrag, this).on("dragend", this._onDragEnd, this), this._draggable.enable()
    }, removeHooks: function () {
        this._draggable.off("dragstart", this._onDragStart).off("drag", this._onDrag).off("dragend", this._onDragEnd), this._draggable.disable()
    }, moved: function () {
        return this._draggable && this._draggable._moved
    }, _onDragStart: function () {
        this._marker.closePopup().fire("movestart").fire("dragstart")
    }, _onDrag: function () {
        var a = this._marker, b = a._shadow, c = e.DomUtil.getPosition(a._icon), d = a._map.layerPointToLatLng(c);
        b && e.DomUtil.setPosition(b, c), a._latlng = d, a.fire("move", {latlng: d}).fire("drag")
    }, _onDragEnd: function () {
        this._marker.fire("moveend").fire("dragend")
    }}),e.Control = e.Class.extend({options: {position: "topright"}, initialize: function (a) {
        e.setOptions(this, a)
    }, getPosition: function () {
        return this.options.position
    }, setPosition: function (a) {
        var b = this._map;
        return b && b.removeControl(this), this.options.position = a, b && b.addControl(this), this
    }, getContainer: function () {
        return this._container
    }, addTo: function (a) {
        this._map = a;
        var b = this._container = this.onAdd(a), c = this.getPosition(), d = a._controlCorners[c];
        return e.DomUtil.addClass(b, "leaflet-control"), -1 !== c.indexOf("bottom") ? d.insertBefore(b, d.firstChild) : d.appendChild(b), this
    }, removeFrom: function (a) {
        var b = this.getPosition(), c = a._controlCorners[b];
        return c.removeChild(this._container), this._map = null, this.onRemove && this.onRemove(a), this
    }}),e.control = function (a) {
        return new e.Control(a)
    },e.Map.include({addControl: function (a) {
        return a.addTo(this), this
    }, removeControl: function (a) {
        return a.removeFrom(this), this
    }, _initControlPos: function () {
        function a(a, f) {
            var g = c + a + " " + c + f;
            b[a + f] = e.DomUtil.create("div", g, d)
        }

        var b = this._controlCorners = {}, c = "leaflet-", d = this._controlContainer = e.DomUtil.create("div", c + "control-container", this._container);
        a("top", "left"), a("top", "right"), a("bottom", "left"), a("bottom", "right")
    }, _clearControlPos: function () {
        this._container.removeChild(this._controlContainer)
    }}),e.Control.Zoom = e.Control.extend({options: {position: "topleft"}, onAdd: function (a) {
        var b = "leaflet-control-zoom", c = e.DomUtil.create("div", b + " leaflet-bar");
        return this._map = a, this._zoomInButton = this._createButton("+", "Zoom in", b + "-in", c, this._zoomIn, this), this._zoomOutButton = this._createButton("-", "Zoom out", b + "-out", c, this._zoomOut, this), a.on("zoomend zoomlevelschange", this._updateDisabled, this), c
    }, onRemove: function (a) {
        a.off("zoomend zoomlevelschange", this._updateDisabled, this)
    }, _zoomIn: function (a) {
        this._map.zoomIn(a.shiftKey ? 3 : 1)
    }, _zoomOut: function (a) {
        this._map.zoomOut(a.shiftKey ? 3 : 1)
    }, _createButton: function (a, b, c, d, f, g) {
        var h = e.DomUtil.create("a", c, d);
        h.innerHTML = a, h.href = "#", h.title = b;
        var i = e.DomEvent.stopPropagation;
        return e.DomEvent.on(h, "click", i).on(h, "mousedown", i).on(h, "dblclick", i).on(h, "click", e.DomEvent.preventDefault).on(h, "click", f, g), h
    }, _updateDisabled: function () {
        var a = this._map, b = "leaflet-disabled";
        e.DomUtil.removeClass(this._zoomInButton, b), e.DomUtil.removeClass(this._zoomOutButton, b), a._zoom === a.getMinZoom() && e.DomUtil.addClass(this._zoomOutButton, b), a._zoom === a.getMaxZoom() && e.DomUtil.addClass(this._zoomInButton, b)
    }}),e.Map.mergeOptions({zoomControl: !0}),e.Map.addInitHook(function () {
        this.options.zoomControl && (this.zoomControl = new e.Control.Zoom, this.addControl(this.zoomControl))
    }),e.control.zoom = function (a) {
        return new e.Control.Zoom(a)
    },e.Control.Attribution = e.Control.extend({options: {position: "bottomright", prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'}, initialize: function (a) {
        e.setOptions(this, a), this._attributions = {}
    }, onAdd: function (a) {
        return this._container = e.DomUtil.create("div", "leaflet-control-attribution"), e.DomEvent.disableClickPropagation(this._container), a.on("layeradd", this._onLayerAdd, this).on("layerremove", this._onLayerRemove, this), this._update(), this._container
    }, onRemove: function (a) {
        a.off("layeradd", this._onLayerAdd).off("layerremove", this._onLayerRemove)
    }, setPrefix: function (a) {
        return this.options.prefix = a, this._update(), this
    }, addAttribution: function (a) {
        return a ? (this._attributions[a] || (this._attributions[a] = 0), this._attributions[a]++, this._update(), this) : void 0
    }, removeAttribution: function (a) {
        return a ? (this._attributions[a] && (this._attributions[a]--, this._update()), this) : void 0
    }, _update: function () {
        if (this._map) {
            var a = [];
            for (var b in this._attributions)this._attributions[b] && a.push(b);
            var c = [];
            this.options.prefix && c.push(this.options.prefix), a.length && c.push(a.join(", ")), this._container.innerHTML = c.join(" | ")
        }
    }, _onLayerAdd: function (a) {
        a.layer.getAttribution && this.addAttribution(a.layer.getAttribution())
    }, _onLayerRemove: function (a) {
        a.layer.getAttribution && this.removeAttribution(a.layer.getAttribution())
    }}),e.Map.mergeOptions({attributionControl: !0}),e.Map.addInitHook(function () {
        this.options.attributionControl && (this.attributionControl = (new e.Control.Attribution).addTo(this))
    }),e.control.attribution = function (a) {
        return new e.Control.Attribution(a)
    },e.Control.Scale = e.Control.extend({options: {position: "bottomleft", maxWidth: 100, metric: !0, imperial: !0, updateWhenIdle: !1}, onAdd: function (a) {
        this._map = a;
        var b = "leaflet-control-scale", c = e.DomUtil.create("div", b), d = this.options;
        return this._addScales(d, b, c), a.on(d.updateWhenIdle ? "moveend" : "move", this._update, this), a.whenReady(this._update, this), c
    }, onRemove: function (a) {
        a.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
    }, _addScales: function (a, b, c) {
        a.metric && (this._mScale = e.DomUtil.create("div", b + "-line", c)), a.imperial && (this._iScale = e.DomUtil.create("div", b + "-line", c))
    }, _update: function () {
        var a = this._map.getBounds(), b = a.getCenter().lat, c = 6378137 * Math.PI * Math.cos(b * Math.PI / 180), d = c * (a.getNorthEast().lng - a.getSouthWest().lng) / 180, e = this._map.getSize(), f = this.options, g = 0;
        e.x > 0 && (g = d * (f.maxWidth / e.x)), this._updateScales(f, g)
    }, _updateScales: function (a, b) {
        a.metric && b && this._updateMetric(b), a.imperial && b && this._updateImperial(b)
    }, _updateMetric: function (a) {
        var b = this._getRoundNum(a);
        this._mScale.style.width = this._getScaleWidth(b / a) + "px", this._mScale.innerHTML = 1e3 > b ? b + " m" : b / 1e3 + " km"
    }, _updateImperial: function (a) {
        var b, c, d, e = 3.2808399 * a, f = this._iScale;
        e > 5280 ? (b = e / 5280, c = this._getRoundNum(b), f.style.width = this._getScaleWidth(c / b) + "px", f.innerHTML = c + " mi") : (d = this._getRoundNum(e), f.style.width = this._getScaleWidth(d / e) + "px", f.innerHTML = d + " ft")
    }, _getScaleWidth: function (a) {
        return Math.round(this.options.maxWidth * a) - 10
    }, _getRoundNum: function (a) {
        var b = Math.pow(10, (Math.floor(a) + "").length - 1), c = a / b;
        return c = c >= 10 ? 10 : c >= 5 ? 5 : c >= 3 ? 3 : c >= 2 ? 2 : 1, b * c
    }}),e.control.scale = function (a) {
        return new e.Control.Scale(a)
    },e.Control.Layers = e.Control.extend({options: {collapsed: !0, position: "topright", autoZIndex: !0}, initialize: function (a, b, c) {
        e.setOptions(this, c), this._layers = {}, this._lastZIndex = 0, this._handlingClick = !1;
        for (var d in a)this._addLayer(a[d], d);
        for (d in b)this._addLayer(b[d], d, !0)
    }, onAdd: function (a) {
        return this._initLayout(), this._update(), a.on("layeradd", this._onLayerChange, this).on("layerremove", this._onLayerChange, this), this._container
    }, onRemove: function (a) {
        a.off("layeradd", this._onLayerChange).off("layerremove", this._onLayerChange)
    }, addBaseLayer: function (a, b) {
        return this._addLayer(a, b), this._update(), this
    }, addOverlay: function (a, b) {
        return this._addLayer(a, b, !0), this._update(), this
    }, removeLayer: function (a) {
        var b = e.stamp(a);
        return delete this._layers[b], this._update(), this
    }, _initLayout: function () {
        var a = "leaflet-control-layers", b = this._container = e.DomUtil.create("div", a);
        b.setAttribute("aria-haspopup", !0), e.Browser.touch ? e.DomEvent.on(b, "click", e.DomEvent.stopPropagation) : (e.DomEvent.disableClickPropagation(b), e.DomEvent.on(b, "mousewheel", e.DomEvent.stopPropagation));
        var c = this._form = e.DomUtil.create("form", a + "-list");
        if (this.options.collapsed) {
            e.DomEvent.on(b, "mouseover", this._expand, this).on(b, "mouseout", this._collapse, this);
            var d = this._layersLink = e.DomUtil.create("a", a + "-toggle", b);
            d.href = "#", d.title = "Layers", e.Browser.touch ? e.DomEvent.on(d, "click", e.DomEvent.stopPropagation).on(d, "click", e.DomEvent.preventDefault).on(d, "click", this._expand, this) : e.DomEvent.on(d, "focus", this._expand, this), this._map.on("movestart", this._collapse, this)
        } else this._expand();
        this._baseLayersList = e.DomUtil.create("div", a + "-base", c), this._separator = e.DomUtil.create("div", a + "-separator", c), this._overlaysList = e.DomUtil.create("div", a + "-overlays", c), b.appendChild(c)
    }, _addLayer: function (a, b, c) {
        var d = e.stamp(a);
        this._layers[d] = {layer: a, name: b, overlay: c}, this.options.autoZIndex && a.setZIndex && (this._lastZIndex++, a.setZIndex(this._lastZIndex))
    }, _update: function () {
        if (this._container) {
            this._baseLayersList.innerHTML = "", this._overlaysList.innerHTML = "";
            var a, b, c = !1, d = !1;
            for (a in this._layers)b = this._layers[a], this._addItem(b), d = d || b.overlay, c = c || !b.overlay;
            this._separator.style.display = d && c ? "" : "none"
        }
    }, _onLayerChange: function (a) {
        var b = e.stamp(a.layer);
        this._layers[b] && !this._handlingClick && this._update()
    }, _createRadioElement: function (a, c) {
        var d = '<input type="radio" class="leaflet-control-layers-selector" name="' + a + '"';
        c && (d += ' checked="checked"'), d += "/>";
        var e = b.createElement("div");
        return e.innerHTML = d, e.firstChild
    }, _addItem: function (a) {
        var c, d = b.createElement("label"), f = this._map.hasLayer(a.layer);
        a.overlay ? (c = b.createElement("input"), c.type = "checkbox", c.className = "leaflet-control-layers-selector", c.defaultChecked = f) : c = this._createRadioElement("leaflet-base-layers", f), c.layerId = e.stamp(a.layer), e.DomEvent.on(c, "click", this._onInputClick, this);
        var g = b.createElement("span");
        g.innerHTML = " " + a.name, d.appendChild(c), d.appendChild(g);
        var h = a.overlay ? this._overlaysList : this._baseLayersList;
        return h.appendChild(d), d
    }, _onInputClick: function () {
        var a, b, c, d, e = this._form.getElementsByTagName("input"), f = e.length;
        for (this._handlingClick = !0, a = 0; f > a; a++)b = e[a], c = this._layers[b.layerId], b.checked && !this._map.hasLayer(c.layer) ? (this._map.addLayer(c.layer), c.overlay ? this._map.fire("overlayadd", {layer: c}) : d = c.layer) : !b.checked && this._map.hasLayer(c.layer) && (this._map.removeLayer(c.layer), this._map.fire("overlayremove", {layer: c}));
        d && (this._map.setZoom(this._map.getZoom()), this._map.fire("baselayerchange", {layer: d})), this._handlingClick = !1
    }, _expand: function () {
        e.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
    }, _collapse: function () {
        this._container.className = this._container.className.replace(" leaflet-control-layers-expanded", "")
    }}),e.control.layers = function (a, b, c) {
        return new e.Control.Layers(a, b, c)
    },e.PosAnimation = e.Class.extend({includes: e.Mixin.Events, run: function (a, b, c, d) {
        this.stop(), this._el = a, this._inProgress = !0, this._newPos = b, this.fire("start"), a.style[e.DomUtil.TRANSITION] = "all " + (c || .25) + "s cubic-bezier(0,0," + (d || .5) + ",1)", e.DomEvent.on(a, e.DomUtil.TRANSITION_END, this._onTransitionEnd, this), e.DomUtil.setPosition(a, b), e.Util.falseFn(a.offsetWidth), this._stepTimer = setInterval(e.bind(this._onStep, this), 50)
    }, stop: function () {
        this._inProgress && (e.DomUtil.setPosition(this._el, this._getPos()), this._onTransitionEnd(), e.Util.falseFn(this._el.offsetWidth))
    }, _onStep: function () {
        this._el._leaflet_pos = this._getPos(), this.fire("step")
    }, _transformRe: /([-+]?(?:\d*\.)?\d+)\D*, ([-+]?(?:\d*\.)?\d+)\D*\)/, _getPos: function () {
        var b, c, d, f = this._el, g = a.getComputedStyle(f);
        return e.Browser.any3d ? (d = g[e.DomUtil.TRANSFORM].match(this._transformRe), b = parseFloat(d[1]), c = parseFloat(d[2])) : (b = parseFloat(g.left), c = parseFloat(g.top)), new e.Point(b, c, !0)
    }, _onTransitionEnd: function () {
        e.DomEvent.off(this._el, e.DomUtil.TRANSITION_END, this._onTransitionEnd, this), this._inProgress && (this._inProgress = !1, this._el.style[e.DomUtil.TRANSITION] = "", this._el._leaflet_pos = this._newPos, clearInterval(this._stepTimer), this.fire("step").fire("end"))
    }}),e.Map.include({setView: function (a, b, d) {
        if (b = this._limitZoom(b), a = e.latLng(a), d = d || {}, this._panAnim && this._panAnim.stop(), this._loaded && !d.reset && d !== !0) {
            d.animate !== c && (d.zoom = e.extend({animate: d.animate}, d.zoom), d.pan = e.extend({animate: d.animate}, d.pan));
            var f = this._zoom !== b ? this._tryAnimatedZoom && this._tryAnimatedZoom(a, b, d.zoom) : this._tryAnimatedPan(a, d.pan);
            if (f)return clearTimeout(this._sizeTimer), this
        }
        return this._resetView(a, b), this
    }, panBy: function (a, b) {
        if (a = e.point(a).round(), b = b || {}, !a.x && !a.y)return this;
        if (this._panAnim || (this._panAnim = new e.PosAnimation, this._panAnim.on({step: this._onPanTransitionStep, end: this._onPanTransitionEnd}, this)), b.noMoveStart || this.fire("movestart"), b.animate !== !1) {
            e.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
            var c = this._getMapPanePos().subtract(a);
            this._panAnim.run(this._mapPane, c, b.duration || .25, b.easeLinearity)
        } else this._rawPanBy(a), this.fire("move").fire("moveend");
        return this
    }, _onPanTransitionStep: function () {
        this.fire("move")
    }, _onPanTransitionEnd: function () {
        e.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
    }, _tryAnimatedPan: function (a, b) {
        var c = this._getCenterOffset(a)._floor();
        return(b && b.animate) === !0 || this.getSize().contains(c) ? (this.panBy(c, b), !0) : !1
    }}),e.PosAnimation = e.DomUtil.TRANSITION ? e.PosAnimation : e.PosAnimation.extend({run: function (a, b, c, d) {
        this.stop(), this._el = a, this._inProgress = !0, this._duration = c || .25, this._easeOutPower = 1 / Math.max(d || .5, .2), this._startPos = e.DomUtil.getPosition(a), this._offset = b.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
    }, stop: function () {
        this._inProgress && (this._step(), this._complete())
    }, _animate: function () {
        this._animId = e.Util.requestAnimFrame(this._animate, this), this._step()
    }, _step: function () {
        var a = +new Date - this._startTime, b = 1e3 * this._duration;
        b > a ? this._runFrame(this._easeOut(a / b)) : (this._runFrame(1), this._complete())
    }, _runFrame: function (a) {
        var b = this._startPos.add(this._offset.multiplyBy(a));
        e.DomUtil.setPosition(this._el, b), this.fire("step")
    }, _complete: function () {
        e.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
    }, _easeOut: function (a) {
        return 1 - Math.pow(1 - a, this._easeOutPower)
    }}),e.Map.mergeOptions({zoomAnimation: !0, zoomAnimationThreshold: 4}),e.DomUtil.TRANSITION && e.Map.addInitHook(function () {
        e.DomEvent.on(this._mapPane, e.DomUtil.TRANSITION_END, this._catchTransitionEnd, this)
    }),e.Map.include(e.DomUtil.TRANSITION ? {_catchTransitionEnd: function () {
        this._animatingZoom && this._onZoomTransitionEnd()
    }, _tryAnimatedZoom: function (a, b, c) {
        if (this._animatingZoom)return!0;
        if (c = c || {}, !this.options.zoomAnimation || c.animate === !1 || !e.DomUtil.TRANSITION || e.Browser.android23 || e.Browser.mobileOpera || Math.abs(b - this._zoom) > this.options.zoomAnimationThreshold)return!1;
        var d = this.getZoomScale(b), f = this._getCenterOffset(a)._divideBy(1 - 1 / d), g = this._getCenterLayerPoint()._add(f);
        return c.animate === !0 || this.getSize().contains(f) ? (this.fire("movestart").fire("zoomstart"), this._animateZoom(a, b, g, d), !0) : !1
    }, _animateZoom: function (a, b, c, d, f) {
        this._animatingZoom = !0, e.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim"), this._animateToCenter = a, this._animateToZoom = b, e.Draggable && (e.Draggable._disabled = !0), this.fire("zoomanim", {center: a, zoom: b, origin: c, scale: d, delta: f})
    }, _onZoomTransitionEnd: function () {
        this._animatingZoom = !1, e.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), this._resetView(this._animateToCenter, this._animateToZoom, !0, !0), e.Draggable && (e.Draggable._disabled = !1)
    }} : {}),e.TileLayer.include({_animateZoom: function (a) {
        var b = !1;
        this._animating || (this._animating = !0, b = !0), b && this._prepareBgBuffer();
        var c = this._bgBuffer;
        b && (clearTimeout(this._clearBgBufferTimer), e.Util.falseFn(c.offsetWidth));
        var d = e.DomUtil.TRANSFORM, f = a.delta ? e.DomUtil.getTranslateString(a.delta) : c.style[d];
        c.style[d] = f + " " + e.DomUtil.getScaleString(a.scale, a.origin)
    }, _endZoomAnim: function () {
        var a = this._tileContainer, b = this._bgBuffer;
        a.style.visibility = "", a.style.zIndex = 2, b.style.zIndex = 1, e.Util.falseFn(b.offsetWidth), this._animating = !1
    }, _clearBgBuffer: function () {
        var a = this._map;
        !a || a._animatingZoom || a.touchZoom._zooming || (this._bgBuffer.innerHTML = "", this._bgBuffer.style[e.DomUtil.TRANSFORM] = "")
    }, _prepareBgBuffer: function () {
        var a = this._tileContainer, b = this._bgBuffer, c = this._getLoadedTilesPercentage(b), d = this._getLoadedTilesPercentage(a);
        return b && c > .5 && .5 > d ? (a.style.visibility = "hidden", this._stopLoadingImages(a), void 0) : (b.style.visibility = "hidden", b.style[e.DomUtil.TRANSFORM] = "", this._tileContainer = b, b = this._bgBuffer = a, this._stopLoadingImages(b), void 0)
    }, _getLoadedTilesPercentage: function (a) {
        var b, c, d = a.getElementsByTagName("img"), e = 0;
        for (b = 0, c = d.length; c > b; b++)d[b].complete && e++;
        return e / c
    }, _stopLoadingImages: function (a) {
        var b, c, d, f = Array.prototype.slice.call(a.getElementsByTagName("img"));
        for (b = 0, c = f.length; c > b; b++)d = f[b], d.complete || (d.onload = e.Util.falseFn, d.onerror = e.Util.falseFn, d.src = e.Util.emptyImageUrl, d.parentNode.removeChild(d))
    }}),e.Map.include({_defaultLocateOptions: {watch: !1, setView: !1, maxZoom: 1 / 0, timeout: 1e4, maximumAge: 0, enableHighAccuracy: !1}, locate: function (a) {
        if (a = this._locateOptions = e.extend(this._defaultLocateOptions, a), !navigator.geolocation)return this._handleGeolocationError({code: 0, message: "Geolocation not supported."}), this;
        var b = e.bind(this._handleGeolocationResponse, this), c = e.bind(this._handleGeolocationError, this);
        return a.watch ? this._locationWatchId = navigator.geolocation.watchPosition(b, c, a) : navigator.geolocation.getCurrentPosition(b, c, a), this
    }, stopLocate: function () {
        return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
    }, _handleGeolocationError: function (a) {
        var b = a.code, c = a.message || (1 === b ? "permission denied" : 2 === b ? "position unavailable" : "timeout");
        this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {code: b, message: "Geolocation error: " + c + "."})
    }, _handleGeolocationResponse: function (a) {
        var b = a.coords.latitude, c = a.coords.longitude, d = new e.LatLng(b, c), f = 180 * a.coords.accuracy / 40075017, g = f / Math.cos(e.LatLng.DEG_TO_RAD * b), h = e.latLngBounds([b - f, c - g], [b + f, c + g]), i = this._locateOptions;
        if (i.setView) {
            var j = Math.min(this.getBoundsZoom(h), i.maxZoom);
            this.setView(d, j)
        }
        var k = e.extend({latlng: d, bounds: h}, a.coords);
        this.fire("locationfound", k)
    }})
}(window, document), define("css-embed", function () {
    function a(a) {
        var b = document.getElementsByTagName("head")[0], c = document.createElement("style"), d = document.createTextNode(a);
        c.type = "text/css", c.styleSheet ? c.styleSheet.cssText = d.nodeValue : c.appendChild(d), b.appendChild(c)
    }

    return a
}), define("css!panels/bettermap/module.css", ["css-embed"], function (a) {
    return a(".leaflet-marker-icon{color:#333}"), !0
}), define("css!panels/bettermap/leaflet/leaflet.css", ["css-embed"], function (a) {
    return a(".leaflet-map-pane,.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow,.leaflet-tile-pane,.leaflet-tile-container,.leaflet-overlay-pane,.leaflet-shadow-pane,.leaflet-marker-pane,.leaflet-popup-pane,.leaflet-overlay-pane svg,.leaflet-zoom-box,.leaflet-image-layer,.leaflet-layer{position:absolute;left:0;top:0}.leaflet-container{overflow:hidden;-ms-touch-action:none}.leaflet-tile,.leaflet-marker-icon,.leaflet-marker-shadow{-webkit-user-select:none;-moz-user-select:none;user-select:none;-webkit-user-drag:none}.leaflet-marker-icon,.leaflet-marker-shadow{display:block}.leaflet-container img{max-width:none!important}.leaflet-container img.leaflet-image-layer{max-width:15000px!important}.leaflet-tile{filter:inherit;visibility:hidden}.leaflet-tile-loaded{visibility:inherit}.leaflet-zoom-box{width:0;height:0}.leaflet-tile-pane{z-index:2}.leaflet-objects-pane{z-index:3}.leaflet-overlay-pane{z-index:4}.leaflet-shadow-pane{z-index:5}.leaflet-marker-pane{z-index:6}.leaflet-popup-pane{z-index:7}.leaflet-control{position:relative;z-index:7;pointer-events:auto}.leaflet-top,.leaflet-bottom{position:absolute;z-index:1000;pointer-events:none}.leaflet-top{top:0}.leaflet-right{right:0}.leaflet-bottom{bottom:0}.leaflet-left{left:0}.leaflet-control{float:left;clear:both}.leaflet-right .leaflet-control{float:right}.leaflet-top .leaflet-control{margin-top:10px}.leaflet-bottom .leaflet-control{margin-bottom:10px}.leaflet-left .leaflet-control{margin-left:10px}.leaflet-right .leaflet-control{margin-right:10px}.leaflet-fade-anim .leaflet-tile,.leaflet-fade-anim .leaflet-popup{opacity:0;-webkit-transition:opacity .2s linear;-moz-transition:opacity .2s linear;-o-transition:opacity .2s linear;transition:opacity .2s linear}.leaflet-fade-anim .leaflet-tile-loaded,.leaflet-fade-anim .leaflet-map-pane .leaflet-popup{opacity:1}.leaflet-zoom-anim .leaflet-zoom-animated{-webkit-transition:-webkit-transform .25s cubic-bezier(0,0,.25,1);-moz-transition:-moz-transform .25s cubic-bezier(0,0,.25,1);-o-transition:-o-transform .25s cubic-bezier(0,0,.25,1);transition:transform .25s cubic-bezier(0,0,.25,1)}.leaflet-zoom-anim .leaflet-tile,.leaflet-pan-anim .leaflet-tile,.leaflet-touching .leaflet-zoom-animated{-webkit-transition:none;-moz-transition:none;-o-transition:none;transition:none}.leaflet-zoom-anim .leaflet-zoom-hide{visibility:hidden}.leaflet-clickable{cursor:pointer}.leaflet-container{cursor:-webkit-grab;cursor:-moz-grab}.leaflet-popup-pane,.leaflet-control{cursor:auto}.leaflet-dragging,.leaflet-dragging .leaflet-clickable,.leaflet-dragging .leaflet-container{cursor:move;cursor:-webkit-grabbing;cursor:-moz-grabbing}.leaflet-container{background:#ddd;outline:0}.leaflet-container a{color:#0078A8}.leaflet-container a.leaflet-active{outline:2px solid orange}.leaflet-zoom-box{border:2px dotted #05f;background:#fff;opacity:.5}.leaflet-container{font:12px/1.5 \"Helvetica Neue\",Arial,Helvetica,sans-serif}.leaflet-bar{box-shadow:0 1px 7px rgba(0,0,0,.65);-webkit-border-radius:4px;border-radius:4px}.leaflet-bar a{background-color:#fff;border-bottom:1px solid #ccc;width:26px;height:26px;line-height:26px;display:block;text-align:center;text-decoration:none;color:#000}.leaflet-bar a,.leaflet-control-layers-toggle{background-position:50% 50%;background-repeat:no-repeat;display:block}.leaflet-bar a:hover{background-color:#f4f4f4}.leaflet-bar a:first-child{-webkit-border-top-left-radius:4px;border-top-left-radius:4px;-webkit-border-top-right-radius:4px;border-top-right-radius:4px}.leaflet-bar a:last-child{-webkit-border-bottom-left-radius:4px;border-bottom-left-radius:4px;-webkit-border-bottom-right-radius:4px;border-bottom-right-radius:4px;border-bottom:0}.leaflet-bar a.leaflet-disabled{cursor:default;background-color:#f4f4f4;color:#bbb}.leaflet-touch .leaflet-bar{-webkit-border-radius:10px;border-radius:10px}.leaflet-touch .leaflet-bar a{width:30px;height:30px}.leaflet-touch .leaflet-bar a:first-child{-webkit-border-top-left-radius:7px;border-top-left-radius:7px;-webkit-border-top-right-radius:7px;border-top-right-radius:7px}.leaflet-touch .leaflet-bar a:last-child{-webkit-border-bottom-left-radius:7px;border-bottom-left-radius:7px;-webkit-border-bottom-right-radius:7px;border-bottom-right-radius:7px;border-bottom:0}.leaflet-control-zoom-in{font:700 18px 'Lucida Console',Monaco,monospace}.leaflet-control-zoom-out{font:700 22px 'Lucida Console',Monaco,monospace}.leaflet-touch .leaflet-control-zoom-in{font-size:22px;line-height:30px}.leaflet-touch .leaflet-control-zoom-out{font-size:28px;line-height:30px}.leaflet-control-layers{box-shadow:0 1px 7px rgba(0,0,0,.4);background:#f8f8f9;-webkit-border-radius:5px;border-radius:5px}.leaflet-control-layers-toggle{background-image:url(images/layers.png);width:36px;height:36px}.leaflet-retina .leaflet-control-layers-toggle{background-image:url(images/layers-2x.png);background-size:26px 26px}.leaflet-touch .leaflet-control-layers-toggle{width:44px;height:44px}.leaflet-control-layers .leaflet-control-layers-list,.leaflet-control-layers-expanded .leaflet-control-layers-toggle{display:none}.leaflet-control-layers-expanded .leaflet-control-layers-list{display:block;position:relative}.leaflet-control-layers-expanded{padding:6px 10px 6px 6px;color:#333;background:#fff}.leaflet-control-layers-selector{margin-top:2px;position:relative;top:1px}.leaflet-control-layers label{display:block}.leaflet-control-layers-separator{height:0;border-top:1px solid #ddd;margin:5px -10px 5px -6px}.leaflet-container .leaflet-control-attribution{background-color:rgba(255,255,255,.7);box-shadow:0 0 5px #bbb;margin:0}.leaflet-control-attribution,.leaflet-control-scale-line{padding:0 5px;color:#333}.leaflet-container .leaflet-control-attribution,.leaflet-container .leaflet-control-scale{font-size:11px}.leaflet-left .leaflet-control-scale{margin-left:5px}.leaflet-bottom .leaflet-control-scale{margin-bottom:5px}.leaflet-control-scale-line{border:2px solid #777;border-top:0;color:#000;line-height:1.1;padding:2px 5px 1px;font-size:11px;text-shadow:1px 1px 1px #fff;background-color:rgba(255,255,255,.5);box-shadow:0 -1px 5px rgba(0,0,0,.2);white-space:nowrap;overflow:hidden}.leaflet-control-scale-line:not(:first-child){border-top:2px solid #777;border-bottom:0;margin-top:-2px;box-shadow:0 2px 5px rgba(0,0,0,.2)}.leaflet-control-scale-line:not(:first-child):not(:last-child){border-bottom:2px solid #777}.leaflet-touch .leaflet-control-attribution,.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-control-zoom{box-shadow:none}.leaflet-touch .leaflet-control-layers,.leaflet-touch .leaflet-control-zoom{border:4px solid rgba(0,0,0,.3)}.leaflet-popup{position:absolute;text-align:center}.leaflet-popup-content-wrapper{padding:1px;text-align:left;-webkit-border-radius:12px;border-radius:12px}.leaflet-popup-content{margin:13px 19px;line-height:1.4}.leaflet-popup-content p{margin:18px 0}.leaflet-popup-tip-container{margin:0 auto;width:40px;height:20px;position:relative;overflow:hidden}.leaflet-popup-tip{width:17px;height:17px;padding:1px;margin:-10px auto 0;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}.leaflet-popup-content-wrapper,.leaflet-popup-tip{background:#fff;box-shadow:0 3px 14px rgba(0,0,0,.4)}.leaflet-container a.leaflet-popup-close-button{position:absolute;top:0;right:0;padding:4px 4px 0 0;text-align:center;width:18px;height:14px;font:16px/14px Tahoma,Verdana,sans-serif;color:#c3c3c3;text-decoration:none;font-weight:700;background:transparent}.leaflet-container a.leaflet-popup-close-button:hover{color:#999}.leaflet-popup-scrolled{overflow:auto;border-bottom:1px solid #ddd;border-top:1px solid #ddd}.leaflet-div-icon{background:#fff;border:1px solid #666}.leaflet-editing-icon{-webkit-border-radius:2px;border-radius:2px}"), !0
}), define("css!panels/bettermap/leaflet/plugins.css", ["css-embed"], function (a) {
    return a('.leaflet-cluster-anim .leaflet-marker-icon,.leaflet-cluster-anim .leaflet-marker-shadow{-webkit-transition:-webkit-transform .2s ease-out,opacity .2s ease-in;-moz-transition:-moz-transform .2s ease-out,opacity .2s ease-in;-o-transition:-o-transform .2s ease-out,opacity .2s ease-in;transition:transform .2s ease-out,opacity .2s ease-in}.marker-cluster-small{background-color:rgba(181,226,140,.6)}.marker-cluster-small div{background-color:rgba(110,204,57,.6)}.marker-cluster-medium{background-color:rgba(241,211,87,.6)}.marker-cluster-medium div{background-color:rgba(240,194,12,.6)}.marker-cluster-large{background-color:rgba(253,156,115,.6)}.marker-cluster-large div{background-color:rgba(241,128,23,.6)}.marker-cluster{background-clip:padding-box;border-radius:20px}.marker-cluster div{width:30px;height:30px;margin-left:5px;margin-top:5px;text-align:center;border-radius:15px;font:12px "Helvetica Neue",Arial,Helvetica,sans-serif}.marker-cluster span{line-height:30px}.leaflet-label{background:#1f1f1f;background-clip:padding-box;border-radius:4px;border-style:solid;border-width:0;display:block;font-weight:200;font-size:11pt;padding:5px;position:absolute;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;white-space:nowrap;z-index:99999!important}.leaflet-label:before{border-right:6px solid #000;border-right-color:inherit;border-top:6px solid transparent;border-bottom:6px solid transparent;content:"";position:absolute;top:5px;left:-10px;display:none}'), !0
}), define("panels/bettermap/module", ["angular", "app", "underscore", "./leaflet/leaflet-src", "require", "css!./module.css", "css!./leaflet/leaflet.css", "css!./leaflet/plugins.css"], function (a, b, c, d, e) {
    var f = a.module("kibana.panels.bettermap", []);
    b.useModule(f), f.controller("bettermap", ["$scope", "querySrv", "dashboard", "filterSrv", function (b, f, g, h) {
        b.panelMeta = {editorTabs: [
            {title: "Queries", src: "app/partials/querySelect.html"}
        ], modals: [
            {description: "Inspect", icon: "icon-info-sign", partial: "app/partials/inspector.html", show: b.panel.spyable}
        ], status: "Experimental", description: "Displays geo points in clustered groups on a map. The cavaet for this panel is that, for better or worse, it does NOT use the terms facet and it <b>does</b> query sequentially. This however means that it transfers more data and is generally heavier to compute, while showing less actual data. If you have a time filter, it will attempt to show to most recent points in your search, up to your defined limit"};
        var i = {queries: {mode: "all", ids: []}, size: 1e3, spyable: !0, tooltip: "_id", field: null};
        c.defaults(b.panel, i), b.requireContext = e, b.init = function () {
            b.$on("refresh", function () {
                b.get_data()
            }), b.get_data()
        }, b.get_data = function (a, e) {
            b.require(["./leaflet/plugins"], function () {
                if (b.panel.error = !1, 0 !== g.indices.length) {
                    if (c.isUndefined(b.panel.field))return b.panel.error = "Please select a field that contains geo point in [lon,lat] format", void 0;
                    var i = c.uniq(c.pluck(h.getByType("time"), "field"));
                    i.length > 1 ? b.panel.error = "Time field must be consistent amongst time filters" : i = 0 === i.length ? null : i[0];
                    var j = c.isUndefined(a) ? 0 : a;
                    b.panel.queries.ids = f.idsByMode(b.panel.queries);
                    var k = b.ejs.BoolQuery();
                    c.each(b.panel.queries.ids, function (a) {
                        k = k.should(f.getEjsObj(a))
                    });
                    var l = b.ejs.Request().indices(g.indices[j]).query(b.ejs.FilteredQuery(k, h.getBoolFilter(h.ids).must(b.ejs.ExistsFilter(b.panel.field)))).fields([b.panel.field, b.panel.tooltip]).size(b.panel.size);
                    c.isNull(i) || (l = l.sort(i, "desc")), b.populate_modal(l);
                    var m = l.doSearch();
                    m.then(function (a) {
                        return b.panelMeta.loading = !1, 0 === j && (b.hits = 0, b.data = [], e = b.query_id = (new Date).getTime()), c.isUndefined(a.error) ? (b.query_id === e && (b.data = b.data.slice(0, b.panel.size).concat(c.map(a.hits.hits, function (a) {
                            return{coordinates: new d.LatLng(a.fields[b.panel.field][1], a.fields[b.panel.field][0]), tooltip: a.fields[b.panel.tooltip]}
                        })), b.$emit("draw"), b.data.length < b.panel.size && j + 1 < g.indices.length && b.get_data(j + 1, b.query_id)), void 0) : (b.panel.error = b.parse_error(a.error), void 0)
                    })
                }
            })
        }, b.populate_modal = function (c) {
            b.inspector = a.toJson(JSON.parse(c.toString()), !0)
        }
    }]), f.directive("bettermap", function () {
        return{restrict: "A", link: function (a, b, e) {
            function f() {
                a.require(["./leaflet/plugins"], function () {
                    a.panelMeta.loading = !1, d.Icon.Default.imagePath = "app/panels/bettermap/leaflet/images", c.isUndefined(g) ? (g = d.map(e.id, {scrollWheelZoom: !1, center: [40, -86], zoom: 10}), d.tileLayer("http://{s}.tile.cloudmade.com/57cbb6ca8cac418dbb1a402586df4528/22677/256/{z}/{x}/{y}.png", {maxZoom: 18, minZoom: 2}).addTo(g), h = new d.MarkerClusterGroup({maxClusterRadius: 30})) : h.clearLayers(), c.each(a.data, function (a) {
                        c.isUndefined(a.tooltip) || "" === a.tooltip ? h.addLayer(d.marker(a.coordinates)) : h.addLayer(d.marker(a.coordinates).bindLabel(a.tooltip))
                    }), h.addTo(g), g.fitBounds(c.pluck(a.data, "coordinates"))
                })
            }

            b.html('<center><img src="img/load_big.gif"></center>'), a.$on("draw", function () {
                f()
            }), a.$on("render", function () {
                c.isUndefined(g) || (g.invalidateSize(), g.getPanes())
            });
            var g, h
        }}
    })
});
