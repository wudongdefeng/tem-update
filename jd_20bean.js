/*
加购关注 20豆

一次性

cron:1 1 1 1 *

*/
let lnrun = 0;

const $ = new Env('20豆一次性')
const notify = require("./utils/Rebels_sendJDNotify"),
      jdCookie = require("./jdCookie"),
      getToken = require("./utils/Rebels_Token"),
      common = require("./utils/Rebels_jdCommon"),
      isNotify = false;

let domains = "https://jdunit.yucrm.cn",
    cookie = "";
const cookiesArr = Object.keys(jdCookie).map(l1il1i => jdCookie[l1il1i]).filter(ll1 => ll1);
!cookiesArr[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  $.activityUrl = "https://service.vapp.jd.com/D46A82BB04C8195364D48F76E7EA90C5/1/page-frame.html";
  $.shareUuid = "";
  notify.config({
    "title": $.name
  });

  for (let liIll = 0; liIll < cookiesArr.length; liIll++) {
    $.index = liIll + 1;
    cookie = cookiesArr[liIll];
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
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  }

  isNotify && notify.getMessage() && (notify.updateContent(notify.content + "\n"), await notify.push());
})().catch(iI1liI => $.logErr(iI1liI)).finally(() => $.done());

async function Main() {
  try {
    $.endTime = 0;
    $.is_break = false;
    $.Token = "";
    $.Tokens = "";
    $.Token = await getToken(cookie, "https://szxyun-rc.isvjcloud.com");

    if ($.Token == "") {
      console.log("缺少必要参数，请重新运行");
      $.message.fix("TOKEN获取失败~");
      return;
    }

    await $.wait(parseInt(Math.random() * 500 + 500, 10));
    await sendRequest("userLogin");

    if ($.Tokens) {
      await sendRequest("follow");
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      await sendRequest("add-cart");
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
      await sendRequest("prize");
      await $.wait(parseInt(Math.random() * 1000 + 1500, 10));
    }
  } catch (ilil1i) {
    console.log(ilil1i.message);
  }
}

async function handleResponse(IlIIi, IiI1l) {
  try {
    switch (IlIIi) {
      case "userLogin":
        if (IiI1l.code == 1 && IiI1l.data) $.Tokens = IiI1l.data.token;else IiI1l.message ? console.log("" + (IiI1l.message || "")) : console.log("" + IiI1l);
        break;

      case "add-cart":
        if (IiI1l.code === 1) {
          if (IiI1l.data == 3) console.log("加购成功");else IiI1l.data == 2 ? console.log("加购成功,未获得京豆奖励,大概率此账号是黑子") : console.log("已经加购过");
        } else IiI1l.message ? console.log("" + (IiI1l.message || "")) : console.log("" + IiI1l);

        break;

      case "follow":
        if (IiI1l.code === 1 && IiI1l.data) {
          if (IiI1l.data == 3) console.log("关注成功");else IiI1l.data == 2 ? console.log("关注成功,未获得京豆奖励,大概率此账号是黑子") : console.log("已经关注过");
        } else IiI1l.message ? console.log("" + (IiI1l.message || "")) : console.log("" + IiI1l);

        break;

      case "prize":
        if (IiI1l.code === 1 && IiI1l.data) {
          let IlIll1 = IiI1l.data,
              IlIII = "";

          for (let ilil1l = 0; ilil1l < IlIll1.length; ilil1l++) {
            const illlIi = IlIll1[ilil1l],
                  I1lIii = illlIi.prizeName;
            IlIII += "  " + I1lIii;
          }

          console.log("活动奖品：" + IlIII + "\n");
        } else {
          if (IiI1l.message) console.log("" + (IiI1l.message || ""));else {
            console.log("" + IiI1l);
          }
        }

        break;
    }
  } catch (liiII1) {
    console.log("❌ 未能正确处理 " + IlIIi + " 请求响应 " + (liiII1.message || liiII1));
  }
}

async function sendRequest(IIIl1l) {
  if ($.runEnd) return;
  let i11ili = "",
      iil1l1 = null,
      iiili1 = "GET";

  switch (IIIl1l) {
    case "userLogin":
      i11ili = domains + "/jd-united-web/h5/login/login?venderId=1000078305&activityId=22&access_token=" + $.Token + "&source=1&applet=true";
      break;

    case "add-cart":
      i11ili = domains + "/jd-united-web/h5/uniteActivity/add-cart/22";
      break;

    case "follow":
      i11ili = domains + "/jd-united-web/h5/uniteActivity/sellers/follow/22?venderIds=1000078305%2C1000076304%2C1000008814%2C612284%2C1000080364%2C1000001351%2C1000001285%2C1000118193%2C1000124525";
      break;

    case "prize":
      i11ili = domains + "/jd-united-web/h5/uniteActivity/prize/list/22";
      break;

    default:
      console.log("❌ 未知请求 " + IIIl1l);
      return;
  }

  const ill11l = {
    "url": i11ili,
    "method": iiili1,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
      "x-access-token": $.Tokens || null,
      "Host": "jdunit.yucrm.cn",
      "Cookie": cookie,
      "Referer": "https://service.vapp.jd.com/D46A82BB04C8195364D48F76E7EA90C5/1/page-frame.html",
      "User-Agent": "JD4iPhone/168950 (iPhone; iOS 12.5.5; Scale/3.00)"
    },
    "data": iil1l1,
    "timeout": 20000
  };
  iiili1 === "GET" && (delete ill11l.data, delete ill11l.headers["Content-Type"]);
  const I1lIiI = 1;
  let lllili = 0,
      IliiiI = null,
      Ill11 = false;

  while (lllili < I1lIiI) {
    lllili > 0 && (await $.wait(1000));
    const ii1ii1 = await common.request(ill11l);

    if (!ii1ii1.success) {
      IliiiI = "🚫 " + IIIl1l + " 请求失败 ➜ " + ii1ii1.error;
      lllili++;
      continue;
    }

    if (!ii1ii1.data) {
      IliiiI = "🚫 " + IIIl1l + " 请求失败 ➜ 无响应数据";
      lllili++;
      continue;
    }

    handleResponse(IIIl1l, ii1ii1.data);
    Ill11 = false;
    break;
  }

  lllili >= I1lIiI && (console.log(IliiiI), Ill11 && ($.outFlag = true, $.message && $.message.fix(IliiiI)));
}

function getAuthorCodeList(ilil1I) {
  return new Promise(liiIIi => {
    const Iliii1 = {
      "url": "" + ilil1I,
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(Iliii1, async (iIiIi, iil1ll, iiilil) => {
      try {
        if (iIiIi) {} else {
          if (iiilil) iiilil = JSON.parse(iiilil);else {
            console.log("未获取到数据,请重新运行");
          }
        }
      } catch (lillIl) {
        $.logErr(lillIl, iil1ll);
        iiilil = null;
      } finally {
        liiIIi(iiilil);
      }
    });
  });
}

function random(IlIli1, illIiI) {
  return Math.floor(Math.random() * (illIiI - IlIli1)) + IlIli1;
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
