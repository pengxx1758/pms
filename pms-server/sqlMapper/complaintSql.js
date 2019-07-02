module.exports = {
    // 获取“待处理”的投诉信息
    querySysList: "select * from complaint where cp_status=? and cp_system_id=?", 
    // 获取住户个人的投诉信息
    queryHouserList: "select * from complaint where cp_status=? and cp_houser_id=?", 

    // 获取投诉单详情
    queryDetailById: "select * from complaint where cp_id=?",
    // 投诉添加
    insertComplaint: "insert into complaint(cp_type,cp_way,cp_person,cp_phone,cp_content,cp_start_date,cp_status,cp_houser_id,cp_system_id,cp_address) "+
                    "value(?,?,?,?,?,?,?,?,?,?)",
    // 为投诉添加处理信息
    updateDealInfo: "update complaint set cp_charger=?,cp_end_date=?,cp_opinion=?,cp_detail=?,cp_status=1 where cp_id=?",

    // 删除投诉信息(更新)
    delComplaint: "update complaint set cp_status=2 where cp_id=?" ,

    // delComplaint: "delete from complaint where cp_id=?" 
}