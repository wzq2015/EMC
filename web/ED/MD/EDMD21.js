efform_onload = function (){
   itemTypeChange();
}
//点击查询按钮后调用后台的service
button_query_onclick = function ()
{  
	efgrid.submitInqu( "ef_grid_result", "ei","EIIT00","query");
	clearRegion();	
}
//点击信息项替换区域的获取信息按钮后调用后台的service
button_query1_onclick = function ()
{
  
   var  ajax_syn_callback = { 
     onSuccess :  
    function(eiInfo){ 
     var itemSeq= ef.get("inqu1_status-0-itemSeq1").value;
      var itemInfo=eiInfo.get("itemInfo");
       if(itemInfo){
       ef.get("item_result-0-itemResult").value=itemInfo;
     
       }
      	
         else{
             ef.get("item_result-0-itemResult").value=""; 
      	     alert("填入的索引号"+itemSeq+"不存在对应的信息项");
      	      ef.get("inqu1_status-0-itemSeq1").value=""
      	     }
      	    
    },
    onFail    : 
    function(eMsg) {
    }
    }
    
    
     var itemSeq=ef.get("inqu1_status-0-itemSeq1").value;
     var itemSeq=itemSeq.trim();
      if(itemSeq.length>0){
      var eiinfo=new EiInfo();
	 eiinfo.set("itemSeq",itemSeq);
	 EiCommunicator.send("EIIT00","queryItem",eiinfo,ajax_syn_callback, false);
	 }
	 else
	 {
	 ef.get("item_result-0-itemResult").value="";
	   alert("请输入替换后的索引号");
	   }
	  
}
//点击执行替换按钮后调用后台的service
button_execute_onclick=function()
{

    var grid= efgrid.getGridObject( "ef_grid_result3" ); 
    var rowCount=grid.getCheckedRowCount();
    if(rowCount==0)
      alert("请先输入要替换的表");
     else{
    button_query1_onclick();
    if( ef.get("inqu1_status-0-itemSeq1").value!="")
   efgrid.submitForm( "ef_grid_result3", "ei","EIIT00","execute",true );
     }
}
/*
  点击删除按钮后调用后台的service
*/
button_delete_onclick = function () 
{  
  	efgrid.submitForm("ef_grid_result", "ei","EIIT00","delete", true );
  	clearRegion();
}
function  clearRegion()
{
    efform.clearDiv("ef_region_result2");
  	var grid = efgrid.getGridObject( "ef_grid_result3" ); 
   while(grid.getRowCount()>0)
  	  grid.removeRow(0);
  	  grid.refresh();
  	  itemTypeChange();
}
function itemTypeChange(){
   var itemType=ef.get("result2-0-itemType").value.trim();
   if(itemType=="C"){
   ef.get("result2-0-itemUpperValue").value="";
   ef.get("result2-0-itemLowerValue").value="";
   ef.get("result2-0-itemUpperValue").readOnly=true;
   ef.get("result2-0-itemLowerValue").readOnly=true;
   }else{
   ef.get("result2-0-itemUpperValue").readOnly=false;
   ef.get("result2-0-itemLowerValue").readOnly=false;
   }
}
/*
  判断必填字段不能为空
*/
function  check()
{
var itemEname=ef.get("result2-0-itemEname").value.trim();
var itemCname=ef.get("result2-0-itemCname").value.trim();
var itemType=ef.get("result2-0-itemType").value.trim();
var itemLen=ef.get("result2-0-itemLen").value.trim();
var tempStr;
var tempStr1;
var tag=0;
    if(!itemEname)
   {
      alert("字段英文名不能为空");
      return false;
    } 
     if(!itemCname)
   {
      alert("字段中文名不能为空");
      return false;
    }
       if(!itemType)
   {
      alert("字段类型不能为空");
      return false;
    }
          if(!itemLen)
   {
      alert("字段长度不能为空");
      return false;
    }
    if(contains(itemLen))
      {
          tempStr=itemLen.substring(0,itemLen.indexOf(","));        
          if(testInteger(tempStr)){
          tempStr1=itemLen.substring(itemLen.indexOf(",")+1);
          if(testInteger(tempStr1)){ 
          if(tempStr-tempStr1<=1){
            alert("字段长度格式输入有误，总长度要比小数长度大于1"); 
            return false;  
          }
          
          if(itemType=="C"){
            alert("字符不能有小数位");
            return false;
          }
          tag=tag+1;
          }
          }      
        }
        else if(testInteger(itemLen)){
            if(itemLen=="0"){
            alert("字段长度不能为0"); 
            return false; 
          }
            tag=tag+1; 
            }
      if(tag==0) {
        alert("字段长度格式不对");
       return false;
        }
     
   if(!((checkDefault("itemUpperValue","字段上限值"))&&(checkDefault("itemLowerValue","字段下限值"))&&(checkDefault("itemDefaultValue","字段缺省值"))))
     return false;
     var itemUpperValue=ef.get("result2-0-itemUpperValue").value.trim();
    var itemLowerValue=ef.get("result2-0-itemLowerValue").value.trim();
    var itemDefaultValue=ef.get("result2-0-itemDefaultValue").value.trim();
     if((itemUpperValue!="")&&(itemLowerValue!="")&&(itemLowerValue-itemUpperValue>0)){
     alert("字段上限值不能小于字段下限值");
     return false;
     }
     if(itemDefaultValue!=""){
     if((itemUpperValue!="")&&(itemDefaultValue-itemUpperValue>0)){
     alert("字段缺省值不能大于字段上限值");
     return false;
     }
     if(itemLowerValue!=""&&(itemDefaultValue-itemLowerValue<0)){
     alert("字段缺省值必须大于字段下限值");
     return false;
     }
     }   
   return true;
}
function checkDefault(str,str1){
var itemType=ef.get("result2-0-itemType").value.trim();
var itemLen=ef.get("result2-0-itemLen").value.trim();
var itemStr=ef.get("result2-0-"+str).value.trim();
var totalLen;
var tempStr;
var temStr1;
var preciseLen;
var IntegerLen;
var integerItem;
var index1=itemLen.indexOf(",");
var index;
var tag=0;
var tempItem;
var tempIndex;
if(itemStr!=""){
if(index1!=-1){
totalLen=itemLen.substring(0,index1);
preciseLen=itemLen.substring(index1+1);
IntegerLen=totalLen-preciseLen-1;
}
else{
totalLen=itemLen;
preciseLen=0;
IntegerLen=itemLen;
}
if(itemType=="C"){
  if(itemStr.length>totalLen){
     alert(str1+"长度不能大于设定的字段长度");
     return false;
     }
     return true;
     }
         else{
              if(isNaN(itemStr)){
              alert("数值型"+str1+"必须为数字");
              return false;
              }
              else{
                  if(itemStr.charAt(0)=='+'){
                  ef.get("result2-0-"+str).value=itemStr.substring(1);
                  itemStr=ef.get("result2-0-"+str).value.trim();
                  }
                  if(itemStr.charAt(0)=='.'){
                  ef.get("result2-0-"+str).value="0"+itemStr;
                  itemStr=ef.get("result2-0-"+str).value.trim();
                  }
                  if(itemStr.charAt(0)=='-'&&itemStr.charAt(1)=='.'){
                    itemStr=itemStr.substring(1);
                    itemStr="-0"+itemStr;
                    ef.get("result2-0-"+str).value=itemStr;
                  }
                   //清楚例如0001.00前的000
                   tempIndex=itemStr.indexOf(".");
                   if(tempIndex!=-1){
                  integerItem=itemStr.substring(0,tempIndex);
                  for(var k=0;k<integerItem.length-1;k++){
                    if((integerItem.charAt(k)=='0')&&tag==0){
                    itemStr=itemStr.substring(1);                                     
                    }else{
                    tag++;
                    }                     
                  }
                  ef.get("result2-0-"+str).value=itemStr;
                  }else{
                     tempItem=itemStr;               
                    for(var j=0;j<itemStr.length-1;j++){
                    if((tempItem.charAt(0)=='0')&&tag==0){
                       tempItem=tempItem.substring(1);                                       
                    }else
                       tag++;
                       }
                     ef.get("result2-0-"+str).value=tempItem;
                     itemStr=ef.get("result2-0-"+str).value.trim();
                  }
                    if(itemStr.length>totalLen){
                   alert(str1+"长度不能大于设定的字段长度");
                   return false;
                   }
                  index=itemStr.indexOf(".");
                  //当输入值有小数点时
                  if(index!=-1){
             
                 // 当输入值如"12."时
                  if(index==itemStr.length-1){
                    if(IntegerLen<itemStr.length-1){
                    alert(str1+"中的整数长度加符号位长度不能大于字段长度中设定的整数长度");
                     return false;
                    } 
                  }
                  //输入值的小数
                  tempStr=itemStr.substring(index+1);
                  //当输入的值有小数点，但是设定的长度中不包含小数位
                  if(index1==-1){
                  alert("字段长度中未设定精度，所以"+str1+"中不能带有小数");
                  return false;
                  }
                  //当输入的值有小数点，设定的长度中也包含小数位
                  else{
                    //获取字段长度的设定小数位数
                    temStr1=itemLen.substring(index1+1);
                    //如果输入值的小数位数大于字段的设定小数位数
                    if(temStr1<tempStr.length){
                    alert(str1+"中的小数点位数不能大于字段长度中设定的精度");
                    return false;
                    }else {
                       //如果输入值的整数位数大于字段长度设定值的整数位数
                       if(IntegerLen<itemStr.length-tempStr.length-1){
                        alert(str1+"中的整数长度加符号位长度不能大于字段长度中设定的整数长度");
                        return false;
                       }                   
                    else{                    
                    for(var i=0;i<temStr1-tempStr.length;i++)
                     itemStr=itemStr+"0";
                     ef.get("result2-0-"+str).value=itemStr;
                    }
                    }
                  }                    
                  }
                  //当输入值不包含小数时
                  else{       
                    
                     //如果字段长度也设定了小数位                
                     if(preciseLen!=0){
                        if(IntegerLen<itemStr.length){
                        alert(str1+"中的整数长度加符号位长度不能大于字段长度中设定的整数长度");
                        return false;
                       }else{
                       itemStr=itemStr+".";
                       for(var i=0;i<preciseLen;i++)
                         itemStr=itemStr+"0";
                        ef.get("result2-0-"+str).value=itemStr;
                       }
                       }
                  }
                 return true; 
              }            
     }
     }
     return true;
}
function contains(str)
{
 
  for(var i=0;i<str.length;i++)
    if(str.charAt(i)==',')
    return true;
    return false;
}

function testInteger(str)
{
  var r=/^[1-9]+[0-9]{0,}$/;
  return r.test(str);
}
itemTrim=function()
{
  ef.get("result2-0-itemEname").value=ef.get("result2-0-itemEname").value.trim();
  ef.get("result2-0-itemCname").value=ef.get("result2-0-itemCname").value.trim();
  ef.get("result2-0-itemLen").value=ef.get("result2-0-itemLen").value.trim();
  ef.get("result2-0-itemUnit").value=ef.get("result2-0-itemUnit").value.trim();
  ef.get("result2-0-itemUpperValue").value=ef.get("result2-0-itemUpperValue").value.trim();
  ef.get("result2-0-itemLowerValue").value=ef.get("result2-0-itemLowerValue").value.trim();
  ef.get("result2-0-remark").value=ef.get("result2-0-remark").value.trim();
}
function defaultValue()
{
  var defaultValue=ef.get("result2-0-itemDefaultValue").value.trim();
  var itemType=ef.get("result2-0-itemType").value.trim();
 
  if(!defaultValue){
     
     ef.get("result2-0-itemDefaultValue").value="";
     }
}
/*
  点击新增按钮后调用后台的service
*/
button_insert_onclick = function () 
{  //  ef.get("EIIT");
   itemTrim();
   if(check()){
  // defaultValue();
	efgrid.submitForm("ef_grid_result", "ei","EIIT00","insert",true );
	if(ajaxEi!=null) {
         var seq=ajaxEi.get("seq");
         ef.get("result2-0-itemSeq").value=seq;
	}
	}
}

/*
  点击修改按钮后调用后台的service
*/
button_update_onclick = function () 
{  itemTrim();
  if(checkItemSeq()&&check())
  //  defaultValue();
	efgrid.submitForm( "ef_grid_result", "ei","EIIT00","update",true );
}
function checkItemSeq()
{
 if(ef.get("result2-0-itemSeq").value==""){
 alert("请选中一行进行修改");
 return false;
 }
 return true;
}
/*
   点击主表里的某行触发的回调,查询引用表的信息，ajax提交
*/
function efgrid_onRowClicked( grid_id, row_index )
{   
    if( grid_id == "ef_grid_result" )
	{
	   efform.clearDiv("ef_region_result2");
	   
	    grid = efgrid.getGridObject("ef_grid_result");
	    var itemSeq = grid.getCellValue(row_index,1,TYPE_FIX);
	     var eiinfo = new EiInfo();
		eiinfo.set("itemSeq",itemSeq);
		var ajax_callback = efform.getSystemAjaxCallback( "ef_region_result2" );
        EiCommunicator.send( "EIIT00", "getItemDetail", eiinfo, ajax_callback);	
	   
         ef.get("table_inqu_status-0-itemSeq").value = itemSeq;     
         efgrid.submitInqu( "ef_grid_result3", "ei", "EIIT00","queryTable"); 
         itemTypeChange();
	}
}
//将检查结果不为空的记录行高亮显示
efgrid_onGridDisplayReady=function(div_node)
{
  if(div_node.id=="ef_grid_result")
  {
     var grid=efgrid.getGridObject("ef_grid_result");
     var rowCount=grid.getRowCount();
     for(var i=0;i<rowCount;i++)
     {
       var checkResult=grid.getCellValue(i,11,TYPE_DATA);

       if(checkResult.length>1)
         efgrid.setRowDisplayStyle(div_node.id,i,"show");
     }    
     }
}

