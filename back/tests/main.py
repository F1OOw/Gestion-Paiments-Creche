from archives import *
from enfants import *
from saisons import *


# ajouter 200 enfants a la bdd
ajouter_enfants_bdd(200)

# creer une nouvelle saison
creer_nouvelle_saison("01-09-2024","30-06-2025")

# ajouter tous les enfants a cette saison
ajouter_enfants_bdd_saison()

