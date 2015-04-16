package com.baosight.fpserver.cm.im.service;

import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceCMIMReportGenerated extends ServiceEPBase
{
	public EiInfo queryGeneratedReport(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();		
		try
		{
			String reportType = info.get("reportType").toString();
			
			Map params = new HashMap();
			if (reportType.equals("0"))
			{
				params.put("f_reportTemplateId", info.get("f_reportTemplateId").toString());
				params.put("f_reportFixedperiodGeneratedCycleindex", info.get("f_reportFixedperiodGeneratedCycleindex").toString());
			}
			else if (reportType.equals("1"))
			{
				params.put("f_reportTemplateId", info.get("f_reportTemplateId").toString());
				params.put("f_reportFixedperiodGeneratedYear", info.get("f_reportFixedperiodGeneratedYear").toString());
			}
			else if (reportType.equals("2") || reportType.equals("3") || reportType.equals("4"))
			{
				params.put("f_reportTemplateId", info.get("f_reportTemplateId").toString());
				params.put("f_reportFixedperiodGeneratedYear", info.get("f_reportFixedperiodGeneratedYear").toString());
				params.put("f_reportFixedperiodGeneratedIndex", info.get("f_reportFixedperiodGeneratedIndex").toString());
			}
			else
			{
				outInfo.set("errorcode", "-1");
				return outInfo;
			}

			List result = this.dao.query("tReportFixedperiodGenerated.query", params, 0, 1000);
			if (result.size() != 1)
			{
				outInfo.set("errorcode", "-1");
				return outInfo;
			}
			TReportFixedperiodGenerated report = (TReportFixedperiodGenerated)(result.get(0));
			
			String path = getClass().getProtectionDomain().getCodeSource().getLocation().getPath();
			if (path.indexOf("WEB-INF") > 0) 
			{
				path = path.substring(0, path.indexOf("WEB-INF/classes"));
			} 
			else 
			{
				outInfo.set("errorcode", "-1");
				return outInfo;
			}
			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
			String strTime = formatter.format(new Date());
			String relativeHtmlFileName = "ReportTemp/" + strTime + ".html";
			String strHtmlFileName = path + relativeHtmlFileName;
			FileOutputStream outStream = new FileOutputStream(strHtmlFileName);
			outStream.write(report.getF_reportFixedperiodGeneratedContent());
			outInfo.set("HtmlFileName", relativeHtmlFileName);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		return outInfo;
	}
}