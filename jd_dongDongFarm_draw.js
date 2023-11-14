/*
新东东农场幸运转盘

cron "55 5 * * *" script-path=jd_dongDongFarm_draw.js, tag=新东东农场幸运转盘

 */
let lnrun = 0;

const $ = new Env('新东东农场幸运转盘')
const I1l11I = $.isNode() ? require("./sendNotify") : "",
  Ilil1l = $.isNode() ? require("./jdCookie") : "",
  iIIiii = require("./function/krgetH5st"),
  iilll = require("./function/jdCommon");
let IlllIi = "VssYBUKJOen7HZXpC8dRFA",
  i1l1Ii = [],
  I1iIIi = "",
  I1iIIl;
if ($.isNode()) {
  Object.keys(Ilil1l).forEach(iillI => {
    i1l1Ii.push(Ilil1l[iillI]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  i1l1Ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...iii1lI($.getdata("CookiesJD") || "[]").map(lI1III => lI1III.cookie)].filter(IIliIi => !!IIliIi);
}
!(async () => {
  if (!i1l1Ii[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let II11ll = 0; II11ll < i1l1Ii.length; II11ll++) {
    if (i1l1Ii[II11ll]) {
      I1iIIi = i1l1Ii[II11ll];
      $.UserName = decodeURIComponent(I1iIIi.match(/pt_pin=([^; ]+)(?=;?)/) && I1iIIi.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = II11ll + 1;
      $.isLogin = true;
      $.nickName = "";
      I1iIIl = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await I1l11I.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      $.jda = "__jda=" + Iil1ll("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = iilll.genUA($.UserName);
      await lI1IIl();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(lI1II1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lI1II1 + "!", "");
}).finally(() => {
  $.done();
});
async function lI1IIl() {
  $.txhot = false;
  $.nowcontinue = false;
  await i1ilI1();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  if ($.nowcontinue) {
    await Iil1li();
    await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    for (let lill1l = 0; lill1l < $.lotteryChances; lill1l++) {
      await Iiilii();
      await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
    }
  }
}
function i1ilI(llI11I) {
  try {
    if (typeof JSON.parse(llI11I) == "object") {
      return true;
    }
  } catch (lI1l1i) {
    console.log(lI1l1i);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function iii1lI(llI11l) {
  if (typeof llI11l == "string") {
    try {
      return JSON.parse(llI11l);
    } catch (IIii1I) {
      console.log(IIii1I);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function i1ilI1() {
  return new Promise(async II11ii => {
    const II11il = {
        appId: "c06b7",
        functionId: "wheelsHome",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: IlllIi
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      iIIil1 = await iIIiii.getH5st(II11il);
    let IlllII = {
      url: "https://api.m.jd.com",
      body: iIIil1.params,
      headers: {
        origin: "https://lotterydraw-new.jd.com",
        Referer: "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA&sid=&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        Cookie: I1iIIi,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(IlllII, async (lI1l1I, lill11, liI1i1) => {
      try {
        if (lI1l1I) {
          console.log("" + JSON.stringify(lI1l1I));
        } else {
          liI1i1 = JSON.parse(liI1i1);
          if (liI1i1.code == 0) {
            $.nowcontinue = true;
            $.lotteryChances = liI1i1?.["data"]?.["lotteryChances"];
            console.log("当前抽奖次数：" + $.lotteryChances);
          } else {
            if (liI1i1.code == 402) {
              console.log("进入首页失败," + (liI1i1?.["errMsg"] || ""));
            } else {
              console.log("进入首页失败," + (liI1i1?.["errMsg"] || ""));
            }
          }
        }
      } catch (I11i1i) {
        $.logErr(I11i1i, lill11);
      } finally {
        II11ii();
      }
    });
  });
}
async function Iiilii() {
  return new Promise(async lill1I => {
    const Ilil11 = {
        appId: "bd6c8",
        functionId: "wheelsLottery",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          linkId: IlllIi
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      i1ii1 = await iIIiii.getH5st(Ilil11);
    let il1ii = {
      url: "https://api.m.jd.com",
      body: i1ii1.params,
      headers: {
        origin: "https://lotterydraw-new.jd.com",
        Referer: "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA&sid=&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        Cookie: I1iIIi,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(il1ii, async (lIIiIl, iI1Iil, il1iI) => {
      try {
        if (lIIiIl) {
          console.log("" + JSON.stringify(lIIiIl));
        } else {
          il1iI = JSON.parse(il1iI);
          if (il1iI.code == 0) {
            switch (il1iI?.["data"]?.["rewardType"]) {
              case 0:
                console.log("抽中：空气-" + il1iI?.["data"]?.["lotteryChances"] + "次机会");
                break;
              case 1:
                console.log("抽中：" + il1iI?.["data"]?.["prizeName"] + "-" + il1iI?.["data"]?.["limitStr"] + "-" + il1iI?.["data"]?.["lotteryChances"] + "次机会");
                break;
              case 18:
                console.log("抽中：" + il1iI?.["data"]?.["prizeName"] + "-" + il1iI?.["data"]?.["lotteryChances"] + "次机会");
                break;
              case null:
                console.log("运气不太好，什么都没有抽到...");
                break;
              default:
                console.log(il1iI?.["data"]?.["rewardType"] + "-" + il1iI?.["data"]?.["prizeName"] + "-" + il1iI?.["data"]?.["lotteryChances"] + "次机会");
                return;
            }
          } else {
            il1iI.code == 402 ? console.log("抽奖失败," + (il1iI?.["errMsg"] || "")) : (console.log("抽奖失败," + (il1iI?.["errMsg"] || "")), $.lhb4b_open = false);
          }
        }
      } catch (i1iIil) {
        $.logErr(i1iIil, iI1Iil);
      } finally {
        lill1I();
      }
    });
  });
}
async function Iil1li() {
  const II11I = {
      appId: "c06b7",
      functionId: "apTaskList",
      appid: "activities_platform",
      clientVersion: "12.2.0",
      client: "ios",
      body: {
        linkId: IlllIi
      },
      version: "4.1",
      ua: $.UA,
      t: true
    },
    il1i1 = await iIIiii.getH5st(II11I);
  let lIIiIi = {
    url: "https://api.m.jd.com",
    body: il1i1.params,
    headers: {
      origin: "https://lotterydraw-new.jd.com",
      Referer: "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA&sid=&un_area=4_133_58530_0",
      "User-Agent": $.UA,
      Cookie: I1iIIi,
      "content-type": "application/x-www-form-urlencoded",
      accept: "application/json, text/plain, */*"
    },
    timeout: 20000
  };
  return new Promise(i1iIll => {
    $.post(lIIiIi, async (l1i1I1, llIIil, llIIii) => {
      try {
        if (l1i1I1) {
          $.log(l1i1I1);
        } else {
          llIIii = JSON.parse(llIIii);
          if (llIIii?.["code"] == 0) {
            let llIIlI = llIIii?.["data"] || [];
            for (let Ii1I1l = 0; Ii1I1l < llIIlI.length; Ii1I1l++) {
              $.taskTitle = llIIlI[Ii1I1l].taskTitle;
              $.apTaskListid = llIIlI[Ii1I1l].id;
              $.taskType = llIIlI[Ii1I1l].taskType;
              $.taskSourceUrl = llIIlI[Ii1I1l].taskSourceUrl;
              $.taskDoTimes = llIIlI[Ii1I1l].taskDoTimes;
              $.taskFinished = llIIlI[Ii1I1l].taskFinished;
              $.taskShowTitle = llIIlI[Ii1I1l].taskShowTitle;
              if (!$.taskFinished && $.taskType.includes("BROWSE_")) {
                for (let IIlIl = 0; IIlIl < 1; IIlIl++) {
                  console.log("去做 " + $.taskTitle);
                  await Iiilil($.taskType, $.apTaskListid, $.taskSourceUrl);
                  await $.wait(parseInt(Math.random() * 1500 + 1500, 10));
                }
              }
            }
          } else {
            console.log("查询任务失败," + (llIIii?.["errMsg"] || llIIii?.["msg"] || ""));
          }
        }
      } catch (Iiilll) {
        $.log(Iiilll);
      } finally {
        i1iIll();
      }
    });
  });
}
async function Iiilil(IIlIi, ili11i, iiIi1l) {
  return new Promise(async IiiI1 => {
    const IIIiI = {
        appId: "54ed7",
        functionId: "apsDoTask",
        appid: "activities_platform",
        clientVersion: "12.2.0",
        client: "ios",
        body: {
          taskType: IIlIi,
          taskId: ili11i,
          channel: 4,
          checkVersion: true,
          linkId: IlllIi,
          itemId: iiIi1l
        },
        version: "4.1",
        ua: $.UA,
        t: true
      },
      iii1i1 = await iIIiii.getH5st(IIIiI);
    let IllIll = {
      url: "https://api.m.jd.com",
      body: iii1i1.params,
      headers: {
        origin: "https://lotterydraw-new.jd.com",
        Referer: "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA&sid=&un_area=4_133_58530_0",
        "User-Agent": $.UA,
        Cookie: I1iIIi,
        "content-type": "application/x-www-form-urlencoded",
        accept: "application/json, text/plain, */*"
      },
      timeout: 20000
    };
    $.post(IllIll, async (iI1IlI, l1i1Il, ill1I1) => {
      try {
        if (iI1IlI) {
          console.log("" + JSON.stringify(iI1IlI));
        } else {
          ill1I1 = JSON.parse(ill1I1);
          if (ill1I1.code == 0) {
            $.lotteryChances++;
            console.log("完成任务,抽奖次数：" + $.lotteryChances);
          } else {
            if (ill1I1.code == 402) {
              console.log("完成任务失败," + (ill1I1?.["errMsg"] || ""));
            } else {
              console.log("完成任务失败," + (ill1I1?.["errMsg"] || ""));
            }
          }
        }
      } catch (lilI1) {
        $.logErr(lilI1, l1i1Il);
      } finally {
        IiiI1();
      }
    });
  });
}
function Iil1ll(iI1Ili = "xxxxxxxxxxxxxxxxxxxx") {
  return iI1Ili.replace(/[xy]/g, function (IiiIl) {
    var ii1l1l = Math.random() * 10 | 0,
      l1lli1 = IiiIl == "x" ? ii1l1l : ii1l1l & 3 | 8;
    jdaid = l1lli1.toString();
    return jdaid;
  });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
