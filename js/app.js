//****** *variables*********
const courses=document.querySelector("#courses-list"),
    shoppingCartContent=document.querySelector("#cart-content tbody"),
    clearCartBtn=document.querySelector("#clear-cart");


//--------Listeners------
loadEventListener();
function loadEventListener(){
    //when a new card is added
    courses.addEventListener("click",buyCourse);
    //-----remove course from cart
    shoppingCartContent.addEventListener("click",removeCourse);
    //-----clear cart
    clearCartBtn.addEventListener("click",clearCart);

    document.addEventListener('DOMContentLoaded',retrieveFromLocalStorage);
}


//------functions------
function buyCourse(e){
    e.preventDefault();
    
    if(e.target.classList.contains("add-to-cart")){
        const course = e.target.parentElement.parentElement; 
        getCourseInfo(course);
    }
}
//read the html information of selected course
function getCourseInfo(course){
    const detail={
        image: course.querySelector('img').src,
        title: course.querySelector("h4").textContent,
        price:course.querySelector(".price span").textContent,
        id: course.querySelector("a").getAttribute("data-id")
    }
    //**********insert into shopping cart******
    addIntoCart(detail);
}
//-------display the selected course into shopping cart------
function addIntoCart(course){
    //----create a <tr>
    const row=document.createElement('tr');
    //----build a template
    row.innerHTML=`
        <tr>
            <td><img src="${course.image}" width=100></td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `
    //------add into the shopping cart
    shoppingCartContent.appendChild(row);
    //------add course in local storage
   saveIntoStorage(course);
}
function saveIntoStorage(course){
    let courses=getCoursesFromStorage();
    courses.push(course);
    localStorage.setItem('courses',JSON.stringify(courses));

}

//----get courses from local storage
function getCoursesFromStorage(){
    let courses;
    if(localStorage.getItem('courses')===null){
        courses=[];
    }
    else{
        courses=JSON.parse(localStorage.getItem("courses"));
        }
    return courses;
}
//--------remove course from the dom
function removeCourse(e){
    let course,courseId;
    if(e.target.classList.contains("remove")){
        e.target.parentElement.parentElement.remove();
        course=e.target.parentElement.parentElement;
        courseId=course.querySelector("a").getAttribute("data-id");
    }  
    //remove from local storage
    removeCourseLocalStorage(courseId);
}

function removeCourseLocalStorage(id){
        let courseLS=getCoursesFromStorage();
        courseLS.forEach(function(courseonLS,index){
            if(courseonLS.id===id){
                courseLS.splice(index,1);
            }
        });
        //add the rest of the array
        localStorage.setItem('courses',JSON.stringify(courseLS));
}

function clearCart(){
    shoppingCartContent.innerHTML='';
    
    //-------clear local storage
    clearLocalStorage();
    function clearLocalStorage(){
        localStorage.clear();
    }
}
//---------when document is ready load into LocalStorage
function retrieveFromLocalStorage(){
    const coursesLs=getCoursesFromStorage();
    coursesLs.forEach(function(course){
        const row=document.createElement('tr');
        row.innerHTML=`
        <tr>
            <td><img src="${course.image}" width=100></td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>`;
        shoppingCartContent.appendChild(row);

    })
}