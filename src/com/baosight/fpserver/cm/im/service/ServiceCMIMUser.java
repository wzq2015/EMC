package com.baosight.fpserver.cm.im.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.fpserver.cm.im.domain.TEmcprojectAuth;
import com.baosight.iplat4j.common.es.domain.Tes01;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceCMIMUser extends ServiceEPBase
{
	public EiInfo queryUsers(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		Map params = new HashMap();
		try
		{
			List result = this.dao.query("ES01.query", params);
			Tes01 es01 = new Tes01();
			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(es01.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch (Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo queryProjectAuthInfos(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			Map params = new HashMap();
			params.put("f_username", info.get("UserName"));
			List result = this.dao.query("tEmcprojectAuth.query", params);
			TEmcprojectAuth auth = new TEmcprojectAuth();
			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(auth.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch (Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo saveProjectAuthInfos(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		String userName = info.get("UserName").toString();
		try
		{
			TEmcprojectAuth auth = new TEmcprojectAuth();
			auth.setF_username(userName);
			this.dao.delete("tEmcprojectAuth.deletebyname", auth);
		}
		catch (Exception e)
		{
			outInfo.set("errorcode", "-1");
			return outInfo;
		}
		
		try
		{
			String authedProjectIds = info.get("AuthedProjectIds").toString();
			if (authedProjectIds.length() == 0)
			{
				return outInfo;
			}
			String[] authedProjectIdArray = authedProjectIds.split(",");
			for (int i=0; i<authedProjectIdArray.length; i++)
			{
				TEmcprojectAuth auth = new TEmcprojectAuth();
				auth.setF_emcprojectId(Integer.parseInt(authedProjectIdArray[i]));
				auth.setF_username(userName);
				this.dao.insert("tEmcprojectAuth.insert", auth);
			}
		}
		catch (Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
}