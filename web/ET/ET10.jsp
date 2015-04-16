<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@page import="com.baosight.iplat4j.core.ei.*,
				com.baosight.iplat4j.core.spring.SpringApplicationContext,
				com.baosight.iplat4j.dao.*,
				java.util.List,
				java.util.Map,
				java.util.HashMap,
				java.lang.Exception,
				java.lang.String,
				com.baosight.iplat4j.ea.sql.T_DC_RECEIVE_MESSAGE,
				com.baosight.iplat4j.ea.sql.T_DC_SEND_MESSAGE"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld"%>

<jsp:useBean id="ei" scope="request"
	class="com.baosight.iplat4j.core.ei.EiInfo" />
<%
	String contextpath = request.getContextPath();

	//根据电文序列号查询电文体
	String teleIndexNumb = request.getParameter("teleIndexNumb");
	if(teleIndexNumb != null){
		Map teleMap = new HashMap();
		T_DC_RECEIVE_MESSAGE receiveMessage=new T_DC_RECEIVE_MESSAGE();
		T_DC_SEND_MESSAGE  sendMessage = new T_DC_SEND_MESSAGE();
		teleMap.put("fd_message_id",teleIndexNumb);
		Dao dao = (Dao) SpringApplicationContext.getBean("dao");
		String teleStr = "";
		List teleList = null;
		try{
			
			if(request.getParameter("type") != null){
			if(request.getParameter("type").equals("send")){
				
				teleList = dao.query("ET10.querySendTeleStr",teleMap);
				if(teleList != null && !teleList.isEmpty())
				if(((T_DC_SEND_MESSAGE)teleList.get(0)).getFd_message_body() != null){
					teleStr = new String(((T_DC_SEND_MESSAGE)teleList.get(0)).getFd_message_body(),"GBK");
					ei.set("beanTele",teleStr);				
				}
				
			}else{
		
				teleList = dao.query("ET10.queryReceiveTeleStr",teleMap);
				if(teleList != null && !teleList.isEmpty())
				if(((T_DC_RECEIVE_MESSAGE)teleList.get(0)).getFd_message_body() != null){
					teleStr = new String(((T_DC_RECEIVE_MESSAGE)teleList.get(0)).getFd_message_body(),"GBK");
					ei.set("beanTele",teleStr);
				}
			}
			}
		}catch(Exception ee){	
			ee.printStackTrace();
		}
		
	}
	
	//消息号
	String indexNumb = request.getParameter("indexNumb");
	if(indexNumb != null){
		ei.set("indexNumb",indexNumb);		
	}
	//电文bean的名称
	String getBean = request.getParameter("getBean");
	if(getBean != null && getBean.equals("yes")){
		Dao dao = (Dao) SpringApplicationContext.getBean("dao");
		Map map = new HashMap();
		map.put("fdMessageCode",indexNumb);
		List list = dao.query("ET10.query",map);
		Map resultMap = null;
		if(list!=null && !list.isEmpty()){
			resultMap = (Map)list.get(0);
		
		ei.set("beanName",resultMap.get("fdBeanName"));
		ei.set("outIndexColName",resultMap.get("outIndexColName"));

		String pointAble = (String)resultMap.get("pointAble");
		if(pointAble.trim().equals("false"))
		 	ei.set("beanPoint","1");  
		}
		
	}
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<HTML>
<HEAD>
<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
<title>电文验证</title>

<script type="text/javascript" src="<%=contextpath %>/EF/iplat-ui-2.0.js"></script>
<script type="text/javascript" src="<%=contextpath %>/ET/ET10.js"></script>
</HEAD>

<body class="bodyBackground" >
<form id="detailform" method="POST" action="<%=actionUrl%>" ><jsp:include
	flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id ="cascadeSelect" cascadeSelectIds="indexNumb" 
cascadeService="ET10" cascadeServiceMethod="getCascadeSelect"> 
</div>

<div style="overflow:scroll;overflow-y:scroll;overflow-x:scroll">
<div id="ef_region_inqu" title="bean名称" efRegionShowClear=true>
<div style="overflow:hidden;width:100% ">
<table>
	<tr>
		<td nowrap width="15%">消息号</td>
		<td nowrap><EF:EFInput blockId="" ename="indexNumb" row=""
			type="text" trim="true"
			etc="nullable=false onblur='getBeanMsg()'"	
		></EF:EFInput>
		<img title="消息号列表" id="tree_list_node" 
		onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
		onmouseover="javascript:this.style.cursor='hand'" onClick="efcascadeselect.getEiInfo(ef.get('indexNumb'))">
		</td>
</tr>	
	<tr>
		<td nowrap width="15%">bean名称</td>
		<td nowrap><EF:EFInput blockId="" ename="beanName" row=""
			etc="size='100' nullable=true errorPrompt='bean名称' " /></td>
	</tr>
<tr>
	<td nowrap >电文不含小数点</td>
	<td nowrap><EF:EFInput blockId="" ename="beanPoint" row="" type="checkbox" value="1"/></td>
</tr>
<tr>
	<td nowrap >不属于电文的字段</td>
	<td nowrap><EF:EFInput blockId="" ename="outIndexColName" row=""
			etc="size='100' " /></td>	
</tr>
</table>
</div>
</div>

<div id="ef_region_result" title="bean内容" efRegionShowClear=true>
<div id="result" style=" width:99%; height:90%; overflow: auto;">

<table width="99%" border="0" align="center" class="panel">
	<%
		String eName = "";
		String metaNames = "";
		int i = 0;
		EiBlockMeta blockMeta = (EiBlockMeta) ei.get("beanMeta");
		if (blockMeta != null && blockMeta.getMetaCount() > 0) {
			metaNames = blockMeta.getMetaNames();
			String[] names = metaNames.split(",");
			String cName = "";
			String etcStr = "";//产生校验str
			String type = "";//列的type
			int length = 0;//列的长度
			int scaleLength = 0;//小数位长度
			EiColumn meta = null;
			int j = 0;
			for (; i < names.length; i++) {
				j = i % 2;
				meta = blockMeta.getMeta(names[i]);
				String namesChecked = "";
				if(ei.getCell("result",1,names[i])!=null)
					namesChecked = "checked";
				cName = meta.getEname()+":"+meta.getCname();
				type = meta.getType()+":"+meta.getFieldLength()+"."+meta.getScaleLength();
				length = meta.getFieldLength();
				//etcStr = " errorPrompt='" + cName + "' maxLength='" + length + "' ";
				if (type.indexOf("N") != -1) {//数字
			String regex = "";
			scaleLength = meta.getScaleLength();
			if (scaleLength == 0) {//整数
				regex = "/^((-\\d{1," + (length - 1) + "})|(\\d{1,"
				+ length + "}))$/";
			} else { //小数
				regex = "/^((-\\d{1," + (length - scaleLength - 2)
				+ "})|(\\d{1," + (length - scaleLength -1)
				+ "}))(\\.\\d{1," + scaleLength + "})?$/";
			}
			etcStr = " regex='" + regex + "' errorPrompt='"	
					+ cName + "格式不对，总长度" + length + "小数位"
					+ scaleLength + "' ";
				}
				if (type.indexOf("C") != -1) {//字符
			etcStr = " errorPrompt='" + cName + "' maxLength='"
					+ length + "' validateType='text' ";
				}

	%>
	<tr class="tableRow<%=j%>">
		<td width="3%">
		<EF:EFInput blockId="result" ename="<%=names[i]%>" row="1" type="checkbox" value="1" />
		</td>
		<td width="30%"><%=cName%></td>
		<td width="28%">字段值：<EF:EFInput blockId="result" trim="false"
			ename="<%=names[i]%>" row="0" etc="<%=etcStr%>" /></td>
		<td width="10%"><%=type %></td>
		<td width="29%">按原长截取：
		<EF:EFInput blockId="result" trim="false" ename="<%=names[i]%>" row="2" etc="readonly" />
		</td>
	</tr>
	<%
		}
		}
	%>
	<input type="hidden" name="fieldCount" value="<%=i%>" />
</table>
</div>
</div>

<div id="ef_region_tele" title="电文" efRegionShowClear=true>
<div style="overflow:hidden;width:100%">
<table>
	<tr>
		<td nowrap width="15%">电文</td>
		<td nowrap><EF:EFInput blockId="" ename="beanTele" row=""
			type="textarea" trim="false"
			etc="cols='140' rows='12' nullable=true errorPrompt='电文' validateType='text' " />
		</td>
	</tr>

</table>
</div>
</div>
</div>
<EF:EFRegion /></form>

</body>
</html>


