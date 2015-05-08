---
layout: post
title: "Nested Models vs Monolithic"
date: 2013-04-16 09:29:29 -0400
comments: true
categories: development
tags: rails

---
When setting up a new database schema, one is faced with a multitude of choices and decisions that can directly impact both the performance and maintainability of said database. One decision regards Nested Models vs Monolithic Models. What are the differences and why is one better than the other?<!-- more -->

We start with a user table that contains the usual suspects. The user can login, enter their basic info, and even a blurb about themselves. Then they want to link their profile to various social sites. Simple enough, on the surface.

Beyond deciding which sites to support, we have to decide how we want to handle things on the back end. Do we want to go the proper router and employ nested models, or do we cram everything into the user table?

<table border=1 cellpadding=0 cellspacing=0>
    <tr><th>Monolithic</th><th>Nested</th></tr>
    <tr><td>id</td><td>id</td></tr>
    <tr><td>email</td><td>email</td></tr>
    <tr><td>username</td><td>username</td></tr>
    <tr><td>…</td><td>…</td></tr>
    <tr><td>facebook</td><td>&nbsp;</td></tr>
    <tr><td>flickr</td><td>&nbsp;</td></tr>
    <tr><td>youtube</td><td>&nbsp;</td></tr>
</table>


With the monolithc setup, that’s all you need. If the user wants to link to Facebook, they enter thier Facebook username and you store in the field apropriately called Facebook. Simple, straightforward, and ultimately the fastest since it requires no joins in the database.

For the nested model method we’ll need to add two additional tables. One for our networks, and one for our associations between users and those networks.

<table border=1 cellpadding=0 cellspacing=0>
    <tr><th>Networks</th><th>User_Networks</tr>
    <tr><td>id</td><td>id</td></tr>
    <tr><td>name</td><td>user_id</td></tr>
    <tr><td>url</td><td>network_id</td></tr>
    <tr><td>&nbsp;</td><td>username</td></tr>
</table>

Nothing complex between these. Networks table has the name for each of our social sites and also the url to the profile page for each site. User_Networks has the association for each user to whichever social sites they’ve enabled and then their username for that site.

The problem happens when you go to setup all the code that is required to use nested models on the front end. You first set up your associations in the models and then you have to setup your nested attributes. Once that’s done and Rails is able to link the models together, you need to set thigns up in your controller and views. That’s where I ran into problems. I was able to use the ```cocoon``` gem and get things working fairly well, however while I was able to add social sites to my profile, I was NOT able to add the username for each one. I had a drop down list for the various social sites but couldn’t determine how to add an input box that would allow a user to enter their username. In the end I reverted back to the monolithic method.

As I stated earlier, the monolithic method has the bennefit of being faster. It’s impossible to get joins and associations to be as fast as having everything in one table. I don’t anticipate ever having thousands of concurrent users on this site, but in the event it gets popular, this decision here might really help me. Or at least that’s what I’m going to keep telling myself since I couldn’t get the other way working satisfactorily. :)