let II1lii = require("ds");

try {
  II1lii.toString() === "[object Object]" && (II1lii = II1lii.DS);
} catch {}

function lIIii1(ll1i1 = 0, IIli1i = null) {
  let lliil1 = this;

  lliil1.now = function () {
    return new Date().getTime();
  };

  lliil1.ttl = ll1i1 || 0;
  IIli1i ? lliil1.data = new II1lii(IIli1i) : lliil1.data = new II1lii();

  let IIllI = function () {
    if (IIli1i) lliil1.data.save(IIli1i);
    return lliil1;
  },
      lliilI = function (Illl1I) {
    return delete lliil1.data[Illl1I], IIllI(), lliil1;
  };

  lliil1.get = function (lilil, ll1ll) {
    let Illl11 = null,
        ii1lI = lliil1.data[lilil];
    ii1lI && (ii1lI.expires == 0 || lliil1.now() < ii1lI.expires ? Illl11 = ii1lI.val : (Illl11 = null, lliilI(lilil)));
    if (ll1ll) ll1ll(Illl11);
    return Illl11;
  };

  lliil1.del = function (I1ilIl, I11iII) {
    let I1ilIi = lliil1.get(I1ilIl);
    lliilI(I1ilIl);
    if (I11iII) I11iII(I1ilIi);
    return I1ilIi;
  };

  lliil1.put = function (IiiiI, llIlli = null, llIlll = 0, lliii1) {
    if (llIlll == 0) llIlll = lliil1.ttl;
    let lIIili = llIlll == 0 ? 0 : lliil1.now() + llIlll;
    var Iiii1 = lliil1.del(IiiiI);
    llIlli !== null && (lliil1.data[IiiiI] = {
      "expires": lIIili,
      "val": llIlli
    }, IIllI());
    if (lliii1) lliii1(Iiii1);
    return Iiii1;
  };
}

module.exports = lIIii1;