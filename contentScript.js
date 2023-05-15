// START FILE CHECK FOR EXTENSION ENABLEMENT
fetch('https://raw.githubusercontent.com/SintcoLTD/CDN/main/chrome-extension/sparxmaths/notifications/1.4/switch.txt')
  .then(response => response.text())
  .then(text => {
    if (text.includes('CHROME EXTENSION ENABLE')) {
      // START FILE CHECK FOR NOTIFICATION
      fetch('https://raw.githubusercontent.com/SintcoLTD/CDN/main/chrome-extension/sparxmaths/notifications/1.4/notification.txt')
        .then(response => response.text())
        .then(text => {
          // If notification.txt has any content, display an alert
          if (text.trim().length > 0) {
            alert(`Notification:\n\n${text}`);
          }
        })
        .catch(error => console.log(error));
      // END FILE CHECK FOR NOTIFICATION

      var s = document.createElement('script');
      s.src = chrome.runtime.getURL('inject.js');
      s.onload = function() {
          this.remove();
      };       
      (document.head || document.documentElement).appendChild(s);
      console.log('Loaded contentScript.js');

    } else {
      const switchFileContents = `The contents of switch.txt are:\n\n${text}`;
      alert(`Chrome extension is not enabled, script will not continue.\n\n${switchFileContents}`);
      throw new Error('Chrome extension is not enabled');
    }
  })
  .catch(error => console.log(error));
// END FILE CHECK FOR EXTENSION ENABLEMENT
