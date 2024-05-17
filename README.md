<h1 align="center"> SpaceCats app</h1>

<h2 align="center">Overview</h2>

<p align="right">The SpaceCats Library app is a React Native application developed with Expo. This project is solely for my training purposes to improve my skills in React Native, TypeScript,, Node,js, Express.js as well as using REST APIs and Expo. The app was not developed for public use.</p>

<hr/>

<h2 align="center">Goal setting</h2>

<p align="right">The main goal of this app is to give me the opportunity to try out different technologies and development skills. The application allows one to retrieve cat images, GIFs and memes from an external API. There is no intention to use the app for commercial or public purposes.

<hr/>

<h2 align="center">Functionalities</h2>

### 1. Image retrieval
The app allows fetching cat images, GIFs and memes from an external API. For this idea I used the free version of the Cat API from [thecatapi.com](https://documenter.getpostman.com/view/4016432/RWToRJCq).

### 2. Rating function
There is an option to rate images and comments to express your preferences for certain content.

### 3. Comment function
The app allows you to leave your thoughts as a comment
(there is no storage option as a cloud service) as this is just a practice project.

<hr/>

<h2 align="center">Technologies</h2>

- React Native
- TypeScript
- Expo
- REST API
- Node.js
- Express.js

<hr/>

<h2 align="center">Screenshots</h2>


 <h2 align="center">Onboarding Screen</h2>
<p align="right"><image src= "https://github.com/John-CFO/SpaceCats/blob/master/onboarding.png?raw=true"></p>

<h2 align="center">No Data Found Screen</h2>
<p align="left"><image src="https://github.com/John-CFO/SpaceCats/blob/master/nodata.png?raw=true"></p>

  
<h2 align="center">Collection Screen</h2>
  <p align="right"><image src= "https://github.com/John-CFO/SpaceCats/blob/master/collection.png?raw=true"></p>
    


  <h2 align="center">Loading Screen</h2>
  <p align="left"><image src="https://github.com/John-CFO/SpaceCats/blob/master/loading.png?raw=true"></p>


  <h2 align="center">Details Screen</h2>
  <p align="right"><image src="https://github.com/John-CFO/SpaceCats/blob/master/details.png?raw=true"></p>

  <h2 align="center">Details Comments</h2>
<p align="left"><image src="https://github.com/John-CFO/SpaceCats/blob/master/comments.png?raw=true"></p>


  <h2 align="center">Details Keyboard</h2>
<p align="right"><image src="https://github.com/John-CFO/SpaceCats/blob/master/comments_2.png?raw=true"></p>

    
<hr/>

<h2 align="center">Live Review</h2>

<p align="center">[Link to Live Review](https://youtu.be/sAxkvb925FM)</p>


</br>
<h2 align="center">How to run this app</h2>

<p align="center">First of all, make sure you have installed Node.js global and Express.js global for the backend and obtained your own API key for free from https://thecatapi.com.</br> And also put the key in an <code>.env</code> file in the app directory.</p>


</br>
<h3 align="left">Start Backend</h3>
<p align="left">To start the backend, run the following command:</p>

```ruby
npm run start:backend
```
<p>This will start the backend on port 8021 and connect to the API using the key stored in the .env file.</p>

</br>
<h3 align="left">Start frontend in the Android emulator</h3>

1. Download and install Android Studio if you haven't already.
2. Open Android Studio and select "Project" -> "More Actions" -> "Virtual Device Manager".
3. Select a virtual device type (e.g. Pixel 4a, Pixel 6 or Pixel C) and load the frontend.
4. Make sure the backend is running before starting the frontend.
5. Start the frontend in the terminal with the command:
```ruby
npm start
```


<p>If you have trouble running the app try:
 
```ruby
npm start --reset-cache
```

<hr/>

<h2 align="center">Development Status</h2>

<p align="center">This project is in ongoing development and will be used exclusively for my private training purposes. If you have any questions or suggestions, please create an issue or submit a pull request.</p>

<hr/>

<h2 align="center">License</h2>

<p align="center">This project is licensed under the MIT License. Please see the license file for more information.</p>




