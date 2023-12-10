import { useLoaderData } from 'react-router-dom';
import FeedPreview, { Feed } from '../../components/FeedPreview';
import Feeds from '../../components/Feeds';
import { useFeed } from '../../hooks/useFeed';

const News = () => {
  const data = useLoaderData() as { feed: Feed[] };
  const feeds = data.feed;
  const { setFeedIndex } = useFeed(feeds);

  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto">
        <p className="text-lg font-bold m-4">Market News</p>
        <ul className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {feeds.map((feed, i) => (
            <FeedPreview key={feed.url + String(i)} feed={feed} onClick={() => setFeedIndex(i)} />
          ))}
        </ul>
      </div>
      <Feeds feeds={feeds} />
    </>
  );
};

export default News;
