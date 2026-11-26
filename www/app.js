var NL = String.fromCharCode(10);

var uiText = {
  en: {
    title: "🛒 Kirana & Sabzi List",
    sub: "Tap items to add & send on WhatsApp",
    placeholder: "Add custom item (e.g. Besan, Paneer)...",
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
    placeholder: "नया सामान लिखें (जैसे बेसन, पनीर)...",
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
    placeholder: "ਨਵਾਂ ਸਮਾਨ ਲਿਖੋ (ਜਿਵੇਂ ਵੇਸਣ, ਪਨੀਰ)...",
    add: "+ ਜੋੜੋ",
    clear: "ਸਭ ਅਣ-ਚੁਣੋ",
    wa: "ਵਟਸਐਪ 'ਤੇ ਭੇਜੋ",
    alertEmpty: "ਕਿਰਪਾ ਕਰਕੇ ਪਹਿਲਾਂ ਘੱਟੋ-ਘੱਟ 1 ਸਮਾਨ ਚੁਣੋ!",
    confirmDel: "ਕੀ ਤੁਸੀਂ ਇਸ ਸਮਾਨ ਨੂੰ ਲਿਸਟ ਵਿੱਚੋਂ ਹਟਾਉਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
    waHeader: "*🛒 ਘਰ ਦੇ ਸਮਾਨ ਦੀ ਲਿਸਟ:*",
    cats: { All: "ਸਾਰਾ", Selected: "ਚੁਣਿਆ ਹੋਇਆ", Ration: "ਰਾਸ਼ਨ", Masale: "ਮਸਾਲੇ", Sabzi: "ਸਬਜ਼ੀ", Dairy: "ਡੇਅਰੀ" }
  }
};

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
  var savedLang = localStorage.getItem("kirana_lang");
  if (savedLang && uiText[savedLang]) lang = savedLang;
  var savedItems = JSON.parse(localStorage.getItem("kirana_items_v4"));
  if (Array.isArray(savedItems) && savedItems.length > 0) items = savedItems;
} catch (e) {}

function setLang(newLang) {
  lang = newLang;
  try { localStorage.setItem("kirana_lang", lang); } catch (e) {}
  render();
}

function setTab(newTab) {
  currentTab = newTab;
  render();
}

function save() {
  try { localStorage.setItem("kirana_items_v4", JSON.stringify(items)); } catch (e) {}
  render();
}

function toggleItem(id) {
  for (var k = 0; k < items.length; k++) {
    if (items[k].id === id) {
      items[k].selected = !items[k].selected;
    }
  }
  save();
}

function deleteItem(id) {
  var t = uiText[lang] || uiText.en;
  if (!confirm(t.confirmDel)) return;
  var updated = [];
  for (var k = 0; k < items.length; k++) {
    if (items[k].id !== id) updated.push(items[k]);
  }
  items = updated;
  save();
}

function changeQty(id, val) {
  for (var k = 0; k < items.length; k++) {
    if (items[k].id === id) {
      items[k].qty = val;
      items[k].selected = true;
    }
  }
  save();
}

function addCustom() {
  var input = document.getElementById("customItem");
  var name = input.value.trim();
  if (!name) return;
  var targetCat = (currentTab === "All" || currentTab === "Selected") ? "Ration" : currentTab;
  items.unshift({ id: Date.now(), cat: targetCat, en: name, hi: name, pa: name, qty: "1 pkt", selected: true });
  input.value = "";
  save();
}

function clearAll() {
  for (var k = 0; k < items.length; k++) {
    items[k].selected = false;
  }
  save();
}

function sendWhatsApp() {
  var picked = [];
  for (var k = 0; k < items.length; k++) {
    if (items[k].selected) picked.push(items[k]);
  }
  var t = uiText[lang] || uiText.en;
  if (picked.length === 0) {
    alert(t.alertEmpty);
    return;
  }
  var lines = [t.waHeader, ""];
  for (var i = 0; i < picked.length; i++) {
    var displayName = picked[i][lang] || picked[i].en;
    lines.push((i + 1) + ". " + displayName + " — *" + picked[i].qty + "*");
  }
  var text = lines.join(NL);
  window.location.href = "whatsapp://send?text=" + encodeURIComponent(text);
}

function render() {
  var t = uiText[lang] || uiText.en;
  document.getElementById("appTitle").innerText = t.title;
  document.getElementById("appSub").innerText = t.sub;
  document.getElementById("customItem").placeholder = t.placeholder;
  document.getElementById("addBtn").innerText = t.add;
  document.getElementById("clearBtn").innerText = t.clear;
  document.getElementById("waLabel").innerText = t.wa;

  var langs = ["en", "hi", "pa"];
  for (var l = 0; l < langs.length; l++) {
    var btn = document.getElementById("btn-" + langs[l]);
    if (btn) btn.className = "lang-btn" + (lang === langs[l] ? " active" : "");
  }

  var tabsHtml = "";
  for (var c = 0; c < catKeys.length; c++) {
    var key = catKeys[c];
    tabsHtml += '<button type="button" class="tab ' + (currentTab === key ? 'active' : '') + '" onclick="setTab(\'' + key + '\')">' + t.cats[key] + '</button>';
  }
  document.getElementById("tabs").innerHTML = tabsHtml;

  var listHtml = "";
  var selectedCount = 0;
  for (var j = 0; j < items.length; j++) {
    var item = items[j];
    if (item.selected) selectedCount++;
    if (currentTab === "Selected" && !item.selected) continue;
    if (currentTab !== "All" && currentTab !== "Selected" && item.cat !== currentTab) continue;

    var mainTitle = item[lang] || item.en;
    var subTitle = (lang === "en") ? (item.hi + " • " + item.pa) : item.en;

    var optsHtml = "";
    for (var q = 0; q < quantities.length; q++) {
      optsHtml += '<option value="' + quantities[q] + '"' + (item.qty === quantities[q] ? ' selected' : '') + '>' + quantities[q] + '</option>';
    }

    listHtml += '<div class="card ' + (item.selected ? 'selected' : '') + '">' +
      '<div class="item-info" onclick="toggleItem(' + item.id + ')">' +
        '<div class="item-name">' + mainTitle + '</div>' +
        '<div class="item-sub">' + subTitle + '</div>' +
      '</div>' +
      '<div class="qty-controls">' +
        '<select onchange="changeQty(' + item.id + ', this.value)">' + optsHtml + '</select>' +
        '<button type="button" class="check-btn" onclick="toggleItem(' + item.id + ')">' + (item.selected ? '✓' : '+') + '</button>' +
        '<button type="button" onclick="deleteItem(' + item.id + ')" style="border:none;background:#fee2e2;color:#dc2626;border-radius:8px;padding:6px 8px;font-size:14px;cursor:pointer;">🗑️</button>' +
      '</div>' +
    '</div>';
  }
  document.getElementById("itemList").innerHTML = listHtml;
  document.getElementById("count").innerText = selectedCount;
}

window.onload = render;
