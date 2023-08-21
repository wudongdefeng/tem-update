/*
任务，抽奖
晚了没水
1 1 1 1 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_pdkh.js
updatetime:2023/7/3 
 */
 
const wudoutimes = '50';//连续几次没有豆就不抽奖只做任务

const $ = new Env('派对狂欢城');
const _0x35804f = $.isNode() ? require("./sendNotify") : "",
  _0x46fe4a = $.isNode() ? require("./jdCookie.js") : "",
  _0x34e1d3 = require("./function/dylany.js"),
  _0x8b133c = require("./USER_AGENTS"),
  _0x108311 = require("crypto-js");
let _0x2570fb = [],
  _0x411d55 = "",
  _0x41535e = "",
  _0x36b933 = false,
  _0x66fcc8 = true;
if ($.isNode()) {
  Object.keys(_0x46fe4a).forEach(_0x1e203f => {
    _0x2570fb.push(_0x46fe4a[_0x1e203f]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x2570fb = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x240639($.getdata("CookiesJD") || "[]").map(_0x67759b => _0x67759b.cookie)].filter(_0x5dd6c9 => !!_0x5dd6c9);
}
!(async () => {
  if (!_0x2570fb[0]) {
    const _0x4751ac = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x4751ac);
    return;
  }
  $.log("\n当前版本：V2.0.0");
  $.log("\n问题建议TG：https://t.me/dylan_jdpro");
  for (let _0x292c13 = 0; _0x292c13 < _0x2570fb.length; _0x292c13++) {
    if (_0x2570fb[_0x292c13]) {
      _0x411d55 = _0x2570fb[_0x292c13];
      $.UserName = decodeURIComponent(_0x411d55.match(/pt_pin=([^; ]+)(?=;?)/) && _0x411d55.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x292c13 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.notimes = false;
      $.airnum = 0;
      $.UA = _0x8b133c.UARAM ? _0x8b133c.UARAM() : _0x8b133c.USER_AGENT;
      await _0xcf7d6a();
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        const _0x97f8 = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x97f8);
        $.isNode() && (await _0x35804f.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }
      await _0x285a42();
      await $.wait(200);
      await _0x516f01();
      await $.wait(200);
      await _0x271f2b();
      await $.wait(200);
      await _0x36c9b0();
      await $.wait(200);
      if ($.taskList) {
        $.log("去做任务...");
        for (let _0x312ba4 of $.taskList) {
          if (!!_0x312ba4.assignmentName && _0x312ba4.assignmentName !== "积分兑换" && _0x312ba4.assignmentName.indexOf("抽奖奖池") == -1 && _0x312ba4.assignmentName.indexOf("加购") == -1 && _0x312ba4.assignmentName.indexOf("会员") == -1) {
            $.log("\n----" + _0x312ba4.assignmentName);
            if (_0x312ba4.completionFlag) {
              $.log("----已完成");
              continue;
            }
            if (_0x312ba4.ext.shoppingActivity || _0x312ba4.ext.followShop) {
              for (let _0x35f3d7 = 0; _0x35f3d7 < _0x312ba4.assignmentTimesLimit - _0x312ba4.completionCnt; _0x35f3d7++) {
                let _0x4af8b0 = _0x312ba4.ext.shoppingActivity ? _0x312ba4.ext.shoppingActivity[_0x35f3d7]?.["itemId"] : _0x312ba4.ext.followShop[_0x35f3d7]?.["itemId"];
                if (!_0x4af8b0) {
                  _0x4af8b0 = _0x312ba4.ext.shoppingActivity ? _0x312ba4.ext.shoppingActivity[Math.floor(Math.random(0, _0x312ba4.ext.shoppingActivity.length))].itemId : _0x312ba4.ext.followShop[Math.floor(Math.random(0, _0x312ba4.ext.followShop.length))].itemId;
                }
                await _0x5af7e5(_0x312ba4.encryptAssignmentId, _0x4af8b0);
                await $.wait(1000);
              }
              continue;
            }
            await _0x5af7e5(_0x312ba4.encryptAssignmentId);
            await $.wait(500);
          }
        }
      }
      if (_0x66fcc8) {
        $.log("\n\n元宝抽奖...");
        for (let _0x58fc55 of Array(50)) {
          if ($.notimes) {
            break;
          }
          if ($.airnum > wudoutimes) {
            $.log("\n\n连续无豆达到设定值, 不抽奖只做任务！！！");
            _0x66fcc8 = false;
            break;
          }
          await _0x522c54();
          await $.wait(1000);
        }
      }
      await $.wait(5000);
    }
  }
})().catch(_0x3733a3 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x3733a3 + "!", "");
}).finally(() => {
  $.done();
});
async function _0x285a42() {
  return new Promise(async _0x1d84ff => {
    const _0x19fdbc = {
      "templateId": "790088977"
    };
    $.post(_0x3b66aa("arvrMeta2RoomSortListByTemplateId", _0x19fdbc), async (_0x3ceccf, _0x32a551, _0x14d008) => {
      try {
        _0x3ceccf ? (console.log("" + JSON.stringify(_0x3ceccf)), console.log(" API请求失败，请检查网路重试")) : (_0x36b933 && console.log(_0x14d008), _0x14d008 = JSON.parse(_0x14d008), _0x14d008.code == 0 ? $.roomId = _0x14d008.data[0].roomId : console.log(_0x14d008.msg));
      } catch (_0x53c766) {
        $.logErr(_0x53c766, _0x32a551);
      } finally {
        _0x1d84ff(_0x14d008);
      }
    });
  });
}
async function _0x516f01() {
  return new Promise(async _0x4ba4f9 => {
    $.post(_0x3b66aa("meta2LoginGame", {
      "channel": "1",
      "roomId": $.roomId
    }), async (_0x1bb776, _0x29c985, _0x1a6e84) => {
      try {
        if (_0x1bb776) {
          console.log("" + JSON.stringify(_0x1bb776));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x36b933 && console.log(_0x1a6e84);
          _0x1a6e84 = JSON.parse(_0x1a6e84);
          if (!(_0x1a6e84.code == 0)) {
            console.log(_0x1a6e84.msg);
          }
        }
      } catch (_0x444cfb) {
        $.logErr(_0x444cfb, _0x29c985);
      } finally {
        _0x4ba4f9(_0x1a6e84);
      }
    });
  });
}
async function _0x271f2b() {
  const _0x12aaa5 = {
    "rewardType": 6,
    "activityId": "ba6e852dd2bc05a1de75b2d2dc9fda305096bcc0",
    "appId": "app_440"
  };
  _0x12aaa5 = _0x1c82bd(_0x12aaa5);
  return new Promise(async _0xd0dafe => {
    $.post(_0x3b66aa("arvr_getRequestToken", _0x12aaa5), async (_0x11b583, _0x3b6ad8, _0x370d4a) => {
      try {
        _0x11b583 ? (console.log("" + JSON.stringify(_0x11b583)), console.log(" API请求失败，请检查网路重试")) : (_0x36b933 && console.log(_0x370d4a), _0x370d4a = JSON.parse(_0x370d4a), _0x370d4a.code == 200 ? $.token = _0x370d4a.data : console.log(_0x370d4a.msg));
      } catch (_0x33e86b) {
        $.logErr(_0x33e86b, _0x3b6ad8);
      } finally {
        _0xd0dafe(_0x370d4a);
      }
    });
  });
}
async function _0x36c9b0() {
  const _0x32ed74 = {
    "projectId": "1563959",
    "sourceCode": 2
  };
  _0x32ed74 = _0x1c82bd(_0x32ed74);
  return new Promise(async _0x790221 => {
    $.post(_0x3b66aa("arvr_queryInteractiveInfo", _0x32ed74), async (_0x35bcf4, _0x37df14, _0x183c95) => {
      try {
        if (_0x35bcf4) {
          console.log("" + JSON.stringify(_0x35bcf4));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x36b933 && console.log(_0x183c95);
          _0x183c95 = JSON.parse(_0x183c95);
          _0x183c95.subCode == 0 ? $.taskList = _0x183c95.assignmentList : console.log(_0x183c95.msg);
        }
      } catch (_0x33c3cc) {
        $.logErr(_0x33c3cc, _0x37df14);
      } finally {
        _0x790221(_0x183c95);
      }
    });
  });
}
async function _0x522c54() {
  const _0x5d4393 = {
    "projectId": "1563959",
    "sourceCode": 2,
    "accessToken": $.token,
    "subTaskId": "o5mVnPZZChSZyaD1qcXXXfWwhEb",
    "subTaskIdSecret": true,
    "exchangeNum": 1
  };
  _0x5d4393 = _0x1c82bd(_0x5d4393);
  const _0x192266 = {
    "appId": "e5749",
    "fn": "arvr_doInteractiveAssignment",
    "body": _0x5d4393,
    "apid": "commonActivity",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  let _0x2f5a17 = await _0x34e1d3.getbody(_0x192266);
  const _0x42b9b4 = {
    "Host": "api.m.jd.com",
    "Origin": "https://prodev.m.jd.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    "Cookie": _0x411d55
  };
  const _0x355e94 = {
    "url": "https://api.m.jd.com/api/arvr_doInteractiveAssignment",
    "body": "" + _0x2f5a17,
    "headers": _0x42b9b4
  };
  return new Promise(async _0x11ba65 => {
    $.post(_0x355e94, async (_0x5383fc, _0x5ba73d, _0x3e0bbc) => {
      try {
        if (_0x5383fc) {
          console.log("" + JSON.stringify(_0x5383fc));
          console.log(" API请求失败，请检查网路重试");
        } else {
          _0x3e0bbc = JSON.parse(_0x3e0bbc);
          if (_0x3e0bbc.subCode == 0) {
            if (_0x3e0bbc.rewardsInfo.failRewards && _0x3e0bbc.rewardsInfo.failRewards.length != 0) {
              if (_0x3e0bbc.rewardsInfo.failRewards[0].msg.indexOf("风控") > -1) {
                process.stdout.write("黑号，不继续抽了！");
                $.notimes = true;
                return;
              }
            }
            _0x3e0bbc.rewardsInfo.successRewards && JSON.stringify(_0x3e0bbc.rewardsInfo.successRewards) != "{}" ? (process.stdout.write(Object.values(_0x3e0bbc.rewardsInfo.successRewards)[0][0].rewardName + " "), Object.values(_0x3e0bbc.rewardsInfo.successRewards)[0][0].rewardName.indexOf("京豆") == -1 ? $.airnum++ : $.airnum = 0) : (process.stdout.write("空气 "), $.airnum++);
          } else {
            _0x3e0bbc.msg.includes("不足") ? (console.log(_0x3e0bbc.msg), $.notimes = true) : console.log(_0x3e0bbc.msg);
          }
        }
      } catch (_0x1ebbcc) {
        $.logErr(_0x1ebbcc, _0x5ba73d);
      } finally {
        _0x11ba65(_0x3e0bbc);
      }
    });
  });
}
async function _0x5af7e5(_0x359efd, _0x5ec9c6) {
  const _0x45e77d = {
    "projectId": "1563959",
    "sourceCode": 2,
    "accessToken": $.token,
    "subTaskId": _0x359efd,
    "subTaskIdSecret": true,
    "itemId": _0x5ec9c6
  };
  if (!_0x5ec9c6) {
    delete _0x45e77d.itemId;
  }
  _0x45e77d = _0x1c82bd(_0x45e77d);
  const _0x5ed523 = {
    "appId": "e5749",
    "fn": "arvr_doInteractiveAssignment",
    "body": _0x45e77d,
    "apid": "commonActivity",
    "user": $.UserName,
    "code": 1,
    "ua": $.UA
  };
  let _0x4b224e = await _0x34e1d3.getbody(_0x5ed523);
  const _0x37c1d1 = {
    "Host": "api.m.jd.com",
    "Origin": "https://prodev.m.jd.com",
    "Referer": "https://prodev.m.jd.com/",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    "Cookie": _0x411d55
  };
  const _0x29ac88 = {
    "url": "https://api.m.jd.com/api/arvr_doInteractiveAssignment",
    "body": "" + _0x4b224e,
    "headers": _0x37c1d1
  };
  return new Promise(async _0xe049cf => {
    $.post(_0x29ac88, async (_0x1d7901, _0x5c6220, _0x7339d) => {
      try {
        if (_0x1d7901) {
          console.log("" + JSON.stringify(_0x1d7901));
          console.log("dotask 请求失败，请检查网路重试");
        } else {
          _0x36b933 && console.log(_0x7339d);
          _0x7339d = JSON.parse(_0x7339d);
          if (_0x7339d.subCode == 0) {
            _0x7339d.rewardsInfo.successRewards && process.stdout.write("" + _0x7339d.rewardsInfo.successRewards[1].quantityDetails[0].quantity + _0x7339d.rewardsInfo.successRewards[1].quantityDetails[0].rewardName + " ");
          } else {
            console.log(_0x7339d.msg);
          }
        }
      } catch (_0x46dd5c) {
        $.logErr(_0x46dd5c, _0x5c6220);
      } finally {
        _0xe049cf(_0x7339d);
      }
    });
  });
}
function _0x3b66aa(_0x4cc64c, _0x458580) {
  const _0xed8d08 = {
    "Host": "api.m.jd.com",
    "Origin": "https://pro.m.jd.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    "Cookie": _0x411d55
  };
  return {
    "url": "https://api.m.jd.com/api/" + _0x4cc64c,
    "body": "appid=commonActivity&functionId=" + _0x4cc64c + "&body=" + encodeURIComponent(JSON.stringify(_0x458580)) + "&t=" + Date.now(),
    "headers": _0xed8d08
  };
}
function _0x1c82bd(_0x202847) {
  let _0x32957b = "",
    _0x58a9cb = Object.keys(_0x202847).sort(function (_0x5016be, _0x41d373) {
      return _0x5016be.localeCompare(_0x41d373);
    });
  for (let _0x223aba of _0x58a9cb) {
    _0x32957b = _0x32957b.concat(_0x202847[_0x223aba]);
  }
  let _0x3a057a = Date.now();
  r = "".concat("c4491f13dce9c71f").concat(_0x32957b).concat(_0x3a057a);
  let _0xd14b1f = _0x108311.MD5(r).toString();
  _0x202847.timestamp = _0x3a057a;
  _0x202847.sign = _0xd14b1f;
  _0x202847.signKey = "c4491f13dce9c71f";
  return _0x202847;
}
function _0xcf7d6a() {
  return new Promise(_0x2e77f7 => {
    const _0x4afcd1 = {
      "Cookie": _0x411d55,
      "referer": "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x3b8597 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": _0x4afcd1,
      "timeout": 10000
    };
    $.get(_0x3b8597, (_0x18cd4d, _0xda8f62, _0x156c10) => {
      try {
        if (_0x156c10) {
          _0x156c10 = JSON.parse(_0x156c10);
          if (!(_0x156c10.islogin === "1")) {
            _0x156c10.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0xab6b2b) {
        console.log(_0xab6b2b);
      } finally {
        _0x2e77f7();
      }
    });
  });
}
function _0x5b3429() {
  return new Promise(_0x1995ce => {
    $.log("京东账号" + $.index + $.nickName + "\n" + _0x41535e);
    _0x1995ce();
  });
}
function _0x16aca5(_0x5023e6) {
  try {
    if (typeof JSON.parse(_0x5023e6) == "object") {
      return true;
    }
  } catch (_0x3a9a7d) {
    console.log(_0x3a9a7d);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function _0x240639(_0x1c65a2) {
  if (typeof _0x1c65a2 == "string") {
    try {
      return JSON.parse(_0x1c65a2);
    } catch (_0x2ffa1c) {
      console.log(_0x2ffa1c);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
