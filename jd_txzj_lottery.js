/*
活动名称：幸运抽奖 · 收藏大师
活动链接：https://txzj-isv.isvjcloud.com/lottery/home?a=<活动id>
环境变量：jd_lottery_activityUrl // 活动链接

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('幸运抽奖（收藏大师）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_lottery_activityUrl) activityUrl = process.env.jd_lottery_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(iIlili1 => {
    cookiesArr.push(jdCookieNode[iIlili1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(i1liIlI => i1liIlI.cookie)].filter(liiIi1l => !!liiIi1l);
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
  for (let I111i1i1 = 0; I111i1i1 < cookiesArr.length; I111i1i1++) {
    if (cookiesArr[I111i1i1]) {
      cookie = cookiesArr[I111i1i1];
      originCookie = cookiesArr[I111i1i1];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = I111i1i1 + 1;
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
      await lottery();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(lilll111 => {
  $.log("", " " + $.name + ", 失败! 原因: " + lilll111 + "!", "");
}).finally(() => {
  $.done();
});
async function lottery() {
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
    await lotteryx();
    if ($.activityEnd) return;
    await task_shop_win_num();
    await $.wait(1000);
    if ($.drawnum == 0) {
      console.log("今天没有抽奖机会了，明天再来吧~");
    }
    for (let Ii11iil1 = 0; Ii11iil1 < $.drawnum; Ii11iil1++) {
      !$.errs && (await lottery_win_prize(), await $.wait(2000));
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function jd_store_user_info() {
  return new Promise(l1I1lili => {
    let lIIlliiI = "token=" + $.token;
    $.post(taskPostUrl("/front/jd_store_user_info", lIIlliiI), async (i1iiIli, il1Illl1, lI1IIlI) => {
      try {
        if (i1iiIli) {
          console.log("" + JSON.stringify(i1iiIli));
          console.log($.name + " jd_store_user_info API请求失败，请检查网路重试");
        } else {
          lI1IIlI = JSON.parse(lI1IIlI);
          if (lI1IIlI && lI1IIlI.code === "success") {} else {
            console.log("授权失败：" + lI1IIlI.msg);
            $.hasEnd = true;
          }
          il1Illl1.status == 200 && refreshToken(il1Illl1);
        }
      } catch (iiliilli) {
        $.logErr(iiliilli, il1Illl1);
      } finally {
        l1I1lili();
      }
    });
  });
}
function task_shop_win_num() {
  return new Promise(i1l1iiI1 => {
    let I1liI1i1 = "pid=" + activityId;
    $.post(taskPostUrl("/lottery/task_shop_win_num", I1liI1i1), async (li1liiiI, i1ii1iII, I1iiIii1) => {
      try {
        if (li1liiiI) {
          console.log("" + JSON.stringify(li1liiiI));
          console.log($.name + " task_shop_win_num API请求失败，请检查网路重试");
        } else {
          I1iiIii1 = JSON.parse(I1iiIii1);
          if (I1iiIii1 && I1iiIii1.code === "success") $.drawnum++;else {
            li1liiiI = I1iiIii1.msg;
            for (let ii1iIlII of ["不足", "火爆", "上限", "用完了", "擦肩", "抽奖机会", "达到", "已完成"]) {
              if (li1liiiI.includes(ii1iIlII)) {
                $.errs = true;
                break;
              }
            }
          }
          i1ii1iII.status == 200 && refreshToken(i1ii1iII);
        }
      } catch (iillI1l) {
        $.logErr(iillI1l, i1ii1iII);
      } finally {
        i1l1iiI1();
      }
    });
  });
}
function lottery_win_prize() {
  return new Promise(ilii1I11 => {
    let lii1iIil = "pid=" + activityId;
    $.post(taskPostUrl("/lottery/lottery_win_prize", lii1iIil), async (ilIi1ii1, IliIliI1, I1i1lIl1) => {
      try {
        if (ilIi1ii1) {
          console.log("" + JSON.stringify(ilIi1ii1));
          console.log($.name + " lottery_win_prize API请求失败，请检查网路重试");
        } else {
          I1i1lIl1 = JSON.parse(I1i1lIl1);
          if (I1i1lIl1 && I1i1lIl1.code === "success") {
            if (I1i1lIl1.data.prize_info) switch (I1i1lIl1.data.prize_info.type) {
              case "coupon":
                console.log("🗑️ 优惠券");
                break;
              case "bean":
                console.log("🎉 " + I1i1lIl1.data.prize_info.prize_title + " 🐶");
                break;
              case "integral":
                console.log("🗑️ " + (I1i1lIl1.data.prize_info.prize_title || I1i1lIl1.data.prize_info.once_num) + " 🎟️");
                break;
              case "goods":
                console.log("🎉 实物" + I1i1lIl1.data.prize_info.prize_name);
                break;
              default:
                console.log(I1i1lIl1.msg);
                break;
            } else console.log("💨 空气");
          } else {
            console.log("领取失败：" + I1i1lIl1.msg);
            ilIi1ii1 = I1i1lIl1.msg;
            for (let llIIi1Il of ["不足", "部分会员", "火爆", "上限", "已领取", "未开始"]) {
              if (ilIi1ii1.includes(llIIi1Il)) {
                $.errs = true;
                break;
              }
            }
          }
          IliIliI1.status == 200 && refreshToken(IliIliI1);
        }
      } catch (IIii1iiI) {
        $.logErr(IIii1iiI, IliIliI1);
      } finally {
        ilii1I11();
      }
    });
  });
}
function lotteryx() {
  return new Promise(iiiiiili => {
    const l1il1ilI = {
      "url": domains + "/lottery/home?a=" + activityId + "&token=" + $.token,
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
    $.get(l1il1ilI, async (liIiiil1, i1IIi1, li1ilIii) => {
      try {
        if (liIiiil1) {
          console.log("" + JSON.stringify(liIiiil1));
          console.log($.name + " lotteryz API请求失败，请检查网路重试");
        } else {
          li1ilIii = li1ilIii;
          if (li1ilIii) {
            let iiiiiii = li1ilIii.match(/(活动已结束)/) && li1ilIii.match(/(活动已结束)/)[1] || li1ilIii.match(/(哎哟，当前活动尚未开始噢！)/) && li1ilIii.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            iiiiiii && ($.activityEnd = true, console.log("活动已结束或者未开始"));
            let li1ill = li1ilIii.match(/剩余抽奖<span>(.+)<\/span>次/);
            li1ill && ($.drawnum = li1ill[1]);
          }
        }
      } catch (Ii111i11) {
        $.logErr(Ii111i11, i1IIi1);
      } finally {
        iiiiiili();
      }
    });
  });
}
function getShopOpenCardInfo(i1i1iIIi) {
  let lIll1iiI = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(i1i1iIIi)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(II1iIii1 => {
    $.get(lIll1iiI, (IIl1l11i, I1iIllI1, ilII11iI) => {
      try {
        if (IIl1l11i) {
          IIl1l11i === "Response code 403 (Forbidden)" && ($.err = true, console.log(String(IIl1l11i)));
        } else {
          res = JSON.parse(ilII11iI);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (lI1ili) {
        console.log(lI1ili);
      } finally {
        II1iIii1();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async ii1lilIl => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let liiIl11 = "";
    if ($.shopactivityId) liiIl11 = ",\"activityId\":" + $.shopactivityId;
    const III111il = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + liiIl11 + ",\"channel\":406}",
      ii1l1Ii = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(III111il)
      },
      i1Il1i1i = await getH5st("8adfb", ii1l1Ii),
      iIlllII = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + III111il + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1Il1i1i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIlllII, async (IiiillIi, iII1Iiil, iI111II1) => {
      try {
        iI111II1 = iI111II1 && iI111II1.match(/jsonp_.*?\((.*?)\);/) && iI111II1.match(/jsonp_.*?\((.*?)\);/)[1] || iI111II1;
        let l1IIIli1 = $.toObj(iI111II1, iI111II1);
        if (l1IIIli1 && typeof l1IIIli1 == "object") {
          if (l1IIIli1 && l1IIIli1.success === true) {
            console.log(l1IIIli1.message);
            $.errorJoinShop = l1IIIli1.message;
            if (l1IIIli1.result && l1IIIli1.result.giftInfo) for (let IIIII1Ii of l1IIIli1.result.giftInfo.giftList) {
              console.log("入会获得: " + IIIII1Ii.discountString + IIIII1Ii.prizeName + IIIII1Ii.secondLineDesc);
            }
            console.log("");
          } else l1IIIli1 && typeof l1IIIli1 == "object" && l1IIIli1.message ? ($.errorJoinShop = l1IIIli1.message, console.log("" + (l1IIIli1.message || ""))) : console.log(iI111II1);
        } else console.log(iI111II1);
      } catch (lI1Iliil) {
        $.logErr(lI1Iliil, iII1Iiil);
      } finally {
        ii1lilIl();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async il1III1l => {
    let Il1li1ll = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const I1IIiIil = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Il1li1ll)
      },
      li1IIllI = await getH5st("ef79a", I1IIiIil),
      IlIliiII = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + Il1li1ll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(li1IIllI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IlIliiII, async (li11Iil, Ii1lIiI1, illlllii) => {
      try {
        illlllii = illlllii && illlllii.match(/jsonp_.*?\((.*?)\);/) && illlllii.match(/jsonp_.*?\((.*?)\);/)[1] || illlllii;
        let l1Ii11li = $.toObj(illlllii, illlllii);
        l1Ii11li && typeof l1Ii11li == "object" ? l1Ii11li && l1Ii11li.success == true && (console.log("\n去加入店铺会员：" + (l1Ii11li.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = l1Ii11li.result.interestsRuleList && l1Ii11li.result.interestsRuleList[0] && l1Ii11li.result.interestsRuleList[0].interestsInfo && l1Ii11li.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(illlllii);
      } catch (illl1l1) {
        $.logErr(illl1l1, Ii1lIiI1);
      } finally {
        il1III1l();
      }
    });
  });
}
function getAuthorCodeList(II1Iii1) {
  return new Promise(lIiiiIlI => {
    const lIli1IIi = {
      "url": II1Iii1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(lIli1IIi, async (iIIIiIli, IilIl1il, l1i1liI) => {
      try {
        if (iIIIiIli) {
          $.getAuthorCodeListerr = false;
        } else {
          if (l1i1liI) l1i1liI = JSON.parse(l1i1liI);
          $.getAuthorCodeListerr = true;
        }
      } catch (i1IIil1i) {
        $.logErr(i1IIil1i, IilIl1il);
        l1i1liI = null;
      } finally {
        lIiiiIlI(l1i1liI);
      }
    });
  });
}
function taskPostUrl(llIi1III, I1iIi1l) {
  return {
    "url": "" + domains + llIi1III,
    "body": I1iIi1l,
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
function refreshToken(l11IiliI) {
  if (l11IiliI) {
    if (l11IiliI.headers["set-cookie"]) {
      cookie = "";
      for (let I1i1i1iI of l11IiliI.headers["set-cookie"]) {
        lz_cookie[I1i1i1iI.split(";")[0].substr(0, I1i1i1iI.split(";")[0].indexOf("="))] = I1i1i1iI.split(";")[0].substr(I1i1i1iI.split(";")[0].indexOf("=") + 1);
      }
      for (const lIlI1l11 of Object.keys(lz_cookie)) {
        cookie += lIlI1l11 + "=" + lz_cookie[lIlI1l11] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(ilIliI1i) {
  ilIliI1i = ilIliI1i || 32;
  let liiIIiII = "abcdef0123456789",
    l1IIiI1 = liiIIiII.length,
    i1lIiiI1 = "";
  for (i = 0; i < ilIliI1i; i++) i1lIiiI1 += liiIIiII.charAt(Math.floor(Math.random() * l1IIiI1));
  return i1lIiiI1;
}
function safeGet(liIllIll) {
  if (!liIllIll) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(liIllIll) == "object") return true;
  } catch (ii1lI1il) {
    return console.log(ii1lI1il), false;
  }
}
function jsonParse(lll1IIIi) {
  if (typeof lll1IIIi == "string") try {
    return JSON.parse(lll1IIIi);
  } catch (ilIIIil) {
    return console.log(ilIIIil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function generateFp() {
  let iiiIi1 = "0123456789",
    lIi111iI = 13,
    ii1I1i11 = "";
  for (; lIi111iI--;) ii1I1i11 += iiiIi1[Math.random() * iiiIi1.length | 0];
  return (ii1I1i11 + Date.now()).slice(0, 16);
}
function geth5st() {
  let lIIIilil = Date.now(),
    Ii111I1l = generateFp(),
    IliI111 = new Date(lIIIilil).Format("yyyyMMddhhmmssSSS"),
    iIIiiI1i = [";ef79a;tk02w92631bfa18nhD4ubf3QfNiU8ED2PI270ygsn+vamuBQh0lVE6v7UAwckz3s2OtlFEfth5LbQdWOPNvPEYHuU2Tw;b01c7c4f99a8ffb2b5e69282f45a14e1b87c90a96217006311ae4cfdcbd1a932;3.0;", ";169f1;tk02wc0f91c8a18nvWVMGrQO1iFlpQre2Sh2mGtNro1l0UpZqGLRbHiyqfaUQaPy64WT7uz7E/gujGAB50kyO7hwByWK;77c8a05e6a66faeed00e4e280ad8c40fab60723b5b561230380eb407e19354f7;3.0;"],
    Illiiil = iIIiiI1i[random(0, iIIiiI1i.length)];
  return encodeURIComponent(IliI111 + ";" + Ii111I1l + Illiiil + Date.now());
}
Date.prototype.Format = function (i1l1I1iI) {
  var ilIl11lI = this,
    IIlI1iII = i1l1I1iI,
    lliiiI1 = {
      "M+": ilIl11lI.getMonth() + 1,
      "d+": ilIl11lI.getDate(),
      "D+": ilIl11lI.getDate(),
      "h+": ilIl11lI.getHours(),
      "H+": ilIl11lI.getHours(),
      "m+": ilIl11lI.getMinutes(),
      "s+": ilIl11lI.getSeconds(),
      "w+": ilIl11lI.getDay(),
      "q+": Math.floor((ilIl11lI.getMonth() + 3) / 3),
      "S+": ilIl11lI.getMilliseconds()
    };
  /(y+)/i.test(IIlI1iII) && (IIlI1iII = IIlI1iII.replace(RegExp.$1, "".concat(ilIl11lI.getFullYear()).substr(4 - RegExp.$1.length)));
  for (var iilIi1lI in lliiiI1) {
    if (new RegExp("(".concat(iilIi1lI, ")")).test(IIlI1iII)) {
      var IIi11I1l,
        IIlIi1i1 = "S+" === iilIi1lI ? "000" : "00";
      IIlI1iII = IIlI1iII.replace(RegExp.$1, 1 == RegExp.$1.length ? lliiiI1[iilIi1lI] : ("".concat(IIlIi1i1) + lliiiI1[iilIi1lI]).substr("".concat(lliiiI1[iilIi1lI]).length));
    }
  }
  return IIlI1iII;
};
function random(IiIiIil1, lIilIil1) {
  return Math.floor(Math.random() * (lIilIil1 - IiIiIil1)) + IiIiIil1;
}
function getQueryString(ililII1i, IIilIl1i) {
  let l1Ii1liI = new RegExp("(^|[&?])" + IIilIl1i + "=([^&]*)(&|$)"),
    Il1lIIiI = ililII1i.match(l1Ii1liI);
  if (Il1lIIiI != null) {
    return decodeURIComponent(Il1lIIiI[2]);
  }
  return "";
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
