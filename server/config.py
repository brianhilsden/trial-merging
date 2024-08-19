import random
from flask_cors import CORS
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
import os
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
load_dotenv()
from flask_swagger_ui import get_swaggerui_blueprint
from flask_restful import Api
from flask_jwt_extended import JWTManager,create_access_token,create_refresh_token,get_jwt_identity,jwt_required,current_user
from flask import Flask,Blueprint,request,make_response,jsonify

app = Flask(__name__)
CORS(app)
db=SQLAlchemy()
app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URI')
# app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///bus_booking.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "fsbdgfnhgvjnvhmvh"+str(
    random.randint(1,1000000000000))
app.config["SECRET_KEY"] = "JKSRVHJVFBSRDFV"+str(random.randint(1,1000000000000))
app.config["JWT_BLACKLIST_ENABLED"] = True
app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = ["access", "refresh"] 
app.config['JWT_TOKEN_LOCATION']=['headers']
app.json.compact = False
jwt = JWTManager(app)
bcrypt = Bcrypt(app)


migrate = Migrate(app, db)
db.init_app(app)

customer_bp = Blueprint("customer_bp", __name__, url_prefix="/")
customer_api = Api(customer_bp)


driver_bp = Blueprint("driver_bp", __name__, url_prefix="/drivers")
driver_api = Api(driver_bp)

admin_bp = Blueprint('admin_bp', __name__, url_prefix='/admin')
api = Api(admin_bp)

jwt = JWTManager(app)


# Register blueprints
app.register_blueprint(customer_bp)
app.register_blueprint(driver_bp)  
app.register_blueprint(admin_bp)

#Swagger
SWAGGER_URL = '/swagger/'  
API_URL = '/static/swagger.json' 


# Call factory function to create our blueprint
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL,  
    API_URL,
    config={  
        'app_name': "Test application"
    }
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)

@app.route('/swagger/', strict_slashes=False)
def swagger_view():
    return app.send_static_file('swagger.json')

