/*
领现金换红包
默认兑换30 变量CASHRED='5'
8月31号下线 每天0 12 19点开抢，定时可提前1分钟
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_cashtored.js
 */
let lnrun = 0;


const $ = new Env('领现金兑换红包');
const _0x50f540 = $.isNode() ? require("./jdCookie.js") : "",
  _0x47bcdf = require("./USER_AGENTS"),
  _0x2708cd = process.env.CASHRED || "30";
let _0x77c18a = [],
  _0x1a9b77 = "",
  _0x39e90b = "",
  _0x23c7ac = [];
if ($.isNode()) {
  Object.keys(_0x50f540).forEach(_0x34cbf2 => {
    _0x77c18a.push(_0x50f540[_0x34cbf2]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x77c18a = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x14873c($.getdata("CookiesJD") || "[]").map(_0x1cdbcc => _0x1cdbcc.cookie)].filter(_0x10d815 => !!_0x10d815);
}
const _0x46ff2d = new Date();
_0x46ff2d.setHours(_0x46ff2d.getHours() + 1);
_0x46ff2d.setMinutes(0, 0, 0);
!(async () => {
  if (!_0x77c18a[0]) {
    const _0x303ace = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x303ace);
    return;
  }
  $.log("\n每天0 12 19点开抢，定时可提前1分钟");
  $.log("问题建议：https://t.me/dylan_jdpro\n\n");
  $.UA = _0x47bcdf.UARAM ? _0x47bcdf.UARAM() : _0x47bcdf.USER_AGENT;
  for (let _0x4da6eb of Array(10)) {
    await _0x2c17f9();
    if ($.roundList) {
      break;
    }
  }
  if (!$.roundList) {
    $.log("获取奖品id失败");
    return;
  }
  $.rewardList = $.roundList.filter(_0x364999 => _0x364999.status)[0].rewardList;
  $.goal = $.rewardList.filter(_0x4ff71e => Number(_0x4ff71e.cost) == _0x2708cd);
  await _0x362df7();
  let _0x30d8da = _0x46ff2d.getTime() - Date.now() + ($.difftime || 0);
  if (_0x30d8da > 60000) {
    _0x30d8da = 0;
  }
  await $.wait(_0x30d8da);
  for (let _0x44c21a = 0; _0x44c21a < _0x77c18a.length; _0x44c21a++) {
    _0x77c18a[_0x44c21a] && (_0x1a9b77 = _0x77c18a[_0x44c21a], $.UserName = decodeURIComponent(_0x1a9b77.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1a9b77.match(/pt_pin=([^; ]+)(?=;?)/)[1]), $.index = _0x44c21a + 1, $.isLogin = true, $.nickName = "", $.UA = _0x47bcdf.UARAM ? _0x47bcdf.UARAM() : _0x47bcdf.USER_AGENT, _0x23c7ac.push(_0x544150($.goal[0].assignmentId, _0x1a9b77, $.UA, $.UserName, 0)), (_0x23c7ac.length == 10 || $.index == _0x77c18a.length) && (await Promise.all(_0x23c7ac), _0x23c7ac = [], await $.wait(5000)));
  }
})().catch(_0x12fab8 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x12fab8 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x2c17f9() {
  let _0x37a710 = "functionId=cash_exchange_center&body={\"version\":\"1\",\"channel\":\"app\"}&appid=signed_wh5&client=android&clientVersion=11.8.0&t=" + Date.now();
  return new Promise(async _0x22105d => {
    $.post(_0x532269(_0x37a710), async (_0xf227d3, _0x541be7, _0x31bbcc) => {
      try {
        if (_0xf227d3) {
          console.log("" + JSON.stringify(_0xf227d3));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x31bbcc = JSON.parse(_0x31bbcc);
          if (_0x31bbcc.code == 0) {
            if (_0x31bbcc.data.bizCode == 0) {
              $.roundList = _0x31bbcc.data.result.rewardExchangePanel.roundList;
            }
          }
        }
      } catch (_0x568713) {
        $.logErr(_0x568713, _0x541be7);
      } finally {
        _0x22105d(_0x31bbcc);
      }
    });
  });
}
async function _0x544150(_0x74c29f, _0x547b74, _0x50c908, _0x488da0, _0x408e02) {
  let _0x56f891 = "functionId=cash_exchange_sendHongbao&body={\"version\":\"1\",\"channel\":\"app\",\"assignmentId\":\"" + _0x74c29f + "\"}&appid=signed_wh5&client=android&clientVersion=11.8.0&t=" + Date.now();
  if (_0x408e02 > 5) {
    $.log(_0x488da0 + "  可能黑号，一直火爆");
    return;
  }
  return new Promise(async _0x2f7e96 => {
    $.post(_0x532269(_0x56f891, _0x547b74, _0x50c908), async (_0x3588ae, _0x1b8930, _0x3df8b2) => {
      try {
        if (_0x3588ae) {
          console.log("" + JSON.stringify(_0x3588ae));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x3df8b2 = JSON.parse(_0x3df8b2);
          if (_0x3df8b2.code == 0) {
            if (_0x3df8b2.data.bizCode == 0) {
              $.log(_0x488da0 + "  兑换成功！");
            } else {
              if (_0x3df8b2.data.bizMsg.includes("火爆")) {
                _0x408e02++;
                await _0x544150(_0x74c29f, _0x547b74, _0x50c908, _0x488da0, _0x408e02);
                return;
              } else {
                console.log(_0x488da0 + "  " + _0x3df8b2.data.bizMsg);
              }
            }
          } else {
            if (_0x3df8b2.msg.includes("火爆")) {
              _0x408e02++;
              await _0x544150(_0x74c29f, _0x547b74, _0x50c908, _0x488da0, _0x408e02);
              return;
            } else {
              console.log(_0x488da0 + "  " + _0x3df8b2.msg);
            }
          }
        }
      } catch (_0x4a8858) {
        $.logErr(_0x4a8858, _0x1b8930);
      } finally {
        _0x2f7e96(_0x3df8b2);
      }
    });
  });
}
function _0x532269(_0x4122e1, _0x23dacf, _0x1119da) {
  const _0x511014 = {
    "Host": "api.m.jd.com",
    "Origin": "https://h5.m.jd.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": _0x1119da || $.UA,
    "Cookie": _0x23dacf
  };
  const _0x5a7d68 = {
    "url": "https://api.m.jd.com",
    "body": _0x4122e1,
    "headers": _0x511014
  };
  if (_0x4122e1.includes("cash_exchange_cente")) {
    delete _0x5a7d68.headers.Cookie;
  }
  return _0x5a7d68;
}
function _0x4958c4() {
  return new Promise(_0x368b83 => {
    const _0x1c0840 = {
      "Cookie": _0x1a9b77,
      "referer": "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x4ee3fc = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": _0x1c0840,
      "timeout": 10000
    };
    $.get(_0x4ee3fc, (_0x3eccc6, _0x156346, _0x553cdb) => {
      try {
        if (_0x553cdb) {
          _0x553cdb = JSON.parse(_0x553cdb);
          if (!(_0x553cdb.islogin === "1")) {
            _0x553cdb.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x564874) {
        console.log(_0x564874);
      } finally {
        _0x368b83();
      }
    });
  });
}
function _0x1361c8() {
  return new Promise(_0x1c86c5 => {
    $.log("京东账号" + $.index + $.nickName + "\n" + _0x39e90b);
    _0x1c86c5();
  });
}
function _0x42fccd(_0x967633) {
  try {
    if (typeof JSON.parse(_0x967633) == "object") {
      return true;
    }
  } catch (_0x599dc3) {
    console.log(_0x599dc3);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function _0x362df7() {
  return new Promise(_0x227f4d => {
    const _0x116591 = {
      "User-Agent": $.UA
    };
    const _0x49e8a1 = {
      "url": "https://lite-msg.m.jd.com/client.action?functionId=msgEntranceV1",
      "headers": _0x116591,
      "timeout": 10000
    };
    $.get(_0x49e8a1, (_0x548be3, _0x2c8f26, _0x33d291) => {
      try {
        _0x33d291 && (_0x33d291 = JSON.parse(_0x33d291), $.difftime = Date.now() - _0x33d291.timestamp);
      } catch (_0x165442) {
        console.log(_0x165442);
      } finally {
        _0x227f4d();
      }
    });
  });
}
function _0x14873c(_0x34ef73) {
  if (typeof _0x34ef73 == "string") {
    try {
      return JSON.parse(_0x34ef73);
    } catch (_0x3af41c) {
      console.log(_0x3af41c);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
