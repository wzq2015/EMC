package com.baosight.fpserver.cm.im.service;

import java.io.*;
import java.util.*;
import net.sf.json.JSONObject;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceCMIMSVGFile extends ServiceEPBase
{
	private String svgFilePath = "";
	
	public ServiceCMIMSVGFile()
	{
		String classPath = this.getClass().getResource("/").getPath();
		int pos = classPath.indexOf("WEB-INF");
		svgFilePath = classPath.substring(1,pos) + "UserUpload/SVGFiles";
	}
	
	public EiInfo getSVGFileList(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		File svgDir = new File(svgFilePath);
		List imageNames = new ArrayList<String>();
		List imageSizes = new ArrayList<Long>();
		Map map = new HashMap();

		if (svgDir.isDirectory()) 
		{
			File[] svgFiles = svgDir.listFiles();
			for (File file : svgFiles)
			{
				if (file.getName().toLowerCase().endsWith(".svg")) 
				{
					String fileName = file.getName();
					long fileSize = file.length();
					imageNames.add(fileName);
					imageSizes.add(fileSize);
				}
			}

			map.put("svgFileList", imageNames);
			map.put("sizeList", imageSizes);
			JSONObject jsonObject = JSONObject.fromObject(map);

			outInfo.set("result", jsonObject.toString());
		}
		return outInfo;
	}
	
	public EiInfo uploadSVGFile(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();

		String fileName = (String)info.get("FileName");
		String filePath = svgFilePath + "/" + fileName;
		String svgFileContent = (String)info.get("FileContent");
		try
		{
			File file = new File(filePath);
			FileWriter writer = new FileWriter(file, false);
			writer.write(svgFileContent);
			writer.flush();
			writer.close();
			outInfo.set("result", "OK");
		}
		catch(Exception e)
		{
			outInfo.set("result", "ERROR");
		}
		return outInfo;
	}
	
	public EiInfo deleteSVGFile(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		String fileName = (String)info.get("FileName");
		try
		{
			File delFile = new File(svgFilePath + "/" + fileName);
			if (delFile.exists()) 
			{
				delFile.delete();
			}
			outInfo.set("result", "OK");
		}
		catch(Exception e)
		{
			outInfo.set("result", "ERROR");
		}
		return outInfo;
	}
}