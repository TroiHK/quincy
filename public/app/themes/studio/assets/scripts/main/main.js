$(function () {
	//Quick Search Bedroom Filter
	$('#quick-search ul li a').click(function (event) {
		event.preventDefault()
		$('#quick-search ul li a.selected').removeClass('selected')
		$(this).addClass('selected')
		$('#quick-search--bedroom').val($(this).attr('data-value'))
	})

	$('#quick-search--submit').click(function () {
		$('#quick-search').submit()
	})
})