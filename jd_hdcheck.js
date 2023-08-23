/*
互动消息检测
仅检测，有豆到APP-我的-消息-互动消息去完成任务
https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_hdcheck.js
updatetime:22023/08/14 屏蔽种豆和签到消息
 */
let lnrun = 0;


const $ = new Env('互动消息检查');
const _0x5cd985 = $.isNode() ? require("./sendNotify") : "",
  _0x5559ed = $.isNode() ? require("./jdCookie.js") : "",
  _0x1aff54 = require("./USER_AGENTS"),
  _0x4970a2 = require("crypto-js");
let _0x1aeea2 = [],
  _0x1f2a6a = "",
  _0x1cd371 = "";
if ($.isNode()) {
  Object.keys(_0x5559ed).forEach(_0x47387a => {
    _0x1aeea2.push(_0x5559ed[_0x47387a]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x1aeea2 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4f67c2($.getdata("CookiesJD") || "[]").map(_0x543a97 => _0x543a97.cookie)].filter(_0x4e508e => !!_0x4e508e);
}
!(async () => {
  if (!_0x1aeea2[0]) {
    const _0x4c824f = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x4c824f);
    return;
  }
  $.log("仅检测，有豆的话，去入口：APP-我的-消息-互动消息，做任务领取！\n");
  for (let _0x5a0b2a = 0; _0x5a0b2a < _0x1aeea2.length; _0x5a0b2a++) {
    if (_0x1aeea2[_0x5a0b2a]) {
      _0x1f2a6a = _0x1aeea2[_0x5a0b2a];
      $.UserName = decodeURIComponent(_0x1f2a6a.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1f2a6a.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x5a0b2a + 1;
      $.isLogin = true;
      $.nickName = "";
      $.hdlist = [];
      $.beanlist = [];
      $.UA = _0x1aff54.UARAM ? _0x1aff54.UARAM() : _0x1aff54.USER_AGENT;
      await _0x173bb7();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      lnrun++;if(lnrun == 4){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      if (!$.isLogin) {
        const _0x3a15fe = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x3a15fe);
        $.isNode() && (await _0x5cd985.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x581f83();
      for (let _0x4a76f8 of $.hdlist) {
        if (_0x4a76f8.expired || _0x4a76f8.hasRead) {
          continue;
        }
        _0x4a76f8.content.includes("京豆") && !_0x4a76f8.content.includes("种豆") && !_0x4a76f8.content.includes("昨日") && $.beanlist.push(_0x4a76f8.content);
      }
      if ($.beanlist.length !== 0) {
        $.index == 1 && (_0x1cd371 += "入口：APP-我的-消息-互动消息，去完成任务领豆吧！\n\n");
        console.log("互动消息有豆，如下：\n");
        _0x1cd371 += "【账号" + $.index + "：" + ($.nickName || $.UserName) + "】\n\n";
        for (let _0x15bd16 of $.beanlist) {
          console.log(_0x15bd16 + "\n");
          _0x1cd371 += _0x15bd16 + "\n\n";
        }
      } else {
        $.log("检测完毕，没有新的 给豆 消息！");
      }
      await $.wait(5000);
    }
  }
  if (_0x1cd371) {
    await _0x5cd985.sendNotify("" + $.name, "" + _0x1cd371);
  }
})().catch(_0x573730 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x573730 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x581f83() {
  let _0x4e3e50 = Date.now(),
    _0x184e9a = _0x874c32(),
    _0x1eb897 = _0x874c32();
  const _0x3ca511 = {
    "accountType": "12",
    "bubblesCount": "0",
    "lastMsgId": null,
    "page": 1
  };
  let _0xc53173 = _0x184e9a + "&MessageCenter&{\"accountType\":\"12\",\"bubblesCount\":\"0\",\"lastMsgId\":null,\"page\":1}&98715&android&11.6.5&secondLvlMsgV854&0&zh_CN&0&wifi&" + _0x1eb897 + "&" + _0x184e9a + "&12&jingdong&2276*1080&31&" + _0x4e3e50 + "&" + _0x184e9a,
    _0x56b6ac = "ddcccc63f0b2426fb61acb24c9439b3f",
    _0xcd41a2 = _0x4970a2.HmacSHA256(_0xc53173, _0x56b6ac);
  _0xcd41a2 = _0x4970a2.enc.Hex.stringify(_0xcd41a2);
  const _0x15ba85 = {
    "Host": "api.m.jd.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    "Cookie": _0x1f2a6a
  };
  let _0x37eef6 = {
    "url": "https://api.m.jd.com/client.action",
    "body": "functionId=secondLvlMsgV854&lmt=0&t=" + _0x4e3e50 + "&appid=MessageCenter&clientVersion=11.6.5&build=98715&client=android&partner=jingdong&oaid=" + _0x1eb897 + "&sdkVersion=31&lang=zh_CN&harmonyOs=0&networkType=wifi&osVersion=12&screen=2276*1080&uuid=" + _0x184e9a + "&aid=" + _0x184e9a + "&openudid=" + _0x184e9a + "&body=" + encodeURIComponent(JSON.stringify(_0x3ca511)) + "&sign=" + _0xcd41a2,
    "headers": _0x15ba85
  };
  return new Promise(async _0x3c7bb6 => {
    $.post(_0x37eef6, async (_0xb922d8, _0x1692b0, _0x4aaf3c) => {
      try {
        _0xb922d8 ? (console.log("" + JSON.stringify(_0xb922d8)), console.log(" API请求失败，请检查网路重试")) : (_0x4aaf3c = JSON.parse(_0x4aaf3c), _0x4aaf3c.code == 0 ? $.hdlist = _0x4aaf3c.secondLevelList : console.log(JSON.stringify(_0x4aaf3c)));
      } catch (_0x582ace) {
        $.logErr(_0x582ace, _0x1692b0);
      } finally {
        _0x3c7bb6(_0x4aaf3c);
      }
    });
  });
}
function _0x874c32() {
  var _0x4cf2ec = new Date().getTime(),
    _0x431989 = "xxxxxxxxxxxxxxxx".replace(/[xy]/g, function (_0x10b3f5) {
      var _0x5eaaf7 = (_0x4cf2ec + 16 * Math.random()) % 16 | 0;
      _0x4cf2ec = Math.floor(_0x4cf2ec / 16);
      return ("x" == _0x10b3f5 ? _0x5eaaf7 : 3 & _0x5eaaf7 | 8).toString(16);
    });
  return _0x431989;
}
function _0x16a538() {
  return;
}
function _0x173bb7() {
  return new Promise(_0x1b8012 => {
    const _0x1cf403 = {
      "Cookie": _0x1f2a6a,
      "referer": "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x509eaf = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": _0x1cf403,
      "timeout": 10000
    };
    $.get(_0x509eaf, (_0x5eab37, _0x5c7096, _0x4ce8da) => {
      try {
        if (_0x4ce8da) {
          _0x4ce8da = JSON.parse(_0x4ce8da);
          if (!(_0x4ce8da.islogin === "1")) {
            _0x4ce8da.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x67e1e0) {
        console.log(_0x67e1e0);
      } finally {
        _0x1b8012();
      }
    });
  });
}
function _0x3b222d() {
  return new Promise(_0x49f45f => {
    $.log("京东账号" + $.index + $.nickName + "\n" + _0x1cd371);
    _0x49f45f();
  });
}
function _0x2e475f(_0x4536e2) {
  try {
    if (typeof JSON.parse(_0x4536e2) == "object") {
      return true;
    }
  } catch (_0x2f1794) {
    console.log(_0x2f1794);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function _0x4f67c2(_0x3d6fa2) {
  if (typeof _0x3d6fa2 == "string") {
    try {
      return JSON.parse(_0x3d6fa2);
    } catch (_0x5dc84c) {
      console.log(_0x5dc84c);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
