package com.baosight.fpserver.cm.im.service;

import com.baosight.fpserver.cm.im.domain.TEnergyConsumption;
import com.baosight.fpserver.cm.im.domain.TEnergysavingType;
import com.baosight.fpserver.cm.im.domain.TOperationLog;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMEnergyConsumption extends ServiceEPBase {
	public EiInfo queryEnergyConsumptionByProjectId(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			TEnergyConsumption energyConsumption = new TEnergyConsumption();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(energyConsumption.eiMetadata);
			info.addBlock("result");
			info.getBlock("result").set(EiConstant.limitStr, "-1");
			
			Object f_emcprojectId = info.get("f_emcprojectId");
			info.set("inqu_status-0-f_emcprojectId", f_emcprojectId);
			info.setMethodParam(MethodParamConstants.sqlName, "tEnergyConsumption.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, energyConsumption);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(energyConsumption.eiMetadata);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertEnergyConsumption(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TEnergyConsumption energyConsumption = new TEnergyConsumption();

			energyConsumption.setF_emcprojectId(Integer.parseInt(info.get("f_emcprojectId").toString()));
			energyConsumption.setF_energyConsumptionName(info.get("f_energyConsumptionName").toString());
			energyConsumption.setF_energyConsumptionDesc(info.get("f_energyConsumptionDesc").toString());
			try{
				energyConsumption.setF_energyConsumptionTargetvalue(Double.parseDouble(info.get("f_energyConsumptionTargetvalue").toString()));
			}catch (Exception e){}
			this.dao.insert("tEnergyConsumption.insert", energyConsumption);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateEnergyConsumption(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TEnergyConsumption energyConsumption = new TEnergyConsumption();
			energyConsumption.setF_energyConsumptionId(Integer.parseInt(info.get("f_energyConsumptionId").toString()));
			energyConsumption.setF_energyConsumptionName(info.get("f_energyConsumptionName").toString());
			energyConsumption.setF_energyConsumptionDesc(info.get("f_energyConsumptionDesc").toString());
			energyConsumption.setF_energyConsumptionTargetvalue(Double.parseDouble(info.get("f_energyConsumptionTargetvalue").toString()));
			
			this.dao.update("tEnergyConsumption.update", energyConsumption);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo updateFormula(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TEnergyConsumption energyConsumption = new TEnergyConsumption();
			
			energyConsumption.setF_energyConsumptionId(Integer.parseInt(info.get("f_energyConsumptionId").toString()));
			energyConsumption.setF_energyConsumptionFormula(info.get("f_energyConsumptionFormula").toString());
			this.dao.update("tEnergyConsumption.updateFormula", energyConsumption);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo deleteEnergyConsumption(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TEnergyConsumption energyConsumption = new TEnergyConsumption();
			info.setMethodParam(MethodParamConstants.sqlName, "tEnergyConsumption.delete");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, energyConsumption);
			info.addBlock("result");
			info.getBlock(EiConstant.resultBlock).setBlockMeta(energyConsumption.eiMetadata);
			Object f_energyConsumptionId = info.get("f_energyConsumptionId");
			info.set("result-0-f_energyConsumptionId", f_energyConsumptionId);
			
			outInfo = super.delete(info, true);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}
