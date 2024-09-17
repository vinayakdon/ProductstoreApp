import {create} from "zustand"

export const useProductStore = create((set)=>({
    products : [],
    setProducts : (products)=>set({ products }),
    createProduct : async (newProduct) => {
        if (!newProduct.name || !newProduct.price || !newProduct.image){
            return { success : false, message: "please fill in all fields."}

        }
        else{
            const res = await fetch("http://localhost:5000/api/products/postProduct", {
                method : "POST",
                headers : { 
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(newProduct),
            })
            const data = await res.json();
            set((state)=> ({ products: [...state.products, data.data]}))
            return { success: true, message: "Product created successfully."}
        }
    } ,

    fetchProducts : async ()=>{
        const res = await fetch("http://localhost:5000/api/products/getProducts");
        const data = await res.json();
        set({products: data.data})

    },

    deleteProduct : async(prodId)=>{
        const res = await fetch(`http://localhost:5000/api/products/delete/${prodId}`, {
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};
        set((state) => ({ products: state.products.filter((product) => product._id !== prodId)}));
        return { success: true, message: data.message };
    },

    updateProduct : async(prodId, updatedProduct) =>{
        const res = await fetch(`http://localhost:5000/api/products/update/${prodId}`, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",

            },
            body: JSON.stringify(updatedProduct)
        });

        const data = await res.json();
        if(!data.success) return { success: false, message: data.message};
        set((state)=> ({
            products: state.products.map(product => product._id === prodId ? data.data : product)
        }))
        return { success: true, message: data.message};

    }

}))

// const [state, setState] = useState([])