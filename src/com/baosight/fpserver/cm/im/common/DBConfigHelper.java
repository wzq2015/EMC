package com.baosight.fpserver.cm.im.common;

import java.io.InputStream;
import java.util.Properties;
import org.apache.commons.pool.impl.GenericKeyedObjectPool.Config;

public class DBConfigHelper 
{
	private static DBConfig systemDBConfig = null;
	
	public static synchronized DBConfig GetDBConfig()
	{
		if (systemDBConfig != null)
		{
			return systemDBConfig;
		}
		systemDBConfig = new DBConfig();
		try 
		{
			Properties prop = new Properties(); 
	        InputStream in = Config.class.getResourceAsStream("/jdbc.properties");
	        prop.load(in);
	        systemDBConfig.DriverClassName = prop.getProperty("jdbc.driverClassName").trim();
	        systemDBConfig.Url = prop.getProperty("jdbc.url").trim();
	        systemDBConfig.UserName = prop.getProperty("jdbc.username").trim();
	        systemDBConfig.Password = prop.getProperty("jdbc.password").trim();
		} 
		catch (Exception e) { }
		return systemDBConfig;
	}
}
