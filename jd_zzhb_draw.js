
/*
转赚红包,只抽奖提现
1 1 10 10 * https://raw.githubusercontent.com/6dylan6/jdpro/main/jd_zzhb_draw.js
 */
let lnrun = 0;

const $ = new Env('Jd转赚红包_抽奖提现');
const _0x4f2385 = $.isNode() ? require("./jdCookie.js") : "",
      _0x202f1b = require("./function/dylano"),
      _0x2837ff = require("./USER_AGENTS");

let _0x3b3943 = true,
    _0x3a5a6e = [],
    _0x181125 = [],
    _0x31e385 = [],
    _0x1935ec = [],
    _0x3d5844 = {},
    _0x2f4dfa = [],
    _0x107ac4 = "",
    _0x409275 = "";
const _0x203a3f = process.env.JDZHBLTNUM || "-1",
      _0x1d1dba = process.env.JDZHBDELAY || "1",
      _0x28e0d9 = process.env.TXDELAY || "5",
      _0x5819f0 = process.env.TXIVAL || "1",
      _0x65a547 = process.env.JDZHBTORED || false,
      _0x5f1420 = process.env.TXSILENT || false,
      _0x3857c5 = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) {
  try {
    _0x3d5844 = require("./function/proxy.js");
    $.dget = _0x3d5844.intoRequest($.get.bind($));
    $.dpost = _0x3d5844.intoRequest($.post.bind($));
  } catch {
    $.dget = $.get;
    $.dpost = $.post;
  }
} else {
  $.dpost = $.post;
  $.dget = $.get;
}

if ($.isNode()) {
  Object.keys(_0x4f2385).forEach(_0x5ae73c => {
    _0x2f4dfa.push(_0x4f2385[_0x5ae73c]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x2f4dfa = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x7c3e2a($.getdata("CookiesJD") || "[]").map(_0x2fdb70 => _0x2fdb70.cookie)].filter(_0x5b9b2e => !!_0x5b9b2e);
}

!(async () => {
  if (!_0x2f4dfa[0]) {
    const _0x5c5ddc = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", _0x5c5ddc);
    return;
  }

  $.log("\n❗❗❗注意此活动24小时一轮，抽奖次数过期清零❗❗❗");
  $.log("❗❗❗目前只对本次运行获得的现金进行提现❗❗❗");
  $.log("\n当前版本：20240305 ");
  console.log("执行流程，抽奖--提现");
  console.log("TG频道：https://t.me/dylan_jdpro");
  $.log("\n环境变量清单（可选项）：");
  $.log("  运行一次抽奖次数,默认抽完  JDZHBLTNUM='200'\n  抽奖间隔，默认1秒  JDZHBDELAY='3'\n  提现间隔，默认5秒，单位秒  TXDELAY='3'\n  提现范围，默认1天内，太大会403  TXIVAL='3'\n  开启提现到上限转红包  JDZHBTORED='true'\n  开启代理API DY_PROXY='apiurl'\n  关闭提现  NOTX='true'\n");
  console.log("\n开始抽奖和提现...");
  _0x203a3f > -1 && console.log("\n已设置本次运行抽奖次数 " + _0x203a3f);

  let _0x49dab3 = new Date();

  _0x49dab3.setDate(_0x49dab3.getDate() - _0x5819f0);

  for (let _0x523c78 = 0; _0x523c78 < _0x2f4dfa.length; _0x523c78++) {
    if (_0x2f4dfa[_0x523c78]) {
      _0x107ac4 = _0x2f4dfa[_0x523c78];
      $.UserName = decodeURIComponent(_0x107ac4.match(/pt_pin=([^; ]+)(?=;?)/) && _0x107ac4.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x523c78 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.fail = 0;
      _0x181125 = [];
      _0x31e385 = [];
      txjscore = [];
      $.txj = true;
      $.fg = 1;
      $.txfull = false;
      $.nocashnum = 0;
      $.end = false;
      $.hotflag = false;
      $.toredfailnum = 0;
      $.txjsuc = false;
      $.UA = _0x2837ff.UARAM ? _0x2837ff.UARAM() : _0x2837ff.USER_AGENT;
      console.log("\n\n--------开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "----------\n");

      let _0xad295d = await _0x515b46(1);

      await $.wait(1000);

      if (_0xad295d.code != "0") {
        continue;
      }

      $.log("本轮已抽奖次数：" + _0xad295d.data.drawPrizeNum);
      $.log("本轮剩余抽奖次数：" + $.times);

      if (_0xad295d.data.cashVo) {
        if (_0xad295d.data?.["cashVo"]?.["state"] === 1) {
          $.log("本轮提现金进度：" + _0xad295d.data.cashVo.amount + "/" + _0xad295d.data.cashVo.totalAmount + "(-" + _0xad295d.data.cashVo.leftAmount + ")");
        } else {
          _0xad295d.data?.["cashVo"]?.["state"] === 3 && ($.log("本轮提现金达成：" + _0xad295d.data.cashVo.amount + "/" + _0xad295d.data.cashVo.totalAmount), $.txj = false, $.txjsuc = true);
        }
      } else {
        $.txj = false;
      }

      $.log("本轮结束时间： " + _0x45cb1e(new Date(Date.now() + _0xad295d.data.countDownTime)));

      for (let _0x15c232 = 0; _0x15c232 < (_0x203a3f > -1 && _0x203a3f < $.times ? _0x203a3f : $.times); _0x15c232++) {
        process.stdout.write("\n第" + (_0x15c232 + 1) + "次抽奖结果：");

        for (let _0x561552 of Array(3)) {
          await _0x3eefb8(_0x561552 + 1);

          if (!$.hotflag) {
            break;
          }

          await $.wait(Math.random() * 500 + _0x1d1dba * 1000);
        }

        if ($.end) {
          break;
        }

        $.txj && (await _0x58620a());
        await $.wait(Math.random() * 500 + _0x1d1dba * 1000);

        if ($.fail > 2) {
          $.log("连续3次优惠券，不继续抽了");
          break;
        }
      }

      _0x31e385.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x31e385.reduce((_0x58128e, _0x5c689a) => _0x58128e + _0x5c689a * 100, 0) / 100 + "元");
      _0x181125.length !== 0 && $.log("\n\n本次抽奖获得现金总计：" + _0x181125.reduce((_0x5e6a27, _0x55eaa3) => _0x5e6a27 + _0x55eaa3 * 100, 0) / 100 + "元");

      if (txjscore.length !== 0) {
        let _0xff08f8 = txjscore.reduce((_0x356e0b, _0x138633) => _0x356e0b + _0x138633 * 100, 0) / 100;

        $.log("\n\n本次抽奖获得提现金：" + _0xff08f8 + "个, 平均" + (_0xff08f8 / (_0x203a3f > -1 ? Math.min.apply(null, [_0x203a3f, $.times]) : $.times)).toFixed(4) + "个/抽");
      }

      if ($.end) {
        continue;
      }

      if (_0x3857c5 != "true") {
        if (new Date().getHours() < 6 && _0x5f1420) {
          continue;
        }

        $.log("\n——————————开始提现（间隔" + _0x28e0d9 + "秒，范围" + _0x5819f0 + "天内）——————");
        _0x65a547 && $.log("\n已开启转红包，提现上限会自动转红包！！\n");
        $.txsuc = [];
        $.toredsuc = [];

        for (let _0x8c8472 = 0; _0x8c8472 < 1; _0x8c8472++) {
          if ($.nocashnum > 2 || $.toredfailnum > 4) {
            break;
          }

          while (_0x1935ec.length > 0) {
            console.log("\n" + _0x1935ec.length);

            for (let _0x3f38b1 = 0; _0x3f38b1 < _0x1935ec.length;) {
              let _0x4b6e15 = _0x1935ec[_0x3f38b1];

              if (_0x4b6e15.prizeType == 4) {
                process.stdout.write("" + Number(_0x4b6e15.amount));

                let _0x14194d = await _0x5a8e2d(_0x4b6e15, Number(_0x4b6e15.amount));

                $.txfail && (await $.wait(5000), _0x14194d = await _0x5a8e2d(_0x4b6e15, Number(_0x4b6e15.amount)));
                $.txfail ? _0x3f38b1++ : _0x1935ec.splice(_0x3f38b1, 1);

                if (_0x14194d.data.message.includes("上限") && _0x65a547 == "true" && $.toredfailnum < 5) {
                  await _0x58734c(_0x4b6e15, Number(_0x4b6e15.amount));
                }

                await $.wait(_0x28e0d9 * 1000);
              }
            }

            await $.wait(2000);
          }
        }

        $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0x23f157, _0xcf0045) => _0x23f157 + _0xcf0045 * 100, 0) / 100 + "元");
        $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x374eb2, _0x434835) => _0x374eb2 + _0x434835 * 100, 0) / 100 + "元");
      } else {
        $.log("\n\n⚠已设置不提现！");
      }

      _0x1935ec = [];
      await $.wait(2000);
    }
  }
})().catch(_0x84b632 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x84b632 + "!", "");
}).finally(() => {
  $.done();
});

async function _0x515b46(_0x33fdcf) {
  const _0x4cc880 = {
    linkId: "3orGfh1YkwNLksxOcN8zWQ",
    inviter: ""
  };
  let _0x24921c = _0x4cc880,
      _0x3c50d2 = {
    appId: "eb67b",
    fn: "inviteFissionHome",
    body: _0x24921c,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    xcr: 1,
    ua: $.UA
  };
  _0x24921c = await _0x202f1b.getbody(_0x3c50d2);

  if (!_0x24921c) {
    return;
  }

  return new Promise(async _0x3269e9 => {
    $.dpost(_0x486224(_0x24921c), async (_0x49e834, _0x5ae6b1, _0x3cbc34) => {
      try {
        if (_0x49e834) {
          console.log("" + JSON.stringify(_0x49e834));
          console.log("homeinfo请求失败，请检查网路重试");
        } else {
          _0x3cbc34 = JSON.parse(_0x3cbc34);

          if (_0x3cbc34.code == 0) {
            $.times = _0x3cbc34.data.prizeNum;

            if (_0x33fdcf) {
              console.log("我的助力码：" + _0x3cbc34.data.inviter);
            }

            _0x3a5a6e.push(_0x3cbc34.data.inviter);
          } else {
            console.log(_0x3cbc34.errMsg);
          }
        }
      } catch (_0xa7cc2f) {
        $.logErr(_0xa7cc2f, _0x5ae6b1);
      } finally {
        _0x3269e9(_0x3cbc34);
      }
    });
  });
}

async function _0x58620a() {
  const _0x2919fc = {
    linkId: "3orGfh1YkwNLksxOcN8zWQ"
  };
  let _0x1b4412 = _0x2919fc,
      _0x300ba2 = {
    appId: "b8469",
    fn: "inviteFissionReceive",
    body: _0x1b4412,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    ua: $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0x1b4412 = await _0x202f1b.getbody(_0x300ba2);

  if (!_0x1b4412) {
    return;
  }

  return new Promise(async _0x269b2e => {
    $.dpost(_0x486224(_0x1b4412), async (_0x3324cb, _0x4fe5fc, _0x2403fe) => {
      try {
        if (_0x3324cb) {
          console.log("" + JSON.stringify(_0x3324cb));
          console.log("receive请求失败，请检查网路重试");
          _0x3324cb.includes("403") && ($.banip = true);
        } else {
          _0x2403fe = JSON.parse(_0x2403fe);

          if (_0x2403fe.code == 0) {
            process.stdout.write("----提现金" + _0x2403fe.data.amount + "(+" + _0x2403fe.data.receiveList[0].amount + ")");
            txjscore.push(_0x2403fe.data.receiveList[0].amount);
            _0x2403fe.data?.["state"] == 3 && (process.stdout.write("----恭喜达成"), $.txj = false, $.txjsuc = true);
          } else {
            if (_0x2403fe.code == 80208) {
              process.stdout.write("----送的抽奖次数没有提现金");
            } else {
              _0x2403fe.code == 80209 ? (process.stdout.write("----完成标识"), $.txj = false) : console.log(JSON.stringify(_0x2403fe));
            }
          }
        }
      } catch (_0x2ba43e) {
        $.logErr(_0x2ba43e, _0x4fe5fc);
      } finally {
        _0x269b2e(_0x2403fe);
      }
    });
  });
}

async function _0x3eefb8(_0x592663) {
  const _0x3813a5 = {
    linkId: "3orGfh1YkwNLksxOcN8zWQ"
  };
  let _0x4048f4 = _0x3813a5,
      _0x198510 = {
    appId: "c02c6",
    fn: "inviteFissionDrawPrize",
    body: _0x4048f4,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    xcr: $.fg,
    ua: $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0x4048f4 = await _0x202f1b.getbody(_0x198510);

  if (!_0x4048f4) {
    return;
  }

  return new Promise(async _0x46023e => {
    $.dpost(_0x486224(_0x4048f4), async (_0x8ec5ca, _0x247dbe, _0x520eb2) => {
      try {
        if (_0x8ec5ca) {
          console.log("" + JSON.stringify(_0x8ec5ca));
          console.log("lottery请求失败，请检查网路重试");
          _0x8ec5ca.includes("403") && ($.banip = true);
        } else {
          _0x520eb2 = JSON.parse(_0x520eb2);

          if (_0x520eb2.code == 0) {
            const _0x3e5ae6 = _0x520eb2.data.prizeType;

            if (!_0x3e5ae6) {
              fail++;
            }

            switch (_0x3e5ae6) {
              case 1:
                process.stdout.write("垃.圾.券😤");
                $.txjsuc && $.fail++;
                $.hotflag = false;
                break;

              case 4:
                let _0x13eb38 = parseFloat(_0x520eb2.data.prizeValue).toFixed(2);

                process.stdout.write(_0x13eb38 + "现金💰️");
                _0x181125.push(_0x13eb38);
                const _0x5adf0e = {
                  prizeValue: _0x520eb2.data.prizeValue,
                  id: _0x520eb2.data.id,
                  poolBaseId: _0x520eb2.data.poolBaseId,
                  prizeGroupId: _0x520eb2.data.prizeGroupId,
                  prizeBaseId: _0x520eb2.data.prizeBaseId,
                  prizeType: _0x520eb2.data.prizeType,
                  amount: _0x520eb2.data.amount
                };
                _0x1935ec.push(_0x5adf0e);
                $.fail = 0;
                $.hotflag = false;
                break;

              case 2:
                let _0x19cb3b = parseFloat(_0x520eb2.data.prizeValue).toFixed(2);

                process.stdout.write(_0x19cb3b + "红包🧧");
                _0x31e385.push(_0x19cb3b);
                $.fail = 0;
                $.hotflag = false;
                break;

              default:
                $.hotflag = false;
                console.log(JSON.stringify(_0x520eb2.data));
            }
          } else {
            if (_0x520eb2.errMsg.includes("火爆")) {
              process.stdout.write("未中奖 ");
              $.hotflag = true;
            } else {
              if (_0x520eb2.errMsg.includes("结束")) {
                $.end = true;
                $.hotflag = false;
                console.log(_0x520eb2.errMsg);
              } else {
                _0x520eb2.errMsg.includes("未登录") ? ($.end = true, $.hotflag = false, console.log(_0x520eb2.errMsg)) : ($.hotflag = false, console.log(_0x520eb2.errMsg));
              }
            }
          }
        }
      } catch (_0x3fcd7d) {
        $.logErr(_0x3fcd7d, _0x247dbe);
      } finally {
        _0x46023e(_0x520eb2);
      }
    });
  });
}

async function _0x56dca8(_0x40ce7c) {
  const _0x27ee09 = {
    pageNum: _0x40ce7c,
    pageSize: 100,
    linkId: "3orGfh1YkwNLksxOcN8zWQ",
    business: "fission"
  };
  let _0x522e24 = _0x27ee09,
      _0x537b9b = {
    appId: "f2b1d",
    fn: "superRedBagList",
    body: _0x522e24,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    ua: $.UA
  };
  _0x522e24 = await _0x202f1b.getbody(_0x537b9b);

  if (!_0x522e24) {
    return;
  }

  return new Promise(async _0x50f203 => {
    $.dget(_0x486224(_0x522e24), async (_0x498e55, _0x242713, _0x235c3e) => {
      try {
        _0x498e55 ? (console.log("" + JSON.stringify(_0x498e55)), console.log(" API请求失败，请检查网路重试"), _0x498e55.includes("403") && ($.banip = true), _0x235c3e = "") : (_0x235c3e = JSON.parse(_0x235c3e), _0x235c3e.code == 0 ? $.baglist = _0x235c3e.data.items : console.log(_0x235c3e.errMsg));
      } catch (_0x910ac5) {
        $.logErr(_0x910ac5, _0x242713);
      } finally {
        _0x50f203(_0x235c3e);
      }
    });
  });
}

async function _0x5a8e2d(_0x579245, _0x5b2318) {
  let _0x3a61e4 = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x579245.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x579245.poolBaseId + ",\"prizeGroupId\":" + _0x579245.prizeGroupId + ",\"prizeBaseId\":" + _0x579245.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

  return new Promise(async _0x119f37 => {
    $.dpost(_0x486224(_0x3a61e4), async (_0x717e0, _0x59efec, _0x4defce) => {
      try {
        if (_0x717e0) {
          console.log("" + JSON.stringify(_0x717e0));
          console.log("apCashWithDraw请求失败，请检查网路重试");
          _0x717e0.includes("403") && ($.banip = true);
        } else {
          _0x4defce = JSON.parse(_0x4defce);

          if (_0x4defce.code == 0) {
            if (_0x4defce.data.message.indexOf("待发放") > -1) {
              process.stdout.write("❎");
              $.txfail = true;
            } else {
              if (_0x4defce.data.message.includes("上限")) {
                !_0x65a547 && console.log("提现到上限");
                $.txfull = true;
                $.txfail = false;
              } else {
                _0x4defce.data.message.includes("提现") ? (process.stdout.write("✅ "), $.txsuc.push(_0x5b2318), $.txfail = false) : console.log(_0x4defce.data.message);
              }
            }
          } else {
            console.log(_0x4defce.errMsg);
          }
        }
      } catch (_0xabb2b0) {
        $.logErr(_0xabb2b0, _0x59efec);
      } finally {
        _0x119f37(_0x4defce);
      }
    });
  });
}

async function _0x58734c(_0x42dce1, _0x1f7bba) {
  let _0xd5e3af = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x42dce1.id + ",\"business\":\"fission\",\"poolId\":" + _0x42dce1.poolBaseId + ",\"prizeGroupId\":" + _0x42dce1.prizeGroupId + ",\"prizeId\":" + _0x42dce1.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

  const _0x3dc452 = {
    Host: "api.m.jd.com",
    Origin: "https://prodev.m.jd.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    Cookie: _0x107ac4
  };
  const _0x3a2be5 = {
    url: "https://api.m.jd.com/api",
    body: _0xd5e3af,
    headers: _0x3dc452
  };
  return new Promise(async _0x2ecb00 => {
    $.dpost(_0x3a2be5, async (_0x2ca213, _0x38f1d0, _0xa06611) => {
      try {
        if (_0x2ca213) {
          console.log("" + JSON.stringify(_0x2ca213));
          console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
          _0x2ca213.includes("403") && ($.banip = true);
        } else {
          _0xa06611 = JSON.parse(_0xa06611);

          if (_0xa06611.code == 0) {
            _0xa06611.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0x1f7bba)) : (process.stdout.write("❎ "), $.toredfailnum++);
          } else {
            if (_0xa06611.errMsg === "失败") {
              process.stdout.write("❎ ");
              $.toredfailnum++;
            } else {
              console.log(_0xa06611.errMsg);
            }
          }
        }
      } catch (_0x447bb2) {
        $.logErr(_0x447bb2, _0x38f1d0);
      } finally {
        _0x2ecb00(_0xa06611);
      }
    });
  });
}

function _0x486224(_0x5999a5) {
  const _0x2aefc3 = {
    Host: "api.m.jd.com",
    Origin: "https://pro.m.jd.com",
    Referer: "https://pro.m.jd.com/",
    "User-Agent": $.UA,
    Cookie: _0x107ac4
  };
  const _0x1e474a = {
    url: "https://api.m.jd.com/?" + _0x5999a5,
    headers: _0x2aefc3
  };
  return _0x1e474a;
}

function _0x5cae9e() {
  return new Promise(_0x37af62 => {
    const _0x3f59bc = {
      Cookie: _0x107ac4,
      referer: "https://h5.m.jd.com/",
      "User-Agent": $.UA
    };
    const _0x34935c = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: _0x3f59bc,
      timeout: 10000
    };
    $.get(_0x34935c, (_0x1f0af3, _0x59e574, _0x378664) => {
      try {
        if (_0x378664) {
          _0x378664 = JSON.parse(_0x378664);

          if (!(_0x378664.islogin === "1")) {
            if (_0x378664.islogin === "0") {
              $.isLogin = false;
            }
          }
        }
      } catch (_0x24ce75) {
        console.log(_0x24ce75);
      } finally {
        _0x37af62();
      }
    });
  });
}

function _0x57f888() {
  return new Promise(_0x27c690 => {
    !_0x3b3943 ? $.msg($.name, "", "" + _0x409275) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x409275);

    _0x27c690();
  });
}

function _0x24ad31(_0x9d6c04) {
  try {
    if (typeof JSON.parse(_0x9d6c04) == "object") {
      return true;
    }
  } catch (_0x1ea9d4) {
    console.log(_0x1ea9d4);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}

function _0x45cb1e(_0x29018a) {
  const _0x265c1b = _0x29018a.getFullYear(),
        _0x59ecc4 = ("0" + (_0x29018a.getMonth() + 1)).slice(-2),
        _0x125f5c = ("0" + _0x29018a.getDate()).slice(-2),
        _0x385e80 = ("0" + _0x29018a.getHours()).slice(-2),
        _0x300eb9 = ("0" + _0x29018a.getMinutes()).slice(-2),
        _0x1d2f87 = ("0" + _0x29018a.getSeconds()).slice(-2);

  return _0x265c1b + "/" + _0x59ecc4 + "/" + _0x125f5c + " " + _0x385e80 + ":" + _0x300eb9 + ":" + _0x1d2f87;
}

function _0x7c3e2a(_0x596201) {
  if (typeof _0x596201 == "string") {
    try {
      return JSON.parse(_0x596201);
    } catch (_0x2bc7c6) {
      console.log(_0x2bc7c6);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }