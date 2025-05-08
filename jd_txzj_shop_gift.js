/*
活动名称：店铺礼包 · 收藏大师
活动链接：https://txzj-isv.isvjcloud.com/shop_gift?code=<活动id>
环境变量：jd_shop_gift_activityUrl // 活动链接

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('店铺礼包（收藏大师）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_shop_gift_activityUrl) activityUrl = process.env.jd_shop_gift_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(I1lliIII => {
    cookiesArr.push(jdCookieNode[I1lliIII]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(Iliiiii1 => Iliiiii1.cookie)].filter(li11Iiil => !!li11Iiil);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "code");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
} else {
  console.log("请填写活动链接");
  return;
}
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
  for (let liIilIl1 = 0; liIilIl1 < cookiesArr.length; liIilIl1++) {
    if (cookiesArr[liIilIl1]) {
      cookie = cookiesArr[liIilIl1];
      originCookie = cookiesArr[liIilIl1];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = liIilIl1 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await shop_gift();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(l11i111i => {
  $.log("", " " + $.name + ", 失败! 原因: " + l11i111i + "!", "");
}).finally(() => {
  $.done();
});
async function shop_gift() {
  $.errs = false;
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if (activityId) {
    await jd_store_user_info();
    if ($.hasEnd === true) return;
    await shop_giftx();
    await send_prize();
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function jd_store_user_info() {
  return new Promise(iiI11IlI => {
    let llIiI1ii = "token=" + $.token;
    $.post(taskPostUrl("/front/jd_store_user_info", llIiI1ii), async (iIi11111, I1il1I1i, lIlllI1I) => {
      try {
        if (iIi11111) {
          console.log("" + JSON.stringify(iIi11111));
          console.log($.name + " jd_store_user_info API请求失败，请检查网路重试");
        } else {
          lIlllI1I = JSON.parse(lIlllI1I);
          if (lIlllI1I && lIlllI1I.code === "success") {} else {
            console.log("授权失败：" + lIlllI1I.msg);
            $.hasEnd = true;
          }
          I1il1I1i.status == 200 && refreshToken(I1il1I1i);
        }
      } catch (ilIiIilI) {
        $.logErr(ilIiIilI, I1il1I1i);
      } finally {
        iiI11IlI();
      }
    });
  });
}
function send_prize() {
  return new Promise(I1ll1i1l => {
    let lilIill1 = "code=" + $.code;
    $.post(taskPostUrl("/shop_gift/send_prize", lilIill1), async (Ili1Illi, ll1l1lii, iii1ill1) => {
      try {
        if (Ili1Illi) {
          console.log("" + JSON.stringify(Ili1Illi));
          console.log($.name + " send_prize API请求失败，请检查网路重试");
        } else {
          iii1ill1 = JSON.parse(iii1ill1);
          if (iii1ill1 && iii1ill1.code === "success") console.log("领取成功");else {
            console.log("领取失败：" + iii1ill1.msg);
            Ili1Illi = iii1ill1.msg;
            for (let liiiill1 of ["不足", "部分会员", "火爆", "上限", "已领取", "未开始"]) {
              if (Ili1Illi.includes(liiiill1)) {
                $.errs = true;
                break;
              }
            }
          }
          ll1l1lii.status == 200 && refreshToken(ll1l1lii);
        }
      } catch (IlliilIi) {
        $.logErr(IlliilIi, ll1l1lii);
      } finally {
        I1ll1i1l();
      }
    });
  });
}
function shop_giftx() {
  return new Promise(llIilIIi => {
    const ilIlIiiI = {
      "url": domains + "/shop_gift?code=" + activityId + "&token=" + $.token,
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
    $.get(ilIlIiiI, async (Il1IiIl1, Iil11l1I, IIIl1Il1) => {
      try {
        if (Il1IiIl1) {
          console.log("" + JSON.stringify(Il1IiIl1));
          console.log($.name + " shop_giftz API请求失败，请检查网路重试");
        } else {
          IIIl1Il1 = IIIl1Il1;
          if (IIIl1Il1) {
            let il1l1ii = IIIl1Il1.match(/(活动已结束)/) && IIIl1Il1.match(/(活动已结束)/)[1] || IIIl1Il1.match(/(哎哟，当前活动尚未开始噢！)/) && IIIl1Il1.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            il1l1ii && ($.activityEnd = true, console.log("活动已结束或者未开始"));
            if ($.index === 1) {
              let li111ii = IIIl1Il1.match(/data-code="(.+)">/);
              li111ii && ($.code = li111ii[1], console.log("领取ID：" + $.code));
            }
          }
        }
      } catch (i1IIiI) {
        $.logErr(i1IIiI, Iil11l1I);
      } finally {
        llIilIIi();
      }
    });
  });
}
function getShopOpenCardInfo(i1ll1li1) {
  let iI1l1I1l = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(i1ll1li1)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": $.UA,
      "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.joinVenderId + "&channel=801&returnUrl=" + encodeURIComponent(activityUrl),
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(ll1l1li1 => {
    $.get(iI1l1I1l, (iIl1lIiI, i1lIiIi, iIIlIiil) => {
      try {
        if (iIl1lIiI) iIl1lIiI === "Response code 403 (Forbidden)" && ($.err = true, console.log(String(iIl1lIiI)));else {
          res = JSON.parse(iIIlIiil);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (l11il1iI) {
        console.log(l11il1iI);
      } finally {
        ll1l1li1();
      }
    });
  });
}
function taskPostUrl(i1I1I11l, iIii1lii) {
  return {
    "url": "" + domains + i1I1I11l,
    "body": iIii1lii,
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
function refreshToken(iiIIIIl) {
  if (iiIIIIl) {
    if (iiIIIIl.headers["set-cookie"]) {
      cookie = "";
      for (let Ili1iIll of iiIIIIl.headers["set-cookie"]) {
        lz_cookie[Ili1iIll.split(";")[0].substr(0, Ili1iIll.split(";")[0].indexOf("="))] = Ili1iIll.split(";")[0].substr(Ili1iIll.split(";")[0].indexOf("=") + 1);
      }
      for (const iiiiiliI of Object.keys(lz_cookie)) {
        cookie += iiiiiliI + "=" + lz_cookie[iiiiiliI] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(llllii11) {
  llllii11 = llllii11 || 32;
  let I1I1Iill = "abcdef0123456789",
    ililIil = I1I1Iill.length,
    lIIIl111 = "";
  for (i = 0; i < llllii11; i++) lIIIl111 += I1I1Iill.charAt(Math.floor(Math.random() * ililIil));
  return lIIIl111;
}
function safeGet(I1llI1lI) {
  if (!I1llI1lI) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(I1llI1lI) == "object") {
      return true;
    }
  } catch (illl1l1I) {
    return console.log(illl1l1I), false;
  }
}
function jsonParse(l1l1I) {
  if (typeof l1l1I == "string") try {
    return JSON.parse(l1l1I);
  } catch (iIllliil) {
    return console.log(iIllliil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function getQueryString(il11ilIl, Il1llil) {
  let iil1lIi = new RegExp("(^|[&?])" + Il1llil + "=([^&]*)(&|$)"),
    ll1liil1 = il11ilIl.match(iil1lIi);
  if (ll1liil1 != null) return decodeURIComponent(ll1liil1[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IllIlil1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IIii1lil = "";
    if ($.shopactivityId) IIii1lil = ",\"activityId\":" + $.shopactivityId;
    const llIl1Ill = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IIii1lil + ",\"channel\":406}",
      IIilIlli = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(llIl1Ill)
      },
      I1I1i1i = await getH5st("8adfb", IIilIlli),
      I1ii1Iil = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + llIl1Ill + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1I1i1i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I1ii1Iil, async (iiI11IIi, IlIiIlIi, lll1iII1) => {
      try {
        lll1iII1 = lll1iII1 && lll1iII1.match(/jsonp_.*?\((.*?)\);/) && lll1iII1.match(/jsonp_.*?\((.*?)\);/)[1] || lll1iII1;
        let l1I1iIIi = $.toObj(lll1iII1, lll1iII1);
        if (l1I1iIIi && typeof l1I1iIIi == "object") {
          if (l1I1iIIi && l1I1iIIi.success === true) {
            console.log(l1I1iIIi.message);
            $.errorJoinShop = l1I1iIIi.message;
            if (l1I1iIIi.result && l1I1iIIi.result.giftInfo) for (let l1lIiIll of l1I1iIIi.result.giftInfo.giftList) {
              console.log("入会获得: " + l1lIiIll.discountString + l1lIiIll.prizeName + l1lIiIll.secondLineDesc);
            }
            console.log("");
          } else l1I1iIIi && typeof l1I1iIIi == "object" && l1I1iIIi.message ? ($.errorJoinShop = l1I1iIIi.message, console.log("" + (l1I1iIIi.message || ""))) : console.log(lll1iII1);
        } else console.log(lll1iII1);
      } catch (Il1i1lli) {
        $.logErr(Il1i1lli, IlIiIlIi);
      } finally {
        IllIlil1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async iliIii1I => {
    let I111ii = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const iIIiIiI1 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I111ii)
      },
      I1i11IlI = await getH5st("ef79a", iIIiIiI1),
      lii111Il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I111ii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1i11IlI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lii111Il, async (iIIII11l, Ill11111, IlIIllii) => {
      try {
        IlIIllii = IlIIllii && IlIIllii.match(/jsonp_.*?\((.*?)\);/) && IlIIllii.match(/jsonp_.*?\((.*?)\);/)[1] || IlIIllii;
        let l1ll1Ii1 = $.toObj(IlIIllii, IlIIllii);
        if (l1ll1Ii1 && typeof l1ll1Ii1 == "object") {
          if (l1ll1Ii1 && l1ll1Ii1.success == true) {
            console.log("\n去加入店铺会员：" + (l1ll1Ii1.result.shopMemberCardInfo.venderCardName || ""));
            $.shopactivityId = l1ll1Ii1.result.interestsRuleList && l1ll1Ii1.result.interestsRuleList[0] && l1ll1Ii1.result.interestsRuleList[0].interestsInfo && l1ll1Ii1.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else console.log(IlIIllii);
      } catch (il11lill) {
        $.logErr(il11lill, Ill11111);
      } finally {
        iliIii1I();
      }
    });
  });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
