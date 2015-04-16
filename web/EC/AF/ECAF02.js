efform_onload = function ()
{
 efregion.show("ef_region_result");
}
function checkconfirm(){
	if(efvalidateObj(ef.get("result-0-comment"))){
		var comment=ef.get("result-0-comment").value;
   		var articleId=ef.get("articleId").value;
   
	   	if(comment.trim()!=''){
	   		var code = ECAF02.checkCode.value ;
	   		if(code == ''){
				alert("请输入验证码！");
				ECAF02.checkCode.focus();
				return ;
			}

	      	var info = new EiInfo();
	      	info.set("comment",comment);
	      	info.set("articleId",articleId);
	      	info.set("code",code);
	      	EiCommunicator.send( "ECAF02", "relComment" , info, null );
			if(ajaxEi!=null){	
				var msg=ajaxEi.getMsg();
				alert(msg);
				if(ajaxEi.getStatus()!='-1'){
					window.location.reload(true);
				}
			}   
	      		
	     }else
	      	alert("评论内容不能为空");
	}   
}

function deleteComment(commentId)
{

  var info = new EiInfo();
  info.set("commentId",commentId);
  EiCommunicator.send( "ECAF02", "delete" , info, null );
  window.location.reload(true);
}

