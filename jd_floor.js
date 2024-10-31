/*
活动名称：盖楼有礼 · 京耕
活动链接：https://jinggeng-isv.isvjcloud.com/ql/front/floor?id=<活动id>&user_id=<店铺id>
环境变量：jd_floor_activityUrl // 活动链接

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('盖楼有礼（京耕）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')
const jsdom = require('jsdom')

const {
  JSDOM
} = jsdom;
let lz_cookie = {},
  comments_arr = [],
  activityCookie = "";
$.activityEnd = false;
let default_drawnum = 2,
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_floor_activityUrl) activityUrl = process.env.jd_floor_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(I1llI11l => {
    cookiesArr.push(jdCookieNode[I1llI11l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(llIII1Il => llIII1Il.cookie)].filter(IilIIIiI => !!IilIIIiI);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "id");
  venderId = getQueryString("" + activityUrl, "user_id");
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
  console.log("活动入口：https://jinggeng-isv.isvjcloud.com/ql/front/floor?id=" + activityId + "&user_id=" + venderId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let ii1lI1Il = 0; ii1lI1Il < cookiesArr.length; ii1lI1Il++) {
    if (cookiesArr[ii1lI1Il]) {
      cookie = cookiesArr[ii1lI1Il];
      originCookie = cookiesArr[ii1lI1Il];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = ii1lI1Il + 1;
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
      await floor();
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(l1II1l1l => {
  $.log("", " " + $.name + ", 失败! 原因: " + l1II1l1l + "!", "");
}).finally(() => {
  $.done();
});
async function floor() {
  $.shopid = venderId;
  $.token = "";
  $.errs = false;
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.shopid) {
    await setMixNick();
    if ($.inviterNicks == "") {
      console.log("获取[inviterNick]失败！");
      return;
    }
    await floorz();
    if ($.activityEnd === true) return;
    await recordActPvUvData();
    for (let iIIIl11l = 0; iIIIl11l < $.cjcs; iIIIl11l++) {
      let iiIiIi1i = Math.floor(Math.random() * comments_arr.length + 1) - 1;
      $.pinyu = comments_arr[iiIiIi1i];
      !$.errs && (await ajaxFloor(), await $.wait(3000));
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function setMixNick() {
  return new Promise(li1Iiiil => {
    let l1Iii1I1 = "strTMMixNick=" + $.token + "&userId=" + $.shopid + "&source=01";
    $.post(taskPostUrl("/front/setMixNick", l1Iii1I1), async (ll1lllII, IIllIIli, iI1liII) => {
      try {
        ll1lllII ? (console.log("" + JSON.stringify(ll1lllII)), console.log($.name + " setMixNick API请求失败，请检查网路重试")) : (iI1liII = JSON.parse(iI1liII), iI1liII && iI1liII.succ && ($.inviterNicks = iI1liII.msg), IIllIIli.status == 200 && refreshToken(IIllIIli));
      } catch (iIilI11l) {
        $.logErr(iIilI11l, IIllIIli);
      } finally {
        li1Iiiil();
      }
    });
  });
}
function recordActPvUvData() {
  return new Promise(iI11lIlI => {
    let iiliii = "userId=" + $.shopid + "&actId=" + activityId;
    $.post(taskPostUrl("/ql/front/reportActivity/recordActPvUvData", iiliii), async (iIiiiII, iIl1lIii, Il11li1i) => {
      try {
        iIiiiII ? (console.log("" + JSON.stringify(iIiiiII)), console.log($.name + " recordActPvUvData API请求失败，请检查网路重试")) : iIl1lIii.status == 200 && refreshToken(iIl1lIii);
      } catch (iiiii1) {
        $.logErr(iiiii1, iIl1lIii);
      } finally {
        iI11lIlI();
      }
    });
  });
}
function checkTokenInSession() {
  return new Promise(iilIiII => {
    let lli1Illi = "userId=" + $.shopid + "&token=" + $.token;
    $.post(taskPostUrl("/front/checkTokenInSession", lli1Illi), async (i11III1i, iiIiiil, I1IIlI) => {
      try {
        i11III1i ? (console.log("" + JSON.stringify(i11III1i)), console.log($.name + " checkTokenInSession API请求失败，请检查网路重试")) : iiIiiil.status == 200 && refreshToken(iiIiiil);
      } catch (iil1i111) {
        $.logErr(iil1i111, iiIiiil);
      } finally {
        iilIiII();
      }
    });
  });
}
function ajaxFloor() {
  return new Promise(llliIIll => {
    let iiIIiliI = "act_id=" + activityId + "&user_id=" + $.shopid + "&buyer_logo=" + encodeURIComponent($.buyer_logo) + "&comment_info=" + encodeURIComponent($.pinyu);
    $.post(taskPostUrl("/ql/front/ajaxFloor", iiIIiliI), async (Iii1ilIl, llIIi1i1, l111ilIi) => {
      try {
        Iii1ilIl ? (console.log("" + JSON.stringify(Iii1ilIl)), console.log($.name + " ajaxFloor API请求失败，请检查网路重试")) : (l111ilIi = JSON.parse(l111ilIi), l111ilIi.str2Param ? console.log("" + l111ilIi.str2Param) : console.log(JSON.stringify(l111ilIi)));
        llIIi1i1.status == 200 && refreshToken(llIIi1i1);
      } catch (il11IlII) {
        $.logErr(il11IlII, llIIi1i1);
      } finally {
        llliIIll();
      }
    });
  });
}
function floorz() {
  return new Promise(lI1IiIli => {
    const IlIllllI = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/floor?id=" + activityId + "&user_id=" + $.shopid,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.shopid + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/floor?id=" + activityId + "&user_id=" + $.shopid,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(IlIllllI, async (iIIliIll, iiillli, liIIill) => {
      try {
        if (iIIliIll) {
          console.log("" + JSON.stringify(iIIliIll));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          liIIill = liIIill;
          if (liIIill) {
            const li1ii11 = new JSDOM(liIIill);
            $.buyer_logo = li1ii11.window.document.getElementById("buyer_logo").value;
            if ($.index === 1) {
              $.rlue = li1ii11.window.document.getElementById("description").textContent;
              console.log("" + $.rlue);
              let Ii11i1Il = $.rlue.match(/每人每天可盖楼(\d+)次/);
              if (Ii11i1Il) {
                $.cjcs = Ii11i1Il[1];
              } else {
                $.cjcs = default_drawnum;
                console.log("采用默认盖楼次数：" + $.cjcs);
              }
              let ii1I1Il1 = li1ii11.window.document.getElementById("comments").value;
              ii1I1Il1 = JSON.parse(ii1I1Il1);
              for (let lil1il1l = 0; lil1il1l < ii1I1Il1.length; lil1il1l++) {
                comments_arr.push(ii1I1Il1[lil1il1l].pinyu);
              }
              console.log("");
            }
          }
        }
      } catch (I1lIiI1i) {
        $.logErr(I1lIiI1i, iiillli);
      } finally {
        lI1IiIli();
      }
    });
  });
}
function getShopOpenCardInfo(lIiiI1Ii) {
  let llI1lIll = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(lIiiI1Ii)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(li1111I => {
    $.get(llI1lIll, (iliIIIIi, iiiIi1I1, liIili1i) => {
      try {
        iliIIIIi ? iliIIIIi === "Response code 403 (Forbidden)" && ($.err = true, console.log(String(iliIIIIi))) : (res = JSON.parse(liIili1i), res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId)));
      } catch (liil1ilI) {
        console.log(liil1ilI);
      } finally {
        li1111I();
      }
    });
  });
}
function taskPostUrl(Iilii1il, I1ilii1I) {
  return {
    "url": "" + domains + Iilii1il,
    "body": I1ilii1I,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "Host": "jinggeng-isv.isvjcloud.com",
      "Origin": "https://jinggeng-isv.isvjcloud.com",
      "Referer": "https://jinggeng-isv.isvjcloud.com/ql/front/floor?id=" + activityId + "&user_id=" + venderId,
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest"
    }
  };
}
function taskUrl(i1l1l1ll, lIlll1lI) {
  return {
    "url": "https://api.m.jd.com/client.action" + i1l1l1ll,
    "body": lIlll1lI,
    "headers": {
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Cookie": cookie,
      "User-Agent": $.UA
    }
  };
}
function refreshToken(liIIii) {
  if (liIIii) {
    if (liIIii.headers["set-cookie"]) {
      cookie = "";
      for (let III11ilI of liIIii.headers["set-cookie"]) {
        lz_cookie[III11ilI.split(";")[0].substr(0, III11ilI.split(";")[0].indexOf("="))] = III11ilI.split(";")[0].substr(III11ilI.split(";")[0].indexOf("=") + 1);
      }
      for (const IlI11I of Object.keys(lz_cookie)) {
        cookie += IlI11I + "=" + lz_cookie[IlI11I] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(I1IilII) {
  I1IilII = I1IilII || 32;
  let I11Iii11 = "abcdef0123456789",
    I1IIlIil = I11Iii11.length,
    lI1i1ilI = "";
  for (i = 0; i < I1IilII; i++) lI1i1ilI += I11Iii11.charAt(Math.floor(Math.random() * I1IIlIil));
  return lI1i1ilI;
}
function safeGet(Ii1Il1II) {
  if (!Ii1Il1II) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(Ii1Il1II) == "object") return true;
  } catch (iIlIIlIi) {
    return console.log(iIlIIlIi), false;
  }
}
function jsonParse(i1lil1li) {
  if (typeof i1lil1li == "string") try {
    return JSON.parse(i1lil1li);
  } catch (Ii1llIi) {
    return console.log(Ii1llIi), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function getQueryString(lllIii1, iIIlIi1I) {
  let liliIiIl = new RegExp("(^|[&?])" + iIIlIi1I + "=([^&]*)(&|$)"),
    l1iIiil = lllIii1.match(liliIiIl);
  if (l1iIiil != null) return decodeURIComponent(l1iIiil[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async I1iiII1I => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lIIii1l1 = "";
    if ($.shopactivityId) lIIii1l1 = ",\"activityId\":" + $.shopactivityId;
    const i1IiiII1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lIIii1l1 + ",\"channel\":406}",
      II1Ii11i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i1IiiII1)
      },
      i1Iii1Il = await getH5st("8adfb", II1Ii11i),
      II1IIlll = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + i1IiiII1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1Iii1Il),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(II1IIlll, async (lIili1, l1li1111, iIliilII) => {
      try {
        iIliilII = iIliilII && iIliilII.match(/jsonp_.*?\((.*?)\);/) && iIliilII.match(/jsonp_.*?\((.*?)\);/)[1] || iIliilII;
        let IiI1llIi = $.toObj(iIliilII, iIliilII);
        if (IiI1llIi && typeof IiI1llIi == "object") {
          if (IiI1llIi && IiI1llIi.success === true) {
            console.log(IiI1llIi.message);
            $.errorJoinShop = IiI1llIi.message;
            if (IiI1llIi.result && IiI1llIi.result.giftInfo) for (let IiIlIliI of IiI1llIi.result.giftInfo.giftList) {
              console.log("入会获得: " + IiIlIliI.discountString + IiIlIliI.prizeName + IiIlIliI.secondLineDesc);
            }
            console.log("");
          } else {
            if (IiI1llIi && typeof IiI1llIi == "object" && IiI1llIi.message) {
              $.errorJoinShop = IiI1llIi.message;
              console.log("" + (IiI1llIi.message || ""));
            } else console.log(iIliilII);
          }
        } else console.log(iIliilII);
      } catch (lIi111ll) {
        $.logErr(lIi111ll, l1li1111);
      } finally {
        I1iiII1I();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async lil11111 => {
    let ilil1Il = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const ii1Iiili = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ilil1Il)
      },
      I11IIIII = await getH5st("ef79a", ii1Iiili),
      l1illII1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + ilil1Il + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I11IIIII),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1illII1, async (iiI11iiI, IlIIliIl, ii1l1I) => {
      try {
        ii1l1I = ii1l1I && ii1l1I.match(/jsonp_.*?\((.*?)\);/) && ii1l1I.match(/jsonp_.*?\((.*?)\);/)[1] || ii1l1I;
        let lIiliiil = $.toObj(ii1l1I, ii1l1I);
        if (lIiliiil && typeof lIiliiil == "object") {
          if (lIiliiil && lIiliiil.success == true) {
            console.log("\n去加入店铺会员：" + (lIiliiil.result.shopMemberCardInfo.venderCardName || ""));
            $.shopactivityId = lIiliiil.result.interestsRuleList && lIiliiil.result.interestsRuleList[0] && lIiliiil.result.interestsRuleList[0].interestsInfo && lIiliiil.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else console.log(ii1l1I);
      } catch (lll1Iili) {
        $.logErr(lll1Iili, IlIIliIl);
      } finally {
        lil11111();
      }
    });
  });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
