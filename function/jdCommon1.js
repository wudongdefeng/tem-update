/*
专用依赖库，必须存在，否则报错。
new Env('Rebels_jdCommon');
*/

const path = require("path"),
    https = require("https"),
    axios = require("axios").default,
    CryptoJS = require("crypto-js"),
    querystring = require("querystring");

class Common {
    constructor() {
        this._Cookie = "";
        this._UserAgent = "";
        this._UserAgentMap = new Map();
        this._appSignConfig = null;
        this._requestDebugMode = false;
        this._requestAxiosProxyConfig = null;
        this._requestDynamicProxyConfig = null;
        this._requestNoProxyList = [];
        this._latestAppVersionData = {
            "build": "169107",
            "version": "12.4.1"
        };
        this._latestIOSVersion = "17.4";
        this._appHttpsTlsOptions = {
            "secureProtocol": "TLSv1_2_method",
            "ciphers": ["TLS_GREASE 0x7a 0x7a", "TLS_AES_128_GCM_SHA256", "TLS_AES_256_GCM_SHA384", "TLS_CHACHA20_POLY1305_SHA256", "TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384", "TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256", "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256", "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384", "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256", "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256", "TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA", "TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA", "TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA", "TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA", "TLS_RSA_WITH_AES_256_GCM_SHA384", "TLS_RSA_WITH_AES_128_GCM_SHA256", "TLS_RSA_WITH_AES_256_CBC_SHA", "TLS_RSA_WITH_AES_128_CBC_SHA", "TLS_ECDHE_ECDSA_WITH_3DES_EDE_CBC_SHA", "TLS_ECDHE_RSA_WITH_3DES_EDE_CBC_SHA", "TLS_RSA_WITH_3DES_EDE_CBC_SHA", "TLS_ECDHE_ECDSA_AES256_GCM_SHA384", "TLS_ECDHE_RSA_AES256_GCM_SHA384", "TLS_DHE_RSA_AES256_GCM_SHA384", "TLS_ECDHE_ECDSA_CHACHA20_POLY1305", "TLS_ECDHE_RSA_CHACHA20_POLY1305", "TLS_DHE_RSA_CHACHA20_POLY1305", "TLS_ECDHE_ECDSA_AES128_GCM_SHA256", "TLS_ECDHE_RSA_AES128_GCM_SHA256", "TLS_DHE_RSA_AES128_GCM_SHA256", "TLS_ECDHE_ECDSA_AES256_SHA384", "TLS_ECDHE_RSA_AES256_SHA384", "TLS_DHE_RSA_AES256_SHA256", "TLS_ECDHE_ECDSA_AES128_SHA256", "TLS_ECDHE_RSA_AES128_SHA256", "TLS_DHE_RSA_AES128_SHA256", "TLS_RSA_PSK_AES256_GCM_SHA384", "TLS_DHE_PSK_AES256_GCM_SHA384", "TLS_RSA_PSK_CHACHA20_POLY1305", "TLS_DHE_PSK_CHACHA20_POLY1305", "TLS_ECDHE_PSK_CHACHA20_POLY1305", "TLS_AES256_GCM_SHA384", "TLS_PSK_AES256_GCM_SHA384", "TLS_PSK_CHACHA20_POLY1305", "TLS_RSA_PSK_AES128_GCM_SHA256", "TLS_DHE_PSK_AES128_GCM_SHA256", "TLS_AES128_GCM_SHA256", "TLS_PSK_AES128_GCM_SHA256", "TLS_AES256_SHA256", "TLS_AES128_SHA256"].join(":")
        };
        this._H5st = null;
        this._Table = null;
        this._HttpsProxyAgent = null;
        this._genSignModelPath = __dirname + "/genSign";
        this._jdCryptoModelPath = __dirname + "/jdCrypto";
        this._hasInitAppSignConfig = false;

        this._initRequestConfig();
    }

    ["_initRequestConfig"]() {
        try {
            const liiIllIi = require.main.filename,
                ii1I1il1 = path.basename(liiIllIi, ".js");
            this._requestNoProxyList = (process.env[ii1I1il1 + "_no_proxy"] || process.env.JD_COMMON_REQUEST_NO_PROXY || "").split(",").filter(ll1ii11l => ll1ii11l !== "");
            const i1I1II1I = process.env[ii1I1il1 + "_http_proxy"] || process.env.JD_COMMON_REQUEST_HTTP_PROXY || "";

            if (i1I1II1I) {
                const liliiiI = this._getProxyConfig(i1I1II1I);

                liliiiI ? (this._requestAxiosProxyConfig = liliiiI, console.log("🌐 已启用全局静态代理")) : console.log("❌ 提供的代理地址无效，跳过启用全局静态代理");
            } else {
                const illiI1iI = process.env[ii1I1il1 + "_http_dynamic_proxy_api"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_API || "";

                if (illiI1iI) {
                    this._requestDynamicProxyConfig = {
                        "api": null,
                        "proxyConfig": null,
                        "useLimit": null,
                        "timeLimit": null,
                        "fetchFailContinue": null,
                        "extractTimestamp": null,
                        "lastUseTimeStamp": null,
                        "usedTimes": null
                    };
                    this._requestDynamicProxyConfig.api = illiI1iI;
                    const I1l111II = process.env[ii1I1il1 + "_http_dynamic_proxy_use_limit"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_USE_LIMIT || "1";

                    try {
                        this._requestDynamicProxyConfig.useLimit = parseInt(I1l111II);
                    } catch {
                        this._requestDynamicProxyConfig.useLimit = 1;
                    }

                    const ll1IIII1 = process.env[ii1I1il1 + "_http_dynamic_proxy_time_limit"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_TIME_LIMIT || "30000";

                    try {
                        this._requestDynamicProxyConfig.timeLimit = parseInt(ll1IIII1);
                    } catch {
                        this._requestDynamicProxyConfig.timeLimit = 10000;
                    }

                    this._requestDynamicProxyConfig.fetchFailContinue = (process.env[ii1I1il1 + "_http_dynamic_proxy_fetch_fail_continue"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_FETCH_FAIL_CONTINUE || "false") === "true";
                    console.log("🌐 已启用全局动态代理");
                }
            }
        } catch (liIil1) {
            console.log("❌ 初始化 HTTP 请求配置时遇到了错误\n" + liIil1);
        }
    }

    ["_initAppSignConfig"]() {
        this._appSignConfig = {
            "requestApi": process.env.JD_SIGN_API || "http://api.nolanstore.cc/sign",
            "bodyField": process.env.JD_SIGN_API_BODY_FIELD || "body",
            "functionIdField": process.env.JD_SIGN_API_FUNCTIONID_FIELD || "fn",
            "requestMethod": null,
            "requestContentType": null,
            "genSign": null
        };

        try {
            const ii11Iil1 = process.env.JD_SIGN_API_METHOD;
            if (ii11Iil1 && ii11Iil1.toUpperCase() === "GET") this._appSignConfig.requestMethod = "GET"; else {
                this._appSignConfig.requestMethod = "POST";
            }
        } catch { }

        try {
            const Ii1iIiII = process.env.JD_SIGN_API_CONTENT_TYPE;
            Ii1iIiII && Ii1iIiII.indexOf("application/x-www-form-urlencoded") !== -1 ? this._appSignConfig.requestContentType = Ii1iIiII : this._appSignConfig.requestContentType = "application/json; charset=utf-8";
        } catch { }

        try {
            this._appSignConfig.genSign = require(this._genSignModelPath);
        } catch { }
    }

    ["genRandomString"](IiiiI1II = 32, I1iIlI1I = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-") {
        const lillIll = I1iIlI1I.length;
        let iI11ii1l = "";

        for (let l1ililli = 0; l1ililli < IiiiI1II; l1ililli++) {
            iI11ii1l += I1iIlI1I.charAt(Math.floor(Math.random() * lillIll));
        }

        return iI11ii1l;
    }

    ["parseUrl"](Iiiiii) {
        try {
            const lliilll1 = new URL(Iiiiii);
            return lliilll1;
        } catch (llIillIi) {
            return {};
        }
    }

    ["parseUrlParameter"](i1I1liIi) {
        try {
            const iIl1llI1 = {},
                i1Illi1I = this.parseUrl(i1I1liIi),
                IIi11i11 = new URLSearchParams(i1Illi1I?.["search"]);

            for (const [I1lI1Il1, l1lII11I] of IIi11i11) {
                iIl1llI1[I1lI1Il1] = l1lII11I;
            }

            if (i1Illi1I?.["hash"] && i1Illi1I.hash.includes("#/")) {
                const l1ll1i1I = i1Illi1I.hash.replace("#/", ""),
                    i1II1i1i = l1ll1i1I.includes("?") ? new URLSearchParams(l1ll1i1I.split("?").slice(1).join("?")) : new URLSearchParams();

                for (const [liiiiI11, li1111I1] of i1II1i1i) {
                    iIl1llI1[liiiiI11] = li1111I1;
                }
            }

            return iIl1llI1;
        } catch {
            return {};
        }
    }

    ["getUrlParameter"](I11IIIIl, iiI1i11i) {
        try {
            const I1l1i1I = this.parseUrl(I11IIIIl),
                Ili11I1I = I1l1i1I.searchParams.get(iiI1i11i);
            return Ili11I1I || "";
        } catch {
            return "";
        }
    }

    ["objectToQueryString"](illIliil) {
        try {
            const iiI1illI = [];

            for (const ilIllll in illIliil) {
                if (illIliil.hasOwnProperty(ilIllll)) {
                    const li1II1iI = illIliil[ilIllll],
                        liiIIlI = encodeURIComponent(ilIllll),
                        llI1IIi1 = li1II1iI === null || li1II1iI === undefined ? "" : encodeURIComponent(li1II1iI);
                    iiI1illI.push(liiIIlI + "=" + llI1IIi1);
                }
            }

            return iiI1illI.join("&");
        } catch {
            return "";
        }
    }

    ["queryStringToObject"](lli1l1iI) {
        try {
            const lIi111 = {},
                IiIIlIIi = lli1l1iI.split("&");

            for (const lil1Iil1 of IiIIlIIi) {
                const [iiIiI1ll, i1iiliii] = lil1Iil1.split("=");
                lIi111[decodeURIComponent(iiIiI1ll)] = i1iiliii === undefined ? null : decodeURIComponent(i1iiliii);
            }

            return lIi111;
        } catch {
            return {};
        }
    }

    ["getResponseCookie"](ililli11, l1ll11I1 = "") {
        let iIlI1iII = "";

        if (ililli11.headers["set-cookie"]) {
            for (let il1IiI1 of ililli11.headers["set-cookie"]) {
                iIlI1iII += il1IiI1.split(";")[0].split("=")[0] + "=" + il1IiI1.split(";")[0].split("=")[1] + "; ";
            }
        } else l1ll11I1 && (iIlI1iII = l1ll11I1);

        return iIlI1iII;
    }

    ["getCookieValue"](iiiiIII1, Ii1liI1) {
        if (!iiiiIII1 || !Ii1liI1) return "";
        const Il1iIliI = new RegExp(Ii1liI1 + "=" + "([^;]*)" + ";"),
            lIlIli11 = Il1iIliI.exec(iiiiIII1);
        return lIlIli11 && lIlIli11[1] || "";
    }

    ["parseCookie"](ii11ll11) {
        const il1IiIi1 = {},
            IIIIiIII = ii11ll11.split(";");

        for (const iiI1Iili of IIIIiIII) {
            const [II11lilI, l1I1ii1i] = iiI1Iili.trim().split("=");
            il1IiIi1[II11lilI] = l1I1ii1i;
        }

        return il1IiIi1;
    }

    ["getLatestIOSVersion"]() {
        return this._iOSVersionLatest || "";
    }

    async ["request"](I1IIlil1) {
        let Ii1lIi1l = {
            "success": false,
            "status": null,
            "data": null,
            "headers": null,
            "error": null,
            "connected": false
        },
            iIIilii1 = this._requestDebugMode,
            Ili11ii1 = null;

        try {
            if (!I1IIlil1 || !I1IIlil1.url) {
                return console.log("❌ 调用请求方法无效，缺少必要的参数！"), Ii1lIi1l.error = "缺少必要的请求参数", Ii1lIi1l;
            }

            I1IIlil1.hasOwnProperty("debug") && (iIIilii1 = I1IIlil1.debug, delete I1IIlil1.debug);
            const li1llli = this._requestAxiosProxyConfig,
                llI1lIlI = this._requestDynamicProxyConfig,
                liIll1ii = this._requestNoProxyList;
            Object.assign(axios.defaults, {
                "headers": {
                    "common": {
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                    }
                },
                "maxContentLength": Infinity,
                "maxBodyLength": Infinity,
                "maxRedirects": Infinity,
                "timeout": 60000,
                "transformResponse": [llIllil => {
                    try {
                        return JSON.parse(llIllil);
                    } catch { }

                    try {
                        const ll1I1i1l = /[\w$.]+\(\s*({[\s\S]*?})\s*\)\s*;?/;

                        if (ll1I1i1l.test(llIllil)) {
                            const IIil11Ii = llIllil.match(ll1I1i1l)[1];
                            return JSON.parse(IIil11Ii);
                        }
                    } catch { }

                    return llIllil;
                }]
            });
            I1IIlil1.body && (I1IIlil1.data = I1IIlil1.body, delete I1IIlil1.body);

            for (const iIllilil of ["data", "params"]) {
                !I1IIlil1[iIllilil] && delete I1IIlil1[iIllilil];
            }

            I1IIlil1.method = (I1IIlil1.method || "get").toLowerCase();

            if (I1IIlil1.proxy && typeof I1IIlil1.proxy === "string") {
                const l1lIllll = this._getProxyConfig(I1IIlil1.proxy);

                l1lIllll ? I1IIlil1.proxy = l1lIllll : (console.log("❌ 代理配置无效，跳过使用代理"), delete I1IIlil1.proxy);
            }

            I1IIlil1.data && typeof I1IIlil1.data === "object" && (!I1IIlil1.headers || !I1IIlil1.headers["Content-Type"] || I1IIlil1.headers["Content-Type"].includes("application/x-www-form-urlencoded")) && (I1IIlil1.data = querystring.stringify(I1IIlil1.data));

            if (I1IIlil1.httpsTlsOptions && typeof I1IIlil1.httpsTlsOptions === "object" && I1IIlil1.url.includes("https://")) {
                Ili11ii1 = I1IIlil1.httpsTlsOptions;
                Object.assign(https.globalAgent.options, Ili11ii1);
                delete I1IIlil1.httpsTlsOptions;
            } else I1IIlil1.hasOwnProperty("httpsTlsOptions") && delete I1IIlil1.httpsTlsOptions;

            let i1I1I1I1 = false;

            if (!I1IIlil1.hasOwnProperty("proxy") && !I1IIlil1.hasOwnProperty("httpAgent") && !I1IIlil1.hasOwnProperty("httpsAgent")) {
                if (li1llli || llI1lIlI) {
                    let IiiiiiiI = true;
                    const iI1lilii = this.parseUrl(I1IIlil1.url).hostname || I1IIlil1.url;

                    for (const lliliIii of liIll1ii) {
                        const I11liI1I = new RegExp("^" + lliliIii.split("*").join(".*") + "$");

                        if (I11liI1I.test(iI1lilii.hostname)) {
                            IiiiiiiI = false;

                            if (iIIilii1) {
                                console.log("ℹ️ 该代理请求命中 NO_PROXY 规则 ➜ " + lliliIii);
                            }

                            break;
                        }
                    }

                    if (IiiiiiiI) {
                        if (li1llli) I1IIlil1.proxy = li1llli; else {
                            if (llI1lIlI) {
                                if (llI1lIlI.proxyConfig) I1IIlil1.proxy = llI1lIlI.proxyConfig, i1I1I1I1 = true; else {
                                    const Ii1iIli = await this.getProxyAddressWithApi(llI1lIlI.api),
                                        IIIlilil = this._getProxyConfig(Ii1iIli);

                                    if (IIIlilil) Object.assign(llI1lIlI, {
                                        "extractTimestamp": Date.now(),
                                        "usedTimes": 0,
                                        "proxyConfig": IIIlilil
                                    }), I1IIlil1.proxy = IIIlilil, i1I1I1I1 = true; else {
                                        if (!llI1lIlI.fetchFailContinue) return Ii1lIi1l.error = "获取动态代理地址失败，已设置跳过请求", Ii1lIi1l;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            for (const lIIl11ll of ["proxy", "httpAgent", "httpsAgent"]) {
                !I1IIlil1[lIIl11ll] && delete I1IIlil1[lIIl11ll];
            }

            I1IIlil1.proxy && (this._loadModule("HttpsProxyAgent"), I1IIlil1.httpsAgent = this._genHttpsAgentWithProxyConfig(I1IIlil1.proxy), delete I1IIlil1.proxy);
            await axios(I1IIlil1).then(ilII11Il => {
                if (i1I1I1I1) {
                    llI1lIlI.lastUseTimeStamp = Date.now();
                    llI1lIlI.usedTimes++;
                    const ii1l11i1 = llI1lIlI.useLimit > 0 && llI1lIlI.usedTimes >= llI1lIlI.useLimit,
                        lIiI1lI1 = llI1lIlI.timeLimit > 0 && Date.now() - llI1lIlI.extractTimestamp >= llI1lIlI.timeLimit;
                    (ii1l11i1 || lIiI1lI1) && Object.assign(llI1lIlI, {
                        "proxyConfig": null,
                        "lastUseTimeStamp": null,
                        "extractTimestamp": null,
                        "usedTimes": 0
                    });
                }

                Ii1lIi1l.success = true;
                Ii1lIi1l.status = ilII11Il.status;
                Ii1lIi1l.data = ilII11Il.data;
                Ii1lIi1l.headers = ilII11Il.headers;
                Ii1lIi1l.connected = true;
                iIIilii1 && this._handleRequestDebugPrint(ilII11Il, true);
            }).catch(iIiIlilI => {
                if (i1I1I1I1) {
                    llI1lIlI.lastUseTimeStamp = Date.now();
                    llI1lIlI.usedTimes++;
                    const IIl1IliI = llI1lIlI.useLimit > 0 && llI1lIlI.usedTimes >= llI1lIlI.useLimit,
                        l1ilIl = llI1lIlI.timeLimit > 0 && Date.now() - llI1lIlI.extractTimestamp >= llI1lIlI.timeLimit;
                    (IIl1IliI || l1ilIl) && Object.assign(llI1lIlI, {
                        "proxyConfig": null,
                        "lastUseTimeStamp": null,
                        "extractTimestamp": null,
                        "usedTimes": 0
                    });
                }

                let iII1lIIl = null;

                if (iIiIlilI.response) {
                    Ii1lIi1l.connected = true;
                    const ilIIllIi = iIiIlilI.response?.["status"],
                        iiIliliI = {
                            400: "400 请求错误 [Bad Request]",
                            401: "401 未授权 [Unauthorized]",
                            403: "403 禁止访问 [Forbidden]",
                            493: "493 禁止访问 [Forbidden]",
                            404: "404 资源未找到 [Not Found]",
                            408: "408 请求超时 [Request Timeout]",
                            429: "429 请求过多 [Too Many Requests]",
                            500: "500 服务器内部错误 [Internal Server Error]",
                            502: "502 网关错误 [Bad Gateway]",
                            503: "503 服务不可用 [Service Unavailable]"
                        };
                    iII1lIIl = iiIliliI[ilIIllIi] || "请求失败 [Response code " + ilIIllIi + "]";
                } else {
                    i1I1I1I1 && Object.assign(llI1lIlI, {
                        "proxyConfig": null,
                        "lastUseTimeStamp": null,
                        "extractTimestamp": null,
                        "usedTimes": 0
                    });

                    if (iIiIlilI.request) {
                        const IIIliII = {
                            "ECONNABORTED": "请求被中断",
                            "ECONNRESET": "连接被对方重置",
                            "ECONNREFUSED": "服务器拒绝连接",
                            "ETIMEDOUT": "网络请求超时",
                            "ENOTFOUND": "无法解析的域名或地址",
                            "EPROTO": "协议错误",
                            "EHOSTUNREACH": "无法到达服务器主机",
                            "ENETUNREACH": "无法到达网络",
                            "EADDRINUSE": "网络地址已被使用",
                            "EPIPE": "向已关闭的写入流进行写入",
                            "ERR_BAD_OPTION_VALUE": "无效或不支持的配置选项值",
                            "ERR_BAD_OPTION": "无效的配置选项",
                            "ERR_NETWORK": "网络错误",
                            "ERR_FR_TOO_MANY_REDIRECTS": "请求被重定向次数过多",
                            "ERR_DEPRECATED": "使用了已弃用的特性或方法",
                            "ERR_BAD_RESPONSE": "服务器响应无效或无法解析",
                            "ERR_BAD_REQUEST": "请求无效或缺少必需参数",
                            "ERR_CANCELED": "请求被用户取消",
                            "ERR_NOT_SUPPORT": "当前环境不支持此特性或方法",
                            "ERR_INVALID_URL": "请求的 URL 无效",
                            "ERR_TLS_CERT_ALTNAME_INVALID": "TLS 证书的主机名无效",
                            "ERR_TLS_CERT_REJECTED": "TLS 证书被拒绝",
                            "ERR_HTTP2_STREAM_CANCEL": "HTTP2 流被取消",
                            "ERR_HTTP2_SESSION_ERROR": "HTTP2 会话出错",
                            "ERR_QUICSESSION_VERSION_NEGOTIATION": "QUIC 会话版本协商失败",
                            "EAI_AGAIN": "DNS 查找超时"
                        };
                        iII1lIIl = IIIliII[iIiIlilI.code] || "未知网络连接错误类型 [" + iIiIlilI.code + "]";
                    } else iII1lIIl = iIiIlilI.message || "未知错误状态";

                    (iIiIlilI.config?.["httpAgent"] || iIiIlilI.config?.["httpsAgent"]) && (iII1lIIl += "（🌐该请求通过代理发出）");
                }

                Ii1lIi1l.error = iII1lIIl;
                Ii1lIi1l.status = iIiIlilI.response?.["status"] || null;
                iIIilii1 && (this._handleRequestDebugPrint(iIiIlilI, false), console.log("❌ 请求失败原因 ➜ " + Ii1lIi1l.error));
            });
            Ili11ii1 && Object.keys(Ili11ii1).forEach(ll1IiII1 => {
                https.globalAgent.options[ll1IiII1] = null;
            });
        } catch (i1ii1i1i) {
            Ii1lIi1l.error = i1ii1i1i.message || i1ii1i1i;

            if (iIIilii1) {
                console.log("❌ 在处理 HTTP 请求时遇到了错误 ➜ " + i1ii1i1i);
            }
        }

        return Ii1lIi1l;
    }

    async ["get"](llIIIili) {
        return await this.request(Object.assign({}, llIIIili, {
            "method": "get"
        }));
    }

    async ["post"](IlIiIii) {
        return await this.request(Object.assign({}, IlIiIii, {
            "method": "post"
        }));
    }

    async ["put"](iIii1II1) {
        return await this.request(Object.assign({}, iIii1II1, {
            "method": "put"
        }));
    }

    async ["delete"](iliIiI1i) {
        return await this.request(Object.assign({}, iliIiI1i, {
            "method": "delete"
        }));
    }

    ["_handleRequestDebugPrint"](Il1lilii, li1I1ilI = true) {
        this._loadModule("TablePrint");

        if (!this._Table) return;
        const ill11lI = this._Table;
        console.log("------------------------ 🔧 REQUEST DEBUG ------------------------------");

        try {
            let l1IiIiii = null,
                iiI1i111 = null;
            l1IiIiii = new ill11lI({
                "columns": [{
                    "title": "类型",
                    "name": "type",
                    "alignment": "left"
                }, {
                    "title": "说明",
                    "name": "info",
                    "alignment": "left"
                }],
                "charLength": {
                    "🟢": 2,
                    "🔴": 2,
                    "❌": 2
                }
            });
            l1IiIiii.addRow({
                "type": "请求结果",
                "info": "" + (li1I1ilI ? "🟢" : Il1lilii?.["response"] ? "🔴" : "❌") + (Il1lilii?.["status"] ? " " + Il1lilii.status : Il1lilii?.["response"] ? " " + Il1lilii.response?.["status"] : "") + " - " + "".concat(Il1lilii?.["config"]?.["method"] || "未知").toUpperCase()
            });
            if (Il1lilii?.["config"]?.["url"]) try {
                iiI1i111 = new URL(Il1lilii.config.url);
                l1IiIiii.addRow({
                    "type": "请求地址",
                    "info": iiI1i111.origin
                });
                l1IiIiii.addRow({
                    "type": "请求路径",
                    "info": iiI1i111.pathname
                });
            } catch {
                l1IiIiii.addRow({
                    "type": "请求地址",
                    "info": Il1lilii.config.url
                });
            }
            l1IiIiii.printTable();

            if (iiI1i111 && iiI1i111?.["search"] || Il1lilii?.["config"]?.["params"]) {
                try {
                    const iiII1I11 = Object.assign({}, new URLSearchParams(iiI1i111.search) || {}, Il1lilii?.["config"]?.["params"] || {});

                    if (Object.keys(iiII1I11).length > 0) {
                        l1IiIiii = new ill11lI({
                            "columns": [{
                                "title": "名称",
                                "name": "label",
                                "alignment": "left"
                            }, {
                                "title": "值",
                                "name": "value",
                                "alignment": "left"
                            }]
                        });

                        for (let IIiilIl in iiII1I11) {
                            l1IiIiii.addRow({
                                "label": decodeURIComponent(IIiilIl),
                                "value": decodeURIComponent(iiII1I11[IIiilIl])
                            });
                        }

                        console.log("\n✧ 请求参数");
                        l1IiIiii.printTable();
                    }
                } catch { }
            }

            if (Il1lilii?.["config"]?.["httpAgent"] || Il1lilii?.["config"]?.["httpsAgent"]) {
                const IiIll1Il = (Il1lilii.config?.["httpAgent"] || Il1lilii.config?.["httpsAgent"])?.["proxy"],
                    lIiIiIi = {
                        "protocol": IiIll1Il.protocol.replace(":", ""),
                        "hostname": IiIll1Il.hostname
                    };

                if (IiIll1Il.port) {
                    lIiIiIi.port = IiIll1Il.port;
                }

                if (IiIll1Il instanceof URL) (IiIll1Il.username || IiIll1Il.password) && (lIiIiIi.username = IiIll1Il.username, lIiIiIi.password = IiIll1Il.password); else {
                    if (IiIll1Il.auth) {
                        const IlIli11 = IiIll1Il.auth.split(":");
                        lIiIiIi.username = IlIli11[0];
                        lIiIiIi.password = IlIli11[1];
                    }
                }
                l1IiIiii = new ill11lI({
                    "columns": [{
                        "title": "名称",
                        "name": "label",
                        "alignment": "left"
                    }, {
                        "title": "值",
                        "name": "value",
                        "alignment": "left"
                    }]
                });

                for (let l1i1Illi in lIiIiIi) {
                    let I1iili11 = lIiIiIi[l1i1Illi];
                    typeof I1iili11 === "object" && (I1iili11 = JSON.stringify(I1iili11));
                    l1IiIiii.addRow({
                        "label": l1i1Illi,
                        "value": I1iili11
                    });
                }

                console.log("\n✧ HTTP 代理配置");
                l1IiIiii.printTable();
            }

            if (Il1lilii?.["config"]?.["headers"]) {
                const iliI1l1I = Il1lilii.config.headers;
                l1IiIiii = new ill11lI({
                    "columns": [{
                        "title": "名称",
                        "name": "label",
                        "alignment": "left"
                    }, {
                        "title": "值",
                        "name": "value",
                        "alignment": "left",
                        "maxLen": 80
                    }]
                });

                for (let IIiiIi11 in iliI1l1I) {
                    let lI1li1li = iliI1l1I[IIiiIi11];
                    typeof lI1li1li === "object" && (lI1li1li = JSON.stringify(lI1li1li));
                    l1IiIiii.addRow({
                        "label": IIiiIi11,
                        "value": lI1li1li
                    });
                }

                console.log("\n✧ 请求 Headers");
                l1IiIiii.printTable();
            }

            if (Il1lilii?.["config"]?.["data"]) {
                let i11l111l = Il1lilii.config.data;
                if (typeof i11l111l === "object") i11l111l = JSON.stringify(JSON.parse(i11l111l)); else {
                    if (typeof i11l111l === "string") try {
                        const i1liiIl1 = JSON.parse(i11l111l);
                        i11l111l = JSON.stringify(i1liiIl1);
                    } catch {
                        i11l111l = JSON.stringify(i11l111l).slice(1, -1);
                    }
                }
                console.log("\n✧ 请求 Body\n" + i11l111l);
            }

            if (!li1I1ilI && !Il1lilii?.["response"]) {
                console.log("\n------------------------------------------------------------------------");
                return;
            }

            if (Il1lilii?.["headers"]) {
                const I1IlIl1I = Il1lilii.headers;
                l1IiIiii = new ill11lI({
                    "columns": [{
                        "title": "名称",
                        "name": "label",
                        "alignment": "left"
                    }, {
                        "title": "值",
                        "name": "value",
                        "alignment": "left",
                        "maxLen": 80
                    }]
                });

                for (let ii1l1ll in I1IlIl1I) {
                    let lIIiliii = I1IlIl1I[ii1l1ll];
                    typeof lIIiliii !== "string" && (lIIiliii = JSON.stringify(lIIiliii));
                    l1IiIiii.addRow({
                        "label": ii1l1ll,
                        "value": lIIiliii
                    });
                }

                console.log("\n✧ 响应 Headers");
                l1IiIiii.printTable();
            }

            if (Il1lilii?.["data"]) {
                let lIl1iiiI = Il1lilii.data;
                if (typeof lIl1iiiI === "object") lIl1iiiI = JSON.stringify(lIl1iiiI); else {
                    if (typeof lIl1iiiI === "string") try {
                        const lli1l1ii = JSON.parse(lIl1iiiI);
                        lIl1iiiI = JSON.stringify(lli1l1ii);
                    } catch {
                        lIl1iiiI = JSON.stringify(lIl1iiiI).slice(1, -1);
                    }
                }
                console.log("\n✧ 响应 Body\n" + lIl1iiiI);
            }
        } catch (ll111IlI) {
            console.log("❌ 处理 REQUEST DEBUG PRINT 时遇到了错误 ➜ " + (ll111IlI.message || ll111IlI));
        }

        console.log("\n------------------------------------------------------------------------");
    }

    async ["getProxyAddressWithApi"](Iiiil11i) {
        let llii1iIl = "";

        try {
            const IIliIl11 = /\b(?:\d{1,3}\.){3}\d{1,3}:\d{1,5}\b/g,
                i11iiIll = {
                    "url": Iiiil11i,
                    "method": "post",
                    "proxy": null,
                    "timeout": 30000
                };
            let iIII1iI1 = 0,
                lllll1I = null;
            const i111l1Il = 1;

            while (iIII1iI1 < i111l1Il) {
                const i1liIili = await this.request(i11iiIll);

                if (!i1liIili.success) {
                    lllll1I = i1liIili.error;
                    iIII1iI1++;
                    continue;
                }

                if (!i1liIili.data) {
                    lllll1I = "无响应数据";
                    iIII1iI1++;
                    continue;
                }

                const II11IIi = i1liIili.data;

                if (typeof II11IIi === "object") {
                    if (II11IIi?.["data"]) {
                        let li1I1l = II11IIi.data;

                        if (Array.isArray(li1I1l) && li1I1l.length > 0) {
                            li1I1l = li1I1l[0];
                            if (li1I1l?.["ip"] && li1I1l?.["port"]) llii1iIl = li1I1l.ip + ":" + li1I1l.port; else li1I1l?.["IP"] && li1I1l?.["Port"] && (llii1iIl = li1I1l.IP + ":" + li1I1l.Port);
                        } else {
                            if (li1I1l?.["proxy_list"] && Array.isArray(li1I1l.proxy_list) && li1I1l.proxy_list.length > 0) {
                                const l111iIll = li1I1l.proxy_list[0];
                                typeof l111iIll === "object" && l111iIll?.["ip"] && l111iIll?.["port"] ? llii1iIl = l111iIll.ip + ":" + l111iIll.port : llii1iIl = l111iIll;
                            }
                        }

                        llii1iIl && !IIliIl11.test(llii1iIl) && (llii1iIl = "");
                    }

                    !llii1iIl && (lllll1I = "接口响应数据异常：" + JSON.stringify(II11IIi));
                } else {
                    const l1liiIll = II11IIi.match(IIliIl11);
                    l1liiIll && (llii1iIl = l1liiIll[0]);
                    !llii1iIl && (lllll1I = "接口响应数据异常：" + II11IIi);
                }

                if (llii1iIl) return llii1iIl;
                iIII1iI1++;
            }

            iIII1iI1 >= i111l1Il && console.log("⚠ 提取代理地址失败 ➜ " + lllll1I);
        } catch (IIi1Il1l) {
            console.log("❌ 在处理请求代理API获取代理地址时遇到了错误\n" + IIi1Il1l);
        }

        return llii1iIl;
    }

    ["_getProxyConfig"](iIi1iiIl = "") {
        try {
            if (!iIi1iiIl) return null;

            if (!iIi1iiIl.includes("://")) {
                iIi1iiIl = "http://" + iIi1iiIl;
            }

            const l1iiIl1i = this.parseUrl(iIi1iiIl);

            if (l1iiIl1i?.["hostname"]) {
                const il1IlI1l = {
                    "protocol": l1iiIl1i.protocol.replace(":", "") === "https" ? "https" : "http",
                    "host": l1iiIl1i.hostname,
                    "port": parseInt(l1iiIl1i?.["port"] || "8080")
                };
                return (l1iiIl1i?.["username"] || l1iiIl1i?.["password"]) && (il1IlI1l.auth = {
                    "username": l1iiIl1i?.["username"] || "",
                    "password": l1iiIl1i?.["password"] || ""
                }), il1IlI1l;
            }
        } catch { }

        return null;
    }

    ["_genHttpsAgentWithProxyConfig"](I1i1liII) {
        try {
            if (!this._HttpsProxyAgent) {
                return null;
            }

            if (!I1i1liII) return null;
            let l1Ili1II = (I1i1liII?.["protocol"] || "http") + "://";
            return I1i1liII?.["auth"] && (l1Ili1II += (I1i1liII.auth?.["username"] || "") + ":" + (I1i1liII.auth?.["password"] || "") + "@"), l1Ili1II += I1i1liII?.["host"] + ":" + (I1i1liII?.["port"] || "8080"), new this._HttpsProxyAgent(l1Ili1II);
        } catch (IIli1i1I) {
            console.log("❌ 加载代理时遇到了错误 ➜ " + (IIli1i1I.message || IIli1i1I));
        }

        return null;
    }

    async ["concTaskNormal"](Ii1li1ll = "3", lliiIii1 = 100, iIli111l) {
        let II1li11l = false,
            lliI11i1 = 0,
            lIilII1l = 0;

        async function ll1IiI(I1iliI11) {
            const ii1lIi1 = await iIli111l(I1iliI11);

            if (ii1lIi1) {
                if (typeof ii1lIi1 === "boolean") II1li11l = true; else typeof ii1lIi1 === "object" && ii1lIi1?.["runEnd"] && (II1li11l = true);
            }

            lliI11i1--;
            il1IllI();
        }

        async function il1IllI() {
            while (lliI11i1 < Ii1li1ll && lliiIii1 > 0 && !II1li11l) {
                lliiIii1--;
                lliI11i1++;
                lIilII1l++;
                await ll1IiI(lIilII1l);
            }

            II1li11l && (await new Promise(i11lII1l => {
                const lIiii1ii = setInterval(() => {
                    if (lliI11i1 === 0) {
                        clearInterval(lIiii1ii);
                        i11lII1l();
                    }
                }, 100);
            }));
        }

        const Ili1iiIl = Math.min(lliiIii1, Ii1li1ll),
            I1lIiil1 = [];

        for (let iil11iI = 0; iil11iI < Ili1iiIl; iil11iI++) {
            lliiIii1--;
            lliI11i1++;
            lIilII1l++;
            I1lIiil1.push(ll1IiI(lIilII1l));
        }

        await Promise.all(I1lIiil1);
        il1IllI();
        await new Promise(Il11l1Il => {
            const l1l1l1Il = setInterval(() => {
                (lliI11i1 === 0 || II1li11l) && (clearInterval(l1l1l1Il), Il11l1Il());
            }, 100);
        });
    }

    ["setCookie"](I1lIliII) {
        this._Cookie = I1lIliII;
    }

    ["unsetCookie"]() {
        this._Cookie = "";
        this._UserAgent = "";
    }

    ["getCookie"]() {
        return this._Cookie;
    }

    ["getLatestAppVersion"]() {
        return this._latestAppVersionData.version || "";
    }

    ["genUuid"](l1lIIl1i = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", lIlIIli1 = "0123456789abcdef") {
        let lliliIi = "";

        for (let il1I1Ill of l1lIIl1i) {
            if (il1I1Ill == "x") lliliIi += lIlIIli1.charAt(Math.floor(Math.random() * lIlIIli1.length)); else {
                if (il1I1Ill == "X") lliliIi += lIlIIli1.charAt(Math.floor(Math.random() * lIlIIli1.length)).toUpperCase(); else {
                    lliliIi += il1I1Ill;
                }
            }
        }

        return lliliIi;
    }

    ["genUA"](iilIII1I, l1liII1l = "jd") {
        if (this._UserAgentMap.has(iilIII1I)) {
            return this._UserAgentMap.get(iilIII1I);
        }

        const liil1 = {
            "jd": {
                "app": "jdapp",
                "appBuild": this._latestAppVersionData.build,
                "client": "iPhone",
                "clientVersion": this._latestAppVersionData.version
            },
            "lite": {
                "app": "jdltapp",
                "appBuild": "1490",
                "client": "iPhone",
                "clientVersion": "6.14.0"
            }
        },
            IlII1iil = l1liII1l === "lite" ? "lite" : "jd",
            {
                app: i1IilII,
                appBuild: ll1i1ilI,
                client: iIlllIlI,
                clientVersion: lllll1
            } = liil1[IlII1iil],
            Ii11Illl = [this._latestIOSVersion],
            i1iilil1 = Ii11Illl[Math.floor(Math.random() * Ii11Illl.length)],
            iillilIi = "iPhone; CPU iPhone OS " + i1iilil1.replace(".", "_") + " like Mac OS X",
            I11Il111 = {
                "ud": CryptoJS.SHA1(iilIII1I).toString(),
                "sv": i1iilil1,
                "iad": ""
            },
            IIil1il = JSON.stringify(this.getCipherConf(I11Il111, IlII1iil)),
            iilliiil = this.genUuid(),
            iI1ilIII = [i1IilII, iIlllIlI, lllll1, "", "rn/" + iilliiil, "M/5.0", "appBuild/" + ll1i1ilI, "jdSupportDarkMode/0", "ef/1", "ep/" + encodeURIComponent(IIil1il), "Mozilla/5.0 (" + iillilIi + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
            IIIIi111 = iI1ilIII.join(";");

        this._UserAgentMap.set(iilIII1I, IIIIi111);

        if (this._Cookie) this._UserAgent = IIIIi111;
        return IIIIi111;
    }

    ["getJEH"](lI1I1lI = "JD4iPhone/168960 (iPhone; iOS 17.3; Scale/3.00)") {
        return encodeURIComponent(JSON.stringify(this.getCipherConf({
            "User-Agent": encodeURIComponent(lI1I1lI)
        })));
    }

    ["getJEC"](IlI1I1i) {
        return encodeURIComponent(JSON.stringify(this.getCipherConf({
            "pin": encodeURIComponent(IlI1I1i)
        })));
    }

    ["getCipherConf"](i1ii1iI, lli11iII = "jd") {
        if (i1ii1iI && typeof i1ii1iI === "object") for (let IlIi1IIi in i1ii1iI) {
            i1ii1iI[IlIi1IIi] = this.Base64(i1ii1iI[IlIi1IIi]).encode();
        } else {
            if (i1ii1iI && typeof i1ii1iI === "string") {
                i1ii1iI = this.Base64(i1ii1iI).encode();
            } else i1ii1iI = {};
        }
        return {
            "ciphertype": 5,
            "cipher": i1ii1iI,
            "ts": Math.floor(Date.now() / 1000),
            "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
            "version": "1.0.3",
            "appname": lli11iII === "lite" ? "com.jd.jdmobilelite" : "com.360buy.jdmobile",
            "ridx": -1
        };
    }

    ["Base64"](iI1Ii111, III11lII = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
        return {
            "encode": () => {
                function Ii11ilii(li11Ii11) {
                    li11Ii11 = li11Ii11.replace(/rn/g, "n");
                    let lIliIlI1 = "",
                        iIiIl;

                    for (let llII1lIi = 0; llII1lIi < li11Ii11.length; llII1lIi++) {
                        iIiIl = li11Ii11.charCodeAt(llII1lIi);
                        if (iIiIl < 128) lIliIlI1 += String.fromCharCode(iIiIl); else {
                            if (iIiIl > 127 && iIiIl < 2048) {
                                lIliIlI1 += String.fromCharCode(iIiIl >> 6 | 192);
                                lIliIlI1 += String.fromCharCode(iIiIl & 63 | 128);
                            } else lIliIlI1 += String.fromCharCode(iIiIl >> 12 | 224), lIliIlI1 += String.fromCharCode(iIiIl >> 6 & 63 | 128), lIliIlI1 += String.fromCharCode(iIiIl & 63 | 128);
                        }
                    }

                    return lIliIlI1;
                }

                let il1ilI1l = "",
                    l1lilI,
                    i1lilil1,
                    iIiiIll1,
                    I1iiI1ii,
                    il11iI1,
                    iiliil,
                    lIlllIl1,
                    I11ii1Ii = 0;
                iI1Ii111 = Ii11ilii(iI1Ii111);

                while (I11ii1Ii < iI1Ii111.length) {
                    l1lilI = iI1Ii111.charCodeAt(I11ii1Ii++);
                    i1lilil1 = iI1Ii111.charCodeAt(I11ii1Ii++);
                    iIiiIll1 = iI1Ii111.charCodeAt(I11ii1Ii++);
                    I1iiI1ii = l1lilI >> 2;
                    il11iI1 = (l1lilI & 3) << 4 | i1lilil1 >> 4;
                    iiliil = (i1lilil1 & 15) << 2 | iIiiIll1 >> 6;
                    lIlllIl1 = iIiiIll1 & 63;
                    if (isNaN(i1lilil1)) iiliil = lIlllIl1 = 64; else isNaN(iIiiIll1) && (lIlllIl1 = 64);
                    il1ilI1l = il1ilI1l + III11lII.charAt(I1iiI1ii) + III11lII.charAt(il11iI1) + III11lII.charAt(iiliil) + III11lII.charAt(lIlllIl1);
                }

                while (il1ilI1l.length % 4 > 1) il1ilI1l += "=";

                return il1ilI1l;
            },
            "decode": () => {
                function iil11lii(lIlllli) {
                    let lllIill1 = "",
                        l1lIiiIl,
                        II11llil,
                        lIliii1l,
                        iii111I = 0;

                    while (iii111I < lIlllli.length) {
                        l1lIiiIl = lIlllli.charCodeAt(iii111I);

                        if (l1lIiiIl < 128) {
                            lllIill1 += String.fromCharCode(l1lIiiIl);
                            iii111I++;
                        } else l1lIiiIl > 191 && l1lIiiIl < 224 ? (II11llil = lIlllli.charCodeAt(iii111I + 1), lllIill1 += String.fromCharCode((l1lIiiIl & 31) << 6 | II11llil & 63), iii111I += 2) : (II11llil = lIlllli.charCodeAt(iii111I + 1), lIliii1l = lIlllli.charCodeAt(iii111I + 2), lllIill1 += String.fromCharCode((l1lIiiIl & 15) << 12 | (II11llil & 63) << 6 | lIliii1l & 63), iii111I += 3);
                    }

                    return lllIill1;
                }

                let il1lIIII = "",
                    Il11IIi1,
                    iI1iliIi,
                    lIilI,
                    lIl1liii,
                    lI1l1IIi,
                    IlI1IIIi,
                    i1II1i,
                    lIIll1il = 0;

                while (lIIll1il < iI1Ii111.length) {
                    lIl1liii = III11lII.indexOf(iI1Ii111.charAt(lIIll1il++));
                    lI1l1IIi = III11lII.indexOf(iI1Ii111.charAt(lIIll1il++));
                    IlI1IIIi = III11lII.indexOf(iI1Ii111.charAt(lIIll1il++));
                    i1II1i = III11lII.indexOf(iI1Ii111.charAt(lIIll1il++));
                    Il11IIi1 = lIl1liii << 2 | lI1l1IIi >> 4;
                    iI1iliIi = (lI1l1IIi & 15) << 4 | IlI1IIIi >> 2;
                    lIilI = (IlI1IIIi & 3) << 6 | i1II1i;
                    il1lIIII += String.fromCharCode(Il11IIi1);
                    if (IlI1IIIi != 64) il1lIIII += String.fromCharCode(iI1iliIi);
                    if (i1II1i != 64) il1lIIII += String.fromCharCode(lIilI);
                }

                return il1lIIII = iil11lii(il1lIIII), il1lIIII;
            }
        };
    }

    async ["getLoginStatus"](IllIl1i1 = this._Cookie) {
        if (!IllIl1i1) return console.log("🚫 getLoginStatus 请求失败 ➜ 未设置Cookie"), undefined;

        try {
            const lIi11I1i = {
                "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
                "method": "get",
                "headers": {
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                    "Cookie": IllIl1i1,
                    "Host": "plogin.m.jd.com",
                    "User-Agent": this._UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
                },
                "timeout": 30000,
                "debug": false
            };
            let lliII1i1 = 0,
                III11IIi = null;
            const l1IlIi = 1;

            while (lliII1i1 < l1IlIi) {
                const I1lIliIl = await this.request(lIi11I1i);

                if (!I1lIliIl.success) {
                    III11IIi = "🚫 getLoginStatus 请求失败 ➜ " + I1lIliIl.error;
                    lliII1i1++;
                    continue;
                }

                if (!I1lIliIl.data) {
                    III11IIi = "🚫 getLoginStatus 请求异常 ➜ 无响应数据";
                    lliII1i1++;
                    continue;
                }

                const l11Iil1l = I1lIliIl.data?.["islogin"];
                if (l11Iil1l === "1") return true; else {
                    if (l11Iil1l === "0") {
                        return false;
                    }
                }
                lliII1i1++;
            }

            lliII1i1 >= l1IlIi && console.log(III11IIi);
        } catch (llI1llI) {
            console.log("❌ getLoginStatus 在处理请求中遇到了错误\n" + llI1llI);
        }

        return undefined;
    }

    async ["joinShopMember"](II1lii, I1illl1 = this._Cookie) {
        if (!I1illl1) return console.log("🚫 joinShopMember 请求失败 ➜ 未设置Cookie"), undefined;
        if (!II1lii) return undefined;

        try {
            this._loadModule("h5st");

            const IIlil1iI = {
                "appId": "27004",
                "appid": "shopmember_m_jd_com",
                "functionId": "bindWithVender",
                "clientVersion": "9.2.0",
                "client": "H5",
                "body": {
                    "venderId": II1lii,
                    "shopId": II1lii,
                    "bindByVerifyCodeFlag": 1,
                    "registerExtend": {},
                    "writeChildFlag": 0,
                    "channel": 102,
                    "appid": "27004",
                    "needSecurity": true,
                    "bizId": "shopmember_m_jd_com"
                },
                "version": "4.1",
                "t": true,
                "ua": this._UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
            };

            if (!this._H5st) {
                return undefined;
            }

            const iIlii1lI = await this._H5st.getH5st(IIlil1iI);

            if (!iIlii1lI.params) {
                return undefined;
            }

            const II1ili1 = {
                "url": "https://api.m.jd.com/client.action",
                "method": "post",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Origin": "https://pages.jd.com",
                    "Host": "api.m.jd.com",
                    "Accept": "*/*",
                    "User-Agent": this._UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
                    "Cookie": I1illl1
                },
                "data": iIlii1lI.params + "&area=&uuid=88888",
                "timeout": 30000
            },
                Il1Ii1ii = await this.request(II1ili1);
            if (!Il1Ii1ii.success) return console.log("🚫 joinShopMember 请求失败 ➜ " + Il1Ii1ii.error), undefined;

            if (!Il1Ii1ii.data) {
                return console.log("🚫 joinShopMember 请求异常 ➜ 无响应数据"), undefined;
            }

            const iiIlIi1 = Il1Ii1ii.data;

            if (iiIlIi1?.["success"] === true) {
                if (iiIlIi1?.["result"] && iiIlIi1.result?.["giftInfo"]) for (let llil111i of iiIlIi1.result?.["giftInfo"]?.["giftList"]) {
                    console.log(" >> 入会获得：" + llil111i.discountString + llil111i.prizeName + llil111i.secondLineDesc);
                }
                if (iiIlIi1?.["message"] === "加入店铺会员成功") return true; else {
                    if (iiIlIi1?.["message"] === "活动太火爆，请稍后再试") console.log("🚫 加入店铺会员失败 ➜ " + iiIlIi1.message); else {
                        return console.log("🚫 加入店铺会员失败 ➜ " + iiIlIi1?.["message"]), false;
                    }
                }
            } else {
                if (iiIlIi1?.["message"]) return console.log("🚫 加入店铺会员失败 ➜ " + iiIlIi1.message), false; else console.log("🚫 加入店铺会员失败 ➜ " + JSON.stringify(iiIlIi1));
            }
        } catch (iI1II1lI) {
            console.log("❌ joinShopMember 在处理请求中遇到了错误\n" + iI1II1lI);
        }

        return undefined;
    }

    async ["getShopMemberStatus"](illlil1I, iiIlIIll = this._Cookie) {
        if (!iiIlIIll) return console.log("🚫 getShopMemberStatus 请求失败 ➜ 未设置Cookie"), undefined;
        if (!illlil1I) return undefined;

        try {
            this._loadModule("h5st");

            const liilIli1 = {
                "appId": "27004",
                "appid": "shopmember_m_jd_com",
                "functionId": "getShopOpenCardInfo",
                "clientVersion": "9.2.0",
                "client": "H5",
                "body": {
                    "venderId": illlil1I,
                    "channel": 2,
                    "payUpShop": true,
                    "queryVersion": "10.5.2",
                    "appid": "27004",
                    "needSecurity": true,
                    "bizId": "shopmember_m_jd_com"
                },
                "version": "3.1",
                "ua": this._UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
            };
            if (!this._H5st) return undefined;
            const Iiili111 = await this._H5st.getH5st(liilIli1);
            if (!Iiili111.params) return undefined;
            const IIIl1Ii1 = {
                "url": "https://api.m.jd.com/client.action?" + Iiili111.params,
                "method": "get",
                "headers": {
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "https://api.m.jd.com",
                    "Host": "api.m.jd.com",
                    "Accept": "*/*",
                    "User-Agent": this._UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
                    "Cookie": iiIlIIll
                },
                "timeout": 30000
            },
                i1lIl1ii = await this.request(IIIl1Ii1);
            if (!i1lIl1ii.success) return console.log("🚫 getShopMemberStatus 请求失败 ➜ " + i1lIl1ii.error), undefined;

            if (!i1lIl1ii.data) {
                return console.log("🚫 getShopMemberStatus 请求异常 ➜ 无响应数据"), undefined;
            }

            const l1IIii = i1lIl1ii.data;

            if (l1IIii?.["success"] === true) {
                console.log("去加入：" + (l1IIii.result?.["shopMemberCardInfo"]?.["venderCardName"] || "未知"));
                if (l1IIii?.["result"]?.["userInfo"]?.["openCardStatus"] === 1) return true; else {
                    return false;
                }
            } else l1IIii?.["message"] ? console.log("🚫 获取店铺会员状态异常 ➜ " + l1IIii.message) : console.log("🚫 获取店铺会员状态异常 ➜ " + JSON.stringify(l1IIii));
        } catch (ll1ilIIl) {
            console.log("❌ getShopMemberStatus 在处理请求中遇到了错误\n" + ll1ilIIl);
        }

        return undefined;
    }

    async ["followShop"](I1Iiiii1, IIil1Il, l1i1l11i = this._Cookie) {
        if (!l1i1l11i) {
            return console.log("🚫 followShop 请求失败 ➜ 未设置Cookie"), undefined;
        }

        if (!I1Iiiii1 && typeof I1Iiiii1 !== "boolean" || !IIil1Il) {
            return undefined;
        }

        try {
            const iiliIIlI = {
                "url": "https://api.m.jd.com/client.action",
                "method": "post",
                "headers": {
                    "Accept": "application/json, text/plain, */*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Origin": "https://shop.m.jd.com",
                    "Referer": "https://shop.m.jd.com/",
                    "Connection": "keep-alive",
                    "Accept-Language": "zh-cn",
                    "Cookie": l1i1l11i,
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/122.0.0.0"
                },
                "data": {
                    "functionId": "whx_followShop",
                    "body": JSON.stringify({
                        "shopId": IIil1Il,
                        "follow": I1Iiiii1
                    }),
                    "t": Date.now(),
                    "appid": "shop_m_jd_com",
                    "clientVersion": "11.0.0",
                    "client": "wh5"
                },
                "timeout": 30000
            },
                I1ilIlI = await this.request(iiliIIlI);
            if (!I1ilIlI.success) return console.log("🚫 followShop 请求失败 ➜ " + I1ilIlI.error), undefined;
            if (!I1ilIlI.data) return console.log("🚫 followShop 请求异常 ➜ 无响应数据"), undefined;
            const iI11ilIl = I1ilIlI.data;

            if (iI11ilIl?.["code"] === "0") {
                if (iI11ilIl?.["result"]?.["code"] === "0") {
                    return true;
                } else return false;
            } else {
                if (iI11ilIl?.["msg"]) {
                    return false;
                } else console.log("🚫 " + (I1Iiiii1 ? "关注" : "取关") + "店铺异常 ➜ " + JSON.stringify(iI11ilIl));
            }
        } catch (iiiiil) {
            console.log("❌ followShop 在处理请求中遇到了错误\n" + iiiiil);
        }

        return undefined;
    }

    ["useAppTls"](iiIlilI = {}) {
        return Object.assign({}, this._appHttpsTlsOptions, iiIlilI);
    }

    async ["concTask"](iI1lllii = "3", I1IiI1l, l11iiI1i) {
        let lI11i11i = false,
            l1i11l1i = 0,
            li1lliII = 0;

        async function llIl1I1I(IlliIli, IilllIII) {
            const I11lIi1 = await l11iiI1i(IlliIli, IilllIII);

            if (I11lIi1) {
                if (typeof I11lIi1 === "boolean") lI11i11i = true; else {
                    if (typeof I11lIi1 === "object") {
                        if (I11lIi1?.["runEnd"]) {
                            lI11i11i = true;
                        }
                    }
                }
            }

            l1i11l1i--;
            liIIi1I();
        }

        async function liIIi1I() {
            while (l1i11l1i < iI1lllii && I1IiI1l.length > 0 && !lI11i11i) {
                const liliI11i = I1IiI1l.shift();
                l1i11l1i++;
                li1lliII++;
                await llIl1I1I(liliI11i, li1lliII);
            }

            lI11i11i && (await new Promise(i1Ii111l => {
                const lllI1iIl = setInterval(() => {
                    l1i11l1i === 0 && (clearInterval(lllI1iIl), i1Ii111l());
                }, 100);
            }));
        }

        const iIii1li = Math.min(I1IiI1l.length, iI1lllii),
            ilIi1lii = [];

        for (let il1Iil1I = 0; il1Iil1I < iIii1li; il1Iil1I++) {
            const lIiil1l = I1IiI1l.shift();
            l1i11l1i++;
            li1lliII++;
            ilIi1lii.push(llIl1I1I(lIiil1l, li1lliII));
        }

        await Promise.all(ilIi1lii);
        liIIi1I();
        await new Promise(ili11lI1 => {
            const iIlii1ii = setInterval(() => {
                (l1i11l1i === 0 || lI11i11i) && (clearInterval(iIlii1ii), ili11lI1());
            }, 100);
        });
    }

    async ["getSign"](Il1II11I, Ill1I1iI) {
        !this._hasInitAppSignConfig && (this._initAppSignConfig(), this._hasInitAppSignConfig = true);
        let l11IiIIl = "";

        try {
            const IIilI11I = this._appSignConfig;

            if (IIilI11I.genSign) {
                try {
                    l11IiIIl = IIilI11I.genSign(Il1II11I, Ill1I1iI);
                } catch (iIiIll1) {
                    console.log("🚫 getSign 获取本地签名遇到了错误 ➜ " + (iIiIll1.message || iIiIll1));
                }

                if (l11IiIIl) return l11IiIIl; else console.log("🚫 getSign 本地签名获取失败");
            }

            let l1llIliI = {
                [IIilI11I.functionIdField]: Il1II11I,
                [IIilI11I.bodyField]: Ill1I1iI
            };
            const lii1IIII = {
                "url": IIilI11I.requestApi,
                "method": IIilI11I.requestMethod.toLowerCase(),
                "headers": {
                    "Content-Type": IIilI11I.requestContentType
                },
                "data": null,
                "timeout": 60000,
                "proxy": null,
                "debug": false
            };

            if (IIilI11I.requestMethod === "GET") {
                IIilI11I.requestApi += "?" + this.objectToQueryString(l1llIliI);
                delete lii1IIII.data;
                delete lii1IIII.headers["Content-Type"];
            } else {
                IIilI11I.requestContentType.indexOf("application/x-www-form-urlencoded") !== -1 ? (typeof l1llIliI[IIilI11I.bodyField] === "object" && (l1llIliI[IIilI11I.bodyField] = JSON.stringify(l1llIliI[IIilI11I.bodyField])), lii1IIII.data = this.objectToQueryString(l1llIliI)) : lii1IIII.data = JSON.stringify(l1llIliI);
            }

            const l1Iiii1 = await this.request(lii1IIII);
            if (!l1Iiii1.success) return console.log("🚫 getSign 请求失败 ➜ " + l1Iiii1.error), l11IiIIl; else { }

            if (!l1Iiii1.data) {
                return console.log("🚫 getSign 请求异常 ➜ 无响应数据"), l11IiIIl;
            }

            try {
                if (typeof l1Iiii1.data === "object") {
                    let I11I1lI = l1Iiii1?.["data"];

                    if (I11I1lI?.["data"]) {
                        I11I1lI = I11I1lI.data;
                    }

                    if (I11I1lI?.["body"] && this._checkSignStrFormat(I11I1lI.body)) l11IiIIl = I11I1lI.body; else {
                        if (I11I1lI?.["convertUrl"] && this._checkSignStrFormat(I11I1lI.convertUrl)) l11IiIIl = I11I1lI.convertUrl; else I11I1lI?.["convertUrlNew"] && this._checkSignStrFormat(I11I1lI.convertUrlNew) && (l11IiIIl = I11I1lI.convertUrlNew);
                    }
                    !l11IiIIl && console.log("🚫 getSign 响应数据解析异常 ➜ " + JSON.stringify(I11I1lI));
                } else this._checkSignStrFormat(l1Iiii1) ? l11IiIIl = l1Iiii1 : console.log("🚫 getSign 响应数据解析异常 ➜ " + l1Iiii1);
            } catch {
                console.log("🚫 getSign 响应数据解析异常 ➜ " + JSON.stringify(data));
            }
        } catch (li11ilil) {
            console.log("🚫 getSign 在处理请求中遇到了错误\n" + li11ilil);
        }

        return l11IiIIl;
    }

    ["_checkSignStrFormat"](lliIlIIl) {
        const liiIil1 = ["body=", "st=", "sign=", "sv="];

        for (let li1llIiI = 0; li1llIiI < liiIil1.length; li1llIiI++) {
            if (!lliIlIIl.includes(liiIil1[li1llIiI])) {
                return false;
            }
        }

        return true;
    }

    ["_loadModule"](ii11IIl) {
        switch (ii11IIl) {
            case "h5st":
                if (!this._H5st) try {
                    const {
                        H5st: illi1IIi
                    } = require(this._jdCryptoModelPath);

                    this._H5st = illi1IIi;
                } catch (I1Ii1i) {
                    console.log("❌ h5st 组件加载失败");
                }
                break;

            case "TablePrint":
                if (!this._Table) {
                    try {
                        const {
                            Table: il1IlIii
                        } = require("console-table-printer");

                        this._Table = il1IlIii;
                    } catch (llIl1lii) {
                        console.log("❌ TablePrint 组件加载失败");
                    }
                }

                break;

            case "HttpsProxyAgent":
                if (!this._HttpsProxyAgent) {
                    try {
                        const {
                            HttpsProxyAgent: illiii
                        } = require("https-proxy-agent");

                        this._HttpsProxyAgent = illiii;
                    } catch (li1lIi1) {
                        try {
                            const IlII1I = require("https-proxy-agent");

                            this._HttpsProxyAgent = IlII1I;
                        } catch (l1li1Ii1) {
                            console.log("❌ https-proxy-agent 代理模块加载失败");
                        }
                    }
                }

                break;

            default:
                break;
        }
    }

}

module.exports = new Common();