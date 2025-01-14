/*
活动名称：店铺礼包（超级无线）
活动链接：https://lzkj-isv.isvjcloud.com/prod/cc/interactsaas/index?activityType=10058&templateId=<模板id>&activityId=<活动id>&prd=cjwx
		https://lzkj-isv.isvjcloud.com/prod/cc/interaction/v1/index?activityType=10058&templateId=<模板id>&activityId=<活动id>&prd=cjwx
环境变量：jd_lzkj_loreal_shopGift_url // 活动链接
		jd_lzkj_loreal_shopGift_opencard // 是否入会（true/false），默认不入会
        jd_lzkj_loreal_shopGift_Notify // 是否推送通知（true/false），默认不推送
		
cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#店铺礼包（超级无线）
1 1 1 1 * jd_lzkj_loreal_shopGift.js, tag=店铺礼包（超级无线）, enabled=true		


*/
if (process.env.proxy_wind === 'true') {const setGlobalHttpProxy = require('./utils/proxy-wind.js');setGlobalHttpProxy();}
let lnrun = 0;


const $ = new Env('店铺礼包（超级无线）')
var version_ = "jsjiami.com.v7";
const ll11l1 = require("./jdCookie"),
  ll111 = require("./function/jdCommon"),
  llliII = require("./function/sendJDNotify"),
  iiIiIl = require("./function/krgetToken"),
  {
    wuxianDefense: IlI1l1
  } = require("./function/jdCrypto"),
  liIliI = process.env.jd_lzkj_loreal_shopGift_url || "",
  llii1I = process.env.jd_lzkj_loreal_shopGift_opencard === "true",
  iiIiIi = process.env.jd_lzkj_loreal_shopGift_Notify === "true";
let l1lll1 = "",
  IilI = "";
const liIlli = Object.keys(ll11l1).map(Ilii1 => ll11l1[Ilii1]).filter(ll11i1 => ll11i1);
!liIlli[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!liIliI) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  const Iill = ll111.parseUrl(liIliI);
  if (!Iill) {
    console.log("⚠ 请填写格式正确的链接");
    return;
  }
  $.activityUrl = liIliI;
  $.activityId = ll111.getUrlParameter(liIliI, "activityId");
  $.activityType = ll111.getUrlParameter(liIliI, "activityType");
  $.hostname = Iill.hostname;
  $.pathname = Iill.pathname;
  let ili1II = "";
  if ($.hostname) {
    if ($.hostname.includes("lorealjdcampaign-rc")) {
      ili1II = "apps/interact";
    } else {
      $.hostname.includes("lzkj") && (ili1II = $.pathname.replace(/\/index$/, ""));
    }
    $.baseUrl = "https://" + $.hostname;
    $.newbaseUrl = "https://" + $.hostname + "/" + ili1II;
    $.origin = $.baseUrl;
  }
  if (!$.activityId || !$.activityType || !ili1II || !$.hostname) {
    console.log("⚠ 请填写格式正确的变量");
    return;
  }
  llliII.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let IIIIli = 0; IIIIli < liIlli.length; IIIIli++) {
    $.index = IIIIli + 1;
    l1lll1 = liIlli[IIIIli];
    IilI = liIlli[IIIIli];
    ll111.setCookie(IilI);
    $.UserName = decodeURIComponent(ll111.getCookieValue(l1lll1, "pt_pin"));
    $.UA = ll111.genUA($.UserName);
    $.UUID = ll111.genUuid("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    $.te = Math.floor(Math.random() * 9000) + 1000;
    $.message = llliII.create($.index, $.UserName);
    $.nickName = "";
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
    await lil11();
    ll111.unsetCookie();
    if ($.outFlag || $.runEnd) {
      break;
    }
  }
  iiIiIi && llliII.getMessage() && (llliII.updateContent(llliII.content + ("\n【活动地址】" + $.activityUrl)), await llliII.push());
})().catch(lil1l => $.logErr(lil1l)).finally(() => $.done());
async function lil11() {
  try {
    $.skipRun = false;
    $.token = "";
    $.pinToken = "";
    if ($.runEnd || $.outFlag) {
      return;
    }
    $.jdToken = await iiIiIl(IilI, $.baseUrl);
    if (!$.jdToken) {
      console.log("获取 Token 失败！");
      $.message.fix("获取[Token]失败");
      return;
    }
    await lllI1("login");
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if (!$.token) {
      console.log("未能获取用户鉴权信息！");
      $.message.fix("未能获取用户鉴权信息");
      return;
    }
    await $.wait(500);
    if ($.joinCode) {
      switch ($.joinCode) {
        case "1004":
          await lllI1("follow");
          await $.wait(500);
          await lllI1("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
          break;
        case "1005":
          await lllI1("follow");
          await $.wait(500);
          await lllI1("login");
          if ($.runEnd || $.outFlag || $.skipRun) {
            return;
          }
          await $.wait(500);
        case "1006":
          if (llii1I) {
            const llIi1 = await ll111.joinShopMember($.venderId);
            if (llIi1) {
              console.log("加入店铺会员成功");
              await lllI1("login");
              if ($.runEnd || $.outFlag || $.skipRun) {
                return;
              }
              await $.wait(500);
            } else {
              console.log("加入店铺会员失败，活动仅限店铺会员参与哦~");
              $.message.fix("加入店铺会员失败，活动仅限店铺会员参与");
              return;
            }
          } else {
            console.log("活动仅限店铺会员参与哦~");
            $.message.fix("活动仅限店铺会员参与");
            return;
          }
          break;
        default:
          if ($.joinCode !== "1001") {
            console.log($.joinDes);
            $.message.fix($.joinDes);
            return;
          }
          break;
      }
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
    } else {
      if ($.runEnd || $.outFlag || $.skipRun) {
        return;
      }
      console.log("未能获取用户活动状态");
      $.message.fix("未能获取用户活动状态");
      return;
    }
    if ($.hostname.includes("lzkj") && $.pathname.includes("/prod/cc/interactsaas")) {
      await lllI1("initPinToken");
      if (!$.pinToken) {
        console.log("获取 pinToken 失败！");
        $.message.fix("获取[pinToken]失败");
        return;
      }
      await $.wait(500);
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      switch ($.activityType) {
        case "10058":
          break;
        case "":
          console.log("未能获取活动类型");
          $.message.fix("未能获取活动类型");
          $.runEnd = true;
          return;
        default:
          console.log("❌ 当前活动类型（" + $.activityType + "）暂不受本脚本支持，请联系作者进行反馈！");
          $.message.fix("活动类型（" + $.activityType + "）不受支持");
          $.runEnd = true;
          return;
      }
      if ($.runEnd || $.outFlag) {
        return;
      }
      await $.wait(500);
    }
    await lllI1("shopGiftMain");
    await $.wait(500);
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    if ($.index === 1) {
      const lI1111 = $.activityContent?.["prizeInfoList"] || [];
      let Ilil1 = "";
      for (let IliII1 = 0; IliII1 < lI1111.length; IliII1++) {
        const l1iIi1 = lI1111[IliII1],
          i1I1I = l1iIi1.prizeName,
          llIil = l1iIi1.prizeType;
        Ilil1 += "" + i1I1I + (llIil === 5 ? "[专享价]" : llIil === 3 ? "[实物]" : "");
        IliII1 !== lI1111.length - 1 && (Ilil1 += "，");
      }
      console.log(($.shopName && "店铺名称：#" + $.shopName + "\n") + "店铺链接：https://shop.m.jd.com/?venderId=" + $.venderId + "\n活动奖品：" + Ilil1 + "\n");
      llliII.updateContent(llliII.content + (($.shopName && "\n【店铺名称】#" + $.shopName) + "\n【活动奖品】\n" + Ilil1));
    }
    if ($.runEnd || $.outFlag || $.skipRun) {
      return;
    }
    $.flag = $.activityContent?.["flag"] || false;
    $.memberUser = $.activityContent?.["memberUser"] || 0;
    $.activityName = $.activityContent?.["name"] || "";
    $.position = $.activityContent?.["position"] || "";
    $.visitor = $.activityContent?.["visitor"] || "";
    await lllI1("drawShopGift");
    await $.wait(500);
  } catch (IIiiI1) {
    console.log("❌ 脚本运行遇到了错误\n" + IIiiI1);
  }
}
async function Iillll(IIIIi1, ii1IIl) {
  try {
    switch (IIIIi1) {
      case "login":
        if (ii1IIl.resp_code === 0 && ii1IIl.data) {
          $.token = ii1IIl?.["data"]?.["token"];
          $.joinInfo = ii1IIl?.["data"]?.["joinInfo"];
          $.openCardUrl = $.joinInfo?.["openCardUrl"];
          $.shopId = ii1IIl?.["data"]?.["shopId"];
          $.venderId = ll111.getUrlParameter($.openCardUrl, "venderId");
          $.shopName = ii1IIl?.["data"]?.["shopName"];
          $.joinCode = $.joinInfo?.["joinCodeInfo"]?.["joinCode"];
          $.joinDes = $.joinInfo?.["joinCodeInfo"]?.["joinDes"];
        } else {
          ii1IIl.resp_msg ? (console.log(IIIIi1 + " " + ii1IIl.resp_msg), $.message.fix(ii1IIl.resp_msg), $.skipRun = true) : console.log("❓" + IIIIi1 + " " + JSON.stringify(ii1IIl));
        }
        break;
      case "follow":
        if (!(ii1IIl.resp_code === 0)) {
          ii1IIl.resp_msg ? (console.log(IIIIi1 + " " + ii1IIl.resp_msg), $.message.fix(ii1IIl.resp_msg), $.skipRun = true) : console.log("❓" + IIIIi1 + " " + JSON.stringify(ii1IIl));
        }
        break;
      case "initPinToken":
        if (ii1IIl.resp_code === 0 && ii1IIl.data) {
          ii1IIl = JSON.parse(ii1IIl.data);
          if (ii1IIl.resp_code === 0 && ii1IIl.data) {
            $.pinToken = ii1IIl?.["data"]?.["pinToken"];
            $.encryptPin = ii1IIl?.["data"]?.["encryptPin"];
          } else {
            if (ii1IIl.resp_code === 1000) {
              console.log(IIIIi1 + " " + ii1IIl.resp_msg);
              $.message.fix(ii1IIl.resp_msg);
              $.skipRun = true;
            } else {
              ii1IIl.resp_msg ? (console.log(IIIIi1 + " " + ii1IIl.resp_msg), $.message.fix(ii1IIl.resp_msg), $.skipRun = true) : (console.log("❓" + IIIIi1 + " " + JSON.stringify(ii1IIl)), $.skipRun = true);
            }
          }
        } else {
          console.log("❓" + IIIIi1 + " " + JSON.stringify(ii1IIl));
        }
        break;
      case "basicInfo":
        if (ii1IIl.resp_code === 0 && ii1IIl.data) {
          $.actStartTime = ii1IIl.data?.["startTime"];
          $.actEndTime = ii1IIl.data?.["endTime"];
          $.actStatus = ii1IIl.data?.["actStatus"];
          !$.activityType && ($.activityType = String(ii1IIl.data?.["actType"] || ""));
        } else {
          if (ii1IIl.resp_msg) {
            console.log(IIIIi1 + " " + ii1IIl.resp_msg);
            $.message.fix(ii1IIl.resp_msg);
          } else {
            console.log("❓" + IIIIi1 + " " + JSON.stringify(ii1IIl));
          }
        }
        break;
      case "shopGiftMain":
        if (ii1IIl.resp_code === 0 && ii1IIl.data) {
          $.activityContent = ii1IIl.data;
        } else {
          ii1IIl.resp_msg ? (console.log(IIIIi1 + " " + ii1IIl.resp_msg), $.message.fix(ii1IIl.resp_msg), $.skipRun = true, ["未开始", "结束", "不存在", "不在"].some(l1iIiI => ii1IIl.resp_msg.includes(l1iIiI)) && ($.runEnd = true)) : (console.log("❓" + IIIIi1 + " " + JSON.stringify(ii1IIl)), $.skipRun = true);
        }
        break;
      case "drawShopGift":
        if (ii1IIl.resp_code === 0) {
          console.log("🎉 领取成功");
          $.message.fix("领取成功");
        } else {
          ii1IIl.resp_msg ? (console.log("" + ii1IIl.resp_msg), $.message.fix(ii1IIl.resp_msg), ["未开始", "结束", "不存在", "不在"].some(IIIIiI => ii1IIl.resp_msg.includes(IIIIiI)) && ($.runEnd = true)) : (console.log("领取失败"), $.message.fix("领取失败"));
        }
        break;
    }
  } catch (i1i111) {
    console.log("❌ 未能正确处理 " + IIIIi1 + " 请求响应 " + (i1i111.message || i1i111));
  }
}
async function lllI1(ii1l1I) {
  if ($.runEnd || $.outFlag) {
    return;
  }
  let lIill1 = $.newbaseUrl,
    iiI1i1 = {},
    ilIlII = {},
    iIiil1 = "POST";
  switch (ii1l1I) {
    case "login":
      lIill1 += "/api/user-info/login";
      iiI1i1 = {
        status: "1",
        activityId: $.activityId,
        tokenPin: $.jdToken,
        source: "01",
        shareUserId: $.shareUserId || "",
        uuid: $.UUID
      };
      break;
    case "follow":
      lIill1 += "/api/task/followShop/follow";
      break;
    case "initPinToken":
      iIiil1 = "GET";
      lIill1 += "/api/user-info/initPinToken?status=1&activityId=" + $.activityId + "&jdToken=" + $.jdToken + "&source=01&shareUserId=" + ($.shareUserId || "") + "&uuid=" + $.UUID + "&clientTime=" + Date.now() + "&shopId=" + $.shopId;
      break;
    case "basicInfo":
      lIill1 += "/api/active/basicInfo";
      iiI1i1 = {
        activityId: $.activityId
      };
      break;
    case "shopGiftMain":
      lIill1 += "/api/shopGift/shopGiftMain";
      break;
    case "drawShopGift":
      lIill1 += "/api/shopGift/drawShopGift";
      iiI1i1 = {
        flag: $.flag,
        memberUser: $.memberUser,
        name: $.activityName,
        position: $.position,
        visitor: $.visitor
      };
      break;
    default:
      console.log("❌ 未知请求 " + ii1l1I);
      return;
  }
  const l1lI1i = iIiil1 === "POST" && $.pathname.includes("/prod/cc/interactsaas") && IlI1l1.isDefenseApi(lIill1.replace($.newbaseUrl, "").split("?")[0]);
  l1lI1i && (iiI1i1.actId = $.activityId, ilIlII = {
    ecyText: IlI1l1.encrypt(iiI1i1, $.pinToken, $.te)
  });
  const l1lI1l = {
    url: lIill1,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      Connection: "keep-alive",
      "Content-Type": "application/json;charset=UTF-8",
      Cookie: "IsvToken=" + $.jdToken + "; " + ($.pinToken ? ";pToken=" + $.pinToken : "") + ($.te ? ";te=" + $.te : ""),
      Host: $.hostname,
      Origin: $.origin,
      Referer: $.activityUrl,
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent": $.UA
    },
    body: JSON.stringify(l1lI1i ? ilIlII : iiI1i1),
    timeout: 30000
  };
  if ($.token) {
    l1lI1l.headers.token = $.token;
  }
  iIiil1 === "GET" && (delete l1lI1l.body, delete l1lI1l.headers["Content-Type"]);
  const l1I1Il = 5;
  let l1I1Ii = 0,
    IIlili = null,
    IIlill = false;
  while (l1I1Ii < l1I1Il) {
    l1I1Ii > 0 && (await $.wait(1000));
    const {
      err: lI1iiI,
      res: i11lII,
      data: iIIlli
    } = await III11I(l1lI1l, iIiil1);
    if (lI1iiI) {
      if (typeof lI1iiI === "string" && lI1iiI.includes("Timeout awaiting 'request'")) {
        IIlili = ii1l1I + " 请求超时，请检查网络重试";
      } else {
        const iIIlll = i11lII?.["statusCode"];
        if (iIIlll) {
          if ([403, 493].includes(iIIlll)) {
            IIlili = ii1l1I + " 请求失败，IP被限制（Response code " + iIIlll + "）";
            IIlill = true;
          } else {
            if ([400, 404].includes(iIIlll)) {
              IIlili = ii1l1I + " 请求配置参数错误，请联系开发者进行反馈（Response code " + iIIlll + "）";
            } else {
              [500].includes(iIIlll) && l1lI1i ? l1lI1l.body = JSON.stringify({
                ecyText: IlI1l1.encrypt(iiI1i1, $.pinToken, $.te)
              }) : IIlili = ii1l1I + " 请求失败（Response code " + iIIlll + "）";
            }
          }
        } else {
          IIlili = ii1l1I + " 请求失败 => " + (lI1iiI.message || lI1iiI);
        }
      }
      l1I1Ii++;
    } else {
      const li11 = ll111.getResponseCookie(i11lII);
      switch (ii1l1I) {
        case "initPinToken":
          const Illlll = ll111.getCookieValue(li11, "te");
          if (Illlll) {
            $.te = Illlll;
          }
          break;
      }
      if (iIIlli) {
        try {
          const llli1l = JSON.parse(iIIlli);
          Iillll(ii1l1I, llli1l);
          break;
        } catch (lI1ii1) {
          IIlili = "❌ " + ii1l1I + " 接口响应数据解析失败: " + lI1ii1.message;
          console.log("🚫 " + ii1l1I + " => " + String(iIIlli));
          l1I1Ii++;
        }
      } else {
        l1lI1i && (l1lI1l.body = JSON.stringify({
          ecyText: IlI1l1.encrypt(iiI1i1, $.pinToken, $.te)
        }));
        IIlili = "❌ " + ii1l1I + " 接口无响应数据";
        l1I1Ii++;
      }
      IIlill = false;
    }
  }
  l1I1Ii >= l1I1Il && (console.log(IIlili), IIlill && ($.outFlag = true, $.message && $.message.fix(IIlili)));
}
async function III11I(liliiI, ilIIiI = "POST") {
  if (ilIIiI === "POST") {
    return new Promise(async lIl1l1 => {
      $.post(liliiI, (li1i, ilIIil, lIili1) => {
        lIl1l1({
          err: li1i,
          res: ilIIil,
          data: lIili1
        });
      });
    });
  } else {
    if (ilIIiI === "GET") {
      return new Promise(async iiI1li => {
        $.get(liliiI, (iIiill, Ii1IIi, Ii1IIl) => {
          iiI1li({
            err: iIiill,
            res: Ii1IIi,
            data: Ii1IIl
          });
        });
      });
    } else {
      const ll1lll = "不支持的请求方法";
      return {
        err: ll1lll,
        res: null,
        data: null
      };
    }
  }
}
var version_ = "jsjiami.com.v7";
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
