#MIT License
#
#Copyright (c) 2022 John Damilola, Leo Hsiang, Swarangi Gaurkar, Kritika Javali, Aaron Dias Barreto
#
#Permission is hereby granted, free of charge, to any person obtaining a copy
#of this software and associated documentation files (the "Software"), to deal
#in the Software without restriction, including without limitation the rights
#to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
#copies of the Software, and to permit persons to whom the Software is
#furnished to do so, subject to the following conditions:
#
#The above copyright notice and this permission notice shall be included in all
#copies or substantial portions of the Software.
#
#THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
#IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
#FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
#AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
#LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
#OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
#SOFTWARE.

'''routes.py is a file in deck folder that has all the functions defined that manipulate the deck. All CRUD functions are defined here.'''
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from __init__ import firebase


deck_bp = Blueprint(
    'deck_bp', __name__
)

db = firebase.database()


@deck_bp.route('/deck/<id>', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getdeck(id):
    '''This method is called when we want to fetch one of the decks, we pass deckid of this deck'''
    try:
        deck = db.child("deck").child(id).get()
        return jsonify(
            deck = deck.val(),
            message = 'Fetched deck successfully',
            status = 200
        ), 200
    except Exception as e:
        return jsonify(
            decks = [],
            message = f"An error occurred: {e}",
            status = 400
        ), 400


@deck_bp.route('/deck/all', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getdecks():
    '''This method is called when we want to fetch all of the decks. Here, we check if the user is authenticated, 
    if yes show all the decks made by the user including the ones with private vissibility. if the user is not 
    authenticated then only show decks that have public vissibility.'''
    args = request.args
    localId = args and args['localId']
    try:
        if localId:
            user_decks = db.child("deck").order_by_child("userId").equal_to(localId).get()
            decks = []
            for deck in user_decks.each():
                obj = deck.val()
                obj['id'] = deck.key()
                cards = db.child("card").order_by_child("deckId").equal_to(deck.key()).get()
                obj['cards_count'] = len(cards.val())
                decks.append(obj)
                
            return jsonify(
                decks = decks,
                message = 'Fetching decks successfully',
                status = 200
            ), 200
        else:
            alldecks = db.child("deck").order_by_child("visibility").equal_to("public").get()
            d = alldecks.val()
            decks = []
            for deck in alldecks.each():
                obj = deck.val()
                obj['id'] = deck.key()
                cards = db.child("card").order_by_child("deckId").equal_to(deck.key()).get()
                obj['cards_count'] = len(cards.val())
                decks.append(obj)
                
            return jsonify(
                decks = decks,
                message = 'Fetching decks successfully',
                status = 200
            ), 200
    except Exception as e:
        return jsonify(
            decks = [],
            message = f"An error occurred {e}",
            status = 400
        ), 400



@deck_bp.route('/deck/create', methods = ['POST'])
@cross_origin(supports_credentials=True)
def create():
    '''This method is routed when the user requests to create a new deck. To create a new deck, userID, title, description and vissibility are the input required.'''
    try:
        data = request.get_json()
        localId = data['localId']
        title = data['title']
        description = data['description']
        visibility = data['visibility']
        
        db.child("deck").push({
            "userId": localId, "title": title, "description": description, "visibility" : visibility
        })
        
        return jsonify(
            message = 'Create Deck Successful',
            status = 201
        ), 201
    except Exception as e:
        return jsonify(
            message = f'Create Deck Failed {e}',
            status = 400
        ), 400


@deck_bp.route('/deck/update/<id>', methods = ['PATCH'])
@cross_origin(supports_credentials=True)
def update(id):
    '''This method is called when the user requests to update the deck. The deck can be updated in terms of its title, description and vissibility.'''
    try:
        data = request.get_json()
        localId = data['localId']
        title = data['title']
        description = data['description']
        visibility = data['visibility']
        
        db.child("deck").child(id).update({
            "userId": localId, "title": title, "description": description, "visibility" : visibility
        })
        
        return jsonify(
            message = 'Update Deck Successful',
            status = 201
        ), 201
    except Exception as e:
        return jsonify(
            message = f'Update Deck Failed {e}',
            status = 400
        ), 400
 

@deck_bp.route('/deck/delete/<id>', methods = ['DELETE'])
@cross_origin(supports_credentials=True)
def delete(id):
    '''This method is called when the user requests to delete the deck. Only the deckid is required to delete the deck.'''
    try:
        db.child("deck").child(id).remove()
        
        return jsonify(
            message = 'Delete Deck Successful',
            status = 200
        ), 200
    except Exception as e:
        return jsonify(
            message = f'Delete Deck Failed {e}',
            status = 400
        ), 400
