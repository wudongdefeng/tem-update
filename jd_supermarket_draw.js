/*
超市卡抽奖

cron "55 12 * * *" script-path=jd_Jilong_draw.js, tag=超市卡抽奖

*/
const $ = new Env('超市卡抽奖')
const liIii = require("./jdCookie"),
      II1ll1 = require("./utils/Rebels_sendJDNotify"),
      IlI1Ii = require("./utils/Rebels_jdCommon"),
      {
  H5st: i11I1I
} = require("./utils/Rebels_H"),
      l1il1i = false;

let ll1 = "mS2PkOqrtmfneDMmhJ3dbQ",
    iI1llI = "";
const llliii = Object.keys(liIii).map(i11I11 => liIii[i11I11]).filter(l1llIl => l1llIl);
!llliii[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  II1ll1.config({
    "title": $.name
  });

  for (let l1lIiI = 0; l1lIiI < llliii.length; l1lIiI++) {
    $.index = l1lIiI + 1;
    iI1llI = llliii[l1lIiI];
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
})().catch(llliiI => $.logErr(llliiI)).finally(() => $.done());

async function IllI11() {
  const i1i1I1 = await IlI1Ii.getLoginStatus(iI1llI);

  if (!i1i1I1 && typeof i1i1I1 === "boolean") {
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
        let IlIII = "";

        for (let ilil1l = 0; ilil1l < $.prizeItems.length; ilil1l++) {
          const illlIi = $.prizeItems[ilil1l],
                I1lIii = illlIi.prizeCode;
          IlIII += "  " + I1lIii + "\n";
        }

        console.log($.name + "活动奖品：\n" + IlIII);
      }

      $.apTaskList = "";
      await II1llI("apTaskList");
      let il1i11 = false,
          IlIll1 = $.apTaskList || [];

      for (let IiI1I = 0; IiI1I < IlIll1.length; IiI1I++) {
        $.taskTitle = IlIll1[IiI1I].taskTitle;
        $.apTaskListid = IlIll1[IiI1I].id;
        $.taskType = IlIll1[IiI1I].taskType;
        $.taskSourceUrl = IlIll1[IiI1I].taskSourceUrl;
        $.taskDoTimes = IlIll1[IiI1I].taskDoTimes;
        $.taskFinished = IlIll1[IiI1I].taskFinished;
        $.taskShowTitle = IlIll1[IiI1I].taskShowTitle;

        if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
          if ($.taskSourceUrl) for (let illlIl = 0; illlIl < 1; illlIl++) {
            il1i11 = true;
            console.log("去做 " + $.taskTitle);
            await II1llI("apsDoTask");
            await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
          } else {
            for (let liiII1 = 0; liiII1 < 1; liiII1++) {
              il1i11 = true;
              console.log("去做 " + $.taskTitle);
              $.apTaskDetail = "";
              await II1llI("apTaskDetail");
              const lllll = $.apTaskDetail?.["taskItemList"] || [],
                    i11ili = $.apTaskDetail?.["status"]?.["finishNeed"];

              for (let iil1l1 = 0; iil1l1 < i11ili; iil1l1++) {
                const lllli = lllll[iil1l1];
                if (lllli) $.taskSourceUrl = lllli.itemId, $.taskInsert = lllli.taskInsert, await II1llI("apsDoTask"), await $.wait(parseInt(Math.random() * 1500 + 1500, 10));else {
                  console.log("任务失败，没有获取到任务ID");
                }
              }
            }
          }
        }
      }

      !il1i11 && console.log("太厉害了，今日所有任务都已经完成！");

      if ($.lotteryChances > 0) {
        for (let I1lIiI = 0; I1lIiI < $.lotteryChances; I1lIiI++) {
          await II1llI("superLeagueLottery");
          await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
        }

        $.prize.length && console.log("\n抽奖获得: [" + $.prize.join(", ") + "]");
      }
    }
  } catch (Ill11) {
    console.log(Ill11.message);
  }
}

async function l1llIi(liiIII, li1i11) {
  try {
    switch (liiIII) {
      case "superLeagueHome":
        if (li1i11.code == 0) $.lotteryChances = li1i11?.["data"]?.["remainTimes"], $.prizeItems = li1i11?.["data"]?.["prizeItems"], $.NotLogin = li1i11?.["data"]?.["NotLogin"];else li1i11.code == 402 ? console.log("进入首页失败," + (li1i11?.["errMsg"] || "")) : console.log("进入首页失败," + (li1i11?.["errMsg"] || ""));
        break;

      case "superLeagueLottery":
        if (li1i11.code == 0) switch (li1i11?.["data"]?.["prizeType"]) {
          case 0:
            $.prize.push("空气");
            break;

          case 1:
            $.prize.push("" + li1i11?.["data"]?.["prizeDesc"]);
            break;

          case 2:
            $.prize.push(li1i11?.["data"]?.["amount"] + "红包");
            break;

          case 3:
            $.prize.push("" + li1i11?.["data"]?.["prizeConfigName"]);
            break;

          case 5:
            $.prize.push("实物：" + li1i11?.["data"]?.["prizeConfigName"]);
            break;

          case 22:
            $.prize.push("" + li1i11?.["data"]?.["prizeConfigName"]);
            break;

          case null:
            $.prize.push("空气");
            break;

          default:
            $.prize.push(li1i11?.["data"]?.["prizeType"] + "-" + li1i11?.["data"]?.["prizeConfigName"]);
            return;
        } else li1i11.code == 402 ? console.log("抽奖失败," + (li1i11?.["errMsg"] || "")) : (console.log("抽奖失败," + (li1i11?.["errMsg"] || "")), $.Stop_Lottery = true);
        break;

      case "apTaskList":
        if (li1i11.code == 0) $.apTaskList = li1i11?.["data"];else li1i11.code == 402 ? console.log("查询任务失败," + (li1i11?.["errMsg"] || "")) : console.log("查询任务失败," + (li1i11?.["errMsg"] || ""));
        break;

      case "apTaskDetail":
        if (li1i11.code == 0) $.apTaskDetail = li1i11?.["data"];else li1i11.code == 402 ? console.log("查询任务失败," + (li1i11?.["errMsg"] || "")) : console.log("查询任务失败," + (li1i11?.["errMsg"] || ""));
        break;

      case "apsDoTask":
        if (li1i11.code == 0) $.lotteryChances++, console.log("完成任务,抽奖次数：" + $.lotteryChances);else li1i11.code == 402 ? console.log("完成任务失败," + (li1i11?.["errMsg"] || "")) : console.log("完成任务失败," + (li1i11?.["errMsg"] || ""));
        break;
    }
  } catch (iIiIl) {
    console.log("❌ 未能正确处理 " + liiIII + " 请求响应 " + (iIiIl.message || iIiIl));
  }
}

async function II1llI(iiilii) {
  if ($.runEnd) return;
  let IlIli1 = "",
      illIiI = null,
      lI1lli = null,
      Ill1l = "POST",
      llI1Il = {},
      ii1iii = {};

  switch (iiilii) {
    case "superLeagueHome":
      ii1iii = {
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
      }, llI1Il = await i11I1I.getH5st(ii1iii), IlIli1 = "https://api.m.jd.com/client.action", illIiI = llI1Il.paramsData;
      break;

    case "superLeagueLottery":
      ii1iii = {
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
      }, llI1Il = await i11I1I.getH5st(ii1iii), IlIli1 = "https://api.m.jd.com/client.action", illIiI = llI1Il.paramsData;
      break;

    case "apTaskList":
      ii1iii = {
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
      }, llI1Il = await i11I1I.getH5st(ii1iii), IlIli1 = "https://api.m.jd.com/client.action", illIiI = llI1Il.paramsData;
      break;

    case "apTaskDetail":
      ii1iii = {
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
      }, llI1Il = await i11I1I.getH5st(ii1iii), IlIli1 = "https://api.m.jd.com/client.action", illIiI = llI1Il.paramsData;
      break;

    case "apsDoTask":
      ii1iii = {
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
      }, llI1Il = await i11I1I.getH5st(ii1iii), IlIli1 = "https://api.m.jd.com/client.action", illIiI = llI1Il.paramsData;
      break;

    default:
      console.log("❌ 未知请求 " + iiilii);
      return;
  }

  const i11iil = {};
  illIiI && (illIiI = { ...illIiI,
    ...i11iil
  });
  lI1lli && (lI1lli = { ...lI1lli,
    ...i11iil
  });
  const Ill1i = {
    "url": IlIli1,
    "method": Ill1l,
    "headers": {
      "origin": "https://prodev.m.jd.com",
      "Referer": "https://prodev.m.jd.com/mall/active/8x5pxEuycgqqztQHHdnH6WULxBZ/index.html",
      "User-Agent": $.UA,
      "Cookie": iI1llI,
      "content-type": "application/x-www-form-urlencoded",
      "accept": "application/json, text/plain, */*"
    },
    "params": lI1lli,
    "data": illIiI,
    "timeout": 30000
  };
  Ill1l === "GET" && (delete Ill1i.data, delete Ill1i.headers["Content-Type"]);
  const ii1iil = 1;
  let lllI1l = 0,
      i11iii = null,
      llI1Ii = false;

  while (lllI1l < ii1iil) {
    lllI1l > 0 && (await $.wait(1000));
    const Ill1I = await IlI1Ii.request(Ill1i);

    if (!Ill1I.success) {
      i11iii = "🚫 " + iiilii + " 请求失败 ➜ " + Ill1I.error;
      lllI1l++;
      continue;
    }

    if (!Ill1I?.["data"]) {
      i11iii = "🚫 " + iiilii + " 请求失败 ➜ 无响应数据";
      lllI1l++;
      continue;
    }

    l1llIi(iiilii, Ill1I.data);
    llI1Ii = false;
    break;
  }

  lllI1l >= ii1iil && (console.log(i11iii), llI1Ii && ($.outFlag = true, $.message && $.message.fix(i11iii)));
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
