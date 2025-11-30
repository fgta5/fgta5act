import Context from './jurnaltype-context.mjs'
import * as ExtHeader from './jurnaltype-ext-header.mjs'
import * as ExtCoa from './jurnaltype-ext-coa.mjs'

export const extenderHeader = ExtHeader
export const extenderCoa = ExtCoa


export async function init(self, args) {
	console.log('initializing jurnaltypeExtender ...')

	// tambahkan extender inisiasi module jurnaltype


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



	{
		const target = document.getElementById('jurnaltypeHeaderEdit-frm') 
		const tpl = document.querySelector('template[name="header-form-label"]')
		if (tpl!=null) {
			const clone = tpl.content.cloneNode(true); // salin isi template
			target.prepend(clone)
		}
	}	

}


