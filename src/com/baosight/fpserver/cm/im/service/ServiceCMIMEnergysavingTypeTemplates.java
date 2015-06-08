package com.baosight.fpserver.cm.im.service;

import com.baosight.fpserver.cm.im.domain.TEnergysavingType;
import com.baosight.fpserver.cm.im.domain.TEnergysavingtypeTemplate;
import com.baosight.fpserver.cm.im.domain.TOperationLog;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMEnergysavingTypeTemplates extends ServiceEPBase {
	public EiInfo queryEnergysavingTypeTemplatesByTypeTemplateId(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			TEnergysavingtypeTemplate energysavingTypeTemplate = new TEnergysavingtypeTemplate();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(energysavingTypeTemplate.eiMetadata);
			info.addBlock("result");
			info.getBlock("result").set(EiConstant.limitStr, "-1");
			
			Object f_typeTemplateId = info.get("f_typeTemplateId");
			if(f_typeTemplateId != null){
				info.set("inqu_status-0-f_typeTemplateId", f_typeTemplateId);
			}else{
				info.set("inqu_status-0-f_typeTemplateId", -1);
			}
			info.setMethodParam(MethodParamConstants.sqlName, "tEnergysavingtypeTemplate.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, energysavingTypeTemplate);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(energysavingTypeTemplate.eiMetadata);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertEnergysavingTypeTemplates(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TEnergysavingtypeTemplate energysavingTypeTemplate = new TEnergysavingtypeTemplate();

			energysavingTypeTemplate.setF_typeTemplateId(Integer.parseInt(info.get("f_typeTemplateId").toString()));
			energysavingTypeTemplate.setF_energysavingTypeName(info.get("f_energysavingTypeName").toString());
			energysavingTypeTemplate.setF_energysavingTypeDesc(info.get("f_energysavingTypeDesc").toString());
<<<<<<< HEAD
			this.dao.insert("tEnergysavingtypeTemplate.insert", energysavingTypeTemplate);
			
//			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "ï¿½ï¿½Ó½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½" + energysavingType.getF_energysavingTypeName());
=======
<<<<<<< HEAD
			this.dao.insert("tEnergysavingtypeTemplate.insert", energysavingTypeTemplate);
			
//			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "ï¿½ï¿½Ó½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½" + energysavingType.getF_energysavingTypeName());
=======
//			energysavingTypeTemplate.setF_energysavingTypeFormula(info.get("f_energysavingTypeFormula").toString());
//			try{
//				energysavingType.setF_energysavingTypeTargetvalue(Double.parseDouble(info.get("f_energysavingTypeTargetvalue").toString()));
//			}catch (Exception e){}
			this.dao.insert("tEnergysavingtypeTemplate.insert", energysavingTypeTemplate);
			
//			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "Ôö¼Ó½ÚÄÜÁ¿ÀàÐÍ" + energysavingType.getF_energysavingTypeName());
>>>>>>> origin/master
>>>>>>> origin/master
//			this.dao.insert("tOperationLog.insert", log);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateEnergysavingTypeTemplates(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TEnergysavingtypeTemplate energysavingTypeTemplate = new TEnergysavingtypeTemplate();
			energysavingTypeTemplate.setF_energysavingtypeTemplateId(Integer.parseInt(info.get("f_energysavingtypeTemplateId").toString()));
			energysavingTypeTemplate.setF_typeTemplateId(Integer.parseInt(info.get("f_typeTemplateId").toString()));
			energysavingTypeTemplate.setF_energysavingTypeName(info.get("f_energysavingTypeName").toString());
			energysavingTypeTemplate.setF_energysavingTypeDesc(info.get("f_energysavingTypeDesc").toString());
			
			this.dao.update("tEnergysavingtypeTemplate.update", energysavingTypeTemplate);
			
<<<<<<< HEAD
//			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "ï¿½Þ¸Ä½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½" + energysavingType.getF_energysavingTypeName());
=======
<<<<<<< HEAD
//			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "ï¿½Þ¸Ä½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½" + energysavingType.getF_energysavingTypeName());
=======
//			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "ÐÞ¸Ä½ÚÄÜÁ¿ÀàÐÍ" + energysavingType.getF_energysavingTypeName());
>>>>>>> origin/master
>>>>>>> origin/master
//			this.dao.insert("tOperationLog.insert", log);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo updateFormula(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TEnergysavingtypeTemplate energysavingTypeTemplate = new TEnergysavingtypeTemplate();
			
			energysavingTypeTemplate.setF_energysavingtypeTemplateId(Integer.parseInt(info.get("f_energysavingtypeTemplateId").toString()));
			energysavingTypeTemplate.setF_energysavingTypeFormula(info.get("f_energysavingTypeFormula").toString());
			this.dao.update("tEnergysavingtypeTemplate.updateFormula", energysavingTypeTemplate);
			
<<<<<<< HEAD
//			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "ï¿½Þ¸Ä½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã¹«Ê½");
=======
<<<<<<< HEAD
//			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "ï¿½Þ¸Ä½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ã¹«Ê½");
=======
//			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "ÐÞ¸Ä½ÚÄÜÁ¿¼ÆËã¹«Ê½");
>>>>>>> origin/master
>>>>>>> origin/master
//			this.dao.insert("tOperationLog.insert", log);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo updateCalcstep(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TEnergysavingType energysavingType = new TEnergysavingType();
			
			energysavingType.setF_energysavingTypeId(Integer.parseInt(info.get("f_energysavingTypeId").toString()));
			energysavingType.setF_energysavingTypeCalcstep(info.get("f_energysavingTypeCalcstep").toString());
			this.dao.update("tEnergysavingType.updateCalcstep", energysavingType);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo deleteEnergysavingTypeTemplates(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TEnergysavingtypeTemplate energysavingTypeTemplate = new TEnergysavingtypeTemplate();
			info.setMethodParam(MethodParamConstants.sqlName, "tEnergysavingtypeTemplate.delete");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, energysavingTypeTemplate);
			info.addBlock("result");
			info.getBlock(EiConstant.resultBlock).setBlockMeta(energysavingTypeTemplate.eiMetadata);
			Object f_energysavingtypeTemplateId = info.get("f_energysavingtypeTemplateId");
			info.set("result-0-f_energysavingtypeTemplateId", f_energysavingtypeTemplateId);
			
			outInfo = super.delete(info, true);
			
<<<<<<< HEAD
//			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "É¾ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½");
=======
<<<<<<< HEAD
//			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "É¾ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½");
=======
//			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "É¾³ý½ÚÄÜÁ¿ÀàÐÍ");
>>>>>>> origin/master
>>>>>>> origin/master
//			this.dao.insert("tOperationLog.insert", log);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
	
	public EiInfo emptyEnergysavingTypeTemplates(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TEnergysavingtypeTemplate energysavingTypeTemplate = new TEnergysavingtypeTemplate();
			info.setMethodParam(MethodParamConstants.sqlName, "tEnergysavingtypeTemplate.empty");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, energysavingTypeTemplate);
			info.addBlock("result");
			info.getBlock(EiConstant.resultBlock).setBlockMeta(energysavingTypeTemplate.eiMetadata);
			Object f_typeTemplateId = info.get("f_typeTemplateId");
			info.set("result-0-f_typeTemplateId", f_typeTemplateId);
			
			outInfo = super.delete(info, true);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
<<<<<<< HEAD
=======
=======
>>>>>>> origin/master
>>>>>>> origin/master
}
