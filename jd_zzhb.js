/*
转赚红包
执行流程，车头输出助力码--助力--抽奖--检查提现
可指定PIN车头(只能1个)，不指定默认CK1， 变量 JDZHBTOPPIN='jdpin'
运行一次抽奖次数,默认抽完，控制变量 JDZHBLTNUM='200'
每次抽奖间隔，默认1秒，控制变量 JDZHBDELAY='3'
开启提现到上限转红包 JDZHBTORED='true'
代理变量DY_PROXY='https://api'，仅对助力使用，支持类星空的api 
默认提现，不提现的变量 NOTX='true' 
 */
let lnrun = 0;

const $ = new Env('Jd转赚红包');
const _0x257616 = $.isNode() ? require("./sendNotify") : "",
      _0x3ef39d = $.isNode() ? require("./jdCookie.js") : "",
      _0x354be1 = require("./function/dylano"),
      _0x2627e0 = require("./USER_AGENTS");

let _0x5de884 = true,
    _0x8e1902 = [],
    _0x457890 = [],
    _0x11ec3e = [],
    _0x2a036e = [],
    _0x195b79 = {},
    _0x20e845 = [],
    _0x5c6358 = "",
    _0xdaa36e = "",
    _0x270f65 = "",
    _0x3695b0 = "",
    _0x5b909d;
const _0x3688d3 = process.env.JDZHBNUM || "9999",
      _0x24f6ab = process.env.HLDELAY || "1",
      _0x40e7d6 = process.env.JDZHBTORED || false,
      _0x3a3c33 = process.env.JDZHBTOPPIN || "",
      _0x148e48 = process.env.ZZHBCODE || "";

if (process.env.DY_PROXY) {
  try {
    _0x195b79 = require("./function/proxy.js");
    $.dget = _0x195b79.intoRequest($.get.bind($));
    $.dpost = _0x195b79.intoRequest($.post.bind($));
  } catch {
    $.dget = $.get;
    $.dpost = $.post;
  }
} else {
  $.dpost = $.post;
  $.dget = $.get;
}

if ($.isNode()) {
  Object.keys(_0x3ef39d).forEach(_0x3f44f5 => {
    _0x20e845.push(_0x3ef39d[_0x3f44f5]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x20e845 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0xdc9443($.getdata("CookiesJD") || "[]").map(_0x2816c5 => _0x2816c5.cookie)].filter(_0x389f18 => !!_0x389f18);
}

!(async () => {
  if (!_0x20e845[0]) {
    const _0x51cee0 = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x51cee0);
    return;
  }

  $.log("\n❗❗❗每天1次助力次数，0点刷新，仅助力❗❗❗");
  $.log("\n当前版本：20240305");
  console.log("执行流程，车头开团--助力");
  console.log("TG频道：https://t.me/dylan_jdpro");
  $.log("\n环境变量清单（可选项）：");
  $.log("  指定PIN车头，不指定默认CK1  JDZHBTOPPIN='jdpin'\n  指定助力CODE，都去助力TA  ZZHBCODE='xxx'\n  多少助力停止，默认9999个  JDZHBNUM='100'\n  运行一次抽奖次数,默认抽完  JDZHBLTNUM='200'\n  抽奖间隔，默认1秒  JDZHBDELAY='3'\n  提现间隔，默认5秒  TXDELAY='3'\n  助力间隔，默认1秒  HLDELAY='3'\n  提现范围，默认1天内，太大会403  TXIVAL='3'\n  开启提现到上限转红包  JDZHBTORED='true'\n  开启代理API DY_PROXY='apiurl'\n  关闭提现  NOTX='true'\n");

  let _0x2e04e6 = [];

  if (_0x3a3c33) {
    console.log("\n已指定PIN：" + _0x3a3c33);

    let _0x41d16e = _0x20e845.findIndex(_0x464436 => _0x464436.includes(_0x3a3c33));

    if (_0x41d16e == -1) {
      console.log("运行的CK中没找到指定的PIN，停止执行");
      return;
    }

    _0xdaa36e = _0x20e845[_0x41d16e];
  } else {
    console.log("\n未指定PIN默认CK1车头");
    _0xdaa36e = _0x20e845[0];
  }

  _0x5c6358 = _0xdaa36e;
  $.UserName = decodeURIComponent(_0x5c6358.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5c6358.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
  $.isLogin = true;
  $.nickName = "";
  $.UA = _0x2627e0.UARAM ? _0x2627e0.UARAM() : _0x2627e0.USER_AGENT;
  console.log("\n————————————————————车头开团——————————————————————————");
  console.log("账号：" + ($.nickName || $.UserName));
  await _0x40c4c8();

  if (!$.isLogin) {
    const _0x47b734 = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x47b734);
    $.isNode() && (await _0x257616.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
    return;
  }

  await _0xc5e14a(1);
  await $.wait(1000);

  if (_0x2e04e6.length != 0) {
    let _0x4f1f8e = _0x2e04e6[Math.floor(Math.random() * _0x2e04e6.length)];

    console.log("车头去助力 -> 作者");
    $.UserName = decodeURIComponent(_0x5c6358.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5c6358.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.UA = _0x2627e0.UARAM ? _0x2627e0.UARAM() : _0x2627e0.USER_AGENT;
    await _0x3895aa(_0x4f1f8e);
    await $.wait(2000);
  }

  console.log("——————————————————————————————————————————————————————");
  console.log("\n\n———————开始助力车头(助力间隔" + _0x24f6ab + "秒)———————————");
  _0x148e48 && (console.log("\n已指定助力CODE,那抛弃车头去助力TA"), _0x8e1902 = [], _0x8e1902.push(_0x148e48));
  _0x5b909d = 0;

  for (let _0x3ef6d5 of _0x8e1902) {
    if (_0x20e845.length === 1) {
      console.log("");
      break;
    }

    console.log("\n去助力-> " + _0x3ef6d5);
    $.suc = 0;

    for (let _0x4591bb = _0x5b909d; _0x4591bb < _0x20e845.length; _0x4591bb++) {
      if (_0x20e845[_0x4591bb]) {
        _0x5c6358 = _0x20e845[_0x4591bb];
        $.UserName = decodeURIComponent(_0x5c6358.match(/pt_pin=([^; ]+)(?=;?)/) && _0x5c6358.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = _0x4591bb + 1;
        $.isLogin = true;
        $.nickName = "";
        $.UA = _0x2627e0.UARAM ? _0x2627e0.UARAM() : _0x2627e0.USER_AGENT;
        console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
        await _0x3895aa(_0x3ef6d5);
        _0x195b79.swip && (await _0x195b79.swip());

        if ($.suc >= Number(_0x3688d3)) {
          $.log("已达目标助力数，跳出！");
          _0x5b909d = _0x4591bb + 1;
          break;
        }

        await $.wait(_0x24f6ab * 1000);
      }
    }

    if ($.index === _0x20e845.length) {
      console.log("\n没有可用于助力的ck，跳出！");
      break;
    }
  }
})().catch(_0x1c3946 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x1c3946 + "!", "");
}).finally(() => {
  $.done();
});

async function _0xc5e14a(_0x12b58f) {
  const _0x1f146b = {
    linkId: "3orGfh1YkwNLksxOcN8zWQ",
    inviter: ""
  };
  let _0x549e1a = _0x1f146b,
      _0xadc0bb = {
    appId: "eb67b",
    fn: "inviteFissionHome",
    body: _0x549e1a,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    xcr: 1,
    ua: $.UA
  };
  _0x549e1a = await _0x354be1.getbody(_0xadc0bb);

  if (!_0x549e1a) {
    return;
  }

  return new Promise(async _0x558fad => {
    $.dpost(_0x224cf6(_0x549e1a), async (_0x34a459, _0x546a48, _0x4e0aa1) => {
      try {
        if (_0x34a459) {
          console.log("" + JSON.stringify(_0x34a459));
          console.log("homeinfo请求失败，请检查网路重试");
        } else {
          _0x4e0aa1 = JSON.parse(_0x4e0aa1);

          if (_0x4e0aa1.code == 0) {
            $.times = _0x4e0aa1.data.prizeNum;

            if (_0x12b58f) {
              console.log("我的助力码：" + _0x4e0aa1.data.inviter);
            }

            _0x8e1902.push(_0x4e0aa1.data.inviter);
          } else {
            console.log(_0x4e0aa1.errMsg);
          }
        }
      } catch (_0x105ade) {
        $.logErr(_0x105ade, _0x546a48);
      } finally {
        _0x558fad(_0x4e0aa1);
      }
    });
  });
}

async function _0x2d8e9b() {
  const _0x43f470 = {
    linkId: "3orGfh1YkwNLksxOcN8zWQ"
  };
  let _0x11d14a = _0x43f470,
      _0x4a80e5 = {
    appId: "b8469",
    fn: "inviteFissionReceive",
    body: _0x11d14a,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    ua: $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0x11d14a = await _0x354be1.getbody(_0x4a80e5);

  if (!_0x11d14a) {
    return;
  }

  return new Promise(async _0x567411 => {
    $.dpost(_0x224cf6(_0x11d14a), async (_0x1d33b2, _0x1cf29b, _0x7bd9e6) => {
      try {
        if (_0x1d33b2) {
          console.log("" + JSON.stringify(_0x1d33b2));
          console.log("receive请求失败，请检查网路重试");
          _0x1d33b2.includes("403") && ($.banip = true);
        } else {
          _0x7bd9e6 = JSON.parse(_0x7bd9e6);

          if (_0x7bd9e6.code == 0) {
            process.stdout.write("----提现金" + _0x7bd9e6.data.amount + "(+" + _0x7bd9e6.data.receiveList[0].amount + ")");
            txjscore.push(_0x7bd9e6.data.receiveList[0].amount);
            _0x7bd9e6.data?.["state"] == 3 && (process.stdout.write("----恭喜达成"), $.txj = false, $.txjsuc = true);
          } else {
            if (_0x7bd9e6.code == 80208) {
              process.stdout.write("----送的抽奖次数没有提现金");
            } else {
              _0x7bd9e6.code == 80209 ? (process.stdout.write("----完成标识"), $.txj = false) : console.log(JSON.stringify(_0x7bd9e6));
            }
          }
        }
      } catch (_0x371df5) {
        $.logErr(_0x371df5, _0x1cf29b);
      } finally {
        _0x567411(_0x7bd9e6);
      }
    });
  });
}

async function _0x1a00b3(_0x4f54cc) {
  const _0x3274da = {
    linkId: "3orGfh1YkwNLksxOcN8zWQ"
  };
  let _0x9bad3 = _0x3274da,
      _0x4d3246 = {
    appId: "c02c6",
    fn: "inviteFissionDrawPrize",
    body: _0x9bad3,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    xcr: $.fg,
    ua: $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0x9bad3 = await _0x354be1.getbody(_0x4d3246);

  if (!_0x9bad3) {
    return;
  }

  return new Promise(async _0x5bb709 => {
    $.dpost(_0x224cf6(_0x9bad3), async (_0x11e957, _0x1bb176, _0x4f1145) => {
      try {
        if (_0x11e957) {
          console.log("" + JSON.stringify(_0x11e957));
          console.log("lottery请求失败，请检查网路重试");
          _0x11e957.includes("403") && ($.banip = true);
        } else {
          _0x4f1145 = JSON.parse(_0x4f1145);

          if (_0x4f1145.code == 0) {
            const _0x356815 = _0x4f1145.data.prizeType;

            if (!_0x356815) {
              fail++;
            }

            switch (_0x356815) {
              case 1:
                process.stdout.write("垃.圾.券😤");
                $.txjsuc && $.fail++;
                $.hotflag = false;
                break;

              case 4:
                let _0x1464c9 = parseFloat(_0x4f1145.data.prizeValue).toFixed(2);

                process.stdout.write(_0x1464c9 + "现金💰️");
                _0x457890.push(_0x1464c9);
                const _0x566c67 = {
                  prizeValue: _0x4f1145.data.prizeValue,
                  id: _0x4f1145.data.id,
                  poolBaseId: _0x4f1145.data.poolBaseId,
                  prizeGroupId: _0x4f1145.data.prizeGroupId,
                  prizeBaseId: _0x4f1145.data.prizeBaseId,
                  prizeType: _0x4f1145.data.prizeType,
                  amount: _0x4f1145.data.amount
                };
                _0x2a036e.push(_0x566c67);
                $.fail = 0;
                $.hotflag = false;
                break;

              case 2:
                let _0x539a41 = parseFloat(_0x4f1145.data.prizeValue).toFixed(2);

                process.stdout.write(_0x539a41 + "红包🧧");
                _0x11ec3e.push(_0x539a41);
                $.fail = 0;
                $.hotflag = false;
                break;

              default:
                $.hotflag = false;
                console.log(JSON.stringify(_0x4f1145.data));
            }
          } else {
            if (_0x4f1145.errMsg.includes("火爆")) {
              process.stdout.write("未中奖 ");
              $.hotflag = true;
            } else {
              if (_0x4f1145.errMsg.includes("结束")) {
                $.end = true;
                $.hotflag = false;
                console.log(_0x4f1145.errMsg);
              } else {
                _0x4f1145.errMsg.includes("未登录") ? ($.end = true, $.hotflag = false, console.log(_0x4f1145.errMsg)) : ($.hotflag = false, console.log(_0x4f1145.errMsg));
              }
            }
          }
        }
      } catch (_0x2d704c) {
        $.logErr(_0x2d704c, _0x1bb176);
      } finally {
        _0x5bb709(_0x4f1145);
      }
    });
  });
}

async function _0x401f50(_0xf57e2a) {
  const _0x2b93ff = {
    pageNum: _0xf57e2a,
    pageSize: 100,
    linkId: "3orGfh1YkwNLksxOcN8zWQ",
    business: "fission"
  };
  let _0x303945 = _0x2b93ff,
      _0x340fd8 = {
    appId: "f2b1d",
    fn: "superRedBagList",
    body: _0x303945,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    ua: $.UA
  };
  _0x303945 = await _0x354be1.getbody(_0x340fd8);

  if (!_0x303945) {
    return;
  }

  return new Promise(async _0x1102f3 => {
    $.dget(_0x224cf6(_0x303945), async (_0x465857, _0x42f013, _0xe9c8de) => {
      try {
        _0x465857 ? (console.log("" + JSON.stringify(_0x465857)), console.log(" API请求失败，请检查网路重试"), _0x465857.includes("403") && ($.banip = true), _0xe9c8de = "") : (_0xe9c8de = JSON.parse(_0xe9c8de), _0xe9c8de.code == 0 ? $.baglist = _0xe9c8de.data.items : console.log(_0xe9c8de.errMsg));
      } catch (_0x166404) {
        $.logErr(_0x166404, _0x42f013);
      } finally {
        _0x1102f3(_0xe9c8de);
      }
    });
  });
}

async function _0x3895aa(_0x52c8cf) {
  const _0x37fa49 = {
    linkId: "3orGfh1YkwNLksxOcN8zWQ",
    isJdApp: true,
    inviter: _0x52c8cf
  };
  let _0x5876d7 = _0x37fa49,
      _0x46e669 = {
    appId: "c5389",
    fn: "inviteFissionhelp",
    body: _0x5876d7,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    xcr: 1,
    ua: $.UA
  };
  _0x5876d7 = await _0x354be1.getbody(_0x46e669);

  if (!_0x5876d7) {
    return;
  }

  return new Promise(async _0x6365b9 => {
    $.dpost(_0x224cf6(_0x5876d7), async (_0x5022af, _0xec167c, _0x4ae366) => {
      try {
        if (_0x5022af) {
          console.log("" + JSON.stringify(_0x5022af));
          console.log("help请求失败，请检查网路重试");
          _0x5022af.includes("403") && ($.banip = true);
        } else {
          _0x4ae366 = JSON.parse(_0x4ae366);

          if (_0x4ae366.code == 0) {
            if (!_0x4ae366.data.helpFlg) {
              $.log("结果：不能助力自己！");
              return;
            }

            if (_0x4ae366.data.helpResult == 1) {
              $.suc++;
              console.log("结果：助力成功 ✅ " + ($.suc || ""));
            } else {
              if (_0x4ae366.data.helpResult == 6) {
                console.log("结果：已经助力过TA！");
              } else {
                if (_0x4ae366.data.helpResult == 3) {
                  console.log("结果：没有次数！");
                } else {
                  if (_0x4ae366.data.helpResult == 2) {
                    $.log("结果：太火爆了 💣");
                    $.hot = true;
                  } else {
                    if (_0x4ae366.data.helpResult == 4) {
                      $.log("结果：没有助力次数！");
                    } else {
                      _0x4ae366.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log("结果：" + _0x4ae366.data?.["helpResult"]);
                    }
                  }
                }
              }
            }
          } else {
            console.log(_0x4ae366.errMsg);
          }
        }
      } catch (_0x3c94e8) {
        $.logErr(_0x3c94e8, _0xec167c);
      } finally {
        _0x6365b9(_0x4ae366);
      }
    });
  });
}

async function _0x27a63d(_0x3141e3, _0x326e9d) {
  let _0x4b38ee = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x3141e3.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x3141e3.poolBaseId + ",\"prizeGroupId\":" + _0x3141e3.prizeGroupId + ",\"prizeBaseId\":" + _0x3141e3.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

  return new Promise(async _0x48f3c7 => {
    $.dpost(_0x224cf6(_0x4b38ee), async (_0x3032a6, _0x5da577, _0x5a6dbd) => {
      try {
        if (_0x3032a6) {
          console.log("" + JSON.stringify(_0x3032a6));
          console.log("apCashWithDraw请求失败，请检查网路重试");
          _0x3032a6.includes("403") && ($.banip = true);
        } else {
          _0x5a6dbd = JSON.parse(_0x5a6dbd);

          if (_0x5a6dbd.code == 0) {
            if (_0x5a6dbd.data.message.indexOf("待发放") > -1) {
              process.stdout.write("❎");
              $.txfail = true;
            } else {
              if (_0x5a6dbd.data.message.includes("上限")) {
                !_0x40e7d6 && console.log("提现到上限");
                $.txfull = true;
                $.txfail = false;
              } else {
                _0x5a6dbd.data.message.includes("提现") ? (process.stdout.write("✅ "), $.txsuc.push(_0x326e9d), $.txfail = false) : console.log(_0x5a6dbd.data.message);
              }
            }
          } else {
            console.log(_0x5a6dbd.errMsg);
          }
        }
      } catch (_0x3e22d0) {
        $.logErr(_0x3e22d0, _0x5da577);
      } finally {
        _0x48f3c7(_0x5a6dbd);
      }
    });
  });
}

async function _0x12cb26(_0x244913, _0x6cf3c7) {
  let _0x6a7824 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x244913.id + ",\"business\":\"fission\",\"poolId\":" + _0x244913.poolBaseId + ",\"prizeGroupId\":" + _0x244913.prizeGroupId + ",\"prizeId\":" + _0x244913.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

  const _0x3ef9ac = {
    Host: "api.m.jd.com",
    Origin: "https://prodev.m.jd.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    Cookie: _0x5c6358
  };
  const _0x82673e = {
    url: "https://api.m.jd.com/api",
    body: _0x6a7824,
    headers: _0x3ef9ac
  };
  return new Promise(async _0x30b91c => {
    $.dpost(_0x82673e, async (_0x1a0171, _0x22af5d, _0x4b6b2c) => {
      try {
        if (_0x1a0171) {
          console.log("" + JSON.stringify(_0x1a0171));
          console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
          _0x1a0171.includes("403") && ($.banip = true);
        } else {
          _0x4b6b2c = JSON.parse(_0x4b6b2c);

          if (_0x4b6b2c.code == 0) {
            if (_0x4b6b2c.data.resCode === "0") {
              process.stdout.write("🧧 ");
              $.toredsuc.push(_0x6cf3c7);
            } else {
              process.stdout.write("❎ ");
              $.toredfailnum++;
            }
          } else {
            _0x4b6b2c.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x4b6b2c.errMsg);
          }
        }
      } catch (_0x18c248) {
        $.logErr(_0x18c248, _0x22af5d);
      } finally {
        _0x30b91c(_0x4b6b2c);
      }
    });
  });
}

function _0x224cf6(_0x3bc099) {
  const _0x394ace = {
    Host: "api.m.jd.com",
    Origin: "https://pro.m.jd.com",
    Referer: "https://pro.m.jd.com/",
    "User-Agent": $.UA,
    Cookie: _0x5c6358
  };
  const _0x57541d = {
    url: "https://api.m.jd.com/?" + _0x3bc099,
    headers: _0x394ace
  };
  return _0x57541d;
}

function _0x40c4c8() {
  return new Promise(_0x49b977 => {
    const _0x4fdfba = {
      Cookie: _0x5c6358,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x253e94 = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x4fdfba,
      timeout: 10000
    };
    $.get(_0x253e94, (_0xe5a879, _0x482779, _0x4f318d) => {
      try {
        if (_0x4f318d) {
          _0x4f318d = JSON.parse(_0x4f318d);

          if (!(_0x4f318d.islogin === "1")) {
            _0x4f318d.islogin === "0" && ($.isLogin = false);
          }
        }
      } catch (_0x409281) {
        console.log(_0x409281);
      } finally {
        _0x49b977();
      }
    });
  });
}

function _0x426bc3() {
  return new Promise(_0x252807 => {
    !_0x5de884 ? $.msg($.name, "", "" + _0x270f65) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x270f65);

    _0x252807();
  });
}

function _0x189c74(_0x334e00) {
  try {
    if (typeof JSON.parse(_0x334e00) == "object") {
      return true;
    }
  } catch (_0x27a158) {
    console.log(_0x27a158);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}


function _0x292508(_0x5e8587) {
  const _0x405758 = _0x5e8587.getFullYear(),
        _0x22e813 = ("0" + (_0x5e8587.getMonth() + 1)).slice(-2),
        _0x18d1b1 = ("0" + _0x5e8587.getDate()).slice(-2),
        _0x54bf84 = ("0" + _0x5e8587.getHours()).slice(-2),
        _0x478dfa = ("0" + _0x5e8587.getMinutes()).slice(-2),
        _0x80f1ca = ("0" + _0x5e8587.getSeconds()).slice(-2);

  return _0x405758 + "/" + _0x22e813 + "/" + _0x18d1b1 + " " + _0x54bf84 + ":" + _0x478dfa + ":" + _0x80f1ca;
}

function _0xdc9443(_0x51f26e) {
  if (typeof _0x51f26e == "string") {
    try {
      return JSON.parse(_0x51f26e);
    } catch (_0xbf7502) {
      console.log(_0xbf7502);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\n🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }