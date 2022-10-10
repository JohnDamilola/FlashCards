# Getting Started with Firebase

## Features:

1. Login and Sign up - Hosted on [Firebase](https://firebase.google.com/)
                                         
2. Based on Python-Flask

## Requirements:

```pip install -r requirements.txt```

## Setting up Firebase:

1. Go to [Firebase](https://firebase.google.com/)
2. Login/Register your account
3. Click on add project
4. Give project name
5. Optional: select google analytics
6. Create project
7. Under "Get started by adding Firebase to your app", click on web app
8. Name the web app and copy the "apiKey", "authDomain", "databaseURL", "storageBucket" from the code given there
9. Go to login.py and app.py, and add the values you copied above
10. Go to console, click on Authentication (On the left sidebar), click on sign-in method, and enable email/password sign in


## Heroku Deployment Steps
1. ```heroku login```

2. ```heroku create flashcards-server-api```

3. ```heroku create --buildpack https://github.com/heroku/heroku-buildpack-python.git```

4. ```heroku ps:scale web=1```

5. ```git remote add heroku https://git.heroku.com/flashcards-server-api.git```

6. ```git subtree push --prefix backend heroku local_branch:main```


