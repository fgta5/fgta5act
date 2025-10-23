const app = new $fgta5.Application('mainapp')
const urlDir = 'public/modules/coareporttype'
const Crsl = new $fgta5.SectionCarousell(app.Nodes.Main) 

export default {
	moduleName: 'coareporttype',
	app: app,
	urlDir: urlDir,
	Crsl: Crsl,
	Sections: { 
		coareporttypeHeaderList: 'coareporttypeHeaderList-section', 
		coareporttypeHeaderEdit: 'coareporttypeHeaderEdit-section', 
	},
	SectionMap: { 
		'coareporttypeHeaderList-section' : 'coareporttypeHeaderList', 
		'coareporttypeHeaderEdit-section' : 'coareporttypeHeaderEdit', 
	}
}
