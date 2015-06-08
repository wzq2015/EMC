package com.baosight.fpserver.cm.im.service;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.baosight.fpserver.cm.im.domain.TEventLog;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMEventLogManagement extends ServiceEPBase {
	public EiInfo queryEventLogs(EiInfo info){	 
		EiInfo outInfo = new EiInfo();
		try{
			TEventLog tEventLog = new TEventLog();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(tEventLog.eiMetadata);
			info.set("inqu_status-0-f_eventLogBelongId", info.get("f_eventLogBelongId"));
			info.set("inqu_status-0-f_eventLogType", info.get("f_eventLogType"));
			info.setMethodParam(MethodParamConstants.sqlName, "tEventLog.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, tEventLog);
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(tEventLog.eiMetadata);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertEventLog(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			SimpleDateFormat time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			TEventLog tEventLog = new TEventLog();
			tEventLog.setF_eventLogName(info.get("f_eventLogName").toString());
			tEventLog.setF_eventLogDesc(info.get("f_eventLogDesc").toString());
			tEventLog.setF_eventLogDate(time.format(new Date()));
			Object o = info.get("f_eventLogRemindSwitch");
			Object o1 = info.get("f_eventLogRemindDate");
			if(o == null || o.equals("")){
				tEventLog.setF_eventLogRemindSwitch(-1);
			}else{
				tEventLog.setF_eventLogRemindSwitch(Integer.parseInt(o.toString()));
			}
			if(o1 == null || o1.equals("")){
				tEventLog.setF_eventLogRemindDate("");
			}else{
				tEventLog.setF_eventLogRemindDate(o1.toString());
			}
			tEventLog.setF_eventLogType(Integer.parseInt(info.get("f_eventLogType").toString()));
			tEventLog.setF_eventLogBelongId(Integer.parseInt(info.get("f_eventLogBelongId").toString()));
			this.dao.insert("tEventLog.insert", tEventLog);
//			
//			info.addBlock("inqu_status");
//			info.getBlock("inqu_status").setBlockMeta(tEventLog.eiMetadata);
//			info.set("inqu_status-0-f_eventLogBelongId", tEventLog.getF_eventLogBelongId());
//			info.set("inqu_status-0-f_eventLogType", tEventLog.getF_eventLogType());
//			info.setMethodParam(MethodParamConstants.sqlName, "tEventLog.query");
//			info.setMethodParam(MethodParamConstants.daoEPBaseBean, tEventLog);
//			outInfo = super.query(info, true);
//			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(tEventLog.eiMetadata);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateEventLog(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			SimpleDateFormat time = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			TEventLog tEventLog = new TEventLog();
			tEventLog.setF_eventLogId(Integer.parseInt(info.get("f_eventLogId").toString()));
			tEventLog.setF_eventLogName(info.get("f_eventLogName").toString());
			tEventLog.setF_eventLogDesc(info.get("f_eventLogDesc").toString());
			tEventLog.setF_eventLogDate(time.format(new Date()));
			Object o = info.get("f_eventLogRemindSwitch");
			Object o1 = info.get("f_eventLogRemindDate");
			if(o == null || o.equals("")){
				tEventLog.setF_eventLogRemindSwitch(-1);
			}else{
				tEventLog.setF_eventLogRemindSwitch(Integer.parseInt(o.toString()));
			}
			if(o1 == null || o1.equals("")){
				tEventLog.setF_eventLogRemindDate("");
			}else{
				tEventLog.setF_eventLogRemindDate(o1.toString());
			}
			tEventLog.setF_eventLogType(Integer.parseInt(info.get("f_eventLogType").toString()));
			tEventLog.setF_eventLogBelongId(Integer.parseInt(info.get("f_eventLogBelongId").toString()));
			this.dao.update("tEventLog.update", tEventLog);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo deleteEventLog(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TEventLog tEventLog = new TEventLog();
			info.setMethodParam(MethodParamConstants.sqlName, "tEventLog.delete");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, tEventLog);
			info.addBlock("result");
			info.getBlock(EiConstant.resultBlock).setBlockMeta(tEventLog.eiMetadata);
			
			Object f_eventLogId = info.get("f_eventLogId");
			info.set("result-0-f_eventLogId", f_eventLogId);
			outInfo = super.delete(info, true);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
}
