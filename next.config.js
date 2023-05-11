const withGitHubPages = require('gh-pages');
/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withGitHubPages({
    basePath: '/cypher-watchlist', // Replace <repository-name> with your GitHub repository name
});
