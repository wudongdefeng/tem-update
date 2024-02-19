/*
价格保护
55 11 * * * jd_OnceApply.js
 */
let lnrun = 0;
const $ = new Env('一键价保');
const _0xbb32db = $.isNode() ? require("./sendNotify") : "",
      _0x333413 = $.isNode() ? require("./jdCookie.js") : "",
      _0x39d324 = $.isNode() ? require("jsdom") : "",
      _0x447bb9 = require("./function/dylano"),
      _0x1480ae = require("./USER_AGENTS");

let _0xed3de6 = [],
    _0x3588ee = "",
    _0x46f8b0,
    _0x19b161 = "";

if ($.isNode()) {
  Object.keys(_0x333413).forEach(_0x803d83 => {
    _0xed3de6.push(_0x333413[_0x803d83]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0xed3de6 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x4ec73d($.getdata("CookiesJD") || "[]").map(_0x44f741 => _0x44f741.cookie)].filter(_0x524856 => !!_0x524856);

const _0x4afef0 = "https://api.m.jd.com/";
!(async () => {
  if (!_0xed3de6[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  $.log("\n当前版本：20230217");
  console.log("TG频道：https://t.me/dylan_jdpro");

  for (let _0x4820b0 = 0; _0x4820b0 < _0xed3de6.length; _0x4820b0++) {
    if (_0xed3de6[_0x4820b0]) {
      _0x3588ee = _0xed3de6[_0x4820b0];
      $.UserName = decodeURIComponent(_0x3588ee.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3588ee.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x4820b0 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.token = undefined;
      _0x46f8b0 = "";
      $.tryCount = 0;
      $.UA = _0x1480ae.UARAM ? _0x1480ae.UARAM() : _0x1480ae.USER_AGENT;
      await _0x28bef3();
      console.log("\n---------------开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "----------------\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0xbb32db.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      await _0x3eae4e();
      await _0x5dba58();
      await $.wait(5000);
    }
  }

  if (_0x19b161) {
    if ($.isNode()) await _0xbb32db.sendNotify("" + $.name, "" + _0x19b161);
  }
})().catch(_0x5f1822 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x5f1822 + "!", "");
}).finally(() => {
  $.done();
});

async function _0x42460f() {
  let _0x4844f0 = 0;

  do {
    if ($.jab) {
      $.token = $.jab.getToken() || "";
    }

    ($.jab && $.token || !$.jab) && (await _0x3eae4e());
    _0x4844f0++;
  } while (_0x4844f0 < 3 && !$.token && $.jab);

  await _0x5dba58();
}

async function _0x3eae4e() {
  let _0x5870a2 = {
    "sid": "",
    "type": "25",
    "forcebot": ""
  },
      _0x43728b = {
    "appId": "d2f64",
    "fn": "siteppM_skuOnceApply",
    "body": _0x5870a2,
    "apid": "siteppM",
    "user": $.UserName,
    "code": 1,
    "xcr": 1,
    "ua": $.UA
  };
  _0x43728b = await _0x447bb9.getbody(_0x43728b);
  if (!_0x43728b) return;

  let _0x53d71a = _0x43728b.split("h5st")[1],
      _0x4042a0 = _0x43728b.match(/t=(\d+)&/)[1];

  return new Promise(async _0x37c8f6 => {
    $.post(_0xb08d1c("siteppM_skuOnceApply", _0x5870a2, _0x53d71a, _0x4042a0), async (_0x419569, _0xbcef8b, _0x3b0235) => {
      try {
        if (_0x419569) console.log(JSON.stringify(_0x419569)), console.log("siteppM_skuOnceApply 请求失败，请检查网路重试");else {
          if (_0x2552d2(_0x3b0235)) {
            _0x3b0235 = JSON.parse(_0x3b0235);

            if (_0x3b0235.flag) {
              if (_0x3b0235.succAmount && _0x3b0235.succAmount != 0) {
                console.log("价保成功：回血" + _0x3b0235.succAmount + "元 🤑");
                _0x46f8b0 += "价保成功：回血" + _0x3b0235.succAmount + "元 🤑\n";
              } else console.log("没有可保价的订单 😂");
            } else {
              console.log("保价失败：" + _0x3b0235.responseMessage);
              if ($.tryCount < 3) console.log("重试 " + ($.tryCount + 1) + "} 次..."), await $.wait(10 * 1000), $.tryCount++, await _0x3eae4e();else {}
            }
          }
        }
      } catch (_0x4475f9) {
        $.logErr(_0x4475f9, _0xbcef8b);
      } finally {
        _0x37c8f6(_0x3b0235);
      }
    });
  });
}

function _0x4215a5() {
  let _0x197ebe = {
    "sid": "",
    "type": "25",
    "forcebot": "",
    "num": 15
  };
  return new Promise(_0x245eeb => {
    $.post(_0xb08d1c("siteppM_appliedSuccAmount", _0x197ebe), (_0x3918f6, _0x3b1cd4, _0xe72927) => {
      try {
        if (_0x3918f6) console.log(JSON.stringify(_0x3918f6)), console.log($.name + " siteppM_appliedSuccAmount API请求失败，请检查网路重试");else {
          if (_0x2552d2(_0xe72927)) {
            _0xe72927 = JSON.parse(_0xe72927);

            if (_0xe72927.flag) {
              console.log("保价成功：返还" + _0xe72927.succAmount + "元");
              _0x46f8b0 += "保价成功：返还" + _0xe72927.succAmount + "元\n";
            } else console.log("保价失败：没有可保价的订单");
          }
        }
      } catch (_0x25219f) {
        $.logErr(_0x25219f, _0x3b1cd4);
      } finally {
        _0x245eeb(_0xe72927);
      }
    });
  });
}

async function _0x46d6b3() {
  if ($.signWaap) {
    return;
  }

  const {
    JSDOM: _0x3791c4
  } = _0x39d324;

  let _0x444e3d = new _0x39d324.ResourceLoader({
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
    "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu"
  }),
      _0x4b4454 = new _0x39d324.VirtualConsole(),
      _0x2881cc = {
    "url": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
    "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
    "runScripts": "dangerously",
    "resources": _0x444e3d,
    "includeNodeLocations": true,
    "storageQuota": 10000000,
    "pretendToBeVisual": true,
    "virtualConsole": _0x4b4454
  };

  const _0x28700c = new _0x3791c4("<body>\n  <script src=\"https:////static.360buyimg.com/siteppStatic/script/mescroll/map.js\"></script>\n  <script src=\"https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.0.js\"></script>\n  <script src=\"https://static.360buyimg.com/siteppStatic/script/utils.js\"></script>\n  <script src=\"https://js-nocaptcha.jd.com/statics/js/main.min.js\"></script>\n  </body>", _0x2881cc);

  let _0x33f006 = 0;

  do {
    _0x33f006 += 1;
    await $.wait(1000);

    try {
      _0x28700c.window.JAB ? $.jab = new _0x28700c.window.JAB({
        "bizId": "jdjiabao",
        "initCaptcha": false
      }) : $.jab = undefined;
      $.signWaap = _0x28700c.window.signWaap;
    } catch (_0x2797b6) {}
  } while (!$.signWaap && _0x33f006 < 4);
}

function _0x39b795(_0x19a465) {
  return new Promise(_0x7a9404 => {
    const _0x46f132 = {
      "url": _0x19a465,
      "timeout": 10000
    };
    $.get(_0x46f132, async (_0x3c91c6, _0x1adf09, _0x2e154a) => {
      let _0x506474 = null;

      try {
        if (_0x3c91c6) {
          console.log("⚠️网络请求失败");
        } else {
          _0x506474 = _0x2e154a;
        }
      } catch (_0x3d546a) {
        $.logErr(_0x3d546a, _0x1adf09);
      } finally {
        _0x7a9404(_0x506474);
      }
    });
  });
}

function _0x5dba58() {
  return new Promise(_0x4a7f68 => {
    _0x46f8b0 && (_0x19b161 += "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n" + _0x46f8b0 + ($.index !== _0xed3de6.length ? "\n\n" : "\n\n"));
    $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n" + _0x46f8b0);

    _0x4a7f68();
  });
}

function _0xb08d1c(_0x330e02, _0x1d4e09, _0xce3eed = "", _0x1bcd3c = Date.now()) {
  return {
    "url": _0x4afef0 + "api?appid=siteppM&functionId=" + _0x330e02 + "&forcebot=&t=" + _0x1bcd3c,
    "body": "body=" + encodeURIComponent(JSON.stringify(_0x1d4e09)) + "&h5st" + _0xce3eed,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://msitepp-fm.jd.com",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "User-Agent": $.UA,
      "Referer": "https://msitepp-fm.jd.com/",
      "Accept-Encoding": "gzip, deflate, br",
      "Cookie": _0x3588ee
    }
  };
}

function _0x28bef3() {
  return new Promise(_0x4e31e3 => {
    const _0x1b1cab = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x3588ee,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x1b1cab, (_0x137a4e, _0x72fa6b, _0x4033f0) => {
      try {
        if (_0x4033f0) {
          _0x4033f0 = JSON.parse(_0x4033f0);

          if (_0x4033f0.islogin === "1") {} else {
            if (_0x4033f0.islogin === "0") {
              $.isLogin = false;
            }
          }
        }
      } catch (_0x2d49e6) {
        console.log(_0x2d49e6);
      } finally {
        _0x4e31e3();
      }
    });
  });
}

function _0x2552d2(_0x16c454) {
  try {
    if (typeof JSON.parse(_0x16c454) == "object") return true;
  } catch (_0x45db89) {
    return console.log(_0x45db89), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function _0x4ec73d(_0x933e97) {
  if (typeof _0x933e97 == "string") try {
    return JSON.parse(_0x933e97);
  } catch (_0x136fe0) {
    return console.log(_0x136fe0), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
