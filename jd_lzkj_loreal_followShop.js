/*
活动名称：关注店铺有礼（超级无线欧莱雅）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10069&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
					https://lorealjdcampaign-rc.isvjcloud.com/interactsaas/index?activityType=10069&templateId=<模板id>&activityId=<活动id>&nodeId=<nodeid>&prd=cjwx
环境变量：jd_lzkj_loreal_followShop_url // 活动链接

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#lzkj_loreal关注有礼
1 1 1 1 * jd_lzkj_loreal_followShop.js, tag=lzkj_loreal关注有礼, enabled=true
*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env("关注有礼（lzkj_loreal）");

const notify = $.isNode() ? require("./sendNotify") : "";
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const getToken = require("./function/krgetToken");
const getH5st = require("./function/krh5st");
let lz_cookie = {};
let activityUrl = process.env.jd_lzkj_loreal_followShop_url;
let activityId = null;
let activityCookie = "";
$.activityEnd = false;
let cookiesArr = [],
  cookie = "",
  message = "";
if ($.isNode()) {
  if (process.env.jd_lzkj_loreal_followShop_url) {
    activityUrl = process.env.jd_lzkj_loreal_followShop_url;
  }
  if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
    process.exit(0);
  }
  Object.keys(jdCookieNode).forEach(_0x4e76x37 => {
    cookiesArr.push(jdCookieNode[_0x4e76x37]);
  });
  if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") {
    console.log = () => {};
  }
} else {
  cookiesArr = [$.getdata("CookieJD"), $.getdata("CookieJD2"), ...$.toObj($.getdata("CookiesJD") || "[]").map(_0x4e76x39 => {
    return _0x4e76x39.cookie;
  })].filter(_0x4e76x38 => {
    return !!_0x4e76x38;
  });
}
let isGetCookie = typeof $request !== "undefined";
if (isGetCookie) {
  GetCookie();
  $.done();
}
if (activityUrl) {
  activityId = getQueryString("" + activityUrl, "activityId");
  activityType = getQueryString("" + activityUrl, "activityType");
  templateId = getQueryString("" + activityUrl, "templateId");
  if (activityUrl.includes("lorealjdcampaign-rc")) {
    wxActType = "apps/interact";
  } else {
    if (activityUrl.includes("lzkj")) {
      wxActType = activityUrl.match(/\/(prod\/cc\/interact\w*)\//)[1];
    } else {
      console.log("暂不支持的类型");
    }
  }
  $.domain = activityUrl.match(/https?:\/\/([^\/]+)/)[1];
}
let domains = "https://" + $.domain;
!(async () => {
  if (activityId == null) {
    $.msg($.name, "", "活动id不存在");
    $.done();
    return;
  }
  console.log("活动入口:" + activityUrl);
  if (!cookiesArr[0]) {
    $.msg($.name, "【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取", "https://bean.m.jd.com/", {
      "open-url": "https://bean.m.jd.com/"
    });
    return;
  }
  for (let _0x4e76x58 = 0; _0x4e76x58 < cookiesArr.length; _0x4e76x58++) {
    if (cookiesArr[_0x4e76x58]) {
      cookie = cookiesArr[_0x4e76x58];
      originCookie = cookiesArr[_0x4e76x58];
      $.UserName = decodeURIComponent(cookie.match(/pt_pin=(.+?);/) && cookie.match(/pt_pin=(.+?);/)[1]);
      $.index = _0x4e76x58 + 1;
      $.isLogin = true;
      $.nickName = "";
      console.log("\n开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      if (!$.isLogin) {
        $.msg($.name, "【提示】cookie已失效", "京东账号" + $.index + " " + ($.nickName || $.UserName) + "\n请重新登录获取\nhttps://bean.m.jd.com/", {
          "open-url": "https://bean.m.jd.com/"
        });
        if ($.isNode()) {
          await notify.sendNotify($.name + "cookie已失效 - " + $.UserName, "京东账号" + $.index + " " + $.UserName + "\n请重新登录获取cookie");
        }
        continue;
      }
      await getUA();
      await Main();
      await $.wait(2000);
      if ($.hasEnd || $.activityEnd || $.outFlag) {
        break;
      }
    }
  }
})().catch(_0x4e76x3e => {
  $.log("", " " + $.name + ", 失败! 原因: " + _0x4e76x3e + "!", "");
}).finally(() => {
  $.done();
});
async function Main() {
  $.acquire = 0;
  $.shareUser = 0;
  $.shareUserNum = 0;
  $.token = "";
  $.Pin = "";
  $.OpenCard = false;
  $.token = await getToken(cookie, domains);
  if ($.token == "") {
    console.log("获取[token]失败！");
    return;
  }
  if ($.token) {
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    if ($.hasEnd || $.activityEnd || $.outFlag || $.OpenCard) {
      return;
    }
    await $.wait(300);
    await login("api/user-info/login", {
      "status": "1",
      "activityId": activityId,
      "tokenPin": $.token,
      "source": "01",
      "shareUserId": ""
    });
    await $.wait(300);
    await activity();
    if ($.hasEnd || $.activityEnd || $.outFlag) {
      return;
    }
    await drawPrize();
    await $.wait(300);
    if ($.index == 1) {
      $.prizeList = "";
      for (let _0x4e76x7c = 0; _0x4e76x7c < $.prizeInfo.length; _0x4e76x7c++) {
        prizeName = $.prizeInfo[_0x4e76x7c].prizeName;
        if (_0x4e76x7c != $.prizeInfo.length - 1) {
          $.prizeList += prizeName + "，";
        } else {
          $.prizeList += "" + prizeName;
        }
      }
      console.log("店铺名称：" + $.shopName + "\n活动名称: " + $.actName + "\n活动奖品：" + $.prizeList + "\n");
    }
    await getUserFollowInfo();
    await saveFollowInfo();
    if ($.hasEnd || $.activityEnd || $.outFlag) {
      return;
    }
  } else {
    console.log("【京东账号" + $.index + "】 未能获取活动信息");
  }
}
function getShopOpenCardInfo(_0x4e76x7e) {
  let _0x4e76x8f = {
    "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + encodeURIComponent(JSON.stringify(_0x4e76x7e)) + "&client=H5&clientVersion=9.2.0&uuid=88888&h5st=20220412164645241%3B3634d1aeada6d9cd11a7526a3a6ac63e%3B169f1%3Btk02wd66f1d7418nXuLjsmO3oJMCxUqKVwIf4q1WRptKRT3nJSrx01oYYBAylbSuyg4sipnEzyEJOZuFjfG2QERcBtzd%3B6b455234e93be4ec963cd7c575d70882b838ba588149a1f54b69c8d0dacf14da%3B3.0%3B1649753205241",
    "headers": {
      "Host": "api.m.jd.com",
      "Accept": "*/*",
      "Connection": "keep-alive",
      "Cookie": cookie,
      "User-Agent": $.UA,
      "Referer": "https://shopmember.m.jd.com/shopcard/?venderId=" + $.joinVenderId + "&channel=801&returnUrl=" + encodeURIComponent(activityUrl),
      "Accept-Encoding": "gzip, deflate, br"
    }
  };
  return new Promise(_0x4e76x90 => {
    $.get(_0x4e76x8f, (_0x4e76x9b, _0x4e76x9c, _0x4e76x9d) => {
      try {
        if (_0x4e76x9b) {
          if (_0x4e76x9b === "Response code 403 (Forbidden)") {
            $.err = true;
            console.log(_0x4e76x9b);
          }
        } else {
          res = JSON.parse(_0x4e76x9d);
          if (res.success) {
            $.openCardStatus = res.result.userInfo.openCardStatus;
            if (res.result.interestsRuleList) {
              $.openCardActivityId = res.result.interestsRuleList[0].interestsInfo.activityId;
            }
          }
        }
      } catch (_0x5b0b91) {
        console.log(_0x5b0b91);
      } finally {
        _0x4e76x90();
      }
    });
  });
}
function showMsg() {
  return new Promise(_0x4e76xa4 => {
    $.msg($.name, "", "【京东账号" + $.index + "】" + $.nickName + "\n" + message);
    _0x4e76xa4();
  });
}
function login(_0x4e76xa6, _0x4e76xa7) {
  return new Promise(_0x4e76xcb => {
    $.post(taskPostUrl(_0x4e76xa6, _0x4e76xa7), async (_0x4e76xd7, _0x4e76xd8, _0x4e76xd9) => {
      try {
        if (_0x4e76xd7) {
          console.log("" + JSON.stringify(_0x4e76xd7));
          console.log($.name + " login API请求失败，请检查网路重试");
        } else {
          _0x4e76xd9 = JSON.parse(_0x4e76xd9);
          if (_0x4e76xd9 && _0x4e76xd9.data) {
            $.tokens = _0x4e76xd9.data.token;
            $.customerId = _0x4e76xd9.data.customerId;
            $.joinVenderId = _0x4e76xd9.data.joinInfo.shopId;
            $.openCardUrl = _0x4e76xd9.data.joinInfo.openCardUrl;
            $.shopName = _0x4e76xd9.data.shopName;
            $.actName = _0x4e76xd9.data.actName;
            if ($.openCardUrl) {
              $.joinVenderId = _0x4e76xd9.data.joinInfo.openCardUrl.match(/venderId=(\d+)/)[1];
            }
            $.joinDes = _0x4e76xd9.data.joinInfo.joinCodeInfo.joinDes;
            if ($.joinDes.indexOf("不是会员") > -1 || $.joinDes.indexOf("加入会员") > -1) {
              $.errorJoinShop = "";
              await getshopactivityId();
              for (let _0x4e76xea = 0; _0x4e76xea < Array(2).length; _0x4e76xea++) {
                if (_0x4e76xea > 0) {
                  console.log("第" + _0x4e76xea + "次 重新开卡");
                }
                await joinShop();
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") == -1 && $.errorJoinShop.indexOf("加入店铺会员失败") == -1) {
                  break;
                }
                if ($.errorJoinShop.indexOf("活动太火爆，请稍后再试") > -1) {
                  console.log("开卡失败❌ ，重新执行脚本");
                  $.OpenCard = true;
                }
              }
            }
          } else {
            console.log(_0x4e76xd9);
          }
          if (_0x4e76xd8.status == 200) {
            refreshToken(_0x4e76xd8);
          }
        }
      } catch (_0x520714) {
        $.logErr(_0x520714, _0x4e76xd8);
      } finally {
        _0x4e76xcb();
      }
    });
  });
}
function follow() {
  return new Promise(_0x4e76x103 => {
    let _0x4e76x109 = {};
    $.post(taskPostUrl("api/task/followShop/follow", _0x4e76x109), async (_0x4e76x10a, _0x4e76x10b, _0x4e76x10c) => {
      try {
        if (_0x4e76x10a) {
          console.log("" + JSON.stringify(_0x4e76x10a));
          console.log($.name + " follow API请求失败，请检查网路重试");
        } else {
          _0x4e76x10c = JSON.parse(_0x4e76x10c);
          if (_0x4e76x10c && _0x4e76x10c.resp_code == 0) {} else {
            console.log(_0x4e76x10c.resp_msg);
            for (let _0x4e76x10f of ["未开始", "结束", "不存在", "不在"]) {
              if (_0x4e76x10c.resp_msg.includes(_0x4e76x10f)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (_0x4e76x10b.status == 200) {
            refreshToken(_0x4e76x10b);
          }
        }
      } catch (_0x5499dc) {
        $.logErr(_0x5499dc, _0x4e76x10b);
      } finally {
        _0x4e76x103();
      }
    });
  });
}
function activity() {
  return new Promise(_0x4e76x11f => {
    let _0x4e76x133 = {};
    $.post(taskPostUrl("api/task/jiugongge/activity", _0x4e76x133), async (_0x4e76x134, _0x4e76x135, _0x4e76x136) => {
      try {
        if (_0x4e76x134) {
          console.log("" + JSON.stringify(_0x4e76x134));
          console.log($.name + " activity API请求失败，请检查网路重试");
        } else {
          _0x4e76x136 = JSON.parse(_0x4e76x136);
          if (_0x4e76x136 && _0x4e76x136.data) {
            $.taskslist = _0x4e76x136.data.taskList || [];
          } else {
            console.log(_0x4e76x136.resp_msg);
            for (let _0x4e76x13e of ["未开始", "结束", "不存在", "不在"]) {
              if (_0x4e76x136.resp_msg.includes(_0x4e76x13e)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (_0x4e76x135.status == 200) {
            refreshToken(_0x4e76x135);
          }
        }
      } catch (_0x3a761e) {
        $.logErr(_0x3a761e, _0x4e76x135);
      } finally {
        _0x4e76x11f();
      }
    });
  });
}
function saveFollowInfo() {
  return new Promise(async _0x4e76x155 => {
    const _0x4e76x171 = {
      "url": "https://" + $.domain + "/" + wxActType + "/api/task/lkFollowShop/saveFollowInfo?actType=" + activityType,
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": $.domain,
        "Origin": domains,
        "Content-Type": "application/json;charset=UTF-8",
        "Referer": activityUrl,
        "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA,
        "token": $.tokens
      }
    };
    $.get(_0x4e76x171, (_0x4e76x172, _0x4e76x173, _0x4e76x174) => {
      try {
        if (_0x4e76x172) {
          console.log("" + JSON.stringify(_0x4e76x172));
          console.log($.name + " saveFollowInfo API请求失败，请检查网路重试");
        } else {
          _0x4e76x174 = JSON.parse(_0x4e76x174);
          if (_0x4e76x174 && _0x4e76x174.resp_code == 0) {
            if (_0x4e76x174.data === "") {
              console.log("💨  空气");
            } else {
              drawInfo = _0x4e76x174.data;
              if (drawInfo) {
                switch (drawInfo.prizeType) {
                  case 1:
                    console.log("🎉 " + drawInfo.prizeName + " 🐶");
                    break;
                  case 3:
                    generateId = _0x4e76x174.data.prizeInfoId;
                    prizeName = drawInfo.prizeName;
                    console.log(_0x4e76x174);
                    console.log("🎉 恭喜获得实物~");
                    console.log("奖品名称：" + prizeName);
                    break;
                  case 4:
                  case 11:
                    console.log("🎉 " + drawInfo.prizeName + " 🎟️");
                    break;
                  case 2:
                    console.log("🎉 " + drawInfo.prizeName + " 优惠券");
                    break;
                  case 8:
                    console.log("🎉 恭喜获得" + drawInfo.prizeName + " 🎁");
                    break;
                  default:
                    console.log(_0x4e76x174);
                    break;
                }
              }
            }
          } else {
            console.log(_0x4e76x174.resp_msg);
            for (let _0x4e76x178 of ["未开始", "结束", "不存在", "不在"]) {
              if (_0x4e76x174.resp_msg.includes(_0x4e76x178)) {
                $.activityEnd = true;
                break;
              }
            }
          }
          if (_0x4e76x173.status == 200) {
            refreshToken(_0x4e76x173);
          }
        }
      } catch (_0x3719ef) {
        $.logErr(_0x3719ef, _0x4e76x173);
      } finally {
        _0x4e76x155(_0x4e76x174 || {});
      }
    });
  });
}
function getUserFollowInfo() {
  return new Promise(async _0x4e76x193 => {
    const _0x4e76x197 = {
      "url": "https://" + $.domain + "/" + wxActType + "/api/task/lkFollowShop/getUserFollowInfo",
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": $.domain,
        "Origin": domains,
        "Content-Type": "application/json;charset=UTF-8",
        "Referer": activityUrl,
        "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
        "User-Agent": $.UA,
        "token": $.tokens
      }
    };
    $.get(_0x4e76x197, (_0x4e76x198, _0x4e76x199, _0x4e76x19a) => {
      try {
        if (_0x4e76x198) {
          console.log("" + JSON.stringify(_0x4e76x198));
          console.log($.name + " getUserFollowInfo API请求失败，请检查网路重试");
        } else {
          _0x4e76x19a = JSON.parse(_0x4e76x19a);
          if (_0x4e76x19a && _0x4e76x19a.resp_code == 0) {} else {
            console.log(_0x4e76x19a);
          }
          if (_0x4e76x199.status == 200) {
            refreshToken(_0x4e76x199);
          }
        }
      } catch (_0x3bfefd) {
        $.logErr(_0x3bfefd, _0x4e76x199);
      } finally {
        _0x4e76x193(_0x4e76x19a || {});
      }
    });
  });
}
function basicInfo() {
  return new Promise(_0x4e76x1aa => {
    let _0x4e76x1ae = {
      "taskId": $.taskId,
      "skuId": ""
    };
    $.post(taskPostUrl("api/active/basicInfo", _0x4e76x1ae), async (_0x4e76x1af, _0x4e76x1b0, _0x4e76x1b1) => {
      try {
        if (_0x4e76x1af) {
          console.log("" + JSON.stringify(_0x4e76x1af));
          console.log($.name + " basicInfo API请求失败，请检查网路重试");
        } else {
          _0x4e76x1b1 = JSON.parse(_0x4e76x1b1);
          if (_0x4e76x1b1 && _0x4e76x1b1.resp_code == 0) {
            $.actName = _0x4e76x1b1.data.actName;
            $.shopName = _0x4e76x1b1.data.shopName;
          } else {
            console.log(_0x4e76x1b1);
          }
          if (_0x4e76x1b0.status == 200) {
            refreshToken(_0x4e76x1b0);
          }
        }
      } catch (_0x1f7b8a) {
        $.logErr(_0x1f7b8a, _0x4e76x1b0);
      } finally {
        _0x4e76x1aa();
      }
    });
  });
}
function drawPrize() {
  return new Promise(_0x4e76x1c1 => {
    let _0x4e76x1d1 = {};
    $.post(taskPostUrl("api/prize/drawPrize", _0x4e76x1d1), async (_0x4e76x1d2, _0x4e76x1d3, _0x4e76x1d4) => {
      try {
        if (_0x4e76x1d2) {
          console.log("" + JSON.stringify(_0x4e76x1d2));
          console.log($.name + " drawPrize API请求失败，请检查网路重试");
        } else {
          _0x4e76x1d4 = JSON.parse(_0x4e76x1d4);
          if (_0x4e76x1d4 && _0x4e76x1d4.resp_code == 0) {
            $.drawNumber = _0x4e76x1d4.data.drawNumber;
            $.prizeInfo = _0x4e76x1d4.data.prizeInfo || [];
          } else {
            console.log(_0x4e76x1d4);
          }
          if (_0x4e76x1d3.status == 200) {
            refreshToken(_0x4e76x1d3);
          }
        }
      } catch (_0x35b7d4) {
        $.logErr(_0x35b7d4, _0x4e76x1d3);
      } finally {
        _0x4e76x1c1();
      }
    });
  });
}
async function joinShop() {
  if (!$.joinVenderId) {
    return;
  }
  return new Promise(async _0x4e76x1e8 => {
    $.errorJoinShop = "活动太火爆，请稍后再试";
    let _0x4e76x1f5 = "";
    if ($.shopactivityId) {
      _0x4e76x1f5 = ",\"activityId\":" + $.shopactivityId;
    }
    const _0x4e76x1f6 = "{\"venderId\":\"" + $.joinVenderId + "\",\"shopId\":\"" + $.joinVenderId + "\",\"bindByVerifyCodeFlag\":1,\"registerExtend\":{},\"writeChildFlag\":0" + _0x4e76x1f5 + ",\"channel\":406}";
    const _0x4e76x1f7 = {
      "appid": "jd_shop_member",
      "functionId": "bindWithVender",
      "clientVersion": "9.2.0",
      "client": "H5",
      "body": JSON.parse(_0x4e76x1f6)
    };
    const _0x4e76x1f8 = await getH5st("8adfb", _0x4e76x1f7);
    const _0x4e76x1f9 = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=" + _0x4e76x1f6 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x4e76x1f8),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x4e76x1f9, async (_0x4e76x1fa, _0x4e76x1fb, _0x4e76x1fc) => {
      try {
        if (_0x4e76x1fa) {
          if (_0x4e76x1fb && typeof _0x4e76x1fb.statusCode != "undefined") {
            if (_0x4e76x1fb.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x4e76x1fc = _0x4e76x1fc && _0x4e76x1fc.match(/jsonp_.*?\((.*?)\);/) && _0x4e76x1fc.match(/jsonp_.*?\((.*?)\);/)[1] || _0x4e76x1fc;
          let _0x4e76x1fd = $.toObj(_0x4e76x1fc, _0x4e76x1fc);
          if (_0x4e76x1fd && typeof _0x4e76x1fd == "object") {
            if (_0x4e76x1fd && _0x4e76x1fd.success === true) {
              console.log(" >> " + _0x4e76x1fd.message);
              $.errorJoinShop = _0x4e76x1fd.message;
              if (_0x4e76x1fd.result && _0x4e76x1fd.result.giftInfo) {
                for (let _0x4e76x1fe of _0x4e76x1fd.result.giftInfo.giftList) {
                  console.log(" >> 入会获得：" + _0x4e76x1fe.discountString + _0x4e76x1fe.prizeName + _0x4e76x1fe.secondLineDesc);
                }
              }
            } else {
              if (_0x4e76x1fd && typeof _0x4e76x1fd == "object" && _0x4e76x1fd.message) {
                $.errorJoinShop = _0x4e76x1fd.message;
                console.log("" + (_0x4e76x1fd.message || ""));
              } else {
                console.log(_0x4e76x1fc);
              }
            }
          } else {
            console.log(_0x4e76x1fc);
          }
        }
      } catch (_0x4b1608) {
        $.logErr(_0x4b1608, _0x4e76x1fb);
      } finally {
        _0x4e76x1e8();
      }
    });
  });
}
async function getshopactivityId() {
  return new Promise(async _0x4e76x211 => {
    const _0x4e76x217 = "{\"venderId\":\"" + $.joinVenderId + "\",\"channel\":406,\"payUpShop\":true}";
    const _0x4e76x218 = {
      "appid": "jd_shop_member",
      "functionId": "bindWithVender",
      "clientVersion": "9.2.0",
      "client": "H5",
      "body": JSON.parse(_0x4e76x217)
    };
    const _0x4e76x219 = await getH5st("8adfb", _0x4e76x218);
    const _0x4e76x21a = {
      "url": "https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=" + _0x4e76x217 + "&clientVersion=9.2.0&client=H5&uuid=88888&h5st=" + encodeURIComponent(_0x4e76x219),
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cookie": cookie,
        "origin": "https://shopmember.m.jd.com/",
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36"
      }
    };
    $.get(_0x4e76x21a, async (_0x4e76x21b, _0x4e76x21c, _0x4e76x21d) => {
      try {
        if (_0x4e76x21b) {
          if (_0x4e76x21c && typeof _0x4e76x21c.statusCode != "undefined") {
            if (_0x4e76x21c.statusCode == 403) {
              console.log("此ip已无法开卡，请更换IP后再执行脚本\n");
            }
          }
        } else {
          _0x4e76x21d = _0x4e76x21d && _0x4e76x21d.match(/jsonp_.*?\((.*?)\);/) && _0x4e76x21d.match(/jsonp_.*?\((.*?)\);/)[1] || _0x4e76x21d;
          let _0x4e76x21e = $.toObj(_0x4e76x21d, _0x4e76x21d);
          if (_0x4e76x21e && typeof _0x4e76x21e == "object") {
            if (_0x4e76x21e && _0x4e76x21e.success == true) {
              console.log("去加入：" + (_0x4e76x21e.result.shopMemberCardInfo.venderCardName || "") + " (" + $.joinVenderId + ")");
              $.shopactivityId = _0x4e76x21e.result.interestsRuleList && _0x4e76x21e.result.interestsRuleList[0] && _0x4e76x21e.result.interestsRuleList[0].interestsInfo && _0x4e76x21e.result.interestsRuleList[0].interestsInfo.activityId || "";
            }
          } else {
            console.log(_0x4e76x21d);
          }
        }
      } catch (_0x2ceb81) {
        $.logErr(_0x2ceb81, _0x4e76x21c);
      } finally {
        _0x4e76x211();
      }
    });
  });
}
function taskPostUrl(_0x4e76x220, _0x4e76x221) {
  return {
    "url": "" + domains + "/" + wxActType + "/" + _0x4e76x220,
    "body": JSON.stringify(_0x4e76x221),
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": $.domain,
      "Origin": domains,
      "Content-Type": "application/json;charset=UTF-8",
      "Referer": activityUrl,
      "Cookie": cookie + activityCookie + ";IsvToken=" + $.token + ";AUTH_C_USER=" + $.AUTH_C_USER,
      "User-Agent": $.UA,
      "token": $.tokens
    }
  };
}
function refreshToken(_0x4e76x22c) {
  if (_0x4e76x22c) {
    if (_0x4e76x22c.headers["set-cookie"]) {
      cookie = originCookie + ";";
      for (let _0x4e76x234 of _0x4e76x22c.headers["set-cookie"]) {
        lz_cookie[_0x4e76x234.split(";")[0].substr(0, _0x4e76x234.split(";")[0].indexOf("="))] = _0x4e76x234.split(";")[0].substr(_0x4e76x234.split(";")[0].indexOf("=") + 1);
      }
      for (const _0x4e76x235 of Object.keys(lz_cookie)) {
        cookie += _0x4e76x235 + "=" + lz_cookie[_0x4e76x235] + ";";
      }
      activityCookie = cookie;
    }
  }
}
function getAuthorCodeList(_0x4e76x237) {
  return new Promise(_0x4e76x23f => {
    const _0x4e76x240 = {
      "url": _0x4e76x237 + "?" + new Date(),
      "timeout": 10000,
      "headers": {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 Edg/87.0.4280.88"
      }
    };
    $.get(_0x4e76x240, async (_0x4e76x241, _0x4e76x242, _0x4e76x243) => {
      try {
        if (_0x4e76x241) {
          $.getAuthorCodeListerr = false;
        } else {
          if (_0x4e76x243) {
            _0x4e76x243 = JSON.parse(_0x4e76x243);
          }
          $.getAuthorCodeListerr = true;
        }
      } catch (_0x2a1043) {
        $.logErr(_0x2a1043, _0x4e76x242);
        _0x4e76x243 = null;
      } finally {
        _0x4e76x23f(_0x4e76x243);
      }
    });
  });
}
function getUA() {
  $.UA = "jdapp;iPhone;10.2.2;14.3;" + randomString(40) + ";M/5.0;network/wifi;ADID/;model/iPhone12,1;addressid/4199175193;appBuild/167863;jdSupportDarkMode/0;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;";
}
function randomString(_0x4e76x246) {
  _0x4e76x246 = _0x4e76x246 || 32;
  let _0x4e76x24e = "abcdef0123456789",
    _0x4e76x24f = _0x4e76x24e.length,
    _0x4e76x250 = "";
  for (i = 0; i < _0x4e76x246; i++) {
    _0x4e76x250 += _0x4e76x24e.charAt(Math.floor(Math.random() * _0x4e76x24f));
  }
  return _0x4e76x250;
}
function getQueryString(_0x4e76x252, _0x4e76x253) {
  let _0x4e76x259 = new RegExp("(^|[&?])" + _0x4e76x253 + "=([^&]*)(&|$)");
  let _0x4e76x25a = _0x4e76x252.match(_0x4e76x259);
  if (_0x4e76x25a != null) {
    return unescape(_0x4e76x25a[2]);
  }
  return "";
}
function safeGet(_0x4e76x25c) {
  if (!_0x4e76x25c) {
    console.log("京东服务器返回数据为空");
    return false;
  }
  try {
    if (typeof JSON.parse(_0x4e76x25c) == "object") {
      return true;
    }
  } catch (_0x4329ac) {
    console.log(_0x4329ac);
    return false;
  }
}
function jsonParse(_0x4e76x263) {
  if (typeof _0x4e76x263 == "string") {
    try {
      return JSON.parse(_0x4e76x263);
    } catch (_0x4a70a3) {
      console.log(_0x4a70a3);
      $.msg($.name, "", "请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie");
      return [];
    }
  }
}
function random(_0x4e76x269, _0x4e76x26a) {
  return Math.floor(Math.random() * (_0x4e76x26a - _0x4e76x269)) + _0x4e76x269;
}

function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
