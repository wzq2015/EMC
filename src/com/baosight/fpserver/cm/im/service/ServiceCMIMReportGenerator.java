package com.baosight.fpserver.cm.im.service;

import java.text.SimpleDateFormat;
import java.util.*;

import net.sf.json.JSONObject;
import com.baosight.fpserver.cm.im.domain.*;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.report.excel.ExcelExport;

public class ServiceCMIMReportGenerator extends ServiceEPBase
{
	public EiInfo queryReport(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		String strTemplateName = "";
		String strRelativeTemplateName = "";
		String strXlsFileName = "";
		String strRelativeXlsFileName = "";
		String strHtmlFileName = "";
		String strRelativeHtmlFileName = "";
		
		try 
		{
			strRelativeTemplateName = info.get("TemplateName").toString();
			String queryString = info.get("QueryString").toString();

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
			
			strRelativeXlsFileName = "ReportTemp/" + strTime + ".xls";
			strRelativeHtmlFileName = "ReportTemp/" + strTime + ".html";
			strTemplateName = path + "ReportTemplate/" + strRelativeTemplateName;
			strXlsFileName = path + strRelativeXlsFileName;
			strHtmlFileName = path + strRelativeHtmlFileName;
			outInfo.set("TempHtmlFileName", strRelativeHtmlFileName);
			outInfo.set("TempXlsFileName", strRelativeXlsFileName);
			ExcelExport ee = new ExcelExport();
			if (!ee.createNewXls(strTemplateName, strXlsFileName, queryString))
			{
				outInfo.set("errorcode", "-1");
				return outInfo;
			}
			if (!ee.convertToHtml(strXlsFileName, strHtmlFileName))
			{
				outInfo.set("errorcode", "-1");
				return outInfo;
			}
		}
		catch (Exception e)
		{	
			outInfo.set("errorcode", "-1");
		}

		return outInfo;
	}
	
	public void GenerateReport(int templateType, String templatePath, String queryString, TReportFixedperiodGenerated report)
	{
		try
		{
			String path = getClass().getProtectionDomain().getCodeSource().getLocation().getPath();
			if (path.indexOf("WEB-INF") > 0) 
			{
				path = path.substring(0, path.indexOf("WEB-INF/classes"));
			} 
			else
			{
				return;
			}
			
			SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmssSSS");
			String strTime = formatter.format(new Date());
			
			String strTemplateName = path + "ReportTemplate/" + templatePath;
			String strRelativeXlsFileName = "ReportTemp/" + strTime + ".xls";
			String strXlsFileName = path + strRelativeXlsFileName;
			
			ExcelExport ee = new ExcelExport();
			if (!ee.createNewXls(strTemplateName, strXlsFileName, queryString))
			{
				return;
			}
			byte[] htmlContentArray = ee.convertToHtmlContent(strXlsFileName);
			report.setF_reportFixedperiodGeneratedContent(htmlContentArray);
			
			Map params = new HashMap();
			if (templateType == 0)
			{
				params.put("f_reportTemplateId", report.getF_reportTemplateId());
				params.put("f_reportFixedperiodGeneratedCycleindex", report.getF_reportFixedperiodGeneratedCycleindex());
			}
			else if (templateType == 1)
			{
				params.put("f_reportTemplateId", report.getF_reportTemplateId());
				params.put("f_reportFixedperiodGeneratedYear", report.getF_reportFixedperiodGeneratedYear());
			}
			else
			{
				params.put("f_reportTemplateId", report.getF_reportTemplateId());
				params.put("f_reportFixedperiodGeneratedYear", report.getF_reportFixedperiodGeneratedYear());
				params.put("f_reportFixedperiodGeneratedIndex", report.getF_reportFixedperiodGeneratedIndex());
			}
			List reportResultList = this.dao.query("tReportFixedperiodGenerated.query", params, 0, 1000);
			if (reportResultList.size() == 0)
			{
				this.dao.insert("tReportFixedperiodGenerated.insert", report);
			}
			else if (reportResultList.size() == 1)
			{
				TReportFixedperiodGenerated oldreport = (TReportFixedperiodGenerated)(reportResultList.get(0));
				report.setF_reportFixedperiodGeneratedId(oldreport.getF_reportFixedperiodGeneratedId());
				this.dao.update("tReportFixedperiodGenerated.update", report);
			}
		}
		catch(Exception e)
		{
			
		}
	}
	
	public void AutoGenerateReport(EiInfo info)
	{
		Map params = new HashMap();
		params.put("f_reportTemplateAutogenerate", "1");
		List reportTemplateList = this.dao.query("tReportTemplate.query", params, 0, 1000);
		for (int i=0; i<reportTemplateList.size(); i++)
		{
			TReportTemplate template = (TReportTemplate)reportTemplateList.get(i);
			
			TReportFixedperiodGenerated report = new TReportFixedperiodGenerated();
			report.setF_reportTemplateId(template.getF_reportTemplateId());
			
			String templatePath = template.getF_reportTemplatePath();
			int templateType = template.getF_reportTemplateType();
			int projectId = template.getF_emcprojectId();
			if (templateType == 0)
			{
				Date nowDate = new Date();
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				Calendar calendar = Calendar.getInstance();
			    calendar.setTime(nowDate);
			    calendar.set(Calendar.DAY_OF_MONTH, calendar.get(Calendar.DAY_OF_MONTH) - 1);//设置为前一天
			    Date yesterdayDate = calendar.getTime();
			    String strYesterday = dateFormat.format(yesterdayDate);
			    
				params = new HashMap();
				params.put("f_emcprojectId", projectId);
				List cycleList = this.dao.query("tEmcprojectCycle.queryByProjectIdAndIndex", params, 0, 1000);
				for (int j=0; j<cycleList.size(); j++)
				{
					TEmcprojectCycle cycle = (TEmcprojectCycle)(cycleList.get(j));
					String endTime = cycle.getF_emcprojectCycleEndtime();
					if (endTime.contains(strYesterday))
					{
						report.setF_reportFixedperiodGeneratedCycleindex(cycle.getF_emcprojectCycleCycleindex());
						Map queryStringMap = new HashMap();
						queryStringMap.put("f_emcprojectId", projectId);
						queryStringMap.put("f_emcproject_cycle_index", cycle.getF_emcprojectCycleCycleindex());
						JSONObject queryStringJsonObject = JSONObject.fromObject(queryStringMap);
						GenerateReport(templateType, templatePath, queryStringJsonObject.toString(), report);
						break;
					}
				}
			}
			else
			{
				SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
				Date nowDate = new Date();
				Calendar calendar = Calendar.getInstance();
			    calendar.setTime(nowDate);
			    int year = calendar.get(Calendar.YEAR);
				int monthIndex = calendar.get(Calendar.MONTH);
				int dayIndex = calendar.get(Calendar.DAY_OF_MONTH);
				
				if (templateType == 1)
				{
					if ((monthIndex == 0) && (dayIndex == 1))
					{
						year = year - 1;
						report.setF_reportFixedperiodGeneratedYear(String.valueOf(year));
						String startTime = year + "-01-01 00:00:00";
						String endTime =  year + "-12-31 23:59:59";
						JSONObject queryStringJsonObject = new JSONObject();
						queryStringJsonObject.put("f_emcprojectId", projectId);
						queryStringJsonObject.put("starttime", startTime);
						queryStringJsonObject.put("endtime", endTime);
						queryStringJsonObject.put("year", year);
						GenerateReport(templateType, templatePath, queryStringJsonObject.toString(), report);
					}
				}
				else if (templateType == 2)
				{
					if (dayIndex == 1 && ((monthIndex%3) == 0))
					{
						int quarterIndex = 1;
						String startTime = "";
						String endTime = "";
						if (monthIndex == 3)
						{
							report.setF_reportFixedperiodGeneratedYear(String.valueOf(year));
							report.setF_reportFixedperiodGeneratedIndex(1);
							startTime = year + "-01-01 00:00:00";
							endTime = year + "-03-31 23:59:59";
							quarterIndex = 1;
						}
						else if (monthIndex == 6)
						{
							report.setF_reportFixedperiodGeneratedYear(String.valueOf(year));
							report.setF_reportFixedperiodGeneratedIndex(2);
							startTime = year + "-04-01 00:00:00";
							endTime = year + "-06-30 23:59:59";
							quarterIndex = 2;
						}
						else if (monthIndex == 9)
						{
							report.setF_reportFixedperiodGeneratedYear(String.valueOf(year));
							report.setF_reportFixedperiodGeneratedIndex(3);
							startTime = year + "-07-01 00:00:00";
							endTime = year + "-09-30 23:59:59";
							quarterIndex = 3;
						}
						else if (monthIndex == 0)
						{
							year = year - 1;
							report.setF_reportFixedperiodGeneratedYear(String.valueOf(year));
							report.setF_reportFixedperiodGeneratedIndex(4);
							startTime = year + "-10-01 00:00:00";
							endTime = year + "-12-31 23:59:59";
							quarterIndex = 4;
						}
						JSONObject queryStringJsonObject = new JSONObject();
						queryStringJsonObject.put("f_emcprojectId", projectId);
						queryStringJsonObject.put("starttime", startTime);
						queryStringJsonObject.put("endtime", endTime);
						queryStringJsonObject.put("year", year);
						queryStringJsonObject.put("quarter", quarterIndex);
						GenerateReport(templateType, templatePath, queryStringJsonObject.toString(), report);
					}
				}
				else if (templateType == 3)
				{
					if (dayIndex == 1)
					{
						int month = 1;
						if (monthIndex == 0)
						{
							year = year - 1;
							month = 12;
							report.setF_reportFixedperiodGeneratedYear(String.valueOf(year));
							report.setF_reportFixedperiodGeneratedIndex(12);
						}
						else
						{
							month = monthIndex;
							report.setF_reportFixedperiodGeneratedYear(String.valueOf(year));
							report.setF_reportFixedperiodGeneratedIndex(monthIndex);
						}

						calendar.set(Calendar.DAY_OF_MONTH, calendar.get(Calendar.DAY_OF_MONTH) - 1);
						Date yesterday = calendar.getTime();
						SimpleDateFormat monthFormat = new SimpleDateFormat("yyyy-MM");
						String startTime = monthFormat.format(yesterday) + "-01 00:00:00";
						String endTime = dateFormat.format(yesterday) + " 23:59:59";
						JSONObject queryStringJsonObject = new JSONObject();
						queryStringJsonObject.put("f_emcprojectId", projectId);
						queryStringJsonObject.put("starttime", startTime);
						queryStringJsonObject.put("endtime", endTime);
						queryStringJsonObject.put("year", year);
						queryStringJsonObject.put("month", month);
						GenerateReport(templateType, templatePath, queryStringJsonObject.toString(), report);
					}
				}
				else if (templateType == 4)
				{
					calendar.set(Calendar.DAY_OF_MONTH, calendar.get(Calendar.DAY_OF_MONTH) - 1);
					if ((monthIndex == 0) && (dayIndex == 1))
					{
						report.setF_reportFixedperiodGeneratedYear(String.valueOf(year - 1));
						report.setF_reportFixedperiodGeneratedIndex(1231);
					}
					else if (dayIndex == 1)
					{
						report.setF_reportFixedperiodGeneratedYear(String.valueOf(year));
						int day = calendar.get(Calendar.DAY_OF_MONTH);
						String strIndex = String.valueOf(monthIndex) + String.valueOf(day);
						report.setF_reportFixedperiodGeneratedIndex(Integer.parseInt(strIndex));
					}
					else
					{
						report.setF_reportFixedperiodGeneratedYear(String.valueOf(year));
						int day = dayIndex - 1;
						String strIndex = "";
						if (day < 10)
						{
							strIndex = String.valueOf(monthIndex + 1) + "0" + String.valueOf(day);
						}
						else
						{
							strIndex = String.valueOf(monthIndex + 1) + String.valueOf(day);
						}
						report.setF_reportFixedperiodGeneratedIndex(Integer.parseInt(strIndex));
					}
					
					Date yesterday = calendar.getTime();
					String startTime = dateFormat.format(yesterday) + " 00:00:00";
					String endTime = dateFormat.format(yesterday) + " 23:59:59";
					JSONObject queryStringJsonObject = new JSONObject();
					queryStringJsonObject.put("f_emcprojectId", projectId);
					queryStringJsonObject.put("starttime", startTime);
					queryStringJsonObject.put("endtime", endTime);
					queryStringJsonObject.put("day", dateFormat.format(yesterday));
					GenerateReport(templateType, templatePath, queryStringJsonObject.toString(), report);
				}
			}
		}
	}
}