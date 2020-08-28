'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	const {
		user_id,
		type
	} = event
	let matchObj = {}
	if (type !== 'all') {
		matchObj = {
			current: true
		}
	}
  // const { data } = await db.collection('label').get()
	let { data: userinfo } = await db.collection('user').doc(user_id).get()
  userinfo = userinfo[0]
		
	const list = await db.collection('label')
	.aggregate()
	.addFields({
		current: $.in(['$_id', $.ifNull([userinfo.label_ids, []])])
	})
	.match(matchObj)
	.end()
	//返回数据给客户端
	return {
		code: 200,
		msg: '数据请求成功',
		data: list.data
	}
};
