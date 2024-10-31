#!/usr/bin/env bash
#

# 青龙一键安装脚本
# GitHub仓库： https://github.com/wudongdefeng/tem-update

# 安装报错，请提交Issue

# 有其他需要的依赖，欢迎到源仓库提交Pull Request

TIME() {
[[ -z "$1" ]] && {
	echo -ne " "
} || {
     case $1 in
	r) export Color="\e[31;1m";;
	g) export Color="\e[32;1m";;
	b) export Color="\e[34;1m";;
	y) export Color="\e[33;1m";;
	z) export Color="\e[35;1m";;
	l) export Color="\e[36;1m";;
      esac
	[[ $# -lt 2 ]] && echo -e "\e[36m\e[0m ${1}" || {
		echo -e "\e[36m\e[0m ${Color}${2}\e[0m"
	 }
      }
}
echo
echo
echo
TIME l "安装依赖..."
echo
TIME y "安装依赖需要时间，请耐心等待!"
echo
sleep 3
echo
echo

echo

#apk add python3 g++ lxml zlib-dev gcc jpeg-dev python3-dev musl-dev freetype-dev

npm config set registry https://registry.npmmirror.com
DIR="/ql/data/scripts"
if [ -d "$DIR" ]; then
  echo "青龙版本2.12以上"
  cd /ql/data/scripts
  pnpm install adler-32 png-js date-fns axios@1.6.7 crypto-js ts-md5 tslib global-agent @types/node request jsdom crc qs moment cheerio dotenv got@11.8.6 sharp@0.32.6 tough-cookie https-proxy-agent@7.0.2 http-cookie-agent console-table-printer@2.12.0
  #pip3 install telebot bs4 pysocks socks cacheout requests canvas ping3 jieba PyExecJS aiohttp redis pycryptodome pytz typescript httpx success --upgrade pip pip telethon
  else
  echo "青龙版本2.12以下"
  cd /ql/scripts
  pnpm install adler-32 png-js date-fns axios@1.6.7 crypto-js ts-md5 tslib global-agent @types/node request jsdom crc qs moment cheerio dotenv got@11.8.6 sharp@0.32.6 tough-cookie https-proxy-agent@7.0.2 http-cookie-agent console-table-printer@2.12.0
  #pip3 install telebot bs4 pysocks socks cacheout requests canvas ping3 jieba PyExecJS aiohttp redis pycryptodome pytz typescript httpx success --upgrade pip pip telethon
fi


echo
TIME g "依赖安装完毕...建议重启 Docker "

echo
TIME g "有任何问题，请在此仓库提交Issue： https://github.com/wudongdefeng/tem-update"
echo
exit 0
