module.exports = {
    // 获取系统所有维修列表
    querySysList: "select * from maintain where m_status=? and m_system_id=?",

    // 获取住户个人所有指定状态的的维修列表 （0,1,2-- 待审核 待验收 已验收）
    queryHouserList: "select * from maintain where m_status=? and m_houser_id=?",

    // 获取维修单详情
    queryDetailById: "select * from maintain where m_id=?",
    // 申请维修（基础信息）
    insertMaintain: "insert into maintain(m_type,m_person,m_phone,m_start_date,m_description,m_status,m_houser_id,m_system_id,m_address) "+
                    "value(?,?,?,?,?,?,?,?,?)",
    // 为维修添加审核信息
    updateCheckInfo: "update maintain set m_charger=?,m_opinion=?,m_method=?,m_status=1 where m_id=?",
    // 为维修添加验收信息
    updateAcceptInfo: "update maintain set m_end_date=?,m_maintainer=?,m_result=?,m_status=2 where m_id=?",
    // 删除维修单
    delMaintian: "update maintain set m_status=3 where m_id=?",
    // 获取住户的住址
    queryAddress: "select c.c_name,b.b_name,h.h_doorplate from household h,building b,community c where h.h_building_id=b.b_id and b.b_community_id=c.c_id and h.h_id=?",
    // delMaintian: "delete from maintain where m_id=?"
}