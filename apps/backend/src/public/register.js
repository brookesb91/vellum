/* eslint-disable no-undef */
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/service-worker.js')
    .then(() => console.log('[service-worker] Registered'))
    .catch(err => console.error('[service-worker] Failed to register. ', err));
}