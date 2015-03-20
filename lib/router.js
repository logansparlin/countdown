Router.configure({
	layoutTemplate: 'layout',
})

Router.route('/', {
	name: 'home',
	fastRender: true,
	action: function() {
		this.render()
	}
})