# GESTION DE PAIEMENT D'UNE CRECHE
C'est un outil pour gérer les paiements mensuelles des enfants d'une creche.

## Guide d'installation
Veuillez vous assurer d'avoir bien installé docker et docker-compose dans votre system.
Plus d'informations [ici](https://docs.docker.com/engine/install/)


### Linux

#### Setup
```bash
git clone https://github.com/F1OOw/Gestion-Paiments-Creche.git
cd Gestion-Paiments-Creche
chmod +x *.sh
cp .env.example .env
# Choisir sa configuration d'environement dans le fichier .env
```
#### Run & Stop & Debug
Pour lancer l'application
```bash
./run.sh
```
Pour arreter l'application
```bash
./stop.sh
```
Pour avoir acces au log de l'application
```bash
./debug.sh
```

### Windows
#### Setup
Sous cmd executez les commandes suivantes
```
git clone https://github.com/F1OOw/Gestion-Paiments-Creche.git
cd Gestion-Paiments-Creche
copy .env.example .env
# Choisir sa configuration d'environement dans le fichier .env
```

#### Run & Stop & Debug
Pour lancer l'application
```bash
docker-compose up --build -d
```
Pour arreter l'application
```bash
docker-compose down
```
Pour avoir acces au log de l'application
```bash
docker-compose logs -f
```

