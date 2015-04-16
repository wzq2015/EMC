window.onload = function (){
   if (window.screen) {
      var myw = screen.availWidth;   
      var myh = screen.availHeight; 
      window.moveTo(0, 0);           
       window.resizeTo(myw, myh);     
    }  

	info=_getEi();
	//$("#portalNodeId").css("height","800");
	var blockCount=info.get("blockCount");
	if(blockCount!=0)
	show_layout(info);
	else
	show_layout();
}

show_layout = function(eiInfo) {
	var portal = new efportal("myPortal");
	portal.init( {
        "model":"areaModel",
		"paintNode" : ef.get("portalNodeId")
	},null,eiInfo);
}

function areaSave(eiInfo){
   var layoutId=ef.get("inqu_status-0-layoutId").value;
   var filePath=ef.get("inqu_status-0-filePath").value;
   eiInfo.set("layoutId",layoutId);
   eiInfo.set("filePath",filePath);
   EiCommunicator.send( "EVCM0702", "save" , eiInfo, null );
   if(ajaxEi!=null){
      alert("保存成功");
    //  var layoutId=ajaxEi.get("layoutId");
    //   setTimeout("transferGraphic("+layoutId+")",20000);
   }
}
var i=0;
function transferGraphic(layoutId){
	   i++;
	   var eiInfo=new EiInfo();
	   eiInfo.set("layoutId",layoutId);
	   EiCommunicator.send( "EVCM0702", "transferGraphic" , eiInfo, null );
	   if(ajaxEi!=null){
	   	var result=ajaxEi.get("result");
	   }
}