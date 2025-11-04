# Sprint 1 feedback

(-) tagged commit on main for sprint1
(-) set of closed user stories
(X) working deployment 
(X) GitHub reports build passing
(X) team members have completed reflection
(X) demo

## Checklist notes

There is a tagged commit for sprint1. It also appears to mark the _start_ of the sprint and not the end. The idea is for the tag to mark the post sprint deliverable.

There are things in the done pile, but it feels overly generous to call them user stories. 

## Discussion

### User stories

You only had a single user story in your done pile. All of your other items were just nouns -- "listing card", "listing grid", "basic homepage". This makes me think you have not actually bought into the design process. Instead, you had some general notion of what it should look like and just went with it. Does the user want to be faced with a collection of random items? What is their organizing principle, are they just listed from oldest to newest? Do they want search? Do they want filtering? Do they want categories? There are a lot of unanswered questions that you should be answering with justified user stories. I know that you are making it up since you have no customers, but you should be documenting why you are making the decisions you are making instead of just winging it. Show that you have put some thought into the choices that you are making. 

Going back to your whole project board, this seems to be a problem throughout -- you have a lot of todo items and very few actual user stories. Your epics are particularly problematic. Those, above all else should be justified features, not just things like "list item". 

The one user story you marked as "done" really is more of an epic. It is only sort of "done", and the user story doesn't actually break down what "relevant" information should be. Yes, one can enter information and have it show up in the list (great!), but it isn't currently linked to a user, the images don't seem to work,  most of the information is not actually available to buyers yet, and it doesn't persist. That doesn't seem done. To be clear, the current state of "doneness" isn't really the issue here. This level of functionality is okay at this stage. The issue is that it is marked done because the user story didn't really make it clear what done meant. It would be better to make this an epic that then is broken down into individual user stories like "As a user I would like to be able include a price on a listing so that buyers know what I am asking for". That might help with things like the fact that your listing creation page has a lot of features that seem of minimal utility (color, size, gender for example). I can see where that comes from for clothes, but it isn't relevant for other things. The categories are reasonable, but the problem with categories is that once you start specifying them, they need to be comprehensive. My first thought was to list a water bottle. How does that get categorized? But all of this gets back to "why are those there"? These were _choices_ and they should be justified by some perceived user need or desire (and it needn't be on the part of the seller - maybe the seller doesn't care but the _buyer_ would like things specified out). 

Another example is the "Contact Info" field. Why is that there? Do your users want (need) to enter different contact info for everything they list? Are you allowing anonymous listing? Will you validate the info before posting? if so, who will do that, and what will their interface look like? Or will sellers need accounts, in which case this is redundant? This is why you don't add things in that you haven't justified first. Looking at them can start uncovering whole networks of things that need to be worked out. 



### Agility/scrum

In both sprints, you showed signs of very bursty work. You have a week with two commits and then you have a week with 10. You should be trying for a _constant_ velocity. That means small amounts of work every day instead of a mad rush at the end of the sprint to get things done. 

The other thing missing from your completed items is any scoring. I am expecting everything in the backlog to have a score attached to it to reflect your shared understanding of how big a task it is. 

### Integration

I see six accepted and closed PRs. There was one that was not accepted that had failing tests. That is a good start, but _all_ of them accepted and merged by the same person with no comment from anyone in the rest of the group. You also have a large number of branches on the project. These should be getting cleaned up and deleted when PRs are accepted. 


### Implementation

I expect you to be using Typescript for all of your work, and all I see in here is jsx files for anything other than the two trivial placeholder files. 

I also see that you are not passing the linter, which makes me wonder how you are getting past husky to make commits. 

In CreateListing, I see a collection of things that you should address:
- you want logical or (||) not bitwise or (|)
- the controlled components have led to too many states. it would be worth consolidating down into an object
- there is too many things that are hard coded into this page. All of the various options/categories, etc, should come from an outside source so you can separate the content from the logic. 
- use htmlFor instead of for
- use placeholder instead of placeHolder
- your "default" listing that you build off of is bound to lead to issues later. It already is inconsistent ("clothes" instead of "clothing"). This is one reason it makes sense to maintain a full valid object as your source of truth you use for the controlled components. 

Why is Filter in the production build? It clearly has no actual functionality yet since it returns an empty div. 


I only see one real test, and it is testing some pretty basic functionality. It is fine as a way to maintain the requirements of what is shown on the card, but where in your documentation is it specified what should appear on the cards? Why those items? I worry a bit that because the item is hardcoded in the way it is that it will not match future items. It is already missing some of the fields of other items. 

### Functionality

Your functionality level is okay for the first sprint, but a little on the light side. You have left yourselves a lot to do (another value of more detailed planning is that it will be easier for team members to pick up some small feature and implement it). I do have to wonder about some of the other choices that have crept into your deployment like the decision for the new item fields to just expand out on top of the listings, or the choice about which fields are required and which aren't. I also wonder if you have thought about scale at all. How many active listings do you anticipate at a time? it would be good to generate enough bogus data so you can see what that looks like (more choices -- one long list? pages? categories? ). 

I'll also note that the search field has no business being on your page right now. It has no functionality and it isn't an item in your done list. Someone clearly just tossed it in there on the theory that you problem want one later. 


### Final thought

I think you have the start of a nice looking site, but your team clearly jumped in a little prematurely. It would really be very helpful for you to spend a little more time on planning, making some real epics that cover the major functionalities you would like to see on the site, and then making real user stories that carve out small pieces of those epics. _Then_ spend some time ranking them before setting folks loose on them. Hopefully you also spent some time in your retrospective talking about how you ended up with folks reimplementing features, which was a common theme across the reflections. There is no enough time for team members to contribute nothing to a sprint because everything they did was redundant. I think that will require better communication, but also, to continue beating this horse, clearer tasks in the form of detailed user stories so folks can pick one up and be very clear about what implementing the feature will take. 