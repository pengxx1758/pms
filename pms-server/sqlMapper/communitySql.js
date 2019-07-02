module.exports = {
    // 插入小区数据
    add:"insert into community(c_system_id,c_name,c_region,c_place,c_charger,c_phone,c_area,c_buliding_area,c_public_area,c_greening,c_garage_area,c_remarks)"
        +"value(?,?,?,?,?,?,?,?,?,?,?,?)",
    // 根据系统获取系统所有小区信息
    queryAll: "select * from community where c_system_id = ?",
    // 根据c_id获取信息
    queryById: "select * from community where c_id=?",
    // 检查统一系统中是否有同一小区了
    checkRepeat: "select count(*) as result from community where c_system_id=? and c_name=?",
    // 更新小区信息
    update: "update community set "+
    "c_name=?,c_region=?,c_place=?,c_charger=?,c_phone=?,"+
    "c_area=?,c_buliding_area=?,c_public_area=?,c_greening=?,c_garage_area=?,c_remarks=? "+
    "where c_id=?",
    // 获取小区名称和id
    queryIdandName: "select c_id,c_name from community where c_system_id=?",

}