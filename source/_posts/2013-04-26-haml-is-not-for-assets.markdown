---
layout: post
title: "HAML Is Not for ASSETS"
date: 2013-04-26 08:45:00 -0400
comments: true
categories: development
tags: haml rails gems
summary: "Sample test summary regarding HAML not working for ASSETS"

---
Not being too familiar with HAML nor how the ```group :assets``` block works in a gemfile, I ran into a wall. Due to my own ignorance I initially theorized the blame must lay with AppFrog but further investigation lead me to where I had gone wrong and how to fix it.<!-- more -->

So in my gem file I had gem 'haml' inside my assets block like this:

``` ruby
group :assets do
    gem 'haml'
    --- other gems here ---
end
```

This worked fine locally and all was well. Then I tried to push an update to AppFog and none of my HAML files loaded. Nothing showed up in the error log but there was an obvious problem. A site without any layout isn’t much of a site. I tried a few things but couldn’t get it to work so I bitched about it on Twitter:

``` plain
Deff something up with @appfog not supporting haml. Works 
swimmingly on local but shits the bed after deploy. #frustrated
```

Yea, I was a little frustrated. So converted my files over to erb and left it at that. Then I was contacted via Twitter by Alex Parkinson from AppFog who asked me about the issue. This prompted me to look into it a bit more and right off the bat I noticed my issue with the gem file. I tried moving the HAML gem outside of the assets block and what do you know? That worked.

Thanks to GIT it was trivial to track down my previous files, merge in some changes I had made, and then push the latest up to AppFog and now all is well and I’m able to use HAML.

I apologized to AppFog via Twitter and also Tweeted about my mistake. I have to admit, I’m impressed Mr. Parkinson took the time to Tweet me about this. Had he not I likely would have just stuck with erb files and would have presumed that AppFog had an issue with HAML when all along it was my own ignorance that was screwing me up.