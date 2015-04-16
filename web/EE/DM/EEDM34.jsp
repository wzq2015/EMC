<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM34.js"></script>	
	
</head>
<body class="bodyBackground">
<form id="EEDM31" method="POST" action="<%=actionUrl%>" >
	<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<EF:EFInput blockId="" ename="startTime" row="" type="hidden" />
<EF:EFInput blockId="" ename="rows" row="" type="hidden" />

<div id="divStatus" style="color: blue"></div>
<div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
		<table>
		  <tr>
		    <td nowrap width="15%">
		      应用系统
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="application" row="0" />
		    </td>
		    <td nowrap width="15%">
		      创建者
		    </td>
		    <td nowrap width="20%">
		    <EF:EFInput blockId="inqu_status" ename="creator" row="0" />
		    </td>
		  </tr>
		</table>
	</div>
</div>  

<div id = "ef_region_result" title="记录集" style="overflow:scroll"> 
	<div id = "ef_grid_result" title="页面信息" style="overflow: hidden;height:300px;">
	</div> 
</div>     

<EF:EFRegion/>
<EF:EFGrid blockId="result" autoDraw="no" frontSort="true" sumType="none" showModel="quickShow"  ajax="false" enable="true"  style="modelXlsBar:true;">	
	
	<EF:EFColumn ename="name" cname="名称" sort="true" align="left" width="150"   />
	<EF:EFColumn ename="displayName" cname="显示名称" sort="true" align="right" width="150"   />
	
	<EF:EFComboColumn ename="moduleType" cname="类型" blockName="Type" 
		valueProperty="moduleType"  labelProperty="moduleTypeDisplayName" formatString="#labelString#" />
	<EF:EFColumn ename="parent" cname="父模块" sort="true" width="150"   />
	
	<EF:EFComboColumn ename="application" cname="应用系统1" blockName="Application" 
                      valueProperty="application"  labelProperty="applicationName" >
	</EF:EFComboColumn>
	
    <EF:EFColumn ename="version" cname="版本" sort="true"  />
    
    <EF:EFColumn ename="archieveFlag"  cname="归档标记<input  type='checkbox' >" width="100" enable="false"/>
	<EF:EFColumn ename="loadOnDemand"  cname="按需加载<input  type='checkbox' >" width="100" enable="false"/>
	
	<EF:EFColumn ename="createTime" cname="创建时间" sort="true" editType="date" dateFormat="yyyy-mm-dd"  />
	<EF:EFColumn ename="modifyTime" cname="修改时间" sort="true" editType="date" dateFormat="yyyy-mm-dd"  />
	
    <EF:EFColumn ename="tableSpaceName" cname="表空间名称" sort="true"   />
	<EF:EFColumn ename="tableSpaceSize" cname="表空间大小" sort="true"   />
	<EF:EFColumn ename="price" cname="模块售价" sort="true" />
	<EF:EFColumn ename="creator" cname="创建者" sort="true"   />
	<EF:EFColumn ename="moduleDesc" cname="描述" sort="true"   />
	
    <EF:EFColumn ename="typeFullName" cname="类型全名" sort="true"   />
	<EF:EFColumn ename="moduleLink" cname="链接" sort="true" />
	<EF:EFColumn ename="col18" cname="col18" sort="true" />
	<EF:EFColumn ename="col19" cname="col19" sort="true"  />
	<EF:EFColumn ename="col20" cname="col20" sort="true"  />
	<EF:EFColumn ename="col21" cname="col21" sort="true" />
	<EF:EFColumn ename="col22" cname="col22" sort="true" />
	<EF:EFColumn ename="col23" cname="col23" sort="true" />
	<EF:EFColumn ename="col24" cname="col24" sort="true" />
	<EF:EFColumn ename="col25" cname="col25" sort="true" />
	<EF:EFColumn ename="col26" cname="col26" sort="true" />
	<EF:EFColumn ename="col27" cname="col27" sort="true" />
	<EF:EFColumn ename="col28" cname="col28" sort="true" />
	<EF:EFColumn ename="col29" cname="col29" sort="true" />
	<EF:EFColumn ename="col30" cname="col30" sort="true" />
	<EF:EFColumn ename="col31" cname="col31" sort="true" />
	<EF:EFColumn ename="col32" cname="col32" sort="true" />
	<EF:EFColumn ename="col33" cname="col33" sort="true" />
	<EF:EFColumn ename="col34" cname="col34" sort="true" />
	<EF:EFColumn ename="col35" cname="col35" sort="true" />
	<EF:EFColumn ename="col36" cname="col36" sort="true" />
	<EF:EFColumn ename="col37" cname="col37" sort="true" />
	<EF:EFColumn ename="col38" cname="col38" sort="true" />
	<EF:EFColumn ename="col39" cname="col39" sort="true" />
	<EF:EFColumn ename="col40" cname="col40" sort="true" />
	<EF:EFColumn ename="col41" cname="col41" sort="true" />
	<EF:EFColumn ename="col42" cname="col42" sort="true" />
	<EF:EFColumn ename="col43" cname="col43" sort="true" />
	<EF:EFColumn ename="col44" cname="col44" sort="true" />
	<EF:EFColumn ename="col45" cname="col45" sort="true" />
	<EF:EFColumn ename="col46" cname="col46" sort="true" />
	<EF:EFColumn ename="col47" cname="col47" sort="true" />
	<EF:EFColumn ename="col48" cname="col48" sort="true" />
	<EF:EFColumn ename="col49" cname="col49" sort="true" />
	<EF:EFColumn ename="col50" cname="col50" sort="true" />
	<EF:EFColumn ename="col51" cname="col51" sort="true" />
	<EF:EFColumn ename="col52" cname="col52" sort="true" />
	<EF:EFColumn ename="col53" cname="col53" sort="true" />
	<EF:EFColumn ename="col54" cname="col54" sort="true" />
	<EF:EFColumn ename="col55" cname="col55" sort="true" />
	<EF:EFColumn ename="col56" cname="col56" sort="true" />
	<EF:EFColumn ename="col57" cname="col57" sort="true" />
	<EF:EFColumn ename="col58" cname="col58" sort="true" />
	<EF:EFColumn ename="col59" cname="col59" sort="true" />
	<EF:EFColumn ename="col60" cname="col60" sort="true" />
	<EF:EFColumn ename="col61" cname="col61" sort="true" />
	<EF:EFColumn ename="col62" cname="col62" sort="true" />
	<EF:EFColumn ename="col63" cname="col63" sort="true" />
	<EF:EFColumn ename="col64" cname="col64" sort="true" />
	<EF:EFColumn ename="col65" cname="col65" sort="true" />
	<EF:EFColumn ename="col66" cname="col66" sort="true" />
	<EF:EFColumn ename="col67" cname="col67" sort="true" />
	<EF:EFColumn ename="col68" cname="col68" sort="true" />
	<EF:EFColumn ename="col69" cname="col69" sort="true" />
	<EF:EFColumn ename="col70" cname="col70" sort="true" />
	<EF:EFColumn ename="col71" cname="col71" sort="true" />
	<EF:EFColumn ename="col72" cname="col72" sort="true" />
	<EF:EFColumn ename="col73" cname="col73" sort="true" />
	<EF:EFColumn ename="col74" cname="col74" sort="true" />
	<EF:EFColumn ename="col75" cname="col75" sort="true" />
	<EF:EFColumn ename="col76" cname="col76" sort="true" />
	<EF:EFColumn ename="col77" cname="col77" sort="true" />
	<EF:EFColumn ename="col78" cname="col78" sort="true" />
	<EF:EFColumn ename="col79" cname="col79" sort="true" />
	<EF:EFColumn ename="col80" cname="col80" sort="true" />
	<EF:EFColumn ename="col81" cname="col81" sort="true" />
	<EF:EFColumn ename="col82" cname="col82" sort="true" />
	<EF:EFColumn ename="col83" cname="col83" sort="true" />
	<EF:EFColumn ename="col84" cname="col84" sort="true" />
	<EF:EFColumn ename="col85" cname="col85" sort="true" />
	<EF:EFColumn ename="col86" cname="col86" sort="true" />
	<EF:EFColumn ename="col87" cname="col87" sort="true" />
	<EF:EFColumn ename="col88" cname="col88" sort="true" />
	<EF:EFColumn ename="col89" cname="col89" sort="true" />
	<EF:EFColumn ename="col90" cname="col90" sort="true" />
	<EF:EFColumn ename="col91" cname="col91" sort="true" />
	<EF:EFColumn ename="col92" cname="col92" sort="true" />
	<EF:EFColumn ename="col93" cname="col93" sort="true" />
	<EF:EFColumn ename="col94" cname="col94" sort="true" />
	<EF:EFColumn ename="col95" cname="col95" sort="true" />
	<EF:EFColumn ename="col96" cname="col96" sort="true" />
	<EF:EFColumn ename="col97" cname="col97" sort="true" />
	<EF:EFColumn ename="col98" cname="col98" sort="true" />
	<EF:EFColumn ename="col99" cname="col99" sort="true" />
	<EF:EFColumn ename="col100" cname="col100" sort="true" />
	<EF:EFColumn ename="col101" cname="col101" sort="true" />
	<EF:EFColumn ename="col102" cname="col102" sort="true" />
	<EF:EFColumn ename="col103" cname="col103" sort="true" />
	<EF:EFColumn ename="col104" cname="col104" sort="true" />
	<EF:EFColumn ename="col105" cname="col105" sort="true" />
	<EF:EFColumn ename="col106" cname="col106" sort="true" />
	<EF:EFColumn ename="col107" cname="col107" sort="true" />
	<EF:EFColumn ename="col108" cname="col108" sort="true" />
	<EF:EFColumn ename="col109" cname="col109" sort="true" />
	<EF:EFColumn ename="col110" cname="col110" sort="true" />
	<EF:EFColumn ename="col111" cname="col111" sort="true" />
	<EF:EFColumn ename="col112" cname="col112" sort="true" />
	<EF:EFColumn ename="col113" cname="col113" sort="true" />
	<EF:EFColumn ename="col114" cname="col114" sort="true" />
	<EF:EFColumn ename="col115" cname="col115" sort="true" />
	<EF:EFColumn ename="col116" cname="col116" sort="true" />
	<EF:EFColumn ename="col117" cname="col117" sort="true" />
	<EF:EFColumn ename="col118" cname="col118" sort="true" />
	<EF:EFColumn ename="col119" cname="col119" sort="true" />
	<EF:EFColumn ename="col120" cname="col120" sort="true" />
	<EF:EFColumn ename="col121" cname="col121" sort="true" />
	<EF:EFColumn ename="col122" cname="col122" sort="true" />
	<EF:EFColumn ename="col123" cname="col123" sort="true" />
	<EF:EFColumn ename="col124" cname="col124" sort="true" />
	<EF:EFColumn ename="col125" cname="col125" sort="true" />
	<EF:EFColumn ename="col126" cname="col126" sort="true" />
	<EF:EFColumn ename="col127" cname="col127" sort="true" />
	<EF:EFColumn ename="col128" cname="col128" sort="true" />
	<EF:EFColumn ename="col129" cname="col129" sort="true" />
	<EF:EFColumn ename="col130" cname="col130" sort="true" />
	<EF:EFColumn ename="col131" cname="col131" sort="true" />
	<EF:EFColumn ename="col132" cname="col132" sort="true" />
	<EF:EFColumn ename="col133" cname="col133" sort="true" />
	<EF:EFColumn ename="col134" cname="col134" sort="true" />
	<EF:EFColumn ename="col135" cname="col135" sort="true" />
	<EF:EFColumn ename="col136" cname="col136" sort="true" />
	<EF:EFColumn ename="col137" cname="col137" sort="true" />
	<EF:EFColumn ename="col138" cname="col138" sort="true" />
	<EF:EFColumn ename="col139" cname="col139" sort="true" />
	<EF:EFColumn ename="col140" cname="col140" sort="true" />
	<EF:EFColumn ename="col141" cname="col141" sort="true" />
	<EF:EFColumn ename="col142" cname="col142" sort="true" />
	<EF:EFColumn ename="col143" cname="col143" sort="true" />
	<EF:EFColumn ename="col144" cname="col144" sort="true" />
	<EF:EFColumn ename="col145" cname="col145" sort="true" />
	<EF:EFColumn ename="col146" cname="col146" sort="true" />
	<EF:EFColumn ename="col147" cname="col147" sort="true" />
	<EF:EFColumn ename="col148" cname="col148" sort="true" />
	<EF:EFColumn ename="col149" cname="col149" sort="true" />
	<EF:EFColumn ename="col150" cname="col150" sort="true" />
	<EF:EFColumn ename="col151" cname="col151" sort="true" />
	<EF:EFColumn ename="col152" cname="col152" sort="true" />
	<EF:EFColumn ename="col153" cname="col153" sort="true" />
	<EF:EFColumn ename="col154" cname="col154" sort="true" />
	<EF:EFColumn ename="col155" cname="col155" sort="true" />
	<EF:EFColumn ename="col156" cname="col156" sort="true" />
	<EF:EFColumn ename="col157" cname="col157" sort="true" />
	<EF:EFColumn ename="col158" cname="col158" sort="true" />
	<EF:EFColumn ename="col159" cname="col159" sort="true" />
	<EF:EFColumn ename="col160" cname="col160" sort="true" />
	<EF:EFColumn ename="col161" cname="col161" sort="true" />
	<EF:EFColumn ename="col162" cname="col162" sort="true" />
	<EF:EFColumn ename="col163" cname="col163" sort="true" />
	<EF:EFColumn ename="col164" cname="col164" sort="true" />
	<EF:EFColumn ename="col165" cname="col165" sort="true" />
	<EF:EFColumn ename="col166" cname="col166" sort="true" />
	<EF:EFColumn ename="col167" cname="col167" sort="true" />
	<EF:EFColumn ename="col168" cname="col168" sort="true" />
	<EF:EFColumn ename="col169" cname="col169" sort="true" />
	<EF:EFColumn ename="col170" cname="col170" sort="true" />
	<EF:EFColumn ename="col171" cname="col171" sort="true" />
	<EF:EFColumn ename="col172" cname="col172" sort="true" />
	<EF:EFColumn ename="col173" cname="col173" sort="true" />
	<EF:EFColumn ename="col174" cname="col174" sort="true" />
	<EF:EFColumn ename="col175" cname="col175" sort="true" />
	<EF:EFColumn ename="col176" cname="col176" sort="true" />
	<EF:EFColumn ename="col177" cname="col177" sort="true" />
	<EF:EFColumn ename="col178" cname="col178" sort="true" />
	<EF:EFColumn ename="col179" cname="col179" sort="true" />
	<EF:EFColumn ename="col180" cname="col180" sort="true" />
	<EF:EFColumn ename="col181" cname="col181" sort="true" />
	<EF:EFColumn ename="col182" cname="col182" sort="true" />
	<EF:EFColumn ename="col183" cname="col183" sort="true" />
	<EF:EFColumn ename="col184" cname="col184" sort="true" />
	<EF:EFColumn ename="col185" cname="col185" sort="true" />
	<EF:EFColumn ename="col186" cname="col186" sort="true" />
	<EF:EFColumn ename="col187" cname="col187" sort="true" />
	<EF:EFColumn ename="col188" cname="col188" sort="true" />
	<EF:EFColumn ename="col189" cname="col189" sort="true" />
	<EF:EFColumn ename="col190" cname="col190" sort="true" />
	<EF:EFColumn ename="col191" cname="col191" sort="true" />
	<EF:EFColumn ename="col192" cname="col192" sort="true" />
	<EF:EFColumn ename="col193" cname="col193" sort="true" />
	<EF:EFColumn ename="col194" cname="col194" sort="true" />
	<EF:EFColumn ename="col195" cname="col195" sort="true" />
	<EF:EFColumn ename="col196" cname="col196" sort="true" />
	<EF:EFColumn ename="col197" cname="col197" sort="true" />
	<EF:EFColumn ename="col198" cname="col198" sort="true" />
	<EF:EFColumn ename="col199" cname="col199" sort="true" />
	<EF:EFColumn ename="col200" cname="col200" sort="true" />
	<EF:EFColumn ename="col201" cname="col201" sort="true" />
	<EF:EFColumn ename="col202" cname="col202" sort="true" />
	<EF:EFColumn ename="col203" cname="col203" sort="true" />
	<EF:EFColumn ename="col204" cname="col204" sort="true" />
	<EF:EFColumn ename="col205" cname="col205" sort="true" />
	<EF:EFColumn ename="col206" cname="col206" sort="true" />
	<EF:EFColumn ename="col207" cname="col207" sort="true" />
	<EF:EFColumn ename="col208" cname="col208" sort="true" />
	<EF:EFColumn ename="col209" cname="col209" sort="true" />
	<EF:EFColumn ename="col210" cname="col210" sort="true" />
	<EF:EFColumn ename="col211" cname="col211" sort="true" />
	<EF:EFColumn ename="col212" cname="col212" sort="true" />
	<EF:EFColumn ename="col213" cname="col213" sort="true" />
	<EF:EFColumn ename="col214" cname="col214" sort="true" />
	<EF:EFColumn ename="col215" cname="col215" sort="true" />
	<EF:EFColumn ename="col216" cname="col216" sort="true" />
	<EF:EFColumn ename="col217" cname="col217" sort="true" />
	<EF:EFColumn ename="col218" cname="col218" sort="true" />
	<EF:EFColumn ename="col219" cname="col219" sort="true" />
	<EF:EFColumn ename="col220" cname="col220" sort="true" />
	<EF:EFColumn ename="col221" cname="col221" sort="true" />
	<EF:EFColumn ename="col222" cname="col222" sort="true" />
	<EF:EFColumn ename="col223" cname="col223" sort="true" />
	<EF:EFColumn ename="col224" cname="col224" sort="true" />
	<EF:EFColumn ename="col225" cname="col225" sort="true" />
	<EF:EFColumn ename="col226" cname="col226" sort="true" />
	<EF:EFColumn ename="col227" cname="col227" sort="true" />
	<EF:EFColumn ename="col228" cname="col228" sort="true" />
	<EF:EFColumn ename="col229" cname="col229" sort="true" />
	<EF:EFColumn ename="col230" cname="col230" sort="true" />
	<EF:EFColumn ename="col231" cname="col231" sort="true" />
	<EF:EFColumn ename="col232" cname="col232" sort="true" />
	<EF:EFColumn ename="col233" cname="col233" sort="true" />
	<EF:EFColumn ename="col234" cname="col234" sort="true" />
	<EF:EFColumn ename="col235" cname="col235" sort="true" />
	<EF:EFColumn ename="col236" cname="col236" sort="true" />
	<EF:EFColumn ename="col237" cname="col237" sort="true" />
	<EF:EFColumn ename="col238" cname="col238" sort="true" />
	<EF:EFColumn ename="col239" cname="col239" sort="true" />
	<EF:EFColumn ename="col240" cname="col240" sort="true" />
	<EF:EFColumn ename="col241" cname="col241" sort="true" />
	<EF:EFColumn ename="col242" cname="col242" sort="true" />
	<EF:EFColumn ename="col243" cname="col243" sort="true" />
	<EF:EFColumn ename="col244" cname="col244" sort="true" />
	<EF:EFColumn ename="col245" cname="col245" sort="true" />
	<EF:EFColumn ename="col246" cname="col246" sort="true" />
	<EF:EFColumn ename="col247" cname="col247" sort="true" />
	<EF:EFColumn ename="col248" cname="col248" sort="true" />
	<EF:EFColumn ename="col249" cname="col249" sort="true" />
	<EF:EFColumn ename="col250" cname="col250" sort="true" />
	<EF:EFColumn ename="col251" cname="col251" sort="true" />
	<EF:EFColumn ename="col252" cname="col252" sort="true" />
	<EF:EFColumn ename="col253" cname="col253" sort="true" />
	<EF:EFColumn ename="col254" cname="col254" sort="true" />
	<EF:EFColumn ename="col255" cname="col255" sort="true" />
	<EF:EFColumn ename="col256" cname="col256" sort="true" />
	<EF:EFColumn ename="col257" cname="col257" sort="true" />
	<EF:EFColumn ename="col258" cname="col258" sort="true" />
	<EF:EFColumn ename="col259" cname="col259" sort="true" />
	<EF:EFColumn ename="col260" cname="col260" sort="true" />
	<EF:EFColumn ename="col261" cname="col261" sort="true" />
	<EF:EFColumn ename="col262" cname="col262" sort="true" />
	<EF:EFColumn ename="col263" cname="col263" sort="true" />
	<EF:EFColumn ename="col264" cname="col264" sort="true" />
	<EF:EFColumn ename="col265" cname="col265" sort="true" />
	<EF:EFColumn ename="col266" cname="col266" sort="true" />
	<EF:EFColumn ename="col267" cname="col267" sort="true" />
	<EF:EFColumn ename="col268" cname="col268" sort="true" />
	<EF:EFColumn ename="col269" cname="col269" sort="true" />
	<EF:EFColumn ename="col270" cname="col270" sort="true" />
	<EF:EFColumn ename="col271" cname="col271" sort="true" />
	<EF:EFColumn ename="col272" cname="col272" sort="true" />
	<EF:EFColumn ename="col273" cname="col273" sort="true" />
	<EF:EFColumn ename="col274" cname="col274" sort="true" />
	<EF:EFColumn ename="col275" cname="col275" sort="true" />
	<EF:EFColumn ename="col276" cname="col276" sort="true" />
	<EF:EFColumn ename="col277" cname="col277" sort="true" />
	<EF:EFColumn ename="col278" cname="col278" sort="true" />
	<EF:EFColumn ename="col279" cname="col279" sort="true" />
	<EF:EFColumn ename="col280" cname="col280" sort="true" />
	<EF:EFColumn ename="col281" cname="col281" sort="true" />
	<EF:EFColumn ename="col282" cname="col282" sort="true" />
	<EF:EFColumn ename="col283" cname="col283" sort="true" />
	<EF:EFColumn ename="col284" cname="col284" sort="true" />
	<EF:EFColumn ename="col285" cname="col285" sort="true" />
	<EF:EFColumn ename="col286" cname="col286" sort="true" />
	<EF:EFColumn ename="col287" cname="col287" sort="true" />
	<EF:EFColumn ename="col288" cname="col288" sort="true" />
	<EF:EFColumn ename="col289" cname="col289" sort="true" />
	<EF:EFColumn ename="col290" cname="col290" sort="true" />
	<EF:EFColumn ename="col291" cname="col291" sort="true" />
	<EF:EFColumn ename="col292" cname="col292" sort="true" />
	<EF:EFColumn ename="col293" cname="col293" sort="true" />
	<EF:EFColumn ename="col294" cname="col294" sort="true" />
	<EF:EFColumn ename="col295" cname="col295" sort="true" />
	<EF:EFColumn ename="col296" cname="col296" sort="true" />
	<EF:EFColumn ename="col297" cname="col297" sort="true" />
	<EF:EFColumn ename="col298" cname="col298" sort="true" />
	<EF:EFColumn ename="col299" cname="col299" sort="true" />
	<EF:EFColumn ename="col300" cname="col300" sort="true" />
	<EF:EFColumn ename="col301" cname="col301" sort="true" />
	<EF:EFColumn ename="col302" cname="col302" sort="true" />
	<EF:EFColumn ename="col303" cname="col303" sort="true" />
	<EF:EFColumn ename="col304" cname="col304" sort="true" />
	<EF:EFColumn ename="col305" cname="col305" sort="true" />
	<EF:EFColumn ename="col306" cname="col306" sort="true" />
	<EF:EFColumn ename="col307" cname="col307" sort="true" />
	<EF:EFColumn ename="col308" cname="col308" sort="true" />
	<EF:EFColumn ename="col309" cname="col309" sort="true" />
	<EF:EFColumn ename="col310" cname="col310" sort="true" />
	<EF:EFColumn ename="col311" cname="col311" sort="true" />
	<EF:EFColumn ename="col312" cname="col312" sort="true" />
	<EF:EFColumn ename="col313" cname="col313" sort="true" />
	<EF:EFColumn ename="col314" cname="col314" sort="true" />
	<EF:EFColumn ename="col315" cname="col315" sort="true" />
	<EF:EFColumn ename="col316" cname="col316" sort="true" />
	<EF:EFColumn ename="col317" cname="col317" sort="true" />
	<EF:EFColumn ename="col318" cname="col318" sort="true" />
	<EF:EFColumn ename="col319" cname="col319" sort="true" />
	<EF:EFColumn ename="col320" cname="col320" sort="true" />
	<EF:EFColumn ename="col321" cname="col321" sort="true" />
	<EF:EFColumn ename="col322" cname="col322" sort="true" />
	<EF:EFColumn ename="col323" cname="col323" sort="true" />
	<EF:EFColumn ename="col324" cname="col324" sort="true" />
	<EF:EFColumn ename="col325" cname="col325" sort="true" />
	<EF:EFColumn ename="col326" cname="col326" sort="true" />
	<EF:EFColumn ename="col327" cname="col327" sort="true" />
	<EF:EFColumn ename="col328" cname="col328" sort="true" />
	<EF:EFColumn ename="col329" cname="col329" sort="true" />
	<EF:EFColumn ename="col330" cname="col330" sort="true" />
	<EF:EFColumn ename="col331" cname="col331" sort="true" />
	<EF:EFColumn ename="col332" cname="col332" sort="true" />
	<EF:EFColumn ename="col333" cname="col333" sort="true" />
	<EF:EFColumn ename="col334" cname="col334" sort="true" />
	<EF:EFColumn ename="col335" cname="col335" sort="true" />
	<EF:EFColumn ename="col336" cname="col336" sort="true" />
	<EF:EFColumn ename="col337" cname="col337" sort="true" />
	<EF:EFColumn ename="col338" cname="col338" sort="true" />
	<EF:EFColumn ename="col339" cname="col339" sort="true" />
	<EF:EFColumn ename="col340" cname="col340" sort="true" />
	<EF:EFColumn ename="col341" cname="col341" sort="true" />
	<EF:EFColumn ename="col342" cname="col342" sort="true" />
	<EF:EFColumn ename="col343" cname="col343" sort="true" />
	<EF:EFColumn ename="col344" cname="col344" sort="true" />
	<EF:EFColumn ename="col345" cname="col345" sort="true" />
	<EF:EFColumn ename="col346" cname="col346" sort="true" />
	<EF:EFColumn ename="col347" cname="col347" sort="true" />
	<EF:EFColumn ename="col348" cname="col348" sort="true" />
	<EF:EFColumn ename="col349" cname="col349" sort="true" />
	<EF:EFColumn ename="col350" cname="col350" sort="true" />
	<EF:EFColumn ename="col351" cname="col351" sort="true" />
	<EF:EFColumn ename="col352" cname="col352" sort="true" />
	<EF:EFColumn ename="col353" cname="col353" sort="true" />
	<EF:EFColumn ename="col354" cname="col354" sort="true" />
	<EF:EFColumn ename="col355" cname="col355" sort="true" />
	<EF:EFColumn ename="col356" cname="col356" sort="true" />
	<EF:EFColumn ename="col357" cname="col357" sort="true" />
	<EF:EFColumn ename="col358" cname="col358" sort="true" />
	<EF:EFColumn ename="col359" cname="col359" sort="true" />
	<EF:EFColumn ename="col360" cname="col360" sort="true" />
	<EF:EFColumn ename="col361" cname="col361" sort="true" />
	<EF:EFColumn ename="col362" cname="col362" sort="true" />
	<EF:EFColumn ename="col363" cname="col363" sort="true" />
	<EF:EFColumn ename="col364" cname="col364" sort="true" />
	<EF:EFColumn ename="col365" cname="col365" sort="true" />
	<EF:EFColumn ename="col366" cname="col366" sort="true" />
	<EF:EFColumn ename="col367" cname="col367" sort="true" />
	<EF:EFColumn ename="col368" cname="col368" sort="true" />
	<EF:EFColumn ename="col369" cname="col369" sort="true" />
	<EF:EFColumn ename="col370" cname="col370" sort="true" />
	<EF:EFColumn ename="col371" cname="col371" sort="true" />
	<EF:EFColumn ename="col372" cname="col372" sort="true" />
	<EF:EFColumn ename="col373" cname="col373" sort="true" />
	<EF:EFColumn ename="col374" cname="col374" sort="true" />
	<EF:EFColumn ename="col375" cname="col375" sort="true" />
	<EF:EFColumn ename="col376" cname="col376" sort="true" />
	<EF:EFColumn ename="col377" cname="col377" sort="true" />
	<EF:EFColumn ename="col378" cname="col378" sort="true" />
	<EF:EFColumn ename="col379" cname="col379" sort="true" />
	<EF:EFColumn ename="col380" cname="col380" sort="true" />
	<EF:EFColumn ename="col381" cname="col381" sort="true" />
	<EF:EFColumn ename="col382" cname="col382" sort="true" />
	<EF:EFColumn ename="col383" cname="col383" sort="true" />
	<EF:EFColumn ename="col384" cname="col384" sort="true" />
	<EF:EFColumn ename="col385" cname="col385" sort="true" />
	<EF:EFColumn ename="col386" cname="col386" sort="true" />
	<EF:EFColumn ename="col387" cname="col387" sort="true" />
	<EF:EFColumn ename="col388" cname="col388" sort="true" />
	<EF:EFColumn ename="col389" cname="col389" sort="true" />
	<EF:EFColumn ename="col390" cname="col390" sort="true" />
	<EF:EFColumn ename="col391" cname="col391" sort="true" />
	<EF:EFColumn ename="col392" cname="col392" sort="true" />
	<EF:EFColumn ename="col393" cname="col393" sort="true" />
	<EF:EFColumn ename="col394" cname="col394" sort="true" />
	<EF:EFColumn ename="col395" cname="col395" sort="true" />
	<EF:EFColumn ename="col396" cname="col396" sort="true" />
	<EF:EFColumn ename="col397" cname="col397" sort="true" />
	<EF:EFColumn ename="col398" cname="col398" sort="true" />
	<EF:EFColumn ename="col399" cname="col399" sort="true" />
	<EF:EFColumn ename="col400" cname="col400" sort="true" />
	<EF:EFColumn ename="col401" cname="col401" sort="true" />
	<EF:EFColumn ename="col402" cname="col402" sort="true" />
	<EF:EFColumn ename="col403" cname="col403" sort="true" />
	<EF:EFColumn ename="col404" cname="col404" sort="true" />
	<EF:EFColumn ename="col405" cname="col405" sort="true" />
	<EF:EFColumn ename="col406" cname="col406" sort="true" />
	<EF:EFColumn ename="col407" cname="col407" sort="true" />
	<EF:EFColumn ename="col408" cname="col408" sort="true" />
	<EF:EFColumn ename="col409" cname="col409" sort="true" />
	<EF:EFColumn ename="col410" cname="col410" sort="true" />
	<EF:EFColumn ename="col411" cname="col411" sort="true" />
	<EF:EFColumn ename="col412" cname="col412" sort="true" />
	<EF:EFColumn ename="col413" cname="col413" sort="true" />
	<EF:EFColumn ename="col414" cname="col414" sort="true" />
	<EF:EFColumn ename="col415" cname="col415" sort="true" />
	<EF:EFColumn ename="col416" cname="col416" sort="true" />
	<EF:EFColumn ename="col417" cname="col417" sort="true" />
	<EF:EFColumn ename="col418" cname="col418" sort="true" />
	<EF:EFColumn ename="col419" cname="col419" sort="true" />
	<EF:EFColumn ename="col420" cname="col420" sort="true" />
	<EF:EFColumn ename="col421" cname="col421" sort="true" />
	<EF:EFColumn ename="col422" cname="col422" sort="true" />
	<EF:EFColumn ename="col423" cname="col423" sort="true" />
	<EF:EFColumn ename="col424" cname="col424" sort="true" />
	<EF:EFColumn ename="col425" cname="col425" sort="true" />
	<EF:EFColumn ename="col426" cname="col426" sort="true" />
	<EF:EFColumn ename="col427" cname="col427" sort="true" />
	<EF:EFColumn ename="col428" cname="col428" sort="true" />
	<EF:EFColumn ename="col429" cname="col429" sort="true" />
	<EF:EFColumn ename="col430" cname="col430" sort="true" />
	<EF:EFColumn ename="col431" cname="col431" sort="true" />
	<EF:EFColumn ename="col432" cname="col432" sort="true" />
	<EF:EFColumn ename="col433" cname="col433" sort="true" />
	<EF:EFColumn ename="col434" cname="col434" sort="true" />
	<EF:EFColumn ename="col435" cname="col435" sort="true" />
	<EF:EFColumn ename="col436" cname="col436" sort="true" />
	<EF:EFColumn ename="col437" cname="col437" sort="true" />
	<EF:EFColumn ename="col438" cname="col438" sort="true" />
	<EF:EFColumn ename="col439" cname="col439" sort="true" />
	<EF:EFColumn ename="col440" cname="col440" sort="true" />
	<EF:EFColumn ename="col441" cname="col441" sort="true" />
	<EF:EFColumn ename="col442" cname="col442" sort="true" />
	<EF:EFColumn ename="col443" cname="col443" sort="true" />
	<EF:EFColumn ename="col444" cname="col444" sort="true" />
	<EF:EFColumn ename="col445" cname="col445" sort="true" />
	<EF:EFColumn ename="col446" cname="col446" sort="true" />
	<EF:EFColumn ename="col447" cname="col447" sort="true" />
	<EF:EFColumn ename="col448" cname="col448" sort="true" />
	<EF:EFColumn ename="col449" cname="col449" sort="true" />
	<EF:EFColumn ename="col450" cname="col450" sort="true" />
	<EF:EFColumn ename="col451" cname="col451" sort="true" />
	<EF:EFColumn ename="col452" cname="col452" sort="true" />
	<EF:EFColumn ename="col453" cname="col453" sort="true" />
	<EF:EFColumn ename="col454" cname="col454" sort="true" />
	<EF:EFColumn ename="col455" cname="col455" sort="true" />
	<EF:EFColumn ename="col456" cname="col456" sort="true" />
	<EF:EFColumn ename="col457" cname="col457" sort="true" />
	<EF:EFColumn ename="col458" cname="col458" sort="true" />
	<EF:EFColumn ename="col459" cname="col459" sort="true" />
	<EF:EFColumn ename="col460" cname="col460" sort="true" />
	<EF:EFColumn ename="col461" cname="col461" sort="true" />
	<EF:EFColumn ename="col462" cname="col462" sort="true" />
	<EF:EFColumn ename="col463" cname="col463" sort="true" />
	<EF:EFColumn ename="col464" cname="col464" sort="true" />
	<EF:EFColumn ename="col465" cname="col465" sort="true" />
	<EF:EFColumn ename="col466" cname="col466" sort="true" />
	<EF:EFColumn ename="col467" cname="col467" sort="true" />
	<EF:EFColumn ename="col468" cname="col468" sort="true" />
	<EF:EFColumn ename="col469" cname="col469" sort="true" />
	<EF:EFColumn ename="col470" cname="col470" sort="true" />
	<EF:EFColumn ename="col471" cname="col471" sort="true" />
	<EF:EFColumn ename="col472" cname="col472" sort="true" />
	<EF:EFColumn ename="col473" cname="col473" sort="true" />
	<EF:EFColumn ename="col474" cname="col474" sort="true" />
	<EF:EFColumn ename="col475" cname="col475" sort="true" />
	<EF:EFColumn ename="col476" cname="col476" sort="true" />
	<EF:EFColumn ename="col477" cname="col477" sort="true" />
	<EF:EFColumn ename="col478" cname="col478" sort="true" />
	<EF:EFColumn ename="col479" cname="col479" sort="true" />
	<EF:EFColumn ename="col480" cname="col480" sort="true" />
	<EF:EFColumn ename="col481" cname="col481" sort="true" />
	<EF:EFColumn ename="col482" cname="col482" sort="true" />
	<EF:EFColumn ename="col483" cname="col483" sort="true" />
	<EF:EFColumn ename="col484" cname="col484" sort="true" />
	<EF:EFColumn ename="col485" cname="col485" sort="true" />
	<EF:EFColumn ename="col486" cname="col486" sort="true" />
	<EF:EFColumn ename="col487" cname="col487" sort="true" />
	<EF:EFColumn ename="col488" cname="col488" sort="true" />
	<EF:EFColumn ename="col489" cname="col489" sort="true" />
	<EF:EFColumn ename="col490" cname="col490" sort="true" />
	<EF:EFColumn ename="col491" cname="col491" sort="true" />
	<EF:EFColumn ename="col492" cname="col492" sort="true" />
	<EF:EFColumn ename="col493" cname="col493" sort="true" />
	<EF:EFColumn ename="col494" cname="col494" sort="true" />
	<EF:EFColumn ename="col495" cname="col495" sort="true" />
	<EF:EFColumn ename="col496" cname="col496" sort="true" />
	<EF:EFColumn ename="col497" cname="col497" sort="true" />
	<EF:EFColumn ename="col498" cname="col498" sort="true" />
	<EF:EFColumn ename="col499" cname="col499" sort="true" />
	<EF:EFColumn ename="col500" cname="col500" sort="true" />


</EF:EFGrid>      


     
<jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>

</body>
</html>   
