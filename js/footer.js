
$(document).ready(function() {

$('.see_links_btn').click(function(e) {
	$('.footer-placement .quick_link_wrapper, .close_links_btn').show();
	$(this).hide();
});
$('.close_links_btn').click(function(e) {
	$('.footer-placement .quick_link_wrapper').hide();
	$('.see_links_btn').show();
	$(this).hide();
	});
 
});