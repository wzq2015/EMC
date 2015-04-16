<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>

<%
	String contextpath = request.getContextPath();
	String baseUrl = contextpath;
	String listUrl = baseUrl + "/DispatchAction.do";
%>

<html>
 <head>	
  <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
  <script type="text/javascript" src="./ES/ES29.js"></script>
 </head>
 
 <body class="bodyBackground">
 <form id="ES29" method="POST" action="<%=listUrl%>" >
 
  <jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

  <div id = "ef_region_inqu" title="修改密码" efRegionShowClear=true>
   <div>	
     <table>		  
		  <tr>
		    <td >
		     . EHR系统的人力资源信息每天会通过EAI系统传到服务器, 点击下面的按钮来同步当天的数据		      
		    </td>
		  </tr>
		  <tr>  
		    <td>
		      . 如果数据文件存放的目录发生变化, 请修改applicationContext-security.xml中相应的配置 
		    </td>	    
		  </tr>
     </table>
	</div>
   </div>
		
 <jsp:include flush="false" page="../EF/Form/iplat.ef.tail.jsp"></jsp:include> 		

 <EF:EFRegion/>
 </form>
 </body>
</html>
