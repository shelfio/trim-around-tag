module.exports = {
  presets: [
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: '8.10',
          browsers: [
            'last 4 chrome versions',
            'last 4 firefox versions',
            'last 2 edge versions',
            'last 2 safari versions',
            'ie >= 11'
          ]
        }
      }
    ]
  ]
};
