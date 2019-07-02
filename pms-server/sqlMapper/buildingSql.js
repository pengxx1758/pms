module.exports = {
    add: "insert into building(b_community_id,b_name,b_unit,b_layer,b_house_number,b_style,b_description,b_remarks)"+
    " value(?,?,?,?,?,?,?,?)",

    queryAll: 'select b.*,c.c_id,c.c_name from building as b,community as c where b.b_community_id=c.c_id and c.c_system_id=?',

    checkNameRepeat: 'select count(*) as result from building where b_community_id=? and b_name=?',

    querybyId: 'select * from building where b_id=?',

    updateAll: "update building set "+
    "b_name=?,b_unit=?,b_layer=?,b_house_number=?,b_style=?,b_description=?,b_remarks=?"+
    " where b_id=?",

    // 查询系统所有小区下的各自的楼盘信息s
    queryCnameAndBname: "select c.c_id,c.c_name,b.b_id,b.b_name from community as c,building as b where c.c_id=b.b_community_id and c.c_system_id=?",

    delById: "delete from building where b_id=?"
}