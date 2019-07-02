module.exports = {
    insert: "insert into feesub(fs_system_id,fs_name,fs_type,fs_price) value(?,?,?,?)",

    queryAll: "select * from feesub where fs_system_id=?",

    delById: "delete from feesub where fs_id=?",

    queryAllbyType: "select fs_name,fs_price from feesub where fs_type=? and fs_system_id=?",

}