from flask import Flask
import pyrebase
from flask import session, Flask, render_template, request, redirect

config={'apiKey': "-",
  'authDomain': "-",
  'projectId': "-",
  'storageBucket': "-",
  'messagingSenderId': "-",
  'appId': "-",
  'measurementId': "-",
  'databaseURL':''}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()
 
app = Flask(__name__)


@app.route('/', methods=['GET','POST'])
def home():
    return render_template('home.html')

@app.route('/signup', methods=['GET','POST'])
def signup():
    if request.method == 'POST':
        if request.form['submit'] == 'add':
            email = request.form['email']
            password = request.form['password'] 
        

            user=auth.create_user_with_email_and_password(email,password)
            return 'Registered Successfully'
    return render_template("register.html")

@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        if request.form['submit'] == 'add':
            email = request.form['email']
            password = request.form['password'] 
        

            user=auth.sign_in_with_email_and_password(email, password)
            return 'Logged in Successfully'
        


    return render_template('login.html')



if __name__ == '__main__':
    app.debug = True
    app.run()
