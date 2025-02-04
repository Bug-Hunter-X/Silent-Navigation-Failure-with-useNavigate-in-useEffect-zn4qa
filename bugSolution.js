```javascript
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function MyComponent() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.error) {
          navigate('/error');
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>Data loaded successfully</div>
  );
}

export default MyComponent;
```