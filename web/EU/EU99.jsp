<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<EF:EFPage >
<EF:EFHead/>
<body>
<EF:EFForm formId="EU99">
<EF:EFRegion regionId="ef_region_all" >
		<EF:EFRegion regionId="ef_region_inqu" >
		  <EF:EFRegion regionId="content" style="overflow:hidden;width:100%" > 
				<EF:EFLayout col="2" row="5" cols="45%,55%">
				<EF:EFInput bindId="re-0-wardir" cname="打包输出目录" etc="size='50'" />
				<EF:EFPanel>
				<input type="button" onclick="browseFolder('re-0-wardir')" value="浏览..." />
				</EF:EFPanel>
				<EF:EFInput bindId="re-0-proname" cname="产品名称" etc="size='50'" />
				<EF:EFInput bindId="re-0-buildname" cname="build文件名称" etc="size='50'" rowPos="3"/>
        		<EF:EFInput bindId="re-0-war" cname="war包名称" etc="size='50'" rowPos="4"/>
				</EF:EFLayout>
			</EF:EFRegion>
		</EF:EFRegion>	
		
		<EF:EFRegion regionId="ef_region_list" >
		  <EF:EFRegion regionId="content" style="overflow:hidden;width:100%" > 
				<EF:EFLayout col="2" row="3" cols="45%,55%">

				<EF:EFInput bindId="re-0-srclist" cname="src目录"  etc="size='50'" />
				<EF:EFPanel>
				<input type="button" onclick="browseFolder('re-0-srclist')" value="浏览..." />
				</EF:EFPanel>
				<EF:EFInput bindId="re-0-weblist" cname="web目录" etc="size='50'" />
				<EF:EFPanel>
				<input type="button" onclick="browseFolder('re-0-weblist')" value="浏览..." />
				</EF:EFPanel>
				</EF:EFLayout>
			</EF:EFRegion>
		</EF:EFRegion>		
			
		<EF:EFRegion regionId="ef_region_div" >
		 <EF:EFRegion regionId="content" style="overflow:hidden;width:100%" > 
		
		<legend align="center">
			<font size='2' id=query_title>配置文件</font>
			<a href='#' onClick="addDyParam()">
				<img id='efQueryDynamic' src="./EF/Images/eview_maximize_hover.gif" border='0' alt='添加'>
			</a>
			<a href='#' onClick="delDyParam()">
				<img id='efQueryDynamic' src="./EF/Images/eview_minimize_hover.gif" border='0' alt='删除' valign='middle'>
			</a>
		</legend>
		<div style="width:100%">
			<table id='dyParam_table'>

			</table>
		</div>
		</EF:EFRegion>
		</EF:EFRegion>
		
		
</EF:EFRegion>			
</EF:EFForm>

</body>
</EF:EFPage>
