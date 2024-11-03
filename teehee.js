document.addEventListener("DOMContentLoaded", () => {
	function minmax(arr) {
		let resultarray = [0, 0];
		arr.forEach((e) => {
			if (resultarray[0] > e) {
				resultarray[0] = e;
			}
			if (resultarray[1] < e) {
				resultarray[1] = e;
			}
		});
		return resultarray;
	}
	document.getElementById("import").addEventListener("click", () => {
		let arr = window.prompt("import list here", "i am an array!");
		arr = JSON.parse(arr);
		arr = arr.slice(0, 35000);
		let parent = document.getElementById("right");
		parent.innerHTML = "";
		let xaxis = document.createElement("div");
		xaxis.id = "xaxis";
		parent.appendChild(xaxis);
		let result = minmax(arr);
		let bottom = result[0];
		let top = result[1];
		let gap = (top - bottom) / 4;
		for (let i = 5; i >= -1; i--) {
			let text = document.createElement("div");
			text.classList.add("xlabel");
			xaxis.appendChild(text);
			text.innerHTML = bottom + gap * i;
		}
		let yaxis = document.createElement("div");
		yaxis.id = "yaxis";
		parent.appendChild(yaxis);
		let perpixel = (top + gap - (bottom - gap)) / xaxis.getBoundingClientRect().height;
		yaxis.style.bottom = ((-1 * (bottom - gap)) / perpixel).toString() + "px";
		top = arr.length;
		let gap2 = (top - bottom) / 4;
		let leftstart = xaxis.getBoundingClientRect().left;
		for (let i = 0; i <= 4; i++) {
			let text = document.createElement("div");
			text.classList.add("ylabel");
			yaxis.appendChild(text);
			text.innerHTML = gap2 * i;
		}
		let perpixely = top / (document.querySelectorAll(".ylabel:last-child")[0].getBoundingClientRect().left - leftstart);
		arr.forEach((e, i) => {
			let point = document.createElement("div");
			document.getElementById("right").appendChild(point);
			point.classList.add("point");
			point.style.left = (leftstart + i / perpixely).toString() + "px";
			point.style.bottom = ((e - (bottom - gap)) / perpixel).toString() + "px";
		});
	});
});
