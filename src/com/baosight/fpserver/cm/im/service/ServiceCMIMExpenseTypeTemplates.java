package com.baosight.fpserver.cm.im.service;

<<<<<<< HEAD
import com.baosight.fpserver.cm.im.domain.TEnergysavingtypeTemplate;
=======
<<<<<<< HEAD
import com.baosight.fpserver.cm.im.domain.TEnergysavingtypeTemplate;
=======
>>>>>>> origin/master
>>>>>>> origin/master
import com.baosight.fpserver.cm.im.domain.TExpenseType;
import com.baosight.fpserver.cm.im.domain.TExpensetypeTemplate;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMExpenseTypeTemplates extends ServiceEPBase {
	public EiInfo queryExpenseTypeTemplatesByTypeTemplateId(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			TExpensetypeTemplate expenseTypeTemplate = new TExpensetypeTemplate();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(expenseTypeTemplate.eiMetadata);
			info.addBlock("result");
			info.getBlock("result").set(EiConstant.limitStr, "-1");
			
			Object f_typeTemplateId = info.get("f_typeTemplateId");
			if(f_typeTemplateId != null){
				info.set("inqu_status-0-f_typeTemplateId", f_typeTemplateId);
			}else{
				info.set("inqu_status-0-f_typeTemplateId", -1);
			}
			info.setMethodParam(MethodParamConstants.sqlName, "tExpensetypeTemplate.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, expenseTypeTemplate);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(expenseTypeTemplate.eiMetadata);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertExpenseTypeTemplate(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TExpensetypeTemplate expenseTypeTemplate = new TExpensetypeTemplate();
			expenseTypeTemplate.setF_typeTemplateId(Integer.parseInt(info.get("f_typeTemplateId").toString()));
			expenseTypeTemplate.setF_expenseTypeName(info.get("f_expenseTypeName").toString());
			expenseTypeTemplate.setF_expenseTypeDesc(info.get("f_expenseTypeDesc").toString());
			
			this.dao.insert("tExpensetypeTemplate.insert", expenseTypeTemplate);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}

		return outInfo;
	}
	
	public EiInfo updateExpenseTypeTemplate(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			TExpensetypeTemplate expenseTypeTemplate = new TExpensetypeTemplate();
			expenseTypeTemplate.setF_expensetypeTemplateId(Integer.parseInt(info.get("f_expensetypeTemplateId").toString()));
			expenseTypeTemplate.setF_expenseTypeName(info.get("f_expenseTypeName").toString());
			expenseTypeTemplate.setF_expenseTypeDesc(info.get("f_expenseTypeDesc").toString());
			expenseTypeTemplate.setF_typeTemplateId(Integer.parseInt(info.get("f_typeTemplateId").toString()));
			
			this.dao.update("tExpensetypeTemplate.update", expenseTypeTemplate);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
	
		return outInfo;
	}
	
	public EiInfo deleteExpenseTypeTemplate(EiInfo info){
		EiInfo outInfo = new EiInfo();
		
		try{
			TExpensetypeTemplate expenseTypeTemplate = new TExpensetypeTemplate();
			info.setMethodParam(MethodParamConstants.sqlName, "tExpensetypeTemplate.delete");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, expenseTypeTemplate);
			info.addBlock("result");
			info.getBlock(EiConstant.resultBlock).setBlockMeta(expenseTypeTemplate.eiMetadata);
			Object f_expensetypeTemplateId = info.get("f_expensetypeTemplateId");
			info.set("result-0-f_expensetypeTemplateId", f_expensetypeTemplateId);
			outInfo = super.delete(info, true);
		}catch(Exception e){
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
	
	public EiInfo emptyExpenseTypeTemplates(EiInfo info){
		EiInfo outInfo = new EiInfo();
		try{
			TExpensetypeTemplate expenseTypeTemplate = new TExpensetypeTemplate();
			info.setMethodParam(MethodParamConstants.sqlName, "tExpensetypeTemplate.empty");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, expenseTypeTemplate);
			info.addBlock("result");
			info.getBlock(EiConstant.resultBlock).setBlockMeta(expenseTypeTemplate.eiMetadata);
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
