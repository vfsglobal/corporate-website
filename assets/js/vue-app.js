(function ($) {
  "use strict";

  vfs.data.vue_app_config = (function () {
    var get_stats_details_fn = (function () {
      var create_dest_arr_el_fn = function (element, index, param) {
        return param.generate_data_fn.call(param._this, element, index);
      };

      return function (show_on_key, generate_data_fn) {
        return function () {
          return vfs.utilities.json_and_arr.create_sequenced_arr(
            this.all_stats_details,
            show_on_key,
            {
              create_dest_arr_el_fn: create_dest_arr_el_fn,
              create_dest_arr_el_fn_param: {
                _this: this,
                generate_data_fn: generate_data_fn
              }
            }
          );
        };
      };
    })(),
      create_plugin_component_mixin = (function () {
        var create_option_related_defs = (function () {
          var generate_details = {
            props: function (key, default_options) {
              return {
                default: function () {
                  return default_options[key];
                }
              };
            },
            watch: function (key) {
              return {
                handler: function (val) {
                  if (!this.plugin_obj) return;

                  var options = {};
                  options[key] = val;

                  this.plugin_obj.set_options(options);
                },
                deep: true
              };
            }
          };

          return function (plugin_module) {
            var default_options = plugin_module.default_options,
              details = {},
              cur_details;

            for (var details_name in generate_details) {
              cur_details = {};

              for (var key in default_options)
                cur_details[key] = generate_details[details_name](
                  key,
                  default_options
                );

              details[details_name] = cur_details;
            }

            return details;
          };
        })(),
          create_callback_emitters = function (plugin_module) {
            var callbacks = plugin_module.default_options.callbacks;

            return function () {
              var _this = this,
                emitters = {},
                get_emitter_callback = function (key) {
                  var event_name = key.substring("on_".length);

                  return function (e) {
                    _this.$emit(event_name, e);
                  };
                };

              for (var key in callbacks)
                emitters[key] = get_emitter_callback(key);

              return emitters;
            };
          };

        return function (plugin_name) {
          var plugin_module = vfs[plugin_name],
            option_related_defs = create_option_related_defs(plugin_module),
            option_props = option_related_defs.props;

          return {
            props: option_props,
            watch: option_related_defs.watch,
            computed: {
              callback_emitters: create_callback_emitters(plugin_module)
            },
            mounted: (function () {
              var create_options = (function () {
                var create_prop_options = function () {
                  var options = {};

                  for (var key in option_props) options[key] = this[key];

                  return options;
                };

                return function () {
                  var options = create_prop_options.call(this);

                  options.callbacks = vfs.utilities.functions.merge_object_containing_function(
                    [this.callback_emitters, this.current_callbacks || {}]
                  );

                  return options;
                };
              })();

              return function () {
                this.plugin_obj = plugin_module
                  .create($(this.$el), create_options.call(this))
                  .data(plugin_name);
              };
            })()
          };
        };
      })();

    return {
      app_selector: "master-page",

      data_to_copy: {
        from_vfs_data: [],
        from_window: ["master_page_data", "page_data"]
      },

      app_mixins: [
        {
          data: {
            stats: {
              application_centres: 3093,
              operation_countries: 147,
              continents: 5,
              client_governments: 62,
              employees: 11066,
              biometric_enrolments_in_millions: 84,
              applications: 203100048,
              stats_date: "31 May 2019"
            },
            biometric_inception: 2007,
            start_year: 2001,
            all_stats_details: [
              {
                stats_key: "application_centres",
                text: "Application Centres",
                icon_name: "icon-application-centre",
                show_on_home: true,
                show_on_milestones: 1
              },
              {
                stats_key: "operation_countries",
                text: "Countries of Operation",
                icon_name: "icon-countries-of-operation",
                show_on_home: true,
                show_on_milestones: 2
              },
              {
                stats_key: "continents",
                text: "Continents",
                icon_name: "icon-continents"
              },
              {
                stats_key: "client_governments",
                text: "Client Governments",
                icon_name: "icon-client-govt",
                show_on_home: true,
                show_on_milestones: 0
              },
              {
                stats_key: "employees",
                text: "Employees",
                show_on_milestones: 4,
                show_on_main_stats: false
              },
              {
                prefix_text: "Over",
                data_key: "applications_in_millions",
                icon_name: "icon-applications",
                text: "Million Applications",
                milestones_text: "Applications Processed<sup>*</sup>",
                show_on_milestones: 3
              }
            ],
            certification_content: [
              {
                id: "iso_9001",
                icon_heading: {
                  icon: {
                    src: "../assets/images/certification/iso-9001.png",
                    alt: "ISO 9001:2015"
                  },
                  heading:
                    "ISO 9001:2015 - Quality Management System Certification"
                },
                content:
                  "The ISO 9001:2015 Quality Management System is the world’s most popular quality improvement standard, with over one million certified organisations in 180 countries around the globe. It is the only standard in the 9000 family of standards published by the International Organization for Standardization (ISO) that can be used for the purpose of conformity assessment. ISO 9001:2015 also serves as the basis for many other important sector-specific standards, including ISO 13485 medical devices), ISO/TS 16949 (automotive) and AS/EN 9100 (aerospace), as well as widely used management system standards such as OHSAS 18001:2007 and ISO 14001:2015."
              },
              {
                id: "iso_27001",
                icon_heading: {
                  icon: {
                    src: "../assets/images/certification/iso-27001.png",
                    alt: "ISO 27001:2013"
                  },
                  heading:
                    "ISO 27001:2013 - Information Security Management System Certification"
                },
                content:
                  "ISO/IEC 27001:2013 is the leading international standard for information security management. It covers commercial, governmental and not-for-profit organisations, and specifies the requirements for establishing, implementing, monitoring and improving an information security management system (ISMS)."
              },
              {
                id: "iso_14001",
                icon_heading: {
                  icon: {
                    src: "../assets/images/certification/iso-14001.png",
                    alt: "ISO 14001:2015"
                  },
                  heading:
                    "ISO 14001:2015 - Environmental Management System Certification"
                },
                content:
                  "Beyond demonstrating your organisation is a responsible corporate citizen, certification may significantly reduce the risk of regulatory and environmental liability fines. Companies that implement the system reduce costs and improve company wide morale, while increasing the marketability of their brand."
              },
              {
                id: "ohsas_18001",
                icon_heading: {
                  icon: {
                    src: "../assets/images/certification/ohsas-18001.png",
                    alt: "OHSAS 18001:2007"
                  },
                  heading:
                    "OHSAS 18001:2007 - Occupational Health and Safety Assessment Series"
                },
                content:
                  "The OHSAS 18001:2007 Certification Scheme is an OH&S standard. It is designed to enable organisations to control risks and improve performance in the area of OH&S. OHSAS 18001:2007 places a proactive and preventative emphasis on risk-control factors by identifying and assessing the likelihood and severity of hazards in the workplace."
              }
            ]
          },
          computed: {
            home_stats_details: get_stats_details_fn("show_on_home", function (
              cur_stats_details
            ) {
              return cur_stats_details;
            }),
            section_folder_name: (function () {
              var all_section_folders = ["individuals", "governments"];

              return function () {
                return (
                  this.section_index != null &&
                  all_section_folders[this.section_index]
                );
              };
            })(),
            applications_str: function () {
              return vfs.utilities.string.comma_seperated_number(
                this.stats.applications
              );
            },
            applications_in_millions: function () {
              return (this.stats.applications / 1000000).toFixed(2);
            },
            stats_ordinal_indicator_date: function () {
              return vfs.utilities.string.convert_to_ordinal_indicator_date(this.stats.stats_date);
            },
            experience_in_years: function () {
              return new Date().getFullYear() - this.start_year;
            }
          }
        }
      ],

      all_mixins: {
        type_prop: {
          props: {
            type: String
          }
        },
        content_prop: {
          props: {
            content: {
              required: true
            }
          }
        },
        name_prop: {
          props: {
            name: {
              type: String,
              required: true
            }
          }
        },
        full_heading_width_prop: {
          props: {
            full_heading_width: {
              type: Boolean,
              default: false
            }
          }
        },
        type_details_computed: {
          computed: {
            type_details: function () {
              return this.all_type_details[String(this.type)];
            }
          }
        },
        read_more_link_html_prop: {
          props: {
            read_more_link_html: {
              type: String,
              default: "Continue reading"
            }
          }
        },
        main_read_more_computed: {
          computed: {
            main_read_more: function () {
              return $.extend(
                {},
                {
                  html: this.read_more_link_html
                },
                this.content.read_more
              );
            }
          }
        },
        tag_name_prop: {
          props: {
            tag_name: {
              type: String,
              required: true
            }
          }
        },
        list_loader_main_list: {
          props: {
            last_show_index: {
              type: Number,
              default: null
            }
          },
          methods: {
            do_show: function (index) {
              return !this.last_show_index || index < this.last_show_index;
            }
          }
        },
        column_details_prop: {
          props: {
            column_details: {
              type: String,
              default: (function () {
                var all_tag_column_details = {
                  "grey-box-list": "image_info_col3_details",
                  "side-seperator-list": "col3_details"
                };

                return function () {
                  return all_tag_column_details[
                    this.$vnode.componentOptions.tag
                  ];
                };
              })()
            }
          }
        },
        index_prop: {
          props: {
            index: {
              type: Number,
              required: true
            }
          }
        },
        slot_component_options: {
          computed: {
            slot_component_options: function () {
              var component_options = [],
                slot_contents = this.$slots.default,
                cur_component_options;

              for (var i = 0; i < slot_contents.length; i++) {
                cur_component_options = slot_contents[i].componentOptions;

                if (!cur_component_options) continue;

                component_options.push(cur_component_options);
              }

              return component_options;
            }
          }
        },
        slot_data_with_computed_options: {
          mixins: ['slot_component_options'],
          props: {
            slot_data: {
              type: Array
            }
          },
          computed: {
            main_slot_component_options: function () {
              return this.slot_data || this.slot_component_options;
            }
          }
        }
      },

      global_components: {
        "master-page": {
          mixins: ["type_prop"],
          template:
            '<div :is="\'master-\' + type" :content="content" :full_heading_width="full_heading_width">\
              <slot/>\
            </div>',
          props: ["content", "full_heading_width"]
        },
        "v-nodes": {
          functional: true,

          props: {
            vnodes: {
              type: Array,
              required: true
            }
          },

          render: function (h, ctx) {
            return ctx.props.vnodes;
          }
        },
        "master-basic": {
          template:
            '<div id="main_content_container">\
                  <top-container />\
                  <slot/>\
                  <footer-container />\
              </div>',
          components: {
            "top-container": {
              import_from_root: ["all_navigation", "section_folder_name"],
              mixins: ["type_prop"],
              template:
                '<div class="top_container">\
                      <div class="main_nav_container">\
                          <div class="wrapper">\
                              <menu-nav class="main_nav" :content="all_navigation.root_nav" />\
                          </div>\
                      </div>\
                      <div class="header_nav_wrapper">\
                          <div class="wrapper">\
                              <header>\
                                  <a :href="home_page_link" class="prevent_remove_link"><img src="../assets/images/vfs-global-logo.svg" alt="VFS Global Logo" class="main_logo" /></a>\
                                  <million-200-logo />\
                              </header>\
                          </div>\
                          <nav>\
                            <div class="wrapper">\
                              <menu-nav-with-responsive :menu_class="menu_class" resolution_break_point="tablet" :content="all_navigation.main_sub_nav" />\
                              <extra-nav />\
                            </div>\
                          </nav>\
                      </div>\
                  </div>',
              data: function () {
                return {
                  menu_class: {
                    menu_nav: 'sub_nav',
                    responsive_menu_nav: 'sub_nav disable_page_on_open'
                  }
                };
              },
              computed: {
                home_page_link: function () {
                  return "../" + this.section_folder_name + "/index.html";
                }
              },
              components: {
                "million-200-logo": {
                  template: '<div class="million_200_logo_wrapper" />',
                  data: function () {
                    return {
                      svg_file_path: '../assets/images/vfs-200-million-logo.svg',
                    };
                  },
                  mounted: (function () {
                    var check_and_start_animation = (function () {
                      var elements = vfs.create_blank_object({
                        set_all: (function () {
                          var elements_details = {
                            celebrating_text: '#celebrating_text',
                            text_200: '#text_200',
                            million_text_chars: '#million_text > *',
                            applications_text_chars: '#applications_text > *',
                            horizontal_line: '#horizontal_line',
                            shine_animation: '#shine_animation'
                          },

                            check_hide_element = function (key, $el) {
                              if ($el instanceof jQuery)
                                $el.css('opacity', '0');
                            };

                          return function (svg) {
                            if (this._all_setted) return false;

                            elements_details.main_svg = svg;

                            vfs.utilities.jQuery.create_elements(elements_details, this, 'main_svg');

                            this.loop(check_hide_element);

                            return (this._all_setted = true);
                          };
                        })()
                      }),

                        animate = function () {
                          var tl = new TimelineMax({
                            delay: 1,
                            onComplete: function () {
                              elements.$shine_animation.css('opacity', '').addClass('animation');
                            }
                          }),

                            million_applications_options = {
                              translate: 300,
                              duration: 1.5,
                              million_text: 'million',
                              applications_text: 'applications',
                              per_duration_percent: 0.7,
                              ease: Expo.easeOut
                            };

                          million_applications_options.per_duration = million_applications_options.duration * million_applications_options.per_duration_percent;
                          million_applications_options.max_delay = million_applications_options.duration - million_applications_options.per_duration;

                          elements.$text_200.css('transform-origin', '50% 0%');
                          elements.$celebrating_text.css('transform-origin', '50% 0%');

                          tl
                            .set(elements.$main_svg, {
                              opacity: 1
                            })
                            .fromTo(elements.$celebrating_text, 1.5, {
                              opacity: 0,
                              transform: 'scale(4)'
                            }, {
                                opacity: 1,
                                transform: 'scale(1)',
                                ease: Power3.easeIn
                              })
                            .fromTo(elements.$text_200, 1.5, {
                              opacity: 0,
                              transform: 'scale(2.5)'
                            }, {
                                opacity: 1,
                                transform: 'scale(1)',
                                ease: Expo.easeIn
                              }, '-=1')
                            .fromTo(elements.$horizontal_line, million_applications_options.duration, {
                              opacity: 0,
                              transform: 'scale(0, 1)'
                            }, {
                                opacity: 1,
                                transform: 'scale(1, 1)',
                                ease: million_applications_options.ease,
                              }, "million_applications")
                            .staggerFromTo(elements.$million_text_chars.toArray().reverse(), million_applications_options.per_duration, {
                              opacity: 0,
                              transform: 'translateX(' + -million_applications_options.translate + 'px)'
                            }, {
                                opacity: 1,
                                transform: 'translateX(0px)',
                                ease: million_applications_options.ease
                              }, million_applications_options.max_delay / (million_applications_options.million_text.length - 1),
                              "million_applications")
                            .staggerFromTo(elements.$applications_text_chars, million_applications_options.per_duration, {
                              opacity: 0,
                              transform: 'translateX(' + million_applications_options.translate + 'px)'
                            }, {
                                opacity: 1,
                                transform: 'translateX(0px)',
                                ease: million_applications_options.ease
                              }, million_applications_options.max_delay / (million_applications_options.applications_text.length - 1),
                              "million_applications")
                        };

                      return function () {
                        if (this.logo_animated) return;

                        elements.set_all(this.svg);

                        animate();
                        this.logo_animated = true;
                      };
                    })();

                    return function () {
                      var _this = this;

                      $.ajax({
                        type: 'GET',
                        url: _this.svg_file_path,
                        dataType: 'text',
                        success: function (response) {
                          _this.$el.innerHTML = response;
                          _this.svg = _this.$el.children[0];

                          check_and_start_animation.call(_this);
                        }
                      });
                    };
                  })()
                },
                "extra-nav": {
                  import_from_root: ["section_index"],
                  template: '<ul class="extra_nav" v-if="section_index == 0">\
                      <li><a href="../individuals/contact.html" class="button" v-dynamic-html="\'Contact us\'" /></li>\
                  </ul>\
                  <ul class="extra_nav" v-else>\
                        <li><a href="../governments/get-in-touch.html" class="button" v-dynamic-html="\'Get in touch\'" /></li>\
                    </ul>'
                }
              }
            },
            "footer-container": {
              import_from_root: ["all_navigation", "certification_content"],
              template:
                '<div class="footer_container">\
                      <div class="wrapper">\
                          <main-footer-content />\
                          <footer class="clearfix">\
                              <div class="certification_copyright_wrapper clearfix" data-equal_children_height=".">\
                                  <div class="links_copyright_wrapper">\
                                      <menu-nav class="main_links" :content="all_navigation.footer_main_links" />\
                                      <menu-nav class="extra_links" :content="all_navigation.footer_extra_links" />\
                                      <social-wrapper class="social_language_wrapper show_from_small_desktop" />\
                                      <div class="copyright">\
                                          &copy; ' +
                new Date().getFullYear() +
                ' VFS Global Group. All Rights Reserved.\
                                      </div>\
                                  </div>\
                                  <div class="outer_certification_wrapper clearfix">\
                                      <div class="certification_wrapper">\
                                          <h5><a href="../general/certification-and-accreditation.html">Certification and Accreditation</a></h5>\
                                          <ul>\
                                              <li v-for="(cur_content, index) in certification_content" :key="index">\
                                                  <a :href="\'../general/certification-and-accreditation.html#\' + cur_content.id"><pic :content="cur_content.icon_heading.icon" /></a>\
                                              </li>\
                                          </ul>\
                                      </div>\
                                  </div>\
                              </div>\
                              <div class="extra_content_wrapper">\
                                  <social-wrapper class="main_content hide_from_small_desktop" />\
                              </div>\
                          </footer>\
                      </div>\
                  </div>',
              components: {
                "main-footer-content": {
                  import_from_root: ["all_navigation", "section_index"],
                  template:
                    '<div class="main_footer_content">\
                          <div class="need_visa_info_form_wrapper" v-if="section_index == 0">\
                              <h2 class="big_heading">Need information on visas or permits?</h2>\
                              <country-drp-form-wrapper name="Main Footer" />\
                          </div>\
                          <ul class="col_type_normal all_links" data-column-details="main_footer_links" v-else>\
                              <li>\
                                  <menu-nav :content="all_navigation.footer_main_content_many_links" class="many_links" :child_nav_attrs="{\'data-column-details\': \'many_links_col_details\', class:\'col_type_normal2\'}" />\
                              </li>\
                              <li>\
                                  <menu-nav :content="all_navigation.footer_main_content_few_links" class="few_links col_type_normal2" data-column-details="parent_few_links_col_details" :child_nav_attrs="{\'data-column-details\': \'few_links_col_details\', class:\'col_type_normal2\'}" />\
                              </li>\
                          </ul>\
                      </div>'
                },
                "social-wrapper": {
                  template:
                    '<div>\
                          <ul class="icons">\
                              <li><a href="https://twitter.com/vfsglobal" target="_blank"><i class="icon-twitter" /></a></li>\
                              <li><a href="https://www.facebook.com/VFSGlobalOfficial/" target="_blank"><i class="icon-facebook" /></a></li>\
                              <li><a href="https://www.linkedin.com/company/vfs-global-services" target="_blank"><i class="icon-linkedin" /></a></li>\
                              <li><a href="https://www.instagram.com/vfsglobalofficial/" target="_blank"><i class="icon-instagram" /></a></li>\
                          </ul>\
                      </div>'
                }
              }
            }
          }
        },
        "master-basic-inner-page": {
          template:
            '<master-basic>\
                  <breadcrumb />\
                  <div class="wrapper content_container normal">\
                      <slot />\
                  </div>\
              </master-basic>'
        },
        "master-banner-inner-page": {
          import_from_root: ["master_page_data"],
          template:
            '<master-basic>\
                  <banner-container type="main_page" :content="master_page_data.main_page_banner" />\
                  <div class="wrapper">\
                      <bookmark-list :content="master_page_data.main_bookmarks" v-if="master_page_data.main_bookmarks" />\
                      <div class="content_container normal">\
                          <slot />\
                      </div>\
                  </div>\
                  <banner-container type="normal" :content="master_page_data.bottom_banner" v-if="master_page_data.bottom_banner" />\
              </master-basic>'
        },
        "master-sub-section": {
          import_from_root: ["all_navigation"],
          mixins: ["content_prop", "full_heading_width_prop"],
          template:
            '<master-basic-inner-page>\
                  <big-sub-heading-wrapper :content="content.main_page_headings" :class="{max_content_width: !full_heading_width}" class="padb_big" />\
                  <div class="nav_wrapper" :class="{\'marb_big\': bottom_space}">\
                      <menu-nav-with-responsive menu_class="inner_sub_nav" :content="all_navigation.inner_sub_nav" :resolution_break_point="menu_resolution_break_point" responsive_menu_button_content="{active}" />\
                  </div>\
                  <slot />\
              </master-basic-inner-page>',
          props: {
            bottom_space: {
              type: Boolean,
              default: false
            },
            menu_resolution_break_point: {
              type: String,
              required: true
            }
          }
        },
        "master-blog-section": {
          mixins: ["content_prop", "full_heading_width_prop"],
          template:
            '<master-sub-section :content="content" :full_heading_width="full_heading_width" menu_resolution_break_point="small_mobile">\
                  <ul class="bottom_seperator_list large">\
                      <li class="extra_large">\
                      <image-short-info-wrapper type="extra_large" :content="content.top" :read_more_link_html="content.read_more_link_html" />\
                      </li>\
                      <slot />\
                  </ul>\
              </master-sub-section>'
        },
        "master-non-featured-blog-section": {
          import_from_root: ["blog"],
          mixins: ["full_heading_width_prop"],
          template:
            '<master-blog-section :content="blog.active_section" :full_heading_width="full_heading_width">\
                  <li>\
                      <image-short-info-list type="normal" :content="blog.active_section.all_articles" :read_more_link_html="blog.active_section.read_more_link_html" />\
                  </li>\
              </master-blog-section>'
        },
        "master-article-page": {
          import_from_root: ["blog"],
          mixins: ["full_heading_width_prop"],
          template:
            '<master-basic-inner-page>\
                  <big-sub-heading-wrapper class="padb_big" :class="{max_content_width: !full_heading_width}" :content="blog.active_article.main_page_headings" />\
                  <share-wrapper />\
                  <image-caption-wrapper class="padb_big" :content="blog.active_article.image_caption" />\
                  <ul class="bottom_seperator_list extra_large">\
                      <slot />\
                      <li v-if="blog.other_posts && blog.other_posts.length > 0">\
                          <other-info-carousel-container tag_name="image-short-info-wrapper" :content="{ heading: \'Other posts\', other_info: blog.other_posts }" type="normal" :read_more_link_html="blog.active_article.read_more_link_html" />\
                      </li>\
                  </ul>\
              </master-basic-inner-page>'
        },
        "master-board-member": {
          import_from_root: ["executive_board"],
          template:
            '<master-basic-inner-page>\
                  <ul class="bottom_seperator_list extra_large">\
                      <li>\
                          <side-image-content-wrapper :content="executive_board.active_board_member" type="image_max_medium_width" />\
                      </li>\
                      <li v-if="executive_board.other_board_members.length > 0">\
                          <other-info-carousel-container tag_name="image-short-info-wrapper" :content="{ heading: other_board_members_heading, other_info: executive_board.other_board_members }" type="no_back_color" :read_more_link_html="executive_board.active_board_member.read_more_link_html" />\
                      </li>\
                  </ul>\
              </master-basic-inner-page>',
          data: function () {
            return {
              other_board_members_heading: {
                small_heading: "Other members",
                big_heading: "Executive Board"
              }
            };
          }
        },
        "master-news-section": {
          mixins: ["content_prop", "full_heading_width_prop"],
          template:
            '<master-sub-section :content="content" :full_heading_width="full_heading_width" bottom_space menu_resolution_break_point="small_tablet">\
                  <slot />\
              </master-sub-section>'
        },
        "master-service-page": {
          import_from_root: ["master_page_data", "solutions"],
          mixins: ["full_heading_width_prop"],
          template:
            '<master-basic-inner-page>\
              <ul class="bottom_seperator_list extra_large">\
                <li>\
                  <big-sub-heading-wrapper class="padb_big" :class="{max_content_width: !full_heading_width}" :content="solutions.active_service.main_headings" />\
                  <image-caption-wrapper :content="solutions.active_service.image_caption" class="marb_big" v-if="solutions.active_service.image_caption" />\
                  <div class="max_content_width">\
                    <slot />\
                  </div>\
                </li>\
                <li v-if="master_page_data.key_benefits">\
                  <h2 class="big_heading padb_normal max_content_width">Key Benefits</h2>\
                  <component :is="key_benifits_details.tag_name" :content="key_benefits_content" v-bind="key_benifits_details.attrs" />\
                </li>\
                <li>\
                  <other-info-carousel-container tag_name="grey-box" :content="{ heading: other_solutions_heading, other_info: solutions.other_services }" type="icon-details" :read_more_link_html="solutions.active_service.read_more_link_html" equal_children_height=".icon_details_wrapper .details_wrapper" />\
                </li>\
              </ul>\
            </master-basic-inner-page>',
          data: function () {
            var col2_details_attr = "key_benefits_col2_details",
              side_seperator_list_attrs = {
                type: "heading-simple-list",
                column_details: col2_details_attr
              };

            return {
              all_key_benifits_details: {
                seperate_section: {
                  tag_name: "side-seperator-list",
                  attrs: side_seperator_list_attrs
                },
                no_section: {
                  tag_name: "side-seperator-list",
                  attrs: {
                    type: "simple-basic-content-list",
                    column_details: col2_details_attr
                  }
                },
                multi_seperate_section: {
                  tag_name: "heading-side-seperator-list",
                  attrs: {
                    side_seperator_list_attrs: side_seperator_list_attrs
                  }
                }
              },
              other_solutions_heading: {
                small_heading: "Other solutions",
                big_heading: "Continue to browse"
              }
            };
          },
          computed: {
            key_benifits_details: function () {
              var key_benefits = this.master_page_data.key_benefits;

              if (!key_benefits) return null;

              if (!$.isArray(key_benefits))
                return this.all_key_benifits_details.no_section;
              else if ($.isArray(key_benefits[0]))
                return this.all_key_benifits_details.seperate_section;
              else return this.all_key_benifits_details.multi_seperate_section;
            },
            key_benefits_content: function () {
              var key_benefits = this.master_page_data.key_benefits;

              if (!key_benefits) return null;

              if (!$.isArray(key_benefits)) return key_benefits.main_content;
              else return key_benefits;
            }
          },
          components: {
            "heading-side-seperator-list": {
              mixins: ["content_prop"],
              template:
                '<div>\
                  <div v-for="(cur_content, index) in content" :key="index" :class="{mart_normal: index != 0}">\
                    <h3 class="normal_content_heading" v-dynamic-html="cur_content.heading + \':\'" />\
                    <side-seperator-list :content="cur_content.main_content" v-bind="side_seperator_list_attrs" />\
                  </div>\
                </div>',
              props: {
                side_seperator_list_attrs: {
                  type: Object,
                  required: true
                }
              }
            }
          }
        },
        "menu-nav": {
          mixins: ["content_prop"],
          template:
            '<ul>\
            <li v-for="(cur_nav, index) in content.nav_data" :key="index" :class="[cur_nav.class_name, {active: index == content.active_index}]">\
              <hyperlink :content="cur_nav">\
                <template slot-scope="slot_props">\
                  <span v-dynamic-html="slot_props.html" />\
                  <i v-if="slot_props.icon_class" :class="slot_props.icon_class" />\
                </template>\
              </hyperlink>\
              <menu-nav v-if="cur_nav.child_nav" :content="cur_nav.child_nav" v-bind="child_nav_attrs" />\
            </li>\
          </ul>',
          props: {
            child_nav_attrs: Object
          }
        },
        "responsive-menu-nav": {
          mixins: ["content_prop"],
          template:
            '<div class="dl-menuwrapper">\
							<button v-dynamic-html="button_main_content" />\
							<menu-nav class="dl-menu" :content="main_content" :child_nav_attrs="child_nav_attrs" />\
					</div>',
          props: {
            button_content: {
              type: String,
              default: "Menu"
            }
          },
          data: function () {
            return {
              child_nav_attrs: {
                class: "dl-submenu"
              }
            };
          },
          computed: {
            button_main_content: function () {
              return this.button_content == "{active}"
                ? this.content.nav_data[this.content.active_index].html
                : this.button_content;
            },
            main_content: (function () {
              var update_content = function (content, is_root) {
                if (!content) return false;

                var nav_data = content.nav_data;

                for (var i = 0; i < nav_data.length; i++) {
                  if (update_content(nav_data[i].child_nav))
                    nav_data[i].class_name = "has_submenu";
                }

                if (!is_root) {
                  nav_data.unshift({
                    class_name: "dl-back",
                    href: "#",
                    html: "Back"
                  });

                  if (content.active_index != null) content.active_index++;
                }

                return true;
              };

              return function () {
                var main_content = $.extend(true, {}, this.content);

                update_content(main_content, true);

                return main_content;
              };
            })()
          },
          mounted: function () {
            $(this.$el).dlmenu();
          }
        },
        "menu-nav-with-responsive": {
          mixins: ["content_prop"],
          template:
            '<div>\
            <menu-nav :class="[\'hide_from_\' + resolution_break_point, main_menu_class.menu_nav]" :content="content" />\
            <responsive-menu-nav :class="[\'show_from_\' + resolution_break_point, main_menu_class.responsive_menu_nav]" :content="content" :button_content="responsive_menu_button_content" />\
					</div>',
          props: {
            resolution_break_point: {
              type: String,
              required: true
            },
            menu_class: {
              type: [String, Object],
              default: ""
            },
            responsive_menu_button_content: String
          },
          computed: {
            main_menu_class: function () {
              return typeof this.menu_class == "string"
                ? {
                  menu_nav: this.menu_class,
                  responsive_menu_nav: this.menu_class
                }
                : this.menu_class;
            }
          }
        },
        hyperlink: {
          mixins: ["type_prop", "content_prop"],
          template:
            '<a :href="content.href" :target="content.target" :class="[content.class, main_class]" :is="tag_name" v-dynamic-html="$scopedSlots.default ? null : main_html">\
							<slot :html="main_html" :icon_class="content.icon_class"></slot>\
            </a>',
          data: function () {
            return {
              all_type_icon_classes: {
                read_more: "icon-arrow-right",
                read_more_down: "icon-arrow-down"
              }
            };
          },
          computed: {
            all_types: function () {
              return vfs.utilities.json_and_arr.get_all_keys(
                this.all_type_icon_classes
              );
            },
            main_class: function () {
              return this.all_type_icon_classes[this.type] ? "read_more" : "";
            },
            main_html: function () {
              var cur_type_icon_class = this.all_type_icon_classes[
                this.all_types[$.inArray(this.type, this.all_types)]
              ];

              return (
                this.content.html +
                (cur_type_icon_class
                  ? '<i class="' + cur_type_icon_class + '"></i>'
                  : "")
              );
            },
            tag_name: function () {
              return this.content.href ? "a" : "span";
            }
          }
        },
        pic: {
          mixins: ["content_prop"],
          template:
            '<img :src="content.src" :alt="content.alt" :title="content.title" />'
        },
        icon: {
          mixins: ["type_prop", "content_prop"],
          template:
            '<pic :content="content" v-if="content.src" />\
          <i :class="[content, type]" v-else />'
        },
        "basic-content": {
          mixins: ["content_prop"],
          template: '<div v-dynamic-html="content" />'
        },
        "banner-container": {
          mixins: ["type_prop", "content_prop"],
          template:
            '<div class="banner_container" :class="type">\
						  <div class="bg_wrapper" :style="content.image_style" />\
						  <breadcrumb v-if="type == \'main_page\'" />\
						  <div class="wrapper">\
                <div class="main_content_wrapper">\
                  <banner-heading-wrapper :content="content" :type="type" />\
                </div>\
						  </div>\
						</div>'
        },
        "country-drp-form-wrapper": (function () {
          var generate_multi_key_fn = (function () {
            var all_key_opposites = {
              resident: "visiting"
            };

            return function (get_details_fn) {
              return vfs.utilities.functions.generate_multi_swap_key_fn(
                all_key_opposites,
                get_details_fn
              );
            };
          })();

          return {
            template: '<div class="drp_form_container" :class="{\'box\': type_details.display_box, hide_headings: type_details.hide_headings}">\
              <div class="drp_form_wrapper">\
                <div class="drp_container">\
                  <div class="drp_wrapper">\
                    <h5 v-dynamic-html="resident_heading" />\
                    <autocomplete ref="resident_countries" class="search_dropdown" v-bind="main_resident_options" :data="cur_resident_countries" v-model="selected_resident_index" />\
                  </div>\
                  <div class="drp_wrapper">\
                    <h5 v-dynamic-html="visiting_heading" />\
                    <autocomplete ref="visiting_countries" class="search_dropdown" v-bind="main_visiting_options" :data="cur_visiting_countries" v-model="selected_visiting_index" />\
                  </div>\
                </div>\
                <div class="button_wrapper">\
                  <a :href="current_link" :target="current_link ? \'_blank\' : false" @click="go_clicked"><span>Go</span></a>\
                </div>\
              </div>\
            </div>',
            props: {
              resident_heading: {
                type: String,
                default: 'I’m a resident of'
              },
              visiting_heading: {
                type: String,
                default: 'and I’m going to'
              },
              resident_placeholder: {
                type: String,
                default: 'Search Resident Country'
              },
              visiting_placeholder: {
                type: String,
                default: 'Search Visiting Country'
              },
              resident_countries_key: {
                type: String,
                default: 'visa_and_permits'
              },
              visiting_countries_key: {
                type: String,
                default: 'visa_and_permits_visiting_countries'
              }
            },
            mixins: [
              "type_prop",
              "name_prop",
              "type_details_computed",
              {
                data: (function () {
                  var template_fn = function (element) {
                    return (
                      '<div class="flag_wrapper">\
                          <div class="flag">\
                            <img src="../assets/images/all-flags.png" alt="All Country Flags" style="' +
                      vfs.utilities.json_and_arr.json_to_str(
                        vfs.data.all_flag_styles[vfs.utilities.string.get_text_from_html(element.name)]
                      ) +
                      '" />\
                          </div>\
                        </div>\
                        <div class="text">' +
                      element.name +
                      "</div>"
                    );
                  },
                    common_options = {
                      match_input_search: function (input_val, element) {
                        var country_name = vfs.utilities.string.get_text_from_html(element.name),
                          aliases = vfs.data.country_aliases[country_name],
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
                      list_template_html: template_fn,
                      selected_template_html: template_fn
                    };

                  return function () {
                    return {
                      common_options: common_options,
                      selected_resident_index: -1,
                      selected_visiting_index: -1,
                      cur_resident_countries: null,
                      cur_visiting_countries: null
                    };
                  };
                })()
              }
            ],
            data: function () {
              return {
                all_type_details: {
                  undefined: {
                    key: "url",
                    display_box: true,
                    hide_headings: false
                  },
                  contact: {
                    key: "contact_url",
                    display_box: false,
                    hide_headings: true
                  }
                }
              };
            },
            computed: $.extend(
              generate_multi_key_fn([
                function countries_details_from_key(key) {
                  return {
                    key: key + '_countries_details',
                    fn: function () {
                      return vfs.data[this[key + '_countries_key']];
                    }
                  }
                },
                function main_options(key) {
                  return {
                    key: "main_" + key + "_options",
                    fn: function () {
                      return $.extend(
                        {
                          placeholder: this[key + '_placeholder']
                        },
                        this.common_options
                      );
                    }
                  };
                },
                function selected_details(key) {
                  var selected_index_key = "selected_" + key + "_index";

                  return {
                    key: "selected_" + key + "_details",
                    fn: function () {
                      return this[selected_index_key] == -1
                        ? null
                        : this["cur_" + key + "_countries"][
                        this[selected_index_key]
                        ];
                    }
                  };
                }
              ]),
              {
                current_link: function () {
                  return (
                    this.selected_resident_details &&
                    this.selected_visiting_details &&
                    (this.selected_resident_details[this.type_details.key] ||
                      this.selected_visiting_details[this.type_details.key])
                  );
                }
              }
            ),
            watch: generate_multi_key_fn(function selected_details(
              key,
              opposite_key
            ) {
              var cur_opposite_countries_key =
                "cur_" + opposite_key + "_countries",
                selected_opposite_details_key =
                  "selected_" + opposite_key + "_details";

              return {
                key: "selected_" + key + "_details",
                fn: function (val) {
                  var prev_selected_details = this[
                    selected_opposite_details_key
                  ];

                  if (!val)
                    this[cur_opposite_countries_key] = this[
                      opposite_key + "_countries_details"
                    ];
                  else if (val.hasOwnProperty(opposite_key))
                    this[cur_opposite_countries_key] = val[opposite_key];

                  if (prev_selected_details) {
                    this.$nextTick(function () {
                      this[
                        "selected_" + opposite_key + "_index"
                      ] = this.find_selected_index(
                        prev_selected_details,
                        this[cur_opposite_countries_key]
                      );
                    });
                  }
                }
              };
            }),
            methods: {
              find_selected_index: function (selected_details, new_countries) {
                for (var i = 0; i < new_countries.length; i++) {
                  if (new_countries[i].name == selected_details.name) return i;
                }

                return -1;
              },
              check_and_animate_invalid: function () {
                if (this.current_link) return false;

                if (this.selected_resident_index == -1)
                  this.$add_and_remove_animation_class($(this.$refs.resident_countries.$el), 'invalid');

                if (this.selected_visiting_index == -1)
                  this.$add_and_remove_animation_class($(this.$refs.visiting_countries.$el), 'invalid');

                return true;
              },
              go_clicked: function () {
                if (this.check_and_animate_invalid())
                  return;

                vfs.utilities.gtm_custom_event(
                  "Go to Mission Website",
                  "Form submission - " + this.name,
                  this.selected_visiting_details.name + "/" + this.selected_resident_details.name,
                  "go_to_mission_website"
                );
              }
            },
            created: function () {
              this.cur_resident_countries = this.resident_countries_details;
              this.cur_visiting_countries = this.visiting_countries_details;
            }
          };
        })(),
        "tab-container": {
          mixins: ["slot_data_with_computed_options"],
          template: '<div class="tab_container mart_half_big">\
            <div class="button_list_wrapper">\
              <div class="button_list">\
                <div class="button" v-for="(btn, index) in buttons" :key="index" :class="[{active: index == active_index}, btn.type]" v-dynamic-html="btn.name" @click="select_index(index)" />\
              </div>\
            </div>\
            <transition-group tag="div" name="fade" class="tab_wrapper" v-animate-height-on-change="true">\
                <tab v-for="(cur_options, index) in main_slot_component_options" :key="cur_options.propsData.name" v-bind="cur_options.propsData" :class="{active: index == active_index}" v-show="index == active_index" ref="tab">\
                  <v-nodes :vnodes="cur_options.children" />\
                </tab>\
            </transition-group>\
          </div>',
          data: function () {
            return {
              active_index: 0
            };
          },
          computed: {
            buttons: function () {
              var buttons = [];

              for (var i = 0; i < this.main_slot_component_options.length; i++)
                buttons.push(this.main_slot_component_options[i].propsData);

              return buttons;
            }
          },
          watch: {
            active_index: {
              handler: function (val, old_val) {
                var tabs = this.$refs.tab;

                if (tabs && tabs.length) {
                  this.$nextTick(function () {
                    vfs.utilities.set_equal_children_height($(tabs[val].$el));
                  });
                }

                this.$emit('change', {
                  index: val,
                  name: this.buttons[val].name,
                  old_index: old_val
                });
              },
              immediate: true
            }
          },
          methods: {
            select_index: function (index) {
              this.active_index = index;
            }
          }
        },
        "tab": {
          mixins: ['name_prop', 'type_prop'],
          template: '<div class="tab" :class="type">\
            <slot />\
          </div>'
        },
        breadcrumb: {
          import_from_root: ["breadcrumb"],
          template:
            '<div class="breadcrumb">\
          <div class="wrapper">\
            <ul>\
            <li v-for="(nav_item, index) in breadcrumb" :key="index">\
              <hyperlink :content="nav_item.nav_data" />\
              <i class="icon-arrow-right" v-if="index != breadcrumb.length - 1" />\
            </li>\
            </ul>\
          </div>\
          </div>'
        },
        "icon-heading-wrapper": {
          mixins: ["type_prop", "content_prop", "tag_name_prop"],
          template:
            '<div class="icon_heading_wrapper" v-if="content.icon">\
          <div class="icon_wrapper">\
            <icon :content="content.icon" :type="content.icon_type" />\
          </div>\
          <heading :content="content" />\
        </div>\
        <heading :content="content" v-else />',
          components: {
            heading: {
              import_from_parent: ["type", "tag_name"],
              mixins: ["content_prop"],
              template:
                '<heading class="main_heading" :class="[type, content.class]" :is="tag_name" v-dynamic-html="content.heading || content" />'
            }
          }
        },
        "banner-heading-wrapper": {
          mixins: ["type_prop", "content_prop", "type_details_computed"],
          template:
            '<component :is="type_details" :content="content" class="banner_heading_wrapper" :class="[type, content.class_name]" />',
          data: function () {
            return {
              all_type_details: {
                main_home: "main-home-heading-wrapper",
                main_page: "main-page-heading-wrapper",
                normal: "normal-heading-wrapper"
              }
            };
          },
          components: {
            "main-home-heading-wrapper": {
              mixins: ["content_prop"],
              template:
                '<div>\
              <icon-heading-wrapper type="medium_heading dim_color" class="padb_small2" :content="content.headings.small_heading" tag_name="h1" />\
              <icon-heading-wrapper type="main_big_heading" :content="content.headings.big_heading" tag_name="h2" />\
              <hyperlink :content="content.read_more" type="read_more" class="mart_normal2" v-if="content.read_more" />\
            </div>'
            },
            "main-page-heading-wrapper": {
              mixins: ["content_prop"],
              template:
                '<icon-heading-wrapper type="main_big_heading" class="max_content_width padb_big" :content="content.heading" tag_name="h1" />'
            },
            "normal-heading-wrapper": {
              mixins: ["content_prop"],
              template:
                '<div class="max_content_width padb_big">\
              <icon-heading-wrapper type="big_heading" :content="content.heading" tag_name="h3" />\
              <hyperlink :content="content.read_more" type="read_more" class="mart_normal2" />\
            </div>'
            }
          }
        },
        "multi-type-heading-wrapper": {
          mixins: ["type_prop", "content_prop"],
          template:
            '<div class="multi_type_heading_wrapper" :class="content.class_name">\
          <icon-heading-wrapper type="small_heading dim_color" :content="content.small_heading" tag_name="h2" />\
          <icon-heading-wrapper type="big_heading" class="padt_extra_small" :content="content.big_heading" tag_name="h3" v-if="content.big_heading" />\
          <icon-heading-wrapper :type="\'medium_heading\' + (type != \'medium_no_dim\' ? \' dim_color\' : \'\')" class="padt_small" :content="content.medium_heading" tag_name="h4" v-if="content.medium_heading" />\
          <hyperlink :content="content.read_more" type="read_more" v-if="content.read_more" class="mart_normal" />\
          </div>'
        },
        "medium-small-heading-wrapper": {
          mixins: ["type_prop", "content_prop", "type_details_computed"],
          template:
            '<div class="multi_small_heading_wrapper" :class="content.class_name">\
          <icon-heading-wrapper type="medium_heading2" :content="content.medium_heading" :tag_name="type_details.medium_heading_tag_name" />\
          <icon-heading-wrapper type="small_heading dim_color" class="padt_extra_small" :content="content.small_heading" :tag_name="type_details.small_heading_tag_name" v-if="content.small_heading" />\
        </div>',
          data: function () {
            return {
              all_type_details: {
                undefined: {
                  medium_heading_tag_name: "h4",
                  small_heading_tag_name: "h5"
                },
                no_back_color: {
                  medium_heading_tag_name: "h3",
                  small_heading_tag_name: "h4"
                }
              }
            };
          }
        },
        "multi-small-heading-wrapper": {
          mixins: ["content_prop"],
          template:
            '<div class="multi_small_heading_wrapper" :class="content.class_name">\
          <icon-heading-wrapper type="small_heading dim_color" class="padb_extra_small" :content="content.small_dim_heading" tag_name="h4" v-if="content.small_dim_heading" />\
          <icon-heading-wrapper type="small_heading" :content="content.small_heading" tag_name="h5" v-if="content.small_heading" />\
          </div>'
        },
        "big-sub-heading-wrapper": {
          mixins: ["type_prop", "content_prop", "type_details_computed"],
          template:
            '<div class="big_sub_heading_wrapper" :class="content.class_name">\
          <icon-heading-wrapper :type="type_details.big_heading_type" :content="content.big_heading" :tag_name="type_details.big_heading_tag_name" />\
          <icon-heading-wrapper type="medium_heading dim_color" :class="type_details.medium_heading_class" v-for="(medium_heading, index) in main_medium_heading_content" :content="medium_heading" :tag_name="type_details.medium_heading_tag_name" :key="index" />\
          </div>',
          data: function () {
            return {
              all_type_details: {
                undefined: {
                  big_heading_type: "main_big_heading",
                  big_heading_tag_name: "h1",
                  medium_heading_tag_name: "h2",
                  medium_heading_class: "padt_small2"
                },
                small: {
                  big_heading_type: "big_heading",
                  big_heading_tag_name: "h3",
                  medium_heading_tag_name: "h4",
                  medium_heading_class: "padt_extra_small"
                }
              }
            };
          },
          computed: {
            main_medium_heading_content: function () {
              var cur_content = this.content.medium_heading;

              return cur_content && !$.isArray(cur_content)
                ? [cur_content]
                : cur_content;
            }
          }
        },
        "side-seperator-list": {
          mixins: [
            "type_prop",
            "content_prop",
            "type_details_computed",
            "column_details_prop"
          ],
          template:
            '<ul class="side_seperator_list col_type_normal" :class="type_details" :data-column-details="column_details" data-equal_children_height=".">\
          <li v-for="(cur_content, index) in content" :key="index" :class="{padv_normal2: type==\'stats-details\'}">\
            <component :index="index" :content="cur_content" :is="type" />\
          </li>\
        </ul>',
          data: function () {
            return {
              all_type_details: {
                "stats-details": "responsive_center",
                "small-headings-details": "small"
              }
            };
          },
          components: {
            "step-details": {
              mixins: ["content_prop", "index_prop"],
              template:
                '<div class="step_details">\
              <div class="step_heading_wrapper padb_small">\
                <h4 class="big_heading orange padb_small">{{index + 1}}</h4>\
                <h5 class="medium_heading2" v-dynamic-html="content.medium_heading" />\
              </div>\
              <h6 class="small_heading dim_color" v-dynamic-html="content.small_heading" />\
            </div>'
            },
            "stats-details": {
              import_from_root: ["stats"],
              mixins: ["content_prop"],
              template:
                '<div>\
                <h4 class="big_heading orange padb_extra_small2" v-dynamic-html="stats[content.stats_key]" />\
                <h5 class="small_heading dim_color" v-dynamic-html="content.text" />\
            </div>'
            },
            "small-headings-details": {
              mixins: ["content_prop"],
              template:
                '<div>\
              <h4 class="medium_heading2 orange padb_extra_small" v-dynamic-html="content.medium_heading" />\
                      <h5 class="small_heading dim_color" v-dynamic-html="content.small_heading" />\
            </div>'
            },
            "simple-basic-content-list": {
              mixins: ["content_prop"],
              template:
                '<simple-list type="basic-content" :content="content" />'
            },
            "heading-simple-list": {
              mixins: ["content_prop", "index_prop"],
              template:
                '<div>\
              <h3 class="medium_heading2 orange" v-dynamic-html="headings[index]" />\
              <simple-list :content="content" type="basic-content" class="padt_small padb_0" />\
            </div>',
              data: function () {
                return {
                  headings: [
                    "For the Client Governments:",
                    "For the Applicants:"
                  ]
                };
              }
            }
          }
        },
        "side-heading-details-list": {
          mixins: [
            "content_prop",
            "read_more_link_html_prop",
            "list_loader_main_list"
          ],
          template:
            '<ul class="bottom_seperator_list medium">\
          <li v-for="(cur_content, index) in content" :key="index" v-if="do_show(index)">\
            <side-heading-details-wrapper :content="cur_content" />\
          </li>\
          </ul>',
          components: {
            "side-heading-details-wrapper": {
              mixins: ["content_prop"],
              template:
                '<div class="side_heading_details_wrapper clearfix">\
                <multi-small-heading-wrapper :content="content.side_headings" :class="{marb_normal: !content.image_style}" />\
                <main-details :content="content" />\
              </div>',
              components: {
                "main-details": {
                  import_from_parent: {
                    read_more_link_html: 2
                  },
                  mixins: ["content_prop", "main_read_more_computed"],
                  template:
                    '<div class="details">\
                    <main-image-wrapper :content="content" class="marb_normal" v-if="content.image_style" />\
                    <p class="padb_0" v-dynamic-html="content.title" />\
                    <hyperlink :content="main_read_more" type="read_more" />\
                  </div>'
                }
              }
            }
          }
        },
        "big-button": {
          mixins: ["type_prop", "content_prop"],
          template:
            '<div class="big_button">\
            <hyperlink :content="content" :type="type" @click.native="link_clicked" />\
          </div>',
          methods: {
            link_clicked: function (e) {
              if (!this.$listeners.click) return;

              e.preventDefault();

              this.$emit("click", e);
            }
          }
        },
        "bookmark-list": {
          mixins: ["content_prop"],
          template:
            '<div class="nav_wrapper bottom_border">\
            <ul class="inner_sub_nav">\
              <li v-for="(cur_content, index) in content" :key="index">\
                <hyperlink :content="cur_content" />\
              </li>\
            </ul>\
          </div>'
        },
        "heading-link-wrapper": {
          mixins: [
            "content_prop",
            "read_more_link_html_prop",
            "main_read_more_computed"
          ],
          template:
            '<div class="heading_link_wrapper">\
            <component :is="heading_tag_name" class="heading_wrapper max_content_width" :content="content.heading" />\
            <div class="link_wrapper">\
              <hyperlink :type="link_type" :content="main_read_more" />\
            </div>\
          </div>',
          props: {
            heading_tag_name: {
              type: String,
              default: 'default-heading-wrapper'
            },
            link_type: {
              type: String,
              default: "read_more"
            }
          },
          components: {
            "default-heading-wrapper": {
              mixins: ["content_prop"],
              template: '<div>\
                <h3 class="normal_content_heading" v-dynamic-html="content" />\
              </div>'
            }
          }
        },
        accordion: {
          mixins: [create_plugin_component_mixin("accordion")],
          template:
            '<ul class="accordion bottom_seperator_list medium">\
            <slot />\
          </ul>',
          props: {
            button_link_html: {
              type: String,
              default: "View"
            },
            button_heading_tag_name: {
              type: String
            }
          },
          data: function () {
            return {
              current_callbacks: {
                on_before_open: function (e) {
                  vfs.utilities.set_equal_children_height(e.$content_wrapper);
                }
              }
            };
          },
          updated: function () {
            $(this.$el).data("accordion").set_all_li();
          }
        },
        "accordion-item": {
          template: "<li>\
            <slot />\
          </li>"
        },
        "accordion-button": {
          import_from_parent: {
            button_link_html: 2,
            button_heading_tag_name: 2
          },
          mixins: ["content_prop"],
          template:
            '<heading-link-wrapper class="button_wrapper" :content="main_content" link_type="read_more_down" :heading_tag_name="button_heading_tag_name" />',
          computed: {
            main_content: function () {
              return {
                heading: this.content,
                read_more: {
                  html: this.button_link_html
                }
              };
            }
          }
        },
        "accordion-content": {
          mixins: ["type_prop"],
          template:
            '<div class="content_wrapper">\
            <div class="main_content_wrapper">\
              <slot v-if="type == \'full_width\'" />\
              <div class="max_content_width" v-else>\
                <slot />\
              </div>\
            </div>\
          </div>'
        },
        "image-short-info-wrapper": {
          mixins: ["type_prop", "content_prop", "read_more_link_html_prop"],
          template:
            '<div class="image_short_info_wrapper" :class="type">\
            <main-image-wrapper :content="content" :class="{main_banner_image: type == \'extra_large\'}" />\
            <short-info-wrapper :content="content.short_info" :type="type" />\
          </div>',
          components: {
            "short-info-wrapper": {
              import_from_parent: ["read_more_link_html"],
              mixins: [
                "type_prop",
                "content_prop",
                "type_details_computed",
                "main_read_more_computed"
              ],
              template:
                '<div class="short_info_wrapper">\
                <component class="heading_wrapper" :is="type_details" :content="content" :type="type" />\
                <hyperlink :content="main_read_more" type="read_more" />\
              </div>',
              data: function () {
                return {
                  all_type_details: {
                    extra_large: "normal-heading",
                    large: "normal-heading",
                    normal: "normal-heading",
                    no_back_color: "medium-small-heading-wrapper"
                  }
                };
              },
              components: {
                "normal-heading": {
                  mixins: [
                    "type_prop",
                    "content_prop",
                    "type_details_computed"
                  ],
                  template:
                    '<heading :class="type_details.class_name" :is="type_details.tag_name" v-dynamic-html="content.heading" />',
                  data: function () {
                    var non_extra_large_details = {
                      tag_name: "h5",
                      class_name: "medium_heading2"
                    };

                    return {
                      all_type_details: {
                        extra_large: {
                          tag_name: "h4",
                          class_name: "normal_content_heading"
                        },
                        large: non_extra_large_details,
                        normal: non_extra_large_details
                      }
                    };
                  }
                }
              }
            }
          }
        },
        "image-short-info-list": {
          mixins: ["type_prop", "content_prop", "read_more_link_html_prop"],
          template:
            '<ul class="col_type_normal" data-column-details="image_info_col3_details" data-equal_children_height=".image_short_info_wrapper > .short_info_wrapper > .heading_wrapper">\
            <li v-for="(cur_article_data, index) in main_content" :key="index">\
              <image-short-info-wrapper :type="type" :content="cur_article_data" :read_more_link_html="read_more_link_html" />\
            </li>\
          </ul>',
          props: {
            include_resolution_folder: {
              type: Boolean,
              default: true
            }
          },
          computed: {
            main_content: (function () {
              var copy_keys = {
                keys: ["image"],
                are_prevent_keys: true
              };

              return function () {
                var main_content = [],
                  cur_obj,
                  cur_content_obj,
                  cur_image_data;

                for (var i = 0; i < this.content.length; i++) {
                  cur_obj = {};
                  cur_content_obj = this.content[i];
                  cur_image_data = cur_content_obj.image;

                  vfs.utilities.json_and_arr.copy_keys(
                    cur_obj,
                    cur_content_obj,
                    copy_keys
                  );

                  cur_obj.image_style = $.extend({}, cur_image_data.style, {
                    "background-image":
                      "url(" +
                      cur_image_data.prefix_path +
                      (this.include_resolution_folder
                        ? vfs.utilities.string.check_add_slash("medium")
                        : "") +
                      cur_image_data.main_name +
                      ")"
                  });

                  main_content.push(cur_obj);
                }

                return main_content;
              };
            })()
          }
        },
        "grey-box": {
          mixins: ["type_prop", "content_prop", "read_more_link_html_prop"],
          template:
            '<component :is="type" :content="content" class="grey_box" />',
          components: {
            "heading-content": {
              mixins: ["content_prop"],
              template:
                '<div>\
                <h3 class="normal_content_heading" v-dynamic-html="content.heading" />\
                <div v-dynamic-html="content.main_content" />\
              </div>'
            },
            "heading-link-list": {
              mixins: ["content_prop"],
              template:
                '<div>\
                <h4 class="normal_content_heading padb_0" v-dynamic-html="content.heading" />\
                <simple-list :content="content.links" type="hyperlink" class="padb_0 padt_small" />\
              </div>'
            },
            "multi-type-heading": {
              mixins: ["content_prop"],
              template:
                '<div>\
                <multi-type-heading-wrapper :content="content" :type="content.type" />\
              </div>'
            },
            "icon-details": {
              import_from_parent: ["read_more_link_html"],
              mixins: ["content_prop", "main_read_more_computed"],
              template:
                '<div class="icon_details_wrapper" :is="content.href ? \'a\' : \'div\'" :href="content.href" :target="content.target">\
                <div class="icon_wrapper">\
                  <icon :content="content.icon" :type="content.icon_type" />\
                </div>\
                <div class="details_wrapper">\
                  <div class="main_content">\
                    <h3 class="medium_heading2" v-dynamic-html="content.heading" />\
                    <hyperlink :content="main_read_more" type="read_more"></hyperlink>\
                  </div>\
                </div>\
              </div>'
            }
          }
        },
        "grey-box-list": {
          mixins: [
            "type_prop",
            "content_prop",
            "read_more_link_html_prop",
            "column_details_prop"
          ],
          template:
            '<ul class="col_type_normal" :data-column-details="column_details" :data-equal_children_height="equal_children_height">\
            <li v-for="(cur_content, index) in content" :key="index">\
            <grey-box :content="cur_content" :type="type" :read_more_link_html="read_more_link_html" />\
            </li>\
          </ul>',
          props: {
            equal_children_height: {
              type: String,
              default: ".grey_box"
            }
          }
        },
        "main-image-wrapper": {
          mixins: ["content_prop"],
          template:
            '<div class="main_image_wrapper" :class="content.image_class" :style="content.image_style" />'
        },
        "image-caption-wrapper": {
          mixins: ["content_prop"],
          template:
            '<div class="image_caption_wrapper">\
            <main-image-wrapper :content="content" class="main_banner_image" />\
            <div class="caption_wrapper" v-if="content.caption" v-dynamic-html="content.caption" />\
          </div>'
        },
        "side-image-content-wrapper": {
          mixins: ["type_prop", "content_prop"],
          template:
            '<div class="side_image_content_wrapper">\
            <div class="image_wrapper" :class="{ max_medium_width: type == \'image_max_medium_width\' }">\
              <pic :content="content.image" />\
            </div>\
            <div class="content_wrapper">\
              <div class="max_content_width">\
                <big-sub-heading-wrapper :content="content.big_sub_heading" :type="content.big_sub_heading.type" :class="content.big_sub_heading.type == \'small\' ? \'padb_normal\' : \'padb_half_big\'" v-if="content.big_sub_heading" />\
                <icon-heading-wrapper :content="content.medium_heading" type="normal_content_heading" tag_name="h4" v-if="content.medium_heading" />\
                <div v-dynamic-html="content.main_content" />\
              </div>\
            </div>\
          </div>'
        },
        "inline-images": {
          mixins: ["content_prop"],
          template:
            '<ul class="inline_images">\
            <li v-for="(image, index) in content" :key="index">\
              <a :href="image.href" :target="image.target">\
                <pic :content="image" />\
              </a>\
            </li>\
          </ul>'
        },
        "simple-list": {
          mixins: ["type_prop", "content_prop", "list_loader_main_list"],
          template:
            '<ul class="simple_list">\
            <li v-for="(cur_content, index) in content" v-if="do_show(index)" :key="index">\
              <component :is="type" :content="cur_content" />\
            </li>\
          </ul>'
        },
        "list-loader": {
          mixins: ["type_prop", "content_prop"],
          template:
            '<div>\
            <component :content="content" :is="type" :last_show_index="last_show_index" v-bind="list_attrs" />\
            <big-button class="mart_half_big" :content="main_load_more_link" v-if="last_show_index && last_show_index < content.length" @click="load_next_list" />\
          </div>',
          props: {
            load_more_button_html: {
              type: String,
              default: "Load More"
            },
            show_at_start: {
              type: Number,
              required: true
            },
            load_next: {
              type: Number,
              default: null
            },
            list_attrs: Object
          },
          data: function () {
            return {
              last_show_index: this.show_at_start
            };
          },
          computed: {
            main_load_more_link: function () {
              return {
                html: this.load_more_button_html,
                href: "#"
              };
            }
          },
          methods: {
            load_next_list: function () {
              if (this.load_next == null) {
                this.last_show_index = null;
                return;
              }

              this.last_show_index += this.load_next;
            }
          },
          components: {
            "simple-link-list-wrapper": {
              mixins: ["content_prop", "list_loader_main_list"],
              template:
                '<div class="max_content_width">\
                <simple-list :content="content" type="hyperlink" :last_show_index="last_show_index" />\
              </div>'
            },
            "accordion-side-image-content-list": {
              mixins: ["content_prop", "list_loader_main_list"],
              template:
                '<accordion ref="root">\
                <accordion-item v-for="(cur_content, index) in content" :key="index" :class="{active: index == 0}" v-if="do_show(index)">\
                  <accordion-button :content="cur_content.heading" />\
                    <accordion-content type="full_width">\
                      <side-image-content-wrapper :content="cur_main_content" type="image_max_medium_width" v-for="(cur_main_content, image_content_index) in cur_content.image_content" :key="image_content_index" :class="{marb_normal2 : image_content_index != cur_content.image_content.length - 1}" />\
                  </accordion-content>\
                </accordion-item>\
              </accordion>'
            },
            "heading-content-list": {
              mixins: ["content_prop", "list_loader_main_list"],
              template:
                '<div class="max_content_width">\
                <ul class="bottom_seperator_list medium">\
                  <li v-for="(cur_content, index) in content" :key="index" v-if="do_show(index)">\
                    <medium-small-heading-wrapper :content="cur_content.heading" class="padb_half_big" />\
                    <div v-dynamic-html="cur_content.main_content" />\
                  </li>\
                </ul>\
              </div>'
            }
          }
        },
        "other-info-carousel-container": {
          mixins: [
            "type_prop",
            "content_prop",
            "read_more_link_html_prop",
            "tag_name_prop"
          ],
          template:
            '<div>\
            <heading :content="content.heading" class="padb_half_big max_content_width" />\
            <div class="other_info_box_carousel" :class="{far_owl_nav: typeof content.heading != \'string\'}" :data-equal_children_height="equal_children_height">\
              <component :is="tag_name" v-for="(cur_content, index) in content.other_info" :key="index" :content="cur_content" :type="type" :read_more_link_html="read_more_link_html" />\
            </div>\
          </div>',
          props: {
            equal_children_height: {
              type: String,
              default:
                ".image_short_info_wrapper > .short_info_wrapper > .heading_wrapper"
            }
          },
          components: {
            heading: {
              mixins: ["content_prop"],
              template:
                '<h3 class="normal_content_heading" v-if="typeof content == \'string\'" v-dynamic-html="content" />\
              <multi-type-heading-wrapper :content="content" v-else />'
            }
          }
        },
        "stats-list": {
          import_from_root: [
            "stats",
            "all_stats_details",
            "applications_in_millions"
          ],
          template:
            '<ul class="stats_list mart_big col_type_full center_box" data-column-details="stats_col5_details">\
            <li v-for="(cur_stats_details, index) in all_stats_details" :key="index" v-if="cur_stats_details.show_on_main_stats !== false">\
            <div class="stats" :class="cur_stats_details.stats_key || cur_stats_details.data_key">\
              <i :class="cur_stats_details.icon_name" />\
              <h4>\
              <span class="prefix" v-dynamic-html="cur_stats_details.prefix_text" v-if="cur_stats_details.prefix_text" />\
              <span class="count" v-dynamic-html="get_count(cur_stats_details)" />\
              <span class="text" v-dynamic-html="cur_stats_details.text" />\
              </h4>\
            </div>\
            </li>\
          </ul>',
          methods: {
            get_count: function (cur_stats_details) {
              var stats_key = cur_stats_details.stats_key;

              return Math.floor(
                stats_key
                  ? this.stats[stats_key]
                  : this[cur_stats_details.data_key]
              );
            }
          }
        },
        "share-wrapper": {
          template:
            '<div class="share_wrapper">\
            <ul class="icons">\
              <li v-for="(cur_details, index) in share_icon_details" :key="index">\
                <a :href="cur_details.href" :target="cur_details.target">\
                  <i :class="cur_details.icon_class" />\
                </a>\
              </li>\
            </ul>\
          </div>',
          data: function () {
            return {
              general_details: {
                url: document.URL,
                page_heading: function () {
                  return vfs.utilities.string.get_text_from_html(
                    $(
                      ".content_container > .big_sub_heading_wrapper > .main_big_heading"
                    ).html()
                  );
                },
                sub_heading: function () {
                  return vfs.utilities.string.get_text_from_html(
                    $(
                      ".content_container > .big_sub_heading_wrapper > .medium_heading"
                    ).html()
                  );
                },
                via: "VFS Global",
                mail_subject_suffix: "VFS Global Blog Article"
              },
              encoded_details: null,
              share_icon_details: [
                {
                  icon_class: "icon-twitter",
                  href: function () {
                    var encoded_details = this.encoded_details;

                    return (
                      "http://twitter.com/intent/tweet?url=" +
                      encoded_details.url +
                      "&text=" +
                      encoded_details.page_heading +
                      "&via=" +
                      encoded_details.via
                    );
                  },
                  target: "_blank"
                },
                {
                  icon_class: "icon-facebook",
                  href: function () {
                    var encoded_details = this.encoded_details;

                    return (
                      "https://www.facebook.com/sharer/sharer.php?u=" +
                      encoded_details.url
                    );
                  },
                  target: "_blank"
                },
                {
                  icon_class: "icon-linkedin",
                  href: function () {
                    var encoded_details = this.encoded_details;

                    return (
                      "https://www.linkedin.com/shareArticle?url=" +
                      encoded_details.url
                    );
                  },
                  target: "_blank"
                },
                {
                  icon_class: "icon-email",
                  href: function () {
                    var encoded_details = this.encoded_details;

                    return (
                      "mailto:?subject=" +
                      encoded_details.page_heading +
                      " - " +
                      encoded_details.mail_subject_suffix +
                      "&body=" +
                      encoded_details.page_heading +
                      (encoded_details.sub_heading
                        ? "%0D%0A" + encoded_details.sub_heading
                        : "") +
                      "%0D%0A%0D%0Avia @" +
                      encoded_details.via +
                      "%0D%0AURL: " +
                      encoded_details.url
                    );
                  }
                }
              ]
            };
          },
          mounted: (function () {
            var set_encoded_details = function () {
              var encoded_details = {},
                general_details_val;

              for (var key in this.general_details) {
                general_details_val = this.general_details[key];
                encoded_details[key] = encodeURI(
                  typeof general_details_val == "function"
                    ? general_details_val.call(this)
                    : general_details_val
                );
              }

              this.encoded_details = encoded_details;
            },
              share_icon_details = function () {
                var cur_details;

                for (var i = 0; i < this.share_icon_details.length; i++) {
                  cur_details = this.share_icon_details[i];

                  cur_details.href =
                    typeof cur_details.href == "function"
                      ? cur_details.href.call(this)
                      : cur_details.href;
                }
              };

            return function () {
              set_encoded_details.call(this);
              share_icon_details.call(this);
            };
          })()
        },
        "other-service-boxes": {
          mixins: ["content_prop"],
          template: '<ul class="other_service_boxes col_type_normal" data-column-details="other_service_boxes" data-equal_children_height="h5,a">\
            <li v-for="(service_content, index) in content.services" :key="index">\
              <a :href="service_content.link" :target="service_content.link && \'_blank\'" @click="emit_box_click(index)">\
                <div class="image_wrapper center_align marb_extra_small2">\
                  <img :src="content.image_folder_path + service_content.image" :alt="$get_text_from_html(service_content.heading)" />\
                </div>\
                <h5 class="small_heading marb_extra_small2" v-dynamic-html="service_content.heading" />\
                <icon-heading-wrapper v-if="service_content.location" :content="{icon: \'icon-location\', heading: service_content.location}" tag_name="h6" type="extra_small_heading" />\
                <h6 v-if="service_content.sub_heading" class="extra_small_heading dim_color mart_extra_small2" v-dynamic-html="service_content.sub_heading" />\
              </a>\
            </li>\
          </ul>',
          methods: {
            emit_box_click: function (index) {
              this.$emit('box-click', {
                index: index,
                data: this.content.services[index]
              });
            }
          }
        },
        "service-tabs-3-steps-container-with-content": {
          template: '<service-tabs-3-steps-container :all-step-content="all_step_content">\
            <template slot="multiTypeSmallHeading">\
              How it works\
            </template>\
            <template slot="multiTypeBigHeading" slot-scope="slot_props">\
              {{all_step_content[slot_props.props_data.name].step_heading}}\
            </template>\
            <tab name="Visa/Permits">\
              <country-drp-form-wrapper name="Home Top Section - Visa/Permits" />\
            </tab>\
            <tab name="Passport Services">\
              <country-drp-form-wrapper name="Home Top Section - Passport Services" visiting_heading="and a citizen of" visiting_placeholder="Search Citizenship Country" resident_countries_key="passport_services" visiting_countries_key="passport_services_visiting_countries" />\
            </tab>\
            <tab name="Government Services">\
              <government-services />\
            </tab>\
            <tab name="Tourism Services">\
              <tourism-services />\
            </tab>\
          </service-tabs-3-steps-container>',
          data: function () {
            return {
              all_step_content: {
                "Visa/Permits": {
                  step_heading: 'Get your visa in 3 simple steps',
                  step_content: [{
                    medium_heading: "Select  the country to which you are travelling to",
                    small_heading: "Let us know which country you are travelling to and we will tell you if you need a visa, which visa you should apply for and what the rules are."
                  }, {
                    medium_heading: "Complete your application online",
                    small_heading: "Our websites are easy to use. Just complete your visa application form, make the online payment and maybe if you want to, you can add some convenient, optional services. Finally book your appointment at a centre closest to you."
                  }, {
                    medium_heading: "Submit your application at the VFS Global Centre",
                    small_heading: "We are looking forward to meeting you at our centre on your confirmed appointment to submit your application and biometrics. Later you can track your application status on our website."
                  }]
                },
                "Passport Services": {
                  step_heading: 'Get your passport in 3 simple steps',
                  step_content: [{
                    medium_heading: "Select the country that you are a citizen of",
                    small_heading: "Let us know where you are currently residing and your nationality. We will then let you know if you can complete your passport application with us and direct you to our website."
                  }, {
                    medium_heading: "Complete your application online",
                    small_heading: "Our websites are easy to use. Get all the information you need, complete your application and  book an appointment for submission of your application and biometrics."
                  }, {
                    medium_heading: "Submit your application at the VFS Global Center",
                    small_heading: "We are looking forward to meeting you at our centre on your confirmed appointed to submit your application and biometrics."
                  }]
                },
                "Government Services": {
                  step_heading: 'Get any government service in 3 simple steps',
                  step_content: [{
                    medium_heading: "Select the service you need",
                    small_heading: "Click on the any of the above services we have to offer and we will direct you to the website."
                  }, {
                    medium_heading: "Get all the information you need online",
                    small_heading: "Our websites are easy to use and contain all the information you need in regards to timings, centre addresses, documentation required, pricing, helplines and booking an appointment."
                  }, {
                    medium_heading: "Avail your service at the VFS Global centre",
                    small_heading: "Visit us at our centre to avail the services."
                  }]
                },
                "Tourism Services": {
                  step_heading: 'Get any tourism service in 3 simple steps',
                  step_content: [{
                    medium_heading: "Select the service you need",
                    small_heading: "Click on the any of the above services we have to offer and we will direct you to the website."
                  }, {
                    medium_heading: "Complete your  purchase online",
                    small_heading: "Get all the information on the various tourism services, purchase the services for the country you are visiting."
                  }, {
                    medium_heading: "Avail your service",
                    small_heading: "Get information on how to avail the service as you visit the destination country."
                  }]
                },
                "VDash": {
                  step_heading: 'Get your visa through VDash in 3 simple steps',
                  step_content: [{
                    medium_heading: "Select your destination and trip details.",
                    small_heading: "Let us know the country you are travelling to, and we will show you your visa options. You can apply quickly and easily with the intuitive smart forms. This means that you’ll only ever answer relevant and straightforward questions."
                  }, {
                    medium_heading: "Solve your queries",
                    small_heading: "Once you’ve submitted your application, their team of experts will take it from here. They’ll check your application and can even represent you at the embassy, arrange fast-track processing, courier services, lounge access and more."
                  }, {
                    medium_heading: "Submit your application",
                    small_heading: "Where required they can book your appointment and their experts will help you with submitting your application. Keep an eye on your application's progress with live updates from your personal dashboard."
                  }]
                }
              }
            }
          },
          components: {
            "government-services": {
              template: '<accordion class="other_government_services" button_heading_tag_name="medium-small-heading-wrapper" @open="accordion_opened">\
                  <accordion-item v-for="(cur_content, index) in content" :key="index" :class="{active: index == active_service_group_index}">\
                    <accordion-button :content="cur_content.heading" />\
                    <accordion-content type="full_width">\
                      <other-service-boxes :content="{image_folder_path: image_folder_path, services: cur_content.services}" @box-click="service_box_clicked" />\
                    </accordion-content>\
                  </accordion-item>\
                </accordion>',
              data: function () {
                return {
                  content_type_name: 'Government Services',
                  active_service_group_index: 0,
                  image_folder_path: '../assets/images/government-services/',
                  content: [{
                    heading: {
                      medium_heading: 'Attestation and Verification Services',
                      small_heading: 'Unified services and solutions for end-to-end attestation and verification of documents with relevant authorities.'
                    },
                    services: [{
                      image: 'document-attestation.png',
                      heading: 'Document Attestation',
                      location: 'India',
                      sub_heading: 'Get assistance for document Attestation, Legalisation, Authentication or Translation requirements',
                      link: 'http://www.vfsattestation.com/'
                    }, {
                      image: 'document-attestation.png',
                      heading: 'Document Attestation',
                      location: 'UAE',
                      sub_heading: 'Get assistance for document Attestation, Legalisation, Authentication or Translation requirements',
                      link: 'http://www.vfsattestation.com/GCC/'
                    }, {
                      image: 'Finland-verification.png',
                      heading: 'Finland (Verification services)',
                      location: 'Nigeria',
                      link: 'http://www.vfsverification.com/finland/nigeria/'
                    }, {
                      image: 'Canada-RCMP.png',
                      heading: 'Canadian Background Police Check',
                      location: 'Canada (RCMP)',
                      link: 'http://www.vfsglobal.com/canada/criminal-record-check/'
                    }]
                  }, {
                    heading: {
                      medium_heading: 'Migration Services',
                      small_heading: 'Application and biometric enrolment services for Foreign National Registration, Work Permits and Residence Permits.'
                    },
                    services: [{
                      image: 'owrc.png',
                      heading: 'Overseas Workers Resource Centre (OWRC)',
                      location: 'India',
                      sub_heading: 'Get information on any matters related to emigration and resolution for any grievances',
                      link: 'http://www.owrc.in/'
                    }, {
                      image: 'dha-south-africa.jpg',
                      heading: 'Department of Home Affairs',
                      location: 'South Africa',
                      sub_heading: 'Get your South African permit and visa renewed across different centers in country',
                      link: 'https://www.vfsglobal.com/southafrica/'
                    }, {
                      image: 'moh-uae.png',
                      heading: 'Ministry of Health, Dubai',
                      location: 'UAE',
                      sub_heading: 'Get your medical examination for your UAE identity card',
                      link: 'http://www.vfsglobal.com/mohap/uae/'
                    }, {
                      image: 'moh-lesotho.jpg',
                      heading: 'Lesotho in Country',
                      location: 'Lesotho',
                      sub_heading: 'Get and extend your residency permit in Lesotho',
                      link: 'http://www.homeaffairslesotho.com/'
                    }, {
                      image: 'oni-ivory-coast.png',
                      heading: 'Foreigner Registration',
                      location: 'Ivory Coast',
                      sub_heading: 'Get and extend your Ivory Coast Resident Card',
                      link: 'http://www.carteresident.ci'
                    }]
                  }, {
                    heading: {
                      medium_heading: 'Public Services',
                      small_heading: 'Vehicle Registration, Birth & Death Certification, Land Registration, Company Registration, e-Governance delivered through one-stop service centres, digital channels and doorstep provision.'
                    },
                    services: [{
                      image: 'uae-dubai-courts.jpg',
                      heading: 'Dubai Courts',
                      location: 'UAE',
                      sub_heading: 'Visit here for any dispute related services, notary services and personal status services',
                      link: 'https://www.vfsglobal.com/dubai-courts/'
                    }, {
                      image: 'MoJ-Ukraine.png',
                      heading: 'House of Justice',
                      location: 'Ukraine',
                      sub_heading: 'Get information on all the services provided at Global registration centre by House of Justice ',
                      link: 'http://www.vfsglobal.com/house-of-justice/ukraine/index.html'
                    }, {
                      image: 'Dept-of-Admin-Reforms.png',
                      heading: 'Doorstep Delivery of Civic Services',
                      location: 'Delhi, India',
                      sub_heading: 'Residents of Delhi can dial 1076 and have a specialised representative visit them at their home for a wide range of civic services'
                    },{
                      image: 'MAHUD-Manipur.png',
                      heading: 'Citizen Facilitation Center, Manipur',
                      location: 'Imphal, India',
                      sub_heading: 'State-of-the-art center provides wide range of proficiently managed E-district services and a host of sub-services'
                    }
                  ]
                  }]
                };
              },
              computed: {
                active_service_group: function () {
                  return this.content[this.active_service_group_index];
                },
                active_service_group_heading: function () {
                  return this.active_service_group.heading.medium_heading;
                }
              },
              methods: {
                accordion_opened: function (e) {
                  this.active_service_group_index = e.index;

                  vfs.utilities.gtm_custom_event(
                    this.content_type_name,
                    'Group Head Clicked',
                    this.active_service_group_heading,
                    true
                  );
                },
                service_box_clicked: function (e) {
                  vfs.utilities.gtm_custom_event(
                    'Navigation Click - ' + this.content_type_name,
                    'Service Clicked - ' + this.active_service_group_heading,
                    e.data.heading + (e.data.location ? ' (' + e.data.location + ')' : ''),
                    true
                  );
                }
              }
            },
            "tourism-services": {
              template: '<other-service-boxes class="tourism_services" :content="all_service_content" @box-click="service_box_clicked" />',
              data: function () {
                return {
                  all_service_content: {
                    image_folder_path: '../assets/images/tourism-services/',
                    services: [{
                      image: 'britain-travel-shop.png',
                      heading: 'Britain Travel Shop',
                      sub_heading: 'From Oyster cards to museum visits, purchase all your UK passes and tickets right here.',
                      link: 'https://www.visitbritainshop.com/britain-travel-shop-world/'
                    }, {
                      image: 'france-travel-shop.jpg',
                      heading: 'France Travel Shop',
                      sub_heading: 'A one-stop-shop for your France sightseeing needs.',
                      link: 'https://www.partner.viator.com/en/67853'
                    }, {
                      image: 'switzerland-travel-shop.jpg',
                      heading: 'Switzerland Travel Shop',
                      sub_heading: 'Explore Switzerland or trek the mountains with our Swiss Travel Passes and Mountain Excursions.',
                      link: 'https://shop.switzerlandtravelcentre.com/?affiliateId=305#/en/home'
                    }, {
                      image: 'switzerland-travel-shop.jpg',
                      heading: 'Switzerland Travel Shop',
                      sub_heading: 'Discover more enthralling sights with Switzerland Travel Shop.',
                      link: 'https://www.partner.viator.com/en/67851'
                    }, {
                      image: 'dubai-travel-shop.png',
                      heading: 'Dubai Travel Shop',
                      sub_heading: 'Entry tickets to the top Dubai attractions are just a click away.',
                      link: 'https://www.partner.viator.com/en/67858'
                    }]
                  }
                }
              },
              methods: {
                service_box_clicked: function (e) {
                  vfs.utilities.gtm_custom_event(
                    'Navigation Click - Tourism Services',
                    'Tour Selected',
                    e.data.heading,
                    true
                  );
                }
              }
            },
            "service-tabs-3-steps-container": {
              mixins: ["slot_component_options"],
              template: '<div class="wrapper">\
                <tab-container @change="tab_changed" :slot_data="slot_component_options" />\
                <step-heading-container-list />\
              </div>',
              props: {
                allStepContent: {
                  type: Object,
                  required: true
                }
              },
              data: function () {
                return {
                  active_tab_index: null
                };
              },
              methods: {
                tab_changed: function (e) {
                  this.active_tab_index = e.index;

                  if (e.old_index != undefined)
                    vfs.utilities.gtm_custom_event('Tab Selected', 'Selected from Homepage', e.name, true);
                }
              },
              components: {
                "step-heading-container-list": {
                  import_from_parent: ['allStepContent', 'slot_component_options', 'active_tab_index'],
                  template: '<div class="content_container">\
                    <transition-group tag="ul" name="fade" class="step_heading_container_list" v-animate-height-on-change="true">\
                      <li v-for="(content, index) in slot_component_options" :key="index" v-show="index == active_tab_index" :class="{active: index == active_tab_index}">\
                        <multi-type-heading-wrapper class="padb_big" :content="all_multi_type_headings[index]" />\
                        <side-seperator-list type="step-details" column_details="steps_col3_details" :content="all_steps_main_content[index]" />\
                      </li>\
                    </transition-group>\
                  </div>',
                  computed: {
                    all_multi_type_headings: function () {
                      var all_multi_type_headings = [],
                        parent_component = this.$parent,
                        cur_tab_content;

                      for (var i = 0; i < this.slot_component_options.length; i++) {
                        cur_tab_content = this.get_tab_content(i);

                        all_multi_type_headings.push({
                          small_heading: $.trim(this.$get_slot_content(parent_component, 'multiTypeSmallHeading', cur_tab_content)[0].text),
                          big_heading: $.trim(this.$get_slot_content(parent_component, 'multiTypeBigHeading', cur_tab_content)[0].text)
                        })
                      }

                      return all_multi_type_headings;
                    },
                    all_steps_main_content: function () {
                      var all_steps_main_content = [],
                        cur_tab_content;

                      for (var i = 0; i < this.slot_component_options.length; i++) {
                        cur_tab_content = this.get_tab_content(i);

                        all_steps_main_content.push(this.allStepContent[cur_tab_content.props_data.name].step_content);
                      }

                      return all_steps_main_content;
                    }
                  },
                  watch: {
                    active_tab_index: function () {
                      this.$nextTick(function () {
                        var $el = $(this.$el);

                        vfs.dynamic_columns.set_column($el);
                        vfs.utilities.set_equal_children_height($el);
                      });
                    }
                  },
                  methods: {
                    get_tab_content: function (index) {
                      return {
                        index: index,
                        props_data: this.slot_component_options[index].propsData
                      };
                    }
                  }
                }
              }
            }
          }
        },
        "company-profile-content": {
          import_from_root: [
            "stats",
            "biometric_inception",
            "applications_in_millions"
          ],
          template:
            '<div>\
            <p>VFS Global is the world\'s largest outsourcing and technology services specialist for governments and diplomatic missions worldwide. The company manages the administrative and non-judgmental tasks related to visa, passport, identity management and other citizen services for its client governments. This enables them to focus entirely on the critical task of assessment.</p>\
            <p>With <strong>{{stats.application_centres}} application centres</strong> and operations in <strong>{{stats.operation_countries}} countries</strong> across <strong>{{stats.continents}} continents</strong>, VFS Global serves the interests of <strong>{{stats.client_governments}} client governments</strong>. The company has successfully processed over <strong>{{Math.floor(applications_in_millions)}} million applications</strong> since its inception in 2001, and over <strong>{{stats.biometric_enrolments_in_millions}} million biometric enrolments since {{biometric_inception}}.</strong></p>\
            <p>VFS Global provides a wide range of services to visa applicants, all aimed at enhancing customer experience in public services with an automated and seamless process. However, VFS Global does not play any part in the decision-making process behind visa applications being granted or denied.</p>\
            <p>VFS Global employs highly trained and dedicated staff across {{stats.continents}} continents, and is continually investing in its people and technology operations. The company offers rewarding and exciting career opportunities across the globe.</p>\
            <p>VFS Global, which is headquartered in Dubai, UAE, has a Swiss parentage and is a portfolio company of EQT, a leading global private equity firm headquartered in Stockholm, Sweden. EQT has portfolio companies in Europe, Asia and North America. The Swiss-based Kuoni and Hugentobler Foundation also has a stake in VFS Global.</p>\
            <p><a href="../general/milestones.html">View VFS Global\'s Milestones</a></p>\
            <p class="padb_0"><a href="../general/footprint.html">View VFS Global\'s Clients and Global Footprint</a></p>\
          </div>'
        },
        "contact-media-queries": {
          template:
            '<div class="contact_media_queries">\
            <h3 class="normal_content_heading" v-dynamic-html="heading" />\
            <p class="padb_0" v-dynamic-html="para" />\
          </div>',
          data: function () {
            return {
              heading: "Media queries",
              para:
                'For media queries please <a href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;&#99;&#111;&#109;&#109;&#117;&#110;&#105;&#99;&#97;&#116;&#105;&#111;&#110;&#115;&#64;&#118;&#102;&#115;&#103;&#108;&#111;&#98;&#97;&#108;&#46;&#99;&#111;&#109;">&#99;&#108;&#105;&#99;&#107;&#32;&#104;&#101;&#114;&#101;</a>'
            };
          }
        },
        "media-content": {
          import_from_root: ["news"],
          template:
            '<accordion>\
            <accordion-item v-for="(cur_year_content, index) in news.media.main_content" :key="index" :class="{active: index == 0}">\
              <accordion-button :content="cur_year_content.heading"></accordion-button>\
              <accordion-content type="full_width">\
              <list-loader :content="cur_year_content.links" type="simple-link-list-wrapper" :show_at_start="news.media.show_at_start"></list-loader>\
              </accordion-content>\
            </accordion-item>\
          </accordion>'
        },
        "footprint-container": {
          template:
            '<div class="footprint_container">\
            <big-sub-heading-wrapper :content="main_page_headings" class="max_content_width"></big-sub-heading-wrapper>\
            <iframe src="../general/footprint-map.html" scrolling="no" frameborder="0" style="margin-top: 20px;"></iframe>\
          </div>',
          data: function () {
            return {
              main_page_headings: {
                big_heading: "Footprint",
                medium_heading: {
                  heading:
                    "Click on the dots to view the client list in the country",
                  class: "hide_from_ipad"
                }
              }
            };
          }
        },
        "milestones-outer-container": {
          template:
            '<div>\
							<h1 class="main_big_heading max_content_width padb_big">Milestones</h1>\
							<milestones :content="content"></milestones>\
            </div>',
          data: function () {
            return {
              content: [
                (function () {
                  var stats = "latest";

                  return {
                    year: 2019,
                    stats: stats,
                    content_list: [
                      "Introduced the new Thailand eVisa on Arrival (eVOA) service in collaboration with the Immigration Bureau of Thailand",
                      "Awarded contract to open new Passport Application Centres across four locations in Ghana by the Ministry of Foreign Affairs and Regional Integration in Ghana",
                      "Launched exclusive Netherlands Passport and ID Application Centre in the United Kingdom"
                    ],
                    stats_content: [
                      function (vue_app) {
                        return (
                          "<sup>^</sup>Statistics stated are as on " +
                          (stats == "latest"
                            ? vue_app.stats.stats_date
                            : "31 December 2019")
                        );
                      }
                    ]
                  };
                })(),
                {
                  year: 2018,
                  stats: {
                    client_governments: 62,
                    application_centres: 2997,
                    operation_countries: 142,
                    applications_in_millions: 189.13,
                    employees: 9611
                  },
                  content_list: [
                    "Signed on the 61<sup>st</sup> Client Government. New Clients: Dominican Republic, Lebanon and Republic of Sudan",
                    "Expanded Identity & Citizen Services in the UAE with the launch of 3 state-of-the-art Citizen Services Centres for local authorities",
                    "Signed agreement with the client government of Estonia for VFS Global’s first-ever E-residency programme",
                    "Achieved full compliance with new European Union General Data Protection Regulation (GDPR) for operations globally"
                  ],
                  stats_content: [
                    "<sup>^</sup>Statistics stated are as on 31 December 2018"
                  ]
                },
                {
                  year: 2017,
                  stats: {
                    client_governments: 58,
                    application_centres: 2469,
                    operation_countries: 129,
                    applications_in_millions: 161.67,
                    employees: 7083
                  },
                  content_list: [
                    "Launch of the 1<sup>st</sup> China in Luxury outlet at the Chinese Visa Application Centre in New Delhi, India",
                    "Started Tourism Representation for Czech Republic in India",
                    "Achieved Cyber Essentials certification for UKVI operations"
                  ],
                  stats_content: [
                    "<sup>^</sup>Statistics stated are as on 31 December 2017"
                  ]
                },
                {
                  year: 2016,
                  stats: {
                    client_governments: 50,
                    application_centres: 2214,
                    operation_countries: 126,
                    applications_in_millions: 137.94,
                    employees: 4201
                  },
                  content_list: [
                    "Launched Premium Application Centres in seven major cities in the USA for Home Office - UK Visas & Immigration (UKVI)",
                    "First-of-its-kind On Demand Mobile Visa Service (ODMV) launched for UKVI in three countries in the Middle East and across India",
                    "VFS Global awarded contract for 50<sup>th</sup> client government",
                    "DVPC launched the transactional DVPC UAE Visa Mobile app available to Emirates customers in over 180 countries. The free app can be downloaded from the Google play store or the iOS app store",
                    "Awarded the contract to service the diplomatic missions of Kuwait<sup>*</sup> and Turkey in India",
                    "All websites managed by VFS Global certified ISO/IEC/IEEE 23026:2015 for Engineering and management of websites for systems, software and services information",
                    "VFS Global operations certified Occupational Health and Safety Assessment Series (OHSAS) 18001:2007, and People Capability Maturity Model (PCMM) maturity level 3 rating by CMMI Institute, Carnegie Mellon University."
                  ],
                  content_list_info: [
                    "<sup>*</sup>VFS Global is a sub-contractor to Mawared Kuwait (the prime contractor for Kuwait Government operations)"
                  ],
                  stats_content: [
                    "<sup>^</sup>Statistics stated are as on 31 December 2016"
                  ]
                },
                {
                  year: 2015,
                  stats: {
                    client_governments: 48,
                    application_centres: 1916,
                    operation_countries: 123,
                    applications_in_millions: 114.71,
                    employees: 3825
                  },
                  content_list: [
                    "VFS Global launches new Identity Management and Citizen Services (IM & CS) division",
                    "VFS Global won contracts to serve three new client governments – Brazil, Ghana and Latvia towards the last quarter of 2015",
                    "VFS Global successfully processes its 100 millionth application",
                    "In July 2015, VFS Global won the prestigious Golden Peacock Environment Management Award (GPEMA) within the “Organisational responsibility towards Environment Management” category. The conscientious steps taken by the company all through 2014 stood recognised through this honour. VFS Global was chosen winner from among 22 contenders within the service sector.",
                    "Launched first operations in Myanmar where visa services are offered for the Department of Immigration and Border Protection (DIBP), Citizenship and Immigration Canada (CIC) and Home Office – UK Visa and Immigration (Home Office – UKVI)",
                    "Was awarded the Opportunity Award at the International Business Excellence (IBX) Awards 2015, for the company’s pioneering solution LIDPro™<sup>*</sup> (Location Independent Document Processing) in the Towards 2020 category",
                    "Was honoured with the IMC-Datamatics Global Services Ltd. Award for LIDPro™ in the Large Enterprise BPO/ITES category"
                  ],
                  content_list_info: [
                    "<strong><sup>*</sup>Patent pending. Copyright 2012. All rights reserved by VFS Global</strong>"
                  ],
                  stats_content: [
                    "<sup>^</sup>Statistics stated are as on 31 December 2015"
                  ]
                },
                {
                  year: 2014,
                  stats: {
                    client_governments: 45,
                    application_centres: 1486,
                    operation_countries: 120,
                    applications_in_millions: 92.8,
                    employees: 3264
                  },
                  content_list: [
                    "VFS Global introduces Front Office Services securing contracts with multiple client governments",
                    "Conferred with Quality Management System (ISO9001:2008) certification for Front Office Project",
                    "VFS Global won an exclusive service contract with the Ministry of Foreign Affairs, Norway to offer services in 51 countries",
                    "Renewed the Spain Global contract",
                    "VFS Global won the prestigious “Service Provider of the Year” award. The award, presented at the 8<sup>th</sup> annual Asian Voice Political and Public Life Awards, recognises the company’s exemplary service to the public for visa and consular services on behalf of High Commission of India in the UK and its respective consulates.",
                    "VFS Global won the prestigious IMC (Indian Merchant Chamber) IT Award 2013 for the excellence in use of Information Technology. The company has won this award under “End Users of IT in Large Enterprise Category” for implementation of SAP and enterprise portal using SharePoint across the globe. This further reaffirms the company’s leadership position in driving business excellence through the integration of information technology (IT) into its business operation."
                  ],
                  stats_content: [
                    "<sup>^</sup>Statistics stated are as at 31 December 2014"
                  ]
                },
                {
                  year: 2013,
                  stats: {
                    client_governments: 45,
                    application_centres: 1156,
                    operation_countries: 107,
                    applications_in_millions: 73.7,
                    employees: 2753
                  },
                  content_list: [
                    "VFS Global won 6 out of 8 regions under next generation visa outsourcing global contract from the Home Office - UK Visas & Immigration",
                    "Achieved 100 countries of operation landmark since inception in 2001",
                    "Launched Location Independent Document Processing (LIDPro™)<sup>*</sup> – a technology-driven electronic innovation, which aids location independent visa processing – developed for, and in association with the Ministry for Foreign Affairs (MFA), Finland. This was implemented at the Finland Visa Application Centre (VAC) in St. Petersburg, the largest visa issuing post in the world among the Schengen countries, handling over one million applications annually and at the Finland VAC in Murmansk",
                    "Launched video interviewing hub for Home Office – UK Visas & Immigration (formerly UK Border Agency) in Sheffield, UK : a technology-enabled solution to facilitate the interviewing of UK visa applicants from remote locations across the globe, 24/7",
                    "Won 86% of the global visa contract from the Government of the Netherlands, involving setting up visa application centres in 14 countries",
                    "Awarded 90% of global visa contract by the Government of Denmark",
                    "Honoured with coveted awards globally under several categories including Business Excellence, Best Network Security and Best Project. Few of these awards are TAAI Appreciation Award for a Decade of Outstanding Service to Indian Travel & Tourism Industry; Best Network Security Implementation – 2013 award under the Fortinet Network Security Awards; Dubai Quality Appreciation Award (DQAA) 2012 for Business Excellence; one of the best projects of the year 2013 by the Project Management Association of Finland for innovating LIDPro™",
                    "Global operations certified ISO 14001:2004 for Environmental Management System",
                    "Launched operations for the Ministry of Foreign Affairs, Kingdom of Saudi Arabia",
                    "Launched Joint Visa Application Centres under the Five Country Conference (5CC) formed by the Governments of Australia, Canada, New Zealand, the United Kingdom and United States of America"
                  ],
                  content_list_info: [
                    "<strong><sup>*</sup>Patent pending. Copyright 2012. All rights reserved by VFS Global</strong>"
                  ]
                },
                {
                  year: 2012,
                  stats: {
                    client_governments: 42,
                    application_centres: 802,
                    operation_countries: 88,
                    applications_in_millions: 55.66,
                    employees: 2651
                  },
                  content_list: [
                    "Won 84 per cent share of the Citizenship and Immigration Canada’s (CIC) global visa application centre contract; involving operations in 104 countries with a worldwide network of 139 Visa Application Centres",
                    "Achieved 50 million applications landmark since inception in 2001; including 10 million biometric enrolments",
                    "Awarded the key visa services global contract by the Ministry of Foreign Affairs, Kingdom of Saudi Arabia; entailing operations across 33 countries",
                    "Received worldwide visa outsourcing contract by the Ministry of Foreign Affairs, Government of Greece; started operations in P. R. China, India, Nepal, Russia and Turkey",
                    "Awarded global contract by the Republic of Slovenia to serve the new client government in P. R. China, Egypt, India, Russia and Ukraine; also commenced operations in six Indian cities",
                    "Expanded association with the Government of Bulgaria; awarded global visa outsourcing contract by the Ministry of Foreign Affairs, Bulgaria; and started operations in Kazakhstan, Russia, Turkey and Ukraine",
                    "Honoured with coveted awards globally under several categories including Leadership, Innovation, Quality Management, Information Technology, and Best Employer. Few of these awards were TAAI Award for Leadership in Innovation; Capgemini Leadership Award for Innovation; three Global Awards from World Quality Congress, and Bloomberg - UTV Dream Employer of the Year Award",
                    "Global operations certified ISO 9001:2008 for Quality Management System and ISO 27001:2005 for Information Security Management System",
                    "Established first operations in the USA; launched India Passport Application Centres in five cities",
                    "Innovative biometric solution launched for the Home Office – UK Visas & Immigration (formerly UK Border Agency); UK visa mobile biometric clinics held in Kazakhstan, Malaysia, India and Ivory Coast",
                    "Won contract for New Zealand visa services in Indonesia, Japan, South Africa, Taiwan, The Republic of Korea, Turkey and UAE",
                    "Added new clients: Estonia, Latvia and Lithuania",
                    "Achieved one million visa applications at the Finland Visa Application Centre in St. Petersburg, Russia"
                  ]
                },
                {
                  year: 2011,
                  stats: {
                    client_governments: 37,
                    application_centres: 526,
                    operation_countries: 63,
                    applications_in_millions: 41.09,
                    employees: 2404
                  },
                  content_list: [
                    "Won the Austria global contract for managing its visa services across 11 countries",
                    "Commenced the Home Office – UK Visas & Immigration (formerly UK Border Agency) - Department of Immigration and Border Protection (formerly Department of Immigration and Citizenship) Joint Visa Application Centres (JVACs) project for the Government of UK and Australia, in 11 countries",
                    "Started first operation in Nordic region with opening of Russia VAC in Finland",
                    "Added new clients – Malaysia, New Zealand and the Republic of Korea",
                    "Won Spain worldwide contract for 45 countries; developed and deployed end-to-end biometric solutions for the Government of Spain",
                    "Won visa support services contract from the Government of Poland in 14 cities across Ukraine",
                    "Launched operations in new countries: India operations in Colombia, Iran, Malaysia, The Netherlands and Yemen; Canada and the Republic of Korea operations in Mongolia, and France operations in The Dominican Republic",
                    "Launched Third Eye – Business Intelligence & Quality Centre with an objective to enable access, supervision, monitoring and maintenance of the service level agreements (SLAs) and key performance indicators (KPIs) in real-time across VFS Global’s call centre operations worldwide. Third Eye empowers VFS Global with greater capabilities to monitor, control and take critical decisions in real-time.",
                    "Launched the world’s largest Visa Application Centre in Russia for Finland"
                  ]
                },
                {
                  year: 2010,
                  stats: {
                    client_governments: 34,
                    application_centres: 409,
                    operation_countries: 48,
                    applications_in_millions: 29.63,
                    employees: 1927
                  },
                  content_list: [
                    "Expanded presence in two new countries — Algeria and Turkey",
                    "Awarded the first ever global Schengen contract from the Government of Denmark; involved providing visa services to the diplomatic missions of Denmark in 13 countries",
                    "Successfully established visa services operations for the Embassy of Japan in Thailand — the first ever outsourced contract by the Government of Japan",
                    "Partnered with the diplomatic missions of Finland for services in Moscow and St. Petersburg (Russia) and Kiev (Ukraine) — the first ever outsourced partnership with the Government of Finland",
                    "Awarded contracts for Hungary visa operations in the UAE and UK, and Cyprus operations in UAE",
                    "Awarded contract to service the diplomatic missions of Norway in Sri Lanka and Thailand",
                    "Commenced operations in Brazil for DVPC; in Turkey for the Governments of Denmark, Iceland and Malta; and in Algeria for the Government of Spain",
                    "Won the coveted Information Systems Audit and Control Association (ISACA) Award for Information Security; Security Strategist Award for Leadership in IT Security; and Greentech Awards for HR - Best Strategy and Training Excellence"
                  ]
                },
                {
                  year: 2009,
                  stats: {
                    client_governments: 28,
                    application_centres: 337,
                    operation_countries: 45,
                    applications_in_millions: 21.0,
                    employees: 1850
                  },
                  content_list: [
                    "Launched the India Consular Services Centre in nine cities across Canada",
                    "Established Regional Office in Washington D.C., USA; extending the company’s global reach across five continents",
                    "Received International Quality & Productivity Centre (IQPC) award for “Best Process Improvement in Service and Transaction Project” at the IQPC Annual Lean Six Sigma & Process Improvement Summit 2009 at Orlando, USA",
                    "Entered into partnership with the Government of Russia to commence its visa operations in the UK",
                    "Expanded presence in Western Europe and grew partnership with the Indian missions; launched operations for the Indian Embassies in Belgium and Switzerland"
                  ]
                },
                {
                  year: 2008,
                  stats: {
                    client_governments: 25,
                    application_centres: 282,
                    operation_countries: 42,
                    applications_in_millions: 13.94,
                    employees: 1826
                  },
                  content_list: [
                    "Launched operations for the USA in Nigeria; association extended with the US mission to the third country after India and Malaysia",
                    "Awarded contract for Portugal visa operations in India, the first visa process outsourcing contract by the Government of Portugal",
                    "Won contracts for Malta operations in Russia, the first ever visa process outsourcing contract by the Government of Malta to any company",
                    "Started operations for Dubai Visa Processing Centre (DVPC) in Iran, Jordan and Lebanon",
                    "Launched Joint Visa Application Centres (JVACs) for client diplomatic missions of Schengen countries in Ghana, India, UAE, and the UK"
                  ]
                },
                {
                  year: 2007,
                  stats: {
                    client_governments: 19,
                    application_centres: 192,
                    operation_countries: 36,
                    applications_in_millions: 8.15,
                    employees: 1590
                  },
                  content_list: [
                    "Awarded the Home Office – UK Visas & Immigration (formerly UK Border Agency) global contract for 33 countries across seven geographical regions, and completed roll-outs with seamless integration of biometrics",
                    "Awarded contract to provide visa outsourcing services to the Embassies of India in Thailand, P. R. China, France, Sri Lanka, and the High Commissions of India in Australia and the UK"
                  ]
                },
                {
                  year: "2004-05",
                  stats: {
                    client_governments: 11,
                    application_centres: 101,
                    operation_countries: 11,
                    applications_in_millions: 2.44,
                    employees: 597
                  },
                  content_list: [
                    "Network expanded across Gulf Cooperation Council (GCC) countries through launch of Australia operations in Bahrain, Kuwait, Oman, Qatar and Saudi Arabia",
                    "Started operations for the diplomatic mission of Canada in India",
                    "Forayed into Africa through acquiring the visa services contract for UK in Ghana, and Australia in South Africa",
                    "Ventured into products and services innovation by successfully launching “Online Appointment Scheduling System” for client governments",
                    "Set up first overseas operations in Singapore for the Home Office – UK Visas & Immigration (formerly UK Border Agency)",
                    "Expanded presence across South Asia — Bangladesh, India, Nepal and Sri Lanka",
                    "Acquired contracts for managing visa operations for Australia in Bangladesh and UAE, and Ireland in India",
                    "Commenced operations for the first Schengen clients — France and Italy in India"
                  ]
                },
                {
                  year: 2001,
                  stats: {
                    client_governments: 1,
                    application_centres: 3,
                    operation_countries: 1,
                    applications_in_millions: 0.15,
                    employees: 46
                  },
                  content_list: [
                    "Launched visa application services for the US Consulate in Mumbai, in the western cities of India — Ahmedabad, Mumbai and Pune"
                  ]
                }
              ]
            };
          },
          components: {
            milestones: {
              mixins: [
                "content_prop",
                {
                  data: function () {
                    return {
                      dragger_pos: 1, //between 0 to 1
                      hide_content: true,
                      animating: false,
                      dragging: false,
                      content_display: null,
                      dropdown_display: null
                    };
                  }
                }
              ],
              template:
                '<div class="bg_map">\
                <div class="milestones_container">\
                <div class="dropdown_wrapper show_from_big_mobile" ref="dropdown_wrapper">\
                  <autocomplete class="plain_dropdown" v-bind="dropdown_options" :data="content" v-model="active_index" />\
                </div>\
                <div class="line hide_from_big_mobile" />\
                <xy-dragger-container :content="content" v-model="dragger_pos" :options="xy_dragger_options" @drag_status_change="update_dragging" class="hide_from_big_mobile" />\
                <div class="milestones_outer_wrapper">\
                  <div class="main_milestones_wrapper">\
                  <div class="year_selection_outer_container hide_from_big_mobile">\
                    <div class="main_year_selection_container">\
                    <wheel-dragger-container :content="content" v-model="dragger_pos" :options="wheel_dragger_options" @drag_status_change="update_dragging" />\
                    <div class="content_space_wrapper">\
                      <h2 v-dynamic-html="content[active_index].year" />\
                    </div>\
                    </div>\
                  </div>\
                  <div class="year_content_container" ref="year_content_container">\
                    <ul class="year_content_list" :class="{hide: hide_content}" v-animate-height-on-change="!is_content_hor_aligned">\
                    <li v-for="(year_content, index) in content" :key="index" :class="{active: index == active_index}">\
                      <div class="seperator" />\
                      <div class="year_stats_container">\
                      <div class="year_stats_wrapper">\
                        <simple-stats-list :content="year_content.stats" v-if="year_content.stats.length || Object.keys(year_content.stats).length" />\
                        <ul class="stats_content_list">\
                        <li v-for="(cur_content, index) in year_content.stats_content" :key="index" v-dynamic-html="cur_content" />\
                        <li v-dynamic-html="figures_in_million_html" />\
                        </ul>\
                      </div>\
                      </div>\
                      <div class="main_content_outer_wrapper">\
                      <div class="main_content_wrapper">\
                        <div class="main_content custom_scroll_theme">\
                        <simple-list :content="year_content.content_list" type="basic-content" />\
                        <ul class="content_info_list" v-if="year_content.content_list_info">\
                          <li v-for="(cur_content, index) in year_content.content_list_info" :key="index" v-dynamic-html="cur_content" />\
                        </ul>\
                        </div>\
                      </div>\
                      </div>\
                    </li>\
                    </ul>\
                  </div>\
                  </div>\
                </div>\
                </div>\
              </div>',
              data: function () {
                return {
                  figures_in_million_html:
                    "<sup>*</sup>Cumulative figures in million (m), since inception",
                  xy_dragger_options: {
                    on_release_duration: 0.5,
                    button_on_click_speed: 0.7 //percent/second
                  },
                  wheel_dragger_options: {
                    angle_distance: 13, //in degree
                    button_on_click_speed: 70, //in angle/second
                    visible_angle_margin: 1, //in degree
                    on_release_duration: 0.5, //in sec
                    scale_at_180_deg: -0.5
                  },
                  starting_animation_duration: 2 //in sec
                };
              },
              computed: {
                dropdown_options: (function () {
                  var template_fn = function (element) {
                    return element.year;
                  },
                    common_options = {
                      match_input_search: function () {
                        return true;
                      },
                      list_template_html: template_fn,
                      selected_template_html: template_fn
                    };

                  return function () {
                    return common_options;
                  };
                })(),
                active_index: {
                  get: function () {
                    return Math.round(
                      (this.content.length - 1) * this.dragger_pos
                    );
                  },
                  set: function (value) {
                    if (value < 0 || this.animating || this.dragging) return;

                    this.dragger_pos = value / (this.content.length - 1);
                  }
                },
                is_content_hor_aligned: function () {
                  return this.content_display == 'table-cell';
                }
              },
              methods: {
                animate_dragger_pos: (function () {
                  var previous_time,
                    all_frames_time,
                    tween_callbacks = {
                      onUpdate: function () {
                        var cur_time = new Date();

                        if (previous_time)
                          all_frames_time.push(cur_time - previous_time);

                        previous_time = cur_time;
                      },
                      onComplete: function (do_hide_content, component) {
                        if (do_hide_content) component.hide_content = false;

                        component.animating = false;
                      }
                    };

                  return function (to_dragger_pos, duration, do_hide_content) {
                    if (typeof to_dragger_pos == "object")
                      to_dragger_pos =
                        to_dragger_pos.dragger_pos != undefined
                          ? to_dragger_pos.dragger_pos
                          : this.get_dragger_pos_from_index(
                            to_dragger_pos.index
                          );

                    if (this.dragger_pos == to_dragger_pos) return;

                    if (typeof duration == "object")
                      duration = vfs.utilities.math.get_duration_from_speed(
                        this.dragger_pos,
                        to_dragger_pos,
                        duration.speed
                      );

                    do_hide_content = do_hide_content == undefined ? true : do_hide_content;

                    var component = this;

                    component.hide_content = do_hide_content;
                    component.animating = true;

                    previous_time = null;
                    all_frames_time = [];

                    TweenMax.to(
                      component,
                      duration,
                      $.extend(
                        {
                          dragger_pos: to_dragger_pos,
                          onCompleteParams: [do_hide_content, component]
                        },
                        tween_callbacks
                      )
                    );
                  };
                })(),

                update_dragging: function (value) {
                  this.dragging = value;
                },

                get_dragger_pos_from_index: function (index) {
                  return index / (this.content.length - 1);
                },

                set_data_from_view: function () {
                  this.content_display = $(
                    this.$refs.year_content_container
                  ).css("display");
                  this.dropdown_display = $(this.$refs.dropdown_wrapper).css(
                    "display"
                  );
                }
              },
              outside_events: {
                loaded: function () {
                  this.set_data_from_view();
                  this.animate_dragger_pos(
                    0,
                    this.dropdown_display != "none"
                      ? 0
                      : this.starting_animation_duration
                  );
                },
                resized: function () {
                  this.set_data_from_view();
                }
              },
              components: (function () {
                var drager_container_mixin = {
                  import_from_parent: [
                    "active_index",
                    "animating",
                    "content_display"
                  ],
                  mixins: ["content_prop"],
                  model: {
                    event: "change"
                  },
                  template:
                    '<div :class="type_details.root_class">\
                    <div :class="[type_details.dragger_class, {dragging: dragging}]" ref="dragger" />\
                    <ul class="year_list">\
                    <li v-for="(year_content, index) in content" :key="index" :style="get_year_button_style(index)" :class="{active: index == active_index}" @click="set_active_year(index)" ref="year_button">\
                      <span v-dynamic-html="year_content.year" />\
                    </li>\
                    </ul>\
                  </div>',
                  props: {
                    options: {
                      type: Object,
                      required: true
                    },
                    value: {
                      type: Number,
                      required: true
                    }
                  },
                  data: function () {
                    return {
                      dragging: false
                    };
                  },
                  computed: {
                    value_from_range: {
                      get: function () {
                        return vfs.utilities.math.get_value_from_range(
                          this.range,
                          this.value
                        );
                      },
                      set: function (new_value) {
                        this.$emit(
                          "change",
                          vfs.utilities.math.get_percent_from_range(
                            this.range,
                            new_value
                          )
                        );
                      }
                    },
                    unit_distance: function () {
                      return (
                        (this.range.max - this.range.min) /
                        (this.content.length - 1)
                      );
                    },
                    all_year_button_pos_from_range: function () {
                      var all_pos = [];

                      for (var i = 0; i < this.content.length; i++)
                        all_pos.push(i * this.unit_distance);

                      return all_pos;
                    }
                  },
                  watch: {
                    dragging: function (value) {
                      this.$emit("drag_status_change", value);
                    },
                    dragger_tweenmax_set_data: function (value) {
                      TweenMax.set(this.$refs.dragger, value);
                    },
                    content_display: function () {
                      var draggable = Draggable.get(this.$refs.dragger);

                      draggable.applyBounds(this.draggable_bounds);
                      draggable.update(true);
                    }
                  },
                  methods: {
                    set_active_year: function (index) {
                      if (index == this.active_index || this.animating) return;

                      this.$parent.animate_dragger_pos(
                        {
                          index: index
                        },
                        {
                          speed: this.button_on_click_speed
                        }
                      );
                    }
                  },
                  outside_events: {
                    loaded: (function () {
                      var draggable_callbacks = {
                        onDragStart: function (component) {
                          component.dragging = true;
                        },
                        onDrag: function (component) {
                          component.value_from_range = component.get_value_from_draggable(
                            this
                          );
                        },
                        onRelease: function (component) {
                          component.dragging = false;

                          component.$parent.animate_dragger_pos(
                            {
                              index: component.active_index
                            },
                            component.options.on_release_duration,
                            false
                          );
                        }
                      },
                        get_all_params_obj = function (params) {
                          var all_params_obj = {};

                          for (var key in draggable_callbacks)
                            all_params_obj[key + "Params"] = params;

                          return all_params_obj;
                        };

                      return function () {
                        this.set_data_from_view();

                        Draggable.create(
                          this.$refs.dragger,
                          $.extend(
                            {
                              bounds: this.draggable_bounds,
                              type: this.type_details.draggable_type
                            },
                            draggable_callbacks,
                            get_all_params_obj([this])
                          )
                        );
                      };
                    })(),
                    resized: function () {
                      this.set_data_from_view();
                    }
                  }
                };

                return {
                  "xy-dragger-container": {
                    mixins: [
                      drager_container_mixin,
                      {
                        data: function () {
                          return {
                            container_size: null
                          };
                        }
                      }
                    ],
                    data: function () {
                      return {
                        type_details: {
                          root_class: "xy_dragger_container",
                          dragger_class: "xy_dragger",
                          draggable_type: "xy"
                        }
                      };
                    },
                    computed: {
                      range: function () {
                        return {
                          min: 0,
                          max: this.container_size
                        };
                      },
                      button_on_click_speed: function () {
                        return this.options.button_on_click_speed;
                      },
                      draggable_bounds: function () {
                        var dimension;

                        if (this.content_display == "table-cell") {
                          dimension = {
                            width: 0,
                            height: this.range.max
                          };
                        } else {
                          dimension = {
                            width: this.range.max,
                            height: 0
                          };
                        }

                        return $.extend(
                          {
                            left: 0,
                            top: 0
                          },
                          dimension
                        );
                      },
                      dragger_tweenmax_set_data: function () {
                        return this.content_display == "table-cell"
                          ? {
                            y: this.value_from_range
                          }
                          : {
                            x: this.range.max - this.value_from_range
                          };
                      },
                      year_button_size: function () {
                        return (
                          this.container_size &&
                          this.container_size / (this.content.length - 1)
                        );
                      },
                      year_button_half_size: function () {
                        return (
                          this.year_button_size && this.year_button_size / 2
                        );
                      },
                      year_button_style_props: function () {
                        return this.content_display == "table-cell"
                          ? {
                            size: "height",
                            pos: "top"
                          }
                          : {
                            size: "width",
                            pos: "right"
                          };
                      }
                    },
                    methods: {
                      get_year_button_style: function (index) {
                        var style = {};

                        style[this.year_button_style_props.size] =
                          (index == 0 || index == this.content.length - 1
                            ? this.year_button_half_size
                            : this.year_button_size) + "px";
                        style[this.year_button_style_props.pos] =
                          (index == 0
                            ? 0
                            : this.year_button_size * index -
                            this.year_button_half_size) + "px";

                        return style;
                      },
                      get_value_from_draggable: function (draggable) {
                        return this.content_display == "table-cell"
                          ? draggable.y
                          : this.range.max - draggable.x;
                      },
                      set_data_from_view: function () {
                        this.container_size = $(this.$el)[
                          this.content_display == "table-cell"
                            ? "outerHeight"
                            : "outerWidth"
                        ]();
                      }
                    }
                  },
                  "wheel-dragger-container": {
                    mixins: [
                      drager_container_mixin,
                      {
                        data: function () {
                          return {
                            dragger_size: null,
                            dragger_container_margin: null,
                            year_button_size: null
                          };
                        }
                      }
                    ],
                    data: function () {
                      return {
                        type_details: {
                          root_class: "main_year_selection_wrapper",
                          dragger_class: "wheel_dragger",
                          draggable_type: "rotation"
                        }
                      };
                    },
                    computed: {
                      range: function () {
                        return {
                          min: this.increment,
                          max:
                            (this.content.length - 1) *
                            this.options.angle_distance +
                            this.increment
                        };
                      },
                      button_on_click_speed: function () {
                        return (
                          this.options.button_on_click_speed /
                          (this.range.max - this.range.min)
                        );
                      },
                      draggable_bounds: function () {
                        return {
                          minRotation: this.range.min,
                          maxRotation: this.range.max
                        };
                      },
                      dragger_tweenmax_set_data: function () {
                        return {
                          rotation: this.value_from_range
                        };
                      },
                      increment: function () {
                        return this.content_display == "table-cell" ? 0 : 90;
                      },
                      increment_rad: function () {
                        return vfs.utilities.math.deg_to_rad(this.increment);
                      },
                      center: function () {
                        return (
                          this.dragger_size && {
                            x: this.dragger_size / 2,
                            y: this.dragger_size / 2
                          }
                        );
                      },
                      radius: function () {
                        return this.dragger_size && this.dragger_size / 2;
                      },
                      visible_angle: function () {
                        return this.dragger_container_margin == null ||
                          this.year_button_size == null
                          ? null
                          : vfs.utilities.math.rad_to_deg(
                            Math.acos(
                              (Math.abs(
                                this.dragger_container_margin +
                                this.year_button_size / 2
                              ) -
                                this.radius) /
                              this.radius
                            )
                          ) + this.options.visible_angle_margin;
                      },
                      scale_decrement_per_angle: function () {
                        return (1 - this.options.scale_at_180_deg) / 180;
                      }
                    },
                    methods: {
                      get_year_button_style: function (index) {
                        if (!this.dragger_size) return null;

                        var angle =
                          this.value_from_range -
                          this.all_year_button_pos_from_range[index],
                          scale =
                            1 -
                            Math.abs(angle - this.increment) *
                            this.scale_decrement_per_angle;

                        if (
                          Math.abs(angle - this.increment) <= this.visible_angle
                        ) {
                          angle = vfs.utilities.math.deg_to_rad(angle);

                          return {
                            left:
                              Math.round(
                                this.center.x + this.radius * Math.cos(angle)
                              ) + "px",
                            top:
                              Math.round(
                                this.center.y + this.radius * Math.sin(angle)
                              ) + "px",
                            transform:
                              "translate(-50%, -50%) scale(" +
                              scale +
                              "," +
                              scale +
                              ")"
                          };
                        } else {
                          return null;
                        }
                      },
                      get_value_from_draggable: function (draggable) {
                        return draggable.rotation;
                      },
                      set_data_from_view: function () {
                        this.dragger_size = $(this.$refs.dragger).outerWidth();
                        this.dragger_container_margin = parseInt(
                          $(this.$el).css(
                            this.content_display == "table-cell"
                              ? "margin-left"
                              : "margin-top"
                          )
                        );
                        this.year_button_size = $(
                          this.$refs.year_button[0]
                        ).outerWidth();
                      }
                    }
                  },
                  "simple-stats-list": {
                    import_from_root: [
                      "stats",
                      "all_stats_details",
                      "applications_in_millions"
                    ],
                    mixins: ["content_prop"],
                    template:
                      '<ul class="simple_stats_list">\
										  <li v-for="(cur_content, index) in main_content" :key="index">\
											<span class="count" v-dynamic-html="cur_content.count" />\
											<span class="text" v-dynamic-html="cur_content.text" />\
										  </li>\
										</ul>',
                    computed: {
                      main_content: get_stats_details_fn(
                        "show_on_milestones",
                        (function () {
                          var all_key_count_modifier = {
                            applications_in_millions: function (count) {
                              return count + "m";
                            }
                          };

                          return function (cur_stats_details) {
                            var stats_key = cur_stats_details.stats_key,
                              data_key = cur_stats_details.data_key,
                              common_key = stats_key || data_key,
                              count =
                                this.content == "latest"
                                  ? stats_key
                                    ? this.stats[stats_key]
                                    : this[data_key]
                                  : this.content[common_key];

                            return {
                              count: all_key_count_modifier[common_key]
                                ? all_key_count_modifier[common_key](count)
                                : count,
                              text:
                                cur_stats_details.milestones_text ||
                                cur_stats_details.text
                            };
                          };
                        })()
                      )
                    }
                  }
                };
              })()
            }
          }
        },
        autocomplete: {
          mixins: [create_plugin_component_mixin("autocomplete")],
          model: {
            event: "change"
          },
          template: "<div />",
          props: {
            value: {
              type: Number,
              default: function () {
                return -1;
              }
            }
          },
          data: function () {
            var _this = this;

            return {
              current_callbacks: {
                on_selected: function (e) {
                  _this.$emit("change", e.index);
                },
                on_remove_selected: function () {
                  _this.$emit("change", -1);
                }
              }
            };
          },
          watch: {
            value: function (val) {
              this.plugin_obj.set_selected_index(val);
            }
          }
        }
      }
    };
  })();

  vfs.vue_app = (function () {
    var config,
      init = (function () {
        var init_directives = (function () {
          var all_directives = {
            "dynamic-html": function (el, bindings, vnode) {
              if (bindings.value != null)
                el.innerHTML =
                  typeof bindings.value == "function"
                    ? bindings.value(vnode.context.$root)
                    : bindings.value;
            },
            "animate-height-on-change": (function () {
              var default_duration = 700,

                check_animate_height = (function () {
                  var on_animation_complete = function () {
                    $(this).css({
                      'overflow': '',
                      'height': ''
                    }).removeData('animate-height');
                  };

                  return function ($el) {
                    var directive_value = $el.data('animate-height-directive-value');

                    if (!directive_value)
                      return;

                    var animation_duration = directive_value == true ? default_duration : directive_value,
                      cur_height = $el.outerHeight(),
                      new_height,
                      cur_scroll = vfs.global_variables.$window.scrollTop();

                    $el.css('height', '');

                    new_height = $el.outerHeight();

                    $el.css('height', cur_height + 'px');

                    if (cur_height == new_height) {
                      on_animation_complete.call($el[0]);
                      return;
                    } else if ($el.data('animate-height') != new_height) {
                      $el.data('animate-height', new_height);
                      $el.stop().animate({ height: new_height + 'px' }, animation_duration, on_animation_complete);
                    }

                    vfs.global_variables.$html_body.scrollTop(cur_scroll);
                  };
                })();

              return {
                bind: function (el, bindings, vnode) {
                  var context = vnode.context;

                  var $el = $(el);

                  $el.data('animate-height-directive-value', bindings.value);

                  context.$on('hook:beforeUpdate', function () {
                    if ($el.data('animate-height-directive-value')) {
                      $el.css({
                        'height': $el.outerHeight() + 'px',
                        'overflow': 'hidden'
                      });
                    }
                  });

                  context.$on('hook:updated', function () {
                    setTimeout(function () {
                      check_animate_height($el);
                    });
                  });

                  context.$on('beforeDestroy', function () {
                    $el.removeData('animate-height-directive-value animate-height');
                  });
                },
                update: function (el, bindings) {
                  var $el = $(el),
                    value = bindings.value;

                  $(el).data('animate-height-directive-value', value);

                  if (!value) {
                    $el.css({
                      'height': '',
                      'overflow': ''
                    });
                  }
                }
              };
            })()
          };

          return function () {
            for (var directive_name in all_directives)
              Vue.directive(directive_name, all_directives[directive_name]);
          };
        })(),
          init_global_components = (function () {
            var autoformat_mixins = function (options) {
              var mixins, mixin, components;

              components = options.components;
              for (var component_name in components)
                components[component_name] = autoformat_mixins(
                  components[component_name]
                );

              if (!options.hasOwnProperty("mixins")) return options;

              mixins = options.mixins;

              for (var i = 0; i < mixins.length; i++) {
                mixin = autoformat_mixins(
                  typeof mixins[i] == "string"
                    ? config.all_mixins[mixins[i]]
                    : mixins[i]
                );

                mixins.splice(i, 1, mixin);
              }

              return options;
            };

            return function () {
              var global_components = config.global_components;

              for (var component_name in global_components)
                Vue.component(
                  component_name,
                  autoformat_mixins(global_components[component_name])
                );
            };
          })(),
          generate_data = (function () {
            var main_data,
              copy_data = (function () {
                var get_copy_data_souce_obj = {
                  from_vfs_data: function () {
                    return vfs.data;
                  },
                  from_window: function () {
                    return window;
                  }
                };

                return function () {
                  var data_to_copy = config.data_to_copy;

                  for (var key in get_copy_data_souce_obj) {
                    vfs.utilities.json_and_arr.copy_keys(
                      main_data,
                      get_copy_data_souce_obj[key](),
                      data_to_copy[key]
                    );
                  }
                };
              })(),
              set_calculated_additional_data = (function () {
                var set_section_index = (function () {
                  var set_value = function () {
                    main_data.section_index =
                      vfs.details.page.section_index.value;
                  };

                  return function () {
                    set_value();

                    vfs.details.page.section_index.changed_callbacks.add(
                      set_value
                    );
                  };
                })(),
                  navigation_related_data = (function () {
                    var root_nav_key = "root_nav",
                      all_navigation,
                      breadcrumb,
                      title_data,
                      active_sub_nav_keys,
                      get_prepended_title = function (prepend_text, main_text) {
                        if (!prepend_text) return main_text;

                        return (
                          prepend_text +
                          (main_text != "" ? " | " : "") +
                          main_text
                        );
                      },
                      loop_nav_arr_data = (function () {
                        var nav_data_key_details = (function () {
                          var all_child_nav_obj = {
                            active_data_key: "active_index",
                            main_fn: function (nav_data, level) {
                              return loop_nav_arr_data(nav_data, level + 1);
                            }
                          };

                          return {
                            hidden_child_nav: all_child_nav_obj,
                            child_nav: all_child_nav_obj,
                            sub_nav: {
                              active_data_key: "active_key",
                              main_fn: function (nav_data, level) {
                                var data = loop_nav_key_data(
                                  nav_data,
                                  level + 1
                                );

                                if (!data || !data.active_key) return data;

                                for (var key in nav_data) {
                                  if (
                                    $.inArray(key, active_sub_nav_keys) == -1
                                  )
                                    active_sub_nav_keys.push(key);
                                }

                                return data;
                              }
                            }
                          };
                        })(),
                          set_nav_arr_data_item = (function () {
                            var check_set_breadcrumb_and_title = (function () {
                              var set_title = function (nav_item) {
                                title_data.main_title = get_prepended_title(
                                  vfs.utilities.string.get_text_from_html(
                                    nav_item.html
                                  ),
                                  title_data.main_title
                                );

                                title_data.prefix = get_prepended_title(
                                  nav_item.title_prefix,
                                  title_data.prefix
                                );
                              };

                              return function (nav_item, level) {
                                if (
                                  vfs.utilities.json_and_arr.check_value.in_arr_of_obj(
                                    breadcrumb,
                                    "level",
                                    level
                                  ) != -1 ||
                                  (breadcrumb.length != 0 &&
                                    level >=
                                    breadcrumb[breadcrumb.length - 1].level)
                                )
                                  return;

                                breadcrumb.unshift({
                                  level: level,
                                  nav_data: nav_item
                                });

                                set_title(nav_item);
                              };
                            })();

                            return function (
                              nav_item,
                              index,
                              level,
                              active_index
                            ) {
                              var cur_data_key_obj,
                                active_data = {
                                  is_current_href: false,
                                  is_inner_active: false
                                };

                              for (var key in nav_data_key_details) {
                                cur_data_key_obj = nav_item[key];

                                cur_data_key_obj = nav_data_key_details[
                                  key
                                ].main_fn(cur_data_key_obj, level);

                                if (cur_data_key_obj) {
                                  nav_item[key] = cur_data_key_obj;

                                  if (
                                    cur_data_key_obj[
                                    nav_data_key_details[key].active_data_key
                                    ] != null
                                  )
                                    active_data.is_inner_active = true;
                                }
                              }

                              active_data.is_current_href =
                                nav_item.href == "#"
                                  ? false
                                  : vfs.utilities.url.is_current(nav_item.href);

                              active_data.is_active =
                                active_data.is_current_href ||
                                active_data.is_inner_active;

                              if (
                                active_index == null &&
                                active_data.is_active
                              ) {
                                active_index = index;
                                check_set_breadcrumb_and_title(nav_item, level);
                              }

                              _module.on_set_nav_arr_data_item._call({
                                nav_item: nav_item,
                                index: index,
                                level: level,
                                active_data: active_data
                              });

                              return active_index;
                            };
                          })();

                        return function (nav_arr_data, navigation_key, level) {
                          if (!nav_arr_data) return;

                          if (typeof navigation_key == "number") {
                            level = navigation_key;
                            navigation_key = undefined;
                          }

                          level = level || 0;

                          var active_index = null,
                            return_obj,
                            cur_section_index =
                              vfs.details.page.section_index.value,
                            active_setted_from_section_index = false;

                          if (
                            navigation_key == root_nav_key &&
                            cur_section_index != undefined
                          ) {
                            active_index = set_nav_arr_data_item(
                              nav_arr_data[cur_section_index],
                              cur_section_index,
                              level,
                              active_index
                            );

                            active_setted_from_section_index = true;
                          }

                          for (var i = 0; i < nav_arr_data.length; i++) {
                            if (
                              active_setted_from_section_index &&
                              i == cur_section_index
                            )
                              continue;

                            active_index = set_nav_arr_data_item(
                              nav_arr_data[i],
                              i,
                              level,
                              active_index
                            );
                          }

                          return_obj = {
                            active_index: active_index,
                            nav_data: nav_arr_data
                          };

                          if (
                            navigation_key &&
                            $.inArray(navigation_key, active_sub_nav_keys) == -1
                          )
                            all_navigation[navigation_key] = return_obj;

                          if (navigation_key == root_nav_key)
                            vfs.details.page.section_index.set(active_index);

                          return return_obj;
                        };
                      })(),
                      loop_nav_key_data = function (nav_key_data, level) {
                        if (!nav_key_data) return;

                        var active_key = null,
                          return_obj;

                        for (var key in nav_key_data) {
                          nav_key_data[key] = loop_nav_arr_data(
                            nav_key_data[key],
                            key,
                            level
                          );

                          if (
                            active_key == null &&
                            nav_key_data[key].active_index != null
                          )
                            active_key = key;
                        }

                        return_obj = {
                          active_key: active_key,
                          nav_data: nav_key_data
                        };

                        return return_obj;
                      },
                      set = function () {
                        all_navigation = {};
                        breadcrumb = [];
                        active_sub_nav_keys = [];
                        title_data = {
                          main_title: "",
                          prefix: ""
                        };

                        vfs.data.navigation_page_details = loop_nav_arr_data(
                          vfs.data.navigation_page_details,
                          root_nav_key
                        );

                        main_data.all_navigation = all_navigation;
                        main_data.breadcrumb = breadcrumb;

                        document.title = get_prepended_title(
                          title_data.prefix || vfs.data.default_title_prefix,
                          title_data.main_title
                        );
                      },
                      _module = {
                        set: set,
                        on_set_nav_arr_data_item: new vfs.prototypes.callback()
                      };

                    return _module;
                  })(),
                  set_additional_data_from_navigation = (function () {
                    var loop_add_nav_item_details = function (
                      data,
                      add_nav_item_details,
                      loop_callback
                    ) {
                      var check_call_set_data = function (param_data) {
                        if (
                          cur_add_nav_item_details.check_fn &&
                          !cur_add_nav_item_details.check_fn(param_data)
                        )
                          return;

                        main_obj[
                          data_key
                        ] = cur_add_nav_item_details.set_data(
                          param_data,
                          main_obj[data_key]
                        );
                      },
                        cur_add_nav_item_details,
                        main_obj = {};

                      for (var data_key in add_nav_item_details) {
                        cur_add_nav_item_details =
                          add_nav_item_details[data_key];

                        if (
                          cur_add_nav_item_details.initial_check_fn &&
                          !cur_add_nav_item_details.initial_check_fn(data)
                        )
                          continue;

                        loop_callback(check_call_set_data);
                      }

                      return main_obj;
                    },
                      generate = {
                        image: (function () {
                          var prefix_path = function (data) {
                            return (
                              vfs.utilities.string.check_add_slash(
                                data.nav_item.images_path || data.images_path
                              ) +
                              vfs.utilities.string.check_add_slash(
                                data.cur_sub_nav_item &&
                                data.cur_sub_nav_item.image_folder_name
                              )
                            );
                          },
                            main_name = function (data) {
                              return $.trim(
                                (data.cur_hidden_child_nav_item &&
                                  data.cur_hidden_child_nav_item.image_name) ||
                                data.image_name
                              );
                            },
                            src = function (data, resolution_folder_key) {
                              var resolution_folder_names =
                                data.nav_item.resolution_folder_names ||
                                data.resolution_folder_names,
                                main_image_name = main_name(data);

                              return main_image_name
                                ? prefix_path(data) +
                                vfs.utilities.string.check_add_slash(
                                  resolution_folder_names &&
                                  resolution_folder_names[
                                  resolution_folder_key
                                  ]
                                ) +
                                main_image_name
                                : "";
                            };

                          return {
                            prefix_path: prefix_path,
                            main_name: main_name,
                            src: src,
                            complete_style: function (
                              data,
                              resolution_folder_key
                            ) {
                              var main_src = src(data, resolution_folder_key);

                              return main_src
                                ? $.extend(
                                  {},
                                  (data.cur_hidden_child_nav_item &&
                                    data.cur_hidden_child_nav_item
                                      .image_style) ||
                                  data.nav_item.image_style ||
                                  data.image_style,
                                  {
                                    "background-image":
                                      "url(" + main_src + ")"
                                  }
                                )
                                : null;
                            },
                            tag_data: function (
                              data,
                              alt_html,
                              resolution_folder_key
                            ) {
                              return {
                                src: src(data, resolution_folder_key),
                                alt: vfs.utilities.string.get_text_from_html(
                                  alt_html
                                )
                              };
                            }
                          };
                        })(),
                        image_style_short_info: function (
                          data,
                          resolution_folder_key
                        ) {
                          return {
                            image_style: generate.image.complete_style(
                              data,
                              resolution_folder_key
                            ),
                            image_class:
                              data.cur_hidden_child_nav_item.image_class,
                            short_info: generate.short_info(data)
                          };
                        },
                        image_data_short_info: function (data) {
                          return {
                            image: {
                              style:
                                data.cur_hidden_child_nav_item.image_style ||
                                data.nav_item.image_style,
                              prefix_path: generate.image.prefix_path(data),
                              main_name: generate.image.main_name(data)
                            },
                            short_info: generate.short_info(data)
                          };
                        },
                        read_more: function (data) {
                          return {
                            href: data.cur_hidden_child_nav_item.href,
                            target: data.cur_hidden_child_nav_item.target
                          };
                        },
                        short_info: function (data) {
                          var info = {
                            read_more: generate.read_more(data)
                          };

                          if (data.cur_hidden_child_nav_item.small_heading) {
                            info.small_heading =
                              data.cur_hidden_child_nav_item.small_heading;
                            info.medium_heading =
                              data.cur_hidden_child_nav_item.html;
                          } else {
                            info.heading = data.cur_hidden_child_nav_item.html;
                          }

                          return info;
                        },
                        main_page_headings: function (data) {
                          return {
                            big_heading: data.nav_item.html,
                            medium_heading:
                              (window.master_page_data &&
                                window.master_page_data.main_sub_heading) ||
                              data.cur_sub_nav_item.html
                          };
                        }
                      },
                      all_additional_data_details = {
                        blog: (function () {
                          var is_valid_show_on_prop = function (
                            data,
                            show_on_prop_name
                          ) {
                            var show_on_val =
                              data.cur_hidden_child_nav_item[
                              show_on_prop_name
                              ];

                            return (
                              show_on_val != undefined &&
                              show_on_val !== false
                            );
                          },
                            get_active_section_details = function (main_data) {
                              var sub_nav = main_data.nav_item.sub_nav,
                                main_cur_sub_nav =
                                  sub_nav.nav_data[sub_nav.active_key],
                                active_index =
                                  main_cur_sub_nav &&
                                  main_cur_sub_nav.active_index,
                                is_current =
                                  main_cur_sub_nav &&
                                  vfs.utilities.url.is_current(
                                    main_cur_sub_nav.nav_data[active_index].href
                                  );

                              return {
                                is_current: is_current,
                                active_index: active_index,
                                is_article: !is_current && active_index != null
                              };
                            },
                            add_nav_item_details = {
                              home: {
                                initial_check_fn: function () {
                                  return (
                                    vfs.details.page.type.value == "home_page"
                                  );
                                },
                                check_fn: function (data) {
                                  return is_valid_show_on_prop(
                                    data,
                                    "show_on_home"
                                  );
                                },
                                set_data: function (data, cur_arr_data) {
                                  cur_arr_data = cur_arr_data || [];

                                  var cur_main_data = {
                                    side_headings: {
                                      small_heading: data.cur_sub_nav_item.html
                                    },
                                    image_style: generate.image.complete_style(
                                      data,
                                      "home"
                                    ),
                                    title: data.cur_hidden_child_nav_item.html,
                                    read_more: generate.read_more(data)
                                  };

                                  vfs.utilities.json_and_arr.set_arr_sequence_data(
                                    cur_arr_data,
                                    data.cur_hidden_child_nav_item.show_on_home,
                                    cur_main_data
                                  );

                                  return cur_arr_data;
                                }
                              },
                              featured: {
                                initial_check_fn: function (main_data) {
                                  return main_data.active_data.is_current_href;
                                },
                                check_fn: function (data) {
                                  return (
                                    data.cur_sub_nav_index == 0 ||
                                    (data.cur_sub_nav_index != 0 &&
                                      is_valid_show_on_prop(
                                        data,
                                        "show_on_featured"
                                      ))
                                  );
                                },
                                set_data: function (data, main_obj) {
                                  main_obj = main_obj || {
                                    main_page_headings: generate.main_page_headings(
                                      data
                                    ),
                                    read_more_link_html:
                                      data.nav_item.link_html,
                                    top: null,
                                    all_section_articles: {}
                                  };

                                  if (data.cur_sub_nav_index == 0) {
                                    main_obj.top = generate.image_style_short_info(
                                      data,
                                      "featured_top"
                                    );
                                    return main_obj;
                                  }

                                  var cur_data_key =
                                    data.cur_sub_nav_item.data_key,
                                    cur_section_articles =
                                      main_obj.all_section_articles[
                                      cur_data_key
                                      ] || [];

                                  vfs.utilities.json_and_arr.set_arr_sequence_data(
                                    cur_section_articles,
                                    data.cur_hidden_child_nav_item
                                      .show_on_featured,
                                    generate.image_data_short_info(data)
                                  );

                                  main_obj.all_section_articles[
                                    cur_data_key
                                  ] = cur_section_articles;

                                  return main_obj;
                                }
                              },
                              active_section: {
                                initial_check_fn: function (main_data) {
                                  var active_section_details = get_active_section_details(
                                    main_data
                                  );

                                  return (
                                    active_section_details.active_index !== 0 &&
                                    active_section_details.is_current
                                  );
                                },
                                check_fn: function (data) {
                                  return (
                                    data.cur_sub_nav_index != 0 &&
                                    data.cur_sub_nav_index ==
                                    data.cur_main_sub_nav.active_index
                                  );
                                },
                                set_data: function (data, cur_obj_data) {
                                  cur_obj_data = cur_obj_data || {
                                    main_page_headings: generate.main_page_headings(
                                      data
                                    ),
                                    read_more_link_html:
                                      data.nav_item.link_html,
                                    top: null,
                                    all_articles: []
                                  };

                                  if (
                                    data.cur_hidden_child_nav_item
                                      .show_on_section_top
                                  ) {
                                    cur_obj_data.top = generate.image_style_short_info(
                                      data,
                                      "section_top"
                                    );
                                    return cur_obj_data;
                                  }

                                  cur_obj_data.all_articles.push(
                                    generate.image_data_short_info(data)
                                  );

                                  return cur_obj_data;
                                }
                              },
                              active_article: {
                                initial_check_fn: function (main_data) {
                                  return get_active_section_details(main_data)
                                    .is_article;
                                },
                                check_fn: function (data) {
                                  return (
                                    data.hidden_child_nav_index ==
                                    data.cur_main_hidden_child_nav.active_index
                                  );
                                },
                                set_data: function (data) {
                                  return {
                                    image_caption: {
                                      image_style: generate.image.complete_style(
                                        data,
                                        "article_top"
                                      ),
                                      image_class:
                                        data.cur_hidden_child_nav_item
                                          .image_class,
                                      caption:
                                        window.master_page_data &&
                                        window.master_page_data
                                          .main_image_caption
                                    },
                                    main_page_headings: {
                                      big_heading:
                                        data.cur_hidden_child_nav_item.html,
                                      medium_heading:
                                        window.master_page_data &&
                                        window.master_page_data.main_sub_heading
                                    },
                                    read_more_link_html: data.nav_item.link_html
                                  };
                                }
                              },
                              other_posts: {
                                initial_check_fn: function (main_data) {
                                  var active_section_details = get_active_section_details(
                                    main_data
                                  );

                                  return (
                                    active_section_details.active_index !== 0 &&
                                    active_section_details.is_article
                                  );
                                },
                                check_fn: function (data) {
                                  return (
                                    data.cur_sub_nav_index ==
                                    data.cur_main_sub_nav.active_index &&
                                    data.hidden_child_nav_index !=
                                    data.cur_main_hidden_child_nav
                                      .active_index
                                  );
                                },
                                set_data: function (data, cur_arr_data) {
                                  cur_arr_data = cur_arr_data || [];

                                  cur_arr_data.push(
                                    generate.image_style_short_info(
                                      data,
                                      "other_posts"
                                    )
                                  );

                                  return cur_arr_data;
                                }
                              }
                            };

                          return function (data) {
                            var nav_item = data.nav_item,
                              sub_nav = nav_item.sub_nav.nav_data,
                              cur_sub_nav,
                              hidden_child_nav,
                              loop_callback = function (check_call_set_data) {
                                for (var key in sub_nav) {
                                  cur_sub_nav = sub_nav[key].nav_data;

                                  for (var i = 0; i < cur_sub_nav.length; i++) {
                                    hidden_child_nav =
                                      cur_sub_nav[i].hidden_child_nav.nav_data;

                                    for (
                                      var j = 0;
                                      j < hidden_child_nav.length;
                                      j++
                                    ) {
                                      check_call_set_data({
                                        nav_item: nav_item,
                                        cur_sub_nav_item: cur_sub_nav[i],
                                        cur_hidden_child_nav_item:
                                          hidden_child_nav[j],
                                        sub_nav_key: key,
                                        cur_sub_nav_index: i,
                                        hidden_child_nav_index: j,
                                        cur_main_sub_nav: sub_nav[key],
                                        cur_main_hidden_child_nav:
                                          cur_sub_nav[i].hidden_child_nav
                                      });
                                    }
                                  }
                                }
                              };

                            return loop_add_nav_item_details(
                              data,
                              add_nav_item_details,
                              loop_callback
                            );
                          };
                        })(),
                        executive_board: (function () {
                          var is_board_member_page = function (main_data) {
                            var active_data = main_data.active_data;

                            return (
                              !active_data.is_current_href &&
                              active_data.is_inner_active
                            );
                          },
                            add_nav_item_details = {
                              all_board_members: {
                                initial_check_fn: function (main_data) {
                                  return main_data.active_data.is_current_href;
                                },
                                set_data: function (data, cur_obj_data) {
                                  cur_obj_data = cur_obj_data || {
                                    content: [],
                                    read_more_link_html: data.nav_item.link_html
                                  };

                                  cur_obj_data.content.push(
                                    generate.image_data_short_info(data)
                                  );

                                  return cur_obj_data;
                                }
                              },
                              active_board_member: {
                                initial_check_fn: is_board_member_page,
                                check_fn: function (data) {
                                  return (
                                    data.hidden_child_nav_index ==
                                    data.nav_item.hidden_child_nav.active_index
                                  );
                                },
                                set_data: function (data) {
                                  var cur_html =
                                    data.cur_hidden_child_nav_item.html;

                                  return {
                                    image: generate.image.tag_data(
                                      data,
                                      cur_html
                                    ),
                                    big_sub_heading: {
                                      big_heading: cur_html,
                                      medium_heading:
                                        data.cur_hidden_child_nav_item
                                          .small_heading,
                                      class_name: "text_center_from_tablet"
                                    },
                                    main_content:
                                      master_page_data.main_page_content,
                                    read_more_link_html: data.nav_item.link_html
                                  };
                                }
                              },
                              other_board_members: {
                                initial_check_fn: is_board_member_page,
                                check_fn: function (data) {
                                  return (
                                    data.hidden_child_nav_index !=
                                    data.nav_item.hidden_child_nav.active_index
                                  );
                                },
                                set_data: function (data, cur_arr_data) {
                                  cur_arr_data = cur_arr_data || [];

                                  cur_arr_data.push(
                                    generate.image_style_short_info(data)
                                  );

                                  return cur_arr_data;
                                }
                              }
                            };

                          return function (data) {
                            var nav_item = data.nav_item,
                              hidden_child_nav =
                                nav_item.hidden_child_nav.nav_data,
                              loop_callback = function (check_call_set_data) {
                                for (
                                  var i = 0;
                                  i < hidden_child_nav.length;
                                  i++
                                ) {
                                  check_call_set_data({
                                    nav_item: nav_item,
                                    cur_hidden_child_nav_item:
                                      hidden_child_nav[i],
                                    hidden_child_nav_index: i,
                                    cur_main_hidden_child_nav:
                                      nav_item.hidden_child_nav
                                  });
                                }
                              };

                            return loop_add_nav_item_details(
                              data,
                              add_nav_item_details,
                              loop_callback
                            );
                          };
                        })(),
                        solutions: (function () {
                          var is_service_page = function (main_data) {
                            var active_data = main_data.active_data;

                            return (
                              !active_data.is_current_href &&
                              active_data.is_inner_active
                            );
                          },
                            get_heading_icon_data = function (data) {
                              var heading =
                                data.cur_hidden_child_nav_item.main_html ||
                                data.cur_hidden_child_nav_item.html;

                              return {
                                heading: heading,
                                icon:
                                  data.nav_item.icon_name_prefix +
                                  data.cur_hidden_child_nav_item.icon_name
                              };
                            },
                            set_service_box_data = function (
                              data,
                              cur_arr_data
                            ) {
                              cur_arr_data = cur_arr_data || [];

                              cur_arr_data.push(
                                $.extend(get_heading_icon_data(data), {
                                  href: data.cur_hidden_child_nav_item.href
                                })
                              );

                              return cur_arr_data;
                            },
                            add_nav_item_details = {
                              all_services: {
                                initial_check_fn: function (main_data) {
                                  return main_data.active_data.is_current_href;
                                },
                                set_data: function (data, cur_obj_data) {
                                  cur_obj_data = cur_obj_data || {
                                    content: [],
                                    read_more_link_html: data.nav_item.link_html
                                  };

                                  set_service_box_data(
                                    data,
                                    cur_obj_data.content
                                  );

                                  return cur_obj_data;
                                }
                              },
                              active_service: {
                                initial_check_fn: is_service_page,
                                check_fn: function (data) {
                                  return (
                                    data.hidden_child_nav_index ==
                                    data.nav_item.hidden_child_nav.active_index
                                  );
                                },
                                set_data: function (data) {
                                  var icon_heading = get_heading_icon_data(
                                    data
                                  ),
                                    image_style = generate.image.complete_style(
                                      data
                                    );

                                  icon_heading.icon_type = "big_circle";

                                  return {
                                    main_headings: {
                                      big_heading: icon_heading,
                                      medium_heading:
                                        window.master_page_data &&
                                        window.master_page_data.main_sub_heading
                                    },
                                    image_caption: image_style
                                      ? {
                                        image_style: image_style,
                                        caption:
                                          window.master_page_data &&
                                          window.master_page_data
                                            .main_image_caption
                                      }
                                      : null,
                                    read_more_link_html: data.nav_item.link_html
                                  };
                                }
                              },
                              other_services: {
                                initial_check_fn: is_service_page,
                                check_fn: function (data) {
                                  return (
                                    data.hidden_child_nav_index !=
                                    data.nav_item.hidden_child_nav.active_index
                                  );
                                },
                                set_data: set_service_box_data
                              }
                            };

                          return function (data) {
                            var nav_item = data.nav_item,
                              hidden_child_nav =
                                nav_item.hidden_child_nav.nav_data,
                              loop_callback = function (check_call_set_data) {
                                for (
                                  var i = 0;
                                  i < hidden_child_nav.length;
                                  i++
                                ) {
                                  check_call_set_data({
                                    nav_item: nav_item,
                                    cur_hidden_child_nav_item:
                                      hidden_child_nav[i],
                                    hidden_child_nav_index: i,
                                    cur_main_hidden_child_nav:
                                      nav_item.hidden_child_nav
                                  });
                                }
                              };

                            return loop_add_nav_item_details(
                              data,
                              add_nav_item_details,
                              loop_callback
                            );
                          };
                        })(),
                        news: (function () {
                          var get_side_image_content_main_obj = function (key) {
                            var get_image_content = function (
                              data,
                              cur_image_desc,
                              cur_title
                            ) {
                              data.image_name = cur_image_desc.image_name;

                              return {
                                image: generate.image.tag_data(
                                  data,
                                  cur_title
                                ),
                                main_content:
                                  "<p>" + cur_image_desc.desc + "</p>"
                              };
                            };

                            return {
                              initial_check_fn: function (main_data) {
                                var cur_sub_nav = main_data.nav_item.sub_nav,
                                  cur_active_sub_nav =
                                    cur_sub_nav &&
                                    cur_sub_nav.nav_data[
                                    cur_sub_nav.active_key
                                    ],
                                  active_sub_nav_item =
                                    cur_active_sub_nav &&
                                    cur_active_sub_nav.nav_data[
                                    cur_active_sub_nav.active_index
                                    ];

                                return (
                                  active_sub_nav_item &&
                                  active_sub_nav_item.content_details_key ==
                                  key
                                );
                              },
                              check_fn: function (data) {
                                return (
                                  data.cur_sub_nav_item.content_details_key ==
                                  key
                                );
                              },
                              set_data: function (data) {
                                var main_content_details =
                                  data.cur_content_details.content_details,
                                  main_data_arr = [],
                                  cur_title,
                                  cur_image_desc,
                                  cur_image_content;

                                data.images_path =
                                  data.cur_content_details.images_path;

                                for (
                                  var i = 0;
                                  i < main_content_details.length;
                                  i++
                                ) {
                                  cur_title = main_content_details[i].title;
                                  cur_image_desc =
                                    main_content_details[i].image_desc;
                                  cur_image_content = [];

                                  if ($.isArray(cur_image_desc)) {
                                    for (
                                      var j = 0;
                                      j < cur_image_desc.length;
                                      j++
                                    ) {
                                      cur_image_content.push(
                                        get_image_content(
                                          data,
                                          cur_image_desc[j],
                                          cur_title
                                        )
                                      );
                                    }
                                  } else {
                                    cur_image_content.push(
                                      get_image_content(
                                        data,
                                        cur_image_desc,
                                        cur_title
                                      )
                                    );
                                  }

                                  main_data_arr.push({
                                    heading: cur_title,
                                    image_content: cur_image_content
                                  });
                                }

                                return {
                                  main_page_headings: generate.main_page_headings(
                                    data
                                  ),
                                  show_at_start:
                                    data.cur_content_details.show_at_start,
                                  load_next:
                                    data.cur_content_details.load_next,
                                  main_content: main_data_arr
                                };
                              }
                            };
                          },
                            check_get_first_image_desc = function (
                              cur_image_desc
                            ) {
                              return $.isArray(cur_image_desc)
                                ? cur_image_desc[0]
                                : cur_image_desc;
                            },
                            add_nav_item_details = {
                              home: (function () {
                                var get_side_image_content_fn = (function () {
                                  var create_main_data_arr_el_fn = function (
                                    element,
                                    index,
                                    param
                                  ) {
                                    var data = param.data,
                                      main_data = {
                                        side_headings: {
                                          small_dim_heading: element.date,
                                          small_heading:
                                            data.cur_sub_nav_item.html
                                        },
                                        title: element.title,
                                        read_more: {
                                          href: param.read_more_href
                                        }
                                      };

                                    if (
                                      element.show_image_on_home !== false
                                    ) {
                                      data.image_name = check_get_first_image_desc(
                                        element.image_desc
                                      ).image_name;
                                      data.image_style = element.image_style;

                                      main_data.image_style = generate.image.complete_style(
                                        data,
                                        "home"
                                      );
                                    }

                                    return main_data;
                                  };

                                  return function (read_more_href) {
                                    return function (data, main_data_arr) {
                                      var main_content_details =
                                        data.cur_content_details
                                          .content_details;

                                      data.images_path =
                                        data.cur_content_details.images_path;
                                      data.resolution_folder_names =
                                        data.cur_content_details.resolution_folder_names;

                                      vfs.utilities.json_and_arr.create_sequenced_arr(
                                        main_content_details,
                                        "show_on_home",
                                        {
                                          dest_arr: main_data_arr,
                                          create_dest_arr_el_fn: create_main_data_arr_el_fn,
                                          create_dest_arr_el_fn_param: {
                                            data: data,
                                            read_more_href: read_more_href
                                          }
                                        }
                                      );

                                      return main_data_arr;
                                    };
                                  };
                                })(),
                                  all_key_set_fn = {
                                    events: get_side_image_content_fn(
                                      "events.html"
                                    ),
                                    awards: (function () {
                                      var create_main_data_arr_el_fn = function (
                                        element,
                                        index,
                                        data
                                      ) {
                                        return {
                                          side_headings: {
                                            small_dim_heading: element.date,
                                            small_heading:
                                              data.cur_sub_nav_item.html
                                          },
                                          title: element.title,
                                          read_more: {
                                            href: "awards.html"
                                          }
                                        };
                                      };

                                      return function (data, main_data_arr) {
                                        var main_content_details =
                                          data.cur_content_details
                                            .content_details,
                                          cur_year_content_details;

                                        for (
                                          var i = 0;
                                          i < main_content_details.length;
                                          i++
                                        ) {
                                          cur_year_content_details =
                                            main_content_details[i].content;

                                          vfs.utilities.json_and_arr.create_sequenced_arr(
                                            cur_year_content_details,
                                            "show_on_home",
                                            {
                                              dest_arr: main_data_arr,
                                              create_dest_arr_el_fn: create_main_data_arr_el_fn,
                                              create_dest_arr_el_fn_param: data
                                            }
                                          );
                                        }

                                        return main_data_arr;
                                      };
                                    })(),
                                    csr: get_side_image_content_fn(
                                      "news-corporate-social-responsibility.html"
                                    )
                                  };

                                return {
                                  initial_check_fn: function () {
                                    return (
                                      vfs.details.page.type.value == "home_page"
                                    );
                                  },
                                  check_fn: function (data) {
                                    return Boolean(
                                      all_key_set_fn[
                                      data.cur_sub_nav_item
                                        .content_details_key
                                      ]
                                    );
                                  },
                                  set_data: function (data, cur_main_data) {
                                    cur_main_data = cur_main_data || [];

                                    all_key_set_fn[
                                      data.cur_sub_nav_item.content_details_key
                                    ](data, cur_main_data);

                                    return cur_main_data;
                                  }
                                };
                              })(),
                              latest: {
                                initial_check_fn: function (main_data) {
                                  return main_data.active_data.is_current_href;
                                },
                                check_fn: function (data) {
                                  return Boolean(data.cur_content_details);
                                },
                                set_data: (function () {
                                  var generate_side_image_content_list = function (
                                    data
                                  ) {
                                    var main_content_details =
                                      data.cur_content_details
                                        .content_details,
                                      main_data,
                                      cur_title,
                                      cur_image_desc;

                                    data.images_path =
                                      data.cur_content_details.images_path;

                                    for (
                                      var i = 0;
                                      i < main_content_details.length;
                                      i++
                                    ) {
                                      if (
                                        !main_content_details[i]
                                          .show_on_latest
                                      )
                                        continue;

                                      cur_title =
                                        main_content_details[i].title;
                                      cur_image_desc = check_get_first_image_desc(
                                        main_content_details[i].image_desc
                                      );
                                      data.image_name =
                                        cur_image_desc.image_name;

                                      main_data = {
                                        image: generate.image.tag_data(
                                          data,
                                          cur_title
                                        ),
                                        medium_heading: cur_title,
                                        main_content:
                                          "<p>" + cur_image_desc.desc + "</p>"
                                      };

                                      break;
                                    }

                                    return main_data;
                                  },
                                    all_key_set_fn = {
                                      media_releases: (function () {
                                        var create_year_content_el_fn = function (
                                          element,
                                          index,
                                          param
                                        ) {
                                          return {
                                            html: element.html,
                                            href:
                                              vfs.utilities.string.check_add_slash(
                                                param.data.cur_content_details
                                                  .base_pdf_path
                                              ) +
                                              param.cur_main_content_details
                                                .year +
                                              "/" +
                                              element.pdf,
                                            target: "_blank"
                                          };
                                        };

                                        return function (data) {
                                          var main_content_details =
                                            data.cur_content_details
                                              .content_details,
                                            main_data_arr = [],
                                            cur_year_content_details,
                                            cur_year_contents;

                                          for (
                                            var i = 0;
                                            i < main_content_details.length;
                                            i++
                                          ) {
                                            cur_year_content_details =
                                              main_content_details[i].content;

                                            cur_year_contents = vfs.utilities.json_and_arr.create_sequenced_arr(
                                              cur_year_content_details,
                                              "show_on_latest",
                                              {
                                                create_dest_arr_el_fn: create_year_content_el_fn,
                                                create_dest_arr_el_fn_param: {
                                                  data: data,
                                                  cur_main_content_details:
                                                    main_content_details[i]
                                                }
                                              }
                                            );

                                            if (cur_year_contents.length) {
                                              main_data_arr.push({
                                                heading:
                                                  main_content_details[i].year,
                                                links: cur_year_contents
                                              });
                                            }
                                          }

                                          return main_data_arr;
                                        };
                                      })(),
                                      news_coverage: (function () {
                                        var create_main_data_el_fn = function (
                                          element
                                        ) {
                                          return {
                                            side_headings: {
                                              small_dim_heading: element.date,
                                              small_heading: element.source
                                            },
                                            title: element.title,
                                            read_more: {
                                              href: element.link,
                                              target: "_blank"
                                            }
                                          };
                                        };

                                        return function (data) {
                                          var main_content_details =
                                            data.cur_content_details
                                              .content_details,
                                            main_data_arr = [],
                                            cur_year_content_details;

                                          for (
                                            var i = 0;
                                            i < main_content_details.length;
                                            i++
                                          ) {
                                            cur_year_content_details =
                                              main_content_details[i].content;

                                            vfs.utilities.json_and_arr.create_sequenced_arr(
                                              cur_year_content_details,
                                              "show_on_latest",
                                              {
                                                dest_arr: main_data_arr,
                                                create_dest_arr_el_fn: create_main_data_el_fn
                                              }
                                            );
                                          }

                                          return {
                                            read_more_link_html:
                                              data.cur_content_details
                                                .link_html,
                                            content: main_data_arr
                                          };
                                        };
                                      })(),
                                      events: generate_side_image_content_list,
                                      awards: (function () {
                                        var create_main_data_el_fn = function (
                                          element
                                        ) {
                                          return {
                                            small_heading: element.date,
                                            medium_heading: element.title,
                                            type: "medium_no_dim"
                                          };
                                        };

                                        return function (data) {
                                          var main_content_details =
                                            data.cur_content_details
                                              .content_details,
                                            main_data_arr = [],
                                            cur_year_content_details;

                                          for (
                                            var i = 0;
                                            i < main_content_details.length;
                                            i++
                                          ) {
                                            cur_year_content_details =
                                              main_content_details[i].content;

                                            vfs.utilities.json_and_arr.create_sequenced_arr(
                                              cur_year_content_details,
                                              "show_on_latest",
                                              {
                                                dest_arr: main_data_arr,
                                                create_dest_arr_el_fn: create_main_data_el_fn
                                              }
                                            );
                                          }

                                          return main_data_arr;
                                        };
                                      })(),
                                      csr: generate_side_image_content_list
                                    };

                                  return function (data, cur_main_data) {
                                    cur_main_data = cur_main_data || {
                                      main_page_headings: generate.main_page_headings(
                                        data
                                      )
                                    };

                                    var cur_content_details_key =
                                      data.cur_sub_nav_item.content_details_key;

                                    cur_main_data[
                                      cur_content_details_key
                                    ] = all_key_set_fn[cur_content_details_key](
                                      data
                                    );

                                    return cur_main_data;
                                  };
                                })()
                              },
                              media: {
                                initial_check_fn: function (main_data) {
                                  var cur_sub_nav = main_data.nav_item.sub_nav,
                                    cur_active_sub_nav =
                                      cur_sub_nav &&
                                      cur_sub_nav.nav_data[
                                      cur_sub_nav.active_key
                                      ],
                                    active_sub_nav_item =
                                      cur_active_sub_nav &&
                                      cur_active_sub_nav.nav_data[
                                      cur_active_sub_nav.active_index
                                      ];

                                  return (
                                    (active_sub_nav_item &&
                                      active_sub_nav_item.content_details_key ==
                                      "media_releases") ||
                                    vfs.utilities.url.is_current(
                                      main_data.nav_item
                                        .individuals_media_release_href
                                    )
                                  );
                                },
                                check_fn: function (data) {
                                  return (
                                    data.cur_sub_nav_item.content_details_key ==
                                    "media_releases"
                                  );
                                },
                                set_data: function (data) {
                                  var main_content_details =
                                    data.cur_content_details.content_details,
                                    main_data_arr = [],
                                    cur_year_content_details,
                                    cur_year_contents;

                                  for (
                                    var i = 0;
                                    i < main_content_details.length;
                                    i++
                                  ) {
                                    cur_year_content_details =
                                      main_content_details[i].content;

                                    cur_year_contents = [];

                                    for (
                                      var j = 0;
                                      j < cur_year_content_details.length;
                                      j++
                                    ) {
                                      cur_year_contents.push({
                                        html: cur_year_content_details[j].html,
                                        href:
                                          vfs.utilities.string.check_add_slash(
                                            data.cur_content_details
                                              .base_pdf_path
                                          ) +
                                          main_content_details[i].year +
                                          "/" +
                                          cur_year_content_details[j].pdf,
                                        target: "_blank"
                                      });
                                    }

                                    main_data_arr.push({
                                      heading: main_content_details[i].year,
                                      links: cur_year_contents
                                    });
                                  }

                                  return {
                                    main_page_headings: generate.main_page_headings(
                                      data
                                    ),
                                    show_at_start:
                                      data.cur_content_details.show_at_start,
                                    main_content: main_data_arr
                                  };
                                }
                              },
                              coverage: {
                                initial_check_fn: function (main_data) {
                                  var cur_sub_nav = main_data.nav_item.sub_nav,
                                    cur_active_sub_nav =
                                      cur_sub_nav &&
                                      cur_sub_nav.nav_data[
                                      cur_sub_nav.active_key
                                      ],
                                    active_sub_nav_item =
                                      cur_active_sub_nav &&
                                      cur_active_sub_nav.nav_data[
                                      cur_active_sub_nav.active_index
                                      ];

                                  return (
                                    active_sub_nav_item &&
                                    active_sub_nav_item.content_details_key ==
                                    "news_coverage"
                                  );
                                },
                                check_fn: function (data) {
                                  return (
                                    data.cur_sub_nav_item.content_details_key ==
                                    "news_coverage"
                                  );
                                },
                                set_data: function (data) {
                                  var main_content_details =
                                    data.cur_content_details.content_details,
                                    main_data_arr = [],
                                    cur_year_content_details,
                                    cur_year_contents;

                                  for (
                                    var i = 0;
                                    i < main_content_details.length;
                                    i++
                                  ) {
                                    cur_year_content_details =
                                      main_content_details[i].content;

                                    cur_year_contents = [];

                                    for (
                                      var j = 0;
                                      j < cur_year_content_details.length;
                                      j++
                                    ) {
                                      cur_year_contents.push({
                                        side_headings: {
                                          small_dim_heading:
                                            cur_year_content_details[j].date,
                                          small_heading:
                                            cur_year_content_details[j].source
                                        },
                                        title:
                                          cur_year_content_details[j].title,
                                        read_more: {
                                          href:
                                            cur_year_content_details[j].link,
                                          target: "_blank"
                                        }
                                      });
                                    }

                                    main_data_arr.push({
                                      heading: main_content_details[i].year,
                                      year_contents: cur_year_contents
                                    });
                                  }

                                  return {
                                    main_page_headings: generate.main_page_headings(
                                      data
                                    ),
                                    show_at_start:
                                      data.cur_content_details.show_at_start,
                                    read_more_link_html:
                                      data.cur_content_details.link_html,
                                    all_contents: main_data_arr
                                  };
                                }
                              },
                              events: get_side_image_content_main_obj("events"),
                              awards: {
                                initial_check_fn: function (main_data) {
                                  var cur_sub_nav = main_data.nav_item.sub_nav,
                                    cur_active_sub_nav =
                                      cur_sub_nav &&
                                      cur_sub_nav.nav_data[
                                      cur_sub_nav.active_key
                                      ],
                                    active_sub_nav_item =
                                      cur_active_sub_nav &&
                                      cur_active_sub_nav.nav_data[
                                      cur_active_sub_nav.active_index
                                      ];

                                  return (
                                    active_sub_nav_item &&
                                    active_sub_nav_item.content_details_key ==
                                    "awards"
                                  );
                                },
                                check_fn: function (data) {
                                  return (
                                    data.cur_sub_nav_item.content_details_key ==
                                    "awards"
                                  );
                                },
                                set_data: function (data) {
                                  var main_content_details =
                                    data.cur_content_details.content_details,
                                    main_data_arr = [],
                                    cur_year_content_details,
                                    cur_year_contents;

                                  for (
                                    var i = 0;
                                    i < main_content_details.length;
                                    i++
                                  ) {
                                    cur_year_content_details =
                                      main_content_details[i].content;

                                    cur_year_contents = [];

                                    for (
                                      var j = 0;
                                      j < cur_year_content_details.length;
                                      j++
                                    ) {
                                      cur_year_contents.push({
                                        heading: {
                                          medium_heading:
                                            cur_year_content_details[j].title,
                                          small_heading:
                                            cur_year_content_details[j].date
                                        },
                                        main_content:
                                          "<p>" +
                                          cur_year_content_details[j].desc +
                                          "</p>"
                                      });
                                    }

                                    main_data_arr.push({
                                      heading: main_content_details[i].year,
                                      year_contents: cur_year_contents
                                    });
                                  }

                                  return {
                                    main_page_headings: generate.main_page_headings(
                                      data
                                    ),
                                    show_at_start:
                                      data.cur_content_details.show_at_start,
                                    all_contents: main_data_arr
                                  };
                                }
                              },
                              csr: get_side_image_content_main_obj("csr")
                            };

                          return function (data) {
                            var nav_item = data.nav_item,
                              sub_nav = nav_item.sub_nav.nav_data,
                              cur_sub_nav,
                              loop_callback = function (check_call_set_data) {
                                for (var key in sub_nav) {
                                  cur_sub_nav = sub_nav[key].nav_data;

                                  for (var i = 0; i < cur_sub_nav.length; i++) {
                                    check_call_set_data({
                                      nav_item: nav_item,
                                      cur_sub_nav_item: cur_sub_nav[i],
                                      sub_nav_key: key,
                                      cur_sub_nav_index: i,
                                      cur_main_sub_nav: sub_nav[key],
                                      cur_content_details:
                                        vfs.data.all_content_details[
                                        cur_sub_nav[i].content_details_key
                                        ]
                                    });
                                  }
                                }
                              };

                            return loop_add_nav_item_details(
                              data,
                              add_nav_item_details,
                              loop_callback
                            );
                          };
                        })()
                      },
                      do_process_cur_nav_item = function (e) {
                        if (e.active_data.is_active) {
                          return true;
                        } else {
                          var show_data_in_other_pages =
                            e.nav_item.show_data_in_other_pages;

                          for (
                            var i = 0;
                            show_data_in_other_pages &&
                            i < show_data_in_other_pages.length;
                            i++
                          ) {
                            if (
                              vfs.utilities.url.is_current(
                                show_data_in_other_pages[i]
                              )
                            )
                              return true;
                          }

                          return false;
                        }
                      };

                    return function (e) {
                      var cur_data_details;

                      for (var data_key in all_additional_data_details) {
                        cur_data_details =
                          all_additional_data_details[data_key];

                        if (
                          e.nav_item.id == data_key &&
                          !cur_data_details.is_data_setted &&
                          do_process_cur_nav_item(e)
                        ) {
                          main_data[data_key] = cur_data_details(e);
                          cur_data_details.is_data_setted = true;
                        }
                      }
                    };
                  })();

                return function () {
                  set_section_index();
                  navigation_related_data.on_set_nav_arr_data_item.add(
                    set_additional_data_from_navigation
                  );
                  navigation_related_data.set();
                };
              })();

            return function () {
              main_data = {};

              copy_data();

              set_calculated_additional_data();

              return main_data;
            };
          })(),
          loop_all_events = function (event_name, event_fn, obj, options) {
            options[event_name] = event_fn;
          };

        return function () {
          config = vfs.data.vue_app_config;

          all_plugins.init_and_use();

          var data = generate_data();

          init_directives();

          init_global_components();

          var options = {
            el: config.app_selector,
            data: data,
            mixins: config.app_mixins
          };

          all_events.loop(loop_all_events, options);

          window.vue_app = new Vue(options);
        };
      })(),
      all_plugins = vfs.create_blank_object({
        init_and_use: (function () {
          var generate_prototype_fn = function (key, fn) {
            return function () {
              Vue.prototype['$' + key] = fn;
            };
          },

            all_plugin_details = {
              import_data: (function () {
                var loop_each_import_key = (function () {
                  var import_main_keys = ["root", "parent"];

                  return function (fn, fn_data) {
                    for (var i = 0; i < import_main_keys.length; i++) {
                      fn({
                        key: import_main_keys[i],
                        option_key: "import_from_" + import_main_keys[i],
                        data: fn_data
                      });
                    }
                  };
                })(),
                  set_merge_strategy = (function () {
                    var merge_strategy = function (generated_val, new_val) {
                      if (!new_val) return generated_val;
                      else if (!generated_val) return [new_val];
                      else return generated_val.concat([new_val]);
                    },
                      loop_import_key_fn = function (obj) {
                        obj.data[obj.option_key] = merge_strategy;
                      };

                    return function (Vue) {
                      loop_each_import_key(
                        loop_import_key_fn,
                        Vue.config.optionMergeStrategies
                      );
                    };
                  })(),
                  main_imort_fn = (function () {
                    var get_computed_obj = (function () {
                      var get_fn = function (
                        vue_obj,
                        import_from,
                        data_key,
                        level
                      ) {
                        var import_key = "$" + import_from;

                        level = level || 1;

                        for (var i = 1; i <= level; i++)
                          vue_obj = vue_obj[import_key];

                        return function () {
                          return vue_obj[data_key];
                        };
                      };

                      return function (vue_obj, import_data_keys, import_from) {
                        var computed = {};

                        if ($.isArray(import_data_keys)) {
                          for (var i = 0; i < import_data_keys.length; i++)
                            computed[import_data_keys[i]] = get_fn(
                              vue_obj,
                              import_from,
                              import_data_keys[i]
                            );
                        } else {
                          for (var data_key in import_data_keys)
                            computed[data_key] = get_fn(
                              vue_obj,
                              import_from,
                              data_key,
                              import_data_keys[data_key]
                            );
                        }

                        return computed;
                      };
                    })(),
                      loop_import_key_fn = function (obj) {
                        var cur_import_data_keys,
                          data = obj.data;

                        cur_import_data_keys =
                          data.vue_component.$options[obj.option_key];

                        if (!cur_import_data_keys) return;

                        for (var i = 0; i < cur_import_data_keys.length; i++) {
                          $.extend(
                            data.computed,
                            get_computed_obj(
                              data.vue_component,
                              cur_import_data_keys[i],
                              obj.key
                            )
                          );
                        }
                      };

                    return function () {
                      var computed = {};

                      loop_each_import_key(loop_import_key_fn, {
                        vue_component: this,
                        computed: computed
                      });

                      this.$options.computed = this.$options.computed || {};

                      $.extend(this.$options.computed, computed);
                    };
                  })();

                return function (Vue) {
                  set_merge_strategy(Vue);

                  Vue.mixin({
                    beforeCreate: main_imort_fn
                  });
                };
              })(),
              outside_events: {
                install: function (Vue) {
                  var _this = this;

                  Vue.config.optionMergeStrategies.outside_events =
                    Vue.config.optionMergeStrategies.watch;

                  _this.components_used = [];

                  Vue.mixin({
                    beforeCreate: function () {
                      if (this.$options.outside_events)
                        _this.components_used.push(this);
                    }
                  });
                },
                add: function (component, obj) {
                  if ($.inArray(component, this.components_used) == -1)
                    this.components_used.push(component);

                  var options = component.$options;

                  options.outside_events = Vue.config.optionMergeStrategies.outside_events(
                    options.outside_events,
                    obj
                  );
                },
                emit: function (event_name) {
                  var fn;

                  for (var i = 0; i < this.components_used.length; i++) {
                    fn = this.components_used[i].$options.outside_events[
                      event_name
                    ];

                    if (!fn) continue;

                    if (typeof fn == "function") {
                      fn.call(this.components_used[i]);
                    } else {
                      for (var j = 0; j < fn.length; j++)
                        fn[j].call(this.components_used[i]);
                    }
                  }
                }
              },
              get_text_from_html: generate_prototype_fn('get_text_from_html', function () {
                return vfs.utilities.string.get_text_from_html.apply(this, arguments);
              }),
              get_slot_content: generate_prototype_fn('get_slot_content', function (component, slot_name, data) {
                var scoped_slot = component.$scopedSlots[slot_name],
                  non_scoped_slot = component.$slots[slot_name];

                return scoped_slot ? scoped_slot(data) : non_scoped_slot;
              }),
              //class will be added and after animation end class will be removed
              add_and_remove_animation_class: generate_prototype_fn('add_and_remove_animation_class', function ($el, class_name) {
                if ($el.hasClass(class_name)) return;

                $el.addClass(class_name);

                vfs.utilities.set_animsition_one_time_event.animation_end($el, function () {
                  $el.removeClass(class_name);
                });
              })
            };

          return function () {
            vfs.utilities.json_and_arr.copy_keys(this, all_plugin_details);

            for (var key in all_plugin_details)
              Vue.use(all_plugin_details[key]);
          };
        })()
      }),
      all_events = vfs.create_blank_object({
        init: (function () {
          var events = ["created", "mounted"],
            get_event_fn = function (event_name) {
              var module_callback = new vfs.prototypes.callback();

              _module["on_" + event_name] = module_callback;

              return function () {
                module_callback._call({}, this);
              };
            };

          return function () {
            for (var i = 0; i < events.length; i++)
              this[events[i]] = get_event_fn(events[i]);
          };
        })()
      }),
      window_loaded = function () {
        all_plugins.outside_events.emit("loaded");
      },
      window_resized = function () {
        all_plugins.outside_events.emit("resized");
      },
      _module = {
        init: init,
        window_loaded: window_loaded,
        window_resized: window_resized
      };

    all_events.init();

    return _module;
  })();
})(jQuery);