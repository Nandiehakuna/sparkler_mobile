import api, { NewQuote } from '../api/sparkles';

export default () => {
  const handleQuote = async (quote: NewQuote) => await api.quoteSparkle(quote);

  return { handleQuote };
};
