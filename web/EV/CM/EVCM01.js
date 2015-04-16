var evcm01_modalWin;
var evcm01_isShow;

efform_onload = function ()
{
     //创建 进度窗口
     evcm01_modalWin  = new EFModalWindow('evcm01_progressWindow');
     evcm01_isShow = false;
}

function uploadcallBack(msg) {
        evcm01_modalWin.hide();
		efwindow.hide();
		ef.get("uploadIframe").src = "";
		alert(msg);
		window.location.href="../../DispatchAction.do?efFormEname=EVCM01&methodName=initLoad&pageNum=EVCM01";
   }

/*增加"上传主题"按钮*/
efgrid_onCellDisplayReady = function( div_node_html, row_index, col_index, col_value_c, display_value, grid_id )
{
	if(grid_id=="ef_grid_result"){
		var grid = efgrid.getGridObject( "ef_grid_result" );
		var columnEname = grid.getColumn(col_index, TYPE_DATA).getEname();
		if(columnEname=="upload"){
			var themaId=grid.getCellValue(row_index,0,TYPE_DATA,true);
			var themaEname=grid.getCellValue(row_index,1,TYPE_DATA);
			if(themaId!=""){
				var html="<div align='center' efval=''><input value='上传' class='buttonclass' type='button' align='center' onclick='forupload(\""+themaId+"\",\""+themaEname+"\")'></div>";
				return html;
			}
		}
	}
}

function forupload(themaId,themaEname){
	efwindow.show(null,"upload","center");
	ef.get("themaId").value=themaId;
	ef.get("themaEname").value=themaEname;
}

button_upload_onclick = function (){
	var thema_file = document.getElementById('thema_file').value;
	var exp = thema_file.substring(thema_file.length-3,thema_file.length);
	
	var thema_view = ef.get('thema_view').value;
	var view_a=thema_view.split(".");
	var length=view_a.length;
	var pic=".jpg,.png,gif";
	if(length==1||pic.indexOf(view_a[length-1].toLowerCase())==-1){
		alert('请上传图片文件(jpg,png,gif)!');
		return false;
	}
	if(exp.toLowerCase()!='zip'){
		alert('请上传zip文件！');
		return false;
	}
	//调用导出进度标志
	evcm01_modalWin.showProgressBar();
	evcm01_isShow = true;
	var themaId = ef.get("themaId").value;
	var themaEname=ef.get("themaEname").value;
	var params={"themaFilePath":encodeURI(ef.get("thema_file").value),"themaId":themaId,"themaEname":themaEname};
    var str=jQuery.param(params);
	ef.get("EVCM01").action = "./EV/CM/EVCM0101.jsp?"+str;
	document.forms[0].submit();
	
}

efgrid_onDataCellClick = function( grid_id, row_index, col_index, value ) {
   window.showModalDialog(value,"效果图","edge:raised;scroll:1;status:0;help:0;resizable:1;dialogWidth:500px;dialogHeight:250px;");
}

/*
  点击查询按钮后调用后台的service
*/
button_query_onclick = function ()
{
	efgrid.submitInqu( "ef_grid_result", "ev","EVCM01","query");
}

/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function ()
{
  	efgrid.submitForm( "ef_grid_result", "ev","EVCM01","delete", true );
}

/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ev","EVCM01","insert",true );
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function ()
{
	efgrid.submitForm( "ef_grid_result", "ev","EVCM01","update",true );
}