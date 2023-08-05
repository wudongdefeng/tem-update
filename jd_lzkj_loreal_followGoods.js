/*
活动名称：关注商品有礼（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10053&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
环境变量：jd_lzkj_loreal_followGoods_url // 活动链接

*/

const $ = new Env('关注商品有礼（超级无线欧莱雅）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityUrl = process.env.jd_lzkj_loreal_followGoods_url,
  activityId = null,
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_followGoods_url) activityUrl = process.env.jd_lzkj_loreal_followGoods_url;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(iiIIllI1 => {
    cookiesArr.push(jdCookieNode[iiIIllI1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(i1111l1i => i1111l1i.cookie)].filter(l1l1Ii1i => !!l1l1Ii1i);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  activityType = getQueryString("" + activityUrl, "activityType");
  templateId = getQueryString("" + activityUrl, "templateId");
  if (activityUrl.includes("lorealjdcampaign-rc")) wxActType = "apps/interact";else activityUrl.includes("lzkj") ? wxActType = activityUrl.match(/\/(prod\/cc\/interact\w*)\//)[1] : console.log("暂不支持的类型");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
}
let domains = "https://" + $.domain;
!(async () => {
  if (activityId == null) {
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
  for (let illlll1 = 0; illlll1 < cookiesArr.length; illlll1++) {
    if (cookiesArr[illlll1]) {
      cookie = cookiesArr[illlll1];
      originCookie = cookiesArr[illlll1];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = illlll1 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
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
})().catch(l1ll1lil => {
  $.log("", " " + $.name + ", 失败! 原因: " + l1ll1lil + "!", "");
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
  $.getPrize = false;
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
    await activity("followGoods");
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
    $.index == 1 && console.log("店铺名称：" + $.shopName + "\n活动名称：" + $.actName + "\n");
    await getRule();
    await $.wait(300);
    for (let liiillIi = 0; liiillIi < $.krdata.length; liiillIi++) {
      $.skuInfoVO = $.krdata[liiillIi].skuInfoVO || [];
      $.taskId = $.krdata[liiillIi].taskId;
      $.krstatus = $.krdata[liiillIi].status;
      $.finishNum = $.krdata[liiillIi].finishNum;
      if ($.krstatus != 1) {
        if ($.getRule.includes("需要关注全部商品")) {
          $.skuId = "";
          console.log("类型：一键关注");
          await followGoods();
          await $.wait(parseInt(Math.random() * 500 + 500, 10));
        } else {
          for (let I1i11111 = 0; I1i11111 < $.skuInfoVO.length; I1i11111++) {
            if ($.finishNum > 0) {
              if ($.skuInfoVO[I1i11111].status == 0) {
                $.skuId = $.skuInfoVO[I1i11111].skuId;
                await followGoods();
                if ($.getPrize) break;
                $.finishNum--;
                await $.wait(parseInt(Math.random() * 500 + 500, 10));
              }
            }
          }
        }
      } else {
        console.log("已领取过奖励");
      }
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function getShopOpenCardInfo(i1l1Ilil) {
  let Il111I = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(i1l1Ilil)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(ii1i1IiI => {
    $.get(Il111I, (llI1IiIl, iiiil1l, l1IIiili) => {
      try {
        if (llI1IiIl) {
          llI1IiIl === "Response code 403 (Forbidden)" && ($.err = true, console.log(llI1IiIl));
        } else {
          res = JSON.parse(l1IIiili);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (iiIiII1i) {
        console.log(iiIiII1i);
      } finally {
        ii1i1IiI();
      }
    });
  });
}
function showMsg() {
  return new Promise(IIlil1i1 => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    IIlil1i1();
  });
}
function login(lIIIII1, l1ll1ll1) {
  return new Promise(lI1lIIil => {
    $.post(taskPostUrl(lIIIII1, l1ll1ll1), async (i11I11II, lIi1IIil, I1Ii1I) => {
      try {
        if (i11I11II) {
          console.log("" + JSON.stringify(i11I11II));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          I1Ii1I = JSON.parse(I1Ii1I);
          if (I1Ii1I && I1Ii1I.data) {
            $.tokens = I1Ii1I.data.token;
            $.customerId = I1Ii1I.data.customerId;
            $.joinVenderId = I1Ii1I.data.joinInfo.shopId;
            $.openCardUrl = I1Ii1I.data.joinInfo.openCardUrl;
            $.shopName = I1Ii1I.data.shopName;
            $.actName = I1Ii1I.data.actName;
            $.openCardUrl && ($.joinVenderId = I1Ii1I.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1]);
            $.joinDes = I1Ii1I.data.joinInfo.joinCodeInfo.joinDes;
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              await getshopactivityId();
              for (let l1iI1 = 0; l1iI1 < Array(2).length; l1iI1++) {
                if (l1iI1 > 0) console.log("第" + l1iI1 + "次 重新开卡");
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), $.OpenCard = true);
              }
            }
          } else console.log(I1Ii1I);
          lIi1IIil.status == 200 && refreshToken(lIi1IIil);
        }
      } catch (l1IIlii) {
        $.logErr(l1IIlii, lIi1IIil);
      } finally {
        lI1lIIil();
      }
    });
  });
}
function follow() {
  return new Promise(I1l1Iili => {
    let iIIiII = {};
    $.post(taskPostUrl("api/task/followShop/follow", iIIiII), async (IIilIlil, Ii1lIiil, iill1III) => {
      try {
        if (IIilIlil) {
          console.log("" + JSON.stringify(IIilIlil));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          iill1III = JSON.parse(iill1III);
          if (iill1III && iill1III.resp_code == 0) {} else {
            console.log(iill1III.resp_msg);
            for (let l111II1 of ["未开始", "结束", "不存在", "不在"]) {
              if (iill1III.resp_msg.includes(l111II1)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          Ii1lIiil.status == 200 && refreshToken(Ii1lIiil);
        }
      } catch (IlIlIlIl) {
        $.logErr(IlIlIlIl, Ii1lIiil);
      } finally {
        I1l1Iili();
      }
    });
  });
}
function activity(ill1i1Ii) {
  return new Promise(IIiiIlI => {
    let I1iI1lI1 = {};
    $.post(taskPostUrl("api/task/" + ill1i1Ii + "/getFollowGoods", I1iI1lI1), async (i1IIiIii, I1I111ll, i1ll1iIl) => {
      try {
        if (i1IIiIii) {
          console.log("" + JSON.stringify(i1IIiIii));
          console.log($.name + " activity API请求失败，请检查网路重试");
        } else {
          i1ll1iIl = JSON.parse(i1ll1iIl);
          if (i1ll1iIl && i1ll1iIl.data) $.krdata = i1ll1iIl?.["data"] || [];else {
            console.log(i1ll1iIl.resp_msg);
            for (let lIiII1il of ["未开始", "结束", "不存在", "不在"]) {
              if (i1ll1iIl.resp_msg.includes(lIiII1il)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          I1I111ll.status == 200 && refreshToken(I1I111ll);
        }
      } catch (i1llliIl) {
        $.logErr(i1llliIl, I1I111ll);
      } finally {
        IIiiIlI();
      }
    });
  });
}
function followGoods() {
  return new Promise(lIl1IIiI => {
    let llillIli = {
      "skuId": $.skuId
    };
    $.post(taskPostUrl("api/task/followGoods/followGoods", llillIli), async (llll1iil, iIll11I1, i1I1I1i1) => {
      try {
        if (llll1iil) {
          console.log("" + JSON.stringify(llll1iil));
          console.log($.name + " followGoods API请求失败，请检查网路重试");
        } else {
          i1I1I1i1 = JSON.parse(i1I1I1i1);
          if (i1I1I1i1 && i1I1I1i1.resp_code == 0) {
            if (!i1I1I1i1.data.result) console.log("💨 空气");else {
              drawInfo = i1I1I1i1.data;
              if (drawInfo) switch (drawInfo.prizeType) {
                case 1:
                  console.log("🎉 " + drawInfo.prizeName + " 🐶");
                  break;
                case 2:
                  console.log("🗑️ 优惠券");
                  break;
                case 3:
                  generateId = i1I1I1i1.data.prizeInfoId;
                  prizeName = drawInfo.prizeName;
                  console.log(i1I1I1i1);
                  console.log("🎉 恭喜获得实物~");
                  console.log("奖品名称：" + prizeName);
                  break;
                case 4:
                case 11:
                  console.log("🗑️ " + drawInfo.prizeName + " 🎟️");
                  break;
                case 5:
                  console.log("🗑️ 专享价");
                  break;
                case 6:
                  console.log("🎉 " + drawInfo.prizeName + " 🧧");
                  break;
                case 8:
                  console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                  break;
                case 7:
                case 9:
                case 10:
                case 12:
                  console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                  break;
                default:
                  console.log(drawInfo);
                  break;
              }
            }
          } else {
            console.log(i1I1I1i1.resp_msg);
            for (let liilIIll of ["未开始", "结束", "不存在", "不在"]) {
              if (i1I1I1i1.resp_msg.includes(liilIIll)) {
                $.activityEnd = true;
                break;
              }
            }
            for (let liliili of ["已领取"]) {
              if (i1I1I1i1.resp_msg.includes(liliili)) {
                $.getPrize = true;
                break;
              }
            }
          }
          iIll11I1.status == 200 && refreshToken(iIll11I1);
        }
      } catch (iI111Iil) {
        $.logErr(iI111Iil, iIll11I1);
      } finally {
        lIl1IIiI();
      }
    });
  });
}
function basicInfo() {
  return new Promise(il1l1l1 => {
    let i1IIII1 = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(taskPostUrl("api/active/basicInfo", i1IIII1), async (i1iiIIIl, IIllII1i, iliII) => {
      try {
        if (i1iiIIIl) {
          console.log("" + JSON.stringify(i1iiIIIl));
          console.log($.name + " basicInfo API请求失败，请检查网路重试");
        } else {
          iliII = JSON.parse(iliII);
          iliII && iliII.resp_code == 0 ? ($.actName = iliII.data.actName, $.shopName = iliII.data.shopName) : console.log(iliII);
          if (IIllII1i.status == 200) {
            refreshToken(IIllII1i);
          }
        }
      } catch (illl111l) {
        $.logErr(illl111l, IIllII1i);
      } finally {
        il1l1l1();
      }
    });
  });
}
function getRule() {
  return new Promise(lI1IIliI => {
    let il11lI11 = {};
    $.post(taskPostUrl("api/active/getRule", il11lI11), async (IIiIliii, lIliiI, lI1i1Il1) => {
      try {
        IIiIliii ? (console.log("" + JSON.stringify(IIiIliii)), console.log($.name + " getRule API请求失败，请检查网路重试")) : (lI1i1Il1 = JSON.parse(lI1i1Il1), lI1i1Il1 && lI1i1Il1.resp_code == 0 ? $.getRule = lI1i1Il1.data : console.log(lI1i1Il1), lIliiI.status == 200 && refreshToken(lIliiI));
      } catch (il11IiI1) {
        $.logErr(il11IiI1, lIliiI);
      } finally {
        lI1IIliI();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async ii1i1Il1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let Ii1lii1l = "";
    if ($.shopactivityId) Ii1lii1l = ",\"activityId\":" + $.shopactivityId;
    const I1I1l11i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Ii1lii1l + ",\"channel\":406}",
      lili11i1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I1I1l11i)
      },
      lIl11ill = await getH5st("8adfb", lili11i1),
      lI111iI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + I1I1l11i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIl11ill),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lI111iI, async (lIlllIIi, IIiii1li, ilIIlil1) => {
      try {
        ilIIlil1 = ilIIlil1 && ilIIlil1.match(/jsonp_.*?\((.*?)\);/) && ilIIlil1.match(/jsonp_.*?\((.*?)\);/)[1] || ilIIlil1;
        let iiI1l11 = $.toObj(ilIIlil1, ilIIlil1);
        if (iiI1l11 && typeof iiI1l11 == "object") {
          if (iiI1l11 && iiI1l11.success === true) {
            console.log(iiI1l11.message);
            $.errorJoinShop = iiI1l11.message;
            if (iiI1l11.result && iiI1l11.result.giftInfo) {
              for (let I1iIlill of iiI1l11.result.giftInfo.giftList) {
                console.log("入会获得: " + I1iIlill.discountString + I1iIlill.prizeName + I1iIlill.secondLineDesc);
              }
            }
            console.log("");
          } else iiI1l11 && typeof iiI1l11 == "object" && iiI1l11.message ? ($.errorJoinShop = iiI1l11.message, console.log("" + (iiI1l11.message || ""))) : console.log(ilIIlil1);
        } else console.log(ilIIlil1);
      } catch (Ii1ili11) {
        $.logErr(Ii1ili11, IIiii1li);
      } finally {
        ii1i1Il1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async iIIli11 => {
    let II11l1i1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const IiI1iIl = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(II11l1i1)
      },
      l1i1lIi1 = await getH5st("ef79a", IiI1iIl),
      i1l1i11I = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + II11l1i1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1i1lIi1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(i1l1i11I, async (liIl11iI, il1111lI, lIiillil) => {
      try {
        lIiillil = lIiillil && lIiillil.match(/jsonp_.*?\((.*?)\);/) && lIiillil.match(/jsonp_.*?\((.*?)\);/)[1] || lIiillil;
        let i1lIll11 = $.toObj(lIiillil, lIiillil);
        i1lIll11 && typeof i1lIll11 == "object" ? i1lIll11 && i1lIll11.success == true && (console.log("\n去加入店铺会员：" + (i1lIll11.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = i1lIll11.result.interestsRuleList && i1lIll11.result.interestsRuleList[0] && i1lIll11.result.interestsRuleList[0].interestsInfo && i1lIll11.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(lIiillil);
      } catch (iIIIi1) {
        $.logErr(iIIIi1, il1111lI);
      } finally {
        iIIli11();
      }
    });
  });
}
function taskPostUrl(l11lIlI1, IIl1l1i1) {
  return {
    "url": "" + domains + "/" + wxActType + "/" + l11lIlI1,
    "body": JSON.stringify(IIl1l1i1),
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
    },
    "timeout": 15 * 1000
  };
}
function refreshToken(I1lllIIi) {
  if (I1lllIIi) {
    if (I1lllIIi.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let l111lill of I1lllIIi.headers["set-cookie"]) {
        lz_cookie[l111lill.split(";")[0].substr(0, l111lill.split(";")[0].indexOf("="))] = l111lill.split(";")[0].substr(l111lill.split(";")[0].indexOf("=") + 1);
      }
      for (const IiIillIl of Object.keys(lz_cookie)) {
        cookie += IiIillIl + "=" + lz_cookie[IiIillIl] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getAuthorCodeList(Ill1lIl) {
  return new Promise(iIIiiii1 => {
    const IliillI = {
      "url": Ill1lIl + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IliillI, async (iII11ll1, I1l11li1, I1llIl1i) => {
      try {
        if (iII11ll1) $.getAuthorCodeListerr = false;else {
          if (I1llIl1i) I1llIl1i = JSON.parse(I1llIl1i);
          $.getAuthorCodeListerr = true;
        }
      } catch (Ill1i1Ii) {
        $.logErr(Ill1i1Ii, I1l11li1);
        I1llIl1i = null;
      } finally {
        iIIiiii1(I1llIl1i);
      }
    });
  });
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(IIiil1II) {
  IIiil1II = IIiil1II || 32;
  let iiIilili = "abcdef0123456789",
    iIIII1iI = iiIilili.length,
    iI1lliil = "";
  for (i = 0; i < IIiil1II; i++) iI1lliil += iiIilili.charAt(Math.floor(Math.random() * iIIII1iI));
  return iI1lliil;
}
function getQueryString(II1lI1il, iiIIIli1) {
  let ilIiilli = new RegExp("(^|[&?])" + iiIIIli1 + "=([^&]*)(&|$)"),
    ii1ilill = II1lI1il.match(ilIiilli);
  if (ii1ilill != null) {
    return decodeURIComponent(ii1ilill[2]);
  }
  return "";
}
function safeGet(lii1lIi) {
  if (!lii1lIi) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(lii1lIi) == "object") return true;
  } catch (l1l1IiI1) {
    return console.log(l1l1IiI1), false;
  }
}
function jsonParse(I11illIi) {
  if (typeof I11illIi == "string") {
    try {
      return JSON.parse(I11illIi);
    } catch (ii1Ii1ii) {
      return console.log(ii1Ii1ii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function random(iIlIiIiI, llllIlI1) {
  return Math.floor(Math.random() * (llllIlI1 - iIlIiIiI)) + iIlIiIiI;
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }