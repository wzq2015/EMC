package com.baosight.fpserver.cm.im.service;

import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMDeviceparaEntry extends ServiceEPBase 
{
	public EiInfo queryDeviceparaEntryByCycleId(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TDeviceparaEntry deviceparaEntry = new TDeviceparaEntry();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(deviceparaEntry.eiMetadata);
			
			Object f_emcprojectCycleId = info.get("f_emcprojectCycleId");
			info.set("inqu_status-0-f_emcprojectCycleId", f_emcprojectCycleId);
			
			info.setMethodParam(MethodParamConstants.sqlName, "tDeviceparaEntry.queryDeviceparaEntryByCycleId");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, deviceparaEntry);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(deviceparaEntry.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo insertDeviceparaEntry(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TDeviceparaEntry deviceparaEntry = new TDeviceparaEntry();
			
			deviceparaEntry.setF_emcprojectCycleId(Integer.parseInt(info.get("f_emcprojectCycleId").toString()));
			deviceparaEntry.setF_deviceparaName(info.get("f_deviceparaName").toString());
			deviceparaEntry.setF_deviceparaEntryValue(info.get("f_deviceparaEntryValue").toString());
			deviceparaEntry.setF_deviceparaEntryDatetime(info.get("f_deviceparaEntryDatetime").toString());
			
			this.dao.insert("tDeviceparaEntry.insert", deviceparaEntry);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo updateDeviceparaEntry(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TDeviceparaEntry deviceparaEntry = new TDeviceparaEntry();
			
			deviceparaEntry.setF_deviceparaEntryId(Integer.parseInt(info.get("f_deviceparaEntryId").toString()));
			deviceparaEntry.setF_emcprojectCycleId(Integer.parseInt(info.get("f_emcprojectCycleId").toString()));
			deviceparaEntry.setF_deviceparaName(info.get("f_deviceparaName").toString());
			deviceparaEntry.setF_deviceparaEntryValue(info.get("f_deviceparaEntryValue").toString());
			deviceparaEntry.setF_deviceparaEntryDatetime(info.get("f_deviceparaEntryDatetime").toString());
			
			this.dao.update("tDeviceparaEntry.update", deviceparaEntry);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}