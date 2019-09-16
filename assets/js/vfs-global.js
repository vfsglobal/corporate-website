(function ($) {

	'use strict';

	/*Note: all the properties started with _ means the property is read only outside the module
	Also you can test any module function in console only*/

	//all the modules and configuration given in config.js will be stored here
	var vfs = {};

	//this is exported in window, so that developer can see all the modules and sub modules in console only
	window.vfs = vfs;

	//this function is used to create a blank object which has functions in prototype which will be set from passed prototype object
	//the blank object also has an extra loop function to loop for keys of that object only. (not keys of prototype)
	//e.g. see vfs.global_variables in console
	vfs.create_blank_object = function (prototype) {
		var data = function () { }, //new blank class

			get_calling_fn = function (key) {
				return function () {
					//main_data is an instance of a blank class data
					prototype[key].apply(main_data, Array.prototype.slice.call(arguments));
				};
			};

		for (var key in prototype)
			data.prototype[key] = get_calling_fn(key); //sets new function which when called then main prototype function will be called

		//sets loop function in prototype of data
		data.prototype.loop = function (fn, extra_param) {
			var return_val;

			for (var key in main_data) {
				if (!main_data.hasOwnProperty(key))
					continue;

				return_val = fn(key, main_data[key], main_data, extra_param);

				//if loop callback returns some value then it will break for loop and return return_val to loop function caller.
				if (return_val !== undefined)
					return return_val;
			}
		};

		var main_data = new data() //created instance of blank class;

		//returns instance of blank class
		return main_data;
	};

	//this global variables stores all the variables which will be used in all the other modules.
	//this module has all the jquery object (like $window, $body, $head, etc.) which will be used in other modules, so that no need to create same jquery object multiple times which reduce processing time
	vfs.global_variables = vfs.create_blank_object({
		set: (function () {
			var element_details = {
				window: window,
				document: document,
				html: 'html',
				body: 'body',
				html_body: 'html, body',
				head: 'head'
			};

			return function () {
				//creates jquery object according to details provided in param_details and sets all that jquery object to 'this' object
				vfs.utilities.jQuery.create_elements(element_details, this);
			};
		})()
	});

	//it has all the class whose instances are created and used in other modules
	//since it is es5 we have not used class keyword
	vfs.prototypes = {
		//if any module want to implement callback, it can create instance of callback and export that to their module.
		/*basic example is,
			vfs.details.window_dimension want changed_callbacks to implement
			
			so in window_dimension module
			_module = {
				changed_callbacks: new vfs.prototypes.callback()
			}
			return _module;

			after creating and exporting, module can now emit callback whenever it wants to by calling ._call function
			_module.changed_callbacks._call({
				... //event data to pass
			})

			now in other parts of script, it can use like add/remove callback
			var window_resized = function(e) {
				... //this function will be called when module will emit callback
			};

			vfs.details.window_dimension.changed_callbacks.add(window_resized);
			we can also remove like
			vfs.details.window_dimension.changed_callbacks.remove(window_resized);

			see comments above each function to know detail about that
		*/
		callback: (function () {
			/* options is an optional
			properties of options are {
				on_add: function //this will be called when any other part of script adds callback
				call_condition: function //when module emits callback; this will be called for each callback to check whether to call it or not
				set_one_time: boolean //if set_one_time is true then callback will be called for only once and then remove it
			} */
			var main_callback = function (options) {
				options = options || {};

				//all the added callbacks will be stored in this array
				this._callbacks = [];

				this._on_add = options.on_add;
				this._call_condition = options.call_condition;
				this._set_one_time = options.set_one_time;
			};

			//these are the constants which are used to store/return/compare status
			main_callback.constants = {
				do_add: 0, //do_add status tells 'add' function that push the passed callback in callbacks array
				do_call: 1, //do_call status tells 'add' function that only call the passed callback immediately and dont push that callback in callbacks array
				do_both: 2 //do_both status tells 'add' function that call the passed callback immediately and also push that callback in callbacks array
			};

			//this function is used to add callback
			/*parameter is callback of type function, options of type object which is optional.
			properties of options are {
				name: string, //used for reference to remove callback in future
				is_one_time: boolean, // if passed true then callback will be called only once
				data: any //which will be passed to callback as 2nd argument when called
			}*/
			main_callback.prototype.add = function (callback, options) {
				var on_add_return_val,
					callback_called = false;

				options = options || {};

				//if has on_add then calls on_add callback
				if (this._on_add)
					on_add_return_val = this._on_add(options);

				//if on_add callback returns do_call/do_both status then it will call the callback immediately by passing this object from on_add return value, event object also from on_add return value, and data object from options
				if (on_add_return_val != undefined &&
					(on_add_return_val.status == main_callback.constants.do_call ||
						on_add_return_val.status == main_callback.constants.do_both)) {
					callback.call(on_add_return_val.this_param, on_add_return_val.event_obj, options.data);
					callback_called = true;
				}

				//if set_one_time is true then this callback is made for one time only
				if (this._set_one_time) {
					if (callback_called)
						return;
					else
						options.is_one_time = true;
				}

				//if on_add callback returns do_add/do_both status then it will add callback and it's option to _callbacks
				if (on_add_return_val == undefined ||
					on_add_return_val.status == main_callback.constants.do_add ||
					on_add_return_val.status == main_callback.constants.do_both) {
					this._callbacks.push($.extend({
						fn: callback
					}, options));
				}
			};

			//this function is used to remove callback also used to clear all the callbacks
			//callback is optional
			main_callback.prototype.remove = function (callback) {
				//if callback is not provided then it will clear callbacks
				if (callback == undefined) {
					this._callbacks.splice(0, this._callbacks.length);
				} else {
					//indexes of all the callbacks that needs to remove are stored here
					var remove_indexes = [];

					for (var i = 0; i < this._callbacks.length; i++) {
						//if callback is string and matches with current callback's name then it will push index
						//otherwise if callback is function and matches with current callback's function then it will push index
						if ((typeof callback == 'string' &&
							this._callbacks[i].name === callback) ||
							(typeof callback == 'function' &&
								this._callbacks[i].fn === callback)) {
							remove_indexes.push(i);
						}
					}

					//remove callbacks from this._callbacks array by passing array of indexes that needs to remove
					vfs.utilities.json_and_arr.remove_indexes_from_arr(this._callbacks, remove_indexes);
				}
			};

			//this function is used to emit the callback. That means all the added callback will be called
			/*parameters are (all are otional)
				event_obj - if you pass any other parameter then you need to pass it also, it is event object that will be passed to added callback functions
				this_param - it is the object that will be passed to added callback to 'this' value; if this_param is not passed then window will be used as this_param
				prevent_condition_check - it passed true then condition (which was stored in constructor) will not be called before calling added callback
			*/
			main_callback.prototype._call = function (event_obj, this_param, prevent_condition_check) {
				//correcting optional parameters
				if (typeof this_param == 'boolean') {
					prevent_condition_check = this_param;
					this_param = undefined;
				}

				event_obj = event_obj || {};
				this_param = this_param || window;

				event_obj.preventDefault = false;

				var callback_return_val,
					do_call_callback,
					remove_indexes = [];

				for (var i = 0; i < this._callbacks.length; i++) {
					callback_return_val = null;
					do_call_callback = null;

					//if prevent_condition_check is not provided as true and has call_condition then call_condition will be called
					if (prevent_condition_check !== true && this._call_condition != undefined)
						do_call_callback = this._call_condition(this._callbacks[i], i, event_obj);

					//if call_condition returns false then will not call current callback
					if (do_call_callback !== false) {
						callback_return_val = this._callbacks[i].fn.call(this_param, event_obj, this._callbacks[i].data);

						if (this._callbacks[i].is_one_time)
							remove_indexes.push(i);

						/*if callback returns false then preventDefault will be set to true and will not call any other callback; 
						
						also that module who has initiated main_callback prototype (by new vfs.prototypes.callback(...)), that module can check preventDefault value and can write the code to prevent the further action
						this is usefull in before action callback e.g. before_animate callback; if callback returns false then module can prevent animation*/
						if (callback_return_val === false) {
							event_obj.preventDefault = true;
							break;
						}
					}
				}

				//remove callbacks from this._callbacks array by passing array of indexes that needs to remove
				vfs.utilities.json_and_arr.remove_indexes_from_arr(this._callbacks, remove_indexes);

				return event_obj;
			};

			//returns main_callback class
			return main_callback;
		})(),

		//if any object want watchable property then it can use it, see below example
		/*e.g.
		var person = {
			name: new vfs.prototypes.property('name', function(val) {
				return val
			}, null),
			address: '...'
		}

		Note: person.name is not an ordinary proerty; 
			if you want get value you need to write person.name.value;
			if you want to change value you need to use set function like person.name.set('test')
		
		now in future, any part of code can add changed callback to name
		person.name.changed_callbacks.add(function(e) {
			console.log(e.old_value, e.new_value, e.property);
			e.property is a current property object
			//...
		});
		*/
		property: (function () {
			//name and set_fn is compulsory
			/*name - name of the property
			set_fn - set function of the proerty; should return value to set
			value - value to set at initial*/
			var main_property = function (name, set_fn, value) {
				this.name = name;

				this._set_fn = set_fn;

				this.value = value;

				this.changed_callbacks = new vfs.prototypes.callback();
			};

			main_property.prototype.set = function (data) {
				//store old value
				var old_value = this.value;

				//will call the set_fn function (which was passed in constructor) and return value will be set to 'value' property
				this.value = this._set_fn(data);

				//check if old value and new value is not equal then only emit the changed_callbacks
				if (!(typeof this.value == 'object' ?
					vfs.utilities.json_and_arr.is_equal(old_value, this.value) :
					(old_value == this.value))) {
					this.changed_callbacks._call({
						old_value: old_value,
						new_value: this.value,
						property: this
					});
				}
			};

			//returns main_property class
			return main_property;
		})()
	};

	//this module stores the details about many sections which can be used in other parts of script
	vfs.details = {
		//this has details about page
		page: (function () {
			var _module = {
				//html page name like index.html, about.html, events.html, etc.
				name: new vfs.prototypes.property('name', function () {
					return vfs.utilities.url.get_page_name(document.URL);
				}),

				//page type like home_page (if page name is index.html) or other_page (if page is not index.html)
				type: new vfs.prototypes.property('type', function () {
					if (_module.name.value.match(/^index.html$/i) !== null)
						return 'home_page';
					else
						return 'other_page';
				}),

				//index of active section like 0 if 'Individuals' section is active and 1 if 'Governments' section is active
				//if index is not passed then it will take index from url parameter (parameter name is given in config.js)
				section_index: new vfs.prototypes.property('section', function (index) {
					return index == null ? vfs.utilities.url.params.get(document.URL)[vfs.data.section_query_param_name] : index;
				}),

				//hash value from document url
				hash: new vfs.prototypes.property('hash', function () {
					return vfs.utilities.url.hash.get(document.URL);
				})
			},

				//set all the property object value in the module
				set = function () {
					for (var key in _module) {
						if (_module[key] instanceof vfs.prototypes.property)
							_module[key].set();
					}
				};

			_module.set = set;

			return _module;
		})(),
		/*this has details of window dimension like width and height of window.
		It also has change callback which will be called if window dimension is changed
		Note: We didn't use window.onresize or $(window).resize because it was triggering 2 times on minimize (restore down) and maximize in older IE browser
		It has $(window).resize but when it triggers it checks if value is changed then only emits the change callback*/
		window_dimension: (function () {
			var init = function () {
				_module.changed_callbacks = new vfs.prototypes.callback();

				set();

				vfs.global_variables.$window.resize(window_resized);
			},

				set = function () {
					//below two variables holds current width and height value to match with new values later
					var width = _module.width,
						height = _module.height;

					if (vfs.details.browser.name == 'Safari') {
						_module.width = vfs.global_variables.$html.width();
						_module.height = vfs.global_variables.$html.height();
					} else {
						_module.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
						_module.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
					}

					//returs true if any of width or height changes else returns false
					return _module.width !== width || _module.height !== height;
				},

				window_resized = function () {
					//if width/height changed then emit callback
					if (set())
						_module.changed_callbacks._call(_module);
				},

				_module = {
					init: init
				};

			return _module;
		})(),
		//this has very few details of browser
		browser: (function () {
			var name = null,
				version = null,
				support_transitions = (function () {
					var b = document.body || document.documentElement,
						s = b.style,
						p = 'transition';

					if (typeof s[p] === 'string') {
						return true;
					}

					// Tests for vendor specific prop
					var v = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
					p = p.charAt(0).toUpperCase() + p.substr(1);

					for (var i = 0; i < v.length; i++) {
						if (typeof s[v[i] + p] === 'string') {
							return true;
						}
					}

					return false;
				})(),
				appVersion = navigator.appVersion,
				MSIEIndex = appVersion.indexOf("MSIE"),
				support_canvas = (function () {
					var elem = document.createElement('canvas');
					return !!(elem.getContext && elem.getContext('2d'));
				})(),
				support_placeholder = (function () {
					var i = document.createElement('input');
					return 'placeholder' in i;
				})();

			if (MSIEIndex !== -1) {
				name = 'IE';
				version = parseInt($.trim(appVersion.substring(MSIEIndex + "MSIE".length, appVersion.indexOf(".", MSIEIndex))));
			}

			if (name === null && /constructor/i.test(window.HTMLElement)) {
				name = 'Safari';
			}

			return {
				name: name, //browser name will be null if browser is not IE or Safari
				version: version, //version will be store for only IE browser except IE 11; and null for other browsers
				support_transitions: support_transitions, //boolean which tells browser supports transition or not
				support_canvas: support_canvas, //boolean which tells browser supports canvas or not
				support_placeholder: support_placeholder //boolean which tells browser supports placeholder or not
			};
		})()
	};

	//This module has all service functions that we need in all other modules. it is the biggest module of all
	//you can see complete list of submodules of utilities in console by typing vfs.utilities
	vfs.utilities = {
		//this sub module has all the operations related to url
		url: {
			//default page name of website
			default_page: 'index.html',
			//it will get the name of page from url string e.g. if url is https://www.vfsglobal.com/en/general/certification-and-accreditation.html?from_section=1#iso_27001 the page name will be certification-and-accreditation.html
			get_page_name: function (url) {
				var cur_page_name = url.replace(/\\/g, "/").split('/').pop(),
					cur_page_hash_param_index = cur_page_name.search(/(\?|#)/g);

				cur_page_name = cur_page_hash_param_index == -1 ? cur_page_name : cur_page_name.substring(0, cur_page_hash_param_index);

				//if cur_page_name is blank and provided url and document url is same; then cur_page_name will be default page name
				if (cur_page_name == '' && url.toLowerCase() == document.URL.toLowerCase())
					cur_page_name = vfs.utilities.url.default_page;

				return cur_page_name;
			},
			//this sub module has all the operations related to url parameters (query string)
			params: {
				//get all the parameters from an url in the form of object where key is a parameter name and value is paramter's value
				get: function (url) {
					url = url.replace(/#.*$/, '');

					var params = {},
						question_mark_index = url.indexOf('?'),
						parts;

					//if question mark is not found or question is last character in url then will return blank object
					if (question_mark_index == -1 || question_mark_index == url.length - 1)
						return params;

					parts = url.substr(question_mark_index + 1).split('&');

					for (var i = 0; i < parts.length; i++) {
						var keyValuePair = parts[i].split('='),
							key = decodeURIComponent(keyValuePair[0]);

						//if value is given then replace '+' with ' ' in entire value string
						params[key] = keyValuePair[1] ?
							decodeURIComponent(keyValuePair[1].replace(/\+/g, ' ')) :
							keyValuePair[1];
					}

					return params;
				},

				//it will add parameter name and value in the provided url and then return modified url
				//it also accepts object to set multiple paramaters
				/*this function acts as function overloading since it accepts 2 types of parameters
				
				first type of params are
				url - url in which parameters to add
				param_name - parameter name as string to set parameter name in url
				param_value - parameter value as string to set parameter value in provided parameter name in url
				
				second type of params are
				url - url in which parameters to add
				param_object - paramters object which contains key as parameter name and value as parameter's value*/
				set: (function () {
					var set_param_val = function (url, param_name, param_value) {
						var hash_index = url.indexOf("#"),
							hash_string = vfs.utilities.url.hash.get(url),
							//remove hash value from url and store it in altered_url; so that parameter name and value can be added in altered_url easily because hash value comes at the end which will be added in the return statement
							altered_url = url.substring(0, hash_index == -1 ? url.length : hash_index),
							question_mark_index = altered_url.indexOf("?");

						hash_string = hash_string != null ? ("#" + hash_string) : "";

						if (question_mark_index == -1) {
							url = altered_url + "?" + param_name + "=" + param_value;
						} else {
							var param_index = altered_url.indexOf("?" + param_name + "=", question_mark_index);
							if (param_index == -1)
								param_index = altered_url.indexOf("&" + param_name + "=", question_mark_index);

							//if parameter name not found from both step (by finding '?param_name=' or '&param_name='); then it will add &param_name=param_value in altered url
							if (param_index == -1) {
								url = altered_url + "&" + param_name + "=" + param_value;
							} else {
								//if parameter name found in url; then store value_start_index which is param_index + param_name.length + 2(because there is '=' character after parameter name)
								var value_start_index = param_index + param_name.length + 2;
								var value_end_index;

								//if value_start_index is the end of string then just add parameter value in altered_url
								if (value_start_index == altered_url.length) {
									url = altered_url + param_value;
								} else {
									//it finds end index of value by finding "&" in the url from value_start_index; and if "&" not found then length of altered_url is value end index; after that just set parameter value in between value_start_index and value_end_index
									value_end_index = altered_url.indexOf("&", value_start_index);
									value_end_index = value_end_index == -1 ? altered_url.length : value_end_index;

									url = altered_url.substring(0, value_start_index) + param_value + altered_url.substring(value_end_index);
								}
							}
						}
						//url (which has parameter name and value added) will be returned by adding hash_string
						return url + hash_string;
					};

					return function (url, param_name, param_value) {
						//if param_name is object then loop the object and call function to set each parameter name; otherwise directly call function to set parameter

						if (typeof param_name == 'object') {
							for (var key in param_name)
								url = set_param_val(url, key, param_name[key]);
						} else {
							url = set_param_val(url, param_name, param_value);
						}

						//return the modified url
						return url;
					}
				})(),

				//it will remove paramter name and value from the provided url and then return modified url
				/*it also accepts object to remove multiple paramaters
					and also if don't pass parameter name then removes all paramters*/

				/*params are
				url - url from which parameters to remove
				param_names - parameter name as string to remove parameter name and value from url;
					if multiple paramter name passed as array of string then parameter names in an array and their values will be removed from url
					and if not passed then all paramter names and value will be remove from url
				*/
				remove: (function () {
					var remove_param_val = function (url, param_name) {
						var hash_index = url.indexOf("#"),
							hash_string = vfs.utilities.url.hash.get(url),
							//remove hash value from url and store it in altered_url; so that parameter name and value can be removed from altered_url easily because hash value comes at the end which will be added in the return statement
							altered_url = url.substring(0, hash_index == -1 ? url.length : hash_index),
							question_mark_index = altered_url.indexOf("?");

						hash_string = hash_string != null ? ("#" + hash_string) : "";

						if (question_mark_index != -1) {
							var param_index = altered_url.indexOf("?" + param_name, question_mark_index);
							if (param_index == -1)
								param_index = altered_url.indexOf("&" + param_name, question_mark_index);

							//if parameter name found from both step (by finding '?param_name' or '&param_name'); then only it will move forward
							if (param_index != -1) {
								//it will store value_start_index which is param_index + param_name.length + 2(because there is '=' character after parameter name)
								var value_start_index = param_index + param_name.length + 2;
								var value_end_index;

								//if value_start_index is after the end of string then just get url from start to index of parameter name
								if (value_start_index >= altered_url.length) {
									url = altered_url.substring(0, param_index);
								} else {
									//it finds end index of value by finding "&" in the url from value_start_index; and if "&" not found then length of altered_url is value end index
									value_end_index = altered_url.indexOf("&", value_start_index);
									value_end_index = value_end_index == -1 ? altered_url.length : value_end_index;

									/*Examples are given for below ternary condition statement
									example for true condition; if parameter name is 'test' and url is http://www.example.com/abc.html?test=hi&xyz=hello&mno=pqr
									since parameter name comes first and there are multiple parameters, it adds "http://www.example.com/abc.html?" and "xyz=hello" (that means "test=hi&" is removed)
									
									example for false condition; if parameter name is 'mno' and url is http://www.example.com/abc.html?test=hi&xyz=hello&mno=pqr
									since parameter name doesn't comes first, it just takes "http://www.example.com/abc.html?test=hi&xyz=hello" (that means "&mno=pqr" is removed) even for parameter name 'xyz' it will remove "&xyz=hello"*/
									url = (altered_url.charAt(param_index) == '?' && value_end_index != altered_url.length) ?
										altered_url.substring(0, param_index + 1) + altered_url.substring(value_end_index + 1) :
										altered_url.substring(0, param_index) + altered_url.substring(value_end_index);
								}
							}
						}
						//url (from which parameter name and value removed) will be returned by adding hash_string
						return url + hash_string;
					};

					return function (url, param_names) {
						//if param_names passed then remove single or multiple parameters
						if (param_names) {
							//if param_names is not an array then put that in new array and then remove parameter name one by one from url
							param_names = $.isArray(param_names) ? param_names : [param_names];

							for (var i = 0; i < param_names.length; i++)
								url = remove_param_val(url, param_names[i]);
						} else {
							//if param_names is not given then it will get all the parameter names by calling params.get(url); then loop for each parameeter in all_params and remove's the parameter from url
							var all_params = vfs.utilities.url.params.get(url);
							for (var key in all_params)
								url = remove_param_val(url, key);
						}

						//return the modified url
						return url;
					}
				})()
			},
			//this sub module has all the operations related to hash value
			hash: {
				//get hash value from an url, if threre is no hash value then will return null
				get: function (url) {
					var hash_index = url.indexOf("#");
					return hash_index == -1 ? null : url.substring(hash_index + 1);
				},
				//get hash value in an url, and return modified url
				set: function (url, hash_value) {
					var hash_index = url.indexOf("#");
					return hash_index == -1 ? (url + "#" + hash_value) : (url.substring(0, hash_index + 1) + hash_value);
				},
				//remove hash url from url, and return modified url
				remove: function (url) {
					var hash_index = url.indexOf("#");
					return url.substring(0, hash_index == -1 ? url.length : hash_index);
				}
			},
			//this function is used to get the properties/details from url
			get_link_properties: (function () {
				var link_el = $('<a>')[0],
					//these are the details that it gets from url; and insert details from regex match
					keys = ['protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash'];

				return function (link_el_param) {
					if (typeof link_el_param == 'string') {
						link_el.href = link_el_param;
						link_el_param = link_el;
					}

					var href = link_el_param.href,
						match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/),
						link_properties = {
							href: href
						};

					for (var i = 0; i < keys.length; i++)
						link_properties[keys[i]] = (match && match[i + 1]) || '';

					return link_properties;
				};
			})(),
			//to check wheter the provided url is external url or not
			//e.g. https://www.vfsglobal.ca/canada/algeria/ is external since hostname is www.vfsglobal.ca
			is_external: (function () {
				var keys = ['hostname', 'port', 'protocol'],

					alter_value = function (obj, key, value, main_obj) {
						(main_obj || obj)[key] = value.toLowerCase();
					};

				return function (url) {
					var cur_link_properties = vfs.utilities.url.get_link_properties(url),
						altered_location = {};

					//convert to lowercase all the three values of keys given above of both provided url's properties and window.location (lowercase values of window.location will be stored in altered_location)
					vfs.utilities.json_and_arr.loop_obj(cur_link_properties, alter_value, keys);
					vfs.utilities.json_and_arr.loop_obj(location, alter_value, keys, null, altered_location);

					/*if all the values of keys (given above) in provided url's properties is blank, or if all the values of keys in provided url's properties and altered_location (generated from window.location) are same;
					then provided url is internal else external*/
					return !(vfs.utilities.json_and_arr.check_value.in_all_key(cur_link_properties, null, '', keys) ||
						vfs.utilities.json_and_arr.is_equal(cur_link_properties, altered_location, keys));
				};
			})(),
			//to check whether the provided url is current url or not
			//e.g. if window.location.href is https://www.vfsglobal.com/en/general/certification-and-accreditation.html?from_section=1#iso_27001 then https://www.vfsglobal.com/en/general/certification-and-accreditation.html is current url
			is_current: function (url) {
				var cur_pathname = vfs.utilities.url.get_link_properties(url).pathname.toLowerCase(),
					location_pathname = location.pathname.toLowerCase(),
					default_page = vfs.utilities.url.default_page.toLowerCase();

				//if url is not external and, url's pathname and window.location's pathname is same (also checks by adding default page); then provided url is current url
				return !vfs.utilities.url.is_external(url) &&
					(cur_pathname == location_pathname ||
						cur_pathname + default_page == location_pathname ||
						cur_pathname == location_pathname + default_page);
			}
		},
		//this sub module has all the operations related to calculation
		math: {
			//convert degree to radian (provided angle must be in degree)
			deg_to_rad: function (angle) {
				return angle * (Math.PI / 180);
			},
			//convert radian to degree (provided angle must be in radian)
			rad_to_deg: function (angle) {
				return angle * (180 / Math.PI);
			},
			//calculate actual value from range and percentage (percentage is from 0 to 1 instead of 0 to 100)
			//e.g. if range is min: 100 and max: 200; then 0.5 percentage (50%) of this is 150
			get_value_from_range: function (range, percent) {
				return (range.max - range.min) * percent + range.min;
			},
			//calculate percentage from range and value
			//e.g. if range is min: 100 and max: 200; then for value: 170, percentage is 0.7 (70%)
			get_percent_from_range: function (range, value) {
				return (value - range.min) / (range.max - range.min);
			},
			//calculate duration from speed, from_position and to_position
			//e.g. if from_position: 50, to_position: 100 and speed: 25 per second; then duration to reach to to_position will be (100 - 50) / 25 i.e. 2 second
			get_duration_from_speed: function (from_pos, to_pos, speed) {
				return Math.abs(from_pos - to_pos) / speed;
			}
		},
		//this sub module has all the operations related to cookies
		cookies: {
			//this will get the value of provided cookie name; if cookie name is not provided then will return complete object having all the cookie names and their values; if name is provided and cookie of that name is not found then returns null
			//name is an optional parameter
			get: function (name) {
				var all_cookies = document.cookie.split(';'),
					cur_cookie,
					cookie_name_values = {};

				for (var i = 0; i < all_cookies.length; i++) {
					//remove leading space and split in name, value pair
					cur_cookie = all_cookies[i].replace(/^\s+/, '').split('=');

					//if name of current cookie is same as provided name then will return value of current cookie
					if (cur_cookie[0] == name)
						return cur_cookie[1];

					//add current cookie's name and value in an object
					cookie_name_values[cur_cookie[0]] = cur_cookie[1];
				}

				/*if name is provided then return null (since if cookie name found then function would return value earlier; but if cookie name not found then only engine will reach and run below statement)
				But if name is not provided then returns object containing all the cookie name as key and value as cookie value*/
				return name ? null : cookie_name_values;
			},
			//this will set cookie name and value for given time period; if time period (timeout) is not provided then will set cookie for browser session (that means cookie will be deleted on close of browser)
			//timeout param is an optional
			set: function (name, value, timeout) {
				var cur_date = new Date(),
					expires;

				timeout = timeout || 0;

				cur_date.setTime(cur_date.getTime() + timeout);
				expires = 'expires=' + cur_date.toGMTString();

				//if timeout is given then only adds expires
				document.cookie = name + '=' + value + (timeout ? '; ' + expires : '');
			},
			//this will delete cookie of provided name
			delete: function (name) {
				//it calls cookie.set by passing negative timeout which will delete cookie
				vfs.utilities.cookies.set(name, '', -1000);
			}
		},
		//this sub module has all the operations related to string
		string: {
			// this sub module and their functions are used in other modules; or can also be used in calling other function and passing one of the function from below sub module (e.g. see vfs.utilities.json_and_arr.update_value; search 'update_value:')
			auto_format_fn: {
				overwrite: function (new_txt) {
					return new_txt;
				},
				prepend: function (new_txt, cur_txt) {
					return new_txt + cur_txt;
				},
				append: function (new_txt, cur_txt) {
					return cur_txt + new_txt;
				}
			},
			//this sub module has two functions to transform the case i.e. upper_first (to convert first character to uppercase) and lower_first (to convert first character to lowercase)
			//e.g. vfs.utilities.string.transform_case.upper_first('test') //returns 'Test'
			//Note: functions are added programmatically in this sub module
			transform_case: (function () {
				//keys in case_fn_name will be function name in this module
				//value is function name that will be called on first character of string
				var case_fn_name = {
					upper_first: 'toUpperCase',
					lower_first: 'toLowerCase'
				},

					//this will generate and return function that will be exported to the module
					//case_type will be string which will be one of the key given in case_fn_name
					get_fn = function (case_type) {
						//cur_case_fn will have function name that will be called on first character of string
						var cur_case_fn = case_fn_name[case_type];

						return function (str) {
							return str.charAt(0)[cur_case_fn]() + str.substring(1);
						};
					},

					_module = {};

				//functions will be added dynamically in module
				for (var key in case_fn_name)
					_module[key] = get_fn(key);

				return _module;
			})(),
			//this function will replace hyphen to camel case
			//e.g. replace_hyphen_to_camelcase('hello-world') //returns 'helloWorld'
			replace_hyphen_to_camelcase: (function () {
				var replace_hyphen_char_to_uppercase = function (str) {
					return str.charAt(1).toUpperCase();
				};

				return function (str) {
					//hyphen and character after will be replaced by uppercase of that character
					return str.replace(/-./g, replace_hyphen_char_to_uppercase);
				}
			})(),
			//this function will return text from html
			//param html is optional; if html is not provided then empty string will be returned
			get_text_from_html: (function () {
				//this element will be used to set html and get the text from it
				var $el = $('<div>');

				return function (html) {
					//set the html and get the text, replace multiple space with single space and returns the result after trim.
					return $.trim($el.html(html || '').text().replace(/\s+/g, ' '));
				};
			})(),
			//it formats the provided font family name
			get_formatted_font_family: function (font_family) {
				//converts to lowercase and removes the spaces, double quote ("), single quote (')
				return $.trim(font_family.toLowerCase().replace(/\s+|"|'/g, ''));
			},
			//adds the slash (/) at the end of string if not there
			check_add_slash: function (str) {
				str = $.trim(str);

				//if string is empty then return as it is
				if (!str)
					return str;

				return str + (str.lastIndexOf('/') == str.length - 1 ? '' : '/');
			},
			//converts number to comma seperated number
			//e.g. converts 123456789 to "123,456,789"
			comma_seperated_number: function (num) {
				//splits the number from '.' to add comma in number before the decimal point only and not after the decimal point
				var parts = String(num).split(".");
				parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				return parts.join(".");
			},
			//add ordinal indicator to number that means adds 'st', 'nd', 'rd' or 'th' to number
			//e.g. add_ordinal_indicator(25) returns '25th'; add_ordinal_indicator(32) returns '32nd'; add_ordinal_indicator(12) returns '12th'
			add_ordinal_indicator: (function () {
				var indicator_details = {
					'1': 'st',
					'2': 'nd',
					'3': 'rd',
					//if current number is exceptional like number whose second last digit is 1 e.g. 411, 12, 213, etc.; then will return 'th' else null
					'exception': function (num_str) {
						return num_str[num_str.length - 2] == '1' ? 'th' : null;
					},
					'default': 'th'
				};

				return function (num) {
					var num_str = parseInt(num).toString();

					return num_str +
						/*if current number is exceptional then add returned value from exception otherwise;
							if last digit not found in indicator_details then take default from indicator_details*/
						(indicator_details.exception(num_str) ||
							indicator_details[num_str[num_str.length - 1]] ||
							indicator_details.default);
				};
			})(),
			//converts date string to ordinal indicator date
			//e.g. convert_to_ordinal_indicator_date('12 January 2019') returns '12th January 2019'
			convert_to_ordinal_indicator_date: function (date_str) {
				//finds starting digits and adds ordinal indicator in that
				return date_str.replace(/^\d+/, function (txt) {
					return vfs.utilities.string.add_ordinal_indicator(txt);
				});
			},
			//this function will replace characters with provided replace_data in given string
			/*e.g. replace_chars('a.mno.a.xyz', {
				'.': '/',
				'a': 'pqr'
			}) will return 'pqr/mno/pqr/xyz'*/
			replace_chars: function(str, replace_data) {
				for(var i = 0 ; i < str.length ; i++) {
					var char = str[i];

					if(!replace_data.hasOwnProperty(char))
						continue;
					
					var replace_str = replace_data[char];
					
					//generate new string by prefixing and suffixing substrings on replace_str; and since replace_str can be of any length new str length will change and so index must be changed, formula for increasing index is number of new characters added, and formula for new characters added is length of replace_str - length of find string (i.e. 1, since we have replaced with only one character)
					//Note: no meaning to use new_str as we want both new_str and correponding index of new_str
					str = str.substring(0, i) + replace_str + str.substring(i + 1);
					i += replace_str.length - 1;
				}
				
				return str;
			}
		},
		//this sub module has all the operations related to json type object and array
		json_and_arr: {
			//this function returns an array of keys (as same as Object.keys does)
			get_all_keys: function (obj) {
				var all_keys = [];

				for (var key in obj) {
					if (obj.hasOwnProperty(key))
						all_keys.push(key);
				}

				return all_keys;
			},
			//this function returns an array of keys (as same as Object.values does)
			get_all_values: function (obj) {
				var all_values = [];

				for (var key in obj) {
					if (obj.hasOwnProperty(key))
						all_values.push(obj[key]);
				}

				return all_values;
			},
			//this function returns the key of a found value (reverse of native behaviour i.e. obj[key] which returns value)
			//if value not found then returns null
			get_key_of_value: function (obj, value) {
				for (var key in obj) {
					if (obj[key] == value)
						return key;
				}

				return null;
			},
			//this function is used to find opposite
			/*e.g if we have object var opp_details = {
				'left': 'right',
				'top': 'bottom'
			} then get_swap_value(opp_details, 'bottom') will return 'top'
			similarly get_swap_value(opp_details, 'left') will return 'right'*/
			get_swap_value: function (swap_obj, value) {
				var str_value = value.toString();

				//if object has key then returns value otherwise returns the key of value by calling get_key_of_value
				if (swap_obj.hasOwnProperty(str_value))
					return swap_obj[str_value];
				else
					return vfs.utilities.json_and_arr.get_key_of_value(swap_obj, value);
			},
			//this function is used on object of function where each key has assigned function
			//this function returns key of an object whose function returns true; if no function returns true then this function will return null
			//this is mainly used in getting column from dynamic_columns config
			get_key_of_true_condition: function (obj) {
				if (typeof obj != 'object' || $.isArray(obj))
					return obj;

				for (var key in obj) {
					if (obj.hasOwnProperty(key) && obj[key]())
						return key;
				}

				return null;
			},
			//removes multiple elements from an array whose indexes are provided in indexes_arr
			remove_indexes_from_arr: function (main_arr, indexes_arr) {
				//sorting and reversing is mandatory, since deleting an elements down in an array doesn't change the position of an elements which are above in an array
				indexes_arr.sort(vfs.utilities.functions.get_sort_fn({
					is_descending: true
				}));

				for (var i = 0; i < indexes_arr.length; i++)
					main_arr.splice(indexes_arr[i], 1);

				return main_arr;
			},
			//this sub module has operations for those string values which has number and unit e.g. 12px, 35%
			number_unit_json: (function () {
				var reg_ex = /^-?\d+(\.\d+)?([^\d\.]+)$/,

					//this checks whether string is of type number_unit
					is_of_type = function (str) {
						return reg_ex.test(str);
					},

					//this returns the details containing what is number and what is unit
					//if string is not of the type number_unit then returns passed string as it is
					get = function (str) {
						var match_arr;

						return (match_arr = str.match(reg_ex)) ? {
							number: parseFloat(str),
							unit: match_arr[2]
						} : str;
					};

				return {
					is_of_type: is_of_type,
					get: get
				};
			})(),
			//this function loops the object; this is enhanced version of each function
			/*params are
			obj - obj is the object which will be looped
			fn - fn is the function which will be called in each iteration
			keys - there are two format of keys
				array of keys to loop the object for specified keys only
				object of below format
				{
					keys: [...],
					are_prevent_keys: true
				} if this is passed; then loop the object except for provided keys (since are_prevent_keys is true)
			end_return_val - this value will be returned in the end of function (to make chaining possible and customizable)
			extra_fn_param - this value will be passed to fn function (2nd argument)*/
			loop_obj: function (obj, fn, keys, end_return_val, extra_fn_param) {
				//if obj is not a valid object; then will return from here only
				if (typeof obj != 'object' || obj == null)
					return;

				var return_val,
					are_prevent_keys = false;

				//sets are_prevent_keys and keys if keys is provided in object format
				if (keys && typeof keys == 'object' && !$.isArray(keys)) {
					are_prevent_keys = keys.are_prevent_keys;
					keys = keys.keys;
				}

				//if keys are not provided or provided keys are the prevent keys then will go in if condition
				if (!keys || are_prevent_keys) {
					for (var key in obj) {
						//if current key is in keys then continue the loop (since if keys are provided then those keys will be prevent_keys; also if keys are not provided then belwo condition will be false and next statement will be executed)
						if ($.inArray(key, keys) != -1)
							continue;

						//will call the fn function by passing object obj, current key, value and extra_fn_param
						//if fn function returns some non null value then loop_obj function will return that value
						return_val = fn(obj, key, obj[key], extra_fn_param);
						if (return_val != undefined)
							return return_val;
					}
				} else {
					//because of above if condition; object here must loop for specified keys only
					for (var i = 0; i < keys.length; i++) {
						//will call the fn function by passing object obj, current key, value and extra_fn_param
						//if fn function returns some non null value then loop_obj function will return that value
						return_val = fn(obj, keys[i], obj[keys[i]], extra_fn_param);
						if (return_val != undefined)
							return return_val;
					}
				}

				return end_return_val;
			},
			//this will convert css type string to json
			//e.g. "left: 10%; top: 25%" to {left: "10%"; top: "25%"}
			str_to_json: function (str) {
				var json = {},
					all_key_values = str.split(';'),
					cur_key_value;

				for (var i = 0; i < all_key_values.length; i++) {
					cur_key_value = all_key_values[i].split(':');
					json[$.trim(cur_key_value[0])] = $.trim(cur_key_value[1]);
				}

				return json;
			},
			//this will convert json to css type string
			//e.g. {left: "10%"; top: "25%"} to "left: 10%; top: 25%"
			//keys is optional param - pass keys to create css string of specefied keys only
			json_to_str: (function () {
				var loop_json = function (json, key, value, param) {
					param.str += (param.str != '' ? ';' : '') + key + ':' + value.toString();
				};

				return function (json, keys) {
					var param = {
						str: ''
					};

					return vfs.utilities.json_and_arr.loop_obj(json, loop_json, keys, param, param).str;
				};
			})(),
			//this function will copy the keys and their values from source object to destination object
			//keys is optional param - pass keys to copy values of specefied keys only
			copy_keys: (function () {
				var copy_key = function (source_obj, key, value, dest_obj) {
					dest_obj[key] = source_obj[key];
				};

				return function (dest_obj, source_obj, keys) {
					return vfs.utilities.json_and_arr.loop_obj(source_obj, copy_key, keys, dest_obj, dest_obj);
				};
			})(),
			//this module will check that the passed value is in object/array
			check_value: (function () {
				//this function will be used in both 'in_all_key' and 'in_any_key'
				var in_any_or_all_key = (function () {
					var data = {},

						check_details = {
							in_all_key: {
								fn: function (obj, key) {
									if (!obj.hasOwnProperty(key) || obj[key] !== data.value)
										return false;
								},
								end_return_val: true
							},
							in_any_key: {
								fn: function (obj, key) {
									if (obj.hasOwnProperty(key) && obj[key] === data.value)
										return true;
								},
								end_return_val: false
							}
						};

					/*params are
						obj - of type object in which value will be checked
						value - value which will be checked in obj object
						keys - provided specified keys in which you want value to be checked
						check_key - type of check that you want to do ('in_all_key' or 'in_any_key')
					*/
					return function (obj, value, keys, check_key) {
						var cur_check_details = check_details[check_key];

						//this data.value will be used in fn of 'in_all_key'/'in_any_key'
						data.value = value;

						return vfs.utilities.json_and_arr.loop_obj(obj, cur_check_details.fn, keys, cur_check_details.end_return_val);
					};
				})(),

					in_all_key = function (obj, value, keys) {
						return in_any_or_all_key(obj, value, keys, 'in_all_key');
					},

					in_any_key = function (obj, value, keys) {
						return in_any_or_all_key(obj, value, keys, 'in_any_key');
					},

					//this function will check the value in array of object and returns the index of an object
					/*e.g. in_arr_of_obj([{ name: 'abc', age: 24 }, { name: 'xyz', age: 26 }], 'name', 'xyz') will return 1*/
					in_arr_of_obj = function (arr, key_name, value) {
						for (var i = 0; i < arr.length; i++) {
							if (arr[i][key_name] === value)
								return i;
						}

						return -1;
					};

				return {
					in_all_key: in_all_key,
					in_any_key: in_any_key,
					in_arr_of_obj: in_arr_of_obj
				};
			})(),
			//this function will filter array of keys and will return only those keys which are defined in an object
			get_defined_keys_from_arr: function (all_keys, obj) {
				var defined_keys = [];

				for (var i = 0; i < all_keys.length; i++) {
					if (all_keys[i] in obj)
						defined_keys.push(all_keys[i]);
				}

				return defined_keys;
			},
			//checks whether two json type object is equal or not
			is_equal: (function () {
				var has_all_equal_value = (function () {
					var loop_fn = function (obj, key, value, data) {
						var obj2_value = data.obj2[key];

						if (value === obj2_value)
							return;

						//if both value and obj2_value is not equal then will run below statement
						//deep is true then only calls is_equal for nested objects
						//in calling of is_equal if also_deep_keys is true then only keys will be passed for deep checking
						if (!(data.deep && vfs.utilities.json_and_arr.is_equal(value, obj2_value, data.keys && data.keys.also_deep_keys ? data.keys : null, data.deep)))
							return false;
					};

					return function (obj1, obj2, keys, deep) {
						var param = {
							obj2: obj2,
							keys: keys,
							deep: deep
						};

						return vfs.utilities.json_and_arr.loop_obj(obj1, loop_fn, keys, true, param);
					};
				})();

				/*params are 
				obj1 - object 1
				obj2 - object 2 (obj1 and obj2 will be compared)
				keys - it is optional; specify only cerain keys that you want to compare
				deep - pass true if you want to compare two objects deeply
				Note: if you pass keys and deep as true then you can also give keys in below format
				{
					keys: [],
					also_deep_keys: true
				} also_deep_keys says that provided keys will also be used in comparing deep checking (nested objects)*/
				return function (obj1, obj2, keys, deep) {
					//if keys is not provided and deep is provided then autoset
					if (typeof keys == 'boolean') {
						deep = keys;
						keys = undefined;
					}

					/*has_all_equal_value is called two times; 
						first time by passing obj1, obj2 and 
						second time by passing obj2, obj1 
					(to compare in both direction i.e. keys from obj1 and also keys from obj2)*/
					return (typeof obj1 == 'object' && typeof obj2 == 'object') &&
						(has_all_equal_value(obj1, obj2, keys, deep) &&
							has_all_equal_value(obj2, obj1, keys, deep));
				};
			})(),
			//this function will update the values of multiple keys in an object
			update_value: (function () {
				var loop_obj = function (obj, key, value, param) {
					//new value will be setted by calling set_fn and by passing main value (which are passed in main update_value function) and current value of key in object
					obj[key] = param.set_fn(param.value, value);
				};

				/*params are
				obj - type: object; whose values will be updated
				value - which will be used for update
				set_fn - optional; set function used to update the value; if not provided then overwrite will be used
				keys - provide keys to update value in specified keys only
				e.g.
				update_value({a: 'x', b: 'y', c: 'z'}, '') //returns {a: '', b: '', c: ''}
				update_value({a: 'x', b: 'y', c: 'z'}, 'temp-', vfs.utilities.string.auto_format_fn.prepend) //returns {a: 'temp-x', b: 'temp-y', c: 'temp-z'}*/
				return function (obj, value, set_fn, keys) {
					//if set_fn is not provided and keys is procided then autoset
					if (typeof set_fn == 'object') {
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
			//this function sets the value at provided index in an array; but if set_index is provided as true then it justs push value in an array
			/*it is used in many places 
			e.g. creating array of data for showing top 3 posts in blog-featured.html page and also for showing top 2 posts in individuals home page*/
			set_arr_sequence_data: function (arr, set_index, value) {
				if (typeof set_index == 'number')
					arr[set_index] = value;
				else if (set_index)
					arr.push(value);

				return arr;
			},
			//this function creates an array in which an elements are stored in specific sequence. The sequence number must be stored in a source array (source array must be array of object) in a key of name provided in index_prop_name
			/*e.g 
			1. create_sequenced_arr([{name: 'abc', age: 25, order: 1}, {name: 'xyz', age: 30, order: 0}], 'order') will return new array [{name: 'xyz', age: 30, order: 0}, {name: 'abc', age: 25, order: 1}]
			2. create_sequenced_arr([{name: 'abc', age: 25, order: 1}, {name: 'xyz', age: 30, order: 0}], 'order', {
				create_dest_arr_el_fn: function(el) {
					return el.name;
				}
			}) will return new array ['xyz', 'abc']*/
			/*params are
				source_arr - source array of type array of object from which the sequence number will be taken
				index_prop_name - property name of an object in any array where the sequence number is stored
				options - optional, below is the format and each key is optional
					{
						dest_arr - destination array (result array); type must be array; if provided then this array will be used to store elements in sequence otherwise new array will be created
						create_dest_arr_el_fn - create destination array element function; type must be function; when storing an element in destination array, it asks for what element to store, if this function is provided then it calls this function and return value will be used as element to store, otherwise source array's element will be used to store.
						create_dest_arr_el_fn_param - create destination array element function parameter; type can be any; this will be passed in calling create_dest_arr_el_fn
					}

					Parameter that will be passed in calling create_dest_arr_el_fn function will be
						i. source array element
						ii. index of element in source array
						iii. create_dest_arr_el_fn_param
			*/
			//Note: sequence index can be number of boolean value (see set_index param in set_arr_sequence_data function)
			create_sequenced_arr: function (source_arr, index_prop_name, options) {
				options = options || {};

				var dest_arr = options.dest_arr || [],
					cur_index_prop_value;

				for (var i = 0; i < source_arr.length; i++) {
					cur_index_prop_value = source_arr[i][index_prop_name];

					vfs.utilities.json_and_arr.set_arr_sequence_data(
						dest_arr,
						cur_index_prop_value,
						options.create_dest_arr_el_fn == undefined ?
							source_arr[i] : options.create_dest_arr_el_fn(source_arr[i], i, options.create_dest_arr_el_fn_param)
					);
				}

				return dest_arr;
			},
			//this function is exactly same as Array.prototype.flat, Note: native flat function doesn't support in IE, Edge, older chrome and firefox browsers
			//Note: Below comments are taken from mdn website (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat); you can directly visit link for info
			//This function creates a new array with all sub-array elements concatenated into it recursively up to the specified depth
			/*params are
				arr - array
				depth - type: number; optional; depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
			*/
			/*e.g.
			flat_arr([1, 2, [3, 4]]) //returns [1, 2, 3, 4]
			flat_arr([1, 2, [3, 4, [5, 6]]]) //returns [1, 2, 3, 4, [5, 6]]
			flat_arr([1, 2, [3, 4, [5, 6]]], 2) //returns [1, 2, 3, 4, 5, 6]
			*/
			flat_arr: (function () {
				//since flat calling is recursive, we have created closure, so that we can call flat like flat(..) instead of vfs.utilities.json_and_arr.flat_arr(...).
				var flat = function (arr, depth) {
					depth = isNaN(depth) ? 1 : Number(depth);

					var new_arr = [],
						val;

					for (var i = 0; i < arr.length; i++) {
						val = arr[i];

						//if value is array and depth is given > 0 then it first calls the flat for the value and depth will be passed by decrementing by 1 (since level is increased) and the return value of flat will be used to push in new_arr
						if (val instanceof Array && depth)
							new_arr.push.apply(new_arr, flat(val, depth - 1));
						else
							new_arr.push(val)
					}

					return new_arr;
				};

				return flat;
			})(),
			//this module will convert an input array to new output array
			//e.g. convert_arr.lowercase(['Abc', 'Xyz']) //will return new array ['abc', 'xyz']
			//Note: functions are added programmatically in this sub module
			convert_arr: (function() {
				//keys in all_map_fn will be function name in this module
				//value is a function which will be passed in map function on provided array
				var all_map_fn = {
					lowercase: function(val) {
						return val.toLowerCase();
					}
				},

				//this function is called for dynamically adding functions in module
				//it accepts map_fn_name (any property from all_map_fn)
				get_main_fn = function(map_fn_name) {
					var map_fn = all_map_fn[map_fn_name];

					//this is the main function which will be called on convert_arr.lowercase
					return function(arr) {
						return arr.map(map_fn);
					};
				},

				_module = {};

				//loop all_map_fn and set function in module
				for(var key in all_map_fn)
					_module[key] = get_main_fn(key);

				return _module;
			})()
		},
		//this sub module has all the operations related to function
		functions: {
			//this function merges the array of functions to a single new function
			//when new function will be called then each of function in an array will be called by passing same arguments provided to new generated function; and new generated function will return an array of return values from each function in an array
			/*e.g.
			var new_fn = create_merged_function([function(a, b) { return a + b },
			function(a, b) { return a * b }]);
			new_fn(2, 3); //returns [5, 6]
			Note: it will also pass same this in each function in an array*/
			//functions_arr is an optional parameter, so that developer has merged function and can add function in array in future
			create_merged_function: function (functions_arr) {
				//if function type is provided in functions_arr then it will be used as [functions_arr]
				functions_arr =
					typeof functions_arr == "function" ? [functions_arr] : functions_arr;
				functions_arr = functions_arr || [];

				//this function will be returned
				function main_fn() {
					var return_val = [];

					//call each function in an array and passes same 'this' value and arguments
					for (var i = 0; i < functions_arr.length; i++)
						return_val.push(functions_arr[i].apply(this, arguments));

					return return_val;
				}

				//function array are exported in returned function, so that in future developer can add/remove function in array
				main_fn._fn_arr = functions_arr;

				return main_fn;
			},
			//this will merge multiple object into one new object (like $.extend does), but if multiple object contains function on same key then instead of replacing it merges function also (see create_merged_function for info about merging function)
			/*e.g. var merged_obj = merge_object_containing_function([{
				name: 'abc',
				test: function() {
					console.log('hey');
				}
			}, {
				test: function() {
					console.log('hello');
				}
			}]) // returns {name: 'abc', test: new merged function}
			merged_obj.test() // this will print both 'hey' and 'hello'*/
			/*params are 
			obj_arr - array of objects which you want to merge
			new_obj - this is optional; if passed, merged value will be added in this object, otherwise new object will be created
			non_obj_callback - this is optional; if any element found to be non object type in an array then this callback will be called*/
			merge_object_containing_function: function (
				obj_arr,
				new_obj,
				non_obj_callback
			) {
				//if new_obj is not provided and non_obj_callback is provided then autoset
				if (typeof new_obj == "function") {
					non_obj_callback = new_obj;
					new_obj = undefined;
				}

				//if new_obj is not provided then create new object
				new_obj = new_obj || {};

				for (var i = 0; i < obj_arr.length; i++) {
					var obj = obj_arr[i];

					if (typeof obj != "object") {
						non_obj_callback(obj, new_obj);
					} else {
						var val;

						for (var key in obj) {
							val = obj[key];

							if (typeof val != "function") {
								new_obj[key] = val;
							} else {
								//if new_obj doesn't has key then new merged function will be added in object key; and then add function in an array
								if (!new_obj.hasOwnProperty(key))
									new_obj[key] = vfs.utilities.functions.create_merged_function();

								new_obj[key]._fn_arr.push(val);
							}
						}
					}
				}

				return new_obj;
			},
			//this function will generate object of functions by passing swap_data (opposite data) and by passing get_details_fn
			//the key of newly generated object and their function should be return from get_details_fn
			//get_details_fn can be a single function or array of functions
			//each function in get_details_fn will be called for each and every key of swap_obj and their value
			/*e.g.
				generate_multi_swap_key_fn({
					left: 'right',
					top: 'bottom'
				}, [function(key, opp_key) {
					return {
						key: 'padding-' + key,
						fn: function() {
							return $('.test').css('padding-' + opp_key);
						}
					};
				}, function(key, opp_key) {
					return {
						key: 'margin-' + key,
						fn: function() {
							return $('.test').css('margin-' + opp_key);
						}
					}
				}])
				//this will return below object
				{
					'padding-left': fn, //(first function)
					'padding-right': fn, //(first function)
					'padding-top': fn, //(first function)
					'padding-bottom': fn, //(first function)
					'margin-left': fn, //(second function)
					'margin-right': fn, //(second function)
					'margin-top': fn, //(second function)
					'margin-bottom': fn //(second function)
				}
			*/
			//this is used in vue-app.js, in country-drp-form-wrapper component for generating some computed properties
			generate_multi_swap_key_fn: function (swap_data, get_details_fn) {
				var all_swap_keys = vfs.utilities.json_and_arr
					.get_all_keys(swap_data)
					.concat(vfs.utilities.json_and_arr.get_all_values(swap_data)),
					all_fn = {},
					cur_key,
					opposite_key,
					details,
					get_details_fn =
						typeof get_details_fn == "function"
							? [get_details_fn]
							: get_details_fn;

				for (var i = 0; i < get_details_fn.length; i++) {
					for (var j = 0; j < all_swap_keys.length; j++) {
						cur_key = all_swap_keys[j];
						opposite_key = vfs.utilities.json_and_arr.get_swap_value(
							swap_data,
							cur_key
						);

						details = get_details_fn[i](cur_key, opposite_key);

						all_fn[details.key] = details.fn;
					}
				}

				return all_fn;
			},
			//this function will call function multiple times for regular specified interval of time for specified number of times
			/*e.g. call_multi_time(function() {
				console.log('test');
			}, 1000, 5);
			it will print 'test' 5 times at each 1 second*/
			call_multi_time: function (fn, interval, count) {
				var times_called = 0,
					//below will set the interval and call the function; times_called will be incremented and checks if times_called is greater then or equal to count then it clears interval 
					interval_id = setInterval(function () {
						fn();
						times_called++;

						if (times_called >= count)
							clearInterval(interval_id);
					}, interval);
			},
			//this function will provide sort function to be used in built in array.sort function
			//the returned sort function will run according to provided options
			//options param is optional; if options not provided then returned sort function can be used to sort both array[strings] case-insensitively and array[numbers] in ascending order
			/*properties of options are as follows (note: all the properties)
				obj_key: provide key of an object on which you want to sort an array[object]
				replace_chars: if you want to replace some characters (e.g. unicode characters) before sorting, then provide data for replace_chars (see format of replace_data in definition of vfs.utilities.string.replace_data)
				case_sensitive: default is false; provide true if you want to sort strings case sensitively
				exceptional_values: give exceptional values that you dont want to sort and want to shift to top/bottom; value is of type object of below format
					{
						top: ['test', ...],
						bottom: ['abc', ...]
					}
					Note: exceptional_values will not be sorted an will be arranged in the same order as described in top/bottom array; even if you provide is_descending: true this will not be sorted
				is_descending: provide true if you want to sort an array in descending order
			*/
			get_sort_fn: (function() {
				//this function has common code for updating data function and return sort value function (return sort value can be 1, -1 or null))
				//this function loops data (data has a and b value which are parameters in sort function)
				var get_loop_data_fn = function(config) {
					var init = config.init,
						loop = config.loop,
						return_val = config.return_val;

					return function(data) {
						//create args array from argument
						var args = Array.prototype.slice.call(arguments),

						//if init is defined then call it by passing current this value and args arguments
						//if init doesn't return any value or returns undefined/null value then it will exit the function; otherwise return value of init will be passed to loop function and also passed in return_val function
							param = init && init.apply(this, args);

						if(param == null) return;

						if(loop) {
							for(var key in data)
								loop(data, key, data[key], param);
						}
						
						return return_val && return_val(data, param);
					};
				},

				//code for creating sort function is split into two parts, one is for updating data and another is for getting return value of sort function

				//this array has functions for updating data
				//each function is returned from calling get_loop_data_fn
				//each function has code for updating data according to options provided
				all_updata_data_fn = [
					//below will return function which will check if type of a or b value of data is object and obj_key is provided in options then will update it's value by taking value of obj_key from corresponding a or b value
					//set_obj_key function
					get_loop_data_fn({
						init: function(data, options) {
							return options.obj_key;
						},
						loop: function(data, key, val, obj_key) {
							data[key] = typeof val == 'object' ? val[obj_key] : val;
						}
					}),

					//below will return function which will check if type of a or b value of data is string and replace_chars is provided in options then will update it's value by replacing chars as provided (see format of replace_data in definition of vfs.utilities.string.replace_data)
					//replace_chars function
					get_loop_data_fn({
						init: function(data, options) {
							return options.replace_chars;
						},
						loop: function(data, key, val, replace_chars) {
							data[key] = typeof val == 'string' ? vfs.utilities.string.replace_chars(val, replace_chars) : val;
						}
					}),

					//below will return function which will check if type of a or b value of data is string and case_sensitive is false then will update it's value by converting to lowercase (for case insensitivity)
					//convert_lowercase function
					get_loop_data_fn({
						init: function(data, options) {
							return Boolean(options.case_sensitive);
						},
						loop: function(data, key, val, case_sensitive) {
							data[key] = typeof val == 'string' && !case_sensitive ? val.toLowerCase() : val;
						}
					})
				],

				//this array has functions for return value of sort function
				//each function is returned from calling get_loop_data_fn
				//each function has code for generating return value of sort function according to options provided
				all_return_data_fn = [
					//below will return function which will check if exceptional_values is provided in options then will generate return value for sort function if value of a or b exists in exceptional_values
					//exceptional_values function
					get_loop_data_fn({
						init: function(data, options) {
							var exceptional_values = options.exceptional_values;

							//if exceptional_values is not provided or case_sensitive is true then just return exceptional_values from options; otherwise generate new exceptional values where top and bottom keys has array of lowercase strings for case insensitivity

							if(!exceptional_values || options.case_sensitive) return exceptional_values;

							
							var new_exceptional_values = {};

							for(var key in exceptional_values)
								new_exceptional_values[key] = vfs.utilities.json_and_arr.convert_arr.lowercase(exceptional_values[key]);

							return new_exceptional_values;
						},
						return_val: (function () {
							//number provided in all_key_details will be used in is_in_arr function
							var all_key_details = {
								top: -1, //since returning -1 in sort function means a comes before b (i.e. at top in array)
								bottom: 1 //since returning 1 in sort function means a comes after b (i.e. at bottom in array)
							},
							
							//if a or b value is in one of the exceptional_values array (i.e. exceptional_values.top or exceptional_values.bottom) then returns 1 or -1 otherwise null
							/*params are
								exceptional_values - passed from init function (this can be options.exceptional_values or can be lowercase of the same)
								key - can be 'top'/'bottom'
								data - this is object of following format
									{
										a: ,
										b: 
									}
							*/
							is_in_arr = function (exceptional_values, key, data) {
								var arr = exceptional_values[key],
									cur_key_num = all_key_details[key],
									a_index = $.inArray(data.a, arr),
									b_index = $.inArray(data.b, arr),
									a_in_arr = a_index != -1,
									b_in_arr = b_index != -1;
				
								//if a and b both are in array then return -1 if a comes before b in that array otherwise 1
								if (a_in_arr && b_in_arr)
									return a_index < b_index ? -1 : 1;
								//if only a is in array then return -1 for top and 1 for bottom
								else if (a_in_arr && !b_in_arr)
									return cur_key_num;
								//if only b is in array then return 1 for top and -1 for bottom
								else if (!a_in_arr && b_in_arr)
									return -cur_key_num;
								//if a and b both are not in array then return null
								else
									return null;
							};
						
							return function (data, exceptional_values) {
								//if a or b is available in top then will return 1 or -1; but if both a and b are not available in top array then is_in_arr will return null and it will check the same for bottom array
								return is_in_arr(exceptional_values, 'top', data) || 
								is_in_arr(exceptional_values, 'bottom', data);
							};
						})()
					})
				];

				return function(options) {
					options = options || {};

					//if is_descending is true then order is -1 otherwise order is 1; this will be multiplied with return value of default sort behaviour
					var order = options.is_descending ? -1 : 1;

					return function(a, b) {
						var data = {
							a: a,
							b: b
						};

						//loop all_update_data_fn and call functions which will update data according to options provided
						for(var i = 0 ; i < all_updata_data_fn.length ; i++)
							all_updata_data_fn[i](data, options);
						
						//loop all_return_data_fn and call functions which will return sort function value (1, -1 or null)
						//if return value (return_val) is not null then it will return that return_val 
						for(var i = 0 ; i < all_return_data_fn.length ; i++) {
							var return_val = all_return_data_fn[i](data, options);

							if(return_val)
								return return_val;
						}

						//if any function in all_return_data_fn doesn't return non null value then after completing loop, below is default sorting code which will be run by multiplying with order
						return order * (data.a < data.b ? -1 : 1);
					};
				};
			})()
		},
		//this sub module has all the operations related to css
		css: {
			//this function will get number unit details of css value of provided css property name (css_name); if css value in not in form of number_unit then return css value as it is
			/*params are
			$el - it is jquery element
			css_name - name of css property*/
			//Note: this will get css value from non inline style properties, that means if any element has style="padding: 10px" and in css file or in style tag it has given padding: 15px; then it will take 15px instead of 10px and returns {number: 15, unit: 'px'}
			get_css_number_unit_details: function ($el, css_name) {
				var css_details,
					inline_css_value;

				//if $el is not jquery object or it doesn't have any elements inside it then will return.
				if (!($el instanceof jQuery) || $el.length == 0) return;

				//will get inline css value of provided css property (css_name)
				inline_css_value = vfs.utilities.css.get_inline_css($el[0], css_name);

				//will remove inline css value of provided css property (css_name)
				$el.css(css_name, '');

				//get number unit details of provided css_name
				css_details = vfs.utilities.json_and_arr.number_unit_json.get($el.css(css_name));

				//after getting css_details, set inline css
				$el.css(css_name, inline_css_value);

				return css_details;
			},
			//this function will get inline css value of any css property (even css3 property)
			get_inline_css: (function () {
				var prefixes = [
					'',
					'Webkit',
					'ms',
					'Moz',
					'O'
				];

				/*params are 
				el - el is javascript DOM Element
				css_name - any css property name (for css3 give without prefix like 'transition-duration'); can also provide camelcase name like 'marginRight'
				*/
				/*e.g.
					<div id="test" style="padding-left: 10px">Test</div>
					get_inline_css($('#test')[0], 'padding-left');
				 */
				return function (el, css_name) {
					var css_first_capital_name,
						css_style_name,
						el_css_value;

					css_name = vfs.utilities.string.replace_hyphen_to_camelcase(css_name);

					css_first_capital_name = vfs.utilities.string.transform_case.upper_first(css_name);

					for (var i = 0; i < prefixes.length; i++) {
						if (prefixes[i] == '')
							css_style_name = css_name;
						else
							css_style_name = prefixes[i] + css_first_capital_name;

						el_css_value = el.style[css_style_name];

						if (el_css_value != '' && el_css_value != undefined)
							break;
					}

					return el_css_value == undefined ? '' : el_css_value;
				};
			})()
		},
		//this sub module has all the operations related to jquery
		jQuery: {
			//this function is slightly different from jquery's find; the difference between jquery's find and outer_find is similar to difference between innerHTML and outerHTML
			/*e.g. <ul id="test">
				<li>
					<ul></ul>
				</li>
			</ul> 
			outer_find($('ul#test'), 'ul') //returns jquery object of set [ul#test, ul] */
			outer_find: function ($el, selector) {
				return $el.find(selector).add($el.is(selector) ? $el : null);
			},
			//this function checks that container element contains target or container element is same as target element
			is_or_contains: function (container, target) {
				return $.contains(container, target) || $(container).is(target);
			},
			//this function creates jquery elements in an object
			//Note: key of each jquery object will start from '$'
			/*params are
				element_details - details of which jquery elements to store 
				target_obj - this is optional; if not provided new object will be created
				container_key - this is optional; will be used to create container and value of element_details will be used to find element in that container
			*/
			/*e.g.
			create_elements({
				container: '.container',
				content: '.main_content',
				button: '.button_wrapper > button'
			}) //returns {$container: $('.container'), $content: $('.main_content'), $button: $('.button_wrapper > button')}

			create_elements({
				container: '.container',
				content: '.main_content',
				button: '.button_wrapper > button'
			}, 'container') //returns {$container: $('.container'), $content: $('.container').find('.main_content'), $button: $('.container').find('.button_wrapper > button')}

			create_elements({
				container: '.container',
				content: '.main_content',
				button: '.button_wrapper > button'
			}, {
				test: 'hello world'
			}) //returns {test: 'hello world', $container: $('.container'), $content: $('.main_content'), $button: $('.button_wrapper > button')}

			create_elements({
				main_container: '.container',
				content: '.main_content',
				button: '.button_wrapper > button'
			}, {
				test: 'hello world'
			}, 'main_container') //returns {test: 'hello world', $main_container: $('.container'), $content: $('.container').find('.main_content'), $button: $('.container').find('.button_wrapper > button')}

			create_elements({
				main_container: function() {
					return '.test_container';
				},
				content: '.main_content',
				button: function() {
					return 'button';
				}
			}, {
				test: 'hello world'
			}, 'main_container') //returns {test: 'hello world', $main_container: $('.test_container'), $content: $('.test_container').find('.main_content'), $button: $('.test_container').find('button')}*/
			create_elements: (function () {
				//this function returns actual parameter to give in jquery
				var get_jquery_param = function (cur_param) {
					return typeof cur_param == 'function' ? cur_param() : cur_param;
				};

				return function (element_details, target_obj, container_key) {
					//if target is not provided and container is provided; then autoset
					if (typeof target_obj == 'string') {
						container_key = target_obj;
						target_obj = undefined;
					}

					//if target object is not provided then create new object
					target_obj = target_obj || {};

					var cur_param,
						//if container key is given then gets container value from element_details of that container key
						//if container value is function then it calls that function and return value will be used as container value and creates the jquery object for container
						$container = container_key ? $(get_jquery_param(element_details[container_key])) : null,
						$el;

					for (var key in element_details) {
						//if current key is same as provided container_key then no need to create jquery object again, since we have created earlier, stores that $container in $el
						if (key == container_key) {
							$el = $container;
						} else {
							//gets jquery paramer in the same way as did for container
							cur_param = get_jquery_param(element_details[key]);
							//if there is any container then finds jquery parameter in container else creates new jquery object from that jquery parameter by calling $(cur_param)
							$el = $container ? $container.find(cur_param) : $(cur_param);
						}

						//jquery object created above ($el) will be stored in target_obj at key prefixed by '$'
						target_obj['$' + key] = $el;
					}

					return target_obj;
				};
			})(),
			//FYI: jquery object stores the element in the order it occures in html
			//this function creates array of object from jquery object in the order of parent element's count in dom hierarchy
			/*params are
				$el - a jquery object of which you want to create array of elements
				from_outer_to_inner - this is optional; if true then top element in DOM hierarchy will come first and last element in DOM hierarchy will come last; and reverse if false is provided
			 */
			rearrange_by_parents_count: (function () {
				var data,

					set_parents_count = function () {
						data.push({
							el: this,
							parents_count: $(this).parentsUntil(vfs.global_variables.$body).length
						});
					};

				return function ($el, from_outer_to_inner) {
					data = [];

					$el.each(set_parents_count);

					//convert from_outer_to_inner to boolean and false if not provided
					from_outer_to_inner = Boolean(from_outer_to_inner || false);

					//sorts data in the order of 'parents_count' key; if from_outer_to_inner is false then it will arrange elements in the descending order of parents_count i.e. higher number of parents count comes first i.e. innermost element will come first
					return data.sort(vfs.utilities.functions.get_sort_fn({
						obj_key: 'parents_count',
						is_descending: !from_outer_to_inner
					}));
				};
			})(),
			//This website has custom plugin created like autocomplete and accordion; but these plugins are different from other third party jquery plugins. These custom plugins doesn't adds function to jquery object as we need much more functionality instead of just adding function to jquery object. So to create any jquery plugin, we call create_plugin_module by passing parameters
			/*This function will create plugin module, which can be used in future for many purpose like
				1. create instance of plugin
				2. create multiple instance of plugin by element selector
				3. to change default options of plugin at run time
				4. to call a function to all plugin instances by calling one method
				5. add global callbacks to all plugin instances
			*/
			/*params are
				plugin_module_name - name of plugin module like autocomplete, accordion
				common_obj_main_selector - provide selector to which element should auto create instance of plugin
					e.g. 'ul.accordion' given for accordion, so that we can call vfs.accordion.init_common_obj() which will create plugin instances for all 'ul.accordion' ellements in page;
				main_module - main plugin module which should be following format
					{
						constructor: plugin constructor, // this will be called on creating instance of plugin
						set_option_methods: { //when developer changes the options of instance of plugin by calling set_options method on plugin instance then corresponding key function will be called and then option value will be set
							option_key1: function,
							option_key2: function,
							...
						},
						prototype: { //this prototype will be set for the plugin class
							method_name1: function,
							method_name2: function,
							...
							//note: dont provide 'set_options' in prototype while calling create_plugin_module since it is added by this function only
						}
					}
				default_options - default options of a plugin; on creating instance of plugin, it will create options by merging default options and provided options
				Note: if plugin module has callbacks then provide list of callbacks in default_options.callbacks; also on_init callback will be added automatically in list of callbacks, on_init callback will be called on creating instance of plugin
				additional_features - this is optional; object containing additional features (additional method); that you want to add in plugin module (Note: currently it is not used by any plugin, just implemented by considering that there may come a purpose to add additional feature in future)
				allow_public - this is optional; type: boolean; if provided true then it will add create function in module which allows developer to create instance of a plugin on any jquery object
			*/
			/*each plugin module will be in object of below format
				{
					call_fn_to_all_obj: function type; this function will call a function to all the instances of current plugin module
					create: function type; if allow_public is set to true then this function will be added; this function allows developer to create instance of a plugin on any jquery object
					default_options: object type; developer can change default options at runtime (Note: changing in default_options will not change options of already created instances)
					global_callbacks: developer can add callback to any global callback; this callback will be called on all the instances of current plugin; first this global callback will be called and then provided option's callback will be called (Note: list of global_callbacks will be taken from default_options.callbacks)
					init_common_obj: developer can create instances for all the jquery object whose selector is given in 'common_obj_main_selector' param; this is generally called at initialization process (in $(document).ready) (Note: currently this is not called in main.js, since vue is used where we have called 'create' function in 'mounted' hook; but this can be used in non vue application)

					... (more properties will be added from additional_features if provided)
				}
			*/
			create_plugin_module: function (plugin_module_name, common_obj_main_selector, main_module, default_options, additional_features, allow_public) {
				//if additional_features is not provided and allow_public is provided then autoset
				if (typeof additional_features == "boolean") {
					allow_public = additional_features;
					additional_features = undefined;
				}

				//if additional_features is not provided then create new blank object
				additional_features = additional_features || {};

				//if callbacks is not provided then new blank object will be added in default_options.callbacks; and also on_init will be added in callbacks
				default_options.callbacks = default_options.callbacks || {};
				default_options.callbacks.on_init = null;

				//this all_obj will have all the instances created of current plugin
				var all_obj = [],

					//this function will be called when instance of plugin gets created
					//this function will create new options by merging default_options with passed_options
					//this new options will have list of callbacks as function instead of null
					//each callback function will first call global_callback and then call the callback provided in options
					create_options = (function () {
						var create_callback = function (callback_name, callback) {
							//get current global callback from module
							var cur_global_callbacks =
								_module.global_callbacks[callback_name];

							/*below function is the main callback which will be called by module by below statement options.callbacks.callback_name.call(this, event_data);*/
							return function (e) {
								//when callback is called from module, first global callback will be called and then passed option's callback (if provided) will called
								cur_global_callbacks._call(e, this);

								callback && callback.call(this, e);
							};
						};

						return function (passed_options) {
							//options is generated by deep merging default_options and passed_options to a new blank object
							var options = $.extend(true, {}, default_options, passed_options),
								callbacks = options.callbacks;

							//set each callback by calling create_callback by passing name of callback and callback in options
							for (var callback_name in callbacks)
								callbacks[callback_name] = create_callback(
									callback_name,
									callbacks[callback_name]
								);

							//return newly generated options
							return options;
						};
					})(),
					//this is the constructor of plugin class which will be called from module's create and init_common_obj functions
					/*params are
						$el - jquery object of any DOM element, this jquery object will have only 1 DOM element in it's set (which will be taken care by create and init_common_obj functions)
						options - this is the same options which is passed from create or init_common_obj functions
					*/
					main_constructor = function ($el, options) {
						this._$element = $el;

						//create options by merging default options and this passed options
						this._options = create_options(options);

						//calls the constructor from main_module (main_module is a parameter passed in create_plugin_module function)
						main_module.constructor.call(this);

						//current object is stored in data of $el jquery object in plugin_module_name key, so that developer can access and use this object at any place of script
						$el.data(plugin_module_name, this);

						//on_init callback will be called
						this._options.callbacks.on_init.call(this);
					},
					//this function will be called in the end of current function
					//this function will set prototype to main_constructor
					//default prototype will be set from main_module.prototype and from default_prototype 
					set_prototype = (function () {
						var default_prototype = {
							//set_options will be added to all the plugin class
							/*params are
								obj - options object containing optiona names and their values which are to be set
								prevent_checking - type : boolean; provide true if you want to prevent the checking of current and provided option value
							*/
							//this function will call main_module.set_option_methods option key method if provided and then option value will be set.
							set_options: function (obj, prevent_checking) {
								for (var key in obj) {
									//if prevent_checking is true then it will not check current and provided values, otherwise it will check values; if current and passed values are equal then will not call the set options methods and continues the for loop
									if (!prevent_checking && obj[key] == this._options[key]) continue;

									//calls the set_option_methods of current key if provided and pass new value; and after that sets the option value
									//Note: to access old value in set_option_methods, plugin module developer can use this._options[key]
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
					//this function will be called in the end of current function
					//this function will add init_common_obj function to plugin module
					check_set_init_common_obj = (function () {
						/*params are 
							all_selector_options - this is optional; this must be object in which key is selector of an element and value is an options object (Note: if not provided then default options will be used to all 'common_obj_main_selector' element)
						*/
						var init_common_obj = function (all_selector_options) {
							all_selector_options = all_selector_options || {};

							$(common_obj_main_selector).each(function () {
								var $this = $(this),
									cur_selector_options;

								for (var selector in all_selector_options) {
									//if current element $this matches selector then current options from all_selector_options will be stored in cur_selector_options and break the loop
									if ($this.is(selector)) {
										cur_selector_options = all_selector_options[selector];
										break;
									}
								}

								//create instance of plugin class by calling new main_constructor and push that instance to all_obj 
								all_obj.push(new main_constructor($this, cur_selector_options));
							});
						};

						return function () {
							//if common_obj_main_selector is not given then will not add init_common_obj function
							if (!common_obj_main_selector) return;

							_module.init_common_obj = init_common_obj;
						};
					})(),
					//this is the main plugin module which will be returned in this create_plugin_module function
					_module = {
						//developer can change default options at runtime (Note: changing in default_options will not change options of already created instances)
						default_options: default_options,

						//this function will call a function to all the instances of current plugin module
						/*params are
							$content_wrapper - this is optional; function will be called only on those plugin instances whose element (element means jquery object on which instance is created) comes inside $content_wrapper or an element itself is a $content_wrapper; if $content_wrapper is not provided then body will be used as $content_wrapper
							fn_name - name function which is to be called on plugin instances

							fn arguments - this is optional; Note: this is not given in function parameter, since it will be generated dynamically from built in arguments object; this will be passed to fn_name function which will be called on plugin instances
						*/
						call_fn_to_all_obj: function ($content_wrapper, fn_name) {
							//if content_wrapper is given then start index of fn arguments will be 2; but if content_wrapper is not given then start index of fn arguments will be 1 and also autoset parameters
							var fn_params_start_index = 2;

							if (typeof $content_wrapper == "string") {
								fn_name = $content_wrapper;
								$content_wrapper = undefined;
								fn_params_start_index = 1;
							}

							//if $content_wrapper is not provided then body will be used as $content_wrapper
							$content_wrapper = $content_wrapper || vfs.global_variables.$body;

							var content_wrapper = $content_wrapper[0],
								fn_params = Array.prototype.slice.call(arguments, fn_params_start_index);

							//loop for all_obj which contains all the instances of current plugin module; checks if any plugin instance's element is $content_wrapper or inside of $content_wrapper then calls the function by using apply and passes the fn_params
							for (var i = 0; i < all_obj.length; i++) {
								var cur_obj = all_obj[i];

								if (
									vfs.utilities.jQuery.is_or_contains(
										content_wrapper,
										cur_obj._$element[0]
									)
								)
									cur_obj[fn_name].apply(cur_obj, fn_params);
							}
						},

						//developer can add callback to any global callback; this callback will be called on all the instances of current plugin; first this global callback will be called and then provided option's callback will be called (Note: list of global_callbacks will be taken from default_options.callbacks)
						global_callbacks: (function () {
							var default_callbacks = default_options.callbacks,
								global_callbacks = {};

							for (var callback_name in default_callbacks)
								global_callbacks[callback_name] = new vfs.prototypes.callback();

							return global_callbacks;
						})()
					},
					//this function will be called in the end of current function
					//if allow_public is true then below function will be set to _module.create
					/*params are
					$el - jquery object on which you want to create instance of current plugin class
					options - this is optional; options object which you want to pass to the constructor of plugin class*/
					create_fn = function ($el, options) {
						//loop for each elements in jquery object; new instance will be called on that element and that instance will be added to all_obj
						return $el.each(function () {
							all_obj.push(new main_constructor($(this), options));
						});
					},
					//this function will be called in the end of current function
					//this function will add additional features object that you have passed in create_plugin_module function; if not provided then will not do any changes in module
					set_additional_features = function () {
						$.extend(true, _module, additional_features);
					},
					//this function will be called in the end of current function
					//if allow_public is passed true then create function will be added to module; create_fn function will be used as module.create
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
		//this sub module has all the operations related to classes
		classes: (function () {
			//below function will be used in has_any_class and has_all_class
			//the common code of both has_any_class and has_all_class is in has_class function
			/*params are
				$el - jquery object of an element
				classes - type : string / array[string]; if string is provided then classes must be seperated by space, it will then split by space (' ') and convert to array
				condition - function type; it will be called in if condition for each classes
				return_values - object of below format
					{
						on_condition_true: if condition function returns truthy value then has_class function will return value provided here
						on_end: if condition doesn't return any truthy value for any classes then value provided here will be returned
					}
			*/
			var has_class = function ($el, classes, condition, return_values) {
				//if classes is tring then convert it to array
				if (typeof classes == 'string')
					classes = classes.split(' ');

				for (var i = 0; i < classes.length; i++) {
					if (condition($el, classes[i]))
						return return_values.on_condition_true;
				}

				//if condition doesn't return any truthy value for any classes on_end value will be returned
				return return_values.on_end;
			},

				//this function checks if ANY one of the classes provided here are given in element; that means if element has ANY one of the given classes, then returns true otherwise false
				/*params are
					$el - jquery object of an element
					classes - type : string / array[string]; if string is provided then classes must be seperated by space
				*/
				has_any_class = (function () {
					var condition = function ($el, cur_class) {
						return $el.hasClass(cur_class);
					};

					return function ($el, classes) {
						return has_class($el, classes, condition, {
							on_condition_true: true,
							on_end: false
						});
					}
				})(),

				//this function checks if ALL of the classes provided here are given in element; if element has ALL of the given classes, then returns true otherwise false
				/*params are
					$el - jquery object of an element
					classes - type : string / array[string]; if string is provided then classes must be seperated by space
				*/
				has_all_class = (function () {
					var condition = function ($el, cur_class) {
						return !$el.hasClass(cur_class);
					};

					return function ($el, classes) {
						return has_class($el, classes, condition, {
							on_condition_true: false,
							on_end: true
						});
					}
				})(),

				//this function will replace the class of an element
				/*params are
					$el - jquery object of an element
					current_class - name of current class given to element that you want to replace with replace_class
					replace_class - name of class that you want to replace with
					prevent_checking - this is optional; type : boolean; if provided true it will directly remove current_class and add replace_class without checking the existance of current_class in the element, and if provided false it will first check the existance of current_class and then only replace the class
				*/
				replace_class = function ($el, current_class, replace_class, prevent_checking) {
					$el.each(function () {
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

		//this sub module has all the operations related to images (currently it has only on sub module i.e. load_event)
		image: {
			/*this sub module handles below operations related to image loading
				check_el_loaded - this is function type; which will check the image is loaded or not
				all_loaded_callbacks - this is callback prototype instance to which developer can add callback; when all the images in the page is loaded then only this callback will be called; if you pass call_on_single_image_load: true in options while adding callback, then callback will also gets called for each image load
			*/
			load_event: (function () {
				//all the images in the page will be stored in $all_el in form of jquery object
				var $all_el,

					//loaded_count keeps count of how many images gets loaded
					loaded_count = 0,

					//this init function will store all the images in the $all_el and sets load event to all the images
					/*params are
						$content_wrapper - this is optional; type: jquery object of an element; if passed, init function will initialize for all the images that comes under the $content_wrapper; and if not passed, then will initialize for all the images available in the page
					*/
					/*Note: this will not initialize for those images which has 'dont_add_event' class or images which are hidden (that means images that comes under element with css display: none)
						Also if there are 2 or more images with same src then only one of them will be added in $all_el
					*/
					init = (function () {
						var get_all_el = function ($content_wrapper) {
							var all_src = [];

							//not select the images which has 'dont_add_event' class
							return $content_wrapper.find('img:not(.dont_add_event)').filter(function () {
								if ($(this).is(':hidden'))
									return false;

								var src = this.src.toLowerCase(),
									src_found = $.inArray(src, all_src) != -1;

								if (!src_found)
									all_src.push(src);

								//if src not found in all_src then current image will be selected otherwise not
								return !src_found;
							});
						};

						return function ($content_wrapper) {
							//if $content_wrapper is not provided then body will used as $content_wrapper
							$content_wrapper = $content_wrapper || vfs.global_variables.$body;

							$all_el = get_all_el($content_wrapper);

							set_all_el_load_event();
						};
					})(),

					//this function will set load event to all the images from $all_el which are not loaded
					set_all_el_load_event = (function () {
						var loop_all_el = function () {
							//if current image is loaded then it will call loaded_from_all_el event; and if current image is not loaded then will add loading_completed=false property in current image and sets load event
							if (check_el_loaded(this)) {
								loaded_from_all_el.call(this);
							} else {
								this.loading_completed = false;
								$(this).one('load', loaded_from_all_el);
							}
						};

						return function () {
							$all_el.each(loop_all_el);
						};
					})(),

					//this is the event which will be called on load of image
					loaded_from_all_el = function () {
						var el = this;

						//sets loading_completed to true, increase loading count and calls all_loaded_callbacks
						el.loading_completed = true;

						loaded_count++;

						all_loaded_callbacks._call(get_event_obj($(this)));
					},

					//this function checks whether the image is loaded or not
					check_el_loaded = (function () {
						var check_dom_image_loaded = function (el) {
							//if image dom element has loading_completed=true or has complete=true (.complete is built in property which sets to true by browser is loaded) then 
							return el.loading_completed || el.complete;
						};

						/*params are
							el - jquery object of an element or DOM element
						*/
						//Note: if there are many images in jquery object and if any one of the image is not loaded from that jquery object then it will return false saying that 'el' is not loaded
						return function (el) {
							if (el instanceof jQuery) {
								var is_el_loaded = true;

								//loop for each images, and if any image is not loaded then is_el_loaded will have false value and the same will be returned from function, which will break the each loop
								el.each(function () {
									return is_el_loaded = check_dom_image_loaded(this);
								});

								return is_el_loaded;
							} else {
								return check_dom_image_loaded(el);
							}
						};
					})(),

					//this function gets the event object required to pass in calling callback from all_loaded_callbacks
					get_event_obj = function ($el) {
						return {
							$el: $el,
							loaded_count: loaded_count,
							total_count: $all_el.length
						};
					},

					/*this is the instance of callback prototype in which developer can add callback which will be called for following cases
						1. will get called on load of each image from $all_el when 'call_on_single_image_load' option is provided
						2. will get called when all the images from $all_el gets loaded (dont need to provided any option for this)
					*/
					all_loaded_callbacks = new vfs.prototypes.callback({
						//'on_add' function will get called when developer adds callback to all_loaded_callbacks
						/*this function should return object of below format
							{
								status: this status tells 'add' function (in callback prototype) that what to do with callback passed. For details about what are status then find 'main_callback.constants = {',
								event_obj: this is optional; if you pass status as 'do_both' or 'do_call' then this event_obj will be used in calling the passed callback in 'add' function
							}
						*/
						//the 'options' object passed in 'add' function will be forwarded to below function
						on_add: function (options) {
							var return_obj = {
								event_obj: get_event_obj()
							};

							//if options has 'call_on_single_image_load' as true and also there are some images loaded (but not all) from $all_el then passed callback will be called immediately and also pushed in callbacks array
							if (options.call_on_single_image_load === true &&
								loaded_count > 0 &&
								loaded_count != $all_el.length)
								return_obj.status = vfs.prototypes.callback.constants.do_both;
							//if all the images from $all_el is loaded then passed callback will be called immediately but will not be pushed in callbacks array
							else if (loaded_count == $all_el.length)
								return_obj.status = vfs.prototypes.callback.constants.do_call;
							//in other conditions, passed callback will be pushed in callbacks array but will not be called immediately
							else
								return_obj.status = vfs.prototypes.callback.constants.do_add;

							return return_obj;
						},
						//'call_condition' function will get called when this module emits all_loaded_callbacks by calling ._call
						//this function will get called for each and every callback in callbacks array
						//this function must return boolean value describing whether the current callback from loop should get called or not
						//the 'options' object passed in 'add' function will be forwarded to below function
						call_condition: function (options) {
							//if the options has call_on_single_image_load as true or all the images are loaded from $all_el then current callback from loop will be called
							return options.call_on_single_image_load === true || loaded_count == $all_el.length;
						}
					});

				return {
					init: init,
					check_el_loaded: check_el_loaded,
					all_loaded_callbacks: all_loaded_callbacks
				};
			})()
		},
		//this sub module has all the operations related to vertical scrollbar (i.e. y-scrollbar not for x-scrollbar)
		/*this sub module has below operations
			get_animate_top_of_el - it gets the scroll position of an element to animate the scrollbar (scrollbar is of scrollable parent element)
			animate - it will animate the scrollbar of an element to provided scroll position and animation duration
			animate_to_el - it will animate the scrollbar to provided element
		*/
		vertical_scroll: (function () {
			//this function will get the scrollbar position of an element; if an element is body then will return window's scrollbar position
			//$el param must be jquery object
			var get_scroll_top = function ($el) {
				if ($el.is('body'))
					return vfs.global_variables.$window.scrollTop();

				return $el.scrollTop();
			},

				//this function will return scrollable element of provided element
				//scrollable element can be provided element or any parent element in it's DOM hierarchy
				get_scrollable_el = (function () {
					//this function gets the css value of overflow property of provided element
					var get_overflow = function ($el) {
						if ($el.is('body'))
							return 'auto';

						var overflow = $el.css('overflow').toLowerCase();

						if (overflow == '')
							return $el.css('overflow-y').toLowerCase();

						return overflow;
					};

					//$el param must be jquery object
					return function ($el) {
						var $parent_el = $el,
							parent_overflow;

						//check every parent element in element's DOM hierarchy until we find scrollable parent element
						//if any parent element has overflow 'auto' or 'scroll' then return that parent element
						while (parent_overflow != 'auto' && parent_overflow != 'scroll') {
							$parent_el = $parent_el.parent();
							parent_overflow = get_overflow($parent_el);
						}

						return $parent_el;
					};
				})(),

				//'get_animate_top_of_el' function gets the scroll position of an element to animate the scrollbar (scrollbar is of scrollable parent element)
				get_animate_top_of_el = (function () {
					//'get_data' function is used to get the data of an element required to calculate the scroll position
					//this function would return data in the form of object
					var get_data = (function () {
						//'data_props_fn' has functions for each and every properties in data, each and every function returns value to set in data of that corresponding property
						//structure is used as array of object rather than simply object, since there are some proerty in the data whose value is dependent on another property's value; so independent property is given at top and most dependent property is given at bottom
						/*each and every fn function in data_props_fn will receive 2 below parameters
							elements - this is the object which will have below jquery objects of a DOM element
								{
									main_el: this is the main element passed in 'get_animate_top_of_el' function
									scrollable_el: this is the scrollable element of which scrollbar will animate
								}
							data - this is the main data object, this is used for those properties whose value is dependent on another properties
						*/
						var data_props_fn = [{
							//offset top position of main_el
							prop: 'el_offset_top',
							fn: function (elements) {
								return elements.$main_el.offset().top;
							}
						}, {
							//offset top position of scrollable_el
							prop: 'scrollable_el_offset_top',
							fn: function (elements) {
								return elements.$scrollable_el.offset().top;
							}
						}, {
							//outerHeight of main_el
							prop: 'el_height',
							fn: function (elements) {
								return elements.$main_el.outerHeight();
							}
						}, {
							//outerHeight of scrollable_el
							prop: 'scrollable_el_height',
							fn: function (elements) {
								return elements.$scrollable_el.outerHeight();
							}
						}, {
							//scroll position of scrollable_el
							prop: 'scroll_top',
							fn: function (elements) {
								return get_scroll_top(elements.$scrollable_el);
							}
						}, {
							//position of an main_el related scrollable_el
							prop: 'el_related_top',
							fn: function (elements, data) {
								if (elements.$scrollable_el.is('body'))
									return data.el_offset_top;

								return data.el_offset_top - data.scrollable_el_offset_top + data.scroll_top;
							}
						}, {
							//maximum scroll position of scrollable_el
							prop: 'max_scroll_top',
							fn: (function () {
								//this function will set auto height to scrollable element, so that we can get complete height of scrollable element and can calculate maximum scroll position of scrollable element
								var set_auto_height_temporary = function ($scrollable_el, data, fn, fn_param) {
									var height = vfs.utilities.css.get_inline_css($scrollable_el[0], 'height') || '',
										max_height = vfs.utilities.css.get_inline_css($scrollable_el[0], 'max-height') || '';

									/*set height and max-height to auto and none respectively
									Also set overflowY to 'scroll', because width of scrollable element increases when scrollbar disapears as a result content in scrollable element gets more width to fit thus decreases height of scrollable element; so when we set overflowY to 'scroll', scrollbar doesn't disappears and width of scrollable element doesn't change*/
									$scrollable_el.css({
										height: 'auto',
										maxHeight: 'none',
										overflowY: 'scroll'
									});

									//calls fn by passing fn_param which will set max_scroll_top
									fn(fn_param);

									//set css to perviously stored value and also set scroll position
									$scrollable_el.css({
										height: height,
										maxHeight: max_height,
										overflowY: ''
									});

									$scrollable_el.scrollTop(data.scroll_top);
								},

									//this will set max_scroll_top; formula for max_scroll_top of any scrollable element is, scrollable element's height (after setting some default css value to height and max-height) minus initial height (i.e. height before setting default css values to height and max-height)
									set_max_scroll_top = function (param) {
										param.max_scroll_top = param.$scrollable_el.outerHeight() - param.initial_height;
									};

								return function (elements, data) {
									//if scrollable element is body then max_scroll_top will be height of scrollable element minus height of window
									if (elements.$scrollable_el.is('body'))
										return data.scrollable_el_height - vfs.details.window_dimension.height;

									var param = {
										$scrollable_el: elements.$scrollable_el,
										initial_height: data.scrollable_el_height
									};

									set_auto_height_temporary(elements.$scrollable_el, data, set_max_scroll_top, param);

									return param.max_scroll_top;
								};
							})()
						}];

						return function (elements) {
							var data = {};

							//loop for each object in data_props_fn and set value in data by calling fn function of each object
							for (var i = 0; i < data_props_fn.length; i++)
								data[data_props_fn[i].prop] = data_props_fn[i].fn(elements, data);

							return data;
						};
					})(),

						//this object has functions for getting each type of scroll position of an element
						get_animate_top_fn = {
							//this will get scroll position of an element to move it to the top of scrollable element
							scroll_to_top: function (elements, data) {
								//since el_related_top is difference between screen top position of element and screen top position of scrollable element
								return data.el_related_top;
							},

							//this will get minimum amount of scrolling required to show an element in scrollable element's viewport
							/*formula is
								if an element's top position is less than scrollable element's top position then we need to show an element at top of scrollable element therefore 'get_animate_top_fn.scroll_to_top' will be used;
								if an element's bottom position is greater than scrollable element's bottom position then we need to show an element at bottom of scrollable element therefore get_animate_top_fn.scroll_to_top + scrollable_el_height - el_height;
								and if both of the above condition is false then no need to change scrollbar position, so just return current scroll position
							*/
							scroll_to_show: function (elements, data) {
								var scroll_to_top = get_animate_top_fn.scroll_to_top(elements, data),
									is_scrollable_el_body = elements.$scrollable_el.is('body'),
									match_offset_top = is_scrollable_el_body ? data.scroll_top : data.scrollable_el_offset_top,
									match_height = is_scrollable_el_body ? vfs.details.window_dimension.height : data.scrollable_el_height;

								//if scrollable element is body, then check element's screen top position with body scroll position; and if scrollable element is not body, then check element's screen top position with scrollable element's screen top position
								if (data.el_offset_top < match_offset_top)
									return scroll_to_top;

								//if scrollable element is body, then check element's screen bottom position with body's screen bottom position (formula for body's screen bottom position is, body's scroll position plus window height); and if scrollable element is not body, then check element's screen bottom position with scrollable element's screen bottom position (formula for scrollable element's screen bottom position is, scrollable element's screen top position plus screollable element's height)
								//formula for element's screen bottom position is, element's screen top position plus element's height
								else if (data.el_offset_top + data.el_height > match_offset_top + match_height)
									return scroll_to_top - match_height + data.el_height;

								else
									//if both of the above condition is false then no need to change scrollbar position, so just return current scroll position
									return data.scroll_top;
							}
						};

					/*params are
						$el - jQuery object of an element of which you want animation top
						animate_top_type - this is optional; if not provided then 'scroll_to_top' will be taken; type of animation top position; there are currently 2 type of animation top position
							i. scroll_to_top - this will get scroll position of an element to move it to the top of scrollable element
							ii. scroll_to_show - this will get minimum amount of scrolling required to show an element in scrollable element's viewport
					*/
					return function ($el, animate_top_type) {
						var elements = {
							$main_el: $el,
							$scrollable_el: get_scrollable_el($el)
						},
							animate_top,
							prev_scroll_top = elements.$scrollable_el.scrollTop(),
							data = get_data(elements);

						animate_top_type = animate_top_type || 'scroll_to_top';

						//get animate top of 'animate_top_type' from 'get_animate_top_fn'
						animate_top = get_animate_top_fn[animate_top_type](elements, data);

						//if animate_top is less than 0 then 0 will be taken; and if animate_top is greater than max_scroll_top then max_scroll_top will be taken
						animate_top = animate_top < 0 ? 0 : animate_top;
						animate_top = animate_top > data.max_scroll_top ? data.max_scroll_top : animate_top;

						elements.$scrollable_el.scrollTop(prev_scroll_top);

						return animate_top;
					};
				})(),

				//this function will animate scrollbar position of an element provided
				/*params are
					$el - this is optional; jQuery object of an element of which you want to animate scrollbar; if not provided then $('html, body') will be taken
					animate_top - this is the scrollbar position; to which you want to animate
					duration - duration in milliseconds; duration for animating scroll bar
					callback - this is optional; function type; this is animation complete callback
					behaviour - this is optional; if not provided it will take 'normal'; this describes what behaviour it should use when an element is already animating; there are 3 behaviours given below
						i. normal - when an element is animating, it will just stop animation to current stage and then starts animating scrollbar
						ii. prevent_if_animating - when an element is animating, it will prevent the animation of scrollbar
						iii. jump_to_end - when an element is animating, it will stop animation and jump to the end stage of animation and then start animating scrollbar
				*/
				//this function returns boolean value saying that scrollbar animation is called or not
				animate = function ($el, animate_top, duration, callback, behaviour) {
					//if $el is not provided and if callback is not provided then autoset
					if (typeof $el == 'number') {
						behaviour = callback;
						callback = duration;
						duration = animate_top;
						animate_top = $el;
						$el = undefined;
					}

					if (typeof callback == 'string') {
						behaviour = callback;
						callback = undefined;
					}

					//if $el is not provided then $('html, body') is used
					$el = $el || vfs.global_variables.$html_body;

					//if behaviour is not provided then 'normal' will be used
					behaviour = behaviour || 'normal';

					//if $el is html or if $el is body then $('html, body') will be used for $el
					if ($el.is('html, body'))
						$el = vfs.global_variables.$html_body;

					//if $el is animating and behaviour is 'prevent_if_animating' then this will return from here by returning false value saying animation is not called
					if (behaviour == 'prevent_if_animating' && $el.is(':animated'))
						return false;

					//if current scroll position is same as animation position of scrollbar, then animation will not be called
					if (get_scroll_top($el) != animate_top) {
						//if behaviour is provided as 'jump_to_end' then it will clear the animation queue and jum to the end stage of animation; otherwise it just stops to current stage; and after that it will call animation
						if (behaviour == 'jump_to_end')
							$el.stop(true, true);
						else
							$el.stop();

						$el.animate({
							scrollTop: animate_top
						}, duration, callback);

						//returns true saying animation is called 
						return true;
					} else if (callback != undefined) {
						//if current scroll position is same as animation position of scrollbar and callback is provided then it will call callback
						callback();
					}

					//if animation is called it will return from there by returning true value; but if animation is not called then it will reach here and returns false value saying that animation is not called
					return false;
				},

				//this function animates scrollbar to the provided element
				/*params are
					$el - jquery object of an element to which you want to animate scrollbar
					duration - duration in milliseconds; duration for animating scroll bar
					callback - this is optional; function type; this is animation complete callback
					options - this is optional; this is the object of below format
						{
							animate_top_type: this is optional; if not provided then 'scroll_to_top' will be taken; type of animation top position; there are currently 2 type of animation top position
								i. scroll_to_top - this will get scroll position of an element to move it to the top of scrollable element
								ii. scroll_to_show - this will get minimum amount of scrolling required to show an element in scrollable element's viewport
							behaviour: this is optional; if not provided it will take 'normal'; this describes what behaviour it should use when an element is already animating; there are 3 behaviours given below
								i. normal - when an element is animating, it will just stop animation to current stage and then starts animating scrollbar
								ii. prevent_if_animating - when an element is animating, it will prevent the animation of scrollbar
								iii. jump_to_end - when an element is animating, it will stop animation and jump to the end stage of animation and then start animating scrollbar
						}
				*/
				//this function returns boolean value saying that scrollbar animation is called or not
				animate_to_el = function ($el, duration, callback, options) {
					//if callback is not provided then autoset
					if (typeof callback == 'object') {
						options = callback;
						callback = undefined;
					}

					//if options is not provided then create new blank object
					options = options || {};

					//it will get scrollable element ant animation top position of scrollbar and pass it to animate function; and returns value whichever returned by animate
					return animate(
						get_scrollable_el($el),
						get_animate_top_of_el($el, options.animate_top_type),
						duration, callback, options.behaviour
					);
				};

			return {
				get_animate_top_of_el: get_animate_top_of_el,
				animate: animate,
				animate_to_el: animate_to_el
			};
		})(),
		//this sub module checks transition-duration/animation-duration and registers transitionend/animationend css events to jquery object
		/*e.g. vfs.utilities.set_animsition_one_time_event.transition_end($('...'), function() {
			...
		}, {
			...
		})*/
		//if transition-duration/animation-duration is not given then it will not register event
		//Note: functions are added programmatically in this sub module
		/*params are
			$el - jquery object of an element on which you want to set transitionend/animationend css event
			callback - function type; this will be called on transitionend/animationend css event
			options - this is the object of below format; all the properties of options are optional
				{
					check_duration: boolean type; default is true; it will check if transition-duration/animation-duration is zero or undefined then it will not set event and call callback; if not provided then will not check duration and sets event directly
					prevent_target_checking: boolean type; default is true; if provided true then it will call callback without checking event target with event current target; (we have used target checking since event can occur on children element's transitionend/animationend css event)
				}
		*/
		set_animsition_one_time_event: (function () {
			//keys in event_details will be function name in this module
			//value is an object which has event name to be used in jquery .on function and duration css property name
			var event_details = {
				transition_end: {
					event_str: 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
					duration_css: 'transition-duration'
				},
				animation_end: {
					event_str: 'webkitAnimationEnd oanimationend msAnimationEnd animationend',
					duration_css: 'animation-duration'
				}
			},

				//this default options used in return function of get_event_fn for generating complete options
				default_options = {
					check_duration: true,
					prevent_target_checking: true
				},

				//this function is called for dynamically adding functions in module
				//it accepts event_type (any property from event_details)
				get_event_fn = function (event_type) {
					var cur_event_details = event_details[event_type];

					//this is the main function which will be called on vfs.utilities.set_animsition_one_time_event.transition_end/animation_end
					return function ($el, callback, options) {
						//get details about transition-duration/animation-duration in form of number and unit
						var duration_obj = vfs.utilities.css.get_css_number_unit_details($el, cur_event_details.duration_css),
							options = options || {};

						options = $.extend({}, default_options, options);

						//if check_duartion is true and transition-duration/animation-duration is not given then call the callback for each element in jquery object $el
						if (options.check_duration && (duration_obj == undefined || duration_obj.number == undefined || duration_obj.number == 0)) {
							$el.each(function () {
								callback.call(this);
							});
							return;
						}

						/*registers transitionend/animationend css event; event will also occur on $el's children element's transitionend/animationend css event;
						This is the reason it checks event target with current target
						if prevent_target_checking is true then will not check event targets and calls the callback*/
						$el.on(cur_event_details.event_str, function (e) {
							if (options.prevent_target_checking || e.target == e.currentTarget) {
								$(this).off(cur_event_details.event_str);

								callback.call(this, e);
							}
						});
					};
				},

				_module = {};

			//loop event_details and set function in module
			for (var key in event_details)
				_module[key] = get_event_fn(key);

			return _module;
		})(),

		//this sub module has implementation for an element that you want to show/hide by slide; we have not used jquery's .slideDown and .slideUp since we need more functionality
		/*Below are the additional functionality it provides than jquery slide functions
			i. animate_extra_css: allows additional css to animate
			ii. callbacks.before_animation: can pass before animation callback which is used to set up design before slide begins
			iii. do_scroll: can animate scrollbar while sliding
		*/
		//you can call by vfs.utilities.slide_element.show or vfs.utilities.slide_element.hide
		//Note: functions are added programmatically in this sub module
		/* params are
			$el - jquery object of an element which you want to show/hide by slide animation
			duration - this is optional; duration in milliseconds; sliding animation duration; if not provided then it will directly show/hide element without animation
			animate_extra_css - this is optional; css to animate along with slide animation; below is the format
				{
					from: css_obj, //this 'from' css will be applied when $el's height is zero (starting stage of slideDown)
					to: css_obj //this 'to' css will be applied when $el's height is auto (ending stage of slideDown)
				}
				both css_obj (given in 'from' and 'to') must have same css properties
				e.g. for giving fade animation along with slide given below animate_extra_css
				{
					from: {opacity: 0},
					to: {opacity: 1}
				}
			callbacks - this is optional; this is the object having list of callbacksl below are the callbacks available
				{
					before_animation: this callback will be called before the sliding animation starts; when calling this callback $el will have display: block, so that you can write design setup code before sliding animation starts
					example for design setup is, called set_equal_children_height for accordion on_before_open
					on_complete: this callback is called after the slide animation completes
				}
			do_scroll - this is optional; booolean type; if provided true then animate the scrollbar of window to shift $el to top of screen
		 */
		slide_element: (function () {
			var slide_type = {
				//opposites of slide types is stored here, this is used in check_and_slide function
				swap_props: {
					'show': 'hide'
				},

				//details of each slide type is given here
				//keys in details will be function name in this module
				//value is an object which has details about corresponding slide type that will be used in check_and_slide function
				/*the format of each slide type details is given below
					{
						check_condition: function($el) {...},
						//this function runs at start of show/hide calling function; this checks whether it should proceed running of slide_element's show/hide function

						get_from_to_height_fn: {
							from: function($el, el_height) {...},
							to: function($el, el_height) {...}
						}
						//'get_from_to_height_fn' has functions which will return height of start and end stage (from and to stage) for slide animation to show/hide the element; each function will have el_height parameter which is height of element at current stage

						css_height_for_scroll_top: ''
						//when do_scroll is provided true then script needs to animate the scrollbar to $el's top position, for that it needs to set the height of $el, the value of css height property will be taken from 'css_height_for_scroll_top'

						from_to_keys: {
							from: '...',
							to: '...'
						}
						//since animate_extra_css object is provided for show function only, we need keys for 'from' and 'to' for hide function

						on_complete: function() {...}
						//this callback will be called when sliding animation completes
					}
				*/
				details: {
					//show means slideDown
					show: {
						get_from_to_height_fn: {
							from: function ($el, el_height) {
								//if element's current height (after giving display: block) is equal to height at end stage then it means element's height is not animating and will return start stage height as 0; but it element's current height and height at end stage is not equal which means element's height is animating then will return element's current height
								return el_height == $el.css('height', '').height() ? 0 : el_height;
							},
							to: function ($el) {
								return $el.css('height', '').height();
							}
						},
						//before getting scrolltop position of an element, css height value must set to blank so that element's height will be taken from linked css file
						css_height_for_scroll_top: '',
						//since animate_extra_css object is provided for show function only, 'from' and 'to' keys will be same
						from_to_keys: {
							from: 'from',
							to: 'to'
						}
					},
					//hide means slideUp
					hide: {
						//$el must have show class to do hide by slide animation
						check_condition: function ($el) {
							return $el.hasClass('show');
						},
						get_from_to_height_fn: {
							from: function ($el, el_height) {
								//whether the element's height is animating or not it will return element's current height (after giving display: block)
								return el_height;
							},
							to: function () {
								return 0;
							}
						},
						//before getting scrolltop position of an element, css height value must set to 0px
						css_height_for_scroll_top: '0px',
						//since animate_extra_css object is provided for show function only, 'from' and 'to' keys must be inverted
						from_to_keys: {
							from: 'to',
							to: 'from'
						},
						//we need to remove inline display property after sliding animation completes
						on_complete: function ($el) {
							$el.css('display', '');
						}
					}
				},

				//this function will be called when module.init will be called
				//we need all classes for slide animation which will be taken from keys of slide_type.details
				init_dynamic: function () {
					slide_type.all_classes = vfs.utilities.json_and_arr.get_all_keys(slide_type.details);
				}
			},

				//when developer calls show/hide function, 'check_and_slide' function will be called inside that function
				/*params are
					$el - same as provided for show/hide function
					type - any key from slide_type.details (i.e. show/hide)
					type_details - value from slide_type.details of a given type
					duration - same as provided for show/hide function
					animate_extra_css - this is optional; same as provided for show/hide function
					callbacks - this is optional; same as provided for show/hide function
					do_scroll - this is optional; same as provided for show/hide function
				*/
				check_and_slide = (function () {
					//all the callback names are provided here, this will be used in main check_and_slide function to autoset parameters by checking whether the passed callbacks has one of the below callback name as key or not
					var all_callbacks = ['before_animation', 'on_complete'],

						//this function will be called when slide animation completes
						animation_completed = function ($el, type_details, animate_extra_css, callbacks) {
							//remove height and overflow from inline style
							$el.css({
								'height': '',
								'overflow': ''
							});

							//remove all the css from inline style given in all_extra_css
							if (animate_extra_css != undefined)
								$el.css(vfs.utilities.json_and_arr.update_value($.extend({}, animate_extra_css), ''));

							if (type_details.on_complete)
								type_details.on_complete($el);

							//if on_complete callback is given in callbacks then will call the on_complete callback
							vfs.utilities.check_call_callback(callbacks, 'on_complete', $el);
						},

						//if do_scroll is provided then functions given in scroll_top object will be used
						scroll_top = {
							//this function will be called in start of check_and_slide function
							//this function return scroll animation position of an element by setting height of element provided in type_details
							//return value animate_top will be used in on_after_start
							on_before_start: function ($el, type_details) {
								//we need to store current height and current scroll position since changing height of an element can change scroll position of window
								var previous_height = $el.css('height'),
									previous_scroll_top = vfs.global_variables.$window.scrollTop(),
									animate_top;

								$el.css('height', type_details.css_height_for_scroll_top);

								animate_top = vfs.utilities.vertical_scroll.get_animate_top_of_el($el);

								$el.css('height', previous_height);
								vfs.global_variables.$html_body.scrollTop(previous_scroll_top);

								return animate_top;
							},

							//this function will be called at the end of check_and_slide function
							on_after_start: function (animate_top, duration) {
								//if duration is not given then directly set scrollTop of $('html, body') otherwise animate scrollbar
								if (duration)
									vfs.utilities.vertical_scroll.animate(animate_top, duration);
								else
									vfs.global_variables.$html_body.scrollTop(animate_top);
							}
						},

						//this function will generate css object from animate_extra_css for start and end stage by providing key as 'from' or 'to'
						//for show slide animation, 'from' will be used as start stage and 'to' will be used as end stage; and for hide slide animation, 'to' will be used as start stage and 'from' will be used as end stage
						get_css_obj_from_animation_details = function (animation_details, key) {
							var css_obj = {};

							for (var css_prop in animation_details)
								css_obj[css_prop] = animation_details[css_prop][key];

							return css_obj;
						};

					return function ($el, type, type_details, duration, animate_extra_css, callbacks, do_scroll) {
						if (!($el instanceof jQuery) || $el.length == 0)
							return false;

						//if element already has 'show' class for show slide animation or 'hide' class for hide slide animation then will not proceed; otherwise if type_details has check_condition and that check_condition returns false then also it will not proceed
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

					return function ($el, duration, animate_extra_css, callbacks, do_scroll) {
						return check_and_slide($el, type, type_details, duration, animate_extra_css, callbacks, do_scroll);
					};
				},

				_module = {
					init: slide_type.init_dynamic
				};

			for (var type in slide_type.details)
				_module[type] = get_slide_fn(type);

			return _module;
		})(),
		set_equal_children_height: (function () {
			var set = (function () {
				var children_selector,
					same_offset_top_children,
					previous_children_offset_top,
					max_height,
					cur_array_index,

					init_variables = function () {
						same_offset_top_children = [];
						previous_children_offset_top = null;
						max_height = [];
						cur_array_index = null;
					},

					set_children_max_height_data = (function () {
						var set = function ($children_el, $main_children_el) {
							$main_children_el = $main_children_el || $children_el;

							var min_height,
								main_children_el_height,
								children_offset_top;

							$main_children_el.css('height', '');

							min_height = $main_children_el.outerHeight();

							$main_children_el.css('height', 'auto');

							main_children_el_height = $main_children_el.outerHeight();

							children_offset_top = $children_el.offset().top;

							if (main_children_el_height < min_height) {
								main_children_el_height = min_height;
							}

							if (previous_children_offset_top !== null && previous_children_offset_top !== children_offset_top) {
								set_css_height(cur_array_index);
								children_offset_top = $children_el.offset().top;
							}

							if (previous_children_offset_top !== null && previous_children_offset_top === children_offset_top) {
								same_offset_top_children[cur_array_index] = same_offset_top_children[cur_array_index].add($main_children_el);
							} else {
								same_offset_top_children.push($main_children_el);
								max_height.push(0);
								cur_array_index = same_offset_top_children.length - 1;
							}

							if (max_height[cur_array_index] < main_children_el_height) {
								max_height[cur_array_index] = main_children_el_height;
							}

							previous_children_offset_top = children_offset_top;
						},

							loop_main_children = function () {
								set($(this));
							};

						return function () {
							var cur_children = $(this),
								cur_main_children_el = children_selector === '.' ? cur_children : cur_children.find(children_selector);

							cur_main_children_el.length > 1 ? cur_main_children_el.each(loop_main_children) : set(cur_children, cur_main_children_el);
						};
					})(),

					set_css_height = function (index) {
						same_offset_top_children[index].css('height', (max_height[index] + 1) + 'px');
					};

				return function (el) {
					var $el = $(el),
						$children_el,
						all_children_selectors = $el.attr('data-equal_children_height').split(',');

					for (var i = 0; i < all_children_selectors.length; i++) {
						children_selector = $.trim(all_children_selectors[i]);
						$children_el = $el.children(':not(.hidden)');

						init_variables();

						(children_selector == '.' ? $children_el : $children_el.find(children_selector)).css('height', '');

						$children_el.each(set_children_max_height_data);

						set_css_height(cur_array_index);
					}
				};
			})();

			return function ($content_wrapper) {
				$content_wrapper = $content_wrapper || vfs.global_variables.$body;

				var all_elements = vfs.utilities.jQuery.rearrange_by_parents_count(
					vfs.utilities.jQuery.outer_find($content_wrapper, '[data-equal_children_height]')
				);

				for (var i = 0; i < all_elements.length; i++)
					set(all_elements[i].el);

				return all_elements.length > 0;
			};
		})(),
		check_call_callback: function (callback, param, extra_param, condition, condition_param) {
			if (!callback)
				return;

			if (typeof extra_param == 'function') {
				condition_param = condition;
				condition = extra_param;
				extra_param = undefined;
			}

			if (typeof callback == 'function') {
				if (!condition || condition(condition_param))
					return callback(param, extra_param);
			} else if (typeof callback == 'object') {
				return vfs.utilities.check_call_callback(callback[param], extra_param, callback[param + '_param'], condition, condition_param); //here param name, first parameter is dynamic from name_param
			}
		},
		gtm_custom_event: function (category, action, label, event_name, with_page_and_language) {
			if (typeof event_name == 'boolean') {
				with_page_and_language = event_name;
				event_name = undefined;
			}

			event_name = event_name || 'custom_event';

			var other_properties = with_page_and_language ? {
				'Page Name': vfs.details.page.type.value,
				'Website Language': vfs.data.language_iso_code
			} : {};

			dataLayer.push($.extend({}, other_properties, {
				'event': event_name,
				'dl_category': category,
				'dl_action': action,
				'dl_label': label
			}));
		}
	};

	vfs.country_data = {
		autoformat_and_generate: (function () {
			var resident_country_data_keys = ["visa_and_permits", "passport_services"],

				country_name_sort_fn,
			
				autoformat_resident_countries = function (data_key) {
					var resident_countries = vfs.data[data_key].sort(country_name_sort_fn);

					for (var i = 0; i < resident_countries.length; i++)
						resident_countries[i].visiting.sort(country_name_sort_fn);
				},
				generate_visiting_countries = (function () {
					var generate_details = function (data_key) {
						var resident_countries = vfs.data[data_key],
							cur_visiting_countries,
							cur_visiting_name,
							visiting_countries = {};

						for (var i = 0; i < resident_countries.length; i++) {
							cur_visiting_countries = resident_countries[i].visiting;

							for (var j = 0; j < cur_visiting_countries.length; j++) {
								cur_visiting_name = cur_visiting_countries[j].name;
								visiting_countries[cur_visiting_name] =
									visiting_countries[cur_visiting_name] || [];
								visiting_countries[cur_visiting_name].push(
									$.extend({}, cur_visiting_countries[j], {
										name: resident_countries[i].name
									})
								);
							}
						}

						return visiting_countries;
					},
						autoformat_details = function (visiting_countries) {
							var new_visiting_countries = [],
								cur_resident_countries,
								all_visiting_names = vfs.utilities.json_and_arr
									.get_all_keys(visiting_countries)
									.sort();

							for (var i = 0; i < all_visiting_names.length; i++) {
								cur_resident_countries = visiting_countries[
									all_visiting_names[i]
								].sort(country_name_sort_fn);

								new_visiting_countries.push({
									name: all_visiting_names[i],
									resident: cur_resident_countries
								});
							}

							return new_visiting_countries;
						};

					return function (data_key) {
						vfs.data[data_key + '_visiting_countries'] = autoformat_details(
							generate_details(data_key)
						);
					};
				})(),

				generate_flag_styles = (function () {
					var flag_styles,

						set_flag_style_config = [{
							data_key: 'geographic_details'
						}, {
							data_key: 'geographic_duplicates',
							get_flag_position: function (country, value) {
								return vfs.data.geographic_details[value].flag;
							}
						}];

					return function () {
						flag_styles = {};

						for (var i = 0; i < set_flag_style_config.length; i++) {
							var country_data = vfs.data[set_flag_style_config[i].data_key],
								get_flag_position = set_flag_style_config[i].get_flag_position;

							for (var country in country_data) {
								var cur_country_value = country_data[country],
									flag_position;

								if (cur_country_value == null)
									continue;

								flag_position = get_flag_position ? get_flag_position(country, cur_country_value) : cur_country_value.flag;

								flag_styles[country] = {
									left: flag_position[0] * -100 + "%",
									top: flag_position[1] * -100 + "%"
								};
							}
						}

						vfs.data.all_flag_styles = flag_styles;
					};
				})();

			return function () {
				var cur_key;

				country_name_sort_fn = vfs.utilities.functions.get_sort_fn(vfs.data.countries_sort_config);

				for (var i = 0; i < resident_country_data_keys.length; i++) {
					cur_key = resident_country_data_keys[i];

					autoformat_resident_countries(cur_key);
					generate_visiting_countries(cur_key);
				}

				generate_flag_styles();
			};
		})(),
		get_geographic_details: function (country_name) {
			return vfs.data.geographic_details[
				vfs.data.geographic_duplicates[
				country_name
				] || country_name
			];
		}
	};

	vfs.dynamic_columns = (function () {
		var column_details_attr = 'data-column-details',
			column_details_selector = '[' + column_details_attr + ']',
			column_index_class_names = ['first', 'second', 'third', 'fourth', 'fifth'],

			column_options,
			extra_classes,

			init = function () {
				column_options = vfs.data.dynamic_columns.column_options;
				extra_classes = vfs.data.dynamic_columns.extra_classes;

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

					if (cur_column != column) {
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

				return function ($content_wrapper) {
					$content_wrapper = $content_wrapper || vfs.global_variables.$body;

					$content_wrapper.find(column_details_selector).each(loop_all_column_details);
				};
			})();

		return {
			init: init,
			set_column: set_column
		};
	})();

	vfs.all_owl_carousel = (function () {
		var selector_details,

			data,

			init = function () {
				selector_details = vfs.data.all_owl_carousel;

				var $el,
					events;

				data = {};

				for (var selector in selector_details) {
					$el = $(selector);

					if (!$el.length || $el.children().length < 2)
						continue;

					$el.addClass('owl-carousel');

					events = selector_details[selector].events;

					for (var event_name in events)
						$el.on(event_name, events[event_name]);

					data[selector] = {
						$el: $el,
						carousel: $el.owlCarousel(selector_details[selector].options).data('owl.carousel')
					};

					data[selector].carousel.refresh();
				}
			},

			get_obj_calling_fn = function (data_key, call_fn) {
				var main_args = Array.prototype.slice.call(arguments).slice(2);

				return function () {
					for (var selector in data)
						data[selector][data_key][call_fn].apply(data[selector][data_key], main_args.length == 0 ? arguments : main_args);
				};
			},

			refresh = get_obj_calling_fn('carousel', 'refresh'),

			multi_time_refresh = function (times_count) {
				times_count = times_count || 10;

				refresh();
				vfs.utilities.functions.call_multi_time(refresh, 1000, times_count);
			};

		return {
			init: init,
			multi_time_refresh: multi_time_refresh,
			refresh: refresh,
			trigger: get_obj_calling_fn('$el', 'trigger')
		};
	})();

	//to prevent default browser based bookmark behaviour with custom animated scrolling bookmark behaviour
	vfs.init_smooth_scroll_bookmark = (function () {
		var link_clicked = function (e) {
			animate_to_hash(vfs.utilities.url.hash.get($(this).attr('href')));

			e.preventDefault();
		},

			animate_to_hash = function (hash) {
				vfs.utilities.vertical_scroll.animate_to_el(
					$('#' + hash),
					vfs.data.bookmark_scroll_duration
				);
			},

			filter_links = function () {
				return vfs.utilities.url.is_current(this) && vfs.utilities.url.hash.get($(this).attr('href'));
			};

		return function () {
			//filter only those links which has give bookmark link (e.g. #test) and sets click event
			$('a[href]').filter(filter_links).click(link_clicked);

			var cur_hash = vfs.details.page.hash.value;

			//if currently url has hash value then also animate scroll to desired element position
			if (cur_hash)
				animate_to_hash(cur_hash);
		};
	})();

	//sets all anchor tag
	vfs.set_all_links = (function () {
		var loop_all_links = (function () {
			var all_set_fn = [function ($el) { //check and remove href and target which has link to current page
				var cur_href = $el.attr('href');

				if (cur_href.indexOf('#') == 0 || !vfs.utilities.url.is_current(cur_href) || $el.hasClass('prevent_remove_link'))
					return;

				$el.removeAttr('href target');
			}, function ($el) { /*check and set general link 
				(e.g. changes general/disclaimer.html to general/disclaimer.html?from_section=0)*/
				if (vfs.utilities.url.is_external(this) ||
					!/.*\/general\/.+/i.test(vfs.utilities.url.get_link_properties(this).pathname))
					return;

				$el.attr('href', vfs.utilities.url.params.set($el.attr('href'), vfs.data.section_query_param_name, vfs.details.page.section_index.value));
			}];

			return function () {
				var $this = $(this);

				for (var i = 0; i < all_set_fn.length; i++)
					all_set_fn[i].call(this, $this);
			};
		})();

		return function () {
			$('a[href]').each(loop_all_links);
		};
	})();

	//to replace strong or bold content with <span class="bold (replace_with_class given in config.js)">...</span>. Since strong/b tag changes font-weight which creates blurry text on custom font (like InterUI), script replace it with class where font-family: InterUI-Bold is given.
	vfs.replace_bold = (function () {
		var check_font_family,

			loop_all_elements = (function () {
				var filter_node_fn = function () {
					return this.nodeType === 3;
				},

					replace_node = function () {
						$(this).wrap("<span class=\"" + vfs.data.replace_bold.replace_with_class + "\"></span>");
					};

				return function () {
					var $this = $(this),
						tag_name = $this.prop("tagName").toUpperCase();

					if (!$this.hasClass("dont_convert")) {
						if (tag_name == "STRONG" || tag_name == "B") {
							$this.replaceWith("<span class=\"" + vfs.data.replace_bold.replace_with_class + "\">" + $this.html() + "</span>");
						} else if (($this.css("font-weight") == "bold" || $this.css("font-weight") == "bolder" || parseFloat($this.css("font-weight")) >= 600) &&
							vfs.utilities.string.get_formatted_font_family($this.css("font-family")) == check_font_family) {
							//filter text node and wrap it with span
							$this.contents().filter(filter_node_fn).each(replace_node);
						}
					}
				};
			})();

		return function ($content_wrapper) {
			$content_wrapper = $content_wrapper || vfs.global_variables.$body;

			check_font_family = vfs.utilities.string.get_formatted_font_family(vfs.data.replace_bold.check_font_family);

			$content_wrapper.find('*').each(loop_all_elements);
		};
	})();

	vfs.init_google_tag_manager = (function () {
		var config,

			add_gtm_js = function () {
				dataLayer.push({
					'gtm.start': new Date().getTime(),
					event: 'gtm.js'
				});

				vfs.global_variables.$body.append($('<script>').attr({
					async: true,
					src: 'https://www.googletagmanager.com/gtm.js?id=' + config.gtm_js_id
				}));
			}
			

		return function () {
			config = vfs.data.google_tag_manager;

			window.dataLayer = window.dataLayer || [];

			add_gtm_js();
		};
	})();

	vfs.autocomplete = vfs.utilities.jQuery.create_plugin_module('autocomplete', '[data-autocomplete]', (function () {
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
									animation_completed
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

	vfs.accordion = vfs.utilities.jQuery.create_plugin_module('accordion', 'ul.accordion', (function () {
		var set_option_methods = {
			button_selector: (function () {
				var event_name = 'click.accordion.button',

					class_name = 'accordion_button_wrapper',

					click_event = function (e) {
						click_button(e.data, $(this));
					};

				return function (obj, value) {
					obj._$all_li.children(obj._options.button_selector).off(event_name, click_event).removeClass(class_name);

					obj._$all_li.children(value).on(event_name, obj, click_event).addClass(class_name);
				};
			})(),
			content_selector: function (obj, value) {
				var class_name = 'accordion_content_wrapper';

				obj._$all_li.children(obj._options.content_selector).removeClass(class_name);

				obj._$all_li.children(value).addClass(class_name);
			},
			close_active_on_open: function (obj, value) {
				var $all_active_lis = obj._$all_li.filter('.active');

				if (value)
					tasks.close($all_active_lis.not($all_active_lis[0]));
			}
		},

			tasks = {
				details: {
					open: {
						must_have_active_class: false,
						set_class_fn: 'addClass',
						slide_fn: 'show',
						slide_callback_name: {
							before_animation: 'on_before_open',
							on_complete: 'on_open'
						}
					},
					close: {
						must_have_active_class: true,
						set_class_fn: 'removeClass',
						slide_fn: 'hide',
						slide_callback_name: {
							before_animation: 'on_before_close',
							on_complete: 'on_close'
						}
					}
				},

				//this will set main function for slide like tasks.open and tasks.close

				init_dynamic: (function () {
					var get_task_fn = function (task_type) {
						var cur_task_details = tasks.details[task_type];

						return function ($li, duration, main_obj, do_fade) {
							tasks.run($li, cur_task_details, duration, main_obj, do_fade);
						};
					};

					return function () {
						for (var key in tasks.details)
							tasks[key] = get_task_fn(key);
					};
				})(),

				run: (function () {
					var fade_css = {
						'opacity': {
							from: 0,
							to: 1
						}
					},

						get_slide_callbacks = (function () {
							var all_slide_callback_fn = function ($el, param) {
								var main_obj = param.main_obj;

								main_obj._options.callbacks[param.main_callback_name].call(main_obj, param.data);
							};

							return function (task_details, main_obj, data) {
								if (!main_obj)
									return null;

								var slide_callback_name = task_details.slide_callback_name,
									callbacks = {};

								for (var key in slide_callback_name) {
									callbacks[key] = all_slide_callback_fn;
									callbacks[key + '_param'] = {
										main_obj: main_obj,
										data: data,
										main_callback_name: slide_callback_name[key]
									};
								}

								return callbacks;
							};
						})();

					return function ($li, task_details, main_obj) {
						var duration = main_obj ? main_obj._options.slide_duration : 0,
							do_fade = main_obj ? main_obj._options.fade_on_slide : false;

						$li.each(function () {
							var $this = $(this),
								$cur_content_wrapper = $this.children('.accordion_content_wrapper');

							if ($this.hasClass('active') != task_details.must_have_active_class)
								return;

							$this[task_details.set_class_fn]('active');

							vfs.utilities.slide_element[task_details.slide_fn](
								$cur_content_wrapper,
								duration,
								do_fade ? fade_css : undefined,
								get_slide_callbacks(task_details, main_obj, {
									index: $this.index(),
									$li: $this,
									$button_wrapper: $this.children('.accordion_button_wrapper'),
									$content_wrapper: $cur_content_wrapper
								})
							);
						});
					};
				})()
			},

			constructor = function () {
				set_all_li(this);

				set_option_methods.close_active_on_open(this, this._options.close_active_on_open);

				tasks.open(this._$all_li.filter('.active').removeClass('active'));
			},

			set_all_li = function (obj) {
				obj._$all_li = obj._$element.children('li');

				set_option_methods.button_selector(obj, obj._options.button_selector);
				set_option_methods.content_selector(obj, obj._options.content_selector);
			},

			click_button = (function () {
				var get_li = function (obj, $el) {
					if (typeof $el == 'number') {
						if ($el >= 0 && $el < obj._$all_li.length)
							return $(obj._$all_li[$el]);

						return null;
					}

					if (!$el || !($el instanceof jQuery) || $el.length != 1)
						return null;

					var $li = $el.is(obj._$all_li) ? $el : null,
						$closest_li;

					if (!$li) {
						$closest_li = $el.closest('li');
						$li = $closest_li.is(obj._$all_li) ? $closest_li : null;
					}

					return $li;
				};

				return function (obj, $el) {
					var $li = get_li(obj, $el),
						$active_lis = $(),
						previous_scroll_top,
						animate_top,
						duration = obj._options.slide_duration;

					if (!$li || obj._$all_li.children(obj._options.content_wrapper).is(':animated'))
						return false;

					if ($li.hasClass('active')) {
						tasks.close($li, obj);
					} else {
						if (obj._options.close_active_on_open)
							$active_lis = obj._$all_li.filter('.active');

						if (obj._options.animate_scroll_on_open) {
							previous_scroll_top = vfs.global_variables.$window.scrollTop();

							tasks.open($li);
							tasks.close($active_lis);

							animate_top = vfs.utilities.vertical_scroll.get_animate_top_of_el($li);

							tasks.close($li);
							tasks.open($active_lis);

							vfs.global_variables.$html_body.scrollTop(previous_scroll_top);
						}

						tasks.open($li, obj);
						tasks.close($active_lis, obj);

						if (obj._options.animate_scroll_on_open)
							vfs.utilities.vertical_scroll.animate(animate_top, duration);
					}

					return true;
				};
			})(),

			prototype = {
				set_all_li: function () {
					set_all_li(this);
				},
				click_button: function ($el) {
					click_button(this, $el);
				}
			};

		tasks.init_dynamic();

		return {
			constructor: constructor,
			set_option_methods: set_option_methods,
			prototype: prototype
		};
	})(), {
			button_selector: '.button_wrapper',

			content_selector: '.content_wrapper',

			slide_duration: 700,

			animate_scroll_on_open: true,

			close_active_on_open: true,

			fade_on_slide: true,

			callbacks: {
				on_before_open: null,
				on_open: null,
				on_before_close: null,
				on_close: null
			}
		}, true);

})(jQuery);