/*
活动名称：加购有礼（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10024&templateId=<模板id>&activityId=<活动id>&prd=cjwx
		https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10024&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_cart_url // 活动链接
		jd_lzkj_loreal_cart_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_cart_Notify // 是否推送通知（true/false），默认不推送
		jd_lzkj_loreal_cart_break // 493后继续执行，默认退出运行（true/false）
		
请使用本地IP环境 请使用本地IP环境 请使用本地IP环境

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#加购有礼（超级无线）
1 1 1 1 * jd_lzkj_loreal_cart.js, tag=加购有礼（超级无线）, enabled=true

*/
let lnrun = 0;


const $ = new Env('加购有礼（超级无线）')
var version_ = "jsjiami.com.v7";
const llliIl = require("./jdCookie"),
  iliIli = require("./function/jdCommon"),
  illliI = require("./function/sendJDNotify"),
  ii1III = require("./function/krgetToken"),
  {
    loreal_savePrize: i11iIl
  } = require("./function/krsavePrize"),
  {
    wuxianDefense: ll11ll
  } = require("./function/jdCrypto"),
  l11iIl = process.env.jd_lzkj_loreal_cart_url || "",
  i11iIi = process.env.jd_lzkj_loreal_cart_opencard === "true",
  IIIIll = process.env.jd_lzkj_loreal_cart_Notify === "true",
  liiiii = process.env.jd_lzkj_loreal_cart_break === "true";
let II1I = "",
  lI1111 = "";
const Ilil1 = Object.keys(llliIl).map(llIii => llliIl[llIii]).filter(IIiiI1 => IIiiI1);
!Ilil1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!l11iIl) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const ii1IIl = iliIli.parseUrl(l11iIl);
  if (!ii1IIl) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = l11iIl;
  $.activityId = iliIli.getUrlParameter(l11iIl, "activityId");
  $.activityType = iliIli.getUrlParameter(l11iIl, "activityType");
  $.hostname = ii1IIl.hostname;
  $.pathname = ii1IIl.pathname;
  let ii1IIi = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      ii1IIi = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (ii1IIi = $.pathname.replace(/\/index$/, ""));
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + ii1IIi;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !ii1IIi || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  illliI.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let illllI = 0; illllI < Ilil1.length; illllI++) {
    $.index = illllI + 1;
    II1I = Ilil1[illllI];
    lI1111 = Ilil1[illllI];
    iliIli.setCookie(lI1111);
    $.UserName = decodeURIComponent(iliIli.getCookieValue(II1I, "pt_pin"));
    $.UA = iliIli.genUA($.UserName);
    $.UUID = iliIli.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = illliI.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
    await IliII1();
    iliIli.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  IIIIll && illliI.getMessage() && (illliI.updateContent(illliI.content + ("\n【活动地址】" + $.activityUrl)), await illliI.push());
})().catch(II1II => $.logErr(II1II)).finally(() => $.done());
async function IliII1() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await ii1III(lI1111, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await i1I1I("login");
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
          await i1I1I("follow");
          await $.wait(500);
          await i1I1I("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
          break;
        case "1005":
          await i1I1I("follow");
          await $.wait(500);
          await i1I1I("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
        case "1006":
          if (i11iIi) {
            const ll1llI = await iliIli.joinShopMember($.venderId);
            if (ll1llI) {
              console.log("加入店铺会员成功");
              await i1I1I("login");
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
      await i1I1I("initPinToken");
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
      await i1I1I("basicInfo");
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      switch ($.activityType) {
        case "10024":
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
    await i1I1I("activity");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      await i1I1I("drawPrize");
      await $.wait(500);
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      const ll1ll1 = $.prizeInfo[0],
        lilil1 = ll1ll1.prizeName,
        lIilli = ll1ll1.leftNum,
        I1iiii = ll1ll1.prizeType,
        iiI1iI = lIilli >= 1;
      let I1iiil = "" + lilil1 + (I1iiii === 5 ? "[专享价]" : I1iiii === 3 ? "[实物]" : "") + "（" + (lIilli >= 1 ? "剩余" + lIilli + "件" : "已发完") + "）\n";
      console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + I1iiil);
      illliI.updateContent(illliI.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【活动奖品】" + I1iiil));
      const Illll1 = $.time("yyyy-MM-dd HH:mm", $.actStartTime),
        lI1iil = $.time("yyyy-MM-dd HH:mm", $.actEndTime);
      switch ($.actStatus) {
        case 0:
          const lIilll = Date.now();
          if ($.actStartTime && lIilll < $.actStartTime) {
            console.log("活动将在 " + Illll1 + " 开始，晚点再来吧~");
            $.message.fix("活动尚未开始，开始时间：" + Illll1);
            $.runEnd = true;
            return;
          }
          if ($.actEndTime && lIilll > $.actEndTime) {
            console.log("活动已于 " + lI1iil + " 结束，下次早点来吧~");
            $.message.fix("活动已结束，结束时间：" + lI1iil);
            $.runEnd = true;
            return;
          }
          break;
        case 1:
          console.log("活动将在 " + Illll1 + " 开始，晚点再来吧~");
          $.message.fix("活动尚未开始，开始时间：" + Illll1);
          $.runEnd = true;
          return;
        case 2:
          console.log("活动已于 " + lI1iil + " 结束，下次早点来吧~");
          $.message.fix("活动已结束，结束时间：" + lI1iil);
          $.runEnd = true;
          return;
        default:
          $.actStatus && (console.log("未知活动状态 " + $.actStatus), $.message.fix("未知活动状态 " + $.actStatus), $.runEnd = true);
          break;
      }
      if (!iiI1iI) {
        console.log("奖品已全部发完了，下次早点来吧~");
        $.message.fix("奖品已发完");
        $.runEnd = true;
        return;
      }
      if (lilil1.includes("优惠券")) {
        console.log("垃圾活动不跑了~");
        $.message.fix("垃圾活动不跑");
        $.runEnd = true;
        return;
      }
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    $.taskId = $.activityContent?.["addWares"]?.["taskId"];
    const lIillI = $.activityContent?.["addWares"]?.["status"],
      lI1il1 = $.activityContent?.["addWares"]?.["skuInfoVO"] || [];
    $.completeCount = $.activityContent?.["addWares"]?.["completeCount"];
    const liliii = $.activityContent?.["addWares"]?.["finishNum"],
      iIiilI = $.activityContent?.["prizeResultNum"];
    if (lIillI === 1 || $.completeCount >= liliii) {
      console.log("已经参与过了哦~");
      $.message.fix("已参与过");
    }
    if (iIiilI <= 0) {
      console.log("奖品已全部发完了，下次早点来吧~");
      $.message.fix("奖品已发完");
      $.runEnd = true;
      return;
    }
    $.getPrize = false;
    const iIiiil = $.activityContent?.["addWares"]?.["oneClickPurchase"];
    if (iIiiil === 0) {
      $.skuId = "";
      await i1I1I("toDo");
      !$.getPrize && (console.log("💨 空气"), $.message.insert("💨 空气"));
    } else {
      for (let ilI11l of lI1il1) {
        if (ilI11l.status === 1) {
          continue;
        }
        $.skuId = ilI11l.skuId;
        await i1I1I("toDo");
        if ($.getPrize || $.runEnd || $.outFlag || $.skipRun) {
          break;
        }
        $.completeCount >= liliii && (console.log("💨 空气"), $.message.insert("💨 空气"));
        await $.wait(500);
      }
    }
  } catch (li1I) {
    console.log("❌ 脚本运行遇到了错误\n" + li1I);
  }
}
async function l1iIi1(IIliil, ll1liI) {
  try {
    switch (IIliil) {
      case "login":
        if (ll1liI.resp_code === 0 && ll1liI.data) {
          $.token = ll1liI?.["data"]?.["token"];
          $.joinInfo = ll1liI?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = ll1liI?.["data"]?.["shopId"];
          $.venderId = iliIli.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = ll1liI?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          ll1liI.resp_msg ? (console.log(IIliil + " " + ll1liI.resp_msg), $.message.fix(ll1liI.resp_msg), $.skipRun = true) : console.log("❓" + IIliil + " " + JSON.stringify(ll1liI));
        }
        break;
      case "follow":
        if (!(ll1liI.resp_code === 0)) {
          ll1liI.resp_msg ? (console.log(IIliil + " " + ll1liI.resp_msg), $.message.fix(ll1liI.resp_msg), $.skipRun = true) : console.log("❓" + IIliil + " " + JSON.stringify(ll1liI));
        }
        break;
      case "initPinToken":
        if (ll1liI.resp_code === 0 && ll1liI.data) {
          ll1liI = JSON.parse(ll1liI.data);
          if (ll1liI.resp_code === 0 && ll1liI.data) {
            $.pinToken = ll1liI?.["data"]?.["pinToken"];
            $.encryptPin = ll1liI?.["data"]?.["encryptPin"];
          } else {
            if (ll1liI.resp_code === 1000) {
              console.log(IIliil + " " + ll1liI.resp_msg);
              $.message.fix(ll1liI.resp_msg);
              $.skipRun = true;
            } else {
              ll1liI.resp_msg ? (console.log(IIliil + " " + ll1liI.resp_msg), $.message.fix(ll1liI.resp_msg), $.skipRun = true) : (console.log("❓" + IIliil + " " + JSON.stringify(ll1liI)), $.skipRun = true);
            }
          }
        } else {
          console.log("❓" + IIliil + " " + JSON.stringify(ll1liI));
        }
        break;
      case "basicInfo":
        if (ll1liI.resp_code === 0 && ll1liI.data) {
          $.actStartTime = ll1liI.data?.["startTime"];
          $.actEndTime = ll1liI.data?.["endTime"];
          $.actStatus = ll1liI.data?.["actStatus"];
          !$.activityType && ($.activityType = String(ll1liI.data?.["actType"] || ""));
        } else {
          if (ll1liI.resp_msg) {
            console.log(IIliil + " " + ll1liI.resp_msg);
            $.message.fix(ll1liI.resp_msg);
          } else {
            console.log("❓" + IIliil + " " + JSON.stringify(ll1liI));
          }
        }
        break;
      case "activity":
        if (ll1liI.resp_code === 0 && ll1liI.data) {
          $.activityContent = ll1liI.data;
        } else {
          ll1liI.resp_msg ? (console.log(IIliil + " " + ll1liI.resp_msg), $.message.fix(ll1liI.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(ilIIii => ll1liI.resp_msg.includes(ilIIii)) && ($.runEnd = true)) : (console.log("❓" + IIliil + " " + JSON.stringify(ll1liI)), $.skipRun = true);
        }
        break;
      case "drawPrize":
        if (ll1liI.resp_code === 0) {
          $.prizeInfo = ll1liI?.["data"]?.["prizeInfo"] || [];
        } else {
          if (ll1liI.resp_msg) {
            console.log(IIliil + " " + ll1liI.resp_msg);
            ["未开始", "结束", "不存在", "不在"].some(li1i => ll1liI.resp_msg.includes(li1i)) && ($.runEnd = true);
            $.message.fix(ll1liI.resp_msg);
          } else {
            console.log("❓" + IIliil + " " + JSON.stringify(ll1liI));
          }
        }
        break;
      case "toDo":
        if (ll1liI.resp_code === 0) {
          $.completeCount += 1;
          const li1l = ll1liI.data;
          if (li1l) {
            $.getPrize = true;
            switch (li1l.prizeType) {
              case 1:
                console.log("🎉 " + li1l.prizeName + " 🐶");
                $.message.insert(li1l.prizeName + "🐶");
                break;
              case 2:
                console.log("🗑️ 优惠券");
                $.message.insert("🗑️ 优惠券");
                break;
              case 3:
                const iliiII = ll1liI.data.addressId,
                  iiI1li = li1l.prizeName;
                console.log("🎉 恭喜获得实物~");
                console.log("奖品名称：" + iiI1li);
                if (li1l.showImg) {
                  console.log("预览图片：" + li1l.showImg);
                }
                const IIliii = {
                    baseUrl: $.baseUrl,
                    newbaseUrl: $.newbaseUrl,
                    cookie: lI1111,
                    ua: $.UA,
                    token: $.token,
                    prizeName: iiI1li,
                    orderCode: iliiII
                  },
                  i1111I = await i11iIl(IIliii);
                !IIIIll && i1111I && (await illliI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + iiI1li + "，已成功自动登记收货地址\n\n" + $.activityUrl));
                $.message.insert(iiI1li + "(" + (i1111I ? "已填地址" : "未填地址") + ")🎁");
                break;
              case 4:
              case 11:
                console.log("🗑️ " + li1l.prizeName + " 🎟️");
                $.message.insert("🗑️ " + li1l.prizeName + " 🎟️");
                break;
              case 5:
                console.log("🗑️ 专享价");
                $.message.insert("🗑️ 专享价");
                break;
              case 6:
                console.log("🎉 " + li1l.prizeName + " 🧧");
                $.message.insert("🎉 " + li1l.prizeName + " 🧧");
                break;
              case 7:
              case 8:
              case 9:
              case 10:
              case 12:
                console.log("🎉 恭喜获得" + li1l.prizeName + " 🎁");
                $.message.insert("🎉 恭喜获得" + li1l.prizeName + " 🎁");
                !IIIIll && (await illliI.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + li1l.prizeName + "\n\n" + $.activityUrl));
                break;
              default:
                console.log(li1l);
                break;
            }
          }
        } else {
          if (ll1liI.resp_msg) {
            if (["未开始", "结束", "不存在", "不在"].some(IliIl1 => ll1liI.resp_msg.includes(IliIl1))) {
              $.runEnd = true;
            }
            ["会员等级不足"].some(iIiill => ll1liI.resp_msg.includes(iIiill)) && ($.skipRun = true);
            console.log(ll1liI.resp_msg);
            $.message.fix(ll1liI.resp_msg);
          } else {
            console.log("❓" + IIliil + " " + JSON.stringify(ll1liI));
          }
        }
        break;
    }
  } catch (Ii1IIl) {
    console.log("❌ 未能正确处理 " + IIliil + " 请求响应 " + (Ii1IIl.message || Ii1IIl));
  }
}
async function i1I1I(l111I) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let ll1lll = $.newbaseUrl,
    Illlil = {},
    I1iili = {},
    lililI = "POST";
  switch (l111I) {
    case "login":
      ll1lll += "/api/user-info/login";
      Illlil = {
        status: "1",
        activityId: $.activityId,
        tokenPin: $.jdToken,
        source: "01",
        shareUserId: $.shareUserId || "",
        uuid: $.UUID
      };
      break;
    case "follow":
      ll1lll += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      lililI = "GET";
      ll1lll += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      ll1lll += "/api/active/basicInfo";
      Illlil = {
        activityId: $.activityId
      };
      break;
    case "activity":
      ll1lll += "/api/task/addSku/activity";
      break;
    case "drawPrize":
      ll1lll += "/api/prize/drawPrize";
      break;
    case "toDo":
      ll1lll += "/api/task/addSku/toDo";
      Illlil = {
        taskId: $.taskId || "",
        skuId: $.skuId || ""
      };
      break;
    default:
      console.log("❌ 未知请求 " + l111I);
      return;
  }
  const lI1ill = lililI === "POST" && $.pathname.includes("/prod/cc/interactsaas") && ll11ll.isDefenseApi(ll1lll.replace($.newbaseUrl, "").split("?")[0]);
  lI1ill && (Illlil.actId = $.activityId, I1iili = {
    ecyText: ll11ll.encrypt(Illlil, $.pinToken, $.te)
  });
  const Illlii = {
    url: ll1lll,
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
    body: JSON.stringify(lI1ill ? I1iili : Illlil),
    timeout: 30000
  };
  $.token && (Illlii.headers.token = $.token);
  if (lililI === "GET") {
    delete Illlii.body;
    delete Illlii.headers["Content-Type"];
  }
  const lI1ili = 5;
  let Il1II = 0,
    i1lll = null,
    Ii11I = false;
  while (Il1II < lI1ili) {
    Il1II > 0 && (await $.wait(1000));
    const {
      err: IilI1,
      res: l1lI1,
      data: Ili1I1
    } = await llIil(Illlii, lililI);
    if (IilI1) {
      if (typeof IilI1 === "string" && IilI1.includes("Timeout awaiting 'request'")) {
        i1lll = l111I + " 请求超时，请检查网络重试";
      } else {
        const i1Iii1 = l1lI1?.["statusCode"];
        if (i1Iii1) {
          if ([403, 493].includes(i1Iii1)) {
            i1lll = l111I + " 请求失败，IP被限制（Response code " + i1Iii1 + "）";
            Ii11I = true;
          } else {
            if ([400, 404].includes(i1Iii1)) {
              i1lll = l111I + " 请求配置参数错误，请联系开发者进行反馈（Response code " + i1Iii1 + "）";
            } else {
              [500].includes(i1Iii1) && lI1ill ? Illlii.body = JSON.stringify({
                ecyText: ll11ll.encrypt(Illlil, $.pinToken, $.te)
              }) : i1lll = l111I + " 请求失败（Response code " + i1Iii1 + "）";
            }
          }
        } else {
          i1lll = l111I + " 请求失败 => " + (IilI1.message || IilI1);
        }
      }
      Il1II++;
    } else {
      const lilI1I = iliIli.getResponseCookie(l1lI1);
      switch (l111I) {
        case "initPinToken":
          const lI1I1I = iliIli.getCookieValue(lilI1I, "te");
          lI1I1I && ($.te = lI1I1I);
          break;
      }
      if (Ili1I1) {
        try {
          const l1liiI = JSON.parse(Ili1I1);
          l1iIi1(l111I, l1liiI);
          break;
        } catch (I1iI1) {
          i1lll = "❌ " + l111I + " 接口响应数据解析失败: " + I1iI1.message;
          console.log("🚫 " + l111I + " => " + String(Ili1I1));
          Il1II++;
        }
      } else {
        lI1ill && (Illlii.body = JSON.stringify({
          ecyText: ll11ll.encrypt(Illlil, $.pinToken, $.te)
        }));
        i1lll = "❌ " + l111I + " 接口无响应数据";
        Il1II++;
      }
      Ii11I = false;
    }
  }
  Il1II >= lI1ili && (console.log(i1lll), Ii11I && !liiiii && ($.outFlag = true, $.message && $.message.fix(i1lll)));
}
async function llIil(liI1I1, Ii11i = "POST") {
  if (Ii11i === "POST") {
    return new Promise(async IilIl => {
      $.post(liI1I1, (iilIIi, I1iII, IIlI1i) => {
        IilIl({
          err: iilIIi,
          res: I1iII,
          data: IIlI1i
        });
      });
    });
  } else {
    if (Ii11i === "GET") {
      return new Promise(async Ili1Ii => {
        $.get(liI1I1, (liI1Ii, l1lil1, i1lil) => {
          Ili1Ii({
            err: liI1Ii,
            res: l1lil1,
            data: i1lil
          });
        });
      });
    } else {
      const ili1l = "不支持的请求方法";
      return {
        err: ili1l,
        res: null,
        data: null
      };
    }
  }
}
var version_ = "jsjiami.com.v7";
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
