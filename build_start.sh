#!/bin/bash
# tsc -p tsconfig.json && python3 manage.py runserver
npm run build && python3 manage.py collectstatic --noinput && python3 manage.py runserver