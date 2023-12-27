import moment from 'moment';
import { useFeed } from '../../hooks/useFeed';
import { Feed } from '../FeedPreview';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LinkIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Detail = ({ feed, feeds }: { feed: Feed; feeds: Feed[] }) => {
  const { previousFeed, nextFeed, feedIndex, closeFeed } = useFeed(feeds);
  return (
    <div className="">
      <div className="flex items-center">
        <button
          className="h-10 w-10 border-2 border-neutral-400 rounded-lg hover:bg-neutral-600/10 transition-colors"
          onClick={previousFeed}
          disabled={feedIndex == 0}
        >
          <ChevronLeftIcon className="h-6 w-6 m-auto stroke-2" />
        </button>
        <span className="px-1" />
        <button
          className="h-10 w-10 border-2 border-neutral-400 rounded-lg hover:bg-neutral-900/10 transition-colors"
          onClick={nextFeed}
          disabled={feedIndex == feeds.length - 1}
        >
          <ChevronRightIcon className="h-6 w-6 m-auto stroke-2" />
        </button>
        <span className="flex-1" />
        <button
          className="h-10 w-10 rounded-lg hover:bg-neutral-900/10 transition-colors"
          onClick={closeFeed}
        >
          <XMarkIcon className="h-6 w-6 m-auto stroke-2" />
        </button>
      </div>

      {feed.authors && feed.authors.length > 0 && (
        <p className="mt-3 text-sm font-medium">by {feed.authors.join(', ')}</p>
      )}

      <h3 className="my-3 text-2xl font-bold">{feed.title}</h3>
      <p className="text-base">
        <span className="font-bold">TRDR </span> - {feed.summary}
      </p>

      {feed.topics && feed.topics.length > 0 && (
        <ul className="flex items-center flex-wrap my-3 gap-2">
          {feed.topics.map((topic) => (
            <div
              key={topic.topic}
              className="px-4 h-6 text-sm rounded-lg bg-neutral-900/10 text-center flex items-center"
            >
              <p className="my-auto">{topic.topic}</p>
            </div>
          ))}
        </ul>
      )}

      <div className="flex items-center justify-between mt-3 flex-wrap">
        <p className="text-sm font-medium mr-4">
          {moment(feed.time_published, 'YYYYMMDD hhmmss').fromNow()}
        </p>
        <Link to={'https://' + feed.source_domain}>
          <p className="text-sm font-medium">
            published on <span className="text-blue-600">{feed.source}</span>
          </p>
        </Link>
      </div>

      <Link to={feed.url} className="relative group">
        <img
          className="rounded-lg border-1 border-neutral-100 overflow-hidden object-cover cursor-pointer mt-6"
          src={feed.banner_image}
        />
        <div className="absolute inset-0 flex items-center justify-center group-hover:bg-white/5 group-hover:backdrop-blur-sm rounded-lg transition-all">
          <button className="hidden group-hover:flex items-center m-auto h-10 bg-blue-600 pl-3 pr-4 rounded-lg text-white text-sm font-medium shadow-2xl border border-blue-900 transition-all">
            <LinkIcon className="h-6 w-6 stroke-2 mr-2" />
            Read more
          </button>
        </div>
      </Link>
    </div>
  );
};

const Feeds = ({ feeds }: { feeds: Feed[] }) => {
  const { feedIndex } = useFeed(feeds);

  return (
    <>
      {feedIndex != null && feeds[feedIndex] && (
        <div className="bg-white/10 backdrop-blur overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full flex items-center flex-col transition-all">
          <div className="w-full max-w-screen-md h-full md:h-auto mx-auto my-auto bg-white md:rounded-lg p-4 md:p-8 md:border md:border-neutral-300 md:shadow-lg">
            <Detail feed={feeds[feedIndex]} feeds={feeds} />
          </div>
        </div>
      )}
    </>
  );
};

export default Feeds;
