
/* This is an example of how to cancel all the files queued up.  It's made somewhat generic.  Just pass your SWFUpload
 object in to this method and it loops through cancelling the uploads. */
function cancelQueue(instance) {
    document.getElementById(instance.customSettings.cancelButtonId).disabled = true;
    instance.stopUpload();
    var stats;
    do {
        stats = instance.getStats();
        instance.cancelUpload();
    } while (stats.files_queued !== 0);

}

/* **********************
 Event Handlers
 These are my custom event handlers to make my
 web application behave the way I went when SWFUpload
 completes different tasks.  These aren't part of the SWFUpload
 package.  They are part of my application.  Without these none
 of the actions SWFUpload makes will show up in my application.
 ********************** */
function fileDialogStart() {
    /* I don't need to do anything here */
}
function fileQueued(file) {
    try {
        // You might include code here that prevents the form from being submitted while the upload is in
        // progress.  Then you'll want to put code in the Queue Complete handler to "unblock" the form
        var progress = new FileProgress(file, this.grid);
        progress.setStatus("Pending...");
        progress.toggleCancel(true, this);

    } catch (ex) {
        this.debug(ex);
    }
}

function tableFileQueued(file) {
    try {
        // You might include code here that prevents the form from being submitted while the upload is in
        // progress.  Then you'll want to put code in the Queue Complete handler to "unblock" the form
        var progress ;
        if(progressType.isColumn){
            progress =  new ColumnProgress(file, this.settings.grid);
        }else{
            progress =  new TableProgress(file, this.settings.grid);
        }
        progress.setStatus("Pending...");
        progress.toggleCancel(true, this);

    } catch (ex) {
        this.debug(ex);
    }
}

function tableQueueError(file, errorCode, message) {
    try {
        if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
            alert("You have attempted to queue too many files.\n" + (message === 0 ? "You have reached the upload limit." : "You may select " + (message > 1 ? "up to " + message + " files." : "one file.")));
            return;
        }

        var progress ;
        if(progressType.isColumn){
            progress =  new ColumnProgress(file, this.settings.grid);
        }else{
            progress =  new TableProgress(file, this.settings.grid);
        }
        progress.setError();
        progress.toggleCancel(false);

        dealErrorCode(file,progress,errorCode)
    } catch (ex) {
        this.debug(ex);
    }
}

function tableUploadStart(file) {
    try {
        /* I don't want to do any file validation or anything,  I'll just update the UI and return true to indicate that the upload should start */
        var id = $("#"+$(".fileUpload").attr("cellName")).val();
        if(id != ""&&id!="0"){
            if(this.settings.upload_url.indexOf("document_ID")<0)  {
                this.settings.upload_url +="&document_ID"+"="+id;
            }else{
                this.settings.upload_url = this.settings.upload_url.substring(0,this.settings.upload_url.indexOf("document_ID"));
                this.settings.upload_url += "document_ID="+id;
            }
            this.setUploadURL(this.settings.upload_url);
        }else{
            if(this.settings.upload_url.indexOf("document_ID")>=0)  {
                this.settings.upload_url = this.settings.upload_url.substring(0,this.settings.upload_url.indexOf("document_ID"));
            }
            this.setUploadURL(this.settings.upload_url);
        }

        var progress ;
        if(progressType.isColumn){
            progress =  new ColumnProgress(file, this.settings.grid);
        }else{
            progress =  new TableProgress(file, this.settings.grid);
        }

        progress.setStatus("上传中...");
        progress.toggleCancel(true, this);
    }
    catch (ex) {
    }

    return true;
}

function tableUploadProgress(file, bytesLoaded, bytesTotal) {
    try {
        var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
        var progress ;
        if(progressType.isColumn){
            progress =  new ColumnProgress(file, this.settings.grid);
        }else{
            progress =  new TableProgress(file, this.settings.grid);
        }
        progress.setProgress(percent);
        progress.setStatus("上传中...");
    } catch (ex) {
        this.debug(ex);
    }
}

function tableUploadError(file, errorCode, message) {
    try {
        var progress ;
        if(progressType.isColumn){
            progress =  new ColumnProgress(file, this.settings.grid);
        }else{
            progress =  new TableProgress(file, this.settings.grid);
        }
        progress.setError();
        progress.toggleCancel(false);
        dealUploadError(file, errorCode, message,progress);
    } catch (ex) {
        this.debug(ex);
    }
}

function tableUploadSuccess(file, serverData) {
    try {
        var progress ;
        if(progressType.isColumn){
            progress =  new ColumnProgress(file, this.settings.grid);
        }else{
            progress =  new TableProgress(file, this.settings.grid);
        }
        var returnValue = eval("("+serverData+")");
        if(returnValue["attachmentID"]){
            progress.setComplete(returnValue["attachmentID"],this.settings.delete_url,this.settings.download_url,createTableTr,returnValue["documentID"]);
        }else{
            progress.setComplete(null);
        }
        //        progress.setStatus("上传完毕");
        ef.get($(".fileUpload").attr("cellName")).value = returnValue["documentID"];
        //this.settings.documentId = returnValue["documentID"];
        if(returnValue["documentID"]&&this.settings.upload_url.indexOf(this.settings.documentId)<0)  {
            this.settings.upload_url +="&document_ID"+"="+returnValue["documentID"];
            this.setUploadURL(this.settings.upload_url);
        }
        progress.toggleCancel(false);

    } catch (ex) {
        this.debug(ex);
    }
}

function fileQueueError(file, errorCode, message) {
    try {
        if (errorCode === SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED) {
            alert("You have attempted to queue too many files.\n" + (message === 0 ? "You have reached the upload limit." : "You may select " + (message > 1 ? "up to " + message + " files." : "one file.")));
            return;
        }

        var progress = new FileProgress(file, this.customSettings.progressTarget);
        progress.setError();
        progress.toggleCancel(false);
        dealErrorCode(file,progress,errorCode)

    } catch (ex) {
        this.debug(ex);
    }
}

function dealErrorCode(file,progress,errorCode){
    switch (errorCode) {
        case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
            progress.setStatus("File is too big.");
            this.debug("Error Code: File too big, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
        case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
            progress.setStatus("Cannot upload Zero Byte files.");
            this.debug("Error Code: Zero byte file, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
        case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
            progress.setStatus("Invalid File Type.");
            this.debug("Error Code: Invalid File Type, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
        case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
            alert("You have selected too many files.  " +  (message > 1 ? "You may only add " +  message + " more files" : "You cannot add any more files."));
            break;
        default:
            if (file !== null) {
                progress.setStatus("Unhandled Error");
            }
            this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
    }
}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
    try {
        if (this.getStats().files_queued > 0) {
            document.getElementById(this.customSettings.cancelButtonId).disabled = false;
        }

        /* I want auto start and I can do that here */
        this.startUpload();
    } catch (ex)  {
        this.debug(ex);
    }
}

function uploadStart(file) {
    if(document.getElementById(this.customSettings.progressTarget).style.display=='none'){
        document.getElementById(this.customSettings.progressTarget).style.display='block';
    }
    try {
        /* I don't want to do any file validation or anything,  I'll just update the UI and return true to indicate that the upload should start */
        var progress = new FileProgress(file, this.customSettings.progressTarget);

        progress.setStatus("上传中...");
        progress.toggleCancel(true, this);
    }
    catch (ex) {
    }

    return true;
}

function uploadProgress(file, bytesLoaded, bytesTotal) {

    try {
        var percent = Math.ceil((bytesLoaded / bytesTotal) * 100);
        var progress = new FileProgress(file, this.customSettings.progressTarget);
        progress.setProgress(percent);
        progress.setStatus("上传中...");
    } catch (ex) {
        this.debug(ex);
    }
}

function uploadSuccess(file, serverData) {
    try {
        var progress = new FileProgress(file, this.customSettings.progressTarget);
        var returnValue = eval("("+serverData+")");
        if(returnValue["attachmentID"]){
            progress.setComplete(returnValue["attachmentID"],this.settings.delete_url,this.settings.download_url,createFileDiv);
        }else{
            progress.setComplete(null);
        }
        if(returnValue["documentID"]&&this.settings.upload_url.indexOf(this.settings.documentId)<0)  {
            this.settings.upload_url +="&document_ID="+returnValue["documentID"];
            this.setUploadURL(this.settings.upload_url);
            if($("#documentId")){
                $("#documentId").attr("value",returnValue["documentID"]);
            }
        }
        progress.toggleCancel(false);

    } catch (ex) {
        this.debug(ex);
    }
}

function uploadComplete(file) {
    try {
        /*  I want the next upload to continue automatically so I'll call startUpload here */
        if (this.getStats().files_queued === 0) {
            document.getElementById(this.customSettings.cancelButtonId).disabled = true;
        } else {
            this.startUpload();
        }
    } catch (ex) {
        this.debug(ex);
    }

}

function uploadError(file, errorCode, message) {
    try {
        var progress = new FileProgress(file, this.customSettings.progressTarget);
        progress.setError();
        progress.toggleCancel(false);
        dealUploadError(file, errorCode, message,progress);
    } catch (ex) {
        this.debug(ex);
    }
}

function dealUploadError(file, errorCode, message,progress){
    switch (errorCode) {
        case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
            progress.setStatus("Upload Error: " + message);
            this.debug("Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
            break;
        case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
            progress.setStatus("Configuration Error");
            this.debug("Error Code: No backend file, File name: " + file.name + ", Message: " + message);
            break;
        case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
            progress.setStatus("Upload Failed.");
            this.debug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
        case SWFUpload.UPLOAD_ERROR.IO_ERROR:
            progress.setStatus("Server (IO) Error");
            this.debug("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
            break;
        case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
            progress.setStatus("Security Error");
            this.debug("Error Code: Security Error, File name: " + file.name + ", Message: " + message);
            break;
        case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
            progress.setStatus("Upload limit exceeded.");
            this.debug("Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
        case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
            progress.setStatus("File not found.");
            this.debug("Error Code: The file was not found, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
        case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
            progress.setStatus("Failed Validation.  Upload skipped.");
            this.debug("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
        case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
            if (this.getStats().files_queued === 0) {
                document.getElementById(this.customSettings.cancelButtonId).disabled = true;
            }
            progress.setStatus("Cancelled");
            progress.setCancelled();
            break;
        case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
            progress.setStatus("Stopped");
            break;
        default:
            progress.setStatus("Unhandled Error: " + error_code);
            this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
            break;
    }
}

function createFileDiv(settings){
    var fileProgressElement = document.createElement("ul");
    fileProgressElement.id = settings.attachmentId;
    var item = document.createElement("li");
    item.className = "Attachment";
    //创建
    var downloadDiv = document.createElement("a");
    downloadDiv.href = settings.downloadUrl + "?attachmentId="+settings.attachmentId;
    downloadDiv.innerHTML= settings.fileName;
    downloadDiv.className = "progressName";

    var deleDiv = document.createElement("img");
    deleDiv.className = "Remove a_remove";
    deleDiv.src="./EF/Images/clear.gif";
    deleDiv.title="删除";
    //附件删除
    deleDiv.onclick = function deleteFile(){
        $.ajax({ type:"post", url: settings.deleteUrl, data: {attachmentId:settings.attachmentId},success: function(){
            var parentNode = fileProgressElement.parentNode;
            $(fileProgressElement).remove();
            if(parentNode.childNodes.length<=0){
                parentNode.style.display = "none";
            }
        } });
    };
    item.appendChild(downloadDiv);
    item.appendChild(deleDiv);
    fileProgressElement.appendChild(item);
    return fileProgressElement;
}

