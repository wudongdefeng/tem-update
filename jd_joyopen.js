/*
[task_local]
#京东抽奖机通用
11 11 11 11 * jd_lottery.js, tag=京东抽奖机通用, enabled=true

//变量：export JD_Lottery="id" 多个使用  @  连接
 */
const $ = new Env('京东抽奖机通用-KR');
const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
let lottery = "";
let cookiesArr = [],
  cookie = "",
  message;
if (process.env.JD_Lottery && process.env.JD_Lottery != "") {
  lottery = process.env.JD_Lottery.split("@");
}
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach(_0xe045x32 => {
    cookiesArr.push(jdCookieNode[_0xe045x32]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...jsonParse($.getdata("CookiesJD") || "[]").map(_0xe045x34 => {
    return _0xe045x34.cookie;
  })].filter(_0xe045x33 => {
    return !!_0xe045x33;
  });
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/bean/signIndex.action", {
      "open-url": "https://bean.m.jd.com/bean/signIndex.action"
    });
    return;
  }
  if (!lottery) {
    console.log("\n衰仔你好，衰仔你好！！！\n你不填写变量 JD_Lottery，\n是不是玩我呢！\n我很生气，拒接执行o(╥﹏╥)o");
    return;
  }
  for (let _0xe045x4a = 0; _0xe045x4a < cookiesArr.length; _0xe045x4a++) {
    if (cookiesArr[_0xe045x4a]) {
      cookie = cookiesArr[_0xe045x4a];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]);
      $.index = _0xe045x4a + 1;
      $.isLogin = true;
      $.nickName = "";
      message = "";
      UA = await getUa();
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action", {
          "open-url": "https://bean.m.jd.com/bean/signIndex.action"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      for (let _0xe045x4b = 0; _0xe045x4b < lottery.length; _0xe045x4b++) {
        $.configCode = lottery[_0xe045x4b];
        console.log("活动ID: " + $.configCode);
        await jdmodule();
      }
    }
  }
})().catch(_0xe045x35 => {
  $.log("", "❌ " + $.name + ", 失败! 原因: " + _0xe045x35 + "!", "");
}).finally(() => {
  $.done();
});
function showMsg() {
  return new Promise(_0xe045x50 => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    _0xe045x50();
  });
}
async function jdmodule() {
  let _0xe045x5c = 0;
  console.log("\n开始做任务：");
  do {
    await getinfo();
    $.hasFinish = true;
    await run();
    _0xe045x5c++;
  } while (!$.hasFinish && _0xe045x5c < 10);
  await getinfo();
  var _0xe045x5d = 1;
  if ($.chanceLeft >= 1) {
    console.log("\n开始抽奖");
  } else {
    console.log("\n没有抽奖机会了");
  }
  for (let _0xe045x5f = 0; _0xe045x5f < $.chanceLeft; _0xe045x5f++) {
    await join(_0xe045x5d);
    await $.wait(1500);
    _0xe045x5d++;
  }
}
async function run() {
  try {
    for (let _0xe045x83 of $.taskinfo) {
      if (_0xe045x83.hasFinish === true) {
        continue;
      }
      if (!_0xe045x83.taskItem) {
        continue;
      }
      if (_0xe045x83.taskName == "每日签到") {
        console.log(_0xe045x83.taskName + " => " + _0xe045x83.taskItem.itemName);
        await lotteryDrawDoTask(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
        await lotteryDrawGetReward(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
      }
      if (_0xe045x83.taskType == 3) {
        console.log(_0xe045x83.taskName + " => " + _0xe045x83.taskItem.itemName);
        await getinfo2(_0xe045x83.taskItem.itemLink);
        await $.wait(1000 * _0xe045x83.viewTime);
        await lotteryDrawDoTask(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
        await lotteryDrawGetReward(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
      }
      if (_0xe045x83.taskType == 4) {
        console.log(_0xe045x83.taskName + " => " + _0xe045x83.taskItem.itemName);
        await lotteryDrawDoTask(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
        await lotteryDrawGetReward(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
      }
      if (_0xe045x83.taskType == 2) {
        console.log(_0xe045x83.taskName + " => " + _0xe045x83.taskItem.itemName);
        await lotteryDrawDoTask(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
        await lotteryDrawGetReward(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
      }
      if (_0xe045x83.taskType == 17) {
        console.log(_0xe045x83.taskName + " => " + _0xe045x83.taskItem.itemName);
        await lotteryDrawDoTask(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
        await lotteryDrawGetReward(_0xe045x83.taskType, _0xe045x83.taskItem.itemId, _0xe045x83.id);
      }
      $.hasFinish = false;
    }
  } catch (_0x2bf360) {
    console.log(_0x2bf360);
  }
}
function getinfo() {
  body = {
    "configCode": $.configCode,
    "unionCardCode": ""
  };
  return new Promise(_0xe045x96 => {
    $.get({
      "url": "https://api.m.jd.com/api?client=iOS&clientVersion=11.1.4&appid=jdchoujiang_h5&t=" + new Date().getTime() + "&functionId=lotteryDrawGet&body=" + encodeURIComponent(JSON.stringify(body)),
      "headers": {
        "accept": "*/*",
        "content-type": "application/json",
        "Referer": "https://prodev.m.jd.com/mall/active/2Rkjx8aT5eKaQnUzn8dwcR6jNanj/index.html",
        "origin": "https://prodev.m.jd.com",
        "User-Agent": UA,
        "accept-language": "zh-Hans-CN;q=1",
        "cookie": cookie
      }
    }, async (_0xe045x9d, _0xe045x9e, _0xe045x9f) => {
      try {
        if (_0xe045x9d) {
          console.log("" + JSON.stringify(_0xe045x9d));
          console.log($.name + " getinfo请求失败，请检查网路重试");
        } else {
          _0xe045x9f = JSON.parse(_0xe045x9f);
          $.chanceLeft = _0xe045x9f.data.chanceLeft;
          if (_0xe045x9f.success == true) {
            $.taskinfo = _0xe045x9f.data.taskConfig;
          } else {
            console.log(_0xe045x9f.errorMessage);
          }
        }
      } catch (_0x134941) {
        $.logErr(_0x134941, _0xe045x9e);
      } finally {
        _0xe045x96();
      }
    });
  });
}
function join(_0xe045xa8) {
  body = {
    "configCode": $.configCode,
    "fp": randomWord(false, 32, 32),
    "eid": "RLSR65QBDK34CPNUE7YL77XYP62O45KK5ORAKCVN4WAHA42KQQUU5ZHTP2S4INMUMXPZZC7IAYFOHNV7COG44ZJNQA"
  };
  return new Promise(async _0xe045xb6 => {
    $.get({
      "url": "https://api.m.jd.com/api?client=iOS&clientVersion=11.1.4&appid=jdchoujiang_h5&t=" + new Date().getTime() + "&functionId=lotteryDrawJoin&body=" + encodeURIComponent(JSON.stringify(body)),
      "headers": {
        "accept": "*/*",
        "content-type": "application/json",
        "Referer": "https://prodev.m.jd.com/mall/active/2Rkjx8aT5eKaQnUzn8dwcR6jNanj/index.html",
        "origin": "https://prodev.m.jd.com",
        "User-Agent": UA,
        "accept-language": "zh-Hans-CN;q=1",
        "cookie": cookie
      }
    }, async (_0xe045xb7, _0xe045xb8, _0xe045xb9) => {
      try {
        if (_0xe045xb7) {
          console.log("" + JSON.stringify(_0xe045xb7));
          console.log("join请求失败，请检查网路重试");
        } else {
          _0xe045xb9 = JSON.parse(_0xe045xb9);
          if (_0xe045xb9.success == true) {
            if (_0xe045xb9.data.rewardName == null) {
              console.log("第" + _0xe045xa8 + "次获得: 空气");
            } else {
              console.log("第" + _0xe045xa8 + "次获得: " + _0xe045xb9.data.rewardName);
            }
          } else {
            console.log(_0xe045xb9.errorMessage);
          }
        }
      } catch (_0x52a380) {
        $.logErr(_0x52a380, _0xe045xb8);
      } finally {
        _0xe045xb6();
      }
    });
  });
}
function lotteryDrawDoTask(_0xe045xbe, _0xe045xbf, _0xe045xc0) {
  return new Promise(_0xe045xc6 => {
    let _0xe045xcc = taskPostUrl("lotteryDrawDoTask", "{\"configCode\":\"" + $.configCode + "\",\"taskType\":" + _0xe045xbe + ",\"itemId\":\"" + _0xe045xbf + "\",\"taskId\":" + _0xe045xc0 + ",\"babelChannel\":\"\"}");
    $.post(_0xe045xcc, async (_0xe045xcd, _0xe045xce, _0xe045xcf) => {
      try {
        if (_0xe045xcd) {
          console.log("" + JSON.stringify(_0xe045xcd));
          console.log("lotteryDrawDoTask 请求失败，请检查网路重试");
        } else {
          _0xe045xcf = JSON.parse(_0xe045xcf);
          if (_0xe045xcf.success == true) {} else {
            console.log(_0xe045xcf.errorMessage);
          }
        }
      } catch (_0x47a80b) {
        $.logErr(_0x47a80b, _0xe045xce);
      } finally {
        _0xe045xc6();
      }
    });
  });
}
function lotteryDrawGetReward(_0xe045xd2, _0xe045xd3, _0xe045xd4) {
  return new Promise(_0xe045xe0 => {
    let _0xe045xe2 = taskPostUrl("lotteryDrawGetReward", "{\"configCode\":\"" + $.configCode + "\",\"taskType\":" + _0xe045xd2 + ",\"itemId\":\"" + _0xe045xd3 + "\",\"taskId\":" + _0xe045xd4 + "}");
    $.post(_0xe045xe2, async (_0xe045xe3, _0xe045xe4, _0xe045xe5) => {
      try {
        if (_0xe045xe3) {
          console.log("" + JSON.stringify(_0xe045xe3));
          console.log("lotteryDrawGetReward 请求失败，请检查网路重试");
        } else {
          _0xe045xe5 = JSON.parse(_0xe045xe5);
          if (_0xe045xe5.success == true) {
            console.log("任务奖励领取成功");
          } else {
            console.log(_0xe045xe5.errorMessage);
          }
        }
      } catch (_0x24d1e7) {
        $.logErr(_0x24d1e7, _0xe045xe4);
      } finally {
        _0xe045xe0();
      }
    });
  });
}
function getinfo2(_0xe045xea) {
  return new Promise(_0xe045xec => {
    $.get({
      "url": _0xe045xea,
      "headers": {
        "Host": "pro.m.jd.com",
        "accept": "*/*",
        "content-type": "application/x-www-form-urlencoded",
        "referer": "",
        "User-Agent": UA,
        "accept-language": "zh-Hans-CN;q=1",
        "cookie": cookie
      }
    }, (_0xe045xf2, _0xe045xf3, _0xe045xf4) => {
      try {
        if (_0xe045xf2) {
          console.log("" + JSON.stringify(_0xe045xf2));
          console.log("getinfo2 API请求失败，请检查网路重试");
        }
      } catch (_0x3c2922) {
        $.logErr(_0x3c2922, _0xe045xf3);
      } finally {
        _0xe045xec(_0xe045xf4);
      }
    });
  });
}
function taskPostUrl(_0xe045xf6, _0xe045xf7) {
  return {
    "url": "https://api.m.jd.com/api?client=iOS&clientVersion=11.1.4&appid=jdchoujiang_h5&t=" + new Date().getTime() + "&functionId=" + _0xe045xf6 + "&body=" + encodeURIComponent(_0xe045xf7),
    "headers": {
      "accept": "*/*",
      "content-type": "application/json",
      "Referer": "https://prodev.m.jd.com/mall/active/2Rkjx8aT5eKaQnUzn8dwcR6jNanj/index.html",
      "origin": "https://prodev.m.jd.com",
      "User-Agent": UA,
      "accept-language": "zh-Hans-CN;q=1",
      "cookie": cookie
    }
  };
}
function safeGet(_0xe045xfc) {
  try {
    if (typeof JSON.parse(_0xe045xfc) == "object") {
      return true;
    }
  } catch (_0x1443f2) {
    console.log(_0x1443f2);
    console.log("京东服务器访问数据为空，请检查自身设备网络情况");
    return false;
  }
}
function jsonParse(_0xe045x101) {
  if (typeof _0xe045x101 == "string") {
    try {
      return JSON.parse(_0xe045x101);
    } catch (_0x41f67a) {
      console.log(_0x41f67a);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
async function getUa() {
  for (var _0xe045x113 = "", _0xe045x114 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", _0xe045x115 = 0; _0xe045x115 < 16; _0xe045x115++) {
    var _0xe045x116 = Math.round(Math.random() * (_0xe045x114.length - 1));
    _0xe045x113 += _0xe045x114.substring(_0xe045x116, _0xe045x116 + 1);
  }
  uuid = Buffer.from(_0xe045x113, "utf8").toString("base64");
  ep = encodeURIComponent(JSON.stringify({
    "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
    "ts": new Date().getTime(),
    "ridx": -1,
    "cipher": {
      "sv": "CJK=",
      "ad": uuid,
      "od": "CNKmCNKmCNKjCNKmCM0mCNKmBJKmCNKjCNKmCNKmCNKmCNKm",
      "ov": "Ctu=",
      "ud": uuid
    },
    "ciphertype": 5,
    "version": "1.2.0",
    "appname": "com.jd.jdlite"
  }));
  return "jdltapp;android;3.8.16;;;appBuild/2314;ef/1;ep/" + ep + ";Mozilla/5.0 (Linux; Android 10; WLZ-AN01 Build/HUAWEIWLZ-AN01; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/89.0.4389.72 MQQBrowser/6.2 TBS/045837 Mobile Safari/537.36";
}
function randomString(_0xe045x118) {
  _0xe045x118 = _0xe045x118 || 32;
  let _0xe045x11e = "abcdef0123456789",
    _0xe045x11f = _0xe045x11e.length,
    _0xe045x120 = "";
  for (i = 0; i < _0xe045x118; i++) {
    _0xe045x120 += _0xe045x11e.charAt(Math.floor(Math.random() * _0xe045x11f));
  }
  return _0xe045x120;
}
function randomWord(_0xe045x122, _0xe045x123, _0xe045x124) {
  var _0xe045x12e = "",
    _0xe045x12f = _0xe045x123,
    _0xe045x130 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
  if (_0xe045x122) {
    _0xe045x12f = Math.round(Math.random() * (_0xe045x124 - _0xe045x123)) + _0xe045x123;
  }
  for (var _0xe045x131 = 0; _0xe045x131 < _0xe045x12f; _0xe045x131++) {
    pos = Math.round(Math.random() * (_0xe045x130.length - 1));
    _0xe045x12e += _0xe045x130[pos];
  }
  return _0xe045x12e;
}
	
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
