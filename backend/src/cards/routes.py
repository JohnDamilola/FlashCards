# backend/src/card/routes.py

from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from .. import firebase

card_bp = Blueprint(
    'card_bp', __name__
)

db = firebase.database()

@card_bp.route('/deck/<id>/card/all', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getcards(id):
    deckid = id
    args = request.args
    try:
            user_cards = db.child("card").order_by_child("deckid").equal_to(f"{deckid}").get()
            cards = [card.val() for card in user_cards.each()]
            return jsonify(
                cards = cards,
                message = 'Fetching cards successfully',
                status = 201
            )
    except Exception as e:
        return jsonify(
            cards = [],
            message = f"An error occurred {e}",
            status = 400
        )

@card_bp.route('/deck/<id>/card/create', methods = ['POST'])
@cross_origin(supports_credentials=True)
def createcards(id):
    deckid = id
    try:
        data = request.get_json()
        for card in data:
            db.child("card").push({
                "Id": f"{deckid}_{card['cardid']}","deckid":{deckid} ,"word": card['word'], "meaning": card['meaning']
            })
        
        return jsonify(
            message = 'Adding cards Successful',
            status = 201
        )
    except:
        return jsonify(
            message = 'Adding cards Failed',
            status = 400
        )

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
        )
    except Exception as e:
        return jsonify(
            message = 'Update Card Failed {e}',
            status = 400
        )
        
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
            status = 201
        )
    except:
        return jsonify(
            message = 'Delete Card Failed',
            status = 400
        )
