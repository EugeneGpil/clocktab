import load_font from './load_font';
import assert from '@brillout/assert';
import {sleep} from '../../../tab-utils/sleep';
import loadFontList from './loadFontList';
import ml from '../../ml';
import setBackground from './setBackground';

export default init_options;
export {get_option};
export {on_font_loaded};

export class TabOptions {
  constructor({
    option_spec_list,
    preset_list,
    text_container,
    options_container,
    on_any_change,
  }) {
    this.option_spec_list = option_spec_list;
    this.preset_list = preset_list;
    this.text_container = text_container;
    this.options_container = options_container;
    this.on_any_change = on_any_change;

    instantiate_options();
  }

  get_option(option_id) {
    const option = this.option_list.find(opt => opt.option_id === option_id);
    assert(option, {option_id});
    return option.option_value;

var getOpt;
function get_option(...args){
  return getOpt(...args);
}
function set_getOpt({option_list, preset_list}) {
  const random_theme = get_random_theme
  var randomTheme = (function()
  {
  //var random = Math.floor(Math.random()*ml.len(THEME_LIST));
    var random = Math.floor(Math.random()*Object.keys(THEME_LIST).length);
    var counter=0;
    for(var ret in THEME_LIST) if(counter++===random) return ret;
  })();

  getOpt=function(option_id) {
    if( option_id!=='theme' ){
      var theme = getOpt('theme');
      if(theme==='random') theme=randomTheme;
      if( theme && THEME_LIST[theme] && (option_id in THEME_LIST[theme])) {
        return THEME_LIST[theme][option_id];
      }
    }
  };

}

  }

  on_font_loaded() {
    let resolveAwaitClockFont;
    const awaitClockFont = new Promise(r => resolveAwaitClockFont = r);
    return promise;
  }

  instantiate_options() {
    this.option_list = this.option_spec_list.map(({
        option_id,
        option_description,
        option_default,
        option_type,
      }) => {
        const args = {
          option_id,
          option_description,
          option_default,
          tab_options: this,
        };
        if( option_type === 'font-input' ){
          return new FontOption(args);
        }
        if( option_type === 'preset-input' ){
          return new PresetOption(args);
        }
        if( option_type === 'color-input' ){
          return new ColorOption(args);
        }
        if( option_type === 'text' ){
          return new TextOption(args);
        }
        if( option_type === 'text-shadow-input' ){
          return new TextShadowOption(args);
        }
      })
    )
  }

  generate_dom() {
    this.option_list.forEach(opt => {
      opt.generate_dom();
    });
  }

  hide_show_options() {
    this.option_list.forEach(opt => {
      const to_hide = (
        opt.option_dependency && !this.get_option(opt.option_dependency) ||
        opt.option_negative_dependency && this.get_option(opt.option_negative_dependency)
      );
      if( to_hide ){
        opt.hide();
      } else {
        opt.show();
      }
    });
  }
}


function generate_font_input({option_id, option_description}) {
  const {input_el} = generate_input({input_tag: 'select', option_id, option_description});

  input_el.style.width = '90px';
}
function generate_preset_input({option_id, option_description}, preset_list) {
  const {input_el} = generate_input({input_tag: 'select', option_id, option_description});

  input_el.style.width = '83px';

  input_el.innerHTML = '<option label="<custom>" value="">&lt;custom&gt;</option><option label="<random>" value="random">&lt;random&gt;</option>';
  for(var preset_name in preset_list) {
    var option_el = document.createElement('option');
    option_el.innerHTML = preset_name;
    option_el.value     = preset_name;
    input_el.appendChild(option_el);
  }
}

function generate_text_input({option_placeholder, option_default}) {
  const {input_el, label_el} = generate_input({input_tag: 'input', input_type: 'text', option_id, option_description});

  if(option_placeholder) {
    input_el.placeholder = option_placeholder;
  }

  const prefill = option_placeholder || option_default;
  if( prefill ){
    input_el.size = prefill.length*3/4;
  } else {
    input_el.style.width = '35px';
  }
}

function generate_input({}) {
}


class Option {
  constructor({option_id, option_description, tab_options}) {
    this.option_id = option_id;
    this.option_description = option_description;
    this.tab_options = tab_options;
  }

  generate_dom() {
    const {input_tag, input_type, option_id, option_description, option_default} = this;

    const on_input_change = () => {this.input_change_listener()};

    const {label_el, input_el} = generate_dom({input_tag, input_type, option_id, option_description, option_default, on_input_change});

    this.label_el = label_el;
    this.input_el = input_el;
  }

  input_change_listener() {
    this.tab_options.hide_show_options();
    this.tab_options.on_any_change();
  }

  get option_value() {
    return this.input_el.value;
  }

  hide() {
    hide_show_el(this.label_el, true);
  }
  show() {
    hide_show_el(this.label_el);
  }
}

class BooleanOption extends Option {
  constructor(args) {
    super(args);
    this.input_tag = 'input';
    this.input_type = 'checkbox';

  }
  generate_dom() {
    super.generate_dom();
    this.label_el['classList']['add']('pointer-cursor');
  }
  get option_value() {
    return !!this.input_el.checked;
  }
}

class ColorOption extends Option {
  constructor(args) {
    super(args);
    this.input_tag = 'input';
    this.input_type = 'color';
  }
  generate_dom() {
    super.generate_dom();
    this.input_el.style.width = '35px';
    this.label_el['classList']['add']('pointer-cursor');
  }
}
class TextColorOption extends ColorOption {
  input_change_listener() {
    this.tab_options.text_container.style.color = this.value;
    super.input_change_listener();
  }
}

class TextShadowOption extends TextOption {
  input_change_listener() {
    this.tab_options.text_container.style.textShadow = this.value;
    super.input_change_listener();
  }
}

class PresetOption extends SelectOption {
  change_effect() {
    if( this.is_custom_theme() ) {
      const preset_fonts = (
        Object.values(this.tab_options.preset_list)
        .map(preset => TODO preset.clock_font)
      );
      loadFontList(fonts);
    }
  }

  is_custom_theme() {
    return this.option_value==='';
  }
}

class BackgroundOption extends TextOption {
  change_effect() {
    const bg_image_val = getOpt('bg_image');
    const bg_color_val = getOpt('bg_color');
    setBackground(bg_image_val || bg_color_val);
  }
}

class TextFontOption extends FontOption {
  change_effect() {
    async function load_clock_font() {
      const font_name = getOpt('clock_font');

      await load_font(font_name);

      if( font_name !== getOpt('clock_font') ){
        return;
      }

      if( font_name === text_container.style.fontFamily ){
        return;
      }

      text_container.style.fontFamily = font_name;
    }
  }
}




function generate_dom({input_tag, input_type, option_id, option_description, option_default, on_input_change}) {
  assert(input_tag);
  assert(input_type);
  assert(option_id);
  assert(option_description);
  assert(option_default!==undefined);
  assert(on_input_change);

  const label_el = document.createElement('label');

  assert(['select', 'input'].includes(input_tag));
  const input_el = document.createElement(input_tag);
  input_el.id   = option_id;
  if( input_type ) input_el.setAttribute('type', input_type);

  const description_el = document.createElement('span');
  description_el.innerHTML = option_description;//+'&nbsp;';

  if( input_type==='checkbox' ){
    label_el.appendChild(input_el);
    label_el.appendChild(description_el);
  } else {
    label_el.appendChild(description_el);
    label_el.appendChild(input_el);
  }
  this.options_container.appendChild(label_el);

//ml.persistantInput=function(id,listener,default_,keyUpDelay,noFirstListenerCall)
  ml.persistantInput(
    option_id,
    on_input_change,
    option_default,
    0,
    true
  );

  return {label_el, input_el};
}

function hide_show_el(el, to_hide) {
  el.style.width      = to_hide ? '0px'     :''       ;
  el.style.height     = to_hide ? '0px'     :''       ;
  el.style.visibility = to_hide ? 'hidden'  :'visible';
  el.style.position   = to_hide ? 'absolute':''       ;
  el.style.zIndex     = to_hide ? '-1'      :''       ;
}