/*
#抽现金抽奖提现

轮询提现变量：jd_cxjhelp_num //轮询提现页数

兑换红包变量：
export jd_cxjhelp_tjdh="true" // 特价抽现金兑换红包，默认关闭
export jd_cxjhelp_jddh="true" // 京东转赚红包兑换红包，默认关闭

注意：轮询页数也大，越容易403，请谨慎填写

更新提现失败重试
更新抽奖火爆重试（一直火爆一直重试）
更新统计
更新转赚红包 上限兑换红包
更新单独兑换红包变量，避免兑换失败一直请求
更新此次活动到期时间
更新提现金活动 白号才有 黑号无


[task_local]
#抽现金抽奖提现
11 11 11 11 * jd_cxjhelp_draw.js, tag=抽现金抽奖提现, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true*/
let lnrun = 0;


const $ = new Env("抽现金抽奖提现");

const IlilIIII = $.isNode() ? require("./jdCookie") : "",
  liIl1iii = require("./function/h5st41.js"),
  IllllIl = require("./function/jdCommon");
let III11lI1 = [],
  lli1iii = "";
$.krtyhot = false;
let lil11il = ["3orGfh1YkwNLksxOcN8zWQ", "EcuVpjGGfccY3Ic_1ni83w", "Wvzc_VpNTlSkiQdHT8r7QA"],
  lII1lI = ["京东转赚红包", "邀好友得红包", "特价抽现金"],
  l1llliii = process.env.jd_cxjhelp_tjdh ? process.env.jd_cxjhelp_tjdh : "false",
  l1llIili = process.env.jd_cxjhelp_jddh ? process.env.jd_cxjhelp_jddh : "false",
  IiiiIl = "",
  iiI1IlIi = process.env.jd_cxjhelp_num ? process.env.jd_cxjhelp_num : "1";
if ($.isNode()) {
  Object.keys(IlilIIII).forEach(II1IlI1I => {
    III11lI1.push(IlilIIII[II1IlI1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  III11lI1 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...ilIlIiiI($.getdata("CookiesJD") || "[]").map(IIIiIlII => IIIiIlII.cookie)].filter(IIill11 => !!IIill11);
}
!(async () => {
  if (!III11lI1[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  console.log("当前设置特价兑换红包：" + l1llliii);
  console.log("当前设置转赚兑换红包：" + l1llIili);
  for (let lIIiIll1 = 0; lIIiIll1 < III11lI1.length; lIIiIll1++) {
    if (III11lI1[lIIiIll1]) {
      lli1iii = III11lI1[lIIiIll1];
      $.UserName = decodeURIComponent(lli1iii.match(/pt_pin=([^; ]+)(?=;?)/) && lli1iii.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lIIiIll1 + 1;
      $.canUseCoinAmount = 0;
      console.log("");
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      $.UA = IllllIl.genUA($.UserName);
      for (let lIi1lI = 0; lIi1lI < lil11il.length; lIi1lI++) {
        IiiiIl = lil11il[lIi1lI];
        appName = lII1lI[lIi1lI];
        console.log("\n开始第" + (lIi1lI + 1) + "个活动：" + appName + "\n");
        await IlIiilII();
        await $.wait(2000);
      }
    }
  }
})().catch(iiiIlill => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + iiiIlill + "!", "");
}).finally(() => {
  $.done();
});
async function IlIiilII() {
  $.txhot = false;
  $.inviteFissionReceivehot = false;
  $.stateEnd = false;
  $.nologin = false;
  $.cashVoKR = false;
  $.hbnums = 0;
  $.xjnums = 0;
  await il11I11i();
  if (!$.nologin) {
    if ($.prizeNum > 0) {
      for (m = 1; $.prizeNum--; m++) {
        console.log("进行第" + m + "次抽奖");
        await lIiIlI1();
        await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
        $.cashVoKR && !$.stateEnd && !$.inviteFissionReceivehot && IiiiIl == "EcuVpjGGfccY3Ic_1ni83w" && (await IiIllill(), await $.wait(parseInt(Math.random() * 1000 + 2000, 10)));
      }
    }
    console.log("\n当前设置轮询提现页数：" + iiI1IlIi);
    for (let ilIil1il = 0; ilIil1il < iiI1IlIi; ilIil1il++) {
      $.pageNum = ilIil1il + 1;
      console.log("\n开始轮询提现" + $.pageNum + "页");
      await lilllll($.pageNum);
      await $.wait(parseInt(Math.random() * 2000 + 3000, 10));
      if ($.txhot) {
        break;
      }
    }
  }
}
async function lIiIlI1() {
  return new Promise(async Iiilllii => {
    let Ii1IlII1 = {
      ts: Date.now(),
      ridx: -1,
      hdid: lIiii1li(43) + "=",
      cipher: {},
      appname: "wegame",
      version: "1.0.0",
      ciphertype: 5
    };
    const illll1II = {
        functionId: "inviteFissionDrawPrize",
        appid: "activities_platform",
        clientVersion: "10.1.0",
        client: "ios",
        body: {
          linkId: IiiiIl,
          lbs: JSON.stringify(Ii1IlII1)
        }
      },
      illIl11l = await iIIllllI("c02c6", illll1II);
    let Ili1li1i = {
      url: "https://api.m.jd.com/api?functionId=inviteFissionDrawPrize&" + illIl11l,
      headers: {
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        origin: "https://pro.m.jd.com",
        "User-Agent": $.UA,
        Cookie: lli1iii
      },
      timeout: 30000
    };
    $.get(Ili1li1i, async (lili111, iiIi11iI, Il1i1l) => {
      try {
        if (lili111) {
          console.log("" + JSON.stringify(lili111));
        } else {
          Il1i1l = JSON.parse(Il1i1l);
          if (Il1i1l) {
            if (Il1i1l.code == 0 && Il1i1l.success == true) {
              if (Il1i1l.data) {
                $.prizeType = Il1i1l?.["data"]?.["prizeType"];
                switch ($.prizeType) {
                  case 0:
                    console.log("抽中未知  🎁");
                    break;
                  case 1:
                    console.log("抽中垃圾卷  🗑️");
                    break;
                  case 2:
                    $.hbprizeValue = Il1i1l?.["data"]?.["prizeValue"] || 0;
                    $.hbnum = ($.hbprizeValue * 100 + $.hbnums * 100) / 100;
                    $.hbnums = iliIiIi($.hbnum);
                    console.log("抽中红包：" + $.hbprizeValue + " 🧧 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");
                    break;
                  case 4:
                    $.xjprizeValue = Il1i1l?.["data"]?.["prizeValue"] || 0;
                    $.xjnum = ($.xjprizeValue * 100 + $.xjnums * 100) / 100;
                    $.xjnums = iliIiIi($.xjnum);
                    console.log("抽中现金：" + $.xjprizeValue + " 🎁 总现金：" + $.xjnums + " 🎁|总红包：" + $.hbnums + " 🧧");
                    break;
                  case 6:
                    console.log("抽中惊喜大礼包  🗑️");
                    break;
                  default:
                    console.log("❌ 未知类型：（" + $.prizeType + "）暂不受本脚本支持，请联系作者进行反馈！");
                }
              }
            } else {
              Il1i1l.code == 2000 && Il1i1l.msg == "活动火爆" ? console.log("不多说了，乌漆嘛黑") : (console.log(Il1i1l.errMsg), Il1i1l.errMsg.includes("火爆") && $.prizeNum++);
            }
          }
        }
      } catch (liIil1ll) {
        $.logErr(liIil1ll, iiIi11iI);
      } finally {
        Iiilllii();
      }
    });
  });
}
async function IiIllill() {
  return new Promise(async Iiliil => {
    const lIl1Iiii = {
        functionId: "inviteFissionReceive",
        appid: "activities_platform",
        clientVersion: "10.1.0",
        client: "ios",
        body: {
          linkId: IiiiIl
        }
      },
      lII1111l = await iIIllllI("b8469", lIl1Iiii);
    let i1IlllII = {
      url: "https://api.m.jd.com/?functionId=inviteFissionReceive&" + lII1111l,
      headers: {
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        origin: "https://pro.m.jd.com",
        "User-Agent": $.UA,
        Cookie: lli1iii
      },
      timeout: 30000
    };
    $.get(i1IlllII, async (iliIill1, IlllIiil, IiilIIl1) => {
      try {
        if (iliIill1) {
          console.log("" + JSON.stringify(iliIill1));
        } else {
          IiilIIl1 = JSON.parse(IiilIIl1);
          if (IiilIIl1) {
            if (IiilIIl1.code == 0 && IiilIIl1.success == true) {
              console.log("抽中提现金：" + (IiilIIl1?.["data"]?.["receiveList"][0]?.["amount"] || "未获得提现金") + " ,还需 " + IiilIIl1?.["data"]?.["leftAmount"] + " 提现金,进度值：" + IiilIIl1?.["data"]?.["rate"] + " %");
              IiilIIl1?.["data"]?.["state"] == 3 && console.log("已成功获得 " + IiilIIl1?.["data"]?.["amount"] + " 元提现金，快去提现吧！");
            } else {
              if (IiilIIl1.code == 80209 && IiilIIl1.errMsg == "活动太火爆，请稍候重试") {
                console.log("当期额外提现任务已完成，跳过");
                $.inviteFissionReceivehot = true;
              } else {
                IiilIIl1.code == 80208 && IiilIIl1.errMsg == "活动太火爆，请稍候重试" ? console.log("未获得提现金," + IiilIIl1.errMsg) : console.log(IiilIIl1.errMsg);
              }
            }
          }
        }
      } catch (Ii1i111I) {
        $.logErr(Ii1i111I, IlllIiil);
      } finally {
        Iiliil();
      }
    });
  });
}
async function il11I11i() {
  return new Promise(async li1iIlll => {
    const iiiiIII1 = {
        functionId: "inviteFissionHome",
        appid: "activities_platform",
        clientVersion: "10.1.0",
        client: "ios",
        body: {
          linkId: IiiiIl,
          inviter: ""
        }
      },
      i11IlIi = await iIIllllI("eb67b", iiiiIII1);
    let il111ii1 = {
      url: "https://api.m.jd.com/?functionId=inviteFissionHome&" + i11IlIi,
      headers: {
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        origin: "https://pro.m.jd.com",
        "User-Agent": $.UA,
        Cookie: lli1iii
      },
      timeout: 30000
    };
    $.post(il111ii1, async (iIIli111, I1i11I1I, lI1iIlil) => {
      try {
        if (iIIli111) {
          console.log("" + JSON.stringify(iIIli111));
        } else {
          lI1iIlil = JSON.parse(lI1iIlil);
          if (lI1iIlil) {
            if (lI1iIlil.code == 0 && lI1iIlil.success == true) {
              $.inviteFissionHome = lI1iIlil?.["data"] || [];
              var i1Il11l = new Date().valueOf();
              $.drawPrizeNum = $.inviteFissionHome?.["drawPrizeNum"] || 0;
              $.prizeNum = $.inviteFissionHome?.["prizeNum"] || 0;
              $.countDownTime = $.inviteFissionHome?.["countDownTime"] || 0;
              countDownTime = i1Il11l + $.countDownTime;
              let lIi111l = $.inviteFissionHome?.["inviter"] || "";
              const liI111lI = $.time("yyyy-MM-dd HH:mm:ss", countDownTime);
              if (IiiiIl == "EcuVpjGGfccY3Ic_1ni83w") {
                $.cashVo = $.inviteFissionHome?.["cashVo"] || "";
                if ($.cashVo) {
                  $.cashVoKR = true;
                  $.txjstate = $.inviteFissionHome?.["cashVo"]?.["state"] || 0;
                  console.log("限时提现金：\n已有 " + $.cashVo?.["amount"] + " 提现金，仅差 " + $.cashVo?.["leftAmount"] + " 提现金可提现 " + $.cashVo?.["totalAmount"] + " 元,进度值：" + $.cashVo?.["rate"] + " %\n");
                  switch ($.txjstate) {
                    case 0:
                    case 1:
                    case 2:
                      break;
                    case 3:
                      console.log("已成功获得限时提现金 " + $.cashVo?.["totalAmount"] + " 元，时间：" + $.cashVo?.["rewardRecord"]?.["createTime"] + "\n");
                      $.stateEnd = true;
                      break;
                    default:
                      console.log("❌ 未知类型：（" + $.txjstate + "）暂不受本脚本支持，请联系作者进行反馈！");
                  }
                }
              }
              console.log("到期时间：" + liI111lI + "\n助力码：" + lIi111l + "\n已抽奖次数：" + $.drawPrizeNum + "\n剩余抽奖次数：" + $.prizeNum);
            } else {
              if (lI1iIlil.code == 2000 && lI1iIlil.errMsg == "活动火爆") {
                console.log("不多说了，乌漆嘛黑");
              } else {
                lI1iIlil.code == 1000 && lI1iIlil.errMsg == "未登录" ? (console.log(lI1iIlil.errMsg), $.nologin = true) : console.log(lI1iIlil.errMsg);
              }
            }
          }
        }
      } catch (lI11lli1) {
        $.logErr(lI11lli1, I1i11I1I);
      } finally {
        li1iIlll();
      }
    });
  });
}
async function lilllll(I1II111I) {
  return new Promise(async i1llII1 => {
    const i1iIil1l = {
        functionId: "superRedBagList",
        appid: "activities_platform",
        clientVersion: "10.1.0",
        client: "ios",
        body: {
          linkId: IiiiIl,
          pageNum: I1II111I,
          pageSize: 100,
          business: "fission"
        }
      },
      IIl1ilii = await iIIllllI("f2b1d", i1iIil1l);
    let IliiiIIl = {
      url: "https://api.m.jd.com/?" + IIl1ilii,
      headers: {
        Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
        origin: "https://pro.m.jd.com",
        "User-Agent": $.UA,
        Cookie: lli1iii
      },
      timeout: 30000
    };
    $.get(IliiiIIl, async (lIllII1, iIlII, lliIlIii) => {
      try {
        if (lIllII1) {
          console.log("" + JSON.stringify(lIllII1));
        } else {
          lliIlIii = JSON.parse(lliIlIii);
          if (lliIlIii) {
            if (lliIlIii.code == 0 && lliIlIii.success == true) {
              const II1I1I = (lliIlIii.data.items || []).filter(IIililll => IIililll.prizeType === 4 && IIililll.state === 0 || IIililll.state === 2);
              for (let Ii11l1il of II1I1I) {
                console.log("抽现金抽奖提现，去提现" + Ii11l1il.amount + "现金");
                await liIliiiI(Ii11l1il.id, Ii11l1il.poolBaseId, Ii11l1il.prizeGroupId, Ii11l1il.prizeBaseId);
                await $.wait(parseInt(Math.random() * 2000 + 4000, 10));
                if ($.txhot) {
                  console.log("抽现金抽奖提现失败，" + $.apCashWithDrawmessage);
                  break;
                }
              }
            } else {
              console.log("抽现金抽奖提现查询奖品：异常:" + JSON.stringify(lliIlIii));
            }
          }
        }
      } catch (liili1i1) {
        $.logErr(liili1i1, iIlII);
      } finally {
        i1llII1();
      }
    });
  });
}
async function liIliiiI(lIi1illI, I1llI1I1, liIlllI, l1lilll1) {
  return new Promise(async Ill11111 => {
    const IilI11i = {
        linkId: IiiiIl,
        businessSource: "NONE",
        base: {
          prizeType: 4,
          business: "fission",
          id: lIi1illI,
          poolBaseId: I1llI1I1,
          prizeGroupId: liIlllI,
          prizeBaseId: l1lilll1
        }
      },
      i1IilIii = {
        url: "https://api.m.jd.com",
        body: "functionId=apCashWithDraw&body=" + escape(JSON.stringify(IilI11i)) + "&_t=" + +new Date() + "&appid=activities_platform",
        headers: {
          Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          origin: "https://pro.m.jd.com",
          "User-Agent": $.UA,
          Cookie: lli1iii
        },
        timeout: 30000
      };
    $.post(i1IilIii, async (lil1il11, IllI1lll, I1Iili1I) => {
      try {
        if (lil1il11) {
          console.log("" + JSON.stringify(lil1il11));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (lliiI1(I1Iili1I)) {
            I1Iili1I = $.toObj(I1Iili1I);
            if (I1Iili1I.code === 0) {
              if (I1Iili1I.data.status === "310") {
                console.log("提现现金成功！");
              } else {
                $.apCashWithDrawmessage = I1Iili1I?.["data"]?.["message"];
                console.log("提现现金失败:" + $.apCashWithDrawmessage);
                if ($.apCashWithDrawmessage.includes("上限")) {
                  if (l1llliii == "true" && IiiiIl == "Wvzc_VpNTlSkiQdHT8r7QA") {
                    await iiIIlII(lIi1illI, I1llI1I1, liIlllI, l1lilll1);
                  } else {
                    if (l1llIili == "true" && IiiiIl == "3orGfh1YkwNLksxOcN8zWQ") {
                      await iiIIlII(lIi1illI, I1llI1I1, liIlllI, l1lilll1);
                    } else {
                      $.txhot = true;
                    }
                  }
                } else {
                  if ($.apCashWithDrawmessage.includes("已存在状态")) {
                    await $.wait(parseInt(Math.random() * 2000 + 5000, 10));
                    await liIliiiI(lIi1illI, I1llI1I1, liIlllI, l1lilll1);
                  } else {
                    ($.apCashWithDrawmessage.includes("未绑定微信") || $.apCashWithDrawmessage.includes("绑定手机号")) && ($.txhot = true);
                  }
                }
              }
            } else {
              console.log("提现现金异常:" + JSON.stringify(I1Iili1I));
            }
          }
        }
      } catch (lilli1li) {
        $.logErr(lilli1li, IllI1lll);
      } finally {
        Ill11111(I1Iili1I);
      }
    });
  });
}
function iiIIlII(ilIiil1l, iliI1Il, lliIi1Il, iI1i1Ii1) {
  return new Promise(I1IiI1li => {
    const iiiIl1ii = {
        linkId: IiiiIl,
        businessSource: "fission",
        business: "business",
        drawRecordId: ilIiil1l,
        poolId: iliI1Il,
        prizeGroupId: lliIi1Il,
        prizeId: iI1i1Ii1
      },
      ilI1i = {
        url: "https://api.m.jd.com",
        body: "functionId=apRecompenseDrawPrize&body=" + escape(JSON.stringify(iiiIl1ii)) + "&_t=" + +new Date() + "&appid=activities_platform",
        headers: {
          Referer: "https://pro.m.jd.com/jdlite/active/23CeE8ZXA4uFS9M9mTjtta9T4S5x/index.html",
          origin: "https://pro.m.jd.com",
          "User-Agent": $.UA,
          Cookie: lli1iii
        },
        timeout: 30000
      };
    $.post(ilI1i, async (iliiiiIi, IiIllI1i, iiiIilll) => {
      try {
        if (iliiiiIi) {
          console.log("" + JSON.stringify(iliiiiIi));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (lliiI1(iiiIilll)) {
            iiiIilll = $.toObj(iiiIilll);
            if (iiiIilll.code == 0) {
              console.log("兑换红包成功");
            } else {
              console.log("兑换红包失败:" + iiiIilll.errMsg);
            }
          }
        }
      } catch (II1i1l1) {
        $.logErr(II1i1l1, IiIllI1i);
      } finally {
        I1IiI1li(iiiIilll);
      }
    });
  });
}
function IlI11ii(I1iiiiii) {
  return I1iiiiii.then(I1Iill => {
    return [null, I1Iill];
  }).catch(iIilI1l1 => [iIilI1l1]);
}
async function iIIllllI(IiiilI, IiIlIiIl) {
  try {
    let IiIlI1Ii = new liIl1iii({
      appId: IiiilI,
      appid: "activities_platform",
      clientVersion: IiIlIiIl?.["clientVersion"],
      client: IiIlIiIl?.["client"],
      pin: $.UserName,
      ua: $.UA,
      version: "4.1"
    });
    await IiIlI1Ii.genAlgo();
    body = await IiIlI1Ii.genUrlParams(IiIlIiIl.functionId, IiIlIiIl.body);
    return body;
  } catch (I1lilIii) {}
}
function lIiii1li(IiIl1liI) {
  IiIl1liI = IiIl1liI || 32;
  let Il1llI1I = "0123456789abcdef",
    I1lil1li = Il1llI1I.length,
    l1lil = "";
  for (let lI1ilii1 = 0; lI1ilii1 < IiIl1liI; lI1ilii1++) {
    l1lil += Il1llI1I.charAt(Math.floor(Math.random() * I1lil1li));
  }
  return l1lil;
}
function ilIlIiiI(l11Iiil1) {
  if (typeof l11Iiil1 == "string") {
    try {
      return JSON.parse(l11Iiil1);
    } catch (I1II1l1) {
      console.log(I1II1l1);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function i1i1l111(lI1l11I) {
  return new Promise(iI1ll11 => {
    const ill1iIIi = {
      url: lI1l11I + "?" + new Date(),
      timeout: 10000,
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ill1iIIi, async (ilii1iI, IliI1l1l, I1ilIl1) => {
      try {
        if (ilii1iI) {
          $.getAuthorCodeListerr = false;
        } else {
          if (I1ilIl1) {
            I1ilIl1 = JSON.parse(I1ilIl1);
          }
          $.getAuthorCodeListerr = true;
        }
      } catch (Ii1llll1) {
        $.logErr(Ii1llll1, IliI1l1l);
        I1ilIl1 = null;
      } finally {
        iI1ll11(I1ilIl1);
      }
    });
  });
}
function l1lIli1l(ill1l1II, iIliIIl1) {
  return Math.floor(Math.random() * (iIliIIl1 - ill1l1II)) + ill1l1II;
}
function iliIiIi(iIi1liii) {
  var Ill11ilI = Number(iIi1liii);
  if (!isNaN(parseFloat(Ill11ilI))) {
    Ill11ilI = Ill11ilI.toFixed(2);
  }
  return Ill11ilI;
}
function lliiI1(ill1i1Il) {
  try {
    if (typeof JSON.parse(ill1i1Il) == "object") {
      return true;
    }
  } catch (I11liI1i) {
    console.log(I11liI1i);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
