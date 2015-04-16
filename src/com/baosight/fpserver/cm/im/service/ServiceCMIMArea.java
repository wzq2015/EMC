package com.baosight.fpserver.cm.im.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMArea extends ServiceEPBase
{	
	public EiInfo queryAreas(EiInfo info)
	{	 
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TArea area = new TArea();
			info.setMethodParam(MethodParamConstants.sqlName, "tArea.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, area);
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(area.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo queryAreaById(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TArea area = new TArea();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(area.eiMetadata);
			Object f_areaId = info.get("f_areaId");
			info.set("inqu_status-0-f_areaId", f_areaId);
			
			info.setMethodParam(MethodParamConstants.sqlName, "tArea.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, area);
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(area.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertArea(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TArea area = new TArea();
			area.setF_areaName(info.get("f_areaName").toString());
			area.setF_areaDesc(info.get("f_areaDesc").toString());
			this.dao.insert("tArea.insert", area);
			
			Map params = new HashMap();
			params.put("f_areaName", info.get("f_areaName").toString());
			List resultList = this.dao.query("tArea.query", params);
			
			if (resultList == null) {
				outInfo.set("errorcode", "-1");
				return outInfo;
			}
			
			TArea newArea = (TArea)(resultList.get(0));
			outInfo.set("addType", "area");
			outInfo.set("newId", newArea.getF_areaId());
			outInfo.set("name", newArea.getF_areaName());
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateArea(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TArea area = new TArea();
			area.setF_areaId(Integer.parseInt(info.get("f_areaId").toString()));
			area.setF_areaName(info.get("f_areaName").toString());
			area.setF_areaDesc(info.get("f_areaDesc").toString());
			this.dao.update("tArea.update", area);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo deleteArea(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TArea area = new TArea();
			area.setF_areaId(Integer.parseInt(info.get("f_areaId").toString()));
			this.dao.delete("tArea.delete", area);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}