<!DOCTYPE html>
<%@page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
    String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>
<html>
<head>
    <script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
    <script type="text/javascript" src="./ED/MD/EDMDM2.js"></script>
</head>

<body class="bodyBackground">
<form id="EDMDM2" method="POST" action="<%=actionUrl%>" >
    <jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>

    <div id = "ef_region_inqu" title="查询条件" efRegionShowClear=true>
        <div style="overflow:hidden;width:100%">
            <table>
                <tr>
                    <td nowrap align="right" width="120px">名称</td>
                    <td nowrap colspan="1" width="175px">
                        <EF:EFInput blockId="inqu_status" ename="remark" row="0" type="text" />
                    </td>
                    <td nowrap align="right" width="105px">序列号类型编号</td>
                    <td nowrap colspan="1" width="175px">
                        <EF:EFInput blockId="inqu_status" ename="seqTypeId" row="0" type="text" />
                    </td>
                    <td nowrap align="right" width="105px">帐套编号</td>
                    <td nowrap colspan="1" width="175px">
                        <EF:EFInput blockId="inqu_status" ename="accsetNo" row="0" type="text" />
                    </td>

                </tr>
            </table>
        </div>
    </div>

    <div id = "ef_region_result" title="序号定义记录集" style="overflow:scroll">
        <div id = "ef_grid_r" title="序号定义信息" style="overflow: hidden;height:190px;">
        </div>
    </div>
    <div id="ef_tab_y"  lastRange="98%" eftabWidth="100%" eftabType="efRoundDivTab">
        <div id="subsection" title="序列号分段记录集" >
            <div id = "ef_region_subsection" title="序列号分段记录集" style="overflow:scroll;">
                <div id = "ef_grid_subsection" title="序列号分段记录集" style="overflow: hidden;height:140px;">
                </div>
                <EF:EFInput blockId="subsection_inqu_status" ename="seqTypeId" row="0" type="hidden"/>
            </div>
        </div>

        <div id="test" title="测试" >
            <div id = "ef_region_test" title="测试" style="overflow:scroll;">
                <div id = "ef_grid_test" title="序列号分段记录集" style="overflow: hidden;height:140px;">
                </div>
            </div>
        </div>
    </div>
    <EF:EFRegion/>

    <EF:EFGrid blockId="result" autoDraw="no" readonly="false" paintId="ef_grid_r"  >
        <EF:EFColumn ename="remark" cname='名称' width="150" nullable="false" />
        <EF:EFColumn ename="seqTypeId" cname='序列号类型编号' width="150"  nullable="false" maxLength="20"/>
        <EF:EFColumn ename="accsetNo" cname='帐套编号' width="150"  nullable="true"/>
        <EF:EFColumn ename="seqSubsecs" cname='序列号分段数' width="150"  enable="false" />
        <EF:EFComboColumn ename="dateCycle" cname="日期循环级别" blockName="date_cycles"
                          valueProperty="date_cycle"  labelProperty="date_cycle_desc" >
            <EF:EFOption value="N" label="不循环" />
        </EF:EFComboColumn>
        <EF:EFColumn ename="subidLmtLen" cname='子项最大长度' width="150" enable="false"/>
        <EF:EFColumn ename="seqLmt" cname='序列号长度' width="150"   enable="false"/>
        <EF:EFColumn ename="isLinked"  cname='是否连号' width="150"   enable="false"/>
    </EF:EFGrid>

    <EF:EFGrid blockId="subsection" autoDraw="no" readonly="false" ajax="true"  >
        <%--<EF:EFColumn ename="seqTypeId" cname='序列号类型编码' width="150"   nullable="false" maxLength="3"/>--%>
        <EF:EFColumn ename="subsecSeq" cname='分段序号'  width="150"  nullable="false" maxLength="1" validateType="positive_integer" />
        <EF:EFColumn ename="subsecName" cname='分段名称'  width="150" nullable="false" maxLength="20"/>
        <EF:EFComboColumn ename="subsecType" cname="分段类型" blockName="sec_types"
                          valueProperty="subsecType"  labelProperty="sec_type_desc" width="140" >
        </EF:EFComboColumn>
        <EF:EFColumn ename="subsecContent" cname='定义内容'  width="150" />
        <EF:EFColumn ename="subsecLen" cname='分段长度'  width="150"   maxLength="2" validateType="positive_integer" nullable="false"/>
        <EF:EFComboColumn ename="dateFormat" cname="日期格式" blockName="dateFormats"
                          valueProperty="dateFormat"  labelProperty="dateFormat_desc" width="140" >
            <EF:EFOption value="" label="请选择" />
        </EF:EFComboColumn>
    </EF:EFGrid>

    <EF:EFGrid blockId="test" autoDraw="no" readonly="false" ajax="true">
        <EF:EFColumn ename="param1" cname='参数1' width="150"   nullable="true"/>
        <EF:EFColumn ename="param2" cname='参数2'  width="150" nullable="true" />
        <EF:EFColumn ename="param3" cname='参数3'  width="150" nullable="true" />
        <EF:EFColumn ename="param4" cname='参数4'  width="150" nullable="true" />
        <EF:EFColumn ename="param5" cname='参数5'  width="150" nullable="true" />
        <EF:EFColumn ename="sequence" cname='序列号'  width="150" enable="false" />
    </EF:EFGrid>
    <EF:EFTab tabId="y" />

    <jsp:include flush="false" page="../../EF/Form/iplat.ef.tail.jsp"></jsp:include>
</form>
</body>
</html>