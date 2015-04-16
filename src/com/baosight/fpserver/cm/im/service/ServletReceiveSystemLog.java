package com.baosight.fpserver.cm.im.service;

import java.io.IOException;
import java.sql.*;
import javax.servlet.ServletException;
import javax.servlet.http.*;
import com.baosight.fpserver.cm.im.common.*;

public class ServletReceiveSystemLog extends HttpServlet
{
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
	{
		String projectName = request.getParameter("ProjectName");
		String logTime = request.getParameter("LogTime");
		String logLevel = request.getParameter("LogLevel");
		String logContent = request.getParameter("LogContent");
		int projectId = 0;
		
		Connection dbConn = null;
		try
		{
			DBConfig systemDBConfig = DBConfigHelper.GetDBConfig();
			Class.forName(systemDBConfig.DriverClassName);
			java.sql.DriverManager.registerDriver(new oracle.jdbc.driver.OracleDriver());
			dbConn = DriverManager.getConnection(systemDBConfig.Url , systemDBConfig.UserName , systemDBConfig.Password);
			String sql = "select * from .t_emcproject where f_emcproject_desc = ?";
			PreparedStatement ps = dbConn.prepareStatement(sql);
			ps.setString(1, projectName);
			ResultSet rs = ps.executeQuery();
			if (rs.next())
			{
				projectId = rs.getInt("f_emcproject_id");
			}
			else
			{
				return;
			}
		}
		catch(Exception e) { return; }
		
		try
		{
			String sql = "insert into .t_system_log values(0, ?, ?, ?, ?)";
			PreparedStatement ps = dbConn.prepareStatement(sql);
			ps.setInt(1, projectId);
			ps.setString(2, logTime);
			ps.setInt(3, Integer.parseInt(logLevel));
			ps.setString(4, logContent);
			ps.executeUpdate();
		}
		catch(Exception e) { return; }
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException 
	{
		doGet(request, response);
	}
}