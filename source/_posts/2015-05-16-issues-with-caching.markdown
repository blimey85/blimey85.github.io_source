---
layout: post
title: "Issues With Caching"
date: 2015-05-16 08:13:25 -0400
comments: true
categories: blogging
tags: 

---

In an effort to make this site load as fast as possible I've been using tools such as [YSlow](http://yslow.org/) and [PageSpeed](https://developers.google.com/speed/pagespeed/). These tools analyze your page and give you insights into how to improve the loading speed. Things such as minifying your files, using compression such as deflate or gzip, putting your js includes at the bottom of the page so that everything else loads first, and so on. I've done most of these things and have seen some improvement.<!-- more -->

The latest tweak I've attempted has to do with minifying the html on this site. The site is powered by [Octopress](http://octopress.org/) and I came across a layout that someone had created, that aims to minify the html code that gets generated. This is something I hadn't considered. Stripping all white space when generating files seems so simple, yet it reduces, albeit slightly, the whitespace within files and subsequently the file size. You may only gain a few k here and there but when it's such a simple change, and you see an actual verifiable gain in file size reduction, you might as well implement it.

After a bit more research I came across a well supported plugin for Octopress that does the same thing, but through a gem. You can find the gem here: [Octopress Minify HTML](https://github.com/octopress/minify-html). The gem has the added benefit of using an environment variable. When set to production it will compress your html, when set to development it leaves the html alone. This is an excellent way to be able to work on your site, yet keep the site as small as possible in production. I currently have Compass set to only concatenate my CSS in development but for production it also strips all comments and minifies the files.

Beyond what we do with the files as far as compression, stripping white space, etc., we need to be able to rely on browsers to properly cache our files. When a user hits the first page, certain things like CSS and JS files should be loaded once and then stored so that any subsequent pages load much quicker. I currently have an issue on this site where that isn't happening. As stated within PageSpeed: *Setting an expiry date or a maximum age in the HTTP headers for static resources instructs the browser to load previously downloaded resources from local disk rather than over the network.* I have yet to find a way to do that without having control of the actual server. In the past when I ran my own servers, I could set this up in Apache and I'd also enable gzip or deflate for compression, being careful to NOT enable compression for IE as it couldn't handle it. Took me two days to discover what was causing my site to crash IE 7 way back when. Had turned on compression without any check for particular browsers. Worked great in Firefox and made a site I was working on much faster, but had the side-effect of actually crashing IE. It's one thing to not load properly in a particular browser but this actually crashed the browser. Good ol' IE.

The problem I've run into regarding properly caching everything is that for some reason, the majority of the files served for this site are NOT getting cached. Look at the following two images. In the first is a properly caching Octopress blog, and in the second is this site in its current form:


![image](/images/screen_shot_working_cache.png)

![image](/images/screen_shot_broken_cache.png)

You'll notice that in the second image the majority of the site is not getting properly cached. I have yet to figure out what is causing this. This site uses a theme based on Bootstrap so there is significant bloat to begin with. Bootstrap in its entirety is included even though we're only using a fraction of it. On top of that, many styles for features not used are included. And more javascript than we need as well. My goal is to get the site down to under 300k and fully caching. It's one of those things where I can't focus on anything else until I solve the cache riddle. It's making me crazy knowing it must come down to me having missed some small detail. I'll write another post when I solve the riddle.