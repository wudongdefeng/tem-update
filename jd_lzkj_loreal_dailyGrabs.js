/*
活动名称：每日抢好礼（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10022&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_dailyGrabs_url // 活动链接
		jd_lzkj_loreal_dailyGrabs_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_dailyGrabs_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_dailyGrabs_break // 493后继续执行，默认退出运行（true/false）

*/
let lnrun = 0;


const $ = new Env('每日抢好礼（超级无线）')
const II1ll1Il = require("./jdCookie"),
  IIi1I1l = require("./function/jdCommon"),
  IIIiI1ll = require("./function/sendJDNotify"),
  llii111l = require("./function/krgetToken"),
  {
    loreal_savePrize: lliiIl
  } = require("./function/krsavePrize"),
  I1ill1lI = process.env.jd_lzkj_loreal_dailyGrabs_url || "",
  lii11iIl = process.env.jd_lzkj_loreal_dailyGrabs_opencard === "true",
  I11IlI = process.env.jd_lzkj_loreal_dailyGrabs_Notify === "true",
  l1iiIii1 = process.env.jd_lzkj_loreal_dailyGrabs_break === "true";
let lIl1l1I = "",
  IlIiIIlI = "";
const I11liIl = Object.keys(II1ll1Il).map(ll1ll11l => II1ll1Il[ll1ll11l]).filter(l1llIiil => l1llIiil);
!I11liIl[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!I1ill1lI) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const II11lI = IIi1I1l.parseUrl(I1ill1lI);
  if (!II11lI) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = I1ill1lI;
  $.activityId = IIi1I1l.getUrlParameter(I1ill1lI, "activityId");
  $.activityType = IIi1I1l.getUrlParameter(I1ill1lI, "activityType");
  $.hostname = II11lI?.["hostname"];
  let ili11III = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) ili11III = "apps/interact";else {
      if ($.hostname.includes("lzkj")) {
        ili11III = I1ill1lI.match(/\/(prod\/cc\/interact\w*)\//)[1];
      }
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + ili11III;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !ili11III || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  IIIiI1ll.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let i1I11i1l = 0; i1I11i1l < I11liIl.length; i1I11i1l++) {
    $.index = i1I11i1l + 1;
    lIl1l1I = I11liIl[i1I11i1l];
    IlIiIIlI = I11liIl[i1I11i1l];
    IIi1I1l.setCookie(IlIiIIlI);
    $.UserName = decodeURIComponent(IIi1I1l.getCookieValue(lIl1l1I, "pt_pin"));
    $.UA = IIi1I1l.genUA($.UserName);
    $.UUID = IIi1I1l.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = IIIiI1ll.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      lnrun++;if(lnrun == 7){console.log(`\n【访问接口次数达到6次，休息一分钟.....】\n`);await $.wait(120 * 1000);lnrun = 0}
    await i1Ii1iIi();
    IIi1I1l.unsetCookie();
    if ($.outFlag || $.runEnd) break;
  }
  I11IlI && IIIiI1ll.getMessage() && (IIIiI1ll.updateContent(IIIiI1ll.content + ("\n【活动地址】" + $.activityUrl)), await IIIiI1ll.push());
})().catch(IlliIIl1 => $.logErr(IlliIIl1)).finally(() => $.done());
async function i1Ii1iIi() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await llii111l(IlIiIIlI, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await lI1I1lii("login");
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
          await lI1I1lii("follow"), await $.wait(500);
          break;
        case "1005":
        case "1006":
          $.joinCode !== "1005" && (await lI1I1lii("follow"));
          if (lii11iIl) {
            const IiiIlli = await IIi1I1l.joinShopMember($.venderId);
            if (IiiIlli) console.log("加入店铺会员成功");else {
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
      await lI1I1lii("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      await lI1I1lii("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      switch ($.activityType) {
        case "10022":
          break;
        case "":
          console.log("未能获取活动类型"), $.message.fix("未能获取活动类型"), $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！"), $.message.fix("活动类型（" + $.activityType + "）不受支持"), $.runEnd = true;
          return;
      }
      if ($.runEnd || $.outFlag) return;
      await $.wait(500);
    }
    await lI1I1lii("activity");
    await $.wait(500);
    if ($.index === 1) {
      await lI1I1lii("drawPrize");
      await $.wait(500);
      const II1i11iI = $.activityContent?.["prizeName"],
        Ii1ili1I = $.activityContent?.["prizeType"],
        II11i = $.activityContent?.["surplusDayNum"],
        IllIl1I = $.prizeInfo[0]?.["leftNum"];
      let Iiil1IlI = II11i >= 1,
        III111iI = "" + II1i11iI + (Ii1ili1I === 5 ? "[专享价]" : Ii1ili1I === 3 ? "[实物]" : "") + "，" + (IllIl1I >= 1 ? "活动剩余" + IllIl1I + "件，今日" + (II11i >= 1 ? "剩余" + II11i + "件" : "已发完") : "全部已发完");
      console.log(($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + III111iI + "\n");
      IIIiI1ll.updateContent(IIIiI1ll.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】" + III111iI));
      const I1iilIIl = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        iIlIiII1 = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const ii11lIli = Date.now();
          if ($.actStartTime && ii11lIli < $.actStartTime) {
            console.log("活动将在 " + I1iilIIl + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + I1iilIIl);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && ii11lIli > $.actEndTime) {
            console.log("活动已于 " + iIlIiII1 + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + iIlIiII1);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + I1iilIIl + " 开始，晚点再来吧~"), $.message.fix("活动尚未开始，开始时间：" + I1iilIIl), $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + iIlIiII1 + " 结束，下次早点来吧~"), $.message.fix("活动已结束，结束时间：" + iIlIiII1), $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!Iiil1IlI) {
        IllIl1I >= 1 ? (console.log("今天的奖品已全部发完了，下次早点来吧~"), $.message.fix("当日奖品已发完")) : (console.log("奖品已全部发完了，下次早点来吧~"), $.message.fix("奖品已发完"));
        $.runEnd = true;
        return;
      }
      const lIli1ll = $.activityContent?.["hours"],
        llIlIIIi = $.activityContent?.["minutes"],
        iIll1Il = Date.now(),
        iliiIli = $.time("HH", iIll1Il),
        Ii11I1l1 = $.time("mm", iIll1Il);
      if (lIli1ll > iliiIli || lIli1ll === iliiIli && llIlIIIi > Ii11I1l1) {
        console.log("活动将在今日 " + lIli1ll + ":" + llIlIIIi + " 开抢，晚点再来吧~");
        $.message.fix("未到开抢时间，开始时间：" + lIli1ll + ":" + llIlIIIi);
        $.runEnd = true;
        return;
      }
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    const ii11iIi = $.activityContent?.["receiveStatus"];
    switch (ii11iIi) {
      case "0":
        $.prizeInfoId = $.activityContent?.["prizeInfoId"], await lI1I1lii("dayReceive"), await $.wait(500);
        break;
      case "1":
        console.log("今日已经领取过奖品了哦~"), $.message.fix("今日已领");
        break;
      default:
        console.log("未知领取状态 " + ii11iIi), $.message.fix("未知领取状态 " + ii11iIi);
        break;
    }
  } catch (iliII1i1) {
    console.log("❌ 脚本运行遇到了错误\n" + iliII1i1);
  }
}
async function Il1l11i1(IiiIii11, li1I1Ii) {
  try {
    switch (IiiIii11) {
      case "login":
        if (li1I1Ii.resp_code === 0 && li1I1Ii.data) {
          $.token = li1I1Ii?.["data"]?.["token"];
          $.joinInfo = li1I1Ii?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = li1I1Ii?.["data"]?.["shopId"];
          $.venderId = IIi1I1l.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = li1I1Ii?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else li1I1Ii.resp_msg ? (console.log(IiiIii11 + " " + li1I1Ii.resp_msg), $.message.fix(li1I1Ii.resp_msg), $.skipRun = true) : console.log("❓" + IiiIii11 + " " + JSON.stringify(li1I1Ii));
        break;
      case "follow":
        if (li1I1Ii.resp_code === 0) {} else li1I1Ii.resp_msg ? (console.log(IiiIii11 + " " + li1I1Ii.resp_msg), $.message.fix(li1I1Ii.resp_msg), $.skipRun = true) : console.log("❓" + IiiIii11 + " " + JSON.stringify(li1I1Ii));
        break;
      case "initPinToken":
        if (li1I1Ii.resp_code === 0 && li1I1Ii.data) {
          li1I1Ii = JSON.parse(li1I1Ii.data);
          if (li1I1Ii.resp_code === 0 && li1I1Ii.data) $.pinToken = li1I1Ii?.["data"]?.["pinToken"], $.encryptPin = li1I1Ii?.["data"]?.["encryptPin"];else {
            if (li1I1Ii.resp_code === 1000) {
              console.log(IiiIii11 + " " + li1I1Ii.resp_msg);
              $.message.fix(li1I1Ii.resp_msg);
              $.skipRun = true;
            } else li1I1Ii.resp_msg ? (console.log(IiiIii11 + " " + li1I1Ii.resp_msg), $.message.fix(li1I1Ii.resp_msg), $.skipRun = true) : (console.log("❓" + IiiIii11 + " " + JSON.stringify(li1I1Ii)), $.skipRun = true);
          }
        } else console.log("❓" + IiiIii11 + " " + JSON.stringify(li1I1Ii));
        break;
      case "basicInfo":
        if (li1I1Ii.resp_code === 0 && li1I1Ii.data) $.actStartTime = li1I1Ii.data?.["startTime"], $.actEndTime = li1I1Ii.data?.["endTime"], $.actStatus = li1I1Ii.data?.["actStatus"], !$.activityType && ($.activityType = String(li1I1Ii.data?.["actType"] || ""));else li1I1Ii.resp_msg ? (console.log(IiiIii11 + " " + li1I1Ii.resp_msg), $.message.fix(li1I1Ii.resp_msg), $.runEnd) : console.log("❓" + IiiIii11 + " " + JSON.stringify(li1I1Ii));
        break;
      case "activity":
        if (li1I1Ii.resp_code === 0 && li1I1Ii.data) $.activityContent = li1I1Ii.data;else {
          if (li1I1Ii.resp_msg) {
            console.log(IiiIii11 + " " + li1I1Ii.resp_msg);
            $.message.fix(li1I1Ii.resp_msg);
            $.skipRun = true;
            for (let lI1Ilil of ["未开始", "结束", "不存在", "不在"]) {
              if (li1I1Ii.resp_msg.includes(lI1Ilil)) {
                $.runEnd = true;
                break;
              }
            }
          } else console.log("❓" + IiiIii11 + " " + JSON.stringify(li1I1Ii)), $.skipRun = true;
        }
        break;
      case "drawPrize":
        if (li1I1Ii.resp_code === 0) $.prizeInfo = li1I1Ii?.["data"]?.["prizeInfo"] || [];else {
          if (li1I1Ii.resp_msg) {
            console.log(IiiIii11 + " " + li1I1Ii.resp_msg);
            for (let IIlIIiIl of ["未开始", "结束", "不存在", "不在"]) {
              if (li1I1Ii.resp_msg.includes(IIlIIiIl)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(li1I1Ii.resp_msg);
          } else console.log("❓" + IiiIii11 + " " + JSON.stringify(li1I1Ii));
        }
        break;
      case "dayReceive":
        if (li1I1Ii.resp_code === 0) {
          const I1iI1I1I = li1I1Ii.data;
          if (I1iI1I1I) switch (I1iI1I1I.prizeType) {
            case 1:
              console.log("🎉 " + I1iI1I1I.prizeName + " 🐶"), $.message.insert(I1iI1I1I.prizeName + "🐶");
              break;
            case 2:
              console.log("🗑️ 优惠券"), $.message.insert("🗑️ 优惠券");
              break;
            case 3:
              const IIililli = li1I1Ii.data.addressId,
                ll1llIl1 = I1iI1I1I.prizeName;
              console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + ll1llIl1);
              if (I1iI1I1I.showImg) console.log("预览图片：" + I1iI1I1I.showImg);
              const IiIiii1 = {
                  "baseUrl": $.baseUrl,
                  "newbaseUrl": $.newbaseUrl,
                  "cookie": IlIiIIlI,
                  "ua": $.UA,
                  "token": $.token,
                  "prizeName": ll1llIl1,
                  "orderCode": IIililli
                },
                i11I111i = await lliiIl(IiIiii1);
              !I11IlI && i11I111i && (await IIIiI1ll.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + ll1llIl1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
              $.message.insert(ll1llIl1 + "(" + (i11I111i ? "已填地址" : "未填地址") + ")🎁");
              break;
            case 4:
            case 11:
              console.log("🗑️ " + I1iI1I1I.prizeName + " 🎟️"), $.message.insert("🗑️ " + I1iI1I1I.prizeName + " 🎟️");
              break;
            case 5:
              console.log("🗑️ 专享价"), $.message.insert("🗑️ 专享价");
              break;
            case 6:
              console.log("🎉 " + I1iI1I1I.prizeName + " 🧧"), $.message.insert("🎉 " + I1iI1I1I.prizeName + " 🧧");
              break;
            case 7:
            case 8:
            case 9:
            case 10:
            case 12:
              console.log("🎉 恭喜获得" + I1iI1I1I.prizeName + " 🎁"), $.message.insert("🎉 恭喜获得" + I1iI1I1I.prizeName + " 🎁");
              !I11IlI && (await IIIiI1ll.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + I1iI1I1I.prizeName + "\n\n" + $.activityUrl));
              break;
            default:
              console.log(I1iI1I1I);
              break;
          } else console.log("💨 空气"), $.message.insert("💨 空气");
        } else {
          if (li1I1Ii.resp_msg) {
            console.log(IiiIii11 + " " + li1I1Ii.resp_msg);
            for (let lI1lil1i of ["未开始", "结束", "不存在", "不在"]) {
              if (li1I1Ii.resp_msg.includes(lI1lil1i)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(li1I1Ii.resp_msg);
          } else console.log("❓" + IiiIii11 + " " + JSON.stringify(li1I1Ii));
        }
        break;
    }
  } catch (l1lI1Ii) {
    console.log("❌ 未能正确处理 " + IiiIii11 + " 请求响应 " + (l1lI1Ii.message || l1lI1Ii));
  }
}
async function lI1I1lii(iI1IiI) {
  if ($.runEnd || $.outFlag) return;
  let l1iIIl = $.newbaseUrl,
    l11i1IiI = {},
    ili1iiII = "POST";
  switch (iI1IiI) {
    case "login":
      l1iIIl += "/api/user-info/login", l11i1IiI = {
        "status": "1",
        "activityId": $.activityId,
        "tokenPin": $.jdToken,
        "source": "01",
        "shareUserId": $.shareUserId || "",
        "uuid": $.UUID
      };
      break;
    case "follow":
      l1iIIl += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      ili1iiII = "GET", l1iIIl += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      l1iIIl += "/api/active/basicInfo", l11i1IiI = {
        "activityId": $.activityId
      };
      break;
    case "activity":
      l1iIIl += "/api/task/dailyGrabs/activity";
      break;
    case "drawPrize":
      l1iIIl += "/api/prize/drawPrize";
      break;
    case "dayReceive":
      l1iIIl += "/api/task/dailyGrabs/dayReceive", l11i1IiI = {
        "prizeInfoId": $.prizeInfoId
      };
      break;
    default:
      console.log("❌ 未知请求 " + iI1IiI);
      return;
  }
  const ilIlIiIl = {
    "url": l1iIIl,
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
    "body": JSON.stringify(l11i1IiI),
    "timeout": 30000
  };
  ili1iiII === "GET" && (delete ilIlIiIl.body, delete ilIlIiIl.headers["Content-Type"]);
  const i1i11ilI = 5;
  let IIIlI1Ii = 0,
    liIIilil = null,
    i1IilIil = false;
  while (IIIlI1Ii < i1i11ilI) {
    IIIlI1Ii > 0 && (await $.wait(1000));
    const {
      err: iiIIil1I,
      res: I11Il1Ii,
      data: l1lII11i
    } = await liiI1III(ilIlIiIl, ili1iiII);
    if (iiIIil1I) {
      if (typeof iiIIil1I === "string" && iiIIil1I.includes("Timeout awaiting 'request'")) liIIilil = iI1IiI + " 请求超时，请检查网络重试";else {
        const Ii1illil = I11Il1Ii?.["statusCode"];
        if (Ii1illil) {
          if ([403, 493].includes(Ii1illil)) liIIilil = iI1IiI + " 请求失败，IP被限制（Response code " + Ii1illil + "）", i1IilIil = true;else [400, 404].includes(Ii1illil) ? liIIilil = iI1IiI + " 请求配置参数错误，请联系开发者进行反馈（Response code " + Ii1illil + "）" : liIIilil = iI1IiI + " 请求失败（Response code " + Ii1illil + "）";
        } else liIIilil = iI1IiI + " 请求失败 => " + (iiIIil1I.message || iiIIil1I);
      }
      IIIlI1Ii++;
    } else {
      const lIiili1l = IIi1I1l.getResponseCookie(I11Il1Ii),
        l1IilIl = false;
      if (l1IilIl) {
        console.log("\n---------------------------------------------------\n");
        console.log("🔧 " + iI1IiI + " 响应Body => " + (l1lII11i || "无") + "\n");
        console.log("🔧 " + iI1IiI + " 响应Cookie => " + (lIiili1l || "无") + "\n");
        console.log("🔧 " + iI1IiI + " 请求参数");
        console.log(ilIlIiIl);
        console.log("\n---------------------------------------------------\n");
      }
      if (!["accessLog", "accessLogWithAD"].includes(iI1IiI)) try {
        const i111IlI = JSON.parse(l1lII11i);
        Il1l11i1(iI1IiI, i111IlI);
        break;
      } catch (l1l1iI1) {
        liIIilil = "❌ " + iI1IiI + " 接口响应数据解析失败: " + l1l1iI1.message;
        console.log("🚫 " + iI1IiI + " => " + String(l1lII11i || "无响应数据"));
        l1IilIl && (console.log("\n---------------------------------------------------\n"), console.log(activityCookie), console.log("\n---------------------------------------------------\n"));
        IIIlI1Ii++;
      } else break;
      i1IilIil = false;
    }
  }
  IIIlI1Ii >= i1i11ilI && (console.log(liIIilil), i1IilIil && !l1iiIii1 && ($.outFlag = true, $.message && $.message.fix(liIIilil)));
}
async function liiI1III(Ii11I11, iiIllIii = "POST") {
  if (iiIllIii === "POST") {
    return new Promise(async I1IiiilI => {
      $.post(Ii11I11, (Ii1l111, lII1IIIi, i1lliil) => {
        I1IiiilI({
          "err": Ii1l111,
          "res": lII1IIIi,
          "data": i1lliil
        });
      });
    });
  } else {
    if (iiIllIii === "GET") return new Promise(async lllilIii => {
      $.get(Ii11I11, (lllIlI11, iI1liI1i, IIIIiIli) => {
        lllilIii({
          "err": lllIlI11,
          "res": iI1liI1i,
          "data": IIIIiIli
        });
      });
    });else {
      const illii1Il = "不支持的请求方法";
      return {
        "err": illii1Il,
        "res": null,
        "data": null
      };
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
