/*
1，5，10豆，黑子擦肩
定时随机
 */
let lnrun = 0;

const $ = new Env('每日抽豆');
const liIiI11I = $.isNode() ? require("./sendNotify") : "",
  lIl1Ill = $.isNode() ? require("./jdCookie.js") : "",
  Iil1lil = require("./function/dylanx.js");
let I1IIl1II = true,
  i1I1Ilil = [],
  llliIllI = "",
  lili111 = "";
if ($.isNode()) {
  Object.keys(lIl1Ill).forEach(i11lli11 => {
    i1I1Ilil.push(lIl1Ill[i11lli11]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i1I1Ilil = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...IiiI1li($.getdata("CookiesJD") || "[]").map(Ii11li11 => Ii11li11.cookie)].filter(iliI1l => !!iliI1l);
!(async () => {
  if (!i1I1Ilil[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let IIIiIII1 = 0; IIIiIII1 < i1I1Ilil.length; IIIiIII1++) {
    if (i1I1Ilil[IIIiIII1]) {
      llliIllI = i1I1Ilil[IIIiIII1];
      $.UserName = decodeURIComponent(llliIllI.match(/pt_pin=([^; ]+)(?=;?)/) && llliIllI.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = IIIiIII1 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.black = false;
      $.UA = require("./USER_AGENTS").UARAM();
      await I11l11i1();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await liIiI11I.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await l1IiIiil();
      await $.wait(1000);
      await I1I11lll({
        "authType": "2",
        "awardSource": "1",
        "enAwardK": "ltvTJ/WYFPZcuWIWHCAjR/lUVVYszUqGN+JzEE06dPu7DDzXHNt5Br7i6hYH2826ssuKfHev2yv2\n8HWSugMPNJj0hO0oRf9K9vB1kroDDzT5uSUPG/Z35YJDHw8AyYmqk4Q1u2vSGKS/M+5ruJeepDDb\nGjIC3nIIbIE2I7/kWfG6LEOpCsfjzQD+tTlmq6znidq4bRZoUJ3MOg0BXga8nip79XSe0g5kHG/A\na2pjcqcS+Z0MdH5AoT28E84LptqHeCE6mkMJ/dL3sjRs44o9OuXOZklgdKme+XUAsi2or52idiaj\nejivdFQcDHA7HH3gaHvanKkkE8TU7ESujM2a18EuQglPvG63XuhsjEuTur7Q0q+RCbbzCUJO1qM0\nhM1uGj8RZGTjNPmgGqqkikOxgpl2et5AeQ0y_babel",
        "encryptAssignmentId": "tb5nbUQ7kk45XoAexByamhEHeHy",
        "encryptProjectId": "TmxyMFsNSsUTi1UoGoYd6WM2Bks",
        "lotteryCode": "1271763",
        "riskParam": {
          "childActivityUrl": "https://pro.m.jd.com/mall/active/3kmVmayf36Kmoyfq9pLuCSYUfU9t/index.html?babelChannel=ttt1",
          "eid": "",
          "pageClickKey": "Babel_WheelSurf",
          "shshshfpb": ""
        },
        "srv": "{\"bord\":\"0\",\"fno\":\"0-0-2\",\"mid\":\"70764372\",\"bi2\":\"2\",\"bid\":\"0\",\"aid\":\"01150161\"}"
      });
      await $.wait(10000);
    }
  }
})().catch(Illll1iI => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Illll1iI + "!", "");
}).finally(() => {
  $.done();
});
async function I1I11lll(I11lIl1) {
  let II1Iilii = Iil1lil.getbody("babelGetLottery", I11lIl1);
  return new Promise(async IiIiII11 => {
    $.post(iIililll("babelGetLottery", II1Iilii), async (I111II, IllilI11, IIlI11l1) => {
      try {
        if (I111II) {
          console.log("" + JSON.stringify(I111II));
          console.log(" API请求失败，请检查网路重试");
        } else {
          IIlI11l1 = JSON.parse(IIlI11l1);
          if (IIlI11l1.prizeName) console.log("恭喜获得：" + IIlI11l1.prizeName);else IIlI11l1.responseMessage.includes("未通过") ? ($.log("风险等级未通过！"), $.black = true) : $.log(JSON.stringify(IIlI11l1));
        }
      } catch (l11) {
        $.logErr(l11, IllilI11);
      } finally {
        IiIiII11(IIlI11l1);
      }
    });
  });
}
async function l1IiIiil() {
  let I1iiill1 = Iil1lil.getbody("signInWithPrize", {
    "floorId": "83596202"
  });
  return new Promise(async IliII11l => {
    $.post(iIililll("signInWithPrize", I1iiill1), async (li1l11i1, iI11lil, i1l1llII) => {
      try {
        if (li1l11i1) {
          console.log("" + JSON.stringify(li1l11i1));
          console.log(" API请求失败，请检查网路重试");
        } else {
          i1l1llII = JSON.parse(i1l1llII);
          if (i1l1llII.code == 0) {
            if (i1l1llII.result.signInText.includes("已经")) $.log("103-任务已完成");else {
              if (i1l1llII.result.signInText.includes("恭喜")) $.log("恭喜获得：" + i1l1llII.result.beanCount + "京豆");else {}
            }
          } else console.log(i1l1llII.message);
        }
      } catch (IiIIiiI) {
        $.logErr(IiIIiiI, iI11lil);
      } finally {
        IliII11l(i1l1llII);
      }
    });
  });
}
function iIililll(i111l1I, IIIlI11l) {
  return {
    "url": "https://api.m.jd.com/client.action",
    "body": "functionId=" + i111l1I + "&" + IIIlI11l,
    "headers": {
      "Host": "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": llliIllI
    }
  };
}
function I11l11i1() {
  return new Promise(iiIii11 => {
    const Illili1I = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": llliIllI,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(Illili1I, (I11IlIll, li1iIIl1, l1Ii1liI) => {
      try {
        if (l1Ii1liI) {
          l1Ii1liI = JSON.parse(l1Ii1liI);
          if (l1Ii1liI.islogin === "1") {} else l1Ii1liI.islogin === "0" && ($.isLogin = false);
        }
      } catch (iliiI1I1) {
        console.log(iliiI1I1);
      } finally {
        iiIii11();
      }
    });
  });
}
function i1IiiIi() {
  return new Promise(i11I1lil => {
    const Ili1II1i = {
      "url": "https://lite-msg.m.jd.com/client.action?functionId=msgEntranceV1",
      "headers": {
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(Ili1II1i, (lliil1I1, lI1Iii1l, iIII11li) => {
      try {
        iIII11li && (iIII11li = JSON.parse(iIII11li), $.difftime = Date.now() - iIII11li.timestamp);
      } catch (IIllIiIl) {
        console.log(IIllIiIl);
      } finally {
        i11I1lil();
      }
    });
  });
}
function il1IIli1() {
  return new Promise(llI1I1I1 => {
    if (!I1IIl1II) $.msg($.name, "", "" + lili111);else {
      $.log("京东账号" + $.index + $.nickName + "\n" + lili111);
    }
    llI1I1I1();
  });
}
function l1illIIi(l11iIili) {
  try {
    if (typeof JSON.parse(l11iIili) == "object") return true;
  } catch (l1iI1Ii) {
    return console.log(l1iI1Ii), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function IiiI1li(I1I1li1l) {
  const iIIIIIl = function () {
      let l1l1I = true;
      return function (liilllI, Ill11ll1) {
        const iIl11IiI = l1l1I ? function () {
          if (Ill11ll1) {
            const iiiilili = Ill11ll1.apply(liilllI, arguments);
            return Ill11ll1 = null, iiiilili;
          }
        } : function () {};
        return l1l1I = false, iIl11IiI;
      };
    }(),
    li1IIIiI = iIIIIIl(this, function () {
      return li1IIIiI.toString().search("(((.+)+)+)+$").toString().constructor(li1IIIiI).search("(((.+)+)+)+$");
    });
  li1IIIiI();
  if (typeof I1I1li1l == "string") {
    try {
      return JSON.parse(I1I1li1l);
    } catch (l11iIl1i) {
      return console.log(l11iIl1i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
