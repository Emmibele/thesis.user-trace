import { logServiceConfig } from "../config";
import { logData } from "../data/LogData";

// Finger weg! -> soll nur Daten versenden und keine weiteren Aufrufe tätigen!

export async function postLog(logData: logData, serviceConfig: logServiceConfig ) {
  const path = serviceConfig.getPostUrl();
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');

  const request = new Request(path, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(logData)
  })  

  try{
    const response = await fetch(request);
    if(!response.ok){
      console.error('Post did not succeed!\n', response.statusText)
    }
  }
  catch (e){
    console.error('unexpected error during network request\n', e)
  }
}