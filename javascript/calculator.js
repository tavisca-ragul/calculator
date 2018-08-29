var calculatorEvents = {
	"display": {
		"expression": {
			"actionurl": "expression",
			"value": 0,
			"history": {
				"actionurl": "expressionsHistory",
				"expression":[],
				"value":[],
				"action": function() {
					var HTMLContent = "<h2>History</h2>";
					HTMLContent += "<ul>";
					for(var history = 0; history < calculatorEvents["display"]["expression"]["history"]["expression"].length; history++) {
						HTMLContent += "<li>"+calculatorEvents["display"]["expression"]["history"]["expression"][history]+"</li>";
						HTMLContent += "<li>"+calculatorEvents["display"]["expression"]["history"]["value"][history]+"</li>";
					}
					HTMLContent += "</ul>";
					var expressionsHistoryElement = document.getElementById(calculatorEvents["display"]["expression"]["history"]["actionurl"]);
					expressionsHistoryElement.innerHTML = HTMLContent;
				}
			},	
			"action": function(args) {
				var errMsg = document.getElementById("errorMessage");
				errMsg.style.display = "none";
				if(args.keyCode === 13) {
					calculatorEvents["display"]["answer"]["action"](args.target.value);
					calculatorEvents["display"]["expression"]["history"]["action"]();
				}
				else if((args.keyCode >= 48 && args.keyCode <= 57) || (args.keyCode >= 96 && args.keyCode <= 111) || (args.keyCode === 8) || (args.keyCode === 46)) {
					var expressionElement = document.getElementById(calculatorEvents["display"]["expression"]["actionurl"]).value;
					calculatorEvents["display"]["expression"]["value"] = expressionElement;	
				} else {
					var expressionElement = document.getElementById(calculatorEvents["display"]["expression"]["actionurl"]); 
					expressionElement.value = calculatorEvents["display"]["expression"]["value"];
				}
			}
		},
		"answer": {
			"actionurl": "answer",
			"value": 0,
			"action": function(expression) {
				var answerElement = document.getElementById(calculatorEvents["display"]["answer"]["actionurl"]);
				if(expression === "") {
					calculatorEvents["display"]["answer"]["value"] = 0;
					answerElement.innerText = calculatorEvents["display"]["answer"]["value"];
				} else {
					try {
						calculatorEvents["display"]["answer"]["value"] = eval(expression);
						answerElement.innerText = calculatorEvents["display"]["answer"]["value"];
						calculatorEvents["display"]["expression"]["history"]["expression"][calculatorEvents["display"]["expression"]["history"]["expression"].length] = calculatorEvents["display"]["expression"]["value"];
						calculatorEvents["display"]["expression"]["history"]["value"][calculatorEvents["display"]["expression"]["history"]["value"].length] = calculatorEvents["display"]["answer"]["value"];
					} catch(ex) {
						var errMsg = document.getElementById("errorMessage");
						errMsg.style.display = "inline-block";
					}
				}
			}
		}
	},
	"keyboard": {
		"key": {
			"actionurl": "key",
			"action": function(args) {
				var errMsg = document.getElementById("errorMessage");
				errMsg.style.display = "none";
				if(args.target.id === "clear") {
					var expressionElement = document.getElementById(calculatorEvents["display"]["expression"]["actionurl"]);
					expressionElement.value = "";
					calculatorEvents["display"]["expression"]["value"] = "";
					var answerElement = document.getElementById(calculatorEvents["display"]["answer"]["actionurl"]);
					answerElement.innerText = 0;
					calculatorEvents["display"]["answer"]["value"] = 0;
				} else if(args.target.id === "equalTo") {
					var expressionElement = document.getElementById(calculatorEvents["display"]["expression"]["actionurl"])
					calculatorEvents["display"]["answer"]["action"](expressionElement.value);
					calculatorEvents["display"]["expression"]["history"]["action"]();
				} else {
					calculatorEvents["display"]["expression"]["value"] += args.target.value;
					var expressionElement = document.getElementById(calculatorEvents["display"]["expression"]["actionurl"]);
					expressionElement.value = calculatorEvents["display"]["expression"]["value"];
				}
			}
		}
	}
}

function loadEvents() {
	if(document.getElementById(calculatorEvents["display"]["expression"]["actionurl"]) !== null) {
		var expressionElement = document.getElementById(calculatorEvents["display"]["expression"]["actionurl"]);
		expressionElement.addEventListener("keyup", calculatorEvents["display"]["expression"]["action"]);
	}

	if(document.getElementsByClassName(calculatorEvents["keyboard"]["key"]["actionurl"]) !== null) {
		var keysElement = document.getElementsByClassName(calculatorEvents["keyboard"]["key"]["actionurl"]);
		for(var keyElement = 0; keyElement < keysElement.length; keyElement++) {
			keysElement[keyElement].addEventListener("click", calculatorEvents["keyboard"]["key"]["action"]);
		}
	}

	if(document.getElementById(calculatorEvents["display"]["expression"]["history"]["actionurl"]) !== null) {
		calculatorEvents["display"]["expression"]["history"]["action"](); 
	}
}

window.addEventListener("load", loadEvents);