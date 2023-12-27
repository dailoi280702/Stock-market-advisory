import { Feed } from 'components/FeedPreview';
import { ServerState } from './useWishlist';
import { useEffect, useState } from 'react';

export const useRelatedNews = (tickers: string[]) => {
  const [serverState, setServerState] = useState<ServerState<Feed[]>>({ state: 'loading' });

  useEffect(() => {
    if (serverState.state === 'loading') {
      const fetchNews = async () => {
        try {
          // Construct the URL for fetching news based on the provided tickers
          // const tickersQueryParam = tickers.join(',');
          const tickersQueryParam = ['AAPL'];
          const apiUrl = `https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${tickersQueryParam}&apikey=demo`;

          const response = await fetch(apiUrl);
          const data = await response.json();

          if (response.ok) {
            setServerState({
              state: 'success',
              data: data?.feed || [] // Assuming the news is in the 'feed' property of the response
            });
          } else {
            console.log('Error fetching news');
            setServerState({ state: 'error', error: new Error('Error fetching news') });
          }
        } catch (e) {
          console.error(e);
          setServerState({ state: 'error', error: e as Error });
        }
      };

      fetchNews();
    }
  }, [tickers, serverState]);

  return serverState;
};
