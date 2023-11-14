/*
领京豆签到
cron:15 0,16 * * *
============Quantumultx===============
[task_local]
#领京豆签到
15 0,16 * * * jd_beanSign.js, tag=领京豆签到, enabled=true
 */
let lnrun = 0;


const $ = new Env('领京豆签到');
const liIillll = $.isNode() ? require("./sendNotify") : "",
  iI1lIIi = $.isNode() ? require("./jdCookie.js") : "";
let i1llII = Ii11IlIi(40, "1234567890qwertyuiopasdfghjklzxcvbnm"),
  I1liIll1 = [],
  IiiiIIIl = "";
if ($.isNode()) {
  Object.keys(iI1lIIi).forEach(i1ii11i1 => {
    I1liIll1.push(iI1lIIi[i1ii11i1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else I1liIll1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iIlllIIi($.getdata("CookiesJD") || "[]").map(llI1I1I => llI1I1I.cookie)].filter(lii1 => !!lii1);
let i1i1liii = "";
const Ilil1lIl = "https://api.m.jd.com/client.action";
!(async () => {
  if (!I1liIll1[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("❖ 活动入口：APP首页-领京豆-签到\n");
  console.log("❖ kr提醒您...\n❖ 请使用本地IP环境...\n❖ 否则不会完成签到...\n");
  for (let lllli1II = 0; lllli1II < I1liIll1.length; lllli1II++) {
    if (I1liIll1[lllli1II]) {
      IiiiIIIl = I1liIll1[lllli1II];
      $.UserName = decodeURIComponent(IiiiIIIl.match(/pt_pin=([^; ]+)(?=;?)/) && IiiiIIIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lllli1II + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await liIillll.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.UA = await I11i1I1();
      await I1lill1i();
      await $.wait(1500);
    }
  }
  if (i1i1liii) {
    if ($.isNode()) await liIillll.sendNotify("" + $.name, "" + i1i1liii);
    $.msg($.name, "", i1i1liii);
  }
})().catch(li1i1I1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + li1i1I1 + "!", "");
}).finally(() => {
  $.done();
});
async function I1lill1i() {
  await iIi1li11();
  await $.wait(500);
}
function lIl1I11i(I1iiiIl, IlIIi11l = {}) {
  let liIllI1I = [],
    li11llli = IlIIi11l.connector || "&",
    i11II1i = Object.keys(I1iiiIl);
  if (IlIIi11l.sort) i11II1i = i11II1i.sort();
  for (let iiIilli1 of i11II1i) {
    let l1l1liIl = I1iiiIl[iiIilli1];
    if (l1l1liIl && typeof l1l1liIl === "object") l1l1liIl = JSON.stringify(l1l1liIl);
    if (l1l1liIl && IlIIi11l.encode) l1l1liIl = encodeURIComponent(l1l1liIl);
    liIllI1I.push(iiIilli1 + "=" + l1l1liIl);
  }
  return liIllI1I.join(li11llli);
}
async function iIi1li11() {
  const lilil1Il = {
    "fp": "-1",
    "shshshfp": "-1",
    "shshshfpa": "-1",
    "referUrl": "-1",
    "userAgent": "-1",
    "jda": "-1",
    "rnVersion": "3.9"
  };
  let i11ii1l1 = {
    "url": Ilil1lIl + "?functionId=signBeanAct&" + JSON.stringify(lilil1Il) + "&appid=ld&client=apple&clientVersion=12.0.1&uuid=" + i1llII + "&openudid=" + i1llII + "&loginType=2&jsonp=jsonp_1693243123839_76958",
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Cookie": IiiiIIIl + "__jd_ref_cls=JingDou_SceneHome_SignIn;",
      "User-Agent": $.UA,
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br",
      "Referer": "https://h5.m.jd.com/rn/42yjy8na6pFsq1cx9MJQ5aTgu3kX/index.html?tttparams=OTxiiOeyJnTGF0IjoiMzAuOTM3OTc2IiwidW5fYXJlYSI6IjRfMTMzXzU4NTMwXzAiLCJkTGF0IjoiIiwicHJzdGF0ZSI6IjAiLCJhZGRyZXNzSWQiOiIxMzg3NjMyODgiLCJsYXQiOiIyOS41MDI3NTgiLCJwb3NMYXQiOiIzMC45Mzc5NzYiLCJwb3NMbmciOiIxMDguNjg2NTM2IiwiZ3BzX2FyZWEiOiI0XzUwOTUyXzYwNDI2XzAiLCJsbmciOiIxMDYuNDc2NTk5IiwidWVtcHMiOiIwLTAtMiIsImdMbmciOiIxMDguNjg2NTM2IiwibW9kZWwiOiJpUGhvbmU5LDIiLCJkTG5nIjoiIn60%3D&has_native=0&jumpFrom=1&source=AppHome&sid=94c8fde9792f48dbdb86b75f99f42eaw&un_area=4_133_58530_0"
    },
    "timeout": 10 * 1000
  };
  return new Promise(IIl1Iill => {
    $.get(i11ii1l1, (lIi111, IiiiiIiI, IIIiiil1) => {
      try {
        if (lIi111) {
          $.log(lIi111);
        } else {
          IIIiiil1 = IIIiiil1 && IIIiiil1.match(/jsonp_.*?\((.*?)\);/) && IIIiiil1.match(/jsonp_.*?\((.*?)\);/)[1] || IIIiiil1;
          IIIiiil1 = JSON.parse(IIIiiil1);
          if (IIIiiil1.code == 0 && !IIIiiil1?.["errorCode"]) {
            if (IIIiiil1?.["data"]?.["newUserAward"]) {
              console.log("" + (IIIiiil1?.["data"]?.["newUserAward"]?.["title"] || "") + (IIIiiil1?.["data"]?.["newUserAward"]?.["subTitle"] || "") + IIIiiil1?.["data"]?.["newUserAward"]?.["awardList"][1]?.["beanCount"] + "京豆");
            } else {
              let l1Iiiili = IIIiiil1?.["data"]?.["dailyAward"] || IIIiiil1?.["data"]?.["continuityAward"] || IIIiiil1?.["data"]?.["newUserAward"];
              console.log("" + (l1Iiiili?.["title"] || "") + (l1Iiiili?.["subTitle"] || "") + l1Iiiili?.["beanAward"]?.["beanCount"] + "京豆");
            }
          } else IIIiiil1.code == 3 ? console.log("签到失败," + IIIiiil1?.["errorMessage"]) : console.log("签到失败," + IIIiiil1?.["errorCode"] + ":" + IIIiiil1?.["errorMessage"]);
        }
      } catch (ll1ii1lI) {
        $.log(ll1ii1lI);
      } finally {
        IIl1Iill();
      }
    });
  });
}
async function I11i1I1() {
  for (var ilIliil = "", Ii1Il1iI = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", iIIlIII = 0; iIIlIII < 16; iIIlIII++) {
    var ll1I1ii1 = Math.round(Math.random() * (Ii1Il1iI.length - 1));
    ilIliil += Ii1Il1iI.substring(ll1I1ii1, ll1I1ii1 + 1);
  }
  return i1llII = Buffer.from(ilIliil, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "CJCkDq==",
      "ud": i1llII,
      "iad": ""
    },
    "ciphertype": 5,
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile"
  })), "jdapp;iPhone;12.0.1;;;M/5.0;appBuild/168684;jdSupportDarkMode/0;ef/1;ep/" + ep + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function Ii11IlIi(ii1IIIi, iiiiIill = "qwertyuiopasdfghjklzxcvbnm") {
  let Ilii1ilI = "";
  for (let Ii11lI1 = 0; Ii11lI1 < ii1IIIi; Ii11lI1++) {
    Ilii1ilI += iiiiIill[Math.floor(Math.random() * iiiiIill.length)];
  }
  return Ilii1ilI;
}
function iIlllIIi(lI1I1l1) {
  if (typeof lI1I1l1 == "string") try {
    return JSON.parse(lI1I1l1);
  } catch (iIIIIl11) {
    return console.log(iIIIIl11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
