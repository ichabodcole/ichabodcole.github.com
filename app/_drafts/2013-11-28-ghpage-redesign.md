---
layout: post
title: The Great Github Page Redesign
subtitle: A Retrospective
tags: code
---
{% include title_data.tmp %}

I recently decided I wanted to start blogging about some of the code and the not code things I've been learning while working on my "bigger project". However, looking at the design for my github page, basically made me barf in my mouth. So before I could write a single new post I decided to redesign the layout from scratch. I had a few requirements for the redesign listed below.

1. Must be minimal, article content should come first.
2. Must be responsive, the same content should work on desktop and mobile devices.
3. No javascript libraries, only native dom manipulation and event handling.

The first two were fairly intuitive decisions, but the last was really an attempt to learn how to use modern browser javascript APIs without relying on something like jquery. Don't get me wrong, I love jquery, but I've been feeling like I have no idea how to make a website function without it or some other middleman library. The rest of this post is dedicated to the process I took and the lessons learned along the way.

Step 1: Photoshop

There is a lot of talk these days about "designing in the browser", but I almost always start in Photoshop, and when I don't I usually regret it. There are definitely limitations to what you can express in screenshots, but I find it is much faster to make the majority of design decisions before you start coding. If I'm not sure how an interactive feature or dynamic element will work I often prototype it out in something like codepen, and then come back and mock up a final design for the necessary elements in photoshop.

Step 2: The working environment

My original blog, was a standard jekyll blog that I could push to github and it would render. This works fine if you are just using a template, and aren't actively developing the site layout and functionality.
