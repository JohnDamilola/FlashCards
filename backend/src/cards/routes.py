# backend/src/card/routes.py
#routes.py is a file in cards folder that has all the functions defined that manipulate the cards. All CRUD functions that needs to be performed on cards are defined here.
from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
try:
    from .. import firebase
except ImportError:
    from __init__ import firebase

card_bp = Blueprint(
    'card_bp', __name__
)

db = firebase.database()

#This method is called when the user want to fetch all of the cards in a deck. Only the deckid is required to fetch all cards from the required deck.
@card_bp.route('/deck/<deckId>/card/all', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getcards(deckId):
    try:
        user_cards = db.child("card").order_by_child("deckId").equal_to(deckId).get()
        cards = [card.val() for card in user_cards.each()]
        return jsonify(
            cards = cards,
            message = 'Fetching cards successfully',
            status = 200
        ), 200
    except Exception as e:
        return jsonify(
            cards = [],
            message = f"An error occurred {e}",
            status = 400
        ), 400

#This method is routed when the user requests to create new cards in a deck. 
#Only the deckid is required to add cards to a deck.
@card_bp.route('/deck/<deckId>/card/create', methods = ['POST'])
@cross_origin(supports_credentials=True)
def createcards(deckId):
    try:
        data = request.get_json()
        localId = data['localId']
        cards = data['cards']
        
        # remove existing cards
        previous_cards = db.child("card").order_by_child("deckId").equal_to(deckId).get()
        for card in previous_cards.each():
            db.child("card").child(card.key()).remove()
        
        # add new cards
        for card in cards:
            db.child("card").push({
                "userId": localId,
                "deckId": deckId,
                "front": card['front'], 
                "back": card['back'],
                "hint": card['hint']
            })
        
        return jsonify(
            message = 'Adding cards Successful',
            status = 201
        ), 201
    except:
        return jsonify(
            message = 'Adding cards Failed',
            status = 400
        ), 400

#This method is called when the user requests to update cards in a deck. The card can be updated in terms of its word and meaning.
#Here deckid and cardid is required to uniquely identify a updating card.
@card_bp.route('/deck/<id>/update/<cardid>', methods = ['PATCH'])
@cross_origin(supports_credentials=True)
def updatecard(id,cardid):
    try:
        data = request.get_json()
        deckid = id
        cardid=cardid
        word = data['word']
        meaning = data['meaning']
        
        db.child("card").order_by_child("Id").equal_to(f"{deckid}_{cardid}").update({
            "Id": f"{deckid}_{cardid}","deckid" : {deckid}, "word": word, "meaning": meaning
        })
        
        return jsonify(
            message = 'Update Card Successful',
            status = 201
        ), 201
    except Exception as e:
        return jsonify(
            message = f'Update Card Failed {e}',
            status = 400
        ), 400
 
#This method is called when the user requests to delete the card. The deckid and the particular cardid is required to delete the card.
@card_bp.route('/deck/<id>/delete/<cardid>', methods = ['DELETE'])
@cross_origin(supports_credentials=True)
def deletecard(id,cardid):
    try:
        data = request.get_json()
        deckid = id
        cardid=cardid
        
        db.child("card").order_by_child("Id").equal_to(f"{deckid}_{cardid}").remove()
        
        return jsonify(
            message = 'Delete Card Successful',
            status = 200
        ), 200
    except:
        return jsonify(
            message = 'Delete Card Failed',
            status = 400
        ), 400
