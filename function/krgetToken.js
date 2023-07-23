const got=require('got');
const Cache=require('./cache/index.js');
const getSign=require('./krgetSign.js');
let cacheDefaultTTL=15*60*1000;
let cache=new Cache(cacheDefaultTTL,__dirname+'/cache/token.json');
const JD_SIGN_API=process.env['JD_SIGN_API']||'http://api.nolanstore.cc/sign';
const JD_SIGN_KRAPI=process.env['JD_SIGN_KRAPI']||'';
function regExecFirst(_0x23051a='',_0x2a5c32){
	let _0x5d6ca3=_0x2a5c32.exec(_0x23051a);
	if(_0x5d6ca3&&_0x5d6ca3.length>0){
		return _0x5d6ca3[0]['trim']();
	}
	return'';
}
function getCacheKey(_0x31b62e,_0x5c4615){
	let _0x59f4da=new Date()['getHours']();
	if(_0x59f4da>=0&&_0x59f4da<=3){
		return _0x31b62e;
	}
	return _0x31b62e+'_'+_0x5c4615;
}
async function getToken(_0x2587de,_0xda567e){
	async function _0x58fef4(_0x36a669){
		return new Promise(_0x5b5999=>setTimeout(_0x5b5999,_0x36a669));
	}
	let _0x3cfaf8='';
	try{
		let _0x40141b=regExecFirst(_0x2587de,/(?<=pt_pin=)([^;]+)/);
		if(_0x40141b){
			let _0x130c88=getCacheKey(_0x40141b,_0xda567e);
			_0x3cfaf8=cache.get(_0x130c88)||'';
			if(_0x3cfaf8===''){
				let _0x1a263d=await getSign('isvObfuscator',{'url':_0xda567e,'id':''});
				if(_0x1a263d!=''){
					if(JD_SIGN_KRAPI){
						body=_0x1a263d.data['convertUrl'];
					}else{
						body=_0x1a263d.body;
					}
					let _0x3cae34=await got.post('https://api.m.jd.com/client.action?functionId=isvObfuscator',{'headers':{'Host':'api.m.jd.com','Content-Type':'application/x-www-form-urlencoded','Cookie':_0x2587de,'User-Agent':'JD4iPhone/167650 (iPhone; iOS 13.7; Scale/3.00)','Accept-Language':'zh-Hans-CN;q=1','Accept-Encoding':'gzip, deflate, br'},'body':body})['json']()['catch'](async _0x2a0103=>{
						if(_0x2a0103.response){
							console.log('🚫 getToken API请求失败 ➜ Response code '+(_0x2a0103.response['statusCode']||'')+' ('+(_0x2a0103.response['statusMessage']||'')+')');
							if(_0x2a0103.response['statusCode']==403){
								let _0x59d71d=Math.floor(Math.random()*(1000-2000))+30000;
								console.log('🚫 随机等待 '+_0x59d71d+' ms');
								await _0x58fef4(_0x59d71d);
							}
						}else{
							console.log('🚫 getToken API请求失败\n'+(_0x2a0103.message||'')+'\n');
						}
					});
					if(_0x3cae34){
						if(_0x3cae34.code==='0'){
							_0x3cfaf8=_0x3cae34.token;
							cache.put(_0x130c88,_0x3cfaf8,cacheDefaultTTL);
						}else if(_0x3cae34.code==='3'&&_0x3cae34.errcode===264){
							console.log('🚫 getToken API请求失败 ➜ 账号无效');
						}else{
							console.log('🚫 getToken API接口返回异常 ➜ '+JSON.stringify(_0x3cae34));
						}
					}
				}
			}else{
				console.log('已读取本地缓存token\n');
			}
		}
	}catch(_0x1d44e4){
		console.log(_0x1d44e4);
		console.log('🚫 getToken API请求失败');
	}
	return _0x3cfaf8;
}
module.exports=getToken;