const app = new $fgta5.Application('mainapp')
const urlDir = 'public/modules/depremodel'
const Crsl = new $fgta5.SectionCarousell(app.Nodes.Main) 

export default {
	moduleName: 'depremodel',
	app: app,
	urlDir: urlDir,
	Crsl: Crsl,
	Sections: { 
		depremodelHeaderList: 'depremodelHeaderList-section', 
		depremodelHeaderEdit: 'depremodelHeaderEdit-section', 
	},
	SectionMap: { 
		'depremodelHeaderList-section' : 'depremodelHeaderList', 
		'depremodelHeaderEdit-section' : 'depremodelHeaderEdit', 
	}
}
