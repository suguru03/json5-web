var exports = window, module = { exports: exports };!(function(t) {
  if ('object' == typeof exports && 'undefined' != typeof module) module.exports = t();
  else if ('function' == typeof define && define.amd) define([], t);
  else {
    ('undefined' != typeof window
      ? window
      : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
          ? self
          : this
    ).Promise = t();
  }
})(function() {
  return (function o(n, c, l) {
    function u(e, t) {
      if (!c[e]) {
        if (!n[e]) {
          var i = 'function' == typeof require && require;
          if (!t && i) return i(e, !0);
          if (a) return a(e, !0);
          var r = new Error("Cannot find module '" + e + "'");
          throw ((r.code = 'MODULE_NOT_FOUND'), r);
        }
        var s = (c[e] = { exports: {} });
        n[e][0].call(
          s.exports,
          function(t) {
            return u(n[e][1][t] || t);
          },
          s,
          s.exports,
          o,
          n,
          c,
          l
        );
      }
      return c[e].exports;
    }
    for (var a = 'function' == typeof require && require, t = 0; t < l.length; t++) u(l[t]);
    return u;
  })(
    {
      1: [
        function(t, e, i) {
          'use strict';
          t('setimmediate'), (e.exports = t('./lib/aigle'));
        },
        { './lib/aigle': 2, setimmediate: 88 }
      ],
      2: [
        function(xr, Sr, t) {
          (function(l) {
            'use strict';
            var t = xr('aigle-core'),
              n = t.AigleCore,
              u = t.AigleProxy,
              c = xr('./internal/queue'),
              o = xr('./internal/async'),
              e = xr('./internal/util'),
              i = e.VERSION,
              a = e.INTERNAL,
              h = e.PENDING,
              _ = e.UNHANDLED,
              p = e.errorObj,
              f = e.call0,
              y = e.callResolve,
              v = e.callReject,
              r = e.callReceiver,
              m = e.printWarning,
              d = !1,
              g = (function(e) {
                function s(t) {
                  e.call(this),
                    (this._resolved = 0),
                    (this._value = void 0),
                    (this._key = void 0),
                    (this._receiver = void 0),
                    (this._onFulfilled = void 0),
                    (this._onRejected = void 0),
                    (this._receivers = void 0),
                    t !== a && this._execute(t);
                }
                return (
                  e && (s.__proto__ = e),
                  (((s.prototype = Object.create(
                    e && e.prototype
                  )).constructor = s).prototype.then = function(t, e) {
                    return mr(this, new s(a), t, e);
                  }),
                  (s.prototype.catch = function(t) {
                    var e = arguments;
                    if (1 < arguments.length) {
                      var i = arguments.length;
                      if ('function' == typeof (t = arguments[--i])) {
                        for (var r = Array(i); i--; ) r[i] = e[i];
                        t = (function(r, s) {
                          return function(t) {
                            for (var e = r.length; e--; ) {
                              var i = r[e];
                              if (i === Error || i.prototype instanceof Error) {
                                if (t instanceof i) return s(t);
                              } else if (i(t)) return s(t);
                            }
                            return (p.e = t), p;
                          };
                        })(r, t);
                      }
                    }
                    return mr(this, new s(a), void 0, t);
                  }),
                  (s.prototype.finally = function(t) {
                    return (
                      (t =
                        'function' != typeof t
                          ? t
                          : (function(s, o) {
                              return function() {
                                var t = s._resolved,
                                  e = s._value,
                                  i = f(o);
                                if (i === p) return i;
                                if (i instanceof n)
                                  switch (i._resolved) {
                                    case 1:
                                      return (i._value = e), i;
                                    case 2:
                                      return i;
                                  }
                                var r = new g(a);
                                return (
                                  i && i.then
                                    ? 1 === t
                                      ? i.then(
                                          function() {
                                            return r._resolve(e);
                                          },
                                          function(t) {
                                            return r._reject(t);
                                          }
                                        )
                                      : i.then(
                                          function() {
                                            return r._reject(e);
                                          },
                                          function(t) {
                                            return r._reject(t);
                                          }
                                        )
                                    : ((r._resolved = t), (r._value = e)),
                                  r
                                );
                              };
                            })(this, t)),
                      mr(this, new s(a), t, t)
                    );
                  }),
                  (s.prototype.toString = function() {
                    return '[object Promise]';
                  }),
                  (s.prototype.isPending = function() {
                    return 0 === this._resolved;
                  }),
                  (s.prototype.isFulfilled = function() {
                    return 1 === this._resolved;
                  }),
                  (s.prototype.isRejected = function() {
                    return 2 === this._resolved;
                  }),
                  (s.prototype.isCancelled = function() {
                    return this._value instanceof _r;
                  }),
                  (s.prototype.value = function() {
                    return 1 === this._resolved ? this._value : void 0;
                  }),
                  (s.prototype.reason = function() {
                    return 2 === this._resolved ? this._value : void 0;
                  }),
                  (s.prototype.cancel = function() {
                    if (this._execute !== yr && 0 === this._resolved) {
                      var t = this._onCancelQueue;
                      if (t) {
                        var e = -1,
                          i = t.array;
                        for (this._onCancelQueue = void 0; ++e < t.length; ) i[e]();
                      }
                      (this._resolved = 2),
                        (this._value = new _r('late cancellation observer')),
                        this._parent && this._parent.cancel();
                    }
                  }),
                  (s.prototype.suppressUnhandledRejections = function() {
                    this._receiver = a;
                  }),
                  (s.prototype.spread = function(t) {
                    return dr(this, new Ti(t));
                  }),
                  (s.prototype.all = function() {
                    return gr(this, S);
                  }),
                  (s.prototype.allSettled = function() {
                    return gr(this, L);
                  }),
                  (s.prototype.race = function() {
                    return gr(this, E);
                  }),
                  (s.prototype.props = function() {
                    return gr(this, N);
                  }),
                  (s.prototype.parallel = function() {
                    return gr(this, T);
                  }),
                  (s.prototype.series = function() {
                    return gr(this, M);
                  }),
                  (s.prototype.parallelLimit = function(t) {
                    return gr(this, W, t);
                  }),
                  (s.prototype.each = function(t) {
                    return gr(this, G, t);
                  }),
                  (s.prototype.forEach = function(t) {
                    return gr(this, G, t);
                  }),
                  (s.prototype.eachSeries = function(t) {
                    return gr(this, q, t);
                  }),
                  (s.prototype.forEachSeries = function(t) {
                    return gr(this, q, t);
                  }),
                  (s.prototype.eachLimit = function(t, e) {
                    return gr(this, J, t, e);
                  }),
                  (s.prototype.forEachLimit = function(t, e) {
                    return gr(this, J, t, e);
                  }),
                  (s.prototype.map = function(t) {
                    return gr(this, Y, t);
                  }),
                  (s.prototype.mapSeries = function(t) {
                    return gr(this, et, t);
                  }),
                  (s.prototype.mapLimit = function(t, e) {
                    return gr(this, st, t, e);
                  }),
                  (s.prototype.mapValues = function(t) {
                    return gr(this, ct, t);
                  }),
                  (s.prototype.mapValuesSeries = function(t) {
                    return gr(this, at, t);
                  }),
                  (s.prototype.mapValuesLimit = function(t, e) {
                    return gr(this, pt, t, e);
                  }),
                  (s.prototype.filter = function(t) {
                    return gr(this, vt, t);
                  }),
                  (s.prototype.filterSeries = function(t) {
                    return gr(this, gt, t);
                  }),
                  (s.prototype.filterLimit = function(t, e) {
                    return gr(this, Rt, t, e);
                  }),
                  (s.prototype.reject = function(t) {
                    return gr(this, bt, t);
                  }),
                  (s.prototype.rejectSeries = function(t) {
                    return gr(this, Et, t);
                  }),
                  (s.prototype.rejectLimit = function(t, e) {
                    return gr(this, Nt, t, e);
                  }),
                  (s.prototype.find = function(t) {
                    return gr(this, Tt, t);
                  }),
                  (s.prototype.findSeries = function(t) {
                    return gr(this, Mt, t);
                  }),
                  (s.prototype.findLimit = function(t, e) {
                    return gr(this, Wt, t, e);
                  }),
                  (s.prototype.findIndex = function(t) {
                    return gr(this, Gt, t);
                  }),
                  (s.prototype.findIndexSeries = function(t) {
                    return gr(this, qt, t);
                  }),
                  (s.prototype.findIndexLimit = function(t, e) {
                    return gr(this, Jt, t, e);
                  }),
                  (s.prototype.findKey = function(t) {
                    return gr(this, Yt, t);
                  }),
                  (s.prototype.findKeySeries = function(t) {
                    return gr(this, ee, t);
                  }),
                  (s.prototype.findKeyLimit = function(t, e) {
                    return gr(this, se, t, e);
                  }),
                  (s.prototype.pick = function(t) {
                    for (var e = [], i = arguments.length - 1; 0 < i--; ) e[i] = arguments[i + 1];
                    return gr(this, ce, t, e);
                  }),
                  (s.prototype.pickSeries = function(t) {
                    return this.pickBySeries(t);
                  }),
                  (s.prototype.pickLimit = function(t, e) {
                    return this.pickByLimit(t, e);
                  }),
                  (s.prototype.pickBy = function(t) {
                    return gr(this, ae, t);
                  }),
                  (s.prototype.pickBySeries = function(t) {
                    return gr(this, pe, t);
                  }),
                  (s.prototype.pickByLimit = function(t, e) {
                    return gr(this, ve, t, e);
                  }),
                  (s.prototype.omit = function(t) {
                    for (var e = [], i = arguments.length - 1; 0 < i--; ) e[i] = arguments[i + 1];
                    return gr(this, ge, t, e);
                  }),
                  (s.prototype.omitSeries = function(t) {
                    return this.omitBySeries(t);
                  }),
                  (s.prototype.omitLimit = function(t, e) {
                    return this.omitByLimit(t, e);
                  }),
                  (s.prototype.omitBy = function(t) {
                    return gr(this, Re, t);
                  }),
                  (s.prototype.omitBySeries = function(t) {
                    return gr(this, be, t);
                  }),
                  (s.prototype.omitByLimit = function(t, e) {
                    return gr(this, Ee, t, e);
                  }),
                  (s.prototype.reduce = function(t, e) {
                    return gr(this, Ne, t, e);
                  }),
                  (s.prototype.transform = function(t, e) {
                    return gr(this, Te, t, e);
                  }),
                  (s.prototype.transformSeries = function(t, e) {
                    return gr(this, Me, t, e);
                  }),
                  (s.prototype.transformLimit = function(t, e, i) {
                    return gr(this, We, t, e, i);
                  }),
                  (s.prototype.sortBy = function(t) {
                    return gr(this, Ge, t);
                  }),
                  (s.prototype.sortBySeries = function(t) {
                    return gr(this, qe, t);
                  }),
                  (s.prototype.sortByLimit = function(t, e) {
                    return gr(this, Je, t, e);
                  }),
                  (s.prototype.some = function(t) {
                    return gr(this, Ye, t);
                  }),
                  (s.prototype.someSeries = function(t) {
                    return gr(this, ei, t);
                  }),
                  (s.prototype.someLimit = function(t, e) {
                    return gr(this, si, t, e);
                  }),
                  (s.prototype.every = function(t) {
                    return gr(this, ci, t);
                  }),
                  (s.prototype.everySeries = function(t) {
                    return gr(this, ai, t);
                  }),
                  (s.prototype.everyLimit = function(t, e) {
                    return gr(this, pi, t, e);
                  }),
                  (s.prototype.concat = function(t) {
                    return gr(this, vi, t);
                  }),
                  (s.prototype.concatSeries = function(t) {
                    return gr(this, gi, t);
                  }),
                  (s.prototype.concatLimit = function(t, e) {
                    return gr(this, Ri, t, e);
                  }),
                  (s.prototype.groupBy = function(t) {
                    return gr(this, bi, t);
                  }),
                  (s.prototype.groupBySeries = function(t) {
                    return gr(this, Ei, t);
                  }),
                  (s.prototype.groupByLimit = function(t, e) {
                    return gr(this, Ni, t, e);
                  }),
                  (s.prototype.delay = function(t) {
                    return mr(this, new Di(t));
                  }),
                  (s.prototype.timeout = function(t, e) {
                    return dr(this, new Wi(t, e));
                  }),
                  (s.prototype.whilst = function(e, i) {
                    return this.then(function(t) {
                      return Vi(t, e, i);
                    });
                  }),
                  (s.prototype.doWhilst = function(e, i) {
                    return this.then(function(t) {
                      return Ci(t, e, i);
                    });
                  }),
                  (s.prototype.until = function(e, i) {
                    return this.then(function(t) {
                      return Gi(t, e, i);
                    });
                  }),
                  (s.prototype.doUntil = function(e, i) {
                    return this.then(function(t) {
                      return Ki(t, e, i);
                    });
                  }),
                  (s.prototype.thru = function(e) {
                    return this.then(function(t) {
                      return qi(t, e);
                    });
                  }),
                  (s.prototype.tap = function(e) {
                    return this.then(function(t) {
                      return Hi(t, e);
                    });
                  }),
                  (s.prototype.times = function(t) {
                    return gr(this, Zi, t);
                  }),
                  (s.prototype.timesSeries = function(t) {
                    return gr(this, tr, t);
                  }),
                  (s.prototype.timesLimit = function(t, e) {
                    return gr(this, rr, t, e);
                  }),
                  (s.prototype.disposer = function(t) {
                    return new nr(this, t);
                  }),
                  (s.prototype._resolve = function(t) {
                    0 === this._resolved &&
                      ((this._resolved = 1),
                      (this._value = t),
                      void 0 !== this._receiver && this._callResolve());
                  }),
                  (s.prototype._callResolve = function() {
                    var t = this._receiver;
                    if (
                      ((this._receiver = void 0),
                      t instanceof u
                        ? t._callResolve(this._value, this._key)
                        : this._key === a
                          ? t._resolve(this._value)
                          : y(t, this._onFulfilled, this._value),
                      this._receivers)
                    ) {
                      var e = this._value,
                        i = this._key,
                        r = this._receivers;
                      this._receivers = void 0;
                      for (var s = -1, o = r.array; ++s < r.length; ) {
                        var n = o[s],
                          c = n.receiver,
                          l = n.onFulfilled;
                        c instanceof u ? c._callResolve(e, i) : y(c, l, e);
                      }
                    }
                  }),
                  (s.prototype._reject = function(t) {
                    if (0 === this._resolved) {
                      if (((this._resolved = 2), (this._value = t), void 0 === this._receiver))
                        return (this._receiver = _), void o(this);
                      d && ur(this), this._callReject();
                    }
                  }),
                  (s.prototype._callReject = function() {
                    var t = this._receiver;
                    if ((this._receiver = void 0) === t || t === _)
                      return m(this._value), void l.emit('unhandledRejection', this._value);
                    if (
                      t !== a &&
                      (t instanceof u
                        ? t._callReject(this._value)
                        : this._key === a
                          ? t._reject(this._value)
                          : v(t, this._onRejected, this._value),
                      this._receivers)
                    ) {
                      var e = this._value,
                        i = this._receivers;
                      this._receivers = void 0;
                      for (var r = -1, s = i.array; ++r < i.length; ) {
                        var o = s[r],
                          n = o.receiver,
                          c = o.onRejected;
                        n instanceof u ? n._callReject(e) : v(n, c, e);
                      }
                    }
                  }),
                  (s.prototype._addReceiver = function(t, e) {
                    (this._key = e), (this._receiver = t);
                  }),
                  s
                );
              })(n);
            (g.prototype._execute = yr), (Sr.exports = g), (Sr.exports.default = g);
            var s = xr('./all'),
              x = s.all,
              S = s.All,
              R = xr('./allSettled'),
              j = R.allSettled,
              L = R.AllSettled,
              b = xr('./attempt'),
              w = xr('./race'),
              k = w.race,
              E = w.Race,
              A = xr('./props'),
              O = A.props,
              N = A.Props,
              I = xr('./parallel'),
              B = I.parallel,
              T = I.Parallel,
              P = xr('./series'),
              F = P.series,
              M = P.Series,
              z = xr('./parallelLimit'),
              D = z.parallelLimit,
              W = z.ParallelLimit,
              V = xr('./each'),
              C = V.each,
              G = V.Each,
              K = xr('./eachSeries'),
              U = K.eachSeries,
              q = K.EachSeries,
              H = xr('./eachLimit'),
              $ = H.eachLimit,
              J = H.EachLimit,
              Q = xr('./map'),
              Z = Q.map,
              Y = Q.Map,
              X = xr('./mapSeries'),
              tt = X.mapSeries,
              et = X.MapSeries,
              it = xr('./mapLimit'),
              rt = it.mapLimit,
              st = it.MapLimit,
              ot = xr('./mapValues'),
              nt = ot.mapValues,
              ct = ot.MapValues,
              lt = xr('./mapValuesSeries'),
              ut = lt.mapValuesSeries,
              at = lt.MapValuesSeries,
              ht = xr('./mapValuesLimit'),
              _t = ht.mapValuesLimit,
              pt = ht.MapValuesLimit,
              ft = xr('./filter'),
              yt = ft.filter,
              vt = ft.Filter,
              mt = xr('./filterSeries'),
              dt = mt.filterSeries,
              gt = mt.FilterSeries,
              xt = xr('./filterLimit'),
              St = xt.filterLimit,
              Rt = xt.FilterLimit,
              jt = xr('./reject'),
              Lt = jt.reject,
              bt = jt.Reject,
              wt = xr('./rejectSeries'),
              kt = wt.rejectSeries,
              Et = wt.RejectSeries,
              At = xr('./rejectLimit'),
              Ot = At.rejectLimit,
              Nt = At.RejectLimit,
              It = xr('./find'),
              Bt = It.find,
              Tt = It.Find,
              Pt = xr('./findSeries'),
              Ft = Pt.findSeries,
              Mt = Pt.FindSeries,
              zt = xr('./findLimit'),
              Dt = zt.findLimit,
              Wt = zt.FindLimit,
              Vt = xr('./findIndex'),
              Ct = Vt.findIndex,
              Gt = Vt.FindIndex,
              Kt = xr('./findIndexSeries'),
              Ut = Kt.findIndexSeries,
              qt = Kt.FindIndexSeries,
              Ht = xr('./findIndexLimit'),
              $t = Ht.findIndexLimit,
              Jt = Ht.FindIndexLimit,
              Qt = xr('./findKey'),
              Zt = Qt.findKey,
              Yt = Qt.FindKey,
              Xt = xr('./findKeySeries'),
              te = Xt.findKeySeries,
              ee = Xt.FindKeySeries,
              ie = xr('./findKeyLimit'),
              re = ie.findKeyLimit,
              se = ie.FindKeyLimit,
              oe = xr('./pick'),
              ne = oe.pick,
              ce = oe.Pick,
              le = xr('./pickBy'),
              ue = le.pickBy,
              ae = le.PickBy,
              he = xr('./pickBySeries'),
              _e = he.pickBySeries,
              pe = he.PickBySeries,
              fe = xr('./pickByLimit'),
              ye = fe.pickByLimit,
              ve = fe.PickByLimit,
              me = xr('./omit'),
              de = me.omit,
              ge = me.Omit,
              xe = xr('./omitBy'),
              Se = xe.omitBy,
              Re = xe.OmitBy,
              je = xr('./omitBySeries'),
              Le = je.omitBySeries,
              be = je.OmitBySeries,
              we = xr('./omitByLimit'),
              ke = we.omitByLimit,
              Ee = we.OmitByLimit,
              Ae = xr('./reduce'),
              Oe = Ae.reduce,
              Ne = Ae.Reduce,
              Ie = xr('./transform'),
              Be = Ie.transform,
              Te = Ie.Transform,
              Pe = xr('./transformSeries'),
              Fe = Pe.transformSeries,
              Me = Pe.TransformSeries,
              ze = xr('./transformLimit'),
              De = ze.transformLimit,
              We = ze.TransformLimit,
              Ve = xr('./sortBy'),
              Ce = Ve.sortBy,
              Ge = Ve.SortBy,
              Ke = xr('./sortBySeries'),
              Ue = Ke.sortBySeries,
              qe = Ke.SortBySeries,
              He = xr('./sortByLimit'),
              $e = He.sortByLimit,
              Je = He.SortByLimit,
              Qe = xr('./some'),
              Ze = Qe.some,
              Ye = Qe.Some,
              Xe = xr('./someSeries'),
              ti = Xe.someSeries,
              ei = Xe.SomeSeries,
              ii = xr('./someLimit'),
              ri = ii.someLimit,
              si = ii.SomeLimit,
              oi = xr('./every'),
              ni = oi.every,
              ci = oi.Every,
              li = xr('./everySeries'),
              ui = li.everySeries,
              ai = li.EverySeries,
              hi = xr('./everyLimit'),
              _i = hi.everyLimit,
              pi = hi.EveryLimit,
              fi = xr('./concat'),
              yi = fi.concat,
              vi = fi.Concat,
              mi = xr('./concatSeries'),
              di = mi.concatSeries,
              gi = mi.ConcatSeries,
              xi = xr('./concatLimit'),
              Si = xi.concatLimit,
              Ri = xi.ConcatLimit,
              ji = xr('./groupBy'),
              Li = ji.groupBy,
              bi = ji.GroupBy,
              wi = xr('./groupBySeries'),
              ki = wi.groupBySeries,
              Ei = wi.GroupBySeries,
              Ai = xr('./groupByLimit'),
              Oi = Ai.groupByLimit,
              Ni = Ai.GroupByLimit,
              Ii = xr('./join'),
              Bi = Ii.join,
              Ti = Ii.Spread,
              Pi = xr('./promisify'),
              Fi = xr('./promisifyAll'),
              Mi = xr('./delay'),
              zi = Mi.delay,
              Di = Mi.Delay,
              Wi = xr('./timeout'),
              Vi = xr('./whilst').whilst,
              Ci = xr('./doWhilst').doWhilst,
              Gi = xr('./until').until,
              Ki = xr('./doUntil'),
              Ui = xr('./retry'),
              qi = xr('./thru'),
              Hi = xr('./tap'),
              $i = xr('./flow'),
              Ji = xr('./times'),
              Qi = Ji.times,
              Zi = Ji.Times,
              Yi = xr('./timesSeries'),
              Xi = Yi.timesSeries,
              tr = Yi.TimesSeries,
              er = xr('./timesLimit'),
              ir = er.timesLimit,
              rr = er.TimesLimit,
              sr = xr('./using'),
              or = sr.using,
              nr = sr.Disposer,
              cr = xr('./debug'),
              lr = cr.resolveStack,
              ur = cr.reconstructStack,
              ar = xr('./internal/mixin').createProxy;
            (g.VERSION = i),
              ((g.Aigle = g).resolve = fr),
              (g.reject = function(t, e) {
                if (2 === arguments.length && 'function' == typeof e) return Lt(t, e);
                var i = new g(a);
                return i._reject(t), i;
              }),
              (g.all = x),
              (g.allSettled = j),
              (g.race = k),
              (g.props = O),
              (g.series = F),
              (g.parallel = B),
              (g.parallelLimit = D),
              (g.each = C),
              (g.eachSeries = U),
              (g.eachLimit = $),
              (g.forEach = C),
              (g.forEachSeries = U),
              (g.forEachLimit = $),
              (g.map = Z),
              (g.mapSeries = tt),
              (g.mapLimit = rt),
              (g.mapValues = nt),
              (g.mapValuesSeries = ut),
              (g.mapValuesLimit = _t),
              (g.filter = yt),
              (g.filterSeries = dt),
              (g.filterLimit = St),
              (g.rejectSeries = kt),
              (g.rejectLimit = Ot),
              (g.find = Bt),
              (g.findSeries = Ft),
              (g.findLimit = Dt),
              (g.findIndex = Ct),
              (g.findIndexSeries = Ut),
              (g.findIndexLimit = $t),
              (g.findKey = Zt),
              (g.findKeySeries = te),
              (g.findKeyLimit = re),
              (g.detect = Bt),
              (g.detectSeries = Ft),
              (g.detectLimit = Dt),
              (g.pick = ne),
              (g.pickSeries = _e),
              (g.pickLimit = ye),
              (g.pickBy = ue),
              (g.pickBySeries = _e),
              (g.pickByLimit = ye),
              (g.omit = de),
              (g.omitSeries = Le),
              (g.omitLimit = ke),
              (g.omitBy = Se),
              (g.omitBySeries = Le),
              (g.omitByLimit = ke),
              (g.reduce = Oe),
              (g.transform = Be),
              (g.transformSeries = Fe),
              (g.transformLimit = De),
              (g.sortBy = Ce),
              (g.sortBySeries = Ue),
              (g.sortByLimit = $e),
              (g.some = Ze),
              (g.someSeries = ti),
              (g.someLimit = ri),
              (g.every = ni),
              (g.everySeries = ui),
              (g.everyLimit = _i),
              (g.concat = yi),
              (g.concatSeries = di),
              (g.concatLimit = Si),
              (g.groupBy = Li),
              (g.groupBySeries = ki),
              (g.groupByLimit = Oi),
              (g.attempt = b),
              (g.try = b),
              (g.join = Bi),
              (g.promisify = Pi),
              (g.promisifyAll = Fi),
              (g.delay = zi),
              (g.whilst = Vi),
              (g.doWhilst = Ci),
              (g.until = Gi),
              (g.doUntil = Ki),
              (g.retry = Ui),
              (g.thru = qi),
              (g.tap = Hi),
              (g.flow = $i),
              (g.times = Qi),
              (g.timesSeries = Xi),
              (g.timesLimit = ir),
              (g.using = or),
              (g.mixin = function(r, t) {
                void 0 === t && (t = {});
                var o = t.override,
                  n = t.promisify;
                void 0 === n && (n = !0);
                return (
                  Object.getOwnPropertyNames(r).forEach(function(t) {
                    var e = r[t];
                    if ('function' == typeof e && (!g[t] || o)) {
                      if ('chain' === t) {
                        var i = e();
                        if (i && i.__chain__)
                          return (
                            (g.chain = fr),
                            void (g.prototype.value = function() {
                              return this;
                            })
                          );
                      }
                      var s = ar(e, n);
                      (g[t] = function(t, e, i, r) {
                        return new s(t, e, i, r)._execute();
                      }),
                        (g.prototype[t] = function(t, e, i) {
                          return gr(this, s, t, e, i);
                        });
                    }
                  }),
                  g
                );
              }),
              (g.config = function(t) {
                void 0 !== (t = t || {}).longStackTraces && (d = !!t.longStackTraces);
                void 0 !== t.cancellation && (g.prototype._execute = t.cancellation ? vr : yr);
              }),
              (g.longStackTraces = function() {
                d = !0;
              });
            var hr = xr('./error'),
              _r = hr.CancellationError,
              pr = hr.TimeoutError;
            function fr(t) {
              if (t instanceof n) return t;
              var e = new g(a);
              return r(e, t), e;
            }
            function yr(e) {
              var i = this;
              d && lr(this);
              try {
                e(
                  function(t) {
                    void 0 !== e && ((e = void 0), r(i, t));
                  },
                  function(t) {
                    void 0 !== e && ((e = void 0), i._reject(t));
                  }
                );
              } catch (t) {
                if (void 0 === e) return;
                (e = void 0), this._reject(t);
              }
            }
            function vr(e) {
              var i = this;
              d && lr(this);
              try {
                e(
                  function(t) {
                    void 0 !== e &&
                      (t instanceof g && 0 === t._resolved && (i._parent = t),
                      (e = void 0),
                      r(i, t));
                  },
                  function(t) {
                    void 0 !== e && ((e = void 0), i._reject(t));
                  },
                  function(t) {
                    if ('function' != typeof t) throw new TypeError('onCancel must be function');
                    0 === i._resolved &&
                      (void 0 === i._onCancelQueue && (i._onCancelQueue = new c()),
                      i._onCancelQueue.push(t));
                  }
                );
              } catch (t) {
                if (void 0 === e) return;
                (e = void 0), this._reject(t);
              }
            }
            function mr(t, e, i, r) {
              return (
                d && lr(e),
                void 0 === t._receiver || t._receiver === a
                  ? (0 !== t._resolved && o(t),
                    (t._receiver = e),
                    (t._onFulfilled = i),
                    (t._onRejected = r))
                  : t._receiver === _
                    ? ((t._receiver = e), (t._onFulfilled = i), (t._onRejected = r))
                    : (t._receivers || (t._receivers = new c()),
                      t._receivers.push({ receiver: e, onFulfilled: i, onRejected: r })),
                e
              );
            }
            function dr(t, e) {
              return d && lr(e), 0 !== t._resolved && o(t), (t._receiver = e)._promise;
            }
            function gr(t, e, i, r, s) {
              if (d) {
                d = !1;
                var o = gr(t, e, i, r, s);
                return (d = !0), lr(o), o;
              }
              switch (t._resolved) {
                case 0:
                  var n = new e(h, i, r, s);
                  return (
                    void 0 === t._receiver
                      ? (t._receiver = n)
                      : (t._receivers || (t._receivers = new c()),
                        t._receivers.push({ receiver: n })),
                    n._promise
                  );
                case 1:
                  return new e(t._value, i, r, s)._execute();
                case 2:
                  return g.reject(t._value);
              }
            }
            (g.CancellationError = _r), (g.TimeoutError = pr);
          }.call(this, xr('_process')));
        },
        {
          './all': 3,
          './allSettled': 4,
          './attempt': 5,
          './concat': 6,
          './concatLimit': 7,
          './concatSeries': 8,
          './debug': 9,
          './delay': 10,
          './doUntil': 11,
          './doWhilst': 12,
          './each': 13,
          './eachLimit': 14,
          './eachSeries': 15,
          './error': 16,
          './every': 17,
          './everyLimit': 18,
          './everySeries': 19,
          './filter': 20,
          './filterLimit': 21,
          './filterSeries': 22,
          './find': 23,
          './findIndex': 24,
          './findIndexLimit': 25,
          './findIndexSeries': 26,
          './findKey': 27,
          './findKeyLimit': 28,
          './findKeySeries': 29,
          './findLimit': 30,
          './findSeries': 31,
          './flow': 32,
          './groupBy': 33,
          './groupByLimit': 34,
          './groupBySeries': 35,
          './internal/async': 36,
          './internal/mixin': 38,
          './internal/queue': 39,
          './internal/util': 40,
          './join': 41,
          './map': 42,
          './mapLimit': 43,
          './mapSeries': 44,
          './mapValues': 45,
          './mapValuesLimit': 46,
          './mapValuesSeries': 47,
          './omit': 48,
          './omitBy': 49,
          './omitByLimit': 50,
          './omitBySeries': 51,
          './parallel': 52,
          './parallelLimit': 53,
          './pick': 54,
          './pickBy': 55,
          './pickByLimit': 56,
          './pickBySeries': 57,
          './promisify': 58,
          './promisifyAll': 59,
          './props': 60,
          './race': 61,
          './reduce': 62,
          './reject': 63,
          './rejectLimit': 64,
          './rejectSeries': 65,
          './retry': 66,
          './series': 67,
          './some': 68,
          './someLimit': 69,
          './someSeries': 70,
          './sortBy': 71,
          './sortByLimit': 72,
          './sortBySeries': 73,
          './tap': 74,
          './thru': 75,
          './timeout': 76,
          './times': 77,
          './timesLimit': 78,
          './timesSeries': 79,
          './transform': 80,
          './transformLimit': 81,
          './transformSeries': 82,
          './until': 83,
          './using': 84,
          './whilst': 85,
          _process: 87,
          'aigle-core': 86
        }
      ],
      3: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.iteratorSymbol,
            u = o.promiseArrayEach,
            a = o.promiseSetEach,
            h = t('./props').callResolve,
            _ = (function(e) {
              function t(t) {
                e.call(this),
                  (this._promise = new s(n)),
                  (this._rest = void 0),
                  (this._result = void 0),
                  t === c
                    ? (this._callResolve = this._set)
                    : ((this._callResolve = void 0), this._set(t));
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(
                  e && e.prototype
                )).constructor = t).prototype._set = function(t) {
                  if (Array.isArray(t)) {
                    var e = t.length;
                    (this._rest = e),
                      (this._result = Array(e)),
                      (this._callResolve = h),
                      u(this, e, t);
                  } else if (t[l]) {
                    var i = t.size;
                    (this._rest = i),
                      (this._result = Array(i)),
                      (this._callResolve = h),
                      a(this, 1 / 0, t);
                  } else (this._rest = 0), (this._result = []);
                  return 0 === this._rest && this._promise._resolve(this._result), this;
                }),
                (t.prototype._execute = function() {
                  return this._promise;
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          e.exports = {
            all: function(t) {
              return new _(t)._promise;
            },
            All: _
          };
        },
        { './aigle': 2, './internal/util': 40, './props': 60, 'aigle-core': 86 }
      ],
      4: [
        function(t, e, i) {
          'use strict';
          var r = (function(e) {
            function t() {
              e.apply(this, arguments);
            }
            return (
              e && (t.__proto__ = e),
              (((t.prototype = Object.create(
                e && e.prototype
              )).constructor = t).prototype._set = function(t) {
                (this._errorSet = new Set()),
                  (this._promise._resolve = (function(t) {
                    var i = t._errorSet,
                      e = t._promise,
                      s = e._resolve;
                    return function(r) {
                      if (Array.isArray(r)) r = r.map(o);
                      else if (r instanceof Map) {
                        var t = r;
                        (r = t).forEach(function(t, e) {
                          return r.set(e, o(t, e));
                        });
                      } else
                        Object.entries(r).forEach(function(t) {
                          var e = t[0],
                            i = t[1];
                          return (r[e] = o(i, e));
                        });
                      s.call(e, r);
                    };
                    function o(t, e) {
                      return i.has(e)
                        ? { state: 'rejected', reason: t }
                        : { state: 'fulfilled', value: t };
                    }
                  })(this)),
                  e.prototype._set.call(this, t);
              }),
              (t.prototype._callReject = function(t, e) {
                return this._errorSet.add(e), this._callResolve(t, e), !0;
              }),
              t
            );
          })(t('./parallel').Parallel);
          e.exports = {
            allSettled: function(t) {
              return new r(t)._promise;
            },
            AllSettled: r
          };
        },
        { './parallel': 52 }
      ],
      5: [
        function(t, e, i) {
          'use strict';
          var r = t('./aigle'),
            s = t('./internal/util'),
            o = s.INTERNAL,
            n = s.callResolve;
          e.exports = function(t) {
            var e = new r(o);
            return n(e, t), e;
          };
        },
        { './aigle': 2, './internal/util': 40 }
      ],
      6: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/util').concatArray,
            o = t('./internal/collection').setParallel,
            n = (function(i) {
              function t(t, e) {
                i.call(this, t, e, c);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._callResolve = function(t, e) {
                  (this._result[e] = t),
                    0 == --this._rest && this._promise._resolve(s(this._result));
                }),
                t
              );
            })(r);
          function c(t) {
            return o.call(this, t), (this._result = Array(this._rest)), this;
          }
          e.exports = {
            concat: function(t, e) {
              return new n(t, e)._execute();
            },
            Concat: n
          };
        },
        { './each': 13, './internal/collection': 37, './internal/util': 40 }
      ],
      7: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/util').concatArray,
            o = t('./internal/collection').setLimit,
            n = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, c);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(
                  r && r.prototype
                )).constructor = t).prototype._callResolve = function(t, e) {
                  (this._result[e] = t),
                    0 == --this._rest
                      ? this._promise._resolve(s(this._result))
                      : 0 < this._callRest-- && this._iterate();
                }),
                t
              );
            })(r);
          function c(t) {
            return o.call(this, t), (this._result = Array(this._rest)), this;
          }
          e.exports = {
            concatLimit: function(t, e, i) {
              return new n(t, e, i)._execute();
            },
            ConcatLimit: n
          };
        },
        { './eachLimit': 14, './internal/collection': 37, './internal/util': 40 }
      ],
      8: [
        function(t, e, i) {
          'use strict';
          var r = (function(i) {
            function t(t, e) {
              i.call(this, t, e), (this._result = []);
            }
            return (
              i && (t.__proto__ = i),
              (((t.prototype = Object.create(
                i && i.prototype
              )).constructor = t).prototype._callResolve = function(t) {
                var e;
                Array.isArray(t)
                  ? (e = this._result).push.apply(e, t)
                  : void 0 !== t && this._result.push(t),
                  0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
              }),
              t
            );
          })(t('./eachSeries').EachSeries);
          e.exports = {
            concatSeries: function(t, e) {
              return new r(t, e)._execute();
            },
            ConcatSeries: r
          };
        },
        { './eachSeries': 15 }
      ],
      9: [
        function(t, e, i) {
          'use strict';
          function s(t) {
            for (var e = [], i = t.split('\n'), r = 0; r < i.length; r++) {
              var s = i[r];
              /node_modules/.test(s) || e.push(s);
            }
            return e;
          }
          e.exports = {
            resolveStack: function(t) {
              Error.captureStackTrace(t);
            },
            reconstructStack: function(t) {
              var e = t.stack,
                i = t._value;
              if (i instanceof Error == !1 || !e) return;
              i._reconstruct || ((i.stack = s(i.stack).join('\n')), (i._reconstruct = !0));
              var r = s(e);
              (r[0] = '\nFrom previous event:'), (i.stack += r.join('\n'));
            }
          };
        },
        {}
      ],
      10: [
        function(t, e, i) {
          'use strict';
          var r = t('./aigle'),
            s = t('./internal/util').INTERNAL,
            o = (function(i) {
              function t(t) {
                i.call(this, s), (this._ms = t), (this._timer = void 0);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._resolve = function(t) {
                  var e = this;
                  return (
                    (this._timer = setTimeout(function() {
                      return i.prototype._resolve.call(e, t);
                    }, this._ms)),
                    this
                  );
                }),
                (t.prototype._reject = function(t) {
                  clearTimeout(this._timer), i.prototype._reject.call(this, t);
                }),
                t
              );
            })(r);
          e.exports = {
            delay: function(t, e) {
              return new o(t)._resolve(e);
            },
            Delay: o
          };
        },
        { './aigle': 2, './internal/util': 40 }
      ],
      11: [
        function(t, e, i) {
          'use strict';
          var r = t('./doWhilst').DoWhilst,
            s = t('./until').UntilTester;
          e.exports = function(t, e, i) {
            'function' != typeof i && ((i = e), (e = t), (t = void 0));
            return new r(new s(i), e)._iterate(t);
          };
        },
        { './doWhilst': 12, './until': 83 }
      ],
      12: [
        function(t, e, i) {
          'use strict';
          var r = t('./whilst'),
            s = r.AigleWhilst,
            o = r.WhilstTester,
            n = (function(i) {
              function t(t, e) {
                i.call(this, t, e);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._iterate = function(t) {
                  return this._next(t), this._promise;
                }),
                t
              );
            })(s);
          e.exports = {
            doWhilst: function(t, e, i) {
              'function' != typeof i && ((i = e), (e = t), (t = void 0));
              return new n(new o(i), e)._iterate(t);
            },
            DoWhilst: n
          };
        },
        { './whilst': 85 }
      ],
      13: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = t('./internal/collection'),
            u = l.execute,
            a = l.setParallel,
            h = (function(r) {
              function t(t, e, i) {
                void 0 === i && (i = _),
                  r.call(this),
                  (this._iterator = e),
                  (this._promise = new s(n)),
                  (this._coll = void 0),
                  (this._size = void 0),
                  (this._rest = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  (this._iterate = void 0),
                  t === c
                    ? ((this._set = i),
                      (this._iterate = this._callResolve),
                      (this._callResolve = u))
                    : i.call(this, t);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(
                  r && r.prototype
                )).constructor = t).prototype._execute = function() {
                  return (
                    0 === this._rest ? this._promise._resolve(this._result) : this._iterate(),
                    this._promise
                  );
                }),
                (t.prototype._callResolve = function(t) {
                  (0 != --this._rest && !1 !== t) || this._promise._resolve(this._result);
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function _(t) {
            return a.call(this, t), (this._result = t), this;
          }
          e.exports = {
            each: function(t, e) {
              return new h(t, e)._execute();
            },
            Each: h
          };
        },
        { './aigle': 2, './internal/collection': 37, './internal/util': 40, 'aigle-core': 86 }
      ],
      14: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            o = t('./aigle'),
            s = t('./internal/util'),
            n = s.DEFAULT_LIMIT,
            c = s.INTERNAL,
            l = s.PENDING,
            u = t('./internal/collection'),
            a = u.execute,
            h = u.setLimit,
            _ = (function(s) {
              function t(t, e, i, r) {
                void 0 === r && (r = p),
                  s.call(this),
                  'function' == typeof e && ((i = e), (e = n)),
                  (this._iterator = i),
                  (this._promise = new o(c)),
                  (this._index = 0),
                  (this._limit = e),
                  (this._coll = void 0),
                  (this._rest = void 0),
                  (this._size = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  (this._iterate = void 0),
                  (this._callRest = void 0),
                  t === l
                    ? ((this._set = r),
                      (this._iterate = this._callResolve),
                      (this._callResolve = a))
                    : r.call(this, t);
              }
              return (
                s && (t.__proto__ = s),
                (((t.prototype = Object.create(
                  s && s.prototype
                )).constructor = t).prototype._execute = function() {
                  if (0 === this._rest) this._promise._resolve(this._result);
                  else for (; this._limit--; ) this._iterate();
                  return this._promise;
                }),
                (t.prototype._callResolve = function(t) {
                  !1 === t
                    ? ((this._callRest = 0), this._promise._resolve(this._result))
                    : 0 == --this._rest
                      ? this._promise._resolve(this._result)
                      : 0 < this._callRest-- && this._iterate();
                }),
                (t.prototype._callReject = function(t) {
                  (this._callRest = 0), this._promise._reject(t);
                }),
                t
              );
            })(r);
          function p(t) {
            return h.call(this, t), (this._result = t), this;
          }
          e.exports = {
            eachLimit: function(t, e, i) {
              return new _(t, e, i)._execute();
            },
            EachLimit: _
          };
        },
        { './aigle': 2, './internal/collection': 37, './internal/util': 40, 'aigle-core': 86 }
      ],
      15: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = t('./internal/collection'),
            u = l.execute,
            a = l.setSeries,
            h = (function(r) {
              function t(t, e, i) {
                void 0 === i && (i = _),
                  r.call(this),
                  (this._iterator = e),
                  (this._promise = new s(n)),
                  (this._index = 0),
                  (this._coll = void 0),
                  (this._rest = void 0),
                  (this._size = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  (this._iterate = void 0),
                  t === c
                    ? ((this._set = i),
                      (this._iterate = this._callResolve),
                      (this._callResolve = u))
                    : i.call(this, t);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(
                  r && r.prototype
                )).constructor = t).prototype._execute = function() {
                  return (
                    0 === this._rest ? this._promise._resolve(this._result) : this._iterate(),
                    this._promise
                  );
                }),
                (t.prototype._callResolve = function(t) {
                  0 == --this._rest || !1 === t
                    ? this._promise._resolve(this._result)
                    : this._iterate();
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function _(t) {
            return a.call(this, t), (this._result = t), this;
          }
          e.exports = {
            eachSeries: function(t, e) {
              return new h(t, e)._execute();
            },
            EachSeries: h
          };
        },
        { './aigle': 2, './internal/collection': 37, './internal/util': 40, 'aigle-core': 86 }
      ],
      16: [
        function(t, e, i) {
          'use strict';
          for (var r = ['CancellationError', 'TimeoutError'], s = r.length; s--; ) {
            var o = r[s],
              n = (function(t) {
                function e() {
                  t.apply(this, arguments);
                }
                return (
                  t && (e.__proto__ = t),
                  ((e.prototype = Object.create(t && t.prototype)).constructor = e)
                );
              })(Error);
            i[(n.prototype.name = o)] = n;
          }
        },
        {}
      ],
      17: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/util').PENDING,
            o = t('./internal/collection').setShorthand,
            n = (function(i) {
              function t(t, e) {
                i.call(this, t, e),
                  (this._result = !0),
                  t === s ? (this._set = o) : o.call(this, t);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._callResolve = function(t) {
                  t ? 0 == --this._rest && this._promise._resolve(!0) : this._promise._resolve(!1);
                }),
                t
              );
            })(r);
          e.exports = {
            every: function(t, e) {
              return new n(t, e)._execute();
            },
            Every: n
          };
        },
        { './each': 13, './internal/collection': 37, './internal/util': 40 }
      ],
      18: [
        function(t, e, i) {
          'use strict';
          var r = (function(r) {
            function t(t, e, i) {
              r.call(this, t, e, i), (this._result = !0);
            }
            return (
              r && (t.__proto__ = r),
              (((t.prototype = Object.create(
                r && r.prototype
              )).constructor = t).prototype._callResolve = function(t) {
                t
                  ? 0 == --this._rest
                    ? this._promise._resolve(!0)
                    : 0 < this._callRest-- && this._iterate()
                  : this._promise._resolve(!1);
              }),
              t
            );
          })(t('./eachLimit').EachLimit);
          e.exports = {
            everyLimit: function(t, e, i) {
              return new r(t, e, i)._execute();
            },
            EveryLimit: r
          };
        },
        { './eachLimit': 14 }
      ],
      19: [
        function(t, e, i) {
          'use strict';
          var r = (function(i) {
            function t(t, e) {
              i.call(this, t, e), (this._result = !0);
            }
            return (
              i && (t.__proto__ = i),
              (((t.prototype = Object.create(
                i && i.prototype
              )).constructor = t).prototype._callResolve = function(t) {
                t
                  ? 0 == --this._rest
                    ? this._promise._resolve(!0)
                    : this._iterate()
                  : this._promise._resolve(!1);
              }),
              t
            );
          })(t('./eachSeries.js').EachSeries);
          e.exports = {
            everySeries: function(t, e) {
              return new r(t, e)._execute();
            },
            EverySeries: r
          };
        },
        { './eachSeries.js': 15 }
      ],
      20: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(i) {
              function t(t, e) {
                i.call(this, t, e, u);
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t ? this._coll[e] : n),
              0 == --this._rest && this._promise._resolve(c(this._result));
          }
          function h(t, e) {
            (this._result[e] = t ? this._coll[this._keys[e]] : n),
              0 == --this._rest && this._promise._resolve(c(this._result));
          }
          (l.prototype._set = u),
            (e.exports = {
              filter: function(t, e) {
                return new l(t, e)._execute();
              },
              Filter: l
            });
        },
        { './each': 13, './internal/collection': 37, './internal/util': 40 }
      ],
      21: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, u);
              }
              return (
                r && (t.__proto__ = r),
                ((t.prototype = Object.create(r && r.prototype)).constructor = t)
              );
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t ? this._coll[e] : n),
              0 == --this._rest
                ? this._promise._resolve(c(this._result))
                : 0 < this._callRest-- && this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t ? this._coll[this._keys[e]] : n),
              0 == --this._rest
                ? this._promise._resolve(c(this._result))
                : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            filterLimit: function(t, e, i) {
              return new l(t, e, i)._execute();
            },
            FilterLimit: l
          };
        },
        { './eachLimit': 14, './internal/collection': 37, './internal/util': 40 }
      ],
      22: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(i) {
              function t(t, e) {
                i.call(this, t, e, u);
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t ? this._coll[e] : n),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t ? this._coll[this._keys[e]] : n),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : this._iterate();
          }
          e.exports = {
            filterSeries: function(t, e) {
              return new l(t, e)._execute();
            },
            FilterSeries: l
          };
        },
        { './eachSeries': 15, './internal/collection': 37, './internal/util': 40 }
      ],
      23: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n);
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t
              ? ((this._size = 0), this._promise._resolve(this._coll[e]))
              : 0 == --this._rest && this._promise._resolve();
          }
          function l(t, e) {
            t
              ? ((this._size = 0), this._promise._resolve(this._coll[this._keys[e]]))
              : 0 == --this._rest && this._promise._resolve();
          }
          e.exports = {
            find: function(t, e) {
              return new o(t, e)._execute();
            },
            Find: o
          };
        },
        { './each': 13, './internal/collection': 37 }
      ],
      24: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = -1);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._callResolve = function(t, e) {
                  t
                    ? ((this._size = 0), this._promise._resolve(e))
                    : 0 == --this._rest && this._promise._resolve(-1);
                }),
                t
              );
            })(r);
          function n(t) {
            return s.call(this, t), void 0 !== this._keys && (this._rest = 0), this;
          }
          e.exports = {
            findIndex: function(t, e) {
              return new o(t, e)._execute();
            },
            FindIndex: o
          };
        },
        { './each': 13, './internal/collection': 37 }
      ],
      25: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n), (this._result = -1);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(
                  r && r.prototype
                )).constructor = t).prototype._callResolve = function(t, e) {
                  t
                    ? ((this._callRest = 0), this._promise._resolve(e))
                    : 0 == --this._rest
                      ? this._promise._resolve(-1)
                      : 0 < this._callRest-- && this._iterate();
                }),
                t
              );
            })(r);
          function n(t) {
            return s.call(this, t), void 0 !== this._keys && (this._rest = 0), this;
          }
          e.exports = {
            findIndexLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            FindIndexLimit: o
          };
        },
        { './eachLimit': 14, './internal/collection': 37 }
      ],
      26: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = -1);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._callResolve = function(t, e) {
                  t
                    ? this._promise._resolve(e)
                    : 0 == --this._rest
                      ? this._promise._resolve(-1)
                      : this._iterate();
                }),
                t
              );
            })(r);
          function n(t) {
            return s.call(this, t), void 0 !== this._keys && (this._rest = 0), this;
          }
          e.exports = {
            findIndexSeries: function(t, e) {
              return new o(t, e)._execute();
            },
            FindIndexSeries: o
          };
        },
        { './eachSeries': 15, './internal/collection': 37 }
      ],
      27: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n);
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t
              ? ((this._size = 0), this._promise._resolve('' + e))
              : 0 == --this._rest && this._promise._resolve();
          }
          function l(t, e) {
            t
              ? ((this._size = 0), this._promise._resolve(this._keys[e]))
              : 0 == --this._rest && this._promise._resolve();
          }
          e.exports = {
            findKey: function(t, e) {
              return new o(t, e)._execute();
            },
            FindKey: o
          };
        },
        { './each': 13, './internal/collection': 37 }
      ],
      28: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n);
              }
              return (
                r && (t.__proto__ = r),
                ((t.prototype = Object.create(r && r.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t
              ? ((this._callRest = 0), this._promise._resolve('' + e))
              : 0 == --this._rest
                ? this._promise._resolve()
                : 0 < this._callRest-- && this._iterate();
          }
          function l(t, e) {
            t
              ? ((this._callRest = 0), this._promise._resolve(this._keys[e]))
              : 0 == --this._rest
                ? this._promise._resolve()
                : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            findKeyLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            FindKeyLimit: o
          };
        },
        { './eachLimit': 14, './internal/collection': 37 }
      ],
      29: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n);
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t
              ? this._promise._resolve('' + e)
              : 0 == --this._rest
                ? this._promise._resolve()
                : this._iterate();
          }
          function l(t, e) {
            t
              ? this._promise._resolve(this._keys[e])
              : 0 == --this._rest
                ? this._promise._resolve()
                : this._iterate();
          }
          e.exports = {
            findKeySeries: function(t, e) {
              return new o(t, e)._execute();
            },
            FindKeySeries: o
          };
        },
        { './eachSeries': 15, './internal/collection': 37 }
      ],
      30: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n);
              }
              return (
                r && (t.__proto__ = r),
                ((t.prototype = Object.create(r && r.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t
              ? ((this._callRest = 0), this._promise._resolve(this._coll[e]))
              : 0 == --this._rest
                ? this._promise._resolve()
                : 0 < this._callRest-- && this._iterate();
          }
          function l(t, e) {
            t
              ? ((this._callRest = 0), this._promise._resolve(this._coll[this._keys[e]]))
              : 0 == --this._rest
                ? this._promise._resolve()
                : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            findLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            FindLimit: o
          };
        },
        { './eachLimit': 14, './internal/collection': 37 }
      ],
      31: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n);
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t
              ? this._promise._resolve(this._coll[e])
              : 0 == --this._rest
                ? this._promise._resolve()
                : this._iterate();
          }
          function l(t, e) {
            t
              ? this._promise._resolve(this._coll[this._keys[e]])
              : 0 == --this._rest
                ? this._promise._resolve()
                : this._iterate();
          }
          e.exports = {
            findSeries: function(t, e) {
              return new o(t, e)._execute();
            },
            FindSeries: o
          };
        },
        { './eachSeries': 15, './internal/collection': 37 }
      ],
      32: [
        function(t, e, i) {
          'use strict';
          var o = t('./aigle');
          function n(t) {
            return t;
          }
          e.exports = function() {
            var t = [],
              e = arguments.length;
            for (; e--; ) t[e] = arguments[e];
            var i = (function(t) {
                var e = t.length,
                  i = [],
                  r = -1;
                for (; ++r < e; ) {
                  var s = t[r];
                  Array.isArray(s) ? i.push.apply(i, s) : i.push(s);
                }
                return i;
              })(t),
              r = i[0];
            void 0 === r && (r = n);
            var s = i.slice(1);
            return function() {
              for (var t = [], e = arguments.length; e--; ) t[e] = arguments[e];
              return o.resolve(r.apply(void 0, t)).then(function(t) {
                return o.reduce(
                  s,
                  function(t, e) {
                    return e(t);
                  },
                  t
                );
              });
            };
          };
        },
        { './aigle': 2 }
      ],
      33: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            this._result[t]
              ? this._result[t].push(this._coll[e])
              : (this._result[t] = [this._coll[e]]),
              0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            this._result[t]
              ? this._result[t].push(this._coll[this._keys[e]])
              : (this._result[t] = [this._coll[this._keys[e]]]),
              0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            groupBy: function(t, e) {
              return new o(t, e)._execute();
            },
            GroupBy: o
          };
        },
        { './each': 13, './internal/collection': 37 }
      ],
      34: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n), (this._result = {});
              }
              return (
                r && (t.__proto__ = r),
                ((t.prototype = Object.create(r && r.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            this._result[t]
              ? this._result[t].push(this._coll[e])
              : (this._result[t] = [this._coll[e]]),
              0 == --this._rest
                ? this._promise._resolve(this._result)
                : 0 < this._callRest-- && this._iterate();
          }
          function l(t, e) {
            this._result[t]
              ? this._result[t].push(this._coll[this._keys[e]])
              : (this._result[t] = [this._coll[this._keys[e]]]),
              0 == --this._rest
                ? this._promise._resolve(this._result)
                : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            groupByLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            GroupByLimit: o
          };
        },
        { './eachLimit': 14, './internal/collection': 37 }
      ],
      35: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            this._result[t]
              ? this._result[t].push(this._coll[e])
              : (this._result[t] = [this._coll[e]]),
              0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          function l(t, e) {
            this._result[t]
              ? this._result[t].push(this._coll[this._keys[e]])
              : (this._result[t] = [this._coll[this._keys[e]]]),
              0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          e.exports = {
            groupBySeries: function(t, e) {
              return new o(t, e)._execute();
            },
            GroupBySeries: o
          };
        },
        { './eachSeries': 15, './internal/collection': 37 }
      ],
      36: [
        function(t, e, i) {
          'use strict';
          var r = Array(8),
            s = 0,
            o = !1;
          function n() {
            for (var t = -1; ++t < s; ) {
              var e = r[t];
              switch (((r[t] = void 0), e._resolved)) {
                case 1:
                  e._callResolve();
                  break;
                case 2:
                  e._callReject();
              }
            }
            (s = 0), (o = !1);
          }
          e.exports = function(t) {
            !1 === o && (setImmediate(n), (o = !0)), (r[s++] = t);
          };
        },
        {}
      ],
      37: [
        function(t, e, i) {
          'use strict';
          var r = t('./util'),
            l = r.call3,
            u = r.callProxyReciever,
            s = [
              [d, g],
              [d, x],
              [
                function() {
                  var t = this._coll,
                    e = this._index++;
                  u(l(this._iterator, t[e], e, t), this, e);
                },
                function() {
                  var t = this._coll,
                    e = this._index++,
                    i = this._keys[e];
                  u(l(this._iterator, t[i], i, t), this, e);
                }
              ]
            ].map(function(t) {
              var i = t[0],
                r = t[1];
              return function(t) {
                if (Array.isArray(t))
                  (this._coll = t), (this._size = t.length), (this._iterate = i);
                else if (t && 'object' == typeof t) {
                  var e = Object.keys(t);
                  (this._coll = t), (this._size = e.length), (this._keys = e), (this._iterate = r);
                } else this._size = 0;
                return (this._rest = this._size), this;
              };
            }),
            o = s[0],
            n = s[1],
            c = s[2],
            a = [
              d,
              function() {
                var t = this._iterator,
                  e = this._coll,
                  i = -1;
                for (; ++i < this._size; ) {
                  var r = e[i];
                  r ? this._callResolve(r[t], i) : this._callResolve(void 0, i);
                }
              },
              function() {
                var t = this._iterator,
                  e = this._coll,
                  i = Object.keys(t),
                  r = -1;
                t: for (; ++r < this._size; ) {
                  var s = e[r];
                  if (s) {
                    for (var o = i.length; o--; ) {
                      var n = i[o];
                      if (s[n] !== t[n]) {
                        this._callResolve(!1, r);
                        continue t;
                      }
                    }
                    this._callResolve(!0, r);
                  } else this._callResolve(void 0, r);
                }
              },
              function() {
                var t = this._coll,
                  e = this._iterator,
                  i = e[0],
                  r = e[1],
                  s = -1;
                for (; ++s < this._size; ) {
                  var o = t[s];
                  o ? this._callResolve(o[i] === r, s) : this._callResolve(void 0, s);
                }
              }
            ],
            h = [
              g,
              function() {
                var t = this._iterator,
                  e = this._coll,
                  i = this._keys,
                  r = -1;
                for (; ++r < this._size; ) {
                  var s = e[i[r]];
                  s ? this._callResolve(s[t], r) : this._callResolve(void 0, r);
                }
              },
              function() {
                var t = this._iterator,
                  e = this._coll,
                  i = this._keys,
                  r = Object.keys(t),
                  s = -1;
                t: for (; ++s < this._size; ) {
                  var o = e[i[s]];
                  if (o) {
                    for (var n = r.length; n--; ) {
                      var c = r[n];
                      if (o[c] !== t[c]) {
                        this._callResolve(!1, s);
                        continue t;
                      }
                    }
                    this._callResolve(!0, s);
                  } else this._callResolve(void 0, s);
                }
              },
              function() {
                var t = this._coll,
                  e = this._keys,
                  i = this._iterator,
                  r = i[0],
                  s = i[1],
                  o = -1;
                for (; ++o < this._size; ) {
                  var n = t[e[o]];
                  n ? this._callResolve(n[r] === s, o) : this._callResolve(void 0, o);
                }
              }
            ],
            _ = [
              [a, h],
              [a, [x].concat(h.slice(1))],
              [a.slice(0, 3).concat([S]), h.slice(0, 3).concat([S])],
              [a.slice(0, 3).concat([R]), h.slice(0, 3).concat([R])]
            ].map(function(t) {
              var e = t.map(m),
                i = e[0],
                r = e[1];
              return function(t) {
                if (Array.isArray(t))
                  (this._coll = t), (this._size = t.length), (this._iterate = i(this._iterator));
                else if (t && 'object' == typeof t) {
                  var e = Object.keys(t);
                  (this._coll = t),
                    (this._size = e.length),
                    (this._keys = e),
                    (this._iterate = r(this._iterator));
                } else this._size = 0;
                return (this._rest = this._size), this;
              };
            }),
            p = _[0],
            f = _[1],
            y = _[2],
            v = _[3];
          function m(t) {
            var e = t[0],
              i = t[1],
              r = t[2],
              s = t[3];
            return function(t) {
              switch (typeof t) {
                case 'function':
                  return e;
                case 'string':
                  return i;
                case 'object':
                  return Array.isArray(t) ? s : r;
              }
            };
          }
          function d() {
            for (
              var t = this._rest, e = this._iterator, i = this._coll, r = -1;
              ++r < t && u(l(e, i[r], r, i), this, r);

            );
          }
          function g() {
            for (
              var t = this._rest, e = this._iterator, i = this._coll, r = this._keys, s = -1;
              ++s < t;

            ) {
              var o = r[s];
              if (!1 === u(l(e, i[o], o, i), this, s)) break;
            }
          }
          function x() {
            for (
              var t = this,
                e = t._rest,
                i = t._iterator,
                r = t._coll,
                s = t._keys,
                o = t._result,
                n = -1;
              ++n < e;

            ) {
              var c = s[n];
              if (((o[c] = void 0), !1 === u(l(i, r[c], c, r), this, n))) break;
            }
          }
          function S() {
            var s = this._coll,
              o = this._result;
            !(function t(e) {
              var i = -1;
              for (; ++i < e.length; ) {
                var r = e[i];
                Array.isArray(r) ? t(r) : s.hasOwnProperty(r) && (o[r] = s[r]);
              }
            })(this._iterator),
              this._promise._resolve(o);
          }
          function R() {
            var e = this._coll,
              i = this._result,
              s = {};
            !(function t(e) {
              var i = -1;
              for (; ++i < e.length; ) {
                var r = e[i];
                Array.isArray(r) ? t(r) : (s[r] = !0);
              }
            })(this._iterator),
              Object.keys(e).forEach(function(t) {
                !1 === s.hasOwnProperty(t) && (i[t] = e[t]);
              }),
              this._promise._resolve(i);
          }
          e.exports = {
            execute: function(t) {
              (this._callResolve = this._iterate), this._set(t), this._execute();
            },
            setParallel: o,
            setParallelWithOrder: n,
            setShorthand: p,
            setShorthandWithOrder: f,
            setPickShorthand: y,
            setOmitShorthand: v,
            setSeries: c,
            setLimit: function(t) {
              c.call(this, t);
              var e = this._limit,
                i = this._size;
              return (this._limit = e < i ? e : i), (this._callRest = i - this._limit), this;
            }
          };
        },
        { './util': 40 }
      ],
      38: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('../aigle'),
            o = t('../map').map,
            n = t('../mapValues').mapValues,
            c = t('./util'),
            l = c.INTERNAL,
            u = c.PENDING,
            a = c.apply,
            h = c.callProxyReciever;
          e.exports = {
            createProxy: function(r, t) {
              var s = t ? f : p;
              return (function(i) {
                function t() {
                  for (var t = [], e = arguments.length; e--; ) t[e] = arguments[e];
                  i.call(this, r, s, t);
                }
                return (
                  i && (t.__proto__ = i),
                  ((t.prototype = Object.create(i && i.prototype)).constructor = t)
                );
              })(_);
            }
          };
          var _ = (function(r) {
            function t(t, e, i) {
              r.call(this),
                (this._promise = new s(l)),
                (this._func = t),
                (this._args = i),
                (this._execute = e),
                i[0] === u && ((this._set = this._callResolve), (this._callResolve = e));
            }
            return (
              r && (t.__proto__ = r),
              (((t.prototype = Object.create(
                r && r.prototype
              )).constructor = t).prototype._callResolve = function(t) {
                this._promise._resolve(t);
              }),
              (t.prototype._callReject = function(t) {
                this._promise._reject(t);
              }),
              t
            );
          })(r);
          function p(t) {
            var e = this._args;
            return (
              e[0] === u && ((e[0] = t), (this._callResolve = this._set)),
              h(a(this._func, e), this),
              this._promise
            );
          }
          function f(t) {
            var r = this,
              s = this._args;
            s[0] === u ? ((s[0] = t), (this._callResolve = this._set)) : (t = s[0]);
            var e = 'function' == typeof s[1];
            return (
              e && Array.isArray(t)
                ? y(this, o, function(t) {
                    var e = 0;
                    (s[1] = function() {
                      return t[e++];
                    }),
                      h(a(r._func, s), r);
                  })
                : e && t && 'object' == typeof t
                  ? y(this, n, function(t) {
                      var e = 0,
                        i = Object.keys(t);
                      (s[1] = function() {
                        return t[i[e++]];
                      }),
                        h(a(r._func, s), r);
                    })
                  : h(a(this._func, s), this),
              this._promise
            );
          }
          function y(e, t, i) {
            var r = e._args,
              s = r[0],
              o = r[1],
              n = t(s, function(t, e) {
                return o(t, e, s);
              });
            return 1 === n._resolved
              ? i(n._value)
              : n.then(i, function(t) {
                  return e._callReject(t);
                });
          }
        },
        { '../aigle': 2, '../map': 42, '../mapValues': 45, './util': 40, 'aigle-core': 86 }
      ],
      39: [
        function(t, e, i) {
          'use strict';
          function r(t) {
            void 0 === t && (t = 8), (this.array = Array(t)), (this.length = 0);
          }
          (r.prototype.push = function(t) {
            this.array[this.length++] = t;
          }),
            (e.exports = r);
        },
        {}
      ],
      40: [
        function(I, B, t) {
          (function(t) {
            'use strict';
            var r = I('aigle-core').AigleCore,
              e = I('../../package.json').version,
              s = { e: void 0 },
              c = 'function' == typeof Symbol ? Symbol.iterator : function() {},
              i = 'object' == typeof t && '[object process]' === Object.prototype.toString.call(t),
              o = [
                function(r) {
                  return function(t, e, i) {
                    return r(e[i], t, i);
                  };
                },
                function(n) {
                  return function(t, e, i, r, s) {
                    var o = s[i];
                    return (r[o] = void 0), n(e[o], t, o);
                  };
                },
                function(s) {
                  return function(t, e, i) {
                    var r = e.next();
                    return !1 === r.done && s(r.value, t, i);
                  };
                },
                function(l) {
                  return function(t, e, i, r) {
                    var s = e.next();
                    if (s.done) return !1;
                    var o = s.value,
                      n = o[0],
                      c = o[1];
                    return r.set(n, void 0), l(c, t, n);
                  };
                }
              ].map(function(t) {
                return [E, A].map(t);
              }),
              n = o[0][1],
              l = o[1][1],
              u = o[2][1],
              a = o[3][1],
              h = [
                function(s) {
                  return function(t, e, i) {
                    for (var r = -1; ++r < e && s(t, i, r); );
                  };
                },
                function(n) {
                  return function(t, e, i, r, s) {
                    for (var o = -1; ++o < e && n(t, i, o, r, s); );
                  };
                },
                function(o) {
                  return function(t, e, i) {
                    for (var r = i[c](), s = -1; ++s < e && o(t, r, s); );
                  };
                },
                function(n) {
                  return function(t, e, i, r) {
                    for (var s = i[c](), o = -1; ++o < e && n(t, s, o, r); );
                  };
                }
              ].map(function(t, e) {
                return o[e].map(t);
              }),
              _ = h[0],
              p = _[0],
              f = _[1],
              y = h[1],
              v = y[0],
              m = y[1],
              d = h[2],
              g = d[0],
              x = d[1],
              S = h[3],
              R = S[0],
              j = S[1];
            function L() {}
            function b(t, e) {
              try {
                return t(e);
              } catch (t) {
                return (s.e = t), s;
              }
            }
            function w(t, e) {
              if (e !== s)
                if (e && e.then) {
                  if (e instanceof r)
                    switch (e._resolved) {
                      case 0:
                        return void e._addReceiver(t, L);
                      case 1:
                        return void t._resolve(e._value);
                      case 2:
                        return e.suppressUnhandledRejections(), void t._reject(e._value);
                    }
                  k(e, t);
                } else t._resolve(e);
              else t._reject(s.e);
            }
            function k(t, e) {
              t.then(
                function(t) {
                  e._resolve(t);
                },
                function(t) {
                  e._reject(t);
                }
              );
            }
            function E(t, e, i) {
              if (t instanceof r)
                switch (t._resolved) {
                  case 0:
                    return t._addReceiver(e, i), !0;
                  case 1:
                    return e._callResolve(t._value, i), !0;
                  case 2:
                    return t.suppressUnhandledRejections(), !0 === e._callReject(t._value, i);
                }
              return t === s
                ? !0 === e._callReject(s.e, i)
                : (t && t.then
                    ? (function(t, e, i) {
                        t.then(
                          function(t) {
                            e._callResolve(t, i);
                          },
                          function(t) {
                            e._callReject(t, i);
                          }
                        );
                      })(t, e, i)
                    : e._callResolve(t, i),
                  !0);
            }
            function A(t, e, i) {
              return 'function' == typeof t && (t = t()), E(t, e, i);
            }
            function O(t, e, i, r) {
              var s = t[i];
              (t[i] = t[r]), (t[r] = s);
              var o = e[i];
              (e[i] = e[r]), (e[r] = o);
            }
            function N(t, e, i, r) {
              if (e !== i) {
                for (var s = e; ++s <= i && t[e] === t[s]; ) {
                  var o = s - 1;
                  if (r[o] > r[s]) {
                    var n = r[o];
                    (r[o] = r[s]), (r[s] = n);
                  }
                }
                if (!(i < s))
                  N(
                    t,
                    e,
                    (s = (function(t, e, i, r, s) {
                      for (var o = e, n = i; o <= n; ) {
                        for (e = o; o < n && t[o] < r; ) o++;
                        for (; e <= n && t[n] >= r; ) n--;
                        if (n < o) break;
                        O(t, s, o++, n--);
                      }
                      return o;
                    })(t, e, i, t[t[e] > t[s] ? e : s], r)) - 1,
                    r
                  ),
                    N(t, s, i, r);
              }
            }
            B.exports = {
              VERSION: e,
              DEFAULT_LIMIT: 8,
              INTERNAL: L,
              PENDING: function() {},
              UNHANDLED: function() {},
              defaultIterator: function(t) {
                return t;
              },
              errorObj: s,
              iteratorSymbol: c,
              call0: function(t) {
                try {
                  return t();
                } catch (t) {
                  return (s.e = t), s;
                }
              },
              call1: b,
              call3: function(t, e, i, r) {
                try {
                  return t(e, i, r);
                } catch (t) {
                  return (s.e = t), s;
                }
              },
              apply: function(t, e) {
                try {
                  switch (e.length) {
                    case 0:
                      return t();
                    case 1:
                      return t(e[0]);
                    case 2:
                      return t(e[0], e[1]);
                    case 3:
                      return t(e[0], e[1], e[2]);
                    default:
                      return t.apply(null, e);
                  }
                } catch (t) {
                  return (s.e = t), s;
                }
              },
              callResolve: function(t, e, i) {
                'function' == typeof e ? w(t, b(e, i)) : t._resolve(i);
              },
              callReject: function(t, e, i) {
                'function' == typeof e ? w(t, b(e, i)) : t._reject(i);
              },
              callReceiver: w,
              callThen: k,
              callProxyReciever: E,
              callProxyRecieverWithFunc: A,
              promiseArrayIterator: n,
              promiseArrayEach: p,
              promiseArrayEachWithFunc: f,
              promiseObjectIterator: l,
              promiseObjectEach: v,
              promiseObjectEachWithFunc: m,
              promiseSetIterator: u,
              promiseSetEach: g,
              promiseSetEachWithFunc: x,
              promiseMapIterator: a,
              promiseMapEach: R,
              promiseMapEachWithFunc: j,
              compactArray: function(t) {
                var e = -1,
                  i = t.length,
                  r = [];
                for (; ++e < i; ) {
                  var s = t[e];
                  s !== L && r.push(s);
                }
                return r;
              },
              concatArray: function(t) {
                var e = -1,
                  i = t.length,
                  r = [];
                for (; ++e < i; ) {
                  var s = t[e];
                  Array.isArray(s) ? r.push.apply(r, s) : void 0 !== s && r.push(s);
                }
                return r;
              },
              clone: function(t) {
                return Array.isArray(t)
                  ? (function(t) {
                      var e = t.length,
                        i = Array(e);
                      for (; e--; ) i[e] = t[e];
                      return i;
                    })(t)
                  : (function(t) {
                      var e = Object.keys(t),
                        i = e.length,
                        r = {};
                      for (; i--; ) {
                        var s = e[i];
                        r[s] = t[s];
                      }
                      return r;
                    })(t);
              },
              createEmptyObject: function(t, e) {
                var i = -1,
                  r = e.length,
                  s = {};
                for (; ++i < r; ) s[e[i]] = void 0;
                return s;
              },
              sortArray: function(t, e) {
                for (var i = t.length, r = Array(i), s = 0; s < i; s++) r[s] = s;
                N(e, 0, i - 1, r);
                for (var o = Array(i), n = 0; n < i; n++) {
                  var c = r[n];
                  o[n] = void 0 === c ? t[n] : t[c];
                }
                return o;
              },
              sortObject: function(t, e, i) {
                for (var r = e.length, s = Array(r), o = 0; o < r; o++) s[o] = o;
                N(i, 0, r - 1, s);
                for (var n = Array(r), c = 0; c < r; c++) {
                  var l = s[c];
                  n[c] = t[e[void 0 === l ? c : l]];
                }
                return n;
              },
              printWarning: function(t) {
                i ? console.warn('[31m' + t + '[0m\n') : console.warn('%c' + t, 'color: red');
              }
            };
          }.call(this, I('_process')));
        },
        { '../../package.json': 92, _process: 87, 'aigle-core': 86 }
      ],
      41: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.call1,
            l = o.apply,
            u = o.callProxyReciever,
            a = (function(i) {
              function t(t, e) {
                i.call(this),
                  (this._promise = new s(n)),
                  (this._rest = e),
                  (this._result = Array(e)),
                  (this._handler = t);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._callResolve = function(t, e) {
                  if (e === n) return this._promise._resolve(t);
                  if (((this._result[e] = t), 0 == --this._rest)) {
                    var i = this._handler,
                      r = this._result;
                    void 0 === i ? this._promise._resolve(r) : u(l(i, r), this, n);
                  }
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r),
            h = (function(e) {
              function t(t) {
                e.call(this), (this._promise = new s(n)), (this._handler = t);
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(
                  e && e.prototype
                )).constructor = t).prototype._callResolve = function(t, e) {
                  if (e === n) return this._promise._resolve(t);
                  !(function(t, e) {
                    var i = t._handler;
                    if (void 0 === i) return t._promise._resolve(e);
                    switch (typeof e) {
                      case 'string':
                        e = e.split('');
                        break;
                      case 'object':
                        if (Array.isArray(e)) break;
                        if (e) {
                          for (var r = Object.keys(e), s = r.length, o = Array(s); s--; )
                            o[s] = e[r[s]];
                          e = o;
                          break;
                        }
                      default:
                        return u(c(i, e), t, n);
                    }
                    u(l(i, e), t, n);
                  })(this, t);
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          e.exports = {
            join: function() {
              var t = arguments,
                e = arguments.length,
                i = 'function' == typeof arguments[e - 1] ? arguments[--e] : void 0,
                r = new a(i, e);
              for (; e--; ) u(t[e], r, e);
              return r._promise;
            },
            Spread: h
          };
        },
        { './aigle': 2, './internal/util': 40, 'aigle-core': 86 }
      ],
      42: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._callResolve = function(t, e) {
                  (this._result[e] = t), 0 == --this._rest && this._promise._resolve(this._result);
                }),
                t
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._result = Array(this._rest)), this;
          }
          e.exports = {
            map: function(t, e) {
              return new o(t, e)._execute();
            },
            Map: o
          };
        },
        { './each': 13, './internal/collection': 37 }
      ],
      43: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(
                  r && r.prototype
                )).constructor = t).prototype._callResolve = function(t, e) {
                  (this._result[e] = t),
                    0 == --this._rest
                      ? this._promise._resolve(this._result)
                      : 0 < this._callRest-- && this._iterate();
                }),
                t
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._result = Array(this._rest)), this;
          }
          e.exports = {
            mapLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            MapLimit: o
          };
        },
        { './eachLimit': 14, './internal/collection': 37 }
      ],
      44: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._callResolve = function(t, e) {
                  (this._result[e] = t),
                    0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
                }),
                t
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._result = Array(this._rest)), this;
          }
          e.exports = {
            mapSeries: function(t, e) {
              return new o(t, e)._execute();
            },
            MapSeries: o
          };
        },
        { './eachSeries': 15, './internal/collection': 37 }
      ],
      45: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthandWithOrder,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            (this._result[e] = t), 0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            (this._result[this._keys[e]] = t),
              0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            mapValues: function(t, e) {
              return new o(t, e)._execute();
            },
            MapValues: o
          };
        },
        { './each': 13, './internal/collection': 37 }
      ],
      46: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util').createEmptyObject,
            n = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, c);
              }
              return (
                r && (t.__proto__ = r),
                ((t.prototype = Object.create(r && r.prototype)).constructor = t)
              );
            })(r);
          function c(t) {
            return (
              s.call(this, t),
              void 0 === this._keys
                ? ((this._result = {}), (this._callResolve = l))
                : ((this._result = o(t, this._keys)), (this._callResolve = u)),
              this
            );
          }
          function l(t, e) {
            (this._result[e] = t),
              0 == --this._rest
                ? this._promise._resolve(this._result)
                : 0 < this._callRest-- && this._iterate();
          }
          function u(t, e) {
            (this._result[this._keys[e]] = t),
              0 == --this._rest
                ? this._promise._resolve(this._result)
                : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            mapValuesLimit: function(t, e, i) {
              return new n(t, e, i)._execute();
            },
            MapValuesLimit: n
          };
        },
        { './eachLimit': 14, './internal/collection': 37, './internal/util': 40 }
      ],
      47: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            (this._result[e] = t),
              0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          function l(t, e) {
            (this._result[this._keys[e]] = t),
              0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          e.exports = {
            mapValuesSeries: function(t, e) {
              return new o(t, e)._execute();
            },
            MapValuesSeries: o
          };
        },
        { './eachSeries': 15, './internal/collection': 37 }
      ],
      48: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setOmitShorthand,
            o = (function(r) {
              function t(t, e, i) {
                'function' != typeof e && (e = [e].concat(i)),
                  r.call(this, t, e, n),
                  (this._result = {});
              }
              return (
                r && (t.__proto__ = r),
                ((t.prototype = Object.create(r && r.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t || (this._result[e] = this._coll[e]),
              0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            if (!t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            omit: function(t, e) {
              var i = [],
                r = arguments.length - 2;
              for (; 0 < r--; ) i[r] = arguments[r + 2];
              return new o(t, e, i)._execute();
            },
            Omit: o
          };
        },
        { './each': 13, './internal/collection': 37 }
      ],
      49: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t || (this._result[e] = this._coll[e]),
              0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            if (!t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            omitBy: function(t, e) {
              return new o(t, e)._execute();
            },
            OmitBy: o
          };
        },
        { './each': 13, './internal/collection': 37 }
      ],
      50: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n), (this._result = {});
              }
              return (
                r && (t.__proto__ = r),
                ((t.prototype = Object.create(r && r.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t || (this._result[e] = this._coll[e]),
              0 == --this._rest
                ? this._promise._resolve(this._result)
                : 0 < this._callRest-- && this._iterate();
          }
          function l(t, e) {
            if (!t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest
              ? this._promise._resolve(this._result)
              : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            omitByLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            OmitByLimit: o
          };
        },
        { './eachLimit': 14, './internal/collection': 37 }
      ],
      51: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/util').PENDING,
            o = t('./internal/collection').setSeries,
            n = (function(i) {
              function t(t, e) {
                i.call(this, t, e),
                  (this._result = {}),
                  t === s ? (this._set = c) : (this._callResolve = void 0 === this._keys ? l : u);
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function c(t) {
            return o.call(this, t), (this._callResolve = void 0 === this._keys ? l : u), this;
          }
          function l(t, e) {
            t || (this._result[e] = this._coll[e]),
              0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          function u(t, e) {
            if (!t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          e.exports = {
            omitBySeries: function(t, e) {
              return new n(t, e)._execute();
            },
            OmitBySeries: n
          };
        },
        { './eachSeries': 15, './internal/collection': 37, './internal/util': 40 }
      ],
      52: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.promiseArrayEachWithFunc,
            u = o.promiseObjectEachWithFunc,
            a = o.promiseMapEachWithFunc,
            h = o.promiseSetEachWithFunc,
            _ = o.iteratorSymbol,
            p = t('./props'),
            f = p.callResolve,
            y = p.callResolveMap,
            v = (function(e) {
              function t(t) {
                e.call(this),
                  (this._promise = new s(n)),
                  (this._rest = void 0),
                  (this._result = void 0),
                  t === c
                    ? (this._callResolve = this._set)
                    : ((this._callResolve = void 0), this._set(t));
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(
                  e && e.prototype
                )).constructor = t).prototype._set = function(t) {
                  if (Array.isArray(t)) {
                    var e = t.length;
                    (this._rest = e),
                      (this._result = Array(e)),
                      (this._callResolve = f),
                      l(this, e, t);
                  } else if (t && 'object' == typeof t)
                    if (t[_]) {
                      var i = t.size;
                      if (((this._rest = i), t instanceof Map)) {
                        var r = new Map();
                        (this._result = r), (this._callResolve = y), a(this, 1 / 0, t, r);
                      } else
                        (this._result = Array(this._rest)),
                          (this._callResolve = f),
                          h(this, 1 / 0, t);
                    } else {
                      var s = {},
                        o = Object.keys(t),
                        n = o.length;
                      (this._rest = n),
                        (this._result = s),
                        (this._callResolve = f),
                        u(this, n, t, s, o);
                    }
                  else (this._rest = 0), (this._result = {});
                  return 0 === this._rest && this._promise._resolve(this._result), this;
                }),
                (t.prototype._execute = function() {
                  return this._promise;
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          e.exports = {
            parallel: function(t) {
              return new v(t)._promise;
            },
            Parallel: v
          };
        },
        { './aigle': 2, './internal/util': 40, './props': 60, 'aigle-core': 86 }
      ],
      53: [
        function(t, e, i) {
          'use strict';
          var r = t('./series').Series,
            s = t('./internal/util').DEFAULT_LIMIT,
            o = (function(i) {
              function t(t, e) {
                void 0 === e && (e = s),
                  i.call(this, t),
                  (this._size = this._rest),
                  (this._limit = e);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._execute = function() {
                  var t = this._limit,
                    e = this._rest;
                  if (0 === e) return this._promise._resolve(this._result), this._promise;
                  (this._size = e), (this._iterate = n);
                  for (var i = t < e ? t : e; i--; ) this._iterate();
                  return this._promise;
                }),
                (t.prototype._callResolve = function(t, e) {
                  (this._result[e] = t),
                    0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
                }),
                (t.prototype._callResolveMap = function(t, e) {
                  this._result.set(e, t),
                    0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function n() {
            ++this._index < this._size &&
              this._iterator(this, this._coll, this._index, this._result, this._keys);
          }
          e.exports = {
            parallelLimit: function(t, e) {
              return new o(t, e)._execute();
            },
            ParallelLimit: o
          };
        },
        { './internal/util': 40, './series': 67 }
      ],
      54: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setPickShorthand,
            o = (function(r) {
              function t(t, e, i) {
                'function' != typeof e && (e = [e].concat(i)),
                  r.call(this, t, e, n),
                  (this._result = {});
              }
              return (
                r && (t.__proto__ = r),
                ((t.prototype = Object.create(r && r.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t && (this._result[e] = this._coll[e]),
              0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            if (t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            pick: function(t, e) {
              var i = [],
                r = arguments.length - 2;
              for (; 0 < r--; ) i[r] = arguments[r + 2];
              return new o(t, e, i)._execute();
            },
            Pick: o
          };
        },
        { './each': 13, './internal/collection': 37 }
      ],
      55: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t && (this._result[e] = this._coll[e]),
              0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            if (t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            pickBy: function(t, e) {
              return new o(t, e)._execute();
            },
            PickBy: o
          };
        },
        { './each': 13, './internal/collection': 37 }
      ],
      56: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, n), (this._result = {});
              }
              return (
                r && (t.__proto__ = r),
                ((t.prototype = Object.create(r && r.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t && (this._result[e] = this._coll[e]),
              0 == --this._rest
                ? this._promise._resolve(this._result)
                : 0 < this._callRest-- && this._iterate();
          }
          function l(t, e) {
            if (t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest
              ? this._promise._resolve(this._result)
              : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            pickByLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            PickByLimit: o
          };
        },
        { './eachLimit': 14, './internal/collection': 37 }
      ],
      57: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, n), (this._result = {});
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t && (this._result[e] = this._coll[e]),
              0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          function l(t, e) {
            if (t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
          }
          e.exports = {
            pickBySeries: function(t, e) {
              return new o(t, e)._execute();
            },
            PickBySeries: o
          };
        },
        { './eachSeries': 15, './internal/collection': 37 }
      ],
      58: [
        function(t, e, i) {
          'use strict';
          var u = t('./aigle'),
            r = t('./internal/util'),
            a = r.INTERNAL,
            h = r.callThen,
            s = 'function' == typeof setImmediate ? setImmediate : {},
            o =
              (function() {
                try {
                  return t('util').promisify.custom;
                } catch (t) {
                  return;
                }
              })() || {};
          function _(i) {
            return function(t, e) {
              return t ? i._reject(t) : i._resolve(e);
            };
          }
          e.exports = function(t, e) {
            switch (typeof t) {
              case 'object':
                switch (typeof e) {
                  case 'string':
                  case 'number':
                    if ('function' != typeof t[e])
                      throw new TypeError('Function not found key: ' + e);
                    return t[e].__isPromisified__
                      ? t[e]
                      : (function(n, c) {
                          return (t.__isPromisified__ = !0), t;
                          function t(t) {
                            var e = arguments,
                              i = new u(a),
                              r = _(i),
                              s = arguments.length;
                            switch (s) {
                              case 0:
                                n[c](r);
                                break;
                              case 1:
                                n[c](t, r);
                                break;
                              default:
                                for (var o = Array(s); s--; ) o[s] = e[s];
                                (o[o.length] = r), n[c].apply(n, o);
                            }
                            return i;
                          }
                        })(t, e);
                  default:
                    throw new TypeError('Second argument is invalid');
                }
              case 'function':
                if (t.__isPromisified__) return t;
                var i = e && void 0 !== e.context ? e.context : void 0;
                return (function(n, c) {
                  var l = n[o];
                  if (l) return (t.__isPromisified__ = !0), t;
                  switch (n) {
                    case setTimeout:
                      return u.delay;
                    case s:
                      return u.resolve;
                  }
                  return (e.__isPromisified__ = !0), e;
                  function t(t) {
                    var e,
                      i = arguments,
                      r = new u(a),
                      s = arguments.length;
                    switch (s) {
                      case 0:
                        e = l.call(c || this);
                        break;
                      case 1:
                        e = l.call(c || this, t);
                        break;
                      default:
                        for (var o = Array(s); s--; ) o[s] = i[s];
                        e = l.apply(c || this, o);
                    }
                    return h(e, r), r;
                  }
                  function e(t) {
                    var e = arguments,
                      i = new u(a),
                      r = _(i),
                      s = arguments.length;
                    switch (s) {
                      case 0:
                        n.call(c || this, r);
                        break;
                      case 1:
                        n.call(c || this, t, r);
                        break;
                      default:
                        for (var o = Array(s); s--; ) o[s] = e[s];
                        (o[o.length] = r), n.apply(c || this, o);
                    }
                    return i;
                  }
                })(t, i);
              default:
                throw new TypeError('Type of first argument is not function');
            }
          };
        },
        { './aigle': 2, './internal/util': 40, util: 91 }
      ],
      59: [
        function(t, e, i) {
          'use strict';
          var l = t('./promisify'),
            a = {
              constructor: !0,
              arity: !0,
              length: !0,
              name: !0,
              arguments: !0,
              caller: !0,
              callee: !0,
              prototype: !0,
              __isPromisified__: !0
            };
          function n(t) {
            return /^(?!_).*/.test(t);
          }
          function h(t, e, i, r, s, o) {
            var n = {};
            switch (typeof i) {
              case 'function':
                if (s) {
                  if (i.__isPromisified__) return;
                  var c = '' + r + t;
                  if (s[c]) {
                    if (!s[c].__isPromisified__)
                      throw new TypeError(
                        "Cannot promisify an API that has normal methods with '" + t + "'-suffix"
                      );
                  } else s[c] = l(i);
                }
                u(t, e, i, i, o, n), u(t, e, i.prototype, i.prototype, o, n);
                break;
              case 'object':
                if (!i) break;
                u(t, e, i, i, o, n), u(t, e, Object.getPrototypeOf(i), i, o, n);
            }
          }
          e.exports = function(t, e) {
            var i = e || {},
              r = i.suffix;
            void 0 === r && (r = 'Async');
            var s = i.filter;
            void 0 === s && (s = n);
            var o = i.depth;
            void 0 === o && (o = 2);
            return h(r, s, t, void 0, void 0, o), t;
          };
          var _ = Function.prototype,
            p = Object.prototype,
            f = Array.prototype;
          function u(t, e, i, r, s, o) {
            if (0 != s-- && i && _ !== i && p !== i && f !== i && !Object.isFrozen(i))
              for (var n = Object.getOwnPropertyNames(i), c = n.length; c--; ) {
                var l = n[c];
                if (!0 !== a[l] && !0 !== o[l] && e(l)) {
                  var u = Object.getOwnPropertyDescriptor(i, l);
                  !u || u.set || u.get || ((o[l] = !0), h(t, e, i[l], l, r, s));
                }
              }
          }
        },
        { './promisify': 58 }
      ],
      60: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.promiseObjectEach,
            u = o.promiseMapEach,
            a = (function(e) {
              function t(t) {
                e.call(this),
                  (this._promise = new s(n)),
                  (this._rest = 0),
                  (this._result = void 0),
                  t === c
                    ? (this._callResolve = this._set)
                    : ((this._callResolve = void 0), this._set(t));
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(
                  e && e.prototype
                )).constructor = t).prototype._set = function(t) {
                  if ('object' != typeof t || null === t) this._result = {};
                  else if (t instanceof Map) {
                    var e = new Map();
                    (this._result = e),
                      (this._rest = t.size),
                      (this._callResolve = _),
                      u(this, 1 / 0, t, e);
                  } else {
                    var i = Object.keys(t),
                      r = i.length,
                      s = {};
                    (this._result = s),
                      (this._rest = r),
                      (this._callResolve = h),
                      l(this, r, t, s, i);
                  }
                  return 0 === this._rest && this._promise._resolve(this._result), this;
                }),
                (t.prototype._execute = function() {
                  return this._promise;
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function h(t, e) {
            (this._result[e] = t), 0 == --this._rest && this._promise._resolve(this._result);
          }
          function _(t, e) {
            this._result.set(e, t), 0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            props: function(t) {
              return new a(t)._promise;
            },
            Props: a,
            callResolve: h,
            callResolveMap: _
          };
        },
        { './aigle': 2, './internal/util': 40, 'aigle-core': 86 }
      ],
      61: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.promiseArrayEach,
            u = o.promiseObjectEach,
            a = o.promiseMapEach,
            h = o.promiseSetEach,
            _ = o.iteratorSymbol,
            p = (function(e) {
              function t(t) {
                e.call(this),
                  (this._promise = new s(n)),
                  (this._keys = void 0),
                  t === c
                    ? (this._callResolve = this._set)
                    : ((this._callResolve = void 0), this._set(t));
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(
                  e && e.prototype
                )).constructor = t).prototype._set = function(t) {
                  if (((this._callResolve = f), Array.isArray(t))) l(this, t.length, t);
                  else if (t && 'object' == typeof t)
                    if (t[_]) t instanceof Map ? a(this, 1 / 0, t, new Map()) : h(this, 1 / 0, t);
                    else {
                      var e = Object.keys(t);
                      u(this, e.length, t, {}, e);
                    }
                  else;
                  return this;
                }),
                (t.prototype._execute = function() {
                  return this._promise;
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function f(t) {
            this._promise._resolve(t);
          }
          e.exports = {
            race: function(t) {
              return new p(t)._promise;
            },
            Race: p
          };
        },
        { './aigle': 2, './internal/util': 40, 'aigle-core': 86 }
      ],
      62: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/collection'),
            n = o.execute,
            c = o.setSeries,
            l = t('./internal/util'),
            u = l.INTERNAL,
            a = l.PENDING,
            h = l.call3,
            _ = l.callProxyReciever,
            p = (function(r) {
              function t(t, e, i) {
                r.call(this),
                  (this._result = i),
                  (this._iterator = e),
                  (this._promise = new s(u)),
                  (this._coll = void 0),
                  (this._rest = void 0),
                  (this._size = void 0),
                  (this._keys = void 0),
                  (this._iterate = void 0),
                  t === a
                    ? ((this._set = f),
                      (this._iterate = this._callResolve),
                      (this._callResolve = n))
                    : f.call(this, t);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(
                  r && r.prototype
                )).constructor = t).prototype._callResolve = function(t, e) {
                  0 == --this._rest ? this._promise._resolve(t) : this._iterate(++e, t);
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function f(t) {
            return (
              c.call(this, t),
              void 0 === this._keys
                ? ((this._iterate = y), (this._execute = m))
                : ((this._iterate = v), (this._execute = d)),
              this
            );
          }
          function y(t, e) {
            _(h(this._iterator, e, this._coll[t], t), this, t);
          }
          function v(t, e) {
            var i = this._keys[t];
            _(h(this._iterator, e, this._coll[i], i), this, t);
          }
          function m() {
            return (
              0 === this._rest
                ? this._promise._resolve(this._result)
                : void 0 === this._result
                  ? this._callResolve(this._coll[0], 0)
                  : this._iterate(0, this._result),
              this._promise
            );
          }
          function d() {
            return (
              0 === this._rest
                ? this._promise._resolve(this._result)
                : void 0 === this._result
                  ? this._callResolve(this._coll[this._keys[0]], 0)
                  : this._iterate(0, this._result),
              this._promise
            );
          }
          e.exports = {
            reduce: function(t, e, i) {
              return new p(t, e, i)._execute();
            },
            Reduce: p
          };
        },
        { './aigle': 2, './internal/collection': 37, './internal/util': 40, 'aigle-core': 86 }
      ],
      63: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(i) {
              function t(t, e) {
                i.call(this, t, e, u);
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t ? n : this._coll[e]),
              0 == --this._rest && this._promise._resolve(c(this._result));
          }
          function h(t, e) {
            (this._result[e] = t ? n : this._coll[this._keys[e]]),
              0 == --this._rest && this._promise._resolve(c(this._result));
          }
          e.exports = {
            reject: function(t, e) {
              return new l(t, e)._execute();
            },
            Reject: l
          };
        },
        { './each': 13, './internal/collection': 37, './internal/util': 40 }
      ],
      64: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, u);
              }
              return (
                r && (t.__proto__ = r),
                ((t.prototype = Object.create(r && r.prototype)).constructor = t)
              );
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t ? n : this._coll[e]),
              0 == --this._rest
                ? this._promise._resolve(c(this._result))
                : 0 < this._callRest-- && this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t ? n : this._coll[this._keys[e]]),
              0 == --this._rest
                ? this._promise._resolve(c(this._result))
                : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            rejectLimit: function(t, e, i) {
              return new l(t, e, i)._execute();
            },
            RejectLimit: l
          };
        },
        { './eachLimit': 14, './internal/collection': 37, './internal/util': 40 }
      ],
      65: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(i) {
              function t(t, e) {
                i.call(this, t, e, u);
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t ? n : this._coll[e]),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t ? n : this._coll[this._keys[e]]),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : this._iterate();
          }
          e.exports = {
            rejectSeries: function(t, e) {
              return new l(t, e)._execute();
            },
            RejectSeries: l
          };
        },
        { './eachSeries': 15, './internal/collection': 37, './internal/util': 40 }
      ],
      66: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            o = t('./aigle'),
            s = t('./internal/util'),
            n = s.INTERNAL,
            c = s.call0,
            l = s.callProxyReciever,
            u = (function(s) {
              function t(t, e) {
                switch (
                  (s.call(this),
                  (this._promise = new o(n)),
                  (this._handler = e),
                  (this._count = 0),
                  (this._times = 5),
                  (this._interval = void 0),
                  t && typeof t)
                ) {
                  case 'function':
                    this._handler = t;
                    break;
                  case 'object':
                    var i = t.interval,
                      r = t.times;
                    (this._times = r || 5),
                      (this._interval =
                        'function' == typeof i
                          ? i
                          : i
                            ? function() {
                                return i;
                              }
                            : void 0),
                      (this._iterate = this._iterate.bind(this));
                    break;
                  default:
                    this._times = t;
                }
                this._iterate();
              }
              return (
                s && (t.__proto__ = s),
                (((t.prototype = Object.create(
                  s && s.prototype
                )).constructor = t).prototype._iterate = function() {
                  l(c(this._handler), this, void 0);
                }),
                (t.prototype._callResolve = function(t) {
                  this._promise._resolve(t);
                }),
                (t.prototype._callReject = function(t) {
                  ++this._count === this._times
                    ? this._promise._reject(t)
                    : void 0 !== this._interval
                      ? setTimeout(this._iterate, this._interval(this._count))
                      : this._iterate();
                }),
                t
              );
            })(r);
          e.exports = function(t, e) {
            return new u(t, e)._promise;
          };
        },
        { './aigle': 2, './internal/util': 40, 'aigle-core': 86 }
      ],
      67: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.promiseArrayIterator,
            u = o.promiseObjectIterator,
            a = o.promiseSetIterator,
            h = o.promiseMapIterator,
            _ = o.iteratorSymbol,
            p = t('./internal/collection').execute,
            f = (function(e) {
              function t(t) {
                e.call(this),
                  (this._promise = new s(n)),
                  (this._index = -1),
                  (this._coll = void 0),
                  (this._keys = void 0),
                  (this._rest = void 0),
                  (this._result = void 0),
                  (this._iterate = void 0),
                  t === c
                    ? ((this._set = y),
                      (this._iterate = this._callResolve),
                      (this._callResolve = p))
                    : y.call(this, t);
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(
                  e && e.prototype
                )).constructor = t).prototype._execute = function() {
                  return this._iterate(), this._promise;
                }),
                (t.prototype._callResolve = function(t, e) {
                  (this._result[e] = t), this._iterate();
                }),
                (t.prototype._callResolveMap = function(t, e) {
                  this._result.set(e, t), this._iterate();
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function y(t) {
            if (((this._coll = t), (this._iterate = v), Array.isArray(t))) {
              var e = t.length;
              (this._rest = e), (this._result = Array(e)), (this._iterator = l);
            } else if ('object' != typeof t || null === t) (this._rest = 0), (this._result = {});
            else if (t[_]) {
              this._coll = t[_]();
              var i = t.size;
              if (((this._rest = i), t instanceof Map)) {
                var r = new Map();
                (this._result = r),
                  (this._callResolve = this._callResolveMap),
                  (this._iterator = h);
              } else (this._result = []), (this._iterator = a);
            } else {
              var s = Object.keys(t);
              (this._rest = s.length), (this._keys = s), (this._result = {}), (this._iterator = u);
            }
            return this;
          }
          function v() {
            ++this._index === this._rest
              ? this._promise._resolve(this._result)
              : this._iterator(this, this._coll, this._index, this._result, this._keys);
          }
          e.exports = {
            series: function(t) {
              return new f(t)._execute();
            },
            Series: f
          };
        },
        { './aigle': 2, './internal/collection': 37, './internal/util': 40, 'aigle-core': 86 }
      ],
      68: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(i) {
              function t(t, e) {
                i.call(this, t, e, s), (this._result = !1);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._callResolve = function(t) {
                  t ? this._promise._resolve(!0) : 0 == --this._rest && this._promise._resolve(!1);
                }),
                t
              );
            })(r);
          e.exports = {
            some: function(t, e) {
              return new o(t, e)._execute();
            },
            Some: o
          };
        },
        { './each': 13, './internal/collection': 37 }
      ],
      69: [
        function(t, e, i) {
          'use strict';
          var r = (function(r) {
            function t(t, e, i) {
              r.call(this, t, e, i), (this._result = !1);
            }
            return (
              r && (t.__proto__ = r),
              (((t.prototype = Object.create(
                r && r.prototype
              )).constructor = t).prototype._callResolve = function(t) {
                t
                  ? this._promise._resolve(!0)
                  : 0 == --this._rest
                    ? this._promise._resolve(!1)
                    : 0 < this._callRest-- && this._iterate();
              }),
              t
            );
          })(t('./eachLimit').EachLimit);
          e.exports = {
            someLimit: function(t, e, i) {
              return new r(t, e, i)._execute();
            },
            SomeLimit: r
          };
        },
        { './eachLimit': 14 }
      ],
      70: [
        function(t, e, i) {
          'use strict';
          var r = (function(i) {
            function t(t, e) {
              i.call(this, t, e), (this._result = !1);
            }
            return (
              i && (t.__proto__ = i),
              (((t.prototype = Object.create(
                i && i.prototype
              )).constructor = t).prototype._callResolve = function(t) {
                t
                  ? this._promise._resolve(!0)
                  : 0 == --this._rest
                    ? this._promise._resolve(!1)
                    : this._iterate();
              }),
              t
            );
          })(t('./eachSeries.js').EachSeries);
          e.exports = {
            someSeries: function(t, e) {
              return new r(t, e)._execute();
            },
            SomeSeries: r
          };
        },
        { './eachSeries.js': 15 }
      ],
      71: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = t('./internal/util'),
            n = o.sortArray,
            c = o.sortObject,
            l = (function(i) {
              function t(t, e) {
                i.call(this, t, e, u);
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t),
              0 == --this._rest && this._promise._resolve(n(this._coll, this._result));
          }
          function h(t, e) {
            (this._result[e] = t),
              0 == --this._rest && this._promise._resolve(c(this._coll, this._keys, this._result));
          }
          e.exports = {
            sortBy: function(t, e) {
              return new l(t, e)._execute();
            },
            SortBy: l
          };
        },
        { './each': 13, './internal/collection': 37, './internal/util': 40 }
      ],
      72: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util'),
            n = o.sortArray,
            c = o.sortObject,
            l = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, i, u);
              }
              return (
                r && (t.__proto__ = r),
                ((t.prototype = Object.create(r && r.prototype)).constructor = t)
              );
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t),
              0 == --this._rest
                ? this._promise._resolve(n(this._coll, this._result))
                : 0 < this._callRest-- && this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t),
              0 == --this._rest
                ? this._promise._resolve(c(this._coll, this._keys, this._result))
                : 0 < this._callRest-- && this._iterate();
          }
          e.exports = {
            sortByLimit: function(t, e, i) {
              return new l(t, e, i)._execute();
            },
            SortByLimit: l
          };
        },
        { './eachLimit': 14, './internal/collection': 37, './internal/util': 40 }
      ],
      73: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = t('./internal/util'),
            n = o.sortArray,
            c = o.sortObject,
            l = (function(i) {
              function t(t, e) {
                i.call(this, t, e, u);
              }
              return (
                i && (t.__proto__ = i),
                ((t.prototype = Object.create(i && i.prototype)).constructor = t)
              );
            })(r);
          function u(t) {
            return (
              s.call(this, t),
              (this._result = Array(this._rest)),
              (this._callResolve = void 0 === this._keys ? a : h),
              this
            );
          }
          function a(t, e) {
            (this._result[e] = t),
              0 == --this._rest
                ? this._promise._resolve(n(this._coll, this._result))
                : this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t),
              0 == --this._rest
                ? this._promise._resolve(c(this._coll, this._keys, this._result))
                : this._iterate();
          }
          e.exports = {
            sortBySeries: function(t, e) {
              return new l(t, e)._execute();
            },
            SortBySeries: l
          };
        },
        { './eachSeries': 15, './internal/collection': 37, './internal/util': 40 }
      ],
      74: [
        function(t, e, i) {
          'use strict';
          var r = t('./aigle'),
            s = t('./internal/util'),
            o = s.INTERNAL,
            n = s.callResolve;
          e.exports = function(t, e) {
            var i = new r(o);
            return (
              n(i, e, t),
              i.then(function() {
                return t;
              })
            );
          };
        },
        { './aigle': 2, './internal/util': 40 }
      ],
      75: [
        function(t, e, i) {
          'use strict';
          var r = t('./aigle'),
            s = t('./internal/util'),
            o = s.INTERNAL,
            n = s.callResolve;
          e.exports = function(t, e) {
            var i = new r(o);
            return n(i, e, t), i;
          };
        },
        { './aigle': 2, './internal/util': 40 }
      ],
      76: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./error').TimeoutError,
            n = t('./internal/util').INTERNAL,
            c = (function(r) {
              function t(t, e) {
                var i = this;
                void 0 === e && (e = 'operation timed out'),
                  r.call(this),
                  (this._promise = new s(n)),
                  (this._timer = setTimeout(function() {
                    return i._callReject(e instanceof Error ? e : new o(e));
                  }, t));
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(
                  r && r.prototype
                )).constructor = t).prototype._callResolve = function(t) {
                  clearTimeout(this._timer), this._promise._resolve(t);
                }),
                (t.prototype._callReject = function(t) {
                  clearTimeout(this._timer), this._promise._reject(t);
                }),
                t
              );
            })(r);
          e.exports = c;
        },
        { './aigle': 2, './error': 16, './internal/util': 40, 'aigle-core': 86 }
      ],
      77: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.defaultIterator,
            u = o.call1,
            a = o.callProxyReciever,
            h = (function(i) {
              function t(t, e) {
                i.call(this),
                  (this._promise = new s(n)),
                  (this._iterator = 'function' == typeof e ? e : l),
                  (this._rest = void 0),
                  (this._result = void 0),
                  t === c
                    ? ((this._rest = this._callResolve), (this._callResolve = p))
                    : _.call(this, t);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._execute = function() {
                  if (1 <= this._rest)
                    for (
                      var t = this._rest, e = this._iterator, i = -1;
                      ++i < t && a(u(e, i), this, i);

                    );
                  else this._promise._resolve(this._result);
                  return this._promise;
                }),
                (t.prototype._callResolve = function(t, e) {
                  (this._result[e] = t), 0 == --this._rest && this._promise._resolve(this._result);
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          function _(t) {
            1 <= (t = 0 | +t)
              ? ((this._rest = t), (this._result = Array(t)))
              : ((this._rest = 0), (this._result = []));
          }
          function p(t) {
            (this._callResolve = this._rest), _.call(this, t), this._execute();
          }
          e.exports = {
            times: function(t, e) {
              return new h(t, e)._execute();
            },
            Times: h,
            set: _,
            execute: p
          };
        },
        { './aigle': 2, './internal/util': 40, 'aigle-core': 86 }
      ],
      78: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.DEFAULT_LIMIT,
            u = o.defaultIterator,
            a = o.call1,
            h = o.callProxyReciever,
            _ = (function(r) {
              function t(t, e, i) {
                r.call(this),
                  'function' == typeof e && ((i = e), (e = l)),
                  (this._promise = new s(n)),
                  (this._index = 0),
                  (this._limit = e),
                  (this._iterator = 'function' == typeof i ? i : u),
                  (this._rest = void 0),
                  (this._result = void 0),
                  (this._callRest = void 0),
                  t === c
                    ? ((this._rest = this._callResolve), (this._callResolve = f))
                    : p.call(this, t);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(
                  r && r.prototype
                )).constructor = t).prototype._execute = function() {
                  if (0 === this._rest) this._promise._resolve(this._result);
                  else for (; this._limit--; ) this._iterate();
                  return this._promise;
                }),
                (t.prototype._iterate = function() {
                  var t = this._index++;
                  h(a(this._iterator, t), this, t);
                }),
                (t.prototype._callResolve = function(t, e) {
                  (this._result[e] = t),
                    0 == --this._rest
                      ? this._promise._resolve(this._result)
                      : 0 < this._callRest-- && this._iterate();
                }),
                (t.prototype._callReject = function(t) {
                  (this._callRest = 0), this._promise._reject(t);
                }),
                t
              );
            })(r);
          function p(t) {
            if (1 <= (t = 0 | +t)) {
              (this._rest = t), (this._result = Array(t));
              var e = this._limit;
              (this._limit = e < t ? e : t), (this._callRest = t - this._limit);
            } else (this._rest = 0), (this._result = []);
          }
          function f(t) {
            (this._callResolve = this._rest), p.call(this, t), this._execute();
          }
          e.exports = {
            timesLimit: function(t, e, i) {
              return new _(t, e, i)._execute();
            },
            TimesLimit: _
          };
        },
        { './aigle': 2, './internal/util': 40, 'aigle-core': 86 }
      ],
      79: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./times'),
            n = o.set,
            c = o.execute,
            l = t('./internal/util'),
            u = l.INTERNAL,
            a = l.PENDING,
            h = l.defaultIterator,
            _ = l.call1,
            p = l.callProxyReciever,
            f = (function(i) {
              function t(t, e) {
                i.call(this),
                  (this._promise = new s(u)),
                  (this._iterator = 'function' == typeof e ? e : h),
                  (this._index = 0),
                  (this._rest = void 0),
                  (this._result = void 0),
                  t === a
                    ? ((this._rest = this._callResolve), (this._callResolve = c))
                    : n.call(this, t);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._execute = function() {
                  return (
                    1 <= this._rest ? this._iterate() : this._promise._resolve(this._result),
                    this._promise
                  );
                }),
                (t.prototype._iterate = function() {
                  var t = this._index++;
                  p(_(this._iterator, t), this, t);
                }),
                (t.prototype._callResolve = function(t, e) {
                  (this._result[e] = t),
                    0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          e.exports = {
            timesSeries: function(t, e) {
              return new f(t, e)._execute();
            },
            TimesSeries: f
          };
        },
        { './aigle': 2, './internal/util': 40, './times': 77, 'aigle-core': 86 }
      ],
      80: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setParallel,
            o = t('./internal/util'),
            l = o.call3,
            u = o.callProxyReciever,
            n = o.clone,
            c = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, a), void 0 !== i && (this._result = i);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(
                  r && r.prototype
                )).constructor = t).prototype._callResolve = function(t) {
                  !1 === t
                    ? this._promise._resolve(n(this._result))
                    : 0 == --this._rest && this._promise._resolve(this._result);
                }),
                t
              );
            })(r);
          function a(t) {
            return (
              s.call(this, t),
              void 0 !== this._keys || void 0 === this._coll
                ? (void 0 === this._result && (this._result = {}), (this._iterate = _))
                : (void 0 === this._result && (this._result = []), (this._iterate = h)),
              this
            );
          }
          function h() {
            for (
              var t = this._rest, e = this._result, i = this._iterator, r = this._coll, s = -1;
              ++s < t && u(l(i, e, r[s], s), this, s);

            );
          }
          function _() {
            for (
              var t = this,
                e = t._rest,
                i = t._result,
                r = t._iterator,
                s = t._coll,
                o = t._keys,
                n = -1;
              ++n < e;

            ) {
              var c = o[n];
              if (!1 === u(l(r, i, s[c], c), this, n)) break;
            }
          }
          e.exports = {
            transform: function(t, e, i) {
              return new c(t, e, i)._execute();
            },
            Transform: c
          };
        },
        { './each': 13, './internal/collection': 37, './internal/util': 40 }
      ],
      81: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util'),
            n = o.DEFAULT_LIMIT,
            c = o.call3,
            l = o.callProxyReciever,
            u = o.clone,
            a = (function(s) {
              function t(t, e, i, r) {
                'function' == typeof e && ((r = i), (i = e), (e = n)),
                  s.call(this, t, e, i, h),
                  void 0 !== r && (this._result = r);
              }
              return (
                s && (t.__proto__ = s),
                (((t.prototype = Object.create(
                  s && s.prototype
                )).constructor = t).prototype._callResolve = function(t) {
                  !1 === t
                    ? this._promise._resolve(u(this._result))
                    : 0 == --this._rest
                      ? this._promise._resolve(this._result)
                      : 0 < this._callRest-- && this._iterate();
                }),
                t
              );
            })(r);
          function h(t) {
            return (
              s.call(this, t),
              void 0 !== this._keys || void 0 === this._coll
                ? (void 0 === this._result && (this._result = {}), (this._iterate = p))
                : (void 0 === this._result && (this._result = []), (this._iterate = _)),
              this
            );
          }
          function _() {
            var t = this._index++;
            l(c(this._iterator, this._result, this._coll[t], t), this, t);
          }
          function p() {
            var t = this._index++,
              e = this._keys[t];
            l(c(this._iterator, this._result, this._coll[e], e), this, t);
          }
          e.exports = {
            transformLimit: function(t, e, i, r) {
              return new a(t, e, i, r)._execute();
            },
            TransformLimit: a
          };
        },
        { './eachLimit': 14, './internal/collection': 37, './internal/util': 40 }
      ],
      82: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = t('./internal/util'),
            n = o.call3,
            c = o.callProxyReciever,
            l = o.clone,
            u = (function(r) {
              function t(t, e, i) {
                r.call(this, t, e, a), void 0 !== i && (this._result = i);
              }
              return (
                r && (t.__proto__ = r),
                (((t.prototype = Object.create(
                  r && r.prototype
                )).constructor = t).prototype._callResolve = function(t) {
                  !1 === t
                    ? this._promise._resolve(l(this._result))
                    : 0 == --this._rest
                      ? this._promise._resolve(this._result)
                      : this._iterate();
                }),
                t
              );
            })(r);
          function a(t) {
            return (
              s.call(this, t),
              void 0 !== this._keys || void 0 === this._coll
                ? (void 0 === this._result && (this._result = {}), (this._iterate = _))
                : (void 0 === this._result && (this._result = []), (this._iterate = h)),
              this
            );
          }
          function h() {
            var t = this._index++;
            c(n(this._iterator, this._result, this._coll[t], t), this, t);
          }
          function _() {
            var t = this._index++,
              e = this._keys[t];
            c(n(this._iterator, this._result, this._coll[e], e), this, t);
          }
          e.exports = {
            transformSeries: function(t, e, i) {
              return new u(t, e, i)._execute();
            },
            TransformSeries: u
          };
        },
        { './eachSeries': 15, './internal/collection': 37, './internal/util': 40 }
      ],
      83: [
        function(t, e, i) {
          'use strict';
          var r = t('./whilst'),
            s = r.AigleWhilst,
            o = (function(e) {
              function t(t) {
                e.call(this, t);
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(
                  e && e.prototype
                )).constructor = t).prototype._callResolve = function(t) {
                  t ? this._proxy._promise._resolve(this._value) : this._proxy._next(this._value);
                }),
                t
              );
            })(r.WhilstTester);
          e.exports = {
            until: function(t, e, i) {
              'function' != typeof i && ((i = e), (e = t), (t = void 0));
              return new s(new o(e), i)._iterate(t);
            },
            UntilTester: o
          };
        },
        { './whilst': 85 }
      ],
      84: [
        function(t, e, i) {
          'use strict';
          function n(t, e) {
            (this._promise = t), (this._handler = e);
          }
          var r = t('aigle-core').AigleProxy,
            c = t('./aigle'),
            s = t('./internal/util'),
            l = s.INTERNAL,
            u = s.apply,
            o = s.call1,
            a = s.callProxyReciever,
            h = {};
          n.prototype._dispose = function() {
            var t = this,
              e = this._promise;
            switch (e._resolved) {
              case 0:
                return e.then(function() {
                  return t._dispose();
                });
              case 1:
                return o(this._handler, this._promise._value);
            }
          };
          var _ = (function(o) {
            function t(t, e) {
              o.call(this);
              var i = t.length;
              (this._promise = new c(l)),
                (this._rest = i),
                (this._disposed = i),
                (this._array = t),
                (this._error = void 0),
                (this._result = Array(i)),
                (this._handler = e);
              for (var r = -1; ++r < i; ) {
                var s = t[r];
                a(s instanceof n == !1 ? s : s._promise, this, r);
              }
            }
            return (
              o && (t.__proto__ = o),
              (((t.prototype = Object.create(
                o && o.prototype
              )).constructor = t).prototype._spread = function() {
                var t = this._handler,
                  e = this._result;
                if ('function' != typeof t) return this._callResolve(void 0, l);
                a(u(t, e), this, l);
              }),
              (t.prototype._release = function() {
                for (var t = this._array, e = t.length; e--; ) {
                  var i = t[e];
                  i instanceof n == !1 ? this._callResolve(i, h) : a(i._dispose(), this, h);
                }
              }),
              (t.prototype._callResolve = function(t, e) {
                if (e === l) return (this._result = t), this._release();
                e !== h
                  ? ((this._result[e] = t), 0 == --this._rest && this._spread())
                  : 0 == --this._disposed &&
                    (this._error
                      ? this._promise._reject(this._error)
                      : this._promise._resolve(this._result));
              }),
              (t.prototype._callReject = function(t) {
                if (this._error) return this._promise._reject(t);
                (this._error = t), this._release();
              }),
              t
            );
          })(r);
          e.exports = {
            using: function() {
              var t = arguments,
                e = arguments.length,
                i = arguments[--e],
                r = Array(e);
              for (; e--; ) r[e] = t[e];
              return new _(r, i)._promise;
            },
            Disposer: n
          };
        },
        { './aigle': 2, './internal/util': 40, 'aigle-core': 86 }
      ],
      85: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.callProxyReciever,
            l = o.call1,
            u = (function(e) {
              function t(t) {
                e.call(this), (this._tester = t), (this._proxy = void 0), (this._value = void 0);
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(
                  e && e.prototype
                )).constructor = t).prototype._test = function(t) {
                  (this._value = t), c(l(this._tester, t), this, void 0);
                }),
                (t.prototype._callResolve = function(t) {
                  t ? this._proxy._next(this._value) : this._proxy._promise._resolve(this._value);
                }),
                (t.prototype._callReject = function(t) {
                  this._proxy._callReject(t);
                }),
                t
              );
            })(r),
            a = (function(i) {
              function t(t, e) {
                i.call(this),
                  (this._promise = new s(n)),
                  (this._tester = t),
                  (this._iterator = e),
                  (t._proxy = this);
              }
              return (
                i && (t.__proto__ = i),
                (((t.prototype = Object.create(
                  i && i.prototype
                )).constructor = t).prototype._iterate = function(t) {
                  return this._callResolve(t), this._promise;
                }),
                (t.prototype._next = function(t) {
                  c(l(this._iterator, t), this, void 0);
                }),
                (t.prototype._callResolve = function(t) {
                  this._tester._test(t);
                }),
                (t.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                t
              );
            })(r);
          e.exports = {
            whilst: function(t, e, i) {
              'function' != typeof i && ((i = e), (e = t), (t = void 0));
              return new a(new u(e), i)._iterate(t);
            },
            AigleWhilst: a,
            WhilstTester: u
          };
        },
        { './aigle': 2, './internal/util': 40, 'aigle-core': 86 }
      ],
      86: [
        function(t, e, i) {
          'use strict';
          e.exports = { AigleCore: function() {}, AigleProxy: function() {} };
        },
        {}
      ],
      87: [
        function(t, e, i) {
          var r,
            s,
            o = (e.exports = {});
          function n() {
            throw new Error('setTimeout has not been defined');
          }
          function c() {
            throw new Error('clearTimeout has not been defined');
          }
          function l(e) {
            if (r === setTimeout) return setTimeout(e, 0);
            if ((r === n || !r) && setTimeout) return (r = setTimeout), setTimeout(e, 0);
            try {
              return r(e, 0);
            } catch (t) {
              try {
                return r.call(null, e, 0);
              } catch (t) {
                return r.call(this, e, 0);
              }
            }
          }
          !(function() {
            try {
              r = 'function' == typeof setTimeout ? setTimeout : n;
            } catch (t) {
              r = n;
            }
            try {
              s = 'function' == typeof clearTimeout ? clearTimeout : c;
            } catch (t) {
              s = c;
            }
          })();
          var u,
            a = [],
            h = !1,
            _ = -1;
          function p() {
            h && u && ((h = !1), u.length ? (a = u.concat(a)) : (_ = -1), a.length && f());
          }
          function f() {
            if (!h) {
              var t = l(p);
              h = !0;
              for (var e = a.length; e; ) {
                for (u = a, a = []; ++_ < e; ) u && u[_].run();
                (_ = -1), (e = a.length);
              }
              (u = null),
                (h = !1),
                (function(e) {
                  if (s === clearTimeout) return clearTimeout(e);
                  if ((s === c || !s) && clearTimeout) return (s = clearTimeout), clearTimeout(e);
                  try {
                    s(e);
                  } catch (t) {
                    try {
                      return s.call(null, e);
                    } catch (t) {
                      return s.call(this, e);
                    }
                  }
                })(t);
            }
          }
          function y(t, e) {
            (this.fun = t), (this.array = e);
          }
          function v() {}
          (o.nextTick = function(t) {
            var e = arguments,
              i = new Array(arguments.length - 1);
            if (1 < arguments.length) for (var r = 1; r < arguments.length; r++) i[r - 1] = e[r];
            a.push(new y(t, i)), 1 !== a.length || h || l(f);
          }),
            (y.prototype.run = function() {
              this.fun.apply(null, this.array);
            }),
            (o.title = 'browser'),
            (o.browser = !0),
            (o.env = {}),
            (o.argv = []),
            (o.version = ''),
            (o.versions = {}),
            (o.on = v),
            (o.addListener = v),
            (o.once = v),
            (o.off = v),
            (o.removeListener = v),
            (o.removeAllListeners = v),
            (o.emit = v),
            (o.prependListener = v),
            (o.prependOnceListener = v),
            (o.listeners = function(t) {
              return [];
            }),
            (o.binding = function(t) {
              throw new Error('process.binding is not supported');
            }),
            (o.cwd = function() {
              return '/';
            }),
            (o.chdir = function(t) {
              throw new Error('process.chdir is not supported');
            }),
            (o.umask = function() {
              return 0;
            });
        },
        {}
      ],
      88: [
        function(t, e, i) {
          (function(f, t) {
            !(function(i, r) {
              'use strict';
              if (!i.setImmediate) {
                var o,
                  s,
                  e,
                  n,
                  c = 1,
                  l = {},
                  u = !1,
                  a = i.document,
                  t = Object.getPrototypeOf && Object.getPrototypeOf(i);
                (t = t && t.setTimeout ? t : i),
                  (o =
                    '[object process]' === {}.toString.call(i.process)
                      ? function(t) {
                          f.nextTick(function() {
                            _(t);
                          });
                        }
                      : (function() {
                          if (i.postMessage && !i.importScripts) {
                            var t = !0,
                              e = i.onmessage;
                            return (
                              (i.onmessage = function() {
                                t = !1;
                              }),
                              i.postMessage('', '*'),
                              (i.onmessage = e),
                              t
                            );
                          }
                        })()
                        ? ((n = 'setImmediate$' + Math.random() + '$'),
                          i.addEventListener
                            ? i.addEventListener('message', p, !1)
                            : i.attachEvent('onmessage', p),
                          function(t) {
                            i.postMessage(n + t, '*');
                          })
                        : i.MessageChannel
                          ? (((e = new MessageChannel()).port1.onmessage = function(t) {
                              _(t.data);
                            }),
                            function(t) {
                              e.port2.postMessage(t);
                            })
                          : a && 'onreadystatechange' in a.createElement('script')
                            ? ((s = a.documentElement),
                              function(t) {
                                var e = a.createElement('script');
                                (e.onreadystatechange = function() {
                                  _(t), (e.onreadystatechange = null), s.removeChild(e), (e = null);
                                }),
                                  s.appendChild(e);
                              })
                            : function(t) {
                                setTimeout(_, 0, t);
                              }),
                  (t.setImmediate = function(t) {
                    var e = arguments;
                    'function' != typeof t && (t = new Function('' + t));
                    for (var i = new Array(arguments.length - 1), r = 0; r < i.length; r++)
                      i[r] = e[r + 1];
                    var s = { callback: t, args: i };
                    return (l[c] = s), o(c), c++;
                  }),
                  (t.clearImmediate = h);
              }
              function h(t) {
                delete l[t];
              }
              function _(t) {
                if (u) setTimeout(_, 0, t);
                else {
                  var e = l[t];
                  if (e) {
                    u = !0;
                    try {
                      !(function(t) {
                        var e = t.callback,
                          i = t.args;
                        switch (i.length) {
                          case 0:
                            e();
                            break;
                          case 1:
                            e(i[0]);
                            break;
                          case 2:
                            e(i[0], i[1]);
                            break;
                          case 3:
                            e(i[0], i[1], i[2]);
                            break;
                          default:
                            e.apply(r, i);
                        }
                      })(e);
                    } finally {
                      h(t), (u = !1);
                    }
                  }
                }
              }
              function p(t) {
                t.source === i &&
                  'string' == typeof t.data &&
                  0 === t.data.indexOf(n) &&
                  _(+t.data.slice(n.length));
              }
            })('undefined' == typeof self ? (void 0 === t ? this : t) : self);
          }.call(
            this,
            t('_process'),
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                  ? window
                  : {}
          ));
        },
        { _process: 87 }
      ],
      89: [
        function(t, e, i) {
          'function' == typeof Object.create
            ? (e.exports = function(t, e) {
                (t.super_ = e),
                  (t.prototype = Object.create(e.prototype, {
                    constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 }
                  }));
              })
            : (e.exports = function(t, e) {
                t.super_ = e;
                function i() {}
                (i.prototype = e.prototype), (t.prototype = new i()), (t.prototype.constructor = t);
              });
        },
        {}
      ],
      90: [
        function(t, e, i) {
          e.exports = function(t) {
            return (
              t &&
              'object' == typeof t &&
              'function' == typeof t.copy &&
              'function' == typeof t.fill &&
              'function' == typeof t.readUInt8
            );
          };
        },
        {}
      ],
      91: [
        function(w, t, k) {
          (function(r, s) {
            var l = /%[sdj%]/g;
            (k.format = function(t) {
              var e = arguments;
              if (!g(t)) {
                for (var i = [], r = 0; r < arguments.length; r++) i.push(u(e[r]));
                return i.join(' ');
              }
              r = 1;
              for (
                var s = arguments,
                  o = s.length,
                  n = String(t).replace(l, function(t) {
                    if ('%%' === t) return '%';
                    if (o <= r) return t;
                    switch (t) {
                      case '%s':
                        return String(s[r++]);
                      case '%d':
                        return Number(s[r++]);
                      case '%j':
                        try {
                          return JSON.stringify(s[r++]);
                        } catch (t) {
                          return '[Circular]';
                        }
                      default:
                        return t;
                    }
                  }),
                  c = s[r];
                r < o;
                c = s[++r]
              )
                m(c) || !a(c) ? (n += ' ' + c) : (n += ' ' + u(c));
              return n;
            }),
              (k.deprecate = function(t, e) {
                if (x(s.process))
                  return function() {
                    return k.deprecate(t, e).apply(this, arguments);
                  };
                if (!0 === r.noDeprecation) return t;
                var i = !1;
                return function() {
                  if (!i) {
                    if (r.throwDeprecation) throw new Error(e);
                    r.traceDeprecation ? console.trace(e) : console.error(e), (i = !0);
                  }
                  return t.apply(this, arguments);
                };
              });
            var t,
              o = {};
            function u(t, e) {
              var i = { seen: [], stylize: c };
              return (
                3 <= arguments.length && (i.depth = arguments[2]),
                4 <= arguments.length && (i.colors = arguments[3]),
                v(e) ? (i.showHidden = e) : e && k._extend(i, e),
                x(i.showHidden) && (i.showHidden = !1),
                x(i.depth) && (i.depth = 2),
                x(i.colors) && (i.colors = !1),
                x(i.customInspect) && (i.customInspect = !0),
                i.colors && (i.stylize = n),
                _(i, t, i.depth)
              );
            }
            function n(t, e) {
              var i = u.styles[e];
              return i ? '[' + u.colors[i][0] + 'm' + t + '[' + u.colors[i][1] + 'm' : t;
            }
            function c(t, e) {
              return t;
            }
            function _(e, i, r) {
              if (
                e.customInspect &&
                i &&
                L(i.inspect) &&
                i.inspect !== k.inspect &&
                (!i.constructor || i.constructor.prototype !== i)
              ) {
                var t = i.inspect(r, e);
                return g(t) || (t = _(e, t, r)), t;
              }
              var s = (function(t, e) {
                if (x(e)) return t.stylize('undefined', 'undefined');
                if (g(e)) {
                  var i =
                    "'" +
                    JSON.stringify(e)
                      .replace(/^"|"$/g, '')
                      .replace(/'/g, "\\'")
                      .replace(/\\"/g, '"') +
                    "'";
                  return t.stylize(i, 'string');
                }
                if (d(e)) return t.stylize('' + e, 'number');
                if (v(e)) return t.stylize('' + e, 'boolean');
                if (m(e)) return t.stylize('null', 'null');
              })(e, i);
              if (s) return s;
              var o = Object.keys(i),
                n = (function(t) {
                  var e = {};
                  return (
                    t.forEach(function(t) {
                      e[t] = !0;
                    }),
                    e
                  );
                })(o);
              if (
                (e.showHidden && (o = Object.getOwnPropertyNames(i)),
                j(i) && (0 <= o.indexOf('message') || 0 <= o.indexOf('description')))
              )
                return p(i);
              if (0 === o.length) {
                if (L(i)) {
                  var c = i.name ? ': ' + i.name : '';
                  return e.stylize('[Function' + c + ']', 'special');
                }
                if (S(i)) return e.stylize(RegExp.prototype.toString.call(i), 'regexp');
                if (R(i)) return e.stylize(Date.prototype.toString.call(i), 'date');
                if (j(i)) return p(i);
              }
              var l,
                u = '',
                a = !1,
                h = ['{', '}'];
              y(i) && ((a = !0), (h = ['[', ']'])),
                L(i) && (u = ' [Function' + (i.name ? ': ' + i.name : '') + ']');
              return (
                S(i) && (u = ' ' + RegExp.prototype.toString.call(i)),
                R(i) && (u = ' ' + Date.prototype.toUTCString.call(i)),
                j(i) && (u = ' ' + p(i)),
                0 !== o.length || (a && 0 != i.length)
                  ? r < 0
                    ? S(i)
                      ? e.stylize(RegExp.prototype.toString.call(i), 'regexp')
                      : e.stylize('[Object]', 'special')
                    : (e.seen.push(i),
                      (l = a
                        ? (function(e, i, r, s, t) {
                            for (var o = [], n = 0, c = i.length; n < c; ++n)
                              b(i, String(n)) ? o.push(f(e, i, r, s, String(n), !0)) : o.push('');
                            return (
                              t.forEach(function(t) {
                                t.match(/^\d+$/) || o.push(f(e, i, r, s, t, !0));
                              }),
                              o
                            );
                          })(e, i, r, n, o)
                        : o.map(function(t) {
                            return f(e, i, r, n, t, a);
                          })),
                      e.seen.pop(),
                      (function(t, e, i) {
                        if (
                          60 <
                          t.reduce(function(t, e) {
                            return (
                              0,
                              0 <= e.indexOf('\n') && 0,
                              t + e.replace(/\u001b\[\d\d?m/g, '').length + 1
                            );
                          }, 0)
                        )
                          return (
                            i[0] + ('' === e ? '' : e + '\n ') + ' ' + t.join(',\n  ') + ' ' + i[1]
                          );
                        return i[0] + e + ' ' + t.join(', ') + ' ' + i[1];
                      })(l, u, h))
                  : h[0] + u + h[1]
              );
            }
            function p(t) {
              return '[' + Error.prototype.toString.call(t) + ']';
            }
            function f(t, e, i, r, s, o) {
              var n, c, l;
              if (
                ((l = Object.getOwnPropertyDescriptor(e, s) || { value: e[s] }).get
                  ? (c = l.set
                      ? t.stylize('[Getter/Setter]', 'special')
                      : t.stylize('[Getter]', 'special'))
                  : l.set && (c = t.stylize('[Setter]', 'special')),
                b(r, s) || (n = '[' + s + ']'),
                c ||
                  (t.seen.indexOf(l.value) < 0
                    ? -1 < (c = m(i) ? _(t, l.value, null) : _(t, l.value, i - 1)).indexOf('\n') &&
                      (c = o
                        ? c
                            .split('\n')
                            .map(function(t) {
                              return '  ' + t;
                            })
                            .join('\n')
                            .substr(2)
                        : '\n' +
                          c
                            .split('\n')
                            .map(function(t) {
                              return '   ' + t;
                            })
                            .join('\n'))
                    : (c = t.stylize('[Circular]', 'special'))),
                x(n))
              ) {
                if (o && s.match(/^\d+$/)) return c;
                n = (n = JSON.stringify('' + s)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
                  ? ((n = n.substr(1, n.length - 2)), t.stylize(n, 'name'))
                  : ((n = n
                      .replace(/'/g, "\\'")
                      .replace(/\\"/g, '"')
                      .replace(/(^"|"$)/g, "'")),
                    t.stylize(n, 'string'));
              }
              return n + ': ' + c;
            }
            function y(t) {
              return Array.isArray(t);
            }
            function v(t) {
              return 'boolean' == typeof t;
            }
            function m(t) {
              return null === t;
            }
            function d(t) {
              return 'number' == typeof t;
            }
            function g(t) {
              return 'string' == typeof t;
            }
            function x(t) {
              return void 0 === t;
            }
            function S(t) {
              return a(t) && '[object RegExp]' === e(t);
            }
            function a(t) {
              return 'object' == typeof t && null !== t;
            }
            function R(t) {
              return a(t) && '[object Date]' === e(t);
            }
            function j(t) {
              return a(t) && ('[object Error]' === e(t) || t instanceof Error);
            }
            function L(t) {
              return 'function' == typeof t;
            }
            function e(t) {
              return Object.prototype.toString.call(t);
            }
            function i(t) {
              return t < 10 ? '0' + t.toString(10) : t.toString(10);
            }
            (k.debuglog = function(e) {
              if ((x(t) && (t = r.env.NODE_DEBUG || ''), (e = e.toUpperCase()), !o[e]))
                if (new RegExp('\\b' + e + '\\b', 'i').test(t)) {
                  var i = r.pid;
                  o[e] = function() {
                    var t = k.format.apply(k, arguments);
                    console.error('%s %d: %s', e, i, t);
                  };
                } else o[e] = function() {};
              return o[e];
            }),
              ((k.inspect = u).colors = {
                bold: [1, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                white: [37, 39],
                grey: [90, 39],
                black: [30, 39],
                blue: [34, 39],
                cyan: [36, 39],
                green: [32, 39],
                magenta: [35, 39],
                red: [31, 39],
                yellow: [33, 39]
              }),
              (u.styles = {
                special: 'cyan',
                number: 'yellow',
                boolean: 'yellow',
                undefined: 'grey',
                null: 'bold',
                string: 'green',
                date: 'magenta',
                regexp: 'red'
              }),
              (k.isArray = y),
              (k.isBoolean = v),
              (k.isNull = m),
              (k.isNullOrUndefined = function(t) {
                return null == t;
              }),
              (k.isNumber = d),
              (k.isString = g),
              (k.isSymbol = function(t) {
                return 'symbol' == typeof t;
              }),
              (k.isUndefined = x),
              (k.isRegExp = S),
              (k.isObject = a),
              (k.isDate = R),
              (k.isError = j),
              (k.isFunction = L),
              (k.isPrimitive = function(t) {
                return (
                  null === t ||
                  'boolean' == typeof t ||
                  'number' == typeof t ||
                  'string' == typeof t ||
                  'symbol' == typeof t ||
                  void 0 === t
                );
              }),
              (k.isBuffer = w('./support/isBuffer'));
            var h = [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ];
            function b(t, e) {
              return Object.prototype.hasOwnProperty.call(t, e);
            }
            (k.log = function() {
              console.log(
                '%s - %s',
                (function() {
                  var t = new Date(),
                    e = [i(t.getHours()), i(t.getMinutes()), i(t.getSeconds())].join(':');
                  return [t.getDate(), h[t.getMonth()], e].join(' ');
                })(),
                k.format.apply(k, arguments)
              );
            }),
              (k.inherits = w('inherits')),
              (k._extend = function(t, e) {
                if (!e || !a(e)) return t;
                for (var i = Object.keys(e), r = i.length; r--; ) t[i[r]] = e[i[r]];
                return t;
              });
          }.call(
            this,
            w('_process'),
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self
                ? self
                : 'undefined' != typeof window
                  ? window
                  : {}
          ));
        },
        { './support/isBuffer': 90, _process: 87, inherits: 89 }
      ],
      92: [
        function(t, e, i) {
          e.exports = {
            name: 'aigle',
            version: '1.14.1',
            description:
              'Aigle is an ideal Promise library, faster and more functional than other Promise libraries',
            main: 'index.js',
            typings: 'aigle.d.ts',
            private: !0,
            browser: 'browser.js',
            scripts: {
              'start:doc': 'cd website && npm start',
              build: 'npm-run-all build:*',
              'build:lib': 'gulp build',
              'build:type': 'typeg typings/aigle-base.d.ts --out typings/aigle.d.ts',
              bench: 'node --expose_gc ./benchmark -d',
              eslint: 'eslint . --ext .js',
              test: 'DELAY=50 npm-run-all -p eslint test:type test:cov',
              'test:mocha': 'mocha test/**/*.js',
              'test:cov': 'nyc npm run test:mocha',
              'test:type': 'cd typings && tsc',
              codecov: 'nyc report --reporter=lcovonly && codecov',
              'lint-staged': 'lint-staged',
              prettier:
                "prettier --write './benchmark/**/*.js' './gulp/**/*.js' './lib/**/*.js' './test/**/*.js' './typings/**/*.ts'"
            },
            homepage: 'https://github.com/suguru03/aigle',
            keywords: ['aigle', 'promise', 'async'],
            files: ['README.md', 'index.js', 'lib/', 'browser.js', 'dist/'],
            author: 'Suguru Motegi',
            license: 'MIT',
            devDependencies: {
              babili: '0.1.4',
              benchmark: '^2.1.1',
              bluebird: '^3.5.3',
              browserify: '^16.2.3',
              buble: '^0.19.6',
              codecov: '^3.2.0',
              docdash: '^1.0.0',
              eslint: '^5.0.0',
              'fs-extra': '^8.0.0',
              gulp: '^4.0.0',
              'gulp-bump': '^3.0.0',
              'gulp-git': '^2.8.1',
              'gulp-tag-version': '^1.3.0',
              husky: '^2.0.0',
              jsdoc: '^3.5.5',
              'lint-staged': '^8.0.5',
              lodash: '^4.15.0',
              minimist: '^1.2.0',
              mocha: '^6.1.4',
              'mocha.parallel': '0.15.6',
              'neo-async': '^2.6.0',
              'npm-run-all': '^4.1.5',
              nyc: '^14.0.0',
              prettier: '^1.14.3',
              'require-dir': '^1.0.0',
              semver: '^6.0.0',
              setimmediate: '^1.0.5',
              tslint: '^5.11.0',
              typeg: '^0.1.3',
              typescript: '^3.1.6',
              'uglify-js': '^3.5.14'
            },
            dependencies: { 'aigle-core': '^1.0.0' },
            husky: { hooks: { 'pre-commit': 'npm-run-all -p build:type lint-staged' } },
            'lint-staged': { '*.{js,ts}': ['prettier --write', 'git add'] },
            prettier: { printWidth: 100, singleQuote: !0 }
          };
        },
        {}
      ]
    },
    {},
    [1]
  )(1);
});
;window.Aigle = module.exports;