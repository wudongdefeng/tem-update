/*
活动名称：组队瓜分奖品 · 京耕
活动链接：https://jinggeng-isv.isvjcloud.com/ql/front/showPartition?id=<活动id>&user_id=<店铺id>
环境变量：jd_showPartition_activityUrl // 活动链接

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('组队瓜分奖品（京耕）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let domains = "https://jinggeng-isv.isvjcloud.com";
$.activityUrl = process.env.jd_showPartition_activityUrl ? process.env.jd_showPartition_activityUrl : "";
$.activityId = getQueryString($.activityUrl, "id");
$.userId = getQueryString($.activityUrl, "user_id");
$.token = "";
$.openCard = false;
$.exportActivityIds = "";
$.friendUuid = "";
$.friendUuids = [];
$.message = "";
$.helpTimes = -1;
$.hasHelpedTimes = 0;
$.restartNo = 1;
$.LZ_AES_PIN = "";
$.friendUuidId = 0;
$.retryCookies = [];
$.teamId = "null";
$.teamNum = 5;
$.teamIds = [];
$.teamIdIdx = 0;
$.inviterNicks = [];
let cookiesArr = [],
  cookie = "",
  activityCookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(li1iiiI => {
    cookiesArr.push(jdCookieNode[li1iiiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(l1illIiI => l1illIiI.cookie)].filter(iIii1lI1 => !!iIii1lI1);
!(async () => {
  console.log("活动入口：" + $.activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let IIIl1i1I = 0; IIIl1i1I < cookiesArr.length; IIIl1i1I++) {
    if (cookiesArr[IIIl1i1I]) {
      cookie = cookiesArr[IIIl1i1I];
      originCookie = cookiesArr[IIIl1i1I];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIIl1i1I + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await jdmodule();
      $.retry && (await jdmodule());
      if ($.stop) break;
    }
  }
})().catch(lli1IIlI => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lli1IIlI + "!", "");
}).finally(() => {
  $.done();
});
async function jdmodule() {
  $.retry = false;
  $.domain = $.activityUrl.match(/https?:\/\/([^/]+)/) && $.activityUrl.match(/https?:\/\/([^/]+)/)[1] || "";
  $.UA = "jdapp;iPhone;10.2.2;13.1.2;" + uuid() + ";M/5.0;network/wifi;ADID/;model/iPhone8,1;addressid/2308460611;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
  $.flag = 0;
  await getCK();
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  await takePostRequest("setMixNick");
  await takePostRequest("followShop");
  await $.wait(3500);
  await takePostRequest("createTeam");
  await $.wait(4000);
  $.index != 1 && (await takePostRequest("joinTeam"));
}
async function takePostRequest(llIiII1l) {
  if ($.outFlag) return;
  let iIIiIl11 = "",
    IlI1iIli = "POST";
  switch (llIiII1l) {
    case "setMixNick":
      url = "https://" + $.domain + "/front/setMixNick";
      iIIiIl11 = "strTMMixNick=" + $.token + "&userId=" + $.userId + "&source=01";
      break;
    case "createTeam":
      url = "https://" + $.domain + "/ql/front/postPartition";
      iIIiIl11 = "act_id=" + $.activityId + "&user_id=" + $.userId;
      break;
    case "followShop":
      url = "https://" + $.domain + "/front/followShop";
      iIIiIl11 = "userId=" + $.userId;
      break;
    case "joinTeam":
      url = "https://" + $.domain + "/ql/front/postPartition";
      iIIiIl11 = "act_id=" + $.activityId + "&user_id=" + $.userId + "&teamId=" + $.teamId;
      break;
    default:
      console.log("错误" + llIiII1l);
  }
  let i1II1IIl = getPostRequest(url, iIIiIl11, IlI1iIli);
  return new Promise(async lIi1iiI1 => {
    $.post(i1II1IIl, (i1lllliI, IiIiIi, IIlIli11) => {
      try {
        i1lllliI ? (IiIiIi && typeof IiIiIi.statusCode != "undefined" && IiIiIi.statusCode == 493 && (console.log(llIiII1l + " 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log("" + $.toStr(i1lllliI, i1lllliI)), console.log(llIiII1l + " API请求失败，请检查网路重试")) : (dealReturn(llIiII1l, IIlIli11), llIiII1l == "setMixNick" && setActivityCookie(IiIiIi));
      } catch (lI11lIl1) {
        console.log(lI11lIl1, IiIiIi);
      } finally {
        lIi1iiI1();
      }
    });
  });
}
async function dealReturn(ii1il1ll, I1ll1lIi) {
  let il1IlI11 = "";
  try {
    if (ii1il1ll != "accessLog" || ii1il1ll != "drawContent") {
      if (I1ll1lIi) {
        il1IlI11 = JSON.parse(I1ll1lIi);
      }
    }
  } catch (I1l1Iiii) {
    console.log(ii1il1ll + " 执行任务异常");
    console.log(I1l1Iiii);
    $.runFalag = false;
  }
  try {
    switch (ii1il1ll) {
      case "setMixNick":
        if (typeof il1IlI11 == "object") {
          if (il1IlI11.succ && il1IlI11.succ === true) $.successPeople = il1IlI11.successPeople;else il1IlI11.errorMessage ? console.log(ii1il1ll + " " + (il1IlI11.errorMessage || "")) : console.log(ii1il1ll + " " + I1ll1lIi);
        } else console.log(ii1il1ll + " " + I1ll1lIi);
        break;
      case "followShop":
        if (typeof il1IlI11 == "object") {
          if (il1IlI11.succ && il1IlI11.succ === true) {} else il1IlI11.errorMessage ? console.log(ii1il1ll + " " + (il1IlI11.errorMessage || "")) : console.log(ii1il1ll + " " + I1ll1lIi);
        } else console.log(ii1il1ll + " " + I1ll1lIi);
        break;
      case "createTeam":
        if (typeof il1IlI11 == "object") {
          $.err = il1IlI11.msg;
          if ($.err == "活动太火爆了，请稍后重试！") return;
          il1IlI11.succ && il1IlI11.succ == true ? console.log("创建队伍成功！") : console.log(il1IlI11.msg);
          I1ll1lIi = il1IlI11.data;
          rule = I1ll1lIi.remark;
          partitionTeamLogParam = I1ll1lIi.partitionTeamLogParams[0];
          jdCombatTeamSetting = partitionTeamLogParam.jdCombatTeamSetting;
          $.teamNum = I1ll1lIi.partitionSetting.teamNum;
          console.log("每队最多" + $.teamNum + "人参团");
          $.inviterNick = jdCombatTeamSetting.buyerNick;
          console.log("邀请人" + $.inviterNick);
          $.hasInviteNum = jdCombatTeamSetting.inviteNum;
          console.log("目前已有" + $.hasInviteNum + "人参团");
          createTeamId = jdCombatTeamSetting.id;
          $.teamIds.push(createTeamId);
          $.index == 1 && ($.teamId = createTeamId);
        }
        break;
      case "joinTeam":
        typeof il1IlI11 == "object" && (il1IlI11.succ && il1IlI11.succ == true ? console.log("加入队伍成功！") : il1IlI11.msg.indexOf("满") != -1 ? ($.teamIdIdx++, $.teamId = $.teamIds[$.teamIdIdx], console.log(il1IlI11.msg + "，重跑当前账号"), $.retry = true) : console.log(il1IlI11.msg));
        break;
      default:
        console.log(ii1il1ll + "-> " + I1ll1lIi);
    }
    typeof il1IlI11 == "object" && il1IlI11.errorMessage && il1IlI11.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (Il1llilI) {
    console.log(Il1llilI);
  }
}
function getCK() {
  return new Promise(Illl1i1I => {
    let liII11I1 = {
      "url": $.activityUrl + "&teamId=" + $.teamId + "&inviterNick=&sid=&un_area=13_1007_4909_59742",
      "followRedirect": false,
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 30000
    };
    $.get(liII11I1, async (i1l1IIII, I11iliI1, I1iIl1I1) => {
      try {
        i1l1IIII ? (I11iliI1 && typeof I11iliI1.statusCode != "undefined" && I11iliI1.statusCode == 493 && (console.log("getCK 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log(String(i1l1IIII)), console.log($.name + " cookie API请求失败，请检查网路重试")) : setActivityCookie(I11iliI1);
      } catch (I1iiiill) {
        $.logErr(I1iiiill, I11iliI1);
      } finally {
        Illl1i1I();
      }
    });
  });
}
function getTeam(IiIi1ll) {
  return new Promise(II11i1Ii => {
    let I1111iI = {
      "url": $.activityUrl + "&teamId=" + IiIi1ll + "&inviterNick=" + $.inviterNick + "&envNew=notwx",
      "headers": {
        "User-Agent": $.UA,
        "Cookie": "IsvToken=" + $.token + "; " + activityCookie,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN, zh-Hans; q=0.9",
        "Connection": "keep-alive",
        "Referer": "https://" + $.domain + "/ql/front/"
      },
      "timeout": 30000
    };
    $.get(I1111iI, async (I1ii1Ii, lIiil11l, llIIii1l) => {
      try {
        I1ii1Ii ? (lIiil11l && typeof lIiil11l.statusCode != "undefined" && lIiil11l.statusCode == 493 && (console.log("getTeam 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true), console.log(String(I1ii1Ii)), console.log($.name + " cookie API请求失败，请检查网路重试")) : ($.teamId == "null" ? console.log("获取自己队伍成功！") : console.log("获取队长队伍成功！"), inviterBuyerNick = llIIii1l.split("id=\"buyerNick\" value=\"")[1].split("\"")[0], console.log("邀请人ID-->" + inviterBuyerNick), inviterTeamNum = llIIii1l.split("id=\"teamNum\" value=\"")[1].split("\"")[0], inviterTeamId = llIIii1l.split("id=\"teamId\" value=\"")[1].split("\"")[0], console.log("邀请队伍Id-->" + inviterTeamId), inviterReNums = llIIii1l.split("id=\"reNums\" value=\"")[1].split("\"")[0], $.teamId == "null" && ($.inviterNicks.push(inviterBuyerNick), $.teamIds.push(inviterTeamId), $.teamId = inviterTeamId));
      } catch (ll1IlI1I) {
        $.logErr(ll1IlI1I, lIiil11l);
      } finally {
        II11i1Ii();
      }
    });
  });
}
function getPostRequest(lliiII11, Ii1i1IiI, I1i1IlI1 = "POST") {
  let I1lllIii = {
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN, zh-Hans; q=0.9",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  return lliiII11.indexOf($.domain) > -1 && (I1lllIii.Referer = $.activityUrl + "&teamId=" + $.teamId + "&inviterNick=&sid=&un_area=13_1007_4909_59742", I1lllIii.Origin = "https://" + $.domain, I1lllIii.Cookie = "" + activityCookie), {
    "url": lliiII11,
    "method": I1i1IlI1,
    "headers": I1lllIii,
    "body": Ii1i1IiI,
    "timeout": 30000
  };
}
function setActivityCookie(ili1iil1) {
  let IIliI11i = ili1iil1 && ili1iil1.headers && (ili1iil1.headers["set-cookie"] || ili1iil1.headers["Set-Cookie"] || "") || "",
    Ii11Iiil = "",
    I1llI1I1 = "",
    I1Il1l1 = "",
    i1iIiIll = "",
    Illlilii = "";
  if (IIliI11i) {
    for (let il1iIi11 of IIliI11i) {
      let lI1l1Ii1 = il1iIi11.split(";")[0].trim();
      if (lI1l1Ii1.split("=")[1]) {
        if (lI1l1Ii1.indexOf("jcloud_alb_route=") > -1) Ii11Iiil = lI1l1Ii1.replace(/ /g, "") + ";";
        if (lI1l1Ii1.indexOf("dfs=") > -1) I1llI1I1 = lI1l1Ii1.replace(/ /g, "") + ";";
        if (lI1l1Ii1.indexOf("mixNick=") > -1) I1Il1l1 = lI1l1Ii1.replace(/ /g, "") + ";";
        if (lI1l1Ii1.indexOf("userId=") > -1) i1iIiIll = lI1l1Ii1.replace(/ /g, "") + ";";
        if (lI1l1Ii1.indexOf("jwt=") > -1) Illlilii = lI1l1Ii1.replace(/ /g, "") + ";";
      }
    }
  }
  activityCookie = Ii11Iiil + " " + I1llI1I1 + " " + I1Il1l1 + " " + i1iIiIll + " " + Illlilii;
}
function getQueryString(l1i1llI1, i11I1i1l) {
  let lIIi1l11 = new RegExp("(^|[&?])" + i11I1i1l + "=([^&]*)(&|$)"),
    lIIiiI1 = l1i1llI1.match(lIIi1l11);
  if (lIIiiI1 != null) return decodeURIComponent(lIIiiI1[2]);
  return "";
}
function jsonParse(ilillI1l) {
  if (typeof ilillI1l == "string") try {
    return JSON.parse(ilillI1l);
  } catch (IlIll1i) {
    return console.log(IlIll1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function uuid(I1I1iIIi = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
  return I1I1iIIi.replace(/[xy]/g, function (i1lI11Ii) {
    const l1l1 = 16 * Math.random() | 0,
      ilII1li = "x" === i1lI11Ii ? l1l1 : 3 & l1l1 | 8;
    return ilII1li.toString(36);
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async iIi1iii1 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lilli1Ii = "";
    if ($.shopactivityId) lilli1Ii = ",\"activityId\":" + $.shopactivityId;
    const i11I11Ii = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lilli1Ii + ",\"channel\":406}",
      IiII1l1i = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(i11I11Ii)
      },
      liIlIl1l = await getH5st("8adfb", IiII1l1i),
      illililI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + i11I11Ii + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(liIlIl1l),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(illililI, async (IIIill1l, iIlIiilI, il1lIll1) => {
      try {
        il1lIll1 = il1lIll1 && il1lIll1.match(/jsonp_.*?\((.*?)\);/) && il1lIll1.match(/jsonp_.*?\((.*?)\);/)[1] || il1lIll1;
        let I1l1III1 = $.toObj(il1lIll1, il1lIll1);
        if (I1l1III1 && typeof I1l1III1 == "object") {
          if (I1l1III1 && I1l1III1.success === true) {
            console.log(I1l1III1.message);
            $.errorJoinShop = I1l1III1.message;
            if (I1l1III1.result && I1l1III1.result.giftInfo) for (let l1I1lIll of I1l1III1.result.giftInfo.giftList) {
              console.log("入会获得: " + l1I1lIll.discountString + l1I1lIll.prizeName + l1I1lIll.secondLineDesc);
            }
            console.log("");
          } else {
            if (I1l1III1 && typeof I1l1III1 == "object" && I1l1III1.message) {
              $.errorJoinShop = I1l1III1.message;
              console.log("" + (I1l1III1.message || ""));
            } else {
              console.log(il1lIll1);
            }
          }
        } else console.log(il1lIll1);
      } catch (Ii11i11I) {
        $.logErr(Ii11i11I, iIlIiilI);
      } finally {
        iIi1iii1();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async Ilil11ll => {
    let IliiI1ll = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const il11lll = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IliiI1ll)
      },
      i1lIlIll = await getH5st("ef79a", il11lll),
      liIIlIlI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + IliiI1ll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(i1lIlIll),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(liIIlIlI, async (iIII1l1, il1liiI, IIliiIll) => {
      try {
        IIliiIll = IIliiIll && IIliiIll.match(/jsonp_.*?\((.*?)\);/) && IIliiIll.match(/jsonp_.*?\((.*?)\);/)[1] || IIliiIll;
        let Il1Iii = $.toObj(IIliiIll, IIliiIll);
        if (Il1Iii && typeof Il1Iii == "object") {
          if (Il1Iii && Il1Iii.success == true) {
            console.log("\n去加入店铺会员：" + (Il1Iii.result.shopMemberCardInfo.venderCardName || ""));
            $.shopactivityId = Il1Iii.result.interestsRuleList && Il1Iii.result.interestsRuleList[0] && Il1Iii.result.interestsRuleList[0].interestsInfo && Il1Iii.result.interestsRuleList[0].interestsInfo.activityId || "";
          }
        } else console.log(IIliiIll);
      } catch (lIll1111) {
        $.logErr(lIll1111, il1liiI);
      } finally {
        Ilil11ll();
      }
    });
  });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
