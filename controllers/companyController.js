const bcrypt = require("bcrypt");
const company = require("../models/company_schema");

const ReviewAndRating = require("../models/review_schema")

// add company or create company

const createCompany = async (req, res) => {
  const { companyName } = req.body;
  const companyData = new company(req.body);
  try {
    const isCompanyExists = await company.findOne({
      companyName: companyName,
    });
    if (isCompanyExists) {
      return res.status(409).json({
        status: false,
        error: "User with this name is already exists",
      });
    }
    const filePath = `/uploads/$(req.file.filename)`;
    companyData.company_logo = filePath;
    await companyData.save();
    return res.status(201).json({
      success: true,
      message: "Registration successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

const searchCompany = async (req, res) => {
  try {
    const companyExists = await company.find({
      location: req.params.location,
    });
    if (companyExists) {
      return res.status(201).json({
        success: "failure",
        error: "company name already exists ",
        SearchData: companyExists,
      });
    } else {
      res.status(404).json({
        success: true,
        message: "Companuy not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: "failure",
      message: err.message,
    });
  }
};

//Company List
const companyList = async (req, res) => {
  try {
    const companyList = await company.find();
    return res.status(201).json({
      success: "true",
      message: "company list",
      company: companyList,
    });
  } catch (err) {
    return res.status(500).json({
      success: "failure",
      message: err.message,
    });
  }
};

//Company Review Comment

const companyReviewcomment = async (req, res) => {
  let id = req.params.id;
  try {
    const companyDetails = await company.findById(id).lean();
    const comment = await ReviewAndRating.find({ companyId: id })
      .populate({
        path: "userId",
        select: "userName profilePic",
      })
      .populate({
        path: "companyId",
        select: "_id",
      });
    const commentAndCompanyName = {
      companyDetails: companyDetails,
      comments: comment,
    };
    return res.status(200).json({
      compDetails: commentAndCompanyName,
      success: true,
      message: "Company details find successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: "failure",
      error: error.message,
    });
  }
};

module.exports = {
  searchCompany,
  companyList,
  createCompany,
  companyReviewcomment,
};
