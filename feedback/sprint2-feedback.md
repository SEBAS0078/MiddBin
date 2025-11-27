
# Sprint 2 feedback

( ) tagged commit on main for sprint2
(X) set of closed user stories
(-) working deployment 
( ) GitHub reports build passing
(-) team members have completed reflection
(X) demo

## Checklist notes


Obviously, while you have a working deployment now, you did not when it was demo time. 

There is no commit that is tagged `sprint2`

Github does not currently remote the build as passing (which is quite a trick considering the number of tests you have written...)

 I am missing Sprint reflections from Ben and Sebastian P.

## Discussion

### User stories

I am seeing an improvement with the user stories (as in there are some user stories now). The done pile is still a little sparse, and I think that is because you are still focusing a little too high level. Like #24, "AS a buyer I want to be able to create listings with various details, so that potential buyers can see my offers". Leaving aside the fact that it is sellers who make listings... What details? What offers? What do the details of the listings have to do with seeing your offers? I would break this down much farther.

> As a seller, I want to be able to describe my item with free-form text because I want to be very clear what I am offering and its condition to avoid unproductive conversations with potential buyers. 

This is very clear what feature needs to be implemented (some way to add free form text to a description), with a clear benefit for the seller (_benefit_ not just some reason). 

Or, you could go the other direction 

> As a buyer, I would like to be able to just look at things that are in Like New condition because I don't want ratty old things, and I don't want to waste my time reading through descriptions or talking to sellers.

This implies two things -- every listing has a condition rating and that there is a way to filter by it. We might support this with


> As a Seller, I want to be able to select the condition of my item from a pre-defined list (e.g., New, Like New, Used, Poor) when creating a listing, so that buyers can accurately filter my offer and I receive fewer questions about the item's state.

If we don't think that sellers actually do want this feature, we might write

> As the owner of this site, I would like sellers to be forced to classify the condition of all of their items so I can provide buyers filtering based on condition because if they can find what they want faster, they are more likely to keep using my site. 

_Note that the site owner is different from "developer" in most cases (even if it isn't in your specific case -- they are different hats that you are wearing). Avoid "As a developer..." as it is usually just a way to add things you haven't figured out how to justify._

The next part of this is that you would write in with the user story how your team has decided to implement it. For example, is this a collection of checkboxes or a drop down. There is a pretty clear acceptance criteria for the buyer story as well: the seller has an option that allows only items that are Like New to be browsed. 


Some of what you have, I don't understand, like "As a student in general I want to be able to browse the navigation bar to see what the site offers". What does "browse the navigation bar mean"?

The upcoming items are looking a little better, though many are still overly broad, general, or missing things. Three further examples


#28 "As a user I want to be able to view my history of listings so I know what I have on sale or have already sold"

Presumably, you mean "seller". This does not provide a benefit to the user. _Why_ do they want to know what they have for sale? Why do they want to know what they sold previously? One obvious benefit to me of having the ability to list what is currently for sale would be to edit it or close it once it was sold (two fairly important actions that are not represented anywhere in your backlog, I'll note). If we were to focus on closing a listing, then we would want a story that covered being able to close a listing and we would then want a story like this one that was along the lines of "As a seller I want to be able to see just the items I have listed for sale so I can quickly find listings that need to be closed.". 

#8 "As a user of this website, I want to be able to have an account so that my activity can be centralized as the actions of a single profile."

Do all users want an account? What purpose would persistence of data have for a buyer? What activity?

The advantages for a seller are perhaps obvious. They want to be able to make listings that they can update later (to change or remove). If there is no authentication and authorization then either everyone would be able to update listings or no one would. 

Are there advantages to a buyer? What about the buyer's experience would be made better by being able to log in? Or, what about other stakeholders lives would be made better if buyers had to log in? Maybe if you are doing reviews you want to make sure that buyers leaving reviews are valid users? Are there other reasons? Does it save the buyer time to not have to enter their email somewhere? Does it facilitate communication with the seller some way?

#7 "As a buyer, I want to be able to leave review on an item I purchased so that other users can see my experience with the seller. "

This one is a little different. It has a clear acceptance criteria -- leaving a review. It also has a rationale. Does it help the _site_ in some way for transactions to be rated? Does it lead buyers to feel more comfortable? This is not an idle question. This is a major feature (despite you putting a 1 on it) and you should be very sure you want it before committing to it. 

Is it a major feature? Yes, there are a number of things that fall out from this (that should be covered with other user stories)

- it needs to be stored somewhere. 
    - where is it in the database
    - What is it associated with, the item or the seller?
- it needs to be available to be read somewhere. Where is that? How will buyers find it?
    - On the listing? (does that mean buyers have to sift through old listings?)
    - On the seller's profile? (do sellers have a profile page that a buyer would look at?)
    - On future listings of the seller? 
- how do you prevent abuse?
    - do seller have any recourse to answer bad reviews?
    - is there some way to confirm that buyers bought the item? Who confirms it, the seller?

There is a lot going on here. If you go ahead with this feature, it is going to require a large number of new user stories and it definitely would not be a 1 to implement all of the moving pieces. 

What I would hope for in this final sprint is that you go through and further massage your user stories to be specific to a particular feature, have justification and a clear acceptance criteria for when it is done. 






### Agility/scrum

I am seeing some scores starting to appear on the current backlog items (though the review story didn't leave me with a lot of confidence). I also see some 8s on #35 adn #26. I don't disagree that those look harder. They also are covering the same feature. This suggests that you need to do some further decomposition. 

Things look pretty bursty with a big spike this week. It also looks like there is some unequal commits, which is okay if you are pair programming. I am wondering who abcdefghijklmnopqrstuvwxyz is.



### Integration

I am not seeing many PRs that are Sebastian bouncing off various issues during my office hours on Thursday. I also see a _lot_ of open branches (14!). The process should be: pick a feature from the back log, implement it, make a PR, PR is accepted, kill the branch. 



### Implementation

As an example of how AI can actually help you in a positive way. I have provided a code review created by copilot in this feedback folder. My prompt: "I would like a code review performed on the project in project-amber-aardvark. In particular I would like to know about idiomatic use of React and Next, any signs of leaky abstractions and any potential build up of technical debt."

Looking at what it has to say:

1. You indeed have a mix of JavaScript and TypeScript in your project. Everything should be using .ts or .tsx and properly type checked.

2. It is correct that yuo should only have a single supabase client, preferably the one in supabase_client.ts, which implements the singleton patter. 

3. I agree, the `Listing` type should only be defined in one place

4. You should be following the naming convention that components are capitalized and in CamelCase (PascalCase). This is less critical, but a good idea (and cheap to fix).

5. This is clearly working -- Next is probably helping you out here. This isn't the biggest deal, but good form to fix (and another easy one)

6. I've spoken you Sebastian about using `img`. I understand that we are in a transitionary moment and that you will commit to using `Image` when you have sorted out where images live.

7. It is true that fetching the data on the server side would be a better solution, but this isn't something we have really talked about. You are fine using the slightly less efficient `useEffect` in this instance. 

8. This looks like an artifact of an incomplete transition to using supabaes. 

9. it is true that the alert boxes are not really in vogue any more. A better solution is to display error message embedded on your page in meaningful way or otherwise work around errors. However, as this is superior to using `console.log`, this would not be a high priority fix for me.

10. Inline styles are not hugely high priority, but since we are using CSS modules, it would be better to keep all of the styles in the module.

11. This is correct -- you don't want that (and this isn't what I showed you in the practical). This redirect will only work for local development and it will crash and burn in your deployed version. We only need this option when we want the user to go to a new page after being logged in, and as the advice says, this should be an environment variable so we can change it for different deployments. In this particular example, someone has not read the documentation properly, because this isn't where you want the application to redirect to. The auth/callback portion is the portion that should be talking to supabase. 

12. See above

13. This is correct -- your code should be DRYed out. A `Navbar` component is a good choice. You can also add the component to the _app.tsx file so it is visible everywhere (if that is appropriate). 

14. A custom hook isn't a bad idea, but this is not a high priority fix. 

15. Empty component files are a bad sign. In this case I would say it is evidence of poor process. An empty file should not have made it through the PR process to be incorporated into your main brach. 

16. On the face of it, a test that references a non-existent component is perhaps a sign that TDD is going to be practiced. _However_, it absolutely should not have found its way in the main branch which should always pass all of its tests. 

17. It is true that this test is aso a little problematic, though not quite in the way it suggests. The most significant problem is that the dummy data doesn't match the data in the JSON file. As Copliot says, the price should be a number. The other problem is that testing for "truthy" is not the best way to perform these checks. You should be using `toBeInTheDocument`. Or in the case of the image, you should find the image by role and then test its attributes. 

18. Consistency is better, but I am not overly concerned about this

19. Copilot is right -- don't fall back on quick fixes like ! that bypass type checks. 

20. I'm not as fussed about assigning a return type to functions unless TS complains (though copilot is right that it would be better if you did more of it.)

21. This somewhat repeats an earlier observation -- stick to CSS modules. 

22. This is a repeat again. It is possible that Tailwind is actually installed as a dependency of something else so you are getting some of the benefits without explicitly installing it. however, the point stands, stick to CSS modules.

23. Input validation is good for security, and would be essentially if this were to actually go live. I am less concerned about it here given them amount of other things on your todo list for the final sprint. 

24. This is just a reminder to make sure you have RLS enabled.

25. Yes, in a polished application having Loading states for async operations would be beneficial. This is another very low priority for you now. 

26. While technically correct, it is quite possible that the cost of memoizing is higher than the effort of processing your small number of items. This is also likely to go away when you get everything into supabase. 

27. There is a subtlety here that Copilot missed, which is that you ran the prices through a set to make them unique. 

In addition to the observations from Copilot, I would note that `ListingGrid` could be refactored to delegate some of the responsibilities. Recall how we had two components in `FilmExplorer` for the table -- one handled the filtering and the other handled the display. This could be done with a container component or a custom hook (see the lecture from 9/23).

Another note is the footer still says "CS 312 Project template"

The final note is that while I am glad to see that someone is _thinking_ about testing, I would like to see some actual testing being done. 


### Functionality

On the surface, it doesn't feel like you have made great strides since sprint 1. The filtering and search are new, and there is a little bit of supabase integration, but that doesn't seem complete yet. When I tried to make a listing, I got an unspecified error. 

There are a number of choices around the site that don't seem to be well justified. For example, when making a listing, there are a number of things to fill out (e.g., condition, color, size) that aren't present in any user story. Why are they there? I'm not saying they shouldn't be, but that they should have been planned for with intentionality. Similarly, why are there About and Contact pages (that have no content)? Why is color a filter when it doesn't apply to all things, while condition (which presumably would apply to all things) isn't? All of this come back around to some flaws in the process where you aren't spending enough time planning and you are just adding things in cowboy style. 


### Final thought

It feels like you have left an awful lot of functionality for your final sprint. I am worried that you don't have a real plan. I should be able to tell exactly from the sprint backlog what you have left to do, and I can't. I would suggest a session of very specific planning so everyone know _exactly_ what the site will look like come demo day and everyone will be able to jump in and take on some of the functionality. 

At the end of my office hours on Thursday I gave Sebastian a little bit of a hard time for poking at the styling which wasn't covered by a user story. This was half in jest. The truth is I _love_ to see students get engaged in some aspect of a project and just _play_. I think play is the single greatest tool for learning. So, from that perspective, I was just kidding him. However, the half that wasn't joking is that the truth is you have a lot to do. If you did have things in the backlog refined down to little projects people could just knock out, then people with a couple of minutes could just jump in and tackle one of them. it is also symptomatic of how all of the current site feels -- it looks and feels like folks just jumping in and poking at bits that felt fun instead of following a process based on thoughtfulness and intentionality where decisions are justified. 