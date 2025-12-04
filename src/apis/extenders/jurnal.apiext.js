import sqlUtil from '@agung_dhewe/pgsqlc'


function excludeNonEditableHeader(data) {
	//  data ini tidak bisa diisi saat insert
	delete data.iscommit
	delete data.ispost
	delete data._postby
	delete data._postdate
	delete data._commitby
	delete data._commitdate
}

function excludeNonEditableDetil(data) {
	delete data.jurnaldetil_id_ref
	delete data.jurnaldetil_ishead
	
}

export async function headerListCriteria(self, db, searchMap, criteria, sort, columns) {
	if (criteria.postedstatus_id!==undefined) {
		criteria.ispost = criteria.postedstatus_id=='POSTED' ? true : false;
		searchMap.ispost = 'ispost = ${ispost}'

		delete criteria.postedstatus_id;
	}


	searchMap.periode_id = 'periode_id = ${periode_id}'
	searchMap.jurnaltype_id = 'jurnaltype_id = ${jurnaltype_id}'
}


export async function headerCreating(self, tx, data, seqdata) {
	// buang data yang tidak boleh dimodif user
	excludeNonEditableHeader(data)

	data.jurnal_doc = seqdata.doc;

}


export async function headerUpdating(self, tx, data) {
	// buang data yang tidak boleh dimodif user
	excludeNonEditableHeader(data)

}

export async function headerOpen(self, db, data) {
	const req = self.req
	const user_id = req.session.user.userId
	const jurnaltype_id = data.jurnaltype_id

	// ambil data tipe jurnal
	data.jurnaltype = await sqlUtil.lookupdb(db, 'act.jurnaltype', 'jurnaltype_id', jurnaltype_id)

	// dapatkan informasi payment type
	data.paymtype = await sqlUtil.lookupdb(db, 'act.paymtype', 'paymtype_id', data.paymtype_id)


	// dapatkan informasi closing periode
	const periode = await sqlUtil.lookupdb(db, 'act.periode', 'periode_id', data.periode_id)
	data.periode_isclosed = periode.periode_isclosed


	// dapatkan informasi postby
	const { user_fullname } = await sqlUtil.lookupdb(db, 'core.user', 'user_id', data._postby)
	data._postby = user_fullname ?? ''


	// dapatkan informasi apakah boleh posting, unposting
	const sqlJurnaltypeuser = 'select isallowposting, isallowunposting from act.jurnaltypeuser where jurnaltype_id=${jurnaltype_id} and user_id=${user_id}'
	const row = await db.oneOrNone(sqlJurnaltypeuser, {jurnaltype_id, user_id})
	if (row==null) {
		data.isallowposting = false
		data.isallowunposting = false
	} else {
		data.isallowposting = row.isallowposting
		data.isallowunposting = row.isallowunposting	
	}


}

export async function sequencerSetup(self, tx, sequencer, data, args) {
	try {
		const { jurnaltype_id } = data

		const sql = 'select jurnaltype_code from act.jurnaltype where jurnaltype_id=${jurnaltype_id}'
		const row = await tx.oneOrNone(sql, { jurnaltype_id })
		if (row!=null) {
			args.prefix = row.jurnaltype_code
		}
	} catch (err) {
		throw err
	}
}

export async function detilCreating(self, tx, data, seqdata, args) {

	// exclude jurnaldetil_id_ref dari proses penyimpanan
	delete data.jurnaldetil_id_ref

	// jika agingtype_id='' set jadi null
	if (data.agingtype_id=='') {
		data.agingtype_id = null
	}


}


