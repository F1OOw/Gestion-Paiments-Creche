from archives import *
from enfants import *
from saisons import *

supprimer_enfants_bdd()
# # # ajouter 80 enfants a la bdd
ajouter_enfants_bdd(100)

# # creer une nouvelle saison
creer_nouvelle_saison("2025-09-01","2026-06-30")

# # ajouter tous les enfants a cette saison
ajouter_enfants_bdd_saison()