
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	String portalId = request.getParameter("portalId");
	String themaPath = request.getParameter("themaPath"); 
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>
<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EV/EV12.js"></script>
<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
<link href="./EF/EF.css" rel="stylesheet" type="text/css" />
<link href="./EV/skins/default/ev.css" rel="stylesheet" type="text/css" />
<link href="./EV/skins/<%=themaPath%>/ev.css" rel="stylesheet" type="text/css" />
</head>
<body class="bodyBackground" style="overflow-y:hidden">
<table width="100%" border="0" align="center" >  
  <tr>
  	<td colspan="1"  align="left">可选 Portlet</td>
  	<td >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已选 Portlet</td>
  </tr>
  
  <tr>  
    <td align="right">  
      <select name="input" size="10" multiple="multiple" id="inputSelPor" style="width:160px; height:400px ;font-size:12px">  
      </select>  
    </td>  
    
    <td>
    <table   height="100%" align="left" style="height:380px">
    <tr>
    <td align="center" colspan="1">   
  
      <p>  
        <input type="button" name="Submit" value=" --> " onclick="rightMovePortlet();"/>  
      </p>  
      <p>  
        <input type="button" name="Submit2" value=" <-- " onclick="leftMovePortlet();"/>  
      </p>  
    </td> 
     
    
    <td colspan="3"> 
       <select name="output" size="10" onchange="highlightTab(this);" multiple="multiple" id="outputSelPor" style="width:200px;height:210px; font-size:12px"> 
      </select>  
    </td>
    
    </tr>
     <tr>
     <td colspan="1" ></td>
     <td colspan="1" >可选 Tab</td>
     <td colspan="1" ></td>
     <td colspan="1" >已选 Tab</td>
     </tr>
    <tr>
   	<td colspan="1">
   	</td> 
    <td colspan="1"> 
       <select name="output" size="10" multiple="multiple" id="inputSelTab" style="width:80px; font-size:12px">
      </select>  
    </td>
    <td align="center" colspan="1">   
  
      <p>  
        <input type="button" name="Submit" value=" --> " onclick="rightMoveTab();"/>  
      </p>  
      <p>  
        <input type="button" name="Submit2" value=" <-- " onclick="leftMoveTab();"/>    
      </p>  
    </td>  
    
    <td colspan="1"> 
       <select name="output" size="10" multiple="multiple" id="outputSelTab" style="width:80px; font-size:12px">  
      </select>  
    </td>
    </tr>
    </table>
    </td>
  </tr>  
</table>  

<div class='window_contentbottom' style='top:431;width:446px'>
	<table width='200' align='right'>
		<tr align='center'>
			<td width='122'>
			<input name='Submit' type='submit' class='button' value='确 定' onclick='save()'>
			</td>
			
			<td width='104'>
			<input name='Submit2' type='submit' class='button' value='取 消' onclick="parent.closeDiv('portletDiv')">
			</td>
		</tr>
	</table>
</div>
	
</body>
</html>
<EF:EiInfo/>
