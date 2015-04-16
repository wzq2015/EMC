(function($){
    var  gridContainer= {};
    $.fn.getUploadGrid = function(){
        if(gridContainer.uploadGrid){
            return gridContainer.uploadGrid;
        }
        return null;
    };

    $.fn.uploadGrid = function(settings){
        settings = $.extend({
            height: 20, //default height
            width:'100%', //default width
            scollbar:parseInt($(".fileUpload").attr("height")), // default height Of scollbar
            minwidth: 30, //min width of columns
            minheight: 80, //min height of columns
            readOnly:false,
            resizable: true, //resizable table
            url: false, //ajax url
            method: 'POST', // data sending method
            dataType: 'json', // type of data loaded
            errormsg: 'Connection Error',
            title: '附件列表',
            params:{}
        }, settings);
        this.settings = settings;

        var grid = this;
        var ui = {
            i:0,
            init:function(){
                $(ui.header).addClass("panel-header");
                $(ui.title).addClass("panel-title").html('<span id="'+settings.placeHolderId+'">文件上传</span>'+
                    '<input id="'+settings.cancelId+'" type="button" value="取消上传" onclick="cancelQueue(upload1);" disabled="disabled" style="margin-left:2px;border-right:1px solid;border-left:1px solid;border-color:#888;overflow:hidden;padding:1px 6px -2px 6px;" class="buttonRegular"/> ');
                var save = $('<input id="'+settings.saveId+'" type="button" value="保存"  style="border-right:1px solid;border-left:1px solid;border-color:#888;overflow:hidden;padding:1px 6px -2px 6px;"   class="buttonRegular"/> ');

                if(!progressType.isColumn){
                    $(ui.title).append(save);
                }
                save.click(function(){ui.save();});
                $(ui.header).append($(ui.title));
                $(grid).append($(ui.header));
                $(grid).append($( '<input type="hidden" id="upload_code"><input type="hidden" name="'+settings.cellName+'" id="'+settings.cellName+'">'));
                $(ui.body).addClass("layout-body panel-body").append($(ui.gridWraper).addClass("datagrid-view"));
                $(ui.gridWraper).append($(ui.gridView));
                $(ui.datagrid).addClass("datagrid-body").append($(ui.dataTable).attr("border",0).attr("cellpadding",0).attr("cellspacing",0));
                $(grid).append($(ui.body));
                $(ui.gridView).append($(ui.datagrid));
                if(!progressType.isColumn){
                    this.createHeader([{name:"文件名",width:"25%"},{name:"关键字",width:"20%"},{name:"摘要",width:"20%"},{name:"作者",width:"20%"},{name:"是否只读",width:""},{name:"操作",width:"100px"}] );
                }
            },

            createHeader:function(datas){
                var tr = $("<tr/>");
                $(datas).each(function(index){
                    var td = $(['<th class="" field="displayName">',
                        '<div style="width:100%; text-align: left; cursor: default;" class="datagrid-cell">',
                        '<span>'+datas[index].name+'</span>',
                        '<span class="datagrid-sort-icon">&nbsp;</span>',
                        '</div> </th>'].join(""));
                    tr.append(td);
                });
                $(ui.dataTable).append(tr);
            },
            reSize:function(){
                $(ui.header).attr("style","width:'100%'");
                $(ui.body).attr("style","width:'100%';height:"+(grid.settings.scollbar+30)+"px;");
                $(ui.gridWraper).attr("style","width:'100%';height:"+(grid.settings.scollbar+8)+"px;");
                $(ui.gridView).attr("style","width:'100%';left:0px");
                $(ui.datagrid).attr("style","width:'100%';height:"+(grid.settings.scollbar)+"px;");
            },
            appendTo:function(body){
                $(body).append($(ui.header));
            },

            addRow:function(datas){
                $(ui.dataTable).append(this.createRow(datas));
            },

            createRow:function(datas){
                var tr = $("<tr/>").attr("style","height: 25px;");
                $(datas).each(function(index){
                    var td = $(['<td>',
                        '<div style="width:'+datas[index].width+'; text-align: left;" class="datagrid-cell ">'+datas[index].name+'</div>',
                        '</td>'].join(""));
                    tr.append(td);
                });
                return tr;
            },

            addProgress:function(progress){
                $(ui.dataTable).append($(progress));
                grid.settings.height =  grid.settings.height + 29;
                this.reSize();
            },

            save:function(){
                var trs = $(ui.dataTable).find("tr");
                var datas = [];
                $(trs).each(function(index){
                    var documentId = $(this).find("td:first").find("a").attr("id");
                    var data = [];
                    if(documentId){
                        data.push(documentId.split("_")[1]);
                        data.push($(this).find("td:eq(1)").find("input").attr("value"));
                        var summary = $(this).find("td:eq(2)").find("textarea").val().replace(/\n/g,"<br/>");
                        data.push(summary);
                        data.push($(this).find("td:eq(3)").find("input").attr("value"));
                        data.push( $(this).find("td:eq(4)").find("input").attr("checked"));
                        datas.push(data.join(","));
                    }
                });
                $.ajax({
                    type:"post",
                    url: settings.saveUrl,
                    data: {datas:datas.join("|")},
                    dataType: 'json',
                    success: function(d){
                        alert("保存成功");
                    },
                    error: function() {alert("加载失败")}
                })
            },
            setReadOnly:function(flag){
                if(flag){
                    $(ui.title).css("display","none");
                }else{
                    $(ui.title).css("display","block");
                }
                settings.readOnly = flag;
                ui.initRows();
            },
            createColumnRows:function(params,dataLength){
                var tr =$("<tr/>");
                tr.height(25);
                var trs = $("tr",$(ui.dataTable));
                var tds ;
                if(trs.length>0){
                    tds=  $(trs[trs.length-1]).find("td");
                }
                if(trs.length>0&&(tds.length<4)){
                    tr =$(trs[trs.length-1]);
                }

                var attachmentId = params.attachmentId;
                params.width = Math.round($(ui.dataTable).width()/4);
                var td =$("<td/>").append($('<div style=" height:0px;text-align:left" class="datagrid-cell"/>')).append(createTableTr(params));
                td.width("25%");
                td.attr("id","upload_"+this.i++);
                var del = $("<a style='text-decoration:underline;cursor:hand;float: right;' class='deleteBtn'></a>");
                del.click(function(){
                    if(confirm("您确实要删除附件:"+params.fileName)){
                        $.ajax({ type:"post", url: grid.settings.deleteUrl, data: {attachmentId:attachmentId},success: function(){
                            ui.deleteRows();
                            ui.initRows();
                            ui.reSize();
                        } });
                    }
                });
                if(!settings.readOnly){
                    td.append(del);
                }
                tr.append(td);
                tds=  tr.find("td");
                if(tds.length<4&&($("td",$(ui.dataTable)).length)==dataLength){
                    var secondTd =  $("<td/>");
                    secondTd.attr("colspan",(dataLength-(trs.length-1)*4));
                    tr.append(secondTd);
                } else if($("td",$(ui.dataTable)).length==4*trs.length&&($("td",$(ui.dataTable)).length+1)==dataLength&&tds.length==1){
                    var secondTd =  $("<td/>");
                    secondTd.attr("colspan",3);
                    tr.append(secondTd);
                }
                return tr;
            },
            createRows:function(params){
                var attachmentId = params.attachmentId;
                var tr = $("<tr/>").attr("style","height: 25px;");
                var td =$("<td/>").append($('<div style=" height:0px;text-align:left" class="datagrid-cell"/>')).append(createTableTr(params));  //huangl

                tr.append($(td));
                var summary = params.summary.split('<br/>').join('\r\n');
                var tds = $(['<td width=20%>',
                    '<div style=" text-align:left" class="datagrid-cell"><input type="text" field="key" value="'+params.key+'"></div>',//<textarea field="summary">'+params.summary+'</textarea>
                    '</td>','<td  width=20%>',
                    '<div style=" text-align:left" class="datagrid-cell"><textarea field="summary" wrap="on" cols="30" rows="2">'+summary+'</textarea></div>',
                    '</td>','<td  width=20%>',
                    '<div style=" text-align:left" class="datagrid-cell"><input type="text" field="author" value="'+params.author+'"></div>',
                    '</td>','<td  width=>',
                    '<div style=" text-align:left" class="datagrid-cell"><input type="checkbox" field="isRead"' +(params.readOnly==1?"checked":"")+'></div>',
                    '</td>','<td  width="100px">',
                    '<div style=" text-align:left" class="datagrid-cell"><a></a></div>',
                    '</td>'
                ].join(""));
                tr.append(tds);
                var del = $("<a style='text-decoration:underline;cursor:hand;'>删除</a>");
                del.click(function(){
                    $.ajax({ type:"post", url: grid.settings.deleteUrl, data: {attachmentId:attachmentId},success: function(){
                        tr.remove();
                        grid.settings.height = grid.settings.height - 29;
                        ui.reSize();
                    } });
                });
                if(!settings.readOnly){
                    tr.find("td:last").children().append(del);
                }
                return tr;
            },
            deleteRows:function(){
                $("tr",$(this.dataTable)).remove();
            },
            initRows:function(){
                if(grid.settings.documentId&&grid.settings.documentId!="0"){
                    $.ajax({
                        type:"post",
                        url: grid.settings.initUrl,
                        data: {documentId:grid.settings.documentId},
                        dataType: 'json',
                        success: function(datas){
                            if(progressType.isColumn){
                                $(".datagrid-body table tr").remove();
                            }else{
                                $(".datagrid-body table tr:gt(0)").remove();
                            }
                            $.each(datas,function(index){
                                var params = {attachmentId:this.attachmentID,fileName:this.fileName,deleteUrl:grid.settings.deleteUrl,downloadUrl:grid.settings.downloadUrl,author:this.author,key:this.key,summary:this.summary,readOnly:this.readOnly};
                                if(progressType.isColumn){
                                    ui.addProgress(ui.createColumnRows(params,datas.length));
                                }else{
                                    ui.addProgress(ui.createRows(params));
                                }

                            });
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
            }
        };
        $.fn.setDocumentId= function(id){
            if(typeof(id) == "undefined" || id.length == 0 || id == null||id == 0){
                $(".datagrid-body table tr").remove();
                $(".fileUpload").attr("documentId","");
                settings.documentId = "";
                //alert("目录ID[DocumentId]不存在！");
                return;
            }
            settings.documentId = id;
            $(".fileUpload").attr("documentId",id);
            //ef.get("inqu_status-0-documentId").value = id;
            $.fn.setDocId(id);
            ui.reSize();
            ui.initRows();
        };
        //init divs
        ui.header = document.createElement('div'); //create global container
        ui.title = document.createElement('div'); //create title container
        ui.body = document.createElement('div'); //create title container
        ui.gridWraper = document.createElement('div'); //create title container
        ui.gridView = document.createElement('div');
        ui.gridHeader = document.createElement('div');
        ui.gridInner = document.createElement('div');
        ui.gridTable = document.createElement('table');
        ui.datagrid = document.createElement('div');
        ui.dataTable = document.createElement('table');

        ui.init();
        ui.reSize();
        ui.initRows();

        this.ui = ui;

        if(settings.readOnly){
            this.ui.setReadOnly(true);
        }
        gridContainer.uploadGrid = this;
        return this;
    }
})(jQuery)