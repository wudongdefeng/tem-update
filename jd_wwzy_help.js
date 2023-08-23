/*

脚本默认会帮我助力开工位，介意请添加变量HELP_JOYPARK，false为不助力
export HELP_JOYPARK=""

运行频繁会403，请自行定时运行

============Quantumultx===============
[task_local]
#京东版-汪汪庄园助力
1 1 1 1 * jd_wwzy_help.js, tag=京东版-汪汪庄园助力, enabled=true

*/
let lnrun = 0;

const $ = new Env('京东版-汪汪庄园助力');
const liIlli = $.isNode() ? require("./jdCookie.js") : "",
  lil11 = $.isNode() ? require("./sendNotify") : "",
  lllI1 = require("./function/krgetua");
let III11I = [],
  Ilii1 = "";
if ($.isNode()) {
  Object.keys(liIlli).forEach(l1llli => {
    III11I.push(liIlli[l1llli]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else III11I = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...liIll1($.getdata("CookiesJD") || "[]").map(iI1lII => iI1lII.cookie)].filter(ll11iI => !!ll11iI);
$.invitePinTaskList = [];
$.invitePin = ["VxQJC6Sr0QZkcOHwxoTjrw", "oRY9YryofcNg71MZeKSZseKD6P6BJzKv2NBGxfiuJ20", "EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"];
let ili1I1 = Date.now();
message = "";
!(async () => {
  if (!III11I[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let lI1lIi = 0; lI1lIi < III11I.length; lI1lIi++) {
    Ilii1 = III11I[lI1lIi];
    if (Ilii1) {
      $.UserName = decodeURIComponent(Ilii1.match(/pt_pin=([^; ]+)(?=;?)/) && Ilii1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lI1lIi + 1;
      $.isLogin = true;
      $.nickName = "";
      $.openIndex = 0;
      UA = await lllI1($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await lil11.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      if ($.isNode()) {
        if (process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false") {} else {
          $.kgw_invitePin = ["EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"][Math.floor(Math.random() * 11)];
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          let Iii1Ii = await liIllI("", 2, $.kgw_invitePin);
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          if (Iii1Ii.data && Iii1Ii.data.helpState && Iii1Ii.data.helpState === 1) {} else {
            if (Iii1Ii.data && Iii1Ii.data.helpState && Iii1Ii.data.helpState === 3) {} else {
              if (Iii1Ii.data && Iii1Ii.data.helpState && Iii1Ii.data.helpState === 2) $.openIndex++;else {}
            }
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await liIllI();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.joyBaseInfo && $.joyBaseInfo.invitePin) {
        $.log($.name + " - " + $.UserName + "  助力码: " + $.joyBaseInfo.invitePin);
        $.invitePinTaskList.push($.joyBaseInfo.invitePin);
      } else {
        $.log($.name + " - " + $.UserName + "  助力码: null");
        $.invitePinTaskList.push("");
        $.isLogin = false;
        $.log("服务端异常，尝试手动进入活动，入口：京东版-我的-汪汪庄园");
        continue;
      }
      await ili1II();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      for (const Iii1Il of $.taskList) {
        if (Iii1Il.taskType === "SIGN") {
          $.log("" + Iii1Il.taskTitle);
          await ll11i(Iii1Il.id, Iii1Il.taskType, undefined);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          $.log(Iii1Il.taskTitle + " 领取奖励");
          await l1i11(Iii1Il.id, Iii1Il.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }
        if (Iii1Il.taskType === "BROWSE_PRODUCT" || Iii1Il.taskType === "BROWSE_CHANNEL" && Iii1Il.taskLimitTimes !== 1) {
          let ii1l1I = await I1I1li(Iii1Il.id, Iii1Il.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          let lI1lII = 0;
          if (ii1l1I.length === 0) {
            let lIill1 = await l1i11(Iii1Il.id, Iii1Il.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            !lIill1.success && ($.log(Iii1Il.taskTitle + "|" + Iii1Il.taskShowTitle + " 领取完成!"), ii1l1I = await I1I1li(Iii1Il.id, Iii1Il.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
          }
          while (Iii1Il.taskLimitTimes - Iii1Il.taskDoTimes >= 0) {
            if (ii1l1I.length === 0) {
              $.log(Iii1Il.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
              break;
            }
            $.log(Iii1Il.taskTitle + " " + Iii1Il.taskDoTimes + "/" + Iii1Il.taskLimitTimes);
            let l1lI1i = await ll11i(Iii1Il.id, Iii1Il.taskType, ii1l1I[lI1lII].itemId, "activities_platform");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            l1lI1i.code === 2005 || l1lI1i.code === 0 ? $.log(Iii1Il.taskTitle + "|" + Iii1Il.taskShowTitle + " 任务完成！") : $.log("任务失败！");
            lI1lII++;
            Iii1Il.taskDoTimes++;
            if (!ii1l1I[lI1lII]) break;
          }
          for (let l1I1Ii = 0; l1I1Ii < Iii1Il.taskLimitTimes; l1I1Ii++) {
            let IIlill = await l1i11(Iii1Il.id, Iii1Il.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if (!IIlill.success) {
              $.log(Iii1Il.taskTitle + "|" + Iii1Il.taskShowTitle + " 领取完成!");
              break;
            }
          }
        } else {
          if (Iii1Il.taskType === "SHARE_INVITE") {
            $.yq_taskid = Iii1Il.id;
            for (let liliil = 0; liliil < 5; liliil++) {
              let lIillI = await l1i11($.yq_taskid, "SHARE_INVITE");
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              if (!lIillI.success) {
                break;
              }
              $.log("领取助力奖励成功！");
            }
          }
        }
        Iii1Il.taskType === "BROWSE_CHANNEL" && Iii1Il.taskLimitTimes === 1 && ($.log(Iii1Il.taskTitle + "|" + Iii1Il.taskShowTitle), await iI1lI1(Iii1Il.id, Iii1Il.taskType, Iii1Il.taskSourceUrl), $.log(Iii1Il.taskTitle + "|" + Iii1Il.taskShowTitle + " 领取奖励"), await l1i11(Iii1Il.id, Iii1Il.taskType));
      }
    }
  }
  $.log("\n======汪汪乐园开始内部互助======\n");
  for (let iIiilI = 0; iIiilI < III11I.length; iIiilI++) {
    Ilii1 = III11I[iIiilI];
    if (Ilii1) {
      $.UserName = decodeURIComponent(Ilii1.match(/pt_pin=([^; ]+)(?=;?)/) && Ilii1.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iIiilI + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await lil11.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];
      for (const ilIlIi of $.newinvitePinTaskList) {
        $.log("【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 助力 " + ilIlIi);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        let ilIlIl = await liIllI($.yq_taskid, 1, ilIlIi);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        if (ilIlIl.success) {
          if (ilIlIl.data.helpState === 1) $.log("助力成功！");else {
            if (ilIlIl.data.helpState === 0) $.log("自己不能助力自己！");else {
              if (ilIlIl.data.helpState === 2) $.log("助力过了！");else {
                if (ilIlIl.data.helpState === 3) {
                  $.log("没有助力次数了！");
                  break;
                } else ilIlIl.data.helpState === 4 && $.log("这个B助力满了！");
              }
            }
          }
        } else {
          $.log("数据异常 助力失败！\n\n");
          break;
        }
      }
    }
  }
})().catch(ll1llI => $.logErr(ll1llI)).finally(() => $.done());
function ili1II() {
  return new Promise(iiI1iI => {
    $.post(IlI1li("body={\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}&appid=activities_platform", "apTaskList"), async (I1iiil, Illll1, lI1iil) => {
      $.log("=== 任务列表 start ===");
      try {
        if (I1iiil) {
          console.log("" + JSON.stringify(I1iiil));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          lI1iil = JSON.parse(lI1iil);
          $.taskList = lI1iil.data;
          for (const iIiiiI of $.taskList) {
            $.log(iIiiiI.taskTitle + " " + iIiiiI.taskDoTimes + "/" + iIiiiI.taskLimitTimes);
          }
          $.log("=== 任务列表 end  ===");
        }
      } catch (ilI11i) {
        $.logErr(ilI11i, Illll1);
      } finally {
        iiI1iI(lI1iil);
      }
    });
  });
}
async function liIllI(ilI11l = "", li1I = "", IIliil = "") {
  const lI1iiI = {
      "functionId": "joyBaseInfo",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": ili1I1,
      "appid": "activities_platform",
      "body": "{\"taskId\":\"" + ilI11l + "\",\"inviteType\":\"" + li1I + "\",\"inviterPin\":\"" + IIliil + "\",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    i11lII = await ll11l("4abce", lI1iiI);
  return new Promise(I1iii1 => {
    $.post(IlI1ll(i11lII), async (li11, ilIlI1, I1Illi) => {
      try {
        li11 ? (console.log("" + JSON.stringify(li11)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (I1Illi = JSON.parse(I1Illi), $.joyBaseInfo = I1Illi.data);
      } catch (lI1ii1) {
        $.logErr(lI1ii1, ilIlI1);
      } finally {
        I1iii1(I1Illi);
      }
    });
  });
}
async function ll11i(liliiI, ilIIiI, lIl1ii = "", lIl1il = "activities_platform") {
  const IIlii1 = {
      "functionId": "apDoTask",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": ili1I1,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + ilIIiI + "\",\"taskId\":" + liliiI + ",\"channel\":4,\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\",\"taskInsert\":true,\"itemId\":\"" + lIl1ii + "\"}"
    },
    iiI1lI = await ll11l("4abce", IIlii1);
  return new Promise(iliiII => {
    $.post(IlI1ll(iiI1lI), async (iiI1li, IIliii, i1111I) => {
      try {
        iiI1li ? (console.log("" + JSON.stringify(iiI1li)), console.log($.name + " API请求失败，请检查网路重试")) : i1111I = JSON.parse(i1111I);
      } catch (lIl1lI) {
        $.logErr(lIl1lI, IIliii);
      } finally {
        iliiII(i1111I);
      }
    });
  });
}
async function iI1lI1(Ii1IIi, Ii1IIl, l111I, ll1lli = "activities_platform") {
  const Illlil = {
      "functionId": "apDoTask",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": ili1I1,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + Ii1IIl + "\",\"taskId\":" + Ii1IIi + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\",\"itemId\":\"" + l111I + "\"}"
    },
    I1iili = await ll11l("4abce", Illlil);
  return new Promise(i1lli => {
    $.post(IlI1ll(I1iili), async (i11111, lIl1li, Il1I1) => {
      try {
        i11111 ? (console.log("" + JSON.stringify(i11111)), console.log($.name + " API请求失败，请检查网路重试")) : Il1I1 = JSON.parse(Il1I1);
      } catch (Ii111) {
        $.logErr(Ii111, lIl1li);
      } finally {
        i1lli(Il1I1);
      }
    });
  });
}
async function I1I1li(l111i, l111l) {
  const Ii1II1 = {
      "functionId": "apTaskDetail",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": ili1I1,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + l111l + "\",\"taskId\":" + l111i + ",\"channel\":4,\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    lilili = await ll11l("4abce", Ii1II1);
  return new Promise(IilI1 => {
    $.post(IlI1ll(lilili), async (l1lI1, Ili1I1, lI1I1i) => {
      try {
        l1lI1 ? (console.log("" + JSON.stringify(l1lI1)), console.log($.name + " API请求失败，请检查网路重试")) : (lI1I1i = JSON.parse(lI1I1i), !lI1I1i.success ? $.taskDetailList = [] : $.taskDetailList = lI1I1i?.["data"]?.["taskItemList"]);
      } catch (i1ll1) {
        $.logErr(i1ll1, Ili1I1);
      } finally {
        !lI1I1i.success ? IilI1([]) : IilI1(lI1I1i.data.taskItemList);
      }
    });
  });
}
async function l1i11(lilI1I, lI1I1l) {
  const i1IiiI = {
      "functionId": "apTaskDrawAward",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": ili1I1,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + lI1I1l + "\",\"taskId\":" + lilI1I + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    lI1I1I = await ll11l("55276", i1IiiI);
  return new Promise(i1llI => {
    $.post(IlI1ll(lI1I1I), async (iIIli1, Ii1l1i, l1lIl) => {
      try {
        iIIli1 ? (console.log("" + JSON.stringify(iIIli1)), console.log($.name + " API请求失败，请检查网路重试")) : (l1lIl = JSON.parse(l1lIl), $.log("领取奖励"));
      } catch (i1Iiil) {
        $.logErr(i1Iiil, Ii1l1i);
      } finally {
        i1llI(l1lIl);
      }
    });
  });
}
function IlI1li(l1lIi, l1lili) {
  return {
    "url": "https://api.m.jd.com/client.action" + (l1lili ? "?functionId=" + l1lili : ""),
    "body": l1lIi,
    "headers": {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": Ilii1
    }
  };
}
function IlI1ll(lI1I11) {
  return {
    "url": "https://api.m.jd.com/?" + lI1I11,
    "headers": {
      "User-Agent": UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": Ilii1
    }
  };
}
async function ll11l(IilIi, Ili1Il) {
  let iilIIi = {
      "appId": IilIi,
      ...Ili1Il,
      "ua": UA,
      "pin": $.UserName
    },
    I1iII = {
      "url": "http://kr.kingran.cf/h5st",
      "body": JSON.stringify(iilIIi),
      "headers": {
        "Content-Type": "application/json"
      },
      "timeout": 30000
    };
  return new Promise(async l1lil1 => {
    $.post(I1iII, (I1iIi, iiiI1I, lilI11) => {
      let ili1i = "";
      try {
        if (I1iIi) {
          console.log("" + JSON.stringify(I1iIi));
          console.log($.name + " geth5st API请求失败，请检查网路重试");
        } else {
          lilI11 = JSON.parse(lilI11);
          if (typeof lilI11 === "object" && lilI11 && lilI11.body) {
            if (lilI11.body) ili1i = lilI11.body || "";
          } else lilI11.code == 400 ? console.log("\n" + lilI11.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (III1I1) {
        $.logErr(III1I1, iiiI1I);
      } finally {
        l1lil1(ili1i);
      }
    });
  });
}
function III111(I1IllI) {
  I1IllI = I1IllI || 32;
  let iIIll1 = "abcdef0123456789",
    llIIII = iIIll1.length,
    ilI11I = "";
  for (i = 0; i < I1IllI; i++) ilI11I += iIIll1.charAt(Math.floor(Math.random() * llIIII));
  return ilI11I;
}
function liIll1(i1Iili) {
  if (typeof i1Iili == "string") try {
    return JSON.parse(i1Iili);
  } catch (i1li1) {
    return console.log(i1li1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
