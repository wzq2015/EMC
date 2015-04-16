<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld"%>
<%@ page import = "com.baosight.iplat4j.core.ei.*"%>
<%@ page import = "com.baosight.iplat4j.ed.fa.domain.EDFA81"%>
<%@ page import = "com.baosight.iplat4j.ed.fa.domain.EDFA82"%>
<%@ page import = "com.baosight.iplat4j.core.FrameworkInfo"%>
<%@ page import = "com.baosight.iplat4j.core.spring.SpringApplicationContext"%>
<%@ page import = "com.baosight.iplat4j.dao.*"%>
<%@ page import = "java.util.HashMap"%>
<%@ page import = "java.util.List"%>
<%@ page import = "java.util.ArrayList"%>
<%@page import="org.apache.commons.lang.StringUtils"%>
<%@page import="com.baosight.iplat4j.ef.ui.column.*" %>
<%@page import="com.baosight.iplat4j.common.ed.domain.Tedfa80"%>
<script type="text/javascript" src="./EF/Form/EFFormHeadDQ.js"></script>

<%
    
    String notEqual="<>";
    String big=">";
    String little="<";
    String littleEqual="<=";
    String bigEqual=">=";
	EiInfo outinfo=(EiInfo) request.getAttribute("ei");
	outinfo.addBlock("inqu_dy").setBlockMeta((new EDFA81()).eiMetadata);
	outinfo.addBlock("inqu_dy_orderby").setBlockMeta((new EDFA82()).eiMetadata);
	request.setAttribute("ei",outinfo);
	
	String TableName = outinfo.getString("dyTableName");
	String dyTableName="";
	String owner="";
	//just for test;dyTableName = "TEEDM01";
  
	if(StringUtils.isBlank(TableName))
		dyTableName = "T" + outinfo.get(EiConstant.EF_FORM_ENAME);
	
	else {
		int index=TableName.indexOf(".");
		if(index!=-1){
			dyTableName=TableName.substring(index+1);
			owner=TableName.substring(0,index);
		}else
			dyTableName=TableName;
	}
	if(owner.equals("")){
		owner=FrameworkInfo.getDBUserName();
	}
	dyTableName=dyTableName.toUpperCase();
	owner=owner.toUpperCase();

	Dao dao = (Dao) SpringApplicationContext.getBean("dao");
	HashMap map=new HashMap();
	map.put("tableName",dyTableName);
	map.put("owner",owner);
	List tableInfo=dao.query("EDFA80.query",map);	
	request.setAttribute( "tableInfo", tableInfo );
    Tedfa80 bean=new Tedfa80();
    int size= tableInfo.size();
   out.println("<script type='text/javascript'>");
   out.println("var columnType=[]");
   for(int i=0;i<tableInfo.size();i++){
	   bean=(Tedfa80)tableInfo.get(i); 
	   out.println("columnType['"+bean.getColumnName()+"']='"+bean.getDataType()+"';");
   }
   out.println("</script>");
%>

<!DOCTYPE html>

<!--

//

<jsp:include flush="false" page="../../EF/Form/EFFormHead.jsp"></jsp:include>-->
<jsp:include flush="false" page="/EF/Form/iplat.ef.head.jsp"></jsp:include>
  <input  type="hidden" id="dyQueryFlag" name="dyQueryFlag" value="" />
  <input  type="hidden" id="dyMQueryFlag" name="dyMQueryFlag" value="" />

	<EF:EFInput blockId="" ename="dyQueryString" row="" type="hidden" />
	<EF:EFInput blockId="" ename="dyOrderString" row="" type="hidden" />
	<EF:EFInput blockId="" ename="dyTableName" row="" type="hidden" />
	<EF:EFInput blockId="" ename="dySqlId" row="" type="hidden" />
	<EF:EFInput blockId="" ename="dyBeanClass" row="" type="hidden" />
    <EF:EFInput blockId="" ename="dyEpassString" row="" type="hidden" />
    <EF:EFInput blockId="" ename="callBackServiceName" row="" type="hidden" />
	<EF:EFInput blockId="" ename="callBackMethodName" row="" type="hidden" />
	<EF:EFInput blockId="" ename="callBackGridId" row="" type="hidden" />
	<EF:EFInput blockId="" ename="dyShowGrid" row="" type="hidden" />
   
<FIELDSET name='fileddset_group_query'
	style="padding: 6px;  width: 100%; "><legend>
&nbsp;<font
	style="color: #000000; font-family: 宋体,Tahoma, Arial;font-size:
	   10pt;font-weight : bold "
	size="2" id=query_title>查询条件</font> <a href="#"
	onClick="queryimg_onClick('1')"><img id="efQueryDynamic"
	onload="efico.setImageSrc(this,'efform.efQueryDynamic')" src="./EF/Images/eftree_blank.png"
	border="0" alt="简单查询"></a> <a
	href="#" onClick="queryimg_onClick('0')"> <img id="efQuerySimple"
	onload="efico.setImageSrc(this,'efform.efQuerySimple')" src="./EF/Images/eftree_blank.png"
	border="0" alt="组合查询"
	valign="middle"></a></legend>


<div id="ef_region_inqu2" title="高级查询2" >

	<div id="ef_tab_x" lastRange="99%" eftabType="efRoundDivTab">
		<div id="conditionindex" title="查 询 条 件">



<div id="ef_region_inqu_dy"   efRegionShowClear=true>
 <div id="ef_grid_inqu_dy" title="页面信息"
	style="overflow: hidden;height:160px;"><EF:EFGrid
	blockId="inqu_dy" autoDraw="no"  ajax="true" style="operationBar:false;navigationBar:false;">
	<EF:EFComboColumn ename="brack" width="30" cname="("
		valueProperty="value" labelProperty="label"
		formatString="#labelString#">
		<EF:EFOption value="" label="" />
		<EF:EFOption value="(" label="(" />
		<EF:EFOption value="((" label="((" />
		<EF:EFOption value="(((" label="(((" />
	</EF:EFComboColumn>

	<EF:EFColumn ename="andor" width="80" readonly="true" enable="false" cname="和/或"  />

	<EF:EFComboColumn ename="brackA" width="30" cname="()"
		valueProperty="value" labelProperty="label"
		formatString="#labelString#">
		<EF:EFOption value="" label="" />
		<EF:EFOption value="(" label="(" />
		<EF:EFOption value="((" label="((" />
		<EF:EFOption value="(((" label="(((" />
	</EF:EFComboColumn>
	<EF:EFComboColumn ename="field" width="180" cname="字段" formatString="#valueString#-#labelString#" sourceName="tableInfo" labelProperty="propName" valueProperty="columnName">		
	</EF:EFComboColumn>
	<EF:EFComboColumn ename="operation" width="120" cname="操作"
		valueProperty="value" labelProperty="label"
		formatString="#labelString#">
		<EF:EFOption value="likestartwith" label="开始匹配" />
		<EF:EFOption value="likeendwith" label="结束匹配" />
		<EF:EFOption value="like" label="匹配" />
		<EF:EFOption value="=" label="等于" />
		<EF:EFOption value="<%=notEqual%>" label="不等于" />
		<EF:EFOption value="<%=big%>" label="大于" />
		<EF:EFOption value="<%=little%>" label="小于" />
		<EF:EFOption value="<%=bigEqual%>" label="大于或等于" />
		<EF:EFOption value="<%=littleEqual%>" label="小于或等于" />
		<EF:EFOption value="is null" label="空" />
		<EF:EFOption value="is not null" label="非空" />
		<EF:EFOption value="between" label="在...之间" />
		<EF:EFOption value="not between" label="不在...之间" />
		<EF:EFOption value="in" label="包含" />
		<EF:EFOption value="not in" label="不包含" />
		<EF:EFOption value="not like" label="不匹配" />
		<EF:EFOption value="notlikestartwith" label="开始不匹配" />
		<EF:EFOption value="notlikeendwith" label="结束不匹配" />
	</EF:EFComboColumn>
	<EF:EFColumn ename="value" width="150" cname="值1"  nullable="false"/>
	<EF:EFColumn ename="valueAnd" width="150" cname="值2" enable="true" />
	<EF:EFComboColumn ename="brackB" width="30" cname="()"
		valueProperty="value" labelProperty="label"
		formatString="#labelString#">
		<EF:EFOption value="" label="" />
		<EF:EFOption value=")" label=")" />
		<EF:EFOption value="))" label="))" />
		<EF:EFOption value=")))" label=")))" />
	</EF:EFComboColumn>
	<EF:EFColumn ename="dataType" visible="false" cname="数据类型" defaultValue="string" />


</EF:EFGrid>

</div>

      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="85%">&nbsp;</td>
          <td width="5%"><EF:EFButton ename="bt_dynamicCNew" cname="添加" /> </td>
          <td width="5%"><EF:EFButton ename="bt_dynamicCDelete" cname="删除" /></td>
          <td width="5%"><EF:EFButton ename="bt_dynamicCQuery" cname="查询" /></td>

        </tr>
      </table>


 </div>
</div>


<div id="orderindex" title="排 序 条 件">

 <div id="ef_region_inqu_dy_orderby"   efRegionShowClear=true>
 <div id="ef_grid_inqu_dy_orderby" title="页面信息"
	style="overflow: hidden;height:160px;">
	<EF:EFGrid
	blockId="inqu_dy_orderby" autoDraw="no" readonly="false"  paintId="ef_grid_inqu_dy_orderby" style="operationBar:false;navigationBar:false;">
	<EF:EFComboColumn ename="field" width="180" cname="字段" formatString="#valueString#-#labelString#" sourceName="tableInfo" labelProperty="propName" valueProperty="columnName">		
	</EF:EFComboColumn>
	<EF:EFComboColumn ename="orderBy" width="250" cname="排序方式"
		valueProperty="value" labelProperty="label"
		formatString="#labelString#">
		<EF:EFOption value="asc" label="从小到大" />
		<EF:EFOption value="desc" label="从大到小" />

	</EF:EFComboColumn>


</EF:EFGrid>

</div>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="85%">&nbsp;</td>
          <td width="5%"><EF:EFButton ename="bt_dynamicONew" cname="添加" /> </td>
          <td width="5%"><EF:EFButton ename="bt_dynamicODelete" cname="删除" /></td>
          <td width="5%"><EF:EFButton ename="bt_dynamicOQuery" cname="查询" /></td>

        </tr>
      </table>

    </div>
</div>




 <div id="lead" title="我 的 书 签" eftabSrc="" >

<div id ="cascadeSelect" cascadeSelectIds="efFormEname,dyMarkId"
cascadeService="EDFACascade" cascadeServiceMethod="getCascadeSelect">
</div>

 <div id = "ef_region_bookmark" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		       书签列表
		    </td>
		    <td nowrap width="85%">
		     <EF:EFInput blockId="" ename="dyMarkId" row="" etc="size='8' readonly=true"/>
				<img title="树结点列表" id="tree_list_node" 
				onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
				onmouseover="javascript:this.style.cursor='hand'" onClick="efcascadeselect.getEiInfo(ef.get('dyMarkId'))">
             <EF:EFInput blockId="" ename="dyMarkName" row="" etc="size='38'" />
		    </td>
		  </tr>
		  <tr>
		    <td nowrap width="15%">
		    内容描述
		    </td>
		    <td nowrap width="85%">
		    <EF:EFInput blockId="" type='textarea' ename="dyMarkMemo" row="" etc="rows='5' cols='70'" />
		    </td>

		  </tr>

		</table>
	  </div>
    </div>
       <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td width="85%">&nbsp;</td>
          <td width="5%"><EF:EFButton ename="bt_dynamicMNew" cname="新增书签" /> </td>
          <td width="5%"><EF:EFButton ename="bt_dynamicMDelete" cname="删除书签" /></td>
          <td width="5%"><EF:EFButton ename="bt_dynamicMQuery" cname="书签查询" /></td>
        </tr>
      </table>
  </div>

</div>
<EF:EFTab tabId="x" action="fundiv" />
</div>
   
<script>
  
   ef_region_inqu2.style.display="none";

</script>

