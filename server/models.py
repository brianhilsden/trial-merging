from datetime import datetime
from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates

db = SQLAlchemy()


class Customer(db.Model, SerializerMixin):

    __tablename__ = "customers"
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    ID_or_Passport = db.Column(db.Integer, unique=True, nullable=False)

    bookings = db.relationship(
        "Booking", back_populates="customer", cascade="all, delete-orphan"
    )

    @validates("email")
    def validate_email(self, key, email):
        if "@" not in email:
            raise ValueError("Invalid email Format")
        return email

    @validates("phone_number")
    def validate_phone_number(self, key, phone_number):
        if not phone_number.isdigit() or len(phone_number) != 10:
            raise ValueError("Phone number must be exactly 10 digits")
        return phone_number

    @validates("ID_or_Passport")
    def validate_ID_or_Passport(self, key, ID_or_Passport):
        if not ID_or_Passport.isdigit() or len(ID_or_Passport) != 9:
            raise ValueError("ID or Passport must be exactly 9 digits")
        return ID_or_Passport


class Bus(db.Model, SerializerMixin):

    __tablename__ = "buses"
    id = db.Column(db.Integer, primary_key=True)
    number_plate = db.Column(db.String, nullable=False)
    driver_id = db.Column(db.Integer, db.ForeignKey("drivers.id"), nullable=False)
    cost_per_seat = db.Column(db.Integer, nullable=False)
    number_of_seats = db.Column(db.Integer, nullable=False)
    route = db.Column(db.String, nullable=False)
    travel_time = db.Column(db.DateTime, nullable=False)

    driver = db.relationship("Driver", back_populates="buses")
    schedules = db.relationship(
        "Schedule", back_populates="bus", cascade="all, delete-orphan"
    )

    @validates("number_plate")
    def validate_number_plate(self, key, number_plate):
        if len(number_plate) != 7 or not number_plate.isalpha():
            raise ValueError("Invalid number plate format")
        elif Bus.query.filter_by(number_plate=number_plate).first():
            raise ValueError("Bus already exists")
        return number_plate


class Schedule(db.Model, SerializerMixin):

    __tablename__ = "schedules"
    id = db.Column(db.Integer, primary_key=True)
    bus_id = db.Column(db.Integer, db.ForeignKey("buses.id"), nullable=False)
    departure_time = db.Column(db.DateTime, nullable=False)
    arrival_time = db.Column(db.DateTime, nullable=False)
    travel_date = db.Column(db.DateTime, nullable=False)
    driver_id = db.Column(db.Integer, db.ForeignKey("drivers.id"), nullable=False)
    available_seats = db.Column(db.Integer, nullable=False)
    occupied_seats = db.Column(db.Integer, nullable=False)

    bus = db.relationship("Bus", back_populates="schedules")
    driver = db.relationship("Driver", back_populates="schedules")
    bookings = db.relationship(
        "Booking", back_populates="schedule", cascade="all, delete-orphan"
    )

    @validates("depature_time", "arrival_time")
    def validate_time(self, departure_time, arrival_time):
        if arrival_time <= departure_time:
            raise ValueError("Invalid: Arrival time must be after departure time")
        return departure_time, arrival_time


class Booking(db.Model, SerializerMixin):
    __tablename__ = "bookings"
    id = db.Column(db.Integer, primary_key=True)
    departure = db.Column(db.String, nullable=False) # from
    to = db.Column(db.String, nullable=False)
    number_of_seats = db.Column(db.Integer, nullable=False)
    total_cost = db.Column(db.Float, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"), nullable=False)
    schedule_id = db.Column(
        db.Integer, db.ForeignKey("schedules.id"), nullable = True
    )

    customer = db.relationship("Customer", back_populates="bookings")
    schedule = db.relationship("Schedule", back_populates="bookings")


class Driver(db.Model, SerializerMixin):

    __tablename__ = "drivers"
    id = db.Column(db.Integer, primary_key=True)
    firstname = db.Column(db.String, nullable=False)
    lastname = db.Column(db.String, nullable=False)
    license_number = db.Column(db.Integer, nullable=False)
    experience_years = db.Column(db.Integer, nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    buses = db.relationship(
        "Bus", back_populates="driver", cascade="all, delete-orphan"
    )
    schedules = db.relationship(
        "Schedule", back_populates="driver", cascade="all, delete-orphan"
    )

    @validates("license_number")
    def validate_license_number(self, key, license_number):
        if not license_number.isdigit() or len(license_number) != 9:
            raise ValueError("License number must be exactly 9 digits")
        return license_number

    @validates("phone_number")
    def validate_phone_number(self, key, phone_number):
        if not phone_number.isdigit() or len(phone_number) != 10:
            raise ValueError("Phone number must be exactly 10 digits")
        elif Driver.query.filter_by(phone_number=phone_number).first():
            raise ValueError("Phone number must be unique")
        return phone_number

    @validates("email")
    def validate_email(self, key, email):
        if "@" not in email:
            raise ValueError("Invalid email Format")
        elif Driver.query.filter_by(email=email).first():
            raise ValueError("Email already exists")
        return email


class Admin(db.Model, SerializerMixin):

    __tablename__ = "admins"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.String, default='admin')
