FROM python:3.10-slim

RUN apt-get update && apt-get install -y redis-server

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .

CMD ["gunicorn", "--bind", "0.0.0.0:8000", "my_project.asgi:application"]
