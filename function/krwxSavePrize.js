const llIll1 = require("got");

async function Illl1l(Illl1i, lIIiil, l1lIii, I11iI1, l1lIil, IiiIli, iillli, I1l1Ii, I1i11i) {
    const llIlii = process.env.WX_ADDRESS ? process.env.WX_ADDRESS : "",
        llIlil = process.env.WX_ADDRESS_BLOCK ? process.env.WX_ADDRESS_BLOCK : "";
    let IIlil = [];
    if (llIlii != "") IIlil = llIlii.split("|"); else return false;
    var ilI1lI = Math.floor(Math.random() * IIlil.length);
    if (IIlil[ilI1lI] == "") return console.log("❌ 随机抽取到的收货地址信息为空，请正确使用 \"|\" 管道符以用于分割多个收货地址！\n"), false; else IIlil = IIlil[ilI1lI];
    IIlil = IIlil.split("@");
    if (IIlil.length != 8) return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不足或过多）\n"), false;

    for (let ii1li = 0; ii1li < 7; ii1li++) {
        if (IIlil[ii1li] == "") return console.log("❌ 随机抽取到的收货地址信息格式存在错误（参数不能为空）\n"), false;
    }

    const IiiIll = IIlil[0],
        IIlii = IIlil[1],
        IlI1il = IIlil[2],
        IilliI = IIlil[3],
        IlI1ii = IIlil[4],
        lIIiii = IIlil[5],
        iI1lli = IIlil[6],
        ll1iI = IIlil[7];

    if (llIlil != "") {
        let IIll1 = llIlil.split("@"),
            ll1il = false;

        for (let IiiIiI of IIll1) {
            if (I1l1Ii.includes(IiiIiI)) {
                console.log("\n🚫 触发（" + IiiIiI + "）实物奖品自动登记收货地址屏蔽关键词，跳过~\n");
                ll1il = true;
                break;
            }
        }

        if (ll1il) return false;
    }

    const iI1lll = Illl1i.includes("cjhy") ? encodeURIComponent(encodeURIComponent(iillli)) : encodeURIComponent(iillli),
        l1lIll = Illl1i.match(/https?:\/\/([^/]+)/)[1],
        I1l1II = "venderId=" + IiiIli + "&pin=" + iI1lll + "&activityId=" + I11iI1 + "&actType=" + l1lIil + "&prizeName=" + encodeURIComponent(I1l1Ii) + "&receiver=" + encodeURIComponent(IiiIll) + "&phone=" + IIlii + "&province=" + encodeURIComponent(IlI1il) + "&city=" + encodeURIComponent(IilliI) + "&county=" + encodeURIComponent(IlI1ii) + "&areaCode=" + iI1lli + "&address=" + encodeURIComponent(lIIiii) + "&generateId=" + I1i11i + "&postalCode=" + ll1iI;
    let IIli1I = false;

    try {
        let Illl1I = await llIll1.post(Illl1i + "/wxAddress/save", {
            "headers": {
                "Accept": "application/json",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Host": l1lIll,
                "Origin": Illl1i,
                "Content-Type": "application/x-www-form-urlencoded",
                "Referer": Illl1i + "/wxAddress/save",
                "Cookie": lIIiil,
                "User-Agent": l1lIii
            },
            "body": I1l1II
        }).json().catch(lliiiI => {
            console.error("🚫 wxSavePrize API请求失败 ➜ (" + lliiiI.response.statusCode + " " + lliiiI.response.statusMessage + ")\n");
        });

        if (Illl1I && Illl1I.result) {
            console.log("\n已自动提交收货地址 ✅\n");
            console.log("登记模板：采用第" + (ilI1lI + 1) + "套收货地址信息（随机抽取）");
            console.log("联系信息：" + IiiIll + " (" + IIlii.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2") + "）");
            console.log("");
            IIli1I = true;
        } else Illl1I.errorMessage ? console.log("🚫 保存收货地址失败 ➜  " + Illl1I.errorMessage) : console.log("🚫 保存收货地址失败 ➜  " + JSON.stringify(Illl1I)), console.log("");
    } catch (I11iII) {
        console.log("🚫 保存收货地址异常 ➜  " + I11iII);
    }

    return IIli1I;
}

module.exports = Illl1l;
