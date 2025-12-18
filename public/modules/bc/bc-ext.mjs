import Context from './bc-context.mjs'

export async function init(self, args) {
	console.log('initializing bcExtender ...')

}


export function headerList_initSearchParams(self, SearchParams) {
	SearchParams['dept_id'].addEventListener('selecting', async (evt)=>{
		const cbo = evt.detail.sender
		const dialog = evt.detail.dialog
		const url = `${Context.appsUrls.ent.url}/dept-filtered/list-by-user`
		const sort = {}
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
				evt.detail.addRow(row.dept_id, row.dept_name, row)
			}

			dialog.setNext(result.nextoffset, result.limit)
		} catch (err) {
			$fgta5.MessageBox.error(err.message)
		} finally {
			cbo.wait(false)
		}
	})

	const { default_dept_id, default_dept_name } = Context.setting
	SearchParams['dept_id'].setSelected(default_dept_id, default_dept_name)

}


export async function bcHeaderEdit_newData(self, datainit, frm) {
	const { default_dept_id, default_dept_name } = Context.setting
	datainit.dept_id = {value: default_dept_id, text: default_dept_name}

	const obj_dept_id = frm.Inputs['bcHeaderEdit-obj_dept_id']
	const obj_bctype_id = frm.Inputs['bcHeaderEdit-obj_bctype_id']

	obj_dept_id.disabled = false
	obj_bctype_id.disabled = false
}

export async function bcHeaderEdit_dataSaved(self, data, frm) {
	const obj_dept_id = frm.Inputs['bcHeaderEdit-obj_dept_id']
	const obj_bctype_id = frm.Inputs['bcHeaderEdit-obj_bctype_id']

	obj_dept_id.disabled = true
	obj_bctype_id.disabled = true

}

export async function bcHeaderEdit_formOpened(self, frm, CurrentState) {
	const obj_dept_id = frm.Inputs['bcHeaderEdit-obj_dept_id']
	const obj_bctype_id = frm.Inputs['bcHeaderEdit-obj_bctype_id']

	obj_dept_id.disabled = true
	obj_bctype_id.disabled = true
}

export function obj_bctype_id_selecting_criteria(self, obj_bctype_id, frm, criteria, sort, evt) {
	const dept_id = frm.Inputs['bcHeaderEdit-obj_dept_id'].value
	criteria.dept_id = dept_id
}

export async function obj_dept_id_selected(self, obj_dept_id, frm, evt) {
	if (!obj_dept_id.isSelectedChanged()) {
		return
	}

	const obj_bctype_id = frm.Inputs['bcHeaderEdit-obj_bctype_id']
	const obj_curr_id = frm.Inputs['bcHeaderEdit-obj_curr_id']
	const obj_coa_id = frm.Inputs['bcHeaderEdit-obj_coa_id']
	const obj_paymreqtype_id = frm.Inputs['bcHeaderEdit-obj_paymreqtype_id']
	const obj_approvaltype_id = frm.Inputs['bcHeaderEdit-obj_approvaltype_id']

	obj_bctype_id.setSelected(null)
	obj_curr_id.setSelected(null)
	obj_coa_id.setSelected(null)
	obj_approvaltype_id.value = ''
	obj_paymreqtype_id.value = ''
	

}

export async function obj_bctype_id_selected(self, obj_bctype_id, frm, evt) {
	if (!obj_bctype_id.isSelectedChanged()) {
		return
	}

	const { approvaltype_id, paymreqtype_id } = evt.detail.data
	const obj_approvaltype_id = frm.Inputs['bcHeaderEdit-obj_approvaltype_id']
	const obj_paymreqtype_id = frm.Inputs['bcHeaderEdit-obj_paymreqtype_id']
	const obj_curr_id = frm.Inputs['bcHeaderEdit-obj_curr_id']
	const obj_coa_id = frm.Inputs['bcHeaderEdit-obj_coa_id']

	obj_curr_id.setSelected(null)
	obj_coa_id.setSelected(null)
	obj_approvaltype_id.value = approvaltype_id
	obj_paymreqtype_id.value = paymreqtype_id

}	


export function obj_curr_id_selecting_criteria(self, obj_curr_id, frm, criteria, sort, evt) {
	const obj_bctype_id = frm.Inputs['bcHeaderEdit-obj_bctype_id']
	criteria.bctype_id = obj_bctype_id.value
}

export async function obj_curr_id_selected(self, obj_curr_id, frm, evt) {
	const { coa_id, coa_name } = evt.detail.data
	const obj_coa_id = frm.Inputs['bcHeaderEdit-obj_coa_id']
	obj_coa_id.setSelected(coa_id, coa_name)
}