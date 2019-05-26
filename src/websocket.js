import Debug from './Debug';

let websockets = {};
let statusCb;
let dataCb;
let errorCb;

function init(pStatusCb, pDataCb, pErrorCb) {
  statusCb = pStatusCb;
  dataCb = pDataCb;
  errorCb = pErrorCb;
}

function onMessage(name, event) {
  Debug.log(`Data from ${name} - ${event.data}`);
  if (event.data === 'pong') {
    websockets[name].lastpong = Date.now();
  } else {
    let msg = JSON.parse(event.data);
    switch (msg.type) {
      case 'status':
        return statusCb(name, msg.payload);
      case 'data':
        return dataCb(name, msg.payload);
      default:
        Debug.log(`Unknown message: ${name}`);
    }
  }
}

function onClose(name, _) {
  Debug.log(`Close for ${name}`);
  if (websockets[name] && websockets[name].ws) {
    websockets[name].ws.close();
    websockets[name].ws = undefined;
    if (websockets[name].heartbeat) {
      clearInterval(websockets[name].heartbeat);
    }
  }
  websockets[name].timer = setTimeout(() => {
    websockets[name].ws = create(name, websockets[name].address);
  }, 2000);
}

function onError(name, _) {
  Debug.log(`Error on ${name}`);
  // websockets[name].ws.close();
  errorCb(name);
}

function onOpen(name, _) {
  let counter = 0;
  Debug.log(`onOpen ${name}`);
  if (websockets[name].ws) {
    websockets[name].lastpong = Date.now();
    websockets[name].heartbeat = setInterval(() => {
      if (Date.now - websockets[name].lastpong > 6000) {
        if (websockets[name].ws) {
          websockets[name].ws.close();
        }
        errorCb(name);
      } else {
        if (counter++ % 20 == 0)
          Debug.log(
            `tick: ${name} ${websockets[name].ws &&
              websockets[name].ws.readyState}`
          );
        if (
          websockets[name] &&
          websockets[name].ws &&
          websockets[name].ws.readyState == 1 // OPEN
        ) {
          websockets[name].ws.send('ping');
        }
      }
    }, 2000);
  }
}

function create(name, address) {
  let ws = new WebSocket(`ws://${address}/ws`);

  ws.onopen = event => onOpen(name, event);

  ws.onmessage = event => onMessage(name, event);

  ws.onclose = event => onClose(name, event);

  ws.onerror = event => onError(name, event);

  return ws;
}

function addTarget(name, address) {
  if (websockets[name]) {
    // Stupid router calls TargetList component twice
    return;
  }

  let ws = create(name, address);
  websockets[name] = {
    ws,
    address
  };
  Debug.log(`Adding target ${name} - ${address}`);
}

function deleteTarget(name) {
  if (websockets[name]) {
    if (websockets[name].ws) {
      websockets[name].ws.close();
    }
    if (websockets[name].timer) {
      clearTimeout(websockets[name].timer);
    }
    if (websockets[name].heartbeat) {
      clearInterval(websockets[name].heartbeat);
    }
  }
  delete websockets[name];
  Debug.log(`Deleting target ${name}`);
}

export default {
  addTarget,
  deleteTarget,
  init
};
