'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
    article_id,
		content
	} = event
	
	let { data: userinfo } = await db.collection('user').doc(user_id).get()
	userinfo = userinfo[0]
	
	const commentObj = {
		comment_id: genID(6),
		comment_content: content,
		create_time: new Date().getTime(),
		author: {
			author_id: userinfo._id,
			author_name: userinfo.author_name,
			avatar: userinfo.avatar,
			professional: userinfo.professional
		},
		replys: []
	}
	await db.collection('article').doc(article_id).update({
		comments: dbCmd.unshift(commentObj)
	})
	
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据更新成功'
	}
}

function genID(length) {
  return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}
