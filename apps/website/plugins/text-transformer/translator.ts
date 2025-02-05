export type TranslationResult = Map<string, { [key: string]: string }>;

export default async function translate(
  toTranslate: Set<string>
): Promise<TranslationResult> {
  const translations: TranslationResult = new Map();

  const translationPromises = Array.from(toTranslate).map(
    async (originalValue) => {
      translations.set(
        originalValue,
        await translateSingeValueUsingLocal(originalValue)
      );
    }
  );

  await Promise.all(translationPromises);
  return translations;
}

const localTranslatorLanguageOptions = ["sr-lat", "sr-cyr"] as const;

export async function translateSingeValueUsingLocal(originalValue: string) {
  const newTranslations: { [key: string]: string } = {};

  await Promise.all(
    localTranslatorLanguageOptions.map(async (key) => {
      const translator = translators[key];
      newTranslations[key] = await translator(originalValue);
    })
  );

  return newTranslations;
}

async function getLibreTranslation<T extends string | string[]>(
  value: T,
  source: string,
  target: string
): Promise<T> {
  try {
    const response = await fetch("http://127.0.0.1:5000/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: value,
        source,
        target,
      }),
    });

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error(`HTTP request failed for ${source}->${target}`, error);
    return value;
  }
}

export async function translateUsingLibre(
  values: string[],
  lang: string,
  jsxCount: number,
  jsxTranslations: TranslationResult,
  jsonTranslations: TranslationResult
) {
  const translations = await getLibreTranslation(values, "sr", lang);

  for (let i = 0; i < jsxCount; i++) {
    const value = values[i];
    const translation = translations[i];

    const current = jsxTranslations.get(value);
    jsxTranslations.set(value, { ...current, [lang]: translation });
  }

  for (let i = jsxCount; i < values.length; i++) {
    const value = values[i];
    const translation = translations[i];

    const current = jsonTranslations.get(value);
    jsonTranslations.set(value, { ...current, [lang]: translation });
  }
}

const translators: {
  [key: string]: (value: string) => Promise<string>;
} = {
  "sr-lat": (value) => Promise.resolve(value),
  "sr-cyr": (value) =>
    new Promise((resolve) => {
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

      // Handle special cases for digraphs first
      const digraphs = ["Lj", "lj", "Nj", "nj", "Dž", "dž", "LJ", "NJ", "DŽ"];
      digraphs.forEach((digraph) => {
        const cyrillic =
          latinToCyrillicMap[digraph as keyof typeof latinToCyrillicMap];
        const regex = new RegExp(digraph, "g");
        value = value.replace(regex, cyrillic);
      });

      // Convert the rest of the characters
      resolve(
        value
          .split("")
          .map(
            (char) =>
              latinToCyrillicMap[char as keyof typeof latinToCyrillicMap] ||
              char
          )
          .join("")
      );
    }),
};

