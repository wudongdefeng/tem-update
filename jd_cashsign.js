/*
入口：app-我的-领现金
3 4 * * * jd_cashsign.js
 */

const $ = new Env('领现金签到');
const ilill11 = $.isNode() ? require("./sendNotify") : "",
      i1l1ii1I = $.isNode() ? require("./jdCookie") : "",
      liIi1li1 = require("./USER_AGENTS");

let I11li1li = true,
    lliIilIl = [],
    il1Illil = "",
    i1IliIll = "";

if ($.isNode()) {
  Object.keys(i1l1ii1I).forEach(iIII1l1I => {
    lliIilIl.push(i1l1ii1I[iIII1l1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else lliIilIl = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Ii11ii1I($.getdata("CookiesJD") || "[]").map(llIl1i => llIl1i.cookie)].filter(l1lIIll1 => !!l1lIIll1);

!(async () => {
  if (!lliIilIl[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let IiIiIi1 = 0; IiIiIi1 < lliIilIl.length; IiIiIi1++) {
    if (lliIilIl[IiIiIi1]) {
      il1Illil = lliIilIl[IiIiIi1];
      $.UserName = decodeURIComponent(il1Illil.match(/pt_pin=([^; ]+)(?=;?)/) && il1Illil.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IiIiIi1 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.fail = false;
      $.UA = liIi1li1.UARAM ? liIi1li1.UARAM() : liIi1li1.USER_AGENT;
      await IlI11IIi();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });

        if ($.isNode()) {
          await ilill11.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }

        continue;
      }

      await ii1i1Iil();
      await $.wait(1000);
      $.fail && (await ii1i1Iil());
      await $.wait(2000);
    }
  }
})().catch(l1l1ili1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + l1l1ili1 + "!", "");
}).finally(() => {
  $.done();
});
return;

async function ilII1iil() {
  let IiiIil1I = {
    "url": "https://api.m.jd.com/client.action?functionId=cash_sign&body=%7B%22remind%22%3A0%2C%22inviteCode%22%3A%22%22%2C%22type%22%3A0%2C%22breakReward%22%3A0%7D&client=apple&clientVersion=9.0.8&openudid=1fce88cd05c42fe2b054e846f11bdf33f016d676&sign=7e2f8bcec13978a691567257af4fdce9&st=1596954745073&sv=111",
    "headers": {
      "User-Agent": $.UA,
      "Cookie": il1Illil
    }
  };
  return new Promise(async i1iii1II => {
    $.get(IiiIil1I, async (ll1lIiII, I11iIli, l1Iilil1) => {
      try {
        if (ll1lIiII) {
          console.log("" + JSON.stringify(ll1lIiII));
          console.log("API请求失败，请检查网路重试");
        } else {
          const liili11I = JSON.parse(l1Iilil1);
          if (liili11I.data.bizCode == 0) console.log("签到成功：" + liili11I.data.result.signCash);else l1Iilil1.match(/已经签过/) ? $.log("今日已签过！！！") : console.log(l1Iilil1);
        }
      } catch (IIlii1il) {
        $.logErr(IIlii1il, I11iIli);
      } finally {
        i1iii1II(l1Iilil1);
      }
    });
  });
}

function ii1i1Iil() {
  let IiIIil1i = {
    "version": "1",
    "channel": "applet",
    "remind": 0
  };
  return new Promise(async I1llill => {
    $.post(ll1ll1l1("cash_mob_sign", IiIIil1i), async (i1i1IIII, l1l1III1, I1liIiii) => {
      try {
        if (i1i1IIII) {
          console.log("" + JSON.stringify(i1i1IIII));
          console.log(" API请求失败，请检查网路重试");
        } else {
          I1liIiii = JSON.parse(I1liIiii);

          if (I1liIiii.code == 0) {
            I1liIiii.data.bizCode == 0 ? $.log("签到成功：获得" + I1liIiii.data?.["result"]?.["signCash"] + "元！") : $.log("" + (I1liIiii.data.bizMsg.includes("已完成") ? "今日已完成签到！" : I1liIiii.data.bizMsg));
          } else {
            console.log(I1liIiii.msg);
            $.fail = true;
          }
        }
      } catch (IIlIlliI) {
        $.logErr(IIlIlliI, l1l1III1);
      } finally {
        I1llill(I1liIiii);
      }
    });
  });
}

function ll1ll1l1(lilliiI1, iIIIiIi) {
  return {
    "url": "https://api.m.jd.com/?g_ty=ls&g_tk=616816427",
    "body": "loginType=2&clientType=wxapp&client=wh5&clientVersion=1.0.0&d_brand=&d_model=&lang=zh_CN&uuid=&appid=signed_mp&t=" + Date.now + "&functionId=" + lilliiI1 + "&body=" + encodeURIComponent(JSON.stringify(iIIIiIi)) + "&loginWQBiz=pet-town&h5st=",
    "headers": {
      "Host": "api.m.jd.com",
      "Referer": "https://servicewechat.com/wx91d27dbf599dff74/706/page-frame.html",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": il1Illil
    }
  };
}

function IlI11IIi() {
  return new Promise(IIi1ili => {
    const IIiIlII = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": il1Illil,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(IIiIlII, (IiiIl1I, iiiIi1li, I11Il1I) => {
      try {
        if (I11Il1I) {
          I11Il1I = JSON.parse(I11Il1I);

          if (I11Il1I.islogin === "1") {} else I11Il1I.islogin === "0" && ($.isLogin = false);
        }
      } catch (lI11l1il) {
        console.log(lI11l1il);
      } finally {
        IIi1ili();
      }
    });
  });
}

function III1I() {
  return new Promise(liiIIIl => {
    if (!I11li1li) {
      $.msg($.name, "", "" + i1IliIll);
    } else $.log("京东账号" + $.index + $.nickName + "\n" + i1IliIll);

    liiIIIl();
  });
}

function I1I1iI1(IIiI1i1) {
  try {
    if (typeof JSON.parse(IIiI1i1) == "object") return true;
  } catch (lIIIl1li) {
    return console.log(lIIIl1li), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function Ii11ii1I(Ill1li) {
  if (typeof Ill1li == "string") {
    try {
      return JSON.parse(Ill1li);
    } catch (IlIlliIl) {
      return console.log(IlIlliIl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }