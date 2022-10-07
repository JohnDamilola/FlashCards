# from flask import Flask, jsonify, render_template, request
# import pyrebase

# config = {
#   'apiKey': "AIzaSyDcsYLrtPX2sd57zKj3TprRmtsdFOW1F64",
#   'authDomain': "flashcards-519da.firebaseapp.com",
#   'projectId': "flashcards-519da",
#   'storageBucket': "flashcards-519da.appspot.com",
#   'messagingSenderId': "471734273686",
#   'appId': "1:471734273686:web:03d7e81f5938d1448b24b7",
#   'measurementId': "G-ZX3KX2MBER"
# };

# firebase = pyrebase.initialize_app(config)
# auth = firebase.auth()
 
# app = Flask(__name__)


# @app.route('/', methods=['GET','POST'])
# def home():
#     return render_template('home.html')

# @app.route('/signup', methods=['GET','POST'])
# def signup():
#     if request.method == 'POST':
#         email = request.form['email']
#         password = request.form['password'] 
        
#         user = auth.create_user_with_email_and_password(email,password)
#         return jsonify(
#             user = user,
#             message = 'Registered Successfully'
#         )

# # @app.route('/login', methods=['GET','POST'])
# # def login():
# #     if request.method == 'POST':
# #         if request.form['submit'] == 'add':
# #             email = request.form['email']
# #             password = request.form['password'] 
        

# #             user=auth.sign_in_with_email_and_password(email, password)
# #             return 'Logged in Successfully'
        


# #     return render_template('login.html')



if __name__ == '__main__':
    # app.debug = True
    # app.run()
    print("Hello")
