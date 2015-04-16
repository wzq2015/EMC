function $(ele)
{
   var t = document.getElementById(ele);
   if(t == null) t = document.getElementsByName(ele);
   if(t.length == 1) t = t.item(0);
   return t;
}

function escapeHTML(str)
{
   //code portion borrowed from prototype library
   var div = document.createElement('div');
   var text = document.createTextNode(str);
   div.appendChild(text);
   return div.innerHTML;
   //end portion
}

function wordwrap(str)
{
   parts = str.split(" ");
   for(i = 0; i < parts.length; i++)
   {
      if(parts[i].length <= 30) continue;

      t = parts[i].length;
      p = "";

      while(t > 30)
      {
          p += parts[i].substr(t - 30, t) + "<wbr />";
          t -= 30;
      }
      parts[i] = p;
   }
   return parts.join(" ");
}

var elementCount = 0;
var arrayCount = 0;
var objectCount = 0;
var nestingLevel = 0;


function parseValue(val, parent, level)
{
   elementCount++;
   if(parent == null) parent = "";
   if(level == null) level = 1;

   if(typeof(val) == "object")
   {
      if(val instanceof Array)
      {
         arrayCount++;
         parent = parent + (parent != "" ? " > " : "") + "Array (" + val.length + " item" + (val.length != 1 ? "s)" : ")");
			// remove div class='array' onmouseover='doFocus(event, this);'
         var out = "<div class='wrap'>\n<div class='array' >\n<div class='widgets'><img src='./framework/soa/render/json2html/min.gif' onclick='hideChild(this);' /></div>\n<h3><span class='titled' title='" + parent + "'>Array</span></h3>\n";

         if(val.length > 0)
         {
            out += "<table class='arraytable'>\n<tr><th>Index</th><th>Value</th></tr>\n";
            
            for(prop in val)
            {
               if(typeof(val[prop]) == "function") continue;
               out += "<tr><td>" + prop + "</td><td>" + parseValue(val[prop], parent, level) + "</td></tr>\n";
            }
            
            out += "</table>\n";
         }
         else
         {
            if(level > nestingLevel) nestingLevel = level;
            return "(empty <span class='titled' title='" + parent + "'>Array</span>)\n";
         }
         
         out += "</div>\n</div>\n";
         return out;
      }
      else
      {
         objectCount++;
         i = 0;
         for(prop in val)
         {
            if(typeof(val[prop]) != "function") i++;
         }

         parent = parent + (parent != "" ? " > " : "") + "Object (" + i + " item" + (i != 1 ? "s)" : ")");
			//remove class='object' onmouseover='doFocus(event, this);'
         var out = "<div class='wrap'>\n<div class='object' >\n<div class='widgets'><img src='./framework/soa/render/json2html/min.gif' onclick='hideChild(this);' /></div>\n<h3><span class='titled' title='" + parent + "'>Object</span></h3>\n";
         
         if(i > 0)
         {
            out += "<table class='objecttable'>\n<tr><th>Name</th><th>Value</th></tr>\n";
            for(prop in val)
            {
               if(typeof(val[prop]) == "function") continue;
               out += "<tr><td>" + prop + "</td><td>" + parseValue(val[prop], parent, level) + "</td></tr>\n";
            }
            
            out += "</table><div class='clear'></div>\n";
         }
         else
         {
            if(level > nestingLevel) nestingLevel = level;
            return "(empty <span class='titled' title='" + parent + "'>Object</span>)\n";
         }
         
         out += "</div>\n</div>\n";
         return out;
      }
   }
   else
   {
      if(level > nestingLevel) nestingLevel = level;

      if(typeof(val) == "string") return "<span class='string'>" + wordwrap(val.replace(/\n/g, "<br />")) + "</span>";
      else if(typeof(val) == "number") return "<span class='number'>" + val + "</span>";
      else if(typeof(val) == "boolean") return "<span class='boolean'>" + val + "</span>";
      else return "<span class='void'>(null)</span>";
   }
}

function parse(str)
{
   elementCount = 0;
   arrayCount = 0;
   objectCount = 0;

   var obj = null;
   try
   {
      obj = str.parseJSON();
   }
   catch(e)
   {
      if(e instanceof SyntaxError)
      {
         alert("There was a syntax error in your JSON string.\nPlease check your syntax and try again.");
         return;
      }

      alert("There was an unknown error. Perhaps the JSON string contained a deep level of nesting.");
      return;
   }

   return parseValue(obj, null, null);
}

function doParse2()
{
   var result = parse(escapeHTML($("text").value), null);
   if(result != null) $("output").innerHTML = result;
}



function hideChild(ele)
{
   var src = ele.src + "";
   var minimizing = (src.indexOf("min.gif") != -1);

   var nodes = ele.parentNode.parentNode.childNodes;
   for(i = 0; i < nodes.length; i++)
   {
      if(nodes[i].tagName == "TABLE")
      {
         nodes[i].style.display = (minimizing ? "none" : "");

         ele.parentNode.parentNode.style.paddingRight = (minimizing ? "2.0em" : "1.5em");
         ele.parentNode.style.right = (minimizing ? "1em" : "1.5em");

         ele.src = (minimizing ? "./framework/soa/render/json2html/max.gif" : "./framework/soa/render/json2html/min.gif");

         return;
      }
   }
}
