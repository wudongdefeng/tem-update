/*
* @Author: X1a0He
* @LastEditors: X1a0He
* @Description: 批量取关京东店铺和商品
* @Fixed: 不再支持Qx，仅支持Node.js
* @Updatetime: 2023/6/29
*/
let lnrun = 0;

const $ = new Env('批量取关店铺和商品');
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
const notify = $.isNode() ? require('./sendNotify') : '';
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
if($.isNode()){
   Object.keys(jdCookieNode).forEach((item) => {
       cookiesArr.push(jdCookieNode[item])
   })
   if(process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
} else {
   cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
let args_xh = {
   /*
    * 跳过某个指定账号，默认为全部账号清空
    * 填写规则：例如当前Cookie1为pt_key=key; pt_pin=pin1;则环境变量填写pin1即可，此时pin1的购物车将不会被清空
    * 若有更多，则按照pin1@pin2@pin3进行填写
    * 环境变量名称：XH_UNSUB_EXCEPT
    */
   except: process.env.XH_UNSUB_EXCEPT && process.env.XH_UNSUB_EXCEPT.split('@') || [],
   /*
    * 是否执行取消关注，默认true
    * 可通过环境变量控制：JD_UNSUB
    * */
   isRun: process.env.JD_UNSUB === 'true' || true,
   /*
    * 执行完毕是否进行通知，默认false
    * 可用环境变量控制：JD_UNSUB_NOTIFY
    * */
   isNotify: process.env.JD_UNSUB_NOTIFY === 'true' || false,
   /*
    * 每次获取已关注的商品数
    * 可设置环境变量：JD_UNSUB_GPAGESIZE，默认为20，不建议超过20
    * */
   goodPageSize: process.env.JD_UNSUB_GPAGESIZE * 1 || 20,
   /*
    * 每次获取已关注的店铺数
    * 可设置环境变量：JD_UNSUB_SPAGESIZE，默认为20，不建议超过20
    * */
   shopPageSize: process.env.JD_UNSUB_SPAGESIZE * 1 || 20,
   /*
    * 商品类过滤关键词，只要商品名内包含关键词，则不会被取消关注
    * 可设置环境变量：JD_UNSUB_GKEYWORDS，用@分隔
    * */
   goodsKeyWords: process.env.JD_UNSUB_GKEYWORDS && process.env.JD_UNSUB_GKEYWORDS.split('@') || [],
   /*
    * 店铺类过滤关键词，只要店铺名内包含关键词，则不会被取消关注
    * 可设置环境变量：JD_UNSUB_SKEYWORDS，用@分隔
    * */
   shopKeyWords: process.env.JD_UNSUB_SKEYWORDS && process.env.JD_UNSUB_SKEYWORDS.split('@') || [],
   /*
    * 间隔，防止提示操作频繁，单位毫秒(1秒 = 1000毫秒)
    * 可用环境变量控制：JD_UNSUB_INTERVAL，默认为3000毫秒
    * */
   unSubscribeInterval: process.env.JD_UNSUB_INTERVAL * 1 || 1000,
   /*
    * 是否打印日志
    * 可用环境变量控制：JD_UNSUB_PLOG，默认为true
    * */
   printLog: process.env.JD_UNSUB_PLOG === 'true' || true,
   /*
    * 失败次数，当取关商品或店铺时，如果连续 x 次失败，则结束本次取关，防止死循环
    * 可用环境变量控制：JD_UNSUB_FAILTIMES，默认为3次
    * */
   failTimes: process.env.JD_UNSUB_FAILTIMES || 3
}
const iII11I = process.env.JD_SIGN_KRAPI || "",
  IiIii1 = require("crypto-js"),
  l1lIIl = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/",
  i1lIi = require("./function/krgetSign");
!(async () => {
  if (args_xh.isRun) {
    !cookiesArr[0] && $.msg("【京东账号一】取关京东店铺商品失败", "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    await iilIiI();
    for (let IiIil1 = 0; IiIil1 < cookiesArr.length; IiIil1++) {
      if (cookiesArr[IiIil1]) {
        cookie = cookiesArr[IiIil1];
        $.ownCookie = cookiesArr[IiIil1];
        $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = IiIil1 + 1;
        $.isLogin = true;
        $.nickName = "";
        console.log("\n****开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*****\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
        if (args_xh.except.includes($.UserName)) {
          console.log("跳过账号：" + ($.nickName || $.UserName));
          continue;
        }
        if (!$.isLogin) {
          $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
            "open-url": "https://bean.m.jd.com/bean/signIndex.action"
          });
          $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
          continue;
        }
        I11l();
        $.shopsKeyWordsNum = 0;
        $.goodsKeyWordsNum = 0;
        $.unsubscribeGoodsNum = 0;
        $.unsubscribeShopsNum = 0;
        $.goodsTotalNum = 0;
        $.shopsTotalNum = 0;
        $.commIdList = "";
        $.shopIdList = "";
        $.endGoods = $.endShops = false;
        $.failTimes = 0;
        await lIlll1();
        await $.wait(args_xh.unSubscribeInterval);
        if (!$.endGoods && parseInt($.goodsTotalNum) !== parseInt($.goodsKeyWordsNum)) await Ili1i1();else console.log("不执行取消收藏商品\n");
        await $.wait(args_xh.unSubscribeInterval);
        await I1I11I();
        await $.wait(args_xh.unSubscribeInterval);
        if (!$.endShops && parseInt($.shopsTotalNum) !== parseInt($.shopsKeyWordsNum)) await iII11l();else console.log("不执行取消收藏店铺\n");
        do {
          if (parseInt($.goodsTotalNum) === 0 && parseInt($.shopsTotalNum) === 0) break;else {
            if (parseInt($.goodsTotalNum) !== 0) {
              if (parseInt($.goodsTotalNum) === parseInt($.goodsKeyWordsNum)) break;else {
                $.commIdList = "";
                await lIlll1();
                await $.wait(args_xh.unSubscribeInterval);
                if (!$.endGoods && parseInt($.goodsTotalNum) !== parseInt($.goodsKeyWordsNum)) await Ili1i1();else console.log("不执行取消收藏商品\n");
              }
            } else {
              if (parseInt($.shopsTotalNum) !== 0) {
                if (parseInt($.shopsTotalNum) === parseInt($.shopsKeyWordsNum)) break;else {
                  $.shopIdList = "";
                  await I1I11I();
                  await $.wait(args_xh.unSubscribeInterval);
                  if (!$.endShops && parseInt($.shopsTotalNum) !== parseInt($.shopsKeyWordsNum)) await iII11l();else console.log("不执行取消收藏店铺\n");
                }
              }
            }
          }
          if ($.failTimes >= args_xh.failTimes) {
            console.log("失败次数到达设定值，触发防死循环机制，该帐号已跳过");
            break;
          }
        } while (true);
        await III1li();
      }
    }
  }
})().catch(I1IlII => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + I1IlII + "!", "");
}).finally(() => {
  $.done();
});
function iilIiI() {
  return new Promise(III1l1 => {
    if ($.isNode() && process.env.JD_UNSUB) {
      console.log("=====环境变量配置如下=====");
      console.log("except: " + typeof args_xh.except + ", " + args_xh.except);
      console.log("isNotify: " + typeof args_xh.isNotify + ", " + args_xh.isNotify);
      console.log("goodPageSize: " + typeof args_xh.goodPageSize + ", " + args_xh.goodPageSize);
      console.log("shopPageSize: " + typeof args_xh.shopPageSize + ", " + args_xh.shopPageSize);
      console.log("goodsKeyWords: " + typeof args_xh.goodsKeyWords + ", " + args_xh.goodsKeyWords);
      console.log("shopKeyWords: " + typeof args_xh.shopKeyWords + ", " + args_xh.shopKeyWords);
      console.log("unSubscribeInterval: " + typeof args_xh.unSubscribeInterval + ", " + args_xh.unSubscribeInterval);
      console.log("printLog: " + typeof args_xh.printLog + ", " + args_xh.printLog);
      console.log("failTimes: " + typeof args_xh.failTimes + ", " + args_xh.failTimes);
      console.log("=======================");
    }
    III1l1();
  });
}
function III1li() {
  args_xh.isNotify ? $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n【还剩关注店铺】" + $.shopsTotalNum + "个\n【还剩关注商品】" + $.goodsTotalNum + "个") : $.log("【京东账号" + $.index + "】" + $.nickName + "\n【还剩关注店铺】" + $.shopsTotalNum + "个\n【还剩关注商品】" + $.goodsTotalNum + "个");
}
function Ili1iI(iIIlII, IlIi1l, IiIiiI) {
  let lIllii = iIIlII.indexOf(IlIi1l),
    l1il1 = iIIlII.indexOf(IiIiiI, lIllii);
  if (lIllii < 0 || l1il1 < lIllii) return "";
  return iIIlII.substring(lIllii + IlIi1l.length, l1il1);
}
async function lIlll1() {
  return new Promise(async lill1 => {
    console.log("正在获取已收藏的商品...");
    let Ill1il = "{\"origin\": \"2\",\"coordinate\": \"\",\"pagesize\": \"40\",\"page\": \"1\",\"sortType\": \"time_desc\"}";
    sign = await i1lIi("favoriteList", JSON.parse(Ill1il));
    iII11I ? $.signStr = sign?.["data"]?.["convertUrl"] || "" : $.signStr = sign?.["body"] || "";
    !$.signStr && console.log("接口获取失败，跳过");
    const IIlI = {
      "url": "https://api.m.jd.com/client.action?functionId=favoriteList",
      "body": "" + $.signStr,
      "headers": {
        "Cookie": cookie,
        "User-Agent": $.UA
      },
      "timeout": 10 * 1000
    };
    $.post(IIlI, async (IIil, IIii, i1Ii1I) => {
      try {
        if (IIil) {
          console.log(JSON.stringify(IIil));
          console.log($.name + " 接口请求失败，请检查网路重试");
        } else {
          i1Ii1I = JSON.parse(i1Ii1I);
          if (i1Ii1I.code === "0") {
            let l1iilI = i1Ii1I?.["favoriteList"]?.["map"](lilli => lilli.wareId) || [];
            if (l1iilI.length == "0") {}
            if (l1iilI.length) {
              if (await Ili1i1(l1iilI)) {
                await lIlll1();
              }
            } else console.log("商品收藏列表空的");
          } else {
            $.endGoods = true;
            console.log("无商品可取消收藏\n");
          }
        }
      } catch (i1Ii1l) {
        $.logErr(i1Ii1l, IIii);
      } finally {
        lill1(i1Ii1I);
      }
    });
  });
}
async function Ili1i1(IIll) {
  return new Promise(async i11Il => {
    console.log("正在取消收藏商品...");
    let iII1I = "{\"skus\": \"" + IIll.join(",") + "\"}";
    sign = await i1lIi("batchCancelFavorite", JSON.parse(iII1I));
    iII11I ? $.signStr = sign?.["data"]?.["convertUrl"] || "" : $.signStr = sign?.["body"] || "";
    !$.signStr && console.log("接口获取失败，跳过");
    const iilli1 = {
      "url": "https://api.m.jd.com/client.action?functionId=batchCancelFavorite",
      "body": "" + $.signStr,
      "headers": {
        "Cookie": cookie,
        "User-Agent": $.UA
      },
      "timeout": 10 * 1000
    };
    $.post(iilli1, (l1iI1I, ilI1i1, l1I1I) => {
      try {
        l1iI1I ? (console.log(JSON.stringify(l1iI1I)), console.log($.name + " 接口请求失败，请检查网路重试")) : (l1I1I = JSON.parse(l1I1I), l1I1I.code === "0" ? (console.log("成功取消关注" + IIll.length + "件商品\n"), $.failTimes = 0) : console.log("取消关注商品失败\n", l1I1I));
      } catch (i1i1iI) {
        $.logErr(i1i1iI, ilI1i1);
      } finally {
        i11Il(l1I1I);
      }
    });
  });
}
function I1I11I() {
  return new Promise(liiI => {
    console.log("正在获取已关注的店铺...");
    const I111il = {
      "url": "https://wq.jd.com/fav/shop/QueryShopFavList?cp=1&pageSize=" + args_xh.shopPageSize + "&sceneval=2&g_login_type=1&callback=jsonpCBKA",
      "headers": {
        "Cookie": cookie,
        "User-Agent": $.UA,
        "Referer": "https://wqs.jd.com/"
      },
      "timeout": 10 * 1000
    };
    $.get(I111il, (II1i1I, iIliI1, iIii11) => {
      try {
        if (II1i1I) {
          console.log(JSON.stringify(II1i1I));
          console.log($.name + " 接口请求失败，请检查网路重试");
        } else {
          if (iIii11.indexOf("Authorization") !== -1) {
            console.log("获取数据失败，401 Authorization Required，可能是User-Agent的问题");
            return;
          }
          iIii11 = JSON.parse(Ili1iI(iIii11, "try{jsonpCBKA(", ");}catch(e){}"));
          if (iIii11.iRet === "0") {
            $.shopsTotalNum = parseInt(iIii11.totalNum);
            console.log("当前已关注店铺：" + $.shopsTotalNum + "个");
            if (iIii11.data.length > 0) {
              $.shopsKeyWordsNum = 0;
              for (let I1liI1 of iIii11.data) {
                args_xh.shopKeyWords.some(I1ii11 => I1liI1.shopName.includes(I1ii11)) ? (args_xh.printLog ? console.log("店铺被过滤，含有关键词") : "", args_xh.printLog ? console.log(I1liI1.shopName + "\n") : "", $.shopsKeyWordsNum += 1) : ($.shopIdList += I1liI1.shopId + ",", $.unsubscribeShopsNum++);
              }
            } else {
              $.endShops = true;
              console.log("无店铺可取消关注\n");
            }
          } else console.log("获取已关注店铺失败：" + JSON.stringify(iIii11));
        }
      } catch (IlIil) {
        $.logErr(IlIil, iIliI1);
      } finally {
        liiI(iIii11);
      }
    });
  });
}
function iII11l() {
  return new Promise(lIl1i1 => {
    console.log("正在执行批量取消关注店铺...");
    const i11l1I = {
      "url": "https://wq.jd.com/fav/shop/batchunfollow?shopId=" + $.shopIdList + "&sceneval=2&g_login_type=1",
      "headers": {
        "Cookie": cookie,
        "User-Agent": $.UA,
        "Referer": "https://wqs.jd.com/"
      },
      "timeout": 10 * 1000
    };
    $.get(i11l1I, (iil1Il, IlIll, liil) => {
      try {
        if (iil1Il) {
          console.log(JSON.stringify(iil1Il));
          console.log($.name + " 接口请求失败，请检查网路重试");
        } else {
          if (liil.indexOf("Authorization") !== -1) {
            console.log("获取数据失败，401 Authorization Required，可能是User-Agent的问题");
            return;
          }
          liil = JSON.parse(liil);
          liil.iRet === "0" ? (console.log("已成功取消关注店铺：" + $.unsubscribeShopsNum + "个\n"), $.failTimes = 0) : console.log("批量取消关注店铺失败，失败次数：" + ++$.failTimes + "\n");
        }
      } catch (lIl1iI) {
        $.logErr(lIl1iI, IlIll);
      } finally {
        lIl1i1(liil);
      }
    });
  });
}
function i1IiI1(IIil11, iI11iI) {
  let liIIIi = {
      "fn": IIil11,
      "body": JSON.stringify(iI11iI)
    },
    iIilI = {
      "url": "http://api.kingran.ml/sign",
      "body": JSON.stringify(liIIIi),
      "headers": {
        "Content-Type": "application/json"
      },
      "timeout": 30000
    };
  return new Promise(async iliI11 => {
    $.post(iIilI, (ll111I, liIl1I, IIl111) => {
      try {
        if (ll111I) {} else {
          IIl111 = JSON.parse(IIl111);
          if (typeof IIl111 === "object" && IIl111 && IIl111.body) $.Signz = IIl111.body || "";else {}
        }
      } catch (l1Ill1) {
        $.logErr(l1Ill1, liIl1I);
      } finally {
        iliI11(IIl111);
      }
    });
  });
}
function l1lIII(lil1, illIII = "qwertyuiopasdfghjklzxcvbnm") {
  let ii1iIi = "";
  for (let i11III = 0; i11III < lil1; i11III++) {
    ii1iIi += illIII[Math.floor(Math.random() * illIII.length)];
  }
  return ii1iIi;
}
function iII11i(ii1iIl, Ill1l1 = {}) {
  let iIiiI = [],
    Ii111i = Ill1l1.connector || "&",
    l1iiiI = Object.keys(ii1iIl);
  if (Ill1l1.sort) l1iiiI = l1iiiI.sort();
  for (let lIi11 of l1iiiI) {
    let i11II1 = ii1iIl[lIi11];
    if (i11II1 && typeof i11II1 === "object") i11II1 = JSON.stringify(i11II1);
    if (i11II1 && Ill1l1.encode) i11II1 = encodeURIComponent(i11II1);
    iIiiI.push(lIi11 + "=" + i11II1);
  }
  return iIiiI.join(Ii111i);
}
function l1iI1i(Ilill1) {
  return Ilill1[Math.floor(Math.random() * Ilill1.length)];
}
function lIlllI(Il1ilI = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", iIliIl = "0123456789abcdef") {
  let iiilIi = "";
  for (let iI11ll of Il1ilI) {
    if (iI11ll == "x") iiilIi += iIliIl.charAt(Math.floor(Math.random() * iIliIl.length));else iI11ll == "X" ? iiilIi += iIliIl.charAt(Math.floor(Math.random() * iIliIl.length)).toUpperCase() : iiilIi += iI11ll;
  }
  return iiilIi;
}
function III1lI(liIl1l) {
  liIl1l = liIl1l.replace(/rn/g, "n");
  var lIi1I = "";
  for (var Ii1111 = 0; Ii1111 < liIl1l.length; Ii1111++) {
    var Ill1li = liIl1l.charCodeAt(Ii1111);
    if (Ill1li < 128) lIi1I += String.fromCharCode(Ill1li);else Ill1li > 127 && Ill1li < 2048 ? (lIi1I += String.fromCharCode(Ill1li >> 6 | 192), lIi1I += String.fromCharCode(Ill1li & 63 | 128)) : (lIi1I += String.fromCharCode(Ill1li >> 12 | 224), lIi1I += String.fromCharCode(Ill1li >> 6 & 63 | 128), lIi1I += String.fromCharCode(Ill1li & 63 | 128));
  }
  return lIi1I;
}
function I11i(liII11, I1II) {
  I1II = I1II || l1lIIl;
  var li11II = "";
  var I1IIIl, il1IlI, I1IIIi, lI11, li11I1, i1I111, l1li11;
  var il1Il1 = 0;
  liII11 = III1lI(liII11);
  while (il1Il1 < liII11.length) {
    I1IIIl = liII11.charCodeAt(il1Il1++);
    il1IlI = liII11.charCodeAt(il1Il1++);
    I1IIIi = liII11.charCodeAt(il1Il1++);
    lI11 = I1IIIl >> 2;
    li11I1 = (I1IIIl & 3) << 4 | il1IlI >> 4;
    i1I111 = (il1IlI & 15) << 2 | I1IIIi >> 6;
    l1li11 = I1IIIi & 63;
    if (isNaN(il1IlI)) i1I111 = l1li11 = 64;else isNaN(I1IIIi) && (l1li11 = 64);
    li11II = li11II + I1II.charAt(lI11) + I1II.charAt(li11I1) + I1II.charAt(i1I111) + I1II.charAt(l1li11);
  }
  while (li11II.length % 4 > 1) li11II += "=";
  return li11II;
}
function ll1IlI(lI1I = {}) {
  let I1Il = {
    "ciphertype": 5,
    "cipher": {
      "ud": I11i(IiIii1.SHA1($.UserName).toString()),
      "sv": I11i($.os_ver),
      "iad": ""
    },
    "ts": Date.now(),
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "version": "1.0.3",
    "appname": "com.360buy.jdmobile",
    "ridx": -1
  };
  $.ep = JSON.stringify(I1Il);
}
function I11l(il1Ill, il1Ili = {}) {
  const IIlIli = {
      "jd": {
        "app": "jdapp",
        "appBuild": "168392",
        "client": "android",
        "clientVersion": "10.1.0"
      },
      "lite": {
        "app": "jdltapp",
        "appBuild": "1247",
        "client": "ios",
        "clientVersion": "6.0.0"
      }
    },
    IIlIll = ["15.1.1", "14.5.1", "14.4", "14.3", "14.2", "14.1", "14.0.1", "13.2"];
  $.os_ver = l1iI1i(IIlIll);
  let l11liI = il1Ill || "jd",
    li11Ii = il1Ili?.["ep"] ? il1Ili?.["ep"] : true;
  if (!IIlIli[l11liI]) {
    console.log("获取[" + l11liI + "]UA失败");
    return;
  }
  $.client = il1Ili?.["client"] ? il1Ili?.["client"] : IIlIli[l11liI].client;
  $.clientVersion = il1Ili?.["clientVersion"] ? il1Ili?.["clientVersion"] : IIlIli[l11liI].clientVersion;
  $.sua = "iPhone; CPU iPhone OS " + $.os_ver.replace(".", "_") + " like Mac OS X";
  let lIiIII = "android";
  $.client == "apple" && (lIiIII = "iPhone");
  ll1IlI();
  let i1i = [IIlIli[l11liI].app, lIiIII, $.clientVersion, "", "rn/" + lIlllI(), "M/5.0", "hasUPPay/0", "pushNoticeIsOpen/0", "lang/zh_CN", "hasOCPay/0", "appBuild/" + IIlIli[l11liI].appBuild, "supportBestPay/0", "jdSupportDarkMode/0", "ef/1", li11Ii ? "ep/" + encodeURIComponent($.ep) : "", "Mozilla/5.0 (" + $.sua + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""];
  $.UA = i1i.join(";");
}
function Ili1l1() {
  return new Promise(async ll1IIi => {
    const ll1IIl = {
      "url": "https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2",
      "headers": {
        "Accept": "application/json,text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
        "User-Agent": $.UA
      }
    };
    $.post(ll1IIl, (l11lli, I1Il11, IlIiIl) => {
      try {
        if (l11lli) {
          console.log("" + JSON.stringify(l11lli));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (IlIiIl) {
            IlIiIl = JSON.parse(IlIiIl);
            if (IlIiIl.retcode === 13) {
              $.isLogin = false;
              return;
            }
            IlIiIl.retcode === 0 ? $.nickName = IlIiIl.base && IlIiIl.base.nickname || $.UserName : $.nickName = $.UserName;
          } else console.log("京东服务器返回空数据");
        }
      } catch (IIlIi1) {
        $.logErr(IIlIi1, I1Il11);
      } finally {
        ll1IIi();
      }
    });
  });
}
function iilIil(lI1i1I) {
  if (typeof lI1i1I == "string") {
    try {
      return JSON.parse(lI1i1I);
    } catch (lili11) {
      return console.log(lili11), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
