# 每3天的23:50分清理一次日志(互助码不清理，proc_file.sh对该文件进行了去重)
50 23 */3 * * find /scripts/logs -name '*.log' | grep -v 'sharecodeCollection' | xargs rm -rf
#收集助力码
30 * * * * sh +x /scripts/docker/auto_help.sh collect >> /scripts/logs/auto_help_collect.log 2>&1

##############短期活动##############
#京东极速版红包(活动时间：2021-5-5至2021-5-31)
45 0,23 * * * node /scripts/jd_speed_redpocke.js >> /scripts/logs/jd_speed_redpocke.log 2>&1
#京享值pk(活动时间：2021-6-22至2021-7-21)
15 2 * * * node /scripts/jd_wind_windzpk.js >> /scripts/logs/jd_wind_windzpk.log 2>&1  
#QQ星系牧场
7 0-23/3 * * * node /scripts/jd_wind_qqxing.js >> /scripts/logs/jd_wind_qqxing.log 2>&1
#汪汪乐园养joy
11 1-23/4 * * * node /scripts/jd_wind_joypark_joy.js >> /scripts/logs/jd_wind_joypark_joy.log 2>&1
#汪汪乐园开工位
1 13 7 7 * node /scripts/jd_wind_joypark_open.js >> /scripts/logs/jd_wind_joypark_open.log 2>&1
#汪汪乐园每日任务
11 13 * * * node /scripts/jd_wind_joypark_task.js >> /scripts/logs/jd_wind_joypark_task.log 2>&1
#汪汪乐园
11 12 * * * node /scripts/jd_wind_joy_park.js >> /scripts/logs/jd_wind_joy_park.log 2>&1
#特物
0 3,4 * * * node /scripts/jd_star_wind_productZ4Brand.js >> /scripts/logs/jd_star_wind_productZ4Brand.log 2>&1
#超级直播间红包雨(活动时间不定期，出现异常提示请忽略。红包雨期间会正常)
1,31 0-23/1 * * * node /scripts/jd_live_redrain.js >> /scripts/logs/jd_live_redrain.log 2>&1
#燃动夏季
21 6-22/2 * * * node /scripts/jd_smiek_wind_summer_movement.js >> /scripts/logs/jd_smiek_wind_summer_movement.log 2>&1
#粉丝互动
12 15 * * * node /scripts/jd_wen_wind_wxFans.js >> /scripts/logs/jd_wen_wind_wxFans.log 2>&1

#早起福利
30 6 * * * node /scripts/jd_wind_goodMorning.js >> /scripts/logs/jd_wind_goodMorning.log 2>&1
#来客有礼小程序
45 4 * * * node /scripts/jd_wind_sendBeans.js >> /scripts/logs/jd_wind_sendBeans.log 2>&1
#翻翻乐
20 * * * * node /scripts/jd_big_winner.js >> /scripts/logs/jd_big_winner.log 2>&1
# 赚30
3 1,6 * * * node /scripts/jd_wind_earn30.js >> /scripts/logs/jd_wind_earn30.log 2>&1
# MM领京豆
20 9 * * * node /scripts/jd_smiek_gua_MMdou.js >> /scripts/logs/jd_smiek_gua_MMdou.log 2>&1
#全民摸冰
20 17,18 * * * node /scripts/jd_wen_wind_mb.js >> /scripts/logs/jd_wen_wind_mb.log 2>&1

#整点红包雨
0 0-23/1 * * * node /scripts/jd_wind2_long_super_redrain.js >> /scripts/logs/jd_wind2_long_super_redrain.log 2>&1
#半点红包雨
30 0-23/1 * * * node /scripts/jd_wind2_long_half_redrain.js >> /scripts/logs/jd_wind2_long_half_redrain.log 2>&1

#5G超级盲盒(活动时间：2021-06-2到2021-07-31)
0 0-23/4 * * * node /scripts/jd_mohe.js >> /scripts/logs/jd_mohe.log 2>&1
#金榜创造营 活动时间：2021-05-21至2021-12-31
0 1,22 * * * node /scripts/jd_gold_creator.js >> /scripts/logs/jd_gold_creator.log 2>&1
##############长期活动##############

#玩一玩成就
48 11 * * * node /scripts/jd_tsuk_wind_wyw.js >> /scripts/logs/jd_tsuk_wind_wyw.log 2>&1
#京东试用
15 12 * * * node /scripts/jd_imwcc_wind_try.js >> /scripts/logs/jd_imwcc_wind_try.log 2>&1
#图形签到
20 5 * * * node /scripts/jd_sign_graphics.js >> /scripts/logs/jd_sign_graphics.log 2>&1
# 签到
7 0,17 * * * cd /scripts && node jd_bean_sign.js >> /scripts/logs/jd_bean_sign.log 2>&1
#京喜签到
11 0 * * * node /scripts/jd_Aaron_jx_sign.js >> /scripts/logs/jd_Aaron_jx_sign.log 2>&1
#点点卷
10 2,22 * * * node /scripts/jd_smiek_wind_necklace.js >> /scripts/logs/jd_smiek_wind_necklace.log 2>&1
# 东东超市兑换奖品
0,30 0 * * * node /scripts/jd_hello_wind_blueCoin.js >> /scripts/logs/jd_hello_wind_blueCoin.log 2>&1
# 摇京豆
6 0,23 * * * node /scripts/jd_club_lottery.js >> /scripts/logs/jd_club_lottery.log 2>&1
# 东东农场
15 6-18/6 * * * node /scripts/jd_fruit.js >> /scripts/logs/jd_fruit.log 2>&1
# 东东乐园
30 7 * * * node /scripts/jd_wen_wind_ddnc_farmpark.js >> /scripts/logs/jd_wen_wind_ddnc_farmpark.log 2>&1
# 宠汪汪
57 7,15,23 * * * node /scripts/jd_validate.js >> /scripts/logs/jd_validate.log 2>&1
01 16 * * * node /scripts/jd_validate.js >> /scripts/logs/jd_validate.log 2>&1
0 0,8,16 * * * node /scripts/jd_hello_wind_joy_reward_new.js >> /scripts/logs/jd_hello_wind_joy_reward_new.log 2>&1
04 16 * * * node /scripts/jd_hello_wind_joy_reward_20.js >> /scripts/logs/jd_hello_wind_joy_reward_20.log 2>&1
#宠汪汪任务喂食
35 */4 * * * node /scripts/jd_hello_wind_joy_new.js >> /scripts/logs/jd_hello_wind_joy_new.log 2>&1
#宠汪汪偷狗粮
10 0-21/3 * * * node /scripts/jd_smiek_wind_joy_steal.js >> /scripts/logs/jd_smiek_wind_joy_steal.log 2>&1
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
21 9 * * * node /scripts/jd_yangtingxiao_wind_rankingList.js >> /scripts/logs/jd_yangtingxiao_wind_rankingList.log 2>&1
# 天天提鹅
28 * * * * node /scripts/jd_daily_egg.js >> /scripts/logs/jd_daily_egg.log 2>&1
# 金融养猪
32 0-23/6 * * * node /scripts/jd_pigPet.js >> /scripts/logs/jd_pigPet.log 2>&1
# 京喜工厂
50 * * * * node /scripts/jd_wind_dreamFactory2.js >> /scripts/logs/jd_wind_dreamFactory2.log 2>&1
# 东东小窝
#46 6,23 * * * node /scripts/jd_wind_small_home.js >> /scripts/logs/jd_wind_small_home.log 2>&1
# 东东工厂
26 * * * * node /scripts/jd_jdfactory.js >> /scripts/logs/jd_jdfactory.log 2>&1
# 赚京豆(微信小程序)
12 0,9 * * * node /scripts/jd_syj_new.js >> /scripts/logs/jd_syj_new.log 2>&1
# 京东快递签到
47 1 * * * node /scripts/jd_kd.js >> /scripts/logs/jd_kd.log 2>&1
# 京东汽车(签到满500赛点可兑换500京豆)
0 0 * * * node /scripts/jd_car.js >> /scripts/logs/jd_car.log 2>&1
# 领京豆额外奖励(每日可获得3京豆)
23 1,12,22 * * * node /scripts/jd_bean_home.js >> /scripts/logs/jd_bean_home.log 2>&1
# 微信小程序京东赚赚
6 0-5/1,11 * * * node /scripts/jd_jdzz.js >> /scripts/logs/jd_jdzz.log 2>&1
# crazyJoy自动每日任务
30 7,23 * * * node /scripts/jd_crazy_joy.js >> /scripts/logs/jd_crazy_joy.log 2>&1
# 京东汽车旅程赛点兑换金豆
0 0 * * * node /scripts/jd_car_exchange.js >> /scripts/logs/jd_car_exchange.log 2>&1
# 导到所有互助码
23 7 * * * node /scripts/jd_get_share_code.js >> /scripts/logs/jd_get_share_code.log 2>&1
# 口袋书店
38 8,12,18 * * * node /scripts/jd_wen_chinnkarahoi_wind_bookshop.js >> /scripts/logs/jd_wen_chinnkarahoi_wind_bookshop.log 2>&1
# 京喜农场
30 9,12,18 * * * node /scripts/jd_jxnc.js >> /scripts/logs/jd_jxnc.log 2>&1
# 签到领现金
10 */4 * * * node /scripts/jd_cash.js >> /scripts/logs/jd_cash.log 2>&1
# 闪购盲盒
47 8,22 * * * node /scripts/jd_sgmh.js >> /scripts/logs/jd_sgmh.log 2>&1
# 京东秒秒币
10 6,21 * * * node /scripts/jd_ms.js >> /scripts/logs/jd_ms.log 2>&1
#美丽研究院
41 7,12,19 * * * node /scripts/jd_beauty.js >> /scripts/logs/jd_beauty.log 2>&1
#京东保价
#41 0,23 * * * node /scripts/jd_price.js >> /scripts/logs/jd_price.log 2>&1
#京东极速版签到+赚现金任务
21 1,6 * * * node /scripts/jd_speed_sign.js >> /scripts/logs/jd_speed_sign.log 2>&1
#监控crazyJoy分红
10 12 * * * node /scripts/jd_crazy_joy_bonus.js >> /scripts/logs/jd_crazy_joy_bonus.log 2>&1
#京喜财富岛
18 0-23/1 * * * node /scripts/jd_smiek_gua_wealth_island.js >> /scripts/logs/jd_smiek_gua_wealth_island.log 2>&1
# 财富大陆互助
18 0,1,9,14,18 * * * node /scripts/jd_smiek_gua_wealth_island_help.js >> /scripts/logs/jd_smiek_gua_wealth_island_help.log 2>&1
# 删除优惠券(默认注释，如需要自己开启，如有误删，已删除的券可以在回收站中还原，慎用)
#20 9 * * 6 node /scripts/jd_delCoupon.js >> /scripts/logs/jd_delCoupon.log 2>&1
#家庭号
10 6,7 * * * node /scripts/jd_family.js >> /scripts/logs/jd_family.log 2>&1
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
# 东东电竞经理
15 0-23/2 * * * node /scripts/jd_hello_wind_EsportsManager.js >> /scripts/logs/jd_hello_wind_EsportsManager.log 2>&1
# 跳跳乐瓜分京豆
15 0,12,22 * * * node /scripts/jd_jump.js >> /scripts/logs/jd_jump.log 2>&1
#京喜牧场
15 */2 * * * node /scripts/jd_star_wind_jxmc.js >> /scripts/logs/jd_star_wind_jxmc.log 2>&1
#东东小窝
11 0 * * * node /scripts/jd_wind_small_home.js >> /scripts/logs/jd_wind_small_home.log 2>&1
#京东到家果园
10 0,3,8,11,17 * * * node /scripts/jd_winddj_fruit.js >> /scripts/logs/jd_winddj_fruit.log 2>&1
#京东到家鲜豆任务
0 0 */1 * * node /scripts/jd_winddj_bean.js >> /scripts/logs/jd_winddj_bean.log 2>&1
#京东到家收集水车水滴
*/5 * * * * node /scripts/jd_winddj_fruit_collectWater.js >> /scripts/logs/jd_winddj_fruit_collectWater.log 2>&1
#京东到家收集庄园水滴
*/5 * * * * node /scripts/jd_winddj_getPoints.js >> /scripts/logs/jd_winddj_getPoints.log 2>&1
#京东到家庄园浇水
15 0 * * * node /scripts/jd_winddj_plantBeans.js >> /scripts/logs/jd_winddj_plantBeans.log 2>&1
