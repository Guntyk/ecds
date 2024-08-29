import { importantKeywords } from 'constants/importantKeywords';
import { importantTags } from 'constants/importantTags';

export const calculateRelevanceScore = ({ title, publicationDate, tags, views }) => {
  const today = new Date();
  const constructorPublicationDate = new Date(publicationDate);

  const maxDays = 30;
  const keywordPoints = 2;
  const tagPoints = 1.5;
  const recencyWeight = 0.3;
  const viewsWeight = 0.3;
  const tagsWeight = 0.2;
  const keywordsWeight = 0.2;

  const daysSincePublication = (today - constructorPublicationDate) / (1000 * 60 * 60 * 24);

  const recencyScore = daysSincePublication <= maxDays ? (maxDays - daysSincePublication) / maxDays : 0;

  const viewsScore = Math.log1p(parseInt(views) || 0);

  let tagsScore = 0;
  if (tags) {
    tagsScore = tags.reduce((score, tag) => {
      if (importantTags.includes(tag.tag)) {
        return score + tagPoints;
      }
      return score;
    }, 0);
  }

  let keywordsScore = 0;
  const titleWords = title.split(/\s+/);
  importantKeywords.forEach((keyword) => {
    if (titleWords.some((word) => word.toLowerCase() === keyword.toLowerCase())) {
      keywordsScore += keywordPoints;
    }
  });

  const relevanceScore =
    recencyScore * recencyWeight + viewsScore * viewsWeight + tagsScore * tagsWeight + keywordsScore * keywordsWeight;

  return parseFloat(relevanceScore.toFixed(10));
};
