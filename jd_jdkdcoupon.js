/*
京东快递优惠券领券

[task_local]
#京东快递领卷
5 10 * * * jd_jdkdcoupon.js, tag=京东快递领卷, enabled=true

*/
let lnrun = 0;


const $ = new Env('快递领卷');
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let cookiesArr = [],
    cookie = "";

const CryptoJS = require("crypto-js");

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x521fad => {
    cookiesArr.push(jdCookieNode[_0x521fad]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x27a2c8 => _0x27a2c8.cookie)].filter(_0x4b58c2 => !!_0x4b58c2);

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let _0x522082 = 0; _0x522082 < cookiesArr.length; _0x522082++) {
    if (cookiesArr[_0x522082]) {
      cookie = cookiesArr[_0x522082];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x522082 + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      await TotalBean();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });

        if ($.isNode()) {}

        continue;
      }

      let _0x33be8a = getCookieStr(CryptoJS.MD5($.UserName).toString());

      await getURL(_0x33be8a);
      await $.wait(1000);
      await sendCoupon();
      await $.wait(1000);
    }
  }
})().catch(_0x4cd920 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x4cd920 + "!", "");
}).finally(() => {
  $.done();
});

function TotalBean() {
  return new Promise(async _0x641e7f => {
    const _0x4534f2 = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Mobile/15E148 Safari/604.1"
      }
    };
    $.post(_0x4534f2, (_0x53540a, _0x1c68ee, _0x286421) => {
      try {
        if (_0x53540a) console.log($.name + " API请求失败，请检查网路重试");else {
          if (_0x286421) {
            _0x286421 = JSON.parse(_0x286421);

            if (_0x286421.retcode === 13) {
              $.isLogin = false;
              return;
            }

            if (_0x286421.retcode === 0) {
              $.nickName = _0x286421.base && _0x286421.base.nickname || $.UserName;
            } else $.nickName = $.UserName;
          } else console.log("京东服务器返回空数据");
        }
      } catch (_0x5d0ff0) {
        $.logErr(_0x5d0ff0, _0x1c68ee);
      } finally {
        _0x641e7f();
      }
    });
  });
}

function sendCoupon() {
  let _0xf941ce = "[{\n    \"pin\": \"$cooMrdGatewayUid$\",\n    \"clientIp\": \"$cooMrdGatewayIp$\",\n    \"pageId\": \"c9e0da25b96d49b6a8a890a9c25fb308\",\n    \"couponKey\": \"WL_BA#xtz6fu1\"\n  }]",
      _0x51f87d = {
    "url": "https://lop-proxy.jd.com/coupon/sendCoupon",
    "body": _0xf941ce,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json;charset=utf-8",
      "appparams": "{\"appid\":\"158\",\"ticket_type\":\"m\"}",
      "clientinfo": "{\"appName\":\"tjg\",\"client\":\"m\"}",
      "lop-dn": "tjg-online.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "origin": "https://t618.jd.com",
      "Cookie": cookie,
      "Referer": "https://t618.jd.com/",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Safari/604.1"
    }
  };
  return new Promise(async _0x355812 => {
    $.post(_0x51f87d, async (_0x41e961, _0x52fa6e, _0x5ea63d) => {
      try {
        _0x41e961 ? console.log($.name + " API请求失败，请检查网路重试") : _0x5ea63d ? (_0x5ea63d = JSON.parse(_0x5ea63d), console.log("领取成功，请前往我的-优惠券查看")) : console.log("京东服务器返回空数据");
      } catch (_0x40922e) {
        $.logErr(_0x40922e, _0x52fa6e);
      } finally {
        _0x355812(_0x5ea63d);
      }
    });
  });
}

function uranus(_0x23192a) {
  $.UUID = getUUID("xxxxxxxxxx");
  $.PUID = getUUID("xxxxxxxxxxxx");

  let _0x209131 = "{\n      \"pin_sid\": \"\",\n      \"report_ts\": \"" + $.UUID + "+368\",\n      \"scr\": \"428x926\",\n      \"token\": \"\",\n      \"ut\": \"s\",\n      \"clt\": \"web\",\n      \"jvr\": \"3.0.12\",\n      \"std\": \"JA2023_2734378\",\n      \"tpc\": \"traffic-jdm.pv\",\n      \"uuid\": " + ($.UUID + "" + $.PUID) + ",\n      \"cli\": \"M-M\",\n      \"biz\": \"mba\",\n      \"mba_muid\": " + ($.UUID + "" + $.PUID) + ",\n      \"mba_sid\": \"\",\n      \"proj_id\": \"3\",\n      \"reserved3\": \"\",\n      \"osp\": \"iphone\",\n      \"data\": [{\n        \"ctm\": \"\",\n        \"ctp\": \"https://t618.jd.com/index.html\",\n        \"par\": \"pageId=c9e0da25b96d49b6a8a890a9c25fb308&channelParam=tjg9\",\n        \"usc\": \"direct\",\n        \"umd\": \"none\",\n        \"utr\": \"-\",\n        \"ucp\": \"-\",\n        \"jdv\": \"\",\n        \"vts\": 1,\n        \"seq\": 1,\n        \"browser_ver\": \"604.1\",\n        \"browser\": \"Safari\",\n        \"fst\": " + $.UUID + ",\n        \"pst\": " + $.UUID + ",\n        \"vct\": " + $.UUID + ",\n        \"clr\": \"24-bit\",\n        \"bsl\": \"zh-cn\",\n        \"bsc\": \"UTF-8\",\n        \"jav\": 0,\n        \"flv\": \"\",\n        \"tit\": \"\",\n        \"hash\": \"\",\n        \"tad\": \"1\",\n        \"dataver\": \"0.1\",\n        \"is_wq\": 0,\n        \"chan_type\": 3,\n        \"typ\": \"pv\",\n        \"lgt\": \"pv\",\n        \"mba_seq\": \"1\",\n        \"mba_finger\": \"\",\n        \"fpstime\": 0,\n        \"fpftime\": 12,\n        \"unpl\": \"\",\n        \"mjds\": \"\"\n      }]\n    }",
      _0x537a3c = {
    "url": "https://uranus.jd.com/log/m?std=JA2023_2734378",
    "body": _0x209131,
    "headers": {
      "content-type": "text/plain",
      "Accept": "application/json, text/plain, */*",
      "appparams": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "origin": "https://t618.jd.com",
      "Cookie": cookie + ";" + _0x23192a,
      "Referer": "https://t618.jd.com/",
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Safari/604.1"
    }
  };

  return new Promise(async _0x2e917b => {
    $.post(_0x537a3c, async (_0x335010, _0x253016, _0x61d6b5) => {
      try {
        _0x335010 ? console.log($.name + " API请求失败，请检查网路重试") : _0x61d6b5 ? _0x61d6b5 = JSON.parse(_0x61d6b5) : console.log("京东服务器返回空数据");
      } catch (_0x5c897f) {
        $.logErr(_0x5c897f, _0x253016);
      } finally {
        _0x2e917b(_0x61d6b5);
      }
    });
  });
}

function getURL(_0x59f42f) {
  return new Promise(async _0x4ac342 => {
    const _0x80f7ed = {
      "url": "https://t618.jd.com/index.html?pageId=c9e0da25b96d49b6a8a890a9c25fb308&channelParam=tjg9",
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.3.1 Mobile/15E148 Safari/604.1",
        "Cookie": cookie + ";" + _0x59f42f
      }
    };
    $.get(_0x80f7ed, (_0x2a56f7, _0x26e73f, _0x4504e8) => {
      try {
        if (_0x2a56f7) {} else {
          if (_0x4504e8) {} else console.log("京东服务器返回空数据");
        }
      } catch (_0x3974d2) {
        $.logErr(_0x3974d2, _0x26e73f);
      } finally {
        _0x4ac342();
      }
    });
  });
}

function getCookieStr(_0x28f5d5) {
  let _0x44191e = 123,
      _0x24238b = _0x28f5d5.substr(0, 22),
      _0x406142 = _0x28f5d5.substr(0, 10),
      _0x47c7d6 = 1,
      _0x357a1e = [_0x44191e, _0x24238b, _0x406142, _0x406142, _0x406142, _0x47c7d6].join("."),
      _0x375867 = "__jda=" + _0x357a1e + ";";

  return _0x375867;
}

function getUUID(_0x3dcb63 = "xxxxxxxxxxxxxxxxxxxxxx", _0x926b69 = 0) {
  return _0x3dcb63.replace(/[xy]/g, function (_0x5f06de) {
    var _0x40a49c = 16 * Math.random() | 0,
        _0x5c8bb8 = "x" == _0x5f06de ? _0x40a49c : 3 & _0x40a49c | 8;

    return uuid = _0x926b69 ? _0x5c8bb8.toString(36).toUpperCase() : _0x5c8bb8.toString(36), uuid;
  });
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
