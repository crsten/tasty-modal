'use strict';var _typeof=typeof Symbol==='function'&&typeof Symbol.iterator==='symbol'?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==='function'&&obj.constructor===Symbol?'symbol':typeof obj};;(function(){if(!window.Tasty)window.Tasty={};function Modal(options){if(!options)options={};var ValidTypes=['info','question','success','error'];var Options={title:'Delicious announcement!',type:'info',closeOnClick:true,icon:undefined,content:undefined,buttons:[{title:'Got it!',event:function event(){Self.close()}}]};var Element={};var animationEvent=whichAnimationEvent();function build(){Element.MainContainer=function(){var el=document.createElement('div');el.classList.add('tasty-modal');el.addEventListener('click',function(event){if(event.target===Element.MainContainer&&Options.closeOnClick)Self.close()});return el}();Element.Container=function(){var el=document.createElement('div');el.classList.add('tasty-modal-container');Element.MainContainer.appendChild(el);return el}();Element.Icon=function(){var el=document.createElement('div');el.classList.add('tasty-modal-icon');Element.Container.appendChild(el);return el}();Element.InnerContainer=function(){var el=document.createElement('div');el.classList.add('tasty-modal-inner');Element.Container.appendChild(el);return el}();Element.Title=function(){var el=document.createElement('h1');Element.InnerContainer.appendChild(el);return el}();Element.Content=function(){var el=document.createElement('div');el.classList.add('tasty-modal-content');Element.InnerContainer.appendChild(el);return el}();Element.Buttons=function(){var el=document.createElement('div');el.classList.add('tasty-modal-buttons');Element.InnerContainer.appendChild(el);return el}();Render.Title();Render.Buttons()}function Open(){document.body.appendChild(Element.MainContainer);function openAnimationEnd(){Element.MainContainer.classList.remove('tasty-modal-open');Element.Container.removeEventListener(animationEvent,openAnimationEnd)}Element.Container.addEventListener(animationEvent,openAnimationEnd);Element.MainContainer.classList.add('tasty-modal-open')}function Close(){var el=document.querySelector('.tasty-modal');function closeAnimationEnd(){Element.MainContainer.removeEventListener(animationEvent,closeAnimationEnd);Element.MainContainer.classList.remove('tasty-modal-close');document.body.removeChild(el)}Element.MainContainer.addEventListener(animationEvent,closeAnimationEnd);Element.MainContainer.classList.add('tasty-modal-close')}var Render={Title:function Title(){Element.Title.textContent=Options.title},Type:function Type(){ValidTypes.forEach(function(type){Element.Container.classList.remove('tasty-modal-'+type)});Element.Container.classList.add('tasty-modal-'+Options.type)},Content:function Content(){Element.Content.innerHTML=Options.content},Icon:function Icon(){Element.Icon.backgroundImage='url('+Options.icon},Buttons:function Buttons(){Element.Buttons.innerHTML='';Options.buttons.forEach(function(btn){var button=document.createElement('button');if(Options.type=='info'||Options.type=='question'){button.classList.add('tasty-modal-button')}else button.classList.add('tasty-modal-button-'+Options.type);if(typeof btn.event=='function')button.addEventListener('click',btn.event.bind(Self));button.innerHTML=btn.title;Element.Buttons.appendChild(button)})}};var Self=Object.defineProperties({},{'title':{get:function get(){return Options.title},set:function set(value){if(typeof value=='string')Options.title=value;Render.Title()}},'type':{get:function get(){return Options.type},set:function set(value){if(ValidTypes.indexOf(value)>-1)Options.type=value;else console.error('Invalid type! Valid types: ',ValidTypes);Render.Type();Render.Buttons()}},'content':{get:function get(){return Options.content},set:function set(value){if(typeof value=='string')Options.content=value;Render.Content()}},'icon':{get:function get(){return Options.icon},set:function set(value){if(typeof value=='string')Options.icon=value;else if(!value)Options.icon=null;Render.Icon()}},'closeOnClick':{get:function get(){return Options.closeOnClick},set:function set(value){Options.closeOnClick=value?true:false}},'buttons':{get:function get(){return Options.buttons},set:function set(value){//Should check if object is valid here...
if(value instanceof Array){Options.buttons=value}else if((typeof value==='undefined'?'undefined':_typeof(value))=='object'){Options.buttons=[value]}Render.Buttons()}}});build();Object.keys(options).forEach(function(key){if(key in Options)Self[key]=options[key]});Self.open=Self.show=Open;Self.close=Self.hide=Close;return Object.freeze(Self)}window.Tasty.Modal=window.Tasty.Popsicle=Modal;function whichAnimationEvent(){var t;var el=document.createElement('fakeelement');var animations={'animation':'animationend','OAnimation':'oAnimationEnd','MozAnimation':'animationend','WebkitAnimation':'webkitAnimationEnd'};for(t in animations){if(el.style[t]!==undefined){return animations[t]}}}})();
//# sourceMappingURL=tasty-modal.js.map