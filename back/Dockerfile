FROM python:3.8-slim

RUN apt update -y && apt upgrade -y && pip install --upgrade pip
RUN apt install -y sqlite3 git

COPY app/requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

RUN pip install git+https://github.com/python-escpos/python-escpos.git

RUN apt-get update && apt-get install -y \
    libusb-1.0-0-dev \
    libudev-dev
    
COPY app /app

RUN chmod +x launch.sh

CMD [ "./launch.sh" ]