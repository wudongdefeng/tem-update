/*
京东特价版签到提现
自动提现微信现金
更新时间：2023-1-10

出现：签到失败:风控用户，不允许参与活动

手动能签就隔一段时间再运行一次试试。

JD_apSpeedUp // 是否加速，默认不加速 值为 true 加速 每次加速会扣除300金币

cron:20 1,17 * * *
============Quantumultx===============
[task_local]
#特价版签到提现
20 1,17 * * * jd_wechat_openGroup.js, tag=特价版签到提现, enabled=true
*/
let lnrun = 0;
const $ = new Env('特价版签到提现');
const IIlil1li = $.isNode() ? require("./sendNotify") : "",
      i11liI11 = $.isNode() ? require("./jdCookie.js") : "",
      liiilliI = require("./function/jdCommon"),
      Iill11l1 = require("./function/h5st41.js");

let l11iIili = [],
    lilI1IIl = "",
    lllllI1l;
const il1i1l1l = ["Eu7-E0CUzqYyhZJo9d3YkQ"],
      lli11Iii = "9WA12jYGulArzWS7vcrwhw";
let Ii1ill1l,
    IiIliiI = process.env.JD_apSpeedUp ? process.env.JD_apSpeedUp : "false";

if ($.isNode()) {
  Object.keys(i11liI11).forEach(llllIiiI => {
    l11iIili.push(i11liI11[llllIiiI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
} else l11iIili = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iiII1I1($.getdata("CookiesJD") || "[]").map(i1ilI1lI => i1ilI1lI.cookie)].filter(I1I1llii => !!I1I1llii);

!(async () => {
  $.krserve = false;
  authorCodeList = await l1I1i1("http://code.kingran.cf/fw.json");
  authorCodeList ? (console.log("❖ 测试连通性中...\n❖ 服务状态正常...\n"), $.krserve = authorCodeList[IliIill1(0, authorCodeList.length)]) : $.krserve = false;
  console.log("是否加速签到：" + IiIliiI);
  IiIliiI == "true" ? console.log("已设置开启加速签到，加速一次扣除 300 金币") : console.log("加速请设置变量：export JD_apSpeedUp=\"true\"");

  if (!l11iIili[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let ll1ilII1 = 0; ll1ilII1 < l11iIili.length; ll1ilII1++) {
    if (l11iIili[ll1ilII1]) {
      lilI1IIl = l11iIili[ll1ilII1];
      $.originArr = l11iIili[ll1ilII1];
      $.UserName = decodeURIComponent(lilI1IIl.match(/pt_pin=([^; ]+)(?=;?)/) && lilI1IIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = ll1ilII1 + 1;
      $.isLogin = true;
      $.nickName = "";
      lllllI1l = "";
      $.UA = liiilliI.genUA($.UserName);
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      lnrun++;if(lnrun == 4){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await IIlil1li.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      for (let l1iiIlIl = 0; l1iiIlIl < il1i1l1l.length; l1iiIlIl++) {
        Ii1ill1l = il1i1l1l[l1iiIlIl];
        await Iii1lIii();
      }
    }
  }
})().catch(lIIlliII => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lIIlliII + "!", "");
}).finally(() => {
  $.done();
});

async function Iii1lIii() {
  try {
    apSpeedUp = false;
    apSpeedUps = false;
    await IIiliI1I();

    if (IiIliiI == "true") {
      for (let lliIIii = 0; lliIIii < 3; lliIIii++) {
        if (!apSpeedUps) {
          await iii1llI();
          if (apSpeedUp) break;
        }
      }
    }

    await $.wait(1000);
    await i1i1lI();
    await $.wait(1000);
  } catch (li11llI) {
    $.logErr(li11llI);
  }
}

async function IIiliI1I() {
  return new Promise(async lIIIiIIl => {
    const IIIiiIII = {
      "functionId": "apSignIn_day",
      "appid": "activities_platform",
      "clientVersion": "1.0.0",
      "client": "H5",
      "body": {
        "linkId": lli11Iii,
        "serviceName": "dayDaySignGetRedEnvelopeSignService",
        "business": 1
      }
    },
          l1lll1I1 = await II1i1111("15097", IIIiiIII);

    if ($.krserve == "ture") {
      $.h5st = await i1lliiI1("15097", IIIiiIII);
    }

    const iliiI1lI = {
      "url": "https://api.m.jd.com",
      "body": l1lll1I1,
      "headers": {
        "Cookie": lilI1IIl,
        "Host": "api.m.jd.com",
        "Origin": "https://daily-redpacket.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": $.UA,
        "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hant-CN;q=0.8",
        "Referer": "https://daily-redpacket.jd.com/?activityId=" + lli11Iii,
        "Accept-Encoding": "gzip, deflate, br"
      }
    };
    $.post(iliiI1lI, async (IIllI1lI, I1I1illI, lil1i11I) => {
      try {
        IIllI1lI ? (console.log("" + JSON.stringify(IIllI1lI)), console.log($.name + " API请求失败，请检查网路重试")) : III1111(lil1i11I) && (lil1i11I = $.toObj(lil1i11I), lil1i11I.code === 0 ? lil1i11I.data.retCode === 0 ? console.log("签到成功\n") : console.log("签到失败:" + lil1i11I.data.retMessage) : console.log("签到异常:" + JSON.stringify(lil1i11I)));
      } catch (IlIliil1) {
        $.logErr(IlIliil1, I1I1illI);
      } finally {
        lIIIiIIl(lil1i11I);
      }
    });
  });
}

async function iii1llI() {
  return new Promise(async II11ll1i => {
    const IIl1IlIl = {
      "functionId": "apSpeedUp_day",
      "appid": "activities_platform",
      "clientVersion": "1.0.0",
      "client": "H5",
      "body": {
        "linkId": lli11Iii,
        "serviceName": "dayDaySignGetRedEnvelopeSignService",
        "business": 1
      }
    },
          I1llil1i = await II1i1111("a1acb", IIl1IlIl),
          liiliIli = {
      "url": "https://api.m.jd.com",
      "body": I1llil1i,
      "headers": {
        "Cookie": lilI1IIl,
        "Host": "api.m.jd.com",
        "Origin": "https://daily-redpacket.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": $.UA,
        "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hant-CN;q=0.8",
        "Referer": "https://daily-redpacket.jd.com/?activityId=" + lli11Iii,
        "Accept-Encoding": "gzip, deflate, br"
      }
    };
    $.post(liiliIli, async (i1lI1llI, IllIil, il1II1I) => {
      try {
        if (i1lI1llI) console.log("" + JSON.stringify(i1lI1llI)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (III1111(il1II1I)) {
            il1II1I = $.toObj(il1II1I);

            if (il1II1I.code === 0) {
              if (il1II1I.data.retCode === 0) console.log("加速成功\n");else {
                if (il1II1I.data.retCode === 10019) console.log("加速失败：不知道什么情况\n");else {
                  console.log("加速失败:" + il1II1I.data.retMessage);

                  if (il1II1I.data.retMessage === "扣减上线~") {
                    apSpeedUp = true;
                  }

                  il1II1I.data.retMessage === "风控用户，不允许参与活动" && (apSpeedUps = true);
                }
              }
            } else console.log("加速异常:" + JSON.stringify(il1II1I) + "\n");
          }
        }
      } catch (lIIl1iiI) {
        $.logErr(lIIl1iiI, IllIil);
      } finally {
        II11ll1i(il1II1I);
      }
    });
  });
}

function IIlII1li() {
  return new Promise(l1IIll1 => {
    $.get(iiliiIli("spring_reward_list", {
      "pageNum": 1,
      "pageSize": 100,
      "linkId": Ii1ill1l,
      "inviter": ""
    }), async (Iii1iili, i1Il1l1I, IilIii11) => {
      try {
        if (Iii1iili) {
          console.log("" + JSON.stringify(Iii1iili));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (III1111(IilIii11)) {
            IilIii11 = JSON.parse(IilIii11);

            if (IilIii11.code === 0) {
              for (let iiIIl1I of IilIii11.data.items.filter(I11li1lI => I11li1lI.prizeType === 4)) {
                iiIIl1I.state === 0 && (console.log("去提现" + iiIIl1I.amount + "微信现金"), await IiIllI1i(iiIIl1I.id, iiIIl1I.poolBaseId, iiIIl1I.prizeGroupId, iiIIl1I.prizeBaseId));
              }
            } else console.log(IilIii11.errMsg);
          }
        }
      } catch (IiilIlii) {
        $.logErr(IiilIlii, i1Il1l1I);
      } finally {
        l1IIll1(IilIii11);
      }
    });
  });
}

function i1i1lI() {
  return new Promise(iilIllli => {
    const ilill1II = {
      "linkId": lli11Iii,
      "serviceName": "dayDaySignGetRedEnvelopeSignService",
      "business": 1,
      "pageSize": 20,
      "page": 1
    },
          Iii1I1Ii = {
      "url": "https://api.m.jd.com",
      "body": "functionId=signPrizeDetailList&body=" + escape(JSON.stringify(ilill1II)) + "&_t=" + +new Date() + "&appid=activities_platform",
      "headers": {
        "Cookie": lilI1IIl,
        "Host": "api.m.jd.com",
        "Origin": "https://daily-redpacket.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": "jdltapp;iPhone;3.3.2;14.5.1network/wifi;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;model/iPhone13,2;addressid/137923973;hasOCPay/0;appBuild/1047;supportBestPay/0;pv/467.11;apprpd/MyJD_Main;",
        "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hant-CN;q=0.8",
        "Referer": "https://daily-redpacket.jd.com/?activityId=" + lli11Iii,
        "Accept-Encoding": "gzip, deflate, br"
      }
    };
    $.post(Iii1I1Ii, async (lIi1li11, iIiIlli1, li1lIi1i) => {
      try {
        if (lIi1li11) console.log("" + JSON.stringify(lIi1li11)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (III1111(li1lIi1i)) {
            li1lIi1i = $.toObj(li1lIi1i);

            if (li1lIi1i.code === 0) {
              if (li1lIi1i.data.code === 0) {
                const lilIIII = (li1lIi1i.data.prizeDrawBaseVoPageBean.items || []).filter(I11Ii11 => I11Ii11.prizeType === 4 && I11Ii11.prizeStatus === 0);

                for (let l1Ii1li of lilIIII) {
                  console.log("特价版签到提现，去提现" + l1Ii1li.prizeValue + "现金");
                  await I1lIilI(l1Ii1li.id, l1Ii1li.poolBaseId, l1Ii1li.prizeGroupId, l1Ii1li.prizeBaseId);
                }
              } else console.log("极速版签到查询奖品：失败:" + JSON.stringify(li1lIi1i));
            } else console.log("极速版签到查询奖品：异常:" + JSON.stringify(li1lIi1i));
          }
        }
      } catch (i1il1Iii) {
        $.logErr(i1il1Iii, iIiIlli1);
      } finally {
        iilIllli(li1lIi1i);
      }
    });
  });
}

function I1lIilI(i1II1il1, lllI1iil, iiliIiiI, l1lilIi) {
  return new Promise(lIl11I => {
    const i111ill1 = {
      "linkId": lli11Iii,
      "businessSource": "DAY_DAY_RED_PACKET_SIGN",
      "base": {
        "prizeType": 4,
        "business": "dayDayRedPacket",
        "id": i1II1il1,
        "poolBaseId": lllI1iil,
        "prizeGroupId": iiliIiiI,
        "prizeBaseId": l1lilIi
      }
    },
          i1lIIi1 = {
      "url": "https://api.m.jd.com",
      "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(i111ill1)) + "&_t=" + +new Date() + "&appid=activities_platform",
      "headers": {
        "Cookie": lilI1IIl,
        "Host": "api.m.jd.com",
        "Origin": "https://daily-redpacket.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "*/*",
        "Connection": "keep-alive",
        "User-Agent": "jdltapp;iPhone;3.3.2;14.5.1network/wifi;hasUPPay/0;pushNoticeIsOpen/1;lang/zh_CN;model/iPhone13,2;addressid/137923973;hasOCPay/0;appBuild/1047;supportBestPay/0;pv/467.11;apprpd/MyJD_Main;",
        "Accept-Language": "zh-Hans-CN;q=1, en-CN;q=0.9, zh-Hant-CN;q=0.8",
        "Referer": "https://daily-redpacket.jd.com/?activityId=" + lli11Iii,
        "Accept-Encoding": "gzip, deflate, br"
      }
    };
    $.post(i1lIIi1, async (lilllII, il1i1Ill, ii1l1) => {
      try {
        if (lilllII) console.log("" + JSON.stringify(lilllII)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (III1111(ii1l1)) {
            ii1l1 = $.toObj(ii1l1);

            if (ii1l1.code === 0) {
              if (ii1l1.data.status === "310") console.log("特价版签到提现现金成功！");else {
                console.log("极速版签到提现现金：失败:" + JSON.stringify(ii1l1));
              }
            } else console.log("极速版签到提现现金：异常:" + JSON.stringify(ii1l1));
          }
        }
      } catch (i1i1II1l) {
        $.logErr(i1i1II1l, il1i1Ill);
      } finally {
        lIl11I(ii1l1);
      }
    });
  });
}

function IiIllI1i(iill1lIi, il1li11i, iIl1l1iI, IIl11il) {
  let ll1llI1l = {
    "businessSource": "SPRING_FESTIVAL_RED_ENVELOPE",
    "base": {
      "id": iill1lIi,
      "business": null,
      "poolBaseId": il1li11i,
      "prizeGroupId": iIl1l1iI,
      "prizeBaseId": IIl11il,
      "prizeType": 4
    },
    "linkId": Ii1ill1l,
    "inviter": ""
  };
  return new Promise(iili1I1 => {
    $.post(Ii1il111("apCashWithDraw", ll1llI1l), async (iI1ll1l, l11l1ll1, II1IIlli) => {
      try {
        iI1ll1l ? (console.log("" + JSON.stringify(iI1ll1l)), console.log($.name + " API请求失败，请检查网路重试")) : III1111(II1IIlli) && (console.log("提现零钱结果：" + II1IIlli), II1IIlli = JSON.parse(II1IIlli), II1IIlli.code === 0 ? II1IIlli.data.status === "310" ? console.log("提现成功！") : console.log("提现失败：" + II1IIlli.data.message) : console.log("提现异常：" + II1IIlli.errMsg));
      } catch (IiiII1Ii) {
        $.logErr(IiiII1Ii, l11l1ll1);
      } finally {
        iili1I1(II1IIlli);
      }
    });
  });
}

function Ili1lii1() {
  let liliIlIi = ["9irilvenEupYF488TUrl19DLuKQ9zWnXYHf9anC0ujw=", "9vOskAagcMJ4EOWXPQSS9A==", "ty6iFSNMeLZfu/F1QvwzAnifpKIunqsG7am3vAp9rkc=", "0Iut/X6Fx833sGPARnxK0TEJAHhGl+YhaIQMI1735mE=", "EX5edGJ14b70ZUglRq7IMmT3GewOP9IL/BN3k2dfrjw=", "GQ78WmGL+Qv2mqvgvTcsxg==", "lZ8VPCPw8/UTmO1GzzxPX1x7NdNLlCwQp1+vYdikyUE=", "6NjoHzCgr18XDqhPypTA8g==", "icUOgor0s2XCgwiSlQ1Xbw==", "hlwIo9mqALsYkyp55soJ7w=="],
      I11lI11i = liliIlIi[Math.floor(Math.random() * liliIlIi.length)],
      IIiIi1 = {
    "url": "https://api.m.jd.com/",
    "body": "functionId=TaskInviteServiceNew&body=" + JSON.stringify({
      "method": "participateInviteTask",
      "data": {
        "channel": "1",
        "encryptionInviterPin": encodeURIComponent(I11lI11i),
        "type": 1
      }
    }) + "&appid=jx_h5&uuid=&_t=" + Date.now(),
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://gray.jd.com",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "User-Agent": $.UA,
      "Referer": "https://gray.jd.com/?channel=jsbrenwu&lng=106.476647&lat=29.502872&sid=f6bf56c10e1a8b537cc5da8f54c13bew&un_area=4_50950_50957_0",
      "Accept-Encoding": "gzip, deflate, br",
      "Cookie": lilI1IIl
    }
  };
  $.post(IIiIi1, (il1ll11i, Il11I1iI, IIliIilI) => {});
}

function iii1ii1l() {
  let lliilll = +new Date(),
      ilIi1llI = ["9irilvenEupYF488TUrl19DLuKQ9zWnXYHf9anC0ujw=", "9vOskAagcMJ4EOWXPQSS9A==", "ty6iFSNMeLZfu/F1QvwzAnifpKIunqsG7am3vAp9rkc=", "0Iut/X6Fx833sGPARnxK0TEJAHhGl+YhaIQMI1735mE=", "EX5edGJ14b70ZUglRq7IMmT3GewOP9IL/BN3k2dfrjw=", "GQ78WmGL+Qv2mqvgvTcsxg==", "lZ8VPCPw8/UTmO1GzzxPX1x7NdNLlCwQp1+vYdikyUE=", "6NjoHzCgr18XDqhPypTA8g==", "icUOgor0s2XCgwiSlQ1Xbw==", "hlwIo9mqALsYkyp55soJ7w=="],
      Iii1lIil = ilIi1llI[Math.floor(Math.random() * ilIi1llI.length)],
      I1IlIlil = {
    "url": "https://api.m.jd.com/?t=" + lliilll,
    "body": "functionId=InviteFriendChangeAssertsService&body=" + JSON.stringify({
      "method": "attendInviteActivity",
      "data": {
        "inviterPin": encodeURIComponent(Iii1lIil),
        "channel": 1,
        "token": "",
        "frontendInitStatus": ""
      }
    }) + "&referer=-1&eid=eidI9b2981202fsec83iRW1nTsOVzCocWda3YHPN471AY78%2FQBhYbXeWtdg%2F3TCtVTMrE1JjM8Sqt8f2TqF1Z5P%2FRPGlzA1dERP0Z5bLWdq5N5B2VbBO&aid=&client=ios&clientVersion=14.4.2&networkType=wifi&fp=-1&uuid=ab048084b47df24880613326feffdf7eee471488&osVersion=14.4.2&d_brand=iPhone&d_model=iPhone10,2&agent=-1&pageClickKey=-1&platform=3&lang=zh_CN&appid=market-task-h5&_t=" + lliilll,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Content-type": "application/x-www-form-urlencoded",
      "Origin": "https://invite-reward.jd.com",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "User-Agent": $.UA,
      "Referer": "https://invite-reward.jd.com/",
      "Accept-Encoding": "gzip, deflate, br",
      "Cookie": lilI1IIl
    }
  };
  $.post(I1IlIlil, (lIiiil1i, I11i1Iil, llllI1l) => {});
}

function Ii1il111(Ilil1IlI, IliIIli1) {
  return {
    "url": "https://api.m.jd.com/",
    "body": "appid=activities_platform&functionId=" + Ilil1IlI + "&body=" + escape(JSON.stringify(IliIIli1)) + "&t=" + +new Date(),
    "headers": {
      "Cookie": lilI1IIl,
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "user-agent": "jdltapp;iPhone;3.3.2;14.3;b488010ad24c40885d846e66931abaf532ed26a5;network/4g;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;model/iPhone11,8;addressid/2005183373;hasOCPay/0;appBuild/1049;supportBestPay/0;pv/220.46;apprpd/;ref/JDLTSubMainPageViewController;psq/0;ads/;psn/b488010ad24c40885d846e66931abaf532ed26a5|520;jdv/0|iosapp|t_335139774|liteshare|CopyURL|1618673222002|1618673227;adk/;app_device/IOS;pap/JA2020_3112531|3.3.2|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1 ",
      "Accept-Language": "zh-Hans-CN;q=1,en-CN;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "referer": "https://an.jd.com/babelDiy/Zeus/q1eB6WUB8oC4eH1BsCLWvQakVsX/index.html"
    }
  };
}

function iiliiIli(IlIi1lII, l1il1IIi) {
  return {
    "url": "https://api.m.jd.com/?appid=activities_platform&functionId=" + IlIi1lII + "&body=" + escape(JSON.stringify(l1il1IIi)) + "&t=" + +new Date(),
    "headers": {
      "Cookie": lilI1IIl,
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "user-agent": $.UA,
      "Accept-Language": "zh-Hans-CN;q=1,en-CN;q=0.9",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "referer": "https://an.jd.com/babelDiy/Zeus/q1eB6WUB8oC4eH1BsCLWvQakVsX/index.html"
    }
  };
}

async function II1i1111(Iill1ilI, I111iIIl) {
  try {
    let ii1l1iii = new Iill11l1({
      "appId": Iill1ilI,
      "appid": "activities_platform",
      "clientVersion": I111iIIl?.["clientVersion"],
      "client": I111iIIl?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await ii1l1iii.genAlgo(), body = await ii1l1iii.genUrlParams(I111iIIl.functionId, I111iIIl.body), body;
  } catch (IlIiI1ll) {}
}

async function i1lliiI1(lIlIlll1, IlII1111) {
  let i1I1ii = {
    "searchParams": { ...IlII1111,
      "appId": lIlIlll1
    },
    "pt_pin": $.UserName,
    "client": IlII1111?.["client"],
    "clientVersion": IlII1111?.["clientVersion"]
  },
      iiliIil1 = {
    "Content-Type": "application/json",
    "User-Agent": $.UA
  };
  iiliIil1.cookie = "" + ($.originArr || "");
  let ii1Il1l1 = {
    "url": "http://h5st.kingran.cf/api/h5st",
    "body": JSON.stringify(i1I1ii),
    "headers": iiliIil1,
    "timeout": 30000
  };
  return new Promise(async IIi1l1il => {
    $.post(ii1Il1l1, (iI1I11li, lIliilIi, Ii11IIlI) => {
      let llI1I1ll = "";

      try {
        if (iI1I11li) {} else {
          Ii11IIlI = JSON.parse(Ii11IIlI);

          if (typeof Ii11IIlI === "object" && Ii11IIlI && Ii11IIlI.body) {
            if (Ii11IIlI.body) llI1I1ll = Ii11IIlI || "";
          } else {
            if (Ii11IIlI.code == 400) {} else {}
          }
        }
      } catch (liililil) {
        $.logErr(liililil, lIliilIi);
      } finally {
        IIi1l1il(III11lI1(llI1I1ll));
      }
    });
  });
}

function III11lI1(ii11IIi1, lili1III = {}) {
  let l1iIIlIi = [],
      iI1i1I1l = lili1III.connector || "&",
      iliIIII = Object.keys(ii11IIi1);
  if (lili1III.sort) iliIIII = iliIIII.sort();

  for (let liill1li of iliIIII) {
    let ill1l1ll = ii11IIi1[liill1li];
    if (ill1l1ll && typeof ill1l1ll === "object") ill1l1ll = JSON.stringify(ill1l1ll);
    if (ill1l1ll && lili1III.encode) ill1l1ll = encodeURIComponent(ill1l1ll);
    l1iIIlIi.push(liill1li + "=" + ill1l1ll);
  }

  return l1iIIlIi.join(iI1i1I1l);
}

function liiI1iil(Ii1II1li) {
  Ii1II1li = Ii1II1li || 32;
  let I1l1i1i = "abcdef0123456789",
      lIllIlII = I1l1i1i.length,
      iil1Iiil = "";

  for (i = 0; i < Ii1II1li; i++) iil1Iiil += I1l1i1i.charAt(Math.floor(Math.random() * lIllIlII));

  return iil1Iiil;
}

function III1111(IlIIIIil) {
  try {
    if (typeof JSON.parse(IlIIIIil) == "object") return true;
  } catch (lI1il1lI) {
    return console.log(lI1il1lI), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function l1I1i1(IilIIii) {
  return new Promise(II1i1i1I => {
    const IIl1l1I1 = {
      "url": "" + IilIIii,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IIl1l1I1, async (IiiiIiil, l1Iiii1l, IiliiilI) => {
      try {
        if (IiiiIiil) {} else {
          if (IiliiilI) IiliiilI = JSON.parse(IiliiilI);else {}
        }
      } catch (IIliIIi) {
        $.logErr(IIliIIi, l1Iiii1l);
        IiliiilI = null;
      } finally {
        II1i1i1I(IiliiilI);
      }
    });
  });
}

function IliIill1(illll1I1, II1I1Ill) {
  return Math.floor(Math.random() * (II1I1Ill - illll1I1)) + illll1I1;
}

function iiII1I1(lli11l) {
  if (typeof lli11l == "string") {
    try {
      return JSON.parse(lli11l);
    } catch (iIIiIlI1) {
      return console.log(iIIiIlI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
