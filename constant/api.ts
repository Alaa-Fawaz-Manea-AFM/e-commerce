import {
  doc,
  query,
  setDoc,
  Timestamp,
  deleteDoc,
  updateDoc,
  collection,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, fireDB, storage } from "@/firebase/firebase";
import { IForm, IProduct, IUsers } from "@/types";
import { toast } from "react-toastify";
import { SetStateAction } from "react";

export const validEmail = process.env.NEXT_PUBLIC_EMAIL_KEY;

export const getUserData = async (
  setUser: React.Dispatch<SetStateAction<IUsers[]>>
) => {
  const userCollection = collection(fireDB, "users");
  const userSnapshot = await query(userCollection);

  onSnapshot(userSnapshot, (QuerySnapshot) => {
    const userArray: IUsers[] = [];
    QuerySnapshot.forEach((doc) => {
      userArray.push(doc.data() as IUsers);
    });
    setUser(userArray);
  });
};

export const getProductData = async (
  setProduct: React.Dispatch<SetStateAction<IProduct[]>>
) => {
  const productRef = collection(fireDB, "products");
  onSnapshot(productRef, (querySnapshot) => {
    const productsArray: IProduct[] = [];
    querySnapshot.forEach((doc) => {
      productsArray.push({ ...doc.data(), id: doc.id } as IProduct);
    });
    setProduct(productsArray.sort((a: any, b: any) => b.time - a.time));
  });
};

export const getUserInfoAll = (
  user: IUsers[],
  userId: string,
  setUserInf: React.Dispatch<React.SetStateAction<IUsers | object>>
) => {
  const userInfo = user.find((us) => us.user?.uid === userId);
  setUserInf(userInfo || {});
};

export const addProduct = async (
  push: any,
  images: File[],
  productObj: IProduct,
  setDisableBtn: React.Dispatch<SetStateAction<boolean>>
) => {
  if (
    !productObj.title ||
    !productObj.price ||
    !productObj.rating ||
    images.length === 0 ||
    !productObj.category ||
    !productObj.description
  ) {
    return toast.error("Please fill all fields");
  } else {
    setDisableBtn(true);
    let id = crypto.randomUUID();

    try {
      let resImages: string[] = [];

      for (const image of images) {
        const storageRef = ref(storage, `images/${image.name}`);
        const snapshot = await uploadBytesResumable(storageRef, image);
        const downloadURL = await getDownloadURL(snapshot.ref);
        resImages.push(downloadURL);
      }

      await setDoc(doc(collection(fireDB, "products"), id), {
        ...productObj,
        images: resImages,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      });
      push("/admin");
      toast.success("Product Add successfully");
    } catch (err) {
      toast.error("Oops, Please try again");
    } finally {
      setDisableBtn(false);
    }
  }
};

export const updateProduct = async (
  push: any,
  images: any[],
  products: IProduct,
  setDisableBtn: React.Dispatch<SetStateAction<boolean>>
) => {
  if (
    !products.title ||
    !products.price ||
    !products.rating ||
    images.length === 0 ||
    !products.category ||
    !products.description
  ) {
    return toast.error("Please fill all fields");
  } else {
    setDisableBtn(true);
    try {
      let resImages = [];
      for (const image of images) {
        const checkImage = typeof image === "object";
        if (checkImage) {
          const storageRef = ref(storage, `images/${image.name}`);
          const snapshot = await uploadBytesResumable(storageRef, image);
          const downloadURL = await getDownloadURL(snapshot.ref);
          resImages.push(downloadURL);
        } else {
          resImages.push(image);
        }
      }

      await setDoc(doc(fireDB, "products", products.id!), {
        ...products,
        images: resImages,
      });
      push("/admin");
      toast.success("Product Updated successfully");
    } catch (err) {
      toast.error("Oops, Please try again");
    } finally {
      setDisableBtn(false);
    }
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await deleteDoc(doc(fireDB, "products", id));
    toast.success("Product Deleted successfully");
  } catch (error) {
    toast.error("Product Deleted Falied");
  }
};

export const handleDelItemCart = async (
  userinf: IUsers,
  userId: string,
  id: string
) => {
  let cartFilter = userinf.cart.filter((i) => i.id !== id);
  try {
    await updateDoc(doc(fireDB, "users", userId), {
      cart: cartFilter,
    });
    toast.success("Product deleted");
  } catch (error) {
    toast.error("Failed to delete product");
  }
};

export const handleTotalProducts = (
  data: IProduct[],
  setTotalAmount: React.Dispatch<SetStateAction<number>>,
  setTotalDisc: React.Dispatch<SetStateAction<number>>
) => {
  let tempTotalAmount = 0;
  let tempTotalDiscount = 0;
  data?.forEach((product) => {
    tempTotalAmount += +product.price;
    tempTotalDiscount += +product.discount;
  });
  setTotalAmount(tempTotalAmount);
  setTotalDisc(tempTotalDiscount);
};

export const handleAddToCart = async (userId: string, prodId: IProduct) => {
  try {
    await updateDoc(doc(fireDB, "users", userId), {
      cart: arrayUnion(prodId),
    });
    toast.success("Product added to cart successfully");
  } catch (error) {
    toast.error("Failed to add product to cart");
  }
};

export const filterPricAndCattegory = (
  product: IProduct[],
  setPrice: React.Dispatch<SetStateAction<string[]>>,
  getSearch: string,
  getCategory: string,
  setCategory: React.Dispatch<SetStateAction<string[]>>
) => {
  let filterSearchkey = product.filter((item) =>
    item.title.toLowerCase().includes(getSearch.toLowerCase())
  );
  let filterCategory: string[] = [];
  let filterPriceAll: string[] = [];

  if (filterSearchkey.length > 0) {
    filterSearchkey.forEach((item) => {
      filterCategory.push(item.category);
      filterPriceAll.push(item.price);
    });
  }

  const [...newSetCategory]: any = new Set(filterCategory);
  setCategory(newSetCategory);

  if (getCategory) {
    const updatePriceFromFalse = filterSearchkey
      .filter((i) => i.category.includes(getCategory))
      .map((i) => i.price);

    const [...newPriceAllFalse]: any = new Set(updatePriceFromFalse);
    const filterCategoryToPrice = newPriceAllFalse.filter(
      (price: any) => price !== false
    );

    setPrice(filterCategoryToPrice);
  } else {
    const [...newPriceAll]: any = new Set(filterPriceAll);
    setPrice(newPriceAll);
  }
};

export const handleLogin = async (
  form: IForm,
  push: any,
  setUserId: React.Dispatch<SetStateAction<string>>,
  setDisable: React.Dispatch<SetStateAction<boolean>>,
  setUserEmail: React.Dispatch<SetStateAction<string>>
) => {
  setDisable(true);
  try {
    const result = await signInWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(result.user.uid)!);
    }

    setUserId(result.user.uid);
    setUserEmail("");
    push("/");
    toast.success("Log In Successfully");
  } catch (error) {
    toast.error("Log In Failed, Please try again.");
  } finally {
    setDisable(false);
  }
};

export const handleSignUp = async (
  form: IForm,
  push: any,
  setDisable: React.Dispatch<SetStateAction<boolean>>,
  setUserEmail: React.Dispatch<SetStateAction<string>>
) => {
  setDisable(true);
  let { name, password, email } = form;
  try {
    const users = await createUserWithEmailAndPassword(auth, email, password);
    const user = {
      name,
      uid: users.user.uid,
      email,
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    const userRef = collection(fireDB, "users");
    await setDoc(doc(userRef, users.user.uid), {
      user,
    });
    setUserEmail(email);
    push("/log-in");
    toast.success("Sign up Succesfully");
  } catch (err) {
    toast.error("Sign Up Failed, Please try again.");
  } finally {
    setDisable(false);
  }
};

export const filterAllDataFromAllProduct = (
  getSearch: string,
  getPrice: string,
  getCategory: string,
  page: number,
  limit: number,
  product: IProduct[]
) => {
  if (getSearch || getPrice || getCategory) {
    let arrProFilter = product
      .filter((obj) =>
        obj.title.toLowerCase().includes(getSearch.toLowerCase())
      )
      .filter((obj) =>
        obj.category.toLowerCase().includes(getCategory.toLowerCase())
      )
      .filter((obj) => obj.price.includes(getPrice))
      .map((arr) => arr);

    return sliceDataProAndUserAndOrder(page, limit, arrProFilter);
  } else {
    return sliceDataProAndUserAndOrder(page, limit, product);
  }
};

export const sliceDataProAndUserAndOrder = (
  page: number,
  limit: number,
  data: any[]
) => {
  const totalPage = Math.ceil(data.length / limit);
  let pageFilter = page > totalPage ? totalPage : page;

  const dataFinal = data.slice((pageFilter - 1) * limit, pageFilter * limit);
  const length = data.length;
  return { dataFinal, length };
};
