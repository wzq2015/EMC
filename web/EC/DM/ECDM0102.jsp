<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page language="java" import="com.baosight.iplat4j.upload.*,
								com.baosight.iplat4j.core.spring.SpringApplicationContext,
								com.baosight.iplat4j.dao.*,
								java.util.HashMap,
								java.util.Map,
								com.baosight.iplat4j.ee.dm.utils.*,
								com.baosight.iplat4j.core.threadlocal.*,
								java.io.File,
								java.util.ArrayList,
                                java.util.List,
                                java.util.Date,
                                com.baosight.iplat4j.logging.Logger,
                                com.baosight.iplat4j.logging.LoggerFactory,
                                com.baosight.iplat4j.ec.util.ECLogConstant,
                                com.baosight.iplat4j.ec.lg.utils.ECLGConstant,
                                com.baosight.iplat4j.ec.lg.utils.ECLGUtils,
                                com.baosight.iplat4j.core.FrameworkInfo,
                                com.baosight.iplat4j.ec.util.*,
                                org.apache.commons.lang.StringUtils,
								com.baosight.iplat4j.util.*"%>
<%@page import="com.mysql.jdbc.log.Log"%>
<%@page import="javax.mail.Provider.Type"%>
<%@page import="javax.imageio.ImageIO"%>
<%@page import="java.io.FileInputStream"%>
<%@page import="java.awt.image.BufferedImage"%>
<%@page import="com.baosight.iplat4j.common.ec.domain.Tecsm01"%>
<%@page import="com.baosight.iplat4j.ec.tm.utils.TemplateUtils"%>
<html style="width:350px;height:250px;help:no;status:no;">
<head>
<title>文件上传</title>
<script type="text/javascript">CONTEXT_PATH = "../.."</script>
<script type="text/javascript" src="../../EF/jQuery/jquery-1.7.js"></script>
<!--<script type="text/javascript" src="../../EF/iplat-ui-2.0.js"></script>-->
<script type="text/javascript" src="../../EF/EF.js"></script>
<script type="text/javascript" src="ECDM0102.js"></script>
<script>
	function closeDiv(){
		var type = document.getElementById("hdtype").value;
		if(type != '1'){
			document.getElementById("divCreate").style.display="none";
		}
	}
</script>
</head>

<body onload="closeDiv()">
<%
//RS:112785
   
	Logger platLogger = LoggerFactory.getLogger("com.baosight.iplat4j.ec.dm.service.ServiceECDM01");
    com.baosight.iplat4j.core.threadlocal.UserSession.web2Service(request);
    String userId = PlatUtils.getUserId();
    String ATTACH_TYPE="0";
    String IMAGE_TYPE="1";
    String FLASH_TYPE="2";
    String VEDIO_TYPE="3";
    
    String ATTACH_SUFFIX="";
    String IMAGE_SUFFIX="jpg,jpeg,gif,png,bmp";
    String FLASH_SUFFIX="swf,flv";
    String VEDIO_SUFFIX="avi,wma,rmvb,rm,mp4,mid,3GP";
	FileUploadBean Bean = new FileUploadBean();
	String uploadType=null;
	String filePath  = ""; //真实存在路径
	String filePath1  = "";//相对路径

    BufferedImage img;
  
	//文件描述
    String fileDes=" ";
    if(!StringUtils.isBlank(request.getParameter("fileDes"))){
    	fileDes = request.getParameter("fileDes");
    	fileDes=new String(fileDes.getBytes("ISO8859_1"),"UTF-8");
    }
	
	
   
	
    //1：从ECDM0105页面跳转到ECDM0102页面 0：从ECDM0101页面跳转到ECDM0102页面
    String qt="";
    if(!StringUtils.isBlank(request.getParameter("qt"))){
    	qt = request.getParameter("qt");
    }else{
    	qt = "0";
    }

    		
	//获取当前系统的绝对路径
	String bashPath=FrameworkInfo.getText("upload.dir"); 
	String projectEname = FrameworkInfo.getPlatProjectEname();//项目英文名
	String projectType = FrameworkInfo.getProjectType();//项目类型
	String uploadRelaPath=bashPath+"EC/File/";
	String tempPath=bashPath+"EC/File/temp";
	//保存位子的相对路径
	String uploadPath="/EC/File/";
	String type=request.getParameter("type");
	String typeId=request.getParameter("typeId");

	String fileId=projectEname+projectType+new Date().getTime();//项目英文名+项目类型+生成文档时的时间戳   如：iplat01245223469502
	String beanFileName=""; String beanFileName2="";
	String uploadRelaPath1 = ""; String filePath0 = "";
	int width=0;int height=0;
	String nodeId = "";
	String nodeType = "";
	TemplateUtils util;
	String aliaS = "";
	String projectName = "";
	
	String contentUrl = "/"+TemplateUtils.getWebContentPath()+TemplateConstant.dirStaticFile; //得到web运行目录
			
	//根据栏目Id获取栏目别名及上级栏目别名(包括站点)
	if(!StringUtils.isBlank(request.getParameter("nodeId"))){
		nodeId = request.getParameter("nodeId");  //节点Id
		nodeType = request.getParameter("nodeType");
		util = new TemplateUtils();
		if("s".equals(nodeType)){   //站点
			aliaS = util.getSiteAliasBySiteId(nodeId)+"/";
		}else{						//栏目
			aliaS = util.getAliaString(nodeId);
		}
		projectName = util.getProjectPath();
	}
	
	
	if(ATTACH_TYPE.equals(type)){
		uploadType=ATTACH_SUFFIX;
		uploadPath=uploadPath+"attach/";
		uploadRelaPath= projectName+"/content/"+ aliaS + "uploadattach/"; 
		uploadRelaPath1 = contentUrl + "/"+ aliaS + "uploadattach/"; 
		
		Bean.setUploadMaxSize(50*1024*1024);
	}else if(IMAGE_TYPE.equals(type)){
		uploadType=IMAGE_SUFFIX;
		uploadPath=uploadPath+"image/";
		uploadRelaPath= projectName+"/content/"+ aliaS + "uploadimage/"; 
		uploadRelaPath1 = contentUrl + "/"+ aliaS + "uploadimage/"; 
		
		Bean.setUploadMaxSize(1*1024*1024);
	}else if(FLASH_TYPE.equals(type)){
		uploadType=FLASH_SUFFIX;
		uploadPath=uploadPath+"flash/";
		uploadRelaPath=uploadRelaPath+"flash/";
		
		Bean.setUploadMaxSize(50*1024*1024);
	}else{
		uploadType=VEDIO_SUFFIX;
		uploadPath=uploadPath+"video/";
		uploadRelaPath=uploadRelaPath+"video/";
		Bean.setUploadMaxSize(50*1024*1024);
	}
	    Bean.setUploadFiletype(uploadType);
		Bean.setUploadType(UpLoadUtil.UPLOAD_TO_SERVER);	
		if(ATTACH_TYPE.equals(type)){
			Bean.setUploadFileKeepedDir(uploadRelaPath1);
		}else if(IMAGE_TYPE.equals(type)){
			Bean.setUploadFileKeepedDir(uploadRelaPath1);
		}else{
			Bean.setUploadFileKeepedDir(uploadRelaPath);
		}
		//Bean.setUploadMaxSize(50*1024*1024);
		Bean.setUploadTempFileKeepedDir(tempPath);
	    FileUploadManager manager = new FileUploadManager(Bean);
	    manager.execute(pageContext);
	    
	    beanFileName=Bean.getUploadFileName();
	    File file ;
	    
	    if(ATTACH_TYPE.equals(type)){
			file  =new File(uploadRelaPath1+beanFileName);
		}else if(IMAGE_TYPE.equals(type)){
			file =new File(uploadRelaPath1+beanFileName);
		}else{
			file =new File(uploadRelaPath+beanFileName);
		}
	    	
	    
	   if(file.exists()&&Bean.isStatues()){
	    if(file.length()==0){
	    	request.setAttribute("upload_message","文件为空或文件不存在!");
	    	file.delete();
	    	Bean.setStatues(false);
	    }
	   }
		   
	if(Bean.isStatues())//上传文件成功,把文件路径放到数据库表中
	{  
		 int index=beanFileName.indexOf(".");
		 String suffix = beanFileName.substring(index);
		 beanFileName2 = DateUtils.curDateStr(DateUtils.DATETIME14_PATTERN) + suffix;
		 long fileSize=0;
		 if(file.exists()){
			fileSize=file.length();
			filePath = uploadRelaPath1+fileId+"_"+beanFileName2;//真实存在路径
			filePath0 = uploadRelaPath+fileId+"_"+beanFileName2;
			filePath1 = uploadPath+fileId+"_"+beanFileName2;//相对路径
			
			if(ATTACH_TYPE.equals(type)){
				file.renameTo(new File(filePath));
			}else if(IMAGE_TYPE.equals(type)){
				file.renameTo(new File(filePath));
			}else{
				file.renameTo(new File(filePath0));
			}
			
			if(type.equals("1")){
				img = ImageIO.read(new FileInputStream(filePath));
				width = img.getWidth(); //原图宽
				height = img.getHeight();//原图高
			}
		 }
		Dao dao = (Dao) SpringApplicationContext.getBean("dao");
	    
		//插入上传的文件信息表
		HashMap map=new HashMap();
	    map.put("fileId",fileId);
	    map.put("fileName",beanFileName);
	    map.put("fileDes",fileDes);
	    map.put("typeId",typeId);
	    map.put("fileSize",fileSize+"");
	    if(ATTACH_TYPE.equals(type)){
    		map.put("filePath",filePath0);
		}else if(IMAGE_TYPE.equals(type)){
			map.put("filePath",filePath0);
		}else{
			map.put("filePath",filePath1);
		}
		map.put("recCreator",userId);
		map.put("recCreateTime",DateUtils.curDateTimeStr14());
		dao.update("tecdm01.insert",map);	
		
		request.setAttribute("width",width);
		request.setAttribute("height",height);
		ECLGUtils.log(fileId ,ECLGConstant.NODE_DOC,ECLGConstant.DOC_CREATE);
		
		out.println("<script type=\"text/javascript\">");
		out.println("parent.on_upload_success();");
		out.println("</script>");
	}else{
	    //String param1 = request.getParameter("nodeId");
	    //String param2 = request.getParameter("nodeType");
	    //request.getRequestDispatcher("/EC/DM/ECDM0105.jsp?nodeId="+param1+"&nodeType="+param2).forward(request,response) ;
	    
	    String param1 = (String)request.getAttribute("upload_message");
	    out.println("<script type=\"text/javascript\">");
		out.println("parent.on_upload_fail('"+param1.trim()+"');");
		out.println("</script>");
	}
	
	pageContext.getResponse().flushBuffer();
%>

<font color="red" > <%=request.getAttribute("upload_message") %> </font><br/>

<div id="divCreate" style="padding-top:12px;" >
<font style="font-size: 12px;float:left;">是否生成缩略图：</font>
<input id="chk" type="checkbox"  onclick="showDIV(this)" style="float:left;"/>
<div id="div" style="display:none;float:left;">&nbsp;&nbsp;
     <font style="font-size: 12px;">宽:</font>&nbsp;&nbsp;<input id="txtWidth" type="text" style="width:40px;" value="<%=request.getAttribute("width")%>" onblur="changeH(this.value)"/>&nbsp;&nbsp;
	 <font style="font-size: 12px;"">高:</font>&nbsp;&nbsp;<input id="txtHeight" type="text" style="width:40px;" value="<%=request.getAttribute("height")%>" onblur="changeW(this.value)"/>&nbsp;&nbsp;  
	 
</div>
</div>
<br/> 
<br/> 
<input type="button" id="btnCreate" value="确认" onclick="createImg()"/>


<input type="hidden" id="hdqt" value="<%=qt%>"/>
<input type="hidden" id="hdtype" value="<%=type%>"/>
<input type="hidden" id="hdFileId" value="<%=fileId%>"/>
<input type="hidden" id="hdFilePath" value="<%=filePath%>"/><!-- 绝对路径  -->
<input type="hidden" id="hdUploadRelaPath" value="<%=uploadRelaPath%>"/>
<input type="hidden" id="hdUploadRelaPath1" value="<%=uploadRelaPath1%>"/>
<input type="hidden" id="hdFileName" value="<%=beanFileName%>"/> 
<input type="hidden" id="hdFileName2" value="<%=beanFileName2%>"/>
<input type="hidden" id="hdWidth" value="<%=width%>"/>
<input type="hidden" id="hdHeight" value="<%=height%>"/>
<input type="hidden" id="hdFilePath1" value="<%=filePath0%>"/> <!-- 相对路径1  -->
<input type="hidden" id="hdFilePath2" value="<%=filePath1%>"/> <!-- 相对路径2  -->
</body>
</html>
