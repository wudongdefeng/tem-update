/*
取关（收藏的）店铺和商品
环境变量：JD_UNFOLLOW_PIN_FILTER_GOODS // 不取关商品收藏的账号（填入pin，多个用@分割）
          JD_UNFOLLOW_PIN_FILTER_SHOP // 不取关店铺关注的账号（填入pin，多个用@分割）

cron:15 0-23/12 * * *
============Quantumultx===============
[task_local]
#取关（收藏的）店铺和商品
15 0-23/12 * * * jd_unfollow.js, tag=取关（收藏的）店铺和商品, enabled=true

注：系统可能会存在无法被正常取关的异常商品或异常店铺

*/
let lnrun = 0;

const $ = new Env('取关店铺关注和商品')
const jdCookie = require("./jdCookie"),
      notify = require("./utils/Rebels_sendJDNotify"),
      common = require("./utils/Rebels_jdCommon"),
      {
  H5st
} = require("./utils/Rebels_H");

console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("JD_UNFOLLOW_PIN_FILTER_GOODS // 不取关商品收藏的账号（填入pin，多个用@分割");
console.log("JD_UNFOLLOW_PIN_FILTER_SHOP // 不取关店铺关注的账号（填入pin，多个用@分割");
console.log("==========" + $.name + "提示结束==========");
console.log("");
const pinFilterGoods = (process.env.JD_UNFOLLOW_PIN_FILTER_GOODS || "").split("@"),
      pinFilterShop = (process.env.JD_UNFOLLOW_PIN_FILTER_SHOP || "").split("@"),
      isNotify = false;
let cookie = "";
const cookiesArr = Object.keys(jdCookie).map(Iiili => jdCookie[Iiili]).filter(IilIli => IilIli);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  notify.config({
    "title": $.name
  });

  for (let l1il11 = 0; l1il11 < cookiesArr.length; l1il11++) {
    $.index = l1il11 + 1;
    cookie = cookiesArr[l1il11];
    common.setCookie(cookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
    await Main();
    common.unsetCookie();
    if ($.runEnd) break;
    await $.wait(2000);
  }

  isNotify && notify.getMessage() && (await notify.push());
})().catch(liI => $.logErr(liI)).finally(() => $.done());

async function Main() {
  const l11i1l = await common.getLoginStatus(cookie);

  if (!l11i1l && typeof l11i1l === "boolean") {
    console.log("账号无效");
    return;
  }

  try {
    if (pinFilterGoods.length > 0 && (pinFilterGoods.includes($.UserName) || pinFilterGoods.includes(encodeURIComponent($.UserName)))) console.log("已设置当前账号不取关商品收藏");else {
      $.totalNum = 0;
      $.followProductList = [];
      await sendRequest("queryFollowProduct");

      if ($.totalNum > 0) {
        console.log("已收藏" + $.totalNum + "件商品");
        $.message.insert("已收藏" + $.totalNum + "件商品");
        const l1il1l = Math.ceil($.totalNum / 30);

        for (let liIil = 0; liIil < l1il1l; liIil++) {
          await $.wait(1000);
          $.followProductList = $.followProductList.filter(IllI1I => IllI1I?.["commTitle"] && IllI1I?.["commId"] && IllI1I?.["commId"] !== "0");

          if ($.followProductList.length > 0) {
            const liIii = $.followProductList.map(II1ll1 => II1ll1.commId);
            console.log("去取关" + liIii.length + "件商品");
            $.commId = liIii.join(",");
            await sendRequest("delFollowProduct");
            await $.wait(2000);
          }

          $.followProductList = [];
          $.commId = "";
          await sendRequest("queryFollowProduct");
          await $.wait(5000);
        }
      } else console.log("没有收藏的商品"), $.message.insert("没有收藏的商品");
    }
    console.log("");
    if (pinFilterShop.length > 0 && (pinFilterShop.includes($.UserName) || pinFilterShop.includes(encodeURIComponent($.UserName)))) console.log("已设置当前账号不取关店铺关注");else {
      $.totalNum = 0;
      $.QueryShopFavListData = [];
      await sendRequest("QueryShopFavList");

      if ($.totalNum > 0) {
        console.log("已关注" + $.totalNum + "个店铺");
        $.message.insert("已关注" + $.totalNum + "个店铺");
        const ll1 = Math.ceil($.totalNum / 10);

        for (let iI1llI = 0; iI1llI < ll1; iI1llI++) {
          await $.wait(1000);
          $.QueryShopFavListData = $.QueryShopFavListData.filter(IllI11 => IllI11?.["shopName"] && IllI11?.["venderId"] && IllI11?.["shopId"] && IllI11?.["shopId"] !== "0");

          if ($.QueryShopFavListData.length > 0) {
            const l1llIi = $.QueryShopFavListData.map(II1llI => II1llI.shopId);
            console.log("去取关" + l1llIi.length + "个店铺");

            if (l1llIi.length <= 1) {
              $.shopId = l1llIi[0] || "";
              await sendRequest("DelShopFav");
            } else $.shopId = l1llIi.join(","), await sendRequest("batchunfollow");

            await $.wait(2000);
          }

          $.QueryShopFavListData = [];
          $.shopId = "";
          await sendRequest("QueryShopFavList");
          await $.wait(5000);
        }
      } else console.log("没有关注的店铺"), $.message.insert("没有关注的店铺");
    }
  } catch (ii1I1l) {
    console.log(ii1I1l.message);
  }
}

async function handleResponse(ii1I1i, llI) {
  try {
    switch (ii1I1i) {
      case "queryFollowProduct":
        llI.code === "0" ? ($.followProductList = llI.followProductList || [], $.totalNum = parseInt(llI?.["totalNum"] || 0)) : console.log("❌ 查询商品关注列表失败 => " + (llI?.["errMsg"] || JSON.stringify(llI)));
        break;

      case "delFollowProduct":
        llI.code === "0" ? (console.log("> 取关商品收藏成功"), $.message.insert("取关商品收藏成功")) : (console.log("> 取关商品收藏失败 => " + (llI?.["errMsg"] || JSON.stringify(llI))), $.message.insert("取关商品收藏失败"));
        break;

      case "QueryShopFavList":
        llI.iRet === "0" ? ($.QueryShopFavListData = llI.data || [], $.totalNum = parseInt(llI?.["totalNum"] || 0)) : console.log("❌ 查询店铺关注列表失败 => " + (llI?.["errMsg"] || JSON.stringify(llI)));
        break;

      case "DelShopFav":
      case "batchunfollow":
        llI.iRet === "0" ? (console.log("> 取关店铺关注成功"), $.message.insert("取关店铺关注成功")) : (console.log("> 取关店铺关注失败 => " + (llI?.["errMsg"] || JSON.stringify(llI))), $.message.insert("取关店铺关注失败"));
        break;
    }
  } catch (IiI11) {
    console.log("❌ 未能正确处理 " + ii1I1i + " 请求响应 " + (IiI11.message || IiI11));
  }
}

async function sendRequest(lli) {
  if ($.runEnd || $.outFlag) return;
  let lll = "",
      llli1 = null,
      iIli1i = null,
      iI1lii = "GET",
      IilIii = {},
      iI1lil = {};

  switch (lli) {
    case "queryFollowProduct":
      iI1lil = {
        "appId": "c420a",
        "functionId": "queryFollowProduct",
        "appid": "jd-cphdeveloper-m",
        "clientVersion": "1.0.0",
        "client": "H5",
        "body": {
          "cp": 1,
          "pageSize": 30,
          "category": "",
          "promote": 0,
          "cutPrice": 0,
          "coupon": 0,
          "stock": 0,
          "area": "1_72_2819_0",
          "tenantCode": "jgm",
          "bizModelCode": "6",
          "bizModeClientType": "M",
          "externalLoginType": "1"
        },
        "version": "4.3",
        "ua": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
        "t": true
      }, IilIii = await H5st.getH5st(iI1lil), lll = "https://api.m.jd.com/api", iIli1i = Object.assign({}, IilIii.paramsData, {
        "sceneval": "2",
        "g_login_type": "1",
        "g_ty": "ajax",
        "appCode": "ms0ca95114"
      });
      break;

    case "delFollowProduct":
      lll = "https://api.m.jd.com/api", llli1 = {
        "commId": $.commId,
        "tenantCode": "jgm",
        "bizModelCode": "6",
        "bizModeClientType": "M",
        "externalLoginType": "1"
      }, iIli1i = {
        "appid": "jd-cphdeveloper-m",
        "functionId": "delFollowProduct",
        "body": JSON.stringify(llli1),
        "loginType": "2",
        "sceneval": "2",
        "g_login_type": "1",
        "g_ty": "ajax",
        "appCode": "ms0ca95114"
      };
      break;

    case "QueryShopFavList":
      lll = "https://wq.jd.com/fav/shop/QueryShopFavList", iIli1i = {
        "cp": "1",
        "pageSize": "10",
        "_": Date.now(),
        "sceneval": "2",
        "g_login_type": "1",
        "appCode": "ms0ca95114",
        "callback": "jsonpCBKA",
        "g_ty": "ls"
      };
      break;

    case "DelShopFav":
      lll = "https://wq.jd.com/fav/shop/DelShopFav", iIli1i = {
        "shopId": $.shopId,
        "_": Date.now(),
        "sceneval": "2",
        "g_login_type": "1",
        "appCode": "ms0ca95114",
        "callback": "jsonpCBKG",
        "g_ty": "ls"
      };
      break;

    case "batchunfollow":
      lll = "https://wq.jd.com/fav/shop/batchunfollow", iIli1i = {
        "shopId": $.shopId,
        "_": Date.now(),
        "sceneval": "2",
        "g_login_type": "1",
        "appCode": "ms0ca95114",
        "callback": "jsonpCBKF",
        "g_ty": "ls"
      };
      break;

    default:
      console.log("❌ 未知请求 " + lli);
      return;
  }

  const l1lIi1 = {};
  llli1 && Object.assign(llli1, l1lIi1);
  iIli1i && Object.assign(iIli1i, l1lIi1);
  const iIli1l = {
    "url": lll,
    "method": iI1lii,
    "headers": {
      "Accept": ["queryFollowProduct", "delFollowProduct"].includes(lli) ? "application/json" : "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": cookie,
      "Origin": "https://wqs.jd.com",
      "Referer": "https://wqs.jd.com/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36"
    },
    "params": iIli1i,
    "data": llli1,
    "timeout": 30000
  };
  iI1lii === "GET" && (delete iIli1l.data, delete iIli1l.headers["Content-Type"]);
  const i1i1II = 1;
  let liiIIl = 0,
      iil1iI = null,
      IlIllI = false;

  while (liiIIl < i1i1II) {
    liiIIl > 0 && (await $.wait(1000));
    const IlIIl = await common.request(iIli1l);

    if (!IlIIl.success) {
      iil1iI = "🚫 " + lli + " 请求失败 ➜ " + IlIIl.error;
      liiIIl++;
      continue;
    }

    if (!IlIIl.data) {
      iil1iI = "🚫 " + lli + " 请求失败 ➜ 无响应数据";
      liiIIl++;
      continue;
    }

    await handleResponse(lli, IlIIl.data);
    IlIllI = false;
    break;
  }

  liiIIl >= i1i1II && (console.log(iil1iI), IlIllI && ($.outFlag = true, $.message && $.message.fix(iil1iI)));
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
