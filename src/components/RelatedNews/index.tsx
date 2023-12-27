import { useRelatedNews } from 'hooks/useRelatedNews';
import moment from 'moment';
import { HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  watchlist: Watchlist;
} & HTMLAttributes<HTMLDivElement>;

const RelatedNews = ({ watchlist, ...divProps }: Props) => {
  const newsState = useRelatedNews(watchlist.watchlist);

  return (
    <div {...divProps}>
      <h3 className="text-base mb-4">Your watchlist in the news</h3>
      {newsState.state === 'success' && (
        <>
          {newsState.data.slice(0, 10).map((feed) => (
            <div
              key={feed.title}
              className="py-4 border-t border-t-neutral-300 flex justify-between gap-2"
            >
              <div>
                <div className="flex items-center gap-2 text-neutral-600 text-xs">
                  {feed.source} - {moment(feed.time_published, 'YYYYMMDD hhmmss').fromNow()}
                </div>

                <Link to={feed.url} className="text-sm mt-2">
                  {feed.title}
                </Link>
              </div>

              <img
                src={feed.banner_image}
                className="rounded-lg overflow-hidden aspect-[3/2] h-24 min-w-min"
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default RelatedNews;
