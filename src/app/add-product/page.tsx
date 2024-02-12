import FormSubmitButton from "@/components/FormSubmitButton";
import prisma from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
    title:"Add Product - Flowmazon"
}

async function addProduct(fromData: FormData){
        "use server";

        const name = fromData.get("name")?.toString();
        const description = fromData.get("description")?.toString();
        const imageUrl = fromData.get("imageUrl")?.toString();
        const price = Number(fromData.get("price") || 0);
                     
        if(!name|| !description || !imageUrl || !price ){
            throw Error("Missing required fields");
        }

        await prisma.product.create({
            data:{name, description, imageUrl, price}
        });
       redirect("/");       
}

export default function AddProductPAge(){
        return(
            <div>
                <h1 className="text-lg mb-3 font-bold">Add Product</h1>
                <form action={addProduct}>
                    <input
                      required
                      name="name" 
                      placeholder="Name"
                      className="mb-3 w-full input input-bordered" 
                    />
                    <textarea 
                       required
                       name="description"
                       placeholder="Description"
                       className="textarea textarea-bordered mb-3 w-full"
                     />
                    <input
                      required
                      name="imageUrl" 
                      placeholder="ImageUrl"
                      type="url"
                      className="mb-3 w-full input input-bordered" 
                    />
                    <input
                    required
                    name="price" 
                    placeholder="Price"
                    type="number"
                    className="mb-3 w-full input input-bordered" 
                  />
                    <FormSubmitButton  className=" btn-block">
                        Add Product
                    </FormSubmitButton>
                </form>
            </div>
        )
}