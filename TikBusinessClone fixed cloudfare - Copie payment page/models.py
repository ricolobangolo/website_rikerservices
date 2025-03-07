from app import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    discord_id = db.Column(db.String(64), unique=True)
    services = db.relationship('UserService', backref='user', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class UserService(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service_type = db.Column(db.String(50), nullable=False)  # pixel_gun, cod, supercell
    service_name = db.Column(db.String(100), nullable=False)
    status = db.Column(db.String(20), default='active')  # active, completed, pending
    purchase_date = db.Column(db.DateTime, default=datetime.utcnow)
    warranty_end = db.Column(db.DateTime)
    details = db.Column(db.JSON)  # Store service-specific details
    order_id = db.Column(db.String(100), unique=True)
    price = db.Column(db.Float)
    payment_method = db.Column(db.String(50))  # paypal, crypto, discord_nitro, etc.