module.exports = {
    add: "insert into system(s_endtime,sc_number) value(?,?)",
    
    updateUser: "update user set u_system_id=? where u_id=?",

    queryById: "select * from system where s_id=?",

    updateSysInfo: "update system set s_endtime=?,s_status=?,sc_number=? where s_id=?"
}