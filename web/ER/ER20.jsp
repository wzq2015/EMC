
<%@page contentType="text/html;charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF.tld" %>
<jsp:useBean id="ei" scope="request"
	class="com.baosight.iplat4j.core.ei.EiInfo" />
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
	com.baosight.iplat4j.er.service.ServiceER09.selectEditReports = ei.getString("selectEditReports");
	System.out.println(ei.getString("selectEditReports"));
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/EF.js"></script>
	<script type="text/javascript">
	  var baseUrl = "<%= request.getContextPath() %>";
	</script>
	<script type="text/javascript" src="./ER/ERTools.js"></script>
	<script type="text/javascript" src="./ER/ER20.js"></script>

</head>

<body class="bodyBackground">

<form id="ER20" method="POST" action="<%=actionUrl%>" >
<jsp:include flush="false" page="../EF/Form/EFFormHead.jsp"></jsp:include>
  <EF:EFInput blockId="" ename="reportSaveAsId" row="" type="hidden" />
  <EF:EFInput blockId="" ename="reportSaveAsBelongTo" row="" type="hidden"/>
  <EF:EFInput blockId="" ename="reportSaveAsVersion" row="" type="hidden"/>
  <EF:EFInput blockId="" ename="currentEditId" row="" type="hidden" />
   <EF:EFInput blockId="" ename="selectEditReports" row="" type="hidden"/>
<div id="commonPara">
  <EF:EFInput blockId="" ename="loadAfterSave" row="" type="hidden" />
  <EF:EFInput blockId="" ename="xmlStr" row="" type="hidden" />

  <EF:EFInput blockId="" ename="reportId" row="" type="hidden" />
  <EF:EFInput blockId="" ename="reportBelongTo" row="" type="hidden"/>
  <EF:EFInput blockId="" ename="reportVersion" row="" type="hidden"/>
</div>


<div id = "ef_region_excel" title="EXCEL报表模板编辑" style="overflow:scroll"> 
<div>
    <table id="mainFrameTable" width="100%"  height="80%" cellpadding=1 cellspacing=0 >
	  <tr height=100%>
	    <td id="leftTree" vAlign="top" width="130px" height="100%" style="background-color: #f0f3f4; padding-top:10px;">
		                    
		  <div id="leftTreeDiv" style='overflow:auto; width:130; height:100%;'>
			    <EF:EFTree model="reportTreeModel" id="tree" text="报表模板" configFunc="configTree">
			    </EF:EFTree>
		  </div>
		                    
		 </td>	  
		<td id="middleSplitter" width="4px" vAlign="middle" style='cursor:e-resize'>
		  <IMG id="img_splitter_id" 
		  onload="efico.setImageSrc(this,'efform.imgVgrabber')" src="./EF/Images/eftree_blank.png"
		   >
        </td>	  
	  
		<td id="rightContent" width=100%  vAlign="top" >
                     <div id = "ef_para_formula" style="overflow:auto;width:100%;height:35px;">
                      <table>
                         <tr>
                         
                         <td width=15% align="right">
                         	<span id="cellName"></span>
                         </td>
                          <td  align="left">
                            <img 
                            onload="efico.setImageSrc(this,'efreport.efFalseClear')" src="./EF/Images/eftree_blank.png"
                             id="img_flase_clear" title="清空" onclick="button_imgFalse_onclick()"/>             
                          </td>  
                          <td  align="left">
                            <img 
                            onload="efico.setImageSrc(this,'efreport.efImgRight')" src="./EF/Images/eftree_blank.png"
                             id="imgRight" title="计算" onclick="button_imgRight_onclick()"/>             
                          </td>
                          <td  align="left">
                            <img 
                            onload="efico.setImageSrc(this,'efreport.efImgFunction')" src="./EF/Images/eftree_blank.png"
                             id="ef_function_png" title="Excel公式" onclick=""/>             
                          </td>                                                                               
                          <td width=70% align="left">
                            <EF:EFInput blockId="" ename="formulaValue" row="" type="textarea" etc="onkeypress=formulaValue_Change() cols='105' rows='1' "/>               
                          </td>
                          <td width=5% align="left">
                            <img 
                            onload="efico.setImageSrc(this,'efreport.efDetail')" src="./EF/Images/eftree_blank.png"
                             id="imgDetail" title="详细信息" onclick="button_imgDetail_onclick()"/>             
                          </td>                        
                       </tr>
                     </table>
                   </div>
          <table><tr>
          <td width="92%"></td>
          <td ><img 
          onload="efico.setImageSrc(this,'efreport.efImgFind')" src="./EF/Images/eftree_blank.png"
           id="imgFind" title="查找替换" onclick="button_imgFind_onclick()"/></td>
          <td ><img 
          onload="efico.setImageSrc(this,'efreport.efImgHelp')" src="./EF/Images/eftree_blank.png"
           id="imgHelp" title="函数向导" onclick="button_imgHelp_onclick()"/></td>
          <td ><img 
          onload="efico.setImageSrc(this,'efreport.efImgSave')" src="./EF/Images/eftree_blank.png"
           id="imgSave" title="报表模板保存" onclick="button_imgSave_onclick()"/></td>
          <td ><img onload="efico.setImageSrc(this,'efreport.efImgPrintConfig')" src="./EF/Images/eftree_blank.png"
          id="imgPrintConfig" title="报表模板打印配置" onclick="button_imgPrintConfig_onclick()"/></td>
          <td ><img onload="efico.setImageSrc(this,'efreport.efImgPrint')" src="./EF/Images/eftree_blank.png"
           id="imgPrint" title="报表模板打印" onclick="button_imgPrint_onclick()"/></td>
          <td ><img onload="efico.setImageSrc(this,'efreport.efCommand')" src="./EF/Images/eftree_blank.png"
            id="imgCommand" title="自动添加自定义块" onclick="button_imgCommand_onclick()"/></td>
          <td ><img onload="efico.setImageSrc(this,'efreport.efDefine')" src="./EF/Images/eftree_blank.png"
           id="imgModelDefine" title="报表模板定义" onclick="button_imgDefine_onclick()"/></td>
          </tr></table>
          </div>    
		  <div id="spreadSheetDiv" style="overflow:hidden;width:100%">   
		  
		  </div>
		  
        </td>
	  </tr>
    </table>  
  
</div>  
</div>

 <div id="detailFormulaValueId" class="efwindow">
 <EF:EFInput blockId="" ename="detailFormulaValue" row="" type="textarea" etc="onkeypress=formulaValue_Change() cols='105' rows='5' "/> 
 </div>

 <div id="pagePrintConfig" class="efwindow">
          <table width="500"><tr><td>
   <div id="ef_region_PPC" title="页面设置" style="overflow:scroll">
   <div>          
			<div id="ef_tab_y"  lastRange="97.6%" eftabType="efRoundDivTab"> 
				<div id="page" title="页面" > 

                		  <div id = "ef_region_printDirection" title="方向" style="overflow:scroll">
						   <div style="overflow:auto;width:100%;height:50px;">						
							<table >
								<tr>
										<td ><img id="efImgPrintVertical"  onload="efico.setImageSrc(this,'efreport.efImgPrintVertical')" src="./EF/Images/eftree_blank.png"
										 > </td>
										<td>
										<input  type="radio" id="print-0-print_vertical" name="Orientation" value="1" class="inputField" />纵向
										</td>
										<td>	<img id="efImgPrintHorizontal" 
											onload="efico.setImageSrc(this,'efreport.efImgPrintHorizontal')" src="./EF/Images/eftree_blank.png"
										 ></td>
										<td>
										<input  type="radio" id="print-0-print_horizon" name="Orientation" value="2" class="inputField"  />横向
										</td>
								</tr>
							   
								
							</table>
						  </div>
						 </div> 							
						
                		  <div id = "ef_region_printZoom" title="缩放" style="overflow:scroll">
						   <div style="overflow:auto;width:100%;height:50px;">						
							<table >
								<tr>
										<td>
					
								<div style="position:relative;">
							      缩放比例(A)：
							      <EF:EFInput blockId="" ename="Zoom" row="" etc="value=100"/>% &nbsp;正常尺寸 
							      <IMG id="ef_pageDistance_top1" 
							      onload="efico.setImageSrc(this,'efreport.efPageDistanceTop')" src="./EF/Images/eftree_blank.png"
							      style="position: absolute; top:4; left:210; cursor:pointer;"
								       onClick='zoom_config_top_func("Zoom")'/>
								  <IMG id="ef_pageDistance_down1" 
								  onload="efico.setImageSrc(this,'efreport.efPageDistanceDown')" src="./EF/Images/eftree_blank.png"
								  style=";position: absolute; top:10; left:210; cursor:pointer;"
								       onClick='zoom_config_down_func("Zoom")'/> 
								</div> 											    
										</td>
								</tr>

							</table>
						  </div>
						 </div> 						
							<table>
							  <tr>
							  <td>
							    纸张大小(Z)：<EF:EFSelect blockId="" ename="PageSize" row="" >
											    <EF:EFOption label="A4" value="9" />
											    <EF:EFOption label="Legal" value="5" />
											    <EF:EFOption label="Letter" value="1" />
											    <EF:EFOption label="Executive" value="7" />
											</EF:EFSelect>
							  </td>				
							  </tr>
							</table>
					
				</div>
				
			<div id="pageDistance" title="页边距" > 
			   <div id = "ef_region_pageDistanceConfig" title="页边距设置" style="overflow:scroll">
				 <div style="overflow:auto;width:100%;height:145px;">	
					<table> 
						<tr>
							<td>
							    <div style="position:relative;">
							      上(T)：
							      <EF:EFInput blockId="" ename="TopMargin" row="" etc="value=2.5"/>
							      <IMG id="ef_pageDistance_top2" 
							      onload="efico.setImageSrc(this,'efreport.efPageDistanceTop')" src="./EF/Images/eftree_blank.png"
							      style="position: absolute; top:4; left:175; cursor:pointer;" 
								       onClick='common_config_top_func("TopMargin")'/>
								  <IMG id="ef_pageDistance_down2" 
								  onload="efico.setImageSrc(this,'efreport.efPageDistanceDown')" src="./EF/Images/eftree_blank.png"
								  style="position: absolute; top:10; left:175; cursor:pointer;"
								       onClick='common_config_down_func("TopMargin")'/>     
								</div> 							
							</td>
							<td>
								<div style="position:relative;">
							      下(B)：
							      <EF:EFInput blockId="" ename="BottomMargin" row="" etc="value=2.5"/>
							      <IMG id="ef_pageDistance_top3" style="position: absolute; top:4; left:175; cursor:pointer;" 
								       onload="efico.setImageSrc(this,'efreport.efPageDistanceTop')" src="./EF/Images/eftree_blank.png"
								       onClick='common_config_top_func("BottomMargin")'/>
								  <IMG id="ef_pageDistance_down3" style="position: absolute; top:10; left:175; cursor:pointer;"
								       onload="efico.setImageSrc(this,'efreport.efPageDistanceDown')" src="./EF/Images/eftree_blank.png"
								       onClick='common_config_down_func("BottomMargin")'/>     
								</div> 	
							</td>
						</tr>
						<tr><td>
								<div style="position:relative;">
							      左(L)：
							      <EF:EFInput blockId="" ename="LeftMargin" row="" etc="value=1.9"/>
							      <IMG id="ef_pageDistance_top4" 
							      onload="efico.setImageSrc(this,'efreport.efPageDistanceTop')" src="./EF/Images/eftree_blank.png"
							      style="position: absolute; top:4; left:175; cursor:pointer;"
								       onClick='common_config_top_func("LeftMargin")'/>
								  <IMG id="ef_pageDistance_down4" style="position: absolute; top:10; left:175; cursor:pointer;" 
								       onload="efico.setImageSrc(this,'efreport.efPageDistanceDown')" src="./EF/Images/eftree_blank.png"
								       onClick='common_config_down_func("LeftMargin")'/>     
								</div>	
						 </td><td>							
								<div style="position:relative;">
							      右(R)：
							      <EF:EFInput blockId="" ename="RightMargin" row="" etc="value=1.9"/>
							      <IMG id="ef_pageDistance_top5" style="position: absolute; top:4; left:175; cursor:pointer;"
								       onload="efico.setImageSrc(this,'efreport.efPageDistanceTop')" src="./EF/Images/eftree_blank.png"
								       onClick='common_config_top_func("RightMargin")'/>
								  <IMG id="ef_pageDistance_down5" style="position: absolute; top:10; left:175; cursor:pointer;" 
								       onload="efico.setImageSrc(this,'efreport.efPageDistanceDown')" src="./EF/Images/eftree_blank.png"
								       onClick='common_config_down_func("RightMargin")'/>     
								</div>						
						
						</td></tr>
						<tr><td>
								<div style="position:relative;">
							      页眉(A)：
							      <EF:EFInput blockId="" ename="HeaderMargin" row="" etc="value=1.3"/>
							      <IMG id="ef_pageDistance_top6" style="position: absolute; top:4; left:187; cursor:pointer;" 
								       onload="efico.setImageSrc(this,'efreport.efPageDistanceTop')" src="./EF/Images/eftree_blank.png"
								       onClick='common_config_top_func("HeaderMargin")'/>
								  <IMG id="ef_pageDistance_down6" style="position: absolute; top:10; left:187; cursor:pointer;" 
								       onload="efico.setImageSrc(this,'efreport.efPageDistanceDown')" src="./EF/Images/eftree_blank.png"
								       onClick='common_config_down_func("HeaderMargin")'/>     
								</div>	
						 </td><td>							
								<div style="position:relative;">
							      页脚(F)：
							      <EF:EFInput blockId="" ename="FooterMargin" row="" etc="value=1.3"/>
							      <IMG id="ef_pageDistance_top7" style="position: absolute; top:4; left:187; cursor:pointer;";
								       onload="efico.setImageSrc(this,'efreport.efPageDistanceTop')" src="./EF/Images/eftree_blank.png"
								       onClick='common_config_top_func("FooterMargin")'/>
								  <IMG id="ef_pageDistance_down7" style="position: absolute; top:10; left:187; cursor:pointer;"
								       onload="efico.setImageSrc(this,'efreport.efPageDistanceDown')" src="./EF/Images/eftree_blank.png"
								       onClick='common_config_down_func("FooterMargin")'/>     
								</div>						
						
						</td></tr>						
					</table>
				 </div>
			   </div>	
		   
			   
			</div>	
				
			<div id="workPage" title="工作表" > 
                		  <div id = "ef_region_printZoom" title="打印标题" style="overflow:scroll">
						   <div style="overflow:auto;width:100%;height:180px;">						
							<table >
								<tr>
										<td>
								<div style="position:relative;">
							      顶端标题行(R)：
							      <EF:EFInput blockId="" ename="PrintTitleRows" row="" etc="errorPrompt='格式输入有误，应该输入如 $1:$1 格式' regex='/^[$]{1}[1-9]{1}[0-9]{0,}[:]{1}[$]{1}[1-9]{1}[0-9]{0,}$/i'"/> 
								</div> 											    
										</td>
								</tr>
							</table>
						  </div>
						 </div> 						
			</div>				
				
				
				
			</div>
			
   </div>		  
  </div>			
		  </td></tr></table>	
		  		
 </div>

 <div id="printContent" class="efwindow">
 	<table width="300"><tr>
		<td>
		<div id = "ef_region_PRCT" title="打印设置" style="overflow:scroll">
		 <table>
			<tr><td>	
			<input  type="radio" id="select_book" name="print_Content" value="2" class="inputField"  />整个工作簿(E)
			</td></tr><tr><td>
			<input  type="radio" id="select_sheet" name="print_Content" value="3" class="inputField"  checked/>当前选定工作表(V)
			</td></tr>
			</table>
		</div>		
		
		</td> 	
 	</tr>
 	</table>
 	
 	
 </div>
 
 
  <div id="udnType" class="efwindow">
 	<table width="300"><tr>
		<td>
		<div id = "ef_region_utp" title="自定义名称类型" style="overflow:scroll">
		 <table>
			<tr><td>	
			<input  type="radio" id="udn_type_F" name="udn_type" value="F" class="inputField"  />校验公式(F)
			</td></tr><tr><td>
			<input  type="radio" id="udn_type_S" name="udn_type" value="S" class="inputField"  />校验汉字(S)
			</td></tr>
			<tr><td>
			<input  type="radio" id="udn_type_D" name="udn_type" value="D" class="inputField"  />校验数值(D)
			</td></tr>
			<tr><td>
			<input  type="radio" id="udn_type_N" name="udn_type" value="N" class="inputField"  checked/>非保存数据自定义名称(N)
			</td></tr>			
			
			</table>
		</div>		
		
		</td> 	
 	</tr>
 	</table>
 </div>


 <div id="findReplace" class="efwindow">
          <table width="400"><tr><td>
			<div id="ef_tab_x"  lastRange="97.6%" eftabType="efRoundDivTab"> 
				<div id="find" title="查找替换值" >
				查找内容:<input id="find_content_Value" class="inputField"  >
				替换为:<input id="replace_content_Value" class="inputField"  >
				<table><tr>
				<td><EF:EFButton ename="replaceAllValue" cname="替换全部" /></td>
				<td><EF:EFButton ename="replaceNextValue" cname="替换下一个" /></td>
			<!--	<td><EF:EFButton ename="findAllValue" cname="查找全部" /></td>  -->
				<td><EF:EFButton ename="findNextValue" cname="查找下一个" /></td>				
				<td><EF:EFButton ename="replaceValueClose" cname="关闭" /></td>
				</tr></table>	
				</div>
				<div id="replace" title="查找替换公式" eftabSrc="" >
				查找内容:<input id="find_content_Formula" class="inputField"  >
				替换为:<input id="replace_content_Formula" class="inputField"  >
				<table><tr>
				<td><EF:EFButton ename="replaceAllFormula" cname="替换全部" /></td>
				<td><EF:EFButton ename="replaceNextFormula" cname="替换下一个" /></td>
			<!--  	<td><EF:EFButton ename="findAllFormula" cname="查找全部" /></td> -->
				<td><EF:EFButton ename="findNextFormula" cname="查找下一个" /></td>				
				<td><EF:EFButton ename="replaceFormulaClose" cname="关闭" /></td>
				</tr></table>				
				
				</div>
			 </div>  
		  </td></tr></table>	  
 </div> 


<div id = "ef_region_ud" title="自定义报表" class="efwindow"> 
	<table width="900"  >
	  <tr>
	    <td width=30%   valign="top">
          <div id = "ef_region_udnlist" title="当前自定义名称列表" style="overflow:scroll"> 
	        <div style="overflow:hidden;width=100%">
	            <select style="width=100%;height:204px" class="pulldown" id="udNameList" multiple="true" onchange="user_define_name_onchange(this.value)"> 
	            </select>
	        </div>
	      </div>
	    </td>	  
	    <td width="70%"  valign="top">
	      <table width=100%  cellpadding=0 cellspacing=0 >
	        <tr>
	          <td>
                <table cellpadding=0 cellspacing=0  width=100%>
                  <tr>
                    <td width=40% valign="top">
                      <div id = "ef_region_udn" title="自定义名称" style="overflow:scroll" efRegionShowClear=true> 
                        <div style="overflow:auto;width:100%;height:28px;">
                          <table>
                            <tr>
	                          <td width=10% align="right">
	                           名称
	                          </td>
	                          <td width=90% align="left">
	                           <EF:EFInput blockId="" ename="regionNow" row="" type="hidden"/>                
	                           <EF:EFInput blockId="" ename="userDefineName" row=""/>
	                          </td>
	                        </tr>
	                      </table>
	                    </div>
	                  </div>
                    </td>
                    
                    
                    
                    
                  </tr>
                </table>	          
	          </td>
	        </tr>
	        <tr>
	          <td>
                <table cellpadding=0 cellspacing=0  width=100%>
                  <tr>
                    <td width=40% valign="top">
                      <div id = "ef_region_para" title="模拟运算参数" style="overflow:scroll" efRegionShowClear=true> 
                        <div id = "ef_para_list" style="overflow:auto;width:100%;height:95px;">
                        </div>
                      </div>
                    </td>
                    <td width=60% valign="top">
                      <div id = "ef_region_udf" title="自定义公式" style="overflow:scroll" efRegionShowClear=true> 
                        <div style="overflow:auto;width:100%;height:95px;">
                          <table>
                            <tr>
	                          <td width=100% valign="top">
	                           <EF:EFInput blockId="" ename="userDefineNameNow" row="" type="hidden"/>                
	                           <EF:EFInput blockId="" ename="userDefineFunction" row="" type="textarea" etc="cols='60' rows='4' "/>
	                          </td>
	                        </tr>
	                      </table>
	                    </div>
	                  </div>
                    </td>
                  </tr>
                </table>	          
	          </td>
	        </tr>
	      </table>
	    </td>
	  </tr>
	</table>
</div>

<EF:EFRegion/>

<jsp:include flush="false" page="../EF/Form/EFFormTail.jsp"></jsp:include>
</form>

</body>
</html>   
