efform_onload = function ()
{
	efform.hideFormHead();
	efregion.show("ef_region_inqu"); //设定一个无按钮注册的域  进行渲染显示
	search();
	playFlashByStream("");
}
function loadSwf(summary,fileId,fileName,chgName,path){
	ef.get("documentId").value = fileId;
	ef.get("titleText").innerHTML = fileName;
	ef.get("contentText").innerHTML = summary;
	playFlashByStream(path);
}
/**
 * 播放Flash
 * @param path 路径
 * */
function playFlashByStream(path){
	document.getElementById("mainFrame").src = "./EU/AF/EUAF17.jsp?path=" + path;
}

/**
 *文档格式附件信息列表
 *
 * */
function search(){
  	var callback =
	{
		onSuccess :
		 	function (eiInfo)
			{
				var datablock = eiInfo.getBlock( "datablock" );
				var path = eiInfo.get("path")+"";
				var dataDiv = ef.get("dataDiv");
				var fileName,chgName,extName,folderName,fileId,summary;
				var content = "";
				for(var i=0;i<datablock.getRows().length;i++){
					fileName = datablock.getCell(i, "fileName");
					chgName = datablock.getCell(i, "chgName");
					chgName = chgName.split('\\').join('/');
					extName = datablock.getCell(i, "extName");
					folderName = datablock.getCell(i, "folderName");
					fileId = datablock.getCell(i, "id");
					summary = datablock.getCell(i, "summary");
					summary = summary == null ? "&nbsp;&nbsp;" : summary.split('<br/>').join('');
					content += generateData(summary,fileId,fileName,chgName,extName,path+"/"+folderName+"/"+chgName.split('.')[0]+".swf");
				}
				dataDiv.innerHTML = content;
   			},
 			onFail:
   			function(eMsg)
			{
   				alert("服务调用失败: "+eMsg );
			}
	};
	var info = new EiInfo();
	info.set("fileName",$("#txtContent").val());
	EiCommunicator.send("EUAF12","query",info,callback);
}
/**
 * 生成附件列表超链接
 * @param fileName 文件名称
 * @param chgName 修改后名字
 * @param extName 扩展名
 * @param path 路径
 * */
function generateData(summary,fileId,fileName,chgName,extName,path){
	var content = "";
	var displayName = "";
	if(fileName.length > 8){
		displayName = fileName.substring(0,8)+"...";
	}else{
		displayName = fileName ;
	}
	content += ' <a href="#" alt="'+fileName+"."+extName+'" onclick=\'loadSwf("'+summary+'","'+fileId+'","'+fileName+'","'+chgName+'","'+path+'")\'>'+displayName+"."+extName+'</a>';
	return content;
}
/**
 * 下载附件
 * @param 附件id
 * */
function downFile(){
	var documentId = ef.get("documentId").value;
	if(documentId == "") return ;
	window.location.href = "./EU/AF/EUAF06.jsp?attachmentId="+documentId;
}