/*
活动名称：加购有礼 · 收藏大师
活动链接：https://txzj-isv.isvjcloud.com/cart_item/home?a=<活动id>
环境变量：jd_cart_item_activityUrl // 活动链接

*/
let lnrun = 0;


const $ = new Env('加购有礼（收藏大师）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getH5st = require('./function/getH5st3_0')
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_cart_item_activityUrl) activityUrl = process.env.jd_cart_item_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(il1i11l => {
    cookiesArr.push(jdCookieNode[il1i11l]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(lIiI1IiI => lIiI1IiI.cookie)].filter(lllllI => !!lllllI);
let isGetCookie = typeof $request !== "undefined";
isGetCookie && (GetCookie(), $.done());
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "a");
  $.domain = activityUrl.match(/https?:\/\/([^/]+)/)[1];
} else {
  console.log("请填写活动链接");
  return;
}
let domains = "https://" + $.domain;
!(async () => {
  if (!activityId) {
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
  for (let iiIIIIIi = 0; iiIIIIIi < cookiesArr.length; iiIIIIIi++) {
    if (cookiesArr[iiIIIIIi]) {
      cookie = cookiesArr[iiIIIIIi];
      originCookie = cookiesArr[iiIIIIIi];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = iiIIIIIi + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      lnrun++;if(lnrun == 7){console.log(`\n【访问接口次数达到6次，休息一分钟.....】\n`);await $.wait(120 * 1000);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      await getUA();
      await cart_item();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) {
        break;
      }
    }
  }
})().catch(i1ii1iIl => {
  $.log("", " " + $.name + ", 失败! 原因: " + i1ii1iIl + "!", "");
}).finally(() => {
  $.done();
});
async function cart_item() {
  $.errs = false;
  $.token = await getToken(originCookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if (activityId) {
    await jd_store_user_info();
    if ($.hasEnd === true) {
      return;
    }
    await cart_itemx();
    if ($.activityEnd) return;
    for (let l111I1i1 = 0; l111I1i1 < 20; l111I1i1++) {
      await receive_prize();
      if ($.getPrize || $.activityEnd || $.grabStop) break;
    }
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function jd_store_user_info() {
  return new Promise(i1Il111i => {
    let IIIliiI1 = "token=" + $.token;
    $.post(taskPostUrl("/front/jd_store_user_info", IIIliiI1), async (Il1lIlll, Ii1iiil1, llliIIiI) => {
      try {
        if (Il1lIlll) {
          console.log("" + JSON.stringify(Il1lIlll));
          console.log($.name + " jd_store_user_info API请求失败，请检查网路重试");
        } else {
          llliIIiI = JSON.parse(llliIIiI);
          if (llliIIiI && llliIIiI.code === "success") {} else {
            console.log("授权失败：" + llliIIiI.msg);
            $.hasEnd = true;
          }
          Ii1iiil1.status == 200 && refreshToken(Ii1iiil1);
        }
      } catch (IiIl1II1) {
        $.logErr(IiIl1II1, Ii1iiil1);
      } finally {
        i1Il111i();
      }
    });
  });
}
function receive_prize() {
  return new Promise(IiIlllll => {
    let lillill1 = "pid=" + activityId;
    $.post(taskPostUrl("/cart_item/receive_prize", lillill1), async (llil1iiI, i1IIIiii, l1Ill11l) => {
      try {
        if (llil1iiI) {
          console.log("" + JSON.stringify(llil1iiI));
          console.log($.name + " receive_prize API请求失败，请检查网路重试");
        } else {
          l1Ill11l = JSON.parse(l1Ill11l);
          if (l1Ill11l && l1Ill11l.code === "success") {
            $.getPrize = true;
            if (l1Ill11l.data.prize_info) switch (l1Ill11l.data.prize_info.type) {
              case "coupon":
                console.log("🗑️ 优惠券");
                break;
              case "bean":
                console.log("🎉 " + l1Ill11l.data.prize_info.prize_title + " 🐶");
                break;
              case "integral":
                console.log("🗑️ " + (l1Ill11l.data.prize_info.prize_title || l1Ill11l.data.prize_info.once_num) + " 🎟️");
                break;
              case "goods":
                console.log("🎉 实物" + l1Ill11l.data.prize_info.prize_name);
                break;
              default:
                console.log(l1Ill11l.msg);
                break;
            } else console.log(l1Ill11l.msg);
          } else {
            console.log("领取失败：" + l1Ill11l.msg);
            llil1iiI = l1Ill11l.msg;
            for (let IllII11i of ["不足", "部分会员", "已参加", "上限", "已领取", "未开始"]) {
              if (llil1iiI.includes(IllII11i)) {
                $.grabStop = true;
                break;
              }
            }
            for (let iI11i1 of ["num_end"]) {
              if (llil1iiI.includes(iI11i1)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (i1IIIiii.status == 200) {
            refreshToken(i1IIIiii);
          }
        }
      } catch (ii1I1ilI) {
        $.logErr(ii1I1ilI, i1IIIiii);
      } finally {
        IiIlllll();
      }
    });
  });
}
function cart_itemx() {
  return new Promise(IlIIiii1 => {
    const iI1iiIlI = {
      "url": domains + "/cart_item/home?a=" + activityId + "&token=" + $.token,
      "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Connection": "keep-alive",
        "Cookie": cookie,
        "Host": $.domain,
        "Referer": activityUrl,
        "User-Agent": $.UA
      }
    };
    $.get(iI1iiIlI, async (IliIi1II, l1lII, llIi1l1) => {
      try {
        if (IliIi1II) {
          console.log("" + JSON.stringify(IliIi1II));
          console.log($.name + " cart_itemz API请求失败，请检查网路重试");
        } else {
          llIi1l1 = llIi1l1;
          if (llIi1l1) {
            let Illiil11 = llIi1l1.match(/(活动已结束)/) && llIi1l1.match(/(活动已结束)/)[1] || llIi1l1.match(/(哎哟，当前活动尚未开始噢！)/) && llIi1l1.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            Illiil11 && ($.activityEnd = true, console.log("活动已结束或者未开始"));
          }
        }
      } catch (i1iI1iIl) {
        $.logErr(i1iI1iIl, l1lII);
      } finally {
        IlIIiii1();
      }
    });
  });
}
function getShopOpenCardInfo(IIIlI11I) {
  let lili1liI = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(IIIlI11I)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(lliII1lI => {
    $.get(lili1liI, (II1l1lli, lIIi111, liiii1II) => {
      try {
        if (II1l1lli) II1l1lli === "Response code 403 (Forbidden)" && ($.err = true, console.log(String(II1l1lli)));else {
          res = JSON.parse(liiii1II);
          res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId));
        }
      } catch (i1iI1l1) {
        console.log(i1iI1l1);
      } finally {
        lliII1lI();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async li1ll1li => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let il1I11li = "";
    if ($.shopactivityId) il1I11li = ",\"activityId\":" + $.shopactivityId;
    const llIIl11 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + il1I11li + ",\"channel\":406}",
      II11i1l = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(llIIl11)
      },
      illli1I = await getH5st("8adfb", II11i1l),
      iill11l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + llIIl11 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(illli1I),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(iill11l, async (iIl11iiI, ililiIlI, IIII11Ii) => {
      try {
        IIII11Ii = IIII11Ii && IIII11Ii.match(/jsonp_.*?\((.*?)\);/) && IIII11Ii.match(/jsonp_.*?\((.*?)\);/)[1] || IIII11Ii;
        let Ii1Ii1il = $.toObj(IIII11Ii, IIII11Ii);
        if (Ii1Ii1il && typeof Ii1Ii1il == "object") {
          if (Ii1Ii1il && Ii1Ii1il.success === true) {
            console.log(Ii1Ii1il.message);
            $.errorJoinShop = Ii1Ii1il.message;
            if (Ii1Ii1il.result && Ii1Ii1il.result.giftInfo) {
              for (let Illll1lI of Ii1Ii1il.result.giftInfo.giftList) {
                console.log("入会获得: " + Illll1lI.discountString + Illll1lI.prizeName + Illll1lI.secondLineDesc);
              }
            }
            console.log("");
          } else Ii1Ii1il && typeof Ii1Ii1il == "object" && Ii1Ii1il.message ? ($.errorJoinShop = Ii1Ii1il.message, console.log("" + (Ii1Ii1il.message || ""))) : console.log(IIII11Ii);
        } else console.log(IIII11Ii);
      } catch (IiI1IiI) {
        $.logErr(IiI1IiI, ililiIlI);
      } finally {
        li1ll1li();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async lIi11ii1 => {
    let l1i1I1l = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const IIiIllI1 = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(l1i1I1l)
      },
      I1liIi1i = await getH5st("ef79a", IIiIllI1),
      III11ilI = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + l1i1I1l + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(I1liIi1i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(III11ilI, async (Iili1ilI, l1IlIl1, lI1I1iIl) => {
      try {
        lI1I1iIl = lI1I1iIl && lI1I1iIl.match(/jsonp_.*?\((.*?)\);/) && lI1I1iIl.match(/jsonp_.*?\((.*?)\);/)[1] || lI1I1iIl;
        let iii1IlII = $.toObj(lI1I1iIl, lI1I1iIl);
        iii1IlII && typeof iii1IlII == "object" ? iii1IlII && iii1IlII.success == true && (console.log("\n去加入店铺会员：" + (iii1IlII.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = iii1IlII.result.interestsRuleList && iii1IlII.result.interestsRuleList[0] && iii1IlII.result.interestsRuleList[0].interestsInfo && iii1IlII.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(lI1I1iIl);
      } catch (II1li1II) {
        $.logErr(II1li1II, l1IlIl1);
      } finally {
        lIi11ii1();
      }
    });
  });
}
function getAuthorCodeList(ii1ilIii) {
  return new Promise(l1II1ll1 => {
    const ll1lii1i = {
      "url": ii1ilIii + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(ll1lii1i, async (ll1IliII, lIli11ii, IIiii1i) => {
      try {
        if (ll1IliII) {
          $.getAuthorCodeListerr = false;
        } else {
          if (IIiii1i) IIiii1i = JSON.parse(IIiii1i);
          $.getAuthorCodeListerr = true;
        }
      } catch (I11IiII) {
        $.logErr(I11IiII, lIli11ii);
        IIiii1i = null;
      } finally {
        l1II1ll1(IIiii1i);
      }
    });
  });
}
function taskPostUrl(lIIIlli, iilililI) {
  return {
    "url": "" + domains + lIIIlli,
    "body": iilililI,
    "headers": {
      "Accept": "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": cookie,
      "Host": $.domain,
      "Origin": domains,
      "Referer": activityUrl,
      "User-Agent": $.UA
    }
  };
}
function refreshToken(ililIlIi) {
  if (ililIlIi) {
    if (ililIlIi.headers["set-cookie"]) {
      cookie = "";
      for (let il1I1I1I of ililIlIi.headers["set-cookie"]) {
        lz_cookie[il1I1I1I.split(";")[0].substr(0, il1I1I1I.split(";")[0].indexOf("="))] = il1I1I1I.split(";")[0].substr(il1I1I1I.split(";")[0].indexOf("=") + 1);
      }
      for (const iiIIiIi of Object.keys(lz_cookie)) {
        cookie += iiIIiIi + "=" + lz_cookie[iiIIiIi] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(i1IiI1li) {
  i1IiI1li = i1IiI1li || 32;
  let lIiIi1lI = "abcdef0123456789",
    Ii11Iiil = lIiIi1lI.length,
    li11iIl = "";
  for (i = 0; i < i1IiI1li; i++) li11iIl += lIiIi1lI.charAt(Math.floor(Math.random() * Ii11Iiil));
  return li11iIl;
}
function safeGet(IIiI1iI) {
  if (!IIiI1iI) {
    return console.log("京东服务器返回数据为空"), false;
  }
  try {
    if (typeof JSON.parse(IIiI1iI) == "object") return true;
  } catch (iIIlIIIl) {
    return console.log(iIIlIIIl), false;
  }
}
function jsonParse(liI1illI) {
  if (typeof liI1illI == "string") try {
    return JSON.parse(liI1illI);
  } catch (il1l1iI1) {
    return console.log(il1l1iI1), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function getQueryString(i11iI1II, il1lI1i1) {
  let Iil1iiIi = new RegExp("(^|[&?])" + il1lI1i1 + "=([^&]*)(&|$)"),
    lll11li1 = i11iI1II.match(Iil1iiIi);
  if (lll11li1 != null) return decodeURIComponent(lll11li1[2]);
  return "";
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
