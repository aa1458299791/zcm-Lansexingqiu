export function errorToast(text) {
	return uni.showToast({
		title: text,
		duration: 1000,
		icon: 'error'
	})
}
export function successToast(text){
	return uni.showToast({
		title:text,
		duration:1000,
		icon:"success"
	})
}
