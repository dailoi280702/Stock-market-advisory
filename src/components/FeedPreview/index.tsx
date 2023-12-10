export interface Feed {
  title: string;
  url: string;
  time_published: string;
  authors: string[];
  summary: string;
  banner_image: string;
  source: string;
  category_within_source: string;
  source_domain: string;
  topics: {
    topic: string;
    relevance_score: string;
  }[];
  overall_sentiment_score: number;
  overall_sentiment_label: string;
  ticker_sentiment: {
    ticker: string;
    relevance_score: string;
    ticker_sentiment_score: number;
    ticker_sentiment_label: string;
  }[];
}

const FeedPreview = ({ feed }: { feed: Feed }) => {
  return (
    <div className="rounded-2xl p-2 bg-white border border-1 border-neutral-200 shadow-lg w-full h-full flex flex-col">
      <h2 className="text-lg font-medium line-clamp-3">{feed.title}</h2>
      <p className="flex-1" />
      <img
        className="rounded-lg border-1 border-neutral-100 overflow-hidden aspect-[16/9] object-cover"
        src={feed.banner_image}
      ></img>
    </div>
  );
};

export default FeedPreview;
