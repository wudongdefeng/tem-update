/*
活动名称：邀请好友入会得好礼
活动链接：https://prodev.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code=<活动id>
环境变量：jd_prodev_actCode // 活动ID
        jd_prodev_invitePin // 需要助力的默认用户名，不填默认CK1
        jd_prodev_Address // 用户登记收货地址，按照顺序依次填写 收件人@手机号@省份@城市@区县@详细地址，多个用管道符分开
        jd_prodev_needPhysicalPrize // 是否领取实物奖品（true/false），默认领取（只会助力到需要领取奖品的档位）
		        jd_prodev_Notify // 是否推送通知（true/false），默认不推送

开卡邀请类活动，奖品自动过滤优惠券，自动助力并领取奖品，仅助力一个账号，🚀火箭本一秒运行5个号，助力指定账号需要先开通活动否则会提示邀请用户不存在

cron:1 1 1 1 *
============Quantumultx===============
[task_local]
#邀请好友入会得好礼
1 1 1 1 * jd_prodev.js, tag=邀请好友入会得好礼, enabled=true

*/
let lnrun = 0;


const $ = new Env('邀请好友入会得好礼')
const IIIlIl = require("./jdCookie"),
  IIIlI = require("./function/jdCommon"),
  IiiI = require("./function/sendJDNotify"),
  iIi1i = process.env.jd_prodev_actCode || "";
let l1iIll = process.env.jd_prodev_invitePin || "";
const l1iIli = process.env.jd_prodev_Notify === "true",
  iIi1l = process.env.jd_prodev_needPhysicalPrize !== "false";
let i1lIlI = "";
const l1lliI = Object.keys(IIIlIl).map(Iilll1 => IIIlIl[Iilll1]).filter(ll11I => ll11I);
!l1lliI[0] && ($.msg($.name, "【提示】请先获取Cookie"), process.exit(1));
!(async () => {
  if (!iIi1i) {
    console.log("⚠ 请先定义必要的环境变量后再运行脚本");
    return;
  }
  $.actCode = iIi1i;
  $.helpNums = 0;
  $.successCount = 0;
  $.minHelpNums = 0;
  $.addressList = {};
  $.rewardArray = [];
  $.activityUrl = "https://prodev.m.jd.com/mall/active/dVF7gQUVKyUcuSsVhuya5d2XD4F/index.html?code=" + $.actCode;
  IiiI.config({
    title: $.name
  });
  console.log("活动入口：" + $.activityUrl);
  for (let Iillli = 0; Iillli < l1lliI.length; Iillli++) {
    i1lIlI = l1lliI[Iillli];
    $.index = Iillli + 1;
    $.nickName = "";
    $.UserName = decodeURIComponent(IIIlI.getCookieValue(i1lIlI, "pt_pin"));
    $.UA = IIIlI.genUA($.UserName);
    $.uuid = "16" + IIIlI.genUuid("xxxxxxxxxxxxxxxxxxxxx", "0123456789");
    $.message = IiiI.create($.index, $.UserName);
    console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + "******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
    await I1I1iI();
    if ($.runEnd) {
      break;
    }
  }
  if ($.rewardArray.length > 0 && !$.jumpGetPrize) {
    if ($.successCount < $.minHelpNums) {
      return;
    }
    for (let ll11l1 = 0; ll11l1 < 1; ll11l1++) {
      i1lIlI = l1lliI[ll11l1];
      $.index = ll11l1 + 1;
      $.nickName = "";
      $.UserName = decodeURIComponent(IIIlI.getCookieValue(i1lIlI, "pt_pin"));
      $.UA = IIIlI.genUA($.UserName);
      $.uuid = "16" + IIIlI.genUuid("xxxxxxxxxxxxxxxxxxxxx", "0123456789");
      $.message = IiiI.create($.index, $.UserName);
      console.log("\n******开始【京东账号" + $.index + "】" + ($.nickName || $.UserName) + " 领取奖品******\n");
      let Interval = process.env.jd_jk_interval || 60 * 1000;console.log("环境变量jd_task_interval已设置为"+Interval/1000+"秒");lnrun++;if(lnrun == 3){console.log(`\n【访问接口次数达到2次，休息一分钟.....】\n`);await $.wait(Interval);lnrun = 0}
      let llliII = 0;
      for (const iiIiIl of $.rewardArray) {
        $.prizeStage += 1;
        await iiIiI1("memberBringInviteReward", encodeURIComponent(JSON.stringify({
          code: $.actCode,
          stage: iiIiIl
        })) + "&stage=" + iiIiIl);
        llliII += 1;
        if (llliII < 3) {
          await $.wait(5000);
        }
      }
    }
  }
  l1iIli && IiiI.getMessage() && (IiiI.updateContent(IiiI.content + ("\n【活动地址】" + $.activityUrl)), await IiiI.push());
})().catch(llii1I => $.logErr(llii1I)).finally(() => $.done());
async function I1I1iI() {
  $.skipRun = false;
  await ili1Ii();
  if ($.index === 1) {
    if ($.skipRun) {
      $.runEnd = true;
      $.jumpGetPrize = true;
      return;
    }
    const lil1I = Date.now();
    await iiIiI1("memberBringActPage", encodeURIComponent(JSON.stringify({
      code: $.actCode,
      invitePin: "",
      _t: lil1I
    })) + "&invitePin=&_t=" + lil1I);
    if (!$.memberBringActPage) {
      console.log("获取活动信息失败");
      $.message.fix("获取活动信息失败");
      $.runEnd = true;
      return;
    }
    $.memberBringActPage.nickname && $.message.updateUsername();
    $.venderId = $.memberBringActPage.venderId;
    $.successCount = $.memberBringActPage.successCount;
    let l1l1Ii = "【活动店铺】" + ($.memberBringActPage.shopName || "未知") + "\n【开始时间】" + $.time("yyyy-MM-dd HH:mm:ss", $.memberBringActPage.beginTime) + "\n【结束时间】" + $.time("yyyy-MM-dd HH:mm:ss", $.memberBringActPage.endTime);
    $.memberBringActPage?.["helpReward"]?.["rewardName"] && (l1l1Ii += "\n【助力奖励】" + ($.memberBringActPage.helpReward.rewardName.includes("券") ? "优惠券" : $.memberBringActPage.helpReward.rewardName) + "（" + $.memberBringActPage.helpReward?.["rewardTotal"] + "份）");
    let IIIIlI = false;
    for (const liiil1 of $.memberBringActPage.rewards) {
      l1l1Ii += "\n【活动奖品】邀请" + liiil1.inviteNum + "人 — " + liiil1.rewardName + " — " + liiil1.rewardStock + "/" + liiil1.rewardTotal + "（" + (0 == liiil1.rewardStatus ? "未获得" : 1 == liiil1.rewardStatus ? "进行中" : 2 == liiil1.rewardStatus ? "待领取" : 3 == liiil1.rewardStatus ? "已获得" : 4 == liiil1.rewardStatus ? "已发完" : "未知状态") + "）";
      if (liiil1.rewardStock <= 0) {
        continue;
      } else {
        IIIIlI = true;
      }
      if (liiil1.rewardStatus === 3 && !l1iIll) {
        continue;
      } else {
        if (liiil1.rewardType === 2) {
          continue;
        } else {
          if (liiil1.rewardType === 3 && !iIi1l) {
            continue;
          } else {
            $.rewardArray.push(liiil1.stage);
            $.minHelpNums === 0 && ($.minHelpNums = liiil1.inviteNum);
          }
        }
      }
      liiil1.rewardStatus !== 2 ? $.helpNums = liiil1.inviteNum : ($.hasNeedClaimedPrize = TextTrackCueList, l1iIll && ($.helpNums = liiil1.inviteNum));
    }
    console.log(l1l1Ii);
    IiiI.updateContent(IiiI.content + ("\n" + l1l1Ii));
    if ($.memberBringActPage.activityStatus === 2) {
      console.log("\n活动已结束");
      $.message.fix("活动已结束");
      $.runEnd = true;
      $.jumpGetPrize = true;
      return;
    } else {
      if ($.memberBringActPage.activityStatus === 0) {
        console.log("\n活动尚未开始");
        $.message.fix("活动尚未开始");
        $.runEnd = true;
        $.jumpGetPrize = true;
        return;
      } else {
        if (!IIIIlI) {
          console.log("\n奖品已全部发完，下次早点来吧~");
          $.message.fix("奖品已发完");
          $.runEnd = true;
          $.jumpGetPrize = true;
          return;
        }
      }
    }
    if ($.rewardArray.length === 0) {
      !l1iIll ? (console.log("\n活动奖品不符合偏好设定或已领过，不跑了~"), $.message.fix("活动奖品不符合偏好设定或已领过")) : (console.log("\n活动奖品不符合偏好设定，不跑了~"), $.message.fix("活动奖品不符合偏好设定"));
      $.runEnd = true;
      $.jumpGetPrize = true;
      return;
    }
    if (!l1iIll) {
      await iiIiI1("memberBringFirstInvite", encodeURIComponent(JSON.stringify({
        code: $.actCode,
        fp: "",
        eid: ""
      })) + "&fp=&eid=");
      if (!$.memberBringFirstInvite.success) {
        console.log("\n" + $.memberBringFirstInvite.errorMessage);
        $.message.fix($.memberBringFirstInvite.errorMessage);
        $.runEnd = true;
        $.jumpGetPrize = true;
        return;
      }
      const IIIIl1 = !!$.memberBringActPage?.["address"]?.["userName"];
      if (!IIIIl1 && iIi1l) {
        IIIlII();
        if (!$.addressList?.["addressVO"]) {
          $.jumpGetPrize = true;
          return;
        }
        await ili1Il("memberBringSaveAddress", $.addressList);
        await $.wait(1000);
      }
      if ($.helpNums === 0) {
        console.log("【当前邀请】" + $.successCount + "人");
        console.log("\n没有需要完成的邀请任务，直接去领奖品~");
        $.runEnd = true;
        return;
      } else {
        console.log("【当前邀请】" + $.successCount + "人\n【确认邀请】" + $.helpNums + "人");
      }
    } else {
      $.hasNeedClaimedPrize && (console.log("温馨提示：账号1有待领取的奖品，请单独运行脚本领取哦~"), $.message.insert("账号有待领取的奖品"));
    }
    $.joinMemberStop = false;
    if (!l1iIll) {
      l1iIll = $.UserName;
      for (let l11iIi = 0; l11iIi < 3; l11iIi++) {
        await iiIiI1("memberBringJoinMember", "" + encodeURIComponent(JSON.stringify({
          code: $.actCode
        })));
        if ($.joinMemberStop) {
          break;
        }
      }
      if (!$.joinMemberStop) {
        console.log("\n加入店铺会员失败");
        $.message.fix("加入店铺会员失败");
        $.runEnd = true;
        $.jumpGetPrize = true;
        return;
      }
    } else {
      for (let IliIII = 0; IliIII < 3; IliIII++) {
        await iiIiI1("memberBringJoinMember", encodeURIComponent(JSON.stringify({
          code: $.actCode,
          invitePin: l1iIll
        })) + "&invitePin=" + l1iIll);
        if ($.joinMemberStop) {
          break;
        }
      }
      $.jumpGetPrize = true;
      $.successCount = 0;
    }
  } else {
    if ($.skipRun || $.runEnd) {
      return;
    }
    $.joinMemberStop = false;
    for (let II1l = 0; II1l < 3; II1l++) {
      await iiIiI1("memberBringJoinMember", encodeURIComponent(JSON.stringify({
        code: $.actCode,
        invitePin: l1iIll
      })) + "&invitePin=" + l1iIll);
      if ($.joinMemberStop) {
        break;
      }
    }
    $.successCount >= $.helpNums && (console.log("助力已满"), $.message.insert("助力已满"), $.runEnd = true);
  }
}
function IIIlII() {
  const illli1 = process.env.jd_prodev_Address || process.env.WX_ADDRESS || "";
  if (illli1 && illli1 !== "") {
    let i1I1I = [];
    i1I1I = illli1.split("|");
    const llIil = Math.floor(Math.random() * i1I1I.length);
    if (i1I1I[llIil] === "") {
      console.log("随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！");
      return;
    } else {
      i1I1I = i1I1I[llIil];
    }
    if (process.env.jd_prodev_Address) {
      i1I1I = i1I1I.split("@");
      if (i1I1I.length !== 6) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (const IIIIi1 of [0, 1, 2, 3, 4, 5]) {
        if (i1I1I[IIIIi1] === "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    } else {
      i1I1I = i1I1I.split("@");
      if (i1I1I.length !== 8) {
        console.log("随机抽取到的收货地址信息格式存在错误（参数不足或过多）");
        return;
      }
      for (const i11iII of [0, 1, 2, 3, 4, 5, 6]) {
        if (i1I1I[i11iII] === "") {
          console.log("随机抽取到的收货地址信息格式存在错误（参数不能为空）");
          return;
        }
      }
    }
    $.addressList = {
      code: $.actCode,
      addressVO: {
        userName: i1I1I[0],
        telPhone: i1I1I[1],
        provinceName: i1I1I[2],
        cityName: i1I1I[3],
        countyName: i1I1I[4],
        detailInfo: i1I1I[5]
      }
    };
  } else {
    console.log("请先定义环境变量 jd_prodev_Address 用于设置实物类奖品的用户收货地址信息\n变量格式：收件人@手机号@省份@城市@区县@详细地址，需按照顺序依次填写，多个用管道符分开");
  }
}
function iiIiI1(IIiiII, llIiI) {
  return new Promise(async lI1lIl => {
    const I1ll11 = {
      url: "https://api.m.jd.com/api?client=&clientVersion=&appid=jdchoujiang_h5&t=" + $.now + "&functionId=" + IIiiII + "&body=" + llIiI + "&h5st=&openid=-1&uuid=" + $.uuid + "&code=" + $.actCode,
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-Hans-US;q=1, en-US;q=0.9",
        Connection: "keep-alive",
        "Content-Type": "application/json",
        Cookie: i1lIlI,
        Origin: "https://prodev.m.jd.com",
        Referer: "https://prodev.m.jd.com/",
        "User-Agent": $.UA
      }
    };
    $.get(I1ll11, (IllllI, liliil, I1iil1) => {
      try {
        if (IllllI) {
          console.log(String(IllllI));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (I1iil1) {
            I1iil1 = JSON.parse(I1iil1);
            switch (IIiiII) {
              case "memberBringActPage":
                $.memberBringActPage = I1iil1?.["data"];
                break;
              case "memberBringFirstInvite":
                $.memberBringFirstInvite = I1iil1;
                break;
              case "memberBringJoinMember":
                if (I1iil1.success) {
                  $.joinMemberStop = true;
                  console.log("加入店铺会员成功");
                  llIiI.includes("invitePin") && ($.successCount += 1, console.log("✅ 助力成功，当前已助力人数：" + $.successCount), $.message.fix("助力成功 ✅"));
                } else {
                  if (I1iil1.errorMessage) {
                    const ilIlIi = I1iil1.errorMessage;
                    if (ilIlIi === "交易失败") {
                      $.joinMemberStop = true;
                      console.log("加入店铺会员成功");
                      llIiI.includes("invitePin") && ($.successCount += 1, console.log("✅ 助力成功，当前已助力人数：" + $.successCount), $.message.fix("助力成功 ✅"));
                    } else {
                      if (ilIlIi === "data already exist") {
                        $.joinMemberStop = true;
                        llIiI.includes("invitePin") && (console.log("已经是会员了，无法助力好友哦~"), $.message.fix("已是会员无法助力"));
                      } else {
                        console.log(ilIlIi);
                        $.message.fix(ilIlIi);
                        $.index === 1 && !llIiI.includes("invitePin") && ($.runEnd = true);
                        for (let ilIlIl of ["未开始", "结束", "不存在", "不在"]) {
                          if (ilIlIi.includes(ilIlIl)) {
                            $.runEnd = true;
                            break;
                          }
                        }
                      }
                    }
                    if (ilIlIi.indexOf("火爆") > -1) {
                      $.joinMemberStop = true;
                    }
                  } else {
                    console.log(I1iil1);
                  }
                }
                break;
              case "memberBringInviteReward":
                if (I1iil1.success) {
                  console.log("奖品领取成功 ✅");
                  $.message.insert("奖品" + $.prizeStage + "领取成功");
                } else {
                  I1iil1.success === false ? I1iil1.errorMessage ? (console.log("奖品领取失败：" + I1iil1.errorMessage), $.message.insert("奖品" + $.prizeStage + "领取失败（" + I1iil1.errorMessage + "）")) : (console.log("奖品领取失败：" + I1iil1), $.message.insert("奖品" + $.prizeStage + "领取失败")) : console.log(I1iil1);
                }
                break;
              default:
                console.log(I1iil1);
                break;
            }
          } else {
            console.log("京东服务器返回空数据");
          }
        }
      } catch (i11lIi) {
        $.logErr(i11lIi, liliil);
      } finally {
        lI1lIl();
      }
    });
  });
}
async function ili1Il(ll1ll1, lilil1) {
  const I1iiii = {
    url: "https://api.m.jd.com/api?client=&clientVersion=&appid=jdchoujiang_h5&t=" + $.now + "&functionId=" + ll1ll1 + "&body=" + encodeURIComponent(JSON.stringify(lilil1)) + "&h5st=&openid=-1&uuid=" + $.uuid,
    headers: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-Hans-US;q=1, en-US;q=0.9",
      Connection: "keep-alive",
      "Content-Type": "application/json",
      Cookie: i1lIlI,
      Origin: "https://prodev.m.jd.com",
      Referer: "https://prodev.m.jd.com/",
      "User-Agent": $.UA
    },
    body: JSON.stringify(lilil1)
  };
  return new Promise(iIiiiI => {
    $.post(I1iiii, (ilI11i, ilI11l, li1I) => {
      try {
        if (ilI11i) {
          $.log(ilI11i);
        } else {
          if (li1I) {
            li1I = JSON.parse(li1I);
            switch (ll1ll1) {
              case "memberBringSaveAddress":
                !li1I.success && (console.log("收货地址登记失败"), $.message.insert("收货地址登记失败"));
                break;
              default:
                break;
            }
          }
        }
      } catch (lI1iiI) {
        $.log(lI1iiI);
      } finally {
        iIiiiI();
      }
    });
  });
}
function ili1Ii() {
  return new Promise(async ilIlI1 => {
    const IIlilI = {
      url: "https://plogin.m.jd.com/cgi-bin/ml/islogin",
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-CN,zh-Hans;q=0.9",
        Connection: "keep-alive",
        Cookie: i1lIlI,
        Host: "plogin.m.jd.com",
        "User-Agent": $.UA
      }
    };
    $.get(IIlilI, (llli1l, lI1ii1, llli1i) => {
      try {
        if (llli1l) {
          console.log(String(llli1l));
          console.log($.name + " API请求失败，请检查网路重试");
        } else {
          if (llli1i) {
            try {
              llli1i = JSON.parse(llli1i);
              llli1i.islogin === "0" && (console.log("❌ 账号无效"), $.message.fix("账号无效"), $.skipRun = true);
            } catch {
              console.log("京东服务器返回空数据");
              $.skipRun = true;
            }
          } else {
            console.log("京东服务器返回空数据");
            $.skipRun = true;
          }
        }
      } catch (IIlii1) {
        $.logErr(IIlii1, lI1ii1);
      } finally {
        ilIlI1();
      }
    });
  });
}
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(),"h+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), "S+": s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
