---
layout: post
title: "Who Died and Left You Brew Master?"
date: 2013-04-15 09:39:44 -0400
comments: true
categories: development
tags: features

---
I’ve recently started a new project and I’m finding the most difficult aspect has nothing to do with the actual coding but instead, is deciding which features to include and/or how to include them. It’s the top-level stuff that is difficult, not the nitty gritty. You want to be able to login via Facebook? That’s an easy thing to add but with adding that comes the question of what other sites should we integrate with? Twitter? Google? Bob’s House of BBQ? I opted for the big three: Facebook, Twitter, and Google. And with Google came the question of do I include *just* Google or also Google+? What about Google Apps? Apparently these three all have different authentication methods.

When setting up the profile page I had a bunch of questions about what I should include. Do I include Gender? If so, what options do I want to have? Male, Female, Other? But other might offend some people. While considering this particular question I did a quick Google and found that there are actually a LOT of people that are offended by the term other in this context. So what then? And do I add an option saying they didn’t want to say? Or maybe I make it so you can hide your gender so others can’t see it.

So now we’re going to allow people to hide parts of their profile? Well, we also ask for **first name** and **last name** as well as each user having a **username** so we’ll want to allow them to hide their real names. And since we are asking their real names, do we want a way to verify their real names? I’ve seen that done on some sites.

And we want to allow people to list their Facebook and Twitter accounts but what about Google+? I don’t use it but I know a lot of people do. And Pinterest is popular. As is Instagram. As is… see where this leads? Maybe we set this up so it’s free form… they enter whatever site in one field and their username in a second field. But then how do we link it? Better to make it a drop down where they can select the ones they want.

So again, the most difficult aspect isn’t the actual code. I can write great code and add features until the cows come home, but knowing which features to include and which aren’t worth the time or even worse, will become problematic, that’s the difference between great sites and crap sites.