FROM python:3.8-slim

RUN apt update -y && apt upgrade -y && pip install --upgrade pip

COPY app/requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY app /app

RUN chmod +x launch.sh

CMD [ "./launch.sh" ]