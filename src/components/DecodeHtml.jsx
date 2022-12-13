export default function DecodeHtml(html) {
    var txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}