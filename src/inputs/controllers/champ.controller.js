const { Champ } = require("../models/input.model");
const { generateIdentifiant } = require("../../../utils/utils");
const mongoose = require("mongoose");

// ─── Utilitaire : résoudre l'ObjectId du menu depuis son code_menu ────────────
const resolveMenuId = async (code_menu) => {
  const menu = await mongoose
    .model("acl_menus")
    .findOne({ code_menu: code_menu, type: "dynamique" }, "_id");
  return menu ? menu._id : null;
};

// ─── ADD Champ ────────────────────────────────────────────────────────────────
exports.registerChamp = async (req, res) => {
  try {
    const {
      menu,           // code_menu (string) envoyé par le front
      visible_par,
      libelle,
      id_champ,
      type_champ,
      acceptedFileTypes,
      is_unique,
      afficher_tableau,
      type_validation,
      ordre,
      commentaire,
      obligatoire,
    } = req.body;

    // Résoudre le code_menu en ObjectId
    const menuId = await resolveMenuId(menu);
    if (!menuId) {
      return res.status(404).json({
        status: false,
        message: `Le menu "${menu}" est introuvable ou n'est pas de type 'dynamique'.`,
        data: {},
      });
    }

    // Vérifier que l'id_champ n'existe pas déjà pour ce menu
    const existeId_champ = await Champ.findOne({ id_champ, menu: menuId });
    if (existeId_champ) {
      return res.status(409).json({
        status: false,
        message: "Cet identifiant (id_champ) existe déjà pour ce menu.",
        data: {},
      });
    }

    // Vérifier que l'ordre n'existe pas déjà pour ce menu
    const existeOrdre = await Champ.findOne({ ordre, menu: menuId });
    if (existeOrdre) {
      return res.status(409).json({
        status: false,
        message: "Cet ordre d'affichage existe déjà pour ce menu.",
        data: {},
      });
    }

    const champ = new Champ({
      menu: menuId,
      visible_par,
      libelle,
      id_champ,
      type_champ,
      acceptedFileTypes,
      is_unique:        is_unique        || "non",
      afficher_tableau: afficher_tableau || "oui",
      type_validation,
      ordre,
      commentaire,
      obligatoire,
    });

    await champ.save();

    const champReponse = await champ.formatResponse();

    res.status(201).json({
      status: true,
      message: "Champ enregistré avec succès.",
      data: champReponse,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "Une erreur interne est survenue.",
      data: {},
    });
  }
};

// ─── GET ID_CHAMP suggéré depuis un libellé ───────────────────────────────────
exports.generationId = async (req, res) => {
  try {
    const { libelle } = req.body;

    if (!libelle || typeof libelle !== "string" || libelle.trim().length === 0) {
      return res.status(400).json({
        status: false,
        message: "Le champ 'libelle' est requis et doit être une chaîne non vide.",
        data: {},
      });
    }

    const identifiant = generateIdentifiant(libelle);

    return res.status(200).json({
      status: true,
      message: "Identifiant généré avec succès.",
      data: { identifiant },
    });
  } catch (error) {
    console.error("Erreur lors de la génération de l'identifiant :", error);
    return res.status(500).json({
      status: false,
      message: error.message || "Une erreur interne est survenue.",
      data: {},
    });
  }
};

// ─── GET Détail d'un champ par code_champ ─────────────────────────────────────
exports.getChampInfo = async (req, res) => {
  try {
    const { code_champ } = req.params;

    const champ = await Champ.findOne({ code_champ });
    if (!champ) {
      return res.status(404).json({
        status: false,
        message: "Champ non trouvé.",
        data: {},
      });
    }

    const champReponse = await champ.formatResponse();

    res.status(200).json({
      status: true,
      message: "Succès.",
      data: champReponse,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "Une erreur interne est survenue.",
      data: {},
    });
  }
};

// ─── GET Tous les champs d'un menu (par code_menu) ────────────────────────────
exports.getChampInfoByMenu = async (req, res) => {
  try {
    const { menu } = req.params; // code_menu (string)

    // Résoudre code_menu → ObjectId
    const menuId = await resolveMenuId(menu);
    if (!menuId) {
      return res.status(404).json({
        status: false,
        message: `Le menu "${menu}" est introuvable ou n'est pas de type 'dynamique'.`,
        data: [],
      });
    }

    // Récupérer et trier par ordre croissant
    const champs = await Champ.find({ menu: menuId }).sort({ ordre: 1 });

    if (!champs || champs.length === 0) {
      return res.status(404).json({
        status: false,
        message: "Aucun champ trouvé pour ce menu.",
        data: [],
      });
    }

    const champsReponse = await Promise.all(
      champs.map((champ) => champ.formatResponse())
    );

    return res.status(200).json({
      status: true,
      message: "Succès.",
      data: champsReponse,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message || "Une erreur interne est survenue.",
      data: [],
    });
  }
};

// ─── GET Liste complète de tous les champs ────────────────────────────────────
exports.getChampListe = async (req, res) => {
  try {
    const champs = await Champ.find().sort({ createdAt: -1 });

    const champReponse = await Promise.all(
      champs.map(async (champ, index) => {
        const formattedResponse = await champ.formatResponse();
        return { ...formattedResponse, position: index + 1 };
      })
    );

    res.status(200).json({
      status: true,
      message: "Succès.",
      data: champReponse,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "Une erreur interne est survenue.",
      data: [],
    });
  }
};

// ─── UPDATE Champ (code_champ dans les params) ────────────────────────────────
exports.updateChamp = async (req, res) => {
  try {
    const { code_champ } = req.params; // ← identifiant dans l'URL

    const {
      menu,
      visible_par,
      libelle,
      id_champ,
      type_champ,
      acceptedFileTypes,
      is_unique,
      afficher_tableau,
      type_validation,
      ordre,
      commentaire,
      obligatoire,
    } = req.body;

    // Vérifier que le champ existe
    const champ = await Champ.findOne({ code_champ });
    if (!champ) {
      return res.status(404).json({
        status: false,
        message: "Champ non trouvé.",
        data: {},
      });
    }

    // Si le menu change, résoudre le nouveau code_menu en ObjectId
    let menuId = champ.menu; // conserver l'existant par défaut
    if (menu) {
      menuId = await resolveMenuId(menu);
      if (!menuId) {
        return res.status(404).json({
          status: false,
          message: `Le menu "${menu}" est introuvable ou n'est pas de type 'dynamique'.`,
          data: {},
        });
      }
    }

    // Vérifier unicité id_champ par menu (exclure le document en cours)
    if (id_champ) {
      const existeId_champ = await Champ.findOne({
        id_champ,
        menu: menuId,
        code_champ: { $ne: code_champ },
      });
      if (existeId_champ) {
        return res.status(409).json({
          status: false,
          message: "Cet identifiant (id_champ) existe déjà pour ce menu.",
          data: {},
        });
      }
    }

    // Vérifier unicité ordre par menu (exclure le document en cours)
    if (ordre) {
      const existeOrdre = await Champ.findOne({
        ordre,
        menu: menuId,
        code_champ: { $ne: code_champ },
      });
      if (existeOrdre) {
        return res.status(409).json({
          status: false,
          message: "Cet ordre d'affichage existe déjà pour ce menu.",
          data: {},
        });
      }
    }

    // Appliquer les modifications
    champ.menu             = menuId;
    if (visible_par      !== undefined) champ.visible_par      = visible_par;
    if (libelle          !== undefined) champ.libelle          = libelle;
    if (id_champ         !== undefined) champ.id_champ         = id_champ;
    if (type_champ       !== undefined) champ.type_champ       = type_champ;
    if (acceptedFileTypes!== undefined) champ.acceptedFileTypes= acceptedFileTypes;
    if (is_unique        !== undefined) champ.is_unique        = is_unique;
    if (afficher_tableau !== undefined) champ.afficher_tableau = afficher_tableau;
    if (type_validation  !== undefined) champ.type_validation  = type_validation;
    if (ordre            !== undefined) champ.ordre            = ordre;
    if (commentaire      !== undefined) champ.commentaire      = commentaire;
    if (obligatoire      !== undefined) champ.obligatoire      = obligatoire;

    await champ.save();

    const champReponse = await champ.formatResponse();

    res.status(200).json({
      status: true,
      message: "Champ mis à jour avec succès.",
      data: champReponse,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "Une erreur interne est survenue.",
      data: {},
    });
  }
};

// ─── DELETE Champ ─────────────────────────────────────────────────────────────
exports.deleteChamp = async (req, res) => {
  try {
    const { code_champ } = req.params;

    const champ = await Champ.findOne({ code_champ });
    if (!champ) {
      return res.status(404).json({
        status: false,
        message: "Champ non trouvé.",
        data: {},
      });
    }

    await champ.deleteOne();

    res.status(200).json({
      status: true,
      message: "Champ supprimé avec succès.",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "Une erreur interne est survenue.",
      data: {},
    });
  }
};
