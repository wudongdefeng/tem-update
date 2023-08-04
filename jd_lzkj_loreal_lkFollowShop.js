/*
活动名称：关注店铺有礼（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10069&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
		https://lorealjdcampaign-rc.isvjcloud.com/interact/index?activityType=10069&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
环境变量：jd_lzkj_loreal_lkFollowShop_url // 活动链接

*/
const $ = new Env('关注店铺有礼（超级无线欧莱雅）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityUrl = process.env.jd_lzkj_loreal_lkFollowShop_url,
  activityId = null,
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_lkFollowShop_url) activityUrl = process.env.jd_lzkj_loreal_lkFollowShop_url;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(i1111Il => {
    cookiesArr.push(jdCookieNode[i1111Il]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(i1Ii1i => i1Ii1i.cookie)].filter(IlIlIII1 => !!IlIlIII1);
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
  for (let iIIi1iil = 0; iIIi1iil < cookiesArr.length; iIIi1iil++) {
    if (cookiesArr[iIIi1iil]) {
      cookie = cookiesArr[iIIi1iil];
      originCookie = cookiesArr[iIIi1iil];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = iIIi1iil + 1;
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
      if ($.hasEnd || $.activityEnd || $.outFlag) {
        break;
      }
    }
  }
})().catch(l1iili1l => {
  $.log("", " " + $.name + ", 失败! 原因: " + l1iili1l + "!", "");
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
  $.krfollowShop = false;
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
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    await $.wait(300);
    await activity();
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
    await drawPrize();
    await $.wait(300);
    if ($.index == 1) {
      $.prizeList = "";
      for (let Ill1l1i1 = 0; Ill1l1i1 < $.prizeInfo.length; Ill1l1i1++) {
        $.prizeName = $.prizeInfo[Ill1l1i1].prizeName;
        $.leftNum = $.prizeInfo[Ill1l1i1].leftNum;
        $.prizeType = $.prizeInfo[Ill1l1i1].prizeType;
        switch ($.prizeType) {
          case 1:
            $.prizeType = "[京豆]";
            break;
          case 2:
            $.prizeType = "[优惠券]";
            break;
          case 3:
            $.prizeType = "[实物]";
            break;
          case 4:
            $.prizeType = "[积分]";
            break;
          case 5:
            $.prizeType = "[专享价]";
            break;
          case 6:
            $.prizeType = "[红包]";
            break;
          case 7:
            $.prizeType = "[礼品卡]";
            break;
          case 8:
            $.prizeType = "[E卡]";
            break;
          case 9:
            $.prizeType = "[PLUS会员]";
            break;
          case 10:
            $.prizeType = "[爱奇艺会员]";
            break;
          case 11:
            $.prizeType = "[积分]";
            break;
          default:
            console.log("未成功获取数据");
            return;
        }
        Ill1l1i1 != $.prizeInfo.length - 1 ? $.prizeList += "" + $.prizeType + $.prizeName + "(剩余" + $.leftNum + "件)\n" : $.prizeList += "" + $.prizeType + $.prizeName + "(剩余" + $.leftNum + "件)\n";
      }
      console.log("店铺名称：" + $.shopName + "\n活动名称：" + $.actName + "\n活动奖品：" + $.prizeList);
    }
    await getUserFollowInfo();
    if ($.krfollowShop) {
      await saveFollowInfo();
      await $.wait(300);
    } else console.log("已关注过此店铺，无法参加活动");
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function getShopOpenCardInfo(il1I1Ill) {
  let illIl1i1 = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(il1I1Ill)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(li111iIl => {
    $.get(illIl1i1, (II1llII, I11lill, i11li11) => {
      try {
        if (II1llII) {
          II1llII === "Response code 403 (Forbidden)" && ($.err = true, console.log(II1llII));
        } else {
          res = JSON.parse(i11li11);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (IliIlll1) {
        console.log(IliIlll1);
      } finally {
        li111iIl();
      }
    });
  });
}
function showMsg() {
  return new Promise(l1iiii1I => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    l1iiii1I();
  });
}
function login(iIil11I, I1Ilil1I) {
  return new Promise(iIiIIi11 => {
    $.post(taskPostUrl(iIil11I, I1Ilil1I), async (I11iIi1l, ii11l1I, l1lIIIIi) => {
      try {
        if (I11iIi1l) {
          console.log("" + JSON.stringify(I11iIi1l));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          l1lIIIIi = JSON.parse(l1lIIIIi);
          if (l1lIIIIi && l1lIIIIi.data) {
            $.tokens = l1lIIIIi.data.token;
            $.customerId = l1lIIIIi.data.customerId;
            $.joinVenderId = l1lIIIIi.data.joinInfo.shopId;
            $.shopId = l1lIIIIi?.["data"]?.["joinInfo"]?.["shopId"];
            $.openCardUrl = l1lIIIIi.data.joinInfo.openCardUrl;
            $.shopName = l1lIIIIi.data.shopName;
            $.actName = l1lIIIIi.data.actName;
            $.openCardUrl && ($.joinVenderId = l1lIIIIi.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1]);
            $.joinDes = l1lIIIIi.data.joinInfo.joinCodeInfo.joinDes;
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              await getshopactivityId();
              for (let il1i1lii = 0; il1i1lii < Array(2).length; il1i1lii++) {
                if (il1i1lii > 0) console.log("第" + il1i1lii + "次 重新开卡");
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
                  break;
                }
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), $.OpenCard = true);
              }
            }
          } else console.log(l1lIIIIi);
          ii11l1I.status == 200 && refreshToken(ii11l1I);
        }
      } catch (iiiiI11I) {
        $.logErr(iiiiI11I, ii11l1I);
      } finally {
        iIiIIi11();
      }
    });
  });
}
function follow() {
  return new Promise(liii1111 => {
    let liIlIiI = {};
    $.post(taskPostUrl("api/task/followShop/follow", liIlIiI), async (Iliil111, iilIiI1I, iI1IIiii) => {
      try {
        if (Iliil111) {
          console.log("" + JSON.stringify(Iliil111));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          iI1IIiii = JSON.parse(iI1IIiii);
          if (iI1IIiii && iI1IIiii.resp_code == 0) {} else {
            console.log(iI1IIiii.resp_msg);
            for (let Iii11II1 of ["未开始", "结束", "不存在", "不在"]) {
              if (iI1IIiii.resp_msg.includes(Iii11II1)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          iilIiI1I.status == 200 && refreshToken(iilIiI1I);
        }
      } catch (l1lilliI) {
        $.logErr(l1lilliI, iilIiI1I);
      } finally {
        liii1111();
      }
    });
  });
}
function activity() {
  return new Promise(lliiII1i => {
    let iil1IIl1 = {};
    $.post(taskPostUrl("api/task/jiugongge/activity", iil1IIl1), async (lIiIlI1, i11I11II, ll11Iiii) => {
      try {
        if (lIiIlI1) {
          console.log("" + JSON.stringify(lIiIlI1));
          console.log($.name + " activity API请求失败，请检查网路重试");
        } else {
          ll11Iiii = JSON.parse(ll11Iiii);
          if (ll11Iiii && ll11Iiii.data) $.taskslist = ll11Iiii.data.taskList || [];else {
            console.log(ll11Iiii.resp_msg);
            for (let IIii1IIl of ["未开始", "结束", "不存在", "不在"]) {
              if (ll11Iiii.resp_msg.includes(IIii1IIl)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (i11I11II.status == 200) {
            refreshToken(i11I11II);
          }
        }
      } catch (li11l1li) {
        $.logErr(li11l1li, i11I11II);
      } finally {
        lliiII1i();
      }
    });
  });
}
function saveFollowInfo() {
  return new Promise(async iilIlI1l => {
    const ii1lIi = {
      "url": "https://" + $.domain + "/" + wxActType + "/api/task/lkFollowShop/saveFollowInfo?actType=" + activityType,
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
    $.get(ii1lIi, (i1i1i1l1, Il1lIlI, IIII1i) => {
      try {
        if (i1i1i1l1) {
          console.log("" + JSON.stringify(i1i1i1l1));
          console.log($.name + " saveFollowInfo API请求失败，请检查网路重试");
        } else {
          IIII1i = JSON.parse(IIII1i);
          if (IIII1i && IIII1i.resp_code == 0) {
            if (IIII1i.data === "") console.log("💨 空气");else {
              drawInfo = IIII1i.data;
              if (drawInfo) switch (drawInfo.prizeType) {
                case 1:
                  console.log("🎉 " + drawInfo.prizeName + " 🐶");
                  break;
                case 2:
                  console.log("🗑️ 优惠券");
                  break;
                case 3:
                  generateId = IIII1i.data.prizeInfoId;
                  prizeName = drawInfo.prizeName;
                  console.log(IIII1i);
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
            console.log(IIII1i.resp_msg);
            for (let ilIIl11I of ["未开始", "结束", "不存在", "不在"]) {
              if (IIII1i.resp_msg.includes(ilIIl11I)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          Il1lIlI.status == 200 && refreshToken(Il1lIlI);
        }
      } catch (iiliii11) {
        $.logErr(iiliii11, Il1lIlI);
      } finally {
        iilIlI1l(IIII1i || {});
      }
    });
  });
}
function getUserFollowInfo() {
  return new Promise(async IiIIIllI => {
    const i111i11I = {
      "url": "https://" + $.domain + "/" + wxActType + "/api/task/lkFollowShop/getUserFollowInfo",
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
    $.get(i111i11I, (l1lilli1, il111l1I, ilI11lii) => {
      try {
        if (l1lilli1) {
          console.log("" + JSON.stringify(l1lilli1));
          console.log($.name + " getUserFollowInfo API请求失败，请检查网路重试");
        } else {
          ilI11lii = JSON.parse(ilI11lii);
          if (ilI11lii && ilI11lii.resp_code == 0) {
            $.krfollowShop = ilI11lii.data.followShop;
          } else console.log(ilI11lii);
          il111l1I.status == 200 && refreshToken(il111l1I);
        }
      } catch (lliIl1Il) {
        $.logErr(lliIl1Il, il111l1I);
      } finally {
        IiIIIllI(ilI11lii || {});
      }
    });
  });
}
function basicInfo() {
  return new Promise(lIiIiII => {
    let I1li1lI = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(taskPostUrl("api/active/basicInfo", I1li1lI), async (IIIlIl1, IiilIl1I, il1i1il) => {
      try {
        IIIlIl1 ? (console.log("" + JSON.stringify(IIIlIl1)), console.log($.name + " basicInfo API请求失败，请检查网路重试")) : (il1i1il = JSON.parse(il1i1il), il1i1il && il1i1il.resp_code == 0 ? ($.actName = il1i1il.data.actName, $.shopName = il1i1il.data.shopName) : console.log(il1i1il), IiilIl1I.status == 200 && refreshToken(IiilIl1I));
      } catch (iiilliiI) {
        $.logErr(iiilliiI, IiilIl1I);
      } finally {
        lIiIiII();
      }
    });
  });
}
function drawPrize() {
  return new Promise(iliiliIi => {
    let i1ll1ll = {};
    $.post(taskPostUrl("api/prize/drawPrize", i1ll1ll), async (Il1iiiiI, lIIlI1I1, IIllIl11) => {
      try {
        if (Il1iiiiI) {
          console.log("" + JSON.stringify(Il1iiiiI));
          console.log($.name + " drawPrize API请求失败，请检查网路重试");
        } else {
          IIllIl11 = JSON.parse(IIllIl11);
          IIllIl11 && IIllIl11.resp_code == 0 ? ($.drawNumber = IIllIl11.data.drawNumber, $.prizeInfo = IIllIl11.data.prizeInfo || []) : console.log(IIllIl11);
          lIIlI1I1.status == 200 && refreshToken(lIIlI1I1);
        }
      } catch (l1l1I1i1) {
        $.logErr(l1l1I1i1, lIIlI1I1);
      } finally {
        iliiliIi();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async i1llllI => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let Il1Iiiii = "";
    if ($.shopactivityId) Il1Iiiii = ",\"activityId\":" + $.shopactivityId;
    const li1Il1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + Il1Iiiii + ",\"channel\":406}",
      Ii1l1l1I = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(li1Il1l)
      },
      lIi1iiil = await getH5st("8adfb", Ii1l1l1I),
      Ii1II1ii = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + li1Il1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lIi1iiil),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(Ii1II1ii, async (IiiI11i1, I1lll1l, lilllIIl) => {
      try {
        lilllIIl = lilllIIl && lilllIIl.match(/jsonp_.*?\((.*?)\);/) && lilllIIl.match(/jsonp_.*?\((.*?)\);/)[1] || lilllIIl;
        let i11iiIil = $.toObj(lilllIIl, lilllIIl);
        if (i11iiIil && typeof i11iiIil == "object") {
          if (i11iiIil && i11iiIil.success === true) {
            console.log(i11iiIil.message);
            $.errorJoinShop = i11iiIil.message;
            if (i11iiIil.result && i11iiIil.result.giftInfo) for (let ii111I1 of i11iiIil.result.giftInfo.giftList) {
              console.log("入会获得: " + ii111I1.discountString + ii111I1.prizeName + ii111I1.secondLineDesc);
            }
            console.log("");
          } else {
            if (i11iiIil && typeof i11iiIil == "object" && i11iiIil.message) {
              $.errorJoinShop = i11iiIil.message;
              console.log("" + (i11iiIil.message || ""));
            } else {
              console.log(lilllIIl);
            }
          }
        } else console.log(lilllIIl);
      } catch (iIiii1i) {
        $.logErr(iIiii1i, I1lll1l);
      } finally {
        i1llllI();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async liliIiil => {
    let lI111ll = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const liIill = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lI111ll)
      },
      lI1ii1I1 = await getH5st("ef79a", liIill),
      I1l11lI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + lI111ll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lI1ii1I1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(I1l11lI, async (IlIlI1Il, lIili1ii, l1Ii1l1l) => {
      try {
        l1Ii1l1l = l1Ii1l1l && l1Ii1l1l.match(/jsonp_.*?\((.*?)\);/) && l1Ii1l1l.match(/jsonp_.*?\((.*?)\);/)[1] || l1Ii1l1l;
        let I1I1IIl1 = $.toObj(l1Ii1l1l, l1Ii1l1l);
        I1I1IIl1 && typeof I1I1IIl1 == "object" ? I1I1IIl1 && I1I1IIl1.success == true && (console.log("\n去加入店铺会员：" + (I1I1IIl1.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = I1I1IIl1.result.interestsRuleList && I1I1IIl1.result.interestsRuleList[0] && I1I1IIl1.result.interestsRuleList[0].interestsInfo && I1I1IIl1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(l1Ii1l1l);
      } catch (ili11Ill) {
        $.logErr(ili11Ill, lIili1ii);
      } finally {
        liliIiil();
      }
    });
  });
}
function taskPostUrl(IilIIiIi, iii1lil) {
  return {
    "url": "" + domains + "/" + wxActType + "/" + IilIIiIi,
    "body": JSON.stringify(iii1lil),
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
function refreshToken(IlIiI1Il) {
  if (IlIiI1Il) {
    if (IlIiI1Il.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let lillIIIi of IlIiI1Il.headers["set-cookie"]) {
        lz_cookie[lillIIIi.split(";")[0].substr(0, lillIIIi.split(";")[0].indexOf("="))] = lillIIIi.split(";")[0].substr(lillIIIi.split(";")[0].indexOf("=") + 1);
      }
      for (const ii1IIi of Object.keys(lz_cookie)) {
        cookie += ii1IIi + "=" + lz_cookie[ii1IIi] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getAuthorCodeList(l1lli1I) {
  return new Promise(iIii1ii1 => {
    const liiiil11 = {
      "url": l1lli1I + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(liiiil11, async (i1iilllI, I1I1Ii1I, IIiliiIi) => {
      try {
        if (i1iilllI) {
          $.getAuthorCodeListerr = false;
        } else {
          if (IIiliiIi) IIiliiIi = JSON.parse(IIiliiIi);
          $.getAuthorCodeListerr = true;
        }
      } catch (ill1III) {
        $.logErr(ill1III, I1I1Ii1I);
        IIiliiIi = null;
      } finally {
        iIii1ii1(IIiliiIi);
      }
    });
  });
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(i1I1lllI) {
  i1I1lllI = i1I1lllI || 32;
  let iIi111Ii = "abcdef0123456789",
    iIiI1iil = iIi111Ii.length,
    ililllI = "";
  for (i = 0; i < i1I1lllI; i++) ililllI += iIi111Ii.charAt(Math.floor(Math.random() * iIiI1iil));
  return ililllI;
}
function getQueryString(l1I1ilI1, llIlIl1I) {
  let l1IiIIl = new RegExp("(^|[&?])" + llIlIl1I + "=([^&]*)(&|$)"),
    I1liiI1I = l1I1ilI1.match(l1IiIIl);
  if (I1liiI1I != null) return decodeURIComponent(I1liiI1I[2]);
  return "";
}
function safeGet(lI1IllII) {
  if (!lI1IllII) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(lI1IllII) == "object") return true;
  } catch (ii1i1Iii) {
    return console.log(ii1i1Iii), false;
  }
}
function jsonParse(ilii1) {
  if (typeof ilii1 == "string") {
    try {
      return JSON.parse(ilii1);
    } catch (i1i1il) {
      return console.log(i1i1il), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
	
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
