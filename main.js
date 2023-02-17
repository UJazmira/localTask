let namess = document.querySelector(".names");
let emails = document.querySelector(".gmail");
let imgs = document.querySelector(".image");
let contacts = document.querySelector(".contact");
let submits = document.querySelector(".btn");
let formList = document.querySelector(".formlist");

submits.addEventListener("click", () => {
  if (
    !namess.value.trim() ||
    !emails.value.trim() ||
    !imgs.value.trim() ||
    !contacts.value.trim()
  ) {
    alert(" you should complite all form");
    return;
  }
  let formObj = {
    names: namess.value,
    email: emails.value,
    img: imgs.value,
    contact: contacts.value,
    // submit: submits.value,
    // formlist: formList.value,
  };
  setItemToStorage(formObj);
  createElement();
  namess.value = "";
  emails.value = "";
  imgs.value = "";
  contacts.value = "";
  //   submits.value = "";
  //   formList.value = "";
});

function setItemToStorage(form) {
  if (!localStorage.getItem("form-data")) {
    localStorage.setItem("form-data", "[]");
  }
  let formu = JSON.parse(localStorage.getItem("form-data"));
  console.log(formu);
  formu.push(form);
  localStorage.setItem("form-data", JSON.stringify(formu));
}
createElement();

function createElement() {
  let newForm = JSON.parse(localStorage.getItem("form-data"));

  //   console.log(formList);
  formList.innerHTML = "";

  if (newForm !== null) {
    newForm.forEach((item, index) => {
      formList.innerHTML = `<li> ${item.names}</li>
        <li> ${item.email}</li>
        <img  width='150px'src=${item.img} alt="тут должна быть картинка"/>
        <li> ${item.contact}</li>
        <button class="remove">Delete</button>
        <button class="redac">Edit</button>`;
      let btnDelete = document.querySelector(".remove");
      let btnEdit = document.querySelector(".redac");
      btnDelete.addEventListener("click", () => {
        deleteElement(index);
      });

      btnEdit.addEventListener("click", () => {
        editElement(index);
      });
    });
  }
}

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("form-data"));
  data.splice(index, 1);
  localStorage.setItem("form-data", JSON.stringify(data));
  createElement();
  // console.log(data);
}
let mainModal = document.querySelector(".main-modal");
// let inpEdit = document.querySelector(".inp-edit");
let btnClose = document.querySelector(".btn-closer");
// let btnSave = document.querySelector(".btn-save");

let namesInpp = document.querySelector(".namesInp");
let emailInpp = document.querySelector(".gmailInp");
let imgInpp = document.querySelector(".imageInp");
let contactInpp = document.querySelector(".contactInp");
let btnSaveInp = document.querySelector(".btn-saveInp");

function editElement(index) {
  mainModal.style.display = "block";
  let data = JSON.parse(localStorage.getItem("form-data"));

  data.forEach((item) => {
    console.log(item);
    namesInpp.value = item.names;
    emailInpp.value = item.email;
    imgInpp.value = item.img;
    contactInpp.value = item.contact;
  });
  namesInpp.setAttribute("id", index);
  //   emailInpp.setAttribute("id", index);
  //   imgInpp.setAttribute("id", index);
  //   contactInpp.setAttribute("id", index);
  //   btnSaveInp.setAttribute("id", index);
  // console.log(inpEdit);
}
btnClose.addEventListener("click", () => {
  mainModal.style.display = "none";
});

btnSaveInp.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("form-data"));

  let index = namesInpp.id;
  // console.log(index);

  if (
    !namesInpp.value.trim() ||
    !emailInpp.value.trim() ||
    !imgInpp.value.trim() ||
    !contactInpp.value.trim()
  ) {
    alert("complite form");
    return;
  }
  let editedTask = {
    names: namess.value,
    email: emails.value,
    img: imgs.value,
    contact: contacts.value,
  };

  data.splice(index, 1, editedTask);
  localStorage.setItem("form-data", JSON.stringify(data));
  mainModal.style.display = "none";
  createElement();
  // console.log(editedTask);
});
