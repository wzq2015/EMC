package com.baosight.fpserver.cm.im.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import net.sf.json.*;

public class ServiceCMIMAlarm extends ServiceEPBase
{
	public EiInfo GetRealAlarms(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		String alarmUrl = GetAlarmUrl();
		try
		{	
			JSONObject getAlarmObj = new JSONObject();
			getAlarmObj.put("jsonrpc", "2.0");
			getAlarmObj.put("method", "getallalarms");
			getAlarmObj.put("id", 1);
			
			String result = GetHttpPostResponse(alarmUrl, getAlarmObj.toString());
			JSONObject resultJsonObj = JSONObject.fromObject(result);
			JSONObject alarmJsonObj = resultJsonObj.getJSONObject("result");
			JSONArray resultArray = null;
			if (alarmJsonObj.containsKey("all"))
			{
				resultArray = alarmJsonObj.getJSONArray("all");
			}
			else if (alarmJsonObj.containsKey("part"))
			{
				resultArray = alarmJsonObj.getJSONArray("part");
			}
			if ((resultArray != null) && (!resultArray.isEmpty()))
			{
				outInfo.addBlock("result").setRows(resultArray);
			}
			EiBlockMeta meta = new EiBlockMeta();
			meta.addMeta(new EiColumn("AlarmID"));
			meta.addMeta(new EiColumn("ServerName"));
			meta.addMeta(new EiColumn("TagName"));
			meta.addMeta(new EiColumn("TagValue"));
			meta.addMeta(new EiColumn("Desc"));
			meta.addMeta(new EiColumn("AlarmType"));
			meta.addMeta(new EiColumn("Confirmer"));
			meta.addMeta(new EiColumn("ConfirmStatus"));
			meta.addMeta(new EiColumn("ResumeStatus"));
			meta.addMeta(new EiColumn("OccurTime"));
			meta.addMeta(new EiColumn("ConfirmTime"));
			meta.addMeta(new EiColumn("ResumeTime"));
			meta.addMeta(new EiColumn("AlarmTimes"));
			meta.addMeta(new EiColumn("Priority"));
			meta.addMeta(new EiColumn("AlarmArea"));
			outInfo.addBlock("result").setBlockMeta(meta);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo ConfirmAlarm(EiInfo info) {
		EiInfo outInfo = new EiInfo();
		String alarmUrl = GetAlarmUrl();
		try {	
			String serverName = info.getString("serverName");
			String alarmId = info.getString("alarmId");
			JSONObject confirmAlarmObj = new JSONObject();
			confirmAlarmObj.put("jsonrpc", "2.0");
			confirmAlarmObj.put("method", "confirmalarm");
			confirmAlarmObj.put("id", 1);
			JSONArray paramArray = new JSONArray();
			JSONObject alarmObject = new JSONObject();
			alarmObject.put("ServerName", serverName);
			alarmObject.put("AlarmID", alarmId);
			paramArray.add(alarmObject);
			JSONArray paramObj = new JSONArray();
			paramObj.add(paramArray);
			confirmAlarmObj.put("params", paramObj);
			String result = GetHttpPostResponse(alarmUrl, confirmAlarmObj.toString());
			JSONObject resultJsonObj = JSONObject.fromObject(result);
			outInfo.set("confirmResult", resultJsonObj.get("result"));
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo GetAlarmProjects(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		ArrayList<String> alarmProjectList = new ArrayList<String>();
		String alarmUrl = GetAlarmUrl();
		try
		{	
			JSONObject getAlarmObj = new JSONObject();
			getAlarmObj.put("jsonrpc", "2.0");
			getAlarmObj.put("method", "getallalarms");
			getAlarmObj.put("id", 1);
			
			String result = GetHttpPostResponse(alarmUrl, getAlarmObj.toString());
			JSONObject resultJsonObj = JSONObject.fromObject(result);
			JSONObject alarmJsonObj = resultJsonObj.getJSONObject("result");
			JSONArray resultArray = null;
			if (alarmJsonObj.containsKey("all"))
			{
				resultArray = alarmJsonObj.getJSONArray("all");
			}
			else if (alarmJsonObj.containsKey("part"))
			{
				resultArray = alarmJsonObj.getJSONArray("part");
			}
			if ((resultArray != null) && (!resultArray.isEmpty()))
			{
				for (int i=0; i<resultArray.size(); i++)
				{
					JSONObject alarmObj = resultArray.getJSONObject(i);
					String tagName = alarmObj.getString("TagName").toString();
					int index = tagName.indexOf("_");
					String projectPre = tagName.substring(0, index);
					if (!alarmProjectList.contains(projectPre))
					{
						alarmProjectList.add(projectPre);
					}
				}
				String alarmProjectString = "";
				for (int i=0; i<alarmProjectList.size(); i++)
				{
					alarmProjectString = alarmProjectString + alarmProjectList.get(i) + ",";
				}
				alarmProjectString = alarmProjectString.substring(0, alarmProjectString.length() - 1);
				outInfo.set("alarmproject", alarmProjectString);
			}
			else
			{
				outInfo.set("alarmproject", "");
			}
			
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	private String GetAlarmUrl()
	{
		String alarmUrl = "http://localhost:5000/AlarmData";
		try
		{
			String path = getClass().getProtectionDomain().getCodeSource().getLocation().getPath();
			if (path.indexOf("WEB-INF") > 0) 
			{
				path = path.substring(0, path.indexOf("WEB-INF/classes"));
			}
			else
			{
				throw new Exception();
			}
			SAXReader saxReader = new SAXReader();
			Document document = saxReader.read(new File(path + "InitConf.xml"));
			Element root = document.getRootElement();
			Element dataserviceElement = root.element("DataService");
			String url = dataserviceElement.attributeValue("url");
			alarmUrl = url + "/AlarmData";
		}
		catch (Exception e) {}
		return alarmUrl;
	}
	
	private String GetHttpPostResponse(String url, String params)
	{
		PrintWriter outWriter = null;
        BufferedReader inReader = null;
        String result = "";
        
        try
        {
			URL postUrl = new URL(url);
			HttpURLConnection connection = (HttpURLConnection)postUrl.openConnection();
			connection.setConnectTimeout(3000);
			connection.setReadTimeout(3000);
			connection.setDoOutput(true);
			connection.setDoInput(true);
			
			outWriter = new PrintWriter(connection.getOutputStream());
			outWriter.print(params);
			outWriter.flush();
	        
	        inReader = new BufferedReader(new InputStreamReader(connection.getInputStream(), "utf-8"));
	        while (inReader.ready())
			{
	        	result = result + inReader.readLine() + "\r\n";
			}
        }
        catch(Exception e) { }
        finally
        {
        	try
        	{
                if (outWriter != null)
                {
                	outWriter.close();
                }
                if (inReader != null)
                {
                	inReader.close();
                }
            }
            catch(Exception e) { }
        }
		
		return result;
	}
}