# Final feedback

(X) tagged commit on main for sprint3
(X) set of closed user stories
(X) working deployment on csci312.dev
(X) GitHub reports build passing
(-) team members have completed reflection
(X) presentation
(X) demo
(X) report
(X) README has full deployment instructions

## Checklist notes


Arai, Sebastian P., Shari have not submitted sprint reflections. 

You did provided a deployment guide. I appreciate the database schema with explanation. The actualy instructions on the steps were a little on the loose side, and use `npm` instead of `pnpm`. 

There are closed user stories, but it is a little difficult to tell which ones are new. 

## Discussion

### User stories

Your user stories seem very similar to when I looked at them last time. You have a mix of reasonable ones and ones that are a little problematic. 

### Agility/scrum
I see some complexity scores on user stories. Some of these have been assigned, which is promising. I do see the user story about reviews that is lists as a complexity of 1 and complete, neither of those things appear to be true. 


### Integration

I do see evidence that you were using feature branches, however yuo currently have a collection of active branches that should have been dealt with. I am a little concerned that the names of these branches are more general than "features". 

You have a reasonable number of pull requests, but I don't actually see any evidence that they are being used to review code before it is merged to main. 


### Implementation

Continuing my example of how AI can actually help you in a positive way, I have provided a code review created by copilot in this feedback folder. My prompt:
"I would like a code review performed on the project in project-amber-aardvark. In particular I would like to know about idiomatic use of React and Next, any signs of leaky abstractions and any potential build up of technical debt. Write the contents of this review into the open sprint3-Copilot-review.md"

1.1. This isn't a huge deal since it is just the same file from the starter code with no additions, but you also have had a model on how to convert that to TSX.

1.2 This looks like it is the outcome of inconsistent communication about how you were implementing things. Copilot is right that you should have been more consistent about this.

1.3 We didn't spend a lot of time talking about error handling. I appreciate that you made an attempt. `alert` is indeed not considered very user friendly, but it is better than console.logging errors if they are show stoppers. ideally error should be handled gracefully internally with feedback provided on the page.

1.4 This is okay, but the advice to put it in a hook is sound. 

2.1 Absolutely. You really want to follow the lead I provided and hide those supabase calls behind at least a thin abstraction. This will make the bulk of your code less reliant on the details of supabase and make it more testable as well. 

2.2 I told you to do this -- it is fine.


2.3 It does seem like this was perhaps an artifact of "just make it work" thinking that hadn't fully spread out to the reset of the code. 

2.4 I am not overly concerned about this. Some options include a container component that handles the logic but not the display and another would be what Copilot suggests: a custom hook. 

3.1 You can file this with the other comments about error handling

3.2 We didn't talk too much about this. More validation would have been good, but I am not expecting much more than what you provided.

3.3 This isn't the biggest deal, but worth looking into.

3.4 DRYing this out would be good

3.5 We do want to commit to either fully controlled or fully no controlled. 

3.6 This isn't a bad idea, but it really isn't that big of a deal for two pages.

3.7 I am not overly concerned about this one either. 

3.8 Inline styles should be avoided unless it is for something very specific that is important for the functioning of the component. 

3.9 Apparently Copilot didn't read your one tests. There are no tests so I would not have listed this as "low priority"

3.10 Consistency is always good. I am not overly concerned about the loading state for our class projects, but it is a good practice to add those. 

4.1 This isn't bad advice, but your project is possibly not large anough to need that step yet.

4.2 It is not wrong -- you have some files that got a little large which suggest there is some refactoring that could happened somewhere. 

4.3 React Query and SWR are fine solutions, but not what I taught you. You can disregard. 

5.1 Your approach does rely on RLS, but that is the model I gave you.

5.2 This is not wrong, but nothing I'm worried about


It looks like Copilot is largely of the opinion that your code looks solid. Many of the issues it identified are not ones that I am concerned about for your purposes. Copilot is correct that some of your files have grown a little large, which is a little bit of code smell suggesting that you could do some more to break things up. Another thing that Copilot didn't point out is you EditListingPage which has a very large number of state variables. You are on the edge of a reasonable number of state variables to keep track of. 

I am also not fond of the amount of hard coded values you have on the site. The EditListingPage is full of them and then they are duplicated in CreateListing. These should be stored in a config file, a database, or perhaps not actually used at all. Is there a benefit to having these fixed categories?

I am seeing some indications of AI use around the edges of your components. While not a problem it can indicate code you don't understand and can't maintain or debug.

You have not really excelled on the testing front, which is to say you have _none_. You have a directory that says tests, but it looks like it is just an earlier or experimental form of the ListingCard component. 


### Functionality

You do have a site that one could plausibly buy and sell from. It has the basics that you originally specced. There are some things missing, as you noted, but I think the review system is best not included. I think the chat box that you lost would have been a good addition. 

I have seen a few buy and sell sites go by in this class, and the fact that you got all of the pieces together for a full flow of buying and selling and consideration of the communication in between is to be congratulated. Other groups have foundered on this idea. 

I have to admit that my favorite piece that you implemented is the double ended slider. I am a sucker for those from a UX perspective. 

On the other side, I would have liked to have seen more thought put into scalability and actual use. You design seems to anticipate a fairly small number of items for sale. You are also too prescriptive with your predetermined lists of objects and categories and the inclusion of color as a privileged attribute. 

I think that a little more consideration about how the site might actually be used and some more support for connecting users that would elevate this from solid class project to usable site. 



### Final word

As I said in class, all of the groups have something to be proud of. You have a working site. That is an accomplishment. I think your process was not always the greatest, and you kind of skipped a whole piece of our approach (yes, those missing tests). overall, however, you did a good job. 