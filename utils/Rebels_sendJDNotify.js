/*
一个强大的推送通知库，主要用于汇总多条账号消息后集中推送通知
默认情况下账号消息指的是单一账号的消息，它由“<前缀><用户名><消息内容>”组成，其中消息内容由一条或多条组成最后用指定字符拼接成一条合并内容
脚本最终汇总多条账号消息后集中触发推送通知业务，每个账号的消息占用一行，排列顺序以优先触发记录为原则
此库封装了多条方法，推送通知业务调用自 sendNotify.js，可引用此模块来平替引用它，支持单消息推送

账号消息自定义功能如下（环境变量）
1。关键词过滤，触发时不推送对应单条账号消息 JD_NOTIFY_FILTER_KEYWORDS
  例：export JD_NOTIFY_FILTER_KEYWORDS="空气@会员"，多个关键词用@分割
2。消息内容分隔符 JD_NOTIFY_DELIMITER，默认为中文逗号
  例：export JD_NOTIFY_DELIMITER="、"，此分隔符用于分隔多条账号消息
3。设置替换用户名为昵称 JD_NOTIFY_NICKNAMES
  例：export JD_NOTIFY_NICKNAMES="userpin_α@哥哥,userpin_β@弟弟"，多个昵称配置用英文逗号分割，用户名和昵称用@分割
4。是否显示用户名 JD_NOTIFY_SHOW_USERNAME（true/false），默认显示
  例：export JD_NOTIFY_SHOW_USERNAME="false"
5. 设置推送通知的用户名是否脱敏 JD_NOTIFY_USERNAME_DESENSITIZATION（true/false），默认不脱敏，根据用户名长度动态将部分字符用*替换
  例：JD_NOTIFY_USERNAME_DESENSITIZATION="true"
6。设置消息前缀格式 JD_NOTIFY_PREFIX_FORMATA，默认为 "【京东账号<序号>】"
  例：export JD_NOTIFY_PREFIX_FORMATA="[账号%]"，%代表账号序号
7。设置自动合并消息中用数字开头表示数量的内容 JD_NOTIFY_AUTO_MERGE_TYPE
  例：export JD_NOTIFY_AUTO_MERGE_TYPE="积分 🎟️"，多个规则用@分割，正则匹配

new Env('Rebels_sendJDNotify');
*/

class lI1IIl {
  constructor() {
    this.title = "";
    this.content = "";
    this.sendNotify = require("../sendNotify").sendNotify;
    this._accountsArray = [];
    this._messageDelimiter = "";
    this._messageFilterKeywords = [];
    this._showUserName = true;
    this._userNameDesensitization = false;
    this._nicknames = {};
    this._prefixFormat = "【京东账号%】";
    this._autoMergeType = "";

    this._Init();
  }

  ["_Init"]() {
    if (process.env.JD_NOTIFY_FILTER_KEYWORDS) {
      this._messageFilterKeywords = process.env.JD_NOTIFY_FILTER_KEYWORDS.split("@").map(ililII => ililII.trim()).filter(Boolean);
    }

    this._messageDelimiter = process.env.JD_NOTIFY_DELIMITER || "，";

    if (process.env.JD_NOTIFY_NICKNAMES) {
      const lI1II1 = process.env.JD_NOTIFY_NICKNAMES.split(",");
      lI1II1.forEach(i1ilII => {
        let lilIII = i1ilII.split("@");
        lilIII.length === 2 && lilIII[0] && lilIII[1] && (this._nicknames[lilIII[0]] = lilIII[1]);
      });
    }

    this._showUserName = !(process.env.JD_NOTIFY_SHOW_USERNAME === "false");
    this._userNameDesensitization = process.env.JD_NOTIFY_USERNAME_DESENSITIZATION === "true";
    process.env.JD_NOTIFY_PREFIX_FORMATA && (this._prefixFormat = process.env.JD_NOTIFY_PREFIX_FORMATA);
    process.env.JD_NOTIFY_AUTO_MERGE_TYPE && (this._autoMergeType = process.env.JD_NOTIFY_AUTO_MERGE_TYPE);
  }

  ["_mergeMessages"](iliIil, iliIii) {
    const il1li = iliIil;

    try {
      function IIliI1(IliIIl) {
        const I1il1l = IliIIl.match(/(\d+)(.+)/);
        return I1il1l ? {
          "count": parseInt(I1il1l[1]),
          "name": I1il1l[2].trim()
        } : {
          "count": null,
          "name": IliIIl
        };
      }

      function il1lI(IIliII, iiliI, Ill11I) {
        return iiliI !== null && Ill11I.split("@").includes(IIliII);
      }

      for (let I1il1i = 0; I1il1i < iliIil.length; I1il1i++) {
        const {
          count: lI1l1i,
          name: i1iil
        } = IIliI1(iliIil[I1il1i]);

        if (il1lI(i1iil, lI1l1i, iliIii)) {
          for (let I1llIl = I1il1i + 1; I1llIl < iliIil.length; I1llIl++) {
            const {
              count: i1iii,
              name: I1llIi
            } = IIliI1(iliIil[I1llIl]);
            i1iil === I1llIi && (iliIil[I1il1i] = "" + (lI1l1i + i1iii) + i1iil, iliIil.splice(I1llIl, 1), I1llIl--);
          }
        }
      }

      return iliIil;
    } catch {
      return il1li;
    }
  }

  ["_desensitizingUserName"](l1l1il) {
    if (l1l1il.length < 5) {
      switch (l1l1il.length) {
        case 1:
          return l1l1il;

        case 2:
          return l1l1il.slice(0, 1) + "*";

        case 3:
          return l1l1il.slice(0, 1) + "*" + l1l1il.slice(-1);

        case 4:
          return l1l1il.slice(0, 2) + "**";
      }
    } else {
      return l1l1il.slice(0, 2) + "*".repeat(l1l1il.length - 4) + l1l1il.slice(-2);
    }
  }

  ["_formatAcountsMessage"]() {
    let I1il1I = [];

    for (let {
      userName: I11i11,
      index: I1llII,
      messages: Iil1il
    } of this._accountsArray) {
      Iil1il = Iil1il.filter(l1l1iI => l1l1iI !== null && l1l1iI !== undefined && l1l1iI !== "");
      const I11i1i = I1il1I.find(I1llI1 => I1llI1.userName === I11i11);
      I11i1i ? (I11i1i.index === "" && (I11i1i.index = I1llII), Iil1il.length > 0 && I11i1i.messages.push(...Iil1il)) : I1il1I.push({
        "userName": I11i11,
        "index": I1llII,
        "messages": Iil1il
      });
    }

    I1il1I = I1il1I.filter(I11i1l => I11i1l.messages.length > 0);
    this._autoMergeType && I1il1I.forEach(il1il => {
      il1il.messages = this._mergeMessages(il1il.messages, this._autoMergeType);
    });
    this._accountsArray = I1il1I;
  }

  ["config"]({
    title: Il1i1i,
    content: iIIili,
    messageDelimiter: Ii1iiI
  }) {
    if (Il1i1i !== undefined) {
      this.title = Il1i1i;
    }

    iIIili !== undefined && (this.content = iIIili);

    if (Ii1iiI !== undefined) {
      this._messageDelimiter = Ii1iiI;
    }
  }

  ["updateTitle"](iI1Iil) {
    this.title = iI1Iil;
  }

  ["updateContent"](il1iI) {
    this.content = il1iI;
  }

  ["create"](i1iIii, i1iIil) {
    const llIlIi = this._messageFilterKeywords,
          llIlIl = this._prefixFormat,
          II11I = this._nicknames,
          il1i1 = this._showUserName;
    i1iIii === undefined && (i1iIii = "");
    const lIIiIi = {
      "index": "" + i1iIii,
      "userName": i1iIil,
      "fixed": false,
      "messages": [],
      "originMessages": [],

      "insert"(llIlI1) {
        if (!llIlI1) return;
        if (lIIiIi.fixed) return;
        lIIiIi.originMessages.push(llIlI1);
        if (llIlIi.length > 0 && llIlIi.some(iI1IiI => llIlI1.includes(iI1IiI))) return;
        lIIiIi.messages.push(llIlI1);
      },

      "fix"(i1iIli) {
        if (!i1iIli) return;
        lIIiIi.fixed = true;
        lIIiIi.originMessages = [i1iIli];
        if (llIlIi.length > 0 && llIlIi.some(liI1l1 => i1iIli.includes(liI1l1))) return;
        lIIiIi.messages = [i1iIli];
      },

      "updateIndex"(IllIlI) {
        lIIiIi.index = "" + IllIlI;
      },

      "updateUsername"(IiillI) {
        lIIiIi.userName = IiillI;
      },

      "getInlineContent"() {
        let li11l = this.originMessages.join(this._messageDelimiter).trim();
        this._autoMergeType && (li11l = this._mergeMessages(li11l, this._autoMergeType));
        const lliiIl = llIlIl.replace("%", this.index),
              li11i = decodeURIComponent(II11I[this.userName] || this.userName),
              lliiIi = il1i1 ? li11i + "：" : "";
        return "" + lliiIl + lliiIi + (li11l || "无");
      }

    };
    return this._accountsArray.push(lIIiIi), lIIiIi;
  }

  ["dispose"](iiIi1I) {
    this._accountsArray = this._accountsArray.filter(IllIl1 => IllIl1 !== iiIi1I);
  }

  ["disposeByUsername"](ll1Ii) {
    const iiIi11 = this._accountsArray.find(i1llii => decodeURIComponent(i1llii.userName) === decodeURIComponent(ll1Ii));

    iiIi11 && this.dispose(iiIi11);
  }

  ["disposeByIndex"](llIIil) {
    const llIIii = this._accountsArray.find(Ii1I1i => Ii1I1i.index === "" + llIIil);

    llIIii && this.dispose(llIIii);
  }

  ["getMessage"](llIIlI = false) {
    if (this._accountsArray.length === 0) return "";

    this._formatAcountsMessage();

    if (this._accountsArray.length === 0) return "";
    let IIlIl = "";

    for (const {
      userName: ili11i,
      index: iiIi1l,
      messages: li11I
    } of this._accountsArray) {
      const lliiII = this._prefixFormat.replace("%", iiIi1l),
            iiIi1i = decodeURIComponent(this._nicknames[ili11i] || ili11i),
            liI1ll = this._showUserName ? (this._userNameDesensitization && llIIlI ? this._desensitizingUserName(iiIi1i) : iiIi1i) + "：" : "",
            ll1II = li11I.join(this._messageDelimiter).trim();

      IIlIl += "" + lliiII + liI1ll + ll1II + "\n";
    }

    return IIlIl.trim();
  }

  async ["send"](IllIii, liI1li) {
    await this.sendNotify(IllIii, liI1li);
  }

  async ["sendNotify"](IllIil, ill1Ii) {
    await this.send(IllIil, ill1Ii);
  }

  async ["push"]() {
    this.content = this.content.trim();
    let ill1Il = this.content;
    const i1lll1 = this.getMessage(true);
    if (i1lll1) ill1Il = i1lll1.trim() + "\n\n" + ill1Il;
    await this.send(this.title, ill1Il);
  }

}

module.exports = new lI1IIl();