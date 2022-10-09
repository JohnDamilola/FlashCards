import sys
sys.path.append('backend/src')
import unittest
from api import create_app

class TestApp(unittest.TestCase):
    def setUp(self):
        self.app=create_app().test_client()

    def test_index_get_route(self):
        '''Test the index route of our app'''
        response=self.app.get('/')
        assert response.status_code==200
    

    def test_index_post(self):
        '''Test that the post request to the index route is not allowed'''
        response=self.app.post('/')
        assert response.status_code==405

    """
    def test_signup_route(self):
        '''Test the signup route of our app'''
        response=self.app.post('/signup',data=dict(email='test@gmail.com',password='testpassword'))
        print('signup',response.status_code)
        assert response.status_code==201
    """
        
    def test_login_registered_user_route(self):
        '''Test the login route of our app with an already registered user'''
        response=self.app.post('/login',data=dict(email='aaronadb@gmail.com',password='flashcards123'))
        #print('login',response.status_code)
        assert response.status_code==200
        
    def test_login_wrong_user_route(self):
        '''Test the login route of our app with a registered user with a wrong password'''
        response=self.app.post('/login',data=dict(email='aaronadb@gmail.com',password='flashcards'))
        #print('login',response.status_code)
        assert response.status_code==400
        
    def test_login_unregistered_user_route(self):
        '''Test the login route of our app with an unregistered user'''
        response=self.app.post('/login',data=dict(email='aarondiasbarreto@gmail.com',password='flashcards123'))
        print('login',response.status_code)
        assert response.status_code==400
        

if __name__=="__main__":
    unittest.main()
