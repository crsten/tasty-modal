;(function(){
	if(!window.Tasty) window.Tasty = {};
 
	function Modal(options) {
		if(!options) options = {};
		let ValidTypes = ['info','question','success','error']
		let Options = {
			title: 'Delicious announcement!',
			type: 'info',
			closeOnClick: true,
			icon: undefined,
			content: undefined,
			buttons: [
				{
					title: 'Got it!',
					event: () => {Self.close()}
				}
			]
		};
		let Element = {};
		let animationEvent = whichAnimationEvent();

		function build(){
			Element.MainContainer = (() => {
				let el = document.createElement('div');
				el.classList.add('tasty-modal');

				el.addEventListener('click',(event) => {
					if(event.target === Element.MainContainer && Options.closeOnClick) Self.close();
				});

				return el;
			})();

			Element.Container = (() => {
				let el = document.createElement('div');
				el.classList.add('tasty-modal-container');

				Element.MainContainer.appendChild(el);

				return el;
			 })();

			Element.Icon = (() => {
				let el = document.createElement('div');
				el.classList.add('tasty-modal-icon');

				Element.Container.appendChild(el);

				return el;
			})();

			Element.InnerContainer = (() => {
				let el = document.createElement('div');
				el.classList.add('tasty-modal-inner');

				Element.Container.appendChild(el);

				return el;
			})();

			Element.Title = (() => {
				let el = document.createElement('h1');
				Element.InnerContainer.appendChild(el);

				return el;
			})();

			Element.Content = (() => {
				let el = document.createElement('div');
				el.classList.add('tasty-modal-content');

				Element.InnerContainer.appendChild(el);

				return el;
			})();

			Element.Buttons = (() => {
				let el = document.createElement('div');
				el.classList.add('tasty-modal-buttons');

				Element.InnerContainer.appendChild(el);

				return el;
			})();

			Render.Title();
			Render.Buttons();
		}

		function Open(){
			document.body.appendChild(Element.MainContainer);
			function openAnimationEnd(){
				Element.MainContainer.classList.remove('tasty-modal-open');
				Element.Container.removeEventListener(animationEvent,openAnimationEnd);
			}
			Element.Container.addEventListener(animationEvent,openAnimationEnd);
			Element.MainContainer.classList.add('tasty-modal-open');
		}

		function Close(){
			let el = document.querySelector('.tasty-modal');
			function closeAnimationEnd(){
				Element.MainContainer.removeEventListener(animationEvent,closeAnimationEnd);
				Element.MainContainer.classList.remove('tasty-modal-close');
				document.body.removeChild(el);
			}
			Element.MainContainer.addEventListener(animationEvent,closeAnimationEnd);
			Element.MainContainer.classList.add('tasty-modal-close');
		}

		let Render = {
			Title: () => {
				Element.Title.textContent = Options.title;
			},
			Type: () => {
				ValidTypes.forEach(function(type){
					Element.Container.classList.remove(`tasty-modal-${type}`);
				});
				Element.Container.classList.add(`tasty-modal-${Options.type}`);
			},
			Content: () => {
				Element.Content.innerHTML = Options.content;
			},
			Icon: () => {
				Element.Icon.backgroundImage = `url(${Options.icon}`;
			},
			Buttons: () => {
				Element.Buttons.innerHTML = '';
				Options.buttons.forEach((btn) => {
					let button = document.createElement('button');

					if(Options.type == 'info' || Options.type == 'question'){
						button.classList.add('tasty-modal-button');
					} else button.classList.add(`tasty-modal-button-${Options.type}`);

					if(typeof btn.event == 'function') button.addEventListener('click',btn.event.bind(Self));
					button.innerHTML = btn.title;
					Element.Buttons.appendChild(button);
				});
			}
		};

		let Self = Object.defineProperties({},{
			'title': {
				get: () => Options.title,
				set: (value) => {
					if(typeof value == 'string') Options.title = value;
					Render.Title();
				}
			},
			'type': {
				get: () => Options.type,
				set: (value) => {
					if(ValidTypes.indexOf(value) > -1) Options.type = value;
					else console.error('Invalid type! Valid types: ',ValidTypes);
					Render.Type();
					Render.Buttons();
				}
			},
			'content': {
				get: () => Options.content,
				set: (value) => {
					if(typeof value == 'string') Options.content = value;
					Render.Content();
				}
			},
			'icon': {
				get: () => Options.icon,
				set: (value) => {
					if(typeof value == 'string') Options.icon = value;
					else if(!value) Options.icon = null;
					Render.Icon();
				}
			},
			'closeOnClick': {
				get: () => Options.closeOnClick,
				set: (value) => {
					Options.closeOnClick = (value) ? true : false;
				}
			},
			'buttons': {
				get: () => Options.buttons,
				set: (value) => {
					//Should check if object is valid here...
					if (value instanceof Array) {
						Options.buttons = value;
					}else if(typeof value == 'object') {
						Options.buttons = [value];
					}
					Render.Buttons();
				}
			}
		});

		build();

		Object.keys(options).forEach(key => {
			if(key in Options) Self[key] = options[key];
		});


		Self.open = Self.show = Open;
		Self.close = Self.hide = Close;

		return Object.freeze(Self);
	}

	window.Tasty.Modal = window.Tasty.Popsicle = Modal;

	function whichAnimationEvent(){
		var t;
		var el = document.createElement('fakeelement');
		var animations = {
			'animation':'animationend',
			'OAnimation':'oAnimationEnd',
			'MozAnimation':'animationend',
			'WebkitAnimation':'webkitAnimationEnd'
		}

		for(t in animations){
			if( el.style[t] !== undefined ){
				return animations[t];
			}
		}
	}

})();
