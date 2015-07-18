function save_options() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  chrome.storage.local.set({
    username: username,
    password: password
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved!';
    setTimeout(function() {
      status.textContent = '';
    }, 1350);
  });
}

function restore_options() {
  chrome.storage.local.get({
    username: '',
    password: ''
  }, function(items) {
    document.getElementById('username').value = items.username;
    document.getElementById('password').value = items.password;
    console.log("DiigoExt: Options restored!");
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);