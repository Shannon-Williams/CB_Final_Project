# CB_Final_Project

Concordia Full Stack Developer Final Project -

Proposal: Anime search service where users can search and discover anime content and keep track of your anime watching. I chose this as a project because there currently these service provided aren't as fun visually, so I want to try create a fun looking simple alternative.

Main Inspiration for the little project is my love for anime, My anime lists website that I have previously used and I wanted to incorporate some features and components that I thought were cool that I learned from the bootcamp.

# Main Features for MVP:

1. User Authentication

2. Explore Page

- Header to leader to profile, homepage and sign/singup functionality handled by Auth0
- Banner Image
- Search Bar > that displays all items as a card in the search that leaders to individual details page

3. Profile Page

- Header
- Profile Banner that user can select
- Favourite section displaying all their selected Anime
- Watchlist section displaying all their selected Anime
- History section displaying all their selected Anime

4. Anime Details Page

- Renders all relevant Anime details
- Comment section to display all comments
- Comment Post input to be able to right your post
- Anime Rating system to be able to rate that specific anime

# Database

###### MongoDB - 3 Collections

**User Collection**

Hold the users profile information to be used on the profile page

```javascript
{
  _id: `Auth0 Generated UID`,
  userFirstName:'John',
  userLastName: 'Smith',
  userEmail: 'john.smith@test.com',
  nickname: 'John',
  picture:'image by Auth0',
  profile : {
    favourites: [AnimeObjects],
    watchlist: [AnimeObjects],
    history: [AnimeObjects],
  },
  profileBanner : 'Base64 String'
}

```

**Comment Collection**

Holds user information and comment information to be user and displayed on the Anime Details Page

```javascript
{
  _id: uuid(),
user_id: 'Auth0 Generated UID',
anime_id: Number(animeId),
comment: 'This anime is really cool',
nickname: 'John',
picture:'image by Auth0'
}
```

**Rating Collection**

Holds user information and rating for a specific anime to be used and displayed on the Anime Details Page

```javascript
{
  _id:uuid(),
  user_id:'Auth0 Generated UID',
  anime_id:Number(animeId),
  rating: 5
}
```

# API

- 3rd Party API o https://jikan.moe/ > Use to retrieve all information related to anime

- Internal API

| METHOD | Endpoint                | Description/uses                                           |
| ------ | ----------------------- | ---------------------------------------------------------- |
| GET    | /api/anime/id/:id       | Get specific anime details                                 |
| GET    | /api/anime/search       | Get search anime by words                                  |
| POST   | /api/user               | Post users that are created by Auth0                       |
| PATCH  | /api/anime/search       | Get search anime by words                                  |
| GET    | /api/anime/search       | Get search anime by words                                  |
| POST   | /api/comments           | Post comments to comments collection                       |
| GET    | /api/comments/:anime_id | Get get all comments made for specific anime               |
| POST   | /api/rating             | Post a rating for a specific anime.                        |
| GET    | /api/rating             | Get a rating by query for a specific anime                 |
| PATCH  | /api/rating             | Update ratings if a user changes their mind                |
| POST   | /api/favourite          | Post users anime to the favourite list                     |
| GET    | /api/favourite/:id      | Get all anime for a users watchlist with a specific userid |
| PATCH  | /api/favourite          | Update the users favourite list                            |
| POST   | /api/watchlist          | Post a specific anime to the users watchlist               |
| GET    | /api/watchlist/:id      | Get all anime for a users watchlist with a specific userid |
| PATCH  | /api/watchlist          | Update the users watchlist                                 |
| POST   | /api/history            | Get all anime for a users history with a specific userid   |
| GET    | /api/history/:id        | Get a specific anime from a users watchlist                |
| PATCH  | /api/history            | Get update the users history List                          |

# Preview

### Explore Page

![](preview\explore_page.png)

### Anime Details Page

![](preview\anime_details.png)

### Profile Page

![](preview\Profile_Page.png)

# Challenges

My main challenges involved managing expectations of myself for this project. At the begining of the project I was focused on doing things the **right** way and spent a lot of time researching architectures, file structures before even working on my application...I soon... realized that wasn't going to cut it. Additionally, I wasn't adhering to the MVP I was adding little feat

Below are some questions and concners that posed as challenges and delayed me that I had to overcome.

**How to structure my own MongoDB database?** I struggled a lot trying to understand how I wanted all my data to **relate** in a non-relational database. While we had to use a MongoDB database for this project trying to **relate** data between collections without understanding the strucutre of my application first and how my data was going to be structured caused some delay and headaches.

**How should my FE communicate with my third party API ? with my internal API ? How should my FE communicate with my BE ?** As I was thinking about how different parts of my application were going to interact, I started to think how am I going to integrate my 3rd party API I can call it from the frontend but my internal API was going to make request to my database and I wanted my backend to make requests to my 3rd party API.

So I settled on FE will make requests to BE and BE will retrieve the data from my db or 3rd party API and the BE would serve up the response to the FE.

1st Issue with this is that I did not know how to make requestes from the backend, enter node Fetch package. (NodeJS v17+ has fetch built it @ the time of this project I was working with Node v13 and didn't want to update my NodeJS environment mid-project). While Axios is more common I opted for NodeFetch for the familiarity.

**JWTs and JWT Middleware Authetication??** I did not fully understand the concepts of JWTs and Middleware authentication on my backend for validation. While JWT validation didn't make the MVP I did spend a considerable amount of time writing and learning about it. These concepts will be used in the future.

**Nested arrays in document objects in MongoDB** this goes without saying never using nested arrays in documents before and having to learn the operations to reach my data in my MongoDB took some time.

**Design** While I am pretty confident that I can recreate a mockup given to me, I grossly underestimated the design on the application and only started considering it mid-project after my basic backend structure was complete and my FE was a white screen with a basic layout. And the integration between the two was dreadful now that I had to consider how the data would need to be presented, in the end I like my design choices but it would have saved me a lot of stress to consider at least some of these design elements in the beginning.

# Accomplishments

**1st Full Stack Project** While this is a small project I take pride in it being my first. And although I had many challanges they were time based issues and not challenges because I lacked understanding, and I was able to deal with these challanges by planning and trying to adhere to what was set out in the MVP proposal.
