import pgp from 'pg-promise';

import db from '@agung_dhewe/webapps/src/db.js'
import sqlUtil from '@agung_dhewe/pgsqlc'


export async function bc_init(self, initialData) {
	const req = self.req
	const user_id = req.session.user.userId

	try {
		// ambil default dept, site dan unit dari user
		const sql = `
			select 
				A.dept_id, B.dept_name 
			from hr.employeeuser A inner join ent.dept B on B.dept_id=A.dept_id
			where A.user_id=\${user_id} and A.issuspend=false`


		const row = await db.oneOrNone(sql, {user_id})
		if (row!=null) {
			initialData.setting.default_dept_id = row.dept_id
			initialData.setting.default_dept_name = row.dept_name
		}

	} catch (err) {
		throw err
	}
}


export async function headerListCriteria(self, db, searchMap, criteria, sort, columns, args) {
	searchMap.dept_id = 'dept_id = ${dept_id}'
}


function fixEmptyData(self, data) {
	if (data.approvaltype_id=='') {
		delete data.approvaltype_id
	}

	if (data.paymreqtype_id=='') {
		delete data.paymreqtype_id
	}
}


export async function headerUpdating(self, tx, data) {
	fixEmptyData(self, data)



}

export async function headerCreating(self, tx, data, seqdata, args) {
	fixEmptyData(self, data)
	data.bc_doc = seqdata.doc
}