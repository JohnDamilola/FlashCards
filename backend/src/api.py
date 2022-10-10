"""
MIT License

Copyright (c) 2022 John Damilola, Leo Hsiang, Swarangi Gaurkar, Kritika Javali, Aaron Dias Barreto

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
"""
from flask import Flask
from flask_cors import CORS

def create_app():
    '''Create Flask application.'''
    app = Flask(__name__, instance_relative_config=False)

    with app.app_context():
        try:
            from .auth.routes import auth_bp
            from .deck.routes import deck_bp
            from .cards.routes import card_bp
        except ImportError:
            from auth.routes import auth_bp
            from deck.routes import deck_bp
            from cards.routes import card_bp

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
