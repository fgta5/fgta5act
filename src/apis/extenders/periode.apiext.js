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