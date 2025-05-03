/*! For license information please see index.js.LICENSE.txt */
!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
      ? define([], t)
      : "object" == typeof exports
        ? (exports["zilawsclient"] = t())
        : (e["zilawsclient"] = t());
})(this, () =>
  (() => {
    "use strict";
    var e = {
        87: (e, t) => {
          var n;
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.CloseCodes = void 0),
            (function (e) {
              (e[(e.NORMAL = 1e3)] = "NORMAL"),
                (e[(e.INTERNAL_SERVER_ERROR = 1011)] = "INTERNAL_SERVER_ERROR"),
                (e[(e.SERVER_RESTART = 1012)] = "SERVER_RESTART"),
                (e[(e.TRY_AGAIN_LATER = 1013)] = "TRY_AGAIN_LATER"),
                (e[(e.TLS_FAIL = 1015)] = "TLS_FAIL"),
                (e[(e.KICKED = 4001)] = "KICKED"),
                (e[(e.BANNED = 4002)] = "BANNED"),
                (e[(e.BAD_MESSAGE = 4003)] = "BAD_MESSAGE");
            })(n || (t.CloseCodes = n = {}));
        },
        831: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            Object.defineProperty(t, "MAX", {
              enumerable: !0,
              get: function () {
                return r.default;
              },
            }),
            Object.defineProperty(t, "NIL", {
              enumerable: !0,
              get: function () {
                return o.default;
              },
            }),
            Object.defineProperty(t, "parse", {
              enumerable: !0,
              get: function () {
                return a.default;
              },
            }),
            Object.defineProperty(t, "stringify", {
              enumerable: !0,
              get: function () {
                return i.default;
              },
            }),
            Object.defineProperty(t, "v1", {
              enumerable: !0,
              get: function () {
                return s.default;
              },
            }),
            Object.defineProperty(t, "v1ToV6", {
              enumerable: !0,
              get: function () {
                return l.default;
              },
            }),
            Object.defineProperty(t, "v3", {
              enumerable: !0,
              get: function () {
                return u.default;
              },
            }),
            Object.defineProperty(t, "v4", {
              enumerable: !0,
              get: function () {
                return f.default;
              },
            }),
            Object.defineProperty(t, "v5", {
              enumerable: !0,
              get: function () {
                return c.default;
              },
            }),
            Object.defineProperty(t, "v6", {
              enumerable: !0,
              get: function () {
                return d.default;
              },
            }),
            Object.defineProperty(t, "v6ToV1", {
              enumerable: !0,
              get: function () {
                return v.default;
              },
            }),
            Object.defineProperty(t, "v7", {
              enumerable: !0,
              get: function () {
                return p.default;
              },
            }),
            Object.defineProperty(t, "validate", {
              enumerable: !0,
              get: function () {
                return y.default;
              },
            }),
            Object.defineProperty(t, "version", {
              enumerable: !0,
              get: function () {
                return b.default;
              },
            });
          var r = h(n(213)),
            o = h(n(808)),
            a = h(n(792)),
            i = h(n(910)),
            s = h(n(518)),
            l = h(n(343)),
            u = h(n(948)),
            f = h(n(73)),
            c = h(n(186)),
            d = h(n(671)),
            v = h(n(507)),
            p = h(n(744)),
            y = h(n(37)),
            b = h(n(775));
          function h(e) {
            return e && e.__esModule ? e : { default: e };
          }
        },
        213: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          t.default = "ffffffff-ffff-ffff-ffff-ffffffffffff";
        },
        311: (e, t) => {
          function n(e) {
            return 14 + (((e + 64) >>> 9) << 4) + 1;
          }
          function r(e, t) {
            var n = (65535 & e) + (65535 & t);
            return (((e >> 16) + (t >> 16) + (n >> 16)) << 16) | (65535 & n);
          }
          function o(e, t, n, o, a, i) {
            return r(((s = r(r(t, e), r(o, i))) << (l = a)) | (s >>> (32 - l)), n);
            var s, l;
          }
          function a(e, t, n, r, a, i, s) {
            return o((t & n) | (~t & r), e, t, a, i, s);
          }
          function i(e, t, n, r, a, i, s) {
            return o((t & r) | (n & ~r), e, t, a, i, s);
          }
          function s(e, t, n, r, a, i, s) {
            return o(t ^ n ^ r, e, t, a, i, s);
          }
          function l(e, t, n, r, a, i, s) {
            return o(n ^ (t | ~r), e, t, a, i, s);
          }
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          t.default = function (e) {
            if ("string" == typeof e) {
              var t = unescape(encodeURIComponent(e));
              e = new Uint8Array(t.length);
              for (var o = 0; o < t.length; ++o) e[o] = t.charCodeAt(o);
            }
            return (function (e) {
              for (var t = [], n = 32 * e.length, r = "0123456789abcdef", o = 0; o < n; o += 8) {
                var a = (e[o >> 5] >>> o % 32) & 255,
                  i = parseInt(r.charAt((a >>> 4) & 15) + r.charAt(15 & a), 16);
                t.push(i);
              }
              return t;
            })(
              (function (e, t) {
                (e[t >> 5] |= 128 << t % 32), (e[n(t) - 1] = t);
                for (
                  var o = 1732584193, u = -271733879, f = -1732584194, c = 271733878, d = 0;
                  d < e.length;
                  d += 16
                ) {
                  var v = o,
                    p = u,
                    y = f,
                    b = c;
                  (o = a(o, u, f, c, e[d], 7, -680876936)),
                    (c = a(c, o, u, f, e[d + 1], 12, -389564586)),
                    (f = a(f, c, o, u, e[d + 2], 17, 606105819)),
                    (u = a(u, f, c, o, e[d + 3], 22, -1044525330)),
                    (o = a(o, u, f, c, e[d + 4], 7, -176418897)),
                    (c = a(c, o, u, f, e[d + 5], 12, 1200080426)),
                    (f = a(f, c, o, u, e[d + 6], 17, -1473231341)),
                    (u = a(u, f, c, o, e[d + 7], 22, -45705983)),
                    (o = a(o, u, f, c, e[d + 8], 7, 1770035416)),
                    (c = a(c, o, u, f, e[d + 9], 12, -1958414417)),
                    (f = a(f, c, o, u, e[d + 10], 17, -42063)),
                    (u = a(u, f, c, o, e[d + 11], 22, -1990404162)),
                    (o = a(o, u, f, c, e[d + 12], 7, 1804603682)),
                    (c = a(c, o, u, f, e[d + 13], 12, -40341101)),
                    (f = a(f, c, o, u, e[d + 14], 17, -1502002290)),
                    (o = i(o, (u = a(u, f, c, o, e[d + 15], 22, 1236535329)), f, c, e[d + 1], 5, -165796510)),
                    (c = i(c, o, u, f, e[d + 6], 9, -1069501632)),
                    (f = i(f, c, o, u, e[d + 11], 14, 643717713)),
                    (u = i(u, f, c, o, e[d], 20, -373897302)),
                    (o = i(o, u, f, c, e[d + 5], 5, -701558691)),
                    (c = i(c, o, u, f, e[d + 10], 9, 38016083)),
                    (f = i(f, c, o, u, e[d + 15], 14, -660478335)),
                    (u = i(u, f, c, o, e[d + 4], 20, -405537848)),
                    (o = i(o, u, f, c, e[d + 9], 5, 568446438)),
                    (c = i(c, o, u, f, e[d + 14], 9, -1019803690)),
                    (f = i(f, c, o, u, e[d + 3], 14, -187363961)),
                    (u = i(u, f, c, o, e[d + 8], 20, 1163531501)),
                    (o = i(o, u, f, c, e[d + 13], 5, -1444681467)),
                    (c = i(c, o, u, f, e[d + 2], 9, -51403784)),
                    (f = i(f, c, o, u, e[d + 7], 14, 1735328473)),
                    (o = s(o, (u = i(u, f, c, o, e[d + 12], 20, -1926607734)), f, c, e[d + 5], 4, -378558)),
                    (c = s(c, o, u, f, e[d + 8], 11, -2022574463)),
                    (f = s(f, c, o, u, e[d + 11], 16, 1839030562)),
                    (u = s(u, f, c, o, e[d + 14], 23, -35309556)),
                    (o = s(o, u, f, c, e[d + 1], 4, -1530992060)),
                    (c = s(c, o, u, f, e[d + 4], 11, 1272893353)),
                    (f = s(f, c, o, u, e[d + 7], 16, -155497632)),
                    (u = s(u, f, c, o, e[d + 10], 23, -1094730640)),
                    (o = s(o, u, f, c, e[d + 13], 4, 681279174)),
                    (c = s(c, o, u, f, e[d], 11, -358537222)),
                    (f = s(f, c, o, u, e[d + 3], 16, -722521979)),
                    (u = s(u, f, c, o, e[d + 6], 23, 76029189)),
                    (o = s(o, u, f, c, e[d + 9], 4, -640364487)),
                    (c = s(c, o, u, f, e[d + 12], 11, -421815835)),
                    (f = s(f, c, o, u, e[d + 15], 16, 530742520)),
                    (o = l(o, (u = s(u, f, c, o, e[d + 2], 23, -995338651)), f, c, e[d], 6, -198630844)),
                    (c = l(c, o, u, f, e[d + 7], 10, 1126891415)),
                    (f = l(f, c, o, u, e[d + 14], 15, -1416354905)),
                    (u = l(u, f, c, o, e[d + 5], 21, -57434055)),
                    (o = l(o, u, f, c, e[d + 12], 6, 1700485571)),
                    (c = l(c, o, u, f, e[d + 3], 10, -1894986606)),
                    (f = l(f, c, o, u, e[d + 10], 15, -1051523)),
                    (u = l(u, f, c, o, e[d + 1], 21, -2054922799)),
                    (o = l(o, u, f, c, e[d + 8], 6, 1873313359)),
                    (c = l(c, o, u, f, e[d + 15], 10, -30611744)),
                    (f = l(f, c, o, u, e[d + 6], 15, -1560198380)),
                    (u = l(u, f, c, o, e[d + 13], 21, 1309151649)),
                    (o = l(o, u, f, c, e[d + 4], 6, -145523070)),
                    (c = l(c, o, u, f, e[d + 11], 10, -1120210379)),
                    (f = l(f, c, o, u, e[d + 2], 15, 718787259)),
                    (u = l(u, f, c, o, e[d + 9], 21, -343485551)),
                    (o = r(o, v)),
                    (u = r(u, p)),
                    (f = r(f, y)),
                    (c = r(c, b));
                }
                return [o, u, f, c];
              })(
                (function (e) {
                  if (0 === e.length) return [];
                  for (var t = 8 * e.length, r = new Uint32Array(n(t)), o = 0; o < t; o += 8)
                    r[o >> 5] |= (255 & e[o / 8]) << o % 32;
                  return r;
                })(e),
                8 * e.length
              )
            );
          };
        },
        140: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          var n = "undefined" != typeof crypto && crypto.randomUUID && crypto.randomUUID.bind(crypto);
          t.default = { randomUUID: n };
        },
        808: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          t.default = "00000000-0000-0000-0000-000000000000";
        },
        792: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          var r,
            o = (r = n(37)) && r.__esModule ? r : { default: r };
          t.default = function (e) {
            if (!(0, o.default)(e)) throw TypeError("Invalid UUID");
            var t,
              n = new Uint8Array(16);
            return (
              (n[0] = (t = parseInt(e.slice(0, 8), 16)) >>> 24),
              (n[1] = (t >>> 16) & 255),
              (n[2] = (t >>> 8) & 255),
              (n[3] = 255 & t),
              (n[4] = (t = parseInt(e.slice(9, 13), 16)) >>> 8),
              (n[5] = 255 & t),
              (n[6] = (t = parseInt(e.slice(14, 18), 16)) >>> 8),
              (n[7] = 255 & t),
              (n[8] = (t = parseInt(e.slice(19, 23), 16)) >>> 8),
              (n[9] = 255 & t),
              (n[10] = ((t = parseInt(e.slice(24, 36), 16)) / 1099511627776) & 255),
              (n[11] = (t / 4294967296) & 255),
              (n[12] = (t >>> 24) & 255),
              (n[13] = (t >>> 16) & 255),
              (n[14] = (t >>> 8) & 255),
              (n[15] = 255 & t),
              n
            );
          };
        },
        656: (e, t) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          t.default =
            /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/i;
        },
        858: (e, t) => {
          var n;
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = function () {
              if (
                !n &&
                !(n =
                  "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto))
              )
                throw new Error(
                  "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
                );
              return n(r);
            });
          var r = new Uint8Array(16);
        },
        42: (e, t) => {
          function n(e, t, n, r) {
            switch (e) {
              case 0:
                return (t & n) ^ (~t & r);
              case 1:
              case 3:
                return t ^ n ^ r;
              case 2:
                return (t & n) ^ (t & r) ^ (n & r);
            }
          }
          function r(e, t) {
            return (e << t) | (e >>> (32 - t));
          }
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          t.default = function (e) {
            var t = [1518500249, 1859775393, 2400959708, 3395469782],
              o = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
            if ("string" == typeof e) {
              var a = unescape(encodeURIComponent(e));
              e = [];
              for (var i = 0; i < a.length; ++i) e.push(a.charCodeAt(i));
            } else Array.isArray(e) || (e = Array.prototype.slice.call(e));
            e.push(128);
            for (var s = e.length / 4 + 2, l = Math.ceil(s / 16), u = new Array(l), f = 0; f < l; ++f) {
              for (var c = new Uint32Array(16), d = 0; d < 16; ++d)
                c[d] =
                  (e[64 * f + 4 * d] << 24) |
                  (e[64 * f + 4 * d + 1] << 16) |
                  (e[64 * f + 4 * d + 2] << 8) |
                  e[64 * f + 4 * d + 3];
              u[f] = c;
            }
            (u[l - 1][14] = (8 * (e.length - 1)) / Math.pow(2, 32)),
              (u[l - 1][14] = Math.floor(u[l - 1][14])),
              (u[l - 1][15] = (8 * (e.length - 1)) & 4294967295);
            for (var v = 0; v < l; ++v) {
              for (var p = new Uint32Array(80), y = 0; y < 16; ++y) p[y] = u[v][y];
              for (var b = 16; b < 80; ++b) p[b] = r(p[b - 3] ^ p[b - 8] ^ p[b - 14] ^ p[b - 16], 1);
              for (var h = o[0], g = o[1], m = o[2], _ = o[3], O = o[4], E = 0; E < 80; ++E) {
                var w = Math.floor(E / 20),
                  S = (r(h, 5) + n(w, g, m, _) + O + t[w] + p[E]) >>> 0;
                (O = _), (_ = m), (m = r(g, 30) >>> 0), (g = h), (h = S);
              }
              (o[0] = (o[0] + h) >>> 0),
                (o[1] = (o[1] + g) >>> 0),
                (o[2] = (o[2] + m) >>> 0),
                (o[3] = (o[3] + _) >>> 0),
                (o[4] = (o[4] + O) >>> 0);
            }
            return [
              (o[0] >> 24) & 255,
              (o[0] >> 16) & 255,
              (o[0] >> 8) & 255,
              255 & o[0],
              (o[1] >> 24) & 255,
              (o[1] >> 16) & 255,
              (o[1] >> 8) & 255,
              255 & o[1],
              (o[2] >> 24) & 255,
              (o[2] >> 16) & 255,
              (o[2] >> 8) & 255,
              255 & o[2],
              (o[3] >> 24) & 255,
              (o[3] >> 16) & 255,
              (o[3] >> 8) & 255,
              255 & o[3],
              (o[4] >> 24) & 255,
              (o[4] >> 16) & 255,
              (o[4] >> 8) & 255,
              255 & o[4],
            ];
          };
        },
        910: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0), (t.unsafeStringify = s);
          var r,
            o = (r = n(37)) && r.__esModule ? r : { default: r };
          for (var a = [], i = 0; i < 256; ++i) a.push((i + 256).toString(16).slice(1));
          function s(e, t = 0) {
            return (
              a[e[t + 0]] +
              a[e[t + 1]] +
              a[e[t + 2]] +
              a[e[t + 3]] +
              "-" +
              a[e[t + 4]] +
              a[e[t + 5]] +
              "-" +
              a[e[t + 6]] +
              a[e[t + 7]] +
              "-" +
              a[e[t + 8]] +
              a[e[t + 9]] +
              "-" +
              a[e[t + 10]] +
              a[e[t + 11]] +
              a[e[t + 12]] +
              a[e[t + 13]] +
              a[e[t + 14]] +
              a[e[t + 15]]
            ).toLowerCase();
          }
          t.default = function (e, t = 0) {
            var n = s(e, t);
            if (!(0, o.default)(n)) throw TypeError("Stringified UUID is invalid");
            return n;
          };
        },
        518: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          var r,
            o,
            a,
            i = (r = n(858)) && r.__esModule ? r : { default: r },
            s = n(910);
          var l = 0,
            u = 0;
          t.default = function (e, t, n) {
            var r = (t && n) || 0,
              f = t || new Array(16),
              c = (e = e || {}).node,
              d = e.clockseq;
            if ((e._v6 || (c || (c = o), null == d && (d = a)), null == c || null == d)) {
              var v = e.random || (e.rng || i.default)();
              null == c && ((c = [v[0], v[1], v[2], v[3], v[4], v[5]]), o || e._v6 || ((c[0] |= 1), (o = c))),
                null == d && ((d = 16383 & ((v[6] << 8) | v[7])), void 0 !== a || e._v6 || (a = d));
            }
            var p = void 0 !== e.msecs ? e.msecs : Date.now(),
              y = void 0 !== e.nsecs ? e.nsecs : u + 1,
              b = p - l + (y - u) / 1e4;
            if (
              (b < 0 && void 0 === e.clockseq && (d = (d + 1) & 16383),
              (b < 0 || p > l) && void 0 === e.nsecs && (y = 0),
              y >= 1e4)
            )
              throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
            (l = p), (u = y), (a = d);
            var h = (1e4 * (268435455 & (p += 122192928e5)) + y) % 4294967296;
            (f[r++] = (h >>> 24) & 255),
              (f[r++] = (h >>> 16) & 255),
              (f[r++] = (h >>> 8) & 255),
              (f[r++] = 255 & h);
            var g = ((p / 4294967296) * 1e4) & 268435455;
            (f[r++] = (g >>> 8) & 255),
              (f[r++] = 255 & g),
              (f[r++] = ((g >>> 24) & 15) | 16),
              (f[r++] = (g >>> 16) & 255),
              (f[r++] = (d >>> 8) | 128),
              (f[r++] = 255 & d);
            for (var m = 0; m < 6; ++m) f[r + m] = c[m];
            return t || (0, s.unsafeStringify)(f);
          };
        },
        343: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = function (e) {
              var t = (function (e, t = !1) {
                return Uint8Array.of(
                  ((15 & e[6]) << 4) | ((e[7] >> 4) & 15),
                  ((15 & e[7]) << 4) | ((240 & e[4]) >> 4),
                  ((15 & e[4]) << 4) | ((240 & e[5]) >> 4),
                  ((15 & e[5]) << 4) | ((240 & e[0]) >> 4),
                  ((15 & e[0]) << 4) | ((240 & e[1]) >> 4),
                  ((15 & e[1]) << 4) | ((240 & e[2]) >> 4),
                  96 | (15 & e[2]),
                  e[3],
                  e[8],
                  e[9],
                  e[10],
                  e[11],
                  e[12],
                  e[13],
                  e[14],
                  e[15]
                );
              })("string" == typeof e ? (0, o.default)(e) : e);
              return "string" == typeof e ? (0, a.unsafeStringify)(t) : t;
            });
          var r,
            o = (r = n(792)) && r.__esModule ? r : { default: r },
            a = n(910);
        },
        948: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          var r = a(n(25)),
            o = a(n(311));
          function a(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var i = (0, r.default)("v3", 48, o.default);
          t.default = i;
        },
        25: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.URL = t.DNS = void 0),
            (t.default = function (e, t, n) {
              function r(e, r, i, s) {
                var l;
                if (
                  ("string" == typeof e &&
                    (e = (function (e) {
                      e = unescape(encodeURIComponent(e));
                      for (var t = [], n = 0; n < e.length; ++n) t.push(e.charCodeAt(n));
                      return t;
                    })(e)),
                  "string" == typeof r && (r = (0, a.default)(r)),
                  16 !== (null === (l = r) || void 0 === l ? void 0 : l.length))
                )
                  throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
                var u = new Uint8Array(16 + e.length);
                if (
                  (u.set(r), u.set(e, r.length), ((u = n(u))[6] = (15 & u[6]) | t), (u[8] = (63 & u[8]) | 128), i)
                ) {
                  s = s || 0;
                  for (var f = 0; f < 16; ++f) i[s + f] = u[f];
                  return i;
                }
                return (0, o.unsafeStringify)(u);
              }
              try {
                r.name = e;
              } catch (e) {}
              return (r.DNS = i), (r.URL = s), r;
            });
          var r,
            o = n(910),
            a = (r = n(792)) && r.__esModule ? r : { default: r };
          var i = (t.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"),
            s = (t.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8");
        },
        73: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          var r = i(n(140)),
            o = i(n(858)),
            a = n(910);
          function i(e) {
            return e && e.__esModule ? e : { default: e };
          }
          t.default = function (e, t, n) {
            if (r.default.randomUUID && !t && !e) return r.default.randomUUID();
            var i = (e = e || {}).random || (e.rng || o.default)();
            if (((i[6] = (15 & i[6]) | 64), (i[8] = (63 & i[8]) | 128), t)) {
              n = n || 0;
              for (var s = 0; s < 16; ++s) t[n + s] = i[s];
              return t;
            }
            return (0, a.unsafeStringify)(i);
          };
        },
        186: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          var r = a(n(25)),
            o = a(n(42));
          function a(e) {
            return e && e.__esModule ? e : { default: e };
          }
          var i = (0, r.default)("v5", 80, o.default);
          t.default = i;
        },
        671: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = function (e = {}, t, n = 0) {
              var i = (0, o.default)(l(l({}, e), {}, { _v6: !0 }), new Uint8Array(16));
              if (((i = (0, a.default)(i)), t)) {
                for (var s = 0; s < 16; s++) t[n + s] = i[s];
                return t;
              }
              return (0, r.unsafeStringify)(i);
            });
          var r = n(910),
            o = i(n(518)),
            a = i(n(343));
          function i(e) {
            return e && e.__esModule ? e : { default: e };
          }
          function s(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
              var r = Object.getOwnPropertySymbols(e);
              t &&
                (r = r.filter(function (t) {
                  return Object.getOwnPropertyDescriptor(e, t).enumerable;
                })),
                n.push.apply(n, r);
            }
            return n;
          }
          function l(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? s(Object(n), !0).forEach(function (t) {
                    u(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                  ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                  : s(Object(n)).forEach(function (t) {
                      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                    });
            }
            return e;
          }
          function u(e, t, n) {
            return (
              (t = (function (e) {
                var t = (function (e, t) {
                  if ("object" != typeof e || !e) return e;
                  var n = e[Symbol.toPrimitive];
                  if (void 0 !== n) {
                    var r = n.call(e, t || "default");
                    if ("object" != typeof r) return r;
                    throw new TypeError("@@toPrimitive must return a primitive value.");
                  }
                  return ("string" === t ? String : Number)(e);
                })(e, "string");
                return "symbol" == typeof t ? t : t + "";
              })(t)) in e
                ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                : (e[t] = n),
              e
            );
          }
        },
        507: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }),
            (t.default = function (e) {
              var t = (function (e) {
                return Uint8Array.of(
                  ((15 & e[3]) << 4) | ((e[4] >> 4) & 15),
                  ((15 & e[4]) << 4) | ((240 & e[5]) >> 4),
                  ((15 & e[5]) << 4) | (15 & e[6]),
                  e[7],
                  ((15 & e[1]) << 4) | ((240 & e[2]) >> 4),
                  ((15 & e[2]) << 4) | ((240 & e[3]) >> 4),
                  16 | ((240 & e[0]) >> 4),
                  ((15 & e[0]) << 4) | ((240 & e[1]) >> 4),
                  e[8],
                  e[9],
                  e[10],
                  e[11],
                  e[12],
                  e[13],
                  e[14],
                  e[15]
                );
              })("string" == typeof e ? (0, o.default)(e) : e);
              return "string" == typeof e ? (0, a.unsafeStringify)(t) : t;
            });
          var r,
            o = (r = n(792)) && r.__esModule ? r : { default: r },
            a = n(910);
        },
        744: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          var r,
            o = (r = n(858)) && r.__esModule ? r : { default: r },
            a = n(910);
          var i = null,
            s = null,
            l = 0;
          t.default = function (e, t, n) {
            e = e || {};
            var r = (t && n) || 0,
              u = t || new Uint8Array(16),
              f = e.random || (e.rng || o.default)(),
              c = void 0 !== e.msecs ? e.msecs : Date.now(),
              d = void 0 !== e.seq ? e.seq : null,
              v = s,
              p = i;
            return (
              c > l && void 0 === e.msecs && ((l = c), null !== d && ((v = null), (p = null))),
              null !== d && (d > 2147483647 && (d = 2147483647), (v = (d >>> 19) & 4095), (p = 524287 & d)),
              (null !== v && null !== p) ||
                ((v = ((v = 127 & f[6]) << 8) | f[7]),
                (p = ((p = ((p = 63 & f[8]) << 8) | f[9]) << 5) | (f[10] >>> 3))),
              c + 1e4 > l && null === d ? ++p > 524287 && ((p = 0), ++v > 4095 && ((v = 0), l++)) : (l = c),
              (s = v),
              (i = p),
              (u[r++] = (l / 1099511627776) & 255),
              (u[r++] = (l / 4294967296) & 255),
              (u[r++] = (l / 16777216) & 255),
              (u[r++] = (l / 65536) & 255),
              (u[r++] = (l / 256) & 255),
              (u[r++] = 255 & l),
              (u[r++] = ((v >>> 4) & 15) | 112),
              (u[r++] = 255 & v),
              (u[r++] = ((p >>> 13) & 63) | 128),
              (u[r++] = (p >>> 5) & 255),
              (u[r++] = ((p << 3) & 255) | (7 & f[10])),
              (u[r++] = f[11]),
              (u[r++] = f[12]),
              (u[r++] = f[13]),
              (u[r++] = f[14]),
              (u[r++] = f[15]),
              t || (0, a.unsafeStringify)(u)
            );
          };
        },
        37: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          var r,
            o = (r = n(656)) && r.__esModule ? r : { default: r };
          t.default = function (e) {
            return "string" == typeof e && o.default.test(e);
          };
        },
        775: (e, t, n) => {
          Object.defineProperty(t, "__esModule", { value: !0 }), (t.default = void 0);
          var r,
            o = (r = n(37)) && r.__esModule ? r : { default: r };
          t.default = function (e) {
            if (!(0, o.default)(e)) throw TypeError("Invalid UUID");
            return parseInt(e.slice(14, 15), 16);
          };
        },
        591: (e) => {
          e.exports = function () {
            throw new Error(
              "ws does not work in the browser. Browser clients must use the native WebSocket object"
            );
          };
        },
      },
      t = {};
    function n(r) {
      var o = t[r];
      if (void 0 !== o) return o.exports;
      var a = (t[r] = { exports: {} });
      return e[r](a, a.exports, n), a.exports;
    }
    var r = {};
    return (
      (() => {
        var e = r;
        Object.defineProperty(e, "__esModule", { value: !0 }),
          (e.ZilaConnection = e.WSStatus = void 0),
          (e.connectTo = async function (e, t) {
            return s.connectTo(e, t);
          });
        const t = n(591),
          o = n(831),
          a = n(87);
        var i;
        !(function (e) {
          (e[(e.OPENING = 0)] = "OPENING"),
            (e[(e.OPEN = 1)] = "OPEN"),
            (e[(e.CLOSED = 2)] = "CLOSED"),
            (e[(e.ERROR = 3)] = "ERROR");
        })(i || (e.WSStatus = i = {}));
        class s {
          callbacks = {};
          localEventCallbacks = {};
          connection;
          errorCallback;
          _status = i.OPENING;
          maxWaiterTime = 1200;
          get status() {
            return this._status;
          }
          set status(e) {
            if (
              ((this._status = e),
              this.localEventCallbacks.onStatusChange && this.localEventCallbacks.onStatusChange.length > 0)
            )
              for (const t of this.localEventCallbacks.onStatusChange) t(e);
          }
          static async connectTo(e, n, r = !1) {
            return new Promise(async (o, a) => {
              let l;
              try {
                "undefined" != typeof window && void 0 !== window.document
                  ? ((l = new window.WebSocket(e)),
                    (l.onerror = (e) => {
                      console.error(JSON.stringify(e)),
                        n?.call(e.type),
                        console.error("Disconnected from WebSocket server.");
                    }))
                  : ((l = new t.WebSocket(e, { rejectUnauthorized: !r, headers: { "s-type": 1 } })),
                    (l.onerror = (e) => {
                      console.error(JSON.stringify(e)),
                        n?.call(e.message),
                        console.error("Disconnected from WebSocket server.");
                    }));
              } catch (e) {
                const t = e.stack?.split("\n")[0];
                return e && n && n(t), void a(t);
              }
              const u = new s(l, n);
              u.onceEventListener("onStatusChange", (e) => {
                l && [i.CLOSED, i.ERROR].includes(e) ? a("Couldn't connect to the WebSocket server.") : o(u);
              });
            });
          }
          constructor(e, t) {
            (this.connection = e),
              (this.errorCallback = t),
              (this._status = i.OPENING),
              (this.connection.onopen = () => {
                this.status = i.OPEN;
              }),
              (this.connection.onclose = ({ code: e, reason: t }) => {
                e == a.CloseCodes.BANNED
                  ? console.error("ZilaWS: The client is banned from the WebSocket server.")
                  : e == a.CloseCodes.KICKED &&
                    console.error("ZilaWS: The client got disconnected from the server."),
                  (this.status = i.CLOSED),
                  this.errorCallback && this.errorCallback(t);
              }),
              (this.connection.onmessage = (e) => {
                this.callEventHandler(e.data.toString());
              });
          }
          async callEventHandler(e) {
            if (this.localEventCallbacks.onRawMessageRecieved)
              for (const t of this.localEventCallbacks.onRawMessageRecieved) t(e);
            const t = JSON.parse(e);
            if ("@" == t.identifier[0]) {
              if ("@SetCookie" == t.identifier) {
                if ("undefined" != typeof window && void 0 !== window.document) {
                  const e = t.message;
                  if (((document.cookie = e), this.localEventCallbacks.onCookieSet))
                    for (const t of this.localEventCallbacks.onCookieSet) t(e);
                }
              } else if (
                "@DelCookie" == t.identifier &&
                "undefined" != typeof window &&
                void 0 !== window.document
              ) {
                const e = t.message;
                if (
                  ((document.cookie = `${e}=; expires=${new Date(0)}; path=/;`),
                  this.localEventCallbacks.onCookieDelete)
                )
                  for (const t of this.localEventCallbacks.onCookieDelete) t(e);
              }
              return;
            }
            if (this.localEventCallbacks.onMessageRecieved)
              for (const e of this.localEventCallbacks.onMessageRecieved) e(t.message);
            const n = this.callbacks[t.identifier];
            null != n &&
              t.message &&
              Promise.resolve(n(...t.message)).then((e) => {
                t.callbackId && null != t.callbackId && this.send(t.callbackId, e);
              });
          }
          getMessageJSON(e, t, n, r = !1) {
            return JSON.stringify({ identifier: r ? e : "@" + e, message: t, callbackId: n });
          }
          bSend(e, ...t) {
            this.connection.send(this.getMessageJSON(e, t, null, !0));
          }
          send(e, ...t) {
            this.connection.send(this.getMessageJSON(e, t, null));
          }
          async waiter(e, ...t) {
            return new Promise(async (n) => {
              const r = (0, o.v4)();
              let a;
              n(
                Promise.any([
                  new Promise((e) => {
                    this.setMessageHandler(r, (t) => {
                      clearTimeout(a), this.removeMessageHandler(r), e(t);
                    });
                  }),
                  new Promise((e) => {
                    a = setTimeout(() => {
                      e(void 0);
                    }, this.maxWaiterTime);
                  }),
                ])
              ),
                this.connection.send(this.getMessageJSON(e, t, r));
            });
          }
          waiterTimeout(e, t, ...n) {
            return new Promise(async (r) => {
              const a = (0, o.v4)();
              let i;
              r(
                Promise.any([
                  new Promise((e) => {
                    this.setMessageHandler(a, (t) => {
                      clearTimeout(i), this.removeMessageHandler(a), e(t);
                    });
                  }),
                  new Promise((e) => {
                    i = setTimeout(() => {
                      e(void 0);
                    }, t);
                  }),
                ])
              ),
                this.connection.send(this.getMessageJSON(e, n, a));
            });
          }
          syncCookies() {
            this.bSend("SyncCookies", document.cookie);
          }
          addEventListener(e, t) {
            let n = this.localEventCallbacks[e];
            if (null != n) {
              if (n.findIndex((e) => e === t) >= 0)
                throw new Error(`${e} listener already has this callback added to it.`);
            } else n = [];
            n.push(t), (this.localEventCallbacks[e] = n);
          }
          removeEventListener(e, t) {
            let n = this.localEventCallbacks[e];
            if (!n) return;
            const r = n.indexOf(t);
            -1 != r && (n.splice(r, 1), 0 == n.length && delete this.localEventCallbacks[e]);
          }
          onceEventListener(e, t) {
            const n = this;
            this.addEventListener(e, function r(...o) {
              n.removeEventListener(e, r), t.apply(null, o);
            });
          }
          setMessageHandler(e, t) {
            this.callbacks[e] = t;
          }
          removeMessageHandler(e) {
            delete this.callbacks[e];
          }
          onceMessageHandler(e, t) {
            this.callbacks[e] = async (...n) => {
              this.removeMessageHandler(e);
              return await Promise.resolve(t(...n));
            };
          }
          async setErrorHandler(e) {
            return new Promise((t) => {
              (this.errorCallback = e), t();
            });
          }
          disconnect() {
            this.connection?.close();
          }
          disconnectAsync() {
            return new Promise((e) => {
              if (!this.connection || this.status == i.CLOSED)
                return console.error("The websocket is already disconnected."), void e();
              this.onceEventListener("onStatusChange", (t) => {
                t == i.CLOSED && e();
              }),
                this.connection.close();
            });
          }
        }
        e.ZilaConnection = s;
      })(),
      r
    );
  })()
);
