/*
活动名称：惊喜开盲盒 · 京耕
活动链接：https://jinggeng-isv.isvjcloud.com/ql/front/loadBlindBox?id=<活动id>&user_id=<店铺id>
环境变量：jd_loadBlindBox_activityUrl // 活动链接

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('惊喜开盲盒（京耕）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
let drawnum = 2,
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_loadBlindBox_activityUrl) activityUrl = process.env.jd_loadBlindBox_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(l1IlIIIl => {
    cookiesArr.push(jdCookieNode[l1IlIIIl]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(lIl1Ill => lIl1Ill.cookie)].filter(ilIiIil1 => !!ilIiIil1);
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
  console.log("活动入口：https://jinggeng-isv.isvjcloud.com/ql/front/loadBlindBox?id=" + activityId + "&user_id=" + venderId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let i1IllII = 0; i1IllII < cookiesArr.length; i1IllII++) {
    if (cookiesArr[i1IllII]) {
      cookie = cookiesArr[i1IllII];
      originCookie = cookiesArr[i1IllII];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = i1IllII + 1;
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
      await loadBlindBox();
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(lillIlII => {
  $.log("", " " + $.name + ", 失败! 原因: " + lillIlII + "!", "");
}).finally(() => {
  $.done();
});
async function loadBlindBox() {
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
    await loadBlindBoxz();
    if ($.activityEnd === true) return;
    await recordActPvUvData();
    await postDrawTimes();
    await $.wait(3000);
    for (let lil1iiIl = 0; lil1iiIl < $.drawNums; lil1iiIl++) {
      !$.errs && (await postBlindBox(), await $.wait(3000));
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function setMixNick() {
  return new Promise(lllIli => {
    let IIiIiIi = "strTMMixNick=" + $.token + "&userId=" + $.shopid + "&source=01";
    $.post(taskPostUrl("/front/setMixNick", IIiIiIi), async (l1I11lIi, lIlIi1i, I1iI1ll) => {
      try {
        l1I11lIi ? (console.log("" + JSON.stringify(l1I11lIi)), console.log($.name + " setMixNick API请求失败，请检查网路重试")) : (I1iI1ll = JSON.parse(I1iI1ll), I1iI1ll && I1iI1ll.succ && ($.inviterNicks = I1iI1ll.msg), lIlIi1i.status == 200 && refreshToken(lIlIi1i));
      } catch (I1l11li1) {
        $.logErr(I1l11li1, lIlIi1i);
      } finally {
        lllIli();
      }
    });
  });
}
function recordActPvUvData() {
  return new Promise(IlIi11i1 => {
    let IIilll11 = "userId=" + $.shopid + "&actId=" + activityId;
    $.post(taskPostUrl("/ql/front/reportActivity/recordActPvUvData", IIilll11), async (IlIliii1, i1lii1ll, ili1lIlI) => {
      try {
        IlIliii1 ? (console.log("" + JSON.stringify(IlIliii1)), console.log($.name + " recordActPvUvData API请求失败，请检查网路重试")) : i1lii1ll.status == 200 && refreshToken(i1lii1ll);
      } catch (lII1iIII) {
        $.logErr(lII1iIII, i1lii1ll);
      } finally {
        IlIi11i1();
      }
    });
  });
}
function checkTokenInSession() {
  return new Promise(iI1i1ill => {
    let i1Ilil1i = "userId=" + $.shopid + "&token=" + $.token;
    $.post(taskPostUrl("/front/checkTokenInSession", i1Ilil1i), async (iIiiIIl, Iii1iiii, iii1I1l1) => {
      try {
        iIiiIIl ? (console.log("" + JSON.stringify(iIiiIIl)), console.log($.name + " checkTokenInSession API请求失败，请检查网路重试")) : Iii1iiii.status == 200 && refreshToken(Iii1iiii);
      } catch (iIliIIil) {
        $.logErr(iIliIIil, Iii1iiii);
      } finally {
        iI1i1ill();
      }
    });
  });
}
function receiveInviteJoinAward() {
  return new Promise(lil1IlIl => {
    let l1I1iIi1 = "act_id=" + activityId + "&user_id=" + $.shopid + "&awardId=" + $.awardId;
    $.post(taskPostUrl("/ql/front/receiveInviteJoinAward", l1I1iIi1), async (II1iIII, IIli11, ll1Ii) => {
      try {
        if (II1iIII) {
          console.log("" + JSON.stringify(II1iIII));
          console.log($.name + " receiveInviteJoinAward API请求失败，请检查网路重试");
        } else {
          ll1Ii = JSON.parse(ll1Ii);
          if (ll1Ii && ll1Ii.succ) {
            console.log("领取奖励成功");
          } else console.log("领取奖励失败：" + result.msg);
          IIli11.status == 200 && refreshToken(IIli11);
        }
      } catch (l1liI11i) {
        $.logErr(l1liI11i, IIli11);
      } finally {
        lil1IlIl();
      }
    });
  });
}
function postDrawTimes() {
  return new Promise(l1li1II1 => {
    let li1iiII1 = "actId=" + activityId + "&userId=" + $.shopid + "&taskType=focus&drawCountNumFlag=true";
    $.post(taskPostUrl("/ql/front/postDrawTimes", li1iiII1), async (iI1I1Il1, l1i11Iil, Ii1lli11) => {
      try {
        if (iI1I1Il1) {
          console.log("" + JSON.stringify(iI1I1Il1));
          console.log($.name + " postDrawTimes API请求失败，请检查网路重试");
        } else {
          Ii1lli11 = JSON.parse(Ii1lli11);
          if (Ii1lli11 && Ii1lli11.succ) {
            $.drawNum = Ii1lli11.drawNum;
            $.drawNums = Number($.cjcs) + $.drawNum;
            console.log($.drawNums);
            console.log("关注成功，抽奖次数 +" + $.drawNum + " ");
          } else {
            console.log("关注失败：" + Ii1lli11.msg);
            $.drawNums = Number($.cjcs);
            console.log($.drawNums);
          }
          l1i11Iil.status == 200 && refreshToken(l1i11Iil);
        }
      } catch (iliili11) {
        $.logErr(iliili11, l1i11Iil);
      } finally {
        l1li1II1();
      }
    });
  });
}
function postBlindBox() {
  return new Promise(lli1lill => {
    let l1llill1 = "act_id=" + activityId + "&user_id=" + $.shopid + "&drawCountNumFlag=true";
    $.post(taskPostUrl("/ql/front/postBlindBox", l1llill1), async (i1iIll, II1lI11i, lIIliI1i) => {
      try {
        if (i1iIll) {
          console.log("" + JSON.stringify(i1iIll));
          console.log($.name + " postBlindBox API请求失败，请检查网路重试");
        } else {
          lIIliI1i = JSON.parse(lIIliI1i);
          if (lIIliI1i && lIIliI1i.succ) {
            let iIiIIi1I = JSON.parse(lIIliI1i.msg).drawAwardDto,
              I1Iilii = iIiIIi1I.awardType;
            switch (I1Iilii) {
              case "JD_BEAN":
                console.log("🎉 " + iIiIIi1I.awardName + " 🐶");
                break;
              case "JD_POINT":
                console.log("🗑️ " + iIiIIi1I.awardSendNum + iIiIIi1I.awardName + " 🎟️");
                break;
              case "JD_COUPON":
                console.log("🗑️ 优惠券");
                break;
              default:
                console.log(iIiIIi1I);
                break;
            }
          } else {
            lIIliI1i.msg.includes("未中奖") ? console.log("💨 空气") : console.log("" + lIIliI1i.msg);
            i1iIll = lIIliI1i.msg;
            for (let lIili1lI of ["不足", "部分会员", "火爆", "上限"]) {
              if (i1iIll.includes(lIili1lI)) {
                $.errs = true;
                break;
              }
            }
          }
          II1lI11i.status == 200 && refreshToken(II1lI11i);
        }
      } catch (iIi1ilil) {
        $.logErr(iIi1ilil, II1lI11i);
      } finally {
        lli1lill();
      }
    });
  });
}
function loadBlindBoxz() {
  return new Promise(l1liiI1I => {
    const liIiiiii = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/loadBlindBox?id=" + activityId + "&user_id=" + $.shopid,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.shopid + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/loadBlindBox?id=" + activityId + "&user_id=" + $.shopid,
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(liIiiiii, async (Il1ill1l, lIlI1lI1, IiliII) => {
      try {
        if (Il1ill1l) {
          console.log("" + JSON.stringify(Il1ill1l));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          IiliII = IiliII;
          if (IiliII) {
            let IlIlIIiI = IiliII.match(/(活动已结束)/) && IiliII.match(/(活动已结束)/)[1] || "";
            IlIlIIiI && ($.activityEnd = true, console.log("活动已结束"));
            if ($.index === 1) {
              let IliI1iI1 = IiliII.match(/id="description" style="display: none">(.+)</);
              IliI1iI1 && ($.rlue = IliI1iI1[1], console.log("活动规则：" + $.rlue));
              let IIIli11 = IiliII.match(/每日赠送(\d+)次/);
              IIIli11 ? ($.cjcs = IIIli11[1], console.log("初始抽奖次数：" + $.cjcs)) : ($.cjcs = drawnum, console.log("初始抽奖次数：" + $.cjcs));
            }
          }
        }
      } catch (iII1IIll) {
        $.logErr(iII1IIll, lIlI1lI1);
      } finally {
        l1liiI1I();
      }
    });
  });
}
function getShopOpenCardInfo(lIIl1Ii) {
  let iIllI1l1 = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(lIIl1Ii)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(Iii1I11i => {
    $.get(iIllI1l1, (llli1iii, liIi1ll, l1IliI1l) => {
      try {
        llli1iii ? llli1iii === "Response code 403 (Forbidden)" && ($.err = true, console.log(String(llli1iii))) : (res = JSON.parse(l1IliI1l), res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId)));
      } catch (IIIiil11) {
        console.log(IIIiil11);
      } finally {
        Iii1I11i();
      }
    });
  });
}
function taskPostUrl(l1I11IIl, lii1iIlI) {
  return {
    "url": "" + domains + l1I11IIl,
    "body": lii1iIlI,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "Host": "jinggeng-isv.isvjcloud.com",
      "Origin": "https://jinggeng-isv.isvjcloud.com",
      "Referer": "https://jinggeng-isv.isvjcloud.com/ql/front/loadBlindBox?id=" + activityId + "&user_id=" + venderId,
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest"
    }
  };
}
function taskUrl(liIIll1I, ilIIIl) {
  return {
    "url": "https://api.m.jd.com/client.action" + liIIll1I,
    "body": ilIIIl,
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
function refreshToken(IiI1iI11) {
  if (IiI1iI11) {
    if (IiI1iI11.headers["set-cookie"]) {
      cookie = "";
      for (let I1Ilil1I of IiI1iI11.headers["set-cookie"]) {
        lz_cookie[I1Ilil1I.split(";")[0].substr(0, I1Ilil1I.split(";")[0].indexOf("="))] = I1Ilil1I.split(";")[0].substr(I1Ilil1I.split(";")[0].indexOf("=") + 1);
      }
      for (const ll1IiiII of Object.keys(lz_cookie)) {
        cookie += ll1IiiII + "=" + lz_cookie[ll1IiiII] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(iIllIlil) {
  iIllIlil = iIllIlil || 32;
  let lIi111l = "abcdef0123456789",
    IIIiIII = lIi111l.length,
    IIl1Ii1i = "";
  for (i = 0; i < iIllIlil; i++) IIl1Ii1i += lIi111l.charAt(Math.floor(Math.random() * IIIiIII));
  return IIl1Ii1i;
}
function safeGet(ilI111I1) {
  if (!ilI111I1) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(ilI111I1) == "object") return true;
  } catch (l11I111) {
    return console.log(l11I111), false;
  }
}
function jsonParse(l1i111il) {
  if (typeof l1i111il == "string") {
    try {
      return JSON.parse(l1i111il);
    } catch (ilil11ii) {
      return console.log(ilil11ii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function getQueryString(Ill1IIi, ill111i1) {
  let I1i1il = new RegExp("(^|[&?])" + ill111i1 + "=([^&]*)(&|$)"),
    IIl1ii1I = Ill1IIi.match(I1i1il);
  if (IIl1ii1I != null) return decodeURIComponent(IIl1ii1I[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async ii1llI1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iiilIli = "";
    if ($.shopactivityId) iiilIli = ",\"activityId\":" + $.shopactivityId;
    const iili1ill = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iiilIli + ",\"channel\":406}",
      l1l1lili = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iili1ill)
      },
      iii1I = await getH5st("8adfb", l1l1lili),
      iII1l111 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + iili1ill + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iii1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iII1l111, async (I1l1llil, il1li11l, iIIli1II) => {
      try {
        iIIli1II = iIIli1II && iIIli1II.match(/jsonp_.*?\((.*?)\);/) && iIIli1II.match(/jsonp_.*?\((.*?)\);/)[1] || iIIli1II;
        let il1llii = $.toObj(iIIli1II, iIIli1II);
        if (il1llii && typeof il1llii == "object") {
          if (il1llii && il1llii.success === true) {
            console.log(il1llii.message);
            $.errorJoinShop = il1llii.message;
            if (il1llii.result && il1llii.result.giftInfo) {
              for (let ili1Il1I of il1llii.result.giftInfo.giftList) {
                console.log("入会获得: " + ili1Il1I.discountString + ili1Il1I.prizeName + ili1Il1I.secondLineDesc);
              }
            }
            console.log("");
          } else il1llii && typeof il1llii == "object" && il1llii.message ? ($.errorJoinShop = il1llii.message, console.log("" + (il1llii.message || ""))) : console.log(iIIli1II);
        } else console.log(iIIli1II);
      } catch (liiilli) {
        $.logErr(liiilli, il1li11l);
      } finally {
        ii1llI1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async IilIilil => {
    let l1lill = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const iliii11l = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l1lill)
      },
      l11l1ll1 = await getH5st("ef79a", iliii11l),
      I1iI1IiI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + l1lill + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l11l1ll1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I1iI1IiI, async (l1il1il1, I1llliIi, Ii11iI1I) => {
      try {
        Ii11iI1I = Ii11iI1I && Ii11iI1I.match(/jsonp_.*?\((.*?)\);/) && Ii11iI1I.match(/jsonp_.*?\((.*?)\);/)[1] || Ii11iI1I;
        let iIi1 = $.toObj(Ii11iI1I, Ii11iI1I);
        if (iIi1 && typeof iIi1 == "object") {
          if (iIi1 && iIi1.success == true) {
            console.log("\n去加入店铺会员：" + (iIi1.result.shopMemberCardInfo.venderCardName || ""));
            $.shopactivityId = iIi1.result.interestsRuleList && iIi1.result.interestsRuleList[0] && iIi1.result.interestsRuleList[0].interestsInfo && iIi1.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else console.log(Ii11iI1I);
      } catch (I1iil1Ii) {
        $.logErr(I1iil1Ii, I1llliIi);
      } finally {
        IilIilil();
      }
    });
  });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
