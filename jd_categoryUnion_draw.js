/*
超级无线 · 品类联合抽奖

只抽奖不做任务，做任务是另一个脚本，先跑任务脚本攒抽奖机会，有水再抽奖
邀请好友最多获得30次抽奖机会

变量：
//export jd_categoryUnion_activityId='活动ID'     必须
//export jd_categoryUnion_blacklist='' // 黑名单 用&隔开 pin值
//export JD_LZ_OPEN="false" //关闭LZ相关活动运行

cron:10 11 1 1 *
============Quantumultx===============
[task_local]
#品类联合抽奖
10 11 1 1 * jd_categoryUnion_draw.js, tag=品类联合抽奖 , enabled=true

*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;

const $ = new Env('品类联合抽奖');
const jdCookieNode = $.isNode() ? require("./jdCookie") : "";
const notify = $.isNode() ? require("./sendNotify") : "";
const getToken = require("./function/krgetToken");
let lz_cookie = {};
let cookiesArr = [],
  cookie = "";
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0x63d6x7 => {
    cookiesArr.push(jdCookieNode[_0x63d6x7]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x63d6x7 => {
    return _0x63d6x7.cookie;
  })].filter(_0x63d6x7 => {
    return !!_0x63d6x7;
  });
}
$.activityId = process.env.jd_categoryUnion_activityId ? process.env.jd_categoryUnion_activityId : "";
allMessage = "";
message = "";
$.hotFlag = false;
$.outFlag = false;
$.activityEnd = false;
let lz_jdpin_token_cookie = "";
let activityCookie = "";
let lzopen = process.env.JD_LZ_OPEN ? process.env.JD_LZ_OPEN : "true";
let whitelist = "";
let blacklist = "";
$.whitelist = process.env.jd_categoryUnion_whitelist || whitelist;
$.blacklist = process.env.jd_categoryUnion_blacklist || blacklist;
getWhitelist();
getBlacklist();
!(async () => {
  if (lzopen === "false") {
    console.log("\n❌  已设置全局关闭LZ相关活动\n");
    return;
  }
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  $.venderIds = "688693";
  console.log("活动入口: https://lzdz-isv.isvjd.com/categoryUnion/categoryUnionActivity/activity?activityId=" + $.activityId + "&tplId=0003");
  for (let _0x63d6xe = 0; _0x63d6xe < cookiesArr.length; _0x63d6xe++) {
    cookie = cookiesArr[_0x63d6xe];
    originCookie = cookiesArr[_0x63d6xe];
    if (cookie) {
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x63d6xe + 1;
      message = "";
      $.bean = 0;
      $.hotFlag = false;
      $.nickName = "";
      console.log("\n【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      await getUA();
      await run();
      await $.wait(2000);
      if (_0x63d6xe == 0 && !$.actorUuid) {
        break;
      }
      if ($.outFlag || $.activityEnd) {
        break;
      }
    }
  }
  if ($.outFlag) {
    let _0x63d6xf = "此ip已被限制，请过10分钟后再执行脚本";
    $.msg($.name, `${""}`, `${""}${_0x63d6xf}${""}`);
    if ($.isNode()) {
      await notify.sendNotify(`${""}${$.name}${""}`, `${""}${_0x63d6xf}${""}`);
    }
  }
})().catch(_0x63d6xd => {
  return $.logErr(_0x63d6xd);
}).finally(() => {
  return $.done();
});
async function run() {
  try {
    $.hasEnd = true;
    $.endTime = 0;
    lz_jdpin_token_cookie = "";
    $.Token = "";
    $.Pin = "";
    let _0x63d6x11 = false;
    $.Token = await getToken(originCookie, "https://lzdz-isv.isvjd.com");
    if ($.Token == "") {
      console.log("获取[token]失败！");
      return;
    }
    await getCk();
    if (activityCookie == "") {
      console.log(`${"获取cookie失败"}`);
      return;
    }
    if ($.activityEnd === true) {
      console.log("活动结束");
      return;
    }
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    await takePostRequest("getMyPing");
    if (!$.Pin) {
      console.log("获取[Pin]失败！");
      return;
    }
    await takePostRequest("accessLogWithAD");
    await takePostRequest("getUserInfo");
    $.openList = [];
    $.allOpenCard = false;
    await takePostRequest("activityContent");
    if (!$.actorUuid) {
      console.log("获取不到[actorUuid]退出执行，请重新执行");
      return;
    }
    await takePostRequest("drawContent");
    await $.wait(1000);
    console.log(`${"当前有"}${$.score}${"值~"}`);
    $.runFalag = true;
    let _0x63d6x12 = parseInt($.score / 1);
    console.log(`${"可抽奖次数为："}${_0x63d6x12}${""}`);
    for (m = 1; _0x63d6x12--; m++) {
      console.log(`${"第"}${m}${"次抽奖"}`);
      await takePostRequest("luckyDraw");
      if ($.runFalag == false) {
        break;
      }
      if (Number(_0x63d6x12) <= 0) {
        break;
      }
      if (m >= 40) {
        console.log("抽奖太多次，多余的次数请再执行脚本");
        break;
      }
      await $.wait(parseInt(Math.random() * 2000 + 500, 10));
    }
    await takePostRequest("getDrawRecordHasCoupon");
    if ($.outFlag) {
      console.log("此ip已被限制，请过10分钟后再执行脚本\n");
      return;
    }
    return;
    if (_0x63d6x11) {
      await $.wait(parseInt(Math.random() * 1000 + 10000, 10));
    }
    if ($.index % 3 == 0) {
      console.log("休息1分钟，别被黑ip了\n可持续发展");
    }
    if ($.index % 3 == 0) {
      await $.wait(parseInt(Math.random() * 5000 + 10000, 10));
    }
  } catch (e) {
    console.log(e);
  }
}
async function takePostRequest(_0x63d6x14) {
  if ($.outFlag) {
    return;
  }
  let _0x63d6x15 = "https://lzdz-isv.isvjd.com";
  let _0x63d6x16 = `${""}`;
  let _0x63d6x17 = "POST";
  switch (_0x63d6x14) {
    case "getMyPing":
      _0x63d6x15 = `${""}${_0x63d6x15}${"/customer/getMyPing"}`;
      _0x63d6x16 = `${"userId=688693&token="}${$.Token}${"&fromType=APP"}`;
      break;
    case "accessLogWithAD":
      let _0x63d6x19 = `${""}${_0x63d6x15}${"/drawCenter/activity?activityId="}${$.activityId}${"&tplId=0003"}`;
      _0x63d6x15 = `${""}${_0x63d6x15}${"/common/accessLogWithAD"}`;
      _0x63d6x16 = `${"venderId="}${$.shopId || $.venderId || $.venderIds || ""}${"&code=99&pin="}${encodeURIComponent($.Pin)}${"&activityId="}${$.activityId}${"&tplId=0003&pageUrl="}${encodeURIComponent(_0x63d6x19)}${"&subType=app&adSource="}`;
      break;
    case "getUserInfo":
      _0x63d6x15 = `${""}${_0x63d6x15}${"/wxActionCommon/getUserInfo"}`;
      _0x63d6x16 = `${"pin="}${encodeURIComponent($.Pin)}${""}`;
      break;
    case "activityContent":
      _0x63d6x15 = `${""}${_0x63d6x15}${"/categoryUnion/activityContent"}`;
      _0x63d6x16 = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${"&pinImg="}${encodeURIComponent($.attrTouXiang)}${"&nick="}${encodeURIComponent($.nickname)}${""}`;
      break;
    case "drawContent":
      _0x63d6x15 = `${""}${_0x63d6x15}${"/dingzhi/taskact/common/drawContent"}`;
      _0x63d6x16 = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${""}`;
      break;
    case "领取奖励":
      _0x63d6x15 = `${""}${_0x63d6x15}${"/categoryUnion/getInfo"}`;
      _0x63d6x16 = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${"&actorUuid="}${$.actorUuid}${""}`;
      break;
    case "luckyDraw":
      _0x63d6x15 = `${""}${_0x63d6x15}${"/categoryUnion/luckyDraw"}`;
      _0x63d6x16 = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${"&actorUuid="}${$.actorUuid}${""}`;
      break;
    case "getDrawRecordHasCoupon":
      _0x63d6x15 = `${""}${_0x63d6x15}${"/dingzhi/taskact/common/getDrawRecordHasCoupon"}`;
      _0x63d6x16 = `${"activityId="}${$.activityId}${"&pin="}${encodeURIComponent($.Pin)}${"&actorUuid="}${$.actorUuid}${""}`;
      break;
    case "getShareRecord":
      _0x63d6x15 = `${""}${_0x63d6x15}${"/categoryUnion/getAssistInfo"}`;
      _0x63d6x16 = `${"activityId="}${$.activityId}${"&actorUuid="}${$.actorUuid}${"&sortStatus=1"}`;
      break;
    default:
      console.log(`${"错误"}${_0x63d6x14}${""}`);
  }
  let _0x63d6x1a = getPostRequest(_0x63d6x15, _0x63d6x16, _0x63d6x17);
  return new Promise(async _0x63d6x1b => {
    $.post(_0x63d6x1a, (_0x63d6x1c, _0x63d6x1d, _0x63d6x1e) => {
      try {
        setActivityCookie(_0x63d6x1d);
        if (_0x63d6x1c) {
          if (_0x63d6x1d && typeof _0x63d6x1d.statusCode != "undefined") {
            if (_0x63d6x1d.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log(`${""}${$.toStr(_0x63d6x1c, _0x63d6x1c)}${""}`);
          console.log(`${""}${_0x63d6x14}${" API请求失败，请检查网路重试"}`);
        } else {
          dealReturn(_0x63d6x14, _0x63d6x1e);
        }
      } catch (e) {
        console.log(e, _0x63d6x1d);
      } finally {
        _0x63d6x1b();
      }
    });
  });
}
async function dealReturn(_0x63d6x14, _0x63d6x1e) {
  let _0x63d6x20 = "";
  try {
    if (_0x63d6x14 != "accessLogWithAD" || _0x63d6x14 != "drawContent") {
      if (_0x63d6x1e) {
        _0x63d6x20 = JSON.parse(_0x63d6x1e);
      }
    }
  } catch (e) {
    console.log(`${""}${_0x63d6x14}${" 执行任务异常"}`);
    console.log(_0x63d6x1e);
    $.runFalag = false;
  }
  try {
    switch (_0x63d6x14) {
      case "getMyPing":
        if (typeof _0x63d6x20 == "object") {
          if (_0x63d6x20.result && _0x63d6x20.result === true) {
            if (_0x63d6x20.data && typeof _0x63d6x20.data.secretPin != "undefined") {
              $.Pin = _0x63d6x20.data.secretPin;
            }
            if (_0x63d6x20.data && typeof _0x63d6x20.data.nickname != "undefined") {
              $.nickname = _0x63d6x20.data.nickname;
            }
          } else {
            if (_0x63d6x20.errorMessage) {
              console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x20.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x1e}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x1e}${""}`);
        }
        break;
      case "getUserInfo":
        $.attrTouXiang = "https://img10.360buyimg.com/imgzone/jfs/t1/7020/27/13511/6142/5c5138d8E4df2e764/5a1216a3a5043c5d.png";
        if (typeof _0x63d6x20 == "object") {
          if (_0x63d6x20.result && _0x63d6x20.result === true) {
            if (_0x63d6x20.data && typeof _0x63d6x20.data.yunMidImageUrl != "undefined") {
              $.attrTouXiang = _0x63d6x20.data.yunMidImageUrl || $.attrTouXiang;
            }
          } else {
            if (_0x63d6x20.errorMessage) {
              console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x20.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x1e}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x1e}${""}`);
        }
        break;
      case "activityContent":
        if (typeof _0x63d6x20 == "object") {
          if (_0x63d6x20.result && _0x63d6x20.result === true) {
            $.hasEnd = _0x63d6x20.data.hasEnd || false;
            $.taskData = _0x63d6x20.data.drawContent || {};
            $.actorUuid = _0x63d6x20.data.actorUuid || "";
            $.unionShopInfos = _0x63d6x20.data.unionShopInfo || [];
            $.allOpenCard = _0x63d6x20.data.openCardStatus.data.allOpenCard || false;
            $.openList = _0x63d6x20.data.openCardStatus.data.openInfo || [];
            $.score = _0x63d6x20.data.score || 0;
          } else {
            if (_0x63d6x20.errorMessage) {
              console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x20.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x1e}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x1e}${""}`);
        }
        break;
      case "luckyDraw":
        if (typeof _0x63d6x20 == "object") {
          if (_0x63d6x20.result && _0x63d6x20.result === true) {
            console.log(`${"获得："}${_0x63d6x20.data.name}${""}`);
          } else {
            if (_0x63d6x20.result === false) {
              console.log(`${"💨  空气"}`);
            } else {
              console.log(`${""}${_0x63d6x1e}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x63d6x1e}${""}`);
        }
        break;
      case "领取奖励":
        if (typeof _0x63d6x20 == "object") {
          if (_0x63d6x20.result && _0x63d6x20.result === true) {
            if (typeof _0x63d6x20.data == "object") {
              let _0x63d6xf = "";
              let _0x63d6x21 = _0x63d6x14;
              if (_0x63d6x20.data.drawResult) {
                _0x63d6xf += _0x63d6x20.data.drawResult.drawOk == true && _0x63d6x20.data.drawResult.value + "京豆" || "空气💨";
              }
              if (_0x63d6x20.data.addPoint) {
                _0x63d6xf += `${" "}${_0x63d6x20.data.addPoint}${"游戏机会"}`;
              }
              console.log(`${""}${_0x63d6x21}${"获得:"}${_0x63d6xf || _0x63d6x1e}${""}`);
            } else {
              console.log(`${""}${_0x63d6x1e.result}${""}`);
            }
          } else {
            if (_0x63d6x20.errorMessage) {
              $.runFalag = false;
              console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x20.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x1e}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x1e}${""}`);
        }
        break;
      case "getDrawRecordHasCoupon":
        if (typeof _0x63d6x20 == "object") {
          if (_0x63d6x20.result && _0x63d6x20.result === true) {
            let _0x63d6x22 = 0;
            for (let _0x63d6xe in _0x63d6x20.data) {
              let _0x63d6x7 = _0x63d6x20.data[_0x63d6xe];
              if (_0x63d6x7.infoName.indexOf("京豆") > -1) {
                _0x63d6x22 += Number(_0x63d6x7.infoName.replace("京豆", "")) || 0;
              }
            }
            if (_0x63d6x22 > 0) {
              console.log(`${"共获得"}${parseInt(_0x63d6x22, 10) || 0}${"京豆"}`);
            }
          } else {
            if (_0x63d6x20.errorMessage) {
              console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x20.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x1e}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x1e}${""}`);
        }
        break;
      case "getShareRecord":
        if (typeof _0x63d6x20 == "object") {
          if (_0x63d6x20.result && _0x63d6x20.result === true && _0x63d6x20.data) {
            console.log(`${"领取机会("}${_0x63d6x20.data.hasDrawTimes}${"/10) 可领取奖励"}${_0x63d6x20.data.totalCount}${"次"}`);
            $.totalCount = _0x63d6x20.data.totalCount;
            $.log(`${"=========== 你邀请了:"}${_0x63d6x20.data.shareRecord.length}${"个"}`);
          } else {
            if (_0x63d6x20.errorMessage) {
              console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x20.errorMessage || ""}${""}`);
            } else {
              console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x1e}${""}`);
            }
          }
        } else {
          console.log(`${""}${_0x63d6x14}${" "}${_0x63d6x1e}${""}`);
        }
        break;
      case "accessLogWithAD":
      case "drawContent":
        break;
      default:
        console.log(`${""}${_0x63d6x14}${"-> "}${_0x63d6x1e}${""}`);
    }
    if (typeof _0x63d6x20 == "object") {
      if (_0x63d6x20.errorMessage) {
        if (_0x63d6x20.errorMessage.indexOf("火爆") > -1) {
          $.hotFlag = true;
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}
function getPostRequest(_0x63d6x15, _0x63d6x16, _0x63d6x17 = "POST") {
  let _0x63d6x24 = {
    "Accept": "application/json",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-cn",
    "Connection": "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded",
    "Cookie": cookie,
    "User-Agent": $.UA,
    "X-Requested-With": "XMLHttpRequest"
  };
  if (_0x63d6x15.indexOf("https://lzdz-isv.isvjd.com") > -1) {
    _0x63d6x24.Referer = `${"https://lzdz-isv.isvjd.com/categoryUnion/categoryUnionActivity/activity?activityId="}${$.activityId}${"&tplId=0003&tplId=0003"}`;
    _0x63d6x24.Origin = `${"https://lzdz-isv.isvjd.com"}`;
    _0x63d6x24.Cookie = `${""}${lz_jdpin_token_cookie && lz_jdpin_token_cookie || ""}${""}${$.Pin && "AUTH_C_USER=" + $.Pin + ";" || ""}${""}${activityCookie}${""}`;
  }
  return {
    url: _0x63d6x15,
    method: _0x63d6x17,
    headers: _0x63d6x24,
    body: _0x63d6x16,
    timeout: 30000
  };
}
function getCk() {
  return new Promise(_0x63d6x1b => {
    let _0x63d6x26 = {
      url: `${"https://lzdz-isv.isvjd.com/categoryUnion/categoryUnionActivity/activity?activityId="}${$.activityId}${"&tplId=0003"}`,
      headers: {
        "User-Agent": $.UA
      },
      timeout: 30000
    };
    $.get(_0x63d6x26, async (_0x63d6x1c, _0x63d6x1d, _0x63d6x1e) => {
      try {
        if (_0x63d6x1c) {
          if (_0x63d6x1d && typeof _0x63d6x1d.statusCode != "undefined") {
            if (_0x63d6x1d.statusCode == 493) {
              console.log("此ip已被限制，请过10分钟后再执行脚本\n");
              $.outFlag = true;
            }
          }
          console.log(`${""}${$.toStr(_0x63d6x1c)}${""}`);
          console.log(`${""}${$.name}${" cookie API请求失败，请检查网路重试"}`);
        } else {
          let _0x63d6x27 = _0x63d6x1e.match(/(活动已经结束)/) && _0x63d6x1e.match(/(活动已经结束)/)[1] || "";
          if (_0x63d6x27) {
            $.activityEnd = true;
            console.log("活动已结束");
          }
          setActivityCookie(_0x63d6x1d);
        }
      } catch (e) {
        $.logErr(e, _0x63d6x1d);
      } finally {
        _0x63d6x1b();
      }
    });
  });
}
function setActivityCookie(_0x63d6x1d) {
  if (_0x63d6x1d) {
    if (_0x63d6x1d.headers["set-cookie"]) {
      cookie = `${""}${originCookie}${""}`;
      for (let _0x63d6x29 of _0x63d6x1d.headers["set-cookie"]) {
        lz_cookie[_0x63d6x29.split(";")[0].substr(0, _0x63d6x29.split(";")[0].indexOf("="))] = _0x63d6x29.split(";")[0].substr(_0x63d6x29.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x63d6x2a of Object.keys(lz_cookie)) {
        cookie += _0x63d6x2a + "=" + lz_cookie[_0x63d6x2a] + ";";
      }
      activityCookie = cookie;
    }
  }
}
async function getUA() {
  $.UA = `${"jdapp;iPhone;10.1.4;13.1.2;"}${randomString(40)}${";network/wifi;model/iPhone8,1;addressid/2308460611;appBuild/167814;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 13_1_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"}`;
}
function getBlacklist() {
  if ($.blacklist == "") {
    return;
  }
  console.log("当前已设置黑名单：");
  const _0x63d6x2d = Array.from(new Set($.blacklist.split("&")));
  console.log(_0x63d6x2d.join("&") + "\n");
  let _0x63d6x2e = _0x63d6x2d;
  let _0x63d6x2f = [];
  let _0x63d6x30 = false;
  for (let _0x63d6xe = 0; _0x63d6xe < cookiesArr.length; _0x63d6xe++) {
    let _0x63d6x31 = decodeURIComponent(cookiesArr[_0x63d6xe].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x63d6xe].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (!_0x63d6x31) {
      break;
    }
    let _0x63d6x32 = false;
    for (let _0x63d6x33 of _0x63d6x2e) {
      if (_0x63d6x33 && _0x63d6x33 == _0x63d6x31) {
        _0x63d6x32 = true;
        break;
      }
    }
    if (!_0x63d6x32) {
      _0x63d6x30 = true;
      _0x63d6x2f.splice(_0x63d6xe, -1, cookiesArr[_0x63d6xe]);
    }
  }
  if (_0x63d6x30) {
    cookiesArr = _0x63d6x2f;
  }
}
function toFirst(_0x63d6x2f, _0x63d6x35) {
  if (_0x63d6x35 != 0) {
    _0x63d6x2f.unshift(_0x63d6x2f.splice(_0x63d6x35, 1)[0]);
  }
}
function getWhitelist() {
  if ($.whitelist == "") {
    helpCookiesArr = $.toObj($.toStr(cookiesArr, cookiesArr));
    return;
  }
  console.log("当前已设置白名单：");
  const _0x63d6x2d = Array.from(new Set($.whitelist.split("&")));
  console.log(_0x63d6x2d.join("&") + "\n");
  let _0x63d6x2f = [];
  let _0x63d6x37 = _0x63d6x2d;
  for (let _0x63d6xe in cookiesArr) {
    let _0x63d6x31 = decodeURIComponent(cookiesArr[_0x63d6xe].match(/pt_pin=([^; ]+)(?=;?)/) && cookiesArr[_0x63d6xe].match(/pt_pin=([^; ]+)(?=;?)/)[1] || "");
    if (_0x63d6x37.includes(_0x63d6x31)) {
      _0x63d6x2f.push(cookiesArr[_0x63d6xe]);
    }
  }
  helpCookiesArr = _0x63d6x2f;
  if (_0x63d6x37.length > 1) {
    for (let _0x63d6x33 in _0x63d6x37) {
      let _0x63d6x38 = _0x63d6x37[_0x63d6x37.length - 1 - _0x63d6x33];
      if (!_0x63d6x38) {
        continue;
      }
      for (let _0x63d6xe in helpCookiesArr) {
        let _0x63d6x31 = decodeURIComponent(helpCookiesArr[_0x63d6xe].match(/pt_pin=([^; ]+)(?=;?)/) && helpCookiesArr[_0x63d6xe].match(/pt_pin=([^; ]+)(?=;?)/)[1]);
        if (_0x63d6x38 == _0x63d6x31) {
          toFirst(helpCookiesArr, _0x63d6xe);
        }
      }
    }
  }
}
function randomString(_0x63d6xd) {
  _0x63d6xd = _0x63d6xd || 32;
  let _0x63d6x3a = "abcdef0123456789",
    _0x63d6x3b = _0x63d6x3a.length,
    _0x63d6x33 = "";
  for (i = 0; i < _0x63d6xd; i++) {
    _0x63d6x33 += _0x63d6x3a.charAt(Math.floor(Math.random() * _0x63d6x3b));
  }
  return _0x63d6x33;
}
function jsonParse(_0x63d6x3d) {
  if (typeof _0x63d6x3d == "string") {
    try {
      return JSON.parse(_0x63d6x3d);
    } catch (e) {
      console.log(e);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
	
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
