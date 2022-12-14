//add news catagores
const loadCategory = async()=>{
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try{
      const res = await fetch(url);
      const data = await res.json();
      displayCategory(data.data.news_category);
    }
    catch(error){
      console.log(error)
    }
    

}
const displayCategory =categorys=>{
// console.log(categorys)
    const myCategoryDiv = document.getElementById('newsCategory')
    categorys.forEach(category => {
        const creatDiv = document.createElement('div');
        creatDiv.innerHTML = `
        <a class="navbar-brand " href="#" onclick ='allNews("${category.category_id}")'> ${category.category_name?category.category_name :'not found category name' }</a>`
        myCategoryDiv.appendChild(creatDiv);  
    });
    
}


const allNews= async(categoryId)=>{
  // start loader
  spinnerToggle(true)
    // console.log(categoryId)
    const url1 = `https://openapi.programming-hero.com/api/news/category/${categoryId?categoryId:'no news found'}`
    try{
      const res = await fetch(url1);
      const data = await res.json();
      getLength(data.data);
      shortObject(data.data)
    }
    catch(error){
      console.log(error);
    }
}

// category array length
const getLength = (arrays)=>{
  // console.log(arrays)
const myarreDiv = document.getElementById('arrayLength')

  // console.log(arrey)
  myarreDiv.innerHTML = `
  ${arrays.length? arrays.length: "No"} item found in news catagore
  `
}


const shortObject= arrey5=>{
  // console.log(arrey5)
  arrey5.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  // console.log(arrey5);
  displayNews(arrey5);
  }

const displayNews = (arrayDatas) =>{
 
 
    // console.log(arrayDatas)
    const myNewsContainer = document.getElementById('allNewsContainer')
    myNewsContainer.innerHTML = ''
   
    arrayDatas.forEach(singalData=>{

      const creatCardDiv = document.createElement('div')
      creatCardDiv.classList.add('card');
      creatCardDiv.innerHTML = `
      <div class="row g-0" >
      <div class="col-md-4">
        <img src="${singalData.thumbnail_url}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">${singalData.title}</h5>
          <p class="card-text " >${singalData.details.slice(0,300)+ '&hellip;'}</p>
          <div class="card-text d-grid gap-2 d-flex  justify-content-evenly align-items-center">
          <span ><img src="${singalData.author? singalData.author.img : 'no author found'}" alt="" class="rounded-circle img-fluid   small"> <h6>${singalData.author.name? singalData.author.name :'author name not found'}</h6></span> 
          <div class = 'view'><h6>view:${singalData.total_view? singalData.total_view :' not found'}M</h6> </div>
        
          <button onclick='opneModals("${singalData._id}")' type="button" class="btn btn-primary   d-flex justify-content-md-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Details
       </button>
          </div>
          <div class='modlaBtn'>
          
          </div>


        </div>
      </div>
    </div>
      `
      myNewsContainer.appendChild(creatCardDiv)
  })
    

    // stop loder
    spinnerToggle(false) 
}
// loading function
const spinnerToggle =isloading=>{
  const loderId = document.getElementById('loder')
  if(isloading){
    loderId.classList.remove('d-none')
  }
  else{
    loderId.classList.add('d-none')
  }
}


const opneModals =async(id)=>{
// console.log(id)
const url1 = `https://openapi.programming-hero.com/api/news/${id}`
try{
  const res2 = await fetch(url1);
    const data2 = await res2.json();
    displayDetalInModals(data2.data[0]);
    // console.log(data2.data[0])
}
catch(error){
  console.log(error)
}
    
}
// add modales
const displayDetalInModals = (details)=>{
  console.log(details)
const getModaltital = document.getElementById('exampleModalLabel')
const getModalDiv = document.getElementById('addModal')
getModaltital.innerHTML = ` ${details.title?details.title:'no tital '}`
getModalDiv.innerHTML = `
<img src="${details.author?details.author.img : 'no author found'}" alt="" class="rounded-circle img-fluid   small">
        <h3>Name : ${details.author.name?details.author.name : 'author name not found'}</h3>
        
          <p>date : ${details.author['published_date']}
`;

}


loadCategory();
allNews('08')
