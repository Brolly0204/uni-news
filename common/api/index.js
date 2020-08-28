const requireApi = require.context(
  '.',
	false,
	/\.js$/
)

const modules = {}
requireApi.keys().forEach(key => {
	if (key === './index.js') return
	Object.assign(modules, requireApi(key))
})

export default modules
