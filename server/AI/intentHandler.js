import intents from "./intents.js";
import levenshtein from "fast-levenshtein";


// ================= NORMALIZE =================
function normalizeText(text) {

  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}


// ================= FUZZY =================
function fuzzyMatch(message, keyword) {

  const words = message.split(" ");

  for (const word of words) {

    const distance =
      levenshtein.get(word, keyword);

    if (distance <= 2) {
      return true;
    }
  }

  return false;
}


// ================= DETECT =================
export function detectIntents(message) {

  const cleanMsg =
    normalizeText(message);

  let bestIntent = "fallback";
  let highestScore = 0;

  for (const intentName in intents) {

    const intent = intents[intentName];

    if (!intent.keywords) continue;

    let score = 0;

    for (const keyword of intent.keywords) {

      const cleanKeyword =
        normalizeText(keyword);

      // EXACT PHRASE MATCH ONLY
      if (cleanMsg.includes(cleanKeyword)) {

        score += cleanKeyword.length;
      }
    }

    console.log(intentName, score);

    if (score > highestScore) {

      highestScore = score;
      bestIntent = intentName;
    }
  }

  console.log("BEST:", bestIntent);

  if (highestScore === 0) {
    return ["fallback"];
  }

  return [bestIntent];
}


// ================= REPLY =================
export function getReplies(intentList) {

  const intentName = intentList[0];

  const intent = intents[intentName];

  if (
    !intent ||
    !intent.responses
  ) {
    return "Mình chưa hiểu ý bạn.";
  }

  return intent.responses[0];
}


// ================= FALLBACK =================
export function isFallback(intentList) {

  return intentList.includes("fallback");
}