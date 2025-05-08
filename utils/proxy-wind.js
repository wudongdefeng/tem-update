// 引入必要的库
const axios = require('axios');

// 将获取内容和赋值操作封装到一个函数中
async function setGlobalHttpProxy() {
   let response = await axios.get(process.env.proxy_wind_url);
   let data = response.data;
   // 将结果赋值给global.GLOBAL_AGENT.HTTP_PROXY
   global.GLOBAL_AGENT = {HTTP_PROXY: data};
   console.log(global.GLOBAL_AGENT.HTTP_PROXY);  // 输出HTTP代理内容
}

// 导出函数，以便在其他脚本中使用
module.exports = setGlobalHttpProxy;
