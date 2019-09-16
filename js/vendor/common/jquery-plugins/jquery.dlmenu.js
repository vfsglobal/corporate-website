/**
 * jquery.dlmenu.js v1.0.0

 */
 
;( function( $, window, undefined ) {

	'use strict';

	// global
	var Modernizr = window.Modernizr, $body = $( 'body' );

	$.DLMenu = function( options, element ) {
		this.$el = $( element );
		if( window.ieVersion != null )
			this.$el.children( 'ul.dl-menu' ).css('display','none');
		this._init( options );
	};

	// the options
	$.DLMenu.defaults = {
		// classes for the animation effects
		animationClasses : { _in : 'dl-animate-in-1', _out : 'dl-animate-out-1' }
	};

	$.DLMenu.prototype = {
		_init : function( options ) {
			// options
			this.options = $.extend( true, {}, $.DLMenu.defaults, options );
			// cache some elements and initialize some variables
			this._config();
			
			var animEndEventNames = {
					'WebkitAnimation' : 'webkitAnimationEnd',
					'OAnimation' : 'oAnimationEnd',
					'msAnimation' : 'MSAnimationEnd',
					'animation' : 'animationend'
				},
				transEndEventNames = {
					'WebkitTransition' : 'webkitTransitionEnd',
					'MozTransition' : 'transitionend',
					'OTransition' : 'oTransitionEnd',
					'msTransition' : 'MSTransitionEnd',
					'transition' : 'transitionend'
				};
			// animation end event name
			this.animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ] + '.dlmenu';
			// transition end event name
			this.transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ] + '.dlmenu',
			// support for css animations and css transitions
			this.supportAnimations = Modernizr.cssanimations,
			this.supportTransitions = Modernizr.csstransitions;

			this._initEvents();
		},
		_config : function() {
			this.open = false;
			this.$trigger = this.$el.children( 'button' );
			this.$menu = this.$el.children( 'ul.dl-menu' );
			this.$menuitems = this.$menu.find( 'li:not(.dl-back)' );
			this.$back = this.$menu.find( 'li.dl-back' );
		},
		_initEvents : function() {
			var self = this,
				close_on_outside_event = function(e) {
					if(!self.open || self.$el.is(e.target) || self.$el.has(e.target).length)
						return;
					
					self._closeMenu();
				};

			$body.on({
				'click.dlmenu': close_on_outside_event,
				'touchstart.dlmenu': close_on_outside_event
			});

			this.$trigger.on( 'click.dlmenu', function() {
				if( self.open ) {
					self._closeMenu();
				} 
				else {
					if( window.ieVersion != null )
						self.$menu.css('display','block');
					self._openMenu();
					// clicking somewhere else makes the menu close
				}
			} );

			this.$menuitems.on( 'click.dlmenu', function( event ) {
				
				event.stopPropagation();

				var $item = $(this),
					$submenu = $item.children( 'ul.dl-submenu' );

				if( $submenu.length > 0 ) {

					var $flyin = $submenu.clone().insertAfter( self.$menu ).addClass( self.options.animationClasses._in ),
						onAnimationEndFn = function() {
							self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses._out ).addClass( 'dl-subview' );
							$item.addClass( 'dl-subviewopen' ).parents( '.dl-subviewopen:first' ).removeClass( 'dl-subviewopen' ).addClass( 'dl-subview' );
							$flyin.remove();
						};

					self.$menu.addClass( self.options.animationClasses._out );

					if( self.supportAnimations ) {
						self.$menu.on( self.animEndEventName, onAnimationEndFn );
					}
					else {
						onAnimationEndFn.call();
					}

					return false;

				}
			} );

			this.$back.on( 'click.dlmenu', function( event ) {
				var $this = $( this ),
					$submenu = $this.parents( 'ul.dl-submenu:first' ),
					$item = $submenu.parent(),


					$flyin = $submenu.clone().insertAfter( self.$menu ).addClass( self.options.animationClasses._out );

				var onAnimationEndFn = function() {
					self.$menu.off( self.animEndEventName ).removeClass( self.options.animationClasses._in );
					$flyin.remove();
				};

				self.$menu.addClass( self.options.animationClasses._in );

				if( self.supportAnimations ) {
					self.$menu.on( self.animEndEventName, onAnimationEndFn );
				}
				else {
					onAnimationEndFn.call();
				}

				$item.removeClass( 'dl-subviewopen' );
				
				var $subview;
				
				if( $this.hasClass('dl-home') )
					$subview = $this.closest('ul.dl-menu');
				else
					$subview = $this.parents( '.dl-subview:first' );
				
				if( $subview.is( 'li' ) ) {
					$subview.addClass( 'dl-subviewopen' );
				}
				$subview.removeClass( 'dl-subview' );
				
				return false;

			} );
			
		},
		_closeMenu : function() {
			var self = this,
				onTransitionEndFn = function() {
					self.$menu.off( self.transEndEventName );
					if( window.ieVersion != null )
					self.$menu.css('display','none');
				};
			
			this.$menu.removeClass( 'dl-menuopen' );
			this.$menu.addClass( 'dl-menu-toggle' );
			this.$trigger.removeClass( 'dl-active' );
			
			if( this.supportTransitions ) {
				this.$menu.on( this.transEndEventName, onTransitionEndFn );
			}
			else {
				onTransitionEndFn.call();
			}

			this.open = false;

			this.$el.removeClass('dl-menuopen');

			if(this.$el.hasClass('disable_page_on_open'))
				$body.removeClass('disabled_by_dlmenu');
		},
		_openMenu : function() {
			this.$menu.addClass( 'dl-menuopen dl-menu-toggle' ).on( this.transEndEventName, function() {
				$( this ).removeClass( 'dl-menu-toggle' );
			} );
			this.$trigger.addClass( 'dl-active' );
			this.open = true;

			this.$el.addClass('dl-menuopen');

			if(this.$el.hasClass('disable_page_on_open'))
				$body.addClass('disabled_by_dlmenu');
		},
		// resets the menu to its original state (first level of options)
		_resetMenu : function() {
			this.$menu.removeClass( 'dl-subview' );
			this.$menuitems.removeClass( 'dl-subview dl-subviewopen' );
		}
	};

	var logError = function( message ) {
		if ( window.console ) {
			window.console.error( message );
		}
	};

	$.fn.dlmenu = function( options ) {
		if ( typeof options === 'string' ) {
			var args = Array.prototype.slice.call( arguments, 1 );
			this.each(function() {
				var instance = $.data( this, 'dlmenu' );
				if ( !instance ) {
					logError( "cannot call methods on dlmenu prior to initialization; " +
					"attempted to call method '" + options + "'" );
					return;
				}
				if ( !$.isFunction( instance[options] ) || options.charAt(0) === "_" ) {
					logError( "no such method '" + options + "' for dlmenu instance" );
					return;
				}
				instance[ options ].apply( instance, args );
			});
		} 
		else {
			this.each(function() {	
				var instance = $.data( this, 'dlmenu' );
				if ( instance ) {
					instance._init();
				}
				else {
					instance = $.data( this, 'dlmenu', new $.DLMenu( options, this ) );
				}
			});
		}
		return this;
	};

} )( jQuery, window );

