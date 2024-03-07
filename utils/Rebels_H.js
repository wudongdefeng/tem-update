/*
专用依赖库，必须存在，否则报错。
new Env('Rebels_H');
*/

const iii1l = require("fs"),
      iliIi = require("jsdom"),
      iiil1I = require("crypto-js"),
      llII11 = require("querystring");

class lIiI1 {
  ["wuxianDefense"]() {
    const iil11l = ["/api/task/building/build", "/api/prize/draw", "/api/task/member/rank/getMember", "/api/task/rank/getRankInfo", "/api/task/member/rank/getMember", "/api/prize/receive/acquire", "/api/task/daySign/getSignClick", "/api/task/addSku/toDo", "/api/task/followGoods/followGoods", "/api/task/dmpss/toDo", "/api/task/dailyGift/todo", "/api/group/draw/toDo", "/api/basic/task/toDo", "/api/task/jiugongge/toDo", "/api/task/niudanji/toDo", "/api/task/organizeTeam/saveMember"],
          IiIi1l = ["/wxScratchActive/start", "/wxPointDrawActivity/start", "/wxPointBlindBox/start", "/wxGashaponActive/start", "/wxDollGrabbing/start", "/wxDrawActivity/start", "/wxShopFollowActivity/getPrize", "/wx/completeInfoActivity/save", "/activity/daily/wx/grabGift", "/sign/wx/signUp", "/sign/sevenDay/wx/signUp", "/wxTeam/saveCaptain", "/wxTeam/saveMember"],
          llII1i = [...iil11l, ...IiIi1l];

    function illI1I(IliIi1, Iii1ll, liiiIl) {
      function iIlii1(iliiIi) {
        iliiIi = iliiIi.split("").reverse().join("");
        const i11Ill = new Uint8Array(12),
              iliiIl = new TextEncoder().encode(iliiIi);

        for (let I1lii1 = 0; I1lii1 < iliiIl.length; I1lii1 += 2) {
          let ilIIlI = iliiIl[I1lii1] << 5 | iliiIl[I1lii1 + 1] & 255;
          ilIIlI %= 63;
          i11Ill[I1lii1 >> 1] = ilIIlI;
        }

        let IliIii = "";

        for (let iIl11 = 0; iIl11 < i11Ill.length; iIl11++) {
          IliIii += (i11Ill[iIl11] + 256).toString(2).slice(1);
        }

        let liIIl1 = "",
            iIliiI = "";

        for (let ii1I = 0; ii1I < 16; ii1I++) {
          if (ii1I !== 0) {
            const i11Ili = ii1I * 6,
                  liII = IliIii.substring(i11Ili, i11Ili + 6);
            let l1IlI1 = parseInt(liII, 2);
            const ii11 = iIliiI.split("");

            for (let liIIil = 0; liIIil < ii11.length; liIIil++) {
              ii11[liIIil] === "1" && (l1IlI1 = (l1IlI1 >> 6 - liIIil | l1IlI1 << liIIil) & 63);
            }

            iIliiI = (l1IlI1 & 63).toString(2).padStart(6, "0");
          } else iIliiI = IliIii.substring(0, 6);

          liIIl1 += iIliiI;
        }

        for (let IliIiI = 0; IliIiI < 12; IliIiI++) {
          const liiiII = IliIiI * 8;
          i11Ill[IliIiI] = parseInt(liIIl1.substring(liiiII, liiiII + 8), 2);
        }

        const IIiilI = btoa(String.fromCharCode.apply(null, i11Ill));
        return IIiilI;
      }

      const IIiil1 = ["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"];
      let l1IlII = Date.now() + parseInt(liiiIl);
      typeof IliIi1 != "object" && (IliIi1 = JSON.parse(IliIi1));
      IliIi1.nowTime = l1IlII;
      let ii1i = Iii1ll + l1IlII;
      const ilIIl1 = ii1i.substring(0, ii1i.length - 5);
      let ii1l = "";

      for (let IIiili = 0; IIiili < ilIIl1.length; IIiili++) {
        let IIiiiI = ilIIl1.charCodeAt(IIiili),
            lIi1l1 = IIiiiI % 10,
            i11IlI = IIiil1[lIi1l1][IIiili];
        ii1l += i11IlI;
      }

      var liIIiI = ii1l.length,
          Iii1li = Math.floor(liIIiI / 24),
          iIl1l = "";

      for (var iIl1i = 0; iIl1i < 24; iIl1i++) {
        var i11i1 = (iIl1i + 1) * Iii1li;
        iIl1i === 23 && (i11i1 = liIIiI);
        var liIIi1 = ii1l.substring(iIl1i * Iii1li, i11i1),
            I1liiI = [];

        for (var l1I11l = 0; l1I11l < liIIi1.length; l1I11l++) {
          I1liiI.push(liIIi1.charCodeAt(l1I11l));
        }

        var iIliii = I1liiI.reduce(function (i11Il1, IIIlli) {
          return i11Il1 + IIIlli;
        }, 0),
            l1I11i = Math.floor(iIliii / I1liiI.length);
        iIl1l += String.fromCharCode(l1I11i);
      }

      ii1l = iIl1l;
      const iIl1I = iIlii1(ii1l),
            liIi = iiil1I.enc.Utf8.parse(iIl1I),
            liIIlI = iiil1I.enc.Utf8.parse(""),
            IliIil = iiil1I.AES.encrypt(JSON.stringify(IliIi1), liIi, {
        "iv": liIIlI,
        "mode": iiil1I.mode.ECB,
        "padding": iiil1I.pad.Pkcs7
      });
      return IliIil.toString();
    }

    function ilI1Ii(Iii1i1) {
      const llli1I = llII1i,
            IlilI1 = Object.fromEntries(llli1I.map(Il1iII => [Il1iII, true])),
            iIIIi = IlilI1[Iii1i1] !== undefined;
      return iIIIi;
    }

    function ilI1Il() {
      const Iii1iI = iiil1I.enc.Utf8.parse("Hd5W5ONsYKmGm9QA"),
            lIi1lI = iiil1I.enc.Utf8.parse("2JjUvJEAsA2Yog==");

      function IIiiil(IIiiii) {
        const l1IlIi = iiil1I.enc.Utf8.parse(IIiiii),
              l1IlIl = iiil1I.AES.encrypt(l1IlIi, Iii1iI, {
          "iv": lIi1lI,
          "mode": iiil1I.mode.CBC,
          "padding": iiil1I.pad.Pkcs7
        });
        return iiil1I.enc.Base64.stringify(l1IlIl.ciphertext);
      }

      function iIIIl(liIIli) {
        const illiiI = iiil1I.enc.Base64.parse(liIIli),
              liIl = iiil1I.enc.Base64.stringify(illiiI),
              llli11 = iiil1I.AES.decrypt(liIl, Iii1iI, {
          "iv": lIi1lI,
          "mode": iiil1I.mode.CBC,
          "padding": iiil1I.pad.Pkcs7
        });
        return iiil1I.enc.Utf8.stringify(llli11).toString();
      }

      return {
        "encrypt": IIiiil,
        "decrypt": iIIIl
      };
    }

    return {
      "encrypt": illI1I,
      "isDefenseApi": ilI1Ii,
      "interactionV2": ilI1Il
    };
  }

}

class IiIi1i {
  constructor() {
    this.domWindow3_1 = null;
    this.domWindow3_1_UA = null;
    this.domWindow4_1 = null;
    this.domWindow4_1_UA = null;
    this.domWindow4_2 = null;
    this.domWindow4_2_UA = null;
    this.domWindow4_3 = null;
    this.domWindow4_3_UA = null;
    this.domWindow4_4 = null;
    this.domWindow4_4_UA = null;
  }

  async ["_sleep"](i11Iil) {
    return new Promise((Ii1Il, Iii1ii) => {
      setTimeout(() => {
        Ii1Il(i11Iil);
      }, i11Iil);
    });
  }

  async ["_loadH5Sdk"](Iii1il, lIi1li) {
    const {
      JSDOM: Il1iIl
    } = iliIi;
    let lIi1ll = new iliIi.ResourceLoader({
      "userAgent": lIi1li
    }),
        l1IIiI = new iliIi.VirtualConsole(),
        IlilIi = {
      "url": "http://localhost",
      "userAgent": lIi1li,
      "runScripts": "dangerously",
      "resources": lIi1ll,
      "includeNodeLocations": true,
      "storageQuota": 1000000000,
      "pretendToBeVisual": true,
      "virtualConsole": l1IIiI
    },
        I1lilI = "";

    switch (Iii1il) {
      case "3.1":
        I1lilI = "<script>" + iii1l.readFileSync(__dirname + "/Rebels/3_1.js", "utf-8") + "</script>";
        break;

      case "4.1":
        I1lilI = "<script>" + iii1l.readFileSync(__dirname + "/Rebels/4_1.js", "utf-8") + "</script>";
        break;

      case "4.2":
        I1lilI = "<script>" + iii1l.readFileSync(__dirname + "/Rebels/4_2.js", "utf-8") + "</script>";
        break;

      case "4.3":
        I1lilI = "<script>" + iii1l.readFileSync(__dirname + "/Rebels/4_3.js", "utf-8") + "</script>";
        break;

      case "4.4":
        I1lilI = "<script>" + iii1l.readFileSync(__dirname + "/Rebels/4.js", "utf-8") + "</script>";
        break;
    }

    const i11IiI = new Il1iIl("<body>\n    " + I1lilI + "\n</body>", IlilIi);

    do {
      await this._sleep(100);
    } while (!i11IiI.window.ParamsSign);

    switch (Iii1il) {
      case "3.1":
        this.domWindow3_1 = i11IiI.window;
        break;

      case "4.1":
        this.domWindow4_1 = i11IiI.window;
        break;

      case "4.2":
        this.domWindow4_2 = i11IiI.window;
        break;

      case "4.3":
        this.domWindow4_3 = i11IiI.window;
        break;

      case "4.4":
        this.domWindow4_4 = i11IiI.window;
        break;
    }
  }

  async ["_signWaap"](l1IIi1, IIiii1, IlilII) {
    const I1lil1 = new IlilII.ParamsSign({
      "appId": l1IIi1,
      "preRequest": false,
      "debug": false,

      "onSign"({
        code: ilIlii,
        message: liliI1,
        data: II1lI
      }) {},

      "onRequestTokenRemotely"({
        code: ilIlil,
        message: Ii1IiI
      }) {},

      "onRequestToken"({
        code: IIll11,
        message: ll1lIl
      }) {}

    });
    let iIlilI = {
      "appid": IIiii1.appid,
      "body": this._SHA256(JSON.stringify(IIiii1.body)).toString(),
      "client": IIiii1.client || "",
      "clientVersion": IIiii1.clientVersion || "",
      "functionId": IIiii1.functionId
    };

    for (const I1IIl1 of ["client", "clientVersion"]) {
      !IIiii1[I1IIl1] && delete iIlilI[I1IIl1];
    }

    IIiii1?.["t"] && (iIlilI.t = IIiii1.t);
    let i11Ii1 = await I1lil1.sign(iIlilI);
    return (!i11Ii1?.["h5st"] || i11Ii1.h5st === "null") && (console.log("❌ getH5st 签名生成失败"), i11Ii1.h5st = ""), i11Ii1?.["h5st"] || "";
  }

  async ["getH5st"](lIi1i) {
    let Ii1Ii1 = { ...lIi1i,
      "h5st": "",
      "params": "",
      "paramsData": {}
    };

    try {
      if (!(typeof lIi1i === "object" && lIi1i !== null)) {
        return console.log("❌ getH5st 传入参数有误"), Ii1Ii1;
      } else {
        const IIlII1 = ["appId", "appid", "body", "functionId"],
              ll1Iil = IIlII1.filter(li1lI => !lIi1i[li1lI]);
        if (ll1Iil.length > 0) return console.log("❌ getH5st 传入参数有误，缺少必要参数：" + ll1Iil.join(", ")), Ii1Ii1;
      }

      switch (lIi1i?.["version"]) {
        case "3.1":
        case "4.1":
        case "4.2":
        case "4.3":
        case "4.4":
          break;

        default:
          lIi1i.version = "4.3";
          break;
      }

      const {
        appId: lIiIiI,
        appid: ilIliI,
        body: II1li,
        client: Ii1lIi,
        clientVersion: li11il,
        functionId: ll1lII,
        version: Ii1lIl
      } = lIi1i,
            iIIIiI = Math.floor(Date.now() / 1000),
            li1iI = "jdapp;iPhone;12.3.1;;rn/a5e53b61-94a0-da77-7e2f-fda45564911e;M/5.0;appBuild/168919;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DG%3D%3D%22%2C%22sv%22%3A%22CG%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A" + iIIIiI + "%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;",
            I1IIi1 = lIi1i?.["ua"] || li1iI,
            ll1lI1 = "domWindow" + Ii1lIl.replace(".", "_"),
            II1ll = ll1lI1 + "_UA";
      (!this[ll1lI1] || this[II1ll] && this[II1ll] !== I1IIi1) && (await this._loadH5Sdk(Ii1lIl, I1IIi1), this[II1ll] = I1IIi1);
      const liii11 = {
        "appid": ilIliI,
        "body": II1li,
        "client": Ii1lIi,
        "clientVersion": li11il,
        "functionId": ll1lII
      };

      if (lIi1i?.["t"] && typeof lIi1i.t === "boolean") {
        lIi1i.t = Date.now();
        liii11.t = lIi1i.t;
      } else lIi1i.t = "";

      if (!liii11.client) delete liii11.client;
      if (!liii11.clientVersion) delete liii11.clientVersion;
      const lIiIii = await this._signWaap(lIiIiI, liii11, this[ll1lI1]),
            i1Ill = {
        "functionId": ll1lII,
        "body": JSON.stringify(II1li),
        "t": "",
        "appid": ilIliI,
        "client": "",
        "clientVersion": "",
        "h5st": lIiIii || ""
      };

      for (const lIi11l of ["t", "client", "clientVersion"]) {
        lIi1i[lIi11l] ? i1Ill[lIi11l] = lIi1i[lIi11l] : delete i1Ill[lIi11l];
      }

      return Ii1Ii1 = { ...lIi1i,
        "h5st": lIiIii || "",
        "params": llII11.stringify(i1Ill),
        "paramsData": i1Ill
      }, Ii1Ii1;
    } catch (lIl1Ii) {
      console.log("❌ getH5st 遇到了错误 " + (lIl1Ii.message || lIl1Ii));
    }

    return Ii1Ii1;
  }

  ["_SHA256"](lIl1Il) {
    var Il1I1I = 8,
        ll1Il1 = 0;

    function li11li(l1iiii, iiiIi1) {
      var illl1l = (l1iiii & 65535) + (iiiIi1 & 65535),
          Il11I = (l1iiii >> 16) + (iiiIi1 >> 16) + (illl1l >> 16);
      return Il11I << 16 | illl1l & 65535;
    }

    function iliiii(li1lll, lill1) {
      return li1lll >>> lill1 | li1lll << 32 - lill1;
    }

    function IIlIIi(IiIIl, IiIIi) {
      return IiIIl >>> IiIIi;
    }

    function iliiil(l1ili, i1Ii11, l1iill) {
      return l1ili & i1Ii11 ^ ~l1ili & l1iill;
    }

    function li11ll(l1ill, lIi1I1, l1iili) {
      return l1ill & lIi1I1 ^ l1ill & l1iili ^ lIi1I1 & l1iili;
    }

    function i1Il1(iiIi) {
      return iliiii(iiIi, 2) ^ iliiii(iiIi, 13) ^ iliiii(iiIi, 22);
    }

    function li1l1(iiIl) {
      return iliiii(iiIl, 6) ^ iliiii(iiIl, 11) ^ iliiii(iiIl, 25);
    }

    function IIiI1l(Ill1il) {
      return iliiii(Ill1il, 7) ^ iliiii(Ill1il, 18) ^ IIlIIi(Ill1il, 3);
    }

    function IIiI1i(IIlI) {
      return iliiii(IIlI, 17) ^ iliiii(IIlI, 19) ^ IIlIIi(IIlI, 10);
    }

    function ilIllI(I1i1l, llIiIi) {
      var IIii = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
          i1Ii1I = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
          llIiIl = new Array(64),
          I1i1i,
          lIi1II,
          iiiIii,
          IllI1,
          iiiIil,
          lilll,
          l1iilI,
          lilli,
          iiII,
          Iil11,
          Ill1iI,
          i1Ii1l;
      I1i1l[llIiIi >> 5] |= 128 << 24 - llIiIi % 32;
      I1i1l[(llIiIi + 64 >> 9 << 4) + 15] = llIiIi;

      for (var iiII = 0; iiII < I1i1l.length; iiII += 16) {
        I1i1i = i1Ii1I[0];
        lIi1II = i1Ii1I[1];
        iiiIii = i1Ii1I[2];
        IllI1 = i1Ii1I[3];
        iiiIil = i1Ii1I[4];
        lilll = i1Ii1I[5];
        l1iilI = i1Ii1I[6];
        lilli = i1Ii1I[7];

        for (var Iil11 = 0; Iil11 < 64; Iil11++) {
          if (Iil11 < 16) llIiIl[Iil11] = I1i1l[Iil11 + iiII];else llIiIl[Iil11] = li11li(li11li(li11li(IIiI1i(llIiIl[Iil11 - 2]), llIiIl[Iil11 - 7]), IIiI1l(llIiIl[Iil11 - 15])), llIiIl[Iil11 - 16]);
          Ill1iI = li11li(li11li(li11li(li11li(lilli, li1l1(iiiIil)), iliiil(iiiIil, lilll, l1iilI)), IIii[Iil11]), llIiIl[Iil11]);
          i1Ii1l = li11li(i1Il1(I1i1i), li11ll(I1i1i, lIi1II, iiiIii));
          lilli = l1iilI;
          l1iilI = lilll;
          lilll = iiiIil;
          iiiIil = li11li(IllI1, Ill1iI);
          IllI1 = iiiIii;
          iiiIii = lIi1II;
          lIi1II = I1i1i;
          I1i1i = li11li(Ill1iI, i1Ii1l);
        }

        i1Ii1I[0] = li11li(I1i1i, i1Ii1I[0]);
        i1Ii1I[1] = li11li(lIi1II, i1Ii1I[1]);
        i1Ii1I[2] = li11li(iiiIii, i1Ii1I[2]);
        i1Ii1I[3] = li11li(IllI1, i1Ii1I[3]);
        i1Ii1I[4] = li11li(iiiIil, i1Ii1I[4]);
        i1Ii1I[5] = li11li(lilll, i1Ii1I[5]);
        i1Ii1I[6] = li11li(l1iilI, i1Ii1I[6]);
        i1Ii1I[7] = li11li(lilli, i1Ii1I[7]);
      }

      return i1Ii1I;
    }

    function I1IIli(i11Ii) {
      var iilli1 = Array(),
          ilI1l1 = (1 << Il1I1I) - 1;

      for (var Iil1l = 0; Iil1l < i11Ii.length * Il1I1I; Iil1l += Il1I1I) {
        iilli1[Iil1l >> 5] |= (i11Ii.charCodeAt(Iil1l / Il1I1I) & ilI1l1) << 24 - Iil1l % 32;
      }

      return iilli1;
    }

    function Il1I1i(iiiIli) {
      iiiIli = iiiIli.replace(/\r\n/g, "\n");
      var IllIi = "";

      for (var IIli = 0; IIli < iiiIli.length; IIli++) {
        var iII11 = iiiIli.charCodeAt(IIli);
        if (iII11 < 128) IllIi += String.fromCharCode(iII11);else iII11 > 127 && iII11 < 2048 ? (IllIi += String.fromCharCode(iII11 >> 6 | 192), IllIi += String.fromCharCode(iII11 & 63 | 128)) : (IllIi += String.fromCharCode(iII11 >> 12 | 224), IllIi += String.fromCharCode(iII11 >> 6 & 63 | 128), IllIi += String.fromCharCode(iII11 & 63 | 128));
      }

      return IllIi;
    }

    function lIilI1(i1i1iI) {
      var iillii = ll1Il1 ? "0123456789ABCDEF" : "0123456789abcdef",
          ilI1iI = "";

      for (var l1I1i = 0; l1I1i < i1i1iI.length * 4; l1I1i++) {
        ilI1iI += iillii.charAt(i1i1iI[l1I1i >> 2] >> (3 - l1I1i % 4) * 8 + 4 & 15) + iillii.charAt(i1i1iI[l1I1i >> 2] >> (3 - l1I1i % 4) * 8 & 15);
      }

      return ilI1iI;
    }

    return lIl1Il = Il1I1i(lIl1Il), lIilI1(ilIllI(I1IIli(lIl1Il), lIl1Il.length * Il1I1I));
  }

}

module.exports = {
  "wuxianDefense": new lIiI1().wuxianDefense(),
  "H5st": new IiIi1i()
};