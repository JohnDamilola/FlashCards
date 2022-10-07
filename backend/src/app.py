import pyrebase
import re

import flask_login

config = {
	"apiKey": "AIzaSyDvj7jH1wfrjRYty4lXmU3B6WPsdxmgqfk",
    "authDomain": "flashcards-f40a7.firebaseapp.com",
    "databaseURL": "https://flashcards-f40a7-default-rtdb.firebaseio.com",
    "projectId": "flashcards-f40a7",
    "storageBucket": "flashcards-f40a7.appspot.com",
    "messagingSenderId": "929677488691",
    "appId": "1:929677488691:web:17740911edabe256d16946",
    "measurementId": "G-EJSL73GBEX"
}

# firebase = pyrebase.initialize_app(config)

auth = firebase.auth()

db = firebase.database()

# from flask import *

# app = Flask(__name__)

class U():
    user = None

u = U()
@app.route('/', methods=['GET','POST'])
def signup():
    if request.method == 'POST':
        if request.form['submit'] == 'add':
            email = request.form['email']
            password = request.form['password'] 
            user = auth.create_user_with_email_and_password(email,password)
            u.user=user
            return render_template('index.html')
    return render_template("register.html")

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        if request.form['submit'] == 'add':
            email = request.form['email']
            password = request.form['password'] 
            user=auth.sign_in_with_email_and_password(email, password)
            u.user=user
            return 'Logged in Successfully'
    return render_template('login.html')

@app.route('/deck/all', methods = ['GET'])
def getdecks():
    if u.user:
        user_decks = db.child("deck").filter("deckid"==f"{u.user['localId']}_%")
        d = user_decks.val()
        return render_template('index.html',tt=d.values())
    else:
        alldecks = db.child("deck").get().filter("vissibility"==1)
        d = alldecks.val()
        return render_template('index.html',tt=d.values())

@app.route('/deck/create', methods = ['GET','POST'])
def create():
        if request.method=='POST':
            if request.form['submit'] == 'add':
                try:
                    deckid=request.form['deckid']
                    title =request.form['title']
                    description =request.form['description']
                    vissibility =request.form['vissibility']
                    data={"deckid":f"{u.user['localId']}_{deckid}","title":title,"description":description,"vissibility":vissibility}
                    db.child("deck").push(data)
                    str=f"{u.user['localId']}_{deckid}"
                    snapshot = db.child("deck").order_by_child("deckid").equal_to(str).get()
                    t = snapshot.val()
                    return render_template('index.html',tt=t.values())
                except Exception as e:
                    return f"An error occurred: {e}"
            elif request.form['submit'] == 'delete':
                db.child("deck").remove()
        return render_template('index.html')



if __name__ == '__main__':
	# app.run(debug=True)
    print("Hello")
