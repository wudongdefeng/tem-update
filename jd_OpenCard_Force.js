/*
强制入会

环境变量：VENDER_ID // venderId或vendorId的值，多个用&、@或逗号连接，但是不要混用

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('强制入会')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')

let VENDER_IDs = [];
if (process.env.VENDER_ID) {
  if (process.env.VENDER_ID.indexOf("&") > -1) VENDER_IDs = process.env.VENDER_ID.split("&");else {
    if (process.env.VENDER_ID.indexOf("@") > -1) VENDER_IDs = process.env.VENDER_ID.split("@");else process.env.VENDER_ID.indexOf(",") > -1 ? VENDER_IDs = process.env.VENDER_ID.split(",") : VENDER_IDs = [process.env.VENDER_ID];
  }
}
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(I1i11lil => {
    cookiesArr.push(jdCookieNode[I1i11lil]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(liIlIl11 => liIlIl11.cookie)].filter(Ilii1IIi => !!Ilii1IIi);
allMessage = "";
message = "";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let l1IlIlI1 = 0; l1IlIlI1 < cookiesArr.length; l1IlIlI1++) {
    cookie = cookiesArr[l1IlIlI1];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = l1IlIlI1 + 1;
      message = "";
      $.nickName = "";
      $.UserName = $.nickName || $.UserName;
      console.log("\n******开始【京东账号" + $.index + "】" + $.UserName + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      await getUA();
      await run();
    }
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(I11liIII => $.logErr(I11liIII)).finally(() => $.done());
async function run() {
  try {
    let lli1liii = new Array();
    const lIliIlI1 = VENDER_IDs;
    for (let IIIl1ll1 = 0; IIIl1ll1 < lIliIlI1.length; IIIl1ll1++) {
      $.joinVenderId = lIliIlI1[IIIl1ll1];
      ($.index = 1) ? ($.shopactivityId = "", await getshopactivityId(), lli1liii[IIIl1ll1] = $.shopactivityId) : $.shopactivityId = lli1liii[IIIl1ll1];
      $.errorJoinShop = "";
      await joinShop();
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第1次 重新开卡"), await $.wait(500), await joinShop());
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第2次 重新开卡"), await $.wait(500), await joinShop());
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("第3次 重新开卡"), await $.wait(500), await joinShop());
      $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), allMessage += "【账号" + $.index + "】" + $.UserName + "开卡失败❌ ，请重新执行脚本\n");
    }
  } catch (lllliilI) {
    console.log(lllliilI);
  }
}
function TotalBean() {
  return new Promise(async iIllliii => {
    const lilillli = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      }
    };
    $.post(lilillli, (IIIIilii, II11liIi, I1liiI1i) => {
      try {
        if (IIIIilii) {
          console.log(String(IIIIilii));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          I1liiI1i ? (I1liiI1i = JSON.parse(I1liiI1i), I1liiI1i.retcode === 0 && I1liiI1i.base && I1liiI1i.base.nickname && ($.nickName = I1liiI1i.base.nickname)) : console.log("京东服务器返回空数据");
        }
      } catch (i1l1i111) {
        $.logErr(i1l1i111);
      } finally {
        iIllliii();
      }
    });
  });
}
function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(i11ll1il) {
  i11ll1il = i11ll1il || 32;
  let li11i1ll = "abcdef0123456789",
    Ii1I11Il = li11i1ll.length,
    IIIllIi = "";
  for (i = 0; i < i11ll1il; i++) IIIllIi += li11i1ll.charAt(Math.floor(Math.random() * Ii1I11Il));
  return IIIllIi;
}
function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IililiIl => {
    $.errorJoinShop = "";
    $.openCardStatus = false;
    let Ili1li1 = "";
    if ($.shopactivityId) Ili1li1 = ",\"activityId\":" + $.shopactivityId;
    if ($.openCardStatus) {
      console.log("已经是会员了~");
      IililiIl();
    } else {
      const iIiI1ill = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Ili1li1 + ",\"channel\":406}",
        i1l1lI = {
          "appid": "jd_shop_member",
          "functionId": "bindWithVender",
          "clientVersion": "9.2.0",
          "client": "H5",
          "body": JSON.parse(iIiI1ill)
        },
        lII1lII = await getH5st("8adfb", i1l1lI),
        iilIIlIl = {
          "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + encodeURIComponent(iIiI1ill) + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lII1lII),
          "headers": {
            "Content-Type": "text/plain; Charset=UTF-8",
            "Origin": "https://api.m.jd.com",
            "Host": "api.m.jd.com",
            "accept": "*/*",
            "User-Agent": $.UA,
            "content-type": "application/x-www-form-urlencoded",
            "Cookie": cookie
          }
        };
      $.get(iilIIlIl, async (I1lII111, lillI11l, IIi1I) => {
        try {
          let Iii1liil = $.toObj(IIi1I, IIi1I);
          if (typeof Iii1liil == "object") {
            if (Iii1liil.success === true) {
              console.log(Iii1liil.message);
              $.errorJoinShop = Iii1liil.message;
              if (Iii1liil.result && Iii1liil.result.giftInfo) for (let Ii11Illi of Iii1liil.result.giftInfo.giftList) {
                console.log("入会获得：" + Ii11Illi.discountString + Ii11Illi.prizeName + Ii11Illi.secondLineDesc);
              }
            } else {
              if (typeof Iii1liil == "object" && Iii1liil.message) {
                $.errorJoinShop = Iii1liil.message;
                console.log("" + (Iii1liil.message || ""));
              } else console.log(IIi1I);
            }
          } else console.log(IIi1I);
        } catch (i1l1) {
          $.logErr(i1l1, lillI11l);
        } finally {
          IililiIl();
        }
      });
    }
  });
}
function getshopactivityId() {
  return new Promise(iili1II => {
    const lIlIllii = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22" + $.joinVenderId + "%22%2C%22channel%22%3A401%7D&client=H5&clientVersion=9.2.0&uuid=88888",
      "headers": {
        "Content-Type": "text/plain; Charset=UTF-8",
        "Origin": "https://api.m.jd.com",
        "Host": "api.m.jd.com",
        "accept": "*/*",
        "User-Agent": $.UA,
        "content-type": "application/x-www-form-urlencoded",
        "Cookie": cookie
      }
    };
    $.get(lIlIllii, async (ilIili, i1llI1l, IiilliIl) => {
      try {
        let IIIIIliI = $.toObj(IiilliIl, IiilliIl);
        typeof IIIIIliI == "object" ? IIIIIliI.success == true && (console.log("会员卡名称：" + (IIIIIliI.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = IIIIIliI.result.interestsRuleList && IIIIIliI.result.interestsRuleList[0] && IIIIIliI.result.interestsRuleList[0].interestsInfo && IIIIIliI.result.interestsRuleList[0].interestsInfo.activityId || "", $.openCardStatus = IIIIIliI.result.userInfo.openCardStatus) : console.log(IiilliIl);
      } catch (liilIili) {
        $.logErr(liilIili, i1llI1l);
      } finally {
        iili1II();
      }
    });
  });
}
function jsonParse(lI1IIili) {
  if (typeof lI1IIili == "string") try {
    return JSON.parse(lI1IIili);
  } catch (i1l1i1l1) {
    return console.log(i1l1i1l1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
