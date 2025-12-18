const app = new $fgta5.Application('mainapp')
const urlDir = 'public/modules/bccycle'
const Crsl = new $fgta5.SectionCarousell(app.Nodes.Main) 

export default {
	moduleName: 'bccycle',
	app: app,
	urlDir: urlDir,
	Crsl: Crsl,
	Sections: { 
		bccycleHeaderList: 'bccycleHeaderList-section', 
		bccycleHeaderEdit: 'bccycleHeaderEdit-section', 
	},
	SectionMap: { 
		'bccycleHeaderList-section' : 'bccycleHeaderList', 
		'bccycleHeaderEdit-section' : 'bccycleHeaderEdit', 
	}
}
