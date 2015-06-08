package com.baosight.fpserver.cm.im.service;

import com.baosight.fpserver.cm.im.domain.TmpEventTable;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMProjectEventManagement extends ServiceEPBase {
	public EiInfo queryProjectEvents(EiInfo info){	 
		EiInfo outInfo = new EiInfo();
		try{
			Object o = info.get("projectType");
			if(o != null){
				int projectType = Integer.parseInt(o.toString());
				dao.query("tmpEventTable.callEventLogProcedure", new Object());
				TmpEventTable tmpEventTable = new TmpEventTable();
				info.addBlock("inqu_status");
				info.getBlock("inqu_status").setBlockMeta(tmpEventTable.eiMetadata);
				info.set("inqu_status-0-projectType", projectType);
				info.setMethodParam(MethodParamConstants.sqlName, "tmpEventTable.query");
				info.setMethodParam(MethodParamConstants.daoEPBaseBean, tmpEventTable);
				outInfo = super.query(info, true);
				outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(tmpEventTable.eiMetadata);
			}else{
				//执行存储过程
				dao.query("tmpEventTable.callEventLogProcedure", new Object());
				
				TmpEventTable tmpEventTable = new TmpEventTable();
				info.addBlock("inqu_status");
				info.getBlock("inqu_status").setBlockMeta(tmpEventTable.eiMetadata);
				info.setMethodParam(MethodParamConstants.sqlName, "tmpEventTable.query");
				info.setMethodParam(MethodParamConstants.daoEPBaseBean, tmpEventTable);
				outInfo = super.query(info, true);
				outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(tmpEventTable.eiMetadata);
			}
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}
