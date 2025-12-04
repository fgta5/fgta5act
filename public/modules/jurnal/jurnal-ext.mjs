import Context from './jurnal-context.mjs'
import * as ExtHeader from './jurnal-ext-header.mjs'
import * as ExtDetil from './jurnal-ext-detil.mjs'
import outstandingDialog from './jurnal-outstandingdialog.mjs'


export const extenderHeader = ExtHeader;
export const extenderDetil = ExtDetil;



export async function init(self, args) {
	console.log('initializing jurnalExtender ...')

	Context.sourceName = 'non-modul'

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


	// tambahkan tombol untuk tarik outstanding AR/AP
	const dlg = new outstandingDialog()
	
	
	// const elDetilEditHead = document.getElementById('jurnalDetilEdit-head')
	// const elDetilEditHead = document.getElementById('jurnalHeaderList-header') // sementara taruh di depan biar gampang diakses
	const elDetilEditHead = document.getElementById('jurnalHeaderEdit-panelaction');	
	
	const btnOutstandingPayable = document.createElement('button')
	const btnOutstandingReceivable = document.createElement('button')
	elDetilEditHead.appendChild(btnOutstandingPayable)
	elDetilEditHead.appendChild(btnOutstandingReceivable)

	btnOutstandingPayable.classList.add('outstanding-button')
	btnOutstandingPayable.innerHTML = 'Payable'
	btnOutstandingPayable.addEventListener('click', (evt)=>{
		if (dlg==null) {
			console.error('Template dialog-outstanding belum dibuat')
			return
		}
		dlg.show('AP')
	})

	btnOutstandingReceivable.classList.add('outstanding-button')
	btnOutstandingReceivable.innerHTML = 'Receivable'
	btnOutstandingReceivable.addEventListener('click', (evt)=>{
		if (dlg==null) {
			console.error('Template dialog-outstanding belum dibuat')
			return
		}
		dlg.show('AR')
	})
	
}






