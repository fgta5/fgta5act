const app = new $fgta5.Application('mainapp')
const urlDir = 'public/modules/coacategory'
const Crsl = new $fgta5.SectionCarousell(app.Nodes.Main) 

export default {
	moduleName: 'coacategory',
	app: app,
	urlDir: urlDir,
	Crsl: Crsl,
	Sections: { 
		coacategoryHeaderList: 'coacategoryHeaderList-section', 
		coacategoryHeaderEdit: 'coacategoryHeaderEdit-section', 
	},
	SectionMap: { 
		'coacategoryHeaderList-section' : 'coacategoryHeaderList', 
		'coacategoryHeaderEdit-section' : 'coacategoryHeaderEdit', 
	}
}
