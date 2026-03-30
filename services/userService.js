const Common = require("../config/common");
const moments = require("../config/moment");
const axios = require("axios");
const apiUrl = "https://darjuv9.com/ECommerceAPI/api/home/GetCategoryList";
const apiUrlbyID =
  "https://darjuv9.com/ECommerceAPI/api/home/getProductsDetail";

exports.getAllUsers = async () => {
  try {
    
    // Call external API using await
    const response = await axios.get(apiUrl);

    // Prepare and return the result
    const res = {
      status: true,
      data: response.data,
    };

    return res; // Now this actually returns from getAllUsers
  } catch (error) {
    console.error("Error calling external API:", error.message);
    return {
      status: false,
      error: error.message,
    };
  }
};

exports.getUserById = async (id) => {
  try {

    const params = {
      ProdID: id,
      USerType: "Y",
    };

    const response = await axios.get(apiUrlbyID, { params });

    // Prepare and return the result
    const res = {
      status: true,
      data: response.data,
    };
    console.log("response = ",response);
    return res; //  Now this actually returns from getAllUsers
  } catch (error) {
    console.error(" ❌ Error calling external API:", error.message);
    return {
      status: false,
      error: error.message,
    };
  }
};
