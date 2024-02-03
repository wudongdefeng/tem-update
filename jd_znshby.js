/*
20 20 * * * jd_znshby.js
 */
let lnrun = 0;
const $ = new Env('炸年兽红包雨');
const _0x5cc502 = $.isNode() ? require("./sendNotify") : "",
      _0x242ebc = $.isNode() ? require("./jdCookie.js") : "",
      _0x39e033 = require("./function/dylano.js"),
      _0x4d6478 = require("./USER_AGENTS");

let _0x22992d = true,
    _0x3d2671 = [],
    _0x47be9c = "",
    _0x3d5770 = "";

if ($.isNode()) {
  Object.keys(_0x242ebc).forEach(_0x32c71b => {
    _0x3d2671.push(_0x242ebc[_0x32c71b]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x3d2671 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x31fe91($.getdata("CookiesJD") || "[]").map(_0x92c0f7 => _0x92c0f7.cookie)].filter(_0x11d16e => !!_0x11d16e);

!(async () => {
  if (!_0x3d2671[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let _0x4f8892 = 0; _0x4f8892 < _0x3d2671.length; _0x4f8892++) {
    if (_0x3d2671[_0x4f8892]) {
      _0x47be9c = _0x3d2671[_0x4f8892];
      $.UserName = decodeURIComponent(_0x47be9c.match(/pt_pin=([^; ]+)(?=;?)/) && _0x47be9c.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x4f8892 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.empty = 0;
      $.err = false;
      $.UA = _0x4d6478.UARAM ? _0x4d6478.UARAM() : _0x4d6478.USER_AGENT;
      await _0x2dd33a();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x5cc502.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      for (let _0x354f7a of Array(30)) {
        await _0x573c93();
        await $.wait(2000);
        if ($.empty > 2 || $.err) break;
      }
    }
  }
})().catch(_0x27ed81 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x27ed81 + "!", "");
}).finally(() => {
  $.done();
});

async function _0x573c93() {
  let _0x29f382 = {
    "linkId": "3uSQA8Fn00J70jWc9Pk0iw"
  },
      _0x10a352 = {
    "appId": "89cfe",
    "fn": "superRedBagDraw",
    "body": _0x29f382,
    "apid": "activity_platform_se",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  _0x29f382 = await _0x39e033.getbody(_0x10a352);
  if (!_0x29f382) return;
  return new Promise(async _0x3459bd => {
    $.post(_0x36d9e9(_0x29f382), async (_0x43bd9e, _0x3dcd00, _0x51dde7) => {
      try {
        if (_0x43bd9e) console.log("" + JSON.stringify(_0x43bd9e)), console.log(" API请求失败，请检查网路重试");else {
          _0x51dde7 = JSON.parse(_0x51dde7);

          if (_0x51dde7.code == 0) {
            if (_0x51dde7.data.prizeDrawVo) console.log(_0x51dde7.data.prizeDrawVo.amount + _0x51dde7.data.prizeDrawVo.prizeConfigName), $.empty = 0;else {
              console.log("空气");
              $.empty++;
            }
          } else console.log(_0x51dde7.msg), $.err = true;
        }
      } catch (_0x1ebfd1) {
        $.logErr(_0x1ebfd1, _0x3dcd00);
      } finally {
        _0x3459bd(_0x51dde7);
      }
    });
  });
}

function _0x36d9e9(_0x19075a) {
  return {
    "url": "https://api.m.jd.com/?" + _0x19075a,
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://pro.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": _0x47be9c
    }
  };
}

function _0x2dd33a() {
  return new Promise(_0x52787a => {
    const _0x594870 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x47be9c,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x594870, (_0x89c153, _0x33e538, _0x56f5d1) => {
      try {
        if (_0x56f5d1) {
          _0x56f5d1 = JSON.parse(_0x56f5d1);

          if (_0x56f5d1.islogin === "1") {} else _0x56f5d1.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0x12ffca) {
        console.log(_0x12ffca);
      } finally {
        _0x52787a();
      }
    });
  });
}

function _0xea6bcb() {
  return new Promise(_0x522790 => {
    !_0x22992d ? $.msg($.name, "", "" + _0x3d5770) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x3d5770);

    _0x522790();
  });
}

function _0x4cb72e(_0x2b8d1e) {
  try {
    if (typeof JSON.parse(_0x2b8d1e) == "object") return true;
  } catch (_0x414960) {
    return console.log(_0x414960), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function _0x31fe91(_0x2fe8ed) {
  if (typeof _0x2fe8ed == "string") try {
    return JSON.parse(_0x2fe8ed);
  } catch (_0x1610d0) {
    return console.log(_0x1610d0), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }