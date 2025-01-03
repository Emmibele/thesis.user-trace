# Log Injector
utility scripts to track user interactions and send them to a backend
## Tasks
- [ ] create a way to configure the elements to log interactions for
- [ ] figure out, how to log origin and (dialog) states
- [ ] add log to interaction elements
  - BTNS
    - regular Buttons (open dialogs in toolbar and inline, cancel button): `btn.addEventListener('click', fn_test)`
    - Dialog bestätigen: `form.addEventListener('submit', () => {window.open('url', '_blank').focus()})`
    - register Karte wechseln: `element.addEventListener('click', () => {alert('bla')})`
  - input:
    - **Datetime**: 
      - normale inputs in textfeld: `element.addEventListener('input', () => (console.log('asdf')))`
      - via picker: tbd (kommt drauf an ob neuer picker schon im standard ist) -> vermutlich ned
    - **checkbox**: cannot interact directly with the input element, must interact via `click` with parent element `<label>`
    - **reason** input: must use `click` event of elements in dropdown with `class="p-combotree-list-item"` ACHTUNG: kann nicht wirklich unterscheiden ob es sich um auswählbare node oder nicht handelt!! (könnte mit JSstack.reasons.data[].bValidReason geprüft werden) --> ggf. alle elemente mit `data-combotree-value` attribut, und ggf. nötige siblings und parents...
    - **Kommentar**: `element.addEventListener('input', () => {console.log('bla')})`
    - **split**
      - slider: `element.addEventListener('input', () => {console.log('bla')})`
      - datetime: same as above..
- [ ] figure out, how to log additional information (e.g. element name (via id, alt text,...), input data, error text, elements causing the error)

## catch inputs
[catch changes made from js](https://stackoverflow.com/questions/26946235/pure-javascript-listen-to-input-value-change/62235852#62235852)

## to think about
- [ ] filterbar
- [ ] additional btns: excel, print, ...