const dataController = (() => {

	const players = [];

	function shuffle(a) {

    		for (let i = a.length - 1; i > 0; i--) {
    			let j = Math.floor(Math.random() * (i + 1));
    			[a[i], a[j]] = [a[j], a[i]];
  			}
	};

	return {
		getPlayers: () => {
			return players;
		},

		addPlayer(player) {

			let arr = players.map(el => el.name);

			if (arr.indexOf(player) !== -1) {

				console.log('This name is already added');

				//elements.randomArea.innerHTML = "<p style='color: red'>This name is already added!</p>";

			} else if (!player.replace(/\s/g, '').length) {

				console.log('input field is empty');

				//elements.randomArea.innerHTML = "<p style='color: red'>Input field is empty!</p>";

			} else {
				let num;

				if (players.length > 0) {
				num = players[players.length - 1].id + 1;
				} else {
				num = 0;
				}
				players.push({id: num, name:player});
			}
		},

		deletePlayer: name => {
			let index;
			
			const arr = players.map(el => el.name);

			index = arr.indexOf(name);

			players.splice(index, 1);
			
		},

		shuffle: arr => {

    		for (let i = arr.length - 1; i > 0; i--) {
    			let j = Math.floor(Math.random() * (i + 1));
    			[arr[i], arr[j]] = [arr[j], arr[i]];
  			}

		}
	}
})();




const viewController = (() => {
	const elements = {
		input: document.querySelector('.player__name'),
		addBtn: document.querySelector('.player__add'),
		playersArea: document.querySelector('.players__area'),
		modeSelector: document.querySelector('#mode__selector'),
		teamsSelector: document.querySelector('#teams'),
		playersSelector: document.querySelector('#players'),
		randomArea: document.querySelector('.random__area'),
		randomBtn: document.querySelector('.random__btn'),
		numOfPlayers: document.querySelector('.players__number')

	}

	return {
		getElements: () => {
			return elements;
		},

		displayPlayer: (player, obj) => {

			let arr = obj.map(el => el.name);

			if (arr.indexOf(player) !== -1) {

				elements.randomArea.innerHTML = "<p style='color: red'>This name is already added!</p>";

			} else if (!player.replace(/\s/g, '').length) {

				elements.randomArea.innerHTML = "<p style='color: red'>Input field is empty!</p>";

			} else {

				const html = `<div class="player"><span class="player__select">${player}</span>&nbsp <i class='ion-ios-close-outline'></div>`;
				elements.playersArea.insertAdjacentHTML('beforeend', html);

			}
		},

		showNumber: players => {
			elements.numOfPlayers.innerHTML = players.length;
		},
                
                initialMode: () => {
                        elements.modeSelector.value = 0;
                },

		modeChange: () => {
			if (elements.modeSelector.value === "0") {
				elements.teamsSelector.style.display = "none";
				elements.playersSelector.style.display = "none";
			} else if (elements.modeSelector.value === "1") {
				elements.teamsSelector.style.display = "inline-block";
				elements.playersSelector.style.display = "inline-block";
				
			} else if (elements.modeSelector.value === "2") {
				elements.teamsSelector.style.display = "none";
				elements.playersSelector.style.display = "none";
			}
		},

		displayRandom: arr => {
			if (elements.modeSelector.value === "0") {
				elements.randomArea.innerHTML = "<p style='color: red'>Choose mode</p>";
			} else if (elements.modeSelector.value === "1") {

				let total = elements.playersSelector.value * elements.teamsSelector.value;

				if (arr.length >= elements.teamsSelector.value * elements.playersSelector.value) {

				elements.randomArea.innerHTML = "";

				for (let i = 1; i <= elements.teamsSelector.value; i++) {

					//if (mode.value === "1") {
						elements.randomArea.innerHTML += "<h3><em><u>" + "Team " + i + "</u></em></h3>";

					for (var x = 0; x < arr.length; x++) {

						if (x == elements.playersSelector.value) {

							arr.splice(0, elements.playersSelector.value);

							break;

						} else {

						elements.randomArea.innerHTML += arr[x].name + "<br>";

						arr.push(arr[x]);

						}
						
					}

				}
				

				} else {

				elements.randomArea.innerHTML = "<p style='color: red'>Add minimum " + ((elements.teamsSelector.value * elements.playersSelector.value) - arr.length) + " more players</p>";
				}

			} else if (elements.modeSelector.value === "2") {


				if (arr.length > 1) {

					elements.randomArea.innerHTML = arr[0].name + " - " + arr[1].name;

				} else {

					elements.randomArea.innerHTML = "<p style='color: red'>Add minimum 2 players</p>";
				}
			}
		}
	}

})();




const controller = ((dataCtrl, viewCtrl) => {

	const elements = viewCtrl.getElements();

	const setEventListeners = () => {
		elements.addBtn.addEventListener('click', addPlayer);

		document.addEventListener('keypress', function(event) {

			if (event.keyCode === 13) {

				addPlayer();
				elements.input.value = "";
			}
		});
                
                window.addEventListener('load', viewCtrl.initialMode());

		elements.modeSelector.addEventListener('change', viewCtrl.modeChange);

		elements.playersArea.addEventListener('click', deletePlayer);

		elements.randomBtn.addEventListener('click', doRandom);


	}

	const addPlayer = () => {
		const player = elements.input.value;
		viewCtrl.displayPlayer(player, dataCtrl.getPlayers());
		dataCtrl.addPlayer(player);
		//viewCtrl.displayPlayer(player, dataCtrl.getPlayers());

		viewCtrl.showNumber(dataCtrl.getPlayers());
		elements.input.value = "";
                elements.input.focus();

		
	}

	const deletePlayer = event => {
		if (event.target.className === "ion-ios-close-outline") {
				const div = event.target.closest('.player');
				//const name = e.target.closest('.player__select');
				const name = div.children[0].textContent;
				div.parentNode.removeChild(div);
				//let name = div.split('');

				dataCtrl.deletePlayer(name);

				viewCtrl.showNumber(dataCtrl.getPlayers());


			}
	};

	const doRandom = () => {
		dataCtrl.shuffle(dataCtrl.getPlayers());
		viewCtrl.displayRandom(dataCtrl.getPlayers());
	}



	return {
		init: () => {
			setEventListeners();
			
		}
	}
})(dataController, viewController);

controller.init();