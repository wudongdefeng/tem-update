const $ = new Env('京东入会');
const notify = require("./sendNotify.js")
const jdCookieNode = $.isNode() ? require("./jdCookie.js") : "";
const sck = $.isNode() ? "set-cookie" : "Set-Cookie";
var fs=require('fs');

let cookiesArr = [],
	cookie = "",
	message;
let minPrize = 10;//设置最小奖励入会京豆值，入会奖励小于这个值的时候，不自动入会

if ($.isNode()) {
	Object.keys(jdCookieNode).forEach((item) => {
		cookiesArr.push(jdCookieNode[item]);
	});
	if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false") console.log = () => {};
} else {
	cookiesArr = [
		$.getdata("CookieJD"),
		$.getdata("CookieJD2"),
		...jsonParse($.getdata("CookiesJD") || "[]").map((item) => item.cookie),
	].filter((item) => !!item);
}
const JD_API_HOST = "https://api.m.jd.com/client.action";
$.rundisCount=0;
!(async () => {
	if (!cookiesArr[0]) {
		$.msg(
			$.name,
			"【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取",
			"https://bean.m.jd.com/", {
				"open-url": "https://bean.m.jd.com/"
			}
		);
		return;
	}
	await readShopId();
	for (let i = 0; i < cookiesArr.length; i++) {
		if (cookiesArr[i]) {
			cookie = cookiesArr[i];
			$.UserName = decodeURIComponent(
				cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1]
			);
			$.index = i + 1;
			message = "";
			console.log(`\n******开始【京东账号${$.index}】${$.UserName}*********\n`);
			await main()
		}
	}
})()
.catch((e) => {
		$.log("", `❌ ${$.name}, 失败! 原因: ${e}!`, "");
	})
	.finally(() => {
		console.log("本次运行获得:"+$.rundisCount+"京豆");
		$.done();
	});

function showMsg() {
	return new Promise(resolve => {
		$.log($.name, '', `京东账号${$.index}${$.nickName}\n${message}`);
		resolve()
	})
}
async function main() {
	for (var shopId of $.shopIds) {
		await getVenderId(shopId);
		if ($.venderId) {
			await getShopOpenCardInfo(shopId, $.venderId);
			if ($.getShopOpenCardInfo) {
				if ($.getShopOpenCardInfo.result) {
					if ($.getShopOpenCardInfo.result.interestsRuleList) {
						let openCardStatus = $.getShopOpenCardInfo.result.userInfo.openCardStatus;
						let venderCardName = $.getShopOpenCardInfo.result.shopMemberCardInfo.venderCardName;
						let interestsRuleList = $.getShopOpenCardInfo.result.interestsRuleList;
						let disCount = 0;
						let objData = {};
						if (openCardStatus == 0) {
							interestsRuleList.forEach(item => {
								if (item.prizeName === '京豆') {
									disCount = disCount + parseInt(item.discountString);
									objData = item.interestsInfo;
								}
							});
							if (disCount > 0) {
								console.log(venderCardName + "店铺入会有" + disCount + "京豆");
								if (disCount >= minPrize) {
									console.log("去入会");
									await bindWithVender(shopId, $.venderId, objData);
								} else {
									console.log(venderCardName + "只有"+disCount+"个京豆，入会血亏，小于设置的最小领取京豆数，不入会");
								}
							}else{
								console.log(venderCardName + "有奖励，但没有京豆奖励");
							}
						} else {
							console.log(venderCardName + "已经入过会了");
						}
					} else {
						console.log(shopId + "死抠鼻，没奖励");
					}
				} else {
					console.log(shopId + "好像没有入会奖励");
				}
			} else {
				console.log(shopId + "没有获取到开卡信息");
			}
		} else {
			console.log(shopId + "没有获取到店铺信息");
		}
	}
}

function bindWithVender(shopId, venderId, objData = {}) {
	return new Promise((resolve) => {
		let body = JSON.stringify(Object.assign({
				"venderId": venderId,
				"shopId": shopId,
				"bindByVerifyCodeFlag": 1,
				"writeChildFlag": 0,
				"channel": 999,
			},objData));
			let options = {
				url: `https://api.m.jd.com/client.action?appid=jd_shop_member&functionId=bindWithVender&body=${body}&client=H5&clientVersion=9.2.0&uuid=88888&jsonp=jsonp_1619773276633_84888`,
				headers: {
					Cookie: cookie,
					Host: "api.m.jd.com",
					"Referer": `http://shopmember.m.jd.com/shopcard/?venderId=${venderId}&shopId=${shopId}&venderType=0&channel=999&returnUrl=`,
					"Content-Type": "application/x-www-form-urlencoded",
				}
			};
		$.get(options, (err, resp, res) => {
			try {
				$.result = '';
				let datas = res.match(/({[^()]+})/);
				if (datas) {
					let data = datas[0];
					if (data) {
						data = $.toObj(data);
						if (data) {
							$.result = data.message
							console.log("店铺Id:" + shopId + ",入会结果：" + $.result);
							let giftList = data.result.giftInfo.giftList;
							if (giftList) {
								let disCount = 0;
								giftList.forEach(item => {
									if (item.prizeName === '京豆') {
										disCount = disCount + parseInt(item
											.discountString);
									} else if (item.prizeType == 4) {
										disCount = disCount + parseInt(item
										.discountString);
									}
								});
								$.rundisCount=$.rundisCount+disCount;
							}
						}
					}
				}
			} catch (e) {
				console.log(e);
			} finally {
				resolve(res);
			}
		})
	});
}


function getVenderId(shopId) {
	return new Promise((resolve) => {
		let options = {
			url: `https://chat1.jd.com/api/checkChat?callback=jQuery83802712&shopId=${shopId}&_=${+new Date()}`,
			headers: {
				'Cookie': cookie,
				"host": "chat1.jd.com",
				"content-type": "application/x-www-form-urlencoded",
				"Referer": `https://mall.jd.com/shopBrandMember-${shopId}.html`,
				"User-Agent": 'jdapp;iPhone;9.5.0;'
			}
		};
		$.get(options, (err, resp, res) => {
			$.venderId = '';
			try {
				let datas = res.match(/({[^()]+})/);
				if (datas) {
					let data = datas[0];
					if (data) {
						data = $.toObj(data);
						if (data) {
							$.venderId = data.venderId;
						}
					}
				}
			} catch (e) {
				console.log(e);
			} finally {
				resolve($.venderId);
			}
		})
	});
}

function getShopOpenCardInfo(shopId, venderId) {
	return new Promise((resolve) => {
		let options = {
			url: "http://api.m.jd.com/client.action?appid=jd_shop_member&functionId=getShopOpenCardInfo&body=%7B%22venderId%22%3A%22" +
				venderId +
				"%22%2C%22channel%22%3A999%7D&client=&clientVersion=9.2.0&uuid=88888&jsonp=jsonp_59378",
			headers: {
				Cookie: cookie,
				Host: "api.m.jd.com",
				"Referer": `http://shopmember.m.jd.com/shopcard/?venderId=${venderId}&shopId=${shopId}&venderType=0&channel=999&returnUrl=`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
		};
		$.get(options, (err, resp, res) => {
			$.getShopOpenCardInfo = '';
			try {
				let datas = res.match(/({[^()]+})/);
				if (datas) {
					let data = datas[0];
					if (data) {
						data = $.toObj(data);
						if (data) {
							$.getShopOpenCardInfo = data;
						}
					}
				}
			} catch (e) {
				console.log(e);
			} finally {
				resolve($.getShopOpenCardInfo);
			}
		})
	});
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
			$.msg($.name, "", "不要在BoxJS手动复制粘贴修改cookie");
			return [];
		}
	}
}

function readShopId() {
	return new Promise((resolve) => {
		var shop_id_file = '/jd/config/shop_id.txt'
		if (fs.existsSync(shop_id_file)) {
			console.log("开始读取本地文件: " + shop_id_file)
			fs.readFile(shop_id_file,'utf-8',function(err,data){
				if(err){
					console.error(err);
				}
				else{
					try {
						$.shopIds = [];
						if (data) {
							data = data + '';
							let shopIdstr = data.split('\n');
							for (let shopId of shopIdstr) {
								$.shopIds.push(shopId.trim());
							}
							console.log('获取店铺数据成功，一共获取到' + $.shopIds.length + '条数据');
						} else {
							console.log(`获取店铺数据失败`)
						}
					} catch (e) {
						console.log(e);
					} finally {
						resolve(data);
					}
				}
			});
		} else {
			console.log("本地文件不存在，从网络读取")
			$.get({
				url: 'https://ghproxy.com/https://raw.githubusercontent.com/small-redguy/helper/main/static/ydShopId.txt'
			}, (err, resp, data) => {
				try {
					$.shopIds = [];
					if (data) {
						data = data + '';
						let shopIdstr = data.split('\n');
						for (let shopId of shopIdstr) {
							$.shopIds.push(shopId.trim());
						}
						console.log('获取店铺数据成功，一共获取到' + $.shopIds.length + '条数据');
					} else {
						console.log(`获取店铺数据失败`)
					}
				} catch (e) {
					console.log(e);
				} finally {
					resolve(data);
				}
			})
		}
	});
}
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}

