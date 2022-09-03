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
        <a class="navbar-brand" href="#" onclick ='allNews("${category.category_id}")'> ${category.category_name?category.category_name :'not found category name' }</a>`
        myCategoryDiv.appendChild(creatDiv);  
    });
    
}
 
const allNews= async(categoryId)=>{
    // console.log(categoryId)
    const url1 = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url1);
    const data = await res.json();
    displayNews(data.data);
}
const displayNews = arrayDatas =>{
    console.log(arrayDatas)
    const myNewsContainer = document.getElementById('allNewsContainer')
    myNewsContainer.innerHTML = ''
    arrayDatas.forEach(singalData=>{
        const creatCardDiv = document.createElement('div')
        creatCardDiv.classList.add('card');
        creatCardDiv.innerHTML = `
        <div class="row g-0">
        <div class="col-md-4">
          <img src="${singalData.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${singalData.title}</h5>
            <p class="card-text " >${singalData.details.slice(0,300)}</p>
            <div class="card-text d-flex justify-content-around"><span class="text-muted"> <img src="${singalData.author.img}" alt="" class="rounded-circle img-fluid   small"> <p>${singalData.author.name}</p></span> <span><i class="fa-light fa-eye"></i>${singalData.total_view}</span></div>
          </div>
        </div>
      </div>
        `
        myNewsContainer.appendChild(creatCardDiv)
    })
    
}
loadCategory()








