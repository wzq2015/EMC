package com.baosight.iplat4j.ee.dm.service;

import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;

/**
 * 
 * @author wangyuqiu
 *
 */

public class ServiceEEDM30 extends ServiceEPBase {
	private static final String HTML = "html";
	
	
	public EiInfo query(EiInfo info){
		
		info.set(HTML, "<div id="+info.getString("portlet_id")+"_div_content>"+
				
				"portletID:"+info.getString("portlet_id")+
				info.getString(EiConstant.serviceName)+"."+info.getString(EiConstant.methodName)
				+ info.getString("id")
				+"</div>" 
				+"<style type=\"text/css\">"
				+"* {margin:0; padding:0}"
				+".menu {position:relative; background:url(EF/Images/load_01.jpg) no-repeat; height:35px; width:300px}"
				+".menu ul {list-style:none; z-index:10; position:absolute; z-index:100; padding:9px 5px}"
				+".menu li {float:left}"
				+".menu a, .menu a:active, .menu a:visited, .menu a:hover {text-decoration:none; color:#FFF; padding:10px}"
				+"#slide {position:absolute; top:6px; height:24px; background:#89957a; z-index:10}"
				+"</style>"				
				+"<div class=\"menu\"><ul id=\"menu\"><li><a href=\"#\">内容管理</a></li>"
			    +"<li value=\"1\"><a href=\"#\">门户管理</a></li>"
		        +"<li><a href=\"#\">系统平台</a></li>"
		        +"<li><a href=\"#\">"+info.getString("id")+"</a></li>"
		        +"</ul><div id=\"slide\"></div></div>"
				+"<script src=\"./EE/DM/EEDM30.js\"></script>" 

				);
		
		return info;
	}
}
