
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<%
	String contextpath = request.getContextPath();
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/jQuery/jquery.js"></script>
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript" src="./EV/CM/EVCM0301.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EVCM0301" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include> 
<script type="text/javascript">  efbutton.config.HIDE_FORBIDDEN = "true"; </script>
<div id = "ef_region_result" title="Portlet Tab信息" style="overflow:scroll"> 
	<div style="overflow:hidden;width:100%" id="tag">
		<table>		
		  <tr> 
		    <td  nowrap width="15%">Tab标识</td><td>&nbsp;</td>
		    <td width="85%">
		       <table>
		       <td>
			   <EF:EFInput blockId="result" ename="tabId" row="0" trim="false"
			   etc="nullable='false' minLength='1' maxLength='50' errorPrompt='tab标识应该由至少一个，最多50个字节大小的字符组成。' "/>
			   </td>
			   <td></td>
			   </table>					
		    </td>	
		  </tr> 
		  
		  <tr>
		    <td  nowrap width="15%">Portlet标识</td><td>&nbsp;</td>
		    <td   width="85%">
		       <table>
		       <td>
			   <EF:EFInput blockId="result" ename="portletId" row="0"
			   etc="nullable='false' minLength='1' maxLength='50' errorPrompt='Portlet标识应该由至少一个，最多50个字节大小的字符组成' "/>	
			    </td>
		       <td>
		       <div id="portletImg"><img id='img_portlet' title="Portlet标识" id="tree_list_node" 
		       onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
		         onClick="openSelectPortlet('portletId');"></div>				
		       </td>
		       </table>
		    </td>
		  </tr> 
		  
		  <tr> 
		    <td  nowrap width="15%">Tab名称</td><td>&nbsp;</td>
		    <td width="85%">
		       <table>
		       <td>
			   <EF:EFInput blockId="result" ename="tabName" row="0" trim="false"
			   etc="nullable='false' minLength='1' maxLength='50' errorPrompt='tab名称应该由至少一个，最多50个字节大小的字符组成。' "/>
			   </td>
			   <td></td>
			   </table>					
		    </td>	
		  </tr> 
		  
		  <tr> 
		    <td  nowrap width="15%">Tab来源</td><td>&nbsp;</td>
		    <td   width="85%">
		       <table>
		       <td>
			   <EF:EFSelect blockId="result" ename="tabSource" row="0" etc="onchange='selectCity()'">
				  <EF:EFOption value="1" label="用户自定义" />
			      <EF:EFOption value="2" label="来自内容管理" />
			      <EF:EFOption value="0" label="来自平台" />
	          </EF:EFSelect>
	          </td>
	          <td></td>
	          </table>
		    </td>	
		   </tr> 
		  
		  <tr> 
		    <td  nowrap width="15%">Tab内容类型</td><td>&nbsp;</td>
		    <td   width="85%">
		       <table>
		       <td>
			   <EF:EFSelect blockId="result" ename="tabType" row="0" etc="onchange='changeTabTabSelect()'">
				  <EF:EFOption value="1" label="IFrame" />
     		      <EF:EFOption value="2" label="RSS" />
                  <EF:EFOption value="4" label="内容接口" />
	          </EF:EFSelect>
	          </td>
	          <td></td>
	          </table>
		    </td>	
		   </tr> 
		  
		  <tr> 
		    <td  nowrap width="15%">Tab地址</td><td>&nbsp;</td>
		    <td   width="85%">
		      <table>
			  <td> 
			  <EF:EFInput blockId="result" ename="tabUrl" row="0" trim="false" type="textarea"
			  etc="style='width:400px;height:50px'  nullable='false' minLength='1' maxLength='1000' errorPrompt='Tab地址应该由至少1个，最多1000个字节大小的字符组成。' "/>
			  </td>
			  <td>
			  <div id="img" align="center" > </div>
			  </td>
			  </table>				
		    </td>	
		   </tr> 
		  
		  <tr> 
		    <td  nowrap width="15%">单点登录系统标识</td><td>&nbsp;</td>
		     <td   width="85%">
		       <table>
		       <td>
			   <EF:EFSelect blockId="result" ename="ssoSystemId" row="0" etc="style='width:150' onchange='selectSsoSystemId()'">
                  <EF:EFOption value=" " label="不使用"/>
                  <EF:EFOptions blockId="result_system" labelColumn="systemName" valueColumn="systemId" conj="-"/>
               </EF:EFSelect>
	          </td>
	          <td></td>
	          </table>
		    </td>		
		  </tr> 
		</table>
		<table>
			<tr>
			<td nowrap width="15%">
			 <EF:EFInput blockId="result" ename="recCreator" row="0" trim="false" type="hidden"/>
			</td>
		    <td width="85%">
		      <table>
		      <td>
			   <EF:EFInput blockId="result" ename="recCreateTime" row="0" trim="false" type="hidden"/>
			  </td>
		      <td>
			   <EF:EFInput blockId="result" ename="archiveFlag" row="0" trim="false" type="hidden"/>
			  </td>
			  </table>		
		    </td>	
		   </tr>
		</table>
	</div>
</div>     
<EF:EFRegion/>
<jsp:include flush="false" page="../../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
