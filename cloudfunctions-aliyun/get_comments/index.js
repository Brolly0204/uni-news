'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
  const {
		user_id,
		article_id
	}	= event
	
	const list = await db.collection('article')
	.aggregate()
	.match({
		_id: article_id
	})
	.project({
		_id: 0,
		comments: 1
	})
	.unwind('$comments')
	.replaceRoot({
		newRoot: '$comments'
	})
	.end()
	
	return {
		code: 200,
		msg: '数据获取成功',
		data: list.data
	}
}
