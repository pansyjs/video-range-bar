(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory())
    : typeof define === 'function' && define.amd
    ? define(factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      (global.videoRangeBarVue = factory()));
})(this, function () {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(
          target,
          Object.getOwnPropertyDescriptors(source),
        );
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(
            target,
            key,
            Object.getOwnPropertyDescriptor(source, key),
          );
        });
      }
    }

    return target;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError('Cannot call a class as a function');
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ('value' in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z =
    ".video-range-bar {\n  position: relative;\n  width: 100%;\n}\n.video-range-bar .video-range-bar-right,\n.video-range-bar .video-range-bar-left {\n  z-index: 20;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  background: #2d8cf0;\n  height: 100%;\n  cursor: ew-resize;\n}\n.video-range-bar .video-range-bar-right::before,\n.video-range-bar .video-range-bar-left::before,\n.video-range-bar .video-range-bar-right::after,\n.video-range-bar .video-range-bar-left::after {\n  display: inline-block;\n  content: '';\n  position: absolute;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 1px;\n  height: 30%;\n  background: #fff;\n}\n.video-range-bar .video-range-bar-right::before,\n.video-range-bar .video-range-bar-left::before {\n  left: calc(50% - 2px);\n}\n.video-range-bar .video-range-bar-right::after,\n.video-range-bar .video-range-bar-left::after {\n  left: calc(50% + 2px);\n}\n.video-range-bar .video-range-bar-right {\n  transform: translateX(50%);\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n.video-range-bar .video-range-bar-left {\n  transform: translateX(-50%);\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.video-range-bar .video-range-bar-content {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  height: 100%;\n  box-sizing: border-box;\n  border-top: 2px solid;\n  border-bottom: 2px solid;\n  background: transparent;\n}\n";
  styleInject(css_248z);

  var VideoRangeBar = /*#__PURE__*/ (function () {
    // 0 不能移动  1：左边， 2： 右边
    //左滑块
    //右滑块
    function VideoRangeBar(config) {
      _classCallCheck(this, VideoRangeBar);

      this.el = void 0;
      this.background = void 0;
      this.height = void 0;
      this.width = 0;
      this.left = 0;
      this.right = 0;
      this.sliderOffsetLeft = void 0;
      this.sliderOffsetRight = void 0;
      this.sliderWidth = void 0;
      this.theme = void 0;
      this.moveType = 0;
      this.sliderLeftBar = void 0;
      this.sliderRightBar = void 0;
      this.contentBar = void 0;
      this.startLeftSlider = void 0;
      this.startRightSlider = void 0;
      this.moveLeftSlider = void 0;
      this.moveRightSlider = void 0;
      var id = config.id,
        el = config.el,
        _config$height = config.height,
        height = _config$height === void 0 ? 40 : _config$height,
        _config$sliderWidth = config.sliderWidth,
        sliderWidth = _config$sliderWidth === void 0 ? 14 : _config$sliderWidth,
        _config$sliderOffsetL = config.sliderOffsetLeft,
        sliderOffsetLeft =
          _config$sliderOffsetL === void 0 ? 0 : _config$sliderOffsetL,
        _config$sliderOffsetR = config.sliderOffsetRight,
        sliderOffsetRight =
          _config$sliderOffsetR === void 0 ? 0 : _config$sliderOffsetR,
        _config$theme = config.theme,
        theme = _config$theme === void 0 ? '#2d8cf0' : _config$theme,
        _config$background = config.background,
        background =
          _config$background === void 0 ? 'transparent' : _config$background,
        _config$startLeftSlid = config.startLeftSlider,
        startLeftSlider =
          _config$startLeftSlid === void 0
            ? function () {}
            : _config$startLeftSlid,
        _config$startRightSli = config.startRightSlider,
        startRightSlider =
          _config$startRightSli === void 0
            ? function () {}
            : _config$startRightSli,
        _config$moveLeftSlide = config.moveLeftSlider,
        moveLeftSlider =
          _config$moveLeftSlide === void 0
            ? function () {}
            : _config$moveLeftSlide,
        _config$moveRightSlid = config.moveRightSlider,
        moveRightSlider =
          _config$moveRightSlid === void 0
            ? function () {}
            : _config$moveRightSlid;
      var dom = el || (id && document.getElementById(id));

      if (!(dom instanceof HTMLElement)) {
        throw new Error(
          '[VideoRangeBar] element should be an instance of HTMLElement',
        );
      }

      this.el = dom;
      this.height = height;
      this.sliderOffsetLeft = sliderOffsetLeft;
      this.sliderOffsetRight = sliderOffsetRight;
      this.sliderWidth = sliderWidth;
      this.theme = theme;
      this.background = background;
      this.startLeftSlider = startLeftSlider;
      this.startRightSlider = startRightSlider;
      this.moveLeftSlider = moveLeftSlider;
      this.moveRightSlider = moveRightSlider;
      this.createTemplate();
      var sliderLeftDom = dom.querySelector('.video-range-bar-left');
      var sliderRightDom = dom.querySelector('.video-range-bar-right');
      var barContentDom = dom.querySelector('.video-range-bar-content');
      this.sliderRightBar = sliderRightDom;
      this.sliderLeftBar = sliderLeftDom;
      this.contentBar = barContentDom;
      this.addEventListener();
      this.getBoundingClientRect();
    }

    _createClass(VideoRangeBar, [
      {
        key: 'createTemplate',
        value: function createTemplate() {
          var height = this.height,
            theme = this.theme,
            sliderOffsetLeft = this.sliderOffsetLeft,
            sliderOffsetRight = this.sliderOffsetRight,
            sliderWidth = this.sliderWidth,
            background = this.background,
            el = this.el;
          var template = '<div class="video-range-bar" style="height:'
            .concat(height, 'px;background:')
            .concat(
              background,
              '">\n                        <div  class="video-range-bar-left" style="left:',
            )
            .concat(sliderOffsetLeft, 'px;width:')
            .concat(sliderWidth, 'px;background:')
            .concat(
              theme,
              '"></div>\n                        <div class="video-range-bar-content"  style="left:',
            )
            .concat(sliderOffsetLeft, 'px;right: ')
            .concat(sliderOffsetRight, 'px;border-color:')
            .concat(
              theme,
              '"></div>\n                        <div class="video-range-bar-right" style="right:',
            )
            .concat(sliderOffsetRight, 'px;width:')
            .concat(sliderWidth, 'px;background:')
            .concat(theme, '"></div>\n                      </div>');
          el.innerHTML = template;
        }, // 鼠标按下或触摸开始
      },
      {
        key: 'start',
        value: function start(moveType) {
          this.moveType = moveType;
          var sliderOffsetLeft = this.sliderOffsetLeft,
            sliderOffsetRight = this.sliderOffsetRight,
            width = this.width;

          if (moveType == 1) {
            this.startLeftSlider(sliderOffsetLeft / width);
          }

          if (moveType == 2) {
            this.startRightSlider((width - sliderOffsetRight) / width);
          }
        }, // 鼠标松开或触摸结束
      },
      {
        key: 'end',
        value: function end() {
          if (this.moveType === 0) return;
          this.moveType = 0;
        }, // 鼠标移动或触摸移动
      },
      {
        key: 'move',
        value: function move(e) {
          var clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
          var moveType = this.moveType,
            right = this.right,
            left = this.left,
            sliderOffsetLeft = this.sliderOffsetLeft,
            sliderOffsetRight = this.sliderOffsetRight,
            sliderRightBar = this.sliderRightBar,
            sliderWidth = this.sliderWidth,
            sliderLeftBar = this.sliderLeftBar,
            width = this.width,
            contentBar = this.contentBar;
          var range1 = clientX - left;
          var max1 = width - sliderOffsetRight - sliderWidth / 2;
          var range2 = right - clientX;
          var max2 = width - sliderOffsetLeft - sliderWidth / 2;

          switch (moveType) {
            case 0:
              return;
            // 左

            case 1:
              if (range1 <= 0) {
                sliderLeftBar.style.left = '0px';
                contentBar.style.left = '0px';
                this.sliderOffsetLeft = 0;
              } else if (range1 > max1) {
                sliderLeftBar.style.left = ''.concat(max1, 'px');
                contentBar.style.left = ''.concat(max1, 'px');
                this.sliderOffsetLeft = max1;
              } else {
                sliderLeftBar.style.left = ''.concat(range1, 'px');
                contentBar.style.left = ''.concat(range1, 'px');
                this.sliderOffsetLeft = range1;
              }

              this.moveLeftSlider(this.sliderOffsetLeft / width);
              break;
            // 右

            case 2:
              if (range2 <= 0) {
                sliderRightBar.style.right = '0px';
                contentBar.style.right = '0px';
                this.sliderOffsetRight = 0;
              } else if (range2 > max2) {
                sliderRightBar.style.right = ''.concat(max2, 'px');
                contentBar.style.right = ''.concat(max2, 'px');
                this.sliderOffsetRight = max2;
              } else {
                sliderRightBar.style.right = ''.concat(range2, 'px');
                contentBar.style.right = ''.concat(range2, 'px');
                this.sliderOffsetRight = range2;
              }

              this.moveRightSlider((width - this.sliderOffsetRight) / width);
              break;
          }
        }, // 监听事件
      },
      {
        key: 'addEventListener',
        value: function addEventListener() {
          var sliderLeftBar = this.sliderLeftBar,
            sliderRightBar = this.sliderRightBar;
          var that = this;
          document.addEventListener('resize', function () {
            that.getBoundingClientRect();
          }); // 设备兼容

          if ('ontouchstart' in document) {
            sliderLeftBar.addEventListener(
              'touchstart',
              function () {
                that.start(1);
              },
              false,
            );
            sliderRightBar.addEventListener(
              'touchstart',
              function () {
                that.start(2);
              },
              false,
            );
            document.addEventListener(
              'touchmove',
              function (e) {
                that.move(e);
              },
              false,
            );
            document.addEventListener(
              'touchend',
              function () {
                that.end();
              },
              false,
            );
          } else {
            sliderLeftBar.addEventListener(
              'mousedown',
              function () {
                that.start(1);
              },
              false,
            );
            sliderRightBar.addEventListener(
              'mousedown',
              function () {
                that.start(2);
              },
              false,
            );
            document.addEventListener(
              'mousemove',
              function (e) {
                that.move(e);
              },
              false,
            );
            document.addEventListener(
              'mouseup',
              function () {
                that.end();
              },
              false,
            );
          }
        }, // 获取容器元素尺寸位置
      },
      {
        key: 'getBoundingClientRect',
        value: function getBoundingClientRect() {
          var _this$el$getBoundingC = this.el.getBoundingClientRect(),
            left = _this$el$getBoundingC.left,
            right = _this$el$getBoundingC.right,
            width = _this$el$getBoundingC.width;

          this.left = left;
          this.right = right;
          this.width = width;
        },
      },
    ]);

    return VideoRangeBar;
  })();

  var script = {
    name: 'VideoRangeBar',
    props: {
      config: {
        type: Object,
        default: function _default() {
          return {};
        },
      },
    },
    videoRangeBar: null,
    mounted: function mounted() {
      this.instance();
    },
    methods: {
      instance: function instance() {
        this.videoRangeBar = new VideoRangeBar(
          _objectSpread2(
            _objectSpread2({}, this.config),
            {},
            {
              el: this.$refs.videoRange,
            },
          ),
        );
      },
    },
  };

  function normalizeComponent(
    template,
    style,
    script,
    scopeId,
    isFunctionalTemplate,
    moduleIdentifier /* server only */,
    shadowMode,
    createInjector,
    createInjectorSSR,
    createInjectorShadow,
  ) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true;
      // functional template
      if (isFunctionalTemplate) {
        options.functional = true;
      }
    }
    // scopedId
    if (scopeId) {
      options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
      // server build
      hook = function (context) {
        // 2.3 injection
        context =
          context || // cached call
          (this.$vnode && this.$vnode.ssrContext) || // stateful
          (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
        // 2.2 with runInNewContext: true
        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        }
        // inject component styles
        if (style) {
          style.call(this, createInjectorSSR(context));
        }
        // register component module identifier for async chunk inference
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      // used by ssr in case component is cached and beforeCreate
      // never gets called
      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode
        ? function (context) {
            style.call(
              this,
              createInjectorShadow(context, this.$root.$options.shadowRoot),
            );
          }
        : function (context) {
            style.call(this, createInjector(context));
          };
    }
    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        const originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        const existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return script;
  }

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c('div', { ref: 'videoRange' });
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */

  /* style inject SSR */

  /* style inject shadow dom */

  const __vue_component__ = /*#__PURE__*/ normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined,
  );

  __vue_component__.install = function (Vue) {
    var options =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    Vue.component(
      options.name ? options.name : __vue_component__.name,
      __vue_component__,
    );
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(__vue_component__);
  }

  return __vue_component__;
});
