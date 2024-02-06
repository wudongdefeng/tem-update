/*
助力，无抽奖,提现，抽奖
默认ck1车头
8 8 * * *jd_xchb_help.js
 */
let lnrun = 0;

const $ = new Env('新春红包_助力');
const _0x1b5db4 = $.isNode() ? require("./sendNotify") : "",
      _0x4f1e57 = $.isNode() ? require("./jdCookie.js") : "",
      _0x33ffa0 = require("./function/dylano"),
      _0x5697d7 = require("./USER_AGENTS");

let _0x1da5ee = true,
    _0x2dd5f9 = [],
    _0x2e8850 = {},
    _0x3f68c0 = [],
    _0x2ef3fc = "",
    _0x29d88d = "",
    _0x52301c = "",
    _0x355cd4 = "",
    _0x34a34b;

const _0x7ef1a0 = process.env.XCHBHPNUM || "9999",
      _0x21eab6 = process.env.HLDELAY || "2",
      _0x3969e9 = process.env.XCHBPIN || "",
      _0x327ab4 = process.env.XCHBCODE || "";

if (process.env.DY_PROXY) try {
  _0x2e8850 = require("./function/proxy.js");
  $.dget = _0x2e8850.intoRequest($.get.bind($));
  $.dpost = _0x2e8850.intoRequest($.post.bind($));
} catch {
  $.dget = $.get;
  $.dpost = $.post;
} else $.dpost = $.post, $.dget = $.get;

if ($.isNode()) {
  Object.keys(_0x4f1e57).forEach(_0x2b1cc0 => {
    _0x3f68c0.push(_0x4f1e57[_0x2b1cc0]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else _0x3f68c0 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x5891b8($.getdata("CookiesJD") || "[]").map(_0x4fa3af => _0x4fa3af.cookie)].filter(_0x233800 => !!_0x233800);

!(async () => {
  if (!_0x3f68c0[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  $.log("\n当前版本：20230205");
  console.log("执行流程，车头开团--助力--检查提现--抽奖");
  console.log("TG频道：https://t.me/dylan_jdpro");
  $.log("\n环境变量清单（可选项）：");
  $.log("  指定PIN车头，不指定默认CK1  XCHBPIN='jdpin'\n  指定助力CODE，都去助力TA  XCHBCODE='xxx'\n  多少助力停止，默认9999个  XCHBHPNUM='100'\n  助力间隔，默认1秒  HLDELAY='3'\n  开启代理API DY_PROXY='apiurl'\n");

  let _0x63b462 = [];

  if (_0x3969e9) {
    console.log("\n已指定PIN：" + _0x3969e9);

    let _0x23455c = _0x3f68c0.findIndex(_0x4f3e4d => _0x4f3e4d.includes(_0x3969e9));

    if (_0x23455c == -1) {
      console.log("运行的CK中没找到指定的PIN，停止执行");
      return;
    }

    _0x29d88d = _0x3f68c0[_0x23455c];
  } else {
    console.log("\n未指定PIN默认CK1车头");
    _0x29d88d = _0x3f68c0[0];
  }

  _0x2ef3fc = _0x29d88d;
  $.UserName = decodeURIComponent(_0x2ef3fc.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2ef3fc.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
  $.isLogin = true;
  $.nickName = "";
  $.ktx = false;
  $.UA = _0x5697d7.UARAM ? _0x5697d7.UARAM() : _0x5697d7.USER_AGENT;
  console.log("\n————————————————————车头开团——————————————————————————");
  console.log("账号：" + ($.nickName || $.UserName));
  await _0x4df52d();

  if (!$.isLogin) {
    $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    $.isNode() && (await _0x1b5db4.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
    return;
  }

  await _0x16875b(false);
  await _0x24a579(1);
  await $.wait(1000);

  if (_0x63b462.length != 0) {
    let _0x1272d7 = _0x63b462[Math.floor(Math.random() * _0x63b462.length)];

    console.log("车头去助力 -> 作者");
    $.UserName = decodeURIComponent(_0x2ef3fc.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2ef3fc.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.UA = _0x5697d7.UARAM ? _0x5697d7.UARAM() : _0x5697d7.USER_AGENT;
    await _0x31239b(_0x1272d7);
    await $.wait(2000);
  }

  console.log("——————————————————————————————————————————————————————");
  console.log("\n\n—————————————开始助力车头(助力间隔" + _0x21eab6 + "秒)———————————————");
  _0x327ab4 && (console.log("\n已指定助力CODE,那抛弃车头去助力TA"), _0x2dd5f9 = [], _0x2dd5f9.push(_0x327ab4));
  _0x34a34b = 0;

  for (let _0xfe689c of _0x2dd5f9) {
    console.log("\n去助力-> " + _0xfe689c);
    $.suc = 0;

    for (let _0x47af83 = _0x34a34b; _0x47af83 < _0x3f68c0.length; _0x47af83++) {
      if (_0x3f68c0[_0x47af83]) {
        _0x2ef3fc = _0x3f68c0[_0x47af83];
        $.UserName = decodeURIComponent(_0x2ef3fc.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2ef3fc.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = _0x47af83 + 1;
        $.isLogin = true;
        $.nickName = "";
        $.UA = _0x5697d7.UARAM ? _0x5697d7.UARAM() : _0x5697d7.USER_AGENT;
        console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
        await _0x31239b(_0xfe689c);
        !_0x327ab4 && (_0x2ef3fc = _0x3f68c0[0], await _0x16875b(true));

        if ($.ktx) {
          console.log("可提现了");
          break;
        }

        if ($.suc >= Number(_0x7ef1a0)) {
          $.log("已达目标助力数，跳出！");
          _0x34a34b = _0x47af83 + 1;
          break;
        }

        await $.wait(_0x21eab6 * 1000);
        _0x2e8850.swip && (await _0x2e8850.swip());
      }
    }

    if ($.index === _0x3f68c0.length) {
      console.log("\n没有可用于助力的ck，跳出！");
      break;
    }
  }

  if ($.ktx && !_0x327ab4) {
    console.log("\n\n———————————————————开始提到钱包——————————————————————");
    _0x2ef3fc = _0x3f68c0[0];
    $.UserName = decodeURIComponent(_0x2ef3fc.match(/pt_pin=([^; ]+)(?=;?)/) && _0x2ef3fc.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.UA = _0x5697d7.UARAM ? _0x5697d7.UARAM() : _0x5697d7.USER_AGENT;
    await _0x21ee52();
  }

  if ($.times > 0) {
    console.log("\n\n—————————————————————开始刮奖——————————————————————");

    for (let _0x48c058 = 0; _0x48c058 < $.times; _0x48c058++) {
      console.log("第" + (_0x48c058 + 1) + "次抽奖：");
      await _0x5c9eb6();
      await $.wait(2000);
    }
  }
})().catch(_0x2e4a60 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x2e4a60 + "!", "");
}).finally(() => {
  $.done();
});

async function _0x16875b(_0x1ed557) {
  let _0x3d5c31 = {
    "areaInfo": "0_0_0_0",
    "unpl": "",
    "refresh": null
  },
      _0x1edb26 = {
    "appId": "b1660",
    "fn": "party_home",
    "body": _0x3d5c31,
    "apid": "spring_h5",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "xcr": $.fg,
    "ua": $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0x3d5c31 = await _0x33ffa0.getbody(_0x1edb26);
  if (!_0x3d5c31) return;
  return new Promise(async _0x14bc89 => {
    $.dpost(_0x113b4f(_0x3d5c31), async (_0x26459f, _0x3c83a4, _0x276d56) => {
      try {
        if (_0x26459f) console.log("" + JSON.stringify(_0x26459f)), console.log("home 请求失败，请检查网路重试"), _0x26459f.includes("403") && ($.banip = true);else {
          _0x276d56 = JSON.parse(_0x276d56);

          if (_0x276d56.code == 0) {
            if (_0x276d56.data.bizCode == 0) {
              if (!_0x276d56.data.result.stageHongbao.got) {
                console.log("黑鬼！");
                return;
              }

              $.times = _0x276d56.data.result.round.remainTimes;
              _0x276d56.data.result.popUp.joinPop && _0x1ed557 && console.log("" + (_0x276d56.data.result.popUp.joinPop.value ? "获得兑换金 " + _0x276d56.data.result.popUp.joinPop.value : ""));
              console.log("进度：" + _0x276d56.data.result.stageHongbao.got + "/" + _0x276d56.data.result.stageHongbao.all);
              _0x276d56.data.result.stageHongbao.got >= _0x276d56.data.result.stageHongbao.all && ($.ktx = true);
            }
          } else $.hotflag = false, console.log(_0x276d56.message);
        }
      } catch (_0x4527f4) {
        $.logErr(_0x4527f4, _0x3c83a4);
      } finally {
        _0x14bc89(_0x276d56);
      }
    });
  });
}

async function _0x24a579(_0x4b71f3) {
  let _0x3e0740 = {
    "channel": "jkl"
  },
      _0x39e6bc = {
    "appId": "b1660",
    "fn": "party_invite",
    "body": _0x3e0740,
    "apid": "spring_h5",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "xcr": $.fg,
    "ua": $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0x3e0740 = await _0x33ffa0.getbody(_0x39e6bc);
  if (!_0x3e0740) return;
  return new Promise(async _0x4732b8 => {
    $.dpost(_0x113b4f(_0x3e0740), async (_0x25833c, _0x135b62, _0x3681fd) => {
      try {
        if (_0x25833c) {
          console.log("" + JSON.stringify(_0x25833c));
          console.log("lottery请求失败，请检查网路重试");
          _0x25833c.includes("403") && ($.banip = true);
        } else {
          _0x3681fd = JSON.parse(_0x3681fd);

          if (_0x3681fd.code == 0) {
            if (_0x3681fd.data.bizCode == 0) {
              if (_0x4b71f3) console.log("我的助力码：" + _0x3681fd.data.result.inviteCode);
              !$.ktx && _0x2dd5f9.push(_0x3681fd.data.result.inviteCode);
            }
          } else $.hotflag = false, console.log(_0x3681fd.message);
        }
      } catch (_0x2f516e) {
        $.logErr(_0x2f516e, _0x135b62);
      } finally {
        _0x4732b8(_0x3681fd);
      }
    });
  });
}

async function _0x31239b(_0x2f5b40) {
  let _0x2a7490 = {
    "inviteCode": "" + _0x2f5b40,
    "deviceInfo": "{\"sdkToken\":\"\",\"jsToken\":\"\"}",
    "areaInfo": "0_0_0_0",
    "unpl": "",
    "qdPageId": "MO-J2011-1",
    "mdClickId": "Babel_dev_other_11lotterystart"
  },
      _0x42eb89 = {
    "appId": "b1660",
    "fn": "party_assist",
    "body": _0x2a7490,
    "apid": "spring_h5",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "xcr": $.fg,
    "ua": $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0x2a7490 = await _0x33ffa0.getbody(_0x42eb89);
  if (!_0x2a7490) return;
  return new Promise(async _0x449f4f => {
    $.dpost(_0x113b4f(_0x2a7490), async (_0x1871c0, _0x282f34, _0x4e0b9f) => {
      try {
        if (_0x1871c0) {
          console.log("" + JSON.stringify(_0x1871c0));
          console.log("lottery请求失败，请检查网路重试");
          _0x1871c0.includes("403") && ($.banip = true);
        } else _0x4e0b9f = JSON.parse(_0x4e0b9f), _0x4e0b9f.code == 0 ? _0x4e0b9f.data.bizCode == 0 ? ($.suc++, console.log("助力成功 ✅ " + ($.suc || ""))) : console.log(_0x4e0b9f.data.bizMsg) : ($.hotflag = false, console.log(_0x4e0b9f.message));
      } catch (_0x19c089) {
        $.logErr(_0x19c089, _0x282f34);
      } finally {
        _0x449f4f(_0x4e0b9f);
      }
    });
  });
}

async function _0x5c9eb6(_0x11bac0) {
  let _0x3ab078 = {
    "uemps": "0-0-2",
    "areaInfo": "0_0_0_0",
    "latitude": 0,
    "longitude": 0,
    "deviceInfo": "{\"sdkToken\":\"jdd01ZRVYBUG3YWPRXULPFKMBDZRKS44JUBAJRG7AHXEUWIJHQLGGTNF7NC7D4PJP7GWAFRWJ7PUG35PX7X4TZNYPGKCJANO5J2VTCFRNWSQ01234567\",\"jsToken\":\"\"}",
    "unpl": "",
    "qdPageId": "MO-J2011-1",
    "mdClickId": "Babel_dev_other_11lotterystart"
  },
      _0x5980d7 = {
    "appId": "b1660",
    "fn": "party_lottery",
    "body": _0x3ab078,
    "apid": "spring_h5",
    "ver": $.UA.split(";")[2],
    "cl": "ios",
    "user": $.UserName,
    "code": 1,
    "xcr": $.fg,
    "ua": $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0x3ab078 = await _0x33ffa0.getbody(_0x5980d7);
  if (!_0x3ab078) return;
  return new Promise(async _0x30a028 => {
    $.dpost(_0x113b4f(_0x3ab078), async (_0x5bf708, _0x524bd1, _0x7c18c4) => {
      try {
        if (_0x5bf708) console.log("" + JSON.stringify(_0x5bf708)), console.log("lottery请求失败，请检查网路重试"), _0x5bf708.includes("403") && ($.banip = true);else {
          _0x7c18c4 = JSON.parse(_0x7c18c4);

          if (_0x7c18c4.code == 0) {
            if (_0x7c18c4.data.bizCode == 0) {
              for (let _0x511607 of _0x7c18c4.data.result.awardList) {
                _0x511607.name && _0x511607.name.includes("红包") ? console.log("获得 " + _0x511607.name + " 🧧") : console.log("获得 " + (_0x511607.name || "空气"));
              }
            } else console.log(_0x7c18c4.data.bizMsg);
          } else $.hotflag = false, console.log(_0x7c18c4.message);
        }
      } catch (_0x48ddbc) {
        $.logErr(_0x48ddbc, _0x524bd1);
      } finally {
        _0x30a028(_0x7c18c4);
      }
    });
  });
}

async function _0x21ee52() {
  let _0x293f4b = {
    "deviceInfo": "{\"sdkToken\":\"\",\"jsToken\":\"\"}",
    "unpl": "",
    "qdPageId": "MO-J2011-1",
    "mdClickId": "Babel_dev_other_11lotterystart"
  };
  return _0x293f4b = encodeURIComponent(JSON.stringify(_0x293f4b)) + "&appid=spring_h5&functionId=party_receive", new Promise(async _0x432a0a => {
    $.dpost(_0x113b4f(_0x293f4b), async (_0x554d79, _0x48acce, _0x4cdb28) => {
      try {
        if (_0x554d79) console.log("" + JSON.stringify(_0x554d79)), console.log("recevie 请求失败，请检查网路重试"), _0x554d79.includes("403") && ($.banip = true);else {
          _0x4cdb28 = JSON.parse(_0x4cdb28);

          if (_0x4cdb28.code == 0) {
            _0x4cdb28.data.bizCode == 0 ? console.log("提现成功 💰️") : (console.log(""), console.log(_0x4cdb28.data.bizMsg));
          } else $.hotflag = false, console.log(_0x4cdb28.message);
        }
      } catch (_0x19f5de) {
        $.logErr(_0x19f5de, _0x48acce);
      } finally {
        _0x432a0a(_0x4cdb28);
      }
    });
  });
}

function _0x113b4f(_0x3ad326) {
  return {
    "url": "https://api-x.m.jd.com/?" + _0x3ad326,
    "headers": {
      "Origin": "https://pro.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": $.UA,
      "Cookie": _0x2ef3fc
    }
  };
}

function _0x4df52d() {
  return new Promise(_0x3b2b75 => {
    const _0x14d7e3 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x2ef3fc,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x14d7e3, (_0x44d31a, _0x1ceed8, _0x41b3c4) => {
      try {
        if (_0x41b3c4) {
          _0x41b3c4 = JSON.parse(_0x41b3c4);

          if (_0x41b3c4.islogin === "1") {} else _0x41b3c4.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0x3ac88b) {
        console.log(_0x3ac88b);
      } finally {
        _0x3b2b75();
      }
    });
  });
}

function _0xe273ff() {
  return new Promise(_0x223104 => {
    if (!_0x1da5ee) $.msg($.name, "", "" + _0x52301c);else {
      $.log("京东账号" + $.index + $.nickName + "\n" + _0x52301c);
    }

    _0x223104();
  });
}

function _0x4f2da4(_0x3d1963) {
  try {
    if (typeof JSON.parse(_0x3d1963) == "object") {
      return true;
    }
  } catch (_0x524062) {
    return console.log(_0x524062), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}


function _0x47f5da(_0x25716b) {
  const _0x23e1af = _0x25716b.getFullYear(),
        _0x8124af = ("0" + (_0x25716b.getMonth() + 1)).slice(-2),
        _0x70a3d = ("0" + _0x25716b.getDate()).slice(-2),
        _0x262925 = ("0" + _0x25716b.getHours()).slice(-2),
        _0x5a15ef = ("0" + _0x25716b.getMinutes()).slice(-2),
        _0x476ea9 = ("0" + _0x25716b.getSeconds()).slice(-2);

  return _0x23e1af + "/" + _0x8124af + "/" + _0x70a3d + " " + _0x262925 + ":" + _0x5a15ef + ":" + _0x476ea9;
}

function _0x5891b8(_0x137e3f) {
  if (typeof _0x137e3f == "string") try {
    return JSON.parse(_0x137e3f);
  } catch (_0x18d820) {
    return console.log(_0x18d820), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
  }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }