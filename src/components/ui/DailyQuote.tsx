'use client'
import React, { useEffect, useState } from 'react';

type Quote = {
  q: string;
  a: string;
};

const fallbackQuote: Quote = {
  q: 'Study hard, for the well is deep, and our brains are shallow.',
  a: 'Richard Baxter'
};
const DailyQuote: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fetchRandomQuote = async () => {
    try {
      const response = await fetch('context/quotes.json');
      if (!response.ok) throw new Error('Failed to load quotes');

      const data: Quote[] = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Quote list is empty or invalid');
      }

      const random = data[Math.floor(Math.random() * data.length)];
      setQuote(random);
      setError(null);
    } catch (err: any) {
      setQuote(fallbackQuote);
    }
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);


  return (
    <div className='text-center mt-2 rounded-xl '>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {quote ? (
        <div>
          <p style={{ fontStyle: 'italic' }}>"{quote.q}"</p>
          <p>— <strong>{quote.a}</strong></p>
        </div>
      ) : (
        !error && <p>Cooking...</p>
      )}
    </div>
  );
};

export default DailyQuote;