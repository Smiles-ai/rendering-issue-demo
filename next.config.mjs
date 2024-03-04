// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

// module.exports = withBundleAnalyzer({
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['in', 'default'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'superblog.supercdn.cloud',
      },
    ],
    domains: [
      'www.datocms-assets.com',
      'data-doc32.s3.ap-south-1.amazonaws.com',
      'via.placeholder.com',
    ],
  },
  async rewrites() {
    return {
      afterFiles: [],
      beforeFiles: [
        {
          source: '/dental-care',
          destination: 'https://dezydentalcare.superblog.cloud/',
        },
        {
          source: '/dental-care/:slug*',
          destination: 'https://dezydentalcare.superblog.cloud/:slug*',
        },
        {
          source: '/_elderjs/svelte/:slug*',
          destination:
            'https://dezydentalcare.superblog.cloud/_elderjs/svelte/:slug*',
        },
        {
          source: '/.netlify/functions/:slug*',
          destination:
            'https://dezydentalcare.superblog.cloud/.netlify/functions/:slug*',
        },
        {
          source: '/blogs',
          destination: 'https://dezy.superblog.cloud/',
        },
        {
          source: '/blogs/:slug*',
          destination: 'https://dezy.superblog.cloud/:slug*',
        },

        {
          source: '/_elderjs/svelte/:slug*',
          destination: 'https://dezy.superblog.cloud/_elderjs/svelte/:slug*',
        },

        {
          source: '/.netlify/functions/:slug*',
          destination: 'https://dezy.superblog.cloud/.netlify/functions/:slug*',
        },
      ],
    };
  },
};

// const configWithSEntryWizard = withSentryConfig(
//   nextConfig,
//   {
//     // For all available options, see:
//     // https://github.com/getsentry/sentry-webpack-plugin#options

//     // Suppresses source map uploading logs during build
//     silent: true,
//     org: 'abita-innovations',
//     project: 'dezy',
//   },
//   {
//     // For all available options, see:
//     // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

//     // Upload a larger set of source maps for prettier stack traces (increases build time)
//     widenClientFileUpload: true,

//     // Transpiles SDK to be compatible with IE11 (increases bundle size)
//     transpileClientSDK: true,

//     // Hides source maps from generated client bundles
//     hideSourceMaps: true,

//     // Automatically tree-shake Sentry logger statements to reduce bundle size
//     disableLogger: true,
//   },
// );

// export default million.next(configWithSEntryWizard, millionConfig);

export default nextConfig;
