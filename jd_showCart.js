/*
活动名称：加购有礼 · 京耕
活动链接：https://jinggeng-isv.isvjcloud.com/ql/front/showCart?id=<活动id>&user_id=<店铺id>
环境变量：jd_showCart_activityUrl // 活动链接

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('加购有礼（京耕）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityCookie = "",
  skuIds = [];
$.activityEnd = false;
let drawnum = 2,
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_showCart_activityUrl) activityUrl = process.env.jd_showCart_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(liIIi111 => {
    cookiesArr.push(jdCookieNode[liIIi111]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(Il11il1 => Il11il1.cookie)].filter(li1ilIII => !!li1ilIII);
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
  console.log("活动入口：https://jinggeng-isv.isvjcloud.com/ql/front/showCart?id=" + activityId + "&user_id=" + venderId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let illiiilI = 0; illiiilI < cookiesArr.length; illiiilI++) {
    if (cookiesArr[illiiilI]) {
      cookie = cookiesArr[illiiilI];
      originCookie = cookiesArr[illiiilI];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = illiiilI + 1;
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
      await showCart();
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(I1l11iil => {
  $.log("", " " + $.name + ", 失败! 原因: " + I1l11iil + "!", "");
}).finally(() => {
  $.done();
});
async function showCart() {
  $.shopid = venderId;
  $.token = "";
  $.errs = false;
  $.token = await getToken(originCookie, domains);
  $.hasAdd = 0;
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
    await showCartz();
    if ($.activityEnd === true) {
      return;
    }
    await recordActPvUvData();
    $.getPrize = false;
    for (let i1I111I1 = 0; i1I111I1 < skuIds.length; i1I111I1++) {
      !$.errs && (await postAddCart(skuIds[i1I111I1]), await $.wait(3000));
      if ($.hasAdd == $.needAddTimes || $.getPrize) break;
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function setMixNick() {
  return new Promise(II1Ilii1 => {
    let iil1lIli = "strTMMixNick=" + $.token + "&userId=" + $.shopid + "&source=01";
    $.post(taskPostUrl("/front/setMixNick", iil1lIli), async (l1iiII, i1Illi1l, IiiI11l1) => {
      try {
        l1iiII ? (console.log("" + JSON.stringify(l1iiII)), console.log($.name + " setMixNick API请求失败，请检查网路重试")) : (IiiI11l1 = JSON.parse(IiiI11l1), IiiI11l1 && IiiI11l1.succ && ($.inviterNicks = IiiI11l1.msg), i1Illi1l.status == 200 && refreshToken(i1Illi1l));
      } catch (liliI1lI) {
        $.logErr(liliI1lI, i1Illi1l);
      } finally {
        II1Ilii1();
      }
    });
  });
}
function recordActPvUvData() {
  return new Promise(lilII1I1 => {
    let il1lIll1 = "userId=" + $.shopid + "&actId=" + activityId;
    $.post(taskPostUrl("/ql/front/reportActivity/recordActPvUvData", il1lIll1), async (lI11l1I, lIiII1Ii, ill1iili) => {
      try {
        lI11l1I ? (console.log("" + JSON.stringify(lI11l1I)), console.log($.name + " recordActPvUvData API请求失败，请检查网路重试")) : lIiII1Ii.status == 200 && refreshToken(lIiII1Ii);
      } catch (liIiil11) {
        $.logErr(liIiil11, lIiII1Ii);
      } finally {
        lilII1I1();
      }
    });
  });
}
function followShop() {
  return new Promise(iI11IIi1 => {
    let iIlIIl1i = "userId=" + $.shopid;
    $.post(taskPostUrl("/front/followShop", iIlIIl1i), async (l1IlII1l, iIi11lll, llilIlli) => {
      try {
        l1IlII1l ? (console.log("" + JSON.stringify(l1IlII1l)), console.log($.name + " followShop API请求失败，请检查网路重试")) : iIi11lll.status == 200 && refreshToken(iIi11lll);
      } catch (lil1IliI) {
        $.logErr(lil1IliI, iIi11lll);
      } finally {
        iI11IIi1();
      }
    });
  });
}
function postAddCart(lllIllII) {
  return new Promise(ll1i1li1 => {
    let IIi1i1I1 = "act_id=" + activityId + "&user_id=" + $.shopid + "&itemId=" + lllIllII;
    $.post(taskPostUrl("/ql/front/postAddCart", IIi1i1I1), async (ii11i1, IiliI11i, ililII1) => {
      try {
        if (ii11i1) {
          console.log("" + JSON.stringify(ii11i1));
          console.log($.name + " postAddCart API请求失败，请检查网路重试");
        } else {
          ililII1 = JSON.parse(ililII1);
          if (ililII1 && ililII1.succ) {
            $.hasAdd += 1;
            let iIlIiI1 = ililII1.msg;
            try {
              let IlIli1I = JSON.parse(iIlIiI1).drawAwardDto,
                Ill1iiii = IlIli1I.awardType;
              switch (Ill1iiii) {
                case "JD_BEAN":
                  console.log("🎉 " + IlIli1I.awardName + " 🐶");
                  break;
                case "JD_POINT":
                  console.log("🗑️ " + IlIli1I.awardSendNum + IlIli1I.awardName + " 🎟️");
                  break;
                case "JD_COUPON":
                  console.log("🗑️ 优惠券");
                  break;
                default:
                  console.log(IlIli1I);
                  break;
              }
              $.getPrize = true;
            } catch {
              !iIlIiI1.includes("不需要发奖") && console.log(iIlIiI1);
            }
          } else {
            ililII1.msg.includes("未中奖") ? console.log("💨 空气") : console.log("" + ililII1.msg);
            ii11i1 = ililII1.msg;
            for (let iIliII1I of ["不足", "部分会员", "火爆", "上限"]) {
              if (ii11i1.includes(iIliII1I)) {
                $.errs = true;
                break;
              }
            }
          }
          IiliI11i.status == 200 && refreshToken(IiliI11i);
        }
      } catch (Ii1liiIi) {
        $.logErr(Ii1liiIi, IiliI11i);
      } finally {
        ll1i1li1();
      }
    });
  });
}
function showCartz() {
  return new Promise(llIllli => {
    const I11iIi1i = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/showCart?id=" + activityId + "&user_id=" + $.shopid,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.shopid + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/showCart?id=" + activityId + "&user_id=" + $.shopid,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(I11iIi1i, async (iiIil1li, Ii1l1lI1, iIi111) => {
      try {
        if (iiIil1li) {
          console.log("" + JSON.stringify(iiIil1li));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          iIi111 = iIi111;
          if (iIi111) {
            let llill1Ii = iIi111.match(/(活动已结束)/) && iIi111.match(/(活动已结束)/)[1] || "";
            llill1Ii && ($.activityEnd = true, console.log("活动已结束"));
            if ($.index === 1) {
              let l1II111i = iIi111.match(/id="description" style="display: none">(.+)</);
              l1II111i && ($.rlue = l1II111i[1]);
              let lIill11i = iIi111.match(/加购(\d+)个宝贝/);
              lIill11i ? ($.needAddTimes = lIill11i[1], console.log("加购次数：" + $.needAddTimes + "\n")) : ($.needAddTimes = drawnum, console.log("加购次数：" + $.needAddTimes + "\n"));
              for (let iiII111 of iIi111.split("\n")) {
                let IiIIiIli = iiII111.match(/<a onclick="toDetail\((.+)\)">/);
                IiIIiIli && skuIds.push(IiIIiIli[1]);
              }
            }
          }
        }
      } catch (Il1l1iIi) {
        $.logErr(Il1l1iIi, Ii1l1lI1);
      } finally {
        llIllli();
      }
    });
  });
}
function getShopOpenCardInfo(Ii1illl1) {
  let lIIll1I = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(Ii1illl1)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(liI1IIII => {
    $.get(lIIll1I, (iiii1Ili, I1ii1Ill, iIi1111I) => {
      try {
        if (iiii1Ili) {
          if (iiii1Ili === "Response code 403 (Forbidden)") {
            $.err = true;
            console.log(String(iiii1Ili));
          }
        } else {
          res = JSON.parse(iIi1111I);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (I11I1I) {
        console.log(I11I1I);
      } finally {
        liI1IIII();
      }
    });
  });
}
function taskPostUrl(ii1ii1l1, i1Il11lI) {
  return {
    "url": "" + domains + ii1ii1l1,
    "body": i1Il11lI,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "Host": "jinggeng-isv.isvjcloud.com",
      "Origin": "https://jinggeng-isv.isvjcloud.com",
      "Referer": "https://jinggeng-isv.isvjcloud.com/ql/front/showCart?id=" + activityId + "&user_id=" + venderId,
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest"
    }
  };
}
function taskUrl(ii1IIil, lIlIl1Ii) {
  return {
    "url": "https://api.m.jd.com/client.action" + ii1IIil,
    "body": lIlIl1Ii,
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
function refreshToken(lIll) {
  if (lIll) {
    if (lIll.headers["set-cookie"]) {
      cookie = "";
      for (let i1lIIiIl of lIll.headers["set-cookie"]) {
        lz_cookie[i1lIIiIl.split(";")[0].substr(0, i1lIIiIl.split(";")[0].indexOf("="))] = i1lIIiIl.split(";")[0].substr(i1lIIiIl.split(";")[0].indexOf("=") + 1);
      }
      for (const li1lIli1 of Object.keys(lz_cookie)) {
        cookie += li1lIli1 + "=" + lz_cookie[li1lIli1] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(i1IiiIll) {
  i1IiiIll = i1IiiIll || 32;
  let I11lIIll = "abcdef0123456789",
    iI1Il1il = I11lIIll.length,
    Iiii111 = "";
  for (i = 0; i < i1IiiIll; i++) Iiii111 += I11lIIll.charAt(Math.floor(Math.random() * iI1Il1il));
  return Iiii111;
}
function safeGet(IIii11I) {
  if (!IIii11I) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(IIii11I) == "object") return true;
  } catch (iiII1III) {
    return console.log(iiII1III), false;
  }
}
function jsonParse(I1lIiiII) {
  if (typeof I1lIiiII == "string") {
    try {
      return JSON.parse(I1lIiiII);
    } catch (IlliIi1) {
      return console.log(IlliIi1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function getQueryString(iIli1i1l, iIiIII1I) {
  let lI1I1III = new RegExp("(^|[&?])" + iIiIII1I + "=([^&]*)(&|$)"),
    lll1li11 = iIli1i1l.match(lI1I1III);
  if (lll1li11 != null) return decodeURIComponent(lll1li11[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async I11l11Ii => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let i1l1iIlI = "";
    if ($.shopactivityId) i1l1iIlI = ",\"activityId\":" + $.shopactivityId;
    const IilIli1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + i1l1iIlI + ",\"channel\":406}",
      iIIii1lI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IilIli1)
      },
      iI1I1lll = await getH5st("8adfb", iIIii1lI),
      liIiII11 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IilIli1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iI1I1lll),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(liIiII11, async (ilIl1I11, illII1l1, il1lilli) => {
      try {
        il1lilli = il1lilli && il1lilli.match(/jsonp_.*?\((.*?)\);/) && il1lilli.match(/jsonp_.*?\((.*?)\);/)[1] || il1lilli;
        let IIIlIlI = $.toObj(il1lilli, il1lilli);
        if (IIIlIlI && typeof IIIlIlI == "object") {
          if (IIIlIlI && IIIlIlI.success === true) {
            console.log(IIIlIlI.message);
            $.errorJoinShop = IIIlIlI.message;
            if (IIIlIlI.result && IIIlIlI.result.giftInfo) {
              for (let iiIIiIii of IIIlIlI.result.giftInfo.giftList) {
                console.log("入会获得: " + iiIIiIii.discountString + iiIIiIii.prizeName + iiIIiIii.secondLineDesc);
              }
            }
            console.log("");
          } else {
            if (IIIlIlI && typeof IIIlIlI == "object" && IIIlIlI.message) {
              $.errorJoinShop = IIIlIlI.message;
              console.log("" + (IIIlIlI.message || ""));
            } else {
              console.log(il1lilli);
            }
          }
        } else console.log(il1lilli);
      } catch (iIiiIl11) {
        $.logErr(iIiiIl11, illII1l1);
      } finally {
        I11l11Ii();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async iiIlIilI => {
    let l11IIlli = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const lll1iI1I = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l11IIlli)
      },
      lli1IiI1 = await getH5st("ef79a", lll1iI1I),
      l1l1lIIi = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + l11IIlli + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lli1IiI1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1l1lIIi, async (I1IiIIil, llIlIlIi, Iii1i1ll) => {
      try {
        Iii1i1ll = Iii1i1ll && Iii1i1ll.match(/jsonp_.*?\((.*?)\);/) && Iii1i1ll.match(/jsonp_.*?\((.*?)\);/)[1] || Iii1i1ll;
        let IIilli1 = $.toObj(Iii1i1ll, Iii1i1ll);
        IIilli1 && typeof IIilli1 == "object" ? IIilli1 && IIilli1.success == true && (console.log("\n去加入店铺会员：" + (IIilli1.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = IIilli1.result.interestsRuleList && IIilli1.result.interestsRuleList[0] && IIilli1.result.interestsRuleList[0].interestsInfo && IIilli1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(Iii1i1ll);
      } catch (IlI11iIl) {
        $.logErr(IlI11iIl, llIlIlIi);
      } finally {
        iiIlIilI();
      }
    });
  });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
