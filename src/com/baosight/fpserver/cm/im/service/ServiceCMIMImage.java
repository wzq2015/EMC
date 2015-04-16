package com.baosight.fpserver.cm.im.service;

import java.io.*;
import java.util.*;
import net.sf.json.JSONObject;
import sun.misc.BASE64Decoder;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceCMIMImage extends ServiceEPBase
{
	private String imageFilePath = "";
	
	public ServiceCMIMImage()
	{
		String classPath = this.getClass().getResource("/").getPath();
		int pos = classPath.indexOf("WEB-INF");
		imageFilePath = classPath.substring(1,pos) + "UserUpload/Images";
	}
	
	public EiInfo getImageList(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		File imageDir = new File(imageFilePath);
		List imageNames = new ArrayList<String>();
		List imageSizes = new ArrayList<Long>();

		Map map = new HashMap();

		if (imageDir.isDirectory()) 
		{
			File[] imageFiles = imageDir.listFiles();
			for (File file : imageFiles)
			{
				if (file.getName().toLowerCase().endsWith(".jpg") || file.getName().toLowerCase().endsWith(".png")) 
				{
					String fileName = file.getName();
					long fileSize = file.length();
					imageNames.add(fileName);
					imageSizes.add(fileSize);
				}
			}

			map.put("imageList", imageNames);
			map.put("sizeList", imageSizes);
			JSONObject jsonObject = JSONObject.fromObject(map);

			outInfo.set("result", jsonObject.toString());
		}
		return outInfo;
	}
	
	public EiInfo uploadImage(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();

		String fileName = (String) info.get("FileName");
		String filePath = imageFilePath + "/" + fileName;
		// 获取经过base64编码的图片内容字串
		String fileContentBase64 = (String) info.get("FileContent");
		try
		{
			BASE64Decoder decoder = new BASE64Decoder();
			byte[] contents = decoder.decodeBuffer(fileContentBase64);
	
			FileOutputStream fos = new FileOutputStream(new File(filePath));
	
			BufferedOutputStream bos = new BufferedOutputStream(fos);
			bos.write(contents);
			bos.flush();
			bos.close();
	
			outInfo.set("result", "OK");
		}
		catch(Exception e)
		{
			outInfo.set("result", "ERROR");
		}

		return outInfo;
	}
	
	public EiInfo deleteImage(EiInfo info)
	{
		EiInfo outInfo = new EiInfo();
		String fileName = (String)info.get("FileName");
		try
		{
			File delFile = new File(imageFilePath + "/" + fileName);
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