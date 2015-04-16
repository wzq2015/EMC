<!DOCTYPE html>
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/EE503.js"></script>
</head>
 
<body class="bodyBackground">
<jsp:include flush="false" page="../EF/Form/iplat.ef.head.jsp"></jsp:include>

<div id ="cascadeSelect1" cascadeSelectIds="continenetInput,countryInput,cityInput" 
cascadeService="EE503" cascadeServiceMethod="getCascadeSelect"> 
</div>

<div id = "ef_region_inqu" title="级联下拉选择" efRegionShowClear=true>
	<div style="overflow:hidden;width:100%">
	<form id="EE502" method="POST" action="" >
<table >
<tr>
<td>
洲：
</td>
<td>
<input id="continenetInput" class="inputField" type="text" linkedFiled="inqu_status-0-tree_ename" size="9" readonly onclick = "efcascadeselect.getEiInfo(this,'cascadeSelect1')" />
	<img title="洲列表" id="continenet_list_node" 
	onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
	 onmouseover="javascript:this.style.cursor='hand'" onClick="efcascadeselect.getEiInfo(ef.get('continenetInput'),'cascadeSelect1')">
</td>

<td noWarp width="5%">
&nbsp;&nbsp;国家:
</td>

<td>
<input noWarp width="5%" id="countryInput" class="inputField" type="text" linkedFiled="inqu_status-0-node_ename" size="9" readonly onclick = "efcascadeselect.getEiInfo(this,'cascadeSelect1')" />
				<img title="国家列表" id="country_list_node" 
				onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
				 onmouseover="javascript:this.style.cursor='hand'" onClick="efcascadeselect.getEiInfo(ef.get('countryInput'),'cascadeSelect1')">
</td>

<td noWarp width="5%">&nbsp;&nbsp;城市:</td>
<td>
<input noWarp width="5%" id="cityInput" readonly type="text" class="inputField" size="9" onclick="efcascadeselect.getEiInfo(this,'cascadeSelect1')"/>
				<img title="城市列表" id="city_list_node" 
				onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
				  onmouseover="javascript:this.style.cursor='hand'" onClick="efcascadeselect.getEiInfo(ef.get('cityInput'),'cascadeSelect1')">
</td>
</tr>
</table>

</div>

	<div>
		<table>
		  <tr>
		    <td noWarp=-1 >
		      洲节点树英文名
		    </td>
		    <td noWarp=-1 >
		      <EF:EFInput blockId="inqu_status" ename="tree_ename" row="0" />
		    </td>
		    <td noWarp=-1>
		      国家节点英文名
		    </td>
		    <td noWarp=-1 >
	      <EF:EFInput blockId="inqu_status" ename="node_ename" row="0" />

		    </td>
		  </tr>
		</table>
	</div>
</div>

<div id ="cascadeSelect2" cascadeSelectIds="inqu_status1-0-tree_ename,inqu_status1-0-node_ename" 
cascadeService="EDPI10Cascade" cascadeServiceMethod="getCascadeSelect"> 
</div>

<div id ="cascadeSelect3" cascadeSelectIds="inqu_status1-0-tree_ename,inqu_status1-0-node_cname" 
cascadeService="EDPI10Cascade3" cascadeServiceMethod="getCascadeSelect"> 
</div>

<div id="ef_region_inqu2" title="多级平行级联" efRegionShowClear="true" >
<div style="overflow:hidden;width:100%">

<table>
		  <tr>
		    <td  nowrap width="20%" >
		      节点树英文名
		    </td>
		    <td  nowrap width="30%" >
		      <EF:EFInput blockId="inqu_status1" ename="tree_ename" row="0" etc=""/>
				<img title="树结点列表" id="tree_list_node" 
				onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
				 onmouseover="javascript:this.style.cursor='hand'" onClick="efcascadeselect.getEiInfo(ef.get('inqu_status1-0-tree_ename'),'cascadeSelect2')">
		    </td>
		    </tr>
		    
		    <tr>
		    <td  nowrap width="20%">
		      节点英文名  
		    </td>
		    <td  nowrap width="30%" >
		      <EF:EFInput blockId="inqu_status1" ename="node_ename" row="0" etc=""/>	
				<img title="结点英文名列表" id="treeEname_list_node" 
				onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
				 onmouseover="javascript:this.style.cursor='hand'" onClick="efcascadeselect.getEiInfo(ef.get('inqu_status1-0-node_ename'),'cascadeSelect2')">
		    </td>
		    
		    <td  nowrap width="20%">
		      节点中文名  
		    </td>
		    <td  nowrap width="30%" >
		      <EF:EFInput blockId="inqu_status1" ename="node_cname" row="0" etc=""/>	
				<img title="结点中文名列表" id="treeCname_list_node" 
				onload="efico.setImageSrc(this,'efform.efImgList')" src="./EF/Images/eftree_blank.png"
				 onmouseover="javascript:this.style.cursor='hand'" onClick="efcascadeselect.getEiInfo(ef.get('inqu_status1-0-node_cname'),'cascadeSelect3',true,false)">
		    </td>		    
		  </tr>
</table>
</div>

</div>

<EF:EFRegion/>
	</form>
<jsp:include flush="false" page="./EF/Form/iplat.ef.tail.jsp"></jsp:include>
</body>
</html>   
