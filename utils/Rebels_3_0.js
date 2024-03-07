/*
new Env('Rebels_3_0');
*/
const i1l1ll = require("jsdom");

let I1iIiI = null,
    li1I1 = null;

async function i1ilil(iIIl1l) {
  return new Promise((i1III, Ii1iIi) => {
    setTimeout(() => {
      i1III(iIIl1l);
    }, iIIl1l);
  });
}

async function lilIii(iliIIl) {
  const {
    JSDOM: iliIIi
  } = i1l1ll;
  let ill11I = new i1l1ll.ResourceLoader({
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
    "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu"
  }),
      Iliiil = new i1l1ll.VirtualConsole(),
      li1Il = {
    "url": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
    "referrer": "https://msitepp-fm.jd.com/rest/priceprophone/priceProPhoneMenu",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:91.0) Gecko/20100101 Firefox/91.0",
    "runScripts": "dangerously",
    "resources": ill11I,
    "includeNodeLocations": true,
    "storageQuota": 10000000,
    "pretendToBeVisual": true,
    "virtualConsole": Iliiil
  };
  const li1Ii = new iliIIi("<body>\n    <script>\n        function Map(){this.elements=new Array();this.size=function(){return this.elements.length},this.isEmpty=function(){return(this.elements.length<1)},this.clear=function(){this.elements=new Array()},this.put=function(_key,_value){if(this.containsKey(_key)==true){if(this.containsValue(_value)){if(this.remove(_key)==true){this.elements.push({key:_key,value:_value})}}else{this.elements.push({key:_key,value:_value})}}else{this.elements.push({key:_key,value:_value})}},this.remove=function(_key){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){this.elements.splice(i,1);return true}}}catch(e){bln=false}return bln},this.get=function(_key){try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){return this.elements[i].value}}}catch(e){return null}},this.element=function(_index){if(_index<0||_index>=this.elements.length){return null}return this.elements[_index]},this.containsKey=function(_key){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].key==_key){bln=true}}}catch(e){bln=false}return bln},this.containsValue=function(_value){var bln=false;try{for(i=0;i<this.elements.length;i++){if(this.elements[i].value==_value){bln=true}}}catch(e){bln=false}return bln},this.keys=function(){var arr=new Array();for(i=0;i<this.elements.length;i++){arr.push(this.elements[i].key)}return arr},this.values=function(){var arr=new Array();for(i=0;i<this.elements.length;i++){arr.push(this.elements[i].value)}return arr}}\n    </script>\n    <script src=\"https://storage.360buyimg.com/webcontainer/js_security_" + (iliIIl.charAt(0) === "3" ? "v3_0.1.3" : "v3_0.1.8") + ".js\"></script>\n    <script src=\"https://fm-price-cdn.jd.com/priceportal-static/script/utilsV1_1.js\"></script>\n    </body>", li1Il);
  await i1ilil(500);

  switch (iliIIl.charAt(0)) {
    case "3":
      I1iIiI = li1Ii.window;
      break;

    case "4":
      li1I1 = li1Ii.window;
      break;
  }
}

async function i1ill1(i1IIl, I1lll1, i1IIi = "3.1") {
  i1IIi !== "3.1" && (i1IIi = "4.1");

  switch (i1IIi.charAt(0)) {
    case "3":
      !I1iIiI && (await lilIii(i1IIi));
      break;

    case "4":
      !li1I1 && (await lilIii(i1IIi));
      break;
  }

  return new Promise(async i1illl => {
    switch (i1IIi.charAt(0)) {
      case "3":
        if (typeof I1iIiI.signWaap === "function") {
          const Iil1II = await I1iIiI.signWaap(i1IIl, I1lll1);
          i1illl(Iil1II);
        } else {
          let iIIl1I = null;
          iIIl1I = setInterval(async () => {
            if (typeof I1iIiI.signWaap === "function") {
              clearInterval(iIIl1I);
              iIIl1I = null;
              const I1iIli = await I1iIiI.signWaap(i1IIl, I1lll1);
              i1illl(I1iIli);
            }
          }, 100);
        }

        break;

      case "4":
        if (typeof li1I1.signWaap === "function") {
          const lI1Ill = await li1I1.signWaap(i1IIl, I1lll1);
          i1illl(lI1Ill);
        } else {
          let lI1Ili = null;
          lI1Ili = setInterval(async () => {
            if (typeof li1I1.signWaap === "function") {
              clearInterval(lI1Ili);
              lI1Ili = null;
              const IliilI = await li1I1.signWaap(i1IIl, I1lll1);
              i1illl(IliilI);
            }
          }, 100);
        }

        break;
    }
  });
}

module.exports = i1ill1;