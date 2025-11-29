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

