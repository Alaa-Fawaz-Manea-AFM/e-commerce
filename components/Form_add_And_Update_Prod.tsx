"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { addProduct, updateProduct } from "@/constant/api";
import { Loader_icon, file_upload } from "@/public/assets";
import { adminAddData } from "@/constant/Constant";
import { useUserContext } from "@/context/MyState";
import { MdDeleteForever } from "react-icons/md";
import { useRouter } from "next-nprogress-bar";
import { toast } from "react-toastify";
import { IProduct } from "@/types";
import Image from "next/image";

const Form_add_And_Update_Prod = ({
  title,
  product_id,
}: {
  title: "Update" | "Add";
  product_id?: string;
}) => {
  const { product }: any = useUserContext();
  const { push } = useRouter();

  let obj = {
    title: "",
    price: "",
    images: [],
    rating: "",
    discount: "",
    category: "",
    description: "",
  };
  const [disableBtn, setDisableBtn] = useState(false);
  const [productObj, setProductObj] = useState<IProduct | any>(obj);
  const [images, setImages] = useState<(File | string)[]>([]);

  const [_dragItem, set_DragItem] = useState<number | null>(null);
  const [_dragOverItem, set_DragOverItem] = useState<number | null>(null);

  useEffect(() => {
    if (title === "Update") {
      const filteredProduct = product.find(
        (arr: IProduct) => arr.id === product_id
      );
      setProductObj(filteredProduct);
      setImages(filteredProduct.images);
    }
  }, [product_id, product, title]);

  const dragItem = useRef<any>(null);
  const dragOverItem = useRef<any>(null);
  const handleSort = () => {
    //duplicate items
    let _images = [...images];

    //remove and save the dragged item content
    const draggedItemContent = _images.splice(dragItem.current, 1)[0];

    //switch the position
    _images.splice(dragOverItem.current, 0, draggedItemContent);

    //update the actual array
    setImages(_images);
    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;
  };

  const handleDeleteProduct = (img: string | File) =>
    setImages(images.filter((arr) => arr !== img));

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title == "Update") {
      return await updateProduct(push, images, productObj, setDisableBtn);
    }
    return await addProduct(push, images as File[], productObj, setDisableBtn);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-5">
      <div className="flex flex-col ss:flex-row items-start gap-5">
        <div className="flex flex-col flex-1 gap-5">
          {adminAddData?.map((add) => (
            <label key={add.name}>
              {!add.select ? (
                <input
                  key={add.name}
                  autoFocus={add.auto}
                  type={add.type}
                  name={add.name}
                  onChange={(e) =>
                    setProductObj((pre: IProduct) => ({
                      ...pre,
                      [add.name]: e.target.value,
                    }))
                  }
                  value={productObj[add.name]}
                  className="border border-green dark:bg-gray bg-primary outline-0 sm:text-sm rounded-lg w-full p-2.5"
                  placeholder={add.name}
                />
              ) : (
                <select
                  aria-label="select category"
                  value={productObj[add.name]}
                  onChange={(e) => {
                    setProductObj((pre: IProduct) => ({
                      ...pre,
                      [add.name]: e.target.value,
                    }));
                  }}
                  className="dark:bg-gray dark:focus:bg-gary border-green border bg-primary focus:bg-primary xxs:px-4 py-3 w-full rounded-md outline-0 text-sm"
                >
                  <option value="">All Category</option>
                  <>
                    {add.option?.sort().map((sel, i) => (
                      <option key={i} value={sel}>
                        {sel}
                      </option>
                    ))}
                  </>
                </select>
              )}
            </label>
          ))}

          <textarea
            value={productObj?.description}
            cols={30}
            rows={10}
            name="description"
            onChange={(e) =>
              setProductObj((pre: IProduct) => ({
                ...pre,
                description: e.target.value,
              }))
            }
            className="max-h-32 border sm:text-sm rounded-lg w-full p-2.5 border-green focus:border-green dark:bg-gray bg-primary "
            placeholder="Product description"
          />
        </div>
        <div className="flex-1 w-full space-y-5">
          <label
            onDragEnter={(e) => {
              e.preventDefault();
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e: any) => {
              e.preventDefault();
              e.dataTransfer.files && images.length < 7
                ? setImages((pre) =>
                    [...pre, ...e.dataTransfer.files].slice(0, 7)
                  )
                : toast.error("Max Length 7");
            }}
            htmlFor="fillImage"
            className="h-20 w-full relative border border-green items-center justify-center flex-col flex hover:opacity-50 cursor-pointer rounded-md"
          >
            <Image width={64} height={64} src={file_upload} alt="file_upload" />
            <p className="text-xs text-gray_tx">
              images types is ( png | jpg | svg | webp )
            </p>

            <input
              id="fillImage"
              type="file"
              multiple
              onChange={(e: any) => {
                e.target.files && images.length < 7
                  ? setImages((pre) => [...pre, ...e.target.files].slice(0, 7))
                  : toast.error("Max Length 7");
              }}
              className="sr-only"
            />
          </label>
          <div className="grid grid-cols-3 gap-5">
            {images?.map((img, i) => {
              const imgFilter =
                typeof img == "string" ? img : URL.createObjectURL(img);

              return (
                <div
                  draggable
                  onDragStart={() => {
                    dragItem.current = i;
                    set_DragItem(i);
                  }}
                  onDragEnter={() => {
                    dragOverItem.current = i;
                    set_DragOverItem(i);
                  }}
                  onDragEnd={() => {
                    handleSort();
                    set_DragItem(null);
                    set_DragOverItem(null);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                  key={i}
                  className={`${i == 0 ? "col-span-3" : "col-span-1"} ${
                    _dragItem == i ? "opacity-50" : ""
                  } flex items-center justify-center h-28 w-full relative border border-green rounded-md`}
                >
                  <Image
                    fill
                    src={imgFilter}
                    alt="img"
                    className="object-cover cursor-grab cursor"
                  />
                  {_dragOverItem == i && _dragItem != i ? (
                    <div className="absolute text-7xl text-green">+</div>
                  ) : (
                    ""
                  )}
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(img)}
                    className="absolute text-green top-0 right-0"
                  >
                    <MdDeleteForever size={30} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <button
        disabled={disableBtn}
        type="submit"
        className={`${
          disableBtn ? "cursor-not-allowed opacity-50" : ""
        } hover:shadow-[inset_0_0_8px_rgb(250,245,255)] border-b-4 border-green bg-dark_admin text-green rounded-lg text-xl hover:shadow-green text-center mb-2
        max-xs:w-4/5 w-1/2 font-bold px-3 py-2 flex items-center gap-3 justify-center`}
      >
        {disableBtn ? (
          <Image src={Loader_icon} alt="loader icon" width={20} height={20} />
        ) : (
          ""
        )}
        {title} Product
      </button>
    </form>
  );
};

export default Form_add_And_Update_Prod;
