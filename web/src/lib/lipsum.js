import { loremIpsum } from "react-lorem-ipsum";

export function lipsum(paragraphs = 6, avgSentencesPerParagraph = 4) {
  return loremIpsum({
    p: paragraphs,
    avgWordsPerSentence: 15,
    avgSentencesPerParagraph,
    startWithLoremIpsum: false,
    random: true,
  });
}
