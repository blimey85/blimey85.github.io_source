---
layout: post
title: "Auto-Tweet Octopress Blog Posts Using IFTTT"
date: 2013-04-21 09:06:42 -0400
comments: true
categories: blogging
tags: octopress twitter automation

---
When using a blogging platform such as Wordpress, you can typically find a plugin that will do pretty much anything. With Octopress you’re a bit more on your own. Thankfully there are services that assist with much of this. Today I setup an account on [IFTTT](https://ifttt.com/) which stands for If This, Then That. Once you have an account on here, setting up automatic tweets is trivial.<!-- more -->

**Easy Steps:**

1. Create a free account on [IFTTT](https://ifttt.com/)
2. You’ll want to check your email and verify your email address by clicking the link in that email. I didn’t do this step initially and it took me a bit to figure out why my recipe wasn’t running.
3. Click on Create a ```recipe```
4. Click on ```this``` (only option on this page)
5. We’re going to be using our ```atom.xml``` file so click ```Feed```
6. Now click on ```New feed item``` so we get 1 tweet for each new blog post
7. ```Feed URL``` is the path to our ```atom.xml``` such as: ```http://traffan.com/atom.xml```
8. Now click on ```that``` (only option on this page)
9. Select ```Twitter``` since we are setting up a tweet.
10. Here you’ll be asked to activate your Twitter account. This just means you are giving IFTTT access to post on your behalf. Don’t worry about this step. IFTTT is quite popular and well respected. They won’t do anything malicious.
11. Now click on ```Post a tweet```
12. Now you need to tell it what you want your tweets to look like. I’m using: `New blog post: ’ for mine, but you can put whatever you want in yours.
13. Last step asks you to enter the description you want to use for your new task and then click ```Create Recipe``` to save your new masterpiece.

Provided you set things up correctly and remembered to verify your email address, your new recipe should now be running every 15 minutes checking for new posts and tweeting about them.