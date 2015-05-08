---
layout: post
title: "Rails Counter_cache Frustrations"
date: 2013-04-23 09:04:16 -0400
comments: true
categories: development
tags: rails

---
For my bucket list site I need to know how many goals each user has and of those, how many are completed. Doing this with eager loading is easy but less than optimal. After watching the RailsCast on the subject ([#23 Counter Cache Column - RailsCasts](http://railscasts.com/episodes/23-counter-cache-column)), I was intrigued. This seemed like the ideal way to efficiently solve my problem.<!-- more -->

I quickly set things up and for total goals, it worked perfect. Create a new goal and the counter would increment. Delete a goal and the counter would decrement. Get the count for goals for a particular user and it would only hit the user table. Nice, clean, efficient. Great, I was half way home. Went to do the same thing for the second column, the counter for completed goals and ran into a problem. You apparently can’t have more than one counter cache column like this.

Normally you set up the counter cache column with the name and then ```_count``` so ```goals_count``` would be the name if you were getting the count for goals. I thought ```goals_count``` and ```goals_completed_count``` would be ideal but no dice.

After a bit of research I found a gem that does exactly what I want. I’m still in the process of implementing this gem but expect a future blog post on how to use this gem in the next few days.