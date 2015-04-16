package com.report.excel;

import java.io.*;
import java.util.Properties;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.pool.impl.GenericKeyedObjectPool.Config;
import org.w3c.dom.Document;

public class ExcelExport 
{
	public boolean createNewXls (String templateFilePath, String outputFilePath, String queryString) 
	{
		boolean ret = false;
		
		FileOutputStream fos = null;
		try 
		{
			Properties prop = new Properties(); 
	        InputStream in = Config.class.getResourceAsStream("/jdbc.properties");
	        
	        prop.load(in);
	        
			ExcelPoi pd = new ExcelPoi(prop.getProperty("jdbc.driverClassName").trim()
					, prop.getProperty("jdbc.url").trim()
					, prop.getProperty("jdbc.username").trim()
					, prop.getProperty("jdbc.password").trim()
				);
	
			pd.getExcelSheeet(templateFilePath, queryString);			
			fos = new FileOutputStream(outputFilePath);
			pd.exportExcel(fos);
			
			ret = true;
		} 
		catch (Exception e) 
		{	
			e.printStackTrace();	
		}
		finally 
		{
			try
			{
				if (fos != null)
					fos.close();
			}
			catch (Exception e) { }
		}	
		
		return ret;
	}
	
	public boolean convertToHtml(String srcXlsFilePath, String htmlFilePath)
	{
		boolean ret = false;
		try
		{
			Document doc = ExcelToHtmlConverter.process(new File(srcXlsFilePath));
			DOMSource domSource = new DOMSource(doc);

			OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(htmlFilePath), "utf-8");
			StreamResult streamResult = new StreamResult(out);


			TransformerFactory tf = TransformerFactory.newInstance();
			Transformer serializer = tf.newTransformer();
			
			// TODO set encoding from parameter
			serializer.setOutputProperty( OutputKeys.ENCODING, "UTF-8" );
			serializer.setOutputProperty( OutputKeys.INDENT, "no" );
			serializer.setOutputProperty( OutputKeys.METHOD, "html" );
			serializer.transform(domSource, streamResult);
			out.close();
			
			ret = true;
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		
		return ret;
	}
	
	public byte[] convertToHtmlContent(String srcXlsFilePath)
	{
		byte[] htmlContent = null;
		try
		{
			Document doc = ExcelToHtmlConverter.process(new File(srcXlsFilePath));
			DOMSource domSource = new DOMSource(doc);
			
			ByteArrayOutputStream output = new ByteArrayOutputStream();
			OutputStreamWriter out = new OutputStreamWriter(output, "utf-8");
			StreamResult streamResult = new StreamResult(out);

			TransformerFactory tf = TransformerFactory.newInstance();
			Transformer serializer = tf.newTransformer();
			
			// TODO set encoding from parameter
			serializer.setOutputProperty( OutputKeys.ENCODING, "UTF-8" );
			serializer.setOutputProperty( OutputKeys.INDENT, "no" );
			serializer.setOutputProperty( OutputKeys.METHOD, "html" );
			serializer.transform(domSource, streamResult);
			htmlContent = output.toByteArray();
			out.close();
		}
		catch (Exception e)
		{
			e.printStackTrace();
			return null;
		}
		
		return htmlContent;
	}
}