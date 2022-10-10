import pyrebase

config = {
  'apiKey': "AIzaSyCfwbXgAzgIMbyYgf8VYbIUcy3351RE5iA",
  'authDomain': "pulse-cc3c6.firebaseapp.com",
  'databaseURL': "https://pulse-cc3c6-default-rtdb.firebaseio.com",
  'projectId': "pulse-cc3c6",
  'storageBucket': "pulse-cc3c6.appspot.com",
  'messagingSenderId': "42156089304",
  'appId': "1:42156089304:web:a95a7bcbc95a31a1a6dcad",
  'measurementId': "G-X5JRM2VEEC"
}

firebase = pyrebase.initialize_app(config)
