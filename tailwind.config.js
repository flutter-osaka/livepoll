module.exports = {
  theme: {
    borderColor: () => ({
      primary: '#007bc7'
    })
  },

  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true
  },

  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.ts',
      'nuxt.config.ts'
    ]
  }
}
