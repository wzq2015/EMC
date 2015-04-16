package com.baosight.fpserver.cm.im.service;

import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMEmcprojectCycle extends ServiceEPBase 
{	
	public EiInfo queryEmcprojectCycleById(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TEmcprojectCycle projectCycle = new TEmcprojectCycle();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(projectCycle.eiMetadata);
			info.addBlock("result");
			info.getBlock("result").set(EiConstant.limitStr, "-1");
			
			Object f_emcprojectId = info.get("f_emcprojectId");
			info.set("inqu_status-0-f_emcprojectId", f_emcprojectId);
			
			info.setMethodParam(MethodParamConstants.sqlName, "tEmcprojectCycle.queryById");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, projectCycle);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(projectCycle.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo queryCycleByProjectIdAndIndex(EiInfo info)
	{
		TEmcprojectCycle projectCycle = new TEmcprojectCycle();
		EiInfo outInfo = new EiInfo();
		
		try
		{
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(projectCycle.eiMetadata);
			
			Object f_emcprojectId = info.get("f_emcprojectId");
			info.set("inqu_status-0-f_emcprojectId", f_emcprojectId);
			Object f_emcprojectCycleCycleindex = info.get("f_emcprojectCycleCycleindex");
			info.set("inqu_status-0-f_emcprojectCycleCycleindex", f_emcprojectCycleCycleindex);
			
			info.setMethodParam(MethodParamConstants.sqlName, "tEmcprojectCycle.queryByProjectIdAndIndex");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, projectCycle);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(projectCycle.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo insertEmcprojectCycle(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TEmcprojectCycle projectCycle = new TEmcprojectCycle();
			info.addBlock("result");
			info.getBlock("result").setBlockMeta(projectCycle.eiMetadata);
			
			Object f_emcprojectId = info.get("f_emcprojectId");
			info.set("result-0-f_emcprojectId", f_emcprojectId);
			Object f_emcprojectCycleYear = info.get("f_emcprojectCycleYear");
			info.set("result-0-f_emcprojectCycleYear", f_emcprojectCycleYear);
			Object f_emcprojectCycleIndex = info.get("f_emcprojectCycleIndex");
			info.set("result-0-f_emcprojectCycleIndex", f_emcprojectCycleIndex);
			Object f_emcprojectCycleStarttime = info.get("f_emcprojectCycleStarttime");
			info.set("result-0-f_emcprojectCycleStarttime", f_emcprojectCycleStarttime);
			Object f_emcprojectCycleEndtime = info.get("f_emcprojectCycleEndtime");
			info.set("result-0-f_emcprojectCycleEndtime", f_emcprojectCycleEndtime);
			
			outInfo = super.insert(info, "tEmcprojectCycle.insert");
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo deleteEmcprojectCycle(EiInfo info)
	{
		TEmcprojectCycle projectCycle = new TEmcprojectCycle();
		info.setMethodParam(MethodParamConstants.sqlName, "tEmcprojectCycle.delete");
		info.setMethodParam(MethodParamConstants.daoEPBaseBean, projectCycle);
		info.addBlock("result");
		info.getBlock(EiConstant.resultBlock).setBlockMeta(projectCycle.eiMetadata);
		
		Object f_emcprojectCycleId = info.get("f_emcprojectCycleId");
		info.set("result-0-f_emcprojectCycleId", f_emcprojectCycleId);
		
		EiInfo outInfo = new EiInfo();
		try
		{
			outInfo = super.delete(info, true);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateEmcprojectCycle(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TEmcprojectCycle projectCycle = new TEmcprojectCycle();
			
			projectCycle.setF_emcprojectCycleId(Integer.parseInt(info.get("f_emcprojectCycleId").toString()));
			projectCycle.setF_emcprojectCycleStarttime(info.get("f_emcprojectCycleStarttime").toString());
			projectCycle.setF_emcprojectCycleEndtime(info.get("f_emcprojectCycleEndtime").toString());
			
			this.dao.update("tEmcprojectCycle.update", projectCycle);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}