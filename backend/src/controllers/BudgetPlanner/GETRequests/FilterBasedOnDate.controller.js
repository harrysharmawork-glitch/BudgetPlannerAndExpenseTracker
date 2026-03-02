const express = require("express");
const expense = require("../../../models/Expense.model");

exports.getExpensesByDate = async(req,res)=>{
    try{
        const {StartDate, EndDate} = req.query;
        if(!StartDate || !EndDate){
            return res.status(400).json({
                message: "Start date as well as end date required!!",
            });
        }else{
            const allExpensesSorted = await expense.find({
                userId: req.user.userId,
                date:{
                    $gte: new Date(StartDate),
                    $lte: new Date(EndDate),
                },
            }).sort({date: -1});
            return res.status(200).json({
                message: "Expenses fetched successfully!!",
                success: true,
                count: allExpensesSorted.length,
                data: allExpensesSorted,
            });
        }
    }catch(err){
        console.error(err.message);
        return res.status(500).json({
            message : "Something went wrong!",
        });
    }
};

exports.getExpensesByAmount = async(req,res)=>{
    try{
        const {StartAmount, EndAmount} = req.query;
        if(!StartAmount || !EndAmount){
            return res.status(400).json({
                message: "Start amount as well as end amount required!!",
            });
        }else{
            const minAmount = Number(StartAmount);
            const maxAmount = Number(EndAmount);
            if(isNaN(minAmount) || isNaN(maxAmount)){
                return res.status(400).json({
                    message: "The amount must be a number!!",
                });
            }
            const expenses = await expense.find({
                userId: req.user.userId,
                isDeleted : false,
                amount:{
                    $gte: minAmount,
                    $lte: maxAmount
                }
            }).sort({expenseDate: -1});

            return res.status(200).json({
                message: "Data fetched successfully!",
                StartAmount:minAmount,
                EndAmount:maxAmount,
                totalTransactions : expenses.length,
                expenses,
            });
        }
    }catch(error){
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong!!",
        });
    }
}