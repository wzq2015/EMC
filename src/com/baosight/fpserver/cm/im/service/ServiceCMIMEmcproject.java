package com.baosight.fpserver.cm.im.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.fpserver.cm.im.domain.TEmcproject;
import com.baosight.fpserver.cm.im.domain.TEmcprojectCycle;
import com.baosight.fpserver.cm.im.domain.TEnergysavingType;
import com.baosight.fpserver.cm.im.domain.TEnergysavingtypeTemplate;
import com.baosight.fpserver.cm.im.domain.TExpenseType;
import com.baosight.fpserver.cm.im.domain.TExpensetypeTemplate;
import com.baosight.fpserver.cm.im.domain.TProjectTypes;
import com.baosight.fpserver.cm.im.domain.TTypeTemplate;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.threadlocal.UserSession;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMEmcproject extends ServiceEPBase {
	public EiInfo queryEmcprojects(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			TEmcproject project = new TEmcproject();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(project.eiMetadata);
			Object f_emcprojectType = info.get("f_emcprojectType");
			if(f_emcprojectType != null){
				info.set("inqu_status-0-f_emcprojectType", f_emcprojectType);
			}
			info.set("inqu_status-0-f_emcprojectStatus", 0);
			info.setMethodParam(MethodParamConstants.sqlName, "tEmcproject.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, project);
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(project.eiMetadata);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo queryProjectTypes(EiInfo info){	 
		EiInfo outInfo = new EiInfo();
		try{
			TProjectTypes tProjectTypes = new TProjectTypes();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(tProjectTypes.eiMetadata);
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
	
	public EiInfo queryEmcprojectById(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			TEmcproject project = new TEmcproject();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(project.eiMetadata);
			
			Object f_emcprojectId = info.get("f_emcprojectId");
			info.set("inqu_status-0-f_emcprojectId", f_emcprojectId);
			
			info.setMethodParam(MethodParamConstants.sqlName, "tEmcproject.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, project);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(project.eiMetadata);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertProject(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TEmcproject project = new TEmcproject();
			
			int cycleNumber = Integer.parseInt(info.get("f_emcprojectTotalcyclenumber").toString());
			
			project.setF_companyId(Integer.parseInt(info.get("f_companyId").toString()));
			project.setF_emcprojectName(info.get("f_emcprojectName").toString());
			project.setF_emcprojectDesc(info.get("f_emcprojectDesc").toString());
			project.setF_emcprojectAddress(info.get("f_emcprojectAddress").toString());
			project.setF_emcprojectConstructdate(info.get("f_emcprojectConstructdate").toString());
			project.setF_emcprojectCommissioningdate(info.get("f_emcprojectCommissioningdate").toString());
			project.setF_emcprojectResponsible(info.get("f_emcprojectResponsible").toString());
			project.setF_emcprojectConstructunit(info.get("f_emcprojectConstructunit").toString());
			project.setF_emcprojectStartdate(info.get("f_emcprojectStartdate").toString());
			project.setF_emcprojectEnddate(info.get("f_emcprojectEnddate").toString());
			project.setF_emcprojectTotalcyclenumber(cycleNumber);
			project.setF_emcprojectResEmail(info.get("f_emcprojectResEmail").toString());
			project.setF_emcprojectResPhonenumber(info.get("f_emcprojectResPhonenumber").toString());
			project.setF_emcprojectCustomerpm(info.get("f_emcprojectCustomerpm").toString());
			project.setF_emcprojectCustomerpmEmail(info.get("f_emcprojectCustomerpmEmail").toString());
			project.setF_emcprojectCustomerpmPhonenumber(info.get("f_emcprojectCustomerpmPhonenumber").toString());
			project.setF_emcprojectInitpage(info.get("f_emcprojectInitpage").toString());
			project.setF_emcprojectLat("3636028");
			project.setF_emcprojectLon("13497487");
			project.setF_emcprojectStatus(0);
			project.setF_emcprojectType(Integer.parseInt(info.get("f_emcprojectType").toString()));
			
			this.dao.insert("tEmcproject.insert", project);
			
			Map params = new HashMap();
			params.put("f_emcprojectName", info.get("f_emcprojectName").toString());
			List projectList = this.dao.query("tEmcproject.query", params);
			if ((projectList == null) || (projectList.size() == 0)){
				outInfo.set("errorcode", "-1");
			}else{
				TEmcproject newProject = (TEmcproject)(projectList.get(0));
				for (int i=0; i<cycleNumber + 1; i++){
					TEmcprojectCycle cycle = new TEmcprojectCycle();
					cycle.setF_emcprojectId(newProject.getF_emcprojectId());
					cycle.setF_emcprojectCycleCycleindex(i);
					cycle.setF_emcprojectCycleStarttime(info.get("f_emcprojectStartdate").toString());
					cycle.setF_emcprojectCycleEndtime(info.get("f_emcprojectStartdate").toString());
					
					this.dao.insert("tEmcprojectCycle.insert", cycle);
				}
				//根据项目类型id查模版类型
				Map params1 = new HashMap();
				params1.put("f_projectTypeId", newProject.getF_emcprojectType());
				List typeTemplateList = this.dao.query("tTypeTemplate.query", params1);
				if(typeTemplateList.size() > 0){
					TTypeTemplate typeTemplate = (TTypeTemplate)(typeTemplateList.get(0));
					Map params2 = new HashMap();
					params2.put("f_typeTemplateId", typeTemplate.getF_typeTemplateId());
					//根据类型模版id查询节能量类型模版和费用类型模版
					List energysavingtypeTemplateList = this.dao.query("tEnergysavingtypeTemplate.query",params2);
					List expensetypeTemplateList = this.dao.query("tExpensetypeTemplate.query",params2);
					if(energysavingtypeTemplateList.size() > 0){
						for(int i=0; i<energysavingtypeTemplateList.size(); i++){
							TEnergysavingtypeTemplate energysavingtypeTemplate = (TEnergysavingtypeTemplate)(energysavingtypeTemplateList.get(i));
							if(energysavingtypeTemplate.getF_energysavingTypeFormula() == null){
								continue;
							}else{
								TEnergysavingType energysavingType = new TEnergysavingType();
								energysavingType.setF_emcprojectId(newProject.getF_emcprojectId());
								energysavingType.setF_energysavingTypeName(energysavingtypeTemplate.getF_energysavingTypeName());
								energysavingType.setF_energysavingTypeDesc(energysavingtypeTemplate.getF_energysavingTypeDesc());
								energysavingType.setF_energysavingTypeFormula(energysavingtypeTemplate.getF_energysavingTypeFormula());
								this.dao.insert("tEnergysavingType.insert", energysavingType);
							}
						}
					}
					if(expensetypeTemplateList.size() > 0){
						for(int i=0; i<expensetypeTemplateList.size(); i++){
							TExpensetypeTemplate expensetypeTemplate = (TExpensetypeTemplate)(expensetypeTemplateList.get(i));
							TExpenseType expenseType = new TExpenseType();
							expenseType.setF_emcprojectId(newProject.getF_emcprojectId());
							expenseType.setF_expenseTypeName(expensetypeTemplate.getF_expenseTypeName());
							expenseType.setF_expenseTypeDesc(expensetypeTemplate.getF_expenseTypeDesc());
							this.dao.insert("tExpenseType.insert", expenseType);
						}
					}
				}
				
				outInfo.set("addType", "emcproject");
				outInfo.set("newId", newProject.getF_emcprojectId());
				outInfo.set("name", newProject.getF_emcprojectName());
			}
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateProject(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			Map params = new HashMap();
			params.put("f_emcprojectId", info.get("f_emcprojectId").toString());
			List projectList = this.dao.query("tEmcproject.query", params);
			if ((projectList == null) || (projectList.size() == 0)){
				outInfo.set("errorcode", "-1");
			}else{
				TEmcproject oldProject = (TEmcproject)(projectList.get(0));
				int currentCycleNumber = Integer.parseInt(info.get("f_emcprojectTotalcyclenumber").toString());
				if (currentCycleNumber > oldProject.getF_emcprojectTotalcyclenumber()){
					for (int i=oldProject.getF_emcprojectTotalcyclenumber()+1; i<currentCycleNumber + 1; i++){
						TEmcprojectCycle cycle = new TEmcprojectCycle();
						cycle.setF_emcprojectId(oldProject.getF_emcprojectId());
						cycle.setF_emcprojectCycleCycleindex(i);
						cycle.setF_emcprojectCycleStarttime(info.get("f_emcprojectStartdate").toString());
						cycle.setF_emcprojectCycleEndtime(info.get("f_emcprojectStartdate").toString());
						
						this.dao.insert("tEmcprojectCycle.insert", cycle);
					}
				}
			}
			
			TEmcproject project = new TEmcproject();
			
			project.setF_emcprojectId(Integer.parseInt(info.get("f_emcprojectId").toString()));
			project.setF_emcprojectName(info.get("f_emcprojectName").toString());
			project.setF_emcprojectDesc(info.get("f_emcprojectDesc").toString());
			project.setF_emcprojectAddress(info.get("f_emcprojectAddress").toString());
			project.setF_emcprojectConstructdate(info.get("f_emcprojectConstructdate").toString());
			project.setF_emcprojectCommissioningdate(info.get("f_emcprojectCommissioningdate").toString());
			project.setF_emcprojectResponsible(info.get("f_emcprojectResponsible").toString());
			project.setF_emcprojectConstructunit(info.get("f_emcprojectConstructunit").toString());
			project.setF_emcprojectStartdate(info.get("f_emcprojectStartdate").toString());
			project.setF_emcprojectEnddate(info.get("f_emcprojectEnddate").toString());
			project.setF_emcprojectTotalcyclenumber(Integer.parseInt(info.get("f_emcprojectTotalcyclenumber").toString()));
			project.setF_emcprojectResEmail(info.get("f_emcprojectResEmail").toString());
			project.setF_emcprojectResPhonenumber(info.get("f_emcprojectResPhonenumber").toString());
			project.setF_emcprojectCustomerpm(info.get("f_emcprojectCustomerpm").toString());
			project.setF_emcprojectCustomerpmEmail(info.get("f_emcprojectCustomerpmEmail").toString());
			project.setF_emcprojectCustomerpmPhonenumber(info.get("f_emcprojectCustomerpmPhonenumber").toString());
			project.setF_emcprojectInitpage(info.get("f_emcprojectInitpage").toString());
			project.setF_emcprojectType(Integer.parseInt(info.get("f_emcprojectType").toString()));
			
			this.dao.update("tEmcproject.update", project);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateProjectParentId(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TEmcproject project = new TEmcproject();
			project.setF_emcprojectId(Integer.parseInt(info.get("f_emcprojectId").toString()));
			project.setF_companyId(Integer.parseInt(info.get("f_companyId").toString()));
			
			this.dao.update("tEmcproject.updateParentId", project);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo deleteProject(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			TEmcproject project = new TEmcproject();		
			project.setF_emcprojectId(Integer.parseInt(info.get("f_emcprojectId").toString()));
			this.dao.update("tEmcproject.delete1", project);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo changeProject(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			String userName = UserSession.getLoginName();
			String projectId = info.get("projectId").toString();
			if (!userName.equals("admin"))
			{
				Map params = new HashMap();
				params.put("f_username", userName);
				params.put("f_emcprojectId", projectId);
				List result = this.dao.query("tEmcprojectAuth.query", params, 0, 1);
				if (result.size() == 0)
				{
					outInfo.set("errorcode", "-2");
					return outInfo;
				}
			}
		}
		catch(Exception e)
		{
			
		}
		
		try
		{
			UserSession.setOutSessionProperty("projectId", info.get("projectId"));
			UserSession.setOutSessionProperty("projectName", info.get("projectName"));
			UserSession.setOutSessionProperty("initPage", info.get("initPage"));
			UserSession.setOutSessionProperty("projectPreName", info.get("projectPreName"));
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updatePos(EiInfo inInfo) 
	{
		String id = (String)inInfo.get("id");
		String lon = (String)inInfo.get("lon");
		String lat = (String)inInfo.get("lat");		
		HashMap map = new HashMap();
		map.put("f_emcprojectId", id);
		map.put("f_emcprojectLon", lon);
		map.put("f_emcprojectLat", lat);
		
		TEmcproject projects = new TEmcproject();
		projects.fromMap(map);
		
		dao.update("tEmcproject.updatePos", projects);
		
		return inInfo;
	}
}