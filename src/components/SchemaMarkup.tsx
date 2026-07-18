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
      "name": "Hafiz Amir Shahzad | SEO Content Writer",
      "author": {
        "@type": "Person",
        "name": "Hafiz Amir Shahzad",
      }
    };

    let pageTitle = "Hafiz Amir Shahzad | SEO Expert & Content Writer";
    let metaDesc = "Welcome to the portfolio of Hafiz Amir Shahzad, a professional SEO Expert and Content Writer helping businesses rank higher.";

    if (currentPage === 'about' || currentPage === 'resume') {
      pageTitle = "About Hafiz Amir Shahzad | SEO Expert";
      metaDesc = "Learn more about Hafiz Amir Shahzad, his experience, and his passion for SEO and content writing.";
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
      pageTitle = "SEO Services | Hafiz Amir Shahzad";
      metaDesc = "Explore professional SEO content writing services by Hafiz Amir Shahzad. Boost your rankings and traffic.";
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
      pageTitle = "Contact Hafiz Amir Shahzad";
      metaDesc = "Get in touch with Hafiz Amir Shahzad for inquiries, quotes, or to discuss your SEO and content needs.";
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "url": "https://hafizamirshahzad.site/?page=contact"
      };
    } else if (currentPage === 'pricing') {
      pageTitle = "Pricing | Hafiz Amir Shahzad";
      metaDesc = "View pricing details for professional SEO content writing and optimization services.";
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "ItemPage",
        "name": "Pricing for SEO Content Services",
        "url": "https://hafizamirshahzad.site/?page=pricing"
      };
    } else if (currentPage === 'blog' && blogPost) {
      pageTitle = `${blogPost.title} | Hafiz Amir Shahzad`;
      metaDesc = blogPost.excerpt || "Read the latest insights and SEO tips from Hafiz Amir Shahzad.";
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
    } else if (currentPage === 'blog') {
      pageTitle = "Blog | Hafiz Amir Shahzad";
      metaDesc = "Read the latest insights, strategies, and tips on SEO and content writing.";
    } else if (currentPage === 'library') {
      pageTitle = "Brief Library | Hafiz Amir Shahzad";
      metaDesc = "Explore a library of SEO briefs, outlines, and content strategies.";
    } else if (currentPage === 'detail' && briefItem) {
      pageTitle = `${briefItem.keyword} | Hafiz Amir Shahzad`;
      metaDesc = `SEO strategy and details for ${briefItem.keyword}.`;
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
    } else if (currentPage === 'portfolio') {
      pageTitle = "Portfolio | Hafiz Amir Shahzad";
      metaDesc = "View the portfolio and past projects of Hafiz Amir Shahzad.";
    }

    // Set Document Title
    document.title = pageTitle;

    // Set Meta Description
    let metaDescEl = document.querySelector('meta[name="description"]');
    if (!metaDescEl) {
      metaDescEl = document.createElement('meta');
      metaDescEl.setAttribute('name', 'description');
      document.head.appendChild(metaDescEl);
    }
    metaDescEl.setAttribute('content', metaDesc);

    // Set JSON-LD Schema
    const scriptId = 'dynamic-schema-markup';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.textContent = JSON.stringify(schemaObj, null, 2);

  }, [currentPage, blogPost, briefItem]);

  return null;
};

export default SchemaMarkup;
