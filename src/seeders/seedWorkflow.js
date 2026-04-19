const mongoose = require('mongoose');
const { Profile } = require('../profile/models/profile.model');
const { EtatDossier } = require('../dossier/models/etat_dossier.model');

const defaultRoles = [
    { code_profile: 'SUPER_ADMIN', designation: 'Super Administrateur', commentaire: 'Accès total sans limite' },
    { code_profile: 'OUVREUR', designation: 'Ouvreur de dossier', commentaire: 'Reçoit le client et crée le dossier' },
    { code_profile: 'CHEF_TRANSIT', designation: 'Chef de transit', commentaire: 'Supervise et valide les dossiers' },
    { code_profile: 'DECLARANT', designation: 'Déclarant en douane', commentaire: 'Établit la déclaration en détail' },
    { code_profile: 'ASSISTANT_DECLARANT', designation: 'Assistant déclarant', commentaire: 'Aide le déclarant' },
    { code_profile: 'OPERATEUR_SAISIE', designation: 'Opérateur de saisie', commentaire: 'Enregistre les données SYDAM/GUCE' },
    { code_profile: 'PASSEUR_DOUANE', designation: 'Passeur en douane', commentaire: 'Introduit le dossier en douane' },
    { code_profile: 'FACTURATION', designation: 'Service facturation', commentaire: 'Édite les factures des débours' },
    { code_profile: 'LIVREUR', designation: 'Livreur', commentaire: 'Livre les marchandises' }
];

const defaultStatuses = [
    { code: 'OUVERT', label: 'Ouvert', couleur: '#10B981', ordre: 1, roles_autorises: ['OUVREUR', 'CHEF_TRANSIT', 'SUPER_ADMIN'], role_suivant: 'CHEF_TRANSIT' },
    { code: 'AFFECTE_DECLARANT', label: 'Affecté au Déclarant', couleur: '#3B82F6', ordre: 2, roles_autorises: ['CHEF_TRANSIT', 'DECLARANT', 'SUPER_ADMIN'], role_suivant: 'DECLARANT' },
    { code: 'AFFECTE_SAISIE', label: 'En Saisie', couleur: '#8B5CF6', ordre: 3, roles_autorises: ['CHEF_TRANSIT', 'OPERATEUR_SAISIE', 'SUPER_ADMIN'], role_suivant: 'OPERATEUR_SAISIE' },
    { code: 'EN_DOUANE', label: 'En Douane', couleur: '#F59E0B', ordre: 4, roles_autorises: ['CHEF_TRANSIT', 'PASSEUR_DOUANE', 'SUPER_ADMIN'], role_suivant: 'PASSEUR_DOUANE' },
    { code: 'A_FACTURER', label: 'En Facturation', couleur: '#EC4899', ordre: 5, roles_autorises: ['CHEF_TRANSIT', 'FACTURATION', 'SUPER_ADMIN'], role_suivant: 'FACTURATION' },
    { code: 'A_LIVRER', label: 'En Livraison', couleur: '#06B6D4', ordre: 6, roles_autorises: ['CHEF_TRANSIT', 'LIVREUR', 'SUPER_ADMIN'], role_suivant: 'LIVREUR' },
    { code: 'TERMINE', label: 'Terminé', couleur: '#6B7280', ordre: 7, roles_autorises: ['*'], role_suivant: null }
];

async function seedWorkflow() {
    try {
        console.log('--- Seeding Roles and Workflow Statuses ---');

        // Seed Roles
        for (const role of defaultRoles) {
            const existingRole = await Profile.findOne({ designation: role.designation.toLowerCase() });
            if (!existingRole) {
                await Profile.create({
                    designation: role.designation.toLowerCase(),
                    code_profile: role.code_profile,
                    commentaire: role.commentaire,
                    visibilite: ['*'],
                    bloc_visible: ['*']
                });
                console.log(`✅ Role ${role.designation} créé`);
            } else {
                // Update code_profile if missing
                if (existingRole.code_profile !== role.code_profile) {
                    existingRole.code_profile = role.code_profile;
                    await existingRole.save();
                }
                console.log(`ℹ️ Role ${role.designation} existe déjà`);
            }
        }

        // Seed Statuses
        for (const status of defaultStatuses) {
            const existingStatus = await EtatDossier.findOne({ code: status.code });
            if (!existingStatus) {
                await EtatDossier.create(status);
                console.log(`✅ Statut ${status.label} créé`);
            } else {
                console.log(`ℹ️ Statut ${status.label} existe déjà`);
            }
        }

        console.log('✅ Fin du seeding workflow');
    } catch (error) {
        console.error('❌ Erreur lors du seeding workflow:', error);
    }
}

module.exports = seedWorkflow;
