export const handler = async (event) => {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_OWNER = process.env.GITHUB_OWNER;
  const GITHUB_REPO = process.env.GITHUB_REPO;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/dispatches`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_type: 'shopify-product-update',
        }),
      }
    );

    if (response.ok || response.status === 204) {
      console.log('GitHub Actions triggered successfully');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Rebuild triggered' }),
      };
    } else {
      const text = await response.text();
      console.error('GitHub API error:', text);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to trigger rebuild' }),
      };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
