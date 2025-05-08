/*
活动名称：签到有礼 · 收藏大师
活动链接：https://txzj-isv.isvjcloud.com/sign_in/home?a=<活动id>
环境变量：jd_sign_in_activityUrl // 活动链接

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('签到有礼（收藏大师）')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const getToken = require('./function/getToken')

let lz_cookie = {},
  activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  if (process.env.jd_sign_in_activityUrl) activityUrl = process.env.jd_sign_in_activityUrl;
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) process.exit(0);
  Object.keys(jdCookieNode).forEach(i11ilii1 => {
    cookiesArr.push(jdCookieNode[i11ilii1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(IIll1l1I => IIll1l1I.cookie)].filter(II1iIIli => !!II1iIIli);
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
  for (let ii1 = 0; ii1 < cookiesArr.length; ii1++) {
    if (cookiesArr[ii1]) {
      cookie = cookiesArr[ii1];
      originCookie = cookiesArr[ii1];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = ii1 + 1;
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
      await sign_in();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd) break;
    }
  }
})().catch(IIi11I1i => {
  $.log("", " " + $.name + ", 失败! 原因: " + IIi11I1i + "!", "");
}).finally(() => {
  $.done();
});
async function sign_in() {
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
    await sign_inx();
    await receive_prize();
  } else console.log("【京东账号" + $.index + "】 未能获取活动信息");
}
function jd_store_user_info() {
  return new Promise(i1llII1l => {
    let II1ii1li = "token=" + $.token;
    $.post(taskPostUrl("/front/jd_store_user_info", II1ii1li), async (ii1I1lIi, l1il11il, Ii1i1l1) => {
      try {
        if (ii1I1lIi) {
          console.log("" + JSON.stringify(ii1I1lIi));
          console.log($.name + " jd_store_user_info API请求失败，请检查网路重试");
        } else {
          Ii1i1l1 = JSON.parse(Ii1i1l1);
          if (Ii1i1l1 && Ii1i1l1.code === "success") {} else {
            console.log("授权失败：" + Ii1i1l1.msg);
            $.hasEnd = true;
          }
          l1il11il.status == 200 && refreshToken(l1il11il);
        }
      } catch (I1Il11li) {
        $.logErr(I1Il11li, l1il11il);
      } finally {
        i1llII1l();
      }
    });
  });
}
function receive_prize() {
  return new Promise(iIl11il1 => {
    let lI1II11 = "pid=" + activityId;
    $.post(taskPostUrl("/sign_in/receive_prize", lI1II11), async (lIIl11Ii, llI1111i, I1IiIll) => {
      try {
        if (lIIl11Ii) {
          console.log("" + JSON.stringify(lIIl11Ii));
          console.log($.name + " receive_prize API请求失败，请检查网路重试");
        } else {
          I1IiIll = JSON.parse(I1IiIll);
          if (I1IiIll && I1IiIll.code === "success") {
            console.log("连续签到天数：" + I1IiIll.data.continuity + "  累计签到天数：" + I1IiIll.data.cumulative);
            if (I1IiIll.data.prize_title) switch (I1IiIll.data.prize_title.type) {
              case "coupon":
                console.log("🗑️ 优惠券");
                break;
              case "bean":
                console.log("🎉 " + I1IiIll.data.prize_title.prize_title + " 🐶");
                break;
              case "integral":
                console.log("🗑️ " + (I1IiIll.data.prize_title.prize_title || I1IiIll.data.prize_title.once_num) + " 🎟️");
                break;
              case "goods":
                console.log("🎉 实物" + I1IiIll.data.prize_title.prize_name);
                break;
              default:
                console.log(I1IiIll.msg);
                break;
            } else {
              console.log("类型：" + I1IiIll.data.prize_title.type);
            }
          } else {
            console.log("领取失败：" + I1IiIll.msg);
            lIIl11Ii = I1IiIll.msg;
            for (let IIllIIll of ["不足", "部分会员", "火爆", "上限", "已领取", "未开始"]) {
              if (lIIl11Ii.includes(IIllIIll)) {
                $.errs = true;
                break;
              }
            }
          }
          llI1111i.status == 200 && refreshToken(llI1111i);
        }
      } catch (l1l1lli1) {
        $.logErr(l1l1lli1, llI1111i);
      } finally {
        iIl11il1();
      }
    });
  });
}
function sign_inx() {
  return new Promise(l1ii1il1 => {
    const IiIilil = {
      "url": domains + "/sign_in/home?a=" + activityId + "&token=" + $.token,
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
    $.get(IiIilil, async (iii111I, il1llil, lI1l11Il) => {
      try {
        if (iii111I) {
          console.log("" + JSON.stringify(iii111I));
          console.log($.name + " sign_inz API请求失败，请检查网路重试");
        } else {
          lI1l11Il = lI1l11Il;
          if (lI1l11Il) {
            let ilI1i1i1 = lI1l11Il.match(/(活动已结束)/) && lI1l11Il.match(/(活动已结束)/)[1] || lI1l11Il.match(/(哎哟，当前活动尚未开始噢！)/) && lI1l11Il.match(/(哎哟，当前活动尚未开始噢！)/)[1] || "";
            ilI1i1i1 && ($.activityEnd = true, console.log("活动已结束或者未开始"));
          }
        }
      } catch (i1l1lIl) {
        $.logErr(i1l1lIl, il1llil);
      } finally {
        l1ii1il1();
      }
    });
  });
}
function getShopOpenCardInfo(Il1Ill11) {
  let I1llilIl = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(Il1Ill11)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
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
  return new Promise(l11iii11 => {
    $.get(I1llilIl, (ll1lIli, iili1ili, lil1liI) => {
      try {
        ll1lIli ? ll1lIli === "Response code 403 (Forbidden)" && ($.err = true, console.log(String(ll1lIli))) : (res = JSON.parse(lil1liI), res.success && ($.openCardStatus = res.result.userInfo.openCardStatus, res.result.interestsRuleList && ($.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId)));
      } catch (iill1i1i) {
        console.log(iill1i1i);
      } finally {
        l11iii11();
      }
    });
  });
}
function taskPostUrl(III1i11, lliIIll) {
  return {
    "url": "" + domains + III1i11,
    "body": lliIIll,
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
function refreshToken(li1iiiiI) {
  if (li1iiiiI) {
    if (li1iiiiI.headers["set-cookie"]) {
      cookie = "";
      for (let ililI1I of li1iiiiI.headers["set-cookie"]) {
        lz_cookie[ililI1I.split(";")[0].substr(0, ililI1I.split(";")[0].indexOf("="))] = ililI1I.split(";")[0].substr(ililI1I.split(";")[0].indexOf("=") + 1);
      }
      for (const II11I1i of Object.keys(lz_cookie)) {
        cookie += II11I1i + "=" + lz_cookie[II11I1i] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(Iil1Il11) {
  Iil1Il11 = Iil1Il11 || 32;
  let i11lliI = "abcdef0123456789",
    IiI1Ill = i11lliI.length,
    lI1lii11 = "";
  for (i = 0; i < Iil1Il11; i++) lI1lii11 += i11lliI.charAt(Math.floor(Math.random() * IiI1Ill));
  return lI1lii11;
}
function safeGet(li1iIIl1) {
  if (!li1iIIl1) return console.log("京东服务器返回数据为空"), false;
  try {
    if (typeof JSON.parse(li1iIIl1) == "object") return true;
  } catch (lIlil1ll) {
    return console.log(lIlil1ll), false;
  }
}
function jsonParse(llIiI1I1) {
  if (typeof llIiI1I1 == "string") try {
    return JSON.parse(llIiI1I1);
  } catch (Illli1ii) {
    return console.log(Illli1ii), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function getQueryString(IlIllIiI, illili11) {
  let i1IIIllI = new RegExp("(^|[&?])" + illili11 + "=([^&]*)(&|$)"),
    iIi1iil = IlIllIiI.match(i1IIIllI);
  if (iIi1iil != null) return decodeURIComponent(iIi1iil[2]);
  return "";
}
async function joinShop() {
  if (!$.joinVenderId) return;
  return new Promise(async IIII11il => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let lIllIIIi = "";
    if ($.shopactivityId) lIllIIIi = ",\"activityId\":" + $.shopactivityId;
    const IIliliI = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + lIllIIIi + ",\"channel\":406}",
      Ii11 = {
        "appid": "jd_shop_member",
        "functionId": "bindWithVender",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(IIliliI)
      },
      l11Ilil = await getH5st("8adfb", Ii11),
      ilIIi11l = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + IIliliI + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(l11Ilil),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(ilIIi11l, async (III1Ill, iIl11ll, IIillII1) => {
      try {
        IIillII1 = IIillII1 && IIillII1.match(/jsonp_.*?\((.*?)\);/) && IIillII1.match(/jsonp_.*?\((.*?)\);/)[1] || IIillII1;
        let IIil1l1 = $.toObj(IIillII1, IIillII1);
        if (IIil1l1 && typeof IIil1l1 == "object") {
          if (IIil1l1 && IIil1l1.success === true) {
            console.log(IIil1l1.message);
            $.errorJoinShop = IIil1l1.message;
            if (IIil1l1.result && IIil1l1.result.giftInfo) for (let IiliIi of IIil1l1.result.giftInfo.giftList) {
              console.log("入会获得: " + IiliIi.discountString + IiliIi.prizeName + IiliIi.secondLineDesc);
            }
            console.log("");
          } else IIil1l1 && typeof IIil1l1 == "object" && IIil1l1.message ? ($.errorJoinShop = IIil1l1.message, console.log("" + (IIil1l1.message || ""))) : console.log(IIillII1);
        } else console.log(IIillII1);
      } catch (li1i1Ill) {
        $.logErr(li1i1Ill, iIl11ll);
      } finally {
        IIII11il();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async ilill1Ii => {
    let ll1lli1i = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const I1iIl1li = {
        "appid": "jd_shop_member",
        "functionId": "getShopOpenCardInfo",
        "clientVersion": "9.2.0",
        "client": "H5",
        "body": JSON.parse(ll1lli1i)
      },
      IlIIl1i = await getH5st("ef79a", I1iIl1li),
      III1I1Il = {
        "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + ll1lli1i + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(IlIIl1i),
        "headers": {
          "accept": "*/*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
          "cookie": originCookie,
          "origin": "https://shopmember.m.jd.com/",
          "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
        }
      };
    $.get(III1I1Il, async (IiIllIII, ll11i1i1, llIilil1) => {
      try {
        llIilil1 = llIilil1 && llIilil1.match(/jsonp_.*?\((.*?)\);/) && llIilil1.match(/jsonp_.*?\((.*?)\);/)[1] || llIilil1;
        let l1i111iI = $.toObj(llIilil1, llIilil1);
        l1i111iI && typeof l1i111iI == "object" ? l1i111iI && l1i111iI.success == true && (console.log("\n去加入店铺会员：" + (l1i111iI.result.shopMemberCardInfo.venderCardName || "")), $.shopactivityId = l1i111iI.result.interestsRuleList && l1i111iI.result.interestsRuleList[0] && l1i111iI.result.interestsRuleList[0].interestsInfo && l1i111iI.result.interestsRuleList[0].interestsInfo.activityId || "") : console.log(llIilil1);
      } catch (lili1ii) {
        $.logErr(lili1ii, ll11i1i1);
      } finally {
        ilill1Ii();
      }
    });
  });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
