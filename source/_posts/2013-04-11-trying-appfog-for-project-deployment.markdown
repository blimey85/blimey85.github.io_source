---
layout: post
title: "Trying AppFog for Project Deployment."
summary: "My first attempt at using AppFog and I found it to be quite easy to use."
date: 2013-04-11 09:45:15 -0400
comments: true
categories: Development
tags: AppFog Rails Node.js

---
I’ve been playing around with Node.js a bit and was wanting to find a hosting service where I could deploy my little test apps for testing and for showing friends. I read some good things about AppFog and felt the price was right (they offer a free intro-level service that lets you get your feet wet with minimal financial risk). Signup took just a minute and I had my basic Rails app deployed five minutes later.<!-- more -->

Interesting how they handle databases. My deploy happened entirely on the command line:

``` plain iTerm2
af login
(email prompt)
(password prompt)
af deploy
```

And then I answered a few questions and the app was running. One of those questions is where I indicated that I wanted a MySQL database. I was not given a user/pass for MySQL, nor do I needed to handle any db related setup at all. AppFog uses some sort of auto-configuration and I’ve gotta say, it’s pretty cool.

No issues during the first deployment. Tonight after a few hours spent working on my app I did an update to AppFog and encountered my first issue. Two minutes later I’d figured out how to view the log file and saw it was an asset compilation issue. Googled that and then:

``` plain iTerm2
rake db:setup RAILS_ENV=production
rake assets:precompile --trace RAILS_ENV=production
```

Had me ready for a second attempt. Apparently the issue had to do with one of my ```.js``` files not being in the assets folder where it should be. Instead it’s in ```public/javascripts/```. I’ll get that moved tomorrow or the next time I get a chance to work more on my project.

It’s only been one day, and two pushes, but so far I’m quite impressed with AppFog. I especially like how easy it is to roll updates. Will come in quite handy with my project is a little farther along and I have friends testing things for me.