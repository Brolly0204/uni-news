'use strict';

const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const { name, user_id, page = 1, pageSize = 5 } = event
	let matchObj = {}
	if (name !== '全部') {
		matchObj = {
			classify: name
		}
	}
	const { data: userinfo } = await db.collection('user').doc(user_id).get()
	const { article_likes_ids } = userinfo[0]
	const list = await db.collection('article')
	.aggregate()
	.addFields({
		is_like: $.in(['$_id', article_likes_ids])
	})
	.match(matchObj)
	.skip((page - 1) * pageSize)
	.limit(pageSize)
	.project({
		content: 0
	})
	.end()
	// const { data } = await db.collection('article').field({
	// 	content: false
	// }).get()
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
}
