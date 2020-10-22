import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Show = () => {
  const { id } = useParams();
  // console.log('params', params)

  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);

    fetch(`https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(response => response.json())
      .then(data => {
        if (isMounted) {
          setShow(data);
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (isMounted) {
          setError(error.message);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>Data is being loaded!</div>;
  }

  if (error) {
    return <div>Error occurred: {error}</div>;
  }

  return <div>show page</div>;
};

export default Show;
