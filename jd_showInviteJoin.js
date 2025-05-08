/*
活动名称：邀请入会赢好礼 · 京耕
活动链接：https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=<活动id>&user_id=<店铺id>
环境变量：jd_showInviteJoin_activityUrl // 活动链接
         jd_showInviteJoin_address // 实物奖品收货地址信息

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('邀请入会赢好礼（京耕）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')
const jsdom = require('jsdom')

const {
  JSDOM
} = jsdom;
let lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
$.maxHelpTimes = 0;
$.prizeData = [];
$.helpEnd = false;
$.helpCount = 0;
$.isGetAward = false;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_showInviteJoin_activityUrl) activityUrl = process.env.jd_showInviteJoin_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(lilI1IIi => {
    cookiesArr.push(jdCookieNode[lilI1IIi]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(lIililII => lIililII.cookie)].filter(Il11l11I => !!Il11l11I);
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "id");
  venderId = getQueryString("" + activityUrl, "user_id");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
} else {
  console.log("请填写活动链接");
  return;
}
let domains = "https://" + $.domain,
  isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
!(async () => {
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + venderId);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  process.env.jd_showInviteJoin_address ? UserAdd_Data_Arr = process.env.jd_showInviteJoin_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let IIlIl1ll = [];
    IIlIl1ll = UserAdd_Data_Arr.split("|");
    var II1i1lii = Math.floor(Math.random() * IIlIl1ll.length);
    if (IIlIl1ll[II1i1lii] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else IIlIl1ll = IIlIl1ll[II1i1lii];
    if (process.env.WX_ADDRESS) {
      IIlIl1ll = IIlIl1ll.split("@");
      if (IIlIl1ll.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let I1iI1i11 = 0; I1iI1i11 < 7; I1iI1i11++) {
        if (IIlIl1ll[I1iI1i11] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      IIlIl1ll = IIlIl1ll.split("@");
      if (IIlIl1ll.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let Ii11i11i = 0; Ii11i11i < 6; Ii11i11i++) {
        if (IIlIl1ll[Ii11i11i] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = IIlIl1ll[0];
    $.phone = IIlIl1ll[1];
    $.province = IIlIl1ll[2];
    $.city = IIlIl1ll[3];
    $.county = IIlIl1ll[4];
    $.address = IIlIl1ll[5];
  } else {
    console.log("请先定义环境变量 jd_showInviteJoin_address 用于设置实物类奖品的用户收货地址信息\n变量格式：收件人@手机号@省份@城市@区县@详细地址，需按照顺序依次填写，多个用管道符分开");
    return;
  }
  for (let illiIIIi = 0; illiIIIi < cookiesArr.length; illiIIIi++) {
    if (cookiesArr[illiIIIi]) {
      cookie = cookiesArr[illiIIIi];
      originCookie = cookiesArr[illiIIIi];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = illiIIIi + 1;
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
      getUA();
      await showInviteJoinz();
      if ($.hasEnd || $.outFlag || $.helpEnd) {
        break;
      }
    }
  }
  $.isGetAward = true;
  for (let liiliIil = 0; liiliIil < 1; liiliIil++) {
    if (cookiesArr[liiliIil]) {
      cookie = cookiesArr[liiliIil];
      originCookie = cookiesArr[liiliIil];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = liiliIil + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 领取奖励******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      getUA();
      await getAward();
      if ($.hasEnd || $.outFlag) {
        break;
      }
    }
  }
})().catch(IIlIIllI => {
  $.log("", " " + $.name + ", 失败! 原因: " + IIlIIllI + "!", "");
}).finally(() => {
  $.done();
});
async function showInviteJoinz() {
  $.venderId = venderId;
  $.token = "";
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.venderId) {
    await setMixNick();
    if ($.inviterNicks == "") {
      console.log("获取[inviterNick]失败！");
      return;
    }
    $.index == 1 ? $.inviterNick = $.inviterNicks : console.log("去助力好友");
    await showInviteJoin();
    await getShopOpenCardInfo({
      "venderId": $.venderId,
      "channel": "401"
    });
    if ($.openCardStatus === 0) {
      $.errorJoinShop = "";
      $.joinVenderId = $.venderId;
      await getshopactivityId();
      for (let ii11l1lI = 0; ii11l1lI < Array(5).length; ii11l1lI++) {
        if (ii11l1lI > 0) console.log("第" + ii11l1lI + "次 重新开卡");
        await joinShop();
        if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
          break;
        }
        $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && console.log("开卡失败 ，重新执行脚本");
      }
      await getShopOpenCardInfo({
        "venderId": $.venderId,
        "channel": "401"
      });
      if ($.openCardStatus === 0) {
        console.log("助力失败，未能成功加入店铺会员 ❌");
        return;
      }
    }
    await recordActPvUvData();
    await checkTokenInSession();
    if ($.index != 1) await showInviteJoin1();
    if ($.helpCount >= $.maxHelpTimes) {
      console.log("\n助力次数已满足最高奖品要求，开始领取奖品");
      $.helpEnd = true;
      return;
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
async function getAward() {
  $.prizeData = [];
  $.venderId = venderId;
  $.token = "";
  $.Pin = "";
  $.hisPin = "";
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.venderId) {
    await setMixNick();
    if ($.inviterNicks == "") {
      console.log("获取[inviterNick]失败！");
      return;
    }
    await recordActPvUvData();
    await checkTokenInSession();
    await getPrizeTask();
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function showMsg() {
  return new Promise(lIIiIi1 => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    lIIiIi1();
  });
}
async function setMixNick() {
  return new Promise(lIIlI1ll => {
    let I1II1I11 = "strTMMixNick=" + $.token + "&userId=" + $.venderId + "&source=01";
    $.post(taskPostUrl("/front/setMixNick", I1II1I11), async (lilIi1I, Ii1I1II1, lil1ilii) => {
      try {
        lilIi1I ? (console.log("" + JSON.stringify(lilIi1I)), console.log($.name + " setMixNick API请求失败，请检查网路重试")) : (lil1ilii = JSON.parse(lil1ilii), lil1ilii && lil1ilii.succ && ($.inviterNicks = lil1ilii.msg), Ii1I1II1.status == 200 && refreshToken(Ii1I1II1));
      } catch (iI1111l) {
        $.logErr(iI1111l, Ii1I1II1);
      } finally {
        lIIlI1ll();
      }
    });
  });
}
async function recordActPvUvData() {
  return new Promise(lIl1iIll => {
    let lIiIIi11 = "userId=" + $.venderId + "&actId=" + activityId;
    $.post(taskPostUrl("/ql/front/reportActivity/recordActPvUvData", lIiIIi11), async (lliIllil, iilI1Ill, iii1I11l) => {
      try {
        lliIllil ? (console.log("" + JSON.stringify(lliIllil)), console.log($.name + " recordActPvUvData API请求失败，请检查网路重试")) : iilI1Ill.status == 200 && refreshToken(iilI1Ill);
      } catch (lIi1i1i) {
        $.logErr(lIi1i1i, iilI1Ill);
      } finally {
        lIl1iIll();
      }
    });
  });
}
async function checkTokenInSession() {
  return new Promise(Ii1I1Ill => {
    let iiI1i1Ii = "userId=" + $.venderId + "&token=" + $.token;
    $.post(taskPostUrl("/front/checkTokenInSession", iiI1i1Ii), async (Il1Ilii1, i1lI1lli, l11il1lI) => {
      try {
        Il1Ilii1 ? (console.log("" + JSON.stringify(Il1Ilii1)), console.log($.name + " checkTokenInSession API请求失败，请检查网路重试")) : i1lI1lli.status == 200 && refreshToken(i1lI1lli);
      } catch (II1I11I1) {
        $.logErr(II1I11I1, i1lI1lli);
      } finally {
        Ii1I1Ill();
      }
    });
  });
}
async function receiveInviteJoinAward() {
  return new Promise(Ii1iIlI1 => {
    let lllil1i1 = "act_id=" + activityId + "&user_id=" + $.venderId + "&awardId=" + $.awardId;
    $.post(taskPostUrl("/ql/front/receiveInviteJoinAward", lllil1i1), async (llI1iil, Iil1i1Ii, IlIiilll) => {
      try {
        if (llI1iil) {
          console.log("" + JSON.stringify(llI1iil));
          console.log($.name + " receiveInviteJoinAward API请求失败，请检查网路重试");
        } else {
          IlIiilll = JSON.parse(IlIiilll);
          if (IlIiilll && IlIiilll.succ) {
            console.log("领取成功 ✅");
            let IIlll11I = JSON.parse(IlIiilll.msg);
            $.actLogId = IIlll11I.actLogId;
          } else console.log("❌ 领取失败：" + IlIiilll.msg);
          Iil1i1Ii.status == 200 && refreshToken(Iil1i1Ii);
        }
      } catch (I1l1lil) {
        $.logErr(I1l1lil, Iil1i1Ii);
      } finally {
        Ii1iIlI1();
      }
    });
  });
}
async function postBuyerInfo(iIili1I1) {
  return new Promise(iIl1iii1 => {
    let i1iii11I = "receiverName=" + encodeURIComponent($.receiver) + "&mobile=" + $.phone + "&address=" + encodeURIComponent($.province) + "+" + encodeURIComponent($.city) + "+" + encodeURIComponent($.county) + encodeURIComponent($.address) + "&log_id=" + iIili1I1 + "&user_id=" + $.venderId;
    $.post(taskPostUrl("/ql/front/postBuyerInfo", i1iii11I), async (IIiIili1, i11liI, il1Il1i) => {
      try {
        IIiIili1 ? (console.log("" + JSON.stringify(IIiIili1)), console.log($.name + " recordActPvUvData API请求失败，请检查网路重试")) : il1Il1i && il1Il1i.succ ? console.log("已自动提交收货地址 ✅") : console.log("❌ 未能自动提交收货地址信息\n" + JSON.stringify(il1Il1i));
      } catch (Ilil1Il) {
        $.logErr(Ilil1Il, i11liI);
      } finally {
        iIl1iii1();
      }
    });
  });
}
async function showInviteJoin() {
  return new Promise(IIi1i11 => {
    const ll1li1ll = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + $.venderId + "&inviterNick=" + $.inviterNick + "&isOpenCard=0",
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.venderId + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + $.venderId + "&inviterNick=" + $.inviterNick + "&isOpenCard=1",
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(ll1li1ll, async (IiilliI1, IiIiI1I, III1i1i) => {
      try {
        if (IiilliI1) {
          console.log("" + JSON.stringify(IiilliI1));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          III1i1i = III1i1i;
          if (III1i1i) {
            const lliilI1 = new JSDOM(III1i1i);
            if ($.index === 1) {
              $.buyer_znick = lliilI1.window.document.getElementById("buyer_znick").value;
              if (!$.isGetAward) console.log("你好，" + $.buyer_znick);
              let i1i1iIil = lliilI1.window.document.getElementById("inviteSetting2").value;
              await extractActivityInfo(JSON.parse(i1i1iIil));
              if (!$.isGetAward) {
                console.log("活动奖品：");
                for (let lII1IilI = 0; lII1IilI < $.prizeData.length; lII1IilI++) {
                  console.log("  " + $.prizeData[lII1IilI].level + ". " + $.prizeData[lII1IilI].name + "，剩余" + $.prizeData[lII1IilI].stock + "库存，需邀请" + $.prizeData[lII1IilI].needInvite + "人");
                  if ($.prizeData[lII1IilI].stock > 0) $.maxHelpTimes = $.prizeData[lII1IilI].needInvite;
                }
                let iI1lIlII = lliilI1.window.document.getElementById("helpLogs").value,
                  l1Ii1I1I = JSON.parse(iI1lIlII).length;
                console.log("\n当前已邀请" + l1Ii1I1I + "人");
                $.helpCount = l1Ii1I1I;
              }
            }
            let lilIIii1 = lliilI1.window.document.getElementById("errorMsg").value;
            if (lilIIii1) {
              if ($.index != 1 && !$.inviterNick) console.log("" + lilIIii1);
            }
          }
        }
      } catch (il1I111I) {
        $.logErr(il1I111I, IiIiI1I);
      } finally {
        IIi1i11();
      }
    });
  });
}
async function showInviteJoin1() {
  return new Promise(Il1ii => {
    const Il1IilII = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + $.venderId + "&inviterNick=" + $.inviterNick + "&isOpenCard=1",
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.venderId + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + $.venderId + "&inviterNick=" + $.inviterNick + "&isOpenCard=1",
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(Il1IilII, async (II1IIIi, iI1i1I1i, iiiiiiIi) => {
      try {
        if (II1IIIi) {
          console.log("" + JSON.stringify(II1IIIi));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          iiiiiiIi = iiiiiiIi;
          if (iiiiiiIi) {
            const IIII1iIl = new JSDOM(iiiiiiIi);
            if ($.index != 1) {
              let iI1l1liI = IIII1iIl.window.document.getElementById("buyerFans").value,
                lIIiIlIi = IIII1iIl.window.document.getElementById("inviteSucc").value;
              if (iI1l1liI && lIIiIlIi) {
                console.log(lIIiIlIi);
                let ll11lI1 = JSON.parse(iI1l1liI).znick;
                ll11lI1 == $.buyer_znick && lIIiIlIi.includes("成功") ? ($.helpCount++, console.log("助力成功 ✅")) : console.log("助力失败 ❌");
              } else console.log("助力失败，可能已经助力过了 ❌");
            }
          }
        }
      } catch (lIIlII1i) {
        $.logErr(lIIlII1i, iI1i1I1i);
      } finally {
        Il1ii();
      }
    });
  });
}
async function getPrizeTask() {
  return new Promise(ii11Illl => {
    const l1lIiIll = {
      "url": "https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + $.venderId + "&inviterNick=" + $.inviterNick + "&isOpenCard=0",
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": "jinggeng-isv.isvjcloud.com",
        "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.venderId + "&channel=401&returnUrl=https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + $.venderId + "&inviterNick=" + $.inviterNick + "&isOpenCard=1",
        "User-Agent": $.UA,
        "X-Requested-With": "XMLHttpRequest"
      }
    };
    $.get(l1lIiIll, async (l1Iiiii1, ill1I11, lIlli11I) => {
      try {
        if (l1Iiiii1) {
          console.log("" + JSON.stringify(l1Iiiii1));
          console.log($.name + " showInviteJoin API请求失败，请检查网路重试");
        } else {
          lIlli11I = lIlli11I;
          if (lIlli11I) {
            const l111I11l = new JSDOM(lIlli11I);
            $.prizeData = [];
            let iIII1iil = l111I11l.window.document.getElementById("inviteSetting2").value;
            await extractActivityInfo(JSON.parse(iIII1iil));
            for (let lIIiiill in $.prizeData) {
              $.awardId = $.prizeData[lIIiiill].id;
              switch ($.prizeData[lIIiiill].status) {
                case 0:
                  console.log("等级" + $.prizeData[lIIiiill].level + " " + $.prizeData[lIIiiill].name + " 奖品已领完");
                  break;
                case 1:
                  console.log("等级" + $.prizeData[lIIiiill].level + " " + $.prizeData[lIIiiill].name + " 奖品未达标");
                  break;
                case 2:
                  console.log("去领取奖品 ➜  " + $.prizeData[lIIiiill].name + "（等级" + $.prizeData[lIIiiill].level + "）");
                  $.actLogId = "";
                  await receiveInviteJoinAward($.awardId);
                  await $.wait(3000);
                  $.prizeData[lIIiiill].type == "JD_GOODS" && $.actLogId && $.actLogId != "" && (await postBuyerInfo($.prizeData[lIIiiill].id), await $.wait(2000));
                  break;
                case 3:
                  console.log("等级" + $.prizeData[lIIiiill].level + " " + $.prizeData[lIIiiill].name + " 奖品已发完或已经领取");
                  break;
              }
            }
          }
        }
      } catch (IIl1ilIl) {
        $.logErr(IIl1ilIl, ill1I11);
      } finally {
        ii11Illl();
      }
    });
  });
}
async function extractActivityInfo(ilil) {
  if (ilil.one) {
    let IIIill = ilil.one,
      I11lIIIi = IIIill.leveOneNum,
      l1iI1i11 = IIIill.id,
      IIIil1 = IIIill.awardOneStatus,
      llli1iI1 = IIIill.equityType,
      l1li1iIi = llli1iI1 == "JD_BEAN" ? IIIill.denominationShow + "京豆" : llli1iI1 == "JD_POINT" ? IIIill.denominationShow + "店铺积分" : IIIill.equityName,
      ilil1ili = IIIill.availableQuantity,
      i1lIl11 = {
        "id": l1iI1i11,
        "name": l1li1iIi,
        "level": 1,
        "status": IIIil1,
        "type": llli1iI1,
        "stock": ilil1ili,
        "needInvite": I11lIIIi
      };
    $.prizeData.push(i1lIl11);
  }
  if (ilil.two) {
    let IilI1ilI = ilil.two,
      IIIiI1I1 = IilI1ilI.leveTwoNum,
      iIiilIi1 = IilI1ilI.id,
      i1Ii1lIl = IilI1ilI.awardTwoStatus,
      Ilil111i = IilI1ilI.equityType,
      I1iI1IIl = Ilil111i == "JD_BEAN" ? IilI1ilI.denominationShow + "京豆" : Ilil111i == "JD_POINT" ? IilI1ilI.denominationShow + "店铺积分" : IilI1ilI.equityName,
      lilliiIl = IilI1ilI.availableQuantity,
      iIl11IIl = {
        "id": iIiilIi1,
        "name": I1iI1IIl,
        "level": 2,
        "status": i1Ii1lIl,
        "type": Ilil111i,
        "stock": lilliiIl,
        "needInvite": IIIiI1I1
      };
    $.prizeData.push(iIl11IIl);
  }
  if (ilil.three) {
    let IiliIiii = ilil.three,
      illlIIll = IiliIiii.leveThreeNum,
      i1i1l1lI = IiliIiii.id,
      ilililll = IiliIiii.awardThreeStatus,
      liI1IIii = IiliIiii.equityType,
      IIllI1lI = liI1IIii == "JD_BEAN" ? IiliIiii.denominationShow + "京豆" : liI1IIii == "JD_POINT" ? IiliIiii.denominationShow + "店铺积分" : IiliIiii.equityName,
      lIIIl1i1 = IiliIiii.availableQuantity,
      l1iII1ll = {
        "id": i1i1l1lI,
        "name": IIllI1lI,
        "level": 3,
        "status": ilililll,
        "type": liI1IIii,
        "stock": lIIIl1i1,
        "needInvite": illlIIll
      };
    $.prizeData.push(l1iII1ll);
  }
  if (ilil.four) {
    let liilIiIl = ilil.four,
      ll1I1I1l = liilIiIl.leveFourNum,
      IlIlIiI1 = liilIiIl.id,
      li1iiiii = liilIiIl.awardFourStatus,
      IliIlIli = liilIiIl.equityType,
      llI111lI = IliIlIli == "JD_BEAN" ? liilIiIl.denominationShow + "京豆" : IliIlIli == "JD_POINT" ? liilIiIl.denominationShow + "店铺积分" : liilIiIl.equityName,
      iIlIlI11 = liilIiIl.availableQuantity,
      lililiIl = {
        "id": IlIlIiI1,
        "name": llI111lI,
        "level": 4,
        "status": li1iiiii,
        "type": IliIlIli,
        "stock": iIlIlI11,
        "needInvite": ll1I1I1l
      };
    $.prizeData.push(lililiIl);
  }
}
function getShopOpenCardInfo(i1i11l11) {
  let ii1ii1li = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(i1i11l11)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(lI1liiii => {
    $.get(ii1ii1li, (lii11i1I, lII1IIiI, iliIlII) => {
      try {
        lii11i1I ? lii11i1I === "Response code 403 (Forbidden)" && ($.err = true, console.log(String(lii11i1I))) : (res = JSON.parse(iliIlII), res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId)));
      } catch (Il1I1Ii1) {
        console.log(Il1I1Ii1);
      } finally {
        lI1liiii();
      }
    });
  });
}
function taskPostUrl(IIi1i1li, i1Iillll) {
  return {
    "url": "" + domains + IIi1i1li,
    "body": i1Iillll,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "Host": "jinggeng-isv.isvjcloud.com",
      "Origin": "https://jinggeng-isv.isvjcloud.com",
      "Referer": "https://jinggeng-isv.isvjcloud.com/ql/front/showInviteJoin?id=" + activityId + "&user_id=" + venderId + "&inviterNick=" + $.inviterNick + "&isOpenCard=1",
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest"
    }
  };
}
function taskUrl(IiIllli, I1IIIl) {
  return {
    "url": "https://api.m.jd.com/client.action" + IiIllli,
    "body": I1IIIl,
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
function refreshToken(liIlIl) {
  if (liIlIl.headers["set-cookie"]) {
    cookie = "";
    for (let IiIillIl of liIlIl.headers["set-cookie"]) {
      lz_cookie[IiIillIl.split(";")[0].substr(0, IiIillIl.split(";")[0].indexOf("="))] = IiIillIl.split(";")[0].substr(IiIillIl.split(";")[0].indexOf("=") + 1);
    }
    for (const Ii1I1li1 of Object.keys(lz_cookie)) {
      cookie += Ii1I1li1 + "=" + lz_cookie[Ii1I1li1] + ";";
    }
    activityCookie = cookie;
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(l1IiI11i) {
  l1IiI11i = l1IiI11i || 32;
  let ilil1Iii = "abcdef0123456789",
    l1i1ili = ilil1Iii.length,
    iilIlii1 = "";
  for (i = 0; i < l1IiI11i; i++) iilIlii1 += ilil1Iii.charAt(Math.floor(Math.random() * l1i1ili));
  return iilIlii1;
}
function getQueryString(lIliiI1I, IliIllI) {
  let ll1IlIIi = new RegExp("(^|[&?])" + IliIllI + "=([^&]*)(&|$)"),
    I11lIil1 = lIliiI1I.match(ll1IlIIi);
  if (I11lIil1 != null) return decodeURIComponent(I11lIil1[2]);
  return "";
}
function safeGet(iI1iil1i) {
  if (!iI1iil1i) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(iI1iil1i) == "object") return true;
  } catch (lii11Ili) {
    return console.log(lii11Ili), false;
  }
}
function jsonParse(l1l1I1iI) {
  if (typeof l1l1I1iI == "string") try {
    return JSON.parse(l1l1I1iI);
  } catch (iil1I11i) {
    return console.log(iil1I11i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async iIlIlIli => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let liiiii1l = "";
    if ($.shopactivityId) liiiii1l = ",\"activityId\":" + $.shopactivityId;
    const ili1IlIl = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + liiiii1l + ",\"channel\":406}",
      i1111lI1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ili1IlIl)
      },
      iiii1ii1 = await getH5st("8adfb", i1111lI1),
      ilIlIIi1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + ili1IlIl + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iiii1ii1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(ilIlIIi1, async (li11iI1l, illII1Il, I1II1il) => {
      try {
        I1II1il = I1II1il && I1II1il.match(/jsonp_.*?\((.*?)\);/) && I1II1il.match(/jsonp_.*?\((.*?)\);/)[1] || I1II1il;
        let IIIIilii = $.toObj(I1II1il, I1II1il);
        if (IIIIilii && typeof IIIIilii == "object") {
          if (IIIIilii && IIIIilii.success === true) {
            console.log(IIIIilii.message);
            $.errorJoinShop = IIIIilii.message;
            if (IIIIilii.result && IIIIilii.result.giftInfo) for (let i1ilI1ii of IIIIilii.result.giftInfo.giftList) {
              console.log("入会获得: " + i1ilI1ii.discountString + i1ilI1ii.prizeName + i1ilI1ii.secondLineDesc);
            }
            console.log("");
          } else IIIIilii && typeof IIIIilii == "object" && IIIIilii.message ? ($.errorJoinShop = IIIIilii.message, console.log("" + (IIIIilii.message || ""))) : console.log(I1II1il);
        } else console.log(I1II1il);
      } catch (iIi1Iil) {
        $.logErr(iIi1Iil, illII1Il);
      } finally {
        iIlIlIli();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async Il1I1l1i => {
    let IIl1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const i11ll11I = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IIl1i)
      },
      iiliiili = await getH5st("ef79a", i11ll11I),
      IIlII1ll = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + IIl1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iiliiili),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(IIlII1ll, async (iI1lI1ll, I1I1iII1, I1lliiIi) => {
      try {
        I1lliiIi = I1lliiIi && I1lliiIi.match(/jsonp_.*?\((.*?)\);/) && I1lliiIi.match(/jsonp_.*?\((.*?)\);/)[1] || I1lliiIi;
        let llIii1lI = $.toObj(I1lliiIi, I1lliiIi);
        llIii1lI && typeof llIii1lI == "object" ? llIii1lI && llIii1lI.success == true && (console.log("\n去加入店铺会员：" + (llIii1lI.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = llIii1lI.result.interestsRuleList && llIii1lI.result.interestsRuleList[0] && llIii1lI.result.interestsRuleList[0].interestsInfo && llIii1lI.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(I1lliiIi);
      } catch (liii111I) {
        $.logErr(liii111I, I1I1iII1);
      } finally {
        Il1I1l1i();
      }
    });
  });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
