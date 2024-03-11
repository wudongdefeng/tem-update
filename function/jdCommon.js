/*
通用组件库
new Env('jdCommon');
*/

const path = require('path')
const axios = require('axios').default
const CryptoJS = require('crypto-js')
const querystring = require('querystring')

class JDCommon {
    constructor() {
        this._Cookie = "";
        this._UserAgent = "";
        this._UserAgentMap = new Map();
        this._appSignConfig = null;
        this._requestDebugMode = false;
        this._requestAxiosProxyConfig = null;
        this._requestDynamicProxyConfig = null;
        this._requestNoProxyList = [];
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
            const iilliilI = require.main.filename,
                i1iI1iii = path.basename(iilliilI, ".js");
            this._requestNoProxyList = (process.env[i1iI1iii + "_no_proxy"] || process.env.JD_COMMON_REQUEST_NO_PROXY || "").split(",").filter(liIiIii1 => liIiIii1 !== "");
            const I111IiII = process.env[i1iI1iii + "_http_proxy"] || process.env.JD_COMMON_REQUEST_HTTP_PROXY || "";

            if (I111IiII) {
                const I1I111lI = this._getProxyConfig(I111IiII);

                I1I111lI ? (this._requestAxiosProxyConfig = I1I111lI, console.log("🌐 已启用全局静态代理")) : console.log("❌ 提供的代理地址无效，跳过启用全局静态代理");
            } else {
                const IIiI1lli = process.env[i1iI1iii + "_http_dynamic_proxy_api"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_API || "";

                if (IIiI1lli) {
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
                    this._requestDynamicProxyConfig.api = IIiI1lli;
                    const ilIl1l1l = process.env[i1iI1iii + "_http_dynamic_proxy_use_limit"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_USE_LIMIT || "1";

                    try {
                        this._requestDynamicProxyConfig.useLimit = parseInt(ilIl1l1l);
                    } catch {
                        this._requestDynamicProxyConfig.useLimit = 1;
                    }

                    const l1iiIliI = process.env[i1iI1iii + "_http_dynamic_proxy_time_limit"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_TIME_LIMIT || "30000";

                    try {
                        this._requestDynamicProxyConfig.timeLimit = parseInt(l1iiIliI);
                    } catch {
                        this._requestDynamicProxyConfig.timeLimit = 10000;
                    }

                    this._requestDynamicProxyConfig.fetchFailContinue = (process.env[i1iI1iii + "_http_dynamic_proxy_fetch_fail_continue"] || process.env.JD_COMMON_REQUEST_HTTP_DYNAMIC_PROXY_FETCH_FAIL_CONTINUE || "false") === "true";
                    console.log("🌐 已启用全局动态代理");
                }
            }
        } catch (i1iliiil) {
            console.log("❌ 初始化 HTTP 请求配置时遇到了错误\n" + i1iliiil);
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
            const IiiIIlil = process.env.JD_SIGN_API_METHOD;
            IiiIIlil && IiiIIlil.toUpperCase() === "GET" ? this._appSignConfig.requestMethod = "GET" : this._appSignConfig.requestMethod = "POST";
        } catch { }

        try {
            const l11Ii11 = process.env.JD_SIGN_API_CONTENT_TYPE;
            l11Ii11 && l11Ii11.indexOf("application/x-www-form-urlencoded") !== -1 ? this._appSignConfig.requestContentType = l11Ii11 : this._appSignConfig.requestContentType = "application/json; charset=utf-8";
        } catch { }

        try {
            this._appSignConfig.genSign = require(this._genSignModelPath);
        } catch { }
    }

    ["genRandomString"](I1i1iii = 32, I11liil = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-") {
        const lllllli1 = I11liil.length;
        let lIlIiil = "";

        for (let i1lIIili = 0; i1lIIili < I1i1iii; i1lIIili++) {
            lIlIiil += I11liil.charAt(Math.floor(Math.random() * lllllli1));
        }

        return lIlIiil;
    }

    ["parseUrl"](iliIi1l) {
        try {
            const lllIIIl = new URL(iliIi1l);
            return lllIIIl;
        } catch (I1lliI1) {
            return {};
        }
    }

    ["parseUrlParameter"](II1lil1l) {
        try {
            const I1lIIIl = this.parseUrl(II1lil1l),
                lIiII = new URLSearchParams(I1lIIIl?.["search"]),
                IIiil11l = {};

            for (const [lI1iIliI, i1iIl1lI] of lIiII) {
                IIiil11l[lI1iIliI] = i1iIl1lI;
            }

            return IIiil11l;
        } catch {
            return {};
        }
    }

    ["getUrlParameter"](illl1iIi, IIli1i11) {
        try {
            const il11lliI = this.parseUrl(illl1iIi),
                IiiIli1l = il11lliI.searchParams.get(IIli1i11);
            return IiiIli1l || "";
        } catch {
            return "";
        }
    }

    ["objectToQueryString"](ii11I1Ii) {
        try {
            const IiiI1i = [];

            for (const II1li11i in ii11I1Ii) {
                if (ii11I1Ii.hasOwnProperty(II1li11i)) {
                    const l111lilI = ii11I1Ii[II1li11i],
                        Il1Il11i = encodeURIComponent(II1li11i),
                        lliiIlIi = l111lilI === null || l111lilI === undefined ? "" : encodeURIComponent(l111lilI);
                    IiiI1i.push(Il1Il11i + "=" + lliiIlIi);
                }
            }

            return IiiI1i.join("&");
        } catch {
            return "";
        }
    }

    ["queryStringToObject"](ilII1IiI) {
        try {
            const l1I1iil = {},
                i1lI1i11 = ilII1IiI.split("&");

            for (const I1il1ili of i1lI1i11) {
                const [llIil1, l11iI] = I1il1ili.split("=");
                l1I1iil[decodeURIComponent(llIil1)] = l11iI === undefined ? null : decodeURIComponent(l11iI);
            }

            return l1I1iil;
        } catch {
            return {};
        }
    }

    ["getResponseCookie"](iilI111i, IiiIIil = "") {
        let l1IiIl1i = "";

        if (iilI111i.headers["set-cookie"]) {
            for (let iIIIIiI1 of iilI111i.headers["set-cookie"]) {
                l1IiIl1i += iIIIIiI1.split(";")[0].split("=")[0] + "=" + iIIIIiI1.split(";")[0].split("=")[1] + "; ";
            }
        } else IiiIIil && (l1IiIl1i = IiiIIil);

        return l1IiIl1i;
    }

    ["getCookieValue"](I1iiIl1i, Il11Ii) {
        if (!I1iiIl1i || !Il11Ii) {
            return "";
        }

        const IIl1i1l = new RegExp(Il11Ii + "=" + "([^;]*)" + ";"),
            i11ilIlI = IIl1i1l.exec(I1iiIl1i);
        return i11ilIlI && i11ilIlI[1] || "";
    }

    ["parseCookie"](il1Iiiil) {
        const il1I11i = {},
            IIIllii = il1Iiiil.split(";");

        for (const I1IIlI1l of IIIllii) {
            const [IlIl1Ii1, Ilii1III] = I1IIlI1l.trim().split("=");
            il1I11i[IlIl1Ii1] = Ilii1III;
        }

        return il1I11i;
    }

    async ["request"](lli1IllI) {
        let IiiIII1l = {
            "success": false,
            "status": null,
            "data": null,
            "headers": null,
            "error": null,
            "connected": false
        },
            I111iIl = this._requestDebugMode;

        try {
            if (!lli1IllI || !lli1IllI.url) return console.log("❌ 调用请求方法无效，缺少必要的参数！"), IiiIII1l.error = "缺少必要的请求参数", IiiIII1l;
            lli1IllI.hasOwnProperty("debug") && (I111iIl = lli1IllI.debug, delete lli1IllI.debug);
            const Il1iI11 = this._requestAxiosProxyConfig,
                iIi11iii = this._requestDynamicProxyConfig,
                li1l1 = this._requestNoProxyList;
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
                "transformResponse": [I1IIl1i1 => {
                    try {
                        return JSON.parse(I1IIl1i1);
                    } catch { }

                    try {
                        const IIli1Il = /[\w$.]+\(\s*({[\s\S]*?})\s*\)\s*;?/;

                        if (IIli1Il.test(I1IIl1i1)) {
                            const IlIIIii1 = I1IIl1i1.match(IIli1Il)[1];
                            return JSON.parse(IlIIIii1);
                        }
                    } catch { }

                    return I1IIl1i1;
                }]
            });
            lli1IllI.body && (lli1IllI.data = lli1IllI.body, delete lli1IllI.body);

            for (const iI11l1ii of ["data", "params"]) {
                !lli1IllI[iI11l1ii] && delete lli1IllI[iI11l1ii];
            }

            lli1IllI.method = (lli1IllI.method || "get").toLowerCase();

            if (lli1IllI.proxy && typeof lli1IllI.proxy === "string") {
                const iIiIl11 = this._getProxyConfig(lli1IllI.proxy);

                iIiIl11 ? lli1IllI.proxy = iIiIl11 : (console.log("❌ 代理配置无效，跳过使用代理"), delete lli1IllI.proxy);
            }

            lli1IllI.data && typeof lli1IllI.data === "object" && (!lli1IllI.headers || !lli1IllI.headers["Content-Type"] || lli1IllI.headers["Content-Type"].includes("application/x-www-form-urlencoded")) && (lli1IllI.data = querystring.stringify(lli1IllI.data));
            let IIII1IIl = false;

            if (!lli1IllI.hasOwnProperty("proxy") && !lli1IllI.hasOwnProperty("httpAgent") && !lli1IllI.hasOwnProperty("httpsAgent")) {
                if (Il1iI11 || iIi11iii) {
                    let IIllii11 = true;
                    const Iiiil1l = this.parseUrl(lli1IllI.url).hostname || lli1IllI.url;

                    for (const li1IlilI of li1l1) {
                        const ii1I1Iii = new RegExp("^" + li1IlilI.split("*").join(".*") + "$");

                        if (ii1I1Iii.test(Iiiil1l.hostname)) {
                            IIllii11 = false;
                            I111iIl && console.log("ℹ️ 该代理请求命中 NO_PROXY 规则 ➜ " + li1IlilI);
                            break;
                        }
                    }

                    if (IIllii11) {
                        if (Il1iI11) lli1IllI.proxy = Il1iI11; else {
                            if (iIi11iii) {
                                if (iIi11iii.proxyConfig) lli1IllI.proxy = iIi11iii.proxyConfig, IIII1IIl = true; else {
                                    const liI1Iili = await this.getProxyAddressWithApi(iIi11iii.api),
                                        Il1iIl1l = this._getProxyConfig(liI1Iili);

                                    if (Il1iIl1l) Object.assign(iIi11iii, {
                                        "extractTimestamp": Date.now(),
                                        "usedTimes": 0,
                                        "proxyConfig": Il1iIl1l
                                    }), lli1IllI.proxy = Il1iIl1l, IIII1IIl = true; else {
                                        if (!iIi11iii.fetchFailContinue) return IiiIII1l.error = "获取动态代理地址失败，已设置跳过请求", IiiIII1l;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            for (const ll1I1I of ["proxy", "httpAgent", "httpsAgent"]) {
                !lli1IllI[ll1I1I] && delete lli1IllI[ll1I1I];
            }

            lli1IllI.proxy && (this._loadModule("HttpsProxyAgent"), lli1IllI.httpsAgent = this._genHttpsAgentWithProxyConfig(lli1IllI.proxy), delete lli1IllI.proxy);
            await axios(lli1IllI).then(i1lI11lI => {
                if (IIII1IIl) {
                    iIi11iii.lastUseTimeStamp = Date.now();
                    iIi11iii.usedTimes++;
                    const li1i1I1 = iIi11iii.useLimit > 0 && iIi11iii.usedTimes >= iIi11iii.useLimit,
                        ll1lll1l = iIi11iii.timeLimit > 0 && Date.now() - iIi11iii.extractTimestamp >= iIi11iii.timeLimit;
                    (li1i1I1 || ll1lll1l) && Object.assign(iIi11iii, {
                        "proxyConfig": null,
                        "lastUseTimeStamp": null,
                        "extractTimestamp": null,
                        "usedTimes": 0
                    });
                }

                IiiIII1l.success = true;
                IiiIII1l.status = i1lI11lI.status;
                IiiIII1l.data = i1lI11lI.data;
                IiiIII1l.headers = i1lI11lI.headers;
                IiiIII1l.connected = true;
                I111iIl && this._handleRequestDebugPrint(i1lI11lI, true);
            }).catch(l1ilil1 => {
                if (IIII1IIl) {
                    iIi11iii.lastUseTimeStamp = Date.now();
                    iIi11iii.usedTimes++;
                    const l11II1 = iIi11iii.useLimit > 0 && iIi11iii.usedTimes >= iIi11iii.useLimit,
                        IiI1lli = iIi11iii.timeLimit > 0 && Date.now() - iIi11iii.extractTimestamp >= iIi11iii.timeLimit;
                    (l11II1 || IiI1lli) && Object.assign(iIi11iii, {
                        "proxyConfig": null,
                        "lastUseTimeStamp": null,
                        "extractTimestamp": null,
                        "usedTimes": 0
                    });
                }

                let II1il1 = null;

                if (l1ilil1.response) {
                    IiiIII1l.connected = true;
                    const IIli1li = l1ilil1.response?.["status"],
                        il1iII1i = {
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
                    II1il1 = il1iII1i[IIli1li] || "请求失败 [Response code " + IIli1li + "]";
                } else {
                    IIII1IIl && Object.assign(iIi11iii, {
                        "proxyConfig": null,
                        "lastUseTimeStamp": null,
                        "extractTimestamp": null,
                        "usedTimes": 0
                    });

                    if (l1ilil1.request) {
                        const il11il1l = {
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
                            "ERR_QUICSESSION_VERSION_NEGOTIATION": "QUIC 会话版本协商失败"
                        };
                        II1il1 = il11il1l[l1ilil1.code] || "未知错误类型 [" + l1ilil1.code + "]";
                    } else II1il1 = "未知错误状态";

                    if (l1ilil1.config?.["httpAgent"] || l1ilil1.config?.["httpsAgent"]) {
                        II1il1 += "（🌐该请求通过代理发出）";
                    }
                }

                IiiIII1l.error = II1il1;
                IiiIII1l.status = l1ilil1.response?.["status"] || null;
                I111iIl && (this._handleRequestDebugPrint(l1ilil1, false), console.log("❌ 请求失败原因 ➜ " + IiiIII1l.error));
            });
        } catch (IiIiiiI) {
            IiiIII1l.error = IiIiiiI.message || IiIiiiI;
            I111iIl && console.log("❌ 在处理 HTTP 请求时遇到了错误 ➜ " + IiIiiiI);
        }

        return IiiIII1l;
    }

    async ["get"](iIlI1lI1) {
        return await this.request(Object.assign({}, iIlI1lI1, {
            "method": "get"
        }));
    }

    async ["post"](I111lIi1) {
        return await this.request(Object.assign({}, I111lIi1, {
            "method": "post"
        }));
    }

    async ["put"](i1111l1i) {
        return await this.request(Object.assign({}, i1111l1i, {
            "method": "put"
        }));
    }

    async ["delete"](IIIiill1) {
        return await this.request(Object.assign({}, IIIiill1, {
            "method": "delete"
        }));
    }

    ["_handleRequestDebugPrint"](iiIlllli, IIl1ii1l = true) {
        this._loadModule("TablePrint");

        if (!this._Table) return;
        const lIlII = this._Table;
        console.log("------------------------ 🔧 REQUEST DEBUG ------------------------------");

        try {
            let II11Ill = null,
                IlIlIIIl = null;
            II11Ill = new lIlII({
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
            II11Ill.addRow({
                "type": "请求结果",
                "info": "" + (IIl1ii1l ? "🟢" : iiIlllli?.["response"] ? "🔴" : "❌") + (iiIlllli?.["status"] ? " " + iiIlllli.status : iiIlllli?.["response"] ? " " + iiIlllli.response?.["status"] : "") + " - " + "".concat(iiIlllli?.["config"]?.["method"] || "未知").toUpperCase()
            });
            if (iiIlllli?.["config"]?.["url"]) try {
                IlIlIIIl = new URL(iiIlllli.config.url);
                II11Ill.addRow({
                    "type": "请求地址",
                    "info": IlIlIIIl.origin
                });
                II11Ill.addRow({
                    "type": "请求路径",
                    "info": IlIlIIIl.pathname
                });
            } catch {
                II11Ill.addRow({
                    "type": "请求地址",
                    "info": iiIlllli.config.url
                });
            }
            II11Ill.printTable();
            if (IlIlIIIl && IlIlIIIl?.["search"] || iiIlllli?.["config"]?.["params"]) try {
                const l11lIiiI = Object.assign({}, new URLSearchParams(IlIlIIIl.search) || {}, iiIlllli?.["config"]?.["params"] || {});

                if (Object.keys(l11lIiiI).length > 0) {
                    II11Ill = new lIlII({
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

                    for (let il11IiiI in l11lIiiI) {
                        II11Ill.addRow({
                            "label": decodeURIComponent(il11IiiI),
                            "value": decodeURIComponent(l11lIiiI[il11IiiI])
                        });
                    }

                    console.log("\n✧ 请求参数");
                    II11Ill.printTable();
                }
            } catch { }

            if (iiIlllli?.["config"]?.["httpAgent"] || iiIlllli?.["config"]?.["httpsAgent"]) {
                const liI1i11 = (iiIlllli.config?.["httpAgent"] || iiIlllli.config?.["httpsAgent"])?.["proxy"],
                    Ii1lIil1 = {
                        "protocol": liI1i11.protocol.replace(":", ""),
                        "hostname": liI1i11.hostname
                    };
                liI1i11.port && (Ii1lIil1.port = liI1i11.port);

                if (liI1i11 instanceof URL) {
                    (liI1i11.username || liI1i11.password) && (Ii1lIil1.username = liI1i11.username, Ii1lIil1.password = liI1i11.password);
                } else {
                    if (liI1i11.auth) {
                        const Illl1IlI = liI1i11.auth.split(":");
                        Ii1lIil1.username = Illl1IlI[0];
                        Ii1lIil1.password = Illl1IlI[1];
                    }
                }

                II11Ill = new lIlII({
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

                for (let iiIliIIi in Ii1lIil1) {
                    let i1il1lli = Ii1lIil1[iiIliIIi];
                    typeof i1il1lli === "object" && (i1il1lli = JSON.stringify(i1il1lli));
                    II11Ill.addRow({
                        "label": iiIliIIi,
                        "value": i1il1lli
                    });
                }

                console.log("\n✧ HTTP 代理配置");
                II11Ill.printTable();
            }

            if (iiIlllli?.["config"]?.["headers"]) {
                const Ii1iiiIi = iiIlllli.config.headers;
                II11Ill = new lIlII({
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

                for (let III1lIIl in Ii1iiiIi) {
                    let lllIii1l = Ii1iiiIi[III1lIIl];
                    typeof lllIii1l === "object" && (lllIii1l = JSON.stringify(lllIii1l));
                    II11Ill.addRow({
                        "label": III1lIIl,
                        "value": lllIii1l
                    });
                }

                console.log("\n✧ 请求Headers");
                II11Ill.printTable();
            }

            if (iiIlllli?.["config"]?.["data"]) {
                let i11Ii1i = iiIlllli.config.data;
                if (typeof i11Ii1i === "object") i11Ii1i = JSON.stringify(JSON.parse(i11Ii1i)); else {
                    if (typeof i11Ii1i === "string") try {
                        const iii1Ili = JSON.parse(i11Ii1i);
                        i11Ii1i = JSON.stringify(iii1Ili);
                    } catch {
                        i11Ii1i = JSON.stringify(i11Ii1i).slice(1, -1);
                    }
                }
                console.log("\n✧ 请求Body\n" + i11Ii1i);
            }

            if (!IIl1ii1l && !iiIlllli?.["response"]) {
                console.log("\n------------------------------------------------------------------------");
                return;
            }

            if (iiIlllli?.["headers"]) {
                const lliiIl1I = iiIlllli.headers;
                II11Ill = new lIlII({
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

                for (let I11ili in lliiIl1I) {
                    let iIlIIiii = lliiIl1I[I11ili];
                    typeof iIlIIiii !== "string" && (iIlIIiii = JSON.stringify(iIlIIiii));
                    II11Ill.addRow({
                        "label": I11ili,
                        "value": iIlIIiii
                    });
                }

                console.log("\n✧ 响应Headers");
                II11Ill.printTable();
            }

            if (iiIlllli?.["data"]) {
                let Iil1liII = iiIlllli.data;
                if (typeof Iil1liII === "object") Iil1liII = JSON.stringify(Iil1liII); else {
                    if (typeof Iil1liII === "string") try {
                        const i1lil11i = JSON.parse(Iil1liII);
                        Iil1liII = JSON.stringify(i1lil11i);
                    } catch {
                        Iil1liII = JSON.stringify(Iil1liII).slice(1, -1);
                    }
                }
                console.log("\n✧ 响应Body\n" + Iil1liII);
            }
        } catch (Il111l1) {
            console.log("❌ 处理 REQUEST DEBUG PRINT 时遇到了错误 ➜ " + (Il111l1.message || Il111l1));
        }

        console.log("\n------------------------------------------------------------------------");
    }

    async ["getProxyAddressWithApi"](IIliiIII) {
        let l11Il1i1 = "";

        try {
            const Ili11iii = /\b(?:\d{1,3}\.){3}\d{1,3}:\d{1,5}\b/g,
                IIIi1III = {
                    "url": IIliiIII,
                    "method": "post",
                    "proxy": null,
                    "timeout": 30000
                };
            let IIl1lIl = 0,
                liliiil = null;
            const IliiIlI = 1;

            while (IIl1lIl < IliiIlI) {
                const lliiliII = await this.request(IIIi1III);

                if (!lliiliII.success) {
                    liliiil = lliiliII.error;
                    IIl1lIl++;
                    continue;
                }

                if (!lliiliII.data) {
                    liliiil = "无响应数据";
                    IIl1lIl++;
                    continue;
                }

                const lIiI1IIl = lliiliII.data;

                if (typeof lIiI1IIl === "object") {
                    if (lIiI1IIl?.["data"]) {
                        let I1IiI1I1 = lIiI1IIl.data;

                        if (Array.isArray(I1IiI1I1) && I1IiI1I1.length > 0) {
                            I1IiI1I1 = I1IiI1I1[0];
                            if (I1IiI1I1?.["ip"] && I1IiI1I1?.["port"]) l11Il1i1 = I1IiI1I1.ip + ":" + I1IiI1I1.port; else I1IiI1I1?.["IP"] && I1IiI1I1?.["Port"] && (l11Il1i1 = I1IiI1I1.IP + ":" + I1IiI1I1.Port);
                        } else {
                            if (I1IiI1I1?.["proxy_list"] && Array.isArray(I1IiI1I1.proxy_list) && I1IiI1I1.proxy_list.length > 0) {
                                const iiI1iIi1 = I1IiI1I1.proxy_list[0];

                                if (typeof iiI1iIi1 === "object" && iiI1iIi1?.["ip"] && iiI1iIi1?.["port"]) {
                                    l11Il1i1 = iiI1iIi1.ip + ":" + iiI1iIi1.port;
                                } else l11Il1i1 = iiI1iIi1;
                            }
                        }

                        l11Il1i1 && !Ili11iii.test(l11Il1i1) && (l11Il1i1 = "");
                    }

                    if (!l11Il1i1) {
                        liliiil = "接口响应数据异常：" + JSON.stringify(lIiI1IIl);
                    }
                } else {
                    const il1li11 = lIiI1IIl.match(Ili11iii);

                    if (il1li11) {
                        l11Il1i1 = il1li11[0];
                    }

                    !l11Il1i1 && (liliiil = "接口响应数据异常：" + lIiI1IIl);
                }

                if (l11Il1i1) return l11Il1i1;
                IIl1lIl++;
            }

            IIl1lIl >= IliiIlI && console.log("⚠ 提取代理地址失败 ➜ " + liliiil);
        } catch (I11llII) {
            console.log("❌ 在处理请求代理API获取代理地址时遇到了错误\n" + I11llII);
        }

        return l11Il1i1;
    }

    ["_getProxyConfig"](liiilliI = "") {
        try {
            if (!liiilliI) {
                return null;
            }

            !liiilliI.includes("://") && (liiilliI = "http://" + liiilliI);
            const II1ilIIi = this.parseUrl(liiilliI);

            if (II1ilIIi?.["hostname"]) {
                const ilill1il = {
                    "protocol": II1ilIIi.protocol.replace(":", "") === "https" ? "https" : "http",
                    "host": II1ilIIi.hostname,
                    "port": parseInt(II1ilIIi?.["port"] || "8080")
                };
                return (II1ilIIi?.["username"] || II1ilIIi?.["password"]) && (ilill1il.auth = {
                    "username": II1ilIIi?.["username"] || "",
                    "password": II1ilIIi?.["password"] || ""
                }), ilill1il;
            }
        } catch { }

        return null;
    }

    ["_genHttpsAgentWithProxyConfig"](l11lI11) {
        try {
            if (!this._HttpsProxyAgent) return null;
            if (!l11lI11) return null;
            let IiIIIilI = (l11lI11?.["protocol"] || "http") + "://";
            return l11lI11?.["auth"] && (IiIIIilI += (l11lI11.auth?.["username"] || "") + ":" + (l11lI11.auth?.["password"] || "") + "@"), IiIIIilI += l11lI11?.["host"] + ":" + (l11lI11?.["port"] || "8080"), new this._HttpsProxyAgent(IiIIIilI);
        } catch (IIiIlllI) {
            console.log("❌ 加载代理时遇到了错误 ➜ " + (IIiIlllI.message || IIiIlllI));
        }

        return null;
    }

    async ["concTaskNormal"](iIliIill = "3", l1i1lI = 100, IIIillil) {
        let ilI1i1Ii = false,
            i1l1iI11 = 0,
            ilI111 = 0;

        async function Ii1IiIl(l1lIilii) {
            const lIi1I1I = await IIIillil(l1lIilii);

            if (lIi1I1I) {
                if (typeof lIi1I1I === "boolean") ilI1i1Ii = true; else typeof lIi1I1I === "object" && lIi1I1I?.["runEnd"] && (ilI1i1Ii = true);
            }

            i1l1iI11--;
            Ii1Il111();
        }

        async function Ii1Il111() {
            while (i1l1iI11 < iIliIill && l1i1lI > 0 && !ilI1i1Ii) {
                l1i1lI--;
                i1l1iI11++;
                ilI111++;
                await Ii1IiIl(ilI111);
            }

            ilI1i1Ii && (await new Promise(IlI11l => {
                const llliIil = setInterval(() => {
                    i1l1iI11 === 0 && (clearInterval(llliIil), IlI11l());
                }, 100);
            }));
        }

        const IiiIilI = Math.min(l1i1lI, iIliIill),
            iIIIilIi = [];

        for (let IliIi11i = 0; IliIi11i < IiiIilI; IliIi11i++) {
            l1i1lI--;
            i1l1iI11++;
            ilI111++;
            iIIIilIi.push(Ii1IiIl(ilI111));
        }

        await Promise.all(iIIIilIi);
        Ii1Il111();
        await new Promise(lllliIil => {
            const liIlilI = setInterval(() => {
                (i1l1iI11 === 0 || ilI1i1Ii) && (clearInterval(liIlilI), lllliIil());
            }, 100);
        });
    }

    ["setCookie"](l1llIi1i) {
        this._Cookie = l1llIi1i;
    }

    ["unsetCookie"]() {
        this._Cookie = "";
        this._UserAgent = "";
    }

    ["getCookie"]() {
        return this._Cookie;
    }

    ["genUuid"](liiIlll1 = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx", lI1ii1i1 = "0123456789abcdef") {
        let IIilIIl1 = "";

        for (let Il1lIili of liiIlll1) {
            if (Il1lIili == "x") IIilIIl1 += lI1ii1i1.charAt(Math.floor(Math.random() * lI1ii1i1.length)); else Il1lIili == "X" ? IIilIIl1 += lI1ii1i1.charAt(Math.floor(Math.random() * lI1ii1i1.length)).toUpperCase() : IIilIIl1 += Il1lIili;
        }

        return IIilIIl1;
    }

    ["genUA"](iilil1Il, ilII1iIl = "jd") {
        if (this._UserAgentMap.has(iilil1Il)) return this._UserAgentMap.get(iilil1Il);
        const liiIIi11 = {
            "jd": {
                "app": "jdapp",
                "appBuild": "168960",
                "client": "iPhone",
                "clientVersion": "12.3.1"
            },
            "lite": {
                "app": "jdltapp",
                "appBuild": "1490",
                "client": "iPhone",
                "clientVersion": "6.14.0"
            }
        },
            iI1IIi1 = ilII1iIl === "lite" ? "lite" : "jd",
            {
                app: Ili11iiI,
                appBuild: i11lIiI1,
                client: I1Il1I1i,
                clientVersion: i1lli1i1
            } = liiIIi11[iI1IIi1],
            lllii1l1 = ["17.3", "17.2", "17.1", "16.7", "15.6"],
            li1ll1iI = lllii1l1[Math.floor(Math.random() * lllii1l1.length)],
            iIi1ill = "iPhone; CPU iPhone OS " + li1ll1iI.replace(".", "_") + " like Mac OS X",
            Ii1IIl1 = {
                "ud": CryptoJS.SHA1(iilil1Il).toString(),
                "sv": li1ll1iI,
                "iad": ""
            },
            liiliIii = JSON.stringify(this.getCipherConf(Ii1IIl1, iI1IIi1)),
            il1iiIll = this.genUuid(),
            liiii1lI = [Ili11iiI, I1Il1I1i, i1lli1i1, "", "rn/" + il1iiIll, "M/5.0", "appBuild/" + i11lIiI1, "jdSupportDarkMode/0", "ef/1", "ep/" + encodeURIComponent(liiliIii), "Mozilla/5.0 (" + iIi1ill + ") AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148", "supportJDSHWK/1", ""],
            lliI1lll = liiii1lI.join(";");

        this._UserAgentMap.set(iilil1Il, lliI1lll);

        if (this._Cookie) this._UserAgent = lliI1lll;
        return lliI1lll;
    }

    ["getJEH"](lliill1 = "JD4iPhone/168960 (iPhone; iOS 17.3; Scale/3.00)") {
        return encodeURIComponent(JSON.stringify(this.getCipherConf({
            "User-Agent": encodeURIComponent(lliill1)
        })));
    }

    ["getJEC"](Il1i11II) {
        return encodeURIComponent(JSON.stringify(this.getCipherConf({
            "pin": encodeURIComponent(Il1i11II)
        })));
    }

    ["getCipherConf"](iI111l11, iIIIIi = "jd") {
        if (iI111l11 && typeof iI111l11 === "object") for (let IliIIIl1 in iI111l11) {
            iI111l11[IliIIIl1] = this.Base64(iI111l11[IliIIIl1]).encode();
        } else {
            if (iI111l11 && typeof iI111l11 === "string") {
                iI111l11 = this.Base64(iI111l11).encode();
            } else iI111l11 = {};
        }
        return {
            "ciphertype": 5,
            "cipher": iI111l11,
            "ts": Math.floor(Date.now() / 1000),
            "hdid": "JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw=",
            "version": "1.0.3",
            "appname": iIIIIi === "lite" ? "com.jd.jdmobilelite" : "com.360buy.jdmobile",
            "ridx": -1
        };
    }

    ["Base64"](l1Ilii1I, lIil1l1 = "KLMNOPQRSTABCDEFGHIJUVWXYZabcdopqrstuvwxefghijklmnyz0123456789+/") {
        return {
            "encode": () => {
                function I1I1ili1(iIlIIl1I) {
                    iIlIIl1I = iIlIIl1I.replace(/rn/g, "n");
                    let l11111lI = "",
                        iil11lll;

                    for (let lIllllIi = 0; lIllllIi < iIlIIl1I.length; lIllllIi++) {
                        iil11lll = iIlIIl1I.charCodeAt(lIllllIi);
                        if (iil11lll < 128) l11111lI += String.fromCharCode(iil11lll); else iil11lll > 127 && iil11lll < 2048 ? (l11111lI += String.fromCharCode(iil11lll >> 6 | 192), l11111lI += String.fromCharCode(iil11lll & 63 | 128)) : (l11111lI += String.fromCharCode(iil11lll >> 12 | 224), l11111lI += String.fromCharCode(iil11lll >> 6 & 63 | 128), l11111lI += String.fromCharCode(iil11lll & 63 | 128));
                    }

                    return l11111lI;
                }

                let liliIi1 = "",
                    I1111ii,
                    i111ii11,
                    IIliiIIl,
                    I1i1Iill,
                    llIlliII,
                    llIl1ll,
                    i1iiliII,
                    ii1Illil = 0;
                l1Ilii1I = I1I1ili1(l1Ilii1I);

                while (ii1Illil < l1Ilii1I.length) {
                    I1111ii = l1Ilii1I.charCodeAt(ii1Illil++);
                    i111ii11 = l1Ilii1I.charCodeAt(ii1Illil++);
                    IIliiIIl = l1Ilii1I.charCodeAt(ii1Illil++);
                    I1i1Iill = I1111ii >> 2;
                    llIlliII = (I1111ii & 3) << 4 | i111ii11 >> 4;
                    llIl1ll = (i111ii11 & 15) << 2 | IIliiIIl >> 6;
                    i1iiliII = IIliiIIl & 63;
                    if (isNaN(i111ii11)) llIl1ll = i1iiliII = 64; else isNaN(IIliiIIl) && (i1iiliII = 64);
                    liliIi1 = liliIi1 + lIil1l1.charAt(I1i1Iill) + lIil1l1.charAt(llIlliII) + lIil1l1.charAt(llIl1ll) + lIil1l1.charAt(i1iiliII);
                }

                while (liliIi1.length % 4 > 1) liliIi1 += "=";

                return liliIi1;
            },
            "decode": () => {
                function I11I1lii(Iii1III1) {
                    let li1li1lI = "",
                        I1l1Ill,
                        li1iII1i,
                        IilIi1ll,
                        I11I1i11 = 0;

                    while (I11I1i11 < Iii1III1.length) {
                        I1l1Ill = Iii1III1.charCodeAt(I11I1i11);
                        if (I1l1Ill < 128) li1li1lI += String.fromCharCode(I1l1Ill), I11I1i11++; else I1l1Ill > 191 && I1l1Ill < 224 ? (li1iII1i = Iii1III1.charCodeAt(I11I1i11 + 1), li1li1lI += String.fromCharCode((I1l1Ill & 31) << 6 | li1iII1i & 63), I11I1i11 += 2) : (li1iII1i = Iii1III1.charCodeAt(I11I1i11 + 1), IilIi1ll = Iii1III1.charCodeAt(I11I1i11 + 2), li1li1lI += String.fromCharCode((I1l1Ill & 15) << 12 | (li1iII1i & 63) << 6 | IilIi1ll & 63), I11I1i11 += 3);
                    }

                    return li1li1lI;
                }

                let iililI11 = "",
                    I11li1I1,
                    Iil1Ill,
                    I11IIIii,
                    IliiIli,
                    IlilliIi,
                    liII1i1I,
                    liIlll11,
                    iilIlIi = 0;

                while (iilIlIi < l1Ilii1I.length) {
                    IliiIli = lIil1l1.indexOf(l1Ilii1I.charAt(iilIlIi++));
                    IlilliIi = lIil1l1.indexOf(l1Ilii1I.charAt(iilIlIi++));
                    liII1i1I = lIil1l1.indexOf(l1Ilii1I.charAt(iilIlIi++));
                    liIlll11 = lIil1l1.indexOf(l1Ilii1I.charAt(iilIlIi++));
                    I11li1I1 = IliiIli << 2 | IlilliIi >> 4;
                    Iil1Ill = (IlilliIi & 15) << 4 | liII1i1I >> 2;
                    I11IIIii = (liII1i1I & 3) << 6 | liIlll11;
                    iililI11 += String.fromCharCode(I11li1I1);
                    if (liII1i1I != 64) iililI11 += String.fromCharCode(Iil1Ill);
                    if (liIlll11 != 64) iililI11 += String.fromCharCode(I11IIIii);
                }

                return iililI11 = I11I1lii(iililI11), iililI11;
            }
        };
    }

    async ["getLoginStatus"](iIl1iII1 = this._Cookie) {
        if (!iIl1iII1) return console.log("🚫 getLoginStatus 请求失败 ➜ 未设置Cookie"), undefined;

        try {
            const iiiIi1 = {
                "url": "https://plogin.m.jd.com/cgi-bin/ml/islogin",
                "method": "get",
                "headers": {
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                    "Cookie": iIl1iII1,
                    "Host": "plogin.m.jd.com",
                    "User-Agent": this._UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0"
                },
                "timeout": 30000,
                "debug": false
            };
            let lliII1i = 0,
                lIIll11 = null;
            const IIl11lI1 = 1;

            while (lliII1i < IIl11lI1) {
                const i1iiI1li = await this.request(iiiIi1);

                if (!i1iiI1li.success) {
                    lIIll11 = "🚫 getLoginStatus 请求失败 ➜ " + i1iiI1li.error;
                    lliII1i++;
                    continue;
                }

                if (!i1iiI1li.data) {
                    lIIll11 = "🚫 getLoginStatus 请求异常 ➜ 无响应数据";
                    lliII1i++;
                    continue;
                }

                const I11iIll = i1iiI1li.data?.["islogin"];
                if (I11iIll === "1") return true; else {
                    if (I11iIll === "0") return false;
                }
                lliII1i++;
            }

            lliII1i >= IIl11lI1 && console.log(lIIll11);
        } catch (iIllliii) {
            console.log("❌ getLoginStatus 在处理请求中遇到了错误\n" + iIllliii);
        }

        return undefined;
    }

    async ["joinShopMember"](Iil1ilIi, l1lIlliI = this._Cookie) {
        if (!l1lIlliI) return console.log("🚫 joinShopMember 请求失败 ➜ 未设置Cookie"), undefined;
        if (!Iil1ilIi) return undefined;

        try {
            this._loadModule("h5st");

            const I1lilIlI = {
                "appId": "27004",
                "appid": "shopmember_m_jd_com",
                "functionId": "bindWithVender",
                "clientVersion": "9.2.0",
                "client": "H5",
                "body": {
                    "venderId": Iil1ilIi,
                    "shopId": Iil1ilIi,
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

            const I1llII = await this._H5st.getH5st(I1lilIlI);
            if (!I1llII.params) return undefined;
            const l1ill1ll = {
                "url": "https://api.m.jd.com/client.action",
                "method": "post",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Origin": "https://pages.jd.com",
                    "Host": "api.m.jd.com",
                    "Accept": "*/*",
                    "User-Agent": this._UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
                    "Cookie": l1lIlliI
                },
                "data": I1llII.params + "&area=&uuid=88888",
                "timeout": 30000
            },
                liilli1l = await this.request(l1ill1ll);
            if (!liilli1l.success) return console.log("🚫 joinShopMember 请求失败 ➜ " + liilli1l.error), undefined;
            if (!liilli1l.data) return console.log("🚫 joinShopMember 请求异常 ➜ 无响应数据"), undefined;
            const iiii1lI1 = liilli1l.data;

            if (iiii1lI1?.["success"] === true) {
                if (iiii1lI1?.["result"] && iiii1lI1.result?.["giftInfo"]) {
                    for (let lI1IlIIi of iiii1lI1.result?.["giftInfo"]?.["giftList"]) {
                        console.log(" >> 入会获得：" + lI1IlIIi.discountString + lI1IlIIi.prizeName + lI1IlIIi.secondLineDesc);
                    }
                }

                if (iiii1lI1?.["message"] === "加入店铺会员成功") return true; else {
                    if (iiii1lI1?.["message"] === "活动太火爆，请稍后再试") console.log("🚫 加入店铺会员失败 ➜ " + iiii1lI1.message); else {
                        return console.log("🚫 加入店铺会员失败 ➜ " + iiii1lI1?.["message"]), false;
                    }
                }
            } else {
                if (iiii1lI1?.["message"]) {
                    return console.log("🚫 加入店铺会员失败 ➜ " + iiii1lI1.message), false;
                } else {
                    console.log("🚫 加入店铺会员失败 ➜ " + JSON.stringify(iiii1lI1));
                }
            }
        } catch (I1iiiII) {
            console.log("❌ joinShopMember 在处理请求中遇到了错误\n" + I1iiiII);
        }

        return undefined;
    }

    async ["getShopMemberStatus"](IIil1iii, llli = this._Cookie) {
        if (!llli) return console.log("🚫 getShopMemberStatus 请求失败 ➜ 未设置Cookie"), undefined;
        if (!IIil1iii) return undefined;

        try {
            this._loadModule("h5st");

            const Iii1l1li = {
                "appId": "27004",
                "appid": "shopmember_m_jd_com",
                "functionId": "getShopOpenCardInfo",
                "clientVersion": "9.2.0",
                "client": "H5",
                "body": {
                    "venderId": IIil1iii,
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
            const iIIl1II1 = await this._H5st.getH5st(Iii1l1li);

            if (!iIIl1II1.params) {
                return undefined;
            }

            const l1li1iII = {
                "url": "https://api.m.jd.com/client.action?" + iIIl1II1.params,
                "method": "get",
                "headers": {
                    "Content-Type": "application/json;charset=utf-8",
                    "Origin": "https://api.m.jd.com",
                    "Host": "api.m.jd.com",
                    "Accept": "*/*",
                    "User-Agent": this._UserAgent || "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/116.0.0.0",
                    "Cookie": llli
                },
                "timeout": 30000
            },
                II1lili = await this.request(l1li1iII);
            if (!II1lili.success) return console.log("🚫 getShopMemberStatus 请求失败 ➜ " + II1lili.error), undefined;

            if (!II1lili.data) {
                return console.log("🚫 getShopMemberStatus 请求异常 ➜ 无响应数据"), undefined;
            }

            const lilIIl1 = II1lili.data;

            if (lilIIl1?.["success"] === true) {
                console.log("去加入：" + (lilIIl1.result?.["shopMemberCardInfo"]?.["venderCardName"] || "未知"));

                if (lilIIl1?.["result"]?.["userInfo"]?.["openCardStatus"] === 1) {
                    return true;
                } else return false;
            } else lilIIl1?.["message"] ? console.log("🚫 获取店铺会员状态异常 ➜ " + lilIIl1.message) : console.log("🚫 获取店铺会员状态异常 ➜ " + JSON.stringify(lilIIl1));
        } catch (iIIIl1il) {
            console.log("❌ getShopMemberStatus 在处理请求中遇到了错误\n" + iIIIl1il);
        }

        return undefined;
    }

    async ["followShop"](i1Ill1I, IIIlil1l, l1liIili = this._Cookie) {
        if (!l1liIili) return console.log("🚫 followShop 请求失败 ➜ 未设置Cookie"), undefined;
        if (!i1Ill1I && typeof i1Ill1I !== "boolean" || !IIIlil1l) return undefined;

        try {
            const IlliIII = {
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
                    "Cookie": l1liIili,
                    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1 Edg/122.0.0.0"
                },
                "data": {
                    "functionId": "whx_followShop",
                    "body": JSON.stringify({
                        "shopId": IIIlil1l,
                        "follow": i1Ill1I
                    }),
                    "t": Date.now(),
                    "appid": "shop_m_jd_com",
                    "clientVersion": "11.0.0",
                    "client": "wh5"
                },
                "timeout": 30000
            },
                iliili11 = await this.request(IlliIII);
            if (!iliili11.success) return console.log("🚫 followShop 请求失败 ➜ " + iliili11.error), undefined;
            if (!iliili11.data) return console.log("🚫 followShop 请求异常 ➜ 无响应数据"), undefined;
            const lIIi1l1i = iliili11.data;

            if (lIIi1l1i?.["code"] === "0") {
                if (lIIi1l1i?.["result"]?.["code"] === "0") return true; else {
                    return false;
                }
            } else {
                if (lIIi1l1i?.["msg"]) return false; else console.log("🚫 " + (i1Ill1I ? "关注" : "取关") + "店铺异常 ➜ " + JSON.stringify(lIIi1l1i));
            }
        } catch (I1IiiIi) {
            console.log("❌ followShop 在处理请求中遇到了错误\n" + I1IiiIi);
        }

        return undefined;
    }

    async ["concTask"](III1l111 = "3", iliiIl11, lIl111Ii) {
        let lll1lI = false,
            il1l111 = 0,
            IlIiIII = 0;

        async function IiIi1iil(IliIi111, iiIl1Iii) {
            const l1IiIllI = await lIl111Ii(IliIi111, iiIl1Iii);

            if (l1IiIllI) {
                if (typeof l1IiIllI === "boolean") lll1lI = true; else typeof l1IiIllI === "object" && l1IiIllI?.["runEnd"] && (lll1lI = true);
            }

            il1l111--;
            ilIIiIl();
        }

        async function ilIIiIl() {
            while (il1l111 < III1l111 && iliiIl11.length > 0 && !lll1lI) {
                const lIi11lIi = iliiIl11.shift();
                il1l111++;
                IlIiIII++;
                await IiIi1iil(lIi11lIi, IlIiIII);
            }

            lll1lI && (await new Promise(i1iilII1 => {
                const lilI1li = setInterval(() => {
                    il1l111 === 0 && (clearInterval(lilI1li), i1iilII1());
                }, 100);
            }));
        }

        const iIll1i1 = Math.min(iliiIl11.length, III1l111),
            Il1I1li = [];

        for (let i1lliIIi = 0; i1lliIIi < iIll1i1; i1lliIIi++) {
            const IlIlIiIl = iliiIl11.shift();
            il1l111++;
            IlIiIII++;
            Il1I1li.push(IiIi1iil(IlIlIiIl, IlIiIII));
        }

        await Promise.all(Il1I1li);
        ilIIiIl();
        await new Promise(lilIl11i => {
            const IIi1iI = setInterval(() => {
                (il1l111 === 0 || lll1lI) && (clearInterval(IIi1iI), lilIl11i());
            }, 100);
        });
    }

    async ["getSign"](iI1liil, li1l1ll1) {
        if (!this._hasInitAppSignConfig) {
            this._initAppSignConfig();

            this._hasInitAppSignConfig = true;
        }

        let iIii1iil = "";

        try {
            const lIIl111 = this._appSignConfig;

            if (lIIl111.genSign) {
                try {
                    iIii1iil = lIIl111.genSign(iI1liil, li1l1ll1);
                } catch (IlIi1l1i) {
                    console.log("🚫 getSign 获取本地签名遇到了错误 ➜ " + (IlIi1l1i.message || IlIi1l1i));
                }

                if (iIii1iil) {
                    return iIii1iil;
                } else console.log("🚫 getSign 本地签名获取失败");
            }

            let II11lIII = {
                [lIIl111.functionIdField]: iI1liil,
                [lIIl111.bodyField]: li1l1ll1
            };
            const IlIII11 = {
                "url": lIIl111.requestApi,
                "method": lIIl111.requestMethod.toLowerCase(),
                "headers": {
                    "Content-Type": lIIl111.requestContentType
                },
                "data": null,
                "timeout": 60000,
                "proxy": null,
                "debug": false
            };
            if (lIIl111.requestMethod === "GET") lIIl111.requestApi += "?" + this.objectToQueryString(II11lIII), delete IlIII11.data, delete IlIII11.headers["Content-Type"]; else {
                if (lIIl111.requestContentType.indexOf("application/x-www-form-urlencoded") !== -1) {
                    typeof II11lIII[lIIl111.bodyField] === "object" && (II11lIII[lIIl111.bodyField] = JSON.stringify(II11lIII[lIIl111.bodyField]));
                    IlIII11.data = this.objectToQueryString(II11lIII);
                } else IlIII11.data = JSON.stringify(II11lIII);
            }
            const li11illi = await this.request(IlIII11);
            if (!li11illi.success) return console.log("🚫 getSign 请求失败 ➜ " + li11illi.error), iIii1iil; else { }
            if (!li11illi.data) return console.log("🚫 getSign 请求异常 ➜ 无响应数据"), iIii1iil;

            try {
                if (typeof li11illi.data === "object") {
                    let Ii1li11l = li11illi?.["data"];
                    Ii1li11l?.["data"] && (Ii1li11l = Ii1li11l.data);
                    if (Ii1li11l?.["body"] && this._checkSignStrFormat(Ii1li11l.body)) iIii1iil = Ii1li11l.body; else {
                        if (Ii1li11l?.["convertUrl"] && this._checkSignStrFormat(Ii1li11l.convertUrl)) iIii1iil = Ii1li11l.convertUrl; else Ii1li11l?.["convertUrlNew"] && this._checkSignStrFormat(Ii1li11l.convertUrlNew) && (iIii1iil = Ii1li11l.convertUrlNew);
                    }
                    !iIii1iil && console.log("🚫 getSign 响应数据解析异常 ➜ " + JSON.stringify(Ii1li11l));
                } else {
                    if (this._checkSignStrFormat(li11illi)) iIii1iil = li11illi; else {
                        console.log("🚫 getSign 响应数据解析异常 ➜ " + li11illi);
                    }
                }
            } catch {
                console.log("🚫 getSign 响应数据解析异常 ➜ " + JSON.stringify(data));
            }
        } catch (i11liIil) {
            console.log("🚫 getSign 在处理请求中遇到了错误\n" + i11liIil);
        }

        return iIii1iil;
    }

    ["_checkSignStrFormat"](i11I1l1I) {
        const iiIllll = ["body=", "st=", "sign=", "sv="];

        for (let l1i11lI = 0; l1i11lI < iiIllll.length; l1i11lI++) {
            if (!i11I1l1I.includes(iiIllll[l1i11lI])) return false;
        }

        return true;
    }

    ["_loadModule"](I1llIll1) {
        switch (I1llIll1) {
            case "h5st":
                if (!this._H5st) try {
                    const {
                        H5st: I1i1il11
                    } = require(this._jdCryptoModelPath);

                    this._H5st = I1i1il11;
                } catch (lI1lii1i) {
                    console.log("❌ h5st 组件加载失败");
                }
                break;

            case "TablePrint":
                if (!this._Table) try {
                    const {
                        Table: iIi1IlIi
                    } = require("console-table-printer");

                    this._Table = iIi1IlIi;
                } catch (i11l1Ill) {
                    console.log("❌ TablePrint 组件加载失败");
                }
                break;

            case "HttpsProxyAgent":
                if (!this._HttpsProxyAgent) try {
                    const {
                        HttpsProxyAgent: l1ii1il
                    } = require("https-proxy-agent");

                    this._HttpsProxyAgent = l1ii1il;
                } catch (i11lI11) {
                    try {
                        const l111l1ll = require("https-proxy-agent");

                        this._HttpsProxyAgent = l111l1ll;
                    } catch (Iiliili) {
                        console.log("❌ https-proxy-agent 代理模块加载失败");
                    }
                }
                break;

            default:
                break;
        }
    }

}

module.exports = new JDCommon();