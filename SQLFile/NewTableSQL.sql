alter table mydb.t_emcproject add f_emcproject_status int not null;

create table mydb.t_project_types(
f_project_type_id int not null auto_increment,
f_project_type_name varchar(128) not null,
f_project_type_status int not null,
f_project_type_desc varchar(256),
primary key(f_project_type_id)
);

create table mydb.t_type_template(
f_type_template_id int not null auto_increment,
f_type_template_name varchar(128) not null,
f_type_template_desc varchar(256),
f_project_type_id int not null,
primary key(f_type_template_id)
);

create table mydb.t_energysavingtype_template(
f_energysavingtype_template_id int not null auto_increment,
f_energysaving_type_name varchar(128) not null,
f_energysaving_type_desc varchar(256),
f_energysaving_type_formula varchar(1024) not null,
f_type_template_id int not null,
primary key(f_energysavingtype_template_id)
);

create table mydb.t_expensetype_template(
f_expensetype_template_id int not null auto_increment,
f_expense_type_name varchar(128) not null,
f_expense_type_desc varchar(256),
f_type_template_id int not null,
primary key(f_expensetype_template_id)
);

create table mydb.t_event_log
(
	f_event_log_id int not null auto_increment,
	f_event_log_name varchar(128) not null,
	f_event_log_date datetime not null,
	f_event_log_desc varchar(256) not null,
	f_event_log_reminddate datetime,
	f_event_log_type int not null,
	f_event_log_belong_id int not null,
	f_event_log_remind_switch int, 
	primary key(f_event_log_id)
)engine=innodb default charset=utf8 auto_increment=1;

CREATE TABLE mydb.tmp_event_table (
eid int,
ename varchar(128),
edesc varchar(1024),
etype int,
e_belong_id int,
ptid int,
ptname varchar(128),
belong_pname varchar(128),
e_belong_name varchar(128)
);

CREATE TABLE mydb.t_energy_consumption (
f_energy_consumption_id int not null auto_increment,
f_energy_consumption_name varchar(128) not null,
f_energy_consumption_desc varchar(256),
f_energy_consumption_formula varchar(4096) not null,
f_energy_consumption_targetvalue double,
f_emcproject_id int not null,
primary key(f_energy_consumption_id)
)engine=innodb default charset=utf8 auto_increment=1;

create table mydb.t_trend_nggf_new
(
	fd_nodename	varchar(64) not null,
	fd_tagname	varchar(64) not null,
	fd_tagdesc	varchar(128),
	fd_datetime	varchar(24) not null,
	fd_tagvalue	varchar(32),
	fd_tagquality int,
	primary key(fd_nodename,fd_tagname,fd_datetime)
);

create table mydb.t_trend_bxgf_new
(
	fd_nodename	varchar(64) not null,
	fd_tagname	varchar(64) not null,
	fd_tagdesc	varchar(128),
	fd_datetime	varchar(24) not null,
	fd_tagvalue	varchar(32),
	fd_tagquality int,
	primary key(fd_nodename,fd_tagname,fd_datetime)
);