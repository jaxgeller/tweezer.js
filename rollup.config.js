import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'

const info = require('./package.json')

const config = [
  {
    input: 'src/tweezer.js',
    plugins: [
      resolve(),
      babel({
        babelrc: false,
        presets: [
          [
            'env', {
              modules: false,
              targets: {
                browsers: ['last 2 versions']
              }
            }
          ]
        ]
      })
    ],
    output: [
      {
        file: info.main,
        format: 'umd',
        name: 'Tweezer'
      }, {
        file: info.module,
        format: 'es'
      }
    ]
  },
  {
    input: 'src/multi-tweener.js',
    plugins: [
      resolve(),
      babel({
        babelrc: false,
        presets: [
          [
            'env', {
              modules: false,
              targets: {
                browsers: ['last 2 versions']
              }
            }
          ]
        ]
      })
    ],
    output: [
      {
        file: './dist/multi-tweener.js',
        format: 'umd',
        name: 'TweezerTweener'
      }, {
        file: './dist/multi-tweener.module.js',
        format: 'es'
      }
    ]
  }
]

export default config
