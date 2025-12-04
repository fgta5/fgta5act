function formatNumber(num) {
  return new Intl.NumberFormat("en-EN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
}

function recalculateCurrency(self, frm) {
	const rate = frm.Inputs['jurnalDetilEdit-obj_curr_rate'].value
	const value = frm.Inputs['jurnalDetilEdit-obj_jurnaldetil_value'].value
	const idr = value * rate
	
	frm.Inputs['jurnalDetilEdit-obj_jurnaldetil_idr'].value = idr
}


function agingtype_changed(frm, agingtype_id) {
	if (agingtype_id==1 || agingtype_id==2) {
		frm.Inputs['jurnalDetilEdit-obj_partner_id'].markAsRequired(true)
	} else {
		frm.Inputs['jurnalDetilEdit-obj_partner_id'].markAsRequired(false)
	}

}

export function jurnalDetilList_openList(self, headerForm) {
	const data = headerForm.getData()


	// set judul section menjadi nomor dokumen dan deskription
	const detilTitleElements = document.getElementsByClassName('section-detil-title')
	const detilDescrElements = document.getElementsByClassName('section-detil-descr')
	for (let el of detilTitleElements) {
		el.innerHTML = data.jurnal_doc
	}
	for (let el of detilDescrElements) {
		el.innerHTML = data.jurnal_descr
	}
}


export function jurnalDetilEdit_formOpened(self, frm, CurrentState) {
	const agingtype_id = frm.Inputs['jurnalDetilEdit-obj_agingtype_id'].value

	agingtype_changed(frm, agingtype_id)
}

export async function jurnalDetilEdit_newData(self, datainit, frm, CurrentState) {
	const headerForm = CurrentState.getHeaderForm()
	const headerData = headerForm.getData()
	
	// nantinya bisa dimunculkan dialog, jika account is aging

	// set data init
	datainit.jurnaltype_id = headerData.jurnaltype_id


	agingtype_changed(frm, null)
	
}


export function obj_coa_id_selecting_criteria(self, obj_coa_id, frm, criteria, sort, evt) {
	evt.detail.url = 'coa-byjurnaltype/list'

	const jurnaltype_id = frm.Inputs['jurnalDetilEdit-obj_jurnaltype_id'].value

	criteria.jurnaltype_id = jurnaltype_id
	criteria.coa_isdisabled = false

}


export async function obj_coa_id_selected(self, obj_coa_id, frm, evt) {
	console.log(evt.detail.data)

	const { curr_id, agingtype_id, coa_iscurradj, isdebet, iskredit} = evt.detail.data
	frm.Inputs['jurnalDetilEdit-obj_coacurr'].value = curr_id
	frm.Inputs['jurnalDetilEdit-obj_agingtype_id'].value = agingtype_id
	frm.Inputs['jurnalDetilEdit-obj_isdebet'].value = isdebet
	frm.Inputs['jurnalDetilEdit-obj_iskredit'].value = iskredit
	frm.Inputs['jurnalDetilEdit-obj_iscurradj'].value = coa_iscurradj

	frm.Inputs['jurnalDetilEdit-obj_curr_id'].clear()
	if (curr_id!=null) {
		if (frm.Inputs['jurnalDetilEdit-obj_curr_id'].value != curr_id) {
			frm.Inputs['jurnalDetilEdit-obj_curr_id'].setSelected(null, '')
		}
	}


	agingtype_changed(frm, agingtype_id)
}


export async function obj_curr_id_populating(self, obj_curr_id, frm, evt) {
	const { tr, data, text } = evt.detail

	const td = tr.querySelector('td')
	td.style.display = 'flex'
	td.style.justifyContent = 'space-between';
	td.style.paddingRight = '10px'

	const divCode = document.createElement('div')
	divCode.innerHTML = text

	const divRate = document.createElement('div')
	divRate.innerHTML = formatNumber(data.curr_rate)

	td.innerHTML = ''
	td.appendChild(divCode)
	td.appendChild(divRate)
}

export function obj_curr_id_selecting_criteria(self, obj_curr_id, frm, criteria, sort, evt) {
	console.log('set criteria')
	const headerForm = evt.detail.CurrentState.getHeaderForm()
	const headerData = headerForm.getData() 

	const curr_id = frm.Inputs['jurnalDetilEdit-obj_coacurr'].value
	const bookdate = headerData.jurnal_date
	criteria.curr_date = bookdate


	console.log('CURR',  curr_id)


	if (curr_id!='') {
		criteria.curr_id =  curr_id
		const coa_iscurradj = frm.Inputs['jurnalDetilEdit-obj_iscurradj'].value
		if (coa_iscurradj) {
			criteria.coa_iscurradj = true
		}
	}

	sort.curr_code = 'asc' 
}


export async function obj_curr_id_selected(self, obj_curr_id, frm, evt) {
	const { data } = evt.detail

	frm.Inputs['jurnalDetilEdit-obj_curr_rate'].value = data.curr_rate
	recalculateCurrency(self, frm)
}

export async function obj_jurnaldetil_value_changed(self, obj_jurnaldetil_value, frm, evt) {
	recalculateCurrency(self, frm)
}


export async function obj_curr_rate_changed(self, obj_curr_rate, frm, evt) {
	recalculateCurrency(self, frm)
}





export async function showOutstandingReceivable(self, dlg) {
	const param = {}
	const ret = await dlg.show('Receivable', param, ()=>{
		// program untuk mengambil data outstanding dari API
	})
}

export async function showOutstandingPayable(self, dlg) {
	const param = {}
	const ret = await dlg.show('Payable', param, ()=>{
		// program untuk mengambil data outstanding dari API
	})


	// hasilnya di ret

}