$(document).ready(function() {
		//Thumbnailer.config.shaderOpacity = 1;
	   var countNum=ef.get("countNum").value;
	   if(countNum==0){
	   	alert("当前没有可用布局");
	   	parent.hideMask();
	   	var objDiv = parent.document.getElementById("layoutDiv");
		$(objDiv).remove();
	   	
	   	return;
	   }
		var tn1 = $('.mygallery').tn3({
			     
					skinDir:"./EF/tn3/skins",
					imageClick:"select",
					image:{
					maxZoom:1.5,
					crop:true,
					clickEvent:"dblclick",
					transitions:[{
					type:"blinds"
					},{
					type:"grid"
					},{
					type:"grid",
					duration:460,
					easing:"easeInQuad",
					gridX:1,
					gridY:8,
					// flat, diagonal, circle, random
					sort:"random",
					sortReverse:false,
					diagonalStart:"bl",
					// fade, scale
					method:"scale",
					partDuration:360,
					partEasing:"easeOutSine",
					partDirection:"left"
					}]
					}
			});
		//	$(".tn3-thumbs").width(241);
		
		$(".tn3-image-description").remove();
		$("[title='Powered by TN3 Gallery']").remove();
		$(".tn3-fullscreen").remove();
		$(".tn3-text-bg").width('20%');
	//	$(".tn3-text-bg").hide();
	//	$(".tn3-in-image").hover(function(){$(".tn3-text-bg").show();},function(){$(".tn3-text-bg").hide();});
		
		$(".tn3-gallery").css("background-color","#D2D2D2");
		$(".tn3-image").css("background-color","#D2D2D2");
	    var $tn1=tn1.data('tn3');
	    var checkIndex=ef.get("checkedIndex").value;
		$tn1.show(checkIndex);
		
		
	    onloadEV();
		});
		
var frameUrl;
var portalId;
function selectImg(obj){
   parent.hideMask();
   var objDiv = parent.document.getElementById("layoutDiv"); 
   objDiv.style.display="none";
   var inInfo = new EiInfo();
   portalId=parent.document.getElementById("portalId").value;
   inInfo.set("personalTemplateLayout", obj);
   inInfo.set("portalId", portalId);
   frameUrl=parent.document.getElementById("url").value;
   EiCommunicator.send("EV11", "save", inInfo, lo_callback);
}
var lo_callback = {
	onSuccess : function(eiInfo) {
		alert("修改成功!");
		//取消配置div
		var objDiv = parent.document.getElementById("layoutDiv");
		$(objDiv).remove();
		//刷新
		if (portal != null) {
			//更新portalId
			var paramString ="";
			var p_url_arr = frameUrl.split("&");
			for(var i=0;i<p_url_arr.length;i++){
				if(p_url_arr[i]!="" && p_url_arr[i].split("=")[0]!="portalId"){
					paramString+=p_url_arr[i]+"&";
				}
			}
			if(paramString.trim().length>1&&paramString.indexOf("&")>0){
				paramString=paramString.substring(0,paramString.length-1);
			}
			paramString+="&portalId="+portalId;
		    portal.src = "DispatchAction.do?efFormEname=EV0105&"+paramString;
			}
			
	},
	onFail : function(eMsg) {
		alert("failure");
	}
}