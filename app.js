
const contenedorCards = document.getElementById("contenedorCards")
const verCarrito= document.getElementById("verCarrito")
const modalContainer= document.getElementById("modal-container")
const cantidadCarrito =document.getElementById("cantidadCarrito")
let carrito =JSON.parse(localStorage.getItem("carrito")) || [];

const fetchData = async () => {
	fetch("verduras.json")
		.then((response) => response.json())
		.then((verduras) => {
			console.log(verduras);
			verduras.forEach((verdu) => {
				let content = document.createElement("div");
				content.className = "card";
				content.innerHTML = `
        <img src="${verdu.img}" class="card-img-top">
        <div class="card-body">
        <h5 class="card-title">${verdu.nombre}</h5>
        <p class="card-text">${verdu.peso} $${verdu.precio}</p>
        </div>
        
        `;
				contenedorCards.append(content);

				let comprar = document.createElement("button");
				comprar.innerText = "comprar";
				comprar.className = "btn btn-primary";

				content.append(comprar);

				comprar.addEventListener("click", () => {
					Toastify({
						text: "El producto se agrego correctamente",
						duration: 3000,
						newWindow: true,
						close: true,
						gravity: "top",
						position: "right",
						stopOnFocus: true,
						style: {
							background: "linear-gradient(to right, green, green)",
						},
						onClick: function () {},
					}).showToast();
					const repeat = carrito.some(
						(repeatVerdu) => repeatVerdu.id === verdu.id,
					);

					if (repeat) {
						carrito.map((verduras) => {
							if (verduras.id === verdu.id) {
								verduras.cantidad++;
							}
						});
					} else {
						carrito.push({
							id: verdu.id,
							img: verdu.img,
							peso: verdu.peso,
							nombre: verdu.nombre,
							precio: verdu.precio,
							cantidad: verdu.cantidad,
						});
					}
					carritoCounter();
					GuardarLocal();
				});
			});
		});
};

fetchData();

    const pintarCarrito= ()=>{
    modalContainer.innerHTML="";
    modalContainer.style.display= "flex";
    const modalHeader = document.createElement("div");
    modalHeader.className= "modal-header"
    modalHeader.innerHTML=`
    <h1 class="modal-header-title"> carrito </h1>
    `;
    modalContainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerHTML="x";
    modalbutton.className= "modal-header-button";

    modalbutton.addEventListener("click",()=>{
        modalContainer.style.display="none";
    })

    modalHeader.append(modalbutton);

    carrito.forEach((verdu)=>{
        let carritoContent = document.createElement("div");
        carritoContent.className="modal-content";
        carritoContent.innerHTML=  `
        <img src="${verdu.img}" class="card-img-top" >
        <h5 >${verdu.nombre}</h5>
        <p>${verdu.peso} $ ${verdu.precio}</p>
        <button class="formaBotonRestar"> - </button>
        <p> cantidad: ${verdu.cantidad} </p>
        <button class="formaBotonSumar"> + </button>
        <p> total: ${verdu.cantidad * verdu.precio}</p>
        <button class= "delete-product"> x </button>
        `;
        modalContainer.append(carritoContent);
        let restar= carritoContent.querySelector(".formaBotonRestar");

        restar.addEventListener("click", ()=>{
            if(verdu.cantidad !== 1){
            verdu.cantidad -- ;}
            pintarCarrito();
            GuardarLocal();
        });

        let sumar= carritoContent.querySelector(".formaBotonSumar");
        sumar.addEventListener("click", ()=>{
        verdu.cantidad ++ ;
            pintarCarrito();
            GuardarLocal();
        });

        let eliminar = carritoContent.querySelector(".delete-product")
        eliminar.addEventListener("click", ()=>{
            Toastify({
                text: "Producto eliminado",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                background: "linear-gradient(to right, red, red)",
                },
                onClick: function(){} 
            }).showToast();
            eliminarProducto(verdu.id);
            
        })
        
    });



const total= carrito.reduce((acc, el)=>acc + el.precio * el.cantidad, 0);

const totalBuying = document.createElement("div")
totalBuying.className="total-content"
totalBuying.innerHTML=`total a pagar: ${total} $`;
modalContainer.append(totalBuying);
};

verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto= (id)=>{

    const foundId = carrito.find((element)=>element.id === id);
    carrito = carrito.filter((carritoId)=>{
        return carritoId !== foundId;
    });
    carritoCounter();
    GuardarLocal();
    pintarCarrito();
};

const carritoCounter= ()=> {
    cantidadCarrito.style.display = "block";
    const carritoLenght = carrito.length;
    localStorage.setItem("carritoLenght", JSON.stringify(carritoLenght))
    

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLenght"));

};

const GuardarLocal =() => {
localStorage.setItem("carrito", JSON.stringify(carrito));
};

carritoCounter();


