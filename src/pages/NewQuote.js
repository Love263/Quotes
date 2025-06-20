import QuoteForm from '../components/quotes/QuoteForm';
import { useNavigate } from 'react-router';
import { addQuote } from '../lib/api';
import useHttp from '../hooks/use-http';
import { useEffect } from 'react';

const NewQuote = () => {
  const {sendRequest, status} = useHttp(addQuote)
  const navigate = useNavigate();
  useEffect(() => {
    if(status === 'completed'){
      navigate('/quotes');
    }
  },[status, navigate])

  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);
    sendRequest(quoteData)
  };

  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
