<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java"
	import="java.util.*,com.baosight.iplat4j.base.store.*,com.baosight.iplat4j.base.utils.*,com.baosight.iplat4j.base.handler.*,com.baosight.iplat4j.base.converter.*,com.baosight.iplat4j.base.converter.impl.*,com.baosight.iplat4j.security.imex.*,com.baosight.iplat4j.upload.*"%>
<%
	request.setCharacterEncoding("UTF-8");
  
	FileUploadBean Bean = new FileUploadBean();
	Bean.setUploadFiletype("txt,xls");
	Bean.setUploadType(UpLoadUtil.UPLOAD_TO_STREAM);
	FileUploadManager manager = new FileUploadManager(Bean);
	manager.execute(pageContext);

	boolean uploadOk = Bean.isStatues();
	TaskResult result = null;
	String message = "";

	if (uploadOk) //上传成功
	{
		String imType = (String) request.getParameter("im");
		String encoding = (String) request.getParameter("encoding");
		String erropt = (String) request.getParameter("erropt");
		String expmax = (String) request.getParameter("expmax");

		ImexType imex = DataImexGlobal.getImexType(imType);

		ItemConverter converter = imex.getConverter();
		String fileType = "XLS";
		String fileName="";
	    //String fileName=Bean.getUploadFileNames().get(0).toString();
	    List fileNames=Bean.getUploadFileNames();
	    if(fileNames!=null&fileNames.size()>0)
	    	fileName=fileNames.get(0).toString();
	 
		if (fileName.endsWith(".txt")) {
			fileType = "TXT";
			String2Array toString = new String2Array();
			ConverterChain chain = new ConverterChain();
			chain.chainConverter(toString).chainConverter(converter);
			converter = chain;
		}

		try {
			StreamType streamType = StreamTypeGlobal.getStreamType(fileType);
			Source src = streamType.createSource(Bean.getInputStream(0), converter, encoding);

			Iterator it = src.getItems();
			if (fileType.equals("XLS") && it.hasNext()) {
                it.next();
			}
			ExecutionTask project = new ExecutionTask();
			if ("RESM".equals(erropt)) {
		        project.setOption(ExecutionTask.OPT_EXCEPTION, ExecutionTask.EXCEPTION_RESUME);
			}
			
			if ( expmax != null ){
				Integer maxCount = new Integer( expmax );
				project.setOption(ExecutionTask.EXP_REPORT, maxCount);
			}
			

			project.setHandler(imex.getImportHandler());
			result = project.execute(it);

			message = "共处理节点" + result.getTotal() + "条,其中成功处理" + result.getSuccess() + "条;\\n";

			HandleResult[] results = result.getResults();
			for (int i = 0; i < results.length; i++) {
              HandleResult ret = results[i];
              String myMsg = ret.getMessage();
              Throwable ex = ret.getThrowable();
              if( ex != null ){
            	  String trace = ThrowableUtils.format(ex, "\\r\\n");
            	  myMsg += "<br>"+ trace;
              }
		      message += myMsg + "<br>";
			}
		} catch (Exception e) {
			message = e.getMessage();
		}
	} else {
		message = "导入文件失败！" + "请上传" + Bean.getUploadFiletype() + "类型文件!";
	}
	
	pageContext.getResponse().flushBuffer();
%>
<script type="text/javascript">
var hint = "<%=message%>";
window.parent.setMessage(hint);
</script>


