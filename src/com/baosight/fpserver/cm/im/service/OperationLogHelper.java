package com.baosight.fpserver.cm.im.service;

import com.baosight.fpserver.cm.im.domain.TOperationLog;
import com.baosight.iplat4j.core.threadlocal.UserSession;
import java.text.SimpleDateFormat;
import java.util.Date;

public class OperationLogHelper 
{
	public static TOperationLog GenerateOperationLog(int logType, String logContent)
	{
		TOperationLog operationlog = new TOperationLog();
		try
		{
			operationlog.setF_operationType(logType);
			operationlog.setF_operationContent(logContent);
			
			String projectId = UserSession.getInSessionProperty("projectId").toString();
			String userName = UserSession.getLoginName();
			String clientIP = UserSession.getIpaddress();
			
			operationlog.setF_emcprojectId(Integer.parseInt(projectId));
			operationlog.setF_userName(userName);
			operationlog.setF_operationClientip(clientIP);
			
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date nowDate = new Date();
			String nowDateStr = dateFormat.format(nowDate);
			operationlog.setF_operationTime(nowDateStr);
		}
		catch(Exception e)
		{
			return null;
		}

		return operationlog;
	}
}
