/**
 * 
 */
package com.baosight.iplat4j.ee.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiBlock;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.ee.domain.TEE10;


/**
 * @author wuyicang
 * 
 */
public class ServiceEE1004 extends ServiceEE10
{
	public EiInfo initLoad( EiInfo inInfo )
	{
//		EiBlock block = inInfo.getBlock( "r" );
//		if( block == null )
//		{
//			block = inInfo.addBlock( "r" );
//		}
//		block.set( "showCount", Boolean.TRUE );
//		block.set( "offset", new Integer(0) );
//		block.set( "limit", new Integer(10) );
//		
//		return query( inInfo );
		
		EiBlock block = inInfo.getBlock( "result" );
		if( block == null )
		{
			block = inInfo.addBlock( "result" );
		}
		block.set( "showCount", Boolean.TRUE );
		block.set( "offset", new Integer(0) );
		block.set( "limit", new Integer(10) );		
		return query(inInfo);	
		
		
		
	}
	
	public EiInfo query(EiInfo inInfo){
		
		StringBuffer buffer = new StringBuffer();
		buffer.append( inInfo.getMsg() == null ? "" : inInfo.getMsg() );
		TEE10 ee10 = new TEE10();

		EiInfo outInfo = new EiInfo();

		List aa = null;
		Map param = new HashMap();
		try
		{
			try
			{
				EiBlock eiBlock = inInfo.getBlock( "inqu_data" );
				if( eiBlock != null )
				{
					param = eiBlock.getRow( 0 );
				}
			}
			catch( Exception ex )
			{
				ex.printStackTrace();
			}

			int offset = 0;
			int limit = 10;
			String orderBy = null;

			try
			{
				EiBlock eiBlock = inInfo.getBlock( "result" );
				if( eiBlock != null )
				{
					offset = eiBlock.getInt( "offset" );
				}
			}
			catch( Exception ex )
			{
				ex.printStackTrace();
			}

			try
			{
				EiBlock eiBlock = inInfo.getBlock( "result" );
				if( eiBlock != null )
				{
					limit = eiBlock.getInt( "limit" );
				}
			}
			catch( Exception ex )
			{
				ex.printStackTrace();
			}

			try
			{
				EiBlock eiBlock = inInfo.getBlock( "result" );
				if( eiBlock != null )
				{
					orderBy = eiBlock.getString( "orderBy" );
				}
			}
			catch( Exception ex )
			{
				orderBy = null;
			}
			if( orderBy != null )
				param.put( "orderBy", orderBy );

			aa = dao.query( "EE10.query", param, offset, limit );
		}
		catch( Exception e )
		{
			buffer.append( e.getMessage() + "\n" );
			e.printStackTrace();
		}

		outInfo.setBlock( inInfo.getBlock( "inqu_data" ) );
		outInfo.setAttr( inInfo.getAttr() );
		outInfo.addBlock( "result" );

		Map attr = null;
		if( inInfo.getBlock( "result" ) != null )
		{
			attr = inInfo.getBlock( "result" ).getAttr();
		}
		if( attr == null )
		{
			attr = new HashMap();
		}

		if( attr.get( "showCount" ) != null && "true".equals( attr.get( "showCount" ).toString() ) )
		{
			attr.put( "count", "" + getAllRecordCount( buffer, param ) );
		}

		outInfo.getBlock( "result" ).setAttr( attr );
		outInfo.getBlock( "result" ).setBlockMeta( ee10.eiMetadata );
		outInfo.getBlock( "result" ).setRows( aa );
		if( outInfo.getStatus() >= 0 )
		{
			buffer.append( "查询成功\n" );
		}

		outInfo.setMsg( buffer.toString() );
		generateOtherBlocks( outInfo );
		return outInfo;				
		
		
		
	}
	
	
	
	
}
