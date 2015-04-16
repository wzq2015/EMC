var progressType = {
    isColumn:true,
    isRow:false
};

function TableProgress(file, target) {
    this.fileProgressID = file.id;
    this.opacity = 100;
    this.height = 0;
    this.target = target;
    this.fileProgressWrapper = document.getElementById(this.fileProgressID);
    if (!this.fileProgressWrapper) {
        this.fileProgressWrapper = document.createElement("tr");
        this.fileProgressWrapper.id = this.fileProgressID;
        this.fileProgressWrapper.style.height = "25px";

        this.fileProgressElement = document.createElement("div");
        this.fileProgressElement.className = "progressContainer";

        var progressCancel = document.createElement("a");
        progressCancel.className = "progressCancel";
        progressCancel.href = "#";
        progressCancel.style.visibility = "hidden";
        progressCancel.appendChild(document.createTextNode(" "));

        var progressText = document.createElement("div");
        progressText.className = "progressName";
        progressText.appendChild(document.createTextNode(file.name));


        var progressBar = document.createElement("div");
        progressBar.className = "progressBarInProgress";

        var progressStatus = document.createElement("div");
        progressStatus.className = "progressBarStatus";
        progressStatus.innerHTML = "&nbsp;";

        this.fileProgressElement.appendChild(progressCancel);
        this.fileProgressElement.appendChild(progressText);
        this.fileProgressElement.appendChild(progressStatus);
        this.fileProgressElement.appendChild(progressBar);

        var div = $('<div style="width:'+target.settings.width*0.25+'px; text-align: left;" class="datagrid-cell"/>');
        var td = $("<td/>");

        div.append($(this.fileProgressElement));
        td.append(div);

        $(this.fileProgressWrapper).append(td);
        //        this.fileProgressWrapper.appendChild(td.get(0));
        this.addTds(this.fileProgressWrapper);
        target.ui.addProgress(this.fileProgressWrapper);

    } else {
        this.fileProgressElement = $(this.fileProgressWrapper).find(".datagrid-cell").get(0).firstChild;
        this.reset();
    }

    this.height = this.fileProgressWrapper.offsetHeight;
    this.setTimer(null);

}

TableProgress.prototype.setTimer = function (timer) {
    this.fileProgressElement["FP_TIMER"] = timer;
};
TableProgress.prototype.getTimer = function (timer) {
    return this.fileProgressElement["FP_TIMER"] || null;
};

TableProgress.prototype.reset = function () {
    this.fileProgressElement.className = "progressContainer";

    this.fileProgressElement.childNodes[2].innerHTML = "&nbsp;";
    this.fileProgressElement.childNodes[2].className = "progressBarStatus";

    this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
    this.fileProgressElement.childNodes[3].style.width = "0%";

    this.appear();
};

TableProgress.prototype.setProgress = function (percentage) {
    this.fileProgressElement.className = "progressContainer green";
    this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
    this.fileProgressElement.childNodes[3].style.width = percentage + "%";

    this.appear();
};
TableProgress.prototype.setComplete = function (value,deleteUrl,downloadUrl,callBack) {
    var target = this.target;
    var parentNode = this.fileProgressElement.parentNode;
    var fileName = this.fileProgressElement.childNodes[1].innerHTML;
    if(value!=null){
        var settings = {attachmentId:value,fileName:fileName,deleteUrl:deleteUrl,downloadUrl:downloadUrl};
        parentNode.replaceChild(callBack.call(this,settings),this.fileProgressElement);
        var del = $("<a style='text-decoration:underline;cursor:hand;'>删除</a>");
        var wrap = this.fileProgressWrapper;
        del.click(function(){
            $.ajax({ type:"post", url: deleteUrl, data: {attachmentId:value},success: function(){
                $(wrap).remove();
                target.settings.height = target.settings.height - 26;
                target.ui.reSize();
            } });
        });
        $(this.fileProgressWrapper).find("td:last").children().append(del);
    }
};
TableProgress.prototype.setError = function () {
    this.fileProgressElement.className = "progressContainer red";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";

    var oSelf = this;
    this.setTimer(setTimeout(function () {
        oSelf.disappear();
    }, 5000));
};
TableProgress.prototype.setCancelled = function () {
    this.fileProgressElement.className = "progressContainer";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";

    var oSelf = this;
    this.setTimer(setTimeout(function () {
        oSelf.disappear();
    }, 2000));
};
TableProgress.prototype.setStatus = function (status) {
    this.fileProgressElement.childNodes[2].innerHTML = status;
};

// Show/Hide the cancel button
TableProgress.prototype.toggleCancel = function (show, swfUploadInstance) {
    this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
    if (swfUploadInstance) {
        var fileID = this.fileProgressID;
        this.fileProgressElement.childNodes[0].onclick = function () {
            swfUploadInstance.cancelUpload(fileID);
            return false;
        };
    }
};

TableProgress.prototype.appear = function () {
    if (this.getTimer() !== null) {
        clearTimeout(this.getTimer());
        this.setTimer(null);
    }

    if (this.fileProgressWrapper.filters) {
        try {
            this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 100;
        } catch (e) {
            // If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
            this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100)";
        }
    } else {
        this.fileProgressWrapper.style.opacity = 1;
    }

    this.fileProgressWrapper.style.height = "";

    this.height = this.fileProgressWrapper.offsetHeight;
    this.opacity = 100;
    this.fileProgressWrapper.style.display = "";

};

// Fades out and clips away the FileProgress box.
TableProgress.prototype.disappear = function () {

    var reduceOpacityBy = 15;
    var reduceHeightBy = 4;
    var rate = 30;	// 15 fps

    if (this.opacity > 0) {
        this.opacity -= reduceOpacityBy;
        if (this.opacity < 0) {
            this.opacity = 0;
        }

        if (this.fileProgressWrapper.filters) {
            try {
                this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity;
            } catch (e) {
                // If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
                this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")";
            }
        } else {
            this.fileProgressWrapper.style.opacity = this.opacity / 100;
        }
    }

    if (this.height > 0) {
        this.height -= reduceHeightBy;
        if (this.height < 0) {
            this.height = 0;
        }

        this.fileProgressWrapper.style.height = this.height + "px";
    }

    if (this.height > 0 || this.opacity > 0) {
        var oSelf = this;
        this.setTimer(setTimeout(function () {
            oSelf.disappear();
        }, rate));
    } else {
        this.fileProgressWrapper.style.display = "none";
        this.setTimer(null);
    }
};

TableProgress.prototype.addTds = function(tr){
    var tds = $(['<td>',
        '<div style=" text-align:left;" class="datagrid-cell"><input type="text" field="key"></div>',
        '</td>','<td>',
        '<div style=" text-align:left;" class="datagrid-cell"><textarea field="summary" wrap="on" cols="30" rows="2"></textarea></div>',
        '</td>','<td>',
        '<div style=" text-align:left;" class="datagrid-cell"><input type="text" field="author"></div>',
        '</td>','<td>',
        '<div style=" text-align:left;" class="datagrid-cell"><input type="checkbox" field="isRead"></div>',
        '</td>','<td>',
        '<div style=" text-align:left;" class="datagrid-cell"><a></a></div>',
        '</td>'
    ].join(""));
    $(tr).append(tds);
}


function ColumnProgress(file, target) {
    this.fileProgressID = file.id;
    this.opacity = 100;
    this.height = 0;
    this.target = target;
    this.tdCount = 4;
    this.fileWrap = document.getElementById(this.fileProgressID);
    var trs = $("tr",$(target.ui.dataTable));
    var tds ;
    if(trs.length>0){
        tds=  $(trs[trs.length-1]).find("td");
    }
    if(trs.length>0&&(tds.length>1)&&!tds[tds.length-1].id){
        this.fileProgressWrapper = trs[trs.length-1];
    }else{
        this.fileProgressWrapper =   document.createElement("tr");
        this.fileProgressWrapper.style.height = "25px";
    }

    if(!this.fileWrap){
        if(1){
            tds = $(this.fileProgressWrapper).find("td");
            if(tds.length<(this.tdCount)){

                var td = $("<td/>");
                if(tds.length>1&&!tds[tds.length-1].id) {
                    td = $(tds[tds.length-1]);
                }
                this.createProgressElement(td,target,file);

                var secondTd = $("<td></td>");
                secondTd.attr("colspan",this.tdCount-tds.length);
                $(this.fileProgressWrapper).append(secondTd);

                target.ui.addProgress(this.fileProgressWrapper);
            }else if(tds.length ==(this.tdCount)&&!tds[tds.length-1].id) {
                var td = $(tds[tds.length-1]);
                this.createProgressElement(td,target,file);
                target.ui.addProgress(this.fileProgressWrapper);

            }

        }
    }else{
        this.fileProgressElement = $(this.fileWrap).find(".datagrid-cell").get(0).firstChild;
        this.reset();
    }


    this.height = this.fileProgressWrapper.offsetHeight;
    this.setTimer(null);

}

ColumnProgress.prototype.createProgressElement = function(td,target,file){
    this.fileProgressElement = document.createElement("div");
    this.fileProgressElement.className = "progressContainer";
//                this.fileProgressElement.id =  this.fileProgressID;

    var progressCancel = document.createElement("a");
    progressCancel.className = "progressCancel";
    progressCancel.href = "#";
    progressCancel.style.visibility = "hidden";
    progressCancel.appendChild(document.createTextNode(" "));

    var progressText = document.createElement("div");
    progressText.className = "progressName";
    progressText.appendChild(document.createTextNode(file.name));


    var progressBar = document.createElement("div");
    progressBar.className = "progressBarInProgress";

    var progressStatus = document.createElement("div");
    progressStatus.className = "progressBarStatus";
    progressStatus.innerHTML = "&nbsp;";

    this.fileProgressElement.appendChild(progressCancel);
    this.fileProgressElement.appendChild(progressText);
    this.fileProgressElement.appendChild(progressStatus);
    this.fileProgressElement.appendChild(progressBar);

    var div = $('<div style="width:'+(parseInt(target.settings.width)*(1/this.count)+"%")+'px; text-align: left;" class="datagrid-cell"/>');
    td.attr("id",this.fileProgressID);
    td.width("25%");
    td.attr("colspan",1);
    div.append($(this.fileProgressElement));
    td.append(div);

    $(this.fileProgressWrapper).append(td);
};

ColumnProgress.prototype.setTimer = function (timer) {
    this.fileProgressElement["FP_TIMER"] = timer;
};
ColumnProgress.prototype.getTimer = function (timer) {
    return this.fileProgressElement["FP_TIMER"] || null;
};

ColumnProgress.prototype.reset = function () {
    this.fileProgressElement.className = "progressContainer";

    this.fileProgressElement.childNodes[2].innerHTML = "&nbsp;";
    this.fileProgressElement.childNodes[2].className = "progressBarStatus";

    this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
    this.fileProgressElement.childNodes[3].style.width = "0%";

    this.appear();
};

ColumnProgress.prototype.setProgress = function (percentage) {
    this.fileProgressElement.className = "progressContainer green";
    this.fileProgressElement.childNodes[3].className = "progressBarInProgress";
    this.fileProgressElement.childNodes[3].style.width = percentage + "%";

    this.appear();
};
ColumnProgress.prototype.setComplete = function (value,deleteUrl,downloadUrl,callBack,docId) {
    var target = this.target;
    var parentNode = this.fileProgressElement.parentNode;
    var fileName = this.fileProgressElement.childNodes[1].innerHTML;
    if(value!=null){
        var settings = {attachmentId:value,fileName:fileName,deleteUrl:deleteUrl,downloadUrl:downloadUrl,width:$(parentNode).width()};
        parentNode.replaceChild(callBack.call(this,settings),this.fileProgressElement);
        var del = $("<a style='text-decoration:underline;cursor:hand;color: red;float: right;' class='deleteBtn'></a>");
        var wrap = this.fileProgressWrapper;

        del.click(function(){
            if(confirm("您确实要删除附件:"+fileName)){
                $.ajax({ type:"post", url: deleteUrl, data: {attachmentId:value},success: function(){
                    target.settings.documentId = docId;
                    target.ui.deleteRows();
                    target.ui.initRows();
                    target.ui.reSize();
                }
                });
            }

        });
        $(this.fileWrap).find("div:last").append(del);
    }
};
ColumnProgress.prototype.setError = function () {
    this.fileProgressElement.className = "progressContainer red";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";

    var oSelf = this;
    this.setTimer(setTimeout(function () {
        oSelf.disappear();
    }, 5000));
};

ColumnProgress.prototype.setCancelled = function () {
    this.fileProgressElement.className = "progressContainer";
    this.fileProgressElement.childNodes[3].className = "progressBarError";
    this.fileProgressElement.childNodes[3].style.width = "";

    var oSelf = this;
    this.setTimer(setTimeout(function () {
        oSelf.disappear();
    }, 2000));
};
TableProgress.prototype.setStatus = function (status) {
    this.fileProgressElement.childNodes[2].innerHTML = status;
};

// Show/Hide the cancel button
ColumnProgress.prototype.toggleCancel = function (show, swfUploadInstance) {
    this.fileProgressElement.childNodes[0].style.visibility = show ? "visible" : "hidden";
    if (swfUploadInstance) {
        var fileID = this.fileProgressID;
        this.fileProgressElement.childNodes[0].onclick = function () {
            swfUploadInstance.cancelUpload(fileID);
            return false;
        };
    }
};

ColumnProgress.prototype.appear = function () {
    if (this.getTimer() !== null) {
        clearTimeout(this.getTimer());
        this.setTimer(null);
    }

//    if (this.fileProgressWrapper.filters) {
//        try {
//            this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = 100;
//        } catch (e) {
//            // If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
//            this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=100)";
//        }
//    } else {
    this.fileProgressWrapper.style.opacity = 1;
//    }

    this.fileProgressWrapper.style.height = "";

    this.height = this.fileProgressWrapper.offsetHeight;
    this.opacity = 100;
    this.fileProgressWrapper.style.display = "";

};

// Fades out and clips away the FileProgress box.
ColumnProgress.prototype.disappear = function () {

    var reduceOpacityBy = 15;
    var reduceHeightBy = 4;
    var rate = 30;	// 15 fps

    if (this.opacity > 0) {
        this.opacity -= reduceOpacityBy;
        if (this.opacity < 0) {
            this.opacity = 0;
        }

        if (this.fileProgressWrapper.filters) {
            try {
                this.fileProgressWrapper.filters.item("DXImageTransform.Microsoft.Alpha").opacity = this.opacity;
            } catch (e) {
                // If it is not set initially, the browser will throw an error.  This will set it if it is not set yet.
                this.fileProgressWrapper.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" + this.opacity + ")";
            }
        } else {
            this.fileProgressWrapper.style.opacity = this.opacity / 100;
        }
    }

    if (this.height > 0) {
        this.height -= reduceHeightBy;
        if (this.height < 0) {
            this.height = 0;
        }

        this.fileProgressWrapper.style.height = this.height + "px";
    }

    if (this.height > 0 || this.opacity > 0) {
        var oSelf = this;
        this.setTimer(setTimeout(function () {
            oSelf.disappear();
        }, rate));
    } else {
        this.fileProgressWrapper.style.display = "none";
        this.setTimer(null);
    }
}

function strlen(str)
{
    var strlength=0;
    for (var i=0;i<str.length;i++)
    {
        if (isChinese(str.charAt(i)))
            strlength=strlength + 2;
        else
            strlength=strlength + 1;
    }
    return strlength;
}

function getDataBtLength(str,length){
    var strArr = new Array();
    var strlength = 0;
    for (var i=0;i<str.length;i++)
    {
        if (isChinese(str.charAt(i)))
            strlength=strlength + 2;
        else
            strlength=strlength + 1;
        if(strlength<length){
            strArr.push((str.charAt(i)));
        }
    }
    return strArr.join("");
}

function isChinese(str)

{
    var lst = /[u00-uFF]/;
    return !lst.test(str);
}

function createTableTr(settings){
    //创建
    var downloadDiv = document.createElement("a");
    downloadDiv.href = settings.downloadUrl + "?attachmentId="+settings.attachmentId;
    downloadDiv.innerHTML= settings.fileName;

    if(settings.width){
        var maxLen = Math.round((settings.width-30)/6);
        if(maxLen<strlen(settings.fileName)){
            downloadDiv.innerHTML = getDataBtLength(settings.fileName,maxLen)+"...";
        }
    }
    downloadDiv.className = "fileLoad";
    downloadDiv.id = "attachmentId_"+settings.attachmentId;

    return downloadDiv;
}




