document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form from submitting

  // Get entered password from form input
  const password = document.getElementById('password').value;

  // Make a GET request to read password from online text file
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://example.com/password.txt', true); // Replace with your URL
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        // Read password from response
        const correctPassword = xhr.responseText.trim();
        
        // Check if entered password matches
        if (password === correctPassword) {
          // Send message to content script to continue script
          chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: 'continueScript'});
          });
        } else {
          alert('Incorrect password! Try again.');
        }
      } else {
        alert('Error reading password file!');
      }
    }
  };
  xhr.send();
});



theme1 = document.querySelector('.theme-1');
theme2 = document.querySelector('.theme-2');
theme3 = document.querySelector('.theme-3');
downloadButton = document.querySelector('#download');
aboutButton = document.querySelector('#about');

console.log("Working")

document.addEventListener("click", function(e) {
    if(e.target && theme1.contains(e.target)) {
        console.log("Theme 1");
        send(1);
    } else if (e.target && theme2.contains(e.target)) {
        console.log("Theme 2");
        send(2);
    } else if (e.target && theme3.contains(e.target)) {
        console.log("Theme 3");
        send(3);
    }
});

aboutButton.addEventListener('click', function() {
    const newURL = "https://google.com";
        chrome.tabs.create({ url: newURL });
});

downloadButton.addEventListener('click', function() {
    chrome.storage.sync.get(['sparxCodes'], function(database) {
        let newDatabase = [];
        for (let [key, value] of Object.entries(database.sparxCodes)) {
            value = value.join('').replace('\n', '');
            newDatabase.push(`${key}: ${value}\n`);
        }
        console.log(newDatabase);
        const blob = new Blob(newDatabase, {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        chrome.downloads.download({
            url: url,
            filename: "Sparx Codes.txt"
        });
    })
});

function send(msg) {
    chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"theme": msg});
    });
}
