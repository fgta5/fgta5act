import Context from './bctype-context.mjs'

export async function init(self, args) {
	console.log('initializing bctypeExtender ...')

	// tambahkan extender inisiasi module bctype


	/* // contoh menambahkan content dari template extender
	{
		const target = secRec.querySelector('#fRecord-section div[name="column"][exteder]')
		const tpl = document.getElementById('tpl-record-panel')
		if (tpl!=null) {
			const clone = tpl.content.cloneNode(true); // salin isi template
			target.prepend(clone)
		}
	}
	*/	


	
	/* // contoh menambahkan custom validator
	// pada html, tambahkan validator="cobaFunction:paramValue"
	const frm = self.Modules.coaHeaderEdit.getHeaderForm()
	const obj_coa_normal = frm.Inputs['coaHeaderEdit-obj_coa_normal']
	$validators.addCustomValidator('cobaFunction', (v, param)=>{
	 	console.log(v)
	 	setTimeout(()=>{
	 		obj_coa_normal.setError('ini error')
	 	}, 500)
	})	


	*/


}



export async function obj_paymreqtype_id_selected(self, obj_paymreqtype_id, frm, evt) {
	const { agingtype_id, agingtype_name } = evt.detail.data

	frm.Inputs['bctypeHeaderEdit-obj_agingtype_id'].setSelected(agingtype_id, agingtype_name)	
}