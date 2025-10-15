# Sprint 0 Feedback



## Setup checklist

[X] Repository is created  
[X] All members of the team have accepted the project 
[X] `package.json` is updated  
[X] GitHub project is set up
[X] `pnpm test` and `pnpm run lint` run cleanly  
[X] Github CI is running and the build is passing  
[X] Skeleton is deployed to csci312.dev 
[-] Readme has status badge, goal of the project and link to deployed version  
[X] At least one PR has been created and merged  
[X] a commit has been tagged `sprint0`


Comments:

You are missing the link to the deployed version in the README. 

I see the closed PR, which looks fine. however, I also see that you didn't kill the branch. Make sure that you clean up dead branches after pull requests. 


## Design checklist

[X] The Product backlog is populated with epic user stories  
[ ] There are some lo-fi storyboards with the initial design thoughts
[ ] There are some CRC cards for the main "nouns" in the project

Comments:

Your "epics" are a little light on detail. The items in your product backlog are closer to being epics.

On #6, I would like you to think more deeply about the justification. This takes for granted the idea that we need to have a profile. Is this essential? Craigslist doesn't think buyers need profiles. No user is going to think "I need a profile". They are going to think things like "I want to be able to close items I posted earlier", or "I don't want to enter my location each time I post". Having a profile is the technical outcome. The rationale will tell you what it needs to actually store. 

#7 Do you really want to go down the review path? Will your users sell enough to build up reputations that are meaningful? It will take a lot of work to add reviews -- make sure you think it will be worth it.

#9 This is a good start -- to facilitate buy and sell, the users must be able to communicate. Does it need to be through your application? If your user base is _only_ members of the Middlebury community, email addresses might be sufficient. What makes more sense, post email addresses? fill in a form and have the email sent from the app? in app messaging? What is best for your users? Again, the decision will have a big impact on how much work you are biting off.

#11 I would say the corollary is that _buyers_ are the ones who really want to see the price, good pictures, etc...


I do not see the storyboards and CRC cards. They should be attached to items in your Project.




