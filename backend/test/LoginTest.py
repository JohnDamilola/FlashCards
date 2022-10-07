import sys
sys.path.append('backend/src')
import unittest
import login

class TestApp(unittest.TestCase):
    def setUp(self):
        self.app=login.app.test_client()
    def test_index_route(self):
        '''Test the index route of our app'''
        response=self.app.get('/')
        assert response.status_code==200
        assert response.data.decode('utf-8')=='Testing, Flask!'

    def test_index_route_post(self):
        '''Test that the post request to the '/' route is not allowed'''
        response=self.app.post('/')
        assert response.status_code==405

    def test_signup_route(self):
        '''Test the index route of our app'''
        response=self.app.get('/signup')
        assert response.status_code==200
        assert response.data.decode('utf-8')=='Testing, Flask!'

    def test_index_route_post(self):
        '''Test that the post request to the '/' route is not allowed'''
        response=self.app.post('/signup')
        assert response.status_code==200

    def test_login_route(self):
        '''Test the index route of our app'''
        response=self.app.get('/login')
        assert response.status_code==200
        assert response.data.decode('utf-8')=='Testing, Flask!'

    def test_login_route_post(self):
        '''Test that the post request to the '/' route is not allowed'''
        response=self.app.post('/login')
        assert response.status_code==200



if __name__=="__main__":
    unittest.main()
