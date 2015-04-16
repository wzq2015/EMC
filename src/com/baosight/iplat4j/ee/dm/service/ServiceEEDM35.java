package com.baosight.iplat4j.ee.dm.service;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.security.bridge.SecurityBridge;
import com.baosight.iplat4j.security.bridge.SecurityBridgeFactory;

public class ServiceEEDM35 extends ServiceEPBase 
{
	public void testLog()
	{
		for( int i = 0; i < 80000; i++ )
		{
			EiInfo info = new EiInfo();
			Map map = new HashMap();
//			map.put( "row", Integer.valueOf(100+i) ); 
//			map.put( "col", Integer.valueOf(50+i) );
//			map.put( "totaltime", Integer.valueOf(5000+i+i ));
//			map.put( "rendertime", Integer.valueOf(1000+i ));
//			map.put( "servicetime", Integer.valueOf(4000+i) );

			info.setAttr( map );
			
			log( info );
		}
		
		System.out.println( "=========" );
	}
	
	public EiInfo log( EiInfo info )
	{
		String row = info.get( "row" ).toString();
		String col = info.get( "col" ).toString();
		String totaltime = info.get( "totaltime" ).toString();
		String rendertime = info.get( "rendertime" ).toString();
		String servicetime = info.get( "servicetime" ).toString();
		String querytime = info.get( "querytime" ).toString();
		String jsontransftime = info.get( "jsontransftime" ).toString();
		
		
		StringBuffer content = new StringBuffer();
		content.append( col ).append( "  " ).append( row ).append( "  " )
			.append( totaltime ).append( "  " ).append( rendertime )
			.append( "  " ).append( servicetime ).append( "  " ).append( querytime ).append( "  " ).append( jsontransftime );
		
		File file = new File( "time.txt" );
		FileWriter fw = null;
		BufferedWriter bw = null;
		if( !file.exists() )
		{
			try {
				file.createNewFile();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}				
		}
		
		try {
			//fos = new FileOutputStream( file, true );
			fw = new FileWriter( file, true );
			bw= new BufferedWriter(fw);
			bw.write( content.toString() );
			bw.newLine();
		}  catch (IOException e) {
			e.printStackTrace();
		}finally
		{
			try {
				bw.close();
				fw.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		System.out.println( "File path = " + file.getAbsoluteFile() );
		return new EiInfo();
	}
	
	public EiInfo pressLogin( EiInfo info )
	{
		String username = info.getString( "username" );
		String password = info.getString( "password" );
		
		SecurityBridge b = SecurityBridgeFactory.getBridge();

		String[] result = b.checkIdentity(username, password);
		
		if (!result[0].equals("true")) {
			info.setStatus( -1 );
			info.setMsg( "用户不能访问系统!" );
		}
		else
		{
			info.setStatus( 1 );
			info.setMsg( "用户访问系统成功!" );
		}
		return info;
		
	}
	
	/**
	 * @param args
	 */
	public static void main(String[] args) 
	{
		ServiceEEDM35 eedm35 = new ServiceEEDM35();
		
		EiInfo info = new EiInfo();
		info.set( "username", "admin" );
		info.set( "password", "admin" );
		
		info = eedm35.pressLogin( info );
		
		System.out.println( info.getMsg() );
		
		//eedm35.testLog();

	}

}
