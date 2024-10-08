const EleventyFetch = require("@11ty/eleventy-fetch");
require('dotenv').config(); // Load environment variables from .env file

module.exports = async function() {
  const repoOwner = 'icegulch'; 
  const repoName = '2017-crs-manual';
  const token = process.env.GITHUB_TOKEN; // Access the token

  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;

  // Use eleventy-fetch to fetch and cache the data
  try {
    const json = await EleventyFetch(url, {
      duration: "1s", // Cache the data for 1 day
      type: "json", // The expected data type
      fetchOptions: {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    });

    // Return only the necessary issue data
    /*
    return json.map(issue => ({
      id: issue.id,
      title: issue.title,
      body: issue.body,
      url: issue.html_url,
      state: issue.state
    }));
    */

    return json; // Returning the full JSON for now

  } catch (error) {
    console.error("Error fetching GitHub Issues:", error);
    return [];
  }
};
