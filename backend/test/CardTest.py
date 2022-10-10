import sys
sys.path.append('backend/src')
import unittest
from api import create_app

class CardTestApp(unittest.TestCase):
    def setUp(self):
        self.app=create_app().test_client()

    def test_deck_all_route(self, deckId):
        '''Test the deck/all route of our app'''
        response=self.app.get(f'/deck/{deckId}/card/all',query_string=dict(localId='Test'))
        assert response.status_code==200
    

    def test_deck_all_route_post(self):
        '''Test that the post request to the '/deck/all' route is not allowed'''
        response=self.app.post('/deck/all')
        assert response.status_code==405

    def test_create_deck_route(self, deckId):
        '''Test the create deck route of our app'''
        response=self.app.post(f'/deck/{deckId}/card/create')
        assert response.status_code==201

if __name__=="__main__":
    unittest.main()
