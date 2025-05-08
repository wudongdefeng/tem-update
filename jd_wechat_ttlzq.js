/*
小程序天天领红包

入口：小程序

定时随机

*/
let lnrun = 0;

const $ = new Env('天天领红包小程序版')
const notify = require("./utils/Rebels_sendJDNotify"),
      jdCookie = require("./jdCookie"),
      common = require("./utils/Rebels_jdCommon"),
      {
  H5st
} = require("./utils/Rebels_H"),
      isNotify = false,
      appId = "60d61",
      appid = "hot_channel",
      client = "apple",
      clientVersion = "9.13.40",
      Referer = "https://servicewechat.com/wx91d27dbf599dff74/683/page-frame.html",
      TASK_GET = 1,
      TASK_COMP = 0;

let waitTimes = 2000,
    cookie = "";
const cookiesArr = Object.keys(jdCookie).map(liIil => jdCookie[liIil]).filter(IllI1I => IllI1I);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  console.log("入口：微信小程序-京东购物-领红包");
  console.log("兑换红包请自行前往兑换页面");
  notify.config({
    "title": $.name
  });

  for (let II1llI = 0; II1llI < cookiesArr.length; II1llI++) {
    $.index = II1llI + 1;
    cookie = cookiesArr[II1llI];
    common.setCookie(cookie);
    $.UserName = decodeURIComponent(common.getCookieValue(cookie, "pt_pin"));
    $.UA = common.genUA($.UserName);
    $.message = notify.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
    await Main();
    common.unsetCookie();
    if ($.runEnd) break;
    await $.wait(parseInt(waitTimes * 1 + 100, 10));
  }

  isNotify && notify.getMessage() && (notify.updateContent(notify.content + "\n"), await notify.push());
})().catch(llI => $.logErr(llI)).finally(() => $.done());

async function Main() {
  $.canWatering = true;

  try {
    const illlIi = await common.getLoginStatus(cookie);

    if (!illlIi && typeof illlIi === "boolean") {
      console.log("账号无效");
      return;
    }

    $.strList = "wxapp_scene=1019; Domain=jd.com;";
    $.MiniTask_ChannelPage = "";
    await sendRequest("MiniTask_ChannelPage");

    if ($.MiniTask_ChannelPage) {
      const I1lIii = $.MiniTask_ChannelPage?.["point"],
            IiI1I = I1lIii ? I1lIii / 1000 : 0;
      console.log("当前有" + ($.MiniTask_ChannelPage?.["point"] || 0) + "省钱币，约等于" + IiI1I.toFixed(2) + "元");
      let illlIl = $.MiniTask_ChannelPage?.["signInfo"];
      $.strList = "wxapp_scene=" + ($.MiniTask_ChannelPage?.["userSignScene"] || 1112) + "; Domain=jd.com;";

      for (let IIIIIl of illlIl?.["signTaskList"] || []) {
        if (IIIIIl.currentDay) {
          console.log("签到周期第" + illlIl.signDays + "天，" + (IIIIIl.signStatus ? "已" : "未") + "签到");

          if (!IIIIIl.signStatus) {
            $.itemId = IIIIIl.itemId;
            $.amount = IIIIIl.amount || 0;
            $.rewardAmount = IIIIIl.rewardAmount || 0;
            await sendRequest("mini_doSign");
            await $.wait(parseInt(waitTimes * 1 + 500, 10));
          }

          break;
        }
      }

      let i11ill = 0,
          IIIIIi = [];

      for (let lllll of $.MiniTask_ChannelPage?.["scanTaskList"] || []) {
        if (lllll?.["status"] === 0) {
          if (lllll.type == "6") {
            $.strList = "wxapp_scene=" + (lllll?.["scene"] || 1019) + "; Domain=jd.com;";
            await sendRequest("MiniTask_ChannelPage");
            await $.wait(parseInt(waitTimes * 1 + 500, 10));
            $.scanAssignmentId = lllll.scanAssignmentId;
            await sendRequest("miniTask_getDrainageTaskReward");
            await $.wait(parseInt(waitTimes * 1 + 1000, 10));
            continue;
          }

          IIIIIi.push(lllll);
          $.max_wait = Math.max(i11ill, lllll.times || 0);
          $.actionType = TASK_GET;
          $.scanAssignmentId = lllll.scanAssignmentId;
          $.itemId = lllll.itemId;
          $.type = lllll.type;
          $.title = lllll.title;
          await sendRequest("MiniTask_ScanTask");
          await $.wait(parseInt(waitTimes * 1 + 1000, 10));
        } else {
          if (lllll?.["status"] === 1) {
            if (lllll.type == "6") {
              $.strList = "wxapp_scene=" + (lllll?.["scene"] || 1019) + "; Domain=jd.com;";
              $.scanAssignmentId = lllll.scanAssignmentId;
              await sendRequest("miniTask_getDrainageTaskReward");
              continue;
            }

            $.actionType = TASK_COMP;
            $.scanAssignmentId = lllll.scanAssignmentId;
            $.itemId = lllll.itemId;
            $.type = lllll.type;
            $.title = lllll.title;
            await sendRequest("MiniTask_ScanTask");
            await $.wait(parseInt(waitTimes * 1 + 1000, 10));
          }
        }
      }

      if ($.max_wait > 0) await $.wait($.max_wait * 1000);
      await $.wait(parseInt(waitTimes * 1 + 1000, 10));

      for (let iil1l1 of IIIIIi) {
        $.actionType = TASK_COMP;
        $.scanAssignmentId = iil1l1.scanAssignmentId;
        $.itemId = iil1l1.itemId;
        $.type = iil1l1.type;
        $.title = iil1l1.title;
        await sendRequest("MiniTask_ScanTask");
        await $.wait(parseInt(waitTimes * 1 + 1000, 10));
      }
    }
  } catch (ill11i) {
    console.log("❌ 脚本运行遇到了错误\n" + ill11i);
  }
}

async function handleResponse(I1lIiI, lllili) {
  try {
    switch (I1lIiI) {
      case "MiniTask_ChannelPage":
        if (lllili?.["code"] === 0 && lllili?.["subCode"] === 0) $.MiniTask_ChannelPage = lllili.data;else lllili.message ? console.log("" + lllili.message) : console.log("❓" + I1lIiI + " " + JSON.stringify(lllili));
        break;

      case "mini_doSign":
        if (lllili?.["code"] === 0 && lllili?.["subCode"] === 0) {
          let iiilii = [];
          $.amount > 0 && iiilii.push($.amount + "红包");
          $.rewardAmount > 0 && iiilii.push($.rewardAmount + "省钱币");
          if (iiilii.length) console.log("签到成功:" + iiilii.join("+ "));else {
            console.log("签到成功: 空气");
          }
        } else lllili.message ? console.log("签到失败:  " + lllili.message) : console.log("❓" + I1lIiI + " " + JSON.stringify(lllili));

        break;

      case "miniTask_getDrainageTaskReward":
        if (lllili?.["code"] === 0 && lllili?.["subCode"] === 0) console.log("完成任务[浏览指定入口]成功，获得: " + lllili.data?.["rewardAmount"] + "省钱币");else lllili.message ? console.log("完成任务[浏览指定入口]失败:  " + lllili.message) : console.log("❓" + I1lIiI + " " + JSON.stringify(lllili));
        break;

      case "MiniTask_ScanTask":
        let lillIl = $.actionType == 1 ? "领取" : "完成";
        if (lllili?.["code"] === 0 && lllili?.["subCode"] === 0) console.log(lillIl + "任务[" + $.title + "]成功"), $.actionType == TASK_COMP && (await sendRequest("MiniTask_ScanReward"), await $.wait(parseInt(waitTimes * 1 + 1000, 10)));else lllili.message ? console.log(lillIl + "任务[" + $.title + "]失败:  " + lllili.message) : console.log("❓" + I1lIiI + " " + JSON.stringify(lllili));
        break;

      case "MiniTask_ScanReward":
        if (lllili?.["code"] === 0 && lllili?.["subCode"] === 0) {
          let Ill1i = [];

          for (let ii1iil of lllili.data) {
            let lllI1l = ii1iil.type == 0 ? "省钱币" : "红包";
            Ill1i.push("" + ii1iil.discount + lllI1l);
          }

          console.log("领取任务[" + $.title + "]奖励: " + Ill1i.join(","));
        } else lllili.message ? console.log("领取任务[" + $.title + "]奖励失败:  " + lllili.message) : console.log("❓" + I1lIiI + " " + JSON.stringify(lllili));

        break;
    }
  } catch (llI1Ii) {
    console.log("❌ 未能正确处理 " + I1lIiI + " 请求响应 " + (llI1Ii.message || llI1Ii));
  }
}

async function sendRequest(lllI1i) {
  if ($.runEnd) return;
  let II1i1 = "",
      lI1lll = null,
      iIiII = null,
      iil1lI = "POST",
      iiiliI = {},
      li1i1I = {};

  switch (lllI1i) {
    case "MiniTask_ChannelPage":
      li1i1I = {
        "appId": appId,
        "functionId": "MiniTask_ChannelPage",
        "appid": appid,
        "clientVersion": clientVersion,
        "client": client,
        "body": {},
        "version": "4.4",
        "ua": $.UA,
        "t": true
      }, iiiliI = await H5st.getH5st(li1i1I), II1i1 = "https://api.m.jd.com/client.action", lI1lll = iiiliI.paramsData;
      break;

    case "mini_doSign":
      let II1il = $.itemId || "1";
      li1i1I = {
        "appId": appId,
        "functionId": "MiniTask_ChannelPage",
        "appid": appid,
        "clientVersion": clientVersion,
        "client": client,
        "body": {
          "itemId": II1il
        },
        "version": "4.4",
        "ua": $.UA,
        "t": true
      }, iiiliI = await H5st.getH5st(li1i1I), II1i1 = "https://api.m.jd.com/client.action", lI1lll = iiiliI.paramsData;
      break;

    case "miniTask_getDrainageTaskReward":
      let lllI11 = $.scanAssignmentId || "79dRvBQWmT2Dwyu4vvyZUt1Pa6W";
      li1i1I = {
        "appId": appId,
        "functionId": "miniTask_getDrainageTaskReward",
        "appid": appid,
        "clientVersion": clientVersion,
        "client": client,
        "body": {
          "rewardAssignmentId": lllI11
        },
        "version": "4.4",
        "ua": $.UA,
        "t": true
      }, iiiliI = await H5st.getH5st(li1i1I), II1i1 = "https://api.m.jd.com/client.action", lI1lll = iiiliI.paramsData;
      break;

    case "MiniTask_ScanTask":
      li1i1I = {
        "appId": appId,
        "functionId": "MiniTask_ScanTask",
        "appid": appid,
        "clientVersion": clientVersion,
        "client": client,
        "body": {
          "actionType": $.actionType,
          "scanAssignmentId": $.scanAssignmentId,
          "itemId": $.itemId,
          "type": $.type
        },
        "version": "4.4",
        "ua": $.UA,
        "t": true
      }, iiiliI = await H5st.getH5st(li1i1I), II1i1 = "https://api.m.jd.com/client.action", lI1lll = iiiliI.paramsData;
      break;

    case "MiniTask_ScanReward":
      li1i1I = {
        "appId": appId,
        "functionId": "MiniTask_ScanReward",
        "appid": appid,
        "clientVersion": clientVersion,
        "client": client,
        "body": {
          "scanAssignmentId": $.scanAssignmentId,
          "type": $.type
        },
        "version": "4.4",
        "ua": $.UA,
        "t": true
      }, iiiliI = await H5st.getH5st(li1i1I), II1i1 = "https://api.m.jd.com/client.action", lI1lll = iiiliI.paramsData;
      break;

    default:
      console.log("❌ 未知请求 " + lllI1i);
      return;
  }

  const illIii = {
    "url": II1i1,
    "method": iil1lI,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Host": "api.m.jd.com",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": cookie + ("wxapp_scene=" + 1019 + "; Domain=jd.com;"),
      "Referer": Referer,
      "User-Agent": $.UA
    },
    "params": iIiII,
    "data": lI1lll,
    "timeout": 20000
  };
  iil1lI === "GET" && (delete illIii.data, delete illIii.headers["Content-Type"]);
  const ii1il1 = 1;
  let lI1llI = 0,
      illIil = null,
      Ill1I = false;

  while (lI1llI < ii1il1) {
    lI1llI > 0 && (await $.wait(1000));
    const I1lIll = await common.request(illIii);

    if (!I1lIll.success) {
      illIil = "🚫 " + lllI1i + " 请求失败 ➜ " + I1lIll.error;
      lI1llI++;
      continue;
    }

    if (!I1lIll?.["data"]) {
      illIil = "🚫 " + lllI1i + " 请求失败 ➜ 无响应数据";
      lI1llI++;
      continue;
    }

    handleResponse(lllI1i, I1lIll.data);
    Ill1I = false;
    break;
  }

  lI1llI >= ii1il1 && (console.log(illIil), Ill1I && ($.outFlag = true, $.message && $.message.fix(illIil)));
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
