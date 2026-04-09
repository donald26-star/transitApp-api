const { Dossier } = require('../dossier/models/dossier.model');
const { Administrateur } = require('../admin/models/admin.model');
const { Invoice } = require('../invoice/models/invoice.model');

exports.getGlobalStats = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        // Construction du filtre de date
        const dateFilter = {};
        if (startDate || endDate) {
            dateFilter.createdAt = {};
            if (startDate) dateFilter.createdAt.$gte = new Date(startDate);
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999);
                dateFilter.createdAt.$lte = end;
            }
        }

        const [dossiers, admins, invoices] = await Promise.all([
            Dossier.find({ ...dateFilter, corbeille: '0' }),
            Administrateur.find({ corbeille: '0' }), // On garde tous les admins pour le décompte global
            Invoice.find({ ...dateFilter, type: 'final', corbeille: '0' })
        ]);

        const stats = {
            dossiers: {
                total: dossiers.length,
                status_open: dossiers.filter(d => d.status === '1').length,
                status_closed: dossiers.filter(d => d.status !== '1').length,
                voie_air: dossiers.filter(d => d.type_voie === 'aerienne').length,
                voie_sea: dossiers.filter(d => d.type_voie === 'maritime').length,
                
                // Valeurs Marchandises
                valeur_usd: dossiers.reduce((acc, d) => acc + (d.valeur || 0), 0),
                valeur_cfa: dossiers.reduce((acc, d) => acc + (d.valeur_cfa || 0), 0),
                
                // Finance Opérationnelle
                total_taxes: dossiers.reduce((acc, d) => acc + (d.total_taxes_dossier || 0), 0),
                total_depenses: dossiers.reduce((acc, d) => {
                    const depSum = (d.depenses || []).reduce((sum, dep) => sum + (dep.montant || 0), 0);
                    return acc + depSum;
                }, 0),

                alertes_regime: dossiers.filter(d => 
                    (d.regime_douanier?.toLowerCase().includes('d56') || d.regime_douanier?.toLowerCase().includes('d18')) &&
                    d.suivi_d56_d18?.nbre_jours_restant !== undefined && 
                    d.suivi_d56_d18.nbre_jours_restant < 10
                ).length,
                
                apurement_global: {
                    total_attendu: 0,
                    total_realise: 0
                }
            },
            invoicing: {
                total_ca: invoices.reduce((acc, inv) => acc + (inv.totals?.total_ttc || 0), 0),
                count: invoices.length
            },
            administrateurs: {
                total: admins.length,
                actifs: admins.filter(a => a.status === '1').length,
                en_attente: admins.filter(a => a.status === '0').length,
                repartition_profils: admins.reduce((acc, admin) => {
                    const profileName = admin.profile || 'Non spécifié';
                    acc[profileName] = (acc[profileName] || 0) + 1;
                    return acc;
                }, {})
            }
        };

        // Calcul apurement global
        dossiers.forEach(d => {
            if (d.suivi_d56_d18?.qte_apurement) {
                stats.dossiers.apurement_global.total_attendu += d.suivi_d56_d18.qte_apurement;
                const cleared = (d.apurements || []).reduce((acc, ap) => acc + (Number(ap.qte_apuree) || 0), 0);
                stats.dossiers.apurement_global.total_realise += cleared;
            }
        });

        res.status(200).json({
            status: true,
            message: 'Statistiques globales consolidées.',
            data: stats
        });
    } catch (error) {
        res.status(500).json({ 
            status: false,
            message: error.message,
            data: {}
        });
    }
};
