<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page language="java"
	import="com.baosight.iplat4j.core.ei.*,java.util.*,com.baosight.iplat4j.ec.util.ECUtil"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	EiInfo eiInfo = (EiInfo) request.getAttribute("ei");
	String isCognos = eiInfo.getString("isCognos");
	
	//EiBlock extblock = eiInfo.getBlock("extblock");
%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title></title>
<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
<SCRIPT type=text/javascript src="EU/ueditor/editor_config.js"></SCRIPT>  
<LINK rel=stylesheet href="EU/ueditor/themes/default/ueditor.css"> 
<script type="text/javascript" src="./EC/AM/ECAM02.js"></script>
</head>

<body class="bodyBackground">
<EF:EFInput blockId="" ename="fileIdStr" row="" type="hidden" /> 
<form id="ECAM02" name='myForm' method="POST" action="<%=actionUrl%>">
<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

<c:set var="extForm" value="${ei.blocks.extAttr}"/>
<input type="hidden" id="existExtAttr" value="${extForm.rowCount}"/>
<div id="ef_region_result" title="文章明细" efRegionShowClear=true>
	<input type=hidden id=ip value="<%=request.getServerName()%>"> 
	<input type=hidden id=port value="<%=request.getServerPort()%>"> 
	<input type=hidden id=context value="<%=request.getContextPath()%>"> 
	<EF:EFInput blockId="inqu_status" ename="articleId" row="0" type="hidden" /> 
	<EF:EFInput blockId="inqu_status" ename="columnId" row="0" type="hidden" /> 
	<EF:EFInput blockId="inqu_status" ename="flag" row="0" type="hidden" /> 
	<EF:EFInput blockId="inqu_status" ename="typeList" row="0" type="hidden" /> 
	<EF:EFInput blockId="inqu_status" ename="idList" row="0" type="hidden" /> 
	<EF:EFInput	blockId="inqu_status" ename="descList" row="0" type="hidden" />
	<EF:EFInput blockId="inqu_status" ename="articleFileIds" row="0" type="hidden" />
	<EF:EFInput blockId="result" ename="articleState" row="0" type="hidden" /> 
	<EF:EFInput blockId="result" ename="auditer" row="0" type="hidden" /> 
	<EF:EFInput blockId="result" ename="auditTime" row="0" type="hidden" /> 
	<EF:EFInput blockId="result" ename="publisher" row="0" type="hidden" /> 
	<EF:EFInput blockId="result" ename="publishTime" row="0" type="hidden" /> 
	<EF:EFInput blockId="result" ename="recRevisor" row="0" type="hidden" /> 
	<EF:EFInput blockId="result" ename="recReviseTime" row="0" type="hidden" /> 
	
	<EF:EFInput blockId="" ename="nodeId" row="" type="hidden" /> 
	<EF:EFInput blockId="" ename="nodeType" row="" type="hidden" /> 
	<%--
       添加隐藏域 用于保存通过在 FCK编辑框 中添加的文章关联的多个文档文件id
    --%> 

 
<div style="overflow:hidden;width:100%">
<table style="white-space:nowrap;">
	<tr>
		<td  width="10%">文章标题</td>
		<td  width="90%"><EF:EFInput blockId="result"
			ename="articleTitle" row="0"
			etc="style='width:500px;' maxLength='100' onkeyup='synchContent();'" /> 
			  <a id="fontstate" style='cursor:pointer' onclick="editStyle();" >
				 <font color="blue">
				     <span id='styleCode0'>编辑标题样式</span>
				 </font>
			   </a>&nbsp;&nbsp;
			    <a style='cursor:pointer' onclick="openPrefixSufix();">
			    	<font color="blue">
				   	  <span id='styleCode1'>添加前后缀</span>
				 	</font>
			    </a>
			    <a style='cursor:pointer' onclick="more();">
			    	<font color="blue">
				   	  <span id='styleCode2'>更多</span>
				 	</font>
			    </a>
			    <input  id='usefont' name='usefont'  type="checkbox" onclick="stateChange()" >使用标题样式</input>
			</td>
	</tr>
	
	
	
	
	<tr>
		<td width="10%"></td>
		<td>
		<div id='titleStyle'
			style="background:#cccccc;width='50%';display='none'"><EF:EFInput
			blockId="result" ename="titleStyle" row="0" type="hidden" />
			<EF:EFInput
			blockId="result" ename="formerStyle" row="0" type="hidden" />
		<table>
			<tr>
				<td>预览</td>
				<td><font id="titleStylePre" style="background:white"></font></td>
			<tr>
				<td  width="15%">标题字体颜色</td>
				<td><EF:EFInput blockId="result" ename="titleColor" row="0"
					etc="readOnly" /> <img title='颜色选择器' align='center'
					src='EV/images/color.JPG' onmouseover="this.style.cursor='hand'"
					onClick="openSelectColor();"></td>
			</tr>
			<tr>
				<td  width="15%">标题字体大小</td>
				<td><EF:EFInput blockId="result" ename="titleSize" row="0"
					etc="onblur='changeTitleSize();' errorPrompt='请输入10-30的正整数' validateType='positive_number'" /><b>PX</b>
				</td>
			</tr>
			<tr>
				<td  width="10%">标题字体类型</td>
				<td><EF:EFSelect blockId="result" ename="titleFont" row="0"
					etc="onChange='fontStyleChange();'">
					<EF:EFOption label="Arial" value="Arial"></EF:EFOption>
					<EF:EFOption label="Times New Roman" value="Times New Roman"></EF:EFOption>
					<EF:EFOption label="Helvetica" value="Helvetica"></EF:EFOption>
					<EF:EFOption label="Courier" value="Courier"></EF:EFOption>
					<EF:EFOption label="sans-serif" value="sans-serif"></EF:EFOption>
					<EF:EFOption label="mono" value="mono"></EF:EFOption>
					<EF:EFOption label="Verdana" value="Verdana"></EF:EFOption>
					<EF:EFOption label="Georgia" value="Georgia"></EF:EFOption>
					<EF:EFOption label="黑体" value="黑体"></EF:EFOption>
					<EF:EFOption label="宋体" value="宋体"></EF:EFOption>
					<EF:EFOption label="幼圆" value="幼圆"></EF:EFOption>
					<EF:EFOption label="微软雅黑" value="微软雅黑"></EF:EFOption>
					<EF:EFOption label="仿宋_GB2312" value="仿宋_GB2312"></EF:EFOption>
					<EF:EFOption label="楷体_GB2312" value="楷体_GB2312"></EF:EFOption>
				</EF:EFSelect></td>
			</tr>
			<tr>
				<td><input type='checkbox' id="isBold" value="0"
					onclick="changeBold();">加粗</></td>
				<td><input type='checkbox' id="isItalic" value="0"
					onclick="changeStyle();">倾斜</></td>
			</tr>
		</table>
		</div>
		</td>
	</tr>
	 	<tr id="articleprefix" style="display:none;"> 
				<td  width="10%" >标题前缀</td>
				<td width="90%">
				   <div id="myEditor" style="white-space:normal;"> 
				   </div>
				   <EF:EFInput blockId="result" ename="articleprefix" row="0" type="hidden"  />
				</td>
		 </tr>
	
		<tr id="articlesuffix" style="display:none;">
				<td  width="10%">标题后缀</td>
				<td width="90%">
					<div id="myEditor1" style="white-space:normal;"> 
				    </div>
					<EF:EFInput blockId="result" ename="articlesuffix" row="0" type="hidden" />
		        </td>
		 </tr>

	<tr>
		<td  width="10%">作者</td>
		<td  width="90%"><EF:EFInput blockId="result"
			ename="author" row="0" etc="style='width:150px;' maxLength='20'" />
		</td>
	</tr>
	
	
	<tr>
		   <td  width="10%" >内容</td>
		   <td>
			   <div id="myEditor2" style="white-space:normal;"> 
			   </div>
			   <EF:EFInput blockId="result" ename="articleContent" row="0" type="hidden"  />   
		   </td>
	</tr>
	
	
	<tr>
	<td width="100%" colspan="2">
	<div id="moreDiv"  style="display:none">
	 <table width="100%">
	
	
	<tr>
		<td  width="10%">来源</td>
		<td  width="90%"><EF:EFInput blockId="result"
			ename="source" row="0" etc="style='width:350px;' maxLength='30'" /></td>
	</tr>
	<tr>
		<td  width="10%">文章排序标识</td>
		<td  width="90%"><EF:EFInput blockId="result"
			ename="articleSeq" row="0" etc="style='width:350px;' maxLength='16'" /></td>
	</tr>
	<tr>
		<td  width="10%">摘要</td>
		<td  width="90%"><EF:EFInput blockId="result"
			ename="articleAbstract" row="0" type="textarea"
			etc=" style='width:350px;height:50px' " /></td>
	</tr>
	<tr>
		<td  width="10%">副标题</td>
		<td  width="90%"><EF:EFInput blockId="result"
			ename="subhead" row="0" etc="style='width:350px;' maxLength='80'" /></td>
	</tr>

	<%
	if (isCognos.equals(ECUtil.TYPE_COGNOS)) {
	%>
	<tr>
		<td  width="10%">引用链接</td>
		<td  width="90%"><!--    <EF:EFInput blockId="result" ename="referLink" row="0" etc="size='255'"/>-->
		<EF:EFInput blockId="result" ename="referLink" row="0" type="textarea"
			etc=" style='width:350px;height:50px' " /></td>
	</tr>

	<tr>
		<td  width="10%">参数串</td>
		<td  width="90%"><EF:EFInput blockId="result"
			ename="parameterString" row="0" type="textarea"
			etc=" style='width:350px;height:50px' maxLength='1000' " />
		<div><font color="red">(若同步参数需要包含当前登录用户的userId,在“参数串”中使用#userId#字符串)
		<br>
		(若同步参数需要包含系统当前时间(系统时间格式为YYYYMMDD),在“参数串”中使用#sysTime#字符串)</font></div>
		</td>
	</tr>
	<%
	}
	%>

	<tr>
		<td  width="10%">关键字</td>
		<td  width="90%"><EF:EFInput blockId="result"
			ename="keyWords" row="0" type="textarea"
			etc=" style='width:350px;height:50px' maxLength='500' " /></td>
	</tr>

	<tr>
		<td  width="10%">对应图片</td>
		<td  width="90%"><EF:EFInput blockId="result"
			ename="articleImg" row="0" etc="style='width:350px;' readOnly" /> <a
			style='cursor:pointer' onclick="upload()"><font color="blue">上传</font></a>
		</td>
	</tr>

	<tr>
		<td  width="10%">有效时间</td>
		<td  width="90%"><EF:EFInput blockId="result"
			ename="effectStartTime" row="0" popup="date"
			etc="maxLength='8' style='width:150px;' readOnly" /> 至 <EF:EFInput
			blockId="result" ename="effectEndTime" row="0" popup="date"
			etc="maxLength='8' style='width:150px;' readOnly" /></td>
	</tr>

	<tr>
		<td  width="10%">显示时间</td>
		<td  width="90%"><EF:EFInput blockId="result"
			ename="displayTime" row="0" popup="date"
			etc="maxLength='10' style='width:150px;' readOnly" /></td>
	</tr>
	
	
	<tr>
	<td>
	<div style="display: none">
	<table>
	
		
	<tr>
		<td  width="10%">附件安全级别</td>
		<td  width=25%"><EF:EFSelect blockId="result"
			ename="attachSecurityLevel" row="0" >
			<EF:EFOption label="无密级" value="1"></EF:EFOption>
			<EF:EFOption label="秘密级" value="2"></EF:EFOption>
			<EF:EFOption label="机密级" value="3"></EF:EFOption>
			<EF:EFOption label="绝密级" value="4"></EF:EFOption>
		</EF:EFSelect></td>
	</tr>
	
	</div>
	</table>
	</td>
	</tr>
	<tr id="isHeadLineNewsDiv">
		<td  width="10%">是否头条</td>
		<td  width="90%">
			<EF:EFInput blockId="result" type="checkbox" ename="headLineNews" row="0"  />&nbsp;&nbsp;
			是否图片新闻&nbsp;&nbsp;<EF:EFInput blockId="result" type="checkbox" ename="imgNews" row="0" /> &nbsp;&nbsp;
		</td>
	</tr>
	<!--  
	<tr id="isImgNewsDiv">
		<td  width="10%">是否图片新闻</td>
		<td  width="90%">
			<EF:EFInput blockId="result" type="checkbox" ename="2" row="0" etc="" /> 
		</td>
	</tr>
	-->	
	<tr id="authDiv">
		<td  width="10%">文章级授权</td>
		<td  width="90%">
			<EF:EFInput blockId="result" type="checkbox" ename="authorize" row="0" etc="onclick='checkbox_check();' " /> 
			<img id="uploadImg" src="./EF/Images/ef_pop_up_window.gif" style="display:none" onmouseover="this.style.cursor='hand'" onClick="img_authorize_onclick();">
		</td>
	</tr>
	<tr>
		<td  width="10%">正文安全级别</td>
		<td  width=25%"><EF:EFSelect blockId="result"
			ename="contentSecurityLevel" row="0">
			<EF:EFOption label="无密级" value="1"></EF:EFOption>
			<EF:EFOption label="秘密级" value="2"></EF:EFOption>
			<EF:EFOption label="机密级" value="3"></EF:EFOption>
			<EF:EFOption label="绝密级" value="4"></EF:EFOption>
		</EF:EFSelect></td>
	</tr>
	

	 <tr>
		<td>
			<EF:EFInput blockId="result" ename="isAuthorize" row="0" type="hidden" /> 
			<EF:EFInput blockId="result" ename="outReferId" row="0" type="hidden" />
			<EF:EFInput blockId="result" ename="isHeadlineNews" row="0" type="hidden" />
			<EF:EFInput blockId="result" ename="isImgNews" row="0" type="hidden" />
		</td>
	</tr>
	
</table>
</div>
</td>
</tr>
	
	
</table>
</div>
</div>

<div id="checkContent" class="efwindow">
 	<table width="300"><tr>
		<td>
		<div id = "ef_region_check" title="审核" style="overflow:scroll">
		 <table>
			<tr>
			 <td>	
			 <input  type="radio" id="check_pass" name="isPassAudit" value="0" class="inputField"  />通过
			 </td>
			 <td>
			 <input  type="radio" id="check_unpass" name="isPassAudit" value="1" class="inputField"  checked/>不通过
			 </td>
			</tr>
			</table>
		</div>		
		
		</td> 	
 	</tr>
 	</table>	
 </div>
 
 <div id="ext" title="文章扩展信息" class="efwindow">
 	<div id = "ef_region_ext" style="overflow:auto;width:600px;height:${100+extForm.rowCount*15}px;">
		 <table style="width:100%;">
			<c:set var="extIndex" value="0"/><!--计数器-->
  						
  			<!--循环开始-->
  			<c:forEach items="${extForm.rows}" var="ext">
  				
  				<c:if  test="${extIndex%2==0}">
  					<tr>		
  				</c:if>
  				
	  				<td style="width:10%">${ext.extLabel}：
						<EF:EFInput blockId="extAttr" ename="extId" row="${extIndex}" type="hidden"/>
					</td>
  				<c:if  test="${ext.extType=='01'}">
					<td ${extForm.rowCount-extIndex==1&&extForm.rowCount%2!=0?'colspan="3" style="width:60%"':'style="width:25%"'}>
						<EF:EFInput blockId="extAttr" ename="extValue" row="${extIndex}"/>
					</td>	
  				</c:if>
  				<c:if  test="${ext.extType=='02'}">
  					<td ${extForm.rowCount-extIndex==1&&extForm.rowCount%2!=0?'colspan="3" style="width:60%"':'style="width:25%"'}>
						<EF:EFInput blockId="extAttr" ename="extValue" row="${extIndex}" popup="date" etc="maxLength='18' size='18'" />
					</td>	
  				</c:if>
  				<c:if  test="${ext.extType=='03'}">
  					<td ${extForm.rowCount-extIndex==1&&extForm.rowCount%2!=0?'colspan="3" style="width:60%"':'style="width:25%"'}>
						<EF:EFSelect blockId="extAttr" row="${extIndex}" ename="extValue" etc="style='width:150px;'">
							<EF:EFCodeOption codeName="${ext.extSource}" /><!--iplat.interfaceStyle-->
						</EF:EFSelect>
					</td>	
  				</c:if>
  				
  				<c:if  test="${extIndex%2!=0}">
  					</tr>		
  				</c:if>
  				
  				<c:set var="extIndex" value="${extIndex+1}"/>
  			</c:forEach>
			
		</table>
	</div>		
 </div>
 
<EF:EFRegion /> 
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include></form>

</body>
</html>
