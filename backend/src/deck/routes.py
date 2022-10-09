from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
import sys
sys.path.append("..")
from __init__ import firebase

deck_bp = Blueprint(
    'deck_bp', __name__
)

db = firebase.database()

@deck_bp.route('/deck/<id>', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getdeck(id):
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
    try:
        data = request.get_json()
        deckid = id
        localId = data['localId']
        title = data['title']
        description = data['description']
        visibility = data['visibility']
        
        db.child("deck").order_by_child("deckid").equal_to(f"{localId}_{deckid}").update({
            "deckid":f"{localId}_{deckid}","userId": localId, "title": title, "description": description, "visibility" : visibility
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
