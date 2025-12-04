import pgp from 'pg-promise';

import db from '@agung_dhewe/webapps/src/db.js'
import Api from '@agung_dhewe/webapps/src/api.js'
import sqlUtil from '@agung_dhewe/pgsqlc'
import context from '@agung_dhewe/webapps/src/context.js'  
import logger from '@agung_dhewe/webapps/src/logger.js'	


const moduleName = 'jurnal'

// api: account
export default class extends Api {
	constructor(req, res, next) {
		super(req, res, next);
		Api.cekLogin(req)
	}

	async posting(body) { return await jurnal_posting(this, body) }
}

async function jurnal_log(self, body, startTime, tablename, id, action, data={}, remark='') {
	const { source } = body
	const req = self.req
	const user_id = req.session.user.userId
	const user_name = req.session.user.userFullname
	const ipaddress = req.ip
	const metadata = JSON.stringify({...{source:source}, ...data})
	const endTime = process.hrtime.bigint();
	const executionTimeMs = Number((endTime - startTime) / 1_000_000n); // hasil dalam ms tanpa desimal
	

	const logdata = {id, user_id, user_name, moduleName, action, tablename, executionTimeMs, remark, metadata, ipaddress}
	const ret = await logger.log(logdata)
	return ret
}


export async function jurnal_posting(self, body) {
	const req = self.req
	const startTime = process.hrtime.bigint()
	const tablename = 'act.jurnal'
	const user_id = req.session.user.userId

	try {
		sqlUtil.connect(db)

		const {jurnal_id, isposting} = body
		const sql = 'call act.jurnal_posting(${jurnal_id}, ${isposting}, ${user_id})'
		
		await db.none(sql, {
			jurnal_id,
			isposting,
			user_id
		})


		// ambil feedback setelah posting
		const sqlFeedback = 'select jurnal_id, jurnal_doc, ispost, _postby, _postdate from act.jurnal where jurnal_id=${jurnal_id}'
		const row = await db.one(sqlFeedback, {jurnal_id})
		if (!row.ispost) {
			return {
				success: false,
				message: `Jurnal ${row.jurnal_doc} tidak bisa diposting!`
			}
		}

		// ambil nama yang posting
		const { user_fullname } = await sqlUtil.lookupdb(db, 'core.user', 'user_id', row._postby)

		// record log
		const actionName = isposting ? 'POST' : 'UNPOST'
		jurnal_log(self, body, startTime, tablename, jurnal_id, actionName)

		return {
			success: true,
			postby: user_fullname,
			postdate: row._postdate
		}
	} catch (err) {
		throw err
	}
}