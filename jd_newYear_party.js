/*
京东跨年狂欢抽奖

只做任务，抽奖  无助力

cron "55 5 * * *" script-path=jd_newYear_party.js, tag=京东跨年狂欢抽奖

 */
let lnrun = 0;
const $ = new Env('京东跨年狂欢抽奖')
const lI1l1i = $.isNode() ? require("./function/sendNotify") : "",
      i1iil = $.isNode() ? require("./jdCookie.js") : "",
      llI11l = require("./function/krgetH5st"),
      I1llIl = require("./function/jdCommon");

let I1llIi = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
    IIii1I = "0123456789",
    llI11i = "qwertyuiopasdfghjklzxcvbnm",
    i1iIi1 = "jdd01" + iIIil1(111, IIii1I + I1llIi).toUpperCase(),
    l1l1il = "jdd03" + iIIil1(123, IIii1I + I1llIi).toUpperCase();
const I11i1I = {
  "2": "[支付券]",
  "3": "[优惠券]",
  "4": "[实物]",
  "5": "[红包]"
},
      iliIi1 = ["order"];
let l1l1ii = [],
    Il1i1I = "",
    Ii1iii;

if ($.isNode()) {
  Object.keys(i1iil).forEach(I1il1I => {
    l1l1ii.push(i1iil[I1il1I]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else l1l1ii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...Ii1iil($.getdata("CookiesJD") || "[]").map(II111 => II111.cookie)].filter(lI1l1I => !!lI1l1I);

!(async () => {
  if (!l1l1ii[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let Il1i1l = 0; Il1i1l < l1l1ii.length; Il1i1l++) {
    if (l1l1ii[Il1i1l]) {
      Il1i1I = l1l1ii[Il1i1l];
      $.UserName = decodeURIComponent(Il1i1I.match(/pt_pin=([^; ]+)(?=;?)/) && Il1i1I.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Il1i1l + 1;
      $.isLogin = true;
      $.nickName = "";
      Ii1iii = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await lI1l1i.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      $.jda = "__jda=" + IlllII("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = I1llIl.genUA($.UserName);
      await iIIilI();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(lill1I => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + lill1I + "!", "");
}).finally(() => {
  $.done();
});

async function iIIilI() {
  $.can_draw = true;
  $.nowcontinue = false;
  await Ilil1i();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
}

function il1l1(I1il11) {
  try {
    if (typeof JSON.parse(I1il11) == "object") return true;
  } catch (lIIiIl) {
    return console.log(lIIiIl), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function Ii1iil(i1iIii) {
  if (typeof i1iIii == "string") try {
    return JSON.parse(i1iIii);
  } catch (llIlIl) {
    return console.log(llIlIl), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

async function Ilil1i() {
  return new Promise(async i1iIli => {
    const i1iIll = {
      "appId": "c06b7",
      "functionId": "party_popUp",
      "appid": "spring_h5",
      "clientVersion": "12.2.0",
      "client": "ios",
      "body": {},
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          i1lliI = await llI11l.getH5st(i1iIll);
    let liI1l1 = {
      "url": "https://api-x.m.jd.com/",
      "body": i1lliI.params,
      "headers": {
        "origin": "https://pro.m.jd.com",
        "Referer": "https://pro.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": Il1i1I,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(liI1l1, async (IllIlI, IiillI, ili11I) => {
      try {
        if (IllIlI) {
          console.log("" + JSON.stringify(IllIlI));
        } else ili11I = JSON.parse(ili11I), ili11I?.["code"] == 0 ? ili11I?.["data"]?.["bizCode"] == 0 ? (await II11ii(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await iili1(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))) : console.log("进入活动失败," + (ili11I?.["code"] || "") + "," + (ili11I?.["message"] || "")) : console.log("进入活动失败," + (ili11I?.["code"] || "") + "," + (ili11I?.["message"] || ""));
      } catch (lliiIi) {
        $.logErr(lliiIi, IiillI);
      } finally {
        i1iIli();
      }
    });
  });
}

async function iili1() {
  return new Promise(async Iiilll => {
    const IIlIi = {
      "appId": "c06b7",
      "functionId": "party_home",
      "appid": "spring_h5",
      "clientVersion": "12.2.0",
      "client": "ios",
      "body": {},
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          ili11i = await llI11l.getH5st(IIlIi);
    let iiIi1l = {
      "url": "https://api-x.m.jd.com/",
      "body": ili11i.params,
      "headers": {
        "origin": "https://pro.m.jd.com",
        "Referer": "https://pro.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": Il1i1I,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(iiIi1l, async (l1i1Il, ill1I1, l1i1II) => {
      try {
        if (l1i1Il) console.log("" + JSON.stringify(l1i1Il));else {
          l1i1II = JSON.parse(l1i1II);

          if (l1i1II?.["code"] == 0) {
            if (l1i1II?.["data"]?.["bizCode"] == 0) {
              let IIIlI1 = l1i1II?.["data"]?.["result"]?.["round"]?.["remainTimes"] || 0;
              console.log("可以抽奖" + IIIlI1 + "次");

              while (IIIlI1-- > 0 && $.can_draw) {
                await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
                await II11il();
                await $.wait(parseInt(Math.random() * 1000 + 5000, 10));
              }
            } else console.log("进入首页失败," + (l1i1II?.["code"] || "") + "," + (l1i1II?.["message"] || ""));
          } else console.log("进入首页失败," + (l1i1II?.["code"] || "") + "," + (l1i1II?.["message"] || ""));
        }
      } catch (ii1l1l) {
        $.logErr(ii1l1l, ill1I1);
      } finally {
        Iiilll();
      }
    });
  });
}

async function II11ii() {
  return new Promise(async IIIli => {
    const IlI1lI = {
      "appId": "c06b7",
      "functionId": "party_task_list",
      "appid": "spring_h5",
      "clientVersion": "12.2.0",
      "client": "ios",
      "body": {},
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          liIIi = await llI11l.getH5st(IlI1lI);
    let IilllI = {
      "url": "https://api-x.m.jd.com/",
      "body": liIIi.params,
      "headers": {
        "origin": "https://pro.m.jd.com",
        "Referer": "https://pro.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": Il1i1I,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(IilllI, async (iI1lIi, l1lllI, llliIi) => {
      try {
        if (iI1lIi) console.log("" + JSON.stringify(iI1lIi));else {
          llliIi = JSON.parse(llliIi);

          if (llliIi?.["code"] == 0) {
            if (llliIi?.["data"]?.["bizCode"] == 0) {
              let llii1l = llliIi?.["data"]?.["result"]?.["taskList"] || [];

              for (let liIlil of llii1l.filter(llii1i => !llii1i.completionFlag)) {
                let ll11il = [],
                    iI1lIl = liIlil?.["ext"]?.["extraType"] || "";
                if (iliIi1.includes(iI1lIl)) continue;
                iI1lIl && (ll11il = liIlil?.["ext"][iI1lIl] || [], ll11il = ll11il.filter(Iili => Iili.status == 1));

                for (let iIi11 = liIlil.completionCnt; iIi11 < liIlil.assignmentTimesLimit; iIi11++) {
                  let Iil1 = undefined;

                  if (ll11il?.["length"]) {
                    let ll11lI = ll11il.pop();
                    Iil1 = ll11lI?.["itemId"];
                  }

                  await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
                  await Iil1iI(liIlil, 1, Iil1);
                  await $.wait(parseInt(Math.random() * 1000 + 5000, 10));
                }
              }
            } else console.log("查询任务失败," + (llliIi?.["code"] || "") + "," + (llliIi?.["message"] || ""));
          } else console.log("查询任务失败," + (llliIi?.["code"] || "") + "," + (llliIi?.["message"] || ""));
        }
      } catch (ll11l1) {
        $.logErr(ll11l1, l1lllI);
      } finally {
        IIIli();
      }
    });
  });
}

async function Iil1iI(l1lll1, IilI, liIlli) {
  return new Promise(async I1I1li => {
    let IlI1li = IilI == 0 ? "完成" : "开始";
    const IlI1ll = {
      "appId": "c06b7",
      "functionId": "party_do_task",
      "appid": "spring_h5",
      "clientVersion": "12.2.0",
      "client": "ios",
      "body": {
        "itemId": liIlli,
        "actionType": IilI,
        "taskType": l1lll1.assignmentType,
        "assignmentId": l1lll1.encryptAssignmentId,
        "extraType": l1lll1?.["ext"]?.["extraType"] || ""
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          ll11l = await llI11l.getH5st(IlI1ll);
    let III111 = {
      "url": "https://api-x.m.jd.com/",
      "body": ll11l.params,
      "headers": {
        "origin": "https://pro.m.jd.com",
        "Referer": "https://pro.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": Il1i1I,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(III111, async (Iliil, I1lIIl, l1ilI1) => {
      try {
        if (Iliil) console.log("" + JSON.stringify(Iliil));else {
          l1ilI1 = JSON.parse(l1ilI1);

          if (l1ilI1?.["code"] == 0) {
            if (l1ilI1?.["data"]?.["bizCode"] == 0) {
              console.log(IlI1li + "任务[" + l1lll1.assignmentName + "]成功");

              if (IilI == 1) {
                if (l1lll1?.["ext"]?.["waitDuration"]) await $.wait(l1lll1?.["ext"]?.["waitDuration"] * 1000);else l1lll1?.["ext"]?.["extraType"] == "shoppingActivity" && (await $.wait(6000));
                ret = await Iil1iI(l1lll1, 0, liIlli);
                await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
              } else ret = true;
            } else console.log("完成任务失败," + (l1ilI1?.["code"] || "") + "," + (l1ilI1?.["message"] || ""));
          } else console.log("完成任务失败," + (l1ilI1?.["code"] || "") + "," + (l1ilI1?.["message"] || ""));
        }
      } catch (lllII) {
        $.logErr(lllII, I1lIIl);
      } finally {
        I1I1li();
      }
    });
  });
}

async function II11il() {
  return new Promise(async II1l => {
    const II1i = {
      "appId": "c06b7",
      "functionId": "party_lottery",
      "appid": "spring_h5",
      "clientVersion": "12.2.0",
      "client": "ios",
      "body": {
        "areaInfo": "0_0_0_0",
        "deviceInfo": JSON.stringify({
          "sdkToken": i1iIi1,
          "jsToken": l1l1il
        }),
        "unpl": iIIil1(220, llI11i),
        "qdPageId": "MO-J2011-1",
        "mdClickId": "Babel_dev_other_11lotterystart"
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          illli1 = await llI11l.getH5st(II1i);
    let I1lII1 = {
      "url": "https://api-x.m.jd.com/",
      "body": illli1.params,
      "headers": {
        "origin": "https://pro.m.jd.com",
        "Referer": "https://pro.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": Il1i1I,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(I1lII1, async (II11, l1ilII, ii1II1) => {
      try {
        if (II11) console.log("" + JSON.stringify(II11));else {
          ii1II1 = JSON.parse(ii1II1);

          if (ii1II1?.["code"] == 0) {
            if (ii1II1?.["data"]?.["bizCode"] == 0) {
              let IIIIll = [],
                  liiiii = ii1II1?.["data"]?.["result"]?.["awardList"] || [];

              for (let II1I of liiiii) {
                let IliII1 = I11i1I[II1I.type] || "[type=" + II1I.type + "]",
                    l1iIi1 = IliII1 + II1I.name;

                switch (II1I.type) {
                  case 2:
                    {
                      l1iIi1 += II1I.discount + "元";
                      break;
                    }

                  case 5:
                    {
                      l1iIi1 += II1I.value + "元";
                      break;
                    }
                }

                IIIIll.push(l1iIi1);
              }

              !IIIIll.length && IIIIll.push("空气");
              console.log("抽奖: " + IIIIll.join(", "));
            } else {
              console.log("抽奖失败," + (ii1II1?.["code"] || "") + "," + (ii1II1?.["message"] || ""));
              ii1II1?.["includes"]("抽奖次数不足") && ($.can_draw = false);
            }
          } else console.log("抽奖失败," + (ii1II1?.["code"] || "") + "," + (ii1II1?.["message"] || ""));
        }
      } catch (IIIIi1) {
        $.logErr(IIIIi1, l1ilII);
      } finally {
        II1l();
      }
    });
  });
}

function iIIil1(ii1IIi) {
  ii1IIi = ii1IIi || 32;
  let I1ll1i = "abcdef0123456789",
      i11iII = I1ll1i.length,
      lI1Ii1 = "";

  for (i = 0; i < ii1IIi; i++) lI1Ii1 += I1ll1i.charAt(Math.floor(Math.random() * i11iII));

  return lI1Ii1;
}

function IlllII(IIiiII = "xxxxxxxxxxxxxxxxxxxx") {
  return IIiiII.replace(/[xy]/g, function (i11iI1) {
    var Iii1II = Math.random() * 10 | 0,
        llIlI = i11iI1 == "x" ? Iii1II : Iii1II & 3 | 8;
    return jdaid = llIlI.toString(), jdaid;
  });
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
