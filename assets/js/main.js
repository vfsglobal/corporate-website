(function ($) {

	'use strict';

	//if master-page not found (when browser is not compatible then master-page element will be removed)
	if (!$('master-page').length) return;

	//cookie consent script
	$.getScript('https://cdn.cookielaw.org/consent/2e628dff-f2e3-422d-b42d-eb25f39afe44.js');

	var window_loaded = false,
		vue_mounted_and_image_loaded = false,
		window_completly_loaded = false;

	function check_window_loaded() {
		/*will not run function 
			if window is not loaded or vue is not mounted or all images are not loaded*/
		if (!window_loaded || !vue_mounted_and_image_loaded)
			return;

		window_completly_loaded = true;

		check_set_all();

		vfs.vue_app.window_loaded();
	}

	function check_set_all() {
		if (!window_completly_loaded)
			return false;

		//refresh grid system
		vfs.dynamic_columns.set_column();
		//set equal children height of element where data-equal_children_height attribute is given
		vfs.utilities.set_equal_children_height();

		return true;
	}

	function window_resized() {
		if (!check_set_all())
			return;

		vfs.vue_app.window_resized();
		//refresh carousel 3 times at interval of 1 second
		vfs.all_owl_carousel.multi_time_refresh(3);
	}

	function vue_app_mounted() {
		function check_window_loaded_and_refresh() {
			check_window_loaded();
			vfs.all_owl_carousel.multi_time_refresh();
		}

		//initializes grid systems
		vfs.dynamic_columns.init();

		vfs.all_owl_carousel.init();

		//go to vfs-global.js and find vfs.set_all_links to see more info about this
		vfs.set_all_links();

		//go to vfs-global.js and find vfs.init_smooth_scroll_bookmark to see more info about this
		vfs.init_smooth_scroll_bookmark();

		//go to vfs-global.js and find vfs.replace_bold to see more info about this
		vfs.replace_bold();

		//initializes image load event
		vfs.utilities.image.load_event.init();

		//adds all image loaded callback
		vfs.utilities.image.load_event.all_loaded_callbacks.add(function () {
			vue_mounted_and_image_loaded = true;
			check_window_loaded_and_refresh();
			vfs.all_owl_carousel.trigger('all_images_loaded');
		});

		//OptanonWrapper function will be called when onetrust cookie consent script will be loaded and executed
		window.OptanonWrapper = check_window_loaded_and_refresh;
	}

	//sets the global variables and will be used in many modules
	vfs.global_variables.set();

	//sets page details (for more info go to vfs-global.js and find vfs.details inside that search 'page')
	vfs.details.page.set();

	//initializes window dimension details
	vfs.details.window_dimension.init();

	//autoformat country data (written in all-country-data.json) and generate new computed data (e.g. visa/permits all visiting countries)
	vfs.country_data.autoformat_and_generate();

	//initializes google tag manager
	vfs.init_google_tag_manager();

	$(function () {
		//add callback on vue mounted hook
		vfs.vue_app.on_mounted.add(vue_app_mounted);

		//initializes vue application
		vfs.vue_app.init();
	});

	vfs.global_variables.$window.on('load', function () {
		window_loaded = true;
		check_window_loaded();
	});

	//add window dimension change callback which is similar to window resize event
	vfs.details.window_dimension.changed_callbacks.add(window_resized);

})(jQuery);