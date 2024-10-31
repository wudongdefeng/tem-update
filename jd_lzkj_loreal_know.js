/*
活动名称：知识超人（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10039&templateId=<模板id>&activityId=<活动id>&prd=cjwx
		https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10039&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_know_url // 活动链接
		jd_lzkj_loreal_know_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_know_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_know_break // 493后继续执行，默认退出运行（true/false）

注：活动接口没有登记正确答案所以脚本可能会出现答题失败的情况，不过脚本会自动排除错误答案，为了提高头部账号的成功率脚本采用倒序运行账号

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#知识超人（超级无线）
1 1 1 1 * jd_lzkj_loreal_know.js, tag=知识超人（超级无线）, enabled=true

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('知识超人（超级无线）')
var version_ = "jsjiami.com.v7";
const li1I = require("./jdCookie"),
  IIliil = require("./function/jdCommon"),
  ll1liI = require("./function/sendJDNotify"),
  lI1iiI = require("./function/krgetToken"),
  {
    wuxianDefense: i11lII
  } = require("./function/jdCrypto"),
  {
    loreal_savePrize: iIIlli
  } = require("./function/krsavePrize"),
  ll1li1 = process.env.jd_lzkj_loreal_know_url || "",
  iIIlll = process.env.jd_lzkj_loreal_know_opencard === "true",
  I1iiiI = process.env.jd_lzkj_loreal_know_break === "true",
  iiI1il = process.env.jd_lzkj_loreal_know_Notify === "true";
let iiI1ii = "",
  I1iii1 = "";
const lilii1 = Object.keys(li1I).map(ll1lii => li1I[ll1lii]).filter(li11 => li11);
!lilii1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!ll1li1) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const I1Illi = IIliil.parseUrl(ll1li1);
  if (!I1Illi) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = ll1li1;
  $.activityId = IIliil.getUrlParameter(ll1li1, "activityId");
  $.activityType = IIliil.getUrlParameter(ll1li1, "activityType");
  $.hostname = I1Illi.hostname;
  $.pathname = I1Illi.pathname;
  let IIlilI = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      IIlilI = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (IIlilI = $.pathname.replace(/\/index$/, ""));
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + IIlilI;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !IIlilI || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  ll1liI.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  lilii1.reverse();
  for (let ilIIiI = 0; ilIIiI < lilii1.length; ilIIiI++) {
    $.index = ilIIiI + 1;
    iiI1ii = lilii1[ilIIiI];
    I1iii1 = lilii1[ilIIiI];
    IIliil.setCookie(I1iii1);
    $.UserName = decodeURIComponent(IIliil.getCookieValue(iiI1ii, "pt_pin"));
    $.UA = IIliil.genUA($.UserName);
    $.UUID = IIliil.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = ll1liI.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
    await iIiii1();
    IIliil.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  iiI1il && ll1liI.getMessage() && (ll1liI.updateContent(ll1liI.content + ("\n【活动地址】" + $.activityUrl)), await ll1liI.push());
})().catch(lIl1il => $.logErr(lIl1il)).finally(() => $.done());
async function iIiii1() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await lI1iiI(I1iii1, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await IIlil1("login");
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await $.wait(500);
    if ($.joinCode) {
      switch ($.joinCode) {
        case "1004":
          await IIlil1("follow");
          await $.wait(500);
          await IIlil1("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
          break;
        case "1005":
          await IIlil1("follow");
          await $.wait(500);
          await IIlil1("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
        case "1006":
          if (iIIlll) {
            const Ii11I = await IIliil.joinShopMember($.venderId);
            if (Ii11I) {
              console.log("加入店铺会员成功");
              await IIlil1("login");
              if ($.runEnd || $.outFlag || $.skipRun) {
                return;
              }
              await $.wait(500);
            } else {
              console.log("加入店铺会员失败，活动仅限店铺会员参与哦~");
              $.message.fix("加入店铺会员失败，活动仅限店铺会员参与");
              return;
            }
          } else {
            console.log("活动仅限店铺会员参与哦~");
            $.message.fix("活动仅限店铺会员参与");
            return;
          }
          break;
        default:
          if ($.joinCode !== "1001") {
            console.log($.joinDes);
            $.message.fix($.joinDes);
            return;
          }
          break;
      }
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
    } else {
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      console.log("未能获取用户活动状态");
      $.message.fix("未能获取用户活动状态");
      return;
    }
    if ($.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas")) {
      await IIlil1("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      await IIlil1("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      switch ($.activityType) {
        case "10039":
          break;
        case "":
          console.log("未能获取活动类型");
          $.message.fix("未能获取活动类型");
          $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！");
          $.message.fix("活动类型（" + $.activityType + "）不受支持");
          $.runEnd = true;
          return;
      }
      if ($.runEnd || $.outFlag) {
        return;
      }
      await $.wait(500);
    }
    await IIlil1("activity");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      await IIlil1("drawPrize");
      await $.wait(500);
      const Ii111 = $.prizeInfo[0]?.["prizeName"],
        Ii1III = $.prizeInfo[0]?.["prizeType"],
        ilIIi1 = $.prizeInfo[0]?.["leftNum"];
      let l111i = ilIIi1 >= 1,
        l111l = "" + Ii111 + (Ii1III === 5 ? "[专享价]" : Ii1III === 3 ? "[实物]" : "") + "，" + (ilIIi1 >= 1 ? "剩余" + ilIIi1 + "件" : "已发完");
      console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + l111l + "\n");
      ll1liI.updateContent(ll1liI.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【活动奖品】" + l111l));
      const I1iilI = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        Ii1II1 = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const lilili = Date.now();
          if ($.actStartTime && lilili < $.actStartTime) {
            console.log("活动将在 " + I1iilI + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + I1iilI);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && lilili > $.actEndTime) {
            console.log("活动已于 " + Ii1II1 + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + Ii1II1);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + I1iilI + " 开始，晚点再来吧~");
          $.message.fix("活动尚未开始，开始时间：" + I1iilI);
          $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + Ii1II1 + " 结束，下次早点来吧~");
          $.message.fix("活动已结束，结束时间：" + Ii1II1);
          $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!l111i) {
        console.log("奖品已全部发完了，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    !$.activityQaBankByIds && ($.activityQaBankByIds = $.activityContent?.["activityQaBankByIds"]);
    const Il1II = $.activityContent?.["anCount"];
    await IIlil1("startAnswer");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    l1IIli: for (let IliIli = 0; IliIli < Il1II; IliIli++) {
      iII1I1: for (IliIli = 0; IliIli < $.activityQaBankByIds.length; IliIli++) {
        const lI1ilI = $.activityQaBankByIds[IliIli],
          IllliI = lI1ilI?.["questionType"],
          IliIll = lI1ilI?.["qaAnswerList"] || [];
        $.questionId = lI1ilI?.["questionId"];
        switch (IllliI) {
          case 1:
            const iIiili = Math.floor(Math.random() * IliIll.length);
            $.answersId = IliIll[iIiili]?.["answerId"];
            $.answerFailed = false;
            $.answerSucceeded = false;
            await IIlil1("answer");
            await $.wait(500);
            if ($.runEnd || $.outFlag || $.skipRun) {
              return;
            }
            if ($.answerFailed) {
              IliIll.splice(iIiili, 1);
              break iII1I1;
            } else {
              if ($.answerSucceeded) {
                const Ili1I1 = IliIll.indexOf(IliIll[iIiili]);
                Ili1I1 !== -1 && (IliIll.splice(0, Ili1I1), IliIll.splice(1, IliIll.length));
              }
            }
            break;
          case 2:
            const lilill = lI1ilI?.["rightCount"];
            let IilI1 = [];
            for (let lI1I1i = 0; lI1I1i < lilill; lI1I1i++) {
              let i1Iii1;
              do {
                i1Iii1 = Math.floor(Math.random() * IliIll.length);
              } while (IilI1.includes(i1Iii1));
              IilI1.push(i1Iii1);
              $.answersId = IliIll[i1Iii1]?.["answerId"];
              $.answerFailed = false;
              $.answerSucceeded = false;
              await IIlil1("answer");
              await $.wait(500);
              if ($.runEnd || $.outFlag || $.skipRun) {
                return;
              }
              if ($.answerFailed) {
                IliIll.splice(i1Iii1, 1);
                break iII1I1;
              } else {
                $.answerSucceeded && (IliIll[i1Iii1].rightAnswer = true);
              }
            }
            for (let l1liii = 0; l1liii < IliIll.length; l1liii++) {
              !IliIll[l1liii].rightAnswer && (IliIll.splice(l1liii, 1), l1liii--);
            }
            break;
          default:
            console.log("未知题目类型 " + IllliI);
            $.message.fix("未知题目类型 " + IllliI);
            $.runEnd = true;
            return;
        }
        if ($.answerCompleted) {
          break l1IIli;
        }
      }
    }
  } catch (l1liil) {
    console.log("❌ 脚本运行遇到了错误\n" + l1liil);
  }
}
async function ll1lil(lilI1I, lI1I1l) {
  try {
    switch (lilI1I) {
      case "login":
        if (lI1I1l.resp_code === 0 && lI1I1l.data) {
          $.token = lI1I1l?.["data"]?.["token"];
          $.joinInfo = lI1I1l?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = lI1I1l?.["data"]?.["shopId"];
          $.venderId = IIliil.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = lI1I1l?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          if (lI1I1l.resp_msg) {
            console.log(lilI1I + " " + lI1I1l.resp_msg);
            $.message.fix(lI1I1l.resp_msg);
            $.skipRun = true;
          } else {
            console.log("❓" + lilI1I + " " + JSON.stringify(lI1I1l));
          }
        }
        break;
      case "follow":
        if (!(lI1I1l.resp_code === 0)) {
          lI1I1l.resp_msg ? (console.log(lilI1I + " " + lI1I1l.resp_msg), $.message.fix(lI1I1l.resp_msg), $.skipRun = true) : console.log("❓" + lilI1I + " " + JSON.stringify(lI1I1l));
        }
        break;
      case "initPinToken":
        if (lI1I1l.resp_code === 0 && lI1I1l.data) {
          lI1I1l = JSON.parse(lI1I1l.data);
          if (lI1I1l.resp_code === 0 && lI1I1l.data) {
            $.pinToken = lI1I1l?.["data"]?.["pinToken"];
            $.encryptPin = lI1I1l?.["data"]?.["encryptPin"];
          } else {
            if (lI1I1l.resp_code === 1000) {
              console.log(lilI1I + " " + lI1I1l.resp_msg);
              $.message.fix(lI1I1l.resp_msg);
              $.skipRun = true;
            } else {
              lI1I1l.resp_msg ? (console.log(lilI1I + " " + lI1I1l.resp_msg), $.message.fix(lI1I1l.resp_msg), $.skipRun = true) : (console.log("❓" + lilI1I + " " + JSON.stringify(lI1I1l)), $.skipRun = true);
            }
          }
        } else {
          console.log("❓" + lilI1I + " " + JSON.stringify(lI1I1l));
        }
        break;
      case "basicInfo":
        if (lI1I1l.resp_code === 0 && lI1I1l.data) {
          $.actStartTime = lI1I1l.data?.["startTime"];
          $.actEndTime = lI1I1l.data?.["endTime"];
          $.actStatus = lI1I1l.data?.["actStatus"];
          !$.activityType && ($.activityType = String(lI1I1l.data?.["actType"] || ""));
        } else {
          if (lI1I1l.resp_msg) {
            console.log(lilI1I + " " + lI1I1l.resp_msg);
            $.message.fix(lI1I1l.resp_msg);
          } else {
            console.log("❓" + lilI1I + " " + JSON.stringify(lI1I1l));
          }
        }
        break;
      case "activity":
        if (lI1I1l.resp_code === 0 && lI1I1l.data) {
          $.activityContent = lI1I1l.data;
        } else {
          lI1I1l.resp_msg ? (console.log(lilI1I + " " + lI1I1l.resp_msg), $.message.fix(lI1I1l.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(iiiI11 => lI1I1l.resp_msg.includes(iiiI11)) && ($.runEnd = true)) : (console.log("❓" + lilI1I + " " + JSON.stringify(lI1I1l)), $.skipRun = true);
        }
        break;
      case "drawPrize":
        if (lI1I1l.resp_code === 0) {
          $.prizeInfo = lI1I1l?.["data"]?.["prizeInfo"] || [];
        } else {
          lI1I1l.resp_msg ? (console.log(lilI1I + " " + lI1I1l.resp_msg), ["未开始", "结束", "不存在", "不在"].some(l1lil1 => lI1I1l.resp_msg.includes(l1lil1)) && ($.runEnd = true), $.message.fix(lI1I1l.resp_msg)) : console.log("❓" + lilI1I + " " + JSON.stringify(lI1I1l));
        }
        break;
      case "startAnswer":
        if (lI1I1l.resp_code === 0) {
          if (lI1I1l.data === "1") {
            console.log("没有答题次数了~");
            $.message.insert("答题机会不足");
            $.skipRun = true;
          } else {
            if (lI1I1l.data === 2) {
              console.log("答题已通关");
              $.message.insert("答题已通关");
              $.skipRun = true;
            } else {
              $.recordId = lI1I1l?.["data"];
            }
          }
        } else {
          lI1I1l.resp_msg ? (["未开始", "结束", "不存在", "不在"].some(IilII => lI1I1l.resp_msg.includes(IilII)) && ($.runEnd = true), console.log(lilI1I + " " + lI1I1l.resp_msg), $.message.fix(lI1I1l.resp_msg), $.skipRun = true) : (console.log("❓" + lilI1I + " " + JSON.stringify(lI1I1l)), $.skipRun = true);
        }
        break;
      case "answer":
        if (lI1I1l.resp_code === 0) {
          if (lI1I1l.data === "1") {
            $.answerSucceeded = true;
          } else {
            if (lI1I1l.data === "2") {
              console.log("答题失败");
              $.message.insert("答题失败");
              $.answerFailed = true;
            } else {
              $.answerCompleted = true;
              const i1lii = lI1I1l.data;
              if (i1lii) {
                switch (i1lii.prizeType) {
                  case 1:
                    console.log("🎉 " + i1lii.prizeName + " 🐶");
                    $.message.insert(i1lii.prizeName + "🐶");
                    break;
                  case 2:
                    console.log("🗑️ 优惠券");
                    $.message.insert("🗑️ 优惠券");
                    break;
                  case 3:
                    const iilIII = lI1I1l.data.addressId,
                      liI1Il = i1lii.prizeName;
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + liI1Il);
                    if (i1lii.showImg) {
                      console.log("预览图片：" + i1lii.showImg);
                    }
                    const I1iIi = {
                        baseUrl: $.baseUrl,
                        newbaseUrl: $.newbaseUrl,
                        cookie: I1iii1,
                        ua: $.UA,
                        token: $.token,
                        prizeName: liI1Il,
                        orderCode: iilIII
                      },
                      iiiI1I = await iIIlli(I1iIi);
                    !iiI1il && iiiI1I && (await ll1liI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + liI1Il + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                    $.message.insert(liI1Il + "(" + (iiiI1I ? "已填地址" : "未填地址") + ")🎁");
                    break;
                  case 4:
                  case 11:
                    console.log("🗑️ " + i1lii.prizeName + " 🎟️");
                    $.message.insert("🗑️ " + i1lii.prizeName + " 🎟️");
                    break;
                  case 5:
                    console.log("🗑️ 专享价");
                    $.message.insert("🗑️ 专享价");
                    break;
                  case 6:
                    console.log("🎉 " + i1lii.prizeName + " 🧧");
                    $.message.insert("🎉 " + i1lii.prizeName + " 🧧");
                    break;
                  case 7:
                  case 8:
                  case 9:
                  case 10:
                  case 12:
                    console.log("🎉 恭喜获得" + i1lii.prizeName + " 🎁");
                    $.message.insert("🎉 恭喜获得" + i1lii.prizeName + " 🎁");
                    !iiI1il && (await ll1liI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + i1lii.prizeName + "\n\n" + $.activityUrl));
                    break;
                  default:
                    console.log(i1lii);
                    break;
                }
              } else {
                console.log("💨 空气");
                $.message.insert("💨 空气");
              }
            }
          }
        } else {
          lI1I1l.resp_msg ? (console.log(lilI1I + " " + lI1I1l.resp_msg), ["未开始", "结束", "不存在", "不在"].some(lilI11 => lI1I1l.resp_msg.includes(lilI11)) && ($.runEnd = true), $.message.fix(lI1I1l.resp_msg)) : console.log("❓" + lilI1I + " " + JSON.stringify(lI1I1l));
        }
        break;
    }
  } catch (ili1i) {
    console.log("❌ 未能正确处理 " + lilI1I + " 请求响应 " + (ili1i.message || ili1i));
  }
}
async function IIlil1(l1Ii1) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let III1I1 = $.newbaseUrl,
    ilI111 = {},
    I1IllI = {},
    IIlI11 = "POST";
  switch (l1Ii1) {
    case "login":
      III1I1 += "/api/user-info/login";
      ilI111 = {
        status: "1",
        activityId: $.activityId,
        tokenPin: $.jdToken,
        source: "01",
        shareUserId: $.shareUserId || "",
        uuid: $.UUID
      };
      break;
    case "follow":
      III1I1 += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      IIlI11 = "GET";
      III1I1 += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      III1I1 += "/api/active/basicInfo";
      ilI111 = {
        activityId: $.activityId
      };
      break;
    case "activity":
      III1I1 += "/api/task/know/activity";
      break;
    case "drawPrize":
      III1I1 += "/api/prize/drawPrize";
      break;
    case "startAnswer":
      III1I1 += "/api/task/know/startAnswer";
      break;
    case "answer":
      III1I1 += "/api/task/know/answer";
      ilI111 = {
        answersId: $.answersId,
        questionId: $.questionId,
        recordId: $.recordId
      };
      break;
    default:
      console.log("❌ 未知请求 " + l1Ii1);
      return;
  }
  const iIIll1 = IIlI11 === "POST" && $.pathname.includes("/prod/cc/interactsaas") && i11lII.isDefenseApi(III1I1.replace($.newbaseUrl, "").split("?")[0]);
  iIIll1 && (ilI111.actId = $.activityId, I1IllI = {
    ecyText: i11lII.encrypt(ilI111, $.pinToken, $.te)
  });
  const llIIII = {
    url: III1I1,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      Connection: "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: "IsvToken=" + $.jdToken + "; " + ($.pinToken ? ";pToken=" + $.pinToken : "") + ($.te ? ";te=" + $.te : ""),
      Host: $.hostname,
      Origin: $.origin,
      Referer: $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    body: JSON.stringify(iIIll1 ? I1IllI : ilI111),
    timeout: 30000
  };
  $.token && (llIIII.headers.token = $.token);
  IIlI11 === "GET" && (delete llIIII.body, delete llIIII.headers["Content-Type"]);
  const ilI11I = 5;
  let ili1I = 0,
    iilIIl = null,
    i1Iili = false;
  while (ili1I < ilI11I) {
    ili1I > 0 && (await $.wait(1000));
    const {
      err: IiIil,
      res: IiIii,
      data: iill1l
    } = await I1Illl(llIIII, IIlI11);
    if (IiIil) {
      if (typeof IiIil === "string" && IiIil.includes("Timeout awaiting 'request'")) {
        iilIIl = l1Ii1 + " 请求超时，请检查网络重试";
      } else {
        const IiIiII = IiIii?.["statusCode"];
        if (IiIiII) {
          if ([403, 493].includes(IiIiII)) {
            iilIIl = l1Ii1 + " 请求失败，IP被限制（Response code " + IiIiII + "）";
            i1Iili = true;
          } else {
            if ([400, 404].includes(IiIiII)) {
              iilIIl = l1Ii1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + IiIiII + "）";
            } else {
              if ([500].includes(IiIiII) && iIIll1) {
                llIIII.body = JSON.stringify({
                  ecyText: i11lII.encrypt(ilI111, $.pinToken, $.te)
                });
              } else {
                iilIIl = l1Ii1 + " 请求失败（Response code " + IiIiII + "）";
              }
            }
          }
        } else {
          iilIIl = l1Ii1 + " 请求失败 => " + (IiIil.message || IiIil);
        }
      }
      ili1I++;
    } else {
      const iill1I = IIliil.getResponseCookie(IiIii);
      switch (l1Ii1) {
        case "initPinToken":
          const III1 = IIliil.getCookieValue(iill1I, "te");
          III1 && ($.te = III1);
          break;
      }
      if (iill1l) {
        try {
          const l1IIl1 = JSON.parse(iill1l);
          ll1lil(l1Ii1, l1IIl1);
          break;
        } catch (lIIi1l) {
          iilIIl = "❌ " + l1Ii1 + " 接口响应数据解析失败: " + lIIi1l.message;
          console.log("🚫 " + l1Ii1 + " => " + String(iill1l));
          ili1I++;
        }
      } else {
        iIIll1 && (llIIII.body = JSON.stringify({
          ecyText: i11lII.encrypt(ilI111, $.pinToken, $.te)
        }));
        iilIIl = "❌ " + l1Ii1 + " 接口无响应数据";
        ili1I++;
      }
      i1Iili = false;
    }
  }
  if (ili1I >= ilI11I) {
    console.log(iilIIl);
    if (i1Iili) {
      if (!I1iiiI) {
        $.outFlag = true;
        $.message && $.message.fix(iilIIl);
      }
    }
  }
}
async function I1Illl(iII1Il, IIIliI = "POST") {
  if (IIIliI === "POST") {
    return new Promise(async l1l11 => {
      $.post(iII1Il, (illill, IIIli1, I1lI11) => {
        l1l11({
          err: illill,
          res: IIIli1,
          data: I1lI11
        });
      });
    });
  } else {
    if (IIIliI === "GET") {
      return new Promise(async l1l1I => {
        $.get(iII1Il, (iIlI1I, I1I1Ii, IiIl1) => {
          l1l1I({
            err: iIlI1I,
            res: I1I1Ii,
            data: IiIl1
          });
        });
      });
    } else {
      const IIIi = "不支持的请求方法";
      return {
        err: IIIi,
        res: null,
        data: null
      };
    }
  }
}
var version_ = "jsjiami.com.v7";
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
