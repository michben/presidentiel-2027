// ============================================================
// Présidentielle 2027 — Données de démonstration (repli hors-ligne)
// Ces données sont utilisées uniquement si l'API Render ne répond
// pas (ex: service en veille au premier chargement). Sinon, les
// données réelles gérées par l'admin sont chargées via loadSiteData().
// ============================================================

// --- Force régionale par département (codes INSEE) ---
const REGIONAL_FORCES = {
  nord: ['59','62','80','60','02','51','08'],
  est: ['67','68','57','88','54','55','90','70'],
  idf: ['75','77','78','91','92','93','94','95'],
  bretagne: ['35','22','56','29'],
  ouest: ['44','49','53','72','85','17','16','79'],
  sudEst: ['13','83','84','04','05','06','2A','2B','83'],
  sudOuest: ['31','32','46','65','81','82','09','12','24','33','40','47','64'],
  centre: ['18','28','36','37','41','45'],
  aura: ['01','03','07','15','26','38','42','43','63','69','73','74'],
  normandie: ['14','27','50','61','76'],
  occitanie: ['11','30','34','48','66','13'],
  nouvelleAquitaine: ['19','23','87','33','40','47','64','24','16','17','79','86'],
  corse: ['2A','2B'],
  grandEst: ['08','10','51','52','54','55','57','67','68','88','90']
};

// --- 39 candidats (source: candidatspresidentielles2027.fr) ---
const CANDIDATES = [
  { id:'philippe', nom:'Édouard Philippe', parti:'Horizons', couleur:'#1e6fd9', bord:'centre_droite', statut:'déclarée', popularite:0.92, forces:['ouest','idf','centre'] },
  { id:'lepen', nom:'Marine Le Pen', parti:'Rassemblement National', couleur:'#0d3b8c', bord:'extrême_droite', statut:'déclarée', popularite:0.90, forces:['nord','est','sudEst','mediterranee'] },
  { id:'attal', nom:'Gabriel Attal', parti:'Renaissance', couleur:'#7b2cbf', bord:'centre', statut:'déclarée', popularite:0.85, forces:['idf','ouest','nord'] },
  { id:'melenchon', nom:'Jean-Luc Mélenchon', parti:'La France insoumise', couleur:'#e63946', bord:'extrême_gauche', statut:'déclarée', popularite:0.80, forces:['sudEst','idf','sudOuest'] },
  { id:'retailleau', nom:'Bruno Retailleau', parti:'Les Républicains', couleur:'#264653', bord:'droite', statut:'déclarée', popularite:0.65, forces:['ouest','centre','idf'] },
  { id:'bertrand', nom:'Xavier Bertrand', parti:'Nous France', couleur:'#2a9d8f', bord:'centre_droite', statut:'déclarée', popularite:0.55, forces:['nord','idf'] },
  { id:'glucksmann', nom:'Raphaël Glucksmann', parti:'Place publique', couleur:'#f4a261', bord:'centre_gauche', statut:'déclarée', popularite:0.50, forces:['idf','est','sudEst'] },
  { id:'guedj', nom:'Jérôme Guedj', parti:'Parti socialiste', couleur:'#e63946', bord:'gauche', statut:'déclarée', popularite:0.45, forces:['idf','sudOuest','centre'] },
  { id:'dupontaignan', nom:'Nicolas Dupont-Aignan', parti:'Debout la France', couleur:'#8d99ae', bord:'droite', statut:'déclarée', popularite:0.35, forces:['idf','nord'] },
  { id:'lisnard', nom:'David Lisnard', parti:'Nouvelle Énergie', couleur:'#e9c46a', bord:'centre_droite', statut:'déclarée', popularite:0.40, forces:['sudEst','corse','mediterranee'] },
  { id:'batho', nom:'Delphine Batho', parti:'Génération Écologie', couleur:'#52b788', bord:'gauche', statut:'déclarée', popularite:0.30, forces:['ouest','centre','sudOuest'] },
  { id:'philippot', nom:'Florian Philippot', parti:'Les Patriotes', couleur:'#6c757d', bord:'droite', statut:'déclarée', popularite:0.20, forces:['est','nord'] },
  { id:'asselineau', nom:'François Asselineau', parti:'UPR', couleur:'#9c6644', bord:'droite', statut:'déclarée', popularite:0.15, forces:['idf','est'] },
  { id:'arthaud', nom:'Nathalie Arthaud', parti:'Lutte ouvrière', couleur:'#bc4749', bord:'extrême_gauche', statut:'déclarée', popularite:0.15, forces:['nord','ouest','sudEst'] },
  { id:'roussel', nom:'Fabien Roussel', parti:'Parti communiste', couleur:'#d62828', bord:'extrême_gauche', statut:'déclarée', popularite:0.25, forces:['nord','est'] },
  { id:'tondelier', nom:'Marine Tondelier', parti:'Les Écologistes', couleur:'#95d5b2', bord:'gauche', statut:'déclarée', popularite:0.30, forces:['nord','idf','sudOuest'] },
  { id:'cazeneuve', nom:'Bernard Cazeneuve', parti:'La Convention', couleur:'#1a73e8', bord:'centre_gauche', statut:'déclarée', popularite:0.35, forces:['ouest','normandie','idf'] },
  { id:'faure', nom:'Olivier Faure', parti:'Parti socialiste', couleur:'#e63946', bord:'gauche', statut:'déclarée', popularite:0.30, forces:['idf','sudEst'] },
  { id:'ruffin', nom:'François Ruffin', parti:'Debout !', couleur:'#e76f51', bord:'gauche', statut:'déclarée', popularite:0.35, forces:['nord','idf'] },
  { id:'wauquiez', nom:'Laurent Wauquiez', parti:'Les Républicains', couleur:'#1d3557', bord:'droite', statut:'pressentie', popularite:0.40, forces:['aura','rhône','idf'] },
  { id:'devillepin', nom:'Dominique de Villepin', parti:'La France humaniste', couleur:'#457b9d', bord:'centre', statut:'pressentie', popularite:0.25, forces:['idf','sudOuest'] },
  { id:'zemmour', nom:'Éric Zemmour', parti:'Reconquête', couleur:'#3d405b', bord:'extrême_droite', statut:'pressentie', popularite:0.30, forces:['idf','sudEst','mediterranee'] },
  { id:'bouamrane', nom:'Karim Bouamrane', parti:'La France Humaine et Forte', couleur:'#d62828', bord:'centre_gauche', statut:'déclarée', popularite:0.20, forces:['idf','sudOuest'] },
  { id:'egger', nom:'Clara Egger', parti:'Solution démocratique', couleur:'#f4a261', bord:'centre_gauche', statut:'déclarée', popularite:0.10, forces:['idf','aura'] },
  { id:'mikolajczak', nom:'Antoine Mikolajczak', parti:'Équinoxe', couleur:'#e9c46a', bord:'centre_gauche', statut:'déclarée', popularite:0.10, forces:['nord','idf'] },
  { id:'kazib', nom:'Anasse Kazib', parti:'Révolution permanente', couleur:'#bc4749', bord:'extrême_gauche', statut:'déclarée', popularite:0.10, forces:['idf','nord'] },
  { id:'branco', nom:'Juan Branco', parti:'Les Ruches', couleur:'#bc4749', bord:'gauche', statut:'déclarée', popularite:0.10, forces:['idf','sudEst'] },
  { id:'brun', nom:'Philippe Brun', parti:'Parti socialiste', couleur:'#d62828', bord:'gauche', statut:'déclarée', popularite:0.10, forces:['nord','ouest'] },
  { id:'maurel', nom:'Emmanuel Maurel', parti:'Gauche républicaine', couleur:'#bc4749', bord:'gauche', statut:'déclarée', popularite:0.10, forces:['sudOuest','idf'] },
  { id:'verdier', nom:'Fabien Verdier', parti:'Divers gauche', couleur:'#e76f51', bord:'gauche', statut:'déclarée', popularite:0.10, forces:['sudOuest','occitanie'] },
  { id:'massard', nom:'Lydie Massard', parti:'UDB', couleur:'#2a9d8f', bord:'centre_gauche', statut:'déclarée', popularite:0.08, forces:['bretagne','ouest'] },
  { id:'labib', nom:'Selma Labib', parti:'NPA-Révolutionnaires', couleur:'#bc4749', bord:'extrême_gauche', statut:'déclarée', popularite:0.08, forces:['idf','nord'] },
  { id:'lalanne', nom:'Francis Lalanne', parti:'France Libre', couleur:'#6c757d', bord:'autre', statut:'déclarée', popularite:0.08, forces:['sudOuest','ouest'] },
  { id:'mathieu', nom:'Benoît Mathieu', parti:'Sans étiquette', couleur:'#adb5bd', bord:'autre', statut:'déclarée', popularite:0.08, forces:['aura','centre'] },
  { id:'durif', nom:'Sylvain Durif', parti:'Sans étiquette', couleur:'#6c757d', bord:'autre', statut:'déclarée', popularite:0.05, forces:['aura'] },
  { id:'royal', nom:'Ségolène Royal', parti:'Parti socialiste', couleur:'#d62828', bord:'gauche', statut:'déclarée', popularite:0.35, forces:['sudOuest','ouest','idf'] },
  { id:'jadot', nom:'Yannick Jadot', parti:'Les Écologistes', couleur:'#74c69d', bord:'gauche', statut:'hors_course', popularite:0.15, forces:['idf','bretagne','ouest'] },
  { id:'rousseau', nom:'Sandrine Rousseau', parti:'Les Écologistes', couleur:'#52b788', bord:'gauche', statut:'hors_course', popularite:0.15, forces:['idf','nord'] },
  { id:'autain', nom:'Clémentine Autain', parti:'L\'APRÈS', couleur:'#e76f51', bord:'gauche', statut:'retirée', popularite:0.10, forces:['idf','sudEst'] }
];

// --- Constantes légales ---
const SEUIL_PARRAINAGES = 500;
const SEUIL_DEPARTEMENTS = 30;
const PLAFOND_DEPARTEMENT = 50;

// --- Génération déterministe de parrainages (repli hors-ligne) ---
function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateParrainages() {
  const data = {};
  CANDIDATES.forEach((cand, idx) => {
    if (cand.statut === 'hors_course' || cand.statut === 'retirée') {
      data[cand.id] = {};
      return;
    }
    const rng = seededRandom(idx * 1000 + 42);
    const depts = {};
    const targetTotal = Math.round(SEUIL_PARRAINAGES * cand.popularite * (0.8 + rng() * 0.4));
    let assigned = 0;
    const deptList = Object.keys(DEPARTEMENTS);
    const shuffled = deptList.slice().sort(() => rng() - 0.5);
    shuffled.forEach(code => {
      if (assigned >= targetTotal) return;
      const isForce = cand.forces.some(f => (REGIONAL_FORCES[f] || []).includes(code));
      const baseProb = isForce ? 0.7 : 0.15;
      if (rng() < baseProb) {
        const maxVal = isForce ? Math.min(PLAFOND_DEPARTEMENT, Math.round(15 + cand.popularite * 35)) : Math.min(10, Math.round(cand.popularite * 8));
        const val = Math.max(1, Math.round(rng() * maxVal));
        depts[code] = Math.min(val, PLAFOND_DEPARTEMENT);
        assigned += depts[code];
      }
    });
    if (Object.keys(depts).length === 0 && cand.popularite > 0.05) {
      shuffled.slice(0, 5).forEach(code => {
        depts[code] = Math.max(1, Math.round(cand.popularite * 5));
      });
    }
    data[cand.id] = depts;
  });
  return data;
}

// --- Liste des départements (métropole) ---
const DEPARTEMENTS = {
  '01':'Ain','02':'Aisne','03':'Allier','04':'Alpes-de-Haute-Provence','05':'Hautes-Alpes',
  '06':'Alpes-Maritimes','07':'Ardèche','08':'Ardennes','09':'Ariège','10':'Aube',
  '11':'Aude','12':'Aveyron','13':'Bouches-du-Rhône','14':'Calvados','15':'Cantal',
  '16':'Charente','17':'Charente-Maritime','18':'Cher','19':'Corrèze','2A':'Corse-du-Sud',
  '2B':'Haute-Corse','21':'Côte-d\'Or','22':'Côtes-d\'Armor','23':'Creuse','24':'Dordogne',
  '25':'Doubs','26':'Drôme','27':'Eure','28':'Eure-et-Loir','29':'Finistère',
  '30':'Gard','31':'Haute-Garonne','32':'Gers','33':'Gironde','34':'Hérault',
  '35':'Ille-et-Vilaine','36':'Indre','37':'Indre-et-Loire','38':'Isère','39':'Jura',
  '40':'Landes','41':'Loir-et-Cher','42':'Loire','43':'Haute-Loire','44':'Loire-Atlantique',
  '45':'Loiret','46':'Lot','47':'Lot-et-Garonne','48':'Lozère','49':'Maine-et-Loire',
  '50':'Manche','51':'Marne','52':'Haute-Marne','53':'Mayenne','54':'Meurthe-et-Moselle',
  '55':'Meuse','56':'Morbihan','57':'Moselle','58':'Nièvre','59':'Nord',
  '60':'Oise','61':'Orne','62':'Pas-de-Calais','63':'Puy-de-Dôme','64':'Pyrénées-Atlantiques',
  '65':'Hautes-Pyrénées','66':'Pyrénées-Orientales','67':'Bas-Rhin','68':'Haut-Rhin','69':'Rhône',
  '70':'Haute-Saône','71':'Saône-et-Loire','72':'Sarthe','73':'Savoie','74':'Haute-Savoie',
  '75':'Paris','76':'Seine-Maritime','77':'Seine-et-Marne','78':'Yvelines','79':'Deux-Sèvres',
  '80':'Somme','81':'Tarn','82':'Tarn-et-Garonne','83':'Var','84':'Vaucluse',
  '85':'Vendée','86':'Vienne','87':'Haute-Vienne','88':'Vosges','89':'Yonne',
  '90':'Territoire de Belfort','91':'Essonne','92':'Hauts-de-Seine','93':'Seine-Saint-Denis','94':'Val-de-Marne',
  '95':'Val-d\'Oise',
  '971':'Guadeloupe','972':'Martinique','973':'Guyane','974':'La Réunion','976':'Mayotte',
  '975':'Saint-Pierre-et-Miquelon','977':'Saint-Barthélemy','978':'Saint-Martin',
  '986':'Wallis-et-Futuna','987':'Polynésie française','988':'Nouvelle-Calédonie'
};

// Codes des departements et collectivites d'outre-mer : comptent pour la
// regle des 500 signatures et des 30 departements minimum, mais n'ont pas
// de forme geographique dans le fond de carte (metropole uniquement) -
// affiches a part dans un tableau dedie plutot que sur la carte SVG.
const OUTREMER_CODES = ['971','972','973','974','976','975','977','978','986','987','988'];

// --- Données de repli (utilisées seulement si l'API ne répond pas) ---
const parrainagesData = generateParrainages();

const FICHES = {
  philippe: { description:'Ancien Premier ministre (2017-2022), maire du Havre. Fondateur du parti Horizons.', programme:'Priorité à la réduction de la dette et de la dépense publique · Fait de la sécurité et de la fermeté judiciaire une priorité absolue · Attaché au maintien dans l\'Union européenne et l\'euro · Pour un approfondissement de l\'intégration européenne · Défend le maintien de la réforme des retraites à 64 ans', soutenir:'https://www.edouardphilippe.fr', twitter:'https://twitter.com/edouardphilippe', website:'https://www.edouardphilippe.fr', photo:'photos/philippe.jpg' },
  lepen: { description:'Présidente du Rassemblement National, députée du Pas-de-Calais.', programme:'Pour une politique migratoire nettement plus restrictive · Fait de la sécurité et de la fermeté judiciaire une priorité absolue · Défend le nucléaire comme pilier de la stratégie énergétique · Réservé sur un renforcement des compétences européennes · Priorité à la réduction de la dette et de la dépense publique', soutenir:'https://www.rassemblementnational.fr', twitter:'https://twitter.com/MLP_officiel', website:'https://www.rassemblementnational.fr', photo:'photos/lepen.jpg' },
  attal: { description:'Ancien Premier ministre (2024), ancien ministre de l\'Éducation.', programme:'Défend le maintien de la réforme des retraites à 64 ans · Attaché au maintien dans l\'Union européenne et l\'euro · Pour un approfondissement de l\'intégration européenne · Pour conditionner les prestations sociales à une activité ou une contrepartie · Priorité à la réduction de la dette et de la dépense publique', soutenir:'https://gabrielattal.fr', twitter:'https://twitter.com/GabrielAttal', website:'https://gabrielattal.fr', photo:'photos/attal.jpg' },
  melenchon: { description:'Député de Marseille, fondateur de La France insoumise.', programme:'Refuse l\'austérité budgétaire, priorité aux dépenses sociales · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Opposé à un durcissement de la politique migratoire · Soutient l\'inscription du référendum d\'initiative citoyenne (RIC) dans la Constitution · Pour une plus forte taxation des grandes fortunes et des revenus du capital', soutenir:'https://jlm2027.fr', twitter:'https://twitter.com/JLMelenchon', website:'https://lafranceinsoumise.fr', photo:'photos/melenchon.jpg' },
  retailleau: { description:'Sénateur de la Vendée, président des Républicains depuis 2025.', programme:'Priorité à la réduction de la dette et de la dépense publique · Défend le maintien de la réforme des retraites à 64 ans · Pour une politique migratoire nettement plus restrictive · Fait de la sécurité et de la fermeté judiciaire une priorité absolue · Défend le nucléaire comme pilier de la stratégie énergétique', soutenir:'https://www.brunoretailleau.fr', twitter:'https://twitter.com/BrunoRetailleau', website:'https://www.lesrepublicains.fr', photo:'photos/retailleau.jpg' },
  bertrand: { description:'Président de la région Hauts-de-France. Fondateur du mouvement Nous France.', programme:'Pour une politique migratoire nettement plus restrictive · Fait de la sécurité et de la fermeté judiciaire une priorité absolue · Priorité à la réduction de la dette et de la dépense publique · Défend le nucléaire comme pilier de la stratégie énergétique · Attaché au maintien dans l\'Union européenne et l\'euro', soutenir:'https://xavierbertrand.fr', twitter:'https://twitter.com/xbertrand', website:'https://xavierbertrand.fr', photo:'photos/bertrand.jpg' },
  glucksmann: { description:'Député européen, cofondateur de Place publique.', programme:'Attaché au maintien dans l\'Union européenne et l\'euro · Pour un approfondissement de l\'intégration européenne · Pour une plus forte taxation des grandes fortunes et des revenus du capital · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Opposé à un durcissement de la politique migratoire', soutenir:'https://raphaelglucksmann.fr', twitter:'https://twitter.com/RGlucksmann', website:'https://raphaelglucksmann.fr', photo:'photos/glucksmann.jpg' },
  guedj: { description:'Député de l\'Essonne, figure du Parti socialiste.', programme:'Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Attaché au maintien dans l\'Union européenne et l\'euro · Pour un approfondissement de l\'intégration européenne · Pour une plus forte taxation des grandes fortunes et des revenus du capital · Refuse l\'austérité budgétaire, priorité aux dépenses sociales', soutenir:'https://jeromeguedj.fr', twitter:'https://twitter.com/jeromeguedj', website:'https://jeromeguedj.fr', photo:'photos/guedj.jpg' },
  dupontaignan: { description:'Ancien député de l\'Essonne, président de Debout la France.', programme:'Pour une politique migratoire nettement plus restrictive · Fait de la sécurité et de la fermeté judiciaire une priorité absolue · Défend le nucléaire comme pilier de la stratégie énergétique · Favorable à une sortie de l\'Union européenne et/ou de l\'euro · Réservé sur un renforcement des compétences européennes', soutenir:'https://www.debout-la-france.fr', twitter:'https://twitter.com/ndupontaignan', website:'https://www.debout-la-france.fr', photo:'photos/dupontaignan.jpg' },
  lisnard: { description:'Maire de Cannes depuis 2014. Fondateur du mouvement Nouvelle Énergie.', programme:'Fait de la sécurité et de la fermeté judiciaire une priorité absolue · Pour conditionner les prestations sociales à une activité ou une contrepartie · Priorité à la réduction de la dette et de la dépense publique · Défend le maintien de la réforme des retraites à 64 ans · Pour une politique migratoire nettement plus restrictive', soutenir:'https://www.davidlisnard.fr', twitter:'https://twitter.com/DavidLisnard', website:'https://www.davidlisnard.fr', photo:'photos/lisnard.jpg' },
  batho: { description:'Ancienne ministre de l\'Écologie, présidente de Génération Écologie.', programme:'Pour une plus forte taxation des grandes fortunes et des revenus du capital · Refuse l\'austérité budgétaire, priorité aux dépenses sociales · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Opposé à un durcissement de la politique migratoire · Privilégie la prévention à la répression sécuritaire', soutenir:'https://www.generation-ecologie.fr', twitter:'https://twitter.com/DelphineBatho', website:'https://www.generation-ecologie.fr', photo:'photos/batho.png' },
  philippot: { description:'Fondateur des Patriotes après son départ du Front National.', programme:'Pour une politique migratoire nettement plus restrictive · Fait de la sécurité et de la fermeté judiciaire une priorité absolue · Défend le nucléaire comme pilier de la stratégie énergétique · Favorable à une sortie de l\'Union européenne et/ou de l\'euro · Réservé sur un renforcement des compétences européennes', soutenir:'https://lespatriotes.fr', twitter:'https://twitter.com/FlorianPhilippot', website:'https://lespatriotes.fr', photo:'photos/philippot.jpg' },
  asselineau: { description:'Fondateur de l\'Union populaire républicaine (UPR).', programme:'Pour une politique migratoire nettement plus restrictive · Défend le nucléaire comme pilier de la stratégie énergétique · Favorable à une sortie de l\'Union européenne et/ou de l\'euro · Réservé sur un renforcement des compétences européennes · Soutient l\'inscription du référendum d\'initiative citoyenne (RIC) dans la Constitution', soutenir:'https://www.upr.fr', twitter:'https://twitter.com/AsselineauF', website:'https://www.upr.fr', photo:'photos/asselineau.jpg' },
  arthaud: { description:'Porte-parole de Lutte ouvrière.', programme:'Refuse l\'austérité budgétaire, priorité aux dépenses sociales · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Privilégie la prévention à la répression sécuritaire · Pour une plus forte taxation des grandes fortunes et des revenus du capital · Opposé à conditionner les aides sociales à une contrepartie', soutenir:'https://www.lutte-ouvriere.fr', twitter:'', website:'https://www.lutte-ouvriere.fr', photo:'photos/arthaud.jpg' },
  roussel: { description:'Sénateur du Nord, secrétaire national du Parti communiste français.', programme:'Refuse l\'austérité budgétaire, priorité aux dépenses sociales · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Opposé à un durcissement de la politique migratoire · Défend le nucléaire comme pilier de la stratégie énergétique · Soutient l\'inscription du référendum d\'initiative citoyenne (RIC) dans la Constitution', soutenir:'https://www.pcf.fr', twitter:'https://twitter.com/f_roussel', website:'https://www.pcf.fr', photo:'photos/roussel.jpg' },
  tondelier: { description:'Maire d\'Hénin-Beaumont, secrétaire nationale des Écologistes (EÉLV).', programme:'Refuse l\'austérité budgétaire, priorité aux dépenses sociales · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Opposé à un durcissement de la politique migratoire · Pour une sortie du nucléaire au profit des renouvelables · Attaché au maintien dans l\'Union européenne et l\'euro', soutenir:'https://www.eelv.fr', twitter:'https://twitter.com/marine_td', website:'https://www.eelv.fr', photo:'photos/tondelier.jpg' },
  cazeneuve: { description:'Ancien Premier ministre (2016-2017). Fondateur du parti La Convention.', programme:'Fait de la sécurité et de la fermeté judiciaire une priorité absolue · Défend le nucléaire comme pilier de la stratégie énergétique · Attaché au maintien dans l\'Union européenne et l\'euro · Ne soutient pas la création d\'un RIC constitutionnel · Priorité à la réduction de la dette et de la dépense publique', soutenir:'https://bernardcazeneuve.fr', twitter:'', website:'https://bernardcazeneuve.fr', photo:'photos/cazeneuve.jpg' },
  faure: { description:'Député de Seine-et-Marne, ancien Premier secrétaire du Parti socialiste.', programme:'Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Attaché au maintien dans l\'Union européenne et l\'euro · Pour une plus forte taxation des grandes fortunes et des revenus du capital · Refuse l\'austérité budgétaire, priorité aux dépenses sociales · Opposé à un durcissement de la politique migratoire', soutenir:'https://olivierfaure.fr', twitter:'https://twitter.com/OlivierFaure', website:'https://olivierfaure.fr', photo:'photos/faure.png' },
  ruffin: { description:'Député de la Somme, fondateur du mouvement Debout !.', programme:'Refuse l\'austérité budgétaire, priorité aux dépenses sociales · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Pour une plus forte taxation des grandes fortunes et des revenus du capital · Opposé à conditionner les aides sociales à une contrepartie · Attaché au maintien dans l\'Union européenne et l\'euro', soutenir:'https://francoisruffin.fr', twitter:'https://twitter.com/F_Ruffin', website:'https://francoisruffin.fr', photo:'photos/ruffin.jpg' },
  wauquiez: { description:'Président de la région Auvergne-Rhône-Alpes.', programme:'Priorité à la réduction de la dette et de la dépense publique · Défend le maintien de la réforme des retraites à 64 ans · Pour une politique migratoire nettement plus restrictive · Fait de la sécurité et de la fermeté judiciaire une priorité absolue · Défend le nucléaire comme pilier de la stratégie énergétique', soutenir:'https://www.laurentwauquiez.fr', twitter:'https://twitter.com/lwauquiez', website:'https://www.laurentwauquiez.fr', photo:'photos/wauquiez.jpg' },
  devillepin: { description:'Ancien Premier ministre (2005-2007). Candidat pressenti.', programme:'Fait de la sécurité et de la fermeté judiciaire une priorité absolue · Attaché au maintien dans l\'Union européenne et l\'euro · Priorité à la réduction de la dette et de la dépense publique · Pour une politique migratoire nettement plus restrictive · Défend le nucléaire comme pilier de la stratégie énergétique', soutenir:'', twitter:'', website:'', photo:'photos/devillepin.jpg' },
  zemmour: { description:'Journaliste et essayiste. Fondateur de Reconquête.', programme:'Défend le maintien de la réforme des retraites à 64 ans · Pour une politique migratoire nettement plus restrictive · Fait de la sécurité et de la fermeté judiciaire une priorité absolue · Défend le nucléaire comme pilier de la stratégie énergétique · Réservé sur un renforcement des compétences européennes', soutenir:'https://www.reconquete.fr', twitter:'https://twitter.com/ZemmourEric', website:'https://www.reconquete.fr', photo:'photos/zemmour.jpg' },
  bouamrane: { description:'Maire de Saint-Ouen (93). Fondateur de La France Humaine et Forte.', programme:'Fait de la sécurité et de la fermeté judiciaire une priorité absolue · Attaché au maintien dans l\'Union européenne et l\'euro · Priorité à la réduction de la dette et de la dépense publique · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Pour une politique migratoire nettement plus restrictive', soutenir:'', twitter:'', website:'', photo:'photos/bouamrane.jpg' },
  egger: { description:'Maître de conférences en science politique. Fondatrice de Solution démocratique.', programme:'Soutient l\'inscription du référendum d\'initiative citoyenne (RIC) dans la Constitution', soutenir:'', twitter:'', website:'', photo:'photos/egger.jpg' },
  mikolajczak: { description:'Fondateur du parti Équinoxe, classé à gauche.', programme:'Défend le nucléaire comme pilier de la stratégie énergétique · Attaché au maintien dans l\'Union européenne et l\'euro · Soutient l\'inscription du référendum d\'initiative citoyenne (RIC) dans la Constitution', soutenir:'', twitter:'', website:'', photo:'photos/mikolajczak.jpg' },
  kazib: { description:'Cheminot et militant syndical. Porte-parole de Révolution permanente.', programme:'Refuse l\'austérité budgétaire, priorité aux dépenses sociales · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Opposé à un durcissement de la politique migratoire · Privilégie la prévention à la répression sécuritaire · Réservé sur un renforcement des compétences européennes', soutenir:'https://revolutionpermanente.fr', twitter:'https://twitter.com/AnasseKazib', website:'https://revolutionpermanente.fr', photo:'photos/kazib.jpg' },
  branco: { description:'Avocat et essayiste. Fondateur du mouvement Les Ruches.', programme:'Soutient l\'inscription du référendum d\'initiative citoyenne (RIC) dans la Constitution · Refuse l\'austérité budgétaire, priorité aux dépenses sociales · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Opposé à un durcissement de la politique migratoire · Privilégie la prévention à la répression sécuritaire', soutenir:'', twitter:'https://twitter.com/juan_branco', website:'', photo:'photos/branco.jpg' },
  brun: { description:'Député socialiste de l\'Eure.', programme:'Salaires, pouvoir d\'achat, services publics.', soutenir:'', twitter:'', website:'', photo:'photos/brun.jpg' },
  maurel: { description:'Député européen, fondateur de la Gauche républicaine et socialiste.', programme:'République sociale, services publics, laïcité.', soutenir:'', twitter:'https://twitter.com/emmanuelmaurel', website:'', photo:'photos/maurel.jpg' },
  verdier: { description:'Candidat à la primaire socialiste.', programme:'Aménagement du territoire, égalité des chances.', soutenir:'', twitter:'', website:'' },
  massard: { description:'Vice-présidente de l\'UDB (Union démocratique bretonne).', programme:'Fédéralisme, défense des langues régionales, autonomie bretonne.', soutenir:'', twitter:'', website:'https://www.udb.bzh', photo:'photos/massard.jpg' },
  labib: { description:'Candidate du NPA-Révolutionnaires (trotskyste).', programme:'Anti-capitalisme, luttes sociales, internationalisme.', soutenir:'https://npa-revolutionnaires.fr', twitter:'', website:'https://npa-revolutionnaires.fr' },
  lalanne: { description:'Chanteur et militant. Fondateur du mouvement France Libre.', programme:'Souveraineté, libertés, non-conformisme.', soutenir:'', twitter:'https://twitter.com/Francis_Lalanne', website:'', photo:'photos/lalanne.jpg' },
  mathieu: { description:'Candidat sans étiquette.', programme:'Démocratie directe, référendum d\'initiative citoyenne.', soutenir:'', twitter:'', website:'' },
  durif: { description:'Candidat sans étiquette, dit « le Grand Monarque ».', programme:'Aucun programme vérifiable.', soutenir:'', twitter:'', website:'', photo:'photos/durif.png' },
  royal: { description:'Ancienne ministre, présidente de la région Poitou-Charentes (2004-2014).', programme:'Attaché au maintien dans l\'Union européenne et l\'euro · Refuse l\'austérité budgétaire, priorité aux dépenses sociales · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Opposé à un durcissement de la politique migratoire · Fait de la sécurité et de la fermeté judiciaire une priorité absolue', soutenir:'', twitter:'https://twitter.com/SRoyal', website:'', photo:'photos/royal.jpg' },
  jadot: { description:'Ancien député européen (EÉLV). Hors course après retrait.', programme:'Refuse l\'austérité budgétaire, priorité aux dépenses sociales · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Opposé à un durcissement de la politique migratoire · Pour une sortie du nucléaire au profit des renouvelables · Soutient l\'inscription du référendum d\'initiative citoyenne (RIC) dans la Constitution', soutenir:'', twitter:'https://twitter.com/yjadot', website:'', photo:'photos/jadot.jpg' },
  rousseau: { description:'Ancienne députée (EÉLV). Hors course après retrait.', programme:'Refuse l\'austérité budgétaire, priorité aux dépenses sociales · Pour l\'abrogation ou l\'assouplissement de la réforme des retraites à 64 ans · Opposé à un durcissement de la politique migratoire · Pour une sortie du nucléaire au profit des renouvelables · Soutient l\'inscription du référendum d\'initiative citoyenne (RIC) dans la Constitution', soutenir:'', twitter:'https://twitter.com/SandrineRousseau', website:'', photo:'photos/rousseau.jpg' },
  autain: { description:'Ancienne députée de Seine-Saint-Denis. Candidature retirée.', programme:'Opposé à conditionner les aides sociales à une contrepartie', soutenir:'', twitter:'https://twitter.com/c_autain', website:'', photo:'photos/autain.jpg' }
};

const SITE_LINKS = [
  { label: 'Conseil constitutionnel', url: 'https://www.conseil-constitutionnel.fr' },
  { label: 'France-Vote.fr', url: 'https://www.france-vote.fr/actualites/parrainages-presidentielle-2027-500-signatures' },
  { label: 'LCP', url: 'https://lcp.fr/actualites/presidentielle-2027-la-liste-des-candidats-deja-en-lice-et-des-pretendants-436373' },
  { label: 'Le JDD', url: 'https://www.lejdd.fr/politique/presidentielle-2027-la-liste-des-40-candidats-declares-ou-pressentis-177960' },
  { label: '2027.help', url: 'https://2027.help/candidates-2027' },
  { label: 'candidatspresidentielles2027.fr', url: 'https://www.candidatspresidentielles2027.fr' },
  { label: 'Wikipedia', url: 'https://fr.wikipedia.org/wiki/Candidatures_%C3%A0_l%27%C3%A9lection_pr%C3%A9sidentielle_fran%C3%A7aise_de_2027' }
];

const SITE_CONTENT = {
  aboutText: 'Cette application présente les candidats à l\'élection présidentielle 2027 et la carte de leurs parrainages. Les données de parrainage sont de démonstration : le Conseil constitutionnel publiera les comptes officiels à partir de février 2027.',
  soutenirText: 'Pour soutenir un candidat, consultez sa fiche détaillée et cliquez sur le lien de soutien.',
  rulesText: '500 signatures d\'élus · 30 départements minimum · 50 maximum par département · Loi organique du 18 juin 1976',
  youtubeUrl: ''
};

// ============================================================
// Données en direct (chargées depuis l'API admin sur Render)
// ============================================================
let liveCandidates = null;
let liveParrainages = null;
let liveFiches = null;
let liveLinks = null;
let liveContent = null;
let usingFallback = false;

function getActiveData() { return liveParrainages || parrainagesData; }
function getActiveFiches() { return liveFiches || FICHES; }
function getActiveLinks() { return liveLinks || SITE_LINKS; }
function getActiveContent() { return liveContent || SITE_CONTENT; }
function getActiveCandidates() { return liveCandidates || CANDIDATES; }

function getCandidateStats(candidateId) {
  const data = getActiveData()[candidateId] || {};
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const deptCount = Object.keys(data).filter(k => data[k] > 0).length;
  const deptsAtMax = Object.values(data).filter(v => v >= PLAFOND_DEPARTEMENT).length;
  const status = total >= SEUIL_PARRAINAGES ? 'sécurisé' :
                 total >= SEUIL_PARRAINAGES * 0.8 ? 'quasi_sécurisé' :
                 total >= SEUIL_PARRAINAGES * 0.5 ? 'en_progression' :
                 total >= SEUIL_PARRAINAGES * 0.2 ? 'en_collecte' :
                 total > 0 ? 'en_difficulté' : 'très_en_retard';
  return { total, deptCount, deptsAtMax, status };
}

// Récupère les données réelles gérées par l'admin. En cas d'échec
// (ex: service Render endormi après inactivité, ~30-50s pour se
// réveiller), on continue avec les données de démonstration
// ci-dessus plutôt que de casser l'affichage.
async function loadSiteData() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(API_BASE + '/api/data', { signal: controller.signal, cache: 'no-store' });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    if (json.candidates) liveCandidates = json.candidates;
    if (json.parrainages) liveParrainages = json.parrainages;
    if (json.fiches) liveFiches = json.fiches;
    if (json.links) liveLinks = json.links;
    if (json.content) liveContent = json.content;
    usingFallback = false;
  } catch (err) {
    console.warn('[parrainages] API indisponible, affichage des données de démonstration:', err.message);
    usingFallback = true;
  }
}
