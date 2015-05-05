---
layout: post
title: "Installing, Reinstalling, and Then Reinstalling Again."
date: 2013-04-06 09:59:13 -0400
comments: true
categories: development
tags: brew mac mysql postgresql

---

When setting up any development environment, you strive to get everying working just right. I’ve only had my mac for around five weeks now and in that time, I’ve installed and reinstalled things more often than I care to admit. I think tonight I may have finally succeeded in getting a workable setup accomplished.

Since I’m using Octopress rather than Wordpress, I no longer have a need for Mamp so I’ve gone ahead and removed that. I was then able to go back to useing the MySQL that is installed via Brew. By switching back, I resolved the issues I was having previously with both command line tools not always working just right, and sockets not being utilized. Tools wanted to use /tmp/mysql.sock by default but the MAMP version had it’s own location for files, and it’s own way of doing things. Now I don’t fault MAMP for this and in fact feel it’s the right way for them do it. This keeps what they are installing completely separate from everything else, minimizing the possibility of conflicts. If you have the experience and know-how to integrate the install with the rest of the system, adding the new path to your existing path and so on, then you shouldn’t have any issues. I, however, had some issues with doing that.

One thing I think I was doing wrong was adding my new path to the end of the existing path when I should have done the opposite. I was trying to get it to overwrite anything else but it seems, unless I’m mistaken, that the first setting is what actually gets accepted and kept. I’ll play with this more later just so I know for sure which way actually works. I deff still have quite a bit to learn about the OS X command line and paths.

So MySQL is installed via Brew and seems setup corretly. PostgreSQL is installed via the [Heroku Postgres.app](http://postgresapp.com/). I wanted to install this via Brew only to be consistent with how I have MySQL installed but I ran into a number of issues trying to get the PostGIS extension installed. First an issue with libgeotiff not finding libtiff properly. I managed to resolve that by passing in the path to libtiff. Then a few steps in the process later, gdal (I believe that’s waht it’s called) didn’t want to install.

Next I tried the [http://www.enterprisedb.com/](http://www.enterprisedb.com/) installer and that worked fine, installing first the db and then a second included installer was used to install PostGIS. The problem came after the installation was completed. When I created my test database, connected to it, and then attempted to ```CREATE EXTENSION postgis;``` it failed stating that ```postgis.control``` could not be found.

I still have an issue with the PostgreSQL install not using sockets in the standard manner. When I try ```psql``` on the command line, I get an error related to the Unix domain socket. If I instead use ```psql -h localhost``` it connects fine. One of the same issues I was having with MySQL before swtiching back to the installation via Brew. But thankfully the PostGIS stuff is working and I can figure out the socket issue when I have more time.

**Edit**: I just added the Postgres.app path to my .zshrc file and now the socket issue is resolved. I’m able to log in to my database without passing in the host. So my issue earlier was that I was adding this to the end of the path, rather than to the beginning. That’s good to know. Obviously makes a huge difference sometimes.