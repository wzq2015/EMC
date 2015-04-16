package com.baosight.fpserver.cm.im.service;

import com.baosight.fpserver.cm.im.domain.TExpenseType;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMExpenseType extends ServiceEPBase
{
	public EiInfo queryExpenseTypeByProjectId(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TExpenseType expenseType = new TExpenseType();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(expenseType.eiMetadata);
			info.addBlock("result");
			info.getBlock("result").set(EiConstant.limitStr, "-1");
			
			Object f_emcprojectId = info.get("f_emcprojectId");
			info.set("inqu_status-0-f_emcprojectId", f_emcprojectId);
			
			info.setMethodParam(MethodParamConstants.sqlName, "tExpenseType.queryByProjectId");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, expenseType);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(expenseType.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertExpenseType(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TExpenseType expenseType = new TExpenseType();
			expenseType.setF_emcprojectId(Integer.parseInt(info.get("f_emcprojectId").toString()));
			expenseType.setF_expenseTypeName(info.get("f_expenseTypeName").toString());
			expenseType.setF_expenseTypeDesc(info.get("f_expenseTypeDesc").toString());
			
			this.dao.insert("tExpenseType.insert", expenseType);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}

		return outInfo;
	}
	
	public EiInfo updateExpenseType(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TExpenseType expenseType = new TExpenseType();
			expenseType.setF_expenseTypeId(Integer.parseInt(info.get("f_expenseTypeId").toString()));
			expenseType.setF_expenseTypeName(info.get("f_expenseTypeName").toString());
			expenseType.setF_expenseTypeDesc(info.get("f_expenseTypeDesc").toString());
			
			this.dao.update("tExpenseType.update", expenseType);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
	
		return outInfo;
	}
	
	public EiInfo deleteExpenseType(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TExpenseType expenseType = new TExpenseType();
			info.setMethodParam(MethodParamConstants.sqlName, "tExpenseType.delete");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, expenseType);
			info.addBlock("result");
			info.getBlock(EiConstant.resultBlock).setBlockMeta(expenseType.eiMetadata);
			Object f_expenseTypeId = info.get("f_expenseTypeId");
			info.set("result-0-f_expenseTypeId", f_expenseTypeId);
			outInfo = super.delete(info, true);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}