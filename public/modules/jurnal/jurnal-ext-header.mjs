export function headerList_initSearchParams(self, SearchParams) {
	
	// periode
	SearchParams['periode_id'].addEventListener('selecting', async (evt)=>{
		const cbo = evt.detail.sender
		const dialog = evt.detail.dialog
		const url = 'periode/header-list'
		const sort = { periode_id: 'desc' }
		const criteria = {}

		cbo.wait()
		try {
			const result = await Module.apiCall(url, {
				sort,
				criteria,
				offset: evt.detail.offset,
				limit: evt.detail.limit,
			}) 

			for (var row of result.data) {
				evt.detail.addRow(row.periode_id, row.periode_name, row)
			}

			dialog.setNext(result.nextoffset, result.limit)
		} catch (err) {
			$fgta5.MessageBox.error(err.message)
		} finally {
			cbo.wait(false)
		}

	})


	// jurnaltype
	SearchParams['jurnaltype_id'].addEventListener('selecting', async (evt)=>{
		const cbo = evt.detail.sender
		const dialog = evt.detail.dialog
		const url = 'jurnaltype/header-list'
		const sort = { jurnaltype_name: 'asc' }
		const criteria = {}

		cbo.wait()
		try {
			const result = await Module.apiCall(url, {
				sort,
				criteria,
				offset: evt.detail.offset,
				limit: evt.detail.limit,
			}) 

			for (var row of result.data) {
				evt.detail.addRow(row.jurnaltype_id, row.jurnaltype_name, row)
			}

			dialog.setNext(result.nextoffset, result.limit)
		} catch (err) {
			$fgta5.MessageBox.error(err.message)
		} finally {
			cbo.wait(false)
		}

	})


	// post status
	SearchParams['postedstatus_id'].addEventListener('selecting', async (evt)=>{
		const cbo = evt.detail.sender
		const dialog = evt.detail.dialog

		cbo.wait()
		try {
			const rows = [
				{postedstatus_id: 'POSTED', postedstatus_name:'Posted'},
				{postedstatus_id: 'UNPOSTED', postedstatus_name:'Unposted'},
			]	
			for (var row of rows) {
				evt.detail.addRow(row.postedstatus_id, row.postedstatus_name, row)
			}
		} catch (err) {
			$fgta5.MessageBox.error(err.message)
		} finally {
			cbo.wait(false)
		}

	})	
}



function formatNumber(num) {
  return new Intl.NumberFormat("en-EN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(num);
}


function recalculateCurrency(self, frm) {
	const rate = frm.Inputs['jurnalHeaderEdit-obj_frgrate'].value
	const value = frm.Inputs['jurnalHeaderEdit-obj_jurnal_value'].value
	const idr = value * rate
	
	frm.Inputs['jurnalHeaderEdit-obj_jurnal_idr'].value = idr
}


export function obj_jurnaltype_id_selecting_criteria(self, obj_jurnaltype_id, frm, criteria, sort, evt) {
	sort.jurnaltype_name = 'asc' 
}

export function obj_periode_id_selecting_criteria(self, obj_periode_id, frm, criteria, sort, evt) {
	criteria.periode_isclosed = false
	sort.periode_id = 'desc' 
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
	const bookdate = frm.Inputs['jurnalHeaderEdit-obj_jurnal_date'].value
	criteria.curr_date = bookdate	

	sort.curr_code = 'asc' 
}

export async function obj_curr_id_selected(self, obj_curr_id, frm, evt) {
	const { data } = evt.detail

	frm.Inputs['jurnalHeaderEdit-obj_frgrate'].value = data.curr_rate

	recalculateCurrency(self, frm)
}

export async function obj_jurnal_value_changed(self, obj_jurnal_value, frm, evt) {
	console.log('value changed')
	recalculateCurrency(self, frm)
}

export async function obj_frgrate_changed(self, obj_frgrate, frm, evt) {
	console.log('rate changed')
	recalculateCurrency(self, frm)
}

export function obj_coa_id_selecting_criteria(self, obj_coa_id, frm, criteria, sort, evt) {
	criteria.coa_isdisabled = false
	sort.coa_name = 'asc'
}

export function obj_unit_id_selecting_criteria(self, obj_unit_id, frm, criteria, sort, evt) {
	criteria.unit_isdisabled = false
	sort.unit_name = 'asc'
}

export function obj_site_id_selecting_criteria(self, obj_site_id, frm, criteria, sort, evt) {
	criteria.site_isdisabled = false
	sort.site_name = 'asc'
}

export function obj_dept_id_selecting_criteria(self, obj_dept_id, frm, criteria, sort, evt) {
	criteria.dept_isdisabled = false
	sort.dept_name = 'asc'
}

export function obj_partner_id_selecting_criteria(self, obj_partner_id, frm, criteria, sort, evt) {
	criteria.partner_isdisabled = false
	sort.partner_name
}

export function obj_project_id_selecting_criteria(self, obj_project_id, frm, criteria, sort, evt) {
	sort.project_name = 'asc'
}



function setVisibility(el_name, visible) {
	const el = document.getElementById(el_name)
	if (el==null) {
		return
	}

	if (visible==true) {
		el.classList.remove('hidden')
	} else {
		el.classList.add('hidden')
	}

}






function jurnaltype_changed(jurnaltype, frm) {
	return
	if (jurnaltype==null) {
		jurnaltype = {}
	} 

	setVisibility('jurnalHeaderEdit-obj_paymtype_id-container', jurnaltype.isheadhaspaymtype)
	setVisibility('jurnalHeaderEdit-obj_paymreqterm_id-container', jurnaltype.isheadhaspaymreq)
	setVisibility('jurnalHeaderEdit-obj_coa_id-container', jurnaltype.isheadhascoa)
	setVisibility('jurnalHeaderEdit-obj_dept_id-container', jurnaltype.isheadhasdept)
	setVisibility('jurnalHeaderEdit-obj_partner_id-container', jurnaltype.isheadhaspartner)
	setVisibility('jurnalHeaderEdit-obj_project_id-container', jurnaltype.isheadhasproject)
	setVisibility('jurnalHeaderEdit-obj_site_id-container', jurnaltype.isheadhassite)
	setVisibility('jurnalHeaderEdit-obj_unit_id-container', jurnaltype.isheadhasunit)
	setVisibility('jurnalHeaderEdit-obj_jurnal_idr-container', jurnaltype.isheadhasvalue)
	setVisibility('jurnalHeaderEdit-obj_frgrate-container', jurnaltype.isheadhasvalue)
	setVisibility('jurnalHeaderEdit-obj_jurnal_value-container', jurnaltype.isheadhasvalue)
	setVisibility('jurnalHeaderEdit-obj_curr_id-container', jurnaltype.isheadhasvalue)
	setVisibility('jurnalHeaderEdit-obj_jurnal_datedue-container', jurnaltype.isheadhasduedate)

	
	// set mandatofy field
	frm.Inputs['jurnalHeaderEdit-obj_partner_id'].markAsRequired(jurnaltype.isheadhaspartner)
	frm.Inputs['jurnalHeaderEdit-obj_coa_id'].markAsRequired(jurnaltype.isheadhascoa)
	frm.Inputs['jurnalHeaderEdit-obj_paymtype_id'].markAsRequired(jurnaltype.isheadhaspaymtype)
	frm.Inputs['jurnalHeaderEdit-obj_curr_id'].markAsRequired(jurnaltype.isheadhasvalue)
}



function paymtype_changed(paymtype, frm) {
	return
	if (paymtype==null) {
		paymtype = {}
	}

	setVisibility('jurnalHeaderEdit-obj_partnercontact_id-container', paymtype.ishaspartnercontact)
	setVisibility('jurnalHeaderEdit-obj_partnerbank_id-container', paymtype.ishaspartnerbankselector)
	setVisibility('jurnalHeaderEdit-obj_payment_bgno-container', paymtype.ishasgiro)
	setVisibility('jurnalHeaderEdit-obj_partnerbank_account-container', paymtype.ishasbankaccount)
	setVisibility('jurnalHeaderEdit-obj_partnerbank_accountname-container', paymtype.ishasbankaccountname)
	setVisibility('jurnalHeaderEdit-obj_partnerbank_bankname-container', paymtype.ishasbankname)

	// setmandatory field
	frm.Inputs['jurnalHeaderEdit-obj_partnerbank_id'].markAsRequired(paymtype.ishaspartnerbankselector)	
	frm.Inputs['jurnalHeaderEdit-obj_payment_bgno'].markAsRequired(paymtype.ishasgiro)	
	frm.Inputs['jurnalHeaderEdit-obj_partnerbank_account'].markAsRequired(paymtype.ishasbankaccount)	
	frm.Inputs['jurnalHeaderEdit-obj_partnerbank_accountname'].markAsRequired(paymtype.ishasbankaccountname)	
	frm.Inputs['jurnalHeaderEdit-obj_partnerbank_bankname'].markAsRequired(paymtype.ishasbankname)	

}


export async function obj_jurnaltype_id_selected(self, obj_jurnaltype_id, frm, evt) {
	if (!obj_jurnaltype_id.isSelectedChanged()) {
		return
	}

	const jurnaltype = evt.detail.data
	jurnaltype_changed(jurnaltype, frm)
	paymtype_changed(null, frm)
	
	frm.Inputs['jurnalHeaderEdit-obj_paymtype_id'].setSelected(null, '')
}

export async function obj_paymtype_id_selected(self, obj_paymtype_id, frm, evt) {
	if (!obj_paymtype_id.isSelectedChanged()) {
		return
	}

	const paymtype = evt.detail.data
	paymtype_changed(paymtype, frm)
}





export function obj_partnercontact_id_selecting_criteria(self, obj_partnercontact_id, frm, criteria, sort, evt) {
	const partner_id = frm.Inputs['jurnalHeaderEdit-obj_partner_id'].value
	criteria.partnercontact_isdisabled = false
	criteria.partner_id = partner_id ?? 0
	sort.partnercontact_name = 'asc'

}

export function obj_partnerbank_id_selecting_criteria(self, obj_partnerbank_id, frm, criteria, sort, evt) {
	const partner_id = frm.Inputs['jurnalHeaderEdit-obj_partner_id'].value
	criteria.partnerbank_isdisabled = false
	criteria.partner_id = partner_id ?? 0
	sort.partnerbank_name = 'asc'
}

export async function obj_partnerbank_id_selected(self, obj_partnerbank_id, frm, evt) {
	if (!obj_partnerbank_id.isSelectedChanged()) {
		return
	}

	const {partnerbank_account, partnerbank_accountname, partnerbank_bankname} = evt.detail.data
	frm.Inputs['jurnalHeaderEdit-obj_partnerbank_account'].value = partnerbank_account
	frm.Inputs['jurnalHeaderEdit-obj_partnerbank_accountname'].value = partnerbank_accountname
	frm.Inputs['jurnalHeaderEdit-obj_partnerbank_bankname'].value = partnerbank_bankname

}

export async function obj_partner_id_selected(self, obj_partner_id, frm, evt) {
	if (!obj_partner_id.isSelectedChanged()) {
		return
	}

	frm.Inputs['jurnalHeaderEdit-obj_partnerbank_id'].clear()
	frm.Inputs['jurnalHeaderEdit-obj_partnerbank_id'].setSelected(null)
	frm.Inputs['jurnalHeaderEdit-obj_partnerbank_account'].value = ""
	frm.Inputs['jurnalHeaderEdit-obj_partnerbank_accountname'].value = ""
	frm.Inputs['jurnalHeaderEdit-obj_partnerbank_bankname'].value = ""	

	frm.Inputs['jurnalHeaderEdit-obj_partnercontact_id'].clear()
	frm.Inputs['jurnalHeaderEdit-obj_partnercontact_id'].setSelected(null)
}


export async function jurnalHeaderEdit_formOpened(self, frm, CurrentState) {
	frm.Inputs['jurnalHeaderEdit-obj_jurnaltype_id'].disabled = true
	
	const {jurnaltype, paymtype} = frm.getOriginalData()
	jurnaltype_changed(jurnaltype, frm)
	paymtype_changed(paymtype, frm)
}

export async function jurnalHeaderEdit_dataSaved(self, data, frm) {
	frm.Inputs['jurnalHeaderEdit-obj_jurnaltype_id'].disabled = true
}

export async function jurnalHeaderEdit_newData(self, datainit, frm) {
	frm.Inputs['jurnalHeaderEdit-obj_jurnaltype_id'].disabled = false
	jurnaltype_changed(null, frm)
	paymtype_changed(null, frm)
}

