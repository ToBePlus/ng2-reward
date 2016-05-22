/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
var map: any = {
  'moment': 'vendor/moment/moment.js',
  'lodash': 'vendor/lodash/lodash.js',
  'ts-md5/dist/md5': 'vendor/ts-md5/dist/md5.js'
};
/** User packages configuration. */
var packages: any = {
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
    // Thirdparty barrels.
    'rxjs',
    'reward',
    /** @cli-barrel */
];

var cliSystemConfigPackages: any = {};

barrels.forEach((barrelName: string) => {
    cliSystemConfigPackages[barrelName] = {main:'index.js', defaultExtension:'js'};
});


/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
    // baseURL: "",
    map: {
        '@angular': 'vendor/@angular',
        'rxjs': 'vendor/rxjs',
        'main': 'main.js'
    },
    packages: cliSystemConfigPackages,
    // meta: { lodash: { format: 'amd' }}
});

    // Apply the user's configuration.
System.config({ map, packages });
