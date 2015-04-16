package com.baosight.fpserver.cm.im.service;

import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.core.ei.EiInfo;
import java.util.*;

public class ServiceCMIMSendPhoneMessage extends ServiceEPBase
{
	public void SendMessage(EiInfo info)
	{
		 Map queryMap = new HashMap();
		 List list = dao.query("User.Query", null);
		 
		 
		
	}
}
