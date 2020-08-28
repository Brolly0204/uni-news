'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
  const {
		user_id,
		article_id
	}	= event
	let { data: userinfo } = await db.collection('user').doc(user_id).get()
	userinfo = userinfo[0]
	
	const article = await db.collection('article')
	.aggregate()
	.addFields({
		// 是否是作者喜欢
		is_author_like: $.in(['$author.id', userinfo.author_likes_ids]),
		// 是否是喜欢的文章
		is_like: $.in(['$_id', userinfo.article_likes_ids]),
		// 是否是点赞文章
		is_thumbs_up: $.in(['$_id', userinfo.thumbs_up_article_ids])
	})
	.match({
		_id: article_id
	})
	.project({
		comments: 0
	})
	.end()
	return {
		code: 200,
		msg: '数据请求成功',
		data: article.data
	}
};
