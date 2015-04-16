<!DOCTYPE html>
<%@ page contentType="text/html; charset=GBK" %>
<%
/**
 *	$RCSfile: scache.jsp,v $
 *	$Revision: 2.0 $
 *	$Date: 2003/05/18 14:35:08 $
 */
%>
<%@ page import="com.baosight.epass2.cache.*"%>
<%@ page import="com.baosight.epass2.base.*"%>
<%@ page import="com.baosight.epass2.lang.*"%>
<%@ page import="java.util.*"%>

<%
	String clear_all_cache = request.getParameter( "clear" );
    if ( clear_all_cache != null && clear_all_cache.equals("true") )
	{
		System.out.println( "Clear ePass caches begin..." );
		Iterator it = CacheFactory.getAllCacheNames().iterator();
        for ( ; it.hasNext(); )
        {
            String cache_name = ( String ) it.next();
            CacheFactory.getCache( cache_name ).clear();
        }
		System.out.println( "Clear ePass caches finished..." );
	
		System.out.println( "Reload ePass Factory and Manager begin..." );
		ReloadSystemConfig reloadConfig = ReloadSystemConfig.SYSTEM_RELOAD_CONFIG;
		reloadConfig.setNeedReloadAll( true );
		System.out.println( "Reload ePass Factory and Manager finished..." );
    }
	

%>


<table class="tabletext" width="100%">

    <td class="tabletop" align="center">
    	<form action="scache.jsp?clear=true" method=POST>
    		<input type="submit" name='clear' value="Çå¿ÕËùÓÐ»º´æ">
    	</form>
    </td>
</table>
<p><p>

