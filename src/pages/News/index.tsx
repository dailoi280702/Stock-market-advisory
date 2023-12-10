import { useLoaderData } from 'react-router-dom';
import FeedPreview, { Feed } from '../../components/FeedPreview';

const News = () => {
  const data = useLoaderData() as { feed: Feed[] };
  const feeds = data.feed;

  return (
    <div className="w-full max-w-screen-xl mx-auto">
      <ul className="grid grid-cols-2 gap-4 px-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {feeds.map((feed, i) => (
          <FeedPreview key={feed.url + String(i)} feed={feed} />
        ))}
      </ul>
    </div>
  );
};

export default News;
