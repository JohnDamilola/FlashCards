import sys
sys.path.append('src')
import app
def test_create_deck_route():
    '''Test the create deck route of our app'''
    response=app.test_client().post('/deck/create')
    assert response.status_code==200
"""
from unittest import TestCase
from models import User
from api import app
client=app.test_client()

def test_user():
    '''Test that the users email, hashed_password and role is stored properly'''
    user=USER('example@gmail.com','Password123')
    assert user.email=='example@gmail.com'
    assert user.hashed_password!='Password123'
    assert user.role=='user'

def test_multiple_users():
    '''Test that the hashed_passwords for different users are different'''
    user1=USER('example1@gmail.com','Password')
    user2=USER('example2@gmail.com','Password')
    user3=USER('example3@gmail.com','PasswordTest')
    assert user1.hashed_password!=user3.hashed_password
    assert user1.hashed_password!=user2.hashed_password

def test_login(client):
    '''Test that a registered user is able to login'''
    with client:
        response=client.post('login',{username:'TestUser', password:'TestPassword'})
        assert current_user.username=='TestUser'

def test_login_wrong_password(client):
    '''Test that an unregistered user is not able to login or that an user is not able to login with a wrong password'''
    with client:
        response=client.post('login',{username:'TestUser', password:'WrongPassword'})
        assert current_user.username!='TestUser'
        response==client.post('login',{username:'UnRegisteredUser', password:'Random'})
        assert current_user.username!='UnRegisteredUser'

def test_logout_redirect(client):
    '''Test that the logout page will redirect to the index page'''
    response=client.get("/logout")
    assert len(response.history)==1
    assert response.request.path=="/index"

def test_index_route():
    '''Test the index route of our app'''
    response=app.test_client().get('/')
    assert response.status_code==200
    assert response.data.decode('utf-8')=='Testing, Flask!'

def test_index_route_post():
    '''Test that the post request to the '/' route is not allowed'''
    response=app.test_client().post('/')
    assert response.status_code==405

"""
