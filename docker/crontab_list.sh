# 每3天的23:50分清理一次日志(互助码不清理，proc_file.sh对该文件进行了去重)
50 23 */3 * * find /scripts/logs -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
#收集助力码
30 * * * * sh +x /scripts/docker/auto_help.sh collect >> /scripts/logs/auto_help_collect.log 2>&1

##############短期活动##############
# 许愿池
40 0,2 * * * node /scripts/jd_wish.js >> /scripts/logs/jd_wish.log 2>&1
# 企有此礼
30 0 * * *  node /scripts/jd_Ariszy_zy_qycl.js >> /scripts/logs/jd_Ariszy_zy_qycl.log 2>&1
# 跳跳乐
1 0,11,21 * * * node /scripts/jd_jump.js >> /scripts/logs/jd_jump.log 2>&1
# 希捷品牌日
17 10 * 9,10 * node /scripts/jd_smiek_gua_UnknownTask4.js >> /scripts/logs/jd_smiek_gua_UnknownTask4.log 2>&1
#开学充电站
30 1 * * * node /scripts/jd_Ariszy_zy_kxcdz.js >> /scripts/logs/jd_Ariszy_zy_kxcdz.log 2>&1
#内容鉴赏官
30 10,15 * * * node /scripts/jd_connoisseur.js >> /scripts/logs/jd_connoisseur.log 2>&1
#京东极速版红包(活动时间：2021-5-5至2021-5-31)
45 0,23 * * * node /scripts/jd_speed_redpocke.js >> /scripts/logs/jd_speed_redpocke.log 2>&1
#QQ星系牧场
7 0-23/3 * * * node /scripts/jd_tsuk_wind_qqxing.js >> /scripts/logs/jd_tsuk_wind_qqxing.log 2>&1
#汪汪乐园养joy
11 1-23/4 * * * node /scripts/jd_wind_joypark_joy.js >> /scripts/logs/jd_wind_joypark_joy.log 2>&1
#汪汪乐园每日任务
11 13 * * * node /scripts/jd_wind_joypark_task.js >> /scripts/logs/jd_wind_joypark_task.log 2>&1
#汪汪乐园
11 12 * * * node /scripts/jd_wind_joy_park.js >> /scripts/logs/jd_wind_joy_park.log 2>&1
# 特物
21 5,12 * * * node /scripts/jd_superBrand.js >> /scripts/logs/jd_superBrand.log 2>&1
#超级直播间红包雨(活动时间不定期，出现异常提示请忽略。红包雨期间会正常)
1,31 0-23/1 * * * node /scripts/jd_live_redrain.js >> /scripts/logs/jd_live_redrain.log 2>&1
#粉丝互动
34 6,18 * * * node /scripts/jd_star_wind_fan.js >> /scripts/logs/jd_star_wind_fan.log 2>&1
#店铺签到
12 13 * * * node /scripts/jd_shop_sign.js >> /scripts/logs/jd_shop_sign.log 2>&1
#早起福利
30 6 * * * node /scripts/jd_wind_goodMorning.js >> /scripts/logs/jd_wind_goodMorning.log 2>&1
#翻翻乐
20 * * * * node /scripts/jd_big_winner.js >> /scripts/logs/jd_big_winner.log 2>&1
# MM领京豆
20 9 * * * node /scripts/jd_smiek_gua_MMdou.js >> /scripts/logs/jd_smiek_gua_MMdou.log 2>&1
# 工厂开团
1 0,5,10,15 * * * node /scripts/jd_star_star_dreamFactory_tuan.js >> /scripts/logs/jd_star_star_dreamFactory_tuan.log 2>&1
# 京喜购物返红包
44 */6 * * * node /scripts/jd_air_wind_aid_cashback.js >> /scripts/logs/jd_air_wind_aid_cashback.log 2>&1
# 京喜领88元红包
4 2,10 * * * node /scripts/jd_jxlhb.js >> /scripts/logs/jd_jxlhb.log 2>&1
# 女装盲盒
4 2,10 * * * node /scripts/jd_nzmh.js >> /scripts/logs/jd_nzmh.log 2>&1
# 心相印店铺古墓寻宝
12 9,15 1-30 9,10 * node /scripts/jd_star_wind_xinxiangyin.js >> /scripts/logs/jd_star_wind_xinxiangyin.log 2>&1

#整点红包雨
0 0-23/1 * * * node /scripts/jd_wind2_long_super_redrain.js >> /scripts/logs/jd_wind2_long_super_redrain.log 2>&1
#半点红包雨
30 0-23/1 * * * node /scripts/jd_wind2_long_half_redrain.js >> /scripts/logs/jd_wind2_long_half_redrain.log 2>&1

#5G超级盲盒(活动时间：2021-06-2到2021-07-31)
0 0-23/4 * * * node /scripts/jd_mohe.js >> /scripts/logs/jd_mohe.log 2>&1
#金榜创造营 活动时间：2021-05-21至2021-12-31
0 1,22 * * * node /scripts/jd_gold_creator.js >> /scripts/logs/jd_gold_creator.log 2>&1
##############长期活动##############

# 领卷中心签到
15 0 * * * node /scripts/jd_ccSign.js >> /scripts/logs/jd_ccSign.log 2>&1
# 京东保价
48 */8 * * * node /scripts/jd_air_wind_work_price.js >> /scripts/logs/jd_air_wind_work_price.log 2>&1
# 清空购物车
22 19 * * * node /scripts/jd_cleancart.js >> /scripts/logs/jd_cleancart.log 2>&1
#玩一玩成就
48 11 * * * node /scripts/jd_tsuk_wind_wyw.js >> /scripts/logs/jd_tsuk_wind_wyw.log 2>&1
#京东试用
15 12 * * * node /scripts/jd_try.js >> /scripts/logs/jd_try.log 2>&1
# 签到
7 0,17 * * * cd /scripts && node jd_bean_sign.js >> /scripts/logs/jd_bean_sign.log 2>&1
#京喜签到
11 0 * * * node /scripts/jx_sign.js >> /scripts/logs/jx_sign.log 2>&1
#点点卷
#10 2,22 * * * node /scripts/jd_smiek_wind_necklace.js >> /scripts/logs/jd_smiek_wind_necklace.log 2>&1
# 东东超市兑换奖品#
59 23 * * * node /scripts/jd_blueCoin.js >> /scripts/logs/jd_blueCoin.log 2>&1
# 摇京豆
6 0,23 * * * node /scripts/jd_club_lottery.js >> /scripts/logs/jd_club_lottery.log 2>&1
# 东东农场
15 6-18/6 * * * node /scripts/jd_fruit.js >> /scripts/logs/jd_fruit.log 2>&1
36 20 * * * node /scripts/zero_fruit.js >> /scripts/logs/zero_fruit.log 2>&1
# 东东乐园
30 7 * * * node /scripts/jd_wen_wind_ddnc_farmpark.js >> /scripts/logs/jd_wen_wind_ddnc_farmpark.log 2>&1
# 宠汪汪
#59 7,15,23 * * * node /scripts/jd_joy_reward.js >> /scripts/logs/jd_joy_reward.log 2>&1
56 7,15 * * * node /scripts/jd_hello_wind_joy_reward_20.js >> /scripts/logs/jd_hello_wind_joy_reward_20.log 2>&1
59 7,15 * * * node /scripts/jd_hello_wind_joy_reward_20.js >> /scripts/logs/jd_hello_wind_joy_reward_20.log 2>&1
56 23 * * * node /scripts/jd_hello_wind_joy_reward_new.js >> /scripts/logs/jd_hello_wind_joy_reward_new.log 2>&1
59 23 * * * node /scripts/jd_hello_wind_joy_reward_new.js >> /scripts/logs/jd_hello_wind_joy_reward_new.log 2>&1
# 宠汪汪赛跑
45 9,14,19 * * * node /scripts/jd_joy_run.js >> /scripts/logs/jd_joy_run.log 2>&1
#宠汪汪任务喂食
35 */4 * * * node /scripts/jd_joy.js >> /scripts/logs/jd_joy.log 2>&1
#宠汪汪偷狗粮
10 5,9,13 * * * node /scripts/jd_joy_steal.js >> /scripts/logs/jd_joy_steal.log 2>&1
# 摇钱树
23 */2 * * * node /scripts/jd_moneyTree.js >> /scripts/logs/jd_moneyTree.log 2>&1
# 东东萌宠
35 6-18/6 * * * node /scripts/jd_pet.js >> /scripts/logs/jd_pet.log 2>&1
# 京东种豆得豆
10 7-22/1 * * * node /scripts/jd_plantBean.js >> /scripts/logs/jd_plantBean.log 2>&1
# 京东全民开红包
12 0-23/4 * * * node /scripts/jd_redPacket.js >> /scripts/logs/jd_redPacket.log 2>&1
# 进店领豆
6 0 * * * node /scripts/jd_shop.js >> /scripts/logs/jd_shop.log 2>&1
# 东东超市
31 0,1-23/2 * * * node /scripts/jd_superMarket.js >> /scripts/logs/jd_superMarket.log 2>&1
# 取关京东店铺商品
45 23 * * * node /scripts/jd_unsubscribe.js >> /scripts/logs/jd_unsubscribe.log 2>&1
# 京豆变动通知
20 10 * * * node /scripts/jd_bean_change.js >> /scripts/logs/jd_bean_change.log 2>&1
#天天加速
5 18,23 * * * node /scripts/jd_speed.js >> /scripts/logs/jd_speed.log 2>&1
# 京东抽奖机
0 0,12,23 * * * node /scripts/jd_lotteryMachine.js >> /scripts/logs/jd_lotteryMachine.log 2>&1
# 京东排行榜
21 9 * * * node /scripts/jd_rankingList.js >> /scripts/logs/jd_rankingList.log 2>&1
# 天天提鹅
28 * * * * node /scripts/jd_daily_egg.js >> /scripts/logs/jd_daily_egg.log 2>&1
# 金融养猪
32 0-23/6 * * * node /scripts/jd_pigPet.js >> /scripts/logs/jd_pigPet.log 2>&1
# 京喜工厂
50 * * * * node /scripts/jd_dreamFactory.js >> /scripts/logs/jd_dreamFactory.log 2>&1
# 东东小窝
46 6,23 * * * node /scripts/jd_small_home.js >> /scripts/logs/jd_small_home.log 2>&1
# 东东工厂
26 * * * * node /scripts/jd_jdfactory.js >> /scripts/logs/jd_jdfactory.log 2>&1
# 赚京豆(微信小程序)
12 0,9 * * * node /scripts/jd_syj.js >> /scripts/logs/jd_syj.log 2>&1
# 京东快递签到
47 1 * * * node /scripts/jd_kd.js >> /scripts/logs/jd_kd.log 2>&1
# 京东汽车(签到满500赛点可兑换500京豆)
0 0 * * * node /scripts/jd_car.js >> /scripts/logs/jd_car.log 2>&1
# 领京豆额外奖励(每日可获得3京豆)
23 1,12,22 * * * node /scripts/jd_bean_home.js >> /scripts/logs/jd_bean_home.log 2>&1
# 微信小程序京东赚赚
6 0-5/1,11 * * * node /scripts/jd_jdzz.js >> /scripts/logs/jd_jdzz.log 2>&1
# 京东汽车旅程赛点兑换金豆
0 0 * * * node /scripts/jd_car_exchange.js >> /scripts/logs/jd_car_exchange.log 2>&1
# 导到所有互助码
23 7 * * * node /scripts/jd_get_share_code.js >> /scripts/logs/jd_get_share_code.log 2>&1
# 口袋书店
38 8,12,18 * * * node /scripts/jd_bookshop.js >> /scripts/logs/jd_bookshop.log 2>&1
# 京喜农场
#30 9,12,18 * * * node /scripts/jd_jxnc.js >> /scripts/logs/jd_jxnc.log 2>&1
# 签到领现金
10 */4 * * * node /scripts/jd_cash.js >> /scripts/logs/jd_cash.log 2>&1
# 闪购盲盒
47 8,22 * * * node /scripts/jd_sgmh.js >> /scripts/logs/jd_sgmh.log 2>&1
# 京东秒秒币
10 6,21 * * * node /scripts/jd_ms.js >> /scripts/logs/jd_ms.log 2>&1
#美丽研究院
41 7,12,19 * * * node /scripts/jd_beauty.js >> /scripts/logs/jd_beauty.log 2>&1
#京东极速版签到+赚现金任务
21 1,6 * * * node /scripts/jd_speed_sign.js >> /scripts/logs/jd_speed_sign.log 2>&1
#京喜财富岛
18 0-23/1 * * * node /scripts/jd_smiek_gua_wealth_island.js >> /scripts/logs/jd_smiek_gua_wealth_island.log 2>&1
# 财富大陆互助
18 0,1,9,14,18 * * * node /scripts/jd_smiek_gua_wealth_island_help.js >> /scripts/logs/jd_smiek_gua_wealth_island_help.log 2>&1
# 删除优惠券(默认注释，如需要自己开启，如有误删，已删除的券可以在回收站中还原，慎用)
#20 9 * * 6 node /scripts/jd_delCoupon.js >> /scripts/logs/jd_delCoupon.log 2>&1
#京东直播（又回来了）
30-50/5 12,23 * * * node /scripts/jd_live.js >> /scripts/logs/jd_live.log 2>&1
#京东健康社区
13 1,6,22 * * * node /scripts/jd_health.js >> /scripts/logs/jd_health.log 2>&1
#京东健康社区收集健康能量
5-45/20 * * * * node /scripts/jd_health_collect.js >> /scripts/logs/jd_health_collect.log 2>&1
# 幸运大转盘
10 10,23 * * * node /scripts/jd_market_lottery.js >> /scripts/logs/jd_market_lottery.log 2>&1
# 领金贴
5 0 * * * node /scripts/jd_jin_tie.js >> /scripts/logs/jd_jin_tie.log 2>&1
#京喜牧场
15 */2 * * * node /scripts/jd_star_wind_windmc.js >> /scripts/logs/jd_star_wind_windmc.log 2>&1
#京东到家果园
10 0,3,8,11,17 * * * node /scripts/jd_winddj_fruit.js >> /scripts/logs/jd_winddj_fruit.log 2>&1
#京东到家鲜豆任务
0 0 */1 * * node /scripts/jd_winddj_bean.js >> /scripts/logs/jd_winddj_bean.log 2>&1
#京东到家收集水车水滴
5 */2 * * * node /scripts/jd_winddj_fruit_collectWater.js >> /scripts/logs/jd_winddj_fruit_collectWater.log 2>&1
#京东到家收集庄园水滴
10 */2 * * * node /scripts/jd_winddj_getPoints.js >> /scripts/logs/jd_winddj_getPoints.log 2>&1
#京东到家庄园浇水
15 0 * * * node /scripts/jd_winddj_plantBeans.js >> /scripts/logs/jd_winddj_plantBeans.log 2>&1
