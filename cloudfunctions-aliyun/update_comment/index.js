'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const {
		user_id,
    article_id,
		content,
		comment_id = '', // 仅当回复消息时 存在comment_id字段
	  reply_id,
		is_reply
	} = event
	
	let { data: userinfo } = await db.collection('user').doc(user_id).get()
	userinfo = userinfo[0]
	// 如果是回复 根据article_id 获取到当前评论文章的评论列表
	let { data: article } = await db.collection('article').doc(article_id).get()
	let comments = article[0].comments
	
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
	
	let cmd
	// 评论
	if (!comment_id) {
	  commentObj.replys = []
		// 将该评论添加到 comments列表里
		cmd = dbCmd.unshift(commentObj)
	} else {
		// 将回复消息 添加到对应评论的 replys列表里
		const commentIndex = comments.findIndex(item => item.comment_id === comment_id)
		let authorName = ''
		if (is_reply) { // 子回复
			const reply = comments[commentIndex].replys.find(item => item.comment_id === reply_id)
			authorName = reply.author.author_name
		} else { // 主回复
			authorName = comments[commentIndex].author.author_name
		}
		commentObj.to = authorName
		// 根据索引更新 该条评论的replys列表
		cmd = {
			[commentIndex]: {
				replys: dbCmd.unshift(commentObj)
			}
		}
	}
	
	await db.collection('article').doc(article_id).update({
		comments: cmd
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
