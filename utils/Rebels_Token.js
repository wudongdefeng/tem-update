/*
主要获取 isvObfuscator token值

获取签名，自定义使用方法如下

  - 请求 API 获取

    export JD_SIGN_API="" # 接口地址，例：http://127.0.0.1:3000/api/getSign，默认 'http://api.nolanstore.cc/sign'
    export JD_SIGN_API_BODY_FIELD="" # body参数字段名，默认 'body'
    export JD_SIGN_API_FUNCTIONID_FIELD="" # functionId参数字段名，默认 'fn'
    export JD_SIGN_API_METHOD="" # 请求方法，默认 'POST'，自定义仅支持 'GET'
    export JD_SIGN_API_CONTENT_TYPE="" # 请求头 'Content-Type'，默认 'application/json; charset=utf-8'，支持 'application/x-www-form-urlencoded' 格式
    JSON响应格式解析的字段目前仅支持 `body` `convertUrl` `convertUrlNew`

  - 本地自定义脚本生成

    如果存在本地签名生成脚本则会优先加载本地签名，具体规范如下：
    - 1. 需要将脚本命名为 Rebels_Sign.js 并存储在与 Rebels_Token 脚本同一目录下
    - 2. 调用函数名为 genSign 并且需要 export 导出
    - 3. 函数固定两个传参，分别是 functionId（函数id） 和 bodyParams（body参数对象）
    - 4. 函数需要返回含有 body、st、sign、sv 等关键字段的url参数形式的签名字符串

  不管通过何种途径获取签名，最终需要的签名形式为url参数格式且至少包含 `body` `st` `sv` `sign` 字段



new Env('Rebels_Token');
*/

const Rebels_0xcdb492 = require("path");

const Rebels_0x4400a1 = require("./Rebels_jdCommon");

let Rebels_0x1ac8b4 = null;
let Rebels_0x412d92 = 29;

try {
  let Rebels_0x4e4125 = parseInt(process.env.JD_ISV_TOKEN_CACHE_EXPIRE_MINUTES || "29");
  Rebels_0x412d92 = Rebels_0x4e4125;
} catch { }

const Rebels_0xa67ada = Rebels_0x412d92 * 60 * 1000;

const Rebels_0x2df960 = require("./cache/index");

const Rebels_0x2db769 = new Rebels_0x2df960(Rebels_0xa67ada, process.env.JD_ISV_TOKEN_CUSTOM_CACHE || __dirname + "/cache/token.json");
const Rebels_0x4d57fa = (process.env.JD_ISV_TOKEN_LZKJ_PIN_FILTER || "").split("@");
const Rebels_0x2de69b = (process.env.JD_ISV_TOKEN_LZKJ_NEW_PIN_FILTER || process.env.JD_ISV_TOKEN_LZKJ_LOREAL_PIN_FILTER || "").split("@");
const Rebels_0x42e7f8 = (process.env.JD_ISV_TOKEN_CJHY_PIN_FILTER || "").split("@");
let Rebels_0x2ef67f;
let Rebels_0x52507d;

try {
  const Rebels_0x2b50f5 = process.env.RS_ISV_TOKEN_PROXY_TUNNRL || process.env.JD_ISV_TOKEN_PROXY || "";

  if (Rebels_0x2b50f5) {
    const Rebels_0xda3ec7 = Rebels_0x4400a1._getProxyConfig(Rebels_0x2b50f5);

    if (Rebels_0xda3ec7) {
      Rebels_0x2ef67f = Rebels_0xda3ec7;
      console.log("\n===============启用 getToken 代理池代理===============\n");
    } else {
      console.log("❌ 提供的代理地址无效，跳过启用 getToken 代理池代理");
    }
  } else {
    const Rebels_0xc5337c = process.env.RS_ISV_TOKEN_PROXY_API || process.env.JD_ISV_TOKEN_PROXY_API || "";

    if (Rebels_0xc5337c) {
      const Rebels_0x2a6c25 = {
        api: null,
        proxyConfig: null,
        useLimit: null,
        timeLimit: null,
        fetchFailContinue: null,
        extractTimestamp: null,
        lastUseTimeStamp: null,
        usedTimes: null
      };
      Rebels_0x52507d = Rebels_0x2a6c25;
      Rebels_0x52507d.api = Rebels_0xc5337c;
      const Rebels_0x507170 = process.env.RS_ISV_TOKEN_PROXY_USE_LIMIT || process.env.JD_ISV_TOKEN_PROXY_API_MAX || "0";

      try {
        Rebels_0x52507d.useLimit = parseInt(Rebels_0x507170);
      } catch {
        Rebels_0x52507d.useLimit = 1;
      }

      const Rebels_0x4afec6 = process.env.RS_ISV_TOKEN_PROXY_TIME_LIMIT || "10000";

      try {
        Rebels_0x52507d.timeLimit = parseInt(Rebels_0x4afec6);
      } catch {
        Rebels_0x52507d.timeLimit = 10000;
      }

      Rebels_0x52507d.fetchFailContinue = (process.env.RS_ISV_TOKEN_PROXY_FETCH_FAIL_CONTINUE || "true") === "true";
      console.log("\n===============启用 getToken API代理===============\n");
    }
  }

  const Rebels_0xca635f = process.env.RS_ISV_TOKEN_GLOBAL_PROXY === "true";

  if (Rebels_0xca635f) {
    try {
      require("global-agent/bootstrap");

      console.log("\n===============启用 getToken 代理池代理===============\n");
    } catch (Rebels_0x33cb2d) {
      console.log("❌ getToken 代理模块加载失败 ➜ " + Rebels_0x33cb2d.message);
    }
  }
} catch { }

const Rebels_0x3ed061 = process.env.JD_ISV_TOKEN_REDIS_CACHE_URL || "";
const Rebels_0xdff559 = process.env.JD_ISV_TOKEN_REDIS_CACHE_KEY || "";
const Rebels_0x474d6e = !(process.env.JD_ISV_TOKEN_REDIS_CACHE_SUBMIT === "false");
const Rebels_0x2277e0 = /<pt_pin>/.test(Rebels_0xdff559);
let Rebels_0x410b86 = null;

if (Rebels_0x3ed061) {
  let Rebels_0x181e4a = null;

  try {
    Rebels_0x181e4a = require("redis");
  } catch (Rebels_0xa3a489) {
    console.log("❌ getToken Redis模块加载失败 ➜ " + Rebels_0xa3a489.message);
  }

  if (Rebels_0x181e4a) {
    try {
      const Rebels_0xf3abb3 = {
        url: Rebels_0x3ed061
      };
      Rebels_0x410b86 = Rebels_0x181e4a.createClient(Rebels_0xf3abb3);
    } catch (Rebels_0x3d38e6) {
      console.log("❌ Redis 数据库连接异常 ➜ " + (Rebels_0x3d38e6.message || Rebels_0x3d38e6));
    }
  }
}

async function Rebels_0xbf119c(_0x4c59f9, _0x5085bc, _0x3bcd29 = true) {
  let _0x8d2787 = "";

  try {
    const _0x5f315b = decodeURIComponent(Rebels_0x4400a1.getCookieValue(_0x4c59f9, "pt_pin"));

    if (_0x5f315b) {
      if (!Rebels_0x1ac8b4) {
        const _0x12461b = require.main.filename;
        Rebels_0x1ac8b4 = Rebels_0xcdb492.basename(_0x12461b, ".js");
      }

      if (_0x3bcd29) {
        let _0x3b79c7 = [];

        if (_0x5085bc.includes("lzkj")) {
          if (Rebels_0x1ac8b4.startsWith("jd_lzkj_")) {
            _0x3b79c7 = Rebels_0x2de69b;
          } else {
            _0x3b79c7 = Rebels_0x4d57fa;
          }
        } else {
          if (_0x5085bc.includes("cjhy")) {
            _0x3b79c7 = Rebels_0x42e7f8;
          }
        }

        if (_0x3b79c7.length > 0 && (_0x3b79c7.includes(_0x5f315b) || _0x3b79c7.includes(encodeURIComponent(_0x5f315b)))) {
          console.log("已设置跳过运行该账号（全局屏蔽）");
          return "";
        }

        _0x8d2787 = Rebels_0x2db769.get(_0x5f315b) || "";

        if (_0x8d2787) {
          return _0x8d2787;
        }

        if (Rebels_0x410b86) {
          try {
            await Rebels_0x410b86.connect();
          } catch { }

          try {
            const _0x3d859f = encodeURIComponent(Rebels_0x2277e0 ? Rebels_0xdff559.replace(/<pt_pin>/g, _0x5f315b) : "" + Rebels_0xdff559 + _0x5f315b);

            _0x8d2787 = await Rebels_0x410b86.get(_0x3d859f);

            if (_0x8d2787) {
              return _0x8d2787;
            }
          } catch (_0x270dbf) {
            console.log("🚫 getToken Redis缓存异常 ➜ " + (_0x270dbf.message || _0x270dbf));
          }
        }
      }
    }

    const _0x5454f8 = {
      url: _0x5085bc,
      id: ""
    };

    const _0x58a77b = await Rebels_0x4400a1.getSign("isvObfuscator", _0x5454f8);

    if (!_0x58a77b) {
      console.log("🚫 getToken 签名获取失败");
      return "";
    }

    let _0x1b9203 = null;
    let _0x25bd93 = false;

    if (Rebels_0x2ef67f || Rebels_0x52507d) {
      if (Rebels_0x2ef67f) {
        _0x1b9203 = Rebels_0x2ef67f;
      } else {
        if (Rebels_0x52507d) {
          if (Rebels_0x52507d.proxyConfig) {
            _0x1b9203 = Rebels_0x52507d.proxyConfig;
            _0x25bd93 = true;
          } else {
            const _0x5280e3 = await Rebels_0x4400a1.getProxyAddressWithApi(Rebels_0x52507d.api);

            const _0x5119d5 = Rebels_0x4400a1._getProxyConfig(_0x5280e3);

            if (_0x5119d5) {
              Rebels_0x52507d.extractTimestamp = Date.now();
              Rebels_0x52507d.usedTimes = 0;
              Rebels_0x52507d.proxyConfig = _0x5119d5;
              _0x1b9203 = _0x5119d5;
              _0x25bd93 = true;
            } else {
              if (!Rebels_0x52507d.fetchFailContinue) {
                console.log("🚫 getToken 请求错误 ➜ 获取动态代理地址失败，已设置跳过请求");
                return "";
              }
            }
          }
        }
      }
    }

    const _0x2ce9ba = {
      Host: "api.m.jd.com",
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": Rebels_0x4400a1.genUA(_0x5f315b) || "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
      "Accept-Language": "zh-Hans-CN;q=1",
      "Accept-Encoding": "gzip, deflate, br",
      "J-E-H": Rebels_0x4400a1.getJEH(),
      "J-E-C": Rebels_0x4400a1.getJEC(_0x5f315b),
      Cookie: _0x4c59f9
    };
    const _0xc205a6 = {
      url: "https://api.m.jd.com/client.action?functionId=isvObfuscator",
      method: "POST",
      headers: _0x2ce9ba,
      proxy: _0x1b9203,
      data: _0x58a77b,
      debug: false,
      timeout: 60000
    };
    const _0x4ed969 = 2;
    let _0x4d13d5 = 0;
    let _0xd78ae1 = null;

    while (_0x4d13d5 < _0x4ed969) {
      const _0x2530c9 = await Rebels_0x4400a1.request(_0xc205a6);

      if (_0x25bd93) {
        Rebels_0x52507d.lastUseTimeStamp = Date.now();
        Rebels_0x52507d.usedTimes++;

        const _0x2603e4 = Rebels_0x52507d.useLimit > 0 && Rebels_0x52507d.usedTimes >= Rebels_0x52507d.useLimit;

        const _0x34db48 = Rebels_0x52507d.timeLimit > 0 && Date.now() - Rebels_0x52507d.extractTimestamp >= Rebels_0x52507d.timeLimit;

        if (_0x2603e4 || _0x34db48) {
          Rebels_0x52507d.proxyConfig = null;
          Rebels_0x52507d.lastUseTimeStamp = null;
          Rebels_0x52507d.extractTimestamp = null;
          Rebels_0x52507d.usedTimes = 0;
        }
      }

      if (!_0x2530c9.success) {
        _0xd78ae1 = "❌ getToken 请求失败 ➜ " + _0x2530c9.error;
        _0x4d13d5++;
        continue;
      }

      if (!_0x2530c9.data) {
        _0xd78ae1 = "🚫 getToken 请求失败 ➜ 无响应数据";
        _0x4d13d5++;
        continue;
      }

      try {
        const _0x27c3ad = _0x2530c9.data || {};

        if (_0x27c3ad.code === "0") {
          _0x8d2787 = _0x27c3ad.token;
          Rebels_0x2db769.put(_0x5f315b, _0x8d2787, Rebels_0xa67ada);

          if (Rebels_0x410b86 && Rebels_0x474d6e) {
            try {
              await Rebels_0x410b86.connect();
            } catch { }

            const _0x2da27d = encodeURIComponent(Rebels_0x2277e0 ? Rebels_0xdff559.replace(/<pt_pin>/g, _0x5f315b) : "" + Rebels_0xdff559 + _0x5f315b);

            const _0x31974e = _0x8d2787;

            const _0x465093 = Math.floor((Date.now() + Rebels_0xa67ada) / 1000);

            try {
              await Rebels_0x410b86.set(_0x2da27d, _0x31974e);
              await Rebels_0x410b86.EXPIREAT(_0x2da27d, _0x465093);
            } catch (_0x47a888) {
              console.log("🚫 getToken Redis缓存失败 ➜ " + (_0x47a888.message || _0x47a888));
            }
          }
        } else {
          if (_0x27c3ad.code === "3" && _0x27c3ad.errcode === 264) {
            console.log("🚫 getToken 接口响应异常 ➜ 账号无效");
          } else {
            console.log("🚫 getToken 接口响应异常 ➜ " + JSON.stringify(_0x27c3ad));
          }
        }
      } catch (_0x27451a) {
        console.log("🚫 getToken 在处理接口响应时遇到了错误 ➜ " + (_0x27451a.message || _0x27451a));
      }

      break;
    }

    if (_0x4d13d5 >= _0x4ed969) {
      console.log(_0xd78ae1);
    }

    return _0x8d2787;
  } catch (_0x5264f5) {
    console.log("🚫 getToken 在处理请求时遇到了错误");
    console.log(_0x5264f5);
    return _0x8d2787;
  } finally {
    if (Rebels_0x410b86) {
      try {
        await Rebels_0x410b86.disconnect();
      } catch { }
    }
  }
}

module.exports = Rebels_0xbf119c;