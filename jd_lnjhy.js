/*
 33 3 17-31,1-4 1,2 * jd_lnjhy.js
 */
let lnrun = 0;

const $ = new Env('龙年接好运');
const _0xfc9da3 = $.isNode() ? require("./sendNotify") : "",
      _0x5e1a84 = $.isNode() ? require("./jdCookie.js") : "",
      _0x350fe8 = require("./USER_AGENTS"),
      _0x25086e = require("./function/dylany");

let _0x3b5215 = true,
    _0x10ea8 = [],
    _0x55ca16 = "",
    _0xa9eb5 = "";

if ($.isNode()) {
  Object.keys(_0x5e1a84).forEach(_0x118f14 => {
    _0x10ea8.push(_0x5e1a84[_0x118f14]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x10ea8 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x44cb1b($.getdata("CookiesJD") || "[]").map(_0x59a136 => _0x59a136.cookie)].filter(_0x5bdb3c => !!_0x5bdb3c);

!(async () => {
  if (!_0x10ea8[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  console.log("TG频道：https://t.me/dylan_jdpro\n");

  for (let _0x3421d3 = 0; _0x3421d3 < _0x10ea8.length; _0x3421d3++) {
    if (_0x10ea8[_0x3421d3]) {
      _0x55ca16 = _0x10ea8[_0x3421d3];
      $.UserName = decodeURIComponent(_0x55ca16.match(/pt_pin=([^; ]+)(?=;?)/) && _0x55ca16.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x3421d3 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.UA = _0x350fe8.UARAM ? _0x350fe8.UARAM() : _0x350fe8.USER_AGENT;
      await _0x1c45a4();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0xfc9da3.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      let _0x29a32d = await _0x1f7df5();

      if (_0x29a32d.length != 0) {
        console.log("\n去做任务...");

        for (let _0x11449a of _0x29a32d) {
          if (_0x11449a.taskTitle === "邀请好友") continue;

          if (_0x11449a.taskFinished) {
            console.log(_0x11449a.taskShowTitle + " ---- 已完成");
            continue;
          }

          console.log("去做任务 " + _0x11449a.taskShowTitle);

          let _0xa96cfa = await _0x351b84(_0x11449a.taskType, _0x11449a.id);

          if (_0xa96cfa.code) break;

          for (let _0x47c390 of _0xa96cfa) {
            await _0x4a1682(_0x47c390.itemId, _0x11449a.taskType, _0x11449a.id);
            await $.wait(2000);
          }
        }
      }

      await _0x1e4ea9();
      await $.wait(1000);

      if ($.remainchance > 0) {
        $.log("\n开始抽奖开红包...");

        for (let _0x29ba58 = 0; _0x29ba58 < $.remainchance; _0x29ba58++) {
          $.log("第" + (_0x29ba58 + 1) + "次抽奖：");
          await _0x3ff6b2();
          await $.wait(2000);
        }
      }

      await $.wait(2000);
    }
  }
})().catch(_0x4b9120 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x4b9120 + "!", "");
}).finally(() => {
  $.done();
});

async function _0x1e4ea9() {
  let _0x2938ed = {
    "linkId": "JmtlNs_2vMgn1nnYloulqA",
    "taskId": "",
    "inviter": ""
  },
      _0x11604d = {
    "appId": "d7439",
    "fn": "lotteryMachineHome",
    "body": _0x2938ed,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "ua": $.UA
  };
  _0x2938ed = await _0x25086e.getbody(_0x11604d);
  if (!_0x2938ed) return;
  return new Promise(async _0x3d5783 => {
    $.post(_0x20e98f(_0x2938ed), async (_0x211873, _0x25529f, _0xf8907a) => {
      try {
        if (_0x211873) {
          console.log("" + JSON.stringify(_0x211873));
          console.log(" API请求失败，请检查网路重试");
        } else _0xf8907a = JSON.parse(_0xf8907a), _0xf8907a.code == 0 ? $.remainchance = _0xf8907a.data.remainTimes || 0 : console.log(_0xf8907a.errMsg);
      } catch (_0x679ec3) {
        $.logErr(_0x679ec3, _0x25529f);
      } finally {
        _0x3d5783(_0xf8907a);
      }
    });
  });
}

async function _0x1f7df5() {
  let _0x2e8287 = "";
  return new Promise(async _0x3fe983 => {
    $.post(_0x20e98f("functionId=apTaskList&body=%7B%22linkId%22%3A%22JmtlNs_2vMgn1nnYloulqA%22%7D&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0"), async (_0x101abb, _0x2ae0b8, _0x3e69c8) => {
      try {
        _0x101abb ? (console.log("" + JSON.stringify(_0x101abb)), console.log(" API请求失败，请检查网路重试")) : (_0x3e69c8 = JSON.parse(_0x3e69c8), _0x3e69c8.code == 0 ? _0x2e8287 = _0x3e69c8.data : console.log(_0x3e69c8.msg));
      } catch (_0x4effff) {
        $.logErr(_0x4effff, _0x2ae0b8);
      } finally {
        _0x3fe983(_0x2e8287);
      }
    });
  });
}

async function _0x3ff6b2() {
  let _0x94af38 = {
    "linkId": "JmtlNs_2vMgn1nnYloulqA"
  },
      _0x12628e = {
    "appId": "d7439",
    "fn": "lotteryMachineDraw",
    "body": _0x94af38,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "xcr": 1,
    "ua": $.UA
  };
  _0x94af38 = await _0x25086e.getbody(_0x12628e);
  if (!_0x94af38) return;
  return new Promise(async _0x50efe4 => {
    $.post(_0x20e98f(_0x94af38), async (_0x3d0287, _0x2bb081, _0x1e6772) => {
      try {
        if (_0x3d0287) {
          console.log("" + JSON.stringify(_0x3d0287));
          console.log(" API请求失败，请检查网路重试");
        } else console.log(_0x1e6772), _0x1e6772 = JSON.parse(_0x1e6772), _0x1e6772.code == 0 ? _0x1e6772.data.prizeConfigName ? console.log(_0x1e6772.data.amount + " " + _0x1e6772.data.prizeConfigName) : console.log("空气") : console.log(_0x1e6772.msg);
      } catch (_0x3177a0) {
        $.logErr(_0x3177a0, _0x2bb081);
      } finally {
        _0x50efe4();
      }
    });
  });
}

async function _0x4a1682(_0x3b3f73, _0x2cf234, _0x49881e) {
  let _0x486580 = {
    "taskType": "" + _0x2cf234,
    "taskId": _0x49881e,
    "channel": 4,
    "checkVersion": true,
    "cityId": 0,
    "provinceId": 0,
    "countyId": 0,
    "linkId": "JmtlNs_2vMgn1nnYloulqA",
    "taskInsert": false,
    "resourceType": null,
    "itemId": "" + _0x3b3f73
  },
      _0x137625 = {
    "appId": "54ed7",
    "fn": "apsDoTask",
    "body": _0x486580,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "xcr": 1,
    "ua": $.UA
  };
  _0x486580 = await _0x25086e.getbody(_0x137625);
  if (!_0x486580) return;
  return new Promise(async _0x45d8c8 => {
    $.post(_0x20e98f(_0x486580), async (_0x2ded16, _0x88148b, _0x1ca14a) => {
      try {
        if (_0x2ded16) console.log("" + JSON.stringify(_0x2ded16)), console.log(" API请求失败，请检查网路重试");else {
          _0x1ca14a = JSON.parse(_0x1ca14a);
          if (_0x1ca14a.code == 0) $.log("任务成功，抽奖次数 +" + _0x1ca14a.data.awardInfo[0].factAwardNum);else {
            console.log(_0x1ca14a.msg);
          }
        }
      } catch (_0x2f40e4) {
        $.logErr(_0x2f40e4, _0x88148b);
      } finally {
        _0x45d8c8();
      }
    });
  });
}

async function _0x351b84(_0x5e549e, _0x47d077) {
  let _0x2b7e45 = "functionId=apTaskDetail&body={\"taskType\":\"" + _0x5e549e + "\",\"taskId\":" + _0x47d077 + ",\"channel\":4,\"checkVersion\":true,\"cityId\":0,\"provinceId\":0,\"countyId\":0,\"linkId\":\"JmtlNs_2vMgn1nnYloulqA\"}&t=1705983706332&appid=activities_platform&client=android&clientVersion=12.3.2&loginType=2&loginWQBiz=wegame&h5st=null";

  return new Promise(async _0x1ac3e9 => {
    $.post(_0x20e98f(_0x2b7e45), async (_0x3e0d2f, _0x436028, _0x81a54a) => {
      try {
        _0x3e0d2f ? (console.log("" + JSON.stringify(_0x3e0d2f)), console.log(" API请求失败，请检查网路重试")) : (_0x81a54a = JSON.parse(_0x81a54a), _0x81a54a.code == 0 ? _0x81a54a = _0x81a54a.data.taskItemList : console.log(_0x81a54a.errMsg));
      } catch (_0x437ef9) {
        $.logErr(_0x437ef9, _0x436028);
      } finally {
        _0x1ac3e9(_0x81a54a);
      }
    });
  });
}

async function _0x522822(_0x5388f0, _0x487906) {
  let _0x55e331 = {
    "linkId": "l-yLvQMhLwCqYy6_nXUBgg",
    "taskId": _0x5388f0,
    "itemId": encodeURIComponent(_0x487906),
    "channel": 4
  };
  return _0x55e331 = "functionId=apStartTaskTime&body=" + JSON.stringify(_0x55e331) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0", new Promise(async _0x53c59c => {
    $.post(_0x20e98f(_0x55e331), async (_0x656013, _0x3b4193, _0x2cfb6e) => {
      try {
        if (_0x656013) {
          console.log("" + JSON.stringify(_0x656013));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x2cfb6e = JSON.parse(_0x2cfb6e);

          if (_0x2cfb6e.code == 0) {} else console.log(_0x2cfb6e.errMsg);
        }
      } catch (_0x327768) {
        $.logErr(_0x327768, _0x3b4193);
      } finally {
        _0x53c59c(_0x2cfb6e);
      }
    });
  });
}

async function _0x2b2848(_0x2301b9) {
  let _0x490b24 = {
    "linkId": "l-yLvQMhLwCqYy6_nXUBgg",
    "taskId": _0x2301b9
  };
  return _0x490b24 = "functionId=apCheckAndResetTaskTime&body=" + JSON.stringify(_0x490b24) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0", new Promise(async _0x10e0d4 => {
    $.post(_0x20e98f(_0x490b24), async (_0x357401, _0x582a3f, _0x427e0a) => {
      try {
        if (_0x357401) console.log("" + JSON.stringify(_0x357401)), console.log(" API请求失败，请检查网路重试");else {
          _0x427e0a = JSON.parse(_0x427e0a);

          if (_0x427e0a.code == 0) {} else {
            console.log(_0x427e0a.errMsg);
          }
        }
      } catch (_0x2cd512) {
        $.logErr(_0x2cd512, _0x582a3f);
      } finally {
        _0x10e0d4(_0x427e0a);
      }
    });
  });
}

async function _0x482969() {
  let _0x44e85a = {
    "linkId": "JmtlNs_2vMgn1nnYloulqA"
  },
      _0x358bc8 = {
    "appId": "ebecc",
    "fn": "apDoLimitTimeTask",
    "body": _0x44e85a,
    "apid": "activities_platform",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "xcr": 1,
    "ua": $.UA
  };
  _0x44e85a = await _0x25086e.getbody(_0x358bc8);
  if (!_0x44e85a) return;
  return new Promise(async _0x223664 => {
    $.post(_0x20e98f(_0x44e85a), async (_0x24bd6d, _0x1a802b, _0x42f94e) => {
      try {
        if (_0x24bd6d) {
          console.log("" + JSON.stringify(_0x24bd6d));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x42f94e = JSON.parse(_0x42f94e);

          if (_0x42f94e.code == 0) {} else {
            console.log(_0x42f94e.errMsg);
          }
        }
      } catch (_0xa4ebb4) {
        $.logErr(_0xa4ebb4, _0x1a802b);
      } finally {
        _0x223664(_0x42f94e);
      }
    });
  });
}

async function _0x176ded(_0x66eb0a) {
  let _0x239e01 = {
    "linkId": "l-yLvQMhLwCqYy6_nXUBgg",
    "taskId": String(_0x66eb0a)
  };
  return _0x239e01 = "functionId=apCheckTaskTimeEnd&body=" + JSON.stringify(_0x239e01) + "&t=" + Date.now() + "&appid=activities_platform&client=android&clientVersion=12.1.0", new Promise(async _0x1ef368 => {
    $.post(_0x20e98f(_0x239e01), async (_0x1a0376, _0x5cef6d, _0x3778d4) => {
      try {
        if (_0x1a0376) console.log("" + JSON.stringify(_0x1a0376)), console.log(" API请求失败，请检查网路重试");else {
          _0x3778d4 = JSON.parse(_0x3778d4);

          if (_0x3778d4.code == 0) {} else console.log(_0x3778d4.errMsg);
        }
      } catch (_0x3db01f) {
        $.logErr(_0x3db01f, _0x5cef6d);
      } finally {
        _0x1ef368(_0x3778d4);
      }
    });
  });
}

function _0x20e98f(_0x3a4c3d) {
  return {
    "url": "https://api.m.jd.com/api",
    "body": _0x3a4c3d,
    "headers": {
      "Host": "api.m.jd.com",
      "Origin": "https://prodev.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": _0x55ca16
    }
  };
}

function _0x1c45a4() {
  return new Promise(_0x2feb63 => {
    const _0x54458d = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x55ca16,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x54458d, (_0x482068, _0x51044f, _0x4d5324) => {
      try {
        if (_0x4d5324) {
          _0x4d5324 = JSON.parse(_0x4d5324);

          if (_0x4d5324.islogin === "1") {} else _0x4d5324.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0x230027) {
        console.log(_0x230027);
      } finally {
        _0x2feb63();
      }
    });
  });
}

function _0x3b5b57() {
  return new Promise(_0x4ee8b2 => {
    !_0x3b5215 ? $.msg($.name, "", "" + _0xa9eb5) : $.log("京东账号" + $.index + $.nickName + "\n" + _0xa9eb5);

    _0x4ee8b2();
  });
}

function _0x215086(_0x217838) {
  try {
    if (typeof JSON.parse(_0x217838) == "object") return true;
  } catch (_0x43027b) {
    return console.log(_0x43027b), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function _0x44cb1b(_0x9fc295) {
  if (typeof _0x9fc295 == "string") try {
    return JSON.parse(_0x9fc295);
  } catch (_0x1597b7) {
    return console.log(_0x1597b7), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}
// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }