import sqlUtil from '@agung_dhewe/pgsqlc'

function getYearMonthInt(year, month) {
  const yy = String(year).slice(-2); // Ambil dua digit terakhir dari tahun
  const mm = String(month).padStart(2, '0'); // Pastikan bulan dua digit
  return parseInt(`${yy}${mm}`, 10); // Gabungkan dan konversi ke integer
}

export async function headerCreating(self, tx, data) {
	const year = data.periode_year
	const month = data.periode_month
	data.periode_id = getYearMonthInt(year, month)
	data.periode_closeby = null
	data.periode_closedate = null
}


export async function headerListCriteria(self, db, searchMap, criteria, sort, columns) {
	searchMap.periode_isclosed = 'periode_isclosed=${periode_isclosed}'
	searchMap.periode_isactive = 'periode_isactive=${periode_isactive}'
}


export async function headerOpen(self, db, data) {
	// cek periode sebelumnya
	{
		const previous_periode = await sqlUtil.lookupdb(db, 'act.periode', 'periode_id', data.previous_periode_id)
		data.previous_periode_isclosed = previous_periode.periode_isclosed
	}

	// next periode
	{
		const next_periode = await sqlUtil.lookupdb(db, 'act.periode', 'previous_periode_id', data.periode_id)
		data.next_periode_isclosed = next_periode.periode_isclosed
	}


}
