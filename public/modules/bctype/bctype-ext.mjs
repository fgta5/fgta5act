import Context from './bctype-context.mjs'
import * as pageHelper from '/public/libs/webmodule/pagehelper.mjs'


const cnt_bccoaclass = document.getElementById('bctypeCoaEdit-obj_bccoaclass_id-container')
const cnt_curr = document.getElementById('bctypeCoaEdit-obj_curr_id-container')
const cnt_approvalmodel = document.getElementById('bctypeHeaderEdit-obj_approvalmodel_id-container')
const cnt_paymreq = document.getElementById('bctypeHeaderEdit-obj_paymreqtype_id-container')
const cnt_agingtype = document.getElementById('bctypeHeaderEdit-obj_agingtype_id-container')





export async function init(self, args) {
	console.log('initializing bctypeExtender ...')
}

export function headerList_initSearchParams(self, SearchParams) {
	SearchParams['bccycle_id'].addEventListener('selecting', async (evt)=>{
		const cbo = evt.detail.sender
		const dialog = evt.detail.dialog
		const url = 'bccycle/header-list'
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
				evt.detail.addRow(row.bccycle_id, row.bccycle_name, row)
			}

			dialog.setNext(result.nextoffset, result.limit)
		} catch (err) {
			$fgta5.MessageBox.error(err.message)
		} finally {
			cbo.wait(false)
		}
	})


}


export async function obj_paymreqtype_id_selected(self, obj_paymreqtype_id, frm, evt) {
	const { agingtype_id, agingtype_name } = evt.detail.data
	frm.Inputs['bctypeHeaderEdit-obj_agingtype_id'].setSelected(agingtype_id, agingtype_name)	
}



function bccycleIdChanged(self, frm, isusecoaclass, isusecurr, isuseapproval, isusepaymreq) {
	const bctypeCoaEdit = self.Modules.bctypeCoaEdit
	const frmEdit = bctypeCoaEdit.getForm()
	const obj_bccoaclass_id = frmEdit.Inputs['bctypeCoaEdit-obj_bccoaclass_id']
	const obj_curr_id =	frmEdit.Inputs['bctypeCoaEdit-obj_curr_id']
	const obj_approvalmodel_id = frm.Inputs['bctypeHeaderEdit-obj_approvalmodel_id']
	const obj_paymreqtype_id = frm.Inputs['bctypeHeaderEdit-obj_paymreqtype_id']
	// const obj_agingtype_id = frm.Inputs['bctypeHeaderEdit-obj_agingtype_id']



	if (isusecoaclass) {
		obj_bccoaclass_id.markAsRequired(true)
		cnt_bccoaclass.classList.remove('hidden')
	} else {
		obj_bccoaclass_id.markAsRequired(false)
		cnt_bccoaclass.classList.add('hidden')
	}


	if (isusecurr) {
		obj_curr_id.markAsRequired(true)
		cnt_curr.classList.remove('hidden')
	} else {
		obj_curr_id.markAsRequired(false)
		cnt_curr.classList.add('hidden')
	}



	if (isuseapproval) {
		obj_approvalmodel_id.markAsRequired(true)
		cnt_approvalmodel.classList.remove('hidden')

	} else {
		obj_approvalmodel_id.markAsRequired(false)
		cnt_approvalmodel.classList.add('hidden')
	}

	if (isusepaymreq) {
		obj_paymreqtype_id.markAsRequired(true)
		cnt_paymreq.classList.remove('hidden')
		cnt_agingtype.classList.remove('hidden')
	} else {
		obj_paymreqtype_id.markAsRequired(false)
		cnt_paymreq.classList.add('hidden')
		cnt_agingtype.classList.add('hidden')
	}



}


export async function obj_bccycle_id_selected(self, obj_bccycle_id, frm, evt) {
	if (!obj_bccycle_id.isSelectedChanged()) {
		return
	}

	const {isusecoaclass, isusecurr, isuseapproval, isusepaymreq} = evt.detail.data
	bccycleIdChanged(self, frm, isusecoaclass, isusecurr, isuseapproval, isusepaymreq)


	frm.Inputs['bctypeHeaderEdit-obj_isusecoaclass'].value = isusecoaclass	
	frm.Inputs['bctypeHeaderEdit-obj_isusecurr'].value = isusecurr	
	frm.Inputs['bctypeHeaderEdit-obj_isuseapproval'].value = isuseapproval	
	frm.Inputs['bctypeHeaderEdit-obj_isusepaymreq'].value = isusepaymreq	

	const obj_approvalmodel_id = frm.Inputs['bctypeHeaderEdit-obj_approvalmodel_id']
	obj_approvalmodel_id.clear()
	obj_approvalmodel_id.setSelected(null)

	const obj_paymreqtype_id = frm.Inputs['bctypeHeaderEdit-obj_paymreqtype_id']
	obj_paymreqtype_id.clear()
	obj_paymreqtype_id.setSelected(null)

	const obj_agingtype_id = frm.Inputs['bctypeHeaderEdit-obj_agingtype_id']
	obj_agingtype_id.clear()
	obj_agingtype_id.setSelected(null)

}


export async function bctypeHeaderEdit_formOpened(self, frm, CurrentState) {
	const obj_isusecoaclass = frm.Inputs['bctypeHeaderEdit-obj_isusecoaclass']
	const obj_isusecurr = frm.Inputs['bctypeHeaderEdit-obj_isusecurr']	
	const obj_isuseapproval = frm.Inputs['bctypeHeaderEdit-obj_isuseapproval']	
	const obj_isusepaymreq = frm.Inputs['bctypeHeaderEdit-obj_isusepaymreq']	

	bccycleIdChanged(self, frm, obj_isusecoaclass.value, obj_isusecurr.value, obj_isuseapproval.value, obj_isusepaymreq.value)


	if (obj_isusecoaclass.value) {
		pageHelper.setCssRule('#bctypeCoaList-tbl [data-name="bccoaclass_name"]', {display:'table-cell'})
	} else {
		pageHelper.setCssRule('#bctypeCoaList-tbl [data-name="bccoaclass_name"]', {display:'none'})
	}

	if (obj_isusecurr.value) {
		pageHelper.setCssRule('#bctypeCoaList-tbl [data-name="curr_code"]', {display:'table-cell'})
	} else {
		pageHelper.setCssRule('#bctypeCoaList-tbl [data-name="curr_code"]', {display:'none'})
	}	

}


 export async function bctypeHeaderEdit_newData(self, datainit, frm) {
	cnt_approvalmodel.classList.add('hidden')
	cnt_paymreq.classList.add('hidden')
	cnt_agingtype.classList.add('hidden')
 }



