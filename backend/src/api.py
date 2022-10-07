# from backend.src import create_app
from flask import Flask
from flask_cors import CORS

def create_app():
    """Create Flask application."""
    app = Flask(__name__, instance_relative_config=False)

    with app.app_context():
        from .auth.routes import auth_bp

        # Register Blueprints
        app.register_blueprint(auth_bp)

    return app
    
app = create_app()
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, support_credentials=True)
CORS(app, resources={r"/*": {"origins": "*"}})

app.debug = True

if __name__ == '__main__':
    app.run(port=8000, debug=True)