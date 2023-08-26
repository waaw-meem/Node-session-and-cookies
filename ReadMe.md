<h1>Sessions and Cookies</h1>

<h2>Cookies</h2>
<p>
Cookies are small pieces of data that a website can store on a user's browser. They are often used to track user preferences and activities across different sessions and visits to a website. Cookies are sent between the user's browser and the web server with each HTTP request and response.
</p>

<code>
// Setting a Header response for setting a Cookie Besides this we can configure it as well
// HttpOnly, Secure, Expiry

// In Post
res.setHeader('Set-Cookie','isLoggedIn=true')

// In Get
  const isLoggedIn = req.get('Cookie').split('=')[1] === 'true'

</code>

<h2>Session</h2>

<p>
A session is a way to store and manage user-specific data on the server side during a user's visit to a website. It allows the server to keep track of information about a user as they navigate through different pages or perform actions on the site. Sessions are essential for maintaining state across multiple requests and responses, as HTTP, the protocol that underlies the web, is stateless by nature.
</p>

<h2>Initializing the session Middleware</h2>

<p>
First install the package of the sessions

For example: npm install --save express-session

Then Import it on app.js file  and use with express 

<code>app.use(session({secret:'A Secret',resave:false, saveUninitialized:false}))</code>


Certainly! The line of code you provided is configuring the express-session middleware for handling sessions in an Express.js application. Let's break down the different options being set:

secret: 'A Secret': This option sets the secret used to sign the session cookie. As explained earlier, the secret is used to hash the session data stored in the cookie, adding a layer of security. 'A Secret' in this case is the value of the secret. It should be a unique and secure string.

resave: false: This option determines whether the session should be saved to the store (like a database or memory) on every request. When set to false, it means that the session will only be saved if it has been modified during the request. This can improve performance by preventing unnecessary writes to the session store.

saveUninitialized: false: This option controls whether a session should be saved if it is new but hasn't been modified. When set to false, it means that a new session will not be saved to the store unless it has been explicitly modified during the request. This can also help optimize performance by avoiding unnecessary session creation.

Putting it all together, this line of code configures the express-session middleware with the following settings:

A secret 'A Secret' is used for signing session cookies.
Sessions will not be automatically resaved on every request if they haven't changed.
New sessions that haven't been modified will not be saved to the store.
These settings are often used to balance security and performance considerations. However, it's important to note that the optimal configuration might depend on your application's specific requirements.
</p>

<h2>Using the Session Middleware</h2>

<p>
// In Post

<code>
 req.session.isLoggedIn = true
</code>
</p>

<h2>Using the MongoDB to store the session</h2>

<p>
Install the package by writing this command : npm install --save mongodb-connect-session and import it on a different way

<code>
const MongodbConnect = require('connect-mongodb-session')(session)

const MONGODB_URI = "mongodb+srv://wm401238:VLMfH3tCfy5rAjOn@cluster0.7lptiej.mongodb.net/test"

const store = new MongodbConnect({
  uri: MONGODB_URI,
  // Collection name should be upon us
  collection:'sessions'

})
</code>
</p>

<h2>Deleting a Cookie</h2>

<p>

</p>
