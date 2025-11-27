const app = new $fgta5.Application('mainapp')
const urlDir = 'public/modules/paymenttype'
const Crsl = new $fgta5.SectionCarousell(app.Nodes.Main) 

export default {
	moduleName: 'paymenttype',
	app: app,
	urlDir: urlDir,
	Crsl: Crsl,
	Sections: { 
		paymenttypeHeaderList: 'paymenttypeHeaderList-section', 
		paymenttypeHeaderEdit: 'paymenttypeHeaderEdit-section', 
	},
	SectionMap: { 
		'paymenttypeHeaderList-section' : 'paymenttypeHeaderList', 
		'paymenttypeHeaderEdit-section' : 'paymenttypeHeaderEdit', 
	}
}
