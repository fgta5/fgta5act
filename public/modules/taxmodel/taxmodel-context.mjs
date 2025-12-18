const app = new $fgta5.Application('mainapp')
const urlDir = 'public/modules/taxmodel'
const Crsl = new $fgta5.SectionCarousell(app.Nodes.Main) 

export default {
	moduleName: 'taxmodel',
	app: app,
	urlDir: urlDir,
	Crsl: Crsl,
	Sections: { 
		taxmodelHeaderList: 'taxmodelHeaderList-section', 
		taxmodelHeaderEdit: 'taxmodelHeaderEdit-section', 
	},
	SectionMap: { 
		'taxmodelHeaderList-section' : 'taxmodelHeaderList', 
		'taxmodelHeaderEdit-section' : 'taxmodelHeaderEdit', 
	}
}
