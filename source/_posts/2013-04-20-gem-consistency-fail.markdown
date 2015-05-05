---
layout: post
title: "Gem: Consistency_fail"
date: 2013-04-20 09:24:09 -0400
comments: true
categories: development
tags: gems

---
In rails it’s common to add a ```validates_uniqueness_of``` validation to models for any fields that you want to be unique. Most of the time this is sufficient and will catch when a record is submitted that already exists. But what if two submissions come in at the same time? What if a user while registering clicks the submit button multiple times? You could run into a case where rails checks for uniqueness multiple times before the first record has time to be saved in the database, sees that they are in fact, at that point in time, unique, and allows them to go through. The database doesn’t know you want them to be unique so it gladly accepts them, and now your formerly pristine database is pristine no more.

Enter this nifty little gem: [consistency_fail](https://github.com/trptcolin/consistency_fail).

```
gem install consistency_fail
```

``` plain
➜  bucketlist git:(master) ✗ consistency_fail

There are calls to validates_uniqueness_of that aren't backed by unique indexes.
--------------------------------------------------------------------------------
Model                      Table Columns
--------------------------------------------------------------------------------
ActsAsTaggableOn::Tag      tags (name)
ActsAsTaggableOn::Tagging  taggings (tag_id, taggable_type, taggable_id, context, tagger_id, tagger_type)
User                       users (username)
--------------------------------------------------------------------------------

Hooray! All calls to has_one are correctly backed by a unique index.
```

In my initial usage I had three indices that needed to be added. I quickly created two migrations (one for tags and taggings as they are related, and one for users) and then ran the tool again:

``` plain
➜  bucketlist git:(master) ✗ consistency_fail
Hooray! All calls to validates_uniqueness_of are correctly backed by a unique index.

Hooray! All calls to has_one are correctly backed by a unique index.
```

Now sure, I know some of you will say that these indices should be created when you add the validation to the model and by doing that you don’t need a gem such as this one, but who among us is 100% effective in never forgetting little things like this? You create your table, build out a form, realize you want a couple of fields unique so you update your model, “oh, I need to add an index to the db… I’ll do that as soon as I’m done with…” and you forget all about it. We’ve all been there. But now we have [consistency_fail](https://github.com/trptcolin/consistency_fail) to help us with such things.