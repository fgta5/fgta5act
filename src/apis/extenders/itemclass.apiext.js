import sqlUtil from '@agung_dhewe/pgsqlc'


export async function headerCreating(self, tx, data, seqdata, args) {
	if (data.itemmanage_id=='') {
		delete data.itemmanage_id
	}
}


export async function headerUpdating(self, tx, data) {
	if (data.itemmanage_id=='') {
		delete data.itemmanage_id
	}

}


export async function headerOpen(self, db, data) {
	const itemclasstype_id = data.itemclasstype_id
	data.itemclasstype = await sqlUtil.lookupdb(db, 'act.itemclasstype', 'itemclasstype_id', itemclasstype_id)
}