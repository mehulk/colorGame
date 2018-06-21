
var noSquare=6;
var color=randomColors(noSquare);
var square=document.getElementsByClassName("square");
var message=document.getElementById("Message");
var button = document.querySelector("button");
var easyBttn=document.getElementById("easy");
var hardBttn=document.getElementById("hard");

var h1=document.querySelector("h1");

var pickedColor=pickColor();

var colorDisplay=document.querySelector("#Display");
colorDisplay.textContent=pickedColor;

easyBttn.addEventListener("click",function(){
	easyBttn.classList.add("selected");
	hardBttn.classList.remove("selected");
	noSquare=3;
	color=randomColors(noSquare);
	pickedColor=pickColor();
	colorDisplay.textContent=pickedColor;
	for(var i=0;i<square.length;i++)
	{
		if(color[i])
		{
			square[i].style.backgroundColor=color[i];
		}
		else
			square[i].style.display="none";
	}

})

hardBttn.addEventListener("click",function(){
	hardBttn.classList.add("selected");
	easyBttn.classList.remove("selected");
	noSquare=6;
	color=randomColors(noSquare);
	pickedColor=pickColor();
	colorDisplay.textContent=pickedColor;
	for(var i=0;i<square.length;i++)
	{
			square[i].style.backgroundColor=color[i];
			square[i].style.display="block";
	}
})

button.addEventListener("click",function(){
	color=randomColors(noSquare);
	pickedColor=pickColor();
	for(var i=0;i<square.length;i++)
{
	if(color[i])
		square[i].style.backgroundColor=color[i];
	else
		square[i].style.Display="none";

}
	h1.style.backgroundColor="steelblue";
	this.textContent="New Colors";
	colorDisplay.textContent=pickedColor;
	message.textContent=" ";

})

for(var i=0;i<square.length;i++)
{
	//assign color
	square[i].style.backgroundColor=color[i];
	//create event listener
	square[i].addEventListener("click",function(){
		if(this.style.backgroundColor===pickedColor){
					message.textContent="Correct !";
					changeColor();
					h1.style.backgroundColor=pickedColor;
					button.textContent="Play Again?";
		}
		else{
			this.style.backgroundColor="rgb(0, 0, 0)";
			message.textContent="Wrong, Try Again !";
		}
	})
}

function changeColor(){
	for(var i=0;i<square.length;i++)
	{
		square[i].style.backgroundColor=pickedColor;
	}

}

function pickColor(){
	var ran = Math.floor(Math.random() * color.length);
	return color[ran];
}

function randomColors(num)
{
	var color=[]
	for(var i=0;i<num;i++)
	{
		color.push(randoms());
	}
	return color;
}

function randoms(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb("+r+", "+g+", "+b+")";
}
