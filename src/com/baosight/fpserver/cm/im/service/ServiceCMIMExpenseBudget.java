package com.baosight.fpserver.cm.im.service;

import java.util.*;
import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMExpenseBudget extends ServiceEPBase
{
	public EiInfo query(EiInfo inInfo) 
	{
		TExpenseBudget budget = new TExpenseBudget();
		EiInfo outInfo = new EiInfo();
		
		try
		{
			inInfo.addBlock("inqu_status");
			inInfo.getBlock("inqu_status").setBlockMeta(budget.eiMetadata);
			inInfo.addBlock("result");
			inInfo.getBlock("result").set(EiConstant.limitStr, "-1");
			outInfo = super.query(inInfo, "tExpenseBudget.query", budget);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}	
	
	public EiInfo queryJoin(EiInfo info) 
	{
		TExpenseBudgetEx budget = new TExpenseBudgetEx();
		EiInfo outInfo = new EiInfo();
		
		try
		{
			Object f_emcprojectId = info.get("f_emcprojectId");
			Map params = new HashMap();
			params.put("f_emcprojectId",f_emcprojectId);
			
			List result =this.dao.query("tExpenseBudget.queryJoin", params);
			
			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(budget.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo queryExpenseBudgetByCondition(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TExpenseBudgetEx budget = new TExpenseBudgetEx();
			Map params = new HashMap();
			params.put("f_emcprojectId", info.get("f_emcprojectId").toString());
			String f_expenseTypeId = info.get("f_expenseTypeId").toString();
			if (!f_expenseTypeId.equals("0"))
			{
				params.put("f_expenseTypeId", f_expenseTypeId);
			}
			String f_expenseBudgetYear = info.get("f_expenseBudgetYear").toString();
			if (!f_expenseBudgetYear.equals("0"))
			{
				params.put("f_expenseBudgetYear", f_expenseBudgetYear);
			}
			
			Object f_expenseBudgetIndex = info.get("f_expenseBudgetIndex");
			if (f_expenseBudgetIndex != null)
			{
				if (!f_expenseBudgetIndex.toString().equals("0"))
				{
					params.put("f_expenseBudgetIndex", f_expenseBudgetIndex);
				}
			}
			
			List result = this.dao.query("tExpenseBudget.queryJoin", params);
			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(budget.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo queryExpenseBudgetByTypeIdsAndIndexes(EiInfo info)
	{
		TExpenseBudget budget = new TExpenseBudget();
		EiInfo outInfo = new EiInfo();
		try
		{
			Map params = new HashMap();
			params.put("f_expenseBudgetYear", info.get("year").toString());
			Object expenseTypeIds = info.get("expenseTypeIds");
			if (expenseTypeIds != null)
			{
				params.put("expenseTypeIds",expenseTypeIds);
			}
			
			Object queryTypeObj = info.get("queryType");
			int queryType = Integer.parseInt(queryTypeObj.toString());
			if (queryType == 1)
			{
				Object quarterIndexObj = info.get("indexQuarterOrMonth");
				String monthIndexes = "";
				if (quarterIndexObj != null)
				{
					int quarterIndex = Integer.parseInt(quarterIndexObj.toString());
					if (quarterIndex == 1)
					{
						monthIndexes = "1,2,3";
					}
					else if (quarterIndex == 2)
					{
						monthIndexes = "4,5,6";
					}
					else if (quarterIndex == 3)
					{
						monthIndexes = "7,8,9";
					}
					else if (quarterIndex == 4)
					{
						monthIndexes = "10,11,12";
					}
					params.put("f_expenseBudgetIndexes", monthIndexes);
				}
			}
			else if (queryType == 2)
			{
				Object monthIndexObj = info.get("indexQuarterOrMonth");
				if (monthIndexObj != null)
				{
					params.put("f_expenseBudgetIndexes", monthIndexObj);
				}
			}
			
			List result = this.dao.query("tExpenseBudget.queryExpenseBudgetByTypeIdsAndIndexes", params);

			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(budget.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertBudget(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
	
		try
		{
			TExpenseBudget budget = new TExpenseBudget();
			budget.setF_expenseTypeId(Integer.parseInt(info.get("f_expenseTypeId").toString()));
			budget.setF_expenseBudgetYear(info.get("f_expenseBudgetYear").toString());
			budget.setF_expenseBudgetIndex(Integer.parseInt(info.get("f_expenseBudgetIndex").toString()));
			budget.setF_expenseBudgetPlannedvalue(Double.parseDouble(info.get("f_expenseBudgetPlannedvalue").toString()));
			this.dao.insert("tExpenseBudget.insert", budget);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateBudget(EiInfo info)
	{
		
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TExpenseBudget budget = new TExpenseBudget();
			budget.setF_expenseBudgetId(Integer.parseInt(info.get("f_expenseBudgetId").toString()));
			budget.setF_expenseTypeId(Integer.parseInt(info.get("f_expenseTypeId").toString()));
			budget.setF_expenseBudgetYear(info.get("f_expenseBudgetYear").toString());
			budget.setF_expenseBudgetIndex(Integer.parseInt(info.get("f_expenseBudgetIndex").toString()));
			budget.setF_expenseBudgetPlannedvalue(Double.parseDouble(info.get("f_expenseBudgetPlannedvalue").toString()));
			this.dao.update("tExpenseBudget.update", budget);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
			
		return outInfo;
	}
	
	public EiInfo deleteBudget(EiInfo info)
	{
		TExpenseBudget budget = new TExpenseBudget();
		EiInfo outInfo = new EiInfo();
		
		try
		{
			info.setMethodParam(MethodParamConstants.sqlName, "tExpenseBudget.delete");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, budget);
			info.addBlock("result");
			info.getBlock(EiConstant.resultBlock).setBlockMeta(budget.eiMetadata);
			Object f_expenseBudgetId = info.get("f_expenseBudgetId");
			info.set("result-0-f_expenseBudgetId", f_expenseBudgetId);
			outInfo = super.delete(info, true);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}