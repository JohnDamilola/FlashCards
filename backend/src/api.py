from flask import Flask
from flask_cors import CORS
import sys
sys.path.append("..")

def create_app():
    """Create Flask application."""
    app = Flask(__name__, instance_relative_config=False)

    with app.app_context():
        from src.auth.routes import auth_bp
        from src.deck.routes import deck_bp
        from src.cards.routes import card_bp

        # Register Blueprints
        app.register_blueprint(auth_bp)
        app.register_blueprint(deck_bp)
        app.register_blueprint(card_bp)

    return app
    
app = create_app()
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, support_credentials=True)
CORS(app, resources={r"/*": {"origins": "*"}})

app.debug = True

if __name__ == '__main__':
    app.config.from_mapping({
        "DEBUG": True
    })
    
    app.run(port=8000, debug=True)
