/*
new Env('Rebels_savePrize');
部分活动填地址通用库
*/
const IIiiIl = require("got"),
      l1ilIl = require("fs");

!l1ilIl.existsSync("./utils/prize") && l1ilIl.mkdirSync("./utils/prize");
const l1ilIi = "./utils/prize/addr_record.csv";

if (!l1ilIl.existsSync(l1ilIi)) {
  let llIi1 = "奖品,收货人,手机,地址,活动链接,具体时间\n";
  l1ilIl.writeFileSync(l1ilIi, llIi1, {
    "encoding": "utf-8",
    "flag": "a"
  });
  console.log("初始化奖品记录文件成功");
}

const l11iIi = new Date();
l11iIi.setMilliseconds(0);

async function ll11li(IliIII) {
  let {
    baseUrl: liiiiI,
    cookie: II1i,
    ua: illli1,
    activityId: I1lII1,
    activityType: Ill111,
    venderId: I1iI11,
    secretPin: II11,
    prizeName: l1ilII,
    generateId: ii1II1,
    activityUrl: iliIll
  } = IliIII;
  const llliIl = process.env.WX_ADDRESS || "",
        iliIli = process.env.WX_ADDRESS_BLOCK || "";

  if (llliIl === "") {
    return false;
  }

  const illliI = llliIl.split("|"),
        ii1III = Math.floor(Math.random() * illliI.length);
  if (illliI[ii1III] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  const [i11iIl, ll11ll, l11iIl, i11iIi, IIIIll, liiiii, II1I, lI1111] = illliI[ii1III].split("@");

  if (lI1111 === undefined) {
    return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
  }

  for (let i1i111 = 0; i1i111 < 7; i1i111++) {
    if (illliI[i1i111] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }

  if (iliIli !== "") {
    const lI1lII = iliIli.split("@");
    if (lI1lII.some(lIill1 => l1ilII.includes(lIill1))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
  }

  Array.isArray(I1iI11) && (shopId = I1iI11[1], I1iI11 = I1iI11[0]);
  const Ilil1 = {
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": liiiiI.match(/https?:\/\/([^/]+)/)[1],
      "Origin": liiiiI,
      "Content-Type": "application/x-www-form-urlencoded",
      "Referer": liiiiI + "/wxAddress/save",
      "Cookie": II1i,
      "User-Agent": illli1
    },
    "body": "venderId=" + I1iI11 + "&pin=" + (liiiiI.includes("cjhy") ? encodeURIComponent(encodeURIComponent(II11)) : encodeURIComponent(II11)) + "&activityId=" + I1lII1 + "&actType=" + Ill111 + "&prizeName=" + encodeURIComponent(l1ilII) + "&receiver=" + encodeURIComponent(i11iIl) + "&phone=" + ll11ll + "&province=" + encodeURIComponent(l11iIl) + "&city=" + encodeURIComponent(i11iIi) + "&county=" + encodeURIComponent(IIIIll) + "&areaCode=" + II1I + "&address=" + encodeURIComponent(liiiii) + "&generateId=" + ii1II1 + "&postalCode=" + lI1111,
    "timeout": 30000
  },
        IliII1 = 5;
  let l1iIi1 = 0,
      i1I1I = null;

  while (l1iIi1 < IliII1) {
    let iIiil1 = null;

    try {
      iIiil1 = await IIiiIl.post(liiiiI + "/wxAddress/save", Ilil1);
    } catch (l1lI1l) {
      if (l1lI1l?.["response"]) {
        l1lI1l = l1lI1l.response;
        if (typeof l1lI1l === "string" && l1lI1l.includes("Timeout awaiting 'request'")) i1I1I = "请求超时，请检查网络重试";else {
          const l1I1Il = iIiil1?.["statusCode"];

          if (l1I1Il) {
            if ([403, 493].includes(l1I1Il)) i1I1I = "请求失败，IP被限制（Response code " + l1I1Il + "）";else [400, 404].includes(l1I1Il) ? i1I1I = "请求配置参数错误，请联系开发者进行反馈（Response code " + l1I1Il + "）" : i1I1I = "请求失败（Response code " + l1I1Il + "）";
          } else i1I1I = "API请求失败 " + (l1lI1l.message || l1lI1l);
        }
      } else l1lI1l?.["response"]?.["body"] ? i1I1I = "请求失败 " + l1lI1l.response.body + " " : i1I1I = "请求失败 " + (l1lI1l || "") + " ";

      l1iIi1++;
    }

    if (iIiil1 && typeof iIiil1 === "object") {
      if (iIiil1?.["body"]) try {
        const IIlili = JSON.parse(iIiil1.body);

        if (IIlili && IIlili.result) {
          console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (ii1III + 1) + "套收货地址信息\n联系信息：" + i11iIl + " (" + ll11ll.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n");
          let IIlill = [i11iIl, ll11ll, l1ilII, iliIll.toString(), l11iIi];
          return l1ilIl.writeFileSync(l1ilIi, IIlill.join(",") + "\n", {
            "encoding": "utf-8",
            "flag": "a"
          }), true;
        } else {
          if (l1iIi1 === 0 && shopId) Ilil1.body = "venderId=" + shopId + "&pin=" + (liiiiI.includes("cjhy") ? encodeURIComponent(encodeURIComponent(II11)) : encodeURIComponent(II11)) + "&activityId=" + I1lII1 + "&actType=" + Ill111 + "&prizeName=" + encodeURIComponent(l1ilII) + "&receiver=" + encodeURIComponent(i11iIl) + "&phone=" + ll11ll + "&province=" + encodeURIComponent(l11iIl) + "&city=" + encodeURIComponent(i11iIi) + "&county=" + encodeURIComponent(IIIIll) + "&areaCode=" + II1I + "&address=" + encodeURIComponent(liiiii) + "&generateId=" + ii1II1 + "&postalCode=" + lI1111, l1iIi1++;else {
            return console.log("🚫 保存收货地址失败 ➜ " + (IIlili.errorMessage || JSON.stringify(iIiil1))), false;
          }
        }
      } catch (I1iil1) {
        return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (I1iil1.message || I1iil1)), false;
      } else i1I1I = "无响应数据", l1iIi1++;
    }

    iIiil1 = null;
  }

  return l1iIi1 >= IliII1 && console.log("🚫 保存收货地址异常 ➜ " + i1I1I), false;
}

async function iliIlI(lI1il1) {
  let {
    baseUrl: iIiilI,
    newbaseUrl: iIiiil,
    cookie: iIiiii,
    ua: ilIlIi,
    token: ilIlIl,
    prizeName: l1lI1I,
    orderCode: ll1llI,
    activityUrl: i11lIl
  } = lI1il1;
  const l1lI11 = process.env.WX_ADDRESS || "",
        lI1iii = process.env.WX_ADDRESS_BLOCK || "";

  if (l1lI11 === "") {
    return false;
  }

  const i11lIi = l1lI11.split("|"),
        ll1ll1 = Math.floor(Math.random() * i11lIi.length);
  if (i11lIi[ll1ll1] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  const [lilil1, lIilli, I1iiii, iiI1iI, I1iiil, Illll1] = i11lIi[ll1ll1].split("@");

  for (let IliIlI = 0; IliIlI < 6; IliIlI++) {
    if (i11lIi[IliIlI] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
  }

  if (lI1iii !== "") {
    const i1111l = lI1iii.split("@");
    if (i1111l.some(i1111i => l1lI1I.includes(i1111i))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
  }

  const lI1iil = iIiilI.match(/https?:\/\/([^/]+)/)[1],
        lIilll = {
    "realName": lilil1,
    "mobile": lIilli,
    "address": Illll1,
    "orderCode": ll1llI,
    "province": I1iiii,
    "city": iiI1iI,
    "county": I1iiil
  },
        iIiiiI = {
    "headers": {
      "Accept": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-cn",
      "Connection": "keep-alive",
      "Host": lI1iil,
      "Origin": iIiilI,
      "Content-Type": "application/json;charset=UTF-8",
      "Referer": iIiiil + "/api/my/prize/update",
      "token": ilIlIl,
      "Cookie": iIiiii,
      "User-Agent": ilIlIi
    },
    "body": JSON.stringify(lIilll),
    "timeout": 30000
  },
        ilI11i = 5;
  let ilI11l = 0,
      li1I = null;

  while (ilI11l < ilI11i) {
    let Illli1 = null;

    try {
      Illli1 = await IIiiIl.post(iIiiil + "/api/my/prize/update", iIiiiI);
    } catch (ilIIii) {
      if (ilIIii?.["response"]) {
        ilIIii = ilIIii.response;
        if (typeof ilIIii === "string" && ilIIii.includes("Timeout awaiting 'request'")) li1I = "请求超时，请检查网络重试";else {
          const lIl1l1 = Illli1?.["statusCode"];

          if (lIl1l1) {
            if ([403, 493].includes(lIl1l1)) li1I = "请求失败，IP被限制（Response code " + lIl1l1 + "）";else [400, 404].includes(lIl1l1) ? li1I = "请求配置参数错误，请联系开发者进行反馈（Response code " + lIl1l1 + "）" : li1I = "请求失败（Response code " + lIl1l1 + "）";
          } else {
            li1I = "API请求失败 " + (ilIIii.message || ilIIii);
          }
        }
      } else ilIIii?.["response"]?.["body"] ? li1I = "请求失败 " + ilIIii.response.body + " " : li1I = "请求失败 " + (ilIIii || "") + " ";

      ilI11l++;
    }

    if (Illli1?.["body"]) try {
      const lIili1 = JSON.parse(Illli1.body);

      if (lIili1 && lIili1.resp_code === 0) {
        console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (ll1ll1 + 1) + "套收货地址信息\n联系信息：" + lilil1 + " (" + lIilli.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n");
        let li1l = [lilil1, lIilli, l1lI1I, i11lIl.toString(), l11iIi];
        return l1ilIl.writeFileSync(l1ilIi, li1l.join(",") + "\n", {
          "encoding": "utf-8",
          "flag": "a"
        }), true;
      } else {
        if (lIili1 && lIili1.resp_code === 2) {
          return console.log("🚫 保存收货地址失败 ➜ " + (lIili1.resp_msg || JSON.stringify(lIili1))), false;
        } else {
          if (ilI11l < 5) console.log("🚫 保存收货地址失败 ➜ " + (lIili1.resp_msg || JSON.stringify(lIili1))), ilI11l++;else return console.log("🚫 保存收货地址失败 ➜ " + (lIili1.resp_msg || JSON.stringify(lIili1))), false;
        }
      }
    } catch (i1111I) {
      return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (i1111I.message || i1111I)), false;
    } else li1I = "无响应数据", ilI11l++;
    Illli1 = null;
  }

  return ilI11l >= ilI11i && console.log("🚫 保存收货地址异常 ➜ " + li1I), false;
}

async function lI111I(IliIl1) {
  let {
    baseUrl: iiI1ll,
    cookie: lIiliI,
    ua: iIiill,
    venderId: Ii1IIi,
    prizeName: Ii1IIl,
    orderCode: l111I,
    activityUrl: ll1lli
  } = IliIl1;
  const ll1lll = process.env.WX_ADDRESS || "",
        Illlil = process.env.WX_ADDRESS_BLOCK || "";

  if (ll1lll === "") {
    return false;
  }

  const I1iili = ll1lll.split("|"),
        lililI = Math.floor(Math.random() * I1iili.length);
  if (I1iili[lililI] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
  const [lI1ill, Illlii, lI1ili, Il1II, i1lll, Ii11I] = I1iili[lililI].split("@");

  for (let Ii11i = 0; Ii11i < 6; Ii11i++) {
    if (I1iili[Ii11i] === "") {
      return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }
  }

  if (Illlil !== "") {
    const iIIli1 = Illlil.split("@");

    if (iIIli1.some(Ii1l1i => Ii1IIl.includes(Ii1l1i))) {
      return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
    }
  }

  const I1iill = iiI1ll.match(/https?:\/\/([^/]+)/)[1],
        i1lli = "receiverName=" + encodeURIComponent(lI1ill) + "&mobile=" + Illlii + "&address=" + encodeURIComponent(lI1ili) + "+" + encodeURIComponent(Il1II) + "+" + encodeURIComponent(i1lll) + encodeURIComponent(Ii11I) + "&log_id=" + l111I + "&user_id=" + Ii1IIi,
        i11111 = {
    "headers": {
      "Accept": "application/json, text/plain, */*",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
      "Connection": "keep-alive",
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Cookie": lIiliI,
      "Host": I1iill,
      "Origin": iiI1ll,
      "Referer": ll1lli,
      "User-Agent": iIiill
    },
    "body": i1lli,
    "timeout": 30000
  },
        lIl1li = 5;
  let Il1I1 = 0,
      lIilii = null;

  while (Il1I1 < lIl1li) {
    let i1Iiil = null;

    try {
      i1Iiil = await IIiiIl.post(iiI1ll + "/ql/front/postBuyerInfo", i11111);
    } catch (i1Iiii) {
      if (i1Iiii?.["response"]) {
        i1Iiii = i1Iiii.response;

        if (typeof i1Iiii === "string" && i1Iiii.includes("Timeout awaiting 'request'")) {
          lIilii = "请求超时，请检查网络重试";
        } else {
          const IilIi = i1Iiil?.["statusCode"];

          if (IilIi) {
            if ([403, 493].includes(IilIi)) {
              lIilii = "请求失败，IP被限制（Response code " + IilIi + "）";
            } else [400, 404].includes(IilIi) ? lIilii = "请求配置参数错误，请联系开发者进行反馈（Response code " + IilIi + "）" : lIilii = "请求失败（Response code " + IilIi + "）";
          } else {
            lIilii = "API请求失败 " + (i1Iiii.message || i1Iiii);
          }
        }
      } else i1Iiii?.["response"]?.["body"] ? lIilii = "请求失败 " + i1Iiii.response.body + " " : lIilii = "请求失败 " + (i1Iiii || "") + " ";

      Il1I1++;
    }

    if (i1Iiil?.["body"]) try {
      const I1iII = JSON.parse(i1Iiil.body);

      if (I1iII && I1iII.succ) {
        console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (lililI + 1) + "套收货地址信息\n联系信息：" + lI1ill + " (" + Illlii.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n");
        let IIlI1i = [lI1ill, Illlii, Ii1IIl, ll1lli.toString(), l11iIi];
        return l1ilIl.writeFileSync(l1ilIi, IIlI1i.join(",") + "\n", {
          "encoding": "utf-8",
          "flag": "a"
        }), true;
      } else {
        if (I1iII && I1iII.succ === false) return console.log("🚫 保存收货地址失败 ➜ " + (I1iII.msg || JSON.stringify(I1iII))), false;else {
          if (Il1I1 < 5) console.log("🚫 保存收货地址失败 ➜ " + (I1iII.msg || JSON.stringify(I1iII))), Il1I1++;else {
            return console.log("🚫 保存收货地址失败 ➜ " + (I1iII.msg || JSON.stringify(I1iII))), false;
          }
        }
      }
    } catch (Ii1l1I) {
      return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (Ii1l1I.message || Ii1l1I)), false;
    } else {
      lIilii = "无响应数据";
      Il1I1++;
    }
    i1Iiil = null;
  }

  return Il1I1 >= lIl1li && console.log("🚫 保存收货地址异常 ➜ " + lIilii), false;
}

async function IlilI(l1lilI, i1Iil1, liI1Ii, l1lil1, i1lil, I1iIl, IilII, ili1l, i1lii) {
  const liI1Il = process.env.WX_ADDRESS || "",
        I1iIi = process.env.WX_ADDRESS_BLOCK ? process.env.WX_ADDRESS_BLOCK : "";
  let iiiI1I = [];
  if (liI1Il != "") iiiI1I = liI1Il.split("|");else {
    return false;
  }
  var lilI11 = Math.floor(Math.random() * iiiI1I.length);
  if (iiiI1I[lilI11] == "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;else {
    iiiI1I = iiiI1I[lilI11];
  }
  iiiI1I = iiiI1I.split("@");
  if (iiiI1I.length != 8) return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;

  for (let llIII1 = 0; llIII1 < 7; llIII1++) {
    if (iiiI1I[llIII1] == "") {
      return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }
  }

  const Ili1II = iiiI1I[0],
        ili1i = iiiI1I[1],
        IiIi1 = iiiI1I[2],
        l1Ii1 = iiiI1I[3],
        i1IilI = iiiI1I[4],
        III1I1 = iiiI1I[5],
        ilI111 = iiiI1I[6],
        I1IllI = iiiI1I[7];

  if (I1iIi != "") {
    let Illi1 = I1iIi.split("@"),
        l1iiIl = false;

    for (let lIIi1i of Illi1) {
      if (ili1l.includes(lIIi1i)) {
        console.log("\n🚫 触发（" + lIIi1i + "）实物奖品自动登记收货地址屏蔽关键词，跳过~\n");
        l1iiIl = true;
        break;
      }
    }

    if (l1iiIl) return false;
  }

  const IIlI11 = l1lilI.includes("cjhy") ? encodeURIComponent(encodeURIComponent(IilII)) : encodeURIComponent(IilII),
        iIIll1 = l1lilI.match(/https?:\/\/([^/]+)/)[1],
        llIIII = "venderId=" + I1iIl + "&pin=" + IIlI11 + "&activityId=" + l1lil1 + "&actType=" + i1lil + "&prizeName=" + encodeURIComponent(ili1l) + "&receiver=" + encodeURIComponent(Ili1II) + "&phone=" + ili1i + "&province=" + encodeURIComponent(IiIi1) + "&city=" + encodeURIComponent(l1Ii1) + "&county=" + encodeURIComponent(i1IilI) + "&areaCode=" + ilI111 + "&address=" + encodeURIComponent(III1I1) + "&generateId=" + i1lii + "&postalCode=" + I1IllI;
  let ilI11I = false;

  try {
    let l1IIl1 = await IIiiIl.post(l1lilI + "/wxAddress/save", {
      "headers": {
        "Accept": "application/json",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "zh-cn",
        "Connection": "keep-alive",
        "Host": iIIll1,
        "Origin": l1lilI,
        "Content-Type": "application/x-www-form-urlencoded",
        "Referer": l1lilI + "/wxAddress/save",
        "Cookie": i1Iil1,
        "User-Agent": liI1Ii
      },
      "body": llIIII
    }).json().catch(l1iiIi => {
      console.error("🚫 wxSavePrize API请求失败 ➜ (" + l1iiIi.response.statusCode + " " + l1iiIi.response.statusMessage + ")\n");
    });
    if (l1IIl1 && l1IIl1.result) console.log("\n已自动提交收货地址 ✅\n"), console.log("登记模板：采用第" + (lilI11 + 1) + "套收货地址信息（随机抽取）"), console.log("联系信息：" + Ili1II + " (" + ili1i.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）"), console.log(""), ilI11I = true;else {
      if (l1IIl1.errorMessage) console.log("🚫 保存收货地址失败 ➜ " + l1IIl1.errorMessage);else {
        console.log("🚫 保存收货地址失败 ➜ " + JSON.stringify(l1IIl1));
      }
      console.log("");
    }
  } catch (iiiII1) {
    console.log("🚫 保存收货地址异常 ➜ " + iiiII1);
  }

  return ilI11I;
}

module.exports = {
  "wxSavePrize": IlilI,
  "wuxian_savePrize": ll11li,
  "loreal_savePrize": iliIlI,
  "jinggeng_savePrize": lI111I
};