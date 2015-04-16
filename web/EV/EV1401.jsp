
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
	<script type="text/javascript" src="./EV/EV1401.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EV1401" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include> 
<div id = "ef_region_result" title="菜单信息" style="overflow:scroll"> 
	<div style="overflow:hidden;width:100%" id="tag">
		<table>		  
		  <tr>
		    <td  nowrap width="15%">节点树英文名</td><td>&nbsp;</td>
		    <td   width="85%">
		       <table>
		       <td>
			   <EF:EFInput blockId="result" ename="treeEname" row="0"
			   etc="nullable='false' minLength='1' maxLength='50'   errorPrompt='节点树英文名应该由至少一个，最多50个字节大小的字符组成' "/>					
		       </td>
		       <td></td>
		       </table>
		    </td>
		  </tr> 
		   
		  <tr> 
		    <td  nowrap width="15%">节点英文名</td><td>&nbsp;</td>
		    <td width="85%">
		       <table>
		       <td>
			   <EF:EFInput blockId="result" ename="nodeEname" row="0" trim="false"
			   etc="nullable='false' minLength='1' maxLength='50' errorPrompt='节点英文名应该由至少一个，最多50个字节大小的字符组成。'"/>
			   </td>
			   <td></td>
			   </table>					
		    </td>	
		  </tr> 
		   
		   <tr> 
		    <td  nowrap width="15%">菜单类型</td><td>&nbsp;</td>
		    <td   width="85%">
		       <table>
		       <td>
			   <EF:EFSelect blockId="result" ename="menuType" row="0" etc="onchange='selectCity()'">
				  <EF:EFOption value="0" label="来自平台" />
			      <EF:EFOption value="1" label="用户自定义" />
			      <EF:EFOption value="2" label="来自内容管理" />
	          </EF:EFSelect>
	          </td>
	          <td></td>
	          </table>
		    </td>	
		   </tr> 
		   
		   <tr > 
		    <td  nowrap width="15%">菜单名称</td><td>&nbsp;</td>
		    <td width="85%">
		        <table>
		        <td>
			    <EF:EFInput blockId="result" ename="menuCname" row="0" trim="false"
			  	etc="nullable='false' minLength='1' maxLength='100' errorPrompt='菜单名称应该由至少一个，最多100个字节大小的字符组成。'"/>					
			  	</td>
			  	<td></td>
			  	</table>				
		    </td>	
		   </tr> 
		   
		   <tr> 
		    <td  nowrap width="15%">节点类型</td><td>&nbsp;</td>
		    <td   width="85%">
		       <table>
		       <td>
			   <EF:EFSelect blockId="result" ename="nodeType" row="0" etc="">
				  <EF:EFOption value="0" label="树节点" />
				  <EF:EFOption value="1" label="叶子节点" />
	          </EF:EFSelect>
	          </td>
	          <td></td>
	          </table>
		    </td>
		   </tr> 

		   <tr> 
		    <td  nowrap width="15%">菜单地址</td><td>&nbsp;</td>
		    <td   width="85%">
		      <table>
			  <td> 
			  <EF:EFInput blockId="result" ename="menuUrl" row="0" trim="false" type="textarea"
			  etc="nullable='false' minLength='1' maxLength='1000' errorPrompt='菜单地址应该由至少1个，最多1000个字节大小的字符组成。' "/>
			  </td>
			  <td>
			  <div id="img" align="center" > </div>
			  </td>
			  </table>				
		    </td>	
		   </tr> 

		   <tr>
			<td  nowrap width="15%">节点排序标识</td><td>&nbsp;</td>
		    <td   width="85%">
		      <table>
		      <td>
			  <EF:EFInput blockId="result" ename="nodeSortId" row="0" trim="false"  etc="nullable='true' minLength='1' maxLength='50' errorPrompt='节点排序标识应该由至少一个，最多50个字节大小的字符组成。' "/>
			  </td>
			  <td></td>
			  </table>		
		    </td>	
		   </tr> 
		   
		   <tr>
			<td  nowrap width="15%">单点登录系统标识</td><td>&nbsp;</td>
		    <td   width="85%">
		       <EF:EFSelect blockId="result" ename="ssoSystemId" row="0" etc="style='width:150' onchange='selectSsoSystemId()'">
                  <EF:EFOption value=" " label="不使用"/>
                  <EF:EFOptions blockId="result_system" labelColumn="systemName" valueColumn="systemId" conj="-"/>
               </EF:EFSelect>
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
<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
