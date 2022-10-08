# backend/src/deck/routes.py

from flask import Blueprint, jsonify, request
from flask_cors import cross_origin
from .. import firebase

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
            status = 201
        )
    except:
        return jsonify(
            decks = [],
            message = "An error occurred:",
            status = 201
        )

@deck_bp.route('/deck/all', methods = ['GET'])
@cross_origin(supports_credentials=True)
def getdecks():
    args = request.args
    localId = args['localId']
    try:
        if localId:
            # user_decks = db.child("deck").order_by_child("userId").equal_to({localId}).limit_to_first(10).get()
            user_decks = db.child("deck").get()
            decks = [deck.val() for deck in user_decks.each()]
            return jsonify(
                decks = decks,
                message = 'Fetching decks successfully',
                status = 201
            )
        else:
            alldecks = db.child("deck").order_by_child("visibility").equal_to(1).get()
            d = alldecks.val()
            return jsonify(
                decks = d,
                message = 'Fetching decks successfully',
                status = 201
            )
    except Exception as e:
        return jsonify(
            decks = [],
            message = f"An error occurred {e}",
            status = 400
        )

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
        )
    except:
        return jsonify(
            message = 'Create Deck Failed',
            status = 400
        )

@deck_bp.route('/deck/update/<id>', methods = ['PATCH'])
@cross_origin(supports_credentials=True)
def update(id):
    try:
        data = request.get_json()
        key = id
        localId = data['localId']
        title = data['title']
        description = data['description']
        visibility = data['visibility']
        
        db.child("deck").child(key).update({
            "userId": localId, "title": title, "description": description, "visibility" : visibility
        })
        
        return jsonify(
            message = 'Update Deck Successful',
            status = 201
        )
    except Exception as e:
        return jsonify(
            message = f'Update Deck Failed {e}',
            status = 400
        )
        
@deck_bp.route('/deck/delete', methods = ['DELETE'])
@cross_origin(supports_credentials=True)
def delete():
    try:
        data = request.get_json()
        key = data['key']
        
        db.child("deck").child(key).remove()
        
        return jsonify(
            message = 'Delete Deck Successful',
            status = 201
        )
    except:
        return jsonify(
            message = 'Delete Deck Failed',
            status = 400
        )

