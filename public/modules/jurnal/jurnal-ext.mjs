import Context from './jurnal-context.mjs'

export async function init(self, args) {
	console.log('initializing jurnalExtender ...')

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


}


export function obj_jurnaltype_id_selecting_criteria(self, obj_jurnaltype_id, criteria, sort) {
	sort.jurnaltype_name = 'asc' 
}

export function obj_periode_id_selecting_criteria(self, obj_periode_id, criteria, sort) {
	criteria.periode_isclosed = false
	sort.periode_id = 'desc' 
}

export function obj_curr_id_selecting_criteria(self, obj_curr_id, criteria, sort) {
	sort.curr_code = 'asc' 
}

export function obj_coa_id_selecting_criteria(self, obj_coa_id, criteria, sort) {
	criteria.coa_isdisabled = false
	sort.coa_name = 'asc'
}

export function obj_unit_id_selecting_criteria(self, obj_unit_id, criteria, sort) {
	criteria.unit_isdisabled = false
	sort.unit_name = 'asc'
}

export function obj_site_id_selecting_criteria(self, obj_site_id, criteria, sort) {
	criteria.site_isdisabled = false
	sort.site_name = 'asc'
}

export function obj_dept_id_selecting_criteria(self, obj_dept_id, criteria, sort) {
	criteria.dept_isdisabled = false
	sort.dept_name = 'asc'
}

export function obj_partner_id_selecting_criteria(self, obj_partner_id, criteria, sort) {
	criteria.partner_isdisabled = false
	sort.partner_name
}

export function obj_project_id_selecting_criteria(self, obj_project_id, criteria, sort) {
	sort.project_name = 'asc'
}