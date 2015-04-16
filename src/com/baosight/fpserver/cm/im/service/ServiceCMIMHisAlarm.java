package com.baosight.fpserver.cm.im.service;

import java.util.*;
import com.baosight.fpserver.cm.im.domain.Hisalarm;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.threadlocal.UserSession;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceCMIMHisAlarm extends ServiceEPBase
{
	public EiInfo queryHisAlarms(EiInfo info)
	{	 
		EiInfo outInfo = new EiInfo();
		
		try
		{
			Hisalarm hisalarm = new Hisalarm();
			Map params = new HashMap();
			Object projectPreName = UserSession.getInSessionProperty("projectPreName");
			if (projectPreName != null)
			{
				params.put("ProjectName", projectPreName);
			}
			Object startTime = info.get("StartTime");
			if (startTime != null)
			{
				params.put("StartTime", startTime);
			}
			Object endTime = info.get("EndTime");
			if (endTime != null)
			{
				params.put("EndTime", endTime);
			}
			List result = this.dao.query("hisalarm.query", params);
			for (int i=0; i<result.size(); i++)
			{
				Hisalarm alarm = (Hisalarm)(result.get(i));
				String status = alarm.getFdStatus();
				String newStatus = Decoding(status);
				alarm.setFdStatus(newStatus);
				String egu = alarm.getFdEgu();
				String newEgu = Decoding(egu);
				alarm.setFdEgu(newEgu);
			}
			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(hisalarm.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch(Exception e)
		{
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo queryHisAlarmsByPage(EiInfo info) {
		EiInfo outInfo = new EiInfo();
		try {
			Hisalarm hisalarm = new Hisalarm();
			Map params = new HashMap();
			int pageSize = Integer.parseInt(info.get("pageSize").toString());
			int pageNumber = Integer.parseInt(info.getString("pageNumber").toString());
			Object startTime = info.get("startTime");
			if (startTime != null) {
				params.put("StartTime", startTime);
			}
			Object endTime = info.get("endTime");
			if (endTime != null) {
				params.put("EndTime", endTime);
			}
			String tagName = info.get("tagName").toString();
			if ((tagName != null) && !tagName.isEmpty()) {
				params.put("tagName", tagName);
			}
			List result = this.dao.query("hisalarm.query", params, pageSize*(pageNumber-1), pageSize);
			for (int i=0; i<result.size(); i++) {
				Hisalarm alarm = (Hisalarm)(result.get(i));
				String status = alarm.getFdStatus();
				String newStatus = Decoding(status);
				alarm.setFdStatus(newStatus);
				String egu = alarm.getFdEgu();
				String newEgu = Decoding(egu);
				alarm.setFdEgu(newEgu);
				if (alarm.getFdConfirmtime().startsWith("1970")){
					alarm.setFdConfirmtime("");
				}
				if (alarm.getFdRecovertime().startsWith("1970")){
					alarm.setFdRecovertime("");
				}
			}
			outInfo.addBlock("result");
			outInfo.getBlock(EiConstant.resultBlock).setBlockMeta(hisalarm.eiMetadata);
			outInfo.getBlock(EiConstant.resultBlock).setRows(result);
		}
		catch(Exception e) {
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	public EiInfo countHisAlarms(EiInfo info) {
		EiInfo outInfo = new EiInfo();
		try {
			Hisalarm hisalarm = new Hisalarm();
			Map params = new HashMap();
			Object startTime = info.get("startTime");
			if (startTime != null) {
				params.put("StartTime", startTime);
			}
			Object endTime = info.get("endTime");
			if (endTime != null) {
				params.put("EndTime", endTime);
			}
			String tagName = info.get("tagName").toString();
			if ((tagName != null) && !tagName.isEmpty()) {
				params.put("tagName", tagName);
			}
			List result = this.dao.query("hisalarm.count", params);
			outInfo.set("count", result.get(0));
		}
		catch(Exception e) {
			outInfo.set("errorcode", "-1");
		}
		
		return outInfo;
	}
	
	private String Decoding(String decodingStr) throws Exception
	{
		byte[] oldbuffer = decodingStr.getBytes("utf-8");
		byte[] newbuffer = new byte[oldbuffer.length/2];
		for (int j=0; j<oldbuffer.length; j+=2)
		{
			if (oldbuffer[j] == -61)
			{
				newbuffer[j/2] = (byte)(oldbuffer[j+1] + 64);
			}
			else 
			{
				newbuffer[j/2] = oldbuffer[j+1];
			}
		}
		String result = new String(newbuffer, "gb2312");
		return result;
	}
}