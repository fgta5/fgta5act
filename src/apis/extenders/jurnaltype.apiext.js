export async function headerListCriteria(self, db, searchMap, criteria, sort, columns, args) {
	searchMap.jurnaltype_isallowselect = 'jurnaltype_isallowselect = ${jurnaltype_isallowselect}'

}