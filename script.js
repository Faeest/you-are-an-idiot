let 	tampungan = []
,		song_ = new Audio("./assets/song.mp3")
,		song_2_ = new Audio("./assets/song-pendek.mp3")
,		isStarted = false
,		speed_ = 100
,		render_ = setInterval(() => {renderPopUp()}, speed_)
const	baseURL = "./assets/"
function renderPopUp(){
	for(let i=tampungan.length-1;i>=0;i--){
		tampungan[i].fill()
	}
}
document.addEventListener("click",(e) => {
	for(let i=0;i< Math.ceil(10 - speed_ / 100);i++){
		renderPopUp()
	}
	if(isStarted){
		start()
	}
	window.blur()
});
function start(){
	if(!isStarted){
		document.querySelectorAll(".start-button>img").forEach((val,idx) => {
			val.setAttribute("src",baseURL+"emoji-smile.svg")
		})
		document.querySelector("h1.title").innerHTML = "You Are An Idiot"
		document.querySelector("title").innerHTML = "Trojan JS YouAreAnIdiot"
		document.querySelector(".icon-link").setAttribute("href",baseURL+"emoji-smile.svg")
	}
	let mc = playSong(1)
	mc.addEventListener("ended",(e) => {
		playSong(2)
		mc.play()
		if (random(0,tampungan.length,true) <= 2) {
			setTimeout(function () {
				start()
			}, random(0,mc.duration*1000,true))
		}
	});
	let train = new TrainPopUp(5,[random(0,window.outerWidth,true),random(0,outerHeight,true)])
	tampungan.push(train)
	isStarted = true
}
function TrainPopUp(divider = 5,position = [0,0],qty = [250,150]){
	this.wd = qty[0]
	this.hg = qty[1]
	this.divider = divider
	this.spd	 = speed_
	this.onDaWay = false
	this.x = position[0]
	this.y = position[1]
	this.way = [1,1]
	this.fill = () => {
		if(!this.window.closed){
			let incrX = 0
			let incrY = 0
			let much = 1
			incrX+=this.way[0]
			incrY+=this.way[1]
			let newX = this.x+incrX*(qty[0]/this.divider)
			,	newY = this.y+incrY*(qty[1]/this.divider)
			window.blur()
			this.window.moveTo(newX,newY);
			this.window.focus()
			if(newX + qty[0] >= window.outerWidth){this.way[0] = -1}
			if(newX <= 0){this.way[0] = 1}
			if(newY + qty[1] >= window.outerHeight){this.way[1] = -1}
			if(newY <= 0){this.way[1] = 1}
			this.x += incrX*(qty[0]/this.divider)
			this.y += incrY*(qty[1]/this.divider)
		}
	}
	let template = `
	<div style = \"width:100%;height:100%;align-items:center;display:flex;justify-content:center;\">
		<div class="container">
			<h1 class="title">You Are An Idiot</h1><img src="./assets/emoji-smile.svg" width="40" height="40" alt=""><img src="./assets/emoji-smile.svg" width="40" height="40" alt=""><img src="./assets/emoji-smile.svg" width="40" height="40" alt="">
		</div>
		<style>
		@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
		body{margin:0;}
		.start-button{width: 50px;height: 50px;font-size: 0.875rem;font-family: "poppins";transition: .2s;border-radius: 50%;border: 0px solid black;cursor: pointer;display: flex;justify-content: center;align-items: center;}
		.title{margin:0;display: block;width: 100%;text-align: center;font-family: "Poppins";}
		.container{height:calc(100% - 2px);width:calc(100% - 2px);border: 1px black solid;font-size:0.6rem;display: flex;justify-content: space-evenly;align-items: center;flex-wrap: wrap;}
		</style>
	</div>
	`
	this.window = window.open("", "", `width=${qty[0]},height=${qty[1]}`)
	this.window.document.write(template)
}
function fullscreen(option = true){
	if (!document.fullscreen && option) {
    	document.body.requestFullscreen();
    	return true
	} else if(document.fullscreen && !option){
		document.exitFullscreen();
		return false
	}
	return false
}
function random(max,min,isRound=false){
	let res = (Math.random() * (max-min))+min
	return isRound?Math.round(res):res
}
function isPopUpBlocked(){
	for(let i = 0; i < 2; i++){
		let newWin = window.open('','',`width=10,height=10`)
		setTimeout(function () {
			if(newWin!=undefined){newWin.close()}
		}, 500)
	}
}
function playSong(type = 1){
	let music;
	if(type==1){
		music = song_.cloneNode(true)
	} else if(type == 2){
		music = song_2_.cloneNode(true)
	}
	music.play()
	return music;
}