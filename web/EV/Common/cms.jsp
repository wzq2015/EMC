
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.soa.SoaManager"%>
<%@page import="com.baosight.iplat4j.core.ei.EiInfo"%>
<%@page import="com.baosight.iplat4j.core.ei.EiBlock"%>
<%@page import="com.baosight.iplat4j.core.ei.EiConstant"%>

<%@page import="java.net.URLDecoder"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>
<style type="text/css">
            *{margin: 0px; padding:0px;}
            body { font-family:"宋体"; font-size:12px; padding:0px;}
            .news{}
            .news li{ list-style:none; clear:both;}
            .news li a#n1{ text-decoration:none; float:left; line-height:20px;}
            .news li a#n2{ text-decoration:none; float:right; color:#999}
</style>
</head>
<body class="bodyBackground">
<%
  String resourceType=request.getParameter("resourceType");
  String portlet_Id=request.getParameter("portletId");
  String portletId = URLDecoder.decode(portlet_Id);
  String userId=request.getParameter("userId");
  String tab_Id=request.getParameter("tabId");
  String tabId = URLDecoder.decode(tab_Id);

  EiInfo info=new EiInfo();
  info.set(EiConstant.serviceName, "EV01");
  info.set(EiConstant.methodName, "getCmsContentInfo");
  info.set("resourceType",resourceType);
  info.set("portletId",portletId);
  info.set("userId",userId);
  info.set("tabId",tabId);
  EiInfo outInfo=SoaManager.invoke(info);
  EiBlock block=outInfo.getBlock(EiConstant.resultBlock);
  
  String contentFontColor=block.getString("contentFontColor");
  String returnType=block.getString("returnType");
  if(contentFontColor.trim().equals("")){
	  contentFontColor="#999";
  }
  String contentFontSize="2";//block.getString("contentFontSize");
  String contentFontType=block.getString("contentFontType");
  if(block.getRowCount()>0){
	  if(!returnType.equals("article")){
	  out.println("<ul class=\"news\">");
	  out.println("	<font  size=\""+contentFontSize+"\" face=\""+contentFontType+"\" >");	  
	  for(int i=0;i<block.getRowCount();i++){
		String title=block.getCellStr(i,"title");
		if(title.length()>22){
			title=title.substring(0,22)+"...";
		}
		String link=block.getCellStr(i,"link");
		String pubDate=block.getCellStr(i,"pubDate");
		if(pubDate.equals("")){//栏目无时间信息
			//out.println("		<li class=\"cms_content\"><a target=\"_blank\" href=\""+link+"\">"+title+"</a></li>");
			out.println("		<li><a onload=\"sub('aa')\"  target=\"_blank\" style=\" color:"+contentFontColor+"\"  href=\"../../"+link+"\" id=n1>&nbsp;&nbsp;<div>"+title+"</div></a></li>");
		}else{
			//out.println("		<li class=\"cms_content\"><a target=\"_blank\" href=\""+link+"\">"+title+"["+pubDate+"]</a></li>");
			out.println("		<li><a target=\"_blank\" style=\" color:"+contentFontColor+"\"  href=\"../../"+link+"\" id=n1>&nbsp;&nbsp;"+title+"</a><a id=n2>"+pubDate+"&nbsp;&nbsp;</a></li>");
		}
	  }
	  out.println("		<li><a id=n2 target=\"_blank\"   style=\" color:"+contentFontColor+"\"  href=\"../../"+block.get("more_url")+"\">更多&nbsp;&nbsp;&nbsp;&nbsp;</a></li>");
	  out.println("</font>");
	  out.println("</ul>");
	  }else{//显示Cognos类型文章
		  String link=block.getCellStr(0,"link");
	      if (!link.trim().equals("") && link!=null)
		      out.println("<iframe src='"+link+"' height='100%' width='100%' scrolling='No'></iframe>");
	      else
	    	  out.println("<a style='color:red'>Cognos文章内容为空！</a>");
	  }
  }else{
	  out.println("<a style='color:red'>未找到地址，请检查地址，可能地址为空,或不正确！</a>");
  }
%>

</body>
<script language="JavaScript">

function sub(str){
var a = document.body.clientWidth;
	alert(a);
}

</script>
</html>

