var exports = window, module = { exports: exports };!(function(t) {
  if ('object' == typeof exports && 'undefined' != typeof module) module.exports = t();
  else if ('function' == typeof define && define.amd) define([], t);
  else {
    ('undefined' != typeof window
      ? window
      : 'undefined' != typeof global ? global : 'undefined' != typeof self ? self : this
    ).Promise = t();
  }
})(function() {
  return (function() {
    return function t(e, i, r) {
      function s(n, c) {
        if (!i[n]) {
          if (!e[n]) {
            var l = 'function' == typeof require && require;
            if (!c && l) return l(n, !0);
            if (o) return o(n, !0);
            var u = new Error("Cannot find module '" + n + "'");
            throw ((u.code = 'MODULE_NOT_FOUND'), u);
          }
          var a = (i[n] = { exports: {} });
          e[n][0].call(
            a.exports,
            function(t) {
              var i = e[n][1][t];
              return s(i || t);
            },
            a,
            a.exports,
            t,
            e,
            i,
            r
          );
        }
        return i[n].exports;
      }
      for (var o = 'function' == typeof require && require, n = 0; n < r.length; n++) s(r[n]);
      return s;
    };
  })()(
    {
      1: [
        function(t, e, i) {
          'use strict';
          t('setimmediate'), (e.exports = t('./lib/aigle'));
        },
        { './lib/aigle': 2, setimmediate: 84 }
      ],
      2: [
        function(t, e, i) {
          (function(i) {
            'use strict';
            var r = t('aigle-core'),
              s = r.AigleCore,
              o = r.AigleProxy,
              n = t('./internal/queue'),
              c = t('./internal/async'),
              l = t('./internal/util'),
              u = l.VERSION,
              a = l.INTERNAL,
              h = l.PENDING,
              _ = l.UNHANDLED,
              p = l.errorObj,
              f = l.call0,
              y = l.callResolve,
              v = l.callReject,
              m = l.callReceiver,
              d = !1,
              g = (function(t) {
                function e(e) {
                  t.call(this),
                    (this._resolved = 0),
                    (this._value = void 0),
                    (this._key = void 0),
                    (this._receiver = void 0),
                    (this._onFulfilled = void 0),
                    (this._onRejected = void 0),
                    (this._receivers = void 0),
                    e !== a && this._execute(e);
                }
                return (
                  t && (e.__proto__ = t),
                  (e.prototype = Object.create(t && t.prototype)),
                  (e.prototype.constructor = e),
                  (e.prototype.then = function(t, i) {
                    return lr(this, new e(a), t, i);
                  }),
                  (e.prototype.catch = function(t) {
                    var i,
                      r,
                      s = arguments;
                    if (arguments.length > 1) {
                      var o = arguments.length;
                      if ('function' == typeof (t = arguments[--o])) {
                        for (var n = Array(o); o--; ) n[o] = s[o];
                        (i = n),
                          (r = t),
                          (t = function(t) {
                            for (var e = i.length; e--; ) {
                              var s = i[e];
                              if (s === Error || s.prototype instanceof Error) {
                                if (t instanceof s) return r(t);
                              } else if (s(t)) return r(t);
                            }
                            return (p.e = t), p;
                          });
                      }
                    }
                    return lr(this, new e(a), void 0, t);
                  }),
                  (e.prototype.finally = function(t) {
                    var i, r;
                    return (
                      (t =
                        'function' != typeof t
                          ? t
                          : ((i = this),
                            (r = t),
                            function() {
                              var t = i._resolved,
                                e = i._value,
                                o = f(r);
                              if (o === p) return o;
                              if (o instanceof s)
                                switch (o._resolved) {
                                  case 1:
                                    return (o._value = e), o;
                                  case 2:
                                    return o;
                                }
                              var n = new g(a);
                              return (
                                o && o.then
                                  ? 1 === t
                                    ? o.then(
                                        function() {
                                          return n._resolve(e);
                                        },
                                        function(t) {
                                          return n._reject(t);
                                        }
                                      )
                                    : o.then(
                                        function() {
                                          return n._reject(e);
                                        },
                                        function(t) {
                                          return n._reject(t);
                                        }
                                      )
                                  : ((n._resolved = t), (n._value = e)),
                                n
                              );
                            })),
                      lr(this, new e(a), t, t)
                    );
                  }),
                  (e.prototype.toString = function() {
                    return '[object Promise]';
                  }),
                  (e.prototype.isPending = function() {
                    return 0 === this._resolved;
                  }),
                  (e.prototype.isFulfilled = function() {
                    return 1 === this._resolved;
                  }),
                  (e.prototype.isRejected = function() {
                    return 2 === this._resolved;
                  }),
                  (e.prototype.isCancelled = function() {
                    return this._value instanceof rr;
                  }),
                  (e.prototype.value = function() {
                    return 1 === this._resolved ? this._value : void 0;
                  }),
                  (e.prototype.reason = function() {
                    return 2 === this._resolved ? this._value : void 0;
                  }),
                  (e.prototype.cancel = function() {
                    if (this._execute !== nr && 0 === this._resolved) {
                      var t = this._onCancelQueue;
                      if (t) {
                        var e = -1,
                          i = t.array;
                        for (this._onCancelQueue = void 0; ++e < t.length; ) i[e]();
                      }
                      (this._resolved = 2),
                        (this._value = new rr('late cancellation observer')),
                        this._parent && this._parent.cancel();
                    }
                  }),
                  (e.prototype.suppressUnhandledRejections = function() {
                    this._receiver = a;
                  }),
                  (e.prototype.spread = function(t) {
                    return ur(this, new wi(t));
                  }),
                  (e.prototype.all = function() {
                    return ar(this, x);
                  }),
                  (e.prototype.race = function() {
                    return ar(this, w);
                  }),
                  (e.prototype.props = function() {
                    return ar(this, A);
                  }),
                  (e.prototype.parallel = function() {
                    return ar(this, B);
                  }),
                  (e.prototype.each = function(t) {
                    return ar(this, T, t);
                  }),
                  (e.prototype.forEach = function(t) {
                    return ar(this, T, t);
                  }),
                  (e.prototype.eachSeries = function(t) {
                    return ar(this, F, t);
                  }),
                  (e.prototype.forEachSeries = function(t) {
                    return ar(this, F, t);
                  }),
                  (e.prototype.eachLimit = function(t, e) {
                    return ar(this, V, t, e);
                  }),
                  (e.prototype.forEachLimit = function(t, e) {
                    return ar(this, V, t, e);
                  }),
                  (e.prototype.map = function(t) {
                    return ar(this, G, t);
                  }),
                  (e.prototype.mapSeries = function(t) {
                    return ar(this, H, t);
                  }),
                  (e.prototype.mapLimit = function(t, e) {
                    return ar(this, Q, t, e);
                  }),
                  (e.prototype.mapValues = function(t) {
                    return ar(this, X, t);
                  }),
                  (e.prototype.mapValuesSeries = function(t) {
                    return ar(this, it, t);
                  }),
                  (e.prototype.mapValuesLimit = function(t, e) {
                    return ar(this, ot, t, e);
                  }),
                  (e.prototype.filter = function(t) {
                    return ar(this, lt, t);
                  }),
                  (e.prototype.filterSeries = function(t) {
                    return ar(this, ht, t);
                  }),
                  (e.prototype.filterLimit = function(t, e) {
                    return ar(this, ft, t, e);
                  }),
                  (e.prototype.reject = function(t) {
                    return ar(this, mt, t);
                  }),
                  (e.prototype.rejectSeries = function(t) {
                    return ar(this, Rt, t);
                  }),
                  (e.prototype.rejectLimit = function(t, e) {
                    return ar(this, St, t, e);
                  }),
                  (e.prototype.find = function(t) {
                    return ar(this, wt, t);
                  }),
                  (e.prototype.findSeries = function(t) {
                    return ar(this, At, t);
                  }),
                  (e.prototype.findLimit = function(t, e) {
                    return ar(this, Bt, t, e);
                  }),
                  (e.prototype.findIndex = function(t) {
                    return ar(this, Tt, t);
                  }),
                  (e.prototype.findIndexSeries = function(t) {
                    return ar(this, Ft, t);
                  }),
                  (e.prototype.findIndexLimit = function(t, e) {
                    return ar(this, Vt, t, e);
                  }),
                  (e.prototype.findKey = function(t) {
                    return ar(this, Gt, t);
                  }),
                  (e.prototype.findKeySeries = function(t) {
                    return ar(this, Ht, t);
                  }),
                  (e.prototype.findKeyLimit = function(t, e) {
                    return ar(this, Qt, t, e);
                  }),
                  (e.prototype.pick = function(t) {
                    for (var e = [], i = arguments.length - 1; i-- > 0; ) e[i] = arguments[i + 1];
                    return ar(this, Xt, t, e);
                  }),
                  (e.prototype.pickSeries = function(t) {
                    return this.pickBySeries(t);
                  }),
                  (e.prototype.pickLimit = function(t, e) {
                    return this.pickByLimit(t, e);
                  }),
                  (e.prototype.pickBy = function(t) {
                    return ar(this, ie, t);
                  }),
                  (e.prototype.pickBySeries = function(t) {
                    return ar(this, oe, t);
                  }),
                  (e.prototype.pickByLimit = function(t, e) {
                    return ar(this, le, t, e);
                  }),
                  (e.prototype.omit = function(t) {
                    for (var e = [], i = arguments.length - 1; i-- > 0; ) e[i] = arguments[i + 1];
                    return ar(this, he, t, e);
                  }),
                  (e.prototype.omitSeries = function(t) {
                    return this.omitBySeries(t);
                  }),
                  (e.prototype.omitLimit = function(t, e) {
                    return this.omitByLimit(t, e);
                  }),
                  (e.prototype.omitBy = function(t) {
                    return ar(this, fe, t);
                  }),
                  (e.prototype.omitBySeries = function(t) {
                    return ar(this, me, t);
                  }),
                  (e.prototype.omitByLimit = function(t, e) {
                    return ar(this, Re, t, e);
                  }),
                  (e.prototype.reduce = function(t, e) {
                    return ar(this, Se, t, e);
                  }),
                  (e.prototype.transform = function(t, e) {
                    return ar(this, we, t, e);
                  }),
                  (e.prototype.transformSeries = function(t, e) {
                    return ar(this, Ae, t, e);
                  }),
                  (e.prototype.transformLimit = function(t, e, i) {
                    return ar(this, Be, t, e, i);
                  }),
                  (e.prototype.sortBy = function(t) {
                    return ar(this, Te, t);
                  }),
                  (e.prototype.sortBySeries = function(t) {
                    return ar(this, Fe, t);
                  }),
                  (e.prototype.sortByLimit = function(t, e) {
                    return ar(this, Ve, t, e);
                  }),
                  (e.prototype.some = function(t) {
                    return ar(this, Ge, t);
                  }),
                  (e.prototype.someSeries = function(t) {
                    return ar(this, He, t);
                  }),
                  (e.prototype.someLimit = function(t, e) {
                    return ar(this, Qe, t, e);
                  }),
                  (e.prototype.every = function(t) {
                    return ar(this, Xe, t);
                  }),
                  (e.prototype.everySeries = function(t) {
                    return ar(this, ii, t);
                  }),
                  (e.prototype.everyLimit = function(t, e) {
                    return ar(this, oi, t, e);
                  }),
                  (e.prototype.concat = function(t) {
                    return ar(this, li, t);
                  }),
                  (e.prototype.concatSeries = function(t) {
                    return ar(this, hi, t);
                  }),
                  (e.prototype.concatLimit = function(t, e) {
                    return ar(this, fi, t, e);
                  }),
                  (e.prototype.groupBy = function(t) {
                    return ar(this, mi, t);
                  }),
                  (e.prototype.groupBySeries = function(t) {
                    return ar(this, Ri, t);
                  }),
                  (e.prototype.groupByLimit = function(t, e) {
                    return ar(this, Si, t, e);
                  }),
                  (e.prototype.delay = function(t) {
                    return lr(this, new Ni(t));
                  }),
                  (e.prototype.timeout = function(t, e) {
                    return ur(this, new Bi(t, e));
                  }),
                  (e.prototype.whilst = function(t, e) {
                    return this.then(function(i) {
                      return Pi(i, t, e);
                    });
                  }),
                  (e.prototype.doWhilst = function(t, e) {
                    return this.then(function(i) {
                      return Ii(i, t, e);
                    });
                  }),
                  (e.prototype.until = function(t, e) {
                    return this.then(function(i) {
                      return Ti(i, t, e);
                    });
                  }),
                  (e.prototype.doUntil = function(t, e) {
                    return this.then(function(i) {
                      return zi(i, t, e);
                    });
                  }),
                  (e.prototype.thru = function(t) {
                    return this.then(function(e) {
                      return Fi(e, t);
                    });
                  }),
                  (e.prototype.tap = function(t) {
                    return this.then(function(e) {
                      return Mi(e, t);
                    });
                  }),
                  (e.prototype.times = function(t) {
                    return ar(this, Ci, t);
                  }),
                  (e.prototype.timesSeries = function(t) {
                    return ar(this, Ki, t);
                  }),
                  (e.prototype.timesLimit = function(t, e) {
                    return ar(this, $i, t, e);
                  }),
                  (e.prototype.disposer = function(t) {
                    return new Zi(this, t);
                  }),
                  (e.prototype._resolve = function(t) {
                    0 === this._resolved &&
                      ((this._resolved = 1), (this._value = t), void 0 !== this._receiver && this._callResolve());
                  }),
                  (e.prototype._callResolve = function() {
                    var t = this._receiver;
                    if (
                      ((this._receiver = void 0),
                      t instanceof o
                        ? t._callResolve(this._value, this._key)
                        : this._key === a ? t._resolve(this._value) : y(t, this._onFulfilled, this._value),
                      this._receivers)
                    ) {
                      var e = this._value,
                        i = this._key,
                        r = this._receivers;
                      this._receivers = void 0;
                      for (var s = -1, n = r.array; ++s < r.length; ) {
                        var c = n[s],
                          l = c.receiver,
                          u = c.onFulfilled;
                        l instanceof o ? l._callResolve(e, i) : y(l, u, e);
                      }
                    }
                  }),
                  (e.prototype._reject = function(t) {
                    if (0 === this._resolved) {
                      if (((this._resolved = 2), (this._value = t), void 0 === this._receiver))
                        return (this._receiver = _), void c(this);
                      d && tr(this), this._callReject();
                    }
                  }),
                  (e.prototype._callReject = function() {
                    var t = this._receiver;
                    if (((this._receiver = void 0), void 0 !== t && t !== _)) {
                      if (
                        t !== a &&
                        (t instanceof o
                          ? t._callReject(this._value)
                          : this._key === a ? t._reject(this._value) : v(t, this._onRejected, this._value),
                        this._receivers)
                      ) {
                        var e = this._value,
                          r = this._receivers;
                        this._receivers = void 0;
                        for (var s = -1, n = r.array; ++s < r.length; ) {
                          var c = n[s],
                            l = c.receiver,
                            u = c.onRejected;
                          l instanceof o ? l._callReject(e) : v(l, u, e);
                        }
                      }
                    } else i.emit('unhandledRejection', this._value);
                  }),
                  (e.prototype._addReceiver = function(t, e) {
                    (this._key = e), (this._receiver = t);
                  }),
                  e
                );
              })(s);
            (g.prototype._execute = nr), (e.exports = g), (e.exports.default = g);
            var R = t('./all'),
              j = R.all,
              x = R.All,
              S = t('./attempt'),
              L = t('./race'),
              b = L.race,
              w = L.Race,
              k = t('./props'),
              E = k.props,
              A = k.Props,
              O = t('./parallel'),
              N = O.parallel,
              B = O.Parallel,
              P = t('./each'),
              I = P.each,
              T = P.Each,
              z = t('./eachSeries'),
              D = z.eachSeries,
              F = z.EachSeries,
              M = t('./eachLimit'),
              W = M.eachLimit,
              V = M.EachLimit,
              C = t('./map'),
              U = C.map,
              G = C.Map,
              K = t('./mapSeries'),
              q = K.mapSeries,
              H = K.MapSeries,
              $ = t('./mapLimit'),
              J = $.mapLimit,
              Q = $.MapLimit,
              Z = t('./mapValues'),
              Y = Z.mapValues,
              X = Z.MapValues,
              tt = t('./mapValuesSeries'),
              et = tt.mapValuesSeries,
              it = tt.MapValuesSeries,
              rt = t('./mapValuesLimit'),
              st = rt.mapValuesLimit,
              ot = rt.MapValuesLimit,
              nt = t('./filter'),
              ct = nt.filter,
              lt = nt.Filter,
              ut = t('./filterSeries'),
              at = ut.filterSeries,
              ht = ut.FilterSeries,
              _t = t('./filterLimit'),
              pt = _t.filterLimit,
              ft = _t.FilterLimit,
              yt = t('./reject'),
              vt = yt.reject,
              mt = yt.Reject,
              dt = t('./rejectSeries'),
              gt = dt.rejectSeries,
              Rt = dt.RejectSeries,
              jt = t('./rejectLimit'),
              xt = jt.rejectLimit,
              St = jt.RejectLimit,
              Lt = t('./find'),
              bt = Lt.find,
              wt = Lt.Find,
              kt = t('./findSeries'),
              Et = kt.findSeries,
              At = kt.FindSeries,
              Ot = t('./findLimit'),
              Nt = Ot.findLimit,
              Bt = Ot.FindLimit,
              Pt = t('./findIndex'),
              It = Pt.findIndex,
              Tt = Pt.FindIndex,
              zt = t('./findIndexSeries'),
              Dt = zt.findIndexSeries,
              Ft = zt.FindIndexSeries,
              Mt = t('./findIndexLimit'),
              Wt = Mt.findIndexLimit,
              Vt = Mt.FindIndexLimit,
              Ct = t('./findKey'),
              Ut = Ct.findKey,
              Gt = Ct.FindKey,
              Kt = t('./findKeySeries'),
              qt = Kt.findKeySeries,
              Ht = Kt.FindKeySeries,
              $t = t('./findKeyLimit'),
              Jt = $t.findKeyLimit,
              Qt = $t.FindKeyLimit,
              Zt = t('./pick'),
              Yt = Zt.pick,
              Xt = Zt.Pick,
              te = t('./pickBy'),
              ee = te.pickBy,
              ie = te.PickBy,
              re = t('./pickBySeries'),
              se = re.pickBySeries,
              oe = re.PickBySeries,
              ne = t('./pickByLimit'),
              ce = ne.pickByLimit,
              le = ne.PickByLimit,
              ue = t('./omit'),
              ae = ue.omit,
              he = ue.Omit,
              _e = t('./omitBy'),
              pe = _e.omitBy,
              fe = _e.OmitBy,
              ye = t('./omitBySeries'),
              ve = ye.omitBySeries,
              me = ye.OmitBySeries,
              de = t('./omitByLimit'),
              ge = de.omitByLimit,
              Re = de.OmitByLimit,
              je = t('./reduce'),
              xe = je.reduce,
              Se = je.Reduce,
              Le = t('./transform'),
              be = Le.transform,
              we = Le.Transform,
              ke = t('./transformSeries'),
              Ee = ke.transformSeries,
              Ae = ke.TransformSeries,
              Oe = t('./transformLimit'),
              Ne = Oe.transformLimit,
              Be = Oe.TransformLimit,
              Pe = t('./sortBy'),
              Ie = Pe.sortBy,
              Te = Pe.SortBy,
              ze = t('./sortBySeries'),
              De = ze.sortBySeries,
              Fe = ze.SortBySeries,
              Me = t('./sortByLimit'),
              We = Me.sortByLimit,
              Ve = Me.SortByLimit,
              Ce = t('./some'),
              Ue = Ce.some,
              Ge = Ce.Some,
              Ke = t('./someSeries'),
              qe = Ke.someSeries,
              He = Ke.SomeSeries,
              $e = t('./someLimit'),
              Je = $e.someLimit,
              Qe = $e.SomeLimit,
              Ze = t('./every'),
              Ye = Ze.every,
              Xe = Ze.Every,
              ti = t('./everySeries'),
              ei = ti.everySeries,
              ii = ti.EverySeries,
              ri = t('./everyLimit'),
              si = ri.everyLimit,
              oi = ri.EveryLimit,
              ni = t('./concat'),
              ci = ni.concat,
              li = ni.Concat,
              ui = t('./concatSeries'),
              ai = ui.concatSeries,
              hi = ui.ConcatSeries,
              _i = t('./concatLimit'),
              pi = _i.concatLimit,
              fi = _i.ConcatLimit,
              yi = t('./groupBy'),
              vi = yi.groupBy,
              mi = yi.GroupBy,
              di = t('./groupBySeries'),
              gi = di.groupBySeries,
              Ri = di.GroupBySeries,
              ji = t('./groupByLimit'),
              xi = ji.groupByLimit,
              Si = ji.GroupByLimit,
              Li = t('./join'),
              bi = Li.join,
              wi = Li.Spread,
              ki = t('./promisify'),
              Ei = t('./promisifyAll'),
              Ai = t('./delay'),
              Oi = Ai.delay,
              Ni = Ai.Delay,
              Bi = t('./timeout'),
              Pi = t('./whilst').whilst,
              Ii = t('./doWhilst').doWhilst,
              Ti = t('./until').until,
              zi = t('./doUntil'),
              Di = t('./retry'),
              Fi = t('./thru'),
              Mi = t('./tap'),
              Wi = t('./times'),
              Vi = Wi.times,
              Ci = Wi.Times,
              Ui = t('./timesSeries'),
              Gi = Ui.timesSeries,
              Ki = Ui.TimesSeries,
              qi = t('./timesLimit'),
              Hi = qi.timesLimit,
              $i = qi.TimesLimit,
              Ji = t('./using'),
              Qi = Ji.using,
              Zi = Ji.Disposer,
              Yi = t('./debug'),
              Xi = Yi.resolveStack,
              tr = Yi.reconstructStack,
              er = t('./internal/mixin').createProxy;
            (g.VERSION = u),
              (g.resolve = or),
              (g.reject = function(t, e) {
                if (2 === arguments.length && 'function' == typeof e) return vt(t, e);
                var i = new g(a);
                return i._reject(t), i;
              }),
              (g.all = j),
              (g.race = b),
              (g.props = E),
              (g.parallel = N),
              (g.each = I),
              (g.eachSeries = D),
              (g.eachLimit = W),
              (g.forEach = I),
              (g.forEachSeries = D),
              (g.forEachLimit = W),
              (g.map = U),
              (g.mapSeries = q),
              (g.mapLimit = J),
              (g.mapValues = Y),
              (g.mapValuesSeries = et),
              (g.mapValuesLimit = st),
              (g.filter = ct),
              (g.filterSeries = at),
              (g.filterLimit = pt),
              (g.rejectSeries = gt),
              (g.rejectLimit = xt),
              (g.find = bt),
              (g.findSeries = Et),
              (g.findLimit = Nt),
              (g.findIndex = It),
              (g.findIndexSeries = Dt),
              (g.findIndexLimit = Wt),
              (g.findKey = Ut),
              (g.findKeySeries = qt),
              (g.findKeyLimit = Jt),
              (g.detect = bt),
              (g.detectSeries = Et),
              (g.detectLimit = Nt),
              (g.pick = Yt),
              (g.pickSeries = se),
              (g.pickLimit = ce),
              (g.pickBy = ee),
              (g.pickBySeries = se),
              (g.pickByLimit = ce),
              (g.omit = ae),
              (g.omitSeries = ve),
              (g.omitLimit = ge),
              (g.omitBy = pe),
              (g.omitBySeries = ve),
              (g.omitByLimit = ge),
              (g.reduce = xe),
              (g.transform = be),
              (g.transformSeries = Ee),
              (g.transformLimit = Ne),
              (g.sortBy = Ie),
              (g.sortBySeries = De),
              (g.sortByLimit = We),
              (g.some = Ue),
              (g.someSeries = qe),
              (g.someLimit = Je),
              (g.every = Ye),
              (g.everySeries = ei),
              (g.everyLimit = si),
              (g.concat = ci),
              (g.concatSeries = ai),
              (g.concatLimit = pi),
              (g.groupBy = vi),
              (g.groupBySeries = gi),
              (g.groupByLimit = xi),
              (g.attempt = S),
              (g.try = S),
              (g.join = bi),
              (g.promisify = ki),
              (g.promisifyAll = Ei),
              (g.delay = Oi),
              (g.whilst = Pi),
              (g.doWhilst = Ii),
              (g.until = Ti),
              (g.doUntil = zi),
              (g.retry = Di),
              (g.thru = Fi),
              (g.tap = Mi),
              (g.times = Vi),
              (g.timesSeries = Gi),
              (g.timesLimit = Hi),
              (g.using = Qi),
              (g.mixin = function(t, e) {
                void 0 === e && (e = {});
                var i = e.override,
                  r = e.promisify;
                void 0 === r && (r = !0);
                return (
                  Object.getOwnPropertyNames(t).forEach(function(e) {
                    var s = t[e];
                    if ('function' == typeof s && (!g[e] || i)) {
                      if ('chain' === e) {
                        var o = s();
                        if (o && o.__chain__)
                          return (
                            (g.chain = or),
                            void (g.prototype.value = function() {
                              return this;
                            })
                          );
                      }
                      var n = er(s, r);
                      (g[e] = function(t, e, i, r) {
                        return new n(t, e, i, r)._execute();
                      }),
                        (g.prototype[e] = function(t, e, i) {
                          return ar(this, n, t, e, i);
                        });
                    }
                  }),
                  g
                );
              }),
              (g.config = function(t) {
                void 0 !== (t = t || {}).longStackTraces && (d = !!t.longStackTraces);
                void 0 !== t.cancellation && (g.prototype._execute = t.cancellation ? cr : nr);
              }),
              (g.longStackTraces = function() {
                d = !0;
              });
            var ir = t('./error'),
              rr = ir.CancellationError,
              sr = ir.TimeoutError;
            function or(t) {
              if (t instanceof s) return t;
              var e = new g(a);
              return m(e, t), e;
            }
            function nr(t) {
              var e = this;
              d && Xi(this);
              try {
                t(
                  function(i) {
                    void 0 !== t && ((t = void 0), m(e, i));
                  },
                  function(i) {
                    void 0 !== t && ((t = void 0), e._reject(i));
                  }
                );
              } catch (e) {
                if (void 0 === t) return;
                (t = void 0), this._reject(e);
              }
            }
            function cr(t) {
              var e = this;
              d && Xi(this);
              try {
                t(
                  function(i) {
                    void 0 !== t && (i instanceof g && 0 === i._resolved && (e._parent = i), (t = void 0), m(e, i));
                  },
                  function(i) {
                    void 0 !== t && ((t = void 0), e._reject(i));
                  },
                  function(t) {
                    if ('function' != typeof t) throw new TypeError('onCancel must be function');
                    0 === e._resolved &&
                      (void 0 === e._onCancelQueue && (e._onCancelQueue = new n()), e._onCancelQueue.push(t));
                  }
                );
              } catch (e) {
                if (void 0 === t) return;
                (t = void 0), this._reject(e);
              }
            }
            function lr(t, e, i, r) {
              return (
                d && Xi(e, t),
                void 0 === t._receiver || t._receiver === a
                  ? (0 !== t._resolved && c(t), (t._receiver = e), (t._onFulfilled = i), (t._onRejected = r))
                  : t._receiver === _
                    ? ((t._receiver = e), (t._onFulfilled = i), (t._onRejected = r))
                    : (t._receivers || (t._receivers = new n()),
                      t._receivers.push({ receiver: e, onFulfilled: i, onRejected: r })),
                e
              );
            }
            function ur(t, e) {
              return d && Xi(e, t), 0 !== t._resolved && c(t), (t._receiver = e), e._promise;
            }
            function ar(t, e, i, r, s) {
              if (d) {
                d = !1;
                var o = ar(t, e, i, r, s);
                return (d = !0), Xi(o, t), o;
              }
              switch (t._resolved) {
                case 0:
                  var c = new e(h, i, r, s);
                  return (
                    void 0 === t._receiver
                      ? (t._receiver = c)
                      : (t._receivers || (t._receivers = new n()), t._receivers.push({ receiver: c })),
                    c._promise
                  );
                case 1:
                  return new e(t._value, i, r, s)._execute();
                case 2:
                  return g.reject(t._value);
              }
            }
            (g.CancellationError = rr), (g.TimeoutError = sr);
          }.call(this, t('_process')));
        },
        {
          './all': 3,
          './attempt': 4,
          './concat': 5,
          './concatLimit': 6,
          './concatSeries': 7,
          './debug': 8,
          './delay': 9,
          './doUntil': 10,
          './doWhilst': 11,
          './each': 12,
          './eachLimit': 13,
          './eachSeries': 14,
          './error': 15,
          './every': 16,
          './everyLimit': 17,
          './everySeries': 18,
          './filter': 19,
          './filterLimit': 20,
          './filterSeries': 21,
          './find': 22,
          './findIndex': 23,
          './findIndexLimit': 24,
          './findIndexSeries': 25,
          './findKey': 26,
          './findKeyLimit': 27,
          './findKeySeries': 28,
          './findLimit': 29,
          './findSeries': 30,
          './groupBy': 31,
          './groupByLimit': 32,
          './groupBySeries': 33,
          './internal/async': 34,
          './internal/mixin': 36,
          './internal/queue': 37,
          './internal/util': 38,
          './join': 39,
          './map': 40,
          './mapLimit': 41,
          './mapSeries': 42,
          './mapValues': 43,
          './mapValuesLimit': 44,
          './mapValuesSeries': 45,
          './omit': 46,
          './omitBy': 47,
          './omitByLimit': 48,
          './omitBySeries': 49,
          './parallel': 50,
          './pick': 51,
          './pickBy': 52,
          './pickByLimit': 53,
          './pickBySeries': 54,
          './promisify': 55,
          './promisifyAll': 56,
          './props': 57,
          './race': 58,
          './reduce': 59,
          './reject': 60,
          './rejectLimit': 61,
          './rejectSeries': 62,
          './retry': 63,
          './some': 64,
          './someLimit': 65,
          './someSeries': 66,
          './sortBy': 67,
          './sortByLimit': 68,
          './sortBySeries': 69,
          './tap': 70,
          './thru': 71,
          './timeout': 72,
          './times': 73,
          './timesLimit': 74,
          './timesSeries': 75,
          './transform': 76,
          './transformLimit': 77,
          './transformSeries': 78,
          './until': 79,
          './using': 80,
          './whilst': 81,
          _process: 83,
          'aigle-core': 82
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
            l = o.promiseArrayEach,
            u = o.promiseSetEach,
            a = t('./props').callResolve,
            h = (function(t) {
              function e(e) {
                t.call(this),
                  (this._promise = new s(n)),
                  (this._rest = void 0),
                  (this._coll = void 0),
                  (this._result = void 0),
                  e === c ? (this._callResolve = this._set) : ((this._callResolve = void 0), this._set(e));
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._set = function(t) {
                  if (Array.isArray(t)) {
                    var e = t.length;
                    (this._rest = e), (this._coll = t), (this._result = Array(e)), (this._callResolve = a), l(this);
                  } else if (t instanceof Set) {
                    var i = t.size;
                    (this._rest = i), (this._coll = t), (this._result = Array(i)), (this._callResolve = a), u(this);
                  } else (this._rest = 0), (this._result = []);
                  return 0 === this._rest && this._promise._resolve(this._result), this;
                }),
                (e.prototype._execute = function() {
                  return this._promise;
                }),
                (e.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                e
              );
            })(r);
          e.exports = {
            all: function(t) {
              return new h(t)._promise;
            },
            All: h
          };
        },
        { './aigle': 2, './internal/util': 38, './props': 57, 'aigle-core': 82 }
      ],
      4: [
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
        { './aigle': 2, './internal/util': 38 }
      ],
      5: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/util').concatArray,
            o = t('./internal/collection').setParallel,
            n = (function(t) {
              function e(e, i) {
                t.call(this, e, i, c);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t, e) {
                  (this._result[e] = t), 0 == --this._rest && this._promise._resolve(s(this._result));
                }),
                e
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
        { './each': 12, './internal/collection': 35, './internal/util': 38 }
      ],
      6: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/util').concatArray,
            o = t('./internal/collection').setLimit,
            n = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, r, c);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t, e) {
                  (this._result[e] = t),
                    0 == --this._rest
                      ? this._promise._resolve(s(this._result))
                      : this._callRest-- > 0 && this._iterate();
                }),
                e
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
        { './eachLimit': 13, './internal/collection': 35, './internal/util': 38 }
      ],
      7: [
        function(t, e, i) {
          'use strict';
          var r = (function(t) {
            function e(e, i) {
              t.call(this, e, i), (this._result = []);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype._callResolve = function(t) {
                var e;
                Array.isArray(t) ? (e = this._result).push.apply(e, t) : void 0 !== t && this._result.push(t),
                  0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
              }),
              e
            );
          })(t('./eachSeries').EachSeries);
          e.exports = {
            concatSeries: function(t, e) {
              return new r(t, e)._execute();
            },
            ConcatSeries: r
          };
        },
        { './eachSeries': 14 }
      ],
      8: [
        function(t, e, i) {
          'use strict';
          e.exports = {
            resolveStack: function(t, e) {
              var i,
                r = new Error().stack;
              (t._stacks = t._stacks || []), e && e._stacks && (i = t._stacks).push.apply(i, e._stacks);
              var s = r.split('\n').slice(4);
              t._stacks.push(s.join('\n'));
            },
            reconstructStack: function(t) {
              var e = t._value,
                i = t._stacks;
              if (e instanceof Error == !1 || !i || e._reconstructed) return;
              var r = e.stack.split('\n'),
                s = i.length;
              for (; s--; ) r.push('From previous event:'), r.push(i[s]);
              (e.stack = r.join('\n')), (e._reconstructed = !0);
            }
          };
        },
        {}
      ],
      9: [
        function(t, e, i) {
          'use strict';
          var r = t('./aigle'),
            s = t('./internal/util').INTERNAL,
            o = (function(t) {
              function e(e) {
                t.call(this, s), (this._ms = e), (this._timer = void 0);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._resolve = function(e) {
                  var i = this;
                  return (
                    (this._timer = setTimeout(function() {
                      return t.prototype._resolve.call(i, e);
                    }, this._ms)),
                    this
                  );
                }),
                (e.prototype._reject = function(e) {
                  clearTimeout(this._timer), t.prototype._reject.call(this, e);
                }),
                e
              );
            })(r);
          e.exports = {
            delay: function(t, e) {
              return new o(t)._resolve(e);
            },
            Delay: o
          };
        },
        { './aigle': 2, './internal/util': 38 }
      ],
      10: [
        function(t, e, i) {
          'use strict';
          var r = t('./doWhilst').DoWhilst,
            s = t('./until').UntilTester;
          e.exports = function(t, e, i) {
            'function' != typeof i && ((i = e), (e = t), (t = void 0));
            return new r(new s(i), e)._iterate(t);
          };
        },
        { './doWhilst': 11, './until': 79 }
      ],
      11: [
        function(t, e, i) {
          'use strict';
          var r = t('./whilst'),
            s = r.AigleWhilst,
            o = r.WhilstTester,
            n = (function(t) {
              function e(e, i) {
                t.call(this, e, i);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._iterate = function(t) {
                  return this._next(t), this._promise;
                }),
                e
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
        { './whilst': 81 }
      ],
      12: [
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
            h = (function(t) {
              function e(e, i, r) {
                void 0 === r && (r = _),
                  t.call(this),
                  (this._iterator = i),
                  (this._promise = new s(n)),
                  (this._coll = void 0),
                  (this._size = void 0),
                  (this._rest = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  (this._iterate = void 0),
                  e === c
                    ? ((this._set = r), (this._iterate = this._callResolve), (this._callResolve = u))
                    : r.call(this, e);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._execute = function() {
                  return 0 === this._rest ? this._promise._resolve(this._result) : this._iterate(), this._promise;
                }),
                (e.prototype._callResolve = function(t) {
                  (0 != --this._rest && !1 !== t) || this._promise._resolve(this._result);
                }),
                (e.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                e
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
        { './aigle': 2, './internal/collection': 35, './internal/util': 38, 'aigle-core': 82 }
      ],
      13: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.DEFAULT_LIMIT,
            c = o.INTERNAL,
            l = o.PENDING,
            u = t('./internal/collection'),
            a = u.execute,
            h = u.setLimit,
            _ = (function(t) {
              function e(e, i, r, o) {
                void 0 === o && (o = p),
                  t.call(this),
                  'function' == typeof i && ((r = i), (i = n)),
                  (this._iterator = r),
                  (this._promise = new s(c)),
                  (this._index = 0),
                  (this._limit = i),
                  (this._coll = void 0),
                  (this._rest = void 0),
                  (this._size = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  (this._iterate = void 0),
                  (this._callRest = void 0),
                  e === l
                    ? ((this._set = o), (this._iterate = this._callResolve), (this._callResolve = a))
                    : o.call(this, e);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._execute = function() {
                  if (0 === this._rest) this._promise._resolve(this._result);
                  else for (; this._limit--; ) this._iterate();
                  return this._promise;
                }),
                (e.prototype._callResolve = function(t) {
                  !1 === t
                    ? ((this._callRest = 0), this._promise._resolve(this._result))
                    : 0 == --this._rest
                      ? this._promise._resolve(this._result)
                      : this._callRest-- > 0 && this._iterate();
                }),
                (e.prototype._callReject = function(t) {
                  (this._callRest = 0), this._promise._reject(t);
                }),
                e
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
        { './aigle': 2, './internal/collection': 35, './internal/util': 38, 'aigle-core': 82 }
      ],
      14: [
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
            h = (function(t) {
              function e(e, i, r) {
                void 0 === r && (r = _),
                  t.call(this),
                  (this._iterator = i),
                  (this._promise = new s(n)),
                  (this._index = 0),
                  (this._coll = void 0),
                  (this._rest = void 0),
                  (this._size = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  (this._iterate = void 0),
                  e === c
                    ? ((this._set = r), (this._iterate = this._callResolve), (this._callResolve = u))
                    : r.call(this, e);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._execute = function() {
                  return 0 === this._rest ? this._promise._resolve(this._result) : this._iterate(), this._promise;
                }),
                (e.prototype._callResolve = function(t) {
                  0 == --this._rest || !1 === t ? this._promise._resolve(this._result) : this._iterate();
                }),
                (e.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                e
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
        { './aigle': 2, './internal/collection': 35, './internal/util': 38, 'aigle-core': 82 }
      ],
      15: [
        function(t, e, i) {
          'use strict';
          for (var r = ['CancellationError', 'TimeoutError'], s = r.length; s--; )
            i[r[s]] = (function(t) {
              function e() {
                t.apply(this, arguments);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(Error);
        },
        {}
      ],
      16: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/util').PENDING,
            o = t('./internal/collection').setShorthand,
            n = (function(t) {
              function e(e, i) {
                t.call(this, e, i), (this._result = !0), e === s ? (this._set = o) : o.call(this, e);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t) {
                  t ? 0 == --this._rest && this._promise._resolve(!0) : this._promise._resolve(!1);
                }),
                e
              );
            })(r);
          e.exports = {
            every: function(t, e) {
              return new n(t, e)._execute();
            },
            Every: n
          };
        },
        { './each': 12, './internal/collection': 35, './internal/util': 38 }
      ],
      17: [
        function(t, e, i) {
          'use strict';
          var r = (function(t) {
            function e(e, i, r) {
              t.call(this, e, i, r), (this._result = !0);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype._callResolve = function(t) {
                t
                  ? 0 == --this._rest ? this._promise._resolve(!0) : this._callRest-- > 0 && this._iterate()
                  : this._promise._resolve(!1);
              }),
              e
            );
          })(t('./eachLimit').EachLimit);
          e.exports = {
            everyLimit: function(t, e, i) {
              return new r(t, e, i)._execute();
            },
            EveryLimit: r
          };
        },
        { './eachLimit': 13 }
      ],
      18: [
        function(t, e, i) {
          'use strict';
          var r = (function(t) {
            function e(e, i) {
              t.call(this, e, i), (this._result = !0);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype._callResolve = function(t) {
                t ? (0 == --this._rest ? this._promise._resolve(!0) : this._iterate()) : this._promise._resolve(!1);
              }),
              e
            );
          })(t('./eachSeries.js').EachSeries);
          e.exports = {
            everySeries: function(t, e) {
              return new r(t, e)._execute();
            },
            EverySeries: r
          };
        },
        { './eachSeries.js': 14 }
      ],
      19: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(t) {
              function e(e, i) {
                t.call(this, e, i, u);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
            (this._result[e] = t ? this._coll[e] : n), 0 == --this._rest && this._promise._resolve(c(this._result));
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
        { './each': 12, './internal/collection': 35, './internal/util': 38 }
      ],
      20: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, r, u);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
              0 == --this._rest ? this._promise._resolve(c(this._result)) : this._callRest-- > 0 && this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t ? this._coll[this._keys[e]] : n),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : this._callRest-- > 0 && this._iterate();
          }
          e.exports = {
            filterLimit: function(t, e, i) {
              return new l(t, e, i)._execute();
            },
            FilterLimit: l
          };
        },
        { './eachLimit': 13, './internal/collection': 35, './internal/util': 38 }
      ],
      21: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(t) {
              function e(e, i) {
                t.call(this, e, i, u);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
        { './eachSeries': 14, './internal/collection': 35, './internal/util': 38 }
      ],
      22: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
        { './each': 12, './internal/collection': 35 }
      ],
      23: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n), (this._result = -1);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t, e) {
                  t ? ((this._size = 0), this._promise._resolve(e)) : 0 == --this._rest && this._promise._resolve(-1);
                }),
                e
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
        { './each': 12, './internal/collection': 35 }
      ],
      24: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, r, n), (this._result = -1);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t, e) {
                  t
                    ? ((this._callRest = 0), this._promise._resolve(e))
                    : 0 == --this._rest ? this._promise._resolve(-1) : this._callRest-- > 0 && this._iterate();
                }),
                e
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
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      25: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n), (this._result = -1);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t, e) {
                  t ? this._promise._resolve(e) : 0 == --this._rest ? this._promise._resolve(-1) : this._iterate();
                }),
                e
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
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      26: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t ? ((this._size = 0), this._promise._resolve('' + e)) : 0 == --this._rest && this._promise._resolve();
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
        { './each': 12, './internal/collection': 35 }
      ],
      27: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, r, n);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t
              ? ((this._callRest = 0), this._promise._resolve('' + e))
              : 0 == --this._rest ? this._promise._resolve() : this._callRest-- > 0 && this._iterate();
          }
          function l(t, e) {
            t
              ? ((this._callRest = 0), this._promise._resolve(this._keys[e]))
              : 0 == --this._rest ? this._promise._resolve() : this._callRest-- > 0 && this._iterate();
          }
          e.exports = {
            findKeyLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            FindKeyLimit: o
          };
        },
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      28: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t ? this._promise._resolve('' + e) : 0 == --this._rest ? this._promise._resolve() : this._iterate();
          }
          function l(t, e) {
            t ? this._promise._resolve(this._keys[e]) : 0 == --this._rest ? this._promise._resolve() : this._iterate();
          }
          e.exports = {
            findKeySeries: function(t, e) {
              return new o(t, e)._execute();
            },
            FindKeySeries: o
          };
        },
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      29: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, r, n);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t
              ? ((this._callRest = 0), this._promise._resolve(this._coll[e]))
              : 0 == --this._rest ? this._promise._resolve() : this._callRest-- > 0 && this._iterate();
          }
          function l(t, e) {
            t
              ? ((this._callRest = 0), this._promise._resolve(this._coll[this._keys[e]]))
              : 0 == --this._rest ? this._promise._resolve() : this._callRest-- > 0 && this._iterate();
          }
          e.exports = {
            findLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            FindLimit: o
          };
        },
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      30: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t ? this._promise._resolve(this._coll[e]) : 0 == --this._rest ? this._promise._resolve() : this._iterate();
          }
          function l(t, e) {
            t
              ? this._promise._resolve(this._coll[this._keys[e]])
              : 0 == --this._rest ? this._promise._resolve() : this._iterate();
          }
          e.exports = {
            findSeries: function(t, e) {
              return new o(t, e)._execute();
            },
            FindSeries: o
          };
        },
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      31: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n), (this._result = {});
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            this._result[t] ? this._result[t].push(this._coll[e]) : (this._result[t] = [this._coll[e]]),
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
        { './each': 12, './internal/collection': 35 }
      ],
      32: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, r, n), (this._result = {});
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            this._result[t] ? this._result[t].push(this._coll[e]) : (this._result[t] = [this._coll[e]]),
              0 == --this._rest ? this._promise._resolve(this._result) : this._callRest-- > 0 && this._iterate();
          }
          function l(t, e) {
            this._result[t]
              ? this._result[t].push(this._coll[this._keys[e]])
              : (this._result[t] = [this._coll[this._keys[e]]]),
              0 == --this._rest ? this._promise._resolve(this._result) : this._callRest-- > 0 && this._iterate();
          }
          e.exports = {
            groupByLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            GroupByLimit: o
          };
        },
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      33: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n), (this._result = {});
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            this._result[t] ? this._result[t].push(this._coll[e]) : (this._result[t] = [this._coll[e]]),
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
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      34: [
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
      35: [
        function(t, e, i) {
          'use strict';
          var r = t('./util'),
            s = r.call3,
            o = r.callProxyReciever,
            n = [
              [v, m],
              [v, d],
              [
                function() {
                  var t = this._coll,
                    e = this._index++;
                  o(s(this._iterator, t[e], e, t), this, e);
                },
                function() {
                  var t = this._coll,
                    e = this._index++,
                    i = this._keys[e];
                  o(s(this._iterator, t[i], i, t), this, e);
                }
              ]
            ].map(function(t) {
              var e = t[0],
                i = t[1];
              return function(t) {
                if (Array.isArray(t)) (this._coll = t), (this._size = t.length), (this._iterate = e);
                else if (t && 'object' == typeof t) {
                  var r = Object.keys(t);
                  (this._coll = t), (this._size = r.length), (this._keys = r), (this._iterate = i);
                } else this._size = 0;
                return (this._rest = this._size), this;
              };
            }),
            c = n[0],
            l = n[1],
            u = n[2],
            a = {
              iterateArrayParallel: v,
              iterateArrayWithString: function() {
                var t = this._iterator,
                  e = this._coll,
                  i = -1;
                for (; ++i < this._size; ) {
                  var r = e[i];
                  r ? this._callResolve(r[t], i) : this._callResolve(void 0, i);
                }
              },
              iterateArrayWithArray: function() {
                var t = this._coll,
                  e = this._iterator,
                  i = e[0],
                  r = e[1],
                  s = -1;
                for (; ++s < this._size; ) {
                  var o = t[s];
                  o ? this._callResolve(o[i] === r, s) : this._callResolve(void 0, s);
                }
              },
              iterateArrayWithObject: function() {
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
              iterateObjectParallel: m,
              iterateObjectWithString: function() {
                var t = this._iterator,
                  e = this._coll,
                  i = this._keys,
                  r = -1;
                for (; ++r < this._size; ) {
                  var s = e[i[r]];
                  s ? this._callResolve(s[t], r) : this._callResolve(void 0, r);
                }
              },
              iterateObjectWithArray: function() {
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
              },
              iterateObjectWithObject: function() {
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
              }
            },
            h = [
              a,
              Object.assign({}, a, { iterateObjectParallel: d }),
              Object.assign({}, a, { iterateArrayWithArray: g, iterateObjectWithArray: g }),
              Object.assign({}, a, { iterateArrayWithArray: R, iterateObjectWithArray: R })
            ].map(function(t) {
              var e = t.iterateArrayParallel,
                i = t.iterateArrayWithString,
                r = t.iterateArrayWithArray,
                s = t.iterateArrayWithObject,
                o = t.iterateObjectParallel,
                n = t.iterateObjectWithString,
                c = t.iterateObjectWithArray,
                l = t.iterateObjectWithObject;
              return function(t) {
                if (Array.isArray(t))
                  switch (((this._coll = t), (this._size = t.length), typeof this._iterator)) {
                    case 'function':
                      this._iterate = e;
                      break;
                    case 'string':
                      this._iterate = i;
                      break;
                    case 'object':
                      this._iterate = Array.isArray(this._iterator) ? r : s;
                  }
                else if (t && 'object' == typeof t) {
                  var u = Object.keys(t);
                  switch (((this._coll = t), (this._size = u.length), (this._keys = u), typeof this._iterator)) {
                    case 'function':
                      this._iterate = o;
                      break;
                    case 'string':
                      this._iterate = n;
                      break;
                    case 'object':
                      this._iterate = Array.isArray(this._iterator) ? c : l;
                  }
                } else this._size = 0;
                return (this._rest = this._size), this;
              };
            }),
            _ = h[0],
            p = h[1],
            f = h[2],
            y = h[3];
          function v() {
            for (
              var t = this._rest, e = this._iterator, i = this._coll, r = -1;
              ++r < t && o(s(e, i[r], r, i), this, r);

            );
          }
          function m() {
            for (var t = this._rest, e = this._iterator, i = this._coll, r = this._keys, n = -1; ++n < t; ) {
              var c = r[n];
              if (!1 === o(s(e, i[c], c, i), this, n)) break;
            }
          }
          function d() {
            for (
              var t = this, e = t._rest, i = t._iterator, r = t._coll, n = t._keys, c = t._result, l = -1;
              ++l < e;

            ) {
              var u = n[l];
              if (((c[u] = void 0), !1 === o(s(i, r[u], u, r), this, l))) break;
            }
          }
          function g() {
            var t = this._coll,
              e = this._result;
            !(function i(r) {
              var s = -1;
              for (; ++s < r.length; ) {
                var o = r[s];
                Array.isArray(o) ? i(o) : t.hasOwnProperty(o) && (e[o] = t[o]);
              }
            })(this._iterator),
              this._promise._resolve(e);
          }
          function R() {
            var t = this._coll,
              e = this._result,
              i = {};
            !(function t(e) {
              var r = -1;
              for (; ++r < e.length; ) {
                var s = e[r];
                Array.isArray(s) ? t(s) : (i[s] = !0);
              }
            })(this._iterator),
              Object.keys(t).forEach(function(r) {
                !1 === i.hasOwnProperty(r) && (e[r] = t[r]);
              }),
              this._promise._resolve(e);
          }
          e.exports = {
            execute: function(t) {
              (this._callResolve = this._iterate), this._set(t), this._execute();
            },
            setParallel: c,
            setParallelWithOrder: l,
            setShorthand: _,
            setShorthandWithOrder: p,
            setPickShorthand: f,
            setOmitShorthand: y,
            setSeries: u,
            setLimit: function(t) {
              u.call(this, t);
              var e = this._limit,
                i = this._size;
              return (this._limit = e < i ? e : i), (this._callRest = i - this._limit), this;
            }
          };
        },
        { './util': 38 }
      ],
      36: [
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
            createProxy: function(t, e) {
              var i = e ? f : p;
              return (function(e) {
                function r() {
                  for (var r = [], s = arguments.length; s--; ) r[s] = arguments[s];
                  e.call(this, t, i, r);
                }
                return (
                  e && (r.__proto__ = e),
                  (r.prototype = Object.create(e && e.prototype)),
                  (r.prototype.constructor = r),
                  r
                );
              })(_);
            }
          };
          var _ = (function(t) {
            function e(e, i, r) {
              t.call(this),
                (this._promise = new s(l)),
                (this._func = e),
                (this._args = r),
                (this._execute = i),
                r[0] === u && ((this._set = this._callResolve), (this._callResolve = i));
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype._callResolve = function(t) {
                this._promise._resolve(t);
              }),
              (e.prototype._callReject = function(t) {
                this._promise._reject(t);
              }),
              e
            );
          })(r);
          function p(t) {
            var e = this._args;
            return (
              e[0] === u && ((e[0] = t), (this._callResolve = this._set)), h(a(this._func, e), this), this._promise
            );
          }
          function f(t) {
            var e = this,
              i = this._args;
            i[0] === u ? ((i[0] = t), (this._callResolve = this._set)) : (t = i[0]);
            var r = 'function' == typeof i[1];
            return (
              r && Array.isArray(t)
                ? y(this, o, function(t) {
                    var r = 0;
                    (i[1] = function() {
                      return t[r++];
                    }),
                      h(a(e._func, i), e);
                  })
                : r && t && 'object' == typeof t
                  ? y(this, n, function(t) {
                      var r = 0,
                        s = Object.keys(t);
                      (i[1] = function() {
                        return t[s[r++]];
                      }),
                        h(a(e._func, i), e);
                    })
                  : h(a(this._func, i), this),
              this._promise
            );
          }
          function y(t, e, i) {
            var r = t._args,
              s = r[0],
              o = r[1],
              n = e(s, function(t, e) {
                return o(t, e, s);
              });
            return 1 === n._resolved
              ? i(n._value)
              : n.then(i, function(e) {
                  return t._callReject(e);
                });
          }
        },
        { '../aigle': 2, '../map': 40, '../mapValues': 43, './util': 38, 'aigle-core': 82 }
      ],
      37: [
        function(t, e, i) {
          'use strict';
          var r = function(t) {
            void 0 === t && (t = 8), (this.array = Array(t)), (this.length = 0);
          };
          (r.prototype.push = function(t) {
            this.array[this.length++] = t;
          }),
            (e.exports = r);
        },
        {}
      ],
      38: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleCore,
            s = t('../../package.json').version,
            o = { e: void 0 },
            n = 'function' == typeof Symbol ? Symbol.iterator : function() {};
          function c() {}
          function l(t, e) {
            try {
              return t(e);
            } catch (t) {
              return (o.e = t), o;
            }
          }
          function u(t, e) {
            if (e && e.then) {
              if (e instanceof r)
                switch (e._resolved) {
                  case 0:
                    return void e._addReceiver(t, c);
                  case 1:
                    return void t._resolve(e._value);
                  case 2:
                    return e.suppressUnhandledRejections(), void t._reject(e._value);
                }
              a(e, t);
            } else t._resolve(e);
          }
          function a(t, e) {
            t.then(
              function(t) {
                e._resolve(t);
              },
              function(t) {
                e._reject(t);
              }
            );
          }
          function h(t, e, i) {
            t.then(
              function(t) {
                e._callResolve(t, i);
              },
              function(t) {
                e._callReject(t);
              }
            );
          }
          function _(t, e, i, r) {
            var s = t[i];
            (t[i] = t[r]), (t[r] = s);
            var o = e[i];
            (e[i] = e[r]), (e[r] = o);
          }
          function p(t, e, i, r) {
            if (e !== i) {
              for (var s = e; ++s <= i && t[e] === t[s]; ) {
                var o = s - 1;
                if (r[o] > r[s]) {
                  var n = r[o];
                  (r[o] = r[s]), (r[s] = n);
                }
              }
              if (!(s > i))
                p(
                  t,
                  e,
                  (s = (function(t, e, i, r, s) {
                    for (var o = e, n = i; o <= n; ) {
                      for (e = o; o < n && t[o] < r; ) o++;
                      for (; n >= e && t[n] >= r; ) n--;
                      if (o > n) break;
                      _(t, s, o++, n--);
                    }
                    return o;
                  })(t, e, i, t[t[e] > t[s] ? e : s], r)) - 1,
                  r
                ),
                  p(t, s, i, r);
            }
          }
          e.exports = {
            VERSION: s,
            DEFAULT_LIMIT: 8,
            INTERNAL: c,
            PENDING: function() {},
            UNHANDLED: function() {},
            defaultIterator: function(t) {
              return t;
            },
            errorObj: o,
            iteratorSymbol: n,
            call0: function(t) {
              try {
                return t();
              } catch (t) {
                return (o.e = t), o;
              }
            },
            call1: l,
            call3: function(t, e, i, r) {
              try {
                return t(e, i, r);
              } catch (t) {
                return (o.e = t), o;
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
                return (o.e = t), o;
              }
            },
            callResolve: function(t, e, i) {
              if ('function' != typeof e) return void t._resolve(i);
              var r = l(e, i);
              if (r === o) return void t._reject(o.e);
              u(t, r);
            },
            callReject: function(t, e, i) {
              if ('function' != typeof e) return void t._reject(i);
              var r = l(e, i);
              if (r === o) return void t._reject(o.e);
              u(t, r);
            },
            callReceiver: u,
            callThen: a,
            callProxyReciever: function(t, e, i) {
              if (t instanceof r)
                switch (t._resolved) {
                  case 0:
                    return t._addReceiver(e, i), !0;
                  case 1:
                    return e._callResolve(t._value, i), !0;
                  case 2:
                    return t.suppressUnhandledRejections(), e._callReject(t._value), !1;
                }
              if (t === o) return e._callReject(o.e), !1;
              t && t.then ? h(t, e, i) : e._callResolve(t, i);
              return !0;
            },
            promiseArrayEach: function(t) {
              var e = t._rest,
                i = t._coll,
                s = -1;
              for (; ++s < e; ) {
                var o = i[s];
                if (o instanceof r)
                  switch (o._resolved) {
                    case 0:
                      o._addReceiver(t, s);
                      continue;
                    case 1:
                      t._callResolve(o._value, s);
                      continue;
                    case 2:
                      return o.suppressUnhandledRejections(), void t._callReject(o._value);
                  }
                o && o.then ? h(o, t, s) : t._callResolve(o, s);
              }
            },
            promiseObjectEach: function(t) {
              var e = t._rest,
                i = t._keys,
                s = t._coll,
                o = t._result,
                n = -1;
              for (; ++n < e; ) {
                var c = i[n],
                  l = s[c];
                if (((o[c] = void 0), l instanceof r))
                  switch (l._resolved) {
                    case 0:
                      l._addReceiver(t, c);
                      continue;
                    case 1:
                      t._callResolve(l._value, c);
                      continue;
                    case 2:
                      return l.suppressUnhandledRejections(), void t._callReject(l._value);
                  }
                l && l.then ? h(l, t, c) : t._callResolve(l, c);
              }
            },
            promiseMapEach: function(t) {
              var e,
                i = t._result,
                s = t._coll[n]();
              for (; !1 === (e = s.next()).done; ) {
                var o = e.value,
                  c = o[0],
                  l = o[1];
                if ((i.set(c, l), l instanceof r))
                  switch (l._resolved) {
                    case 0:
                      l._addReceiver(t, c);
                      continue;
                    case 1:
                      t._callResolve(l._value, c);
                      continue;
                    case 2:
                      return l.suppressUnhandledRejections(), void t._callReject(l._value);
                  }
                l && l.then ? h(l, t, c) : t._callResolve(l, c);
              }
            },
            promiseSetEach: function(t) {
              var e,
                i = t._coll[n](),
                s = -1;
              for (; !1 === (e = i.next()).done; ) {
                var o = e.value;
                if (o instanceof r)
                  switch (o._resolved) {
                    case 0:
                      o._addReceiver(t, ++s);
                      continue;
                    case 1:
                      t._callResolve(o._value, ++s);
                      continue;
                    case 2:
                      return o.suppressUnhandledRejections(), void t._callReject(o._value);
                  }
                o && o.then ? h(o, t, ++s) : t._callResolve(o, ++s);
              }
            },
            compactArray: function(t) {
              var e = -1,
                i = t.length,
                r = [];
              for (; ++e < i; ) {
                var s = t[e];
                s !== c && r.push(s);
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
              p(e, 0, i - 1, r);
              for (var o = Array(i), n = 0; n < i; n++) {
                var c = r[n];
                o[n] = void 0 === c ? t[n] : t[c];
              }
              return o;
            },
            sortObject: function(t, e, i) {
              for (var r = e.length, s = Array(r), o = 0; o < r; o++) s[o] = o;
              p(i, 0, r - 1, s);
              for (var n = Array(r), c = 0; c < r; c++) {
                var l = s[c];
                n[c] = t[e[void 0 === l ? c : l]];
              }
              return n;
            }
          };
        },
        { '../../package.json': 88, 'aigle-core': 82 }
      ],
      39: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.call1,
            l = o.apply,
            u = o.callProxyReciever,
            a = (function(t) {
              function e(e, i) {
                t.call(this),
                  (this._promise = new s(n)),
                  (this._rest = i),
                  (this._result = Array(i)),
                  (this._handler = e);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t, e) {
                  if (e === n) return this._promise._resolve(t);
                  if (((this._result[e] = t), 0 == --this._rest)) {
                    var i = this._handler,
                      r = this._result;
                    void 0 === i ? this._promise._resolve(r) : u(l(i, r), this, n);
                  }
                }),
                (e.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                e
              );
            })(r),
            h = (function(t) {
              function e(e) {
                t.call(this), (this._promise = new s(n)), (this._handler = e);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t, e) {
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
                          for (var r = Object.keys(e), s = r.length, o = Array(s); s--; ) o[s] = e[r[s]];
                          e = o;
                          break;
                        }
                      default:
                        return u(c(i, e), t, n);
                    }
                    u(l(i, e), t, n);
                  })(this, t);
                }),
                (e.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                e
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
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      40: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t, e) {
                  (this._result[e] = t), 0 == --this._rest && this._promise._resolve(this._result);
                }),
                e
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
        { './each': 12, './internal/collection': 35 }
      ],
      41: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, r, n);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t, e) {
                  (this._result[e] = t),
                    0 == --this._rest ? this._promise._resolve(this._result) : this._callRest-- > 0 && this._iterate();
                }),
                e
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
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      42: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t, e) {
                  (this._result[e] = t), 0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
                }),
                e
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
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      43: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthandWithOrder,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n), (this._result = {});
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            (this._result[e] = t), 0 == --this._rest && this._promise._resolve(this._result);
          }
          function l(t, e) {
            (this._result[this._keys[e]] = t), 0 == --this._rest && this._promise._resolve(this._result);
          }
          e.exports = {
            mapValues: function(t, e) {
              return new o(t, e)._execute();
            },
            MapValues: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      44: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util').createEmptyObject,
            n = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, r, c);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
              0 == --this._rest ? this._promise._resolve(this._result) : this._callRest-- > 0 && this._iterate();
          }
          function u(t, e) {
            (this._result[this._keys[e]] = t),
              0 == --this._rest ? this._promise._resolve(this._result) : this._callRest-- > 0 && this._iterate();
          }
          e.exports = {
            mapValuesLimit: function(t, e, i) {
              return new n(t, e, i)._execute();
            },
            MapValuesLimit: n
          };
        },
        { './eachLimit': 13, './internal/collection': 35, './internal/util': 38 }
      ],
      45: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n), (this._result = {});
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            (this._result[e] = t), 0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
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
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      46: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setOmitShorthand,
            o = (function(t) {
              function e(e, i, r) {
                'function' != typeof i && (i = [i].concat(r)), t.call(this, e, i, n), (this._result = {});
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t || (this._result[e] = this._coll[e]), 0 == --this._rest && this._promise._resolve(this._result);
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
              for (; r-- > 0; ) i[r] = arguments[r + 2];
              return new o(t, e, i)._execute();
            },
            Omit: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      47: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n), (this._result = {});
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t || (this._result[e] = this._coll[e]), 0 == --this._rest && this._promise._resolve(this._result);
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
        { './each': 12, './internal/collection': 35 }
      ],
      48: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, r, n), (this._result = {});
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t || (this._result[e] = this._coll[e]),
              0 == --this._rest ? this._promise._resolve(this._result) : this._callRest-- > 0 && this._iterate();
          }
          function l(t, e) {
            if (!t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest ? this._promise._resolve(this._result) : this._callRest-- > 0 && this._iterate();
          }
          e.exports = {
            omitByLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            OmitByLimit: o
          };
        },
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      49: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/util').PENDING,
            o = t('./internal/collection').setSeries,
            n = (function(t) {
              function e(e, i) {
                t.call(this, e, i),
                  (this._result = {}),
                  e === s ? (this._set = c) : (this._callResolve = void 0 === this._keys ? l : u);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
        { './eachSeries': 14, './internal/collection': 35, './internal/util': 38 }
      ],
      50: [
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
            p = t('./props'),
            f = p.callResolve,
            y = p.callResolveMap,
            v = (function(t) {
              function e(e) {
                t.call(this),
                  (this._promise = new s(n)),
                  (this._rest = void 0),
                  (this._coll = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  e === c ? (this._callResolve = this._set) : ((this._callResolve = void 0), this._set(e));
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._set = function(t) {
                  if (((this._coll = t), Array.isArray(t))) {
                    var e = t.length;
                    (this._rest = e), (this._result = Array(e)), (this._callResolve = f), l(this);
                  } else if (t && 'object' == typeof t)
                    if (t[_])
                      (this._rest = t.size),
                        t instanceof Map
                          ? ((this._result = new Map()), (this._callResolve = y), a(this))
                          : ((this._result = Array(this._rest)), (this._callResolve = f), h(this));
                    else {
                      var i = Object.keys(t);
                      (this._rest = i.length), (this._keys = i), (this._result = {}), (this._callResolve = f), u(this);
                    }
                  else (this._rest = 0), (this._result = {});
                  return 0 === this._rest && this._promise._resolve(this._result), this;
                }),
                (e.prototype._execute = function() {
                  return this._promise;
                }),
                (e.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                e
              );
            })(r);
          e.exports = {
            parallel: function(t) {
              return new v(t)._promise;
            },
            Parallel: v
          };
        },
        { './aigle': 2, './internal/util': 38, './props': 57, 'aigle-core': 82 }
      ],
      51: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setPickShorthand,
            o = (function(t) {
              function e(e, i, r) {
                'function' != typeof i && (i = [i].concat(r)), t.call(this, e, i, n), (this._result = {});
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t && (this._result[e] = this._coll[e]), 0 == --this._rest && this._promise._resolve(this._result);
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
              for (; r-- > 0; ) i[r] = arguments[r + 2];
              return new o(t, e, i)._execute();
            },
            Pick: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      52: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n), (this._result = {});
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t && (this._result[e] = this._coll[e]), 0 == --this._rest && this._promise._resolve(this._result);
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
        { './each': 12, './internal/collection': 35 }
      ],
      53: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, r, n), (this._result = {});
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
              );
            })(r);
          function n(t) {
            return s.call(this, t), (this._callResolve = void 0 === this._keys ? c : l), this;
          }
          function c(t, e) {
            t && (this._result[e] = this._coll[e]),
              0 == --this._rest ? this._promise._resolve(this._result) : this._callRest-- > 0 && this._iterate();
          }
          function l(t, e) {
            if (t) {
              var i = this._keys[e];
              this._result[i] = this._coll[i];
            }
            0 == --this._rest ? this._promise._resolve(this._result) : this._callRest-- > 0 && this._iterate();
          }
          e.exports = {
            pickByLimit: function(t, e, i) {
              return new o(t, e, i)._execute();
            },
            PickByLimit: o
          };
        },
        { './eachLimit': 13, './internal/collection': 35 }
      ],
      54: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, n), (this._result = {});
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
        { './eachSeries': 14, './internal/collection': 35 }
      ],
      55: [
        function(t, e, i) {
          'use strict';
          var r = t('./aigle'),
            s = t('./internal/util').INTERNAL,
            o = 'function' == typeof setImmediate ? setImmediate : {},
            n =
              (function() {
                try {
                  return t('util').promisify.custom;
                } catch (t) {
                  return;
                }
              })() || {};
          function c(t) {
            return function(e, i) {
              return e ? t._reject(e) : t._resolve(i);
            };
          }
          e.exports = function(t, e) {
            switch (typeof t) {
              case 'object':
                switch (typeof e) {
                  case 'string':
                  case 'number':
                    return t[e].__isPromisified__
                      ? t[e]
                      : (function(t, e) {
                          return (i.__isPromisified__ = !0), i;
                          function i(i) {
                            var o = arguments,
                              n = new r(s),
                              l = c(n),
                              u = arguments.length;
                            switch (u) {
                              case 0:
                                t[e](l);
                                break;
                              case 1:
                                t[e](i, l);
                                break;
                              default:
                                for (var a = Array(u); u--; ) a[u] = o[u];
                                (a[a.length] = l), t[e].apply(t, a);
                            }
                            return n;
                          }
                        })(t, e);
                  default:
                    throw new TypeError('Second argument is invalid');
                }
              case 'function':
                if (t.__isPromisified__) return t;
                var i = t[n];
                if (i) return i;
                switch (t) {
                  case setTimeout:
                    return r.delay;
                  case o:
                    return r.resolve;
                }
                var l = e && void 0 !== e.context ? e.context : void 0;
                return (function(t, e) {
                  return (i.__isPromisified__ = !0), i;
                  function i(i) {
                    var o = arguments,
                      n = new r(s),
                      l = c(n),
                      u = arguments.length;
                    switch (u) {
                      case 0:
                        t.call(e || this, l);
                        break;
                      case 1:
                        t.call(e || this, i, l);
                        break;
                      default:
                        for (var a = Array(u); u--; ) a[u] = o[u];
                        (a[a.length] = l), t.apply(e || this, a);
                    }
                    return n;
                  }
                })(t, l);
              default:
                throw new TypeError('Type of first argument is not function');
            }
          };
        },
        { './aigle': 2, './internal/util': 38, util: 87 }
      ],
      56: [
        function(t, e, i) {
          'use strict';
          var r = t('./promisify'),
            s = {
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
          function o(t) {
            return /^(?!_).*/.test(t);
          }
          function n(t, e, i, s, o, n) {
            var c = {};
            switch (typeof i) {
              case 'function':
                if (o) {
                  if (i.__isPromisified__) return;
                  var l = '' + s + t,
                    u = r(i);
                  if (o[l]) {
                    if (o[l] === u) break;
                    if (!o[l].__isPromisified__)
                      throw new TypeError("Cannot promisify an API that has normal methods with '" + t + "'-suffix");
                  } else o[l] = u;
                }
                a(t, e, i, i, n, c), a(t, e, i.prototype, i.prototype, n, c);
                break;
              case 'object':
                if (!i) break;
                a(t, e, i, i, n, c), a(t, e, Object.getPrototypeOf(i), i, n, c);
            }
          }
          e.exports = function(t, e) {
            var i = e || {},
              r = i.suffix;
            void 0 === r && (r = 'Async');
            var s = i.filter;
            void 0 === s && (s = o);
            var c = i.depth;
            void 0 === c && (c = 2);
            return n(r, s, t, void 0, void 0, c), t;
          };
          var c = Function.prototype,
            l = Object.prototype,
            u = Array.prototype;
          function a(t, e, i, r, o, a) {
            if (0 != o-- && i && c !== i && l !== i && u !== i && !Object.isFrozen(i))
              for (var h = Object.getOwnPropertyNames(i), _ = h.length; _--; ) {
                var p = h[_];
                if (!0 !== s[p] && !0 !== a[p] && e(p)) {
                  var f = Object.getOwnPropertyDescriptor(i, p);
                  !f || f.set || f.get || ((a[p] = !0), n(t, e, i[p], p, r, o));
                }
              }
          }
        },
        { './promisify': 55 }
      ],
      57: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.PENDING,
            l = o.promiseObjectEach,
            u = o.promiseMapEach,
            a = (function(t) {
              function e(e) {
                t.call(this),
                  (this._promise = new s(n)),
                  (this._rest = void 0),
                  (this._result = void 0),
                  (this._coll = void 0),
                  (this._keys = void 0),
                  e === c ? (this._callResolve = this._set) : ((this._callResolve = void 0), this._set(e));
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._set = function(t) {
                  if (((this._coll = t), t && 'object' == typeof t))
                    if (t instanceof Map)
                      (this._result = new Map()), (this._rest = t.size), (this._callResolve = _), u(this);
                    else {
                      var e = Object.keys(t);
                      (this._result = {}), (this._rest = e.length), (this._keys = e), (this._callResolve = h), l(this);
                    }
                  else (this._rest = 0), (this._result = {});
                  return 0 === this._rest && this._promise._resolve(this._result), this;
                }),
                (e.prototype._execute = function() {
                  return this._promise;
                }),
                (e.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                e
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
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      58: [
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
            p = (function(t) {
              function e(e) {
                t.call(this),
                  (this._promise = new s(n)),
                  (this._rest = void 0),
                  (this._coll = void 0),
                  (this._keys = void 0),
                  (this._result = void 0),
                  e === c ? (this._callResolve = this._set) : ((this._callResolve = void 0), this._set(e));
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._set = function(t) {
                  if (((this._coll = t), (this._callResolve = f), Array.isArray(t))) {
                    var e = t.length;
                    (this._rest = e), l(this);
                  } else if (t && 'object' == typeof t)
                    if (t[_]) (this._rest = t.size), t instanceof Map ? ((this._result = new Map()), a(this)) : h(this);
                    else {
                      var i = Object.keys(t);
                      (this._result = {}), (this._rest = i.length), (this._keys = i), u(this);
                    }
                  else this._rest = 0;
                  return this;
                }),
                (e.prototype._execute = function() {
                  return this._promise;
                }),
                (e.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                e
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
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      59: [
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
            p = (function(t) {
              function e(e, i, r) {
                t.call(this),
                  (this._result = r),
                  (this._iterator = i),
                  (this._promise = new s(u)),
                  (this._coll = void 0),
                  (this._rest = void 0),
                  (this._size = void 0),
                  (this._keys = void 0),
                  (this._iterate = void 0),
                  e === a
                    ? ((this._set = f), (this._iterate = this._callResolve), (this._callResolve = n))
                    : f.call(this, e);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t, e) {
                  0 == --this._rest ? this._promise._resolve(t) : this._iterate(++e, t);
                }),
                (e.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                e
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
                : void 0 === this._result ? this._callResolve(this._coll[0], 0) : this._iterate(0, this._result),
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
        { './aigle': 2, './internal/collection': 35, './internal/util': 38, 'aigle-core': 82 }
      ],
      60: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(t) {
              function e(e, i) {
                t.call(this, e, i, u);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
            (this._result[e] = t ? n : this._coll[e]), 0 == --this._rest && this._promise._resolve(c(this._result));
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
        { './each': 12, './internal/collection': 35, './internal/util': 38 }
      ],
      61: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, r, u);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
              0 == --this._rest ? this._promise._resolve(c(this._result)) : this._callRest-- > 0 && this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t ? n : this._coll[this._keys[e]]),
              0 == --this._rest ? this._promise._resolve(c(this._result)) : this._callRest-- > 0 && this._iterate();
          }
          e.exports = {
            rejectLimit: function(t, e, i) {
              return new l(t, e, i)._execute();
            },
            RejectLimit: l
          };
        },
        { './eachLimit': 13, './internal/collection': 35, './internal/util': 38 }
      ],
      62: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.compactArray,
            l = (function(t) {
              function e(e, i) {
                t.call(this, e, i, u);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
        { './eachSeries': 14, './internal/collection': 35, './internal/util': 38 }
      ],
      63: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.call0,
            l = o.callProxyReciever,
            u = 5,
            a = (function(t) {
              function e(e, i) {
                t.call(this), (this._promise = new s(n)), (this._rest = i), (this._handler = e), this._iterate();
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._iterate = function() {
                  l(c(this._handler), this, void 0);
                }),
                (e.prototype._callResolve = function(t) {
                  this._promise._resolve(t);
                }),
                (e.prototype._callReject = function(t) {
                  0 == --this._rest ? this._promise._reject(t) : this._iterate();
                }),
                e
              );
            })(r);
          e.exports = function(t, e) {
            'function' == typeof t && ((e = t), (t = u));
            return new a(e, t)._promise;
          };
        },
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      64: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = (function(t) {
              function e(e, i) {
                t.call(this, e, i, s), (this._result = !1);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t) {
                  t ? this._promise._resolve(!0) : 0 == --this._rest && this._promise._resolve(!1);
                }),
                e
              );
            })(r);
          e.exports = {
            some: function(t, e) {
              return new o(t, e)._execute();
            },
            Some: o
          };
        },
        { './each': 12, './internal/collection': 35 }
      ],
      65: [
        function(t, e, i) {
          'use strict';
          var r = (function(t) {
            function e(e, i, r) {
              t.call(this, e, i, r), (this._result = !1);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype._callResolve = function(t) {
                t
                  ? this._promise._resolve(!0)
                  : 0 == --this._rest ? this._promise._resolve(!1) : this._callRest-- > 0 && this._iterate();
              }),
              e
            );
          })(t('./eachLimit').EachLimit);
          e.exports = {
            someLimit: function(t, e, i) {
              return new r(t, e, i)._execute();
            },
            SomeLimit: r
          };
        },
        { './eachLimit': 13 }
      ],
      66: [
        function(t, e, i) {
          'use strict';
          var r = (function(t) {
            function e(e, i) {
              t.call(this, e, i), (this._result = !1);
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype._callResolve = function(t) {
                t ? this._promise._resolve(!0) : 0 == --this._rest ? this._promise._resolve(!1) : this._iterate();
              }),
              e
            );
          })(t('./eachSeries.js').EachSeries);
          e.exports = {
            someSeries: function(t, e) {
              return new r(t, e)._execute();
            },
            SomeSeries: r
          };
        },
        { './eachSeries.js': 14 }
      ],
      67: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setShorthand,
            o = t('./internal/util'),
            n = o.sortArray,
            c = o.sortObject,
            l = (function(t) {
              function e(e, i) {
                t.call(this, e, i, u);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
            (this._result[e] = t), 0 == --this._rest && this._promise._resolve(n(this._coll, this._result));
          }
          function h(t, e) {
            (this._result[e] = t), 0 == --this._rest && this._promise._resolve(c(this._coll, this._keys, this._result));
          }
          e.exports = {
            sortBy: function(t, e) {
              return new l(t, e)._execute();
            },
            SortBy: l
          };
        },
        { './each': 12, './internal/collection': 35, './internal/util': 38 }
      ],
      68: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util'),
            n = o.sortArray,
            c = o.sortObject,
            l = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, r, u);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
                : this._callRest-- > 0 && this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t),
              0 == --this._rest
                ? this._promise._resolve(c(this._coll, this._keys, this._result))
                : this._callRest-- > 0 && this._iterate();
          }
          e.exports = {
            sortByLimit: function(t, e, i) {
              return new l(t, e, i)._execute();
            },
            SortByLimit: l
          };
        },
        { './eachLimit': 13, './internal/collection': 35, './internal/util': 38 }
      ],
      69: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = t('./internal/util'),
            n = o.sortArray,
            c = o.sortObject,
            l = (function(t) {
              function e(e, i) {
                t.call(this, e, i, u);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                e
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
              0 == --this._rest ? this._promise._resolve(n(this._coll, this._result)) : this._iterate();
          }
          function h(t, e) {
            (this._result[e] = t),
              0 == --this._rest ? this._promise._resolve(c(this._coll, this._keys, this._result)) : this._iterate();
          }
          e.exports = {
            sortBySeries: function(t, e) {
              return new l(t, e)._execute();
            },
            SortBySeries: l
          };
        },
        { './eachSeries': 14, './internal/collection': 35, './internal/util': 38 }
      ],
      70: [
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
        { './aigle': 2, './internal/util': 38 }
      ],
      71: [
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
        { './aigle': 2, './internal/util': 38 }
      ],
      72: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./error').TimeoutError,
            n = t('./internal/util').INTERNAL,
            c = (function(t) {
              function e(e, i) {
                var r = this;
                t.call(this),
                  (this._promise = new s(n)),
                  (this._message = i),
                  (this._timer = setTimeout(function() {
                    i ? r._callReject(i) : r._callReject(new o('operation timed out'));
                  }, e));
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t) {
                  clearTimeout(this._timer), this._promise._resolve(t);
                }),
                (e.prototype._callReject = function(t) {
                  clearTimeout(this._timer), this._promise._reject(t);
                }),
                e
              );
            })(r);
          e.exports = c;
        },
        { './aigle': 2, './error': 15, './internal/util': 38, 'aigle-core': 82 }
      ],
      73: [
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
            h = (function(t) {
              function e(e, i) {
                t.call(this),
                  (this._promise = new s(n)),
                  (this._iterator = 'function' == typeof i ? i : l),
                  (this._rest = void 0),
                  (this._result = void 0),
                  e === c ? ((this._rest = this._callResolve), (this._callResolve = p)) : _.call(this, e);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._execute = function() {
                  if (this._rest >= 1)
                    for (var t = this._rest, e = this._iterator, i = -1; ++i < t && a(u(e, i), this, i); );
                  else this._promise._resolve(this._result);
                  return this._promise;
                }),
                (e.prototype._callResolve = function(t, e) {
                  (this._result[e] = t), 0 == --this._rest && this._promise._resolve(this._result);
                }),
                (e.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                e
              );
            })(r);
          function _(t) {
            (t = 0 | +t) >= 1 ? ((this._rest = t), (this._result = Array(t))) : ((this._rest = 0), (this._result = []));
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
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      74: [
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
            _ = (function(t) {
              function e(e, i, r) {
                t.call(this),
                  'function' == typeof i && ((r = i), (i = l)),
                  (this._promise = new s(n)),
                  (this._index = 0),
                  (this._limit = i),
                  (this._iterator = 'function' == typeof r ? r : u),
                  (this._rest = void 0),
                  (this._result = void 0),
                  (this._callRest = void 0),
                  e === c ? ((this._rest = this._callResolve), (this._callResolve = f)) : p.call(this, e);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._execute = function() {
                  if (0 === this._rest) this._promise._resolve(this._result);
                  else for (; this._limit--; ) this._iterate();
                  return this._promise;
                }),
                (e.prototype._iterate = function() {
                  var t = this._index++;
                  h(a(this._iterator, t), this, t);
                }),
                (e.prototype._callResolve = function(t, e) {
                  (this._result[e] = t),
                    0 == --this._rest ? this._promise._resolve(this._result) : this._callRest-- > 0 && this._iterate();
                }),
                (e.prototype._callReject = function(t) {
                  (this._callRest = 0), this._promise._reject(t);
                }),
                e
              );
            })(r);
          function p(t) {
            if ((t = 0 | +t) >= 1) {
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
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      75: [
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
            f = (function(t) {
              function e(e, i) {
                t.call(this),
                  (this._promise = new s(u)),
                  (this._iterator = 'function' == typeof i ? i : h),
                  (this._index = 0),
                  (this._rest = void 0),
                  (this._result = void 0),
                  e === a ? ((this._rest = this._callResolve), (this._callResolve = c)) : n.call(this, e);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._execute = function() {
                  return this._rest >= 1 ? this._iterate() : this._promise._resolve(this._result), this._promise;
                }),
                (e.prototype._iterate = function() {
                  var t = this._index++;
                  p(_(this._iterator, t), this, t);
                }),
                (e.prototype._callResolve = function(t, e) {
                  (this._result[e] = t), 0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
                }),
                (e.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                e
              );
            })(r);
          e.exports = {
            timesSeries: function(t, e) {
              return new f(t, e)._execute();
            },
            TimesSeries: f
          };
        },
        { './aigle': 2, './internal/util': 38, './times': 73, 'aigle-core': 82 }
      ],
      76: [
        function(t, e, i) {
          'use strict';
          var r = t('./each').Each,
            s = t('./internal/collection').setParallel,
            o = t('./internal/util'),
            n = o.call3,
            c = o.callProxyReciever,
            l = o.clone,
            u = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, a), void 0 !== r && (this._result = r);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t) {
                  !1 === t
                    ? this._promise._resolve(l(this._result))
                    : 0 == --this._rest && this._promise._resolve(this._result);
                }),
                e
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
              ++s < t && c(n(i, e, r[s], s), this, s);

            );
          }
          function _() {
            for (
              var t = this, e = t._rest, i = t._result, r = t._iterator, s = t._coll, o = t._keys, l = -1;
              ++l < e;

            ) {
              var u = o[l];
              if (!1 === c(n(r, i, s[u], u), this, l)) break;
            }
          }
          e.exports = {
            transform: function(t, e, i) {
              return new u(t, e, i)._execute();
            },
            Transform: u
          };
        },
        { './each': 12, './internal/collection': 35, './internal/util': 38 }
      ],
      77: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachLimit').EachLimit,
            s = t('./internal/collection').setLimit,
            o = t('./internal/util'),
            n = o.DEFAULT_LIMIT,
            c = o.call3,
            l = o.callProxyReciever,
            u = o.clone,
            a = (function(t) {
              function e(e, i, r, s) {
                'function' == typeof i && ((s = r), (r = i), (i = n)),
                  t.call(this, e, i, r, h),
                  void 0 !== s && (this._result = s);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t) {
                  !1 === t
                    ? this._promise._resolve(u(this._result))
                    : 0 == --this._rest
                      ? this._promise._resolve(this._result)
                      : this._callRest-- > 0 && this._iterate();
                }),
                e
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
        { './eachLimit': 13, './internal/collection': 35, './internal/util': 38 }
      ],
      78: [
        function(t, e, i) {
          'use strict';
          var r = t('./eachSeries').EachSeries,
            s = t('./internal/collection').setSeries,
            o = t('./internal/util'),
            n = o.call3,
            c = o.callProxyReciever,
            l = o.clone,
            u = (function(t) {
              function e(e, i, r) {
                t.call(this, e, i, a), void 0 !== r && (this._result = r);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t) {
                  !1 === t
                    ? this._promise._resolve(l(this._result))
                    : 0 == --this._rest ? this._promise._resolve(this._result) : this._iterate();
                }),
                e
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
        { './eachSeries': 14, './internal/collection': 35, './internal/util': 38 }
      ],
      79: [
        function(t, e, i) {
          'use strict';
          var r = t('./whilst'),
            s = r.AigleWhilst,
            o = (function(t) {
              function e(e) {
                t.call(this, e);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._callResolve = function(t) {
                  t ? this._proxy._promise._resolve(this._value) : this._proxy._next(this._value);
                }),
                e
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
        { './whilst': 81 }
      ],
      80: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.apply,
            l = o.call1,
            u = o.callProxyReciever,
            a = {},
            h = function(t, e) {
              (this._promise = t), (this._handler = e);
            };
          h.prototype._dispose = function() {
            var t = this,
              e = this._promise;
            switch (e._resolved) {
              case 0:
                return e.then(function() {
                  return t._dispose();
                });
              case 1:
                return l(this._handler, this._promise._value);
            }
          };
          var _ = (function(t) {
            function e(e, i) {
              t.call(this);
              var r = e.length;
              (this._promise = new s(n)),
                (this._rest = r),
                (this._disposed = r),
                (this._array = e),
                (this._error = void 0),
                (this._result = Array(r)),
                (this._handler = i);
              for (var o = -1; ++o < r; ) {
                var c = e[o];
                u(c instanceof h == !1 ? c : c._promise, this, o);
              }
            }
            return (
              t && (e.__proto__ = t),
              (e.prototype = Object.create(t && t.prototype)),
              (e.prototype.constructor = e),
              (e.prototype._spread = function() {
                var t = this._handler,
                  e = this._result;
                if ('function' != typeof t) return this._callResolve(void 0, n);
                u(c(t, e), this, n);
              }),
              (e.prototype._release = function() {
                for (var t = this._array, e = t.length; e--; ) {
                  var i = t[e];
                  i instanceof h == !1 ? this._callResolve(i, a) : u(i._dispose(), this, a);
                }
              }),
              (e.prototype._callResolve = function(t, e) {
                if (e === n) return (this._result = t), this._release();
                e !== a
                  ? ((this._result[e] = t), 0 == --this._rest && this._spread())
                  : 0 == --this._disposed &&
                    (this._error ? this._promise._reject(this._error) : this._promise._resolve(this._result));
              }),
              (e.prototype._callReject = function(t) {
                if (this._error) return this._promise._reject(t);
                (this._error = t), this._release();
              }),
              e
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
            Disposer: h
          };
        },
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      81: [
        function(t, e, i) {
          'use strict';
          var r = t('aigle-core').AigleProxy,
            s = t('./aigle'),
            o = t('./internal/util'),
            n = o.INTERNAL,
            c = o.callProxyReciever,
            l = o.call1,
            u = (function(t) {
              function e(e) {
                t.call(this), (this._tester = e), (this._proxy = void 0), (this._value = void 0);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._test = function(t) {
                  (this._value = t), c(l(this._tester, t), this, void 0);
                }),
                (e.prototype._callResolve = function(t) {
                  t ? this._proxy._next(this._value) : this._proxy._promise._resolve(this._value);
                }),
                (e.prototype._callReject = function(t) {
                  this._proxy._callReject(t);
                }),
                e
              );
            })(r),
            a = (function(t) {
              function e(e, i) {
                t.call(this), (this._promise = new s(n)), (this._tester = e), (this._iterator = i), (e._proxy = this);
              }
              return (
                t && (e.__proto__ = t),
                (e.prototype = Object.create(t && t.prototype)),
                (e.prototype.constructor = e),
                (e.prototype._iterate = function(t) {
                  return this._callResolve(t), this._promise;
                }),
                (e.prototype._next = function(t) {
                  c(l(this._iterator, t), this, void 0);
                }),
                (e.prototype._callResolve = function(t) {
                  this._tester._test(t);
                }),
                (e.prototype._callReject = function(t) {
                  this._promise._reject(t);
                }),
                e
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
        { './aigle': 2, './internal/util': 38, 'aigle-core': 82 }
      ],
      82: [
        function(t, e, i) {
          'use strict';
          e.exports = { AigleCore: function() {}, AigleProxy: function() {} };
        },
        {}
      ],
      83: [
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
          function l(t) {
            if (r === setTimeout) return setTimeout(t, 0);
            if ((r === n || !r) && setTimeout) return (r = setTimeout), setTimeout(t, 0);
            try {
              return r(t, 0);
            } catch (e) {
              try {
                return r.call(null, t, 0);
              } catch (e) {
                return r.call(this, t, 0);
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
                (function(t) {
                  if (s === clearTimeout) return clearTimeout(t);
                  if ((s === c || !s) && clearTimeout) return (s = clearTimeout), clearTimeout(t);
                  try {
                    s(t);
                  } catch (e) {
                    try {
                      return s.call(null, t);
                    } catch (e) {
                      return s.call(this, t);
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
            if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) i[r - 1] = e[r];
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
      84: [
        function(t, e, i) {
          (function(t, e) {
            !(function(e, i) {
              'use strict';
              if (!e.setImmediate) {
                var r,
                  s,
                  o,
                  n,
                  c,
                  l = 1,
                  u = {},
                  a = !1,
                  h = e.document,
                  _ = Object.getPrototypeOf && Object.getPrototypeOf(e);
                (_ = _ && _.setTimeout ? _ : e),
                  '[object process]' === {}.toString.call(e.process)
                    ? (r = function(e) {
                        t.nextTick(function() {
                          f(e);
                        });
                      })
                    : !(function() {
                        if (e.postMessage && !e.importScripts) {
                          var t = !0,
                            i = e.onmessage;
                          return (
                            (e.onmessage = function() {
                              t = !1;
                            }),
                            e.postMessage('', '*'),
                            (e.onmessage = i),
                            t
                          );
                        }
                      })()
                      ? e.MessageChannel
                        ? (((o = new MessageChannel()).port1.onmessage = function(t) {
                            f(t.data);
                          }),
                          (r = function(t) {
                            o.port2.postMessage(t);
                          }))
                        : h && 'onreadystatechange' in h.createElement('script')
                          ? ((s = h.documentElement),
                            (r = function(t) {
                              var e = h.createElement('script');
                              (e.onreadystatechange = function() {
                                f(t), (e.onreadystatechange = null), s.removeChild(e), (e = null);
                              }),
                                s.appendChild(e);
                            }))
                          : (r = function(t) {
                              setTimeout(f, 0, t);
                            })
                      : ((n = 'setImmediate$' + Math.random() + '$'),
                        (c = function(t) {
                          t.source === e &&
                            'string' == typeof t.data &&
                            0 === t.data.indexOf(n) &&
                            f(+t.data.slice(n.length));
                        }),
                        e.addEventListener ? e.addEventListener('message', c, !1) : e.attachEvent('onmessage', c),
                        (r = function(t) {
                          e.postMessage(n + t, '*');
                        })),
                  (_.setImmediate = function(t) {
                    var e = arguments;
                    'function' != typeof t && (t = new Function('' + t));
                    for (var i = new Array(arguments.length - 1), s = 0; s < i.length; s++) i[s] = e[s + 1];
                    var o = { callback: t, args: i };
                    return (u[l] = o), r(l), l++;
                  }),
                  (_.clearImmediate = p);
              }
              function p(t) {
                delete u[t];
              }
              function f(t) {
                if (a) setTimeout(f, 0, t);
                else {
                  var e = u[t];
                  if (e) {
                    a = !0;
                    try {
                      !(function(t) {
                        var e = t.callback,
                          r = t.args;
                        switch (r.length) {
                          case 0:
                            e();
                            break;
                          case 1:
                            e(r[0]);
                            break;
                          case 2:
                            e(r[0], r[1]);
                            break;
                          case 3:
                            e(r[0], r[1], r[2]);
                            break;
                          default:
                            e.apply(i, r);
                        }
                      })(e);
                    } finally {
                      p(t), (a = !1);
                    }
                  }
                }
              }
            })('undefined' == typeof self ? (void 0 === e ? this : e) : self);
          }.call(
            this,
            t('_process'),
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : {}
          ));
        },
        { _process: 83 }
      ],
      85: [
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
                var i = function() {};
                (i.prototype = e.prototype), (t.prototype = new i()), (t.prototype.constructor = t);
              });
        },
        {}
      ],
      86: [
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
      87: [
        function(t, e, i) {
          (function(e, r) {
            var s = /%[sdj%]/g;
            (i.format = function(t) {
              var e = arguments;
              if (!m(t)) {
                for (var i = [], r = 0; r < arguments.length; r++) i.push(c(e[r]));
                return i.join(' ');
              }
              r = 1;
              for (
                var o = arguments,
                  n = o.length,
                  l = String(t).replace(s, function(t) {
                    if ('%%' === t) return '%';
                    if (r >= n) return t;
                    switch (t) {
                      case '%s':
                        return String(o[r++]);
                      case '%d':
                        return Number(o[r++]);
                      case '%j':
                        try {
                          return JSON.stringify(o[r++]);
                        } catch (t) {
                          return '[Circular]';
                        }
                      default:
                        return t;
                    }
                  }),
                  u = o[r];
                r < n;
                u = o[++r]
              )
                y(u) || !R(u) ? (l += ' ' + u) : (l += ' ' + c(u));
              return l;
            }),
              (i.deprecate = function(t, s) {
                if (d(r.process))
                  return function() {
                    return i.deprecate(t, s).apply(this, arguments);
                  };
                if (!0 === e.noDeprecation) return t;
                var o = !1;
                return function() {
                  if (!o) {
                    if (e.throwDeprecation) throw new Error(s);
                    e.traceDeprecation ? console.trace(s) : console.error(s), (o = !0);
                  }
                  return t.apply(this, arguments);
                };
              });
            var o,
              n = {};
            function c(t, e) {
              var r = { seen: [], stylize: u };
              return (
                arguments.length >= 3 && (r.depth = arguments[2]),
                arguments.length >= 4 && (r.colors = arguments[3]),
                f(e) ? (r.showHidden = e) : e && i._extend(r, e),
                d(r.showHidden) && (r.showHidden = !1),
                d(r.depth) && (r.depth = 2),
                d(r.colors) && (r.colors = !1),
                d(r.customInspect) && (r.customInspect = !0),
                r.colors && (r.stylize = l),
                a(r, t, r.depth)
              );
            }
            function l(t, e) {
              var i = c.styles[e];
              return i ? '[' + c.colors[i][0] + 'm' + t + '[' + c.colors[i][1] + 'm' : t;
            }
            function u(t, e) {
              return t;
            }
            function a(t, e, r) {
              if (
                t.customInspect &&
                e &&
                S(e.inspect) &&
                e.inspect !== i.inspect &&
                (!e.constructor || e.constructor.prototype !== e)
              ) {
                var s = e.inspect(r, t);
                return m(s) || (s = a(t, s, r)), s;
              }
              var o = (function(t, e) {
                if (d(e)) return t.stylize('undefined', 'undefined');
                if (m(e)) {
                  var i =
                    "'" +
                    JSON.stringify(e)
                      .replace(/^"|"$/g, '')
                      .replace(/'/g, "\\'")
                      .replace(/\\"/g, '"') +
                    "'";
                  return t.stylize(i, 'string');
                }
                if (v(e)) return t.stylize('' + e, 'number');
                if (f(e)) return t.stylize('' + e, 'boolean');
                if (y(e)) return t.stylize('null', 'null');
              })(t, e);
              if (o) return o;
              var n,
                c = Object.keys(e),
                l = ((n = {}),
                c.forEach(function(t, e) {
                  n[t] = !0;
                }),
                n);
              if (
                (t.showHidden && (c = Object.getOwnPropertyNames(e)),
                x(e) && (c.indexOf('message') >= 0 || c.indexOf('description') >= 0))
              )
                return h(e);
              if (0 === c.length) {
                if (S(e)) {
                  var u = e.name ? ': ' + e.name : '';
                  return t.stylize('[Function' + u + ']', 'special');
                }
                if (g(e)) return t.stylize(RegExp.prototype.toString.call(e), 'regexp');
                if (j(e)) return t.stylize(Date.prototype.toString.call(e), 'date');
                if (x(e)) return h(e);
              }
              var R,
                L = '',
                b = !1,
                w = ['{', '}'];
              (p(e) && ((b = !0), (w = ['[', ']'])), S(e)) && (L = ' [Function' + (e.name ? ': ' + e.name : '') + ']');
              return (
                g(e) && (L = ' ' + RegExp.prototype.toString.call(e)),
                j(e) && (L = ' ' + Date.prototype.toUTCString.call(e)),
                x(e) && (L = ' ' + h(e)),
                0 !== c.length || (b && 0 != e.length)
                  ? r < 0
                    ? g(e) ? t.stylize(RegExp.prototype.toString.call(e), 'regexp') : t.stylize('[Object]', 'special')
                    : (t.seen.push(e),
                      (R = b
                        ? (function(t, e, i, r, s) {
                            for (var o = [], n = 0, c = e.length; n < c; ++n)
                              k(e, String(n)) ? o.push(_(t, e, i, r, String(n), !0)) : o.push('');
                            return (
                              s.forEach(function(s) {
                                s.match(/^\d+$/) || o.push(_(t, e, i, r, s, !0));
                              }),
                              o
                            );
                          })(t, e, r, l, c)
                        : c.map(function(i) {
                            return _(t, e, r, l, i, b);
                          })),
                      t.seen.pop(),
                      (function(t, e, i) {
                        if (
                          t.reduce(function(t, e) {
                            return 0, e.indexOf('\n') >= 0 && 0, t + e.replace(/\u001b\[\d\d?m/g, '').length + 1;
                          }, 0) > 60
                        )
                          return i[0] + ('' === e ? '' : e + '\n ') + ' ' + t.join(',\n  ') + ' ' + i[1];
                        return i[0] + e + ' ' + t.join(', ') + ' ' + i[1];
                      })(R, L, w))
                  : w[0] + L + w[1]
              );
            }
            function h(t) {
              return '[' + Error.prototype.toString.call(t) + ']';
            }
            function _(t, e, i, r, s, o) {
              var n, c, l;
              if (
                ((l = Object.getOwnPropertyDescriptor(e, s) || { value: e[s] }).get
                  ? (c = l.set ? t.stylize('[Getter/Setter]', 'special') : t.stylize('[Getter]', 'special'))
                  : l.set && (c = t.stylize('[Setter]', 'special')),
                k(r, s) || (n = '[' + s + ']'),
                c ||
                  (t.seen.indexOf(l.value) < 0
                    ? (c = y(i) ? a(t, l.value, null) : a(t, l.value, i - 1)).indexOf('\n') > -1 &&
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
                d(n))
              ) {
                if (o && s.match(/^\d+$/)) return c;
                (n = JSON.stringify('' + s)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)
                  ? ((n = n.substr(1, n.length - 2)), (n = t.stylize(n, 'name')))
                  : ((n = n
                      .replace(/'/g, "\\'")
                      .replace(/\\"/g, '"')
                      .replace(/(^"|"$)/g, "'")),
                    (n = t.stylize(n, 'string')));
              }
              return n + ': ' + c;
            }
            function p(t) {
              return Array.isArray(t);
            }
            function f(t) {
              return 'boolean' == typeof t;
            }
            function y(t) {
              return null === t;
            }
            function v(t) {
              return 'number' == typeof t;
            }
            function m(t) {
              return 'string' == typeof t;
            }
            function d(t) {
              return void 0 === t;
            }
            function g(t) {
              return R(t) && '[object RegExp]' === L(t);
            }
            function R(t) {
              return 'object' == typeof t && null !== t;
            }
            function j(t) {
              return R(t) && '[object Date]' === L(t);
            }
            function x(t) {
              return R(t) && ('[object Error]' === L(t) || t instanceof Error);
            }
            function S(t) {
              return 'function' == typeof t;
            }
            function L(t) {
              return Object.prototype.toString.call(t);
            }
            function b(t) {
              return t < 10 ? '0' + t.toString(10) : t.toString(10);
            }
            (i.debuglog = function(t) {
              if ((d(o) && (o = e.env.NODE_DEBUG || ''), (t = t.toUpperCase()), !n[t]))
                if (new RegExp('\\b' + t + '\\b', 'i').test(o)) {
                  var r = e.pid;
                  n[t] = function() {
                    var e = i.format.apply(i, arguments);
                    console.error('%s %d: %s', t, r, e);
                  };
                } else n[t] = function() {};
              return n[t];
            }),
              (i.inspect = c),
              (c.colors = {
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
              (c.styles = {
                special: 'cyan',
                number: 'yellow',
                boolean: 'yellow',
                undefined: 'grey',
                null: 'bold',
                string: 'green',
                date: 'magenta',
                regexp: 'red'
              }),
              (i.isArray = p),
              (i.isBoolean = f),
              (i.isNull = y),
              (i.isNullOrUndefined = function(t) {
                return null == t;
              }),
              (i.isNumber = v),
              (i.isString = m),
              (i.isSymbol = function(t) {
                return 'symbol' == typeof t;
              }),
              (i.isUndefined = d),
              (i.isRegExp = g),
              (i.isObject = R),
              (i.isDate = j),
              (i.isError = x),
              (i.isFunction = S),
              (i.isPrimitive = function(t) {
                return (
                  null === t ||
                  'boolean' == typeof t ||
                  'number' == typeof t ||
                  'string' == typeof t ||
                  'symbol' == typeof t ||
                  void 0 === t
                );
              }),
              (i.isBuffer = t('./support/isBuffer'));
            var w = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            function k(t, e) {
              return Object.prototype.hasOwnProperty.call(t, e);
            }
            (i.log = function() {
              var t, e;
              console.log(
                '%s - %s',
                ((t = new Date()),
                (e = [b(t.getHours()), b(t.getMinutes()), b(t.getSeconds())].join(':')),
                [t.getDate(), w[t.getMonth()], e].join(' ')),
                i.format.apply(i, arguments)
              );
            }),
              (i.inherits = t('inherits')),
              (i._extend = function(t, e) {
                if (!e || !R(e)) return t;
                for (var i = Object.keys(e), r = i.length; r--; ) t[i[r]] = e[i[r]];
                return t;
              });
          }.call(
            this,
            t('_process'),
            'undefined' != typeof global
              ? global
              : 'undefined' != typeof self ? self : 'undefined' != typeof window ? window : {}
          ));
        },
        { './support/isBuffer': 86, _process: 83, inherits: 85 }
      ],
      88: [
        function(t, e, i) {
          e.exports = {
            name: 'aigle',
            version: '1.12.0-alpha.7',
            description: 'Aigle is an ideal Promise library, faster and more functional than other Promise libraries',
            main: 'index.js',
            typings: 'aigle.d.ts',
            private: !0,
            browser: 'browser.js',
            scripts: {
              bench: 'node --expose_gc ./benchmark -d',
              eslint: 'eslint . --ext .js',
              test: 'DELAY=50 npm-run-all -p eslint test:type test:cov',
              'test:mocha': 'mocha test/**/*.js',
              'test:cov': 'nyc npm run test:mocha',
              'test:type': 'cd typings && tsc',
              codecov: 'nyc report --reporter=lcovonly && codecov',
              prettier:
                "prettier --write './benchmark/**/*.js' './gulp/**/*.js' './lib/**/*.js' './test/**/*.js' './typings/**/*.ts'",
              precommit: 'lint-staged'
            },
            homepage: 'https://github.com/suguru03/aigle',
            keywords: ['aigle', 'promise', 'async'],
            files: ['README.md', 'index.js', 'lib/', 'browser.js', 'dist/'],
            author: 'Suguru Motegi',
            license: 'MIT',
            devDependencies: {
              babili: '0.1.4',
              benchmark: '^2.1.1',
              bluebird: '^3.5.1',
              browserify: '^16.0.0',
              buble: '^0.19.0',
              codecov: '^3.0.0',
              docdash: '^0.4.0',
              eslint: '^4.19.1',
              'fs-extra': '^4.0.2',
              gulp: '^3.9.1',
              'gulp-bump': '^3.0.0',
              'gulp-git': '^2.4.2',
              'gulp-tag-version': '^1.3.0',
              husky: '^0.14.3',
              jsdoc: '^3.5.5',
              'lint-staged': '^7.0.0',
              lodash: '^4.15.0',
              minimist: '^1.2.0',
              mocha: '^5.0.0',
              'mocha.parallel': '0.15.5',
              'neo-async': '^2.5.0',
              'npm-run-all': '^4.1.2',
              nyc: '^11.4.1',
              prettier: '^1.11.1',
              'require-dir': '^1.0.0',
              'run-sequence': '^2.0.0',
              semver: '^5.5.0',
              setimmediate: '^1.0.5',
              tslint: '^5.9.1',
              typescript: '^2.7.2',
              'uglify-js': '^3.1.5'
            },
            dependencies: { 'aigle-core': '^1.0.0' },
            'lint-staged': { '*.{js,ts}': ['prettier --write', 'git add'] },
            prettier: { printWidth: 120, singleQuote: !0 }
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