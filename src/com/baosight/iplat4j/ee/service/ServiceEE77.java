/**
 * 
 */
package com.baosight.iplat4j.ee.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ep.ServiceEPBase;


public class ServiceEE77 extends ServiceEPBase
{
	public EiInfo initLoad( EiInfo inInfo )
	{
		ResultSet rs;

		try {
			Connection conn = DriverManager.getConnection("jdbc:oracle:thin:@10.25.12.1:1521:iplat" , "iplat", "iplat");
			
			String sql = "select * from tedfa00";
			
			Statement stmt = conn.createStatement();

			rs = stmt.executeQuery(sql);
			
			ResultSetMetaData i = rs.getMetaData();
			
			int j = i.getColumnCount();
			
			stmt.close();
			conn.close();

		} catch (SQLException e) {
			// TODO 自动生成 catch 块
			e.printStackTrace();
		}
		
		return super.initLoad(inInfo);
	}
	

}
