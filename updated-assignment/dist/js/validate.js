console.log('begin \'validate.js\' script...');

// variables
const numberOfFormInputs = 9;
// form elmnts
const fname = document.querySelector('.fname-input');
const lname = document.querySelector('.lname-input');
const age = document.querySelector('.num-input');
const dob = document.querySelector('.date-input');
const email = document.querySelector('.email-input');
const gender = document.querySelector('.gender-input');
const gender_radios =document.querySelectorAll('input[name="gender"]');
const state = document.querySelector('.select-input');
const hobby = document.querySelector('input[type="checkbox"]');
const file = document.querySelector('.file-input');
const submitBtn = document.querySelector('#submit-val');

const form = document.getElementById('form');
// console.log(hobby_items);

// error divs
const fname_validate = document.querySelector('#fname-validate');
const age_validate = document.querySelector('#age-validate');
const dob_validate = document.querySelector('#dob-validate');
const email_validate = document.querySelector('#email-validate');
const gender_validate = document.querySelector('#gender-validate');
const state_validate = document.querySelector('#state-validate');
const hobby_validate = document.querySelector('#hobby-validate');
const file_validate = document.querySelector('#file-validate');
// console.log('checkbox',document.querySelectorAll('input[type="checkbox"]'));


// fname validate event 
fname.addEventListener('blur', nameValidate);

// lname validate event 
lname.addEventListener('blur', nameValidate);

// age validate event 
age.addEventListener('blur', ageValidate);

// dob validate event 
dob.addEventListener('blur', dobValidate);

// email validate event 
email.addEventListener('blur', emailValidate);

// gender validate event 
// gender.addEventListener('blur', genderValidate);

// gender validate event 
gender_radios[0].addEventListener('change', genderValidate);
gender_radios[1].addEventListener('change', genderValidate);
gender_radios[2].addEventListener('change', genderValidate);
console.log('gender',document.querySelectorAll('input[name="gender"]'));

// file input validate event 
file.addEventListener('change', fileValidate);

// state input validate event 
state.addEventListener('mouseup', stateValidate);

// hobby
document.querySelector('.hob-check').addEventListener('click',hobValidate);
// form submit validate
form.addEventListener('submit',submitForm);

function nameValidate(e) {
  // get value fro event origin
  let element = e.target;
  // console.log('debug:pinting value : ',val);

  const re = /^[A-Za-z ]{3,20}$/;
  // console.log(re.test(val));

  // validate using RE
  if (!re.test(element.value)) {
    // console.log('error');
    // show error
    showError(element, fname_validate, '*Name must be between 3 to 20 charcters.');
  }
  else {
    // hide error
    hideError(element, fname_validate);

  }
}

// age validate fn
function ageValidate(e) {
  // event source
  const element = e.target;
  // console.log(Number(element.value));
  if (Number(element.value)) {
    if (element.value === 0 || element.value > 100) {
      showError(element, age_validate, '*Age must be between 1 - 100.');
    }
    else {
      hideError(element, age_validate);
    }
  }
  else if (!Number(element.value)) {
    showError(element, age_validate, '*Age must be a valid number.');
  }
  else {
    hideError(element, age_validate);
  }
}

// Date of birth validate fn
function dobValidate(e) {
  element = e.target;
  if (!element.value) {
    // console.log('selected')
    showError(element, dob_validate, '*Required.');
  }
  else {
    // console.log('Not selected')
    hideError(element, dob_validate);
  }
}

// email validate
function emailValidate(e){
  element = e.target;
  const re = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]{2,5}$/;
  if(!re.test(element.value)){
    showError(element, email_validate, '*Invalid email.');
  }
  else{
    hideError(element, email_validate);
  }
}
// gender validate
function genderValidate(e){
  // console.log('triggered',e.target.checked);
  hideError(e.target,gender_validate);
}

// hobby
function hobValidate(e){
  console.log('hob calle');
  const hobby_items = document.querySelectorAll('input[type="checkbox"]:checked');
  console.log(hobby_items);
  if(hobby_items.length !== 0){
    console.log('ok');
    hideError(hobby,hobby_validate);
  }
}
// file inp validation
function fileValidate(e){
  const element = e.target;
  // file name
  const file = element.value;
  // find file extention
  const fileExtention  = file.split('.').pop();
  // console.log(fileExtention);
  // console.log(element.files[0].size/1024);
  if(fileExtention !== 'pdf'){
    showError(element, file_validate, '*File should be pdf.');
    // doesn't need to show outline in file type
    element.classList.remove('error-outline');
  }
  else{
    const fileSize = element.files[0].size/1024;
    if(fileSize > 1024){
      showError(element, file_validate, '*File size must be less than 1024kb.');
      // doesn't need to show outline in file type
      element.classList.remove('error-outline');
    }
    else{
      hideError(element, file_validate);
    }
  }
}

// state inp validate
function stateValidate(e){
  // console.log(e.target.value);
  element = e.target;
  if(!element.value){
    showError(element, state_validate, '*Required.');
  }
  else{
    console.log('suc');
    hideError(element, state_validate);
  }
}

// submit & show data
function submitForm(e){
  const checkArr = isFilledRequiredInputs(e);
  console.log('CheckArr',checkArr);
  // flags check
  let isSubmitConfirmCount = 0;
  checkArr.forEach(function(val) {
    // console.log('flag',val);
    if(val === 1){
      isSubmitConfirmCount += 1;
    }
  });
  console.log('sum',isSubmitConfirmCount);
  if (isSubmitConfirmCount === numberOfFormInputs){
    console.log('show modal');
    showModal();
    document.querySelector('#modal-data').style.display = 'block';
  }
}

// check whether all required fields are filled on form submit
function isFilledRequiredInputs(e){
  // flag array for decide modal pop up
  const flagArr =[];
  e.preventDefault();
  // console.log(fname.value);
  // console.log('checkbox',document.querySelectorAll('input[type="checkbox"]:checked'));
  if(fname.value === ""){
    showError(fname, fname_validate, '*Required.');
    flagArr.push(0);
  }
  else{
    flagArr.push(1);
  }
  if(lname.value === ""){
    // console.log(suc);
    showError(lname, fname_validate, '*Required.');
    flagArr.push(0);
  }
  else{
    flagArr.push(1);
  }
  if(age.value === ""){
    // console.log(suc);
    showError(age, age_validate, '*Required.');
    flagArr.push(0);
  }
  else{
    flagArr.push(1);
  }
  if(dob.value === ""){
    // console.log(suc);
    showError(dob,dob_validate, '*Required.');
    flagArr.push(0);
  }
  else{
    flagArr.push(1);
  }
  if(email.value === ""){
    // console.log(suc);
    showError(email,email_validate, '*Required.');
    flagArr.push(0);
  }
  else{
    flagArr.push(1);
  }
  if(state.value === ""){
    // console.log(suc);
    showError(state,state_validate, '*Required.');
    flagArr.push(0);
  }
  else{
    flagArr.push(1);
  }
  
  if(document.querySelector('input[type="radio"]:checked') === null){
    // console.log(document.querySelector('input[type="radio"]:checked'));
    showError(gender,gender_validate, '*Required.');
    flagArr.push(0);
  }
  else{
    hideError(gender,gender_validate);
    flagArr.push(1);
  }
  // console.log(document.querySelector('input[type="checkbox"]:checked'));
  //check box error block
  if(document.querySelector('input[type="checkbox"]:checked') === null){
    // console.log(document.querySelector('input[type="checkbox"]:checked'));
    showError(hobby,hobby_validate, '*Required.');
    flagArr.push(0);
  }
  else{
    hideError(hobby,hobby_validate);
    flagArr.push(1);
  }

  // file
  if(file.files[0] === undefined){
    // console.log(file.files[0]);
    showError(file,file_validate, '*Required.');
    file.classList.remove('error-outline');
    flagArr.push(0);
  }
  else{
    flagArr.push(1);
  }
  return flagArr;
}
console.log(document.querySelector('.file-d'));
console.log(file.files);
function showModal(){
  document.querySelector('.fname').innerHTML = fname.value;
  document.querySelector('.lname').innerHTML = lname.value;
  
  document.querySelector('.age').innerHTML = age.value;
  document.querySelector('.dob-d').innerHTML = dob.value;
  document.querySelector('.email-d').innerHTML = email.value;
  document.querySelector('.gender-d').innerHTML =document.querySelector('input[type="radio"]:checked').value;
  document.querySelector('.state-d').innerHTML = state.options[state.selectedIndex].value;

  // checkbox value string generate
  const checkBoxes_checked =document.querySelectorAll('input[type="checkbox"]:checked');
  console.log(checkBoxes_checked);
  let hobby_list ='';
  checkBoxes_checked.forEach((checkVal,index) =>{
    // console.log(checkVal.name);
    if(index < checkBoxes_checked.length-1){
      hobby_list += `${checkVal.name},`;
    }
    else{
      hobby_list +=checkVal.name;
    }
  });
  console.log(hobby_list);
  // display hobbies
  document.querySelector('.hobbies-d').innerHTML = hobby_list;
  console.log(file.files[0]);
  document.querySelector('.file-d').innerHTML = file.files[0].name;
}

// show error alert
function showError(element, err_block, msg) {
  // display hidden error block
  err_block.style.display = 'block';
  err_block.innerHTML = msg;
  element.focus();
  // add class to change element outline color
  element.classList.add('error-outline');
}

// hide error alert
const hideError = (element, err_block) => {
  // hide error block and remove outline class
  err_block.style.display = 'none';
  err_block.innerHTML = '';
  element.classList.remove('error-outline');
}

