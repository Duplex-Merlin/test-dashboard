"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.training = void 0;
exports.training = [
    {
        input: "Bonjour",
        output: "Bonjour Monsieur XXX, encore merci de nous avoir contacté. Afin de mieux répondre à votre préoccupation, veuillez svp nous envoyer les informations suivantes:\n\n  - Votre nom complet\n  - Photo recto-verso de votre CNI\n  - Votre numéro de compte\n  - Votre numéro de téléphone",
        code: "greetings.hello",
    },
    {
        input: "CRESCO",
        output: "- Bonjour Monsieur XXXXXXX, le CRESCO sera bientôt lancé. Restez connectés sur nos pages pour ne pas le rater. \n-Très bon début de semaine.",
        code: "greetings.cresco",
    },
    {
        input: "Compte d'épargne",
        output: "Bonjour XXXXX, pour l'ouverture de votre compte d'épargne voici les pièces à fournir \n\n - 01 photocopie de la pièce d'identité en cours de validité, \n- 3 photos 4x4 couleur,\n- Le plan de localisation du domicile du client,\n- une copie de la facture d'eau ou d'électricité,\n- Le minimum de 10 000FCFA à l'ouverture de compte\n- Un document justifiant l'activité ou la profession du client.\n- UN numéro d identifiant unique.\n\nRendez-vous dans l'agence la plus proche!\nMerci de votre fidélité!",
        code: "greetings.account",
    },
    {
        input: "CONDITIONS D'OUVERTURE COMPTE PERSONNE MORALE(ETS ETABLISSEMENT)",
        output: "1 Extrait du registre de commerce et du crédit mobilier; 1 Copie de la CNI du promoteur, ainsi que des mandataires eventuels;\n1 Copie du titre de patente pour l'exercice en cours ou de l'attestation d'exonération de la contribution à la patente;\n1 Copie de la CNI en cours de validité du président du Conseil d'Administration, du Directeur Général, éventuellement des Directeurs Généraux Adjoints, des\nprincipaux actionnaires et de tous les signataires du compte 1 agrément pour chaque dirigeant pour les institutions financières (Banque et EMF) et un agrément pour l'institution elle-même;\nVersement minimum à l'ouverture: FCFA 50 000\n1 Attestation et un plan de localisation délivrés par l'administration fiscale;\n1 Copie de la carte de contribuable en cours de validité; 1 Photo couleur pour chaque signataire;\n1 Plan de localisation du domicile de chaque signataire du compte et les copies de leurs factures d'électricité ou d'eau;\nVersement minimum à l'ouverture: FCFA 25 000.",
        code: "greetings.open",
    },
    {
        input: "SARL(SOCIÉTÉ À RESPONSABILITÉ LIMITÉE)",
        output: "En plus des documents exigés pour un compte ETS,\n\n1 Copie des statuts notariés ;\n\n1 Copie CNI en cours de validité de l’associé gérant statutaire ou des cogérants selon les cas ;\n1 Copie du procès-verbal d’assemblée générale de désignation du gérant si ce dernier n’est pas nommé dans les statuts ;\n1 Acte désignant les signataires autorisés s’ils ne sont pas des dirigeants ;\nVersement minimum à l’ouverture: FCFA 250 000.\nNuméro d'identifiant unique",
        code: "greetings.limited",
    },
    {
        input: "SA (SOCIÉTÉ ANONYME)",
        output: "En plus des documents exigés pour un compte ETS,\n\n1 Procès-verbal de l’assemblée générale désignant les administrateurs et le Procès-verbal du conseil d’administration désignant le président du conseil d’administration et les dirigeants pour les SA pluripersonnelles avec conseil d’administration ;\n1 Copie des statuts notariés ;\n1 Copie de la CNI en cours de validité du président du Conseil d’Administration, du Directeur Général, éventuellement des Directeurs Généraux Adjoints, des principaux actionnaires et de tous les signataires du compte ;\n1 agrément pour chaque dirigeant pour les institutions financières (Banque et EMF) et un agrément pour l’institution elle-même ;\nVersement minimum à l’ouverture: FCFA 500 000.\nNuméro d'identifiant unique",
        code: "greetings.anonimous",
    },
    {
        input: "Association/GIC",
        output: "1 Copie du récépissé de déclaration ;\n\n1 Copie des statuts de l’association légalisés à la Préfecture ou au commissariat ;\n1 Copie originale du procès-verbal d’assemblée générale extraordinaire, portant désignation des signataires du compte, légalisé dans un commissariat et contenant la liste des membres présents à ladite assemblée ;\nLa liste nominative des membres du bureau ;\nLa liste de tous les membres de l’association ;\n1 Photo 4x4 de chaque signataire ;\n1 Plan de localisation du siège de l’association certifié si le siège existe ;\n1 Plan de localisation du domicile de chaque signataire du compte et une copie de leurs factures d’électricité ou d’eau ;\n1 Copie du procès-verbal de l’assemblée générale constitutive pour les GIC ;\n1 Copie du certificat d’inscription au registre des Coop-GIC ;\nVersement minimum à l’ouverture : FCFA 100 000.\nNuméro d'identifiant unique",
        code: "greetings.association",
    },
    {
        input: "Avantages",
        output: "Accompagnement des entreprises à travers des formules de financement adaptées ;\nFacilitation des moyens de paiement grâce à la délivrance de chéquier ;\nPossibilité d’accéder et d’effectuer des opérations sur le compte partout grâce à Internet Banking (C-Online) ;\nNotification par SMS en temps réel sur les mouvements effectués dans le compte (C-Mobile : SMS Banking).",
        code: "greetings.benefits",
    },
    {
        input: "Crédit scolaire",
        output: "MODALITES FONCTIONNAIRES\n\n- Une demande de Crédit Scolaire à retirer dans une agence CCA-Bank;\n- Une attestation de virement irrévocable AVI délivrée par son employeur. Les clients ayant déjà un crédit en cours n’en n’ont plus besoin.\n- Un bulletin de solde;\n- Une photocopie de la carte nationale d’identité;\n- Le plan de localisation de votre domicile actuel- Un billet à ordre correctement rempli parle client.\n- UN numéro d identifiant unique- Une fiche du CCA Emprunteur rempli L’attestation de présence effective au poste et le récépissé de recensement ne sont fournis que par ceux qui sollicitent le crédit pour 1ère fois. Une fois tous les documents en votre possession, nous vous prions de vous rendre dans une agence la plus proche.",
        code: "greetings.credit",
    },
    {
        input: "Recrutement / demande d'emploi",
        output: "Envoyez votre cv à l'adresse mail recrutement@cca-bank.com",
        code: "greetings.job",
    },
    {
        input: "Stage",
        output: "Le stage professionnel constitue l’un des éléments de l’action sociale du CCA Bank. Il est réservé aux jeunes étudiants, qui ont achevé leur cursus de formation et sont en quête d’une insertion professionnelle.\n\nIl vise à offrir à ces jeunes une opportunité d’immersion dans l’environnement professionnel afin d’acquérir une bonne connaissance de l’entreprise et un savoir-faire susceptibles d’améliorer leur employabilité.",
        code: "greetings.internship",
    },
    {
        input: "Constitution du dossier",
        output: "une demande dûment signée par le candidat, indiquant notamment la durée, la période et éventuellement le thème du stage ;\nle cv actualisé du candidat ;\nune demande de parrainage signée d’une personnalité et visant à témoigner de la moralité du candidat",
        code: "greetings.folder",
    },
    {
        input: "Dépôt du dossier",
        output: "Au service courrier de la direction générale sis à l’immeuble Siège à Messa ou envoyez votre demande via le formulaire à la page Ressources humaines.",
        code: "greetings.deposit",
    },
    {
        input: "Service client",
        output: "veuillez contacter notre service client au 222518080/ 679009630 ou sur WhatsApp au 698503219.\nNous sommes aussi disponible par mail à l'dresse : \nsupport@cca-bank.com.\n\nNous remercions pour votre fidélité et surtout pour votre patience.",
        code: "greetings.customer",
    },
    {
        input: "Recrutement / demande d'emploi",
        output: "Envoyez votre cv à l'adresse mail recrutement@cca-bank.com",
        code: "greetings.questions",
    },
    {
        input: "Salaire",
        output: "Bonjour M. XXXX, nous sommes conscients des difficultés que vous rencontrez pour toucher votre salaire. CCA-Bank, Facebook",
        code: "greetings.money",
    },
    {
        input: "Mobile Banking",
        output: "Bonjour M. XXXX, nous sommes conscients des  difficultés que vous rencontrez pour toucher  votre salaire. CCA-Bank, votre banque continue de travailler à développer des solutions qui faciliteront à ses clients l'accès à leurs fonds. Votre fidélité nous honore.",
        code: "greetings.banking",
    },
    {
        input: "Besoin d'agence",
        output: "Bonjour M. XXXX, nous sommes conscients qu'une agence plus proche serait un atout pour nos clients dans cette zone. CCA-Bank, continue de développer son réseau dans le but d'avoir une plus grande  proximité avec ses clients pour leur faciliter l'accès  à leurs fonds. Votre fidélité nous honore.",
        code: "greetings.need",
    },
    {
        input: "Problème Technique DAB/ PB de réseau",
        output: "- Bonjour monsieur xxxxxxxx les équipes de CCA-Bank  travaillent à garantir en continue la qualité du réseau dans nos services. Nous remercions pour votre fidélité et surtout pour votre patience.\n\n - Bonjour monsieur XXXXX nous sommes sincèrement désolés pour ce désagrément.Nous mettons tout en œuvre pour développer des solutions qui amélioreront à votre expérience . Nous vous remercions pour votre fidélité et surtout pour votre patience.\n\n- Bonjour M. XXXX, nous sommes conscients des  difficultés que vous rencontrez pour toucher  votre salaire. CCA-Bank, votre banque continue de travailler à développer des solutions qui faciliteront à ses clients l'accès à leurs fonds. Votre fidélité nous honore.",
        code: "greetings.network",
    },
    {
        input: "Demande Carte Visas/prépayée",
        output: "Bonjour Monsieur/Madame XXXXXX actuellement chez CCA-Bank nous offrons 3 types de cartes : CAURIES; EQUILIBRE & PRESTIGE. Nous travaillons à offrir à notre clientèle plus de solutions de paiement. Nous vous invitons à rester connectée sur notre page pour être la première informer sur les nouveautés de CCA-Bank. ",
        code: "greetings.card",
    },
];
