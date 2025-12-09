const app = new $fgta5.Application('mainapp')
const urlDir = 'public/modules/itemmanage'
const Crsl = new $fgta5.SectionCarousell(app.Nodes.Main) 

export default {
	moduleName: 'itemmanage',
	app: app,
	urlDir: urlDir,
	Crsl: Crsl,
	Sections: { 
		itemmanageHeaderList: 'itemmanageHeaderList-section', 
		itemmanageHeaderEdit: 'itemmanageHeaderEdit-section', 
	},
	SectionMap: { 
		'itemmanageHeaderList-section' : 'itemmanageHeaderList', 
		'itemmanageHeaderEdit-section' : 'itemmanageHeaderEdit', 
	}
}
