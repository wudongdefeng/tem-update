/*
活动名称：京东看春晚助力
环境变量：JD_PARTY_INVITE_CODE // 指定助力码

自行控制助力上限

cron:1 1 1 1 *

*/
let lnrun = 0;

const $ = new Env('京东看春晚助力')
const ii1iii = require("./jdCookie"),
      i11iil = require("./utils/Rebels_sendJDNotify"),
      Ill1i = require("./utils/Rebels_jdCommon"),
      {
  H5st: ii1iil
} = require("./utils/Rebels_H"),
      lllI1l = false;

$.inviteCode = process.env.JD_PARTY_INVITE_CODE || "";
let i11iii = "";
const llI1Ii = Object.keys(ii1iii).map(iiiliI => ii1iii[iiiliI]).filter(li1i1I => li1i1I);
!llI1Ii[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  $.assistedNum = 0;
  authorCodeList = "";
  if (authorCodeList) console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.authorCode = authorCodeList[iil1lI(0, authorCodeList.length)];else {
    let I1lIll = [""];
    $.authorCode = I1lIll[iil1lI(0, I1lIll.length)];
    console.log("❖ 准备就绪...\n");
  }
  i11iil.config({
    "title": $.name
  });

  for (let I1lIli = 0; I1lIli < llI1Ii.length; I1lIli++) {
    $.index = I1lIli + 1;
    i11iii = llI1Ii[I1lIli];
    Ill1i.setCookie(i11iii);
    $.UserName = decodeURIComponent(Ill1i.getCookieValue(i11iii, "pt_pin"));
    $.UA = Ill1i.genUA($.UserName);
    $.message = i11iil.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
    await lllI1i();
    Ill1i.unsetCookie();
    if ($.runEnd) break;
    await $.wait(1000);
  }

  lllI1l && i11iil.getMessage() && (i11iil.updateContent(i11iil.content + "\n"), await i11iil.push());
})().catch(IIIIII => $.logErr(IIIIII)).finally(() => $.done());

async function lllI1i() {
  const ii1ilI = await Ill1i.getLoginStatus(i11iii);

  if (!ii1ilI && typeof ii1ilI === "boolean") {
    console.log("账号无效");
    return;
  }

  try {
    !$.inviteCode ? $.index == 1 ? (await lI1lll("party_invite"), await $.wait(2000), console.log("⏺️ 账号[1]默认去助力作者"), await li1i1l($.authorCode)) : await li1i1l($.inviteCode) : $.index == 1 ? (console.log("⏺️ 账号[1]默认去助力作者"), await li1i1l($.authorCode)) : await li1i1l($.inviteCode);
  } catch (llI1II) {
    console.log(llI1II.message);
  }
}

async function li1i1l(lIli1l) {
  $.inviter = lIli1l;
  await lI1lll("party_assist");
  await $.wait(2000);
}

async function II1i1(liil1i, lI1lil) {
  try {
    switch (liil1i) {
      case "party_invite":
        if (lI1lil.code === 0 && lI1lil.data) {
          const liiI1l = lI1lil?.["data"];
          if (liiI1l.bizCode === 0 && liiI1l.result) $.inviteCode = liiI1l.result.inviteCode, console.log("获取助力码：" + $.inviteCode);else liiI1l.bizMsg ? (console.log(liiI1l.bizMsg), $.message.fix(liiI1l.bizMsg)) : console.log("❓" + liil1i + " " + JSON.stringify(lI1lil));
        } else lI1lil.message ? (console.log(lI1lil.message), $.message.fix(lI1lil.message)) : console.log("❓" + liil1i + " " + JSON.stringify(lI1lil));

        break;

      case "party_assist":
        if (lI1lil.code === 0 && lI1lil.data) {
          const llIli = lI1lil?.["data"];
          if (llIli.bizCode === 0 && llIli.result) $.assistedNum += 1, console.log("✅ 助力成功 [" + $.assistedNum + "]");else llIli.bizMsg ? (console.log("❌ " + llIli.bizMsg), $.message.fix(llIli.bizMsg)) : console.log("❓" + liil1i + " " + JSON.stringify(lI1lil));
        } else lI1lil.message ? (console.log("❌ " + lI1lil.message), $.message.fix(lI1lil.message)) : console.log("❓" + liil1i + " " + JSON.stringify(lI1lil));

        break;
    }
  } catch (iii1iI) {
    console.log("❌ 未能正确处理 " + liil1i + " 请求响应 " + (iii1iI.message || iii1iI));
  }
}

async function lI1lll(il1iII) {
  if ($.runEnd || $.outFlag) return;
  let IlllIl = "",
      II11lI = null,
      lI1IIi = null,
      I1l11I = "POST",
      Ilil1l = {},
      iIIiii = {};

  switch (il1iII) {
    case "party_invite":
      IlllIl = "https://api-x.m.jd.com/", lI1IIi = {
        "appid": "spring_h5",
        "functionId": "party_invite",
        "body": JSON.stringify({})
      };
      break;

    case "party_assist":
      iIIiii = {
        "appId": "b1660",
        "functionId": "party_assist",
        "appid": "spring_h5",
        "clientVersion": "12.3.1",
        "client": "ios",
        "body": {
          "inviteCode": $.inviter || "",
          "areaInfo": "",
          "unpl": ""
        },
        "version": "4.3",
        "ua": $.UA,
        "t": true
      }, Ilil1l = await ii1iil.getH5st(iIIiii), IlllIl = "https://api-x.m.jd.com/", II11lI = Ilil1l.paramsData;
      break;

    default:
      console.log("❌ 未知请求 " + il1iII);
      return;
  }

  const iilll = {};
  II11lI && (II11lI = { ...II11lI,
    ...iilll
  });
  lI1IIi && (lI1IIi = { ...lI1IIi,
    ...iilll
  });
  const il1iI1 = {
    "url": IlllIl,
    "method": I1l11I,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": i11iii,
      "Origin": "https://prodev.m.jd.com",
      "Referer": "https://prodev.m.jd.com/mall/active/4TeSpXMCG6Kwy63rTeRDUp6wfL4n/index.html",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    "params": lI1IIi,
    "data": II11lI,
    "timeout": 15000
  };
  I1l11I === "GET" && (delete il1iI1.data, delete il1iI1.headers["Content-Type"]);
  !lI1IIi && delete il1iI1.params;
  const IlllIi = 1;
  let iIIiil = 0,
      i1l1Ii = null,
      I1iIIi = false;

  while (iIIiil < IlllIi) {
    iIIiil > 0 && (await $.wait(1000));
    const IIii1i = await Ill1i.request(il1iI1);

    if (!IIii1i.success) {
      i1l1Ii = "🚫 " + il1iII + " 请求失败 ➜ " + IIii1i.error;
      iIIiil++;
      continue;
    }

    if (!IIii1i?.["data"]) {
      i1l1Ii = "🚫 " + il1iII + " 请求失败 ➜ 无响应数据";
      iIIiil++;
      continue;
    }

    II1i1(il1iII, IIii1i.data);
    I1iIIi = false;
    break;
  }

  iIIiil >= IlllIi && (console.log(i1l1Ii), I1iIIi && ($.outFlag = true, $.message && $.message.fix(i1l1Ii)));
}

function iIiII(IIliIl) {
  return new Promise(lI1II1 => {
    const lilIII = {
      "url": "" + IIliIl,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lilIII, async (Ii1ilI, II11i1, iliIil) => {
      try {
        if (Ii1ilI) {} else iliIil ? iliIil = JSON.parse(iliIil) : console.log("未获取到数据,请重新运行");
      } catch (iIIill) {
        $.logErr(iIIill, II11i1);
        iliIil = null;
      } finally {
        lI1II1(iliIil);
      }
    });
  });
}

function iil1lI(il1ll, i1ilIi) {
  return Math.floor(Math.random() * (i1ilIi - il1ll)) + il1ll;
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
