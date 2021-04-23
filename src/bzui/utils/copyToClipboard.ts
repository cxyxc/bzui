export function copyToClipboard(content: string) {
  var aux = document.createElement('textarea');
  aux.value = content;
  document.body.appendChild(aux);
  aux.select();
  document.execCommand('copy');
  document.body.removeChild(aux);
}
