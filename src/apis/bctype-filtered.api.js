import pgp from 'pg-promise';

import db from '@agung_dhewe/webapps/src/db.js'
import Api from '@agung_dhewe/webapps/src/api.js'
import sqlUtil from '@agung_dhewe/pgsqlc'



// api: account
export default class extends Api {
	constructor(req, res, next) {
		super(req, res, next);
		Api.cekLogin(req)
	}


	async listByDept(body) { return await bctype_listByDept(this, body) }
	async listCurr(body) { return await bctype_listCurr(this, body) }
}



async function bctype_listByDept(self, body) {
	const { criteria={}, limit=0, offset=0, columns=[], sort={} } = body
	const searchMap = {
		searchtext: `A.bctype_name ILIKE '%' || \${searchtext} || '%'`,
		bctype_isdisabled: 'A.bctype_isdisabled = ${bctype_isdisabled}'
	};

	try {

		const dept_id = criteria.dept_id
		delete criteria.dept_id


		columns.push('A.bctype_id')
		columns.push('A.bctype_name')
		columns.push('A.paymreqtype_id')
		columns.push('A.approvaltype_id')
		columns.push('A.bccycle_id')


		criteria.bctype_isdisabled = false
		sort.bctype_name = 'asc'

		let tablename = `(
			select X.* from act.bctype X where X.isalldept=true and X.bctype_isdisabled = false
			union
			select X.* from act.bctype X inner join act.bctypedept Y on Y.bctype_id=X.bctype_id
			where 
			Y.dept_id=\${dept_id} and X.bctype_isdisabled = false
		) A`


		// hilangkan criteria '' atau null
		for (var cname in criteria) {
			if (criteria[cname]==='' || criteria[cname]===null) {
				delete criteria[cname]
			}
		}

		const args = { db, criteria }

		var max_rows = limit==0 ? 10 : limit
		const {whereClause, queryParams} = sqlUtil.createWhereClause(criteria, searchMap) 
		
		queryParams.dept_id = dept_id
		
		const sql = sqlUtil.createSqlSelect({tablename, columns, whereClause, sort, limit:max_rows+1, offset, queryParams})
		const rows = await db.any(sql, queryParams);

		
		var i = 0
		const data = []
		for (var row of rows) {
			i++
			if (i>max_rows) { break }

			// lookup: approvaltype_name dari field approvaltype_name pada table core.approvaltype dimana (core.approvaltype.approvaltype_id = act.bctype.approvaltype_id)
			{
				const { approvaltype_name } = await sqlUtil.lookupdb(db, 'core.approvaltype', 'approvaltype_id', row.approvaltype_id)
				row.approvaltype_name = approvaltype_name
			}
			// lookup: paymreqtype_name dari field paymreqtype_name pada table act.paymreqtype dimana (act.paymreqtype.paymreqtype_id = act.bctype.paymreqtype_id)
			{
				const { paymreqtype_name } = await sqlUtil.lookupdb(db, 'act.paymreqtype', 'paymreqtype_id', row.paymreqtype_id)
				row.paymreqtype_name = paymreqtype_name
			}
			
			data.push(row)
		}

		var nextoffset = null
		if (rows.length>max_rows) {
			nextoffset = offset+max_rows
		}

		return {
			criteria: criteria,
			limit:  max_rows,
			nextoffset: nextoffset,
			data: data
		}

	} catch (err) {
		throw err
	}
}


async function bctype_listCurr(self, body) {
	const { criteria={}, limit=0, offset=0, columns=[], sort={} } = body
	const searchMap = {
		searchtext: 'Z.coa_code = ${searchtext}',
		bctype_id: 'X.bctype_id = ${bctype_id}'
	};

	try {

		columns.push('Y.curr_id')
		columns.push('z.curr_code')
		columns.push('Y.coa_id')

		const tablename = `
			act.bctype X inner join act.bctypecoa Y on Y.bctype_id=X.bctype_id
					     inner join ent.curr Z on Z.curr_id=Y.curr_id	
		`

		// hilangkan criteria '' atau null
		for (var cname in criteria) {
			if (criteria[cname]==='' || criteria[cname]===null) {
				delete criteria[cname]
			}
		}

		const args = { db, criteria }

		var max_rows = limit==0 ? 10 : limit
		const {whereClause, queryParams} = sqlUtil.createWhereClause(criteria, searchMap) 
		const sql = sqlUtil.createSqlSelect({tablename, columns, whereClause, sort, limit:max_rows+1, offset, queryParams})
		const rows = await db.any(sql, queryParams);

		
		var i = 0
		const data = []
		for (var row of rows) {
			i++
			if (i>max_rows) { break }

			// coa
			{
				const { coa_name } = await sqlUtil.lookupdb(db, 'act.coa', 'coa_id', row.coa_id)
				row.coa_name = coa_name
			}

			data.push(row)

		}


		var nextoffset = null
		if (rows.length>max_rows) {
			nextoffset = offset+max_rows
		}

		return {
			criteria: criteria,
			limit:  max_rows,
			nextoffset: nextoffset,
			data: data
		}

	} catch (err) {
		throw err
	}		
}