import React, { useEffect, useState } from "react";
import { BuilderComponent, builder, useIsPreviewing } from "@builder.io/react";
import AppState from "../../AppState"; 

interface Page {
    uri: string;
    name: string;
}

interface PageTemplateProps {
  page: Page;
}

// Put your API key here
const apiKey = AppState.getBuilderApiKey();
if (apiKey) {
    builder.init(apiKey);
}

const PageTemplate: React.FC<PageTemplateProps> = ({ page }) => {
  const isPreviewingInBuilder = useIsPreviewing();
  const [notFound, setNotFound] = useState(false);
  const [content, setContent] = useState({}); // Set initial state to {}

  useEffect(() => {
    async function fetchContent() {
      const fetchedContent = await builder
        .get("page", {
          url: "/home"// Use the page URI from props
        })
        .promise();
        console.log(fetchedContent);
      setContent(fetchedContent);
      setNotFound(!fetchedContent);
    }
    fetchContent();
  }, [page.uri]); // Watch for changes in page.uri

  // Handle not found or empty content
  if (notFound || Object.keys(content).length === 0) {
    // You can render a placeholder or handle the case as needed
    return <div>Page not found or content not available</div>;
  }

  // return the page when found
  return (
    <>
      {/* Render the Builder page */}
      <BuilderComponent model="page" content={content} />
    </>
  );
};

export default PageTemplate;
