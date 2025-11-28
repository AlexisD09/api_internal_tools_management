const { idCategoryExist } = require('../models/categoryModel');

exports.validateToolName = (name) => {
    if(!name) {
        throw new Error("Name is required");
    }else if(name.length > 100 || name.length < 2){
        throw new Error("Name is required and must be 2-100 characters");
    }
}

exports.validateToolMonthlyCost = (monthlyCost) => {
    if(!monthlyCost) {
        throw new Error("Monthly cost is required");
    }else if(monthlyCost <= 0 || typeof monthlyCost !== 'number'){
        throw new Error("Monthly cost is required and must be greater than 0");
    }else if(!Number.isInteger(monthlyCost * 100)){
        throw new Error("Monthly cost must have at most 2 decimal");
    }
}

exports.validateToolOwnerDepartment = (department) => {
    let departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'Design'];

    if(!department) {
        throw new Error("Department is required");
    }else if(!departments.includes(department)){
        throw new Error("This department doesnt exist");
    }
}

exports.validateToolWebsiteUrl = (websiteUrl) => {
    if(websiteUrl) {
        try{
            new URL(websiteUrl);
        }catch(e){
            throw new Error("Website URL is invalid");
        }
    }
}

exports.validateToolCategoryId = async (CategoryId) => {
    let exist = !!(await idCategoryExist(CategoryId));

    if(!exist){
        throw new Error("This category ID doesnt exist");
    }
}

exports.validateToolVendor = (vendor) => {
    if(!vendor) {
        throw new Error("Vendor is required");
    }else if (vendor.length > 100) {
        throw new Error("Vendor must not exceed 100 characters");
    }
}

exports.validateToolDescription = (description) => {
    if(!description) {
        throw new Error("Description is required");
    }
}