export var appName:string = 'ShiShi';
export var subName:string = 'bigBoss';
export var apiBase:string = 'http://jsonplaceholder.typicode.com';
export var CONSTARGS:Array<any> = [
  {provide:appName,useValue:subName},
  {provide:apiBase,useValue:apiBase}
];
