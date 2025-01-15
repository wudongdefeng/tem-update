/*
活动入口：京东APP我的--东东农场
==========================Quantumultx=========================
[task_local]
#jd新农场
33 6,16 * * * jd_fruit_new.js

*/
const $ = new Env('新农场任务');
const _0x18c7e6 = 100;

let _0x311f91 = false,
    _0x54fefd = [],
    _0x43a595 = "",
    _0x246a84,
    _0x42b70b,
    _0x189da7 = "",
    _0x56b40c = "",
    _0x47bd4d = "",
    _0x4876f3 = {},
    _0x44e354 = false,
    _0x4df6d9 = 0;

const _0x1a5ee8 = "https://api.m.jd.com/client.action",
      _0x296c26 = "openjd://virtual?params=%7B%20%22category%22:%20%22jump%22,%20%22des%22:%20%22m%22,%20%22url%22:%20%22https://h5.m.jd.com/babelDiy/Zeus/3KSjXqQabiTuD1cJ28QskrpWoBKT/index.html%22%20%7D";

let _0x1ee45c = process.env.FRUIT_ID ? process.env.FRUIT_ID : "";

const _0x5bd8a2 = require("./USER_AGENTS"),
      _0x28eaac = require("fs"),
      _0x2150ca = require("./function/dylanv"),
      _0x16d4ef = require("./function/dylano");

if (process.env.DY_PROXY) {
  const _0x5a18f3 = require("./function/proxy.js");

  $.get = _0x5a18f3.intoRequest($.get.bind($));
  $.post = _0x5a18f3.intoRequest($.post.bind($));
}

let _0x230b12 = [];
$.reqnum = 1;
const _0x5a039e = {
  "farm_home": "c57f6",
  "farm_do_task": "28981",
  "farm_task_receive_award": "33e0f",
  "farm_water": "28981",
  "farm_assist_receive_award": "c4332",
  "farm_rain_round_icon": "c57f6",
  "farm_rain_reward": "c57f6"
},
      _0x2d5096 = {
  "wheelsHome": "c06b7",
  "wheelsLottery": "bd6c8",
  "apsDoTask": "54ed7"
};
!(async () => {
  await _0x4fd732();

  if (!_0x54fefd[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }

  $.log("\n版本：2023/2/11 优化");
  $.log("问题建议：https://t.me/dylan_jdpro\n");
  $.log("\n环境变量（可选项）：");
  $.log("export DY_PROXY='api_url' 可使用代理API");
  $.log("export FRUIT_ID='UID' 未种植可设置商品UID来自动种植\n");
  process.env.NO_WATER == "true" && 0 ? (_0x189da7 = "【一水不缴模式已开启！】\n\n", $.log("【一水不缴模式已开启！】\n")) : process.env.DO_TEN_WATER_AGAIN == "true" && 0 && (_0x189da7 = "【攒水滴模式已开启，每天只浇水10次！】\n\n", $.log("【攒水滴模式已开启，每天只浇水10次！】\n"));

  for (let _0x6895d0 = 0; _0x6895d0 < _0x54fefd.length; _0x6895d0++) {
    if (_0x54fefd[_0x6895d0]) {
      _0x43a595 = _0x54fefd[_0x6895d0];
      $.UserName = decodeURIComponent(_0x43a595.match(/pt_pin=([^; ]+)(?=;?)/) && _0x43a595.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0x6895d0 + 1;
      $.isLogin = true;
      $.nickName = "";
      $.farmInfo = "";
      ct = 0;
      $.kuwei = false;
      await _0x23d641();
      console.log("\n------------------【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "-------------------\n");

      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        $.isNode() && (await _0x246a84.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie"));
        continue;
      }

      _0x56b40c = "";
      _0x47bd4d = "";
      _0x4876f3 = {};
      $.UA = _0x5bd8a2.UARAM();
      await _0x9b6c07();
      await $.wait(2000);
    }
  }

  _0x28eaac.writeFile("./fruit_helpcode_new", JSON.stringify(_0x230b12), _0x27894f => {
    _0x27894f && console.log(_0x27894f);
  });

  $.isNode() && _0x189da7 && $.ctrTemp && (await _0x246a84.sendNotify("" + $.name, "" + _0x189da7));
})().catch(_0x5b71b0 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0x5b71b0 + "!", "");
}).finally(() => {
  $.done();
});

async function _0x9b6c07() {
  _0x47bd4d = "【京东账号" + $.index + "🆔】" + ($.nickName || $.UserName);

  try {
    await _0x122efa();
    await $.wait(500);

    if ($.farmInfo?.["data"]?.["result"]?.["skuName"]) {
      _0x56b40c = "【水果名称】" + $.farmInfo.data.result.skuName + "\n";
      console.log("【账号（" + $.UserName + "）的" + $.name + "好友互助码】" + $.farmInfo.data.result.farmHomeShare.inviteCode);
      console.log("【已成功兑换水果】" + $.farmInfo.data.result.completeTimes + "次");
      _0x56b40c += "【已兑换水果】" + $.farmInfo.data.result.completeTimes + "次\n";

      _0x230b12.push($.farmInfo.data.result.farmHomeShare.inviteCode);

      await _0x230c5a();

      if ($.farmInfo.data.result.treeFullStage === 5 || $.kuwei) {
        if ($.farmInfo.data.result.treeFullStage === 5) _0x4876f3["open-url"] = _0x296c26, $.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP或微信小程序查看\n点击弹窗即达", _0x4876f3), await _0x246a84.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场奖品记录里兑换");else $.kuwei && console.log("\n" + $.farmInfo.data.result.skuName + "   枯萎了，重新种植吧！");
        console.log("\n种植水果，请在下面选择种植的商品，设置变量（商品的UID)再次运行即可种植");
        await _0x50f190();

        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
          console.log("\n===============1级商品(UID)最快20天种成=================");

          for (let _0xb7e83 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
            console.log(_0xb7e83.skuName + "(" + _0xb7e83.uid + ")");
          }
        }

        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
          console.log("\n===============2级商品(UID)最快30天种成=================");

          for (let _0x5c1b11 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
            console.log(_0x5c1b11.skuName + "(" + _0x5c1b11.uid + ")");
          }
        }

        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
          console.log("\n===============3级商品(UID)最快41天种成=================");

          for (let _0x99af0a of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
            console.log(_0x99af0a.skuName + "(" + _0x99af0a.uid + ")");
          }
        }

        if (_0x1ee45c) {
          console.log("\n\n已设置种植目标，开始种植。。。");
          await _0x353309(_0x1ee45c);

          if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
            console.log("种植成功！！！再次执行去做任务领水滴浇水吧！");
            return;
          }
        }

        return;
      } else $.farmInfo.data.result.treeCurrentState === 0 && (console.log("\n" + $.farmInfo.data.result.skuName + "   种植中..."), console.log("种植进度：" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%"));

      await _0x278af3();

      if ($.rain_round.data.result.curRoundToken) {
        console.log("\n开始水滴红包雨...");
        await $.wait(1000);
        await _0x1293a4($.rain_round.data.result.curRoundToken);
        await _0x5ad9fa($.rain_round.data.result.curRoundToken);
        $.rain_reward.data.bizCode == 0 && console.log("获得水滴" + $.rain_reward.data.result.waterRainPrize[0].value + "g💧");
      }

      await _0x2e5f5d();
      await _0xadbd8c();
      if (process.env.DO_TEN_WATER_AGAIN != "true" || 1) $.log("执行继续浇水..."), await _0x4c93c6();else {
        $.log("不执行再次浇水，攒水滴!");
      }
      await $.wait(500);
      await _0x122efa();
      console.log("种植进度：" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%");
      _0x56b40c += "【种植进度】" + $.farmInfo.data.result.treeFullStage + "/5----" + $.farmInfo.data.result.currentProcess + "%\n";
      _0x56b40c += "【剩余水滴】" + _0x4df6d9 + "g💧\n";
    } else {
      if ($.farmInfo?.["data"]?.["result"]?.["treeFullStage"] === 0) {
        console.log("没有种植水果，请在下面选择种植的商品，设置变量（商品的UID)再次运行即可种植");
        await _0x50f190();

        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
          console.log("\n===============1级商品(UID)最快20天种成=================");

          for (let _0x1e5970 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][0]?.["farmLevelTrees"]) {
            console.log(_0x1e5970.skuName + "(" + _0x1e5970.uid + ")");
          }
        }

        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
          console.log("\n===============2级商品(UID)最快30天种成=================");

          for (let _0x160bf2 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][1]?.["farmLevelTrees"]) {
            console.log(_0x160bf2.skuName + "(" + _0x160bf2.uid + ")");
          }
        }

        if ($.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
          console.log("\n===============3级商品(UID)最快41天种成=================");

          for (let _0x3ff2c7 of $.treeboardRes.data?.["result"]?.["farmTreeLevels"][2]?.["farmLevelTrees"]) {
            console.log(_0x3ff2c7.skuName + "(" + _0x3ff2c7.uid + ")");
          }
        }

        if (_0x1ee45c) {
          console.log("\n\n已设置种植目标，开始种植。。。");
          await _0x353309(_0x1ee45c);

          if ($.planttreeRes.code == 0 && $.planttreeRes.data.bizCode == 0) {
            console.log("种植成功！！！再次执行去做任务领水滴浇水吧！");
            return;
          }
        }

        $.msg($.name, "", "【京东账号" + $.index + "】 " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP选购并种植新的水果");
        $.isNode() && (await _0x246a84.sendNotify($.name + " - 您忘了种植新的水果", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n【提醒⏰】您忘了种植新的水果\n请去京东APP种植新的水果"));
        return;
      } else console.log("初始化农场数据异常, 请登录京东app查看农场功能是否正常,农场初始化数据: " + JSON.stringify($.farmInfo) + "\n"), _0x56b40c = "【数据异常】请手动登录app查看此账号农场是否正常\n\n";
    }
  } catch (_0x5464c0) {
    console.log("任务执行异常，请检查执行日志 ‼️‼️\n\n");
    $.logErr(_0x5464c0);
  }

  await _0x2831e4();
}

async function _0xadbd8c() {
  await _0x86d68d();
  console.log("\n开始日常任务...");

  for (let _0x13e67a of $.farmTask.data.result.taskList) {
    if (_0x13e67a.taskStatus == 3) {
      console.log(_0x13e67a.mainTitle + "已完成");
      continue;
    }

    console.log("去做 " + _0x13e67a.mainTitle);

    if (_0x13e67a.taskStatus == 2) {
      await _0x380e28(_0x13e67a.taskType, _0x13e67a.taskId);
      $.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0 && console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
      continue;
    }

    switch (_0x13e67a.taskType) {
      case "CUMULATIVE_TIMES":
        break;

      case "ORDER_MARK":
        break;

      case "EXTERNAL_BROWSE":
      case "BROWSE_CHANNEL":
      case "BROWSE_PRODUCT":
        if (!_0x13e67a.taskSourceUrl) {
          await _0x421829(_0x13e67a.taskType, _0x13e67a.taskId);
          let _0x340773 = $.taskDetail.data.result.taskDetaiList;
          _0x13e67a.taskSourceUrl = _0x340773[Math.floor(Math.random() * _0x340773.length)].itemId;
        }

        await _0x1f3f23(_0x13e67a.taskType, _0x13e67a.taskId, Buffer.from(_0x13e67a.taskSourceUrl).toString("base64")), await $.wait(_0x13e67a.timePeriod * 1000), await _0x380e28(_0x13e67a.taskType, _0x13e67a.taskId);
        $.dotaskResult?.["data"] && Object.keys($.dotaskResult.data.result).length > 0 && console.log("任务完成，获得水滴" + $.dotaskResult.data.result.taskAward[0].awardValue + "g💧");
        break;

      default:
        console.log(_0x13e67a.taskType + " 类型未支持");
        break;
    }
  }

  await _0x35cee9();
  await $.wait(500);
  await _0x4645b1();
}

async function _0xbb18c3() {
  console.log("开始预测水果成熟时间...\n");
  await initForFarm();
  if (!$.farmInfo.farmUserPro) await initForFarm();
  await _0x86d68d();
  let _0x16c9c9 = $.farmTask.firstWaterInit.totalWaterTimes;
  _0x56b40c += "【今日共浇水】" + _0x16c9c9 + "次\n";
  _0x56b40c += "【剩余水滴】" + $.farmInfo.farmUserPro.totalEnergy + "g💧\n";
  _0x56b40c += "【水果进度】" + ($.farmInfo.farmUserPro.treeEnergy / $.farmInfo.farmUserPro.treeTotalEnergy * 100).toFixed(2) + "%，已浇水" + $.farmInfo.farmUserPro.treeEnergy / 10 + "次,还需" + ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10 + "次\n";
  if ($.farmInfo.toFlowTimes > $.farmInfo.farmUserPro.treeEnergy / 10) _0x56b40c += "【开花进度】再浇水" + ($.farmInfo.toFlowTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次开花\n";else $.farmInfo.toFruitTimes > $.farmInfo.farmUserPro.treeEnergy / 10 && (_0x56b40c += "【结果进度】再浇水" + ($.farmInfo.toFruitTimes - $.farmInfo.farmUserPro.treeEnergy / 10) + "次结果\n");

  let _0x354e21 = ($.farmInfo.farmUserPro.treeTotalEnergy - $.farmInfo.farmUserPro.treeEnergy) / 10;

  if (_0x16c9c9 > 2) {
    let _0x1cec04 = Math.ceil(_0x354e21 / _0x16c9c9) || 0;

    _0x56b40c += "【预测】" + (_0x1cec04 === 1 ? "明天" : _0x1cec04 === 2 ? "后天" : _0x1cec04 + "天之后") + "(" + _0x5868d1(24 * 60 * 60 * 1000 * _0x1cec04 + Date.now()) + "日)可兑换水果🍉\n";
  } else _0x56b40c += "【预测】不浇水无限期\n";
}

async function _0x2e5f5d() {
  await _0x86d68d();

  if (JSON.stringify($.farmTask.data.result.taskList).includes("\"每日累计浇水10次\",\"singleTask\":true,\"subTitle\":\"完成任务，奖励10g水滴\",\"taskDoTimes\":10") === false) {
    console.log("\n准备浇水十次");
    _0x44e354 = false;

    for (let _0x4b141b = 0; _0x4b141b < 10 - $.farmTask.data.result.taskList[0].taskDoTimes; _0x4b141b++) {
      console.log("第" + (_0x4b141b + 1) + "次浇水");
      await _0x33cdee(1);

      if ($.waterResult.data.bizCode === 0) {
        console.log("浇水成功，剩余水滴" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips);

        if ($.waterResult.data.result.finished) {
          _0x44e354 = true;
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

      _0x4df6d9 = $.waterResult.data.result.bottleWater;
    }

    _0x44e354 && ($.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo.farmUserPro.name + "已可领取\n请去京东APP查看"), $.done(), $.isNode() && (await _0x246a84.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已可领取", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n快去领吧")));
  } else console.log("\n今日已完成10次浇水任务\n");
}

async function _0x4c93c6() {
  console.log("检查剩余水滴能否继续浇水...\n");
  await _0x122efa();
  _0x4df6d9 = $.farmInfo.data.result.bottleWater;
  console.log("剩余水滴" + _0x4df6d9 + "g\n");

  let _0x55d0b9 = _0x4df6d9 - _0x18c7e6;

  if (_0x55d0b9 >= 10) {
    $.log("\n开始浇水...");
    console.log("目前剩余水滴：" + _0x4df6d9 + "g，可继续浇水");
    _0x44e354 = false;

    for (let _0x28730c = 0; _0x28730c < parseInt(_0x55d0b9 / 10); _0x28730c++) {
      $.log("浇水" + (_0x28730c + 1) + "次");
      await _0x33cdee(1);

      if ($.waterResult.code === 0) {
        console.log("浇水10g成功,剩余" + $.waterResult.data.result.bottleWater + "g，" + $.waterResult.data.result.waterTips + "\n");

        if ($.waterResult.data.result.finished) {
          _0x44e354 = true;
          $.log("水果已成熟啦！\n");
          break;
        } else {}
      } else {
        console.log("浇水出现失败异常,跳出不在继续浇水");
        break;
      }
    }

    _0x4df6d9 = $.waterResult.data.result.bottleWater;
  } else console.log("目前剩余水滴：【" + _0x4df6d9 + "】g,不再继续浇水,保留部分水滴用于完成第二天【十次浇水得水滴】任务");

  _0x44e354 && ($.msg($.name, "", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已可领取\n请去京东APP或微信小程序查看"), $.done(), $.isNode() && (await _0x246a84.sendNotify($.name + " - 账号" + $.index + " - " + ($.nickName || $.UserName) + "水果已种成", "【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n【提醒⏰】" + $.farmInfo?.["data"]?.["result"]?.["skuName"] + "已种成\n请去京东APP农场奖品记录里兑换")));
}

function _0x4670cf() {
  return new Promise(async _0x57a695 => {
    if ($.waterResult.waterStatus === 0 && $.waterResult.treeEnergy === 10) console.log("果树发芽了,奖励30g💧"), await _0x4542ea("1"), console.log("浇水阶段奖励1领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树发芽了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "💧\n");else {
      if ($.waterResult.waterStatus === 1) console.log("果树开花了,奖励40g💧"), await _0x4542ea("2"), console.log("浇水阶段奖励2领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树开花了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n");else $.waterResult.waterStatus === 2 && (console.log("果树长出小果子啦, 奖励50g💧"), await _0x4542ea("3"), console.log("浇水阶段奖励3领取结果 " + JSON.stringify($.gotStageAwardForFarmRes)), $.gotStageAwardForFarmRes.code === "0" && console.log("【果树结果了】奖励" + $.gotStageAwardForFarmRes.addEnergy + "g💧\n"));
    }

    _0x57a695();
  });
}

async function _0x4645b1() {
  await _0x2ddbce();

  if ($.initForTurntableFarmRes.code === 0) {
    console.log("\n开始天天抽奖任务...");
    await _0x567e10();
    if ($.wheeltaskRes.code == 0) for (let _0x4af1f5 of $.wheeltaskRes.data) {
      if (_0x4af1f5.taskFinished) {
        console.log(_0x4af1f5.taskTitle + "----" + _0x4af1f5.taskShowTitle + " 已完成");
        continue;
      }

      await _0x5bc837(_0x4af1f5.taskType, _0x4af1f5.id, _0x4af1f5.taskSourceUrl);
      $.wheeldoRes.code == 0 && console.log("任务完成，获得1次抽奖机会");
      await $.wait(1000);
    }
    await _0x2ddbce();

    if ($.initForTurntableFarmRes.data.lotteryChances > 0) {
      console.log("\n天天抽奖次数 " + $.initForTurntableFarmRes.data.lotteryChances);
      console.log("开始抽奖...");
      let _0x52bbf0 = "";

      for (let _0xbb34e6 = 0; _0xbb34e6 < $.initForTurntableFarmRes.data.lotteryChances; _0xbb34e6++) {
        await _0x3b81ef();
        await $.wait(1000);
        console.log("第" + (_0xbb34e6 + 1) + "次抽奖");

        if ($.lotteryRes.code === 0) {
          _0x52bbf0 += $.lotteryRes.data.prizeName + "，";
          if ($.lotteryRes.data.lotteryChances === 0) break;
        }
      }

      _0x52bbf0 && console.log("天天抽奖奖励：" + _0x52bbf0.substr(0, _0x52bbf0.length - 1) + "\n");
    } else console.log("天天抽奖无次数！");
  } else console.log("初始化天天抽奖得好礼失败！");
}

async function _0x35cee9() {
  await _0x5ceff7();

  if ($.farmAssistResult.code === 0) {
    if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length >= 2) {
      if ($.farmAssistResult.data.result.status === 2) {
        let _0x2affdc = 0;

        for (let _0x5ee08e of Object.keys($.farmAssistResult.data.result.assistStageList)) {
          let _0x50af5f = $.farmAssistResult.data.result.assistStageList[_0x5ee08e];
          _0x50af5f.stageStaus === 2 && (await _0x1e918d(), await $.wait(500), $.receiveStageEnergy.code === 0 && (console.log("成功领取第" + (Number(_0x5ee08e) + 1) + "段助力奖励：" + $.receiveStageEnergy.data.result.amount + "g💧"), _0x2affdc += $.receiveStageEnergy.data.result.amount));
        }

        _0x56b40c += "【额外奖励】" + _0x2affdc + "g💧领取完成\n";
        console.log("【额外奖励】" + _0x2affdc + "g💧领取完成\n");
      } else $.farmAssistResult.data.result.status === 3 && (console.log("已经领取过好友助力额外奖励"), _0x56b40c += "【额外奖励】已领取过\n");
    } else console.log("助力好友未达到2个"), _0x56b40c += "【额外奖励】领取失败,原因：给您助力的人未达2个\n";

    if ($.farmAssistResult.data.result.assistFriendList && $.farmAssistResult.data.result.assistFriendList.length > 0) {
      let _0x598f7e = "";
      $.farmAssistResult.data.result.assistFriendList.map((_0x1dac33, _0x23b29b) => {
        _0x23b29b === $.farmAssistResult.data.result.assistFriendList.length - 1 ? _0x598f7e += _0x1dac33.nickname || "匿名用户" : _0x598f7e += (_0x1dac33.nickname || "匿名用户") + ",";

        let _0x4afd2a = new Date(_0x1dac33.time),
            _0x34fc50 = _0x4afd2a.getFullYear() + "/" + ("0" + (_0x4afd2a.getMonth() + 1)).slice(-2) + "/" + ("0" + _0x4afd2a.getDate()).slice(-2) + " " + ("0" + _0x4afd2a.getHours()).slice(-2) + ":" + ("0" + _0x4afd2a.getMinutes()).slice(-2) + ":" + ("0" + _0x4afd2a.getSeconds()).slice(-2);

        console.log("【" + (_0x1dac33.nickname || "匿名用户") + "】 在 " + _0x34fc50 + " 给您助过力");
      });
      _0x56b40c += "【助力您的好友】" + _0x598f7e + "\n";
    }

    console.log("\n领取额外奖励水滴结束\n");
  } else {
    await _0x54182d();

    if ($.masterHelpResult.code === "0") {
      if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length >= 5) {
        if (!$.masterHelpResult.masterGotFinal) {
          await _0x56592f();
          $.masterGotFinished.code === "0" && (console.log("已成功领取好友助力奖励：【" + $.masterGotFinished.amount + "】g💧"), _0x56b40c += "【额外奖励】" + $.masterGotFinished.amount + "g💧领取成功\n");
        } else {
          console.log("已经领取过5好友助力额外奖励");
          _0x56b40c += "【额外奖励】已被领取过\n";
        }
      } else console.log("助力好友未达到5个"), _0x56b40c += "【额外奖励】领取失败,原因：给您助力的人未达5个\n";

      if ($.masterHelpResult.masterHelpPeoples && $.masterHelpResult.masterHelpPeoples.length > 0) {
        let _0xb3cb84 = "";
        $.masterHelpResult.masterHelpPeoples.map((_0x22d077, _0x352418) => {
          _0x352418 === $.masterHelpResult.masterHelpPeoples.length - 1 ? _0xb3cb84 += _0x22d077.nickName || "匿名用户" : _0xb3cb84 += (_0x22d077.nickName || "匿名用户") + ",";

          let _0x32cbe9 = new Date(_0x22d077.time),
              _0x2a78f2 = _0x32cbe9.getFullYear() + "-" + (_0x32cbe9.getMonth() + 1) + "-" + _0x32cbe9.getDate() + " " + _0x32cbe9.getHours() + ":" + _0x32cbe9.getMinutes() + ":" + _0x32cbe9.getMinutes();

          console.log("【" + (_0x22d077.nickName || "匿名用户") + "】 在 " + _0x2a78f2 + " 给您助过力");
        });
        _0x56b40c += "【助力您的好友】" + _0xb3cb84 + "\n";
      }

      console.log("领取额外奖励水滴结束\n");
    }
  }
}

async function _0x56f43e() {
  let _0x3b7392 = !$.farmTask.waterRainInit.f;

  _0x3b7392 ? (console.log("水滴雨任务，每天两次，最多可得10g水滴"), console.log("两次水滴雨任务是否全部完成：" + ($.farmTask.waterRainInit.f ? "是" : "否")), $.farmTask.waterRainInit.lastTime && Date.now() < $.farmTask.waterRainInit.lastTime + 3 * 60 * 60 * 1000 && (_0x3b7392 = false, console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】还未到时间\n")), _0x3b7392 && (console.log("开始水滴雨任务,这是第" + ($.farmTask.waterRainInit.winTimes + 1) + "次，剩余" + (2 - ($.farmTask.waterRainInit.winTimes + 1)) + "次"), await _0x2e9cdc(), console.log("水滴雨waterRain"), $.waterRain.code === "0" && (console.log("水滴雨任务执行成功，获得水滴：" + $.waterRain.addEnergy + "g💧"), console.log("【第" + ($.farmTask.waterRainInit.winTimes + 1) + "次水滴雨】获得" + $.waterRain.addEnergy + "g💧\n")))) : console.log("【水滴雨】已全部完成\n");
}

async function _0x230c5a() {
  await _0x14ba7b();

  if ($.clockInInit.code === 0) {
    if ($.clockInInit.data.signInFlag == 0) {
      console.log("\n开始今日签到");
      await _0x7e5651();
      if ($.clockInForFarmRes.code === 0) console.log("获得" + $.clockInForFarmRes.data.prizeDesc + "💧\n");else $.clockInForFarmRes.code === 210000 ? (console.log("签到失败：" + JSON.stringify($.clockInForFarmRes)), $.kuwei = true) : console.log("签到失败：" + JSON.stringify($.clockInForFarmRes));
    }
  }
}

async function _0x3e1a89() {
  await _0x1e2c0a();
  console.log("\n开始给好友浇水...");
  await _0x86d68d();
  const {
    waterFriendCountKey: _0x4b1393,
    waterFriendMax: _0x2bf868
  } = $.farmTask.waterFriendTaskInit;
  console.log("今日已给" + _0x4b1393 + "个好友浇水");

  if (_0x4b1393 < _0x2bf868) {
    let _0x4f6802 = [];

    if ($.friendList.friends && $.friendList.friends.length > 0) {
      $.friendList.friends.map((_0x5d958e, _0x2b3391) => {
        _0x5d958e.friendState === 1 && _0x4f6802.length < _0x2bf868 - _0x4b1393 && _0x4f6802.push(_0x5d958e.shareCode);
      });
      _0x4f6802.length > 0 && console.log("需要浇水的好友shareCodes:" + JSON.stringify(_0x4f6802));
      _0x4f6802.length == 0 && console.log("没有需要浇水的好友!\n");
      let _0x1a3402 = 0,
          _0x537a52 = "";

      for (let _0x10fe8b = 0; _0x10fe8b < _0x4f6802.length; _0x10fe8b++) {
        await _0x49a40b(_0x4f6802[_0x10fe8b]);
        console.log("为第" + (_0x10fe8b + 1) + "个好友浇水");

        if ($.waterFriendForFarmRes.code === "0") {
          _0x1a3402++;

          if ($.waterFriendForFarmRes.cardInfo) {
            console.log("为好友浇水获得道具了");
            if ($.waterFriendForFarmRes.cardInfo.type === "beanCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x537a52 += "水滴换豆卡,";else {
              if ($.waterFriendForFarmRes.cardInfo.type === "fastCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x537a52 += "快速浇水卡,";else {
                if ($.waterFriendForFarmRes.cardInfo.type === "doubleCard") console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x537a52 += "水滴翻倍卡,";else $.waterFriendForFarmRes.cardInfo.type === "signCard" && (console.log("获取道具卡:" + $.waterFriendForFarmRes.cardInfo.rule), _0x537a52 += "加签卡,");
              }
            }
          }
        } else $.waterFriendForFarmRes.code === "11" && console.log("水滴不够,跳出浇水");
      }

      _0x1a3402 > 0 && console.log("已给" + _0x1a3402 + "个好友浇水,消耗" + _0x1a3402 * 10 + "g水\n");
      _0x537a52 && _0x537a52.length > 0 && console.log("【好友浇水奖励】" + _0x537a52.substr(0, _0x537a52.length - 1) + "\n");
    } else console.log("好友列表无好友,快去邀请您的好友吧!\n");
  } else console.log("今日已为" + _0x2bf868 + "个好友浇水\n");
}

async function _0x392089() {
  await _0x86d68d();
  const {
    waterFriendCountKey: _0xaab578,
    waterFriendMax: _0x4e595c,
    waterFriendSendWater: _0x2f15ca,
    waterFriendGotAward: _0x2f3b09
  } = $.farmTask.waterFriendTaskInit;

  if (_0xaab578 >= _0x4e595c) {
    if (!_0x2f3b09) {
      await _0x539eea();

      if ($.waterFriendGotAwardRes.code === "0") {
        console.log("领取给好友浇水奖励" + $.waterFriendGotAwardRes.addWater + "g💧\n");
      }
    } else console.log("给好友浇水的水滴奖励已领取\n");
  } else console.log("给" + _0x4e595c + "个好友浇水未完成\n");
}

async function _0x6c2f0b() {
  for (let _0x2709a8 of _0x42b70b) {
    if (_0x2709a8 === $.farmInfo.farmUserPro.shareCode) {
      console.log("自己不能邀请自己成为好友噢\n");
      continue;
    }

    await _0x19eaf6(_0x2709a8);
    if ($.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "0") console.log("接收邀请成为好友结果成功,您已成为" + $.inviteFriendRes.helpResult.masterUserInfo.nickName + "的好友");else $.inviteFriendRes && $.inviteFriendRes.helpResult && $.inviteFriendRes.helpResult.code === "17" && console.log("接收邀请成为好友结果失败,对方已是您的好友");
  }
}

async function _0x4ade07() {
  for (let _0x29ee58 = 0; _0x29ee58 < 10; _0x29ee58++) {
    $.duckRes = await _0x17b49b("getFullCollectionReward", {
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

async function _0x782892() {
  $.totalWaterReward = await _0x17b49b("totalWaterTaskForFarm");
}

async function _0x47f16a() {
  $.firstWaterReward = await _0x17b49b("firstWaterTaskForFarm");
}

async function _0x3033ad() {
  $.newtaskinfo = await _0x17b49b("gotNewUserTaskForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}

async function _0x293806() {
  $.newtaskinfo = await _0x17b49b("gotLowFreqWaterForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}

async function _0x122efa() {
  $.farmInfo = await _0x17b49b("farm_home", {
    "version": 1
  });
}

async function _0x278af3() {
  $.rain_round = await _0x17b49b("farm_rain_round_icon", {
    "version": 1
  });
}

async function _0x1293a4(_0x5b713f) {
  $.rain_page = await _0x17b49b("farm_rain_page", {
    "version": 1,
    "token": _0x5b713f
  });
}

async function _0x5ad9fa(_0x369e3d) {
  $.rain_reward = await _0x17b49b("farm_rain_reward", {
    "version": 1,
    "token": _0x369e3d,
    "bcc": 200,
    "scc": 0
  });
}

async function _0x539eea() {
  $.waterFriendGotAwardRes = await _0x17b49b("waterFriendGotAwardForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  });
}

async function _0x478646() {
  $.myCardInfoRes = await _0x17b49b("myCardInfoForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  });
}

async function _0x1b2944(_0x3f58c9) {
  $.userMyCardRes = await _0x17b49b("userMyCardForFarm", {
    "cardType": _0x3f58c9
  });
}

async function _0x4542ea(_0x1de552) {
  $.gotStageAwardForFarmRes = await _0x17b49b("gotStageAwardForFarm", {
    "type": _0x1de552
  });
}

async function _0x33cdee(_0x4b1509) {
  await $.wait(1000);
  $.waterResult = await _0x17b49b("farm_water", {
    "version": 1,
    "waterType": _0x4b1509
  });
}

async function _0x2ddbce() {
  $.initForTurntableFarmRes = await _0x2164fa("wheelsHome", {
    "linkId": "VssYBUKJOen7HZXpC8dRFA"
  });
}

async function _0x567e10() {
  $.wheeltaskRes = await _0x2164fa("apTaskList", {
    "linkId": "VssYBUKJOen7HZXpC8dRFA"
  });
}

async function _0x5bc837(_0x4e8eea, _0x2f9f81, _0x5b0b04) {
  $.wheeldoRes = await _0x2164fa("apsDoTask", {
    "taskType": _0x4e8eea,
    "taskId": _0x2f9f81,
    "channel": 4,
    "checkVersion": true,
    "linkId": "VssYBUKJOen7HZXpC8dRFA",
    "itemId": _0x5b0b04
  });
}

async function _0x3b81ef() {
  $.lotteryRes = await _0x2164fa("wheelsLottery", {
    "linkId": "VssYBUKJOen7HZXpC8dRFA"
  });
}

async function _0x50f190() {
  $.treeboardRes = await _0x17b49b("farm_tree_board", {
    "version": 1
  });
}

async function _0x353309(_0x9aecee) {
  $.planttreeRes = await _0x17b49b("farm_plant_tree", {
    "version": 1,
    "uid": _0x9aecee
  });
}

async function _0x334c03(_0x8b9f5e) {
  const _0x578759 = {
    "type": 2,
    "adId": _0x8b9f5e,
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  };
  $.browserForTurntableFarm2Res = await _0x17b49b("browserForTurntableFarm", _0x578759);
}

async function _0x8224c8() {
  $.lotteryMasterHelpRes = await _0x17b49b("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-3",
    "babelChannel": "3",
    "version": 24,
    "channel": 1
  });
}

async function _0x56592f() {
  $.masterGotFinished = await _0x17b49b("masterGotFinishedTaskForFarm");
}

async function _0x54182d() {
  $.masterHelpResult = await _0x17b49b("masterHelpTaskInitForFarm");
}

async function _0x5ceff7() {
  $.farmAssistResult = await _0x17b49b("farm_assist_init_info", {
    "version": 1
  });
}

async function _0x1e918d() {
  $.receiveStageEnergy = await _0x17b49b("farm_assist_receive_award", {
    "version": 1
  });
}

async function _0x19eaf6() {
  $.inviteFriendRes = await _0x17b49b("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0] + "-inviteFriend",
    "version": 4,
    "channel": 2
  });
}

async function _0x295380() {
  $.helpResult = await _0x17b49b("initForFarm", {
    "imageUrl": "",
    "nickName": "",
    "shareCode": arguments[0],
    "babelChannel": "3",
    "version": 2,
    "channel": 1
  });
}

async function _0x2e9cdc() {
  const _0x4c05dd = {
    "type": 1,
    "hongBaoTimes": 100,
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterRain = await _0x17b49b("waterRainForFarm", _0x4c05dd);
}

async function _0x14ba7b() {
  $.clockInInit = await _0x2164fa("dongDongFarmSignHome", {
    "linkId": "LCH-fV7hSnChB-6i5f4ayw"
  });
}

async function _0x7e5651() {
  $.clockInForFarmRes = await _0x2164fa("dongDongFarmSignIn", {
    "linkId": "LCH-fV7hSnChB-6i5f4ayw"
  });
}

async function _0x1a2c50(_0x16e815, _0x444927, _0x58e459) {
  const _0xe97114 = "clockInFollowForFarm";
  let _0x4e7179 = {
    "id": _0x16e815,
    "type": _0x444927,
    "step": _0x58e459
  };

  if (_0x444927 === "theme") {
    if (_0x58e459 === "1") $.themeStep1 = await _0x17b49b(_0xe97114, _0x4e7179);else _0x58e459 === "2" && ($.themeStep2 = await _0x17b49b(_0xe97114, _0x4e7179));
  } else {
    if (_0x444927 === "venderCoupon") {
      if (_0x58e459 === "1") $.venderCouponStep1 = await _0x17b49b(_0xe97114, _0x4e7179);else {
        if (_0x58e459 === "2") {
          $.venderCouponStep2 = await _0x17b49b(_0xe97114, _0x4e7179);
        }
      }
    }
  }
}

async function _0x34ab2d() {
  $.gotClockInGiftRes = await _0x17b49b("clockInForFarm", {
    "type": 2,
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}

async function _0x962519() {
  $.threeMeal = await _0x17b49b("gotThreeMealForFarm");
}

async function _0x1f3f23(_0x101608, _0x6e34fa, _0x50ee66) {
  $.browseResult = await _0x17b49b("farm_do_task", {
    "version": 1,
    "taskType": _0x101608,
    "taskId": _0x6e34fa,
    "taskInsert": true,
    "itemId": _0x50ee66,
    "channel": 0
  });
}

async function _0x380e28(_0x3b707f, _0x280867) {
  $.dotaskResult = await _0x17b49b("farm_task_receive_award", {
    "version": 1,
    "taskType": _0x3b707f,
    "taskId": _0x280867,
    "channel": 0
  });
}

async function _0x421829(_0x261072, _0x101d08) {
  $.taskDetail = await _0x17b49b("farm_task_detail", {
    "version": 1,
    "taskType": _0x261072,
    "taskId": _0x101d08,
    "channel": 0
  });
}

async function _0x47cc2f() {
  $.goalResult = await _0x17b49b("gotWaterGoalTaskForFarm", {
    "type": 3
  });
}

async function _0x86d68d() {
  $.farmTask = await _0x17b49b("farm_task_list", {
    "version": 1,
    "channel": 0
  });
}

async function _0x56b55b() {
  $.farmTask = await _0x17b49b("taskInitForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "45",
    "lat": "0",
    "lng": "0"
  });
}

async function _0x1e2c0a() {
  $.friendList = await _0x17b49b("friendListInitForFarm", {
    "version": 24,
    "channel": 1,
    "babelChannel": "121",
    "lat": "0",
    "lng": "0"
  });
}

async function _0xcf32c7() {
  $.awardInviteFriendRes = await _0x17b49b("awardInviteFriendForFarm");
}

async function _0x49a40b(_0x1fbe51) {
  const _0x1d26d4 = {
    "shareCode": _0x1fbe51,
    "version": 24,
    "channel": 1,
    "babelChannel": "121"
  };
  $.waterFriendForFarmRes = await _0x17b49b("waterFriendForFarm", _0x1d26d4);
}

async function _0x2831e4() {
  if ($.isNode() && process.env.FRUIT_NOTIFY_CONTROL) $.ctrTemp = "" + process.env.FRUIT_NOTIFY_CONTROL === "false";else {
    if ($.getdata("jdFruitNotify")) $.ctrTemp = $.getdata("jdFruitNotify") === "false";else {
      $.ctrTemp = "" + _0x311f91 === "false";
    }
  }
  $.ctrTemp ? ($.msg($.name, _0x47bd4d, _0x56b40c, _0x4876f3), $.isNode() && (_0x189da7 += _0x47bd4d + "\n" + _0x56b40c + ($.index !== _0x54fefd.length ? "\n\n" : ""))) : $.log("\n" + _0x56b40c + "\n");
}

function _0x5868d1(_0x2d0a66) {
  let _0x30ae5f;

  return _0x2d0a66 ? _0x30ae5f = new Date(_0x2d0a66) : _0x30ae5f = new Date(), _0x30ae5f.getFullYear() + "-" + (_0x30ae5f.getMonth() + 1 >= 10 ? _0x30ae5f.getMonth() + 1 : "0" + (_0x30ae5f.getMonth() + 1)) + "-" + (_0x30ae5f.getDate() >= 10 ? _0x30ae5f.getDate() : "0" + _0x30ae5f.getDate());
}

function _0x4fd732() {
  return new Promise(_0x3e3fcd => {
    console.log("开始获取配置文件\n");
    _0x246a84 = $.isNode() ? require("./sendNotify") : "";

    const _0x563cfa = $.isNode() ? require("./jdCookie.js") : "";

    if ($.isNode()) {
      Object.keys(_0x563cfa).forEach(_0x176a49 => {
        _0x563cfa[_0x176a49] && _0x54fefd.push(_0x563cfa[_0x176a49]);
      });
      if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
    } else {
      _0x54fefd = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ..._0x435c5a($.getdata("CookiesJD") || "[]").map(_0x4fc8e2 => _0x4fc8e2.cookie)].filter(_0x3e7039 => !!_0x3e7039);
    }

    _0x3e3fcd();
  });
}

async function _0x46b8a4() {
  await _0x17b49b("ddnc_getTreasureBoxAward", {
    "type": 1,
    "babelChannel": "121",
    "line": "getBean",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });
  await $.wait(500);
  await _0x2558b3();
  await $.wait(2000);

  let _0x1623a0 = await _0x17b49b("ddnc_getTreasureBoxAward", {
    "type": 2,
    "babelChannel": "121",
    "line": "getBean",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });

  return _0x1623a0;
}

async function _0x4567ec() {
  await _0x17b49b("ddnc_getTreasureBoxAward", {
    "type": 1,
    "babelChannel": "121",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });
  await $.wait(500);
  await _0x56b55b();
  await $.wait(2000);

  let _0x14d1b3 = await _0x17b49b("ddnc_getTreasureBoxAward", {
    "type": 2,
    "babelChannel": "45",
    "version": 24,
    "channel": 1,
    "lat": "0",
    "lng": "0"
  });

  return _0x14d1b3;
}

function _0x2558b3() {
  return new Promise(_0x361341 => {
    const _0x2d2f21 = {
      "url": "https://api.m.jd.com/client.action?functionId=beanTaskList&body=%7B%22viewChannel%22%3A%22AppHome%22%2C%22beanVersion%22%3A1%2C%22lng%22%3A%22%22%2C%22lat%22%3A%22%22%7D&appid=ld",
      "headers": {
        "Cookie": _0x43a595,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x2d2f21, (_0x3a31a2, _0x47eaac, _0x2cb5c7) => {
      _0x361341();
    });
  });
}

function _0x23d641() {
  return new Promise(_0x332bc1 => {
    const _0x199218 = {
      "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      "headers": {
        "Cookie": _0x43a595,
        "referer": "https://h5.m.jd.com/",
        "User-Agent": $.UA
      },
      "timeout": 10000
    };
    $.get(_0x199218, (_0x8fcc20, _0x4e2d80, _0xc5045f) => {
      try {
        if (_0xc5045f) {
          _0xc5045f = JSON.parse(_0xc5045f);

          if (_0xc5045f.islogin === "1") {} else _0xc5045f.islogin === "0" && ($.isLogin = false);
        }
      } catch (_0x1b3db5) {
        console.log(_0x1b3db5);
      } finally {
        _0x332bc1();
      }
    });
  });
}

async function _0x17b49b(_0xcc4c76, _0x1a6d6e = {}, _0x57ef51 = 1500) {
  $.reqnum++;

  if (_0x5a039e[_0xcc4c76]) {
    let _0x23e934 = {
      "appId": _0x5a039e[_0xcc4c76],
      "fn": _0xcc4c76,
      "body": _0x1a6d6e,
      "apid": "signed_wh5",
      "ver": $.UA.split(";")[2],
      "cl": "ios",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
    _0x1a6d6e = await _0x2150ca.getbody(_0x23e934);
  } else _0x1a6d6e = "functionId=" + _0xcc4c76 + "&body=" + encodeURIComponent(JSON.stringify(_0x1a6d6e)) + "&appid=signed_wh5";

  return new Promise(_0x43c039 => {
    setTimeout(() => {
      $.get(_0x3c4b8e(_0x1a6d6e), (_0x5a854f, _0x44a7b5, _0x13ec13) => {
        try {
          if (_0x5a854f) console.log("\n东东农场: API查询请求失败 ‼️‼️"), console.log(JSON.stringify(_0x5a854f)), console.log("function_id:" + _0xcc4c76), $.logErr(_0x5a854f);else {
            _0x441e2f(_0x13ec13) && (_0x13ec13 = JSON.parse(_0x13ec13));
          }
        } catch (_0x40bbc4) {
          $.logErr(_0x40bbc4, _0x44a7b5);
        } finally {
          _0x43c039(_0x13ec13);
        }
      });
    }, _0x57ef51);
  });
}

async function _0x2164fa(_0x2595b7, _0x56bd63 = {}, _0x4ea7c6 = 1500) {
  $.reqnum++;

  if (_0x2d5096[_0x2595b7]) {
    let _0x5c040a = {
      "appId": _0x2d5096[_0x2595b7],
      "fn": _0x2595b7,
      "body": _0x56bd63,
      "apid": "activities_platform",
      "ver": $.UA.split(";")[2],
      "cl": "ios",
      "user": $.UserName,
      "code": 1,
      "ua": $.UA
    };
    _0x56bd63 = await _0x16d4ef.getbody(_0x5c040a);
  } else _0x56bd63 = "functionId=" + _0x2595b7 + "&body=" + encodeURIComponent(JSON.stringify(_0x56bd63)) + "&appid=activities_platform";

  return new Promise(_0x5254b => {
    setTimeout(() => {
      $.post(_0x24f191(_0x56bd63), (_0x536dbf, _0x18eaa6, _0x1be0d4) => {
        try {
          if (_0x536dbf) {
            console.log("\n东东农场: API请求失败 ‼️‼️");
            console.log(JSON.stringify(_0x536dbf));
            console.log("function_id:" + _0x2595b7);
            $.logErr(_0x536dbf);
          } else {
            if (_0x441e2f(_0x1be0d4)) {
              _0x1be0d4 = JSON.parse(_0x1be0d4);
            }
          }
        } catch (_0x5e701a) {
          $.logErr(_0x5e701a, _0x18eaa6);
        } finally {
          _0x5254b(_0x1be0d4);
        }
      });
    }, _0x4ea7c6);
  });
}

function _0x441e2f(_0x5cc8d8) {
  try {
    if (typeof JSON.parse(_0x5cc8d8) == "object") return true;
  } catch (_0x46b63d) {
    return console.log(_0x46b63d), console.log("京东服务器访问数据为空，请检查自身设备网络情况"), false;
  }
}

function _0x3c4b8e(_0x3f1ab9 = {}) {
  return {
    "url": _0x1a5ee8 + "?" + _0x3f1ab9,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://h5.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://h5.m.jd.com/",
      "Cookie": _0x43a595
    },
    "timeout": 30000
  };
}

function _0x24f191(_0x40f50a = {}) {
  return {
    "url": "https://api.m.jd.com/api",
    "body": _0x40f50a,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://pro.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://pro.m.jd.com/",
      "Cookie": _0x43a595
    },
    "timeout": 30000
  };
}

function _0x298641(_0x2c416a, _0x2d0254 = {}) {
  return {
    "url": _0x1a5ee8 + "?" + _0x2d0254,
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Origin": "https://carry.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.UA,
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://carry.m.jd.com/",
      "Cookie": _0x43a595
    },
    "timeout": 10000
  };
}

function _0x435c5a(_0x51ab93) {
  if (typeof _0x51ab93 == "string") {
    try {
      return JSON.parse(_0x51ab93);
    } catch (_0x33a1f4) {
      return console.log(_0x33a1f4), $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie"), [];
    }
  }
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
