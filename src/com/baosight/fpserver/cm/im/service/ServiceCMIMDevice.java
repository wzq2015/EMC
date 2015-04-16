package com.baosight.fpserver.cm.im.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMDevice extends ServiceEPBase 
{	
	public EiInfo queryDeviceById(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TDevice device = new TDevice();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(device.eiMetadata);
			
			Object f_deviceId = info.get("f_deviceId");
			info.set("inqu_status-0-f_deviceId", f_deviceId);
			
			info.setMethodParam(MethodParamConstants.sqlName, "tDevice.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, device);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(device.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo queryDevicesByProjectId(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TDevice device = new TDevice();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(device.eiMetadata);
			
			Object f_emcprojectId = info.get("f_emcprojectId");
			info.set("inqu_status-0-f_emcprojectId", f_emcprojectId);
			
			info.setMethodParam(MethodParamConstants.sqlName, "tDevice.queryByProjectId");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, device);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(device.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo insertDevice(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TDevice device = new TDevice();
			
			device.setF_devicegroupId(Integer.parseInt(info.get("f_devicegroupId").toString()));
			device.setF_deviceName(info.get("f_deviceName").toString());
			device.setF_deviceDesc(info.get("f_deviceDesc").toString());
			device.setF_devicePosition(info.get("f_devicePosition").toString());
			device.setF_deviceManufacture(info.get("f_deviceManufacture").toString());
			device.setF_deviceTypenumber(info.get("f_deviceTypenumber").toString());
			device.setF_deviceSerialnumber(info.get("f_deviceSerialnumber").toString());
			device.setF_devicePurchasedate(info.get("f_devicePurchasedate").toString());
			device.setF_deviceInstalldate(info.get("f_deviceInstalldate").toString());
			device.setF_deviceWarrantydate(info.get("f_deviceWarrantydate").toString());
			device.setF_deviceLastinspectdate(info.get("f_deviceLastinspectdate").toString());
			try
			{
				device.setF_deviceInspectcycle(Integer.parseInt(info.get("f_deviceInspectcycle").toString()));
			}
			catch(Exception e) { }
			
			this.dao.insert("tDevice.insert", device);
			
			Map params = new HashMap();
			params.put("f_devicegroupId", Integer.parseInt(info.get("f_devicegroupId").toString()));
			params.put("f_deviceName", info.get("f_deviceName").toString());
			List resultList = this.dao.query("tDevice.query", params);
			
			if (resultList == null) {
				outInfo.set("errorcode", "-1");
				return outInfo;
			}
			TDevice newDevice = (TDevice)(resultList.get(0));
			outInfo.set("addType", "device");
			outInfo.set("newId", newDevice.getF_deviceId());
			outInfo.set("name", newDevice.getF_deviceName());
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateDevice(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
			
		try
		{
			TDevice device = new TDevice();
			device.setF_deviceId(Integer.parseInt(info.get("f_deviceId").toString()));
			device.setF_deviceName(info.get("f_deviceName").toString());
			device.setF_deviceDesc(info.get("f_deviceDesc").toString());
			device.setF_devicePosition(info.get("f_devicePosition").toString());
			device.setF_deviceManufacture(info.get("f_deviceManufacture").toString());
			device.setF_deviceTypenumber(info.get("f_deviceTypenumber").toString());
			device.setF_deviceSerialnumber(info.get("f_deviceSerialnumber").toString());
			device.setF_devicePurchasedate(info.get("f_devicePurchasedate").toString());
			device.setF_deviceInstalldate(info.get("f_deviceInstalldate").toString());
			device.setF_deviceWarrantydate(info.get("f_deviceWarrantydate").toString());
			device.setF_deviceLastinspectdate(info.get("f_deviceLastinspectdate").toString());
			try
			{
				device.setF_deviceInspectcycle(Integer.parseInt(info.get("f_deviceInspectcycle").toString()));
			}
			catch(Exception e) { }
			
			this.dao.update("tDevice.update", device);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo deleteDevice(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TDevice device = new TDevice();
			device.setF_deviceId(Integer.parseInt(info.get("f_deviceId").toString()));
			this.dao.delete("tDevice.delete", device);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}