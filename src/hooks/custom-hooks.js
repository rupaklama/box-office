import { useState, useRef, useEffect, useCallback } from 'react';

// data persistence 
export const useLastQuery = (key = 'lastQuery') => {

  // lazy evaluation is to set the initial state
  const [input, setInput] = useState(() => {
    // inside this callback whatever is returned will be set as initial state
    const persisted = sessionStorage.getItem(key);

    // to store in local storage
    // const persisted = localStorage.getItem(key)

    return persisted ? JSON.parse(persisted) : '';
  });

  // setter function to update state because setInput not work with sessionStorage
  // input value from home component
  const setPersistedInput = useCallback(newState => {
    setInput(newState)
    sessionStorage.setItem(key, JSON.stringify(newState))
  }, [key])

  // this custom hook will return 
  return [input, setPersistedInput]
}

// JSON. parse() takes a JSON string and transforms it into a JavaScript object. 
// JSON. stringify() takes a JavaScript object and transforms it into a JSON string.


// This hook makes it easy to see which prop changes are causing a component to re-render. 
export function useWhyDidYouUpdate(name, props) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach(key => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key]
          };
        }
      });

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj);
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}