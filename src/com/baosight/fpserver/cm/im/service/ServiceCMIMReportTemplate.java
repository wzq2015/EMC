package com.baosight.fpserver.cm.im.service;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.ep.util.MethodParamConstants;

public class ServiceCMIMReportTemplate extends ServiceEPBase
{
	public EiInfo queryReportTemplateByProjectId(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TReportTemplate reportTemplate = new TReportTemplate();
			info.addBlock("inqu_status");
			info.getBlock("inqu_status").setBlockMeta(reportTemplate.eiMetadata);
			info.addBlock("result");
			info.getBlock("result").set(EiConstant.limitStr, "-1");
			
			Object f_emcprojectId = info.get("f_emcprojectId");
			info.set("inqu_status-0-f_emcprojectId", f_emcprojectId);
			Object f_reportTemplateAutogenerate = info.get("f_reportTemplateAutogenerate");
			if ((f_reportTemplateAutogenerate != null) && (f_reportTemplateAutogenerate.toString().equals("1")))
			{
				info.set("inqu_status-0-f_reportTemplateAutogenerate", "1");
			}
			info.setMethodParam(MethodParamConstants.sqlName, "tReportTemplate.query");
			info.setMethodParam(MethodParamConstants.daoEPBaseBean, reportTemplate);
			
			outInfo = super.query(info, true);
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(reportTemplate.eiMetadata);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
	
	public EiInfo insertReportTemplate(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TReportTemplate reportTemplate = new TReportTemplate();
			
			reportTemplate.setF_emcprojectId(Integer.parseInt(info.get("f_emcprojectId").toString()));
			reportTemplate.setF_reportTemplateName(info.get("f_reportTemplateName").toString());
			reportTemplate.setF_reportTemplateDesc(info.get("f_reportTemplateDesc").toString());
			reportTemplate.setF_reportTemplateType(Integer.parseInt(info.get("f_reportTemplateType").toString()));
			reportTemplate.setF_reportTemplatePath(info.get("f_reportTemplatePath").toString());
			reportTemplate.setF_reportTemplateAutogenerate(Integer.parseInt(info.get("f_reportTemplateAutogenerate").toString()));
			
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date nowDate = new Date();
			String nowDateStr = dateFormat.format(nowDate);
			reportTemplate.setF_reportTemplateModifiedtime(nowDateStr);
			
			this.dao.insert("tReportTemplate.insert", reportTemplate);
			
			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "增加报表模板" + info.get("f_reportTemplateName").toString());
			if (log != null) 
			{
				this.dao.insert("tOperationLog.insert", log);
			}
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo updateReportTemplate(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TReportTemplate reportTemplate = new TReportTemplate();
			
			reportTemplate.setF_reportTemplateId(Integer.parseInt(info.get("f_reportTemplateId").toString()));
			reportTemplate.setF_emcprojectId(Integer.parseInt(info.get("f_emcprojectId").toString()));
			reportTemplate.setF_reportTemplateName(info.get("f_reportTemplateName").toString());
			reportTemplate.setF_reportTemplateDesc(info.get("f_reportTemplateDesc").toString());
			reportTemplate.setF_reportTemplateType(Integer.parseInt(info.get("f_reportTemplateType").toString()));
			reportTemplate.setF_reportTemplatePath(info.get("f_reportTemplatePath").toString());
			reportTemplate.setF_reportTemplateAutogenerate(Integer.parseInt(info.get("f_reportTemplateAutogenerate").toString()));
			
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date nowDate = new Date();
			String nowDateStr = dateFormat.format(nowDate);
			reportTemplate.setF_reportTemplateModifiedtime(nowDateStr);
			
			this.dao.update("tReportTemplate.update", reportTemplate);
			
			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "修改报表模板" + info.get("f_reportTemplateName").toString());
			if (log != null)
			{
				this.dao.insert("tOperationLog.insert", log);
			}
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo deleteReportTemplate(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		try
		{
			TReportTemplate reportTemplate = new TReportTemplate();
			reportTemplate.setF_reportTemplateId(Integer.parseInt(info.get("f_reportTemplateId").toString()));
			this.dao.delete("tReportTemplate.delete", reportTemplate);
			
			TOperationLog log = OperationLogHelper.GenerateOperationLog(2, "删除报表模板");
			if (log != null)
			{
				this.dao.insert("tOperationLog.insert", log);
			}
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
}