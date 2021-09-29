export let months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export let genres: { id: number, name: string }[] = [
  {
    id: 28,
    name: "Action"
  },
  {
    id: 12,
    name: "Adventure"
  },
  {
    id: 16,
    name: "Animation"
  },
  {
    id: 35,
    name: "Comedy"
  },
  {
    id: 80,
    name: "Crime"
  },
  {
    id: 99,
    name: "Documentary"
  },
  {
    id: 18,
    name: "Drama"
  },
  {
    id: 10751,
    name: "Family"
  },
  {
    id: 14,
    name: "Fantasy"
  },
  {
    id: 36,
    name: "History"
  },
  {
    id: 27,
    name: "Horror"
  },
  {
    id: 10402,
    name: "Music"
  },
  {
    id: 9648,
    name: "Mystery"
  },
  {
    id: 10749,
    name: "Romance"
  },
  {
    id: 878,
    name: "Science Fiction"
  },
  {
    id: 10770,
    name: "TV Movie"
  },
  {
    id: 53,
    name: "Thriller"
  },
  {
    id: 10752,
    name: "War"
  },
  {
    id: 37,
    name: "Western"
  }
]

export let isoLangs: { [key: string]: { name: string, nativeName: string } } = {
  ab: {
    name: "Abkhaz",
    nativeName: "аҧсуа"
  },
  aa: {
    name: "Afar",
    nativeName: "Afaraf"
  },
  af: {
    name: "Afrikaans",
    nativeName: "Afrikaans"
  },
  ak: {
    name: "Akan",
    nativeName: "Akan"
  },
  sq: {
    name: "Albanian",
    nativeName: "Shqip"
  },
  am: {
    name: "Amharic",
    nativeName: "አማርኛ"
  },
  ar: {
    name: "Arabic",
    nativeName: "العربية"
  },
  an: {
    name: "Aragonese",
    nativeName: "Aragonés"
  },
  hy: {
    name: "Armenian",
    nativeName: "Հայերեն"
  },
  as: {
    name: "Assamese",
    nativeName: "অসমীয়া"
  },
  av: {
    name: "Avaric",
    nativeName: "авар мацӀ, магӀарул мацӀ"
  },
  ae: {
    name: "Avestan",
    nativeName: "avesta"
  },
  ay: {
    name: "Aymara",
    nativeName: "aymar aru"
  },
  az: {
    name: "Azerbaijani",
    nativeName: "azərbaycan dili"
  },
  bm: {
    name: "Bambara",
    nativeName: "bamanankan"
  },
  ba: {
    name: "Bashkir",
    nativeName: "башҡорт теле"
  },
  eu: {
    name: "Basque",
    nativeName: "euskara, euskera"
  },
  be: {
    name: "Belarusian",
    nativeName: "Беларуская"
  },
  bn: {
    name: "Bengali",
    nativeName: "বাংলা"
  },
  bh: {
    name: "Bihari",
    nativeName: "भोजपुरी"
  },
  bi: {
    name: "Bislama",
    nativeName: "Bislama"
  },
  bs: {
    name: "Bosnian",
    nativeName: "bosanski jezik"
  },
  br: {
    name: "Breton",
    nativeName: "brezhoneg"
  },
  bg: {
    name: "Bulgarian",
    nativeName: "български език"
  },
  my: {
    name: "Burmese",
    nativeName: "ဗမာစာ"
  },
  ca: {
    name: "Catalan; Valencian",
    nativeName: "Català"
  },
  ch: {
    name: "Chamorro",
    nativeName: "Chamoru"
  },
  ce: {
    name: "Chechen",
    nativeName: "нохчийн мотт"
  },
  ny: {
    name: "Chichewa; Chewa; Nyanja",
    nativeName: "chiCheŵa, chinyanja"
  },
  zh: {
    name: "Chinese",
    nativeName: "中文 (Zhōngwén), 汉语, 漢語"
  },
  cv: {
    name: "Chuvash",
    nativeName: "чӑваш чӗлхи"
  },
  kw: {
    name: "Cornish",
    nativeName: "Kernewek"
  },
  co: {
    name: "Corsican",
    nativeName: "corsu, lingua corsa"
  },
  cr: {
    name: "Cree",
    nativeName: "ᓀᐦᐃᔭᐍᐏᐣ"
  },
  hr: {
    name: "Croatian",
    nativeName: "hrvatski"
  },
  cs: {
    name: "Czech",
    nativeName: "česky, čeština"
  },
  da: {
    name: "Danish",
    nativeName: "dansk"
  },
  dv: {
    name: "Divehi; Dhivehi; Maldivian;",
    nativeName: "ދިވެހި"
  },
  nl: {
    name: "Dutch",
    nativeName: "Nederlands, Vlaams"
  },
  en: {
    name: "English",
    nativeName: "English"
  },
  eo: {
    name: "Esperanto",
    nativeName: "Esperanto"
  },
  et: {
    name: "Estonian",
    nativeName: "eesti, eesti keel"
  },
  ee: {
    name: "Ewe",
    nativeName: "Eʋegbe"
  },
  fo: {
    name: "Faroese",
    nativeName: "føroyskt"
  },
  fj: {
    name: "Fijian",
    nativeName: "vosa Vakaviti"
  },
  fi: {
    name: "Finnish",
    nativeName: "suomi, suomen kieli"
  },
  fr: {
    name: "French",
    nativeName: "français, langue française"
  },
  ff: {
    name: "Fula; Fulah; Pulaar; Pular",
    nativeName: "Fulfulde, Pulaar, Pular"
  },
  gl: {
    name: "Galician",
    nativeName: "Galego"
  },
  ka: {
    name: "Georgian",
    nativeName: "ქართული"
  },
  de: {
    name: "German",
    nativeName: "Deutsch"
  },
  el: {
    name: "Greek, Modern",
    nativeName: "Ελληνικά"
  },
  gn: {
    name: "Guaraní",
    nativeName: "Avañeẽ"
  },
  gu: {
    name: "Gujarati",
    nativeName: "ગુજરાતી"
  },
  ht: {
    name: "Haitian; Haitian Creole",
    nativeName: "Kreyòl ayisyen"
  },
  ha: {
    name: "Hausa",
    nativeName: "Hausa, هَوُسَ"
  },
  he: {
    name: "Hebrew (modern)",
    nativeName: "עברית"
  },
  hz: {
    name: "Herero",
    nativeName: "Otjiherero"
  },
  hi: {
    name: "Hindi",
    nativeName: "हिन्दी, हिंदी"
  },
  ho: {
    name: "Hiri Motu",
    nativeName: "Hiri Motu"
  },
  hu: {
    name: "Hungarian",
    nativeName: "Magyar"
  },
  ia: {
    name: "Interlingua",
    nativeName: "Interlingua"
  },
  id: {
    name: "Indonesian",
    nativeName: "Bahasa Indonesia"
  },
  ie: {
    name: "Interlingue",
    nativeName: "Originally called Occidental; then Interlingue after WWII"
  },
  ga: {
    name: "Irish",
    nativeName: "Gaeilge"
  },
  ig: {
    name: "Igbo",
    nativeName: "Asụsụ Igbo"
  },
  ik: {
    name: "Inupiaq",
    nativeName: "Iñupiaq, Iñupiatun"
  },
  io: {
    name: "Ido",
    nativeName: "Ido"
  },
  is: {
    name: "Icelandic",
    nativeName: "Íslenska"
  },
  it: {
    name: "Italian",
    nativeName: "Italiano"
  },
  iu: {
    name: "Inuktitut",
    nativeName: "ᐃᓄᒃᑎᑐᑦ"
  },
  ja: {
    name: "Japanese",
    nativeName: "日本語 (にほんご／にっぽんご)"
  },
  jv: {
    name: "Javanese",
    nativeName: "basa Jawa"
  },
  kl: {
    name: "Kalaallisut, Greenlandic",
    nativeName: "kalaallisut, kalaallit oqaasii"
  },
  kn: {
    name: "Kannada",
    nativeName: "ಕನ್ನಡ"
  },
  kr: {
    name: "Kanuri",
    nativeName: "Kanuri"
  },
  ks: {
    name: "Kashmiri",
    nativeName: "कश्मीरी, كشميري‎"
  },
  kk: {
    name: "Kazakh",
    nativeName: "Қазақ тілі"
  },
  km: {
    name: "Khmer",
    nativeName: "ភាសាខ្មែរ"
  },
  ki: {
    name: "Kikuyu, Gikuyu",
    nativeName: "Gĩkũyũ"
  },
  rw: {
    name: "Kinyarwanda",
    nativeName: "Ikinyarwanda"
  },
  ky: {
    name: "Kirghiz, Kyrgyz",
    nativeName: "кыргыз тили"
  },
  kv: {
    name: "Komi",
    nativeName: "коми кыв"
  },
  kg: {
    name: "Kongo",
    nativeName: "KiKongo"
  },
  ko: {
    name: "Korean",
    nativeName: "한국어 (韓國語), 조선말 (朝鮮語)"
  },
  ku: {
    name: "Kurdish",
    nativeName: "Kurdî, كوردی‎"
  },
  kj: {
    name: "Kwanyama, Kuanyama",
    nativeName: "Kuanyama"
  },
  la: {
    name: "Latin",
    nativeName: "latine, lingua latina"
  },
  lb: {
    name: "Luxembourgish, Letzeburgesch",
    nativeName: "Lëtzebuergesch"
  },
  lg: {
    name: "Luganda",
    nativeName: "Luganda"
  },
  li: {
    name: "Limburgish, Limburgan, Limburger",
    nativeName: "Limburgs"
  },
  ln: {
    name: "Lingala",
    nativeName: "Lingála"
  },
  lo: {
    name: "Lao",
    nativeName: "ພາສາລາວ"
  },
  lt: {
    name: "Lithuanian",
    nativeName: "lietuvių kalba"
  },
  lu: {
    name: "Luba-Katanga",
    nativeName: ""
  },
  lv: {
    name: "Latvian",
    nativeName: "latviešu valoda"
  },
  gv: {
    name: "Manx",
    nativeName: "Gaelg, Gailck"
  },
  mk: {
    name: "Macedonian",
    nativeName: "македонски јазик"
  },
  mg: {
    name: "Malagasy",
    nativeName: "Malagasy fiteny"
  },
  ms: {
    name: "Malay",
    nativeName: "bahasa Melayu, بهاس ملايو‎"
  },
  ml: {
    name: "Malayalam",
    nativeName: "മലയാളം"
  },
  mt: {
    name: "Maltese",
    nativeName: "Malti"
  },
  mi: {
    name: "Māori",
    nativeName: "te reo Māori"
  },
  mr: {
    name: "Marathi (Marāṭhī)",
    nativeName: "मराठी"
  },
  mh: {
    name: "Marshallese",
    nativeName: "Kajin M̧ajeļ"
  },
  mn: {
    name: "Mongolian",
    nativeName: "монгол"
  },
  na: {
    name: "Nauru",
    nativeName: "Ekakairũ Naoero"
  },
  nv: {
    name: "Navajo, Navaho",
    nativeName: "Diné bizaad, Dinékʼehǰí"
  },
  nb: {
    name: "Norwegian Bokmål",
    nativeName: "Norsk bokmål"
  },
  nd: {
    name: "North Ndebele",
    nativeName: "isiNdebele"
  },
  ne: {
    name: "Nepali",
    nativeName: "नेपाली"
  },
  ng: {
    name: "Ndonga",
    nativeName: "Owambo"
  },
  nn: {
    name: "Norwegian Nynorsk",
    nativeName: "Norsk nynorsk"
  },
  no: {
    name: "Norwegian",
    nativeName: "Norsk"
  },
  ii: {
    name: "Nuosu",
    nativeName: "ꆈꌠ꒿ Nuosuhxop"
  },
  nr: {
    name: "South Ndebele",
    nativeName: "isiNdebele"
  },
  oc: {
    name: "Occitan",
    nativeName: "Occitan"
  },
  oj: {
    name: "Ojibwe, Ojibwa",
    nativeName: "ᐊᓂᔑᓈᐯᒧᐎᓐ"
  },
  cu: {
    name: "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
    nativeName: "ѩзыкъ словѣньскъ"
  },
  om: {
    name: "Oromo",
    nativeName: "Afaan Oromoo"
  },
  or: {
    name: "Oriya",
    nativeName: "ଓଡ଼ିଆ"
  },
  os: {
    name: "Ossetian, Ossetic",
    nativeName: "ирон æвзаг"
  },
  pa: {
    name: "Panjabi, Punjabi",
    nativeName: "ਪੰਜਾਬੀ, پنجابی‎"
  },
  pi: {
    name: "Pāli",
    nativeName: "पाऴि"
  },
  fa: {
    name: "Persian",
    nativeName: "فارسی"
  },
  pl: {
    name: "Polish",
    nativeName: "polski"
  },
  ps: {
    name: "Pashto, Pushto",
    nativeName: "پښتو"
  },
  pt: {
    name: "Portuguese",
    nativeName: "Português"
  },
  qu: {
    name: "Quechua",
    nativeName: "Runa Simi, Kichwa"
  },
  rm: {
    name: "Romansh",
    nativeName: "rumantsch grischun"
  },
  rn: {
    name: "Kirundi",
    nativeName: "kiRundi"
  },
  ro: {
    name: "Romanian, Moldavian, Moldovan",
    nativeName: "română"
  },
  ru: {
    name: "Russian",
    nativeName: "русский язык"
  },
  sa: {
    name: "Sanskrit (Saṁskṛta)",
    nativeName: "संस्कृतम्"
  },
  sc: {
    name: "Sardinian",
    nativeName: "sardu"
  },
  sd: {
    name: "Sindhi",
    nativeName: "सिन्धी, سنڌي، سندھی‎"
  },
  se: {
    name: "Northern Sami",
    nativeName: "Davvisámegiella"
  },
  sm: {
    name: "Samoan",
    nativeName: "gagana faa Samoa"
  },
  sg: {
    name: "Sango",
    nativeName: "yângâ tî sängö"
  },
  sr: {
    name: "Serbian",
    nativeName: "српски језик"
  },
  gd: {
    name: "Scottish Gaelic; Gaelic",
    nativeName: "Gàidhlig"
  },
  sn: {
    name: "Shona",
    nativeName: "chiShona"
  },
  si: {
    name: "Sinhala, Sinhalese",
    nativeName: "සිංහල"
  },
  sk: {
    name: "Slovak",
    nativeName: "slovenčina"
  },
  sl: {
    name: "Slovene",
    nativeName: "slovenščina"
  },
  so: {
    name: "Somali",
    nativeName: "Soomaaliga, af Soomaali"
  },
  st: {
    name: "Southern Sotho",
    nativeName: "Sesotho"
  },
  es: {
    name: "Spanish; Castilian",
    nativeName: "español, castellano"
  },
  su: {
    name: "Sundanese",
    nativeName: "Basa Sunda"
  },
  sw: {
    name: "Swahili",
    nativeName: "Kiswahili"
  },
  ss: {
    name: "Swati",
    nativeName: "SiSwati"
  },
  sv: {
    name: "Swedish",
    nativeName: "svenska"
  },
  ta: {
    name: "Tamil",
    nativeName: "தமிழ்"
  },
  te: {
    name: "Telugu",
    nativeName: "తెలుగు"
  },
  tg: {
    name: "Tajik",
    nativeName: "тоҷикӣ, toğikī, تاجیکی‎"
  },
  th: {
    name: "Thai",
    nativeName: "ไทย"
  },
  ti: {
    name: "Tigrinya",
    nativeName: "ትግርኛ"
  },
  bo: {
    name: "Tibetan Standard, Tibetan, Central",
    nativeName: "བོད་ཡིག"
  },
  tk: {
    name: "Turkmen",
    nativeName: "Türkmen, Түркмен"
  },
  tl: {
    name: "Tagalog",
    nativeName: "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"
  },
  tn: {
    name: "Tswana",
    nativeName: "Setswana"
  },
  to: {
    name: "Tonga (Tonga Islands)",
    nativeName: "faka Tonga"
  },
  tr: {
    name: "Turkish",
    nativeName: "Türkçe"
  },
  ts: {
    name: "Tsonga",
    nativeName: "Xitsonga"
  },
  tt: {
    name: "Tatar",
    nativeName: "татарча, tatarça, تاتارچا‎"
  },
  tw: {
    name: "Twi",
    nativeName: "Twi"
  },
  ty: {
    name: "Tahitian",
    nativeName: "Reo Tahiti"
  },
  ug: {
    name: "Uighur, Uyghur",
    nativeName: "Uyƣurqə, ئۇيغۇرچە‎"
  },
  uk: {
    name: "Ukrainian",
    nativeName: "українська"
  },
  ur: {
    name: "Urdu",
    nativeName: "اردو"
  },
  uz: {
    name: "Uzbek",
    nativeName: "zbek, Ўзбек, أۇزبېك‎"
  },
  ve: {
    name: "Venda",
    nativeName: "Tshivenḓa"
  },
  vi: {
    name: "Vietnamese",
    nativeName: "Tiếng Việt"
  },
  vo: {
    name: "Volapük",
    nativeName: "Volapük"
  },
  wa: {
    name: "Walloon",
    nativeName: "Walon"
  },
  cy: {
    name: "Welsh",
    nativeName: "Cymraeg"
  },
  wo: {
    name: "Wolof",
    nativeName: "Wollof"
  },
  fy: {
    name: "Western Frisian",
    nativeName: "Frysk"
  },
  xh: {
    name: "Xhosa",
    nativeName: "isiXhosa"
  },
  yi: {
    name: "Yiddish",
    nativeName: "ייִדיש"
  },
  yo: {
    name: "Yoruba",
    nativeName: "Yorùbá"
  },
  za: {
    name: "Zhuang, Chuang",
    nativeName: "Saɯ cueŋƅ, Saw cuengh"
  }
}

export let countries: { name: string, code: string }[] = [
  { name: 'Afghanistan', code: 'AF' },
  { name: 'Åland Islands', code: 'AX' },
  { name: 'Albania', code: 'AL' },
  { name: 'Algeria', code: 'DZ' },
  { name: 'American Samoa', code: 'AS' },
  { name: 'AndorrA', code: 'AD' },
  { name: 'Angola', code: 'AO' },
  { name: 'Anguilla', code: 'AI' },
  { name: 'Antarctica', code: 'AQ' },
  { name: 'Antigua and Barbuda', code: 'AG' },
  { name: 'Argentina', code: 'AR' },
  { name: 'Armenia', code: 'AM' },
  { name: 'Aruba', code: 'AW' },
  { name: 'Australia', code: 'AU' },
  { name: 'Austria', code: 'AT' },
  { name: 'Azerbaijan', code: 'AZ' },
  { name: 'Bahamas', code: 'BS' },
  { name: 'Bahrain', code: 'BH' },
  { name: 'Bangladesh', code: 'BD' },
  { name: 'Barbados', code: 'BB' },
  { name: 'Belarus', code: 'BY' },
  { name: 'Belgium', code: 'BE' },
  { name: 'Belize', code: 'BZ' },
  { name: 'Benin', code: 'BJ' },
  { name: 'Bermuda', code: 'BM' },
  { name: 'Bhutan', code: 'BT' },
  { name: 'Bolivia', code: 'BO' },
  { name: 'Bosnia and Herzegovina', code: 'BA' },
  { name: 'Botswana', code: 'BW' },
  { name: 'Bouvet Island', code: 'BV' },
  { name: 'Brazil', code: 'BR' },
  { name: 'British Indian Ocean Territory', code: 'IO' },
  { name: 'Brunei Darussalam', code: 'BN' },
  { name: 'Bulgaria', code: 'BG' },
  { name: 'Burkina Faso', code: 'BF' },
  { name: 'Burundi', code: 'BI' },
  { name: 'Cambodia', code: 'KH' },
  { name: 'Cameroon', code: 'CM' },
  { name: 'Canada', code: 'CA' },
  { name: 'Cape Verde', code: 'CV' },
  { name: 'Cayman Islands', code: 'KY' },
  { name: 'Central African Republic', code: 'CF' },
  { name: 'Chad', code: 'TD' },
  { name: 'Chile', code: 'CL' },
  { name: 'China', code: 'CN' },
  { name: 'Christmas Island', code: 'CX' },
  { name: 'Cocos (Keeling) Islands', code: 'CC' },
  { name: 'Colombia', code: 'CO' },
  { name: 'Comoros', code: 'KM' },
  { name: 'Congo', code: 'CG' },
  { name: 'Congo, The Democratic Republic of the', code: 'CD' },
  { name: 'Cook Islands', code: 'CK' },
  { name: 'Costa Rica', code: 'CR' },
  { name: 'Cote D\'Ivoire', code: 'CI' },
  { name: 'Croatia', code: 'HR' },
  { name: 'Cuba', code: 'CU' },
  { name: 'Cyprus', code: 'CY' },
  { name: 'Czech Republic', code: 'CZ' },
  { name: 'Denmark', code: 'DK' },
  { name: 'Djibouti', code: 'DJ' },
  { name: 'Dominica', code: 'DM' },
  { name: 'Dominican Republic', code: 'DO' },
  { name: 'Ecuador', code: 'EC' },
  { name: 'Egypt', code: 'EG' },
  { name: 'El Salvador', code: 'SV' },
  { name: 'Equatorial Guinea', code: 'GQ' },
  { name: 'Eritrea', code: 'ER' },
  { name: 'Estonia', code: 'EE' },
  { name: 'Ethiopia', code: 'ET' },
  { name: 'Falkland Islands (Malvinas)', code: 'FK' },
  { name: 'Faroe Islands', code: 'FO' },
  { name: 'Fiji', code: 'FJ' },
  { name: 'Finland', code: 'FI' },
  { name: 'France', code: 'FR' },
  { name: 'French Guiana', code: 'GF' },
  { name: 'French Polynesia', code: 'PF' },
  { name: 'French Southern Territories', code: 'TF' },
  { name: 'Gabon', code: 'GA' },
  { name: 'Gambia', code: 'GM' },
  { name: 'Georgia', code: 'GE' },
  { name: 'Germany', code: 'DE' },
  { name: 'Ghana', code: 'GH' },
  { name: 'Gibraltar', code: 'GI' },
  { name: 'Greece', code: 'GR' },
  { name: 'Greenland', code: 'GL' },
  { name: 'Grenada', code: 'GD' },
  { name: 'Guadeloupe', code: 'GP' },
  { name: 'Guam', code: 'GU' },
  { name: 'Guatemala', code: 'GT' },
  { name: 'Guernsey', code: 'GG' },
  { name: 'Guinea', code: 'GN' },
  { name: 'Guinea-Bissau', code: 'GW' },
  { name: 'Guyana', code: 'GY' },
  { name: 'Haiti', code: 'HT' },
  { name: 'Heard Island and Mcdonald Islands', code: 'HM' },
  { name: 'Holy See (Vatican City State)', code: 'VA' },
  { name: 'Honduras', code: 'HN' },
  { name: 'Hong Kong', code: 'HK' },
  { name: 'Hungary', code: 'HU' },
  { name: 'Iceland', code: 'IS' },
  { name: 'India', code: 'IN' },
  { name: 'Indonesia', code: 'ID' },
  { name: 'Iran, Islamic Republic Of', code: 'IR' },
  { name: 'Iraq', code: 'IQ' },
  { name: 'Ireland', code: 'IE' },
  { name: 'Isle of Man', code: 'IM' },
  { name: 'Israel', code: 'IL' },
  { name: 'Italy', code: 'IT' },
  { name: 'Jamaica', code: 'JM' },
  { name: 'Japan', code: 'JP' },
  { name: 'Jersey', code: 'JE' },
  { name: 'Jordan', code: 'JO' },
  { name: 'Kazakhstan', code: 'KZ' },
  { name: 'Kenya', code: 'KE' },
  { name: 'Kiribati', code: 'KI' },
  { name: 'Korea, Democratic People\'S Republic of', code: 'KP' },
  { name: 'Korea, Republic of', code: 'KR' },
  { name: 'Kuwait', code: 'KW' },
  { name: 'Kyrgyzstan', code: 'KG' },
  { name: 'Lao People\'S Democratic Republic', code: 'LA' },
  { name: 'Latvia', code: 'LV' },
  { name: 'Lebanon', code: 'LB' },
  { name: 'Lesotho', code: 'LS' },
  { name: 'Liberia', code: 'LR' },
  { name: 'Libyan Arab Jamahiriya', code: 'LY' },
  { name: 'Liechtenstein', code: 'LI' },
  { name: 'Lithuania', code: 'LT' },
  { name: 'Luxembourg', code: 'LU' },
  { name: 'Macao', code: 'MO' },
  { name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK' },
  { name: 'Madagascar', code: 'MG' },
  { name: 'Malawi', code: 'MW' },
  { name: 'Malaysia', code: 'MY' },
  { name: 'Maldives', code: 'MV' },
  { name: 'Mali', code: 'ML' },
  { name: 'Malta', code: 'MT' },
  { name: 'Marshall Islands', code: 'MH' },
  { name: 'Martinique', code: 'MQ' },
  { name: 'Mauritania', code: 'MR' },
  { name: 'Mauritius', code: 'MU' },
  { name: 'Mayotte', code: 'YT' },
  { name: 'Mexico', code: 'MX' },
  { name: 'Micronesia, Federated States of', code: 'FM' },
  { name: 'Moldova, Republic of', code: 'MD' },
  { name: 'Monaco', code: 'MC' },
  { name: 'Mongolia', code: 'MN' },
  { name: 'Montserrat', code: 'MS' },
  { name: 'Morocco', code: 'MA' },
  { name: 'Mozambique', code: 'MZ' },
  { name: 'Myanmar', code: 'MM' },
  { name: 'Namibia', code: 'NA' },
  { name: 'Nauru', code: 'NR' },
  { name: 'Nepal', code: 'NP' },
  { name: 'Netherlands', code: 'NL' },
  { name: 'Netherlands Antilles', code: 'AN' },
  { name: 'New Caledonia', code: 'NC' },
  { name: 'New Zealand', code: 'NZ' },
  { name: 'Nicaragua', code: 'NI' },
  { name: 'Niger', code: 'NE' },
  { name: 'Nigeria', code: 'NG' },
  { name: 'Niue', code: 'NU' },
  { name: 'Norfolk Island', code: 'NF' },
  { name: 'Northern Mariana Islands', code: 'MP' },
  { name: 'Norway', code: 'NO' },
  { name: 'Oman', code: 'OM' },
  { name: 'Pakistan', code: 'PK' },
  { name: 'Palau', code: 'PW' },
  { name: 'Palestinian Territory, Occupied', code: 'PS' },
  { name: 'Panama', code: 'PA' },
  { name: 'Papua New Guinea', code: 'PG' },
  { name: 'Paraguay', code: 'PY' },
  { name: 'Peru', code: 'PE' },
  { name: 'Philippines', code: 'PH' },
  { name: 'Pitcairn', code: 'PN' },
  { name: 'Poland', code: 'PL' },
  { name: 'Portugal', code: 'PT' },
  { name: 'Puerto Rico', code: 'PR' },
  { name: 'Qatar', code: 'QA' },
  { name: 'Reunion', code: 'RE' },
  { name: 'Romania', code: 'RO' },
  { name: 'Russian Federation', code: 'RU' },
  { name: 'RWANDA', code: 'RW' },
  { name: 'Saint Helena', code: 'SH' },
  { name: 'Saint Kitts and Nevis', code: 'KN' },
  { name: 'Saint Lucia', code: 'LC' },
  { name: 'Saint Pierre and Miquelon', code: 'PM' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC' },
  { name: 'Samoa', code: 'WS' },
  { name: 'San Marino', code: 'SM' },
  { name: 'Sao Tome and Principe', code: 'ST' },
  { name: 'Saudi Arabia', code: 'SA' },
  { name: 'Senegal', code: 'SN' },
  { name: 'Serbia and Montenegro', code: 'CS' },
  { name: 'Seychelles', code: 'SC' },
  { name: 'Sierra Leone', code: 'SL' },
  { name: 'Singapore', code: 'SG' },
  { name: 'Slovakia', code: 'SK' },
  { name: 'Slovenia', code: 'SI' },
  { name: 'Solomon Islands', code: 'SB' },
  { name: 'Somalia', code: 'SO' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'South Georgia and the South Sandwich Islands', code: 'GS' },
  { name: 'Spain', code: 'ES' },
  { name: 'Sri Lanka', code: 'LK' },
  { name: 'Sudan', code: 'SD' },
  { name: 'Suriname', code: 'SR' },
  { name: 'Svalbard and Jan Mayen', code: 'SJ' },
  { name: 'Swaziland', code: 'SZ' },
  { name: 'Sweden', code: 'SE' },
  { name: 'Switzerland', code: 'CH' },
  { name: 'Syrian Arab Republic', code: 'SY' },
  { name: 'Taiwan, Province of China', code: 'TW' },
  { name: 'Tajikistan', code: 'TJ' },
  { name: 'Tanzania, United Republic of', code: 'TZ' },
  { name: 'Thailand', code: 'TH' },
  { name: 'Timor-Leste', code: 'TL' },
  { name: 'Togo', code: 'TG' },
  { name: 'Tokelau', code: 'TK' },
  { name: 'Tonga', code: 'TO' },
  { name: 'Trinidad and Tobago', code: 'TT' },
  { name: 'Tunisia', code: 'TN' },
  { name: 'Turkey', code: 'TR' },
  { name: 'Turkmenistan', code: 'TM' },
  { name: 'Turks and Caicos Islands', code: 'TC' },
  { name: 'Tuvalu', code: 'TV' },
  { name: 'Uganda', code: 'UG' },
  { name: 'Ukraine', code: 'UA' },
  { name: 'United Arab Emirates', code: 'AE' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'United States', code: 'US' },
  { name: 'United States Minor Outlying Islands', code: 'UM' },
  { name: 'Uruguay', code: 'UY' },
  { name: 'Uzbekistan', code: 'UZ' },
  { name: 'Vanuatu', code: 'VU' },
  { name: 'Venezuela', code: 'VE' },
  { name: 'Viet Nam', code: 'VN' },
  { name: 'Virgin Islands, British', code: 'VG' },
  { name: 'Virgin Islands, U.S.', code: 'VI' },
  { name: 'Wallis and Futuna', code: 'WF' },
  { name: 'Western Sahara', code: 'EH' },
  { name: 'Yemen', code: 'YE' },
  { name: 'Zambia', code: 'ZM' },
  { name: 'Zimbabwe', code: 'ZW' }
]