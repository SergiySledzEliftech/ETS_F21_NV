export default ({app, store }, inject) => {
	inject('notifier', {
		showMessage({content = '', color = ''}) {
			store.commit('news/showMessage', { content, color })
		}
	})
}