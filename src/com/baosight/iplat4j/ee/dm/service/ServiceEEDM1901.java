/**
树控件Demo文件列表：
1. web -> EE -> DM -> EEDM19.jsp										前台页面
2. web -> EE -> DM -> EEDM19.js											前台javascript
3. src -> com.baosight.iplat4j.ee.dm.service.ServiceEEDM19.java			后台服务，实现增删改查的业务逻辑
4. src -> com.baosight.iplat4j.ee.dm.service.ServiceEEDM1901.java		定义如何获取树中的内容
5. src -> com.baosight.iplat4j.ee.dm.domain.EEDM19.java					定义javabean
6. scr -> com.baosight.iplat4j.ee.dm.sql.EEDM19.xml						定义sql语句映射
7. 数据库中iplat.TEE05表													包括公司、产品、规格、合同号、金额字段
*/


package com.baosight.iplat4j.ee.dm.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang.StringUtils;

import com.baosight.iplat4j.core.ei.EiBlockMeta;
import com.baosight.iplat4j.core.ei.EiColumn;
import com.baosight.iplat4j.core.ei.EiConstant;
import com.baosight.iplat4j.ef.ui.tree.TreeService;

/**
 * @author wuzhanqing
 * @since 2009-06-22
 */
public class ServiceEEDM1901 extends TreeService {
	
	private static final String COMPANY="company";
	private static final String PRODUCT="product";
	private static final String SEPARATOR="@";
	
	/** 
	 * 获取指定节点的子节点
	 * @param parent 公司节点
	 * @return 该公司的产品列表
	 * @see com.baosight.iplat4j.ef.ui.tree.TreeService#getChildNodes(java.lang.String)
	 */
	public List getChildNodes(String parent) {
		
		List list = new ArrayList();	
		if(StringUtils.isEmpty(parent))
			return list;	
       String[] tokens = parent.split(SEPARATOR); 

		//查询公司下的产品
		if(null != tokens && tokens[0].equals(COMPANY)){
			Map map = new HashMap();
			map.put(COMPANY, tokens[1]);
			list = dao.query("EEDM19.query", map);
			return formatProductList(list);
		}
		
		return list;		

	}

	/**
	 * 获取顶级节点
	 * @return 公司列表
	 * @see com.baosight.iplat4j.ef.ui.tree.TreeService#getTopNodes()
	 */
	public List getTopNodes() {
		List list = dao.query("EEDM19.query", null);
		return formatCompanyList(list);		
	}
	
	/**
	 * 初始化元数据<br/>
	 * 元数据包括label, text, key, leaf<br/>
	 * label格式如：company@baosight,product@software@baosight。getChildNodes的参数是节点的label<br/>
	 * key格式如：baosight,software。前台javascript通过key获取当前选择的节点内容<br/>
	 * text格式如：baosight,software。树控件展示时显示的文本<br/>
	 * leaf取值为0或1，0代表非叶节点，1代表叶节点
	 * @return 元数据
	 * @see com.baosight.iplat4j.ef.ui.tree.TreeService#initMetaData()
	 */
	public EiBlockMeta initMetaData() {
		EiBlockMeta eiMetadata = new EiBlockMeta();
		
        //节点的value
		EiColumn eiColumn = new EiColumn("label");
		eiColumn.setDescName("label");
		eiColumn.setNullable(false);
		eiColumn.setPrimaryKey(false);
		eiMetadata.addMeta(eiColumn);
		
		//显示信息
		eiColumn = new EiColumn("text");
		eiColumn.setDescName("text");
		eiColumn.setNullable(false);
		eiColumn.setPrimaryKey(false);
		eiMetadata.addMeta(eiColumn);

		//是否叶子
		eiColumn = new EiColumn("leaf");
		eiColumn.setDescName("leaf");
		eiColumn.setType(EiConstant.COLUMN_TYPE_NUMBER);
		eiColumn.setNullable(false);
		eiColumn.setPrimaryKey(false);
		eiMetadata.addMeta(eiColumn);
        
		eiColumn = new EiColumn("key");
		eiColumn.setDescName("key");
		eiColumn.setNullable(false);
		eiColumn.setPrimaryKey(false);
		eiMetadata.addMeta(eiColumn);

		return eiMetadata;		
	}
	
	
	/**
	 * 转换公司列表的格式
	 * @param list 转换前的公司列表
	 * @return 转换后的公司列表
	 */
	protected List formatCompanyList(List list){
	
		List cpylist = new LinkedList();
		Set companySet = new HashSet();
		
		for(int i=0; i< list.size(); i++) {
			Map map = new HashMap();
			String company = (String)((Map)list.get(i)).get(COMPANY);
			
			if (!companySet.contains(company)) {
				companySet.add(company);
				map.put("label", COMPANY + SEPARATOR + company);
				map.put("key", company);
				map.put("text", company);
				map.put("leaf", "0");
				cpylist.add(map);
			}
		}
		return cpylist;
	}
	
	/**
	 * 转换产品列表的格式
	 * @param list 转换前的产品列表
	 * @return 转换后的产品列表
	 */
	protected List formatProductList(List list){
		HashMap map = new HashMap();
		for(int i=0; i< list.size(); i++) {
			map = (HashMap)list.get(i);	
			String product = (String)map.get(PRODUCT);
			map.put("label",  PRODUCT+SEPARATOR+product+SEPARATOR+map.get(COMPANY));
			map.put("key", product);
			map.put("text",  product);			
			map.put("leaf", "1");
		}
		return list;
	}
}
