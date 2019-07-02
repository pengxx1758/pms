# 系统收费表
create table systemfee(
	sf_id int AUTO_INCREMENT PRIMARY KEY,
	sf_order_id varchar(50), # 收费订单号
	sf_total DECIMAL(10,2), # 收费金额
)

# 管理员账户表
create table user(
	u_id int AUTO_INCREMENT PRIMARY KEY,
	u_system_id int, # 管理员所属的系统
	u_name varchar(50) default '未命名用户',
	u_phone varchar(20) not null,
	u_password varchar(50) not null,
	u_salt varchar(20) not null, # 密码盐
	u_status int not null default 0, # 用户登录状态 (0下线 1登录)
	u_role int not null default 0,# 用户角色id （0:超级管理员,1:子管理员）
	
	foreign key(u_system_id) references system(s_id)
)

# 住户账户信息表
create table house_user(
	hu_id int AUTO_INCREMENT PRIMARY KEY,
	hu_phone varchar(20) not null,
	hu_password varchar(50) not null,
	hu_salt varchar(20) not null, # 密码盐
	hu_community_id int not null, # 外键 表示住户所属的小区
	
	hu_login int not null default 0, # 住户登录使能（用于区分审核已否）
	
	foreign key(hu_community_id) references community(c_id)
)
alter table house_user add hu_name varchar(50) default '未命名用户'

select count(*) as result from house_user where hu_phone=13333333333
insert into house_user(hu_phone,hu_password,hu_salt,hu_community_id) value()
# 系统表 （表示超级管理员与所属系统的关系）
create table system(
	s_id int AUTO_INCREMENT PRIMARY KEY,
	s_endtime date, #系统到期时间
	s_status int default 1, #系统状态（1正常 0已过期）
	sc_number int not null default 1 # 可管理的小区数
)


# 小区表
create table community(
	c_id int AUTO_INCREMENT PRIMARY KEY,
	c_name varchar(50) not null,
	c_region varchar(50) not null, # 省市区
	c_place varchar(100) not null, # 详细地址
	c_charger varchar(20), # 负责人
	c_phone varchar(50), # 联系电话
	c_system_id int not null,  # 外键 表示该小区由哪个系统管理的
	c_area DECIMAL(8,2), # 占地面积
	c_buliding_area DECIMAL(8,2), # 建筑面积
	c_public_area DECIMAL(8,2), # 公共场所面积
	c_greening DECIMAL(8,2), # 绿化面积
	c_garage_area DECIMAL(8,2), # 车库面积
	c_remarks varchar(100), # 备注
	foreign key(c_system_id) references system(s_id)
)


# 楼盘表
create table building(
	b_id int AUTO_INCREMENT PRIMARY KEY,
	b_community_id int not null,  # 外键 表示楼盘所属小区
	b_name varchar(50) not null,  # 楼盘名
	b_unit int not null,  # 楼盘单元数
	b_layer int not null, # 楼盘层数
	b_house_number int not null, # 房间数量
	b_style varchar(20), # 楼盘类型
	b_description varchar(50), # 楼盘说明（楼盘结构、朝向、特点...）
	b_remarks varchar(100), # 备注
	
	foreign key(b_community_id) references community(c_id)
)
# 住户表
create table household(
	h_id int AUTO_INCREMENT PRIMARY KEY,
	h_state int not null default 0,# 住户状态 用于审核，识别住户是否能查看小区信息(0:待审核 1:已审核)
	h_building_id int not null, # 外键 表示住户所属的楼宇
	h_doorplate varchar(20) not null, # 门牌号 
	h_name varchar(50) not null, # 姓名
	h_gender varchar(10) not null, # 性别
	h_phone varchar(20) not null, # 手机
	h_identity varchar(20) not null, # 住户身份 （业主本人、亲属、租户）
	h_idcard varchar(50), # 身份证号码
	h_birth date, # 出生日期
	h_card varchar(50), # 业主卡号
	h_working varchar(50), # 单位名称
	h_room_time date, # 入住时间
	h_room_reason varchar(50), # 入住原因
	# 以下为 联系信息
	h_qq varchar(50), # qq号
	h_wechat varchar(50), # 微信号
	h_email varchar(50), # 邮箱
	h_house_phone varchar(20), # 家庭电话
	h_emergency_person varchar(50), # 紧急联系人
	h_emergency_phone varchar(50), # 紧急联系人电话
	
	foreign key(h_building_id) references building(b_id)
)

# 车位表
create table park(
	p_id int AUTO_INCREMENT PRIMARY KEY,
	p_community_id int not null, # 外键 表示车位所属的小区
	p_number varchar(20) not null, # 车位号
	p_area DECIMAL(8,2), # 车位面积
	p_style varchar(20) not null, # 车位类型（公共车位 人防车位 产权车位)
	p_status varchar(20), # 车位状态
	p_buyer varchar(20),  # 产权车位私有者姓名
	p_car_number varchar(20), # 车牌号
	p_buyer_phone varchar(20), # 产权车位私有者电话
	p_remarck varchar(100), # 备注
	
	foreign key(p_community_id) references community(c_id)
)

# 职位表
create table positions(
	pos_id int AUTO_INCREMENT PRIMARY KEY,
	pos_community_id int not null, # FK 职位所属小区
	pos_name varchar(50) not null, # 职位名称
	pos_staff_id int not null, # 职位对应的员工 员工手机号是登录账号
	pos_username varchar(50) not null, # 
	pos_password varchar(50) not null, # 登录密码
	# 权限功能（按大模块来分模块）
	pos_login int not null default 0, # 登录控制
	pos_community int not null default 0, # 小区管理
	pos_building int not null default 0, # 楼盘管理
	pos_household int not null default 0, # 住户管理
	pos_park int not null default 0, # 车位管理
	pos_fee int not null default 0, # 财务管理
	pos_organ int not null default 0, # 组织管理
	pos_customer int not null default 0, # 客服管理

	foreign key(pos_community_id) references community(c_id),
	foreign key(pos_staff_id) references staff(s_id)
)

# 员工表
create table staff(
	s_id int AUTO_INCREMENT PRIMARY KEY,
	s_community_id int not null, # 外键 表示员工所属小区
	s_name varchar(50) not null, # 员工姓名
	s_phone varchar(20) not null, # 员工手机
	s_wechat varchar(50), # 微信号
	s_email varchar(50), # 邮箱
	s_remarks varchar(100),

	foreign key(s_community_id) references community(c_id)
)


# 维修申请表
create table maintain(
	m_id int AUTO_INCREMENT PRIMARY KEY,
	m_houser_id int not null, # 外键， 表示维修单有哪个住户申请的
	m_system_id int not null, # 外键， 表示维修单所属系统
	m_type varchar(20) not null, # 类别 (电路 家具 电器 排水 照明 网络)
	m_person varchar(50) not null, # 申请人
	m_phone varchar(20) not null, # 手机
	m_start_date date, # 申请日期
	m_description varchar(100), # 维修说明
	m_status int not null default 0,  # 维修状态（未审核 已审核 已验收）
	
	# 审核 字段
	m_charger varchar(50), # 审核负责人
	m_opinion varchar(100), # 审核意见
	m_method varchar(20), # 处理方法

	# 验收 字段
	m_end_date date, # 验收日期
	m_maintainer varchar(50), #s 验收人（维修师傅）
	m_result varchar(50), # 验收结果

	foreign key(m_houser_id) references house_user(hu_id),
	foreign key(m_system_id) references system(s_id)
)
alter table maintain add m_address varchar(50) not null # 住户地址
# 住户投诉表
create table complaint(
	cp_id int AUTO_INCREMENT PRIMARY KEY,
	cp_houser_id int not null, # 外键， 表示投诉有哪个住户申请的
	cp_system_id int not null, # 外键， 表示维修单所属系统
	cp_status int not null default 0, # 投诉单状态(0：待处理 1：已处理)
	cp_type varchar(20) not null, # 投诉类型 (管理投诉 工程投诉 收费投诉 突发事件投诉)
	cp_way varchar(20) not null, # 投诉方式 （协商和解 请求调解 相关部分申诉）
	cp_person varchar(50) not null, # 投诉人
	cp_phone varchar(20) not null, # 联系方式
	cp_content varchar(100) not null, #投诉内容
	cp_start_date date not null, # 投诉日期
	
	cp_charger varchar(50), # 处理负责人
	cp_end_date date, # 处理日期
	cp_opinion varchar(100), # 处理意见
	cp_detail varchar(100), # 处理细节

	foreign key(cp_houser_id) references house_user(hu_id),
	foreign key(cp_system_id) references system(s_id)
)
alter table complaint add cp_address varchar(50) not null # 住户地址

# 收费科目表
create table feesub(
	fs_id  int AUTO_INCREMENT PRIMARY KEY,
	fs_name varchar(50) not null, # 收费科目名称
	fs_type varchar(50) not null, # 计算方式(单价*数量、固定金额)
	fs_price DECIMAL(8,2) # 单价
)

# 收费表
create table fee(
	f_id int AUTO_INCREMENT PRIMARY KEY,
	f_houser_id int not null, # 住户编号 
	f_total_money DECIMAL(8,2) not null, # 总额金额
	f_create_date date not null, # 创单时间
	f_end_date date not null, # 最晚付费信息
	f_delay_rate int not null, # 延期滞纳率
	#f_delay_money DECIMAL(8,2) not null, # 滞纳金金额
	f_state int not null default 0, # 订单状态(暂定 0未付款 1已付款  2已过期 3已提醒)
	f_charger varchar(50) not null, # 经办人

	foreign key(f_houser_id) references house_user(hu_id)
)

# 收费项目表	
create table fee_item(
	fi_fee_id int,  # 收费单编号
	fi_name varchar(50) not null, # 收费科目名称
	fi_number DECIMAL(8,2) default 0.00, # 可选的数量
	fi_money DECIMAL(8,2), # 单项金额
	foreign key(fi_fee_id) references fee(f_id)
)

# 系统日志表
create table system_log(
	sl_id int AUTO_INCREMENT PRIMARY KEY,
	sl_user_id int not null, # 管理员或用户
	sl_login_time datetime, # 登录时间
)

