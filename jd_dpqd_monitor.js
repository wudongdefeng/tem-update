/*
活动名称：常规店铺签到
活动链接：https://h5.m.jd.com/babelDiy/Zeus/2PAAf74aG3D61qvfKUM5dxUssJQ9/index.html?token=<token>
环境变量：jd_dpqd_monitor_token // 签到令牌，多个用英文逗号，@，&，换行分割

常规店铺签到脚本，默认做为监控使用，默认过滤垃圾奖品活动
默认缓存有效数据，然后进行签到

cron:1 1 1 1 *

*/
let lnrun = 0;

const $ = new Env('常规店铺签到监控')
const Rebels_0x5e557d = require("./jdCookie");

const Rebels_0x20f00c = require("./utils/Rebels_sendJDNotify");

const Rebels_0x196a43 = require("./utils/Rebels_jdCommon");

const {
  H5st
} = require("./utils/Rebels_H");

const Rebels_0x2b2691 = require("fs");

console.log("");
console.log("==========" + $.name + "变量说明==========");
console.log("jd_dpqd_monitor_token // 活动ID，多个用英文逗号分割");
console.log("==========" + $.name + "提示结束==========");
console.log("");
let Rebels_0x38b1fa = (process.env.jd_dpqd_monitor_token || "").split(/[,@&|\n]+/g).filter(Boolean);
let Rebels_0x51c4f9 = null;
const Rebels_0xab76ab = __dirname + "/rs_dpqd_monitor_token.json";
let Rebels_0x2ac1db = "";
let Rebels_0x49a493 = "jdapp;iPhone;12.4.1;;rn/a5e53b61-94a0-da77-7e2f-fda45564911e;M/5.0;appBuild/168960;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22DG%3D%3D%22%2C%22sv%22%3A%22CG%3D%3D%22%2C%22iad%22%3A%22%22%7D%2C%22ts%22%3A" + Date.now() + "%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 17_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
const Rebels_0x2d21e5 = Object.keys(Rebels_0x5e557d).map(_0x1cca57 => Rebels_0x5e557d[_0x1cca57]).filter(_0x45794a => _0x45794a);

if (!Rebels_0x2d21e5[0]) {
  $.msg($.name, "【提示】请先获取Cookie");
  process.exit(1);
}

!(async () => {
  await Rebels_0x1e6c6b();
  console.log("");

  if (!$.ValidToken) {
    console.log("⚠ 未发现满足签到规则的Token");
    return;
  }

  const _0x4901e3 = {
    title: $.name
  };
  Rebels_0x20f00c.config(_0x4901e3);

  for (let _0x29e4f2 = 0; _0x29e4f2 < Rebels_0x2d21e5.length; _0x29e4f2++) {
    $.index = _0x29e4f2 + 1;
    Rebels_0x2ac1db = Rebels_0x2d21e5[_0x29e4f2];
    Rebels_0x196a43.setCookie(Rebels_0x2ac1db);
    $.UserName = decodeURIComponent(Rebels_0x196a43.getCookieValue(Rebels_0x2ac1db, "pt_pin"));
    $.UA = Rebels_0x196a43.genUA($.UserName);
    $.message = Rebels_0x20f00c.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_task_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
    await Rebels_0x101def();
    Rebels_0x196a43.unsetCookie();

    if ($.runEnd) {
      break;
    }
  }
})().catch(_0x2b096f => $.logErr(_0x2b096f)).finally(() => $.done());

async function Rebels_0x1e6c6b() {
  try {
    if (Rebels_0x38b1fa.length > 0) {
      Rebels_0x38b1fa = [...new Set(Rebels_0x38b1fa.filter(_0x4251a2 => _0x4251a2 !== ""))];
    }

    if (Rebels_0x38b1fa.length <= 0) {
      console.log("⚠ 请先定义必要的环境变量后再运行脚本！");
      return;
    }

    const _0x53066d = {
      startTime: "",
      endTime: "",
      venderId: "",
      activityId: "",
      isValid: true,
      rules: []
    };
    Rebels_0x51c4f9 = new Map(Rebels_0x38b1fa.map(_0x522f56 => [_0x522f56, _0x53066d]));
    console.log("🏬 每次运行会缓存符合条件的Token,请自行查看");
    console.log("🏬 开始查询 " + Rebels_0x38b1fa.length + " 个店铺");
    console.log("");
    $.ValidToken = [];

    for (const _0x9bd509 of Rebels_0x38b1fa) {
      let _0x4a810a = true;
      $.timeStamp = Math.floor(Date.now() / 1000) + "000";
      $.token = _0x9bd509;
      $.getActivityInfo = "";
      await Rebels_0x544830("getActivityInfo");
      const _0x1627dd = $.getActivityInfo.venderId;
      const _0x542717 = $.getActivityInfo.id;
      const _0x198f72 = $.getActivityInfo.activityName;
      const _0x21f5fa = $.getActivityInfo.activityStatus;

      const _0x16c013 = $.getActivityInfo.continuePrizeRuleList || [];

      const _0x516a63 = $.getActivityInfo.startTime;
      const _0x193a99 = $.getActivityInfo.endTime;

      const _0x1a8ef7 = $.time("yyyy-MM-dd HH:mm", _0x516a63);

      const _0x80b377 = $.time("yyyy-MM-dd HH:mm", _0x193a99);

      const _0x4aa10d = Date.now();

      if (_0x516a63 && _0x4aa10d < _0x516a63) {
        console.log("[" + _0x9bd509 + "]：活动将在 " + _0x1a8ef7 + " 开始，晚点再来吧~");
        _0x4a810a = false;
      }

      if (_0x193a99 && _0x4aa10d > _0x193a99) {
        console.log("[" + _0x9bd509 + "]：活动已于 " + _0x80b377 + " 结束，下次早点来吧~");
        _0x4a810a = false;
      } else {
        if (_0x21f5fa === 3) {
          console.log("[" + _0x9bd509 + "]：活动已结束");
          _0x4a810a = false;
        }
      }

      let _0x5ee0ad = false;
      const _0x516734 = [];

      for (const _0x31e92b of _0x16c013) {
        const _0x510aed = _0x31e92b.level;

        const _0x169066 = _0x31e92b.prizeList || [];

        const _0x333aa8 = [];

        for (const _0x3c2148 of _0x169066) {
          let _0x272c40 = "";
          const _0x34daf3 = _0x3c2148.discount;
          const _0x15c0f0 = _0x3c2148.type;
          const _0x58f706 = _0x3c2148.number;
          const _0x3b8312 = _0x3c2148.status;

          const _0x496f1d = _0x3b8312 === 5;

          switch (_0x15c0f0) {
            case 1:
              _0x272c40 = "优惠券🗑️";
              break;

            case 4:
              _0x272c40 = _0x34daf3 + "京豆🐶";
              break;

            case 6:
              _0x272c40 = _0x34daf3 + "店铺积分🎟️";
              break;

            case 9:
              _0x272c40 = "实物🎁";
              break;

            case 10:
              _0x272c40 = _0x34daf3 + "元E卡🎁";
              break;

            case 14:
              _0x272c40 = _0x34daf3 / 100 + "元红包🧧";
              break;

            default:
              _0x272c40 = "未知奖品（" + _0x15c0f0 + "）";
          }

          if (![1, 6].includes(_0x15c0f0) && !_0x496f1d) {
            _0x5ee0ad = true;
          }

          _0x333aa8.push(_0x272c40 + "（共" + _0x58f706 + "份" + (_0x496f1d ? "，已发完" : "") + "）");
        }

        const _0x4663e6 = {
          days: _0x510aed,
          prize: _0x333aa8,
          havePrize: _0x5ee0ad
        };

        _0x516734.push(_0x4663e6);
      }

      if (_0x516734.length > 0) {
        console.log("【" + _0x198f72 + "】" + _0x9bd509 + "\n开始时间：" + _0x1a8ef7 + "\n结束时间：" + _0x80b377 + "\n" + _0x516734.map(_0x69b1bd => "连续签到" + _0x69b1bd.days + "天：" + _0x69b1bd.prize.join("，")).join("\n") + "\n");
      }

      if (!_0x5ee0ad) {
        _0x4a810a = false;
      }

      if (_0x4a810a) {
        console.log("[符合入库条件，进行缓存]\n");
        $.ValidToken.push(_0x9bd509);

        const _0x2490c2 = Rebels_0x51c4f9.get(_0x9bd509);

        if (_0x2490c2) {
          _0x2490c2.startTime = _0x1a8ef7;
          _0x2490c2.endTime = _0x80b377;
          _0x2490c2.venderId = _0x1627dd;
          _0x2490c2.activityId = _0x542717;
          _0x2490c2.isValid = _0x4a810a;
          _0x2490c2.rules = _0x516734;
          Rebels_0x51c4f9.set(_0x9bd509, _0x2490c2);
        }
      } else {
        console.log("[不符合入库条件，不进行缓存]\n");
        Rebels_0x51c4f9.delete(_0x9bd509);
      }
    }

    const _0x1106e1 = Object.fromEntries(Rebels_0x51c4f9);

    let _0x1a3ed6;

    try {
      const _0x6cfc08 = Rebels_0x2b2691.readFileSync(Rebels_0xab76ab, "utf8");

      _0x1a3ed6 = JSON.parse(_0x6cfc08);
    } catch (_0xa94da3) {
      _0x1a3ed6 = {};
    }

    Object.assign(_0x1a3ed6, _0x1106e1);
    Rebels_0x2b2691.writeFileSync(Rebels_0xab76ab, JSON.stringify(_0x1106e1, null, 2));
    console.log("缓存写入完毕，所在目录：");
    console.log(Rebels_0xab76ab);
  } catch (_0x4fe9f3) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x4fe9f3);
  }
}

async function Rebels_0x101def() {
  const _0x11df9c = await Rebels_0x196a43.getLoginStatus(Rebels_0x2ac1db);

  if (!_0x11df9c && typeof _0x11df9c === "boolean") {
    console.log("账号无效");
    return;
  }

  try {
    $.DaysMsg = "";

    for (let _0x3f110e = 0; _0x3f110e < $.ValidToken.length; _0x3f110e++) {
      $.token = $.ValidToken[_0x3f110e];

      const _0x20cba0 = Rebels_0x51c4f9.get($.token);

      if (!_0x20cba0) {
        return;
      }

      $.venderId = _0x20cba0.venderId || 0;
      $.activityId = _0x20cba0.activityId || 0;

      if (!$.venderId || !$.activityId) {
        return;
      }

      await Rebels_0x544830("getSignRecord");
      await $.wait(500);
      await Rebels_0x544830("signCollectGift");
    }
  } catch (_0x5ef683) {
    console.log("❌ 脚本运行遇到了错误\n" + _0x5ef683);
  }
}

async function Rebels_0x12ea85(_0x283fa0, _0x131247) {
  try {
    switch (_0x283fa0) {
      case "getActivityInfo":
        if (_0x131247.code === 200 && _0x131247.success === true && _0x131247.data) {
          $.getActivityInfo = _0x131247.data;
        } else {
          if (_0x131247.msg) {
            if (_0x131247.code === 402) {
              console.log($.token + " 活动已经结束了");
            } else {
              console.log($.token + " 活动信息获取失败");
            }
          } else {
            console.log("❓" + _0x283fa0 + " " + JSON.stringify(_0x131247));
          }
        }

        break;

      case "getSignRecord":
        if (_0x131247.code === 200 && _0x131247.success === true) {
          const _0x49d955 = _0x131247.data.days || 0;

          $.DaysMsg = "(签到[" + _0x49d955 + "]天)";
        } else {
          if (_0x131247.msg) {
            console.log(_0x131247.msg + "\n");
          } else {
            console.log(_0x283fa0 + " " + JSON.stringify(_0x131247) + "\n");
          }
        }

        break;

      case "signCollectGift":
        if (_0x131247.code === 200 && _0x131247.success === true) {
          let _0x11bb10 = [];

          for (const _0x2c1ca3 of _0x131247.data) {
            const _0x2ac318 = _0x2c1ca3.prizeList;

            for (const _0x160fa4 of _0x2ac318) {
              const _0x598317 = _0x160fa4.type;
              const _0x5302bc = _0x160fa4.discount;

              switch (_0x598317) {
                case 1:
                  _0x11bb10.push("优惠券🗑️");

                  break;

                case 4:
                  _0x11bb10.push(_0x5302bc + "京豆🐶");

                  break;

                case 6:
                  _0x11bb10.push(_0x5302bc + "店铺积分🎟️");

                  break;

                case 9:
                  _0x11bb10.push("实物🎁");

                  break;

                case 10:
                  _0x11bb10.push(_0x5302bc + "元E卡🎁");

                  break;

                case 14:
                  _0x11bb10.push(_0x5302bc / 100 + "元红包🧧");

                  break;

                default:
                  _0x11bb10.push("未知奖品（" + _0x598317 + "）");

              }
            }
          }

          if (_0x11bb10.length) {
            console.log("[" + $.token + "]：签到成功," + _0x11bb10.join(", "));
          } else {
            console.log("[" + $.token + "]：签到成功");
          }
        } else {
          if (_0x131247.msg) {
            const _0x3bef95 = _0x131247.msg;
            let _0x2cd91e = _0x3bef95;

            switch (_0x3bef95) {
              case "对不起，你已经参加过该活动啦，去看看别的吧！":
                _0x2cd91e = "今日已签" + $.DaysMsg;
                break;

              case "errCode:405000001, errMessage:对不起，当前领奖失败，请稍后再试！":
                _0x2cd91e = "黑号,领取不到奖励";
                break;
            }

            console.log("[" + $.token + "] ➜ 签到失败," + _0x2cd91e);
          } else {
            console.log("[" + $.token + "]：签到失败 ➜ " + _0x283fa0 + " " + JSON.stringify(_0x131247) + "\n");
          }
        }

        break;
    }
  } catch (_0x3b0bf2) {
    console.log("❌ 未能正确处理 " + _0x283fa0 + " 请求响应 " + (_0x3b0bf2.message || _0x3b0bf2));
  }
}

async function Rebels_0x544830(_0x496a8c) {
  if ($.runEnd) {
    return;
  }

  let _0x5c694e = "",
      _0x1564a1 = null,
      _0x193fcc = null,
      _0x4a0e94 = "GET",
      _0x39bec8 = {},
      _0x2de75d = {};

  switch (_0x496a8c) {
    case "getActivityInfo":
      const _0x573b4e = {
        token: $.token,
        venderId: parseInt($.venderId) || ""
      };
      const _0x3c6b10 = {
        appId: "4da33",
        functionId: "interact_center_shopSign_getActivityInfo",
        appid: "interCenter_shopSign",
        body: _0x573b4e,
        version: "4.4",
        ua: Rebels_0x49a493
      };
      _0x2de75d = _0x3c6b10;
      _0x39bec8 = await H5st.getH5st(_0x2de75d);
      _0x5c694e = "https://api.m.jd.com/api";
      const _0x4cc455 = {
        jsonp: "jsonp1003"
      };
      _0x193fcc = Object.assign({}, _0x39bec8.paramsData, _0x4cc455);
      break;

    case "getSignRecord":
      _0x5c694e = "https://api.m.jd.com/api";
      const _0x3540c7 = {
        token: $.token,
        venderId: parseInt($.venderId) || "",
        activityId: parseInt($.activityId) || "",
        type: 56
      };
      const _0x3af621 = {
        appid: "interCenter_shopSign",
        functionId: "interact_center_shopSign_getSignRecord",
        body: JSON.stringify(_0x3540c7),
        jsonp: "jsonp1001"
      };
      _0x193fcc = _0x3af621;
      break;

    case "getExporseSku":
      const _0x5895a2 = {
        token: $.token,
        activityId: parseInt($.activityId) || "",
        venderId: parseInt($.venderId) || "",
        pageNumber: 1,
        pageSize: 20
      };
      const _0x464290 = {
        appId: "4da33",
        functionId: "interact_center_shopSign_getExporseSku",
        appid: "interCenter_shopSign",
        body: _0x5895a2,
        version: "4.4",
        ua: $.UA
      };
      _0x2de75d = _0x464290;
      _0x39bec8 = await H5st.getH5st(_0x2de75d);
      _0x5c694e = "https://api.m.jd.com/api";
      const _0x9f3d97 = {
        jsonp: "jsonp1003"
      };
      _0x193fcc = Object.assign({}, _0x39bec8.paramsData, _0x9f3d97);
      break;

    case "signCollectGift":
      const _0x417f7e = {
        token: $.token,
        venderId: parseInt($.venderId) || "",
        activityId: parseInt($.activityId) || "",
        type: 56,
        actionType: 7
      };
      const _0x59616d = {
        appId: "4da33",
        functionId: "interact_center_shopSign_signCollectGift",
        appid: "interCenter_shopSign",
        body: _0x417f7e,
        version: "4.4",
        ua: $.UA
      };
      _0x2de75d = _0x59616d;
      _0x39bec8 = await H5st.getH5st(_0x2de75d);
      _0x5c694e = "https://api.m.jd.com/api";
      const _0x10428c = {
        jsonp: "jsonp1003"
      };
      _0x193fcc = Object.assign({}, _0x39bec8.paramsData, _0x10428c);
      break;

    default:
      console.log("❌ 未知请求 " + _0x496a8c);
      return;
  }

  const _0x51b16c = {
    t: $.timeStamp,
    loginType: "2"
  };

  if (_0x193fcc) {
    Object.assign(_0x193fcc, _0x51b16c);
  }

  const _0x4ad1de = {
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
    "User-Agent": $.UA,
    Cookie: Rebels_0x2ac1db
  };
  const _0x281a8d = {
    url: _0x5c694e,
    method: _0x4a0e94,
    headers: _0x4ad1de,
    params: _0x193fcc,
    data: _0x1564a1,
    timeout: 30000,
    httpsTlsOptions: ["getActivityInfo"].includes(_0x496a8c) ? Rebels_0x196a43.useAppTls() : null
  };
  delete _0x281a8d.data;
  delete _0x281a8d.headers["Content-Type"];

  if (_0x496a8c === "getActivityInfo") {
    delete _0x281a8d.Cookie;
    _0x281a8d.headers["User-Agent"] = Rebels_0x49a493;
  }

  const _0x5e09b5 = 10;
  let _0x2ce5af = 0;
  let _0x2dc2c3 = null;
  let _0x3bd750 = false;

  while (_0x2ce5af < _0x5e09b5) {
    if (_0x2ce5af > 0) {
      await $.wait(500);
    }

    const _0x287a4f = await Rebels_0x196a43.request(_0x281a8d);

    if (!_0x287a4f.success) {
      _0x2dc2c3 = "🚫 " + _0x496a8c + " 请求失败 ➜ " + _0x287a4f.error;
      _0x2ce5af++;
      continue;
    }

    if (!_0x287a4f.data) {
      _0x2dc2c3 = "🚫 " + _0x496a8c + " 请求失败 ➜ 无响应数据";
      _0x2ce5af++;
      continue;
    }

    await Rebels_0x12ea85(_0x496a8c, _0x287a4f.data);
    _0x3bd750 = false;
    break;
  }

  if (_0x2ce5af >= _0x5e09b5) {
    console.log(_0x2dc2c3);

    if (_0x3bd750) {
      $.outFlag = true;

      if ($.message) {
        $.message.fix(_0x2dc2c3);
      }
    }
  }
}
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
