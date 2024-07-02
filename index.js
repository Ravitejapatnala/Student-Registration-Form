const studentName= document.getElementById('student_name');
const studentId= document.getElementById('student_id');
const studentEmail=document.getElementById('student_email');
const studentContact= document.getElementById('student_mobile');
const register= document.querySelector('.register');
const table_body= document.getElementById('table_body');
let editRow= null;
const emailRegex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function saveToLocalStorage(){
    const rows= table_body.getElementsByTagName('tr');
    let data=[];

    for(let row of rows){
        data.push({
            name:row.children[0].innerText,
            id: row.children[1].innerText,
            email: row.children[2].innerText,
            contact: row.children[3].innerText
        })
    }

    localStorage.setItem('studentsData', JSON.stringify(data));
}


function loadFromLocalStorage(){
    const data= JSON.parse(localStorage.getItem('studentsData'));

    if(data){
        data.forEach(({name, id, email, contact})=>{
            let row= document.createElement('tr');

            //creating coloumns
            let col1= document.createElement('td');
            col1.innerText= name;
            let col2= document.createElement('td');
            col2.innerText=id;
            let col3= document.createElement('td');
            col3.innerText=email;
            let col4= document.createElement('td');
            col4.innerText= contact;
            let col5= document.createElement('td');

            //creating buttons and adding them to col5
            let edit= document.createElement('button');
            edit.innerText= 'Edit';
            edit.classList.add('edit');
            let del= document.createElement('button');
            del.innerText= 'Delete';
            del.classList.add('delete');

            col5.appendChild(edit);
            col5.appendChild(del);

            //adding all the coloumns to row
            row.appendChild(col1);
            row.appendChild(col2);
            row.appendChild(col3);
            row.appendChild(col4);
            row.appendChild(col5);

            //adding the row to tbody
            table_body.appendChild(row);

            //adding edit and delete functionalities
            //delete
            del.addEventListener('click', ()=>{
                row.remove();
                saveToLocalStorage();
            });

            edit.addEventListener('click', ()=>{
                studentName.value= col1.innerText;
                studentId.value= col2.innerText;
                studentEmail.value= col3.innerText;
                studentContact.value= col4.innerText;
                editRow= row;
                register.innerText = 'Save';
            })
        })
    }
}


function addUser(e){
    e.preventDefault();

    if(studentName.value==="" || studentId.value==="" || studentEmail.value==="" || studentContact.value===""){
        alert('Cannot add empty data');
        return;
    }

    if(!emailRegex.test(studentEmail.value)){
        alert('Email format is not correct');
        return;
    }

    if(editRow){
        editRow.children[0].innerText= studentName.value;
        editRow.children[1].innerText= studentId.value;
        editRow.children[2].innerText= studentEmail.value;
        editRow.children[3].innerText= studentContact.value;
        editRow= null;
    }

    else{
        // creating a row
        let row= document.createElement('tr');

        //creating coloumns
        let col1= document.createElement('td');
        col1.innerText= studentName.value;
        let col2= document.createElement('td');
        col2.innerText=studentId.value;
        let col3= document.createElement('td');
        col3.innerText=studentEmail.value;
        let col4= document.createElement('td');
        col4.innerText= studentContact.value;
        let col5= document.createElement('td');

        //creating buttons and adding them to col5
        let edit= document.createElement('button');
        edit.innerText= 'Edit';
        edit.classList.add('edit');
        let del= document.createElement('button');
        del.innerText= 'Delete';
        del.classList.add('delete');

        col5.appendChild(edit);
        col5.appendChild(del);

        //adding all the coloumns to row
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(col4);
        row.appendChild(col5);

        //adding the row to tbody
        table_body.appendChild(row);

        //adding edit and delete functionalities
        //delete
        del.addEventListener('click', ()=>{
            row.remove();
            saveToLocalStorage();
        });

        //edit
        edit.addEventListener('click', ()=>{
            studentName.value= col1.innerText;
            studentId.value= col2.innerText;
            studentEmail.value= col3.innerText;
            studentContact.value= col4.innerText;
            editRow= row;
            register.innerText = 'Save';
        })
    }

    saveToLocalStorage();

    //clearing the inputs after adding the row
    studentName.value = '';
    studentId.value = '';
    studentEmail.value = '';
    studentContact.value = '';
    register.innerText='Register';
}

register.addEventListener('click', addUser);
window.addEventListener('load', loadFromLocalStorage);