package com.baosight.fpserver.cm.im.service;

import java.util.*;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.fpserver.cm.im.domain.*;

public class ServiceCMIMDevicePara extends ServiceEPBase 
{	
	public EiInfo queryDeviceParaById(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TDevicepara devicepara = new TDevicepara();
	
			Map params = new HashMap();
			params.put("f_deviceparaId", info.get("f_deviceparaId").toString());
			List resultList = this.dao.query("tDevicepara.query", params);
			
			
			outInfo.addBlock("result");
			outInfo.getBlock("result").setBlockMeta(devicepara.eiMetadata);
			outInfo.getBlock("result").setRows(resultList);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo queryDeviceParasByProjectId(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TDevicepara devicepara = new TDevicepara();
			String f_emcprojectId = info.get("f_emcprojectId").toString();
			
			Map params = new HashMap();
			params.put("f_emcprojectId", f_emcprojectId);
			List deviceList = this.dao.query("tDevice.queryByProjectId", params);
			
			List resultList = new ArrayList();
			for (int i=0; i<deviceList.size(); i++) 
			{
				TDevice device = (TDevice)(deviceList.get(i));
				int deviceId = device.getF_deviceId();
				params = new HashMap();
				params.put("f_deviceId", deviceId);
				List tempList = this.dao.query("tDevicepara.query", params);
				resultList.addAll(tempList);
			}
			
			outInfo.addBlock("result");
			outInfo.getBlock("result").setBlockMeta(devicepara.eiMetadata);
			outInfo.getBlock("result").setRows(resultList);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}

		return outInfo;
	}
	
	public EiInfo insertDevicePara(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();

		try
		{
			TDevicepara devicepara = new TDevicepara();
			
			devicepara.setF_deviceId(Integer.parseInt(info.get("f_deviceId").toString()));
			devicepara.setF_deviceparaName(info.get("f_deviceparaName").toString());
			devicepara.setF_deviceparaDesc(info.get("f_deviceparaDesc").toString());
			devicepara.setF_deviceparaTagname(info.get("f_deviceparaTagname").toString());
			
			this.dao.insert("tDevicepara.insert", devicepara);
			
			Map params = new HashMap();
			params.put("f_deviceparaName", info.get("f_deviceparaName").toString());
			params.put("f_deviceId", Integer.parseInt(info.get("f_deviceId").toString()));
			List resultList = this.dao.query("tDevicepara.query", params);
			
			if (resultList == null) {
				outInfo.set("errorcode", "-1");
				return outInfo;
			}
			TDevicepara newDevicepara = (TDevicepara)(resultList.get(0));
			outInfo.set("addType", "devicepara");
			outInfo.set("newId", newDevicepara.getF_deviceparaId());
			outInfo.set("name", newDevicepara.getF_deviceparaName());
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo updateDevicePara(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TDevicepara devicepara = new TDevicepara();
			devicepara.setF_deviceparaId(Integer.parseInt(info.get("f_deviceparaId").toString()));
			devicepara.setF_deviceparaName(info.get("f_deviceparaName").toString());
			devicepara.setF_deviceparaDesc(info.get("f_deviceparaDesc").toString());
			devicepara.setF_deviceparaTagname(info.get("f_deviceparaTagname").toString());
			this.dao.update("tDevicepara.update", devicepara);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo deleteDevicePara(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TDevicepara devicepara = new TDevicepara();
			devicepara.setF_deviceparaId(Integer.parseInt(info.get("f_deviceparaId").toString()));
			this.dao.delete("tDevicepara.delete", devicepara);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}