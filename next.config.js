/** @type { import('next').NextConfig } */
module.exports = {
  compress: false,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { disableStaticImages: true },
  eslint: { ignoreDuringBuilds: true },
  webpack(config, { isServer }) {
    if (!isServer) {
      const getEntry = config.entry;

      config.entry = async () => {
        const entry = await getEntry();

        entry['main.js']?.push('polyfills.ts');

        return entry;
      };
    }

    config.module.rules = [
      ...config.module.rules,
      {
        test: /\.svg$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                  {
                    name: 'prefixIds',
                    active: false,
                  },
                  {
                    name: 'mergePaths',
                    active: false,
                  },
                ],
              },
              memo: true,
              ref: true,
            },
          },
          {
            loader: 'file-loader',
            options: {
              esModule: true,
              outputPath: 'static/svg',
              publicPath: '/_next/static/svg',
              emitFile: !isServer,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'responsive-loader',
            options: {
              adapter: require('responsive-loader/sharp'),
              esModule: true,
              sizes: [320, 640, 960, 1200, 1800, 2400],
              outputPath: 'static/image',
              publicPath: '/_next/static/image',
              emitFile: !isServer,
            },
          },
        ],
      },
    ];

    return config;
  },
};
