/*
积分换话费
入口：首页-生活·缴费-积分换话费 
update：2023/6/23
40 8,18 * * * jd_dwapp.js
*/

const USER_AGENTS = require("./USER_AGENTS");
const H5ST=require('./utils/h5st.js');
const $ = new Env('积分换话费');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
CryptoJS = $.isNode() ? require('crypto-js') : CryptoJS;
//IOS等用户直接用NobyDa的jd cookie
let cookiesArr = [], cookie = '';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => { cookiesArr.push(jdCookieNode[item]) })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => { };
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
        return;
    }
    $.UAS={};
    $.H5ST31={};
    $.jsTks={};
    let body,res;
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            message = '';
            //await TotalBean();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);

            get_UA();
            $.log("去签到")
            body = await sign();
            body.channelSource = 'txzs';
            res=await JDTaskApi("dwSign","DATAWALLET_USER_SIGN",body)
            if (res) {
                if (res.code === 200) {
                    console.log(`签到成功：获得积分${res.data.signInfo.signNum}`);
                    $.log(`总积分：${res.data.totalNum}\n`);
                } else if(res.code === 302){
                        console.log("已完成签到！！！\n");
                } else if(res.code === 201){//过期了
                    $.isLogin=false;
                } else {
                    $.log(JSON.stringify(res));
                }
            }else{
                continue;
            }

            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, { "open-url": "https://bean.m.jd.com/bean/signIndex.action" });
                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }

            await $.wait(2000);
            body = await sign();
            body.channelSource = 'txzs';
            res=await JDTaskApi("dwList", 'dwapp_task_dwList',body);
            if (res) {
                if (res.code === 200) {
                    let tasklist = res.data;
                    for (let i = 0; i < tasklist.length; i++) {
                        let e = tasklist[i];
                        if (e.viewStatus == 0) {
                            console.log(`去做 ${e.taskDesc}`);
                            await taskrecord(e.id);
                            await $.wait(3000);
                            console.log(`去领积分`);
                            await taskreceive(e.id)
                        } else if (e.viewStatus == 2) {
                            console.log(`去领积分`);
                            await taskreceive(e.id);
                        } else if (e.viewStatus == 1) {
                            $.log(`${e.name} 已完成浏览`);
                        }
                    }
                } else {
                    $.log("dwapp_task_dwList",JSON.stringify(res));
                }
            }
            await $.wait(5000);
        }
    }
})().catch((e) => { $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '') }).finally(() => { $.done(); })

async function taskrecord(id) {
    enc = await sign(id + "1")
    let body = { "id": id, "agentNum": "m", "taskType": 1, "followChannelStatus": "", ...enc }
    return new Promise(resolve => {
        $.post(taskPostUrl("task/dwRecord", body), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${err}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data)
                    if (data) {
                        if (data.code === 200) {
                            if (data.data.dwUserTask) {
                                $.log("----领取任务成功")
                            } else {
                                $.log("----此任务已经领取过了")
                            }
                        } else {
                            console.log(JSON.stringify(data))
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })

}

async function taskreceive(id) {
    enc = await sign(id)
    let body = { "id": id, ...enc }
    return new Promise(resolve => {
        $.post(taskPostUrl("task/dwReceive", body), (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${err}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    data = JSON.parse(data)
                    if (data) {
                        if (data.code === 200 && data.data.success) {
                            console.log(`----领取成功：获得${data.data.giveScoreNum}积分`);
                        } else if (data.code === 200 && !data.data.success) {
                            console.log("----积分已经领取完了");
                        } else {
                            console.log(JSON.stringify(data));
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}

async function get_jsTk(){
    if( $.jsTks[$.UserName] ) return $.jsTks[$.UserName];
    const t = new Date().getTime()
    const g = {
        "pin":"",//PIK56FZ7O2A45WLSH5QZOO7UR4
        "oid":"","bizId":"jdtxsm",
        "fc":"",//CEMVDUKH5W7UQ6G4HCYRDEPJQTJCARIOF4ERU4VBU6EZ3RYC3GEVFN263Q7GUY2ZYGU44SXIOF35QRHHO2KFGLH4NQ
        "mode":"strict","p":"s",
        "fp":"",//595c5e5bd6910d7c7d82226dbd3bf48e
        "ctype":1,"v":"3.1.1.0","f":"3","o":"txsm-m.jd.com/","qs":"",
        "jsTk":"",//jdd03CEMVDUKH5W7UQ6G4HCYRDEPJQTJCARIOF4ERU4VBU6EZ3RYC3GEVFN263Q7GUY2ZYGU44SXIOF35QRHHO2KFGLH4NQAAAAMJBRLCPTYAAAAACJU6MC6G7BYUJEX
        "qi":""
    }
    const TDEncrypt = function(m) {
        m = JSON.stringify(m);
        m = encodeURIComponent(m);
        var n = "",
        g = 0
        s64="23IL<N01c7KvwZO56RSTAfghiFyzWJqVabGH4PQdopUrsCuX*xeBjkltDEmn89.-";
        do {
            var f = m.charCodeAt(g++);
            var d = m.charCodeAt(g++);
            var a = m.charCodeAt(g++);
            var b = f >> 2;
            f = (f & 3) << 4 | d >> 4;
            var e = (d & 15) << 2 | a >> 6;
            var c = a & 63;
            isNaN(d) ? e = c = 64 : isNaN(a) && (c = 64);
            n = n + s64.charAt(b) + 
            s64.charAt(f) + 
            s64.charAt(e) + 
            s64.charAt(c)
        } while ( g < m.length );
        return n + "/"
    };
    const a = TDEncrypt(g);
    let d = '{"ts":{"deviceTime":1688129311800,"deviceEndTime":1688129311881},"ca":{"tdHash":"5387f55fe4c68e0e688d9254a64e72d4","contextName":"webgl,experimental-webgl","webglversion":"WebGL 1.0 (OpenGL ES 2.0 Chromium)","shadingLV":"WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)","vendor":"WebKit","renderer":"WebKit WebGL","extensions":["ANGLE_instanced_arrays","EXT_blend_minmax","EXT_color_buffer_half_float","EXT_disjoint_timer_query","EXT_float_blend","EXT_frag_depth","EXT_shader_texture_lod","EXT_texture_compression_bptc","EXT_texture_compression_rgtc","EXT_texture_filter_anisotropic","EXT_sRGB","KHR_parallel_shader_compile","OES_element_index_uint","OES_fbo_render_mipmap","OES_standard_derivatives","OES_texture_float","OES_texture_float_linear","OES_texture_half_float","OES_texture_half_float_linear","OES_vertex_array_object","WEBGL_color_buffer_float","WEBGL_compressed_texture_s3tc","WEBGL_compressed_texture_s3tc_srgb","WEBGL_debug_renderer_info","WEBGL_debug_shaders","WEBGL_depth_texture","WEBGL_draw_buffers","WEBGL_lose_context","WEBGL_multi_draw"],"wuv":"Google Inc. (Intel)","wur":"ANGLE (Intel, Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0, D3D11)"},"m":{"compatMode":"CSS1Compat"},"fo":["Arial Black","Bauhaus 93","Bookman Old Style","Calibri","Century Gothic","FangSong","Franklin Gothic Heavy","Gabriola","Impact","Malgun Gothic","MingLiU-ExtB","MS Reference Sans Serif","Segoe Print","SimHei"],"n":{"vendorSub":"","productSub":"20030107","vendor":"Google Inc.","maxTouchPoints":1,"pdfViewerEnabled":false,"hardwareConcurrency":12,"cookieEnabled":true,"appCodeName":"Mozilla","appName":"Netscape","appVersion":"","platform":"Win32","product":"Gecko","userAgent":"","language":"zh-CN","onLine":true,"webdriver":false,"javaEnabled":false,"deviceMemory":8,"enumerationOrder":["vendorSub","productSub","vendor","maxTouchPoints","scheduling","userActivation","doNotTrack","geolocation","connection","plugins","mimeTypes","pdfViewerEnabled","webkitTemporaryStorage","webkitPersistentStorage","hardwareConcurrency","cookieEnabled","appCodeName","appName","appVersion","platform","product","userAgent","language","languages","onLine","webdriver","getGamepads","javaEnabled","sendBeacon","vibrate","bluetooth","clipboard","credentials","keyboard","managed","mediaDevices","storage","serviceWorker","virtualKeyboard","wakeLock","deviceMemory","ink","hid","locks","mediaCapabilities","mediaSession","permissions","presentation","serial","gpu","usb","windowControlsOverlay","xr","userAgentData","canShare","share","clearAppBadge","getBattery","getUserMedia","requestMIDIAccess","requestMediaKeySystemAccess","setAppBadge","webkitGetUserMedia","getInstalledRelatedApps","registerProtocolHandler","unregisterProtocolHandler"]},"p":[],"w":{"devicePixelRatio":1.25,"screenTop":0,"screenLeft":0},"s":{"availHeight":700,"availWidth":400,"colorDepth":24,"height":700,"width":400,"pixelDepth":24},"sc":{"ActiveBorder":"rgb(118, 118, 118)","ActiveCaption":"rgb(0, 0, 0)","AppWorkspace":"rgb(255, 255, 255)","Background":"rgb(255, 255, 255)","ButtonFace":"rgb(239, 239, 239)","ButtonHighlight":"rgb(239, 239, 239)","ButtonShadow":"rgb(239, 239, 239)","ButtonText":"rgb(0, 0, 0)","CaptionText":"rgb(0, 0, 0)","GrayText":"rgb(128, 128, 128)","Highlight":"rgb(181, 213, 255)","HighlightText":"rgb(0, 0, 0)","InactiveBorder":"rgb(118, 118, 118)","InactiveCaption":"rgb(255, 255, 255)","InactiveCaptionText":"rgb(128, 128, 128)","InfoBackground":"rgb(255, 255, 255)","InfoText":"rgb(0, 0, 0)","Menu":"rgb(255, 255, 255)","MenuText":"rgb(0, 0, 0)","Scrollbar":"rgb(255, 255, 255)","ThreeDDarkShadow":"rgb(118, 118, 118)","ThreeDFace":"rgb(239, 239, 239)","ThreeDHighlight":"rgb(118, 118, 118)","ThreeDLightShadow":"rgb(118, 118, 118)","ThreeDShadow":"rgb(118, 118, 118)","Window":"rgb(255, 255, 255)","WindowFrame":"rgb(118, 118, 118)","WindowText":"rgb(0, 0, 0)"},"ss":{"cookie":true,"localStorage":true,"sessionStorage":true,"globalStorage":false,"indexedDB":true},"tz":-480,"lil":"","wil":""}'
    d = JSON.parse(d)
    d["ts"]["deviceTime"] = t
    d["ts"]["deviceEndTime"] = t + 77
    d["n"]["appVersion"] = $.UA.substring($.UA.indexOf("appBuild/") + 9)
    d["n"]["userAgent"] = $.UA
    var opt = {
        url:`https://gia.jd.com/jsTk.do?a=${encodeURIComponent(a)}`,
        headers: {
            "Host": "gia.jd.com",
            "Connection": "keep-alive",
            "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            "Accept":"*/*",
            "Origin": "https://txsm-m.jd.com/",
            "X-Requested-With": "com.jd.jdlite",
            "Sec-Fetch-Site": "same-site",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Dest": "empty",
            "Referer": "https://txsm-m.jd.com/",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cookie": cookie+";cid=8",//sid={self.sha};
            "User-Agent": $.UA
        },
        body:`d=${encodeURIComponent(TDEncrypt(d))}`
    }
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${functionId}: API查询请求失败!`)
                    $.logErr(err);
                } else if (safeGet(data)) {
                    const resData = JSON.parse(data)
                    if (resData['code'] == 0) {
                        $.jsTks[$.UserName]=resData['data']
                        resolve($.jsTks[$.UserName]);
                    } else {
                        console.log(resData)
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(false);
            }
        });
    });
}

async function JDTaskApi(url,functionId, body = { }) {
    var opt = {
        url:`https://api.m.jd.com/user/color/task/`+url,
        body: `appid=txsm-m&client=h5&functionId=${functionId}`,
        headers: {
            'Accept': '*/*',
            'Accept-Encoding':'gzip, deflate, br',
            'Accept-Language':'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
            'Content-Type':'application/x-www-form-urlencoded',
            'Origin':'https://txsm-m.jd.com',
            'Referer':'https://txsm-m.jd.com/',
            'User-Agent':$.UA,
            'X-Referer-Page':'https://txsm-m.jd.com/',
            'X-Rp-Client':'h5_1.0.0',
            "Cookie": cookie,
        },
    };
    if( !$.H5ST31[$.UserName] ){
        $.H5ST31[$.UserName]= new H5ST({
            "appId":"583cc",
            "appid": "txsm-m",
            //"clientVersion": '',1.0.0
            "client": "h5",
            "pin": $.UserName,
            "ua": $.UA,
            "version":"3.1",
            "fv": "v3.2.0",
        });
        await $.H5ST31[$.UserName].genAlgo();
    };
    let h5st=await $.H5ST31[$.UserName].genH5st(functionId,body,false);
    opt["body"]+="&h5st="+encodeURIComponent(h5st);
    //opt["body"]+="&x-api-eid-token=jdd03CEMVDUKH5W7UQ6G4HCYRDEPJQTJCARIOF4ERU4VBU6EZ3RYC3GEVFN263Q7GUY2ZYGU44SXIOF35QRHHO2KFGLH4NQAAAAMJBR3URUYAAAAADNVNV6JKE73BAYX";
    opt["body"]+="&x-api-eid-token="+await get_jsTk();
    opt["body"]+=`&body=${encodeURIComponent($.H5ST31[$.UserName].body)}`;

    opt["body"]+=`&body=${encodeURIComponent(JSON.stringify(body))}`;
    return new Promise(resolve => {
        $.post(opt, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${functionId}: API查询请求失败!`)
                    $.logErr(err);
                } else if (safeGet(data)) {
                    resolve(JSON.parse(data));
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve(false);
            }
        });
    });
}

function taskPostUrl(function_id, body) {
    return {
        url: `https://dwapp.jd.com/user/${function_id}`,
        body: JSON.stringify(body),
        headers: {
            "Host": "dwapp.jd.com",
            "Origin": "https://prodev.m.jd.com",
            "Connection": "keep-alive",
            "Accept": "*/*",
            "User-Agent": $.UA,
            "Accept-Language": "zh-cn",
            "Referer": "https://prodev.m.jd.com/mall/active/eEcYM32eezJB7YX4SBihziJCiGV/index.html",
            "Accept-Encoding": "gzip, deflate, br",
            "Content-Type": "application/json",
            "Cookie": cookie,
        }
    }
}

function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            "url": `https://wq.jd.com/user/info/QueryJDUserInfo?sceneval=2`,
            "headers": {
                "Accept": "application/json,text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": cookie,
                "Referer": "https://wqs.jd.com/my/jingdou/my.shtml?sceneval=2",
                "User-Agent":$.UA
            }
        }
        $.post(options, (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        if (data['retcode'] === 13) {
                            $.isLogin = false; //cookie过期
                            return
                        }
                        if (data['retcode'] === 0) {
                            $.nickName = (data['base'] && data['base'].nickname) || $.UserName;
                        } else {
                            $.nickName = $.UserName
                        }
                    } else {
                        console.log(`京东服务器返回空数据`)
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve();
            }
        })
    })
}

function getUUID(format = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', UpperCase = 0) {
    return format.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        if (UpperCase) {
            uuid = v.toString(36).toUpperCase();
        } else {
            uuid = v.toString(36)
        }
        return uuid;
    });
}

function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        }
    } catch (e) {
        console.log(e);
        console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function get_UA() {
    if( !$.UAS[$.UserName] ) $.UAS[$.UserName]=USER_AGENTS.UARAM();
    $.UA=$.UAS[$.UserName]
}

async function sign(en) {
    time = new Date().getTime();
    let encStr = en || '';
    const encTail = `${time}e9c398ffcb2d4824b4d0a703e38yffdd`;
    encStr = CryptoJS.MD5(encStr + encTail).toString()
    return { "t": time, "encStr": encStr }
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }