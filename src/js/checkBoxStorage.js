const initCheckboxStorageDelayed = () => {
  setTimeout(() => {
    function save() {
      const checkbox = document.querySelector('.input-checkbox');
      console.log(checkbox);
      localStorage.setItem('input-checkbox', checkbox.checked);
    }

    function load() {
      const checked = JSON.parse(localStorage.getItem('input-checkbox'));
      // document.querySelector('input-checkbox').checked = checked;
      if (checked == 'true') {
        document.getElementById('input-checkbox').checked = 'true';
      }
    }

    function wis() {
      location.reload();
      localStorage.clear();
    }

    load();
  }, 1000);
};

export default initCheckboxStorageDelayed;
