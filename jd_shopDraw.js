/*
店铺左侧刮刮乐

店铺抽奖 左侧

也可点击顶部【精选】后面的【活动】选项，找到抽奖活动

必须有venderId= 参数
//export jd_shopDraw_venderId="" //店铺ID，多个 @ 链接或者 | 链接 或者 & 链接

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#店铺左侧刮刮乐
1 1 1 1 * jd_shopDraw.js, tag=店铺刮刮乐, enabled=true
 */
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('店铺左侧刮刮乐');
const _0x276998 = $.isNode() ? require("./sendNotify") : "",
  _0x47f881 = $.isNode() ? require("./jdCookie.js") : "",
  _0x40e627 = require("./function/krgetSign");
let _0x520315 = [],
  _0x56f896 = "";
if ($.isNode()) {
  Object.keys(_0x47f881).forEach(_0x518c4a => {
    _0x520315.push(_0x47f881[_0x518c4a]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x520315 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x305f6d($.getdata("CookiesJD") || "[]").map(_0x533ff1 => _0x533ff1.cookie)].filter(_0x2a2e7c => !!_0x2a2e7c);
let _0x53f6c6 = [];
if (process.env.jd_shopDraw_venderId) {
  if (process.env.jd_shopDraw_venderId.includes("|")) _0x53f6c6 = [...process.env.jd_shopDraw_venderId.split("|"), ..._0x53f6c6];else process.env.jd_shopDraw_venderId.includes("@") ? _0x53f6c6 = [...process.env.jd_shopDraw_venderId.split("@"), ..._0x53f6c6] : _0x53f6c6 = [...process.env.jd_shopDraw_venderId.split("&"), ..._0x53f6c6];
}
const _0x27d64d = process.env.JD_SIGN_KRAPI || "";
let _0x2a79c5 = "";
const _0x40a731 = "https://api.m.jd.com/client.action";
!(async () => {
  if (_0x53f6c6.length <= 0) {
    $.log("活动id不存在");
    return;
  }
  if (!_0x520315[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动ID：" + _0x53f6c6);
  for (let _0x1ca1f8 = 0; _0x1ca1f8 < _0x520315.length; _0x1ca1f8++) {
    if (_0x520315[_0x1ca1f8]) {
      _0x56f896 = _0x520315[_0x1ca1f8];
      $.UserName = decodeURIComponent(_0x56f896.match(/pt_pin=([^; ]+)(?=;?)/) && _0x56f896.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x1ca1f8 + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x276998.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x3891f7();
    }
  }
  if (_0x2a79c5) {
    if ($.isNode()) await _0x276998.sendNotify("" + $.name, "" + _0x2a79c5);
    $.msg($.name, "", _0x2a79c5);
  }
})().catch(_0x5a78f4 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x5a78f4 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x3891f7() {
  for (let _0xdebd26 = 0; _0xdebd26 < _0x53f6c6.length; _0xdebd26++) {
    console.log("开始第" + (_0xdebd26 + 1) + "个店铺抽奖：" + _0x53f6c6[_0xdebd26]);
    $.venderId = _0x53f6c6[_0xdebd26];
    await _0x760b02();
    await $.wait(500);
    $.index == 1 && (await _0x28fac4());
    await $.wait(500);
    $.isSign != 2 ? await _0xf70f80() : console.log("已经参与过活动~\n");
  }
}
async function _0x760b02() {
  sign = await _0x40e627("getSignInfo", {
    "vendorId": $.venderId
  });
  _0x27d64d ? $.signStr = sign?.["data"]?.["convertUrl"] || "" : $.signStr = sign?.["body"] || "";
  if (!$.signStr) {
    console.log("接口获取失败，跳过");
  }
  let _0x2c2e65 = {
    "url": _0x40a731 + "?functionId=getSignInfo",
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": _0x56f896,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "body": "" + $.signStr
  };
  return new Promise(_0x31660c => {
    $.post(_0x2c2e65, (_0x265e17, _0x19d022, _0x15de19) => {
      try {
        _0x265e17 ? $.log(_0x265e17) : (_0x15de19 = JSON.parse(_0x15de19), typeof _0x15de19 == "object" ? _0x15de19.code == 0 && ($.isSign = _0x15de19.result.signInfo.isSign) : console.log("京东返回了空数据"));
      } catch (_0x5a79d4) {
        $.log(_0x5a79d4);
      } finally {
        _0x31660c();
      }
    });
  });
}
async function _0x28fac4() {
  sign = await _0x40e627("signActivityRule", {
    "vendorId": $.venderId
  });
  _0x27d64d ? $.signStr = sign?.["data"]?.["convertUrl"] || "" : $.signStr = sign?.["body"] || "";
  !$.signStr && console.log("接口获取失败，跳过");
  let _0x23a1d5 = {
    "url": _0x40a731 + "?functionId=signActivityRule",
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": _0x56f896,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "body": "" + $.signStr
  };
  return new Promise(_0x316155 => {
    $.post(_0x23a1d5, (_0x4bff80, _0x3d7e78, _0x31eb8e) => {
      try {
        _0x4bff80 ? $.log(_0x4bff80) : (_0x31eb8e = JSON.parse(_0x31eb8e), typeof _0x31eb8e == "object" ? _0x31eb8e.code == 0 && console.log("活动奖品：" + _0x31eb8e.result.awardDescription + "\n") : $.log("京东返回了空数据"));
      } catch (_0x538fa7) {
        $.log(_0x538fa7);
      } finally {
        _0x316155();
      }
    });
  });
}
async function _0xf70f80() {
  sign = await _0x40e627("sign", {
    "vendorId": $.venderId,
    "sourceRpc": "shop_app_sign_home"
  });
  if (_0x27d64d) $.signStr = sign?.["data"]?.["convertUrl"] || "";else {
    $.signStr = sign?.["body"] || "";
  }
  !$.signStr && console.log("接口获取失败，跳过");
  let _0x6dc66d = {
    "url": _0x40a731 + "?functionId=sign",
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": _0x56f896,
      "User-Agent": "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br"
    },
    "body": "" + $.signStr
  };
  return new Promise(_0x4a0e9d => {
    $.post(_0x6dc66d, (_0x1e7457, _0x6e4414, _0x1394a4) => {
      try {
        if (_0x1e7457) $.log(_0x1e7457);else {
          _0x1394a4 = JSON.parse(_0x1394a4);
          if (typeof _0x1394a4 == "object") _0x1394a4.code == 0 ? _0x1394a4.result.isWin ? ($.Prize = _0x1394a4.result.signReward.name || "", console.log("抽奖结果：" + $.Prize + " 🐶\n")) : console.log("抽奖结果：💨  空气\n") : console.log("账号未登录\n");else {
            console.log("京东返回了空数据");
          }
        }
      } catch (_0x1c7393) {
        $.log(_0x1c7393);
      } finally {
        _0x4a0e9d();
      }
    });
  });
}
function _0x305f6d(_0x324481) {
  if (typeof _0x324481 == "string") try {
    return JSON.parse(_0x324481);
  } catch (_0x23d105) {
    return console.log(_0x23d105), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function _0x21e61a(_0x33a50d, _0x1c585d) {
  let _0x4d3bd6 = new RegExp("(^|[&?])" + _0x1c585d + "=([^&]*)(&|$)"),
    _0x127065 = _0x33a50d.match(_0x4d3bd6);
  if (_0x127065 != null) {
    return unescape(_0x127065[2]);
  }
  return "";
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
