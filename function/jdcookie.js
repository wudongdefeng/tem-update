/*
借用 Ccwav 佬库脚本 https://github.com/ccwav/QLScript2/blob/main/jdCookie.js
修改内容: 适配代理和活动项目的个人定制版本，如果执行报错nodejs依赖添加 global-agent
修改原因: 适应群内项目
所属组织：InteIJ群管理者所有
变量
添加代理变量 JK_ALL_PROXY
export JK_ALL_PROXY="http://IP:端口";

定时任务 BAN_TIMING
export BAN_TIMING="0&1&2";
时间0-23 如果问为什么没有24

脚本黑白名单 PASS_SCRIPT
export PASS_SCRIPT="jd_fruit_task.js&jd_wsdlb.js";
如果代理使用白名单，就把69 70行删了, 如果使用黑名单就把52 53 行删了或者前面加 // ，默认添加都走代理
如果同时使用活动和代理不想活动走代理请注释或者删除 63 64行
bootstrap();
GLOBAL_AGENT.HTTP_PROXY = JK_ALL_PROXY;

专门适配活动参数的
export NOT_CJ="pt_pin1&pt_pin2" CJ开头黑名单
export NOT_LZ="pt_pin1&pt_pin2" LZ开头黑名单


 */
const {bootstrap} = require("global-agent");

// 代理api的变量
let JK_ALL_PROXY = process.env.JK_ALL_PROXY ? process.env.JK_ALL_PROXY : '';
// 定时任务黑名单
let BAN_TIMING = process.env.BAN_TIMING ? process.env.BAN_TIMING : '';

// 获取活动参数类型, https://github.com/XgzK/QL_variable 专用
let NOT_TYPE = process.env.NOT_TYPE ? process.env.NOT_TYPE : '';

const White_date = new Date();
let NOT_CJ = [];
let NOT_LZ = [];

let hours_ti = White_date.getHours();
// 定时任务,默认填写的为黑名单时间
if (BAN_TIMING.split('&').indexOf(String(hours_ti)) > -1) {
    console.log(`检测到 ${hours_ti} 时在 BAN_TIMING 变量中执行此输出`);
} else {
    // 代理获取执行脚本名称的
    let PASS_SCRIPT = process.env.PASS_SCRIPT ? process.env.PASS_SCRIPT : '';
    // 检测脚本在不在黑白名单
    if (PASS_SCRIPT.split('&').indexOf(process.argv[1].split('/').reverse()[0]) !== -1) {
        console.log("这里可以填写代理 PASS_SCRIPT为白名单");
        // 下面两行和代理有关
        bootstrap();
        GLOBAL_AGENT.HTTP_PROXY = JK_ALL_PROXY;
    } else if (NOT_TYPE) {
        // 这里是活动的，如果你只是使用代理而没有使用活动请勿修改
        // QL_variable 项目的，执行活动必进来
        NOT_CJ = process.env.NOT_CJ ? process.env.NOT_CJ : '';
        NOT_LZ = process.env.NOT_LZ ? process.env.NOT_LZ : '';
        NOT_LZ = NOT_LZ.split('&');
        NOT_CJ = NOT_CJ.split('&');
        console.log('检测到活动类型执行');
        // 下面两行和代理有关
        bootstrap();
        GLOBAL_AGENT.HTTP_PROXY = JK_ALL_PROXY;
    } else {
        console.log("这里也可以填写代理 PASS_SCRIPT 为黑名单");
        // 下面两行和代理有关
        // bootstrap();
        // GLOBAL_AGENT.HTTP_PROXY = JK_ALL_PROXY;
    }

}
//此处填写京东账号cookie。
let CookieJDs = [
    '',//账号一ck,例:pt_key=XXX;pt_pin=XXX;
    '',//账号二ck,例:pt_key=XXX;pt_pin=XXX;如有更多,依次类推
]
// 判断环境变量里面是否有京东ck
if (process.env.JD_COOKIE) {
    if (process.env.JD_COOKIE.indexOf('&') > -1) {
        CookieJDs = process.env.JD_COOKIE.split('&');
    } else if (process.env.JD_COOKIE.indexOf('\n') > -1) {
        CookieJDs = process.env.JD_COOKIE.split('\n');
    } else {
        CookieJDs = [process.env.JD_COOKIE];
    }
}
if (JSON.stringify(process.env).indexOf('GITHUB') > -1) {
    console.log(`请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`);
    !(async () => {
        await require('./sendNotify').sendNotify('提醒', `请勿使用github action、滥用github资源会封我仓库以及账号`)
        await process.exit(0);
    })()
}
CookieJDs = [...new Set(CookieJDs.filter(item => !!item))]
console.log(`\n===============共${CookieJDs.length}个京东账号Cookie===============\n`);
if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
};
for (let i = 0; i < CookieJDs.length; i++) {
    if (!CookieJDs[i].match(/pt_pin=(.+?);/) || !CookieJDs[i].match(/pt_key=(.+?);/)) {
        console.log(`\n提示:京东cookie 【${CookieJDs[i]}】填写不规范,可能会影响部分脚本正常使用。正确格式为: pt_key=xxx;pt_pin=xxx;（分号;不可少）\n`);
        continue
    } else if (NOT_TYPE === 'lz') {
        var jd_ck = CookieJDs[i].match(/pt_pin=(.+?);/)[1]
        if (NOT_LZ.indexOf(jd_ck) > -1) {
            console.log(jd_ck + "在LZ黑名单中,跳过本次线报执行")
            continue
        }
    } else if (NOT_TYPE === 'cj') {
        jd_ck = CookieJDs[i].match(/pt_pin=(.+?);/)[1]
        if (NOT_CJ.indexOf(jd_ck) > -1) {
            console.log(jd_ck + "在CJ黑名单中,跳过本次线报执行")
            continue
        }
    }
    const index = (i + 1 === 1) ? '' : (i + 1);
    exports['CookieJD' + index] = CookieJDs[i].trim();
}
// 获取到cookie后屏蔽 使其他脚本引用时 获取不到环境变量[JD_COOKIE]
process.env.JD_COOKIE = ''