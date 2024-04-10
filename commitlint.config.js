module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
        'config',
        'swagger'
      ]
    ],
    'header-max-length': [1, 'always', 150],
    'subject-case': [0]
  }
};
