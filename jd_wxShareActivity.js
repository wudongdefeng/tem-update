/*
活动名称：分享有礼 · 超级无线
活动链接：https://lzkjdz-isv.isvjd.com/wxShareActivity/activity/activity?activityId=<活动id>
环境变量：jd_wxShareActivity_activityId // 活动id
         jd_wxShareActivity_helpnum // 需要助力的账号数量

*/
let lnrun = 0;


const $ = new Env('分享有礼（超级无线）')
const jdCookieNode = $.isNode() ? require('./jdCookie') : ''
const notify = $.isNode() ? require('./sendNotify') : ''
const getToken = require('./function/getToken')
const wxSavePrize = require('./function/wxSavePrize')

let cookiesArr = [],
  cookie = "",
  CodeList = [],
  ownCookieNum = 1,
  isGetAuthorCodeList = true,
  activityId = "";
$.activityEnd = false;
$.outFlag = false;
$.activityContent = null;
let lz_cookie = {},
  prizesIdArr = [],
  prizesShareTimesArr = [];
process.env.jd_wxShareActivity_helpnum && process.env.jd_wxShareActivity_helpnum != "" && (ownCookieNum = process.env.jd_wxShareActivity_helpnum);
process.env.jd_wxShareActivity_activityId && process.env.jd_wxShareActivity_activityId != "" && (activityId = process.env.jd_wxShareActivity_activityId);
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x19863b => {
    cookiesArr.push(jdCookieNode[_0x19863b]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
  let cookiesData = $.getdata("CookiesJD") || "[]";
  cookiesData = JSON.parse(cookiesData);
  cookiesArr = cookiesData.map(_0x7347d4 => _0x7347d4.cookie);
  cookiesArr.reverse();
  cookiesArr.push(...[$.getdata("CookieJD2"), $.getdata("CookieJD")]);
  cookiesArr.reverse();
  cookiesArr = cookiesArr.filter(_0x38ce8d => !!_0x38ce8d);
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  $.activityId = activityId;
  $.activityUrl = "https://lzkjdz-isv.isvjd.com/wxShareActivity/activity/activity?activityId=" + $.activityId;
  isGetAuthorCodeList = true;
  $.maxShareTimes = 0;
  console.log("活动入口：" + $.activityUrl);
  for (let _0x3a4b8e = 0; _0x3a4b8e < ownCookieNum; _0x3a4b8e++) {
    if (cookiesArr[_0x3a4b8e]) {
      cookie = cookiesArr[_0x3a4b8e];
      originCookie = cookiesArr[_0x3a4b8e];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x3a4b8e + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 获取助力码******\n");
      let Interval = process.env.jd_jk_interval || "60 * 1000";console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        continue;
      }
      $.bean = 0;
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.authorCode = "";
      await getFirstLZCK();
      await $.wait(500);
      if ($.index == 1) {
        $.venderId = null;
        await task("customer/getSimpleActInfoVo", "activityId=" + $.activityId, 1);
        if ($.activityEnd) {
          console.log("活动不存在或已经结束！");
          return;
        }
        if (!$.venderId) {
          console.log("getSimpleActInfoVo 未能获取店铺信息");
          return;
        }
        await $.wait(500);
      }
      await getMyPing();
      if ($.outFlag) return;
      await $.wait(1000);
      $.secretPin ? (await task("common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + encodeURIComponent($.secretPin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=null", 1), await $.wait(500), await task("activityContent", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin))) : $.log("没有成功获取到用户信息");
      if (!$.activityContent) return;
      if ($.index == 1) {
        console.log("");
        let _0x3e2e05 = false;
        for (let _0x54a446 = 0; _0x54a446 < $.drawContentVOs.length; _0x54a446++) {
          let _0x5947b6 = false,
            _0x2a187a = $.drawContentVOs[_0x54a446].name,
            _0xe398cc = $.drawContentVOs[_0x54a446].shareTimes,
            _0x860b3d = $.drawContentVOs[_0x54a446].linkStatus,
            _0x4f4eb7 = $.drawContentVOs[_0x54a446].drawInfoId;
          _0x860b3d != 3 ? (_0x2a187a.includes("券") && (_0x3e2e05 = true, _0x5947b6 = true), !_0x5947b6 && _0xe398cc <= cookiesArr.length && (prizesIdArr.push(_0x4f4eb7), prizesShareTimesArr.push(_0xe398cc)), console.log("❖ " + _0x2a187a + " · 分享" + _0xe398cc + "人"), _0xe398cc > $.maxShareTimes && !_0x5947b6 && _0xe398cc <= cookiesArr.length && ($.maxShareTimes = _0xe398cc)) : console.log("❖ " + _0x2a187a + " · 奖品已发完");
        }
        if (_0x3e2e05 && $.maxShareTimes == 0) {
          console.log("\n奖品全是优惠券，不跑了~");
          return;
        } else {
          if ($.maxShareTimes == 0) {
            console.log("\n奖品已经全部发完了，下次早点来哟~");
            return;
          }
        }
      }
      if ($.activityEnd || $.outFlag) return;
    }
  }
  isGetAuthorCodeList = false;
  $.shareTimes = 0;
  console.log("\n");
  for (let _0x443973 = 0; _0x443973 < cookiesArr.length; _0x443973++) {
    if (cookiesArr[_0x443973]) {
      cookie = cookiesArr[_0x443973];
      originCookie = cookiesArr[_0x443973];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x443973 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.errorMessage = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 助力******\n");
      let Interval = process.env.jd_jk_interval || "60 * 1000";console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        continue;
      }
      $.bean = 0;
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      $.authorCode = CodeList[random(0, CodeList.length)];
      await getFirstLZCK();
      if ($.maxShareTimes > 5) await $.wait(500);
      await getMyPing();
      if ($.outFlag) return;
      if ($.secretPin) {
        $.maxShareTimes > 5 ? await $.wait(1000) : await $.wait(500);
        await task("common/accessLogWithAD", "venderId=" + $.venderId + "&code=" + $.activityType + "&pin=" + encodeURIComponent($.secretPin) + "&activityId=" + $.activityId + "&pageUrl=" + encodeURIComponent($.activityUrl) + "&subType=app&adSource=null", 1);
        if ($.maxShareTimes > 5) await $.wait(500);
        $.helpResult = false;
        _0x350c70: for (let _0x346d11 = 0; _0x346d11 < CodeList.length; _0x346d11++) {
          if (_0x346d11 + 1 == $.index) continue;
          $.authorCode = CodeList[_0x346d11];
          for (let _0x553ab4 = 0; _0x553ab4 < 3; _0x553ab4++) {
            await task("activityContent", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&friendUuid=" + encodeURIComponent($.authorCode));
            $.maxShareTimes > 5 ? await $.wait(1000) : await $.wait(500);
            if ($.helpResult) {
              console.log("已助力 ➜ " + $.authorCode);
              break;
            }
            if ($.errorMessage.includes("买买买")) break _0x350c70;
          }
        }
        if ($.helpResult) $.shareTimes += 1;
        for (let _0x356a84 = 0; _0x356a84 < prizesShareTimesArr.length; _0x356a84++) {
          if ($.shareTimes == prizesShareTimesArr[_0x356a84] + 1) await getPrize(prizesIdArr[_0x356a84]);else continue;
        }
        if ($.shareTimes >= $.maxShareTimes + 1) break;
        if ($.activityEnd || $.outFlag) return;
      } else $.log("没有成功获取到用户信息");
    }
  }
})().catch(_0x30574f => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x30574f + "!", "");
}).finally(() => {
  $.done();
});
async function getPrize(_0x3ea5b6) {
  console.log("\n✅ 助力已达标，开始领取奖品");
  _0x51bbab: for (let _0x5d38d2 = 0; _0x5d38d2 < ownCookieNum; _0x5d38d2++) {
    if (cookiesArr[_0x5d38d2]) {
      cookie = cookiesArr[_0x5d38d2];
      originCookie = cookiesArr[_0x5d38d2];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.isLogin = true;
      $.nickName = "";
      $.indexNew = _0x5d38d2 + 1;
      $.authorCode = CodeList[0];
      $.ADID = getUUID("xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", 1);
      $.UUID = getUUID("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      await getFirstLZCK();
      await $.wait(500);
      await getMyPing();
      await $.wait(500);
      if ($.secretPin) {
        await task("activityContent", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin));
        await $.wait(500);
        for (let _0x329f63 = 0; _0x329f63 < $.drawContentVOs.length; _0x329f63++) {
          if ($.drawContentVOs[_0x329f63].drawInfoId != _0x3ea5b6) continue;
          process.stdout.write("【" + $.UserName + "】");
          if ($.drawContentVOs[_0x329f63].linkStatus === 1) {
            await task("getPrize", "activityId=" + $.activityId + "&pin=" + encodeURIComponent($.secretPin) + "&drawInfoId=" + _0x3ea5b6);
            await $.wait(500);
          } else {
            if ($.drawContentVOs[_0x329f63].linkStatus === 2) {
              console.log("已经领过了，不要太贪心哦~");
            } else {
              if ($.drawContentVOs[_0x329f63].linkStatus === 3) {
                console.log("很遗憾，奖品 " + $.drawContentVOs[_0x329f63].name + " 已经发完了，下次早点来吧~");
                break _0x51bbab;
              } else {
                if ($.drawContentVOs[_0x329f63].linkStatus === 4) console.log("未中奖");else {
                  break;
                }
              }
            }
          }
        }
      } else $.log("没有成功获取到用户信息，跳过领取奖品");
    }
  }
}
function task(_0x4a68ac, _0x54a209, _0x3f073b = 0) {
  return new Promise(_0x5ed5db => {
    $.post(taskUrl(_0x4a68ac, _0x54a209, _0x3f073b), async (_0x471018, _0x4dd976, _0x5b442c) => {
      try {
        if (_0x471018) {
          $.log(_0x471018);
        } else {
          if (_0x5b442c) {
            _0x5b442c = JSON.parse(_0x5b442c);
            if (_0x5b442c.result) {
              switch (_0x4a68ac) {
                case "customer/getSimpleActInfoVo":
                  $.venderId = _0x5b442c.data.venderId;
                  $.activityType = _0x5b442c.data.activityType;
                  break;
                case "activityContent":
                  $.activityContent = _0x5b442c.data;
                  isGetAuthorCodeList && (console.log("助力码：" + _0x5b442c.data.myUuid), CodeList.push(_0x5b442c.data.myUuid));
                  $.helpResult = true;
                  $.drawContentVOs = _0x5b442c.data.drawContentVOs;
                  break;
                case "getPrize":
                  let _0x20445e = _0x5b442c.data.drawInfo;
                  switch (_0x20445e.type) {
                    case 6:
                      console.log("🎉 " + _0x20445e.name + " 🐶");
                      break;
                    case 7:
                      const _0xa32e02 = _0x5b442c.data.addressId;
                      prizeName = _0x20445e.name;
                      console.log("🎉 恭喜获得实物~");
                      console.log("奖品名称：" + prizeName);
                      console.log("参考价值：" + _0x20445e.priceInfo + "（元）");
                      if (_0x20445e.showImage) console.log("预览图片：" + _0x20445e.showImage);
                      let _0x588ff0 = await wxSavePrize("https://lzkjdz-isv.isvjd.com", cookie, "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1", $.activityId, $.activityType, $.venderId, $.secretPin, prizeName, _0xa32e02);
                      _0x588ff0 ? $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，已成功自动登记收货地址\n\n" + $.activityUrl)) : $.isNode() && (await notify.sendNotify($.name + "待领取奖品提醒", "【京东账号" + $.index + "】" + $.nickName + "\n获得实物 " + prizeName + "，点击活动链接前往活动查看具体规则，若无套路请在我的奖品中填写收货地址领取！\n请在收到通知的一小时内进行操作，超过则无法再填写奖品收货地址可直接忽略本条消息，也可联系店铺客服加以甜言蜜语尝试挽回！\n\n" + $.activityUrl));
                      break;
                    case 8:
                      console.log("🗑️ 专享价");
                      break;
                    case 9:
                      console.log("🗑️ " + _0x20445e.name + " 🎟️");
                      break;
                    case 13:
                    case 14:
                    case 15:
                      console.log("🎉 恭喜获得" + _0x20445e.name + " 🎁");
                      $.isNode() && (await notify.sendNotify($.name + "中奖通知", "【京东账号" + $.index + "】" + $.nickName + "\n获得 " + _0x20445e.name + "\n\n" + $.activityUrl));
                      break;
                    case 16:
                      console.log("🎉 " + _0x20445e.priceInfo + " 🧧");
                      break;
                    default:
                      _0x20445e.name.includes("券") ? console.log("🗑️ 优惠券") : console.log("获得：" + _0x20445e.name);
                      break;
                  }
                  break;
              }
            } else _0x5b442c.errorMessage ? console.log(_0x5b442c.errorMessage) : console.log(JSON.stringify(_0x5b442c));
          }
          _0x4dd976.status == 200 && setActivityCookie(_0x4dd976);
        }
      } catch (_0x108c5c) {
        $.log(_0x108c5c);
      } finally {
        _0x5ed5db();
      }
    });
  });
}
function taskUrl(_0x20be94, _0x2cbb11, _0x1a7c55) {
  return {
    "url": _0x1a7c55 ? "https://lzkjdz-isv.isvjd.com/" + _0x20be94 : "https://lzkjdz-isv.isvjd.com/wxShareActivity/" + _0x20be94,
    "headers": {
      "Host": "lzkj-isv.isvjcloud.com",
      "Accept": "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Accept-Language": "zh-cn",
      "Accept-Encoding": "gzip, deflate, br",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://lzkjdz-isv.isvjd.comm",
      "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Connection": "keep-alive",
      "Referer": $.activityUrl,
      "Cookie": activityCookie + ";IsvToken=" + $.Token + ";AUTH_C_USER=" + $.AUTH_C_USER
    },
    "body": _0x2cbb11
  };
}
async function getMyPing() {
  $.token = null;
  $.secretPin = null;
  $.token = await getToken(originCookie, "https://lzkjdz-isv.isvjd.com");
  if ($.token) {
    let _0x304186 = {
      "url": "https://lzkjdz-isv.isvjd.com/customer/getMyPing",
      "headers": {
        "Host": "lzkj-isv.isvjcloud.com",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        "Accept-Language": "zh-cn",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://lzkjdz-isv.isvjd.com",
        "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
        "Connection": "keep-alive",
        "Referer": $.activityUrl,
        "Cookie": cookie
      },
      "body": "userId=" + $.venderId + "&token=" + $.token + "&fromType=APP"
    };
    return new Promise(_0x55e9bb => {
      $.post(_0x304186, (_0x5934f1, _0x109141, _0x113d63) => {
        try {
          _0x5934f1 ? ($.log(_0x5934f1), _0x109141 && typeof _0x109141.statusCode != "undefined" && _0x109141.statusCode == 493 && (console.log("getMyPing 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true)) : (_0x109141.status == 200 && setActivityCookie(_0x109141), _0x113d63 ? (_0x113d63 = JSON.parse(_0x113d63), _0x113d63.result ? ($.nickName = _0x113d63.data.nickname, $.secretPin = _0x113d63.data.secretPin, cookie = cookie + "; AUTH_C_USER=" + _0x113d63.data.secretPin) : ($.errorMessage = _0x113d63.errorMessage, $.log($.errorMessage))) : $.log("京东返回了空数据"));
        } catch (_0x39a6f8) {
          $.log(_0x39a6f8);
        } finally {
          _0x55e9bb();
        }
      });
    });
  } else $.log("没有成功获取到用户鉴权信息");
}
function getFirstLZCK() {
  return new Promise(_0x16fc18 => {
    let _0x595e26 = {
      "url": "https://lzkj-isv.isvjd.com/wxCommonInfo/token",
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": $.activityUrl,
        "User-Agent": "jdapp;iPhone;9.5.4;13.6;" + $.UUID + ";network/wifi;ADID/" + $.ADID + ";model/iPhone10,3;addressid/0;appBuild/167668;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"
      },
      "timeout": 30000
    };
    $.get(_0x595e26, async (_0x57519e, _0x1ee0fa, _0x150a8d) => {
      try {
        if (_0x57519e) {
          _0x1ee0fa && typeof _0x1ee0fa.statusCode != "undefined" && _0x1ee0fa.statusCode == 493 && (console.log("getFirstLZCK 此ip已被限制，请过10分钟后再执行脚本"), $.outFlag = true);
          console.log(String(_0x57519e));
          console.log($.name + " cookie API请求失败，请检查网路重试");
        } else {
          if (_0x1ee0fa.status == 200) setActivityCookie(_0x1ee0fa);
        }
      } catch (_0x2d17ef) {
        $.logErr(_0x2d17ef, _0x1ee0fa);
      } finally {
        _0x16fc18();
      }
    });
  });
}
function random(_0x2fb183, _0x495ba4) {
  return Math.floor(Math.random() * (_0x495ba4 - _0x2fb183)) + _0x2fb183;
}
function setActivityCookie(_0x5bac8b) {
  if (_0x5bac8b.headers["set-cookie"]) {
    cookie = "";
    for (let _0x3132ed of _0x5bac8b.headers["set-cookie"]) {
      lz_cookie[_0x3132ed.split(";")[0].substr(0, _0x3132ed.split(";")[0].indexOf("="))] = _0x3132ed.split(";")[0].substr(_0x3132ed.split(";")[0].indexOf("=") + 1);
    }
    for (const _0xee20a3 of Object.keys(lz_cookie)) {
      cookie += _0xee20a3 + "=" + lz_cookie[_0xee20a3] + ";";
    }
    activityCookie = cookie;
  }
}
function getUUID(_0x5d55e4 = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", _0x5d5b1e = 0) {
  return _0x5d55e4.replace(/[xy]/g, function (_0x451d1e) {
    var _0x503870 = Math.random() * 16 | 0,
      _0xf1ccf6 = _0x451d1e == "x" ? _0x503870 : _0x503870 & 3 | 8;
    return _0x5d5b1e ? uuid = _0xf1ccf6.toString(36).toUpperCase() : uuid = _0xf1ccf6.toString(36), uuid;
  });
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
