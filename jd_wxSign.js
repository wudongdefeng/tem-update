/*
活动名称：店铺签到 · 超级无线/超级会员
活动链接：https://lzkj-isv.isvjd.com/sign/signActivity2?activityId=<活动id>
          https://lzkj-isv.isvjd.com/sign/sevenDay/signActivity?activityId=<活动id>
          https://cjhy-isv.isvjcloud.com/sign/signActivity?activityId=<活动id>
          https://cjhy-isv.isvjcloud.com/sign/sevenDay/signActivity?activityId=<活动id>
环境变量：jd_wxSign_sign_lzkj_Ids // 超级无线签到有礼活动id（旧变量 LZKJ_SIGN）
          jd_wxSign_sevenDay_lzkj_Ids // 超级无线7日签到活动id（旧变量 LZKJ_SEVENDAY）
          jd_wxSign_sign_cjhy_Ids // 超级会员签到有礼活动id（旧变量 CJHY_SIGN）
          jd_wxSign_sevenDay_cjhy_Ids // 超级会员7日签到活动id（旧变量 CJHY_SEVENDAY）
          jd_wxSign_lzkjInterval // 自定义超级无线活动签到间隔（整数），默认1秒
          jd_wxSign_cjhyInterval // 自定义超级会员活动签到间隔（整数），默认1秒
          jd_wxSign_lzkjFilter // 账号pin过滤（跳过不跑），多个用户名用@分割
          jd_wxSign_cjhyFilter // 账号pin过滤（跳过不跑），多个用户名用@分割
          jd_wxSign_Notify // 是否推送通知（true/false），默认不推送

不同环境变量对应不同链接类型注意区分，环境变量所对应活动类型的排列顺序与链接的排列顺序一致，如果有多个活动ID用英文逗号分割即可实现多活动签到
注：官方接口垃圾，中奖一切随缘，打印仅供参考

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#店铺签到 · 超级无线/超级会员
1 1 1 1 * jd_wxSign.js, tag=店铺签到 · 超级无线/超级会员, enabled=true

*/
let lnrun = 0;

const $ = new Env('店铺签到（超级无线/超级会员）')
const llIIIl = require("./jdCookie"),
      IIlI1I = require("./function/jdCommon"),
      llIIIi = require("./function/sendJDNotify"),
      IiIiIl = require("./function/krgetToken"),
      {
  wuxian_savePrize: I1Ilil
} = require("./function/krwxSavePrize"),
      l1I1I1 = require("crypto-js");

console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_wxSign_sign_lzkj_Ids // 超级无线签到有礼活动id");
console.log("jd_wxSign_sevenDay_lzkj_Ids // 超级无线7日签到活动id");
console.log("jd_wxSign_sign_cjhy_Ids // 超级会员签到有礼活动id");
console.log("jd_wxSign_sevenDay_cjhy_Ids // 超级会员7日签到活动id");
console.log("jd_wxSign_lzkjInterval // 自定义超级无线活动签到间隔");
console.log("jd_wxSign_cjhyInterval // 自定义超级会员活动签到间隔");
console.log("jd_wxSign_lzkjFilter // 账号pin过滤（跳过不跑）");
console.log("jd_wxSign_cjhyFilter // 账号pin过滤（跳过不跑）");
console.log("jd_wxSign_Notify // 是否推送通知（true/false），默认不推送");
console.log("==========" + $.name + "提示结束==========");
console.log("");
const I1Ilii = process.env.jd_wxSign_lzkjInterval || "",
      l1Iii = process.env.jd_wxSign_cjhyInterval || "",
      l1Iil = process.env.jd_wxSign_Notify === "true";
let III1Ii = (process.env.jd_wxSign_sevenDay_lzkj_Ids || process.env.LZKJ_SEVENDAY || "").split(","),
    III1Il = (process.env.jd_wxSign_sign_lzkj_Ids || process.env.LZKJ_SIGN || "").split(","),
    iIIliI = (process.env.jd_wxSign_sevenDay_cjhy_Ids || process.env.CJHY_SEVENDAY || "").split(","),
    IiIil = (process.env.jd_wxSign_sign_cjhy_Ids || process.env.CJHY_SIGN || "").split(","),
    IiIii = (process.env.jd_wxSign_lzkjFilter || "").split("@"),
    iill1l = (process.env.jd_wxSign_cjhyFilter || "").split("@"),
    IiIiII = "",
    iill1i = {};
const l1Il1 = Object.keys(llIIIl).map(l1iiIl => llIIIl[l1iiIl]).filter(lIIi1i => lIIi1i);
!l1Il1[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (III1Ii.length > 0) III1Ii = [...new Set(III1Ii.filter(IIIl => IIIl !== ""))];
  if (III1Il.length > 0) III1Il = [...new Set(III1Il.filter(IIIi => IIIi !== ""))];
  if (iIIliI.length > 0) iIIliI = [...new Set(iIIliI.filter(l1IIli => l1IIli !== ""))];
  if (IiIil.length > 0) IiIil = [...new Set(IiIil.filter(iII1I1 => iII1I1 !== ""))];
  llIIIi.config({
    "title": $.name
  });

  for (let iiiIIi = 0; iiiIIi < l1Il1.length; iiiIIi++) {
    if (l1Il1[iiiIIi]) {
      $.index = iiiIIi + 1;
      IiIiII = l1Il1[iiiIIi];
      originCookie = l1Il1[iiiIIi];
      $.UserName = decodeURIComponent(IIlI1I.getCookieValue(IiIiII, "pt_pin"));
      $.UA = IIlI1I.genUA($.UserName);
      $.UUID = IIlI1I.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.message = llIIIi.create($.index, $.UserName);
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      $.token = null;
      $.token = await IiIiIl(originCookie, "https://lzkj-isv.isvjd.com");

      if (!$.token) {
        console.log("获取[Token]失败！");
        $.message.fix("获取[Token]失败");
        continue;
      }

      if (IiIii.length > 0 && (IiIii.includes($.UserName) || IiIii.includes(encodeURIComponent($.UserName)))) console.log("已设置跳过运行当前账号 - 超级无线");else {
        $.secretPin = null;
        $.baseUrl = "https://lzkj-isv.isvjd.com";
        $.hostname = "lzkj-isv.isvjd.com";
        $.activityMode = "lzkj";
        $.origin = $.baseUrl;
        $.signIntervalTimes = 1000;

        if (I1Ilii) {
          try {
            const lIIi11 = parseInt(I1Ilii) * 1000;
            $.signIntervalTimes = lIIi11;
          } catch {
            $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
          }
        }

        III1Il.length >= 1 && (console.log("❖ 签到类型（lzkj signActivity2）"), await I1IliI(), await $.wait(2000), console.log(""));
        III1Ii.length >= 1 && (console.log("❖ 签到类型（lzkj sevenDay）"), await iill11(), await $.wait(2000), console.log(""));
      }
      if (iill1l.length > 0 && (iill1l.includes($.UserName) || iill1l.includes(encodeURIComponent($.UserName)))) console.log("已设置跳过运行当前账号 - 超级会员");else {
        $.secretPin = null;
        $.baseUrl = "https://cjhy-isv.isvjcloud.com";
        $.hostname = "cjhy-isv.isvjcloud.com";
        $.activityMode = "cjhy";
        $.origin = $.baseUrl;
        $.signIntervalTimes = 1000;
        if (l1Iii) try {
          const i11li = parseInt(l1Iii) * 1000;
          $.signIntervalTimes = i11li;
        } catch {
          $.index === 1 && console.log("自定义抽奖间隔格式错误，已使用默认值");
        }
        IiIil.length >= 1 && (console.log("❖ 签到类型（cjhy signActivity）"), await l1I1II(), await $.wait(2000), console.log(""));
        iIIliI.length >= 1 && (console.log("❖ 签到类型（cjhy sevenDay）"), await III1II(), await $.wait(2000));
      }
    }
  }

  l1Iil && llIIIi.getMessage() && (llIIIi.updateContent(llIIIi.content), await llIIIi.push());
})().catch(iIlI11 => {
  console.log("", "❌ " + $.name + ", 失败! 原因: " + iIlI11 + "!", "");
}).finally(() => {
  $.done();
});

async function iill11() {
  let l1IIlI = 0;

  I111ii: for (let ilI1Il = 0; ilI1Il < III1Ii.length; ilI1Il++) {
    l1IIlI += 1;
    $.signStop = false;
    $.signOk = false;
    $.activityId = III1Ii[ilI1Il];
    $.activityUrl = $.baseUrl + "/sign/sevenDay/signActivity?activityId=" + $.activityId;
    console.log("");

    if (ilI1Il === 0) {
      await iill1I();
      await $.wait(500);
      !$.secretPin && ($.venderId = null, await iIIlil("customer/getSimpleActInfoVo", "activityId=" + $.activityId), await $.wait(500), await llIII1(), await $.wait(500));
    }

    l1IIlI >= 10 && (await iill1I(), await $.wait(500), l1IIlI = 0);

    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;
      $.signErrorMsg = "";

      for (let ll11Il = 1; ll11Il <= 20; ll11Il++) {
        await iIIlil("sign/sevenDay/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));

        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请过一会儿再执行脚本");
          break I111ii;
        }

        ilI1Il !== III1Ii.length - 1 && (await $.wait($.signIntervalTimes));
        if ($.signOk) break;

        if ($.signStop || ll11Il === 20) {
          console.log("结果 -> " + ($.signErrorMsg || "未知"));
          break;
        }
      }
    } else {
      console.log("没有成功获取到用户信息");
      $.message.insert("未能获取用户鉴权信息");
      break;
    }
  }
}

async function I1IliI() {
  let iii11 = 0;

  Ililll: for (let IliIi1 = 0; IliIi1 < III1Il.length; IliIi1++) {
    iii11 += 1;
    $.signStop = false;
    $.signOk = false;
    $.activityId = III1Il[IliIi1];
    $.activityUrl = $.baseUrl + "/sign/signActivity2?activityId=" + $.activityId;
    console.log("");

    if (IliIi1 === 0) {
      await iill1I();
      await $.wait(500);

      if (!$.secretPin) {
        $.venderId = null;
        await iIIlil("customer/getSimpleActInfoVo", "activityId=" + $.activityId);
        await $.wait(500);
        await llIII1();
        await $.wait(500);
      }
    }

    iii11 >= 10 && (await iill1I(), await $.wait(500), iii11 = 0);

    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;

      for (let liIIiI = 1; liIIiI <= 20; liIIiI++) {
        await iIIlil("sign/wx/signUp", "actId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));

        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请过一会儿再执行脚本");
          break Ililll;
        }

        IliIi1 !== III1Il.length - 1 && (await $.wait($.signIntervalTimes));
        if ($.signOk) break;

        if ($.signStop || liIIiI === 20) {
          console.log("结果 -> " + ($.signErrorMsg || "未知"));
          break;
        }
      }
    } else {
      console.log("没有成功获取到用户信息");
      $.message.insert("未能获取用户鉴权信息");
      break;
    }
  }
}

async function III1II() {
  let l1I11i = 0;

  I1liII: for (let iIIIi = 0; iIIIi < iIIliI.length; iIIIi++) {
    l1I11i += 1;
    $.signStop = false;
    $.signOk = false;
    $.activityId = iIIliI[iIIIi];
    $.activityUrl = $.baseUrl + "/sign/sevenDay/signActivity?activityId=" + $.activityId;
    console.log("");

    if (iIIIi === 0) {
      await iill1I();
      await $.wait(500);

      if (!$.secretPin) {
        $.venderId = null;
        await iIIlil("customer/getSimpleActInfoVo", "activityId=" + $.activityId);
        await $.wait(500);
      }
    }

    $.initError = false;
    await IiIiI();

    if ($.initError && $.token) {
      $.initError = false;
      $.token = await IiIiIl(originCookie, "https://cjhy-isv.isvjcloud.com");

      if (!$.token) {
        console.log("获取[Token]失败！");
        $.message.insert("获取[Token]失败");
        break;
      }

      await IiIiI();

      if ($.initError) {
        console.log("初始化失败，请检查Token是否过期");
        break;
      }
    }

    await $.wait($.signIntervalTimes);
    l1I11i >= 10 && (await iill1I(), await $.wait(500), l1I11i = 0);

    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;

      for (let IIiiii = 1; IIiiii <= 20; IIiiii++) {
        await iIIlil("sign/sevenDay/wx/signUp", $.activityMode === "cjhy" ? JSON.stringify({
          "ecyText": Illi1({
            "actId": $.activityId,
            "pin": encodeURIComponent($.secretPin)
          }, $.pinToken, $.te)
        }) : "actId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)));

        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请过一会儿再执行脚本");
          break I1liII;
        }

        iIIIi !== iIIliI.length - 1 && (await $.wait($.signIntervalTimes));
        if ($.signOk) break;

        if ($.signStop || IIiiii === 20) {
          console.log("结果 -> " + ($.signErrorMsg || "未知"));
          break;
        }
      }
    } else {
      console.log("没有成功获取到用户信息");
      $.message.insert("未能获取用户鉴权信息");
      break;
    }
  }
}

async function l1I1II() {
  let I1lill = 0;

  I1ii1I: for (let Iii1l1 = 0; Iii1l1 < IiIil.length; Iii1l1++) {
    I1lill += 1;
    $.signStop = false;
    $.signOk = false;
    $.activityId = IiIil[Iii1l1];
    $.activityUrl = $.baseUrl + "/sign/signActivity?activityId=" + $.activityId;
    console.log("");
    Iii1l1 === 0 && (await iill1I(), await $.wait(500), !$.secretPin && ($.venderId = null, await iIIlil("customer/getSimpleActInfoVo", "activityId=" + $.activityId), await $.wait(500)));
    $.initError = false;
    await IiIiI();

    if ($.initError && $.token) {
      $.initError = false;
      $.token = await IiIiIl(originCookie, "https://cjhy-isv.isvjcloud.com");

      if (!$.token) {
        console.log("获取[Token]失败！");
        $.message.insert("获取[Token]失败");
        break;
      }

      await IiIiI();

      if ($.initError) {
        console.log("初始化失败，请检查Token是否过期");
        break;
      }
    }

    await $.wait($.signIntervalTimes);
    I1lill >= 10 && (await iill1I(), await $.wait(500), I1lill = 0);

    if ($.secretPin) {
      console.log("签到 -> " + $.activityId);
      $.signErrorTimes = 0;

      for (let I1lil1 = 1; I1lil1 <= 20; I1lil1++) {
        await iIIlil("sign/wx/signUp", $.activityMode === "cjhy" ? JSON.stringify({
          "ecyText": Illi1({
            "actId": $.activityId,
            "pin": encodeURIComponent($.secretPin)
          }, $.pinToken, $.te)
        }) : "actId=" + $.activityId + "&pin=" + encodeURIComponent(encodeURIComponent($.secretPin)));

        if ($.signErrorTimes >= 5) {
          console.log("此ip已被限制，请过一会儿再执行脚本");
          break I1ii1I;
        }

        Iii1l1 !== IiIil.length - 1 && (await $.wait($.signIntervalTimes));
        if ($.signOk) break;

        if ($.signStop || I1lil1 === 20) {
          console.log("结果 -> " + ($.signErrorMsg || "未知"));
          break;
        }
      }
    } else {
      console.log("没有成功获取到用户信息");
      $.message.insert("未能获取用户鉴权信息");
      break;
    }
  }
}

async function iIIlil(lIilIl, iIiiIi) {
  return new Promise(liii1I => {
    const liliIi = {
      "url": $.baseUrl + "/" + lIilIl,
      "headers": {
        "Host": $.hostname,
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": ["sign/sevenDay/wx/signUp", "sign/wx/signUp"].includes(lIilIl) && $.activityMode === "cjhy" ? "application/json" : "application/x-www-form-urlencoded",
        "Origin": $.origin,
        "User-Agent": $.UA,
        "Connection": "keep-alive",
        "Referer": $.activityUrl,
        "Cookie": IiIiII
      },
      "body": iIiiIi
    };
    $.post(liliIi, async (i1Ili, I1iiI1, lIiIi1) => {
      try {
        if (i1Ili) {
          switch (lIilIl) {
            case "sign/sevenDay/wx/signUp":
            case "sign/wx/signUp":
              $.signErrorTimes += 1;
              break;
          }

          if (typeof i1Ili === "string" && i1Ili.includes("Timeout awaiting 'request'")) console.log(lIilIl + " 请求超时，请检查网络重试");else {
            const iIIIi1 = I1iiI1?.["statusCode"];

            if (iIIIi1) {
              if ([403, 493].includes(iIIIi1)) console.log(lIilIl + " 请求失败，IP被限制（Response code " + iIIIi1 + "）");else {
                if ([400, 404].includes(iIIIi1)) console.log(lIilIl + " 请求配置参数错误，请联系开发者进行反馈（Response code " + iIIIi1 + "）");else {
                  console.log(lIilIl + " 请求失败（Response code " + iIIIi1 + "）");
                }
              }
            } else console.log(lIilIl + " API请求失败 => " + (i1Ili.message || i1Ili));
          }
        } else {
          if (lIiIi1) {
            lIiIi1 = JSON.parse(lIiIi1);

            if (I1iiI1.headers["set-cookie"]) {
              IiIiII = "";

              for (let Il1I11 of I1iiI1.headers["set-cookie"]) {
                iill1i[Il1I11.split(";")[0].substr(0, Il1I11.split(";")[0].indexOf("="))] = Il1I11.split(";")[0].substr(Il1I11.split(";")[0].indexOf("=") + 1);
              }

              for (const lIl1II of Object.keys(iill1i)) {
                IiIiII += lIl1II + "=" + iill1i[lIl1II] + ";";
              }
            }

            if (lIiIi1) {
              switch (lIilIl) {
                case "customer/getSimpleActInfoVo":
                  $.venderId = lIiIi1.data.venderId, $.activityType = lIiIi1.data.activityType;
                  break;

                case "sign/sevenDay/wx/signUp":
                  $.signErrorTimes = 0;
                  lIiIi1.isOk ? ($.signOk = true, await IiIiI1(lIiIi1)) : ($.signErrorMsg = lIiIi1.msg, !["火爆", "擦肩", "缓存", "数据忙"].some(ll1Iii => $.signErrorMsg.includes(ll1Iii)) && ($.signStop = true));
                  break;

                case "sign/wx/signUp":
                  $.signErrorTimes = 0;
                  lIiIi1.isOk ? ($.signOk = true, await iIIlii(lIiIi1)) : ($.signErrorMsg = lIiIi1.msg, !["火爆", "擦肩", "缓存", "数据忙"].some(ll1Iil => $.signErrorMsg.includes(ll1Iil)) && ($.signStop = true));
                  break;

                default:
                  console.log(JSON.stringify(lIiIi1));
                  break;
              }
            }
          }
        }
      } catch (iliiiI) {
        if (lIilIl != "customer/getSimpleActInfoVo") console.log(lIilIl + " -> " + iliiiI);
      } finally {
        liii1I();
      }
    });
  });
}

async function IiIiI1(i1Iil) {
  if (i1Iil.signResult.gift) {
    const IIlIIi = i1Iil.signResult.gift,
          iliiil = IIlIIi.insufficient;
    process.stdout.write("结果 -> ");
    if (!iliiil) switch (parseInt(IIlIIi.giftType)) {
      case 6:
        console.log("🎉 " + IIlIIi.giftName + " 🐶"), $.message.insert(IIlIIi.giftName + "🐶");
        break;

      case 7:
        const li11ll = i1Iil.addressId;
        let i1Il1 = IIlIIi.giftName;
        console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + i1Il1), console.log("参考价值：" + i1Iil.signResult.gift.priceInfo + "（元）"), console.log("预览图片：" + i1Iil.signResult.gift.showImage);
        const li1l1 = {
          "baseUrl": $.baseUrl,
          "cookie": IiIiII,
          "ua": $.UA,
          "activityId": $.activityId,
          "activityType": $.activityType,
          "venderId": $.venderId,
          "secretPin": $.secretPin,
          "prizeName": i1Il1,
          "generateId": li11ll
        },
              IIiI1l = I1Ilil(li1l1) || false;
        !l1Iil && IIiI1l && (await llIIIi.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + i1Il1 + "，已成功自动登记收货地址\n\n" + $.activityUrl));
        $.message.insert(i1Il1 + "(" + (IIiI1l ? "已填地址" : "未填地址") + ")🎁");
        break;

      case 8:
        console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
        break;

      case 9:
        console.log("🗑️ " + IIlIIi.giftName + " 🎟️"), $.message.insert(IIlIIi.giftName + "🎟️");
        break;

      case 13:
      case 14:
      case 15:
        console.log("🎉 恭喜获得" + IIlIIi.giftName + " 🎁"), $.message.insert(IIlIIi.giftName + "🎁");
        !l1Iil && (await llIIIi.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + IIlIIi.giftName + "\n\n" + $.activityUrl));
        break;

      case 16:
        console.log("🎉 " + IIlIIi.priceInfo + " 🧧"), $.message.insert(IIlIIi.priceInfo + "红包🧧");
        break;

      default:
        IIlIIi.giftName.includes("券") ? (console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️")) : (console.log("获得：" + IIlIIi.giftName), $.message.insert("" + IIlIIi.giftName));
        break;
    } else IIlIIi?.["giftName"] ? console.log("未中奖（原奖品 \"" + IIlIIi.giftName + "\" 已发完）") : console.log("未中奖（奖品已发完）");
  } else console.log("结果 -> 签到成功");
}

async function iIIlii(lIilI1) {
  if (lIilI1.gift) {
    const li1li = lIilI1.gift,
          iIIIll = li1li.insufficient;
    process.stdout.write("结果 -> ");
    if (!iIIIll) switch (parseInt(li1li.giftType)) {
      case 6:
        console.log("🎉 " + li1li.giftName + " 🐶"), $.message.insert(li1li.giftName + "🐶");
        break;

      case 7:
        const ll1Ii1 = lIilI1.addressId;
        let li1ll = li1li.giftName;
        console.log("🎉 恭喜获得实物~"), console.log("奖品名称：" + li1ll), console.log("参考价值：" + lIilI1.gift.priceInfo + "（元）"), console.log("预览图片：" + lIilI1.gift.showImage);
        const iliii1 = {
          "baseUrl": $.baseUrl,
          "cookie": IiIiII,
          "ua": $.UA,
          "activityId": $.activityId,
          "activityType": $.activityType,
          "venderId": $.venderId,
          "secretPin": $.secretPin,
          "prizeName": li1ll,
          "generateId": ll1Ii1
        },
              i1IiI = I1Ilil(iliii1) || false;
        !l1Iil && i1IiI && (await llIIIi.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中实物 " + li1ll + "，已成功自动登记收货地址\n\n" + $.activityUrl));
        $.message.insert(li1ll + "(" + (i1IiI ? "已填地址" : "未填地址") + ")🎁");
        break;

      case 8:
        console.log("🗑️ 专享价"), $.message.insert("专享价🗑️");
        break;

      case 9:
        console.log("🗑️ " + li1li.giftName + " 🎟️"), $.message.insert(li1li.giftName + "🎟️");
        break;

      case 13:
      case 14:
      case 15:
        console.log("🎉 恭喜获得" + li1li.giftName + " 🎁"), $.message.insert(li1li.giftName + "🎁");
        !l1Iil && (await llIIIi.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n抽中 " + li1li.giftName + "\n\n" + $.activityUrl));
        break;

      case 16:
        console.log("🎉 " + li1li.priceInfo + " 🧧"), $.message.insert(li1li.priceInfo + "红包🧧");
        break;

      default:
        if (li1li.giftName.includes("券")) console.log("🗑️ 优惠券"), $.message.insert("优惠券🗑️");else {
          console.log("获得：" + li1li.giftName);
          $.message.insert("" + li1li.giftName);
        }
        break;
    } else li1li?.["giftName"] ? console.log("未中奖（原奖品 \"" + li1li.giftName + "\" 已发完）") : console.log("未中奖（奖品已发完）");
  } else console.log("结果 -> 签到成功");
}

async function llIII1() {
  let l1iI1l = {
    "url": $.baseUrl + "/customer/getMyPing",
    "headers": {
      "Host": $.hostname,
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": $.origin,
      "User-Agent": $.UA,
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": IiIiII
    },
    "body": "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP"
  };
  return new Promise(l1lIII => {
    $.post(l1iI1l, (I11i, ll1IlI, I11l) => {
      try {
        if (I11i) console.log(I11i);else {
          if (ll1IlI.headers["set-cookie"]) {
            IiIiII = "";

            for (let lIllli of ll1IlI.headers["set-cookie"]) {
              iill1i[lIllli.split(";")[0].substr(0, lIllli.split(";")[0].indexOf("="))] = lIllli.split(";")[0].substr(lIllli.split(";")[0].indexOf("=") + 1);
            }

            for (const I11I of Object.keys(iill1i)) {
              IiIiII += I11I + "=" + iill1i[I11I] + ";";
            }
          }

          I11l ? (I11l = JSON.parse(I11l), I11l.result ? $.secretPin = I11l.data?.["secretPin"] : console.log(I11l.errorMessage)) : console.log("京东返回了空数据");
        }
      } catch (i1IiIl) {
        console.log(i1IiIl);
      } finally {
        l1lIII();
      }
    });
  });
}

async function IiIiI() {
  let Ili1il = {
    "url": $.baseUrl + "/customer/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.token + "&source=01&venderId=" + $.venderId + "&uuid=" + $.UUID + "&clientTime=" + Date.now(),
    "headers": {
      "Host": $.hostname,
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Origin": $.origin,
      "User-Agent": $.UA,
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": IiIiII
    }
  };
  return new Promise(iilIli => {
    $.get(Ili1il, (l1II1, III1i1, IlI1) => {
      try {
        if (l1II1) console.log(l1II1);else {
          if (III1i1.headers["set-cookie"]) {
            IiIiII = "";

            for (let IiIil1 of III1i1.headers["set-cookie"]) {
              iill1i[IiIil1.split(";")[0].substr(0, IiIil1.split(";")[0].indexOf("="))] = IiIil1.split(";")[0].substr(IiIil1.split(";")[0].indexOf("=") + 1);
            }

            for (const lIiIlI of Object.keys(iill1i)) {
              IiIiII += lIiIlI + "=" + iill1i[lIiIlI] + ";";
            }
          }

          $.pinToken = IIlI1I.getCookieValue(IiIiII, "pToken");
          $.te = IIlI1I.getCookieValue(IiIiII, "te");

          if (IlI1) {
            IlI1 = JSON.parse(IlI1);
            if (IlI1.result) $.secretPin = IlI1.data?.["secretPin"];else {
              if (IlI1.errorMessage) console.log(IlI1.errorMessage), $.initError = true;else {
                $.initError = true;
              }
            }
          } else console.log("京东返回了空数据");
        }
      } catch (llIii1) {
        console.log(llIii1);
      } finally {
        iilIli();
      }
    });
  });
}

function iill1I() {
  return new Promise(IlIl => {
    $.get({
      "url": $.activityUrl,
      "headers": {
        "user-agent": $.UA
      }
    }, (i1111, iIIlII, IlIi1l) => {
      try {
        if (i1111) console.log(i1111);else {
          if (iIIlII.headers["set-cookie"]) {
            IiIiII = "";

            for (let IlIi1i of iIIlII.headers["set-cookie"]) {
              iill1i[IlIi1i.split(";")[0].substr(0, IlIi1i.split(";")[0].indexOf("="))] = IlIi1i.split(";")[0].substr(IlIi1i.split(";")[0].indexOf("=") + 1);
            }

            for (const l1iil1 of Object.keys(iill1i)) {
              IiIiII += l1iil1 + "=" + iill1i[l1iil1] + ";";
            }
          }
        }
      } catch (illl1I) {
        console.log(illl1I);
      } finally {
        IlIl();
      }
    });
  });
}

function Illi1(lillI, Il11i, illl11) {
  function Il11l(l1iI11) {
    l1iI11 = l1iI11.split("").reverse().join("");
    const i11I1 = new Uint8Array(12),
          IlIiI = new TextEncoder().encode(l1iI11);

    for (let iilllI = 0; iilllI < IlIiI.length; iilllI += 2) {
      let i1i1iI = IlIiI[iilllI] << 5 | IlIiI[iilllI + 1] & 255;
      i1i1iI %= 63;
      i11I1[iilllI >> 1] = i1i1iI;
    }

    let l1iI1I = "";

    for (let iillil = 0; iillil < i11I1.length; iillil++) {
      l1iI1I += (i11I1[iillil] + 256).toString(2).slice(1);
    }

    let ilI1i1 = "",
        l1I1I = "";

    for (let ilI1iI = 0; ilI1iI < 16; ilI1iI++) {
      if (ilI1iI !== 0) {
        const i11II = ilI1iI * 6,
              IlIi1 = l1iI1I.substring(i11II, i11II + 6);
        let i1i1il = parseInt(IlIi1, 2);
        const i1i1ii = l1I1I.split("");

        for (let Il1ill = 0; Il1ill < i1i1ii.length; Il1ill++) {
          i1i1ii[Il1ill] === "1" && (i1i1il = (i1i1il >> 6 - Il1ill | i1i1il << Il1ill) & 63);
        }

        l1I1I = (i1i1il & 63).toString(2).padStart(6, "0");
      } else l1I1I = l1iI1I.substring(0, 6);

      ilI1i1 += l1I1I;
    }

    for (let IIllII = 0; IIllII < 12; IIllII++) {
      const iil1I1 = IIllII * 8;
      i11I1[IIllII] = parseInt(ilI1i1.substring(iil1I1, iil1I1 + 8), 2);
    }

    const l1lII1 = btoa(String.fromCharCode.apply(null, i11I1));
    return l1lII1;
  }

  const l1iiil = ["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"];
  let l1ilI = Date.now() + parseInt(illl11);
  typeof lillI != "object" && (lillI = JSON.parse(lillI));
  lillI.nowTime = l1ilI;
  let IIi1 = Il11i + l1ilI;
  const illl1i = IIi1.substring(0, IIi1.length - 5);
  let l1iiii = "";

  for (let iI11il = 0; iI11il < illl1i.length; iI11il++) {
    let iii111 = illl1i.charCodeAt(iI11il),
        liiI = iii111 % 10,
        liIII1 = l1iiil[liiI][iI11il];
    l1iiii += liIII1;
  }

  var iiiIi1 = l1iiii.length,
      illl1l = Math.floor(iiiIi1 / 24),
      Il11I = "";

  for (var li1lll = 0; li1lll < 24; li1lll++) {
    var IiIIi = (li1lll + 1) * illl1l;
    li1lll === 23 && (IiIIi = iiiIi1);
    var li1lli = l1iiii.substring(li1lll * illl1l, IiIIi);
    var I1i1I = [];

    for (var IiIIl = 0; IiIIl < li1lli.length; IiIIl++) {
      I1i1I.push(li1lli.charCodeAt(IiIIl));
    }

    var iiiIl1 = I1i1I.reduce(function (iliili, iliill) {
      return iliili + iliill;
    }, 0);
    var lill1 = Math.floor(iiiIl1 / I1i1I.length);
    Il11I += String.fromCharCode(lill1);
  }

  l1iiii = Il11I;
  const IIl1 = Il11l(l1iiii),
        l1ili = l1I1I1.enc.Utf8.parse(IIl1),
        i1Ii11 = l1I1I1.enc.Utf8.parse(""),
        l1iill = l1I1I1.AES.encrypt(JSON.stringify(lillI), l1ili, {
    "iv": i1Ii11,
    "mode": l1I1I1.mode.ECB,
    "padding": l1I1I1.pad.Pkcs7
  });
  return l1iill.toString();
}// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
