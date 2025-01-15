/*
活动名称：关注商品有礼 · 收藏大师
活动链接：https://txzj-isv.isvjcloud.com/collect_item/home?a=<活动id>
环境变量：jd_collect_item_activityUrl // 活动链接

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('关注商品有礼（收藏大师）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_collect_item_activityUrl) activityUrl = process.env.jd_collect_item_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(lll1II1I => {
    cookiesArr.push(jdCookieNode[lll1II1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(iiiII1I1 => iiiII1I1.cookie)].filter(lill1I => !!lill1I);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
activityUrl ? (activityId = getQueryString("" + activityUrl, "a"), $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1]) : console.log("请填写活动链接");
let domains = "https://" + $.domain;
!(async () => {
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let lIlIlii = 0; lIlIlii < cookiesArr.length; lIlIlii++) {
    if (cookiesArr[lIlIlii]) {
      cookie = cookiesArr[lIlIlii];
      originCookie = cookiesArr[lIlIlii];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = lIlIlii + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      await getUA();
      await collect_item();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(Iiii11Il => {
  $.log("", " " + $.name + ", 失败! 原因: " + Iiii11Il + "!", "");
}).finally(() => {
  $.done();
});
async function collect_item() {
  $.errs = false;
  $.token = await getToken(originCookie, domains);
  $.grabStop = false;
  $.getPrize = false;
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if (activityId) {
    await jd_store_user_info();
    if ($.hasEnd === true) return;
    await collect_itemx();
    if ($.activityEnd) return;
    for (let l1IIllil = 0; l1IIllil < 20; l1IIllil++) {
      await receive_prize();
      if ($.getPrize || $.activityEnd || $.grabStop) break;
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function jd_store_user_info() {
  return new Promise(liiiiIii => {
    let Il111il1 = "token=" + $.token;
    $.post(taskPostUrl("/front/jd_store_user_info", Il111il1), async (Ii1IilII, iiiillil, II11illl) => {
      try {
        if (Ii1IilII) {
          console.log("" + JSON.stringify(Ii1IilII));
          console.log($.name + " jd_store_user_info API请求失败，请检查网路重试");
        } else {
          II11illl = JSON.parse(II11illl);
          if (II11illl && II11illl.code === "success") {} else {
            console.log("授权失败：" + II11illl.msg);
            $.hasEnd = true;
          }
          iiiillil.status == 200 && refreshToken(iiiillil);
        }
      } catch (IllI1lil) {
        $.logErr(IllI1lil, iiiillil);
      } finally {
        liiiiIii();
      }
    });
  });
}
function receive_prize() {
  return new Promise(iI1II1II => {
    let i1II1lIi = "pid=" + activityId;
    $.post(taskPostUrl("/collect_item/receive_prize", i1II1lIi), async (iIil1Il1, Il1IiliI, IliIIlIi) => {
      try {
        if (iIil1Il1) {
          console.log("" + JSON.stringify(iIil1Il1));
          console.log($.name + " receive_prize API请求失败，请检查网路重试");
        } else {
          IliIIlIi = JSON.parse(IliIIlIi);
          if (IliIIlIi && IliIIlIi.code === "success") {
            $.getPrize = true;
            if (IliIIlIi.data.prize_title) {
              switch (IliIIlIi.data.prize_title.type) {
                case "coupon":
                  console.log("🗑️ 优惠券");
                  break;
                case "bean":
                  console.log("🎉 " + IliIIlIi.data.prize_title.prize_title + " 🐶");
                  break;
                case "integral":
                  console.log("🗑️ " + (IliIIlIi.data.prize_title.prize_title || IliIIlIi.data.prize_title.once_num) + " 🎟️");
                  break;
                case "goods":
                  console.log("🎉 实物" + IliIIlIi.data.prize_title.prize_name);
                  break;
                default:
                  console.log(IliIIlIi.msg);
                  break;
              }
            } else console.log(IliIIlIi.msg);
          } else {
            console.log("领取失败：" + IliIIlIi.msg);
            iIil1Il1 = IliIIlIi.msg;
            for (let IiiilIli of ["不足", "部分会员", "已参加", "上限", "已领取", "未开始"]) {
              if (iIil1Il1.includes(IiiilIli)) {
                $.grabStop = true;
                break;
              }
            }
            for (let i1ii1liI of ["num_end"]) {
              if (iIil1Il1.includes(i1ii1liI)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          Il1IiliI.status == 200 && refreshToken(Il1IiliI);
        }
      } catch (liiIiI1) {
        $.logErr(liiIiI1, Il1IiliI);
      } finally {
        iI1II1II();
      }
    });
  });
}
function collect_itemx() {
  return new Promise(iil11ll => {
    const lIlIiiiI = {
      "url": domains + "/collect_item/home?a=" + activityId + "&token=" + $.token,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": $.domain,
        "Referer": activityUrl,
        "User-Agent": $.UA
      }
    };
    $.get(lIlIiiiI, async (lIill111, Illi1i1, lllIilI1) => {
      try {
        if (lIill111) {
          console.log("" + JSON.stringify(lIill111));
          console.log($.name + " collect_itemz API请求失败，请检查网路重试");
        } else {
          lllIilI1 = lllIilI1;
          if (lllIilI1) {
            let llIi11iI = lllIilI1.match(/(活动已结束)/) && lllIilI1.match(/(活动已结束)/)[1] || lllIilI1.match(/(哎哟，当前活动尚未开始噢！)/) && lllIilI1.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            llIi11iI && ($.activityEnd = true, console.log("活动已结束或者未开始"));
          }
        }
      } catch (IiIIlli) {
        $.logErr(IiIIlli, Illi1i1);
      } finally {
        iil11ll();
      }
    });
  });
}
function taskPostUrl(Iili1ll, I1llili) {
  return {
    "url": "" + domains + Iili1ll,
    "body": I1llili,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie,
      "Host": $.domain,
      "Origin": domains,
      "Referer": activityUrl,
      "User-Agent": $.UA
    }
  };
}
function refreshToken(iIi1IIi) {
  if (iIi1IIi) {
    if (iIi1IIi.headers["set-cookie"]) {
      cookie = "";
      for (let iliiII1 of iIi1IIi.headers["set-cookie"]) {
        lz_cookie[iliiII1.split(";")[0].substr(0, iliiII1.split(";")[0].indexOf("="))] = iliiII1.split(";")[0].substr(iliiII1.split(";")[0].indexOf("=") + 1);
      }
      for (const IIiilIIi of Object.keys(lz_cookie)) {
        cookie += IIiilIIi + "=" + lz_cookie[IIiilIIi] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(iiII1lI1) {
  iiII1lI1 = iiII1lI1 || 32;
  let ii11iIil = "abcdef0123456789",
    li1ilIll = ii11iIil.length,
    liii1iii = "";
  for (i = 0; i < iiII1lI1; i++) liii1iii += ii11iIil.charAt(Math.floor(Math.random() * li1ilIll));
  return liii1iii;
}
function safeGet(lIlI1IiI) {
  if (!lIlI1IiI) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(lIlI1IiI) == "object") return true;
  } catch (Il1lIII1) {
    return console.log(Il1lIII1), false;
  }
}
function jsonParse(il1I11) {
  if (typeof il1I11 == "string") {
    try {
      return JSON.parse(il1I11);
    } catch (ii11IIII) {
      return console.log(ii11IIII), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function random(lii1liIi, IlliIlil) {
  return Math.floor(Math.random() * (IlliIlil - lii1liIi)) + lii1liIi;
}
function getQueryString(IlIilI1, i1IiIil) {
  let IIili1ii = new RegExp("(^|[&?])" + i1IiIil + "=([^&]*)(&|$)"),
    l1Ii1l1i = IlIilI1.match(IIili1ii);
  if (l1Ii1l1i != null) return decodeURIComponent(l1Ii1l1i[2]);
  return "";
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
