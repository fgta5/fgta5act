export async function obj_coa_id_selected(self, obj_coa_id, frm, evt) {
	const { coa_normal } = evt.detail.data

	if (coa_normal=='D') {
		frm.Inputs['jurnaltypeCoaEdit-obj_jurnaltypecoa_isdr'].value = true
		frm.Inputs['jurnaltypeCoaEdit-obj_jurnaltypecoa_iscr'].value = false
	} else if (coa_normal=='K') {
		frm.Inputs['jurnaltypeCoaEdit-obj_jurnaltypecoa_isdr'].value = false
		frm.Inputs['jurnaltypeCoaEdit-obj_jurnaltypecoa_iscr'].value = true
	} 

}