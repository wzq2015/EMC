<!DOCTYPE html>
<%@ page import="java.io.File" %>
<%@ page import="java.util.concurrent.BlockingQueue" %>
<%@ page import="java.util.concurrent.ArrayBlockingQueue" %>
<%@ page import="com.baosight.iplat4j.eu.af.config.SwfConverter" %><%
    File outputFileInst = new File("D:\\work\\");
    File inputFileInst1 = new File("D:\\jzzjn1.pdf");
    BlockingQueue<String> fileBlockingQueue = new ArrayBlockingQueue<String>(1);
//        SwfConverter fc = new SwfConverter(fileBlockingQueue,"D:\\用户手册.pdf", outputFileInst);
    new Thread(new SwfConverter(fileBlockingQueue,"D:\\jzzjn.pdf", outputFileInst).getConvert()).start();
%>
