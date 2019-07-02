module.exports = {
    // 住户登录
    login: "select hu.*,c.c_system_id,s.s_status from house_user as hu,community as c,system as s where hu.hu_community_id=c.c_id and c.c_system_id=s.s_id and hu.hu_phone=?",

    add: "insert into household(h_state,h_building_id,h_doorplate,h_name,h_gender,h_phone,h_identity,"+
    "h_idcard,h_birth,h_card,h_working,h_room_time,h_room_reason,"+
    "h_qq,h_wechat,h_email,h_house_phone,h_emergency_person,h_emergency_phone)"+
    "value(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",

    queryAll: "select h.h_id,h.h_name,h.h_phone,c.c_name,b.b_name,h.h_doorplate,h.h_identity from household as h,building as b,community as c where h.h_building_id=b.b_id and b.b_community_id=c.c_id and c.c_system_id=? and h.h_state=?",

    queryById: "select * from household where h_id=?",

    updateAll: "update household set "+
    "h_building_id=?,h_doorplate=?,h_name=?,h_gender=?,h_phone=?,h_identity=?,"+
    "h_idcard=?,h_birth=?,h_card=?,h_working=?,h_room_time=?,h_room_reason=?,"+
    "h_qq=?,h_wechat=?,h_email=?,h_house_phone=?,h_emergency_person=?,h_emergency_phone=? "+
    "where h_id=?",
    
    // 查询所有的小区及所属楼盘
    queryAllCB: "select c.c_id,c.c_name,b.b_id,b.b_name from community as c,building as b where c.c_id=b.b_community_id",
    // 检查住户账户表手机是否重复
    checkPhoneRepeat: "select count(*) as result from house_user where hu_phone=?",
    // 为住户账户表新建一条信息
    addUser: "insert into house_user(hu_id,hu_phone,hu_password,hu_salt,hu_community_id,hu_login) value(?,?,?,?,?,?)",
    // 获取未审核的住户信息
    queryUncheckList: "select h.h_id,h.h_name,h.h_phone,c.c_name,b.b_name,h.h_doorplate,h.h_identity from household as h,building as b,community as c where h.h_building_id=b.b_id and b.b_community_id=c.c_id and c.c_system_id=? and h.h_state=0",
    // 获取已审核的住户信息
    querycheckedList: "select h.h_id,h.h_name,h.h_phone,c.c_name,b.b_name,h.h_doorplate,h.h_identity from household as h,building as b,community as c where h.h_building_id=b.b_id and b.b_community_id=c.c_id and c.c_system_id=? and h.h_state=1",

    // 住户完成自己的付费
    
    // 审核住户
    updateStateById: "update house_user as hu,household as h set hu.hu_login=1,h.h_state=1 where hu.hu_id=? and h.h_id=?",
    
    // 查询楼盘下的所有住户
    queryAllBybId: "select h_id,h_name from household where h_building_id=?"
}