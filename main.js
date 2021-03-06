console.log("Yup, it loaded");

let products = null;
let categories = null;

//get products

function buildDOMObj() {
	//loop through products and categories to grab Prod name, department, price and category ID
	let productArr = products.map( function(currentProduct) {
		//inside this loop we need to loop again, but this time through the categories array to find the one category whose id matches the "category_id" of the currectProduct. Maybe a .filter()?
		// That returned array will contain one object. We can set "Dept" on the new object we are making with the "name" property of that one object.
		let categoryItem = categories.filter( function(category) {
			return category.id === currentProduct.category_id;
		})
		let prodObj = {dept: categoryItem[0].name};
		return prodObj; 
	})
	//For now, just see if map worked;
	console.log("prod arr", productArr);
}

function buildCard(prodObj) {
	let card = `<div class="prodCar">
					<h2>${prodObj.name}</h2>
					<h3>${prodObj.dept}</h3>
					<p>${prodObj.price}</p>
				</div>`;
	return card;
}

let TempObj = {name: "Furby", dept: "Toys", price: 12.75}
console.log("card", buildCard(TempObj));

function setProducts() {
	products = JSON.parse(event.target.responseText).products;
	getCategories();
}

function setCategories() {
	categories = JSON.parse(event.target.responseText).categories;
	buildDOMObj();
}

function getCategories() {
	//displayProducts(event.target.responseText);
	let reqCategories = new XMLHttpRequest();
	reqCategories.addEventListener("load", setCategories)
	reqCategories.open("GET", "data/categories.json");
	reqCategories.send();
}

function getProducts() {
	let reqProducts = new XMLHttpRequest();
	reqProducts.addEventListener("load", setProducts)
	reqProducts.open("GET", "data/products.json");
	reqProducts.send();
}

getProducts();