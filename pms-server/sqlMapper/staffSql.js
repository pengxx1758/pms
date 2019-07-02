module.exports={
    add: "insert into staff(s_community_id,s_name,s_phone,s_wechat,s_email,s_remarks) value(?,?,?,?,?,?)",

    queryAll: "select c.c_name,s.* from staff as s,community as c where s.s_community_id=c.c_id and c_system_id=?",

    queryById: "select * from staff where s_id=?",
    
    updateAll: "update staff set "+
    "s_community_id=?,s_name=?,s_phone=?,s_wechat=?,s_email=?,s_remarks=? "+
    "where s_id=?",

    delById: "delete from staff where s_id=?"

}