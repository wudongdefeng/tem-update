/*
活动名称：加购有礼（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10024&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
环境变量：jd_lzkj_loreal_cart_url // 活动链接
         jd_lzkj_loreal_cart_openCard // 是否开卡，默认不开卡

*/
let lnrun = 0;


const $ = new Env('加购有礼（超级无线欧莱雅）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityUrl = process.env.jd_lzkj_loreal_cart_url,
  openCard = process.env.jd_lzkj_loreal_cart_openCard === "true" ? true : false,
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_cart_url) activityUrl = process.env.jd_lzkj_loreal_cart_url;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(IliI1lii => {
    cookiesArr.push(jdCookieNode[IliI1lii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(ll1Ii => ll1Ii.cookie)].filter(IIilIii1 => !!IIilIii1);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  activityType = getQueryString("" + activityUrl, "activityType");
  templateId = getQueryString("" + activityUrl, "templateId");
  if (activityUrl.includes("lorealjdcampaign-rc")) wxActType = "apps/interact";else {
    if (activityUrl.includes("lzkj")) wxActType = activityUrl.match(/\/(prod\/cc\/interact\w*)\//)[1];else {
      console.log("暂不支持的类型");
      return;
    }
  }
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
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
  for (let iIiIll = 0; iIiIll < cookiesArr.length; iIiIll++) {
    if (cookiesArr[iIiIll]) {
      cookie = cookiesArr[iIiIll];
      originCookie = cookiesArr[iIiIll];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = iIiIll + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      lnrun++;if(lnrun == 2){console.log(`\n【访问接口次数达到1次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await Main();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd || $.outFlag || $.maxcountnum) break;
    }
  }
})().catch(ii1lii1i => {
  $.log("", " " + $.name + ", 失败! 原因: " + ii1lii1i + "!", "");
}).finally(() => {
  $.done();
});
async function Main() {
  $.acquire = 0;
  $.shareUser = 0;
  $.shareUserNum = 0;
  $.token = "";
  $.Pin = "";
  $.OpenCard = false;
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.token) {
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    if ($.hasEnd || $.activityEnd || $.outFlag || $.OpenCard) return;
    await $.wait(300);
    await follow();
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    await $.wait(300);
    if ($.index == 1) {
      await drawPrize();
      await $.wait(300);
      if ($.index == 1) {
        $.prizeList = "";
        for (let lIiIIIli = 0; lIiIIIli < $.prizeInfo.length; lIiIIIli++) {
          prizeName = $.prizeInfo[lIiIIIli].prizeName;
          if (lIiIIIli != $.prizeInfo.length - 1) {
            $.prizeList += prizeName + "，";
          } else $.prizeList += "" + prizeName;
        }
        console.log("店铺名称：" + $.shopName + "\n活动名称：" + $.actName + "\n活动奖品：" + $.prizeList);
      }
    }
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
    await activity();
    if ($.prizeResultNum <= 0) return;
    if ($.status == 1 || $.status == 2) {
      console.log("已加购所有商品");
      return;
    }
    if ($.completeCount <= $.finishNum) {
      if ($.taskId) {
        for (o of $.skuInfoVO) {
          if ($.finishNum > 0) {
            if (o.status == 0) {
              $.skuId = o.skuId;
              await toDo();
              $.finishNum--;
              await $.wait(500);
            }
          }
        }
      }
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function getShopOpenCardInfo(IlIlIII1) {
  let iili1i1i = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(IlIlIII1)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(i1Ii1l => {
    $.get(iili1i1i, (I1II1Il1, lllll1Ii, IIIllliI) => {
      try {
        if (I1II1Il1) I1II1Il1 === "Response code 403 (Forbidden)" && ($.err = true, console.log(String(I1II1Il1)));else {
          res = JSON.parse(IIIllliI);
          if (res.success) {
            $.openCardStatus = res.result.userInfo.openCardStatus;
            if (res.result.interestsRuleList) {
              $.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId;
            }
          }
        }
      } catch (il1iIIII) {
        console.log(il1iIIII);
      } finally {
        i1Ii1l();
      }
    });
  });
}
function showMsg() {
  return new Promise(illIiI1l => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    illIiI1l();
  });
}
function login(IlIlIil, lI1il11l) {
  return new Promise(llIiI1il => {
    $.post(taskPostUrl(IlIlIil, lI1il11l), async (i1i1iIiI, i1IIiiiI, I1ilI1ii) => {
      try {
        if (i1i1iIiI) {
          console.log("" + JSON.stringify(i1i1iIiI));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          I1ilI1ii = JSON.parse(I1ilI1ii);
          if (I1ilI1ii && I1ilI1ii.data) {
            $.tokens = I1ilI1ii.data.token;
            $.customerId = I1ilI1ii.data.customerId;
            $.joinVenderId = I1ilI1ii.data.joinInfo.shopId;
            $.openCardUrl = I1ilI1ii.data.joinInfo.openCardUrl;
            $.shopName = I1ilI1ii.data.shopName;
            $.actName = I1ilI1ii.data.actName;
            if ($.openCardUrl) {
              $.joinVenderId = I1ilI1ii.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1];
            }
            $.joinDes = I1ilI1ii.data.joinInfo.joinCodeInfo.joinDes;
            if (openCard) {
              if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
                $.errorJoinShop = "";
                await getshopactivityId();
                for (let iillI11l = 0; iillI11l < Array(2).length; iillI11l++) {
                  if (iillI11l > 0) console.log("第" + iillI11l + "次 重新开卡");
                  await joinShop();
                  if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
                    break;
                  }
                  $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), $.OpenCard = true);
                }
              }
            }
          } else console.log(I1ilI1ii);
          i1IIiiiI.status == 200 && refreshToken(i1IIiiiI);
        }
      } catch (lll1IIll) {
        $.logErr(lll1IIll, i1IIiiiI);
      } finally {
        llIiI1il();
      }
    });
  });
}
function follow() {
  return new Promise(ii1lI11 => {
    let iilIlI1 = {};
    $.post(taskPostUrl("api/task/followShop/follow", iilIlI1), async (l1iiIiIi, IlIlIl1I, I11l1Il1) => {
      try {
        if (l1iiIiIi) {
          console.log("" + JSON.stringify(l1iiIiIi));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          I11l1Il1 = JSON.parse(I11l1Il1);
          if (I11l1Il1 && I11l1Il1.resp_code == 0) {} else {
            console.log(I11l1Il1.resp_msg);
            for (let llilII1I of ["未开始", "结束", "不存在", "不在"]) {
              if (I11l1Il1.resp_msg.includes(llilII1I)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          IlIlIl1I.status == 200 && refreshToken(IlIlIl1I);
        }
      } catch (l1lli111) {
        $.logErr(l1lli111, IlIlIl1I);
      } finally {
        ii1lI11();
      }
    });
  });
}
function activity() {
  return new Promise(i1ilI11i => {
    let liIIi1i1 = {};
    $.post(taskPostUrl("api/task/addSku/activity", liIIi1i1), async (liiIilll, IliIii1I, iIlI1il) => {
      try {
        if (liiIilll) {
          console.log("" + JSON.stringify(liiIilll));
          console.log($.name + " addSku API请求失败，请检查网路重试");
        } else {
          iIlI1il = JSON.parse(iIlI1il);
          if (iIlI1il && iIlI1il.data) {
            $.taskId = iIlI1il.data.addWares.taskId;
            $.finishNum = iIlI1il.data.addWares.finishNum;
            $.finishType = iIlI1il.data.addWares.finishType;
            $.oneClickPurchase = iIlI1il.data.addWares.oneClickPurchase;
            $.followShopStatus = iIlI1il.data.addWares.followShopStatus;
            $.completeCount = iIlI1il.data.addWares.completeCount;
            $.prizeResultNum = iIlI1il.data.prizeResultNum;
            $.skuInfoVO = iIlI1il.data.addWares.skuInfoVO || [];
            $.status = iIlI1il.data.addWares.status;
            if ($.prizeResultNum <= 0) {
              $.maxcountnum = true;
              console.log("活动已无奖励剩余");
            } else $.index == 1 && console.log("奖品库存：" + $.prizeResultNum + "\n");
          } else {
            console.log(iIlI1il);
            for (let lilIllIi of ["未开始", "结束", "不存在", "不在"]) {
              if (iIlI1il.resp_msg.includes(lilIllIi)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          IliIii1I.status == 200 && refreshToken(IliIii1I);
        }
      } catch (IliIilIl) {
        $.logErr(IliIilIl, IliIii1I);
      } finally {
        i1ilI11i();
      }
    });
  });
}
function toDo() {
  return new Promise(lIi1IIl => {
    let IIiilIlI = {
      "taskId": $.taskId,
      "skuId": $.skuId
    };
    $.post(taskPostUrl("api/task/addSku/toDo", IIiilIlI), async (IIIIliI, l1Il1IiI, l11I1Iii) => {
      try {
        if (IIIIliI) {
          console.log("" + JSON.stringify(IIIIliI));
          console.log($.name + " toDo API请求失败，请检查网路重试");
        } else {
          l11I1Iii = JSON.parse(l11I1Iii);
          if (l11I1Iii && l11I1Iii.resp_code == 0) {
            let iiiIlil1 = l11I1Iii.data;
            if (iiiIlil1) switch (iiiIlil1.prizeType) {
              case 1:
                console.log("🎉 " + iiiIlil1.prizeName + " 🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券");
                break;
              case 3:
                generateId = l11I1Iii.data.prizeInfoId;
                prizeName = iiiIlil1.prizeName;
                console.log(l11I1Iii);
                console.log("🎉 恭喜获得实物~");
                console.log("奖品名称：" + prizeName);
                break;
              case 4:
              case 11:
                console.log("🗑️ " + iiiIlil1.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + iiiIlil1.prizeName + " 🧧");
                break;
              case 8:
                console.log("🎉 恭喜获得" + iiiIlil1.prizeName + " 🎁");
                break;
              case 7:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + iiiIlil1.prizeName + " 🎁");
                break;
              default:
                console.log(iiiIlil1);
                break;
            } else $.completeCount == $.finishNum && console.log("💨 空气");
          } else {
            console.log(l11I1Iii.resp_msg);
            for (let Iiil1iIl of ["未开始", "结束", "不存在", "不在"]) {
              if (l11I1Iii.resp_msg.includes(Iiil1iIl)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          l1Il1IiI.status == 200 && refreshToken(l1Il1IiI);
        }
      } catch (lIil1lII) {
        $.logErr(lIil1lII, l1Il1IiI);
      } finally {
        lIi1IIl();
      }
    });
  });
}
function basicInfo() {
  return new Promise(llllli1I => {
    let l11IlII = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(taskPostUrl("api/active/basicInfo", l11IlII), async (I111lIli, lilI1Il, liil1I1l) => {
      try {
        if (I111lIli) {
          console.log("" + JSON.stringify(I111lIli));
          console.log($.name + " basicInfo API请求失败，请检查网路重试");
        } else {
          liil1I1l = JSON.parse(liil1I1l);
          if (liil1I1l && liil1I1l.resp_code == 0) {
            $.actName = liil1I1l.data.actName;
            $.shopName = liil1I1l.data.shopName;
          } else console.log(liil1I1l);
          lilI1Il.status == 200 && refreshToken(lilI1Il);
        }
      } catch (ll11iliI) {
        $.logErr(ll11iliI, lilI1Il);
      } finally {
        llllli1I();
      }
    });
  });
}
function drawPrize() {
  return new Promise(Ii1I => {
    let l11I1lil = {};
    $.post(taskPostUrl("api/prize/drawPrize", l11I1lil), async (IlIil1lI, Ii11IIi, iIIll) => {
      try {
        if (IlIil1lI) {
          console.log("" + JSON.stringify(IlIil1lI));
          console.log($.name + " drawPrize API请求失败，请检查网路重试");
        } else {
          iIIll = JSON.parse(iIIll);
          iIIll && iIIll.resp_code == 0 ? ($.drawNumber = iIIll.data.drawNumber, $.prizeInfo = iIIll.data.prizeInfo || []) : console.log(iIIll);
          Ii11IIi.status == 200 && refreshToken(Ii11IIi);
        }
      } catch (ll1lili) {
        $.logErr(ll1lili, Ii11IIi);
      } finally {
        Ii1I();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IIIliIi1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IllllII = "";
    if ($.shopactivityId) IllllII = ",\"activityId\":" + $.shopactivityId;
    const liII1lii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IllllII + ",\"channel\":406}",
      ii1liilI = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(liII1lii)
      },
      ll1lll1i = await getH5st("8adfb", ii1liilI),
      iIi11Il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + liII1lii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ll1lll1i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iIi11Il, async (i1lii1ii, i1ili1li, lliiiIl) => {
      try {
        lliiiIl = lliiiIl && lliiiIl.match(/jsonp_.*?\((.*?)\);/) && lliiiIl.match(/jsonp_.*?\((.*?)\);/)[1] || lliiiIl;
        let I1iliii1 = $.toObj(lliiiIl, lliiiIl);
        if (I1iliii1 && typeof I1iliii1 == "object") {
          if (I1iliii1 && I1iliii1.success === true) {
            console.log(I1iliii1.message);
            $.errorJoinShop = I1iliii1.message;
            if (I1iliii1.result && I1iliii1.result.giftInfo) for (let iiiiilii of I1iliii1.result.giftInfo.giftList) {
              console.log("入会获得: " + iiiiilii.discountString + iiiiilii.prizeName + iiiiilii.secondLineDesc);
            }
            console.log("");
          } else I1iliii1 && typeof I1iliii1 == "object" && I1iliii1.message ? ($.errorJoinShop = I1iliii1.message, console.log("" + (I1iliii1.message || ""))) : console.log(lliiiIl);
        } else console.log(lliiiIl);
      } catch (IilIiII) {
        $.logErr(IilIiII, i1ili1li);
      } finally {
        IIIliIi1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async iIliIlI => {
    let iill11i = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const I1I1lii1 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(iill11i)
      },
      I1iiil1I = await getH5st("ef79a", I1I1lii1),
      I1iIIiil = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + iill11i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1iiil1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I1iIIiil, async (lIill1ii, IiI1iiII, IilI1I11) => {
      try {
        IilI1I11 = IilI1I11 && IilI1I11.match(/jsonp_.*?\((.*?)\);/) && IilI1I11.match(/jsonp_.*?\((.*?)\);/)[1] || IilI1I11;
        let lIiIi11i = $.toObj(IilI1I11, IilI1I11);
        if (lIiIi11i && typeof lIiIi11i == "object") lIiIi11i && lIiIi11i.success == true && (console.log("\n去加入店铺会员：" + (lIiIi11i.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = lIiIi11i.result.interestsRuleList && lIiIi11i.result.interestsRuleList[0] && lIiIi11i.result.interestsRuleList[0].interestsInfo && lIiIi11i.result.interestsRuleList[0].interestsInfo.activityId || "");else {
          console.log(IilI1I11);
        }
      } catch (llliil1) {
        $.logErr(llliil1, IiI1iiII);
      } finally {
        iIliIlI();
      }
    });
  });
}
function taskPostUrl(IIII1iII, liIi111I) {
  return {
    "url": "" + domains + "/" + wxActType + "/" + IIII1iII,
    "body": JSON.stringify(liIi111I),
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/json;charset=UTF-8",
      "Referer": activityUrl,
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA,
      "token": $.tokens
    }
  };
}
function refreshToken(I1l1ilIl) {
  if (I1l1ilIl) {
    if (I1l1ilIl.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let llIIIii1 of I1l1ilIl.headers["set-cookie"]) {
        lz_cookie[llIIIii1.split(";")[0].substr(0, llIIIii1.split(";")[0].indexOf("="))] = llIIIii1.split(";")[0].substr(llIIIii1.split(";")[0].indexOf("=") + 1);
      }
      for (const iI111lI1 of Object.keys(lz_cookie)) {
        cookie += iI111lI1 + "=" + lz_cookie[iI111lI1] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(IIlillIi) {
  IIlillIi = IIlillIi || 32;
  let I1lIl1il = "abcdef0123456789",
    iII11i11 = I1lIl1il.length,
    iiIlIIiI = "";
  for (i = 0; i < IIlillIi; i++) iiIlIIiI += I1lIl1il.charAt(Math.floor(Math.random() * iII11i11));
  return iiIlIIiI;
}
function getQueryString(I1liI1l1, IiIIilI) {
  let l1lIiil1 = new RegExp("(^|[&?])" + IiIIilI + "=([^&]*)(&|$)"),
    lIiiIl = I1liI1l1.match(l1lIiil1);
  if (lIiiIl != null) {
    return decodeURIComponent(lIiiIl[2]);
  }
  return "";
}
function safeGet(lIlliIli) {
  if (!lIlliIli) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(lIlliIli) == "object") return true;
  } catch (I1ii1ll) {
    return console.log(I1ii1ll), false;
  }
}
function jsonParse(I1lIIlll) {
  if (typeof I1lIIlll == "string") {
    try {
      return JSON.parse(I1lIIlll);
    } catch (Illi1l11) {
      return console.log(Illi1l11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
