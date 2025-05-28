const fs = require("fs");
const { argv } = require("process");

const data = fs.readFileSync(argv[2], "utf8");

function translateData(data) {
  if (typeof data === "string") {
    return translate(data);
  } else if (Array.isArray(data)) {
    return data.map(translateData);
  } else if (typeof data === "object") {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, translateData(value)])
    );
  }
  return data;
}

const translatedData = translateData(JSON.parse(data));
fs.writeFileSync(argv[3], JSON.stringify(translatedData));

function translate(value) {
  const latinToCyrillicMap = {
    A: "А",
    B: "Б",
    V: "В",
    G: "Г",
    D: "Д",
    Đ: "Ђ",
    E: "Е",
    Ž: "Ж",
    Z: "З",
    I: "И",
    J: "Ј",
    K: "К",
    L: "Л",
    Lj: "Љ",
    M: "М",
    N: "Н",
    Nj: "Њ",
    O: "О",
    P: "П",
    R: "Р",
    S: "С",
    T: "Т",
    Ć: "Ћ",
    U: "У",
    F: "Ф",
    H: "Х",
    C: "Ц",
    Č: "Ч",
    Dž: "Џ",
    Š: "Ш",
    a: "а",
    b: "б",
    v: "в",
    g: "г",
    d: "д",
    đ: "ђ",
    e: "е",
    ž: "ж",
    z: "з",
    i: "и",
    j: "ј",
    k: "к",
    l: "л",
    lj: "љ",
    m: "м",
    n: "н",
    nj: "њ",
    o: "о",
    p: "п",
    r: "р",
    s: "с",
    t: "т",
    ć: "ћ",
    u: "у",
    f: "ф",
    h: "х",
    c: "ц",
    č: "ч",
    dž: "џ",
    š: "ш",
    LJ: "Љ",
    NJ: "Њ",
    DŽ: "Џ",
  };

  const cyrillicToLatinMap = {
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Ђ: "Đ",
    Е: "E",
    Ж: "Ž",
    З: "Z",
    И: "I",
    Ј: "J",
    К: "K",
    Л: "L",
    Љ: "Lj",
    М: "M",
    Н: "N",
    Њ: "Nj",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    Ћ: "Ć",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Č",
    Џ: "Dž",
    Ш: "Š",
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    ђ: "đ",
    е: "e",
    ж: "ž",
    з: "z",
    и: "i",
    ј: "j",
    к: "k",
    л: "l",
    љ: "lj",
    м: "m",
    н: "n",
    њ: "nj",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    ћ: "ć",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "č",
    џ: "dž",
    ш: "š",
  };

  const skip = [];
  let match;
  let idx = 0;
  const regex = /\{.*?\}/g;
  while ((match = regex.exec(value)) !== null) {
    skip.push(match[0]);
    value = value.replace(match[0], `$${idx}`);
    idx++;
  }

  // Handle special cases for digraphs first
  const digraphs = ["Lj", "lj", "Nj", "nj", "Dž", "dž", "LJ", "NJ", "DŽ"];
  digraphs.forEach((digraph) => {
    const cyrillic = `|-__${latinToCyrillicMap[digraph]}__-|`;
    const regex = new RegExp(digraph, "g");
    value = value.replace(regex, cyrillic);
  });

  // Convert the rest of the characters
  value = value
    .split("")
    .map((char) => latinToCyrillicMap[char] || cyrillicToLatinMap[char] || char)
    .join("");

  digraphs.forEach((digraph) => {
    const cyrillic = latinToCyrillicMap[digraph];
    const regex = new RegExp(digraph, "g");
    value = value.replace(regex, cyrillic);
  });

  value = value.replace(/\|-__/g, "");
  value = value.replace(/__-\|/g, "");

  skip.forEach((s, i) => {
    value = value.replace(`$${i}`, s);
  });

  return value;
}
