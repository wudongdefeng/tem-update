/*
京东看春晚抽奖

只做任务，抽奖  无助力

cron "1 0 * * *" script-path=jd_newYear_party.js, tag=京东看春晚抽奖

 */

const $ = new Env('京东看春晚抽奖')
const notify = $.isNode() ? require('./sendNotify') : ''
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const common = require('./function/jdCommon')
const { H5st } = require('./function/jdCrypto')

let ALL_CHAR = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM",
    ALL_DIGIT = "0123456789",
    ALL_ALPHABET = "qwertyuiopasdfghjklzxcvbnm",
    sdkToken = "jdd01" + randomString(111, ALL_DIGIT + ALL_CHAR).toUpperCase(),
    jsToken = "jdd03" + randomString(123, ALL_DIGIT + ALL_CHAR).toUpperCase();
const prize_type = {
  1: "[空气]",
  2: "[支付券]",
  3: "[优惠券]",
  4: "[京东超市卡]",
  5: "[红包]",
  6: "[实物券]",
  8: "[红包]"
},
      skip_task = ["order"];
let cookiesArr = [],
    cookie = "",
    message;

if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(il1lIIll => {
    cookiesArr.push(jdCookieNode[il1lIIll]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(IlIllll1 => IlIllll1.cookie)].filter(lII1Ii1i => !!lII1Ii1i);

!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  for (let lii1lI1i = 0; lii1lI1i < cookiesArr.length; lii1lI1i++) {
    if (cookiesArr[lii1lI1i]) {
      cookie = cookiesArr[lii1lI1i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = lii1lI1i + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      $.jda = "__jda=" + _jda("1xxxxxxxx.164xxxxxxxxxxxxxxxxxxx.164xxxxxxx.165xxxxxx.165xxxxxx.1xx");
      $.UA = common.genUA($.UserName);
      await Main();
      await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
    }
  }
})().catch(li1IIii1 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + li1IIii1 + "!", "");
}).finally(() => {
  $.done();
});

async function Main() {
  $.can_draw = true;
  $.nowcontinue = false;
  await party_task_list();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
  await party_home();
  await $.wait(parseInt(Math.random() * 1000 + 1000, 10));
}

function safeGet(iIl1iIll) {
  try {
    if (typeof JSON.parse(iIl1iIll) == "object") return true;
  } catch (Ii11ll1l) {
    return console.log(Ii11ll1l), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function jsonParse(IiiiIliI) {
  if (typeof IiiiIliI == "string") {
    try {
      return JSON.parse(IiiiIliI);
    } catch (l111I11i) {
      return console.log(l111I11i), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}

async function party_popUp() {
  return new Promise(async liIlii1 => {
    const Iill1liI = {
      "appId": "b1660",
      "functionId": "party_popUp",
      "appid": "spring_h5",
      "clientVersion": "1.0.0",
      "client": "wh5",
      "body": {},
      "version": "4.4",
      "ua": $.UA,
      "t": true
    },
          Illl1llI = await H5st.getH5st(Iill1liI);
    let I1li = {
      "url": "https://api-x.m.jd.com/",
      "body": Illl1llI.params,
      "headers": {
        "origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": cookie,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    console.log(I1li);
    $.post(I1li, async (liIii, ilIlI, iIII111) => {
      try {
        if (liIii) console.log("" + JSON.stringify(liIii));else {
          iIII111 = JSON.parse(iIII111);
          console.log(iIII111);

          if (iIII111?.["code"] == 0) {
            if (iIII111?.["data"]?.["bizCode"] == 0) await party_task_list(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10)), await party_home(), await $.wait(parseInt(Math.random() * 1000 + 1000, 10));else {
              console.log("进入活动失败," + (iIII111?.["code"] || "") + "," + (iIII111?.["message"] || ""));
            }
          } else console.log("进入活动失败," + (iIII111?.["code"] || "") + "," + (iIII111?.["message"] || ""));
        }
      } catch (i11l1lII) {
        $.logErr(i11l1lII, ilIlI);
      } finally {
        liIlii1();
      }
    });
  });
}

async function party_home() {
  return new Promise(async Il1lIi11 => {
    const IiIi1ill = {
      "appId": "b1660",
      "functionId": "party_home",
      "appid": "spring_h5",
      "clientVersion": "1.0.0",
      "client": "wh5",
      "body": {
        "areaInfo": "",
        "unpl": "",
        "sendTime": Date.now(),
        "refresh": null
      },
      "version": "4.4",
      "ua": $.UA
    },
          IilI11l1 = await H5st.getH5st(IiIi1ill);
    let IliIIl1i = {
      "url": "https://api-x.m.jd.com/",
      "body": IilI11l1.params + "&d_model=0-2-999&osVersion=17.3",
      "headers": {
        "origin": "https://pro.m.jd.com",
        "Referer": "https://pro.m.jd.com/mall/active/4TeSpXMCG6Kwy63rTeRDUp6wfL4n/index.html",
        "User-Agent": $.UA,
        "Cookie": cookie,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(IliIIl1i, async (i1il11l1, l1lil, Iil1li1I) => {
      try {
        if (i1il11l1) console.log("" + JSON.stringify(i1il11l1));else {
          Iil1li1I = JSON.parse(Iil1li1I);

          if (Iil1li1I?.["code"] == 0) {
            if (Iil1li1I?.["data"]?.["bizCode"] == 0) {
              let ill11l11 = Iil1li1I?.["data"]?.["result"]?.["round"]?.["remainTimes"] || 0;
              console.log("可以抽奖" + ill11l11 + "次");

              while (ill11l11-- > 0 && $.can_draw) {
                await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
                await party_lottery();
                await $.wait(parseInt(Math.random() * 1000 + 5000, 10));
              }
            } else console.log("进入首页失败," + (Iil1li1I?.["code"] || "") + "," + (Iil1li1I?.["message"] || ""));
          } else console.log("进入首页失败," + (Iil1li1I?.["code"] || "") + "," + (Iil1li1I?.["message"] || ""));
        }
      } catch (I1lIl11I) {
        $.logErr(I1lIl11I, l1lil);
      } finally {
        Il1lIi11();
      }
    });
  });
}

async function party_task_list() {
  return new Promise(async lI11111i => {
    const ll1l1ll1 = {
      "appId": "b1660",
      "functionId": "party_task_list",
      "appid": "spring_h5",
      "clientVersion": "1.0.0",
      "client": "wh5",
      "body": {},
      "version": "4.4",
      "ua": $.UA,
      "t": true
    },
          IIIi11ii = await H5st.getH5st(ll1l1ll1);
    let llilili = {
      "url": "https://api-x.m.jd.com/",
      "body": IIIi11ii.params,
      "headers": {
        "origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": cookie,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(llilili, async (IlI111l, lIilIi1l, ilIIiiI) => {
      try {
        if (IlI111l) console.log("" + JSON.stringify(IlI111l));else {
          ilIIiiI = JSON.parse(ilIIiiI);

          if (ilIIiiI?.["code"] == 0) {
            if (ilIIiiI?.["data"]?.["bizCode"] == 0) {
              let lI11iiI1 = ilIIiiI?.["data"]?.["result"]?.["taskList"] || [];

              for (let ii1iII1i of lI11iiI1.filter(llI1iII => !llI1iII.completionFlag)) {
                let lIlI1Iil = [],
                    iii1I1i = ii1iII1i?.["ext"]?.["extraType"] || "";
                if (skip_task.includes(iii1I1i)) continue;
                iii1I1i && (lIlI1Iil = ii1iII1i?.["ext"][iii1I1i] || [], lIlI1Iil = lIlI1Iil.filter(II1iiIIi => II1iiIIi.status == 1));

                for (let I1IlIiIi = ii1iII1i.completionCnt; I1IlIiIi < ii1iII1i.assignmentTimesLimit; I1IlIiIi++) {
                  let iiiIIil1 = undefined;

                  if (lIlI1Iil?.["length"]) {
                    let IllIllI1 = lIlI1Iil.pop();
                    iiiIIil1 = IllIllI1?.["itemId"];
                  }

                  await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
                  await party_do_task(ii1iII1i, 1, iiiIIil1);
                  await $.wait(parseInt(Math.random() * 1000 + 5000, 10));
                }
              }
            } else console.log("查询任务失败," + (ilIIiiI?.["code"] || "") + "," + (ilIIiiI?.["message"] || ""));
          } else console.log("查询任务失败," + (ilIIiiI?.["code"] || "") + "," + (ilIIiiI?.["message"] || ""));
        }
      } catch (I1lliIil) {
        $.logErr(I1lliIil, lIilIi1l);
      } finally {
        lI11111i();
      }
    });
  });
}

async function party_do_task(i1ill11, llIi1lIl, lilIiIi) {
  return new Promise(async Ili1lliI => {
    let i1l11ilI = llIi1lIl == 0 ? "完成" : "开始";
    const I1Il1ilI = {
      "appId": "b1660",
      "functionId": "party_do_task",
      "appid": "spring_h5",
      "clientVersion": "1.0.0",
      "client": "wh5",
      "body": {
        "itemId": lilIiIi,
        "actionType": llIi1lIl,
        "taskType": i1ill11.assignmentType,
        "assignmentId": i1ill11.encryptAssignmentId,
        "extraType": i1ill11?.["ext"]?.["extraType"] || ""
      },
      "version": "4.4",
      "ua": $.UA,
      "t": true
    },
          IIli1I11 = await H5st.getH5st(I1Il1ilI);
    let IIIlilli = {
      "url": "https://api-x.m.jd.com/",
      "body": IIli1I11.params,
      "headers": {
        "origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": cookie,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(IIIlilli, async (I1IllII1, lIilII1I, ililIlli) => {
      try {
        if (I1IllII1) console.log("" + JSON.stringify(I1IllII1));else {
          ililIlli = JSON.parse(ililIlli);

          if (ililIlli?.["code"] == 0) {
            if (ililIlli?.["data"]?.["bizCode"] == 0) {
              console.log(i1l11ilI + "任务[" + i1ill11.assignmentName + "]成功");

              if (llIi1lIl == 1) {
                if (i1ill11?.["ext"]?.["waitDuration"]) await $.wait(i1ill11?.["ext"]?.["waitDuration"] * 1000);else i1ill11?.["ext"]?.["extraType"] == "shoppingActivity" && (await $.wait(6000));
                ret = await party_do_task(i1ill11, 0, lilIiIi);
                await $.wait(parseInt(Math.random() * 1000 + 3000, 10));
              } else ret = true;
            } else ililIlli?.["data"]?.["code"] == 103 ? console.log("完成任务失败," + (ililIlli?.["data"]?.["bizMsg"] || "")) : console.log("完成任务失败," + (ililIlli?.["data"]?.["bizMsg"] || ""));
          } else console.log("完成任务失败," + (ililIlli?.["code"] || "") + "," + (ililIlli?.["message"] || ""));
        }
      } catch (ili1Iiil) {
        $.logErr(ili1Iiil, lIilII1I);
      } finally {
        Ili1lliI();
      }
    });
  });
}

async function party_lottery() {
  return new Promise(async I1iIilll => {
    const iIIIlii = {
      "appId": "b1660",
      "functionId": "party_lottery",
      "appid": "spring_h5",
      "clientVersion": "1.0.0",
      "client": "wh5",
      "body": {
        "areaInfo": "0_0_0_0",
        "deviceInfo": JSON.stringify({
          "sdkToken": sdkToken,
          "jsToken": jsToken
        }),
        "unpl": randomString(220, ALL_ALPHABET),
        "qdPageId": "MO-J2011-1",
        "mdClickId": "Babel_dev_other_11lotterystart"
      },
      "version": "4.4",
      "ua": $.UA,
      "t": true
    },
          IiillIi = await H5st.getH5st(iIIIlii);
    let iiilIIli = {
      "url": "https://api-x.m.jd.com/",
      "body": IiillIi.params + "&d_model=0-2-999&osVersion=17.3",
      "headers": {
        "origin": "https://prodev.m.jd.com",
        "Referer": "https://prodev.m.jd.com/mall/active/2wVcxotdeVGtYzshpn4gBQkx2cnN/index.html",
        "User-Agent": $.UA,
        "Cookie": cookie,
        "content-type": "application/x-www-form-urlencoded",
        "accept": "application/json, text/plain, */*"
      },
      "timeout": 20 * 1000
    };
    $.post(iiilIIli, async (i111i1lI, iIllliil, Iill1IIl) => {
      try {
        if (i111i1lI) {
          console.log("" + JSON.stringify(i111i1lI));
        } else {
          Iill1IIl = JSON.parse(Iill1IIl);

          if (Iill1IIl?.["code"] == 0) {
            if (Iill1IIl?.["data"]?.["bizCode"] == 0) {
              let li1IIil1 = [],
                  IIll1iI1 = Iill1IIl?.["data"]?.["result"]?.["awardList"] || [];

              for (let ilillli of IIll1iI1) {
                let IiilIlIi = prize_type[ilillli.type] || "[type=" + ilillli.type + "]",
                    iI1IIIIi = "";

                switch (ilillli.type) {
                  case 1:
                    {
                      iI1IIIIi = IiilIlIi;
                      break;
                    }

                  case 2:
                    {
                      iI1IIIIi = IiilIlIi + (ilillli.discount + "元");
                      break;
                    }

                  case 3:
                    {
                      iI1IIIIi = IiilIlIi + ilillli.name;
                      break;
                    }

                  case 8:
                  case 5:
                    {
                      iI1IIIIi = IiilIlIi + (ilillli.value + "元");
                      break;
                    }

                  case 6:
                    {
                      iI1IIIIi = IiilIlIi + ilillli.name;
                      console.log("抽到实物: " + iI1IIIIi);
                      break;
                    }

                  case 4:
                  default:
                    {
                      iI1IIIIi = IiilIlIi + ilillli.name;
                      break;
                    }
                }

                !prize_type[ilillli.type] && console.log("抽奖未知类型: " + JSON.stringify(ilillli));
                li1IIil1.push(iI1IIIIi);
              }

              !li1IIil1.length && li1IIil1.push("[空气]");
              console.log("抽奖: " + li1IIil1.join(", "));
            } else console.log("抽奖失败," + (Iill1IIl?.["code"] || "") + "," + (Iill1IIl?.["message"] || "")), Iill1IIl?.["includes"]("抽奖次数不足") && ($.can_draw = false);
          } else console.log("抽奖失败," + (Iill1IIl?.["code"] || "") + "," + (Iill1IIl?.["message"] || ""));
        }
      } catch (iI11llIl) {
        $.logErr(iI11llIl, iIllliil);
      } finally {
        I1iIilll();
      }
    });
  });
}

function randomString(iiiI1lll) {
  iiiI1lll = iiiI1lll || 32;
  let iIIlIi1i = "abcdef0123456789",
      IlIiilIl = iIIlIi1i.length,
      lliI1lII = "";

  for (i = 0; i < iiiI1lll; i++) lliI1lII += iIIlIi1i.charAt(Math.floor(Math.random() * IlIiilIl));

  return lliI1lII;
}

function _jda(IiIil11l = "xxxxxxxxxxxxxxxxxxxx") {
  return IiIil11l.replace(/[xy]/g, function (IlI1111i) {
    var ilii1Ii1 = Math.random() * 10 | 0,
        IIiI1l1 = IlI1111i == "x" ? ilii1Ii1 : ilii1Ii1 & 3 | 8;
    return jdaid = IIiI1l1.toString(), jdaid;
  });
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
