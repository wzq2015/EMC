<%@page import="java.util.HashMap"%>
<%@page import="com.baosight.iplat4j.ec.lg.utils.ECLGConstant"%>
<%@page import="com.baosight.iplat4j.ec.lg.utils.ECLGUtils"%>
<%@page import="com.baosight.iplat4j.util.PlatUtils"%>
<%@page import="com.baosight.iplat4j.util.DateUtils"%>
<%@page import="com.baosight.iplat4j.dao.Dao"%>
<%@page import="com.baosight.iplat4j.core.spring.SpringApplicationContext"%>
<%@page import="com.baosight.iplat4j.util.GenGraphic"%>
<%@page import="com.baosight.iplat4j.core.FrameworkInfo"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.io.*"%>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.util.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="org.apache.commons.fileupload.FileItemIterator" %>
<%@ page import="org.apache.commons.fileupload.disk.DiskFileItemFactory" %>
<%@ page import="java.io.BufferedInputStream" %>
<%@ page import="java.io.BufferedOutputStream" %>
<%@ page import="java.io.File"%>
<%@ page import="java.io.InputStream" %>
<%@ page import="java.io.OutputStream" %>
<%@ page import="java.io.FileOutputStream" %>
<%@ page import="java.util.regex.Matcher" %>
<%@ page import="java.util.regex.Pattern" %>
<%@ page import="java.util.Date" %>



<%
//仅做示例用，请自行修改
//保存文件路径
//String filePath = "ueditor/jsp/upload";
//String realPath = request.getRealPath("\\") + filePath;
String filePath ="";
String bashPath=FrameworkInfo.getText("upload.dir"); 
String projectEname = FrameworkInfo.getPlatProjectEname();//项目英文名
String projectType = FrameworkInfo.getProjectType();//项目类型
String uploadPath=bashPath+"/File/";  
String uploadRelaPath="/File/";
uploadPath=uploadPath+"image/";           //绝对路径
uploadRelaPath=uploadRelaPath+"image/";   //相对路径
String fileId=projectEname+projectType+new Date().getTime();//项目英文名+项目类型+生成文档时的时间戳   如：iplat01245223469502
String userId = PlatUtils.getUserId();

//判断路径是否存在，不存在则创建
File dir = new File(uploadPath);
if(!dir.isDirectory())
    dir.mkdir();
if(ServletFileUpload.isMultipartContent(request)){

    DiskFileItemFactory dff = new DiskFileItemFactory();
    dff.setRepository(dir);
    dff.setSizeThreshold(1024000);
    ServletFileUpload sfu = new ServletFileUpload(dff);
    FileItemIterator fii = sfu.getItemIterator(request);
    String title = "";   //图片标题
    String url = "";    //图片地址
    String fileName = "";
    String fileDes = "";
    String originalName = "";
	String state="SUCCESS";
	
	try{
	    while(fii.hasNext()){
	        FileItemStream fis = fii.next();
	
	            if(!fis.isFormField() && fis.getName().length()>0){
	                fileName = fis.getName();
	                
					Pattern reg=Pattern.compile("[.]jpg|png|jpeg|gif$");
					Matcher matcher=reg.matcher(fileName);
					if(!matcher.find()) {
						state = "文件类型不允许！";
						break;
					}
	                //url = realPath+"/"+new Date().getTime()+fileName.substring(fileName.lastIndexOf("."),fileName.length());
	                url = uploadPath+fileId+"_"+fileName;
	                BufferedInputStream in = new BufferedInputStream(fis.openStream());//获得文件输入流
	                
	                System.out.println(url);
	                
	                File newFile = new File(url);
	                if(!newFile.exists()) {
	                	newFile.createNewFile();
	                }
	                
	                FileOutputStream a = new FileOutputStream(newFile);
	                BufferedOutputStream output = new BufferedOutputStream(a);
	                Streams.copy(in, output, true);//开始把文件写到你指定的上传文件夹
	                
	                //支持缩略图
	                String littleImagePath=uploadPath+File.separator+"littleImage";
	                File little=new File(littleImagePath);
	                if(!little.exists()){
	                   little.mkdirs();
	                }

	                GenGraphic.transferGraphic(uploadPath+fileId+"_"+fileName, littleImagePath+File.separator+fileId+"_"+fileName, 35, 35);
					
	                Dao dao = (Dao) SpringApplicationContext.getBean("dao");
	        		HashMap map=new HashMap();
        		    map.put("fileId",fileId);
        		    map.put("fileName",fileName);
        		    map.put("fileDes"," ");
        		    map.put("typeId","0000000000000102");
        		    map.put("fileSize",newFile.length()+"");
        			map.put("filePath",uploadRelaPath+fileId+"_"+fileName);
        			map.put("recCreator",userId);
        			map.put("recCreateTime",DateUtils.curDateTimeStr14());
        			dao.update("tecdm01.insert",map);	
	        		 
        			ECLGUtils.log(fileId ,ECLGConstant.NODE_DOC,ECLGConstant.DOC_CREATE);
        			
        			filePath = "EC/DM/ECDM0104.jsp?fileId="+fileId;
	            }else{
	                String fname = fis.getFieldName();
					if(fname.indexOf("fileName")!=-1){
						BufferedInputStream in = new BufferedInputStream(fis.openStream());
	                    byte c [] = new byte[10];
	                    int n = 0;
	                    while((n=in.read(c))!=-1){
	                    	originalName = new String(c,0,n);
	                        break;
	                    }
	                    in.close();
						
					}
	                if(fname.indexOf("upfile")!=-1){
	                    BufferedInputStream in = new BufferedInputStream(fis.openStream());
	                    byte c [] = new byte[10];
	                    int n = 0;
	                    while((n=in.read(c))!=-1){
	                        title = new String(c,0,n);
	                        break;
	                    }
	                    in.close();
	                }
	            }
	
	        
	    }
	}catch(Exception e){
        e.printStackTrace();
    }
	title = title.replace("&", "&amp;").replace("'", "&qpos;").replace("\"", "&quot;").replace("<", "&lt;").replace(">", "&gt;");
	response.getWriter().print("{'original':'"+originalName+"','url':'"+filePath+"','title':'"+title+"','state':'"+state+"'}");

}
%>
