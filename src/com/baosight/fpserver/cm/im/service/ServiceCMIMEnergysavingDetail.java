package com.baosight.fpserver.cm.im.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceCMIMEnergysavingDetail extends ServiceEPBase 
{
	public EiInfo queryEnergysavingDetail(EiInfo info)
	{
		TEnergysavingDetail energysavingDetail = new TEnergysavingDetail();
		EiInfo outInfo = new EiInfo();
		try
		{
			Map params = new HashMap();
			params.put("f_emcprojectId", info.get("f_emcprojectId").toString());
			Object f_emcprojectCycleIndex = info.get("f_emcprojectCycleIndex");
			if (f_emcprojectCycleIndex != null)
			{
				params.put("f_emcprojectCycleIndex",f_emcprojectCycleIndex);
			}
			
			List result = this.dao.query("tEnergysavingDetail.queryByProjectIdAndCycleIndex", params);

			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(energysavingDetail.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo queryEnergysavingDetailByEnergysavingTypeIdsAndCycleIndexes(EiInfo info)
	{
		TEnergysavingDetail energysavingDetail = new TEnergysavingDetail();
		EiInfo outInfo = new EiInfo();
		try
		{
			Map params = new HashMap();
			params.put("f_emcprojectId", info.get("f_emcprojectId").toString());
			Object f_emcprojectCycleIndexes = info.get("f_emcprojectCycleIndexes");
			if (f_emcprojectCycleIndexes != null)
			{
				params.put("f_emcprojectCycleIndexes",f_emcprojectCycleIndexes);
			}
			Object f_energysavingTypeIds = info.get("f_energysavingTypeIds");
			if (f_energysavingTypeIds != null)
			{
				params.put("f_energysavingTypeIds",f_energysavingTypeIds);
			}
			
			List result = this.dao.query("tEnergysavingDetail.queryByProjectIdAndCycleIndexes", params);

			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(energysavingDetail.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}