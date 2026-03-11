import { useEffect } from 'react';

export function useSEO(title: string, description: string, url: string) {
  useEffect(() => {
    document.title = title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    let metaUrl = document.querySelector('meta[property="og:url"]');
    if (!metaUrl) {
      metaUrl = document.createElement('meta');
      metaUrl.setAttribute('property', 'og:url');
      document.head.appendChild(metaUrl);
    }
    metaUrl.setAttribute('content', url);

    return () => {
      document.title = 'Resistance Calculator';
    };
  }, [title, description, url]);
}
