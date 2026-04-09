const { airInvoiceTemplate } = require('../templates/air-invoice');
const { maritimeInvoiceTemplate } = require('../templates/maritime-invoice');

/**
 * Service pour la génération des factures (HTML)
 */
class InvoiceGenerator {
    /**
     * Génère le HTML d'une facture en fonction de son type et du mode de transport
     * @param {Object} invoice - L'objet facture (DB)
     * @returns {string} - Le HTML généré
     */
    static generateHTML(invoice, config = null) {
        if (!invoice) throw new Error("Facture non fournie");

        const typeVoie = invoice.dossierInfo?.type_voie?.toLowerCase();
        
        if (typeVoie === 'aerienne' || typeVoie === 'air') {
            return airInvoiceTemplate(invoice, config);
        } else if (typeVoie === 'maritime' || typeVoie === 'mer') {
            return maritimeInvoiceTemplate(invoice, config);
        } else {
            // Par défaut on utilise le template Air
            return airInvoiceTemplate(invoice, config);
        }
    }

    /**
     * Détermine si une facture est proforma
     * @param {Object} invoice 
     * @returns {boolean}
     */
    static isProforma(invoice) {
        return invoice.type === 'proforma';
    }

    /**
     * Retourne le libellé du type de facture
     * @param {Object} invoice 
     * @returns {string}
     */
    static getInvoiceLabel(invoice) {
        return this.isProforma(invoice) ? 'FACTURATION PROFORMA' : 'FACTURATION DÉFINITIVE';
    }
}

module.exports = InvoiceGenerator;
