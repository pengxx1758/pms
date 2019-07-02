module.exports={
    // 为自管理员注册账户
    addUser: "insert into user(u_phone,u_password,u_salt,u_role,u_login,u_system_id) value(?,?,?,?,?,?)",

    // 查询系统所有的职位信息
    queryAllPosById: "select p.*,c.c_name,s.s_name from positions p,community c,staff s where p.pos_community_id=c.c_id and p.pos_staff_id=s.s_id and p.pos_system_id=?",

    queryDetailById: "select c.c_name,p.pos_name,s.s_name,s.s_phone,u.u_password,u.u_salt from positions p,community c,staff s,user u where p.pos_community_id=c.c_id and p.pos_staff_id=s.s_id and p.pos_user_id=u.u_id and p.pos_id=?",
    
    delPosiiton: "delete from positions where pos_id=?",
    delUser: "delete from user where u_id=?",
    // 添加职位信息
    insertPos: "insert into positions(pos_system_id,pos_community_id,pos_name,pos_staff_id,pos_user_id) "+
                "value(?,?,?,?,?)",
    // 根据小区id获取小区所有人信息
    queryAllStaffBycId: "select s_id,s_name from staff where s_community_id=?",

    // 判断员工的手机是否已被注册过了
    checkPhoneRepeat: "select count(*) as result from user where u_phone=?",
    // 查询管理员所有的权限管理
    queryPermissionById: "select p.*,u.u_login from positions p,user u where p.pos_user_id=u.u_id and pos_id=?",
    // 通过userId查询管理员所有的权限管理
    queryPermissionByuserId: "select * from positions where pos_user_id=?",
    // 更新权限
    updatePermission: "update positions p,user u set u.u_login=?,"+
    "p.pos_community=?,p.pos_building=?,p.pos_household=?,p.pos_park=?,"+
    "p.pos_feepay=?,p.pos_feesub=?,p.pos_feetip=?,"+
    "p.pos_staff=?,p.pos_position=?,"+
    "p.pos_maintain=?,p.pos_complaint=? "+
    "where p.pos_user_id=u.u_id=?",
}