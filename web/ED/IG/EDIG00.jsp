<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%><%@ page language="java"
	import="com.baosight.iplat4j.upload.*,java.io.File,com.baosight.iplat4j.er.util.*,com.baosight.iplat4j.util.transform.TransformUtils,java.util.Date,java.io.File,com.baosight.iplat4j.core.ei.EiInfo,com.baosight.iplat4j.core.FrameworkInfo"%>
<%!boolean delAllFile(String path) {
		boolean flag = false;
		File file = new File(path);
		if (!file.exists()) {
			return flag;
		}
		if (!file.isDirectory()) {
			return flag;
		}
		String[] tempList = file.list();
		File temp = null;
		for (int i = 0; i < tempList.length; i++) {
			if (path.endsWith(File.separator)) {
				temp = new File(path + tempList[i]);
			} else {
				temp = new File(path + File.separator + tempList[i]);
			}
			if (temp.isFile()) {
				temp.delete();
			}
			if (temp.isDirectory()) {
				delAllFile(path + "/" + tempList[i]);// 先删除文件夹里面的文件
				deleteFile(path + "/" + tempList[i]);// 再删除空文件夹
				flag = true;
			}
		}
		return flag;
	}

	void deleteFile(String folderPath) {
		try {
			delAllFile(folderPath); // 删除完里面所有内容
			String filePath = folderPath;
			filePath = filePath.toString();
			java.io.File myFilePath = new java.io.File(filePath);
			myFilePath.delete(); // 删除空文件夹
		} catch (Exception e) {
			e.printStackTrace();
		}
	}%>
<%
	//  EiInfo info = (EiInfo)request.getAttribute("ei");
	String fileurl = request.getParameter("fileurl");
	String dir = FrameworkInfo.getInfoGenDir();
	File file1 = new File(fileurl);
	File dirFile = new File(dir);
	String[] files = dirFile.list();
	String tempStr = "";
	int index;
	long nowTime = new Date().getTime();
	for (int j = 0; j < files.length; j++) {
		File tempFile = new File(dir + files[j]);
		index = files[j].indexOf(".");
		long tempFileTime = tempFile.lastModified();
		long gap = nowTime - tempFileTime;
		//86400000为一天的毫秒数
		if (gap > 86400000) {
			if (tempFile.exists()) {

				deleteFile(dir + files[j]);
			}
		}

	}

	if (file1.exists()) {
		FileUploadBean fileuploadbean = new FileUploadBean();
		fileuploadbean.setFileURLOfDownServerToClient(fileurl);
		fileuploadbean.setUploadType("downloadFromServerToClient");
		FileUploadManager manager = new FileUploadManager(
				fileuploadbean);
		manager.execute(pageContext);
		//file1.delete();
	}
%>
<%
	if (!file1.exists()) {
%>
<script type="text/javascript">
	alert("文件路径错误或者文件不存在!");
</script>
<%
	}
%>
