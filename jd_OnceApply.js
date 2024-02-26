/*
价格保护
55 11 * * * jd_OnceApply.js
 */
let lnrun = 0;
const $ = new Env('一键价保');
const _0x4e93d9 = $.isNode() ? require("./sendNotify") : "",
      _0x1843ab = $.isNode() ? require("./jdCookie.js") : "",
      _0xac1eba = $.isNode() ? require("jsdom") : "",
      _0x27207a = require("./function/dylano"),
      _0x297ad9 = require("./USER_AGENTS");

let _0x435d38 = [],
    _0x3d9552 = "",
    _0x51433d,
    _0x56bc8e = "";

if ($.isNode()) {
  var _0x2a1980 = new Buffer.from("64796C616E", "Hex").toString("utf8");
  Object.keys(_0x1843ab).forEach(_0x5c822f => {
    _0x435d38.push(_0x1843ab[_0x5c822f]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x435d38 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x3bf1a3($.getdata("CookiesJD") || "[]").map(_0x5cc3bc => _0x5cc3bc.cookie)].filter(_0x91dc5d => !!_0x91dc5d);
}

let _0x33dab4 = "",
    _0x4b1424 = "";
$.isNode() && process.env.WP_APP_TOKEN_ONE && (_0x33dab4 = process.env.WP_APP_TOKEN_ONE);
let _0x17622b = __filename;
const _0x4c3301 = "https://api.m.jd.com/";
!(async () => {
  if (!_0x435d38[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  $.log("\n当前版本：20230217");
  console.log("TG频道：https://t.me/dylan_jdpro");

  for (let _0xa4b086 = 0; _0xa4b086 < _0x435d38.length; _0xa4b086++) {
    if (_0x435d38[_0xa4b086]) {
      _0x3d9552 = _0x435d38[_0xa4b086];
      $.UserName = decodeURIComponent(_0x3d9552.match(/pt_pin=([^; ]+)(?=;?)/) && _0x3d9552.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0xa4b086 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.token = undefined;
      _0x51433d = "";
      $.tryCount = 0;
      _0x4b1424 = "";
      $.UA = _0x297ad9.UARAM ? _0x297ad9.UARAM() : _0x297ad9.USER_AGENT;
      await _0x5265ef();
      console.log("\n---------------开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "----------------\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

      if (!$.isLogin) {
        const _0x55657d = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x55657d);
        $.isNode() && (await _0x4e93d9.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      await _0x3c58cb();

      if (_0x4b1424 && $.isNode() && _0x33dab4 && _0x17622b.includes(_0x2a1980)) {
        try {
          await _0x4e93d9.sendNotifybyWxPucher("一键价保", _0x4b1424, "" + $.UserName);
        } catch (_0x2025be) {
          console.log("\n一对一推送失败，请替换sendnotify文件!!!");
        }
      }

      await _0x2c954d();
      await $.wait(5000);
    }
  }

  if (_0x56bc8e) {
    if ($.isNode()) {
      await _0x4e93d9.sendNotify("" + $.name, "" + _0x56bc8e);
    }
  }
})().catch(_0x3a9882 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x3a9882 + "!", "");
}).finally(() => {
  $.done();
});

async function _0x2c7fd9() {
  let _0x586ef9 = 0;

  do {
    $.jab && ($.token = $.jab.getToken() || "");
    ($.jab && $.token || !$.jab) && (await _0x3c58cb());
    _0x586ef9++;
  } while (_0x586ef9 < 3 && !$.token && $.jab);

  await _0x2c954d();
}

async function _0x3c58cb() {
  const _0x26af97 = {
    sid: "",
    type: "25",
    forcebot: ""
  };
  const _0x598375 = {
    appId: "d2f64",
    fn: "siteppM_skuOnceApply",
    body: _0x26af97,
    apid: "siteppM",
    user: $.UserName,
    code: 1,
    xcr: 1,
    ua: $.UA
  };
  let _0x497960 = _0x598375;
  _0x497960 = await _0x27207a.getbody(_0x497960);

  if (!_0x497960) {
    return;
  }

  let _0x2a7c94 = _0x497960.split("h5st")[1],
      _0x640f7b = _0x497960.match(/t=(\d+)&/)[1];

  return new Promise(async _0x3ec78a => {
    $.post(_0x214754("siteppM_skuOnceApply", _0x26af97, _0x2a7c94, _0x640f7b), async (_0x282583, _0x37934c, _0xf0e106) => {
      try {
        if (_0x282583) {
          console.log(JSON.stringify(_0x282583));
          console.log("siteppM_skuOnceApply 请求失败，请检查网路重试");
        } else {
          if (_0x1dff19(_0xf0e106)) {
            _0xf0e106 = JSON.parse(_0xf0e106);

            if (_0xf0e106.flag) {
              _0xf0e106.succAmount && _0xf0e106.succAmount != 0 ? (console.log("价保成功：回血" + _0xf0e106.succAmount + "元 🤑"), _0x51433d += "价保成功：回血" + _0xf0e106.succAmount + "元 🤑\n", _0x4b1424 = "价保成功，回血" + _0xf0e106.succAmount + "元 🤑\n") : console.log("没有可保价的订单 😂");
            } else {
              console.log("保价失败：" + _0xf0e106.responseMessage);

              if ($.tryCount < 3) {
                console.log("重试 " + ($.tryCount + 1) + "} 次...");
                await $.wait(10000);
                $.tryCount++;
                await _0x3c58cb();
              }
            }
          }
        }
      } catch (_0xb6570e) {
        $.logErr(_0xb6570e, _0x37934c);
      } finally {
        _0x3ec78a(_0xf0e106);
      }
    });
  });
}

function _0x13993e() {
  const _0xee4c1e = {
    sid: "",
    type: "25",
    forcebot: "",
    num: 15
  };
  return new Promise(_0x4790ed => {
    $.post(_0x214754("siteppM_appliedSuccAmount", _0xee4c1e), (_0x5d20b9, _0x26d5c9, _0x4b4d07) => {
      try {
        _0x5d20b9 ? (console.log(JSON.stringify(_0x5d20b9)), console.log($.name + " siteppM_appliedSuccAmount API请求失败，请检查网路重试")) : _0x1dff19(_0x4b4d07) && (_0x4b4d07 = JSON.parse(_0x4b4d07), _0x4b4d07.flag ? (console.log("保价成功：返还" + _0x4b4d07.succAmount + "元"), _0x51433d += "保价成功：返还" + _0x4b4d07.succAmount + "元\n") : console.log("保价失败：没有可保价的订单"));
      } catch (_0x4081c2) {
        $.logErr(_0x4081c2, _0x26d5c9);
      } finally {
        _0x4790ed(_0x4b4d07);
      }
    });
  });
}

async function _0x5472d3() {
  if ($.signWaap) {
    return;
  }

  const {
    JSDOM: _0x3857c0
  } = _0xac1eba,
        _0x5c7589 = {
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
    referrer: "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu"
  };

  let _0x5732c5 = new _0xac1eba.ResourceLoader(_0x5c7589),
      _0x48d076 = new _0xac1eba.VirtualConsole();

  const _0x37e602 = {
    url: "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
    referrer: "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
    runScripts: "dangerously",
    resources: _0x5732c5,
    includeNodeLocations: true,
    storageQuota: 10000000,
    pretendToBeVisual: true,
    virtualConsole: _0x48d076
  };

  const _0x263d5d = new _0x3857c0("<body>\n  <script src=\"https:////static.360buyimg.com/siteppStatic/script/mescroll/map.js\"></script>\n  <script src=\"https://storage.360buyimg.com/webcontainer/js_security_v3_0.1.0.js\"></script>\n  <script src=\"https://static.360buyimg.com/siteppStatic/script/utils.js\"></script>\n  <script src=\"https://js-nocaptcha.jd.com/statics/js/main.min.js\"></script>\n  </body>", _0x37e602);

  let _0x1041fb = 0;

  do {
    _0x1041fb += 1;
    await $.wait(1000);

    try {
      if (_0x263d5d.window.JAB) {
        const _0x474dd3 = {
          bizId: "jdjiabao",
          initCaptcha: false
        };
        $.jab = new _0x263d5d.window.JAB(_0x474dd3);
      } else {
        $.jab = undefined;
      }

      $.signWaap = _0x263d5d.window.signWaap;
    } catch (_0x46d6cb) {}
  } while (!$.signWaap && _0x1041fb < 4);
}

function _0x36a650(_0x993232) {
  return new Promise(_0x2447f0 => {
    const _0x7f9e9d = {
      url: _0x993232,
      timeout: 10000
    };
    $.get(_0x7f9e9d, async (_0xef2b0, _0x4b58e2, _0x2449e1) => {
      let _0x184fc5 = null;

      try {
        if (_0xef2b0) {
          console.log("⚠️网络请求失败");
        } else {
          _0x184fc5 = _0x2449e1;
        }
      } catch (_0xaa0b8f) {
        $.logErr(_0xaa0b8f, _0x4b58e2);
      } finally {
        _0x2447f0(_0x184fc5);
      }
    });
  });
}

function _0x2c954d() {
  return new Promise(_0x3265d5 => {
    _0x51433d && (_0x56bc8e += "【账号" + $.index + "】" + ($.nickName || $.UserName) + "\n" + _0x51433d + ($.index !== _0x435d38.length ? "\n\n" : "\n\n"));

    _0x3265d5();
  });
}

function _0x214754(_0x199035, _0x430cec, _0x2a7dee = "", _0x5df97f = Date.now()) {
  const _0xa43593 = {
    Host: "api.m.jd.com",
    Accept: "application/json",
    "Content-Type": "application/x-www-form-urlencoded",
    Origin: "https://msitepp-fm.jd.com",
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    "User-Agent": $.UA,
    Referer: "https://msitepp-fm.jd.com/",
    "Accept-Encoding": "gzip, deflate, br",
    Cookie: _0x3d9552
  };
  return {
    url: _0x4c3301 + "api?appid=siteppM&functionId=" + _0x199035 + "&forcebot=&t=" + _0x5df97f,
    body: "body=" + encodeURIComponent(JSON.stringify(_0x430cec)) + "&h5st" + _0x2a7dee,
    headers: _0xa43593
  };
}

function _0x5265ef() {
  return new Promise(_0x482135 => {
    const _0x4b72ba = {
      Cookie: _0x3d9552,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x55258e = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x4b72ba,
      timeout: 10000
    };
    $.get(_0x55258e, (_0xa2554f, _0x562686, _0x16f61b) => {
      try {
        if (_0x16f61b) {
          _0x16f61b = JSON.parse(_0x16f61b);

          if (!(_0x16f61b.islogin === "1")) {
            _0x16f61b.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x39f7f4) {
        console.log(_0x39f7f4);
      } finally {
        _0x482135();
      }
    });
  });
}

function _0x1dff19(_0x3897b0) {
  try {
    if (typeof JSON.parse(_0x3897b0) == "object") {
      return true;
    }
  } catch (_0x89ec28) {
    console.log(_0x89ec28);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}

function _0x3bf1a3(_0x59f98c) {
  if (typeof _0x59f98c == "string") {
    try {
      return JSON.parse(_0x59f98c);
    } catch (_0x5b98b) {
      console.log(_0x5b98b);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
