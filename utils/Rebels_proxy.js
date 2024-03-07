const IiiIll = require("got");

let IIlii = require("https-proxy-agent").HttpsProxyAgent,
    IlI1il = process.env.RS_PROXY_API || "",
    IilliI = process.env.RS_PROXY_TIMEOUT || 20000,
    IlI1ii = 1,
    lIIiii = "",
    iI1lli = 0;

async function ll1iI(IIli1I) {
  if (!IIli1I) return;
  const llIliI = await IiiIll.get(IIli1I, {
    "timeout": {
      "request": 30000
    }
  }).catch(I1i111 => {
    console.log(I1i111);
  });
  lIIiii = llIliI?.["body"] ? llIliI.body.replace("\n", "").replace(/^.*:\/\//, "") : "";
  while_get_proxy();
}

ll1iI(IlI1il);

while_get_proxy = async () => {
  clearTimeout(iI1lli);
  iI1lli = setTimeout(() => {
    ll1iI(IlI1il);
  }, IilliI);
};

async function iI1lll(l1lIli) {
  return new Promise(lIIiiI => {
    setTimeout(lIIiiI, l1lIli);
  });
}

function l1lIll(II1lil, IIli1l, II1lii = false) {
  return this.failnum = 0, ddd = async (IIll1, ll1il) => {
    if (IlI1il && (this.failed || II1lii)) {
      let ll1ll = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
      this.ip = lIIiii;
      if (ll1ll.test(this.ip) !== false) this.agent = this.ip ? new IIlii("http://" + this.ip) : undefined;
      this.agent ? console.log("使用代理IP：" + this.ip) : "";
      IIll1.agent = {
        "https": this.agent,
        "http": this.agent
      };
    }

    IIll1.timeout = {
      "request": 5000,
      "response": 5000
    };

    try {
      II1lil[IIli1l](IIll1, async (ii1lI, I1ilIl, I11iII) => {
        try {
          ii1lI ? this.failnum < 1 ? (this.failed = true, this.failnum++, await ddd(IIll1, ll1il)) : (this.failed = true, this.failnum = 0, ll1il(ii1lI, I1ilIl, I11iII)) : (IlI1ii++, this.failed = false, this.failnum = 0, ll1il(ii1lI, I1ilIl, I11iII));
        } catch (l1l11l) {
          ll1iI(IlI1il);
          console.log(l1l11l);
          l1lIll(II1lil, IIli1l, II1lii = false);
        }
      });
    } catch (l1iIi) {
      ll1iI(IlI1il);
      console.log(l1iIi);
      l1lIll(II1lil, IIli1l, II1lii = false);
    }
  };
}

function I1l1II() {}

module.exports = {
  "intoRequest": l1lIll
};