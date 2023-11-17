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
var version_ = "jsjiami.com.v7";
const llii1I = require("./jdCookie"),
  iiIiIi = require("./function/jdCommon"),
  l1lll1 = require("./function/sendJDNotify"),
  IilI = require("./function/krgetToken"),
  {
    wuxianDefense: liIlli
  } = require("./function/jdCrypto"),
  {
    loreal_savePrize: lil11
  } = require("./function/krsavePrize"),
  Iillll = process.env.jd_lzkj_loreal_pointsExchange_url || "",
  lllI1 = process.env.jd_lzkj_loreal_pointsExchange_opencard === "true",
  III11I = process.env.jd_lzkj_loreal_pointsExchange_break === "true",
  Ilii1 = process.env.jd_lzkj_loreal_pointsExchange_Notify === "true";
let ll11i1 = "",
  ili1I1 = "";
const Iill = Object.keys(llii1I).map(I1I1li => llii1I[I1I1li]).filter(l1i11 => l1i11);
!Iill[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!Iillll) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const IlI1ll = iiIiIi.parseUrl(Iillll);
  if (!IlI1ll) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = Iillll;
  $.activityId = iiIiIi.getUrlParameter(Iillll, "activityId");
  $.activityType = iiIiIi.getUrlParameter(Iillll, "activityType");
  $.hostname = IlI1ll.hostname;
  $.pathname = IlI1ll.pathname;
  let ll11l = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      ll11l = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (ll11l = $.pathname.replace(/\/index$/, ""));
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + ll11l;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !ll11l || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  l1lll1.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let I1iI1l = 0; I1iI1l < Iill.length; I1iI1l++) {
    $.index = I1iI1l + 1;
    ll11i1 = Iill[I1iI1l];
    ili1I1 = Iill[I1iI1l];
    iiIiIi.setCookie(ili1I1);
    $.UserName = decodeURIComponent(iiIiIi.getCookieValue(ll11i1, "pt_pin"));
    $.UA = iiIiIi.genUA($.UserName);
    $.UUID = iiIiIi.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = l1lll1.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
    await ili1II();
    iiIiIi.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  Ilii1 && l1lll1.getMessage() && (l1lll1.updateContent(l1lll1.content + ("\n【活动地址】" + $.activityUrl)), await l1lll1.push());
})().catch(Iliil => $.logErr(Iliil)).finally(() => $.done());
async function ili1II() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await IilI(ili1I1, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await ll11i("login");
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
          await ll11i("follow");
          await $.wait(500);
          await ll11i("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
          break;
        case "1005":
          await ll11i("follow");
          await $.wait(500);
          await ll11i("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
        case "1006":
          $.joinCode !== "1005" && (await ll11i("follow"));
          if (lllI1) {
            const Ill111 = await iiIiIi.joinShopMember($.venderId);
            if (Ill111) {
              console.log("加入店铺会员成功");
              await ll11i("login");
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
      await ll11i("initPinToken");
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
      await ll11i("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      switch ($.activityType) {
        case "10079":
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
    await ll11i("activity");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      $.havePrize = 0;
      let ii1II1 = "";
      for (let iliIli = 0; iliIli < $.prizeInfo.length; iliIli++) {
        const illliI = $.prizeInfo[iliIli],
          ii1III = illliI.prizeName,
          i11iIl = illliI.num,
          ll11ll = illliI.stock;
        ii1II1 += "  " + ii1III + "，需 " + i11iIl + " 积分，" + (ll11ll >= 1 ? "剩余" + ll11ll + "件" : "已发完") + "\n";
        ll11ll > 0 && ($.havePrize = i11iIl);
      }
      console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：\n" + ii1II1);
      l1lll1.updateContent(l1lll1.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【活动奖品】\n" + ii1II1));
      const iliIll = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        llliIl = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const l11iIl = Date.now();
          if ($.actStartTime && l11iIl < $.actStartTime) {
            console.log("活动将在 " + iliIll + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + iliIll);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && l11iIl > $.actEndTime) {
            console.log("活动已于 " + llliIl + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + llliIl);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + iliIll + " 开始，晚点再来吧~");
          $.message.fix("活动尚未开始，开始时间：" + iliIll);
          $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + llliIl + " 结束，下次早点来吧~");
          $.message.fix("活动已结束，结束时间：" + llliIl);
          $.runEnd = true;
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
    for (let i11iIi of $.prizeInfo?.["filter"](IIIIll => IIIIll.stock > 0 && IIIIll.status == 1)?.["sort"](function (liiiii, II1I) {
      return II1I.num - liiiii.num;
    })) {
      if ($.myPoints < i11iIi.num) {
        continue;
      }
      $.prizeInfoId = i11iIi.prizeInfoId;
      (await ll11i("exchange")) && ($.myPoints -= i11iIi.num);
    }
  } catch (Ilil1) {
    console.log("❌ 脚本运行遇到了错误\n" + Ilil1);
  }
}
async function liIllI(l1iIi1, i1I1I) {
  try {
    switch (l1iIi1) {
      case "login":
        if (i1I1I.resp_code === 0 && i1I1I.data) {
          $.token = i1I1I?.["data"]?.["token"];
          $.joinInfo = i1I1I?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = i1I1I?.["data"]?.["shopId"];
          $.venderId = iiIiIi.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = i1I1I?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          i1I1I.resp_msg ? (console.log(l1iIi1 + " " + i1I1I.resp_msg), $.message.fix(i1I1I.resp_msg), $.skipRun = true) : console.log("❓" + l1iIi1 + " " + JSON.stringify(i1I1I));
        }
        break;
      case "follow":
        if (!(i1I1I.resp_code === 0)) {
          i1I1I.resp_msg ? (console.log(l1iIi1 + " " + i1I1I.resp_msg), $.message.fix(i1I1I.resp_msg), $.skipRun = true) : console.log("❓" + l1iIi1 + " " + JSON.stringify(i1I1I));
        }
        break;
      case "initPinToken":
        if (i1I1I.resp_code === 0 && i1I1I.data) {
          i1I1I = JSON.parse(i1I1I.data);
          if (i1I1I.resp_code === 0 && i1I1I.data) {
            $.pinToken = i1I1I?.["data"]?.["pinToken"];
            $.encryptPin = i1I1I?.["data"]?.["encryptPin"];
          } else {
            if (i1I1I.resp_code === 1000) {
              console.log(l1iIi1 + " " + i1I1I.resp_msg);
              $.message.fix(i1I1I.resp_msg);
              $.skipRun = true;
            } else {
              i1I1I.resp_msg ? (console.log(l1iIi1 + " " + i1I1I.resp_msg), $.message.fix(i1I1I.resp_msg), $.skipRun = true) : (console.log("❓" + l1iIi1 + " " + JSON.stringify(i1I1I)), $.skipRun = true);
            }
          }
        } else {
          console.log("❓" + l1iIi1 + " " + JSON.stringify(i1I1I));
        }
        break;
      case "basicInfo":
        if (i1I1I.resp_code === 0 && i1I1I.data) {
          $.actStartTime = i1I1I.data?.["startTime"];
          $.actEndTime = i1I1I.data?.["endTime"];
          $.actStatus = i1I1I.data?.["actStatus"];
          !$.activityType && ($.activityType = String(i1I1I.data?.["actType"] || ""));
        } else {
          if (i1I1I.resp_msg) {
            console.log(l1iIi1 + " " + i1I1I.resp_msg);
            $.message.fix(i1I1I.resp_msg);
          } else {
            console.log("❓" + l1iIi1 + " " + JSON.stringify(i1I1I));
          }
        }
        break;
      case "activity":
        if (i1I1I.resp_code === 0) {
          $.prizeInfo = i1I1I?.["data"]?.["pointsExchangePrizeVos"] || [];
          $.myPoints = i1I1I?.["data"]?.["myPoints"] || 0;
        } else {
          if (i1I1I.resp_msg) {
            console.log(l1iIi1 + " " + i1I1I.resp_msg);
            for (let illlll of ["未开始", "结束", "不存在", "不在"]) {
              if (i1I1I.resp_msg.includes(illlll)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(i1I1I.resp_msg);
          } else {
            console.log("❓" + l1iIi1 + " " + JSON.stringify(i1I1I));
          }
        }
        break;
      case "getUserFollowInfo":
        if (i1I1I.resp_code === 0 && i1I1I.data) {
          $.followShop = i1I1I.data?.["followShop"];
        } else {
          if (i1I1I.resp_msg) {
            for (let i1i111 of ["未开始", "结束", "不存在", "不在"]) {
              if (i1I1I.resp_msg.includes(i1i111)) {
                $.runEnd = true;
                break;
              }
            }
            console.log(l1iIi1 + " " + i1I1I.resp_msg);
            $.message.fix(i1I1I.resp_msg);
            $.skipRun = true;
          } else {
            console.log("❓" + l1iIi1 + " " + JSON.stringify(i1I1I));
            $.skipRun = true;
          }
        }
        break;
      case "exchange":
        if (i1I1I.resp_code === 0) {
          const iiI1i1 = i1I1I.data;
          if (iiI1i1) {
            switch (iiI1i1.prizeType) {
              case 1:
                console.log("🎉 " + iiI1i1.prizeName + " 🐶");
                $.message.insert(iiI1i1.prizeName + "🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券");
                $.message.insert("🗑️ 优惠券");
                break;
              case 3:
                const ilIlII = i1I1I.data.addressId,
                  iIiil1 = iiI1i1.prizeName;
                console.log("🎉 恭喜获得实物~");
                console.log("奖品名称：" + iIiil1);
                if (iiI1i1.showImg) {
                  console.log("预览图片：" + iiI1i1.showImg);
                }
                const l1lI1i = {
                    baseUrl: $.baseUrl,
                    newbaseUrl: $.newbaseUrl,
                    cookie: ili1I1,
                    ua: $.UA,
                    token: $.token,
                    prizeName: iIiil1,
                    orderCode: ilIlII
                  },
                  l1lI1l = await lil11(l1lI1i);
                !Ilii1 && l1lI1l && (await l1lll1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iIiil1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(iIiil1 + "(" + (l1lI1l ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 4:
              case 11:
                console.log("🗑️ " + iiI1i1.prizeName + " 🎟️");
                $.message.insert("🗑️ " + iiI1i1.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价");
                $.message.insert("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + iiI1i1.prizeName + " 🧧");
                $.message.insert("🎉 " + iiI1i1.prizeName + " 🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + iiI1i1.prizeName + " 🎁");
                $.message.insert("🎉 恭喜获得" + iiI1i1.prizeName + " 🎁");
                !Ilii1 && (await l1lll1.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + iiI1i1.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log(iiI1i1);
                break;
            }
          } else {
            console.log("💨 空气");
            $.message.insert("💨 空气");
          }
        } else {
          if (i1I1I.resp_msg) {
            console.log(l1iIi1 + " " + i1I1I.resp_msg);
            for (let l1I1Il of ["未开始", "结束", "不存在", "不在"]) {
              if (i1I1I.resp_msg.includes(l1I1Il)) {
                $.runEnd = true;
                break;
              }
            }
            $.message.fix(i1I1I.resp_msg);
          } else {
            console.log("❓" + l1iIi1 + " " + JSON.stringify(i1I1I));
          }
        }
        break;
    }
  } catch (IIlill) {
    console.log("❌ 未能正确处理 " + l1iIi1 + " 请求响应 " + (IIlill.message || IIlill));
  }
}
async function ll11i(IllllI) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let I1iil1 = $.newbaseUrl,
    lIillI = {},
    lI1il1 = {},
    liliii = "POST";
  switch (IllllI) {
    case "login":
      I1iil1 += "/api/user-info/login";
      lIillI = {
        status: "1",
        activityId: $.activityId,
        tokenPin: $.jdToken,
        source: "01",
        shareUserId: $.shareUserId || "",
        uuid: $.UUID
      };
      break;
    case "follow":
      I1iil1 += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      liliii = "GET";
      I1iil1 += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      I1iil1 += "/api/active/basicInfo";
      lIillI = {
        activityId: $.activityId
      };
      break;
    case "activity":
      liliii = "GET";
      I1iil1 += "/api/pointsExchange/activity";
      break;
    case "exchange":
      I1iil1 += "/api/pointsExchange/exchange";
      lIillI = {
        prizeInfoId: $.prizeInfoId,
        status: 1
      };
      break;
    default:
      console.log("❌ 未知请求 " + IllllI);
      return;
  }
  const iIiilI = liliii === "POST" && $.pathname.includes("/prod/cc/interactsaas") && liIlli.isDefenseApi(I1iil1.replace($.newbaseUrl, "").split("?")[0]);
  iIiilI && (lIillI.actId = $.activityId, lI1il1 = {
    ecyText: liIlli.encrypt(lIillI, $.pinToken, $.te)
  });
  const iIiiil = {
    url: I1iil1,
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
    body: JSON.stringify(iIiilI ? lI1il1 : lIillI),
    timeout: 30000
  };
  $.token && (iIiiil.headers.token = $.token);
  liliii === "GET" && (delete iIiiil.body, delete iIiiil.headers["Content-Type"]);
  const iIiiii = 5;
  let ilIlIi = 0,
    ilIlIl = null,
    l1lI1I = false;
  while (ilIlIi < iIiiii) {
    ilIlIi > 0 && (await $.wait(1000));
    const {
      err: IIliil,
      res: ll1liI,
      data: lI1iiI
    } = await iI1lI1(iIiiil, liliii);
    if (IIliil) {
      if (typeof IIliil === "string" && IIliil.includes("Timeout awaiting 'request'")) {
        ilIlIl = IllllI + " 请求超时，请检查网络重试";
      } else {
        const iIIlli = ll1liI?.["statusCode"];
        if (iIIlli) {
          if ([403, 493].includes(iIIlli)) {
            ilIlIl = IllllI + " 请求失败，IP被限制（Response code " + iIIlli + "）";
            l1lI1I = true;
          } else {
            if ([400, 404].includes(iIIlli)) {
              ilIlIl = IllllI + " 请求配置参数错误，请联系开发者进行反馈（Response code " + iIIlli + "）";
            } else {
              [500].includes(iIIlli) && iIiilI ? iIiiil.body = JSON.stringify({
                ecyText: liIlli.encrypt(lIillI, $.pinToken, $.te)
              }) : ilIlIl = IllllI + " 请求失败（Response code " + iIIlli + "）";
            }
          }
        } else {
          ilIlIl = IllllI + " 请求失败 => " + (IIliil.message || IIliil);
        }
      }
      ilIlIi++;
    } else {
      const iIIlll = iiIiIi.getResponseCookie(ll1liI);
      switch (IllllI) {
        case "initPinToken":
          const iiI1ii = iiIiIi.getCookieValue(iIIlll, "te");
          iiI1ii && ($.te = iiI1ii);
          break;
      }
      if (lI1iiI) {
        try {
          const I1iii1 = JSON.parse(lI1iiI);
          liIllI(IllllI, I1iii1);
          break;
        } catch (lilii1) {
          ilIlIl = "❌ " + IllllI + " 接口响应数据解析失败: " + lilii1.message;
          console.log("🚫 " + IllllI + " => " + String(lI1iiI));
          ilIlIi++;
        }
      } else {
        iIiilI && (iIiiil.body = JSON.stringify({
          ecyText: liIlli.encrypt(lIillI, $.pinToken, $.te)
        }));
        ilIlIl = "❌ " + IllllI + " 接口无响应数据";
        ilIlIi++;
      }
      l1lI1I = false;
    }
  }
  ilIlIi >= maxRequestTimes && (console.log(ilIlIl), l1lI1I && !III11I && ($.outFlag = true, $.message && $.message.fix(ilIlIl)));
}
async function iI1lI1(ll1lii, li11 = "POST") {
  if (li11 === "POST") {
    return new Promise(async liliiI => {
      $.post(ll1lii, (Ii1l11, IIlii1, iiI1lI) => {
        liliiI({
          err: Ii1l11,
          res: IIlii1,
          data: iiI1lI
        });
      });
    });
  } else {
    if (li11 === "GET") {
      return new Promise(async i1111l => {
        $.get(ll1lii, (i1111i, iliiI1, Illli1) => {
          i1111l({
            err: i1111i,
            res: iliiI1,
            data: Illli1
          });
        });
      });
    } else {
      const l1111 = "不支持的请求方法";
      return {
        err: l1111,
        res: null,
        data: null
      };
    }
  }
}
var version_ = "jsjiami.com.v7";
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
