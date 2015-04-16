<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=GB18030"
    pageEncoding="GB18030"%>
<%@page import="org.springframework.web.context.WebApplicationContext,
   org.springframework.web.context.support.WebApplicationContextUtils,com.baosight.dexpt.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">
<title>Insert title here</title>
</head>
<body>
<form action="sender2.jsp" method="post">
	msg code:<input type="text" name="code"/> msg body:<input type="text" name="msg"/>
	<input type="submit" value="�ύ"/>
</form>
<hr/>
<%

String msgBody=null;
String msgCode=null;
msgBody=request.getParameter("msg");
msgCode=request.getParameter("code");
if("".equalsIgnoreCase(msgBody)){
	msgBody=null;
}
if("".equalsIgnoreCase(msgCode)){
	msgCode=null;
}


WebApplicationContext ctx=null;
try{

	if(msgBody!=null){
		ctx = WebApplicationContextUtils.getWebApplicationContext(application); 
		Dexpt sf=(Dexpt)ctx.getBean("leiDexpt");
		//create message
		SendMessage msg=new SendMessage();
		msg.setCode(msgCode);
		msg.setBody(msgBody);
		//create Session
		SendSession sess=sf.openSession();
		out.println("to send message: "+msg+"<br/>");
		// send message
		SendResult re=sess.send(msg);
		// close session
		sess.close();
		out.println(re);
	}
}
catch(Throwable th){
	th.printStackTrace();
	out.println(th.getMessage());
}
%>
</body>
</html>
