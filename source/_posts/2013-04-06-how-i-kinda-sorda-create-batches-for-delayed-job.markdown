---
layout: post
title: "How I Kinda Sorda Create Batches for Delayed_job."
date: 2013-04-06 03:05:41 -0400
comments: true
categories: development
tags:  delayed_job rails ruby

---
For a recent project I found myself needing to batch process a large number of images twice per week. On average I’d be processing around 4,000 images and once processed, would need to tar these up and then upload them to the data center. Now we could debate the merits of this approach and I believe we’d be in complete agreement that there absolutely must, and is, many different ways to achieve the same end result, but that was beyond my control. My task was to process and upload the images.

The current setup was/is php and if you know me, you know that while I’m a php dev, I’ve never really cared for the language. I started this journey into code poetry with perl which I still to this day have much love and respect for. Well, to be honest, I started many years prior in other languages besides perl. Something on my Texas Instrument machine back in ‘81 or ‘82. Applesoft Basic around ‘87. Dabbled a bit with Pascal back then too. But anyway, Perl was the first language I really dug into and used professionally. When php came around I started using it and eventually it became my primary language for everything. This was a conscious decision I made, but then again, being a programmer was never a conscious choice I made either.

But getting back on point, the current setup was php and worked fairly well. It was slow and if anything went wrong, the network connection dropped, database dropped a connection, or the wind blew a bit too strong or from the wrong direction, all hell would silently break loose. There is single log file which awesomely only gets generated at the very end of the run and obviously only if the run succeeds. if anything goes wrong, good luck figuring out where the problem occurred and how much of the process was completed. Those before me apparently didn’t care much for things like logging or real-time stats. So I set out to write something much more robust in my fave language, Rails. Ok fine, Rails is a framework, not a language… but this is my blog and I’ll call it what I want. :)

Skipping ahead to the point of this post, I had a rake task that could process my images and do what I needed with them and it worked pretty well. My only issue was that things weren’t very fast. I scanned the directories, grabbed all the tif files, and one by one generated the png files and saved them to my target directory. Enter delayed_job. With a few tweaks of the code I was able to process my images 8 at a time. This made an incredible difference with how fast I could process a batch of images. But there was one issue. At the end of processing I need to tar up the target folder and then upload it to the data center. Initially I had, since everything was sequential, had the necessary code for archiving the folder, and then uploading it, right in the same script. It would loop through the images and then do the rest. Now that delayed_job was getting all of the image conversion stuff, the folder was getting compressed much too soon. I had no way to tell when the conversions were done. I researched the issue and could find no way to setup any sort of batch with delayed_job so I looked at some other similar tools. Nothing jumped out at me. Surely there must be a way to create some sort of batch-like something. I couldn’t be the only one that needed to know when a group of jobs had completed. And then it struck me, what if I created a job that monitored the other jobs and when it detected it was the only job remaining, would wrap things up?

Here is the rake task that handles processing the images:

``` ruby
namespace :comments do
    desc "Prepare comment images for upload"
    task process_images: :environment do
        # lets get our conversion on
        Dir.glob("#{COMMENTS_PATH}/*/*/*/*.tif") do |tif_file|
            Comment.delay.tif_to_png(tif_file)
        end

        # and now add a job to check on the other jobs
        Comment.delay.tif_to_png_completed

        # and now lets write home about it
        puts "Busy day at the factory! Many jobs queued up."
    end
end
```

And here are the two methods from my Comments model:

``` ruby
# method for converting tif to png
def self.tif_to_png(tif_file)
    image = File.basename("#{tif_file}", ".tif")
    %x[ convert "#{tif_file}" -resize '800x800>' -quality 9 -type Grayscale -depth 4 "#{COMMENTS_PATH}/comment_images/#{image}.png" ]
end

# method for determining if all tif_to_png() jobs have completed
def self.tif_to_png_completed
    @running_jobs=Delayed::Job.count
    if @running_jobs > 1
        return 0 # fail so delayed job will retry
    else
        # jobs have wrapped up - assume images have been converted - toss 'em in the tar pits
        %x[ tar -C #{COMMENTS_PATH}/comment_images -czf #{COMMENTS_PATH}/comments.tgz . ]

        require 'net/sftp'
        Net::SSH.start(REMOTE_SERVER_IP, REMOTE_SERVER_USER, :password => REMOTE_SERVER_PASSWORD)  do |ssh|
            ssh.exec! " mkdir /home/gary/testing/ "
            ssh.sftp.upload!("#{COMMENTS_PATH}/comments.tgz", "/home/gary/testing/comments.tgz")
            ssh.exec! " tar -zxf /home/gary/testing/comments.tgz -C /home/gary/testing "
            ssh.exec! " rm -f /home/gary/testing/comments.tgz "
        end

        #TODO: send out email with stats
    end
end
```

The interesting bits are lines 9 through 11 of the second code block. Line 9 simply checks to see how many currently running jobs there are. In this particular case the only jobs running on this machine are from this one task so I’m not using a named queue or anything fancy. I just want to know how many are currently active. If any jobs have errored out, then they will remain active in the queue and my task will effectively stall at this point, which is what I want. If even one image fails to process, I want to know about that, and resolve it, before continuing on. Now you’ll notice that I’m not doing anything sophisticated here. I’m not specifically checking for errors because again, this is a very simple setup for a task that I manually check each time it runs. It would be trivial to add in additional checks for things like errors, and then have it notify you that something went wrong.

So line 9 gets the count and then line 10 is where the magic happens. Delayed_job will retry a failed job over and over until it succeeds or it hits the max retries which I think is something like 25 times. In this case, we load up the queue and our little checker job goes in last. Running 8 workers means that there will be roughly 7 other jobs in the queue the first time the checker job executes. It will fail at this point with a “return 0” making delayed_job requeue it. 5 seconds later it runs again, and in my testing, fails again so back into the queue. Third time around there aren’t any other jobs in the queue besides the checker job so it now succeeds and the rest of the code executes.

I find it odd that there is no built in way to specify that a particular job is part of a batch. As I stated early, I’m quite certain I’m not the first person who has wanted to do something like this. I also realize that I’m still fairly new to Rails and there may be a very good reason for NOT doing what I’ve done here but until I figure out what that reason is, or someone is kind enough to point it out to me, this seems to work and work quite well for my needs.