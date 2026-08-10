const productionApiUrl = "https://pragati-backend.com";

export const apiBaseUrl = (
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === "production" ? productionApiUrl : "")
).replace(/\/$/, "");

let isConfigured = false;

export const configureApiFetch = () => {
  if (!apiBaseUrl || isConfigured) return;

  const originalFetch = window.fetch.bind(window);

  window.fetch = (resource, options) => {
    const isRootRelativeUrl =
      typeof resource === "string" &&
      resource.startsWith("/") &&
      !resource.startsWith("//");

    return originalFetch(
      isRootRelativeUrl ? `${apiBaseUrl}${resource}` : resource,
      options
    );
  };

  isConfigured = true;
};
