
<%@ page contentType="text/html;charset=UTF-8" language="java" import="java.io.*,java.util.*,
                 com.maxreport.report.*,com.maxreport.*,com.maxreport.util.*,
                 com.maxreport.datasource.*,com.maxreport.param.*" %>
<%@ taglib uri="/WEB-INF/tlds/maxreport.tld" prefix="maxreport" %> 


<%
  String projectName = request.getParameter("projectName");
  String reportName = request.getParameter("reportName");
  String runID = request.getParameter("runID");

  String exportname = MaxReportsEncodeUtil.ISOtoGB(request.getParameter("exportname"));
  if (exportname == null) exportname = "";
  
  if (runID == null) {
   MaxReportEngine ReportEngine = new MaxReportEngine();
   ((MaxReportEngine)ReportEngine).Oo0o0Oo0O00Ooo0OOO0 = request;
   try {
	  MaxProjectsManagerFace Projects = MaxProjectsManager.getInstance();
	  MaxProjectFace project = Projects.getProject(projectName);
	  MaxReportInfoListFace reportList = project.getReportInfoList();
	  MaxReportInfoFace ReportInfo = reportList.findReportInfo(reportName);

	  ReportInfo.setrunType(0);
	  
	  ReportEngine.setReport(ReportInfo);

    Enumeration paramN = request.getParameterNames();
    while( paramN.hasMoreElements() ) {
      String name=(String)paramN.nextElement();
      String value = MaxReportsEncodeUtil.ISOtoGB(request.getParameter( name )); 
      if ((value != null) && (value.length() >0))
       ReportEngine.setParamValue( name, value);
     }
   
	  //ReportEngine.setReport(projectName,reportName);
	  
	  ReportEngine.execReportEngine();
	  runID = ReportInfo.getInstanceID();
   } catch (Exception engineError) {
	   ReportEngine.setErrorMessage(engineError);
     throw new JspTagException(engineError.getMessage());
   }
  } 
%>

<html>
<head>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache"> 
<META HTTP-EQUIV="Cache-Control" CONTENT="no-cache"> 
<META HTTP-EQUIV="Expires" CONTENT="0"> 
<title></title>
<style type=text/css>
.nav {
  FONT: bold 9pt Tahoma; COLOR: #283e66; TEXT-DECORATION: none
}
</style>

</head>


<body  Leftmargin=20 topmargin=0  rightmargin="0" bottommargin="0">

<maxreport:showHtmlReport
     name="maxView" 
     align="center" 
     pageCut="0"
     pageURL="ER/maxReport/rp_reports_view.jsp"
     projectName="<%=projectName%>"
     reportName="<%=reportName%>"
     runID="<%=runID%>"
/>

</BODY>

</html>
