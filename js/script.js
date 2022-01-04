let timerId;
let min = `00`;
let sec = '59';
let chek = true;

$('.boxx').sortable({
	connectWith: '#start, .boxx',
})

/*перевірка правельності складання пазла*/
function check() {
	for (let i = 1; i < $('.boxx').length; i++) {
		if ($(`#r${i}`).text() != $(`#r${i} .box`).text() + $(`#r${i} .box`).text()) {
			chek = false;
			break;
		}
	}
	if (chek) {
		ModalWindovWin()
		closeModalWindov()
		newGame()
	}
	else {
		modalWindovLose()
		closeModalWindov()
		newGame()
	}
	$(`#ch`).attr(`disabled`, `disabled`);
}
/*старт нової гри*/
function newGame() {
	let a = Math.round(Math.random() * 16);
	let b = Math.round(Math.random() * 16);
	let c = Math.round(Math.random() * 16);
	let d = Math.round(Math.random() * 16);
	$(`#start`).append($(`#l${a},#l${b}`)).css({ left: Math.random() * 100 + 'px', top: Math.random() * 100 + 'px' });
	$(`#start`).append($(`#l${c},#l${d}`)).css({ left: Math.random() * 100 + 'px', top: Math.random() * 100 + 'px' });
	$(`#start`).append($(`.boxs`));
	resetTimer();
	$(`#st`).removeAttr(`disabled`, `disabled`);
	$(`#ch`).attr(`disabled`, `disabled`);
	$(`.ct`).text('“You still have time, you sure?”' + min + ":" + sec);
}

newGame()
function newGameWindow() {
	location.reload()
}
/*таймер*/
function startGame() {
	timerId = setInterval(function () {
		$(`.ct`).text('“You still have time, you sure?”' + min + ":" + sec);
		$(`.timer`).text(min + ":" + sec);
		sec--;
		if (sec == -1) {
			min--;
			sec = 59;
		}
		if (min == -1) {
			clearTimeout();
		}
		if (sec < 10) {
			sec = "0" + sec;
		}
		if (sec <= 0) {
			clearInterval(timerId);
			resetTimer();
			newGame();
			$(`#ch`).attr(`disabled`, `disabled`);
			modalWindovLose();
			closeModalWindov();
		}
	}, 1000);
	$(`#st`).attr(`disabled`, `disabled`);
	$(`#ch`).removeAttr(`disabled`, `disabled`);
}
/*обнулення таймера*/
function resetTimer() {
	sec = `00`;
	min = `01`;
	$(`.timer`).text(min + ":" + sec);
	clearInterval(timerId);
}

/*drop*/
function once() {
	startGame();
}
$(`.boxx`).droppable({
	accept: `.boxs`,
	drop: function () {
		once();
		once = function () { }
	}
})



/*модельні вікна*/
function modalWindov() {
	$(`.modal-container`).addClass(`block`);
	$(`#checkbut1`).addClass(`block1`)
}

function closeModalWindov() {
	$(`#checkbut1`).removeClass(`block1`)
}

function modalWindovLose() {
	$(`.modal-container`).addClass(`block`);
	$(`#checkbut3`).addClass(`block1`)
}
function clouseModalWindovLose() {
	$(`.modal-container`).removeClass(`block`);
	$(`#checkbut3`).removeClass(`block1`)
}

function ModalWindovWin() {
	$(`.modal-container`).addClass(`block`);
	$(`#checkbut2`).addClass(`block1`)
}

function clouseModalWindovWin() {
	$(`.modal-container`).removeClass(`block`);
	$(`#checkbut2`).removeClass(`block1`)
}