var user = {
    // 注册
    insert: "insert into user(u_phone,u_password,u_salt,u_role) value(?,?,?,?)",
    // 登录
    queryByPhone: "select * from (select u.*,s.s_status from user as u left join system as s on u.u_system_id=s.s_id) as cs where cs.u_phone=?",
    // 通过手机号码修改密码
    updatePwdByPhone: "update user set u_password=? where u_phone=?",
    // 修改用户登录状态为“登录”
    updateStatusOnlineById: "update user set u_status=1 where u_id=?",
    // 修改用户登录状态为“下线”
    updateStatusOfflineById: "update user set u_status=1 where u_id=?",
    // 查询是否存在用户
    // hasUserByPhone:'select count(*) as result from user where u_phone=? and u_role=0',
    hasUserByPhone:'select count(*) as result from user where u_phone=?',

    querySysByuId: "select u.u_phone,s.s_id,s.s_endtime,s.sc_number from user as u left join system as s on u.u_system_id=s.s_id and u.u_id=?",

    queryById: "select * from user where u_id=?",

    updatePwd: "update user set u_password=? where u_phone=?"

}

module.exports = user;