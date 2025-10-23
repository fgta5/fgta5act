import Context from './coa-context.mjs'
import * as Extender from './coa-ext.mjs'
import * as pageHelper from '/public/libs/webmodule/pagehelper.mjs'

const CurrentState = {}
const Crsl =  Context.Crsl
const CurrentSectionId = Context.Sections.coaHeaderEdit
const CurrentSection = Crsl.Items[CurrentSectionId]
const Source = Context.Source


const TitleWhenNew = 'New Coa'
const TitleWhenView = 'View Coa'
const TitleWhenEdit = 'Edit Coa'
const EditModeText = 'Edit'
const LockModeText = 'Lock'

const btn_edit = new $fgta5.ActionButton('coaHeaderEdit-btn_edit')
const btn_save = new $fgta5.ActionButton('coaHeaderEdit-btn_save')
const btn_new = new $fgta5.ActionButton('coaHeaderEdit-btn_new', 'coaHeader-new')
const btn_del = new $fgta5.ActionButton('coaHeaderEdit-btn_delete')
const btn_reset = new $fgta5.ActionButton('coaHeaderEdit-btn_reset')
const btn_prev = new $fgta5.ActionButton('coaHeaderEdit-btn_prev')
const btn_next = new $fgta5.ActionButton('coaHeaderEdit-btn_next')


const btn_recordstatus = document.getElementById('coaHeader-btn_recordstatus')
const btn_logs = document.getElementById('coaHeader-btn_logs')
const btn_about = document.getElementById('coaHeader-btn_about')

const frm = new $fgta5.Form('coaHeaderEdit-frm');
const obj_coa_id = frm.Inputs['coaHeaderEdit-obj_coa_id']
const obj_coa_isdisabled = frm.Inputs['coaHeaderEdit-obj_coa_isdisabled']
const obj_coa_name = frm.Inputs['coaHeaderEdit-obj_coa_name']
const obj_coa_normal = frm.Inputs['coaHeaderEdit-obj_coa_normal']
const obj_coa_descr = frm.Inputs['coaHeaderEdit-obj_coa_descr']
const obj_coagroup_id = frm.Inputs['coaHeaderEdit-obj_coagroup_id']
const obj_agingtype_id = frm.Inputs['coaHeaderEdit-obj_agingtype_id']
const obj_coareporttype_id = frm.Inputs['coaHeaderEdit-obj_coareporttype_id']
const obj_coa_istax = frm.Inputs['coaHeaderEdit-obj_coa_istax']
const obj_taxtype_id = frm.Inputs['coaHeaderEdit-obj_taxtype_id']
const obj_curr_id = frm.Inputs['coaHeaderEdit-obj_curr_id']	
const obj_createby = document.getElementById('fRecord-section-createby')
const obj_createdate = document.getElementById('fRecord-section-createdate')
const obj_modifyby = document.getElementById('fRecord-section-modifyby')
const obj_modifydate = document.getElementById('fRecord-section-modifydate')


export const Section = CurrentSection

export async function init(self, args) {
	console.log('initializing coaHeaderEdit ...')
	

	CurrentSection.addEventListener($fgta5.Section.EVT_BACKBUTTONCLICK, async (evt)=>{
		backToList(self, evt)
	})

	frm.addEventListener('locked', (evt) => { frm_locked(self, evt) });
	frm.addEventListener('unlocked', (evt) => { frm_unlocked(self, evt) });
	frm.render()

	btn_edit.addEventListener('click', (evt)=>{ btn_edit_click(self, evt) })
	btn_save.addEventListener('click', (evt)=>{ btn_save_click(self, evt)  })
	btn_new.addEventListener('click', (evt)=>{ btn_new_click(self, evt)})
	btn_del.addEventListener('click', (evt)=>{ btn_del_click(self, evt)})
	btn_reset.addEventListener('click', (evt)=>{ btn_reset_click(self, evt)})
	btn_prev.addEventListener('click', (evt)=>{ btn_prev_click(self, evt)})
	btn_next.addEventListener('click', (evt)=>{ btn_next_click(self, evt)})


	btn_recordstatus.addEventListener('click', evt=>{ btn_recordstatus_click(self, evt) })	
	btn_logs.addEventListener('click', evt=>{ btn_logs_click(self, evt) })	
	btn_about.addEventListener('click', evt=>{ btn_about_click(self, evt) })

	// set actions
	CurrentState.Actions = {
		edit: btn_edit,	
	}

	

	
	// Combobox: obj_coagroup_id
	obj_coagroup_id.addEventListener('selecting', async (evt)=>{
		const fn_selecting_name = 'obj_coagroup_id_selecting'
		const fn_selecting = Extender[fn_selecting_name]
		if (typeof fn_selecting === 'function') {
			// create function di Extender (jika perlu):
			// export async function obj_coagroup_id_selecting(self, obj_coagroup_id, frm, evt)
			fn_selecting(self, obj_coagroup_id, frm, evt)
		} else {
			// default selecting
			const cbo = evt.detail.sender
			const dialog = evt.detail.dialog
			const searchtext = evt.detail.searchtext!=null ? evt.detail.searchtext : ''
			const url = 'coagroup/header-list'
			const criteria = {
				searchtext: searchtext,
			}

			const fn_selecting_criteria_name = 'obj_coagroup_id_selecting_criteria'
			const fn_selecting_criteria = Extender[fn_selecting_criteria_name]
			if (typeof fn_selecting_criteria === 'function') {
				fn_selecting_criteria(self, obj_coagroup_id, criteria)
			}

			cbo.wait()
			try {
				const result = await Module.apiCall(url, {
					criteria,
					offset: evt.detail.offset,
					limit: evt.detail.limit,
				}) 

				for (var row of result.data) {
					evt.detail.addRow(row.coagroup_id, row.coagroup_name, row)
				}

				dialog.setNext(result.nextoffset, result.limit)
			} catch (err) {
				$fgta5.MessageBox.error(err.message)
			} finally {
				cbo.wait(false)
			}

			
		}		
	})
	
	
	// Combobox: obj_agingtype_id
	obj_agingtype_id.addEventListener('selecting', async (evt)=>{
		const fn_selecting_name = 'obj_agingtype_id_selecting'
		const fn_selecting = Extender[fn_selecting_name]
		if (typeof fn_selecting === 'function') {
			// create function di Extender (jika perlu):
			// export async function obj_agingtype_id_selecting(self, obj_agingtype_id, frm, evt)
			fn_selecting(self, obj_agingtype_id, frm, evt)
		} else {
			// default selecting
			const cbo = evt.detail.sender
			const dialog = evt.detail.dialog
			const searchtext = evt.detail.searchtext!=null ? evt.detail.searchtext : ''
			const url = 'agingtype/header-list'
			const criteria = {
				searchtext: searchtext,
			}

			const fn_selecting_criteria_name = 'obj_agingtype_id_selecting_criteria'
			const fn_selecting_criteria = Extender[fn_selecting_criteria_name]
			if (typeof fn_selecting_criteria === 'function') {
				fn_selecting_criteria(self, obj_agingtype_id, criteria)
			}

			cbo.wait()
			try {
				const result = await Module.apiCall(url, {
					criteria,
					offset: evt.detail.offset,
					limit: evt.detail.limit,
				}) 

				for (var row of result.data) {
					evt.detail.addRow(row.agingtype_id, row.agingtype_name, row)
				}

				dialog.setNext(result.nextoffset, result.limit)
			} catch (err) {
				$fgta5.MessageBox.error(err.message)
			} finally {
				cbo.wait(false)
			}

			
		}		
	})
	
	
	// Combobox: obj_coareporttype_id
	obj_coareporttype_id.addEventListener('selecting', async (evt)=>{
		const fn_selecting_name = 'obj_coareporttype_id_selecting'
		const fn_selecting = Extender[fn_selecting_name]
		if (typeof fn_selecting === 'function') {
			// create function di Extender (jika perlu):
			// export async function obj_coareporttype_id_selecting(self, obj_coareporttype_id, frm, evt)
			fn_selecting(self, obj_coareporttype_id, frm, evt)
		} else {
			// default selecting
			const cbo = evt.detail.sender
			const dialog = evt.detail.dialog
			const searchtext = evt.detail.searchtext!=null ? evt.detail.searchtext : ''
			const url = 'coareporttype/header-list'
			const criteria = {
				searchtext: searchtext,
			}

			const fn_selecting_criteria_name = 'obj_coareporttype_id_selecting_criteria'
			const fn_selecting_criteria = Extender[fn_selecting_criteria_name]
			if (typeof fn_selecting_criteria === 'function') {
				fn_selecting_criteria(self, obj_coareporttype_id, criteria)
			}

			cbo.wait()
			try {
				const result = await Module.apiCall(url, {
					criteria,
					offset: evt.detail.offset,
					limit: evt.detail.limit,
				}) 

				for (var row of result.data) {
					evt.detail.addRow(row.coareporttype_id, row.coareporttype_name, row)
				}

				dialog.setNext(result.nextoffset, result.limit)
			} catch (err) {
				$fgta5.MessageBox.error(err.message)
			} finally {
				cbo.wait(false)
			}

			
		}		
	})
	
	
	// Checkbox: obj_coa_istax
	obj_coa_istax.addEventListener('checked', (evt)=>{
		const fn_checked_name = 'obj_coa_istax_checked'
		const fn_checked = Extender[fn_checked_name]
		if (typeof fn_checked === 'function') {
			// create function di Extender:
			// export async function obj_coa_istax_checked(self, obj_coa_istax, frm, evt)
			fn_checked(self, obj_coa_istax, frm, evt)
		} else {	
			console.warn('Extender.obj_coa_istax_checked is not implemented')
		}		
	})
	
	
	// Combobox: obj_taxtype_id
	obj_taxtype_id.addEventListener('selecting', async (evt)=>{
		const fn_selecting_name = 'obj_taxtype_id_selecting'
		const fn_selecting = Extender[fn_selecting_name]
		if (typeof fn_selecting === 'function') {
			// create function di Extender (jika perlu):
			// export async function obj_taxtype_id_selecting(self, obj_taxtype_id, frm, evt)
			fn_selecting(self, obj_taxtype_id, frm, evt)
		} else {
			// default selecting
			const cbo = evt.detail.sender
			const dialog = evt.detail.dialog
			const searchtext = evt.detail.searchtext!=null ? evt.detail.searchtext : ''
			const url = 'taxtype/header-list'
			const criteria = {
				searchtext: searchtext,
			}

			const fn_selecting_criteria_name = 'obj_taxtype_id_selecting_criteria'
			const fn_selecting_criteria = Extender[fn_selecting_criteria_name]
			if (typeof fn_selecting_criteria === 'function') {
				fn_selecting_criteria(self, obj_taxtype_id, criteria)
			}

			cbo.wait()
			try {
				const result = await Module.apiCall(url, {
					criteria,
					offset: evt.detail.offset,
					limit: evt.detail.limit,
				}) 

				for (var row of result.data) {
					evt.detail.addRow(row.taxtype_id, row.taxtype_name, row)
				}

				dialog.setNext(result.nextoffset, result.limit)
			} catch (err) {
				$fgta5.MessageBox.error(err.message)
			} finally {
				cbo.wait(false)
			}

			
		}		
	})
	
	
	// Combobox: obj_curr_id
	obj_curr_id.addEventListener('selecting', async (evt)=>{
		const fn_selecting_name = 'obj_curr_id_selecting'
		const fn_selecting = Extender[fn_selecting_name]
		if (typeof fn_selecting === 'function') {
			// create function di Extender (jika perlu):
			// export async function obj_curr_id_selecting(self, obj_curr_id, frm, evt)
			fn_selecting(self, obj_curr_id, frm, evt)
		} else {
			// default selecting
			const cbo = evt.detail.sender
			const dialog = evt.detail.dialog
			const searchtext = evt.detail.searchtext!=null ? evt.detail.searchtext : ''
			const url = `${Context.appsUrls.ent.url}/curr/header-list`
			const criteria = {
				searchtext: searchtext,
			}

			const fn_selecting_criteria_name = 'obj_curr_id_selecting_criteria'
			const fn_selecting_criteria = Extender[fn_selecting_criteria_name]
			if (typeof fn_selecting_criteria === 'function') {
				fn_selecting_criteria(self, obj_curr_id, criteria)
			}

			cbo.wait()
			try {
				const result = await Module.apiCall(url, {
					criteria,
					offset: evt.detail.offset,
					limit: evt.detail.limit,
				}) 

				for (var row of result.data) {
					evt.detail.addRow(row.curr_id, row.curr_code, row)
				}

				dialog.setNext(result.nextoffset, result.limit)
			} catch (err) {
				$fgta5.MessageBox.error(err.message)
			} finally {
				cbo.wait(false)
			}

			
		}		
	})
	
		
	
}

export async function openSelectedData(self, params) {
	console.log('openSelectedData')

	let mask = $fgta5.Modal.createMask()
	try {
		obj_coagroup_id.clear()
		obj_agingtype_id.clear()
		obj_coareporttype_id.clear()
		obj_taxtype_id.clear()
		obj_curr_id.clear()
					
		const id = params.keyvalue
		const data = await openData(self, id)

		

		CurrentState.currentOpenedId = id

		const fn_iseditdisabled_name = 'coaHeaderEdit_isEditDisabled'
		const fn_iseditdisabled = Extender[fn_iseditdisabled_name]
		if (typeof fn_iseditdisabled === 'function') {
			const editDisabled = fn_iseditdisabled(self, data)
			CurrentState.editDisabled = editDisabled
		}

		// disable primary key
		setPrimaryKeyState(self, {disabled:true})

		frm.setData(data)
		frm.acceptChanges()
		frm.lock()

		const fn_formopened_name = 'coaHeaderEdit_formOpened'
		const fn_formopened = Extender[fn_formopened_name]
		if (typeof fn_formopened === 'function') {
			// export async function coaHeaderEdit_formOpened(self, frm, CurrentState)
			await fn_formopened(self, frm, CurrentState)
		}

	} catch (err) {
		CurrentState.currentOpenedId = null
		throw err
	} finally {
		mask.close()
		mask = null
	}
}



export function getHeaderForm(self) {
	return frm
}

export function getForm(self) {
	return frm
}

export function clearForm(self, text) {
	frm.clear(text)
}

export function disableNextButton(self, disabled=true) {
	btn_next.disabled = disabled
}

export function disablePrevButton(self, disabled=true) {
	btn_prev.disabled = disabled
}

export function keyboardAction(self, actionName) {
	if (actionName=='save') {
		frm.acceptInput()
		btn_save.click()
	} else if (actionName=='new') {
		frm.acceptInput()
		btn_new.click()
	} else if (actionName=='escape') {
		frm.acceptInput()
		if (frm.isLocked() || frm.isNew()) {
			backToList(self)
		} else {
			btn_edit.click() // untuk lock data
		}
	} else if (actionName=='togleEdit') {
		frm.acceptInput()
		btn_edit.click()
	} else if (actionName=='right') {
		btn_next.click()
	} else if (actionName=='left') {
		btn_prev.click()
	}
}


async function newData(self, datainit) {
	try {
		frm.newData(datainit)
		frm.acceptChanges()
		frm.setAsNewData()
	} catch (err) {
		throw err
	}
}

async function openData(self, id) {
	const url = `/${Context.moduleName}/header-open`
	try {
		const result = await Module.apiCall(url, { id }) 
		return result 
	} catch (err) {
		throw err	
	} 	
}

async function createData(self, data, formData) {
	const url = `/${Context.moduleName}/header-create`
	try {
		const result = await Module.apiCall(url, { data, source: Source }, formData) 
		return result 
	} catch (err) {
		throw err	
	} 	
}


async function updateData(self, data, formData) {
	const url = `/${Context.moduleName}/header-update`
	try {
		const result = await Module.apiCall(url, { data, source: Source }, formData) 
		return result 
	} catch (err) {
		throw err	
	} 
}


async function deleteData(self, id) {
	const url = `/${Context.moduleName}/header-delete`
	try {
		const result = await Module.apiCall(url, { id, source: Source }) 
		return result 
	} catch (err) {
		throw err	
	} 
}


async function backToList(self, evt) {
	// cek apakah ada perubahan data
	let goback = false
	if (frm.isChanged()) {
		// ada perubahan data, konfirmasi apakah mau lanjut back
		var ret = await $fgta5.MessageBox.confirm(Module.BACK_CONFIRM)
		if (ret=='ok') {
			// user melanjutkan back, walaupun data berubah
			// reset dahulu data form
			frm.reset()
			goback = true
		}
	} else {
		goback = true
	}

	if (goback) {
		frm.lock()
		const listId =  Context.Sections.coaHeaderList
		const listSection = Crsl.Items[listId]
		listSection.show({direction: 1})
	}
}

async function  frm_locked(self, evt) {
	CurrentSection.Title = TitleWhenView

	btn_edit.setText(EditModeText)

	btn_edit.disabled = false
	btn_save.disabled = true
	btn_new.disabled = false
	btn_del.disabled = true
	btn_reset.disabled = true
	btn_prev.disabled = false
	btn_next.disabled = false

	
	
	// Extender untuk event locked
	const fn_name = 'coaHeaderEdit_formLocked'
	const fn = Extender[fn_name]
	if (typeof fn === 'function') {
		fn(self, frm, CurrentState)
	}

	if (CurrentState.editDisabled) {
		// jika karena suatu kondisi data mengharuskan data tidak boleh diedit
		btn_edit.disabled = true
	}

		

}

async function  frm_unlocked(self, evt) {
	if (frm.isNew()) {
		CurrentSection.Title = TitleWhenNew
	} else {
		CurrentSection.Title = TitleWhenEdit
	}

	btn_edit.setText(LockModeText)

	btn_edit.disabled = false
	btn_save.disabled = false
	btn_new.disabled = true
	btn_del.disabled = false
	btn_reset.disabled = false
	btn_prev.disabled = true
	btn_next.disabled = true

	

	// Extender untuk event Unlocked
	const fn_name = 'coaHeaderEdit_formUnlocked'
	const fn = Extender[fn_name]
	if (typeof fn === 'function') {
		fn(self, frm, CurrentState)
	}

		
}

async function setPrimaryKeyState(self, opt) {
	const obj_pk = frm.getPrimaryInput()
	obj_pk.disabled = opt.disabled===true
	if (opt.placeholder!==undefined) {
		obj_pk.placeholder = opt.placeholder
	}
	if (opt.value!==undefined) {
		obj_pk.value = opt.value
	}
}



async function btn_edit_click(self, evt) {
	console.log('btn_edit_click')

	if (frm.isLocked()) {
		// user mau inlock
		frm.lock(false)
	} else {
		if (frm.isChanged() || frm.isNew()) {
			await $fgta5.MessageBox.warning(Module.EDIT_WARNING)
			return
		}
		frm.lock(true)
	}
}

async function btn_new_click(self, evt) {
	console.log('btn_new_click')
	const sourceSection = evt.target.getAttribute('data-sectionsource') 

	const coaHeaderList = self.Modules.coaHeaderList
	const listsecid = coaHeaderList.Section.Id
	const fromListSection = sourceSection===listsecid
	if (fromListSection) {
		// klik new dari list (tidak perlu cek ada perubahan data)
		// tampilkan dulu form
		await CurrentSection.show()
	} else {
		// klik new dari form
		let cancel_new = false
		if (frm.isChanged()) {
			const ret = await $fgta5.MessageBox.confirm(Module.NEWDATA_CONFIRM)
			if (ret=='cancel') {
				cancel_new = true
			}
		}
		if (cancel_new) {
			return
		}
	}

	if (frm.AutoID) {
		setPrimaryKeyState(self, {disabled:true, placeholder:'[AutoID]'})
	} else {
		setPrimaryKeyState(self, {disabled:false, placeholder:'ID'})
	}

	try {

		// inisiasi data baru
		let datainit = {
			coa_normalposition: 0,
		}


		// jika perlu modifikasi data initial,
		// atau dialog untuk opsi data baru, dapat dibuat di Extender
		const fn_newdata_name = 'coaHeaderEdit_newData'
		const fn_newdata = Extender[fn_newdata_name]
		if (typeof fn_newdata === 'function') {
			await fn_newdata(self, datainit, frm)
		}

		// buat data baru
		await newData(self, datainit)

		// buka lock, agar user bisa edit
		frm.lock(false)

		// jika edit di suspend, enable dulu
		btn_edit.suspend(false)


		// matikan tombol edit dan del saat kondisi form adalah data baru 
		btn_edit.disabled = true
		btn_del.disabled = true
	} catch (err) {
		console.error(err)
		await $fgta5.MessageBox.error(err.message)
		if (fromListSection) {
			// jika saat tombol baru dipilih saat di list, tampilan kembalikan ke list
			self.Modules.coaHeaderList.Section.show()
		}
	}
}

async function btn_save_click(self, evt) {
	console.log('btn_save_click')


	// Extender Autofill
	const fn_autofill_name = 'coaHeaderEdit_autofill'
	const fn_autofill = Extender[fn_autofill_name]
	if (typeof fn_autofill === 'function') {
		await fn_autofill(self, frm)
	}

	// cek apakah data valid
	const valid = frm.validate()
	if (!valid) {
		const message = frm.getLastError()
		console.warn(message)
		$fgta5.MessageBox.warning(message)
		return
	}


	// abaikan jika bukan data baru dan tidak ada perubahan
	let dataToSave
	const isNewData = frm.isNew()
	if (!isNewData) {
		// cek dulu apakah ada perubahaan
		if (!frm.isChanged()) {
			// skip save jika tidak ada perubahan data
			console.log('tidak ada perubahan data, skip save')
			return
		} 
		
		// ambil hanya data yang berubah
		dataToSave = frm.getDataChanged()

	} else {

		// untuk posisi data baru, ambil semua data
		dataToSave = frm.getData()		
	}

	// Extender Saving
	const fn_datasaving_name = 'coaHeaderEdit_dataSaving'
	const fn_datasaving = Extender[fn_datasaving_name]
	if (typeof fn_datasaving === 'function') {
		await fn_datasaving(self, dataToSave, frm)
	}


	// bila ada file, upload filenya
	let formData = null
	const files = frm.getFiles()
	if (files!=null) {
		formData = new FormData();
		for (let name in files) {
			const file = files[name]
			formData.append(name, file)
		}
	}	

	let mask = $fgta5.Modal.createMask()
	try {
		let result

		if (isNewData) {
			result = await createData(self, dataToSave, formData)
		} else {
 			result = await updateData(self, dataToSave, formData)
		}

		console.log('result', result)
		const obj_pk = frm.getPrimaryInput()
		const pk = obj_pk.getBindingData()
		const idValue = result[pk]

		console.log(`get data id ${idValue}`)
		const data = await openData(self, idValue)
		console.log('data', data)

		

		CurrentState.currentOpenedId = idValue

		if (frm.AutoID) {
			console.log('update field ID di form')
			obj_pk.value = idValue
		} else {
			// jika bukan autoID, kunci field PK menjadi disabled
			setPrimaryKeyState(self, {disabled:true})

		}

		// update form
		frm.setData(data)	


		// Extender Saving
		const fn_datasaved_name = 'coaHeaderEdit_dataSaved'
		const fn_datasaved = Extender[fn_datasaved_name]
		if (typeof fn_datasaved === 'function') {
			await fn_datasaved(self, data, frm)
		}


		// persist perubahan di form
		frm.acceptChanges()


		if (isNewData) {
			// saat new data, posisi button toggle edit akan disabled
			// setelah berhasil save, nyalakan button edit (untuk lock)
			btn_edit.disabled = false

			// buat baris baru di grid
			console.log('tamabah baris baru di grid')
			self.Modules.coaHeaderList.addNewRow(self, data)
		} else {
			console.log('update data baris yang dibuka')
			self.Modules.coaHeaderList.updateCurrentRow(self, data)
		}

	} catch (err) {
		console.error(err)
		await $fgta5.MessageBox.error(err.message)
	} finally {
		mask.close()
		mask = null
	}
}

async function btn_del_click(self, evt) {
	console.log('btn_del_click')

	// jika data masih dalam kondisi baru (belum di save, 
	// perintah delete harus dibatalkan, 
	// karena belum ada data di database)
	const isNewData = frm.isNew()
	if (isNewData) {
		console.log('posisi data baru, skip delete')
		return
	}

	const obj_pk = frm.getPrimaryInput()
	const idValue = obj_pk.value

	// konfirmasi untuk delete data
	const resp = await $fgta5.MessageBox.confirm(Module.DELETE_CONFIRM + `id: ${idValue}`)
	if (resp!='ok') {
		return
	}

	console.log('delete data')
	let mask = $fgta5.Modal.createMask()
	try {
		const result = await deleteData(self, idValue)
		
		// hapus current row yang dipilih di list
		self.Modules.coaHeaderList.removeCurrentRow(self)
		
		// kembali ke list
		self.Modules.coaHeaderList.Section.show()


		// lock kembali form
		frm.lock()

	} catch (err) {
		console.error(err)
		await $fgta5.MessageBox.error(err.message)
	} finally {
		mask.close()
		mask = null
	}

}


async function btn_reset_click(self, evt) {
	console.log('btn_reset_click')

	const isNewData = frm.isNew()
	if (isNewData) {
		// untuk data baru, di reset berarti sama seperti membuat data baru
		console.log('reset: buat data baru')
		newData(self)
	} else {
		if (frm.isChanged()) {
			// ada perubahan data, tampilkan konfirmasi perubahan data
			var resp = await $fgta5.MessageBox.confirm(Module.RESET_CONFIRM)
			if (resp!='ok') {
				// user klik tombil cancel
				console.log('cancel reset')
				return
			}
			console.log('reset form')
			frm.reset()
		} else {
			console.log('tidak ada perubahan data, reset data tidak dieksekusi')
		}
	}

}

async function btn_prev_click(self, evt) {
	console.log('btn_prev_click')
	self.Modules.coaHeaderList.selectPreviousRow(self)
}

async function btn_next_click(self, evt) {
	console.log('btn_next_click')
	self.Modules.coaHeaderList.selectNextRow(self)
}




async function btn_recordstatus_click(self, evt) {
	console.log('btn_recordstatus_click')
	const params = {
		Context,
		sectionReturn: CurrentSection
	}
	
	pageHelper.openSection(self, 'fRecord-section', params, async ()=>{

		let mask = $fgta5.Modal.createMask()
		try {
			// ambil data
			const pk = frm.getPrimaryInput()
			const id = pk.value
			const data = await openData(self, id)

			obj_createby.innerHTML = data._createby
			obj_createdate.innerHTML = data._createdate
			obj_modifyby.innerHTML = data._modifyby
			obj_modifydate.innerHTML = data._modifydate

			const fn_addrecordinfo_name = 'coaHeaderEdit_addRecordInfo'
			const fn_addrecordinfo = Extender[fn_addrecordinfo_name]
			if (typeof fn_addrecordinfo === 'function') {
				await fn_addrecordinfo(self, data)
			}

		} catch (err) {
			console.error(err)
			$fgta5.MessageBox.error(err.message)
		} finally {
			mask.close()
			mask = null
		}
	})

}

async function btn_logs_click(self, evt) {
	const params = {
		Context,
		sectionReturn: CurrentSection
	}

	pageHelper.openSection(self, 'fLogs-section', params, async ()=>{
		// get log data
		const pk = frm.getPrimaryInput()
		const id = pk.value


		let mask = $fgta5.Modal.createMask()
		try {

			const url = `${Context.appsUrls.core.url}/logs/list`
			const criteria = {
				module: Context.moduleName,
				table: 'act.coa',
				id: id
			}

			const result = await Module.apiCall(url, {  
				criteria
			}) 

			const sc = document.getElementById('fLogs-section')
			const tbody = sc.querySelector('tbody')
			pageHelper.renderLog(tbody, result.data)
		} catch (err) {
			console.error(err)
			$fgta5.MessageBox.error(err.message)
		} finally {
			mask.close()
			mask = null
		}

	})
}

async function btn_about_click(self, evt) {
	const params = {
		Context,
		sectionReturn: CurrentSection
	}
	pageHelper.openSection(self, 'fAbout-section', params, async ()=>{
		
		const AboutSection = Crsl.Items['fAbout-section']
		AboutSection.Title = 'About Coa'

		const section = document.getElementById('fAbout-section')

		if ( document.getElementById('fAbout-section-fdescr') == null) {
			const divDescr = document.createElement('div')
			divDescr.setAttribute('id', 'fAbout-section-fdescr')
			divDescr.setAttribute('style', 'padding: 0 0 10px 0')
			divDescr.innerHTML = 'Chart of Account'
			const divTopbar = section.querySelector('div[data-topbar]')
			divTopbar.parentNode.insertBefore(divDescr, divTopbar.nextSibling);
		}

		if ( document.getElementById('fAbout-section-footer') == null) {
			const divFooter = document.createElement('div')
			divFooter.setAttribute('id', 'fAbout-section-footer')
			divFooter.setAttribute('style', 'border-top: 1px solid #ccc; padding: 5px 0 0 0; margin-top: 50px')
			divFooter.innerHTML = 'This module is generated by fgta5 generator at 23 Oct 2025 17:49'
			section.appendChild(divFooter)
		}
		
	})
}