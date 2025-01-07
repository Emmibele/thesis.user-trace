import { InteractionElementType, InteractionTypeButton, InteractionTypeComment } from "./data/InteractionElementType";
import { logServiceConfig } from "./config";
import { logData } from "./data/LogData";
import { postLog } from "./util/backend_service";

function registerLoggers(){
  const ServiceConfig = new logServiceConfig('lms10-jette', '3030', '/api/v1/log');
  const logFunction = (logData: logData) => postLog(logData, ServiceConfig);
  const interactionElementTypes : InteractionElementType[] = [];
  interactionElementTypes.push(new InteractionTypeButton(logFunction));
  interactionElementTypes.push(new InteractionTypeComment(logFunction));
}


window.addEventListener('load', () => {
  registerLoggers();
})
