module.exports = {
    // 添加是收费单基本信息
    insertFee: "insert into fee(f_system_id,f_order_number,f_houser_id,f_create_date,f_end_date,f_delay_rate,f_state,f_charger) "+
        "value(?,?,?,?,?,?,?,?)",
    // 为收费单添加子项
    insertFeeItem: "insert into fee_item(fi_fee_id,fi_name,fi_number,fi_money) value(?,?,?,?)",
    // 查询所有的收费子项
    queryAllFeeItem: "select * from fee_item where fi_fee_id=?",
    // 查询系统所有收费单(待付款 已付款 已过期)
    queryAllSysFee: "select h.h_name,f.* from fee f,household h where f.f_houser_id=h.h_id and f.f_system_id=? and f.f_state=?",
    // 查询住户个人所有费单 (待付款 已付款 已过期)
    queryAllHouserFee: "select h.h_name,f.* from fee f,household h where f.f_houser_id=h.h_id and f.f_houser_id=? and f.f_state=?",
    // 删除收费子项
    delFeeItem: "delete from fee_item where fi_id=?",
    // 更新收费单
    updateFee: "update fee set f_total_money=?,f_state=? where f_id=?",
    // 更新收费状态
    updateFeeState: "update fee set f_state=? where f_id=?"
}