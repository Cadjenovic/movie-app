const createAutoComplete = ({root, renderOption, onOptionSelect, optionValue, fetchData}) => {

    root.innerHTML = `
    <label><b>Search</b></label>
    <input class="input" />
    <div class="dropdown">
      <div class="dropdown-menu">
        <div class="dropdown-content results"></div>
      </div>
    </div>
  `;

    const input = root.querySelector('.input');
    const dropdown = root.querySelector('.dropdown');
    const results = root.querySelector('.results');

    const onInput = async (event) => {

        const items = await fetchData(event.target.value);

        if(!items.length){
            dropdown.classList.remove('is-active');
            return;
        }

        results.innerHTML = '';
        dropdown.classList.add('is-active');

        for(let item of items){
            const anchor = document.createElement('a');
            anchor.classList.add('dropdown-item');
            anchor.innerHTML = renderOption(item);
            anchor.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = optionValue(item);
                onOptionSelect(item);
            });
            results.append(anchor);
        }
    };

    input.addEventListener('input', debounce(onInput, 2000));

    document.addEventListener('click', (event) =>{
        if(!root.contains(event.target)){
            dropdown.classList.remove('is-active');
        }
    });
}