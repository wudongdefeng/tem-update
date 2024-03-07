/*
new Env('savePrize');
全品类填地址通用库
*/

const got = require('got')

async function wuxian_savePrize(ll1iilIl) {
    let {
        baseUrl: il1illii,
        cookie: Iii1lliI,
        ua: iIl1IiII,
        activityId: iilII,
        activityType: iIliIi,
        venderId: l1IIIl1,
        secretPin: il1IIlli,
        prizeName: lllIlIl,
        generateId: i1l1iIII
    } = ll1iilIl;
    const iiiiil1 = process.env.WX_ADDRESS || "",
        l1I1iliI = process.env.WX_ADDRESS_BLOCK || "";

    if (iiiiil1 === "") {
        return false;
    }

    const I1lI11II = iiiiil1.split("|"),
        IlIi1IiI = Math.floor(Math.random() * I1lI11II.length);

    if (I1lI11II[IlIi1IiI] === "") {
        return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
    }

    const [iliIlil, iI1iIIiI, Iil11i1i, lIlilII1, iiI, Il111lll, i1111IIi, iIIliill] = I1lI11II[IlIi1IiI].split("@");

    if (iIIliill === undefined) {
        return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;
    }

    for (let I1IIiIIi = 0; I1IIiIIi < 7; I1IIiIIi++) {
        if (I1lI11II[I1IIiIIi] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }

    if (l1I1iliI !== "") {
        const I1ll111I = l1I1iliI.split("@");
        if (I1ll111I.some(li1illl => lllIlIl.includes(li1illl))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
    }

    Array.isArray(l1IIIl1) && (shopId = l1IIIl1[1], l1IIIl1 = l1IIIl1[0]);
    const I1IiIl = {
        "headers": {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "zh-cn",
            "Connection": "keep-alive",
            "Host": il1illii.match(/https?:\/\/([^/]+)/)[1],
            "Origin": il1illii,
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": il1illii + "/wxAddress/save/",
            "Cookie": Iii1lliI,
            "User-Agent": iIl1IiII
        },
        "body": "venderId=" + l1IIIl1 + "&pin=" + (il1illii.includes("cjhy") ? encodeURIComponent(encodeURIComponent(il1IIlli)) : encodeURIComponent(il1IIlli)) + "&activityId=" + iilII + "&actType=" + iIliIi + "&prizeName=" + encodeURIComponent(lllIlIl) + "&receiver=" + encodeURIComponent(iliIlil) + "&phone=" + iI1iIIiI + "&province=" + encodeURIComponent(Iil11i1i) + "&city=" + encodeURIComponent(lIlilII1) + "&county=" + encodeURIComponent(iiI) + "&areaCode=" + i1111IIi + "&address=" + encodeURIComponent(Il111lll) + "&generateId=" + i1l1iIII + "&postalCode=" + iIIliill,
        "timeout": 30000
    },
        iIli1il = 5;
    let lllIlli1 = 0,
        II1iiIli = null;

    while (lllIlli1 < iIli1il) {
        let I11iil11 = null;

        try {
            I11iil11 = await got.post(il1illii + "/wxAddress/save", I1IiIl);
        } catch (IIlIlili) {
            if (IIlIlili?.["response"]) {
                IIlIlili = IIlIlili.response;

                if (typeof IIlIlili === "string" && IIlIlili.includes("Timeout awaiting 'request'")) {
                    II1iiIli = "请求超时，请检查网络重试";
                } else {
                    const i1lliiiI = I11iil11?.["statusCode"];

                    if (i1lliiiI) {
                        if ([403, 493].includes(i1lliiiI)) II1iiIli = "请求失败，IP被限制（Response code " + i1lliiiI + "）"; else[400, 404].includes(i1lliiiI) ? II1iiIli = "请求配置参数错误，请联系开发者进行反馈（Response code " + i1lliiiI + "）" : II1iiIli = "请求失败（Response code " + i1lliiiI + "）";
                    } else {
                        II1iiIli = "API请求失败 " + (IIlIlili.message || IIlIlili);
                    }
                }
            } else {
                if (IIlIlili?.["response"]?.["body"]) II1iiIli = "请求失败 " + IIlIlili.response.body + " "; else {
                    II1iiIli = "请求失败 " + (IIlIlili || "") + " ";
                }
            }

            lllIlli1++;
        }

        if (I11iil11 && typeof I11iil11 === "object") {
            if (I11iil11?.["body"]) {
                try {
                    const ilIlillI = JSON.parse(I11iil11.body);

                    if (ilIlillI && ilIlillI.result) {
                        return console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (IlIi1IiI + 1) + "套收货地址信息\n联系信息：" + iliIlil + " (" + iI1iIIiI.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n"), true;
                    } else {
                        if (lllIlli1 === 0 && shopId) I1IiIl.body = "venderId=" + shopId + "&pin=" + (il1illii.includes("cjhy") ? encodeURIComponent(encodeURIComponent(il1IIlli)) : encodeURIComponent(il1IIlli)) + "&activityId=" + iilII + "&actType=" + iIliIi + "&prizeName=" + encodeURIComponent(lllIlIl) + "&receiver=" + encodeURIComponent(iliIlil) + "&phone=" + iI1iIIiI + "&province=" + encodeURIComponent(Iil11i1i) + "&city=" + encodeURIComponent(lIlilII1) + "&county=" + encodeURIComponent(iiI) + "&areaCode=" + i1111IIi + "&address=" + encodeURIComponent(Il111lll) + "&generateId=" + i1l1iIII + "&postalCode=" + iIIliill, lllIlli1++; else return console.log("🚫 保存收货地址失败 ➜ " + (ilIlillI.errorMessage || JSON.stringify(I11iil11))), false;
                    }
                } catch (i1liIlli) {
                    return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (i1liIlli.message || i1liIlli)), false;
                }
            } else II1iiIli = "无响应数据", lllIlli1++;
        }

        I11iil11 = null;
    }

    return lllIlli1 >= iIli1il && console.log("🚫 保存收货地址异常 ➜ " + II1iiIli), false;
}

async function loreal_savePrize(iIIlIlli) {
    let {
        baseUrl: Ii1iIii1,
        newbaseUrl: i1Illlll,
        cookie: I1l1iiii,
        ua: lll1Ili1,
        token: iI1II1li,
        prizeName: li1lilIi,
        orderCode: liIIIIi
    } = iIIlIlli;
    const Ii1iIlil = process.env.WX_ADDRESS || "",
        lI1II1Il = process.env.WX_ADDRESS_BLOCK || "";
    if (Ii1iIlil === "") return false;
    const Ii1Il1li = Ii1iIlil.split("|"),
        lilll1ll = Math.floor(Math.random() * Ii1Il1li.length);

    if (Ii1Il1li[lilll1ll] === "") {
        return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
    }

    const [lI1Ilil1, il1l1iII, i1IIlli, I1illlIi, IllllIll, IIIl1ii] = Ii1Il1li[lilll1ll].split("@");

    for (let I1IilIiI = 0; I1IilIiI < 6; I1IilIiI++) {
        if (Ii1Il1li[I1IilIiI] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }

    if (lI1II1Il !== "") {
        const IIillll = lI1II1Il.split("@");
        if (IIillll.some(ii11l1lI => li1lilIi.includes(ii11l1lI))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
    }

    const l1IliIII = Ii1iIii1.match(/https?:\/\/([^/]+)/)[1],
        llI1I1Il = {
            "realName": lI1Ilil1,
            "mobile": il1l1iII,
            "address": IIIl1ii,
            "orderCode": liIIIIi,
            "province": i1IIlli,
            "city": I1illlIi,
            "county": IllllIll
        },
        li111Iil = {
            "headers": {
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Host": l1IliIII,
                "Origin": Ii1iIii1,
                "Content-Type": "application/json;charset=UTF-8",
                "Referer": i1Illlll + "/api/my/prize/update/",
                "token": iI1II1li,
                "Cookie": I1l1iiii,
                "User-Agent": lll1Ili1
            },
            "body": JSON.stringify(llI1I1Il),
            "timeout": 30000
        },
        ll11lI1I = 5;
    let li11IIll = 0,
        iliII1ll = null;

    while (li11IIll < ll11lI1I) {
        let ili11Iii = null;

        try {
            ili11Iii = await got.post(i1Illlll + "/api/my/prize/update", li111Iil);
        } catch (I1l1IIiI) {
            if (I1l1IIiI?.["response"]) {
                I1l1IIiI = I1l1IIiI.response;
                if (typeof I1l1IIiI === "string" && I1l1IIiI.includes("Timeout awaiting 'request'")) iliII1ll = "请求超时，请检查网络重试"; else {
                    const l1ii1li = ili11Iii?.["statusCode"];

                    if (l1ii1li) {
                        if ([403, 493].includes(l1ii1li)) iliII1ll = "请求失败，IP被限制（Response code " + l1ii1li + "）"; else[400, 404].includes(l1ii1li) ? iliII1ll = "请求配置参数错误，请联系开发者进行反馈（Response code " + l1ii1li + "）" : iliII1ll = "请求失败（Response code " + l1ii1li + "）";
                    } else {
                        iliII1ll = "API请求失败 " + (I1l1IIiI.message || I1l1IIiI);
                    }
                }
            } else {
                if (I1l1IIiI?.["response"]?.["body"]) iliII1ll = "请求失败 " + I1l1IIiI.response.body + " "; else {
                    iliII1ll = "请求失败 " + (I1l1IIiI || "") + " ";
                }
            }

            li11IIll++;
        }

        if (ili11Iii?.["body"]) try {
            const iiIiIII = JSON.parse(ili11Iii.body);
            if (iiIiIII && iiIiIII.resp_code === 0) return console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (lilll1ll + 1) + "套收货地址信息\n联系信息：" + lI1Ilil1 + " (" + il1l1iII.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n"), true; else {
                if (iiIiIII && iiIiIII.resp_code === 2) {
                    return console.log("🚫 保存收货地址失败 ➜ " + (iiIiIII.resp_msg || JSON.stringify(iiIiIII))), false;
                } else {
                    if (li11IIll < 5) console.log("🚫 保存收货地址失败 ➜ " + (iiIiIII.resp_msg || JSON.stringify(iiIiIII))), li11IIll++; else {
                        return console.log("🚫 保存收货地址失败 ➜ " + (iiIiIII.resp_msg || JSON.stringify(iiIiIII))), false;
                    }
                }
            }
        } catch (IIiiii) {
            return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (IIiiii.message || IIiiii)), false;
        } else iliII1ll = "无响应数据", li11IIll++;
        ili11Iii = null;
    }

    return li11IIll >= ll11lI1I && console.log("🚫 保存收货地址异常 ➜ " + iliII1ll), false;
}

async function jinggeng_savePrize(iii11iIi) {
    let {
        baseUrl: iIli11i1,
        cookie: IiiliII1,
        ua: I1i1I1l,
        venderId: i1i1l,
        prizeName: IIIilIl1,
        orderCode: lIi1ii1i
    } = iii11iIi;
    const lIi1111I = process.env.WX_ADDRESS || "",
        l1IiIl1i = process.env.WX_ADDRESS_BLOCK || "";

    if (lIi1111I === "") {
        return false;
    }

    const I1I1llIl = lIi1111I.split("|"),
        l1iiI11i = Math.floor(Math.random() * I1I1llIl.length);
    if (I1I1llIl[l1iiI11i] === "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false;
    const [lli1l1iI, Il1lli, I1IIliii, l1l1iIlI, IIiil111, illil111] = I1I1llIl[l1iiI11i].split("@");

    for (let ii1IlilI = 0; ii1IlilI < 6; ii1IlilI++) {
        if (I1I1llIl[ii1IlilI] === "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }

    if (l1IiIl1i !== "") {
        const lil1liI1 = l1IiIl1i.split("@");
        if (lil1liI1.some(liIl1lIi => IIIilIl1.includes(liIl1lIi))) return console.log("\n🚫 触发实物奖品自动登记收货地址屏蔽关键词，跳过~\n"), false;
    }

    const i1ii1I1l = iIli11i1.match(/https?:\/\/([^/]+)/)[1],
        liiiiiii = "receiverName=" + encodeURIComponent(lli1l1iI) + "&mobile=" + Il1lli + "&address=" + encodeURIComponent(I1IIliii) + "+" + encodeURIComponent(l1l1iIlI) + "+" + encodeURIComponent(IIiil111) + encodeURIComponent(illil111) + "&log_id=" + lIi1ii1i + "&user_id=" + i1i1l,
        l1lI = {
            "headers": {
                "Accept": "application/json, text/plain, */*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7,en-GB;q=0.6",
                "Connection": "keep-alive",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                "Cookie": IiiliII1,
                "Host": i1ii1I1l,
                "Origin": iIli11i1,
                "Referer": iIli11i1 + "/ql/front/postBuyerInfo/",
                "User-Agent": I1i1I1l
            },
            "body": liiiiiii,
            "timeout": 30000
        },
        liIIlII = 5;
    let ilI1iill = 0,
        l1lli1ll = null;

    while (ilI1iill < liIIlII) {
        let li11Iii1 = null;

        try {
            li11Iii1 = await got.post(iIli11i1 + "/ql/front/postBuyerInfo", l1lI);
        } catch (IlI1lIl1) {
            if (IlI1lIl1?.["response"]) {
                IlI1lIl1 = IlI1lIl1.response;
                if (typeof IlI1lIl1 === "string" && IlI1lIl1.includes("Timeout awaiting 'request'")) l1lli1ll = "请求超时，请检查网络重试"; else {
                    const lI11lIII = li11Iii1?.["statusCode"];

                    if (lI11lIII) {
                        if ([403, 493].includes(lI11lIII)) l1lli1ll = "请求失败，IP被限制（Response code " + lI11lIII + "）"; else[400, 404].includes(lI11lIII) ? l1lli1ll = "请求配置参数错误，请联系开发者进行反馈（Response code " + lI11lIII + "）" : l1lli1ll = "请求失败（Response code " + lI11lIII + "）";
                    } else {
                        l1lli1ll = "API请求失败 " + (IlI1lIl1.message || IlI1lIl1);
                    }
                }
            } else {
                if (IlI1lIl1?.["response"]?.["body"]) l1lli1ll = "请求失败 " + IlI1lIl1.response.body + " "; else {
                    l1lli1ll = "请求失败 " + (IlI1lIl1 || "") + " ";
                }
            }

            ilI1iill++;
        }

        if (li11Iii1?.["body"]) {
            try {
                const IlliIIIl = JSON.parse(li11Iii1.body);

                if (IlliIIIl && IlliIIIl.succ) {
                    return console.log("已提交收货地址 ✅\n登记为随机抽取到的第" + (l1iiI11i + 1) + "套收货地址信息\n联系信息：" + lli1l1iI + " (" + Il1lli.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）\n"), true;
                } else {
                    if (IlliIIIl && IlliIIIl.succ === false) {
                        return console.log("🚫 保存收货地址失败 ➜ " + (IlliIIIl.msg || JSON.stringify(IlliIIIl))), false;
                    } else {
                        if (ilI1iill < 5) console.log("🚫 保存收货地址失败 ➜ " + (IlliIIIl.msg || JSON.stringify(IlliIIIl))), ilI1iill++; else {
                            return console.log("🚫 保存收货地址失败 ➜ " + (IlliIIIl.msg || JSON.stringify(IlliIIIl))), false;
                        }
                    }
                }
            } catch (lI1111) {
                return console.log("🚫 保存收货地址接口响应处理异常 ➜ " + (lI1111.message || lI1111)), false;
            }
        } else {
            l1lli1ll = "无响应数据";
            ilI1iill++;
        }

        li11Iii1 = null;
    }

    return ilI1iill >= liIIlII && console.log("🚫 保存收货地址异常 ➜ " + l1lli1ll), false;
}

async function wxSavePrize(ii1liI1l, li11IlI, lliliii, i1iI1I1i, l1i1ll1l, lIilIl1I, IlIiIi11, liIlI1iI, iIilIiI) {
    const ilIlIiii = process.env.WX_ADDRESS || "",
        iIlI1IIi = process.env.WX_ADDRESS_BLOCK ? process.env.WX_ADDRESS_BLOCK : "";
    let ilIil1 = [];
    if (ilIlIiii != "") ilIil1 = ilIlIiii.split("|"); else return false;
    var ll1i1ll = Math.floor(Math.random() * ilIil1.length);
    if (ilIil1[ll1i1ll] == "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false; else {
        ilIil1 = ilIil1[ll1i1ll];
    }
    ilIil1 = ilIil1.split("@");
    if (ilIil1.length != 8) return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;

    for (let Ii11liI = 0; Ii11liI < 7; Ii11liI++) {
        if (ilIil1[Ii11liI] == "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }

    const lIIl1l1 = ilIil1[0],
        ilIlIi1I = ilIil1[1],
        il1Il1II = ilIil1[2],
        IIIIlIl1 = ilIil1[3],
        IiIii11I = ilIil1[4],
        Iil1Illl = ilIil1[5],
        ll1iilli = ilIil1[6],
        IliI11l = ilIil1[7];

    if (iIlI1IIi != "") {
        let III11IIi = iIlI1IIi.split("@"),
            IIIIll1I = false;

        for (let I1llI1ll of III11IIi) {
            if (liIlI1iI.includes(I1llI1ll)) {
                console.log("\n🚫 触发（" + I1llI1ll + "）实物奖品自动登记收货地址屏蔽关键词，跳过~\n");
                IIIIll1I = true;
                break;
            }
        }

        if (IIIIll1I) return false;
    }

    const llii1l1i = ii1liI1l.includes("cjhy") ? encodeURIComponent(encodeURIComponent(IlIiIi11)) : encodeURIComponent(IlIiIi11),
        liliilil = ii1liI1l.match(/https?:\/\/([^/]+)/)[1],
        i1lIliiI = "venderId=" + lIilIl1I + "&pin=" + llii1l1i + "&activityId=" + i1iI1I1i + "&actType=" + l1i1ll1l + "&prizeName=" + encodeURIComponent(liIlI1iI) + "&receiver=" + encodeURIComponent(lIIl1l1) + "&phone=" + ilIlIi1I + "&province=" + encodeURIComponent(il1Il1II) + "&city=" + encodeURIComponent(IIIIlIl1) + "&county=" + encodeURIComponent(IiIii11I) + "&areaCode=" + ll1iilli + "&address=" + encodeURIComponent(Iil1Illl) + "&generateId=" + iIilIiI + "&postalCode=" + IliI11l;
    let iiII1lll = false;

    try {
        let l1ili1l = await got.post(ii1liI1l + "/wxAddress/save", {
            "headers": {
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Host": liliilil,
                "Origin": ii1liI1l,
                "Referer": ii1liI1l + "/wxAddress/save/",
                "Content-Type": "application/x-www-form-urlencoded",
                "Cookie": li11IlI,
                "User-Agent": lliliii
            },
            "body": i1lIliiI
        }).json().catch(li1iIII1 => {
            console.error("🚫 wxSavePrize API请求失败 ➜ (" + li1iIII1.response.statusCode + " " + li1iIII1.response.statusMessage + ")\n");
        });

        if (l1ili1l && l1ili1l.result) {
            console.log("\n已自动提交收货地址 ✅\n");
            console.log("登记模板：采用第" + (ll1i1ll + 1) + "套收货地址信息（随机抽取）");
            console.log("联系信息：" + lIIl1l1 + " (" + ilIlIi1I.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）");
            console.log("");
            iiII1lll = true;
        } else l1ili1l.errorMessage ? console.log("🚫 保存收货地址失败 ➜ " + l1ili1l.errorMessage) : console.log("🚫 保存收货地址失败 ➜ " + JSON.stringify(l1ili1l)), console.log("");
    } catch (ii1I11I1) {
        console.log("🚫 保存收货地址异常 ➜ " + ii1I11I1);
    }

    return iiII1lll;
}

module.exports = {
    "wxSavePrize": wxSavePrize,
    "wuxian_savePrize": wuxian_savePrize,
    "loreal_savePrize": loreal_savePrize,
    "jinggeng_savePrize": jinggeng_savePrize
};