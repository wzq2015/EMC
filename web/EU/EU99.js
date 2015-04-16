var currentRow=$("<img id='currentRow' src=\"./EF/Images/efgrid_page_next.gif\"border='0' alt='当前行' valign='middle'/>");
var ecam01_modalWin;
var ecam01_isShow;

efform_onload = function() {	
    ecam01_modalWin  = new EFModalWindow('ecam01_progressWindow');
    ecam01_isShow = false;
     $("#dyParam_table input").each(function(){
    	$(this).focus(function(){
    		currentRow.remove();
    		currentRow.appendTo($(this).parent().prev());
    	})	
    });
}

/**//***
path 要显示值的对象id
****/
function browseFolder(path) {
try {
var Message = "\u8bf7\u9009\u62e9\u6587\u4ef6\u5939"; //选择框提示信息
var Shell = new ActiveXObject("Shell.Application");
var Folder = Shell.BrowseForFolder(0, Message, 64, 17); //起始目录为：我的电脑
//var Folder = Shell.BrowseForFolder(0,Message,0); //起始目录为：桌面
if (Folder != null) {
Folder = Folder.items(); // 返回 FolderItems 对象
Folder = Folder.item(); // 返回 Folderitem 对象
Folder = Folder.Path; // 返回路径
if (Folder.charAt(Folder.length - 1) != "") {
Folder = Folder + "";
}
document.getElementById(path).value = Folder;
return Folder;
}
}
catch (e) {
alert(e.message);
}
}

function addDyParam(){

  var newRow=$("<tr><td></td><td>config目录</td><td><input id='separate-0-config' name='config' style='width:300px' type='file'/></td><td>toconfig目录</td><td><input id='separate-0-toconfig' name='toconfig' style='width:300px'/></td></tr>");
  newRow.appendTo("#dyParam_table");
  currentRow.appendTo(newRow.children("td:eq(0)"));
  newRow.find("input").each(function(){
  	$(this).focus(function(){
  		currentRow.remove();
  		currentRow.appendTo(newRow.children("td:eq(0)"));
  	})	
  });
  newRow.find("EF:EFInput").eq(0).focus();
}

function delDyParam(){
	   var currentTR=currentRow.parents("tr");
	   var nextTR=currentTR.next("tr");
	   var prevTR=currentTR.prev("tr");
	      currentTR.remove();
	   if(nextTR.length>0){
	       currentRow.remove();
	       currentRow.appendTo(nextTR.children("td:eq(0)"));
	   }else if(prevTR.length>0){
	     currentRow.remove();
	     currentRow.appendTo(prevTR.children("td:eq(0)"));
	   }
	}

button_build_onclick = function () 
{
	//alert("cs");

	var block=new EiBlock("build");
	var blockMeta = new EiBlockMeta("build");
	var itemColumn=new EiColumn("config");
	itemColumn.pos=1;
	blockMeta.addMeta(itemColumn);
	block.setBlockMeta(blockMeta); 
	var i=0;
	$("#dyParam_table input").each(function(){
	     var config=$(this).val();
	     if(config.trim()!=''){
	     block.setCell(i,'config',config);
	     i++;
	     }
	});
	
	var info=new EiInfo();
	info.setByNode("ef_region_all");
	info.addBlock(block);
	EiCommunicator.send("EU99","build",info,callback);

}

var callback = {
		onSuccess : function(eiInfo) {
			var file = eiInfo.get("file");
			if (file != null && file!="") {
			window.open("./EU/EU9901.jsp?file="+file);
			}
		},
		onFail : function(eMsg) {
			alert("failure");
		}
}


button_ant_onclick = function () 
{	
	ecam01_modalWin.showProgressBar();
	ecam01_isShow = true;
	var info=new EiInfo();
	info.setByNode("ef_region_all");
	EiCommunicator.send("EU99","ant",info,exp_callback);

}

var exp_callback = {
		onSuccess : function(eiInfo) {
	        ecam01_modalWin.hide();
			ecam01_isShow = false;
			var file = eiInfo.get("warfile");
			if (file != null && file!="") {
			window.open("./EU/EU9901.jsp?file="+file);
			}
		},
		onFail : function(eMsg) {
			alert("failure");
		}
}
