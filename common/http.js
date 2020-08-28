export default function $http(options) {
	return new Promise((resolve, reject) => {
		const { url, data } = options
		const user_id = '5f3f45b029c5d3000147794f'
		uniCloud.callFunction({
			name: url,
			data: {
				user_id,
				...data
			}
		}).then(res => {
			if (res.result.code === 200) {
				resolve(res.result)
			} else {
				reject(res.result)
			}
		}).catch(err => {
			reject(err)
		})
	})
}
