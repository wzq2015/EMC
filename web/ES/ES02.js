var loadNeeded = true;

efform_onload = function() {
  ef.get("userName").focus();
}

resetClick = function() {
  document.forms[0].reset();
}

loginClick = function() {
  var name  = $("#j_username").val();
  var password  = $("#j_password").val();
  var post  = $("#j_post").val();
  if ( post != "" ){
    document.forms[0].submit();
  }else{
    alert( "请选择用户岗位" );
  }
}

nameChanged = function(){
  loadNeeded = true;
  loadPost();  
}

loadPost = function(){
 if ( loadNeeded ){ 
   var cb = { 
      onSuccess: function(ei){
        var posts = $("#j_post");              
        posts.removeOption(/./);
        
        var st = ei.getStatus();
      	if ( st == -1 ){
      	  alert(ei.getMsg());
      	  return;
      	}
        var rows = ei.getBlock("result").getRows();            
        var options = {};
        for( var k in rows ){
          var row = rows[k];
          var postId = row[2];
          var org = row[0];
          var post = row[1];
          options[postId] = org + "--" + post;
        }
        posts.addOption(options,false);        
      },
      onFailure: function(msg){
        alert('failure');
      }
   }; 
 
   var loginName  = $("#j_username").val();    
   loadNeeded = false;   
   var ei_info = new EiInfo();	
   ei_info.setByNameValue( "inqu_data-0-name", loginName );   	
   EiCommunicator.send( "ES01", "queryPost", ei_info, cb, false );  
 }
}
