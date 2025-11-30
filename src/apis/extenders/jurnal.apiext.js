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
	// ambil data tipe jurnal
	const jurnaltype = await sqlUtil.lookupdb(db, 'act.jurnaltype', 'jurnaltype_id', data.jurnaltype_id)
	data.jurnaltype = jurnaltype

	const paymtype = await sqlUtil.lookupdb(db, 'act.paymtype', 'paymtype_id', data.paymtype_id)
}


// async function getJurnaltype(tx, data, section) {
// 	if (section==='header') {
// 		const { jurnaltype_id } = data
// 		return jurnaltype_id
// 	} else {
// 		// jika berasal dari section detil, jurnaltype_id harus diambil dari headernya
// 		const { jurnal_id } = data
// 		const sql = 'select jurnaltype_id from act.jurnal where jurnal_id=${jurnal_id}'
// 		const row = await tx.oneOrNone(sql, { jurnal_id })
// 		if (row==null) {
// 			return null
// 		} 

// 		return row.jurnaltype_id
// 	}
// }


export async function sequencerSetup(self, tx, sequencer, data, args) {
	try {
		// const jurnaltype_id = await getJurnaltype(tx, data, args.section)
		// args.jurnaltype_id = jurnaltype_id


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
	// data.jurnaltype_id = args.jurnaltype_id

	delete data.jurnaldetil_id_ref
 }