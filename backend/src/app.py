import pyrebase

config = {
	"apiKey": "-",
    "authDomain": "-",
    "databaseURL": "-",
    "projectId": "-",
    "storageBucket": "-",
    "messagingSenderId": "-",
    "appId": "-",
    "measurementId": "-"
}

firebase = pyrebase.initialize_app(config)

db = firebase.database()

from flask import *

app = Flask(__name__)

@app.route('/', methods = ['GET'])
def base():
    return render_template('index.html')

@app.route('/deck/create', methods = ['POST'])
def create():
        if request.method=='POST':
            if request.form['submit'] == 'add':
                try:
                    id = request.form['id']
                    title =request.form['title']
                    description =request.form['description']
                    vissibility =request.form['vissibility']
                    db.child("deck").push({"id":id,"title":title,"description":description,"vissibility":vissibility})
                    d = db.child("deck").get()
                    t = d.val()
                    return render_template('index.html',tt=t.values())
                except Exception as e:
                    return f"An error occurred: {e}"
            elif request.form['submit'] == 'delete':
                db.child("deck").remove()
            elif request.form['submit'] == 'update':
                db.child("deck").update()
            return "error"
        return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=True)

