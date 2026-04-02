import { contentData } from "./contentData";

export function getChapterName(contentId) {
  return contentData[contentId]?.title || `Chapter ${contentId}`;
}