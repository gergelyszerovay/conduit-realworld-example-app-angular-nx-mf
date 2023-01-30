module.exports = {
  name: 'mf-user',
  exposes: {
    './AuthFeatureSignInComponent': 'apps/mf-user/src/app/app.module.ts',
    './AuthFeatureSignUpComponent': 'apps/mf-user/src/app/app.module.ts',
    './AuthFeatureSettingsComponent': 'apps/mf-user/src/app/app.module.ts',
  },
};
