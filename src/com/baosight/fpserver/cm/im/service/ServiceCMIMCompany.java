package com.baosight.fpserver.cm.im.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMCompany extends ServiceEPBase
{
	public EiInfo queryCompanies(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TCompany company = new TCompany();
			info.setMethodParam(MethodParamConstants.sqlName, "tCompany.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, company);
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(company.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo queryCompanyById(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TCompany company = new TCompany();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(company.eiMetadata);
			
			Object f_companyId = info.get("f_companyId");
			info.set("inqu_status-0-f_companyId", f_companyId);
			
			info.setMethodParam(MethodParamConstants.sqlName, "tCompany.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, company);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(company.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo insertCompany(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();

		try
		{
			TCompany company = new TCompany();
			
			company.setF_areaId(Integer.parseInt(info.get("f_areaId").toString()));
			company.setF_parentCompanyId(Integer.parseInt(info.get("f_parentCompanyId").toString()));
			company.setF_companyName(info.get("f_companyName").toString());
			company.setF_companyDesc(info.get("f_companyDesc").toString());
			company.setF_companyAddress(info.get("f_companyAddress").toString());
			company.setF_companyAccount(info.get("f_companyAccount").toString());
			company.setF_companyTaxnumber(info.get("f_companyTaxnumber").toString());
			company.setF_companyBank(info.get("f_companyBank").toString());
			company.setF_companyOrgcode(info.get("f_companyOrgcode").toString());
			company.setF_companyZipcode(info.get("f_companyZipcode").toString());
			
			this.dao.insert("tCompany.insert", company);
			
			Map params = new HashMap();
			params.put("f_companyName", info.get("f_companyName").toString());
			List resultList = this.dao.query("tCompany.query", params);
			
			if (resultList == null) {
				outInfo.set("errorcode", "-1");
				return outInfo;
			}
			
			TCompany newCompany = (TCompany)(resultList.get(0));
			outInfo.set("addType", "company");
			outInfo.set("newId", newCompany.getF_companyId());
			outInfo.set("name", newCompany.getF_companyName());
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateCompany(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TCompany company = new TCompany();
			
			company.setF_companyId(Integer.parseInt(info.get("f_companyId").toString()));
			company.setF_companyName(info.get("f_companyName").toString());
			company.setF_companyDesc(info.get("f_companyDesc").toString());
			company.setF_companyAddress(info.get("f_companyAddress").toString());
			company.setF_companyAccount(info.get("f_companyAccount").toString());
			company.setF_companyTaxnumber(info.get("f_companyTaxnumber").toString());
			company.setF_companyBank(info.get("f_companyBank").toString());
			company.setF_companyOrgcode(info.get("f_companyOrgcode").toString());
			company.setF_companyZipcode(info.get("f_companyZipcode").toString());
			
			this.dao.update("tCompany.update", company);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo deleteCompany(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		try
		{
			TCompany company = new TCompany();
			company.setF_companyId(Integer.parseInt(info.get("f_companyId").toString()));
			this.dao.delete("tCompany.delete", company);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}