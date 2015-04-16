efform_onload = function ()
{
  resetWindowSize();
  loadDemo();
}

var default_image = "./EF/Images/demo/img.jpg";

//加载节点div
function loadDemo(){
   	var loadDemo_callback =
	{
		onSuccess :
		 	function (eiInfo)
			{
				var parentNodeBlock = eiInfo.getBlock( "parentNode_block" );
				var treeObj = ef.get("treeDiv");
				var listObj = ef.get("myDemoList");
				var parent_ename ;
				var parent_cname ;
				var tree_div = "";
				var content = "";
				for(var i=0;i<parentNodeBlock.getRows().length;i++){
					parent_ename = parentNodeBlock.getCell(i, "node_ename");
					parent_cname = parentNodeBlock.getCell(i, "node_cname");
					tree_div += generateTreeDiv(parent_ename,parent_cname);
					loadleafDemo(parent_ename,parent_cname);
				}
				treeObj.innerHTML = tree_div;
				listObj.innerHTML += content;
   			},
 			onFail:
   			function(eMsg)
			{
   				alert("服务调用失败: "+eMsg );
			}
	};
	var info = new EiInfo();
	info.set( "tree_ename", "EEEF");
	EiCommunicator.send("EEDM00","loadDemoNodes",info,loadDemo_callback);
}
function loadleafDemo(parent_ename,parent_cname){
   	var loadleafDemo_callback =
	{
		onSuccess :
		 	function (eiInfo)
			{
				var leafNode_block = eiInfo.getBlock( "leafNode_block" );
				var listObj = ef.get("myDemoList");
				var node_ename ;
				var node_cname ;
				var node_img ;
				var node_param ;
				var content ="";
				var size = leafNode_block.getRows().length;

			 	content += generateTopDiv(parent_ename,parent_cname); // table开始

				content += " <tr id='contentBox' >" +
								"<td valign='top' >"+
									"<table id='tb_"+parent_ename+"' class='previewRow' cellspacing='0' cellpadding='0' width='100%'>";

				 for(var i=0;i<size;i++){
					node_ename = leafNode_block.getCell( i, "node_ename");
					node_cname = leafNode_block.getCell( i, "node_cname");
					node_img = leafNode_block.getCell( i, "node_image_path");
					node_param = leafNode_block.getCell( i, "node_param");
					content += generateTdDiv(parent_ename,parent_cname,node_ename,node_cname,node_img,node_param,i);
				}
			 	if(size%2!=0){
					content +="<td>&nbsp;</td></tr>";
				}
				content += "</table></td></tr></table>";
				listObj.innerHTML += content;
   			},
 			onFail:
   			function(eMsg)
			{
   				alert("服务调用失败: "+eMsg );
			}
	};
	var info = new EiInfo();
	info.set( "tree_ename", parent_ename);
	EiCommunicator.send("EEDM00","loadLeafNodes",info,loadleafDemo_callback,false,true,true);
}
//生成右边的节点目录
function generateTreeDiv(node_ename,node_cname){
	var tree_div = "";
	tree_div += "<a href='#"+node_ename+"' onclick='openList(\""+node_ename +"\")'><div style='margin-top:5px;' ><img src='./EF/Images/demo/arrow.gif'/>"+node_cname+"</div></a>";
	return tree_div;
}

//生成左边布局-TDDemo示例
function generateTdDiv(parent_ename,parent_cname,node_ename,node_cname,node_img,node_param,i){
	var content = "";
	if(node_img.trim()==""){
		node_img = default_image;
	}
	if((i+1)%2==0){
		content += "<td>"+generateDemoDiv(node_ename,node_cname,node_img,node_param)+"</td>";
		content += "</tr>";
	}else{
		content += "<tr valign='top'>";
		content += "<td width='50%'>"+generateDemoDiv(node_ename,node_cname,node_img,node_param)+"</td>";
	}
	return content;
}
function generateDemoDiv(node_ename,node_cname,node_img,node_param){
	var content = "";
	content += "<table>"+
				    "<tr>"+
				        "<td class='previewImg'><img width='118px' height='88px' id='img_"+node_ename+"' src='"+node_img+"' onmouseover='mousechange(this.id,\"0\")' onclick='newForm(\""+node_ename +"\")'/></td>"+
				        "<td valign='top'>"+
				            "<table class='previewContent'  cellspacing='0' cellpadding='0'>"+
				                "<tr class='header'>"+
				                    "<td><a href='#' onclick='newForm(\""+node_ename +"\")'>"+node_cname+"</a></td>"+
				                "</tr>"+
				                "<tr>"+
				                    "<td><p>"+node_param+"</p></td>"+
				                "</tr>"+
				            "</table>"+
				        "</td>"+
				    "</tr>"+
				"</table>";
	return content ;
}
//生成左边布局-Top
function generateTopDiv(parent_ename,parent_cname){
	var content = "";
	content += "<table  cellspacing='0' cellpadding='0' width=100%' >"+
				 "<tr id='titleBox' height='30px'>"+
					"<td  valign='top'  align='left'>"+
				    	"<table border='0' cellspacing='0' cellpadding='0' width='100%' height='100%'>"+
				        	"<tr class='title'>"+
				            	"<td width='16'><img id='region_"+parent_ename+"' onclick='operator(\""+parent_ename+"\",this.id)' src='./EF/Images/demo/efregion_expand.gif'/></td>"+
				                "<td align='left'><a name='"+parent_ename+"'>"+parent_cname+"</a></td>"+
				            "</tr>"+
				        "</table>"+
				    "</td>"+
			   	"</tr>";
	return content;
}
//控制域收缩
function operator(ename,imgId){
	var obj = ef.get("tb_"+ename);
	var img = ef.get(imgId);
	var style = obj.style.display;
	if(style == "none"){
		obj.style.display = "block";
		img.src = "./EF/Images/demo/efregion_expand.gif";
	}else{
		obj.style.display = "none";
		img.src = "./EF/Images/demo/efregion_collapse.gif";
	}
}
//点击右边菜单，展开左边列表
function openList(ename){
	var obj = ef.get("tb_"+ename);
	var img = ef.get("region_"+ename);
	var style = obj.style.display;
	obj.style.display = "block";
	img.src = "./EF/Images/demo/efregion_expand.gif";
}
//控制 图片 手型
function mousechange(id,flag){
	var obj = ef.get(id);
	if(flag == "0"){
		obj.style.cursor = "pointer";
	}else{
		obj.style.cursor = "";
	}
}
var winMap = new Object();
var winCount = 0;
window.onunload = function() {
    for(var propName in winMap) {
        try {
            winMap[propName].close();
        }catch(e) {
            //alert(e.message);
        }
    }
}
function newForm( label ) {
   start_time = new Date().getTime();
   winMap[winCount ++] = efform.openNewForm( "EEDM0000","EEDMFILENAME=" + label );
}

window.onresize = function(){
	resetWindowSize();
}
function resetWindowSize(){
  var height = document.body.clientHeight - 70;
  ef.get("treeDiv").style.height = height;
  ef.get("mywrap").style.height = height;
  ef.get("myDemoList").style.height = height-12;
}