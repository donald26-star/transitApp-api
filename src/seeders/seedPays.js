const mongoose = require('mongoose');
const { Pays } = require('../pays/models/pays.model');
const { DB_MONGO_HOST, MONGO_DATABASE, DB_MONGO_PORT, DB_MONGO_USER, DB_MONGO_PASSWORD } = require('../config/connection');

const countries = [
    {
        "code": "AF",
        "nom": "Afghanistan",
        "capitale": "Kabul",
        "continent": "Asia",
        "devise": "AFN",
        "fuseau_horaire": "UTC+04:30"
    },
    {
        "code": "AX",
        "nom": "Åland Islands",
        "capitale": "Mariehamn",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "AL",
        "nom": "Albania",
        "capitale": "Tirana",
        "continent": "Europe",
        "devise": "ALL",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "DZ",
        "nom": "Algeria",
        "capitale": "Algiers",
        "continent": "Africa",
        "devise": "DZD",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "AS",
        "nom": "American Samoa",
        "capitale": "Pago Pago",
        "continent": "Oceania",
        "devise": "USD",
        "fuseau_horaire": "UTC-11:00"
    },
    {
        "code": "AD",
        "nom": "Andorra",
        "capitale": "Andorra la Vella",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "AO",
        "nom": "Angola",
        "capitale": "Luanda",
        "continent": "Africa",
        "devise": "AOA",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "AI",
        "nom": "Anguilla",
        "capitale": "The Valley",
        "continent": "Americas",
        "devise": "XCD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "AQ",
        "nom": "Antarctica",
        "capitale": "",
        "continent": "Antarctic",
        "devise": "",
        "fuseau_horaire": "UTC-03:00"
    },
    {
        "code": "AG",
        "nom": "Antigua and Barbuda",
        "capitale": "Saint John's",
        "continent": "Americas",
        "devise": "XCD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "AR",
        "nom": "Argentina",
        "capitale": "Buenos Aires",
        "continent": "Americas",
        "devise": "ARS",
        "fuseau_horaire": "UTC-03:00"
    },
    {
        "code": "AM",
        "nom": "Armenia",
        "capitale": "Yerevan",
        "continent": "Asia",
        "devise": "AMD",
        "fuseau_horaire": "UTC+04:00"
    },
    {
        "code": "AW",
        "nom": "Aruba",
        "capitale": "Oranjestad",
        "continent": "Americas",
        "devise": "AWG",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "AU",
        "nom": "Australia",
        "capitale": "Canberra",
        "continent": "Oceania",
        "devise": "AUD",
        "fuseau_horaire": "UTC+05:00"
    },
    {
        "code": "AT",
        "nom": "Austria",
        "capitale": "Vienna",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "AZ",
        "nom": "Azerbaijan",
        "capitale": "Baku",
        "continent": "Asia",
        "devise": "AZN",
        "fuseau_horaire": "UTC+04:00"
    },
    {
        "code": "BS",
        "nom": "Bahamas",
        "capitale": "Nassau",
        "continent": "Americas",
        "devise": "BSD",
        "fuseau_horaire": "UTC-05:00"
    },
    {
        "code": "BH",
        "nom": "Bahrain",
        "capitale": "Manama",
        "continent": "Asia",
        "devise": "BHD",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "BD",
        "nom": "Bangladesh",
        "capitale": "Dhaka",
        "continent": "Asia",
        "devise": "BDT",
        "fuseau_horaire": "UTC+06:00"
    },
    {
        "code": "BB",
        "nom": "Barbados",
        "capitale": "Bridgetown",
        "continent": "Americas",
        "devise": "BBD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "BY",
        "nom": "Belarus",
        "capitale": "Minsk",
        "continent": "Europe",
        "devise": "BYN",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "BE",
        "nom": "Belgium",
        "capitale": "Brussels",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "BZ",
        "nom": "Belize",
        "capitale": "Belmopan",
        "continent": "Americas",
        "devise": "BZD",
        "fuseau_horaire": "UTC-06:00"
    },
    {
        "code": "BJ",
        "nom": "Benin",
        "capitale": "Porto-Novo",
        "continent": "Africa",
        "devise": "XOF",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "BM",
        "nom": "Bermuda",
        "capitale": "Hamilton",
        "continent": "Americas",
        "devise": "BMD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "BT",
        "nom": "Bhutan",
        "capitale": "Thimphu",
        "continent": "Asia",
        "devise": "BTN",
        "fuseau_horaire": "UTC+06:00"
    },
    {
        "code": "BO",
        "nom": "Bolivia",
        "capitale": "Sucre",
        "continent": "Americas",
        "devise": "BOB",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "BA",
        "nom": "Bosnia and Herzegovina",
        "capitale": "Sarajevo",
        "continent": "Europe",
        "devise": "BAM",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "BW",
        "nom": "Botswana",
        "capitale": "Gaborone",
        "continent": "Africa",
        "devise": "BWP",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "BV",
        "nom": "Bouvet Island",
        "capitale": "",
        "continent": "Antarctic",
        "devise": "",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "BR",
        "nom": "Brazil",
        "capitale": "Brasília",
        "continent": "Americas",
        "devise": "BRL",
        "fuseau_horaire": "UTC-05:00"
    },
    {
        "code": "IO",
        "nom": "British Indian Ocean Territory",
        "capitale": "Diego Garcia",
        "continent": "Africa",
        "devise": "USD",
        "fuseau_horaire": "UTC+06:00"
    },
    {
        "code": "VG",
        "nom": "British Virgin Islands",
        "capitale": "Road Town",
        "continent": "Americas",
        "devise": "USD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "BN",
        "nom": "Brunei",
        "capitale": "Bandar Seri Begawan",
        "continent": "Asia",
        "devise": "BND",
        "fuseau_horaire": "UTC+08:00"
    },
    {
        "code": "BG",
        "nom": "Bulgaria",
        "capitale": "Sofia",
        "continent": "Europe",
        "devise": "BGN",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "BF",
        "nom": "Burkina Faso",
        "capitale": "Ouagadougou",
        "continent": "Africa",
        "devise": "XOF",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "BI",
        "nom": "Burundi",
        "capitale": "Gitega",
        "continent": "Africa",
        "devise": "BIF",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "KH",
        "nom": "Cambodia",
        "capitale": "Phnom Penh",
        "continent": "Asia",
        "devise": "KHR",
        "fuseau_horaire": "UTC+07:00"
    },
    {
        "code": "CM",
        "nom": "Cameroon",
        "capitale": "Yaoundé",
        "continent": "Africa",
        "devise": "XAF",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "CA",
        "nom": "Canada",
        "capitale": "Ottawa",
        "continent": "Americas",
        "devise": "CAD",
        "fuseau_horaire": "UTC-08:00"
    },
    {
        "code": "CV",
        "nom": "Cape Verde",
        "capitale": "Praia",
        "continent": "Africa",
        "devise": "CVE",
        "fuseau_horaire": "UTC-01:00"
    },
    {
        "code": "BQ",
        "nom": "Caribbean Netherlands",
        "capitale": "Kralendijk",
        "continent": "Americas",
        "devise": "USD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "KY",
        "nom": "Cayman Islands",
        "capitale": "George Town",
        "continent": "Americas",
        "devise": "KYD",
        "fuseau_horaire": "UTC-05:00"
    },
    {
        "code": "CF",
        "nom": "Central African Republic",
        "capitale": "Bangui",
        "continent": "Africa",
        "devise": "XAF",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "TD",
        "nom": "Chad",
        "capitale": "N'Djamena",
        "continent": "Africa",
        "devise": "XAF",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "CL",
        "nom": "Chile",
        "capitale": "Santiago",
        "continent": "Americas",
        "devise": "CLP",
        "fuseau_horaire": "UTC-06:00"
    },
    {
        "code": "CN",
        "nom": "China",
        "capitale": "Beijing",
        "continent": "Asia",
        "devise": "CNY",
        "fuseau_horaire": "UTC+08:00"
    },
    {
        "code": "CX",
        "nom": "Christmas Island",
        "capitale": "Flying Fish Cove",
        "continent": "Oceania",
        "devise": "AUD",
        "fuseau_horaire": "UTC+07:00"
    },
    {
        "code": "CC",
        "nom": "Cocos (Keeling) Islands",
        "capitale": "West Island",
        "continent": "Oceania",
        "devise": "AUD",
        "fuseau_horaire": "UTC+06:30"
    },
    {
        "code": "CO",
        "nom": "Colombia",
        "capitale": "Bogotá",
        "continent": "Americas",
        "devise": "COP",
        "fuseau_horaire": "UTC-05:00"
    },
    {
        "code": "KM",
        "nom": "Comoros",
        "capitale": "Moroni",
        "continent": "Africa",
        "devise": "KMF",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "CK",
        "nom": "Cook Islands",
        "capitale": "Avarua",
        "continent": "Oceania",
        "devise": "CKD",
        "fuseau_horaire": "UTC-10:00"
    },
    {
        "code": "CR",
        "nom": "Costa Rica",
        "capitale": "San José",
        "continent": "Americas",
        "devise": "CRC",
        "fuseau_horaire": "UTC-06:00"
    },
    {
        "code": "HR",
        "nom": "Croatia",
        "capitale": "Zagreb",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "CU",
        "nom": "Cuba",
        "capitale": "Havana",
        "continent": "Americas",
        "devise": "CUC",
        "fuseau_horaire": "UTC-05:00"
    },
    {
        "code": "CW",
        "nom": "Curaçao",
        "capitale": "Willemstad",
        "continent": "Americas",
        "devise": "ANG",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "CY",
        "nom": "Cyprus",
        "capitale": "Nicosia",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "CZ",
        "nom": "Czechia",
        "capitale": "Prague",
        "continent": "Europe",
        "devise": "CZK",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "DK",
        "nom": "Denmark",
        "capitale": "Copenhagen",
        "continent": "Europe",
        "devise": "DKK",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "DJ",
        "nom": "Djibouti",
        "capitale": "Djibouti",
        "continent": "Africa",
        "devise": "DJF",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "DM",
        "nom": "Dominica",
        "capitale": "Roseau",
        "continent": "Americas",
        "devise": "XCD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "DO",
        "nom": "Dominican Republic",
        "capitale": "Santo Domingo",
        "continent": "Americas",
        "devise": "DOP",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "CD",
        "nom": "DR Congo",
        "capitale": "Kinshasa",
        "continent": "Africa",
        "devise": "CDF",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "EC",
        "nom": "Ecuador",
        "capitale": "Quito",
        "continent": "Americas",
        "devise": "USD",
        "fuseau_horaire": "UTC-06:00"
    },
    {
        "code": "EG",
        "nom": "Egypt",
        "capitale": "Cairo",
        "continent": "Africa",
        "devise": "EGP",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "SV",
        "nom": "El Salvador",
        "capitale": "San Salvador",
        "continent": "Americas",
        "devise": "USD",
        "fuseau_horaire": "UTC-06:00"
    },
    {
        "code": "GQ",
        "nom": "Equatorial Guinea",
        "capitale": "Ciudad de la Paz",
        "continent": "Africa",
        "devise": "XAF",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "ER",
        "nom": "Eritrea",
        "capitale": "Asmara",
        "continent": "Africa",
        "devise": "ERN",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "EE",
        "nom": "Estonia",
        "capitale": "Tallinn",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "SZ",
        "nom": "Eswatini",
        "capitale": "Mbabane",
        "continent": "Africa",
        "devise": "SZL",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "ET",
        "nom": "Ethiopia",
        "capitale": "Addis Ababa",
        "continent": "Africa",
        "devise": "ETB",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "FK",
        "nom": "Falkland Islands",
        "capitale": "Stanley",
        "continent": "Americas",
        "devise": "FKP",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "FO",
        "nom": "Faroe Islands",
        "capitale": "Tórshavn",
        "continent": "Europe",
        "devise": "DKK",
        "fuseau_horaire": "UTC+00:00"
    },
    {
        "code": "FJ",
        "nom": "Fiji",
        "capitale": "Suva",
        "continent": "Oceania",
        "devise": "FJD",
        "fuseau_horaire": "UTC+12:00"
    },
    {
        "code": "FI",
        "nom": "Finland",
        "capitale": "Helsinki",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "FR",
        "nom": "France",
        "capitale": "Paris",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC-10:00"
    },
    {
        "code": "GF",
        "nom": "French Guiana",
        "capitale": "Cayenne",
        "continent": "Americas",
        "devise": "EUR",
        "fuseau_horaire": "UTC-03:00"
    },
    {
        "code": "PF",
        "nom": "French Polynesia",
        "capitale": "Papeetē",
        "continent": "Oceania",
        "devise": "XPF",
        "fuseau_horaire": "UTC-10:00"
    },
    {
        "code": "TF",
        "nom": "French Southern and Antarctic Lands",
        "capitale": "Port-aux-Français",
        "continent": "Antarctic",
        "devise": "EUR",
        "fuseau_horaire": "UTC+05:00"
    },
    {
        "code": "GA",
        "nom": "Gabon",
        "capitale": "Libreville",
        "continent": "Africa",
        "devise": "XAF",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "GM",
        "nom": "Gambia",
        "capitale": "Banjul",
        "continent": "Africa",
        "devise": "GMD",
        "fuseau_horaire": "UTC+00:00"
    },
    {
        "code": "GE",
        "nom": "Georgia",
        "capitale": "Tbilisi",
        "continent": "Asia",
        "devise": "GEL",
        "fuseau_horaire": "UTC+04:00"
    },
    {
        "code": "DE",
        "nom": "Germany",
        "capitale": "Berlin",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "GH",
        "nom": "Ghana",
        "capitale": "Accra",
        "continent": "Africa",
        "devise": "GHS",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "GI",
        "nom": "Gibraltar",
        "capitale": "Gibraltar",
        "continent": "Europe",
        "devise": "GIP",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "GR",
        "nom": "Greece",
        "capitale": "Athens",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "GL",
        "nom": "Greenland",
        "capitale": "Nuuk",
        "continent": "Americas",
        "devise": "DKK",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "GD",
        "nom": "Grenada",
        "capitale": "St. George's",
        "continent": "Americas",
        "devise": "XCD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "GP",
        "nom": "Guadeloupe",
        "capitale": "Basse-Terre",
        "continent": "Americas",
        "devise": "EUR",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "GU",
        "nom": "Guam",
        "capitale": "Hagåtña",
        "continent": "Oceania",
        "devise": "USD",
        "fuseau_horaire": "UTC+10:00"
    },
    {
        "code": "GT",
        "nom": "Guatemala",
        "capitale": "Guatemala City",
        "continent": "Americas",
        "devise": "GTQ",
        "fuseau_horaire": "UTC-06:00"
    },
    {
        "code": "GG",
        "nom": "Guernsey",
        "capitale": "St. Peter Port",
        "continent": "Europe",
        "devise": "GBP",
        "fuseau_horaire": "UTC+00:00"
    },
    {
        "code": "GN",
        "nom": "Guinea",
        "capitale": "Conakry",
        "continent": "Africa",
        "devise": "GNF",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "GW",
        "nom": "Guinea-Bissau",
        "capitale": "Bissau",
        "continent": "Africa",
        "devise": "XOF",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "GY",
        "nom": "Guyana",
        "capitale": "Georgetown",
        "continent": "Americas",
        "devise": "GYD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "HT",
        "nom": "Haiti",
        "capitale": "Port-au-Prince",
        "continent": "Americas",
        "devise": "HTG",
        "fuseau_horaire": "UTC-05:00"
    },
    {
        "code": "HM",
        "nom": "Heard Island and McDonald Islands",
        "capitale": "",
        "continent": "Antarctic",
        "devise": "",
        "fuseau_horaire": "UTC+05:00"
    },
    {
        "code": "HN",
        "nom": "Honduras",
        "capitale": "Tegucigalpa",
        "continent": "Americas",
        "devise": "HNL",
        "fuseau_horaire": "UTC-06:00"
    },
    {
        "code": "HK",
        "nom": "Hong Kong",
        "capitale": "City of Victoria",
        "continent": "Asia",
        "devise": "HKD",
        "fuseau_horaire": "UTC+08:00"
    },
    {
        "code": "HU",
        "nom": "Hungary",
        "capitale": "Budapest",
        "continent": "Europe",
        "devise": "HUF",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "IS",
        "nom": "Iceland",
        "capitale": "Reykjavik",
        "continent": "Europe",
        "devise": "ISK",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "IN",
        "nom": "India",
        "capitale": "New Delhi",
        "continent": "Asia",
        "devise": "INR",
        "fuseau_horaire": "UTC+05:30"
    },
    {
        "code": "ID",
        "nom": "Indonesia",
        "capitale": "Jakarta",
        "continent": "Asia",
        "devise": "IDR",
        "fuseau_horaire": "UTC+07:00"
    },
    {
        "code": "IR",
        "nom": "Iran",
        "capitale": "Tehran",
        "continent": "Asia",
        "devise": "IRR",
        "fuseau_horaire": "UTC+03:30"
    },
    {
        "code": "IQ",
        "nom": "Iraq",
        "capitale": "Baghdad",
        "continent": "Asia",
        "devise": "IQD",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "IE",
        "nom": "Ireland",
        "capitale": "Dublin",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "IM",
        "nom": "Isle of Man",
        "capitale": "Douglas",
        "continent": "Europe",
        "devise": "GBP",
        "fuseau_horaire": "UTC+00:00"
    },
    {
        "code": "IL",
        "nom": "Israel",
        "capitale": "Jerusalem",
        "continent": "Asia",
        "devise": "ILS",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "IT",
        "nom": "Italy",
        "capitale": "Rome",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "CI",
        "nom": "Ivory Coast",
        "capitale": "Yamoussoukro",
        "continent": "Africa",
        "devise": "XOF",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "JM",
        "nom": "Jamaica",
        "capitale": "Kingston",
        "continent": "Americas",
        "devise": "JMD",
        "fuseau_horaire": "UTC-05:00"
    },
    {
        "code": "JP",
        "nom": "Japan",
        "capitale": "Tokyo",
        "continent": "Asia",
        "devise": "JPY",
        "fuseau_horaire": "UTC+09:00"
    },
    {
        "code": "JE",
        "nom": "Jersey",
        "capitale": "Saint Helier",
        "continent": "Europe",
        "devise": "GBP",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "JO",
        "nom": "Jordan",
        "capitale": "Amman",
        "continent": "Asia",
        "devise": "JOD",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "KZ",
        "nom": "Kazakhstan",
        "capitale": "Astana",
        "continent": "Asia",
        "devise": "KZT",
        "fuseau_horaire": "UTC+05:00"
    },
    {
        "code": "KE",
        "nom": "Kenya",
        "capitale": "Nairobi",
        "continent": "Africa",
        "devise": "KES",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "KI",
        "nom": "Kiribati",
        "capitale": "South Tarawa",
        "continent": "Oceania",
        "devise": "AUD",
        "fuseau_horaire": "UTC+12:00"
    },
    {
        "code": "XK",
        "nom": "Kosovo",
        "capitale": "Pristina",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "KW",
        "nom": "Kuwait",
        "capitale": "Kuwait City",
        "continent": "Asia",
        "devise": "KWD",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "KG",
        "nom": "Kyrgyzstan",
        "capitale": "Bishkek",
        "continent": "Asia",
        "devise": "KGS",
        "fuseau_horaire": "UTC+06:00"
    },
    {
        "code": "LA",
        "nom": "Laos",
        "capitale": "Vientiane",
        "continent": "Asia",
        "devise": "LAK",
        "fuseau_horaire": "UTC+07:00"
    },
    {
        "code": "LV",
        "nom": "Latvia",
        "capitale": "Riga",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "LB",
        "nom": "Lebanon",
        "capitale": "Beirut",
        "continent": "Asia",
        "devise": "LBP",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "LS",
        "nom": "Lesotho",
        "capitale": "Maseru",
        "continent": "Africa",
        "devise": "LSL",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "LR",
        "nom": "Liberia",
        "capitale": "Monrovia",
        "continent": "Africa",
        "devise": "LRD",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "LY",
        "nom": "Libya",
        "capitale": "Tripoli",
        "continent": "Africa",
        "devise": "LYD",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "LI",
        "nom": "Liechtenstein",
        "capitale": "Vaduz",
        "continent": "Europe",
        "devise": "CHF",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "LT",
        "nom": "Lithuania",
        "capitale": "Vilnius",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "LU",
        "nom": "Luxembourg",
        "capitale": "Luxembourg",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "MO",
        "nom": "Macau",
        "capitale": "",
        "continent": "Asia",
        "devise": "MOP",
        "fuseau_horaire": "UTC+08:00"
    },
    {
        "code": "MG",
        "nom": "Madagascar",
        "capitale": "Antananarivo",
        "continent": "Africa",
        "devise": "MGA",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "MW",
        "nom": "Malawi",
        "capitale": "Lilongwe",
        "continent": "Africa",
        "devise": "MWK",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "MY",
        "nom": "Malaysia",
        "capitale": "Kuala Lumpur",
        "continent": "Asia",
        "devise": "MYR",
        "fuseau_horaire": "UTC+08:00"
    },
    {
        "code": "MV",
        "nom": "Maldives",
        "capitale": "Malé",
        "continent": "Asia",
        "devise": "MVR",
        "fuseau_horaire": "UTC+05:00"
    },
    {
        "code": "ML",
        "nom": "Mali",
        "capitale": "Bamako",
        "continent": "Africa",
        "devise": "XOF",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "MT",
        "nom": "Malta",
        "capitale": "Valletta",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "MH",
        "nom": "Marshall Islands",
        "capitale": "Majuro",
        "continent": "Oceania",
        "devise": "USD",
        "fuseau_horaire": "UTC+12:00"
    },
    {
        "code": "MQ",
        "nom": "Martinique",
        "capitale": "Fort-de-France",
        "continent": "Americas",
        "devise": "EUR",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "MR",
        "nom": "Mauritania",
        "capitale": "Nouakchott",
        "continent": "Africa",
        "devise": "MRU",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "MU",
        "nom": "Mauritius",
        "capitale": "Port Louis",
        "continent": "Africa",
        "devise": "MUR",
        "fuseau_horaire": "UTC+04:00"
    },
    {
        "code": "YT",
        "nom": "Mayotte",
        "capitale": "Mamoudzou",
        "continent": "Africa",
        "devise": "EUR",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "MX",
        "nom": "Mexico",
        "capitale": "Mexico City",
        "continent": "Americas",
        "devise": "MXN",
        "fuseau_horaire": "UTC-08:00"
    },
    {
        "code": "FM",
        "nom": "Micronesia",
        "capitale": "Palikir",
        "continent": "Oceania",
        "devise": "USD",
        "fuseau_horaire": "UTC+10:00"
    },
    {
        "code": "MD",
        "nom": "Moldova",
        "capitale": "Chișinău",
        "continent": "Europe",
        "devise": "MDL",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "MC",
        "nom": "Monaco",
        "capitale": "Monaco",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "MN",
        "nom": "Mongolia",
        "capitale": "Ulan Bator",
        "continent": "Asia",
        "devise": "MNT",
        "fuseau_horaire": "UTC+07:00"
    },
    {
        "code": "ME",
        "nom": "Montenegro",
        "capitale": "Podgorica",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "MS",
        "nom": "Montserrat",
        "capitale": "Plymouth",
        "continent": "Americas",
        "devise": "XCD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "MA",
        "nom": "Morocco",
        "capitale": "Rabat",
        "continent": "Africa",
        "devise": "MAD",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "MZ",
        "nom": "Mozambique",
        "capitale": "Maputo",
        "continent": "Africa",
        "devise": "MZN",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "MM",
        "nom": "Myanmar",
        "capitale": "Naypyidaw",
        "continent": "Asia",
        "devise": "MMK",
        "fuseau_horaire": "UTC+06:30"
    },
    {
        "code": "NA",
        "nom": "Namibia",
        "capitale": "Windhoek",
        "continent": "Africa",
        "devise": "NAD",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "NR",
        "nom": "Nauru",
        "capitale": "Yaren",
        "continent": "Oceania",
        "devise": "AUD",
        "fuseau_horaire": "UTC+12:00"
    },
    {
        "code": "NP",
        "nom": "Nepal",
        "capitale": "Kathmandu",
        "continent": "Asia",
        "devise": "NPR",
        "fuseau_horaire": "UTC+05:45"
    },
    {
        "code": "NL",
        "nom": "Netherlands",
        "capitale": "Amsterdam",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "NC",
        "nom": "New Caledonia",
        "capitale": "Nouméa",
        "continent": "Oceania",
        "devise": "XPF",
        "fuseau_horaire": "UTC+11:00"
    },
    {
        "code": "NZ",
        "nom": "New Zealand",
        "capitale": "Wellington",
        "continent": "Oceania",
        "devise": "NZD",
        "fuseau_horaire": "UTC-11:00"
    },
    {
        "code": "NI",
        "nom": "Nicaragua",
        "capitale": "Managua",
        "continent": "Americas",
        "devise": "NIO",
        "fuseau_horaire": "UTC-06:00"
    },
    {
        "code": "NE",
        "nom": "Niger",
        "capitale": "Niamey",
        "continent": "Africa",
        "devise": "XOF",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "NG",
        "nom": "Nigeria",
        "capitale": "Abuja",
        "continent": "Africa",
        "devise": "NGN",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "NU",
        "nom": "Niue",
        "capitale": "Alofi",
        "continent": "Oceania",
        "devise": "NZD",
        "fuseau_horaire": "UTC-11:00"
    },
    {
        "code": "NF",
        "nom": "Norfolk Island",
        "capitale": "Kingston",
        "continent": "Oceania",
        "devise": "AUD",
        "fuseau_horaire": "UTC+11:30"
    },
    {
        "code": "KP",
        "nom": "North Korea",
        "capitale": "Pyongyang",
        "continent": "Asia",
        "devise": "KPW",
        "fuseau_horaire": "UTC+09:00"
    },
    {
        "code": "MK",
        "nom": "North Macedonia",
        "capitale": "Skopje",
        "continent": "Europe",
        "devise": "MKD",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "MP",
        "nom": "Northern Mariana Islands",
        "capitale": "Saipan",
        "continent": "Oceania",
        "devise": "USD",
        "fuseau_horaire": "UTC+10:00"
    },
    {
        "code": "NO",
        "nom": "Norway",
        "capitale": "Oslo",
        "continent": "Europe",
        "devise": "NOK",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "OM",
        "nom": "Oman",
        "capitale": "Muscat",
        "continent": "Asia",
        "devise": "OMR",
        "fuseau_horaire": "UTC+04:00"
    },
    {
        "code": "PK",
        "nom": "Pakistan",
        "capitale": "Islamabad",
        "continent": "Asia",
        "devise": "PKR",
        "fuseau_horaire": "UTC+05:00"
    },
    {
        "code": "PW",
        "nom": "Palau",
        "capitale": "Ngerulmud",
        "continent": "Oceania",
        "devise": "USD",
        "fuseau_horaire": "UTC+09:00"
    },
    {
        "code": "PS",
        "nom": "Palestine",
        "capitale": "Ramallah",
        "continent": "Asia",
        "devise": "EGP",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "PA",
        "nom": "Panama",
        "capitale": "Panama City",
        "continent": "Americas",
        "devise": "PAB",
        "fuseau_horaire": "UTC-05:00"
    },
    {
        "code": "PG",
        "nom": "Papua New Guinea",
        "capitale": "Port Moresby",
        "continent": "Oceania",
        "devise": "PGK",
        "fuseau_horaire": "UTC+10:00"
    },
    {
        "code": "PY",
        "nom": "Paraguay",
        "capitale": "Asunción",
        "continent": "Americas",
        "devise": "PYG",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "PE",
        "nom": "Peru",
        "capitale": "Lima",
        "continent": "Americas",
        "devise": "PEN",
        "fuseau_horaire": "UTC-05:00"
    },
    {
        "code": "PH",
        "nom": "Philippines",
        "capitale": "Manila",
        "continent": "Asia",
        "devise": "PHP",
        "fuseau_horaire": "UTC+08:00"
    },
    {
        "code": "PN",
        "nom": "Pitcairn Islands",
        "capitale": "Adamstown",
        "continent": "Oceania",
        "devise": "NZD",
        "fuseau_horaire": "UTC-08:00"
    },
    {
        "code": "PL",
        "nom": "Poland",
        "capitale": "Warsaw",
        "continent": "Europe",
        "devise": "PLN",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "PT",
        "nom": "Portugal",
        "capitale": "Lisbon",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC-01:00"
    },
    {
        "code": "PR",
        "nom": "Puerto Rico",
        "capitale": "San Juan",
        "continent": "Americas",
        "devise": "USD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "QA",
        "nom": "Qatar",
        "capitale": "Doha",
        "continent": "Asia",
        "devise": "QAR",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "CG",
        "nom": "Republic of the Congo",
        "capitale": "Brazzaville",
        "continent": "Africa",
        "devise": "XAF",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "RE",
        "nom": "Réunion",
        "capitale": "Saint-Denis",
        "continent": "Africa",
        "devise": "EUR",
        "fuseau_horaire": "UTC+04:00"
    },
    {
        "code": "RO",
        "nom": "Romania",
        "capitale": "Bucharest",
        "continent": "Europe",
        "devise": "RON",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "RU",
        "nom": "Russia",
        "capitale": "Moscow",
        "continent": "Europe",
        "devise": "RUB",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "RW",
        "nom": "Rwanda",
        "capitale": "Kigali",
        "continent": "Africa",
        "devise": "RWF",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "BL",
        "nom": "Saint Barthélemy",
        "capitale": "Gustavia",
        "continent": "Americas",
        "devise": "EUR",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "SH",
        "nom": "Saint Helena, Ascension and Tristan da Cunha",
        "capitale": "Jamestown",
        "continent": "Africa",
        "devise": "GBP",
        "fuseau_horaire": "UTC+00:00"
    },
    {
        "code": "KN",
        "nom": "Saint Kitts and Nevis",
        "capitale": "Basseterre",
        "continent": "Americas",
        "devise": "XCD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "LC",
        "nom": "Saint Lucia",
        "capitale": "Castries",
        "continent": "Americas",
        "devise": "XCD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "MF",
        "nom": "Saint Martin",
        "capitale": "Marigot",
        "continent": "Americas",
        "devise": "EUR",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "PM",
        "nom": "Saint Pierre and Miquelon",
        "capitale": "Saint-Pierre",
        "continent": "Americas",
        "devise": "EUR",
        "fuseau_horaire": "UTC-03:00"
    },
    {
        "code": "VC",
        "nom": "Saint Vincent and the Grenadines",
        "capitale": "Kingstown",
        "continent": "Americas",
        "devise": "XCD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "WS",
        "nom": "Samoa",
        "capitale": "Apia",
        "continent": "Oceania",
        "devise": "WST",
        "fuseau_horaire": "UTC+13:00"
    },
    {
        "code": "SM",
        "nom": "San Marino",
        "capitale": "City of San Marino",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "ST",
        "nom": "São Tomé and Príncipe",
        "capitale": "São Tomé",
        "continent": "Africa",
        "devise": "STN",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "SA",
        "nom": "Saudi Arabia",
        "capitale": "Riyadh",
        "continent": "Asia",
        "devise": "SAR",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "SN",
        "nom": "Senegal",
        "capitale": "Dakar",
        "continent": "Africa",
        "devise": "XOF",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "RS",
        "nom": "Serbia",
        "capitale": "Belgrade",
        "continent": "Europe",
        "devise": "RSD",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "SC",
        "nom": "Seychelles",
        "capitale": "Victoria",
        "continent": "Africa",
        "devise": "SCR",
        "fuseau_horaire": "UTC+04:00"
    },
    {
        "code": "SL",
        "nom": "Sierra Leone",
        "capitale": "Freetown",
        "continent": "Africa",
        "devise": "SLE",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "SG",
        "nom": "Singapore",
        "capitale": "Singapore",
        "continent": "Asia",
        "devise": "SGD",
        "fuseau_horaire": "UTC+08:00"
    },
    {
        "code": "SX",
        "nom": "Sint Maarten",
        "capitale": "Philipsburg",
        "continent": "Americas",
        "devise": "ANG",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "SK",
        "nom": "Slovakia",
        "capitale": "Bratislava",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "SI",
        "nom": "Slovenia",
        "capitale": "Ljubljana",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "SB",
        "nom": "Solomon Islands",
        "capitale": "Honiara",
        "continent": "Oceania",
        "devise": "SBD",
        "fuseau_horaire": "UTC+11:00"
    },
    {
        "code": "SO",
        "nom": "Somalia",
        "capitale": "Mogadishu",
        "continent": "Africa",
        "devise": "SOS",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "ZA",
        "nom": "South Africa",
        "capitale": "Pretoria",
        "continent": "Africa",
        "devise": "ZAR",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "GS",
        "nom": "South Georgia",
        "capitale": "King Edward Point",
        "continent": "Antarctic",
        "devise": "GBP",
        "fuseau_horaire": "UTC-02:00"
    },
    {
        "code": "KR",
        "nom": "South Korea",
        "capitale": "Seoul",
        "continent": "Asia",
        "devise": "KRW",
        "fuseau_horaire": "UTC+09:00"
    },
    {
        "code": "SS",
        "nom": "South Sudan",
        "capitale": "Juba",
        "continent": "Africa",
        "devise": "SSP",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "ES",
        "nom": "Spain",
        "capitale": "Madrid",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "LK",
        "nom": "Sri Lanka",
        "capitale": "Sri Jayawardenepura Kotte",
        "continent": "Asia",
        "devise": "LKR",
        "fuseau_horaire": "UTC+05:30"
    },
    {
        "code": "SD",
        "nom": "Sudan",
        "capitale": "Khartoum",
        "continent": "Africa",
        "devise": "SDG",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "SR",
        "nom": "Suriname",
        "capitale": "Paramaribo",
        "continent": "Americas",
        "devise": "SRD",
        "fuseau_horaire": "UTC-03:00"
    },
    {
        "code": "SJ",
        "nom": "Svalbard and Jan Mayen",
        "capitale": "Longyearbyen",
        "continent": "Europe",
        "devise": "NOK",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "SE",
        "nom": "Sweden",
        "capitale": "Stockholm",
        "continent": "Europe",
        "devise": "SEK",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "CH",
        "nom": "Switzerland",
        "capitale": "Bern",
        "continent": "Europe",
        "devise": "CHF",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "SY",
        "nom": "Syria",
        "capitale": "Damascus",
        "continent": "Asia",
        "devise": "SYP",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "TW",
        "nom": "Taiwan",
        "capitale": "Taipei",
        "continent": "Asia",
        "devise": "TWD",
        "fuseau_horaire": "UTC+08:00"
    },
    {
        "code": "TJ",
        "nom": "Tajikistan",
        "capitale": "Dushanbe",
        "continent": "Asia",
        "devise": "TJS",
        "fuseau_horaire": "UTC+05:00"
    },
    {
        "code": "TZ",
        "nom": "Tanzania",
        "capitale": "Dodoma",
        "continent": "Africa",
        "devise": "TZS",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "TH",
        "nom": "Thailand",
        "capitale": "Bangkok",
        "continent": "Asia",
        "devise": "THB",
        "fuseau_horaire": "UTC+07:00"
    },
    {
        "code": "TL",
        "nom": "Timor-Leste",
        "capitale": "Dili",
        "continent": "Asia",
        "devise": "USD",
        "fuseau_horaire": "UTC+09:00"
    },
    {
        "code": "TG",
        "nom": "Togo",
        "capitale": "Lomé",
        "continent": "Africa",
        "devise": "XOF",
        "fuseau_horaire": "UTC"
    },
    {
        "code": "TK",
        "nom": "Tokelau",
        "capitale": "Fakaofo",
        "continent": "Oceania",
        "devise": "NZD",
        "fuseau_horaire": "UTC+13:00"
    },
    {
        "code": "TO",
        "nom": "Tonga",
        "capitale": "Nuku'alofa",
        "continent": "Oceania",
        "devise": "TOP",
        "fuseau_horaire": "UTC+13:00"
    },
    {
        "code": "TT",
        "nom": "Trinidad and Tobago",
        "capitale": "Port of Spain",
        "continent": "Americas",
        "devise": "TTD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "TN",
        "nom": "Tunisia",
        "capitale": "Tunis",
        "continent": "Africa",
        "devise": "TND",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "TR",
        "nom": "Turkey",
        "capitale": "Ankara",
        "continent": "Asia",
        "devise": "TRY",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "TM",
        "nom": "Turkmenistan",
        "capitale": "Ashgabat",
        "continent": "Asia",
        "devise": "TMT",
        "fuseau_horaire": "UTC+05:00"
    },
    {
        "code": "TC",
        "nom": "Turks and Caicos Islands",
        "capitale": "Cockburn Town",
        "continent": "Americas",
        "devise": "USD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "TV",
        "nom": "Tuvalu",
        "capitale": "Funafuti",
        "continent": "Oceania",
        "devise": "AUD",
        "fuseau_horaire": "UTC+12:00"
    },
    {
        "code": "UG",
        "nom": "Uganda",
        "capitale": "Kampala",
        "continent": "Africa",
        "devise": "UGX",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "UA",
        "nom": "Ukraine",
        "capitale": "Kyiv",
        "continent": "Europe",
        "devise": "UAH",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "AE",
        "nom": "United Arab Emirates",
        "capitale": "Abu Dhabi",
        "continent": "Asia",
        "devise": "AED",
        "fuseau_horaire": "UTC+04:00"
    },
    {
        "code": "GB",
        "nom": "United Kingdom",
        "capitale": "London",
        "continent": "Europe",
        "devise": "GBP",
        "fuseau_horaire": "UTC-08:00"
    },
    {
        "code": "US",
        "nom": "United States",
        "capitale": "Washington, D.C.",
        "continent": "Americas",
        "devise": "USD",
        "fuseau_horaire": "UTC-12:00"
    },
    {
        "code": "UM",
        "nom": "United States Minor Outlying Islands",
        "capitale": "Washington DC",
        "continent": "Americas",
        "devise": "USD",
        "fuseau_horaire": "UTC-11:00"
    },
    {
        "code": "VI",
        "nom": "United States Virgin Islands",
        "capitale": "Charlotte Amalie",
        "continent": "Americas",
        "devise": "USD",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "UY",
        "nom": "Uruguay",
        "capitale": "Montevideo",
        "continent": "Americas",
        "devise": "UYU",
        "fuseau_horaire": "UTC-03:00"
    },
    {
        "code": "UZ",
        "nom": "Uzbekistan",
        "capitale": "Tashkent",
        "continent": "Asia",
        "devise": "UZS",
        "fuseau_horaire": "UTC+05:00"
    },
    {
        "code": "VU",
        "nom": "Vanuatu",
        "capitale": "Port Vila",
        "continent": "Oceania",
        "devise": "VUV",
        "fuseau_horaire": "UTC+11:00"
    },
    {
        "code": "VA",
        "nom": "Vatican City",
        "capitale": "Vatican City",
        "continent": "Europe",
        "devise": "EUR",
        "fuseau_horaire": "UTC+01:00"
    },
    {
        "code": "VE",
        "nom": "Venezuela",
        "capitale": "Caracas",
        "continent": "Americas",
        "devise": "VES",
        "fuseau_horaire": "UTC-04:00"
    },
    {
        "code": "VN",
        "nom": "Vietnam",
        "capitale": "Hanoi",
        "continent": "Asia",
        "devise": "VND",
        "fuseau_horaire": "UTC+07:00"
    },
    {
        "code": "WF",
        "nom": "Wallis and Futuna",
        "capitale": "Mata-Utu",
        "continent": "Oceania",
        "devise": "XPF",
        "fuseau_horaire": "UTC+12:00"
    },
    {
        "code": "EH",
        "nom": "Western Sahara",
        "capitale": "El Aaiún",
        "continent": "Africa",
        "devise": "DZD",
        "fuseau_horaire": "UTC+00:00"
    },
    {
        "code": "YE",
        "nom": "Yemen",
        "capitale": "Sana'a",
        "continent": "Asia",
        "devise": "YER",
        "fuseau_horaire": "UTC+03:00"
    },
    {
        "code": "ZM",
        "nom": "Zambia",
        "capitale": "Lusaka",
        "continent": "Africa",
        "devise": "ZMW",
        "fuseau_horaire": "UTC+02:00"
    },
    {
        "code": "ZW",
        "nom": "Zimbabwe",
        "capitale": "Harare",
        "continent": "Africa",
        "devise": "ZWL",
        "fuseau_horaire": "UTC+02:00"
    }
];

async function seedPays() {
    try {
        let dbUrl;
        if (DB_MONGO_USER && DB_MONGO_PASSWORD) {
            dbUrl = `mongodb://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@${DB_MONGO_HOST}:${DB_MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`;
        } else {
            dbUrl = `mongodb://${DB_MONGO_HOST}:${DB_MONGO_PORT}/${MONGO_DATABASE}`;
        }

        console.log(`Connexion à MongoDB pour le seeding des pays...`);
        await mongoose.connect(dbUrl);

        console.log("Nettoyage de la collection acl_pays...");
        await Pays.deleteMany({});

        console.log(`Insertion de ${countries.length} pays...`);
        await Pays.insertMany(countries);

        console.log("Seeding des pays terminé !");
        process.exit(0);
    } catch (error) {
        console.error("Erreur seeding pays:", error);
        process.exit(1);
    }
}

seedPays();
