/*
new Env('getToken');
*/

const path = require('path')
const common = require('./jdCommon')

let scriptName = null,
    expireMinutes = 29;

try {
    let tmpMinutes = parseInt(process.env.JD_ISV_TOKEN_CACHE_EXPIRE_MINUTES || "29");
    expireMinutes = tmpMinutes;
} catch { }

const cacheDefaultTTL = expireMinutes * 60 * 1000,
    Cache = require("./cache/index"),
    cacheFile = new Cache(cacheDefaultTTL, process.env.JD_ISV_TOKEN_CUSTOM_CACHE || __dirname + "/cache/token.json"),
    lzkjPinFilter = (process.env.JD_ISV_TOKEN_LZKJ_PIN_FILTER || "").split("@"),
    lzkjNewPinFilter = (process.env.JD_ISV_TOKEN_LZKJ_NEW_PIN_FILTER || process.env.JD_ISV_TOKEN_LZKJ_LOREAL_PIN_FILTER || "").split("@"),
    cjhyPinFilter = (process.env.JD_ISV_TOKEN_CJHY_PIN_FILTER || "").split("@");

let requestAxiosProxyConfig, requestDynamicProxyConfig;

try {
    const proxyAddress = process.env.JD_ISV_TOKEN_HTTP_PROXY || process.env.JD_ISV_TOKEN_PROXY || "";

    if (proxyAddress) {
        const proxyConfig = common._getProxyConfig(proxyAddress);

        proxyConfig ? (requestAxiosProxyConfig = proxyConfig, console.log("🌐 已启用 getToken 局部静态代理")) : console.log("❌ 提供的代理地址无效，跳过启用 getToken 局部静态代理");
    } else {
        const proxyApi = process.env.JD_ISV_TOKEN_HTTP_DYNAMIC_PROXY_API || process.env.JD_ISV_TOKEN_PROXY_API || "";

        if (proxyApi) {
            requestDynamicProxyConfig = {
                "api": null,
                "proxyConfig": null,
                "useLimit": null,
                "timeLimit": null,
                "fetchFailContinue": null,
                "extractTimestamp": null,
                "lastUseTimeStamp": null,
                "usedTimes": null
            };
            requestDynamicProxyConfig.api = proxyApi;
            const useLimit = process.env.JD_ISV_TOKEN_HTTP_DYNAMIC_PROXY_USE_LIMIT || process.env.JD_ISV_TOKEN_PROXY_API_MAX || "1";

            try {
                requestDynamicProxyConfig.useLimit = parseInt(useLimit);
            } catch {
                requestDynamicProxyConfig.useLimit = 1;
            }

            const timeLimit = process.env.JD_ISV_TOKEN_HTTP_DYNAMIC_PROXY_TIME_LIMIT || "30000";

            try {
                requestDynamicProxyConfig.timeLimit = parseInt(timeLimit);
            } catch {
                requestDynamicProxyConfig.timeLimit = 10000;
            }

            requestDynamicProxyConfig.fetchFailContinue = (process.env.JD_ISV_TOKEN_HTTP_DYNAMIC_PROXY_FETCH_FAIL_CONTINUE || "false") === "true";
            console.log("🌐 已启用 getToken 局部动态代理");
        }
    }

    const globalProxy = process.env.JD_ISV_GLOBAL_PROXY === "true";
    if (globalProxy) try {
        require("global-agent/bootstrap");

        console.log("🌐 已启用 global-agent 全局代理");
    } catch (IIlIi11l) {
        console.log("❌ getToken 代理模块加载失败 ➜ " + IIlIi11l.message);
    }
} catch { }

const redisUrl = process.env.JD_ISV_TOKEN_REDIS_CACHE_URL || "",
    redisKey = process.env.JD_ISV_TOKEN_REDIS_CACHE_KEY || "",
    redisSubmit = !(process.env.JD_ISV_TOKEN_REDIS_CACHE_SUBMIT === "false"),
    hasRedisKey = /<pt_pin>/.test(redisKey);
let redisClient = null;

if (redisUrl) {
    let redis = null;

    try {
        redis = require("redis");
    } catch (Il1I1) {
        console.log("❌ getToken Redis模块加载失败 ➜ " + Il1I1.message);
    }

    if (redis) try {
        redisClient = redis.createClient({
            "url": redisUrl
        });
    } catch (Ii11l11) {
        console.log("❌ Redis 数据库连接异常 ➜ " + (Ii11l11.message || Ii11l11));
    }
}

async function getToken(iIII1IIi, i1i1l11l, illlilIi = true) {
    let II1IIl1l = "";

    try {
        const II1l11il = decodeURIComponent(common.getCookieValue(iIII1IIi, "pt_pin"));

        if (II1l11il) {
            if (!scriptName) {
                const ilI1illi = require.main.filename;
                scriptName = path.basename(ilI1illi, ".js");
            }

            if (illlilIi) {
                let iI1ii11i = [];
                if (i1i1l11l.includes("lzkj")) scriptName.startsWith("jd_lzkj_") ? iI1ii11i = lzkjNewPinFilter : iI1ii11i = lzkjPinFilter; else {
                    if (i1i1l11l.includes("cjhy")) {
                        iI1ii11i = cjhyPinFilter;
                    }
                }

                if (iI1ii11i.length > 0 && (iI1ii11i.includes(II1l11il) || iI1ii11i.includes(encodeURIComponent(II1l11il)))) {
                    return console.log("已设置跳过运行该账号（全局屏蔽）"), "";
                }

                II1IIl1l = cacheFile.get(II1l11il) || "";
                if (II1IIl1l) return II1IIl1l;

                if (redisClient) {
                    try {
                        await redisClient.connect();
                    } catch { }

                    try {
                        const iiIIlI11 = encodeURIComponent(hasRedisKey ? redisKey.replace(/<pt_pin>/g, II1l11il) : "" + redisKey + II1l11il);
                        II1IIl1l = await redisClient.get(iiIIlI11);
                        if (II1IIl1l) return II1IIl1l;
                    } catch (II1i11Il) {
                        console.log("🚫 getToken Redis缓存异常 ➜ " + (II1i11Il.message || II1i11Il));
                    }
                }
            }
        }

        const iliiil11 = await common.getSign("isvObfuscator", {
            "url": i1i1l11l,
            "id": ""
        });
        if (!iliiil11) return console.log("🚫 getToken 签名获取失败"), "";
        let iI1IliIi = null,
            Illi11li = false;

        if (requestAxiosProxyConfig || requestDynamicProxyConfig) {
            if (requestAxiosProxyConfig) iI1IliIi = requestAxiosProxyConfig; else {
                if (requestDynamicProxyConfig) {
                    if (requestDynamicProxyConfig.proxyConfig) {
                        iI1IliIi = requestDynamicProxyConfig.proxyConfig;
                        Illi11li = true;
                    } else {
                        const IiiIIl1I = await common.getProxyAddressWithApi(requestDynamicProxyConfig.api),
                            IlliiIIi = common._getProxyConfig(IiiIIl1I);

                        if (IlliiIIi) {
                            requestDynamicProxyConfig.extractTimestamp = Date.now();
                            requestDynamicProxyConfig.usedTimes = 0;
                            requestDynamicProxyConfig.proxyConfig = IlliiIIi;
                            iI1IliIi = IlliiIIi;
                            Illi11li = true;
                        } else {
                            if (!requestDynamicProxyConfig.fetchFailContinue) {
                                return console.log("🚫 getToken 请求错误 ➜ 获取动态代理地址失败，已设置跳过请求"), "";
                            }
                        }
                    }
                }
            }
        }

        const l11iIII1 = {
            "url": "https://api.m.jd.com/client.action?functionId=isvObfuscator",
            "method": "POST",
            "headers": {
                "Host": "api.m.jd.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": common.genUA(II1l11il) || "JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)",
                "Accept-Language": "zh-Hans-CN;q=1",
                "Accept-Encoding": "gzip, deflate, br",
                "J-E-H": common.getJEH(),
                "J-E-C": common.getJEC(II1l11il),
                "Cookie": iIII1IIi
            },
            "proxy": iI1IliIi,
            "data": iliiil11,
            "debug": false,
            "timeout": 60000
        },
            iIlIII1 = 2;
        let lll11IIi = 0,
            lIl1Ili1 = null;

        while (lll11IIi < iIlIII1) {
            const Iii1lli = await common.request(l11iIII1);

            if (Illi11li) {
                requestDynamicProxyConfig.lastUseTimeStamp = Date.now();
                requestDynamicProxyConfig.usedTimes++;
                const I1lill1I = requestDynamicProxyConfig.useLimit > 0 && requestDynamicProxyConfig.usedTimes >= requestDynamicProxyConfig.useLimit,
                    I1lIiili = requestDynamicProxyConfig.timeLimit > 0 && Date.now() - requestDynamicProxyConfig.extractTimestamp >= requestDynamicProxyConfig.timeLimit;
                (I1lill1I || I1lIiili) && (requestDynamicProxyConfig.proxyConfig = null, requestDynamicProxyConfig.lastUseTimeStamp = null, requestDynamicProxyConfig.extractTimestamp = null, requestDynamicProxyConfig.usedTimes = 0);
            }

            if (!Iii1lli.success) {
                lIl1Ili1 = "❌ getToken 请求失败 ➜ " + Iii1lli.error;
                lll11IIi++;
                continue;
            }

            if (!Iii1lli.data) {
                lIl1Ili1 = "🚫 getToken 请求失败 ➜ 无响应数据";
                lll11IIi++;
                continue;
            }

            try {
                const iiIll1il = Iii1lli.data;

                if (iiIll1il.code === "0") {
                    II1IIl1l = iiIll1il.token;
                    cacheFile.put(II1l11il, II1IIl1l, cacheDefaultTTL);

                    if (redisClient && redisSubmit) {
                        try {
                            await redisClient.connect();
                        } catch { }

                        const liil1llI = encodeURIComponent(hasRedisKey ? redisKey.replace(/<pt_pin>/g, II1l11il) : "" + redisKey + II1l11il),
                            l1iI1I1 = II1IIl1l,
                            IlIlil11 = Math.floor((Date.now() + cacheDefaultTTL) / 1000);

                        try {
                            await redisClient.set(liil1llI, l1iI1I1);
                            await redisClient.EXPIREAT(liil1llI, IlIlil11);
                        } catch (iIil11Il) {
                            console.log("🚫 getToken Redis缓存失败 ➜ " + (iIil11Il.message || iIil11Il));
                        }
                    }
                } else iiIll1il.code === "3" && iiIll1il.errcode === 264 ? console.log("🚫 getToken 接口响应异常 ➜ 账号无效") : console.log("🚫 getToken 接口响应异常 ➜ " + JSON.stringify(iiIll1il));
            } catch (I11lII11) {
                console.log("🚫 getToken 在处理接口响应时遇到了错误 ➜ " + (I11lII11.message || I11lII11));
            }

            break;
        }

        return lll11IIi >= iIlIII1 && console.log(lIl1Ili1), II1IIl1l;
    } catch (lllIiII) {
        return console.log("🚫 getToken 在处理请求时遇到了错误"), console.log(lllIiII), II1IIl1l;
    } finally {
        if (redisClient) try {
            await redisClient.disconnect();
        } catch { }
    }
}

module.exports = getToken;