const nameTextbox = document.getElementById("nameTextBox")
const addressTextbox = document.getElementById("addressTextBox")
const addStoreButton = document.getElementById("addStoreButton")
const storesUL = document.getElementById("storesUL")

addStoreButton.addEventListener("click", function() {

    const storeName = nameTextBox.value 
    const address = addressTextBox.value
    
    db.collection("stores")
    .add({
        name: storeName, 
        address: address
        }).then(function(docRef) {
        getAllStores() 
        })
})


function deleteStore(documentId) {
    db.collection("stores")
        .doc(documentId) // get document with the documentId 
        .delete() // delete the document 
        .then(() => { // fired after the document has been deleted  
            // get all documents so the deleted document will not show up since it has been deleted 
            getAllStores()  
        })
}
function getAllStores() {

    // clear the contents of the task UL 
    storesUL.innerHTML = ""

    db.collection("stores")
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                //console.log(doc.id)
                let data = doc.data()
                let storeItem = `<li>
                    <label> Store Name: ${data.name}<br> 
                    Address: ${data.address}</label><br>
                    <button onclick="deleteStore('${doc.id}')">Delete</button>
                    <button>Add Item</button>
                    <button>View Items</button>
                </li>`
                storesUL.insertAdjacentHTML('beforeend', storeItem)
            })
        })
}

getAllStores() 

