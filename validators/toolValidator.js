const { idCategoryExist } = require('../models/categoryModel');

exports.validateToolName = (name, isUpdate) => {
    if(!name && !isUpdate) {
        throw new Error("Name is required");
    }else if(name){
        if(name.length > 100 || name.length < 2) throw new Error("Name is required and must be 2-100 characters");
    }
}

exports.validateToolMonthlyCost = (monthlyCost, isUpdate) => {
    if(!monthlyCost && !isUpdate) {
        throw new Error("Monthly cost is required");
    }else if(monthlyCost <= 0 || typeof monthlyCost !== 'number'){
        throw new Error("Monthly cost is required and must be greater than 0");
    }else if(!Number.isInteger(monthlyCost * 100)){
        throw new Error("Monthly cost must have at most 2 decimal");
    }
}

exports.validateToolOwnerDepartment = (department, isUpdate) => {
    let departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations', 'Design'];

    if(!department && !isUpdate) {
        throw new Error("Department is required");
    }else if(department){
        if(!departments.includes(department)) throw new Error("This department doesnt exist");
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

exports.validateToolCategoryId = async (CategoryId, isUpdate) => {
    if(!isUpdate) {
        let exist = !!(await idCategoryExist(CategoryId));

        if(!exist){
            throw new Error("This category ID doesnt exist");
        }
    }
}

exports.validateToolVendor = (vendor, isUpdate) => {
    if(!vendor && !isUpdate) {
        throw new Error("Vendor is required");
    }else if (vendor) {
        if(vendor.length > 100) throw new Error("Vendor must not exceed 100 characters");
    }
}

exports.validateToolDescription = (description, isUpdate) => {
    if(!description && !isUpdate) {
        throw new Error("Description is required");
    }
}

exports.validateToolStatus = (status) => {
    let statusAllowed = ['active', 'deprecated', 'trial'];

    if(!status) {
        throw new Error("Status is required");
    }else if(!statusAllowed.includes(status)){
        throw new Error("This status doesnt exist");
    }
}