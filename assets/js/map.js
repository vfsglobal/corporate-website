/* Superior Web Systems */
var slide_duration = 500,
  all_resident_countries,
  all_visiting_countries,
  city_sort_fn,
  country_sort_fn;

function displayHideBox(boxNumber) {
  var $LightBox;

  if (boxNumber != undefined) $LightBox = $("#LightBox" + boxNumber);
  else $LightBox = $(".box_content.active");

  if (!$LightBox.length) return;

  if (!$LightBox.hasClass("active")) {
    animation.hide($(".box_content.active"));

    $("#grayBG").addClass("active");

    $LightBox.find("img[data-src]").each(function () {
      $(this)
        .attr("src", $(this).attr("data-src"))
        .removeAttr("data-src");
    });

    var $active_visiting_country = $(
      ".all_visiting_countries_container>ul.country_list>li>a.active"
    ),
      callback;

    if ($active_visiting_country.length) {
      var $tab_el = $LightBox.find(
        '.tabs_wrapper > ul.tabs > li > a[rel="' +
        all_visiting_countries[
          $active_visiting_country.children("span").html()
        ].resident_countries[
          $(".map > * > a[onclick]")
            .filter(function () {
              return new RegExp(
                "^\\s*displayHideBox\\s*\\(\\s*['|\"]?" +
                boxNumber +
                "['|\"]?\\s*\\)"
              ).test($(this).attr("onclick"));
            })
            .parent()
            .attr("class")
            .trim()
        ].rel +
        '"]'
      );

      switch_tabs($tab_el, true);

      callback = function () {
        vfs.utilities.vertical_scroll.animate_to_el($tab_el, 300);
      }
    }

    animation.show($LightBox, callback);
  } else {
    animation.hide($LightBox, function () {
      $("ul.tab_content_list > li.active").removeClass("active");
      $(".tabs a.active").removeClass("active");
    });
    $("#grayBG").removeClass("active");
  }
}

$(document).ready(function () {
  vfs.global_variables.set();

  vfs.details.window_dimension.init();

  create_all_sort_fn();

  generate_all_data();

  window.all_resident_countries = all_resident_countries;
  window.all_visiting_countries = all_visiting_countries;

  init_all_visiting_list();

  init_dropdown_container();

  init_tab_container();

  dynamic_columns.init();

  $("#grayBG").click(function () {
    displayHideBox();
  });


  $(".tabs a").click(function () {
    switch_tabs($(this));
  });

  var $active_city = $();

  $(document).click(function (e) {
    var $city_li = $(e.target).closest("ul.city_list > li");

    if ($city_li.is($active_city)) return;

    $active_city.removeClass("active");
    $active_city
      .children(".heading_details_wrapper")
      .children(".details_wrapper")
      .slideUp(slide_duration);
    $active_city = $();

    if (!$city_li.length) return;

    $active_city = $city_li.addClass("active");
    $city_li
      .children(".heading_details_wrapper")
      .children(".details_wrapper")
      .slideDown(slide_duration);
  });

  vfs.details.window_dimension.changed_callbacks.add(check_run_window_resize);

  window.document_ready = true;
  check_run_window_resize();
});

$(window).on('load', function () {
  window.loaded = true;
  check_run_window_resize();
});

var create_all_sort_fn = function () {
  var city_sort_config = {
    obj_key: "name",
    replace_chars: {
      Å: "A",
      ô: "o"
    },
    case_sensitive: false
  },
    get_sort_fn = vfs.utilities.functions.get_sort_fn;

  city_sort_fn = get_sort_fn(city_sort_config);

  country_sort_fn = get_sort_fn($.extend({}, city_sort_config, {
    exceptional_values: {
      top: [],
      bottom: ["Online Visa Application"]
    }
  }));
};

var init_tab_container = (function () {
  var config = {
    '.tab_container': {
      buttons: '.tab_buttons > button',
      contents: '.tab_content_wrapper > .tab_content',
      match_details: {
        button_attr: 'data-content-id',
        content_attr: 'id'
      },
      callbacks: {
        on_active: function (e) {
          e.$old_active_content.length && 
            e.$old_active_content.find('.dropdown_wrapper > div')
            .data('dropdown_data_displayer').hide_data_container();
            
          this._active_elements.$content.find('.dropdown_wrapper > div')
            .data('dropdown_data_displayer').show_data_container();
          
          set_iframe_height();
        }
      }
    }
  },

    tab = (function () {
      var main_constructor = function ($el, config) {
        this._$container = $el;
        this._config = config;

        this._elements = {
          $buttons: $el.find(config.buttons),
          $contents: $el.find(config.contents)
        };

        this._active_elements = {
          $button: $(),
          $content: $()
        };

        set_button_click_event(this);

        this._elements.$buttons.filter('.active').trigger('click');
      },

        set_button_click_event = (function () {
          var click_event = function (e) {
            var $this = $(this),
              obj = e.data,
              active_elements = obj._active_elements;

            if (active_elements.$button.is($this))
              return;

            var event_obj = {
              $old_active_button: active_elements.$button.removeClass('active'),
              $old_active_content: active_elements.$content.removeClass('active')
            };

            $this.addClass('active');

            var match_details = obj._config.match_details,
              attr = $this.attr(match_details.button_attr),
              $cur_content = obj._elements.$contents
                .filter('[' + match_details.content_attr + '="' + attr + '"]')
                .addClass('active');

            active_elements.$button = $this;
            active_elements.$content = $cur_content;

            var callbacks = obj._config.callbacks;

            callbacks && callbacks.on_active && callbacks.on_active.call(obj, event_obj);
          };

          return function (obj) {
            obj._elements.$buttons.on('click', obj, click_event);
          };
        })();

      return main_constructor;
    })();

  return function () {
    for (var container_selector in config) {
      var $el = $(container_selector);

      if ($el.length == 0)
        continue;

      var cur_config = config[container_selector];

      $el.each(function () {
        var $this = $(this);

        $this.data('tab_container', new tab($this, cur_config));
      });
    }
  };
})();
/* dropdown structure */
var init_dropdown_container = (function () {
  var common_config = {
    scroll_duration: 500
  },

    config = {
      '#resident_country_dropdown': {
        country_content_container: '#resident-content-container',
        country_list_name: 'visiting countries',
        country_list_data_key: 'visiting_countries',
        dropdown_placeholder: 'Search Resident country',
        data: function () {
          var data = JSON.parse(JSON.stringify(all_resident_countries));

          data.sort(country_sort_fn);

          for (var i = 0; i < data.length; i++) {
            var visiting_countries = data[i].visiting_countries;

            visiting_countries.sort(country_sort_fn);

            for (var j = 0; j < visiting_countries.length; j++) {
              visiting_countries[j].cities.sort(city_sort_fn);
              visiting_countries[j].non_cities.sort(city_sort_fn);
            }
          }

          return data;
        }
      },
      '#visiting_country_dropdown': {
        country_content_container: '#visiting-content-container',
        country_list_name: 'resident countries',
        country_list_data_key: 'resident_countries',
        dropdown_placeholder: 'Search Visiting country',
        data: function () {
          var all_visiting_country_names = Object.keys(all_visiting_countries).sort(country_sort_fn);

          var data = [];

          for (var i = 0; i < all_visiting_country_names.length; i++) {
            var cur_visiting_details = all_visiting_countries[all_visiting_country_names[i]],
              resident_country_details = cur_visiting_details.resident_countries,
              resident_data = [],
              resident_country_classes = Object.keys(resident_country_details);

            for (var j = 0; j < resident_country_classes.length; j++) {
              var cur_resident_details = resident_country_details[resident_country_classes[j]],
                cur_resident_complete_details = all_resident_countries[cur_resident_details.resident_index],
                cur_visiting_complete_details = cur_resident_complete_details.visiting_countries[cur_resident_details.visiting_index];

              cur_visiting_complete_details.cities.sort(city_sort_fn);
              cur_visiting_complete_details.non_cities.sort(city_sort_fn);

              resident_data.push({
                name: cur_resident_complete_details.name,
                flag: cur_resident_complete_details.flag,
                cities: cur_visiting_complete_details.cities,
                non_cities: cur_visiting_complete_details.non_cities,
                info: cur_visiting_complete_details.info
              });
            }

            resident_data.sort(country_sort_fn);

            data.push({
              name: all_visiting_country_names[i],
              flag: cur_visiting_details.flag,
              resident_countries: resident_data
            });
          }
          return data;
        }
      }
    },

    dropdown_data_displayer = (function () {
      var main_constructor = function ($dropdown, config) {
        this._config = config;
        this._elements = {
          $dropdown: $dropdown,
          $country_content_container: $(config.country_content_container)
        };

        var data = config.data;
        this._data = typeof config.data == 'function' ? data() : data;

        set_html(this);

        set_elements(this);

        this._selected_indexes = {};
        this.scroll_disabled = false;

        init_country_dropdown(this);

        set_all_events(this)
      },

        set_html = function (obj) {
          obj._elements.$country_content_container.html('<div class="country_list_container"><h2 class="main_heading medium_heading dim_color marv_0">Choose from <span class="country_count"></span>\
          '+ obj._config.country_list_name + ' to display locations below</h2>\
          <ul class="country_list col_type_normal padt_small non_inline" data-column-details="country_and_city_list"></ul>\
        </div>\
        <div class="city_and_non_city_list_container">\
          <h2 class="main_heading medium_heading dim_color padt_small marv_0">Choose from <span class="city_count"></span> locations\
            to display address</h2>\
          <ul class="city_and_non_city_list col_type_normal padt_small non_inline" data-column-details="country_and_city_list"></ul>\
        </div>\
        <div class="details_wrapper"></div>\
        <div class="extra_info"></div>');
        },

        set_elements = (function () {
          var elements_selector = {
            country_list_container: '.country_list_container',
            country_list: '.country_list',
            country_count: '.country_count',
            city_and_non_city_list_container: '.city_and_non_city_list_container',
            city_and_non_city_list: '.city_and_non_city_list',
            city_count: '.city_count',
            details_wrapper: ".details_wrapper",
            extra_info: ".extra_info"
          };

          return function (obj) {
            var element_key;

            for (var element_key in elements_selector)
              obj._elements['$' + element_key] = obj._elements.$country_content_container.find(elements_selector[element_key]);
          };
        })(),

        get_data = (function () {
          var is_correct_index = function (index) {
            return index != undefined && index != -1;
          };
          return {
            selected_dropdown_country_details: function (obj) {
              var dropdown_country_index = obj._selected_indexes.dropdown_country;

              return is_correct_index(dropdown_country_index) ? obj._data[dropdown_country_index] : {};
            },
            country_list_array: function (obj) {
              return get_data.selected_dropdown_country_details(obj)[obj._config.country_list_data_key] || [];
            },
            selected_country_list_details: function (obj) {
              var country_list = get_data.country_list_array(obj),
                from_country_list_cur_index = obj._selected_indexes.from_country_list;

              return is_correct_index(from_country_list_cur_index) ? country_list[from_country_list_cur_index] : {
                cities: [],
                non_cities: []
              };
            },
            selected_city_or_non_city_details: function (obj) {
              var selected_country_details = get_data.selected_country_list_details(obj),
                city_index = obj._selected_indexes.city,
                non_city_index = obj._selected_indexes.non_city,
                main_details;

              if (is_correct_index(city_index))
                main_details = selected_country_details.cities[city_index];
              else if (is_correct_index(non_city_index))
                main_details = selected_country_details.non_cities[non_city_index];

              return main_details || {};
            }
          };
        })(),

        render_li_and_animate_scroll = function (obj, $list, $container) {
          $list.children('li').each(function () {
            $(this).css('margin-right', '0px');
          });

          setTimeout(function () {
            $list.children('li').each(function () {
              $(this).css('margin-right', '');
            });

            check_and_scroll(obj, $container);
          });
        },

        check_and_scroll = function (obj, $el, scroll_pos) {
          if (!obj.scroll_disabled)
            animate_parent_frame_scroll($el, obj._config.scroll_duration, scroll_pos);
        },

        init_country_dropdown = (function () {
          var template_fn = function (element) {
            return '<div class="image_wrapper">\
                  <img src="' + element.flag + '" alt="' + element.name + ' Flag" />\
                </div>\
                <span>' + (element.name) + '</span>';
          },

            match_input_search = function (input_val, element) {
              var country_name = element.name,
                aliases = window.parent.vfs.data.country_aliases[country_name],
                input_val = input_val.toLowerCase(),
                country_name_index = country_name
                  .toLowerCase()
                  .indexOf(input_val),
                main_alias_index = -1;

              if (aliases) {
                for (var i = 0; i < aliases.length; i++) {
                  var cur_alias_index = aliases[i]
                    .toLowerCase()
                    .indexOf(input_val);

                  main_alias_index =
                    cur_alias_index == 0 ||
                      (cur_alias_index != -1 && main_alias_index != 0)
                      ? cur_alias_index
                      : main_alias_index;
                }
              }

              if (country_name_index == 0 || main_alias_index == 0)
                return 0;
              else if (
                country_name_index != -1 ||
                main_alias_index != -1
              )
                return 1;
              else return false;
            },

            callbacks = (function () {
              var set_dropdown_country_index = function (index, obj) {
                obj._selected_indexes.dropdown_country = index;
                obj._selected_indexes.from_country_list = -1;
                set_country_list(obj);
              };

              return {
                on_selected: function (e) {
                  var obj = this.dropdown_data_displayer_obj;

                  set_dropdown_country_index(e.index, obj);
                  render_li_and_animate_scroll(obj, obj._elements.$country_list, obj._elements.$country_list_container);
                },
                on_remove_selected: function () {
                  set_dropdown_country_index(-1, this.dropdown_data_displayer_obj);
                }
              };
            })();

          return function (obj) {
            var $dropdown = obj._elements.$dropdown;

            autocomplete
              .create(
                $dropdown
                  .attr("data-autocomplete", "")
                  .addClass("search_dropdown"),
                {
                  data: obj._data,
                  placeholder: obj._config.dropdown_placeholder,
                  list_template_html: template_fn,
                  selected_template_html: template_fn,
                  match_input_search: match_input_search,
                  callbacks: callbacks
                }
              )

            $dropdown.data('autocomplete').dropdown_data_displayer_obj = obj;
          };
        })(),

        set_all_events = (function () {
          var all_list_click_event_details = {
            country_list: function (e, $this, obj) {
              set_selected_index($this, 'from_country_list', e, obj);
              set_city_and_non_city_list(obj) ? render_li_and_animate_scroll(obj, obj._elements.$city_and_non_city_list, obj._elements.$city_and_non_city_list_container) : animate_scroll_to_details_wrapper(obj);
            },
            city_and_non_city_list: function (e, $this, obj) {
              set_selected_index($this, $this.hasClass('city') ? 'city' : 'non_city', e, obj);
              set_details_wrapper(obj);
              animate_scroll_to_details_wrapper(obj);
            }
          },
            animate_scroll_to_details_wrapper = function (obj) {
              check_and_scroll(obj, obj._elements.$details_wrapper, 'center');
            },

            set_selected_index = function ($el, selected_index_key, e, obj) {
              obj._selected_indexes.city = -1;
              obj._selected_indexes.non_city = -1;

              obj._selected_indexes[selected_index_key] = parseInt($el.attr('data-index'));

              $(e.delegateTarget).children('li').removeClass('active');
              $el.addClass('active');
            },

            generate_event_fn = function (main_event_fn) {
              return function (e) {
                var $this = $(this);

                if ($this.hasClass('active'))
                  return;

                return main_event_fn.call(this, e, $this, e.data);
              };
            };

          return function (obj) {
            for (var element_key in all_list_click_event_details)
              obj._elements['$' + element_key]
                .on('click', 'li', obj, generate_event_fn(all_list_click_event_details[element_key]));
          };
        })(),

        generate_li_index_html = function (arr, template_fn, class_name) {
          var html = '';

          for (var i = 0; i < arr.length; i++) {
            html += '<li data-index="' + i + '"' + (class_name ? ' class="' + class_name + '"' : '') + '>' +
              template_fn(arr, i, class_name)
            '</li>';
          }

          return html;
        },

        set_country_list = (function () {
          var template_fn = function (arr, index) {
            var cur_details = arr[index];

            return '<div class="image_wrapper">\
          <img src="' + cur_details.flag + '" alt="' + cur_details.name + ' Flag" />\
        </div>\
        <span>' + cur_details.name + '</span>';
          };

          return function (obj) {
            var listed_countries = get_data.country_list_array(obj),
              html = generate_li_index_html(listed_countries, template_fn);

            obj._elements.$country_list.html(html);
            obj._elements.$country_count.html(listed_countries.length);

            obj._elements.$country_list_container.css('display', html ? 'block' : 'none');

            set_city_and_non_city_list(obj);
          };
        })(),

        set_city_and_non_city_list = (function () {
          var template_fn = function (arr, index) {
            var cur_details = arr[index];

            return '<span>' + cur_details.name + '</span>';
          };

          return function (obj) {
            var selected_country_details = get_data.selected_country_list_details(obj),
              cities = selected_country_details.cities,
              non_cities = selected_country_details.non_cities,
              html,
              cities_or_non_cities_added = false;

            if (cities.length == 0 && non_cities.length == 1) {
              html = '';
              obj._selected_indexes.non_city = 0;
            } else {
              html = generate_li_index_html(cities, template_fn, 'city') +
                generate_li_index_html(non_cities, template_fn, 'non_city');
              cities_or_non_cities_added = true;
            }

            obj._elements.$city_count.html(cities.length);
            obj._elements.$city_and_non_city_list.html(html);

            obj._elements.$city_and_non_city_list_container.css('display', html ? 'block' : 'none');

            set_extra_info(obj);
            set_details_wrapper(obj);

            return cities_or_non_cities_added;
          };
        })(),

        set_extra_info = function (obj) {
          var selected_country_details = get_data.selected_country_list_details(obj);

          obj._elements.$extra_info.html(selected_country_details.info || '');
        },

        set_details_wrapper = function (obj) {
          var cur_details = get_data.selected_city_or_non_city_details(obj),
            $details_wrapper = obj._elements.$details_wrapper;

          if(cur_details.content) {
            $details_wrapper
              .html('<div class="main_details">' + cur_details.content + '</div>\
                <a class="more_info" href="' + cur_details.link + '" target="_blank">\
                  <span></span>\
                </a>')
              .addClass('show');
          } else {
            $details_wrapper
              .html('')
              .removeClass('show');
          }

          dynamic_columns.set_column(true);
          set_iframe_height();
        },
        
        show_data_container = function(obj) {
          obj._elements.$country_content_container.addClass('active');
        },
        
        hide_data_container = function(obj) {
          obj._elements.$country_content_container.removeClass('active');
        };

        main_constructor.prototype.show_data_container = function() {
          show_data_container(this);
        };

        main_constructor.prototype.hide_data_container = function() {
          hide_data_container(this);
        };

      return main_constructor;
    })();

  return function () {
    for (var dropdown_selector in config) {
      var $el = $(dropdown_selector);

      if ($el.length == 0)
        continue;

      var cur_config = config[dropdown_selector];

      $el.each(function () {
        var $this = $(this);

        $this.data('dropdown_data_displayer', new dropdown_data_displayer($this, $.extend({}, common_config, cur_config)));
      });
    }
  };
})();

function set_iframe_height() {
  vfs.global_variables.$frame.css('height', vfs.global_variables.$body.outerHeight() + 1 + 'px');
}

var animate_parent_frame_scroll = (function () {
  var all_scroll_position = {
    top: function (data) {
      return data.el_top;
    },
    center: function (data) {
      return data.el_top - window.parent.vfs.details.window_dimension.height / 2 + data.$el.outerHeight() / 2;
    }
  };

  return function (element, scroll_duration, scroll_position) {
    scroll_position = scroll_position || 'top';

    window.parent.vfs.utilities.vertical_scroll.animate(
      all_scroll_position[scroll_position]({
        $el: element,
        el_top: element.offset().top + vfs.global_variables.$frame.offset().top
      }),
      scroll_duration
    );
  };
})();

function check_run_window_resize() {
  if (!window.loaded || !window.document_ready) return;

  dynamic_columns.set_column();
  set_iframe_height();
}

var generate_all_data = (function () {
  function auto_correct_name(name) {
    return $.trim(name.replace(/&amp;/g, '&').replace(/\s+/g, ' '));
  }

  function generate_all_resident_countries() {
    all_resident_countries = [];

    $all_box_content = $(".box_content");

    $(".map > * > a").each(function () {
      var $resident_country_link = $(this),
        resident_name = auto_correct_name($resident_country_link.children("span").html()),
        visiting_countries = [],
        lightbox_num = $.trim(sub_string(
          $resident_country_link.attr("onclick"),
          "displayHideBox('",
          "')"
        )),
        resident_flag = $resident_country_link.attr("data-flag"),
        $cur_lightbox = $all_box_content.filter(
          "#LightBox" +
          lightbox_num
        ),
        $all_tab_content_li = $cur_lightbox.find(
          ".tab-content-inner > .country_map_container > ul.tab_content_list > li"
        );

      $cur_lightbox.find(".tabs_wrapper > ul.tabs > li > a").each(function () {
        var $visiting_country_link = $(this),
          visiting_name = auto_correct_name($visiting_country_link.children("span").html()),
          cities = [],
          non_cities = [],
          $cur_tab_content_li = $all_tab_content_li.filter(
            "#" + $visiting_country_link.attr("rel")
          ),
          $info_el = $cur_tab_content_li.children(".info");

        $cur_tab_content_li.find(".heading_details_wrapper").each(function () {
          var $cur_heading_details_wrapper = $(this),
            $city_li = $cur_heading_details_wrapper.closest('li'),
            heading = $cur_heading_details_wrapper.children("h5").html(),
            is_orange = $city_li.hasClass('orange'),
            city_name_find_text = /\sfrom\s/i,
            heading_find_text_match = heading.match(city_name_find_text),
            $details_wrapper = $cur_heading_details_wrapper.children(".details_wrapper"),
            content = $details_wrapper.find('.main_details').html() || '',
            geo_position = $city_li.attr('data-geo-position'),
            data;

          if (!is_orange) {
            if (heading_find_text_match)
              heading = heading.substring(
                heading_find_text_match.index + heading_find_text_match[0].length
              );
            else
              throw Error('Invalid heading "' + heading + '"');
          }

          if (!is_orange && !$.trim(content))
            throw Error('there is no content given in non orange city named "' + heading + '" in visiting country "' + visiting_name + '" in resident country "' + resident_name + '"');

          content = content.split(/<\s*hr\s*\/?>/gi);

          if (content.length > 1) {
            for (var i = 0; i < content.length; i++)
              if (!content[i].trim().length) throw Error('content does not have any text in city "' + heading + '" in visiting country "' + visiting_name + '" in resident country "' + resident_name + '"');
          }

          if (geo_position) {
            geo_position = geo_position.split(',');
            geo_position[0] = parseFloat($.trim(geo_position[0]));
            geo_position[1] = parseFloat($.trim(geo_position[1]));
          }

          data = {
            name: auto_correct_name(heading),
            content: content.length > 1 ? content : content[0],
            link: $details_wrapper.find('a.more_info').attr('href'),
            position: [$city_li.css('left'), $city_li.css('top')],
            geo_position: geo_position
          };

          !is_orange ? cities.push(data) : non_cities.push(data);
        });

        visiting_countries.push({
          name: visiting_name,
          flag: $visiting_country_link
            .children(".image_wrapper")
            .children("img")
            .attr("src"),
          dropdown_resident_name: $visiting_country_link.attr("data-dropdown-resident-name"),
          cities: cities,
          non_cities: non_cities,
          rel: $visiting_country_link.attr("rel"),
          info: $.trim($info_el.html()),
          info_name: $.trim($info_el.attr('data-name'))
        });
      });

      all_resident_countries.push({
        name: resident_name,
        class_name: $resident_country_link
          .parent()
          .attr("class")
          .trim(),
        lightbox_num: lightbox_num,
        flag: resident_flag,
        dropdown_resident_name: $resident_country_link.attr("data-dropdown-resident-name"),
        visiting_countries: visiting_countries
      });
    });
  }

  function generate_all_visiting_countries() {
    all_visiting_countries = {};

    for (var i = 0; i < all_resident_countries.length; i++) {
      var visiting_countries = all_resident_countries[i].visiting_countries;

      for (var j = 0; j < visiting_countries.length; j++) {
        var visiting_name = visiting_countries[j].name;

        all_visiting_countries[visiting_name] = all_visiting_countries[
          visiting_name
        ] || {
            flag: visiting_countries[j].flag,
            resident_countries: {}
          };
        all_visiting_countries[visiting_name].resident_countries[
          all_resident_countries[i].class_name
        ] = {
            resident_index: i,
            visiting_index: j,
            rel: visiting_countries[j].rel
          };
      }
    }
  }

  return function () {
    generate_all_resident_countries();
    generate_all_visiting_countries();
  };
})();

var init_all_visiting_list = (function () {
  var all_visiting_country_names,
    alphabet_data,
    add_alphabets = function () {
      var $alphabet_list = $("<ul>")
        .addClass("alphabet_list")
        .append(
          '<li><a href="javascript:;" data-alphabet="*" class="active">All</a></li>'
        )
        .prependTo(".all_visiting_countries_container"),
        cur_alphabet;

      alphabet_data = {
        "*": all_visiting_country_names
      };

      for (var i = 0; i < all_visiting_country_names.length; i++) {
        cur_alphabet = all_visiting_country_names[i].toUpperCase().charAt(0);

        if (
          i == 0 ||
          cur_alphabet !=
          all_visiting_country_names[i - 1].toUpperCase().charAt(0)
        ) {
          alphabet_data[cur_alphabet] = [];

          $alphabet_list.append(
            '<li><a href="javascript:;" data-alphabet="' +
            cur_alphabet +
            '">' +
            cur_alphabet +
            "</a></li>"
          );
        }

        alphabet_data[cur_alphabet].push(all_visiting_country_names[i]);
      }
    },
    add_visiting_countries = function () {
      var $country_list = $(".all_visiting_countries_container > ul.country_list"),
        cur_visiting_countries =
          alphabet_data[
          $(
            ".all_visiting_countries_container > ul.alphabet_list > li > a.active"
          ).attr("data-alphabet")
          ];

      $country_list.html("");

      for (var i = 0; i < cur_visiting_countries.length; i++) {
        $country_list.append(
          '<li>\
                    <a href="javascript:;">\
                        <div class="image_wrapper">\
                            <img src="' +
          all_visiting_countries[cur_visiting_countries[i]].flag +
          '" alt="' +
          cur_visiting_countries[i] +
          '" />\
                        </div>\
                        <span>' +
          cur_visiting_countries[i] +
          "</span>\
                    </a>\
                </li>"
        );
      }
    },
    remove_country_list_selection = function () {
      $(".map_container > .map > *").removeClass("hide");
      $(".all_visiting_countries_container > ul.country_list > li > a").removeClass(
        "active"
      );
    },
    set_event = (function () {
      var set_alphabet_event = (function () {
        var on_click = function () {
          var $this = $(this);

          if ($this.attr("data-alphabet") != "*" && $this.hasClass("active"))
            return;

          remove_country_list_selection();

          $(
            ".all_visiting_countries_container > ul.alphabet_list > li > a"
          ).removeClass("active");
          $this.addClass("active");

          add_visiting_countries();

          set_iframe_height();
        };

        return function () {
          $(document).on(
            "click",
            ".all_visiting_countries_container > ul.alphabet_list > li > a",
            on_click
          );
        };
      })(),
        set_country_list_event = (function () {
          var on_click = function () {
            var $this = $(this),
              was_active = $this.hasClass("active");

            remove_country_list_selection();

            if (was_active) return;

            $this.addClass("active");

            $(".map_container > .map > *")
              .filter(
                ":not(." +
                Object.keys(
                  all_visiting_countries[$this.children("span").html()]
                    .resident_countries
                ).join(", .") +
                ")"
              )
              .addClass("hide");

            window.parent.vfs.utilities.vertical_scroll.animate_to_el(vfs.global_variables.$frame, 500);
          };

          return function () {
            $(document).on(
              "click",
              ".all_visiting_countries_container > ul.country_list > li > a",
              on_click
            );
          };
        })();

      return function () {
        set_alphabet_event();
        set_country_list_event();
      };
    })();

  return function () {
    all_visiting_country_names = Object.keys(all_visiting_countries).sort(country_sort_fn);

    add_alphabets();

    $("<ul>")
      .addClass("country_list")
      .appendTo(".all_visiting_countries_container");
    add_visiting_countries();

    set_event();
  };
})();

var animation = {
  show: function ($el, callback) {
    $el.addClass("active show show_animation");
    $el.data("animate-end", false);
    $el.one(
      "webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend",
      function () {
        if ($el.data("animate-end")) return;

        $el.data("animate-end", true);

        $el.removeClass("show show_animation");
        callback && callback($el);
      }
    );
  },
  hide: function ($el, callback) {
    $el.removeClass("active").addClass("show hide_animation");
    $el.data("animate-end", false);
    $el.one(
      "webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend",
      function () {
        if ($el.data("animate-end")) return;

        $el.data("animate-end", true);

        $el.removeClass("show hide_animation");
        callback && callback($el);
      }
    );
  }
};

function switch_tabs(obj, prevent_animation) {
  var $tab_content = $("#" + obj.attr("rel")),
    $active_tab_content = $("ul.tab_content_list > li.active");

  if ($tab_content.is($active_tab_content)) return;

  prevent_animation
    ? $active_tab_content.removeClass("active")
    : animation.hide($active_tab_content);
  $(".tabs a.active").removeClass("active");

  prevent_animation
    ? $tab_content.addClass("active")
    : animation.show($tab_content);
  obj.addClass("active");
}

function sub_string(str, start_str, end_str) {
  var start_str_index = str.indexOf(start_str),
    substring_start_index = start_str_index + start_str.length,
    end_str_index = str.indexOf(end_str, substring_start_index);

  return start_str_index == -1 || end_str_index == -1
    ? null
    : str.substring(substring_start_index, end_str_index);
}

var vfs = {};

vfs.create_blank_object = function (prototype) {
  var data = function () { },
    get_calling_fn = function (key) {
      return function () {
        prototype[key].apply(main_data, Array.prototype.slice.call(arguments));
      };
    };

  for (var key in prototype) data.prototype[key] = get_calling_fn(key);

  data.prototype.loop = function (fn, extra_param) {
    var return_val;

    for (var key in main_data) {
      if (!main_data.hasOwnProperty(key)) continue;

      return_val = fn(key, main_data[key], main_data, extra_param);

      if (return_val !== undefined) break;
    }

    return return_val;
  };

  var main_data = new data();

  return main_data;
};

vfs.global_variables = vfs.create_blank_object({
  set: (function () {
    var param_details = {
      window: window,
      document: document,
      html: "html",
      body: "body",
      html_body: "html, body",
      head: "head",
      frame: frameElement
    };

    return function () {
      vfs.utilities.jQuery.create_elements(param_details, this);
    };
  })()
});

vfs.prototypes = {
  callback: (function () {
    var main_callback = function (options) {
      options = options || {};

      this.__callbacks = [];

      this.__on_add = options.on_add;
      this.__call_condition = options.call_condition;
      this.__set_one_time = options.set_one_time;
    };

    main_callback.constants = {
      do_add: 0,
      do_call: 1,
      do_both: 2
    };

    main_callback.prototype.add = function (callback, options) {
      var on_add_return_val;

      options = options || {};

      if (this.__on_add) on_add_return_val = this.__on_add(options);

      if (
        on_add_return_val != undefined &&
        (on_add_return_val.status == main_callback.constants.do_call ||
          on_add_return_val.status == main_callback.constants.do_both)
      ) {
        callback.call(
          on_add_return_val.this_param,
          on_add_return_val.event_obj,
          options.data
        );
      }

      if (this.__set_one_time) options.is_one_time = true;

      if (
        on_add_return_val == undefined ||
        on_add_return_val.status == main_callback.constants.do_add ||
        on_add_return_val.status == main_callback.constants.do_both
      ) {
        this.__callbacks.push(
          $.extend(
            {
              fn: callback
            },
            options
          )
        );
      }
    };

    main_callback.prototype.remove = function (callback) {
      if (callback == undefined) {
        this.__callbacks.splice(0, this.__callbacks.length);
      } else {
        var remove_indexes = [];

        for (var i = 0; i < this.__callbacks.length; i++) {
          if (
            (typeof callback == "string" &&
              this.__callbacks[i].name === callback) ||
            (typeof callback == "function" &&
              this.__callbacks[i].fn === callback)
          ) {
            remove_indexes.push(i);
          }
        }

        vfs.utilities.json_and_arr.remove_indexes_from_arr(
          this.__callbacks,
          remove_indexes
        );
      }
    };

    main_callback.prototype._call = function (
      event_obj,
      this_param,
      prevent_condition_check
    ) {
      if (typeof this_param == "boolean") {
        prevent_condition_check = this_param;
        this_param = undefined;
      }

      event_obj = event_obj || {};
      this_param = this_param || window;

      event_obj.preventDefault = false;

      var callback_return_val,
        do_call_callback,
        remove_indexes = [];

      for (var i = 0; i < this.__callbacks.length; i++) {
        callback_return_val = null;
        do_call_callback = null;

        if (
          prevent_condition_check !== true &&
          this.__call_condition != undefined
        )
          do_call_callback = this.__call_condition(
            this.__callbacks[i],
            i,
            event_obj
          );

        if (do_call_callback !== false) {
          callback_return_val = this.__callbacks[i].fn.call(
            this_param,
            event_obj,
            this.__callbacks[i].data
          );

          if (this.__callbacks[i].is_one_time) remove_indexes.push(i);

          if (callback_return_val === false) {
            event_obj.preventDefault = true;
            break;
          }
        }
      }

      vfs.utilities.json_and_arr.remove_indexes_from_arr(
        this.__callbacks,
        remove_indexes
      );

      return event_obj;
    };

    return main_callback;
  })()
};

vfs.details = {
  window_dimension: (function () {
    var init = function () {
      _module.changed_callbacks = new vfs.prototypes.callback();

      set();

      vfs.global_variables.$window.resize(window_resized);
    },
      set = function () {
        var width = _module.width,
          height = _module.height;

        if (vfs.details.browser.name == "Safari") {
          _module.width = vfs.global_variables.$html.width();
          _module.height = vfs.global_variables.$html.height();
        } else {
          _module.width =
            window.innerWidth ||
            document.documentElement.clientWidth ||
            document.body.clientWidth;
          _module.height =
            window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight;
        }

        return _module.width !== width || _module.height !== height;
      },
      window_resized = function () {
        if (set()) _module.changed_callbacks._call(_module);
      },
      _module = {
        init: init
      };

    return _module;
  })(),
  browser: (function () {
    var name = null,
      version = null,
      support_transitions = (function () {
        var b = document.body || document.documentElement,
          s = b.style,
          p = "transition";

        if (typeof s[p] === "string") {
          return true;
        }

        // Tests for vendor specific prop
        var v = ["Moz", "webkit", "Webkit", "Khtml", "O", "ms"];
        p = p.charAt(0).toUpperCase() + p.substr(1);

        for (var i = 0; i < v.length; i++) {
          if (typeof s[v[i] + p] === "string") {
            return true;
          }
        }

        return false;
      })(),
      appVersion = navigator.appVersion,
      MSIEIndex = appVersion.indexOf("MSIE"),
      support_canvas = (function () {
        var elem = document.createElement("canvas");
        return !!(elem.getContext && elem.getContext("2d"));
      })(),
      support_placeholder = (function () {
        var i = document.createElement("input");
        return "placeholder" in i;
      })();

    if (MSIEIndex !== -1) {
      name = "IE";
      version = parseInt(
        $.trim(
          appVersion.substring(
            MSIEIndex + "MSIE".length,
            appVersion.indexOf(".", MSIEIndex)
          )
        )
      );
    }

    if (name === null && /constructor/i.test(window.HTMLElement)) {
      name = "Safari";
    }

    return {
      name: name,
      version: version,
      support_transitions: support_transitions,
      support_canvas: support_canvas,
      support_placeholder: support_placeholder
    };
  })()
};

vfs.utilities = {
  string: {
    auto_format_fn: {
      overwrite: function (txt) {
        return txt;
      },
      prepend: function (txt, old_txt) {
        return txt + old_txt;
      },
      append: function (txt, old_txt) {
        return old_txt + txt;
      }
    },
    transform_case: (function () {
      var case_fn_name = {
        upper_first: "toUpperCase",
        lower_first: "toLowerCase"
      },
        get_fn = function (case_type) {
          var cur_case_fn = case_fn_name[case_type];

          return function (str) {
            return str.charAt(0)[cur_case_fn]() + str.substring(1);
          };
        },
        _module = {};

      for (var key in case_fn_name) _module[key] = get_fn(key);

      return _module;
    })(),
    replace_hyphen_to_camelcase: (function () {
      var replace_hyphen_char_to_uppercase = function (str) {
        return str.charAt(1).toUpperCase();
      };

      return function (str) {
        return str.replace(/-./g, replace_hyphen_char_to_uppercase);
      };
    })(),
    replace_chars: function (str, replace_data) {
      for (var i = 0; i < str.length; i++) {
        var char = str[i];

        if (!replace_data.hasOwnProperty(char))
          continue;

        var replace_str = replace_data[char];

        str = str.substring(0, i) + replace_str + str.substring(i + 1);
        i += replace_str.length - 1;
      }

      return str;
    }
  },
  json_and_arr: {
    get_all_keys: function (obj) {
      var all_keys = [];

      for (var key in obj) all_keys.push(key);

      return all_keys;
    },
    get_key_of_value: function (obj, value) {
      for (var key in obj) {
        if (obj[key] == value) return key;
      }

      return null;
    },
    get_swap_value: function (swap_obj, value) {
      var str_value = value.toString();

      if (swap_obj[str_value] != undefined) return swap_obj[str_value];
      else return vfs.utilities.json_and_arr.get_key_of_value(swap_obj, value);
    },
    get_key_of_true_condition: function (obj) {
      if (typeof obj != 'object' || $.isArray(obj))
        return obj;

      for (var key in obj) {
        if (obj[key]()) {
          return key;
        }
      }

      return null;
    },
    remove_indexes_from_arr: function (main_arr, indexes_arr) {
      indexes_arr.sort().reverse();

      for (var i = 0; i < indexes_arr.length; i++)
        main_arr.splice(indexes_arr[i], 1);

      return main_arr;
    },
    loop_obj: function (obj, fn, keys, end_return_val, extra_fn_param) {
      if (typeof obj != "object" || obj == null) return;

      var return_val,
        are_prevent_keys = false;

      if (keys && typeof keys == "object" && !$.isArray(keys)) {
        are_prevent_keys = keys.are_prevent_keys;
        keys = keys.keys;
      }

      if (!keys || are_prevent_keys) {
        for (var key in obj) {
          if ($.inArray(key, keys) != -1) continue;

          return_val = fn(obj, key, obj[key], extra_fn_param);
          if (return_val != undefined) return return_val;
        }
      } else {
        for (var i = 0; i < keys.length; i++) {
          return_val = fn(obj, keys[i], obj[keys[i]], extra_fn_param);
          if (return_val != undefined) return return_val;
        }
      }

      return end_return_val;
    },
    get_defined_keys_from_arr: function (all_keys, obj) {
      var defined_keys = [];

      for (var i = 0; i < all_keys.length; i++) {
        if (all_keys[i] in obj) defined_keys.push(all_keys[i]);
      }

      return defined_keys;
    },
    is_equal: (function () {
      var has_all_equal_value = (function () {
        var loop_fn = function (obj, key, value, data) {
          if (value === data.obj2[key]) return;

          if (
            !(data.deep
              ? vfs.utilities.json_and_arr.is_equal(
                value,
                data.obj2[key],
                data.also_deep_keys ? data.keys : null,
                data.deep,
                data.also_deep_keys
              )
              : false)
          )
            return false;
        };

        return function (obj1, obj2, keys, deep, also_deep_keys) {
          var param = {
            obj2: obj2,
            keys: keys,
            deep: deep,
            also_deep_keys: also_deep_keys
          };

          return vfs.utilities.json_and_arr.loop_obj(
            obj1,
            loop_fn,
            keys,
            true,
            param
          );
        };
      })();

      return function (obj1, obj2, keys, deep, also_deep_keys) {
        if (typeof keys == "boolean") {
          deep = keys;
          keys = undefined;
        }

        also_deep_keys = also_deep_keys || false;

        return typeof obj1 == "object" && typeof obj2 == "object"
          ? has_all_equal_value(obj1, obj2, keys, deep, also_deep_keys) &&
          Boolean(
            keys ||
            has_all_equal_value(obj2, obj1, keys, deep, also_deep_keys)
          )
          : false;
      };
    })(),
    update_value: (function () {
      var loop_obj = function (obj, key, value, param) {
        obj[key] = param.set_fn(param.value, value);
      };

      return function (obj, value, set_fn, keys) {
        if (typeof set_fn == "object") {
          keys = set_fn;
          set_fn = undefined;
        }

        set_fn = set_fn || vfs.utilities.string.auto_format_fn.overwrite;

        return vfs.utilities.json_and_arr.loop_obj(obj, loop_obj, keys, obj, {
          value: value,
          set_fn: set_fn
        });
      };
    })(),
    flat_arr: (function () {
      var flat = function (arr, depth) {
        depth = isNaN(depth) ? 1 : Number(depth);

        var new_arr = [],
          val;

        for (var i = 0; i < arr.length; i++) {
          val = arr[i];

          if (val instanceof Array && depth)
            new_arr.push.apply(new_arr, flat(val, depth - 1));
          else
            new_arr.push(val)
        }

        return new_arr;
      };

      return flat;
    })(),
    convert_arr: (function () {
      var all_map_fn = {
        lowercase: function (val) {
          return val.toLowerCase();
        }
      },

        get_main_fn = function (map_fn_name) {
          var map_fn = all_map_fn[map_fn_name];

          return function (arr) {
            return arr.map(map_fn);
          };
        },

        _module = {};

      for (var key in all_map_fn)
        _module[key] = get_main_fn(key);

      return _module;
    })()
  },
  functions: {
    get_sort_fn: (function () {
      var get_loop_data_fn = function (config) {
        var init = config.init,
          loop = config.loop,
          return_val = config.return_val;

        return function (data) {
          var args = Array.prototype.slice.call(arguments),
            cur_data = init && init.apply(this, args);

          if (loop) {
            for (var key in data)
              loop(data, key, data[key], cur_data);
          }

          return return_val && return_val(data, cur_data);
        };
      },

        all_updata_data_fn = [
          //set value if object
          get_loop_data_fn({
            init: function (data, options) {
              return options.obj_key;
            },
            loop: function (data, key, val, obj_key) {
              data[key] = typeof val == 'object' && obj_key ? val[obj_key] : val;
            }
          }),

          //replace chars
          get_loop_data_fn({
            init: function (data, options) {
              return options.replace_chars;
            },
            loop: function (data, key, val, replace_chars) {
              data[key] = typeof val == 'string' && replace_chars ? vfs.utilities.string.replace_chars(val, replace_chars) : val;
            }
          }),

          //convert lowercase for case-insensitive match
          get_loop_data_fn({
            init: function (data, options) {
              return options.case_sensitive;
            },
            loop: function (data, key, val, case_sensitive) {
              data[key] = typeof val == 'string' && !case_sensitive ? val.toLowerCase() : val;
            }
          })
        ],

        all_return_data_fn = [
          //sort for exceptional values
          get_loop_data_fn({
            init: function (data, options) {
              var exceptional_values = options.exceptional_values;

              if (!exceptional_values || options.case_sensitive) return exceptional_values;

              var new_exceptional_values = {};

              for (var key in exceptional_values)
                new_exceptional_values[key] = vfs.utilities.json_and_arr.convert_arr.lowercase(exceptional_values[key]);

              return new_exceptional_values;
            },
            return_val: (function () {
              var all_key_details = {
                top: -1,
                bottom: 1
              },

                is_in_arr = function (exceptional_values, key, data) {
                  var arr = exceptional_values[key],
                    cur_key_num = all_key_details[key],
                    a_index = $.inArray(data.a, arr),
                    b_index = $.inArray(data.b, arr),
                    a_in_arr = a_index != -1,
                    b_in_arr = b_index != -1;

                  if (a_in_arr && b_in_arr)
                    return a_index < b_index ? -1 : 1;
                  else if (a_in_arr && !b_in_arr)
                    return cur_key_num;
                  else if (!a_in_arr && b_in_arr)
                    return -cur_key_num;
                  else
                    return null;
                };

              return function (data, exceptional_values) {
                return exceptional_values && (is_in_arr(exceptional_values, 'top', data) ||
                  is_in_arr(exceptional_values, 'bottom', data));
              };
            })()
          })
        ];

      return function (options) {
        var order = options.is_descending ? -1 : 1;

        return function (a, b) {
          var data = {
            a: a,
            b: b
          };

          for (var i = 0; i < all_updata_data_fn.length; i++)
            all_updata_data_fn[i](data, options);

          for (var i = 0; i < all_return_data_fn.length; i++) {
            var return_val = all_return_data_fn[i](data, options);

            if (return_val)
              return return_val;
          }

          return order * (data.a < data.b ? -1 : 1);
        };
      };
    })()
  },
  css: {
    get_inline_css: (function () {
      var prefixes = ["", "Webkit", "ms", "Moz", "O"];

      return function (el, css_name) {
        var css_first_capital_name, css_style_name, el_css_value;

        css_name = vfs.utilities.string.replace_hyphen_to_camelcase(css_name);

        css_first_capital_name = vfs.utilities.string.transform_case.upper_first(
          css_name
        );

        for (var i = 0; i < prefixes.length; i++) {
          if (prefixes[i] == "") css_style_name = css_name;
          else css_style_name = prefixes[i] + css_first_capital_name;

          el_css_value = el.style[css_style_name];

          if (el_css_value != "" && el_css_value != undefined) break;
        }

        return el_css_value == undefined ? "" : el_css_value;
      };
    })()
  },
  jQuery: {
    is_or_contains: function (container, target) {
      return $.contains(container, target) || $(container).is(target);
    },
    create_elements: (function () {
      var autoset_cur_param = function (cur_param) {
        return typeof cur_param == "function" ? cur_param() : cur_param;
      };

      return function (param_details, target_obj, container_key) {
        target_obj = target_obj || {};
        container_key =
          !container_key && target_obj.hasOwnProperty("container")
            ? "container"
            : container_key;

        var cur_param,
          $container = container_key
            ? $(autoset_cur_param(param_details[container_key]))
            : null,
          $el;

        for (var key in param_details) {
          if (key == container_key) {
            $el = $container;
          } else {
            cur_param = autoset_cur_param(param_details[key]);
            $el = $container ? $container.find(cur_param) : $(cur_param);
          }

          target_obj["$" + key] = $el;
        }

        return target_obj;
      };
    })(),
    create_plugin_module: function (plugin_module_name, common_obj_main_selector, main_module, default_options, additional_features, allow_public) {
      if (typeof default_options == "boolean") {
        allow_public = default_options;
        default_options = undefined;
      } else if (typeof additional_features == "boolean") {
        allow_public = additional_features;
        additional_features = undefined;
      }

      default_options = default_options || {};
      additional_features = additional_features || {};

      default_options.callbacks = default_options.callbacks || {};
      default_options.callbacks.on_init = null;

      var all_obj = [],
        create_options = (function () {
          var create_callback = function (callback_name, callback) {
            var cur_global_callbacks =
              _module.global_callbacks[callback_name];

            return function (e) {
              cur_global_callbacks._call(e, this);

              callback && callback.call(this, e);
            };
          };

          return function (passed_options) {
            var options = $.extend(true, {}, default_options, passed_options),
              callbacks = options.callbacks;

            for (var callback_name in callbacks)
              callbacks[callback_name] = create_callback(
                callback_name,
                callbacks[callback_name]
              );

            return options;
          };
        })(),
        main_constructor = function ($el, options) {
          this._$element = $el;
          this._options = options;

          main_module.constructor.call(this);

          options.callbacks.on_init.call(this);
        },
        set_prototype = (function () {
          var default_prototype = {
            set_options: function (obj, force) {
              for (var key in obj) {
                if (!force && obj[key] == this._options[key]) continue;

                main_module.set_option_methods[key] &&
                  main_module.set_option_methods[key](this, obj[key]);

                this._options[key] = obj[key];
              }
            }
          };

          return function () {
            $.extend(
              main_constructor.prototype,
              default_prototype,
              main_module.prototype
            );
          };
        })(),
        call_constructor = function ($el, passed_options) {
          var obj = new main_constructor($el, create_options(passed_options));

          $el.data(plugin_module_name, obj);

          return obj;
        },
        check_set_init_common_obj = (function () {
          var init_common_obj = function (all_selector_options) {
            all_selector_options = all_selector_options || {};

            $(common_obj_main_selector).each(function () {
              var $this = $(this),
                cur_selector_options;

              for (var selector in all_selector_options) {
                if ($this.is(selector)) {
                  cur_selector_options = all_selector_options[selector];
                  break;
                }
              }

              all_obj.push(call_constructor($this, cur_selector_options));
            });
          };

          return function () {
            if (!common_obj_main_selector) return;

            _module.init_common_obj = init_common_obj;
          };
        })(),
        _module = {
          default_options: default_options,
          call_fn_to_all_obj: function ($content_wrapper, fn_name, fn_param) {
            if (typeof $content_wrapper == "string") {
              fn_name = $content_wrapper;
              $content_wrapper = undefined;
            }

            $content_wrapper = $content_wrapper || vfs.global_variables.$body;

            var content_wrapper = $content_wrapper[0];

            for (var i = 0; i < all_obj.length; i++) {
              if (
                vfs.utilities.jQuery.is_or_contains(
                  content_wrapper,
                  all_obj[i].$el[0]
                )
              )
                all_obj[i][fn_name](fn_param);
            }
          },
          global_callbacks: (function () {
            var default_callbacks = default_options.callbacks,
              global_callbacks = {};

            for (var callback_name in default_callbacks)
              global_callbacks[callback_name] = new vfs.prototypes.callback();

            return global_callbacks;
          })()
        },
        create_fn = function ($el, options) {
          return $el.each(function () {
            all_obj.push(call_constructor($(this), options));
          });
        },
        set_additional_features = function () {
          $.extend(true, _module, additional_features);

          additional_features.create = create_fn;
        },
        set_if_allow_public = function () {
          if (allow_public) _module.create = create_fn;
        };

      check_set_init_common_obj();
      set_prototype();
      set_additional_features();
      set_if_allow_public();

      return _module;
    }
  },
  classes: (function () {
    var has_class = function ($el, classes, condition, return_values) {
      if (typeof classes == "string") classes = classes.split(" ");

      for (var i = 0; i < classes.length; i++) {
        if (condition($el, classes[i]))
          return return_values.on_condition_true;
      }

      return return_values.on_end;
    },
      has_any_class = (function () {
        var condition = function ($el, cur_class) {
          return $el.hasClass(cur_class);
        };

        return function ($el, classes) {
          return has_class($el, classes, condition, {
            on_condition_true: true,
            on_end: false
          });
        };
      })(),
      has_all_class = (function () {
        var condition = function ($el, cur_class) {
          return !$el.hasClass(cur_class);
        };

        return function ($el, classes) {
          return has_class($el, classes, condition, {
            on_condition_true: false,
            on_end: true
          });
        };
      })(),
      replace_class = function (
        $el,
        current_class,
        replace_class,
        prevent_checking
      ) {
        $el.each(function (index, element) {
          var $this = $(this);

          if (prevent_checking === true || $this.hasClass(current_class))
            $this.removeClass(current_class).addClass(replace_class);
        });
      };

    return {
      has_any_class: has_any_class,
      has_all_class: has_all_class,
      replace_class: replace_class
    };
  })(),
  vertical_scroll: (function () {
    var get_scroll_top = function (el) {
      if (el.is("body")) return vfs.global_variables.$window.scrollTop();

      return el.scrollTop();
    },
      get_scrollable_el = (function () {
        var get_overflow = function (el) {
          if (el.is("body")) return "auto";

          var overflow = el.css("overflow").toLowerCase();

          if (overflow == "") return el.css("overflow-y").toLowerCase();

          return overflow;
        };

        return function (el) {
          var parent_el = el,
            parent_overflow;

          while (parent_overflow != "auto" && parent_overflow != "scroll") {
            parent_el = parent_el.parent();
            parent_overflow = get_overflow(parent_el);
          }

          return parent_el;
        };
      })(),
      get_animate_top_of_el = (function () {
        var get_data = (function () {
          var data_pops_fn = [
            {
              prop: "el_offset_top",
              fn: function (elements) {
                return elements.main_el.offset().top;
              }
            },
            {
              prop: "scrollable_el_offset_top",
              fn: function (elements) {
                return elements.scrollable_el.offset().top;
              }
            },
            {
              prop: "el_height",
              fn: function (elements) {
                return elements.main_el.outerHeight();
              }
            },
            {
              prop: "scrollable_el_height",
              fn: function (elements) {
                return elements.scrollable_el.outerHeight();
              }
            },
            {
              prop: "scroll_top",
              fn: function (elements) {
                return get_scroll_top(elements.scrollable_el);
              }
            },
            {
              prop: "el_related_top",
              fn: function (elements, data) {
                if (elements.scrollable_el.is("body"))
                  return data.el_offset_top;

                return (
                  data.el_offset_top -
                  data.scrollable_el_offset_top +
                  data.scroll_top
                );
              }
            },
            {
              prop: "max_scroll_top",
              fn: (function () {
                var set_auto_height_temporary = function (
                  scrollable_el,
                  data,
                  fn,
                  fn_param
                ) {
                  var height =
                    vfs.utilities.css.get_inline_css(
                      scrollable_el[0],
                      "height"
                    ) || "",
                    max_height =
                      vfs.utilities.css.get_inline_css(
                        scrollable_el[0],
                        "max-height"
                      ) || "";

                  scrollable_el.css({
                    height: "auto",
                    maxHeight: "none",
                    overflowY: "scroll"
                  });

                  fn(fn_param);

                  scrollable_el.css({
                    height: height,
                    maxHeight: max_height,
                    overflowY: ""
                  });

                  scrollable_el.scrollTop(data.scroll_top);
                },
                  set_max_scroll_top = function (param) {
                    param.max_scroll_top =
                      param.scrollable_el.outerHeight() -
                      param.initial_height;
                  };

                return function (elements, data) {
                  if (elements.scrollable_el.is("body"))
                    return (
                      data.scrollable_el_height -
                      vfs.details.window_dimension.height
                    );

                  var param = {
                    scrollable_el: elements.scrollable_el,
                    initial_height: data.scrollable_el_height
                  };

                  set_auto_height_temporary(
                    elements.scrollable_el,
                    data,
                    set_max_scroll_top,
                    param
                  );

                  return param.max_scroll_top;
                };
              })()
            }
          ];

          return function (elements) {
            var data = {};

            for (var i = 0; i < data_pops_fn.length; i++)
              data[data_pops_fn[i].prop] = data_pops_fn[i].fn(elements, data);

            return data;
          };
        })(),
          get_animate_top_fn = {
            scroll_to_top: function (elements, data) {
              return data.el_related_top;
            },
            scroll_to_show: function (elements, data) {
              var scroll_to_top = get_animate_top_fn.scroll_to_top(
                elements,
                data
              ),
                match_offset_top = elements.scrollable_el.is("body")
                  ? data.scroll_top
                  : data.scrollable_el_offset_top,
                match_height = elements.scrollable_el.is("body")
                  ? vfs.details.window_dimension.height
                  : data.scrollable_el_height;

              if (data.el_offset_top < match_offset_top) return scroll_to_top;
              else if (
                data.el_offset_top + data.el_height >
                match_offset_top + match_height
              )
                return scroll_to_top - match_height + data.el_height;
              else return data.scroll_top;
            }
          };

        return function (el, animate_top_type) {
          var elements = {
            main_el: el,
            scrollable_el: get_scrollable_el(el)
          },
            animate_top,
            prev_scroll_top = elements.scrollable_el.scrollTop(),
            data = get_data(elements);

          animate_top_type = animate_top_type || "scroll_to_top";

          animate_top = get_animate_top_fn[animate_top_type](elements, data);

          animate_top = animate_top < 0 ? 0 : animate_top;
          animate_top =
            animate_top > data.max_scroll_top
              ? data.max_scroll_top
              : animate_top;

          elements.scrollable_el.scrollTop(prev_scroll_top);

          return animate_top;
        };
      })(),
      animate = function (el, animate_top, duration, callback, behaviour) {
        if (typeof el == "number") {
          behaviour = callback;
          callback = duration;
          duration = animate_top;
          animate_top = el;
          el = undefined;
        }

        if (typeof callback == "string") {
          behaviour = callback;
          callback = undefined;
        }

        behaviour = behaviour || "normal";

        el = el || vfs.global_variables.$html_body;

        if (el.is("html") || el.is("body"))
          el = vfs.global_variables.$html_body;

        if (behaviour == "prevent_if_animating" && el.is(":animated"))
          return false;

        if (get_scroll_top(el) != animate_top) {
          if (behaviour == "jump_to_end") el.stop(true, true);
          else el.stop();

          el.animate(
            {
              scrollTop: animate_top
            },
            duration,
            callback
          );
        } else if (callback != undefined) {
          callback();
        }

        return true;
      },
      animate_to_el = function (el, duration, callback, options) {
        if (typeof callback == "object") {
          options = callback;
          callback = undefined;
        }

        options = options || {};

        return animate(
          get_scrollable_el(el),
          get_animate_top_of_el(el, options.animate_top_type),
          duration,
          callback,
          options.behaviour
        );
      };

    return {
      get_animate_top_of_el: get_animate_top_of_el,
      animate: animate,
      animate_to_el: animate_to_el
    };
  })(),
  slide_element: (function () {
    var slide_type = {
      swap_props: {
        show: "hide"
      },
      details: {
        show: {
          get_from_to_height_fn: {
            from: function ($el, el_height) {
              return el_height == $el.css("height", "").height()
                ? 0
                : el_height;
            },
            to: function ($el) {
              return $el.css("height", "").height();
            }
          },
          css_height_for_scroll_top: "",
          from_to_keys: {
            from: "from",
            to: "to"
          }
        },
        hide: {
          check_condition: function ($el) {
            return $el.hasClass("show");
          },
          get_from_to_height_fn: {
            from: function ($el) {
              return $el.height();
            },
            to: function ($el) {
              return 0;
            }
          },
          css_height_for_scroll_top: "0px",
          from_to_keys: {
            from: "to",
            to: "from"
          },
          on_complete: function ($el) {
            $el.css("display", "");
          }
        }
      },
      init_dynamic: function () {
        slide_type.all_classes = vfs.utilities.json_and_arr.get_all_keys(
          slide_type.details
        );
      }
    },
      check_and_slide = (function () {
        var all_callbacks = ['before_animation', 'on_complete'],

          animation_completed = function ($el, type_details, animate_extra_css, callbacks) {
            $el.css({
              'height': '',
              'overflow': ''
            });

            if (animate_extra_css != undefined)
              $el.css(vfs.utilities.json_and_arr.update_value($.extend({}, animate_extra_css), ''));

            if (type_details.on_complete)
              type_details.on_complete($el);

            vfs.utilities.check_call_callback(callbacks, 'on_complete', $el);
          },

          scroll_top = {
            on_before_start: function ($el, type_details) {
              var previous_height = $el.css('height'),
                previous_scroll_top = vfs.global_variables.$window.scrollTop(),
                animate_top;

              $el.css('height', type_details.css_height_for_scroll_top);

              animate_top = vfs.utilities.vertical_scroll.get_animate_top_of_el($el);

              $el.css('height', previous_height);
              vfs.global_variables.$html_body.scrollTop(previous_scroll_top);

              return animate_top;
            },
            on_after_start: function (animate_top, duration) {
              if (duration)
                vfs.utilities.vertical_scroll.animate(animate_top, duration);
              else
                vfs.global_variables.$html_body.scrollTop(animate_top);
            }
          },

          get_css_obj_from_animation_details = function (animation_details, key) {
            var css_obj = {};

            for (var css_prop in animation_details)
              css_obj[css_prop] = animation_details[css_prop][key];

            return css_obj;
          };

        return function ($el, type, type_details, duration, animate_extra_css, callbacks, do_scroll) {
          if (!($el instanceof jQuery) || $el.length == 0)
            return false;

          if ($el.hasClass(type) || (type_details.check_condition && !type_details.check_condition($el)))
            return false;

          //autoset params

          if (typeof callbacks == 'boolean') {
            do_scroll = callbacks;
            callbacks = undefined;
          }

          if (typeof animate_extra_css == 'object' &&
            vfs.utilities.json_and_arr.get_defined_keys_from_arr(all_callbacks, animate_extra_css).length) {
            callbacks = animate_extra_css;
            animate_extra_css = undefined;
          } else if (typeof animate_extra_css == 'boolean') {
            do_scroll = animate_extra_css;
            animate_extra_css = undefined;
          }

          if (typeof duration == 'object') {
            if (!vfs.utilities.json_and_arr.get_defined_keys_from_arr(all_callbacks, duration).length) {
              animate_extra_css = duration;
              duration = undefined;
            } else {
              callbacks = duration;
              duration = undefined;
            }
          } else if (typeof duration == 'boolean') {
            do_scroll = duration;
            duration = undefined;
          }

          duration = duration || 0;
          callbacks = callbacks || {};
          do_scroll = do_scroll || false;

          //end autoset params

          $el.css('display', 'block');

          vfs.utilities.check_call_callback(callbacks, 'before_animation', $el);

          var el_height = $el.height(),
            animate_obj = {
              height: type_details.get_from_to_height_fn.to($el, el_height)
            },
            swapped_type = vfs.utilities.json_and_arr.get_swap_value(slide_type.swap_props, type),
            scroll_top_return_val = do_scroll ? scroll_top.on_before_start($el, type_details) : null;

          $el.css('height', type_details.get_from_to_height_fn.from($el, el_height) + 'px');

          if (animate_extra_css) {
            $el.css(get_css_obj_from_animation_details(animate_extra_css, type_details.from_to_keys.from));

            $.extend(animate_obj, get_css_obj_from_animation_details(animate_extra_css, type_details.from_to_keys.to));
          }

          vfs.utilities.classes.replace_class($el, swapped_type, type, true);

          if (duration) {
            $el.stop().animate(animate_obj, duration, function () {
              animation_completed($(this), type_details, animate_extra_css, callbacks);
            });
          } else {
            animation_completed($el, type_details, animate_extra_css, callbacks);
          }

          if (do_scroll)
            scroll_top.on_after_start(scroll_top_return_val, duration);

          return true;
        }
      })(),
      get_slide_fn = function (type) {
        var type_details = slide_type.details[type];

        return function (
          $el,
          duration,
          animate_extra_css,
          callbacks,
          do_scroll
        ) {
          return check_and_slide(
            $el,
            type,
            type_details,
            duration,
            animate_extra_css,
            callbacks,
            do_scroll
          );
        };
      },
      _module = {
        init: slide_type.init_dynamic
      };

    for (var type in slide_type.details) _module[type] = get_slide_fn(type);

    return _module;
  })(),
  check_call_callback: function (
    callback,
    param,
    extra_param,
    condition,
    condition_param
  ) {
    if (!callback) return;

    if (typeof extra_param == "function") {
      condition_param = condition;
      condition = extra_param;
      extra_param = undefined;
    }

    if (typeof callback == "function") {
      if (!condition || condition(condition_param))
        return callback(param, extra_param);
    } else if (typeof callback == "object") {
      return vfs.utilities.check_call_callback(
        callback[param],
        extra_param,
        callback[param + "_param"],
        condition,
        condition_param
      ); //here param name, first parameter is dynamic from name_param
    }
  }
};

var dynamic_columns = (function () {
  var column_options = {
    country_and_city_list: {
      "4": function () {
        return vfs.details.window_dimension.width >= 650;
      },
      "3": function () {
        return vfs.details.window_dimension.width < 650 && vfs.details.window_dimension.width >= 450;
      },
      "2": function () {
        return vfs.details.window_dimension.width < 450;
      }
    }
  },

    extra_classes = {},

    force_set,
    column_details_attr = 'data-column-details',
    column_details_selector = '[' + column_details_attr + ']',
    $column_details_el,
    column_index_class_names = ['first', 'second', 'third', 'fourth', 'fifth'],

    init = function ($content_wrapper) {
      $content_wrapper = $content_wrapper || vfs.global_variables.$body;

      $column_details_el = $content_wrapper.find(column_details_selector);

      set_column();
    },

    set_column = (function () {
      var loop_all_column_details = function () {
        var $this = $(this),
          $all_childrens = $this.children(),
          cur_column = $this.attr('data-column'),
          column = vfs.utilities.json_and_arr.get_key_of_true_condition(
            column_options[$this.attr(column_details_attr)]
          );

        $all_childrens.addClass('cur_no_transition');

        if (force_set || cur_column != column) {
          $this.attr('data-column', column);

          $all_childrens.removeClass(column_index_class_names.join(' '));
          $all_childrens.removeClass('first_in_row last_in_row first_row last_row last');

          column = JSON.parse(column);

          if (column) {
            $all_childrens.attr('data-row-index', function (index) {
              return Math.floor(index / column);
            });

            for (var i = 1; i <= column; i++)
              $all_childrens.filter(":nth-child(" + column + "n + " + i + ")").addClass(column_index_class_names[i - 1]);

            var all_childrens_length = $all_childrens.length;

            $all_childrens.filter(":nth-child(" + column + "n+1)").addClass('first_in_row');
            $all_childrens.filter(":nth-child(" + column + "n)").addClass('last_in_row');

            var total_first_row_el = column > all_childrens_length ? all_childrens_length : column;

            var total_last_row_el = all_childrens_length % column;
            total_last_row_el = total_last_row_el == 0 ? column : total_last_row_el;

            $all_childrens.filter(":nth-child(-n+" + total_first_row_el + ")").addClass('first_row');
            $all_childrens.filter(":gt(-" + (total_last_row_el + 1) + ")").addClass('last_row');
          }

          $all_childrens.filter(":last-child").addClass('last');

          for (var key in extra_classes) {
            if (!$this.is(key))
              continue;

            var cur_extra_classes = extra_classes[key];
            cur_column_classes = cur_extra_classes.column_classes[String(column)],
              cur_column_classes_length = cur_column_classes.length;

            $all_childrens.removeClass(cur_extra_classes.all_extra_classes);

            $all_childrens.each(function (index, element) {
              $(this).addClass(cur_column_classes[index % cur_column_classes_length]);
            });
          }
        }

        setTimeout(function () {
          $all_childrens.removeClass('cur_no_transition');
        }, 50);
      };

      return function (force_set_param) {
        force_set = force_set_param;
        $column_details_el.each(loop_all_column_details);
      };
    })();

  return {
    init: init,
    set_column: set_column
  };
})(),

  autocomplete = vfs.utilities.jQuery.create_plugin_module('autocomplete', '[data-autocomplete]', (function () {
    var set_option_methods = (function () {
      var add_wrapper_element = function (
        obj,
        key,
        new_value,
        class_name,
        $children
      ) {
        key = "_$" + key;

        if (obj[key]) obj[key].remove();

        if (typeof new_value == "function")
          new_value = new_value.call(obj);

        if (new_value && !(new_value instanceof jQuery))
          new_value = $(new_value);

        if (new_value) obj[key] = new_value;
        else obj[key] = $("<div>").appendTo(obj._$element);

        obj[key].addClass(class_name).append($children);
      },
        get_template_html = function (
          obj,
          template_fn,
          data_element,
          index
        ) {
          return template_fn
            ? template_fn.call(obj, data_element, index)
            : data_element.toString();
        };

      return {
        data: (function () {
          var check_and_set_all_index = (function () {
            var all_index_details = [
              {
                key: "_hover_index",
                fn: function (obj) {
                  set_index.hover(obj, -1);
                }
              },
              {
                key: "_prev_hover_index",
                fn: function (obj) {
                  obj._prev_hover_index = -1;
                }
              },
              {
                key: "_selected_index",
                fn: function (obj) {
                  set_index.selected(obj, -1);
                }
              }
            ],
              is_data_at_index_same = function (obj, value, index) {
                var cur_obj_data = obj._options.data[index],
                  cur_value = value[index];

                if (
                  typeof cur_obj_data == "object" &&
                  cur_value == "object"
                )
                  return vfs.utilities.json_and_arr.is_equal(
                    cur_obj_data,
                    cur_value,
                    true
                  );
                else return cur_obj_data === cur_value;
              };

            return function (obj, value) {
              for (var i = 0; i < all_index_details.length; i++) {
                if (
                  !is_data_at_index_same(
                    obj,
                    value,
                    obj[all_index_details[i].key]
                  )
                )
                  all_index_details[i].fn(obj);
              }
            };
          })();

          return function (obj, value, is_initial) {
            var template_fn = obj._options.list_template_html;

            var $list_all_li = $();

            for (var i = 0; i < value.length; i++) {
              $list_all_li = $list_all_li.add(
                $("<li>")
                  .attr("data-index", i)
                  .html(get_template_html(obj, template_fn, value[i], i))
              );
            }

            obj._$list_all_li = $list_all_li;

            if (!is_initial) set_all_events(obj, "list_all_li");

            check_and_set_all_index(obj, value);

            obj._visible_data_indexes = null;

            set_visible_list(obj, value);
          };
        })(),
        placeholder: function (obj, value) {
          obj._$input_search_el.attr("placeholder", value);
        },
        disabled: function (obj, value) {
          if (value) {
            set_focus(obj, false);

            obj._$element.addClass("disabled");
            obj._$input_search_el.attr("disabled", "");
          } else {
            obj._$element.removeClass("disabled");
            obj._$input_search_el.removeAttr("disabled");
          }
        },
        toggle_button_html: function (obj, value) {
          obj._$toggle_button.html(value);
        },
        remove_selection_button_html: function (obj, value) {
          obj._$remove_selection_button.html(value);
        },
        list_template_html: function (obj, value) {
          var data = obj._options.data;

          for (var i = 0; i < data.length; i++) {
            obj._$list_all_li
              .filter('[data-index="' + index + '"]')
              .html(get_template_html(obj, value, data[i], i));
          }
        },
        selected_template_html: function (obj, value) {
          var index = obj._selected_index;

          if (
            index == undefined ||
            !(index >= 0 && index < obj._options.data.length)
          )
            obj._$selected.html("");
          else
            obj._$selected.html(
              get_template_html(obj, value, obj._options.data[index], index)
            );
        },
        not_found_html: function (obj, value) {
          obj._$not_found.html(value);
        },
        list_always_show: function (obj, value) {
          set_list_view(obj, value || obj._has_focus ? "show" : "hide");
        },
        slide_direction: function (obj, value) {
          obj._$element.removeClass("slide-list-up slide-list-down");

          if (obj._options.list_always_show || !obj._has_focus) return;

          obj._$element.addClass("slide-list-" + value);

          var top_offset = obj._$list_wrapper.offset().top,
            bottom_offset = top_offset + obj._$list_wrapper.outerHeight(),
            scroll_top = vfs.global_variables.$window.scrollTop();

          if (value == "up" && top_offset < scroll_top)
            obj._$element
              .removeClass("slide-list-up")
              .addClass("slide-list-down");
          else if (
            value == "down" &&
            bottom_offset > scroll_top + vfs.details.window_dimension.height
          )
            obj._$element
              .removeClass("slide-list-down")
              .addClass("slide-list-up");
        },
        input_wrapper: function (obj, value) {
          add_wrapper_element(
            obj,
            "input_wrapper",
            value,
            "input-wrapper",
            obj._$input_search_el
          );
        },
        selected_wrapper: function (obj, value) {
          add_wrapper_element(
            obj,
            "selected_wrapper",
            value,
            "selected-wrapper",
            obj._$selected.add(obj._$remove_selection_button)
          );
        },
        toggle_button_wrapper: function (obj, value) {
          add_wrapper_element(
            obj,
            "toggle_button_wrapper",
            value,
            "toggle-button-wrapper",
            obj._$toggle_button
          );
        },
        list_wrapper: function (obj, value) {
          add_wrapper_element(
            obj,
            "list_wrapper",
            value,
            "list-wrapper",
            obj._$section_list.add(obj._$not_found)
          );
        },
        list_section_wrapper: function (obj, value) {
          obj._options.list_section_wrapper = value;
          set_visible_list(obj);
        }
      };
    })(),
      constructor = function () {
        this._has_focus = false;

        this._$element.addClass("autocomplete-search-box");

        create_all_wrapper(this);

        set_option_methods.data(this, this._options.data, true);

        set_all_events(this);

        set_option_methods.disabled(this, this._options.disabled);
      },
      get_li_index = function ($li) {
        return parseInt($li.attr("data-index"));
      },
      create_all_wrapper = (function () {
        var all_wrapper_details = [
          {
            name: "input_wrapper",
            on_before: function (obj) {
              obj._$input_search_el = $(
                '<input type="text" autocomplete="off" />'
              ).addClass("search-input");
              set_option_methods.placeholder(obj, obj._options.placeholder);
            }
          },
          {
            name: "selected_wrapper",
            on_before: function (obj) {
              obj._$selected = $("<div>").addClass("selected");
              obj._$remove_selection_button = $("<div>").addClass(
                "remove-selection-button"
              );
              set_option_methods.remove_selection_button_html(
                obj,
                obj._options.remove_selection_button_html
              );
            }
          },
          {
            name: "toggle_button_wrapper",
            on_before: function (obj) {
              obj._$toggle_button = $("<div>").addClass("toggle-button");
              set_option_methods.toggle_button_html(
                obj,
                obj._options.toggle_button_html
              );
            }
          },
          {
            name: "list_wrapper",
            on_before: function (obj) {
              obj._$section_list = $("<ul>").addClass("section-list");

              obj._$not_found = $("<div>").addClass("not-found");
              set_option_methods.not_found_html(
                obj,
                obj._options.not_found_html
              );
            },
            on_after: function (obj) {
              set_option_methods.list_always_show(
                obj,
                obj._options.list_always_show
              );
            }
          }
        ];

        return function (obj) {
          var option_name, on_before, on_after;

          for (var i = 0; i < all_wrapper_details.length; i++) {
            option_name = all_wrapper_details[i].name;
            on_before = all_wrapper_details[i].on_before;
            on_after = all_wrapper_details[i].on_after;

            on_before && on_before(obj);
            set_option_methods[option_name](obj, obj._options[option_name]);
            on_after && on_after(obj);
          }
        };
      })(),
      set_input_val = function (obj, from_set_visible_list) {
        var prev_input_val = obj._input_val;

        obj._input_val = obj._$input_search_el.val();
        obj._$element.attr("data-input", obj._input_val);

        if (prev_input_val != obj._input_val) {
          obj._options.callbacks.on_input_changed.call(obj, {
            prev_input_val: prev_input_val,
            cur_input_val: obj._input_val
          });
        }

        if (!from_set_visible_list) set_visible_list(obj);
      },
      force_render_all_list_li = (function () {
        var each_fn = function () {
          var $this = $(this);

          $this.css("display", "none");
          this.offsetHeight;
          $this.css("display", "");
        };

        return function (obj) {
          setTimeout(function () {
            var scroll_top = obj._$section_list.scrollTop();

            obj._$list_all_li.each(each_fn);

            obj._$section_list.scrollTop(scroll_top);
          });
        };
      })(),
      set_visible_list = (function () {
        var set_other_elements = function (obj) {
          if (obj._visible_data_indexes.length) {
            obj._$element.removeClass("no-items");
            obj._$section_list.removeClass("hide");
            obj._$not_found.addClass("hide");
          } else {
            obj._$element.addClass("no-items");
            obj._$section_list.addClass("hide");
            obj._$not_found.removeClass("hide");
          }
        },
          list_wrapper_height_animator = {
            init: function (obj) {
              obj._$list_wrapper.css("height", "");
              obj._list_wrapper_height = obj._$list_wrapper.height();
            },
            animate: (function () {
              var animation_completed = function (obj) {
                $(this).css("height", "");
              };

              return function (obj, event_data) {
                if (!event_data.prev_visible_data_indexes) {
                  delete obj._list_wrapper_height;
                  return;
                }

                var animate_height = obj._$list_wrapper.height();

                obj._$list_wrapper.css("height", obj._list_wrapper_height);

                obj._$list_wrapper.stop().animate(
                  {
                    height: animate_height
                  },
                  obj._options.slide_duration,
                  function () {
                    animation_completed.call(this);
                    force_render_all_list_li(obj);
                  }
                );

                delete obj._list_wrapper_height;
              };
            })()
          },
          get_new_visible_data_indexes = function (obj, data) {
            var match_input_search = obj._options.match_input_search,
              new_visible_data_indexes = [];

            data = data || obj._options.data;

            for (var i = 0; i < data.length; i++) {
              var match_input_search_val = match_input_search.call(
                obj,
                obj._input_val,
                data[i],
                i
              );

              if (
                typeof match_input_search_val != "number" &&
                !match_input_search_val
              ) {
                if (obj._hover_index == i) set_index.hover(obj, -1);

                continue;
              }

              match_input_search_val =
                match_input_search_val === true ? 0 : match_input_search_val;

              new_visible_data_indexes[match_input_search_val] =
                new_visible_data_indexes[match_input_search_val] || [];
              new_visible_data_indexes[match_input_search_val].push(i);
            }

            return new_visible_data_indexes;
          },
          set_all_li = (function () {
            var add_list_section_wrapper = function (obj, section_index) {
              var list_section_wrapper = obj._options.list_section_wrapper,
                $list_section_wrapper,
                $list_section_main_wrapper,
                $list_section_content_wrapper,
                $list_section_main_list;

              $list_section_wrapper =
                list_section_wrapper && list_section_wrapper(section_index);
              $list_section_wrapper = $list_section_wrapper || $("<div>");

              if (!($list_section_wrapper instanceof jQuery)) {
                $list_section_main_wrapper =
                  $list_section_wrapper.$main_wrapper;
                $list_section_content_wrapper =
                  $list_section_wrapper.$content_wrapper;
              }

              $list_section_main_wrapper =
                $list_section_main_wrapper || $list_section_wrapper;
              $list_section_content_wrapper =
                $list_section_content_wrapper || $list_section_main_wrapper;

              $list_section_main_wrapper.addClass(
                "list-section-main-wrapper"
              );
              $list_section_content_wrapper.addClass(
                "list-section-content-wrapper"
              );

              $list_section_main_list = $("<ul>");

              $list_section_content_wrapper.append($list_section_main_list);

              obj._$section_list.append(
                $("<li>").append($list_section_main_wrapper)
              );

              return $list_section_main_list;
            };

            return function (obj) {
              var visible_data_indexes = obj._visible_data_indexes,
                $list_section_main_list;

              obj._$list_all_li.detach();
              obj._$section_list.html("");

              for (var i = 0; i < visible_data_indexes.length; i++) {
                if (!visible_data_indexes[i]) {
                  visible_data_indexes.splice(i, 1);
                  i--;
                  continue;
                }

                $list_section_main_list = add_list_section_wrapper(obj, i);

                for (var j = 0; j < visible_data_indexes[i].length; j++)
                  $list_section_main_list.append(
                    obj._$list_all_li.filter(
                      '[data-index="' + visible_data_indexes[i][j] + '"]'
                    )
                  );
              }
            };
          })();

        return function (obj, data) {
          set_input_val(obj, true);

          var new_visible_data_indexes = get_new_visible_data_indexes(
            obj,
            data
          ),
            visible_indexes_changed =
              !obj._visible_data_indexes ||
              obj._visible_data_indexes.join(";") !=
              new_visible_data_indexes.join(";"),
            event_data = {
              prev_visible_data_indexes: obj._visible_data_indexes,
              current_visible_data_indexes: new_visible_data_indexes
            };

          obj._visible_data_indexes = new_visible_data_indexes;

          if (!visible_indexes_changed) return;

          list_wrapper_height_animator.init(obj);

          set_all_li(obj);

          set_other_elements(obj, event_data);

          list_wrapper_height_animator.animate(obj, event_data);

          obj._options.callbacks.on_visible_list_changed.call(
            obj,
            event_data
          );
        };
      })(),
      scroll_list = (function () {
        var options = {
          animate_top_type: "scroll_to_show",
          behaviour: "jump_to_end"
        };

        return function ($el, duration) {
          if ($el instanceof jQuery && $el.length && duration != -1 && $el.closest('body').length) {
            vfs.utilities.vertical_scroll.animate_to_el(
              $el,
              duration,
              options
            );
          }
        };
      })(),
      in_visible_data_indexes = function (obj, index) {
        var section_index = -1,
          found_index = -1;

        for (var i = 0; i < obj._visible_data_indexes.length; i++) {
          found_index = $.inArray(index, obj._visible_data_indexes[i]);

          if (found_index != -1) {
            section_index = i;
            break;
          }
        }

        return {
          section_index: section_index,
          found_index: found_index
        };
      },
      set_index = (function () {
        var all_set_details = {
          hover: {
            extra_condition: function (obj, index) {
              return (
                in_visible_data_indexes(obj, index).section_index != -1
              );
            },
            on_set: function (obj, options) {
              if (!options.dont_scroll_list)
                scroll_list(
                  obj._$list_hover_li,
                  obj._options.scroll_list_duration_on_hover
                );
            },
            on_remove: function (obj, data) {
              obj._prev_hover_index = data.index;
            }
          },
          selected: (function () {
            var set_selected_el = function (obj) {
              set_option_methods.selected_template_html(
                obj,
                obj._options.selected_template_html
              );
            },
              check_and_blur = function (obj) {
                if (obj._options.blur_on_select) set_focus(obj, false);
              };

            return {
              on_set: function (obj) {
                set_selected_el(obj);
                check_and_blur(obj);
              },
              on_no_set: function (obj, index) {
                if (index == obj._selected_index) check_and_blur(obj);
              },
              on_remove: set_selected_el
            };
          })()
        },
          main_set_fn = (function () {
            var remove_index = function (obj, set_key, keys, cur_set_details) {
              if (obj[keys.index] == -1) return;

              var callback_param = {
                index: obj[keys.index],
                $li: obj[keys.li]
              };

              set_props(obj, -1, set_key, keys);

              cur_set_details.on_remove &&
                cur_set_details.on_remove(obj, callback_param);

              obj._options.callbacks[keys.remove_callback].call(
                obj,
                callback_param
              );
            },
              set_props = function (obj, index, set_key, keys) {
                obj[keys.index] = index;

                if (index == -1) {
                  obj[keys.li] && obj[keys.li].removeClass(set_key);
                  obj[keys.li] = null;
                } else {
                  obj[keys.li] = obj._$list_all_li
                    .filter('[data-index="' + index + '"]')
                    .addClass(set_key);
                }

                obj._$element.attr("data-" + set_key + "-index", index);
              };

            return function (
              obj,
              index,
              set_key,
              keys,
              cur_set_details,
              options
            ) {
              if (
                index == obj[keys.index] ||
                (index != -1 &&
                  !(index >= 0 && index < obj._options.data.length))
              ) {
                cur_set_details.on_no_set &&
                  cur_set_details.on_no_set(obj, index, options);
                return;
              }

              remove_index(obj, set_key, keys, cur_set_details);

              if (
                index == -1 ||
                (cur_set_details.extra_condition &&
                  !cur_set_details.extra_condition(obj, index, options))
              )
                return;

              set_props(obj, index, set_key, keys);

              cur_set_details.on_set && cur_set_details.on_set(obj, options);

              obj._options.callbacks[keys.set_callback].call(obj, {
                index: index,
                $li: obj[keys.li]
              });
            };
          })(),
          get_set_fn = function (set_key) {
            var cur_set_details = all_set_details[set_key],
              obj_keys = {
                index: "_" + set_key + "_index",
                li: "_$list_" + set_key + "_li",
                set_callback: "on_" + set_key,
                remove_callback: "on_remove_" + set_key
              };

            return function (obj, index, options) {
              return main_set_fn(
                obj,
                index,
                set_key,
                obj_keys,
                cur_set_details,
                options || {}
              );
            };
          },
          _module = {};

        for (var key in all_set_details) _module[key] = get_set_fn(key);

        return _module;
      })(),
      set_all_events = (function () {
        var set_element_events = (function () {
          var event_details = {
            selected: {
              "click.autocomplete.selected_wrapper": function (e) {
                set_focus(e.data, true);
              }
            },
            input_search_el: {
              "focus.autocomplete.input": function (e) {
                set_focus(e.data);
              },
              "blur.autocomplete.input": function (e) {
                var obj = e.data;

                if (
                  e.relatedTarget &&
                  !vfs.utilities.jQuery.is_or_contains(
                    obj._$element[0],
                    e.relatedTarget
                  ) &&
                  obj._has_focus
                ) {
                  set_focus(e.data, false);
                }
              },
              "keydown.autocomplete.input": (function () {
                var get_new_visible_hover_index = function (
                  obj,
                  cur_index,
                  modifier
                ) {
                  var visible_data_flat_indexes = vfs.utilities.json_and_arr.flat_arr(
                    obj._visible_data_indexes
                  ),
                    visible_data_cur_index = $.inArray(
                      cur_index,
                      visible_data_flat_indexes
                    );

                  return visible_data_flat_indexes[
                    visible_data_cur_index == -1
                      ? 0
                      : visible_data_cur_index + modifier
                  ];
                };

                return function (e) {
                  if (e.which != 38 && e.which != 40) return;

                  var obj = e.data,
                    modifier = e.which == 38 ? -1 : 1;

                  if (
                    obj._hover_index == -1 ||
                    obj._hover_index == undefined
                  ) {
                    if (
                      in_visible_data_indexes(obj, obj._selected_index)
                        .section_index != -1
                    )
                      set_index.hover(
                        obj,
                        get_new_visible_hover_index(
                          obj,
                          obj._selected_index,
                          modifier
                        )
                      );
                    else if (
                      in_visible_data_indexes(obj, obj._prev_hover_index)
                        .section_index != -1
                    )
                      set_index.hover(obj, obj._prev_hover_index);
                    else
                      set_index.hover(
                        obj,
                        obj._visible_data_indexes[0] &&
                        obj._visible_data_indexes[0][0]
                      );
                  } else {
                    set_index.hover(
                      obj,
                      get_new_visible_hover_index(
                        obj,
                        obj._hover_index,
                        modifier
                      )
                    );
                  }

                  e.preventDefault();
                };
              })(),
              "keyup.autocomplete.input": function (e) {
                var obj = e.data;

                if (
                  e.which == 13 &&
                  obj._hover_index != undefined &&
                  obj._hover_index != -1
                ) {
                  set_index.selected(obj, obj._hover_index);
                  e.preventDefault();
                } else {
                  set_visible_list(obj);
                }
              },
              "change.autocomplete.input": function (e) {
                set_visible_list(e.data);
              }
            },
            remove_selection_button: {
              "click.autocomplete.remove_selection": function (e) {
                var obj = e.data;

                set_index.selected(obj, -1);
                obj.set_input_val("");
              }
            },
            toggle_button: {
              "click.autocomplete.toggle": function (e) {
                set_focus(e.data, !e.data._has_focus);
              }
            },
            list_all_li: {
              "mouseenter.autocomplete.list_li": function (e) {
                set_index.hover(e.data, get_li_index($(this)), {
                  dont_scroll_list: true
                });
              },
              "mouseleave.autocomplete.list_li": function (e) {
                if (e.data._hover_index == get_li_index($(this)))
                  set_index.hover(e.data, -1);
              },
              "click.autocomplete.list_li": function (e) {
                set_index.selected(e.data, get_li_index($(this)));
              }
            }
          },
            set_event_by_key = function (obj, element_key) {
              obj["_$" + element_key].on(event_details[element_key], obj);
            };

          return function (obj, element_key) {
            if (element_key) {
              set_event_by_key(obj, element_key);
            } else {
              for (element_key in event_details)
                set_event_by_key(obj, element_key);
            }
          };
        })(),
          set_other_events = (function () {
            var document_clicked = function (e) {
              var obj = e.data;

              if (
                !vfs.utilities.jQuery.is_or_contains(
                  obj._$element[0],
                  e.target
                )
              )
                set_focus(obj, false);
            };

            return function (obj) {
              vfs.global_variables.$document.on(
                "click.autocomplete.outside",
                obj,
                document_clicked
              );
            };
          })();

        return function (obj, element_key) {
          if (element_key) {
            set_element_events(obj, element_key);
          } else {
            set_element_events(obj);
            set_other_events(obj);
          }
        };
      })(),
      set_list_view = (function () {
        var all_callbacks = (function () {
          var call_on_complete_option_callback = function ($el, data) {
            data.obj._options.callbacks[
              "on_" + data.view_type + "_list"
            ].call(data.obj);
          };

          return {
            show: {
              before_animation: function ($el, data) {
                set_option_methods.slide_direction(
                  data.obj,
                  data.obj._options.slide_direction
                );
              },
              on_complete: function ($el, data) {
                force_render_all_list_li(data.obj);
                scroll_list(
                  data.obj._$list_selected_li,
                  data.obj._options.scroll_list_duration_on_open
                );
                call_on_complete_option_callback($el, data);
              }
            },
            hide: {
              on_complete: call_on_complete_option_callback
            }
          };
        })();

        return function (obj, view_type, do_animate) {
          var param = {
            obj: obj,
            view_type: view_type
          },
            details = {
              class_fn: view_type == "show" ? "addClass" : "removeClass",
              slide_duration: do_animate ? obj._options.slide_duration : 0,
              callbacks: $.extend(
                {
                  before_animation_param: param,
                  on_complete_param: param
                },
                all_callbacks[view_type]
              )
            };

          obj._$list_wrapper[details.class_fn]("show-list");
          vfs.utilities.slide_element[view_type](
            obj._$list_wrapper,
            details.slide_duration,
            details.callbacks
          );
        };
      })(),
      set_focus = function (obj, do_focus) {
        do_focus = do_focus == undefined ? true : do_focus;

        if (do_focus == obj._has_focus || (obj._options.disabled && do_focus))
          return false;

        obj._has_focus = Boolean(do_focus);

        if (do_focus) {
          obj._$element.addClass("focused");
          obj._$input_search_el.focus();

          if (!obj._options.list_always_show)
            set_list_view(obj, "show", true);

          obj._options.callbacks.on_focus.call(obj);
        } else {
          set_index.hover(obj, -1);

          obj._$element.removeClass("focused");
          obj._$input_search_el.blur();

          if (!obj._options.list_always_show)
            set_list_view(obj, "hide", true);

          obj._options.callbacks.on_blur.call(obj);
        }

        return true;
      },
      prototype = {
        set_focus: function (do_focus) {
          return set_focus(this, do_focus);
        },
        in_visible_data_indexes: function (index) {
          return in_visible_data_indexes(this, index);
        },
        set_hover_index: function (index) {
          set_index.hover(this, index);
        },
        set_selected_index: function (index) {
          set_index.selected(this, index);
        },
        set_input_val: function (value) {
          this._$input_search_el.val(value);

          set_input_val(this);
        }
      };

    //add behaviour option with default value to intelligent, set null to not to set any behaviour
    //when user select input val must set to blank and also if object has selected value and user blur autocomplete search box without selecting any other element then in that case input val must also set to blank

    return {
      constructor: constructor,
      set_option_methods: set_option_methods,
      prototype: prototype
    };
  })(),
    {
      data: [],

      placeholder: "Search",

      disabled: false,

      toggle_button_html: '<i class="icon-arrow-point-down"></i>',

      remove_selection_button_html: '<i class="icon-close" title="Clear"></i>',

      list_template_html: null, //if null it will call toString of that element in data array or use function which must return html for every element in data array

      selected_template_html: null, //if null it will call toString of that element in data array or use function which must return html for every element in data array

      not_found_html: "Not Found",

      list_always_show: false,

      blur_on_select: true,

      slide_duration: 200, //this will not work if list_always_show is true

      slide_direction: "down", //other options is 'up'; this will not work if list_always_show is true

      scroll_list_duration_on_open: 300, //set 0 to not to animate and -1 for not to scroll; it will not work if list_always_show is true

      scroll_list_duration_on_hover: 100, //set 0 to not to animate and -1 for not to scroll

      match_input_search: function (input_val, element, index) {
        return element.toLowerCase().indexOf(input_val.toLowerCase()) != -1;
      }, //function returning boolean for whether current data element should be shown or not; if there are more than one function it will check for that many times e.g. on searching of "In"; it must first show "India" and "Indonesia" and then "Argentina", etc.

      input_wrapper: null, //selector of input_wrapper element or use function that return selector or dom or jquery object of input_wrapper element in which search input will be added if null it will be added automatically

      selected_wrapper: null, //selector of selected_wrapper element or use function that return selector or dom or jquery object of selected_wrapper element in which selected_element will be added if null it will be added automatically

      toggle_button_wrapper: null, //selector of toggle_button_wrapper element or use function that return selector or dom or jquery object of toggle_button_wrapper element in which toggle focus button will be added if null it will be added automatically

      list_wrapper: null, //selector of list_wrapper element or use function that return selector or dom or jquery object of list_wrapper element in which list_section_wrapper will be added if null it will be added automatically

      list_section_wrapper: null, //if null it will create div as list_section_wrapper or use function that return jquery object of in which list will be added; if list section wrapper and element in which list to add is different return object that will have $main_wrapper and $content_wrapper

      callbacks: {
        //you can change the callback functions directly without calling set_options methods
        on_focus: null,
        on_blur: null,
        on_visible_list_changed: null,
        on_hover: null,
        on_remove_hover: null,
        on_selected: null,
        on_remove_selected: null,
        on_show_list: null,
        on_hide_list: null,
        on_input_changed: null
      }
    },
    true
  );