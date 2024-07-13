import React, { useEffect } from 'react';
import * as RadixProgress from '@radix-ui/react-progress'; // Rename the import alias
import './Progress.css';

const ProgressComponent = () => {
  const [progress, setProgress] = React.useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <RadixProgress.Root className="ProgressRoot" value={progress}>
      <RadixProgress.Indicator
        className="ProgressIndicator"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </RadixProgress.Root>
  );
};

export default ProgressComponent;
  