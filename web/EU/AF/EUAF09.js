jQuery(function($){
    var buPlaceHolderId = "spanButtonPlaceholder1";
    var cancelId = "btnCancel1";
    var progressId  = "progress1";
    var saveId  = "save1";
    var document_ID = "document_ID";
    var uploadUrl = "./EU/AF/EUAF04.jsp?code="+$(".fileUpload").attr("code");
    var downloadUrl = "./EU/AF/EUAF06.jsp";
    var initUrl = "./EU/AF/EUAF07.jsp";
    var deleteUrl = "./EU/AF/EUAF08.jsp";
    var saveUrl = "./EU/AF/EUAF09.jsp";
    var cellName = $(".fileUpload").attr("cellName"); //input-0-documentId
    //文档id赋值
    var documentId = $(".fileUpload").attr("documentId");
//    var readOnly = $(".fileUpload").attr("readOnly")=="true"?true:false;
    //readonly属性  设置就是readonly
    var readOnly = $(".fileUpload").attr("readOnly")?true:false;

    var settings = {
        placeHolderId:buPlaceHolderId,
        readOnly:readOnly,
        cancelId:cancelId,
        progressId:progressId,
        downloadUrl:downloadUrl,
        documentId:documentId,
        initUrl:initUrl,
        saveUrl:saveUrl,
        saveId:saveId,
        deleteUrl:deleteUrl,
        cellName:cellName
    };
    if($(".fileUpload")){
        var grid = $(".fileUpload").uploadGrid(settings);
//        if($(".fileUpload").attr("readOnly")){
//            grid.ui.setReadOnly(true);
//        }
        ef.get($(".fileUpload").attr("cellName")).value = documentId;
        upload1 = new SWFUpload({
            // Backend Settings
            upload_url: uploadUrl,
            delete_url: deleteUrl,
            download_url: downloadUrl,
            // File Upload Settings
            file_size_limit : "102400",	// 100MB
            file_types : $(".fileUpload").attr("fileType")||"*.*",
            file_types_description : "Files",
            file_upload_limit : "20",
            file_queue_limit : "-1",
            documentId:"document_ID",
            grid: grid,
            // Event Handler Settings (all my handlers are in the Handler.js file)
            file_dialog_start_handler : fileDialogStart,
            file_queued_handler : tableFileQueued,
            file_queue_error_handler : tableQueueError,
            file_dialog_complete_handler : fileDialogComplete,
            upload_start_handler : tableUploadStart,
            upload_progress_handler : tableUploadProgress,
            upload_error_handler : tableUploadError,
            upload_success_handler : tableUploadSuccess,
            upload_complete_handler : uploadComplete,

            // Button Settings
            button_image_url : "./EF/Images/upload.png",
            button_placeholder_id : buPlaceHolderId,
            button_width: 61,
            button_height: 22,

            // Flash Settings
            flash_url : "./EF/jQuery/swfupload.swf",
            custom_settings : {
                progressTarget : progressId,
                cancelButtonId : cancelId
            },

            // Debug Settings
            debug: false
        });
        $.fn.setDocId = function(id){
	   		settings.documentId = id;
	   		$(".fileUpload").attr("documentId",id);
	   		//ef.get("inqu_status-0-documentId").value = id;
	    };
    }
});
