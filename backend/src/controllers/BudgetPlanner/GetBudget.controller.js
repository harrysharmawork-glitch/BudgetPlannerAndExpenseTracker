const Budget = require("../../models/Budget.model");
exports.getBudgets = async(req,res)=>{
    try{
        const {month, year} = req.query;
        const allBudgets = await Budget.find({
            userId: req.user.userId,
            month,
            year,
        });
        if(!allBudgets){
            return res.status(404).json({
                message: "Budgets not found you have entered something wrong!!",
            });
        }else{
            return res.status(200).json({
                count: allBudgets.length,
                allBudgets,
            });
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch the budgets. Internal Server error!",
        });
    }
}