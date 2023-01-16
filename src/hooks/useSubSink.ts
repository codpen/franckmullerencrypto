import createSubSink from 'helpers/createSubSink';
import { useEffect, useMemo } from 'react';

const useSubSink = () => {
  const subSink = useMemo(() => createSubSink(), []);

  useEffect(() => {
    return () => subSink.unsubscribe();
  }, [subSink]);

  return subSink;
};

export default useSubSink;
