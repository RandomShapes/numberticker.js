/*!
 * NumberTicker.js - v0.1
 * http://numberticker.com
 * 2014-01-28
 *
 * Copyright 2014 Jamie Spittal
 * @license http://www.opensource.org/licenses/mit-license.html MIT License
 * @license http://www.gnu.org/licenses/gpl.html GPL2 License 
 */
var NumberTicker = function(targetClass) {
	//Above is the object constructer!
	//Comments will be above respective code this point onwards

	//This is what class it's looking for to do the animation, be default it will create a
	//NumberTicker object looking for the ".number-ticker" class. But obviously you can create more
	//than one NumberTicker object.
	this.targetClass = targetClass;
	//This property is the amount of times the number will change, AKA Keyframes.
	this.iterations = 15;
	//The time measured in Milliseconds of each iteration.
	this.iterationTime = 30;
	};

//The start method for all NumberTicker objects.
NumberTicker.prototype.start = function () {
	//Get the iterations set by the object.
	var iterations = this.iterations;
	//Get the iteration time set by the object.
	var iterationTime = this.iterationTime;
	//Use jQuery .each method to loop through elements with the target class (".number-ticker" by default).
	$(this.targetClass).each(function() {
		//This is the variable that holds the actual HTML Element so we can manipulate it
		var el = $(this);
		//Assign the initial to the "data-nt-initial" attribute from the element.
		//If the attribute is declared in markup, it will use that number instead of zero.
		var initial = el.attr("data-nt-initial");
		//Check to see if that attribute already exsists, if not run set it to zero.
		if (initial == null) {
			//Set the code to zero if it succeeded the conditional logic above
			initial = 0;
			//Once the initial has been set. set it to an attribute on the element, this isn't
			//strictly necessary, but makes it easy to change afterwards with the .attr method in jQuery.
			el.attr("data-nt-initial", initial);
		}
		//Assign the target to the "data-nt-target" attribute from the element.
		//If the attribute is declared in markup, it will use that number instead of the HTML content.
		var target = el.attr("data-nt-target");
		//Check to see if that attribute already exsists, if not run set it to the HTML content of the element.
		if (target == null) {
			//This pulls the target for the number, which is the current HTML content of the element.
			target = el.html();
			//Once the target has been set, create an attribute to prevent the code from setting the
			//target to a wrong number from the HTML content, which can happen if you trigger the function
			//while it's counting. Change this atrribute on the fly and you can do some pretty cool stuff.
			el.attr("data-nt-target", target);
		}
		//This pulls the generation type, linear counting, or random (looking to add curve soon). 
		//Random looks nicer for smaller numbers.
		var type = el.attr("data-nt-type");
		//Set the HTML element to the initial value.
		el.html(initial);
		//Run the animation for the current element.
		numberAnim(el, initial, target, iterations, type, iterationTime);
	});
};

//This is the function which takes the HTML element (el), the initial value, the target value, 
//number of iterations, the type (random or not), and the iteration time as arguments and animates
//the element.
function numberAnim(el, initial, target, iterations, type, iterationTime) {
	//Parse the numbers as a floats, to avoid any concatination nonsense.
	initial = parseFloat(initial);
	target = parseFloat(target);
	iterations = parseFloat(iterations);
	//There can't be an iteration number more than the target otherwise it will result in float number
	//between one and zero. When rounded down with the Math.floor method the number results in 0.
	//This condition will make it equal the target thus removing the round to zero issue.
	if (iterations > target && type !== "random") {
		iterations = target;
	}
	//A bit of math to make the ticker go up linearly, I will look at adding curves later
	var adder = ((target-initial)/iterations);
	//This condition checks to see if the target equals 0, if it does then give it an actual number.
	//This is because it's not fun watching a number not change. This only effects the random type.
	if (target === 0) {
		//make a new variable that's the modified target, which will never be 0.
		var targetMod = Math.floor((Math.random()*10)+1);
	} else {
		//If it doesn't equal 0 just make it the target plain and simple.
		var targetMod = target;
	}
	//This function contains all the conditional logic to inject numbers into the element.
	//This is on an interval timer.
	function animation() {
		//This conditional decides what it should do if the i iteration is below set amount 
		//and it's not random type.
		if (i < iterations && type !== "random") {
			//get the current HTML value of the element.
			var current = el.html();
			//parse that as a float, to avoid concatination over adding
			current = parseFloat(current);
			//add the adder to the current, and set it as it's HTML content
			el.html(Math.floor(current + adder));
			//increase the i so logic will work in next loop through
			i++;
		//conditional for if iteration passes, and it is random type.
		} else if (i < iterations && type === "random") {
			//Set the element value to a rounded down random number. The random number will be
			//between initial and your target.
			el.html(Math.floor((Math.random()*targetMod)+1));
			//add one to i iteration.
			i++;
		//If the i is above or equal to iterations then abort the timer
		} else if (i >= iterations) {
			//abort the timer... clever naming.
			abortTimer();
		}
	}
	//Heres the function that aborts the timer, using clearInterval
	function abortTimer() {
		//actually set the right value, to fix rounding errors and the such.
		el.html(target);
		//clear the interval, huzzah!
		clearInterval(tid);
	}
	//This is where we actually start the looping based on a timed interval
	var i = 0;
	//create the inverval that triggers the function animation every inverval based on
	//iterationTime variable.
	var tid = setInterval(animation, iterationTime);
}

//Finally, make the object, which we can then call the .start() function on when you need!
var numberTicker = new NumberTicker(".number-ticker");