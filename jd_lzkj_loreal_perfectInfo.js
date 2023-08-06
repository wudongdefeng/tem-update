/*
活动名称：完善有礼（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10049&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
					https://lorealjdcampaign-rc.isvjcloud.com/interact/index?activityType=10049&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
					支持activityType ：(10049)
环境变量：jd_lzkj_loreal_perfectInfo_url // 活动链接

请使用本地IP环境 请使用本地IP环境 请使用本地IP环境

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#lzkj_loreal完善有礼
1 1 1 1 * jd_lzkj_loreal_perfectInfo.js, tag=lzkj_loreal完善有礼, enabled=true
*/


const $ = new Env("完善有礼（lzkj_loreal）");
const iIIIiI = $.isNode() ? require("./sendNotify") : "",
  li1iI = $.isNode() ? require("./jdCookie.js") : "",
  I1IIi1 = require("./function/krgetToken"),
  ll1lI1 = require("./function/krh5st"),
  II1ll = require("./function/krgetua");
let liii11 = {},
  lIiIii = process.env.jd_lzkj_loreal_perfectInfo_url,
  i1Ill = null,
  Il1I11 = "";
$.activityEnd = false;
let IIiI11 = [],
  Ii1Ill = "",
  ll1Iii = "";
if ($.isNode()) {
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(li1iI).forEach(IIiI1l => {
    IIiI11.push(li1iI[IIiI1l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else IIiI11 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(IIiI1i => IIiI1i.cookie)].filter(ilIllI => !!ilIllI);
let ll1Iil = typeof $request !== "undefined";
ll1Iil && (GetCookie(), $.done());
if (lIiIii) {
  i1Ill = iliiil("" + lIiIii, "activityId");
  activityType = iliiil("" + lIiIii, "activityType");
  templateId = iliiil("" + lIiIii, "templateId");
  if (lIiIii.includes("lorealjdcampaign-rc")) wxActType = "apps/interact";else lIiIii.includes("lzkj") ? wxActType = lIiIii.match(/\/(prod\/cc\/interact\w*)\//)[1] : console.log("暂不支持的类型");
  $.domain = lIiIii.match(/https?:\/\/([^/]+)/)[1];
}
let li1lI = "https://" + $.domain;
!(async () => {
  if (i1Ill == null) {
    console.log("活动id不存在");
    return;
  }
  console.log("活动入口:" + lIiIii);
  if (!IIiI11[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  if (process.env.jd_lzkj_loreal_address) {
    UserAdd_Data_Arr = process.env.jd_lzkj_loreal_address;
  } else UserAdd_Data_Arr = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "";
  if (UserAdd_Data_Arr && UserAdd_Data_Arr != "") {
    let illI1i = [];
    illI1i = UserAdd_Data_Arr.split("|");
    var Il1I1l = Math.floor(Math.random() * illI1i.length);
    if (illI1i[Il1I1l] == "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else illI1i = illI1i[Il1I1l];
    if (process.env.jd_lzkj_loreal_address) {
      illI1i = illI1i.split("@");
      if (illI1i.length != 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let l1ll1I = 0; l1ll1I < 6; l1ll1I++) {
        if (illI1i[l1ll1I] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      illI1i = illI1i.split("@");
      if (illI1i.length != 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (let l1ll11 = 0; l1ll11 < 7; l1ll11++) {
        if (illI1i[l1ll11] == "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.receiver = illI1i[0];
    $.phone = illI1i[1];
    $.province = illI1i[2];
    $.city = illI1i[3];
    $.county = illI1i[4];
    $.address = illI1i[5];
  }
  for (let I11I = 0; I11I < IIiI11.length; I11I++) {
    if (IIiI11[I11I]) {
      Ii1Ill = IIiI11[I11I];
      originCookie = IIiI11[I11I];
      $.UserName = decodeURIComponent(Ii1Ill.match(/pt_pin=(.+?);/) && Ii1Ill.match(/pt_pin=(.+?);/)[1]);
      $.index = I11I + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        if ($.isNode()) {
          await iIIIiI.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      $.UA = await II1ll($.UserName);
      await iliiiI();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd || $.outFlag) break;
    }
  }
})().catch(i1lII => {
  $.log("", " " + $.name + ", 失败! 原因: " + i1lII + "!", "");
}).finally(() => {
  $.done();
});
async function iliiiI() {
  $.acquire = 0;
  $.shareUser = 0;
  $.shareUserNum = 0;
  $.token = "";
  $.Pin = "";
  $.OpenCard = false;
  $.kraddInfo = false;
  $.token = await I1IIi1(Ii1Ill, li1lI);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.token) {
    await lIi11i("api/user-info/login", {
      "status": "1",
      "activityId": i1Ill,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    if ($.hasEnd || $.activityEnd || $.outFlag || $.OpenCard) return;
    await $.wait(300);
    await i1Iii();
    await lIi11i("api/user-info/login", {
      "status": "1",
      "activityId": i1Ill,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    await $.wait(300);
    await i1IlI();
    if ($.hasEnd || $.activityEnd || $.outFlag) return;
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function IIlIII(iIIlIl) {
  let iilIll = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(iIIlIl)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": Ii1Ill,
      "User-Agent": $.UA,
      "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.joinVenderId + "&channel=801&returnUrl=" + encodeURIComponent(lIiIii),
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(l1I1i1 => {
    $.get(iilIll, (IiIil1, i111l, lIiIlI) => {
      try {
        IiIil1 ? IiIil1 === "Response code 403 (Forbidden)" && ($.err = true, console.log(IiIil1)) : (res = JSON.parse(lIiIlI), res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId)));
      } catch (l1III) {
        console.log(l1III);
      } finally {
        l1I1i1();
      }
    });
  });
}
function i1Iil() {
  return new Promise(IiIiii => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + ll1Iii);
    IiIiii();
  });
}
function lIi11i(lIlliI, iIIlI1) {
  return new Promise(l1ilI => {
    $.post(ll1Il1(lIlliI, iIIlI1), async (IIi1, illl1i, l1iiii) => {
      try {
        if (IIi1) {
          console.log("" + JSON.stringify(IIi1));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          l1iiii = JSON.parse(l1iiii);
          if (l1iiii && l1iiii.data) {
            $.tokens = l1iiii.data.token;
            $.customerId = l1iiii.data.customerId;
            $.joinVenderId = l1iiii.data.joinInfo.shopId;
            $.shopId = l1iiii?.["data"]?.["joinInfo"]?.["shopId"];
            $.openCardUrl = l1iiii.data.joinInfo.openCardUrl;
            $.shopName = l1iiii.data.shopName;
            $.actName = l1iiii.data.actName;
            $.openCardUrl && ($.joinVenderId = l1iiii.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1]);
            $.joinDes = l1iiii.data.joinInfo.joinCodeInfo.joinDes;
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              await Il1I1I();
              for (let lill1 = 0; lill1 < Array(2).length; lill1++) {
                if (lill1 > 0) console.log("第" + lill1 + "次 重新开卡");
                await Ii1IlI();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) break;
                $.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1 && (console.log("开卡失败❌ ，重新执行脚本"), $.OpenCard = true);
              }
            }
          } else console.log(l1iiii);
          illl1i.status == 200 && li11li(illl1i);
        }
      } catch (I1i1I) {
        $.logErr(I1i1I, illl1i);
      } finally {
        l1ilI();
      }
    });
  });
}
function i1Iii() {
  return new Promise(iiIl => {
    let illIIl = {};
    $.post(ll1Il1("api/task/followShop/follow", illIIl), async (llIiIi, IIil, IIii) => {
      try {
        if (llIiIi) {
          console.log("" + JSON.stringify(llIiIi));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          IIii = JSON.parse(IIii);
          if (IIii && IIii.resp_code == 0) {} else {
            console.log(IIii.resp_msg);
            for (let iiiIii of ["未开始", "结束", "不存在", "不在"]) {
              if (IIii.resp_msg.includes(iiiIii)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          IIil.status == 200 && li11li(IIil);
        }
      } catch (l1iilI) {
        $.logErr(l1iilI, IIil);
      } finally {
        iiIl();
      }
    });
  });
}
function IIiI1I(iiII) {
  return new Promise(iilli1 => {
    let ilI1i1 = {
      "realName": $.receiver,
      "mobile": $.phone,
      "address": $.address,
      "orderCode": iiII,
      "province": $.province,
      "city": $.city,
      "county": $.county
    };
    $.post(ll1Il1("api/my/prize/update", ilI1i1), async (l1I1I, l1lII1, iilllI) => {
      try {
        if (l1I1I) {
          console.log("" + JSON.stringify(l1I1I));
          console.log($.name + " update API请求失败，请检查网路重试");
        } else {
          iilllI = JSON.parse(iilllI);
          if (iilllI && iilllI.resp_code == 0) console.log("地址填写成功");else {
            if (iilllI && iilllI.resp_code == 50013 || iilllI.resp_code == 50012) {} else {
              if (iilllI && iilllI.resp_code == 2) console.log("请在一个小时内填写");else {
                console.log(iilllI);
                for (let i11II of ["未开始", "结束", "不存在", "不在"]) {
                  if (iilllI.resp_msg.includes(i11II)) {
                    $.activityEnd = true;
                    break;
                  }
                }
              }
            }
          }
          l1lII1.status == 200 && li11li(l1lII1);
        }
      } catch (IlIi1) {
        $.logErr(IlIi1, l1lII1);
      } finally {
        iilli1();
      }
    });
  });
}
function lIi11l() {
  return new Promise(iliill => {
    let IlIl1 = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(ll1Il1("api/active/basicInfo", IlIl1), async (II1i1I, iIliI1, iIii11) => {
      try {
        if (II1i1I) {
          console.log("" + JSON.stringify(II1i1I));
          console.log($.name + " basicInfo API请求失败，请检查网路重试");
        } else {
          iIii11 = JSON.parse(iIii11);
          iIii11 && iIii11.resp_code == 0 ? ($.actName = iIii11.data.actName, $.shopName = iIii11.data.shopName) : console.log(iIii11);
          iIliI1.status == 200 && li11li(iIliI1);
        }
      } catch (II1i11) {
        $.logErr(II1i11, iIliI1);
      } finally {
        iliill();
      }
    });
  });
}
function i1IlI() {
  return new Promise(l1Ilil => {
    let iIili = {};
    $.post(ll1Il1("api/task/perfectInfo/activity", iIili), async (i11l1I, iil1Il, IlIll) => {
      try {
        if (i11l1I) {
          console.log("" + JSON.stringify(i11l1I));
          console.log($.name + " activity API请求失败，请检查网路重试");
        } else {
          IlIll = JSON.parse(IlIll);
          $.prizeName = IlIll.data.prizeName;
          $.prizeId = IlIll.data.prizeId;
          $.index == 1 && console.log("店铺名称：" + $.shopName + "\n活动名称: " + $.actName + "\n活动奖品：\n" + $.prizeName + "(" + $.prizeId + ")\n");
          if (IlIll && IlIll.resp_code == 0) {
            switch (IlIll?.["data"]?.["flag"]) {
              case "001":
                !$.kraddInfo && (await lIl1Il(IlIll?.["data"]?.["allInfo"]), await i1IlI());
                break;
              case "003":
                await lIl1Ii(IlIll?.["data"]?.["prizeId"]);
                break;
              case "002":
                console.log("已经领取过奖品");
                break;
              default:
                console.log("不能领取奖品: [" + IlIll.data.flag + "]");
                break;
            }
          } else console.log(IlIll);
          if (iil1Il.status == 200) {
            li11li(iil1Il);
          }
        }
      } catch (iliil1) {
        $.logErr(iliil1, iil1Il);
      } finally {
        l1Ilil();
      }
    });
  });
}
function lIl1Ii(i1i1ll) {
  return new Promise(I111iI => {
    let IIil1I = {
      "prizeInfoId": i1i1ll
    };
    $.post(ll1Il1("api/prize/receive/acquire", IIil1I), async (ll1111, liIl11, i11IIl) => {
      try {
        if (ll1111) {
          console.log("" + JSON.stringify(ll1111));
          console.log($.name + " acquire API请求失败，请检查网路重试");
        } else {
          i11IIl = JSON.parse(i11IIl);
          if (i11IIl && i11IIl.resp_code == 0) {
            if (i11IIl.data === "") console.log("💨  空气");else {
              if (i11IIl.data === "1") console.log("积分不足，无法抽奖");else {
                drawInfo = i11IIl.data;
                if (drawInfo) {
                  switch (drawInfo.prizeType) {
                    case 1:
                      console.log("🎉 " + drawInfo.prizeName + " 🐶");
                      break;
                    case 3:
                      generateId = i11IIl.data.prizeInfoId;
                      prizeName = drawInfo.prizeName;
                      addressId = drawInfo.addressId;
                      console.log("🎉 恭喜获得实物~");
                      console.log("奖品名称：" + prizeName);
                      process.env.jd_lzkj_loreal_address && (await IIiI1I(addressId), await $.wait(4000));
                      break;
                    case 4:
                    case 11:
                      console.log("🎉 " + drawInfo.prizeName + " 🎟️");
                      break;
                    case 2:
                      console.log("🎉 " + drawInfo.prizeName + " 优惠券");
                      break;
                    case 8:
                      console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                      break;
                    default:
                      console.log(i11IIl.data);
                      break;
                  }
                }
              }
            }
          } else {
            if (i11IIl && i11IIl.resp_code == 60002) console.log(i11IIl.resp_msg);else {
              console.log(i11IIl);
              for (let iIiil of ["未开始", "结束", "不存在", "不在"]) {
                if (i11IIl.resp_msg.includes(iIiil)) {
                  $.activityEnd = true;
                  break;
                }
              }
            }
          }
          liIl11.status == 200 && li11li(liIl11);
        }
      } catch (lilI) {
        $.logErr(lilI, liIl11);
      } finally {
        I111iI();
      }
    });
  });
}
function lIl1Il(iiilI1) {
  return new Promise(l1Illi => {
    $.phone = "150" + li1l1(10000000, 99999999);
    for (let iI11ll of iiilI1) {
      switch (iI11ll?.["num"]) {
        case "info01":
          iI11ll.content = "张麻子";
          break;
        case "info02":
          let liIl1i = 499342562000,
            liIl1l = 1035800162000,
            IIiII1 = liIl1l - liIl1i,
            lIi1I = liIl1i + Math.floor(Math.random() * IIiII1);
          iI11ll.content = $.time("yyyy年MM月dd日", lIi1I);
          break;
        case "info03":
          iI11ll.content = $.phone;
          break;
        case "info04":
          iI11ll.content = "男";
          break;
        case "info05":
          iI11ll.content = $.phone + "@qq.com";
          break;
        case "info06":
          iI11ll.content = "北京市北京市东城区";
          break;
        default:
          console.log(iI11ll?.["title"]);
          break;
      }
    }
    let Ii111I = {
      "perfectInfo": iiilI1
    };
    $.post(ll1Il1("api/task/perfectInfo/addInfo", Ii111I), async (Ii1111, Ill1li, Ililii) => {
      try {
        if (Ii1111) {
          console.log("" + JSON.stringify(Ii1111));
          console.log($.name + " addInfo API请求失败，请检查网路重试");
        } else {
          Ililii = JSON.parse(Ililii);
          if (Ililii && Ililii.resp_code == 0) {} else Ililii && Ililii.resp_code == 1000 ? (console.log(Ililii.resp_msg), $.kraddInfo = true) : console.log(Ililii);
          Ill1li.status == 200 && li11li(Ill1li);
        }
      } catch (I1ii1l) {
        $.logErr(I1ii1l, Ill1li);
      } finally {
        l1Illi();
      }
    });
  });
}
async function Ii1IlI() {
  if (!$.joinVenderId) return;
  return new Promise(async iIiIli => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let iIiIlI = "";
    if ($.shopactivityId) iIiIlI = ",\"activityId\":" + $.shopactivityId;
    const liII1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + iIiIlI + ",\"channel\":406}",
      iIiIil = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(liII1i)
      },
      iIiIii = await ll1lI1("8adfb", iIiIil),
      lI1i = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + liII1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(iIiIii),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Ii1Ill,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(lI1i, async (i11, Ii1llI, i1I11i) => {
      try {
        if (i11) {
          Ii1llI && typeof Ii1llI.statusCode != "undefined" && Ii1llI.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
        } else {
          i1I11i = i1I11i && i1I11i.match(/jsonp_.*?\((.*?)\);/) && i1I11i.match(/jsonp_.*?\((.*?)\);/)[1] || i1I11i;
          let I1Ii = $.toObj(i1I11i, i1I11i);
          if (I1Ii && typeof I1Ii == "object") {
            if (I1Ii && I1Ii.success === true) {
              console.log(" >> " + I1Ii.message);
              $.errorJoinShop = I1Ii.message;
              if (I1Ii.result && I1Ii.result.giftInfo) {
                for (let il1Ili of I1Ii.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + il1Ili.discountString + il1Ili.prizeName + il1Ili.secondLineDesc);
                }
              }
            } else I1Ii && typeof I1Ii == "object" && I1Ii.message ? ($.errorJoinShop = I1Ii.message, console.log("" + (I1Ii.message || ""))) : console.log(i1I11i);
          } else console.log(i1I11i);
        }
      } catch (l11liI) {
        $.logErr(l11liI, Ii1llI);
      } finally {
        iIiIli();
      }
    });
  });
}
async function Il1I1I() {
  return new Promise(async iIliI => {
    const ll1IIi = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}",
      IlIiI1 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ll1IIi)
      },
      ll1IIl = await ll1lI1("8adfb", IlIiI1),
      l11ll1 = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + ll1IIi + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(ll1IIl),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": Ii1Ill,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(l11ll1, async (iIlllI, iIli1, iIllii) => {
      try {
        if (iIlllI) iIli1 && typeof iIli1.statusCode != "undefined" && iIli1.statusCode == 403 && console.log("此ip已无法开卡，请更换IP后再执行脚本\n");else {
          iIllii = iIllii && iIllii.match(/jsonp_.*?\((.*?)\);/) && iIllii.match(/jsonp_.*?\((.*?)\);/)[1] || iIllii;
          let iIlliI = $.toObj(iIllii, iIllii);
          if (iIlliI && typeof iIlliI == "object") {
            if (iIlliI && iIlliI.success == true) {
              console.log("去加入：" + (iIlliI.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = iIlliI.result.interestsRuleList && iIlliI.result.interestsRuleList[0] && iIlliI.result.interestsRuleList[0].interestsInfo && iIlliI.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else console.log(iIllii);
        }
      } catch (l11lll) {
        $.logErr(l11lll, iIli1);
      } finally {
        iIliI();
      }
    });
  });
}
function ll1Il1(i1IIiI, lI1i1I) {
  return {
    "url": "" + li1lI + "/" + wxActType + "/" + i1IIiI,
    "body": JSON.stringify(lI1i1I),
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": li1lI,
      "Content-Type": "application/json;charset=UTF-8",
      "Referer": lIiIii,
      "Cookie": Ii1Ill + Il1I11 + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA,
      "token": $.tokens
    },
    "timeout": 15 * 1000
  };
}
function li11li(ii11i1) {
  if (ii11i1) {
    if (ii11i1.headers["set-cookie"]) {
      Ii1Ill = originCookie + ";";
      for (let l111Il of ii11i1.headers["set-cookie"]) {
        liii11[l111Il.split(";")[0].substr(0, l111Il.split(";")[0].indexOf("="))] = l111Il.split(";")[0].substr(l111Il.split(";")[0].indexOf("=") + 1);
      }
      for (const l1II1I of Object.keys(liii11)) {
        Ii1Ill += l1II1I + "=" + liii11[l1II1I] + ";";
      }
      Il1I11 = Ii1Ill;
    }
  }
}
function iliiii(iiii11) {
  return new Promise(ii11iI => {
    const i1IIl1 = {
      "url": iiii11 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(i1IIl1, async (I1IIl, i1iiIi, iiliII) => {
      try {
        if (I1IIl) $.getAuthorCodeListerr = false;else {
          if (iiliII) iiliII = JSON.parse(iiliII);
          $.getAuthorCodeListerr = true;
        }
      } catch (I11llI) {
        $.logErr(I11llI, i1iiIi);
        iiliII = null;
      } finally {
        ii11iI(iiliII);
      }
    });
  });
}
function IIlIIi(lIlIi1) {
  lIlIi1 = lIlIi1 || 32;
  let i1IIlI = "abcdef0123456789",
    ii11il = i1IIlI.length,
    il1lII = "";
  for (i = 0; i < lIlIi1; i++) il1lII += i1IIlI.charAt(Math.floor(Math.random() * ii11il));
  return il1lII;
}
function iliiil(lIlIiI, I11lli) {
  let I11lll = new RegExp("(^|[&?])" + I11lli + "=([^&]*)(&|$)"),
    I1l1I = lIlIiI.match(I11lll);
  if (I1l1I != null) return unescape(I1l1I[2]);
  return "";
}
function li11ll(i1IIll) {
  if (!i1IIll) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(i1IIll) == "object") return true;
  } catch (ilI1i) {
    return console.log(ilI1i), false;
  }
}
function i1Il1(ii11li) {
  if (typeof ii11li == "string") {
    try {
      return JSON.parse(ii11li);
    } catch (lIl11l) {
      return console.log(lIl11l), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function li1l1(iiii1l, lI11I) {
  return Math.floor(Math.random() * (lI11I - iiii1l)) + iiii1l;
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }