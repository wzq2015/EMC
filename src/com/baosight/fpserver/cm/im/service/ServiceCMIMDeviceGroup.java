package com.baosight.fpserver.cm.im.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMDeviceGroup extends ServiceEPBase 
{	
	public EiInfo queryDeviceGroupsByProjectId(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TDevicegroup deviceGroup = new TDevicegroup();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(deviceGroup.eiMetadata);
			
			Object f_emcprojectId = info.get("f_emcprojectId");
			info.set("inqu_status-0-f_emcprojectId", f_emcprojectId);
			
			info.setMethodParam(MethodParamConstants.sqlName, "tDevicegroup.queryByProjectId");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, deviceGroup);
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(deviceGroup.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo queryDeviceGroupById(EiInfo info)
	{	
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TDevicegroup deviceGroup = new TDevicegroup();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(deviceGroup.eiMetadata);
			
			Object f_devicegroupId = info.get("f_devicegroupId");
			info.set("inqu_status-0-f_devicegroupId", f_devicegroupId);
			
			info.setMethodParam(MethodParamConstants.sqlName, "tDevicegroup.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, deviceGroup);
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(deviceGroup.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertDeviceGroup(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TDevicegroup deviceGroup = new TDevicegroup();

			deviceGroup.setF_emcprojectId(Integer.parseInt(info.get("f_emcprojectId").toString()));
			deviceGroup.setF_parentDevicegroupId(Integer.parseInt(info.get("f_parentDevicegroupId").toString()));
			deviceGroup.setF_devicegroupName(info.get("f_devicegroupName").toString());
			deviceGroup.setF_devicegroupDesc(info.get("f_devicegroupDesc").toString());
			
			this.dao.insert("tDevicegroup.insert", deviceGroup);
			
			Map params = new HashMap();
			params.put("f_emcprojectId", info.get("f_emcprojectId").toString());
			params.put("f_devicegroupName", info.get("f_devicegroupName").toString());
			List resultList = this.dao.query("tDevicegroup.queryByProjectIdAndName", params);
			
			if (resultList == null) {
				outInfo.set("errorcode", "-1");
				return outInfo;
			}
			
			TDevicegroup newDeviceGroup = (TDevicegroup)(resultList.get(0));
			outInfo.set("addType", "devicegroup");
			outInfo.set("newId", newDeviceGroup.getF_devicegroupId());
			outInfo.set("name", newDeviceGroup.getF_devicegroupName());
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateDeviceGroup(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
				
		try
		{
			TDevicegroup deviceGroup = new TDevicegroup();
			deviceGroup.setF_devicegroupId(Integer.parseInt(info.get("f_devicegroupId").toString()));
			deviceGroup.setF_devicegroupName(info.get("f_devicegroupName").toString());
			deviceGroup.setF_devicegroupDesc(info.get("f_devicegroupDesc").toString());
			this.dao.update("tDevicegroup.update", deviceGroup);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo deleteDeviceGroup(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TDevicegroup deviceGroup = new TDevicegroup();
			deviceGroup.setF_devicegroupId(Integer.parseInt(info.get("f_devicegroupId").toString()));
			this.dao.delete("tDevicegroup.delete", deviceGroup);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}