/*
活动名称：账号健康检查 · 超级无线/超级会员

用于检测账号是否黑了，没有变量直接运行即可不适用一般活动

⚠ 请勿定时或频繁运行！

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#账号健康检查
1 1 1 1 * jd_healthCheck.js, tag=账号健康检查, enabled=true

*/
let lnrun = 0;


const $ = new Env('账号健康检查（超级无线/超级会员）')
const Ill11 = require("./jdCookie"),
  liiIII = require("./function/jdCommon"),
  li1i11 = require("./function/krgetToken");
let iI11I1 = "",
  il1i1l = "",
  IlIlll = "";
const IIIl1I = Object.keys(Ill11).map(ii1ii1 => Ill11[ii1ii1]).filter(llllI => llllI);
!IIIl1I[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("此脚本仅用于检测账号是否黑号，请勿频繁运行！");
  for (let illlI1 = 0; illlI1 < IIIl1I.length; illlI1++) {
    $.index = illlI1 + 1;
    iI11I1 = IIIl1I[illlI1];
    IlIlll = IIIl1I[illlI1];
    $.UserName = decodeURIComponent(liiIII.getCookieValue(iI11I1, "pt_pin"));
    $.UA = liiIII.genUA($.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_task_interval || "60 * 1000";console.log(环境变量jd_task_interval默认为60s);lnrun++;if(lnrun == 2){console.log(`\n【访问接口次数达到1次，休息一分钟.....】\n`);await $.wait($jd_task_interval);lnrun = 0}
    await iil1ii();
    if ($.outFlag) break;
  }
})().catch(I1lIi1 => $.logErr(I1lIi1)).finally(() => $.done());
async function iil1ii() {
  try {
    $.skipRun = false;
    $.isMember = false;
    $.secretPin = "";
    il1i1l = "";
    if ($.skipRun || $.outFlag) return;
    $.activityUrl = "https://lzkj-isv.isvjd.com/wxAssemblePage/activity";
    $.baseUrl = "https://lzkj-isv.isvjd.com";
    $.origin = $.baseUrl;
    $.token = await li1i11(IlIlll, $.baseUrl);
    if (!$.token) {
      console.log("获取 Token 失败！");
      return;
    }
    await i11ilI($.activityUrl);
    await $.wait(500);
    await il1i1i("getMyPing");
    if ($.outFlag) return;
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      return;
    } else {
      $.secretPin = encodeURIComponent($.secretPin);
      $.healthResult = true;
      await $.wait(500);
      await il1i1i("getUserInfo");
      $.healthResult ? console.log("lzkj 超级无线 ✅") : console.log("lzkj 超级无线 ❌");
    }
    il1i1l = "";
    $.secretPin = "";
    $.activityUrl = "https://cjhy-isv.isvjcloud.com/wxDrawActivity/activity";
    $.baseUrl = "https://cjhy-isv.isvjcloud.com";
    $.origin = $.baseUrl;
    await i11ilI($.activityUrl);
    await $.wait(500);
    await il1i1i("getMyPing");
    if ($.outFlag) return;
    if (!$.secretPin) {
      console.log("未能获取用户鉴权信息！");
      return;
    } else {
      $.secretPin = encodeURIComponent(encodeURIComponent($.secretPin));
      $.healthResult = true;
      await $.wait(500);
      await il1i1i("getUserInfo");
      $.healthResult ? console.log("cjhy 超级会员 ✅") : console.log("cjhy 超级会员 ❌");
    }
    await $.wait(500);
  } catch (Ill1i) {
    console.log(Ill1i);
  }
}
async function IlIlli(lllI1l, i11iii) {
  try {
    switch (lllI1l) {
      case "getMyPing":
        if (i11iii.result && i11iii.result === true) {
          if (i11iii?.["data"]?.["secretPin"]) $.secretPin = i11iii.data.secretPin;
          if (i11iii?.["data"]?.["nickname"]) $.nickname = i11iii.data.nickname;
        } else i11iii.errorMessage ? console.log("" + i11iii.errorMessage) : console.log("" + lI1llI);
        break;
      case "getUserInfo":
        const lI1llI = i11iii?.["data"];
        if (i11iii.result && i11iii.result === true) typeof lI1llI === "string" && lI1llI === "AUTH.FAILED.BLACK" && ($.healthResult = false);else i11iii.errorMessage ? typeof lI1llI === "string" && lI1llI === "AUTH.FAILED.BLACK" ? $.healthResult = false : console.log("" + i11iii.errorMessage) : console.log(lllI1l + " " + lI1llI);
        break;
    }
  } catch (lIli11) {
    console.log("❌ 未能正确处理 " + lllI1l + " 请求响应 " + (lIli11.message || lIli11));
  }
}
async function il1i1i(lillI1) {
  if ($.outFlag) return;
  let i1l1i1 = "",
    liil11 = "",
    iiillI = "POST";
  switch (lillI1) {
    case "getMyPing":
      i1l1i1 = $.baseUrl + "/customer/getMyPing";
      liil11 = "token=" + $.token + "&fromType=APP&userId=739130";
      break;
    case "getUserInfo":
      i1l1i1 = $.baseUrl + "/wxActionCommon/getUserInfo";
      liil11 = "pin=" + $.secretPin;
      break;
    default:
      console.log("❌ 未知请求 " + lillI1);
      return;
  }
  const l1l111 = {
      "url": i1l1i1,
      "method": iiillI,
      "headers": {
        "Origin": $.origin,
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": ($.secretPin ? "AUTH_C_USER=" + $.secretPin + ";" : "") + " " + il1i1l,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest",
        "Referer": $.activityUrl
      },
      "body": liil11,
      "timeout": 30000
    },
    l1iIII = 3;
  let llI1I1 = 0,
    IlIlil = null;
  while (llI1I1 < l1iIII) {
    llI1I1 > 0 && (await $.wait(1000));
    const {
      err: iiill1,
      res: lIli1i,
      data: IIIII1
    } = await lil111(l1l111, iiillI);
    if (iiill1) {
      if (typeof iiill1 === "string" && iiill1.includes("Timeout awaiting 'request'")) IlIlil = lillI1 + " 请求超时，请检查网络重试";else {
        const I1lIlI = lIli1i?.["statusCode"];
        if (I1lIlI) {
          if ([403, 493].includes(I1lIlI)) {
            IlIlil = lillI1 + " 此ip已被限制，请过10分钟后再执行脚本（Response code " + I1lIlI + "）";
            break;
          } else {
            if ([400, 404].includes(I1lIlI)) {
              IlIlil = lillI1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + I1lIlI + "）";
              break;
            } else {
              IlIlil = lillI1 + " 请求失败（Response code " + I1lIlI + "）";
              break;
            }
          }
        } else IlIlil = lillI1 + " API请求失败 => " + (iiill1.message || iiill1);
      }
      llI1I1++;
    } else {
      if (lIli1i?.["statusCode"] === 200) {
        il1i1l = liiIII.getResponseCookie(lIli1i, il1i1l);
        try {
          const llI1II = JSON.parse(IIIII1);
          IlIlli(lillI1, llI1II);
          break;
        } catch (lillIi) {
          IlIlil = "🚫 API请求失败，" + lillI1 + " 接口响应数据解析失败: " + lillIi.message;
          console.log(String(IIIII1));
          llI1I1++;
        }
        break;
      } else {
        IlIlil = lillI1 + " API请求失败，接口响应非200";
        if (IIIII1) {
          console.log(String(IIIII1));
        }
        llI1I1++;
      }
    }
  }
  llI1I1 >= l1iIII && ($.outFlag = true, console.log(IlIlil));
}
async function lil111(liil1i, lI1lil = "POST") {
  if (lI1lil === "POST") return new Promise(async iii1il => {
    $.post(liil1i, (liiI1i, ililIi, lilIIl) => {
      iii1il({
        "err": liiI1i,
        "res": ililIi,
        "data": lilIIl
      });
    });
  });else {
    if (lI1lil === "GET") return new Promise(async i1i11l => {
      $.get(liil1i, (Iil1lI, IiiliI, iii1iI) => {
        i1i11l({
          "err": Iil1lI,
          "res": IiiliI,
          "data": iii1iI
        });
      });
    });else {
      const IlllIl = "不支持的请求方法";
      return {
        "err": IlllIl,
        "res": null,
        "data": null
      };
    }
  }
}
function i11ilI(II11lI) {
  return $.skipRun = true, new Promise(iilll => {
    let il1iI1 = {
      "url": II11lI,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": II11lI,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(il1iI1, async (IlllIi, iIIiil, i1l1Ii) => {
      try {
        IlllIi ? (iIIiil && typeof iIIiil.statusCode != "undefined" && iIIiil.statusCode == 493 && console.log("此ip已被限制，请过10分钟后再执行脚本！"), console.log(String(IlllIi)), console.log("getFirstLZCK 请求失败，请检查网路重试")) : iIIiil.status == 200 && (il1i1l = liiIII.getResponseCookie(iIIiil, il1i1l), $.skipRun = false);
      } catch (I1iIIi) {
        $.logErr(I1iIIi, iIIiil);
      } finally {
        iilll();
      }
    });
  });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
