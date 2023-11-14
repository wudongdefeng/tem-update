/*
活动名称：积分兑换（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10079&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_pointsExchange_url // 活动链接
		jd_lzkj_loreal_pointsExchange_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_pointsExchange_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_pointsExchange_break // 493后继续执行，默认退出运行（true/false）

*/
let lnrun = 0;


const $ = new Env('积分兑换（超级无线）')
const l111iII1 = require("./jdCookie"),
  Iii1i1iI = require("./function/jdCommon"),
  Il1IllII = require("./function/sendJDNotify"),
  Illi1iII = require("./function/krgetToken"),
  {
    loreal_savePrize: l11ili1
  } = require("./function/krsavePrize"),
  lI11llIl = process.env.jd_lzkj_loreal_pointsExchange_url || "",
  IiI1Ili1 = process.env.jd_lzkj_loreal_pointsExchange_opencard === "true",
  iilllliI = process.env.jd_lzkj_loreal_pointsExchange_break === "true",
  ill1i1ii = process.env.jd_lzkj_loreal_pointsExchange_Notify === "true";
let I1lIIli = "",
  I1I1lIl1 = "";
const Il1lII1l = Object.keys(l111iII1).map(iII11i => l111iII1[iII11i]).filter(iI1l => iI1l);
!Il1lII1l[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!lI11llIl) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const ll1I1lII = Iii1i1iI.parseUrl(lI11llIl);
  if (!ll1I1lII) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = lI11llIl;
  $.activityId = Iii1i1iI.getUrlParameter(lI11llIl, "activityId");
  $.activityType = Iii1i1iI.getUrlParameter(lI11llIl, "activityType");
  $.hostname = ll1I1lII.hostname;
  $.pathname = ll1I1lII.pathname;
  let ii1i1II = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) ii1i1II = "apps/interact";else {
      if ($.hostname.includes("lzkj")) {
        ii1i1II = $.pathname.replace(/\/index$/, "");
      }
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + ii1i1II;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !ii1i1II || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  Il1IllII.config({
    "title": $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let I111111i = 0; I111111i < Il1lII1l.length; I111111i++) {
    $.index = I111111i + 1;
    I1lIIli = Il1lII1l[I111111i];
    I1I1lIl1 = Il1lII1l[I111111i];
    Iii1i1iI.setCookie(I1I1lIl1);
    $.UserName = decodeURIComponent(Iii1i1iI.getCookieValue(I1lIIli, "pt_pin"));
    $.UA = Iii1i1iI.genUA($.UserName);
    $.UUID = Iii1i1iI.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = Il1IllII.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
    await iIIil();
    Iii1i1iI.unsetCookie();
    if ($.outFlag || $.runEnd) break;
  }
  ill1i1ii && Il1IllII.getMessage() && (Il1IllII.updateContent(Il1IllII.content + ("\n【活动地址】" + $.activityUrl)), await Il1IllII.push());
})().catch(lll11lii => $.logErr(lll11lii)).finally(() => $.done());
async function iIIil() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) return;
    $.jdToken = await Illi1iII(I1I1lIl1, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await l11l1ll1("login");
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await $.wait(500);
    if ($.joinCode) {
      await l11l1ll1("follow");
      switch ($.joinCode) {
        case "1004":
          await l11l1ll1("follow"), await $.wait(500);
          break;
        case "1005":
        case "1006":
          $.joinCode !== "1005" && (await l11l1ll1("follow"));
          if (IiI1Ili1) {
            const l1iIlI1i = await Iii1i1iI.joinShopMember($.venderId);
            if (l1iIlI1i) console.log("加入店铺会员成功");else {
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
    if ($.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas")) {
      await l11l1ll1("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      await l11l1ll1("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) return;
      switch ($.activityType) {
        case "10079":
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
    await l11l1ll1("activity");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) return;
    if ($.index === 1) {
      $.havePrize = 0;
      let l1lilIl1 = "";
      for (let l1i1iI11 = 0; l1i1iI11 < $.prizeInfo.length; l1i1iI11++) {
        const IiiiiiI1 = $.prizeInfo[l1i1iI11],
          ll1Ili11 = IiiiiiI1.prizeName,
          l1lIi = IiiiiiI1.num,
          IlliI1I1 = IiiiiiI1.stock;
        l1lilIl1 += "  " + ll1Ili11 + "，需 " + l1lIi + " 积分，" + (IlliI1I1 >= 1 ? "剩余" + IlliI1I1 + "件" : "已发完") + "\n";
        IlliI1I1 > 0 && ($.havePrize = l1lIi);
      }
      console.log(($.shopName ? "店铺名称：" + $.shopName + "\n" : "") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：\n" + l1lilIl1);
      Il1IllII.updateContent(Il1IllII.content + (($.shopName && "\n【店铺名称】" + $.shopName) + "\n【活动奖品】\n" + l1lilIl1));
      const il1IIIli = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        i11l1lIl = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const ii1IiIlI = Date.now();
          if ($.actStartTime && ii1IiIlI < $.actStartTime) {
            console.log("活动将在 " + il1IIIli + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + il1IIIli);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && ii1IiIlI > $.actEndTime) {
            console.log("活动已于 " + i11l1lIl + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + i11l1lIl);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + il1IIIli + " 开始，晚点再来吧~"), $.message.fix("活动尚未开始，开始时间：" + il1IIIli), $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + i11l1lIl + " 结束，下次早点来吧~"), $.message.fix("活动已结束，结束时间：" + i11l1lIl), $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if ($.havePrize == 0) {
        console.log("奖品已全部发完了，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
    }
    console.log("当前积分：" + $.myPoints + "\n");
    for (let lli1i1Ii of $.prizeInfo?.["filter"](IiIll11 => IiIll11.stock > 0 && IiIll11.status == 1)?.["sort"](function (Iill11, IiIllIli) {
      return IiIllIli.num - Iill11.num;
    })) {
      if ($.myPoints < lli1i1Ii.num) continue;
      $.prizeInfoId = lli1i1Ii.prizeInfoId;
      (await l11l1ll1("exchange")) && ($.myPoints -= lli1i1Ii.num);
    }
  } catch (l1lI1lil) {
    console.log("❌ 脚本运行遇到了错误\n" + l1lI1lil);
  }
}
async function i1IilI1l(IIlliI1i, lli1II1I) {
  try {
    switch (IIlliI1i) {
      case "login":
        if (lli1II1I.resp_code === 0 && lli1II1I.data) {
          $.token = lli1II1I?.["data"]?.["token"];
          $.joinInfo = lli1II1I?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = lli1II1I?.["data"]?.["shopId"];
          $.venderId = Iii1i1iI.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = lli1II1I?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else lli1II1I.resp_msg ? (console.log(IIlliI1i + " " + lli1II1I.resp_msg), $.message.fix(lli1II1I.resp_msg), $.skipRun = true) : console.log("❓" + IIlliI1i + " " + JSON.stringify(lli1II1I));
        break;
      case "follow":
        if (lli1II1I.resp_code === 0) {} else lli1II1I.resp_msg ? (console.log(IIlliI1i + " " + lli1II1I.resp_msg), $.message.fix(lli1II1I.resp_msg), $.skipRun = true) : console.log("❓" + IIlliI1i + " " + JSON.stringify(lli1II1I));
        break;
      case "initPinToken":
        if (lli1II1I.resp_code === 0 && lli1II1I.data) {
          lli1II1I = JSON.parse(lli1II1I.data);
          if (lli1II1I.resp_code === 0 && lli1II1I.data) $.pinToken = lli1II1I?.["data"]?.["pinToken"], $.encryptPin = lli1II1I?.["data"]?.["encryptPin"];else {
            if (lli1II1I.resp_code === 1000) console.log(IIlliI1i + " " + lli1II1I.resp_msg), $.message.fix(lli1II1I.resp_msg), $.skipRun = true;else lli1II1I.resp_msg ? (console.log(IIlliI1i + " " + lli1II1I.resp_msg), $.message.fix(lli1II1I.resp_msg), $.skipRun = true) : (console.log("❓" + IIlliI1i + " " + JSON.stringify(lli1II1I)), $.skipRun = true);
          }
        } else console.log("❓" + IIlliI1i + " " + JSON.stringify(lli1II1I));
        break;
      case "basicInfo":
        if (lli1II1I.resp_code === 0 && lli1II1I.data) $.actStartTime = lli1II1I.data?.["startTime"], $.actEndTime = lli1II1I.data?.["endTime"], $.actStatus = lli1II1I.data?.["actStatus"], !$.activityType && ($.activityType = String(lli1II1I.data?.["actType"] || ""));else {
          if (lli1II1I.resp_msg) {
            console.log(IIlliI1i + " " + lli1II1I.resp_msg);
            $.message.fix(lli1II1I.resp_msg);
          } else {
            console.log("❓" + IIlliI1i + " " + JSON.stringify(lli1II1I));
          }
        }
        break;
      case "activity":
        if (lli1II1I.resp_code === 0) {
          $.prizeInfo = lli1II1I?.["data"]?.["pointsExchangePrizeVos"] || [];
          $.myPoints = lli1II1I?.["data"]?.["myPoints"] || 0;
        } else {
          if (lli1II1I.resp_msg) {
            console.log(IIlliI1i + " " + lli1II1I.resp_msg);
            for (let illiIill of ["未开始", "结束", "不存在", "不在"]) {
              if (lli1II1I.resp_msg.includes(illiIill)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(lli1II1I.resp_msg);
          } else console.log("❓" + IIlliI1i + " " + JSON.stringify(lli1II1I));
        }
        break;
      case "getUserFollowInfo":
        if (lli1II1I.resp_code === 0 && lli1II1I.data) $.followShop = lli1II1I.data?.["followShop"];else {
          if (lli1II1I.resp_msg) {
            for (let Iil1i11 of ["未开始", "结束", "不存在", "不在"]) {
              if (lli1II1I.resp_msg.includes(Iil1i11)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(IIlliI1i + " " + lli1II1I.resp_msg);
            $.message.fix(lli1II1I.resp_msg);
            $.skipRun = true;
          } else console.log("❓" + IIlliI1i + " " + JSON.stringify(lli1II1I)), $.skipRun = true;
        }
        break;
      case "exchange":
        if (lli1II1I.resp_code === 0) {
          const iiliIIli = lli1II1I.data;
          if (iiliIIli) {
            switch (iiliIIli.prizeType) {
              case 1:
                console.log("🎉 " + iiliIIli.prizeName + " 🐶"), $.message.insert(iiliIIli.prizeName + "🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券"), $.message.insert("🗑️ 优惠券");
                break;
              case 3:
                const Ii1iI1ii = lli1II1I.data.addressId,
                  liIIiIll = iiliIIli.prizeName;
                console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + liIIiIll);
                if (iiliIIli.showImg) console.log("预览图片：" + iiliIIli.showImg);
                const ili11ill = {
                    "baseUrl": $.baseUrl,
                    "newbaseUrl": $.newbaseUrl,
                    "cookie": I1I1lIl1,
                    "ua": $.UA,
                    "token": $.token,
                    "prizeName": liIIiIll,
                    "orderCode": Ii1iI1ii
                  },
                  IIIIIlIl = await l11ili1(ili11ill);
                !ill1i1ii && IIIIIlIl && (await Il1IllII.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + liIIiIll + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(liIIiIll + "(" + (IIIIIlIl ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 4:
              case 11:
                console.log("🗑️ " + iiliIIli.prizeName + " 🎟️"), $.message.insert("🗑️ " + iiliIIli.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价"), $.message.insert("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + iiliIIli.prizeName + " 🧧"), $.message.insert("🎉 " + iiliIIli.prizeName + " 🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + iiliIIli.prizeName + " 🎁"), $.message.insert("🎉 恭喜获得" + iiliIIli.prizeName + " 🎁");
                !ill1i1ii && (await Il1IllII.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + iiliIIli.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log(iiliIIli);
                break;
            }
          } else console.log("💨 空气"), $.message.insert("💨 空气");
        } else {
          if (lli1II1I.resp_msg) {
            console.log(IIlliI1i + " " + lli1II1I.resp_msg);
            for (let Il11IIii of ["未开始", "结束", "不存在", "不在"]) {
              if (lli1II1I.resp_msg.includes(Il11IIii)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(lli1II1I.resp_msg);
          } else console.log("❓" + IIlliI1i + " " + JSON.stringify(lli1II1I));
        }
        break;
    }
  } catch (Ii1lilI) {
    console.log("❌ 未能正确处理 " + IIlliI1i + " 请求响应 " + (Ii1lilI.message || Ii1lilI));
  }
}
async function l11l1ll1(IlII111) {
  if ($.runEnd || $.outFlag) return;
  let II111ll1 = $.newbaseUrl,
    iI11i1 = {},
    iIlii1II = "POST";
  switch (IlII111) {
    case "login":
      II111ll1 += "/api/user-info/login", iI11i1 = {
        "status": "1",
        "activityId": $.activityId,
        "tokenPin": $.jdToken,
        "source": "01",
        "shareUserId": $.shareUserId || "",
        "uuid": $.UUID
      };
      break;
    case "follow":
      II111ll1 += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      iIlii1II = "GET", II111ll1 += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      II111ll1 += "/api/active/basicInfo", iI11i1 = {
        "activityId": $.activityId
      };
      break;
    case "activity":
      iIlii1II = "GET", II111ll1 += "/api/pointsExchange/activity";
      break;
    case "exchange":
      II111ll1 += "/api/pointsExchange/exchange", iI11i1 = {
        "prizeInfoId": $.prizeInfoId,
        "status": 1
      };
      break;
    default:
      console.log("❌ 未知请求 " + IlII111);
      return;
  }
  const iI1I1Ii = {
    "url": II111ll1,
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
      "User-Agent": $.UA
    },
    "body": JSON.stringify(iI11i1),
    "timeout": 30000
  };
  $.token && (iI1I1Ii.headers.token = $.token);
  iIlii1II === "GET" && (delete iI1I1Ii.body, delete iI1I1Ii.headers["Content-Type"]);
  const II1i1i1I = 5;
  let ii1Iil1 = 0,
    I1ii1l = null,
    llIl1ll1 = false;
  while (ii1Iil1 < II1i1i1I) {
    ii1Iil1 > 0 && (await $.wait(1000));
    const {
      err: i1ll1ili,
      res: III1l1Ii,
      data: IiIl1li
    } = await IiIl1lI1(iI1I1Ii, iIlii1II);
    if (i1ll1ili) {
      if (typeof i1ll1ili === "string" && i1ll1ili.includes("Timeout awaiting 'request'")) I1ii1l = IlII111 + " 请求超时，请检查网络重试";else {
        const llI11ll1 = III1l1Ii?.["statusCode"];
        if (llI11ll1) {
          if ([403, 493].includes(llI11ll1)) I1ii1l = IlII111 + " 请求失败，IP被限制（Response code " + llI11ll1 + "）", llIl1ll1 = true;else {
            if ([400, 404].includes(llI11ll1)) I1ii1l = IlII111 + " 请求配置参数错误，请联系开发者进行反馈（Response code " + llI11ll1 + "）";else {
              I1ii1l = IlII111 + " 请求失败（Response code " + llI11ll1 + "）";
            }
          }
        } else I1ii1l = IlII111 + " 请求失败 => " + (i1ll1ili.message || i1ll1ili);
      }
      ii1Iil1++;
    } else {
      const lIiI1li = Iii1i1iI.getResponseCookie(III1l1Ii),
        liIlli = false;
      liIlli && (console.log("\n---------------------------------------------------\n"), console.log("🔧 " + IlII111 + " 响应Body => " + (IiIl1li || "无") + "\n"), console.log("🔧 " + IlII111 + " 响应Cookie => " + (lIiI1li || "无") + "\n"), console.log("🔧 " + IlII111 + " 请求参数"), console.log(iI1I1Ii), console.log("\n---------------------------------------------------\n"));
      if (IiIl1li) try {
        const iIiIIlIl = JSON.parse(IiIl1li);
        i1IilI1l(IlII111, iIiIIlIl);
        break;
      } catch (IIiIII11) {
        I1ii1l = "❌ " + IlII111 + " 接口响应数据解析失败: " + IIiIII11.message;
        console.log("🚫 " + IlII111 + " => " + String(IiIl1li));
        ii1Iil1++;
      } else {
        I1ii1l = "❌ " + IlII111 + " 接口无响应数据";
        ii1Iil1++;
      }
      llIl1ll1 = false;
    }
  }
  if (ii1Iil1 >= II1i1i1I) {
    console.log(I1ii1l);
    if (llIl1ll1) {
      if (!iilllliI) {
        $.outFlag = true;
        if ($.message) {
          $.message.fix(I1ii1l);
        }
      }
    }
  }
}
async function IiIl1lI1(il1Ilil1, I1I1lIii = "POST") {
  if (I1I1lIii === "POST") {
    return new Promise(async iIllI111 => {
      $.post(il1Ilil1, (iIii1lii, i1lI1liI, iIiI1i1l) => {
        iIllI111({
          "err": iIii1lii,
          "res": i1lI1liI,
          "data": iIiI1i1l
        });
      });
    });
  } else {
    if (I1I1lIii === "GET") return new Promise(async I1il1lIl => {
      $.get(il1Ilil1, (i11li11I, l11l1lIl, lilliI1) => {
        I1il1lIl({
          "err": i11li11I,
          "res": l11l1lIl,
          "data": lilliI1
        });
      });
    });else {
      const l1I1I1I1 = "不支持的请求方法";
      return {
        "err": l1I1I1I1,
        "res": null,
        "data": null
      };
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
