/*
1 6 * * * jd_qszd.js
*/
let lnrun = 0;

const $ = new Env('轻松赚豆');
const _0x309e6f = $.isNode() ? require("./jdCookie.js") : "",
      _0x3885ed = $.isNode() ? require("./sendNotify") : "",
      _0x273321 = require("./function/dylano");

if (process.env.DY_PROXY) {
  try {
    require("https-proxy-agent");

    ccc = require("./function/proxy.js");
    $.dget = ccc.intoRequest($.get.bind($));
    $.dpost = ccc.intoRequest($.post.bind($));
  } catch {
    $.log("未安装https-proxy-agent依赖，无法启用代理");
    $.dget = $.get;
    $.dpost = $.post;
  }
} else {
  $.dpost = $.post;
  $.dget = $.get;
}

let _0x1da43d = [],
    _0x4f45a4 = "",
    _0x39a21a = 0;

if ($.isNode()) {


  Object.keys(_0x309e6f).forEach(_0x31cfad => {
    _0x1da43d.push(_0x309e6f[_0x31cfad]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x1da43d = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonfomat($.getdata("CookiesJD") || "[]").map(_0x45d7e4 => _0x45d7e4.cookie)].filter(_0x2222b3 => !!_0x2222b3);
}

!(async () => {


  if (!_0x1da43d[0]) {
    const _0x414209 = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x414209);
    return;
  }

  console.log("TG频道：https://t.me/dylan_jdpro");

  for (let _0x372bac = 0; _0x372bac < _0x1da43d.length; _0x372bac++) {
    _0x4f45a4 = _0x1da43d[_0x372bac];
    originCookie = _0x1da43d[_0x372bac];

    if (_0x4f45a4) {
      $.UserName = decodeURIComponent(_0x4f45a4.match(/pt_pin=([^; ]+)(?=;?)/) && _0x4f45a4.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x372bac + 1;
      $.hotFlag = false;
      $.nickName = "";
      $.isLogin = true;
      $.outFlag = false;
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}

      _0x300198();

      await _0x25267c();

      if (!$.isLogin) {
        const _0x437031 = {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        };
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x437031);
        $.isNode() && (await _0x3885ed.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      await _0x3b31f0();
    }
  }
})().catch(_0x33562c => {
  return $.logErr(_0x33562c);
}).finally(() => {
  return $.done();
});

async function _0x3b31f0() {
  try {
    await _0xe23551("pg_load_floor_data");

    for (let _0x6e1fdd of $.taskList) {
      if (_0x6e1fdd.name.includes("下单")) {
        continue;
      }

      if (_0x6e1fdd.taskStatus == 3) {
        console.log(_0x6e1fdd.name + "---已完成并领取奖励");
        continue;
      }

      $.taskEncId = _0x6e1fdd.taskEncId;
      $.browseTrxId = _0x6e1fdd.browseInfoVO.browsePageVOS[0].id;

      if (_0x6e1fdd.taskStatus == 0) {
        console.log("去做 " + _0x6e1fdd.name);
        await _0xe23551("taskReceive");
        await $.wait(1000);
        await _0xe23551("taskFinish");
        await $.wait(1000);
        await _0xe23551("taskReward");
      } else {
        _0x6e1fdd.taskStatus == 2 && (console.log("去做 " + _0x6e1fdd.name), await $.wait(1000), await _0xe23551("taskReward"));
      }
    }

    await $.wait(parseInt(Math.random() * 1000 + 2000, 10));
  } catch (_0x4a4c2a) {
    console.log(_0x4a4c2a);
  }
}

async function _0xe23551(_0x5c2044) {
  if ($.outFlag) {
    return;
  }

  let _0x5875cd = "",
      _0x1f27cd,
      _0x50dd0e,
      _0x1f183e = "POST";

  switch (_0x5c2044) {
    case "pg_channel_page_data":
      const _0x2cb666 = {
        token: "2752f370-f499-44cd-b024-7c8e881cf7fe",
        channel: "",
        upstreamChannel: "",
        launchChannel: "APP"
      };
      const _0x4ebe2b = {
        source: "JBean",
        ubb_loc: "app.myjbean.my-put.yz-my-put",
        ubb_info: "eyJwIjoiYnRwIn0%3D%0A"
      };
      const _0x5d64b7 = {
        paramData: _0x2cb666,
        argMap: _0x4ebe2b,
        riskInformation: {}
      };
      _0x5875cd = _0x5d64b7;
      _0x1f27cd = "4646c";
      _0x50dd0e = "pg_channel_page_data";
      break;

    case "pg_load_floor_data":
      const _0x71e3bf = {
        launchChannel: "APP",
        channel: ""
      };
      const _0x343710 = {
        floorToken: "9d61d39e-5ced-490d-b9d0-86a4f652008d",
        argMap: _0x71e3bf
      };
      _0x5875cd = _0x343710;
      _0x1f27cd = "faef7";
      _0x50dd0e = "pg_load_floor_data";
      break;

    case "taskReceive":
      const _0x3e06f8 = {
        launchChannel: "APP",
        channel: "",
        taskEncId: $.taskEncId
      };
      const _0x22b0ef = {
        floorToken: "9d61d39e-5ced-490d-b9d0-86a4f652008d",
        dataSourceCode: "taskReceive",
        argMap: _0x3e06f8
      };
      _0x5875cd = _0x22b0ef;
      _0x1f27cd = "a7c04";
      _0x50dd0e = "pg_interact_interface_invoke";
      break;

    case "taskFinish":
      const _0xe2ed76 = {
        floorToken: "9d61d39e-5ced-490d-b9d0-86a4f652008d",
        dataSourceCode: "taskFinish",
        argMap: {}
      };
      _0xe2ed76.argMap.launchChannel = "APP";
      _0xe2ed76.argMap.channel = "";
      _0xe2ed76.argMap.taskEncId = $.taskEncId;
      _0xe2ed76.argMap.extParamsStr = {};
      _0xe2ed76.argMap.extParamsStr.browseTrxId = $.browseTrxId;
      _0x5875cd = _0xe2ed76;
      _0x1f27cd = "a7c04";
      _0x50dd0e = "pg_interact_interface_invoke";
      break;

    case "taskReward":
      const _0x2afac3 = {
        launchChannel: "APP",
        channel: "",
        taskEncId: $.taskEncId
      };
      const _0x52f40d = {
        floorToken: "9d61d39e-5ced-490d-b9d0-86a4f652008d",
        dataSourceCode: "taskReward",
        argMap: _0x2afac3
      };
      _0x5875cd = _0x52f40d;
      _0x1f27cd = "a7c04";
      _0x50dd0e = "pg_interact_interface_invoke";
      break;

    default:
      console.log("错误" + _0x5c2044);
  }

  if (_0x1f27cd) {
    let _0x73701c = {
      appId: _0x1f27cd,
      fn: _0x50dd0e,
      body: _0x5875cd,
      apid: "jd-bean-task",
      ver: $.UA.split(";")[2],
      cl: "ios",
      user: $.UserName,
      code: 1,
      ua: $.UA
    };
    _0x5875cd = await _0x273321.getbody(_0x73701c);

    if (!_0x5875cd) {
      return;
    }
  }

  let _0x14a2b3 = _0x546a7f(_0x5875cd, _0x1f183e);

  return new Promise(async _0x58bd1a => {
    $.dpost(_0x14a2b3, async (_0x5f48a6, _0x281d73, _0x43f06e) => {
      try {
        if (_0x5f48a6) {
          if (_0x281d73 && typeof _0x281d73.statusCode != "undefined") {
            if (_0x281d73.statusCode == 493) {
              if (_0x39a21a < 6) {
                _0x39a21a++;
                await _0xe23551(_0x5c2044);
                return;
              }

              console.log("ip可能被限制，过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }

          console.log("" + $.toStr(_0x5f48a6, _0x5f48a6));
        } else {
          if (_0x43f06e.includes("doctype") && _0x39a21a < 6) {
            _0x39a21a++;
            await _0xe23551(_0x5c2044);
            return;
          }

          _0x39a21a = 0;

          _0x41cf0c(_0x5c2044, _0x43f06e);
        }
      } catch (_0x3bdd17) {
        console.log(_0x3bdd17, _0x281d73);
      } finally {
        _0x58bd1a();
      }
    });
  });
}

async function _0x41cf0c(_0x2607c9, _0x2087e3) {
  let _0x1cd8f8 = "";

  try {
    _0x1cd8f8 = JSON.parse(_0x2087e3);
  } catch (_0x5ba694) {
    console.log(_0x2607c9 + " 执行任务异常");
  }

  try {
    switch (_0x2607c9) {
      case "pg_load_floor_data":
        if (_0x1cd8f8.success) {
          $.taskList = _0x1cd8f8.data?.["floorData"]?.["pgTaskListVO"]?.["taskInfoList"] || [];
        }

        break;

      case "taskReward":
        if (_0x1cd8f8.success) {
          _0x1cd8f8.data.beanInfo && console.log("京豆 +" + _0x1cd8f8.data.beanInfo.beanNum + " 🥔");
        }

        break;

      case "taskFinish":
      case "taskReceive":
        break;

      default:
        console.log(_0x2607c9 + " -> " + _0x2087e3);
    }

    typeof _0x1cd8f8 == "object" && _0x1cd8f8.errorMessage && _0x1cd8f8.errorMessage.indexOf("火爆") > -1 && ($.hotFlag = true);
  } catch (_0x26a230) {
    console.log(_0x2607c9 + " " + _0x26a230);
  }
}

function _0x546a7f(_0x43e078, _0x3123dd = "POST") {
  let _0x1ff6d5 = "https://api.m.jd.com/";
  const _0x24bea1 = {
    Accept: "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/x-www-form-urlencoded",
    Origin: "https://jdbeantask-pro.pf.jd.com",
    Referer: "https://jdbeantask-pro.pf.jd.com/",
    Cookie: _0x4f45a4,
    "User-Agent": $.UA
  };
  const _0x1ec187 = {
    url: _0x1ff6d5,
    method: _0x3123dd,
    headers: _0x24bea1,
    body: _0x43e078,
    timeout: 30000
  };
  return _0x1ec187;
}

async function _0x300198() {
  $.UA = "jdapp;iPhone;10.1.5;13.1.2;" + _0x28151c(40) + ";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1";
}

function _0x28151c(_0x12860c) {
  _0x12860c = _0x12860c || 32;
  let _0xdd4541 = "abcdef0123456789",
      _0x495143 = _0xdd4541.length,
      _0x27b920 = "";

  for (i = 0; i < _0x12860c; i++) {
    _0x27b920 += _0xdd4541.charAt(Math.floor(Math.random() * _0x495143));
  }

  return _0x27b920;
}

function _0x5af06d(_0x50c2cc) {
  if (typeof _0x50c2cc == "string") {
    try {
      return JSON.parse(_0x50c2cc);
    } catch (_0x2f1a63) {
      console.log(_0x2f1a63);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}

async function _0x91099() {
  if (!$.joinVenderId) {
    return;
  }

  return new Promise(async _0x33742e => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    $.shopactivityId = "";
    let _0x547bd7 = {
      venderId: "" + $.joinVenderId + "",
      shopId: "" + $.joinVenderId + "",
      bindByVerifyCodeFlag: 1,
      registerExtend: {},
      writeChildFlag: 0,
      channel: 406
    };
    $.shopactivityId == "" && delete _0x547bd7.activityId;
    const _0x149f0c = {
      appId: "27004",
      fn: "bindWithVender",
      body: _0x547bd7,
      apid: "shopmember_m_jd_com",
      ver: "9.2.0",
      cl: "H5",
      user: $.UserName,
      code: 0,
      ua: $.UA
    };
    _0x547bd7 = await dyy.getbody(_0x149f0c);
    const _0x5ec6e0 = {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      cookie: _0x4f45a4,
      origin: "https://shopmember.m.jd.com/",
      "user-agent": $.UA
    };
    const _0x2f1054 = {
      url: "https://api.m.jd.com/client.action?" + _0x547bd7 + "&uuid=88888",
      headers: _0x5ec6e0,
      timeout: 30000
    };
    $.dget(_0x2f1054, async (_0x1674c0, _0x37dfa2, _0x498dfd) => {
      try {
        _0x498dfd = _0x498dfd && _0x498dfd.match(/jsonp_.*?\((.*?)\);/) && _0x498dfd.match(/jsonp_.*?\((.*?)\);/)[1] || _0x498dfd;

        let _0x5e93d3 = $.toObj(_0x498dfd, _0x498dfd);

        if (_0x5e93d3 && typeof _0x5e93d3 == "object") {
          if (_0x5e93d3 && _0x5e93d3.success === true) {
            console.log("    " + _0x5e93d3.message);
            $.errorJoinShop = _0x5e93d3.message;

            if (_0x5e93d3.result && _0x5e93d3.result.giftInfo) {
              for (let _0x5276b3 of _0x5e93d3.result.giftInfo.giftList) {
                console.log("入会获得:" + _0x5276b3.discountString + _0x5276b3.prizeName + _0x5276b3.secondLineDesc);
              }
            }
          } else {
            _0x5e93d3 && typeof _0x5e93d3 == "object" && _0x5e93d3.message ? ($.errorJoinShop = _0x5e93d3.message, console.log("" + (_0x5e93d3.message || ""))) : console.log(_0x498dfd);
          }
        } else {
          console.log(_0x498dfd);
        }
      } catch (_0x103f45) {
        $.logErr(_0x103f45, _0x37dfa2);
      } finally {
        _0x33742e();
      }
    });
  });
}

async function _0x5d295e() {
  return new Promise(async _0x5808a4 => {
    const _0x354e91 = {
      venderId: $.joinVenderId,
      payUpShop: true,
      queryVersion: "10.5.2",
      appid: "ef79a",
      needSecurity: true,
      bizId: "shop_view_app",
      channel: 406
    };
    let _0x2072a2 = _0x354e91;
    const _0x150a0f = {
      appId: "ef79a",
      fn: "getShopOpenCardInfo",
      body: _0x2072a2,
      apid: "jd_shop_member",
      ver: "9.2.0",
      cl: "H5",
      user: $.UserName,
      code: 0,
      ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
    };
    _0x2072a2 = await dyy.getbody(_0x150a0f);
    const _0x15ee6f = {
      accept: "*/*",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
      cookie: _0x4f45a4,
      origin: "https://shopmember.m.jd.com/",
      "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
    };
    const _0x344158 = {
      url: "https://api.m.jd.com/client.action?" + _0x2072a2 + "&uuid=88888",
      headers: _0x15ee6f,
      timeout: 60000
    };
    $.get(_0x344158, async (_0xe1de7f, _0x2961ae, _0x3671fd) => {
      try {
        _0x3671fd = _0x3671fd && _0x3671fd.match(/jsonp_.*?\((.*?)\);/) && _0x3671fd.match(/jsonp_.*?\((.*?)\);/)[1] || _0x3671fd;

        let _0x25b0dd = $.toObj(_0x3671fd, _0x3671fd);

        _0x25b0dd && typeof _0x25b0dd == "object" ? _0x25b0dd && _0x25b0dd.success == true && (console.log("去加入 -> " + (_0x25b0dd.result[0].shopMemberCardInfo.venderCardName || "")), $.shopactivityId = _0x25b0dd.result[0].interestsRuleList && _0x25b0dd.result[0].interestsRuleList[0] && _0x25b0dd.result[0].interestsRuleList[0].interestsInfo && _0x25b0dd.result[0].interestsRuleList[0].interestsInfo.activityId || "") : console.log(_0x3671fd);
      } catch (_0x529016) {
        $.logErr(_0x529016, _0x2961ae);
      } finally {
        _0x5808a4();
      }
    });
  });
}

function _0xf244(_0x530a18, _0x2f34c1) {
  return Math.floor(Math.random() * (_0x2f34c1 - _0x530a18)) + _0x530a18;
}

function _0xcd6b1a(_0x5d5cd5 = +new Date()) {
  var _0x6e0290 = new Date(_0x5d5cd5 + 28800000);

  return _0x6e0290.toJSON().substr(0, 19).replace("T", " ").replace(/-/g, "/");
}

function _0x25267c() {
  return new Promise(_0x4a33ec => {
    const _0x3750bd = {
      Cookie: _0x4f45a4,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x2b60e8 = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x3750bd,
      timeout: 10000
    };
    $.get(_0x2b60e8, (_0x2abb47, _0x681bfa, _0x50560e) => {
      try {
        if (_0x50560e) {
          _0x50560e = JSON.parse(_0x50560e);

          if (!(_0x50560e.islogin === "1")) {
            _0x50560e.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x2f6b96) {
        console.log(_0x2f6b96);
      } finally {
        _0x4a33ec();
      }
    });
  });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }