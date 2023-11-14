/*
活动名称：邀请入会有礼（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=<10006/10070>&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
环境变量：jd_lzkj_loreal_invite_url // 活动链接
		 jd_lzkj_loreal_address // 用户登记收货地址，按照顺序依次填写 收件人@手机号@省份@城市@区县@详细地址，多个用管道符分开
         jd_lzkj_loreal_invite_myhelpnum // 自定义邀请人数

*/
let lnrun = 0;


const $ = new Env('邀请入会有礼（超级无线欧莱雅）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityUrl = process.env.jd_lzkj_loreal_invite_url,
  activityCookie = "";
$.activityEnd = false;
let myCode = null,
  myhelpnum = process.env.jd_lzkj_loreal_invite_myhelpnum || null,
  cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_invite_url) activityUrl = process.env.jd_lzkj_loreal_invite_url;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(i1Ii11Ii => {
    cookiesArr.push(jdCookieNode[i1Ii11Ii]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(l1ii1Ii1 => l1ii1Ii1.cookie)].filter(li11i11 => !!li11i11);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  activityType = getQueryString("" + activityUrl, "activityType");
  templateId = getQueryString("" + activityUrl, "templateId");
  if (activityUrl.includes("lorealjdcampaign-rc")) wxActType = "apps/interact";else {
    if (activityUrl.includes("lzkj")) wxActType = activityUrl.match(/\/(prod\/cc\/interact\w*)\//)[1];else {
      console.log("暂不支持的类型");
      return;
    }
  }
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
}
let domains = "https://" + $.domain;
!(async () => {
  if (!activityId) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  process.env.jd_lzkj_loreal_address ? UserAdd_Data_Arr = process.env.jd_lzkj_loreal_address : UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let iiI1lIIi = [];
    iiI1lIIi = UserAdd_Data_Arr.split("|");
    var l1iIilII = Math.floor(Math.random() * iiI1lIIi.length);
    if (iiI1lIIi[l1iIilII] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else iiI1lIIi = iiI1lIIi[l1iIilII];
    if (process.env.WX_ADDRESS) {
      iiI1lIIi = iiI1lIIi.split("@");
      if (iiI1lIIi.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let l1i1I1i1 = 0; l1i1I1i1 < 7; l1i1I1i1++) {
        if (iiI1lIIi[l1i1I1i1] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      iiI1lIIi = iiI1lIIi.split("@");
      if (iiI1lIIi.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let II1iIlIl = 0; II1iIlIl < 6; II1iIlIl++) {
        if (iiI1lIIi[II1iIlIl] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = iiI1lIIi[0];
    $.phone = iiI1lIIi[1];
    $.province = iiI1lIIi[2];
    $.city = iiI1lIIi[3];
    $.county = iiI1lIIi[4];
    $.address = iiI1lIIi[5];
  } else {
    console.log("请先定义环境变量 jd_lzkj_loreal_address 用于设置实物类奖品的用户收货地址信息\n变量格式：收件人@手机号@省份@城市@区县@详细地址，需按照顺序依次填写，多个用管道符分开");
    return;
  }
  console.log("活动入口：" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.authorCode = "";
  $.jplq = false;
  for (let ilIiIlII = 0; ilIiIlII < cookiesArr.length; ilIiIlII++) {
    if (cookiesArr[ilIiIlII]) {
      cookie = cookiesArr[ilIiIlII];
      originCookie = cookiesArr[ilIiIlII];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = ilIiIlII + 1;
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
      await lorealjdcampaign();
      await $.wait(1000);
      if (ilIiIlII == 0 && !$.shareUserId) break;
      if ($.hasEnd || $.activityEnd || $.outFlag) {
        break;
      }
    }
  }
  cookie = cookiesArr[0];
  if (cookie && $.jplq && !$.outFlag && !$.activityEnd) {
    $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.index = 1;
    message = "";
    $.bean = 0;
    $.nickName = "";
    await getUA();
    await acquire();
    await $.wait(1000);
  }
})().catch(l1l1lIi1 => {
  $.log("", " " + $.name + ", 失败! 原因: " + l1l1lIi1 + "!", "");
}).finally(() => {
  $.done();
});
async function lorealjdcampaign() {
  $.acquire = 0;
  $.shareUser = 0;
  $.shareUserNum = 0;
  $.token = "";
  $.Pin = "";
  $.helpok = false;
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.token) {
    if (activityType == 10006 || activityType == 10070) {
      $.authorCode = myCode ? myCode : "";
      if ($.index != 1) console.log("去助力 -> " + $.authorCode);
      await task("api/user-info/login", {
        "status": "0",
        "activityId": activityId,
        "tokenPin": $.token,
        "source": "01",
        "shareUserId": $.authorCode
      });
      await task("api/active/basicInfo", {
        "activityId": activityId
      });
      $.index === 1 && (await task("api/active/getRule", {}));
      let iIli1lil = new Date().valueOf();
      $.startTimeStr = new Date($.startTime).valueOf();
      $.endTimeStr = new Date($.endTime).valueOf();
      if ($.endTimeStr <= iIli1lil) {
        console.log("活动已经结束 ❌");
        $.activityEnd = true;
        return;
      }
      if ($.startTimeStr >= iIli1lil) {
        console.log("活动开始时间：" + new Date(parseInt($.startTime)).toLocaleString());
        $.activityEnd = true;
        return;
      }
      await $.wait(1000);
      await task("api/task/member/getMember", {
        "shareUserId": $.authorCode
      });
      if ($.index === 1) {
        await task("api/task/member/prizeList", {});
      }
      await getshopactivityId({
        "venderId": $.joinVenderId,
        "channel": "401"
      });
      if ($.openCardStatus === 0) {
        console.log("还不是店铺会员 👁‍🗨");
        $.errorJoinShop = "";
        await getshopactivityId();
        for (let llIiIIlI = 0; llIiIIlI < Array(2).length; llIiIIlI++) {
          if (llIiIIlI > 0) console.log("第" + llIiIIlI + "次 重新开卡");
          await joinShop();
          await $.wait(500);
          if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
            break;
          }
          $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && console.log("开卡失败❌ ，重新执行脚本");
        }
        await task("api/user-info/login", {
          "status": "0",
          "activityId": activityId,
          "tokenPin": $.token,
          "source": "01",
          "shareUserId": $.authorCode
        });
        await $.wait(1000);
        await task("api/task/bargain/guest/myself", {
          "shareUserId": $.authorCode
        });
        await $.wait(1000);
        await task("api/task/member/getMember", {
          "shareUserId": $.authorCode
        });
        await $.wait(1000);
        await task("api/join/check", {
          "status": "0"
        });
        $.index > 1 && $.errorJoinShop != "您的手机号已被其他账号绑定本店会员，请先登陆原账号解绑" && ($.helpok = true, console.log("助力成功 ✅\n"));
      } else console.log("已经是会员了");
      if ($.hasEnd || $.activityEnd || $.outFlag) return;
      if ($.index == 1) $.helpNum = $.shareUser;else $.helpok == true && $.helpNum++;
      let IiiIliI1 = parseInt($.days) - parseInt($.shareUserNum);
      $.authorhelpnum = myhelpnum ? myhelpnum : IiiIliI1;
      console.log("活动需助力人数 🤼‍ " + $.authorhelpnum);
      console.log("【账号" + $.index + "】已邀请人数：-> " + $.shareUser + ($.index != 1 && " 【账号1】已邀请人数：-> " + $.helpNum || ""));
      $.index === 1 && (await task("api/task/share/getUserId", {}), myCode = $.shareUserId, console.log("后面账号助力 🔜 " + myCode));
      $.helpNum >= $.authorhelpnum && (console.log("\n满足领取条件去领取 🍰 "), $.jplq = true, $.hasEnd = true);
    } else {
      console.log("暂不支持的类型 ❌");
      return;
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
async function acquire() {
  $.token = "";
  $.Pin = "";
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.token) {
    await task("api/user-info/login", {
      "status": "0",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": $.authorCode
    });
    await $.wait(1000);
    await task("api/task/member/getMember", {
      "shareUserId": $.authorCode
    });
    await $.wait(1000);
    await task("api/task/member/prizeList", {});
    await $.wait(2000);
    console.log("开始领取奖励");
    await lqprizeList("api/task/member/prizeList", {});
  } else $.log("没有成功获取到用户鉴权信息");
}
function lqprizeList(lIIl1Ii1, iilli1I1) {
  return new Promise(i1IIi1iI => {
    $.post(taskPostUrl(lIIl1Ii1, iilli1I1), async (IliIIl, IiII11l1, l11111I) => {
      try {
        if (IliIIl) {
          console.log("" + JSON.stringify(IliIIl));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          l11111I = JSON.parse(l11111I);
          if (l11111I && l11111I.data) {
            if ($.index === 1) {
              if (l11111I.data.prizeInfo) {
                for (const Ii1ll1lI of l11111I.data.prizeInfo) {
                  $.prizeInfoId = Ii1ll1lI.id;
                  $.days = Ii1ll1lI.days;
                  $.shareUser == Ii1ll1lI.days ? (console.log("奖品 🍰 " + Ii1ll1lI.prizeName), await task("api/prize/receive/acquire", {
                    "prizeInfoId": $.prizeInfoId
                  }), await $.wait(2000)) : $.log("没有匹配到合适的奖品领取 ❌");
                }
              }
            }
          } else console.log(l11111I);
          IiII11l1.status == 200 && refreshToken(IiII11l1);
        }
      } catch (IlII1l1I) {
        $.logErr(IlII1l1I, IiII11l1);
      } finally {
        i1IIi1iI();
      }
    });
  });
}
function task(I1Il1l1I, l1l1I1l) {
  return Object.assign(l1l1I1l), new Promise(ilill1Il => {
    $.post(taskPostUrl(I1Il1l1I, l1l1I1l), async (iiIiliI1, IllllilI, IlIli1I1) => {
      try {
        if (iiIiliI1) $.log(iiIiliI1);else {
          IllllilI.status == 200 && refreshToken(IllllilI);
          if (IlIli1I1) {
            IlIli1I1 = JSON.parse(IlIli1I1);
            if (IlIli1I1) {
              if (IlIli1I1.resp_code === 0) {
                switch (I1Il1l1I) {
                  case "api/user-info/login":
                    $.tokens = IlIli1I1.data.token;
                    $.joinVenderId = IlIli1I1.data.joinInfo.shopId;
                    break;
                  case "api/active/getRule":
                    $.rule = IlIli1I1.data;
                    break;
                  case "api/active/basicInfo":
                    $.startTime = IlIli1I1.data.startTime;
                    $.endTime = IlIli1I1.data.endTime;
                    $.shopName = IlIli1I1.data.shopName;
                    $.actName = IlIli1I1.data.actName;
                    break;
                  case "api/task/member/getMember":
                    ($.index === 1 || $.shareUserNum === 1) && (console.log("当前已邀请人数 -> " + IlIli1I1.data.shareUser), $.shareUser = IlIli1I1.data.shareUser);
                    break;
                  case "api/task/member/prizeList":
                    if ($.index === 1) {
                      if (IlIli1I1.data.prizeInfo) for (let il1iIIii of IlIli1I1.data.prizeInfo) {
                        console.log("  " + il1iIIii.prizeName + "，剩余" + il1iIIii.leftNum + "库存，需邀请" + il1iIIii.days + "人");
                        $.prizeInfoId = il1iIIii.id;
                        $.days = il1iIIii.days;
                      }
                    }
                    break;
                  case "api/task/bargain/guest/myself":
                    break;
                  case "api/join/check":
                    break;
                  case "api/prize/receive/acquire":
                    $.prizeType = IlIli1I1.data.prizeType;
                    $.addressId = IlIli1I1.data.addressId;
                    $.prizeType === 3 ? (await task("api/my/prize/update", {
                      "realName": $.receiver,
                      "mobile": $.phone,
                      "address": $.address,
                      "orderCode": $.addressId,
                      "province": $.province,
                      "city": $.city,
                      "county": $.county
                    }), console.log("获得奖励 🍰 " + IlIli1I1.data.prizeName)) : console.log("获得奖励 🍰 " + IlIli1I1.data.prizeName);
                    console.log(IlIli1I1);
                    break;
                  case "api/task/share/getUserId":
                    $.shareUserId = IlIli1I1.data.shareUserId;
                    break;
                  case "/apps/interact/api/my/prize/update":
                    console.log("地址填写成功 🍰 " + IlIli1I1.data);
                    break;
                  default:
                    break;
                }
              }
            }
          } else $.log("京东没有返回数据");
        }
      } catch (lIl1iIi) {
        $.log(lIl1iIi);
      } finally {
        ilill1Il();
      }
    });
  });
}
function showMsg() {
  return new Promise(iil1Ii1l => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    iil1Ii1l();
  });
}
function login(lliliII, I11iiI) {
  return new Promise(Il1iil1l => {
    $.post(taskPostUrl(lliliII, I11iiI), async (I11iii1I, l111111i, lllIii1l) => {
      try {
        if (I11iii1I) {
          console.log("" + JSON.stringify(I11iii1I));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          lllIii1l = JSON.parse(lllIii1l);
          if (lllIii1l && lllIii1l.data) {
            $.tokens = lllIii1l.data.token;
            $.customerId = lllIii1l.data.customerId;
            $.joinVenderId = lllIii1l.data.joinInfo.shopId;
            $.joinDes = lllIii1l.data.joinInfo.joinCodeInfo.joinDes;
            console.log($.joinDes);
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              await getshopactivityId();
              for (let l11llill = 0; l11llill < Array(2).length; l11llill++) {
                if (l11llill > 0) console.log("第" + l11llill + "次 重新开卡");
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && console.log("开卡失败❌ ，重新执行脚本");
              }
            }
          } else {
            console.log(lllIii1l);
          }
          if (l111111i.status == 200) {
            refreshToken(l111111i);
          }
        }
      } catch (iIiIIilI) {
        $.logErr(iIiIIilI, l111111i);
      } finally {
        Il1iil1l();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async liiil1ll => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lilIlIil = "";
    if ($.shopactivityId) lilIlIil = ",\"activityId\":" + $.shopactivityId;
    const I11iIii1 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lilIlIil + ",\"channel\":406}",
      iI1llll = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I11iIii1)
      },
      lliill1 = await getH5st("8adfb", iI1llll),
      li1iI111 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + I11iIii1 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(lliill1),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(li1iI111, async (l1il1Iil, ll1i11lI, I11Ilil) => {
      try {
        I11Ilil = I11Ilil && I11Ilil.match(/jsonp_.*?\((.*?)\);/) && I11Ilil.match(/jsonp_.*?\((.*?)\);/)[1] || I11Ilil;
        let l1i1lilI = $.toObj(I11Ilil, I11Ilil);
        if (l1i1lilI && typeof l1i1lilI == "object") {
          if (l1i1lilI && l1i1lilI.success === true) {
            console.log(l1i1lilI.message);
            $.errorJoinShop = l1i1lilI.message;
            if (l1i1lilI.result && l1i1lilI.result.giftInfo) for (let IliI1II of l1i1lilI.result.giftInfo.giftList) {
              console.log("入会获得: " + IliI1II.discountString + IliI1II.prizeName + IliI1II.secondLineDesc);
            }
            console.log("");
          } else l1i1lilI && typeof l1i1lilI == "object" && l1i1lilI.message ? ($.errorJoinShop = l1i1lilI.message, console.log("" + (l1i1lilI.message || ""))) : console.log(I11Ilil);
        } else console.log(I11Ilil);
      } catch (IIl1I11l) {
        $.logErr(IIl1I11l, ll1i11lI);
      } finally {
        liiil1ll();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async illIllil => {
    let I111 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const IilI1iii = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(I111)
      },
      il1iI1lI = await getH5st("ef79a", IilI1iii),
      l1iIIlI1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + I111 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(il1iI1lI),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l1iIIlI1, async (I1l11III, ilIIliiI, Ii1li1i) => {
      try {
        Ii1li1i = Ii1li1i && Ii1li1i.match(/jsonp_.*?\((.*?)\);/) && Ii1li1i.match(/jsonp_.*?\((.*?)\);/)[1] || Ii1li1i;
        let iIi1iiiI = $.toObj(Ii1li1i, Ii1li1i);
        iIi1iiiI && typeof iIi1iiiI == "object" ? iIi1iiiI && iIi1iiiI.success == true && ($.openCardStatus = iIi1iiiI.result.userInfo.openCardStatus, $.shopactivityId = iIi1iiiI.result.interestsRuleList && iIi1iiiI.result.interestsRuleList[0] && iIi1iiiI.result.interestsRuleList[0].interestsInfo && iIi1iiiI.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(Ii1li1i);
      } catch (liliii1l) {
        $.logErr(liliii1l, ilIIliiI);
      } finally {
        illIllil();
      }
    });
  });
}
function taskPostUrl(illl11II, I11ilIii) {
  return {
    "url": "" + domains + "/" + wxActType + "/" + illl11II,
    "body": JSON.stringify(I11ilIii),
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
function refreshToken(I1lIIi1) {
  if (I1lIIi1) {
    if (I1lIIi1.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let iIlllI1 of I1lIIi1.headers["set-cookie"]) {
        lz_cookie[iIlllI1.split(";")[0].substr(0, iIlllI1.split(";")[0].indexOf("="))] = iIlllI1.split(";")[0].substr(iIlllI1.split(";")[0].indexOf("=") + 1);
      }
      for (const Il11lIIi of Object.keys(lz_cookie)) {
        cookie += Il11lIIi + "=" + lz_cookie[Il11lIIi] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(IlllIlI1) {
  IlllIlI1 = IlllIlI1 || 32;
  let i11l1IlI = "abcdef0123456789",
    IIIIIIll = i11l1IlI.length,
    III1i1l = "";
  for (i = 0; i < IlllIlI1; i++) III1i1l += i11l1IlI.charAt(Math.floor(Math.random() * IIIIIIll));
  return III1i1l;
}
function getQueryString(iiiili, Iill1li1) {
  let II1li1l1 = new RegExp("(^|[&?])" + Iill1li1 + "=([^&]*)(&|$)"),
    i111IilI = iiiili.match(II1li1l1);
  if (i111IilI != null) {
    return decodeURIComponent(i111IilI[2]);
  }
  return "";
}
function safeGet(I111IIii) {
  if (!I111IIii) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(I111IIii) == "object") return true;
  } catch (ililliII) {
    return console.log(ililliII), false;
  }
}
function jsonParse(iIIl1IlI) {
  if (typeof iIIl1IlI == "string") {
    try {
      return JSON.parse(iIIl1IlI);
    } catch (iIIliI1i) {
      return console.log(iIIliI1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
