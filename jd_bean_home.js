/*
领京豆升级任务
活动入口：京东APP首页-领京豆任务
cron "25 2,14 * * *" script-path=jd_bean_home.js, tag=领京豆升级任务

请使用本地IP环境 请使用本地IP环境 请使用本地IP环境

 */
let lnrun = 0;

const $ = new Env('领京豆升级任务')
const i1lIii = $.isNode() ? require("./sendNotify") : "",
  III11i = $.isNode() ? require("./jdCookie.js") : "",
  llIl1i = require("./utils/h5st.js");
let Iiil = [],
  IIIli = "",
  ii1i1;
if ($.isNode()) {
  Object.keys(III11i).forEach(IiiI => {
    Iiil.push(III11i[IiiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else Iiil = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IIIll($.getdata("CookiesJD") || "[]").map(iIi1i => iIi1i.cookie)].filter(l1iIll => !!l1iIll);
!(async () => {
  if (!Iiil[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  authorCodeList = await IIIlIl("http://code.kingran.cf/fw.json");
  authorCodeList ? (console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.krserve = authorCodeList[IIIlI(0, authorCodeList.length)]) : $.krserve = false;
  console.log("❖ kr提醒您...\n❖ 请使用本地IP环境...\n❖ 否则不会完成任务...\n");
  for (let IlI1lI = 0; IlI1lI < Iiil.length; IlI1lI++) {
    if (Iiil[IlI1lI]) {
      IIIli = Iiil[IlI1lI];
      $.UserName = decodeURIComponent(IIIli.match(/pt_pin=([^; ]+)(?=;?)/) && IIIli.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IlI1lI + 1;
      $.isLogin = true;
      $.nickName = "";
      ii1i1 = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      lnrun++;if(lnrun == 4){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await i1lIii.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + liIli1("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = await i1lIl1();
      await Iiii();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
  }
})().catch(liIIi => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + liIIi + "!", "");
}).finally(() => {
  $.done();
});
async function Iiii() {
  $.valid = false;
  await l1llii();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  !$.valid && (await I1I1il());
}
function llIl11(llii1l) {
  try {
    if (typeof JSON.parse(llii1l) == "object") {
      return true;
    }
  } catch (iIi11) {
    return console.log(iIi11), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function IIIll(Iil1) {
  if (typeof Iil1 == "string") {
    try {
      return JSON.parse(Iil1);
    } catch (ll111) {
      return console.log(ll111), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
async function I1I1il() {
  return new Promise(async l1i11 => {
    const I1I1ll = {
      "functionId": "findBeanScene",
      "appid": "signed_wh5",
      "clientVersion": "12.0.1",
      "client": "apple",
      "body": {
        "source": "AppHome",
        "viewChannel": "AppHome",
        "rnVersion": "3.9",
        "rnClient": "1",
        "appid": "ea6f2",
        "needSecurity": true,
        "bizId": "active"
      }
    };
    $.h5st = await l1llil("ea6f2", I1I1ll);
    if ($.krserve == "ture") {
      $.h5st = await IIIlIi("ea6f2", I1I1ll);
    }
    let lil1i = {
      "url": "https://api.m.jd.com/client.action?" + $.h5st,
      "headers": {
        "Referer": "https://h5.m.jd.com/rn/42yjy8na6pFsq1cx9MJQ5aTgu3kX/index.html",
        "User-Agent": $.UA,
        "Cookie": IIIli,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 10 * 1000
    };
    $.get(lil1i, async (lllIi, lil1l, lllIl) => {
      try {
        if (lllIi) console.log("" + JSON.stringify(lllIi));else {
          lllIl = JSON.parse(lllIl);
          if (lllIl.code == 0) {
            let Iliii = lllIl?.["data"]?.["totalUserBean"] || 0,
              illlii = lllIl?.["data"]?.["continuousDays"] || 0,
              I1lIIi = lllIl?.["data"]?.["tomorrowSendBeans"] || 0;
            console.log("当前京豆：" + Iliii + "，已连续签到：" + illlii + " 天，明日签到可获得：" + I1lIIi + " 豆子");
            let l1i1i = lllIl?.["data"]?.["curScene"]?.["growth"] || 0,
              I1iI1i = lllIl?.["data"]?.["curScene"]?.["level"] || 0,
              l1i1l = lllIl?.["data"]?.["curScene"]?.["sceneLevelConfig"]?.["growthEnd"] || 0,
              I1iI1l = l1i1l - l1i1i;
            console.log("当前等级：" + I1iI1i + "，经验值：" + l1i1i + "，升级还需：" + I1iI1l);
          } else lllIl.code == 402 ? console.log("进入首页失败," + lllIl?.["message"]) : console.log("进入首页失败," + lllIl?.["message"]);
        }
      } catch (I1lIIl) {
        $.logErr(I1lIIl, lil1l);
      } finally {
        l1i11();
      }
    });
  });
}
async function l1llii() {
  const l1l1Ii = "{\"viewChannel\":\"AppHome\",\"beanVersion\":1,\"imei\":\"" + I1I1ii(40) + "\",\"prstate\":\"0\",\"aid\":\"\",\"idfa\":\"\",\"op_type\":1,\"app_info\":\"\",\"location_info\":\"\"}";
  let IIIIlI = {
    "url": "https://api.m.jd.com/client.action?functionId=beanTaskList&body=" + encodeURIComponent(l1l1Ii) + "&clientVersion=12.0.1&appid=ld&loginType=2&area=0_0_0_0",
    "headers": {
      "Cookie": IIIli + $.jda + ";__jd_ref_cls=JingDou_SceneHome_FloatButton_expo",
      "Accept": "*/*",
      "User-Agent": $.UA,
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Referer": "https://h5.m.jd.com/"
    },
    "timeout": 10 * 1000
  };
  return new Promise(iliIli => {
    $.get(IIIIlI, async (IIIIll, liiiii, II1I) => {
      try {
        if (IIIIll) $.log(IIIIll);else {
          II1I = JSON.parse(II1I);
          if (II1I?.["code"] == 0) {
            $.taskInfos = II1I?.["data"]?.["taskInfos"] || [];
            for (let I1I1i1 = 0; I1I1i1 < $.taskInfos.length; I1I1i1++) {
              let i1I1l = $.taskInfos[I1I1i1].subTaskVOS || [];
              for (let i1I1i = 0; i1I1i < i1I1l.length; i1I1i++) {
                if ($.taskInfos[I1I1i1].status != 2) {
                  if ($.taskInfos[I1I1i1].waitDuration == 0) {
                    console.log("去做任务：" + $.taskInfos[I1I1i1].taskName + "，增加经验值：" + $.taskInfos[I1I1i1].score + "，完成情况：" + $.taskInfos[I1I1i1].process);
                    let llIiI = i1I1l[i1I1i].taskToken || "";
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await liII1(0, llIiI);
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await l1llii();
                  } else {
                    console.log("去做任务：" + $.taskInfos[I1I1i1].taskName + "，增加经验值：" + $.taskInfos[I1I1i1].score + "，完成情况：" + $.taskInfos[I1I1i1].process);
                    let I1ll1I = i1I1l[i1I1i].taskToken || "";
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await liII1(1, I1ll1I);
                    await $.wait(parseInt(Math.random() * 1500 + 5000, 10));
                    await liII1(0, I1ll1I);
                    await $.wait(parseInt(Math.random() * 1500 + 2000, 10));
                    await l1llii();
                  }
                }
              }
            }
          } else {
            console.log("失败," + II1I.errorMessage);
            $.valid = true;
          }
        }
      } catch (Iii1II) {
        $.log(Iii1II);
      } finally {
        iliIli();
      }
    });
  });
}
async function liII1(l1iIil, l1iIii) {
  const II1II = "{\"actionType\":" + l1iIil + ",\"taskToken\":\"" + l1iIii + "\"}";
  let ii1l11 = {
    "url": "https://api.m.jd.com/client.action?functionId=beanDoTask&body=" + encodeURIComponent(II1II) + "&clientVersion=12.0.1&appid=ld&loginType=2&area=0_0_0_0",
    "headers": {
      "Cookie": IIIli + $.jda + ";__jd_ref_cls=JingDou_SceneHome_FloatButton_expo",
      "Accept": "*/*",
      "User-Agent": $.UA,
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Referer": "https://h5.m.jd.com/"
    },
    "timeout": 10 * 1000
  };
  return new Promise(llIl1 => {
    $.get(ii1l11, async (IIlili, IIlill, IllllI) => {
      try {
        if (IIlili) $.log(IIlili);else {
          IllllI = JSON.parse(IllllI);
          IllllI?.["code"] == 0 && IllllI?.["data"]?.["bizCode"] == 0 ? l1iIil == 1 ? console.log("等待任务时长中...") : console.log("" + (IllllI?.["data"]?.["bizMsg"] || "等待任务时长中...")) : (console.log("失败," + IllllI.errorMessage), $.valid = true);
        }
      } catch (l1lI1I) {
        $.log(l1lI1I);
      } finally {
        llIl1();
      }
    });
  });
}
function I1I1ii(i11lIl) {
  i11lIl = i11lIl || 32;
  let lI1iii = "abcdef0123456789",
    i11lIi = lI1iii.length,
    ll1ll1 = "";
  for (i = 0; i < i11lIl; i++) ll1ll1 += lI1iii.charAt(Math.floor(Math.random() * i11lIi));
  return ll1ll1;
}
async function l1llil(lI1iil, lIilll) {
  try {
    let IIliil = new llIl1i({
      "appId": lI1iil,
      "appid": "signed_wh5",
      "clientVersion": lIilll?.["clientVersion"],
      "client": lIilll?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await IIliil.genAlgo(), body = await IIliil.genUrlParams(lIilll.functionId, lIilll.body), body;
  } catch (ll1liI) {}
}
async function IIIlIi(lI1iiI, i11lII) {
  let ll1li1 = {
      "searchParams": {
        ...i11lII,
        "appId": lI1iiI
      },
      "pt_pin": $.UserName,
      "client": i11lII?.["client"],
      "clientVersion": i11lII?.["clientVersion"]
    },
    iIIlll = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    I1iiiI = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(ll1li1),
      "headers": iIIlll,
      "timeout": 30000
    };
  return new Promise(async iiI1l1 => {
    $.post(I1iiiI, (i11lI1, liliiI, ilIIiI) => {
      let lIl1il = "";
      try {
        if (i11lI1) {
          console.log($.name + " getH5st API请求失败，请检查网路重试");
        } else {
          ilIIiI = JSON.parse(ilIIiI);
          console.log(JSON.stringify(ilIIiI));
          if (typeof ilIIiI === "object" && ilIIiI && ilIIiI.body) {
            if (ilIIiI.body) lIl1il = ilIIiI || "";
          } else ilIIiI.code == 400 ? console.log("\n" + ilIIiI.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (li1i) {
        $.logErr(li1i, liliiI);
      } finally {
        iiI1l1(llIl1I(lIl1il));
      }
    });
  });
}
function llIl1I(ilIIil, lIili1 = {}) {
  let iliiII = [],
    iiI1li = lIili1.connector || "&",
    IIliii = Object.keys(ilIIil);
  if (lIili1.sort) IIliii = IIliii.sort();
  for (let lIiliI of IIliii) {
    let iIiill = ilIIil[lIiliI];
    if (iIiill && typeof iIiill === "object") iIiill = JSON.stringify(iIiill);
    if (iIiill && lIili1.encode) iIiill = encodeURIComponent(iIiill);
    iliiII.push(lIiliI + "=" + iIiill);
  }
  return iliiII.join(iiI1li);
}
async function i1lIl1() {
  for (var Ii1IIl = "", l111I = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", ll1lli = 0; ll1lli < 16; ll1lli++) {
    var ll1lll = Math.round(Math.random() * (l111I.length - 1));
    Ii1IIl += l111I.substring(ll1lll, ll1lll + 1);
  }
  return uuid = Buffer.from(Ii1IIl, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "CJGkEK==",
      "ud": uuid,
      "iad": ""
    },
    "ciphertype": 5,
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile"
  })), "jdapp;iPhone;12.0.1;;;M/5.0;appBuild/168684;jdSupportDarkMode/0;ef/1;ep/" + ep + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function liIli1(lIl1li = "xxxxxxxxxxxxxxxxxxxx") {
  return lIl1li.replace(/[xy]/g, function (I1iilI) {
    var Ii1II1 = Math.random() * 10 | 0,
      lilili = I1iilI == "x" ? Ii1II1 : Ii1II1 & 3 | 8;
    return jdaid = lilili.toString(), jdaid;
  });
}
function IIIlIl(IliIli) {
  return new Promise(l1liii => {
    const l1lII = {
      "url": "" + IliIli,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(l1lII, async (lilI1l, l1liiI, I1iI1) => {
      try {
        if (lilI1l) {} else {
          if (I1iI1) I1iI1 = JSON.parse(I1iI1);else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (iIIli1) {
        $.logErr(iIIli1, l1liiI);
        I1iI1 = null;
      } finally {
        l1liii(I1iI1);
      }
    });
  });
}
function IIIlI(i1Iiil, i1Iiii) {
  return Math.floor(Math.random() * (i1Iiii - i1Iiil)) + i1Iiil;
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
