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

export async function headerCreating(self, tx, data, seqdata) {
	// buang data yang tidak boleh dimodif user
	excludeNonEditableHeader(data)



}


export async function headerUpdating(self, tx, data) {
	// buang data yang tidak boleh dimodif user
	excludeNonEditableHeader(data)


}