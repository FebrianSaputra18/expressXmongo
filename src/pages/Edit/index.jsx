import { useEffect, useState } from "react";
import Input from "../../components/Input";
import { useParams, useHistory } from "react-router-dom/cjs/react-router-dom";
import axios from "axios";

const Edit = () => {
  const { itemId } = useParams();

  const history = useHistory();
  const [item, setItem] = useState({
    name: "",
    price: 0,
    stock: 0,
    status: null,
    image: null,
  });
  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await axios
          .get(`http://localhost:3000/api/v2/product/${itemId}`)
          setItem(response.data);
          console.log(
            response.data,
            "<=== data yang belum di edit dari id edit"
          );
      } catch (error) {
        console.error(error);
      }
    };

    fetching();
  }, [itemId]);

  const handleInputChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Send a PUT request to update the item
    await axios
      .patch(`http://localhost:3000/api/v2/product/${itemId}`, item)
      .then((response) => {
        setItem(response.data);
        console.log(response.data, "data yang sudah di edit");
        // Redirect to the item detail page after successful update
        history.push(`/`);
      })
      .catch((error) => {
        console.error("Error updating item:", error);
      });
    console.log(item, "data");
    if (handleSave.ok) {
      setItem(item);
    } else {
      console.error("Error saving");
    }
  };

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            value={item.name}
            onChange={handleInputChange}
          />
          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            value={item.price}
            onChange={handleInputChange}
          />
          <Input
            name="stock"
            type="number"
            placeholder="Harga Produk..."
            label="Stock"
            value={item.stock}
            onChange={handleInputChange}
          />
          <Input name="status" type="checkbox" label="Active" defaultChecked />
          <button
            type="submit"
            onClick={handleSave}
            className="btn btn-primary"
          >
            Simpan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
