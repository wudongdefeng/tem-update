/*
活动名称：上上签抽奖（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10054&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
环境变量：jd_lzkj_loreal_upperSign_url // 活动链接

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('上上签抽奖（超级无线欧莱雅）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityUrl = process.env.jd_lzkj_loreal_upperSign_url,
  activityId = null,
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_upperSign_url) activityUrl = process.env.jd_lzkj_loreal_upperSign_url;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(i1ii1lil => {
    cookiesArr.push(jdCookieNode[i1ii1lil]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(liIlIIiI => liIlIIiI.cookie)].filter(lIllilII => !!lIllilII);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  activityType = getQueryString("" + activityUrl, "activityType");
  templateId = getQueryString("" + activityUrl, "templateId");
  if (activityUrl.includes("lorealjdcampaign-rc")) wxActType = "apps/interact";else activityUrl.includes("lzkj") ? wxActType = activityUrl.match(/\/(prod\/cc\/interact\w*)\//)[1] : console.log("暂不支持的类型");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
}
let domains = "https://" + $.domain;
!(async () => {
  if (activityId == null) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口：" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let Il1lII1i = 0; Il1lII1i < cookiesArr.length; Il1lII1i++) {
    if (cookiesArr[Il1lII1i]) {
      cookie = cookiesArr[Il1lII1i];
      originCookie = cookiesArr[Il1lII1i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = Il1lII1i + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await getUA();
      await Main();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd || $.outFlag || $.maxcountnum) break;
    }
  }
})().catch(lIlIil => {
  $.log("", " " + $.name + ", 失败! 原因: " + lIlIil + "!", "");
}).finally(() => {
  $.done();
});
async function Main() {
  $.acquire = 0;
  $.shareUser = 0;
  $.shareUserNum = 0;
  $.token = "";
  $.Pin = "";
  $.OpenCard = false;
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.token) {
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    if ($.hasEnd || $.activityEnd || $.outFlag || $.OpenCard) return;
    await $.wait(300);
    await follow();
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    await $.wait(300);
    await activity("upperSign");
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
    for (let iIill1iI = 0; iIill1iI < $.taskslist.length; iIill1iI++) {
      $.taskstatus = $.taskslist[iIill1iI].status || 0;
      $.taskType = $.taskslist[iIill1iI].taskType;
      if ($.taskstatus == 0) {
        if ($.taskslist[iIill1iI].taskId) {
          switch ($.taskType) {
            case 1:
            case 2:
            case 14:
              $.taskId = $.taskslist[iIill1iI].taskId;
              $.skuId = "";
              await toDo();
              await $.wait(parseInt(Math.random() * 500 + 500, 10));
              break;
            case 3:
            case 5:
            case 7:
              $.taskId = $.taskslist[iIill1iI].taskId;
              $.skuInfoVO = $.taskslist[iIill1iI].skuInfoVO || [];
              for (let l1I1IIil = 0; l1I1IIil < $.skuInfoVO.length; l1I1IIil++) {
                $.taskskuInfoVO = $.skuInfoVO[l1I1IIil].status || 0;
                $.taskskuInfoVO == 0 && ($.skuId = $.skuInfoVO[l1I1IIil].skuId, await toDo(), await $.wait(parseInt(Math.random() * 500 + 500, 10)));
              }
              break;
            case 4:
            case 6:
            case 9:
              $.taskId = $.taskslist[iIill1iI].taskId;
              $.skuId = "";
              await toDo();
              await $.wait(parseInt(Math.random() * 500 + 500, 10));
              break;
            case 10:
            case 12:
              $.taskId = $.taskslist[iIill1iI].taskId;
              $.skuId = "";
              $.taskfinishNum = $.taskslist[iIill1iI].finishNum || 0;
              $.taskshareCount = $.taskslist[iIill1iI].shareCount || 0;
              for (let l1i1IllI = 0; l1i1IllI < $.taskfinishNum; l1i1IllI++) {
                await toDo();
                await $.wait(parseInt(Math.random() * 500 + 500, 10));
              }
              break;
            case 8:
            case 13:
            case 15:
            case 22:
              break;
            default:
          }
        }
      }
    }
    await drawPrize();
    await $.wait(300);
    if ($.index == 1) {
      $.prizeList = "";
      for (let IiIIiIli = 0; IiIIiIli < $.prizeInfo.length; IiIIiIli++) {
        $.prizeName = $.prizeInfo[IiIIiIli].prizeName;
        $.leftNum = $.prizeInfo[IiIIiIli].leftNum;
        $.prizeType = $.prizeInfo[IiIIiIli].prizeType;
        switch ($.prizeType) {
          case 1:
            $.prizeType = "[京豆]";
            break;
          case 2:
            $.prizeType = "[优惠券]";
            break;
          case 3:
            $.prizeType = "[实物]";
            break;
          case 4:
            $.prizeType = "[积分]";
            break;
          case 5:
            $.prizeType = "[专享价]";
            break;
          case 6:
            $.prizeType = "[红包]";
            break;
          case 7:
            $.prizeType = "[礼品卡]";
            break;
          case 8:
            $.prizeType = "[E卡]";
            break;
          case 9:
            $.prizeType = "[PLUS会员]";
            break;
          case 10:
            $.prizeType = "[爱奇艺会员]";
            break;
          case 11:
            $.prizeType = "[积分]";
            break;
          default:
            console.log("未成功获取数据");
            return;
        }
        IiIIiIli != $.prizeInfo.length - 1 ? $.prizeList += "" + $.prizeType + $.prizeName + "(剩余" + $.leftNum + "件)\n" : $.prizeList += "" + $.prizeType + $.prizeName + "(剩余" + $.leftNum + "件)\n";
      }
      console.log("店铺名称：" + $.shopName + "\n活动名称：" + $.actName + "\n活动奖品：\n" + $.prizeList);
    }
    if ($.drawNumber > 0) console.log("可以抽奖" + $.drawNumber + "次");else {
      console.log("没有抽奖机会了~");
      return;
    }
    for (let IilIlliI = 0; IilIlliI < $.drawNumber; IilIlliI++) {
      await draw();
      await $.wait(2000);
      if (IilIlliI >= 3) {
        console.log("抽奖太多次，多余的次数请再执行脚本");
        break;
      }
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function getShopOpenCardInfo(ii1i1Ii) {
  let lIi1Ii1i = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(ii1i1Ii)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": $.UA,
      "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.joinVenderId + "&channel=801&returnUrl=" + encodeURIComponent(activityUrl),
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(ll1l1IIl => {
    $.get(lIi1Ii1i, (li11IIi1, IlI11Il1, l11lIiil) => {
      try {
        li11IIi1 ? li11IIi1 === "Response code 403 (Forbidden)" && ($.err = true, console.log(li11IIi1)) : (res = JSON.parse(l11lIiil), res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId)));
      } catch (lIlIlii1) {
        console.log(lIlIlii1);
      } finally {
        ll1l1IIl();
      }
    });
  });
}
function showMsg() {
  return new Promise(I1ll11II => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    I1ll11II();
  });
}
function login(lllIili, iIli1iI) {
  return new Promise(iI1iiIiI => {
    $.post(taskPostUrl(lllIili, iIli1iI), async (II1i1i11, I1l11IIl, Iliiii1l) => {
      try {
        if (II1i1i11) {
          console.log("" + JSON.stringify(II1i1i11));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          Iliiii1l = JSON.parse(Iliiii1l);
          if (Iliiii1l && Iliiii1l.data) {
            $.tokens = Iliiii1l.data.token;
            $.customerId = Iliiii1l.data.customerId;
            $.joinVenderId = Iliiii1l.data.joinInfo.shopId;
            $.openCardUrl = Iliiii1l.data.joinInfo.openCardUrl;
            $.shopName = Iliiii1l.data.shopName;
            $.actName = Iliiii1l.data.actName;
            $.openCardUrl && ($.joinVenderId = Iliiii1l.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1]);
            $.joinDes = Iliiii1l.data.joinInfo.joinCodeInfo.joinDes;
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              await getshopactivityId();
              for (let IIiIli = 0; IIiIli < Array(2).length; IIiIli++) {
                if (IIiIli > 0) console.log("第" + IIiIli + "次 重新开卡");
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
                  break;
                }
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), $.OpenCard = true);
              }
            }
          } else console.log(Iliiii1l);
          if (I1l11IIl.status == 200) {
            refreshToken(I1l11IIl);
          }
        }
      } catch (I1i1llll) {
        $.logErr(I1i1llll, I1l11IIl);
      } finally {
        iI1iiIiI();
      }
    });
  });
}
function follow() {
  return new Promise(lI1i11iI => {
    let Ii1lIllI = {};
    $.post(taskPostUrl("api/task/followShop/follow", Ii1lIllI), async (iI1iIi11, lillllll, IIlIl11l) => {
      try {
        if (iI1iIi11) {
          console.log("" + JSON.stringify(iI1iIi11));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          IIlIl11l = JSON.parse(IIlIl11l);
          if (IIlIl11l && IIlIl11l.resp_code == 0) {} else {
            console.log(IIlIl11l.resp_msg);
            for (let IIlIll1l of ["未开始", "结束", "不存在", "不在"]) {
              if (IIlIl11l.resp_msg.includes(IIlIll1l)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          lillllll.status == 200 && refreshToken(lillllll);
        }
      } catch (lIiIliI1) {
        $.logErr(lIiIliI1, lillllll);
      } finally {
        lI1i11iI();
      }
    });
  });
}
function activity(I1i11ii) {
  return new Promise(IliI1il1 => {
    let lIIill1i = {
      "shareUserId": ""
    };
    $.post(taskPostUrl("api/task/" + I1i11ii + "/getTask", lIIill1i), async (ii1ii1Il, Ili1iIl, II1Ii1iI) => {
      try {
        if (ii1ii1Il) {
          console.log("" + JSON.stringify(ii1ii1Il));
          console.log($.name + " activity API请求失败，请检查网路重试");
        } else {
          II1Ii1iI = JSON.parse(II1Ii1iI);
          if (II1Ii1iI && II1Ii1iI.data) $.taskslist = II1Ii1iI.data.taskList || [];else {
            console.log(II1Ii1iI.resp_msg);
            for (let iIIiiIi1 of ["未开始", "结束", "不存在", "不在"]) {
              if (II1Ii1iI.resp_msg.includes(iIIiiIi1)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          Ili1iIl.status == 200 && refreshToken(Ili1iIl);
        }
      } catch (Iil11lil) {
        $.logErr(Iil11lil, Ili1iIl);
      } finally {
        IliI1il1();
      }
    });
  });
}
function toDo() {
  return new Promise(llI1lI1l => {
    let l1ilIIIi = {
      "taskId": $.taskId,
      "skuId": $.skuId
    };
    $.post(taskPostUrl("api/basic/task/toDo", l1ilIIIi), async (l1I1iill, iilIII1l, lIIl1IlI) => {
      try {
        if (l1I1iill) {
          console.log("" + JSON.stringify(l1I1iill));
          console.log($.name + " toDo API请求失败，请检查网路重试");
        } else {
          lIIl1IlI = JSON.parse(lIIl1IlI);
          if (lIIl1IlI && lIIl1IlI.resp_code == 0) {} else {
            if (lIIl1IlI && lIIl1IlI.resp_code == 50013 || lIIl1IlI.resp_code == 50012) {} else {
              for (let Iii11iii of ["未开始", "结束", "不存在", "不在"]) {
                if (lIIl1IlI.resp_msg.includes(Iii11iii)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          }
          iilIII1l.status == 200 && refreshToken(iilIII1l);
        }
      } catch (liIiiIIi) {
        $.logErr(liIiiIIi, iilIII1l);
      } finally {
        llI1lI1l();
      }
    });
  });
}
function basicInfo() {
  return new Promise(lii1I11 => {
    let l11l1i1l = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(taskPostUrl("api/active/basicInfo", l11l1i1l), async (Ii1lI1ll, il1i1i, I1iIli1) => {
      try {
        if (Ii1lI1ll) {
          console.log("" + JSON.stringify(Ii1lI1ll));
          console.log($.name + " basicInfo API请求失败，请检查网路重试");
        } else {
          I1iIli1 = JSON.parse(I1iIli1);
          if (I1iIli1 && I1iIli1.resp_code == 0) {
            $.actName = I1iIli1.data.actName;
            $.shopName = I1iIli1.data.shopName;
          } else {
            console.log(I1iIli1);
          }
          il1i1i.status == 200 && refreshToken(il1i1i);
        }
      } catch (lI1i1liI) {
        $.logErr(lI1i1liI, il1i1i);
      } finally {
        lii1I11();
      }
    });
  });
}
function drawPrize() {
  return new Promise(ii1II1i => {
    let lliiliII = {};
    $.post(taskPostUrl("api/prize/drawPrize", lliiliII), async (I1lI1l1I, I1lilIii, ilIiIIII) => {
      try {
        I1lI1l1I ? (console.log("" + JSON.stringify(I1lI1l1I)), console.log($.name + " drawPrize API请求失败，请检查网路重试")) : (ilIiIIII = JSON.parse(ilIiIIII), ilIiIIII && ilIiIIII.resp_code == 0 ? ($.drawNumber = ilIiIIII.data.drawNumber, $.prizeInfo = ilIiIIII.data.prizeInfo || []) : console.log(ilIiIIII), I1lilIii.status == 200 && refreshToken(I1lilIii));
      } catch (I1i11II) {
        $.logErr(I1i11II, I1lilIii);
      } finally {
        ii1II1i();
      }
    });
  });
}
function draw() {
  return new Promise(Il11liIl => {
    let lIlii1 = {
      "consumePoints": 0
    };
    $.post(taskPostUrl("api/prize/draw", lIlii1), async (lI11ll1I, II1iil1, iiiiiIl) => {
      try {
        if (lI11ll1I) {
          console.log("" + JSON.stringify(lI11ll1I));
          console.log($.name + " draw API请求失败，请检查网路重试");
        } else {
          iiiiiIl = JSON.parse(iiiiiIl);
          if (iiiiiIl && iiiiiIl.resp_code == 0) {
            if (iiiiiIl.data === "") console.log("💨 空气");else {
              if (iiiiiIl.data === "1") console.log("积分不足，无法抽奖");else {
                drawInfo = iiiiiIl.data;
                if (drawInfo) switch (drawInfo.prizeType) {
                  case 1:
                    console.log("🎉 " + drawInfo.prizeName + " 🐶");
                    break;
                  case 2:
                    console.log("🗑️ 优惠券");
                    break;
                  case 3:
                    generateId = iiiiiIl.data.prizeInfoId;
                    prizeName = drawInfo.prizeName;
                    console.log(iiiiiIl);
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    break;
                  case 4:
                  case 11:
                    console.log("🗑️ " + drawInfo.prizeName + " 🎟️");
                    break;
                  case 5:
                    console.log("🗑️ 专享价");
                    break;
                  case 6:
                    console.log("🎉 " + drawInfo.prizeName + " 🧧");
                    break;
                  case 8:
                    console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                    break;
                  case 7:
                  case 9:
                  case 10:
                  case 12:
                    console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                    break;
                  default:
                    console.log(drawInfo);
                    break;
                }
              }
            }
          } else {
            console.log(iiiiiIl);
            for (let lil1I11I of ["未开始", "结束", "不存在", "不在"]) {
              if (iiiiiIl.resp_msg.includes(lil1I11I)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          II1iil1.status == 200 && refreshToken(II1iil1);
        }
      } catch (I1iIiili) {
        $.logErr(I1iIiili, II1iil1);
      } finally {
        Il11liIl();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async Iill1iII => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let IIii1I1 = "";
    if ($.shopactivityId) IIii1I1 = ",\"activityId\":" + $.shopactivityId;
    const Ii1ll = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + IIii1I1 + ",\"channel\":406}",
      IIIIlI1I = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(Ii1ll)
      },
      I1I1III = await getH5st("8adfb", IIIIlI1I),
      liii1li = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + Ii1ll + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1I1III),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(liii1li, async (llIiIIli, liII11li, ill1lil1) => {
      try {
        ill1lil1 = ill1lil1 && ill1lil1.match(/jsonp_.*?\((.*?)\);/) && ill1lil1.match(/jsonp_.*?\((.*?)\);/)[1] || ill1lil1;
        let lIlliiI = $.toObj(ill1lil1, ill1lil1);
        if (lIlliiI && typeof lIlliiI == "object") {
          if (lIlliiI && lIlliiI.success === true) {
            console.log(lIlliiI.message);
            $.errorJoinShop = lIlliiI.message;
            if (lIlliiI.result && lIlliiI.result.giftInfo) for (let lIii1Ili of lIlliiI.result.giftInfo.giftList) {
              console.log("入会获得: " + lIii1Ili.discountString + lIii1Ili.prizeName + lIii1Ili.secondLineDesc);
            }
            console.log("");
          } else lIlliiI && typeof lIlliiI == "object" && lIlliiI.message ? ($.errorJoinShop = lIlliiI.message, console.log("" + (lIlliiI.message || ""))) : console.log(ill1lil1);
        } else console.log(ill1lil1);
      } catch (Ii1IIIi) {
        $.logErr(Ii1IIIi, liII11li);
      } finally {
        Iill1iII();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async iliIIII => {
    let lIIIl1li = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const IIIiiI11 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(lIIIl1li)
      },
      l1IlIiil = await getH5st("ef79a", IIIiiI11),
      ii1i11lI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + lIIIl1li + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l1IlIiil),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(ii1i11lI, async (Illl11, iIIiIlII, Il1Il11l) => {
      try {
        Il1Il11l = Il1Il11l && Il1Il11l.match(/jsonp_.*?\((.*?)\);/) && Il1Il11l.match(/jsonp_.*?\((.*?)\);/)[1] || Il1Il11l;
        let liI1lII1 = $.toObj(Il1Il11l, Il1Il11l);
        liI1lII1 && typeof liI1lII1 == "object" ? liI1lII1 && liI1lII1.success == true && (console.log("\n去加入店铺会员：" + (liI1lII1.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = liI1lII1.result.interestsRuleList && liI1lII1.result.interestsRuleList[0] && liI1lII1.result.interestsRuleList[0].interestsInfo && liI1lII1.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(Il1Il11l);
      } catch (l111IiIl) {
        $.logErr(l111IiIl, iIIiIlII);
      } finally {
        iliIIII();
      }
    });
  });
}
function taskPostUrl(il1iIl, iilI1lII) {
  return {
    "url": "" + domains + "/" + wxActType + "/" + il1iIl,
    "body": JSON.stringify(iilI1lII),
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/json;charset=UTF-8",
      "Referer": activityUrl,
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA,
      "token": $.tokens
    }
  };
}
function refreshToken(IIIiili) {
  if (IIIiili) {
    if (IIIiili.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let l111ilI1 of IIIiili.headers["set-cookie"]) {
        lz_cookie[l111ilI1.split(";")[0].substr(0, l111ilI1.split(";")[0].indexOf("="))] = l111ilI1.split(";")[0].substr(l111ilI1.split(";")[0].indexOf("=") + 1);
      }
      for (const il1l1iII of Object.keys(lz_cookie)) {
        cookie += il1l1iII + "=" + lz_cookie[il1l1iII] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getAuthorCodeList(ii1lIII1) {
  return new Promise(lll1ii1l => {
    const IiIllili = {
      "url": ii1lIII1 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(IiIllili, async (IlIilI1, i1llII1l, l11lII1) => {
      try {
        if (IlIilI1) {
          $.getAuthorCodeListerr = false;
        } else {
          if (l11lII1) l11lII1 = JSON.parse(l11lII1);
          $.getAuthorCodeListerr = true;
        }
      } catch (l1illl1i) {
        $.logErr(l1illl1i, i1llII1l);
        l11lII1 = null;
      } finally {
        lll1ii1l(l11lII1);
      }
    });
  });
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(liliII) {
  liliII = liliII || 32;
  let lilI1lII = "abcdef0123456789",
    IiII1ili = lilI1lII.length,
    llIi1lII = "";
  for (i = 0; i < liliII; i++) llIi1lII += lilI1lII.charAt(Math.floor(Math.random() * IiII1ili));
  return llIi1lII;
}
function getQueryString(I1I11I1l, Ii1lI1i) {
  let l111i1il = new RegExp("(^|[&?])" + Ii1lI1i + "=([^&]*)(&|$)"),
    I1iiiii = I1I11I1l.match(l111i1il);
  if (I1iiiii != null) return decodeURIComponent(I1iiiii[2]);
  return "";
}
function safeGet(ilIiIl1i) {
  if (!ilIiIl1i) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(ilIiIl1i) == "object") return true;
  } catch (ll1l111l) {
    return console.log(ll1l111l), false;
  }
}
function jsonParse(ilI1l1ll) {
  if (typeof ilI1l1ll == "string") try {
    return JSON.parse(ilI1l1ll);
  } catch (illilill) {
    return console.log(illilill), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function random(iI1iIlIl, l1Ii11ll) {
  return Math.floor(Math.random() * (l1Ii11ll - iI1iIlIl)) + iI1iIlIl;
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
