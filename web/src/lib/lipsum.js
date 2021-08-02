import { loremIpsum } from "react-lorem-ipsum";

export function lipsum(paragraphs = 6) {
  return loremIpsum({
    p: paragraphs,
    avgWordsPerSentence: 15,
    avgSentencesPerParagraph: 4,
    startWithLoremIpsum: false,
    random: true,
  });
}
