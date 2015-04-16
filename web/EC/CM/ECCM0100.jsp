<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%@ taglib prefix="EFNew" uri="/WEB-INF/framework/tlds/EFNew.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<EFNew:EFHead includeDefault="true">
<EFNew:EFScript src="./EC/CM/ECCM01.js"/>
</EFNew:EFHead>

<body class="bodyBackground">

<EFNew:EFForm formId="ECCM0100">
   <input type="hidden" id="context" value="<%=request.getContextPath()%>">
   <EFNew:EFRegion regionId="ef_region_show">
   <EFNew:EFRegion regionId="ef_region_all">
    <EFNew:EFLayout  col="2" splitter="1,1">
          <EFNew:EFTree model="tableTreeModel" id="nTree" text="站点栏目树" configFunc="configTree" style="overflow:auto; width:200; height:90%;"></EFNew:EFTree>
      <EFNew:EFPanel>
   
          <EFNew:EFRegion regionId="ef_region_inqu" title="查询条件">
              <EFNew:EFLayout col="3">
              <EFNew:EFLabelInput bindId="inqu_status-0-columnName" cname="栏目名称"  />
              <EFNew:EFLabelSelect bindId="inqu_status-0-columnName" cname="所属文章审核控制"  >
                 <EF:EFOption label="" value=""/>
	             <EF:EFOption label="是" value="1"/>
	             <EF:EFOption label="否" value="0"/>
              </EFNew:EFLabelSelect>
              <EFNew:EFLabelSelect bindId="inqu_status-0-columnName" cname="所属文章引用控制"  >
                  <EF:EFOption label="" value=""/>
	              <EF:EFOption label="是" value="1"/>
	              <EF:EFOption label="否" value="0"/>
              </EFNew:EFLabelSelect>
              </EFNew:EFLayout>
          </EFNew:EFRegion>
          
         <EFNew:EFRegion regionId="ef_region_result" title="记录集"  style="overflow:scroll">
		 <EFNew:EFGrid blockId="result" ajax="true" autoDraw="false"  style="navigationBar:false;">
			<EF:EFColumn ename="columnId" cname="栏目ID" visible="false"/>
			<EF:EFColumn ename="columnName" cname="栏目名称" nullable="false" maxLength="50" minLength="1" validateType="chinese_string" validateErrorPrompt="栏目名称" />
			<EF:EFColumn ename="columnAlias" cname="栏目存放位置" nullable="false" maxLength="50" minLength="1" validateType="string" validateErrorPrompt="栏目存放位置" />
			<EF:EFColumn ename="columnSeq" cname="排序标识" />
			<EF:EFComboColumn ename="isAudit" cname="所属文章审核控制" >
			<EF:EFOption value="0" label="否" />
			<EF:EFOption value="1" label="是" />
			</EF:EFComboColumn>
			<EF:EFComboColumn ename="isRefer" cname="所属文章引用控制">
			<EF:EFOption value="0" label="否" />
			<EF:EFOption value="1" label="是" />
			</EF:EFComboColumn>
			<EF:EFComboColumn ename="isAnony" cname="是否允许匿名浏览" >
			<EF:EFOption value="0" label="否" />
			<EF:EFOption value="1" label="是" />
			</EF:EFComboColumn>
			<EF:EFComboColumn ename="columnType" cname="栏目类型" >
			<EF:EFOption value="0" label="普通栏目" />
			<EF:EFOption value="2" label="cognos类型" />
			</EF:EFComboColumn>
			
			<EF:EFColumn ename="parentType" cname="父结点类型" visible="fasle"/>
			<EF:EFColumn ename="parentID" cname="父结点ID" visible="fasle"/>
			<EF:EFColumn ename="siteID" cname="所属站点ID" visible="fasle"/>
			<EF:EFColumn ename="columnPath" cname="栏目路径" visible="fasle"/>
			<EF:EFColumn ename="columnImg" cname="对应图片" visible="fasle"/>
			
			<EF:EFColumn ename="uploadColumnImg" cname="上传" enable="fasle" width="50"/>
			<EF:EFColumn ename="viewColumnImg" cname="查看" enable="fasle" width="50"/>
		</EFNew:EFGrid> 
	</EFNew:EFRegion>
      </EFNew:EFPanel>   
  </EFNew:EFLayout>
  </EFNew:EFRegion>
  </EFNew:EFRegion>
</EFNew:EFForm>
</body>
</html>   
