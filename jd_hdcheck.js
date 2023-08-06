/*
互动消息检测
仅检测，有豆到APP-我的-消息-互动消息去完成任务
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_hdcheck.js
updatetime:22023/04/23
 */
const $ = new Env('互动消息检查');
const _0x4af652 = $.isNode() ? require("./sendNotify") : "";
const _0xcf5167 = $.isNode() ? require("./jdCookie.js") : "",
  _0x17db6b = require("./USER_AGENTS"),
  _0x211408 = require("crypto-js");
let _0x5b2a91 = true;
let _0xafcf90 = [],
  _0x3371bd = "",
  _0x186a6e = "";
if ($.isNode()) {
  Object.keys(_0xcf5167).forEach(_0x39cbff => {
    _0xafcf90.push(_0xcf5167[_0x39cbff]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0xafcf90 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x26a3cb($.getdata("CookiesJD") || "[]").map(_0xd0e89e => _0xd0e89e.cookie)].filter(_0x2d438b => !!_0x2d438b);
}
!(async () => {
  if (!_0xafcf90[0]) {
    const _0x3b8e08 = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x3b8e08);
    return;
  }
  $.log("仅检测，有豆的话，去入口：APP-我的-消息-互动消息，做任务领取！\n");
  for (let _0x2f73b4 = 0; _0x2f73b4 < _0xafcf90.length; _0x2f73b4++) {
    if (_0xafcf90[_0x2f73b4]) {
      _0x3371bd = _0xafcf90[_0x2f73b4];
      $.UserName = decodeURIComponent(_0x3371bd.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3371bd.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x2f73b4 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.hdlist = [];
      $.beanlist = [];
      $.UA = _0x17db6b.UARAM ? _0x17db6b.UARAM() : _0x17db6b.USER_AGENT;
      await _0x485fe0();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        const _0xfc9686 = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0xfc9686);
        $.isNode() && (await _0x4af652.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x21a42c();
      for (let _0x46f5a5 of $.hdlist) {
        if (_0x46f5a5.expired || _0x46f5a5.hasRead) {
          continue;
        }
        if (_0x46f5a5.content.includes("京豆")) {
          $.beanlist.push(_0x46f5a5.content);
        }
      }
      if ($.beanlist.length !== 0) {
        $.index == 1 && (_0x186a6e += "入口：APP-我的-消息-互动消息，去完成任务领豆吧！\n\n");
        console.log("互动消息有豆，如下：\n");
        _0x186a6e += "【账号" + $.index + "：" + ($.nickName || $.UserName) + "】\n\n";
        for (let _0x1b2d9d of $.beanlist) {
          console.log(_0x1b2d9d + "\n");
          _0x186a6e += _0x1b2d9d + "\n\n";
        }
      } else {
        $.log("检测完毕，没有新的 给豆 消息！");
      }
      await $.wait(5000);
    }
  }
  const _0x493d88 = {
    "url": "https://bean.m.jd.com/beanDetail/index.action?resourceValue=bean"
  };
  if (_0x186a6e) {
    await _0x4af652.sendNotify("" + $.name, "" + _0x186a6e, _0x493d88);
  }
})().catch(_0x345d62 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x345d62 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x21a42c() {
  let _0xdc2a80 = Date.now(),
    _0x58ac03 = _0x50c949(),
    _0x44b8b9 = _0x50c949();
  const _0x2ffd6c = {
    "accountType": "12",
    "bubblesCount": "0",
    "lastMsgId": null,
    "page": 1
  };
  let _0x58f3bd = _0x58ac03 + "&MessageCenter&{\"accountType\":\"12\",\"bubblesCount\":\"0\",\"lastMsgId\":null,\"page\":1}&98715&android&11.6.5&secondLvlMsgV854&0&zh_CN&0&wifi&" + _0x44b8b9 + "&" + _0x58ac03 + "&12&jingdong&2276*1080&31&" + _0xdc2a80 + "&" + _0x58ac03,
    _0x1524c1 = "ddcccc63f0b2426fb61acb24c9439b3f",
    _0x5ed20a = _0x211408.HmacSHA256(_0x58f3bd, _0x1524c1);
  _0x5ed20a = _0x211408.enc.Hex.stringify(_0x5ed20a);
  let _0x41736f = {
    "url": "https://api.m.jd.com/client.action",
    "body": "functionId=secondLvlMsgV854&lmt=0&t=" + _0xdc2a80 + "&appid=MessageCenter&clientVersion=11.6.5&build=98715&client=android&partner=jingdong&oaid=" + _0x44b8b9 + "&sdkVersion=31&lang=zh_CN&harmonyOs=0&networkType=wifi&osVersion=12&screen=2276*1080&uuid=" + _0x58ac03 + "&aid=" + _0x58ac03 + "&openudid=" + _0x58ac03 + "&body=" + encodeURIComponent(JSON.stringify(_0x2ffd6c)) + "&sign=" + _0x5ed20a,
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": _0x3371bd
    }
  };
  return new Promise(async _0x118616 => {
    $.post(_0x41736f, async (_0x450af7, _0x7c35d0, _0x2b730e) => {
      try {
        if (_0x450af7) {
          console.log("" + JSON.stringify(_0x450af7));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x2b730e = JSON.parse(_0x2b730e);
          if (_0x2b730e.code == 0) {
            $.hdlist = _0x2b730e.secondLevelList;
          } else {
            console.log(JSON.stringify(_0x2b730e));
          }
        }
      } catch (_0x1873ad) {
        $.logErr(_0x1873ad, _0x7c35d0);
      } finally {
        _0x118616(_0x2b730e);
      }
    });
  });
}
function _0x50c949() {
  var _0x2cca02 = new Date().getTime(),
    _0x31dca = "xxxxxxxxxxxxxxxx".replace(/[xy]/g, function (_0xcd6943) {
      var _0x9a6d8d = (_0x2cca02 + 16 * Math.random()) % 16 | 0;
      _0x2cca02 = Math.floor(_0x2cca02 / 16);
      return ("x" == _0xcd6943 ? _0x9a6d8d : 3 & _0x9a6d8d | 8).toString(16);
    });
  return _0x31dca;
}
function _0x102886() {
  return;
}
function _0x485fe0() {
  return new Promise(_0x524ee0 => {
    const _0x33da89 = {
      "Cookie": _0x3371bd,
      "referer": "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x3e797f = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": _0x33da89,
      "timeout": 10000
    };
    $.get(_0x3e797f, (_0x115a8c, _0x1a5e80, _0xd9f249) => {
      try {
        if (_0xd9f249) {
          _0xd9f249 = JSON.parse(_0xd9f249);
          if (!(_0xd9f249.islogin === "1")) {
            _0xd9f249.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x11d69f) {
        console.log(_0x11d69f);
      } finally {
        _0x524ee0();
      }
    });
  });
}
function _0x5b9d32() {
  return new Promise(_0x7aa7d9 => {
    $.log("京东账号" + $.index + $.nickName + "\n" + _0x186a6e);
    _0x7aa7d9();
  });
}
function _0x452d8b(_0x200382) {
  try {
    if (typeof JSON.parse(_0x200382) == "object") {
      return true;
    }
  } catch (_0x2a7e01) {
    console.log(_0x2a7e01);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function _0x26a3cb(_0x100135) {
  if (typeof _0x100135 == "string") {
    try {
      return JSON.parse(_0x100135);
    } catch (_0x3d241e) {
      console.log(_0x3d241e);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
