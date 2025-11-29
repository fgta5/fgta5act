import pgp from 'pg-promise';

import db from '@agung_dhewe/webapps/src/db.js'
import Api from '@agung_dhewe/webapps/src/api.js'
import sqlUtil from '@agung_dhewe/pgsqlc'
import context from '@agung_dhewe/webapps/src/context.js'  
import logger from '@agung_dhewe/webapps/src/logger.js'
import { createSequencerDocument } from '@agung_dhewe/webapps/src/sequencerdoc.js' 
import { createSequencerLine } from '@agung_dhewe/webapps/src/sequencerline.js' 

import * as Extender from './extenders/paymreq.apiext.js'

const moduleName = 'paymreq'
const headerSectionName = 'header'
const headerTableName = 'act.paymreq' 
const detilTableName = 'act.paymreqdetil'  
const termTableName = 'act.paymreqterm'  	

// api: account
export default class extends Api {
	constructor(req, res, next) {
		super(req, res, next);
		Api.cekLogin(req)
	}


	// dipanggil dengan model snake syntax
	// contoh: header-list
	//         header-open-data
	async init(body) { return await paymreq_init(this, body) }

	// header
	async headerList(body) { return await paymreq_headerList(this, body) }
	async headerOpen(body) { return await paymreq_headerOpen(this, body) }
	async headerUpdate(body) { return await paymreq_headerUpdate(this, body)}
	async headerCreate(body) { return await paymreq_headerCreate(this, body)}
	async headerDelete(body) { return await paymreq_headerDelete(this, body) }
	
	
	// detil	
	async detilList(body) { return await paymreq_detilList(this, body) }
	async detilOpen(body) { return await paymreq_detilOpen(this, body) }
	async detilUpdate(body) { return await paymreq_detilUpdate(this, body)}
	async detilCreate(body) { return await paymreq_detilCreate(this, body) }
	async detilDelete(body) { return await paymreq_detilDelete(this, body) }
	async detilDeleteRows(body) { return await paymreq_detilDeleteRows(this, body) }
	
	// term	
	async termList(body) { return await paymreq_termList(this, body) }
	async termOpen(body) { return await paymreq_termOpen(this, body) }
	async termUpdate(body) { return await paymreq_termUpdate(this, body)}
	async termCreate(body) { return await paymreq_termCreate(this, body) }
	async termDelete(body) { return await paymreq_termDelete(this, body) }
	async termDeleteRows(body) { return await paymreq_termDeleteRows(this, body) }
			
}	

// init module
async function paymreq_init(self, body) {
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

		const initialData = {
			userId: req.session.user.userId,
			userName: req.session.user.userName,
			userFullname: req.session.userFullname,
			sid: req.session.sid ,
			notifierId: Api.generateNotifierId(moduleName, req.sessionID),
			notifierSocket: req.app.locals.appConfig.notifierSocket,
			appsUrls: appsUrls,
			setting: {}
		}
		
		if (typeof Extender.coa_init === 'function') {
			await Extender.coa_init(self, initialData)
		}

		return initialData
		
	} catch (err) {
		throw err
	}
}


// data logging
async function paymreq_log(self, body, startTime, tablename, id, action, data={}, remark='') {
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



async function paymreq_headerList(self, body) {
	const tablename = headerTableName
	const { criteria={}, limit=0, offset=0, columns=[], sort={} } = body
	const searchMap = {
		searchtext: `paymreq_doc = \${searchtext}`,
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

async function paymreq_headerOpen(self, body) {
	const tablename = headerTableName

	try {
		const { id } = body 
		const criteria = { paymreq_id: id }
		const searchMap = { paymreq_id: `paymreq_id = \${paymreq_id}`}
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
		// export async function headerOpen(self, db, data) {}
		if (typeof Extender.headerOpen === 'function') {
			await Extender.headerOpen(self, db, data)
		}

		return data
	} catch (err) {
		throw err
	}
}


async function paymreq_headerCreate(self, body) {
	const { source='paymreq', data={} } = body
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

			// buat sequencer document	
			const sequencer = createSequencerDocument(tx, { 
				COMPANY_CODE: req.app.locals.appConfig.COMPANY_CODE,
				blockLength: 3,
				numberLength: 6,
			})

			if (typeof Extender.sequencerSetup === 'function') {
				// jika ada keperluan menambahkan code block/cluster di sequencer
				// dapat diimplementasikan di exterder sequencerSetup 
				await Extender.sequencerSetup(self, tx, sequencer, data)
			}

			// generate data XX reset perbulan
			const seqdata = await sequencer.monthly('XX')	
			data.paymreq_id = seqdata.id

			// apabila ada keperluan pengelohan data sebelum disimpan, lakukan di extender headerCreating
			if (typeof Extender.headerCreating === 'function') {
				await Extender.headerCreating(self, tx, data, seqdata)
			}			
			
			

			const cmd = sqlUtil.createInsertCommand(tablename, data)
			const ret = await cmd.execute(data)

			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.headerCreated === 'function') {
				await Extender.headerCreated(self, tx, ret, data, logMetadata)
			}

			// record log
			paymreq_log(self, body, startTime, tablename, ret.paymreq_id, 'CREATE', logMetadata)

			return ret
		})

		return result
	} catch (err) {
		throw err
	}
}

async function paymreq_headerUpdate(self, body) {
	const { source='paymreq', data={} } = body
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
			const cmd = sqlUtil.createUpdateCommand(tablename, data, ['paymreq_id'])
			const ret = await cmd.execute(data)

			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.headerUpdated === 'function') {
				await Extender.headerUpdated(self, tx, ret, data, logMetadata)
			}			

			// record log
			paymreq_log(self, body, startTime, tablename, data.paymreq_id, 'UPDATE')

			return ret
		})
		

		return result
	} catch (err) {
		throw err
	}
}


async function paymreq_headerDelete(self, body) {
	const { source, id } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = headerTableName

	try {

		const deletedRow = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			const dataToRemove = {paymreq_id: id}

			// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender headerDeleting
			if (typeof Extender.headerDeleting === 'function') {
				await Extender.headerDeleting(self, tx, dataToRemove)
			}

			
			// hapus data detil
			{
				const sql = `select * from ${detilTableName} where paymreq_id=\${paymreq_id}`
				const rows = await tx.any(sql, dataToRemove)
				for (let rowdetil of rows) {
					// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
					if (typeof Extender.detilDeleting === 'function') {
						await Extender.detilDeleting(self, tx, rowdetil, logMetadata)
					}

					const param = {paymreqdetil_id: rowdetil.paymreqdetil_id}
					const cmd = sqlUtil.createDeleteCommand(detilTableName, ['paymreqdetil_id'])
					const deletedRow = await cmd.execute(param)

					// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
					if (typeof Extender.detilDeleted === 'function') {
						await Extender.detilDeleted(self, tx, deletedRow, logMetadata)
					}					

					paymreq_log(self, body, startTime, detilTableName, rowdetil.paymreqdetil_id, 'DELETE', {rowdata: deletedRow})
					paymreq_log(self, body, startTime, headerTableName, rowdetil.paymreq_id, 'DELETE ROW DETIL', {paymreqdetil_id: rowdetil.paymreqdetil_id, tablename: detilTableName}, `removed: ${rowdetil.paymreqdetil_id}`)


				}	
			}

			// hapus data term
			{
				const sql = `select * from ${termTableName} where paymreq_id=\${paymreq_id}`
				const rows = await tx.any(sql, dataToRemove)
				for (let rowterm of rows) {
					// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
					if (typeof Extender.termDeleting === 'function') {
						await Extender.termDeleting(self, tx, rowterm, logMetadata)
					}

					const param = {paymreqterm_id: rowterm.paymreqterm_id}
					const cmd = sqlUtil.createDeleteCommand(termTableName, ['paymreqterm_id'])
					const deletedRow = await cmd.execute(param)

					// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
					if (typeof Extender.termDeleted === 'function') {
						await Extender.termDeleted(self, tx, deletedRow, logMetadata)
					}					

					paymreq_log(self, body, startTime, termTableName, rowterm.paymreqterm_id, 'DELETE', {rowdata: deletedRow})
					paymreq_log(self, body, startTime, headerTableName, rowterm.paymreq_id, 'DELETE ROW TERM', {paymreqterm_id: rowterm.paymreqterm_id, tablename: termTableName}, `removed: ${rowterm.paymreqterm_id}`)


				}	
			}

			
			

			// hapus data header
			const cmd = sqlUtil.createDeleteCommand(tablename, ['paymreq_id'])
			const deletedRow = await cmd.execute(dataToRemove)

			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender headerDeleted
			if (typeof Extender.headerDeleted === 'function') {
				await Extender.headerDeleted(self, tx, ret, logMetadata)
			}

			// record log
			paymreq_log(self, body, startTime, tablename, id, 'DELETE', logMetadata)

			return deletedRow
		})
	

		return deletedRow
	} catch (err) {
		throw err
	}
}



// detil	

async function paymreq_detilList(self, body) {
	const tablename = detilTableName
	const { criteria={}, limit=0, offset=0, columns=[], sort={} } = body
	const searchMap = {
		paymreq_id: `paymreq_id=try_cast_bigint(\${paymreq_id}, 0)`,
	};


	try {
	
		// hilangkan criteria '' atau null
		for (var cname in criteria) {
			if (criteria[cname]==='' || criteria[cname]===null) {
				delete criteria[cname]
			}
		}

		// apabila ada keperluan untuk recompose criteria
		if (typeof Extender.paymreqListCriteria === 'function') {
			await Extender.paymreqListCriteria(self, db, searchMap, criteria, sort, columns)
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

			

			// pasang extender di sini
			if (typeof Extender.detilListRow === 'function') {
				await Extender.detilListRow(row)
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

async function paymreq_detilOpen(self, body) {
	const tablename = detilTableName

	try {
		const { id } = body 
		const criteria = { paymreqdetil_id: id }
		const searchMap = { paymreqdetil_id: `paymreqdetil_id = \${paymreqdetil_id}`}
		const {whereClause, queryParams} = sqlUtil.createWhereClause(criteria, searchMap) 
		const sql = sqlUtil.createSqlSelect({
			tablename, 
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

		return data
	} catch (err) {
		throw err
	}
}

async function paymreq_detilCreate(self, body) {
	const { source='paymreq', data={} } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint();
	const tablename = detilTableName

	try {

		// parse uploaded data
		const files = Api.parseUploadData(data, req.files)


		data._createby = user_id
		data._createdate = (new Date()).toISOString()

		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			const sequencer = createSequencerLine(tx, {})
			const seqdata = await sequencer.increment('XX')
			data.paymreqdetil_id = seqdata.id

			// apabila ada keperluan pengolahan data SEBELUM disimpan
			if (typeof Extender.detilCreating === 'function') {
				await Extender.detilCreating(self, tx, data, seqdata)
			}

			const cmd = sqlUtil.createInsertCommand(tablename, data)
			const ret = await cmd.execute(data)
			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.detilCreated === 'function') {
				await Extender.detilCreated(self, tx, ret, data, logMetadata)
			}

			// record log
			paymreq_log(self, body, startTime, tablename, ret.paymreqdetil_id, 'CREATE', logMetadata)

			return ret
		})

		return result
	} catch (err) {
		throw err
	}
}

async function paymreq_detilUpdate(self, body) {
	const { source='paymreq', data={} } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = detilTableName

	try {

		// parse uploaded data
		const files = Api.parseUploadData(data, req.files)


		data._modifyby = user_id
		data._modifydate = (new Date()).toISOString()

		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)


			// apabila ada keperluan pengolahan data SEBELUM disimpan
			if (typeof Extender.detilUpdating === 'function') {
				await Extender.detilUpdating(self, tx, data)
			}			
			
			const cmd =  sqlUtil.createUpdateCommand(tablename, data, ['paymreqdetil_id'])
			const ret = await cmd.execute(data)
			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.detilUpdated === 'function') {
				await Extender.detilUpdated(self, tx, ret, data, logMetadata)
			}

			// record log
			paymreq_log(self, body, startTime, tablename, data.paymreqdetil_id, 'UPDATE', logMetadata)

			return ret
		})
	
		return result
	} catch (err) {
		throw err
	}
}

async function paymreq_detilDelete(self, body) {
	const { source, id } = body 
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = detilTableName

	try {

		const deletedRow = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			const dataToRemove = {paymreqdetil_id: id}
			const sql = `select * from ${detilTableName} where paymreqdetil_id=\${paymreqdetil_id}`
			const rowdetil = await tx.oneOrNone(sql, dataToRemove)


			// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
			if (typeof Extender.detilDeleting === 'function') {
				await Extender.detilDeleting(self, tx, rowdetil, logMetadata)
			}

			const param = {paymreqdetil_id: rowdetil.paymreqdetil_id}
			const cmd = sqlUtil.createDeleteCommand(detilTableName, ['paymreqdetil_id'])
			const deletedRow = await cmd.execute(param)

			// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
			if (typeof Extender.detilDeleted === 'function') {
				await Extender.detilDeleted(self, tx, deletedRow, logMetadata)
			}					

			paymreq_log(self, body, startTime, detilTableName, rowdetil.paymreqdetil_id, 'DELETE', {rowdata: deletedRow})
			paymreq_log(self, body, startTime, headerTableName, rowdetil.paymreq_id, 'DELETE ROW DETIL', {paymreqdetil_id: rowdetil.paymreqdetil_id, tablename: detilTableName}, `removed: ${rowdetil.paymreqdetil_id}`)

			return deletedRow
		})
	

		return deletedRow
	} catch (err) {
		throw err
	}
}

async function paymreq_detilDeleteRows(self, body) {
	const { data } = body 
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint();
	const tablename = detilTableName


	try {
		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			for (let id of data) {
				const dataToRemove = {paymreqdetil_id: id}
				const sql = `select * from ${detilTableName} where paymreqdetil_id=\${paymreqdetil_id}`
				const rowdetil = await tx.oneOrNone(sql, dataToRemove)

				// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
				if (typeof Extender.detilDeleting === 'function') {
					await Extender.detilDeleting(self, tx, rowdetil, logMetadata)
				}

				const param = {paymreqdetil_id: rowdetil.paymreqdetil_id}
				const cmd = sqlUtil.createDeleteCommand(detilTableName, ['paymreqdetil_id'])
				const deletedRow = await cmd.execute(param)

				// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
				if (typeof Extender.detilDeleted === 'function') {
					await Extender.detilDeleted(self, tx, deletedRow, logMetadata)
				}					

				paymreq_log(self, body, startTime, detilTableName, rowdetil.paymreqdetil_id, 'DELETE', {rowdata: deletedRow})
				paymreq_log(self, body, startTime, headerTableName, rowdetil.paymreq_id, 'DELETE ROW DETIL', {paymreqdetil_id: rowdetil.paymreqdetil_id, tablename: detilTableName}, `removed: ${rowdetil.paymreqdetil_id}`)
			}
		})

		const res = {
			deleted: true,
			message: ''
		}
		return res
	} catch (err) {
		throw err
	}	
}


// term	

async function paymreq_termList(self, body) {
	const tablename = termTableName
	const { criteria={}, limit=0, offset=0, columns=[], sort={} } = body
	const searchMap = {
		paymreq_id: `paymreq_id=try_cast_bigint(\${paymreq_id}, 0)`,
	};


	try {
	
		// hilangkan criteria '' atau null
		for (var cname in criteria) {
			if (criteria[cname]==='' || criteria[cname]===null) {
				delete criteria[cname]
			}
		}

		// apabila ada keperluan untuk recompose criteria
		if (typeof Extender.paymreqListCriteria === 'function') {
			await Extender.paymreqListCriteria(self, db, searchMap, criteria, sort, columns)
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

			

			// pasang extender di sini
			if (typeof Extender.detilListRow === 'function') {
				await Extender.detilListRow(row)
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

async function paymreq_termOpen(self, body) {
	const tablename = termTableName

	try {
		const { id } = body 
		const criteria = { paymreqterm_id: id }
		const searchMap = { paymreqterm_id: `paymreqterm_id = \${paymreqterm_id}`}
		const {whereClause, queryParams} = sqlUtil.createWhereClause(criteria, searchMap) 
		const sql = sqlUtil.createSqlSelect({
			tablename, 
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

		return data
	} catch (err) {
		throw err
	}
}

async function paymreq_termCreate(self, body) {
	const { source='paymreq', data={} } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint();
	const tablename = termTableName

	try {

		// parse uploaded data
		const files = Api.parseUploadData(data, req.files)


		data._createby = user_id
		data._createdate = (new Date()).toISOString()

		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			const sequencer = createSequencerLine(tx, {})
			const seqdata = await sequencer.increment('XX')
			data.paymreqterm_id = seqdata.id

			// apabila ada keperluan pengolahan data SEBELUM disimpan
			if (typeof Extender.termCreating === 'function') {
				await Extender.termCreating(self, tx, data, seqdata)
			}

			const cmd = sqlUtil.createInsertCommand(tablename, data)
			const ret = await cmd.execute(data)
			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.termCreated === 'function') {
				await Extender.termCreated(self, tx, ret, data, logMetadata)
			}

			// record log
			paymreq_log(self, body, startTime, tablename, ret.paymreqterm_id, 'CREATE', logMetadata)

			return ret
		})

		return result
	} catch (err) {
		throw err
	}
}

async function paymreq_termUpdate(self, body) {
	const { source='paymreq', data={} } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = termTableName

	try {

		// parse uploaded data
		const files = Api.parseUploadData(data, req.files)


		data._modifyby = user_id
		data._modifydate = (new Date()).toISOString()

		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)


			// apabila ada keperluan pengolahan data SEBELUM disimpan
			if (typeof Extender.termUpdating === 'function') {
				await Extender.termUpdating(self, tx, data)
			}			
			
			const cmd =  sqlUtil.createUpdateCommand(tablename, data, ['paymreqterm_id'])
			const ret = await cmd.execute(data)
			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.termUpdated === 'function') {
				await Extender.termUpdated(self, tx, ret, data, logMetadata)
			}

			// record log
			paymreq_log(self, body, startTime, tablename, data.paymreqterm_id, 'UPDATE', logMetadata)

			return ret
		})
	
		return result
	} catch (err) {
		throw err
	}
}

async function paymreq_termDelete(self, body) {
	const { source, id } = body 
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = termTableName

	try {

		const deletedRow = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			const dataToRemove = {paymreqterm_id: id}
			const sql = `select * from ${termTableName} where paymreqterm_id=\${paymreqterm_id}`
			const rowterm = await tx.oneOrNone(sql, dataToRemove)


			// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
			if (typeof Extender.termDeleting === 'function') {
				await Extender.termDeleting(self, tx, rowterm, logMetadata)
			}

			const param = {paymreqterm_id: rowterm.paymreqterm_id}
			const cmd = sqlUtil.createDeleteCommand(termTableName, ['paymreqterm_id'])
			const deletedRow = await cmd.execute(param)

			// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
			if (typeof Extender.termDeleted === 'function') {
				await Extender.termDeleted(self, tx, deletedRow, logMetadata)
			}					

			paymreq_log(self, body, startTime, termTableName, rowterm.paymreqterm_id, 'DELETE', {rowdata: deletedRow})
			paymreq_log(self, body, startTime, headerTableName, rowterm.paymreq_id, 'DELETE ROW TERM', {paymreqterm_id: rowterm.paymreqterm_id, tablename: termTableName}, `removed: ${rowterm.paymreqterm_id}`)

			return deletedRow
		})
	

		return deletedRow
	} catch (err) {
		throw err
	}
}

async function paymreq_termDeleteRows(self, body) {
	const { data } = body 
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint();
	const tablename = termTableName


	try {
		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			for (let id of data) {
				const dataToRemove = {paymreqterm_id: id}
				const sql = `select * from ${termTableName} where paymreqterm_id=\${paymreqterm_id}`
				const rowterm = await tx.oneOrNone(sql, dataToRemove)

				// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
				if (typeof Extender.termDeleting === 'function') {
					await Extender.termDeleting(self, tx, rowterm, logMetadata)
				}

				const param = {paymreqterm_id: rowterm.paymreqterm_id}
				const cmd = sqlUtil.createDeleteCommand(termTableName, ['paymreqterm_id'])
				const deletedRow = await cmd.execute(param)

				// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
				if (typeof Extender.termDeleted === 'function') {
					await Extender.termDeleted(self, tx, deletedRow, logMetadata)
				}					

				paymreq_log(self, body, startTime, termTableName, rowterm.paymreqterm_id, 'DELETE', {rowdata: deletedRow})
				paymreq_log(self, body, startTime, headerTableName, rowterm.paymreq_id, 'DELETE ROW TERM', {paymreqterm_id: rowterm.paymreqterm_id, tablename: termTableName}, `removed: ${rowterm.paymreqterm_id}`)
			}
		})

		const res = {
			deleted: true,
			message: ''
		}
		return res
	} catch (err) {
		throw err
	}	
}

	