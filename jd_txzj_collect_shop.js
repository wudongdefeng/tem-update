/*
活动名称：关注店铺有礼 · 收藏大师
活动链接：https://txzj-isv.isvjcloud.com/collect_shop/home?a=<活动id>
环境变量：jd_collect_shop_activityUrl // 活动链接

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('关注店铺有礼（收藏大师）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_collect_shop_activityUrl) activityUrl = process.env.jd_collect_shop_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(ilI1IIi1 => {
    cookiesArr.push(jdCookieNode[ilI1IIi1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(iIl1i11i => iIl1i11i.cookie)].filter(I1liI11l => !!I1liI11l);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "a");
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
  for (let lill1i = 0; lill1i < cookiesArr.length; lill1i++) {
    if (cookiesArr[lill1i]) {
      cookie = cookiesArr[lill1i];
      originCookie = cookiesArr[lill1i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = lill1i + 1;
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
      await collect_shop();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(I1ilI1il => {
  $.log("", " " + $.name + ", 失败! 原因: " + I1ilI1il + "!", "");
}).finally(() => {
  $.done();
});
async function collect_shop() {
  $.errs = false;
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if (activityId) {
    await jd_store_user_info();
    if ($.hasEnd === true) {
      return;
    }
    await collect_shopx();
    if ($.activityEnd) return;
    await receive_prize();
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
function jd_store_user_info() {
  return new Promise(IIiI1iil => {
    let i111I1l1 = "token=" + $.token;
    $.post(taskPostUrl("/front/jd_store_user_info", i111I1l1), async (IiI1liIl, ii1li1ll, li1I1l1i) => {
      try {
        if (IiI1liIl) {
          console.log("" + JSON.stringify(IiI1liIl));
          console.log($.name + " jd_store_user_info API请求失败，请检查网路重试");
        } else {
          li1I1l1i = JSON.parse(li1I1l1i);
          if (li1I1l1i && li1I1l1i.code === "success") {} else {
            console.log("授权失败：" + li1I1l1i.msg);
            $.hasEnd = true;
          }
          ii1li1ll.status == 200 && refreshToken(ii1li1ll);
        }
      } catch (il1l1ll1) {
        $.logErr(il1l1ll1, ii1li1ll);
      } finally {
        IIiI1iil();
      }
    });
  });
}
function receive_prize() {
  return new Promise(IIllilI => {
    let II1Ii1i = "pid=" + activityId;
    $.post(taskPostUrl("/collect_shop/receive_prize", II1Ii1i), async (li1illi, l1IliII1, lii1llil) => {
      try {
        if (li1illi) {
          console.log("" + JSON.stringify(li1illi));
          console.log($.name + " receive_prize API请求失败，请检查网路重试");
        } else {
          lii1llil = JSON.parse(lii1llil);
          if (lii1llil && lii1llil.code === "success") {
            if (lii1llil.data.prize_title) {
              switch (lii1llil.data.prize_title.type) {
                case "coupon":
                  console.log("🗑️ 优惠券");
                  break;
                case "bean":
                  console.log("🎉 " + lii1llil.data.prize_title.prize_title + " 🐶");
                  break;
                case "integral":
                  console.log("🗑️ " + (lii1llil.data.prize_title.prize_title || lii1llil.data.prize_title.once_num) + " 🎟️");
                  break;
                case "goods":
                  console.log("🎉 实物" + lii1llil.data.prize_title.prize_name);
                  break;
                default:
                  console.log(lii1llil.msg);
                  break;
              }
            } else console.log("类型：" + lii1llil.data.prize_title.type);
          } else {
            console.log("领取失败：" + lii1llil.msg);
            li1illi = lii1llil.msg;
            for (let IiII1l11 of ["不足", "部分会员", "火爆", "上限", "已领取", "未开始"]) {
              if (li1illi.includes(IiII1l11)) {
                $.errs = true;
                break;
              }
            }
          }
          l1IliII1.status == 200 && refreshToken(l1IliII1);
        }
      } catch (ll1lIi1i) {
        $.logErr(ll1lIi1i, l1IliII1);
      } finally {
        IIllilI();
      }
    });
  });
}
function collect_shopx() {
  return new Promise(IlllIli => {
    const liilIllI = {
      "url": domains + "/collect_shop/home?a=" + activityId + "&token=" + $.token,
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
    $.get(liilIllI, async (IIl1iiIl, IillII1I, i1liIiIl) => {
      try {
        if (IIl1iiIl) {
          console.log("" + JSON.stringify(IIl1iiIl));
          console.log($.name + " collect_shopz API请求失败，请检查网路重试");
        } else {
          i1liIiIl = i1liIiIl;
          if (i1liIiIl) {
            let liI1lII = i1liIiIl.match(/(活动已结束)/) && i1liIiIl.match(/(活动已结束)/)[1] || i1liIiIl.match(/(哎哟，当前活动尚未开始噢！)/) && i1liIiIl.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            liI1lII && ($.activityEnd = true, console.log("活动已结束或者未开始"));
          }
        }
      } catch (IIill11i) {
        $.logErr(IIill11i, IillII1I);
      } finally {
        IlllIli();
      }
    });
  });
}
function getShopOpenCardInfo(i111li1I) {
  let liIiI11i = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(i111li1I)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(i1ii1llI => {
    $.get(liIiI11i, (li1I1i1l, i1I1II1i, IlIllIIl) => {
      try {
        if (li1I1i1l) {
          if (li1I1i1l === "Response code 403 (Forbidden)") {
            $.err = true;
            console.log(String(li1I1i1l));
          }
        } else {
          res = JSON.parse(IlIllIIl);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (i1llIIll) {
        console.log(i1llIIll);
      } finally {
        i1ii1llI();
      }
    });
  });
}
function taskPostUrl(iI1iiil, I1111I) {
  return {
    "url": "" + domains + iI1iiil,
    "body": I1111I,
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
function refreshToken(i1IlIl1I) {
  if (i1IlIl1I) {
    if (i1IlIl1I.headers["set-cookie"]) {
      cookie = "";
      for (let IIill111 of i1IlIl1I.headers["set-cookie"]) {
        lz_cookie[IIill111.split(";")[0].substr(0, IIill111.split(";")[0].indexOf("="))] = IIill111.split(";")[0].substr(IIill111.split(";")[0].indexOf("=") + 1);
      }
      for (const l1I1I1iI of Object.keys(lz_cookie)) {
        cookie += l1I1I1iI + "=" + lz_cookie[l1I1I1iI] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(lIlIiIii) {
  lIlIiIii = lIlIiIii || 32;
  let iiIil11 = "abcdef0123456789",
    I11li1Il = iiIil11.length,
    i1II1IIl = "";
  for (i = 0; i < lIlIiIii; i++) i1II1IIl += iiIil11.charAt(Math.floor(Math.random() * I11li1Il));
  return i1II1IIl;
}
function safeGet(ilIillli) {
  try {
    if (typeof JSON.parse(ilIillli) == "object") {
      return true;
    }
  } catch (I1i1lI1I) {
    return console.log(I1i1lI1I), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function jsonParse(iliiiIii) {
  if (typeof iliiiIii == "string") try {
    return JSON.parse(iliiiIii);
  } catch (Il11lII1) {
    return console.log(Il11lII1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function getQueryString(i1111I1l, i1IIlilI) {
  let l1lll1ll = new RegExp("(^|[&?])" + i1IIlilI + "=([^&]*)(&|$)"),
    iilliI1 = i1111I1l.match(l1lll1ll);
  if (iilliI1 != null) {
    return decodeURIComponent(iilliI1[2]);
  }
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async illlii1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let illiIiIl = "";
    if ($.shopactivityId) illiIiIl = ",\"activityId\":" + $.shopactivityId;
    const iI1liilI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + illiIiIl + ",\"channel\":406}",
      l1ilIli1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iI1liilI)
      },
      lIiil1lI = await getH5st("8adfb", l1ilIli1),
      i1Il1lI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iI1liilI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIiil1lI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1Il1lI, async (lliIIiiI, lI1lIiil, IilliIIi) => {
      try {
        IilliIIi = IilliIIi && IilliIIi.match(/jsonp_.*?\((.*?)\);/) && IilliIIi.match(/jsonp_.*?\((.*?)\);/)[1] || IilliIIi;
        let llI11Il1 = $.toObj(IilliIIi, IilliIIi);
        if (llI11Il1 && typeof llI11Il1 == "object") {
          if (llI11Il1 && llI11Il1.success === true) {
            console.log(llI11Il1.message);
            $.errorJoinShop = llI11Il1.message;
            if (llI11Il1.result && llI11Il1.result.giftInfo) for (let IIl11l1 of llI11Il1.result.giftInfo.giftList) {
              console.log("入会获得: " + IIl11l1.discountString + IIl11l1.prizeName + IIl11l1.secondLineDesc);
            }
            console.log("");
          } else llI11Il1 && typeof llI11Il1 == "object" && llI11Il1.message ? ($.errorJoinShop = llI11Il1.message, console.log("" + (llI11Il1.message || ""))) : console.log(IilliIIi);
        } else console.log(IilliIIi);
      } catch (IIllllI) {
        $.logErr(IIllllI, lI1lIiil);
      } finally {
        illlii1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async iIiill1I => {
    let Iiil11Il = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const l1Illlii = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Iiil11Il)
      },
      Iii1lil1 = await getH5st("ef79a", l1Illlii),
      lli111l1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + Iiil11Il + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(Iii1lil1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lli111l1, async (l1i1lI, iiliI1ll, lIIi1lll) => {
      try {
        lIIi1lll = lIIi1lll && lIIi1lll.match(/jsonp_.*?\((.*?)\);/) && lIIi1lll.match(/jsonp_.*?\((.*?)\);/)[1] || lIIi1lll;
        let llIiill = $.toObj(lIIi1lll, lIIi1lll);
        llIiill && typeof llIiill == "object" ? llIiill && llIiill.success == true && (console.log("\n去加入店铺会员：" + (llIiill.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = llIiill.result.interestsRuleList && llIiill.result.interestsRuleList[0] && llIiill.result.interestsRuleList[0].interestsInfo && llIiill.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(lIIi1lll);
      } catch (l11iIlIl) {
        $.logErr(l11iIlIl, iiliI1ll);
      } finally {
        iIiill1I();
      }
    });
  });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
