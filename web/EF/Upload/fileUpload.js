var Max_FILE_SIZE = "10mb";
var Max_FILE_SIZE_DATA = 1024*1024*10;
var UploadGridManager = {
    containers:{},
    getUploadGridById:function(id){
        return this.containers["container_"+id];
    },
    setUploadGrid:function(grid){
        this.containers[grid.settings.divId] = grid;
    }
};

var UploadComponent = function(settings){
    this.settings = {
        fileFilter:"*",
        fileDescription:"File(*)",
        uploadUrl:"./EU/AF/EUAF04.jsp",
        downloadUrl:"./EU/AF/EUAF06.jsp",
        initUrl:"./EU/AF/EUAF07.jsp",
        containerId:"",
        divId:"",
        inputDiv:"",
        deleteUrl:"./EU/AF/EUAF08.jsp"
    };
    if(settings["fileType"]&&settings["fileType"].indexOf("|")>0){
        var filters = settings["fileType"].split("|");
        this.settings.fileDescription = filters[0];
        this.settings.fileFilter = filters[1];
    }
    $.extend(this.settings,settings);
    this.settings.readOnly = $("#"+this.settings.divId).attr("readOnly");
    this.init();
    UploadGridManager.setUploadGrid(this);
};

UploadComponent.prototype = {
    init:function(){
        var g = this;
        g.fileCounts = 0;
        g.isCanUpload = true;
        g.buildTable();
        g.setReadOnly(g.settings.readOnly);
        g.createUrl();
        g.uploader = new plupload.Uploader({
            runtimes : 'gears,html5,flash,silverlight,browserplus,html4',
            browse_button : g.getBrowseButtonId(),
            container:g.getContainerId(),
            max_file_size :Max_FILE_SIZE,
            url :g.settings.uploadUrl,
            chunk_size : '10gb',
//            resize : {width : 320, height : 240, quality : 90},
            flash_swf_url : './EF/Upload/plupload.flash.swf',
            silverlight_xap_url : './EF/Upload/plupload.silverlight.xap' ,
            filters : [
                {title : this.settings.fileDescription, extensions : this.settings.fileFilter}
            ]
        });

        this.addEvent();

        this.uploader.init();

        this.showFileList();
    },
    buildTable:function(){
        var g = this;
        var tables = new Array();
        tables.push("<div id='"+this.getContainerId()+"' >");
        tables.push("  <div style='float: none;'></div>");
        tables.push("  <div class='footer' style='float: none;'> <input class='ico_att' style='margin-top: 2px; margin-right: 3px; margin-bottom: 2px; margin-left: 0px;' type='button'/><a href='#' id='"+g.getBrowseButtonId()+"' style='font-size: 12px;'>添加附件</a></div>");
        tables.push("  <div id='"+this.getFileListId()+"' class='ef-region-content ef-region-border ef-state-default fileList' style='min-height:25px;'></div>");
        tables.push("</div>");
        $("#"+this.settings.divId).append(tables.join(""));

    },

    addEvent:function(){
        var g = this;
        g.uploader.bind('FilesAdded', function(up, files){
            $('#'+g.getFileListId()).find('.clear').remove();
            var addFileArray = new Array();

            //限制文件数量
            var fileCounts = (g.fileCounts + files.length);
            var maxCount = $("#"+g.settings.divId).attr("maxCount");
            if(maxCount&&parseInt(maxCount)<fileCounts){
                g.isCanUpload = false;
                //移除队列中的文件
                alert("您最多能上传"+maxCount+"个文件");
                return;
            }else{
                g.fileCounts =  fileCounts;
                g.isCanUpload = true;
            }
//            addFileArray.push($('#'+g.getFileListId()).html() );
            for (var i in files) {
                if(typeof files[i]=="object"&&files[i].name){
                    if(files[i].size>Max_FILE_SIZE_DATA){
                        alert("文件"+files[i].name+"太大,上传附件大小不能超过"+Max_FILE_SIZE);
                        continue;
                    }
                    addFileArray.push( '<div style="float:left;margin-left: 20px;margin-top:2px;font-size: 12px;color: #000000;font-weight: bold;" >');
                    addFileArray.push( '   <div id="' + files[i].id + '" ><input class="ico_att" style="margin-top: 2px; margin-right: 3px; margin-bottom: 2px; margin-left: 0px;" type="button"/><span class="fileName">'+ files[i].name+"</span>");
                    addFileArray.push('      <span  style="font-size: 12px;color: #808080;">'+"("+plupload.formatSize(files[i].size)+')</span><span class="progress"  style="width: 100px;color: #0000ff;"></span><span class="deleteBtn" style="cursor:hand;margin-left: 12px;">&nbsp;&nbsp;</span>');
                    addFileArray.push('    </div>');
                    addFileArray.push('</div>');
                }
            }
            $('#'+g.getFileListId()).append(addFileArray.join(""));
            $('#'+g.getFileListId()).append("<div class='clear' style='clear: both;'></div>");
            $(files).each(function(index,file){
                if(typeof file=="object"&&file.name){
                    $('.deleteBtn',"#"+file.id).click(function(){
                        up.removeFile(up.getFile(file.id));
                        $("#"+file.id).parent().remove();
                    });
                }
            });

            g.uploader.trigger("start");
            //内存释放
            addFileArray = null;
            delete addFileArray;
        });

        g.uploader.bind('QueueChanged', function(up){
            if( !g.isCanUpload){
                return;
            }
            //如果是添加文件,直接上传文件
            if(g.uploader.state==1){
                g.uploader.start();
            }
        });

        g.uploader.bind('UploadProgress', function(up, file) {
            if( $('.progress',"#"+file.id)[0]){
                $('.progress',"#"+file.id)[0].innerHTML = ("&nbsp;&nbsp;已上传:"+file.percent +"%");
                if(file.percent==100){
                    $('.progress',"#"+file.id)[0].innerHTML = "";
                }
            }
        });

        g.uploader.bind('FileUploaded', function(up, file,response) {
            var resp = eval("("+response.response+")");
            //上传完成后处理
            g.afterLoaded(file,resp);

            if(up.settings.url.indexOf("document_ID")>0){
                up.settings.url = up.settings.url.substr(0,up.settings.url.indexOf("document_ID")-1);
            }
            up.settings.url = up.settings.url +"&document_ID="+resp["documentID"];
        });

    },
    afterLoaded:function(file,resp){
        var g = this;
        $("#"+g.settings.inputDiv,$("#"+g.settings.divId)).val(resp["documentID"]);
        $('.fileName',$("#"+file.id)).html("<a href='"+g.settings.downloadUrl + "?attachmentId="+resp["attachmentID"]+"'>"+$('.fileName',"#"+file.id).html()+"</a>");
        $('.deleteBtn',$("#"+file.id)).unbind("click");
        $('.deleteBtn',$("#"+file.id)).bind("click",function(){
            if(confirm("您确实要删除附件:"+file.name)){
                $.ajax({ type:"post", url: g.settings.deleteUrl, data: {attachmentId:resp["attachmentID"]},success: function(){
                    $("#"+file.id).parent().remove();
                    g.fileCounts -= 1;
                },fail:function(){alert("文件被使用,删除失败")} });
            }
        });
    } ,
    createUrl:function(){
        var g = this;
        var documentId = g.settings.documentId||g.getDocId();
        if(this.settings.uploadUrl.indexOf("?")>0){
            this.settings.uploadUrl = this.settings.uploadUrl.substr(0,this.settings.uploadUrl.indexOf("?"));
        }
        var hide = $("#"+this.settings.divId).attr("hide")||"";
        if(hide){
            hide = 9;
        }
        this.settings.uploadUrl += "?code=" + this.settings.code||$(".fileUpload","#"+g.settings.divId).attr("code");
        this.settings.uploadUrl +=  "&hide="+hide;

        if(this.settings.uploadUrl.indexOf("document_ID")>0){
            this.settings.uploadUrl = this.settings.uploadUrl.substr(0,this.settings.uploadUrl.indexOf("document_ID")-1);
        }

        if(documentId&&documentId!="0"){
            this.settings.uploadUrl = this.settings.uploadUrl +"&document_ID="+documentId;
        }
        if(g.uploader){
            g.uploader.settings.url =  this.settings.uploadUrl;
        }
    },

    startUpload:function(){
        this.uploader.start();
        return false;
    },

    generateId:function(){
        return "upload_"+ (new Date().getTime() + Math.floor(Math.random()*1000000));
    },
    getContainerId:function(){
        if(!this.containerId){this.containerId = this.generateId();}
        return this.containerId;
    },
    getFileListId:function(){
        if(!this.fileListId){this.fileListId = this.generateId();}
        return this.fileListId;
    },
    getBrowseButtonId:function(){
        if(!this.BrowserRowId){this.BrowserRowId = this.generateId();}
        return this.BrowserRowId;
    },
    createDocElement:function(params){
        var g = this;
        var addFileArray = new Array();
//        addFileArray.push($('#'+g.getFileListId()).html());
        addFileArray.push( '<div style="float:left;margin-left: 20px;margin-top:2px;font-size: 12px;color: #000000;font-weight: bold;" >');
        addFileArray.push( '<div id="' + params.attachmentId + '" ><input class="ico_att" style="margin-top: 2px; margin-right: 3px; margin-bottom: 2px; margin-left: 0px;" type="button"/><span class="fileName">'+ params.fileName+"</span>");
        if(!g.settings.readOnly){
            addFileArray.push('<span class="deleteBtn" style="cursor:hand;margin-left: 12px">&nbsp;&nbsp;</span>');
        }
        addFileArray.push('</div>');
        addFileArray.push('</div>');

        $('#'+g.getFileListId()).append(addFileArray.join(""));
        $('.fileName',$("#"+g.settings.divId).find("#"+params.attachmentId)).html("<a href='"+g.settings.downloadUrl + "?attachmentId="+params["attachmentId"]+"' style='color: grey;'>"+$('.fileName',"#"+params.attachmentId).html()+"</a>");
        $('.deleteBtn',$("#"+g.settings.divId).find("#"+params.attachmentId)).click(function(){
            if(confirm("您确实要删除附件:"+params.fileName)){
                $.ajax({ type:"post", url: g.settings.deleteUrl, data: {attachmentId:params["attachmentId"]},success: function(){
                    $("#"+ params.attachmentId).parent().remove();
                    g.fileCounts -= 1;
                },fail:function(){alert("文件被使用,删除失败")} });
            }
        });

        addFileArray = null;
        delete addFileArray;
    },
    showFileList:function(docId){
        var g = this;
        $('#'+g.getFileListId()).html("");
        var documentId = docId||g.settings.documentId||this.getDocId();
        if(documentId&&documentId!="0") {
            $.ajax({
                type:"post",
                url: g.settings.initUrl,
                data: {documentId:documentId},
                dataType: 'json',
                success: function(datas){
                    g.fileCounts = datas.length;
                    $('#'+g.getFileListId()).find('.clear').remove();
                    $.each(datas,function(index){
                        var params = {attachmentId:this.attachmentID,fileName:this.fileName,deleteUrl:g.settings.deleteUrl,downloadUrl:g.settings.downloadUrl,author:this.author,key:this.key,summary:this.summary,readOnly:this.readOnly};
                        g.createDocElement(params)
                    });
                    $('#'+g.getFileListId()).append("<div class='clear' style='clear: both;'></div>");
                },
                //error: function() {}// {alert("加载失败")}
                error:function(jqXHR, textStatus, errorThrown)
                {
                    jqXHR;
                    textStatus;
                    errorThrown;
                }
            });
        }

    },
    //设置附件上传控件是否只读
    setReadOnly:function(flag){
        var g = this;
        if(flag){
            $(".footer",$("#"+g.settings.divId)).hide();
        }else{
            $(".footer",$("#"+g.settings.divId)).show();
        }
        g.settings.readOnly = flag;
    },
    setFileReadOnly:function(flag){
        this.setReadOnly(flag);
        this.showFileList();
    },
    setDocId:function(docId){
        var g = this;
        if(docId==0||docId=="0"){
            docId = "";
        }
        g.settings.documentId = docId;
        $("#"+g.settings.inputDiv,$("#"+g.settings.divId)).val(docId);
        this.createUrl();
        this.showFileList();
    },
    getDocId:function(){
        var g = this;
        return  $("#"+g.settings.inputDiv,$("#"+g.settings.divId)).val();
    },
    reset:function(){
        this.setDocId("");
    }

};