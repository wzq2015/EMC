package com.baosight.fpserver.cm.im.service;


import java.util.*;

import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMExpenseDetail extends ServiceEPBase
{
	public EiInfo query(EiInfo inInfo) 
	{
		TExpenseDetail detail = new TExpenseDetail();
		EiInfo outInfo =new EiInfo();
		
		try
		{
			inInfo.addBlock("inqu_status");
			inInfo.getBlock("inqu_status").setBlockMeta(detail.eiMetadata);
			inInfo.addBlock("result");
			inInfo.getBlock("result").set(EiConstant.limitStr, "-1");
			outInfo = super.query(inInfo, "tExpenseDetail.query", detail);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}

		return outInfo;
	}	
	
	public EiInfo queryJoin(EiInfo info) 
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TExpenseDetailEx detail = new TExpenseDetailEx();
			Object f_emcprojectId = info.get("f_emcprojectId");
			Map params = new HashMap();
			params.put("f_emcprojectId",f_emcprojectId);
			
			List result = this.dao.query("tExpenseDetail.queryJoin", params);

			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(detail.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo queryExpenseDetailByCondition(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TExpenseDetailEx detail = new TExpenseDetailEx();
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
			String f_expenseTypeId = info.get("f_expenseTypeId").toString();
			if (!f_expenseTypeId.equals("0"))
			{
				params.put("f_expenseTypeId", f_expenseTypeId);
			}
			
			List result = this.dao.query("tExpenseDetail.queryJoin", params);
			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(detail.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo queryExpenseDetailByTypeIdsAndTime(EiInfo info)
	{
		TExpenseDetail detail = new TExpenseDetail();
		EiInfo outInfo = new EiInfo();
		try
		{
			Map params = new HashMap();
			Object expenseTypeIds = info.get("expenseTypeIds");
			if (expenseTypeIds != null)
			{
				params.put("expenseTypeIds",expenseTypeIds);
			}
			Object yearObj = info.get("year");
			String year = yearObj.toString();
			String startTime = "";
			String endTime = "";
			Object queryTypeObj = info.get("queryType");
			int queryType = Integer.parseInt(queryTypeObj.toString());
			if (queryType == 0)
			{
				startTime = year + "-01-01 00:00:00";
				endTime = year + "-12-31 23:59:59";
			}
			else if (queryType == 1)
			{
				Object quarterIndexObj = info.get("indexQuarterOrMonth");
				int quarterIndex = Integer.parseInt(quarterIndexObj.toString());
				if (quarterIndex == 1)
				{
					startTime = year + "-01-01 00:00:00";
					endTime = year + "-03-31 23:59:59";
				}
				else if (quarterIndex == 2)
				{
					startTime = year + "-04-01 00:00:00";
					endTime = year + "-06-30 23:59:59";
				}
				else if (quarterIndex == 3)
				{
					startTime = year + "-07-01 00:00:00";
					endTime = year + "-09-30 23:59:59";
				}
				else if (quarterIndex == 4)
				{
					startTime = year + "-10-01 00:00:00";
					endTime = year + "-12-31 23:59:59";
				}
			}
			else if (queryType == 2)
			{
				Object monthIndexObj = info.get("indexQuarterOrMonth");
				int monthIndex = Integer.parseInt(monthIndexObj.toString());
				String month = String.valueOf(monthIndex);
				if (month.length() == 1)
				{
					month = "0" + month;
				}
				startTime = year + "-" + month + "-01 00:00:00";
				endTime = year + "-" + month + "-31 23:59:59";
			}
			

			if (!startTime.isEmpty())
			{
				params.put("startTime", startTime);
			}
			if (!endTime.isEmpty())
			{
				params.put("endTime", endTime);
			}
			
			List result = this.dao.query("tExpenseDetail.queryExpenseDetailByTypeIdsAndTime", params);
			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(detail.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertDetail(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TExpenseDetail detail = new TExpenseDetail();
			detail.setF_expenseTypeId(Integer.parseInt(info.get("f_expenseTypeId").toString()));
			detail.setF_expenseDetailTime(info.get("f_expenseDetailTime").toString());
			detail.setF_expenseDetailValue(Double.parseDouble(info.get("f_expenseDetailValue").toString()));
			detail.setF_expenseDetailDesc(info.get("f_expenseDetailDesc").toString());

			this.dao.insert("tExpenseDetail.insert", detail);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateDetail(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TExpenseDetail detail = new TExpenseDetail();
			detail.setF_expenseDetailId(Integer.parseInt(info.get("f_expenseDetailId").toString()));
			detail.setF_expenseTypeId(Integer.parseInt(info.get("f_expenseTypeId").toString()));
			detail.setF_expenseDetailTime(info.get("f_expenseDetailTime").toString());
			detail.setF_expenseDetailValue(Double.parseDouble(info.get("f_expenseDetailValue").toString()));	
			detail.setF_expenseDetailDesc(info.get("f_expenseDetailDesc").toString());
			this.dao.update("tExpenseDetail.update", detail);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo deleteDetail(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TExpenseDetail detail = new TExpenseDetail();
			info.setMethodParam(MethodParamConstants.sqlName, "tExpenseDetail.delete");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, detail);
			info.addBlock("result");
			info.getBlock(EiConstant.resultBlock).setBlockMeta(detail.eiMetadata);
			
			Object f_expenseDetailId = info.get("f_expenseDetailId");
			info.set("result-0-f_expenseDetailId", f_expenseDetailId);
			outInfo = super.delete(info, true);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
}