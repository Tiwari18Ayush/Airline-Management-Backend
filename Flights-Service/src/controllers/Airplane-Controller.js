const { AirplaneService } = require('../services');
const {SuccessResponse, ErrorResponse}=require('../utils/Common');
async function createAirplane(req, res) {
    try {
        const airplane = await AirplaneService.createAirplane({
            modelNo: req.body.modelNo,
            capacity: req.body.capacity
        });

        return res.status(201).json({
            success: true,
            message: "Airplane created successfully",
            data: airplane,
            error: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Not able to create an airplane",
            data: {},
            error: error
        });
    }
}
async function getAirplane(req, res) {
    try {
        console.log("🔥 GET AIRPLANE HIT");

        const airplanes = await AirplaneService.getAirplane();

        SuccessResponse.message = "Airplane fetched successfully";
        SuccessResponse.data = airplanes;   // ✅ THIS WAS MISSING

        return res.status(200).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.message = "Not able to fetch the airplane";
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse);
    }
}
async function getAirplanebyid(req,res){
    try{
        console.log("🔥 id search hit");
        const { id } = req.params;
        const airplane= await AirplaneService.getAirplanebyid(id);
        if (!airplane) {
            ErrorResponse.message = "Airplane not found";
            return res.status(404).json(ErrorResponse);
        }
        SuccessResponse.message = "Airplane fetched successfully";
        SuccessResponse.data = airplane;
          return res.status(200).json(SuccessResponse);
    }
    catch (error) {
        ErrorResponse.message = "Not able to fetch the airplane";
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse);
    }
}
async function deleteAirplane(req, res) {
    try {
        const { id } = req.params;

        const deletedCount = await AirplaneService.deleteAirplane(id);

        if (deletedCount === 0) {
            ErrorResponse.message = "Airplane not found";
            return res.status(404).json(ErrorResponse);
        }

        SuccessResponse.message = "Airplane deleted successfully";
        SuccessResponse.data = { id };

        return res.status(200).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.message = "Not able to delete the airplane";
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse);
    }
}
async function updateAirplane(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const response = await AirplaneService.updateAirplane(id, updateData);

        if (response[0] === 0) {
            ErrorResponse.message = "Airplane not found or no changes made";
            return res.status(404).json(ErrorResponse);
        }

        SuccessResponse.message = "Airplane updated successfully";
        SuccessResponse.data = { id, ...updateData };

        return res.status(200).json(SuccessResponse);

    } catch (error) {
        ErrorResponse.message = "Not able to update the airplane";
        ErrorResponse.error = error;
        return res.status(500).json(ErrorResponse);
    }
}


module.exports = {
    createAirplane,
    getAirplane,
    getAirplanebyid,
    deleteAirplane,
    updateAirplane
};
