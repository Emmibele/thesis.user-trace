import { logServiceConfig } from "../config";
import { logData } from "../data/LogData";

export async function postLog(logData: logData, serviceConfig: logServiceConfig ) {
  //TODO: CORS
  const path = serviceConfig.getPostUrl();
  const headers = new Headers();
  // headers.set('Content-Type', 'application/json');
  headers.set('Content-Type', 'text/plain'); // todo does this even help
  headers.set('Accept', 'application/json');

  const request = new Request(path, {
    method: 'POST',
    headers: headers,
    mode: "cors", // todo figure out if this does anything
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