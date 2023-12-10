import { Feed } from '../components/FeedPreview';
import { atom, useAtom } from 'jotai';

export const feedIndexAtom = atom<number | null>(null);

export const useFeed = (feeds: Feed[]) => {
  const [feedIndex, setFeedIndex] = useAtom(feedIndexAtom);

  const nextFeed = () => {
    if (feedIndex == null) return;

    if (feedIndex + 1 < feeds.length) {
      setFeedIndex(feedIndex + 1);
    }
  };

  const previousFeed = () => {
    if (feedIndex == null) return;

    if (feedIndex > 0) {
      setFeedIndex(feedIndex - 1);
    }
  };

  const closeFeed = () => {
    setFeedIndex(null);
  };

  return {
    nextFeed,
    previousFeed,
    closeFeed,
    feedIndex,
    setFeedIndex
  };
};
