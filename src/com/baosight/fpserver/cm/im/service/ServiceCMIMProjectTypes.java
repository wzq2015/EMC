package com.baosight.fpserver.cm.im.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.fpserver.cm.im.domain.TProjectTypes;
import com.baosight.fpserver.cm.im.domain.TTypeTemplate;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMProjectTypes extends ServiceEPBase {
	public EiInfo queryProjectTypes(EiInfo info){	 
		EiInfo outInfo = new EiInfo();
		try{
			TProjectTypes tProjectTypes = new TProjectTypes();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(tProjectTypes.eiMetadata);
			Object f_projectTypeId = info.get("f_projectTypeId");
			if(f_projectTypeId != null){
				info.set("inqu_status-0-f_projectTypeId", f_projectTypeId);
			}
			info.set("inqu_status-0-f_projectTypeStatus", 0);
			info.setMethodParam(MethodParamConstants.sqlName, "tProjectTypes.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, tProjectTypes);
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(tProjectTypes.eiMetadata);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertProjectTypes(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			TProjectTypes tProjectTypes = new TProjectTypes();
			tProjectTypes.setF_projectTypeName(info.get("f_projectTypeName").toString());
			tProjectTypes.setF_projectTypeStatus(Integer.parseInt(info.get("f_projectTypeStatus").toString()));
			tProjectTypes.setF_projectTypeDesc(info.get("f_projectTypeDesc").toString());
			this.dao.insert("tProjectTypes.insert", tProjectTypes);
			
			Map params = new HashMap();
			params.put("f_projectTypeStatus", 0);
			List resultList = this.dao.query("tProjectTypes.query", params);
			
			if (resultList == null) {
				outInfo.set("errorcode", "-1");
				return outInfo;
			}
			
			TProjectTypes newProjectType = (TProjectTypes)(resultList.get(resultList.size()-1));
			outInfo.set("addType", "projectType");
			outInfo.set("newId", newProjectType.getF_projectTypeId());
			outInfo.set("name", newProjectType.getF_projectTypeName());
			
			TTypeTemplate tTypeTemplate = new TTypeTemplate();
			tTypeTemplate.setF_typeTemplateName(newProjectType.getF_projectTypeName());
			tTypeTemplate.setF_typeTemplateDesc(newProjectType.getF_projectTypeDesc());
			tTypeTemplate.setF_projectTypeId(newProjectType.getF_projectTypeId());
			this.dao.insert("tTypeTemplate.insert", tTypeTemplate);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateProjectTypes(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			TProjectTypes tProjectTypes = new TProjectTypes();
			tProjectTypes.setF_projectTypeId(Integer.parseInt(info.get("f_projectTypeId").toString()));
			tProjectTypes.setF_projectTypeName(info.get("f_projectTypeName").toString());
			tProjectTypes.setF_projectTypeDesc(info.get("f_projectTypeDesc").toString());
			tProjectTypes.setF_projectTypeStatus(0);
			this.dao.update("tProjectTypes.update", tProjectTypes);
			
			TTypeTemplate tTypeTemplate = new TTypeTemplate();
			tTypeTemplate.setF_typeTemplateName(info.get("f_projectTypeName").toString());
			tTypeTemplate.setF_typeTemplateDesc(info.get("f_projectTypeDesc").toString());
			tTypeTemplate.setF_projectTypeId(Integer.parseInt(info.get("f_projectTypeId").toString()));
			this.dao.update("tTypeTemplate.update", tTypeTemplate);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo deleteProjectTypes(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			TProjectTypes tProjectTypes = new TProjectTypes();
			tProjectTypes.setF_projectTypeId(Integer.parseInt(info.get("f_projectTypeId").toString()));
			tProjectTypes.setF_projectTypeName(info.get("f_projectTypeName").toString());
			tProjectTypes.setF_projectTypeDesc(info.get("f_projectTypeDesc").toString());
			tProjectTypes.setF_projectTypeStatus(1);
			this.dao.update("tProjectTypes.update", tProjectTypes);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}
