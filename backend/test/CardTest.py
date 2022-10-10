from flask import Flask
import sys
sys.path.append('backend/src')
import unittest
from __init__ import firebase
from auth.routes import auth_bp
from deck.routes import deck_bp
from cards.routes import card_bp

class CardTestApp(unittest.TestCase):
    def setUp(self):
        self.app=Flask(__name__, instance_relative_config=False)
        self.app.register_blueprint(deck_bp)
        self.app.register_blueprint(card_bp)
        self.app.register_blueprint(auth_bp)
        self.app=self.app.test_client()

    def test_deck_card_all_route(self):
        '''Test the deck/card/all route of our app'''
        with self.app:
            self.app.post('/login',json=dict(email='aaronadb@gmail.com',password='flashcards123'),follow_redirects=True)
            self.app.post('/deck/create',json=dict(localId='Test',title='TestDeck',description='This is a test deck',visibility='public'))
            response=self.app.get('/deck/Test/card/all')
            assert response.status_code==200
    

    def test_deck_card_all_route_post(self):
        '''Test that the post request to the '/deck/card/all' route is not allowed'''
        with self.app:
            self.app.post('/login',json=dict(email='aaronadb@gmail.com',password='flashcards123'),follow_redirects=True)
            self.app.post('/deck/create',json=dict(localId='Test',title='TestDeck',description='This is a test deck',visibility='public'))
            response=self.app.post('/deck/Test/card/all')
            assert response.status_code==405

    def test_deck_create_card_route(self):
        '''Test the create card in a deck route of our app'''
        with self.app:
            self.app.post('/login',json=dict(email='aaronadb@gmail.com',password='flashcards123'),follow_redirects=True)
            self.app.post('/deck/create',json=dict(localId='Test',title='TestDeck',description='This is a test deck',visibility='public'))
            response=self.app.post('/deck/Test/card/create',json=dict(localId='Test',cards=[dict(front='front',back='back',hint='hint')]))
            assert response.status_code==201

if __name__=="__main__":
    unittest.main()
