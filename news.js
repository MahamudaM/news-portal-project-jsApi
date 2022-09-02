//add news catagores
const loadCategory = async()=>{
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);

}
const displayCategory =categorys=>{
// console.log(categorys)
    const myCategoryDiv = document.getElementById('allNews')
    categorys.forEach(category => {
        const creatDiv = document.createElement('div');
        creatDiv.innerHTML = `
        <a class="navbar-brand" href="#" onclick ='allNews(${category.category_id})'> ${category.category_name?category.category_name :'not found category name' }</a>
        `
        myCategoryDiv.appendChild(creatDiv);  
    });
    
}
const allNews= async(categoryId)=>{
    const url1 = `https://openapi.programming-hero.com/api/news/category/${categoryId}`
    const res = await fetch(url1);
    const data = await res.json();
    console.log(data);
}

loadCategory()








