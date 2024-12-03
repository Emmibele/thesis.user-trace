
async function post_log() {
  "use strict";
  const url = log_service_protocol + '://' + log_service_host + ':' + log_service_port + log_service_path;
  const options = {
    method: "POST",
    body: JSON.stringify({test: "blub"}),
    mode: "cors",
    headers : {
      "Content-Type": "text/plain", // TODO: test if we can use app/json despite cors (maybe thats not even relevant here)
      }
  }

  const request = new Request(url, options);
  const response = await fetch(request);
  console.log(response.status)
}