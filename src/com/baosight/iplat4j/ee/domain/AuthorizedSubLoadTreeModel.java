package com.baosight.iplat4j.ee.domain;

import java.io.ByteArrayInputStream;
import java.io.InputStreamReader;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.baosight.iplat4j.dao.Dao;
import com.baosight.iplat4j.dao.ibatis.SqlMapDao;
import com.baosight.iplat4j.ef.ui.tree.LoadTreeModel;
import com.baosight.iplat4j.ef.ui.tree.Tree;
import com.baosight.iplat4j.ef.ui.tree.TreeConstants;
import com.baosight.iplat4j.ef.ui.tree.TreeNode;
import com.baosight.iplat4j.ef.ui.tree.TreeNodeImpl;
import com.ibatis.sqlmap.client.SqlMapClient;
import com.ibatis.sqlmap.client.SqlMapClientBuilder;
import com.ibatis.sqlmap.engine.impl.SqlMapClientImpl;
import com.ibatis.sqlmap.engine.impl.SqlMapExecutorDelegate;
import com.ibatis.sqlmap.engine.mapping.statement.MappedStatement;

public class AuthorizedSubLoadTreeModel implements LoadTreeModel {
	public final static String PARENT = "PARENT";

	private Map initParam;
	
	private Dao dao = null;

	public AuthorizedSubLoadTreeModel( Map parameter )
	{
		initParam = parameter;
	}
	

	public void setDao(Dao dao) {
		this.dao = dao;
	}

	public TreeNode[] getChildren(String parent) {
		List ret = new ArrayList();
		List children = getChildrenNodes(parent);
		for (int i = 0; i < children.size(); i++) {
			OrganizationNode node = (OrganizationNode) children.get(i);
			TreeNode tnode = new TreeNodeImpl(node.getLabel(), node.getText(),
					false);
			tnode.setProperty(TreeConstants.TREENODE_CHECK_PROP, "false");
			ret.add(tnode);
		}
		return (TreeNode[]) ret.toArray(new TreeNode[] {});
	}

	public TreeNode getParent(String element) {
		throw new UnsupportedOperationException();
	}

	public TreeNode[] getTopNodes() {
		List ret = new ArrayList();
		List children = getTopNodesInDB();
		for (int i = 0; i < children.size(); i++) {
			OrganizationNode node = (OrganizationNode) children.get(i);
			TreeNode tnode = new TreeNodeImpl(node.getLabel(), node.getText(),
					false);
			tnode.setProperty(TreeConstants.TREENODE_CHECK_PROP, "false");
			ret.add(tnode);
		}
		return (TreeNode[]) ret.toArray(new TreeNode[] {});
	}

	private List getChildrenNodes(String parent) {
		try {
			SqlMapDao tt = initSql("authOrgTemplateDao.querySub",
					"demo/ui/tree/AuthSubOrgTemplateData.xml");
			initParam.put(PARENT, parent);

			List children = tt.getSqlMapClientTemplate().getSqlMapClient()
					.queryForList("authOrgTemplateDao.querySub", initParam);
			return children;
		} catch (SQLException e) {
			e.printStackTrace();
			throw new IllegalStateException();
		}
	}

	private List getTopNodesInDB() {
		try {
			SqlMapDao tt = initSql("authOrgTemplateDao.querySelf",
					"demo/ui/tree/AuthSubOrgTemplateData.xml");
			List children = tt.getSqlMapClientTemplate().getSqlMapClient()
					.queryForList("authOrgTemplateDao.querySelf", initParam);
			return children;
		} catch (SQLException e) {
			throw new IllegalStateException();
		}
	}

	protected SqlMapDao initSql(String sql_name, String xml_file) {
		SqlMapDao sDao = (SqlMapDao) dao;

		SqlMapClientImpl cc = (SqlMapClientImpl) sDao.getSqlMapClientTemplate()
				.getSqlMapClient();

		SqlMapExecutorDelegate dd = cc.delegate;
		MappedStatement sql_statement = null;
		try {
			sql_statement = dd.getMappedStatement(sql_name);
		} catch (Exception e) {
		}
		if (sql_statement != null)
			return sDao;

		StringBuffer xmlBuffer = new StringBuffer(
				"<?xml version=\"1.0\" encoding=\"UTF-8\"?>");
		xmlBuffer
				.append("<!DOCTYPE sqlMapConfig PUBLIC \"-//iBatis.com//DTD SQL Map Config 2.0//EN\" \"http://www.iBatis.com/dtd/sql-map-config-2.dtd\">");
		xmlBuffer.append("<sqlMapConfig>");
		xmlBuffer.append("<settings useStatementNamespaces=\"true\" />");
		xmlBuffer.append("<sqlMap resource=\"" + xml_file + "\"/>");
		xmlBuffer.append("</sqlMapConfig>");
		ByteArrayInputStream read = new ByteArrayInputStream(xmlBuffer
				.toString().getBytes());
		InputStreamReader reader = new InputStreamReader(read);
		System.out.println(reader.toString());

		SqlMapClient sqlMap1 = SqlMapClientBuilder.buildSqlMapClient(reader);
		SqlMapClientImpl sqlMap = (SqlMapClientImpl) sqlMap1;

		Iterator add_statements = sqlMap.delegate.getMappedStatementNames();
		while (add_statements.hasNext()) {
			String name_now = (String) add_statements.next();
			dd.addMappedStatement(sqlMap.getMappedStatement(name_now));
		}
		return sDao;
	}
}
