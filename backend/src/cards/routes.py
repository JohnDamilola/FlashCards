# backend/src/card/routes.py

from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from .. import firebase

card_bp = Blueprint(
    'card_bp', __name__
)

db = firebase.database()

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
