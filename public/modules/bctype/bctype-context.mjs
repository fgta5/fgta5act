const app = new $fgta5.Application('mainapp')
const urlDir = 'public/modules/bctype'
const Crsl = new $fgta5.SectionCarousell(app.Nodes.Main) 

export default {
	moduleName: 'bctype',
	app: app,
	urlDir: urlDir,
	Crsl: Crsl,
	Sections: { 
		bctypeHeaderList: 'bctypeHeaderList-section', 
		bctypeHeaderEdit: 'bctypeHeaderEdit-section', 
		bctypeCoaList: 'bctypeCoaList-section', 
		bctypeCoaEdit: 'bctypeCoaEdit-section', 
		bctypeItemclassList: 'bctypeItemclassList-section', 
		bctypeItemclassEdit: 'bctypeItemclassEdit-section', 
		bctypeDeptList: 'bctypeDeptList-section', 
		bctypeDeptEdit: 'bctypeDeptEdit-section', 
	},
	SectionMap: { 
		'bctypeHeaderList-section' : 'bctypeHeaderList', 
		'bctypeHeaderEdit-section' : 'bctypeHeaderEdit', 
		'bctypeCoaList-section' : 'bctypeCoaList', 
		'bctypeCoaEdit-section' : 'bctypeCoaEdit', 
		'bctypeItemclassList-section' : 'bctypeItemclassList', 
		'bctypeItemclassEdit-section' : 'bctypeItemclassEdit', 
		'bctypeDeptList-section' : 'bctypeDeptList', 
		'bctypeDeptEdit-section' : 'bctypeDeptEdit', 
	}
}
