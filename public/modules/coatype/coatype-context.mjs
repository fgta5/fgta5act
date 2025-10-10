const app = new $fgta5.Application('mainapp')
const urlDir = 'public/modules/coatype'
const Crsl = new $fgta5.SectionCarousell(app.Nodes.Main) 

export default {
	moduleName: 'coatype',
	app: app,
	urlDir: urlDir,
	Crsl: Crsl,
	Sections: { 
		coatypeHeaderList: 'coatypeHeaderList-section', 
		coatypeHeaderEdit: 'coatypeHeaderEdit-section', 
	},
	SectionMap: { 
		'coatypeHeaderList-section' : 'coatypeHeaderList', 
		'coatypeHeaderEdit-section' : 'coatypeHeaderEdit', 
	}
}
