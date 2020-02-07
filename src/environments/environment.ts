// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
	baseHref: '/',
  API_URL: 'https://9v41bpikik.execute-api.us-east-1.amazonaws.com/dev/api/',
  base64encode: 'https://nexgen.influxiq.com/php/index.php?encode=encodefile',
  uploadurl: 'http://nexgen.influxiq.com/php/index.php',
    // nodesslurl : 'https://dev.api.influxhostserver.com/',
  nodesslurl : 'https://9v41bpikik.execute-api.us-east-1.amazonaws.com/dev/api/',
  download_url : 'https://api.influxhostserver.com/download',
  file_url:'https://s3.us-east-2.amazonaws.com/crmfiles.influxhostserver/files/',
  imageUpload_url:'http://3.15.236.141:5005/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
