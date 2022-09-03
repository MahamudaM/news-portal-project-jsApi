//add news catagores
const loadCategory = async()=>{
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);

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
    // console.log(categoryId)
    const url1 = `https://openapi.programming-hero.com/api/news/category/${categoryId?categoryId:'no news found'}`
    const res = await fetch(url1);
    const data = await res.json();
    displayNews(data.data);
    
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
            <p class="card-text " >${singalData.details.slice(0,300)}</p>
            <div class="card-text d-grid gap-2 d-flex  justify-content-evenly align-items-center">
            <span class="text-muted"><img src="${singalData.author? singalData.author.img : 'no author found'}" alt="" class="rounded-circle img-fluid   small"> <p>${singalData.author.name? singalData.author.name :'author name not found'}</p></span> 
            <div class = 'view'><span><i class="fa-light fa-eye"></i>${singalData.total_view? singalData.total_view :'view not found'}</span> </div>
          
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
    
}
const opneModals =async(id)=>{
// console.log(id)
const url1 = `https://openapi.programming-hero.com/api/news/${id}`
    const res2 = await fetch(url1);
    const data2 = await res2.json();
    displayDetalInModals(data2);
    console.log(data2)

}
const displayDetalInModals = (details)=>{
  // console.log(details)
const getModalDiv = document.getElementById('addModal')
const creatDetailDiv = document.createElement('div')
creatDetailDiv.innerHTML = `
<div class="modal fade" id="exampleModal"  tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <p>hi ,i am mahamuda ${details}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

`;
getModalDiv.appendChild(creatDetailDiv)
}


loadCategory()








