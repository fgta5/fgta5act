import Context from './jurnal-context.mjs'
import * as ExtHeader from './jurnal-ext-header.mjs'
import * as ExtDetil from './jurnal-ext-detil.mjs'


export const extenderHeader = ExtHeader;
export const extenderDetil = ExtDetil;



export async function init(self, args) {
	console.log('initializing jurnalExtender ...')

	Context.sourceName = 'non-modul'

	// tambahkan extender inisiasi module jurnal

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

	// form header
	const elFrmHeaderEdit = document.getElementById('jurnalHeaderEdit-frm')

	// tambahkan 1 div ke form headerEdit
	const blockDivValue = document.createElement('div')
	blockDivValue.id = 'jurnalHeaderEdit-div_value'
	blockDivValue.classList.add('hidden')
	elFrmHeaderEdit.appendChild(blockDivValue)


	// for detil
	const elFrmDetilEdit = document.getElementById('jurnalDetilEdit-frm')


	// tambahkan div untuk blocking entrian
	const blockDivDetilEntry = document.createElement('div')
	blockDivDetilEntry.id = 'jurnalDetilEdit-div_entry'
	elFrmDetilEdit.appendChild(blockDivDetilEntry)


	// tambahkan div untuk blocking value di detil
	const blockDivDetilValue = document.createElement('div')
	blockDivDetilValue.id = 'jurnalDetilEdit-div_value'
	elFrmDetilEdit.appendChild(blockDivDetilValue)


	//  tambahkan div untuk blocking info di detil
	const blockDivDetilInfo = document.createElement('div')
	blockDivDetilInfo.id = 'jurnalDetilEdit-div_info'
	elFrmDetilEdit.appendChild(blockDivDetilInfo)



	// tambahkan header info di detilListHead
	// jurnalDetilList-head

	
}






