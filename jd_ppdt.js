/*
18 11,19 * * * jd_ppdt.js
 */
let lnrun = 0;


const $ = new Env('超级品牌殿堂');
const liIil1ll = $.isNode() ? require("./sendNotify") : "",
  ii11l1Ii = $.isNode() ? require("./jdCookie.js") : "";
let liIIlIIl = true,
  l1lilIii = [],
  ii1iIIIl = "",
  Il1IIlI = "";
if ($.isNode()) {
  Object.keys(ii11l1Ii).forEach(IiiIIli1 => {
    l1lilIii.push(ii11l1Ii[IiiIIli1]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1lilIii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iI1iIiIi($.getdata("CookiesJD") || "[]").map(IiIl1lil => IiIl1lil.cookie)].filter(i1IIlli1 => !!i1IIlli1);
!(async () => {
  if (!l1lilIii[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let iiilil1 = 0; iiilil1 < l1lilIii.length; iiilil1++) {
    if (l1lilIii[iiilil1]) {
      ii1iIIIl = l1lilIii[iiilil1];
      $.UserName = decodeURIComponent(ii1iIIIl.match(/pt_pin=([^; ]+)(?=;?)/) && ii1iIIIl.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = iiilil1 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.ban = "";
      $.donep = "";
      $.UA = require("./USER_AGENTS").UARAM();
      await iiillli();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await liIil1ll.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await IIIilll();
      let I1IlIliI = await I11ii1i($.activityId);
      if (I1IlIliI) {
        console.log("" + I1IlIliI.activityName);
        $.pid = I1IlIliI.encryptProjectId;
        $.aid = I1IlIliI.activityId;
      } else {
        console.log("获取活动信息失败！！");
        continue;
      }
      await $.wait(500);
      await llliI1Ii($.aid);
      await $.wait(500);
      for (let l1Ii1Ili of $.tasklist) {
        $.log("去做任务-> " + l1Ii1Ili.assignmentName);
        if (l1Ii1Ili.completionCnt) {
          $.log("任务已完成");
          continue;
        }
        let IlilI1il;
        for (let liIl111l = 0; liIl111l < l1Ii1Ili.assignmentTimesLimit; liIl111l++) {
          IlilI1il = await i1III1lI(l1Ii1Ili.encryptAssignmentId);
          await $.wait(500);
        }
        IlilI1il && IlilI1il.length ? IlilI1il[0].awardType === 3 ? console.log("----恭喜获得 " + IlilI1il[0].beanNum + " 京豆") : console.log(JSON.stringify(IlilI1il)) : $.log("----空气");
      }
      await $.wait(2000);
    }
  }
})().catch(l11illl1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + l11illl1 + "!", "");
}).finally(() => {
  $.done();
});
async function I11ii1i(Ii1IIlI) {
  let IllIlI1i = {
    "url": "https://api.m.jd.com/?client=wh5&appid=superbrand-main&functionId=superBrandHall1111Page&t=1681289234365&body=%7B%22source%22%3A%22hall_1111%22%2C%22activityId%22%3A" + Ii1IIlI + "%7D",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": $.UA,
      "Cookie": ii1iIIIl
    }
  };
  return new Promise(async IIlIII1i => {
    let l1llI1iI;
    $.post(IllIlI1i, async (IiiIIlI1, llIi1IlI, illiIII1) => {
      try {
        if (IiiIIlI1) {
          console.log("" + JSON.stringify(IiiIIlI1));
          console.log(" API请求失败，请检查网路重试");
        } else {
          illiIII1 = JSON.parse(illiIII1);
          if (illiIII1.code == 0) {
            if (illiIII1.data.bizCode == 0) {
              l1llI1iI = illiIII1.data.result.activityBaseInfo || "";
            }
          } else console.log(JSON.stringify(illiIII1));
        }
      } catch (iIlI1ll1) {
        $.logErr(iIlI1ll1, llIi1IlI);
      } finally {
        IIlIII1i(l1llI1iI);
      }
    });
  });
}
async function llliI1Ii(Ii1ii1iI) {
  let liIIlli1 = {
    "url": "https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandTaskList&t=1681289234496&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:" + Ii1ii1iI + "%7D",
    "headers": {
      "Origin": "https://prodev.m.jd.com",
      "User-Agent": $.UA,
      "Cookie": ii1iIIIl
    }
  };
  return new Promise(async l1Il11II => {
    $.post(liIIlli1, async (lll1lIII, lIIIlli1, ll1li1ii) => {
      try {
        if (lll1lIII) {
          console.log("" + JSON.stringify(lll1lIII));
          console.log(" API请求失败，请检查网路重试");
        } else {
          ll1li1ii = JSON.parse(ll1li1ii);
          if (ll1li1ii.code == 0) {
            if (ll1li1ii.data.bizCode == 0) {
              $.tasklist = ll1li1ii.data.result.taskList;
            } else console.log(ll1li1ii.data.bizMsg);
          } else console.log(JSON.stringify(ll1li1ii));
        }
      } catch (il11iIl) {
        $.logErr(il11iIl, lIIIlli1);
      } finally {
        l1Il11II(ll1li1ii);
      }
    });
  });
}
async function i1III1lI(i1Ii11i1) {
  let Ii1liIl = {
      "url": "https://api.m.jd.com/?client=wh5&appid=ProductZ4Brand&functionId=superBrandDoTask&t=1681289234224&body=%7B%22source%22:%22hall_1111%22,%22activityId%22:" + $.aid + ",%22completionFlag%22:1,%22encryptProjectId%22:%22" + $.pid + "%22,%22encryptAssignmentId%22:%22" + i1Ii11i1 + "%22,%22assignmentType%22:0,%22actionType%22:0%7D",
      "headers": {
        "Origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/",
        "User-Agent": $.UA,
        "Cookie": ii1iIIIl
      }
    },
    iIliI1Il = "";
  return new Promise(async i1llill => {
    $.post(Ii1liIl, async (Il1i11il, il111I1l, IllI1lIi) => {
      try {
        if (Il1i11il) {
          console.log("" + JSON.stringify(Il1i11il));
          console.log(" API请求失败，请检查网路重试");
        } else {
          IllI1lIi = JSON.parse(IllI1lIi);
          IllI1lIi.code == 0 ? IllI1lIi.data.bizCode == 0 ? iIliI1Il = IllI1lIi.data?.["result"]?.["rewards"] : console.log(IllI1lIi.data.bizMsg) : console.log(JSON.stringify(IllI1lIi));
        }
      } catch (iiIiII1l) {
        $.logErr(iiIiII1l, il111I1l);
      } finally {
        i1llill(iIliI1Il);
      }
    });
  });
}
function IIIilll() {
  let Il1i1 = {
    "url": "https://prodev.m.jd.com/mall/active/rw8ewMzsDMevpVnuCJ7EgXS4PM9/index.html",
    "headers": {
      "User-Agent": $.UA,
      "Cookie": ii1iIIIl
    }
  };
  return new Promise(IIll1i1i => {
    $.get(Il1i1, (l1ililiI, IIIi111l, liI1i11i) => {
      try {
        l1ililiI ? $.log(JSON.stringify(l1ililiI)) : $.activityId = liI1i11i.match(/"cmsActivityId":"(\d+)"/)[1];
      } catch (iiIli111) {
        $.log(JSON.stringify(iiIli111));
      } finally {
        IIll1i1i();
      }
    });
  });
}
function iiillli() {
  return new Promise(lI1I1IIl => {
    const lill1ll = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": ii1iIIIl,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(lill1ll, (l11illII, Ii11lIli, liIil1I) => {
      try {
        if (liIil1I) {
          liIil1I = JSON.parse(liIil1I);
          if (liIil1I.islogin === "1") {} else liIil1I.islogin === "0" && ($.isLogin = false);
        }
      } catch (IIli1III) {
        console.log(IIli1III);
      } finally {
        lI1I1IIl();
      }
    });
  });
}
function Ii1Ii1iI() {
  return new Promise(lillIlii => {
    if (!liIIlIIl) {
      $.msg($.name, "", "" + Il1IIlI);
    } else $.log("京东账号" + $.index + $.nickName + "\n" + Il1IIlI);
    lillIlii();
  });
}
function Illiiii(IIi1ii1l) {
  try {
    if (typeof JSON.parse(IIi1ii1l) == "object") {
      return true;
    }
  } catch (illiilii) {
    return console.log(illiilii), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}
function iI1iIiIi(IiilII11) {
  const I1lI1iIi = function () {
      let Illi1ilI = true;
      return function (Il1III1l, lI1l11il) {
        const I1ililII = Illi1ilI ? function () {
          if (lI1l11il) {
            const lIlIiI1i = lI1l11il.apply(Il1III1l, arguments);
            return lI1l11il = null, lIlIiI1i;
          }
        } : function () {};
        return Illi1ilI = false, I1ililII;
      };
    }(),
    i11ill = I1lI1iIi(this, function () {
      return i11ill.toString().search("(((.+)+)+)+$").toString().constructor(i11ill).search("(((.+)+)+)+$");
    });
  i11ill();
  if (typeof IiilII11 == "string") try {
    return JSON.parse(IiilII11);
  } catch (iiIIlI) {
    return console.log(iiIIlI), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
