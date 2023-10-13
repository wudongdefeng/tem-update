/*
活动名称：组队瓜分奖品（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10033&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_organizeTeam_url // 活动链接
		jd_lzkj_loreal_organizeTeam_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_organizeTeam_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_organizeTeam_break // 493后继续执行，默认退出运行（true/false）
		
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#组队瓜分奖品（超级无线）
1 1 1 1 * jd_lzkj_loreal_organizeTeam.js, tag=组队瓜分奖品（超级无线）, enabled=true		

*/
let lnrun = 0;


const $ = new Env('组队瓜分奖品（超级无线）')
const IIill1l = require("./jdCookie"),
  IIIIil1l = require("./function/jdCommon"),
  II1ii1il = require("./function/sendJDNotify"),
  lil1iII1 = require("./function/krgetToken"),
  iI1Il11I = process.env.jd_lzkj_loreal_organizeTeam_url || "",
  iiIiiIii = process.env.jd_lzkj_loreal_organizeTeam_opencard === "true",
  IIIIII1 = process.env.jd_lzkj_loreal_organizeTeam_Notify === "true",
  iI1ili1l = process.env.jd_lzkj_loreal_organizeTeam_break === "true";
let I1Iilili = "",
  iiliIII = "";
const IIl1l11i = Object.keys(IIill1l).map(I1l1I1Ii => IIill1l[I1l1I1Ii]).filter(i1ililiI => i1ililiI);
!IIl1l11i[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!iI1Il11I) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const iliIi1Il = IIIIil1l.parseUrl(iI1Il11I);
  if (!iliIi1Il) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = iI1Il11I;
  $.activityId = IIIIil1l.getUrlParameter(iI1Il11I, "activityId");
  $.activityType = IIIIil1l.getUrlParameter(iI1Il11I, "activityType");
  $.hostname = iliIi1Il?.["hostname"];
  let iiIliIl1 = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      iiIliIl1 = "apps/interact";
    } else $.hostname.includes("lzkj") && (iiIliIl1 = iI1Il11I.match(/\/(prod\/cc\/interact\w*)\//)[1]);
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + iiIliIl1;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !iiIliIl1 || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  II1ii1il.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let iiil1ilI = 0; iiil1ilI < IIl1l11i.length; iiil1ilI++) {
    $.index = iiil1ilI + 1;
    I1Iilili = IIl1l11i[iiil1ilI];
    iiliIII = IIl1l11i[iiil1ilI];
    IIIIil1l.setCookie(iiliIII);
    $.UserName = decodeURIComponent(IIIIil1l.getCookieValue(I1Iilili, "pt_pin"));
    $.UA = IIIIil1l.genUA($.UserName);
    $.UUID = IIIIil1l.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = II1ii1il.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      lnrun++;if(lnrun == 7){console.log(`\n【访问接口次数达到6次，休息一分钟.....】\n`);await $.wait(120 * 1000);lnrun = 0}
    await lil1I1ii();
    IIIIil1l.unsetCookie();
    if ($.outFlag || $.runEnd) break;
  }
  const Ilil11I1 = II1ii1il.getMessage();
  Ilil11I1 && (console.log("\n📣运行结果\n" + Ilil11I1.replace(/：/g, " ➜ ")), IIIIII1 && (II1ii1il.updateContent(II1ii1il.content + ("\n【活动地址】" + $.activityUrl)), await II1ii1il.push()));
})().catch(liIi1l1I => $.logErr(liIi1l1I)).finally(() => $.done());
async function lil1I1ii() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await lil1iII1(iiliIII, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await liiIiIlI("login");
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await $.wait(500);
    if ($.joinCode) {
      switch ($.joinCode) {
        case "1004":
          await liiIiIlI("follow"), await $.wait(500);
          break;
        case "1005":
        case "1006":
          $.joinCode !== "1005" && (await liiIiIlI("follow"));
          if (iiIiiIii) {
            const l11i1I1l = await IIIIil1l.joinShopMember($.venderId);
            if (l11i1I1l) console.log("加入店铺会员成功");else {
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
      if ($.runEnd || $.outFlag || $.skipRun) return;
    } else {
      if ($.runEnd || $.outFlag || $.skipRun) return;
      console.log("未能获取用户活动状态");
      $.message.fix("未能获取用户活动状态");
      return;
    }
    if ($.hostname.includes("lzkj")) {
      await liiIiIlI("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    await liiIiIlI("activity");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      await liiIiIlI("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      switch ($.activityType) {
        case "10033":
          break;
        case "":
          console.log("未能获取活动类型"), $.message.fix("未能获取活动类型"), $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.message.fix("活动类型（" + $.activityType + "）不受支持"), $.runEnd = true;
          return;
      }
      const iIlllIii = $.activityContent?.["prizeType"];
      let l1i11Ii = "",
        Iill1iiI = "";
      switch (iIlllIii) {
        case 1:
          l1i11Ii = "京豆", Iill1iiI = "🐶";
          break;
        case 4:
          l1i11Ii = "积分", Iill1iiI = "🎟️";
          break;
        default:
          l1i11Ii = "未知", Iill1iiI = "❓";
      }
      const i1I11I1l = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        IIilllI1 = $.time("yyyy-MM-dd HH:mm", $.actEndTime),
        i1liliii = $.activityContent?.["prizeList"][0]?.["totalPrizeNum"],
        i1il11ii = $.activityContent?.["groupNumber"],
        iiliIIiI = $.activityContent?.["captainPrize"],
        iI1Illl = $.activityContent?.["memberPrize"],
        lIilIl = "店铺名称：" + $.shopName + "\n开始时间：" + i1I11I1l + "\n结束时间：" + IIilllI1 + "\n奖品类型：" + l1i11Ii + " " + Iill1iiI + "\n总计奖池：" + i1liliii + "\n可组队伍：" + i1il11ii + " 🚗\n瓜分数量：" + 5 * iI1Illl + " " + Iill1iiI + "\n队长奖励：" + iiliIIiI + " " + Iill1iiI + "\n成员获得：" + iI1Illl + " " + Iill1iiI + "\n最高可得：" + (i1il11ii * (iiliIIiI + iI1Illl) + iI1Illl) + " " + Iill1iiI + "\n";
      II1ii1il.updateContent(II1ii1il.content + ("\n" + lIilIl));
      console.log(lIilIl);
      switch ($.actStatus) {
        case 0:
          const ill1IliI = Date.now();
          if ($.actStartTime && ill1IliI < $.actStartTime) {
            console.log("活动将在 " + i1I11I1l + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + i1I11I1l);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && ill1IliI > $.actEndTime) {
            console.log("活动已于 " + IIilllI1 + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + IIilllI1);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + i1I11I1l + " 开始，晚点再来吧~"), $.message.fix("活动尚未开始，开始时间：" + i1I11I1l), $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + IIilllI1 + " 结束，下次早点来吧~"), $.message.fix("活动已结束，结束时间：" + IIilllI1), $.runEnd = true;
          return;
        default:
          if ($.actStatus) {
            console.log("未知活动状态 " + $.actStatus);
            $.message.fix("未知活动状态 " + $.actStatus);
            $.runEnd = true;
          }
          break;
      }
      await $.wait(500);
    }
    if (!$.teamId) {
      let Iii1lil1 = $.activityContent?.["captainList"];
      const li1IIliI = $.activityContent?.["groupNumber"] * 4,
        ilI1ii = $.activityContent?.["joinFlag"];
      switch (ilI1ii) {
        case 5:
        case 2:
          await liiIiIlI("saveCaptain"), await $.wait(500);
          if ($.runEnd || $.outFlag || $.skipRun) return;
          await liiIiIlI("activity"), await $.wait(500), Iii1lil1 = $.activityContent?.["captainList"];
          for (const i1iiiil1 of Iii1lil1) {
            if (i1iiiil1.memberCount === 5) {
              continue;
            }
            $.teamId = i1iiiil1.id;
            break;
          }
          $.canJoinMembers = li1IIliI;
          break;
        case 3:
        case 4:
          let I1il1I1I = 0;
          for (const II1Iil11 of Iii1lil1) {
            I1il1I1I += II1Iil11.memberCount - 1;
            if (II1Iil11.memberCount === 5) continue;
            $.teamId = II1Iil11.id;
            break;
          }
          if (I1il1I1I >= li1IIliI) {
            console.log("队伍人数已满");
            $.message.fix("队伍已满");
            $.runEnd = true;
            return;
          } else console.log("已经是队长了"), $.message.fix("已是队长"), $.canJoinMembers = li1IIliI - I1il1I1I;
          break;
        default:
          console.log("未知队伍状态"), $.message.insert("未知队伍状态");
          break;
      }
      await liiIiIlI("getUserId");
      await $.wait(500);
    } else {
      const l1l111Ii = $.activityContent?.["captain"];
      if (l1l111Ii) {
        console.log("已经加入过队伍了");
        $.message.fix("已经加入过队伍");
      } else await liiIiIlI("saveMember"), await $.wait(500);
    }
  } catch (i1i1IlIl) {
    console.log("❌ 脚本运行遇到了错误\n" + i1i1IlIl);
  }
}
async function lII1I1i1(iii11, lillIiil) {
  try {
    switch (iii11) {
      case "login":
        if (lillIiil.resp_code === 0 && lillIiil.data) {
          $.token = lillIiil?.["data"]?.["token"];
          $.joinInfo = lillIiil?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = lillIiil?.["data"]?.["shopId"];
          $.venderId = IIIIil1l.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = lillIiil?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else lillIiil.resp_msg ? (console.log(iii11 + " " + lillIiil.resp_msg), $.message.fix(lillIiil.resp_msg), $.skipRun = true) : console.log("❓" + iii11 + " " + JSON.stringify(lillIiil));
        break;
      case "follow":
        if (lillIiil.resp_code === 0) {} else lillIiil.resp_msg ? (console.log(iii11 + " " + lillIiil.resp_msg), $.message.fix(lillIiil.resp_msg), $.skipRun = true) : console.log("❓" + iii11 + " " + JSON.stringify(lillIiil));
        break;
      case "initPinToken":
        if (lillIiil.resp_code === 0 && lillIiil.data) {
          lillIiil = JSON.parse(lillIiil.data);
          if (lillIiil.resp_code === 0 && lillIiil.data) $.pinToken = lillIiil?.["data"]?.["pinToken"], $.encryptPin = lillIiil?.["data"]?.["encryptPin"];else {
            if (lillIiil.resp_code === 1000) console.log(iii11 + " " + lillIiil.resp_msg), $.message.fix(lillIiil.resp_msg), $.skipRun = true;else lillIiil.resp_msg ? (console.log(iii11 + " " + lillIiil.resp_msg), $.message.fix(lillIiil.resp_msg), $.skipRun = true) : (console.log("❓" + iii11 + " " + JSON.stringify(lillIiil)), $.skipRun = true);
          }
        } else console.log("❓" + iii11 + " " + JSON.stringify(lillIiil));
        break;
      case "basicInfo":
        if (lillIiil.resp_code === 0 && lillIiil.data) {
          $.actStartTime = lillIiil.data?.["startTime"];
          $.actEndTime = lillIiil.data?.["endTime"];
          $.actStatus = lillIiil.data?.["actStatus"];
          $.shopName = lillIiil.data?.["shopName"];
          !$.activityType && ($.activityType = String(lillIiil.data?.["actType"] || ""));
        } else lillIiil.resp_msg ? (console.log(iii11 + " " + lillIiil.resp_msg), $.message.fix(lillIiil.resp_msg)) : console.log("❓" + iii11 + " " + JSON.stringify(lillIiil));
        break;
      case "activity":
        if (lillIiil.resp_code === 0 && lillIiil.data) $.activityContent = lillIiil.data;else {
          if (lillIiil.resp_msg) console.log(iii11 + " " + lillIiil.resp_msg), $.message.fix(lillIiil.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(Il1lIIIl => lillIiil.resp_msg.includes(Il1lIIIl)) && ($.runEnd = true);else {
            console.log("❓" + iii11 + " " + JSON.stringify(lillIiil));
            $.skipRun = true;
          }
        }
        break;
      case "getUserId":
        if (lillIiil.resp_code === 0 && lillIiil.data) $.shareUserId = lillIiil.data?.["shareUserId"];else lillIiil.resp_msg ? console.log(iii11 + " " + lillIiil.resp_msg) : console.log("❓" + iii11 + " " + JSON.stringify(lillIiil));
        break;
      case "saveCaptain":
        if (lillIiil.resp_code === 0) console.log("创建队伍成功"), $.message.fix("创建队伍成功");else lillIiil.resp_msg ? (console.log(iii11 + " " + lillIiil.resp_msg), $.message.insert(lillIiil.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(llI11Ill => lillIiil.resp_msg.includes(llI11Ill)) && ($.runEnd = true)) : (console.log("❓" + iii11 + " " + JSON.stringify(lillIiil)), $.skipRun = true);
        break;
      case "saveMember":
        if (lillIiil.resp_code === 0) console.log("加入队伍成功"), $.message.fix("加入队伍成功"), $.canJoinMembers -= 1, $.canJoinMembers <= 0 && (console.log("战队已满，运行完毕"), $.runEnd = true);else {
          if (lillIiil.resp_msg) {
            console.log(iii11 + " " + lillIiil.resp_msg);
            $.message.insert(lillIiil.resp_msg);
            ["未开始", "结束", "不存在", "不在"].some(liilIilI => lillIiil.resp_msg.includes(liilIilI)) && ($.runEnd = true);
            if (lillIiil.resp_msg.includes("上限")) {
              $.runEnd = true;
              break;
            }
          } else {
            console.log("❓" + iii11 + " " + JSON.stringify(lillIiil));
          }
        }
        break;
    }
  } catch (I1111I1i) {
    console.log("❌ 未能正确处理 " + iii11 + " 请求响应 " + (I1111I1i.message || I1111I1i));
  }
}
async function liiIiIlI(Iill1II1) {
  if ($.runEnd || $.outFlag) return;
  let I1l1IIl1 = $.newbaseUrl,
    ilIIiIii = {},
    llIiiI1i = "POST";
  switch (Iill1II1) {
    case "login":
      I1l1IIl1 += "/api/user-info/login", ilIIiIii = {
        "status": "1",
        "activityId": $.activityId,
        "tokenPin": $.jdToken,
        "source": "01",
        "shareUserId": $.shareUserId || "",
        "uuid": $.UUID
      };
      break;
    case "follow":
      I1l1IIl1 += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      llIiiI1i = "GET", I1l1IIl1 += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      I1l1IIl1 += "/api/active/basicInfo", ilIIiIii = {
        "activityId": $.activityId
      };
      break;
    case "getUserId":
      I1l1IIl1 += "/api/task/share/getUserId";
      break;
    case "activity":
      I1l1IIl1 += "/api/task/organizeTeam/activity", ilIIiIii = {
        "shareUserId": $.shareUserId || ""
      };
      break;
    case "saveCaptain":
      I1l1IIl1 += "/api/task/organizeTeam/saveCaptain";
      break;
    case "saveMember":
      I1l1IIl1 += "/api/task/organizeTeam/saveMember", ilIIiIii = {
        "shareUserId": $.shareUserId,
        "teamId": $.teamId
      };
      break;
    default:
      console.log("❌ 未知请求 " + Iill1II1);
      return;
  }
  const IliiI11l = {
    "url": I1l1IIl1,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      "Connection": "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
      "Cookie": "IsvToken=" + $.jdToken + "; " + ($.pinToken ? ";pToken=" + $.pinToken : "") + ($.te ? ";te=" + $.te : ""),
      "Host": $.hostname,
      "Origin": $.origin,
      "Referer": $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "token": $.token,
      "User-Agent": $.UA
    },
    "body": JSON.stringify(ilIIiIii),
    "timeout": 30000
  };
  llIiiI1i === "GET" && (delete IliiI11l.body, delete IliiI11l.headers["Content-Type"]);
  const Il1llIlI = 5;
  let iil11il1 = 0,
    l1IIIil = null,
    ll1iliII = false;
  while (iil11il1 < Il1llIlI) {
    iil11il1 > 0 && (await $.wait(1000));
    const {
      err: i111ili,
      res: II111l1,
      data: iliii1II
    } = await I1iiI1i(IliiI11l, llIiiI1i);
    if (i111ili) {
      if (typeof i111ili === "string" && i111ili.includes("Timeout awaiting 'request'")) l1IIIil = Iill1II1 + " 请求超时，请检查网络重试";else {
        const illIlIi = II111l1?.["statusCode"];
        if (illIlIi) {
          if ([403, 493].includes(illIlIi)) l1IIIil = Iill1II1 + " 请求失败，IP被限制（Response code " + illIlIi + "）", ll1iliII = true;else [400, 404].includes(illIlIi) ? l1IIIil = Iill1II1 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + illIlIi + "）" : l1IIIil = Iill1II1 + " 请求失败（Response code " + illIlIi + "）";
        } else l1IIIil = Iill1II1 + " 请求失败 => " + (i111ili.message || i111ili);
      }
      iil11il1++;
    } else {
      const ill1IiIi = IIIIil1l.getResponseCookie(II111l1),
        iliIlI1I = false;
      iliIlI1I && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + Iill1II1 + " 响应Body => " + (iliii1II || "无") + "\n"), console.log("🔧 " + Iill1II1 + " 响应Cookie => " + (ill1IiIi || "无") + "\n"), console.log("🔧 " + Iill1II1 + " 请求参数"), console.log(IliiI11l), console.log("\n---------------------------------------------------\n"));
      if (!["accessLog", "accessLogWithAD"].includes(Iill1II1)) try {
        const Iiili1 = JSON.parse(iliii1II);
        lII1I1i1(Iill1II1, Iiili1);
        break;
      } catch (l1lIl1li) {
        l1IIIil = "❌ " + Iill1II1 + " 接口响应数据解析失败: " + l1lIl1li.message;
        console.log("🚫 " + Iill1II1 + " => " + String(iliii1II || "无响应数据"));
        iliIlI1I && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        iil11il1++;
      } else break;
      ll1iliII = false;
    }
  }
  iil11il1 >= Il1llIlI && (console.log(l1IIIil), ll1iliII && !iI1ili1l && ($.outFlag = true, $.message && $.message.fix(l1IIIil)));
}
async function I1iiI1i(i1IIIIIi, IliIi1ii = "POST") {
  if (IliIi1ii === "POST") return new Promise(async li1IIIll => {
    $.post(i1IIIIIi, (lI1Ii1, liiiIl1I, IIil1i1I) => {
      li1IIIll({
        "err": lI1Ii1,
        "res": liiiIl1I,
        "data": IIil1i1I
      });
    });
  });else {
    if (IliIi1ii === "GET") {
      return new Promise(async i1ii1liI => {
        $.get(i1IIIIIi, (iiIlIil1, lI11Ilii, l11Ii1I1) => {
          i1ii1liI({
            "err": iiIlIil1,
            "res": lI11Ilii,
            "data": l11Ii1I1
          });
        });
      });
    } else {
      const IIi1111i = "不支持的请求方法";
      return {
        "err": IIi1111i,
        "res": null,
        "data": null
      };
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
