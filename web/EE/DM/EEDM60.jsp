<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">

<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>
	</title>
	
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EE/DM/EEDM60.js"></script>
	
</head>
<body class="bodyBackground">

<form id="EEDM60" method="POST" action="<%=actionUrl%>" >

<jsp:include flush="false" page="../../EF/Form/iplat.ef.head.jsp"></jsp:include>
<link href="./EF/EFOrgTree.css" rel="stylesheet" type="text/css"/>			

<div id="orgcontain">  
  <ul id="orgmap" class="solo">  
      <li><div  id="orgtree" class="root section"><a class="org" href="#">宝信软件</a></div>  
          <ul>  
              <li><div  id="orgtree" class="first"><a class="org" href="#">HR</a></div></li>  
              <li><div  id="orgtree" class="section"><a class="org" href="#">解决方案事业本部</a></div>  
                      <ul>  
                          <li><div  id="orgtree" class="first section"><a class="org" href="#">MES软件事业部</a></div>
                              <ul>  
                                  <li><div  id="orgtree" class="first"><a class="org" href="#">Group1</a></div></li>  
                                  <li><div  id="orgtree" class="last"><a class="org" href="#">Group2</a></div></li>  
                              </ul>
						  </li>  	  
                          <li><div  id="orgtree" class="section"><a class="org" href="#">ERP软件事业部</a></div>  
                              <ul>  
                                  <li><div  id="orgtree" class="first"><a class="org" href="#">Group1</a></div></li>  
                                  <li><div  id="orgtree" class="last"><a class="org" href="#">Group2</a></div></li>  
                              </ul>      
                          </li>  
                          <li><div  id="orgtree" class="section"><a class="org" href="#">协同商务软件事业部</a></div>  
                              <ul>  
                                  <li><div  id="orgtree" class="first"><a class="org" href="#">Group1</a></div></li>  
                                  <li><div  id="orgtree" class="last"><a class="org" href="#">Group2</a></div></li>  
                              </ul>      
                          </li>  
                          <li><div  id="orgtree" class="last section"><a class="org" href="#">商务智能软件事业部</a></div> 
                              <ul>  
                                  <li><div  id="orgtree" class="first"><a class="org" href="#">Group1</a></div></li>  
                                  <li><div  id="orgtree" class="last"><a class="org" href="#">Group2</a></div></li>  
                              </ul>
						  </li>  	  
                      </ul>  
              </li>  
              <li><div  id="orgtree" class="last"><a class="org" href="#">Administrator</a></div></li>  
          </ul>  
      </li>  
  </ul>  
</div>
</form>

</body>
</html>   
