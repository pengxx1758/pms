module.exports={
    add: "insert into park(p_community_id,p_number,p_area,p_style,p_status,p_buyer,p_car_number,p_buyer_phone,p_remarck) value(?,?,?,?,?,?,?,?,?)",

    querypNumberRepeat: "select count(*) as result from park where p_community_id=? and p_number=?",

    queryAll: "select c.c_name,p.* from park as p,community as c where p.p_community_id=c.c_id and c.c_system_id=?",

    queryById: "select * from park where p_id=?",

    updateAll: "update park set "+
    "p_community_id=?,p_number=?,p_area=?,p_style=?,p_status=?,"+
    "p_buyer=?,p_car_number=?,p_buyer_phone=?,p_remarck=? "+
    "where p_id=?"
}   