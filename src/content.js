const BLACKLIST = ["bad-domain.com", "another-bad-domain.com","google.com"];  // Add more domains as needed

function findURLs(text) {
  const urlRegex = /https?:\/\/([^\s]+)/g;
  return Array.from(text.matchAll(urlRegex), m => m[1]);
}

const pageContent = document.body.innerText;
const urlsDetected = findURLs(pageContent);

for (const url of urlsDetected) {
  for (const badDomain of BLACKLIST) {
    if (url.includes(badDomain)) {
      alert("Warning! Detected blacklisted domain: " + badDomain);
    }
  }
}
