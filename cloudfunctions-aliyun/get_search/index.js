'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
  const { value = '', user_id } = event
	const { data: userinfo } = await db.collection('user').doc(user_id).get()
	const { article_likes_ids } = userinfo[0]
  const list = await db.collection('article')
	.aggregate()
	.match({
		title: new RegExp(value)
	})
	.addFields({
		is_like: $.in(['$_id', article_likes_ids])
	})
	.project({
		content: 0
	})
	.end()	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
}
