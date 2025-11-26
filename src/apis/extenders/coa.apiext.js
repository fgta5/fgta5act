export async function coa_init(self, initialData) {
	const req = self.req
	initialData.setting.COA_LENGTH =  req.app.locals.appConfig.COA_LENGTH
} 