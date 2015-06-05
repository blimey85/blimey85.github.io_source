---
layout: post
title: "The Joys of CoffeeScript"
summary: "My first attempt at using CoffeeScript and it was a success."
date: 2013-04-12 09:41:56 -0400
comments: true
categories: Development
tags: CoffeeScript jQuery

---
I just used CoffeeScript for the first time. I’ve copied and pasted CoffeeScript code before, of course, but this was the first time I had used it with my own code. And I’ll admit I cheated. I started with jQuery and then ran it through a converter ([http://js2coffee.org/](http://js2coffee.org/)).<!-- more -->

``` javascript jQuery
$("input[type='checkbox']#goal_completed").on('change', function() {
    $('.goal_completed_on').toggle();
});
```


``` javascript CoffeeScript
$("input[type='checkbox']#goal_completed").on "change", ->
    $(".goal_completed_on").toggle()
```

For writing the code I was doing a simple ```<script> </script>``` block at the bottom of my ```_form.html.erb``` file but found that because I’m loading my JS files at the bottom of my layout, my jQuery wasn’t working. JQuery hadn’t loaded yet. Now that I have it as proper CoffeeScript and in the proper assets file, ```assets/javascripts/goals.coffee.js``` in this case, everything is working great.