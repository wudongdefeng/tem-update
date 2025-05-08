/*
京东汽车抽奖

cron "55 11 * * *" script-path=jd_Jilong_draw.js, tag=京东汽车抽奖

*/
const $ = new Env('京东汽车抽奖')
const liIii = require("./jdCookie"),
      II1ll1 = require("./utils/Rebels_sendJDNotify"),
      IlI1Ii = require("./utils/Rebels_jdCommon"),
      {
  H5st: i11I1I
} = require("./utils/Rebels_H"),
      l1il1i = false;

let ll1 = "e7zLQiVe1HAgEmDiFhfugA",
    iI1llI = "";
const llliii = Object.keys(liIii).map(i11I11 => liIii[i11I11]).filter(l1llIl => l1llIl);
!llliii[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  II1ll1.config({
    "title": $.name
  });

  for (let liIll = 0; liIll < llliii.length; liIll++) {
    $.index = liIll + 1;
    iI1llI = llliii[liIll];
    IlI1Ii.setCookie(iI1llI);
    $.UserName = decodeURIComponent(IlI1Ii.getCookieValue(iI1llI, "pt_pin"));
    $.UA = IlI1Ii.genUA($.UserName);
    $.message = II1ll1.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
    await IllI11();
    IlI1Ii.unsetCookie();
    if ($.runEnd) break;
    await $.wait(1000);
  }

  l1il1i && II1ll1.getMessage() && (II1ll1.updateContent(II1ll1.content + "\n"), await II1ll1.push());
})().catch(iI1liI => $.logErr(iI1liI)).finally(() => $.done());

async function IllI11() {
  const llliiI = await IlI1Ii.getLoginStatus(iI1llI);

  if (!llliiI && typeof llliiI === "boolean") {
    console.log("账号无效");
    return;
  }

  try {
    $.Stop_Execution = false;
    $.Stop_Lottery = false;
    $.lotteryChances = 0;
    $.prize = [];
    await II1llI("superLeagueHome");

    if ($.NotLogin != 1) {
      if ($.index === 1 && $.prizeItems) {
        let lil11i = "";

        for (let IlIIl = 0; IlIIl < $.prizeItems.length; IlIIl++) {
          const lI1liI = $.prizeItems[IlIIl],
                i1i1Ii = lI1liI.prizeCode;
          lil11i += "  " + i1i1Ii + "\n";
        }

        console.log($.name + "活动奖品：\n" + lil11i);
      }

      $.apTaskList = "";
      await II1llI("apTaskList");
      let i1i1Il = false,
          I1lIl1 = $.apTaskList || [];

      for (let iI11Ii = 0; iI11Ii < I1lIl1.length; iI11Ii++) {
        $.taskTitle = I1lIl1[iI11Ii].taskTitle;
        $.apTaskListid = I1lIl1[iI11Ii].id;
        $.taskType = I1lIl1[iI11Ii].taskType;
        $.taskSourceUrl = I1lIl1[iI11Ii].taskSourceUrl;
        $.taskDoTimes = I1lIl1[iI11Ii].taskDoTimes;
        $.taskFinished = I1lIl1[iI11Ii].taskFinished;
        $.taskShowTitle = I1lIl1[iI11Ii].taskShowTitle;

        if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
          if ($.taskSourceUrl) for (let iIII1l = 0; iIII1l < 1; iIII1l++) {
            i1i1Il = true;
            console.log("去做 " + $.taskTitle);
            await II1llI("apsDoTask");
            await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
          } else for (let iI11Il = 0; iI11Il < 1; iI11Il++) {
            i1i1Il = true;
            console.log("去做 " + $.taskTitle);
            $.apTaskDetail = "";
            await II1llI("apTaskDetail");
            const iIII1i = $.apTaskDetail?.["taskItemList"] || [],
                  iil1i1 = $.apTaskDetail?.["status"]?.["finishNeed"];

            for (let il1i11 = 0; il1i11 < iil1i1; il1i11++) {
              const IlIII = iIII1i[il1i11];
              IlIII ? ($.taskSourceUrl = IlIII.itemId, $.taskInsert = IlIII.taskInsert, await II1llI("apsDoTask"), await $.wait(parseInt(Math.random() * 1500 + 1500, 10))) : console.log("任务失败，没有获取到任务ID");
            }
          }
        }
      }

      !i1i1Il && console.log("太厉害了，今日所有任务都已经完成！");

      if ($.lotteryChances > 0) {
        for (let IiI1I = 0; IiI1I < $.lotteryChances; IiI1I++) {
          await II1llI("superLeagueLottery");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }

        $.prize.length && console.log("\n抽奖获得: [" + $.prize.join(", ") + "]");
      }
    }
  } catch (IIIl1l) {
    console.log(IIIl1l.message);
  }
}

async function l1llIi(lllll, i11ili) {
  try {
    switch (lllll) {
      case "superLeagueHome":
        if (i11ili.code == 0) $.lotteryChances = i11ili?.["data"]?.["remainTimes"], $.prizeItems = i11ili?.["data"]?.["prizeItems"], $.NotLogin = i11ili?.["data"]?.["NotLogin"];else {
          if (i11ili.code == 402) console.log("进入首页失败," + (i11ili?.["errMsg"] || ""));else {
            console.log("进入首页失败," + (i11ili?.["errMsg"] || ""));
          }
        }
        break;

      case "superLeagueLottery":
        if (i11ili.code == 0) switch (i11ili?.["data"]?.["prizeType"]) {
          case 0:
            $.prize.push("空气");
            break;

          case 1:
            $.prize.push("" + i11ili?.["data"]?.["prizeDesc"]);
            break;

          case 2:
            $.prize.push(i11ili?.["data"]?.["amount"] + "红包");
            break;

          case 3:
            $.prize.push("" + i11ili?.["data"]?.["prizeConfigName"]);
            break;

          case 5:
            $.prize.push("实物：" + i11ili?.["data"]?.["prizeConfigName"]);
            break;

          case 22:
            $.prize.push("" + i11ili?.["data"]?.["prizeConfigName"]);
            break;

          case null:
            $.prize.push("空气");
            break;

          default:
            $.prize.push(i11ili?.["data"]?.["prizeType"] + "-" + i11ili?.["data"]?.["prizeConfigName"]);
            return;
        } else i11ili.code == 402 ? console.log("抽奖失败," + (i11ili?.["errMsg"] || "")) : (console.log("抽奖失败," + (i11ili?.["errMsg"] || "")), $.Stop_Lottery = true);
        break;

      case "apTaskList":
        if (i11ili.code == 0) $.apTaskList = i11ili?.["data"];else i11ili.code == 402 ? console.log("查询任务失败," + (i11ili?.["errMsg"] || "")) : console.log("查询任务失败," + (i11ili?.["errMsg"] || ""));
        break;

      case "apTaskDetail":
        if (i11ili.code == 0) {
          $.apTaskDetail = i11ili?.["data"];
        } else i11ili.code == 402 ? console.log("查询任务失败," + (i11ili?.["errMsg"] || "")) : console.log("查询任务失败," + (i11ili?.["errMsg"] || ""));

        break;

      case "apsDoTask":
        if (i11ili.code == 0) $.lotteryChances++, console.log("完成任务,抽奖次数：" + $.lotteryChances);else i11ili.code == 402 ? console.log("完成任务失败," + (i11ili?.["errMsg"] || "")) : console.log("完成任务失败," + (i11ili?.["errMsg"] || ""));
        break;
    }
  } catch (ilil1I) {
    console.log("❌ 未能正确处理 " + lllll + " 请求响应 " + (ilil1I.message || ilil1I));
  }
}

async function II1llI(i11il1) {
  if ($.runEnd) return;
  let lllilI = "",
      ilil11 = null,
      illlI1 = null,
      IIIl11 = "POST",
      I1lIi1 = {},
      liiIIi = {};

  switch (i11il1) {
    case "superLeagueHome":
      liiIIi = {
        "appId": "b7d17",
        "functionId": "superLeagueHome",
        "appid": "activities_platform",
        "clientVersion": "12.3.1",
        "client": "ios",
        "body": {
          "linkId": ll1,
          "taskId": "",
          "inviter": "",
          "inJdApp": true
        },
        "version": "4.3",
        "ua": $.UA,
        "t": true
      }, I1lIi1 = await i11I1I.getH5st(liiIIi), lllilI = "https://api.m.jd.com/client.action", ilil11 = I1lIi1.paramsData;
      break;

    case "superLeagueLottery":
      liiIIi = {
        "appId": "60dc4",
        "functionId": "superLeagueLottery",
        "appid": "activities_platform",
        "clientVersion": "12.3.1",
        "client": "ios",
        "body": {
          "linkId": ll1
        },
        "version": "4.3",
        "ua": $.UA,
        "t": true
      }, I1lIi1 = await i11I1I.getH5st(liiIIi), lllilI = "https://api.m.jd.com/client.action", ilil11 = I1lIi1.paramsData;
      break;

    case "apTaskList":
      liiIIi = {
        "appId": "c06b7",
        "functionId": "apTaskList",
        "appid": "activities_platform",
        "clientVersion": "12.3.1",
        "client": "ios",
        "body": {
          "linkId": ll1
        },
        "version": "4.3",
        "ua": $.UA,
        "t": true
      }, I1lIi1 = await i11I1I.getH5st(liiIIi), lllilI = "https://api.m.jd.com/client.action", ilil11 = I1lIi1.paramsData;
      break;

    case "apTaskDetail":
      liiIIi = {
        "appId": "ebecc",
        "functionId": "apTaskDetail",
        "appid": "activities_platform",
        "clientVersion": "12.3.1",
        "client": "ios",
        "body": {
          "taskType": $.taskType,
          "taskId": $.apTaskListid,
          "channel": 4,
          "checkVersion": true,
          "linkId": ll1
        },
        "version": "4.3",
        "ua": $.UA,
        "t": true
      }, I1lIi1 = await i11I1I.getH5st(liiIIi), lllilI = "https://api.m.jd.com/client.action", ilil11 = I1lIi1.paramsData;
      break;

    case "apsDoTask":
      liiIIi = {
        "appId": "54ed7",
        "functionId": "apsDoTask",
        "appid": "activities_platform",
        "clientVersion": "12.3.1",
        "client": "ios",
        "body": {
          "taskType": $.taskType,
          "taskId": $.apTaskListid,
          "channel": 4,
          "checkVersion": true,
          "linkId": ll1,
          "itemId": $.taskSourceUrl,
          "taskInsert": $.taskInsert
        },
        "version": "4.3",
        "ua": $.UA,
        "t": true
      }, I1lIi1 = await i11I1I.getH5st(liiIIi), lllilI = "https://api.m.jd.com/client.action", ilil11 = I1lIi1.paramsData;
      break;

    default:
      console.log("❌ 未知请求 " + i11il1);
      return;
  }

  const lil11I = {};
  ilil11 && (ilil11 = { ...ilil11,
    ...lil11I
  });
  illlI1 && (illlI1 = { ...illlI1,
    ...lil11I
  });
  const Iliii1 = {
    "url": lllilI,
    "method": IIIl11,
    "headers": {
      "origin": "https://prodev.m.jd.com",
      "Referer": "https://prodev.m.jd.com/mall/active/8x5pxEuycgqqztQHHdnH6WULxBZ/index.html",
      "User-Agent": $.UA,
      "Cookie": iI1llI,
      "content-type": "application/x-www-form-urlencoded",
      "accept": "application/json, text/plain, */*"
    },
    "params": illlI1,
    "data": ilil11,
    "timeout": 30000
  };
  IIIl11 === "GET" && (delete Iliii1.data, delete Iliii1.headers["Content-Type"]);
  const iIiIi = 1;
  let iil1ll = 0,
      iiilil = null,
      iil1li = false;

  while (iil1ll < iIiIi) {
    iil1ll > 0 && (await $.wait(1000));
    const lllI1l = await IlI1Ii.request(Iliii1);

    if (!lllI1l.success) {
      iiilil = "🚫 " + i11il1 + " 请求失败 ➜ " + lllI1l.error;
      iil1ll++;
      continue;
    }

    if (!lllI1l?.["data"]) {
      iiilil = "🚫 " + i11il1 + " 请求失败 ➜ 无响应数据";
      iil1ll++;
      continue;
    }

    l1llIi(i11il1, lllI1l.data);
    iil1li = false;
    break;
  }

  iil1ll >= iIiIi && (console.log(iiilil), iil1li && ($.outFlag = true, $.message && $.message.fix(iiilil)));
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
