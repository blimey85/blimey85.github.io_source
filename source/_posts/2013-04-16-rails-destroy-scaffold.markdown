---
layout: post
title: "Rails Destroy Scaffold"
date: 2013-04-16 06:37:51 -0400
comments: true
categories: development
tags: rails

---
Over the years I’ve generated a scaffold a time or two but until tonight the fact that you can reverse this with ```rails destroy scaffold ModelName``` had escaped me. Such a simple thing and quite the time saver. Combined with ```rake db:rollback```, Rails makes it very easy to try new ideas and if they don’t work out, you can quickly reverse course.