---
layout: post
title: "Issues With My Path"
date: 2013-04-07 09:55:32 -0400
comments: true
categories: development
tags: path postgresql

---
When you modify your path and add things to it, do the items read first or last take precedence? By this I mean, if I have a set of say 5 items, and they are read in order from left to right, does the first item take precedence over the last, or does the last overwrite the first? If I had a variable and defined it twice, the second one would take precedence but it appears that when defining your path, it works in reverse. Whatever is defined first is what gets used.<!-- more -->

Yesterday I had issues getting the PostgreSQL commands to work on the command line. I was hitting the ones in ```/usr/bin/``` or ```/usr/local/bin``` and since I had installed the PostgresAPP, I wanted to use the commnads that come with that. I thought by appending the new location to my path this would override anything already loaded. Instead I needed to prepend the new location. Once I did that, it worked perfectly.

**Note**: You also need to make sure you restart ALL of your consoles. I use a lot of split screens, tabs, and windows and after a few hours I happened to be in one that I had NOT restarted so the path issues were back. A quick restart of my console app ([iTerm 2](http://www.iterm2.com/#/section/home) in this case) resolved this for me.