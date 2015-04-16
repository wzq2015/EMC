efform_onload = function ()
{
    
    
	var eiInfo =  _getEi();
	
	var table1 = document.getElementById('Table1'); 
	var trs = table1.getElementsByTagName('tr'); 
	
	var block = eiInfo.getBlock("result");
	var retrievalConditionMode = eiInfo.get("retrievalConditionMode");
	if(null==retrievalConditionMode||""==retrievalConditionMode||" "==retrievalConditionMode)
	{
		setRadioValue("retrievalConditionMode","and");
	}
	else
	{
		setRadioValue("retrievalConditionMode",retrievalConditionMode);
	}
	for(var temp=0;temp<block.getRows().length;temp++){
		
	var idx = trs.length; 
	var newtr = table1.insertRow(idx); 
	
	newtd = getTD(); 
	newtd.innerHTML = '字段: <select id="d-'+temp+'-columnName" name="d-'+temp+'-columnName" ><option value="REC_CREATE_TIME" label="创建时间" /><option value="REC_REVISOR" label="最后修改人" /><option value="ARTICLE_ID" label="文章标识" /><option value="ARTICLE_TITLE" label="标题" /><option value="DISPLAY_TIME" label="显示时间" /><option value="REC_REVISE_TIME" label="最后修改时间" /><option value="REC_CREATOR" label="创建人" /><option value="ARTICLE_STATE" label="文章状态" /></select>'; 
	newtr.appendChild(newtd);
	setting("d-"+temp+"-columnName",block.getCell(temp,"columnName"));
	
	newtd = getTD(); 
	newtd.innerHTML = '操作: <select id="d-'+temp+'-operateName" name="d-'+temp+'-operateName"><option value=" < " label="小于" /><option value=" <= " label="小于等于" /><option value=" <> " label="不等于" /><option value=" = " label="等于" /><option value=" > " label="大于" /><option value=" >= " label="大于等于" /><option value="like" label="包含" /></select>'; 
	newtr.appendChild(newtd);
	setting("d-"+temp+"-operateName",block.getCell(temp,"operateName"));
	
	newtd = getTD(); 
	newtd.innerHTML = '值: <input type="text" id="d-'+temp+'-operateValue" name="d-'+temp+'-operateValue" size="15" value="'+block.getCell(temp,"operateValue")+'">'; 
	newtr.appendChild(newtd);
	
	/*页面上删除一行后后台仍能取到一条空数据，checkFlag为后台验证当前记录是否存在使用*/
	newtd = getTD(); 
	newtd.innerHTML = '值: <input type="hidden" id="d-'+temp+'-checkFlag" name="d-'+temp+'-checkFlag" size="15" value="'+temp+'">'; 
	newtr.appendChild(newtd);
	
	newtd = getTD(); 
	newtd.innerHTML = '<a href="javascript:void(0)" onclick="CancelTr(this)" >取消</a>  '; 
	newtr.appendChild(newtd); 
	}
}
button_insert_onclick = function () 
{
	var grid = efgrid.getGridObject( "ef_grid_result" );
   	var rows=grid.getCheckedRows();
  	if(rows.length==0){
  		alert("请选择需要修改的记录！");
  		return ;
  	}
  	      
	efgrid.submitForm( "ef_grid_result", "ec","ECCM08","insert",true );
}
button_delete_onclick = function () 
{
	var grid = efgrid.getGridObject( "ef_grid_result" );
   	var rows=grid.getCheckedRows();
  	if(rows.length==0){
  		alert("请选择需要修改的记录！");
  		return ;
  	}
      
	efgrid.submitForm( "ef_grid_result", "ec","ECCM08","delete",true );
}
button_confirm_onclick = function () 
{
	var info = new EiInfo();
	info.setByNode("ef_region_detail");
	EiCommunicator.send( "ECCM08", "save" , info, ajax_callback_save );
}

button_cancel_onclick = function () 
{
	window.close();
}

ajax_callback_save =
{
	onSuccess :
   		function(eiInfo)
		{
			var data = new Object();
		   	data.retrievalConditionSql = eiInfo.get("sql");
		   	data.retrievalConditionMode = eiInfo.get("retrievalConditionMode");
		   	window.returnValue = data;
		   	window.close();
   		},
 		onFail:
   		function(eMsg)
		{
   			alert("保存失败，原因："+eMsg);
		}
};

function addNew() {
	var table1 = document.getElementById('Table1'); 
	var trs = table1.getElementsByTagName('tr'); 
	var idx = trs.length; 
	var newtr = table1.insertRow(idx); 
	var temp =newtr.rowIndex; 

	newtd = getTD(); 
	newtd.innerHTML = '字段: <select id="d-'+temp+'-columnName" name="d-'+temp+'-columnName"><option value="REC_CREATE_TIME" label="创建时间" /><option value="REC_REVISOR" label="最后修改人" /><option value="ARTICLE_ID" label="文章标识" /><option value="ARTICLE_TITLE" label="标题" /><option value="DISPLAY_TIME" label="显示时间" /><option value="REC_REVISE_TIME" label="最后修改时间" /><option value="REC_CREATOR" label="创建人" /><option value="ARTICLE_STATE" label="文章状态" /></select>'; 
	newtr.appendChild(newtd); 
	
	newtd = getTD(); 
	newtd.innerHTML = '操作: <select id="d-'+temp+'-operateName" name="d-'+temp+'-operateName"><option value=" < " label="小于" /><option value=" <= " label="小于等于" /><option value=" <> " label="不等于" /><option value=" = " label="等于" /><option value=" > " label="大于" /><option value=" >= " label="大于等于" /><option value="like" label="包含" /></select>'; 
	newtr.appendChild(newtd); 
	
	newtd = getTD(); 
	newtd.innerHTML = '值: <input type="text" id="d-'+temp+'-operateValue" name="d-'+temp+'-operateValue" size="15">'; 
	newtr.appendChild(newtd); 
	
	/*页面上删除一行后后台仍能取到一条空数据，checkFlag为后台验证当前记录是否存在使用*/
	newtd = getTD(); 
	newtd.innerHTML = '值: <input type="hidden" id="d-'+temp+'-checkFlag" name="d-'+temp+'-checkFlag" size="15" value="'+temp+'">'; 
	newtr.appendChild(newtd);
	
	newtd = getTD(); 
	newtd.innerHTML = '<a href="javascript:void(0)" onclick="CancelTr(this)" >取消</a>  '; 
	newtr.appendChild(newtd); 
}

function getTD() { 
	var newtd = document.createElement("td"); 
	return newtd; 
}

function CancelTr(_this) { 
	var dtr = _this.parentNode.parentNode; 
	dtr.parentNode.removeChild(dtr);
}

function setting(obj,val){
 s=document.getElementById(obj);
 for(i=0;i<s.options.length;i++){
  if(s.options[i].value==val){
   s.options[i].selected="selected";
  } 
 }
}

function setRadioValue(name,value) 
{ 
	l=document.getElementsByName(name) 
	for(i=0;i<l.length;i++) 
	{ 
		if(l[i].value==value) 
		{
			l[i].checked = true;
		}else
			l[i].checked = false;
	} 
} 