
function Util()
{
	this.getBrowserInstance = function ()
	{
		var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
       
		if(navigator.userAgent.indexOf("MSIE")>0) {  
	        return new MSIE();  
		}  

		if(is_chrome) {  
	        return new Chrome();  
		}  
	   
		if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
			if (!is_chrome)
			   return new Safari();  
		}   

		if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
			return new Firefox();  
		}  

		if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
			return new Camino();  
		}  
		if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
			return new Gecko();  
		}  

		return new MSIE();
	}
	
	this._previousSiblingOfNode = function(node)
	{
		if (navigator.appName == "Microsoft Internet Explorer")
			return node.previousSibling;
		else if(navigator.appName == "Netscape")
			return node.previousElementSibling;
		else 
			return node.previousSibling;;
	}

	this._nextSiblingOfNode = function(node)
	{
		if (navigator.appName == "Microsoft Internet Explorer")
			return node.nextSibling;
		else if(navigator.appName == "Netscape")
			return node.nextElementSibling;
		else 
			return node.nextSibling;
	}

	this.getSiblingofNode = function(node,sibling)
	{
		if(sibling=="previous")
			return this._previousSiblingOfNode(node);
		else if (sibling=="next")
			return this._nextSiblingOfNode(node);
	}

	this.changeNodeVisibleStatus = function(node)
	{
		if (navigator.appName == "Microsoft Internet Explorer")
		{
			if (node.style.display =="block" ||node.style.display =="" )
				node.style.display = "none";
			else
				node.style.display ="block";
		}
		else if(navigator.appName == "Netscape")
		{
			if(node.hidden == true)
				node.hidden = false;
			else
				node.hidden = true; 
		}
	}

	this.setNodeVisible  = function(node,visible)
	{
		if (navigator.appName == "Microsoft Internet Explorer")
		{
			if (visible)
				node.style.display = "block";
			else
				node.style.display ="none";
		}
		else if(navigator.appName == "Netscape")
		{
			if(visible)
				node.hidden = false;
			else
				node.hidden = true; 
		}
	}

	this.setNodeSilblingVisible = function(node,sibling,visible)
	{
		this.setNodeVisible(this.getSiblingofNode(node,sibling),visible);
	}
    this.getUUID = function ()
    {
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()      +S4());
    }
    
    this.ExtractNumber = function(value)
    {
        var n = parseInt(value);
    	
        return n == null || isNaN(n) ? 0 : n;
    }
    
 // this is simply a shortcut for the eyes and fingers
    this.$ = function(id)
    {
        return document.getElementById(id);
    }
}

function detectBrowser()
{
       var is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
       
	   var OsObject = "";  
	   if(navigator.userAgent.indexOf("MSIE")>0) {  
	        return "MSIE";  
	   }  
	   
	   if(is_chrome) {  
	        return "Chrome";  
	   }  
	   
	   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
		   if (!is_chrome)
			   return "Safari";  
	   }   

	   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
	        return "Firefox";  
	   }  

	   if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
	        return "Camino";  
	   }  
	   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
	        return "Gecko";  
	   }  
	   return Osobject;
}



MSIE = function()
{
	this.previousSiblingOfNode = function(node){ return node.previousElementSibling;}
	this.nextSiblingOfNode = function(node){ return node.nextElementSibling; }
	this.isNodeVisible = function(node) { return node.style.display =="block"}
	this.setNodeVisible = function(node,isVisible) { if(isVisible) node.style.display =="block"; else node.style.display =="none";  }
}

Chrome = function()
{
	this.previousSiblingOfNode = function(node){ return node.previousSibling;}
	this.nextSiblingOfNode = function(node){ return node.nextSibling}
	this.isNodeVisible = function(node) { return !node.hidden;}
	this.setNodeVisible = function(node) { if(isVisible) node.hidden= false;   else  node.hiddent= true;}
}

Safari = function()
{
	this.previousSiblingOfNode = function(node){ return node.previousSibling }
	this.nextSiblingOfNode = function(node){ return node.nextSibling}
	this.isNodeVisible = function(node) { return !node.hidden;}
	this.setNodeVisible = function(node) { if(isVisible) node.hidden= false;   else  node.hiddent= true;}
}


Firefox = function()
{
	this.previousSiblingOfNode = function(node){}
	this.nextSiblingOfNode = function(node){}
	this.isNodeVisible = function(node) {}
	this.setNodeVisible = function(node) {}
}


Camino = function()
{
	this.previousSiblingOfNode = function(node){}
	this.nextSiblingOfNode = function(node){}
	this.isNodeVisible = function(node) {}
	this.setNodeVisible = function(node) {}
}

Gecko = function()
{
	this.previousSiblingOfNode = function(node){}
	this.nextSiblingOfNode = function(node){}
	this.isNodeVisible = function(node) {}
	this.setNodeVisible = function(node) {}
}


