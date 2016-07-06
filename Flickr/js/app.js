(function($){

"use strict";

var APP = window.APP || {},
	API_KEY = '993cbdd12c85e64a79fe48b1093c5d33',
	TAG = 'snow',
	PER_PAGE = 10,
	PAGE = 1;

APP.feedTemplate = function(photo){

	var photo = photo.photo;

	var IMG_SRC = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg',
		IMG_URL = 'http://www.flickr.com/photos/' + photo.owner.nsid + '/' + photo.id,
		TITLE = (photo.title._content) ? photo.title._content : 'No Title',
		PUBLISHED = photo.dates.taken,
		AUTHOR = photo.owner.realname,
		AUTHOR_URL = 'https://www.flickr.com/photos/' + photo.owner.nsid;
console.log(photo);

	var $feed = '<div class="item">';
		$feed += '<a href="' + IMG_URL + '" target="_blank" class="photo-image" style="background-image:url(' + IMG_SRC + ')"></a>';
		$feed += '<div class="meta">';
			$feed += '<h3><a href="#" data-id="' + photo.id + '" class="photo-detail">' + TITLE + '</a></h3>';
			
			if(AUTHOR)
			$feed += '<span class="photo-author">by <a href="' + AUTHOR_URL + '" target="_blank">' + AUTHOR + '</a></span>';

			$feed += '<span class="photo-date"> Published: ' + PUBLISHED + '</span>';
			$feed += '<a href="' + IMG_URL + '" target="_blank" class="photo-direct">VIEW ON FLICKR</a>';
		$feed += '</div>';
	$feed += '</div>';

	$('#feed').append($feed);
}


APP.getFeed = function(empty){

	if(empty)
	$('#feed').empty();
	

	if(!$('#feed .loader').length)
	$('#feed').append('<div class="loader"></div>');

	$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search',
		{
			api_key: API_KEY,
			tags: TAG,
			format: "json",
			per_page: PER_PAGE,
			page: PAGE,
			nojsoncallback : 1
		}
	).done(function(data){

		if(data.photos.photo.length > 1){
			$.each( data.photos.photo, function( i, photo ) {
				$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo', {
					api_key : API_KEY,
					photo_id : photo.id,
					format  : 'json',
					nojsoncallback : 1
				}).done(function(photo){
					APP.feedTemplate(photo);
				});
			});
		} else {
			$('#feed').append('<h3 class="no-result">Sorry, no results found for "' + TAG + '" .</h3>');
		}

		$('#feed').find('.loader').remove();
	});
}


APP.searchTag = function(){
	$('#search-top form').on('submit', function(e){
		e.preventDefault();

		TAG = $(this).find('input').val();

		APP.getFeed(true);
	});
}


APP.infiniteScroll = function(){
	$(window).scroll(function(){
		if ($(window).scrollTop() == $(document).height() - $(window).height()){
			PAGE++;
			APP.getFeed(false);
		}
	}); 
}


APP.photoDetail = function(){

	function showDetail(){
		$('body').delegate('.photo-detail', 'click', function(e){
			e.preventDefault();

			var $photo_id = $(this).data('id');

			$.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo', {
				api_key : API_KEY,
				photo_id : $photo_id,
				format  : 'json',
				nojsoncallback : 1
			}).done(function(photo){

				var photo = photo.photo;

				var IMG_SRC = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg',
					IMG_URL = 'http://www.flickr.com/photos/' + photo.owner.nsid + '/' + photo.id,
					TITLE = (photo.title._content) ? photo.title._content : 'No Title',
					PUBLISHED = APP.parseDate(photo.dateuploaded),
					AUTHOR = photo.owner.realname,
					AUTHOR_URL = 'https://www.flickr.com/photos/' + photo.owner.nsid,
					TAGS = '';

					$.each(photo.tags.tag, function(i, tag){
						TAGS += '<span>' + tag.raw + '</span>';
					});

				var $detail = '<div class="photo-inner">';
					$detail += '<a href="#" class="close">BACK</a>';
					$detail += '<h3><a href="' + IMG_URL + '" target="_blank">' + TITLE + '</a></h3>';

					$detail += '<div class="meta">';
						if(AUTHOR)
						$detail += 'by <a href="' + AUTHOR_URL + '" target="_blank" class="photo-author">' + AUTHOR + '</a> | ' ;

						$detail += '<span class="photo-date"> ' + PUBLISHED + '</span>';
					$detail += '</div>';

					$detail += '<div class="photo-detail">';
						$detail += '<img src="' + IMG_SRC + '" alt="" />';
						$detail += '<div class="photo-content">';
							if(photo.description._content)
							$detail += '<div class="photo-text"> ' + photo.description._content + '</div>';

							$detail += '<div class="photo-tags">' + TAGS +'</div>';
						$detail += '</div>';
					$detail += '</div>';

				$detail += '</div>';

				$('#photo-detail').html($detail).fadeIn(200, function(){
					$('.photo-inner').addClass('fadeIn');
				});
			});

		});

	}
	showDetail();

	function closeDetail(){
		$('body').delegate('#photo-detail .close', 'click', function(e){
			e.preventDefault();
			$('#photo-detail').fadeOut(200);
		});
	}
	closeDetail();

}


APP.init = function(){
	APP.getFeed(true);
	APP.searchTag();
	APP.infiniteScroll();
	APP.photoDetail();
}


$(document).ready(function(){
	APP.init();
});


})(jQuery);