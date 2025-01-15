/*
摇京豆

定时随机


 */
let lnrun = 0;

const $ = new Env('摇京豆')
const jdCookie = require("./jdCookie"),
      notify = require("./utils/Rebels_sendJDNotify"),
      common = require("./utils/Rebels_jdCommon"),
      {
  H5st
} = require("./utils/Rebels_H"),
      RunTask = process.env.jd_daily_yjd_task === "true",
      isNotify = false,
      Origin = "https://spa.jd.com",
      Referer = "https://spa.jd.com/",
      sign_token = "f1d574ec-b1e9-43ba-aa84-b7a757f27f0e";

let cookie = "";
const cookiesArr = Object.keys(jdCookie).map(liiII1 => jdCookie[liiII1]).filter(IIIl1l => IIIl1l);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  notify.config({
    "title": $.name
  });

  for (let I1lIiI = 0; I1lIiI < cookiesArr.length; I1lIiI++) {
    $.index = I1lIiI + 1;
    cookie = cookiesArr[I1lIiI];
    common.setCookie(cookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
    $.eid = common.genRandomString(90, "ABCDEFGHIJKLMNOPQRSTUVWXYZ").toUpperCase();
    $.fp = common.genRandomString(32, "0123456789abcdef");
    await Main();
    common.unsetCookie();
    if ($.runEnd) break;
    await $.wait(5000);
  }

  isNotify && notify.getMessage() && (notify.updateContent(notify.content + "\n"), await notify.push());
})().catch(lllili => $.logErr(lllili)).finally(() => $.done());

async function Main() {
  const Ill11 = await common.getLoginStatus(cookie);

  if (!Ill11 && typeof Ill11 === "boolean") {
    console.log("账号无效");
    return;
  }

  try {
    $.Stop_Execution = false;
    $.Stop_Lottery = false;
    await get_shshshfpb();
    $.shshshfp = common.genRandomString(32, "0123456789abcdef");
    $.shshshfpa = common.genRandomString(8, "0123456789abcdef") + "-" + common.genRandomString(4, "0123456789abcdef") + "-" + common.genRandomString(4, "0123456789abcdef") + "-" + common.genRandomString(4, "0123456789abcdef") + "-" + common.genRandomString(12, "0123456789abcdef") + "-" + Date.now().toString().slice(0, 10);
    $.pg_channel_page_data = "";
    await sendRequest("pg_channel_page_data");

    if ($.pg_channel_page_data) {
      for (let lllI1i of $.pg_channel_page_data?.["floorInfoList"] || []) {
        lllI1i.code == "SIGN_ACT_INFO" && ($.item = lllI1i, await sendRequest("pg_interact_interface_invoke"));
      }
    }

    if (!$.Stop_Execution && RunTask) {
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
      $.vvipclub_lotteryTask = "";
      await sendRequest("vvipclub_lotteryTask");
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));

      if ($.vvipclub_lotteryTask) {
        for (let II1i1 of $.vvipclub_lotteryTask[0].taskItems || []) {
          II1i1.finish === false && ($.lotteryTaskid = II1i1?.["id"], $.lotteryTasktitle = II1i1?.["title"], await sendRequest("vvipclub_doTask"), await $.wait(parseInt(Math.random() * 1000 + 2000, 10)));
        }
      }

      $.remainLotteryTimes = 1;

      while ($.remainLotteryTimes-- > 0 && !$.Stop_Lottery) {
        await sendRequest("vvipclub_shaking_lottery");
        await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
      }
    }
  } catch (iil1lI) {
    console.log("❌ 脚本运行遇到了错误\n" + iil1lI);
  }
}

async function handleResponse(iiiliI, li1i1I) {
  try {
    switch (iiiliI) {
      case "pg_channel_page_data":
        if (li1i1I.success === true && li1i1I.data) $.pg_channel_page_data = li1i1I?.["data"];else li1i1I.message ? (console.log(li1i1I.message), (li1i1I.message == "未登录" || li1i1I.message == "风控用户") && ($.Stop_Execution = true)) : console.log("" + JSON.stringify(li1i1I));
        break;

      case "pg_interact_interface_invoke":
        if (li1i1I.success === true && li1i1I.data) {
          let lllI11 = [];

          for (let I1lIll of li1i1I?.["data"]?.["rewardVos"] || []) {
            I1lIll?.["jingBeanVo"]?.["beanNum"] && lllI11.push(I1lIll.jingBeanVo.beanNum + "京豆");
            I1lIll?.["drawInfoVo"]?.["drawNum"] && lllI11.push(I1lIll?.["drawInfoVo"]?.["drawNum"] + "次抽奖机会");
          }

          if (lllI11.length) {
            console.log("签到获得: " + lllI11.join(", "));
          } else console.log("签到获得: 空气");
        } else li1i1I.message ? (console.log(li1i1I.message), (li1i1I.message == "未登录" || li1i1I.message == "风控用户") && ($.Stop_Execution = true)) : console.log("" + JSON.stringify(li1i1I));

        break;

      case "vvipclub_lotteryTask":
        if (li1i1I.success === true && li1i1I.data) $.vvipclub_lotteryTask = li1i1I?.["data"];else li1i1I?.["message"] ? console.log(li1i1I?.["message"]) : console.log("" + JSON.stringify(li1i1I));
        break;

      case "vvipclub_doTask":
        if (li1i1I.success === true && li1i1I.data) $.lotteryTasknum = li1i1I?.["data"]?.["luckyBox"]?.["freeTimes"], console.log("完成任务[" + $.lotteryTasktitle + "]成功，有" + $.lotteryTasknum + "次抽奖机会");else li1i1I?.["message"] ? console.log(li1i1I?.["message"]) : console.log("" + JSON.stringify(li1i1I));
        break;

      case "vvipclub_shaking_lottery":
        if (li1i1I.success === true && li1i1I.data) {
          $.PrizeType = li1i1I?.["data"]?.["lotteryType"];
          $.remainLotteryTimes = li1i1I?.["data"]?.["remainLotteryTimes"];

          switch ($.PrizeType) {
            case 0:
            case 1:
              console.log(li1i1I?.["data"]);
              break;

            case 2:
              let i11ii1 = "抽中：" + li1i1I?.["data"]?.["couponInfo"]?.["limitStr"];
              console.log(i11ii1);
              break;

            case 3:
              console.log("抽中：空空如也");
              break;

            default:
              console.log("未知类型：（" + $.PrizeType + "）暂不受本脚本支持，请联系作者进行反馈！");
              break;
          }
        } else li1i1I?.["message"] ? (console.log(li1i1I?.["message"]), (li1i1I.message == "活动太火爆，请稍后再试" || li1i1I.message == "风控用户") && ($.Stop_Lottery = true)) : console.log("" + JSON.stringify(li1i1I));

        break;
    }
  } catch (iiill1) {
    console.log("❌ 未能正确处理 " + iiiliI + " 请求响应 " + (iiill1.message || iiill1));
  }
}

async function sendRequest(lIli1i) {
  if ($.runEnd) return;
  let I1lIlI = "https://api.m.jd.com/api?",
      ii1ill = null,
      II1iI = null,
      llI1II = "GET",
      lIli1l = {},
      lillIi = {};

  switch (lIli1i) {
    case "pg_channel_page_data":
      lillIi = {
        "appId": "28cc6",
        "functionId": "pg_channel_page_data",
        "appid": "sharkBean",
        "clientVersion": common.getLatestAppVersion(),
        "client": "ios",
        "body": {
          "paramData": {
            "token": "dd2fb032-9fa3-493b-8cd0-0d57cd51812d",
            "device": "APP"
          },
          "riskInformation": {
            "platform": 1,
            "pageClickKey": "",
            "eid": "",
            "fp": "",
            "shshshfp": $.shshshfp,
            "shshshfpa": $.shshshfpa,
            "shshshfpb": $.shshshfpb
          }
        },
        "version": "4.4",
        "t": true
      }, lIli1l = await H5st.getH5st(lillIi), II1iI = { ...lIli1l.paramsData
      };
      break;

    case "pg_interact_interface_invoke":
      lillIi = {
        "appId": "c04c9",
        "functionId": "pg_interact_interface_invoke",
        "appid": "sharkBean",
        "body": {
          "floorToken": $.item?.["token"] || sign_token,
          "dataSourceCode": "signIn",
          "argMap": {
            "currSignCursor": $.item?.["floorData"]?.["signActInfo"]?.["currSignCursor"] || 1
          },
          "riskInformation": {
            "platform": 1,
            "pageClickKey": "",
            "eid": "",
            "fp": "",
            "shshshfp": $.shshshfp,
            "shshshfpa": $.shshshfpa,
            "shshshfpb": $.shshshfpb
          }
        },
        "version": "4.4",
        "t": true
      }, lIli1l = await H5st.getH5st(lillIi), II1iI = { ...lIli1l.paramsData
      };
      break;

    case "vvipclub_lotteryTask":
      II1iI = {
        "appid": "vip_h5",
        "functionId": "vvipclub_lotteryTask",
        "body": JSON.stringify({
          "info": "browseTask",
          "withItem": true
        })
      };
      break;

    case "vvipclub_doTask":
      II1iI = {
        "appid": "vip_h5",
        "functionId": "vvipclub_doTask",
        "body": JSON.stringify({
          "taskName": "browseTask",
          "taskItemId": $.lotteryTaskid
        })
      };
      break;

    case "vvipclub_shaking_lottery":
      llI1II = "POST", lillIi = {
        "appId": "ae692",
        "functionId": "vvipclub_shaking_lottery",
        "appid": "sharkBean",
        "body": {
          "riskInformation": {
            "platform": 1,
            "pageClickKey": "",
            "eid": "",
            "fp": "",
            "shshshfp": $.shshshfp,
            "shshshfpa": $.shshshfpa,
            "shshshfpb": $.shshshfpb
          }
        },
        "version": "4.4",
        "t": true
      }, lIli1l = await H5st.getH5st(lillIi), II1iI = { ...lIli1l.paramsData
      };
      break;

    default:
      console.log("❌ 未知请求 " + lIli1i);
      return;
  }

  const illIi1 = {
    "url": I1lIlI,
    "method": llI1II,
    "headers": {
      "Origin": Origin,
      "Referer": Referer,
      "User-Agent": $.UA,
      "X-Requested-With": "XMLHttpRequest",
      "Cookie": cookie,
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "application/json, text/plain, */*"
    },
    "params": II1iI,
    "data": ii1ill,
    "timeout": 30000
  };
  llI1II === "GET" && (delete illIi1.data, delete illIi1.headers["Content-Type"]);
  const ii1ili = 1;
  let liil1i = 0,
      lI1lil = null,
      i1l1iI = false;

  while (liil1i < ii1ili) {
    liil1i > 0 && (await $.wait(1000));
    const iIIiiI = await common.request(illIi1);

    if (!iIIiiI.success) {
      lI1lil = "🚫 " + lIli1i + " 请求失败 ➜ " + iIIiiI.error;
      liil1i++;
      continue;
    }

    if (!iIIiiI?.["data"]) {
      lI1lil = "🚫 " + lIli1i + " 请求失败 ➜ 无响应数据";
      liil1i++;
      continue;
    }

    handleResponse(lIli1i, iIIiiI.data);
    i1l1iI = false;
    break;
  }

  liil1i >= ii1ili && (console.log(lI1lil), i1l1iI && ($.outFlag = true, $.message && $.message.fix(lI1lil)));
}

async function get_shshshfpb() {
  return new Promise(async i1i11i => {
    const Iil1lI = {
      "url": "https://blackhole.m.jd.com/getinfo",
      "headers": {
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Connection": "keep-alive",
        "User-Agent": "jdapp;android;12.0.0;;rn/cdb9e54b-a0e9-9ea8-cb7f-23e73fde3fd5;M/5.0;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;hasOCPay/0;appBuild/168069;supportBestPay/0;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22Y2HwEJKzYzS2YzOnZwOyCtS5D2DvDtZtDWZuZQPuCQHwDwU0ZJq0CK%3D%3D%22%2C%22sv%22%3A%22CJGkDK%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A1706806292122%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;",
        "X-Requested-With": "XMLHttpRequest",
        "Origin": "https://spa.jd.com",
        "Referer": "https://spa.jd.com/",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      "body": "'content={\"appname\":\"smashH5pv\",\"whwswswws\":\"\",\"jdkey\":\"\",\"body\":{}}'",
      "timeout": 20 * 1000
    };
    $.post(Iil1lI, async (IlllIl, II11lI, lI1IIi) => {
      try {
        IlllIl ? console.log("" + JSON.stringify(IlllIl)) : (lI1IIi = JSON.parse(lI1IIi), lI1IIi.code == 0 ? $.shshshfpb = lI1IIi?.["whwswswws"] : $.Noshshshfpb = true);
      } catch (Ilil1l) {
        $.logErr(Ilil1l, II11lI);
      } finally {
        i1i11i();
      }
    });
  });
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
