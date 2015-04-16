efform_onload = function ()
{
	var eiInfo =  _getEi();
	
	var table1 = document.getElementById('Table1'); 
	var trs = table1.getElementsByTagName('tr'); 
	var idx = trs.length; 
	
	var block = eiInfo.getBlock("result");
	for(var temp=0;temp<block.getRows().length;temp++){
		
	var newtr = table1.insertRow(idx); 
	
	newtd = getTD(); 
	newtd.innerHTML = '选择排序条件: <select id="d-'+temp+'-columnName" name="d-'+temp+'-columnName" ><option value="REC_CREATE_TIME" label="创建时间" /><option value="REC_REVISOR" label="最后修改人" /><option value="ARTICLE_ID" label="文章标识" /><option value="ARTICLE_TITLE" label="标题" /><option value="DISPLAY_TIME" label="显示时间" /><option value="REC_REVISE_TIME" label="最后修改时间" /><option value="REC_CREATOR" label="创建人" /><option value="ARTICLE_STATE" label="文章状态" /></select>'; 
	newtr.appendChild(newtd);
	setting("d-"+temp+"-columnName",block.getCell(temp,"columnName"));
	
	newtd = getTD(); 
	newtd.innerHTML = '选择排序方式: <select id="d-'+temp+'-operateName" name="d-'+temp+'-operateName"><option value=" asc " label="升序" /><option value=" desc " label="降序" /></select>'; 
	newtr.appendChild(newtd);
	setting("d-"+temp+"-operateName",block.getCell(temp,"operateName"));
	
	/*页面上删除一行后后台仍能取到一条空数据，checkFlag为后台验证当前记录是否存在使用*/
	newtd = getTD(); 
	newtd.innerHTML = '值: <input type="hidden" id="d-'+temp+'-checkFlag" name="d-'+temp+'-checkFlag" size="15" value="'+temp+'">'; 
	newtr.appendChild(newtd);
	
	newtd = getTD(); 
	newtd.innerHTML = '<a href="javascript:void(0)" onclick="CancelTr(this)" >取消</a>  '; 
	newtr.appendChild(newtd); 
	}
}
button_confirm_onclick = function () 
{
	var info = new EiInfo();
	info.setByNode("ef_region_detail");
	EiCommunicator.send( "ECCM08", "saveOrderSql" , info, ajax_callback_save );
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
		   	data.orderCondition = eiInfo.get("sql");
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
	newtd.innerHTML = '选择排序条件: <select id="d-'+temp+'-columnName" name="d-'+temp+'-columnName" ><option value="REC_CREATE_TIME" label="创建时间" /><option value="REC_REVISOR" label="最后修改人" /><option value="ARTICLE_ID" label="文章标识" /><option value="ARTICLE_TITLE" label="标题" /><option value="DISPLAY_TIME" label="显示时间" /><option value="REC_REVISE_TIME" label="最后修改时间" /><option value="REC_CREATOR" label="创建人" /><option value="ARTICLE_STATE" label="文章状态" /></select>'; 
	newtr.appendChild(newtd);
	
	newtd = getTD();
	newtd.innerHTML = '选择排序方式: <select id="d-'+temp+'-operateName" name="d-'+temp+'-operateName"><option value=" asc " label="升序" /><option value=" desc " label="降序" /></select>'; 
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