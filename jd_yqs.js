/*
摇钱树任务

cron "25 4,16 * * *" script-path=jd_yqs.js, tag=摇钱树任务

等级达到40级为满级，需要停止浇水3天，7天后开启新一轮活动

轮询提现变量：jd_yqs_num //轮询提现页数  一般无需填写

 */
let lnrun = 0;
const $ = new Env('摇钱树任务');
const llIIIi = $.isNode() ? require("./function/sendNotify.js") : "",
      IiIiIl = $.isNode() ? require("./function/jdCookie.js") : "",
      I1Ilil = require("./function/krgetH5st");

let I1Ilii = "_LN1l_4Nv5mTEsWhs3hIMA",
    l1Iii = process.env.jd_yqs_num ? process.env.jd_yqs_num : "1",
    l1Iil = Date.now(),
    III1Ii = [],
    III1Il = "",
    iIIliI;

if ($.isNode()) {
  Object.keys(IiIiIl).forEach(III1 => {
    III1Ii.push(IiIiIl[III1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else III1Ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iill1l($.getdata("CookiesJD") || "[]").map(l1IIl1 => l1IIl1.cookie)].filter(l1iiIi => !!l1iiIi);

!(async () => {
  if (!III1Ii[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let lIi1i1 = 0; lIi1i1 < III1Ii.length; lIi1i1++) {
    if (III1Ii[lIi1i1]) {
      III1Il = III1Ii[lIi1i1];
      $.UserName = decodeURIComponent(III1Il.match(/pt_pin=([^; ]+)(?=;?)/) && III1Il.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lIi1i1 + 1;
      $.isLogin = true;
      $.nickName = "";
      iIIliI = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await llIIIi.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      $.jda = "__jda=" + l1iiIl("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = await Illi1();
      await IiIil();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(l1l1I => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + l1l1I + "!", "");
}).finally(() => {
  $.done();
});

async function IiIil() {
  $.txhot = false;
  $.nowcontinue = false;
  $.drawLotteryNum = 0;
  await IiIiII();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

  if ($.nowcontinue) {
    await IiIiII();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    await iill11();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

    for (let Ill1II = 0; Ill1II < $.drawLotteryNum; Ill1II++) {
      await l1Il1();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }

    console.log("\n当前设置轮询提现页数：" + l1Iii);

    for (let llIili = 0; llIili < l1Iii; llIili++) {
      $.pageNum = llIili + 1;
      console.log("\n开始轮询提现" + $.pageNum + "页");
      await llIII1($.pageNum);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.txhot) break;
    }
  }
}

function IiIii(Illii) {
  try {
    if (typeof JSON.parse(Illii) == "object") {
      return true;
    }
  } catch (Ill1I1) {
    return console.log(Ill1I1), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function iill1l(lIi1il) {
  if (typeof lIi1il == "string") {
    try {
      return JSON.parse(lIi1il);
    } catch (illilI) {
      return console.log(illilI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}

async function IiIiII() {
  return new Promise(async llII1i => {
    const illI1I = {
      "appId": "34e92",
      "functionId": "richTreeHome",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "ios",
      "body": {
        "linkId": I1Ilii
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          ilI1Ii = await I1Ilil.getH5st(illI1I);
    let ilI1Il = {
      "url": "https://api.m.jd.com/api?" + ilI1Ii.params,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": III1Il,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(ilI1Il, async (illI11, ll11Ii, ll11Il) => {
      try {
        if (illI11) console.log("" + JSON.stringify(illI11));else {
          ll11Il = JSON.parse(ll11Il);

          if (ll11Il.code == 0) {
            $.drawLotteryNum = ll11Il?.["data"]?.["drawLotteryNum"];
            let liIlI1 = ll11Il?.["data"]?.["kettle"]?.["currentCapacity"],
                iillIl = ll11Il?.["data"]?.["richTree"]?.["nowStep"],
                IiIi1I = ll11Il?.["data"]?.["richTree"]?.["nowExp"],
                iillIi = ll11Il?.["data"]?.["richTree"]?.["remainingExp"];
            console.log("当前水滴：" + liIlI1 + ",当前等级：" + iillIl + ",当前进度：" + IiIi1I + ",还需经验：" + iillIi);
            if (ll11Il?.["prizeDrawVO"] != null) console.log("获得新手红包," + (ll11Il?.["data"]?.["prizeDrawVO"]?.["prizeConfigName"] || 0)), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await iill1i(liIlI1, 2);else {
              $.nowcontinue = true;
              let iliI1 = ll11Il?.["data"]?.["totalReward"] || [];
              $.prizeList = "";

              for (let i11iI = 0; i11iI < iliI1.length; i11iI++) {
                $.amount = iliI1[i11iI].amount;
                $.prizeType = iliI1[i11iI].prizeType;

                switch ($.prizeType) {
                  case 1:
                    $.prizeType = "[优惠券]";
                    break;

                  case 2:
                    $.prizeType = "[红包]";
                    break;

                  case 3:
                    $.prizeType = "[实物]";
                    break;

                  case 4:
                    $.prizeType = "[现金]";
                    break;

                  default:
                    console.log($.prizeType);
                    return;
                }

                i11iI != iliI1.length - 1 ? $.prizeList += $.prizeType + "：" + $.amount + "，" : $.prizeList += $.prizeType + "：" + $.amount;
              }

              console.log("当前汇总：" + $.prizeList);
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
              liIlI1 >= 2000 && iillIl < 40 && (await iill1i(liIlI1, 0), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)));
            }
          } else ll11Il.code == 402 ? console.log("进入首页失败," + (ll11Il?.["errMsg"] || "")) : console.log("进入首页失败," + (ll11Il?.["errMsg"] || ""));
        }
      } catch (l1lii1) {
        $.logErr(l1lii1, ll11Ii);
      } finally {
        llII1i();
      }
    });
  });
}

async function iill1i(ii1i1l, iillII) {
  return new Promise(async ilIIli => {
    const iIliil = {
      "appId": "34e92",
      "functionId": "richTreeWater",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "ios",
      "body": {
        "waterNum": ii1i1l,
        "type": iillII,
        "linkId": I1Ilii
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          IIiill = await I1Ilil.getH5st(iIliil);
    let liIIii = {
      "url": "https://api.m.jd.com/api?" + IIiill.params,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": III1Il,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(liIIii, async (I1liiI, l1I11l, iIliii) => {
      try {
        if (I1liiI) console.log("" + JSON.stringify(I1liiI));else {
          iIliii = JSON.parse(iIliii);

          if (iIliii.code == 0) {
            let iIlii1 = iIliii?.["data"]?.["redPacketNum"];
            console.log("完成浇水,等级：" + iIliii?.["data"]?.["nowStep"] + "-获得抽奖次数：" + iIlii1);
            await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

            for (let IIiil1 = 0; IIiil1 < iIlii1; IIiil1++) {
              await l1Il1();
              await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
            }
          } else iIliii.code == 402 ? console.log("浇水失败," + (iIliii?.["errMsg"] || "")) : console.log("浇水失败," + (iIliii?.["errMsg"] || ""));
        }
      } catch (ilIIl1) {
        $.logErr(ilIIl1, l1I11l);
      } finally {
        ilIIli();
      }
    });
  });
}

async function l1Il1() {
  return new Promise(async iIliiI => {
    const I1lii1 = {
      "appId": "34e92",
      "functionId": "richTreeOpen",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "ios",
      "body": {
        "linkId": I1Ilii
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          ilIIlI = await I1Ilil.getH5st(I1lii1);
    let liiiI1 = {
      "url": "https://api.m.jd.com/api?" + ilIIlI.params,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": III1Il,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(liiiI1, async (IIIlli, illii1, Iii1i1) => {
      try {
        if (IIIlli) console.log("" + JSON.stringify(IIIlli));else {
          Iii1i1 = JSON.parse(Iii1i1);
          if (Iii1i1.code == 0) switch (Iii1i1?.["data"]?.["prizeType"]) {
            case 1:
              console.log("获得," + Iii1i1?.["data"]?.["prizeConfigName"] + "-" + Iii1i1?.["data"]?.["createTime"]);
              break;

            case 2:
              console.log("获得红包," + Iii1i1?.["data"]?.["prizeConfigName"] + "-" + Iii1i1?.["data"]?.["createTime"]);
              break;

            case 4:
              console.log("获得现金," + Iii1i1?.["data"]?.["prizeConfigName"] + "-" + Iii1i1?.["data"]?.["createTime"]);
              break;

            case null:
              console.log("运气不太好，什么都没有抽到...");
              break;

            default:
              console.log(Iii1i1?.["data"]?.["prizeType"]);
              return;
          } else Iii1i1.code == 402 ? console.log("抽奖失败," + (Iii1i1?.["errMsg"] || "")) : console.log("抽奖失败," + (Iii1i1?.["errMsg"] || ""));
        }
      } catch (IIiiii) {
        $.logErr(IIiiii, illii1);
      } finally {
        iIliiI();
      }
    });
  });
}

async function iill11() {
  let illiiI = {
    "url": "https://api.m.jd.com/api?functionId=apTaskList&body=%7B%22linkId%22:%22_LN1l_4Nv5mTEsWhs3hIMA%22%7D&t=" + l1Iil + "&appid=activities_platform&client=ios&clientVersion=12.0.10",
    "headers": {
      "origin": "https://h5platform.jd.com",
      "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
      "User-Agent": $.UA,
      "Cookie": III1Il,
      "content-type": "application/x-www-form-urlencoded",
      "accept": "application/json, text/plain, */*"
    },
    "timeout": 20 * 1000
  };
  return new Promise(iIlili => {
    $.get(illiiI, async (Ii1II, Iii1l1, iIlil1) => {
      try {
        if (Ii1II) $.log(Ii1II);else {
          iIlil1 = JSON.parse(iIlil1);

          if (iIlil1?.["code"] == 0) {
            let l1IIi1 = iIlil1?.["data"] || [];

            for (let IIiii1 = 0; IIiii1 < l1IIi1.length; IIiii1++) {
              $.taskTitle = l1IIi1[IIiii1].taskTitle;
              $.apTaskListid = l1IIi1[IIiii1].id;
              $.taskType = l1IIi1[IIiii1].taskType;
              $.taskSourceUrl = l1IIi1[IIiii1].taskSourceUrl;
              $.taskFinished = l1IIi1[IIiii1].taskFinished;
              $.taskDoTimes = l1IIi1[IIiii1].taskDoTimes;
              $.taskFinished = l1IIi1[IIiii1].taskFinished;
              $.taskShowTitle = l1IIi1[IIiii1].taskShowTitle;
              $.timeLimitPeriod = l1IIi1[IIiii1].timeLimitPeriod;

              if ($.timeLimitPeriod == null) {
                if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
                  for (let I1lil1 = 0; I1lil1 < 1; I1lil1++) {
                    console.log("去做 " + $.taskShowTitle);
                    await IiIiI1($.taskType, $.apTaskListid, $.taskSourceUrl);
                    await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                  }
                }
              } else {
                if (!$.taskFinished && $.taskType.includes("BROWSE_")) for (let i11Ii1 = 0; i11Ii1 < 1; i11Ii1++) {
                  console.log("去做 " + $.taskShowTitle);
                  await I1IliI($.apTaskListid, $.taskSourceUrl);
                  await III1II($.apTaskListid);
                  await $.wait($.timeLimitPeriod * 1000 + 1500, 10);
                  await l1I1II($.apTaskListid);
                  await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                  await iIIlil();
                  await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                }
              }
            }
          } else console.log("查询任务失败," + (iIlil1?.["errMsg"] || iIlil1?.["msg"] || ""));
        }
      } catch (ilIlii) {
        $.log(ilIlii);
      } finally {
        iIlili();
      }
    });
  });
}

async function I1IliI(II1lI, ilIlil) {
  return new Promise(async li11ii => {
    const li1i1 = {
      "appId": "76674",
      "functionId": "apStartTaskTime",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "ios",
      "body": {
        "taskId": II1lI,
        "channel": 4,
        "linkId": I1Ilii,
        "itemId": ilIlil
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          I1iiIl = await I1Ilil.getH5st(li1i1);
    let liliII = {
      "url": "https://api.m.jd.com/api?" + I1iiIl.params,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        "Cookie": III1Il,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(liliII, async (I1iiII, liliIi, i1Ili) => {
      try {
        if (I1iiII) {
          console.log("" + JSON.stringify(I1iiII));
        } else {
          i1Ili = JSON.parse(i1Ili);

          if (i1Ili.code == 0) {} else {
            if (i1Ili.code == 402) {} else {}
          }
        }
      } catch (li1il) {
        $.logErr(li1il, liliIi);
      } finally {
        li11ii();
      }
    });
  });
}

async function III1II(lIiIiI) {
  return new Promise(async Ii1Ili => {
    const Ii1Ill = {
      "appId": "76674",
      "functionId": "apCheckAndResetTaskTime",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "ios",
      "body": {
        "taskId": lIiIiI,
        "linkId": I1Ilii
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          ll1Iii = await I1Ilil.getH5st(Ii1Ill);
    let IIlII1 = {
      "url": "https://api.m.jd.com/api?" + ll1Iii.params,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        "Cookie": III1Il,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(IIlII1, async (ll1Iil, li1lI, iliiiI) => {
      try {
        if (ll1Iil) {
          console.log("" + JSON.stringify(ll1Iil));
        } else {
          iliiiI = JSON.parse(iliiiI);

          if (iliiiI.code == 0) {} else {
            if (iliiiI.code == 402) {} else {}
          }
        }
      } catch (Ii1IlI) {
        $.logErr(Ii1IlI, li1lI);
      } finally {
        Ii1Ili();
      }
    });
  });
}

async function l1I1II(Ii1Il1) {
  return new Promise(async iliii1 => {
    const I111 = {
      "appId": "76674",
      "functionId": "apCheckTaskTimeEnd",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "ios",
      "body": {
        "taskId": Ii1Il1,
        "linkId": I1Ilii
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          I1I11l = await I1Ilil.getH5st(I111);
    let I1I11i = {
      "url": "https://api.m.jd.com/api?" + I1I11l.params,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        "Cookie": III1Il,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(I1I11i, async (l1iI1l, III1ll, l1lIIi) => {
      try {
        if (l1iI1l) console.log("" + JSON.stringify(l1iI1l));else {
          l1lIIi = JSON.parse(l1lIIi);
          if (l1lIIi.code == 0) console.log("浏览时间结束");else l1lIIi.code == 402 ? console.log("浏览时间失败," + (l1lIIi?.["errMsg"] || "")) : console.log("浏览时间失败," + (l1lIIi?.["errMsg"] || ""));
        }
      } catch (iilIiI) {
        $.logErr(iilIiI, III1ll);
      } finally {
        iliii1();
      }
    });
  });
}

async function iIIlil() {
  return new Promise(async l1iI1i => {
    const III1lI = {
      "appId": "ebecc",
      "functionId": "apDoLimitTimeTask",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "ios",
      "body": {
        "linkId": I1Ilii
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          I11i = await I1Ilil.getH5st(III1lI);
    let ll1IlI = {
      "url": "https://api.m.jd.com/",
      "body": "" + I11i.params,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-sign-in/index?activityId=FIz2zkvbepstVFm3uqLOUA&channel=15&jumpFrom=1&sid=d134f94730143fd973867531a06d7dbw&un_area=4_50950_50957_0",
        "User-Agent": $.UA,
        "Cookie": III1Il,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(ll1IlI, async (i1IiII, illI1l, l1ll1I) => {
      try {
        if (i1IiII) console.log("" + JSON.stringify(i1IiII));else {
          l1ll1I = JSON.parse(l1ll1I);
          if (l1ll1I.code == 0) $.drawLotteryNum++, console.log("完成任务,抽奖次数：" + $.drawLotteryNum);else l1ll1I.code == 402 ? console.log("完成任务失败," + (l1ll1I?.["errMsg"] || "")) : console.log("完成任务失败," + (l1ll1I?.["errMsg"] || ""));
        }
      } catch (lIllli) {
        $.logErr(lIllli, illI1l);
      } finally {
        l1iI1i();
      }
    });
  });
}

async function IiIiI1(lIllll, I11I, ll1Ili) {
  return new Promise(async IlIi11 => {
    const III1iI = {
      "appId": "54ed7",
      "functionId": "apsDoTask",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "ios",
      "body": {
        "taskType": lIllll,
        "taskId": I11I,
        "channel": 4,
        "checkVersion": true,
        "cityId": "",
        "provinceId": "",
        "countyId": "",
        "linkId": I1Ilii,
        "itemId": ll1Ili
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          iIIlIl = await I1Ilil.getH5st(III1iI);
    let iIIlIi = {
      "url": "https://api.m.jd.com/api?" + iIIlIl.params,
      "headers": {
        "origin": "https://h5platform.jd.com",
        "Referer": "https://h5platform.jd.com/swm-stable/BVersion-rich-tree/index?activityId=_LN1l_4Nv5mTEsWhs3hIMA&pageSource=wojing&channel=8&sid=a2464e50b796abc87714ea85905ddddw&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        "Cookie": III1Il,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(iIIlIi, async (i111l, lIiIlI, iilIlI) => {
      try {
        if (i111l) console.log("" + JSON.stringify(i111l));else {
          iilIlI = JSON.parse(iilIlI);
          if (iilIlI.code == 0) console.log("完成任务,获得抽奖次数：" + iilIlI?.["data"]?.["finishNeed"]), $.drawLotteryNum++;else iilIlI.code == 402 ? console.log("完成任务失败," + (iilIlI?.["errMsg"] || "")) : console.log("完成任务失败," + (iilIlI?.["errMsg"] || ""));
        }
      } catch (l1III) {
        $.logErr(l1III, lIiIlI);
      } finally {
        IlIi11();
      }
    });
  });
}

function iIIlii(III1l1) {
  III1l1 = III1l1 || 32;
  let lIiIli = "abcdef0123456789",
      IiIII = lIiIli.length,
      IiIiii = "";

  for (i = 0; i < III1l1; i++) IiIiii += lIiIli.charAt(Math.floor(Math.random() * IiIII));

  return IiIiii;
}

async function llIII1(IlIi) {
  return new Promise(async lIllii => {
    const IIiI = {
      "appId": "f2b1d",
      "functionId": "superRedBagList",
      "appid": "activities_platform",
      "clientVersion": "12.0.1",
      "client": "ios",
      "body": {
        "linkId": I1Ilii,
        "pageNum": IlIi,
        "pageSize": 100,
        "business": "richTree"
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          l1iil1 = await I1Ilil.getH5st(IIiI);
    let iiiIiI = {
      "url": "https://api.m.jd.com/api?" + l1iil1.params,
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": III1Il
      },
      "timeout": 30 * 1000
    };
    $.get(iiiIiI, async (lillI, Il11i, illl11) => {
      try {
        if (lillI) console.log("" + JSON.stringify(lillI));else {
          illl11 = JSON.parse(illl11);

          if (illl11) {
            if (illl11.code == 0 && illl11.success == true) {
              const iiI1 = (illl11.data.items || []).filter(Il11l => Il11l.prizeType === 4 && Il11l.state === 0 || Il11l.state === 2);

              for (let l1iiil of iiI1) {
                console.log("摇钱树提现，去提现" + l1iiil.amount + "现金");
                await IiIiI(l1iiil.id, l1iiil.poolBaseId, l1iiil.prizeGroupId, l1iiil.prizeBaseId);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));

                if ($.txhot) {
                  console.log("摇钱树提现失败，当月额度已满");
                  break;
                }
              }
            } else console.log("摇钱树提现查询奖品：异常:" + JSON.stringify(illl11));
          }
        }
      } catch (IIi1) {
        $.logErr(IIi1, Il11i);
      } finally {
        lIllii();
      }
    });
  });
}

async function IiIiI(l1iiii, iiiIi1, illl1l, Il11I) {
  return new Promise(async i1Ii1I => {
    const iiiIii = {
      "linkId": I1Ilii,
      "businessSource": "NONE",
      "base": {
        "prizeType": 4,
        "business": "richTree",
        "id": l1iiii,
        "poolBaseId": iiiIi1,
        "prizeGroupId": illl1l,
        "prizeBaseId": Il11I
      }
    },
          IllI1 = {
      "url": "https://api.m.jd.com",
      "body": "functionId=apCashWithDraw&body=" + escape(JSON.stringify(iiiIii)) + "&_t=" + +new Date() + "&appid=activities_platform",
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": III1Il
      },
      "timeout": 30 * 1000
    };
    $.post(IllI1, async (iiiIil, lilll, l1iilI) => {
      try {
        if (iiiIil) console.log("" + JSON.stringify(iiiIil)), console.log($.name + " API请求失败，请检查网路重试");else {
          if (IiIii(l1iilI)) {
            l1iilI = $.toObj(l1iilI);

            if (l1iilI.code === 0) {
              if (l1iilI.data.status === "310") console.log("提现现金成功！");else {
                console.log("提现现金：失败:" + l1iilI.data.message);
                if (l1iilI.data.message.includes("上限")) $.txhot = true;else {
                  if (l1iilI.data.message.includes("已存在状态")) {
                    await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
                    await IiIiI(l1iiii, iiiIi1, illl1l, Il11I);
                  }
                }
              }
            } else console.log("提现现金：异常:" + JSON.stringify(l1iilI));
          }
        }
      } catch (ilI1l1) {
        $.logErr(ilI1l1, lilll);
      } finally {
        i1Ii1I(l1iilI);
      }
    });
  });
}

function iill1I(iiiIli, IllIl, IllIi, IIli) {
  return new Promise(iilllI => {
    const iillil = {
      "linkId": I1Ilii,
      "businessSource": "fission",
      "business": "business",
      "drawRecordId": iiiIli,
      "poolId": IllIl,
      "prizeGroupId": IllIi,
      "prizeId": IIli
    },
          iillii = {
      "url": "https://api.m.jd.com",
      "body": "functionId=apRecompenseDrawPrize&body=" + escape(JSON.stringify(iillil)) + "&_t=" + +new Date() + "&appid=activities_platform",
      "headers": {
        "Referer": "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        "origin": "https://pro.m.jd.com",
        "User-Agent": $.UA,
        "Cookie": III1Il
      },
      "timeout": 30 * 1000
    };
    $.post(iillii, async (liIIII, iI11ii, IIllII) => {
      try {
        if (liIIII) {
          console.log("" + JSON.stringify(liIIII));
          console.log($.name + " API请求失败，请检查网路重试");
        } else IiIii(IIllII) && (IIllII = $.toObj(IIllII), IIllII.code == 0 ? console.log("兑换红包成功") : console.log("兑换红包失败:" + IIllII.errMsg));
      } catch (I111il) {
        $.logErr(I111il, iI11ii);
      } finally {
        iilllI(IIllII);
      }
    });
  });
}

async function Illi1() {
  for (var iliill = "", I111ii = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", Ililll = 0; Ililll < 16; Ililll++) {
    var I1liII = Math.round(Math.random() * (I111ii.length - 1));
    iliill += I111ii.substring(I1liII, I1liII + 1);
  }

  return uuid = Buffer.from(iliill, "utf8").toString("base64"), ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "CJGkEK==",
      "ud": uuid,
      "iad": ""
    },
    "ciphertype": 5,
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile"
  })), "jdapp;iPhone;12.0.1;;;M/5.0;appBuild/168684;jdSupportDarkMode/0;ef/1;ep/" + ep + ";Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}

function l1iiIl(II1i1I = "xxxxxxxxxxxxxxxxxxxx") {
  return II1i1I.replace(/[xy]/g, function (iI11l1) {
    var IlIii = Math.random() * 10 | 0,
        iI11lI = iI11l1 == "x" ? IlIii : IlIii & 3 | 8;
    return jdaid = iI11lI.toString(), jdaid;
  });
}

function lIIi1i(II1i11) {
  return new Promise(I1ii11 => {
    const iI11i1 = {
      "url": "" + II1i11,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(iI11i1, async (iIill, iil1Ii, iii11i) => {
      try {
        if (iIill) {} else iii11i ? iii11i = JSON.parse(iii11i) : console.log("未获取到数据,请重新运行");
      } catch (I111i1) {
        $.logErr(I111i1, iil1Ii);
        iii11i = null;
      } finally {
        I1ii11(iii11i);
      }
    });
  });
}

function liI11I(l1Ilil, iIili) {
  return Math.floor(Math.random() * (iIili - l1Ilil)) + l1Ilil;
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
