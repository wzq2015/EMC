delimiter //
create procedure mydb.procedure_TrendBxgfToNew()
begin
insert into mydb.t_trend_bxgf_new(fd_nodename,fd_tagname,fd_tagdesc,fd_datetime,fd_tagvalue,fd_tagquality) 
select fd_nodename,fd_tagname,fd_tagdesc,max(fd_datetime),fd_tagvalue,fd_tagquality 
from mydb.t_trend_bxgf where fd_tagname like 'bxgf_104ym_%' and left(fd_datetime,10)=left(now(),10) and hour(fd_datetime)<18 
group by fd_tagname;
end
//
delimiter ;

delimiter $$
create event mydb.event_TrendBxgfToNew
on schedule every 1 day starts '2015-05-22 19:00:00'
on completion preserve
do 
begin 
call mydb.procedure_TrendBxgfToNew();
end $$
delimiter ;

delimiter //
create procedure mydb.procedure_TrendNggfToNew()
begin
insert into mydb.t_trend_nggf_new(fd_nodename,fd_tagname,fd_tagdesc,fd_datetime,fd_tagvalue,fd_tagquality) 
select fd_nodename,fd_tagname,fd_tagdesc,max(fd_datetime),fd_tagvalue,fd_tagquality 
from mydb.t_trend_nggf where fd_tagname like 'nggf_104yc_%' and left(fd_datetime,10)=left(now(),10) and hour(fd_datetime)<18 
group by fd_tagname;
end
//
delimiter ;

delimiter $$
create event mydb.event_TrendNggfToNew
on schedule every 1 day starts '2015-05-27 19:00:00'
on completion preserve
do 
begin 
call mydb.procedure_TrendNggfToNew();
end $$
delimiter ;	


delimiter //
create procedure mydb.procedure_EventLog()
begin
TRUNCATE table mydb.tmp_event_table;
insert into mydb.tmp_event_table(eid,ename,edesc,etype,e_belong_id,ptid,ptname,belong_pname,e_belong_name) 
select 
el.f_event_log_id as eid,
el.f_event_log_name as ename,
el.f_event_log_desc as edesc,
el.f_event_log_type as etype,
el.f_event_log_belong_id as e_belong_id,
x.f_project_type_id as ptid,
x.f_project_type_name as ptname,
x.f_emcproject_name as belong_pname,
x.f_emcproject_name as e_belong_name 
from mydb.t_event_log el,(
select 
pj.f_emcproject_id as f_emcproject_id, 
pj.f_emcproject_name as f_emcproject_name,
pjt.f_project_type_id as f_project_type_id,
pjt.f_project_type_name as f_project_type_name 
from mydb.t_project_types pjt,mydb.t_emcproject pj 
where pjt.f_project_type_id = pj.f_emcproject_type and pjt.f_project_type_status = 0 and pj.f_emcproject_status = 0) x
where el.f_event_log_belong_id = x.f_emcproject_id and el.f_event_log_type = 1;

insert into mydb.tmp_event_table(eid,ename,edesc,etype,e_belong_id,ptid,ptname,belong_pname,e_belong_name)
select 
el.f_event_log_id as eid,
el.f_event_log_name as ename,
el.f_event_log_desc as edesc,
el.f_event_log_type as etype,
el.f_event_log_belong_id as e_belong_id,
x.f_project_type_id as ptid,
x.f_project_type_name as ptname,
x.f_emcproject_name as belong_pname,
x.f_devicegroup_name as e_belong_name 
from mydb.t_event_log el,(
select 
pj.f_emcproject_id as f_emcproject_id, 
pj.f_emcproject_name as f_emcproject_name,
pjt.f_project_type_id as f_project_type_id,
pjt.f_project_type_name as f_project_type_name,
dg.f_devicegroup_id as f_devicegroup_id, 
dg.f_devicegroup_name as f_devicegroup_name 
from mydb.t_project_types pjt,mydb.t_emcproject pj,mydb.t_devicegroup dg 
where pjt.f_project_type_id = pj.f_emcproject_type and 
pj.f_emcproject_id = dg.f_emcproject_id and 
pjt.f_project_type_status = 0 and pj.f_emcproject_status = 0) x
where el.f_event_log_belong_id = x.f_devicegroup_id and el.f_event_log_type = 2;

insert into mydb.tmp_event_table(eid,ename,edesc,etype,e_belong_id,ptid,ptname,belong_pname,e_belong_name)
select 
el.f_event_log_id as eid,
el.f_event_log_name as ename,
el.f_event_log_desc as edesc,
el.f_event_log_type as etype,
el.f_event_log_belong_id as e_belong_id,
x.f_project_type_id as ptid,
x.f_project_type_name as ptname,
x.f_emcproject_name as belong_pname,
x.f_device_name as e_belong_name 
from mydb.t_event_log el,(
select 
pj.f_emcproject_id as f_emcproject_id, 
pj.f_emcproject_name as f_emcproject_name,
pjt.f_project_type_id as f_project_type_id,
pjt.f_project_type_name as f_project_type_name,
dg.f_devicegroup_id as f_devicegroup_id, 
dg.f_devicegroup_name as f_devicegroup_name,
dev.f_device_id as f_device_id, 
dev.f_device_name as f_device_name 
from mydb.t_project_types pjt,mydb.t_emcproject pj,mydb.t_devicegroup dg,mydb.t_device dev
where 
pjt.f_project_type_id = pj.f_emcproject_type and 
pj.f_emcproject_id = dg.f_emcproject_id and 
dg.f_devicegroup_id = dev.f_devicegroup_id and 
pjt.f_project_type_status = 0 and pj.f_emcproject_status = 0) x 
where el.f_event_log_belong_id = x.f_device_id and el.f_event_log_type = 3;
end
//
delimiter ;