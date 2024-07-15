document.addEventListener("DOMContentLoaded", function () {
  const apiUrl = "https://fakestoreapi.com/products";
  const productList = document.getElementById("product-list");

  function fetchProducts() {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        renderProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }

  function renderProducts(productsList) {
    productList.innerHTML = "";

    productsList.forEach((productItem) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product-item");
      productDiv.innerHTML = `
        <strong>${productItem.title}</strong> - ${productItem.author}
        <button class="delete-btn" data-id="${productItem.id}">Eliminar</button>
      `;
      productList.appendChild(productDiv);

      const deleteButton = productDiv.querySelector(".delete-btn");
      deleteButton.addEventListener("click", () => {
        deleteProducts(productItem.id);
      });
    });
  }

  function deleteProducts(productId) {
    fetch(`${apiUrl}/${productId}`, {
      method: "DELETE",
    })
      .then(() => fetchProducts())
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  }

  const addProductsForm = document.getElementById("add-product-form");
  addProductsForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    if (title.trim() === "" || author.trim() === "") {
      alert("Ingresá el título y el autor del producto.");
      return;
    }

    const newProduct = {
      title: title,
      author: author,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then(() => {
        fetchProducts();
        document.getElementById("title").value = "";
        document.getElementById("author").value = "";
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  });

  fetchProducts();
});
