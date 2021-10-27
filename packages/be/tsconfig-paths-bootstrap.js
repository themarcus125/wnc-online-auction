const tsConfigPaths = require('tsconfig-paths');

const paths = {
  '@/*': ['./src/*'],
  '~/*': ['./*'],
};

tsConfigPaths.register({ baseUrl: './dist', paths });
