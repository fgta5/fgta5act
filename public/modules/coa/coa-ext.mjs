import Context from './coa-context.mjs'

export async function init(self, args) {
	console.log('initializing coaExtender ...')

	// tambahkan extender inisiasi module coa


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

	// contoh menambahkan custom validator
	// const frm = self.Modules.coaHeaderEdit.getHeaderForm()
	// const obj_coa_normal = frm.Inputs['coaHeaderEdit-obj_coa_normal']
	// $validators.addCustomValidator('cobaFunction', (v)=>{
	// 	console.log(v)
	// 	setTimeout(()=>{
	// 		obj_coa_normal.setError('ini error')
	// 	}, 500)
	// })




	const frm = self.Modules.coaHeaderEdit.getHeaderForm()
	const obj_coa_id = frm.Inputs['coaHeaderEdit-obj_coa_id']

	const COA_LENGTH = Context.setting.COA_LENGTH
	if (COA_LENGTH!=null) {
		obj_coa_id.Nodes.Input.setAttribute('maxlength', COA_LENGTH)
		obj_coa_id.Nodes.Input.setAttribute('minlength', COA_LENGTH)
		obj_coa_id.setInvalidMessage('minlength', `panjang coa harus ${COA_LENGTH} digit`)
		obj_coa_id.readValidators()
	}



}


