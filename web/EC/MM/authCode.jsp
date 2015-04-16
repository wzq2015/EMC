<!DOCTYPE html>
<%@page import="com.baosight.iplat4j.core.threadlocal.UserSession"%>
<%@ page contentType="image/jpeg" import="java.awt.Color,java.awt.Graphics,java.awt.Font,java.awt.image.BufferedImage,java.util.Random,javax.imageio.ImageIO"%>

<%!
	//产生随机颜色
	Color getRandColor(int cc, int bb) {
		Random random = new Random();
		if (cc > 255) {
			cc = 255;
		}
		if (bb > 255) {
			bb = 255;
		}
		int r = cc + random.nextInt(bb - cc);
		int g = cc + random.nextInt(bb - cc);
		int b = cc + random.nextInt(bb - cc);
		return new Color(r, g, b);
	}
%>

<%
	UserSession.web2Service(request);
	response.setHeader("Pragma", "No-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setDateHeader("Expires", 0);
	int width = 60; //定义验证码图片的长度
	int height = 19; //定义验证码图片的宽度
	//RGB偏移量，值越小，字迹越明显
	int addInt = 20;
	int areaInt = 80;
	BufferedImage image = new BufferedImage(width, height,BufferedImage.TYPE_INT_RGB);
	Graphics g = image.getGraphics();
	Font font = new Font("Times New Roman", Font.BOLD, 16);
	g.setFont(font);//定义字体形式
	Random random = new Random();
	//设定当前制图的随机颜色
	g.setColor(getRandColor(210, 250));//接近225，颜色较浅
	//g.setColor(new Color(255,255,255));//无色
	//完全填充当前制图的背景
	g.fillRect(0, 0, width, height);
	//再次设定当前制图的随机颜色
	g.setColor(getRandColor(180, 220));
	//g.setColor(new Color(0,0,0));//黑色
	
	//用上次设定的颜色线条再次画背景
	for (int i = 0; i < 155; i++) {
		int i_x = random.nextInt(width);
		int i_y = random.nextInt(height);
		int i_xl = random.nextInt(12);
		int i_yl = random.nextInt(12);
		g.drawLine(i_x, i_y, i_x + i_xl, i_y + i_yl);
	}
	
	//产生4位随机码
	String yourCode = "";
	for (int i = 0; i < 4; i++) {
		String rand = String.valueOf(random.nextInt(10));
		yourCode += rand;
		//随机数字的颜色，不做设定时，默认为上次设定颜色
		g.setColor(new Color(addInt + random.nextInt(areaInt), addInt + random.nextInt(areaInt), addInt + random.nextInt(areaInt)));
		g.drawString(rand, 13 * i + 6, 16);
	}
	
	session.setAttribute("authCode", yourCode);//将验证码存入Session中
	
	g.dispose();
	ImageIO.write(image, "JPEG", response.getOutputStream());//输出验证图片
	out.clear();
	out = pageContext.pushBody();
%>
