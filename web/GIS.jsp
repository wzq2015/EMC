<%@ page language="java" contentType="text/html; charset=utf-8" import="java.util.*,java.io.*" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<%
	String wmsUrl = "";
	String gisLayers = "";
	String gisCenterLon = "0";
	String gisCenterLat = "0";
	String gisDefaultZoom = "1";
  
	Properties pro = new Properties();
	String realpath = request.getRealPath("/WEB-INF/classes");  
	try 
	{  
		// 读取配置文件
 		FileInputStream in = new FileInputStream(realpath+"/config.properties");  
 		pro.load(in);  
 	}  
 	catch (Exception e)
 	{  
     	out.println(e);  
 	}

	// 通过key获取GIS配置
 	wmsUrl = pro.getProperty("GIS.WMS.Url"); 
 	gisLayers = pro.getProperty("GIS.layers"); 
 	gisCenterLon = pro.getProperty("GIS.center.lon"); 
 	gisCenterLat = pro.getProperty("GIS.center.lat"); 
 	gisDefaultZoom = pro.getProperty("GIS.default.zoom");
%>

<html>
    <head>
    	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>GIS</title>
        <style type="text/css">
            #map { position: relative; width: 100%; height: 100%; border: 1px solid gray; align: bottom;}
            p {width: 1024px; height: 768px;}
        </style>
        <link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/bootstrap/easyui.css">
		<link rel="stylesheet" type="text/css" href="jqueryeasyui/themes/icon.css">
		<script src="jqueryeasyui/jquery.min.js"></script>
	    <script src="jqueryeasyui/jquery.easyui.min.js"></script>
	    <script src="OpenLayers/OpenLayers.js"></script>
	    <script src="GIS.js"></script>
        <script src="./EF/EF.js"></script>
        <script src="./EmcCommon.js"></script>
        <script src="./GISCommon.js"></script>
		<script type="text/javascript">
    		var _wmsUrl = '<%=wmsUrl%>';
    		var _layers = '<%=gisLayers%>';
   			var _gisCenterLat = '<%=gisCenterLat%>';
   			var _gisCenterLon = '<%=gisCenterLon%>';
   			var _gisDefaultZoom = '<%=gisDefaultZoom%>';
		</script>
    </head>
    <body>
		<div class="easyui-layout" fit="true">
			<div data-options="region:'west',split:true,collapsible:false" title="项目树" style="width:350px;">
				<ul id="tt" class="easyui-tree"></ul>
			</div>
			<div data-options="region:'center',split:true" title="地图">
	        	<div id="map" style="width: 99%; height: 99%"></div>
	        </div>
        </div>
    </body>
</html>