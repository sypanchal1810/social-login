# Get-Your_Account_Info &mdash; Social Media Login

Welcome to Get-Your_Info, a simple login application made with Node.js. This application allows
users to log in using their Google, GitHub, or LinkedIn social media accounts, providing a
convenient and secure login experience. The application also features a user-friendly interface for
seamless interaction.

> #### Get-Your_Account_Info, is now deployed and live: [Click Here!](https://get-yourinfo.onrender.com/) 😍🥳🎉

## Table of Contents

- [Installation](#installation)
- [Prerequisites](#prerequisites)
  - [Social Media Login Integration](#social-media-login-integration)
    - [Google](#google)
    - [GitHub](#github)
    - [LinkedIn](#linkedin)
  - [MongoDB creation](#mongodb-creation)
- [Usage](#usage)

## Installation

1. Clone the repository to your local machine:

   ```
   https://github.com/sypanchal1810/social-login
   ```

2. Install the necessary packages using following command:
   ```
   npm install
   ```

## Prerequisites

### Social Media Login Integration:

- ### Google

  To integrate Google login functionality, follow these steps:

1. Go to the [Google Developers Console](https://console.developers.google.com/) and create a new
   project.

2. Go to APIs and Services tab > OAuth consent screen.

   1. Select External and then Create
   2. In Step: 1 - OAuth consent screen, fill up the necessary details like App Name, Developer
      Email etc.

      > ⚠️ **Important:** Don't upload App Logo Now, It needs verification.

   3. In Step: 2 - Scopes, add the following scopes

      1. `.../auth/userinfo.email`
      2. `.../auth/userinfo.profile`

   4. In Step: 3 - Optional
   5. In Step: 4 - Shows Summary. Check all the details once and then click Back To Dashboard.

3. Go to APIs and Services tab > Credentials > Create Credentials > OAuth Client Id.

   1. Application Type - Web Application
   2. Give the name of application as per your choice
   3. Now, Add Authorised JavaScript origins:

      1. If You are working on locahost then add following URL:

         ```
         http://127.0.0.1:7000
         ```

      2. Else you can add your website name like this:
         ```
         https://get-yourinfo.onrender.com
         ```

   4. Now, Add Authorised redirect URIs:

      1. If You are working on locahost then add following URL:

         ```
         http://127.0.0.1:7000/auth/google/callback
         ```

      2. Else you can add for your website like this:
         ```
         https://get-yourinfo.onrender.com/auth/google/callback
         ```

   5. Press the "Create" Button.

4. Obtain the client ID and client secret for your application.

5. In your project directory, create a `config.env` file and add the following lines:
   ```
   GOOGLE_OAUTH_CLIENT_ID=your_client_id
   GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret
   ```

> 🔗 For detailed information on how Google Authentication and OAuth Flow works
> [Read This Article!](https://developer.okta.com/docs/concepts/oauth-openid/#choosing-an-oauth-2-0-flow)

- ### GitHub

  To integrate GitHub login functionality, follow these steps:

1. Go to the [GitHub Developer Settings](https://github.com/settings/developers) page and create a
   new OAuth application.

2. As mentioned above, Add Website URL and Callback URL.

   ```
   http://127.0.0.1:7000
   ```

   ```
   http://127.0.0.1:7000/auth/github/callback
   ```

3. Obtain the client ID and client secret for your application.

4. In your project directory, open the `config.env` file and add the following lines:
   ```
   GITHUB_CLIENT_ID=your_client_id
   GITHUB_CLIENT_SECRET=your_client_secret
   ```

- ### LinkedIn

  To integrate LinkedIn login functionality, follow these steps:

1. Go to the [LinkedIn Developers Portal](https://www.linkedin.com/developers/apps) and create a new
   application.

2. Add the necessary details.

   > ⚠️ You have to make the demo company profile to avail the functionality.

3. As mentioned above, Add Callback URL.

   ```
   http://127.0.0.1:7000/auth/linkedin/callback
   ```

4. Obtain the client ID and client secret for your application.

5. In your project directory, open the `config.env` file and add the following lines:
   ```
   LINKEDIN_CLIENT_ID=your_client_id
   LINKEDIN_CLIENT_SECRET=your_client_secret
   ```

### MongoDB creation:

#### (\*\* Only for express-session storage)

1. Go to the [MongoDB Cloud Services](https://www.mongodb.com/cloud) website and create a new
   account if you haven't already.

2. Once logged in, navigate to the MongoDB Cloud Dashboard and click on "Create a New Cluster" to
   set up a new cluster for your database.

3. Configure your cluster by selecting the cloud provider, region, and cluster tier that best suits
   your needs. You can also customize additional settings like the number of replica sets and shard
   clusters.

4. Once the cluster is created and provisioned, click on "Database Access" in the left sidebar to
   create a new database user.

5. Click on the "Add New Database User" button and provide a username and password for the database
   user. Make sure to save these credentials in a secure location.

6. Next, click on "Network Access" in the left sidebar to configure the network access settings for
   your cluster.

7. Click on the "Add IP Address" button to allow access from your current IP address or add a
   specific IP range. You can also choose to allow access from anywhere (0.0.0.0/0).

8. After configuring the network access, click on "Clusters" in the left sidebar and then click on
   the "Connect" button for your cluster.

9. Choose the "Connect Your Application" option and select the driver and version you're using for
   your application (e.g., Node.js and the latest version).

10. Copy the connection string provided. It should be something like:

    ```
    mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER_URL>/<DATABASE_NAME>?retryWrites=true&w=majority
    ```

11. Replace `<USERNAME>` and `<PASSWORD>` with the credentials you created in step 5. Also, replace
    `<CLUSTER_URL>` with the URL provided in the connection string, and `<DATABASE_NAME>` with the
    name you want to give to your database (e.g., "get-yourinfo").

12. In your project directory, open the `config.env` file and add the following lines:

    ```
    DATABASE=<YOUR_CONNECTION_STRING>
    DATABASE_USERNAME=<USERNAME>
    DATABASE_PASSWORD=<PASSWORD>
    ```

> ⚠️ **Important:** Make sure to replace `<YOUR_CONNECTION_STRING>` with the modified connection
> string from step 11, `<USERNAME>` with the database username, and `<PASSWORD>` with the database
> password you created.

6. Also add the Session Secret Key in the `config.env` for the express-session as shown below:
   ```
   SESSION_SECRET_KEY=YOUR_UNIQUE_SECRET_KEY
   ```

## Usage

### `config.env` final check:

- Your `config.env` must have these following environment variable:

```

##################################################################
# # Basic configurations # #
NODE_ENV=development
PORT=7000

DATABASE=<YOUR_CONNECTION_STRING>
DATABASE_USERNAME=<USERNAME>
DATABASE_PASSWORD=<PASSWORD>

SESSION_SECRET_KEY=YOUR_UNIQUE_SECRET_KEY

##################################################################
# # Authentication configurations # #

#GOOGLE OAUTH
GOOGLE_OAUTH_CLIENT_ID=your_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_client_secret

#GITHUB LOGIN
GITHUB_CLIENT_ID=your_client_id
GITHUB_CLIENT_SECRET=your_client_secret

#LINKEDIN LOGIN
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret


```

> ⚠️ **Important:** Make sure to replace `your_client_id` and `your_client_secret` with the actual
> values obtained from the respective social media platforms.

That's it! You have successfully set up and integrated the social media login functionalities in the
Get-Your_Info application. Enjoy using it! 🎉

1. Start the application:

   ```
   npm start
   ```

2. Open your web browser and visit `http://127.0.0.1:7000` to access the application.
