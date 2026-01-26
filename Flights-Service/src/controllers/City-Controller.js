const {CityService}=require('../services');
const {SuccessResponse, ErrorResponse}=require('../utils/Common');
async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
           name:req.body.name
        });
         
        return res.status(201).json({
            success: true,
            message: "City created successfully",
            data: city,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Not able to create the city",
            data: {},
            error: error
        });
    }
}
async function getCity(req, res) {
    try {
        console.log("🔥 GET City HIT");

        const cities = await CityService.getCity();

        SuccessResponse.message = "Cities fetched successfully";
        SuccessResponse.data = cities;   // ✅ THIS WAS MISSING

        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Not able to fetch the cities";
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse);
    }
}
async function getCitybyid(req,res){
    try{
        console.log("🔥 id search hit");
        const { id } = req.params;
        const city= await CityService.getCitybyid(id);
        if (!city) {
            ErrorResponse.message = "City not found";
            return res.status(404).json(ErrorResponse);
        }
        SuccessResponse.message = "City fetched successfully";
        SuccessResponse.data = city;
          return res.status(200).json(SuccessResponse);
    }
    catch (error) {
        ErrorResponse.message = "Not able to fetch the city";
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse);
    }
}
async function deleteCity(req, res) {
    try {
        const { id } = req.params;

        const deletedCount = await CityService.deleteCity(id);

        if (deletedCount === 0) {
            ErrorResponse.message = "City not found";
            return res.status(404).json(ErrorResponse);
        }

        SuccessResponse.message = "City deleted successfully";
        SuccessResponse.data = { id };

        return res.status(200).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.message = "Not able to delete the City";
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse);
    }
}
async function updateCity(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const response = await CityService.updateCity(id, updateData);

        if (response[0] === 0) {
            ErrorResponse.message = "City not found or no changes made";
            return res.status(404).json(ErrorResponse);
        }

        SuccessResponse.message = "City updated successfully";
        SuccessResponse.data = { id, ...updateData };

        return res.status(200).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.message = "Not able to update the city";
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse);
    }
}


module.exports = {
    createCity,
    getCity,
    getCitybyid,
    updateCity,
    deleteCity
};
