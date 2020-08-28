'use strict';

const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
		article_id
	} = event
	const { data: userInfo } = await db.collection('user').doc(user_id).get()
	const { article_likes_ids } = userInfo[0]
	
	let dbCmdFunc = null
	if (article_likes_ids && article_likes_ids.includes(article_id)) {
		dbCmdFunc = dbCmd.pull(article_id)
	} else {	
		dbCmdFunc = dbCmd.addToSet(article_id)
	}
	await db.collection('user').doc(user_id).update({
		article_likes_ids: dbCmdFunc
	})
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: userInfo[0]
	}
}
