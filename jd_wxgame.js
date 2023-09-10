/*
活动名称：无线游戏 · 超级无线
活动链接：https://lzkj-isv.isvjd.com/wxgame/activity/activity?activityId=<活动id>
环境变量：jd_wxgame_activityId // 活动id
         jd_wxgame_addCart // 是否做加购任务，默认不做

默认助力第一个号

*/
let lnrun = 0;


const $ = new Env('无线游戏（超级无线）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')

let cookiesArr = [],
  cookie = "",
  message = "",
  ownCode = {},
  isdoTask = true,
  isplayGame = true,
  lz_cookie = {},
  wxgameActivityId = "",
  Allmessage = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(I1I1iii => {
    cookiesArr.push(jdCookieNode[I1I1iii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let cookiesData = $.getdata("CookiesJD") || "[]";
  cookiesData = JSON.parse(cookiesData);
  cookiesArr = cookiesData.map(iiiIIiII => iiiIIiII.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(ll1llI11 => !!ll1llI11);
}
process.env.jd_wxgame_activityId && process.env.jd_wxgame_activityId != "" && (wxgameActivityId = process.env.jd_wxgame_activityId);
let addCart = process.env.jd_wxgame_addCart ? process.env.jd_wxgame_addCart : "false";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("活动入口：https://lzkj-isv.isvjd.com/wxgame/activity/activity?activityId=" + wxgameActivityId);
  for (let iIliilll = 0; iIliilll < cookiesArr.length; iIliilll++) {
    if (cookiesArr[iIliilll]) {
      cookie = cookiesArr[iIliilll];
      originCookie = cookiesArr[iIliilll];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = iIliilll + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      lnrun++;if(lnrun == 7){console.log(`\n【访问接口次数达到6次，休息一分钟.....】\n`);await $.wait(120 * 1000);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.bean = 0;
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.shareUuid = ownCode || "";
      $.authorNum = "" + random(1000000, 9999999);
      $.activityId = wxgameActivityId;
      $.activityUrl = "https://lzkj-isv.isvjd.com/wxgame/activity/activity?activityId=" + $.activityId;
      message = "";
      await main();
      Allmessage !== "" && $.isNode() && (await notify.sendNotify($.name, message, "", "\n"));
    }
    if ($.outFlag || $.activityEnd) break;
  }
  if (cookiesArr.length > 1) {
    cookie = cookiesArr[0];
    originCookie = cookiesArr[0];
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
    $.index = 1;
    $.isLogin = true;
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      lnrun++;if(lnrun == 7){console.log(`\n【访问接口次数达到6次，休息一分钟.....】\n`);await $.wait(120 * 1000);lnrun = 0}
    if ($.isLogin) {
      i = 0;
      $.bean = 0;
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.shareUuid = ownCode || "";
      $.activityId = wxgameActivityId;
      $.activityUrl = "https://lzkj-isv.isvjd.com/wxgame/activity/activity?activityId=" + $.activityId + "&shareUuid=" + encodeURIComponent($.shareUuid) + "&adsource=null&shareuserid4minipg=null&shopid=" + $.venderId + "&lng=00.000000&lat=00.000000&sid=&un_area=";
      message = "";
      await main();
      Allmessage !== "" && $.isNode() && (await notify.sendNotify($.name, message, "", "\n"));
    }
  }
  Allmessage !== "" && $.isNode() && (await notify.sendNotify($.name, message, "", "\n"));
})().catch(lilIiiil => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lilIiiil + "!", "");
}).finally(() => {
  $.done();
});
async function main() {
  $.token = null;
  $.secretPin = null;
  $.startScore = null;
  $.endScore = null;
  $.rankingList = null;
  $.rankingListscore = null;
  $.gameOverRecord = null;
  $.chance = 0;
  await getFirstLZCK();
  await $.wait(500);
  if ($.index == 1) {
    await task("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
    if (!$.venderId || !$.jdActivityId) {
      $.outFlag = true;
      console.log("getSimpleActInfoVo 未能获取店铺信息");
      return;
    }
  }
  $.token = await getToken(originCookie, "https://lzkj-isv.isvjd.com");
  if ($.token) {
    await getMyPing();
    if ($.secretPin) {
      await task("common/accessLogWithAD", "venderId=" + $.venderId + "&code=99&pin=" + encodeURIComponent($.secretPin) + "&activityId=" + $.activityId + "&pageUrl=" + $.activityUrl + "&subType=app&adSource=null", 1);
      await $.wait(500);
      await task("wxActionCommon/getUserInfo", "pin=" + encodeURIComponent($.secretPin), 1);
      await $.wait(500);
      await task("activityContent", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&pinImg=" + encodeURIComponent($.pinImg) + "&nick=" + encodeURIComponent($.pin) + "&cjyxPin=&cjhyPin=&shareUuid=" + encodeURIComponent($.shareUuid));
      await $.wait(1000);
      if ($.activityContent) {
        if (isdoTask) {
          await task("myInfo", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
          await $.wait(1000);
          if ($.taskList) {
            let lIIl11l1 = false;
            for (let lI11i1l1 = 0; lI11i1l1 < $.taskList.length; lI11i1l1++) {
              $.taskType = $.taskList[lI11i1l1].taskType;
              $.maxNeed = $.taskList[lI11i1l1].maxNeed;
              $.curNum = $.taskList[lI11i1l1].curNum;
              $.remaining = $.maxNeed - $.curNum;
              if ($.curNum == $.maxNeed) continue;
              await $.wait(500);
              switch ($.taskType) {
                case "share2help":
                  if ($.index === 1) break;
                  lIIl11l1 = true;
                  $.log("去助力好友");
                  await task("helpFriend", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&shareUuid=" + encodeURIComponent($.shareUuid));
                  break;
                case "dailysign":
                  lIIl11l1 = true;
                  $.log("进行每日签到");
                  await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=dailysign&param=");
                  break;
                case "followshop":
                  lIIl11l1 = true;
                  $.log("去关注店铺");
                  await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=followshop&param=");
                  break;
                case "scanshop":
                  lIIl11l1 = true;
                  $.log("去浏览店铺");
                  await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=scanshop&param=");
                  break;
                case "add2cart":
                  if (addCart == "true") {
                    lIIl11l1 = true;
                    await task("getProduct", "type=1&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
                    for (let lillIlii = 0; lillIlii < $.getProduct.length; lillIlii++) {
                      await $.wait(500);
                      $.log("去加购商品");
                      await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=add2cart&param=" + $.getProduct[lillIlii].skuId);
                      if (lillIlii == $.remaining - 1) break;
                    }
                  }
                  break;
                case "ordersku":
                  lIIl11l1 = true;
                  await task("getProduct", "type=2&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
                  for (let IiI1i1i = 0; IiI1i1i < $.getProduct.length; IiI1i1i++) {
                    await $.wait(500);
                    $.log("去预约商品");
                    await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=ordersku&param=" + $.getProduct[IiI1i1i].skuId);
                    if (IiI1i1i == $.remaining - 1) break;
                  }
                  break;
                case "followsku":
                  lIIl11l1 = true;
                  await task("getProduct", "type=3&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
                  for (let I11li = 0; I11li < $.getProduct.length; I11li++) {
                    await $.wait(500);
                    $.log("去关注商品");
                    await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=followsku&param=" + $.getProduct[I11li].skuId);
                    if (I11li == $.remaining - 1) break;
                  }
                  break;
                case "scansku":
                  lIIl11l1 = true;
                  await task("getProduct", "type=4&activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
                  for (let I1IiI1 = 0; I1IiI1 < $.getProduct.length; I1IiI1++) {
                    await $.wait(500);
                    $.log("去浏览商品");
                    await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=scansku&param=" + $.getProduct[I1IiI1].skuId);
                    if (I1IiI1 == $.remaining - 1) break;
                  }
                  break;
                case "scanurl":
                  lIIl11l1 = true;
                  $.venue_name = JSON.parse($.taskList[lI11i1l1].params).name;
                  $.log("去浏览会场");
                  await task("doTask", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&taskId=" + $.taskList[lI11i1l1].taskId + "&param=");
                  break;
                default:
                  break;
              }
            }
            if (lIIl11l1) console.log("");
          }
        }
        if (isplayGame) {
          await task("myInfo", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
          await $.wait(1000);
          $.stopGame = false;
          $.drawTimes = 1;
          if ($.chance != 0) do {
            $.gameId = null;
            $.gameScore = random($.drawMiniScore, $.drawMiniScore + 80000);
            if ($.gameScore % 2 != 0) $.gameScore += 1;
            await task("game/start", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
            await $.wait(1000);
            if ($.gameId) {
              let l1Ii1l1 = new Date().getTime(),
                IiiIIli1 = $.md5($.gameId + "," + l1Ii1l1 + "," + $.gameScore + ",0eed6538f6e84b754ad2ab95b45c54f8");
              await task("game/end", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&score=" + $.gameScore + "&gameId=" + $.gameId + "&reqtime=" + l1Ii1l1 + "&sign=" + IiiIIli1 + "&getRank=true&getScoreRank=true&getPlayerNum=true");
            }
            await $.wait(1000);
            if ($.drawTimes == 5) {
              console.log("\n玩游戏太多次了，下次再继续吧~");
              break;
            }
            if ($.drawTimes == $.chance) break;
            $.drawTimes++;
          } while (!$.stopGame);else console.log("没有游戏机会了~");
        }
      } else $.log("未能成功获取到活动信息");
    } else $.log("没有成功获取到用户信息");
  } else $.log("没有成功获取到用户鉴权信息");
}
function task(lli1i1il, liIIlIi, II1Iiil = 0) {
  return new Promise(iiliIl11 => {
    $.post(taskUrl(lli1i1il, liIIlIi, II1Iiil), async (iiIiIIii, iIIliiil, l1IlIi1I) => {
      try {
        if (iiIiIIii) $.log(iiIiIIii);else {
          if (l1IlIi1I) {
            l1IlIi1I = JSON.parse(l1IlIi1I);
            if (iIIliiil.headers["set-cookie"]) {
              cookie = "";
              for (let iIliIii1 of iIIliiil.headers["set-cookie"]) {
                lz_cookie[iIliIii1.split(";")[0].substr(0, iIliIii1.split(";")[0].indexOf("="))] = iIliIii1.split(";")[0].substr(iIliIii1.split(";")[0].indexOf("=") + 1);
              }
              for (const IlIiI11i of Object.keys(lz_cookie)) {
                cookie += IlIiI11i + "=" + lz_cookie[IlIiI11i] + ";";
              }
            }
            if (l1IlIi1I.result) {
              switch (lli1i1il) {
                case "customer/getSimpleActInfoVo":
                  $.jdActivityId = l1IlIi1I.data.jdActivityId;
                  $.venderId = l1IlIi1I.data.venderId;
                  $.activityType = l1IlIi1I.data.activityType;
                  break;
                case "activityContent":
                  $.activityContent = l1IlIi1I.data.activityId;
                  $.activityName = l1IlIi1I.data.activityName;
                  $.drawContentList = l1IlIi1I.data.drawContentList;
                  $.drawMiniScore = l1IlIi1I.data.drawMiniScore;
                  if ($.index === 1) {
                    ownCode = l1IlIi1I.data.uid;
                    let iI1Iii1 = prizeId = prizeName = "";
                    for (let I11Iil1I = 0; I11Iil1I < $.drawContentList.length; I11Iil1I++) {
                      prizeName = $.drawContentList[I11Iil1I].name;
                      prizeId = $.drawContentList[I11Iil1I].id;
                      if (prizeId == 0) {
                        iI1Iii1 += "谢谢参与";
                        break;
                      } else {
                        I11Iil1I != $.drawContentList.length - 1 ? iI1Iii1 += prizeName + "，" : iI1Iii1 += "" + prizeName;
                      }
                    }
                    console.log("活动名称：" + $.activityName + "\n活动奖品：" + iI1Iii1 + "\n");
                  }
                  break;
                case "wxActionCommon/getUserInfo":
                  if (l1IlIi1I.data.yunMidImageUrl) {
                    if ($.index === 1) {
                      ownCode.pinImg = l1IlIi1I.data.yunMidImageUrl;
                      ownCode.nickname = l1IlIi1I.data.nickname;
                    }
                    $.pinImg = l1IlIi1I.data.yunMidImageUrl;
                  } else {
                    $.index === 1 && (ownCode.pinImg = "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png", ownCode.nickname = l1IlIi1I.data.nickname);
                    $.pinImg = "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
                  }
                  break;
                case "helpFriend":
                  $.helpFriend = l1IlIi1I.data.helpFriendMsg;
                  console.log("  >> " + $.helpFriend);
                  break;
                case "gameOverRecord":
                  $.gameOverRecord = l1IlIi1I.data;
                  break;
                case "wxAssemblePage/shopinfo":
                  break;
                case "rankingList":
                  $.rankingList = l1IlIi1I.data;
                  break;
                case "doTask":
                  if (l1IlIi1I.result && l1IlIi1I.result === true) console.log("  >> 任务完成");else l1IlIi1I.errorMessage ? console.log("  >> " + (l1IlIi1I.errorMessage || "任务失败")) : console.log(l1IlIi1I);
                  break;
                case "getProduct":
                  $.getProduct = l1IlIi1I.data;
                  break;
                case "game/start":
                  $.gameId = l1IlIi1I.data;
                  break;
                case "game/end":
                  if (l1IlIi1I.result && l1IlIi1I.result === true) {
                    await $.wait(500);
                    let l1ilIlI = new Date().getTime().toString();
                    await task("game/luckyDraw", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&score=" + $.gameScore + "&gameId=" + $.gameId + "&reqtime=" + l1ilIlI + "&sign=" + $.md5($.gameId + "," + l1ilIlI + ",0eed6538f6e84b754ad2ab95b45c54f8"));
                  } else l1IlIi1I.errorMessage ? console.log(l1IlIi1I.errorMessage) : console.log(JSON.stringify(l1IlIi1I));
                  break;
                case "game/luckyDraw":
                  if (l1IlIi1I.data.drawOk === true) {
                    let l11iIii1 = l1IlIi1I.data.drawInfo;
                    switch (l11iIii1.type) {
                      case 6:
                        console.log("🎉 " + l11iIii1.name + " 🐶");
                        break;
                      case 7:
                        const I1iIiII1 = l1IlIi1I.data.addressId;
                        prizeName = l11iIii1.name;
                        console.log("🎉 恭喜获得实物~");
                        console.log("奖品名称：" + prizeName);
                        console.log("参考价值：" + l11iIii1.priceInfo + "（元）");
                        if (l11iIii1.showImage) console.log("预览图片：" + l11iIii1.showImage);
                        let iIliIli1 = await wxSavePrize("https://lzkj-isv.isvjd.com", cookie, "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", $.activityId, $.activityType, $.venderId, $.secretPin, prizeName, I1iIiII1);
                        iIliIli1 ? $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，已成功自动登记收货地址\n\n" + $.activityUrl)) : $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + $.activityUrl));
                        break;
                      case 8:
                        console.log("🗑️ 专享价");
                        break;
                      case 9:
                        console.log("🗑️ " + l11iIii1.name + " 🎟️");
                        break;
                      case 13:
                      case 14:
                      case 15:
                        console.log("🎉 恭喜获得" + l11iIii1.name + " 🎁");
                        $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + l11iIii1.name + "\n\n" + $.activityUrl));
                        break;
                      case 16:
                        console.log("🎉 " + l11iIii1.priceInfo + " 🧧");
                        break;
                      default:
                        l11iIii1.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + l11iIii1.name);
                        break;
                    }
                  } else console.log("💨 空气");
                  break;
                case "myInfo":
                  l1IlIi1I.result ? ($.taskList = l1IlIi1I.data.taskList, $.chance = l1IlIi1I.data.chance) : console.log(l1IlIi1I.errorMessage);
                  break;
                default:
                  $.log(JSON.stringify(l1IlIi1I));
                  break;
              }
            } else {
              if (l1IlIi1I.errorMessage) for (let il1iIii of ["未开始", "结束", "不存在", "不在"]) {
                if (l1IlIi1I.errorMessage.includes(il1iIii)) {
                  $.activityEnd = true;
                  break;
                }
              } else switch (lli1i1il) {
                case "game/start":
                  $.stopGame = true;
                  break;
                default:
                  $.log(JSON.stringify(l1IlIi1I));
                  break;
              }
            }
          } else $.stopGame = true;
        }
      } catch (iiIiliI1) {
        $.log(iiIiliI1);
      } finally {
        iiliIl11();
      }
    });
  });
}
function taskUrl(IiIllii1, l1l1ilil, i1Ii1I1l) {
  return {
    "url": i1Ii1I1l ? "https://lzkj-isv.isvjd.com/" + IiIllii1 : "https://lzkj-isv.isvjd.com/wxgame/" + IiIllii1,
    "headers": {
      "Host": "lzkj-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://lzkj-isv.isvjd.comm",
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": cookie
    },
    "body": l1l1ilil
  };
}
function getMyPing() {
  let illIIlil = {
    "url": "https://lzkj-isv.isvjd.com/customer/getMyPing",
    "headers": {
      "Host": "lzkj-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://lzkj-isv.isvjd.com",
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": cookie
    },
    "body": "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP&riskType=1"
  };
  return new Promise(Il1llill => {
    $.post(illIIlil, (l1i1I1l, III1I1i1, I1lli1ii) => {
      try {
        if (l1i1I1l) $.log(l1i1I1l);else {
          if (III1I1i1.headers["set-cookie"]) {
            cookie = "";
            for (let i1IilI11 of III1I1i1.headers["set-cookie"]) {
              lz_cookie[i1IilI11.split(";")[0].substr(0, i1IilI11.split(";")[0].indexOf("="))] = i1IilI11.split(";")[0].substr(i1IilI11.split(";")[0].indexOf("=") + 1);
            }
            for (const Ii1i1Ill of Object.keys(lz_cookie)) {
              cookie += Ii1i1Ill + "=" + lz_cookie[Ii1i1Ill] + ";";
            }
          }
          I1lli1ii ? (I1lli1ii = JSON.parse(I1lli1ii), I1lli1ii.result ? ($.pin = I1lli1ii.data.nickname, $.secretPin = I1lli1ii.data.secretPin) : $.log(I1lli1ii.errorMessage)) : $.log("京东返回了空数据");
        }
      } catch (ili11lIi) {
        $.log(ili11lIi);
      } finally {
        Il1llill();
      }
    });
  });
}
function getFirstLZCK() {
  return new Promise(l1lli1ll => {
    let ilIiilIl = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": $.activityUrl,
        "user-agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      },
      "timeout": 30000
    };
    $.get(ilIiilIl, async (I1iiI1Il, iIii1Ili, IiIIlIiI) => {
      try {
        if (I1iiI1Il) console.log(String(I1iiI1Il));else {
          if (iIii1Ili.headers["set-cookie"]) {
            cookie = "";
            for (let i1l1ilil of iIii1Ili.headers["set-cookie"]) {
              lz_cookie[i1l1ilil.split(";")[0].substr(0, i1l1ilil.split(";")[0].indexOf("="))] = i1l1ilil.split(";")[0].substr(i1l1ilil.split(";")[0].indexOf("=") + 1);
            }
            for (const iiiIilii of Object.keys(lz_cookie)) {
              cookie += iiiIilii + "=" + lz_cookie[iiiIilii] + ";";
            }
            $.cookie = cookie;
          }
        }
      } catch (I1Iiil11) {
        $.logErr(I1Iiil11, iIii1Ili);
      } finally {
        l1lli1ll();
      }
    });
  });
}
function random(I1i1l11I, IIi111I1) {
  return Math.floor(Math.random() * (IIi111I1 - I1i1l11I)) + I1i1l11I;
}
function getUUID(iiiiiIii = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", IIlIIilI = 0) {
  return iiiiiIii.replace(/[xy]/g, function (lIiIi1l1) {
    var i1IIIi1i = Math.random() * 16 | 0,
      iili1lli = lIiIi1l1 == "x" ? i1IIIi1i : i1IIIi1i & 3 | 8;
    return IIlIIilI ? uuid = iili1lli.toString(36).toUpperCase() : uuid = iili1lli.toString(36), uuid;
  });
}

// MD5
!(function (n) {
    'use strict'
    function t(n, t) {
        var r = (65535 & n) + (65535 & t)
        return (((n >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r)
    }
    function r(n, t) {
        return (n << t) | (n >>> (32 - t))
    }
    function e(n, e, o, u, c, f) {
        return t(r(t(t(e, n), t(u, f)), c), o)
    }
    function o(n, t, r, o, u, c, f) {
        return e((t & r) | (~t & o), n, t, u, c, f)
    }
    function u(n, t, r, o, u, c, f) {
        return e((t & o) | (r & ~o), n, t, u, c, f)
    }
    function c(n, t, r, o, u, c, f) {
        return e(t ^ r ^ o, n, t, u, c, f)
    }
    function f(n, t, r, o, u, c, f) {
        return e(r ^ (t | ~o), n, t, u, c, f)
    }
    function i(n, r) {
        ;(n[r >> 5] |= 128 << r % 32), (n[14 + (((r + 64) >>> 9) << 4)] = r)
        var e,
            i,
            a,
            d,
            h,
            l = 1732584193,
            g = -271733879,
            v = -1732584194,
            m = 271733878
        for (e = 0; e < n.length; e += 16) (i = l), (a = g), (d = v), (h = m), (g = f((g = f((g = f((g = f((g = c((g = c((g = c((g = c((g = u((g = u((g = u((g = u((g = o((g = o((g = o((g = o(g, (v = o(v, (m = o(m, (l = o(l, g, v, m, n[e], 7, -680876936)), g, v, n[e + 1], 12, -389564586)), l, g, n[e + 2], 17, 606105819)), m, l, n[e + 3], 22, -1044525330)), (v = o(v, (m = o(m, (l = o(l, g, v, m, n[e + 4], 7, -176418897)), g, v, n[e + 5], 12, 1200080426)), l, g, n[e + 6], 17, -1473231341)), m, l, n[e + 7], 22, -45705983)), (v = o(v, (m = o(m, (l = o(l, g, v, m, n[e + 8], 7, 1770035416)), g, v, n[e + 9], 12, -1958414417)), l, g, n[e + 10], 17, -42063)), m, l, n[e + 11], 22, -1990404162)), (v = o(v, (m = o(m, (l = o(l, g, v, m, n[e + 12], 7, 1804603682)), g, v, n[e + 13], 12, -40341101)), l, g, n[e + 14], 17, -1502002290)), m, l, n[e + 15], 22, 1236535329)), (v = u(v, (m = u(m, (l = u(l, g, v, m, n[e + 1], 5, -165796510)), g, v, n[e + 6], 9, -1069501632)), l, g, n[e + 11], 14, 643717713)), m, l, n[e], 20, -373897302)), (v = u(v, (m = u(m, (l = u(l, g, v, m, n[e + 5], 5, -701558691)), g, v, n[e + 10], 9, 38016083)), l, g, n[e + 15], 14, -660478335)), m, l, n[e + 4], 20, -405537848)), (v = u(v, (m = u(m, (l = u(l, g, v, m, n[e + 9], 5, 568446438)), g, v, n[e + 14], 9, -1019803690)), l, g, n[e + 3], 14, -187363961)), m, l, n[e + 8], 20, 1163531501)), (v = u(v, (m = u(m, (l = u(l, g, v, m, n[e + 13], 5, -1444681467)), g, v, n[e + 2], 9, -51403784)), l, g, n[e + 7], 14, 1735328473)), m, l, n[e + 12], 20, -1926607734)), (v = c(v, (m = c(m, (l = c(l, g, v, m, n[e + 5], 4, -378558)), g, v, n[e + 8], 11, -2022574463)), l, g, n[e + 11], 16, 1839030562)), m, l, n[e + 14], 23, -35309556)), (v = c(v, (m = c(m, (l = c(l, g, v, m, n[e + 1], 4, -1530992060)), g, v, n[e + 4], 11, 1272893353)), l, g, n[e + 7], 16, -155497632)), m, l, n[e + 10], 23, -1094730640)), (v = c(v, (m = c(m, (l = c(l, g, v, m, n[e + 13], 4, 681279174)), g, v, n[e], 11, -358537222)), l, g, n[e + 3], 16, -722521979)), m, l, n[e + 6], 23, 76029189)), (v = c(v, (m = c(m, (l = c(l, g, v, m, n[e + 9], 4, -640364487)), g, v, n[e + 12], 11, -421815835)), l, g, n[e + 15], 16, 530742520)), m, l, n[e + 2], 23, -995338651)), (v = f(v, (m = f(m, (l = f(l, g, v, m, n[e], 6, -198630844)), g, v, n[e + 7], 10, 1126891415)), l, g, n[e + 14], 15, -1416354905)), m, l, n[e + 5], 21, -57434055)), (v = f(v, (m = f(m, (l = f(l, g, v, m, n[e + 12], 6, 1700485571)), g, v, n[e + 3], 10, -1894986606)), l, g, n[e + 10], 15, -1051523)), m, l, n[e + 1], 21, -2054922799)), (v = f(v, (m = f(m, (l = f(l, g, v, m, n[e + 8], 6, 1873313359)), g, v, n[e + 15], 10, -30611744)), l, g, n[e + 6], 15, -1560198380)), m, l, n[e + 13], 21, 1309151649)), (v = f(v, (m = f(m, (l = f(l, g, v, m, n[e + 4], 6, -145523070)), g, v, n[e + 11], 10, -1120210379)), l, g, n[e + 2], 15, 718787259)), m, l, n[e + 9], 21, -343485551)), (l = t(l, i)), (g = t(g, a)), (v = t(v, d)), (m = t(m, h))
        return [l, g, v, m]
    }
    function a(n) {
        var t,
            r = '',
            e = 32 * n.length
        for (t = 0; t < e; t += 8) r += String.fromCharCode((n[t >> 5] >>> t % 32) & 255)
        return r
    }
    function d(n) {
        var t,
            r = []
        for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0
        var e = 8 * n.length
        for (t = 0; t < e; t += 8) r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32
        return r
    }
    function h(n) {
        return a(i(d(n), 8 * n.length))
    }
    function l(n, t) {
        var r,
            e,
            o = d(n),
            u = [],
            c = []
        for (u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0; r < 16; r += 1) (u[r] = 909522486 ^ o[r]), (c[r] = 1549556828 ^ o[r])
        return (e = i(u.concat(d(t)), 512 + 8 * t.length)), a(i(c.concat(e), 640))
    }
    function g(n) {
        var t,
            r,
            e = ''
        for (r = 0; r < n.length; r += 1) (t = n.charCodeAt(r)), (e += '0123456789abcdef'.charAt((t >>> 4) & 15) + '0123456789abcdef'.charAt(15 & t))
        return e
    }
    function v(n) {
        return decodeURIComponent(encodeURIComponent(n))
    }
    function m(n) {
        return h(v(n))
    }
    function p(n) {
        return g(m(n))
    }
    function s(n, t) {
        return l(v(n), v(t))
    }
    function C(n, t) {
        return g(s(n, t))
    }
    function A(n, t, r) {
        return t ? (r ? s(t, n) : C(t, n)) : r ? m(n) : p(n)
    }
    $.md5 = A
})(this)

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
