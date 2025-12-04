![workflow status](https://github.com/csci0312-f25/project-amber-aardvark/actions/workflows/node.js.yml/badge.svg)

Deployed Link: https://project-amber-aardvark.csci312.dev


MidBin

A Market Place for Middlebury College students! 

Collaborators:
- Arai Hardy
- Sebastian Cruz
- Shari Bhu
- Sebastian Pantzer
- Ben King

Guide:
-Dependencies
To install dependencies you can use npm install and get started on it. 


-Database
For our database functionality we are using Supabase. 
Supabase requires two .env variables to connect:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

Migrations are found under supabase/migrations

Database Schema Overview

For this application we use two main tables:

profiles

Stores basic user information that is linked to Supabase Auth.

| Column    | Type    | Description                                   |
|-----------|---------|-----------------------------------------------|
| id        | uuid    | Primary key. Matches auth.users.id            |
| name      | varchar | User display name                             |
| email     | varchar | User email address                            |
| rating    | float8  | User rating from completed transactions       |
| avatarURL | text    | Public URL for the user's profile picture     |


This table is auto populated when a new user registers.

Listings

Stores marketplace listings created by users.

| Column      | Type     | Description                                    |
|-------------|----------|------------------------------------------------|
| id          | uuid     | Primary key for each listing                   |
| title       | text     | Title of the item                              |
| description | text     | Description of the item                        |
| price       | numeric  | Price of the item                              |
| created     | date     | Date when the listing was created              |
| category    | text     | Main category of the item                      |
| subCategory | text     | Sub category for filtering                     |
| color       | text     | Item color                                     |
| condition   | text     | Item condition                                 |
| gender      | text     | Gender category if applicable                  |
| size        | text     | Item size                                      |
| user_id     | uuid     | References profiles.id, owner of the listing   |
| sold        | boolean  | Marks if the item has been sold                |
| imgs        | text[]   | Array of image paths stored in the bucket      |

Buckets:
Listing Images:

Stores all listing images. Each listing has its own folder named after the listing id.
Example structure:

Listing Pictures/
    <listing_id>/
        image1.jpg
        image2.png


Listing images are public so that the frontend can display them. Users can upload or delete images only for their own listings.

avatars:
stores user profile pictures