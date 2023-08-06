/*
东东农场快速浇水
默认使用快速浇水卡，成熟了自动收取红包和种植新的水果
11 11 11 11 * jd_fruit_watering.js, tag=东东农场快速浇水, enabled=true
*/

const $ = new Env('东东农场快速浇水');
let cookiesArr = [],
  cookie = "",
  notify;
let message = "",
  subTitle = "",
  option = {},
  isFruitFinished = false;
const FRUIT_PLANT_LEVEL = process.env.FRUIT_PLANT_LEVEL ? process.env.FRUIT_PLANT_LEVEL : "2";
const JD_API_HOST = "https://api.m.jd.com/client.action";
!(async () => {
  await requireConfig();
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  for (let _0x379fx43 = 0; _0x379fx43 < cookiesArr.length; _0x379fx43++) {
    if (cookiesArr[_0x379fx43]) {
      cookie = cookiesArr[_0x379fx43];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x379fx43 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "*********\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      message = "";
      subTitle = "";
      option = {};
      await jdFruit();
    }
  }
})().catch(_0x379fx36 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x379fx36 + "!", "");
}).finally(() => {
  $.done();
});
async function jdFruit() {
  subTitle = "【京东账号" + $.index + "】" + ($.nickName || $.UserName);
  try {
    await initForFarm();
    if ($.farmInfo.farmUserPro) {
      if ($.farmInfo.treeState === 2 || $.farmInfo.treeState === 3) {
        const _0x379fx51 = $.farmInfo.farmUserPro.name;
        await gotCouponForFarm();
        await initForFarm();
        const _0x379fx52 = $.farmInfo.myHongBaoInfo.hongBao;
        console.log(_0x379fx51 + "已成熟并自动收获");
        console.log("获得" + _0x379fx52.discount + "元红包");
        console.log(timeFormat(_0x379fx52.endTime) + "过期，请及时使用");
        await autoPlant();
        return;
      } else {
        if ($.farmInfo.treeState === 1) {
          console.log("当前种植：" + $.farmInfo.farmUserPro.name + "（等级" + $.farmInfo.farmUserPro.prizeLevel + "）");
        } else {
          if ($.farmInfo.treeState === 0) {
            console.log("还没有种植新的水果\n");
            await autoPlant();
            return;
          }
        }
      }
      await Main();
    } else {
      console.log("初始化农场数据异常, 请登录京东 app查看农场0元水果功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo.message));
    }
  } catch (_0x30dabe) {
    console.log("任务执行异常，请检查执行日志");
    $.logErr(_0x30dabe);
  }
}
async function Main() {
  await initForFarm();
  let _0x379fx6b = $.farmInfo.farmUserPro.totalEnergy;
  console.log("目前共有 " + _0x379fx6b + "g 💧");
  await myCardInfoForFarm();
  const {
    fastCard,
    doubleCard,
    beanCard,
    signCard
  } = $.myCardInfoRes;
  console.log("快速浇水卡：" + (fastCard === -1 ? "未解锁" : fastCard + " 🎟️"));
  if (_0x379fx6b >= 100 && $.myCardInfoRes.fastCard > 0) {
    let _0x379fx6c = parseInt(_0x379fx6b / 100) > $.myCardInfoRes.fastCard ? $.myCardInfoRes.fastCard : parseInt(_0x379fx6b / 100);
    for (let _0x379fx6d = 0; _0x379fx6d < _0x379fx6c; _0x379fx6d++) {
      console.log("");
      await userMyCardForFarm("fastCard");
      if ($.userMyCardRes.code === "0") {
        _0x379fx6b -= 100;
        console.log("使用快速浇水卡 ✅");
        if ($.userMyCardRes.treeFinished) {
          isFruitFinished = true;
          break;
        } else {
          console.log("当前剩余 " + _0x379fx6b + "g 💧");
        }
        await $.wait(2000);
      } else {
        console.log("" + JSON.stringify($.userMyCardRes));
        console.log("❌ 浇水异常，可能触发风控，请稍后再试~");
        break;
      }
    }
  }
  if (isFruitFinished) {
    console.log("\n🎉 水果已可领取");
    const _0x379fx6e = $.farmInfo.farmUserPro.name;
    await gotCouponForFarm();
    await initForFarm();
    const _0x379fx6f = $.farmInfo.myHongBaoInfo.hongBao;
    console.log(_0x379fx6e + "已成熟并自动收获");
    console.log("获得" + _0x379fx6f.discount + "元红包");
    console.log(timeFormat(_0x379fx6f.endTime) + "过期，请及时使用");
    await autoPlant();
    return;
  }
  if (_0x379fx6b >= 10) {
    isFruitFinished = false;
    for (let _0x379fx70 = 0; _0x379fx70 < parseInt(_0x379fx6b / 10); _0x379fx70++) {
      console.log("");
      await waterGoodForFarm();
      if ($.waterResult.code === "0") {
        console.log("浇水10g ✅");
        if ($.waterResult.finished) {
          isFruitFinished = true;
          break;
        } else {
          await gotStageAward();
          console.log("当前剩余 " + $.waterResult.totalEnergy + "g 💧");
        }
        await $.wait(1000);
      } else {
        console.log("" + JSON.stringify($.waterResult));
        console.log("❌ 浇水异常，可能触发风控，请稍后再试~");
        break;
      }
    }
    if (isFruitFinished) {
      console.log("\n🎉 水果已可领取");
      const _0x379fx71 = $.farmInfo.farmUserPro.name;
      await gotCouponForFarm();
      await initForFarm();
      const _0x379fx6f = $.farmInfo.myHongBaoInfo.hongBao;
      console.log(_0x379fx71 + "已成熟并自动收获");
      console.log("获得" + _0x379fx6f.discount + "元红包");
      onsole.log(timeFormat(_0x379fx6f.endTime) + "过期，请及时使用");
      await autoPlant();
      return;
    }
  }
}
async function autoPlant() {
  await initForFarm();
  const _0x379fx7f = $.farmInfo.farmLevelWinGoods[FRUIT_PLANT_LEVEL];
  if (_0x379fx7f && _0x379fx7f.length) {
    const _0x379fx80 = _0x379fx7f[Math.floor(Math.random() * _0x379fx7f.length)];
    await choiceGoodsForFarm(_0x379fx80.type);
    if ($.choiceGoodsForFarmRes.code * 1 === 0) {
      console.log("【提醒⏰】您没有种植新的水果");
      console.log("已自动为您种植等级" + FRUIT_PLANT_LEVEL + "的" + $.choiceGoodsForFarmRes.farmUserPro.name);
    } else {
      console.log("【提醒⏰】您没有种植新的水果");
      onsole.log("尝试自动种植" + _0x379fx80.name + "失败，请打开京东APP手动尝试");
    }
  } else {
    console.log("【提醒⏰】您没有种植新的水果");
    console.log("指定的等级" + FRUIT_PLANT_LEVEL + "暂无水果可供选择，请打开京东APP检查");
  }
}
async function myCardInfoForFarm() {
  const _0x379fx82 = arguments.callee.name.toString();
  $.myCardInfoRes = await request(_0x379fx82, {
    "version": 5,
    "channel": 1
  });
}
async function userMyCardForFarm(_0x379fx84) {
  const _0x379fx89 = arguments.callee.name.toString();
  $.userMyCardRes = await request(_0x379fx89, {
    "cardType": _0x379fx84
  });
}
async function waterGoodForFarm() {
  await $.wait(1000);
  const _0x379fx8e = arguments.callee.name.toString();
  $.waterResult = await request(_0x379fx8e);
}
function gotStageAward() {
  return new Promise(async _0x379fx9e => {
    if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) {
      console.log("果树发芽了，奖励30g水滴");
      await gotStageAwardForFarm("1");
      console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
      if ($.gotStageAwardForFarmRes.code === "0") {
        console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes.addEnergy);
        console.log("");
      }
    } else {
      if ($.waterResult.waterStatus === 1) {
        console.log("果树开花了,奖励 40g 💧");
        await gotStageAwardForFarm("2");
        console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
        if ($.gotStageAwardForFarmRes.code === "0") {
          console.log("【果树开花了】奖励 " + $.gotStageAwardForFarmRes.addEnergy + "g 💧");
          console.log("");
        }
      } else {
        if ($.waterResult.waterStatus === 2) {
          console.log("果树长出小果子啦, 奖励 50g 💧");
          await gotStageAwardForFarm("3");
          console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));
          if ($.gotStageAwardForFarmRes.code === "0") {
            console.log("【果树结果了】奖励 " + $.gotStageAwardForFarmRes.addEnergy + "g 💧");
            console.log("");
          }
        }
      }
    }
    _0x379fx9e();
  });
}
async function initForFarm() {
  const _0x379fxa4 = arguments.callee.name.toString();
  $.farmInfo = await request(_0x379fxa4, {
    "babelChannel": "121",
    "sid": "3c52b5f17ab2a42398939a27887eaf8w",
    "un_area": "17_1381_0_0",
    "version": 18,
    "channel": 1
  });
}
async function gotCouponForFarm() {
  const _0x379fxa7 = {
    "version": 11,
    "channel": 3,
    "babelChannel": 0
  };
  $.gotCouponForFarmRes = await request("gotCouponForFarm", _0x379fxa7);
}
async function choiceGoodsForFarm(_0x379fxa9) {
  const _0x379fxae = {
    "imageUrl": "",
    "nickName": "",
    "shareCode": "",
    "goodsType": _0x379fxa9,
    "type": "0",
    "version": 11,
    "channel": 3,
    "babelChannel": 0
  };
  $.choiceGoodsForFarmRes = await request("choiceGoodsForFarm", _0x379fxae);
}
function requireConfig() {
  return new Promise(_0x379fxba => {
    notify = $.isNode() ? require("./sendNotify") : "";
    const _0x379fxbb = $.isNode() ? require("./jdCookie") : "";
    if ($.isNode()) {
      Object.keys(_0x379fxbb).forEach(_0x379fxbc => {
        if (_0x379fxbb[_0x379fxbc]) {
          cookiesArr.push(_0x379fxbb[_0x379fxbc]);
        }
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
        console.log = () => {};
      }
    } else {
      cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0x379fxbe => {
        return _0x379fxbe.cookie;
      })].filter(_0x379fxbd => {
        return !!_0x379fxbd;
      });
    }
    _0x379fxba();
  });
}
function request(_0x379fxc0, _0x379fxc1 = {}, _0x379fxc2 = 1000) {
  return new Promise(_0x379fxd0 => {
    setTimeout(async () => {
      $.get(await taskUrl(_0x379fxc0, _0x379fxc1), (_0x379fxe0, _0x379fxe1, _0x379fxe2) => {
        try {
          if (_0x379fxe0) {
            console.log("\n东东农场: API查询请求失败 ‼️‼️");
            console.log(JSON.stringify(_0x379fxe0));
            console.log("function_id:" + _0x379fxc0);
            $.logErr(_0x379fxe0);
          } else {
            if (safeGet(_0x379fxe2)) {
              _0x379fxe2 = JSON.parse(_0x379fxe2);
            }
          }
        } catch (_0x5b421e) {
          $.logErr(_0x5b421e, _0x379fxe1);
        } finally {
          _0x379fxd0(_0x379fxe2);
        }
      });
    }, _0x379fxc2);
  });
}
function timeFormat(_0x379fxe4) {
  let _0x379fxf4;
  if (_0x379fxe4) {
    _0x379fxf4 = new Date(_0x379fxe4);
  } else {
    _0x379fxf4 = new Date();
  }
  return _0x379fxf4.getFullYear() + "-" + (_0x379fxf4.getMonth() + 1 >= 10 ? _0x379fxf4.getMonth() + 1 : "0" + (_0x379fxf4.getMonth() + 1)) + "-" + (_0x379fxf4.getDate() >= 10 ? _0x379fxf4.getDate() : "0" + _0x379fxf4.getDate());
}
function safeGet(_0x379fxf6) {
  if (!_0x379fxf6) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(_0x379fxf6) == "object") {
      return true;
    }
  } catch (_0x501d82) {
    console.log(_0x501d82);
    return false;
  }
}
const appidMap = {
  "initForFarm": "8a2af",
  "taskInitForFarm": "fcb5a",
  "browseAdTaskForFarm": "53f09",
  "firstWaterTaskForFarm": "0cf1e",
  "waterFriendGotAwardForFarm": "d08ff",
  "ddnc_getTreasureBoxAward": "67dfc",
  "totalWaterTaskForFarm": "102f5",
  "gotThreeMealForFarm": "57b30",
  "waterGoodForFarm": "0c010",
  "choiceGoodsForFarm": "5f4ca",
  "gotCouponForFarm": "b1515",
  "gotStageAwardForFarm": "81591",
  "followVenderForBrand": "71547",
  "gotWaterGoalTaskForFarm": "c901b",
  "gotNewUserTaskForFarm": "de8f8",
  "orderTaskGotWaterForFarm": "eed5c",
  "clockInForFarm": "32b94",
  "clockInFollowForFarm": "4a0b4",
  "waterFriendForFarm": "673a0",
  "awardFirstFriendForFarm": "9b655",
  "awardInviteFriendForFarm": "2b5ca",
  "awardCallOrInviteFriendForFarm": "b0b03",
  "userMyCardForFarm": "86ba5",
  "getCallUserCardForFarm": "2ca57",
  "deleteFriendForFarm": "eaf91",
  "gotLowFreqWaterForFarm": "8172b",
  "getFullCollectionReward": "5c767",
  "getOrderPayLotteryWater": "ef089",
  "receiveStageEnergy": "15507",
  "exchangeGood": "52963",
  "farmAssistInit": "92354",
  "myCardInfoForFarm": "157b6",
  "gotPopFirstPurchaseTaskForFarm": "d432f",
  "limitWaterInitForFarm": "6bdc2",
  "ddnc_surpriseModal": "e81c1",
  "friendInitForFarm": "a5a9c",
  "clockInInitForFarm": "08dc3",
  "guideTaskAward": "59bc4"
};
async function taskUrl(_0x379fxfe, _0x379fxff = {}) {
  let _0x379fx105 = "";
  if (!appidMap[_0x379fxfe]) {
    _0x379fx105 = JD_API_HOST + "?functionId=" + _0x379fxfe + "&body=" + encodeURIComponent(JSON.stringify(_0x379fxff)) + "&appid=wh5";
  } else {
    const _0x379fx106 = {
      "appid": "signed_wh5",
      "client": "android",
      "clientVersion": "10.4.3",
      "functionId": _0x379fxfe,
      "body": _0x379fxff
    };
    const _0x379fx107 = await getH5st(appidMap[_0x379fxfe], _0x379fx106);
    _0x379fx105 = JD_API_HOST + "?functionId=" + _0x379fxfe + "&appid=signed_wh5&body=" + encodeURIComponent(JSON.stringify(_0x379fxff)) + "&client=android&clientVersion=10.4.3&h5st=" + encodeURIComponent(_0x379fx107);
  }
  return {
    "url": _0x379fx105,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip,deflate,br",
      "User-Agent": $.isNode() ? process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : require("./USER_AGENTS").USER_AGENT : $.getdata("JDUA") ? $.getdata("JDUA") : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "x-requested-with": "com.jingdong.app.mall",
      "Cookie": cookie
    },
    "timeout": 10000
  };
}
function getH5st(_0x379fx109, _0x379fx10a) {
  return new Promise(async _0x379fx114 => {
    let _0x379fx11e = {
      "url": "http://api.kingran.cf/h5st",
      "body": "businessId=" + _0x379fx109 + "&req=" + encodeURIComponent(JSON.stringify(_0x379fx10a)),
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      },
      "timeout": 30 * 1000
    };
    $.post(_0x379fx11e, (_0x379fx11f, _0x379fx120, _0x379fx121) => {
      try {
        if (_0x379fx11f) {
          console.log(JSON.stringify(_0x379fx11f));
        } else {}
      } catch (_0x33d0eb) {
        $.logErr(_0x33d0eb, _0x379fx120);
      } finally {
        _0x379fx114(_0x379fx121);
      }
    });
  });
}
function jsonParse(_0x379fx123) {
  if (typeof _0x379fx123 == "string") {
    try {
      return JSON.parse(_0x379fx123);
    } catch (_0xbd649b) {
      console.log(_0xbd649b);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
