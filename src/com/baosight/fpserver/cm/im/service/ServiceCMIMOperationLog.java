package com.baosight.fpserver.cm.im.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.baosight.fpserver.cm.im.domain.TOperationLog;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceCMIMOperationLog extends ServiceEPBase
{	
	public EiInfo queryOperationLogByProjectIdAndPage(EiInfo info) 
	{
		TOperationLog operationlog = new TOperationLog();
		EiInfo outInfo = new EiInfo();
		try
		{
			int pageSize = Integer.parseInt(info.get("pageSize").toString());
			int pageNumber = Integer.parseInt(info.getString("pageNumber").toString());
			String startTime = info.get("startTime").toString();
			String endTime = info.get("endTime").toString();
			Map params = new HashMap();
			params.put("f_emcprojectId", info.get("f_emcprojectId").toString());
			if (!startTime.isEmpty())
			{
				params.put("startTime", startTime);
			}
			if (!endTime.isEmpty())
			{
				params.put("endTime", endTime);
			}
			
			List result = this.dao.query("tOperationLog.queryByProjectId", params, pageSize*(pageNumber-1), pageSize);
			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(operationlog.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}

	public EiInfo countByProjectId(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{		
			Map params = new HashMap();
			params.put("f_emcprojectId", info.get("f_emcprojectId").toString());
			String startTime = info.get("startTime").toString();
			String endTime = info.get("endTime").toString();
			if (!startTime.isEmpty())
			{
				params.put("startTime", startTime);
			}
			if (!endTime.isEmpty())
			{
				params.put("endTime", endTime);
			}
			
			List result = this.dao.query("tOperationLog.countbyProjectId", params);
			outInfo.set("logCount", result.get(0));
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
}