---
layout: post
title: "Bug in Apple's Command Line Tools 6.3"
summary: "Missing debug file in CLT 6.3 prevents native gem installation."
date: 2015-04-21 02:38:07 -0400
comments: true
categories: development
tags: apple

---
While trying to install ```therubyracer``` gem I ran into a problem where it couldn't find a debug file and would not build the native extension. Google reported that there is a bug in CLT 6.3 where a file is missing which is present in version 6.2. I couldn't seem to downgrade because I don't have a paid developer account so I thought I was stuck. A kind soul on [StackOverflow](http://stackoverflow.com/a/29576048) found a workaround. <!-- more -->

``` plain
{% raw %}echo '#define _LIBCPP_ASSERT(x, m) ((void)0)' | sudo tee -a /Library/Developer/CommandLineTools/usr/include/c++/v1/__debug > /dev/null{% endraw %}
```

Never one to be afraid of messing with my system because hey, it's 2am, I'm tired, and furthermore, what could possibly go wrong? I ran the command, typed in my system password, and all seemed well. I then tried ```gem install therubyracer``` and it installed, finally.

I don't use XCode much and didn't actually know the Command Line Tools were/are used by Ruby so that's something new to me. I also didn't knwo that the might Apple ever makes mistakes. Ok, I actually knew that part. They don't make a lot of mistakes, but not everything can be magical and just work. Thankfully I found a solution and was able to get the gems installed. Now back to my regularly scheduled late-night coding.