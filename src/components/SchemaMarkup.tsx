import React, { useEffect } from 'react';
import { ActivePage, BlogPost, ArticleBrief } from '../types';

interface SchemaMarkupProps {
  currentPage: ActivePage;
  blogPost?: BlogPost | null;
  briefItem?: ArticleBrief | null;
}

const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ currentPage, blogPost, briefItem }) => {
  useEffect(() => {
    let schemaObj: any = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "url": "https://hafizamirshahzad.site/",
      "name": "Hafiz Amir Shahzad",
      "author": {
        "@type": "Person",
        "name": "Hafiz Amir Shahzad",
      }
    };

    if (currentPage === 'about' || currentPage === 'resume') {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
          "@type": "Person",
          "name": "Hafiz Amir Shahzad",
          "url": "https://hafizamirshahzad.site/?page=about",
          "jobTitle": "Professional Writer & SEO Expert"
        }
      };
    } else if (currentPage === 'services') {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Service",
        "serviceType": "SEO Content Writing",
        "provider": {
          "@type": "Person",
          "name": "Hafiz Amir Shahzad"
        }
      };
    } else if (currentPage === 'contact') {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "url": "https://hafizamirshahzad.site/?page=contact"
      };
    } else if (currentPage === 'pricing') {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "ItemPage",
        "name": "Pricing for SEO Content Services",
        "url": "https://hafizamirshahzad.site/?page=pricing"
      };
    } else if (currentPage === 'blog' && blogPost) {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blogPost.title,
        "description": blogPost.excerpt,
        "author": {
          "@type": "Person",
          "name": "Hafiz Amir Shahzad"
        },
        "datePublished": blogPost.date,
        "url": `https://hafizamirshahzad.site/?page=blog&post=${blogPost.id}`
      };
    } else if (currentPage === 'detail' && briefItem) {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": briefItem.keyword,
        "author": {
          "@type": "Person",
          "name": "Hafiz Amir Shahzad"
        },
        "datePublished": briefItem.dateCreated,
        "url": `https://hafizamirshahzad.site/?brief=${briefItem.id}`
      };
    }

    const scriptId = 'dynamic-schema-markup';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;

    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    scriptElement.textContent = JSON.stringify(schemaObj, null, 2);

    return () => {
      // Optional: Cleanup on unmount if needed, but keeping it updated is usually better
    };
  }, [currentPage, blogPost, briefItem]);

  return null;
};

export default SchemaMarkup;
