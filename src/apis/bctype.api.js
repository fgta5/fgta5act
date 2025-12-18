import pgp from 'pg-promise';

import db from '@agung_dhewe/webapps/src/db.js'
import Api from '@agung_dhewe/webapps/src/api.js'
import sqlUtil from '@agung_dhewe/pgsqlc'
import context from '@agung_dhewe/webapps/src/context.js'  
import logger from '@agung_dhewe/webapps/src/logger.js'
import { createSequencerLine } from '@agung_dhewe/webapps/src/sequencerline.js' 

import * as Extender from './extenders/bctype.apiext.js'

const moduleName = 'bctype'
const headerSectionName = 'header'
const headerTableName = 'act.bctype' 
const coaTableName = 'act.bctypecoa'  
const itemclassTableName = 'act.bctypeitemclass'  
const deptTableName = 'act.bctypedept'  	

// api: account
export default class extends Api {
	constructor(req, res, next) {
		super(req, res, next);
		Api.cekLogin(req)
	}


	// dipanggil dengan model snake syntax
	// contoh: header-list
	//         header-open-data
	async init(body) { return await bctype_init(this, body) }

	// header
	async headerList(body) { return await bctype_headerList(this, body) }
	async headerOpen(body) { return await bctype_headerOpen(this, body) }
	async headerUpdate(body) { return await bctype_headerUpdate(this, body)}
	async headerCreate(body) { return await bctype_headerCreate(this, body)}
	async headerDelete(body) { return await bctype_headerDelete(this, body) }
	
	
	// coa	
	async coaList(body) { return await bctype_coaList(this, body) }
	async coaOpen(body) { return await bctype_coaOpen(this, body) }
	async coaUpdate(body) { return await bctype_coaUpdate(this, body)}
	async coaCreate(body) { return await bctype_coaCreate(this, body) }
	async coaDelete(body) { return await bctype_coaDelete(this, body) }
	async coaDeleteRows(body) { return await bctype_coaDeleteRows(this, body) }
	
	// itemclass	
	async itemclassList(body) { return await bctype_itemclassList(this, body) }
	async itemclassOpen(body) { return await bctype_itemclassOpen(this, body) }
	async itemclassUpdate(body) { return await bctype_itemclassUpdate(this, body)}
	async itemclassCreate(body) { return await bctype_itemclassCreate(this, body) }
	async itemclassDelete(body) { return await bctype_itemclassDelete(this, body) }
	async itemclassDeleteRows(body) { return await bctype_itemclassDeleteRows(this, body) }
	
	// dept	
	async deptList(body) { return await bctype_deptList(this, body) }
	async deptOpen(body) { return await bctype_deptOpen(this, body) }
	async deptUpdate(body) { return await bctype_deptUpdate(this, body)}
	async deptCreate(body) { return await bctype_deptCreate(this, body) }
	async deptDelete(body) { return await bctype_deptDelete(this, body) }
	async deptDeleteRows(body) { return await bctype_deptDeleteRows(this, body) }
			
}	

// init module
async function bctype_init(self, body) {
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
		
		if (typeof Extender.bctype_init === 'function') {
			// export async function bctype_init(self, initialData) {}
			await Extender.bctype_init(self, initialData)
		}

		return initialData
		
	} catch (err) {
		throw err
	}
}


// data logging
async function bctype_log(self, body, startTime, tablename, id, action, data={}, remark='') {
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



async function bctype_headerList(self, body) {
	const tablename = headerTableName
	const { criteria={}, limit=0, offset=0, columns=[], sort={} } = body
	const searchMap = {
		searchtext: `bctype_name ILIKE '%' || \${searchtext} || '%'`,
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

		const args = { db, criteria }

		// apabila ada keperluan untuk recompose criteria
		if (typeof Extender.headerListCriteria === 'function') {
			// export async function headerListCriteria(self, db, searchMap, criteria, sort, columns, args) {}
			await Extender.headerListCriteria(self, db, searchMap, criteria, sort, columns, args)
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

			// lookup: bccycle_name dari field bccycle_name pada table act.bccycle dimana (act.bccycle.bccycle_id = act.bctype.bccycle_id)
			{
				const { bccycle_name } = await sqlUtil.lookupdb(db, 'act.bccycle', 'bccycle_id', row.bccycle_id)
				row.bccycle_name = bccycle_name
			}
			// lookup: approvalmodel_name dari field approvalmodel_name pada table ent.approvalmodel dimana (ent.approvalmodel.approvalmodel_id = act.bctype.approvalmodel_id)
			{
				const { approvalmodel_name } = await sqlUtil.lookupdb(db, 'ent.approvalmodel', 'approvalmodel_id', row.approvalmodel_id)
				row.approvalmodel_name = approvalmodel_name
			}
			// lookup: paymreqtype_name dari field paymreqtype_name pada table act.paymreqtype dimana (act.paymreqtype.paymreqtype_id = act.bctype.paymreqtype_id)
			{
				const { paymreqtype_name } = await sqlUtil.lookupdb(db, 'act.paymreqtype', 'paymreqtype_id', row.paymreqtype_id)
				row.paymreqtype_name = paymreqtype_name
			}
			// lookup: agingtype_name dari field agingtype_name pada table act.agingtype dimana (act.agingtype.agingtype_id = act.bctype.agingtype_id)
			{
				const { agingtype_name } = await sqlUtil.lookupdb(db, 'act.agingtype', 'agingtype_id', row.agingtype_id)
				row.agingtype_name = agingtype_name
			}
			
			// pasang extender di sini
			if (typeof Extender.headerListRow === 'function') {
				// export async function headerListRow(self, row, args) {}
				await Extender.headerListRow(self, row, args)
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

async function bctype_headerOpen(self, body) {
	const tablename = headerTableName

	try {
		const { id } = body 
		const criteria = { bctype_id: id }
		const searchMap = { bctype_id: `bctype_id = \${bctype_id}`}
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

		// lookup: bccycle_name dari field bccycle_name pada table act.bccycle dimana (act.bccycle.bccycle_id = act.bctype.bccycle_id)
		{
			const { bccycle_name } = await sqlUtil.lookupdb(db, 'act.bccycle', 'bccycle_id', data.bccycle_id)
			data.bccycle_name = bccycle_name
		}
		// lookup: approvalmodel_name dari field approvalmodel_name pada table ent.approvalmodel dimana (ent.approvalmodel.approvalmodel_id = act.bctype.approvalmodel_id)
		{
			const { approvalmodel_name } = await sqlUtil.lookupdb(db, 'ent.approvalmodel', 'approvalmodel_id', data.approvalmodel_id)
			data.approvalmodel_name = approvalmodel_name
		}
		// lookup: paymreqtype_name dari field paymreqtype_name pada table act.paymreqtype dimana (act.paymreqtype.paymreqtype_id = act.bctype.paymreqtype_id)
		{
			const { paymreqtype_name } = await sqlUtil.lookupdb(db, 'act.paymreqtype', 'paymreqtype_id', data.paymreqtype_id)
			data.paymreqtype_name = paymreqtype_name
		}
		// lookup: agingtype_name dari field agingtype_name pada table act.agingtype dimana (act.agingtype.agingtype_id = act.bctype.agingtype_id)
		{
			const { agingtype_name } = await sqlUtil.lookupdb(db, 'act.agingtype', 'agingtype_id', data.agingtype_id)
			data.agingtype_name = agingtype_name
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
			// export async function headerOpen(self, db, data) {}
			await Extender.headerOpen(self, db, data)
		}

		return data
	} catch (err) {
		throw err
	}
}


async function bctype_headerCreate(self, body) {
	const { source='bctype', data={} } = body
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


			const args = { section: 'header', prefix:'' }

			
			// buat short sequencer	
			const sequencer = createSequencerLine(tx, {})

			if (typeof Extender.sequencerSetup === 'function') {
				// jika ada keperluan menambahkan code block/cluster di sequencer
				// dapat diimplementasikan di exterder sequencerSetup 
				// export async function sequencerSetup(self, tx, sequencer, data, args) {}
				await Extender.sequencerSetup(self, tx, sequencer, data, args)
			}

			// generate short id sesuai prefix (default: ) reset pertahun
			const seqdata = await sequencer.yearlyshort(args.prefix)
			data.bctype_id = seqdata.id

			// apabila ada keperluan pengelohan data sebelum disimpan, lakukan di extender headerCreating
			if (typeof Extender.headerCreating === 'function') {
				// export async function headerCreating(self, tx, data, seqdata, args) {}
				await Extender.headerCreating(self, tx, data, seqdata, args)
			}

			

			const cmd = sqlUtil.createInsertCommand(tablename, data)
			const ret = await cmd.execute(data)

			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.headerCreated === 'function') {
				// export async function headerCreated(self, tx, ret, data, logMetadata, args) {}
				await Extender.headerCreated(self, tx, ret, data, logMetadata, args)
			}

			// record log
			bctype_log(self, body, startTime, tablename, ret.bctype_id, 'CREATE', logMetadata)

			return ret
		})

		return result
	} catch (err) {
		throw err
	}
}

async function bctype_headerUpdate(self, body) {
	const { source='bctype', data={} } = body
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
				// export async function headerUpdating(self, tx, data) {}
				await Extender.headerUpdating(self, tx, data)
			}

			// eksekusi update
			const cmd = sqlUtil.createUpdateCommand(tablename, data, ['bctype_id'])
			const ret = await cmd.execute(data)

			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.headerUpdated === 'function') {
				// export async function headerUpdated(self, tx, ret, data, logMetadata) {}
				await Extender.headerUpdated(self, tx, ret, data, logMetadata)
			}			

			// record log
			bctype_log(self, body, startTime, tablename, data.bctype_id, 'UPDATE')

			return ret
		})
		

		return result
	} catch (err) {
		throw err
	}
}


async function bctype_headerDelete(self, body) {
	const { source, id } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = headerTableName

	try {

		const deletedRow = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			const dataToRemove = {bctype_id: id}

			// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender headerDeleting
			if (typeof Extender.headerDeleting === 'function') {
				// export async function headerDeleting(self, tx, dataToRemove) {}
				await Extender.headerDeleting(self, tx, dataToRemove)
			}

			
			// hapus data coa
			{
				const sql = `select * from ${coaTableName} where bctype_id=\${bctype_id}`
				const rows = await tx.any(sql, dataToRemove)
				for (let rowcoa of rows) {
					// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
					if (typeof Extender.coaDeleting === 'function') {
						// export async function coaDeleting(self, tx, rowcoa, logMetadata) {}
						await Extender.coaDeleting(self, tx, rowcoa, logMetadata)
					}

					const param = {bctypecoa_id: rowcoa.bctypecoa_id}
					const cmd = sqlUtil.createDeleteCommand(coaTableName, ['bctypecoa_id'])
					const deletedRow = await cmd.execute(param)

					// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
					if (typeof Extender.coaDeleted === 'function') {
						// export async function coaDeleted(self, tx, deletedRow, logMetadata) {}
						await Extender.coaDeleted(self, tx, deletedRow, logMetadata)
					}					

					bctype_log(self, body, startTime, coaTableName, rowcoa.bctypecoa_id, 'DELETE', {rowdata: deletedRow})
					bctype_log(self, body, startTime, headerTableName, rowcoa.bctype_id, 'DELETE ROW COA', {bctypecoa_id: rowcoa.bctypecoa_id, tablename: coaTableName}, `removed: ${rowcoa.bctypecoa_id}`)


				}	
			}

			// hapus data itemclass
			{
				const sql = `select * from ${itemclassTableName} where bctype_id=\${bctype_id}`
				const rows = await tx.any(sql, dataToRemove)
				for (let rowitemclass of rows) {
					// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
					if (typeof Extender.itemclassDeleting === 'function') {
						// export async function itemclassDeleting(self, tx, rowitemclass, logMetadata) {}
						await Extender.itemclassDeleting(self, tx, rowitemclass, logMetadata)
					}

					const param = {bctypeitemclass_id: rowitemclass.bctypeitemclass_id}
					const cmd = sqlUtil.createDeleteCommand(itemclassTableName, ['bctypeitemclass_id'])
					const deletedRow = await cmd.execute(param)

					// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
					if (typeof Extender.itemclassDeleted === 'function') {
						// export async function itemclassDeleted(self, tx, deletedRow, logMetadata) {}
						await Extender.itemclassDeleted(self, tx, deletedRow, logMetadata)
					}					

					bctype_log(self, body, startTime, itemclassTableName, rowitemclass.bctypeitemclass_id, 'DELETE', {rowdata: deletedRow})
					bctype_log(self, body, startTime, headerTableName, rowitemclass.bctype_id, 'DELETE ROW ITEMCLASS', {bctypeitemclass_id: rowitemclass.bctypeitemclass_id, tablename: itemclassTableName}, `removed: ${rowitemclass.bctypeitemclass_id}`)


				}	
			}

			// hapus data dept
			{
				const sql = `select * from ${deptTableName} where bctype_id=\${bctype_id}`
				const rows = await tx.any(sql, dataToRemove)
				for (let rowdept of rows) {
					// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
					if (typeof Extender.deptDeleting === 'function') {
						// export async function deptDeleting(self, tx, rowdept, logMetadata) {}
						await Extender.deptDeleting(self, tx, rowdept, logMetadata)
					}

					const param = {bctypedept_id: rowdept.bctypedept_id}
					const cmd = sqlUtil.createDeleteCommand(deptTableName, ['bctypedept_id'])
					const deletedRow = await cmd.execute(param)

					// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
					if (typeof Extender.deptDeleted === 'function') {
						// export async function deptDeleted(self, tx, deletedRow, logMetadata) {}
						await Extender.deptDeleted(self, tx, deletedRow, logMetadata)
					}					

					bctype_log(self, body, startTime, deptTableName, rowdept.bctypedept_id, 'DELETE', {rowdata: deletedRow})
					bctype_log(self, body, startTime, headerTableName, rowdept.bctype_id, 'DELETE ROW DEPT', {bctypedept_id: rowdept.bctypedept_id, tablename: deptTableName}, `removed: ${rowdept.bctypedept_id}`)


				}	
			}

			
			

			// hapus data header
			const cmd = sqlUtil.createDeleteCommand(tablename, ['bctype_id'])
			const deletedRow = await cmd.execute(dataToRemove)

			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender headerDeleted
			if (typeof Extender.headerDeleted === 'function') {
				// export async function headerDeleted(self, tx, ret, logMetadata) {}
				await Extender.headerDeleted(self, tx, ret, logMetadata)
			}

			// record log
			bctype_log(self, body, startTime, tablename, id, 'DELETE', logMetadata)

			return deletedRow
		})
	

		return deletedRow
	} catch (err) {
		throw err
	}
}



// coa	

async function bctype_coaList(self, body) {
	const tablename = coaTableName
	const { criteria={}, limit=0, offset=0, columns=[], sort={} } = body
	const searchMap = {
		bctype_id: `bctype_id=try_cast_bigint(\${bctype_id}, 0)`,
	};


	try {
	
		// hilangkan criteria '' atau null
		for (var cname in criteria) {
			if (criteria[cname]==='' || criteria[cname]===null) {
				delete criteria[cname]
			}
		}

		const args = { db, criteria }

		// apabila ada keperluan untuk recompose criteria
		if (typeof Extender.coaListCriteria === 'function') {
			// export async function coaListCriteria(self, db, searchMap, criteria, sort, columns, args) {}
			await Extender.coaListCriteria(self, db, searchMap, criteria, sort, columns, args)
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

			// lookup: bccoaclass_name dari field bccoaclass_name pada table act.bccoaclass dimana (act.bccoaclass.bccoaclass_id = act.bctype.bccoaclass_id)
			{
				const { bccoaclass_name } = await sqlUtil.lookupdb(db, 'act.bccoaclass', 'bccoaclass_id', row.bccoaclass_id)
				row.bccoaclass_name = bccoaclass_name
			}
			// lookup: curr_code dari field curr_code pada table ent.curr dimana (ent.curr.curr_id = act.bctype.curr_id)
			{
				const { curr_code } = await sqlUtil.lookupdb(db, 'ent.curr', 'curr_id', row.curr_id)
				row.curr_code = curr_code
			}
			// lookup: coa_name dari field coa_name pada table act.coa dimana (act.coa.coa_id = act.bctype.coa_id)
			{
				const { coa_name } = await sqlUtil.lookupdb(db, 'act.coa', 'coa_id', row.coa_id)
				row.coa_name = coa_name
			}
			

			// pasang extender di sini
			if (typeof Extender.detilListRow === 'function') {
				// export async function detilListRow(self, row, args) {}
				await Extender.detilListRow(self, row, args)
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

async function bctype_coaOpen(self, body) {
	const tablename = coaTableName

	try {
		const { id } = body 
		const criteria = { bctypecoa_id: id }
		const searchMap = { bctypecoa_id: `bctypecoa_id = \${bctypecoa_id}`}
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


		// lookup: bccoaclass_name dari field bccoaclass_name pada table act.bccoaclass dimana (act.bccoaclass.bccoaclass_id = act.bctype.bccoaclass_id)
		{
			const { bccoaclass_name } = await sqlUtil.lookupdb(db, 'act.bccoaclass', 'bccoaclass_id', data.bccoaclass_id)
			data.bccoaclass_name = bccoaclass_name
		}
		// lookup: curr_code dari field curr_code pada table ent.curr dimana (ent.curr.curr_id = act.bctype.curr_id)
		{
			const { curr_code } = await sqlUtil.lookupdb(db, 'ent.curr', 'curr_id', data.curr_id)
			data.curr_code = curr_code
		}
		// lookup: coa_name dari field coa_name pada table act.coa dimana (act.coa.coa_id = act.bctype.coa_id)
		{
			const { coa_name } = await sqlUtil.lookupdb(db, 'act.coa', 'coa_id', data.coa_id)
			data.coa_name = coa_name
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
		// export async function coaOpen(self, db, data) {}
		if (typeof Extender.coaOpen === 'function') {
			// export async function coaOpen(self, db, data) {}
			await Extender.coaOpen(self, db, data)
		}

		return data
	} catch (err) {
		throw err
	}
}

async function bctype_coaCreate(self, body) {
	const { source='bctype', data={} } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint();
	const tablename = coaTableName

	try {

		// parse uploaded data
		const files = Api.parseUploadData(data, req.files)


		data._createby = user_id
		data._createdate = (new Date()).toISOString()

		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)


			const args = { 
				section: 'coa', 
				prefix: ''	
			}

			const sequencer = createSequencerLine(tx, {})


			if (typeof Extender.sequencerSetup === 'function') {
				// jika ada keperluan menambahkan code block/cluster di sequencer
				// dapat diimplementasikan di exterder sequencerSetup 
				// export async function sequencerSetup(self, tx, sequencer, data, args) {}
				await Extender.sequencerSetup(self, tx, sequencer, data, args)
			}


			const seqdata = await sequencer.increment(args.prefix)
			data.bctypecoa_id = seqdata.id

			// apabila ada keperluan pengolahan data SEBELUM disimpan
			if (typeof Extender.coaCreating === 'function') {
				// export async function coaCreating(self, tx, data, seqdata, args) {}
				await Extender.coaCreating(self, tx, data, seqdata, args)
			}

			const cmd = sqlUtil.createInsertCommand(tablename, data)
			const ret = await cmd.execute(data)
			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.coaCreated === 'function') {
				// export async function coaCreated(self, tx, ret, data, logMetadata, args) {}
				await Extender.coaCreated(self, tx, ret, data, logMetadata, args)
			}

			// record log
			bctype_log(self, body, startTime, tablename, ret.bctypecoa_id, 'CREATE', logMetadata)

			return ret
		})

		return result
	} catch (err) {
		throw err
	}
}

async function bctype_coaUpdate(self, body) {
	const { source='bctype', data={} } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = coaTableName

	try {

		// parse uploaded data
		const files = Api.parseUploadData(data, req.files)


		data._modifyby = user_id
		data._modifydate = (new Date()).toISOString()

		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)


			// apabila ada keperluan pengolahan data SEBELUM disimpan
			if (typeof Extender.coaUpdating === 'function') {
				// export async function coaUpdating(self, tx, data) {}
				await Extender.coaUpdating(self, tx, data)
			}			
			
			const cmd =  sqlUtil.createUpdateCommand(tablename, data, ['bctypecoa_id'])
			const ret = await cmd.execute(data)
			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.coaUpdated === 'function') {
				// export async function coaUpdated(self, tx, ret, data, logMetadata) {}
				await Extender.coaUpdated(self, tx, ret, data, logMetadata)
			}

			// record log
			bctype_log(self, body, startTime, tablename, data.bctypecoa_id, 'UPDATE', logMetadata)

			return ret
		})
	
		return result
	} catch (err) {
		throw err
	}
}

async function bctype_coaDelete(self, body) {
	const { source, id } = body 
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = coaTableName

	try {

		const deletedRow = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			const dataToRemove = {bctypecoa_id: id}
			const sql = `select * from ${coaTableName} where bctypecoa_id=\${bctypecoa_id}`
			const rowcoa = await tx.oneOrNone(sql, dataToRemove)


			// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
			if (typeof Extender.coaDeleting === 'function') {
				// export async function coaDeleting(self, tx, rowcoa, logMetadata) {}
				await Extender.coaDeleting(self, tx, rowcoa, logMetadata)
			}

			const param = {bctypecoa_id: rowcoa.bctypecoa_id}
			const cmd = sqlUtil.createDeleteCommand(coaTableName, ['bctypecoa_id'])
			const deletedRow = await cmd.execute(param)

			// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
			if (typeof Extender.coaDeleted === 'function') {
				// export async function coaDeleted(self, tx, deletedRow, logMetadata) {}
				await Extender.coaDeleted(self, tx, deletedRow, logMetadata)
			}					

			bctype_log(self, body, startTime, coaTableName, rowcoa.bctypecoa_id, 'DELETE', {rowdata: deletedRow})
			bctype_log(self, body, startTime, headerTableName, rowcoa.bctype_id, 'DELETE ROW COA', {bctypecoa_id: rowcoa.bctypecoa_id, tablename: coaTableName}, `removed: ${rowcoa.bctypecoa_id}`)

			return deletedRow
		})
	

		return deletedRow
	} catch (err) {
		throw err
	}
}

async function bctype_coaDeleteRows(self, body) {
	const { data } = body 
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint();
	const tablename = coaTableName


	try {
		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			for (let id of data) {
				const dataToRemove = {bctypecoa_id: id}
				const sql = `select * from ${coaTableName} where bctypecoa_id=\${bctypecoa_id}`
				const rowcoa = await tx.oneOrNone(sql, dataToRemove)

				// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
				if (typeof Extender.coaDeleting === 'function') {
					// async function coaDeleting(self, tx, rowcoa, logMetadata) {}
					await Extender.coaDeleting(self, tx, rowcoa, logMetadata)
				}

				const param = {bctypecoa_id: rowcoa.bctypecoa_id}
				const cmd = sqlUtil.createDeleteCommand(coaTableName, ['bctypecoa_id'])
				const deletedRow = await cmd.execute(param)

				// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
				if (typeof Extender.coaDeleted === 'function') {
					// export async function coaDeleted(self, tx, deletedRow, logMetadata) {}
					await Extender.coaDeleted(self, tx, deletedRow, logMetadata)
				}					

				bctype_log(self, body, startTime, coaTableName, rowcoa.bctypecoa_id, 'DELETE', {rowdata: deletedRow})
				bctype_log(self, body, startTime, headerTableName, rowcoa.bctype_id, 'DELETE ROW COA', {bctypecoa_id: rowcoa.bctypecoa_id, tablename: coaTableName}, `removed: ${rowcoa.bctypecoa_id}`)
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


// itemclass	

async function bctype_itemclassList(self, body) {
	const tablename = itemclassTableName
	const { criteria={}, limit=0, offset=0, columns=[], sort={} } = body
	const searchMap = {
		bctype_id: `bctype_id=try_cast_bigint(\${bctype_id}, 0)`,
	};


	try {
	
		// hilangkan criteria '' atau null
		for (var cname in criteria) {
			if (criteria[cname]==='' || criteria[cname]===null) {
				delete criteria[cname]
			}
		}

		const args = { db, criteria }

		// apabila ada keperluan untuk recompose criteria
		if (typeof Extender.itemclassListCriteria === 'function') {
			// export async function itemclassListCriteria(self, db, searchMap, criteria, sort, columns, args) {}
			await Extender.itemclassListCriteria(self, db, searchMap, criteria, sort, columns, args)
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

			// lookup: itemclass_name dari field itemclass_name pada table act.itemclass dimana (act.itemclass.itemclass_id = act.bctype.itemclass_id)
			{
				const { itemclass_name } = await sqlUtil.lookupdb(db, 'act.itemclass', 'itemclass_id', row.itemclass_id)
				row.itemclass_name = itemclass_name
			}
			

			// pasang extender di sini
			if (typeof Extender.detilListRow === 'function') {
				// export async function detilListRow(self, row, args) {}
				await Extender.detilListRow(self, row, args)
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

async function bctype_itemclassOpen(self, body) {
	const tablename = itemclassTableName

	try {
		const { id } = body 
		const criteria = { bctypeitemclass_id: id }
		const searchMap = { bctypeitemclass_id: `bctypeitemclass_id = \${bctypeitemclass_id}`}
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


		// lookup: itemclass_name dari field itemclass_name pada table act.itemclass dimana (act.itemclass.itemclass_id = act.bctype.itemclass_id)
		{
			const { itemclass_name } = await sqlUtil.lookupdb(db, 'act.itemclass', 'itemclass_id', data.itemclass_id)
			data.itemclass_name = itemclass_name
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
		// export async function itemclassOpen(self, db, data) {}
		if (typeof Extender.itemclassOpen === 'function') {
			// export async function itemclassOpen(self, db, data) {}
			await Extender.itemclassOpen(self, db, data)
		}

		return data
	} catch (err) {
		throw err
	}
}

async function bctype_itemclassCreate(self, body) {
	const { source='bctype', data={} } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint();
	const tablename = itemclassTableName

	try {

		// parse uploaded data
		const files = Api.parseUploadData(data, req.files)


		data._createby = user_id
		data._createdate = (new Date()).toISOString()

		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)


			const args = { 
				section: 'itemclass', 
				prefix: ''	
			}

			const sequencer = createSequencerLine(tx, {})


			if (typeof Extender.sequencerSetup === 'function') {
				// jika ada keperluan menambahkan code block/cluster di sequencer
				// dapat diimplementasikan di exterder sequencerSetup 
				// export async function sequencerSetup(self, tx, sequencer, data, args) {}
				await Extender.sequencerSetup(self, tx, sequencer, data, args)
			}


			const seqdata = await sequencer.increment(args.prefix)
			data.bctypeitemclass_id = seqdata.id

			// apabila ada keperluan pengolahan data SEBELUM disimpan
			if (typeof Extender.itemclassCreating === 'function') {
				// export async function itemclassCreating(self, tx, data, seqdata, args) {}
				await Extender.itemclassCreating(self, tx, data, seqdata, args)
			}

			const cmd = sqlUtil.createInsertCommand(tablename, data)
			const ret = await cmd.execute(data)
			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.itemclassCreated === 'function') {
				// export async function itemclassCreated(self, tx, ret, data, logMetadata, args) {}
				await Extender.itemclassCreated(self, tx, ret, data, logMetadata, args)
			}

			// record log
			bctype_log(self, body, startTime, tablename, ret.bctypeitemclass_id, 'CREATE', logMetadata)

			return ret
		})

		return result
	} catch (err) {
		throw err
	}
}

async function bctype_itemclassUpdate(self, body) {
	const { source='bctype', data={} } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = itemclassTableName

	try {

		// parse uploaded data
		const files = Api.parseUploadData(data, req.files)


		data._modifyby = user_id
		data._modifydate = (new Date()).toISOString()

		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)


			// apabila ada keperluan pengolahan data SEBELUM disimpan
			if (typeof Extender.itemclassUpdating === 'function') {
				// export async function itemclassUpdating(self, tx, data) {}
				await Extender.itemclassUpdating(self, tx, data)
			}			
			
			const cmd =  sqlUtil.createUpdateCommand(tablename, data, ['bctypeitemclass_id'])
			const ret = await cmd.execute(data)
			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.itemclassUpdated === 'function') {
				// export async function itemclassUpdated(self, tx, ret, data, logMetadata) {}
				await Extender.itemclassUpdated(self, tx, ret, data, logMetadata)
			}

			// record log
			bctype_log(self, body, startTime, tablename, data.bctypeitemclass_id, 'UPDATE', logMetadata)

			return ret
		})
	
		return result
	} catch (err) {
		throw err
	}
}

async function bctype_itemclassDelete(self, body) {
	const { source, id } = body 
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = itemclassTableName

	try {

		const deletedRow = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			const dataToRemove = {bctypeitemclass_id: id}
			const sql = `select * from ${itemclassTableName} where bctypeitemclass_id=\${bctypeitemclass_id}`
			const rowitemclass = await tx.oneOrNone(sql, dataToRemove)


			// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
			if (typeof Extender.itemclassDeleting === 'function') {
				// export async function itemclassDeleting(self, tx, rowitemclass, logMetadata) {}
				await Extender.itemclassDeleting(self, tx, rowitemclass, logMetadata)
			}

			const param = {bctypeitemclass_id: rowitemclass.bctypeitemclass_id}
			const cmd = sqlUtil.createDeleteCommand(itemclassTableName, ['bctypeitemclass_id'])
			const deletedRow = await cmd.execute(param)

			// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
			if (typeof Extender.itemclassDeleted === 'function') {
				// export async function itemclassDeleted(self, tx, deletedRow, logMetadata) {}
				await Extender.itemclassDeleted(self, tx, deletedRow, logMetadata)
			}					

			bctype_log(self, body, startTime, itemclassTableName, rowitemclass.bctypeitemclass_id, 'DELETE', {rowdata: deletedRow})
			bctype_log(self, body, startTime, headerTableName, rowitemclass.bctype_id, 'DELETE ROW ITEMCLASS', {bctypeitemclass_id: rowitemclass.bctypeitemclass_id, tablename: itemclassTableName}, `removed: ${rowitemclass.bctypeitemclass_id}`)

			return deletedRow
		})
	

		return deletedRow
	} catch (err) {
		throw err
	}
}

async function bctype_itemclassDeleteRows(self, body) {
	const { data } = body 
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint();
	const tablename = itemclassTableName


	try {
		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			for (let id of data) {
				const dataToRemove = {bctypeitemclass_id: id}
				const sql = `select * from ${itemclassTableName} where bctypeitemclass_id=\${bctypeitemclass_id}`
				const rowitemclass = await tx.oneOrNone(sql, dataToRemove)

				// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
				if (typeof Extender.itemclassDeleting === 'function') {
					// async function itemclassDeleting(self, tx, rowitemclass, logMetadata) {}
					await Extender.itemclassDeleting(self, tx, rowitemclass, logMetadata)
				}

				const param = {bctypeitemclass_id: rowitemclass.bctypeitemclass_id}
				const cmd = sqlUtil.createDeleteCommand(itemclassTableName, ['bctypeitemclass_id'])
				const deletedRow = await cmd.execute(param)

				// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
				if (typeof Extender.itemclassDeleted === 'function') {
					// export async function itemclassDeleted(self, tx, deletedRow, logMetadata) {}
					await Extender.itemclassDeleted(self, tx, deletedRow, logMetadata)
				}					

				bctype_log(self, body, startTime, itemclassTableName, rowitemclass.bctypeitemclass_id, 'DELETE', {rowdata: deletedRow})
				bctype_log(self, body, startTime, headerTableName, rowitemclass.bctype_id, 'DELETE ROW ITEMCLASS', {bctypeitemclass_id: rowitemclass.bctypeitemclass_id, tablename: itemclassTableName}, `removed: ${rowitemclass.bctypeitemclass_id}`)
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


// dept	

async function bctype_deptList(self, body) {
	const tablename = deptTableName
	const { criteria={}, limit=0, offset=0, columns=[], sort={} } = body
	const searchMap = {
		bctype_id: `bctype_id=try_cast_bigint(\${bctype_id}, 0)`,
	};


	try {
	
		// hilangkan criteria '' atau null
		for (var cname in criteria) {
			if (criteria[cname]==='' || criteria[cname]===null) {
				delete criteria[cname]
			}
		}

		const args = { db, criteria }

		// apabila ada keperluan untuk recompose criteria
		if (typeof Extender.deptListCriteria === 'function') {
			// export async function deptListCriteria(self, db, searchMap, criteria, sort, columns, args) {}
			await Extender.deptListCriteria(self, db, searchMap, criteria, sort, columns, args)
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

			// lookup: dept_name dari field dept_name pada table ent.dept dimana (ent.dept.dept_id = act.bctype.dept_id)
			{
				const { dept_name } = await sqlUtil.lookupdb(db, 'ent.dept', 'dept_id', row.dept_id)
				row.dept_name = dept_name
			}
			

			// pasang extender di sini
			if (typeof Extender.detilListRow === 'function') {
				// export async function detilListRow(self, row, args) {}
				await Extender.detilListRow(self, row, args)
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

async function bctype_deptOpen(self, body) {
	const tablename = deptTableName

	try {
		const { id } = body 
		const criteria = { bctypedept_id: id }
		const searchMap = { bctypedept_id: `bctypedept_id = \${bctypedept_id}`}
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


		// lookup: dept_name dari field dept_name pada table ent.dept dimana (ent.dept.dept_id = act.bctype.dept_id)
		{
			const { dept_name } = await sqlUtil.lookupdb(db, 'ent.dept', 'dept_id', data.dept_id)
			data.dept_name = dept_name
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
		// export async function deptOpen(self, db, data) {}
		if (typeof Extender.deptOpen === 'function') {
			// export async function deptOpen(self, db, data) {}
			await Extender.deptOpen(self, db, data)
		}

		return data
	} catch (err) {
		throw err
	}
}

async function bctype_deptCreate(self, body) {
	const { source='bctype', data={} } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint();
	const tablename = deptTableName

	try {

		// parse uploaded data
		const files = Api.parseUploadData(data, req.files)


		data._createby = user_id
		data._createdate = (new Date()).toISOString()

		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)


			const args = { 
				section: 'dept', 
				prefix: ''	
			}

			const sequencer = createSequencerLine(tx, {})


			if (typeof Extender.sequencerSetup === 'function') {
				// jika ada keperluan menambahkan code block/cluster di sequencer
				// dapat diimplementasikan di exterder sequencerSetup 
				// export async function sequencerSetup(self, tx, sequencer, data, args) {}
				await Extender.sequencerSetup(self, tx, sequencer, data, args)
			}


			const seqdata = await sequencer.increment(args.prefix)
			data.bctypedept_id = seqdata.id

			// apabila ada keperluan pengolahan data SEBELUM disimpan
			if (typeof Extender.deptCreating === 'function') {
				// export async function deptCreating(self, tx, data, seqdata, args) {}
				await Extender.deptCreating(self, tx, data, seqdata, args)
			}

			const cmd = sqlUtil.createInsertCommand(tablename, data)
			const ret = await cmd.execute(data)
			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.deptCreated === 'function') {
				// export async function deptCreated(self, tx, ret, data, logMetadata, args) {}
				await Extender.deptCreated(self, tx, ret, data, logMetadata, args)
			}

			// record log
			bctype_log(self, body, startTime, tablename, ret.bctypedept_id, 'CREATE', logMetadata)

			return ret
		})

		return result
	} catch (err) {
		throw err
	}
}

async function bctype_deptUpdate(self, body) {
	const { source='bctype', data={} } = body
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = deptTableName

	try {

		// parse uploaded data
		const files = Api.parseUploadData(data, req.files)


		data._modifyby = user_id
		data._modifydate = (new Date()).toISOString()

		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)


			// apabila ada keperluan pengolahan data SEBELUM disimpan
			if (typeof Extender.deptUpdating === 'function') {
				// export async function deptUpdating(self, tx, data) {}
				await Extender.deptUpdating(self, tx, data)
			}			
			
			const cmd =  sqlUtil.createUpdateCommand(tablename, data, ['bctypedept_id'])
			const ret = await cmd.execute(data)
			
			const logMetadata = {}

			// apabila ada keperluan pengelohan data setelah disimpan, lakukan di extender headerCreated
			if (typeof Extender.deptUpdated === 'function') {
				// export async function deptUpdated(self, tx, ret, data, logMetadata) {}
				await Extender.deptUpdated(self, tx, ret, data, logMetadata)
			}

			// record log
			bctype_log(self, body, startTime, tablename, data.bctypedept_id, 'UPDATE', logMetadata)

			return ret
		})
	
		return result
	} catch (err) {
		throw err
	}
}

async function bctype_deptDelete(self, body) {
	const { source, id } = body 
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint()
	const tablename = deptTableName

	try {

		const deletedRow = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			const dataToRemove = {bctypedept_id: id}
			const sql = `select * from ${deptTableName} where bctypedept_id=\${bctypedept_id}`
			const rowdept = await tx.oneOrNone(sql, dataToRemove)


			// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
			if (typeof Extender.deptDeleting === 'function') {
				// export async function deptDeleting(self, tx, rowdept, logMetadata) {}
				await Extender.deptDeleting(self, tx, rowdept, logMetadata)
			}

			const param = {bctypedept_id: rowdept.bctypedept_id}
			const cmd = sqlUtil.createDeleteCommand(deptTableName, ['bctypedept_id'])
			const deletedRow = await cmd.execute(param)

			// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
			if (typeof Extender.deptDeleted === 'function') {
				// export async function deptDeleted(self, tx, deletedRow, logMetadata) {}
				await Extender.deptDeleted(self, tx, deletedRow, logMetadata)
			}					

			bctype_log(self, body, startTime, deptTableName, rowdept.bctypedept_id, 'DELETE', {rowdata: deletedRow})
			bctype_log(self, body, startTime, headerTableName, rowdept.bctype_id, 'DELETE ROW DEPT', {bctypedept_id: rowdept.bctypedept_id, tablename: deptTableName}, `removed: ${rowdept.bctypedept_id}`)

			return deletedRow
		})
	

		return deletedRow
	} catch (err) {
		throw err
	}
}

async function bctype_deptDeleteRows(self, body) {
	const { data } = body 
	const req = self.req
	const user_id = req.session.user.userId
	const startTime = process.hrtime.bigint();
	const tablename = deptTableName


	try {
		const result = await db.tx(async tx=>{
			sqlUtil.connect(tx)

			for (let id of data) {
				const dataToRemove = {bctypedept_id: id}
				const sql = `select * from ${deptTableName} where bctypedept_id=\${bctypedept_id}`
				const rowdept = await tx.oneOrNone(sql, dataToRemove)

				// apabila ada keperluan pengelohan data sebelum dihapus, lakukan di extender
				if (typeof Extender.deptDeleting === 'function') {
					// async function deptDeleting(self, tx, rowdept, logMetadata) {}
					await Extender.deptDeleting(self, tx, rowdept, logMetadata)
				}

				const param = {bctypedept_id: rowdept.bctypedept_id}
				const cmd = sqlUtil.createDeleteCommand(deptTableName, ['bctypedept_id'])
				const deletedRow = await cmd.execute(param)

				// apabila ada keperluan pengelohan data setelah dihapus, lakukan di extender
				if (typeof Extender.deptDeleted === 'function') {
					// export async function deptDeleted(self, tx, deletedRow, logMetadata) {}
					await Extender.deptDeleted(self, tx, deletedRow, logMetadata)
				}					

				bctype_log(self, body, startTime, deptTableName, rowdept.bctypedept_id, 'DELETE', {rowdata: deletedRow})
				bctype_log(self, body, startTime, headerTableName, rowdept.bctype_id, 'DELETE ROW DEPT', {bctypedept_id: rowdept.bctypedept_id, tablename: deptTableName}, `removed: ${rowdept.bctypedept_id}`)
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

	