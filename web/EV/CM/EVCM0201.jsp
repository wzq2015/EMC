
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
	<script type="text/javascript" src="./EV/CM/EVCM0201.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EVCM0201" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include> 
<script type="text/javascript">  efbutton.config.HIDE_FORBIDDEN = "true"; </script>
<div id = "ef_region_result" title="Portlet信息" style="overflow:scroll"> 
	<div style="overflow:hidden;width:100%" id="tag">
		<table>		  
		  <tr>
		    <td  nowrap width="15%">Portlet标识</td><td>&nbsp;</td>
		    <td   width="85%">
		       <table>
		       <td>
			   <EF:EFInput blockId="result" ename="portletId" row="0"
			   etc="nullable='false' minLength='1' maxLength='50' errorPrompt='Portlet标识应该由至少1个，最多50个字节大小的字符组成' "/>					
		       </td>
		       <td><b style="color: red">*Portlet标识中所有大写字母最终转换为小写字母来保存</b></td>
		       </table>
		    </td>
		  </tr> 
		   
		  <tr> 
		    <td  nowrap width="15%">Portlet名称</td><td>&nbsp;</td>
		    <td width="85%">
		       <table>
		       <td>
			   <EF:EFInput blockId="result" ename="portletName" row="0" trim="false" 
			   etc="nullable='false' minLength='1' maxLength='50' errorPrompt='Portlet名称应该由至少1个，最多50个字节大小的字符组成。' "/>
			   </td>
			   <td></td>
			   </table>					
		    </td>	
		  </tr> 
		   
		    <tr> 
		    <td  nowrap width="15%">Portlet来源</td><td>&nbsp;</td>
		    <td   width="85%">
		       <table>
		       <td>
			   <EF:EFSelect blockId="result" ename="portletSource" row="0" etc="onchange='selectCity()'">
				  <EF:EFOption value="1" label="用户自定义" />
			      <EF:EFOption value="0" label="来自平台" />
			      <EF:EFOption value="2" label="来自内容管理" />
	          </EF:EFSelect>
	          </td>
	          <td></td>
	          </table>
		    </td>	
		   </tr> 
		   
		  <tr> 
		    <td  nowrap width="15%">Portlet内容类型</td><td>&nbsp;</td>
		    <td   width="85%">
		       <table>
		       <td>
			   <EF:EFSelect blockId="result" ename="portletContentType" row="0" etc="onchange='selectPortletType()'">
				  <EF:EFOption value="1" label="IFrame" />
     		      <EF:EFOption value="2" label="RSS" />
     		      <EF:EFOption value="3" label="DIV" />
                  <EF:EFOption value="4" label="内容接口" />
	          </EF:EFSelect>
	          </td>
	          <td></td>
	          </table>
		    </td>	
		   </tr> 
		   
		   <tr> 
		    <td  nowrap width="15%">Portlet资源类型</td><td>&nbsp;</td>
		    <td   width="85%">
		       <table>
		       <td>
			   <EF:EFSelect blockId="result" ename="portletResourceType" row="0" etc="onchange='selectPortletType()'">
			   	  <EF:EFOption value="2" label="匿名类" />
				  <EF:EFOption value="0" label="公用类" />
                  <EF:EFOption value="1" label="授权类" />
	          </EF:EFSelect>
	          </td>
	          <td></td>
	          </table>
		    </td>	
		   </tr> 
		   
		   <tr> 
		    <td  nowrap width="15%">Portlet地址</td><td>&nbsp;</td>
		    <td   width="85%">
		      <table>
			  <td> 
			  <EF:EFInput blockId="result" ename="portletUrl" row="0" trim="false" type="textarea"
			  etc="style='width:400px;height:50px'   nullable='false' minLength='1' maxLength='1000' errorPrompt='Portlet地址应该由至少1个，最多1000个字节大小的字符组成。' "/>
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
		       <td><div id="sso">
			   <EF:EFSelect blockId="result" ename="ssoSystemId" row="0" etc="style='width:150' onchange='selectSsoSystemId()'">
                  <EF:EFOption value=" " label="不使用"/>
                  <EF:EFOptions blockId="result_system" labelColumn="systemName" valueColumn="systemId" conj="-"/>
               </EF:EFSelect>
	          </div></td>
	          <td></td>
	          </table>
		    </td>		
		  </tr> 

		  
		   <tr>
		  	<td  nowrap width="15%">是否使用个性参数</td><td>&nbsp;</td>
		     <td   width="85%">
				是<EF:EFInput type="radio" blockId="result" ename="charParameter" row="0" value="1" />
				否<EF:EFInput type="radio" blockId="result" ename="charParameter" row="0" value="0" />
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
