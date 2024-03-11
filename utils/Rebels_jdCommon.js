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
        this._genSignModelPath = __dirname + "/Rebels_Sign";
        this._jdCryptoModelPath = __dirname + "/Rebels_H";
        this._hasInitAppSignConfig = false;

        this._initRequestConfig();
    }

    ["_initRequestConfig"]() {
        try {
            const IiIll1 = require.main.filename,
                l1Il = path.basename(IiIll1, ".js");
            this._requestNoProxyList = (process.env[l1Il + "_no_proxy"] || process.env.RS_NO_PROXY || "").split(",").filter(lIiiI1 => lIiiI1 !== "");
            const i1il11 = process.env[l1Il + "_http_proxy"] || process.env.RS_PROXY_TUNNRL || "",
                l1Ii1i = (process.env.RS_TUNNRL_WHITRLIST || "").split("&").filter(Boolean);
            let l1i1iI = false;

            if (i1il11 && l1Ii1i.length > 0) {
                const I11l1I = l1Ii1i.some(Ilii1l => process.mainModule.filename.includes(Ilii1l));

                if (I11l1I) {
                    const IIi1l1 = this._getProxyConfig(i1il11);

                    IIi1l1 ? (this._requestAxiosProxyConfig = IIi1l1, console.log("\n====================使用代理池模式=================\n"), l1i1iI = true) : console.log("❌ 提供的代理地址无效，跳过启用全局静态代理");
                }
            }

            if (!l1i1iI) {
                const lliIli = process.env[l1Il + "_http_dynamic_proxy_api"] || process.env.RS_PROXY_API || "",
                    IlliII = (process.env.RS_API_WHITELIST || "").split("&").filter(Boolean);

                if (lliIli && IlliII.length > 0) {
                    const ilIl = IlliII.some(ill1ii => process.mainModule.filename.includes(ill1ii));

                    if (ilIl) {
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
                        this._requestDynamicProxyConfig.api = lliIli;
                        const lllli1 = process.env[l1Il + "_http_dynamic_proxy_use_limit"] || process.env.RS_PROXY_USE_LIMIT || "0";

                        try {
                            this._requestDynamicProxyConfig.useLimit = parseInt(lllli1);
                        } catch {
                            this._requestDynamicProxyConfig.useLimit = 1;
                        }

                        const Il11ii = process.env[l1Il + "_http_dynamic_proxy_time_limit"] || process.env.RS_PROXY_TIME_LIMIT || "20000";

                        try {
                            this._requestDynamicProxyConfig.timeLimit = parseInt(Il11ii);
                        } catch {
                            this._requestDynamicProxyConfig.timeLimit = 20000;
                        }

                        this._requestDynamicProxyConfig.fetchFailContinue = (process.env[l1Il + "_http_dynamic_proxy_fetch_fail_continue"] || process.env.RS_PROXY_FETCH_FAIL_CONTINUE || "true") === "true";
                        console.log("\n====================使用API模式=================\n");
                        l1i1iI = true;
                    }
                }
            }
        } catch (Il11il) {
            console.log("❌ 初始化 HTTP 请求配置时遇到了错误\n" + Il11il);
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
            const Ilii1I = process.env.JD_SIGN_API_METHOD;
            Ilii1I && Ilii1I.toUpperCase() === "GET" ? this._appSignConfig.requestMethod = "GET" : this._appSignConfig.requestMethod = "POST";
        } catch { }

        try {
            const ilII = process.env.JD_SIGN_API_CONTENT_TYPE;
            ilII && ilII.indexOf("application/x-www-form-urlencoded") !== -1 ? this._appSignConfig.requestContentType = ilII : this._appSignConfig.requestContentType = "application/json; charset=utf-8";
        } catch { }

        try {
            this._appSignConfig.genSign = require(this._genSignModelPath);
        } catch { }
    }

    ["genRandomString"](i1il1l = 32, Ilii11 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-") {
        const i1llIi = Ilii11.length;
        let iI1l1i = "";

        for (let IlliI1 = 0; IlliI1 < i1il1l; IlliI1++) {
            iI1l1i += Ilii11.charAt(Math.floor(Math.random() * i1llIi));
        }

        return iI1l1i;
    }

    ["parseUrl"](iI1l1l) {
        try {
            const ill1i1 = new URL(iI1l1l);
            return ill1i1;
        } catch (lIiiIl) {
            return {};
        }
    }

    ["parseUrlParameter"](Iiiii1) {
        try {
            const IIII1 = {},
                iIi1 = this.parseUrl(Iiiii1),
                I11IIl = new URLSearchParams(iIi1?.["search"]);

            for (const [Il11lI, I11IIi] of I11IIl) {
                IIII1[Il11lI] = I11IIi;
            }

            if (iIi1?.["hash"] && iIi1.hash.includes("#/")) {
                const IiiiiI = iIi1.hash.replace("#/", ""),
                    IIi1il = IiiiiI.includes("?") ? new URLSearchParams(IiiiiI.split("?").slice(1).join("?")) : new URLSearchParams();

                for (const [IIi1ii, lliIiI] of IIi1il) {
                    IIII1[IIi1ii] = lliIiI;
                }
            }

            return IIII1;
        } catch {
            return {};
        }
    }

    ["getUrlParameter"](IlliIl, IlliIi) {
        try {
            const ill1iI = this.parseUrl(IlliIl),
                Il11ll = ill1iI.searchParams.get(IlliIi);
            return Il11ll || "";
        } catch {
            return "";
        }
    }

    ["objectToQueryString"](Il11li) {
        try {
            const ii1II = [];

            for (const IIIIl in Il11li) {
                if (Il11li.hasOwnProperty(IIIIl)) {
                    const iIi1ll = Il11li[IIIIl],
                        liili1 = encodeURIComponent(IIIIl),
                        IIIIi = iIi1ll === null || iIi1ll === undefined ? "" : encodeURIComponent(iIi1ll);
                    ii1II.push(liili1 + "=" + IIIIi);
                }
            }

            return ii1II.join("&");
        } catch {
            return "";
        }
    }

    ["queryStringToObject"](iIil) {
        try {
            const l11I1I = {},
                Il1llI = iIil.split("&");

            for (const ii1I1 of Il1llI) {
                const [liiliI, iIi1lI] = ii1I1.split("=");
                l11I1I[decodeURIComponent(liiliI)] = iIi1lI === undefined ? null : decodeURIComponent(iIi1lI);
            }

            return l11I1I;
        } catch {
            return {};
        }
    }

    ["getResponseCookie"](IIIII, iIiI = "") {
        let llllIi = "";

        if (IIIII.headers["set-cookie"]) {
            for (let IIl11 of IIIII.headers["set-cookie"]) {
                llllIi += IIl11.split(";")[0].split("=")[0] + "=" + IIl11.split(";")[0].split("=")[1] + "; ";
            }
        } else iIiI && (llllIi = iIiI);

        return llllIi;
    }

    ["getCookieValue"](llllII, llil1l) {
        if (!llllII || !llil1l) return "";
        const li1iil = new RegExp(llil1l + "=" + "([^;]*)" + ";"),
            i1iI1l = li1iil.exec(llllII);
        return i1iI1l && i1iI1l[1] || "";
    }

    ["parseCookie"](lIllI) {
        const i1lIIl = {},
            lli1 = lIllI.split(";");

        for (const ilIi1I of lli1) {
            const [II1l1I, iiIii1] = ilIi1I.trim().split("=");
            i1lIIl[II1l1I] = iiIii1;
        }

        return i1lIIl;
    }

    ["getLatestIOSVersion"]() {
        return this._iOSVersionLatest || "";
    }

    async ["request"](li1iii) {
        let I1i1ii = {
            "success": false,
            "status": null,
            "data": null,
            "headers": null,
            "error": null,
            "connected": false
        },
            ll1i1i = this._requestDebugMode,
            lil1ii = null;

        try {
            if (!li1iii || !li1iii.url) return console.log("❌ 调用请求方法无效，缺少必要的参数！"), I1i1ii.error = "缺少必要的请求参数", I1i1ii;
            li1iii.hasOwnProperty("debug") && (ll1i1i = li1iii.debug, delete li1iii.debug);
            const lII1I1 = this._requestAxiosProxyConfig,
                IIl1I = this._requestDynamicProxyConfig,
                liilll = this._requestNoProxyList;
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
                "transformResponse": [iiIilI => {
                    try {
                        return JSON.parse(iiIilI);
                    } catch { }

                    try {
                        const iIll = /[\w$.]+\(\s*({[\s\S]*?})\s*\)\s*;?/;

                        if (iIll.test(iiIilI)) {
                            const li1il1 = iiIilI.match(iIll)[1];
                            return JSON.parse(li1il1);
                        }
                    } catch { }

                    return iiIilI;
                }]
            });
            li1iii.body && (li1iii.data = li1iii.body, delete li1iii.body);

            for (const lliI of ["data", "params"]) {
                if (!li1iii[lliI]) {
                    delete li1iii[lliI];
                }
            }

            li1iii.method = (li1iii.method || "get").toLowerCase();

            if (li1iii.proxy && typeof li1iii.proxy === "string") {
                const lIliil = this._getProxyConfig(li1iii.proxy);

                lIliil ? li1iii.proxy = lIliil : (console.log("❌ 代理配置无效，跳过使用代理"), delete li1iii.proxy);
            }

            li1iii.data && typeof li1iii.data === "object" && (!li1iii.headers || !li1iii.headers["Content-Type"] || li1iii.headers["Content-Type"].includes("application/x-www-form-urlencoded")) && (li1iii.data = querystring.stringify(li1iii.data));

            if (li1iii.httpsTlsOptions && typeof li1iii.httpsTlsOptions === "object" && li1iii.url.includes("https://")) {
                lil1ii = li1iii.httpsTlsOptions;
                Object.assign(https.globalAgent.options, lil1ii);
                delete li1iii.httpsTlsOptions;
            } else li1iii.hasOwnProperty("httpsTlsOptions") && delete li1iii.httpsTlsOptions;

            let ili1lI = false;

            if (!li1iii.hasOwnProperty("proxy") && !li1iii.hasOwnProperty("httpAgent") && !li1iii.hasOwnProperty("httpsAgent")) {
                if (lII1I1 || IIl1I) {
                    let I11i1 = true;
                    const iiIili = this.parseUrl(li1iii.url).hostname || li1iii.url;

                    for (const II1II1 of liilll) {
                        const llli = new RegExp("^" + II1II1.split("*").join(".*") + "$");

                        if (llli.test(iiIili.hostname)) {
                            I11i1 = false;

                            if (ll1i1i) {
                                console.log("ℹ️ 该代理请求命中 NO_PROXY 规则 ➜ " + II1II1);
                            }

                            break;
                        }
                    }

                    if (I11i1) {
                        if (lII1I1) {
                            li1iii.proxy = lII1I1;
                        } else {
                            if (IIl1I) {
                                if (IIl1I.proxyConfig) {
                                    li1iii.proxy = IIl1I.proxyConfig;
                                    ili1lI = true;
                                } else {
                                    const Illi1i = await this.getProxyAddressWithApi(IIl1I.api),
                                        lllI = this._getProxyConfig(Illi1i);

                                    if (lllI) Object.assign(IIl1I, {
                                        "extractTimestamp": Date.now(),
                                        "usedTimes": 0,
                                        "proxyConfig": lllI
                                    }), li1iii.proxy = lllI, console.log("刷新代理：" + lllI?.["host"] + ":" + lllI?.["port"]), ili1lI = true; else {
                                        if (!IIl1I.fetchFailContinue) {
                                            return I1i1ii.error = "获取动态代理地址失败，已设置跳过请求", I1i1ii;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            for (const IiliiI of ["proxy", "httpAgent", "httpsAgent"]) {
                !li1iii[IiliiI] && delete li1iii[IiliiI];
            }

            if (li1iii.proxy) {
                this._loadModule("HttpsProxyAgent");

                li1iii.httpsAgent = this._genHttpsAgentWithProxyConfig(li1iii.proxy);
                delete li1iii.proxy;
            }

            await axios(li1iii).then(lllIiI => {
                if (ili1lI) {
                    IIl1I.lastUseTimeStamp = Date.now();
                    IIl1I.usedTimes++;
                    const iiIill = IIl1I.useLimit > 0 && IIl1I.usedTimes >= IIl1I.useLimit,
                        li1ili = IIl1I.timeLimit > 0 && Date.now() - IIl1I.extractTimestamp >= IIl1I.timeLimit;
                    (iiIill || li1ili) && Object.assign(IIl1I, {
                        "proxyConfig": null,
                        "lastUseTimeStamp": null,
                        "extractTimestamp": null,
                        "usedTimes": 0
                    });
                }

                I1i1ii.success = true;
                I1i1ii.status = lllIiI.status;
                I1i1ii.data = lllIiI.data;
                I1i1ii.headers = lllIiI.headers;
                I1i1ii.connected = true;
                ll1i1i && this._handleRequestDebugPrint(lllIiI, true);
            }).catch(li1ill => {
                if (ili1lI) {
                    IIl1I.lastUseTimeStamp = Date.now();
                    IIl1I.usedTimes++;
                    const l1iliI = IIl1I.useLimit > 0 && IIl1I.usedTimes >= IIl1I.useLimit,
                        l1l1lI = IIl1I.timeLimit > 0 && Date.now() - IIl1I.extractTimestamp >= IIl1I.timeLimit;
                    (l1iliI || l1l1lI) && Object.assign(IIl1I, {
                        "proxyConfig": null,
                        "lastUseTimeStamp": null,
                        "extractTimestamp": null,
                        "usedTimes": 0
                    });
                }

                let il1I1i = null;

                if (li1ill.response) {
                    I1i1ii.connected = true;
                    const l11ii1 = li1ill.response?.["status"],
                        IliII = {
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
                    il1I1i = IliII[l11ii1] || "请求失败 [Response code " + l11ii1 + "]";
                } else {
                    if (ili1lI) {
                        Object.assign(IIl1I, {
                            "proxyConfig": null,
                            "lastUseTimeStamp": null,
                            "extractTimestamp": null,
                            "usedTimes": 0
                        });
                    }

                    if (li1ill.request) {
                        const i1I1il = {
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
                        il1I1i = i1I1il[li1ill.code] || "未知网络连接错误类型 [" + li1ill.code + "]";
                    } else il1I1i = li1ill.message || "未知错误状态";

                    if (li1ill.config?.["httpAgent"] || li1ill.config?.["httpsAgent"]) {
                        il1I1i += "（🌐该请求通过代理发出）";
                    }
                }

                I1i1ii.error = il1I1i;
                I1i1ii.status = li1ill.response?.["status"] || null;

                if (ll1i1i) {
                    this._handleRequestDebugPrint(li1ill, false);

                    console.log("❌ 请求失败原因 ➜ " + I1i1ii.error);
                }
            });
            lil1ii && Object.keys(lil1ii).forEach(Iii1I => {
                https.globalAgent.options[Iii1I] = null;
            });
        } catch (I11il) {
            I1i1ii.error = I11il.message || I11il;
            ll1i1i && console.log("❌ 在处理 HTTP 请求时遇到了错误 ➜ " + I11il);
        }

        return I1i1ii;
    }

    async ["get"](IIIiIi) {
        return await this.request(Object.assign({}, IIIiIi, {
            "method": "get"
        }));
    }

    async ["post"](illli) {
        return await this.request(Object.assign({}, illli, {
            "method": "post"
        }));
    }

    async ["put"](l1l1l1) {
        return await this.request(Object.assign({}, l1l1l1, {
            "method": "put"
        }));
    }

    async ["delete"](il1I1I) {
        return await this.request(Object.assign({}, il1I1I, {
            "method": "delete"
        }));
    }

    ["_handleRequestDebugPrint"](III, l11iii = true) {
        this._loadModule("TablePrint");

        if (!this._Table) return;
        const IiI1I1 = this._Table;
        console.log("------------------------ 🔧 REQUEST DEBUG ------------------------------");

        try {
            let ii1IiI = null,
                illl1 = null;
            ii1IiI = new IiI1I1({
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
            ii1IiI.addRow({
                "type": "请求结果",
                "info": "" + (l11iii ? "🟢" : III?.["response"] ? "🔴" : "❌") + (III?.["status"] ? " " + III.status : III?.["response"] ? " " + III.response?.["status"] : "") + " - " + "".concat(III?.["config"]?.["method"] || "未知").toUpperCase()
            });
            if (III?.["config"]?.["url"]) try {
                illl1 = new URL(III.config.url);
                ii1IiI.addRow({
                    "type": "请求地址",
                    "info": illl1.origin
                });
                ii1IiI.addRow({
                    "type": "请求路径",
                    "info": illl1.pathname
                });
            } catch {
                ii1IiI.addRow({
                    "type": "请求地址",
                    "info": III.config.url
                });
            }
            ii1IiI.printTable();
            if (illl1 && illl1?.["search"] || III?.["config"]?.["params"]) try {
                const l11iil = Object.assign({}, new URLSearchParams(illl1.search) || {}, III?.["config"]?.["params"] || {});

                if (Object.keys(l11iil).length > 0) {
                    ii1IiI = new IiI1I1({
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

                    for (let lII1Il in l11iil) {
                        ii1IiI.addRow({
                            "label": decodeURIComponent(lII1Il),
                            "value": decodeURIComponent(l11iil[lII1Il])
                        });
                    }

                    console.log("\n✧ 请求参数");
                    ii1IiI.printTable();
                }
            } catch { }

            if (III?.["config"]?.["httpAgent"] || III?.["config"]?.["httpsAgent"]) {
                const l1ilil = (III.config?.["httpAgent"] || III.config?.["httpsAgent"])?.["proxy"],
                    l1l1ll = {
                        "protocol": l1ilil.protocol.replace(":", ""),
                        "hostname": l1ilil.hostname
                    };
                l1ilil.port && (l1l1ll.port = l1ilil.port);
                if (l1ilil instanceof URL) (l1ilil.username || l1ilil.password) && (l1l1ll.username = l1ilil.username, l1l1ll.password = l1ilil.password); else {
                    if (l1ilil.auth) {
                        const l1ilii = l1ilil.auth.split(":");
                        l1l1ll.username = l1ilii[0];
                        l1l1ll.password = l1ilii[1];
                    }
                }
                ii1IiI = new IiI1I1({
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

                for (let l1l1li in l1l1ll) {
                    let i1I1li = l1l1ll[l1l1li];
                    typeof i1I1li === "object" && (i1I1li = JSON.stringify(i1I1li));
                    ii1IiI.addRow({
                        "label": l1l1li,
                        "value": i1I1li
                    });
                }

                console.log("\n✧ HTTP 代理配置");
                ii1IiI.printTable();
            }

            if (III?.["config"]?.["headers"]) {
                const l11ilI = III.config.headers;
                ii1IiI = new IiI1I1({
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

                for (let ii1Iil in l11ilI) {
                    let Iii1l = l11ilI[ii1Iil];
                    typeof Iii1l === "object" && (Iii1l = JSON.stringify(Iii1l));
                    ii1IiI.addRow({
                        "label": ii1Iil,
                        "value": Iii1l
                    });
                }

                console.log("\n✧ 请求 Headers");
                ii1IiI.printTable();
            }

            if (III?.["config"]?.["data"]) {
                let lllIll = III.config.data;

                if (typeof lllIll === "object") {
                    lllIll = JSON.stringify(JSON.parse(lllIll));
                } else {
                    if (typeof lllIll === "string") {
                        try {
                            const Iii1i = JSON.parse(lllIll);
                            lllIll = JSON.stringify(Iii1i);
                        } catch {
                            lllIll = JSON.stringify(lllIll).slice(1, -1);
                        }
                    }
                }

                console.log("\n✧ 请求 Body\n" + lllIll);
            }

            if (!l11iii && !III?.["response"]) {
                console.log("\n------------------------------------------------------------------------");
                return;
            }

            if (III?.["headers"]) {
                const lII1II = III.headers;
                ii1IiI = new IiI1I1({
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

                for (let I11li in lII1II) {
                    let IliIl = lII1II[I11li];
                    typeof IliIl !== "string" && (IliIl = JSON.stringify(IliIl));
                    ii1IiI.addRow({
                        "label": I11li,
                        "value": IliIl
                    });
                }

                console.log("\n✧ 响应 Headers");
                ii1IiI.printTable();
            }

            if (III?.["data"]) {
                let li1I11 = III.data;
                if (typeof li1I11 === "object") li1I11 = JSON.stringify(li1I11); else {
                    if (typeof li1I11 === "string") {
                        try {
                            const I1i1iI = JSON.parse(li1I11);
                            li1I11 = JSON.stringify(I1i1iI);
                        } catch {
                            li1I11 = JSON.stringify(li1I11).slice(1, -1);
                        }
                    }
                }
                console.log("\n✧ 响应 Body\n" + li1I11);
            }
        } catch (l1illl) {
            console.log("❌ 处理 REQUEST DEBUG PRINT 时遇到了错误 ➜ " + (l1illl.message || l1illl));
        }

        console.log("\n------------------------------------------------------------------------");
    }

    async ["getProxyAddressWithApi"](l11ill) {
        let l1illi = "";

        try {
            const liI11 = /\b(?:\d{1,3}\.){3}\d{1,3}:\d{1,5}\b/g,
                lIlI1I = {
                    "url": l11ill,
                    "method": "post",
                    "proxy": null,
                    "timeout": 30000
                };
            let iIi1i1 = 0,
                llII1 = null;
            const II1l1l = 1;

            while (iIi1i1 < II1l1l) {
                const II1l1i = await this.request(lIlI1I);

                if (!II1l1i.success) {
                    llII1 = II1l1i.error;
                    iIi1i1++;
                    continue;
                }

                if (!II1l1i.data) {
                    llII1 = "无响应数据";
                    iIi1i1++;
                    continue;
                }

                const iiIlI = II1l1i.data;

                if (typeof iiIlI === "object") {
                    if (iiIlI?.["data"]) {
                        let I1Ii1l = iiIlI.data;

                        if (Array.isArray(I1Ii1l) && I1Ii1l.length > 0) {
                            I1Ii1l = I1Ii1l[0];
                            if (I1Ii1l?.["ip"] && I1Ii1l?.["port"]) l1illi = I1Ii1l.ip + ":" + I1Ii1l.port; else I1Ii1l?.["IP"] && I1Ii1l?.["Port"] && (l1illi = I1Ii1l.IP + ":" + I1Ii1l.Port);
                        } else {
                            if (I1Ii1l?.["proxy_list"] && Array.isArray(I1Ii1l.proxy_list) && I1Ii1l.proxy_list.length > 0) {
                                const l1l = I1Ii1l.proxy_list[0];

                                if (typeof l1l === "object" && l1l?.["ip"] && l1l?.["port"]) {
                                    l1illi = l1l.ip + ":" + l1l.port;
                                } else l1illi = l1l;
                            }
                        }

                        l1illi && !liI11.test(l1illi) && (l1illi = "");
                    }

                    !l1illi && (llII1 = "接口响应数据异常：" + JSON.stringify(iiIlI));
                } else {
                    const iIIi1l = iiIlI.match(liI11);
                    iIIi1l && (l1illi = iIIi1l[0]);
                    !l1illi && (llII1 = "接口响应数据异常：" + iiIlI);
                }

                if (l1illi) {
                    return l1illi;
                }

                iIi1i1++;
            }

            iIi1i1 >= II1l1l && console.log("⚠ 提取代理地址失败 ➜ " + llII1);
        } catch (ii1Ill) {
            console.log("❌ 在处理请求代理API获取代理地址时遇到了错误\n" + ii1Ill);
        }

        return l1illi;
    }

    ["_getProxyConfig"](iiIl1 = "") {
        try {
            if (!iiIl1) return null;
            !iiIl1.includes("://") && (iiIl1 = "http://" + iiIl1);
            const i1Il = this.parseUrl(iiIl1);

            if (i1Il?.["hostname"]) {
                const il1IIl = {
                    "protocol": i1Il.protocol.replace(":", "") === "https" ? "https" : "http",
                    "host": i1Il.hostname,
                    "port": parseInt(i1Il?.["port"] || "8080")
                };

                if (i1Il?.["username"] || i1Il?.["password"]) {
                    il1IIl.auth = {
                        "username": i1Il?.["username"] || "",
                        "password": i1Il?.["password"] || ""
                    };
                }

                return il1IIl;
            }
        } catch { }

        return null;
    }

    ["_genHttpsAgentWithProxyConfig"](il1IIi) {
        try {
            if (!this._HttpsProxyAgent) {
                return null;
            }

            if (!il1IIi) return null;
            let i1Ili1 = (il1IIi?.["protocol"] || "http") + "://";
            return il1IIi?.["auth"] && (i1Ili1 += (il1IIi.auth?.["username"] || "") + ":" + (il1IIi.auth?.["password"] || "") + "@"), i1Ili1 += il1IIi?.["host"] + ":" + (il1IIi?.["port"] || "8080"), new this._HttpsProxyAgent(i1Ili1);
        } catch (llI1li) {
            console.log("❌ 加载代理时遇到了错误 ➜ " + (llI1li.message || llI1li));
        }

        return null;
    }

    async ["concTaskNormal"](Illii1 = "3", I111l = 100, il1l11) {
        let lI1I1 = false,
            I1lI1 = 0,
            l11lI1 = 0;

        async function lI1II(llI1l) {
            const I11I1l = await il1l11(llI1l);

            if (I11I1l) {
                if (typeof I11I1l === "boolean") lI1I1 = true; else typeof I11I1l === "object" && I11I1l?.["runEnd"] && (lI1I1 = true);
            }

            I1lI1--;
            i1Ilii();
        }

        async function i1Ilii() {
            while (I1lI1 < Illii1 && I111l > 0 && !lI1I1) {
                I111l--;
                I1lI1++;
                l11lI1++;
                await lI1II(l11lI1);
            }

            lI1I1 && (await new Promise(llI1I => {
                const iIiliI = setInterval(() => {
                    I1lI1 === 0 && (clearInterval(iIiliI), llI1I());
                }, 100);
            }));
        }

        const i1Ilil = Math.min(I111l, Illii1),
            llI11 = [];

        for (let iI1ii1 = 0; iI1ii1 < i1Ilil; iI1ii1++) {
            I111l--;
            I1lI1++;
            l11lI1++;
            llI11.push(lI1II(l11lI1));
        }

        await Promise.all(llI11);
        i1Ilii();
        await new Promise(iI1iiI => {
            const I11ii1 = setInterval(() => {
                if (I1lI1 === 0 || lI1I1) {
                    clearInterval(I11ii1);
                    iI1iiI();
                }
            }, 100);
        });
    }

    ["setCookie"](I1Iii) {
        this._Cookie = I1Iii;
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

    ["genUuid"](I1IlI = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", ii11I1 = "0123456789abcdef") {
        let ili1ll = "";

        for (let II1lIl of I1IlI) {
            if (II1lIl == "x") {
                ili1ll += ii11I1.charAt(Math.floor(Math.random() * ii11I1.length));
            } else {
                if (II1lIl == "X") ili1ll += ii11I1.charAt(Math.floor(Math.random() * ii11I1.length)).toUpperCase(); else {
                    ili1ll += II1lIl;
                }
            }
        }

        return ili1ll;
    }

    ["genUA"](I1Il1, I1l1ii = "jd") {
        if (this._UserAgentMap.has(I1Il1)) return this._UserAgentMap.get(I1Il1);
        const I1Ili = {
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
            iIl1iI = I1l1ii === "lite" ? "lite" : "jd",
            {
                app: lii1Ii,
                appBuild: lii1Il,
                client: ii11II,
                clientVersion: IillII
            } = I1Ili[iIl1iI],
            II1lI1 = [this._latestIOSVersion],
            iiII1I = II1lI1[Math.floor(Math.random() * II1lI1.length)],
            lIIIII = "iPhone; CPU iPhone OS " + iiII1I.replace(".", "_") + " like Mac OS X",
            Iiil1i = {
                "ud": CryptoJS.SHA1(I1Il1).toString(),
                "sv": iiII1I,
                "iad": ""
            },
            Iiil1l = JSON.stringify(this.getCipherConf(Iiil1i, iIl1iI)),
            II1lII = this.genUuid(),
            i1iilI = [lii1Ii, ii11II, IillII, "", "rn/" + II1lII, "M/5.0", "appBuild/" + lii1Il, "jdSupportDarkMode/0", "ef/1", "ep/" + encodeURIComponent(Iiil1l), "Mozilla/5.0 (" + lIIIII + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
            iiII11 = i1iilI.join(";");

        this._UserAgentMap.set(I1Il1, iiII11);

        if (this._Cookie) this._UserAgent = iiII11;
        return iiII11;
    }

    ["getJEH"](I11ili = "JD4iPhone/168960 (iPhone; iOS 17.3; Scale/3.00)") {
        return encodeURIComponent(JSON.stringify(this.getCipherConf({
            "User-Agent": encodeURIComponent(I11ili)
        })));
    }

    ["getJEC"](Ii1i1l) {
        return encodeURIComponent(JSON.stringify(this.getCipherConf({
            "pin": encodeURIComponent(Ii1i1l)
        })));
    }

    ["getCipherConf"](iiII1l, iiII1i = "jd") {
        if (iiII1l && typeof iiII1l === "object") {
            for (let i1iill in iiII1l) {
                iiII1l[i1iill] = this.Base64(iiII1l[i1iill]).encode();
            }
        } else iiII1l && typeof iiII1l === "string" ? iiII1l = this.Base64(iiII1l).encode() : iiII1l = {};

        return {
            "ciphertype": 5,
            "cipher": iiII1l,
            "ts": Math.floor(Date.now() / 1000),
            "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
            "version": "1.0.3",
            "appname": iiII1i === "lite" ? "com.jd.jdmobilelite" : "com.360buy.jdmobile",
            "ridx": -1
        };
    }

    ["Base64"](lI11iI, iI1ili = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
        return {
            "encode": () => {
                function II1IlI(IIiiI) {
                    IIiiI = IIiiI.replace(/rn/g, "n");
                    let II1Il1 = "",
                        i1liiI;

                    for (let lIlIi = 0; lIlIi < IIiiI.length; lIlIi++) {
                        i1liiI = IIiiI.charCodeAt(lIlIi);

                        if (i1liiI < 128) {
                            II1Il1 += String.fromCharCode(i1liiI);
                        } else i1liiI > 127 && i1liiI < 2048 ? (II1Il1 += String.fromCharCode(i1liiI >> 6 | 192), II1Il1 += String.fromCharCode(i1liiI & 63 | 128)) : (II1Il1 += String.fromCharCode(i1liiI >> 12 | 224), II1Il1 += String.fromCharCode(i1liiI >> 6 & 63 | 128), II1Il1 += String.fromCharCode(i1liiI & 63 | 128));
                    }

                    return II1Il1;
                }

                let lI11ll = "",
                    lIlII,
                    lI11li,
                    i1lii1,
                    lI11l1,
                    lIlIl,
                    IilIIl,
                    liilI1,
                    l1IiI1 = 0;
                lI11iI = II1IlI(lI11iI);

                while (l1IiI1 < lI11iI.length) {
                    lIlII = lI11iI.charCodeAt(l1IiI1++);
                    lI11li = lI11iI.charCodeAt(l1IiI1++);
                    i1lii1 = lI11iI.charCodeAt(l1IiI1++);
                    lI11l1 = lIlII >> 2;
                    lIlIl = (lIlII & 3) << 4 | lI11li >> 4;
                    IilIIl = (lI11li & 15) << 2 | i1lii1 >> 6;
                    liilI1 = i1lii1 & 63;
                    if (isNaN(lI11li)) IilIIl = liilI1 = 64; else isNaN(i1lii1) && (liilI1 = 64);
                    lI11ll = lI11ll + iI1ili.charAt(lI11l1) + iI1ili.charAt(lIlIl) + iI1ili.charAt(IilIIl) + iI1ili.charAt(liilI1);
                }

                while (lI11ll.length % 4 > 1) lI11ll += "=";

                return lI11ll;
            },
            "decode": () => {
                function iIi1Il(lI11ii) {
                    let lii11i = "",
                        ilIll,
                        I1l1i1,
                        lII,
                        iIl1i1 = 0;

                    while (iIl1i1 < lI11ii.length) {
                        ilIll = lI11ii.charCodeAt(iIl1i1);
                        if (ilIll < 128) lii11i += String.fromCharCode(ilIll), iIl1i1++; else ilIll > 191 && ilIll < 224 ? (I1l1i1 = lI11ii.charCodeAt(iIl1i1 + 1), lii11i += String.fromCharCode((ilIll & 31) << 6 | I1l1i1 & 63), iIl1i1 += 2) : (I1l1i1 = lI11ii.charCodeAt(iIl1i1 + 1), lII = lI11ii.charCodeAt(iIl1i1 + 2), lii11i += String.fromCharCode((ilIll & 15) << 12 | (I1l1i1 & 63) << 6 | lII & 63), iIl1i1 += 3);
                    }

                    return lii11i;
                }

                let IlI111 = "",
                    lil1I1,
                    lliill,
                    i1liii,
                    i1liil,
                    lii11I,
                    iiIII1,
                    li1iII,
                    lIIi1 = 0;

                while (lIIi1 < lI11iI.length) {
                    i1liil = iI1ili.indexOf(lI11iI.charAt(lIIi1++));
                    lii11I = iI1ili.indexOf(lI11iI.charAt(lIIi1++));
                    iiIII1 = iI1ili.indexOf(lI11iI.charAt(lIIi1++));
                    li1iII = iI1ili.indexOf(lI11iI.charAt(lIIi1++));
                    lil1I1 = i1liil << 2 | lii11I >> 4;
                    lliill = (lii11I & 15) << 4 | iiIII1 >> 2;
                    i1liii = (iiIII1 & 3) << 6 | li1iII;
                    IlI111 += String.fromCharCode(lil1I1);
                    if (iiIII1 != 64) IlI111 += String.fromCharCode(lliill);
                    if (li1iII != 64) IlI111 += String.fromCharCode(i1liii);
                }

                return IlI111 = iIi1Il(IlI111), IlI111;
            }
        };
    }

    async ["getLoginStatus"](iiIIIl = this._Cookie) {
        if (!iiIIIl) {
            return console.log("🚫 getLoginStatus 请求失败 ➜ 未设置Cookie"), undefined;
        }

        try {
            const i1lili = {
                "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
                "method": "get",
                "headers": {
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                    "Cookie": iiIIIl,
                    "Host": "plogin.m.jd.com",
                    "User-Agent": this._UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
                },
                "timeout": 30000,
                "debug": false
            };
            let ilIl1 = 0,
                lllIIi = null;
            const li1iIl = 1;

            while (ilIl1 < li1iIl) {
                const lIii1I = await this.request(i1lili);

                if (!lIii1I.success) {
                    lllIIi = "🚫 getLoginStatus 请求失败 ➜ " + lIii1I.error;
                    ilIl1++;
                    continue;
                }

                if (!lIii1I.data) {
                    lllIIi = "🚫 getLoginStatus 请求异常 ➜ 无响应数据";
                    ilIl1++;
                    continue;
                }

                const lliI1l = lIii1I.data?.["islogin"];
                if (lliI1l === "1") return true; else {
                    if (lliI1l === "0") return false;
                }
                ilIl1++;
            }

            if (ilIl1 >= li1iIl) {
                console.log(lllIIi);
            }
        } catch (li1iIi) {
            console.log("❌ getLoginStatus 在处理请求中遇到了错误\n" + li1iIi);
        }

        return undefined;
    }

    async ["joinShopMember"](liilII, lIIl1 = this._Cookie) {
        if (!lIIl1) return console.log("🚫 joinShopMember 请求失败 ➜ 未设置Cookie"), undefined;
        if (!liilII) return undefined;

        try {
            this._loadModule("h5st");

            const ilIii = {
                "appId": "27004",
                "appid": "shopmember_m_jd_com",
                "functionId": "bindWithVender",
                "clientVersion": "9.2.0",
                "client": "H5",
                "body": {
                    "venderId": liilII,
                    "shopId": liilII,
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
            if (!this._H5st) return undefined;
            const lIliIl = await this._H5st.getH5st(ilIii);
            if (!lIliIl.params) return undefined;
            const liilIi = {
                "url": "https://api.m.jd.com/client.action",
                "method": "post",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Origin": "https://pages.jd.com",
                    "Host": "api.m.jd.com",
                    "Accept": "*/*",
                    "User-Agent": this._UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
                    "Cookie": lIIl1
                },
                "data": lIliIl.params + "&area=&uuid=88888",
                "timeout": 30000
            },
                liilIl = await this.request(liilIi);
            if (!liilIl.success) return console.log("🚫 joinShopMember 请求失败 ➜ " + liilIl.error), undefined;
            if (!liilIl.data) return console.log("🚫 joinShopMember 请求异常 ➜ 无响应数据"), undefined;
            const iiIl1l = liilIl.data;

            if (iiIl1l?.["success"] === true) {
                if (iiIl1l?.["result"] && iiIl1l.result?.["giftInfo"]) for (let I11I1 of iiIl1l.result?.["giftInfo"]?.["giftList"]) {
                    console.log(" >> 入会获得：" + I11I1.discountString + I11I1.prizeName + I11I1.secondLineDesc);
                }
                if (iiIl1l?.["message"] === "加入店铺会员成功") return true; else {
                    if (iiIl1l?.["message"] === "活动太火爆，请稍后再试") {
                        console.log("🚫 加入店铺会员失败 ➜ " + iiIl1l.message);
                    } else return console.log("🚫 加入店铺会员失败 ➜ " + iiIl1l?.["message"]), false;
                }
            } else {
                if (iiIl1l?.["message"]) return console.log("🚫 加入店铺会员失败 ➜ " + iiIl1l.message), false; else console.log("🚫 加入店铺会员失败 ➜ " + JSON.stringify(iiIl1l));
            }
        } catch (Ii1) {
            console.log("❌ joinShopMember 在处理请求中遇到了错误\n" + Ii1);
        }

        return undefined;
    }

    async ["getShopMemberStatus"](IiiI1I, II1IiI = this._Cookie) {
        if (!II1IiI) {
            return console.log("🚫 getShopMemberStatus 请求失败 ➜ 未设置Cookie"), undefined;
        }

        if (!IiiI1I) return undefined;

        try {
            this._loadModule("h5st");

            const i1I1II = {
                "appId": "27004",
                "appid": "shopmember_m_jd_com",
                "functionId": "getShopOpenCardInfo",
                "clientVersion": "9.2.0",
                "client": "H5",
                "body": {
                    "venderId": IiiI1I,
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
            const I11II = await this._H5st.getH5st(i1I1II);
            if (!I11II.params) return undefined;
            const IiI1ii = {
                "url": "https://api.m.jd.com/client.action?" + I11II.params,
                "method": "get",
                "headers": {
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "https://api.m.jd.com",
                    "Host": "api.m.jd.com",
                    "Accept": "*/*",
                    "User-Agent": this._UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
                    "Cookie": II1IiI
                },
                "timeout": 30000
            },
                ii1llI = await this.request(IiI1ii);
            if (!ii1llI.success) return console.log("🚫 getShopMemberStatus 请求失败 ➜ " + ii1llI.error), undefined;
            if (!ii1llI.data) return console.log("🚫 getShopMemberStatus 请求异常 ➜ 无响应数据"), undefined;
            const ilIi1 = ii1llI.data;

            if (ilIi1?.["success"] === true) {
                console.log("去加入：" + (ilIi1.result?.["shopMemberCardInfo"]?.["venderCardName"] || "未知"));
                if (ilIi1?.["result"]?.["userInfo"]?.["openCardStatus"] === 1) return true; else {
                    return false;
                }
            } else ilIi1?.["message"] ? console.log("🚫 获取店铺会员状态异常 ➜ " + ilIi1.message) : console.log("🚫 获取店铺会员状态异常 ➜ " + JSON.stringify(ilIi1));
        } catch (lilli1) {
            console.log("❌ getShopMemberStatus 在处理请求中遇到了错误\n" + lilli1);
        }

        return undefined;
    }

    async ["followShop"](llll1l, i1lI1I, Iil = this._Cookie) {
        if (!Iil) return console.log("🚫 followShop 请求失败 ➜ 未设置Cookie"), undefined;
        if (!llll1l && typeof llll1l !== "boolean" || !i1lI1I) return undefined;

        try {
            const I11Il = {
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
                    "Cookie": Iil,
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/122.0.0.0"
                },
                "data": {
                    "functionId": "whx_followShop",
                    "body": JSON.stringify({
                        "shopId": i1lI1I,
                        "follow": llll1l
                    }),
                    "t": Date.now(),
                    "appid": "shop_m_jd_com",
                    "clientVersion": "11.0.0",
                    "client": "wh5"
                },
                "timeout": 30000
            },
                ii1lll = await this.request(I11Il);
            if (!ii1lll.success) return console.log("🚫 followShop 请求失败 ➜ " + ii1lll.error), undefined;

            if (!ii1lll.data) {
                return console.log("🚫 followShop 请求异常 ➜ 无响应数据"), undefined;
            }

            const lilliI = ii1lll.data;

            if (lilliI?.["code"] === "0") {
                if (lilliI?.["result"]?.["code"] === "0") {
                    return true;
                } else return false;
            } else {
                if (lilliI?.["msg"]) return false; else console.log("🚫 " + (llll1l ? "关注" : "取关") + "店铺异常 ➜ " + JSON.stringify(lilliI));
            }
        } catch (IIIiil) {
            console.log("❌ followShop 在处理请求中遇到了错误\n" + IIIiil);
        }

        return undefined;
    }

    ["useAppTls"](liiIll = {}) {
        return Object.assign({}, this._appHttpsTlsOptions, liiIll);
    }

    async ["concTask"](Ii11 = "3", ilIiII, i1i1l) {
        let IlIIiI = false,
            llll1I = 0,
            IiI1i1 = 0;

        async function i1lI1i(iIi1I1, iil11) {
            const l11l11 = await i1i1l(iIi1I1, iil11);

            if (l11l11) {
                if (typeof l11l11 === "boolean") IlIIiI = true; else typeof l11l11 === "object" && l11l11?.["runEnd"] && (IlIIiI = true);
            }

            llll1I--;
            Il1();
        }

        async function Il1() {
            while (llll1I < Ii11 && ilIiII.length > 0 && !IlIIiI) {
                const IlI11I = ilIiII.shift();
                llll1I++;
                IiI1i1++;
                await i1lI1i(IlI11I, IiI1i1);
            }

            IlIIiI && (await new Promise(l11l1i => {
                const lillii = setInterval(() => {
                    if (llll1I === 0) {
                        clearInterval(lillii);
                        l11l1i();
                    }
                }, 100);
            }));
        }

        const llll11 = Math.min(ilIiII.length, Ii11),
            illIi = [];

        for (let lilII1I = 0; lilII1I < llll11; lilII1I++) {
            const l1IiIill = ilIiII.shift();
            llll1I++;
            IiI1i1++;
            illIi.push(i1lI1i(l1IiIill, IiI1i1));
        }

        await Promise.all(illIi);
        Il1();
        await new Promise(IIII11il => {
            const ii1IIii1 = setInterval(() => {
                (llll1I === 0 || IlIIiI) && (clearInterval(ii1IIii1), IIII11il());
            }, 100);
        });
    }

    async ["getSign"](I1Iill1, iIililIi) {
        !this._hasInitAppSignConfig && (this._initAppSignConfig(), this._hasInitAppSignConfig = true);
        let lIlIlll1 = "";

        try {
            const I1Iilii = this._appSignConfig;

            if (I1Iilii.genSign) {
                try {
                    lIlIlll1 = I1Iilii.genSign(I1Iill1, iIililIi);
                } catch (ii1IIil1) {
                    console.log("🚫 getSign 获取本地签名遇到了错误 ➜ " + (ii1IIil1.message || ii1IIil1));
                }

                if (lIlIlll1) return lIlIlll1; else console.log("🚫 getSign 本地签名获取失败");
            }

            let IIlillll = {
                [I1Iilii.functionIdField]: I1Iill1,
                [I1Iilii.bodyField]: iIililIi
            };
            const iliIlill = {
                "url": I1Iilii.requestApi,
                "method": I1Iilii.requestMethod.toLowerCase(),
                "headers": {
                    "Content-Type": I1Iilii.requestContentType
                },
                "data": null,
                "timeout": 60000,
                "proxy": null,
                "debug": false
            };
            if (I1Iilii.requestMethod === "GET") I1Iilii.requestApi += "?" + this.objectToQueryString(IIlillll), delete iliIlill.data, delete iliIlill.headers["Content-Type"]; else {
                if (I1Iilii.requestContentType.indexOf("application/x-www-form-urlencoded") !== -1) typeof IIlillll[I1Iilii.bodyField] === "object" && (IIlillll[I1Iilii.bodyField] = JSON.stringify(IIlillll[I1Iilii.bodyField])), iliIlill.data = this.objectToQueryString(IIlillll); else {
                    iliIlill.data = JSON.stringify(IIlillll);
                }
            }
            const l1Ili1lI = await this.request(iliIlill);
            if (!l1Ili1lI.success) return console.log("🚫 getSign 请求失败 ➜ " + l1Ili1lI.error), lIlIlll1; else { }

            if (!l1Ili1lI.data) {
                return console.log("🚫 getSign 请求异常 ➜ 无响应数据"), lIlIlll1;
            }

            try {
                if (typeof l1Ili1lI.data === "object") {
                    let I1IiliI = l1Ili1lI?.["data"];
                    I1IiliI?.["data"] && (I1IiliI = I1IiliI.data);
                    if (I1IiliI?.["body"] && this._checkSignStrFormat(I1IiliI.body)) lIlIlll1 = I1IiliI.body; else {
                        if (I1IiliI?.["convertUrl"] && this._checkSignStrFormat(I1IiliI.convertUrl)) lIlIlll1 = I1IiliI.convertUrl; else I1IiliI?.["convertUrlNew"] && this._checkSignStrFormat(I1IiliI.convertUrlNew) && (lIlIlll1 = I1IiliI.convertUrlNew);
                    }
                    !lIlIlll1 && console.log("🚫 getSign 响应数据解析异常 ➜ " + JSON.stringify(I1IiliI));
                } else this._checkSignStrFormat(l1Ili1lI) ? lIlIlll1 = l1Ili1lI : console.log("🚫 getSign 响应数据解析异常 ➜ " + l1Ili1lI);
            } catch {
                console.log("🚫 getSign 响应数据解析异常 ➜ " + JSON.stringify(data));
            }
        } catch (l1lIIIi) {
            console.log("🚫 getSign 在处理请求中遇到了错误\n" + l1lIIIi);
        }

        return lIlIlll1;
    }

    ["_checkSignStrFormat"](iiI1iI11) {
        const IiIl11il = ["body=", "st=", "sign=", "sv="];

        for (let IiIl11ii = 0; IiIl11ii < IiIl11il.length; IiIl11ii++) {
            if (!iiI1iI11.includes(IiIl11il[IiIl11ii])) return false;
        }

        return true;
    }

    ["_loadModule"](iliIlili) {
        switch (iliIlili) {
            case "h5st":
                if (!this._H5st) {
                    try {
                        const {
                            H5st: i1II111i
                        } = require(this._jdCryptoModelPath);

                        this._H5st = i1II111i;
                    } catch (IiIl11ll) {
                        console.log("❌ h5st 组件加载失败");
                    }
                }

                break;

            case "TablePrint":
                if (!this._Table) try {
                    const {
                        Table: I1I1iII1
                    } = require("console-table-printer");

                    this._Table = I1I1iII1;
                } catch (IiIiiii1) {
                    console.log("❌ TablePrint 组件加载失败");
                }
                break;

            case "HttpsProxyAgent":
                if (!this._HttpsProxyAgent) {
                    try {
                        const {
                            HttpsProxyAgent: lliI1II1
                        } = require("https-proxy-agent");

                        this._HttpsProxyAgent = lliI1II1;
                    } catch (ii1IiI1) {
                        try {
                            const l1i111ii = require("https-proxy-agent");

                            this._HttpsProxyAgent = l1i111ii;
                        } catch (lliI1III) {
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