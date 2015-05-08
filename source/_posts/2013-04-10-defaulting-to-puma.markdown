---
layout: post
title: "Defaulting to Puma"
date: 2013-04-10 09:51:18 -0400
comments: true
categories: development
tags: puma rails

---
For whatever reason I’ve switched from Webrick to Puma as my default development server. At one time I was getting some odd errors with Webrick and my cursory Google searches indicated it was an issue with Webrick itself. I assume since Webrick is bundled with Rails that it’s decent but I really haven’t heard any compelling reason to run it. Whatever the case, I made the switch to Puma but found that when I would type ```rails s``` Puma wouldn’t boot. I had to instead type ```bundle exec puma``` which of course was completely unacceptable!<!-- more -->

If like me, you’d rather be able to use the shorter command, do this:

Inside your project folder find ```/script/rails``` and add the following:

``` ruby-raw
require 'rack/handler'
Rack::Handler::WEBrick = Rack::Handler.get(:puma)
```

That’s all it takes. Now when you type ```rails s``` you’ll get Puma.