cd Backend
python manage.py makemigrations
python manage.py migrate
daphne -b 0.0.0.0 -p $PORT favicon_generator.asgi:application