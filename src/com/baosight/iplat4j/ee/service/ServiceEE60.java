package com.baosight.iplat4j.ee.service;


import java.util.HashMap;
import java.util.Map;

import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.core.ei.EiInfo;
import com.baosight.iplat4j.core.exception.PlatException;
import com.baosight.iplat4j.core.soa.SoaManager;
import com.baosight.iplat4j.ep.ServiceEPBase;

public class ServiceEE60 extends ServiceEPBase{
	
	public EiInfo doABCCall(EiInfo info){
		doACall(info);
		doBCall(info);
		doCCall(info);
		return null;
	}
	
	public EiInfo doABCCall_ThrowException(EiInfo info){
		doACall(info);
		doBCall(info);
		throwException();
		doCCall(info);
		return null;
	}
	
	public EiInfo doABCCall_SetStatus(EiInfo info){
		doACall(info);
		doBCall(info);
		EiInfo result = doCCall(info);
		result.setStatus(-1);
		return result;
	}
	
	public EiInfo doACall(EiInfo info){
		EiInfo a = new EiInfo();
		a.set("serviceName", "EDFA00");
		a.set("methodName", "insert");
		a.setCell("result", 0, "form_ename", "ename_fx");
		a.setCell("sult", 0, "form_cname", "cname_fx");
		return SoaManager.call(a);
	}
	
	public EiInfo doBCall(EiInfo info){
		EiInfo a = new EiInfo();
		a.set("serviceName", "EDFA00");
		a.set("methodName", "update");
		a.setCell("result", 0, "form_ename", "ENAME_FX");
		a.setCell("result", 0, "form_cname", "cname_fx_b");
		return SoaManager.call(a);
	}
	
	public EiInfo doCCall(EiInfo info){
		EiInfo a = new EiInfo();
		a.set("serviceName", "EDFA00");
		a.set("methodName", "update");
		a.setCell("result", 0, "form_ename", "ENAME_FX");
		a.setCell("result", 0, "form_cname", "cname_fx_c");
		return SoaManager.call(a);
	}
	
	
	////////////////////////////////
	
	public EiInfo doABCCallNoTx(EiInfo info){
		doACallNoTx(info);
		doBCallNoTx(info);
		doCCallNoTx(info);
		return null;
	}
	
	
	public EiInfo doABCCallNoTx_ThrowException(EiInfo info){
		doACallNoTx(info);
		doBCallNoTx(info);
		throwException();
		doCCallNoTx(info);
		return null;
	}
	
	public EiInfo doABCCallNoTx_SetStatus(EiInfo info){
		doACallNoTx(info);
		doBCallNoTx(info);
		EiInfo result = doCCallNoTx(info);
		result.setStatus(-1);
		return result;
	}
	
	public EiInfo doACallNoTx(EiInfo info){
		EiInfo a = new EiInfo();
		a.set("serviceName", "EDFA00");
		a.set("methodName", "insert");
		a.setCell("result", 0, "form_ename", "ENAME_FX");
		a.setCell("result", 0, "form_cname", "cname_fx");
		return SoaManager.callNoTx(a);
	}
	
	
	public EiInfo doBCallNoTx(EiInfo info){
		EiInfo a = new EiInfo();
		a.set("serviceName", "EDFA00");
		a.set("methodName", "update");
		a.setCell("result", 0, "form_ename", "ENAME_FX");
		a.setCell("result", 0, "form_cname", "cname_fx_b");
		return SoaManager.callNoTx(a);
	}
	
	public EiInfo doCCallNoTx(EiInfo info){
		EiInfo a = new EiInfo();
		a.set("serviceName", "EDFA00");
		a.set("methodName", "update");
		a.setCell("result", 0, "form_ename", "ENAME_FX");
		a.setCell("result", 0, "form_cname", "cname_fx_c");
		return SoaManager.callNoTx(a);
	}
	
	///////////////////////////////////////
	
	
	public EiInfo doABCCallNewTx(EiInfo info){
		doACallNewTx(info);
		doBCallNewTx(info);
		doCCallNewTx(info);
		return null;
	}
	
	
	public EiInfo doABCCallNewTx_ThrowException(EiInfo info){
		doACallNewTx(info);
		doBCallNewTx(info);
		throwException();
		doCCallNewTx(info);
		return null;
	}
	
	public EiInfo doABCCallNewTx_SetStatus(EiInfo info){
		doACallNewTx(info);
		doBCallNewTx(info);
		EiInfo result = doCCallNewTx(info);
		result.setStatus(-1);
		return result;
	}
	
	
	public EiInfo doACallNewTx(EiInfo info){
		EiInfo a = new EiInfo();
		a.set("serviceName", "EDFA00");
		a.set("methodName", "insert");
		a.setCell("result", 0, "form_ename", "ENAME_FX");
		a.setCell("sult", 0, "form_cname", "cname_fx");
		return SoaManager.callNewTx(a);
	}
	
	public EiInfo doBCallNewTx(EiInfo info){
		EiInfo a = new EiInfo();
		a.set("serviceName", "EDFA00");
		a.set("methodName", "update");
		a.setCell("result", 0, "form_ename", "ENAME_FX");
		a.setCell("result", 0, "form_cname", "cname_fx_b");
		return SoaManager.callNewTx(a);
	}
	
	public EiInfo doCCallNewTx(EiInfo info){
		EiInfo a = new EiInfo();
		a.set("serviceName", "EDFA00");
		a.set("methodName", "update");
		a.setCell("result", 0, "form_ename", "ENAME_FX");
		a.setCell("result", 0, "form_cname", "cname_fx_c");
		return SoaManager.callNewTx(a);
	}
	
	///////////////////////////////
	
	public EiInfo doABCMix_call_new_new(EiInfo info){
		doACall(info);
		doBCallNewTx(info);
		doCCallNewTx(info);
		return null;
	}
	
	public EiInfo doABCMix_call_new_call(EiInfo info){
		doACall(info);
		doBCallNewTx(info);
		doCCall(info);
		return null;
	}
	
	public EiInfo doABCMix_new_call_call(EiInfo info){
		doACallNewTx(info);
		doBCall(info);
		doCCall(info);
		return null;
	}
	
	public EiInfo doABCMix_new_call_new(EiInfo info){
		doACallNewTx(info);
		doBCall(info);
		doCCallNewTx(info);
		return null;
	}
	/////////////////////////////
	
	public EiInfo doABCTx_call_rollback(EiInfo info){
		doACall(info);
		doBCall(info);
		doCCall(info);
		throwException();
		return null;
	}
	
	public EiInfo doABCTx_no_call_rollback(EiInfo info){
		doACallNoTx(info);
		doBCallException(info);
		return null;
	}
	
	public EiInfo doABCTx_no_no(EiInfo info){
		doACallNoTx(info);
		doBCallNoTxException(info);
		return null;
	}
	

	
	
	/////////////////////////////
	public EiInfo doDel(EiInfo info){
		EiInfo a = new EiInfo();
		a.set("serviceName", "EDFA00");
		a.set("methodName", "delete");
		a.setCell("result", 0, "form_ename", "ENAME_FX");
		return SoaManager.call(a);
	}
	
	public EiInfo doQuery(EiInfo info){
		EiInfo a = new EiInfo();
		a.set("serviceName", "EDFA00");
		a.set("methodName", "query");
		a.setCell(EiConstant.queryBlock, 0, "form_ename", "ENAME_FX");
		return SoaManager.call(a);
	}
	
	public EiInfo doCount(EiInfo info){
		Map map =  new HashMap();
		map.put("form_ename", "ENAME_FX");
		int no = dao.count("EDFA00.query", map);
		EiInfo result = new EiInfo();
		result.set("count", new Integer(no));
		return result;
	}
	
	
	public EiInfo doBCallException(EiInfo info){
		doBCall(info);
		throwException();
		return null;
	}
	
	public EiInfo doBCallSetStatus(EiInfo info){
		EiInfo result = doBCall(info);
		result.setStatus(-1);
		return result;
	}
	
	public EiInfo doBCallNoTxException(EiInfo info){
		doBCallNoTx(info);
		throwException();
		return null;
	}
	
	public EiInfo doBCallNewTxSetStatus(EiInfo info){
		EiInfo result = doBCallNewTx(info);
		result.setStatus(-1);
		return result;
	}
		
	public void throwException(){
		throw new PlatException("error");
	}
	
}
