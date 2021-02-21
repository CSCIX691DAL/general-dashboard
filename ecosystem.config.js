module.exports = {
  apps : [{
    script: 'bin/www',
    watch: '.'
  }],

  deploy : {
    production : {
      user : 'deploy',
      host : 'general-dashboard.nfagan.com',
	  key  : './GeneralDashboard',
      ref  : 'origin/continuous-delivery',
      repo : 'https://github.com/CSCIX691DAL/general-dashboard.git',
      path : '/home/deploy/general-dashboard',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && ng build --prod && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
