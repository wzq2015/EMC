/**
 * 
 */
package com.baosight.iplat4j.ee.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.dao.Dao;
import com.baosight.iplat4j.ee.domain.TEE504;
import com.baosight.iplat4j.ep.ServiceEPBase;
import com.baosight.iplat4j.util.TeleUtils;

/**
 * @author wangyuqiu
 *
 */
public class ServiceEE504 extends ServiceEPBase {
	public EiInfo initLoad(EiInfo info){
		return query(info);
	}
	public EiInfo query(EiInfo info){
		EiInfo outInfo = new EiInfo();
		TEE504 tee504 = new TEE504();

		
		StringBuffer buffer = new StringBuffer();
		List list = new ArrayList();
		Map param = new HashMap();
		try {
			outInfo = query(info, "EE504.query", tee504);
//			list = dao.query("EE504.query", param);
		}catch(Exception e){
			buffer.append(e.getMessage());
		}
//		outInfo.addBlock("result").addBlockMeta(tee504.eiMetadata);
//		outInfo.getBlock("result").addRows(list);
//		outInfo.getBlock("result").setRows(list);
		buffer.append("查询成功!");
		outInfo.setMsg(buffer.toString());
		return outInfo;
	}
	
	
	public EiInfo getTeleStr(EiInfo info){
		int i = info.getInt("row");
		int j = info.getInt("col");
		TEE504 tee504 = new TEE504();
		EiInfo outInfo = new EiInfo();
		String str = null;
		try {
			outInfo = query(info, "EE504.query", tee504);
		}catch(Exception e){
			e.printStackTrace();
		}
		if(j == 4)//beantoStr
		{
			tee504.fromMap(outInfo.getBlock("result").getRow(i));
			str = TeleUtils.bean2Str(tee504, "",TeleUtils.TELE_DEFAULT_TYPE);
		}else if(j == 5){
			str = TeleUtils.block2Str(outInfo.getBlock("result"));
		}
		
		outInfo.set("teleStr", str);
		System.out.println(str);
		return outInfo;
	}

	public EiInfo update( EiInfo inInfo )
	{
		StringBuffer buffer = new StringBuffer();
		StringBuffer detail = new StringBuffer();
		
		Dao tt = this.getDao();
		for ( int i = 0; i < inInfo.getBlock( "result" ).getRowCount(); i++ )
		{
			try
			{
				tt.update( "EE504.update",
						inInfo.getBlock( "result" ).getRow( i ) );
				buffer.append( "更新第" + i + "条记录成功\n" );
			}
			catch( Exception ex )
			{
				buffer.append( "更新第" + i + "条记录失败\n" );
				inInfo.setStatus(-1);				
				detail.append( ex.getCause().toString());
			}
		}
		inInfo.setMsg( buffer.toString() );
		inInfo.setDetailMsg( detail.toString() );
		return query( inInfo );
	}	
	
	public EiInfo insert( EiInfo inInfo )
	{
		StringBuffer buffer = new StringBuffer();
		StringBuffer detail = new StringBuffer();
		Dao tt = this.getDao();
		for ( int i = 0; i < inInfo.getBlock( "result" ).getRowCount(); i++ )
		{
			try
			{
				tt.insert( "EE504.insert",
						inInfo.getBlock( "result" ).getRow( i ) );
				buffer.append( "新增第" + i + "条记录成功\n" );
			}
			catch( Exception ex )
			{
				buffer.append( "新增第" + i + "条记录失败\n" );
				inInfo.setStatus(-1);				
				detail.append( ex.getCause().toString());
			}
		}
		inInfo.setMsg( buffer.toString() );
		inInfo.setDetailMsg( detail.toString() );
		return query( inInfo );
	}	
	
	public EiInfo delete( EiInfo inInfo )
	{
		StringBuffer buffer = new StringBuffer();
		StringBuffer detail = new StringBuffer();
		
		Dao tt = this.getDao();
		for ( int i = 0; i < inInfo.getBlock( "result" ).getRowCount(); i++ )
		{
			try
			{
				tt.delete( "EE504.delete",
						( String ) inInfo.getBlock( "result" ).getCell( i, "typeLong" ) );
				buffer.append( "删除第" + i + "条记录成功\n" );
			}
			catch( Exception ex )
			{
				buffer.append( buffer.append( "删除第" + i + "条记录失败\n" ) );
				inInfo.setStatus(-1);				
				detail.append( ex.getCause().toString());
			}
		}
		inInfo.setMsg( buffer.toString() );
		inInfo.setDetailMsg( detail.toString() );
		return query( inInfo );
	}	
	
}
