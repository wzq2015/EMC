<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<link rel="stylesheet" type="text/css" href="EF/EFOrgTree.css" />
</head>
<body>
<h1>Organization Map sample</h1>
<hr/>
<div id="orgcontain">  
  <ul id="orgmap" class="solo">  
      <li><div id="orgtree" class="root section"><a class="org" href="#">宝信软件</a></div>  
          <ul>  
              <li><div id="orgtree"  class="first"><a class="org" href="#">HR</a></div></li>  
              <li><div id="orgtree"  class="section"><a class="org" href="#">解决方案事业本部</a></div>  
                      <ul>  
                          <li><div id="orgtree"  class="first"><a class="org" href="#">MES软件事业部</a></div></li>  
                          <li><div id="orgtree"  class="section"><a class="org" href="#">ERP软件事业部</a></div>  
                              <ul>  
                                  <li><div id="orgtree"  class="first"><a class="org" href="#">Group1</a></div></li>  
                                  <li><div  id="orgtree" class="last"><a class="org" href="#">Group2</a></div></li>  
                              </ul>      
                          </li>  
                          <li><div  id="orgtree" class="section"><a class="org" href="#">协同商务软件事业部</a></div>  
                              <ul>  
                                  <li><div  id="orgtree" class="first"><a class="org" href="#">Group1</a></div></li>  
                                  <li><div  id="orgtree" class="last"><a class="org" href="#">Group2</a></div></li>  
                              </ul>      
                          </li>  
                          <li><div  id="orgtree" class="last"><a class="org" href="#">商务智能软件事业部</a></div></li>  
                      </ul>  
              </li>  
              <li><div  id="orgtree" class="last"><a class="org" href="#">Administrator</a></div></li>  
          </ul>  
      </li>  
  </ul>  
</div>
</body>
</html>
