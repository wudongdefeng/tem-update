/*
活动名称：批量店铺签到（活动查询）
活动链接：https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=<token>
环境变量：jd_dpqd_tokens // 活动令牌，多个用英文逗号，@，&，换行分割

查询活动信息主脚本，自动去重并过滤无效活动，默认过滤垃圾奖品活动
运行后会在本地目录生成缓存文件以用于签到脚本使用，IP限制严重请勿频繁运行

cron:1 1 1 1 * jd_dpqd_main.js

*/
let lnrun = 0;

const $ = new Env('批量店铺签到（活动查询）')
const Rebels_0x88281c = require("./utils/Rebels_jdCommon");

const {
  H5st
} = require("./utils/Rebels_H");

console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_dpqd_tokens // 活动ID，多个用英文逗号分割");
console.log("==========" + $.name + "提示结束==========");
console.log("");
let Rebels_0x17db1d = (process.env.jd_dpqd_tokens || "").split(/[,@&|\n]+/g).filter(Boolean);
let Rebels_0x1b4462 = null;
const Rebels_0x3297b3 = __dirname + "/rs_dpqd_tokens.json";
!(async () => {
  await Rebels_0x2fe1ea();
})().catch(_0x2c6f89 => $.logErr(_0x2c6f89)).finally(() => $.done());

async function Rebels_0x2fe1ea() {
  try {
    if (Rebels_0x17db1d.length > 0) {
      Rebels_0x17db1d = [...new Set(Rebels_0x17db1d.filter(_0x48e9fe => _0x48e9fe !== ""))];
    }

    if (Rebels_0x17db1d.length <= 0) {
      console.log("⚠ 请先定义必要的环境变量后再运行脚本！");
      return;
    }

    Rebels_0x1b4462 = new Map(Rebels_0x17db1d.map((_0x534f24, _0x4f3305) => [_0x534f24, {
      index: _0x4f3305 + 1,
      startTime: "",
      endTime: "",
      venderId: "",
      activityId: "",
      isValid: true,
      rules: []
    }]));
    console.log("⚠ 每次运行会覆盖之前的缓存文件，请注意备份！");
    console.log("🏬 开始查询 " + Rebels_0x17db1d.length + " 个店铺");
    const _0x454230 = [];
    console.log("");

    for (const _0x2f684f of Rebels_0x17db1d) {
      let _0x549c8b = true;
      $.timeStamp = Math.floor(Date.now() / 1000) + "000";
      $.token = _0x2f684f;
      let _0x561cc8 = 0;
      $.getActivityInfo = "";
      $.invalidAct = false;

      while (!$.getActivityInfo && _0x561cc8 < 5 && !$.invalidAct) {
        $.getActivityInfo = "";
        await Rebels_0x4b3da7("getActivityInfo");
        await $.wait(1000);
        _0x561cc8++;

        if (_0x561cc8 > 4) {
          console.log("" + $.TokenErrorMsg);
        }
      }

      const _0x174d60 = $.getActivityInfo.venderId;
      const _0x2cf5ab = $.getActivityInfo.id;
      const _0x404f74 = $.getActivityInfo.activityName;
      const _0x222715 = $.getActivityInfo.activityStatus;

      const _0x159fec = $.getActivityInfo.continuePrizeRuleList || [];

      const _0x56ba47 = $.getActivityInfo.startTime;
      const _0xdc3cae = $.getActivityInfo.endTime;

      const _0x2ac910 = $.time("yyyy-MM-dd HH:mm", _0x56ba47);

      const _0x2dba26 = $.time("yyyy-MM-dd HH:mm", _0xdc3cae);

      const _0x4ba829 = Date.now();

      if (_0x56ba47 && _0x4ba829 < _0x56ba47) {
        console.log("[" + _0x2f684f + "]：活动将在 " + _0x2ac910 + " 开始，晚点再来吧~");

        _0x454230.push(_0x2f684f);

        _0x549c8b = false;
      }

      if (_0xdc3cae && _0x4ba829 > _0xdc3cae) {
        console.log("[" + _0x2f684f + "]：活动已于 " + _0x2dba26 + " 结束，下次早点来吧~");

        _0x454230.push(_0x2f684f);

        _0x549c8b = false;
      } else {
        if (_0x222715 === 3) {
          console.log("[" + _0x2f684f + "]：活动已结束");

          _0x454230.push(_0x2f684f);

          _0x549c8b = false;
        }
      }

      let _0x115039 = false;
      const _0x30870a = [];

      for (const _0x31e57e of _0x159fec) {
        const _0x563d00 = _0x31e57e.level;

        const _0x27210b = _0x31e57e.prizeList || [];

        const _0x486c92 = [];

        for (const _0x225b07 of _0x27210b) {
          let _0x438c9f = "";
          const _0x1214c2 = _0x225b07.discount;
          const _0x3e4f75 = _0x225b07.type;
          const _0x4c2b77 = _0x225b07.number;
          const _0x39d017 = _0x225b07.status;

          const _0x3c9eff = _0x39d017 === 5;

          switch (_0x3e4f75) {
            case 1:
              _0x438c9f = "优惠券🗑️";
              break;

            case 4:
              _0x438c9f = _0x1214c2 + "京豆🐶";
              break;

            case 6:
              _0x438c9f = _0x1214c2 + "店铺积分🎟️";
              break;

            case 9:
              _0x438c9f = _0x486c92.interactPrizeSkuList[0].skuName + "🎁";
              break;

            case 10:
              _0x438c9f = _0x1214c2 + "元E卡🎁";
              break;

            case 14:
              _0x438c9f = _0x1214c2 / 100 + "元红包🧧";
              break;

            default:
              _0x438c9f = "未知奖品（" + _0x3e4f75 + "）";
          }

          if (![1, 6].includes(_0x3e4f75) && !_0x3c9eff) {
            _0x115039 = true;
          }

          _0x486c92.push(_0x438c9f + "（共" + _0x4c2b77 + "份" + (_0x3c9eff ? "，已发完" : "") + "）");
        }

        const _0x1d2b07 = {
          days: _0x563d00,
          prize: _0x486c92,
          havePrize: _0x115039
        };

        _0x30870a.push(_0x1d2b07);
      }

      if (_0x30870a.length > 0) {
        console.log("【" + _0x404f74 + "】" + _0x2f684f + "\n开始时间：" + _0x2ac910 + "\n结束时间：" + _0x2dba26 + "\n" + _0x30870a.map(_0x4c6c99 => "连续签到" + _0x4c6c99.days + "天：" + _0x4c6c99.prize.join("，")).join("\n") + "\n");
      }

      if (!_0x115039) {
        _0x454230.push(_0x2f684f);

        _0x549c8b = false;
      }

      const _0x4ae8c5 = Rebels_0x1b4462.get(_0x2f684f);

      _0x4ae8c5.startTime = _0x2ac910;
      _0x4ae8c5.endTime = _0x2dba26;
      _0x4ae8c5.venderId = _0x174d60;
      _0x4ae8c5.activityId = _0x2cf5ab;
      _0x4ae8c5.isValid = _0x549c8b;
      _0x4ae8c5.rules = _0x30870a;
      Rebels_0x1b4462.set(_0x2f684f, _0x4ae8c5);
    }

    if (_0x454230.length > 0) {
      console.log("建议移除的活动：\n");

      for (const _0x498a98 of _0x454230) {
        console.log(_0x498a98);
      }
    }

    const _0x17ade2 = Object.fromEntries(Rebels_0x1b4462);

    const _0x2a23c2 = require("fs");

    _0x2a23c2.writeFileSync(Rebels_0x3297b3, JSON.stringify(_0x17ade2, null, 2));

    console.log("缓存写入完毕，所在目录：");
    console.log(Rebels_0x3297b3);
  } catch (_0x34263) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x34263);
  }
}

async function Rebels_0x5bb278(_0x57c428, _0xbc7aba) {
  try {
    switch (_0x57c428) {
      case "getActivityInfo":
        if (_0xbc7aba.code === 200 && _0xbc7aba.success === true && _0xbc7aba.data) {
          $.getActivityInfo = _0xbc7aba.data;
        } else {
          if (_0xbc7aba.msg) {
            if (_0xbc7aba.code === 402) {
              console.log($.token + " 活动已经结束了");
            } else {
              console.log($.token + " 活动信息获取失败");
            }

            $.invalidAct = true;
          } else {
            console.log("❓" + _0x57c428 + " " + JSON.stringify(_0xbc7aba));
            $.invalidAct = true;
          }
        }

        break;
    }
  } catch (_0x5cd92c) {
    console.log("❌ 未能正确处理 " + _0x57c428 + " 请求响应 " + (_0x5cd92c.message || _0x5cd92c));
  }
}

async function Rebels_0x4b3da7(_0x57a988) {
  if ($.runEnd) {
    return;
  }

  let _0x7d49aa = "",
      _0x937d23 = null,
      _0x274f1e = null,
      _0x161540 = "GET",
      _0x339e83 = {},
      _0x1aac06 = {};

  switch (_0x57a988) {
    case "getActivityInfo":
      const _0x16a0b5 = {
        token: $.token,
        venderId: parseInt($.venderId) || ""
      };
      const _0x4f8715 = {
        appId: "4da33",
        functionId: "interact_center_shopSign_getActivityInfo",
        appid: "interCenter_shopSign",
        body: _0x16a0b5,
        version: "4.4",
        ua: $.UA
      };
      _0x1aac06 = _0x4f8715;
      _0x339e83 = await H5st.getH5st(_0x1aac06);
      _0x7d49aa = "https://api.m.jd.com/api";
      const _0x45ec53 = {
        jsonp: "jsonp1003"
      };
      _0x274f1e = Object.assign({}, _0x339e83.paramsData, _0x45ec53);
      break;

    default:
      console.log("❌ 未知请求 " + _0x57a988);
      return;
  }

  const _0x47e3d5 = {
    t: $.timeStamp,
    loginType: "2"
  };

  if (_0x274f1e) {
    Object.assign(_0x274f1e, _0x47e3d5);
  }

  const _0x53be66 = {
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
    Connection: "keep-alive",
    "Content-Type": "text/plain",
    Host: "api.m.jd.com",
    Referer: "https://h5.m.jd.com/",
    "Sec-Fetch-Dest": "script",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "jdapp;iPhone;12.4.1;;rn/a5e53b61-94a0-da77-7e2f-fda45564911e;M/5.0;appBuild/168960;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DG%3D%3D%22%2C%22sv%22%3A%22CG%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A" + Date.now() + "%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;"
  };
  const _0x1e8b58 = {
    url: _0x7d49aa,
    method: _0x161540,
    headers: _0x53be66,
    params: _0x274f1e,
    data: _0x937d23,
    timeout: 30000,
    httpsTlsOptions: Rebels_0x88281c.useAppTls()
  };
  delete _0x1e8b58.data;
  delete _0x1e8b58.headers["Content-Type"];
  const _0x77b28 = 1;
  let _0xae65cc = 0;
  let _0x2aeb82 = null;
  let _0x19d0a4 = null;

  while (_0xae65cc < _0x77b28) {
    if (_0xae65cc > 0) {
      await $.wait(2000);
    }

    const _0x5096e7 = await Rebels_0x88281c.request(_0x1e8b58);

    if (!_0x5096e7.success) {
      _0x19d0a4 = _0x5096e7.status;
      $.TokenErrorMsg = $.token + "：" + _0x19d0a4 + " 请更换IP或使用代理";
      _0x2aeb82 = "🚫 " + _0x57a988 + " 请求失败 ➜ " + _0x5096e7.error;
      _0xae65cc++;
      continue;
    }

    if (!_0x5096e7.data) {
      _0x2aeb82 = "🚫 " + _0x57a988 + " 请求失败 ➜ 无响应数据";
      _0xae65cc++;
      continue;
    }

    await Rebels_0x5bb278(_0x57a988, _0x5096e7.data);
    ipBlack = false;
    break;
  }

  if (_0xae65cc >= _0x77b28) {
    if (_0x19d0a4 !== 403) {
      console.log(_0x2aeb82);
    }
  }
}// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
