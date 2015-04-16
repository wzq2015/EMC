<!DOCTYPE html>
<%@ page contentType="text/html; charset=UTF-8"%>

<%@ taglib prefix="EF" uri="/WEB-INF/framework/tlds/EF-2.0.tld" %>
<%
	String actionUrl = request.getContextPath() + "/DispatchAction.do";
%>

<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; 
	charset=UTF-8" />
	<title>留言板</title>
	<script type="text/javascript" src="./EF/iplat-ui-2.0.js"></script>
	<script type="text/javascript" src="./EF/jquery.1.5.2.js"></script>
	<script type="text/javascript" src="./EC/MM/ECMM01.js"></script>
	<style type="text/css">
		*{
			font-family: Arial;
			color: #333333;
			font-size: 12px;
			margin: 0px;
			padding: 0px;
			list-style-type: none;
			text-decoration: none;
		}
		.right {
			float: left;
			position: relative;
		}
		.clear {
			clear: both;
		}
		#connect #suggest #zhixunjianyi .toggle1 {
			display: none;
			padding-top:0px;
			margin-top:-15px;
		}
		#suggest #connect_tab li {
			background-image: url(./EF/Images/suggest_tab_bg.jpg);
			background-repeat: no-repeat;
			background-position: left;
			height: 27px;
			width: 75px;
			float: left;
			margin-right: 2px;
			line-height: 30px;
			text-align: center;
			font-weight: bold;
		}
		#suggest #connect_tab #select {
			background-image: url(./EF/Images/suggest_tab_se.jpg);
			background-repeat: no-repeat;
			font-weight: bold;
			color: #FFF;
		}
		#connect #suggest #connect_tab {
			margin-left: 20px;
			margin-top: 15px;
		}
		#connect #suggest form {
			background-color: #f6f6f6;
			height: 380px;
			width: 643px;
			margin-left: 20px;
			border: 1px dashed #CCC;
		}
		#connect #suggest form table {
			color: #000;
			padding-left: 28px;
			padding-top: 20px;
		}
		#suggest form table tr td {
			line-height: 30px;
			height: 30px;
		}
		#suggest form table tr td .block {
			line-height: 20px;
			height: 20px;
			width: 200px;
			background-color: #f6f6f6;
			border-bottom-width: 1px;
			border-top-style: none;
			border-right-style: none;
			border-bottom-style: solid;
			border-left-style: none;
			border-bottom-color: #CCC;
		}
		#suggest form table tr td #textarea {
			height: 125px;
			width: 480px;
			background-color: #f6f6f6;
			margin-top: 10px;
			border: 1px solid #CCC;
			margin-bottom: 10px;
		}
		#suggest form table tr td #button2 {
			background-image: url(./EF/Images/connect_deliver.jpg);
			background-repeat: no-repeat;
			height: 29px;
			width: 87px;
			border-top-style: none;
			border-right-style: none;
			border-bottom-style: none;
			border-left-style: none;
			background-color: #FFF;
			color: #FFF;
		}
		#suggest #connect_tab #suggest_2 {
			background-image: url(./EF/Images/suggest_tab_bg.jpg);
			background-repeat: no-repeat;
		}
		#suggest #connect_tab #suggest_1 {
			background-image: url(./EF/Images/suggest_tab_se.jpg);
			background-repeat: no-repeat;
			font-weight: bold;
			color: #333333;
		}
		#suggest #connect_tab #suggest_3 {
			background-image: url(./EF/Images/suggest_tab_bg.jpg);
			background-repeat: no-repeat;
		}
		
		#suggest #connect_tab #suggest_4 {
			background-image: url(./EF/Images/suggest_tab_bg.jpg);
			background-repeat: no-repeat;
			display:block
		}
		#zhixunjianyi #connect_tab li{
			cursor:hand;
		}
		
	</style>
	<script>
		
	</script>
</head>
<body>
<div id="connect">
	<div class="right" id="suggest">
		<div id="zhixunjianyi">
			<ul id="connect_tab">
				<li id="suggest_1">
					留言
				</li>
				<li id="suggest_2">
					咨询
				</li>
				<li id="suggest_3">
					建议
				</li>
				<li id="suggest_4">
					投诉
				</li>		
			</ul>
			<div class="clear"></div>
			<div class="toggle1" style="display:block;" id="one">
				<form method="post" action="<%=actionUrl%>" style="padding-left:0px;" name="form1">
					<input type="hidden" name="msgType" id="msgType" value="01" />
					<table width="590" border="0" align="left">
						<tr>
							<td colspan="2">
								<table width="590" border="0" align="left"
									class="table_1_inc">
									<tr>
										<td width="55%" valign="middle">
											<span class="STYLE4">您的姓名:<span style="color:red;">*</span>
												<label for="userName"></label> <input name="userName"
													type="text" id="userName" style="width:75%"
													maxlength="10" class="block"
													onkeyup="value=value.replace(/\s+/g,'')"
													onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/\s+/g,''))" />
											</span>
										</td>
										<td width="45%" valign="middle">
											<span class="STYLE4">电话: </span><span class="STYLE4">
												<label for="phoneNo"></label> <input name="phoneNo"
													type="text" id="phoneNo" style="width:75%"
													maxlength="20" class="block"
													onkeyup="value=value.replace(/[^\d]/g,'')"
													onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />
											</span>
										</td>
									</tr>
									<tr>
										<td valign="middle">
											<span class="STYLE4">所在单位: <label for="workUnit"></label>
												<input name="workUnit" type="text" id="workUnit"
													style="width:75%" maxlength="20" class="block" /> </span>
										</td>
										<td valign="middle">
											<span class="STYLE4">职务: </span><span class="STYLE4">
												<label for="jobTitle"></label> <input name="jobTitle"
													type="text" id="jobTitle" style="width:75%"
													maxlength="20" class="block" /> </span>
										</td>
									</tr>
									<tr>
										<td colspan="2" valign="middle">
											<span class="STYLE4">电子信箱: </span>
											<label for="email"></label>
											<input name="email" type="text" id="email"
												style="width:85%" maxlength="50" class="block"
												onkeyup="value=value.replace(/\s+/g,'')"
												onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/\s+/g,''))" />
										</td>
									</tr>
									<tr>
										<td colspan="2">
											<span class="STYLE4">您的留言:<span style="color:red;">*</span>
											</span>
											<textarea name="message" rows="8" id="message" style="width:95%"></textarea>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td>
								<table height="100%">
									<tr>
										<td align="left" valign="top" height="100%">
											<span class="STYLE4">验证码:<span style="color:red;">*</span>
											</span>
											<input name="checkCode" type="text" id="checkCode"
												size="6" maxlength="4"
												onkeyup="value=value.replace(/[^\d]/g,'')"
												onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />
										</td>
										<td align="bottom">
											<img id="code" src="EC/MM/authCode.jsp" />
										</td>
									</tr>
								</table>
							</td>
							<td>
								<input type="button" id="button2"
									onclick="return checkForm(form1.msgType)" />
							</td>
						</tr>
					</table>
				</form>
			</div>
			<div class="toggle1" id="two">
			<form method="post" action="<%=actionUrl%>" style="padding-left:0px;"  name="form2">
					<input type="hidden" name="msgType" id="msgType" value="02" />
					<table width="590" border="0" align="left">
						<tr>
							<td colspan="2">
								<table width="590" border="0" align="left"
									class="table_1_inc">
									<tr>
										<td width="55%" valign="middle">
											<span class="STYLE4">您的姓名:<span style="color:red;">*</span>
												<label for="userName"></label> <input name="userName"
													type="text" id="userName" style="width:75%"
													maxlength="10" class="block"
													onkeyup="value=value.replace(/\s+/g,'')"
													onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/\s+/g,''))" />
											</span>
										</td>
										<td width="45%" valign="middle">
											<span class="STYLE4">电话: </span><span class="STYLE4">
												<label for="phoneNo"></label> <input name="phoneNo"
													type="text" id="phoneNo" style="width:75%"
													maxlength="20" class="block"
													onkeyup="value=value.replace(/[^\d]/g,'')"
													onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />
											</span>
										</td>
									</tr>
									<tr>
										<td valign="middle">
											<span class="STYLE4">所在单位: <label for="workUnit"></label>
												<input name="workUnit" type="text" id="workUnit"
													style="width:75%" maxlength="20" class="block" /> </span>
										</td>
										<td valign="middle">
											<span class="STYLE4">职务: </span><span class="STYLE4">
												<label for="jobTitle"></label> <input name="jobTitle"
													type="text" id="jobTitle" style="width:75%"
													maxlength="20" class="block" /> </span>
										</td>
									</tr>
									<tr>
										<td colspan="2" valign="middle">
											<span class="STYLE4">电子信箱: </span>
											<label for="email"></label>
											<input name="email" type="text" id="email"
												style="width:85%" maxlength="50" class="block"
												onkeyup="value=value.replace(/\s+/g,'')"
												onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/\s+/g,''))" />
										</td>
									</tr>
									<tr>
										<td colspan="2">
											<span class="STYLE4">您的咨询:<span style="color:red;">*</span>
											</span>
											<textarea name="message" rows="8" id="message" style="width:95%"></textarea>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td align="left" valign="center">
								<table>
									<tr>
										<td align="left">
											<span class="STYLE4">验证码:<span style="color:red;">*</span>
											</span>
											<input name="checkCode" type="text" id="checkCode"
												size="6" maxlength="4"
												onkeyup="value=value.replace(/[^\d]/g,'')"
												onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />
										</td>
										<td align="bottom">
											<img id="code" src="EC/MM/authCode.jsp" />
										</td>
									</tr>
								</table>
							</td>
							<td align="left" valign="center">
								<input type="button" id="button2"
									onclick="return checkForm(form2.msgType)" />
							</td>
						</tr>
					</table>
				</form>
			</div>
			<div class="toggle1" id="three">
			<form method="post" action="<%=actionUrl%>" style="padding-left:0px;" name="form3">
					<input type="hidden" name="msgType" id="msgType" value="03" />
					<table width="590" border="0" align="left">
						<tr>
							<td colspan="2">
								<table width="590" border="0" align="left"
									class="table_1_inc">
									<tr>
										<td width="55%" valign="middle">
											<span class="STYLE4">您的姓名:<span style="color:red;">*</span>
												<label for="userName"></label> <input name="userName"
													type="text" id="userName" style="width:75%"
													maxlength="10" class="block"
													onkeyup="value=value.replace(/\s+/g,'')"
													onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/\s+/g,''))" />
											</span>
										</td>
										<td width="45%" valign="middle">
											<span class="STYLE4">电话: </span><span class="STYLE4">
												<label for="phoneNo"></label> <input name="phoneNo"
													type="text" id="phoneNo" style="width:75%"
													maxlength="20" class="block"
													onkeyup="value=value.replace(/[^\d]/g,'')"
													onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />
											</span>
										</td>
									</tr>
									<tr>
										<td valign="middle">
											<span class="STYLE4">所在单位: <label for="workUnit"></label>
												<input name="workUnit" type="text" id="workUnit"
													style="width:75%" maxlength="20" class="block" /> </span>
										</td>
										<td valign="middle">
											<span class="STYLE4">职务: </span><span class="STYLE4">
												<label for="jobTitle"></label> <input name="jobTitle"
													type="text" id="jobTitle" style="width:75%"
													maxlength="20" class="block" /> </span>
										</td>
									</tr>
									<tr>
										<td colspan="2" valign="middle">
											<span class="STYLE4">电子信箱: </span>
											<label for="email"></label>
											<input name="email" type="text" id="email"
												style="width:85%" maxlength="50" class="block"
												onkeyup="value=value.replace(/\s+/g,'')"
												onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/\s+/g,''))" />
										</td>
									</tr>
									<tr>
										<td colspan="2">
											<span class="STYLE4">您的建议:<span style="color:red;">*</span>
											</span>
											<textarea name="message" rows="8" id="message" style="width:95%"></textarea>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td>
								<table>
									<tr>
										<td align="left">
											<span class="STYLE4">验证码:<span style="color:red;">*</span>
											</span>
											<input name="checkCode" type="text" id="checkCode"
												size="6" maxlength="4"
												onkeyup="value=value.replace(/[^\d]/g,'')"
												onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />
										</td>
										<td align="bottom">
											<img id="code" src="EC/MM/authCode.jsp" />
										</td>
									</tr>
								</table>
							</td>
							<td>
								<input type="button" id="button2"
									onclick="return checkForm(form3.msgType)" />
							</td>
						</tr>
					</table>
				</form>
			</div>
			<div class="toggle1" id="four">
			<form method="post" action="<%=actionUrl%>" style="padding-left:0px;" name="form4">
					<input type="hidden" name="msgType" id="msgType" value="04" />
					<table width="590" border="0" align="left">
						<tr>
							<td colspan="2">
								<table width="590" border="0" align="left"
									class="table_1_inc">
									<tr>
										<td width="55%" valign="middle">
											<span class="STYLE4">您的姓名:<span style="color:red;">*</span>
												<label for="userName"></label> <input name="userName"
													type="text" id="userName" style="width:75%"
													maxlength="10" class="block"
													onkeyup="value=value.replace(/\s+/g,'')"
													onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/\s+/g,''))" />
											</span>
										</td>
										<td width="45%" valign="middle">
											<span class="STYLE4">电话: </span><span class="STYLE4">
												<label for="phoneNo"></label> <input name="phoneNo"
													type="text" id="phoneNo" style="width:75%"
													maxlength="20" class="block"
													onkeyup="value=value.replace(/[^\d]/g,'')"
													onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />
											</span>
										</td>
									</tr>
									<tr>
										<td valign="middle">
											<span class="STYLE4">所在单位: <label for="workUnit"></label>
												<input name="workUnit" type="text" id="workUnit"
													style="width:75%" maxlength="20" class="block" /> </span>
										</td>
										<td valign="middle">
											<span class="STYLE4">职务: </span><span class="STYLE4">
												<label for="jobTitle"></label> <input name="jobTitle"
													type="text" id="jobTitle" style="width:75%"
													maxlength="20" class="block" /> </span>
										</td>
									</tr>
									<tr>
										<td colspan="2" valign="middle">
											<span class="STYLE4">电子信箱: </span>
											<label for="email"></label>
											<input name="email" type="text" id="email"
												style="width:85%" maxlength="50" class="block"
												onkeyup="value=value.replace(/\s+/g,'')"
												onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/\s+/g,''))" />
										</td>
									</tr>
									<tr>
										<td colspan="2">
											<span class="STYLE4">您的投诉:<span style="color:red;">*</span>
											</span>
											<textarea name="message" rows="8" id="message" style="width:95%"></textarea>
										</td>
									</tr>
								</table>
							</td>
						</tr>
						<tr>
							<td>
								<table>
									<tr>
										<td align="left">
											<span class="STYLE4">验证码:<span style="color:red;">*</span>
											</span>
											<input name="checkCode" type="text" id="checkCode"
												size="6" maxlength="4"
												onkeyup="value=value.replace(/[^\d]/g,'')"
												onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" />
										</td>
										<td align="bottom">
											<img id="code" src="EC/MM/authCode.jsp" />
										</td>
									</tr>
								</table>
							</td>
							<td>
								<input type="button" id="button2"
									onclick="return checkForm(form4.msgType)" />
							</td>
						</tr>
					</table>
				</form>
			</div>
		</div>
	</div>
	<div class="clear"></div>
</div>
</body>
</html>   
