package com.baosight.iplat4j.ee.domain;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.ep.DaoEPBase;
  
public class TOPA006 extends DaoEPBase {
  public String rec_creator       = " ";
  public String rec_create_time   = " ";
  public String rec_revisor       = " ";
  public String rec_revise_time   = " ";
  public String archive_flag      = " ";
  public String archive_time      = " ";
  public long version_no        = 0;
  public String works_no          = " ";
  public String route_prod_no     = " ";
  public int works_op_no       = 0;
  public long prod_pri          = 0;
  public String prod_no           = " ";
  public String resource_no       = " ";
  public String works_op_status   = " ";
  public int fixed_set_time_dd = 0;
  public int fixed_set_time_hh = 0;
  public int fixed_set_time_mm = 0;
  public int proc_time_dd      = 0;
  public int proc_time_hh      = 0;
  public int proc_time_mm      = 0;
  public long std_time          = 0;
  public String std_time_flag     = " ";
  public int fixed_std_time_dd = 0;
  public int fixed_std_time_hh = 0;
  public int fixed_std_time_mm = 0;
  public String critical_op_flag  = " ";
  public String act_finish_time   = " ";
  public String act_resource_no   = " ";
  public int op_yield          = 0;
  public int qlt_yield         = 0;
  public long trans_cost        = 0;
  public long proc_cost         = 0;
  public double planned_start_wt  = 0;
  public double planned_finish_wt = 0;
  public int vir_proc_time_dd  = 0;
  public int vir_proc_time_hh  = 0;
  public int vir_proc_time_mm  = 0;
 
  public void initMetaData() {
	    EiColumn eiColumn;
	    eiColumn = new EiColumn("archive_time");
	    eiColumn.setDescName("归档时间");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("version_no");
	    eiColumn.setDescName("版本号");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("works_no");
	    eiColumn.setDescName("工单号");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("route_prod_no");
	    eiColumn.setDescName("路径产品号");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("works_op_no");
	    eiColumn.setDescName("工单工序号");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("prod_pri");
	    eiColumn.setDescName("产品优先级");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("prod_no");
	    eiColumn.setDescName("产品号");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("resource_no");
	    eiColumn.setDescName("资源号");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("works_op_status");
	    eiColumn.setDescName("工序状态");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("fixed_set_time_dd");
	    eiColumn.setDescName("固定准备时间（天）");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("fixed_set_time_hh");
	    eiColumn.setDescName("固定准备时间（时）");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("fixed_set_time_mm");
	    eiColumn.setDescName("固定准备时间（分）");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("proc_time_dd");
	    eiColumn.setDescName("加工时间（天）");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("proc_time_hh");
	    eiColumn.setDescName("加工时间（时）");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("proc_time_mm");
	    eiColumn.setDescName("加工时间（分）");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("std_time");
	    eiColumn.setDescName("标准时间");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("std_time_flag");
	    eiColumn.setDescName("标准时间标记");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("fixed_std_time_dd");
	    eiColumn.setDescName("固定标准时间（天）");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("fixed_std_time_hh");
	    eiColumn.setDescName("固定标准时间（时）");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("fixed_std_time_mm");
	    eiColumn.setDescName("固定标准时间（分）");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("critical_op_flag");
	    eiColumn.setDescName("关键工序标记");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("act_finish_time");
	    eiColumn.setDescName("实际完成时刻");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("act_resource_no");
	    eiColumn.setDescName("实际资源号");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("op_yield");
	    eiColumn.setDescName("工序收得率");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("qlt_yield");
	    eiColumn.setDescName("质量收得率");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("trans_cost");
	    eiColumn.setDescName("运输成本");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("proc_cost");
	    eiColumn.setDescName("加工成本");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("planned_start_wt");
	    eiColumn.setDescName("计划开始重量");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("planned_finish_wt");
	    eiColumn.setDescName("计划完成重量");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("vir_proc_time_dd");
	    eiColumn.setDescName("虚拟加工时间（天）");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("vir_proc_time_hh");
	    eiColumn.setDescName("虚拟加工时间（时）");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("vir_proc_time_mm");
	    eiColumn.setDescName("虚拟加工时间（分）");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("rec_creator");
	    eiColumn.setDescName("记录创建责任者");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("rec_create_time");
	    eiColumn.setDescName("记录创建时刻");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("rec_revisor");
	    eiColumn.setDescName("记录修改责任者");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("rec_revise_time");
	    eiColumn.setDescName("记录修改时刻");
	    eiMetadata.addMeta(eiColumn);
	  
	    eiColumn = new EiColumn("archive_flag");
	    eiColumn.setDescName("归档标记");
	    eiMetadata.addMeta(eiColumn);

    //eiMetadata.getMeta("version_no").setPrimaryKey(true);
    eiMetadata.getMeta("route_prod_no").setPrimaryKey(true);
    //eiMetadata.getMeta("works_no").setPrimaryKey(true);
    //eiMetadata.getMeta("works_op_no").setPrimaryKey(true);
  
  }
  public TOPA006() {
    initMetaData();
  }
  public String getRec_creator() { 
    return rec_creator;
  }
  public String getRec_create_time() { 
    return rec_create_time;
  }
  public String getRec_revisor() { 
    return rec_revisor;
  }
  public String getRec_revise_time() { 
    return rec_revise_time;
  }
  public String getArchive_flag() { 
    return archive_flag;
  }
  public String getArchive_time() { 
    return archive_time;
  }
  public long getVersion_no() { 
    return version_no;
  }
  public String getWorks_no() { 
    return works_no;
  }
  public String getRoute_prod_no() { 
    return route_prod_no;
  }
  public int getWorks_op_no() { 
    return works_op_no;
  }
  public long getProd_pri() { 
    return prod_pri;
  }
  public String getProd_no() { 
    return prod_no;
  }
  public String getResource_no() { 
    return resource_no;
  }
  public String getWorks_op_status() { 
    return works_op_status;
  }
  public int getFixed_set_time_dd() { 
    return fixed_set_time_dd;
  }
  public int getFixed_set_time_hh() { 
    return fixed_set_time_hh;
  }
  public int getFixed_set_time_mm() { 
    return fixed_set_time_mm;
  }
  public int getProc_time_dd() { 
    return proc_time_dd;
  }
  public int getProc_time_hh() { 
    return proc_time_hh;
  }
  public int getProc_time_mm() { 
    return proc_time_mm;
  }
  public long getStd_time() { 
    return std_time;
  }
  public String getStd_time_flag() { 
    return std_time_flag;
  }
  public int getFixed_std_time_dd() { 
    return fixed_std_time_dd;
  }
  public int getFixed_std_time_hh() { 
    return fixed_std_time_hh;
  }
  public int getFixed_std_time_mm() { 
    return fixed_std_time_mm;
  }
  public String getCritical_op_flag() { 
    return critical_op_flag;
  }
  public String getAct_finish_time() { 
    return act_finish_time;
  }
  public String getAct_resource_no() { 
    return act_resource_no;
  }
  public int getOp_yield() { 
    return op_yield;
  }
  public int getQlt_yield() { 
    return qlt_yield;
  }
  public long getTrans_cost() { 
    return trans_cost;
  }
  public long getProc_cost() { 
    return proc_cost;
  }
  public double getPlanned_start_wt() { 
    return planned_start_wt;
  }
  public double getPlanned_finish_wt() { 
    return planned_finish_wt;
  }
  public int getVir_proc_time_dd() { 
    return vir_proc_time_dd;
  }
  public int getVir_proc_time_hh() { 
    return vir_proc_time_hh;
  }
  public int getVir_proc_time_mm() { 
    return vir_proc_time_mm;
  }

  public void setRec_creator(String rec_creator ) { 
    this. rec_creator = rec_creator;
  }
  public void setRec_create_time(String rec_create_time ) { 
    this. rec_create_time = rec_create_time;
  }
  public void setRec_revisor(String rec_revisor ) { 
    this. rec_revisor = rec_revisor;
  }
  public void setRec_revise_time(String rec_revise_time ) { 
    this. rec_revise_time = rec_revise_time;
  }
  public void setArchive_flag(String archive_flag ) { 
    this. archive_flag = archive_flag;
  }
  public void setArchive_time(String archive_time ) { 
    this. archive_time = archive_time;
  }
  public void setVersion_no(long version_no ) { 
    this. version_no = version_no;
  }
  public void setWorks_no(String works_no ) { 
    this. works_no = works_no;
  }
  public void setRoute_prod_no(String route_prod_no ) { 
    this. route_prod_no = route_prod_no;
  }
  public void setWorks_op_no(int works_op_no ) { 
    this. works_op_no = works_op_no;
  }
  public void setProd_pri(long prod_pri ) { 
    this. prod_pri = prod_pri;
  }
  public void setProd_no(String prod_no ) { 
    this. prod_no = prod_no;
  }
  public void setResource_no(String resource_no ) { 
    this. resource_no = resource_no;
  }
  public void setWorks_op_status(String works_op_status ) { 
    this. works_op_status = works_op_status;
  }
  public void setFixed_set_time_dd(int fixed_set_time_dd ) { 
    this. fixed_set_time_dd = fixed_set_time_dd;
  }
  public void setFixed_set_time_hh(int fixed_set_time_hh ) { 
    this. fixed_set_time_hh = fixed_set_time_hh;
  }
  public void setFixed_set_time_mm(int fixed_set_time_mm ) { 
    this. fixed_set_time_mm = fixed_set_time_mm;
  }
  public void setProc_time_dd(int proc_time_dd ) { 
    this. proc_time_dd = proc_time_dd;
  }
  public void setProc_time_hh(int proc_time_hh ) { 
    this. proc_time_hh = proc_time_hh;
  }
  public void setProc_time_mm(int proc_time_mm ) { 
    this. proc_time_mm = proc_time_mm;
  }
  public void setStd_time(long std_time ) { 
    this. std_time = std_time;
  }
  public void setStd_time_flag(String std_time_flag ) { 
    this. std_time_flag = std_time_flag;
  }
  public void setFixed_std_time_dd(int fixed_std_time_dd ) { 
    this. fixed_std_time_dd = fixed_std_time_dd;
  }
  public void setFixed_std_time_hh(int fixed_std_time_hh ) { 
    this. fixed_std_time_hh = fixed_std_time_hh;
  }
  public void setFixed_std_time_mm(int fixed_std_time_mm ) { 
    this. fixed_std_time_mm = fixed_std_time_mm;
  }
  public void setCritical_op_flag(String critical_op_flag ) { 
    this. critical_op_flag = critical_op_flag;
  }
  public void setAct_finish_time(String act_finish_time ) { 
    this. act_finish_time = act_finish_time;
  }
  public void setAct_resource_no(String act_resource_no ) { 
    this. act_resource_no = act_resource_no;
  }
  public void setOp_yield(int op_yield ) { 
    this. op_yield = op_yield;
  }
  public void setQlt_yield(int qlt_yield ) { 
    this. qlt_yield = qlt_yield;
  }
  public void setTrans_cost(long trans_cost ) { 
    this. trans_cost = trans_cost;
  }
  public void setProc_cost(long proc_cost ) { 
    this. proc_cost = proc_cost;
  }
  public void setPlanned_start_wt(double planned_start_wt ) { 
    this. planned_start_wt = planned_start_wt;
  }
  public void setPlanned_finish_wt(double planned_finish_wt ) { 
    this. planned_finish_wt = planned_finish_wt;
  }
  public void setVir_proc_time_dd(int vir_proc_time_dd ) { 
    this. vir_proc_time_dd = vir_proc_time_dd;
  }
  public void setVir_proc_time_hh(int vir_proc_time_hh ) { 
    this. vir_proc_time_hh = vir_proc_time_hh;
  }
  public void setVir_proc_time_mm(int vir_proc_time_mm ) { 
    this. vir_proc_time_mm = vir_proc_time_mm;
  }

}
