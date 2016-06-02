/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map: any = {
    'reward': 'reward',
    'moment': 'vendor/moment/moment.js',
    'lodash': 'vendor/lodash/lodash.js',
    'ts-md5/dist/md5': 'vendor/ts-md5/dist/md5.js',
    'ng2-uploader': 'vendor/ng2-uploader',
    'json5': 'vendor/json5/lib/json5.js',
    'ng2-bootstrap': 'vendor/ng2-bootstrap',
};
/** User packages configuration. */
var packages: any = {
    'ng2-uploader': {
      main: 'ng2-uploader.js',
      defaultExtension: 'js'
    },
    'ng2-bootstrap': {
      main: 'ng2-bootstrap.js',
      defaultExtension: 'js'
    }
};

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
var barrels: string[] = [
    // Angular specific barrels.
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/http',
    '@angular/router',
    '@angular/router-deprecated',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/upgrade',
    // Thirdparty barrels.
    'rxjs',
    'reward',
    // 'jsonify',
    /** @cli-barrel */
];

var cliSystemConfigPackages: any = {};

barrels.forEach((barrelName: string) => {
    cliSystemConfigPackages[barrelName] = { main: 'index.js', defaultExtension: 'js' };
});


/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
    baseURL: "/rewardredirect/",
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js',
    },
    packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });
