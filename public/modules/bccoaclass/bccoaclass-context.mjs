const app = new $fgta5.Application('mainapp')
const urlDir = 'public/modules/bccoaclass'
const Crsl = new $fgta5.SectionCarousell(app.Nodes.Main) 

export default {
	moduleName: 'bccoaclass',
	app: app,
	urlDir: urlDir,
	Crsl: Crsl,
	Sections: { 
		bccoaclassHeaderList: 'bccoaclassHeaderList-section', 
		bccoaclassHeaderEdit: 'bccoaclassHeaderEdit-section', 
	},
	SectionMap: { 
		'bccoaclassHeaderList-section' : 'bccoaclassHeaderList', 
		'bccoaclassHeaderEdit-section' : 'bccoaclassHeaderEdit', 
	}
}
