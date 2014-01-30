NumberTicker.js
===============

A Very Tiny Number Ticker Script

##<a href="http://numberticker.com">Demos</a>

What Does It Do?
---------------

This script will take your boring static numbers and count them up to a specified target, or you can opt to have random changes! It's perfect for Stats, Scores, Money Counters, and anywhere else you want to spice up numbers!

**Bonus: It's dead simple, and easy to customize.**

How Do I Use It?
----------------

Number ticker is based on a simple object called *NumberTicker()*. It has one argument, the class it's going to target to do the counting. By default the script creates an object called *numberTicker* and it's targeting the class *.number-ticker*. 

####NumberTicker Properties
The *NumberTicker()* objects has two properties:

**interations**<br />
Which is the number of times as an integer the animation will run to get from the initial number, to the target number. This can also be referred to as keyframes

**interationTime**<br />
Which is the time in milliseconds as an integer that each iteration will take.

####NumberTicker Methods
The *NumberTicker()* object includes one method named *start()*, call that when you want to start the animation.

Code Examples
----------------

####Basic Use

```html
<!-- Just add a simple class to your element, 
and put the value you want inside-->
<p class="number-ticker">500</p>

<!-- Then call the start method!-->
<script>numberTicker.start();</script>
``` 

####Random Type

```html
<!-- You can change the ticker to randomize
(which is great for small numbers) by adding an attribute-->
<p class="number-ticker" data-nt-type="random">10</p>

<!-- Then call the start method!-->
<script>numberTicker.start();</script>
```

####Overriding Initial and Target Values

```html
<!-- You can set the initial number to count from by adding
an attribute-->
<p class="number-ticker" data-nt-initial="300">500</p>

<!-- The same goes for the target, if you want to overide the target
pulling from the HTML content-->
<p class="number-ticker" data-nt-target="3000">500</p>

<!-- Then call the start method!-->
<script>numberTicker.start();</script>
```

####Setting Animation Properties

```javascript
//The first property is how many iterations will occur
numberTicker.iterations = 30;
//The second property is how long each iteration takes in ms
numberTicker.iterationTime = 100;
//Then run the method
numberTicker.start();
```

####Creating Multiple NumberTicker objects

```javascript
//Just make a new instance of the object, with the argument being
//the class you want to target
numberTicker2 = new NumberTicker(".number-ticker-2");
numberTicker2.start();
```

Changelog
----------------

**v0.1 - 2014/01/29**<br />
First Commit
