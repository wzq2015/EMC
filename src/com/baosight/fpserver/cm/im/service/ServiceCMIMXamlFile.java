package com.baosight.fpserver.cm.im.service;

import java.io.*;
import java.util.*;

import net.sf.json.JSONObject;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceCMIMXamlFile extends ServiceEPBase 
{

	private String xamlFilePath = "";
	
	public ServiceCMIMXamlFile()
	{
		String classPath = this.getClass().getResource("/").getPath();
		int pos = classPath.indexOf("WEB-INF");
		xamlFilePath = classPath.substring(1,pos) + "UserUpload/xamlFiles";
	}
	
	public EiInfo getXamlFileList(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		
		File xamlDir = new File(xamlFilePath);
		List imageNames = new ArrayList<String>();
		List imageSizes = new ArrayList<Long>();
		Map map = new HashMap();

		if (xamlDir.isDirectory()) 
		{
			File[] xamlFiles = xamlDir.listFiles();
			for (File file : xamlFiles)
			{
				if (file.getName().toLowerCase().endsWith(".xaml")) 
				{
					String fileName = file.getName();
					long fileSize = file.length();
					imageNames.add(fileName);
					imageSizes.add(fileSize);
				}
			}

			map.put("xamlFileList", imageNames);
			map.put("sizeList", imageSizes);
			JSONObject jsonObject = JSONObject.fromObject(map);

			outInfo.set("result", jsonObject.toString());
		}
		return outInfo;
	}
	
	public EiInfo uploadXamlFile(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();

		String fileName = (String)info.get("FileName");
		String filePath = xamlFilePath + "/" + fileName;
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
	
	public EiInfo deleteXamlFile(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		String fileName = (String)info.get("FileName");
		try
		{
			File delFile = new File(xamlFilePath + "/" + fileName);
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
