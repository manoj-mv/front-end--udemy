console.log('begin \'validate.js\' script...');

// form elmnts
const fname = document.querySelector('.fname-input');
const lname = document.querySelector('.lname-input');
const age = document.querySelector('.num-input');

const fname_validate = document.querySelector('#fname-validate');
const age_validate = document.querySelector('#age-validate');
// console.log(age_validate);


// fname validate event 
fname.addEventListener('blur',nameValidate);

// lname validate event 
lname.addEventListener('blur',nameValidate);

// age validate event 
age.addEventListener('blur',ageValidate);



function nameValidate(e) {
  // get value fro event origin
  let element=e.target;
  // console.log('debug:pinting value : ',val);

  const re = /^[A-Za-z]{3,20}$/;
  // console.log(re.test(val));

  // validate using RE
  if (!re.test(element.value)) {
    console.log('error');
    // show error
    showError(element,fname_validate,'*Name must be between 3 to 20 charcters.');
  }
  else{
    // hide error
    hideError(element,fname_validate);
    
  }
}

// age validate fn
function ageValidate(e){
  // event source
  const element = e.target; 
  console.log(Number(element.value));
  if(Number(element.value)){
    if(element.value === 0 || element.value >100){
      showError(element,age_validate,'*Age must be between 1 - 100.');
    }
    else{
      hideError(element,age_validate);
    }
  }
  else if(!Number(element.value)){
    showError(element,age_validate,'*Age must be a valid number.');
  }
  else{
    hideError(element,age_validate);
  }
}



// showError()

const showError = (element,err_block,msg) => {
  // display hidden error block
  err_block.style.display = 'block';
  err_block.innerHTML = msg;
  element.focus();
  // add class to change element outline color
  element.classList.add('error-outline');
}

const hideError= (element,err_block) => {
  // hide error block and remove outline class
  err_block.style.display = 'none';
  err_block.innerHTML = '';
  element.classList.remove('error-outline');
}