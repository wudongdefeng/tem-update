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
const _0x14d782 = $.isNode() ? require("./sendNotify") : "",
      _0x2ed679 = $.isNode() ? require("./jdCookie.js") : "",
      _0x42fe77 = require("./function/dylanw"),
      _0x414f66 = require("./USER_AGENTS"),
      _0x1090fd = require("./function/dylib");

let _0x29599e = true,
    _0x2dbc78 = [],
    _0x120737 = [],
    _0x20f4d1 = [],
    _0x175ebb = [],
    _0xc48219 = {},
    _0x2bfcb3 = [],
    _0x20410d = "",
    _0xe153bb = "",
    _0x45bbbb = "",
    _0xd143a3 = "",
    _0x5020bf;
const _0x57a760 = process.env.JDZHBNUM || "9999",
      _0x5a3286 = process.env.JDZHBLTNUM || "-1",
      _0x2f997e = process.env.JDZHBDELAY || "1",
      _0x359207 = process.env.TXDELAY || "5",
      _0x5319bd = process.env.HLDELAY || "1",
      _0x4301fe = process.env.TXIVAL || "1",
      _0x235f1f = process.env.JDZHBTORED || false,
      _0x311ad0 = process.env.JDZHBTOPPIN || "",
      _0x54c6c5 = process.env.TXSILENT || false,
      _0x4ba4a9 = process.env.ZZHBCODE || "",
      _0x3d8acc = process.env.CXJLJQ_COUNT || "10",
      _0x180fef = process.env.TX_MODE || "0",
      _0x34024b = process.env.NOTX ? process.env.NOTX : false;

if (process.env.DY_PROXY) {
  try {
    _0xc48219 = require("./function/proxy.js");
    $.dget = _0xc48219.intoRequest($.get.bind($));
    $.dpost = _0xc48219.intoRequest($.post.bind($));
  } catch {
    $.dget = $.get;
    $.dpost = $.post;
  }
} else {
  $.dpost = $.post;
  $.dget = $.get;
}

if ($.isNode()) {
  Object.keys(_0x2ed679).forEach(_0x3d0138 => {
    _0x2bfcb3.push(_0x2ed679[_0x3d0138]);
  });

  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  _0x2bfcb3 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x407d48($.getdata("CookiesJD") || "[]").map(_0x78e7be => _0x78e7be.cookie)].filter(_0x5d7071 => !!_0x5d7071);
}

!(async () => {
  if (!_0x2bfcb3[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  $.log("\n❗❗❗每天1次助力次数，0点刷新❗❗❗");
  $.log("\n当前版本：20240310");
  console.log("执行流程，车头开团--助力車頭--車頭抽獎--車頭提現");
  console.log("TG频道：https://t.me/dylan_jdpro");
  $.log("\n环境变量清单（可选项）：");
  $.log("  指定PIN车头：不指定默认CK1  JDZHBTOPPIN='jdpin'\n  指定助力CODE：都去助力TA  ZZHBCODE='xxx'\n  多少助力停止：默认9999个  JDZHBNUM='100'\n  抽奖次数：默认抽完  JDZHBLTNUM='200'\n  抽奖间隔：默认1秒  JDZHBDELAY='3'\n  提现间隔：默认5秒  TXDELAY='3'\n  助力间隔：默认1秒  HLDELAY='3'\n  提现范围：默认1天内，太大会403  TXIVAL='3'\n  开启提现到上限转红包：JDZHBTORED='true'\n  开启代理：API DY_PROXY='apiurl'\n  垃圾券数量：默认10次，CXJLJQ_COUNT='20'\n  提现模式：默认提当前所得，设置1开启查列表提现，TX_MODE='1'\n  关闭提现：NOTX='true'\n");

  let _0x5b48a1 = [];

  if (_0x311ad0) {
    console.log("\n已指定PIN：" + _0x311ad0);

    let _0x63e3ad = _0x2bfcb3.findIndex(_0xf0fb07 => _0xf0fb07.includes(_0x311ad0));

    if (_0x63e3ad == -1) {
      console.log("运行的CK中没找到指定的PIN，停止执行");
      return;
    }

    _0xe153bb = _0x2bfcb3[_0x63e3ad];
  } else {
    console.log("\n未指定PIN默认CK1车头");
    _0xe153bb = _0x2bfcb3[0];
  }

  _0x20410d = _0xe153bb;
  $.UserName = decodeURIComponent(_0x20410d.match(/pt_pin=([^; ]+)(?=;?)/) && _0x20410d.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
  $.isLogin = true;
  $.nickName = "";
  $.UA = _0x414f66.UARAM ? _0x414f66.UARAM() : _0x414f66.USER_AGENT;
  console.log("\n————————————————————车头开团——————————————————————————");
  console.log("账号：" + ($.nickName || $.UserName));
  await _0xc8ef7d();

  if (!$.isLogin) {
    const _0x4c05df = {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    };
    $.msg($.name, "【提示】cookie已失效", "账号" + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", _0x4c05df);
    $.isNode() && (await _0x14d782.sendNotify($.name + "cookie已失效 - " + $.UserName, "账号 " + $.UserName + "\n请重新登录获取cookie"));
    return;
  }

  await _0x2bc1ee(1);
  await $.wait(1000);

  if (_0x5b48a1.length != 0) {
    let _0x50d8dd = _0x5b48a1[Math.floor(Math.random() * _0x5b48a1.length)];

    console.log("车头去助力 -> 作者");
    $.UserName = decodeURIComponent(_0x20410d.match(/pt_pin=([^; ]+)(?=;?)/) && _0x20410d.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
    $.UA = _0x414f66.UARAM ? _0x414f66.UARAM() : _0x414f66.USER_AGENT;
    await _0x8b4be1(_0x50d8dd);
    await $.wait(2000);
  }

  console.log("——————————————————————————————————————————————————————");
  console.log("\n\n———————————开始助力车头(助力间隔" + _0x5319bd + "秒)—————————————");
  _0x4ba4a9 && (console.log("\n已指定助力CODE,那抛弃车头去助力TA"), _0x2dbc78 = [], _0x2dbc78.push(_0x4ba4a9));
  _0x5020bf = 0;

  for (let _0x4551fd of _0x2dbc78) {
    if (_0x2bfcb3.length === 1) {
      console.log("");
      break;
    }

    console.log("\n去助力-> " + _0x4551fd);
    $.suc = 0;

    for (let _0x579753 = _0x5020bf; _0x579753 < _0x2bfcb3.length; _0x579753++) {
      if (_0x2bfcb3[_0x579753]) {
        _0x20410d = _0x2bfcb3[_0x579753];
        $.UserName = decodeURIComponent(_0x20410d.match(/pt_pin=([^; ]+)(?=;?)/) && _0x20410d.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        $.index = _0x579753 + 1;
        $.isLogin = true;
        $.nickName = "";
        $.UA = _0x414f66.UARAM ? _0x414f66.UARAM() : _0x414f66.USER_AGENT;
        console.log("\n开始【账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n");
        await _0x8b4be1(_0x4551fd);
        _0xc48219.swip && (await _0xc48219.swip());

        if ($.suc >= Number(_0x57a760)) {
          $.log("已达目标助力数，跳出！");
          _0x5020bf = _0x579753 + 1;
          break;
        }

        await $.wait(_0x5319bd * 1000);
      }
    }

    if ($.index === _0x2bfcb3.length) {
      console.log("\n没有可用于助力的ck，跳出！");
      break;
    }
  }

  console.log("\n\n—————————————————开始车头抽奖和提现—————————————————");
  _0x5a3286 > -1 && console.log("\n已设置本次运行抽奖次数：" + _0x5a3286);

  let _0x255641 = new Date();

  _0x255641.setDate(_0x255641.getDate() - _0x4301fe);

  _0x20410d = _0xe153bb;
  $.UserName = decodeURIComponent(_0x20410d.match(/pt_pin=([^; ]+)(?=;?)/) && _0x20410d.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
  $.isLogin = true;
  $.nickName = "";
  $.fail = 0;
  _0x120737 = [];
  _0x20f4d1 = [];
  txjscore = [];
  $.txj = true;
  $.fg = 1;
  $.txfull = false;
  $.nocashnum = 0;
  $.end = false;
  $.hotflag = false;
  $.toredfailnum = 0;
  $.txjsuc = false;
  $.banip = false;
  $.UA = _0x414f66.UARAM ? _0x414f66.UARAM() : _0x414f66.USER_AGENT;

  let _0x4b993c = await _0x2bc1ee(0);

  await $.wait(1000);

  if (_0x4b993c.code != "0") {
    return;
  }

  $.log("本轮已抽奖次数：" + _0x4b993c.data.drawPrizeNum);
  $.log("本轮剩余抽奖次数：" + $.times);

  if (_0x4b993c.data.cashVo) {
    if (_0x4b993c.data?.["cashVo"]?.["state"] === 1) {
      $.log("本轮提现金进度：" + _0x4b993c.data.cashVo.amount + "/" + _0x4b993c.data.cashVo.totalAmount + "(-" + _0x4b993c.data.cashVo.leftAmount + ")");
    } else {
      _0x4b993c.data?.["cashVo"]?.["state"] === 3 && ($.log("本轮提现金达成：" + _0x4b993c.data.cashVo.amount + "/" + _0x4b993c.data.cashVo.totalAmount), $.txj = false, $.txjsuc = true);
    }
  } else {
    $.txj = false;
  }

  $.log("本轮结束时间： " + _0x468ab9(new Date(Date.now() + _0x4b993c.data.countDownTime)));

  for (let _0x4743a8 = 0; _0x4743a8 < (_0x5a3286 > -1 && _0x5a3286 < $.times ? _0x5a3286 : $.times); _0x4743a8++) {
    process.stdout.write("\n第" + (_0x4743a8 + 1) + "次抽奖结果：");

    for (let _0x2019d9 of Array(3)) {
      await _0x47aa6a(_0x2019d9 + 1);

      if (!$.hotflag) {
        break;
      }

      await $.wait(Math.random() * 500 + _0x2f997e * 1000);
    }

    if ($.end || $.banip) {
      break;
    }

    $.txj && (await _0xf59345());
    await $.wait(Math.random() * 500 + _0x2f997e * 1000);

    if ($.fail > _0x3d8acc) {
      $.log("连续垃圾券，不继续抽了");
      break;
    }
  }

  _0x20f4d1.length !== 0 && $.log("\n\n本次抽奖获得红包总计：" + _0x20f4d1.reduce((_0x2e9983, _0x10168e) => _0x2e9983 + _0x10168e * 100, 0) / 100 + "元");
  _0x120737.length !== 0 && $.log("\n\n本次抽奖获得现金总计：" + _0x120737.reduce((_0x2da51e, _0x1add61) => _0x2da51e + _0x1add61 * 100, 0) / 100 + "元");

  if (txjscore.length !== 0) {
    let _0x13462c = txjscore.reduce((_0x39bb49, _0x5e3cf5) => _0x39bb49 + _0x5e3cf5 * 100, 0) / 100;

    $.log("\n\n本次抽奖获得提现金：" + _0x13462c + "个, 平均" + (_0x13462c / (_0x5a3286 > -1 ? Math.min.apply(null, [_0x5a3286, $.times]) : $.times)).toFixed(4) + "个/抽");
  }

  if ($.end) {
    return;
  }

  if (_0x34024b != "true") {
    if (new Date().getHours() < 6 && _0x54c6c5) {
      return;
    }

    $.log("\n——————————————开始提现（间隔" + _0x359207 + "秒）————————————————");
    $.log("\n当前提现模式：" + (_0x180fef == "1" ? _0x4301fe + "天内历史" : "本次所抽现金"));
    $.log("上限转红包：" + (_0x235f1f ? "开启" : "关闭(续期♻️)"));
    $.txsuc = [];
    $.toredsuc = [];
    $.failtxlist = [];
    $.banip = false;

    if (_0x180fef == "1") {
      for (let _0x546d38 = 0; _0x546d38 < 500; _0x546d38++) {
        process.stdout.write("\n" + (_0x546d38 + 1) + "页：");

        if ($.nocashnum > 2 || $.toredfailnum > 4 || $.banip) {
          break;
        }

        let _0x4d0ea5 = await _0x502562(_0x546d38 + 1);

        _0x4d0ea5 == "" && (await $.wait(5000), await _0x502562(_0x546d38 + 1));

        if (!$.baglist || $.baglist.length === 0) {
          break;
        }

        for (let _0x31fc39 of $.baglist) {
          if (Math.max.apply(null, [new Date(_0x31fc39.createTime), new Date(_0x31fc39.startTime)]) < _0x255641 || $.toredfailnum > 4) {
            $.nocashnum = 5;
            break;
          }

          if (_0x31fc39.prizeType == 4) {
            $.txfail = false;

            if (_0x31fc39.state == 0 || _0x31fc39.state == 2) {
              process.stdout.write("" + Number(_0x31fc39.amount));

              let _0x554ca1 = await _0x445d83(_0x31fc39, Number(_0x31fc39.amount));

              if ($.txfail) {
                await $.wait(5000);
                _0x554ca1 = await _0x445d83(_0x31fc39, Number(_0x31fc39.amount));
              }

              $.txfail && $.failtxlist.push(_0x31fc39);

              if (_0x554ca1.data.message.includes("上限") && _0x235f1f == "true" && $.toredfailnum < 5) {
                await _0x356a93(_0x31fc39, Number(_0x31fc39.amount));
              }

              await $.wait(_0x359207 * 1000);
            } else {
              _0x31fc39.state == 8;
            }
          }
        }

        await $.wait(3000);
      }

      $.banip = false;

      while ($.failtxlist.length > 0) {
        console.log("\n\n" + $.failtxlist.length);

        for (let _0x546348 = 0; _0x546348 < $.failtxlist.length;) {
          let _0x2d1702 = $.failtxlist[_0x546348];

          if (_0x2d1702.prizeType == 4) {
            $.txfail = false;
            process.stdout.write("" + Number(_0x2d1702.amount));

            let _0x5ddf69 = await _0x445d83(_0x2d1702, Number(_0x2d1702.amount));

            $.txfail && (await $.wait(5000), _0x5ddf69 = await _0x445d83(_0x2d1702, Number(_0x2d1702.amount)));

            if ($.txfail) {
              _0x546348++;
            } else {
              $.failtxlist.splice(_0x546348, 1);
            }

            if (_0x5ddf69.data.message.includes("上限") && _0x235f1f == "true" && $.toredfailnum < 5) {
              await _0x356a93(_0x2d1702, Number(_0x2d1702.amount));
            }

            await $.wait(_0x359207 * 1000);
          }
        }
      }
    } else {
      for (let _0x2eea49 = 0; _0x2eea49 < 1; _0x2eea49++) {
        if ($.nocashnum > 2 || $.toredfailnum > 4) {
          break;
        }

        while (_0x175ebb.length > 0) {
          console.log("\n" + _0x175ebb.length);

          for (let _0x2a93bb = 0; _0x2a93bb < _0x175ebb.length;) {
            let _0x3877da = _0x175ebb[_0x2a93bb];

            if (_0x3877da.prizeType == 4) {
              $.txfail = false;
              process.stdout.write("" + Number(_0x3877da.amount));

              let _0x4aa2ee = await _0x445d83(_0x3877da, Number(_0x3877da.amount));

              if ($.txfail) {
                await $.wait(5000);
                _0x4aa2ee = await _0x445d83(_0x3877da, Number(_0x3877da.amount));
              }

              $.txfail ? _0x2a93bb++ : _0x175ebb.splice(_0x2a93bb, 1);

              if (_0x4aa2ee.data.message.includes("上限") && _0x235f1f == "true" && $.toredfailnum < 5) {
                await _0x356a93(_0x3877da, Number(_0x3877da.amount));
              }

              await $.wait(_0x359207 * 1000);
            }
          }

          await $.wait(2000);
        }
      }
    }

    $.txsuc.length !== 0 && $.log("\n\n本次成功提现总计：" + $.txsuc.reduce((_0xe492ac, _0x57ff0e) => _0xe492ac + _0x57ff0e * 100, 0) / 100 + "元");
    $.toredsuc.length !== 0 && $.log("\n\n本次成功转红包总计：" + $.toredsuc.reduce((_0x432bd3, _0x114d1f) => _0x432bd3 + _0x114d1f * 100, 0) / 100 + "元");
  } else {
    $.log("\n\n⚠已设置不提现！");
  }

  _0x175ebb = [];
  await $.wait(2000);
})().catch(_0xd5e3b6 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0xd5e3b6 + "!", "");
}).finally(() => {
  $.done();
});

async function _0x2bc1ee(_0x4b98c7) {
  const _0x294b37 = {
    linkId: "3orGfh1YkwNLksxOcN8zWQ",
    inviter: ""
  };
  let _0x2ecc54 = _0x294b37,
      _0x1aa149 = {
    appId: "eb67b",
    fn: "inviteFissionHome",
    body: _0x2ecc54,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    xcr: 1,
    ua: $.UA
  };
  _0x2ecc54 = await _0x42fe77.getbody(_0x1aa149);

  if (!_0x2ecc54) {
    return;
  }

  return new Promise(async _0x5317bb => {
    $.dpost(_0x59bcbf(_0x2ecc54), async (_0x35c8e5, _0x535754, _0xdaf148) => {
      try {
        if (_0x35c8e5) {
          console.log("" + JSON.stringify(_0x35c8e5));
          console.log("homeinfo请求失败，请检查网路重试");
        } else {
          _0xdaf148 = JSON.parse(_0xdaf148);

          if (_0xdaf148.code == 0) {
            $.times = _0xdaf148.data.prizeNum;

            if (_0x4b98c7) {
              console.log("我的助力码：" + _0xdaf148.data.inviter);
            }

            _0x2dbc78.push(_0xdaf148.data.inviter);
          } else {
            console.log(_0xdaf148.errMsg);
          }
        }
      } catch (_0x116df6) {
        $.logErr(_0x116df6, _0x535754);
      } finally {
        _0x5317bb(_0xdaf148);
      }
    });
  });
}

async function _0xf59345() {
  const _0x10f5f1 = {
    linkId: "3orGfh1YkwNLksxOcN8zWQ"
  };
  let _0xf12460 = _0x10f5f1,
      _0x319a79 = {
    appId: "b8469",
    fn: "inviteFissionReceive",
    body: _0xf12460,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    ua: $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0xf12460 = await _0x42fe77.getbody(_0x319a79);

  if (!_0xf12460) {
    return;
  }

  return new Promise(async _0x487bea => {
    $.dpost(_0x59bcbf(_0xf12460), async (_0x37827b, _0x4f36f8, _0x5a4f50) => {
      try {
        if (_0x37827b) {
          console.log("" + JSON.stringify(_0x37827b));
          console.log("receive请求失败，请检查网路重试");
          _0x37827b.includes("403") && ($.banip = true);
        } else {
          _0x5a4f50 = JSON.parse(_0x5a4f50);

          if (_0x5a4f50.code == 0) {
            process.stdout.write("----提现金" + _0x5a4f50.data.amount + "(+" + _0x5a4f50.data.receiveList[0].amount + ")");
            txjscore.push(_0x5a4f50.data.receiveList[0].amount);
            _0x5a4f50.data?.["state"] == 3 && (process.stdout.write("----恭喜达成"), $.txj = false, $.txjsuc = true);
          } else {
            if (_0x5a4f50.code == 80208) {
              process.stdout.write("----送的抽奖次数没有提现金");
            } else {
              _0x5a4f50.code == 80209 ? (process.stdout.write("----完成标识"), $.txj = false) : console.log(JSON.stringify(_0x5a4f50));
            }
          }
        }
      } catch (_0x4c3c74) {
        $.logErr(_0x4c3c74, _0x4f36f8);
      } finally {
        _0x487bea(_0x5a4f50);
      }
    });
  });
}

async function _0x47aa6a(_0x16091d) {
  const _0x5679ff = {
    linkId: "3orGfh1YkwNLksxOcN8zWQ"
  };
  let _0x2253bd = _0x5679ff,
      _0x355a72 = {
    appId: "c02c6",
    fn: "inviteFissionDrawPrize",
    body: _0x2253bd,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    xcr: $.fg,
    ua: $.UA
  };
  $.fg == 1 && ($.fg = 0);
  _0x2253bd = await _0x42fe77.getbody(_0x355a72);

  if (!_0x2253bd) {
    return;
  }

  return new Promise(async _0x1ebac7 => {
    $.dpost(_0x59bcbf(_0x2253bd), async (_0x53ae19, _0x40bb17, _0x3c8e69) => {
      try {
        if (_0x53ae19) {
          console.log("" + JSON.stringify(_0x53ae19));
          console.log("lottery请求失败，请检查网路重试");
          _0x53ae19.includes("403") && ($.banip = true);
        } else {
          _0x3c8e69 = JSON.parse(_0x3c8e69);

          if (_0x3c8e69.code == 0) {
            const _0x122047 = _0x3c8e69.data.prizeType;

            if (!_0x122047) {
              fail++;
            }

            switch (_0x122047) {
              case 1:
                process.stdout.write("垃.圾.券⚫");
                $.txjsuc && $.fail++;
                $.fail++;
                $.hotflag = false;
                break;

              case 4:
                let _0x56b8e4 = parseFloat(_0x3c8e69.data.prizeValue).toFixed(2);

                process.stdout.write(_0x56b8e4 + "现金💰️");
                _0x120737.push(_0x56b8e4);
                const _0x86a92 = {
                  prizeValue: _0x3c8e69.data.prizeValue,
                  id: _0x3c8e69.data.id,
                  poolBaseId: _0x3c8e69.data.poolBaseId,
                  prizeGroupId: _0x3c8e69.data.prizeGroupId,
                  prizeBaseId: _0x3c8e69.data.prizeBaseId,
                  prizeType: _0x3c8e69.data.prizeType,
                  amount: _0x3c8e69.data.amount
                };
                _0x175ebb.push(_0x86a92);
                $.fail = 0;
                $.hotflag = false;
                break;

              case 2:
                let _0x1debe1 = parseFloat(_0x3c8e69.data.prizeValue).toFixed(2);

                process.stdout.write(_0x1debe1 + "红包🧧");
                _0x20f4d1.push(_0x1debe1);
                $.fail = 0;
                $.hotflag = false;
                break;

              default:
                $.hotflag = false;
                console.log(JSON.stringify(_0x3c8e69.data));
            }
          } else {
            if (_0x3c8e69.errMsg.includes("火爆")) {
              process.stdout.write("未中奖 ");
              $.hotflag = true;
            } else {
              if (_0x3c8e69.errMsg.includes("结束")) {
                $.end = true;
                $.hotflag = false;
                console.log(_0x3c8e69.errMsg);
              } else {
                _0x3c8e69.errMsg.includes("未登录") ? ($.end = true, $.hotflag = false, console.log(_0x3c8e69.errMsg)) : ($.hotflag = false, console.log(_0x3c8e69.errMsg));
              }
            }
          }
        }
      } catch (_0x4fc9ff) {
        $.logErr(_0x4fc9ff, _0x40bb17);
      } finally {
        _0x1ebac7(_0x3c8e69);
      }
    });
  });
}

async function _0x502562(_0x283b7c) {
  const _0x46088a = {
    pageNum: _0x283b7c,
    pageSize: 100,
    linkId: "3orGfh1YkwNLksxOcN8zWQ",
    business: "fission"
  };
  let _0x41b4f5 = _0x46088a,
      _0x547a1d = {
    appId: "f2b1d",
    fn: "superRedBagList",
    body: _0x41b4f5,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    ua: $.UA
  };
  _0x41b4f5 = await _0x42fe77.getbody(_0x547a1d);

  if (!_0x41b4f5) {
    return;
  }

  const _0x44d35b = {
    url: "https://api.m.jd.com/api",
    body: _0x41b4f5 + "&loginType=2&loginWQBiz=wegame&uuid=" + $.uuid + "&build=169088&screen=414*736&networkType=wifi&d_brand=iPhone&d_model=iPhone10,2&lang=zh_CN&osVersion=&partner=-1&cthr=1",
    headers: {},
    ciphers: _0x1090fd.cpstr
  };
  _0x44d35b.headers.Accept = "application/json, text/plain, */*";
  _0x44d35b.headers["x-rp-client"] = "h5_1.0.0";
  _0x44d35b.headers["Accept-Language"] = "zh-cn";
  _0x44d35b.headers["Accept-Encoding"] = "gzip, deflate, br";
  _0x44d35b.headers["Content-Type"] = "application/x-www-form-urlencoded";
  _0x44d35b.headers.Origin = "https://pro.m.jd.com";
  _0x44d35b.headers["User-Agent"] = $.UA;
  _0x44d35b.headers.Referer = "https://pro.m.jd.com/";
  _0x44d35b.headers["x-referer-page"] = "https://pro.m.jd.com/";
  _0x44d35b.headers["request-from"] = "native";
  _0x44d35b.headers.Cookie = _0x20410d;
  return new Promise(async _0x703e75 => {
    $.dpost(_0x44d35b, async (_0x404eb3, _0x280190, _0x5a6fd6) => {
      try {
        if (_0x404eb3) {
          console.log("" + JSON.stringify(_0x404eb3));
          console.log(" API请求失败，请检查网路重试");
          _0x404eb3.includes("403") && ($.banip = true);
          _0x5a6fd6 = "";
        } else {
          _0x5a6fd6 = JSON.parse(_0x5a6fd6);
          _0x5a6fd6.code == 0 ? $.baglist = _0x5a6fd6.data.items : console.log(_0x5a6fd6.errMsg);
        }
      } catch (_0x432ec2) {
        $.logErr(_0x432ec2, _0x280190);
      } finally {
        _0x703e75(_0x5a6fd6);
      }
    });
  });
}

async function _0x8b4be1(_0x5b3bf0) {
  const _0x2416c5 = {
    linkId: "3orGfh1YkwNLksxOcN8zWQ",
    isJdApp: true,
    inviter: _0x5b3bf0
  };
  let _0x521c05 = _0x2416c5,
      _0x256ab1 = {
    appId: "c5389",
    fn: "inviteFissionhelp",
    body: _0x521c05,
    apid: "activities_platform",
    ver: $.UA.split(";")[2],
    cl: "ios",
    user: $.UserName,
    code: 1,
    xcr: 1,
    ua: $.UA
  };
  _0x521c05 = await _0x42fe77.getbody(_0x256ab1);

  if (!_0x521c05) {
    return;
  }

  return new Promise(async _0x22e67f => {
    $.dpost(_0x59bcbf(_0x521c05), async (_0x564b53, _0x2d5ea5, _0x3d06c0) => {
      try {
        if (_0x564b53) {
          console.log("" + JSON.stringify(_0x564b53));
          console.log("help请求失败，请检查网路重试");

          if (_0x564b53.includes("403")) {
            $.banip = true;
          }
        } else {
          _0x3d06c0 = JSON.parse(_0x3d06c0);

          if (_0x3d06c0.code == 0) {
            if (!_0x3d06c0.data.helpFlg) {
              $.log("结果：不能助力自己！");
              return;
            }

            if (_0x3d06c0.data.helpResult == 1) {
              $.suc++;
              console.log("结果：助力成功 ✅ " + ($.suc || ""));
            } else {
              if (_0x3d06c0.data.helpResult == 6) {
                console.log("结果：已经助力过TA！");
              } else {
                if (_0x3d06c0.data.helpResult == 3) {
                  console.log("结果：没有次数！");
                } else {
                  if (_0x3d06c0.data.helpResult == 2) {
                    $.log("结果：太火爆了 💣");
                    $.hot = true;
                  } else {
                    if (_0x3d06c0.data.helpResult == 4) {
                      $.log("结果：没有助力次数！");
                    } else {
                      _0x3d06c0.data.helpResult == 8 ? $.log("结果：TA未开启新的一轮 💤") : console.log("结果：" + _0x3d06c0.data?.["helpResult"]);
                    }
                  }
                }
              }
            }
          } else {
            console.log(_0x3d06c0.errMsg);
          }
        }
      } catch (_0x1668eb) {
        $.logErr(_0x1668eb, _0x2d5ea5);
      } finally {
        _0x22e67f(_0x3d06c0);
      }
    });
  });
}

async function _0x445d83(_0x5346ef, _0xcb0ec8) {
  let _0x56a232 = "functionId=apCashWithDraw&body={\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\",\"businessSource\":\"NONE\",\"base\":{\"id\":" + _0x5346ef.id + ",\"business\":\"fission\",\"poolBaseId\":" + _0x5346ef.poolBaseId + ",\"prizeGroupId\":" + _0x5346ef.prizeGroupId + ",\"prizeBaseId\":" + _0x5346ef.prizeBaseId + ",\"prizeType\":4}}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

  return new Promise(async _0x2b6194 => {
    $.dpost(_0x59bcbf(_0x56a232), async (_0x1035d2, _0x25e6de, _0x19b0f9) => {
      try {
        if (_0x1035d2) {
          console.log("" + JSON.stringify(_0x1035d2));
          console.log("apCashWithDraw请求失败，请检查网路重试");
          _0x1035d2.includes("403") && ($.banip = true);
        } else {
          _0x19b0f9 = JSON.parse(_0x19b0f9);

          if (_0x19b0f9.code == 0) {
            if (_0x19b0f9.data.message.indexOf("待发放") > -1) {
              process.stdout.write("" + (!$.txfail ? "❌" : "❌ "));
              $.txfail = true;
            } else {
              if (_0x19b0f9.data.message.includes("上限")) {
                !_0x235f1f && process.stdout.write("♻️ ");
                $.txfull = true;
                $.txfail = false;
              } else {
                _0x19b0f9.data.message.includes("提现") ? (process.stdout.write("✔️ "), $.txsuc.push(_0xcb0ec8), $.txfail = false) : console.log(_0x19b0f9.data.message);
              }
            }
          } else {
            console.log(_0x19b0f9.errMsg);
          }
        }
      } catch (_0x36bb53) {
        $.logErr(_0x36bb53, _0x25e6de);
      } finally {
        _0x2b6194(_0x19b0f9);
      }
    });
  });
}

async function _0x356a93(_0x458409, _0x1d25db) {
  let _0x3e1613 = "functionId=apRecompenseDrawPrize&body={\"drawRecordId\":" + _0x458409.id + ",\"business\":\"fission\",\"poolId\":" + _0x458409.poolBaseId + ",\"prizeGroupId\":" + _0x458409.prizeGroupId + ",\"prizeId\":" + _0x458409.prizeBaseId + ",\"linkId\":\"3orGfh1YkwNLksxOcN8zWQ\"}&t=" + Date.now() + "&appid=activities_platform&client=ios&clientVersion=" + $.UA.split(";")[2];

  const _0x3d1d4d = {
    Host: "api.m.jd.com",
    Origin: "https://prodev.m.jd.com",
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": $.UA,
    Cookie: _0x20410d
  };
  const _0x273c5b = {
    url: "https://api.m.jd.com/api",
    body: _0x3e1613,
    headers: _0x3d1d4d
  };
  return new Promise(async _0x5d2daa => {
    $.dpost(_0x273c5b, async (_0x4bfe9a, _0x2de8f1, _0x3a2aff) => {
      try {
        if (_0x4bfe9a) {
          console.log("" + JSON.stringify(_0x4bfe9a));
          console.log("apRecompenseDrawPrize 请求失败，请检查网路重试");
          _0x4bfe9a.includes("403") && ($.banip = true);
        } else {
          _0x3a2aff = JSON.parse(_0x3a2aff);

          if (_0x3a2aff.code == 0) {
            _0x3a2aff.data.resCode === "0" ? (process.stdout.write("🧧 "), $.toredsuc.push(_0x1d25db)) : (process.stdout.write("❎ "), $.toredfailnum++);
          } else {
            _0x3a2aff.errMsg === "失败" ? (process.stdout.write("❎ "), $.toredfailnum++) : console.log(_0x3a2aff.errMsg);
          }
        }
      } catch (_0x40dfe9) {
        $.logErr(_0x40dfe9, _0x2de8f1);
      } finally {
        _0x5d2daa(_0x3a2aff);
      }
    });
  });
}

function _0x59bcbf(_0x31e7be) {
  const _0x2a5215 = {
    Host: "api.m.jd.com",
    Origin: "https://pro.m.jd.com",
    Referer: "https://pro.m.jd.com/",
    "User-Agent": $.UA,
    Cookie: _0x20410d
  };
  const _0x2a5fba = {
    url: "https://api.m.jd.com/?" + _0x31e7be,
    headers: _0x2a5215
  };
  return _0x2a5fba;
}

function _0xc8ef7d() {
  return new Promise(_0x14bdcd => {
    const _0x5df64b = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: {},
      timeout: 10000
    };
    _0x5df64b.headers.Cookie = _0x20410d;
    _0x5df64b.headers.referer = "https://h5.m.jd.com/";
    _0x5df64b.headers["User-Agent"] = $.UA;
    $.get(_0x5df64b, (_0x294ab4, _0x367f1a, _0x579726) => {
      try {
        if (_0x579726) {
          _0x579726 = JSON.parse(_0x579726);

          if (!(_0x579726.islogin === "1")) {
            if (_0x579726.islogin === "0") {
              $.isLogin = false;
            }
          }
        }
      } catch (_0x2d8f72) {
        console.log(_0x2d8f72);
      } finally {
        _0x14bdcd();
      }
    });
  });
}

function _0x555f4c() {
  return new Promise(_0x3cf9c6 => {
    !_0x29599e ? $.msg($.name, "", "" + _0x45bbbb) : $.log("京东账号" + $.index + $.nickName + "\n" + _0x45bbbb);

    _0x3cf9c6();
  });
}

function _0x2e714b(_0x21905d) {
  try {
    if (typeof JSON.parse(_0x21905d) == "object") {
      return true;
    }
  } catch (_0x5314ef) {
    console.log(_0x5314ef);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}


function _0x468ab9(_0x46daa7) {
  const _0x34892d = _0x46daa7.getFullYear(),
        _0x2e4b19 = ("0" + (_0x46daa7.getMonth() + 1)).slice(-2),
        _0x380111 = ("0" + _0x46daa7.getDate()).slice(-2),
        _0x2ae36b = ("0" + _0x46daa7.getHours()).slice(-2),
        _0xdb3808 = ("0" + _0x46daa7.getMinutes()).slice(-2),
        _0x33fa7a = ("0" + _0x46daa7.getSeconds()).slice(-2);

  return _0x34892d + "/" + _0x2e4b19 + "/" + _0x380111 + " " + _0x2ae36b + ":" + _0xdb3808 + ":" + _0x33fa7a;
}

function _0x407d48(_0xe0a428) {
  if (typeof _0xe0a428 == "string") {
    try {
      return JSON.parse(_0xe0a428);
    } catch (_0x3c4552) {
      console.log(_0x3c4552);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\n🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }