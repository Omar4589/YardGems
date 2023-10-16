# YardGems

## Description

Designed as a community-driven platform to streamline the yard sale experience. The application eliminates the tedious need to drive around in search of yard sales by providing a centralized platform where users can find and list yard sales in their area.

## Table Of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Demo](#Demo)
- [Questions](#questions)
- [Collaborators](#collaborators)
  <br>

## Installation <a id="installation"></a>

Follow the steps below to install this project:

1.  `Clone` this repo to your local machine
2.  Open a terminal and navigate to the `root` of the project's directory
3.  Type `npm run install` and press enter/return on your keyboard to run the command.
4.  Once the installation finishes, type and run `npm run develop`. This starts the server and runs the react app. Refer to package.json file in the root for more scripts.

## Usage <a id="usage"></a>

Create an account or use this dummy account to log in:
<br><br>
Email: `vintagevicky@email.com`<br>
Password: `test1234`
<br><br>
YardGems was designed using a `mobile first` approach, but can also be used on a laptop or desktop.

Below are two sections - `Mobile View` and `Standard View`.

Mobile View describes usage in a mobile device like a phone or small tablet.
Standard View describes usage in a large tablet, laptop, or desktop.

### Mobile View

- In mobile view, use the `navigation bar` at the bottom to navigate through different components.<br>
- Use the `Map component` in the `Home section` to `view listings` in your area. <br>
- Each listing is represented by a `green gem`. Click on the gem to see details about the listing.
- Click on `View Listing` in the info window to open a modal with more information about the listing.
- Use the button at the top right to toggle between `Map and List views`.
- In List view, click on a listing to open up the `listing modal` or click on the `heart icon` at the bottom right of each listing card to `save/favorite` the listing.
- My Listings section displays any listings created by you and features a button for `listing creation`.
- Click on the button to `create a listing`.
- Each listing `must contain` a title, description, and date. You may upload up to 5 images with your listing. You can change this limit in ListingModal.js.
- Saved Listings section displays any listings you have saved/favorited.
- Click the `Menu button` at the bottom right to open up a drawer with options: About Us, Contact Us, FAQ, My Account(if applicable), Login/Logout, Install YardGems (if applicable)
- Use `Contact Us` to send an email to the email in the original code or any email of your choosing. Refer to the 'Contact Us' component in 'pages' folder.
- Use `My Account` to update your username or password.

### Standard View

- In standard view, use the `header` at the top and click on the links to `navigate` through components.

- Use the `Map component` or the `AllListings component` in the `Home section` to find available listings. There is no toggle button in Standard View.

- Use the button in `My Listings` section to `create a new listing`.

- Standard View features a `footer` at the bottom instead of a navigation bar. The footer contains: About Us, Contact Us, FAQ.

<br>

## Technologies <a id="technologies"></a>

The following technologies were used to develop YardGems:
<br>

<strong>Languages</strong>

- JavaScript
- Html
- Css

<strong>Libraries & Frameworks</strong>

- React
- Material-UI
- Express
- GraphQL
- Apollo Client & Apollo Server

<strong>Database</strong>

- MongoDB
- Mongoose ODM

<strong>Tools</strong>

- Node.js
- bcrypt
- JWT
- dotenv
- Day.js
- Cloudinary
- Emailjs

<strong>APIs</strong>

- Google Maps API

<br>

## Demo <a id="Demo"></a>

https://yardgems-15b0faee737f.herokuapp.com/
<br>

## Screenshots <a id="Screenshots"></a>

<div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 20px;">
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412859/yardgemsScreenshots/ffqeafkljh3knqqm7czm.png" alt="Caption 1" width="200"/>
    Launch Screen
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412863/yardgemsScreenshots/ghfj1limrbyyvvz2da2r.png" alt="Caption 2" width="200"/>
    Home - Map View
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412863/yardgemsScreenshots/j7wj14wyqzc3vypfb9yw.png" alt="Caption 3" width="200"/>
   Home - Map View - Info Window
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412863/yardgemsScreenshots/guaglkh4ojoquvrgwhcg.png" alt="Caption 4" width="200"/>
    Listing Modal
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412860/yardgemsScreenshots/sz2wa1rmtts3qynucjd7.png" alt="Caption 5" width="200"/>
    Home - List View
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412859/yardgemsScreenshots/wv2geybjmocn89eaying.png" alt="Caption 6" width="200"/>
    Sign Up Page
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412861/yardgemsScreenshots/rkckwbuxaqyfdclvnhie.png" alt="Caption 7" width="200"/>
    Sign In Page
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412861/yardgemsScreenshots/kq0faossridfqkdkc7j1.png" alt="Caption 8" width="200"/>
    My Listings
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412861/yardgemsScreenshots/lznyebmrsvxiiibariem.png" alt="Caption 9" width="200"/>
    Create Listing Modal
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412864/yardgemsScreenshots/p1afzrvmulzfasegm7lv.png" alt="Caption 10" width="200"/>
    Saved Listings
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412862/yardgemsScreenshots/gwxjnyus4zieyavbovgr.png" alt="Caption 11" width="200"/>
    Menu Drawer
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412863/yardgemsScreenshots/cbpqnygk2zfaokuholoo.png" alt="Caption 12" width="200"/>
    My Account
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412863/yardgemsScreenshots/qs33xgrrplhg4moyihch.png" alt="Caption 13" width="200"/>
    Contact Us
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412863/yardgemsScreenshots/fqv6lghnqmmlka4upq1a.png" alt="Caption 14" width="200"/>
    About Us
  </div>
  <div style="text-align: center; width: 200px;">
    <img src="https://res.cloudinary.com/yardgems/image/upload/v1697412862/yardgemsScreenshots/wsddydwh8m1kd5mzrez4.png" alt="Caption 15" width="200"/>
    FAQ
  </div>
</div>

## Questions <a id="questions"></a>

If you have any questions about this project, please contact the project owners by visiting their GitHub profiles below.
<br>

## Collaborators <a id="collaborators"></a>

Omar Zumaya <br>
https://github.com/Omar4589
<br>
Kristin De Salme<br>
https://github.com/KR1ISTIN
<br>
Taylor Aldridge <br>
https://github.com/Rolyat512
