let abr = function (e) {
    var t = {};
    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports
    }
    return n("FN7h").default;
    // n.m = e, n.c = t, n.d = function(e, t, r) {
    //     n.o(e, t) || Object.defineProperty(e, t, {
    //         enumerable: !0,
    //         get: r
    //     })
    // }, n.r = function(e) {
    //     "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
    //         value: "Module"
    //     }), Object.defineProperty(e, "__esModule", {
    //         value: !0
    //     })
    // }, n.t = function(e, t) {
    //     if (1 & t && (e = n(e)), 8 & t) return e;
    //     if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    //     var r = Object.create(null);
    //     if (n.r(r), Object.defineProperty(r, "default", {
    //         enumerable: !0,
    //         value: e
    //     }), 2 & t && "string" != typeof e)
    //         for (var o in e) n.d(r, o, function(t) {
    //             return e[t]
    //         }.bind(null, o));
    //     return r
    // }, n.n = function(e) {
    //     var t = e && e.__esModule ? function() {
    //         return e.default
    //     } : function() {
    //         return e
    //     };
    //     return n.d(t, "a", t), t
    // }, n.o = function(e, t) {
    //     return Object.prototype.hasOwnProperty.call(e, t)
    // }, n.p = "/", n(n.s = "v59c");

}({
    "0Zmq": function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = {
            debug: !1
        },
            o = "?";

        function i() {
            return "https://m.beidian.com/login/fast_login.html";
        }
        r.computeStackTrace = function () {
            function e(e) {
                if (void 0 !== e.stack && e.stack) {
                    for (var t, n, r, a = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, s = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, c = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx(?:-web)|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, u = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, l = /\((\S*)(?::(\d+))(?::(\d+))\)/, f = e.stack.split("\n"), d = [], p = (/^(.*) is undefined$/.exec(e.message), 0), h = f.length; p < h; ++p) {
                        if (n = a.exec(f[p])) {
                            var m = n[2] && 0 === n[2].indexOf("native");
                            n[2] && 0 === n[2].indexOf("eval") && (t = l.exec(n[2])) && (n[2] = t[1], n[3] = t[2], n[4] = t[3]), r = {
                                url: m ? null : n[2],
                                func: n[1] || o,
                                args: m ? [n[2]] : [],
                                line: n[3] ? +n[3] : null,
                                column: n[4] ? +n[4] : null
                            }
                        } else if (n = c.exec(f[p])) r = {
                            url: n[2],
                            func: n[1] || o,
                            args: [],
                            line: +n[3],
                            column: n[4] ? +n[4] : null
                        };
                        else {
                            if (!(n = s.exec(f[p]))) continue;
                            n[3] && n[3].indexOf(" > eval") > -1 && (t = u.exec(n[3])) ? (n[3] = t[1], n[4] = t[2], n[5] = null) : 0 !== p || n[5] || void 0 === e.columnNumber || (d[0].column = e.columnNumber + 1), r = {
                                url: n[3],
                                func: n[1] || o,
                                args: n[2] ? n[2].split(",") : [],
                                line: n[4] ? +n[4] : null,
                                column: n[5] ? +n[5] : null
                            }
                        } !r.func && r.line && (r.func = o), d.push(r)
                    }
                    return d.length ? {
                        name: e.name,
                        message: e.message,
                        url: i(),
                        stack: d
                    } : null
                }
            }

            function t(e, t, n, r) {
                var i = {
                    url: t,
                    line: n
                };
                if (i.url && i.line) {
                    if (e.incomplete = !1, i.func || (i.func = o), e.stack.length > 0 && e.stack[0].url === i.url) {
                        if (e.stack[0].line === i.line) return !1;
                        if (!e.stack[0].line && e.stack[0].func === i.func) return e.stack[0].line = i.line, !1
                    }
                    return e.stack.unshift(i), e.partial = !0, !0
                }
                return e.incomplete = !0, !1
            }

            function n(e, s) {
                for (var c, u, l = /function\s+([_$a-zA-Z -￿][_$a-zA-Z0-9 -￿]*)?\s*\(/i, f = [], d = {}, p = !1, h = n.caller; h && !p; h = h.caller)
                    if (h !== a && h !== r.report) {
                        if (u = {
                            url: null,
                            func: o,
                            line: null,
                            column: null
                        }, h.name ? u.func = h.name : (c = l.exec(h.toString())) && (u.func = c[1]), void 0 === u.func) try {
                            u.func = c.input.substring(0, c.input.indexOf("{"))
                        } catch (e) { }
                        d["" + h] ? p = !0 : d["" + h] = !0, f.push(u)
                    }
                s && f.splice(0, s);
                var m = {
                    name: e.name,
                    message: e.message,
                    url: i(),
                    stack: f
                };
                return t(m, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description), m
            }

            function a(t, o) {
                var a = null;
                o = null == o ? 0 : +o;
                try {
                    if (a = e(t)) return a
                } catch (e) {
                    if (r.debug) throw e
                }
                try {
                    if (a = n(t, o + 1)) return a
                } catch (e) {
                    if (r.debug) throw e
                }
                return {
                    name: t.name,
                    message: t.message,
                    url: i()
                }
            }
            return a.augmentStackTraceWithInitialElement = t, a.computeStackTraceFromStackProp = e, a
        }(), t.default = r
    },
    "3y9D": function (e, t, n) {
        "use strict";
        var r, o, i, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        ! function (s, c) {
            "object" === a(t) ? e.exports = t = c(n("Ib8C")) : (o = [n("Ib8C")], void 0 === (i = "function" == typeof (r = c) ? r.apply(t, o) : r) || (e.exports = i))
        }(0, function (e) {
            return function () {
                var t = e,
                    n = t.lib,
                    r = n.WordArray,
                    o = n.Hasher,
                    i = [],
                    a = t.algo.SHA1 = o.extend({
                        _doReset: function () {
                            this._hash = new r.init([1732584193, 4023233417, 2562383102, 271733878, 3285377520])
                        },
                        _doProcessBlock: function (e, t) {
                            for (var n = this._hash.words, r = n[0], o = n[1], a = n[2], s = n[3], c = n[4], u = 0; u < 80; u++) {
                                if (u < 16) i[u] = 0 | e[t + u];
                                else {
                                    var l = i[u - 3] ^ i[u - 8] ^ i[u - 14] ^ i[u - 16];
                                    i[u] = l << 1 | l >>> 31
                                }
                                var f = (r << 5 | r >>> 27) + c + i[u];
                                f += u < 20 ? 1518500249 + (o & a | ~o & s) : u < 40 ? 1859775393 + (o ^ a ^ s) : u < 60 ? (o & a | o & s | a & s) - 1894007588 : (o ^ a ^ s) - 899497514, c = s, s = a, a = o << 30 | o >>> 2, o = r, r = f
                            }
                            n[0] = n[0] + r | 0, n[1] = n[1] + o | 0, n[2] = n[2] + a | 0, n[3] = n[3] + s | 0, n[4] = n[4] + c | 0
                        },
                        _doFinalize: function () {
                            var e = this._data,
                                t = e.words,
                                n = 8 * this._nDataBytes,
                                r = 8 * e.sigBytes;
                            return t[r >>> 5] |= 128 << 24 - r % 32, t[14 + (r + 64 >>> 9 << 4)] = Math.floor(n / 4294967296), t[15 + (r + 64 >>> 9 << 4)] = n, e.sigBytes = 4 * t.length, this._process(), this._hash
                        },
                        clone: function () {
                            var e = o.clone.call(this);
                            return e._hash = this._hash.clone(), e
                        }
                    });
                t.SHA1 = o._createHelper(a), t.HmacSHA1 = o._createHmacHelper(a)
            }(), e.SHA1
        })
    },
    Apbo: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = /(MicroMessenger|QQ|__weibo__|Mizhe|Beibei|MizheHD|BeibeiHD|Yuerbao|Feifan|Beidian|Beidai|Weiyou|education|Beibeipush|xshop)\/?([\d\.]+)/i,
            o = {
                MicroMessenger: "Weixin",
                __weibo__: "Weibo"
            },
            i = /(UCWEB|UCBrowser|MQQBrowser|MiuiBrowser|Chrome|CriOS)[\s\/]([\d\.]+)/i,
            a = {
                UCWEB: "UC",
                UCBrowser: "UC",
                MQQBrowser: "QQ",
                MiuiBrowser: "Xiaomi",
                CriOS: "Chrome"
            },
            s = /(Android|iPhone|iPad|iPod)/i,
            c = /Android[\s\/]([\d\.]+)|OS ([\d_\.]+) like Mac OS X/i,
            u = /hybrid[\s\/]([\d\.]+)/i,
            l = /^\d+(\.\d+)*$/,
            f = t.UA = "undefined" != typeof window ? window.navigator.userAgent : "",
            d = (t.setUserAgent = function (e) {
                t.UA = f = e
            }, t.getAppName = function () {
                var e = f.match(r);
                return null === e ? "unknown" : o[e[1]] ? o[e[1]] : e[1]
            }),
            p = t.getOSName = function () {
                var e = f.match(s);
                return e ? e[1] : "unknow"
            },
            h = t.isIOS = function () {
                var e = p();
                return "iPhone" === e || "iPod" === e || "iPad" === e
            },
            m = t.getBrowserName = function () {
                var e = f.match(i);
                return null === e ? h() ? /Safari/.test(f) ? "Safari" : "iOS Webview" : "unknow" : a[e[1]] ? a[e[1]] : e[1]
            },
            y = t.getAppVersion = function () {
                var e = f.match(r);
                return (e ? e[2] : "0.0.0").replace(/_/g, ".")
            },
            g = t.getOSVersion = function () {
                var e = f.match(c);
                return (e ? e[1] || e[2] : "0.0.0").replace(/_/g, ".")
            },
            v = t.getBrowserVersion = function () {
                var e = f.match(i),
                    t = void 0;
                if (null === e)
                    if (h()) {
                        var n = void 0;
                        t = (n = /Safari/.test(f) ? f.match(/Version\/([\d\.]+)/) : f.match(/OS ([\d_\.]+) like Mac OS X/)) ? n[1] : "0.0.0"
                    } else t = "0.0.0";
                else t = e[2];
                return t.replace(/_/g, ".")
            },
            b = t.isWeixin = function () {
                return "Weixin" === d()
            },
            _ = t.isQQ = function () {
                return "QQ" === d()
            },
            w = t.isWeibo = function () {
                return "Weibo" === d()
            },
            S = t.isMizhe = function () {
                var e = d();
                return "Mizhe" === e || "MizheHD" === e
            },
            k = t.isMizheHD = function () {
                return "MizheHD" === d()
            },
            x = t.isBeibei = function () {
                var e = d();
                return /(beibei)|(beibeiHD)/i.test(e)
            },
            j = t.isBeibeiHD = function () {
                return "BeibeiHD" === d()
            },
            O = t.isYuerbao = function () {
                return "Yuerbao" === d()
            },
            E = t.isEducation = function () {
                return "education" === d()
            },
            C = (t.isBeibeipush = function () {
                return "Beibeipush" === d()
            }, t.isBeidian = function () {
                return "Beidian" === d()
            }),
            T = t.isBeidai = function () {
                return "Beidai" === d()
            },
            M = t.isWeiyou = function () {
                return "Weiyou" === d()
            },
            A = t.isXshop = function () {
                return "xshop" === d()
            },
            P = t.isAndroid = function () {
                return "Android" === p()
            },
            B = t.isIPhone = function () {
                var e = p();
                return "iPhone" === e || "iPod" === e
            },
            I = t.isIPad = function () {
                return "iPad" === p()
            },
            H = t.isUC = function () {
                var e = !1;
                return f.match(/(?:UCWEB|UCBrowser\/)([\d\.]+)/) && (e = !0), e
            },
            D = t.isXiaomi = function () {
                var e = !1;
                return f.match(/MiuiBrowser\/([\d\.]+)/) && (e = !0), e
            },
            R = t.isChrome = function () {
                return "Chrome" === m()
            },
            L = t.isSafari = function () {
                return "Safari" === m()
            },
            N = t.isWebview = function () {
                return "iOS Webview" === m()
            },
            U = t.isHybridExist = function () {
                return !!f.match(u)
            },
            F = t.getHybridVersion = function () {
                var e = f.match(u);
                return e ? e[1] : "0.0.0"
            },
            q = function (e) {
                return l.test(e)
            },
            W = t.compare = function (e, t) {
                if (q(e) && q(t)) {
                    e = e.toString().split("."), t = t.toString().split(".");
                    for (var n = 0, r = e.length, o = t.length; n < r || n < o; n++) {
                        var i = parseInt(e[n], 10),
                            a = parseInt(t[n], 10);
                        if (i < a) return -1;
                        if (i > a) return 1
                    }
                    return 0
                }
                return console.error("version value is invalid")
            },
            z = t.version = function (e) {
                return {
                    gt: function (t) {
                        return W(e, t) > 0
                    },
                    gte: function (t) {
                        return W(e, t) >= 0
                    },
                    eq: function (t) {
                        return 0 === W(e, t)
                    },
                    lte: function (t) {
                        return W(e, t) <= 0
                    },
                    lt: function (t) {
                        return W(e, t) < 0
                    }
                }
            },
            $ = t.app = {
                getAppName: d,
                isBeibei: x,
                isBeibeiHD: j,
                getAppVersion: y,
                isMizhe: S,
                isMizheHD: k,
                isWeixin: b,
                isWeibo: w,
                isQQ: _,
                isYuerbao: O,
                isEducation: E,
                isBeidian: C,
                isBeidai: T,
                isWeiyou: M,
                isXshop: A
            },
            J = t.os = {
                isAndroid: P,
                isIPhone: B,
                isIPad: I,
                isIOS: h,
                getOSName: p,
                getOSVersion: g
            },
            X = t.browser = {
                isUC: H,
                isXiaomi: D,
                isChrome: R,
                isSafari: L,
                isWebview: N,
                getBrowserName: m,
                getBrowserVersion: v
            },
            K = t.hybrid = {
                isHybridExist: U,
                getHybridVersion: F
            };
        t.default = {
            app: $,
            os: J,
            browser: X,
            hybrid: K,
            version: z
        }
    },
    DMch: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
            o = function (e) {
                return "object" === (void 0 === e ? "undefined" : r(e)) && ! function (e) {
                    return void 0 === e
                }(e) && ! function (e) {
                    return null !== e && e === e.window
                }(e) && Object.getPrototypeOf(e) === Object.prototype
            },
            i = function (e) {
                return e instanceof Array
            };
        t.default = function () {
            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            var r = t[0],
                a = void 0,
                s = Array.prototype.slice.call(t, 1);
            return "boolean" == typeof r && (a = r, r = s.shift()), s.forEach(function (e) {
                ! function e(t, n, r) {
                    for (var a in n) r && (o(n[a]) || i(n[a])) ? (o(n[a]) && !o(t[a]) && (t[a] = {}), i(n[a]) && !i(t[a]) && (t[a] = []), e(t[a], n[a], r)) : void 0 !== n[a] && (t[a] = n[a])
                }(r, e, a)
            }), r
        }
    },
    FN7h: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = i(n("Gr6/")),
            o = i(n("cv67"));

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var a = function (e) {
            if (!e || "[object Object]" !== Object.prototype.toString.call(e)) return console.warn("objToArray函数入参错误"), [];
            var t = [],
                n = "";
            for (n in e) t.push(n + "=" + e[n]);
            return t
        };
        t.default = function (e) {
            var t = e.url,
                n = e.type,
                i = e.query,
                s = e.body,
                c = e.version,
                u = e.unixTime;
            if (!t || t.indexOf("//") > -1 && t.indexOf("//api") < 0 && t.indexOf("//eduapi") < 0 && t.indexOf("//bapi") < 0) return "";
            var l = function (e) {
                return e.indexOf("//") < 0 ? e : (e.indexOf("http") < 0 && (e = "https:" + e), e.match(new RegExp("^(https?|beibei|beibeiapp|mizhe|mizheapp):[/]{2}(?:([^@/:?]+)(?::([^@/:]+))?@)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^#]*))?(#[^#]*)?$"))[6] || "/")
            }(t),
                f = a(i),
                d = a(s);
            f = function e(t) {
                if (!t || "[object Array]" !== Object.prototype.toString.call(t)) return console.warn("quickSort函数入参错误"), [];
                if (t.length <= 1) return t;
                for (var n = Math.floor(t.length / 2), r = t.splice(n, 1), o = [], i = [], a = 0; a < t.length; a++) r > t[a] ? o.push(t[a]) : i.push(t[a]);
                return e(o).concat(r, e(i))
            }(f), c = c || "01", n = n.toUpperCase(), u = u || Math.round((new Date).getTime() / 1e3);
            var p = d.length ? (0, o.default)(d.join("&")) : "",
                h = l + (f.length ? "?" + f.join("&") : ""),
                m = u.toString(16),
                y = c + "\n" + n + "\n" + p + "\n" + h + "\n" + u;
            return c + (0, r.default)(y, "ytU7vwqIx2UXQNsi") + m
        }
    },
    Fy1N: function (e, t) { },
    GXBh: function (e, t, n) {
        "use strict";
        (function (e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var n = {};
            "undefined" != typeof window ? n = window : void 0 !== e ? n = e : "undefined" != typeof self && (n = self);
            var r = function () {
                try {
                    return new ErrorEvent(""), !0
                } catch (e) {
                    return !1
                }
            },
                o = function (e) {
                    return void 0 === e
                },
                i = function (e) {
                    return "[object Object]" === Object.prototype.toString.call(e)
                },
                a = function (e) {
                    return "[object String]" === Object.prototype.toString.call(e)
                },
                s = function (e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                },
                c = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                },
                u = function (e, t) {
                    var n = void 0,
                        r = void 0;
                    if (o(e.length))
                        for (n in e) c(e, n) && t(n, e[n]);
                    else if (r = e.length)
                        for (n = 0; n < r; n++) t(n, e[n])
                },
                l = function (e) {
                    var t = [],
                        n = void 0,
                        r = void 0,
                        o = void 0,
                        i = void 0,
                        s = void 0;
                    if (!e || !e.tagName) return "";
                    if (t.push(e.tagName.toLowerCase()), e.id && t.push("#" + e.id), (n = e.className) && a(n))
                        for (r = n.split(/\s+/), s = 0; s < r.length; s++) t.push("." + r[s]);
                    var c = ["type", "name", "title", "alt"];
                    for (s = 0; s < c.length; s++) o = c[s], (i = e.getAttribute(o)) && t.push("[" + o + '="' + i + '"]');
                    return t.join("")
                };
            t.default = {
                isError: function (e) {
                    switch ({}.toString.call(e)) {
                        case "[object Error]":
                        case "[object Exception]":
                        case "[object DOMException]":
                            return !0;
                        default:
                            return e instanceof Error
                    }
                },
                isErrorEvent: function (e) {
                    return r() && "[object ErrorEvent]" === {}.toString.call(e)
                },
                isUndefined: o,
                isFunction: function (e) {
                    return "function" == typeof e
                },
                isPlainObject: i,
                isString: a,
                isArray: s,
                isEmptyObject: function (e) {
                    if (!i(e)) return !1;
                    for (var t in e)
                        if (e.hasOwnProperty(t)) return !1;
                    return !0
                },
                supportsErrorEvent: r,
                supportsFetch: function () {
                    if (!("fetch" in n)) return !1;
                    try {
                        return new Headers, new Request(""), new Response, !0
                    } catch (e) {
                        return !1
                    }
                },
                wrappedCallback: function (e) {
                    return function (t, n) {
                        var r = e(t) || t;
                        return n && n(r) || r
                    }
                },
                each: u,
                objectMerge: function (e, t) {
                    return t ? (u(t, function (t, n) {
                        e[t] = n
                    }), e) : e
                },
                hasKey: c,
                joinRegExp: function (e) {
                    for (var t = [], n = 0, r = e.length, o = void 0; n < r; n++) o = e[n], a(o) ? t.push(o.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")) : o && o.source && t.push(o.source);
                    return new RegExp(t.join("|"), "i")
                },
                htmlTreeAsString: function (e) {
                    for (var t = [], n = 0, r = 0, o = " > ".length, i = void 0; e && n++ < 5 && !("html" === (i = l(e)) || n > 1 && r + t.length * o + i.length >= 80);) t.push(i), r += i.length, e = e.parentNode;
                    return t.reverse().join(" > ")
                },
                htmlElementAsString: l,
                parseUrl: function (e) {
                    if ("string" != typeof e) return {};
                    var t = e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/),
                        n = t[6] || "",
                        r = t[8] || "";
                    return {
                        protocol: t[2],
                        host: t[4],
                        path: t[5],
                        relative: t[5] + n + r
                    }
                },
                fill: function (e, t, n, r) {
                    var o = e[t];
                    e[t] = n(o), e[t].__skynet__ = !0, e[t].__orig__ = o, r && r.push([e, t, o])
                },
                safeJoin: function (e, t) {
                    if (!s(e)) return "";
                    for (var n = [], r = 0; r < e.length; r++) try {
                        n.push(String(e[r]))
                    } catch (e) {
                        n.push("[value cannot be serialized]")
                    }
                    return n.join(t)
                }
            }
        }).call(this, n("yLpj"))
    },
    "Gr6/": function (e, t, n) {
        "use strict";
        var r, o, i, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        ! function (s, c, u) {
            "object" === a(t) ? e.exports = t = c(n("Ib8C"), n("3y9D"), n("WYAk")) : (o = [n("Ib8C"), n("3y9D"), n("WYAk")], void 0 === (i = "function" == typeof (r = c) ? r.apply(t, o) : r) || (e.exports = i))
        }(0, function (e) {
            return e.HmacSHA1
        })
    },
    Ib8C: function (e, t, n) {
        "use strict";
        var r, o, i, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        ! function (n, s) {
            "object" === a(t) ? e.exports = t = s() : (o = [], void 0 === (i = "function" == typeof (r = s) ? r.apply(t, o) : r) || (e.exports = i))
        }(0, function () {
            var e = e || function (e, t) {
                var n = Object.create || function () {
                    function e() { }
                    return function (t) {
                        var n;
                        return e.prototype = t, n = new e, e.prototype = null, n
                    }
                }(),
                    r = {},
                    o = r.lib = {},
                    i = o.Base = {
                        extend: function (e) {
                            var t = n(this);
                            return e && t.mixIn(e), t.hasOwnProperty("init") && this.init !== t.init || (t.init = function () {
                                t.$super.init.apply(this, arguments)
                            }), t.init.prototype = t, t.$super = this, t
                        },
                        create: function () {
                            var e = this.extend();
                            return e.init.apply(e, arguments), e
                        },
                        init: function () { },
                        mixIn: function (e) {
                            for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                            e.hasOwnProperty("toString") && (this.toString = e.toString)
                        },
                        clone: function () {
                            return this.init.prototype.extend(this)
                        }
                    },
                    a = o.WordArray = i.extend({
                        init: function (e, t) {
                            e = this.words = e || [], this.sigBytes = void 0 != t ? t : 4 * e.length
                        },
                        toString: function (e) {
                            return (e || c).stringify(this)
                        },
                        concat: function (e) {
                            var t = this.words,
                                n = e.words,
                                r = this.sigBytes,
                                o = e.sigBytes;
                            if (this.clamp(), r % 4)
                                for (var i = 0; i < o; i++) {
                                    var a = n[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                                    t[r + i >>> 2] |= a << 24 - (r + i) % 4 * 8
                                } else
                                for (i = 0; i < o; i += 4) t[r + i >>> 2] = n[i >>> 2];
                            return this.sigBytes += o, this
                        },
                        clamp: function () {
                            var t = this.words,
                                n = this.sigBytes;
                            t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8, t.length = e.ceil(n / 4)
                        },
                        clone: function () {
                            var e = i.clone.call(this);
                            return e.words = this.words.slice(0), e
                        },
                        random: function (t) {
                            for (var n, r = [], o = function (t) {
                                t = t;
                                var n = 987654321,
                                    r = 4294967295;
                                return function () {
                                    var o = ((n = 36969 * (65535 & n) + (n >> 16) & r) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & r) & r;
                                    return o /= 4294967296, (o += .5) * (e.random() > .5 ? 1 : -1)
                                }
                            }, i = 0; i < t; i += 4) {
                                var s = o(4294967296 * (n || e.random()));
                                n = 987654071 * s(), r.push(4294967296 * s() | 0)
                            }
                            return new a.init(r, t)
                        }
                    }),
                    s = r.enc = {},
                    c = s.Hex = {
                        stringify: function (e) {
                            for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
                                var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                                r.push((i >>> 4).toString(16)), r.push((15 & i).toString(16))
                            }
                            return r.join("")
                        },
                        parse: function (e) {
                            for (var t = e.length, n = [], r = 0; r < t; r += 2) n[r >>> 3] |= parseInt(e.substr(r, 2), 16) << 24 - r % 8 * 4;
                            return new a.init(n, t / 2)
                        }
                    },
                    u = s.Latin1 = {
                        stringify: function (e) {
                            for (var t = e.words, n = e.sigBytes, r = [], o = 0; o < n; o++) {
                                var i = t[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                                r.push(String.fromCharCode(i))
                            }
                            return r.join("")
                        },
                        parse: function (e) {
                            for (var t = e.length, n = [], r = 0; r < t; r++) n[r >>> 2] |= (255 & e.charCodeAt(r)) << 24 - r % 4 * 8;
                            return new a.init(n, t)
                        }
                    },
                    l = s.Utf8 = {
                        stringify: function (e) {
                            try {
                                return decodeURIComponent(escape(u.stringify(e)))
                            } catch (e) {
                                throw new Error("Malformed UTF-8 data")
                            }
                        },
                        parse: function (e) {
                            return u.parse(unescape(encodeURIComponent(e)))
                        }
                    },
                    f = o.BufferedBlockAlgorithm = i.extend({
                        reset: function () {
                            this._data = new a.init, this._nDataBytes = 0
                        },
                        _append: function (e) {
                            "string" == typeof e && (e = l.parse(e)), this._data.concat(e), this._nDataBytes += e.sigBytes
                        },
                        _process: function (t) {
                            var n = this._data,
                                r = n.words,
                                o = n.sigBytes,
                                i = this.blockSize,
                                s = o / (4 * i),
                                c = (s = t ? e.ceil(s) : e.max((0 | s) - this._minBufferSize, 0)) * i,
                                u = e.min(4 * c, o);
                            if (c) {
                                for (var l = 0; l < c; l += i) this._doProcessBlock(r, l);
                                var f = r.splice(0, c);
                                n.sigBytes -= u
                            }
                            return new a.init(f, u)
                        },
                        clone: function () {
                            var e = i.clone.call(this);
                            return e._data = this._data.clone(), e
                        },
                        _minBufferSize: 0
                    }),
                    d = (o.Hasher = f.extend({
                        cfg: i.extend(),
                        init: function (e) {
                            this.cfg = this.cfg.extend(e), this.reset()
                        },
                        reset: function () {
                            f.reset.call(this), this._doReset()
                        },
                        update: function (e) {
                            return this._append(e), this._process(), this
                        },
                        finalize: function (e) {
                            return e && this._append(e), this._doFinalize()
                        },
                        blockSize: 16,
                        _createHelper: function (e) {
                            return function (t, n) {
                                return new e.init(n).finalize(t)
                            }
                        },
                        _createHmacHelper: function (e) {
                            return function (t, n) {
                                return new d.HMAC.init(e, n).finalize(t)
                            }
                        }
                    }), r.algo = {});
                return r
            }(Math);
            return e
        })
    },
    LE4b: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
            o = n("Apbo"),
            i = f(n("WqTA")),
            a = f(n("VS35")),
            s = n("uyoH"),
            c = f(n("X0s7")),
            u = f(n("b2Qx")),
            l = n("lCH3");

        function f(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var d = (0, a.default)(10),
            p = (d.error, d.error),
            h = d.info,
            m = d.warn,
            y = (0, u.default)(9).firstScreen,
            g = "true" === (0, s.parse)().params.forceChange,
            v = ["/redirect/", "/orchard_game", "/train_member_detail", "/after/"].join("|").replace(/([.*+?^=!:${}()[\]/\\])/g, "\\$1"),
            b = "https://m.beidian.com/login/fast_login.html".match(new RegExp(v)),
            _ = document.referrer,
            w = _ && (0, s.parse)(_).params.shop_id;
        ! function () {
            if (window.sessionStorage && (0, o.isWeixin)() && !b) {
                var e = "";
                if (["shop_id"].forEach(function (t) {
                    var n = (0, s.parse)().params && (0, s.parse)().params[t];
                    n && "0" !== n && (e = n)
                }), "undefined" === e && (e = ""), g || "" === _) return sessionStorage.setItem("shop_id", e), void sessionStorage.removeItem("error_shop_ids");
                var t, n = sessionStorage.getItem("shop_id"),
                    a = sessionStorage.getItem("error_shop_ids") || "[]";
                t = (a = JSON.parse(a)).indexOf(e) > -1, null !== n ? e && n !== e && w !== e && !t && (a.push(e), sessionStorage.setItem("error_shop_ids", JSON.stringify(a)), h("shop_id变更报错", {
                    shopId: (void 0 === e ? "undefined" : r(e)) + ": " + e,
                    sessionShopId: (void 0 === n ? "undefined" : r(n)) + ": " + n,
                    originSession: sessionStorage.getItem("shop_id"),
                    uid: (0, i.default)("_logged_") || "",
                    utmSource: sessionStorage.getItem("utm_source") || ""
                })) : sessionStorage.setItem("shop_id", e)
            }
        }(), t.default = {
            setRid: c.default.setRid,
            sendLog: c.default.sendLog,
            firstScreen: y,
            error: p,
            info: h,
            warn: m,
            jumpToApp: l.jumpToApp,
            suitOpenSource: l.suitOpenSource
        }
    },
    N2Cd: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
            o = function (e) {
                var t, n;
                t = Array.prototype.forEach, n = Array.prototype.map, this.each = function (e, n, r) {
                    if (null !== e)
                        if (t && e.forEach === t) e.forEach(n, r);
                        else if (e.length === +e.length) {
                            for (var o = 0, i = e.length; o < i; o++)
                                if (n.call(r, e[o], o, e) === {}) return
                        } else
                            for (var a in e)
                                if (e.hasOwnProperty(a) && n.call(r, e[a], a, e) === {}) return
                }, this.map = function (e, t, r) {
                    var o = [];
                    return null === e || void 0 === e ? o : n && e.map === n ? e.map(t, r) : (this.each(e, function (e, n, i) {
                        o[o.length] = t.call(r, e, n, i)
                    }), o)
                }, "object" === (void 0 === e ? "undefined" : r(e)) ? (this.hasher = e.hasher, this.screen_resolution = e.screen_resolution, this.screen_orientation = e.screen_orientation, this.canvas = e.canvas) : "function" == typeof e && (this.hasher = e)
            };
        o.prototype = {
            get: function () {
                var e = [];
                if (e.push(navigator.userAgent), e.push(navigator.language), e.push(screen.colorDepth), this.screen_resolution) {
                    var t = this.getScreenResolution();
                    void 0 !== t && e.push(t.join("x"))
                }
                return e.push((new Date).getTimezoneOffset()), e.push(this.hasSessionStorage()), e.push(this.hasLocalStorage()), e.push(!!window.indexedDB), document.body ? e.push(r(document.body.addBehavior)) : e.push("undefined"), e.push(r(window.openDatabase)), e.push(navigator.cpuClass), e.push(navigator.platform), e.push(navigator.doNotTrack), e.push(this.getPluginsString()), this.canvas && this.isCanvasSupported() && e.push(this.getCanvasFingerprint()), this.hasher ? this.hasher(e.join("###"), 31) : this.murmurhash3_32_gc(e.join("###"), 31)
            },
            murmurhash3_32_gc: function (e, t) {
                var n, r, o, i, a = void 0,
                    s = void 0,
                    c = void 0,
                    u = void 0;
                for (n = 3 & e.length, r = e.length - n, a = t, o = 3432918353, i = 461845907, u = 0; u < r;) c = 255 & e.charCodeAt(u) | (255 & e.charCodeAt(u += 1)) << 8 | (255 & e.charCodeAt(u += 1)) << 16 | (255 & e.charCodeAt(u += 1)) << 24, u += 1, a = 27492 + (65535 & (s = 5 * (65535 & (a = (a ^= c = (65535 & (c = (c = (65535 & c) * o + (((c >>> 16) * o & 65535) << 16) & 4294967295) << 15 | c >>> 17)) * i + (((c >>> 16) * i & 65535) << 16) & 4294967295) << 13 | a >>> 19)) + ((5 * (a >>> 16) & 65535) << 16) & 4294967295)) + ((58964 + (s >>> 16) & 65535) << 16);
                switch (c = 0, n) {
                    case 3:
                        c ^= (255 & e.charCodeAt(u + 2)) << 16;
                        break;
                    case 2:
                        c ^= (255 & e.charCodeAt(u + 1)) << 8;
                        break;
                    case 1:
                        a ^= c = (65535 & (c = (c = (65535 & (c ^= 255 & e.charCodeAt(u))) * o + (((c >>> 16) * o & 65535) << 16) & 4294967295) << 15 | c >>> 17)) * i + (((c >>> 16) * i & 65535) << 16) & 4294967295
                }
                return a ^= e.length, a = 2246822507 * (65535 & (a ^= a >>> 16)) + ((2246822507 * (a >>> 16) & 65535) << 16) & 4294967295, a = 3266489909 * (65535 & (a ^= a >>> 13)) + ((3266489909 * (a >>> 16) & 65535) << 16) & 4294967295, (a ^= a >>> 16) >>> 0
            },
            hasLocalStorage: function () {
                try {
                    return !!window.localStorage
                } catch (e) {
                    return !0
                }
            },
            hasSessionStorage: function () {
                try {
                    return !!window.sessionStorage
                } catch (e) {
                    return !0
                }
            },
            isCanvasSupported: function () {
                var e = document.createElement("canvas");
                return !(!e.getContext || !e.getContext("2d"))
            },
            getPluginsString: function () {
                return this.getRegularPluginsString()
            },
            getRegularPluginsString: function () {
                var e = this;
                return this.map(navigator.plugins, function (t) {
                    var n = e.map(t, function (e) {
                        return [e.type, e.suffixes].join("~")
                    }).join(",");
                    return [t.name, t.description, n].join("::")
                }, this).join(";")
            },
            getScreenResolution: function () {
                return this.screen_orientation ? screen.height > screen.width ? [screen.height, screen.width] : [screen.width, screen.height] : [screen.height, screen.width]
            },
            getCanvasFingerprint: function () {
                var e = document.createElement("canvas"),
                    t = e.getContext("2d"),
                    n = "http://valve.github.io";
                return t.textBaseline = "top", t.font = "14px 'Arial'", t.textBaseline = "alphabetic", t.fillStyle = "#f60", t.fillRect(125, 1, 62, 20), t.fillStyle = "#069", t.fillText(n, 2, 15), t.fillStyle = "rgba(102, 204, 0, 0.7)", t.fillText(n, 4, 17), e.toDataURL()
            }
        };
        t.default = new o({
            canvas: !0,
            screen_resolution: !0,
            screen_orientation: !0
        })
    },
    QJib: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
            o = function (e) {
                return !e && void 0 !== e && 0 !== e
            },
            i = function (e) {
                return "object" === (void 0 === e ? "undefined" : r(e)) && ! function (e) {
                    return o(e) || function (e) {
                        return void 0 === e
                    }(e)
                }(e) && ! function (e) {
                    return !o(e) && e === e.window
                }(e) && Object.getPrototypeOf(e) === Object.prototype
            },
            a = function (e) {
                return e instanceof Array
            };
        t.default = {
            extend: function (e) {
                for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                var o = void 0;
                return "boolean" == typeof e && (o = e, e = n.shift()), n.forEach(function (t) {
                    ! function e(t, n, r) {
                        for (var o in n) r && (i(n[o]) || a(n[o])) ? (i(n[o]) && !i(t[o]) && (t[o] = {}), a(n[o]) && !a(t[o]) && (t[o] = []), e(t[o], n[o], r)) : void 0 !== n[o] && (t[o] = n[o])
                    }(e, t, o)
                }), e
            }
        }
    },
    RcnY: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
            o = n("Apbo"),
            i = u(n("WqTA")),
            a = u(n("dH37")),
            s = n("uyoH"),
            c = u(n("QJib"));

        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var l = a.default,
            f = (0, s.parse)(),
            d = o.isBeibei,
            p = o.isYuerbao,
            h = o.isBeidian,
            m = o.isBeidai,
            y = o.isWeixin,
            g = o.isQQ,
            v = o.isAndroid,
            b = o.isIOS,
            _ = function (e) {
                return e && "null" !== e && "undefined" !== e
            },
            w = function (e, t) {
                try {
                    var n = f.params[e] || (0, i.default)(e) || window.sessionStorage.getItem(e) || "";
                    return t && window.sessionStorage.setItem(e, n), n
                } catch (e) {
                    return ""
                }
            },
            S = function () {
                return d() ? "app_beibei" : p() ? "app_yeb" : h() ? "app_bd" : m() ? "app_beidai" : y() ? "weixin" : g() ? "QQ" : function () {
                    var e = window.navigator.userAgent;
                    return e.indexOf("MSIE") >= 0 || e.indexOf("Firefox") >= 0 || e.indexOf("Chrome") >= 0 || e.indexOf("Opera") >= 0 || e.indexOf("Safari") >= 0
                }() ? "browser" : "others"
            },
            k = function () {
                return !!(d() || p() || h() || m())
            },
            x = {
                sendH5Also: !0,
                rid: "",
                logList: [],
                init: function () {
                    ! function () {
                        var e = f.params.utm_source;
                        if (_(e)) try {
                            window.sessionStorage.setItem("utm_source", e)
                        } catch (e) { }
                    }(),
                        function () {
                            var e = f.params._outer_channel;
                            _(e) && (0, i.default)("_outer_channel", e, {
                                expires: 7,
                                domain: ".beibei.com"
                            })
                        }()
                },
                setRid: function (e) {
                    this.rid = e
                },
                sendLog: function (e) {
                    if (!0 !== window.BBHybridCacheEngine) {
                        var t = f.params.is_beibei_app;
                        e = this.mergeData(e), k() && !t ? this.sendAppLog(e) : this.sendH5Log(e)
                    }
                },
                sendH5Log: function (e) {
                    var t = new Image,
                        n = "img" + (16777216 * Math.random() | 0);
                    window[n] = t;
                    var r = function () {
                        window[n] = null
                    };
                    t.onload = r, t.onerror = r, t.src = function (e) {
                        var t = "p1.gif";
                        e && e.et && (-1 !== ["log", "hybrid_fali_undefined", "session_invalid_3", "session_invalid"].indexOf(e.et) || /^pref_[\s\S]+/.test(e.et)) && (t = "p1_p.gif");
                        return "//c.beibei.com/" + t + "?"
                    }(e) + this.getStringData(e)
                },
                sendAppLog: function (e) {
                    var t = this;
                    e.is_hybrid = !0, l("logEvent").logEvent({
                        type: e.et,
                        params: e
                    }, function (n, r) {
                        !n && t.sendH5Also ? (delete e.is_hybrid, e.json.mark = "hybrid_success_" + e.et, e.json.version = (0, o.getAppVersion)(), t.sendH5Log(e)) : (delete e.is_hybrid, e.et = "hybrid_fali_" + e.et, t.sendH5Log(e))
                    })
                },
                isEmpty: function (e) {
                    for (var t in e) return !1;
                    return !0
                },
                filterForPattern: function (e) {
                    if (!e) return "";
                    var t = (0, s.parse)(e),
                        n = t.protocol + "//";
                    return t.username && (n += t.username, t.password && (n += ":" + t.password), n += "@"), n += t.host, t.port && "80" !== t.port && (n += ":" + t.port), t.pathname && (n += t.pathname), n
                },
                getStringData: function (e) {
                    var t = [];
                    for (var n in e)
                        if (Object.prototype.hasOwnProperty.call(e, n)) {
                            var o = e[n];
                            "object" === (void 0 === o ? "undefined" : r(o)) && (o = JSON.stringify(o)), t.push(n + "=" + encodeURIComponent(o))
                        }
                    return t.join("&")
                },
                getUids: function () {
                    return (0, i.default)("tem-au") || (0, i.default)("tem-au", "ul" + (String(+new Date).slice(-6) + Math.floor(1e8 * Math.random())), {
                        expires: 365
                    }), {
                            rid: this.rid || "80000",
                            hxid: (0, i.default)("hxid") || (0, i.default)("JSESSIONID"),
                            xid: (0, i.default)("st_au") || (0, i.default)("tem-au"),
                            sid: (0, i.default)("_logged_") ? (0, i.default)("_logged_").split("").pop() : 0
                        }
                },
                mergeData: function (e) {
                    var t = document.getElementsByTagName("body")[0].getAttribute("data-beacon"),
                        n = "beibei_H5";
                    try {
                        n = (t = JSON.parse(t)).json.biz_type
                    } catch (e) { } (e = c.default.extend({}, x.getUids(), e)).json || (e.json = {}), e.json.url = decodeURI(e.json.url || "https://m.beidian.com/login/fast_login.html"), e.json.pre_url = decodeURI(e.json.pre_url || document.referrer), e.json.url_pattern = decodeURI(e.json.url_pattern || this.filterForPattern("https://m.beidian.com/login/fast_login.html")), e.json.preurl_pattern = decodeURI(e.json.preurl_pattern || this.filterForPattern(document.referrer)), e.json.source = e.json.source || (k() ? "app_h5" : "web_h5");
                    var r = S();
                    return e.json.channel = e.json.channel || r, e.json.app_os = function () {
                        var e = "unknown";
                        return v() ? e = "android" : b() && (e = "ios"), e
                    }(), e.json.biz_type = e.json.biz_type || n, e.json.ts = (new Date).getTime(), e.json.utm_source = e.json.utm_source || function () {
                        try {
                            var e = f.params.utm_source || window.sessionStorage.getItem("utm_source");
                            return _(e) ? e : void 0
                        } catch (e) {
                            return
                        }
                    }(), e.json._outer_channel = e.json._outer_channel || function () {
                        var e = f.params._outer_channel;
                        return _(e) ? e : void 0
                    }(), e.json.oid = (0, i.default)("oid") ? (0, i.default)("oid") : 0, e.json.f_oid = w("f_oid", !0), e.json.r_oid = w("r_oid", !0), e.json.share_seq = w("share_seq", !0) || 0, e.json.c_id = (0, i.default)("tem-au"), e
                }
            };
        x.init(), t.default = x
    },
    VS35: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
            o = a(n("ruAy")),
            i = a(n("vORH"));

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var s = a(n("GXBh")).default.objectMerge,
            c = new o.default,
            u = function (e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            },
            l = function (e) {
                if (! function (e) {
                    return "[object XMLHttpRequest]" === Object.prototype.toString.call(e)
                }(e)) return e;
                var t = {};
                return s(t, e), t.readyState = e.readyState, t.responseText = e.responseText, t.responseType = e.responseType, t.responseURL = e.responseURL, t.status = e.status, t.statusText = e.statusText, t.timeout = e.timeout, t
            },
            f = function (e, t) {
                var n = void 0,
                    r = {
                        level: "info",
                        tags: "",
                        active: !0
                    };
                "string" == typeof e ? n = e : e instanceof Error ? n = e.message : (n = "天网入参Error：信息只可以传字符串", e = l(e), u(e) && (t = u(t) ? s(t, e) : e)), r.tags = t || "", c.captureMessage(n, r)
            },
            d = function (e, t) {
                var n = void 0,
                    r = {
                        level: "warning",
                        tags: "",
                        active: !0
                    };
                "string" == typeof e ? n = e : e instanceof Error ? n = e.message : (n = "天网入参Error：警告只可以传字符串", e = l(e), u(e) && (t = u(t) ? s(t, e) : e)), r.tags = t || "", c.captureMessage(n, r)
            },
            p = function (e, t) {
                var n = void 0,
                    o = {
                        level: "error",
                        tags: "",
                        active: !0
                    },
                    i = {};
                if ("string" == typeof e) n = e;
                else if (e instanceof Error) {
                    for (var a in e) e.hasOwnProperty(a) && (i[a] = e[a]);
                    n = e
                } else n = "天网入参Error：错误只可以传字符串或者错误对象", e = l(e), u(e) && (t = u(t) ? s(t, e) : e);
                "{}" !== JSON.stringify(i) && (t = u(t) ? r({}, i, t) : i), o.tags = t || "", c.captureException(n, o)
            };
        t.default = function (e) {
            return c.config(e, i.default).install(), window.addEventListener("unhandledrejection", function (e) {
                u(e.reason) ? p("未处理的 unhandlerejection 事件：Promise reject 抛出了普通对象，请在附加信息中查看", e.reason) : p(e.reason)
            }), {
                    info: f,
                    warn: d,
                    error: p
                }
        }
    },
    WRrK: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = window.navigator.userAgent,
            o = /android/gi.test(r),
            i = Math.floor(1e3 * Math.random()) + (new Date).getTime().toString().slice(-6),
            a = function (e) {
                return {
                    send: function () {
                        console.warn(e)
                    }
                }
            };
        t.default = function () {
            if (-1 === r.indexOf("Hybrid")) return a("current env is not support hybrid");
            var e = o ? window.WebViewJavascriptBridge : {};
            if (!e) return a("current env is not support hybrid");
            e.callbacks = {}, e.send = function (e, t) {
                e.id = i, this.callbacks[i] = function (e, n) {
                    t({
                        error: e,
                        result: n
                    })
                }, i = Math.floor(1e3 * Math.random()) + (new Date).getTime().toString().slice(-6), this.sendMessage(o ? JSON.stringify(e) : e)
            };
            var t = function (t, n, r) {
                var o = e.callbacks[t];
                "function" == typeof o && (o(n, r), r && r.resuable || delete e.callbacks[t])
            };
            return o ? e.actionDidFinish = t : (window.WebViewJavascriptBridge_actionDidFinish = t, e.sendMessage = function (t) {
                var n = window.WebViewJavascriptBridge;
                !n && window.webkit && window.webkit.messageHandlers && (n = window.webkit.messageHandlers.WebViewJavascriptBridge), n ? n.postMessage(t) : setTimeout(function () {
                    e.sendMessage(t)
                }, 17)
            }), e
        }
    },
    WYAk: function (e, t, n) {
        "use strict";
        var r, o, i, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        ! function (s, c) {
            "object" === a(t) ? e.exports = t = c(n("Ib8C")) : (o = [n("Ib8C")], void 0 === (i = "function" == typeof (r = c) ? r.apply(t, o) : r) || (e.exports = i))
        }(0, function (e) {
            ! function () {
                var t = e,
                    n = t.lib.Base,
                    r = t.enc.Utf8;
                t.algo.HMAC = n.extend({
                    init: function (e, t) {
                        e = this._hasher = new e.init, "string" == typeof t && (t = r.parse(t));
                        var n = e.blockSize,
                            o = 4 * n;
                        t.sigBytes > o && (t = e.finalize(t)), t.clamp();
                        for (var i = this._oKey = t.clone(), a = this._iKey = t.clone(), s = i.words, c = a.words, u = 0; u < n; u++) s[u] ^= 1549556828, c[u] ^= 909522486;
                        i.sigBytes = a.sigBytes = o, this.reset()
                    },
                    reset: function () {
                        var e = this._hasher;
                        e.reset(), e.update(this._iKey)
                    },
                    update: function (e) {
                        return this._hasher.update(e), this
                    },
                    finalize: function (e) {
                        var t = this._hasher,
                            n = t.finalize(e);
                        return t.reset(), t.finalize(this._oKey.clone().concat(n))
                    }
                })
            }()
        })
    },
    WqTA: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = function (e, t, n) {
            var r, o = void 0,
                i = void 0,
                a = void 0;
            return n = n || {}, void 0 !== t ? (null === t && (n.expires = -1), "number" == typeof n.expires && (o = 24 * n.expires * 60 * 60 * 1e3, n.expires = new Date, (i = n.expires).setTime(i.getTime() + o)), t = String(t), document.cookie = function (e, t, n) {
                var r = n.raw ? t : encodeURIComponent(t),
                    o = n.expires ? "; expires=" + n.expires.toUTCString() : "",
                    i = n.path ? "; path=" + n.path : "; path=/",
                    a = n.domain ? "; domain=" + n.domain : "",
                    s = n.secure ? "; secure" : "";
                return [encodeURIComponent(e), "=", r, o, i, a, s]
            }(e, t, n).join("")) : (a = n.raw ? function (e) {
                return e
            } : decodeURIComponent, (r = new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ? a(r[1]) : null)
        }
    },
    X0s7: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n("uyoH"),
            o = a(n("RcnY")),
            i = a(n("QJib"));

        function a(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var s = (0, r.parse)(),
            c = function (e) {
                o.default.sendLog(e)
            },
            u = function () {
                document.addEventListener("click", function (e) {
                    var t = e && e.target && function (e) {
                        for (var t = e; t && t !== document.body;) {
                            var n = t.attributes || "";
                            if (n && n.click && n["data-log"]) return t;
                            t = t.parentNode
                        }
                        return !1
                    }(e.target);
                    if (t) {
                        var n = t.dataset.log,
                            r = t.href,
                            o = {
                                et: "click"
                            };
                        "A" === t.nodeName.toUpperCase() && r && /\w+.(\w+|\w+\/)$/.test(r.split("?")[0]) && (o.entity_type = "link", o.entity_list = r), n && (o = i.default.extend(!0, o, JSON.parse(n))), c(o)
                    }
                })
            };
        (function () {
            ! function () {
                var e = document.getElementsByTagName("body")[0].getAttribute("data-beacon");
                if ("disabled" !== e && "false" !== e) {
                    e = JSON.parse(e);
                    var t = {
                        et: "pageStart",
                        json: {
                            ts: (new Date).getTime()
                        }
                    };
                    if (e && !o.default.isEmpty(e)) {
                        if (e.entity_list_key) {
                            var n = e.entity_list_key;
                            s.params[n] && (e.entity_list = s.params[n]), delete e.entity_list_key
                        }
                        e.extend && e.extend.length && (e.extend.forEach(function (t) {
                            if (t.param && t.key) {
                                var n = s.params[t.param];
                                e.json || (e.json = {}), n && (e.json[t.key] = n)
                            }
                        }), delete e.extend)
                    }
                    e && !o.default.isEmpty(e) && (t = i.default.extend(!0, {}, t, e)), window.addEventListener("load", function () {
                        setTimeout(function () {
                            c(t)
                        })
                    })
                }
            }(), u(),
                function () {
                    var e = (new Date).getTime();
                    window.addEventListener("beforeunload", function (t) {
                        c({
                            et: "pageEnd",
                            json: {
                                tp: (new Date).getTime() - e
                            }
                        })
                    })
                }()
        })(), t.default = {
            setRid: function (e) {
                e && o.default.setRid(e)
            },
            sendLog: c
        }
    },
    b2Qx: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
            o = c(n("dH37")),
            i = n("Apbo"),
            a = c(n("QJib")),
            s = c(n("WqTA"));

        function c(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var u = null,
            l = !1,
            f = (new Date).getTime() + function e(t, n) {
                n = n || "";
                return t ? e(t -= 1, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz".charAt(Math.floor(62 * Math.random())) + n) : n
            }(10),
            d = !1,
            p = 0,
            h = {
                info: null,
                getInfo: function (e) {
                    var t = this;
                    t.info ? e && e(t.info) : (0, i.isHybridExist)() ? (0, o.default)("clientInfo").clientInfo(function (n, r) {
                        t.info = n ? {} : t.parseInfo(r), e && e(t.info)
                    }) : (t.info = {}, e && e(t.info))
                },
                parseInfo: function (e) {
                    var t = e && e.network;
                    if (t) switch (t) {
                        case "GPRS":
                        case "2.75G EDGE":
                            e.network = "2G";
                            break;
                        case "3.5G HSDPA":
                        case "3.5G HSUPA":
                            e.network = "3G"
                    }
                    return e
                }
            },
            m = function (e, t, n) {
                e && (t[n] = e)
            },
            y = function (e, t) {
                var n = e - t;
                return isNaN(n) ? -1 : n > 6e4 ? -22 : n < 0 ? -21 : n % 1 != 0 ? n.toFixed(3) : n
            },
            g = function (e) {
                var t = e,
                    n = t.name,
                    r = t.redirectStart || t.startTime,
                    o = t.redirectEnd || t.startTime,
                    i = t.responseStart || t.fetchStart,
                    a = t.secureConnectionStart || t.connectStart,
                    s = t.domainLookupStart || t.fetchStart;
                try {
                    var c = {};
                    if (c.rduration = t.duration % 1 != 0 ? t.duration.toFixed(3) : t.duration, m(y(t.startTime, 0), c, "rstime"), m(y(o, r), c, "rredir"), m(y(t.fetchStart, o), c, "rredircache"), m(y(s, t.fetchStart), c, "rcache"), m(y(t.domainLookupEnd, t.domainLookupStart), c, "rdns"), m(y(t.connectStart, t.domainLookupEnd), c, "rdnstcp"), m(y(a, t.connectStart), c, "rtcp"), m(y(t.connectEnd, a), c, "rssl"), m(y(t.requestStart, t.connectEnd), c, "rtcpreq"), m(y(t.responseStart, t.requestStart), c, "rreq"), m(y(t.responseEnd, i), c, "rres"), "xhr" === t.type) {
                        if (c.rduration < 6e3) {
                            var u = n.split("?");
                            if (u && u.length > 1)
                                for (var l = u[1].split("&"), f = l.length, d = 0; d < f; d++) {
                                    var p = l[d];
                                    if (p.indexOf("method") > -1) {
                                        n = u[0] + "?" + p;
                                        break
                                    }
                                }
                        }
                    } else if (c.rduration < 1e4) {
                        n = n.split("?")[0]
                    }
                    c.rname = n, c.rtype = t.type;
                    var h = function (e) {
                        return isNaN(e) ? -1 : e < 0 ? -21 : e
                    }(t.transferSize);
                    return h && (c.rtransize = h), c
                } catch (e) {
                    return console.warn("msg:" + e.msg), console.warn("stack:" + e.stack), {}
                }
            },
            v = [],
            b = [],
            _ = function (e) {
                try {
                    if (window.performance && window.performance.getEntries && (v = window.performance.getEntries(), e ? b.push(e) : v.forEach(function (e, t) {
                        b.forEach(function (n) {
                            n.name === e.name.replace(/http(s)?:/, "") && delete v[t]
                        })
                    })), !v && !e) return [];
                    var t = [];
                    return e && v.reverse(), v.forEach(function (n) {
                        var r = n.name && n.name.match(/([/][^?#;]*)?(?:[?]([^?#]*))?(#[^#]*)?$/),
                            o = r[1],
                            i = r[0];
                        if ("navigation" !== n.entryType && "//c.beibei.com/p1_p.gif" !== o && "//c.beibei.com/p1.gif" !== o)
                            if (e) {
                                if (e.name === i) {
                                    if (e.name.match(/^\/\/sapi.beibei.com/)) return;
                                    return n.type = "xhr", void t.push(a.default.extend({}, e, g(n)))
                                }
                            } else {
                                if (/\.js$/.test(o)) n.type = "script";
                                else if (/\.css$/.test(o)) n.type = "stylesheet";
                                else if (/\.(eot|woff|ttf|svg)$/.test(o)) n.type = "font";
                                else {
                                    if (/\.(bmp|gif|jpg|png|jpeg|webp)(!share)*?$/.test(o)) return void (n.type = "image");
                                    if (/\.(mp3|wma|wav|ape|flac|ogg|aac)$/.test(o)) n.type = "media";
                                    else if (/\.(mp4|avi|rmvb|mkv)$/.test(o)) n.type = "media";
                                    else {
                                        if ("iframe" !== n.initiatorType) return void (n.type = "others");
                                        n.type = "iframe"
                                    }
                                }
                                t.push(g(n))
                            }
                    }), t
                } catch (e) {
                    return console.warn("msg:" + e.msg), console.warn("stack:" + e.stack), []
                }
            },
            w = function (e, t, n) {
                if (e && n) {
                    n._log_type = e, n._unid = f, n.uapp = t;
                    var o = new Image,
                        i = "img" + (16777216 * Math.random() | 0);
                    window[i] = o;
                    var a = function () {
                        window[i] = null
                    };
                    o.onload = a, o.onerror = a, (0, s.default)("st_au") || (0, s.default)("tem-au") || (0, s.default)("tem-au", "ul" + (String(+new Date).slice(-6) + Math.floor(1e8 * Math.random())), {
                        expires: 365
                    }), o.src = "//c.beibei.com/p1_p.gif?" + function (e) {
                        var t = [];
                        for (var n in e)
                            if (Object.prototype.hasOwnProperty.call(e, n)) {
                                var o = e[n];
                                "object" === (void 0 === o ? "undefined" : r(o)) && (o = JSON.stringify(o)), t.push(n + "=" + encodeURIComponent(o))
                            }
                        return t.join("&")
                    }({
                        xid: (0, s.default)("st_au") || (0, s.default)("tem-au"),
                        et: "log",
                        entity_type: "performance3",
                        json: n
                    })
                }
            },
            S = function (e) {
                if (window.performance && performance.now && !d) {
                    d = !0;
                    var t = window.firstScreenTime || y(parseInt(performance.now()), p);
                    l ? w("system", e, {
                        first_screen: t
                    }) : window.addEventListener("load", function () {
                        setTimeout(function () {
                            w("system", e, {
                                first_screen: t
                            })
                        })
                    })
                }
            };
        window.PERF_AUTO_FIRST_SCREEN && S(window.PERF_ID || 0), t.default = function (e) {
            if (e || (e = 0), !window.performance) return {
                custom: function () {
                    return !1
                },
                firstScreen: function () {
                    return !1
                }
            };
            return window.addEventListener("load", function () {
                l = !0, setTimeout(function () {
                    var t = function () {
                        if (!performance.timing) return null;
                        var e = performance.timing,
                            t = e.responseEnd > e.domLoading ? e.domLoading : e.responseEnd,
                            n = {};
                        return m(y(e.domainLookupStart, e.navigationStart), n, "gap_ns_dns"), m(y(e.domainLookupEnd, e.domainLookupStart), n, "dns"), m(y(e.connectStart, e.domainLookupEnd), n, "gap_dns_tcp"), m(y(e.connectEnd, e.connectStart), n, "tcp"), m(y(e.requestStart, e.connectEnd), n, "gap_tcp_req"), m(y(e.responseStart, e.requestStart), n, "req"), m(y(t, e.responseStart), n, "res"), m(y(e.domLoading, t), n, "gap_res_p"), m(y(e.domInteractive, e.domLoading), n, "p1"), m(y(e.domContentLoadedEventStart, e.domInteractive), n, "p2"), m(y(e.domContentLoadedEventEnd, e.domContentLoadedEventStart), n, "p3"), m(y(e.domComplete, e.domContentLoadedEventEnd), n, "p4"), m(y(e.loadEventStart, e.domComplete), n, "gap_p_load"), m(y(e.loadEventEnd, e.loadEventStart), n, "load"), n
                    }(),
                        n = function (e) {
                            if (!e) return 1 / 0;
                            var t = ["gap_ns_dns", "dns", "gap_dns_tcp", "tcp", "gap_tcp_req", "req", "res", "gap_res_p", "p1", "p2", "p3", "p4", "gap_p_load", "load"],
                                n = 0;
                            for (var r in t) {
                                var o = e[t[r]];
                                void 0 !== o && (n += o)
                            }
                            return n
                        }(t);
                    n < 6e4 && (t.ws = function (e) {
                        if (window.performance && window.performance.getEntriesByType) {
                            e || (e = 0);
                            var t = window.performance.getEntriesByType("paint");
                            if (t && t.length)
                                for (var n = 0, r = t.length; n < r; n++) {
                                    var o = t[n];
                                    if (o && "first-paint" === o.name) return +(o.startTime + o.duration).toFixed(e)
                                }
                        }
                    }() || -1, function (e, t) {
                        if (u) e && e(u);
                        else {
                            var n = (0, i.getOSVersion)(),
                                r = (0, i.getOSName)(),
                                o = (0, i.getAppVersion)(),
                                a = (0, i.getAppName)(),
                                s = (0, i.getBrowserVersion)(),
                                c = (0, i.getBrowserName)();
                            h.getInfo(function (i) {
                                u = {
                                    url: t ? "https://m.beidian.com/login/fast_login.html" : "https://m.beidian.com/login/fast_login.html".split("?")[0],
                                    os_ver: i.os || "0.0.0" !== n && n || -1,
                                    app_ver: "0.0.0" !== o && o || -1,
                                    browser_ver: "0.0.0" !== s && s || -1,
                                    net: i.network || -1,
                                    carrier: i.carrier || -1,
                                    model: i.model || -1,
                                    os: i.platform || "unknown" !== r && r || -1,
                                    app: "unknown" !== a && a || -1,
                                    browser: "unknown" !== c && c || -1
                                }, e && e(u)
                            })
                        }
                    }(function (n) {
                        t = a.default.extend({}, t, n), w("default", e, t)
                    }, n > 2e4))
                }), setTimeout(function () {
                    for (var t = _(), n = t.length, r = []; n > 0;) n > 10 ? (r = t.splice(0, 10), n = t.length) : (r = t, n = 0), w("default/resource", e, {
                        resourceData: r
                    })
                }, 500)
            }), window.addEventListener("ajaxComplete", function (t) {
                var n = t._args[0],
                    r = t._args[1],
                    o = r.dataType && r.dataType.toLocaleLowerCase(),
                    i = r.type && r.type.toLocaleLowerCase(),
                    a = {
                        name: r.url && r.url.replace(/http(s)?:/, ""),
                        dataType: o || -1,
                        method: i || -1,
                        status: n.status || -1
                    };
                "jsonp" === o && (a.name = a.name.replace(/callback=\?/, "callback=" + r.jsonpCallback));
                var s = _(a);
                s && s.length > 0 && w("default/resource", e, {
                    resourceData: s
                })
            }), {
                    custom: function (t) {
                        t && "object" === (void 0 === t ? "undefined" : r(t)) && w("custom", e, t)
                    },
                    firstScreen: function () {
                        S(e)
                    },
                    reset: function () {
                        window.performance && performance.now && (p = parseInt(performance.now()), d = !1)
                    }
                }
        }
    },
    cv67: function (e, t, n) {
        "use strict";
        var r, o, i, a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        ! function (s, c) {
            "object" === a(t) ? e.exports = t = c(n("Ib8C")) : (o = [n("Ib8C")], void 0 === (i = "function" == typeof (r = c) ? r.apply(t, o) : r) || (e.exports = i))
        }(0, function (e) {
            return function (t) {
                var n = e,
                    r = n.lib,
                    o = r.WordArray,
                    i = r.Hasher,
                    a = n.algo,
                    s = [];
                ! function () {
                    for (var e = 0; e < 64; e++) s[e] = 4294967296 * t.abs(t.sin(e + 1)) | 0
                }();
                var c = a.MD5 = i.extend({
                    _doReset: function () {
                        this._hash = new o.init([1732584193, 4023233417, 2562383102, 271733878])
                    },
                    _doProcessBlock: function (e, t) {
                        for (var n = 0; n < 16; n++) {
                            var r = t + n,
                                o = e[r];
                            e[r] = 16711935 & (o << 8 | o >>> 24) | 4278255360 & (o << 24 | o >>> 8)
                        }
                        var i = this._hash.words,
                            a = e[t + 0],
                            c = e[t + 1],
                            p = e[t + 2],
                            h = e[t + 3],
                            m = e[t + 4],
                            y = e[t + 5],
                            g = e[t + 6],
                            v = e[t + 7],
                            b = e[t + 8],
                            _ = e[t + 9],
                            w = e[t + 10],
                            S = e[t + 11],
                            k = e[t + 12],
                            x = e[t + 13],
                            j = e[t + 14],
                            O = e[t + 15],
                            E = i[0],
                            C = i[1],
                            T = i[2],
                            M = i[3];
                        C = d(C = d(C = d(C = d(C = f(C = f(C = f(C = f(C = l(C = l(C = l(C = l(C = u(C = u(C = u(C = u(C, T = u(T, M = u(M, E = u(E, C, T, M, a, 7, s[0]), C, T, c, 12, s[1]), E, C, p, 17, s[2]), M, E, h, 22, s[3]), T = u(T, M = u(M, E = u(E, C, T, M, m, 7, s[4]), C, T, y, 12, s[5]), E, C, g, 17, s[6]), M, E, v, 22, s[7]), T = u(T, M = u(M, E = u(E, C, T, M, b, 7, s[8]), C, T, _, 12, s[9]), E, C, w, 17, s[10]), M, E, S, 22, s[11]), T = u(T, M = u(M, E = u(E, C, T, M, k, 7, s[12]), C, T, x, 12, s[13]), E, C, j, 17, s[14]), M, E, O, 22, s[15]), T = l(T, M = l(M, E = l(E, C, T, M, c, 5, s[16]), C, T, g, 9, s[17]), E, C, S, 14, s[18]), M, E, a, 20, s[19]), T = l(T, M = l(M, E = l(E, C, T, M, y, 5, s[20]), C, T, w, 9, s[21]), E, C, O, 14, s[22]), M, E, m, 20, s[23]), T = l(T, M = l(M, E = l(E, C, T, M, _, 5, s[24]), C, T, j, 9, s[25]), E, C, h, 14, s[26]), M, E, b, 20, s[27]), T = l(T, M = l(M, E = l(E, C, T, M, x, 5, s[28]), C, T, p, 9, s[29]), E, C, v, 14, s[30]), M, E, k, 20, s[31]), T = f(T, M = f(M, E = f(E, C, T, M, y, 4, s[32]), C, T, b, 11, s[33]), E, C, S, 16, s[34]), M, E, j, 23, s[35]), T = f(T, M = f(M, E = f(E, C, T, M, c, 4, s[36]), C, T, m, 11, s[37]), E, C, v, 16, s[38]), M, E, w, 23, s[39]), T = f(T, M = f(M, E = f(E, C, T, M, x, 4, s[40]), C, T, a, 11, s[41]), E, C, h, 16, s[42]), M, E, g, 23, s[43]), T = f(T, M = f(M, E = f(E, C, T, M, _, 4, s[44]), C, T, k, 11, s[45]), E, C, O, 16, s[46]), M, E, p, 23, s[47]), T = d(T, M = d(M, E = d(E, C, T, M, a, 6, s[48]), C, T, v, 10, s[49]), E, C, j, 15, s[50]), M, E, y, 21, s[51]), T = d(T, M = d(M, E = d(E, C, T, M, k, 6, s[52]), C, T, h, 10, s[53]), E, C, w, 15, s[54]), M, E, c, 21, s[55]), T = d(T, M = d(M, E = d(E, C, T, M, b, 6, s[56]), C, T, O, 10, s[57]), E, C, g, 15, s[58]), M, E, x, 21, s[59]), T = d(T, M = d(M, E = d(E, C, T, M, m, 6, s[60]), C, T, S, 10, s[61]), E, C, p, 15, s[62]), M, E, _, 21, s[63]), i[0] = i[0] + E | 0, i[1] = i[1] + C | 0, i[2] = i[2] + T | 0, i[3] = i[3] + M | 0
                    },
                    _doFinalize: function () {
                        var e = this._data,
                            n = e.words,
                            r = 8 * this._nDataBytes,
                            o = 8 * e.sigBytes;
                        n[o >>> 5] |= 128 << 24 - o % 32;
                        var i = t.floor(r / 4294967296),
                            a = r;
                        n[15 + (o + 64 >>> 9 << 4)] = 16711935 & (i << 8 | i >>> 24) | 4278255360 & (i << 24 | i >>> 8), n[14 + (o + 64 >>> 9 << 4)] = 16711935 & (a << 8 | a >>> 24) | 4278255360 & (a << 24 | a >>> 8), e.sigBytes = 4 * (n.length + 1), this._process();
                        for (var s = this._hash, c = s.words, u = 0; u < 4; u++) {
                            var l = c[u];
                            c[u] = 16711935 & (l << 8 | l >>> 24) | 4278255360 & (l << 24 | l >>> 8)
                        }
                        return s
                    },
                    clone: function () {
                        var e = i.clone.call(this);
                        return e._hash = this._hash.clone(), e
                    }
                });

                function u(e, t, n, r, o, i, a) {
                    var s = e + (t & n | ~t & r) + o + a;
                    return (s << i | s >>> 32 - i) + t
                }

                function l(e, t, n, r, o, i, a) {
                    var s = e + (t & r | n & ~r) + o + a;
                    return (s << i | s >>> 32 - i) + t
                }

                function f(e, t, n, r, o, i, a) {
                    var s = e + (t ^ n ^ r) + o + a;
                    return (s << i | s >>> 32 - i) + t
                }

                function d(e, t, n, r, o, i, a) {
                    var s = e + (n ^ (t | ~r)) + o + a;
                    return (s << i | s >>> 32 - i) + t
                }
                n.MD5 = i._createHelper(c), n.HmacMD5 = i._createHmacHelper(c)
            }(Math), e.MD5
        })
    },
    dH37: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function (e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n("dLVw"));
        var o = function e(t) {
            return e.instance ? e.instance.handleApiList(t) : this instanceof e ? (e.instance = this, this.hasPreConfigApis = [], this.hybridMethods = r.default, this.handleApiList(t), !1) : new e(t)
        };
        o.__version__ = "0.1.1", o.prototype.handleApiList = function (e) {
            var t = [];
            Array.isArray(e) ? t = e : "string" == typeof e ? t = [e] : "[Object object]" === Object.prototype.toString.call(e) && (t = Object.keys(e));
            for (var n = 0; n < t.length; n += 1) this.config(t[n]);
            return this
        }, o.prototype.config = function (e) {
            return -1 === this.hasPreConfigApis.indexOf(e) && (o.prototype[e] = function () {
                for (var t = arguments.length, n = Array(t), o = 0; o < t; o++) n[o] = arguments[o];
                return "function" == typeof r.default[e] ? r.default[e].apply(r.default, n) : r.default.config({
                    jsApiList: function (e, t, n) {
                        return t in e ? Object.defineProperty(e, t, {
                            value: n,
                            enumerable: !0,
                            configurable: !0,
                            writable: !0
                        }) : e[t] = n, e
                    }({}, e, "optional")
                }, function (t, o) {
                    !t && o.length > 0 ? r.default[e].apply(r.default, n) : console.error("can not find method " + e + ",you can check hybird-api list")
                }), this
            }), this
        }, o.instance = null, o.getInstance = function () {
            return o.instance ? o.instance : new o
        }, t.default = o
    },
    dLVw: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = function (e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n("WRrK"));
        var o = null,
            i = function (e) {
                return function () {
                    for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                    var i = n.shift(),
                        a = n.shift();
                    return i ? "function" == typeof i && (a = i, i = {}) : i = {}, "function" != typeof a && (a = function () { }), o.send({
                        data: i,
                        target: e
                    }, function (e) {
                        e.error ? a(e.error) : a(null, e.result)
                    }), this
                }
            },
            a = window.bbhybrid ? window.bbhybrid : {
                bridge: o = (0, r.default)(),
                config: function (e, t) {
                    var n = this;
                    o.send({
                        data: e,
                        target: "config"
                    }, function (e) {
                        if (e.error) t(e.error);
                        else if (e.result) {
                            for (var r = e.result, o = 0; o < r.length; o += 1) {
                                var a = r[o];
                                "function" != typeof n[a] && (n[a] = i(a))
                            }
                            t(null, e.result)
                        }
                    })
                }
            };
        t.default = a
    },
    eOTH: function (e, t, n) {
        "use strict";

        function r(e, t) {
            for (var n = 0; n < e.length; ++n)
                if (e[n] === t) return n;
            return -1
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = function (e, t, n, o) {
            return JSON.stringify(e, function (e, t) {
                var n = [],
                    o = [];
                return null == t && (t = function (e, t) {
                    return n[0] === t ? "[Circular ~]" : "[Circular ~." + o.slice(0, r(n, t)).join(".") + "]"
                }),
                    function (i, a) {
                        if (n.length > 0) {
                            var s = r(n, this);
                            ~s ? n.splice(s + 1) : n.push(this), ~s ? o.splice(s, 1 / 0, i) : o.push(i), ~r(n, a) && (a = t.call(this, i, a))
                        } else n.push(a);
                        return null == e ? a instanceof Error ? function (e) {
                            var t = {
                                stack: e.stack,
                                message: e.message,
                                name: e.name
                            };
                            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                            return t
                        }(a) : a : e.call(this, i, a)
                    }
            }(t, o), n)
        }
    },
    lCH3: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.suitOpenSource = t.jumpToApp = void 0;
        var r = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
            o = n("uyoH"),
            i = n("Apbo"),
            a = n("zgpE"),
            s = u(n("t1De")),
            c = u(n("LE4b"));

        function u(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var l = (0, o.parse)().params.open_source;
        l && s.default.set("openSource", l);
        var f = function () {
            return l || ((0, i.isWeixin)() ? "wechat" : "web")
        },
            d = function (e, t, n) {
                var r = "" + "m.beidian.com" + "/login/fast_login.html",
                    o = t.indexOf("?") > -1;
                return t.match(/\?|&/) && (t = encodeURIComponent(t)), t = o ? t + "%26open_source=" + n + "%26open_url=" + r + "%26utm_source=" + a.utmSource.get() : t + "%3fopen_source=" + n + "%26open_url=" + r + "%26utm_source=" + a.utmSource.get(), "//a.app.qq.com/o/simple.jsp?pkgname=com.husor.beidian&ckey=" + e + "&" + ((0, i.isIOS)() ? "ios_schema" : "android_schema") + "=" + t
            };
        t.jumpToApp = function () {
            debugger;
        },
            t.suitOpenSource = f
    },
    pb19: function (e, t, n) {
        "use strict";
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
            o = Object.prototype.toString;
        e.exports = function (e) {
            switch (o.call(e)) {
                case "[object Function]":
                    return "function";
                case "[object Date]":
                    return "date";
                case "[object RegExp]":
                    return "regexp";
                case "[object Arguments]":
                    return "arguments";
                case "[object Array]":
                    return "array";
                case "[object String]":
                    return "string"
            }
            if ("object" == (void 0 === e ? "undefined" : r(e)) && e && "number" == typeof e.length) try {
                if ("function" == typeof e.callee) return "arguments"
            } catch (e) {
                if (e instanceof TypeError) return "arguments"
            }
            return null === e ? "null" : void 0 === e ? "undefined" : e && 1 === e.nodeType ? "element" : e === Object(e) ? "object" : void 0 === e ? "undefined" : r(e)
        }
    },
    ruAy: function (e, t, n) {
        "use strict";
        (function (e) {
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
                o = function () {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }
                    return function (t, n, r) {
                        return n && e(t.prototype, n), r && e(t, r), t
                    }
                }(),
                i = n("Apbo"),
                a = d(n("WqTA")),
                s = d(n("dH37")),
                c = d(n("0Zmq")),
                u = d(n("eOTH")),
                l = d(n("GXBh")),
                f = d(n("tCAb"));

            function d(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            var p = l.default.isError,
                h = l.default.isErrorEvent,
                m = l.default.isUndefined,
                y = l.default.isFunction,
                g = l.default.isString,
                v = l.default.each,
                b = l.default.objectMerge,
                _ = l.default.hasKey,
                w = l.default.joinRegExp,
                S = l.default.htmlTreeAsString,
                k = l.default.parseUrl,
                x = l.default.fill,
                j = l.default.supportsFetch,
                O = f.default.wrapMethod,
                E = function () {
                    return +new Date
                },
                C = function () {
                    var e = (0, i.getAppName)(),
                        t = (0, i.getBrowserName)();
                    return e && "unknown" !== e ? e : t
                },
                T = function () {
                    var e = (0, i.getAppVersion)(),
                        t = (0, i.getBrowserVersion)();
                    return e && "0.0.0" !== e ? e : t
                },
                M = {};
            "undefined" != typeof window ? M = window : void 0 !== e ? M = e : "undefined" != typeof self && (M = self);
            var A = M.document,
                P = M.navigator,
                B = {},
                I = "";
            (0, i.isHybridExist)() && ((0, s.default)("clientInfo").clientInfo(function (e, t) {
                B = t
            }), (0, i.isBeidian)() && (0, s.default)("getUserInfo").getUserInfo(function (e, t) {
                e || (I = t.uid)
            }));
            var H = function () {
                function e() {
                    for (var t in function (e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._hasJSON = !("object" !== ("undefined" == typeof JSON ? "undefined" : r(JSON)) || !JSON.stringify), this._hasDocument = !m(A), this._hasNavigator = !m(P), this._lastData = null, this._globalServer = null, this._globalKey = null, this._globalOptions = {
                        from: "html5",
                        ignoreErrors: [],
                        autoBreadcrumbs: !0,
                        maxBreadcrumbs: 10,
                        instrument: !0,
                        sampleRate: 1
                    }, this._fetchDefaults = {
                        method: "POST",
                        keepalive: !0,
                        referrerPolicy: "origin"
                    }, this._ignoreOnError = 0, this._isSkynetInstalled = !1, this._originalConsole = M.console || {}, this._originalConsoleMethods = {}, this._startTime = E(), this._wrappedBuiltIns = [], this._breadcrumbs = [], this._lastCapturedEvent = null, this._location = M.location, this._lastHref = this._location && this._location.href, this._tag = {
                        from: "html5",
                        env: "production",
                        SDKversion: "1.0.7",
                        project: 0,
                        carrier: "null",
                        url: "",
                        referer: "",
                        ua: "",
                        breadcrumbs: []
                    }, this._baseData = {
                        CommonPackage: {
                            userid: I || (0, a.default)("_logged_") || (0, a.default)("st_au") || (0, a.default)("tem-au") || "null",
                            ts: E() / 1e3,
                            cpu: "null",
                            brand: "null",
                            channel: "null",
                            patches: "null",
                            device_udid: B.udid || "null",
                            device_id: B.udid || "null",
                            resolution: M.screen.width + "*" + M.screen.height,
                            version: T() || "null",
                            os: "null",
                            build: "null",
                            access: "null",
                            appnm: C() || "null",
                            carrier: "null",
                            os_version: "null",
                            sprint_version: "null",
                            device_model: "null",
                            sprint_version_code: "null",
                            idfa: "null"
                        },
                        EventPackage: [{
                            kv: {
                                session_id: "null",
                                module: "",
                                timestamp: E(),
                                tag: "",
                                content: "",
                                level: "error"
                            },
                            ts: E(),
                            seq: 989,
                            eventType: "log"
                        }]
                    }, this._originalConsole) this._originalConsoleMethods[t] = this._originalConsole[t]
                }
                return o(e, [{
                    key: "config",
                    value: function (e, t) {
                        if (this._globalServer) return this;
                        if (!e) return this;
                        var n = this._globalOptions;
                        t && v(t, function (e, t) {
                            n[e] = t
                        }), this.setProjectId(e), n.ignoreErrors.push(/^Script error\.?$/), n.ignoreErrors.push(/^Javascript error: Script error\.? on line 0$/), n.ignoreErrors = w(n.ignoreErrors), n.maxBreadcrumbs = Math.max(0, Math.min(n.maxBreadcrumbs || 100, 100));
                        var r = {
                            xhr: !0,
                            console: !0,
                            dom: !0,
                            location: !0,
                            skynet: !1
                        },
                            o = n.autoBreadcrumbs;
                        "[object Object]" === {}.toString.call(o) ? o = b(r, o) : !1 !== o && (o = r), n.autoBreadcrumbs = o;
                        var i = {
                            tryCatch: !0
                        },
                            a = n.instrument;
                        return "[object Object]" === {}.toString.call(a) ? a = b(i, a) : !1 !== a && (a = i), n.instrument = a, this
                    }
                }, {
                    key: "install",
                    value: function () {
                        return this.isSetup() && !this._isSkynetInstalled && (this._patchFunctionToString(), this._globalOptions.instrument && this._globalOptions.instrument.tryCatch && this._instrumentTryCatch(), this._globalOptions.autoBreadcrumbs && this._instrumentBreadcrumbs(), this._isSkynetInstalled = !0), this
                    }
                }, {
                    key: "setProjectId",
                    value: function (e) {
                        this._tag.project = e, this._globalKey = "n.beibei.com/n4.gif", this._globalServer = "//n.beibei.com/n4.gif"
                    }
                }, {
                    key: "wrap",
                    value: function (e, t, n) {
                        var r = this;
                        if (m(t) && !y(e)) return e;
                        if (y(e) && (t = e, e = void 0), !y(t)) return t;
                        try {
                            if (t.__skynet__) return t;
                            if (t.__skynet_wrapper__) return t.__skynet_wrapper__
                        } catch (e) {
                            return t
                        }

                        function o() {
                            for (var o = [], i = arguments.length, a = Array(i), s = 0; s < i; s++) a[s] = arguments[s];
                            var c = a.length,
                                u = !e || e && !1 !== e.deep;
                            for (n && y(n) && n.apply(this, a); c--;) o[c] = u ? r.wrap(e, a[c]) : a[c];
                            try {
                                return t.apply(this, o)
                            } catch (t) {
                                throw r._ignoreNextOnError(), r.captureException(t, e), t
                            }
                        }
                        for (var i in t) _(t, i) && (o[i] = t[i]);
                        return o.prototype = t.prototype, t.__skynet_wrapper__ = o, o.__skynet__ = !0, o.__orig__ = t, o
                    }
                }, {
                    key: "captureException",
                    value: function (e, t) {
                        t = b({}, t || {});
                        var n = !p(e),
                            r = !h(e),
                            o = h(e) && !e.error;
                        if (n && r || o) return this.captureMessage(e, b(t, {
                            stacktrace: !0
                        }));
                        h(e) && (e = e.error);
                        var i = c.default.computeStackTrace(e);
                        return t.tags && (i.data = t.tags), this._baseData.EventPackage[0].kv.content = (0, u.default)(i), this._baseData.EventPackage[0].kv.level = "error", this._handleStackInfo(e), this
                    }
                }, {
                    key: "captureMessage",
                    value: function (e, t) {
                        if (this._globalOptions.ignoreErrors.test && this._globalOptions.ignoreErrors.test(e)) return null;
                        var n = {
                            message: e
                        };
                        return (t = t || {}).tags && (n.data = t.tags), this._baseData.EventPackage[0].kv.content = (0, u.default)(n), this._baseData.EventPackage[0].kv.level = t.level || "error", t.active && (this._tag.active = !0), this._send(), this
                    }
                }, {
                    key: "captureBreadcrumb",
                    value: function (e) {
                        var t = b({
                            timestamp: E() / 1e3
                        }, e);
                        return this._breadcrumbs.push(t), this._breadcrumbs.length > this._globalOptions.maxBreadcrumbs && this._breadcrumbs.shift(), this
                    }
                }, {
                    key: "isSetup",
                    value: function () {
                        return !!this._hasJSON && (!!this._globalServer || (this.skynetNotConfiguredError || (this.skynetNotConfiguredError = !0), !1))
                    }
                }, {
                    key: "_ignoreNextOnError",
                    value: function () {
                        var e = this;
                        this._ignoreOnError += 1, setTimeout(function () {
                            e._ignoreOnError -= 1
                        })
                    }
                }, {
                    key: "_breadcrumbEventHandler",
                    value: function (e) {
                        var t = this;
                        return function (n) {
                            if (t._lastCapturedEvent !== n) {
                                t._lastCapturedEvent = n;
                                var r = void 0;
                                try {
                                    r = S(n.target)
                                } catch (e) {
                                    r = "<unknown>"
                                }
                                t.captureBreadcrumb({
                                    category: "ui." + e,
                                    message: r
                                })
                            }
                        }
                    }
                }, {
                    key: "_captureUrlChange",
                    value: function (e, t) {
                        var n = k(this._location.href),
                            r = k(t),
                            o = k(e);
                        this._lastHref = t, n.protocol === r.protocol && n.host === r.host && (t = r.relative), n.protocol === o.protocol && n.host === o.host && (e = o.relative), this.captureBreadcrumb({
                            category: "navigation",
                            data: {
                                to: t,
                                from: e
                            }
                        })
                    }
                }, {
                    key: "_patchFunctionToString",
                    value: function () {
                        var e = this;
                        e._originalFunctionToString = Function.prototype.toString, Function.prototype.toString = function () {
                            for (var t = arguments.length, n = Array(t), r = 0; r < t; r++) n[r] = arguments[r];
                            return "function" == typeof this && this.__skynet__ ? e._originalFunctionToString.apply(this.__orig__, n) : e._originalFunctionToString.apply(this, n)
                        }
                    }
                }, {
                    key: "_instrumentTryCatch",
                    value: function () {
                        var e = this,
                            t = e._wrappedBuiltIns;

                        function n(t) {
                            return function (n, r) {
                                for (var o = new Array(arguments.length), i = 0; i < o.length; ++i) o[i] = arguments[i];
                                var a = o[0];
                                return y(a) && (o[0] = e.wrap(a)), t.apply(this, o)
                            }
                        }
                        var r = this._globalOptions.autoBreadcrumbs;

                        function o(n) {
                            var o = M[n] && M[n].prototype;
                            o && o.hasOwnProperty && o.hasOwnProperty("addEventListener") && (x(o, "addEventListener", function (t) {
                                return function (o, i, a, s) {
                                    try {
                                        i && i.handleEvent && (i.handleEvent = e.wrap(i.handleEvent))
                                    } catch (e) { }
                                    var c = void 0,
                                        u = void 0;
                                    return r && r.dom && ("EventTarget" === n || "Node" === n) && (u = e._breadcrumbEventHandler("click"), c = function (e) {
                                        if (!e) return null;
                                        var t = void 0;
                                        try {
                                            t = e.type
                                        } catch (e) {
                                            return null
                                        }
                                        return "click" === t ? u(e) : null
                                    }), t.call(this, o, e.wrap(i, void 0, c), a, s)
                                }
                            }, t), x(o, "removeEventListener", function (e) {
                                return function (t, n, r, o) {
                                    try {
                                        n = n && (n.__skynet_wrapper__ ? n.__skynet_wrapper__ : n)
                                    } catch (e) { }
                                    return e.call(this, t, n, r, o)
                                }
                            }, t))
                        }
                        x(M, "setTimeout", n, t), x(M, "setInterval", n, t), M.requestAnimationFrame && x(M, "requestAnimationFrame", function (t) {
                            return function (n) {
                                return t(e.wrap(n))
                            }
                        }, t);
                        for (var i = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], a = 0; a < i.length; a++) o(i[a])
                    }
                }, {
                    key: "_instrumentBreadcrumbs",
                    value: function () {
                        var e = this,
                            t = this._globalOptions.autoBreadcrumbs,
                            n = e._wrappedBuiltIns;

                        function r(t, n) {
                            t in n && y(n[t]) && x(n, t, function (t) {
                                return e.wrap(t)
                            })
                        }
                        if (t.xhr && "XMLHttpRequest" in M) {
                            var o = XMLHttpRequest.prototype;
                            x(o, "open", function (t) {
                                return function (n, r) {
                                    return g(r) && -1 === r.indexOf(e._globalKey) && (this.__skynet_xhr = {
                                        method: n,
                                        url: r,
                                        status_code: null
                                    }), t.apply(this, arguments)
                                }
                            }, n), x(o, "send", function (t) {
                                return function () {
                                    var n = this;

                                    function o() {
                                        if (n.__skynet_xhr && 4 === n.readyState) {
                                            try {
                                                n.__skynet_xhr.status_code = n.status
                                            } catch (e) { }
                                            e.captureBreadcrumb({
                                                type: "http",
                                                category: "xhr",
                                                data: n.__skynet_xhr
                                            })
                                        }
                                    }
                                    for (var i = ["onload", "onerror", "onprogress"], a = 0; a < i.length; a++) r(i[a], n);
                                    return "onreadystatechange" in n && y(n.onreadystatechange) ? x(n, "onreadystatechange", function (t) {
                                        return e.wrap(t, void 0, o)
                                    }) : n.onreadystatechange = o, t.apply(this, arguments)
                                }
                            }, n)
                        }
                        t.xhr && j() && x(M, "fetch", function (t) {
                            return function () {
                                for (var n = new Array(arguments.length), r = 0; r < n.length; ++r) n[r] = arguments[r];
                                var o = n[0],
                                    i = "GET",
                                    a = void 0;
                                if ("string" == typeof o ? a = o : "Request" in M && o instanceof M.Request ? (a = o.url, o.method && (i = o.method)) : a = "" + o, -1 !== a.indexOf(e._globalKey)) return t.apply(this, n);
                                n[1] && n[1].method && (i = n[1].method);
                                var s = {
                                    method: i,
                                    url: a,
                                    status_code: null
                                };
                                return t.apply(this, n).then(function (t) {
                                    return s.status_code = t.status, e.captureBreadcrumb({
                                        type: "http",
                                        category: "fetch",
                                        data: s
                                    }), t
                                })
                            }
                        }, n), t.dom && this._hasDocument && A.addEventListener("click", e._breadcrumbEventHandler("click"), !1);
                        var i = M.chrome,
                            a = !(i && i.app && i.app.runtime) && M.history && history.pushState && history.replaceState;
                        if (t.location && a) {
                            var s = M.onpopstate;
                            M.onpopstate = function () {
                                var t = e._location.href;
                                if (e._captureUrlChange(e._lastHref, t), s) {
                                    for (var n = arguments.length, r = Array(n), o = 0; o < n; o++) r[o] = arguments[o];
                                    return s.apply(this, r)
                                }
                                return null
                            };
                            var c = function (t) {
                                return function () {
                                    var n = arguments.length > 2 ? arguments[2] : void 0;
                                    return n && e._captureUrlChange(e._lastHref, "" + n), t.apply(this, arguments)
                                }
                            };
                            x(history, "pushState", c, n), x(history, "replaceState", c, n)
                        }
                        if (t.console && "console" in M && console.log) {
                            var u = function (t, n) {
                                e.captureBreadcrumb({
                                    message: t,
                                    level: n.level,
                                    category: "console"
                                })
                            };
                            v(["info", "warn", "error"], function (e, t) {
                                O(console, t, u)
                            })
                        }
                    }
                }, {
                    key: "_handleOnErrorStackInfo",
                    value: function () {
                        if (!this._ignoreOnError) {
                            for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
                            this._handleStackInfo(t)
                        }
                    }
                }, {
                    key: "_handleStackInfo",
                    value: function (e) {
                        this._processException(e.name, e.message)
                    }
                }, {
                    key: "_normalizeFrame",
                    value: function (e, t) {
                        var n = {
                            filename: e.url,
                            lineno: e.line,
                            colno: e.column,
                            function: e.func || "?"
                        };
                        return e.url || (n.filename = t), n.in_app = !/(Skynet)\./.test(n.function), n
                    }
                }, {
                    key: "_processException",
                    value: function (e, t) {
                        var n = (e ? e + ": " : "") + (t || "");
                        this._globalOptions.ignoreErrors.test && (this._globalOptions.ignoreErrors.test(t) || this._globalOptions.ignoreErrors.test(n)) || this._send()
                    }
                }, {
                    key: "_getHttpData",
                    value: function () {
                        if (!this._hasNavigator && !this._hasDocument) return null;
                        var e = {};
                        return this._hasNavigator && P.userAgent && (e = {
                            ua: navigator.userAgent
                        }), M.location && M.location.href && (e.url = M.location.href), this._hasDocument && A.referrer && (e.referer = A.referrer), e
                    }
                }, {
                    key: "_isRepeatData",
                    value: function (e) {
                        try {
                            delete e.CommonPackage.ts, delete e.EventPackage[0].ts, delete e.EventPackage[0].kv.timestamp
                        } catch (e) {
                            return !1
                        }
                        var t = this._lastData,
                            n = (0, u.default)(e);
                        return n === t || (this._lastData = n, !1)
                    }
                }, {
                    key: "_send",
                    value: function () {
                        var e, t = this._globalOptions;
                        this._tag.carrier = B.carrier;
                        var n = this._getHttpData();
                        n && (this._tag = b(this._tag, n)), this._breadcrumbs && this._breadcrumbs.length > 0 && (this._tag.breadcrumbs = [].slice.call(this._breadcrumbs, 0)), this._baseData.EventPackage[0].kv.tag = (0, u.default)(this._tag), this._baseData.CommonPackage.userid = I || (0, a.default)("_logged_") || (0, a.default)("st_au") || (0, a.default)("tem-au") || "null", this._baseData.CommonPackage.ts = E() / 1e3, this._baseData.CommonPackage.device_udid = B.udid || "null", this._baseData.CommonPackage.device_id = B.udid || "null", this._baseData.CommonPackage.access = B.access || "null", this._baseData.CommonPackage.carrier = B.carrier || "null", this._baseData.CommonPackage.device_model = B.model || "null", e = b({}, this._baseData), "number" == typeof t.sampleRate ? Math.random() < t.sampleRate && this._sendProcessedPayload(e) : this._sendProcessedPayload(e)
                    }
                }, {
                    key: "_sendProcessedPayload",
                    value: function (e) {
                        var t = this._globalOptions;
                        if (this.isSetup() && !this._isRepeatData(e)) {
                            var n = this._globalServer;
                            this._makeRequest({
                                url: n,
                                data: e,
                                options: t
                            })
                        }
                    }
                }, {
                    key: "_makeRequest",
                    value: function (e) {
                        var t = e.url,
                            n = {};
                        if (e.options.fetchParameters && (n = this._evaluateHash(e.options.fetchParameters)), j()) {
                            n.body = (0, u.default)(e.data);
                            var r = b({}, this._fetchDefaults),
                                o = b(r, n);
                            return M.fetch(t, o).then(function (t) {
                                if (t.ok) e.onSuccess && e.onSuccess();
                                else {
                                    var n = new Error("Skynet error code: " + t.status);
                                    n.request = t, e.onError && e.onError(n)
                                }
                            }).catch(function () {
                                e.onError && e.onError(new Error("Skynet error code: network unavailable"))
                            })
                        }
                        var i = M.XMLHttpRequest && new M.XMLHttpRequest;
                        return i && ("withCredentials" in i || "undefined" != typeof XDomainRequest) ? ("withCredentials" in i ? i.onreadystatechange = function () {
                            if (4 !== i.readyState) return null;
                            if (200 === i.status) e.onSuccess && e.onSuccess();
                            else if (e.onError) {
                                var t = new Error("Skynet error code: " + i.status);
                                t.request = i, e.onError(t)
                            }
                            return null
                        } : (i = new XDomainRequest, t = t.replace(/^https?:/, ""), e.onSuccess && (i.onload = e.onSuccess), e.onError && (i.onerror = function () {
                            var t = new Error("Skynet error code: XDomainRequest");
                            t.request = i, e.onError(t)
                        })), i.open("POST", t), i.send((0, u.default)(e.data)), null) : null
                    }
                }, {
                    key: "_evaluateHash",
                    value: function (e) {
                        var t = {};
                        for (var n in e)
                            if (e.hasOwnProperty(n)) {
                                var r = e[n];
                                t[n] = "function" == typeof r ? r() : r
                            }
                        return t
                    }
                }]), e
            }();
            t.default = H
        }).call(this, n("yLpj"))
    },
    t1De: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = {
            init: !1,
            iframe: null,
            cbs: {},
            cid: 0,
            iframeBeforeFuns: [],
            createIframe: function () {
                if (!r.init) {
                    var e = document.createElement("iframe");
                    e.style.cssText = "display: none;", e.setAttribute("src", "https:" + "//m.beidian.com/demo/cross-storage.html"), e.onload = function () {
                        r.iframe = e.contentWindow, r.iframeBeforeFuns.forEach(function (e) {
                            return e()
                        })
                    }, document.body.appendChild(e), r.init = !0, window.addEventListener("message", function (e) {
                        var t = e.data || "{}";
                        if ("string" == typeof t) try {
                            t = JSON.parse(t)
                        } catch (e) {
                            console.error(e, t)
                        }
                        if (void 0 !== t.cid) {
                            var n = r.cbs;
                            n[t.cid] && n[t.cid].resolve(t.data), n[t.cid] = null
                        }
                    })
                }
            },
            messageHandle: function (e) {
                var t = this,
                    n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                return new Promise(function (o, i) {
                    var a = JSON.stringify({
                        cid: r.cid,
                        origin: "https://m.beidian.com",
                        action: e,
                        payload: n
                    });
                    r.iframe.postMessage(a, "https" + "//m.beidian.com/demo/cross-storage.html"), t.cbs[r.cid] = {
                        resolve: o,
                        reject: i
                    }, r.cid += 1
                })
            },
            sendMessage: function (e, t) {
                return new Promise(function (n, o) {
                    r.iframe ? r.messageHandle(e, t).then(n).catch(o) : (r.createIframe(), r.iframeBeforeFuns.push(function () {
                        r.messageHandle(e, t).then(n).catch(o)
                    }))
                })
            },
            get: function (e) {
                return "m.beidian.com" === "m.beidian.com" ? Promise.resolve(sessionStorage && sessionStorage.getItem(e)) : r.sendMessage("get", {
                    key: e
                })
            },
            set: function (e, t) {
                return "m.beidian.com" === "m.beidian.com" ? sessionStorage && sessionStorage.setItem(e, t) : r.sendMessage("set", {
                    key: e,
                    value: t
                })
            },
            clear: function (e) {
                return "m.beidian.com" === "m.beidian.com" ? sessionStorage.removeItem(e) : r.sendMessage("clear", {
                    key: e
                })
            }
        };
        t.default = r
    },
    tCAb: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.wrapMethod = void 0;
        var r = function (e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }(n("GXBh"));
        var o = t.wrapMethod = function (e, t, n) {
            var o = e[t],
                i = e;
            if (t in e) {
                var a = "warn" === t ? "warning" : t;
                e[t] = function () {
                    for (var e = arguments.length, s = Array(e), c = 0; c < e; c++) s[c] = arguments[c];
                    var u = r.default.safeJoin(s, " "),
                        l = {
                            level: a,
                            logger: "console",
                            extra: {
                                arguments: s
                            }
                        };
                    "assert" === t ? !1 === s[0] && (u = "Assertion failed:  " + (r.default.safeJoin(s.slice(1), " ") || "console.assert"), l.extra.arguments = s.slice(1), n && n(u, l)) : n && n(u, l), o && Function.prototype.apply.call(o, i, s)
                }
            }
        };
        t.default = {
            wrapMethod: o
        }
    },
    uDZM: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r, o, i = n("pb19"),
            a = +new Date,
            s = window.document,
            c = /^(?:text|application)\/javascript/i,
            u = /^(?:text|application)\/xml/i,
            l = "application/json",
            f = "text/html",
            d = /^\s*$/,
            p = s.createElement("a");

        function h(e, t, n, r) {
            return !!e.global
        }
        p.href = "https://m.beidian.com/login/fast_login.html";
        var m = function e(t) {
            var n, i, a = x({}, t || {});
            for (r in e.settings) void 0 === a[r] && (a[r] = e.settings[r]);
            y(a), a.crossDomain || ((i = s.createElement("a")).href = a.url, i.href = i.href, a.crossDomain = p.protocol + "//" + p.host != i.protocol + "//" + i.host), a.url || (a.url = "https://m.beidian.com/login/fast_login.html".toString()), (n = a.url.indexOf("#")) > -1 && (a.url = a.url.slice(0, n)), S(a);
            var m = a.dataType,
                b = /=\?/.test(a.url);
            if (b && (m = "jsonp"), !1 !== a.cache && (t && !0 === t.cache || "script" != m && "jsonp" != m) || (a.url = w(a.url, "_=" + Date.now())), "jsonp" == m) return b || (a.url = w(a.url, a.jsonp ? a.jsonp + "=?" : !1 === a.jsonp ? "" : "callback=?")), e.JSONP(a);
            var k, j = a.accepts[m],
                O = {},
                E = /^([\w-]+:)\/\//.test(a.url) ? RegExp.$1 : "https:",
                C = e.settings.xhr();
            if (a.crossDomain || (O["X-Requested-With"] = "XMLHttpRequest"), j && (O.Accept = j, j.indexOf(",") > -1 && (j = j.split(",", 2)[0]), C.overrideMimeType && C.overrideMimeType(j)), (a.contentType || a.data && "GET" != a.type.toUpperCase()) && (O["Content-Type"] = a.contentType || "application/x-www-form-urlencoded"), a.headers = x(O, a.headers || {}), C.onreadystatechange = function () {
                if (4 == C.readyState) {
                    C.onreadystatechange = _, clearTimeout(k);
                    var e, t = !1;
                    if (C.status >= 200 && C.status < 300 || 304 == C.status || 0 == C.status && "file:" == E) {
                        if (m = m || function (e) {
                            e && (e = e.split(";", 2)[0]);
                            return e && (e == f ? "html" : e == l ? "json" : c.test(e) ? "script" : u.test(e) && "xml") || "text"
                        }(C.getResponseHeader("content-type")), "arraybuffer" == C.responseType || "blob" == C.responseType) e = C.response;
                        else {
                            e = C.responseText;
                            try {
                                "script" == m ? (0, eval)(e) : "xml" == m ? e = C.responseXML : "json" == m && (e = d.test(e) ? null : JSON.parse(e))
                            } catch (e) {
                                t = e
                            }
                            t && v(t, "parsererror", C, a)
                        }
                        g(e, C, a)
                    } else v(null, "error", C, a)
                }
            }, !1 === function (e, t) {
                var n = t.context;
                if (!1 === t.beforeSend.call(n, e, t) || !1 === h(t)) return !1;
                h(t)
            }(C, a)) return C.abort(), v(null, "abort", C, a), C;
            var T = !("async" in a) || a.async;
            if (C.open(a.type, a.url, T, a.username, a.password), a.xhrFields)
                for (o in a.xhrFields) C[o] = a.xhrFields[o];
            for (o in a.headers) C.setRequestHeader(o, a.headers[o]);
            return a.timeout > 0 && (k = setTimeout(function () {
                C.onreadystatechange = _, C.abort(), v(null, "timeout", C, a)
            }, a.timeout)), C.send(a.data ? a.data : null), C
        };

        function y(e) {
            e.global && 0 == m.active++ && h(e)
        }

        function g(e, t, n) {
            var r = n.context;
            n.success.call(r, e, "success", t), h(n), b("success", t, n)
        }

        function v(e, t, n, r) {
            var o = r.context;
            r.error.call(o, n, t, e), h(r), b(t, n, r)
        }

        function b(e, t, n) {
            var r = n.context;
            n.complete.call(r, t, e), h(n),
                function (e) {
                    e.global && !--m.active && h(e)
                }(n)
        }

        function _() { }

        function w(e, t) {
            return "" == t ? e : (e + "&" + t).replace(/[&?]{1,2}/, "?")
        }

        function S(e) {
            "object" === i(e.data) && (e.data = function (e, t) {
                var n = [];
                return n.add = function (e, t) {
                    this.push(k(e) + "=" + k(t))
                },
                    function e(t, n, r, o) {
                        var a = "array" === i(n);
                        for (var s in n) {
                            var c = n[s];
                            o && (s = r ? o : o + "[" + (a ? "" : s) + "]"), !o && a ? t.add(c.name, c.value) : (r ? "array" === i(c) : "object" === i(c)) ? e(t, c, r, s) : t.add(s, c)
                        }
                    }(n, e, t), n.join("&").replace("%20", "+")
            }(e.data)), !e.data || e.type && "GET" != e.type.toUpperCase() || (e.url = w(e.url, e.data))
        }
        m.active = 0, m.JSONP = function (e) {
            if (!("type" in e)) return m(e);
            var t, n = e.jsonpCallback,
                r = ("function" === i(n) ? n() : n) || "jsonp" + a++,
                o = s.createElement("script"),
                c = {
                    abort: function () {
                        s.head.removeChild(o), r in window && (window[r] = _), b("abort", c, e)
                    }
                },
                u = s.getElementsByTagName("head")[0] || s.documentElement;
            return e.error && (o.onerror = function () {
                c.abort(), e.error()
            }), window[r] = function (n) {
                clearTimeout(t), s.head.removeChild(o), delete window[r], g(n, c, e)
            }, S(e), o.src = e.url.replace(/=\?/, "=" + r), u.insertBefore(o, u.firstChild), e.timeout > 0 && (t = setTimeout(function () {
                c.abort(), b("timeout", c, e)
            }, e.timeout)), c
        }, m.settings = {
            type: "GET",
            beforeSend: _,
            success: _,
            error: _,
            complete: _,
            context: null,
            global: !0,
            xhr: function () {
                return new window.XMLHttpRequest
            },
            accepts: {
                script: "text/javascript, application/javascript, application/x-javascript",
                json: l,
                xml: "application/xml, text/xml",
                html: f,
                text: "text/plain"
            },
            crossDomain: !1,
            timeout: 0,
            cache: !0
        }, m.get = function (e, t) {
            return m({
                url: e,
                success: t
            })
        }, m.post = function (e, t, n, r) {
            return "function" === i(t) && (r = r || n, n = t, t = null), m({
                type: "POST",
                url: e,
                data: t,
                success: n,
                dataType: r
            })
        }, m.getJSON = function (e, t) {
            return m({
                url: e,
                success: t,
                dataType: "json"
            })
        };
        var k = encodeURIComponent;

        function x(e) {
            return Array.prototype.slice.call(arguments, 1).forEach(function (t) {
                for (r in t) void 0 !== t[r] && (e[r] = t[r])
            }), e
        }
        t.default = m
    },
    uyoH: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = t.format = function (e) {
            var t = e.protocol,
                n = e.username,
                r = e.password,
                o = e.host,
                i = e.pathname,
                a = e.search,
                s = e.params,
                c = e.hash;
            s && (a = "?" + Object.keys(s).map(function (e) {
                return e + "=" + encodeURIComponent(s[e])
            }).join("&"));
            return [t, "//", n ? n + ":" + r + "@" : "", o, i, a, c].join("")
        },
            o = t.parse = function (e) {
                if (!e) {
                    if (!("undefined" != typeof window)) return console.error("Param of url is need."), null;
                    e = "https://m.beidian.com/login/fast_login.html"
                }
                return function (e) {
                    var t = document.createElement("a");
                    t.href = e;
                    var n = {
                        params: {}
                    };
                    ["protocol", "host", "hostname", "origin", "username", "password", "pathname", "port", "search", "hash"].forEach(function (e) {
                        n[e] = t[e]
                    });
                    var r = n.search;
                    if (r) {
                        var o = {};
                        r.substring(1).split("&").forEach(function (e) {
                            var t = e.split("=");
                            if (t[0]) {
                                var n = t.shift(),
                                    r = t.join("=") || "";
                                try {
                                    o[decodeURIComponent(n)] = decodeURIComponent(r)
                                } catch (e) {
                                    o[n] = r
                                }
                            }
                        }), n.params = o
                    }
                    return n
                }(e)
            };
        t.default = {
            parse: o,
            format: r
        }
    },
    v59c: function (e, t, n) {
        "use strict";
        var r = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var r = t[n];
                    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                }
            }
            return function (t, n, r) {
                return n && e(t.prototype, n), r && e(t, r), t
            }
        }(),
            o = n("wkjT"),
            i = n("wDey"),
            a = n("uyoH");
        n("Fy1N"), n("LE4b");
        var s = (0, a.parse)().params,
            c = (0, a.parse)(decodeURIComponent(s.redirect)).params;
        (new (function () {
            function e() {
                ! function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.sendCodeBtn = $(".msg-pin-btn.for-modify"), this.phoneInput = $(".phone-input"), this.codeInput = $(".msg-pin-input"), this.clearPhoneBtn = $(".J_phone-clear"), this.clearCodeBtn = $(".J_msg-pin-clear"), this.loginBtn = $(".J_login-btn")
            }
            return r(e, [{
                key: "inputClearBtn",
                value: function (e, t) {
                    t.on("click", function (t) {
                        var n = $(t.currentTarget);
                        e.val("").focus(), n.hide()
                    }), e.on("focus", function () {
                        e.val().length > 0 ? t.show() : t.hide()
                    }), e.on("input", function () {
                        e.val().length > 0 ? t.show() : t.hide()
                    }), e.on("blur", function () {
                        setTimeout(function () {
                            t.hide()
                        }, 200)
                    })
                }
            }, {
                key: "bindEvents",
                value: function () {
                    var e = this;
                    this.sendCodeBtn.on("click", function () {
                        e.reqForCode()
                    }), this.inputClearBtn(this.phoneInput, this.clearPhoneBtn), this.inputClearBtn(this.codeInput, this.clearCodeBtn), this.loginBtn.on("click", function (t) {
                        var n = e.phoneInput.val(),
                            r = e.codeInput.val();
                        (0, o.hybridAjax)({
                            method: "beidian.auth.quick.web",
                            type: "POST",
                            data: {
                                tel: n,
                                code: r,
                                shop_id: c.shop_id || ""
                            },
                            success: function (e) {
                                s.redirect ? location.href = decodeURIComponent(s.redirect) : (0, i.note)(e.message, {
                                    mask: !1,
                                    closeTime: 2e3
                                })
                            },
                            error: function () {
                                (0, i.note)("获取验证码请求发送失败", {
                                    closeTime: 2e3,
                                    mask: !1
                                })
                            }
                        })
                    })
                }
            }, {
                key: "toggleBtn",
                value: function (e) {
                    var t = this;
                    if (e) this.sendCodeBtn.prop("disabled", !1).html("获取验证码");
                    else {
                        this.sendCodeBtn.prop("disabled", !0);
                        var n = 60;
                        ! function e() {
                            n -= 1, t.sendCodeBtn.html(n + "s后重发"), n < 0 ? t.toggleBtn(!0) : setTimeout(e, 1e3)
                        }()
                    }
                }
            }, {
                key: "reqForCode",
                value: function () {
                    var e = this,
                        t = $(".phone-input").val();
                    /^1\d{10}$/.test(t) ? (0, o.hybridAjax)({
                        method: "beidian.user.code.send",
                        type: "POST",
                        data: {
                            tel: t,
                            key: "quick_access"
                        },
                        success: function (t) {
                            e.toggleBtn(!1), (0, i.note)(t.message, {
                                closeTime: 2e3,
                                mask: !1
                            })
                        },
                        error: function () {
                            (0, i.note)("获取验证码请求发送失败", {
                                closeTime: 2e3,
                                mask: !1
                            })
                        }
                    }) : (0, i.note)("手机格式错误，请重新输入", {
                        closeTime: 2e3,
                        mask: !1
                    })
                }
            }]), e
        }())).bindEvents()
    },
    vORH: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.default = {
            ignoreErrors: ["diableNightMode is not defined", "Can't find variable: IsClickShowFun", "Cannot redefine property: BCMain"],
            sampleRate: 1
        }
    },
    wDey: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.alert = t.confirm = t.note = t.loading = t.popup = void 0;
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
            o = function (e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }(n("DMch"));
        var i = {
            content: "",
            mask: !0,
            position: "center",
            closeTime: 0,
            actionConfig: [],
            mainStyle: {
                display: "inline-block",
                "max-width": "80%",
                "border-radius": "0.2rem",
                background: "#fff"
            }
        },
            a = t.popup = function (e, t) {
                var n = (0, o.default)(!0, {}, i, t);
                n.content = e || n.content;
                var a = document.createElement("div");
                a.className = "popup-mask";
                var s = document.createElement("div");
                s.className = "popup-main";
                var c = document.createElement("div");
                c.className = "popup-content";
                var u = document.createElement("div");
                u.className = "popup-title", n.title && (n.title = '<div style="text-align:center;font-size:0.8rem;font-weight:600;padding-top:0.756rem;margin-bottom:-0.256rem;">' + n.title + "</div>"),
                    function (e, t, n, o, i) {
                        if (t.style.position = "fixed", t.style.left = "0", t.style.top = "0", t.style.width = "100%", t.style.height = "100%", t.style.background = "rgba(47, 52, 61, .4)", t.style.zIndex = 999, "object" === r(e.mainStyle))
                            for (var a in e.mainStyle) e.mainStyle.hasOwnProperty(a) && (n.style[a] = e.mainStyle[a]);
                        t.appendChild(n), n.appendChild(i), n.appendChild(o), !1 === e.mask && (t.style.background = "rgba(0,0,0,0)"), e.title && (i.innerHTML = e.title), o.innerHTML = e.content
                    }(n, a, s, c, u),
                    function (e, t) {
                        var n = e.actionConfig.length;
                        if (n > 0) {
                            var r = document.createElement("div");
                            r.className = "popup-action";
                            var i = document.createElement("a");
                            i.className = "popup-action-btn";
                            var a = {
                                text: ""
                            };
                            r.style.padding = "0", r.style.textAlign = "center", t.appendChild(r), n >= 3 && (i.style.width = 100 / e.actionConfig.length + "%", i.style.color = "#0d81ff"), e.actionConfig.reverse();
                            for (var s = function (t) {
                                var s = i.cloneNode(),
                                    c = (0, o.default)({}, a, e.actionConfig[t]);
                                s.style.display = "inline-block", s.style.height = "1.87rem", s.style.lineHeight = "1.87rem", s.style.textAlign = "center", s.style.fontSize = "0.7rem", s.style.textDecoration = "none", s.style.boxSizing = "border-box", s.style.borderTop = "1px solid rgba(0,0,0,.08)", s.style.fontWeight = "600", 1 === n ? (s.style.width = "100%", s.style.color = "#FF1A1A") : 2 === n && (1 === t ? (s.style.width = "50%", s.style.color = "#3d3d3d", s.style.borderRight = "1px solid rgba(0,0,0,.08)") : (s.style.width = "50%", s.style.color = "#FF1A1A")), s.innerHTML = c.text, s.addEventListener("click", function (e) {
                                    c.callback && c.callback()
                                }, !1), 0 !== t && e.actionConfig.length >= 3 && (s.style.boxSizing = "border-box", s.style.borderRight = "1px #eee solid"), r.appendChild(s)
                            }, c = n; c--;) s(c)
                        }
                    }(n, s),
                    function (e) {
                        document.getElementsByTagName("body")[0].appendChild(e)
                    }(a),
                    function (e, t) {
                        "center" === e.position ? (t.style.position = "absolute", t.style.top = "50%", t.style.left = "50%", t.style.transform = "translate(-50% , -50%)", t.style.webkitTransform = "translate(-50% , -50%)") : "top" === e.position ? (t.style.position = "absolute", t.style.top = "5%", t.style.left = "50%", t.style.transform = "translate(-50% , 0)", t.style.webkitTransform = "translate(-50% , 0)") : "bottom" === e.position && (t.style.position = "absolute", t.style.top = "95%", t.style.left = "50%", t.style.transform = "translate(-50% , 0)", t.style.webkitTransform = "translate(-50% , 0)", t.style.marginTop = -t.offsetHeight + "px"), t.style.boxSizing = "border-box"
                    }(n, s);
                var l = {
                    $mask: a,
                    show: function () {
                        return this.$mask.style.display = "block", this
                    },
                    hide: function () {
                        return this.$mask.style.display = "none", this
                    },
                    fadeOut: function (e) {
                        var t = this,
                            n = 200,
                            r = function r() {
                                n -= 20, t.$mask.style.opacity = n / 200, setTimeout(function () {
                                    r()
                                }, 20), 0 === n && e()
                            };
                        r()
                    },
                    remove: function () {
                        return this.$mask && this.$mask.parentNode && this.$mask.parentNode.removeChild(this.$mask), this
                    }
                };
                return 0 !== n.closeTime && setTimeout(function () {
                    l.fadeOut(function () {
                        l.remove(), n.closeCallback && "function" == typeof n.closeCallback && n.closeCallback()
                    })
                }, n.closeTime), l
            },
            s = t.loading = function (e) {
                return e = (0, o.default)(!0, {}, {
                    mainStyle: {
                        background: "rgba(0,0,0,.5)",
                        padding: ".375rem .5rem"
                    }
                }, e), a('<style>.sk-fading-circle{width:1.5rem;height:1.5rem;position:relative}.sk-fading-circle .sk-circle{width:100%;height:100%;position:absolute;left:0;top:0}.sk-fading-circle .sk-circle:before{content:"";display:block;margin:0 auto;width:15%;height:15%;background-color:#fff;border-radius:100%;-webkit-animation:sk-circleFadeDelay 1.2s infinite ease-in-out both;animation:sk-circleFadeDelay 1.2s infinite ease-in-out both}.sk-fading-circle .sk-circle2{-webkit-transform:rotate(30deg);-ms-transform:rotate(30deg);transform:rotate(30deg)}.sk-fading-circle .sk-circle3{-webkit-transform:rotate(60deg);-ms-transform:rotate(60deg);transform:rotate(60deg)}.sk-fading-circle .sk-circle4{-webkit-transform:rotate(90deg);-ms-transform:rotate(90deg);transform:rotate(90deg)}.sk-fading-circle .sk-circle5{-webkit-transform:rotate(120deg);-ms-transform:rotate(120deg);transform:rotate(120deg)}.sk-fading-circle .sk-circle6{-webkit-transform:rotate(150deg);-ms-transform:rotate(150deg);transform:rotate(150deg)}.sk-fading-circle .sk-circle7{-webkit-transform:rotate(180deg);-ms-transform:rotate(180deg);transform:rotate(180deg)}.sk-fading-circle .sk-circle8{-webkit-transform:rotate(210deg);-ms-transform:rotate(210deg);transform:rotate(210deg)}.sk-fading-circle .sk-circle9{-webkit-transform:rotate(240deg);-ms-transform:rotate(240deg);transform:rotate(240deg)}.sk-fading-circle .sk-circle10{-webkit-transform:rotate(270deg);-ms-transform:rotate(270deg);transform:rotate(270deg)}.sk-fading-circle .sk-circle11{-webkit-transform:rotate(300deg);-ms-transform:rotate(300deg);transform:rotate(300deg)}.sk-fading-circle .sk-circle12{-webkit-transform:rotate(330deg);-ms-transform:rotate(330deg);transform:rotate(330deg)}.sk-fading-circle .sk-circle2:before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.sk-fading-circle .sk-circle3:before{-webkit-animation-delay:-1s;animation-delay:-1s}.sk-fading-circle .sk-circle4:before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.sk-fading-circle .sk-circle5:before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.sk-fading-circle .sk-circle6:before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.sk-fading-circle .sk-circle7:before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.sk-fading-circle .sk-circle8:before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.sk-fading-circle .sk-circle9:before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.sk-fading-circle .sk-circle10:before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.sk-fading-circle .sk-circle11:before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.sk-fading-circle .sk-circle12:before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes sk-circleFadeDelay{0%,39%,100%{opacity:0}40%{opacity:1}}@keyframes sk-circleFadeDelay{0%,39%,100%{opacity:0}40%{opacity:1}}</style><div class="sk-fading-circle"><div class="sk-circle1 sk-circle"></div><div class="sk-circle2 sk-circle"></div><div class="sk-circle3 sk-circle"></div><div class="sk-circle4 sk-circle"></div><div class="sk-circle5 sk-circle"></div><div class="sk-circle6 sk-circle"></div><div class="sk-circle7 sk-circle"></div><div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div><div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>', e)
            },
            c = t.note = function (e, t) {
                var n = {
                    mainStyle: {
                        background: "rgba(41,49,61,.7)",
                        padding: ".426rem .512rem"
                    },
                    closeTime: 1e3
                };
                return t = "number" == typeof t ? (0, o.default)(!0, {}, n, {
                    closeTime: t
                }) : (0, o.default)(!0, {}, n, t), a('<div style="color:#fff;font-size:0.6rem;margin:0">' + e + "</div>", t)
            },
            u = t.confirm = function (e, t, n, r) {
                var i = void 0;
                return r = (0, o.default)(!0, {}, {
                    mainStyle: {
                        width: "72%",
                        "border-radius": "0.55rem"
                    },
                    mask: !0,
                    actionConfig: [{
                        text: "取消",
                        callback: function () {
                            i.remove(), n && n.apply(i)
                        }
                    }, {
                        text: "确认",
                        callback: function () {
                            i.remove(), t && t.apply(i)
                        }
                    }],
                    title: ""
                }, r), i = a('<div style="padding:.756rem 1.06rem;text-align:center;font-size:0.7rem;">' + e + "</div>", r)
            },
            l = t.alert = function (e, t, n) {
                var r = void 0;
                return n = (0, o.default)(!0, {}, {
                    mainStyle: {
                        width: "72%",
                        "border-radius": "0.55rem"
                    },
                    mask: !0,
                    actionConfig: [{
                        text: "确认",
                        callback: function () {
                            r.remove(), t && t()
                        }
                    }],
                    title: ""
                }, n), r = a('<div style="padding:.756rem 1.06rem;text-align:center;font-size: 0.7rem;">' + e + "</div>", n)
            };
        t.default = {
            loading: s,
            note: c,
            confirm: u,
            alert: l,
            popup: a
        }
    },
    wkjT: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.hybridAjax = t.newHybridAjax = t.abrAjax = t.ajax = void 0;
        var r = Object.assign || function (e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
        },
            o = f(n("dH37")),
            i = n("Apbo"),
            a = n("wDey"),
            s = n("uyoH"),
            c = f(n("N2Cd")),
            u = f(n("FN7h")),
            l = f(n("uDZM"));

        function f(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var d = o.default,
            p = s.parse,
            h = c.default,
            m = u.default,
            y = {},
            g = (0, i.isHybridExist)(),
            v = window.$ && window.$.ajax ? window.$.ajax : l.default,
            b = function (e) {
                return "[object Object]" === Object.prototype.toString.call(e)
            },
            _ = function (e) {
                return !!y[e] || (y[e] = !0, !1)
            },
            w = function (e) {
                var t = function (e) {
                    var t = e.split(".");
                    return e.match(/(.com.cn|.net.cn|.org.cn)/i) ? "//api." + t.slice(-3).join(".") : "//api." + t.slice(-2).join(".")
                }("m.beidian.com"),
                    n = r({}, {
                        url: t + "/mroute.html?method=",
                        data: {},
                        method: "",
                        type: "GET",
                        dataType: "json",
                        jsonpCallback: "",
                        cache: !0,
                        beforeSend: function () {
                            return ""
                        },
                        success: function () {
                            return ""
                        },
                        failure: function () {
                            return ""
                        },
                        error: function () {
                            return ""
                        },
                        complete: function () {
                            return ""
                        },
                        loginHandler: null,
                        noFailure: !0,
                        downgrade: !0,
                        apiURL: "",
                        timeout: 0,
                        xhrFields: {
                            withCredentials: !0
                        }
                    }, e);
                n.type = n.type.toUpperCase(), /=$/.test(n.url) && (n.url += n.method || ""), n.uri = function (e) {
                    return /^https?:/.test(e) || (e = "https:" + e), p(e)
                }(n.url), n.data = function (e) {
                    if (void 0 === e || null === e) e = {};
                    else if ("string" == typeof e) return e;
                    for (var t in e) {
                        var n = e[t];
                        void 0 !== n && null !== n || (n = ""), e[t] = String(n)
                    }
                    return e
                }(n.data);
                var o = void 0;
                "string" == typeof n.data ? o = n.data : o = Object.keys(n.data).map(function (e) {
                    return encodeURIComponent(e) + "=" + encodeURIComponent(n.data[e])
                }).join("&");
                return n.urlKey = n.url + o, "POST" === n.type && n.url.indexOf("//api.beibei.com") > -1 && (n.data.rams_device_id = h.get()), "GET" === n.type ? (n.query = r({}, n.uri.params, n.data), n.form = {}) : (n.query = r({}, n.uri.params), n.form = n.data), n
            },
            S = function (e) {
                var t = e.url,
                    n = e.type,
                    r = e.data,
                    o = e.dataType,
                    i = e.jsonpCallback,
                    s = e.cache,
                    c = e.beforeSend,
                    u = e.timeout,
                    l = e.xhrFields,
                    f = e.headers,
                    d = {
                        url: t,
                        type: n,
                        data: r,
                        dataType: o,
                        jsonpCallback: i,
                        cache: s,
                        xhrFields: l,
                        beforeSend: c,
                        timeout: u,
                        success: function (t, n, r) {
                            t && "101" === t.err_code && t.data && t.data.target ? location.href = t.data.target + "&redirect=" + encodeURIComponent(location.href) : t && "2" === t.err_code && "function" == typeof e.loginHandler ? e.loginHandler() : !1 !== t.success || e.noFailure ? "function" == typeof e.success && e.success(t, n, r) : ((0, a.note)(t.message), "function" == typeof e.failure && e.failure(t, n, r))
                        },
                        error: function (t, n, r) {
                            t.type = n, t.error = r, t.requestType = "XMLHttpRequest", "function" == typeof e.error && e.error(t)
                        },
                        complete: function (t, n) {
                            y[e.urlKey] = !1, "function" == typeof e.complete && e.complete(t, n)
                        }
                    };
                return f && (d.headers = f), v(d)
            },
            k = t.ajax = function (e) {
                return e = w(e), _(e.urlKey) ? "loading" : S(e)
            },
            x = t.abrAjax = function (e) {
                var t = w(e);
                if (_(t.urlKey)) return "loading";
                if (/\/\/api\./.test(t.url)) {
                    var n = t.url,
                        r = t.type,
                        o = t.query,
                        i = t.data;
                    t.query._abr_ = m({
                        url: n,
                        type: r,
                        query: o,
                        body: i
                    });
                    var a = t.url.indexOf("?") > -1 ? "&" : "?";
                    t.url += a + "_abr_=" + t.query._abr_
                }
                return S(t)
            },
            j = t.newHybridAjax = function (e) {
                var t = e.headers || "";
                if (!1 === (e = w(e)).beforeSend()) return "before forbin";
                if (!g || !/^(.+)?\/\/api\..+\.com.+/.test(e.url)) return e.downgrade ? (x(e), "downgrade") : "Not support hybrid ajax";
                var n = {
                    apiURL: e.apiURL,
                    url: "<default-api-url>",
                    query: e.query,
                    form: e.form,
                    method: e.type,
                    bb_transmission: 1
                };
                return t && (n.headers = t), _(e.urlKey) ? "loading" : (d("ajax").ajax(n, function (t, n) {
                    if (n && n.headers && 1 === parseInt(n.headers.bb_transmission)) {
                        if ("101" === n.result.err_code && n.result.data && n.result.data.target) return void d("openURL").openURL({
                            url: n.result.data.target + "&redirect=" + encodeURIComponent(location.href)
                        });
                        if ((n.result && n.result.err_code && "2" === n.result.err_code || !1) && "function" == typeof e.loginHandler) return y[e.urlKey] = !1, void e.loginHandler();
                        if (n.error) return b(n.error) && (n.error.requestType = "hybrid"), e.error(n.error), e.complete(), void (y[e.urlKey] = !1);
                        n.headers.bb_http_status_code && (n.headers.bb_http_status_code >= 200 && n.headers.bb_http_status_code < 300 || 304 === n.headers.bb_http_status_code) ? !1 !== n.result.success || e.noFailure ? e.success(n.result) : ((0, a.note)(n.result.message), e.failure(n.result)) : (b(n.result) && (n.result.requestType = "hybrid"), e.error(n.result)), e.complete(), y[e.urlKey] = !1
                    } else {
                        var r = t && [1, 2, 6].indexOf(t.code) > -1,
                            o = n && "2" === n.err_code,
                            i = r || o;
                        if (n && "101" === n.err_code && n.data && n.data.target) return void d("openURL").openURL({
                            url: n.data.target + "&redirect=" + encodeURIComponent(location.href)
                        });
                        if (i && d("checkLogin").checkLogin(function (t, n) {
                            if ((!1 === n || 0 === parseInt(n, 10)) && "function" == typeof e.loginHandler) return y[e.urlKey] = !1, void e.loginHandler()
                        }), t) return b(t) && (t.requestType = "hybrid"), e.error(t), e.complete(), void (y[e.urlKey] = !1);
                        !1 !== n.success || e.noFailure ? e.success(n) : ((0, a.note)(n.message), e.failure(n)), e.complete(), y[e.urlKey] = !1
                    }
                }), !0)
            },
            O = t.hybridAjax = j;
        t.default = {
            ajax: k,
            hybridAjax: O,
            abrAjax: x,
            newHybridAjax: j
        }
    },
    yLpj: function (e, t, n) {
        "use strict";
        var r, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
            return typeof e
        } : function (e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        r = function () {
            return this
        }();
        try {
            r = r || Function("return this")() || (0, eval)("this")
        } catch (e) {
            "object" === ("undefined" == typeof window ? "undefined" : o(window)) && (r = window)
        }
        e.exports = r
    },
    zgpE: function (e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.getAuthorizeURL = t.utmSource = t.sessionStatus = t.wxSourceToken = t.getWxItem = t.addParams = void 0;
        var r = i(n("uyoH")),
            o = i(n("WqTA"));

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        var a = location.hostname.replace(/(mp|m)\./gi, ""),
            s = r.default.parse().params,
            c = [{
                type: 27,
                source: "beidian_service",
                appid: "wx42d898f407bc64e8",
                redirect_domain: "m.beidian.com"
            }],
            u = (t.addParams = function (e, t) {
                e || (e = location.href);
                var n = [];
                return t.forEach(function (e) {
                    n.push(e + "=" + (function (e) {
                        return s[e] || window.sessionStorage.getItem(e)
                    }(e) || ""))
                }), n = n.join("&"), "" + e + (-1 === e.indexOf("?") ? "?" : "&") + n
            }, function () {
                var e = sessionStorage.getItem("_domain_config");
                return e ? JSON.parse(e) : ""
            });
        t.getWxItem = function () {
            return new Promise(function (e, t) {
                var n = u(),
                    r = s.from_wechat,
                    o = r ? {
                        from_wechat: r
                    } : {};
                n ? e(n) : $.ajax({
                    url: "//api.beidian.com/mroute.html?method=beidian.h5.domain.config",
                    xhrFields: {
                        withCredentials: !0
                    },
                    data: o,
                    success: function (t) {
                        t.success ? (sessionStorage.setItem("_domain_config", JSON.stringify(t.domain_config)), e(t.domain_config)) : (sessionStorage.setItem("_domain_config", JSON.stringify(c[0])), e(c[0]))
                    },
                    error: function () {
                        sessionStorage.setItem("_domain_config", JSON.stringify(c[0])), e(c[0])
                    }
                })
            })
        }, t.wxSourceToken = {
            getName: function (e) {
                return "_token_" + e.source
            },
            get: function () {
                return (0, o.default)(this.getName(u()))
            },
            set: function (e) {
                var t = new Date;
                t.setMinutes(t.getMinutes() + 5), (0, o.default)(this.getName(u()), e, {
                    path: "/",
                    expires: t,
                    domain: a
                })
            },
            clear: function () {
                (0, o.default)(this.getName(u()), 0, {
                    path: "/",
                    expires: -1,
                    domain: a
                }), (0, o.default)("delayBaseAuth", 0, {
                    path: "/",
                    expires: -1,
                    domain: a
                })
            }
        }, t.sessionStatus = {
            setSymbol: function () {
                var e = new Date;
                e.setMinutes(e.getMinutes() + 120), (0, o.default)("_has_session_", 1, {
                    path: "/",
                    expires: e,
                    domain: a
                })
            },
            getSymbol: function () {
                return (0, o.default)("_has_session_")
            }
        }, t.utmSource = {
            set: function () {
                s.utm_source && sessionStorage.setItem("utm_source", s.utm_source)
            },
            get: function () {
                return s.utm_source || sessionStorage.getItem("utm_source") || ""
            }
        }, t.getAuthorizeURL = function (e, t, n, o, i) {
            var a = r.default.parse("https://open.weixin.qq.com/connect/oauth2/authorize");
            return -1 === (e = e.replace(/[&?]code=[\s\S^&]+/, "")).indexOf(i) && (e = "http://" + i + "/redirect/wx_redirect.html?redirect=" + encodeURIComponent(e)), a.params = {
                appid: o,
                redirect_uri: e,
                response_type: "code",
                scope: n || "snsapi_base",
                state: t || ""
            }, a.hash = "wechat_redirect", r.default.format(a)
        }
    }
});
// const location = {
//     host:"m.beidian.com",
//     pathname:"/login/fast_login.html",
//     href : "https://m.beidian.com/login/fast_login.html",
//     protocol: "https:",
//     origin:"https://m.beidian.com"
// };

function getSmsCode(params) {
    let tmp = abr({
        url: '//api.beidian.com/mroute.html?method=beidian.user.code.send',
        type: 'POST',
        query: { method: 'beidian.user.code.send' },
        body: { tel: params.tel, key: params.key }
    });
    let url = "https://api.beidian.com/mroute.html?method=beidian.user.code.send&_abr_=" + tmp;
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        body: `tel=${params.tel}&key=${params.key}`
    }, function (error, response, body) {
        console.log("验证码信息", JSON.stringify(response));

    });
}

function login(params) {
    let tmp = abr({
        url: '//api.beidian.com/mroute.html?method=beidian.auth.quick.web',
        type: 'POST',
        query: { method: 'beidian.auth.quick.web' },
        body: { tel: params.tel, code: params.code, shop_id: params.shop_id }
    });
    let url = "https://api.beidian.com/mroute.html?method=beidian.auth.quick.web&_abr_=" + tmp;
    request({
        url: url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        body: `tel=${params.tel}&code=${params.code}&shop_id=`
    }, function (error, response, body) {
        console.log("登录信息", JSON.stringify(response.headers));
        if (response.body.success) {
            console.log("获取set-cookie", JSON.stringify(response.headers["set-cookie"]));
            let cookies = response.headers["set-cookie"].filter(function (c) {
                return c.indexOf("JSESSIONID") >= 0;
            });
            let token = "";
            if (cookies.length == 1) {
                let cookie = cookies[0];
                token = cookie.split(";")[0].split("=")[1];
            }
            console.log("最终cookie", token);
        } else {
            console.log(response.body.message);
        }
    });
}

// getSmsCode({
//     tel:"13554282393",
//     key: "quick_access"
// });
// login({
//     tel:"13554282393",
//     code: "1047",
//     shop_id:""
// });
export default abr;