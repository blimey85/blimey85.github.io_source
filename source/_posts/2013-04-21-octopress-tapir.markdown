---
layout: post
title: "Octopress Tapir"
summary: "How I setup Tapir search for my Octopress blog and the files I used."
date: 2013-04-21 06:17:11 -0400
comments: true
categories: blogging
tags: octopress tapir search

---
For those running Octopress and wanting to set up a full-text search of their site, something a little nicer than the stock Google Simple Search, Tapir is a valid option. It's a third party website that indexes your RSS feed and provides search tools against that data-set.<!-- more -->

**Note:** You can find the relevant files on GitHub here: [octopress-tapir](https://github.com/blimey85/octopress-tapir)

[Tapir](http://tapirgo.com/) search for your [Octopress](http://octopress.org/) blog!

Tapir works by indexing your RSS feed. Only what is included within this file will be indexed. For RSS purposes you most likely only want the last 20 or so articles but for search, you want all of them included. To handle this, we simply create a second xml file to use for search.

```
atom.xml
```

* the original file
* limited to 20 most recent posts
* we use this for RSS

```
atom_search.xml
```

* the new file
* a modified version of atom.xml
* includes all posts
* added summary field

**Install**

1. Visit [Tapirgo.com](http://tapirgo.com/) and enter the url to your ```atom_search.xml``` like: ```http://yoursite.com/atom_search.xml```
After you enter your email and click the big ```GO``` button, you’ll be given both a public and a private token.
2. Open your ```_config.yml``` and include the public token: ```tapir_token: your_id_here```
3. Copy ```loading.gif``` to your ```source/images/``` folder.
4. Copy ```jquery-tapir.js``` to your ```source/javascripts/``` folder.
5. Copy ```search.html``` to your ```source/``` folder.
6. Open ```source/_includes/navigation.html``` and add:


``` html
{% raw %}{% if site.tapir_token %}

  <form method="get" action="/search.html">
    <fieldset role="search">
      <input class="search" name="query" type="text" placeholder="Search..." x-webkit-speech />
    </fieldset>
  </form>

{% endif %}{% endraw %}
```


That’s all there is to it. You should now be able to search your content using the wonderful [Tapir](http://tapirgo.com/) service. :)