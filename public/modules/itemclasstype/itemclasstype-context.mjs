const app = new $fgta5.Application('mainapp')
const urlDir = 'public/modules/itemclasstype'
const Crsl = new $fgta5.SectionCarousell(app.Nodes.Main) 

export default {
	moduleName: 'itemclasstype',
	app: app,
	urlDir: urlDir,
	Crsl: Crsl,
	Sections: { 
		itemclasstypeHeaderList: 'itemclasstypeHeaderList-section', 
		itemclasstypeHeaderEdit: 'itemclasstypeHeaderEdit-section', 
	},
	SectionMap: { 
		'itemclasstypeHeaderList-section' : 'itemclasstypeHeaderList', 
		'itemclasstypeHeaderEdit-section' : 'itemclasstypeHeaderEdit', 
	}
}
