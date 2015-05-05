---
layout: post
title: "Counter Caching"
date: 2013-04-24 08:54:13 -0400
comments: true
categories: development
tags: gems rails

---
As promised, a blog post detailing the proper way to handle your counter_cache columns. A bit of a recap before we delve into the new stuff: I have a need to know how many goals a user has and of those goals, how many are completed. So I have a users table and a goals table. The goals table has a user_id field and a completed field. I join the two models together with ```user has_many :goals``` and then ```goals belongs_to :user```. From that we can query how many goals a user has, and then how many goals are completed. We can improve this a bit with eager loading however when using eager loading, we’re loading a lot more data than we really need. All we care about is the total count and the completed count. Loading titles, descriptions, and all the other data in the goals table is very inefficient.

So we decide to use a ```counter_cache``` column but discover that apparently the fine folks behind Rails don’t actually ever use this feature, or if they do, they are using it in some manner unbeknown to me as for my needs, I’m almost always going to need to know more than just one count on a particular model. Goals and completed goals or books and how many of those have been read or well, you get the idea.

After a bit of time spent googling and researching this I came across a gem that is, as far as I can tell, exactly what should be in the Rails code itself. This is how it should work by default since the norm, again just my opinion is multiple columns rather than just one. The gem is called [counter_culture](https://github.com/magnusvk/counter_culture) and if you have use for a ```counter_cache``` column, and I think a lot of you will, then you owe it to yourself to give this a try.

**INSTALL**

``` ruby
gem 'counter_culture', :git => 'https://github.com/magnusvk/counter_culture.git'
```

Then run bundle install to install the new gem.

**DATABASE**

The standard rails migration generator is only going to get you so far on setting up your new files. You can go ahead and generate the migration scaffold but then you’ll need to manually add some code to that. For my needs I used:

``` ruby
add_column :users, :goals_count, :integer, :null => false, :default => 0
add_column :users, :goals_completed_count, :integer, :null => false, :default => 0
```

We want the field(s) to be integers and for this to work properly, you need to set null to false and default them to 0. These settings are why the migration generator isn’t able to generate the entire thing for us. Once you have your migration setup, you’ll of course want to run ```rake db:migrate``` to get your new fields added.

**CODE**

Next you need to add some code to your model. This is as they say, where the magic happens.

``` ruby
belongs_to :user

counter_culture :user,
                :column_name => 'goals_count'

counter_culture :user,
                :column_name => Proc.new {|model| model.completed ? 'goals_completed_count' : nil}
```

The first line is our standard ```belongs_to``` and there’s nothing special about it here. Next we have my first ```counter_cache``` column being setup. This is the standard one that will give us the total count of goals for each user. We are calling ```counter_culture``` on the model and then giving it the column we want it to keep updated. Simple enough I think.

The next block sets up my other ```counter_cache``` column and this one is a bit more involved. It starts the same with setting up the model followed by the column name, but when we define the column name we’re using a ```Proc``` so that we can dynamically determine when the column needs to be incremented or decremented. In this case ```model.completed``` is a boolean and will return true or false depending on whether or not this goal is completed. If you have a more complex situation, you can instead do something like ```model.completed?``` and then def ```completed?``` however you want. Just keep in mind that your ```completed?``` method needs to return true or false and it should work fine.

**DONE**

So there you have it. Simple once you get the hang of it. I actually had some trouble getting this setup initially and received assistance from [@magnusvk](https://twitter.com/magnusvk), the creator of the gem, who responded immediately and was quite helpful. I think you’d be hard pressed to find a friendlier community than what Rails has. People really seem to go out of their way to help each other and it’s because of that, Rails continues to thrive.