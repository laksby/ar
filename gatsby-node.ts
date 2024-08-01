import { GatsbyNode } from 'gatsby';

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = args => {
  if (args.stage === 'build-html' || args.stage === 'develop-html') {
    args.actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /@ar-js-org\/ar.js/,
            use: args.loaders.null(),
          },
        ],
      },
    });
  }
};
