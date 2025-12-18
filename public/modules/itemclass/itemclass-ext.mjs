import Context from './itemclass-context.mjs'
import * as pageHelper from '/public/libs/webmodule/pagehelper.mjs'


export async function init(self, args) {
	console.log('initializing itemclassExtender ...')
}


function itemclasstypeChanged(self, itemclasstype={}) {
	const { ishasbscoa, ishasdeprecoa, ishasdepremethod, ishasdeprecond, ishasexpensecoa } = itemclasstype

	pageHelper.setVisibility('itemclassHeaderEdit-obj_bs_coa_id-container', ishasbscoa)
	pageHelper.setVisibility('itemclassHeaderEdit-obj_depre_coa_id-container', ishasdeprecoa)
	pageHelper.setVisibility('itemclassHeaderEdit-obj_depremodel_id-container', ishasdepremethod)
	pageHelper.setVisibility('itemclassHeaderEdit-obj_directexpensecond-container', ishasdeprecond)
	pageHelper.setVisibility('itemclassHeaderEdit-obj_bellowvalue-container', ishasdeprecond)
	pageHelper.setVisibility('itemclassHeaderEdit-obj_expense_coa_id-container', ishasexpensecoa)

}


export async function obj_itemclasstype_id_selected(self, obj_itemclasstype_id, frm, evt) {
	const itemclasstype = evt.detail.data
	const { itemmanage_id } = itemclasstype

	frm.Inputs['itemclassHeaderEdit-obj_itemmanage_id'].value = itemmanage_id

	itemclasstypeChanged(self, itemclasstype)
}

export async function itemclassHeaderEdit_formOpened(self, frm, CurrentState) {
	const { itemclasstype } = frm.getOriginalData()

	itemclasstypeChanged(self, itemclasstype)
}


export async function itemclassHeaderEdit_newData(self, datainit, frm) {
	itemclasstypeChanged(self)
}

export function obj_itemclasstype_id_selecting_criteria(self, obj_itemclasstype_id, frm, criteria, sort, evt) {
	sort.itemclasstype_name = 'asc'
}


export function obj_dept_id_selecting_criteria(self, obj_dept_id, frm, criteria, sort, evt) {
	sort.dept_name = 'asc'
}


