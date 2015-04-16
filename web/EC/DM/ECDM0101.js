
function upload(){
	var fileDes=document.getElementById("fileDes").value.trim();
	document.forms[0].action += "&fileDes="+encodeURI(fileDes);

   	if(check()){
		document.forms[0].submit();  
		ef.get("uploadTable").style.display="none";
		ef.get("uploadFileIframe").style.display="block";
	}
}


//文件上传前的判断
function check(){
   
   var  fileName=getFileName();
   if(fileName!=false){
	     var fileLength=efutils.getTotalBytes(fileName);
	     var fileDes=document.getElementById("fileDes").value;
	     	
	     fileDes=fileDes.trim();
	  // var desLength=fileDes.replace(/[^\x00-\xff]/g,'**').length;
	     var desLength=efutils.getTotalBytes(fileDes);
	
	     if(fileLength>255){
	        alert("文件名长度不能超过255个字节");
	        return false;
	     }
	     if(desLength>100) {
	        alert("文件描述长度不能超过100个字节");
	        return false;
	     }
	     	
	     if(!checkSuffix()){
	        return false;
		 }
	   
       return true;
    }else{
       alert("文件路径不可为空");
       return false;
    }

}
//文件上传前的大小判断
function checkSize(){
   var filespec=document.getElementById("myfile").value;
   var fso, f;
   var maxsize=50*1024*1024;//定义允许文件的大小，单位B
   fso = new ActiveXObject("Scripting.FileSystemObject");
 
   if (fso.FolderExists(filespec)) {
      f = fso.GetFolder(filespec);
    } else if (fso.FileExists(filespec))   {
            f = fso.GetFile(filespec);
        }   else   {
            alert("该文件不存在！");
            return false;
    }
   if(f.size>maxsize)
    {  
        alert("上传文件大小不可超过50M");
        return false;
    }
   return true;

  
}
//获取文件名，不包含路径
function getFileName(){
  var fileName=document.getElementById("myfile").value;
  fileName=fileName.trim();
  if(fileName!=''){
  var index1=fileName.lastIndexOf('/');
  var index2=fileName.lastIndexOf('\\');
  var index=0;
  if(index1!=-1)
     index=index1;
   if(index2!=-1&&index2>index1)
     index=index2;
     if(index==0){
       alert("上传文件路径不正确");
       return false;
       }
       else
        fileName=fileName.substring(index+1);
  return fileName;
   }else
    return false;
     
}
//判断后缀名是否正确
function checkSuffix(){
   var fileName=getFileName();
   var type=document.getElementById("type").value;
   if(fileName!=false){
      var index=fileName.lastIndexOf(".");
      var suffix='';
   //若该文件有后缀名
      if(index!=-1&&index!=fileName.length-1){
         suffix=fileName.substring(index+1);
         suffix=suffix.toLowerCase();
       }
      if(type==1)
        return checkImage(suffix);
        else if(type==2)
           return  checkFlash(suffix);
             else if(type==3)
                return  checkVedio(suffix);
     return true;
   
   }else
   return false;
   }
   //是否符合图片类型文档的后缀名
   function checkImage(suffix){
     if(suffix=="jpg"||suffix=="gif"||suffix=="png"||suffix=="bmp")
        return true;
        else
        {
        alert("请上传图片类型文件(.jpg,.gif,.png,.bmp)");
        return false;
        }
   }
   //是否符合flash型文档的后缀名
     function checkFlash(suffix){
     if(suffix=="swf"||suffix=="flv")
        return true;
        else
        {
        alert("请上传FLASH类型文件(.swf,.flv)");
        return false;
        }
   }
   //是否符合视频类型的文件的后缀名
    function checkVedio(suffix){
     if(suffix=="avi"||suffix=="wma"||suffix=="rmvb"||suffix=="rm"||suffix=="mp4"||suffix=="mid"||suffix=="3GP")
        return true;
        else
        {
        alert("请上传视频类型文件(.avi,.wma,.rmvb,.rm,.mp4,.mid,.3GP)");
        return false;
        }
   }
   //刷新ECDM01页面,当前窗口关闭。
	efform_onPopupReturn = function(winId, obj){
		if(window.opener!=null&&!window.opener.closed) {
			window.opener.efform_onPopupReturn("ECDM0102", "0");	
		}
		window.close();
	}
