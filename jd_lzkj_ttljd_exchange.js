/*
6.21-7.20 天天签到领京豆兑换

————————————————
入口：[ 6.21-7.20 天天签到领京豆兑换 ]

每天晚上 9点 开始兑换 自行定时

请求太频繁会被黑ip
过10分钟再执行

//export jd_opencard_blacklist="" // 黑名单 用&隔开 pin值
//export JD_LZ_OPENCARD="false" //关闭开卡相关活动运行

cron:1 9 * * *
============Quantumultx===============
[task_local]
#6.21-7.20 天天签到领京豆兑换
1 9 * * * jd_lzkj_ttljd_exchange, tag=6.21-7.20 天天签到领京豆兑换, enabled=true

*/

const $ = new Env('6.21-7.20 天天签到领京豆兑换');
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "",
  notify = $.isNode() ? require("./sendNotify") : "",
  getToken = require("./function/krgetToken");
let domains = "https://lzdz-isv.isvjcloud.com",
  lz_cookie = {},
  cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(ill1iIll => {
    cookiesArr.push(jdCookieNode[ill1iIll]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(iIlii1li => iIlii1li.cookie)].filter(il1llll => !!il1llll);
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let actorUuidArr = [],
  lz_jdpin_token_cookie = "",
  activityCookie = "",
  whitelist = "",
  blacklist = "";
$.whitelist = process.env.jd_opencard_whitelist || whitelist;
$.blacklist = process.env.jd_opencard_blacklist || blacklist;
getWhitelist();
getBlacklist();
$.errMsgPin = [];
let activityUrl = "https://lzdz-isv.isvjcloud.com/m/688693/dzbddbeb43bfff40179190eb6a8e9b";
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.activityId = "dzbddbeb43bfff40179190eb6a8e9b";
  $.shareUuid = "";
  console.log("入口:\nhttps://lzdz-isv.isvjcloud.com/m/688693/dzbddbeb43bfff40179190eb6a8e9b");
  console.log("\n每天晚上 21 点后，才能兑换....\n");
  for (let iiiI1ii = 0; iiiI1ii < cookiesArr.length; iiiI1ii++) {
    cookie = cookiesArr[iiiI1ii];
    $.ownCookie = cookiesArr[iiiI1ii];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iiiI1ii + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      await getUA();
      await run();
      await $.wait(3000);
      if ($.outFlag || $.activityEnd || $.hasEnd) break;
    }
  }
  if ($.errMsgPin.length > 0) {
    let iIIlil1l = "以下账号可能是火爆，请加入黑名单\nexport jd_opencard_blacklist=\"" + $.errMsgPin.join("&") + "\"";
    allMessage += "\n" + iIIlil1l;
  }
  if ($.outFlag) {
    let I1i1iiIi = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, "", "" + I1i1iiIi);
    if ($.isNode()) await notify.sendNotify("" + $.name, "" + I1i1iiIi);
  }
  allMessage && $.msg($.name, "", "" + allMessage);
})().catch(i1i11ili => $.logErr(i1i11ili)).finally(() => $.done());
async function run() {
  try {
    $.assistCount = 0;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    $.Token = await getToken(cookie, domains);
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await getCk();
    if (activityCookie == "") {
      console.log("获取cookie失败");
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await takePostRequest("activityContent");
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    if ($.hotFlag) return;
    await takePostRequest("activityContent");
    console.log("\n总签到天数:" + $.allSign + " 连续签到天数：" + $.signCount);
    console.log("当前礼享金:" + $.allGift + " 累计活动京豆：" + $.beans);
    await takePostRequest("exchangePrizeList");
    for (let ii1lilIl = 0; ii1lilIl < $.exchangePriceList.length; ii1lilIl++) {
      console.log("\n奖品:" + $.exchangePriceList[ii1lilIl].prizeName + " --礼享金 " + $.exchangePriceList[ii1lilIl].prizeScore + "--库存 " + $.exchangePriceList[ii1lilIl].priceNum);
    }
    console.log("");
    if ($.allGift >= 150) {
      for (let lI1iIl1i = 0; lI1iIl1i < 35; lI1iIl1i++) {
        $.prizeId = 1;
        $.getPrize = false;
        $.exgStop = false;
        await takePostRequest("exchangePrize");
        if ($.getPrize || $.exgStop || $.activityEnd) break;
        await $.wait(1000);
      }
      for (let iiI11liI = 0; iiI11liI < 35; iiI11liI++) {
        $.prizeId = 2;
        $.getPrize = false;
        $.exgStop = false;
        await takePostRequest("exchangePrize");
        if ($.getPrize || $.exgStop || $.activityEnd) break;
        await $.wait(1000);
      }
    } else {
      if ($.allGift > 50 && $.allGift < 150) for (let iili1IIi = 0; iili1IIi < 35; iili1IIi++) {
        $.prizeId = 2;
        $.getPrize = false;
        $.exgStop = false;
        await takePostRequest("exchangePrize");
        if ($.getPrize || $.exgStop || $.activityEnd) break;
        await $.wait(1000);
      } else {
        if ($.allGift >= 50 && $.allGift < 100) for (let li1liil = 0; li1liil < 35; li1liil++) {
          $.prizeId = 1;
          $.getPrize = false;
          $.exgStop = false;
          await takePostRequest("exchangePrize");
          if ($.getPrize || $.exgStop || $.activityEnd) break;
          await $.wait(1000);
        } else console.log("你当前礼享金不够兑换。");
      }
    }
    if ($.index % 3 == 0) await $.wait(parseInt(Math.random() * 5000 + 5000, 10));
  } catch (Iii1IIl1) {
    console.log(Iii1IIl1);
  }
}
async function takePostRequest(IIli11) {
  if ($.outFlag) return;
  let liiIiil1 = "https://lzdz-isv.isvjcloud.com",
    l1i1IIIi = "",
    lIllii11 = "POST";
  switch (IIli11) {
    case "getMyPing":
      url = liiIiil1 + "/customer/getMyCidPing";
      l1i1IIIi = "token=" + $.Token + "&fromType=APP&userId=688693&pin=";
      break;
    case "accessLogWithAD":
      url = liiIiil1 + "/common/accessLogWithAD";
      let lii1l1l1 = "https://lzdz-isv.isvjcloud.com/m/688693/" + $.activityId + "/?shareUuid=" + $.shareUuid;
      l1i1IIIi = "venderId=688693&code=99&pin=" + encodeURIComponent($.Pin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent(lii1l1l1);
      break;
    case "activityContent":
      url = liiIiil1 + "/dingzhi/jdhomeapp/interaction/activityContent";
      l1i1IIIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&pinImg=" + encodeURIComponent("https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png") + "&nick=" + encodeURIComponent($.nickname) + "&cjyxPin=&cjhyPin=&shareUuid=" + $.shareUuid;
      break;
    case "exchangePrizeList":
      url = liiIiil1 + "/dingzhi/jdhomeapp/interaction/exchangePrizeList";
      l1i1IIIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid;
      break;
    case "exchangePrize":
      url = liiIiil1 + "/dingzhi/jdhomeapp/interaction/exchangePrize";
      l1i1IIIi = "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.Pin) + "&actorUuid=" + $.actorUuid + "&prizeId=" + $.prizeId;
      break;
    default:
      console.log("错误" + IIli11);
  }
  let il1IIi11 = getPostRequest(url, l1i1IIIi, lIllii11);
  return new Promise(async Iillliil => {
    $.post(il1IIi11, (iii1iII1, ilIil1ll, iliII1ll) => {
      try {
        setActivityCookie(ilIil1ll);
        iii1iII1 ? (ilIil1ll && typeof ilIil1ll.statusCode != "undefined" && ilIil1ll.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true), console.log("" + $.toStr(iii1iII1, iii1iII1)), console.log(IIli11 + " API请求失败，请检查网路重试")) : dealReturn(IIli11, iliII1ll);
      } catch (I1IiiIll) {
        console.log(I1IiiIll, ilIil1ll);
      } finally {
        Iillliil();
      }
    });
  });
}
async function dealReturn(iIIiiIIl, lI1i11ll) {
  let liI1111 = "";
  try {
    if (iIIiiIIl != "accessLogWithAD" || iIIiiIIl != "drawContent") {
      if (lI1i11ll) {
        liI1111 = JSON.parse(lI1i11ll);
      }
    }
  } catch (I1iIilll) {
    console.log(iIIiiIIl + " 执行任务异常");
    console.log(lI1i11ll);
    $.runFalag = false;
  }
  try {
    switch (iIIiiIIl) {
      case "getMyPing":
        if (typeof liI1111 == "object") {
          if (liI1111.result && liI1111.result === true) {
            if (liI1111.data && typeof liI1111.data.secretPin != "undefined") $.Pin = liI1111.data.secretPin;
            if (liI1111.data && typeof liI1111.data.nickname != "undefined") $.nickname = liI1111.data.nickname;
          } else liI1111.errorMessage ? (console.log(iIIiiIIl + " " + (liI1111.errorMessage || "")), $.errMsgPin.push($.UserName)) : console.log(iIIiiIIl + " " + lI1i11ll);
        } else console.log(iIIiiIIl + " " + lI1i11ll);
        break;
      case "exchangePrizeList":
        if (typeof liI1111 == "object") {
          if (liI1111.result && liI1111.result === true) $.exchangePriceList = liI1111.data.exchangePriceList || [];else liI1111.errorMessage ? console.log("" + (liI1111.errorMessage || "")) : console.log("空气");
        } else console.log("" + lI1i11ll);
        break;
      case "exchangePrize":
        if (typeof liI1111 == "object") {
          if (liI1111.result && liI1111.result === true) {
            console.log("兑换：" + liI1111.data.prizeName + " 成功");
            $.getPrize = true;
          } else {
            if (liI1111.errorMessage) {
              console.log("" + (liI1111.errorMessage || ""));
              let Il1IIiil = liI1111.errorMessage || "";
              for (let lilI1iIi of ["已兑换", "已经兑换", "重复兑换", "已兑光"]) {
                if (Il1IIiil.includes(lilI1iIi)) {
                  $.exgStop = true;
                  break;
                }
              }
            } else console.log("空气");
          }
        } else {
          console.log("" + lI1i11ll);
        }
        break;
      case "activityContent":
        if (typeof liI1111 == "object") {
          if (liI1111.result && liI1111.result === true) {
            $.actorUuid = liI1111.data.uuid || "";
            $.zhiBoStatus = liI1111.data.zhiBoStatus || false;
            $.signStatus = liI1111.data.signStatus || false;
            $.followPeonyStatus = liI1111.data.followPeonyStatus || false;
            $.iconGoStatus = liI1111.data.iconGoStatus || false;
            $.getIconStatus = liI1111.data.getIconStatus || false;
            $.allSkuAddStatus = liI1111.data.allSkuAddStatus || false;
            $.allSkuVisitStatus = liI1111.data.allSkuVisitStatus || false;
            $.remindDayStatus = liI1111.data.remindDayStatus || false;
            $.remindDrawDayStatus = liI1111.data.remindDrawDayStatus || false;
            $.skuPresellStatus = liI1111.data.skuPresellStatus || false;
            $.toMainList = liI1111.data.toMainList || [];
            $.assistCount = liI1111.data.assistCount || 0;
            $.shareCount = liI1111.data.shareCount || 0;
            $.allGift = liI1111.data.allGift || 0;
            $.beans = liI1111.data.beans || 0;
            $.allSign = liI1111.data.allSign || 0;
            $.signCount = liI1111.data.signCount || 0;
            $.assistStatus = liI1111.data.assistStatus || 0;
            $.shareCount < 5 ? actorUuidArr.push($.actorUuid) : $.shareTimes = 5;
          } else {
            if (liI1111.errorMessage) {
              if (liI1111.errorMessage.indexOf("结束") > -1) $.activityEnd = true;
              console.log(iIIiiIIl + " " + (liI1111.errorMessage || ""));
            } else console.log(iIIiiIIl + " " + lI1i11ll);
          }
        } else console.log(iIIiiIIl + " " + lI1i11ll);
        break;
      case "accessLogWithAD":
      case "drawContent":
      case "getQuestion":
        break;
      default:
        console.log(iIIiiIIl + "-> " + lI1i11ll);
    }
    typeof liI1111 == "object" && liI1111.errorMessage && liI1111.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (ili11Ii) {
    console.log(ili11Ii);
  }
}
function getPostRequest(i1Ili1l, I1IiIIiI, II1lil1l = "POST") {
  let I1IIl1Ii = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return i1Ili1l.indexOf("https://lzdz-isv.isvjcloud.com") > -1 && (I1IIl1Ii.Referer = activityUrl, I1IIl1Ii.Cookie = "" + (lz_jdpin_token_cookie && lz_jdpin_token_cookie || "") + ($.Pin && "AUTH_C_USER=" + $.Pin + ";" || "") + activityCookie), {
    "url": i1Ili1l,
    "method": II1lil1l,
    "headers": I1IIl1Ii,
    "body": I1IiIIiI,
    "timeout": 30000
  };
}
function getSimpleActInfoVo() {
  return new Promise(iI1I1iIi => {
    let l1l1iIi = {
      "url": "https://lzdz-isv.isvjcloud.com/common/brand/getSimpleActInfoVo?activityId=dzaa2168527a9d4841a94d6088bfa5",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(l1l1iIi, async (liiIIl11, II111III, i11lIliI) => {
      try {
        if (liiIIl11) {
          II111III && typeof II111III.statusCode != "undefined" && II111III.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          console.log("" + $.toStr(liiIIl11));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let i1iIl1I1 = $.toObj(i11lIliI, i11lIliI);
          if (typeof i1iIl1I1 == "object") {
            if (i1iIl1I1.result && i1iIl1I1.result === true) {
              $.endTime = i1iIl1I1.data.endTime || 0;
              $.startTimes = i1iIl1I1.data.startTime || Date.now();
            } else i1iIl1I1.errorMessage ? console.log("" + (i1iIl1I1.errorMessage || "")) : console.log("" + i11lIliI);
          } else console.log("" + i11lIliI);
        }
      } catch (iiI11iI) {
        $.logErr(iiI11iI, II111III);
      } finally {
        iI1I1iIi();
      }
    });
  });
}
function getCk() {
  return new Promise(I1i1iiI1 => {
    let I11Iil1 = {
      "url": "https://lzdz-isv.isvjcloud.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": cookie,
        "Referer": activityUrl,
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(I11Iil1, async (Ill1iiil, l11l1Ill, Ill111l1) => {
      try {
        if (Ill1iiil) {
          if (l11l1Ill && typeof l11l1Ill.statusCode != "undefined") {
            l11l1Ill.statusCode == 493 && (console.log("此ip已被限制，请过10分钟后再执行脚本\n"), $.outFlag = true);
          }
          console.log("" + $.toStr(Ill1iiil));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          let Iillllil = Ill111l1.match(/(活动已经结束)/) && Ill111l1.match(/(活动已经结束)/)[1] || "";
          Iillllil && ($.activityEnd = true, console.log("活动已结束"));
          setActivityCookie(l11l1Ill);
        }
      } catch (il11I1l) {
        $.logErr(il11I1l, l11l1Ill);
      } finally {
        I1i1iiI1();
      }
    });
  });
}
function setActivityCookie(i1ill1) {
  if (i1ill1) {
    if (i1ill1.headers["set-cookie"]) {
      cookie = $.ownCookie + ";";
      for (let i1il1l1I of i1ill1.headers["set-cookie"]) {
        lz_cookie[i1il1l1I.split(";")[0].substr(0, i1il1l1I.split(";")[0].indexOf("="))] = i1il1l1I.split(";")[0].substr(i1il1l1I.split(";")[0].indexOf("=") + 1);
      }
      for (const Iiii1 of Object.keys(lz_cookie)) {
        cookie += Iiii1 + "=" + lz_cookie[Iiii1] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = "jdapp;iPhone;10.1.4;13.1.2;" + randomString(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}
function randomString(iiillil1) {
  iiillil1 = iiillil1 || 32;
  let IiIlIlII = "abcdef0123456789",
    lIliliI1 = IiIlIlII.length,
    iIi111l = "";
  for (i = 0; i < iiillil1; i++) iIi111l += IiIlIlII.charAt(Math.floor(Math.random() * lIliliI1));
  return iIi111l;
}
function getAuthorCodeList(iil1lil) {
  return new Promise(III1Ilil => {
    const i1l1IIi1 = {
      "url": iil1lil + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(i1l1IIi1, async (Ii1IIiII, i1ll1iIi, Ii11lili) => {
      try {
        if (Ii1IIiII) $.getAuthorCodeListerr = false;else {
          if (Ii11lili) Ii11lili = JSON.parse(Ii11lili);
          $.getAuthorCodeListerr = true;
        }
      } catch (l1llIi1I) {
        $.logErr(l1llIi1I, i1ll1iIi);
        Ii11lili = null;
      } finally {
        III1Ilil(Ii11lili);
      }
    });
  });
}
function random(i11li1l1, l1ilIlii) {
  return Math.floor(Math.random() * (l1ilIlii - i11li1l1)) + i11li1l1;
}
function jsonParse(I1IIIi) {
  if (typeof I1IIIi == "string") {
    try {
      return JSON.parse(I1IIIi);
    } catch (i1Ii1I1l) {
      return console.log(i1Ii1I1l), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function getBlacklist() {
  if ($.blacklist == "") return;
  console.log("当前已设置黑名单：");
  const lliiiiii = Array.from(new Set($.blacklist.split("&")));
  console.log(lliiiiii.join("&") + "\n");
  let lI1II1i = lliiiiii,
    l1liIi1I = [],
    iI1IlIli = false;
  for (let i111lil = 0; i111lil < cookiesArr.length; i111lil++) {
    let II1I11ii = decodeURIComponent(cookiesArr[i111lil].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[i111lil].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!II1I11ii) break;
    let i1iiIiil = false;
    for (let II1lIlil of lI1II1i) {
      if (II1lIlil && II1lIlil == II1I11ii) {
        i1iiIiil = true;
        break;
      }
    }
    !i1iiIiil && (iI1IlIli = true, l1liIi1I.splice(i111lil, -1, cookiesArr[i111lil]));
  }
  if (iI1IlIli) cookiesArr = l1liIi1I;
}
function toFirst(l1iI1I11, liilllI) {
  liilllI != 0 && l1iI1I11.unshift(l1iI1I11.splice(liilllI, 1)[0]);
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const lillIi1i = Array.from(new Set($.whitelist.split("&")));
  console.log(lillIi1i.join("&") + "\n");
  let llil11il = [],
    ilIl1ii = lillIi1i;
  for (let IiIil1Il in cookiesArr) {
    let I111l = decodeURIComponent(cookiesArr[IiIil1Il].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[IiIil1Il].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    ilIl1ii.includes(I111l) && llil11il.push(cookiesArr[IiIil1Il]);
  }
  helpCookiesArr = llil11il;
  if (ilIl1ii.length > 1) for (let lliI1lIi in ilIl1ii) {
    let ii1llll1 = ilIl1ii[ilIl1ii.length - 1 - lliI1lIi];
    if (!ii1llll1) continue;
    for (let lIli1Ii1 in helpCookiesArr) {
      let il1ii1li = decodeURIComponent(helpCookiesArr[lIli1Ii1].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[lIli1Ii1].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      ii1llll1 == il1ii1li && toFirst(helpCookiesArr, lIli1Ii1);
    }
  }
}


function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
