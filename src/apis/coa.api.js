import pgp from 'pg-promise';

import db from '@agung_dhewe/webapps/src/db.js'
import Api from '@agung_dhewe/webapps/src/api.js'
import sqlUtil from '@agung_dhewe/pgsqlc'
import context from '@agung_dhewe/webapps/src/context.js'  
import logger from '@agung_dhewe/webapps/src/logger.js'

import * as Extender from './extenders/coa.apiext.js'

const moduleName = 'coa'
const headerSectionName = 'header'
const headerTableName = 'act.coa' 	

// api: account
export default class extends Api {
	constructor(req, res, next) {
		super(req, res, next);
		Api.cekLogin(req)
	}


	// dipanggil dengan model snake syntax
	// contoh: header-list
	//         header-open-data
	async init(body) { return await coa_init(this, body) }

	// header
	async headerList(body) { return await coa_headerList(this, body) }
	async headerOpen(body) { return await coa_headerOpen(this, body) }
	async headerUpdate(body) { return await coa_headerUpdate(this, body)}
	async headerCreate(body) { return await coa_headerCreate(this, body)}
	async headerDelete(body) { return await coa_headerDelete(this, body) }
	
			
}	

// init module
async function coa_init(self, body) {
	const req = self.req

	// set sid untuk session ini, diperlukan ini agar session aktif
	req.session.sid = req.sessionID

	try {
		// ambil data app dari database
		const sql = 'select apps_id, apps_url from core."apps"'
		const result = await db.any(sql)

		const appsUrls = {}
		for (let row of result) {
			appsUrls[row.apps_id] = {
				url: row.apps_url
			}
		}

		return {
			userId: req.session.user.userId,
			userName: req.session.user.userName,
			userFullname: req.session.userFullname,
			sid: req.session.sid ,
			notifierId: Api.generateNotifierId(moduleName, req.sessionID),
			notifierSocket: req.app.locals.appConfig.notifierSocket,
			appsUrls: appsUrls
		}
		
	} catch (err) {
		throw err
	}
}


// data logging
async function coa_log(self, body, startTime, tablename, id, action, data={}, remark='') {
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



async function coa_headerList(self, body) {
	const tablename = headerTableName
	const { criteria={}, limit=0, offset=0, columns=[], sort={} } = body
	const searchMap = {
		searchtext: `coa_name ILIKE '%' || \${searchtext} || '%'`,
	};

	try {
	
		// jika tidak ada default searchtext
		if (searchMap.searchtext===undefined) {
			throw new Error(`'searchtext' belum didefinisikan di searchMap`)	
		}
		

		// hilangkan criteria '' atau null
		for (var cname in criteria) {
			if (criteria[cname]==='' || criteria[cname]===null) {
				delete criteria[cname]
			}
		}

		// apabila ada keperluan untuk recompose criteria
		if (typeof Extender.headerListCriteria === 'function') {
			await Extender.headerListCriteria(self, db, searchMap, criteria, sort, columns)
		}

		var max_rows = limit==0 ? 10 : limit
		const {whereClause, queryParams} = sqlUtil.createWhereClause(criteria, searchMap) 
		const sql = sqlUtil.createSqlSelect({tablename, columns, whereClause, sort, limit:max_rows+1, offset, queryParams})
		const rows = await db.any(sql, queryParams);

		
		var i = 0
		const data = []
		for (var row of rows) {
			i++
			if (i>max_rows) { break }

			// lookup: coagroup_name dari field coagroup_name pada table act.coagroup dimana (act.coagroup.coagroup_id = act.coa.coagroup_id)
			{
				const { coagroup_name } = await sqlUtil.lookupdb(db, 'act.coagroup', 'coagroup_id', row.coagroup_id)
				row.coagroup_name = coagroup_name
			}
			// lookup: agingtype_name dari field agingtype_name pada table act.agingtype dimana (act.agingtype.agingtype_id = act.coa.agingtype_id)
			{
				const { agingtype_name } = await sqlUtil.lookupdb(db, 'act.agingtype', 'agingtype_id', row.agingtype_id)
				row.agingtype_name = agingtype_name
			}
			// lookup: coareporttype_name dari field coareporttype_name pada table act.coareporttype dimana (act.coareporttype.coareporttype_id = act.coa.coareporttype_id)
			{
				const { coareporttype_name } = await sqlUtil.lookupdb(db, 'act.coareporttype', 'coareporttype_id', row.coareporttype_id)
				row.coareporttype_name = coareporttype_name
			}
			// lookup: taxtype_name dari field taxtype_name pada table act.taxtype dimana (act.taxtype.taxtype_id = act.coa.taxtype_id)
			{
				const { taxtype_name } = await sqlUtil.lookupdb(db, 'act.taxtype', 'taxtype_id', row.taxtype_id)
				row.taxtype_name = taxtype_name
			}
			// lookup: curr_code dari field curr_code pada table ent.curr dimana (ent.curr.curr_id = act.coa.curr_id)
			{
				const { curr_code } = await sqlUtil.lookupdb(db, 'ent.curr', 'curr_id', row.curr_id)
				row.curr_code = curr_code
			}
			
			// pasang extender di sini
			if (typeof Extender.headerListRow === 'function') {
				await Extender.headerListRow(self, row)
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

async function coa_headerOpen(self, body) {
	const tablename = headerTableName

	try {
		const { id } = body 
		const criteria = { coa_id: id }
		const searchMap = { coa_id: `coa_id = \${coa_id}`}
		const {whereClause, queryParams} = sqlUtil.createWhereClause(criteria, searchMap) 
		const sql = sqlUtil.createSqlSelect({
			tablename: tablename, 
			columns:[], 
			whereClause, 
			sort:{}, 
			limit:0, 
			offset:0, 
			queryParams
		})
		const data = await db.one(sql, queryParams);
		if (data==null) { 
			throw new Error(`[${tablename}] data dengan id '${id}' tidak ditemukan`) 
		}	

		// lookup: coagroup_name dari field coagroup_name pada table act.coagroup dimana (act.coagroup.coagroup_id = act.coa.coagroup_id)
		{
			const { coagroup_name } = await sqlUtil.lookupdb(db, 'act.coagroup', 'coagroup_id', data.coagroup_id)
			data.coagroup_name = coagroup_name
		}
		// lookup: agingtype_name dari field agingtype_name pada table act.agingtype dimana (act.agingtype.agingtype_id = act.coa.agingtype_id)
		{
			const { agingtype_name } = await sqlUtil.lookupdb(db, 'act.agingtype', 'agingtype_id', data.agingtype_id)
			data.agingtype_name = agingtype_name
		}
		// lookup: coareporttype_name dari field coareporttype_name pada table act.coareporttype dimana (act.coareporttype.coareporttype_id = act.coa.coareporttype_id)
		{
			const { coareporttype_name } = await sqlUtil.lookupdb(db, 'act.coareporttype', 'coareporttype_id', data.coareporttype_id)
			data.coareporttype_name = coareporttype_name
		}
		// lookup: taxtype_name dari field taxtype_name pada table act.taxtype dimana (act.taxtype.taxtype_id = act.coa.taxtype_id)
		{
			const { taxtype_name } = await sqlUtil.lookupdb(db, 'act.taxtype', 'taxtype_id', data.taxtype_id)
			data.taxtype_name = taxtype_name
		}
		// lookup: curr_code dari field curr_code pada table ent.curr dimana (ent.curr.curr_id = act.coa.curr_id)
		{
			const { curr_code } = await sqlUtil.lookupdb(db, 'ent.curr', 'curr_id', data.curr_id)
			data.curr_code = curr_code
		}
		

		// lookup data createby
		{
			const { user_fullname } = await sqlUtil.lookupdb(db, 'core.user', 'user_id', data._createby)
			data._createby = user_fullname ?? ''
		}

		// lookup data modifyby
		{
			const { user_fullname } = await sqlUtil.lookupdb(db, 'core.user', 'user_id', data._modifyby)
			data._modifyby = user_fullname ?? ''
		}
		
		// pasang extender untuk olah data
		if (typeof Extender.headerOpen === 'function') {
			await Extender.headerOpen(self, data)
		}

		return data
	} catch (err) {
		throw err
	}
}


async function coa_headerCreate(self, body) {
	const { source='coa', data={} } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint();
	const tablename = headerTableName

	try {

		// parse uploaded data
		const files = Api.parseUploadData(data, req.files)


		data._createby = user_id
		data._createdate = (new Date()).toISOString()

		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)

				
			// apabila ada keperluan pengelohan data sebelum disimpan, lakukan di extender headerCreating
			if (typeof Extender.headerCreating === 'function') {
				await Extender.headerCreating(self, tx, data)
			}

			const cmd = sqlUtil.createInsertCommand(tablename, data)
			const ret = await cmd.execute(data)

			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.headerCreated === 'function') {
				await Extender.headerCreated(self, tx, ret, data, logMetadata)
			}

			// record log
			coa_log(self, body, startTime, tablename, ret.coa_id, 'CREATE', logMetadata)

			return ret
		})

		return result
	} catch (err) {
		throw err
	}
}

async function coa_headerUpdate(self, body) {
	const { source='coa', data={} } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = headerTableName

	try {

		// parse uploaded data
		const files = Api.parseUploadData(data, req.files)


		data._modifyby = user_id
		data._modifydate = (new Date()).toISOString()

		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)


			// apabila ada keperluan pengelohan data sebelum disimpan, lakukan di extender headerCreating
			if (typeof Extender.headerUpdating === 'function') {
				await Extender.headerUpdating(self, tx, data)
			}

			// eksekusi update
			const cmd = sqlUtil.createUpdateCommand(tablename, data, ['coa_id'])
			const ret = await cmd.execute(data)

			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.headerUpdated === 'function') {
				await Extender.headerUpdated(self, tx, ret, data, logMetadata)
			}			

			// record log
			coa_log(self, body, startTime, tablename, data.coa_id, 'UPDATE')

			return ret
		})
		

		return result
	} catch (err) {
		throw err
	}
}


async function coa_headerDelete(self, body) {
	const { source, id } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = headerTableName

	try {

		const deletedRow = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			const dataToRemove = {coa_id: id}

			// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender headerDeleting
			if (typeof Extender.headerDeleting === 'function') {
				await Extender.headerDeleting(self, tx, dataToRemove)
			}

			

			// hapus data header
			const cmd = sqlUtil.createDeleteCommand(tablename, ['coa_id'])
			const deletedRow = await cmd.execute(dataToRemove)

			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender headerDeleted
			if (typeof Extender.headerDeleted === 'function') {
				await Extender.headerDeleted(self, tx, ret, logMetadata)
			}

			// record log
			coa_log(self, body, startTime, tablename, id, 'DELETE', logMetadata)

			return deletedRow
		})
	

		return deletedRow
	} catch (err) {
		throw err
	}
}


	