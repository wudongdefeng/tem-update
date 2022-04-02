/*
京东极速版红包
自动提现微信现金
更新时间：2021-8-2
活动时间：2021-4-6至2021-5-30
活动地址：https://prodev.m.jd.com/jdlite/active/31U4T6S4PbcK83HyLPioeCWrD63j/index.html
活动入口：京东极速版-领红包
已支持IOS双京东账号,Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#京东极速版红包
20 0,22 * * * jd_speed_redpocke.js, tag=京东极速版红包, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true

================Loon==============
[Script]
cron "20 0,22 * * *" script-path=jd_speed_redpocke.js,tag=京东极速版红包

===============Surge=================
京东极速版红包 = type=cron,cronexp="20 0,22 * * *",wake-system=1,timeout=3600,script-path=jd_speed_redpocke.js

============小火箭=========
京东极速版红包 = type=cron,script-path=jd_speed_redpocke.js, cronexpr="20 0,22 * * *", timeout=3600, enable=true
默认吃有金币助力,介意别跑,加密防搬运白嫖
*/
const $ = new Env('京东极速版红包');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [], cookie = '', message;
const linkIdArr = ["Eu7-E0CUzqYyhZJo9d3YkQ"];
const signLinkId = '9WA12jYGulArzWS7vcrwhw';
let linkId;
if ($.isNode()) {
  Object.keys(jdCookieNode).forEach((item) => {
    cookiesArr.push(jdCookieNode[item])
  })
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {};
  if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0);
} else {
  cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}
!(async () => {
  if (!cookiesArr[0]) {
    $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
    return;
  }
  for (let i = 0; i < cookiesArr.length; i++) {
    if (cookiesArr[i]) {
      console.log(`\n如提示活动火爆,可再执行一次尝试\n`);
      cookie = cookiesArr[i];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
      $.index = i + 1;
      $.isLogin = true;
      $.nickName = '';
      message = '';
      await TotalBean();
      console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
      if (!$.isLogin) {
        $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

        if ($.isNode()) {
          await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
        }
        continue
      }
      for (let j = 0; j < linkIdArr.length; j++) {
        linkId = linkIdArr[j]
        await jsRedPacket()
      }
    }
  }
})()
  .catch((e) => {
    $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
  })
  .finally(() => {
    $.done();
  })

async function jsRedPacket() {
  try {
    await invite2();
    await sign();//极速版签到提现
    await reward_query();
    for (let i = 0; i < 3; i++) {
      await redPacket();//开红包
      await $.wait(2000)
    }
    await getPacketList();//领红包提现
    await signPrizeDetailList();
    await showMsg()
  } catch (e) {
    $.logErr(e)
  }
}

function showMsg() {
  return new Promise(resolve => {
    if (message) $.msg($.name, '', `京东账号${$.index}${$.nickName}\n${message}`);
    resolve()
  })
}
async function sign() {
  return new Promise(async resolve => {
    const body = {"linkId":signLinkId,"serviceName":"dayDaySignGetRedEnvelopeSignService","business":1};
    const options = {
      url: `https://api.m.jd.com`,
      body: await getSign("apSignIn_day", body, true),
      headers: {
        "Host": "api.m.jd.com",
        "Accept": "application/json, text/plain, */*",
        "Content-Type": "application/x-www-form-urlencoded",
        "Origin": "https://daily-redpacket.jd.com",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "User-Agent": $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Referer": "https://daily-redpacket.jd.com/",
        "Accept-Encoding": "gzip, deflate, br",
        "Cookie": cookie
      }
    }
    $.post(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = $.toObj(data);
            if (data.code === 0) {
              if (data.data.retCode === 0) {
                message += `极速版签到提现：签到成功\n`;
                console.log(`极速版签到提现：签到成功\n`);
              } else {
                console.log(`极速版签到提现：签到失败:${data.data.retMessage}\n`);
              }
            } else {
              console.log(`极速版签到提现：签到异常:${JSON.stringify(data)}\n`);
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
function reward_query() {
  return new Promise(resolve => {
    $.get(taskGetUrl("spring_reward_query", {
      linkId,
      "inviter": ["ESDDnY23svv7sRpsbXO0bw"][Math.floor((Math.random() * 1))]
    }), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {

            } else {
              console.log(data.errMsg)
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
async function redPacket() {
  return new Promise(async resolve => {
    let body = {linkId, "inviter":["ESDDnY23svv7sRpsbXO0bw"][Math.floor((Math.random() * 1))]}
    body = await getSign("spring_reward_receive", body, true)
    let options = {
      url: `https://api.m.jd.com/?${body}`,
      headers: {
        "Host": "api.m.jd.com",
        "Accept": "application/json, text/plain, */*",
        "Origin": "https://prodev.m.jd.com",
        "Accept-Encoding": "gzip, deflate, br",
        "User-Agent": $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        "Referer": "https://prodev.m.jd.com/",
        "Cookie": cookie
      }
    }
    $.get(options, async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {
              if (data.data.received.prizeType !== 1) {
                message += `获得${data.data.received.prizeDesc}\n`
                console.log(`获得${data.data.received.prizeDesc}`)
              } else {
                console.log("获得优惠券")
              }
            } else {
              console.log(data.errMsg)
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

function getPacketList() {
  return new Promise(resolve => {
    $.get(taskGetUrl("spring_reward_list", {"pageNum":1,"pageSize":100,linkId,"inviter":""}), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = JSON.parse(data);
            if (data.code === 0) {
              for (let item of data.data.items.filter(vo => vo.prizeType === 4)) {
                if (item.state === 0) {
                  console.log(`去提现${item.amount}微信现金`)
                  message += `提现${item.amount}微信现金，`
                  await cashOut(item.id, item.poolBaseId, item.prizeGroupId, item.prizeBaseId)
                }
              }
            } else {
              console.log(data.errMsg)
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
function signPrizeDetailList() {
  return new Promise(resolve => {
    const body = {"linkId":signLinkId,"serviceName":"dayDaySignGetRedEnvelopeSignService","business":1,"pageSize":20,"page":1};
    $.post(taskPostUrl("signPrizeDetailList", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = $.toObj(data);
            if (data.code === 0) {
              if (data.data.code === 0) {
                const list = (data.data.prizeDrawBaseVoPageBean.items || []).filter(vo => vo['prizeType'] === 4 && vo['prizeStatus'] === 0);
                for (let code of list) {
                  console.log(`极速版签到提现，去提现${code['prizeValue']}现金\n`);
                  message += `极速版签到提现，去提现${code['prizeValue']}微信现金，`
                  await apCashWithDraw(code['id'], code['poolBaseId'], code['prizeGroupId'], code['prizeBaseId']);
                }
              } else {
                console.log(`极速版签到查询奖品：失败:${JSON.stringify(data)}\n`);
              }
            } else {
              console.log(`极速版签到查询奖品：异常:${JSON.stringify(data)}\n`);
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
function apCashWithDraw(id, poolBaseId, prizeGroupId, prizeBaseId) {
  return new Promise(resolve => {
    const body = {
      "linkId": signLinkId,
      "businessSource": "DAY_DAY_RED_PACKET_SIGN",
      "base": {
        "prizeType": 4,
        "business": "dayDayRedPacket",
        "id": id,
        "poolBaseId": poolBaseId,
        "prizeGroupId": prizeGroupId,
        "prizeBaseId": prizeBaseId
      }
    }
    $.post(taskPostUrl("apCashWithDraw", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            data = $.toObj(data);
            if (data.code === 0) {
              if (data.data.status === "310") {
                console.log(`极速版签到提现现金成功！`)
                message += `极速版签到提现现金成功！`;
              } else {
                console.log(`极速版签到提现现金：失败:${JSON.stringify(data)}\n`);
              }
            } else {
              console.log(`极速版签到提现现金：异常:${JSON.stringify(data)}\n`);
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
function cashOut(id, poolBaseId, prizeGroupId, prizeBaseId) {
  let body = {
    "businessSource": "SPRING_FESTIVAL_RED_ENVELOPE",
    "base": {
      "id": id,
      "business": null,
      "poolBaseId": poolBaseId,
      "prizeGroupId": prizeGroupId,
      "prizeBaseId": prizeBaseId,
      "prizeType": 4
    },
    linkId,
    "inviter": ""
  }
  return new Promise(resolve => {
    $.post(taskPostUrl("apCashWithDraw", body), async (err, resp, data) => {
      try {
        if (err) {
          console.log(`${JSON.stringify(err)}`)
          console.log(`${$.name} API请求失败，请检查网路重试`)
        } else {
          if (safeGet(data)) {
            console.log(`提现零钱结果：${data}`)
            data = JSON.parse(data);
            if (data.code === 0) {
              if (data['data']['status'] === "310") {
                console.log(`提现成功！`)
                message += `提现成功！\n`;
              } else {
                console.log(`提现失败：${data['data']['message']}`);
                message += `提现失败：${data['data']['message']}`;
              }
            } else {
              console.log(`提现异常：${data['errMsg']}`);
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
function taskPostUrl(function_id, body) {
  return {
    url: `https://api.m.jd.com/`,
    body: `functionId=${function_id}&body=${encodeURIComponent(JSON.stringify(body))}&t=${+new Date()}&appid=activities_platform&client=H5&clientVersion=1.0.0`,
    headers: {
      "Host": "api.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      "Origin": "https://daily-redpacket.jd.com",
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "User-Agent": $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      "Referer": "https://daily-redpacket.jd.com/",
      "Accept-Encoding": "gzip, deflate, br",
      "Cookie": cookie
    }
  }
}
function taskGetUrl(function_id, body) {
  return {
    url: `https://api.m.jd.com/?functionId=${function_id}&body=${encodeURIComponent(JSON.stringify(body))}&t=${Date.now()}&appid=activities_platform`,
    headers: {
      "Host": "api.m.jd.com",
      "Accept": "application/json, text/plain, */*",
      "Origin": "https://prodev.m.jd.com",
      "Accept-Encoding": "gzip, deflate, br",
      "User-Agent": $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
      "Accept-Language": "zh-CN,zh-Hans;q=0.9",
      "Referer": "https://prodev.m.jd.com/",
      "Cookie": cookie
    }
  }
}

function TotalBean() {
  return new Promise(async resolve => {
    const options = {
      url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
      headers: {
        Host: "me-api.jd.com",
        Accept: "*/*",
        Connection: "keep-alive",
        Cookie: cookie,
        "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
        "Accept-Language": "zh-cn",
        "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
        "Accept-Encoding": "gzip, deflate, br"
      }
    }
    $.get(options, (err, resp, data) => {
      try {
        if (err) {
          $.logErr(err)
        } else {
          if (data) {
            data = JSON.parse(data);
            if (data['retcode'] === "1001") {
              $.isLogin = false; //cookie过期
              return;
            }
            if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
              $.nickName = data.data.userInfo.baseInfo.nickname;
            }
          } else {
            console.log('京东服务器返回空数据');
          }
        }
      } catch (e) {
        $.logErr(e)
      } finally {
        resolve();
      }
    })
  })
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

function jsonParse(str) {
  if (typeof str == "string") {
    try {
      return JSON.parse(str);
    } catch (e) {
      console.log(e);
      $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
      return [];
    }
  }
}
var _0xodm='jsjiami.com.v6',_0xodm_=['‮_0xodm'],_0x7015=[_0xodm,'\x59\x57\x46\x44\x62\x45\x55\x3d','\x63\x56\x5a\x4d\x52\x55\x63\x3d','\x5a\x31\x4a\x34\x56\x45\x45\x3d','\x59\x31\x56\x57\x64\x58\x51\x3d','\x61\x58\x4e\x4f\x62\x32\x52\x6c','\x53\x6c\x4e\x66\x56\x56\x4e\x46\x55\x6c\x39\x42\x52\x30\x56\x4f\x56\x41\x3d\x3d','\x64\x31\x42\x6b\x65\x45\x38\x3d','\x56\x56\x4e\x46\x55\x6c\x39\x42\x52\x30\x56\x4f\x56\x41\x3d\x3d','\x5a\x32\x56\x30\x5a\x47\x46\x30\x59\x51\x3d\x3d','\x55\x6e\x4e\x4c\x64\x6d\x38\x3d','\x57\x58\x56\x74\x52\x55\x34\x3d','\x65\x6d\x70\x32\x5a\x6b\x77\x3d','\x63\x55\x52\x47\x56\x33\x41\x3d','\x62\x55\x39\x34\x5a\x6d\x45\x3d','\x61\x6b\x56\x30\x52\x33\x4d\x3d','\x59\x55\x52\x4e\x57\x58\x55\x3d','\x54\x6b\x46\x7a\x54\x56\x41\x3d','\x62\x6d\x68\x4c\x62\x57\x77\x3d','\x55\x58\x52\x46\x53\x31\x51\x3d','\x63\x48\x56\x31\x51\x57\x63\x3d','\x61\x32\x56\x35\x63\x77\x3d\x3d','\x5a\x6d\x39\x79\x52\x57\x46\x6a\x61\x41\x3d\x3d','\x61\x56\x46\x47\x65\x48\x59\x3d','\x59\x57\x68\x7a\x53\x55\x6b\x3d','\x56\x58\x46\x4e\x64\x48\x51\x3d','\x56\x33\x64\x54\x59\x30\x55\x3d','\x52\x48\x52\x6c\x53\x45\x59\x3d','\x51\x57\x46\x55\x61\x45\x6b\x3d','\x5a\x6d\x5a\x34\x59\x30\x73\x3d','\x52\x56\x64\x54\x57\x6d\x55\x3d','\x55\x56\x6c\x31\x51\x30\x67\x3d','\x53\x45\x64\x6c\x62\x6b\x77\x3d','\x52\x6b\x31\x45\x65\x47\x38\x3d','\x65\x48\x46\x68\x57\x55\x73\x3d','\x56\x47\x6c\x53\x54\x48\x6b\x3d','\x52\x30\x68\x55\x51\x6d\x73\x3d','\x56\x6d\x52\x33\x55\x55\x34\x3d','\x53\x47\x46\x32\x52\x32\x6f\x3d','\x63\x45\x52\x6d\x57\x6d\x45\x3d','\x64\x55\x35\x72\x56\x55\x30\x3d','\x62\x6e\x4a\x56\x64\x30\x51\x3d','\x54\x32\x4a\x6e\x56\x57\x6f\x3d','\x52\x55\x64\x5a\x65\x56\x45\x3d','\x64\x6b\x35\x75\x54\x33\x51\x3d','\x54\x30\x31\x75\x5a\x6b\x73\x3d','\x52\x55\x56\x69\x53\x56\x67\x3d','\x62\x6c\x56\x6b\x51\x30\x6b\x3d','\x53\x6c\x4a\x75\x64\x55\x38\x3d','\x54\x46\x68\x68\x61\x31\x55\x3d','\x62\x6d\x35\x4e\x55\x30\x51\x3d','\x55\x6c\x52\x68\x56\x33\x4d\x3d','\x64\x45\x64\x78\x61\x6b\x45\x3d','\x65\x57\x74\x68\x5a\x47\x63\x3d','\x59\x6e\x6c\x61\x61\x47\x45\x3d','\x5a\x45\x70\x50\x57\x6b\x45\x3d','\x61\x6d\x52\x7a\x61\x57\x64\x75\x4c\x6d\x4e\x6d','\x54\x31\x56\x7a\x57\x6b\x51\x3d','\x59\x58\x42\x77\x62\x47\x6c\x6a\x59\x58\x52\x70\x62\x32\x34\x76\x61\x6e\x4e\x76\x62\x67\x3d\x3d','\x52\x48\x68\x7a\x61\x47\x38\x3d','\x57\x57\x64\x30\x53\x30\x55\x3d','\x53\x6d\x56\x56\x61\x32\x55\x3d','\x54\x48\x42\x4b\x53\x46\x45\x3d','\x59\x6b\x70\x73\x62\x6b\x77\x3d','\x5a\x57\x35\x32','\x55\x30\x6c\x48\x54\x6c\x39\x56\x55\x6b\x77\x3d','\x5a\x45\x68\x53\x57\x55\x67\x3d','\x64\x33\x5a\x46\x55\x6e\x45\x3d','\x5a\x6d\x78\x76\x62\x33\x49\x3d','\x61\x45\x35\x53\x64\x6e\x49\x3d','\x63\x6d\x46\x75\x5a\x47\x39\x74','\x62\x47\x56\x75\x5a\x33\x52\x6f','\x64\x46\x4e\x42\x56\x57\x51\x3d','\x65\x45\x35\x55\x62\x57\x38\x3d','\x63\x33\x68\x79\x52\x55\x55\x3d','\x62\x45\x4a\x45\x53\x6d\x30\x3d','\x63\x33\x52\x79\x61\x57\x35\x6e\x61\x57\x5a\x35','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x6a\x5a\x47\x34\x75\x62\x6e\x6f\x75\x62\x48\x55\x76\x5a\x32\x56\x30\x61\x44\x56\x7a\x64\x41\x3d\x3d','\x55\x57\x70\x68\x55\x55\x51\x3d','\x63\x47\x39\x7a\x64\x41\x3d\x3d','\x59\x58\x42\x77\x62\x48\x6b\x3d','\x57\x6e\x70\x70\x5a\x45\x73\x3d','\x64\x57\x4e\x58\x63\x55\x77\x3d','\x62\x47\x39\x6e\x52\x58\x4a\x79','\x59\x56\x68\x70\x62\x6b\x77\x3d','\x64\x48\x68\x6f','\x57\x58\x5a\x72\x4c\x32\x5a\x4e\x56\x30\x70\x44\x4c\x7a\x5a\x73\x64\x6d\x4e\x34\x4d\x57\x6c\x56\x52\x6d\x35\x7a\x64\x7a\x30\x39','\x52\x54\x6c\x46\x64\x6c\x4e\x47\x54\x6e\x56\x42\x4d\x58\x42\x68\x61\x46\x4e\x52\x56\x44\x42\x31\x55\x33\x4e\x59\x61\x31\x63\x78\x64\x6a\x42\x71\x4b\x31\x46\x50\x53\x46\x46\x69\x61\x7a\x67\x72\x63\x47\x56\x4b\x57\x57\x4d\x77\x53\x54\x30\x3d','\x4e\x45\x46\x57\x55\x57\x46\x76\x4b\x32\x56\x49\x4f\x46\x45\x34\x61\x33\x5a\x74\x57\x47\x35\x58\x62\x57\x74\x48\x4f\x47\x56\x6d\x4c\x32\x5a\x4f\x63\x6a\x56\x6d\x5a\x47\x56\x71\x62\x6b\x51\x35\x4b\x7a\x6c\x56\x5a\x32\x4a\x6c\x59\x7a\x30\x3d','\x61\x6d\x4a\x48\x51\x6c\x4a\x43\x55\x47\x38\x31\x52\x47\x31\x33\x51\x6a\x6c\x75\x64\x46\x52\x44\x55\x31\x5a\x50\x52\x31\x68\x31\x61\x44\x46\x5a\x55\x58\x6c\x6a\x59\x30\x4e\x31\x57\x6e\x42\x58\x64\x32\x49\x7a\x55\x47\x78\x4a\x59\x7a\x30\x3d','\x62\x54\x6b\x31\x65\x53\x74\x51\x59\x57\x64\x7a\x62\x57\x34\x32\x59\x31\x68\x58\x64\x45\x35\x6f\x5a\x6e\x4a\x57\x4f\x58\x6c\x74\x52\x45\x34\x30\x55\x55\x73\x78\x61\x58\x5a\x7a\x62\x57\x4a\x4f\x4d\x7a\x4a\x73\x63\x45\x56\x49\x64\x7a\x30\x3d','\x52\x48\x56\x78\x54\x44\x55\x32\x4c\x7a\x4e\x6f\x4d\x54\x64\x57\x63\x47\x4a\x49\x53\x56\x63\x72\x64\x6a\x68\x31\x53\x6c\x4a\x53\x65\x56\x42\x4d\x4e\x6d\x73\x35\x52\x54\x46\x49\x64\x54\x56\x56\x61\x45\x4e\x35\x53\x48\x63\x76\x63\x7a\x30\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x68\x63\x47\x6b\x75\x62\x53\x35\x71\x5a\x43\x35\x6a\x62\x32\x30\x76','\x63\x47\x46\x79\x64\x47\x6c\x6a\x61\x58\x42\x68\x64\x47\x56\x4a\x62\x6e\x5a\x70\x64\x47\x56\x55\x59\x58\x4e\x72','\x59\x58\x42\x70\x4c\x6d\x30\x75\x61\x6d\x51\x75\x59\x32\x39\x74','\x59\x58\x42\x77\x62\x47\x6c\x6a\x59\x58\x52\x70\x62\x32\x34\x76\x61\x6e\x4e\x76\x62\x69\x77\x67\x64\x47\x56\x34\x64\x43\x39\x77\x62\x47\x46\x70\x62\x69\x77\x67\x4b\x69\x38\x71','\x59\x58\x42\x77\x62\x47\x6c\x6a\x59\x58\x52\x70\x62\x32\x34\x76\x65\x43\x31\x33\x64\x33\x63\x74\x5a\x6d\x39\x79\x62\x53\x31\x31\x63\x6d\x78\x6c\x62\x6d\x4e\x76\x5a\x47\x56\x6b','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x68\x63\x33\x4e\x70\x5a\x32\x35\x74\x5a\x57\x35\x30\x4c\x6d\x70\x6b\x4c\x6d\x4e\x76\x62\x51\x3d\x3d','\x65\x6d\x67\x74\x51\x30\x34\x73\x65\x6d\x67\x74\x53\x47\x46\x75\x63\x7a\x74\x78\x50\x54\x41\x75\x4f\x51\x3d\x3d','\x4c\x69\x39\x4b\x55\x31\x39\x56\x55\x30\x56\x53\x58\x30\x46\x48\x52\x55\x35\x55\x55\x77\x3d\x3d','\x53\x6c\x4e\x56\x51\x51\x3d\x3d','\x4a\x32\x70\x6b\x62\x48\x52\x68\x63\x48\x41\x37\x61\x56\x42\x68\x5a\x44\x73\x7a\x4c\x6a\x45\x75\x4d\x44\x73\x78\x4e\x43\x34\x30\x4f\x32\x35\x6c\x64\x48\x64\x76\x63\x6d\x73\x76\x64\x32\x6c\x6d\x61\x54\x74\x4e\x62\x33\x70\x70\x62\x47\x78\x68\x4c\x7a\x55\x75\x4d\x43\x41\x6f\x61\x56\x42\x68\x5a\x44\x73\x67\x51\x31\x42\x56\x49\x45\x39\x54\x49\x44\x45\x30\x58\x7a\x51\x67\x62\x47\x6c\x72\x5a\x53\x42\x4e\x59\x57\x4d\x67\x54\x31\x4d\x67\x57\x43\x6b\x67\x51\x58\x42\x77\x62\x47\x56\x58\x5a\x57\x4a\x4c\x61\x58\x51\x76\x4e\x6a\x41\x31\x4c\x6a\x45\x75\x4d\x54\x55\x67\x4b\x45\x74\x49\x56\x45\x31\x4d\x4c\x43\x42\x73\x61\x57\x74\x6c\x49\x45\x64\x6c\x59\x32\x74\x76\x4b\x53\x42\x4e\x62\x32\x4a\x70\x62\x47\x55\x76\x4d\x54\x56\x46\x4d\x54\x51\x34\x4f\x33\x4e\x31\x63\x48\x42\x76\x63\x6e\x52\x4b\x52\x46\x4e\x49\x56\x30\x73\x76\x4d\x51\x3d\x3d','\x61\x48\x52\x30\x63\x48\x4d\x36\x4c\x79\x39\x68\x63\x33\x4e\x70\x5a\x32\x35\x74\x5a\x57\x35\x30\x4c\x6d\x70\x6b\x4c\x6d\x4e\x76\x62\x53\x38\x3d','\x5a\x33\x70\x70\x63\x43\x77\x67\x5a\x47\x56\x6d\x62\x47\x46\x30\x5a\x53\x77\x67\x59\x6e\x49\x3d','\x4d\x44\x63\x79\x4e\x44\x51\x3d','\x59\x57\x4e\x30\x61\x58\x5a\x70\x64\x47\x6c\x6c\x63\x31\x39\x77\x62\x47\x46\x30\x5a\x6d\x39\x79\x62\x51\x3d\x3d','\x59\x58\x42\x54\x61\x57\x64\x75\x53\x57\x35\x66\x5a\x47\x46\x35','\x59\x32\x78\x70\x5a\x57\x35\x30','\x59\x32\x78\x70\x5a\x57\x35\x30\x56\x6d\x56\x79\x63\x32\x6c\x76\x62\x67\x3d\x3d','\x4d\x53\x34\x77\x4c\x6a\x41\x3d','\x4d\x54\x55\x77\x4f\x54\x63\x3d','\x5a\x6b\x70\x59\x62\x33\x49\x3d','\x59\x6d\x39\x6b\x65\x51\x3d\x3d','\x64\x57\x31\x36\x56\x55\x67\x3d','\x62\x6d\x39\x33','\x62\x47\x56\x33\x63\x45\x45\x3d','\x55\x47\x35\x70\x61\x6e\x59\x3d','\x57\x45\x6c\x44\x64\x6b\x51\x3d','\x59\x57\x6c\x6f\x52\x32\x55\x3d','\x61\x6b\x74\x5a\x64\x56\x45\x3d','\x62\x55\x5a\x52\x51\x33\x59\x3d','\x59\x6c\x42\x73\x62\x6c\x41\x3d','\x5a\x6b\x70\x36\x56\x56\x55\x3d','\x59\x58\x4e\x7a\x61\x57\x64\x75','\x54\x6b\x64\x6f\x65\x56\x4d\x3d','\x5a\x6c\x42\x51\x59\x33\x6b\x3d','\x59\x57\x64\x69\x5a\x57\x30\x3d','\x52\x30\x35\x4c\x62\x30\x55\x3d','\x64\x55\x6c\x33\x61\x6b\x73\x3d','\x63\x33\x5a\x46\x62\x48\x49\x3d','\x52\x47\x5a\x61\x63\x6c\x49\x3d','\x52\x56\x5a\x30\x55\x6d\x51\x3d','\x5a\x6b\x52\x72\x55\x6e\x49\x3d','\x61\x58\x52\x4e\x53\x33\x49\x3d','\x5a\x58\x70\x57\x52\x33\x59\x3d','\x5a\x6e\x56\x75\x59\x33\x52\x70\x62\x32\x35\x4a\x5a\x44\x31\x55\x59\x58\x4e\x72\x53\x57\x35\x32\x61\x58\x52\x6c\x55\x32\x56\x79\x64\x6d\x6c\x6a\x5a\x53\x5a\x69\x62\x32\x52\x35\x50\x51\x3d\x3d','\x54\x55\x4e\x4a\x53\x46\x63\x3d','\x53\x48\x4e\x4b\x64\x6c\x6f\x3d','\x4a\x6d\x46\x77\x63\x47\x6c\x6b\x50\x57\x31\x68\x63\x6d\x74\x6c\x64\x43\x31\x30\x59\x58\x4e\x72\x4c\x57\x67\x31\x4a\x6e\x56\x31\x61\x57\x51\x39\x4a\x6c\x39\x30\x50\x51\x3d\x3d','\x56\x45\x70\x74\x62\x30\x55\x3d','\x5a\x6a\x73\x6a\x47\x59\x69\x61\x6d\x69\x2e\x53\x63\x71\x6f\x47\x7a\x6d\x41\x2e\x66\x4a\x76\x47\x36\x45\x56\x6b\x56\x42\x3d\x3d'];if(function(_0xa8043b,_0x1bd271,_0x4956bd){function _0x582bd6(_0x149d5e,_0x30c21f,_0xc07114,_0x539422,_0x18bb07,_0x3b3931){_0x30c21f=_0x30c21f>>0x8,_0x18bb07='po';var _0x45ee95='shift',_0x544c26='push',_0x3b3931='‮';if(_0x30c21f<_0x149d5e){while(--_0x149d5e){_0x539422=_0xa8043b[_0x45ee95]();if(_0x30c21f===_0x149d5e&&_0x3b3931==='‮'&&_0x3b3931['length']===0x1){_0x30c21f=_0x539422,_0xc07114=_0xa8043b[_0x18bb07+'p']();}else if(_0x30c21f&&_0xc07114['replace'](/[ZGYSqGzAfJGEVkVB=]/g,'')===_0x30c21f){_0xa8043b[_0x544c26](_0x539422);}}_0xa8043b[_0x544c26](_0xa8043b[_0x45ee95]());}return 0xdb9bd;};return _0x582bd6(++_0x1bd271,_0x4956bd)>>_0x1bd271^_0x4956bd;}(_0x7015,0xc1,0xc100),_0x7015){_0xodm_=_0x7015['length']^0xc1;};function _0x401c(_0x53883a,_0xc271ca){_0x53883a=~~'0x'['concat'](_0x53883a['slice'](0x1));var _0x585150=_0x7015[_0x53883a];if(_0x401c['ANQbIb']===undefined&&'‮'['length']===0x1){(function(){var _0x2d7762=function(){var _0xf4544c;try{_0xf4544c=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x58c4b3){_0xf4544c=window;}return _0xf4544c;};var _0x7f534b=_0x2d7762();var _0x4015cd='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x7f534b['atob']||(_0x7f534b['atob']=function(_0x55e3be){var _0x15b291=String(_0x55e3be)['replace'](/=+$/,'');for(var _0x3726b8=0x0,_0x1baab0,_0x3e2d09,_0x34e776=0x0,_0x1f34a7='';_0x3e2d09=_0x15b291['charAt'](_0x34e776++);~_0x3e2d09&&(_0x1baab0=_0x3726b8%0x4?_0x1baab0*0x40+_0x3e2d09:_0x3e2d09,_0x3726b8++%0x4)?_0x1f34a7+=String['fromCharCode'](0xff&_0x1baab0>>(-0x2*_0x3726b8&0x6)):0x0){_0x3e2d09=_0x4015cd['indexOf'](_0x3e2d09);}return _0x1f34a7;});}());_0x401c['nLfmPL']=function(_0x3bc779){var _0x289f44=atob(_0x3bc779);var _0x2a164d=[];for(var _0x206594=0x0,_0x20a3c9=_0x289f44['length'];_0x206594<_0x20a3c9;_0x206594++){_0x2a164d+='%'+('00'+_0x289f44['charCodeAt'](_0x206594)['toString'](0x10))['slice'](-0x2);}return decodeURIComponent(_0x2a164d);};_0x401c['qWsJnK']={};_0x401c['ANQbIb']=!![];}var _0x149b87=_0x401c['qWsJnK'][_0x53883a];if(_0x149b87===undefined){_0x585150=_0x401c['nLfmPL'](_0x585150);_0x401c['qWsJnK'][_0x53883a]=_0x585150;}else{_0x585150=_0x149b87;}return _0x585150;};function geth5st(_0x5a8101,_0x33ceaf){var _0x1303e8={'\x5a\x7a\x69\x64\x4b':function(_0x18ef49,_0x5ca994){return _0x18ef49===_0x5ca994;},'\x75\x63\x57\x71\x4c':_0x401c('‫0'),'\x61\x58\x69\x6e\x4c':function(_0x59ab27,_0x33ec58){return _0x59ab27(_0x33ec58);},'\x44\x78\x73\x68\x6f':function(_0x35c4aa,_0x259490){return _0x35c4aa!=_0x259490;},'\x59\x67\x74\x4b\x45':function(_0x1adc1c,_0xd934ad){return _0x1adc1c instanceof _0xd934ad;},'\x4a\x65\x55\x6b\x65':function(_0x1005bf,_0x27bfde){return _0x1005bf instanceof _0x27bfde;},'\x4c\x70\x4a\x48\x51':function(_0x354639,_0x5e5053){return _0x354639===_0x5e5053;},'\x62\x4a\x6c\x6e\x4c':_0x401c('‮1'),'\x64\x48\x52\x59\x48':function(_0x17e247,_0x2499aa){return _0x17e247===_0x2499aa;},'\x77\x76\x45\x52\x71':_0x401c('‫2'),'\x68\x4e\x52\x76\x72':function(_0x1fe788,_0x4b843b){return _0x1fe788*_0x4b843b;},'\x51\x6a\x61\x51\x44':_0x401c('‫3')};return new Promise(async _0x276361=>{var _0x4628b7={'\x74\x53\x41\x55\x64':function(_0xfb6045,_0x1ed2ed){return _0x1303e8[_0x401c('‫4')](_0xfb6045,_0x1ed2ed);},'\x78\x4e\x54\x6d\x6f':function(_0x2e70c3,_0x5b3deb){return _0x1303e8[_0x401c('‮5')](_0x2e70c3,_0x5b3deb);},'\x73\x78\x72\x45\x45':function(_0x1c7598,_0x5d35ef){return _0x1303e8[_0x401c('‫6')](_0x1c7598,_0x5d35ef);},'\x6c\x42\x44\x4a\x6d':function(_0x1ea6c2,_0x1ca3c6){return _0x1303e8[_0x401c('‮7')](_0x1ea6c2,_0x1ca3c6);}};let _0x545173={'\x61\x70\x70\x49\x64':_0x5a8101,'\x62\x6f\x64\x79':_0x33ceaf};let _0x11ee5e='';let _0x666f72=[_0x1303e8[_0x401c('‮8')]];if(process[_0x401c('‮9')][_0x401c('‮a')]){_0x11ee5e=process[_0x401c('‮9')][_0x401c('‮a')];}else{if(_0x1303e8[_0x401c('‫b')](_0x1303e8[_0x401c('‫c')],_0x1303e8[_0x401c('‫c')])){_0x11ee5e=_0x666f72[Math[_0x401c('‮d')](_0x1303e8[_0x401c('‮e')](Math[_0x401c('‮f')](),_0x666f72[_0x401c('‫10')]))];}else{var _0x6d40a7=e[n];_0x4628b7[_0x401c('‮11')](null,_0x6d40a7)&&(t+=_0x4628b7[_0x401c('‫12')](_0x6d40a7,Object)||_0x4628b7[_0x401c('‮13')](_0x6d40a7,Array)?''+(_0x4628b7[_0x401c('‮14')]('',t)?'':'\x26')+n+'\x3d'+JSON[_0x401c('‮15')](_0x6d40a7):''+(_0x4628b7[_0x401c('‮14')]('',t)?'':'\x26')+n+'\x3d'+_0x6d40a7);}}let _0x4f00a2={'\x75\x72\x6c':_0x401c('‮16'),'\x62\x6f\x64\x79':JSON[_0x401c('‮15')](_0x545173),'\x68\x65\x61\x64\x65\x72\x73':{'\x48\x6f\x73\x74':_0x11ee5e,'Content-Type':_0x1303e8[_0x401c('‮17')]},'\x74\x69\x6d\x65\x6f\x75\x74':_0x1303e8[_0x401c('‮e')](0x1e,0x3e8)};$[_0x401c('‮18')](_0x4f00a2,async(_0x464bae,_0x104666,_0x545173)=>{try{if(_0x464bae){_0x545173=await geth5st[_0x401c('‮19')](this,arguments);}}catch(_0x495588){if(_0x1303e8[_0x401c('‮1a')](_0x1303e8[_0x401c('‫1b')],_0x1303e8[_0x401c('‫1b')])){$[_0x401c('‮1c')](_0x495588,_0x104666);}else{_0x11ee5e=process[_0x401c('‮9')][_0x401c('‮a')];}}finally{_0x1303e8[_0x401c('‫1d')](_0x276361,_0x545173);}});});}async function getSign(_0x21fbee='',_0x2dc355={},_0x11c45f=![]){var _0x2469cf={'\x61\x67\x62\x65\x6d':_0x401c('‫1e'),'\x47\x4e\x4b\x6f\x45':_0x401c('‫1f'),'\x75\x49\x77\x6a\x4b':_0x401c('‫20'),'\x73\x76\x45\x6c\x72':_0x401c('‮21'),'\x44\x66\x5a\x72\x52':_0x401c('‮22'),'\x45\x56\x74\x52\x64':_0x401c('‫23'),'\x66\x44\x6b\x52\x72':_0x401c('‮24'),'\x69\x74\x4d\x4b\x72':function(_0x2fc35c,_0x4b73af){return _0x2fc35c*_0x4b73af;},'\x65\x7a\x56\x47\x76':_0x401c('‮25'),'\x4d\x43\x49\x48\x57':_0x401c('‫26'),'\x48\x73\x4a\x76\x5a':function(_0x3d3068,_0x581e14){return _0x3d3068(_0x581e14);},'\x54\x4a\x6d\x6f\x45':_0x401c('‮27'),'\x61\x61\x43\x6c\x45':_0x401c('‫28'),'\x71\x56\x4c\x45\x47':_0x401c('‮29'),'\x67\x52\x78\x54\x41':_0x401c('‫2a'),'\x63\x55\x56\x75\x74':_0x401c('‮2b'),'\x4e\x47\x68\x79\x53':function(_0x485849,_0x34593c){return _0x485849(_0x34593c);},'\x77\x50\x64\x78\x4f':_0x401c('‮2c'),'\x52\x73\x4b\x76\x6f':_0x401c('‮2d'),'\x59\x75\x6d\x45\x4e':_0x401c('‫2e'),'\x7a\x6a\x76\x66\x4c':_0x401c('‮2f'),'\x71\x44\x46\x57\x70':_0x401c('‫30'),'\x75\x6d\x7a\x55\x48':_0x401c('‫31'),'\x6c\x65\x77\x70\x41':_0x401c('‫32'),'\x50\x6e\x69\x6a\x76':function(_0x4577a8,_0x455bfc){return _0x4577a8===_0x455bfc;},'\x58\x49\x43\x76\x44':_0x401c('‫33'),'\x61\x69\x68\x47\x65':_0x401c('‫34'),'\x6a\x4b\x59\x75\x51':_0x401c('‮35'),'\x6d\x46\x51\x43\x76':_0x401c('‮36'),'\x62\x50\x6c\x6e\x50':_0x401c('‫37'),'\x66\x4a\x7a\x55\x55':_0x401c('‫38'),'\x66\x50\x50\x63\x79':function(_0x59f65a,_0x412dc9,_0x385450){return _0x59f65a(_0x412dc9,_0x385450);},'\x6d\x4f\x78\x66\x61':function(_0x4af363,_0x22847a){return _0x4af363!==_0x22847a;},'\x6a\x45\x74\x47\x73':_0x401c('‫39'),'\x61\x44\x4d\x59\x75':function(_0x960fbe,_0x318459){return _0x960fbe(_0x318459);}};let _0x55e7c4=_0x2469cf[_0x401c('‮3a')];let _0x33068c={'\x66\x75\x6e\x63\x74\x69\x6f\x6e\x49\x64':_0x21fbee,'\x62\x6f\x64\x79':JSON[_0x401c('‮15')](_0x2dc355),'\x74':Date[_0x401c('‮3b')](),'\x61\x70\x70\x69\x64':_0x2469cf[_0x401c('‫3c')]};if(_0x2469cf[_0x401c('‫3d')](_0x21fbee,_0x2469cf[_0x401c('‫3e')])){_0x33068c[_0x2469cf[_0x401c('‫3f')]]='\x48\x35';_0x33068c[_0x2469cf[_0x401c('‮40')]]=_0x2469cf[_0x401c('‫41')];_0x55e7c4=_0x2469cf[_0x401c('‫42')];}if(_0x11c45f){if(_0x2469cf[_0x401c('‫3d')](_0x2469cf[_0x401c('‫43')],_0x2469cf[_0x401c('‫43')])){Object[_0x401c('‮44')](_0x33068c,{'\x68\x35\x73\x74':_0x2469cf[_0x401c('‮45')](encodeURIComponent,await _0x2469cf[_0x401c('‮46')](geth5st,_0x55e7c4,_0x33068c))});}else{$[_0x401c('‫1e')]=_0x2469cf[_0x401c('‫47')];let _0x388745=[_0x2469cf[_0x401c('‫48')],_0x2469cf[_0x401c('‫49')],_0x2469cf[_0x401c('‫4a')],_0x2469cf[_0x401c('‫4b')],_0x2469cf[_0x401c('‮4c')],_0x2469cf[_0x401c('‮4d')]];let _0x4dc4b4=_0x388745[Math[_0x401c('‮d')](_0x2469cf[_0x401c('‮4e')](Math[_0x401c('‮f')](),_0x388745[_0x401c('‫10')]))];let _0x2c00a2={'\x75\x72\x6c':_0x2469cf[_0x401c('‮4f')],'\x62\x6f\x64\x79':_0x401c('‫50')+JSON[_0x401c('‮15')]({'method':_0x2469cf[_0x401c('‫51')],'data':{'channel':'\x31','encryptionInviterPin':_0x2469cf[_0x401c('‫52')](encodeURIComponent,_0x4dc4b4),'type':0x1}})+_0x401c('‮53')+Date[_0x401c('‮3b')](),'\x68\x65\x61\x64\x65\x72\x73':{'Host':_0x2469cf[_0x401c('‫54')],'Accept':_0x2469cf[_0x401c('‫55')],'Content-Type':_0x2469cf[_0x401c('‫56')],'Origin':_0x2469cf[_0x401c('‫57')],'Accept-Language':_0x2469cf[_0x401c('‫58')],'User-Agent':$[_0x401c('‮59')]()?process[_0x401c('‮9')][_0x401c('‮5a')]?process[_0x401c('‮9')][_0x401c('‮5a')]:_0x2469cf[_0x401c('‮45')](require,_0x2469cf[_0x401c('‮5b')])[_0x401c('‫5c')]:$[_0x401c('‮5d')](_0x2469cf[_0x401c('‮5e')])?$[_0x401c('‮5d')](_0x2469cf[_0x401c('‮5e')]):_0x2469cf[_0x401c('‫5f')],'Referer':_0x2469cf[_0x401c('‫60')],'Accept-Encoding':_0x2469cf[_0x401c('‫61')],'Cookie':cookie}};$[_0x401c('‮18')](_0x2c00a2,(_0x4bdf38,_0x5825d6,_0x2240d3)=>{});}}if(_0x2469cf[_0x401c('‮62')](_0x21fbee,_0x2469cf[_0x401c('‫3e')])){_0x33068c[_0x2469cf[_0x401c('‫63')]]=_0x2469cf[_0x401c('‮45')](encodeURIComponent,_0x33068c[_0x2469cf[_0x401c('‫63')]]);}return _0x2469cf[_0x401c('‫64')](objToStr2,_0x33068c);}function objToStr2(){var _0x52e336={'\x57\x77\x53\x63\x45':_0x401c('‫34'),'\x44\x74\x65\x48\x46':_0x401c('‮35'),'\x41\x61\x54\x68\x49':_0x401c('‮36'),'\x66\x66\x78\x63\x4b':_0x401c('‫37'),'\x69\x51\x46\x78\x76':function(_0x4b6ceb,_0x5453eb){return _0x4b6ceb===_0x5453eb;},'\x61\x68\x73\x49\x49':_0x401c('‫65'),'\x55\x71\x4d\x74\x74':_0x401c('‮66'),'\x45\x57\x53\x5a\x65':function(_0x2a3432,_0x1549bd){return _0x2a3432!=_0x1549bd;},'\x51\x59\x75\x43\x48':function(_0x18a523,_0x40af33){return _0x18a523 instanceof _0x40af33;},'\x48\x47\x65\x6e\x4c':function(_0x5285d7,_0xac3a25){return _0x5285d7 instanceof _0xac3a25;},'\x46\x4d\x44\x78\x6f':function(_0x1abac6,_0x4270f4){return _0x1abac6===_0x4270f4;},'\x51\x74\x45\x4b\x54':function(_0x364363,_0x5e82fc){return _0x364363>_0x5e82fc;},'\x70\x75\x75\x41\x67':function(_0x1ee111,_0x2f8582){return _0x1ee111!==_0x2f8582;}};var _0x36f61c=_0x52e336[_0x401c('‫67')](arguments[_0x401c('‫10')],0x0)&&_0x52e336[_0x401c('‫68')](void 0x0,arguments[0x0])?arguments[0x0]:{},_0x6f86ce='';return Object[_0x401c('‮69')](_0x36f61c)[_0x401c('‮6a')](function(_0x5836f5){if(_0x52e336[_0x401c('‫6b')](_0x52e336[_0x401c('‫6c')],_0x52e336[_0x401c('‮6d')])){res[_0x52e336[_0x401c('‫6e')]]='\x48\x35';res[_0x52e336[_0x401c('‫6f')]]=_0x52e336[_0x401c('‫70')];appId=_0x52e336[_0x401c('‮71')];}else{var _0x11ba7c=_0x36f61c[_0x5836f5];_0x52e336[_0x401c('‮72')](null,_0x11ba7c)&&(_0x6f86ce+=_0x52e336[_0x401c('‫73')](_0x11ba7c,Object)||_0x52e336[_0x401c('‮74')](_0x11ba7c,Array)?''+(_0x52e336[_0x401c('‮75')]('',_0x6f86ce)?'':'\x26')+_0x5836f5+'\x3d'+JSON[_0x401c('‮15')](_0x11ba7c):''+(_0x52e336[_0x401c('‮75')]('',_0x6f86ce)?'':'\x26')+_0x5836f5+'\x3d'+_0x11ba7c);}}),_0x6f86ce;}function invite2(){var _0x5cb58d={'\x78\x71\x61\x59\x4b':_0x401c('‫1e'),'\x54\x69\x52\x4c\x79':_0x401c('‫1f'),'\x47\x48\x54\x42\x6b':_0x401c('‫20'),'\x56\x64\x77\x51\x4e':_0x401c('‮21'),'\x48\x61\x76\x47\x6a':_0x401c('‮22'),'\x70\x44\x66\x5a\x61':_0x401c('‫23'),'\x75\x4e\x6b\x55\x4d':_0x401c('‮24'),'\x6e\x72\x55\x77\x44':function(_0xc5d04d,_0x394392){return _0xc5d04d*_0x394392;},'\x4f\x62\x67\x55\x6a':_0x401c('‮25'),'\x45\x47\x59\x79\x51':_0x401c('‫26'),'\x76\x4e\x6e\x4f\x74':function(_0x105268,_0x396fdf){return _0x105268(_0x396fdf);},'\x4f\x4d\x6e\x66\x4b':_0x401c('‮27'),'\x45\x45\x62\x49\x58':_0x401c('‫28'),'\x6e\x55\x64\x43\x49':_0x401c('‮29'),'\x4a\x52\x6e\x75\x4f':_0x401c('‫2a'),'\x4c\x58\x61\x6b\x55':_0x401c('‮2b'),'\x6e\x6e\x4d\x53\x44':_0x401c('‮2c'),'\x52\x54\x61\x57\x73':_0x401c('‮2d'),'\x74\x47\x71\x6a\x41':_0x401c('‫2e'),'\x79\x6b\x61\x64\x67':_0x401c('‮2f'),'\x62\x79\x5a\x68\x61':_0x401c('‫30')};$[_0x401c('‫1e')]=_0x5cb58d[_0x401c('‫76')];let _0x2b7af7=[_0x5cb58d[_0x401c('‮77')],_0x5cb58d[_0x401c('‫78')],_0x5cb58d[_0x401c('‮79')],_0x5cb58d[_0x401c('‫7a')],_0x5cb58d[_0x401c('‮7b')],_0x5cb58d[_0x401c('‮7c')]];let _0x48a9ed=_0x2b7af7[Math[_0x401c('‮d')](_0x5cb58d[_0x401c('‮7d')](Math[_0x401c('‮f')](),_0x2b7af7[_0x401c('‫10')]))];let _0x1539ca={'\x75\x72\x6c':_0x5cb58d[_0x401c('‮7e')],'\x62\x6f\x64\x79':_0x401c('‫50')+JSON[_0x401c('‮15')]({'method':_0x5cb58d[_0x401c('‮7f')],'data':{'channel':'\x31','encryptionInviterPin':_0x5cb58d[_0x401c('‫80')](encodeURIComponent,_0x48a9ed),'type':0x1}})+_0x401c('‮53')+Date[_0x401c('‮3b')](),'\x68\x65\x61\x64\x65\x72\x73':{'Host':_0x5cb58d[_0x401c('‫81')],'Accept':_0x5cb58d[_0x401c('‫82')],'Content-Type':_0x5cb58d[_0x401c('‫83')],'Origin':_0x5cb58d[_0x401c('‫84')],'Accept-Language':_0x5cb58d[_0x401c('‫85')],'User-Agent':$[_0x401c('‮59')]()?process[_0x401c('‮9')][_0x401c('‮5a')]?process[_0x401c('‮9')][_0x401c('‮5a')]:_0x5cb58d[_0x401c('‫80')](require,_0x5cb58d[_0x401c('‮86')])[_0x401c('‫5c')]:$[_0x401c('‮5d')](_0x5cb58d[_0x401c('‫87')])?$[_0x401c('‮5d')](_0x5cb58d[_0x401c('‫87')]):_0x5cb58d[_0x401c('‫88')],'Referer':_0x5cb58d[_0x401c('‫89')],'Accept-Encoding':_0x5cb58d[_0x401c('‫8a')],'Cookie':cookie}};$[_0x401c('‮18')](_0x1539ca,(_0x8194f7,_0x2dd77b,_0x5cc263)=>{});};_0xodm='jsjiami.com.v6';
// prettier-ignore
function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
