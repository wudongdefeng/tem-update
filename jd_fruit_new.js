/*
活动入口：京东APP我的--东东农场
==========================Quantumultx=========================
[task_local]
#jd新农场
33 6,16 * * * jd_fruit_new.js

*/
let lnrun = 0;
const $ = new Env('新农场任务');
const _0x272050 = 100;

let _0x91f3a7 = false,
    _0xa0b3e7 = [],
    _0x1df8bd = "",
    _0x450c1a,
    _0x3e8351,
    _0x26a551 = "",
    _0x50935e = "",
    _0x4ab8af = "",
    _0x268f79 = {},
    _0x5b7a8c = false,
    _0x57cde7 = 0;

const _0x356981 = "https://api.m.jd.com/client.action",
      _0x3b935e = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D";

let _0x33126f = process.env.FRUIT_ID ? process.env.FRUIT_ID : "";

const _0x3d01a5 = require("./USER_AGENTS"),
      _0x4d7500 = require("fs"),
      _0x29948c = require("./function/dylanv"),
      _0x55bd4a = require("./function/jdCommon1"),
      {
  H5st: _0x11f902
} = require("./function/jdCrypto");

if (process.env.DY_PROXY) {
  const _0x325e52 = require("./function/proxy.js");

  $.get = _0x325e52.intoRequest($.get.bind($));
  $.post = _0x325e52.intoRequest($.post.bind($));
}

let _0x39fd58 = [];
$.reqnum = 1;
const _0x1006ef = {
  "farm_home": "c57f6",
  "farm_do_task": "28981",
  "farm_task_receive_award": "33e0f",
  "farm_water": "28981",
  "farm_assist_receive_award": "c4332",
  "farm_rain_round_icon": "c57f6",
  "farm_rain_reward": "c57f6"
},
      _0x3b774a = {
  "dongDongFarmSignHome": "deba1",
  "dongDongFarmSignIn": "65f9d",
  "wheelsHome": "c06b7",
  "wheelsLottery": "bd6c8",
  "apsDoTask": "54ed7"
};
!(async () => {
  await _0xd7f3cc();

  if (!_0xa0b3e7[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  $.log("\n版本：2023/3/7 优化");
  $.log("问题建议：https://t.me/dylan_jdpro\n");
  $.log("\n环境变量（可选项）：");
  $.log("export DY_PROXY='api_url' 可使用代理API");
  $.log("export FRUIT_ID='UID' 未种植可设置商品UID来自动种植\n");
  process.env.NO_WATER == "true" && 0 ? (_0x26a551 = "【一水不缴模式已开启！】\n\n", $.log("【一水不缴模式已开启！】\n")) : process.env.DO_TEN_WATER_AGAIN == "true" && 0 && (_0x26a551 = "【攒水滴模式已开启，每天只浇水10次！】\n\n", $.log("【攒水滴模式已开启，每天只浇水10次！】\n"));

  for (let _0x14c553 = 0; _0x14c553 < _0xa0b3e7.length; _0x14c553++) {
    if (_0xa0b3e7[_0x14c553]) {
      _0x1df8bd = _0xa0b3e7[_0x14c553];
      $.UserName = decodeURIComponent(_0x1df8bd.match(/pt_pin=([^; ]+)(?=;?)/) && _0x1df8bd.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x14c553 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.farmInfo = "";
      ct = 0;
      $.kuwei = false;
      await _0x41f57e();
      console.log("\n------------------【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "-------------------\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x450c1a.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      _0x50935e = "";
      _0x4ab8af = "";
      _0x268f79 = {};
      $.UA = "jdapp;android;12.4.1;;;M/5.0;appBuild/99092;ef/1;ep/%7B%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22ts%22%3A1709555239392%2C%22ridx%22%3A-1%2C%22cipher%22%3A%7B%22sv%22%3A%22CJS%3D%22%2C%22ad%22%3A%22CWHuZtdwYWUnCzOnZNK3CG%3D%3D%22%2C%22od%22%3A%22CJCyD2G0YwHwCtSnCJuzZG%3D%3D%22%2C%22ov%22%3A%22CzO%3D%22%2C%22ud%22%3A%22CWHuZtdwYWUnCzOnZNK3CG%3D%3D%22%7D%2C%22ciphertype%22%3A5%2C%22version%22%3A%221.2.0%22%2C%22appname%22%3A%22com.jingdong.app.mall%22%7D;jdSupportDarkMode/0;Mozilla/5.0 (Linux; Android 12; 22021211RC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/046283 Mobile Safari/537.36";
      $.UA = _0x3d01a5.UARAM ? _0x3d01a5.UARAM() : _0x3d01a5.USER_AGENT;
      $.UUID = _0x55bd4a.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      await _0x24397b();
      await $.wait(2000);
    }
  }

  _0x4d7500.writeFile("./fruit_helpcode_new", JSON.stringify(_0x39fd58), _0x48db08 => {
    _0x48db08 && console.log(_0x48db08);
  });

  $.isNode() && _0x26a551 && $.ctrTemp && (await _0x450c1a.sendNotify("" + $.name, "" + _0x26a551));
})().catch(_0x538986 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x538986 + "!", "");
}).finally(() => {
  $.done();
});

async function _0x24397b() {
  _0x4ab8af = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);

  try {
    await _0x4e7c9e();
    await $.wait(500);

    if ($.farmInfo?.["data"]?.["result"]?.["skuName"]) {
      _0x50935e = "【水果名称】" + $.farmInfo.data.result.skuName + "\n";
      console.log("【账号（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo.data.result.farmHomeShare.inviteCode);
      console.log("【已成功兑换水果】" + $.farmInfo.data.result.completeTimes + "次");
      _0x50935e += "【已兑换水果】" + $.farmInfo.data.result.completeTimes + "次\n";

      _0x39fd58.push($.farmInfo.data.result.farmHomeShare.inviteCode);

      await _0x2c0f8a();

      if ($.farmInfo.data.result.treeFullStage === 5 || $.kuwei) {
        if ($.farmInfo.data.result.treeFullStage === 5) _0x268f79["open-url"] = _0x3b935e, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x268f79), await _0x450c1a.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场奖品记录里兑换");else $.kuwei && console.log("\n" + $.farmInfo.data.result.skuName + "   枯萎了，重新种植吧！");
        console.log("\n种植水果，请在下面选择种植的商品，设置变量（商品的UID)再次运行即可种植");
        await _0x5382d3();

        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
          console.log("\n===============1级商品(UID)最快20天种成=================");

          for (let _0xca0e88 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
            console.log(_0xca0e88.skuName + "(" + _0xca0e88.uid + ")");
          }
        }

        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
          console.log("\n===============2级商品(UID)最快30天种成=================");

          for (let _0x44d86f of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
            console.log(_0x44d86f.skuName + "(" + _0x44d86f.uid + ")");
          }
        }

        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
          console.log("\n===============3级商品(UID)最快41天种成=================");

          for (let _0x5b31f8 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
            console.log(_0x5b31f8.skuName + "(" + _0x5b31f8.uid + ")");
          }
        }

        if (_0x33126f) {
          console.log("\n\n已设置种植目标，开始种植。。。");
          await _0x5cc779(_0x33126f);

          if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
            console.log("种植成功！！！再次执行去做任务领水滴浇水吧！");
            return;
          }
        }

        return;
      } else $.farmInfo.data.result.treeCurrentState === 0 && (console.log("\n" + $.farmInfo.data.result.skuName + "   种植中..."), console.log("种植进度：" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%"));

      await _0x3552b8();
      $.rain_round.data.result.curRoundToken && (console.log("\n开始水滴红包雨..."), await $.wait(1000), await _0x1e45df($.rain_round.data.result.curRoundToken), await _0xb97e47($.rain_round.data.result.curRoundToken), $.rain_reward.data.bizCode == 0 && console.log("获得水滴" + $.rain_reward.data.result.waterRainPrize[0].value + "g💧"));
      await _0x1d582a();
      await _0x5ea13f();
      process.env.DO_TEN_WATER_AGAIN != "true" || 1 ? ($.log("执行继续浇水..."), await _0x4bb418()) : $.log("不执行再次浇水，攒水滴!");
      await $.wait(500);
      await _0x4e7c9e();
      console.log("种植进度：" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%");
      _0x50935e += "【种植进度】" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%\n";
      _0x50935e += "【剩余水滴】" + _0x57cde7 + "g💧\n";
    } else {
      if ($.farmInfo?.["data"]?.["result"]?.["treeFullStage"] === 0) {
        console.log("没有种植水果，请在下面选择种植的商品，设置变量（商品的UID)再次运行即可种植");
        await _0x5382d3();

        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
          console.log("\n===============1级商品(UID)最快20天种成=================");

          for (let _0x5900dc of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
            console.log(_0x5900dc.skuName + "(" + _0x5900dc.uid + ")");
          }
        }

        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
          console.log("\n===============2级商品(UID)最快30天种成=================");

          for (let _0x5e70a5 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
            console.log(_0x5e70a5.skuName + "(" + _0x5e70a5.uid + ")");
          }
        }

        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
          console.log("\n===============3级商品(UID)最快41天种成=================");

          for (let _0x4999c2 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
            console.log(_0x4999c2.skuName + "(" + _0x4999c2.uid + ")");
          }
        }

        if (_0x33126f) {
          console.log("\n\n已设置种植目标，开始种植。。。");
          await _0x5cc779(_0x33126f);

          if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
            console.log("种植成功！！！再次执行去做任务领水滴浇水吧！");
            return;
          }
        }

        $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP选购并种植新的水果");
        $.isNode() && (await _0x450c1a.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP种植新的水果"));
        return;
      } else console.log("初始化农场数据异常, 请登录京东app查看农场功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo) + "\n"), _0x50935e = "【数据异常】请手动登录app查看此账号农场是否正常\n\n";
    }
  } catch (_0x423ffc) {
    console.log("任务执行异常，请检查执行日志 ‼️‼️\n\n");
    $.logErr(_0x423ffc);
  }

  await _0x36eb99();
}

async function _0x5ea13f() {
  await _0x3e051e();
  console.log("\n开始日常任务...");

  for (let _0x4e74b9 of $.farmTask.data.result.taskList) {
    if (_0x4e74b9.taskStatus == 3) {
      console.log(_0x4e74b9.mainTitle + "已完成");
      continue;
    }

    console.log("去做 " + _0x4e74b9.mainTitle);

    if (_0x4e74b9.taskStatus == 2) {
      await _0x53638d(_0x4e74b9.taskType, _0x4e74b9.taskId);
      $.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0 && console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
      continue;
    }

    switch (_0x4e74b9.taskType) {
      case "CUMULATIVE_TIMES":
        break;

      case "ORDER_MARK":
        break;

      case "EXTERNAL_BROWSE":
      case "BROWSE_CHANNEL":
      case "BROWSE_PRODUCT":
        if (!_0x4e74b9.taskSourceUrl) {
          await _0x1b86b1(_0x4e74b9.taskType, _0x4e74b9.taskId);
          let _0x33cd79 = $.taskDetail.data.result.taskDetaiList;
          _0x4e74b9.taskSourceUrl = _0x33cd79[Math.floor(Math.random() * _0x33cd79.length)].itemId;
        }

        await _0x3fb982(_0x4e74b9.taskType, _0x4e74b9.taskId, Buffer.from(_0x4e74b9.taskSourceUrl).toString("base64")), await $.wait(_0x4e74b9.timePeriod * 1000), await _0x53638d(_0x4e74b9.taskType, _0x4e74b9.taskId);

        if ($.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0) {
          console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
        }

        break;

      default:
        console.log(_0x4e74b9.taskType + " 类型未支持");
        break;
    }
  }

  await _0xa40469();
  await $.wait(500);
  await _0x45a1b7();
}

async function _0x540266() {
  console.log("开始预测水果成熟时间...\n");
  await initForFarm();
  if (!$.farmInfo.farmUserPro) await initForFarm();
  await _0x3e051e();
  let _0x44ed7 = $.farmTask.firstWaterInit.totalWaterTimes;
  _0x50935e += "【今日共浇水】" + _0x44ed7 + "次\n";
  _0x50935e += "【剩余水滴】" + $.farmInfo.farmUserPro.totalEnergy + "g💧\n";
  _0x50935e += "【水果进度】" + ($.farmInfo.farmUserPro.treeEnergy / $.farmInfo.farmUserPro.treeTotalEnergy * 100).toFixed(2) + "%，已浇水" + $.farmInfo.farmUserPro.treeEnergy / 10 + "次,还需" + ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10 + "次\n";
  if ($.farmInfo.toFlowTimes > $.farmInfo.farmUserPro.treeEnergy / 10) _0x50935e += "【开花进度】再浇水" + ($.farmInfo.toFlowTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次开花\n";else $.farmInfo.toFruitTimes > $.farmInfo.farmUserPro.treeEnergy / 10 && (_0x50935e += "【结果进度】再浇水" + ($.farmInfo.toFruitTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次结果\n");

  let _0x11df0f = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10;

  if (_0x44ed7 > 2) {
    let _0x2b3175 = Math.ceil(_0x11df0f / _0x44ed7) || 0;

    _0x50935e += "【预测】" + (_0x2b3175 === 1 ? "明天" : _0x2b3175 === 2 ? "后天" : _0x2b3175 + "天之后") + "(" + _0x5b12eb(24 * 60 * 60 * 1000 * _0x2b3175 + Date.now()) + "日)可兑换水果🍉\n";
  } else _0x50935e += "【预测】不浇水无限期\n";
}

async function _0x1d582a() {
  await _0x3e051e();

  if (JSON.stringify($.farmTask.data.result.taskList).includes("\"每日累计浇水10次\",\"singleTask\":true,\"subTitle\":\"完成任务，奖励10g水滴\",\"taskDoTimes\":10") === false) {
    console.log("\n准备浇水十次");
    _0x5b7a8c = false;

    for (let _0x256c66 = 0; _0x256c66 < 10 - $.farmTask.data.result.taskList[0].taskDoTimes; _0x256c66++) {
      console.log("第" + (_0x256c66 + 1) + "次浇水");
      await _0x44758a(1);

      if ($.waterResult.data.bizCode === 0) {
        console.log("浇水成功，剩余水滴" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips);

        if ($.waterResult.data.result.finished) {
          _0x5b7a8c = true;
          break;
        } else {
          if ($.waterResult.data.result.bottleWater < 10) {
            console.log("水滴不够，结束浇水\n");
            break;
          }
        }
      } else {
        if ($.waterResult.data.bizCode === 4) {
          console.log("水滴不够，结束浇水\n");
          break;
        } else {
          console.log("浇水出现失败异常,跳出不在继续浇水\n");
          break;
        }
      }

      _0x57cde7 = $.waterResult.data.result.bottleWater;
    }

    _0x5b7a8c && ($.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP查看"), $.done(), $.isNode() && (await _0x450c1a.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n快去领吧")));
  } else console.log("\n今日已完成10次浇水任务\n");
}

async function _0x4bb418() {
  console.log("检查剩余水滴能否继续浇水...\n");
  await _0x4e7c9e();
  _0x57cde7 = $.farmInfo.data.result.bottleWater;
  console.log("剩余水滴" + _0x57cde7 + "g\n");

  let _0x332d58 = _0x57cde7 - _0x272050;

  if (_0x332d58 >= 10) {
    $.log("\n开始浇水...");
    console.log("目前剩余水滴：" + _0x57cde7 + "g，可继续浇水");
    _0x5b7a8c = false;

    for (let _0x14ee30 = 0; _0x14ee30 < parseInt(_0x332d58 / 10); _0x14ee30++) {
      $.log("浇水" + (_0x14ee30 + 1) + "次");
      await _0x44758a(1);

      if ($.waterResult.code === 0) {
        console.log("浇水10g成功,剩余" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips + "\n");

        if ($.waterResult.data.result.finished) {
          _0x5b7a8c = true;
          $.log("水果已成熟啦！\n");
          break;
        } else {}
      } else {
        console.log("浇水出现失败异常,跳出不在继续浇水");
        break;
      }
    }

    _0x57cde7 = $.waterResult.data.result.bottleWater;
  } else console.log("目前剩余水滴：【" + _0x57cde7 + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");

  _0x5b7a8c && ($.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已可领取\n请去京东APP或微信小程序查看"), $.done(), $.isNode() && (await _0x450c1a.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场奖品记录里兑换")));
}

function _0x320d7a() {
  return new Promise(async _0x3ed311 => {
    if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) console.log("果树发芽了,奖励30g💧"), await _0xab83da("1"), console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "💧\n");else {
      if ($.waterResult.waterStatus === 1) console.log("果树开花了,奖励40g💧"), await _0xab83da("2"), console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");else {
        if ($.waterResult.waterStatus === 2) {
          console.log("果树长出小果子啦, 奖励50g💧");
          await _0xab83da("3");
          console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes));

          if ($.gotStageAwardForFarmRes.code === "0") {
            console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");
          }
        }
      }
    }

    _0x3ed311();
  });
}

async function _0x45a1b7() {
  await _0x358af7();

  if ($.initForTurntableFarmRes && $.initForTurntableFarmRes.code === 0) {
    console.log("\n开始天天抽奖任务...");
    await _0x284c51();
    if ($.wheeltaskRes.code == 0) for (let _0x2bd117 of $.wheeltaskRes.data) {
      if (_0x2bd117.taskFinished) {
        console.log(_0x2bd117.taskTitle + "----" + _0x2bd117.taskShowTitle + " 已完成");
        continue;
      }

      await _0x54e78d(_0x2bd117.taskType, _0x2bd117.id, _0x2bd117.taskSourceUrl);
      if ($.wheeldoRes && $.wheeldoRes.code == 0) console.log("任务完成，获得1次抽奖机会");else {
        console.log("错误了，403");
        break;
      }
      await $.wait(3000);
    }
    await _0x358af7();

    if ($.initForTurntableFarmRes.data.lotteryChances > 0) {
      console.log("\n天天抽奖次数 " + $.initForTurntableFarmRes.data.lotteryChances);
      console.log("开始抽奖...");
      let _0x2b8b4f = "";

      for (let _0x52e9c3 = 0; _0x52e9c3 < $.initForTurntableFarmRes.data.lotteryChances; _0x52e9c3++) {
        await _0x64a1c5();
        console.log("第" + (_0x52e9c3 + 1) + "次抽奖");

        if ($.lotteryRes && $.lotteryRes.code === 0) {
          _0x2b8b4f += $.lotteryRes.data.prizeName + "，";

          if ($.lotteryRes.data.lotteryChances === 0) {
            break;
          }
        } else {
          console.log("错误了！");
          break;
        }

        await $.wait(3000);
      }

      _0x2b8b4f && console.log("天天抽奖奖励：" + _0x2b8b4f.substr(0, _0x2b8b4f.length - 1) + "\n");
    } else console.log("天天抽奖无次数！");
  } else console.log("初始化天天抽奖得好礼失败！");
}

async function _0xa40469() {
  await _0x56a5c4();

  if ($.farmAssistResult.code === 0) {
    if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length >= 2) {
      if ($.farmAssistResult.data.result.status === 2) {
        let _0x594ca7 = 0;

        for (let _0x5622a5 of Object.keys($.farmAssistResult.data.result.assistStageList)) {
          let _0x3b7e9f = $.farmAssistResult.data.result.assistStageList[_0x5622a5];
          _0x3b7e9f.stageStaus === 2 && (await _0x4934a2(), await $.wait(500), $.receiveStageEnergy.code === 0 && (console.log("成功领取第" + (Number(_0x5622a5) + 1) + "段助力奖励：" + $.receiveStageEnergy.data.result.amount + "g💧"), _0x594ca7 += $.receiveStageEnergy.data.result.amount));
        }

        _0x50935e += "【额外奖励】" + _0x594ca7 + "g💧领取完成\n";
        console.log("【额外奖励】" + _0x594ca7 + "g💧领取完成\n");
      } else $.farmAssistResult.data.result.status === 3 && (console.log("已经领取过好友助力额外奖励"), _0x50935e += "【额外奖励】已领取过\n");
    } else console.log("助力好友未达到2个"), _0x50935e += "【额外奖励】领取失败,原因：给您助力的人未达2个\n";

    if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length > 0) {
      let _0x1b8813 = "";
      $.farmAssistResult.data.result.assistFriendList.map((_0x203fc4, _0x2557e3) => {
        _0x2557e3 === $.farmAssistResult.data.result.assistFriendList.length - 1 ? _0x1b8813 += _0x203fc4.nickname || "匿名用户" : _0x1b8813 += (_0x203fc4.nickname || "匿名用户") + ",";

        let _0x4515f0 = new Date(_0x203fc4.time),
            _0x355987 = _0x4515f0.getFullYear() + "/" + ("0" + (_0x4515f0.getMonth() + 1)).slice(-2) + "/" + ("0" + _0x4515f0.getDate()).slice(-2) + " " + ("0" + _0x4515f0.getHours()).slice(-2) + ":" + ("0" + _0x4515f0.getMinutes()).slice(-2) + ":" + ("0" + _0x4515f0.getSeconds()).slice(-2);

        console.log("【" + (_0x203fc4.nickname || "匿名用户") + "】 在 " + _0x355987 + " 给您助过力");
      });
      _0x50935e += "【助力您的好友】" + _0x1b8813 + "\n";
    }

    console.log("\n领取额外奖励水滴结束\n");
  } else {
    await _0x1f6cd8();

    if ($.masterHelpResult.code === "0") {
      if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length >= 5) !$.masterHelpResult.masterGotFinal ? (await _0x3277dd(), $.masterGotFinished.code === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished.amount + "】g💧"), _0x50935e += "【额外奖励】" + $.masterGotFinished.amount + "g💧领取成功\n")) : (console.log("已经领取过5好友助力额外奖励"), _0x50935e += "【额外奖励】已被领取过\n");else {
        console.log("助力好友未达到5个");
        _0x50935e += "【额外奖励】领取失败,原因：给您助力的人未达5个\n";
      }

      if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length > 0) {
        let _0x551f65 = "";
        $.masterHelpResult.masterHelpPeoples.map((_0x4ae1f4, _0x3c1182) => {
          _0x3c1182 === $.masterHelpResult.masterHelpPeoples.length - 1 ? _0x551f65 += _0x4ae1f4.nickName || "匿名用户" : _0x551f65 += (_0x4ae1f4.nickName || "匿名用户") + ",";

          let _0x1f62ea = new Date(_0x4ae1f4.time),
              _0x4f7ea4 = _0x1f62ea.getFullYear() + "-" + (_0x1f62ea.getMonth() + 1) + "-" + _0x1f62ea.getDate() + " " + _0x1f62ea.getHours() + ":" + _0x1f62ea.getMinutes() + ":" + _0x1f62ea.getMinutes();

          console.log("【" + (_0x4ae1f4.nickName || "匿名用户") + "】 在 " + _0x4f7ea4 + " 给您助过力");
        });
        _0x50935e += "【助力您的好友】" + _0x551f65 + "\n";
      }

      console.log("领取额外奖励水滴结束\n");
    }
  }
}

async function _0x276bae() {
  let _0x10c1a4 = !$.farmTask.waterRainInit.f;

  _0x10c1a4 ? (console.log("水滴雨任务，每天两次，最多可得10g水滴"), console.log("两次水滴雨任务是否全部完成：" + ($.farmTask.waterRainInit.f ? "是" : "否")), $.farmTask.waterRainInit.lastTime && Date.now() < $.farmTask.waterRainInit.lastTime + 3 * 60 * 60 * 1000 && (_0x10c1a4 = false, console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】还未到时间\n")), _0x10c1a4 && (console.log("开始水滴雨任务,这是第" + ($.farmTask.waterRainInit.winTimes + 1) + "次，剩余" + (2 - ($.farmTask.waterRainInit.winTimes + 1)) + "次"), await _0x22ded8(), console.log("水滴雨waterRain"), $.waterRain.code === "0" && (console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain.addEnergy + "g💧"), console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】获得" + $.waterRain.addEnergy + "g💧\n")))) : console.log("【水滴雨】已全部完成\n");
}

async function _0x2c0f8a() {
  await _0x2784de();

  if ($.clockInInit.code === 0) {
    if ($.clockInInit.data.signInFlag == 0) {
      console.log("\n开始今日签到");
      await _0xcf430d();
      if ($.clockInForFarmRes.code === 0) console.log("获得" + $.clockInForFarmRes.data.prizeDesc + "💧\n");else $.clockInForFarmRes.code === 210000 ? (console.log("签到失败：" + JSON.stringify($.clockInForFarmRes)), $.kuwei = true) : console.log("签到失败：" + JSON.stringify($.clockInForFarmRes));
    }
  }
}

async function _0x43b7d2() {
  await _0x2ad036();
  console.log("\n开始给好友浇水...");
  await _0x3e051e();
  const {
    waterFriendCountKey: _0xa024b8,
    waterFriendMax: _0x424b90
  } = $.farmTask.waterFriendTaskInit;
  console.log("今日已给" + _0xa024b8 + "个好友浇水");

  if (_0xa024b8 < _0x424b90) {
    let _0x1feb0d = [];

    if ($.friendList.friends && $.friendList.friends.length > 0) {
      $.friendList.friends.map((_0xfdb5e0, _0x16f152) => {
        _0xfdb5e0.friendState === 1 && _0x1feb0d.length < _0x424b90 - _0xa024b8 && _0x1feb0d.push(_0xfdb5e0.shareCode);
      });
      _0x1feb0d.length > 0 && console.log("需要浇水的好友shareCodes:" + JSON.stringify(_0x1feb0d));
      _0x1feb0d.length == 0 && console.log("没有需要浇水的好友!\n");
      let _0x30913e = 0,
          _0x5adb7d = "";

      for (let _0x1fdefd = 0; _0x1fdefd < _0x1feb0d.length; _0x1fdefd++) {
        await _0x2ebb03(_0x1feb0d[_0x1fdefd]);
        console.log("为第" + (_0x1fdefd + 1) + "个好友浇水");

        if ($.waterFriendForFarmRes.code === "0") {
          _0x30913e++;

          if ($.waterFriendForFarmRes.cardInfo) {
            console.log("为好友浇水获得道具了");

            if ($.waterFriendForFarmRes.cardInfo.type === "beanCard") {
              console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule);
              _0x5adb7d += "水滴换豆卡,";
            } else {
              if ($.waterFriendForFarmRes.cardInfo.type === "fastCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x5adb7d += "快速浇水卡,";else {
                if ($.waterFriendForFarmRes.cardInfo.type === "doubleCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x5adb7d += "水滴翻倍卡,";else $.waterFriendForFarmRes.cardInfo.type === "signCard" && (console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x5adb7d += "加签卡,");
              }
            }
          }
        } else $.waterFriendForFarmRes.code === "11" && console.log("水滴不够,跳出浇水");
      }

      _0x30913e > 0 && console.log("已给" + _0x30913e + "个好友浇水,消耗" + _0x30913e * 10 + "g水\n");

      if (_0x5adb7d && _0x5adb7d.length > 0) {
        console.log("【好友浇水奖励】" + _0x5adb7d.substr(0, _0x5adb7d.length - 1) + "\n");
      }
    } else console.log("好友列表无好友,快去邀请您的好友吧!\n");
  } else console.log("今日已为" + _0x424b90 + "个好友浇水\n");
}

async function _0x135895() {
  await _0x3e051e();
  const {
    waterFriendCountKey: _0x4ceb58,
    waterFriendMax: _0x2948bc,
    waterFriendSendWater: _0x32aae9,
    waterFriendGotAward: _0x3f5275
  } = $.farmTask.waterFriendTaskInit;

  if (_0x4ceb58 >= _0x2948bc) {
    if (!_0x3f5275) {
      await _0x3edf00();
      $.waterFriendGotAwardRes.code === "0" && console.log("领取给好友浇水奖励" + $.waterFriendGotAwardRes.addWater + "g💧\n");
    } else console.log("给好友浇水的水滴奖励已领取\n");
  } else console.log("给" + _0x2948bc + "个好友浇水未完成\n");
}

async function _0x456b81() {
  for (let _0x1e8562 of _0x3e8351) {
    if (_0x1e8562 === $.farmInfo.farmUserPro.shareCode) {
      console.log("自己不能邀请自己成为好友噢\n");
      continue;
    }

    await _0x804af0(_0x1e8562);
    if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友");else $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
  }
}

async function _0x693d56() {
  for (let _0x356d90 = 0; _0x356d90 < 10; _0x356d90++) {
    $.duckRes = await _0x413177("getFullCollectionReward", {
      "type": 2,
      "version": 24,
      "channel": 1,
      "babelChannel": "121"
    });

    if ($.duckRes.code === "0") {
      if (!$.duckRes.hasLimit) console.log("小鸭子游戏:" + $.duckRes.title);else {
        console.log("" + $.duckRes.title);
        break;
      }
    } else {
      if ($.duckRes.code === "10") {
        console.log("小鸭子游戏达到上限");
        break;
      }
    }
  }
}

async function _0x1c1352() {
  $.totalWaterReward = await _0x413177("totalWaterTaskForFarm");
}

async function _0x34d9d1() {
  $.firstWaterReward = await _0x413177("firstWaterTaskForFarm");
}

async function _0x403c59() {
  $.newtaskinfo = await _0x413177("gotNewUserTaskForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}

async function _0x29b547() {
  $.newtaskinfo = await _0x413177("gotLowFreqWaterForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}

async function _0x4e7c9e() {
  $.farmInfo = await _0x413177("farm_home", {
    "version": 1
  });
}

async function _0x3552b8() {
  $.rain_round = await _0x413177("farm_rain_round_icon", {
    "version": 1
  });
}

async function _0x1e45df(_0x19d1da) {
  $.rain_page = await _0x413177("farm_rain_page", {
    "version": 1,
    "token": _0x19d1da
  });
}

async function _0xb97e47(_0x577b85) {
  $.rain_reward = await _0x413177("farm_rain_reward", {
    "version": 1,
    "token": _0x577b85,
    "bcc": 200,
    "scc": 0
  });
}

async function _0x3edf00() {
  $.waterFriendGotAwardRes = await _0x413177("waterFriendGotAwardForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  });
}

async function _0x1c6062() {
  $.myCardInfoRes = await _0x413177("myCardInfoForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  });
}

async function _0x1cc59a(_0x5c201e) {
  $.userMyCardRes = await _0x413177("userMyCardForFarm", {
    "cardType": _0x5c201e
  });
}

async function _0xab83da(_0x1669d8) {
  $.gotStageAwardForFarmRes = await _0x413177("gotStageAwardForFarm", {
    "type": _0x1669d8
  });
}

async function _0x44758a(_0x45bf89) {
  await $.wait(1000);
  $.waterResult = await _0x413177("farm_water", {
    "version": 1,
    "waterType": _0x45bf89
  });
}

async function _0x358af7() {
  $.initForTurntableFarmRes = await _0x46961f("wheelsHome", {
    "linkId": "VssYBUKJOen7HZXpC8dRFA"
  });
}

async function _0x284c51() {
  $.wheeltaskRes = await _0x46961f("apTaskList", {
    "linkId": "VssYBUKJOen7HZXpC8dRFA"
  });
}

async function _0x54e78d(_0x1be695, _0x1b3362, _0x39c636) {
  $.wheeldoRes = await _0x46961f("apsDoTask", {
    "taskType": _0x1be695,
    "taskId": _0x1b3362,
    "channel": 4,
    "checkVersion": true,
    "linkId": "VssYBUKJOen7HZXpC8dRFA",
    "itemId": _0x39c636
  });
}

async function _0x64a1c5() {
  $.lotteryRes = await _0x46961f("wheelsLottery", {
    "linkId": "VssYBUKJOen7HZXpC8dRFA"
  });
}

async function _0x5382d3() {
  $.treeboardRes = await _0x413177("farm_tree_board", {
    "version": 1
  });
}

async function _0x5cc779(_0x150b52) {
  $.planttreeRes = await _0x413177("farm_plant_tree", {
    "version": 1,
    "uid": _0x150b52
  });
}

async function _0x84dd97(_0x146825) {
  const _0x21c232 = {
    "type": 2,
    "adId": _0x146825,
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  };
  $.browserForTurntableFarm2Res = await _0x413177("browserForTurntableFarm", _0x21c232);
}

async function _0x44b616() {
  $.lotteryMasterHelpRes = await _0x413177("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 24,
    "channel": 1
  });
}

async function _0x3277dd() {
  $.masterGotFinished = await _0x413177("masterGotFinishedTaskForFarm");
}

async function _0x1f6cd8() {
  $.masterHelpResult = await _0x413177("masterHelpTaskInitForFarm");
}

async function _0x56a5c4() {
  $.farmAssistResult = await _0x413177("farm_assist_init_info", {
    "version": 1
  });
}

async function _0x4934a2() {
  $.receiveStageEnergy = await _0x413177("farm_assist_receive_award", {
    "version": 1
  });
}

async function _0x804af0() {
  $.inviteFriendRes = await _0x413177("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}

async function _0x585878() {
  $.helpResult = await _0x413177("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}

async function _0x22ded8() {
  const _0x345cd7 = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterRain = await _0x413177("waterRainForFarm", _0x345cd7);
}

async function _0x2784de() {
  $.clockInInit = await _0x46961f("dongDongFarmSignHome", {
    "linkId": "LCH-fV7hSnChB-6i5f4ayw"
  });
}

async function _0xcf430d() {
  $.clockInForFarmRes = await _0x46961f("dongDongFarmSignIn", {
    "linkId": "LCH-fV7hSnChB-6i5f4ayw"
  });
}

async function _0x1b22bf(_0x4b63b7, _0x28527c, _0x247cdf) {
  const _0x2bf133 = "clockInFollowForFarm";
  let _0x18831b = {
    "id": _0x4b63b7,
    "type": _0x28527c,
    "step": _0x247cdf
  };

  if (_0x28527c === "theme") {
    if (_0x247cdf === "1") $.themeStep1 = await _0x413177(_0x2bf133, _0x18831b);else _0x247cdf === "2" && ($.themeStep2 = await _0x413177(_0x2bf133, _0x18831b));
  } else {
    if (_0x28527c === "venderCoupon") {
      if (_0x247cdf === "1") $.venderCouponStep1 = await _0x413177(_0x2bf133, _0x18831b);else _0x247cdf === "2" && ($.venderCouponStep2 = await _0x413177(_0x2bf133, _0x18831b));
    }
  }
}

async function _0x4069ec() {
  $.gotClockInGiftRes = await _0x413177("clockInForFarm", {
    "type": 2,
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}

async function _0xbc3d20() {
  $.threeMeal = await _0x413177("gotThreeMealForFarm");
}

async function _0x3fb982(_0x3c1297, _0x2d6ae1, _0x1feefb) {
  $.browseResult = await _0x413177("farm_do_task", {
    "version": 1,
    "taskType": _0x3c1297,
    "taskId": _0x2d6ae1,
    "taskInsert": true,
    "itemId": _0x1feefb,
    "channel": 0
  });
}

async function _0x53638d(_0x406a0a, _0x1dccbc) {
  $.dotaskResult = await _0x413177("farm_task_receive_award", {
    "version": 1,
    "taskType": _0x406a0a,
    "taskId": _0x1dccbc,
    "channel": 0
  });
}

async function _0x1b86b1(_0x2da04e, _0x1d78ed) {
  $.taskDetail = await _0x413177("farm_task_detail", {
    "version": 1,
    "taskType": _0x2da04e,
    "taskId": _0x1d78ed,
    "channel": 0
  });
}

async function _0x319eef() {
  $.goalResult = await _0x413177("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}

async function _0x3e051e() {
  $.farmTask = await _0x413177("farm_task_list", {
    "version": 1,
    "channel": 0
  });
}

async function _0x2e9086() {
  $.farmTask = await _0x413177("taskInitForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "45",
    "lat": "0",
    "lng": "0"
  });
}

async function _0x2ad036() {
  $.friendList = await _0x413177("friendListInitForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}

async function _0x47172b() {
  $.awardInviteFriendRes = await _0x413177("awardInviteFriendForFarm");
}

async function _0x2ebb03(_0x2e0f8b) {
  const _0x3f23fb = {
    "shareCode": _0x2e0f8b,
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await _0x413177("waterFriendForFarm", _0x3f23fb);
}

async function _0x36eb99() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";else $.getdata("jdFruitNotify") ? $.ctrTemp = $.getdata("jdFruitNotify") === "false" : $.ctrTemp = "" + _0x91f3a7 === "false";
  $.ctrTemp ? ($.msg($.name, _0x4ab8af, _0x50935e, _0x268f79), $.isNode() && (_0x26a551 += _0x4ab8af + "\n" + _0x50935e + ($.index !== _0xa0b3e7.length ? "\n\n" : ""))) : $.log("\n" + _0x50935e + "\n");
}

function _0x5b12eb(_0x3e1bcf) {
  let _0x29a284;

  return _0x3e1bcf ? _0x29a284 = new Date(_0x3e1bcf) : _0x29a284 = new Date(), _0x29a284.getFullYear() + "-" + (_0x29a284.getMonth() + 1 >= 10 ? _0x29a284.getMonth() + 1 : "0" + (_0x29a284.getMonth() + 1)) + "-" + (_0x29a284.getDate() >= 10 ? _0x29a284.getDate() : "0" + _0x29a284.getDate());
}

function _0xd7f3cc() {
  return new Promise(_0x4b4ff8 => {
    console.log("开始获取配置文件\n");
    _0x450c1a = $.isNode() ? require("./sendNotify") : "";

    const _0x1bbcc4 = $.isNode() ? require("./jdCookie.js") : "";

    if ($.isNode()) {
      Object.keys(_0x1bbcc4).forEach(_0x3b1c33 => {
        _0x1bbcc4[_0x3b1c33] && _0xa0b3e7.push(_0x1bbcc4[_0x3b1c33]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else {
      _0xa0b3e7 = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x1b21e2($.getdata("CookiesJD") || "[]").map(_0x132bfc => _0x132bfc.cookie)].filter(_0x5a30f3 => !!_0x5a30f3);
    }

    _0x4b4ff8();
  });
}

async function _0x24c758() {
  await _0x413177("ddnc_getTreasureBoxAward", {
    "type": 1,
    "babelChannel": "121",
    "line": "getBean",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });
  await $.wait(500);
  await _0x1de73c();
  await $.wait(2000);

  let _0x3bd506 = await _0x413177("ddnc_getTreasureBoxAward", {
    "type": 2,
    "babelChannel": "121",
    "line": "getBean",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });

  return _0x3bd506;
}

async function _0x2b005d() {
  await _0x413177("ddnc_getTreasureBoxAward", {
    "type": 1,
    "babelChannel": "121",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });
  await $.wait(500);
  await _0x2e9086();
  await $.wait(2000);

  let _0x513091 = await _0x413177("ddnc_getTreasureBoxAward", {
    "type": 2,
    "babelChannel": "45",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });

  return _0x513091;
}

function _0x1de73c() {
  return new Promise(_0x2d8730 => {
    const _0x1c4b38 = {
      "url": "https://api.m.jd.com/client.action?functionId=beanTaskList&body=%7B%22viewChannel%22%3A%22AppHome%22%2C%22beanVersion%22%3A1%2C%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D&appid=ld",
      "headers": {
        "Cookie": _0x1df8bd,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x1c4b38, (_0x41919e, _0x18d357, _0x3b2140) => {
      _0x2d8730();
    });
  });
}

function _0x41f57e() {
  return new Promise(_0x5b8189 => {
    const _0x520740 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x1df8bd,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x520740, (_0x1670fa, _0x1ca8b5, _0x35d0ca) => {
      try {
        if (_0x35d0ca) {
          _0x35d0ca = JSON.parse(_0x35d0ca);

          if (_0x35d0ca.islogin === "1") {} else _0x35d0ca.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0xd47f46) {
        console.log(_0xd47f46);
      } finally {
        _0x5b8189();
      }
    });
  });
}

async function _0x413177(_0x2ba607, _0x4b9174 = {}, _0x11f683 = 1500) {
  $.reqnum++;

  if (_0x1006ef[_0x2ba607]) {
    let _0x208259 = {
      "appId": _0x1006ef[_0x2ba607],
      "fn": _0x2ba607,
      "body": _0x4b9174,
      "apid": "signed_wh5",
      "ver": $.UA.split(";")[2],
      "cl": "ios",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
    _0x4b9174 = await _0x29948c.getbody(_0x208259);
  } else {
    _0x4b9174 = "functionId=" + _0x2ba607 + "&body=" + encodeURIComponent(JSON.stringify(_0x4b9174)) + "&appid=signed_wh5";
  }

  return new Promise(_0x45f4b0 => {
    setTimeout(() => {
      $.get(_0x54d5a8(_0x4b9174), (_0x49c304, _0x52daf7, _0x124589) => {
        try {
          _0x49c304 ? (console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x49c304)), console.log("function_id:" + _0x2ba607), $.logErr(_0x49c304)) : _0x31de77(_0x124589) && (_0x124589 = JSON.parse(_0x124589));
        } catch (_0x355f10) {
          $.logErr(_0x355f10, _0x52daf7);
        } finally {
          _0x45f4b0(_0x124589);
        }
      });
    }, _0x11f683);
  });
}

async function _0x46961f(_0xbfae01, _0x1d61df = {}) {
  return new Promise(async _0x56240f => {
    let _0x5cbc43 = "POST",
        _0x467896;

    const _0x37b22a = {
      "wqDefault": "false",
      "rfs": "0000",
      "cthr": "1",
      "loginType": "",
      "loginWQBiz": "wegame",
      "openudid": $.UUID,
      "uuid": $.UUID,
      "build": "169107",
      "screen": "430*932",
      "networkType": "wifi",
      "d_brand": "iPhone",
      "d_model": "iPhone16,2",
      "lang": "zh_CN",
      "osVersion": _0x55bd4a.getLatestIOSVersion(),
      "partner": ""
    };

    if (_0x3b774a[_0xbfae01]) {
      _0x1d7f09 = {
        "appId": _0x3b774a[_0xbfae01],
        "functionId": _0xbfae01,
        "appid": "activities_platform",
        "clientVersion": _0x55bd4a.getLatestAppVersion(),
        "client": "ios",
        "body": _0x1d61df,
        "version": "4.4",
        "ua": $.UA,
        "t": true
      };

      let _0x132c96 = await _0x11f902.getH5st(_0x1d7f09);

      _0x1d61df = _0x132c96.paramsData;
    } else _0x5cbc43 = "GET", _0x1d61df = {
      "functionId": _0xbfae01,
      "body": JSON.stringify(_0x1d61df),
      "t": Date.now(),
      "appid": "activities_platform",
      "client": "ios",
      "clientVersion": _0x55bd4a.getLatestAppVersion()
    }, _0x467896 = Object.assign(_0x1d61df, _0x37b22a);

    const _0x5d055f = {
      "url": "https://api.m.jd.com/api",
      "method": _0x5cbc43,
      "headers": {
        "Accept": "application/json, text/plain, */*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": _0x1df8bd,
        "Host": "api.m.jd.com",
        "Referer": "https://h5.m.jd.com/",
        "X-Referer-Page": "https://h5.m.jd.com/pb/015686010/Bc9WX7MpCW7nW9QjZ5N3fFeJXMH/index.html",
        "Origin": "https://h5.m.jd.com",
        "x-rp-client": "h5_1.0.0",
        "User-Agent": $.UA
      },
      "params": _0x467896,
      "data": _0x1d61df,
      "timeout": 30000,
      "httpsTlsOptions": ["wheelsHome", "wheelsLottery"].includes(_0xbfae01) ? _0x55bd4a.useAppTls() : null
    };
    ["wheelsHome", "apsDoTask", "wheelsLottery", "apTaskList"].includes(_0xbfae01) && (_0x5d055f.headers.Referer = "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA", _0x5d055f.headers.Origin = "https://lotterydraw-new.jd.com", _0x5d055f.headers["X-Referer-Page"] = "https://lotterydraw-new.jd.com/");

    const _0x3abe50 = await _0x55bd4a.request(_0x5d055f);

    _0x56240f(_0x3abe50.data);
  });
}

function _0x23e2bf(_0xc5fbdb, _0x189f98, _0x12b186) {
  if (_0xc5fbdb == null) return "";

  var _0x397f3c = [],
      _0x1a1ad0 = typeof _0xc5fbdb;

  if (_0x1a1ad0 == "string" || _0x1a1ad0 == "number" || _0x1a1ad0 == "boolean") _0x397f3c.push(_0x189f98 + "=" + (_0x12b186 == null || _0x12b186 ? encodeURIComponent(_0xc5fbdb) : _0xc5fbdb));else for (var _0x18d7a3 in _0xc5fbdb) {
    var _0x3a7a60 = _0x189f98 == null ? _0x18d7a3 : _0x189f98 + (_0xc5fbdb instanceof Array ? "[" + _0x18d7a3 + "]" : "." + _0x18d7a3);

    _0x397f3c.push(_0x23e2bf(_0xc5fbdb[_0x18d7a3], _0x3a7a60, _0x12b186));
  }
  return _0x397f3c.join("&");
}

function _0x31de77(_0x4f5cd2) {
  try {
    if (typeof JSON.parse(_0x4f5cd2) == "object") return true;
  } catch (_0x3f6a7d) {
    return console.log(_0x3f6a7d), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function _0x54d5a8(_0x3ef2d3 = {}) {
  return {
    "url": _0x356981 + "?" + _0x3ef2d3,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://h5.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://h5.m.jd.com/",
      "Cookie": _0x1df8bd
    },
    "timeout": 30000
  };
}

function _0x3873dc(_0x55a8a6 = {}) {
  return {
    "url": "https://api.m.jd.com/api",
    "form": _0x55a8a6,
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded",
      "Cookie": _0x1df8bd,
      "Host": "api.m.jd.com",
      "Referer": "https://lotterydraw-new.jd.com/?id=VssYBUKJOen7HZXpC8dRFA",
      "X-Referer-Page": "https://lotterydraw-new.jd.com/",
      "Origin": "https://lotterydraw-new.jd.com",
      "x-rp-client": "h5_1.0.0",
      "User-Agent": $.UA
    },
    "timeout": 30000
  };
}

function _0x29addb(_0x2327a1, _0x3e5c53 = {}) {
  return {
    "url": _0x356981 + "?" + _0x3e5c53,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "Cookie": _0x1df8bd
    },
    "timeout": 10000
  };
}

function _0x1b21e2(_0x1a8ad4) {
  if (typeof _0x1a8ad4 == "string") {
    try {
      return JSON.parse(_0x1a8ad4);
    } catch (_0x10357f) {
      return console.log(_0x10357f), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }