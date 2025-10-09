import Context from './periode-context.mjs'

export async function init(self, args) {
	console.log('initializing periodeExtender ...')

	// tambahkan extender inisiasi module periode


	/* // contoh menambahkan content dari template extender
	{
		const target = secRec.querySelector('#fRecord-section div[name="column"][exteder]')
		const tpl = document.querySelector('template[name="record-panel"]')
		if (tpl!=null) {
			const clone = tpl.content.cloneNode(true); // salin isi template
			target.prepend(clone)
		}
	}
	*/	


	// tambahkan field pada record info header
	// {
	// 	const target = secRec.querySelector('#fRecord-section div[name="column"][exteder]')
	// 	const tpl = document.querySelector('template[name="record-panel"]')
	// 	if (tpl!=null) {
	// 		const clone = tpl.content.cloneNode(true); // salin isi template
	// 		target.prepend(clone)
	// 	}
	// }

	addContentFromTemplate({
		target: '#fRecord-section div[name="column"][exteder]',
		template: 'template[name="record-panel"]'
	})

}


function addContentFromTemplate({target, template}) {
	const targetElement = document.querySelector(target)
	const tpl = document.querySelector(template)
	if (tpl!=null) {
		const clone = tpl.content.cloneNode(true); // salin isi template
		targetElement.prepend(clone)
	}
}

function getFirstDateFormatted(year, month) {
  // Bulan di JavaScript dimulai dari 0 (Januari = 0, Desember = 11)
  const firstDate = new Date(year, month - 1, 1); // Kurangi 1 karena input bulan biasanya 1-based
  const yyyy = firstDate.getFullYear();
  const mm = String(firstDate.getMonth() + 1).padStart(2, '0');
  const dd = String(firstDate.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function getLastDateFormatted(year, month) {
  // Bulan di JavaScript dimulai dari 0 (Januari = 0, Desember = 11)
  const lastDate = new Date(year, month, 0);
  const yyyy = lastDate.getFullYear();
  const mm = String(lastDate.getMonth() + 1).padStart(2, '0'); // Tambah 1 karena bulan dimulai dari 0
  const dd = String(lastDate.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function getPreviousYearMonthInt(year, month) {
  const current = new Date(year, month - 1, 1); // Bulan input 1-based
  current.setMonth(current.getMonth() - 1); // Mundur satu bulan
  const yy = String(current.getFullYear()).slice(-2); // Dua digit tahun
  const mm = String(current.getMonth() + 1).padStart(2, '0'); // Bulan dua digit
  return parseInt(`${yy}${mm}`, 10); // Konversi ke integer
}


export async function periodeHeaderEdit_autofill(self, frm) {
	const obj_periode_year = frm.Inputs['periodeHeaderEdit-obj_periode_year']
	const obj_periode_month = frm.Inputs['periodeHeaderEdit-obj_periode_month']
	const obj_periode_name = frm.Inputs['periodeHeaderEdit-obj_periode_name']
	const obj_periode_start = frm.Inputs['periodeHeaderEdit-obj_periode_start']
	const obj_periode_end = frm.Inputs['periodeHeaderEdit-obj_periode_end']
	const obj_previous_periode_id = frm.Inputs['periodeHeaderEdit-obj_previous_periode_id']

	const M = ['', 'JAN', 'FEB', 'MAR', 'APR', 'MEI', 'JUN', 'JUL', 'AGS', 'SEP', 'OKT', 'NOV', 'DES']
	const year = obj_periode_year.value
	const month = obj_periode_month.value
	const name = `${M[month]} ${year}`
	
	obj_periode_name.value = name
	obj_periode_start.value = getFirstDateFormatted(year, month)
	obj_periode_end.value = getLastDateFormatted(year, month)
	obj_previous_periode_id.value = getPreviousYearMonthInt(year, month)
}


export async function periodeHeaderEdit_newData(self, datainit, frm) {
	const obj_periode_year = frm.Inputs['periodeHeaderEdit-obj_periode_year']
	setTimeout(()=>{
			obj_periode_year.focus()
	}, 100)
}

export async function periodeHeaderEdit_addRecordInfo(self, data) {
	// TODO: isi data close by
}