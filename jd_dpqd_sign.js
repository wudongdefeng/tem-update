/*
活动名称：批量店铺签到
活动链接：https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=<token>
环境变量：jd_dpqd_tokens // 活动令牌，多个用英文逗号，@，&，换行分割
        jd_dpqd_task_threads // 控制签到并发线程数（正整数），默认1
        jd_dpqd_account_threads // 控制账号并发线程数（正整数），默认1
        jd_dpqd_account_interval // 自定义运行间隔时长（整数，单位毫秒），默认0

此脚本为高并发签到本，需要读取主脚本生成的活动信息缓存，自动过滤无效活动
签到后如有奖品则自动到账，只打印签到结果，不打印中奖信息

cron:1 1 1 1 * jd_dpqd_sign.js
*/
let lnrun = 0;

const $ = new Env('批量店铺签到')
const Rebels_0x176630 = require("./jdCookie");

const Rebels_0x5cdaa2 = require("./utils/Rebels_jdCommon");

const {
  H5st
} = require("./utils/Rebels_H");

console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_dpqd_tokens // 活动ID，多个用英文逗号分割");
console.log("jd_dpqd_task_threads // 控制签到并发，默认1");
console.log("jd_dpqd_account_threads // 控制账号并发，默认1");
console.log("jd_dpqd_account_interval // 自定义运行间隔时长");
console.log("==========" + $.name + "提示结束==========");
console.log("");
let Rebels_0x14debf = (process.env.jd_dpqd_tokens || "").split(/[,@&|\n]+/g).filter(Boolean);
let Rebels_0x436f80 = process.env.jd_dpqd_task_threads || "1";
let Rebels_0x20f7be = process.env.jd_dpqd_account_threads || "1";
const Rebels_0x3d59ba = process.env.jd_dpqd_account_interval || "";
let Rebels_0x4def9a = null;
const Rebels_0x35dd5a = __dirname + "/rs_dpqd_tokens.json";
const Rebels_0x58e859 = Object.keys(Rebels_0x176630).map(_0x566885 => Rebels_0x176630[_0x566885]).filter(_0x43dc4c => _0x43dc4c);

if (!Rebels_0x58e859[0]) {
  $.msg($.name, "【提示】请先获取Cookie");
  process.exit(1);
}

!(async () => {
  try {
    if (Rebels_0x14debf.length > 0) {
      Rebels_0x14debf = [...new Set(Rebels_0x14debf.filter(_0x1e742a => _0x1e742a !== ""))];
    }

    if (Rebels_0x14debf.length <= 0) {
      console.log("⚠ 请先定义必要的环境变量后再运行脚本！");
      return;
    }

    const _0x487edf = require("fs");

    if (_0x487edf.existsSync(Rebels_0x35dd5a)) {
      const _0xa2d4e4 = _0x487edf.readFileSync(Rebels_0x35dd5a, "utf-8");

      const _0x3b03b2 = JSON.parse(_0xa2d4e4);

      Rebels_0x4def9a = new Map();

      for (const _0x2e046c in _0x3b03b2) {
        Rebels_0x4def9a.set(_0x2e046c, _0x3b03b2[_0x2e046c]);
      }
    } else {
      console.log("⚠ 请先运行主脚本获取活动信息缓存后再运行此脚本！");
      return;
    }

    $.waitTime = null;

    if (Rebels_0x3d59ba) {
      try {
        const _0x3fd144 = parseInt(Rebels_0x3d59ba);

        if (_0x3fd144 > 0) {
          $.waitTime = _0x3fd144;
        }
      } catch {
        console.log("⚠ 自定义运行间隔时长设置错误");
      }
    }

    try {
      const _0x16ec4a = parseInt(Rebels_0x436f80);

      if (_0x16ec4a > 0 && _0x16ec4a !== 1) {
        Rebels_0x436f80 = _0x16ec4a;
      }
    } catch {
      Rebels_0x436f80 = 1;
    }

    try {
      const _0x1055d0 = parseInt(Rebels_0x20f7be);

      if (_0x1055d0 > 0 && _0x1055d0 !== 1) {
        Rebels_0x20f7be = _0x1055d0;
      }
    } catch {
      Rebels_0x20f7be = 1;
    }

    console.log("🏬 开始签到 " + Rebels_0x14debf.length + " 个店铺");
    await Rebels_0x5cdaa2.concTask(Rebels_0x20f7be, Rebels_0x58e859, async (_0x37b86b, _0x3453e8) => {
      await Rebels_0x5c58d6(Rebels_0x436f80, Rebels_0x14debf, _0x37b86b, _0x3453e8, Rebels_0x185641);

      if ($.waitTime) {
        $.wait($.waitTime);
      }
    });
  } catch (_0x129352) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x129352);
  }
})().catch(_0x1d2bc3 => $.logErr(_0x1d2bc3)).finally(() => $.done());

async function Rebels_0x185641(_0x2637f5, _0x44ce24) {
  const {
    title,
    UA,
    cookie
  } = _0x44ce24;

  const _0x3879b1 = Rebels_0x4def9a.get(_0x2637f5);

  if (!_0x3879b1) {
    return;
  }

  const _0x2a6af2 = Math.floor(Date.now() / 1000) + "000";

  const {
    venderId,
    activityId
  } = _0x3879b1;

  if (!venderId || !activityId) {
    return;
  }

  await _0x5b8e24("signCollectGift");

  if ($.waitTime) {
    $.wait($.waitTime);
  }

  async function _0x17e46e(_0x4d01eb, _0xeb77c) {
    try {
      switch (_0x4d01eb) {
        case "signCollectGift":
          if (_0xeb77c.code === 200 && _0xeb77c.success === true) {
            console.log("" + title + _0x2637f5 + " ➜ 签到成功");
          } else {
            if (_0xeb77c.msg) {
              const _0x568a3f = _0xeb77c.msg;
              let _0x1b6d9b = _0x568a3f;

              switch (_0x568a3f) {
                case "对不起，你已经参加过该活动啦，去看看别的吧！":
                  _0x1b6d9b = "今日已签";
                  break;
              }

              console.log("" + title + _0x2637f5 + " ➜ 签到失败（" + _0x1b6d9b + "）");
            } else {
              console.log("" + title + _0x2637f5 + " ➜ 签到失败 - " + JSON.stringify(_0xeb77c));
            }
          }

          break;
      }
    } catch (_0x228be9) {
      console.log("❌ 未能正确处理 " + _0x4d01eb + " 请求响应 " + (_0x228be9.message || _0x228be9));
    }
  }

  async function _0x5b8e24(_0x333ba2) {
    let _0x68cf8 = "",
        _0x51de4f = null,
        _0x321c05 = null,
        _0x5740b1 = "GET",
        _0x229636 = {},
        _0x188c95 = {};

    switch (_0x333ba2) {
      case "signCollectGift":
        const _0x3faf0f = {
          token: _0x2637f5,
          venderId: parseInt(venderId) || "",
          activityId: parseInt(activityId) || "",
          type: 56,
          actionType: 7
        };
        const _0x2aec5a = {
          appId: "4da33",
          functionId: "interact_center_shopSign_signCollectGift",
          appid: "interCenter_shopSign",
          body: _0x3faf0f,
          version: "4.4",
          ua: UA
        };
        _0x188c95 = _0x2aec5a;
        _0x229636 = await H5st.getH5st(_0x188c95);
        _0x68cf8 = "https://api.m.jd.com/api";
        const _0x2fecc3 = {
          jsonp: "jsonp1003"
        };
        _0x321c05 = Object.assign({}, _0x229636.paramsData, _0x2fecc3);
        break;
    }

    const _0x5b256b = {};
    _0x5b256b.t = _0x2a6af2;
    _0x5b256b.loginType = "2";
    const _0x4e4301 = _0x5b256b;

    if (_0x321c05) {
      Object.assign(_0x321c05, _0x4e4301);
    }

    const _0x165f6e = {};
    _0x165f6e.Accept = "*/*";
    _0x165f6e["Accept-Encoding"] = "gzip, deflate, br";
    _0x165f6e["Accept-Language"] = "zh-CN,zh-Hans;q=0.9";
    _0x165f6e.Connection = "keep-alive";
    _0x165f6e["Content-Type"] = "text/plain";
    _0x165f6e.Host = "api.m.jd.com";
    _0x165f6e.Referer = "https://h5.m.jd.com/";
    _0x165f6e["Sec-Fetch-Dest"] = "script";
    _0x165f6e["Sec-Fetch-Mode"] = "no-cors";
    _0x165f6e["Sec-Fetch-Site"] = "same-origin";
    _0x165f6e["User-Agent"] = UA;
    _0x165f6e.Cookie = cookie;
    const _0x23a0c5 = {};
    _0x23a0c5.url = _0x68cf8;
    _0x23a0c5.method = _0x5740b1;
    _0x23a0c5.headers = _0x165f6e;
    _0x23a0c5.params = _0x321c05;
    _0x23a0c5.data = _0x51de4f;
    _0x23a0c5.timeout = 30000;
    const _0x549b22 = _0x23a0c5;
    delete _0x549b22.data;
    delete _0x549b22.headers["Content-Type"];
    const _0x345589 = 3;
    let _0x4af68d = 0;
    let _0x132381 = null;
    let _0x206d25 = false;

    while (_0x4af68d < _0x345589) {
      const _0x23697c = await Rebels_0x5cdaa2.request(_0x549b22);

      if (!_0x23697c.success) {
        _0x132381 = "" + title + _0x2637f5 + " ➜ 请求失败（" + _0x23697c.error + "）🚫";
        _0x4af68d++;
        continue;
      }

      if (!_0x23697c.data) {
        _0x132381 = "" + title + _0x2637f5 + " ➜ 请求失败（无响应数据）🚫";
        _0x4af68d++;
        continue;
      }

      _0x17e46e(_0x333ba2, _0x23697c.data);

      _0x206d25 = false;
      break;
    }

    if (_0x4af68d >= _0x345589) {
      console.log(_0x132381);

      if (_0x206d25) {
        $.outFlag = true;
      }
    }
  }
}

async function Rebels_0x5c58d6(_0x1d282a = 1, _0x2fb787, _0x23913b, _0x117b4e, _0x29ce57) {
  const _0x47698e = _0x2fb787.map(_0x289e2b => _0x289e2b);

  const _0x154110 = decodeURIComponent(Rebels_0x5cdaa2.getCookieValue(_0x23913b, "pt_pin"));

  const _0x1bd037 = "【账号" + _0x117b4e + "】" + _0x154110 + "：";

  const _0x4dddc4 = {
    title: _0x1bd037,
    UA: Rebels_0x5cdaa2.genUA(_0x154110),
    cookie: _0x23913b,
    index: _0x117b4e
  };

  const _0x37ed23 = await Rebels_0x5cdaa2.getLoginStatus(_0x23913b);

  if (!_0x37ed23 && typeof _0x37ed23 === "boolean") {
    console.log(_0x1bd037 + "账号无效 🚫");
    return;
  }

  let _0x4cb029 = 0;

  async function _0x28f4e5(_0xab0d9e) {
    await _0x29ce57(_0xab0d9e, _0x4dddc4);
    _0x4cb029--;

    _0x2501d8();
  }

  async function _0x2501d8() {
    while (_0x4cb029 < _0x1d282a && _0x47698e.length > 0) {
      const _0x19b500 = _0x47698e.shift();

      _0x4cb029++;
      await _0x28f4e5(_0x19b500);
    }
  }

  const _0x58c445 = Math.min(_0x47698e.length, _0x1d282a);

  const _0x1c9ef2 = [];

  for (let _0x3943cd = 0; _0x3943cd < _0x58c445; _0x3943cd++) {
    const _0x1a3ffd = _0x47698e.shift();

    _0x4cb029++;

    _0x1c9ef2.push(_0x28f4e5(_0x1a3ffd));
  }

  await Promise.all(_0x1c9ef2);

  _0x2501d8();

  await new Promise(_0x32a8d7 => {
    const _0x568725 = setInterval(() => {
      if (_0x4cb029 === 0) {
        clearInterval(_0x568725);

        _0x32a8d7();
      }
    }, 100);
  });
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
