
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>
<%
String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title></title>

<script type="text/javascript" src="./EF/EF.js"></script>
<script type="text/javascript" src="./EV/CM/EVCM0401.js"></script>
<script type="text/javascript" src="./userIco.js"></script>
</head>
<body class="bodyBackground">

<form id="EVCM0401" method="POST" action="<%=actionUrl%>"><jsp:include
	flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>
<table id="mainFrameTable" width="100%"  height="90%" cellpadding=0 cellspacing=0 >
	<tr height=100%>
	  <td id="leftForm" vAlign="top" height="100%" style="background-color: #f4f9ff; border:solid #7b9dc0 1px; padding-bottom:2px; border-top:none">
         <div id="leftFormDiv" style='overflow:auto; width:380;height:100%; margin:1px; border:#9da1a4 1px solid'>
           <DIV style='height:100%'>
            <div id = "ef_region_inqu" title="新增记录" style="overflow:scroll">
				<div style="overflow:hidden;width:100%">
					<table>
					  <tr>
					  	<td width="15%">模板标识</td>
					  	<td width="30%">
					  		<EF:EFInput blockId="inqu_status" ename="templateId" row="0"
					  			etc="nullable='false' minLength='1' maxLength='50' errorPrompt='模板标识应该由至少一个,最多50个字节大小的字符组成,' "/>
					  	</td>
					  </tr>
					  <tr>
					  	<td width="15%">模板名称</td>
					  	<td width="30%">
					  		<EF:EFInput blockId="inqu_status" ename="templateName" row="0" 
					  			etc="nullable='false' minLength='1' maxLength='50' errorPrompt='模板名称应该由至少一个,最多50个字节大小的字符组成,' "/>
					  	</td>
					  </tr>
					  <tr>
					  	<td width="15%">背景颜色</td>
					  	<td width="30%">
					  		<EF:EFInput blockId="inqu_status" ename="bgcolor" row="0" etc="maxLength='50' "/>
					  	    <img title="颜色选择器"  align="center" src="EV/images/color.JPG" onmouseover="this.style.cursor='hand'" onClick='openSelectColor("inqu_status-0-bgcolor");'>
					  	</td>
					  </tr>
					  <tr>
					  	<td width="15%">字体颜色</td>
					  	<td width="30%">
					  		<EF:EFInput blockId="inqu_status" ename="fontColor" row="0" etc="maxLength='50' "/>
					  	    <img title="颜色选择器"  align="center" src="EV/images/color.JPG" onmouseover="this.style.cursor='hand'" onClick='openSelectColor("inqu_status-0-fontColor");'>
					  	</td>
					  </tr>
					  <tr>
					  	<td width="15%">字体大小</td>
					  	<td width="30%">
					  		<EF:EFInput blockId="inqu_status" ename="fontSize" row="0" etc="nullable='false' maxLength='2' errorPrompt='字体大小只能输入1-20之间的正整数' validateType='positive_integer'  "/>px
					  	</td>
					  </tr>
					  <tr>
					  	<td width="15%">字体类型</td>
					  	<td width="30%">
					  		<EF:EFSelect blockId="inqu_status" ename="fontType" row="0" >
						  	    <EF:EFOption label="Arial" value="Arial" />
						  	    <EF:EFOption label='Times New Roman' value='Times New Roman' />
						  	    <EF:EFOption label='Helvetica' value='Helvetica' />
						  	    <EF:EFOption label='Courier' value='Courier' />
						  	    <EF:EFOption label='sans-serif' value='sans-serif' />
						  	    <EF:EFOption label='mono' value='mono' />
						  	    <EF:EFOption label='Verdana' value='Verdana' />
						  	    <EF:EFOption label='Georgia' value='Georgia' />
						  	    <EF:EFOption label="黑体" value="黑体" />
				     			<EF:EFOption value="宋体" label="宋体" />
				     			<EF:EFOption value="幼圆" label="幼圆" />
				    			<EF:EFOption value="微软雅黑" label="微软雅黑" />
				     			<EF:EFOption value="仿宋_GB2312" label="仿宋_GB2312" />
				     			<EF:EFOption value="楷体_GB2312" label="楷体_GB2312" />
					  	    </EF:EFSelect>
					  	</td>
					  </tr>
					  <tr>
					  	<td width="15%">Portlet颜色</td>
					  	<td width="30%">
					  		<EF:EFInput blockId="inqu_status" ename="portletColor" row="0" etc="maxLength='50' "/>
					  		<img title="颜色选择器" align="center" src="EV/images/color.JPG" onmouseover="this.style.cursor='hand'" onClick='openSelectColor("inqu_status-0-portletColor");'>
					  	</td>
					  </tr>
					  <tr>
					  	<td width="15%">是否显示Portlet边框</td>
					  	<td width="30%">
							是<EF:EFInput type="radio" blockId="inqu_status" ename="portletBorderFlag" row="0" value="1" />
							否<EF:EFInput type="radio" blockId="inqu_status" ename="portletBorderFlag" row="0" value="0" />
			            </td>
					  </tr>
					  <tr>
					  	<td width="15%">是否显示Portlet图标</td>
					  	<td width="30%">
					  		是<EF:EFInput type="radio" blockId="inqu_status" ename="portletImageFlag" row="0" value="1" />
							否<EF:EFInput type="radio" blockId="inqu_status" ename="portletImageFlag" row="0" value="0" />
					  	</td>
					  </tr>
					  <tr>
					  	<td width="15%">效果图</td>
					  	<td width="30%">
					  		<EF:EFInput blockId="inqu_status" ename="templateStyleurl" row="0" etc="disabled='true'; maxLength='50' "/>
					  		<img title="上传文件"  align="center" src="EV/images/upload.png" onmouseover="this.style.cursor='hand'" onClick='openUpload("inqu_status-0-templateStyleurl");'>
					  	</td>
					  </tr>
					  <tr>
					  	<td width="15%"><EF:EFInput blockId="result" ename="archiveFlag" row="0" etc="disabled='true'; maxLength='50'" type="hidden"/></td>
					  	<td width="30%">
					  	</td>
					  </tr>
					   <tr>
					  	<td width="15%">Portlet间距</td>
					  	<td width="30%">
					  		<EF:EFInput blockId="inqu_status" ename="portletDistance" row="0" etc="nullable='false' minLength='1' maxLength='2' errorPrompt='Portlet间距只能输入1-50之间的正整数' validateType='positive_integer'  "/>px
					  	</td>
					  </tr>
					</table>
				</div>
			</div>  
                 
          </DIV>
        </div>

      </td>

      <td id="middleSplitter" style="repeat-y; cursor: e-resize; border:solid 1px #7b9dc0; border-left:none; border-top:none">
                    </td>

     <td id="rightContent" width=100% height="100%" vAlign="top" >
     <iframe id="mainFrame" name="mainFrame" marginWidth="0" marginHeight="0" src="./EV/CM/EVCM0403.jsp" style='overflow:auto; width:100%;height:100%; margin:1px; border:#9da1a4 1px solid'> </iframe>
     </td>
   </tr>
 </table>


<script type="text/javascript">
			
			efico.setNodeIcoUrl('middleSplitter','efpage.middleSplitter');
		</script>
 <EF:EFRegion />
<jsp:include flush="false"
	page="../../EF/Form/EFFormTail.jsp"></jsp:include></form>
</body>
</html>
