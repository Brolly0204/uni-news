export default function $http(options) {
	return new Promise((resolve, reject) => {
		const { url, data } = options
		// const user_id = '5f3f45b029c5d30001477950'
		const user_id = '5f3f45b029c5d30001477951'
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
