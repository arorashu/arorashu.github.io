🎈

# My experience at Arcesium

[Arcesium](https://www.arcesium.com/) was the first company I worked for out of college. My job title was Software Engineer, and soon I was working all across the tech stack. My stint lasted 2 years from 2017 to 2019, in which I grew a lot as a Software Engineer. Here's what I learned making software for the real world.

# Not all tech is shiny

My first task was to port UI's from [Apache Flex](https://en.wikipedia.org/wiki/Apache_Flex) (the SDK for Adobe Flash), to HTML, CSS and Javascript. It probably is a good way to start understanding a complex financial application. I had some experience with web-development [before](https://github.com/rohit-gohri/inno), but with mostly static pages rendered via a templating engine. Also, I was used to doing an `npm start`.

So I read the code for the Flex UI (.mxml and .as files ), and basically rewrote everything in HTML and JS. I had help along the way, and existing "new" UI code to refer. These were just static web pages. I was a bit surprised, why do not we have any fancy UI build step? I though you were supposed to do a `npm start`, or `gulp` or `grunt` or something...

The UI was built using [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), and everything just worked fine! I still really thought a build step is what I want, and it will solve many problems. It may. But you may not need it.

# Debuggers are great

I never seriously used debuggers in college. I just printed stuff, I guess. Well, now when I was debugging a big Java application, running in a web server, with logging setup, I learned to use the debuggers. 

Debug tools in web browsers are especially great. You get to change code, and see the results immediately. You iterate much faster with a shorter feedback loop.

# Extract code when you see patterns

As I was writing more and more UI's, I found myself recreating trivial UI components for every HTML file. I started writing utility functions that I could reuse everywhere. Make your job easier. If you find repeating patterns in code, try to create utilities. However, don't do this too early. [Premature optimization is the root of all evil](http://wiki.c2.com/?PrematureOptimization). Also, because programmers are lazy, you want to [reuse](http://www.catb.org/~esr/writings/taoup/html/reusechapter.html) code.

# Get good at estimation

As I started to participate in sprint plannings and Scrums, I had to estimate how much time I would spend on projects. My predictions were way off in the beginning, as I had yet to grip with the reality of testing, code reviews, UATs and release cycles. With experience you get better at estimating tasks similar to what you have done.

# Design for the user

In college, you program mostly for yourself, or assignments. When designing software for end-users, it is important to have empathy for the user. If not, you may end up creating something no one wants to use. That is the worst feeling. It is a wasted effort, and no one comes out happy. Make sure you understand what the user wants. Ask them why they want them. And if possible, get their feedback iteratively.

It is more important to solve the user's problems, then using the best algorithm, or a specific design pattern. These are important too, especially when working in a team. 

# Question assumptions

One application dealt with huge amounts of data. The processing on the data was done in SQL, and the result propagated up to Java and then the UI. Reading thousands of line of SQL code is not fun (at least to me). Also, you lose the warm feeling of testing and debuggers you know how to use. The assumption was that doing all this processing inside Java would be very expensive, and slow. That assumption may have been true a decade ago.

I did a rewrite of the whole processing in Java. I could optimize Java code better than SQL code, and so could rest of the team. The processing time reduced from 10mins to 30s. Such a significant speedup delighted the user. The aim was to make the code more maintainable in Java. The unintended consequence here was positive. The lesson: question all assumptions.

# Keep it simple

After using many technologies, its starts to feel you need them in every project. I jumped in on one application made with React, Redux and Sagas. I liked the change from Vanilla JS. But mostly, I enjoyed writing React. In the next application, I got rid of everything elseexcept React, and it all worked well. It was even simpler. It is easier to understand, and to onboard fellow developers.

Design for [simplicity](http://www.catb.org/~esr/writings/taoup/html/complexitychapter.html).

After two great years at Arcesium, I decided to do a Masters at [BU](https://www.bu.edu/eng/), to study more about Computer Science and Engineering. Everything from Distributed Systems, Self-driving cars, cloud computing and parallel programming.
