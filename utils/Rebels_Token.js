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

const iliIiI = require("got"),
      II11iI = require("./Rebels_jdCommon");

let Il1i1l = null,
    Iil1ii = 29;

try {
  let II11I = parseInt(process.env.JD_ISV_TOKEN_CACHE_EXPIRE_MINUTES || "29");
  Iil1ii = II11I;
} catch {}

const lill1I = Iil1ii * 60 * 1000,
      Ii1ii1 = require("./cache/index"),
      Ilil11 = new Ii1ii1(lill1I, process.env.JD_ISV_TOKEN_CUSTOM_CACHE || __dirname + "/cache/token.json"),
      i1ii1 = (process.env.JD_ISV_TOKEN_LZKJ_PIN_FILTER || "").split("@"),
      il1ii = (process.env.JD_ISV_TOKEN_LZKJ_LOREAL_PIN_FILTER || "").split("@"),
      llI111 = (process.env.JD_ISV_TOKEN_CJHY_PIN_FILTER || "").split("@"),
      i1iIiI = process.env.JD_ISV_GLOBAL_PROXY === "true";

if (i1iIiI) try {
  require("global-agent/bootstrap");

  console.log("🌐 已启用全局代理");
} catch (il1i1) {
  console.log("❌ getToken 代理模块加载失败 ➜ " + il1i1.message);
}
const IlllI1 = process.env.JD_ISV_TOKEN_PROXY || "",
      I1il11 = process.env.JD_ISV_TOKEN_PROXY_API || "";
let lI1l11 = process.env.JD_ISV_TOKEN_PROXY_API_MAX || "1",
    II11l = 0,
    II11i = null,
    iI1Iii = null;

if ((IlllI1 || I1il11) && !i1iIiI) {
  try {
    II11i = require("hpagent").HttpsProxyAgent;
    IlllI1 && !I1il11 && (iI1Iii = new II11i({
      "keepAlive": true,
      "keepAliveMsecs": 1000,
      "maxSockets": 256,
      "maxFreeSockets": 256,
      "scheduling": "lifo",
      "proxy": IlllI1
    }));
    console.log("🧩 已启用 getToken 代理");
  } catch (lIIiIi) {
    console.log("❌ getToken 代理模块加载失败 ➜ " + lIIiIi.message);
  }

  try {
    lI1l11 = parseInt(lI1l11);
    (isNaN(lI1l11) || lI1l11 < 1) && (lI1l11 = 1);
  } catch {
    lI1l11 = 1;
  }
}

const liI1ii = process.env.JD_ISV_TOKEN_REDIS_CACHE_URL || "",
      lIIiIl = process.env.JD_ISV_TOKEN_REDIS_CACHE_KEY || "",
      iI1Iil = !(process.env.JD_ISV_TOKEN_REDIS_CACHE_SUBMIT === "false"),
      il1iI = /<pt_pin>/.test(lIIiIl);
let i1iIii = null;

if (liI1ii) {
  let liI1iI = null;

  try {
    liI1iI = require("redis");
  } catch (iI1Il1) {
    console.log("❌ getToken Redis模块加载失败 ➜ " + iI1Il1.message);
  }

  if (liI1iI) try {
    i1iIii = liI1iI.createClient({
      "url": liI1ii
    });
  } catch (i1iIl1) {
    console.log("❌ Redis 数据库连接异常 ➜ " + (i1iIl1.message || i1iIl1));
  }
}

async function i1iIil(i1lli1, llIlII, IIlII = true) {
  let i1iIlI = "";

  try {
    const llIIl1 = decodeURIComponent(II11iI.getCookieValue(i1lli1, "pt_pin"));

    if (llIIl1) {
      if (!Il1i1l) {
        const iii1i1 = module?.["parent"]?.["path"],
              IllIll = module?.["parent"]?.["filename"];
        Il1i1l = iii1i1 && IllIll ? IllIll.replace(iii1i1, "").replace(/\.js/g, "") : null;
      }

      if (IIlII) {
        let i1lllI = [];
        if (llIlII.includes("lzkj")) Il1i1l.startsWith("jd_lzkj_loreal") ? i1lllI = il1ii : i1lllI = i1ii1;else llIlII.includes("cjhy") && (i1lllI = llI111);
        if (i1lllI.length > 0 && (i1lllI.includes(llIIl1) || i1lllI.includes(encodeURIComponent(llIIl1)))) return console.log("已设置跳过运行该账号（全局屏蔽）"), "";
        i1iIlI = Ilil11.get(llIIl1) || "";
        if (i1iIlI) return i1iIlI;

        if (i1iIii) {
          try {
            await i1iIii.connect();
          } catch {}

          try {
            const l1i1II = encodeURIComponent(il1iI ? lIIiIl.replace(/<pt_pin>/g, llIIl1) : "" + lIIiIl + llIIl1);
            i1iIlI = await i1iIii.get(l1i1II);
            if (i1iIlI) return i1iIlI;
          } catch (ili111) {
            console.log("🚫 getToken Redis缓存异常 ➜ " + (ili111.message || ili111));
          }
        }
      }
    }

    const ill1Il = await II11iI.getSign("isvObfuscator", {
      "url": llIlII,
      "id": ""
    });

    if (!ill1Il) {
      return console.log("🚫 getToken 签名获取失败"), "";
    }

    const i1lll1 = II11iI.genUA(llIIl1),
          Ii1I1I = "https://api.m.jd.com/client.action?functionId=isvObfuscator";
    let l1i1Ii = {
      "headers": {
        "Host": "api.m.jd.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": i1lll1 || "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
        "Accept-Language": "zh-Hans-CN;q=1",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": i1lli1
      },
      "body": ill1Il,
      "timeout": IlllI1 || I1il11 ? 60000 : 30000
    };

    if ((IlllI1 || I1il11) && !i1iIiI) {
      const IllIli = await II11iI.getLoginStatus(i1lli1);

      if (!IllIli && typeof IllIli === "boolean") {
        return console.log("🚫 getToken 账号无效"), "";
      }

      if (I1il11) {
        II11l >= lI1l11 && (II11l = 0);

        if (II11l === 0) {
          iI1Iii = null;
          const iI1Ill = await liI1il(I1il11);
          if (iI1Ill) await llIlIl("http://" + iI1Ill);else return "";
        }
      }

      if (iI1Iii) l1i1Ii.agent = {
        "https": iI1Iii
      };else return "";
    }

    const l1iI1 = IlllI1 || I1il11 ? 3 : 1;
    let lliiI1 = 0,
        IiiI1 = null,
        lilII,
        IIIiI;

    while (lliiI1 < l1iI1) {
      if (IlllI1 || I1il11) II11l += 1;
      lilII = null;
      IIIiI = false;

      try {
        lilII = await iliIiI.post(Ii1I1I, l1i1Ii);
      } catch (i1llli) {
        if (i1llli?.["response"]) {
          i1llli = i1llli.response;
          if (typeof i1llli === "string" && i1llli.includes("Timeout awaiting 'request'")) IiiI1 = "请求超时，请检查网络重试", IIIiI = true;else {
            const i1llll = lilII?.["statusCode"];
            if (i1llll) IiiI1 = "Response code " + i1llll;else {
              IiiI1 = "" + (i1llli.message || i1llli);
            }
          }
        } else i1llli?.["response"]?.["body"] ? IiiI1 = "请求失败 " + i1llli.response.body + " " : IiiI1 = "请求失败 " + (i1llli || "") + " ";

        lliiI1++;
      }

      if (lilII?.["body"]) {
        try {
          const iI1111 = JSON.parse(lilII.body);

          if (iI1111.code === "0") {
            i1iIlI = iI1111.token;
            llIlIi(llIIl1, i1iIlI);

            if (i1iIii && iI1Iil) {
              try {
                await i1iIii.connect();
              } catch {}

              const I1I1lI = encodeURIComponent(il1iI ? lIIiIl.replace(/<pt_pin>/g, llIIl1) : "" + lIIiIl + llIIl1),
                    ii1il = i1iIlI,
                    l1iIlI = Math.floor((Date.now() + lill1I) / 1000);

              try {
                await i1iIii.set(I1I1lI, ii1il);
                await i1iIii.EXPIREAT(I1I1lI, l1iIlI);
              } catch (IIIlI1) {
                console.log("🚫 getToken Redis缓存失败 ➜ " + (IIIlI1.message || IIIlI1));
              }
            }
          } else {
            if (iI1111.code === "3" && iI1111.errcode === 264) console.log("🚫 getToken API响应异常 ➜ 账号无效");else {
              console.log("🚫 getToken API响应异常 ➜ " + JSON.stringify(iI1111));
            }
          }
        } catch (l1lli1) {
          console.log("🚫 getToken API响应处理异常 ➜ " + (l1lli1.message || l1lli1));
        }

        break;
      } else IiiI1 = "无响应数据", lliiI1++, IIIiI = true;

      if (I1il11 && IIIiI && !i1iIiI && lliiI1 < l1iI1) {
        const ii1l1i = await liI1il(I1il11);
        ii1l1i && (iI1Iii = null, II11l = 0, await llIlIl("http://" + ii1l1i));
      }
    }

    return lliiI1 >= l1iI1 && console.log("🚫 getToken API请求失败 ➜ " + IiiI1), i1iIlI;
  } catch (IIIil) {
    return console.log("🚫 getToken 在处理请求时遇到了错误"), console.log(IIIil), i1iIlI;
  } finally {
    if (i1iIii) try {
      await i1iIii.disconnect();
    } catch {}
  }
}

async function liI1il(I1I1l1) {
  let i1lIii = "";

  try {
    const iIi1i = I1I1l1;
    let l1iIll = {
      "timeout": 30000
    };
    const l1iIli = 1;
    let iIi1l = 0,
        i1lIlI = null,
        l1lliI;

    while (iIi1l < l1iIli) {
      l1lliI = null;

      try {
        l1lliI = await iliIiI.post(iIi1i, l1iIll);
      } catch (IIIlII) {
        if (IIIlII?.["response"]) {
          IIIlII = IIIlII.response;
          if (typeof IIIlII === "string" && IIIlII.includes("Timeout awaiting 'request'")) i1lIlI = "请求超时，请检查网络重试";else {
            const ili1Il = l1lliI?.["statusCode"];
            ili1Il ? i1lIlI = "Response code " + ili1Il : i1lIlI = "" + (IIIlII.message || IIIlII);
          }
        } else {
          if (IIIlII?.["response"]?.["body"]) i1lIlI = "请求失败 " + IIIlII.response.body + " ";else {
            i1lIlI = "请求失败 " + (IIIlII || "") + " ";
          }
        }

        iIi1l++;
      }

      if (l1lliI?.["body"]) {
        try {
          const Iilll1 = /\b(?:\d{1,3}\.){3}\d{1,3}(?::\d{1,5})?\b/;
          let ll11I = l1lliI.body;

          try {
            ll11I = JSON.parse(ll11I);

            if (ll11I.hasOwnProperty("data")) {
              let iIi1I = ll11I.data;

              if (Array.isArray(iIi1I) && iIi1I.length > 0) {
                iIi1I = iIi1I[0];
                if (iIi1I?.["ip"] && iIi1I?.["port"]) i1lIii = iIi1I.ip + ":" + iIi1I.port;else iIi1I?.["IP"] && iIi1I?.["Port"] ? i1lIii = iIi1I.IP + ":" + iIi1I.Port : i1lIlI = JSON.stringify(ll11I);
              } else iIi1I.hasOwnProperty("proxy_list") && Array.isArray(iIi1I.proxy_list) && iIi1I.proxy_list.length > 0 ? i1lIii = iIi1I.proxy_list[0] : i1lIlI = JSON.stringify(ll11I);

              i1lIii && !Iilll1.test(i1lIii) && (i1lIlI = JSON.stringify(ll11I), i1lIii = "");
            } else i1lIlI = JSON.stringify(ll11I);
          } catch {
            const llii1l = ll11I.match(Iilll1);

            if (llii1l) {
              i1lIii = llii1l[0];
            } else i1lIlI = ll11I;
          }

          return i1lIlI && console.log("🚫 getToken 提取代理地址失败 ➜ " + i1lIlI), i1lIii;
        } catch (iiIiII) {
          i1lIlI = iiIiII.message || iiIiII;
        }

        break;
      } else i1lIlI = "无响应数据", iIi1l++;
    }

    iIi1l >= l1iIli && console.log("🚫 getToken 提取代理地址失败 ➜ " + i1lIlI);
  } catch (Iili) {
    console.log("🚫 getToken 在处理请求代理API时遇到了错误");
    console.log(Iili);
  }

  return i1lIii;
}

function llIlIi(Iil1, ll11lI) {
  Ilil11.put(Iil1, ll11lI, lill1I);
}

async function llIlIl(llliI1) {
  II11i && (iI1Iii = new II11i({
    "keepAlive": true,
    "keepAliveMsecs": 1000,
    "maxSockets": 256,
    "maxFreeSockets": 256,
    "scheduling": "lifo",
    "proxy": llliI1
  }));
}

module.exports = i1iIil;