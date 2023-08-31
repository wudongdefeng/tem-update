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
const l1iIil = $.isNode() ? require("./jdCookie.js") : "",
  l1iIii = $.isNode() ? require("./sendNotify") : "",
  II1II = require("./function/jdCommon"),
  ii1l11 = require("./utils/h5st.js");
let IIIIii = [],
  liiill = "";
if ($.isNode()) {
  Object.keys(l1iIil).forEach(ii1l1I => {
    IIIIii.push(l1iIil[ii1l1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIIIii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...i1i111($.getdata("CookiesJD") || "[]").map(lI1lII => lI1lII.cookie)].filter(lIill1 => !!lIill1);
$.invitePinTaskList = [];
$.invitePin = ["VxQJC6Sr0QZkcOHwxoTjrw", "oRY9YryofcNg71MZeKSZseKD6P6BJzKv2NBGxfiuJ20", "EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"];
let lI1lIl = Date.now();
message = "";
!(async () => {
  if (!IIIIii[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let lI1ill = 0; lI1ill < IIIIii.length; lI1ill++) {
    liiill = IIIIii[lI1ill];
    if (liiill) {
      $.UserName = decodeURIComponent(liiill.match(/pt_pin=([^; ]+)(?=;?)/) && liiill.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lI1ill + 1;
      $.isLogin = true;
      $.nickName = "";
      $.openIndex = 0;
      $.UA = II1II.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      lnrun++;if(lnrun == 4){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await l1iIii.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      if ($.isNode()) {
        if (process.env.HELP_JOYPARK && process.env.HELP_JOYPARK == "false") {} else {
          $.kgw_invitePin = ["EDPUVDhR7nUPh3jUGDJ_GyiLt77-wROqWVP2aesRUt8", "QLCSd3I8GUplWsqAeZgqj5cmfo7gRSGyIsykew6KYP0", "BAOqoW7t-bamG2ZDWN_J26cFJ_A0SVf5Vy3lH5czbXI", "1S5w5yU9UZYDq76-t7SPlQ", "7m1cAPHveE9Di9IDPS3EfA", "Zi6CMKqNUANQa1m3j3NulA", "DYnxFupX6XXdfmBd02SWdg", "44woUzTfOdg9yFCt7D69MZf_Z_eaGdDs73z1eAfGDZo", "s1HgT4EXmMeUQzWIrsk4Ag"][Math.floor(Math.random() * 11)];
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          let Il1II = await lI1lIi("", 2, $.kgw_invitePin);
          await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
          if (Il1II.data && Il1II.data.helpState && Il1II.data.helpState === 1) {} else {
            if (Il1II.data && Il1II.data.helpState && Il1II.data.helpState === 3) {} else {
              if (Il1II.data && Il1II.data.helpState && Il1II.data.helpState === 2) $.openIndex++;else {}
            }
          }
        }
      }
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      await lI1lIi();
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.joyBaseInfo && $.joyBaseInfo.invitePin) $.log($.name + " - " + $.UserName + "  助力码: " + $.joyBaseInfo.invitePin), $.invitePinTaskList.push($.joyBaseInfo.invitePin);else {
        $.log($.name + " - " + $.UserName + "  助力码: null");
        $.invitePinTaskList.push("");
        $.isLogin = false;
        $.log("服务端异常，尝试手动进入活动，入口：京东版-我的-汪汪庄园");
        continue;
      }
      await I1ll11();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      for (const Ii11I of $.taskList) {
        Ii11I.taskType === "SIGN" && ($.log("" + Ii11I.taskTitle), await Iii1Ii(Ii11I.id, Ii11I.taskType, undefined), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), $.log(Ii11I.taskTitle + " 领取奖励"), await lI1lI1(Ii11I.id, Ii11I.taskType), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
        if (Ii11I.taskType === "BROWSE_PRODUCT" || Ii11I.taskType === "BROWSE_CHANNEL" && Ii11I.taskLimitTimes !== 1) {
          let i1lli = await i1l1I1(Ii11I.id, Ii11I.taskType);
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
          let i11111 = 0;
          if (i1lli.length === 0) {
            let lIl1li = await lI1lI1(Ii11I.id, Ii11I.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if (!lIl1li.success) {
              $.log(Ii11I.taskTitle + "|" + Ii11I.taskShowTitle + " 领取完成!");
              i1lli = await i1l1I1(Ii11I.id, Ii11I.taskType);
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            }
          }
          while (Ii11I.taskLimitTimes - Ii11I.taskDoTimes >= 0) {
            if (i1lli.length === 0) {
              $.log(Ii11I.taskTitle + " 活动火爆，素材库没有素材，我也不知道啥回事 = = ");
              break;
            }
            $.log(Ii11I.taskTitle + " " + Ii11I.taskDoTimes + "/" + Ii11I.taskLimitTimes);
            let lIilii = await Iii1Ii(Ii11I.id, Ii11I.taskType, i1lli[i11111].itemId, "activities_platform");
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            lIilii.code === 2005 || lIilii.code === 0 ? $.log(Ii11I.taskTitle + "|" + Ii11I.taskShowTitle + " 任务完成！") : $.log("任务失败！");
            i11111++;
            Ii11I.taskDoTimes++;
            if (!i1lli[i11111]) break;
          }
          for (let Ii111 = 0; Ii111 < Ii11I.taskLimitTimes; Ii111++) {
            let ilIIi1 = await lI1lI1(Ii11I.id, Ii11I.taskType);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            if (!ilIIi1.success) {
              $.log(Ii11I.taskTitle + "|" + Ii11I.taskShowTitle + " 领取完成!");
              break;
            }
          }
        } else {
          if (Ii11I.taskType === "SHARE_INVITE") {
            $.yq_taskid = Ii11I.id;
            for (let Ii1II1 = 0; Ii1II1 < 5; Ii1II1++) {
              let lilili = await lI1lI1($.yq_taskid, "SHARE_INVITE");
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              if (!lilili.success) break;
              $.log("领取助力奖励成功！");
            }
          }
        }
        Ii11I.taskType === "BROWSE_CHANNEL" && Ii11I.taskLimitTimes === 1 && ($.log(Ii11I.taskTitle + "|" + Ii11I.taskShowTitle), await Iii1Il(Ii11I.id, Ii11I.taskType, Ii11I.taskSourceUrl), $.log(Ii11I.taskTitle + "|" + Ii11I.taskShowTitle + " 领取奖励"), await lI1lI1(Ii11I.id, Ii11I.taskType));
      }
    }
  }
  $.log("\n======汪汪乐园开始内部互助======\n");
  for (let IllliI = 0; IllliI < IIIIii.length; IllliI++) {
    liiill = IIIIii[IllliI];
    if (liiill) {
      $.UserName = decodeURIComponent(liiill.match(/pt_pin=([^; ]+)(?=;?)/) && liiill.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IllliI + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = II1II.genUA($.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      lnrun++;if(lnrun == 4){console.log(`\n【访问接口次数达到3次，休息一分钟.....】\n`);await $.wait(60 * 1000);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await l1iIii.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.newinvitePinTaskList = [...($.invitePinTaskList || []), ...($.invitePin || [])];
      for (const iIiili of $.newinvitePinTaskList) {
        $.log("【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 助力 " + iIiili);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        let lilill = await lI1lIi($.yq_taskid, 1, iIiili);
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        if (lilill.success) {
          if (lilill.data.helpState === 1) $.log("助力成功！");else {
            if (lilill.data.helpState === 0) $.log("自己不能助力自己！");else {
              if (lilill.data.helpState === 2) $.log("助力过了！");else {
                if (lilill.data.helpState === 3) {
                  $.log("没有助力次数了！");
                  break;
                } else lilill.data.helpState === 4 && $.log("这个B助力满了！");
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
})().catch(Ili1I1 => $.logErr(Ili1I1)).finally(() => $.done());
function I1ll11() {
  return new Promise(i1IiiI => {
    $.post(llIl1("body={\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}&appid=activities_platform", "apTaskList"), async (l1lII, lilI1l, l1liiI) => {
      $.log("=== 任务列表 start ===");
      try {
        if (l1lII) {
          console.log("" + JSON.stringify(l1lII));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          l1liiI = JSON.parse(l1liiI);
          $.taskList = l1liiI.data;
          for (const i1Iiil of $.taskList) {
            $.log(i1Iiil.taskTitle + " " + i1Iiil.taskDoTimes + "/" + i1Iiil.taskLimitTimes);
          }
          $.log("=== 任务列表 end  ===");
        }
      } catch (l1lIi) {
        $.logErr(l1lIi, lilI1l);
      } finally {
        i1IiiI(l1liiI);
      }
    });
  });
}
async function lI1lIi(lI1I11 = "", IilIl = "", IilIi = "") {
  const i1liI = {
      "functionId": "joyBaseInfo",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lI1lIl,
      "appid": "activities_platform",
      "body": "{\"taskId\":\"" + lI1I11 + "\",\"inviteType\":\"" + IilIl + "\",\"inviterPin\":\"" + IilIi + "\",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    iilIIi = await illlli("4abce", i1liI);
  return new Promise(i1Iil1 => {
    $.post(l1iIiI(iilIIi), async (liI1Ii, l1lil1, i1lil) => {
      try {
        liI1Ii ? (console.log("" + JSON.stringify(liI1Ii)), console.log($.name + " getJoyBaseInfo API请求失败，请检查网路重试")) : (i1lil = JSON.parse(i1lil), $.joyBaseInfo = i1lil.data);
      } catch (IilII) {
        $.logErr(IilII, l1lil1);
      } finally {
        i1Iil1(i1lil);
      }
    });
  });
}
async function Iii1Ii(iilIII, liI1Il, I1iIi = "", iiiI1I = "activities_platform") {
  const Ili1II = {
      "functionId": "apDoTask",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lI1lIl,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + liI1Il + "\",\"taskId\":" + iilIII + ",\"channel\":4,\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\",\"taskInsert\":true,\"itemId\":\"" + I1iIi + "\"}"
    },
    ili1i = await illlli("4abce", Ili1II);
  return new Promise(iilIIl => {
    $.post(l1iIiI(ili1i), async (i1Iili, i1Iill, l1IiI) => {
      try {
        i1Iili ? (console.log("" + JSON.stringify(i1Iili)), console.log($.name + " API请求失败，请检查网路重试")) : l1IiI = JSON.parse(l1IiI);
      } catch (llIIIl) {
        $.logErr(llIIIl, i1Iill);
      } finally {
        iilIIl(l1IiI);
      }
    });
  });
}
async function Iii1Il(llIIIi, IiIiIl, I1Ilil, l1I1I1 = "activities_platform") {
  const l1Iii = {
      "functionId": "apDoTask",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lI1lIl,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + IiIiIl + "\",\"taskId\":" + llIIIi + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\",\"itemId\":\"" + I1Ilil + "\"}"
    },
    l1Iil = await illlli("4abce", l1Iii);
  return new Promise(iill11 => {
    $.post(l1iIiI(l1Iil), async (I1IliI, III1II, l1I1II) => {
      try {
        I1IliI ? (console.log("" + JSON.stringify(I1IliI)), console.log($.name + " API请求失败，请检查网路重试")) : l1I1II = JSON.parse(l1I1II);
      } catch (iIIlii) {
        $.logErr(iIIlii, III1II);
      } finally {
        iill11(l1I1II);
      }
    });
  });
}
async function i1l1I1(iill1I, Illi1) {
  const lIIi1i = {
      "functionId": "apTaskDetail",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lI1lIl,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + Illi1 + "\",\"taskId\":" + iill1I + ",\"channel\":4,\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    liI11I = await illlli("4abce", lIIi1i);
  return new Promise(l1IIil => {
    $.post(l1iIiI(liI11I), async (IIIli1, I1lI11, I1I1Il) => {
      try {
        if (IIIli1) {
          console.log("" + JSON.stringify(IIIli1));
          console.log($.name + " API请求失败，请检查网路重试");
        } else I1I1Il = JSON.parse(I1I1Il), !I1I1Il.success ? $.taskDetailList = [] : $.taskDetailList = I1I1Il?.["data"]?.["taskItemList"];
      } catch (iiiIIl) {
        $.logErr(iiiIIl, I1lI11);
      } finally {
        !I1I1Il.success ? l1IIil([]) : l1IIil(I1I1Il.data.taskItemList);
      }
    });
  });
}
async function lI1lI1(liI11l, l1l1i) {
  const i11ll = {
      "functionId": "apTaskDrawAward",
      "clientVersion": "10.1.0",
      "client": "ios",
      "t": lI1lIl,
      "appid": "activities_platform",
      "body": "{\"taskType\":\"" + l1l1i + "\",\"taskId\":" + liI11l + ",\"linkId\":\"99DZNpaCTAv8f4TuKXr0Ew\"}"
    },
    Ili11I = await illlli("55276", i11ll);
  return new Promise(iIlI11 => {
    $.post(l1iIiI(Ili11I), async (l1l1l, illilI, IiIli) => {
      try {
        l1l1l ? (console.log("" + JSON.stringify(l1l1l)), console.log($.name + " API请求失败，请检查网路重试")) : (IiIli = JSON.parse(IiIli), $.log("领取奖励"));
      } catch (iil11I) {
        $.logErr(iil11I, illilI);
      } finally {
        iIlI11(IiIli);
      }
    });
  });
}
function llIl1(IiIll, llIilI) {
  return {
    "url": "https://api.m.jd.com/client.action" + (llIilI ? "?functionId=" + llIilI : ""),
    "body": IiIll,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": liiill
    }
  };
}
function l1iIiI(I1I1I1) {
  return {
    "url": "https://api.m.jd.com/?" + I1I1I1,
    "headers": {
      "User-Agent": $.UA,
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": "api.m.jd.com",
      "Origin": "https://joypark.jd.com",
      "Referer": "https://joypark.jd.com/?activityId=99DZNpaCTAv8f4TuKXr0Ew&lng=113.387899&lat=22.512678&sid=4d76080a9da10fbb31f5cd43396ed6cw&un_area=19_1657_52093_0",
      "Cookie": liiill
    }
  };
}
async function illlli(Ili111, Il11) {
  try {
    let iillI1 = new ii1l11({
      "appId": Ili111,
      "appid": "activities_platform",
      "clientVersion": Il11?.["clientVersion"],
      "client": Il11?.["client"],
      "pin": $.UserName,
      "ua": $.UA,
      "version": "4.1"
    });
    return await iillI1.genAlgo(), body = await iillI1.genUrlParams(Il11.functionId, Il11.body), body;
  } catch (IlllI) {}
}
async function illlll(iliIl, ii1i11) {
  let liIlII = {
      "searchParams": {
        ...ii1i11,
        "appId": iliIl
      },
      "pt_pin": $.UserName,
      "client": ii1i11?.["client"],
      "clientVersion": ii1i11?.["clientVersion"]
    },
    Il1I = {
      "Content-Type": "application/json",
      "User-Agent": $.UA
    },
    iii1i = {
      "url": "http://h5st.kingran.cf/api/h5st",
      "body": JSON.stringify(liIlII),
      "headers": Il1I,
      "timeout": 30000
    };
  return new Promise(async llII1l => {
    $.post(iii1i, (iillIl, IiIi1I, iillIi) => {
      let iliI1 = "";
      try {
        if (iillIl) console.log($.name + " getH5st API请求失败，请检查网路重试");else {
          iillIi = JSON.parse(iillIi);
          console.log(JSON.stringify(iillIi));
          if (typeof iillIi === "object" && iillIi && iillIi.body) {
            if (iillIi.body) iliI1 = iillIi || "";
          } else iillIi.code == 400 ? console.log("\n" + iillIi.msg) : console.log("\n可能连接不上接口，请检查网络");
        }
      } catch (l1lii1) {
        $.logErr(l1lii1, IiIi1I);
      } finally {
        llII1l(IIIIiI(iliI1));
      }
    });
  });
}
function IIIIiI(iillII, Illli = {}) {
  let ilI1I1 = [],
    liIlIi = Illli.connector || "&",
    liIlIl = Object.keys(iillII);
  if (Illli.sort) liIlIl = liIlIl.sort();
  for (let lIiIl of liIlIl) {
    let Il1l = iillII[lIiIl];
    if (Il1l && typeof Il1l === "object") Il1l = JSON.stringify(Il1l);
    if (Il1l && Illli.encode) Il1l = encodeURIComponent(Il1l);
    ilI1I1.push(lIiIl + "=" + Il1l);
  }
  return ilI1I1.join(liIlIi);
}
function II1I1(ll11I1) {
  ll11I1 = ll11I1 || 32;
  let iiil1i = "abcdef0123456789",
    ilIIli = iiil1i.length,
    ilIIll = "";
  for (i = 0; i < ll11I1; i++) ilIIll += iiil1i.charAt(Math.floor(Math.random() * ilIIli));
  return ilIIll;
}
function i1i111(iIliil) {
  if (typeof iIliil == "string") {
    try {
      return JSON.parse(iIliil);
    } catch (liIIii) {
      return console.log(liIIii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
