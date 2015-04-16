package com.baosight.fpserver.cm.im.service;

import com.baosight.fpserver.cm.im.domain.TEnergysavingType;
import com.baosight.fpserver.cm.im.domain.TOperationLog;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMEnergysavingType extends ServiceEPBase
{
	public EiInfo queryEnergysavingTypeByProjectId(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TEnergysavingType energysavingType = new TEnergysavingType();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(energysavingType.eiMetadata);
			info.addBlock("result");
			info.getBlock("result").set(EiConstant.limitStr, "-1");
			
			Object f_emcprojectId = info.get("f_emcprojectId");
			info.set("inqu_status-0-f_emcprojectId", f_emcprojectId);
			info.setMethodParam(MethodParamConstants.sqlName, "tEnergysavingType.queryByProjectId");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, energysavingType);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(energysavingType.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertEnergysavingType(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TEnergysavingType energysavingType = new TEnergysavingType();

			energysavingType.setF_emcprojectId(Integer.parseInt(info.get("f_emcprojectId").toString()));
			energysavingType.setF_energysavingTypeName(info.get("f_energysavingTypeName").toString());
			energysavingType.setF_energysavingTypeDesc(info.get("f_energysavingTypeDesc").toString());
			try
			{
				energysavingType.setF_energysavingTypeTargetvalue(Double.parseDouble(info.get("f_energysavingTypeTargetvalue").toString()));
			}
			catch (Exception e){}
			this.dao.insert("tEnergysavingType.insert", energysavingType);
			
			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "增加节能量类型" + energysavingType.getF_energysavingTypeName());
			this.dao.insert("tOperationLog.insert", log);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateEnergysavingType(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TEnergysavingType energysavingType = new TEnergysavingType();
			energysavingType.setF_energysavingTypeId(Integer.parseInt(info.get("f_energysavingTypeId").toString()));
			energysavingType.setF_energysavingTypeName(info.get("f_energysavingTypeName").toString());
			energysavingType.setF_energysavingTypeDesc(info.get("f_energysavingTypeDesc").toString());
			energysavingType.setF_energysavingTypeTargetvalue(Double.parseDouble(info.get("f_energysavingTypeTargetvalue").toString()));
			
			this.dao.update("tEnergysavingType.update", energysavingType);
			
			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "修改节能量类型" + energysavingType.getF_energysavingTypeName());
			this.dao.insert("tOperationLog.insert", log);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo updateFormula(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TEnergysavingType energysavingType = new TEnergysavingType();
			
			energysavingType.setF_energysavingTypeId(Integer.parseInt(info.get("f_energysavingTypeId").toString()));
			energysavingType.setF_energysavingTypeFormula(info.get("f_energysavingTypeFormula").toString());
			this.dao.update("tEnergysavingType.updateFormula", energysavingType);
			
			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "修改节能量计算公式");
			this.dao.insert("tOperationLog.insert", log);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo updateCalcstep(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TEnergysavingType energysavingType = new TEnergysavingType();
			
			energysavingType.setF_energysavingTypeId(Integer.parseInt(info.get("f_energysavingTypeId").toString()));
			energysavingType.setF_energysavingTypeCalcstep(info.get("f_energysavingTypeCalcstep").toString());
			this.dao.update("tEnergysavingType.updateCalcstep", energysavingType);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo deleteEnergysavingType(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TEnergysavingType energysavingType = new TEnergysavingType();
			info.setMethodParam(MethodParamConstants.sqlName, "tEnergysavingType.delete");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, energysavingType);
			info.addBlock("result");
			info.getBlock(EiConstant.resultBlock).setBlockMeta(energysavingType.eiMetadata);
			Object f_energysavingTypeId = info.get("f_energysavingTypeId");
			info.set("result-0-f_energysavingTypeId", f_energysavingTypeId);
			
			outInfo = super.delete(info, true);
			
			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "删除节能量类型");
			this.dao.insert("tOperationLog.insert", log);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}