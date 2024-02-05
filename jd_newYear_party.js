/*
京东看春晚抽奖

只做任务，抽奖  无助力

cron "55 5 * * *" script-path=jd_newYear_party.js, tag=京东看春晚抽奖

 */
let lnrun = 0;
const $ = new Env('京东看春晚抽奖')
const IliIIl = $.isNode() ? require("./sendNotify") : "",
      I1il1l = $.isNode() ? require("./jdCookie") : "",
      lI1l1l = require("./utils/Rebels_jdCommon"),
      {
  H5st: IIliII
} = require("./utils/Rebels_H");

let Ill11I = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
    I1il1i = "0123456789",
    IliIIi = "qwertyuiopasdfghjklzxcvbnm",
    lI1l1i = "jdd01" + iIIilI(111, I1il1i + Ill11I).toUpperCase(),
    i1iil = "jdd03" + iIIilI(123, I1il1i + Ill11I).toUpperCase();
const llI11l = {
  "1": "[空气]",
  "2": "[支付券]",
  "3": "[优惠券]",
  "4": "[京东超市卡]",
  "5": "[红包]",
  "6": "[实物券]",
  "8": "[红包]"
},
      I1llIl = ["order"];
let i1iii = [],
    I1llIi = "",
    IIii1I;

if ($.isNode()) {
  Object.keys(I1il1l).forEach(Ii1iil => {
    i1iii.push(I1il1l[Ii1iil]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else i1iii = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...l1l1il($.getdata("CookiesJD") || "[]").map(Ilil1i => Ilil1i.cookie)].filter(iili1 => !!iili1);

!(async () => {
  if (!i1iii[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let Ii1iiI = 0; Ii1iiI < i1iii.length; Ii1iiI++) {
    if (i1iii[Ii1iiI]) {
      I1llIi = i1iii[Ii1iiI];
      $.UserName = decodeURIComponent(I1llIi.match(/pt_pin=([^; ]+)(?=;?)/) && I1llIi.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = Ii1iiI + 1;
      $.isLogin = true;
      $.nickName = "";
      IIii1I = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await IliIIl.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      $.jda = "__jda=" + il1l1("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = lI1l1l.genUA($.UserName);
      await llI11i();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(Iil1ii => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + Iil1ii + "!", "");
}).finally(() => {
  $.done();
});

async function llI11i() {
  $.can_draw = true;
  $.nowcontinue = false;
  await l1l1ii();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  await iliIi1();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
}

function i1iIi1(II11l) {
  try {
    if (typeof JSON.parse(II11l) == "object") return true;
  } catch (iI1Iil) {
    return console.log(iI1Iil), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function l1l1il(il1iI) {
  if (typeof il1iI == "string") try {
    return JSON.parse(il1iI);
  } catch (i1iIil) {
    return console.log(i1iIil), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

async function I11i1I() {
  return new Promise(async i1iIlI => {
    const liI1lI = {
      "appId": "c06b7",
      "functionId": "party_popUp",
      "appid": "spring_h5",
      "clientVersion": "12.3.1",
      "client": "ios",
      "body": {},
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          lIIiI1 = await IIliII.getH5st(liI1lI);
    let ll1I1 = {
      "url": "https://api-x.m.jd.com/",
      "body": lIIiI1.params,
      "headers": {
        "origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": I1llIi,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    console.log(ll1I1);
    $.post(ll1I1, async (lliiIi, iiIi1I, IllIl1) => {
      try {
        lliiIi ? console.log("" + JSON.stringify(lliiIi)) : (IllIl1 = JSON.parse(IllIl1), console.log(IllIl1), IllIl1?.["code"] == 0 ? IllIl1?.["data"]?.["bizCode"] == 0 ? (await l1l1ii(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await iliIi1(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10))) : console.log("进入活动失败," + (IllIl1?.["code"] || "") + "," + (IllIl1?.["message"] || "")) : console.log("进入活动失败," + (IllIl1?.["code"] || "") + "," + (IllIl1?.["message"] || "")));
      } catch (ill1II) {
        $.logErr(ill1II, iiIi1I);
      } finally {
        i1iIlI();
      }
    });
  });
}

async function iliIi1() {
  return new Promise(async Ii1I1I => {
    const l1iI1 = {
      "appId": "c06b7",
      "functionId": "party_home",
      "appid": "spring_h5",
      "clientVersion": "12.3.1",
      "client": "ios",
      "body": {},
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          lliiI1 = await IIliII.getH5st(l1iI1);
    let IiiI1 = {
      "url": "https://api-x.m.jd.com/",
      "body": lliiI1.params,
      "headers": {
        "origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": I1llIi,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(IiiI1, async (lilII, IIIiI, iii1i1) => {
      try {
        if (lilII) {
          console.log("" + JSON.stringify(lilII));
        } else {
          iii1i1 = JSON.parse(iii1i1);

          if (iii1i1?.["code"] == 0) {
            if (iii1i1?.["data"]?.["bizCode"] == 0) {
              let ii1Ii = iii1i1?.["data"]?.["result"]?.["round"]?.["remainTimes"] || 0;
              console.log("可以抽奖" + ii1Ii + "次");

              while (ii1Ii-- > 0 && $.can_draw) {
                await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
                await Ii1iii();
                await $.wait(parseInt(Math.random() * 1000 + 5000, 10));
              }
            } else console.log("进入首页失败," + (iii1i1?.["code"] || "") + "," + (iii1i1?.["message"] || ""));
          } else console.log("进入首页失败," + (iii1i1?.["code"] || "") + "," + (iii1i1?.["message"] || ""));
        }
      } catch (ii1il) {
        $.logErr(ii1il, IIIiI);
      } finally {
        Ii1I1I();
      }
    });
  });
}

async function l1l1ii() {
  return new Promise(async llIl1l => {
    const ii1i1 = {
      "appId": "c06b7",
      "functionId": "party_task_list",
      "appid": "spring_h5",
      "clientVersion": "12.3.1",
      "client": "ios",
      "body": {},
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          Iiii = await IIliII.getH5st(ii1i1);
    let llIl11 = {
      "url": "https://api-x.m.jd.com/",
      "body": Iiii.params,
      "headers": {
        "origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": I1llIi,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(llIl11, async (IIIll, I1I1il, l1llii) => {
      try {
        if (IIIll) console.log("" + JSON.stringify(IIIll));else {
          l1llii = JSON.parse(l1llii);

          if (l1llii?.["code"] == 0) {
            if (l1llii?.["data"]?.["bizCode"] == 0) {
              let l1llil = l1llii?.["data"]?.["result"]?.["taskList"] || [];

              for (let IIIlIi of l1llil.filter(llIl1I => !llIl1I.completionFlag)) {
                let i1lIl1 = [],
                    liIli1 = IIIlIi?.["ext"]?.["extraType"] || "";
                if (I1llIl.includes(liIli1)) continue;
                liIli1 && (i1lIl1 = IIIlIi?.["ext"][liIli1] || [], i1lIl1 = i1lIl1.filter(IIIlI => IIIlI.status == 1));

                for (let IiiI = IIIlIi.completionCnt; IiiI < IIIlIi.assignmentTimesLimit; IiiI++) {
                  let iIi1i = undefined;

                  if (i1lIl1?.["length"]) {
                    let l1iIll = i1lIl1.pop();
                    iIi1i = l1iIll?.["itemId"];
                  }

                  await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
                  await Il1i1I(IIIlIi, 1, iIi1i);
                  await $.wait(parseInt(Math.random() * 1000 + 5000, 10));
                }
              }
            } else console.log("查询任务失败," + (l1llii?.["code"] || "") + "," + (l1llii?.["message"] || ""));
          } else console.log("查询任务失败," + (l1llii?.["code"] || "") + "," + (l1llii?.["message"] || ""));
        }
      } catch (i1lIlI) {
        $.logErr(i1lIlI, I1I1il);
      } finally {
        llIl1l();
      }
    });
  });
}

async function Il1i1I(I1I1iI, IIIlII, iiIiI1) {
  return new Promise(async llii1l => {
    let llii1i = IIIlII == 0 ? "完成" : "开始";
    const ll11il = {
      "appId": "c06b7",
      "functionId": "party_do_task",
      "appid": "spring_h5",
      "clientVersion": "12.3.1",
      "client": "ios",
      "body": {
        "itemId": iiIiI1,
        "actionType": IIIlII,
        "taskType": I1I1iI.assignmentType,
        "assignmentId": I1I1iI.encryptAssignmentId,
        "extraType": I1I1iI?.["ext"]?.["extraType"] || ""
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          iI1lIl = await IIliII.getH5st(ll11il);
    let iiIiII = {
      "url": "https://api-x.m.jd.com/",
      "body": iI1lIl.params,
      "headers": {
        "origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": I1llIi,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(iiIiII, async (Iil1, ll11lI, llliI1) => {
      try {
        if (Iil1) {
          console.log("" + JSON.stringify(Iil1));
        } else {
          llliI1 = JSON.parse(llliI1);

          if (llliI1?.["code"] == 0) {
            if (llliI1?.["data"]?.["bizCode"] == 0) {
              console.log(llii1i + "任务[" + I1I1iI.assignmentName + "]成功");

              if (IIIlII == 1) {
                if (I1I1iI?.["ext"]?.["waitDuration"]) await $.wait(I1I1iI?.["ext"]?.["waitDuration"] * 1000);else I1I1iI?.["ext"]?.["extraType"] == "shoppingActivity" && (await $.wait(6000));
                ret = await Il1i1I(I1I1iI, 0, iiIiI1);
                await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
              } else ret = true;
            } else llliI1?.["data"]?.["code"] == 103 ? console.log("完成任务失败," + (llliI1?.["data"]?.["bizMsg"] || "")) : console.log("完成任务失败," + (llliI1?.["data"]?.["bizMsg"] || ""));
          } else console.log("完成任务失败," + (llliI1?.["code"] || "") + "," + (llliI1?.["message"] || ""));
        }
      } catch (liIliI) {
        $.logErr(liIliI, ll11lI);
      } finally {
        llii1l();
      }
    });
  });
}

async function Ii1iii() {
  return new Promise(async iI1lI1 => {
    const l1i11 = {
      "appId": "c06b7",
      "functionId": "party_lottery",
      "appid": "spring_h5",
      "clientVersion": "12.3.1",
      "client": "ios",
      "body": {
        "areaInfo": "0_0_0_0",
        "deviceInfo": JSON.stringify({
          "sdkToken": lI1l1i,
          "jsToken": i1iil
        }),
        "unpl": iIIilI(220, IliIIi),
        "qdPageId": "MO-J2011-1",
        "mdClickId": "Babel_dev_other_11lotterystart"
      },
      "version": "4.3",
      "ua": $.UA,
      "t": true
    },
          IlI1li = await IIliII.getH5st(l1i11);
    let IlI1ll = {
      "url": "https://api-x.m.jd.com/",
      "body": IlI1li.params,
      "headers": {
        "origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": I1llIi,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(IlI1ll, async (liIll1, l1llli, iI1lII) => {
      try {
        if (liIll1) console.log("" + JSON.stringify(liIll1));else {
          iI1lII = JSON.parse(iI1lII);

          if (iI1lII?.["code"] == 0) {
            if (iI1lII?.["data"]?.["bizCode"] == 0) {
              let liiiil = [],
                  IIIIli = iI1lII?.["data"]?.["result"]?.["awardList"] || [];

              for (let lllIi of IIIIli) {
                let lllIl = llI11l[lllIi.type] || "[type=" + lllIi.type + "]",
                    Iliii = "";

                switch (lllIi.type) {
                  case 1:
                    {
                      Iliii = lllIl;
                      break;
                    }

                  case 2:
                    {
                      Iliii = lllIl + (lllIi.discount + "元");
                      break;
                    }

                  case 3:
                    {
                      Iliii = lllIl + lllIi.name;
                      break;
                    }

                  case 8:
                  case 5:
                    {
                      Iliii = lllIl + (lllIi.value + "元");
                      break;
                    }

                  case 6:
                    {
                      Iliii = lllIl + lllIi.name;
                      console.log("抽到实物: " + Iliii);
                      break;
                    }

                  case 4:
                  default:
                    {
                      Iliii = lllIl + lllIi.name;
                      break;
                    }
                }

                !llI11l[lllIi.type] && console.log("抽奖未知类型: " + JSON.stringify(lllIi));
                liiiil.push(Iliii);
              }

              !liiiil.length && liiiil.push("[空气]");
              console.log("抽奖: " + liiiil.join(", "));
            } else console.log("抽奖失败," + (iI1lII?.["code"] || "") + "," + (iI1lII?.["message"] || "")), iI1lII?.["includes"]("抽奖次数不足") && ($.can_draw = false);
          } else console.log("抽奖失败," + (iI1lII?.["code"] || "") + "," + (iI1lII?.["message"] || ""));
        }
      } catch (Iliil) {
        $.logErr(Iliil, l1llli);
      } finally {
        iI1lI1();
      }
    });
  });
}

function iIIilI(l1ilI1) {
  l1ilI1 = l1ilI1 || 32;
  let lil1I = "abcdef0123456789",
      l1l1Ii = lil1I.length,
      IIIIlI = "";

  for (i = 0; i < l1ilI1; i++) IIIIlI += lil1I.charAt(Math.floor(Math.random() * l1l1Ii));

  return IIIIlI;
}

function il1l1(IliiI = "xxxxxxxxxxxxxxxxxxxx") {
  return IliiI.replace(/[xy]/g, function (IIiiIi) {
    var l1ilIi = Math.random() * 10 | 0,
        l11iIi = IIiiIi == "x" ? l1ilIi : l1ilIi & 3 | 8;
    return jdaid = l11iIi.toString(), jdaid;
  });
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
