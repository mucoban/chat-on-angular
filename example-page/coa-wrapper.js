// const urlCoA = './chat-on-angular'
const urlCoA = 'http://localhost:4200' // this should be the url of the host on which angular-application is deployed
const iframe = document.createElement('iframe');
window.addEventListener("message", function(event) {
  event.data.map(p => {
    iframe.style[p.prop] = p.value;
  });
});
iframe.onload = function () {
  this.contentWindow.postMessage({ innerWidth: window.innerWidth }, '*');
}
iframe.setAttribute('src', urlCoA);
iframe.style.position = 'fixed';
iframe.style.bottom = '0px';
iframe.style.border = '0';
if (window.innerWidth < 992) {
  iframe.style.right = '0px';
} else {
  iframe.style.right = '20px';
}
document.body.appendChild(iframe);
