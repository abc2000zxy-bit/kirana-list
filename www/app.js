var NL = String.fromCharCode(10);

var uiText = {
  en: {
    title: "🛒 Kirana & Sabzi List",
    sub: "Tap items to add & send on WhatsApp",
    placeholder: "Add custom item (e.g. Kali Mirch, Besan)...",
    add: "+ Add",
    clear: "Uncheck All",
    wa: "Send to WhatsApp",
    alertEmpty: "Please select at least 1 item first!",
    confirmDel: "Remove this item from the list?",
    waHeader: "*🛒 Ghar Ki List:*",
    cats: { All: "All", Selected: "Selected", Ration: "Ration", Masale: "Masale", Sabzi: "Sabzi", Dairy: "Dairy" }
  },
  hi: {
    title: "🛒 राशन और सब्ज़ी लिस्ट",
    sub: "सामान चुनें और व्हाट्सएप पर भेजें",
    placeholder: "नया सामान लिखें (जैसे काली मिर्च, बेसन)...",
    add: "+ जोड़ें",
    clear: "सब हटाएं",
    wa: "व्हाट्सएप पर भेजें",
    alertEmpty: "कृपया पहले कम से कम 1 सामान चुनें!",
    confirmDel: "क्या आप इस सामान को लिस्ट से हटाना चाहते हैं?",
    waHeader: "*🛒 घर का सामान (लिस्ट):*",
    cats: { All: "सभी", Selected: "चुने हुए", Ration: "राशन", Masale: "मसाले", Sabzi: "सब्ज़ी", Dairy: "डेयरी" }
  },
  pa: {
    title: "🛒 ਰਾਸ਼ਨ ਤੇ ਸਬਜ਼ੀ ਲਿਸਟ",
    sub: "ਸਮਾਨ ਚੁਣੋ ਤੇ ਵਟਸਐਪ 'ਤੇ ਭੇਜੋ",
    placeholder: "ਨਵਾਂ ਸਮਾਨ ਲਿਖੋ (ਜਿਵੇਂ ਕਾਲੀ ਮਿਰਚ, ਵੇਸਣ)...",
    add: "+ ਜੋੜੋ",
    clear: "ਸਭ ਅਣ-ਚੁਣੋ",
    wa: "ਵਟਸਐਪ 'ਤੇ ਭੇਜੋ",
    alertEmpty: "ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਘੱਟੋ-ਘੱਟ 1 ਸਮਾਨ ਚੁਣੋ!",
    confirmDel: "ਕੀ ਤੁਸੀਂ ਇਸ ਸਮਾਨ ਨੂੰ ਲਿਸਟ ਵਿੱਚੋਂ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
    waHeader: "*🛒 ਘਰ ਦੇ ਸਮਾਨ ਦੀ ਲਿਸਟ:*",
    cats: { All: "ਸਾਰਾ", Selected: "ਚੁਣਿਆ ਹੋਇਆ", Ration: "ਰਾਸ਼ਨ", Masale: "ਮਸਾਲੇ", Sabzi: "ਸਬਜ਼ੀ", Dairy: "ਡੇਅਰੀ" }
  }
};

var autoDict = [
  { keys: ["kali mirch", "black pepper", "काली मिर्च", "ਕਾਲੀ ਮਿਰਚ"], en: "Kali Mirch (Black Pepper)", hi: "काली मिर्च", pa: "ਕਾਲੀ ਮਿਰਚ" },
  { keys: ["besan", "gram flour", "बेसन", "ਵੇਸਣ"], en: "Besan (Gram Flour)", hi: "बेसन", pa: "ਵੇਸਣ" },
  { keys: ["sooji", "suji", "rava", "semolina", "सूजी", "ਸੂਜੀ"], en: "Sooji / Rava", hi: "सूजी", pa: "ਸੂਜੀ" },
  { keys: ["maida", "मैदा", "ਮੈਦਾ"], en: "Maida", hi: "मैदा", pa: "ਮੈਦਾ" },
  { keys: ["poha", "पोहा", "ਪੋਹਾ"], en: "Poha", hi: "पोहा", pa: "ਪੋਹਾ" },
  { keys: ["dalia", "daliya", "दलिया", "ਦਲੀਆ"], en: "Dalia", hi: "दलिया", pa: "ਦਲੀਆ" },
  { keys: ["rajma", "kidney beans", "राजमा", "ਰਾਜਮਾਂ"], en: "Rajma", hi: "राजमा", pa: "ਰਾਜਮਾਂ" },
  { keys: ["chole", "chhole", "kabuli chana", "छोले", "ਛੋਲੇ"], en: "Kabuli Chana (Chole)", hi: "काबुली चना (छोले)", pa: "ਕਾਬੁਲੀ ਛੋਲੇ" },
  { keys: ["kala chana", "काला चना", "ਕਾਲੇ ਛੋਲੇ"], en: "Kala Chana", hi: "काला चना", pa: "ਕਾਲੇ ਛੋਲੇ" },
  { keys: ["urad dal", "mah di dal", "उड़द दाल", "ਮਾਂਹ ਦੀ ਦਾਲ"], en: "Urad / Mah Dal", hi: "उड़द दाल", pa: "ਮਾਂਹ ਦੀ ਦਾਲ" },
  { keys: ["masoor dal", "मसूर दाल", "ਮਸਰਾਂ ਦੀ ਦਾਲ"], en: "Masoor Dal", hi: "मसूर दाल", pa: "ਮਸਰਾਂ ਦੀ ਦਾਲ" },
  { keys: ["sabudana", "साबूदाना", "ਸਾਬੂਦਾਣਾ"], en: "Sabudana", hi: "साबूदाना", pa: "ਸਾਬੂਦਾਣਾ" },
  { keys: ["gud", "jaggery", "गुड़", "ਗੁੜ"], en: "Gud (Jaggery)", hi: "गुड़", pa: "ਗੁੜ" },
  { keys: ["shakkar", "शक्कर", "ਸ਼ੱਕਰ"], en: "Shakkar", hi: "शक्कर", pa: "ਸ਼ੱਕਰ" },
  { keys: ["garam masala", "गरम मसाला", "ਗਰਮ ਮਸਾਲਾ"], en: "Garam Masala", hi: "गरम मसाला", pa: "ਗਰਮ ਮਸਾਲਾ" },
  { keys: ["elaichi", "cardamom", "इलायची", "ਇਲਾਇਚੀ"], en: "Elaichi (Cardamom)", hi: "इलायची", pa: "ਇਲਾਇਚੀ" },
  { keys: ["laung", "clove", "लौंग", "ਲੌਂਗ"], en: "Laung (Cloves)", hi: "लौंग", pa: "ਲੌਂਗ" },
  { keys: ["dalchini", "cinnamon", "दालचीनी", "ਦਾਲਚੀਨੀ"], en: "Dalchini (Cinnamon)", hi: "दालचीनी", pa: "ਦਾਲਚੀਨੀ" },
  { keys: ["hing", "heeng", "हींग", "ਹਿੰਗ"], en: "Hing (Asafoetida)", hi: "हींग", pa: "ਹਿੰਗ" },
  { keys: ["ajwain", "अजवाइन", "ਅਜਵਾਇਣ"], en: "Ajwain", hi: "अजवाइन", pa: "ਅਜਵਾਇਣ" },
  { keys: ["saunf", "fennel", "सौंफ", "ਸੌਂਫ"], en: "Saunf (Fennel)", hi: "सौंफ", pa: "ਸੌਂਫ" },
  { keys: ["rai", "sarson", "mustard seeds", "राई", "ਰਾਈ"], en: "Rai / Mustard Seeds", hi: "राई / सरसों", pa: "ਰਾਈ / ਸਰ੍ਹੋਂ" },
  { keys: ["methi", "fenugreek", "मेथी", "ਮੇਥੀ"], en: "Methi (Fenugreek)", hi: "मेथी", pa: "ਮੇਥੀ" },
  { keys: ["kasuri methi", "कसूरी मेथी", "ਕਸੂਰੀ ਮੇਥੀ"], en: "Kasuri Methi", hi: "कसूरी मेथी", pa: "ਕਸੂਰੀ ਮੇਥੀ" },
  { keys: ["amchur", "amchoor", "अमचूर", "ਅਮਚੂਰ"], en: "Amchur Powder", hi: "अमचूर पाउडर", pa: "ਅਮਚੂਰ ਪਾਊਡਰ" },
  { keys: ["chaat masala", "चाट मसाला", "ਚਾਟ ਮਸਾਲਾ"], en: "Chaat Masala", hi: "चाट मसाला", pa: "ਚਾਟ ਮਸਾਲਾ" },
  { keys: ["gobhi", "gobi", "cauliflower", "गोभी", "ਗੋਭੀ"], en: "Gobhi (Cauliflower)", hi: "फूलगोभी", pa: "ਫੁੱਲ ਗੋਭੀ" },
  { keys: ["patta gobhi", "band gobhi", "cabbage", "पत्ता गोभी", "ਬੰਦ ਗੋਭੀ"], en: "Patta Gobhi (Cabbage)", hi: "पत्ता गोभी", pa: "ਬੰਦ ਗੋਭੀ" },
  { keys: ["matar", "peas", "मटर", "ਮਟਰ"], en: "Matar (Peas)", hi: "मटर", pa: "ਮਟਰ" },
  { keys: ["bhindi", "ladyfinger", "okra", "भिंडी", "ਭਿੰਡੀ"], en: "Bhindi (Okra)", hi: "भिंडी", pa: "ਭਿੰਡੀ" },
  { keys: ["baingan", "brinjal", "eggplant", "बैंगन", "ਬੈਂਗਣ"], en: "Baingan (Brinjal)", hi: "बैंगन", pa: "ਬੈਂਗਣ" },
  { keys: ["lauki", "ghiya", "bottle gourd", "लौकी", "घीया", "ਘੀਆ"], en: "Lauki / Ghiya", hi: "लौकी (घीया)", pa: "ਘੀਆ (ਲੌਕੀ)" },
  { keys: ["karela", "bitter gourd", "करेला", "ਕਰੇਲਾ"], en: "Karela", hi: "करेला", pa: "ਕਰੇਲਾ" },
  { keys: ["shimla mirch", "capsicum", "शिमला मिर्च", "ਸ਼ਿਮਲਾ ਮਿਰਚ"], en: "Shimla Mirch (Capsicum)", hi: "शिमला मिर्च", pa: "ਸ਼ਿਮਲਾ ਮਿਰਚ" },
  { keys: ["gajar", "carrot", "गाजर", "ਗਾਜਰ"], en: "Gajar (Carrot)", hi: "गाजर", pa: "ਗਾਜਰ" },
  { keys: ["mooli", "radish", "मूली", "ਮੂਲੀ"], en: "Mooli (Radish)", hi: "मूली", pa: "ਮੂਲੀ" },
  { keys: ["palak", "spinach", "पालक", "ਪਾਲਕ"], en: "Palak (Spinach)", hi: "पालक", pa: "ਪਾਲਕ" },
  { keys: ["nimbu", "lemon", "नींबू", "ਨਿੰਬੂ"], en: "Nimbu (Lemon)", hi: "नींबू", pa: "ਨਿੰਬੂ" },
  { keys: ["kheera", "cucumber", "खीरा", "ਖੀਰਾ"], en: "Kheera (Cucumber)", hi: "खीरा", pa: "ਖੀਰਾ" },
  { keys: ["lassi", "लस्सी", "ਲੱਸੀ"], en: "Lassi", hi: "लस्सी", pa: "ਲੱਸੀ" },
  { keys: ["makhan", "butter", "मक्खन", "ਮੱਖਣ"], en: "Makhan (Butter)", hi: "मक्खन", pa: "ਮੱਖਣ" },
  { keys: ["malai", "cream", "मलाई", "ਮਲਾਈ"], en: "Malai / Cream", hi: "मलाई", pa: "ਮਲਾਈ" },
  { keys: ["khoya", "mawa", "खोया", "ਖੋਆ"], en: "Khoya / Mawa", hi: "खोया (मावा)", pa: "ਖੋਆ" },
  { keys: ["kaju", "cashew", "काजू", "ਕਾਜੂ"], en: "Kaju (Cashews)", hi: "काजू", pa: "ਕਾਜੂ" },
  { keys: ["badam", "almond", "बादाम", "ਬਦਾਮ"], en: "Badam (Almonds)", hi: "बादाम", pa: "ਬਦਾਮ" },
  { keys: ["kishmish", "raisins", "किशमिश", "ਸੌਗੀ"], en: "Kishmish (Raisins)", hi: "किशमिश", pa: "ਸੌਗੀ (ਕਿਸ਼ਮਿਸ਼)" },
  { keys: ["sabun", "soap", "साबुन", "ਸਾਬਣ"], en: "Soap (Sabun)", hi: "साबुन", pa: "ਸਾਬਣ" },
  { keys: ["surf", "detergent", "सर्फ़", "ਸਰਫ਼"], en: "Detergent / Surf", hi: "सर्फ़ / डिटर्जेंट", pa: "ਸਰਫ਼" }
];

function translateCustom(rawName) {
  var clean = rawName.trim().toLowerCase();
  for (var i = 0; i < autoDict.length; i++) {
    var entry = autoDict[i];
    for (var k = 0; k < entry.keys.length; k++) {
      if (clean === entry.keys[k]) {
        return { en: entry.en, hi: entry.hi, pa: entry.pa };
      }
    }
  }
  return { en: rawName.trim(), hi: rawName.trim(), pa: rawName.trim() };
}

var defaultItems = [
  { id: 1, cat: "Ration", en: "Atta (Wheat Flour)", hi: "आटा", pa: "ਆਟਾ (ਕਣਕ)", qty: "5 kg", selected: false },
  { id: 2, cat: "Ration", en: "Basmati Rice", hi: "बासमती चावल", pa: "ਬਾਸਮਤੀ ਚੌਲ", qty: "2 kg", selected: false },
  { id: 3, cat: "Ration", en: "Toor / Arhar Dal", hi: "अरहर दाल", pa: "ਅਰਹਰ ਦਾਲ", qty: "1 kg", selected: false },
  { id: 4, cat: "Ration", en: "Moong Dal", hi: "मूंग दाल", pa: "ਮੂੰਗੀ ਦੀ ਦਾਲ", qty: "500 g", selected: false },
  { id: 5, cat: "Ration", en: "Chana Dal", hi: "चना दाल", pa: "ਛੋਲਿਆਂ ਦੀ ਦਾਲ", qty: "500 g", selected: false },
  { id: 6, cat: "Ration", en: "Sugar (Cheeni)", hi: "चीनी", pa: "ਖੰਡ", qty: "2 kg", selected: false },
  { id: 7, cat: "Ration", en: "Tea Leaves (Chai Patti)", hi: "चाय पत्ती", pa: "ਚਾਹ ਪੱਤੀ", qty: "500 g", selected: false },
  { id: 8, cat: "Ration", en: "Cooking / Mustard Oil", hi: "सरसों / खाना पकाने का तेल", pa: "ਸਰ੍ਹੋਂ / ਖਾਣਾ ਬਣਾਉਣ ਵਾਲਾ ਤੇਲ", qty: "1 L", selected: false },
  { id: 9, cat: "Ration", en: "Desi Ghee", hi: "देसी घी", pa: "ਦੇਸੀ ਘਿਓ", qty: "1 kg", selected: false },
  { id: 10, cat: "Masale", en: "Haldi Powder", hi: "हल्दी पाउडर", pa: "ਹਲਦੀ ਪਾਊਡਰ", qty: "250 g", selected: false },
  { id: 11, cat: "Masale", en: "Lal Mirch Powder", hi: "लाल मिर्च पाउडर", pa: "ਲਾਲ ਮਿਰਚ ਪਾਊਡਰ", qty: "250 g", selected: false },
  { id: 12, cat: "Masale", en: "Dhaniya Powder", hi: "धनिया पाउडर", pa: "ਧਨੀਆ ਪਾਊਡਰ", qty: "250 g", selected: false },
  { id: 13, cat: "Masale", en: "Jeera (Cumin)", hi: "जीरा", pa: "ਜ਼ੀਰਾ", qty: "100 g", selected: false },
  { id: 14, cat: "Masale", en: "Salt (Namak)", hi: "नमक", pa: "ਲੂਣ (ਨਮਕ)", qty: "1 pkt", selected: false },
  { id: 15, cat: "Sabzi", en: "Aloo (Potato)", hi: "आलू", pa: "ਆਲੂ", qty: "2 kg", selected: false },
  { id: 16, cat: "Sabzi", en: "Pyaz (Onion)", hi: "प्याज़", pa: "ਪਿਆਜ਼", qty: "2 kg", selected: false },
  { id: 17, cat: "Sabzi", en: "Tamatar (Tomato)", hi: "टमाटर", pa: "ਟਮਾਟਰ", qty: "1 kg", selected: false },
  { id: 18, cat: "Sabzi", en: "Adrak & Lehsun", hi: "अदरक और लहसुन", pa: "ਅਦਰਕ ਤੇ ਲਸਣ", qty: "250 g", selected: false },
  { id: 19, cat: "Sabzi", en: "Hari Mirch & Dhaniya", hi: "हरी मिर्च और हरा धनिया", pa: "ਹਰੀ ਮਿਰਚ ਤੇ ਹਰਾ ਧਨੀਆ", qty: "100 g", selected: false },
  { id: 20, cat: "Dairy", en: "Milk (Doodh)", hi: "दूध", pa: "ਦੁੱਧ", qty: "1 L", selected: false },
  { id: 21, cat: "Dairy", en: "Dahi (Curd)", hi: "दही", pa: "ਦਹੀਂ", qty: "500 g", selected: false },
  { id: 22, cat: "Dairy", en: "Paneer", hi: "पनीर", pa: "ਪਨੀਰ", qty: "250 g", selected: false },
  { id: 23, cat: "Dairy", en: "Bread / Butter", hi: "ब्रेड / मक्खन", pa: "ਬ੍ਰੈੱਡ / ਮੱਖਣ", qty: "1 pkt", selected: false }
];

var quantities = ["100 g", "250 g", "500 g", "1 kg", "2 kg", "5 kg", "10 kg", "500 ml", "1 L", "1 pkt", "2 pkt", "1 doz"];
var catKeys = ["All", "Selected", "Ration", "Masale", "Sabzi", "Dairy"];

var lang = "en";
var currentTab = "All";
var items = defaultItems;

try {
